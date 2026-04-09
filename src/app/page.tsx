type Card = {
  label: string;
  title: string;
  description: string;
  meta: string;
  theme: "cyan" | "violet" | "orange" | "emerald";
};

const routeSignals: Card[] = [
  {
    label: "Closest Verified Wash",
    title: "Palo Alto Prime Route", 
    description: "A verified first-time wash aligned directly with a Mountain View → Redwood City drive path.",
    meta: "5.5 miles",
    theme: "cyan",
  },
  {
    label: "Stacked Bonus Stop",
    title: "Redwood Value Chain",
    description: "Add a second free-value stop after your first redemption with timing and route continuity preserved.",
    meta: "Optional stop", 
    theme: "violet",
  },
  {
    label: "Offer Intelligence",
    title: "Grand Opening Signal",
    description: "Detected first-time promotional momentum from newly opened local businesses and activation campaigns.",
    meta: "Fresh promo",
    theme: "orange", 
  },
];

type PremiumCard = {
  eyebrow: string;
  title: string;
  body: string;
  theme: "cyan" | "violet" | "orange" | "emerald";
};

const premiumCards: PremiumCard[] = [
  {
    eyebrow: "Verification Layer",
    title: "Free offers you can actually use.", 
    body: "FreeWash Finder filters expired promos, weak offers, low-trust submissions, and misleading redemptions so the product feels reliable from day one.",
    theme: "cyan",
  },
  {
    eyebrow: "Route Logic",
    title: "Built around where you are already going.",
    body:
      "The product is not just about nearby deals. It is about aligning free-value opportunities with real movement patterns and useful routes.",
    theme: "violet",
  },
  {
    eyebrow: "Stack Engine",
    title: "More value from a single drive.",
    body:
      "Chain free washes, local first-time incentives, and route-aligned promotions into a cleaner and more efficient execution flow.",
    theme: "orange",
  },
];

type Stat = {
  value: string;
  label: string;
};

const stats: Stat[] = [
  { value: "100%", label: "Premium positioning" },
  { value: "Route-Aware", label: "Built around movement" },
  { value: "Verified", label: "Signal over clutter" },
  { value: "Scalable", label: "Beyond car washes" },
];

type ExpansionItem = {
  title: string;
  copy: string;
  theme: "cyan" | "violet" | "orange" | "emerald";
};

const expansion: ExpansionItem[] = [
  {
    title: "Gyms",
    copy: "Free day passes, first-week access, and local membership trial incentives.",
    theme: "cyan",
  },
  {
    title: "Food",
    copy: "Grand openings, app signups, first-order rewards, and local promotional discovery.",
    theme: "orange",
  },
  {
    title: "SaaS",
    copy: "Software and AI free trials organized into a smarter consumer value layer.",
    theme: "violet",
  },
  {
    title: "Finance",
    copy: "Bank bonuses, fintech onboarding incentives, and intelligent free-value stacking.",
    theme: "emerald",
  },
];

function themeClasses(theme: string) {
  const gradients = {
    cyan: {
      glow: "from-cyan-400/50 via-sky-500/40 to-blue-600/30",
      pill: "text-cyan-200 border-cyan-300/25 bg-cyan-400/15",
      beam: "from-cyan-300/80 via-sky-400/60 to-transparent",
      orb: "bg-cyan-400/25",
      text: "text-cyan-300",
      border: "border-cyan-400/35",
      bg: "bg-cyan-500/15"
    },
    violet: {
      glow: "from-violet-400/50 via-purple-500/40 to-fuchsia-600/30",
      pill: "text-violet-200 border-violet-300/25 bg-violet-400/15",
      beam: "from-violet-300/80 via-purple-400/60 to-transparent",
      orb: "bg-violet-400/25",
      text: "text-violet-300",
      border: "border-violet-400/35",
      bg: "bg-violet-500/15"
    },
    orange: {
      glow: "from-orange-400/50 via-amber-500/40 to-yellow-600/30",
      pill: "text-orange-200 border-orange-300/25 bg-orange-400/15",
      beam: "from-orange-300/80 via-amber-400/60 to-transparent",
      orb: "bg-orange-400/25",
      text: "text-orange-300",
      border: "border-orange-400/35",
      bg: "bg-orange-500/15"
    },
    emerald: {
      glow: "from-emerald-400/50 via-teal-500/40 to-cyan-600/30",
      pill: "text-emerald-200 border-emerald-300/25 bg-emerald-400/15",
      beam: "from-emerald-300/80 via-teal-400/60 to-transparent",
      orb: "bg-emerald-400/25",
      text: "text-emerald-300",
      border: "border-emerald-400/35",
      bg: "bg-emerald-500/15"
    }
  };

  return gradients[theme] || gradients.cyan;
}

