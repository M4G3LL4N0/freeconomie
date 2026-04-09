import { bayAreaStaticOffers } from "@/lib/bay-area-offers";
import { MapPin } from "lucide-react";

const featuredRoutes = [
  {
    name: "Mountain View → Redwood City",
    offers: bayAreaStaticOffers.filter(o => 
      o.city === "Mountain View" || o.city === "Redwood City"
    ).slice(0, 3)
  },
  {
    name: "Palo Alto → San Mateo", 
    offers: bayAreaStaticOffers.filter(o =>
      o.city === "Palo Alto" || o.city === "San Mateo"
    ).slice(0, 3)
  },
  {
    name: "Sunnyvale → Santa Clara",
    offers: bayAreaStaticOffers.filter(o =>
      o.city === "Sunnyvale" || o.city === "Santa Clara"
    ).slice(0, 3)
  }
];

export default function MapPage() {
  return (
    <main className="min-h-screen bg-[#06111f] pt-10 text-white">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-white">Bay Area Route Discovery</h1>
          <p className="mt-2 text-white/60">
            Verified static inventory of {bayAreaStaticOffers.length} free wash offers across {new Set(bayAreaStaticOffers.map(o => o.city)).size} cities
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_0.5fr]">
          {/* Map Area */}
          <div className="relative h-[600px] overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_30%_20%,rgba(56,189,248,0.16),transparent_18%),radial-gradient(circle_at_70%_30%,rgba(168,85,247,0.14),transparent_18%),linear-gradient(180deg,rgba(9,18,36,0.96),rgba(7,12,24,0.98))]">
            {/* Map markers */}
            {bayAreaStaticOffers.map((offer, index) => (
              <div 
                key={offer.id}
                className="absolute"
                style={{
                  left: `${20 + (index % 10) * 7}%`,
                  top: `${20 + Math.floor(index / 10) * 7}%`
                }}
              >
                <div className="relative group">
                  <div className="h-3 w-3 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,0.85)]" />
                  <div className="absolute left-1/2 top-full mt-2 hidden group-hover:block w-64 z-10">
                    <div className="glass-panel rounded-xl border border-white/10 p-4">
                      <h3 className="font-medium text-white">{offer.businessName}</h3>
                      <p className="mt-1 text-sm text-white/80">{offer.city}, {offer.region}</p>
                      <p className="mt-2 text-sm text-white/70">{offer.summary}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Route lines */}
            <div className="absolute left-[25%] top-[30%] h-[2px] w-[30%] rotate-[20deg] bg-gradient-to-r from-cyan-300/70 to-fuchsia-300/60" />
            <div className="absolute left-[50%] top-[40%] h-[2px] w-[20%] rotate-[30deg] bg-gradient-to-r from-fuchsia-300/70 to-cyan-300/60" />
            
            {/* Map key */}
            <div className="absolute bottom-4 left-4 right-4 rounded-[1.25rem] border border-white/10 bg-[#091221]/88 p-4 backdrop-blur-xl">
              <div className="text-xs uppercase tracking-[0.2em] text-white/42">
                Bay Area Free Wash Coverage
              </div>
              <div className="mt-3 grid gap-3 sm:grid-cols-3">
                {featuredRoutes.map((route) => (
                  <div
                    key={route.name}
                    className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white/74"
                  >
                    <div className="font-medium">{route.name}</div>
                    <div className="mt-1 text-xs text-white/50">
                      {route.offers.length} verified offers
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Side panel */}
          <div className="space-y-6">
            <div className="glass-panel rounded-[2rem] border border-white/10 p-6">
              <h2 className="text-xl font-semibold text-white">Featured Routes</h2>
              <div className="mt-4 space-y-4">
                {featuredRoutes.map((route) => (
                  <div key={route.name} className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <h3 className="font-medium text-white">{route.name}</h3>
                    <div className="mt-3 space-y-3">
                      {route.offers.map(offer => (
                        <div key={offer.id} className="flex items-start gap-3">
                          <MapPin className="h-4 w-4 mt-0.5 text-cyan-300 flex-shrink-0" />
                          <div>
                            <div className="text-sm text-white">{offer.businessName}</div>
                            <div className="text-xs text-white/60">{offer.city}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-panel rounded-[2rem] border border-white/10 p-6">
              <h2 className="text-xl font-semibold text-white">Launch Coverage</h2>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                  <div className="text-xs text-white/60">Cities</div>
                  <div className="mt-1 text-2xl font-semibold">
                    {new Set(bayAreaStaticOffers.map(o => o.city)).size}
                  </div>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                  <div className="text-xs text-white/60">Offers</div>
                  <div className="mt-1 text-2xl font-semibold">
                    {bayAreaStaticOffers.length}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(13,28,52,0.96),rgba(20,34,68,0.88)_38%,rgba(25,24,52,0.84)_100%)] p-6 shadow-[0_30px_100px_rgba(0,0,0,0.42)]">
            <div className="mb-5 flex flex-wrap gap-2">
              {["Verified Only", "Peninsula", "South Bay", "East Bay", "On Route"].map((pill) => (
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
