import { bayAreaStaticOffers } from '@/lib/bay-area-offers';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { captureEvent } from "@/lib/analytics";
import type { FreeconomyCategory } from "@/types/freewash";

const schema = z.object({
  // Core geo parameters
  lat: z.number().min(-90).max(90),
  lng: z.number().min(-180).max(180),
  radius: z.number().min(1).max(100).default(10),
  limit: z.number().min(1).max(100).optional().default(20),

  // Offer type filters
  offer_type: z.enum(['wash', 'trial', 'promo', 'all']).optional().default('all'),
  category: z.enum([
    'free-first-wash',
    'free-membership-trial',
    'free-sample', 
    'community-share',
    'grand-opening'
  ]).optional(),
  
  // Offer value filters  
  min_value: z.number().min(0).optional(),
  max_value: z.number().min(0).optional(),

  // Verification filtering
  verified_only: z.boolean().optional().default(false),
  min_confidence: z.number().min(0).max(100).optional(),
});

export const revalidate = 3600; // Cache for 1 hour

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const input = schema.parse({
      lat: Number(searchParams.get('lat')),
      lng: Number(searchParams.get('lng')),
      radius: Number(searchParams.get('radius')) || 10,
      offer_type: searchParams.get('type'),
      limit: Number(searchParams.get('limit')) || 20,
    });

    const MIN_PREMIUM_VALUE = 15; // $15 minimum
    const MIN_CONFIDENCE = 70;    // Bronze verification

    // Enhanced filtering logic
    const filteredOffers = bayAreaStaticOffers.filter(offer => {
      // Premium value and verification filters
      if ((offer.valueEstimate?.amount || 0) < MIN_PREMIUM_VALUE) return false;
      if ((offer.verification?.confidenceScore || 0) < MIN_CONFIDENCE) return false;
      // Location filtering
      if (!offer.latitude || !offer.longitude) return false;
      
      const R = 6371e3; // Earth's radius in meters
      const φ1 = input.lat * Math.PI/180;
      const φ2 = offer.latitude * Math.PI/180;
      const Δφ = (offer.latitude - input.lat) * Math.PI/180;
      const Δλ = (offer.longitude - input.lng) * Math.PI/180;
      const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
                Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ/2) * Math.sin(Δλ/2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      const distance = R * c;
      
      // Early exit if geo filter fails
      if (distance > input.radius * 1000) return false;

      // Category filtering with backwards compatibility
      const effectiveCategory = offer.economyType || 
        (offer.category === 'free-car-wash' ? 'free-car-wash' : undefined);
      
      if (input.category && effectiveCategory !== input.category) {
        return false;
      }

      // Value filtering (if offer has valueEstimate)
      if (input.min_value && (offer.valueEstimate || 0) < input.min_value) return false;
      if (input.max_value && (offer.valueEstimate || 0) > input.max_value) return false;

      // Verification filtering
      if (input.verified_only && !offer.verification?.verifiedAt) return false;
      if (input.min_confidence && (offer.verification?.confidenceScore || 0) < input.min_confidence) return false;

      return true;
    })
      .map(offer => ({
        id: offer.id,
        name: offer.businessName,
        address: offer.address,
        lat: offer.latitude,
        lng: offer.longitude,
        offer_type: offer.category === 'free-first-wash' ? 'wash' : 'trial',
        details: offer.summary,
        expires_at: offer.expirationDate || '',
        created_at: new Date().toISOString(),
        distance_in_km: 0 // Will be calculated client-side
      }))
      .slice(0, input.limit);

    // Enhanced response metadata
    const responseData = {
      locations: filteredOffers,
      meta: {
        total_returned: filteredOffers.length,
        applied_filters: {
          radius_km: input.radius,
          category: input.category,
          min_value: input.min_value,
          max_value: input.max_value,
          min_confidence: input.min_confidence
        },
        verification_summary: {
          total_verified: bayAreaStaticOffers.filter(o => o.verification?.verifiedAt).length,
          avg_confidence: bayAreaStaticOffers.reduce(
            (sum, o) => sum + (o.verification?.confidenceScore || 0), 0
          ) / bayAreaStaticOffers.length,
          last_checked: new Date(Math.max(
            ...bayAreaStaticOffers.map(o => new Date(
              o.source.checkedAt ||
              o.verification?.verifiedAt ||
              new Date(0)
            ).getTime())
          )).toISOString()
        }
      }
    };

    captureEvent("locations_fetched", {
      lat: input.lat,
      lng: input.lng,
      radius: input.radius,
      filters_applied: Object.keys(input).filter(k => k !== 'lat' && k !== 'lng'),
      count: filteredOffers.length
    });

    return NextResponse.json(responseData);
  } catch (error) {
    // Maintain existing error handling
    captureEvent("locations_error", { 
      error: error instanceof Error ? error.message : 'Unknown error'
    });
    return NextResponse.json(
      { error: "Failed to fetch locations" },
      { status: 400 }
    );
  }
}
