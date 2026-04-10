type VerificationBadgeProps = {
  score?: number;
  label?: string;
};

export function VerificationBadge({
  score = 100,
  label,
}: VerificationBadgeProps) {
  const getBadgeStyle = (score: number) => {
    if (score >= 90) {
      return {
        className: "border-emerald-300/20 bg-emerald-400/10 text-emerald-200",
        text: "Highly Verified"
      };
    } else if (score >= 70) {
      return {
        className: "border-cyan-300/20 bg-cyan-400/10 text-cyan-200", 
        text: "Verified"
      };
    } else if (score >= 50) {
      return {
        className: "border-amber-300/20 bg-amber-400/10 text-amber-200",
        text: "Partially Verified"
      };
    } else {
      return {
        className: "border-white/10 bg-white/6 text-white/70",
        text: "Unverified"
      };
    }
  };

  const { className, text } = getBadgeStyle(score);

  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] ${className}`}
      title={`Confidence score: ${score}%`}
    >
      {label ?? text}
    </span>
  );
}

export default VerificationBadge;
