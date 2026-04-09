import WaitlistForm from "./WaitlistForm";
import SectionShell from "./SectionShell";

export default function WaitlistSection() {
  return (
    <SectionShell 
      id="waitlist" 
      title="Premium wedge now. Bigger intelligence system next."
      subtitle="Early Access"
      theme="secondary"
    >
      <div className="overflow-hidden rounded-[2rem] border border-white/10 glass-panel p-8 sm:p-10 lg:p-12 lg:max-w-5xl mx-auto">
        <div className="space-y-6">
          <p className="text-lg leading-8 text-white/66">
            Launch as a polished route-aware free wash product, then let the autobuilder compound
            it into maps, submissions, verification systems, user accounts, notifications, and broader
            free-trial intelligence.
          </p>
          <WaitlistForm />
        </div>
      </div>
    </SectionShell>
  );
}
