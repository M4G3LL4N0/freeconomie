import { bayAreaStaticOffers } from '@/lib/freewash-data';
import { NextResponse } from 'next/server';
import { captureEvent } from "@/lib/analytics";

export const revalidate = 3600; // Keep existing cache

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    // Maintain existing input validation
    const lat = Number(searchParams.get('lat'));
    const lng = Number(searchParams.get('lng'));

    // Map static offers to expected response format
    const data = bayAreaStaticOffers.map(offer => ({
      id: offer.id,
      name: offer.businessName,
      address: offer.address,
      lat: offer.latitude || 37.7749, // Fallback to SF coordinates
      lng: offer.longitude || -122.4194,
      offer_type: offer.category === 'free-first-wash' ? 'wash' : 'trial',
      details: offer.summary,
      expires_at: offer.expirationDate,
      created_at: new Date().toISOString(),
      distance_in_km: 0 // Will be calculated client-side
    }));

    // Preserve analytics event
    captureEvent("locations_fetched", {
      lat,
      lng,
      count: data.length
    });
    
    return NextResponse.json(data);
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
