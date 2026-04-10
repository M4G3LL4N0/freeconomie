import { NextRequest, NextResponse } from "next/server";

type SubmitOfferPayload = {
  businessName?: string;
  offerTitle?: string;
  city?: string;
  state?: string;
  address?: string;
  offerDescription?: string;
  signupRequired?: boolean;
  offerUrl?: string;
  notes?: string;
  email?: string;
};

function isValidUrl(value: string) {
  if (!value.trim()) return true;
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
}

function isValidEmail(value: string) {
  if (!value.trim()) return true;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as SubmitOfferPayload;

    const businessName = body.businessName?.trim() || "";
    const offerTitle = body.offerTitle?.trim() || "";
    const city = body.city?.trim() || "";
    const state = body.state?.trim() || "";
    const address = body.address?.trim() || "";
    const offerDescription = body.offerDescription?.trim() || "";
    const signupRequired = Boolean(body.signupRequired);
    const offerUrl = body.offerUrl?.trim() || "";
    const notes = body.notes?.trim() || "";
    const email = body.email?.trim() || "";

    if (!businessName || !offerTitle || !city || !state || !offerDescription) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }

    if (!isValidUrl(offerUrl)) {
      return NextResponse.json(
        { error: "Invalid offer URL." },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Invalid email address." },
        { status: 400 }
      );
    }

    const submission = {
      id: crypto.randomUUID(),
      businessName,
      offerTitle,
      city,
      state,
      address,
      offerDescription,
      signupRequired,
      offerUrl,
      notes,
      email,
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json(
      {
        success: true,
        message: "Offer submitted successfully.",
        submission,
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 }
    );
  }
}
