import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { captureEvent } from "@/lib/analytics";

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
    const body = await request.json();
    const data = schema.parse(body);

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
    
    captureEvent("offer_submitted", { type: data.offer_type });
    return NextResponse.json({ success: true });
  } catch (error) {
    captureEvent("offer_error", { 
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });
    return NextResponse.json(
      { error: "Submission failed. Please try again later." },
      { status: 400 }
    );
  }
}
