import { themeClasses } from "@/app/page";
import WaitlistForm from "./WaitlistForm";

export default function WaitlistSection() {
  return (
    <section id="waitlist" className="px-6 pb-24 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.06),rgba(255,255,255,0.025))] p-8 shadow-[0_18px_60px_rgba(0,0,0,0.3)] sm:p-10 lg:p-12">
          <div className="max-w-3xl">
            <div className="text-[11px] uppercase tracking-[0.28em] text-white/42">
              Early Access
            </div>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
              Premium wedge now. Bigger intelligence system next.
            </h2>
            <p className="mt-6 text-base leading-8 text-white/66">
              Launch as a polished route-aware free wash product, then let the autobuilder compound
              it into maps, submissions, verification systems, user accounts, notifications, and broader
              free-trial intelligence.
            </p>
          </div>

          <WaitlistForm />
        </div>
      </div>
    </section>
  );
}
