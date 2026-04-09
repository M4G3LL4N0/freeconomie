import { VerifiedIcon } from "@/components/icons";

interface VerifiedBadgeProps {
  confidenceScore: number;
  verifiedAt: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showScore?: boolean;
  showDate?: boolean;
  interactive?: boolean;
}

export default function VerifiedBadge({ 
  confidenceScore,
  verifiedAt,
  className = "",
  size = 'md',
  showScore = true,
  showDate = true,
  interactive = false
}: VerifiedBadgeProps) {
  const getBadgeStyle = () => {
    if (confidenceScore >= 90) {
      return {
        text: 'text-emerald-300',
        bg: 'bg-emerald-500/12',
        border: 'border-emerald-400/30',
        icon: 'text-emerald-400'
      };
    } else if (confidenceScore >= 80) {
      return {
        text: 'text-amber-300',
        bg: 'bg-amber-500/12',
        border: 'border-amber-400/30', 
        icon: 'text-amber-400'
      };
    } else {
      return {
        text: 'text-red-300',
        bg: 'bg-red-500/12',
        border: 'border-red-400/30',
        icon: 'text-red-400'
      };
    }
  };

  const getSizeClasses = () => {
    switch(size) {
      case 'sm':
        return {
          container: 'px-2 py-0.5 gap-1',
          text: 'text-xs',
          icon: 'h-3 w-3'
        };
      case 'lg':
        return {
          container: 'px-3 py-1 gap-2',
          text: 'text-sm',
          icon: 'h-4 w-4'
        };
      default: // md
        return {
          container: 'px-2.5 py-1 gap-1.5',
          text: 'text-sm',
          icon: 'h-3.5 w-3.5'
        };
    }
  };

  const style = getBadgeStyle();
  const sizeClasses = getSizeClasses();

  return (
    <div 
      className={`inline-flex items-center rounded-full border ${style.bg} ${style.border} ${sizeClasses.container} ${sizeClasses.text} ${style.text} ${className} ${
        interactive ? 'hover:opacity-90 transition-opacity cursor-pointer' : ''
      }`}
      aria-label={`Verification confidence: ${confidenceScore}%`}
    >
      <VerifiedIcon className={`${sizeClasses.icon} ${style.icon} flex-shrink-0`} />
      {showScore && (
        <span className="font-medium">
          {confidenceScore}%
        </span>
      )}
      {showDate && (
        <span className={`opacity-80 ${size === 'sm' ? 'text-[0.7em]' : 'text-xs'}`}>
          {new Date(verifiedAt).toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric',
            year: size === 'lg' ? 'numeric' : undefined
          })}
        </span>
      )}
    </div>
  );
}
