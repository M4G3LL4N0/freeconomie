import { themeClasses } from "@/app/page";

export default function ArtworkPanel({ theme }: { theme: string }) {
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
