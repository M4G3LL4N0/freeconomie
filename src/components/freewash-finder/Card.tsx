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
}

export default function Card({
  title,
  description,
  label,
  meta,
  theme = "cyan",
}: CardProps) {
  const c = themeClasses(theme);

  return (
    <div
      className={`relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-gradient-to-br ${c.glow} p-[1px]`}
    >
      <div className="relative h-full rounded-[calc(1.5rem-1px)] bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.025))] p-5 shadow-[0_18px_60px_rgba(0,0,0,0.24)]">
        <div className={`absolute right-[-1.5rem] top-[-1.5rem] h-20 w-20 rounded-full blur-3xl ${c.orb}`} />
        {label ? (
          <div className={`inline-flex rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] ${c.pill}`}>
            {label}
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
