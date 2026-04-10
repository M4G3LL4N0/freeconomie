import SectionShell from "@/components/freewash-finder/SectionShell";
import { bayAreaStaticOffers } from "@/lib/bay-area-offers";

const featured = bayAreaStaticOffers.slice(0, 6);

export default function MapPage() {
  return (
    <main className="min-h-screen bg-[#06111f] pt-10 text-white">
      <SectionShell
        eyebrow="Map View"
        title="Bay Area route discovery, starting with static verified launch data."
        description="This is the product scaffold for route-aware free wash discovery. Live mapping comes next; for now, the interface is driven by verified static Bay Area inventory."
      >
        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(13,28,52,0.96),rgba(20,34,68,0.88)_38%,rgba(25,24,52,0.84)_100%)] p-6 shadow-[0_30px_100px_rgba(0,0,0,0.42)]">
            <div className="mb-5 flex flex-wrap gap-2">
              {["Verified Only", ...env.NEXT_PUBLIC_DEFAULT_REGION, "On Route"].map((pill) => (
                <span
                  key={pill}
                  className="rounded-full border border-white/10 bg-white/6 px-3 py-1 text-xs text-white/70"
                >
                  {pill}
                </span>
              ))}
            </div>

            <div className="relative h-[520px] overflow-hidden rounded-[1.5rem] border border-white/10 bg-[radial-gradient(circle_at_30%_20%,rgba(56,189,248,0.16),transparent_18%),radial-gradient(circle_at_70%_30%,rgba(168,85,247,0.14),transparent_18%),linear-gradient(180deg,rgba(9,18,36,0.96),rgba(7,12,24,0.98))]">
              <div className="absolute inset-0 opacity-[0.14] [background-image:linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:48px_48px]" />

              <div className="absolute left-[22%] top-[28%] h-4 w-4 rounded-full bg-cyan-300 shadow-[0_0_22px_rgba(103,232,249,0.85)]" />
              <div className="absolute left-[36%] top-[42%] h-4 w-4 rounded-full bg-orange-300 shadow-[0_0_22px_rgba(253,186,116,0.85)]" />
              <div className="absolute left-[52%] top-[34%] h-4 w-4 rounded-full bg-fuchsia-300 shadow-[0_0_22px_rgba(244,114,182,0.85)]" />
              <div className="absolute left-[60%] top-[52%] h-4 w-4 rounded-full bg-cyan-300 shadow-[0_0_22px_rgba(103,232,249,0.85)]" />
              <div className="absolute left-[74%] top-[46%] h-4 w-4 rounded-full bg-violet-300 shadow-[0_0_22px_rgba(196,181,253,0.85)]" />

              <div className="absolute left-[23%] top-[29%] h-[2px] w-[31%] rotate-[16deg] bg-gradient-to-r from-cyan-300/70 to-fuchsia-300/60" />
              <div className="absolute left-[50%] top-[40%] h-[2px] w-[18%] rotate-[29deg] bg-gradient-to-r from-fuchsia-300/70 to-cyan-300/60" />
              <div className="absolute left-[36%] top-[42%] h-[2px] w-[39%] rotate-[4deg] bg-gradient-to-r from-orange-300/70 to-violet-300/60" />

              <div className="absolute bottom-4 left-4 right-4 rounded-[1.25rem] border border-white/10 bg-[#091221]/88 p-4 backdrop-blur-xl">
                <div className="text-xs uppercase tracking-[0.2em] text-white/42">
                  Example Routes
                </div>
                <div className="mt-3 grid gap-3 md:grid-cols-3">
                  {[
                    "Mountain View → Redwood City",
                    "Palo Alto → San Mateo",
                    "Sunnyvale → Santa Clara",
                  ].map((route) => (
                    <div
                      key={route}
                      className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white/74"
                    >
                      {route}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-4">
            {featured.map((offer) => (
              <div
                key={offer.id}
                className="rounded-[1.5rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.025))] p-5 shadow-[0_18px_60px_rgba(0,0,0,0.24)]"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="text-sm font-semibold text-white">{offer.businessName}</div>
                  <span className="rounded-full border border-cyan-300/20 bg-cyan-400/10 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-cyan-200">
                    Verified
                  </span>
                </div>
                <div className="mt-3 text-lg font-semibold text-white">{offer.offerTitle}</div>
                <div className="mt-2 text-sm text-white/62">
                  {offer.city} · {offer.region}
                </div>
                <p className="mt-3 text-sm leading-6 text-white/62">{offer.summary}</p>
                <div className="mt-4 text-xs uppercase tracking-[0.18em] text-white/40">
                  Last checked {offer.source.checkedAt}
                </div>
              </div>
            ))}
          </div>
        </div>
      </SectionShell>
    </main>
  );
}
