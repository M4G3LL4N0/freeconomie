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
        const R = 6371; // Earth's radius in km
        const dLat = (offer.latitude - input.lat) * (Math.PI / 180);
        const dLon = (offer.longitude - input.lng) * (Math.PI / 180);
        const a = 
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(input.lat * (Math.PI / 180)) * 
          Math.cos(offer.latitude * (Math.PI / 180)) *
          Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c;
        return distance <= input.radius * 1000; // Convert km to meters
      })
      .slice(0, input.limit);

    captureEvent("locations_fetched", {
      lat: input.lat,
      lng: input.lng,
      radius: input.radius,
      count: filteredOffers.length
    });
    
    return NextResponse.json(filteredOffers);
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
