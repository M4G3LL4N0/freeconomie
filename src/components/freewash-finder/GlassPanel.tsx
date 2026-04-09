interface GlassPanelProps {
  children: React.ReactNode;
  className?: string;
  border?: boolean;
  blur?: boolean;
}

export default function GlassPanel({
  children,
  className = "",
  border = true,
  blur = true
}: GlassPanelProps) {
  return (
    <div className={`
      rounded-2xl 
      ${border ? 'border border-white/10' : ''}
      bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))]
      ${blur ? 'backdrop-blur-[8px]' : ''}
      shadow-[0_18px_60px_rgba(0,0,0,0.25)]
      ${className}
    `}>
      {children}
    </div>
  );
}
