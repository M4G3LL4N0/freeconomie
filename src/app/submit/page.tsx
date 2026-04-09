import { SectionShell } from "@/components/freewash-finder/SectionShell";
import OfferSubmissionForm from "@/components/freewash-finder/OfferSubmissionForm";

export default function SubmitPage() {
  return (
    <SectionShell id="submit" className="pt-16">
      <div className="mx-auto max-w-2xl">
        <div className="text-center">
          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Submit a Free Wash
          </h1>
          <p className="mt-6 text-lg leading-8 text-white/60">
            Help others find great free car wash offers by submitting verified locations.
          </p>
        </div>

        <div className="mt-12 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
          <OfferSubmissionForm />
        </div>
      </div>
    </SectionShell>
  );
}
