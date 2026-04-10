import { FreeconomyCategory } from "@/types/freewash";

const categoryVariants = {
  "free-car-wash": {
    text: "Car Wash",
    className: "border-cyan-300/20 bg-cyan-400/10 text-cyan-200"
  },
  "premium-trial": {
    text: "Premium Trial",
    className: "border-violet-300/20 bg-violet-400/10 text-violet-200"
  },
  "community-meal": {
    text: "Community Meal",
    className: "border-amber-300/20 bg-amber-400/10 text-amber-100"
  },
  "skill-exchange": {
    text: "Skill Trade",
    className: "border-purple-300/20 bg-purple-400/10 text-purple-100"  
  },
  "public-resource": {
    text: "Public Resource",
    className: "border-emerald-300/20 bg-emerald-400/10 text-emerald-200"
  },
  "corporate-perk": {
    text: "Employee Perk",
    className: "border-amber-300/20 bg-amber-400/10 text-amber-200"
  },
  "membership-perk": {
    text: "Membership Perk",
    className: "border-violet-300/20 bg-violet-400/10 text-violet-200"
  }
};

export function getEconomyBadgeProps(category?: FreeconomyCategory) {
  return category && categoryVariants[category] 
    ? categoryVariants[category]
    : { 
        text: "Offer",
        className: "border-gray-300/20 bg-gray-400/10 text-gray-200"
      };
}

export function EconomyBadge({ category }: { category?: FreeconomyCategory }) {
  const variant = getEconomyBadgeProps(category);
  
  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] ${variant.className}`}
    >
      {variant.text}
    </span>
  );
}
