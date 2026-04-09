import { themeClasses } from "@/app/page";
import { MapPin, Route, Clock, CheckCircle } from "lucide-react";

interface RouteIntelligencePanelProps {
  origin: string;
  destination: string;
  optimizedRoute: {
    distance: string;
    time: string;
    washes: number;
  };
  theme?: "cyan" | "violet" | "orange" | "emerald";
}

export default function RouteIntelligencePanel({
  origin,
  destination,
  optimizedRoute,
  theme = "cyan",
}: RouteIntelligencePanelProps) {
  const c = themeClasses(theme);

  return (
    <div className={`rounded-2xl border ${c.border} bg-gradient-to-br from-white/5 to-white/2 p-5 backdrop-blur-lg`}>
      <div className="flex items-center gap-3">
        <div className={`rounded-full p-2 ${c.bg}`}>
          <Route className={`h-5 w-5 ${c.text}`} />
        </div>
        <h3 className="text-lg font-semibold text-white">
          {origin} → {destination}
        </h3>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-3">
        <div className="rounded-xl border border-white/10 bg-white/5 p-3">
          <div className="flex items-center gap-2 text-sm text-white/60">
            <Clock className="h-4 w-4" />
            <span>Time</span>
          </div>
          <div className="mt-1 text-lg font-medium text-white">
            {optimizedRoute.time}
          </div>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/5 p-3">
          <div className="flex items-center gap-2 text-sm text-white/60">
            <MapPin className="h-4 w-4" />
            <span>Distance</span>
          </div>
          <div className="mt-1 text-lg font-medium text-white">
            {optimizedRoute.distance}
          </div>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/5 p-3">
          <div className="flex items-center gap-2 text-sm text-white/60">
            <CheckCircle className="h-4 w-4" />
            <span>Washes</span>
          </div>
          <div className="mt-1 text-lg font-medium text-white">
            {optimizedRoute.washes}
          </div>
        </div>
      </div>

      <div className="mt-4 flex justify-end">
        <button
          className={`rounded-full border ${c.border} ${c.bg} px-4 py-2 text-sm font-medium ${c.text} transition hover:bg-white/10`}
        >
          Optimize Route
        </button>
      </div>
    </div>
  );
}
