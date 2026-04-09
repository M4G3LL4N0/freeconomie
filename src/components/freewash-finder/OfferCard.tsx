"use client";

import { StaticOffer } from "@/types/freewash";
import { VerificationBadge } from "./VerificationBadge";
import { MapPinIcon } from "@/components/icons";
import { captureEvent } from "@/lib/analytics";

interface OfferCardProps {
  offer: StaticOffer;
  onClick?: () => void;
  className?: string;
}

export function OfferCard({ offer, onClick, className = "" }: OfferCardProps) {
  return (
    <div 
      className={`glass-panel rounded-xl overflow-hidden border border-white/10 hover:bg-white/5 transition-colors ${className}`}
      onClick={onClick}
    >
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-medium text-white">{offer.businessName}</h3>
            <p className="mt-1 text-sm text-white/80">{offer.city}, {offer.region}</p>
          </div>
          <VerificationBadge 
            confidenceScore={offer.verification.confidenceScore}
            verifiedAt={offer.verification.verifiedAt}
            lastCheckedAt={offer.lastVerifiedAt}
            size="sm"
          />
        </div>

        <div className="mt-4 flex items-center gap-2">
          <span className={`text-xs px-3 py-1 rounded-full border ${
            CATEGORY_LABELS[offer.category].bg
          } ${
            CATEGORY_LABELS[offer.category].border
          } ${
            CATEGORY_LABELS[offer.category].textColor
          }`}>
            {CATEGORY_LABELS[offer.category].text}
          </span>
          {offer.expirationDate && (
            <span className={`text-xs px-2 py-1 rounded-full ${
              new Date(offer.expirationDate) < new Date()
                ? 'bg-red-500/15 text-red-400'
                : 'bg-emerald-500/15 text-emerald-400'
            }`}>
              {new Date(offer.expirationDate).toLocaleDateString()}
            </span>
          )}
        </div>

        <div className="mt-4 text-sm text-white/70">
          {offer.summary}
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {offer.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-xs text-white/60"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between text-xs text-white/60">
          <span>Source: {offer.source.name}</span>
          <span>Checked: {new Date(offer.source.checkedAt).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
}
