import { NextRequest, NextResponse } from "next/server";
import { createOrLoginUser } from "@/lib/db/store";
import { setSessionCookie } from "@/lib/auth/session";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, name, businessName, mode } = body;

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    const { user, workspace } = await createOrLoginUser({
      email,
      name: name || email.split("@")[0],
      businessName,
      mode: "growth",
    });

    await setSessionCookie(user.userId);

    return NextResponse.json({
      success: true,
      user,
      workspace,
      message: `Welcome, ${user.name}!`,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Authentication failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
