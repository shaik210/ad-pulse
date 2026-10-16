import { NextResponse } from "next/server";
import { getSession, setSessionCookie } from "@/lib/auth/session";

export async function GET() {
  try {
    const session = await getSession();
    await setSessionCookie(session.user.userId);

    return NextResponse.json({
      success: true,
      user: session.user,
      workspace: session.workspace,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to initialize or retrieve session",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
