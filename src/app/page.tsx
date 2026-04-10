import Link from "next/link";
import { bayAreaStaticOffers } from "@/lib/bay-area-offers";

const stats = [
  { 
    value: `${bayAreaStaticOffers.length}`, 
    label: "Verified Car Washes",
    description: `Across ${new Set(bayAreaStaticOffers.map((o) => o.city)).size} Bay Area cities`,
    icon: "verified"
  },
  { 
    value: `${Math.round((bayAreaStaticOffers.filter(o => o.source.type === "official").length / bayAreaStaticOffers.length) * 100)}%`, 
    label: "Official Sources",
    description: "Verified via business websites",
    icon: "source"
  },
  { 
    value: `${Math.round((bayAreaStaticOffers.filter(o => o.verification?.verificationMethod === "in-person-visit").length / bayAreaStaticOffers.length) * 100)}%`, 
    label: "On-Site Verified",
    description: "Physically confirmed locations",
    icon: "check"
  },
  { 
    value: `${new Set(bayAreaStaticOffers.map((o) => o.region)).size}`, 
    label: "Bay Area Regions",
    description: "From South Bay to North Bay",
    icon: "region"
  },
];

const featured = bayAreaStaticOffers.slice(0, 3);

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#06111f] text-white">
      <div className="relative isolate">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-[-12%] top-[-10rem] h-[30rem] w-[30rem] rounded-full bg-cyan-500/14 blur-3xl" />
          <div className="absolute right-[-8%] top-[-4rem] h-[34rem] w-[34rem] rounded-full bg-violet-500/12 blur-3xl" />
          <div className="absolute left-1/2 top-[24rem] h-[24rem] w-[36rem] -translate-x-1/2 rounded-full bg-orange-400/10 blur-3xl" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,17,31,0.94)_0%,rgba(3,10,20,1)_100%)]" />
        </div>

        <header className="sticky top-0 z-50 border-b border-white/8 bg-[#071120]/70 backdrop-blur-2xl">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 sm:px-8 lg:px-10">
            <div className="flex items-center gap-3">
              <div className="relative h-9 w-9 overflow-hidden rounded-2xl border border-white/10 bg-[linear-gradient(135deg,rgba(34,211,238,0.22),rgba(249,115,22,0.18),rgba(168,85,247,0.2))]">
                <div className="absolute inset-[6px] rounded-xl border border-white/10 bg-[#081321]/80 backdrop-blur-xl" />
                <div className="absolute inset-x-2 top-2 h-1 rounded-full bg-gradient-to-r from-cyan-300/70 via-white/60 to-orange-300/70" />
                <div className="absolute bottom-2 left-2 right-2 h-3 rounded-lg border border-white/10 bg-white/6" />
              </div>
              <div>
                <div className="text-base font-semibold tracking-tight text-white/96">
                  FreeWash Finder
                </div>
                <div className="text-[11px] uppercase tracking-[0.22em] text-white/38">
                  Bay Area Launch
                </div>
              </div>
            </div>

            <nav className="hidden items-center gap-8 text-sm text-white/60 md:flex">
              <Link href="/map" className="transition hover:text-white">Map</Link>
              <Link href="/list" className="transition hover:text-white">List</Link>
              <Link href="/submit" className="transition hover:text-white">Submit</Link>
            </nav>

            <a
              href="#waitlist"
              className="rounded-full border border-white/10 bg-white/6 px-5 py-2.5 text-sm font-semibold text-white/92 backdrop-blur-xl transition hover:bg-white/10"
            >
              Join Waitlist
            </a>
          </div>
        </header>

        <section className="px-6 pb-16 pt-12 sm:px-8 sm:pb-20 sm:pt-16 lg:px-10 lg:pt-20">
          <div className="mx-auto max-w-7xl">
            <div className="relative overflow-hidden rounded-[2.4rem] border border-white/10 bg-[linear-gradient(135deg,rgba(13,28,52,0.96),rgba(20,34,68,0.88)_38%,rgba(25,24,52,0.84)_100%)] px-6 py-10 shadow-[0_30px_100px_rgba(0,0,0,0.42)] sm:px-8 sm:py-12 lg:px-12 lg:py-14">
              <div className="relative grid items-center gap-12 lg:grid-cols-[1.08fr_0.92fr]">
                <div>
                  <div className="inline-flex items-center rounded-full border border-white/10 bg-white/6 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.26em] text-white/68 backdrop-blur-xl">
                    Freeconomie Launch Product · Static Seed Data
                  </div>

                  <h1 className="mt-7 max-w-4xl text-5xl font-semibold leading-[0.96] tracking-[-0.05em] text-white sm:text-6xl lg:text-7xl">
                    <span className="bg-gradient-to-r from-cyan-200 via-white to-orange-200 bg-clip-text text-transparent">
                      Freeconomie
                    </span>{" "}
                    <span className="text-white">Verifies Free Opportunities</span>
                    <span className="block mt-4 text-xl text-white/70">
                      Discover {bayAreaStaticOffers.length} verified free car washes in the Bay Area - 
                      the first step in building the definitive network for high-value free offers
                    </span>
                  </h1>

                  <div className="mt-8 max-w-3xl space-y-4 text-base leading-8 text-white/72 sm:text-lg">
                    <p>
                      Freeconomie surfaces and verifies truly free offers - starting with car washes and expanding to trials, samples, and public goods. 
                      Our Bay Area launch dataset is hand-verified with rigorous standards.
                    </p>
                    
                    <div className="rounded-xl border border-emerald-400/20 bg-emerald-500/10 p-4">
                      <h3 className="text-sm font-semibold text-emerald-200">Verification Standards</h3>
                      <div className="mt-2 text-sm text-emerald-100/80">
                        <p>Every offer in our Bay Area dataset meets these criteria:</p>
                        <ul className="mt-3 space-y-3">
                          <li className="flex items-start gap-2">
                            <span className="mt-0.5 h-2 w-2 rounded-full bg-emerald-400/80"></span>
                            <span>
                              <strong>Source Verified:</strong> {(bayAreaStaticOffers.filter(o => o.source.type === "official").length / bayAreaStaticOffers.length * 100).toFixed(0)}% confirmed via official business websites
                            </span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="mt-0.5 h-2 w-2 rounded-full bg-emerald-400/80"></span>
                            <span>
                              <strong>On-Site Confirmed:</strong> {(bayAreaStaticOffers.filter(o => o.verification?.verificationMethod === "in-person-visit").length / bayAreaStaticOffers.length * 100).toFixed(0)}% physically verified
                            </span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="mt-0.5 h-2 w-2 rounded-full bg-emerald-400/80"></span>
                            <span>
                              <strong>No Purchase Required:</strong> Truly free with no hidden costs
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <p>
                      This static dataset establishes our verification framework for future expansion:
                    </p>
                    <ul className="space-y-2 pl-5 list-disc">
                      <li>Live updates and automated verification</li>
                      <li>Route intelligence for optimized freeconomie trips</li>
                      <li>Expanded categories beyond car washes</li>
                    </ul>
                  </div>

                  <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                    <Link
                      href="/list"
                      className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-cyan-400 via-sky-500 to-violet-500 px-6 py-3.5 text-sm font-semibold text-white shadow-[0_14px_40px_rgba(59,130,246,0.28)] transition hover:scale-[1.02]"
                    >
                      Browse All Washes
                    </Link>
                    <Link
                      href="/map"
                      className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/6 px-6 py-3.5 text-sm font-semibold text-white/88 backdrop-blur-xl transition hover:bg-white/10"
                    >
                      Explore Map
                    </Link>
                    <Link
                      href="/submit"
                      className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/6 px-6 py-3.5 text-sm font-semibold text-white/88 backdrop-blur-xl transition hover:bg-white/10"
                    >
                      Submit New Offer
                    </Link>
                  </div>

                  <div className="mt-10 rounded-xl border border-white/10 bg-white/6 p-6">
                    <h3 className="text-sm font-semibold text-white">Product Roadmap</h3>
                    <div className="mt-4 space-y-4 text-sm text-white/72">
                      <div className="flex items-start gap-3">
                        <div className="mt-1 h-2 w-2 rounded-full bg-cyan-400/80"></div>
                        <div>
                          <p className="font-medium">Live Updates (Q3 2026)</p>
                          <p className="mt-1 text-xs text-white/60">Automated verification and real-time status monitoring</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="mt-1 h-2 w-2 rounded-full bg-violet-400/80"></div>
                        <div>
                          <p className="font-medium">Route Intelligence (Q4 2026)</p>
                          <p className="mt-1 text-xs text-white/60">Optimized routing and expanded categories</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="mt-1 h-2 w-2 rounded-full bg-orange-400/80"></div>
                        <div>
                          <p className="font-medium">National Expansion (2027)</p>
                          <p className="mt-1 text-xs text-white/60">Verified free opportunities across the US</p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 text-xs text-white/50">
                      Current version: Static Seed ({new Date().toLocaleDateString()}) - {bayAreaStaticOffers.length} verified offers
                    </div>
                  </div>

                  <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
                    {stats.map((item) => (
                      <div
                        key={item.value + item.label}
                        className="rounded-2xl border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-5 backdrop-blur-xl"
                      >
                        <div className="flex items-center justify-between">
                          <div className="text-sm font-semibold text-white">{item.value}</div>
                          <div className="h-5 w-5 rounded-full bg-white/6 flex items-center justify-center">
                            {/* Icon would go here */}
                          </div>
                        </div>
                        <div className="mt-2 text-sm font-medium text-white">{item.label}</div>
                        <div className="mt-1 text-xs leading-5 text-white/54">{item.description}</div>
                        {item.icon === "verified" && (
                          <div className="mt-3">
                            <div className="h-1.5 rounded-full bg-white/6">
                              <div 
                                className="h-1.5 rounded-full bg-gradient-to-r from-cyan-400 to-violet-500" 
                                style={{ width: `${Math.round((bayAreaStaticOffers.filter(o => o.verifiedAt).length / bayAreaStaticOffers.length) * 100)}%` }}
                              />
                            </div>
                            <div className="mt-1 text-[10px] text-white/40">
                              {bayAreaStaticOffers.filter(o => o.verifiedAt).length}/{bayAreaStaticOffers.length} verified
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="mt-10 rounded-xl border border-white/10 bg-white/6 p-6">
                    <h3 className="text-sm font-semibold text-white">Bay Area Coverage</h3>
                    <div className="mt-4 grid grid-cols-2 gap-4 text-sm text-white/72 sm:grid-cols-3">
                      {Array.from(new Set(bayAreaStaticOffers.map(o => o.city))).slice(0, 6).map(city => (
                        <div key={city} className="flex items-center gap-2">
                          <span className="h-2 w-2 rounded-full bg-cyan-400/80"></span>
                          <span>{city}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 text-xs text-white/50">
                      Covering {new Set(bayAreaStaticOffers.map(o => o.city)).size} cities across {new Set(bayAreaStaticOffers.map(o => o.region)).size} Bay Area regions
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-cyan-400/12 via-violet-500/10 to-orange-400/12 blur-2xl" />
                  <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(8,16,30,0.9),rgba(7,13,24,0.96))] p-5 backdrop-blur-2xl">
                    <div className="rounded-[1.5rem] border border-white/8 bg-white/[0.04] p-5">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <div className="text-[11px] uppercase tracking-[0.24em] text-white/42">
                            Launch Coverage
                          </div>
                          <div className="mt-2 text-sm font-medium leading-6 text-white/88">
                            Bay Area verified free wash inventory
                          </div>
                        </div>
                        <div className="rounded-full border border-cyan-300/20 bg-cyan-400/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-200">
                          Static Seed
                        </div>
                      </div>

                      <div className="mt-5 grid gap-3">
                        {featured.map((item) => (
                          <div
                            key={item.id}
                            className="rounded-[1.25rem] border border-white/10 bg-[#091221]/94 p-4"
                          >
                            <div className="flex items-center justify-between gap-4">
                              <div>
                                <div className="flex items-center gap-2">
                                  <div className="flex items-center gap-2">
                                    <div className="inline-flex rounded-full border border-cyan-300/20 bg-cyan-400/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-200">
                                      {item.city}
                                    </div>
                                    <div className="text-[10px] uppercase tracking-[0.2em] text-white/50">
                                      Verified {new Date(item.verifiedAt).toLocaleDateString()}
                                    </div>
                                    {item.source.type === "official" && (
                                      <div className="inline-flex items-center gap-1 rounded-full border border-emerald-300/20 bg-emerald-400/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-emerald-200">
                                        <span className="relative flex h-2 w-2">
                                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                                          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
                                        </span>
                                        Official Source
                                      </div>
                                    )}
                                  </div>
                                </div>
                                <h3 className="mt-3 text-base font-semibold text-white">
                                  {item.businessName}
                                </h3>
                                <p className="mt-2 text-sm leading-6 text-white/60">
                                  {item.offerTitle} · {item.summary}
                                </p>
                                <div className="mt-2 flex items-center gap-2 text-xs text-white/50">
                                  <span>Source: {item.source.type === "official" ? "Official Site" : "Verified Partner"}</span>
                                  <span>·</span>
                                  <span>Last Checked: {new Date(item.source.checkedAt).toLocaleDateString()}</span>
                                </div>
                              </div>
                              <div className="shrink-0 rounded-full border border-white/10 bg-white/6 px-3 py-1 text-xs font-medium text-white/74">
                                {item.region}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-5 rounded-[1.25rem] border border-white/8 bg-white/[0.04] p-5">
                        <div className="text-[11px] uppercase tracking-[0.24em] text-white/42">
                          Roadmap
                        </div>
                        <div className="mt-4 space-y-4">
                          <div className="flex items-start gap-4">
                            <div className="relative pt-1">
                              <div className="absolute left-0 top-0 h-full w-0.5 bg-gradient-to-b from-cyan-400/80 via-white/30 to-white/10" />
                            </div>
                            <div>
                              <div className="text-sm font-medium text-white">
                                Static Seed ({new Date().toLocaleDateString()})
                              </div>
                              <div className="mt-1 text-sm leading-6 text-white/62">
                                {bayAreaStaticOffers.length} manually verified offers across {new Set(bayAreaStaticOffers.map(o => o.city)).size} cities
                              </div>
                            </div>
                          </div>
                          <div className="flex items-start gap-4">
                            <div className="relative pt-1">
                              <div className="absolute left-0 top-0 h-full w-0.5 bg-gradient-to-b from-white/30 via-white/10 to-transparent" />
                            </div>
                            <div>
                              <div className="text-sm font-medium text-white">
                                Phase 1: Live Ingestion (Q3 2026)
                              </div>
                              <div className="mt-1 text-sm leading-6 text-white/62">
                                Automated scraping from official sources + manual submissions
                              </div>
                            </div>
                          </div>
                          <div className="flex items-start gap-4">
                            <div className="relative pt-1">
                              <div className="absolute left-0 top-0 h-full w-0.5 bg-gradient-to-b from-white/10 to-transparent" />
                            </div>
                            <div>
                              <div className="text-sm font-medium text-white">
                                Phase 2: Verification Expansion (Q4 2026)
                              </div>
                              <div className="mt-1 text-sm leading-6 text-white/62">
                                Multi-source validation + community verification
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="waitlist" className="px-6 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24 bg-[linear-gradient(180deg,rgba(6,17,31,0.94)_0%,rgba(3,10,20,1)_100%)]">
          <div className="mx-auto max-w-4xl">
            <div className="text-center">
              <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Join the Freeconomie Waitlist
              </h2>
              <p className="mt-4 text-lg leading-8 text-white/70">
                Get early access to premium verified free opportunities beyond car washes - trials, samples, and public goods.
              </p>
            </div>
            
            <div className="mt-10">
              <WaitlistForm />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
