import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { getLeads, createLead } from "@/lib/db/store";
import type { LeadStage } from "@/lib/db/types";

export async function GET() {
  try {
    const session = await getSession();
    const leads = await getLeads(session.workspace.id);

    return NextResponse.json({
      success: true,
      leads,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to load leads",
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

    const name = String(body.name || "").trim();
    if (!name) {
      return NextResponse.json(
        { success: false, error: "Customer name is required." },
        { status: 400 }
      );
    }

    const phone = String(body.phone || "").trim();
    if (!phone || phone.length < 8) {
      return NextResponse.json(
        { success: false, error: "Valid contact phone number is required." },
        { status: 400 }
      );
    }

    const stage: LeadStage =
      ["New", "Contacted", "Qualified", "Converted", "Lost", "Invalid"].includes(body.stage)
        ? body.stage
        : "New";

    const lead = await createLead(session.workspace.id, session.user.userId, {
      name,
      phone,
      email: body.email ? String(body.email).trim() : undefined,
      source: String(body.source || "Direct WhatsApp Lead").trim(),
      stage,
      interest: String(body.interest || "General Consultation").trim(),
      notes: body.notes ? String(body.notes).trim() : undefined,
      followUpDate: body.followUpDate ? String(body.followUpDate).trim() : undefined,
      timeline: [
        {
          id: `t_${Date.now()}`,
          time: "Just now",
          action: "Lead record registered in workspace",
        },
      ],
      isSample: false, // User-created leads are real records!
    });

    return NextResponse.json(
      {
        success: true,
        lead,
        message: "Customer lead captured and saved.",
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to create lead",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 400 }
    );
  }
}
