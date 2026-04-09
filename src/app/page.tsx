import Link from "next/link";
import { bayAreaStaticOffers } from "@/lib/bay-area-offers";

const stats = [
  { value: `${bayAreaStaticOffers.length}+`, label: "Launch offers" },
  { value: `${new Set(bayAreaStaticOffers.map((o) => o.city)).size}`, label: "Cities covered" },
  { value: `${new Set(bayAreaStaticOffers.map((o) => o.region)).size}`, label: "Regions covered" },
  { value: "Verified", label: "Official-site sourced" },
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
              <Link href="/map" className="transition hover:text-white">
                Map
              </Link>
              <Link href="/list" className="transition hover:text-white">
                List
              </Link>
              <Link href="/submit" className="transition hover:text-white">
                Submit
              </Link>
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
                    Premium consumer utility, not coupon clutter
                  </div>

                  <h1 className="mt-7 max-w-4xl text-5xl font-semibold leading-[0.96] tracking-[-0.05em] text-white sm:text-6xl lg:text-7xl">
                    Find free value with a{" "}
                    <span className="bg-gradient-to-r from-cyan-200 via-white to-orange-200 bg-clip-text text-transparent">
                      smarter route layer.
                    </span>
                  </h1>

                  <p className="mt-7 max-w-3xl text-base leading-8 text-white/72 sm:text-lg">
                    FreeWash Finder launches with verified Bay Area free-wash offers sourced from official car wash websites and structured into a premium route-aware discovery experience.
                  </p>

                  <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                    <Link
                      href="/list"
                      className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-cyan-400 via-sky-500 to-violet-500 px-6 py-3.5 text-sm font-semibold text-white shadow-[0_14px_40px_rgba(59,130,246,0.28)] transition hover:scale-[1.02]"
                    >
                      Explore Bay Area Offers
                    </Link>
                    <Link
                      href="/map"
                      className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/6 px-6 py-3.5 text-sm font-semibold text-white/88 backdrop-blur-xl transition hover:bg-white/10"
                    >
                      View Route Map
                    </Link>
                  </div>

                  <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
                    {stats.map((item) => (
                      <div
                        key={item.value + item.label}
                        className="rounded-2xl border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-4 backdrop-blur-xl"
                      >
                        <div className="text-sm font-semibold text-white">{item.value}</div>
                        <div className="mt-1 text-xs leading-5 text-white/54">{item.label}</div>
                      </div>
                    ))}
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
                                <div className="inline-flex rounded-full border border-cyan-300/20 bg-cyan-400/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-200">
                                  {item.city}
                                </div>
                                <h3 className="mt-3 text-base font-semibold text-white">
                                  {item.businessName}
                                </h3>
                                <p className="mt-2 text-sm leading-6 text-white/60">
                                  {item.offerTitle} · {item.summary}
                                </p>
                              </div>
                              <div className="shrink-0 rounded-full border border-white/10 bg-white/6 px-3 py-1 text-xs font-medium text-white/74">
                                {item.region}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-5 rounded-[1.25rem] border border-white/8 bg-white/[0.04] p-4">
                        <div className="text-[11px] uppercase tracking-[0.24em] text-white/42">
                          Live Next
                        </div>
                        <p className="mt-2 text-sm leading-6 text-white/62">
                          Static verified Bay Area data now. Scraper-import pipeline and re-checking system next.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 pb-20 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-5 md:grid-cols-3">
              {featured.map((item) => (
                <div
                  key={item.id}
                  className="rounded-[1.7rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-5 shadow-[0_18px_60px_rgba(0,0,0,0.24)]"
                >
                  <div className="inline-flex rounded-full border border-white/10 bg-white/6 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-white/70">
                    {item.region}
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-white">{item.businessName}</h3>
                  <p className="mt-2 text-sm text-white/62">{item.city}</p>
                  <p className="mt-4 text-sm leading-6 text-white/62">{item.summary}</p>
                  <div className="mt-4 text-xs uppercase tracking-[0.18em] text-white/40">
                    Source {item.source.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="waitlist" className="px-6 pb-24 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.06),rgba(255,255,255,0.025))] p-8 shadow-[0_18px_60px_rgba(0,0,0,0.3)] sm:p-10 lg:p-12">
              <div className="max-w-3xl">
                <div className="text-[11px] uppercase tracking-[0.28em] text-white/42">
                  Early Access
                </div>
                <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
                  Bay Area first. Live product next.
                </h2>
                <p className="mt-6 text-base leading-8 text-white/66">
                  Launching with verified static Bay Area inventory now, then expanding into live ingestion, re-checking, and broader free-value discovery.
                </p>
              </div>

              <form className="mt-8 flex max-w-2xl flex-col gap-4 sm:flex-row">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="min-w-0 flex-1 rounded-full border border-white/10 bg-[#091323]/94 px-5 py-4 text-sm text-white outline-none placeholder:text-white/28"
                />
                <button
                  type="submit"
                  className="rounded-full bg-gradient-to-r from-cyan-400 via-sky-500 to-violet-500 px-6 py-4 text-sm font-semibold text-white shadow-[0_14px_40px_rgba(59,130,246,0.26)] transition hover:scale-[1.02]"
                >
                  Join Waitlist
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