function ArtworkPanel({ theme }: { theme: string }) {
  const c = themeClasses(theme);

  return (
    <div className={`relative overflow-hidden rounded-[1.5rem] bg-gradient-to-br ${c.glow} p-[1px]`}>
      <div className="relative h-56 overflow-hidden rounded-[calc(1.5rem-1px)] bg-[linear-gradient(180deg,rgba(12,18,35,0.94),rgba(7,12,24,0.98))]">
        <div className={`absolute left-[-10%] top-[-8%] h-36 w-36 rounded-full blur-3xl ${c.orb}`} />
        <div className={`absolute right-[8%] top-[18%] h-24 w-24 rounded-full blur-2xl ${c.orb}`} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.12),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.07),transparent_26%)]" />
        <div className="absolute inset-x-0 top-[22%] h-px bg-white/10" />
        <div className="absolute inset-x-0 top-[50%] h-px bg-white/10" />
        <div className="absolute inset-x-0 bottom-[18%] h-px bg-white/10" />
        <div className="absolute bottom-[14%] left-[8%] right-[8%] flex items-end justify-between gap-3">
          <div className="flex w-[28%] flex-col gap-3">
            <div className="h-12 rounded-xl border border-white/10 bg-white/6 backdrop-blur-xl" />
            <div className="h-8 rounded-lg border border-white/10 bg-white/6 backdrop-blur-xl" />
          </div>
          <div className="relative flex h-28 w-[38%] items-end justify-center">
            <div className={`absolute bottom-0 h-24 w-full rounded-t-[1.25rem] bg-gradient-to-t ${c.beam} blur-sm`} />
            <div className="absolute bottom-0 h-24 w-full rounded-t-[1.25rem] border border-white/10 bg-white/6 backdrop-blur-xl" />
            <div className="absolute bottom-4 left-4 right-4 h-px bg-white/10" />
            <div className="absolute bottom-8 left-6 right-6 h-px bg-white/10" />
            <div className="absolute bottom-12 left-8 right-8 h-px bg-white/10" />
          </div>
          <div className="flex w-[22%] flex-col gap-3">
            <div className="h-14 rounded-2xl border border-white/10 bg-white/6 backdrop-blur-xl" />
            <div className="h-10 rounded-xl border border-white/10 bg-white/6 backdrop-blur-xl" />
          </div>
        </div>
        <div className="absolute left-[7%] top-[8%] h-8 w-28 rounded-full border border-white/10 bg-white/8 backdrop-blur-xl" />
        <div className="absolute right-[8%] top-[10%] h-8 w-20 rounded-full border border-white/10 bg-white/8 backdrop-blur-xl" />
      </div>
    </div>
  );
}

