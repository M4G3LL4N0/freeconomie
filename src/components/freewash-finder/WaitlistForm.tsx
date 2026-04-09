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
    <form onSubmit={handleSubmit(onSubmit)} className="mt-8 flex max-w-2xl flex-col gap-6 sm:flex-row">
      <div className="min-w-0 flex-1">
        <input
          type="email"
          placeholder="Enter your email"
          className={`w-full rounded-full border-2 ${errors.email ? 'border-rose-400/50' : 'border-white/15'} glass-form-element px-6 py-4 text-sm text-white/90 outline-none transition-all placeholder:text-white/28 focus:border-cyan-300/60 focus:ring-2 focus:ring-cyan-300/30`}
          {...register("email")}
        />
        {errors.email && (
          <p className="mt-1.5 text-xs leading-5 text-rose-400">{errors.email.message}</p>
        )}
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded-full bg-gradient-to-r from-cyan-400 via-sky-500 to-violet-500 px-8 py-4 text-sm font-semibold text-white shadow-[0_14px_40px_rgba(59,130,246,0.3)] transition-all hover:scale-[1.02] hover:shadow-[0_14px_50px_rgba(59,130,246,0.4)] disabled:opacity-70"
      >
        {isSubmitting ? "Joining..." : "Join Waitlist"}
      </button>
    </form>
  );
}
