import { StaticOffer } from "../types/freewash";

export const bayAreaStaticOffers: StaticOffer[] = [
  {
    id: "autopride-palo-alto-2024",
    businessName: "Auto Pride Car Wash",
    offerTitle: "First-Time Customer Free Wash",
    city: "Palo Alto",
    state: "CA",
    address: "841 El Camino Real, Palo Alto, CA 94301",
    latitude: 37.4421,
    longitude: -122.1634,
    region: "Peninsula",
    category: "free-first-wash",
    summary: "New customers receive a complimentary basic wash when signing up for email notifications",
    offerHint: "Must provide email and phone number at kiosk",
    signupRequired: true,
    verification: {
      verifiedAt: "2024-05-15",
      verifiedBy: "FreeWash Team",
      verificationMethod: "official-site",
      confidenceScore: 95
    },
    redemptionInstructions: "1. Visit location\n2. Use promo code 'FREEWASH2024' at kiosk\n3. Provide email address",
    lastVerifiedAt: "2024-05-20",
    accessibilityFeatures: ["ADA accessible", "Touchless payment"],
    restrictions: "One per household, valid ID required",
    offerType: "first-time",
    tags: ["verified", "official-promo", "peninsula"],
    source: {
      name: "Auto Pride Car Wash",
      url: "https://www.autopridecarwash.com/",
      checkedAt: "2026-04-08",
    }
  },
  // ... rest of the offers array
];

export const bayAreaCities = [
  "San Francisco",
  "Oakland",
  "San Jose",
  // ... rest of cities array
];
