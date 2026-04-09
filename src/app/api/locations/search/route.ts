import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import { captureEvent } from "@/lib/analytics";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_KEY!
);

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    
    if (!query) {
      return NextResponse.json([], { status: 200 });
    }

    const { data, error } = await supabase
      .from('locations')
      .select('*')
      .textSearch('name', query, {
        type: 'plain',
        config: 'english'
      })
      .limit(20);

    if (error) throw error;

    captureEvent('locations_search', {
      query,
      count: data.length
    });
    
    return NextResponse.json(data);
  } catch (error) {
    captureEvent('locations_search_error', {
      error: (error as Error).message
    });
    return NextResponse.json(
      { error: "Search failed" },
      { status: 400 }
    );
  }
}
