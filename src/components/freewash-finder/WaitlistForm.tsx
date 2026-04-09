"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { captureEvent } from "@/lib/analytics";
import { toast } from "react-hot-toast";

const waitlistSchema = z.object({
  email: z.string().email("Please enter a valid email"),
});

type WaitlistFormData = z.infer<typeof waitlistSchema>;

export default function WaitlistForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<WaitlistFormData>({
    resolver: zodResolver(waitlistSchema),
  });

  const onSubmit = async (data: WaitlistFormData) => {
    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to join waitlist");

      toast.success("You've joined the waitlist!");
      reset();
      captureEvent("waitlist_signup", { email: data.email });
    } catch (error) {
      toast.error("Failed to join waitlist. Please try again.");
      captureEvent("waitlist_error", { error: (error as Error).message });
    }
  };

  return (
    <form 
      onSubmit={handleSubmit(onSubmit)}
      className="mt-8 flex max-w-2xl flex-col gap-4 sm:flex-row"
    >
      <div className="min-w-0 flex-1">
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full rounded-full border border-white/10 bg-[#091323]/94 px-5 py-4 text-sm text-white outline-none placeholder:text-white/28 focus:border-cyan-300/40"
          {...register("email")}
        />
        {errors.email && (
          <p className="mt-2 text-xs text-rose-400">{errors.email.message}</p>
        )}
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded-full bg-gradient-to-r from-cyan-400 via-sky-500 to-violet-500 px-6 py-4 text-sm font-semibold text-white shadow-[0_14px_40px_rgba(59,130,246,0.26)] transition hover:scale-[1.02] disabled:opacity-70"
      >
        {isSubmitting ? "Joining..." : "Join Waitlist"}
      </button>
    </form>
  );
}
