import { promises as fs } from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import type {
  AppDatabase,
  UserSession,
  Workspace,
  CampaignDraft,
  LeadRecord,
  WorkspaceMode,
} from "./types";

const DATA_DIR = path.join(process.cwd(), ".data");
const STORE_FILE = path.join(DATA_DIR, "adpulse-store.json");

let memoryCache: AppDatabase | null = null;

async function ensureDataDirectory(): Promise<void> {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
  } catch {
    // Directory exists
  }
}

function createSeedDatabase(): AppDatabase {
  const defaultUserId = "usr_default_admin";
  const defaultWorkspaceId = "ws_primary_growth";

  const user: UserSession = {
    userId: defaultUserId,
    email: "workspace@adpulse.local",
    name: "Dr. Sharma & Associates",
    activeWorkspaceId: defaultWorkspaceId,
    createdAt: new Date().toISOString(),
  };

  const workspace: Workspace = {
    id: defaultWorkspaceId,
    userId: defaultUserId,
    name: "Apex Multi-Specialty Dental Clinic",
    businessName: "Apex Multi-Specialty Dental Clinic",
    mode: "growth",
    geoCenter: "Green Park Extension, New Delhi",
    geoRadiusKm: 5,
    contactPhone: "+91 98765 43210",
    planId: "growth",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  // Seed sample real campaign draft
  const campaign1: CampaignDraft = {
    id: "cmp_seed_01",
    workspaceId: defaultWorkspaceId,
    userId: defaultUserId,
    name: "Root Canal Painless Treatment Offer",
    type: "growth",
    category: "Dental Clinic",
    channel: "Instagram Reels & Feed",
    headline: "Painless Root Canal & Digital Smile Checkup",
    body: "Pain-free single-sitting RCT by certified MDS specialists. Free digital OPG X-ray consultation within 5km of Green Park.",
    location: "Green Park, New Delhi",
    radiusKm: 5,
    contactPhone: "+91 98765 43210",
    budgetAmount: 500,
    budgetPeriod: "daily",
    durationDays: 30,
    platformFee: 2499,
    adSpendAllowance: 0, // Billed directly by Meta
    status: "Draft",
    statusMessage: "Draft saved on server. Ready for ad network credential review.",
    planId: "growth",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const lead1: LeadRecord = {
    id: "ld_seed_01",
    workspaceId: defaultWorkspaceId,
    userId: defaultUserId,
    name: "Ravi Patel",
    phone: "+91 98765 43210",
    email: "ravi.patel@example.com",
    source: "Instagram Reel Ad (5km)",
    stage: "Contacted",
    interest: "Root Canal Consultation",
    followUpDate: "Tomorrow, 11:00 AM",
    notes: "Inquired about weekend dental consult slots and digital OPG pricing.",
    timeline: [
      { id: "t1", time: "10:14 AM", action: "Inquiry captured via WhatsApp lead link" },
      { id: "t2", time: "10:18 AM", action: "Sent fee schedule and clinic location on WhatsApp" },
      { id: "t3", time: "10:25 AM", action: "Moved stage to Contacted. Follow-up set for tomorrow" },
    ],
    isSample: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  return {
    users: { [defaultUserId]: user },
    workspaces: { [defaultWorkspaceId]: workspace },
    campaigns: { [campaign1.id]: campaign1 },
    leads: { [lead1.id]: lead1 },
  };
}

async function loadStore(): Promise<AppDatabase> {
  if (memoryCache) return memoryCache;
  await ensureDataDirectory();

  try {
    const raw = await fs.readFile(STORE_FILE, "utf-8");
    const data = JSON.parse(raw) as AppDatabase;
    memoryCache = data;
    return data;
  } catch {
    const initial = createSeedDatabase();
    await saveStore(initial);
    memoryCache = initial;
    return initial;
  }
}

async function saveStore(data: AppDatabase): Promise<void> {
  await ensureDataDirectory();
  memoryCache = data;

  const tempFile = `${STORE_FILE}.${crypto.randomUUID()}.tmp`;
  await fs.writeFile(tempFile, JSON.stringify(data, null, 2), "utf-8");
  await fs.rename(tempFile, STORE_FILE);
}

// =============================================================================
// REPOSITORY METHODS
// =============================================================================

export async function getOrCreateDefaultUser(): Promise<UserSession> {
  const store = await loadStore();
  const defaultUserId = "usr_default_admin";

  if (!store.users[defaultUserId]) {
    const seeded = createSeedDatabase();
    await saveStore(seeded);
    return seeded.users[defaultUserId];
  }

  return store.users[defaultUserId];
}

export async function getUser(userId: string): Promise<UserSession | null> {
  const store = await loadStore();
  return store.users[userId] || null;
}

export async function getUserByEmail(email: string): Promise<UserSession | null> {
  const store = await loadStore();
  const normalized = email.trim().toLowerCase();
  for (const u of Object.values(store.users)) {
    if (u.email.toLowerCase() === normalized) {
      return u;
    }
  }
  return null;
}

export async function createOrLoginUser(params: {
  email: string;
  name: string;
  businessName?: string;
  mode?: WorkspaceMode;
}): Promise<{ user: UserSession; workspace: Workspace }> {
  const store = await loadStore();
  const normalized = params.email.trim().toLowerCase();

  // Look for existing user
  for (const u of Object.values(store.users)) {
    if (u.email.toLowerCase() === normalized) {
      const ws = await getWorkspaceForUser(u.userId);
      return { user: u, workspace: ws };
    }
  }

  // Create new user & workspace
  const userId = `usr_${crypto.randomUUID().slice(0, 10)}`;
  const workspaceId = `ws_${crypto.randomUUID().slice(0, 10)}`;

  const user: UserSession = {
    userId,
    email: normalized,
    name: params.name.trim() || "Workspace Owner",
    activeWorkspaceId: workspaceId,
    createdAt: new Date().toISOString(),
  };

  const workspace: Workspace = {
    id: workspaceId,
    userId,
    name: params.businessName?.trim() || `${user.name}'s Workspace`,
    businessName: params.businessName?.trim() || `${user.name}'s Business`,
    mode: params.mode || "growth",
    geoCenter: "Local City / Neighborhood",
    geoRadiusKm: 5,
    contactPhone: "+91 98765 43210",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  store.users[userId] = user;
  store.workspaces[workspaceId] = workspace;
  await saveStore(store);

  return { user, workspace };
}

export async function getWorkspace(workspaceId: string): Promise<Workspace | null> {
  const store = await loadStore();
  return store.workspaces[workspaceId] || null;
}

export async function getWorkspaceForUser(userId: string): Promise<Workspace> {
  const store = await loadStore();
  const user = store.users[userId] || (await getOrCreateDefaultUser());
  const existingWs = store.workspaces[user.activeWorkspaceId];

  if (existingWs) return existingWs;

  // Create workspace if missing
  const newWs: Workspace = {
    id: `ws_${crypto.randomUUID().slice(0, 8)}`,
    userId,
    name: "My AdPulse Workspace",
    businessName: "My Local Business",
    mode: "growth",
    geoCenter: "Green Park, New Delhi",
    geoRadiusKm: 5,
    contactPhone: "+91 98765 43210",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  store.workspaces[newWs.id] = newWs;
  store.users[userId] = { ...user, activeWorkspaceId: newWs.id };
  await saveStore(store);
  return newWs;
}

export async function updateWorkspace(
  workspaceId: string,
  userId: string,
  patch: Partial<Workspace>
): Promise<Workspace | null> {
  const store = await loadStore();
  const ws = store.workspaces[workspaceId];
  if (!ws || ws.userId !== userId) return null;

  const updated: Workspace = {
    ...ws,
    ...patch,
    id: ws.id,
    userId: ws.userId,
    updatedAt: new Date().toISOString(),
  };

  store.workspaces[workspaceId] = updated;
  await saveStore(store);
  return updated;
}

// -----------------------------------------------------------------------------
// CAMPAIGN DRAFTS
// -----------------------------------------------------------------------------

export async function getCampaigns(workspaceId: string): Promise<CampaignDraft[]> {
  const store = await loadStore();
  return Object.values(store.campaigns)
    .filter((c) => c.workspaceId === workspaceId)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function getCampaign(
  campaignId: string,
  workspaceId: string
): Promise<CampaignDraft | null> {
  const store = await loadStore();
  const campaign = store.campaigns[campaignId];
  if (!campaign || campaign.workspaceId !== workspaceId) return null;
  return campaign;
}

export async function createCampaign(
  workspaceId: string,
  userId: string,
  data: Omit<CampaignDraft, "id" | "workspaceId" | "userId" | "createdAt" | "updatedAt">
): Promise<CampaignDraft> {
  const store = await loadStore();
  const id = `cmp_${crypto.randomUUID().slice(0, 10)}`;

  const campaign: CampaignDraft = {
    ...data,
    id,
    workspaceId,
    userId,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  store.campaigns[id] = campaign;
  await saveStore(store);
  return campaign;
}

export async function updateCampaign(
  campaignId: string,
  workspaceId: string,
  userId: string,
  patch: Partial<CampaignDraft>
): Promise<CampaignDraft | null> {
  const store = await loadStore();
  const existing = store.campaigns[campaignId];
  if (!existing || existing.workspaceId !== workspaceId || existing.userId !== userId) {
    return null;
  }

  const updated: CampaignDraft = {
    ...existing,
    ...patch,
    id: existing.id,
    workspaceId: existing.workspaceId,
    userId: existing.userId,
    updatedAt: new Date().toISOString(),
  };

  store.campaigns[campaignId] = updated;
  await saveStore(store);
  return updated;
}

export async function deleteCampaign(
  campaignId: string,
  workspaceId: string,
  userId: string
): Promise<boolean> {
  const store = await loadStore();
  const existing = store.campaigns[campaignId];
  if (!existing || existing.workspaceId !== workspaceId || existing.userId !== userId) {
    return false;
  }

  delete store.campaigns[campaignId];
  await saveStore(store);
  return true;
}

// -----------------------------------------------------------------------------
// CRM LEADS
// -----------------------------------------------------------------------------

export async function getLeads(workspaceId: string): Promise<LeadRecord[]> {
  const store = await loadStore();
  return Object.values(store.leads)
    .filter((l) => l.workspaceId === workspaceId)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function getLead(leadId: string, workspaceId: string): Promise<LeadRecord | null> {
  const store = await loadStore();
  const lead = store.leads[leadId];
  if (!lead || lead.workspaceId !== workspaceId) return null;
  return lead;
}

export async function createLead(
  workspaceId: string,
  userId: string,
  data: Omit<LeadRecord, "id" | "workspaceId" | "userId" | "createdAt" | "updatedAt">
): Promise<LeadRecord> {
  const store = await loadStore();
  const id = `ld_${crypto.randomUUID().slice(0, 10)}`;

  const lead: LeadRecord = {
    ...data,
    id,
    workspaceId,
    userId,
    isSample: data.isSample ?? false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  store.leads[id] = lead;
  await saveStore(store);
  return lead;
}

export async function updateLead(
  leadId: string,
  workspaceId: string,
  userId: string,
  patch: Partial<LeadRecord>
): Promise<LeadRecord | null> {
  const store = await loadStore();
  const existing = store.leads[leadId];
  if (!existing || existing.workspaceId !== workspaceId || existing.userId !== userId) {
    return null;
  }

  const updated: LeadRecord = {
    ...existing,
    ...patch,
    id: existing.id,
    workspaceId: existing.workspaceId,
    userId: existing.userId,
    updatedAt: new Date().toISOString(),
  };

  store.leads[leadId] = updated;
  await saveStore(store);
  return updated;
}
