import { VerifiedIcon } from "@/components/icons";

interface VerifiedBadgeProps {
  confidenceScore: number;
  verifiedAt: string;
  className?: string;
}

export default function VerifiedBadge({ 
  confidenceScore,
  verifiedAt,
  className = "" 
}: VerifiedBadgeProps) {
  const getBadgeStyle = (score: number) => {
    if (score >= 90) {
      return {
        text: 'text-emerald-400',
        bg: 'bg-emerald-400/10',
        border: 'border-emerald-400/20',
        icon: 'text-emerald-400'
      };
    } else if (score >= 80) {
      return {
        text: 'text-amber-400',
        bg: 'bg-amber-400/10',
        border: 'border-amber-400/20',
        icon: 'text-amber-400'
      };
    } else {
      return {
        text: 'text-white/60',
        bg: 'bg-white/5',
        border: 'border-white/10',
        icon: 'text-white/40'
      };
    }
  };

  const style = getBadgeStyle(confidenceScore);

  return (
    <div 
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs ${style.bg} ${style.border} ${style.text} ${className}`}
    >
      <VerifiedIcon className={`h-3 w-3 ${style.icon}`} />
      <span>Verified</span>
      <span className="font-medium">{confidenceScore}%</span>
    </div>
  );
}
