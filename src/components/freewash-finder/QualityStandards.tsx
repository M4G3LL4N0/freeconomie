import { CheckCircle, XCircle } from "lucide-react";

export function QualityStandards() {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
      <h3 className="text-sm font-semibold text-white">Freeconomie Quality Standards</h3>
      <ul className="mt-4 space-y-3 text-sm text-white/62">
        <li className="flex items-start gap-2">
          <CheckCircle className="h-4 w-4 shrink-0 text-emerald-300" />
          <span>No purchase requirements</span>
        </li>
        <li className="flex items-start gap-2">
          <CheckCircle className="h-4 w-4 shrink-0 text-emerald-300" />
          <span>No limited-time offers</span>
        </li>
        <li className="flex items-start gap-2">
          <CheckCircle className="h-4 w-4 shrink-0 text-emerald-300" />
          <span>No affiliate links</span>
        </li>
        <li className="flex items-start gap-2">
          <CheckCircle className="h-4 w-4 shrink-0 text-emerald-300" />
          <span>Minimum $15 value</span>
        </li>
      </ul>
      
      <h4 className="mt-6 text-sm font-semibold text-white">Rejection Criteria</h4>
      <ul className="mt-3 space-y-3 text-sm text-white/62">
        <li className="flex items-start gap-2">
          <XCircle className="h-4 w-4 shrink-0 text-rose-300" />
          <span>"Limited time offer" language</span>
        </li>
        <li className="flex items-start gap-2">
          <XCircle className="h-4 w-4 shrink-0 text-rose-300" />
          <span>"First X customers" restrictions</span>
        </li>
        <li className="flex items-start gap-2">
          <XCircle className="h-4 w-4 shrink-0 text-rose-300" />
          <span>Coupon code requirements</span>
        </li>
      </ul>
    </div>
  );
}
