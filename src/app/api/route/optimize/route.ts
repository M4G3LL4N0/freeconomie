import { NextResponse } from 'next/server';
import { calculateOptimizedRoute } from '@/lib/routing';

export async function POST(req: Request) {
  const { origin, destination, currentRoute } = await req.json();

  // Calculate optimized route with value stops
  const optimized = await calculateOptimizedRoute({
    origin,
    destination,
    currentRoute,
    minValue: 15, // $15 minimum value threshold
    maxDetourMinutes: 10
  });

  return NextResponse.json({
    optimizedRoute: optimized.path,
    valuePerMile: optimized.valuePerMile,
    timeSavings: optimized.timeSavings,
    premiumOffers: optimized.offers,
    routeEfficiencyScore: optimized.efficiencyScore
  });
}
