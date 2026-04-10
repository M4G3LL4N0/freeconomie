import SectionShell from "./SectionShell";
import WaitlistForm from "./WaitlistForm";

export default function WaitlistSection() {
  return (
    <SectionShell
      id="waitlist"
      title="From free washes to the full free economy"
      subtitle="Early Access"
      theme="secondary"
    >
      <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.06),rgba(255,255,255,0.025))] p-8 shadow-[0_18px_60px_rgba(0,0,0,0.3)] sm:p-10 lg:max-w-5xl lg:p-12">
        <div className="space-y-6">
          <p className="text-lg leading-8 text-white/66">
            Join early access as we expand from our premium car wash wedge to a complete free-value discovery platform with live verification and intelligent routing.
          </p>

          <WaitlistForm />
        </div>
      </div>
    </SectionShell>
  );
}
