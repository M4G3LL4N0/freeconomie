"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { submitOfferSchema } from "@/lib/validation";
import { z } from "zod";
import { captureEvent } from "@/lib/analytics";
import { toast } from "react-hot-toast";

type FormData = z.infer<typeof submitOfferSchema>;

export default function OfferSubmissionForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(submitOfferSchema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to submit offer");

      toast.success("Offer submitted for review!");
      reset();
      captureEvent("offer_submitted", {
        offer_type: data.offer_type,
      });
    } catch (error) {
      toast.error("Failed to submit offer. Please try again.");
      captureEvent("offer_submission_error", {
        error: (error as Error).message,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
      <div>
        <label className="block text-sm font-medium text-white/80 mb-1">
          Business Name
        </label>
        <input
          {...register("name")}
          className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/30 focus:border-cyan-300/40 focus:outline-none"
          placeholder="e.g. Sparkle Car Wash"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-rose-400">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-white/80 mb-1">
          Address
        </label>
        <input
          {...register("address")}
          className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/30 focus:border-cyan-300/40 focus:outline-none"
          placeholder="Full business address"
        />
        {errors.address && (
          <p className="mt-1 text-sm text-rose-400">{errors.address.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-white/80 mb-1">
            Latitude
          </label>
          <input
            type="number"
            {...register("lat", { valueAsNumber: true })}
            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/30 focus:border-cyan-300/40 focus:outline-none"
            step="any"
          />
          {errors.lat && (
            <p className="mt-1 text-sm text-rose-400">{errors.lat.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-white/80 mb-1">
            Longitude
          </label>
          <input
            type="number"
            {...register("lng", { valueAsNumber: true })}
            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/30 focus:border-cyan-300/40 focus:outline-none"
            step="any"
          />
          {errors.lng && (
            <p className="mt-1 text-sm text-rose-400">{errors.lng.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-white/80 mb-1">
          Offer Type
        </label>
        <select
          {...register("offer_type")}
          className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-cyan-300/40 focus:outline-none"
        >
          <option value="wash">Car Wash</option>
          <option value="trial">Free Trial</option>
          <option value="promo">Promotion</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-white/80 mb-1">
          Offer Details
        </label>
        <textarea
          {...register("details")}
          rows={4}
          className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/30 focus:border-cyan-300/40 focus:outline-none"
          placeholder="Describe the offer requirements and details"
        />
        {errors.details && (
          <p className="mt-1 text-sm text-rose-400">{errors.details.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-white/80 mb-1">
          Expiration Date
        </label>
        <input
          type="datetime-local"
          {...register("expires_at")}
          className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-cyan-300/40 focus:outline-none"
        />
        {errors.expires_at && (
          <p className="mt-1 text-sm text-rose-400">{errors.expires_at.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full rounded-full bg-gradient-to-r from-cyan-400 via-sky-500 to-violet-500 px-6 py-3.5 text-sm font-semibold text-white shadow-[0_14px_40px_rgba(59,130,246,0.28)] transition ${isSubmitting ? 'opacity-70' : 'hover:scale-[1.02]'}`}
      >
        {isSubmitting ? (
          <span className="inline-flex items-center gap-2">
            <RefreshCw className="h-4 w-4 animate-spin" />
            Submitting...
          </span>
        ) : (
          'Submit Offer'
        )}
      </button>
    </form>
  );
}
