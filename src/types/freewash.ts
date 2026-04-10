export type BayAreaRegion = 
  | "South Bay" 
  | "Peninsula"
  | "East Bay"
  | "North Bay"
  | "Outer Bay";

export type BayAreaCity = 
  | "San Francisco"
  | "Oakland" 
  | "San Jose"
  | "Palo Alto"
  | "Mountain View"
  | "Sunnyvale"
  | "Santa Clara" // Added here
  | "Redwood City"
  | "San Carlos"
  | "Burlingame"
  | "San Mateo"
  | "Hayward"
  | "San Leandro"
  | "Brentwood"
  | "Morgan Hill";

export type VerificationMethod =
  | "official-site"   // Primary verification
  | "in-person-check" // Highest confidence
  | "partner-feed";   // Verified partners only

export type VerificationStatus = {
  verifiedAt: string;
  verifiedBy: string; // 'system' | 'admin@freeconomie.com' | userId
  verificationMethod: 
    | "official-site" 
    | "phone-confirmation"
    | "in-person-check" 
    | "partner-feed"
    | "community-report";
  confidenceScore: number;
  stackVerified?: boolean;
  componentsVerified?: string[];
  verificationNotes?: string;
  lastChecked?: string;
  freshnessScore?: number;
  valueAssessment?: {
    amount: number;
    currency: string;
    confidence: number;
  };
  submissionSource?: {
    ip?: string;
    userAgent?: string;
    referrer?: string;
  };
};

export type FreeconomyCategory =
  | "free-car-wash"       // Anchor category
  | "premium-trial"       // High-value trials  
  | "corporate-perk"      // Employee benefits
  | "public-good"         // Municipal programs
  | "stackable"           // Combo offers
  | "ai-trial";           // AI tool trials

export type StackComponent = {
  id: string;
  name: string;
  valueEstimate: number;
  verified: boolean;
};

export type LocalOffer = {
  hyperlocalScore: number; // 0-100 based on neighborhood relevance
  walkingDistance?: boolean;
  valuePerUse?: number;    // Estimated $ value per use
  neighborhood?: string;
};

export type ValueEstimate = {
  amount: number;
  currency: "USD";
  source: "system" | "partner" | "user";
  confidence: number; // 0-100
  lastUpdated?: string;
};

export type TrialOffer = {
  trialType: 'membership' | 'saas' | 'service' | 'ai-tool';
  aiFeatures?: string[];
  durationDays: number;
  requiresPaymentMethod: boolean;
  autoRenews: boolean;
  valueEstimate: number;
  category?: 'productivity' | 'design' | 'dev-tools';
  redemptionMethod?: 'app' | 'web' | 'code';
};

export type GrandOpeningOffer = {
  openingDate: string;
  durationDays: number;
  organizer: string;
  estimatedAttendance?: number;
  valuePerPerson: number;
};

export type FinancialIncentive = {
  incentiveType: 'rebate' | 'tax-credit' | 'grant' | 'discount';
  amount: number;
  currency: 'USD';
  eligibility: string[];
  source: 'government' | 'corporate' | 'non-profit';
  expiration?: string;
  applicationUrl?: string;
};

export type StackableValue = {
  type: 'combo' | 'sequential' | 'bundled';
  components: {
    offerId: string;
    valueEstimate: number;
    requirements?: string;
  }[];
  maxStackValue: number;
  redemptionMethod: 'auto' | 'manual' | 'code';
};

export type FreeconomyOffer = {
  systemMetrics: {
    lastVerified: string;  
    freshnessScore: number; // 0-100 based on age
    routePriority?: number; // Suggested optimization score
  };
  economyType: FreeconomyCategory;
  valueEstimate?: ValueEstimate;
  restrictions?: string[];
  trialDetails?: TrialOffer;
  financialIncentives?: FinancialIncentive[];
  stackableValue?: StackableValue; // New optional field
};

export type ValueEstimate = {
  amount: number;
  currency: "USD";
  source: "system" | "partner" | "user";
  lastUpdated?: string;
};

