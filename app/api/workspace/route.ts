import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { updateWorkspace } from "@/lib/db/store";
import type { WorkspaceMode } from "@/lib/db/types";

export async function GET() {
  try {
    const session = await getSession();
    return NextResponse.json({
      success: true,
      workspace: session.workspace,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to load workspace",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const session = await getSession();
    const body = await request.json();

    const allowedUpdates: Record<string, any> = {};

    if (typeof body.businessName === "string" && body.businessName.trim()) {
      allowedUpdates.businessName = body.businessName.trim().slice(0, 100);
      allowedUpdates.name = allowedUpdates.businessName;
    }

    if (body.mode === "growth" || body.mode === "quickblast") {
      allowedUpdates.mode = body.mode as WorkspaceMode;
    }

    if (typeof body.geoCenter === "string" && body.geoCenter.trim()) {
      allowedUpdates.geoCenter = body.geoCenter.trim().slice(0, 150);
    }

    if (typeof body.geoRadiusKm === "number" && body.geoRadiusKm > 0 && body.geoRadiusKm <= 50) {
      allowedUpdates.geoRadiusKm = Math.round(body.geoRadiusKm);
    }

    if (typeof body.contactPhone === "string" && body.contactPhone.trim()) {
      allowedUpdates.contactPhone = body.contactPhone.trim().slice(0, 30);
    }

    if (typeof body.planId === "string") {
      allowedUpdates.planId = body.planId;
    }

    if (typeof body.packageId === "string") {
      allowedUpdates.packageId = body.packageId;
    }

    const updated = await updateWorkspace(
      session.workspace.id,
      session.user.userId,
      allowedUpdates
    );

    if (!updated) {
      return NextResponse.json(
        { success: false, error: "Workspace not found or unauthorized" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      workspace: updated,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to update workspace",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 400 }
    );
  }
}
