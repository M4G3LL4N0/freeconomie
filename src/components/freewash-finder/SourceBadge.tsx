import { VerifiedIcon, PhoneIcon, UserCheckIcon, GlobeIcon } from "@/components/icons";
import { Tooltip } from "@/components/ui/tooltip";

interface SourceBadgeProps {
  sourceName: string;
  verificationMethod: 'official-site' | 'phone-confirmation' | 'in-person';
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  truncate?: boolean;
  withTooltip?: boolean;
}

const verificationLabels = {
  'official-site': 'Verified via official website',
  'phone-confirmation': 'Verified via phone confirmation', 
  'in-person': 'Verified via in-person visit'
};

const sizeClasses = {
  sm: {
    container: 'px-2 py-0.5 gap-1 text-xs',
    icon: 'h-3 w-3'
  },
  md: {
    container: 'px-2.5 py-1 gap-1.5 text-sm',
    icon: 'h-3.5 w-3.5'
  },
  lg: {
    container: 'px-3 py-1 gap-2 text-base',
    icon: 'h-4 w-4'
  }
};

export default function SourceBadge({ 
  sourceName,
  verificationMethod,
  className = "", 
  size = 'md',
  truncate = false,
  withTooltip = true
}: SourceBadgeProps) {
  const getColorClasses = () => {
    switch(verificationMethod) {
      case 'official-site':
        return 'border-cyan-300/20 bg-cyan-400/10 text-cyan-300 hover:bg-cyan-400/15 transition-colors';
      case 'phone-confirmation':
        return 'border-emerald-300/20 bg-emerald-400/10 text-emerald-300 hover:bg-emerald-400/15 transition-colors';
      case 'in-person':
        return 'border-violet-300/20 bg-violet-400/10 text-violet-300 hover:bg-violet-400/15 transition-colors';
      default:
        return 'border-white/10 bg-white/5 text-white/80 hover:bg-white/10 transition-colors';
    }
  };

  const getIcon = () => {
    switch(verificationMethod) {
      case 'official-site':
        return <GlobeIcon className={sizeClasses[size].icon} />;
      case 'phone-confirmation':
        return <PhoneIcon className={sizeClasses[size].icon} />;
      case 'in-person':
        return <UserCheckIcon className={sizeClasses[size].icon} />;
      default:
        return <VerifiedIcon className={sizeClasses[size].icon} />;
    }
  };

  const badgeContent = (
    <div className="contents">
      {getIcon()}
      <span className={`font-medium ${truncate ? 'truncate max-w-[120px]' : ''}`}>
        {sourceName}
      </span>
    </div>
  );

  return withTooltip ? (
    <Tooltip content={verificationLabels[verificationMethod]}>
      <div 
        className={`inline-flex items-center rounded-full border ${getColorClasses()} ${sizeClasses[size].container} ${className}`}
        aria-label={`Verified via ${verificationMethod.replace('-', ' ')}`}
      >
        {badgeContent}
      </div>
    </Tooltip>
  ) : (
    <div 
      className={`inline-flex items-center rounded-full border ${getColorClasses()} ${sizeClasses[size].container} ${className}`}
      aria-label={`Verified via ${verificationMethod.replace('-', ' ')}`}
    >
      {badgeContent}
    </div>
  );
}
