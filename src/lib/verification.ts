import type { StaticOffer } from "@/types/freewash";

type VerificationDetails = {
  sourceType?: "official" | "partner" | "user" | "scraped" | "unknown";
  verificationMethod?:
    | "partner-api"
    | "manual-review"
    | "official-site"
    | "phone-call"
    | "scrape-check"
    | "unknown";
  verifiedAt?: string;
  confidenceScore?: number;
  notes?: string;
};

function getVerificationDetails(offer: StaticOffer): VerificationDetails {
  const maybeDetails = (offer as StaticOffer & {
    verificationDetails?: VerificationDetails;
  }).verificationDetails;

  return maybeDetails ?? {};
}

export function calculateVerificationScore(offer: StaticOffer): number {
  let score = 0;
  const details = getVerificationDetails(offer);

  if (details.sourceType === "official") score += 40;
  if (details.verificationMethod === "partner-api") score += 30;
  if (details.verificationMethod === "official-site") score += 20;
  if (details.verificationMethod === "manual-review") score += 15;
  if (details.verificationMethod === "phone-call") score += 15;

  if ("verified" in offer && (offer as StaticOffer & { verified?: boolean }).verified) {
    score += 10;
  }

  if (details.verifiedAt) {
    const verifiedTime = new Date(details.verifiedAt).getTime();
    if (!Number.isNaN(verifiedTime)) {
      const daysOld = (Date.now() - verifiedTime) / (1000 * 60 * 60 * 24);
      if (daysOld <= 7) score += 15;
      else if (daysOld <= 30) score += 10;
      else if (daysOld <= 90) score += 5;
    }
  }

  if (typeof details.confidenceScore === "number") {
    score += Math.max(0, Math.min(20, Math.round(details.confidenceScore / 5)));
  }

  return Math.min(score, 100);
}

export function isHighConfidenceOffer(offer: StaticOffer): boolean {
  return calculateVerificationScore(offer) >= 70;
}
