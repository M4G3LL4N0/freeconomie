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

export function calculateVerificationScore(offer: FreeconomyOffer): {
  confidenceScore: number;
  verificationStatus: VerificationStatus;
} {
  let score = 0;
  const osMetrics = {
    valueScore: 0,
    routeDensity: 0,
    freshnessScore: 0
  };
  const details = getVerificationDetails(offer);

  // Source Type Weighting
  if (details.sourceType === "official") score += 50;
  else if (details.sourceType === "partner") score += 40;
  else if (details.sourceType === "user") score += 20;

  // Verification Method Weighting
  if (details.verificationMethod === "partner-api") score += 40;
  else if (details.verificationMethod === "official-site") score += 30;
  else if (details.verificationMethod === "in-person-visit") score += 50;
  else if (details.verificationMethod === "phone-call") score += 30;
  else if (details.verificationMethod === "manual-review") score += 20;

  // Recency Multiplier (exponential decay)
  if (details.verifiedAt) {
    const verifiedTime = new Date(details.verifiedAt).getTime();
    if (!Number.isNaN(verifiedTime)) {
      const daysOld = (Date.now() - verifiedTime) / (1000 * 60 * 60 * 24);
      if (daysOld <= 1) score *= 1.0;
      else if (daysOld <= 7) score *= 0.95;
      else if (daysOld <= 30) score *= 0.85;
      else if (daysOld <= 90) score *= 0.70;
      else score *= 0.50;
    }
  }

  // Confidence Score Adjustment
  if (typeof details.confidenceScore === "number") {
    score = Math.min(100, score + details.confidenceScore);
  }

  // Add value-based modifier
  const valueModifier = offer.valueEstimate 
    ? Math.min(offer.valueEstimate / 50, 10) // +10 max for high-value offers
    : 0;
    
  // Cap at 100 and ensure minimum of 0
  // Calculate OS metrics
  osMetrics.valueScore = Math.min(100, Math.round(
    (score * 0.6) + 
    (valueModifier * 20) +
    (getFreshnessScore(offer.source.checkedAt) * 20)
  ));

  return {
    confidenceScore: Math.max(0, Math.min(100, Math.round(score + valueModifier))),
    ...osMetrics
  };
}

export function isHighConfidenceOffer(offer: StaticOffer): boolean {
  return calculateVerificationScore(offer) >= 70;
}

export function calculateLocalRelevance(offer: FreeconomyOffer & LocalOffer): number {
  const baseScore = calculateVerificationScore(offer).confidenceScore;
  const localityModifiers = {
    walkingDistance: 15,
    neighborhoodPosted: 10, 
    communityEndorsed: 20
  };
  
  return Math.min(100, 
    baseScore + 
    (offer.walkingDistance ? localityModifiers.walkingDistance : 0) +
    (offer.neighborhood ? localityModifiers.neighborhoodPosted : 0)
  );
}

export function isPremiumOffer(offer: FreeconomyOffer & LocalOffer): boolean {
  return (
    (offer.valueEstimate?.amount || 0) >= 15 || // $15+ value
    offer.category === "free-car-wash" || // Grandfathered
    (offer.verification?.confidenceScore || 0) >= 80 // High confidence
  );
}

export function isVerifiedSaaSTrial(offer: FreeconomyOffer): boolean {
  return !!offer.trialDetails && 
    offer.trialDetails.trialType === 'saas' &&
    offer.trialDetails.valueEstimate >= 50 &&
    calculateVerificationScore(offer) >= 85;
}

export function isVerifiedAITrial(offer: FreeconomyOffer): boolean {
  return !!offer.trialDetails && 
    offer.trialDetails.trialType === 'ai-tool' &&
    (offer.valueEstimate?.amount || 0) >= 50 &&
    calculateVerificationScore(offer) >= 85;
}

export function isHighValueTrial(offer: FreeconomyOffer): boolean {
  return !!offer.trialDetails && 
    offer.trialDetails.valueEstimate >= 25 &&
    calculateVerificationScore(offer) >= 80;
}

export function isVerifiedFinancialIncentive(offer: FreeconomyOffer): boolean {
  return !!offer.financialIncentives?.some(i => 
    i.amount >= 100 &&
    i.source === 'government' &&
    calculateVerificationScore(offer) >= 85
  );
}

export function isVerifiedStackable(offer: FreeconomyOffer): boolean {
  return !!offer.stackableValue && 
    offer.stackableValue.maxStackValue >= 25 &&
    calculateVerificationScore(offer) >= 85;
}
import { VerificationStatus } from "@/types/freewash";

export function getVerificationIcon(status?: VerificationStatus): string {
  if (!status) return "?";

  switch (status.verificationMethod) {
    case "official-site":
      return "🌐";
    case "phone-confirmation":
      return "📞"; 
    case "in-person-visit":
      return "👤";
    default:
      return "✓";
  }
}

export function formatVerificationDate(status?: VerificationStatus): string {
  if (!status?.verifiedAt) return "Not verified";
  
  const date = new Date(status.verifiedAt);
  return `Verified ${date.toLocaleDateString()}`;
}

export function shouldReverify(status?: VerificationStatus): boolean {
  if (!status?.verifiedAt) return true;
  
  const verifiedDate = new Date(status.verifiedAt);
  const now = new Date();
  const monthsOld = (now.getTime() - verifiedDate.getTime()) / (1000 * 60 * 60 * 24 * 30);
  
  return monthsOld > 3; // Reverify if older than 3 months
}
