import { VerifiedIcon } from "@/components/icons";

interface SourceBadgeProps {
  sourceName: string;
  verificationMethod: 'official-site' | 'phone-confirmation' | 'in-person';
  className?: string;
}

export default function SourceBadge({ 
  sourceName,
  verificationMethod,
  className = "" 
}: SourceBadgeProps) {
  const getBadgeStyle = () => {
    switch(verificationMethod) {
      case 'official-site':
        return {
          bg: 'bg-emerald-400/10',
          border: 'border-emerald-400/20',
          text: 'text-emerald-400',
          icon: 'text-emerald-400'
        };
      case 'phone-confirmation':
        return {
          bg: 'bg-amber-400/10',
          border: 'border-amber-400/20',
          text: 'text-amber-400',
          icon: 'text-amber-400'
        };
      case 'in-person':
        return {
          bg: 'bg-cyan-400/10',
          border: 'border-cyan-400/20',
          text: 'text-cyan-400',
          icon: 'text-cyan-400'
        };
      default:
        return {
          bg: 'bg-white/5',
          border: 'border-white/10',
          text: 'text-white/60',
          icon: 'text-white/40'
        };
    }
  };

  const style = getBadgeStyle();

  return (
    <div 
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs ${style.bg} ${style.border} ${style.text} ${className}`}
    >
      <VerifiedIcon className={`h-3 w-3 ${style.icon}`} />
      <span>Source: {sourceName}</span>
    </div>
  );
}
