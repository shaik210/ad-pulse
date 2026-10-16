import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { getCampaigns, createCampaign } from "@/lib/db/store";
import type { WorkspaceMode } from "@/lib/db/types";

export async function GET() {
  try {
    const session = await getSession();
    const campaigns = await getCampaigns(session.workspace.id);

    return NextResponse.json({
      success: true,
      campaigns,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to load campaigns",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getSession();
    const body = await request.json();

    // Validation
    const name = String(body.name || "").trim();
    if (!name || name.length < 3) {
      return NextResponse.json(
        { success: false, error: "Campaign name must be at least 3 characters." },
        { status: 400 }
      );
    }

    const type: WorkspaceMode = body.type === "quickblast" ? "quickblast" : "growth";
    const category = String(body.category || "General Local Promotion").trim();
    const channel = String(body.channel || "Instagram Reels & Feed").trim();

    const headline = String(body.headline || "").trim();
    if (!headline || headline.length < 5) {
      return NextResponse.json(
        { success: false, error: "Headline must be at least 5 characters." },
        { status: 400 }
      );
    }

    const bodyText = String(body.body || "").trim();
    if (!bodyText || bodyText.length < 10) {
      return NextResponse.json(
        { success: false, error: "Ad description must be at least 10 characters." },
        { status: 400 }
      );
    }

    const location = String(body.location || session.workspace.geoCenter).trim();
    const radiusKm = Math.min(50, Math.max(1, Number(body.radiusKm) || 5));
    const contactPhone = String(body.contactPhone || session.workspace.contactPhone).trim();

    const budgetAmount = Math.max(100, Number(body.budgetAmount) || (type === "quickblast" ? 1999 : 500));
    const budgetPeriod = body.budgetPeriod === "flat_one_time" || type === "quickblast" ? "flat_one_time" : "daily";
    const durationDays = Math.max(1, Number(body.durationDays) || (type === "quickblast" ? 7 : 30));

    const platformFee = Number(body.platformFee) || (type === "quickblast" ? 799 : 2499);
    const adSpendAllowance = Number(body.adSpendAllowance) || (type === "quickblast" ? 1200 : 0);

    const campaign = await createCampaign(session.workspace.id, session.user.userId, {
      name,
      type,
      category,
      channel,
      headline,
      body: bodyText,
      location,
      radiusKm,
      contactPhone,
      budgetAmount,
      budgetPeriod,
      durationDays,
      platformFee,
      adSpendAllowance,
      status: "Draft",
      statusMessage: "Draft saved on server — platform publishing pending ad network credentials.",
      packageId: body.packageId,
      planId: body.planId,
    });

    return NextResponse.json(
      {
        success: true,
        campaign,
        message: "Campaign draft saved successfully.",
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to save campaign draft",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 400 }
    );
  }
}
