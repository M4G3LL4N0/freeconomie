interface StatCardProps {
  value: string;
  label: string;
  className?: string;
}

export default function StatCard({
  value,
  label,
  className = ""
}: StatCardProps) {
  return (
    <div className={`rounded-xl border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-3 backdrop-blur-xl sm:rounded-2xl sm:p-4 ${className}`}>
      <div className="text-sm font-semibold text-white sm:text-base">{value}</div>
      <div className="mt-1 text-xs leading-normal text-white/54 sm:text-sm sm:leading-5">{label}</div>
    </div>
  );
}
