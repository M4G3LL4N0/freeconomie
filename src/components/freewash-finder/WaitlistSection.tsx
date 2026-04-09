import { themeClasses } from "@/app/page";
import WaitlistForm from "./WaitlistForm";

export default function WaitlistSection() {
  return (
    <section id="waitlist" className="px-6 pb-32 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="overflow-hidden rounded-[2rem] border border-white/10 glass-panel p-10 sm:p-12 lg:p-14">
          <div className="max-w-3xl space-y-8">
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

          <div className="mt-12">
            <WaitlistForm />
          </div>
        </div>
      </div>
    </section>
  );
}
