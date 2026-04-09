import { SectionShell } from "@/components/freewash-finder/SectionShell";
import OfferSubmissionForm from "@/components/freewash-finder/OfferSubmissionForm";

export default function SubmitPage() {
  return (
    <SectionShell id="submit" title="Submit a Free Wash" subtitle="Community Submission">
      <div className="mx-auto max-w-2xl">
        <p className="mt-4 text-lg leading-8 text-white/60 text-center">
          Help others find great free car wash offers by submitting verified locations.
        </p>
        <div className="mt-10 rounded-2xl border border-white/10 glass-panel p-6 backdrop-blur-sm">
          <OfferSubmissionForm />
        </div>
      </div>
    </SectionShell>
  );
}
