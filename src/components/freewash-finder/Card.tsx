import { themeClasses } from "@/app/page";

interface CardProps {
  title: string;
  description: string;
  label?: string;
  meta?: string;
  theme?: "cyan" | "violet" | "orange" | "emerald";
  className?: string;
  children?: React.ReactNode;
}

export default function Card({
  title,
  description,
  label,
  meta,
  theme = "cyan",
  className = "",
  children
}: CardProps) {
  const c = themeClasses(theme);
  
  return (
    <article 
      className={`relative overflow-hidden rounded-[1.8rem] border border-white/10 glass-panel p-[1px] transition-all hover:scale-[1.02] hover:shadow-[0_24px_80px_rgba(0,0,0,0.4)] ${className}`}
      aria-labelledby={`card-${title}-heading`}
    >
      <div className={`absolute inset-0 rounded-[calc(1.8rem-1px)] bg-gradient-to-br ${c.medium}`} />
      <div className="relative h-full rounded-[calc(1.8rem-1px)] bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] backdrop-blur-[8px]">
        <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${c.heavy}`} />
        <div className={`absolute right-[-2rem] top-[-2rem] h-24 w-24 rounded-full blur-3xl ${c.orb}`} />
        <div className="relative space-y-6 p-8">
          {label && (
            <span className="inline-block text-[11px] uppercase tracking-[0.24em] text-white/42">
              {label}
            </span>
          )}
          <h3 id={`card-${title}-heading`} className="text-2xl font-bold tracking-tight text-white">
            {title}
          </h3>
          <p className="text-base leading-7 text-white/70">{description}</p>
          {meta && (
            <div className="text-label mt-4 text-white/40">
              {meta}
            </div>
          )}
          {children}
        </div>
      </div>
    </article>
  );
}
