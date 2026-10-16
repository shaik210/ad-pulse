import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { getCampaign, updateCampaign, deleteCampaign } from "@/lib/db/store";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await getSession();
    const campaign = await getCampaign(id, session.workspace.id);

    if (!campaign) {
      return NextResponse.json(
        { success: false, error: "Campaign not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, campaign });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to retrieve campaign",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await getSession();
    const body = await request.json();

    const allowedUpdates: Record<string, any> = {};

    if (typeof body.name === "string" && body.name.trim()) {
      allowedUpdates.name = body.name.trim();
    }
    if (typeof body.headline === "string" && body.headline.trim()) {
      allowedUpdates.headline = body.headline.trim();
    }
    if (typeof body.body === "string" && body.body.trim()) {
      allowedUpdates.body = body.body.trim();
    }
    if (typeof body.location === "string" && body.location.trim()) {
      allowedUpdates.location = body.location.trim();
    }
    if (typeof body.radiusKm === "number" && body.radiusKm > 0) {
      allowedUpdates.radiusKm = body.radiusKm;
    }
    if (typeof body.contactPhone === "string" && body.contactPhone.trim()) {
      allowedUpdates.contactPhone = body.contactPhone.trim();
    }
    if (typeof body.budgetAmount === "number" && body.budgetAmount > 0) {
      allowedUpdates.budgetAmount = body.budgetAmount;
    }
    if (body.status === "Active" || body.status === "Paused" || body.status === "Draft") {
      allowedUpdates.status = body.status;
    }

    const updated = await updateCampaign(
      id,
      session.workspace.id,
      session.user.userId,
      allowedUpdates
    );

    if (!updated) {
      return NextResponse.json(
        { success: false, error: "Campaign not found or unauthorized" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, campaign: updated });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to update campaign",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 400 }
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await getSession();
    const deleted = await deleteCampaign(id, session.workspace.id, session.user.userId);

    if (!deleted) {
      return NextResponse.json(
        { success: false, error: "Campaign not found or unauthorized" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: "Campaign draft deleted" });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to delete campaign",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
