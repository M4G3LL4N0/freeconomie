type VerificationBadgeProps = {
  verified?: boolean;
  label?: string;
};

export function VerificationBadge({
  verified = true,
  label,
}: VerificationBadgeProps) {
  const text = label ?? (verified ? "Verified" : "Unverified");

  return (
    <span
      className={
        verified
          ? "inline-flex rounded-full border border-cyan-300/20 bg-cyan-400/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-200"
          : "inline-flex rounded-full border border-white/10 bg-white/6 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/70"
      }
    >
      {text}
    </span>
  );
}

export default VerificationBadge;
