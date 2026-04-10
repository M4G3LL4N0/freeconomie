"use client";

import { MapPin } from "lucide-react";
import type { FreeconomyOffer as StaticOffer } from "@/types/freewash";
import { EconomyBadge } from "./EconomyBadge";
import { VerificationBadge } from "./VerificationBadge";
import { captureEvent } from "@/lib/analytics";

interface OfferCardProps {
  offer: StaticOffer;
}

export default function OfferCard({ offer }: OfferCardProps) {
  return (
    <div className="rounded-[1.5rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.025))] p-5 shadow-[0_18px_60px_rgba(0,0,0,0.24)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <VerificationBadge verification={offer.verification} />
            <SourceBadge sourceType={offer.source.type} />
          </div>
          <h3 className="mt-3 text-xl font-semibold text-white">{offer.businessName}</h3>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <span className="text-sm text-white/65">{offer.offerTitle}</span>
            <EconomyBadge category={offer.economyType || "free-car-wash"} />
            {offer.valueEstimate && (
              <span className="inline-flex items-center gap-1 rounded-full border border-amber-300/20 bg-amber-400/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-amber-200">
                ${offer.valueEstimate.amount.toLocaleString()}
              </span>
            )}
            {offer.signupRequired && (
              <SignupBadge type={offer.signupType || "email"} />
            )}
            <span className="text-xs text-white/42">
              {offer.city}, {offer.region}
            </span>
          </div>

        <button
          type="button"
          onClick={() => captureEvent("offer_card_clicked", { offerId: offer.id })}
          className="rounded-full border border-white/10 bg-white/6 px-3 py-1 text-xs text-white/70"
        >
          View
        </button>
        {offer.systemMetrics && (
          <div className="flex items-center gap-1 text-xs text-white/60">
            <span 
              className={`inline-block h-2 w-2 rounded-full ${
                offer.systemMetrics.freshnessScore > 75 ? 'bg-emerald-400' :
                offer.systemMetrics.freshnessScore > 50 ? 'bg-amber-400' : 
                'bg-rose-400'
              }`}
            />
            <span>OS {offer.systemMetrics.freshnessScore}</span>
          </div>
        )}
      </div>

      <div className="mt-4 flex items-center gap-2 text-sm text-white/60">
        <MapPin className="h-4 w-4" />
        <span>
          {offer.city}, {offer.state}
        </span>
      </div>

      <div className="mt-2 text-sm text-white/50">{offer.address}</div>

      <p className="mt-4 text-sm leading-7 text-white/62">{offer.summary}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {offer.tags?.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-white/10 bg-white/6 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-white/70"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-between gap-4 text-xs uppercase tracking-[0.18em] text-white/40">
        <span>{offer.region}</span>
        <span>Last checked {offer.source.checkedAt}</span>
      </div>
    </div>
  );
}
