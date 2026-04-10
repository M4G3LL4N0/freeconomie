"use client";

import { FormEvent, useState } from "react";
import { captureEvent } from "@/lib/analytics";
import { showSuccess, showError } from "@/lib/notifications";

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export default function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    const normalizedEmail = email.trim();

    if (!normalizedEmail) {
      const message = "Email is required.";
      setErrorMessage(message);
      showError(message);
      return;
    }

    if (!isValidEmail(normalizedEmail)) {
      const message = "Please enter a valid email address.";
      setErrorMessage(message);
      showError(message);
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: normalizedEmail }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Failed to join waitlist.");
      }

      captureEvent("waitlist_form_submitted", { email: normalizedEmail });

      const message = "You’ve been added to the waitlist.";
      setSuccessMessage(message);
      setEmail("");
      showSuccess(message);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to join waitlist.";
      setErrorMessage(message);
      showError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="mt-8 flex max-w-3xl flex-col gap-4 sm:flex-row">
      <div className="flex-1">
        <label htmlFor="waitlist-email" className="sr-only">
          Email address
        </label>
        <input
          id="waitlist-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          autoComplete="email"
          className="min-w-0 w-full rounded-full border border-white/10 bg-[#091323]/94 px-5 py-4 text-sm text-white outline-none placeholder:text-white/28"
          aria-invalid={errorMessage ? "true" : "false"}
          aria-describedby={errorMessage ? "waitlist-error" : successMessage ? "waitlist-success" : undefined}
        />
        {errorMessage ? (
          <p id="waitlist-error" className="mt-3 text-sm text-red-200" aria-live="polite">
            {errorMessage}
          </p>
        ) : null}
        {successMessage ? (
          <p id="waitlist-success" className="mt-3 text-sm text-emerald-200" aria-live="polite">
            {successMessage}
          </p>
        ) : null}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="rounded-full bg-gradient-to-r from-cyan-400 via-sky-500 to-violet-500 px-8 py-4 text-sm font-semibold text-white shadow-[0_14px_40px_rgba(59,130,246,0.26)] transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Joining..." : "Get Early Access"}
      </button>
    </form>
  );
}
