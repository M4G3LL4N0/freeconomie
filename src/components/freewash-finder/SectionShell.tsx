import { ReactNode } from "react";

interface SectionShellProps {
  id: string;
  children: ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
  theme?: "primary" | "secondary";
}

export default function SectionShell({ 
  id,
  children,
  className = "",
  title,
  subtitle,
  theme = "primary"
}: SectionShellProps) {
  return (
    <section 
      id={id} 
      className={`px-6 py-20 sm:py-24 sm:px-8 lg:px-10 relative isolate ${className}`}
    >
      {/* Background gradient */}
      {theme === "primary" && (
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#061626]/80 to-[#040c18]/90" />
      )}
      {theme === "secondary" && (
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#06111f] to-[#06111f]" />
      )}

      <div className="mx-auto max-w-7xl">
        {(title || subtitle) && (
          <div className="max-w-3xl mb-10 lg:mb-14">
            {subtitle && (
              <div className="text-[11px] uppercase tracking-[0.28em] text-white/42 mb-3">
                {subtitle}
              </div>
            )}
            {title && (
              <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
                {title}
              </h2>
            )}
          </div>
        )}
        <div className="space-y-16">{children}</div>
      </div>
    </section>
  );
}
