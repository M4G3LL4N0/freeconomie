function themeClasses(theme: string) {
  switch (theme) {
    case "cyan":
      return {
        glow: "from-cyan-400/30 via-sky-500/20 to-blue-600/25",
        pill: "text-cyan-200 border-cyan-300/20 bg-cyan-400/10",
        orb: "bg-cyan-400/20",
      };
    case "violet":
      return {
        glow: "from-fuchsia-400/30 via-violet-500/20 to-indigo-600/25",
        pill: "text-fuchsia-200 border-fuchsia-300/20 bg-fuchsia-400/10",
        orb: "bg-fuchsia-400/20",
      };
    case "orange":
      return {
        glow: "from-orange-400/30 via-pink-500/20 to-rose-600/25",
        pill: "text-orange-100 border-orange-300/20 bg-orange-400/10",
        orb: "bg-orange-400/20",
      };
    case "emerald":
      return {
        glow: "from-emerald-400/30 via-teal-500/20 to-cyan-600/25",
        pill: "text-emerald-100 border-emerald-300/20 bg-emerald-400/10",
        orb: "bg-emerald-400/20",
      };
    default:
      return {
        glow: "from-cyan-400/30 via-sky-500/20 to-blue-600/25",
        pill: "text-cyan-200 border-cyan-300/20 bg-cyan-400/10",
        orb: "bg-cyan-400/20",
      };
  }
}

interface CardProps {
  title: string;
  description?: string;
  label?: string;
  meta?: string;
  theme?: string;
  valueBadge?: number;
  economyType?: 'car-wash' | 'trial' | 'sample';
  verificationLevel?: 'gold' | 'silver' | 'bronze';
}

export default function Card({
  title,
  description,
  label,
  meta,
  theme = "cyan",
  valueBadge,
  economyType = 'car-wash',
  verificationLevel = 'bronze'
}: CardProps) {
  const c = themeClasses(
    economyType === 'trial' ? 'violet' : 
    economyType === 'sample' ? 'emerald' : 'cyan'
  );

  return (
    <div
      className={`relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-gradient-to-br ${c.glow} p-[1px]`}
    >
      <div className="relative h-full rounded-[calc(1.5rem-1px)] bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.025))] p-5 shadow-[0_18px_60px_rgba(0,0,0,0.24)]">
        <div className={`absolute right-[-1.5rem] top-[-1.5rem] h-20 w-20 rounded-full blur-3xl ${c.orb}`} />
        {label ? (
          <div className={`inline-flex rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] ${c.pill}`}>
            {label}
            {valueBadge && (
              <span className={`inline-flex rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] bg-gradient-to-r from-amber-400/20 to-amber-600/10 border-amber-300/20 text-amber-100`}>
                ${valueBadge} Value
              </span>
            )}
            <span className={`inline-flex rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] ${
              verificationLevel === 'gold' ? 'bg-gradient-to-r from-yellow-400/15 to-yellow-600/10 border-yellow-300/20 text-yellow-100' :
              verificationLevel === 'silver' ? 'bg-white/10 border-white/20 text-white/80' :
              'border-white/10 bg-white/6 text-white/70'
            }`}>
              {verificationLevel.toUpperCase()} VERIFIED
            </span>
          </div>
        ) : null}
        <h3 className="mt-4 text-xl font-semibold text-white">{title}</h3>
        {description ? (
          <p className="mt-3 text-sm leading-6 text-white/62">{description}</p>
        ) : null}
        {meta ? (
          <div className="mt-4 text-xs uppercase tracking-[0.18em] text-white/40">
            {meta}
          </div>
        ) : null}
      </div>
    </div>
  );
}
