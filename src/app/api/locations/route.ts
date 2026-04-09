import { bayAreaStaticOffers } from '@/lib/bay-area-offers';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { captureEvent } from "@/lib/analytics";

const schema = z.object({
  lat: z.number().min(-90).max(90),
  lng: z.number().min(-180).max(180),
  radius: z.number().min(1).max(100).default(10),
  offer_type: z.enum(['wash', 'trial', 'promo', 'all']).optional().default('all'),
  limit: z.number().min(1).max(100).optional().default(20),
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

    // Filter offers based on location and radius
    const filteredOffers = bayAreaStaticOffers
      .filter(offer => {
        if (!offer.latitude || !offer.longitude) return false;
        
        // Calculate distance in meters using Haversine formula
        const R = 6371e3; // Earth's radius in meters
        const φ1 = input.lat * Math.PI/180;
        const φ2 = offer.latitude * Math.PI/180;
        const Δφ = (offer.latitude-input.lat) * Math.PI/180;
        const Δλ = (offer.longitude-input.lng) * Math.PI/180;

        const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
                  Math.cos(φ1) * Math.cos(φ2) *
                  Math.sin(Δλ/2) * Math.sin(Δλ/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        const distance = R * c;
        
        return distance <= input.radius * 1000;
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

    captureEvent("locations_fetched", {
      lat: input.lat,
      lng: input.lng,
      radius: input.radius,
      count: filteredOffers.length
    });

    return NextResponse.json({
      locations: filteredOffers,
      verification_summary: {
        total_verified: bayAreaStaticOffers.filter(o => o.verified).length,
        last_checked: new Date(Math.max(...bayAreaStaticOffers.map(o => new Date(o.source.checkedAt).getTime()))).toISOString()
      }
    });
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
