import Link from "next/link";
import { bayAreaStaticOffers } from "@/lib/bay-area-offers";

const cities = Array.from(new Set(bayAreaStaticOffers.map((o) => o.city))).sort();
const regions = Array.from(new Set(bayAreaStaticOffers.map((o) => o.region))).sort();

export default function ListPage() {
  return (
    <main className="min-h-screen bg-[#06111f] pt-10 text-white">
      <section className="px-6 pb-20 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 max-w-4xl">
            <div className="text-[11px] uppercase tracking-[0.28em] text-white/42">
              List View
            </div>
            <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
              Verified Bay Area free wash inventory.
            </h1>
            <p className="mt-6 text-base leading-8 text-white/66">
              Static launch data from official sites, organized into a premium list view while live ingestion comes next.
            </p>
          </div>

          <div className="mb-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
              <div className="text-xs uppercase tracking-[0.18em] text-white/40">Offers</div>
              <div className="mt-2 text-2xl font-semibold">{bayAreaStaticOffers.length}</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
              <div className="text-xs uppercase tracking-[0.18em] text-white/40">Cities</div>
              <div className="mt-2 text-2xl font-semibold">{cities.length}</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
              <div className="text-xs uppercase tracking-[0.18em] text-white/40">Regions</div>
              <div className="mt-2 text-2xl font-semibold">{regions.length}</div>
            </div>
          </div>

          <div className="mb-8 flex flex-wrap gap-2">
            {regions.map((region) => (
              <span key={region} className="rounded-full border border-white/10 bg-white/6 px-3 py-1 text-xs text-white/70">
                {region}
              </span>
            ))}
          </div>

          <div className="grid gap-4">
            {bayAreaStaticOffers.map((offer) => (
              <div
                key={offer.id}
                className="rounded-[1.5rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.025))] p-5 shadow-[0_18px_60px_rgba(0,0,0,0.24)]"
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div className="max-w-3xl">
                    <div className="flex flex-wrap gap-2">
                      <span className="rounded-full border border-cyan-300/20 bg-cyan-400/10 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-cyan-200">
                        Verified
                      </span>
                      <span className="rounded-full border border-white/10 bg-white/6 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-white/70">
                        {offer.region}
                      </span>
                      <span className="rounded-full border border-white/10 bg-white/6 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-white/70">
                        {offer.city}
                      </span>
                    </div>

                    <h2 className="mt-4 text-2xl font-semibold text-white">{offer.businessName}</h2>
                    <div className="mt-2 text-sm text-white/65">{offer.offerTitle}</div>
                    <div className="mt-2 text-sm text-white/50">{offer.address}</div>
                    <p className="mt-4 text-sm leading-7 text-white/62">{offer.summary}</p>
                    <p className="mt-3 text-sm leading-7 text-white/48">{offer.offerHint}</p>
                  </div>

                  <div className="min-w-[220px] rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                    <div className="text-xs uppercase tracking-[0.18em] text-white/40">Source</div>
                    <div className="mt-2 text-sm font-medium text-white">{offer.source.name}</div>
                    <div className="mt-3 text-xs uppercase tracking-[0.18em] text-white/40">Last checked</div>
                    <div className="mt-2 text-sm text-white/70">{offer.source.checkedAt}</div>
                    <div className="mt-3 text-xs uppercase tracking-[0.18em] text-white/40">Signup</div>
                    <div className="mt-2 text-sm text-white/70">{offer.signupRequired ? "Required" : "Not required"}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <Link
              href="/submit"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-cyan-400 via-sky-500 to-violet-500 px-6 py-3.5 text-sm font-semibold text-white shadow-[0_14px_40px_rgba(59,130,246,0.28)] transition hover:scale-[1.02]"
            >
              Submit Another Offer
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
