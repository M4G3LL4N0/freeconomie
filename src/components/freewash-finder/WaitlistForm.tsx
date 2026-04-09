"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { captureEvent } from "@/lib/analytics";
import { toast } from "react-hot-toast";

const schema = z.object({
  email: z.string().email("Please enter a valid email"),
  referral_code: z.string().optional(),
});

export default function WaitlistForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to join waitlist");

      toast.success("You're on the list!");
      reset();
      captureEvent("waitlist_signup", { email: data.email });
    } catch (error) {
      toast.error(error.message);
      captureEvent("waitlist_error", { error: error.message });
    }
  };

  return (
    <form 
      onSubmit={handleSubmit(onSubmit)} 
      aria-labelledby="waitlist-heading"
      className="mt-6 sm:mt-8 flex flex-col gap-4 sm:flex-row sm:gap-6 max-w-2xl"
    >
      <h2 id="waitlist-heading" className="sr-only">Join Waitlist</h2>
      <div className="w-full sm:flex-1">
        <label htmlFor="waitlist-email" className="sr-only">Email address</label>
        <input
          id="waitlist-email"
          type="email"
          placeholder="Enter your email"
          className={`w-full rounded-full border-2 ${errors.email ? 'border-rose-400/50' : 'border-white/15'} glass-form-element px-4 py-3 sm:px-5 sm:py-3.5 text-sm text-white/90 outline-none transition-all placeholder:text-white/28 focus:border-cyan-300/60 focus:ring-2 focus:ring-cyan-300/30`}
          {...register("email")}
          aria-invalid={errors.email ? "true" : "false"}
          aria-describedby={errors.email ? "email-error" : undefined}
        />
        {errors.email && (
          <p className="mt-1.5 text-xs leading-5 text-rose-400">{errors.email.message}</p>
        )}
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full sm:w-auto rounded-full bg-gradient-to-r from-cyan-400 via-sky-500 to-violet-500 px-6 py-3 sm:px-8 sm:py-3.5 text-sm font-semibold text-white shadow-[0_14px_40px_rgba(59,130,246,0.3)] transition-all hover:scale-[1.02] hover:shadow-[0_14px_50px_rgba(59,130,246,0.4)] disabled:opacity-70"
      >
        {isSubmitting ? "Joining..." : "Join Waitlist"}
      </button>
    </form>
  );
}
