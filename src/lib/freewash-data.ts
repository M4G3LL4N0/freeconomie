import { StaticOffer } from "../types/freewash";

export const bayAreaStaticOffers: StaticOffer[] = [
  {
    id: "autopride-palo-alto",
    businessName: "Auto Pride Car Wash",
    offerTitle: "Free Car Wash",
    city: "Palo Alto",
    state: "CA",
    address: "841 El Camino Real, Palo Alto, CA 94301",
    region: "Peninsula",
    category: "free-first-wash",
    summary: "Official site advertises a free car wash and lists this Palo Alto location.",
    offerHint: "Likely requires form/signup on official free wash page.",
    signupRequired: true,
    verified: true,
    source: {
      name: "Auto Pride Car Wash",
      url: "https://www.autopridecarwash.com/",
      checkedAt: "2026-04-08",
    },
    tags: ["verified", "official-site", "peninsula", "el-camino"],
  },
  // ... rest of the offers array
];

export const bayAreaCities = [
  "San Francisco",
  "Oakland",
  "San Jose",
  // ... rest of cities array
];
