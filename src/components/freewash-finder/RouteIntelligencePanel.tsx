import { MapPin, Route, Clock, CheckCircle } from "lucide-react";

function themeClasses(theme: string) {
  switch (theme) {
    case "cyan":
      return {
        glow: "from-cyan-400/30 via-sky-500/20 to-blue-600/25",
        pill: "text-cyan-200 border-cyan-300/20 bg-cyan-400/10",
        icon: "text-cyan-300",
      };
    case "violet":
      return {
        glow: "from-fuchsia-400/30 via-violet-500/20 to-indigo-600/25",
        pill: "text-fuchsia-200 border-fuchsia-300/20 bg-fuchsia-400/10",
        icon: "text-fuchsia-300",
      };
    case "orange":
      return {
        glow: "from-orange-400/30 via-pink-500/20 to-rose-600/25",
        pill: "text-orange-100 border-orange-300/20 bg-orange-400/10",
        icon: "text-orange-300",
      };
    case "emerald":
      return {
        glow: "from-emerald-400/30 via-teal-500/20 to-cyan-600/25",
        pill: "text-emerald-100 border-emerald-300/20 bg-emerald-400/10",
        icon: "text-emerald-300",
      };
    default:
      return {
        glow: "from-cyan-400/30 via-sky-500/20 to-blue-600/25",
        pill: "text-cyan-200 border-cyan-300/20 bg-cyan-400/10",
        icon: "text-cyan-300",
      };
  }
}

interface RouteIntelProps {
  currentRoute: [number, number][];
  valuePerMile: number;
  timeSavings: number;
  premiumOffers: FreeconomyOffer[];
  routeEfficiencyScore: number;
  detourMinutes?: number;
}

export default function RouteIntelligencePanel({
  currentRoute,
  valuePerMile,
  timeSavings,
  premiumOffers,
  routeEfficiencyScore,
  detourMinutes = 0
}: RouteIntelProps) {
  const efficiencyVariant = 
    routeEfficiencyScore >= 90 ? 'emerald' :
    routeEfficiencyScore >= 70 ? 'cyan' : 
    'orange';

  return (
    <div className="rounded-[1.5rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.025))] p-5 shadow-[0_18px_60px_rgba(0,0,0,0.24)]">
      <div className="rounded-[calc(1.5rem-1px)] bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.025))] p-5 shadow-[0_18px_60px_rgba(0,0,0,0.24)]">
        <div className="flex items-center justify-between gap-4">
          <div className={`inline-flex rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] ${c.pill}`}>
            Route Intelligence
          </div>
          {verified ? (
            <div className="inline-flex items-center gap-1 text-xs text-white/70">
              <CheckCircle className={`h-4 w-4 ${c.icon}`} />
              <span>Verified</span>
            </div>
          ) : null}
        </div>

        <h3 className="mt-4 text-xl font-semibold text-white">{title}</h3>

        <div className="mt-4 space-y-3 text-sm text-white/65">
          <div className="flex items-center gap-2">
            <Route className={`h-4 w-4 ${c.icon}`} />
            <span>{route}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className={`h-4 w-4 ${c.icon}`} />
            <span>{eta}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className={`h-4 w-4 ${c.icon}`} />
            <span>{stops} stop{stops === 1 ? "" : "s"}</span>
          </div>
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm text-white/65">
              <Route className="h-4 w-4 text-cyan-300" />
              <span>${valuePerMile.toFixed(2)}/mi value density</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-white/65">
              <Clock className="h-4 w-4 text-cyan-300" />
              <span>{timeSavings} min optimized</span>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm text-white/65">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-400"></span>
              <span>Premium Score: {routeEfficiencyScore}/100</span>
            </div>
            {detourMinutes > 0 && (
              <div className="flex items-center gap-2 text-sm text-amber-200">
                <span>+{detourMinutes} min detour</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
