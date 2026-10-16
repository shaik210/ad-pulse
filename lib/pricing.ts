export interface IndividualPackage {
  id: "starter" | "growth" | "power";
  name: string;
  badge: string;
  popular?: boolean;
  totalPrice: number; // in INR
  adBudget: number; // included ad allowance
  platformFee: number; // AdPulse service fee
  durationDays: number;
  description: string;
  targetAudience: string;
  features: string[];
  ctaText: string;
  ctaUrl: string;
  status: "provisional_experiment" | "active";
}

export interface BusinessSaaSPlan {
  id: "basic" | "growth" | "premium";
  name: string;
  badge: string;
  popular?: boolean;
  monthlyPrice: number; // in INR / month
  description: string;
  targetAudience: string;
  workspaces: string;
  activeCampaigns: string;
  features: {
    name: string;
    available: boolean;
    requiresDev?: boolean;
    note?: string;
  }[];
  ctaText: string;
  ctaUrl: string;
  status: "provisional_experiment" | "active";
}

export interface TaxConfiguration {
  gstRatePercent: number; // e.g. 18%
  applyGstTo: "platform_fee_only" | "total_package";
  displayMode: "exclusive_breakdown" | "inclusive_label";
  disclaimer: string;
}

export const TAX_CONFIG: TaxConfiguration = {
  gstRatePercent: 18,
  applyGstTo: "platform_fee_only",
  displayMode: "exclusive_breakdown",
  disclaimer: "Statutory 18% GST applies strictly to the AdPulse software subscription fee. Advertising media spend is billed directly by Meta and Google to your card inside your connected accounts with 0% markup.",
};

export const INDIVIDUAL_PACKAGES: IndividualPackage[] = [];

export const BUSINESS_SAAS_PLANS: BusinessSaaSPlan[] = [
  {
    id: "basic",
    name: "Basic Plan",
    badge: "Solo Storefront",
    monthlyPrice: 1499,
    description: "Essential local advertising toolkit for single-practitioner clinics, boutique stores, or solo operators.",
    targetAudience: "Solo businesses starting recurring local advertising.",
    workspaces: "1 Business Workspace",
    activeCampaigns: "1 Active Campaign",
    features: [
      { name: "1 business workspace profile", available: true },
      { name: "1 active campaign at a time", available: true },
      { name: "AI-assisted ad copy & creative previews", available: true },
      { name: "Basic lead inbox & manual status updates", available: true },
      { name: "Basic campaign performance reporting", available: true },
      { name: "Self-service onboarding & guided wizard", available: true },
      { name: "Connect your Meta & Google ad accounts", available: true },
      { name: "Ad spend billed directly by Meta/Google (0% markup)", available: true },
      { name: "Automated follow-up reminders", available: false, requiresDev: true, note: "Planned in Q2" },
      { name: "Multi-profile support", available: false, note: "Requires Premium" },
    ],
    ctaText: "Choose Basic Plan (₹1,499/mo)",
    ctaUrl: "/dashboard?plan=basic",
    status: "active",
  },
  {
    id: "growth",
    name: "Growth Plan",
    badge: "Recommended for Clinics & Stores",
    popular: true,
    monthlyPrice: 2499,
    description: "Complete advertising tools and customer inquiries tracker for growing clinics, salons, gyms, cafes, and retail shops.",
    targetAudience: "Storefronts running ongoing customer pipeline marketing.",
    workspaces: "1 Business Workspace",
    activeCampaigns: "Up to 3 Active Campaigns",
    features: [
      { name: "Everything in Basic", available: true },
      { name: "Multiple active campaigns (up to 3 concurrent)", available: true },
      { name: "Full 6-stage customer CRM pipeline", available: true },
      { name: "Activity timeline and customer consultation notes", available: true },
      { name: "Follow-up reminder dates & scheduling", available: true },
      { name: "Campaign-source lead attribution", available: true },
      { name: "Unlimited AI creative variations & testing", available: true },
      { name: "Standard priority WhatsApp & email support", available: true },
      { name: "Multi-location comparisons", available: false, note: "Requires Premium" },
      { name: "Team permissions & seat controls", available: false, requiresDev: true, note: "Planned in Q2" },
    ],
    ctaText: "Start Growth Plan (₹2,499/mo)",
    ctaUrl: "/dashboard?plan=growth",
    status: "active",
  },
  {
    id: "premium",
    name: "Premium Plan",
    badge: "Multi-Location & Advanced",
    monthlyPrice: 4999,
    description: "Advanced marketing suite for multi-branch clinics, franchise outlets, or high-volume local brands.",
    targetAudience: "Multi-outlet brands and businesses needing strategic reviews.",
    workspaces: "Up to 3 Locations / Business Profiles",
    activeCampaigns: "Unlimited Active Campaigns (within ad spend)",
    features: [
      { name: "Everything in Growth", available: true },
      { name: "Multiple locations or business profiles (up to 3)", available: true },
      { name: "Advanced reporting and campaign comparisons", available: true },
      { name: "Frequent optimization and performance reviews", available: true },
      { name: "Assisted account onboarding & monthly strategy review", available: true },
      { name: "Priority technical & campaign support channel", available: true },
      { name: "Team access and permissions", available: false, requiresDev: true, note: "Requires backend RBAC module" },
      { name: "Automated bidding rule sync", available: false, requiresDev: true, note: "In active development" },
    ],
    ctaText: "Explore Premium (₹4,999/mo)",
    ctaUrl: "/dashboard?plan=premium",
    status: "active",
  },
];
