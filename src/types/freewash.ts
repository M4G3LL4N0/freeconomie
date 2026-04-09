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
  | "official-site" 
  | "phone-confirmation"
  | "in-person-visit"
  | "third-party-confirmation";

export type VerificationStatus = {
  verifiedAt: string; // ISO date
  verifiedBy: string; // 'system' | 'admin@freewashfinder.com' | userId
  verificationMethod: VerificationMethod;
  confidenceScore: number; // 0-100
};

export type RouteCategory = 
  | "free-first-wash"
  | "free-membership-trial"
  | "promotional-offer"
  | "grand-opening";

export type SignupType = 'email' | 'phone' | 'credit-card' | 'app' | 'membership' | 'none';

export type StaticOffer = {
  id: string; // 'businessname-city-year'
  businessName: string;
  offerTitle: string;
  city: BayAreaCity;
  state: "CA";
  address: string;
  region: BayAreaRegion;
  latitude: number;
  longitude: number;
  category: RouteCategory;
  summary: string;
  offerHint: string;
  signupRequired: boolean;
  signupType: SignupType;
  signupDetails?: string;
  verification: VerificationStatus;
  redemptionInstructions: string;
  lastVerifiedAt: string;
  accessibilityFeatures: string[];
  restrictions?: string;
  offerType: 'first-time' | 'membership-trial' | 'promotional';
  tags: string[];
  expirationDate?: string;
  rating?: number;
  distance?: number;
  source: {
    name: string;
    url: string;
    checkedAt: string;
  };
  businessHours?: string;
  phoneNumber?: string;
  website?: string;
  amenities?: string[];
  washTypes?: string[];
  averageWaitTime?: string;
  loyaltyProgram?: boolean;
  paymentMethods?: string[];
  photoUrls?: string[];
  lastVerifiedBy?: string;
  verificationNotes?: string;
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
