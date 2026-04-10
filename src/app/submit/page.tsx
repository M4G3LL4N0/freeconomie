import SectionShell from "@/components/freewash-finder/SectionShell";
import OfferSubmissionForm from "@/components/freewash-finder/OfferSubmissionForm";

export default function SubmitPage() {
  return (
    <main className="min-h-screen bg-[#06111f] pt-10 text-white">
      <SectionShell
        eyebrow="Submit an Offer"
        title="Help expand the Bay Area launch inventory."
        description="Submit a verified free wash or free-value offer. We’ll use this to grow the launch dataset and future verification pipeline."
      >
        <OfferSubmissionForm />
      </SectionShell>
    </main>
  );
}
