import { env } from "@/env";
import type { VerificationStatus } from "@/types/freewash";

type VerificationBadgeProps = {
  verification?: VerificationStatus;
  label?: string;
};

export function VerificationBadge({
  verification,
  label,
}: VerificationBadgeProps) {
  const score = verification?.confidenceScore ?? 0;
  const method = verification?.verificationMethod;

  const getBadgeStyle = (score: number) => {
    if (score >= 95) {
      return {
        className: "border-emerald-300/20 bg-emerald-400/10 text-emerald-200",
        text: "Gold Verified",
        icon: "✓✓✓",
        tooltip: "Official site verification + in-person confirmation"
      };
    } else if (score >= 85) {
      return {
        className: "border-emerald-300/20 bg-emerald-400/10 text-emerald-200",
        text: "Silver Verified",
        icon: "✓✓",
        tooltip: "Official site + phone confirmation"
      };
    } else if (score >= 70) {
      return {
        className: "border-cyan-300/20 bg-cyan-400/10 text-cyan-200",
        text: "Bronze Verified", 
        icon: "✓",
        tooltip: "Official site verification"
      };
    } else if (score >= 50) {
      return {
        className: "border-amber-300/20 bg-amber-400/10 text-amber-200",
        text: "Community Reported",
        icon: "👥",
        tooltip: "User-submitted, pending verification"
      };
    } else {
      return {
        className: "border-white/10 bg-white/6 text-white/70",
        text: "Unverified",
        icon: "?",
        tooltip: "Not yet verified"
      };
    }
  };

  const getMethodTooltip = () => {
    switch(method) {
      case "official-site":
        return "Verified via official website";
      case "phone-confirmation": 
        return "Phone verified";
      case "in-person-visit":
        return "In-person verification";
      default:
        return "Verification method: " + (method || "unknown");
    }
  };

  const { className, text } = env.NEXT_PUBLIC_BETA_ROUTE_INTEL 
    ? getEnhancedBadgeStyle(score) 
    : getBadgeStyle(score);

  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] ${className}`}
      title={`Confidence score: ${score}%`}
    >
      {label ?? text}
    </span>
  );
}

export default VerificationBadge;
