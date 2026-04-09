export type OfferSource = {
  name: string;
  url: string;
  checkedAt: string;
};

export type VerificationStatus = {
  verifiedAt: string;
  verifiedBy: string;
  verificationMethod: 'official-site' | 'phone-confirmation' | 'in-person';
  confidenceScore: number;
};

export type VerificationStatus = {
  verifiedAt: string;
  verifiedBy: string;
  verificationMethod: 'official-site' | 'phone-confirmation' | 'in-person';
  confidenceScore: number;
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
  source: {
    name: string;
    url: string;
    checkedAt: string;
  };
  tags: string[];
  expirationDate?: string;
  rating?: number;
  distance?: number;
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
