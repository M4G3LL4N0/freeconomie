import { NextResponse } from "next/server";
import { captureEvent } from "@/lib/analytics";

export async function GET() {
  try {
    // TODO: Replace with Supabase query
    const locations = [
      {
        id: "1",
        name: "Sparkle Car Wash",
        address: "123 Main St, San Francisco",
        lat: 37.7749,
        lng: -122.4194,
        freeUntil: "5:00 PM"
      },
      {
        id: "2",
        name: "Clean Wheels",
        address: "456 Market St, San Francisco",
        lat: 37.7849,
        lng: -122.4094,
        freeUntil: "6:00 PM"
      }
    ];

    captureEvent("locations_fetched");
    return NextResponse.json(locations);
  } catch (error) {
    captureEvent("locations_error", { error: error.message });
    return NextResponse.json(
      { error: "Failed to fetch locations" },
      { status: 500 }
    );
  }
}