import WaitlistSection from "@/components/freewash-finder/WaitlistSection";

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#06111f] text-white">
      <div className="relative isolate">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-[#06111f] to-[#040c18]" />
        <div className="pointer-events-none absolute inset-0 -z-20">
          <div className="absolute left-[-12%] top-[-10rem] h-[30rem] w-[30rem] rounded-full bg-cyan-500/14 blur-3xl" />
          <div className="absolute right-[-8%] top-[-4rem] h-[34rem] w-[34rem] rounded-full bg-violet-500/12 blur-3xl" />
          <div className="absolute left-1/2 top-[24rem] h-[24rem] w-[36rem] -translate-x-1/2 rounded-full bg-orange-400/10 blur-3xl" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,17,31,0.94)_0%,rgba(3,10,20,1)_100%)]" />
          <div className="absolute inset-0 opacity-[0.08] [background-image:radial-gradient(circle_at_center,white_1px,transparent_1px)] [background-size:28px_28px]" />
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
                  Route-Based Free Value
                </div>
              </div>
            </div>

            <nav className="hidden items-center gap-8 text-sm text-white/60 md:flex">
              <a href="#platform" className="transition hover:text-white">Platform</a>
              <a href="#signals" className="transition hover:text-white">Signals</a>
              <a href="#engine" className="transition hover:text-white">Engine</a>
              <a href="#expansion" className="transition hover:text-white">Expansion</a>
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
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.14),transparent_26%),radial-gradient(circle_at_right,rgba(255,255,255,0.06),transparent_22%)]" />
              <div className="absolute left-[6%] top-[10%] h-32 w-32 rounded-full bg-cyan-300/10 blur-3xl" />
              <div className="absolute right-[10%] top-[8%] h-40 w-40 rounded-full bg-violet-300/10 blur-3xl" />

              <div className="relative grid items-center gap-12 lg:grid-cols-[1.08fr_0.92fr]">
                <div>
                  <div className="inline-flex items-center rounded-full border border-white/10 bg-white/6 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.26em] text-white/68 backdrop-blur-xl">
                    Premium consumer utility, not coupon clutter
                  </div>

                  <h1 className="mt-7 max-w-4xl text-5xl font-semibold leading-[0.96] tracking-[-0.05em] text-white sm:text-6xl lg:text-7xl">
                    Find free value with a{" "}
                    <span className="bg-gradient-to-r from-cyan-300 via-white to-orange-300 bg-clip-text text-transparent">
                      smarter route layer.
                    </span>
                  </h1>

                  <p className="mt-7 max-w-3xl text-base leading-8 text-white/72 sm:text-lg">
                    FreeWash Finder turns scattered free offers into a premium discovery system
                    built around movement, verification, timing, and route-aligned execution.
                  </p>

                  <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                    <a
                      href="#waitlist"
                      className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-cyan-400 via-sky-500 to-violet-500 px-6 py-3.5 text-sm font-semibold text-white shadow-[0_14px_40px_rgba(59,130,246,0.28)] transition hover:scale-[1.02]"
                    >
                      Get Early Access
                    </a>
                    <a
                      href="#signals"
                      className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/6 px-6 py-3.5 text-sm font-semibold text-white/88 backdrop-blur-xl transition hover:bg-white/10"
                    >
                      Explore the System
                    </a>
                  </div>

                  <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
                    {stats.map((item) => (
                      <div
                        key={item.value}
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
                            Route Search
                          </div>
                          <div className="mt-2 text-sm font-medium leading-6 text-white/88">
                            Free car wash near Mountain View on the way to Redwood City
                          </div>
                        </div>
                        <div className="rounded-full border border-cyan-300/20 bg-cyan-400/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-200">
                          Live
                        </div>
                      </div>

                      <div className="mt-5 rounded-[1.3rem] border border-white/10 bg-[#091425]/86 p-4">
                        <ArtworkPanel theme="cyan" />
                      </div>

                      <div className="mt-5 grid gap-3">
                        {routeSignals.map((item) => {
                          const c = themeClasses(item.theme);
                          return (
                            <div
                              key={item.title}
                              className={`rounded-[1.25rem] border p-[1px] bg-gradient-to-r ${c.glow} border-transparent`}
                            >
                              <div className="rounded-[calc(1.25rem-1px)] bg-[#091221]/94 p-4">
                                <div className="flex items-center justify-between gap-4">
                                  <div>
                                    <div className={`inline-flex rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] ${c.pill}`}>
                                      {item.label}
                                    </div>
                                    <h3 className="mt-3 text-base font-semibold text-white">
                                      {item.title}
                                    </h3>
                                    <p className="mt-2 text-sm leading-6 text-white/60">
                                      {item.description}
                                    </p>
                                  </div>
                                  <div className="shrink-0 rounded-full border border-white/10 bg-white/6 px-3 py-1 text-xs font-medium text-white/74">
                                    {item.meta}
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      <div className="mt-5 rounded-[1.25rem] border border-white/8 bg-white/[0.04] p-4">
                        <div className="text-[11px] uppercase tracking-[0.24em] text-white/42">
                          Execution Flow
                        </div>
                        <p className="mt-2 text-sm leading-6 text-white/62">
                          One premium workflow for route matching, signup guidance, legitimacy verification,
                          timing, and stacked opportunity sequencing.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="signals" className="px-6 pb-20 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(72,88,132,0.42),rgba(20,29,53,0.78))] p-6 shadow-[0_20px_70px_rgba(0,0,0,0.34)] sm:p-8">
              <div className="max-w-4xl">
                <div className="text-[11px] uppercase tracking-[0.28em] text-white/42">
                  Signal Layer
                </div>
                <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
                  A premium intelligence interface for free value.
                </h2>
                <p className="mt-5 max-w-3xl text-base leading-8 text-white/66">
                  FreeWash Finder is not built like a cheap listings website. It is designed like a route-aware
                  intelligence product that turns fragmented incentives into clear action.
                </p>
              </div>

              <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {routeSignals.map((item) => {
                  const c = themeClasses(item.theme);
                  return (
                    <div
                      key={item.title}
                      className={`overflow-hidden rounded-[1.7rem] border border-white/10 bg-gradient-to-br ${c.glow} p-[1px]`}
                    >
                      <div className="h-full rounded-[calc(1.7rem-1px)] bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))]">
                        <div className="border-b border-white/8 p-4">
                          <ArtworkPanel theme={item.theme} />
                        </div>
                        <div className="p-5">
                          <div className={`inline-flex rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] ${c.pill}`}>
                            {item.label}
                          </div>
                          <h3 className="mt-4 text-xl font-semibold text-white">{item.title}</h3>
                          <p className="mt-3 text-sm leading-6 text-white/62">{item.description}</p>
                          <div className="mt-4 text-xs uppercase tracking-[0.18em] text-white/40">
                            {item.meta}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section id="platform" className="px-6 pb-20 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {premiumCards.map((card) => {
                const c = themeClasses(card.theme);
                return (
                  <div
                    key={card.title}
                    className="relative overflow-hidden rounded-[1.8rem] border border-white/10 glass-panel p-8"
                  >
                    <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-cyan-400/70 via-violet-500/60 to-orange-400/60`} />
                    <div className={`absolute right-[-2rem] top-[-2rem] h-24 w-24 rounded-full blur-3xl ${c.orb}`} />
                    <div className="relative space-y-6">
                      <span className="inline-block text-[11px] uppercase tracking-[0.24em] text-white/42">
                        {card.eyebrow}
                      </span>
                      <h3 className="text-2xl font-bold tracking-tight text-white">
                        {card.title}
                      </h3>
                      <p className="text-base leading-7 text-white/70">{card.body}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section id="engine" className="px-6 pb-20 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(12,24,44,0.96),rgba(14,21,38,0.9))] p-8 shadow-[0_18px_60px_rgba(0,0,0,0.3)]">
                <div className="text-[11px] uppercase tracking-[0.28em] text-white/42">
                  Route Engine
                </div>
                <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-white">
                  A distinct premium product style.
                </h2>
                <p className="mt-6 text-base leading-8 text-white/66">
                  This visual system is built around route intelligence, spatial flow, verification, and
                  polished consumer utility rather than copying a portfolio-site design language.
                </p>

                <div className="mt-8 space-y-4">
                  {[
                    "Map-aware utility framing instead of venture showcase framing",
                    "Brighter premium gradients with movement-oriented lighting",
                    "Product artwork panels that imply route intelligence and structured value",
                    "Cleaner consumer SaaS composition with stronger action flow",
                  ].map((point) => (
                    <div
                      key={point}
                      className="rounded-2xl border border-white/10 bg-white/[0.045] px-4 py-4 text-sm text-white/72"
                    >
                      {point}
                    </div>
                  ))}
                </div>
              </div>

              <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-6 shadow-[0_18px_60px_rgba(0,0,0,0.26)]">
                <div className="grid gap-5 md:grid-cols-2">
                  <div className="rounded-[1.5rem] border border-white/10 bg-[#0a1322]/86 p-4">
                    <div className="text-[11px] uppercase tracking-[0.24em] text-white/42">
                      Search Layer
                    </div>
                    <div className="mt-4 rounded-full border border-white/10 bg-white/6 px-4 py-3 text-sm text-white/56">
                      Search free washes near Mountain View...
                    </div>
                    <div className="mt-4">
                      <ArtworkPanel theme="cyan" />
                    </div>
                  </div>

                  <div className="rounded-[1.5rem] border border-white/10 bg-[#0a1322]/86 p-4">
                    <div className="text-[11px] uppercase tracking-[0.24em] text-white/42">
                      Value Stack
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {["Verified", "On Route", "Low Friction", "Premium UI"].map((pill) => (
                        <span
                          key={pill}
                          className="rounded-full border border-white/10 bg-white/6 px-3 py-1 text-xs text-white/68"
                        >
                          {pill}
                        </span>
                      ))}
                    </div>
                    <div className="mt-4">
                      <ArtworkPanel theme="orange" />
                    </div>
                  </div>

                  <div className="rounded-[1.5rem] border border-white/10 bg-[#0a1322]/86 p-4 md:col-span-2">
                    <div className="text-[11px] uppercase tracking-[0.24em] text-white/42">
                      Premium Offer Flow
                    </div>
                    <div className="mt-4 grid gap-3 md:grid-cols-3">
                      {[
                        "Detect a route-aligned free offer",
                        "Verify legitimacy and friction level",
                        "Present the cleanest next action",
                      ].map((step, index) => (
                        <div
                          key={step}
                          className="rounded-[1.25rem] border border-white/10 bg-white/[0.04] p-4"
                        >
                          <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/6 text-sm font-semibold text-white">
                            {index + 1}
                          </div>
                          <div className="mt-4 text-sm leading-6 text-white/72">{step}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="expansion" className="px-6 pb-20 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(14,24,44,0.96),rgba(23,34,58,0.86))] p-8 shadow-[0_18px_60px_rgba(0,0,0,0.3)]">
              <div className="max-w-4xl">
                <div className="text-[11px] uppercase tracking-[0.28em] text-white/42">
                  Expansion Layer
                </div>
                <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
                  Start with car washes. Expand into the full free-value economy.
                </h2>
                <p className="mt-6 text-base leading-8 text-white/66">
                  The wedge is simple and useful. The long-term system becomes a route-aware intelligence
                  layer for high-value free trials, local promos, and structured consumer value extraction.
                </p>
              </div>

              <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                {expansion.map((item) => {
                  const c = themeClasses(item.theme);
                  return (
                    <div
                      key={item.title}
                      className={`overflow-hidden rounded-[1.5rem] border border-white/10 bg-gradient-to-br ${c.glow} p-[1px]`}
                    >
                      <div className="h-full rounded-[calc(1.5rem-1px)] bg-[#0b1423]/94 p-5">
                        <div className={`inline-flex rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] ${c.pill}`}>
                          {item.title}
                        </div>
                        <div className="mt-4">
                          <ArtworkPanel theme={item.theme} />
                        </div>
                        <p className="mt-4 text-sm leading-6 text-white/62">{item.copy}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <WaitlistSection />
      </div>
    </main>
  );
}
