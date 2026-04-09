import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { captureEvent } from "@/lib/analytics";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_KEY!
);

const schema = z.object({
  email: z.string().email(),
  referral_code: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, referral_code } = schema.parse(body);

    const { error } = await supabase
      .from('waitlist')
      .insert({ 
        email, 
        joined_at: new Date().toISOString(),
        referred_by: referral_code 
      });

    if (error) throw error;
    
    captureEvent("waitlist_signup", { email });
    return NextResponse.json({ success: true });
  } catch (error) {
    captureEvent("waitlist_error", { error: error.message });
    return NextResponse.json(
      { error: error.message },
      { status: 400 }
    );
  }
}
