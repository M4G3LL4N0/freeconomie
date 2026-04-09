export type OfferSource = {
  name: string;
  url: string;
  checkedAt: string;
};

export type StaticOffer = {
  id: string;
  businessName: string;
  offerTitle: string;
  city: string;
  state: "CA";
  address: string;
  region: "South Bay" | "Peninsula" | "East Bay" | "North Bay" | "Outer Bay";
  latitude: number;
  longitude: number;
  category: "free-first-wash" | "free-membership-trial";
  summary: string;
  offerHint: string;
  signupRequired: boolean;
  verified: boolean;
  source: OfferSource;
  tags: string[];
  expirationDate?: string;
  daysUntilExpiration?: number;
  isExpired?: boolean;
  verificationScore: number;
  distance?: number;
  lastVerifiedAt: string;
  accessibilityFeatures: string[];
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
};

export type LocationFilters = {
  lat: number;
  lng: number;
  radius?: number;
  offer_type?: 'wash' | 'trial' | 'promo' | 'all';
  limit?: number;
};
