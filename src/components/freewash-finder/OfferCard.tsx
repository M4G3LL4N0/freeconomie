"use client";

import { StaticOffer } from "@/types/freewash";
import { VerificationBadge } from "./VerificationBadge";
import { MapPinIcon } from "@/components/icons";
import { captureEvent } from "@/lib/analytics";

interface OfferCardProps {
  offer: StaticOffer;
  onClick?: () => void;
}

export function OfferCard({ offer, onClick }: OfferCardProps) {
  const handleClick = () => {
    captureEvent("offer_card_click", { offerId: offer.id });
    onClick?.();
  };

  return (
    <div 
      className="glass-panel backdrop-blur-xl rounded-xl overflow-hidden border border-white/10 hover:bg-white/5 transition-colors cursor-pointer"
      onClick={handleClick}
    >
      <div className="p-4">
        <div className="flex items-start justify-between">
          <h3 className="font-medium text-white">{offer.businessName}</h3>
          <VerificationBadge verified={offer.verified} offerId={offer.id} />
        </div>
        
        <p className="mt-1 text-sm text-white/80">{offer.offerTitle}</p>
        
        <div className="mt-4 flex items-center gap-2 text-xs text-white/60">
          <MapPinIcon className="h-3 w-3" />
          <span>{offer.city}, {offer.region}</span>
        </div>

        <div className="mt-4 text-sm text-white/70">
          {offer.summary}
        </div>

        {offer.expiresAt && (
          <div className="mt-4 text-xs text-emerald-400">
            Expires: {new Date(offer.expiresAt).toLocaleDateString()}
          </div>
        )}
      </div>
    </div>
  );
}
