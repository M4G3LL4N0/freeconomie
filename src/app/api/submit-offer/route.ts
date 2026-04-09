import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { captureEvent } from "@/lib/analytics";
import { showSuccess, showError, showLoading } from "@/lib/notifications";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_KEY!
);

const schema = z.object({
  name: z.string().min(2),
  address: z.string().min(5),
  lat: z.number().min(-90).max(90),
  lng: z.number().min(-180).max(180),
  offer_type: z.enum(['wash', 'trial', 'promo']),
  details: z.string().min(10),
  expires_at: z.string().optional(),
  user_id: z.string().uuid().optional(),
});

export async function POST(request: Request) {
  try {
    // Show loading state immediately
    if (typeof window !== 'undefined') {
      showLoading("Verifying your submission...");
    }
    const body = await request.json();
    const data = schema.parse({
      ...body,
      lat: parseFloat(body.lat),
      lng: parseFloat(body.lng)
    });

    // Verify coordinates are valid numbers
    if (isNaN(data.lat) || isNaN(data.lng)) {
      throw new Error('Invalid coordinates');
    }

    // Optional: Verify address with Google Maps API if key is configured
    if (process.env.GOOGLE_MAPS_API_KEY) {
      const geocodeResponse = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${data.lat},${data.lng}&key=${process.env.GOOGLE_MAPS_API_KEY}`
      );
      const geocodeData = await geocodeResponse.json();
      
      if (!geocodeData.results?.length) {
        captureEvent('offer_submission_address_unverified', {
          address: data.address,
          coordinates: `${data.lat},${data.lng}`
        });
      }
    }

    const { error } = await supabase
      .from('submissions')
      .insert({
        ...data,
        status: 'pending_review',
        submitted_at: new Date().toISOString(),
        verification_metadata: {
          verified_by: null,
          reasons: []
        }
      });

    if (error) {
      captureEvent("offer_error", { 
        error: error.message,
        code: error.code 
      });
      throw error;
    }
    
    showSuccess("Offer submitted for review!");
    captureEvent("offer_submitted", { type: data.offer_type });
    return NextResponse.json({ success: true });
  } catch (error) {
    showError("Submission failed. Please check your details.");
    captureEvent("offer_error", { 
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });
    return NextResponse.json(
      { error: "Submission failed. Please try again later." },
      { status: 400 }
    );
  } finally {
    if (typeof window !== 'undefined') {
      toast.dismiss(); // Clear any loading toasts
    }
  }
}