// Backwards compatible alias
export type RouteCategory = FreeconomyCategory;

export type SignupType = 'email' | 'phone' | 'credit-card' | 'app' | 'membership' | 'none';

export type BonusOffer = {
  bonusType: 'signup' | 'referral' | 'loyalty' | 'seasonal';
  requirements: string[];
  expiration?: string;
  redemptionMethod: 'code' | 'app' | 'in-person';
  valueEstimate: number;
};

export type PerkOffer = {
  perkType: 'corporate' | 'membership' | 'community';
  provider: string;
  eligibility?: string[];
  redemptionMethod: 'code' | 'app' | 'in-person';
  valueEstimate: number;
};

export type FreeconomyOffer = {
  systemMetrics: {
    lastVerified: string;  
    freshnessScore: number; // 0-100 based on age
    routePriority?: number; // Suggested optimization score
  };
  economyType: FreeconomyCategory;
  valueEstimate?: number;
  perkDetails?: PerkOffer;
  bonusDetails?: BonusOffer; // New optional field
  restrictions?: string[];
  // Core identification
  id: string;
  businessName: string;
  offerTitle: string;
  economyType?: FreeconomyCategory; // Optional new field
  
  // Location data
  location: {
    address: string;
    city: BayAreaCity;
    state: "CA";
    region: BayAreaRegion;
    coordinates: {
      latitude: number;
      longitude: number;
    };
    distance?: number;
  };

  // Offer details
  category: RouteCategory;
  summary: string;
  offerHint: string;
  redemptionInstructions: string;
  restrictions?: string;
  expirationDate?: string;
  tags: string[];
  
  // Verification
  verification: VerificationStatus & {
    lastVerifiedAt: string;
    lastVerifiedBy?: string;
    verificationNotes?: string;
  };

  // Requirements
  requirements: {
    signup: {
      required: boolean;
      type?: SignupType;
      details?: string;
    };
    limitations?: string[];
  };

  // Business info
  businessInfo: {
    hours?: string;
    phone?: string;
    website?: string;
    amenities?: string[];
    washTypes?: string[];
    averageWaitTime?: string;
    loyaltyProgram?: boolean;
    paymentMethods?: string[];
    photos?: string[];
  };

  // Source tracking
  source: {
    name: string;
    url: string;
    checkedAt: string;
    type: 'official' | 'user-submitted' | 'scraped';
  };

  // Analytics
  metadata?: {
    rating?: number;
    popularity?: number;
    lastViewed?: string;
  };
};

export type Location = {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  offer_type: 'wash' | 'trial' | 'promo';
  details: string;
  expires_at: string;
  created_at: string;
  distance_in_km: number;
  verification_score: number;
};

export enum FilterType {
  REGION = 'region',
  CITY = 'city', 
  CATEGORY = 'category',
  VERIFICATION = 'verification',
  STATUS = 'status'
}

export type FilterOption = {
  value: string;
  label: string;
  count: number;
};

export type CategoryLabel = {
  text: string;
  bg: string;
  border: string;
  textColor: string;
};

export const CATEGORY_LABELS: Record<RouteCategory, CategoryLabel> = {
  'free-first-wash': {
    text: 'First Wash',
    bg: 'bg-cyan-500/12',
    border: 'border-cyan-400/25',
    textColor: 'text-cyan-400'
  },
  'free-membership-trial': {
    text: 'Membership Trial',
    bg: 'bg-violet-500/12',
    border: 'border-violet-400/25', 
    textColor: 'text-violet-400'
  },
  'promotional-offer': {
    text: 'Promo',
    bg: 'bg-orange-500/12',
    border: 'border-orange-400/25',
    textColor: 'text-orange-400'
  },
  'grand-opening': {
    text: 'Grand Opening',
    bg: 'bg-emerald-500/12',
    border: 'border-emerald-400/25',
    textColor: 'text-emerald-400'
  }
};

export type LocationFilters = {
  lat: number;
  lng: number;
  radius?: number;
  offer_type?: 'wash' | 'trial' | 'promo' | 'all';
  limit?: number;
  city?: BayAreaCity;
};
