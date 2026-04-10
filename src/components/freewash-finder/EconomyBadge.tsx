import { FreeconomyCategory } from "@/types/freewash";

const categoryVariants = {
  "free-car-wash": {
    text: "Car Wash",
    className: "border-cyan-300/20 bg-cyan-400/10 text-cyan-200"
  },
  "free-trials": {
    text: "Free Trial",
    className: "border-violet-300/20 bg-violet-400/10 text-violet-200"
  },
  "free-samples": {
    text: "Free Sample",
    className: "border-emerald-300/20 bg-emerald-400/10 text-emerald-200"  
  },
  "community-shares": {
    text: "Community Share",
    className: "border-orange-300/20 bg-orange-400/10 text-orange-200"
  },
  "grand-openings": {
    text: "Grand Opening",
    className: "border-fuchsia-300/20 bg-fuchsia-400/10 text-fuchsia-200"
  },
  "no-strings-freebies": {
    text: "No Strings",
    className: "border-sky-300/20 bg-sky-400/10 text-sky-200"
  }
};

export function EconomyBadge({ category }: { category: FreeconomyCategory }) {
  const variant = categoryVariants[category];
  
  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] ${variant.className}`}
    >
      {variant.text}
    </span>
  );
}
