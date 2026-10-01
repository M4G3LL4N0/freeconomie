import Link from "next/link";
import { bayAreaStaticOffers } from "@/lib/bay-area-offers";

const seedCount = bayAreaStaticOffers.length;
const cityCount = new Set(bayAreaStaticOffers.map((offer) => offer.city)).size;

export default function Home() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-16">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm font-semibold tracking-tight">Freeconomie</p>
        <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-100">
          Early Access
        </span>
      </div>

      <section className="mt-10 grid items-center gap-10 lg:grid-cols-2">
        <div>
          <h1 className="max-w-xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Find free local value worth the detour.
          </h1>
          <p className="mt-4 max-w-lg text-base leading-7 text-slate-300 sm:text-lg">
            A curated Bay Area list — {seedCount} offers across {cityCount} cities — so a free wash or a useful perk is easy to see before you go.
          </p>
          <Link
            href="/list"
            className="mt-8 inline-flex min-h-11 items-center rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white"
          >
            Browse the list
          </Link>
        </div>
        <OfferStackVisual />
      </section>
    </main>
  );
}

function OfferStackVisual() {
  return (
    <figure className="overflow-hidden rounded-3xl border border-emerald-900/10 bg-[#f4efe4] p-5">
      <figcaption className="mb-4 flex items-center justify-between text-xs text-emerald-900/70">
        <span>Offer stack</span>
        <span>Static seed</span>
      </figcaption>
      <svg viewBox="0 0 480 320" className="h-auto w-full" role="img" aria-label="Stacked verified free offers for Bay Area cities">
        <rect width="480" height="320" rx="18" fill="#efe6d4" />
        <rect x="48" y="48" width="384" height="72" rx="14" fill="#fffdf8" stroke="#059669" />
        <text x="68" y="90" fill="#065f46" fontSize="18">Free wash · San Jose</text>
        <rect x="64" y="136" width="352" height="64" rx="14" fill="#ecfdf5" />
        <text x="84" y="174" fill="#047857" fontSize="16">Trial perk · Oakland</text>
        <rect x="80" y="216" width="320" height="56" rx="14" fill="#d1fae5" />
        <text x="100" y="250" fill="#065f46" fontSize="16">Local incentive · SF</text>
      </svg>
    </figure>
  );
}
