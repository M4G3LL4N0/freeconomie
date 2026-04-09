import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server'; 
import { captureEvent } from "@/lib/analytics";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_KEY!
);

export async function POST(request: Request) {
  try {
    const { locationId } = await request.json();
    
    if (!locationId) {
      throw new Error('Missing location ID');
    }

    const { error } = await supabase
      .from('favorites')
      .upsert({
        location_id: locationId,
        created_at: new Date().toISOString()
      });

    if (error) throw error;

    captureEvent('favorite_added', { locationId });
    return NextResponse.json({ success: true });
  } catch (error) {
    captureEvent('favorite_error', { 
      error: (error as Error).message 
    });
    return NextResponse.json(
      { error: "Failed to save favorite" },
      { status: 400 }
    );
  }
}
