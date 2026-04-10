import { NextRequest, NextResponse } from "next/server";
import { captureEvent } from "@/lib/analytics";
import { isPremiumOffer } from "@/lib/verification";

type SubmitOfferPayload = {
  businessName: string;
  offerTitle: string;
  city: string;
  state: string;
  address: string;
  offerDescription: string;
  signupRequired: boolean;
  offerUrl?: string;
  notes?: string;
  email: string;
  valueEstimate?: number;
  verification?: {
    confidenceScore: number;
  };
  tags?: string[];
  category?: string;
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

    // Required field validation
    const requiredFields = ['businessName', 'offerTitle', 'city', 'state', 'offerDescription', 'email'];
    for (const field of requiredFields) {
      if (!body[field as keyof SubmitOfferPayload]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Premium content guardrails
    if ((body.valueEstimate || 0) < 15) {
      return NextResponse.json(
        { error: "Minimum value requirement: $15" },
        { status: 403 }
      );
    }

    if (body.tags?.includes('coupon') || body.tags?.includes('limited-time')) {
      return NextResponse.json(
        { error: "Coupon-style and limited-time offers are not accepted" },
        { status: 403 }
      );
    }

    if (!body.verification?.confidenceScore || body.verification.confidenceScore < 80) {
      return NextResponse.json(
        { error: "Minimum verification confidence score: 80%" },
        { status: 403 }
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

    const premiumStatus = isPremiumOffer({
      ...submission,
      verification: {
        confidenceScore: body.verification?.confidenceScore || 0,
        verifiedAt: new Date().toISOString(),
        verificationMethod: 'user-submitted'
      },
      valueEstimate: {
        amount: body.valueEstimate || 0,
        currency: 'USD'
      },
      category: body.category as any
    });

    captureEvent('offer_submitted', {
      businessName: submission.businessName,
      valueEstimate: submission.valueEstimate,
      isPremium: premiumStatus,
      category: body.category
    });

    return NextResponse.json(
      {
        success: true,
        message: premiumStatus 
          ? "Premium offer submitted successfully" 
          : "Offer submitted for review",
        submission,
        isPremium: premiumStatus
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
