import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import { submitOfferSchema } from '@/lib/validation';
import { captureEvent } from '@/lib/analytics';
import { cookies } from 'next/headers';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_KEY!  
);

export async function POST(request: Request) {
  const sessionCookie = cookies().get('session')?.value;
  
  try {
    const body = await request.json();
    const data = submitOfferSchema.parse(body);

    // Verify user session
    const { data: { user }, error: authError } = await supabase.auth.getUser(sessionCookie);
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { error } = await supabase
      .from('submissions')
      .insert({
        ...data,
        user_id: user.id,
        status: 'pending_review'
      });

    if (error) throw error;

    captureEvent('submission_created', {
      route: '/api/submit',
      session_id: sessionCookie,
      timestamp: new Date().toISOString(),
      offer_type: data.offer_type
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    captureEvent('submission_error', {
      route: '/api/submit',
      session_id: sessionCookie,
      timestamp: new Date().toISOString(),
      error: error instanceof Error ? error.message : 'Unknown error'
    });

    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Validation failed' },
      { status: 400 }
    );
  }
}
