import { cookies } from "next/headers";
import { getOrCreateDefaultUser, getUser, getWorkspaceForUser } from "@/lib/db/store";
import type { UserSession, Workspace } from "@/lib/db/types";

export const SESSION_COOKIE_NAME = "adpulse_session";

export interface SessionContext {
  user: UserSession;
  workspace: Workspace;
}

export async function getSession(): Promise<SessionContext> {
  const cookieStore = await cookies();
  const sessionUserId = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (sessionUserId) {
    const user = await getUser(sessionUserId);
    if (user) {
      const workspace = await getWorkspaceForUser(user.userId);
      return { user, workspace };
    }
  }

  // Standard safe fallback: provisions or retrieves standard local session
  const defaultUser = await getOrCreateDefaultUser();
  const workspace = await getWorkspaceForUser(defaultUser.userId);
  return { user: defaultUser, workspace };
}

export async function setSessionCookie(userId: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, userId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });
}

export async function clearSessionCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}
