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
  radius: z.number().min(1).max(100).default(10), // in km
  offer_type: z.enum(['wash', 'trial', 'promo', 'all']).optional().default('all'),
  limit: z.number().min(1).max(100).optional().default(20),
});

const nearbyLocationsQuery = (lat: number, lng: number, radius: number) => {
  return supabase.rpc('nearby_locations', {
    lat,
    lng,
    radius
  });
};

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

    let query = nearbyLocationsQuery(input.lat, input.lng, input.radius)
      .select('*')
      .order('distance_in_km', { ascending: true })
      .limit(input.limit);

    if (input.offer_type !== 'all') {
      query = query.eq('offer_type', input.offer_type);
    }

    const { data, error } = await query;

    if (error) throw error;

    captureEvent("locations_fetched", {
      lat: input.lat,
      lng: input.lng,
      radius: input.radius,
      count: data.length
    });
    
    return NextResponse.json(data);
  } catch (error) {
    captureEvent("locations_error", { error: error.message });
    return NextResponse.json(
      { error: error.message },
      { status: 400 }
    );
  }
}
