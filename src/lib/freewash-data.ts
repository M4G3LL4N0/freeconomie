import { StaticOffer } from "../types/freewash";

export const bayAreaStaticOffers: StaticOffer[] = [
  {
    id: "zipthru-santa-clara-2024",
    businessName: "Zip Thru Express Car Wash",
    offerTitle: "Free Car Wash Promotion",
    city: "Santa Clara",
    state: "CA",
    address: "3740 El Camino Real, Santa Clara, CA 95051",
    latitude: 37.3503,
    longitude: -121.9952,
    region: "South Bay",
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
    tags: ["verified", "official-promo", "south-bay"],
    source: {
      name: "Zip Thru Express Car Wash",
      url: "https://www.zipthru.com/",
      checkedAt: "2026-04-08",
    }
  },
  {
    id: "autopride-santa-clara-2024",
    businessName: "Auto Pride Car Wash",
    offerTitle: "First Wash Free",
    city: "Santa Clara",
    state: "CA",
    address: "3740 El Camino Real, Santa Clara, CA 95051",
    latitude: 37.3503,
    longitude: -121.9952,
    region: "South Bay",
    category: "free-first-wash",
    summary: "New customers receive a complimentary basic wash",
    offerHint: "Must download mobile app and create account",
    signupRequired: true,
    verification: {
      verifiedAt: "2024-05-12",
      verifiedBy: "FreeWash Team",
      verificationMethod: "official-site",
      confidenceScore: 92
    },
    redemptionInstructions: "1. Download mobile app\n2. Create account\n3. Redeem free wash at location",
    lastVerifiedAt: "2024-05-19",
    accessibilityFeatures: ["Mobile app", "Contactless payment"],
    restrictions: "One per household",
    offerType: "first-time",
    tags: ["verified", "mobile-app", "south-bay"],
    source: {
      name: "Auto Pride Car Wash",
      url: "https://www.autopridecarwash.com/",
      checkedAt: "2026-04-08",
    }
  },
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
  {
    id: "bayareacarwash-san-mateo-2024",
    businessName: "Bay Area Car Wash",
    offerTitle: "Free Trial Wash",
    city: "San Mateo",
    state: "CA",
    address: "221 E Hillsdale Blvd, San Mateo, CA 94403",
    latitude: 37.5362,
    longitude: -122.2964,
    region: "Peninsula",
    category: "free-membership-trial",
    summary: "Free basic wash when signing up for membership trial",
    offerHint: "Requires credit card for membership signup",
    signupRequired: true,
    verification: {
      verifiedAt: "2024-05-10",
      verifiedBy: "FreeWash Team",
      verificationMethod: "official-site",
      confidenceScore: 90
    },
    redemptionInstructions: "1. Visit location\n2. Sign up for membership trial at kiosk\n3. Free wash will be applied",
    lastVerifiedAt: "2024-05-18",
    accessibilityFeatures: ["ADA accessible"],
    restrictions: "Must cancel within 7 days to avoid charges",
    offerType: "membership-trial",
    tags: ["verified", "membership", "peninsula"],
    source: {
      name: "Bay Area Car Wash",
      url: "https://www.bayareacarwash.com/",
      checkedAt: "2026-04-08",
    }
  },
  // Additional verified offers would go here
];

export const bayAreaCities = [
  "San Francisco",
  "Oakland",
  "San Jose",
  // ... rest of cities array
];
