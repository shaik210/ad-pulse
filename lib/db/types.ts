export type WorkspaceMode = "growth" | "quickblast";

export type CampaignStatus = "Draft" | "Pending_Review" | "Active" | "Paused" | "Completed";

export type LeadStage = "New" | "Contacted" | "Qualified" | "Converted" | "Lost" | "Invalid";

export interface UserSession {
  userId: string;
  email: string;
  name: string;
  activeWorkspaceId: string;
  createdAt: string;
}

export interface Workspace {
  id: string;
  userId: string;
  name: string;
  mode: WorkspaceMode;
  businessName: string;
  geoCenter: string;
  geoRadiusKm: number;
  contactPhone: string;
  planId?: string;
  packageId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CampaignDraft {
  id: string;
  workspaceId: string;
  userId: string;
  name: string;
  type: WorkspaceMode;
  category: string;
  channel: string;
  headline: string;
  body: string;
  location: string;
  radiusKm: number;
  contactPhone: string;
  budgetAmount: number;
  budgetPeriod: "flat_one_time" | "daily";
  durationDays: number;
  platformFee: number;
  adSpendAllowance: number;
  status: CampaignStatus;
  statusMessage?: string;
  packageId?: string;
  planId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface LeadTimelineEvent {
  id: string;
  time: string;
  action: string;
  actor?: string;
}

export interface LeadRecord {
  id: string;
  workspaceId: string;
  userId: string;
  name: string;
  phone: string;
  email?: string;
  source: string;
  stage: LeadStage;
  interest: string;
  followUpDate?: string;
  notes?: string;
  timeline: LeadTimelineEvent[];
  isSample?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AppDatabase {
  users: Record<string, UserSession>;
  workspaces: Record<string, Workspace>;
  campaigns: Record<string, CampaignDraft>;
  leads: Record<string, LeadRecord>;
}
