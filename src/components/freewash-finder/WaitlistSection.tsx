import SectionShell from "./SectionShell";
import WaitlistForm from "./WaitlistForm";

export default function WaitlistSection() {
  return (
    <SectionShell
      id="waitlist"
      title="Premium wedge now. Bigger intelligence system next."
      subtitle="Early Access"
      theme="secondary"
    >
      <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.06),rgba(255,255,255,0.025))] p-8 shadow-[0_18px_60px_rgba(0,0,0,0.3)] sm:p-10 lg:max-w-5xl lg:p-12">
        <div className="space-y-6">
          <p className="text-lg leading-8 text-white/66">
            Launch as a polished route-aware free wash product, then expand into live ingestion,
            re-checking, submissions, verification systems, route intelligence, and broader
            free-value discovery.
          </p>

          <WaitlistForm />
        </div>
      </div>
    </SectionShell>
  );
}
