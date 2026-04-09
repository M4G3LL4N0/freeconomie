import { ReactNode } from "react";

export default function SectionShell({
  id,
  children,
  className = "",
}: {
  id: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section 
      id={id} 
      className={`px-6 py-28 sm:px-8 lg:px-10 ${className}`}
    >
      <div className="mx-auto max-w-7xl space-y-16">{children}</div>
    </section>
  );
}
