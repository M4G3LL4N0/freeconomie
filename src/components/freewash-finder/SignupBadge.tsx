import { InfoIcon } from "@/components/icons";

interface SignupBadgeProps {
  type: 'email' | 'phone' | 'credit-card' | 'app' | 'membership' | 'none';
  className?: string;
  tooltip?: string;
}

export default function SignupBadge({ 
  type,
  className = "",
  tooltip 
}: SignupBadgeProps) {
  const getBadgeStyle = () => {
    switch(type) {
      case 'credit-card':
        return {
          bg: 'bg-amber-500/12',
          border: 'border-amber-400/25',
          text: 'text-amber-400',
          icon: 'text-amber-400',
          label: 'Credit Card'
        };
      case 'app':
        return {
          bg: 'bg-cyan-500/12',
          border: 'border-cyan-400/25',
          text: 'text-cyan-400',
          icon: 'text-cyan-400',
          label: 'App Required'
        };
      case 'membership':
        return {
          bg: 'bg-violet-500/12',
          border: 'border-violet-400/25',
          text: 'text-violet-400',
          icon: 'text-violet-400',
          label: 'Membership'
        };
      case 'email':
        return {
          bg: 'bg-emerald-500/12',
          border: 'border-emerald-400/25',
          text: 'text-emerald-400',
          icon: 'text-emerald-400',
          label: 'Email'
        };
      case 'phone':
        return {
          bg: 'bg-blue-500/12',
          border: 'border-blue-400/25',
          text: 'text-blue-400',
          icon: 'text-blue-400',
          label: 'Phone'
        };
      default:
        return {
          bg: 'bg-white/5',
          border: 'border-white/10',
          text: 'text-white/60',
          icon: 'text-white/40',
          label: 'No Signup'
        };
    }
  };

  const style = getBadgeStyle();

  return (
    <div 
      className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs ${style.bg} ${style.border} ${style.text} ${className}`}
      aria-label={tooltip}
    >
      {type !== 'none' && (
        <>
          <span>{style.label}</span>
          {tooltip && <InfoIcon className={`h-3 w-3 ${style.icon}`} />}
        </>
      )}
    </div>
  );
}
