import { NextResponse } from 'next/server';
import { bayAreaStaticOffers } from '@/lib/bay-area-offers';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q')?.toLowerCase() || '';
  
  if (!query) {
    return NextResponse.json([], { status: 200 });
  }

  const results = bayAreaStaticOffers.filter(offer =>
    offer.businessName.toLowerCase().includes(query.toLowerCase()) ||
    offer.city.toLowerCase().includes(query.toLowerCase())
  );

  return NextResponse.json(results);
}
