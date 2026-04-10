import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import type { VerificationStatus } from "@/types/freewash";

interface VerificationBadgeProps {
  verification?: VerificationStatus;
  label?: string;
}

export function VerificationBadge({ verification, label, qualityFlags }: VerificationBadgeProps & { qualityFlags?: QualityFlags }) {
  const score = verification?.confidenceScore ?? 0;
  const isPremium = qualityFlags 
    ? Object.values(qualityFlags).every(v => v === false || v === undefined || (typeof v === 'number' && v >= 15))
    : false;
  
  const getBadgeConfig = (score: number) => {
    if (score >= 95) {
      return {
        className: "border-amber-300/20 bg-gradient-to-r from-amber-400/25 to-amber-600/10 text-amber-200",
        icon: "👑",
        text: "Platinum Verified",
        tooltip: "In-person verified + official confirmation"
      };
    } else if (score >= 85) {
      return {
        className: "border-emerald-300/20 bg-gradient-to-r from-emerald-400/20 to-emerald-500/10 text-emerald-200",
        icon: "✓✓",
        text: "Gold Verified",
        tooltip: "Phone verified + official confirmation"
      };
    } else if (score >= 70) {
      return {
        className: "border-cyan-300/20 bg-gradient-to-r from-cyan-400/15 to-cyan-500/10 text-cyan-200",
        icon: "✓",
        text: "Silver Verified",
        tooltip: "Official site verification"
      };
    } else {
      return {
        className: "border-white/10 bg-white/6 text-white/70",
        icon: "?",
        text: "Unverified",
        tooltip: "Not yet verified"
      };
    }
  };

  const badge = getBadgeConfig(score);

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span
          className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] ${badge.className}`}
        >
          {badge.icon} {label ?? badge.text}
          <span className="ml-1 text-xs font-normal normal-case opacity-80">
            {score}%
          </span>
        </span>
      </TooltipTrigger>
      <TooltipContent side="top" className="max-w-[280px]">
        <p>{badge.tooltip}</p>
        {verification?.verificationMethod && (
          <p className="mt-1 text-xs opacity-80">
            Method: {verification.verificationMethod.replace(/-/g, ' ')}
          </p>
        )}
        {isPremium && <p className="mt-2 flex items-center gap-1 text-sm text-emerald-300">
          <CheckCircle className="h-4 w-4" />
          <span>Premium Quality Offer</span>
        </p>}
        <small className="block mt-1 text-xs opacity-70">
          Part of Freeconomie's verified free value network
        </small>
      </TooltipContent>
    </Tooltip>
  );
}
