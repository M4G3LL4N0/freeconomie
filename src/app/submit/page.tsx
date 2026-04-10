import SectionShell from "@/components/freewash-finder/SectionShell";
import OfferSubmissionForm from "@/components/freewash-finder/OfferSubmissionForm";

export default function SubmitPage() {
  return (
    <main className="min-h-screen bg-[#06111f] pt-10 text-white">
      <SectionShell
        eyebrow="Contribute Value" 
        title="Help build the free economy dataset"
        description="Submit verified free offers - starting with car washes and expanding to all high-value opportunities. All submissions undergo rigorous verification."
      >
        <OfferSubmissionForm />
      </SectionShell>
    </main>
  );
}
