import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { captureEvent } from "@/lib/analytics";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_KEY!
);

const schema = z.object({
  lat: z.number().min(-90).max(90),
  lng: z.number().min(-180).max(180),
  radius: z.number().min(1).max(100).default(10),
  offer_type: z.enum(['wash', 'trial', 'promo', 'all']).optional().default('all'),
  limit: z.number().min(1).max(100).optional().default(20),
  min_verification_score: z.number().min(0).max(100).optional().default(80),
  accessibility_features: z.array(z.string()).optional(),
  exclude_expired: z.boolean().optional().default(true),
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

    // Convert static offers to API response format
    const data = bayAreaStaticOffers.map(offer => ({
      id: offer.id,
      name: offer.businessName,
      address: offer.address,
      lat: offer.latitude,
      lng: offer.longitude,
      offer_type: offer.category === 'free-first-wash' ? 'wash' : 'trial',
      details: offer.summary,
      expires_at: offer.expirationDate,
      created_at: new Date().toISOString(),
      distance_in_km: 0 // Will be calculated
    }));

    captureEvent("locations_fetched", {
      lat: input.lat,
      lng: input.lng,
      radius: input.radius,
      count: data.length
    });
    
    return NextResponse.json(data);
  } catch (error) {
    captureEvent("locations_error", { 
      error: error instanceof Error ? error.message : 'Unknown error'
    });
    return NextResponse.json(
      { error: "Failed to fetch locations" },
      { status: 400 }
    );
  }
}
