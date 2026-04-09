import { StaticOffer } from "../types/freewash";

export const verifyOffer = (offer: StaticOffer): StaticOffer => {
  // Calculate verification score (0-100)
  let score = 0;
  
  // Official sources score higher
  if (offer.verificationDetails.sourceType === 'official') score += 40;
  if (offer.verificationDetails.verificationMethod === 'partner-api') score += 30;
  
  // Recent verification boosts score
  const daysSinceVerification = Math.floor(
    (new Date().getTime() - new Date(offer.verificationDetails.lastVerifiedAt).getTime()) / 
    (1000 * 60 * 60 * 24)
  );
  if (daysSinceVerification < 7) score += 20;
  if (daysSinceVerification < 30) score += 10;

  // Expired offers get score penalty
  if (offer.isExpired) score = Math.max(0, score - 50);

  return {
    ...offer,
    verificationScore: Math.min(100, score),
    verified: score >= 70
  };
};

export const filterAndSortOffers = (
  offers: StaticOffer[], 
  route?: { origin: [number, number], destination: [number, number] }
): StaticOffer[] => {
  // Basic filtering
  let filtered = offers
    .filter(offer => !offer.isExpired)
    .filter(offer => offer.verificationScore >= 50);

  // If route provided, prioritize offers along the route
  if (route) {
    filtered = filtered.map(offer => ({
      ...offer,
      routeScore: calculateRouteScore(offer, route)
    })).sort((a, b) => (b.routeScore || 0) - (a.routeScore || 0));
  }

  return filtered;
};

const calculateRouteScore = (
  offer: StaticOffer,
  route: { origin: [number, number], destination: [number, number] }
): number => {
  // Simplified route scoring - would integrate with Mapbox/Directions API in prod
  const offerPoint = [offer.latitude, offer.longitude];
  const originToOffer = haversine(route.origin, offerPoint);
  const offerToDest = haversine(offerPoint, route.destination);
  const totalRoute = haversine(route.origin, route.destination);
  
  // Lower score is better (less detour)
  return (originToOffer + offerToDest) - totalRoute;
};

// Haversine distance implementation would go here
