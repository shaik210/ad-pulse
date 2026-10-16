import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { getLead, updateLead } from "@/lib/db/store";
import type { LeadStage, LeadTimelineEvent } from "@/lib/db/types";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await getSession();
    const lead = await getLead(id, session.workspace.id);

    if (!lead) {
      return NextResponse.json(
        { success: false, error: "Lead not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, lead });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to retrieve lead",
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

    const existing = await getLead(id, session.workspace.id);
    if (!existing) {
      return NextResponse.json(
        { success: false, error: "Lead not found or unauthorized" },
        { status: 404 }
      );
    }

    const patch: Record<string, any> = {};
    const updatedTimeline: LeadTimelineEvent[] = [...existing.timeline];

    if (body.stage && ["New", "Contacted", "Qualified", "Converted", "Lost", "Invalid"].includes(body.stage)) {
      if (body.stage !== existing.stage) {
        patch.stage = body.stage as LeadStage;
        updatedTimeline.push({
          id: `t_${Date.now()}`,
          time: "Just now",
          action: `Stage transitioned from ${existing.stage} to ${body.stage}`,
        });
      }
    }

    if (typeof body.notes === "string") {
      patch.notes = body.notes.trim();
      if (body.addTimelineNote) {
        updatedTimeline.push({
          id: `t_${Date.now()}`,
          time: "Just now",
          action: `Note added: "${body.notes.slice(0, 60)}${body.notes.length > 60 ? "..." : ""}"`,
        });
      }
    }

    if (typeof body.followUpDate === "string") {
      patch.followUpDate = body.followUpDate.trim();
      updatedTimeline.push({
        id: `t_${Date.now()}`,
        time: "Just now",
        action: `Follow-up scheduled for ${body.followUpDate}`,
      });
    }

    patch.timeline = updatedTimeline;

    const updated = await updateLead(
      id,
      session.workspace.id,
      session.user.userId,
      patch
    );

    return NextResponse.json({
      success: true,
      lead: updated,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to update lead",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 400 }
    );
  }
}
