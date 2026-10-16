"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Menu,
  X,
  Search,
  MessageCircle,
  Plus,
  Sparkles,
  Activity,
  Megaphone,
  Kanban,
  Palette,
  Plug,
  ArrowLeft,
  CheckCircle2,
  Clock,
  Settings,
  CreditCard,
  Building2,
  Info,
  BarChart3,
  Play,
  ArrowUpRight,
  Flame,
  Timer,
  ImageIcon,
  UserPlus,
  AlertCircle,
  Loader2,
  Check,
  Calendar,
  ExternalLink,
  Phone,
  HelpCircle,
  Zap,
  Wand2,
  Copy,
  Download,
  UploadCloud,
  Layers,
  Eye,
  Share2,
  MapPin,
} from "lucide-react";

import { CampaignWizardModal } from "@/components/dashboard/campaign-wizard-modal";
import { NewLeadModal } from "@/components/dashboard/new-lead-modal";
import { CampaignDetailsModal } from "@/components/dashboard/campaign-details-modal";
import { IntegrationModal } from "@/components/dashboard/integration-modal";
import { PlanSwitchModal } from "@/components/dashboard/plan-switch-modal";
import { INDIVIDUAL_PACKAGES, BUSINESS_SAAS_PLANS } from "@/lib/pricing";

// Brand SVG Icons
const FacebookIcon = ({ className = "size-4", ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const InstagramIcon = ({ className = "size-4", ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

// Interfaces
interface Lead {
  id: string;
  name: string;
  phone: string;
  email?: string;
  source: string;
  createdAt: string;
  stage: "New" | "Contacted" | "Qualified" | "Converted" | "Lost" | "Invalid";
  interest: string;
  followUpDate?: string;
  notes?: string;
  timeline: { id?: string; time: string; action: string }[];
  isSample?: boolean;
}

interface CampaignItem {
  id: string;
  name: string;
  type: "growth" | "quickblast" | "business" | string;
  category?: string;
  channel: string;
  status: "Active" | "Paused" | "Completed" | "Draft";
  budget: string;
  spend: string;
  inquiries: number;
  cpi: string;
  daysRemaining?: number;
  image?: string;
  headline?: string;
  body?: string;
  location?: string;
  radiusKm?: number;
  contactPhone?: string;
  statusMessage?: string;
  budgetAmount?: number;
  budgetPeriod?: "daily" | "flat_one_time";
  platformFee?: number;
  adSpendAllowance?: number;
  createdAt?: string;
}

export default function DashboardPage() {
  const [isDark, setIsDark] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [workspaceMode, setWorkspaceMode] = useState<"growth" | "quickblast">("growth");
  const [activeTab, setActiveTab] = useState<
    "overview" | "leads" | "campaigns" | "creatives" | "analytics" | "integrations" | "billing" | "settings"
  >("overview");

  // Server-Backed Workspace Profile
  const [workspaceProfile, setWorkspaceProfile] = useState({
    businessName: "Apex Multi-Specialty Dental Clinic",
    geoCenter: "Green Park Extension, New Delhi",
    geoRadiusKm: 5,
    contactPhone: "+91 98765 43210",
  });
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [profileSaveSuccess, setProfileSaveSuccess] = useState(false);

  // CRM State
  const [searchQuery, setSearchQuery] = useState("");
  const [sourceFilter, setSourceFilter] = useState("all");
  const [stageFilter, setStageFilter] = useState("all");
  const [leadRecordType, setLeadRecordType] = useState<"all" | "active" | "sample">("all");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isNewLeadModalOpen, setIsNewLeadModalOpen] = useState(false);
  const [newLeadNote, setNewLeadNote] = useState("");
  const [isSavingNote, setIsSavingNote] = useState(false);

  // Campaign Wizard & Details State
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [wizardMode, setWizardMode] = useState<"quickblast" | "business">("business");
  const [wizardPackageId, setWizardPackageId] = useState("growth");
  const [wizardPlanId, setWizardPlanId] = useState("growth");
  const [selectedCampaign, setSelectedCampaign] = useState<CampaignItem | null>(null);
  const [isCampaignDetailsOpen, setIsCampaignDetailsOpen] = useState(false);

  // Integrations & Billing Modals State
  const [integrationPlatform, setIntegrationPlatform] = useState<"meta" | "google" | null>(null);
  const [isIntegrationModalOpen, setIsIntegrationModalOpen] = useState(false);
  const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);
  const [currentPlanId, setCurrentPlanId] = useState("growth");

  // Creatives & Analytics Interactive State
  const [creativeFormat, setCreativeFormat] = useState<"reel" | "feed" | "search">("reel");
  const [creativeCustomHeadline, setCreativeCustomHeadline] = useState(
    "Pain-Free Single-Sitting Root Canal & Checkup"
  );
  const [analyticsTimeframe, setAnalyticsTimeframe] = useState<"7d" | "30d" | "all">("7d");

  // AI Creative Studio & Canva Integration State
  const [creativeSubTab, setCreativeSubTab] = useState<"ai_generator" | "canva_studio" | "preview" | "library">("ai_generator");
  const [aiIndustry, setAiIndustry] = useState("dental");
  const [aiTone, setAiTone] = useState("offer");
  const [aiOfferDetails, setAiOfferDetails] = useState("Flat 30% Off Single-Sitting Root Canal + Free Consultation");
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);
  const [copiedVarId, setCopiedVarId] = useState<string | null>(null);
  const [canvaImportStatus, setCanvaImportStatus] = useState<string | null>(null);

  const [aiGeneratedVariations, setAiGeneratedVariations] = useState([
    {
      id: "var-1",
      title: "Direct Benefit Hook",
      headline: "Pain-Free Single-Sitting Root Canal — ₹2,499 Flat",
      body: "Walk in with discomfort, walk out smiling in under 45 minutes. Advanced digital microscope treatment by Dr. Sharma in Green Park.",
      whatsappText: "Hi Dr. Sharma! I saw your Root Canal special on Instagram. Can I book an appointment for tomorrow?",
      format: "reel",
      tag: "Best for Instagram Reels",
    },
    {
      id: "var-2",
      title: "Limited Time Neighborhood Special",
      headline: "Green Park Residents: 30% Off Dental Checkup & Cleaning",
      body: "Exclusive to neighbors within 5km. Comprehensive digital X-ray, scale & polish, and consultation. Only 15 appointment slots this week.",
      whatsappText: "Hello! I live in Green Park and would like to claim the 30% off dental checkup slot.",
      format: "feed",
      tag: "Best for Meta Feed Posts",
    },
    {
      id: "var-3",
      title: "Urgent Local Search Call Ad",
      headline: "Emergency Dental Clinic Near You — Instant WhatsApp Booking",
      body: "Root canals, crowns, and tooth pain relief. 5-star clinic located 5 minutes from Green Park Metro. Immediate response.",
      whatsappText: "Hi! I have urgent tooth pain, are you available for a consultation today?",
      format: "search",
      tag: "Best for Google Local Search",
    },
  ]);

  const canvaPresets = [
    {
      id: "canva-1",
      name: "Modern Clinic Offer Reel",
      dimensions: "1080 × 1920 (9:16)",
      format: "Instagram Reel",
      industry: "Healthcare & Dental",
      badge: "Reel 9:16",
      headline: "Pain-Free Root Canal Special (5km)",
      canvaUrl: "https://www.canva.com/create/instagram-reels/",
    },
    {
      id: "canva-2",
      name: "Luxury Salon & Spa Glow Feed",
      dimensions: "1080 × 1080 (1:1)",
      format: "Meta Feed Post",
      industry: "Salon & Wellness",
      badge: "Square 1:1",
      headline: "Weekend Deluxe Hair Spa Combo",
      canvaUrl: "https://www.canva.com/create/instagram-posts/",
    },
    {
      id: "canva-3",
      name: "Gym 3-Day Pass Local Banner",
      dimensions: "1200 × 628 (16:9)",
      format: "Facebook & Display Banner",
      industry: "Fitness & Gyms",
      badge: "Banner 16:9",
      headline: "Start Your 30-Day Fitness Transformation",
      canvaUrl: "https://www.canva.com/create/facebook-posts/",
    },
    {
      id: "canva-4",
      name: "Local Restaurant Feast Story",
      dimensions: "1080 × 1920 (9:16)",
      format: "Instagram Story / Reel",
      industry: "Food & Dining",
      badge: "Story 9:16",
      headline: "Wood-Fired Pizza Family Weekend Deal",
      canvaUrl: "https://www.canva.com/create/instagram-stories/",
    },
  ];

  const savedCreativesList = [
    {
      id: "crt-101",
      title: "Root Canal 30% Off Reel",
      channel: "Instagram Reel (9:16)",
      source: "AI Studio Generated",
      status: "Active in 1 Campaign",
      updatedAt: "Today, 10:15 AM",
    },
    {
      id: "crt-102",
      title: "Green Park Dental Feed Banner",
      channel: "Meta Feed (1:1)",
      source: "Canva Template Preset",
      status: "Ready for Ads",
      updatedAt: "Yesterday",
    },
    {
      id: "crt-103",
      title: "Emergency Tooth Pain Call Ad",
      channel: "Google Search SERP",
      source: "AI Copy Generator",
      status: "Active in 1 Campaign",
      updatedAt: "08 Oct 2026",
    },
  ];

  // Campaigns & Leads State
  const [campaigns, setCampaigns] = useState<CampaignItem[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoadingInitialData, setIsLoadingInitialData] = useState(true);

  // Default initial sample leads for demonstration fallback
  const sampleFallbackLeads: Lead[] = [
    {
      id: "ld-demo-101",
      name: "Ravi Patel",
      phone: "+91 98765 43210",
      email: "ravi.patel@example.com",
      source: "Instagram Reel Ad (5km)",
      createdAt: "10 mins ago",
      stage: "Contacted",
      interest: "Root Canal Consultation",
      followUpDate: "Tomorrow, 11:00 AM",
      notes: "Customer inquired about weekend slots and digital OPG pricing.",
      timeline: [
        { time: "10m ago", action: "Inquiry captured via WhatsApp lead link" },
        { time: "5m ago", action: "Sent consultation schedule on WhatsApp" },
      ],
      isSample: true,
    },
    {
      id: "ld-demo-102",
      name: "Sneha Sharma",
      phone: "+91 91234 56789",
      email: "sneha.s@example.com",
      source: "Google Search Ad",
      createdAt: "45 mins ago",
      stage: "Qualified",
      interest: "Teeth Whitening Package",
      notes: "Confirmed slot for Saturday 4 PM.",
      timeline: [
        { time: "45m ago", action: "Lead created via Google Search Call Ad" },
        { time: "15m ago", action: "Marked Qualified by Receptionist" },
      ],
      isSample: true,
    },
    {
      id: "ld-demo-103",
      name: "Vikram Malhotra",
      phone: "+91 98112 33445",
      source: "Instagram Reels Ad (5km)",
      createdAt: "2 hours ago",
      stage: "New",
      interest: "Dental Veneers & Smile Makeover",
      notes: "Requested weekend morning consultation slot.",
      timeline: [{ time: "2h ago", action: "Direct WhatsApp click on Reels ad" }],
      isSample: true,
    },
  ];

  // 1. Initial Data Fetch & Query Params Handling
  useEffect(() => {
    // Theme setup
    const saved = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (saved === "dark" || (!saved && prefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDark(false);
      document.documentElement.classList.remove("dark");
    }

    // Load Session & Server Data
    const loadServerData = async () => {
      try {
        const [authRes, campRes, leadsRes] = await Promise.all([
          fetch("/api/auth/me"),
          fetch("/api/campaigns"),
          fetch("/api/leads"),
        ]);

        if (authRes.ok) {
          const authData = await authRes.json();
          if (authData.workspace) {
            setWorkspaceProfile({
              businessName: authData.workspace.businessName || "Apex Multi-Specialty Dental Clinic",
              geoCenter: authData.workspace.geoCenter || "Green Park Extension, New Delhi",
              geoRadiusKm: authData.workspace.geoRadiusKm || 5,
              contactPhone: authData.workspace.contactPhone || "+91 98765 43210",
            });
            if (authData.workspace.mode) {
              setWorkspaceMode(authData.workspace.mode);
            }
          }
        }

        if (campRes.ok) {
          const campData = await campRes.json();
          if (Array.isArray(campData.campaigns) && campData.campaigns.length > 0) {
            const formatted: CampaignItem[] = campData.campaigns.map((c: any) => ({
              id: c.id,
              name: c.name,
              type: c.type,
              category: c.category,
              channel: c.channel,
              status: c.status,
              budget: c.budgetPeriod === "daily" ? `₹${c.budgetAmount} / day` : `₹${c.budgetAmount} Flat (${c.durationDays}d)`,
              spend: `₹${c.adSpendAllowance || c.budgetAmount}`,
              inquiries: c.status === "Active" ? 14 : 0,
              cpi: c.status === "Active" ? "₹110" : "—",
              daysRemaining: c.durationDays,
              headline: c.headline,
              body: c.body,
              location: c.location,
              radiusKm: c.radiusKm,
              contactPhone: c.contactPhone,
              statusMessage: c.statusMessage,
              budgetAmount: c.budgetAmount,
              budgetPeriod: c.budgetPeriod,
              platformFee: c.platformFee,
              adSpendAllowance: c.adSpendAllowance,
              createdAt: c.createdAt,
            }));
            setCampaigns(formatted);
          } else {
            // Seed visual fallback campaign
            setCampaigns([
              {
                id: "cmp-fallback-01",
                name: "Root Canal Painless Treatment Offer",
                type: "growth",
                channel: "Instagram Reels & Feed",
                status: "Active",
                budget: "₹500 / day",
                spend: "₹1,750",
                inquiries: 16,
                cpi: "₹109",
                daysRemaining: 18,
              },
              {
                id: "cmp-fallback-02",
                name: "Teeth Whitening & Smile Makeover Special",
                type: "growth",
                channel: "Google Search Call Ads",
                status: "Active",
                budget: "₹400 / day",
                spend: "₹1,200",
                inquiries: 11,
                cpi: "₹109",
                daysRemaining: 22,
              },
            ]);
          }
        }

        if (leadsRes.ok) {
          const leadsData = await leadsRes.json();
          if (Array.isArray(leadsData.leads) && leadsData.leads.length > 0) {
            setLeads(leadsData.leads);
          } else {
            setLeads(sampleFallbackLeads);
          }
        }
      } catch (err) {
        console.error("Error loading workspace data:", err);
        setLeads(sampleFallbackLeads);
      } finally {
        setIsLoadingInitialData(false);
      }
    };

    loadServerData();

    // Query parameters parser
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      setWorkspaceMode("growth");
      const tab = params.get("tab");
      if (tab && ["overview", "leads", "campaigns", "creatives", "analytics", "integrations", "billing", "settings"].includes(tab)) {
        setActiveTab(tab as any);
      }
      const wizard = params.get("wizard");
      if (wizard) {
        setWizardMode("business");
        setIsWizardOpen(true);
      }
      const plan = params.get("plan");
      if (plan) setWizardPlanId(plan);
    }
  }, []);

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    if (nextDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  // 2. Handle Lead Status Update (Persisted via PATCH /api/leads/[id])
  const updateLeadStage = async (id: string, newStage: Lead["stage"]) => {
    // Optimistic UI update
    setLeads((prev) =>
      prev.map((l) => {
        if (l.id === id) {
          const updatedTimeline = [
            ...l.timeline,
            { time: "Just now", action: `Status updated to ${newStage}` },
          ];
          const updated = { ...l, stage: newStage, timeline: updatedTimeline };
          if (selectedLead?.id === id) setSelectedLead(updated);
          return updated;
        }
        return l;
      })
    );

    try {
      await fetch(`/api/leads/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stage: newStage }),
      });
    } catch (err) {
      console.error("Failed to persist lead stage update:", err);
    }
  };

  // 3. Handle Workspace Profile Persistence (PATCH /api/workspace)
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingProfile(true);
    setProfileSaveSuccess(false);

    try {
      const res = await fetch("/api/workspace", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(workspaceProfile),
      });

      if (res.ok) {
        setProfileSaveSuccess(true);
        setTimeout(() => setProfileSaveSuccess(false), 4000);
      }
    } catch (err) {
      console.error("Failed to save workspace profile:", err);
    } finally {
      setIsSavingProfile(false);
    }
  };

  // 4. Handle Adding Note to Lead
  const handleAddLeadNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLead || !newLeadNote.trim()) return;

    const noteText = newLeadNote.trim();
    setIsSavingNote(true);

    const updatedTimeline = [
      ...(selectedLead.timeline || []),
      { time: "Just now", action: `Note added: "${noteText}"` },
    ];

    const updatedLead: Lead = {
      ...selectedLead,
      notes: selectedLead.notes ? `${selectedLead.notes} • ${noteText}` : noteText,
      timeline: updatedTimeline,
    };

    setSelectedLead(updatedLead);
    setLeads((prev) => prev.map((l) => (l.id === selectedLead.id ? updatedLead : l)));
    setNewLeadNote("");

    try {
      await fetch(`/api/leads/${selectedLead.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notes: noteText, addTimelineNote: true }),
      });
    } catch (err) {
      console.error("Failed to persist lead note:", err);
    } finally {
      setIsSavingNote(false);
    }
  };

  // AI Copy Generation Handler
  const handleGenerateAiCopy = () => {
    setIsGeneratingAi(true);
    setTimeout(() => {
      let vars = [];
      const locationName = workspaceProfile.geoCenter.split(",")[0].trim() || "Local";

      if (aiIndustry === "salon") {
        vars = [
          {
            id: `var-${Date.now()}-1`,
            title: "Reel Hook — Weekend Glow",
            headline: "Keratin & Deluxe Hair Spa — Flat ₹1,499 This Week",
            body: `Frizz-free, salon-finish hair in 60 minutes. Premium organic products used by senior stylists in ${locationName}. 5km neighborhood booking.`,
            whatsappText: "Hi! I saw your Keratin & Hair Spa special on Instagram. Can I book an appointment for Saturday?",
            format: "reel",
            tag: "Best for Instagram Reels (9:16)",
          },
          {
            id: `var-${Date.now()}-2`,
            title: "Feed Post — Bridal & Party Glam",
            headline: `${locationName} Residents: Party Makeup & Blowdry Combo`,
            body: "Get ready for celebrations with professional skin prep, HD party makeup, and styling. Limited weekend slots available.",
            whatsappText: "Hello! I would like to book a party makeup appointment for this weekend.",
            format: "feed",
            tag: "Best for Meta Feed Posts (1:1)",
          },
          {
            id: `var-${Date.now()}-3`,
            title: "Local Search — Walk-In Beauty Salon",
            headline: `Top Rated Hair & Beauty Salon Near You in ${locationName}`,
            body: "Haircuts, facials, pedicures, and nail extensions. 5-star hygiene rating. Immediate appointments on WhatsApp.",
            whatsappText: "Hi! Are there any slots available for a haircut and facial today?",
            format: "search",
            tag: "Best for Google Local Search",
          },
        ];
      } else if (aiIndustry === "gym") {
        vars = [
          {
            id: `var-${Date.now()}-1`,
            title: "High Energy Reel Hook",
            headline: "Transform Your Fitness: 3-Day Free Trial Pass",
            body: `Full gym floor access, cardio zone, certified personal trainers, and steam room. Only 20 trial passes available for ${locationName} residents.`,
            whatsappText: "Hi! I would like to claim the 3-day free gym trial pass.",
            format: "reel",
            tag: "Best for Instagram Reels (9:16)",
          },
          {
            id: `var-${Date.now()}-2`,
            title: "Feed Post — Quarterly Membership Drive",
            headline: "Join Now & Get 1 Month Personal Training Free",
            body: "Customized workout plan, body composition analysis, and dedicated nutrition guidance with certified trainers within 5km.",
            whatsappText: "Hello! Please share details and pricing for the 3-month gym membership package.",
            format: "feed",
            tag: "Best for Meta Feed Posts (1:1)",
          },
          {
            id: `var-${Date.now()}-3`,
            title: "Local Search — Neighborhood Gym & Yoga",
            headline: `Modern Fitness Center 5 Minutes From Your Home in ${locationName}`,
            body: "Open 6 AM to 10 PM. Strength equipment, functional turf, and air-conditioned lockers. Direct WhatsApp enquiry.",
            whatsappText: "Hi! I want to visit the gym for a facility tour this evening.",
            format: "search",
            tag: "Best for Google Local Search",
          },
        ];
      } else if (aiIndustry === "restaurant") {
        vars = [
          {
            id: `var-${Date.now()}-1`,
            title: "Appetite Hook Reel",
            headline: "Artisan Wood-Fired Pizza & Pasta Feast",
            body: `Hand-stretched sourdough pizza baked at 450°C. Family dinner combos starting at ₹899 with complimentary mocktails in ${locationName}.`,
            whatsappText: "Hi! I would like to reserve a table for 4 people for dinner tonight.",
            format: "reel",
            tag: "Best for Instagram Reels (9:16)",
          },
          {
            id: `var-${Date.now()}-2`,
            title: "Feed Post — Weekend Buffet Special",
            headline: `Unlimited Weekend Family Brunch in ${locationName}`,
            body: "Over 35 live counter delicacies, wood-fired specials, and artisan desserts. Early bird reservations now open.",
            whatsappText: "Hello! We would like to book a table for Sunday family brunch.",
            format: "feed",
            tag: "Best for Meta Feed Posts (1:1)",
          },
          {
            id: `var-${Date.now()}-3`,
            title: "Local Search — Best Family Dining Near You",
            headline: `Authentic Local Dining & Private Party Hall in ${locationName}`,
            body: "Outdoor garden seating, kids play area, and dedicated party packages. Quick table confirmation on WhatsApp.",
            whatsappText: "Hi! Could you share the private party menu and package pricing?",
            format: "search",
            tag: "Best for Google Local Search",
          },
        ];
      } else {
        // Default / Dental Clinic
        vars = [
          {
            id: `var-${Date.now()}-1`,
            title: "Direct Benefit Hook",
            headline: aiOfferDetails ? `${aiOfferDetails.slice(0, 50)}` : "Pain-Free Single-Sitting Root Canal — ₹2,499 Flat",
            body: `Walk in with tooth pain, walk out smiling in under 45 minutes. Advanced digital microscope treatment by verified doctors in ${locationName}.`,
            whatsappText: `Hi! I saw your ${aiOfferDetails ? aiOfferDetails.slice(0, 30) : "Dental"} offer on Instagram. Can I book an appointment?`,
            format: "reel",
            tag: "Best for Instagram Reels (9:16)",
          },
          {
            id: `var-${Date.now()}-2`,
            title: "Limited Neighborhood Special",
            headline: `${locationName} Residents: ${aiOfferDetails ? aiOfferDetails.slice(0, 35) : "30% Off Checkup & Cleaning"}`,
            body: `Exclusive to neighbors within 5km. Comprehensive digital X-ray, scale & polish, and consultation. Only 15 slots remaining this week.`,
            whatsappText: `Hello! I live in ${locationName} and would like to claim the special consultation slot.`,
            format: "feed",
            tag: "Best for Meta Feed Posts (1:1)",
          },
          {
            id: `var-${Date.now()}-3`,
            title: "Urgent Local Search Call Ad",
            headline: `Emergency Dental Clinic in ${locationName} — Instant Booking`,
            body: `Root canals, crowns, and tooth pain relief. 5-star clinic located 5 minutes away. Immediate response on WhatsApp.`,
            whatsappText: `Hi! I have urgent tooth pain, are you available for a consultation today?`,
            format: "search",
            tag: "Best for Google Local Search",
          },
        ];
      }

      setAiGeneratedVariations(vars);
      setIsGeneratingAi(false);
    }, 600);
  };

  const handleCopyVariation = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedVarId(id);
    setTimeout(() => setCopiedVarId(null), 2000);
  };

  // Navigation Items
  const navItems: {
    id: "overview" | "leads" | "campaigns" | "creatives" | "analytics" | "integrations" | "billing" | "settings";
    name: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: number;
  }[] = [
    { id: "overview", name: "Overview", icon: Activity },
    {
      id: "leads",
      name: "Leads & CRM",
      icon: Kanban,
      badge: leads.filter((l) => l.stage === "New").length,
    },
    { id: "campaigns", name: "Campaigns", icon: Megaphone },
    { id: "creatives", name: "AI Creatives", icon: Palette },
    { id: "analytics", name: "Analytics", icon: BarChart3 },
    { id: "integrations", name: "Integrations", icon: Plug },
    { id: "billing", name: "Billing & Spend", icon: CreditCard },
    { id: "settings", name: "Settings", icon: Settings },
  ];

  // Filtered Leads
  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.phone.includes(searchQuery) ||
      lead.interest.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSource = sourceFilter === "all" || lead.source.toLowerCase().includes(sourceFilter.toLowerCase());
    const matchesStage = stageFilter === "all" || lead.stage === stageFilter;
    const matchesType =
      leadRecordType === "all"
        ? true
        : leadRecordType === "active"
        ? !lead.isSample
        : lead.isSample === true;
    return matchesSearch && matchesSource && matchesStage && matchesType;
  });

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col md:flex-row transition-colors duration-200 font-sans selection:bg-primary selection:text-primary-foreground">
      {/* Campaign Wizard Modal (Phase 2B & 2C functional journey) */}
      <CampaignWizardModal
        isOpen={isWizardOpen}
        mode={wizardMode}
        initialPackageId={wizardPackageId}
        initialPlanId={wizardPlanId}
        defaultLocation={workspaceProfile.geoCenter}
        defaultPhone={workspaceProfile.contactPhone}
        onClose={() => setIsWizardOpen(false)}
        onCampaignCreated={(newCamp) => {
          setCampaigns((prev) => [
            {
              id: newCamp.id,
              name: newCamp.name,
              type: newCamp.type,
              category: newCamp.category,
              channel: newCamp.channel,
              status: newCamp.status,
              budget: newCamp.budgetPeriod === "daily" ? `₹${newCamp.budgetAmount} / day` : `₹${newCamp.budgetAmount} Flat (${newCamp.durationDays}d)`,
              spend: "₹0",
              inquiries: 0,
              cpi: "—",
              headline: newCamp.headline,
              body: newCamp.body,
              location: newCamp.location,
              radiusKm: newCamp.radiusKm,
              contactPhone: newCamp.contactPhone,
              statusMessage: newCamp.statusMessage,
              budgetAmount: newCamp.budgetAmount,
              budgetPeriod: newCamp.budgetPeriod,
              platformFee: newCamp.platformFee,
              adSpendAllowance: newCamp.adSpendAllowance,
              createdAt: newCamp.createdAt,
            },
            ...prev,
          ]);
          setActiveTab("campaigns");
        }}
      />

      {/* New Customer Lead Modal (Phase 2C CRM Lead Creation) */}
      <NewLeadModal
        isOpen={isNewLeadModalOpen}
        onClose={() => setIsNewLeadModalOpen(false)}
        onLeadCreated={(newLead) => {
          setLeads((prev) => [newLead, ...prev]);
        }}
      />

      {/* Campaign Details & Draft Inspection Modal */}
      <CampaignDetailsModal
        isOpen={isCampaignDetailsOpen}
        onClose={() => {
          setIsCampaignDetailsOpen(false);
          setSelectedCampaign(null);
        }}
        campaign={selectedCampaign}
        onToggleStatus={(id, newStatus) => {
          setCampaigns((prev) =>
            prev.map((c) => (c.id === id ? { ...c, status: newStatus } : c))
          );
          if (selectedCampaign && selectedCampaign.id === id) {
            setSelectedCampaign({ ...selectedCampaign, status: newStatus });
          }
          fetch(`/api/campaigns/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: newStatus }),
          }).catch(console.error);
        }}
        onDelete={(id) => {
          setCampaigns((prev) => prev.filter((c) => c.id !== id));
          if (selectedCampaign && selectedCampaign.id === id) {
            setSelectedCampaign(null);
          }
          fetch(`/api/campaigns/${id}`, {
            method: "DELETE",
          }).catch(console.error);
        }}
      />

      {/* Integration Credentials Modal */}
      <IntegrationModal
        isOpen={isIntegrationModalOpen}
        platform={integrationPlatform}
        onClose={() => {
          setIsIntegrationModalOpen(false);
          setIntegrationPlatform(null);
        }}
      />

      {/* Plan Switch Modal */}
      <PlanSwitchModal
        isOpen={isPlanModalOpen}
        currentPlanId={currentPlanId}
        onClose={() => setIsPlanModalOpen(false)}
        onPlanChanged={(newPlan) => setCurrentPlanId(newPlan)}
      />

      {/* Mobile Drawer Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* 1. Left Sidebar Navigation */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-72 sm:w-64 bg-card border-r border-border
          flex flex-col justify-between transition-transform duration-200 ease-in-out
          max-h-screen overflow-y-auto no-scrollbar
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static md:inset-auto md:min-h-screen
        `}
      >
        <div>
          {/* Logo & Brand Header */}
          <div className="flex items-center justify-between h-16 px-5 border-b border-border">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative flex items-center justify-center size-9 rounded-xl bg-primary text-primary-foreground font-black text-lg shadow-xs">
                A
                <span className="absolute -top-0.5 -right-0.5 size-2.5 rounded-full bg-primary border-2 border-card" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-extrabold tracking-tight text-foreground">AdPulse</span>
                <span className="text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">
                  Local Business OS
                </span>
              </div>
            </Link>
            <button
              className="md:hidden p-1.5 rounded-lg hover:bg-muted text-muted-foreground cursor-pointer"
              onClick={() => setSidebarOpen(false)}
              aria-label="Close navigation sidebar"
            >
              <X className="size-5" />
            </button>
          </div>

          {/* Business Workspace Badge */}
          <div className="p-3 border-b border-border bg-muted/30">
            <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-card border border-border text-[11px]">
              <Building2 className="size-3.5 text-primary shrink-0" />
              <div className="min-w-0">
                <span className="font-bold text-foreground block truncate">Local Business Workspace</span>
                <span className="text-[10px] text-muted-foreground block truncate font-mono">5km Local Geo-Fence</span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`
                    w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer
                    ${
                      isActive
                        ? "bg-primary text-primary-foreground shadow-xs font-bold"
                        : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="size-4 shrink-0" />
                    <span>{item.name}</span>
                  </div>
                  {item.badge ? (
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold font-mono ${
                        isActive
                          ? "bg-primary-foreground/20 text-primary-foreground"
                          : "bg-primary/10 text-primary"
                      }`}
                    >
                      {item.badge}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Profile & Theme Switcher */}
        <div className="p-4 border-t border-border space-y-3">
          <Link
            href="/"
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="size-3.5" />
            <span>Return to Public Site</span>
          </Link>

          {/* User Profile Info */}
          <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/40 border border-border/60">
            <div className="flex items-center justify-center size-8 rounded-lg bg-primary/15 text-primary font-bold text-xs shrink-0">
              AD
            </div>
            <div className="flex flex-col min-w-0 flex-1">
              <span className="text-xs font-bold truncate text-foreground">
                {workspaceProfile.businessName}
              </span>
              <span className="text-[10px] text-muted-foreground truncate">
                ₹2,499/mo Plan
              </span>
            </div>
          </div>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl border border-border text-xs font-semibold hover:bg-muted/60 transition-colors cursor-pointer"
          >
            <span className="flex items-center gap-2 text-foreground">
              {isDark ? "Dark Theme" : "Light Theme"}
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] bg-muted text-muted-foreground font-mono uppercase border border-border/40">
              {isDark ? "Dark" : "Light"}
            </span>
          </button>
        </div>
      </aside>

      {/* 2. Main Content View Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-3 sm:px-6 lg:px-8 bg-card/90 backdrop-blur-md border-b border-border">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-xl border border-border md:hidden text-foreground hover:bg-muted shrink-0 cursor-pointer"
              aria-label="Open navigation sidebar"
            >
              <Menu className="size-5" />
            </button>
            <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
              <h1 className="text-xs sm:text-base font-bold tracking-tight text-foreground capitalize flex items-center gap-1.5 sm:gap-2 truncate">
                <span className="truncate">{activeTab === "billing" ? "Billing & Spend" : activeTab.replace("-", " ")}</span>
                <span className="text-muted-foreground font-normal text-xs shrink-0">/</span>
                <span className="text-[11px] sm:text-xs px-2 py-0.5 rounded-full font-bold border bg-primary/10 text-primary border-primary/20 shrink-0 hidden sm:inline-flex">
                  Local Business OS
                </span>
              </h1>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              onClick={() => {
                setWizardMode("business");
                setIsWizardOpen(true);
              }}
              className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-2 rounded-xl bg-primary text-primary-foreground font-bold text-xs shadow-xs hover:opacity-95 transition-opacity cursor-pointer shrink-0"
            >
              <Plus className="size-4" />
              <span><span className="hidden xs:inline sm:inline">Create </span>Campaign</span>
            </button>
          </div>
        </header>

        {/* Mobile Quick Tab Navigation Bar */}
        <div className="md:hidden border-b border-border bg-card/80 backdrop-blur-md px-3 py-2 overflow-x-auto no-scrollbar flex items-center gap-1.5 shrink-0">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap flex items-center gap-1.5 shrink-0 transition-all cursor-pointer ${
                  isActive
                    ? "bg-primary text-primary-foreground font-bold shadow-xs"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                }`}
              >
                <Icon className="size-3.5 shrink-0" />
                <span>{item.name}</span>
                {item.badge && (
                  <span
                    className={`px-1.5 py-0.2 rounded-full text-[9px] font-mono font-bold ${
                      isActive ? "bg-primary-foreground/20 text-primary-foreground" : "bg-primary/10 text-primary"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Banner Notice */}
        <div className="bg-primary/10 border-b border-primary/20 px-3.5 sm:px-6 lg:px-8 py-2 flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-2 min-w-0">
            <Info className="size-4 text-primary shrink-0" />
            <span className="truncate text-[11px] sm:text-xs">
              <strong>Local Business OS:</strong> Manage 5km ad campaigns across Meta & Google with WhatsApp CRM.
            </span>
          </div>
          <span className="font-mono text-[10px] text-primary font-semibold hidden md:inline shrink-0 ml-3">
            Geo-Fence: 5km around {workspaceProfile.geoCenter}
          </span>
        </div>

        {/* MAIN BODY CONTENT */}
        <main className="flex-1 p-3.5 sm:p-6 lg:p-8 space-y-6 sm:space-y-8 w-full max-w-[1600px] 2xl:max-w-full mx-auto">
          {/* TAB 1: OVERVIEW */}
          {activeTab === "overview" && (
            <>
              {/* LOCAL BUSINESS OVERVIEW */}
              <div className="space-y-8">
                  {/* Growth Metrics Grid */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
                    <div className="p-3.5 sm:p-5 rounded-2xl border border-border bg-card shadow-xs space-y-1.5 sm:space-y-2">
                      <div className="flex items-center justify-between text-muted-foreground text-xs font-semibold">
                        <span className="truncate">Customer Inquiries</span>
                        <MessageCircle className="size-4 text-primary shrink-0" />
                      </div>
                      <div className="text-2xl sm:text-3xl font-extrabold text-foreground">{leads.length}</div>
                      <div className="text-[10px] sm:text-[11px] text-primary font-semibold flex items-center gap-1 truncate">
                        <span>Persistent in Database</span>
                      </div>
                    </div>

                    <div className="p-3.5 sm:p-5 rounded-2xl border border-border bg-card shadow-xs space-y-1.5 sm:space-y-2">
                      <div className="flex items-center justify-between text-muted-foreground text-xs font-semibold">
                        <span className="truncate">Cost Per Inquiry</span>
                        <BarChart3 className="size-4 text-primary shrink-0" />
                      </div>
                      <div className="text-2xl sm:text-3xl font-extrabold text-foreground">₹110</div>
                      <div className="text-[10px] sm:text-[11px] text-muted-foreground truncate">Average across Meta & Google</div>
                    </div>

                    <div className="p-3.5 sm:p-5 rounded-2xl border border-border bg-card shadow-xs space-y-1.5 sm:space-y-2">
                      <div className="flex items-center justify-between text-muted-foreground text-xs font-semibold">
                        <span className="truncate">Active Campaigns</span>
                        <Megaphone className="size-4 text-primary shrink-0" />
                      </div>
                      <div className="text-2xl sm:text-3xl font-extrabold text-foreground">{campaigns.length}</div>
                      <div className="text-[10px] sm:text-[11px] text-muted-foreground truncate">Stored drafts & active</div>
                    </div>

                    <div className="p-3.5 sm:p-5 rounded-2xl border border-border bg-card shadow-xs space-y-1.5 sm:space-y-2">
                      <div className="flex items-center justify-between text-muted-foreground text-xs font-semibold">
                        <span className="truncate">Converted Leads</span>
                        <CheckCircle2 className="size-4 text-primary shrink-0" />
                      </div>
                      <div className="text-2xl sm:text-3xl font-extrabold text-foreground">
                        {leads.filter((l) => l.stage === "Converted").length}
                      </div>
                      <div className="text-[10px] sm:text-[11px] text-primary font-semibold truncate">
                        CRM Pipeline Progress
                      </div>
                    </div>
                  </div>

                  {/* AI & Canva Creative Engine Quick Hub */}
                  <div className="rounded-2xl border border-border bg-card p-6 shadow-xs space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border pb-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="p-1.5 rounded-lg bg-primary/10 text-primary">
                            <Wand2 className="size-4" />
                          </span>
                          <h2 className="text-base font-bold text-foreground">AI Copy & Canva Design Studio</h2>
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          Generate high-converting local hooks with AI or customize 9:16 and 1:1 Canva ad templates in seconds.
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          setActiveTab("creatives");
                          setCreativeSubTab("ai_generator");
                        }}
                        className="text-xs font-bold text-primary hover:underline cursor-pointer flex items-center gap-1 self-start sm:self-auto"
                      >
                        Open Creative Studio →
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Card 1: AI Copy & Angle Generator */}
                      <div className="p-4 rounded-xl border border-border bg-background space-y-3 shadow-2xs flex flex-col justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-primary/10 text-primary">
                              ✨ AI Copy Engine
                            </span>
                            <span className="text-[11px] text-muted-foreground font-mono">3 Formats Ready</span>
                          </div>
                          <h3 className="text-xs font-bold text-foreground">Hyper-Local Hook & Ad Copy Generator</h3>
                          <p className="text-[11px] text-muted-foreground leading-relaxed">
                            Pre-trained on winning local offers for clinics, salons, gyms, and restaurants with 1-click WhatsApp messaging pre-configured.
                          </p>
                        </div>
                        <button
                          onClick={() => {
                            setActiveTab("creatives");
                            setCreativeSubTab("ai_generator");
                          }}
                          className="w-full py-2 px-3 rounded-lg bg-primary text-primary-foreground font-bold text-xs flex items-center justify-center gap-1.5 hover:opacity-90 transition-opacity cursor-pointer"
                        >
                          <Sparkles className="size-3.5" />
                          <span>Generate AI Copy & Hooks</span>
                        </button>
                      </div>

                      {/* Card 2: Canva Design Studio */}
                      <div className="p-4 rounded-xl border border-border bg-background space-y-3 shadow-2xs flex flex-col justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-primary/10 text-primary">
                              🎨 Canva Template Presets
                            </span>
                            <span className="text-[11px] text-muted-foreground font-mono">9:16 Reels • 1:1 Feed</span>
                          </div>
                          <h3 className="text-xs font-bold text-foreground">Launch Pre-Dimensioned Canva Canvas</h3>
                          <p className="text-[11px] text-muted-foreground leading-relaxed">
                            Open exact Meta Reels (1080×1920) or Feed (1080×1080) templates in Canva, customize your brand visual, and sync back to your campaign.
                          </p>
                        </div>
                        <button
                          onClick={() => {
                            setActiveTab("creatives");
                            setCreativeSubTab("canva_studio");
                          }}
                          className="w-full py-2 px-3 rounded-lg border border-border text-foreground hover:bg-muted font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <Layers className="size-3.5" />
                          <span>Open Canva Template Studio</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Recurring Campaigns */}
                  <div className="rounded-2xl border border-border bg-card p-6 shadow-xs space-y-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-base font-bold text-foreground">Active & Stored Campaigns</h2>
                        <p className="text-xs text-muted-foreground">Connected Meta Business Manager & Google Ads MCC</p>
                      </div>
                      <button
                        onClick={() => {
                          setWizardMode("business");
                          setIsWizardOpen(true);
                        }}
                        className="text-xs font-bold text-primary hover:underline cursor-pointer"
                      >
                        + Create Campaign →
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {campaigns.map((cmp) => (
                        <div
                          key={cmp.id}
                          onClick={() => {
                            setSelectedCampaign(cmp);
                            setIsCampaignDetailsOpen(true);
                          }}
                          className="p-4 rounded-xl border border-border bg-background hover:border-primary/60 transition-all cursor-pointer space-y-3 shadow-2xs"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              {cmp.channel.includes("Instagram") ? <InstagramIcon /> : <Search className="size-4 text-primary" />}
                              <span className="text-xs font-bold text-foreground">{cmp.name}</span>
                            </div>
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                cmp.status === "Active"
                                    ? "bg-primary/10 text-primary"
                                    : "bg-muted text-muted-foreground"
                              }`}
                            >
                              {cmp.status}
                            </span>
                          </div>

                          <div className="text-xs text-muted-foreground flex justify-between pt-1 border-t border-border/50">
                            <span>Budget: <strong>{cmp.budget}</strong></span>
                            <span>Inquiries: <strong className="text-foreground">{cmp.inquiries}</strong></span>
                            <span>CPI: <strong>{cmp.cpi}</strong></span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Connected Accounts & CRM Inquiries */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 rounded-2xl border border-border bg-card p-6 shadow-xs space-y-4">
                      <div className="flex items-center justify-between">
                        <h2 className="text-base font-bold text-foreground">Recent Inquiries Needing Follow-up</h2>
                        <button onClick={() => setActiveTab("leads")} className="text-xs font-semibold text-primary hover:underline cursor-pointer">
                          Open CRM Workspace →
                        </button>
                      </div>

                      <div className="space-y-3">
                        {leads.slice(0, 3).map((lead) => (
                          <div
                            key={lead.id}
                            onClick={() => {
                              setSelectedLead(lead);
                              setActiveTab("leads");
                            }}
                            className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl border border-border bg-background hover:border-primary/60 transition-all cursor-pointer shadow-2xs"
                          >
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-xs text-foreground">{lead.name}</span>
                                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-muted text-muted-foreground">{lead.stage}</span>
                                {lead.isSample ? (
                                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground font-mono">Demo</span>
                                ) : (
                                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-primary/10 text-primary font-mono font-bold">Real</span>
                                )}
                              </div>
                              <div className="text-xs text-muted-foreground">{lead.phone} • {lead.interest}</div>
                            </div>
                            <a
                              href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, "")}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="px-3.5 py-1.5 rounded-lg bg-primary hover:opacity-90 text-primary-foreground font-bold text-xs flex items-center gap-1.5 transition-colors self-start sm:self-center"
                            >
                              <MessageCircle className="size-3.5" /> WhatsApp
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-2xl border border-border bg-card p-6 shadow-xs space-y-4">
                      <h2 className="text-base font-bold text-foreground">Platform Connection Status</h2>
                      <div className="space-y-3 text-xs">
                        <div className="p-3.5 rounded-xl border border-border bg-background space-y-1">
                          <div className="flex items-center justify-between font-bold">
                            <span>Meta Business Manager</span>
                            <span className="text-[10px] text-muted-foreground font-mono">Pending OAuth</span>
                          </div>
                          <p className="text-[11px] text-muted-foreground">Awaiting Meta Graph API OAuth connection.</p>
                        </div>

                        <div className="p-3.5 rounded-xl border border-border bg-background space-y-1">
                          <div className="flex items-center justify-between font-bold">
                            <span>Google Ads Account</span>
                            <span className="text-[10px] text-muted-foreground font-mono">Pending OAuth</span>
                          </div>
                          <p className="text-[11px] text-muted-foreground">Awaiting Google Ads OAuth connection.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
            </>
          )}

          {/* TAB 2: LEADS & CRM WORKSPACE (PHASE 2C FUNCTIONAL CRM) */}
          {activeTab === "leads" && (
            <div className="space-y-5 sm:space-y-6">
              {/* Controls Bar */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4 bg-card p-3.5 sm:p-4 rounded-2xl border border-border">
                <div className="relative flex-1">
                  <Search className="absolute left-3.5 top-2.5 size-4 text-muted-foreground" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search inquiries by customer name, phone, or interest..."
                    className="w-full pl-10 pr-4 py-2 rounded-xl border border-border bg-background text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                  {/* Real vs Demo Filter */}
                  <select
                    value={leadRecordType}
                    onChange={(e) => setLeadRecordType(e.target.value as any)}
                    className="flex-1 sm:flex-initial px-3 py-2 rounded-xl border border-border bg-background text-xs font-semibold text-foreground focus:outline-none"
                  >
                    <option value="all">All Records ({leads.length})</option>
                    <option value="active">Active Real Leads ({leads.filter((l) => !l.isSample).length})</option>
                    <option value="sample">Demo Samples ({leads.filter((l) => l.isSample).length})</option>
                  </select>

                  <select
                    value={stageFilter}
                    onChange={(e) => setStageFilter(e.target.value)}
                    className="flex-1 sm:flex-initial px-3 py-2 rounded-xl border border-border bg-background text-xs text-foreground focus:outline-none"
                  >
                    <option value="all">All Stages</option>
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Qualified">Qualified</option>
                    <option value="Converted">Converted</option>
                    <option value="Lost">Lost</option>
                  </select>

                  <button
                    onClick={() => setIsNewLeadModalOpen(true)}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-primary text-primary-foreground font-bold text-xs shadow-xs hover:opacity-95 cursor-pointer"
                  >
                    <UserPlus className="size-3.5" />
                    <span>+ Add Inquiry</span>
                  </button>
                </div>
              </div>

              {/* KANBAN BOARD */}
              <div className="text-[11px] text-muted-foreground flex items-center justify-between md:hidden font-mono px-1">
                <span>6 CRM Stages</span>
                <span>← Swipe to explore pipeline →</span>
              </div>
              <div className="flex overflow-x-auto md:grid md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 pb-4 snap-x no-scrollbar -mx-1 px-1 sm:mx-0 sm:px-0">
                {(["New", "Contacted", "Qualified", "Converted", "Lost", "Invalid"] as const).map((stage) => {
                  const stageLeads = filteredLeads.filter((l) => l.stage === stage);
                  return (
                    <div key={stage} className="p-3.5 sm:p-4 rounded-2xl border border-border bg-card min-w-[270px] sm:min-w-[280px] md:min-w-0 snap-start shrink-0 md:shrink space-y-3 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between border-b border-border pb-2.5 text-xs font-bold text-foreground">
                          <span>{stage}</span>
                          <span className="px-2 py-0.5 rounded-full bg-muted text-muted-foreground font-mono text-[10px]">
                            {stageLeads.length}
                          </span>
                        </div>

                        <div className="space-y-3 pt-3">
                          {stageLeads.length === 0 ? (
                            <div className="py-8 text-center text-muted-foreground text-[11px] italic">No inquiries in {stage}</div>
                          ) : (
                            stageLeads.map((lead) => (
                              <div
                                key={lead.id}
                                onClick={() => setSelectedLead(lead)}
                                className="p-3.5 rounded-xl border border-border bg-background hover:border-primary/60 transition-all cursor-pointer space-y-2 shadow-2xs"
                              >
                                <div className="flex justify-between items-start">
                                  <div className="font-bold text-xs text-foreground">{lead.name}</div>
                                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
                                    {lead.createdAt}
                                  </span>
                                </div>
                                <div className="text-[11px] text-muted-foreground font-mono">{lead.phone}</div>
                                <div className="text-[10px] text-foreground font-medium">{lead.interest}</div>

                                {lead.isSample ? (
                                  <span className="text-[9px] px-1 py-0.5 rounded bg-muted text-muted-foreground font-mono block w-fit">
                                    Demo Sample
                                  </span>
                                ) : (
                                  <span className="text-[9px] px-1 py-0.5 rounded bg-primary/10 text-primary font-mono font-bold block w-fit">
                                    Persistent Record
                                  </span>
                                )}

                                <div className="pt-2 border-t border-border flex items-center justify-between gap-1.5">
                                  <a
                                    href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, "")}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                    className="flex-1 py-1 rounded-lg bg-primary hover:opacity-90 text-primary-foreground font-bold text-[10px] flex items-center justify-center gap-1 transition-colors"
                                  >
                                    <MessageCircle className="size-3" /> WhatsApp
                                  </a>
                                </div>
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* LEAD DRAWER */}
              {selectedLead && (
                <div className="fixed inset-y-0 right-0 z-50 w-full sm:max-w-md bg-card border-l border-border p-4 sm:p-6 shadow-2xl flex flex-col justify-between overflow-y-auto">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between border-b border-border pb-4">
                      <div>
                        <h3 className="text-base font-bold text-foreground">{selectedLead.name}</h3>
                        <span className="text-xs text-muted-foreground font-mono">{selectedLead.id}</span>
                      </div>
                      <button onClick={() => setSelectedLead(null)} className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground">
                        <X className="size-5" />
                      </button>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Lead Stage</label>
                      <select
                        value={selectedLead.stage}
                        onChange={(e) => updateLeadStage(selectedLead.id, e.target.value as Lead["stage"])}
                        className="w-full px-3 py-2 rounded-xl border border-border bg-background text-xs font-bold text-foreground focus:outline-primary"
                      >
                        <option value="New">1. New</option>
                        <option value="Contacted">2. Contacted</option>
                        <option value="Qualified">3. Qualified</option>
                        <option value="Converted">4. Converted</option>
                        <option value="Lost">5. Lost</option>
                        <option value="Invalid">6. Invalid</option>
                      </select>
                    </div>

                    <div className="p-4 rounded-xl border border-border bg-background space-y-2 text-xs">
                      <div className="flex justify-between"><span className="text-muted-foreground">Phone:</span> <strong className="font-mono">{selectedLead.phone}</strong></div>
                      <div className="flex justify-between"><span className="text-muted-foreground">Source:</span> <strong className="text-primary">{selectedLead.source}</strong></div>
                      <div className="flex justify-between"><span className="text-muted-foreground">Interest:</span> <strong>{selectedLead.interest}</strong></div>
                      {selectedLead.notes && (
                        <div className="pt-2 border-t border-border">
                          <span className="text-muted-foreground block text-[11px]">Notes:</span>
                          <p className="italic text-foreground mt-0.5">&ldquo;{selectedLead.notes}&rdquo;</p>
                        </div>
                      )}
                    </div>

                    {/* Timeline Activity */}
                    <div className="space-y-2">
                      <div className="font-bold text-xs text-foreground">Chronological Timeline</div>
                      <div className="space-y-2 text-[11px] border-l-2 border-primary/40 pl-3">
                        {selectedLead.timeline?.map((ev, idx) => (
                          <div key={idx} className="space-y-0.5">
                            <span className="text-muted-foreground font-mono text-[10px]">{ev.time}</span>
                            <div className="text-foreground">{ev.action}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Add Consultation Note Form */}
                    <form onSubmit={handleAddLeadNote} className="space-y-2 pt-2 border-t border-border">
                      <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">
                        Add Consultation / Activity Note
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="e.g. Quoted ₹4,500, follow-up Saturday..."
                          value={newLeadNote}
                          onChange={(e) => setNewLeadNote(e.target.value)}
                          className="flex-1 p-2 rounded-xl border border-border bg-background text-xs text-foreground focus:outline-primary"
                        />
                        <button
                          type="submit"
                          disabled={isSavingNote || !newLeadNote.trim()}
                          className="px-3.5 py-2 rounded-xl bg-primary text-primary-foreground font-bold text-xs shadow-xs hover:opacity-95 disabled:opacity-50 cursor-pointer shrink-0"
                        >
                          {isSavingNote ? "..." : "Add"}
                        </button>
                      </div>
                    </form>
                  </div>

                  <div className="pt-4 border-t border-border">
                    <a
                      href={`https://wa.me/${selectedLead.phone.replace(/[^0-9]/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 rounded-xl bg-primary hover:opacity-90 text-primary-foreground font-bold text-xs text-center flex items-center justify-center gap-2"
                    >
                      <MessageCircle className="size-4" /> Open WhatsApp Conversation
                    </a>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: CAMPAIGNS (PHASE 2B & 2C CAMPAIGN MANAGEMENT) */}
          {activeTab === "campaigns" && (
            <div className="rounded-2xl border border-border bg-card p-6 shadow-xs space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base font-bold text-foreground">
                    Local Ad Campaigns
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    Persistent 5km Meta Ads & Google Ads local campaigns
                  </p>
                </div>
                <button
                  onClick={() => {
                    setWizardMode("business");
                    setIsWizardOpen(true);
                  }}
                  className="px-4 py-2 rounded-xl bg-primary text-primary-foreground font-bold text-xs cursor-pointer shadow-xs"
                >
                  + Launch New Campaign
                </button>
              </div>

              <div className="space-y-4">
                {campaigns.length === 0 ? (
                  <div className="py-12 px-6 rounded-2xl border border-dashed border-border text-center space-y-4 bg-muted/20">
                    <div className="size-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto">
                      <Megaphone className="size-6" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-bold text-sm text-foreground">No Campaigns Active Yet</h3>
                      <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                        Launch a recurring local business campaign to generate continuous customer inquiries across Meta and Google within 5km.
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setWizardMode("business");
                        setIsWizardOpen(true);
                      }}
                      className="px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-bold text-xs shadow-xs hover:opacity-95 cursor-pointer"
                    >
                      + Create Your First Campaign
                    </button>
                  </div>
                ) : (
                  campaigns.map((cmp) => (
                    <div
                      key={cmp.id}
                      onClick={() => {
                        setSelectedCampaign(cmp);
                        setIsCampaignDetailsOpen(true);
                      }}
                      className="p-4 rounded-xl border border-border bg-background hover:border-primary/60 transition-all cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-2xs"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs text-foreground">{cmp.name}</span>
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              cmp.status === "Active"
                                ? "bg-primary/10 text-primary"
                                : cmp.status === "Draft"
                                ? "bg-muted text-muted-foreground font-mono"
                                : "bg-muted text-muted-foreground"
                            }`}
                          >
                            {cmp.status}
                          </span>
                        </div>
                        <div className="text-xs text-muted-foreground">{cmp.channel} • Budget: {cmp.budget}</div>
                        {cmp.statusMessage && (
                          <div className="text-[11px] text-primary/80 font-mono">
                            ℹ {cmp.statusMessage}
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-4 sm:gap-6 text-xs">
                        <div><span className="text-muted-foreground block text-[10px]">Inquiries</span><strong className="text-foreground">{cmp.inquiries}</strong></div>
                        <div><span className="text-muted-foreground block text-[10px]">Cost/Inquiry</span><strong className="text-foreground">{cmp.cpi}</strong></div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedCampaign(cmp);
                            setIsCampaignDetailsOpen(true);
                          }}
                          className="px-3 py-1.5 rounded-lg border border-border text-xs font-semibold hover:bg-muted cursor-pointer flex items-center gap-1"
                        >
                          <ExternalLink className="size-3" />
                          <span>Details</span>
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            const newStatus = cmp.status === "Active" ? "Paused" : "Active";
                            setCampaigns((prev) =>
                              prev.map((c) =>
                                c.id === cmp.id ? { ...c, status: newStatus } : c
                              )
                            );
                            fetch(`/api/campaigns/${cmp.id}`, {
                              method: "PATCH",
                              headers: { "Content-Type": "application/json" },
                              body: JSON.stringify({ status: newStatus }),
                            }).catch(console.error);
                          }}
                          className="px-3 py-1.5 rounded-lg border border-border text-xs font-semibold hover:bg-muted cursor-pointer"
                        >
                          {cmp.status === "Active" ? "Pause" : "Resume"}
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* TAB 4: CREATIVES */}
          {activeTab === "creatives" && (
            <div className="space-y-6">
              {/* Header with Title and Mode Switcher */}
              <div className="rounded-2xl border border-border bg-card p-6 shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="p-1.5 rounded-lg bg-primary/10 text-primary">
                        <Wand2 className="size-5" />
                      </span>
                      <h2 className="text-lg font-extrabold text-foreground">
                        AI Creative Engine & Canva Studio
                      </h2>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Craft localized ad copy with AI, customize pre-formatted 9:16 and 1:1 Canva templates, or test native device previews.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setWizardMode("business");
                        setIsWizardOpen(true);
                      }}
                      className="px-4 py-2 rounded-xl bg-primary text-primary-foreground font-bold text-xs shadow-xs hover:opacity-95 cursor-pointer flex items-center gap-1.5"
                    >
                      <span>+ Launch Campaign</span>
                    </button>
                  </div>
                </div>

                {/* 4-SubTab Navigation Bar */}
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => setCreativeSubTab("ai_generator")}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                      creativeSubTab === "ai_generator"
                        ? "bg-primary text-primary-foreground shadow-2xs"
                        : "border border-border text-foreground hover:bg-muted"
                    }`}
                  >
                    <Sparkles className="size-3.5" />
                    <span>AI Copy Generator</span>
                  </button>

                  <button
                    onClick={() => setCreativeSubTab("canva_studio")}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                      creativeSubTab === "canva_studio"
                        ? "bg-primary text-primary-foreground shadow-2xs"
                        : "border border-border text-foreground hover:bg-muted"
                    }`}
                  >
                    <Layers className="size-3.5" />
                    <span>Canva Design Studio</span>
                  </button>

                  <button
                    onClick={() => setCreativeSubTab("preview")}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                      creativeSubTab === "preview"
                        ? "bg-primary text-primary-foreground shadow-2xs"
                        : "border border-border text-foreground hover:bg-muted"
                    }`}
                  >
                    <Eye className="size-3.5" />
                    <span>Native Ad Preview</span>
                  </button>

                  <button
                    onClick={() => setCreativeSubTab("library")}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                      creativeSubTab === "library"
                        ? "bg-primary text-primary-foreground shadow-2xs"
                        : "border border-border text-foreground hover:bg-muted"
                    }`}
                  >
                    <Share2 className="size-3.5" />
                    <span>Saved Creatives</span>
                    <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-primary/20 text-foreground font-mono">
                      {savedCreativesList.length}
                    </span>
                  </button>
                </div>
              </div>

              {/* SUBVIEW 1: AI COPY GENERATOR */}
              {creativeSubTab === "ai_generator" && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Left Form: Parameters & Controls */}
                  <div className="lg:col-span-1 rounded-2xl border border-border bg-card p-6 shadow-xs space-y-5 text-xs">
                    <div>
                      <h3 className="font-bold text-foreground text-sm">Target Offer Parameters</h3>
                      <p className="text-muted-foreground text-[11px] mt-0.5">
                        Tell the AI what you want to promote within your 5km radius.
                      </p>
                    </div>

                    {/* Industry Selector */}
                    <div className="space-y-2">
                      <label className="font-bold text-foreground block text-[11px] uppercase tracking-wider">
                        Business Industry
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { id: "dental", name: "Dental Clinic" },
                          { id: "salon", name: "Salon & Spa" },
                          { id: "gym", name: "Gym & Fitness" },
                          { id: "restaurant", name: "Restaurant" },
                        ].map((ind) => (
                          <button
                            key={ind.id}
                            type="button"
                            onClick={() => setAiIndustry(ind.id)}
                            className={`p-2.5 rounded-xl border text-left text-xs font-semibold transition-all cursor-pointer ${
                              aiIndustry === ind.id
                                ? "border-primary bg-primary/10 text-primary font-bold shadow-2xs"
                                : "border-border text-foreground hover:bg-muted"
                            }`}
                          >
                            {ind.name}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Tone Selector */}
                    <div className="space-y-2">
                      <label className="font-bold text-foreground block text-[11px] uppercase tracking-wider">
                        Campaign Angle Tone
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { id: "urgent", name: "High Urgency" },
                          { id: "friendly", name: "Neighborhood Friendly" },
                          { id: "discount", name: "Special Offer" },
                          { id: "premium", name: "Luxury & Quality" },
                        ].map((t) => (
                          <button
                            key={t.id}
                            type="button"
                            onClick={() => setAiTone(t.id)}
                            className={`p-2.5 rounded-xl border text-left text-xs font-semibold transition-all cursor-pointer ${
                              aiTone === t.id
                                ? "border-primary bg-primary/10 text-primary font-bold shadow-2xs"
                                : "border-border text-foreground hover:bg-muted"
                            }`}
                          >
                            {t.name}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Custom Offer Text */}
                    <div className="space-y-1.5">
                      <label className="font-bold text-foreground block text-[11px] uppercase tracking-wider">
                        Specific Offer or Discount
                      </label>
                      <input
                        type="text"
                        value={aiOfferDetails}
                        onChange={(e) => setAiOfferDetails(e.target.value)}
                        placeholder="e.g. Free First Checkup or 30% Off"
                        className="w-full p-2.5 rounded-xl border border-border bg-background text-foreground text-xs focus:outline-primary"
                      />
                    </div>

                    {/* Location Scope Indicator */}
                    <div className="p-3 rounded-xl bg-muted/40 border border-border text-[11px] text-muted-foreground space-y-1">
                      <div className="font-bold text-foreground flex items-center gap-1.5">
                        <MapPin className="size-3 text-primary" />
                        <span>Geo-Locked Audience:</span>
                      </div>
                      <p>
                        Targeting 5km radius centered around <strong>{workspaceProfile.geoCenter}</strong>
                      </p>
                    </div>

                    {/* Generate Button */}
                    <button
                      onClick={handleGenerateAiCopy}
                      disabled={isGeneratingAi}
                      className="w-full py-3 px-4 rounded-xl bg-primary text-primary-foreground font-bold text-xs flex items-center justify-center gap-2 shadow-xs hover:opacity-90 disabled:opacity-50 cursor-pointer transition-all"
                    >
                      {isGeneratingAi ? (
                        <>
                          <Loader2 className="size-4 animate-spin" />
                          <span>Generating Local Angles...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="size-4" />
                          <span>Generate 3 Local Ad Angles</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Right Column: AI Generated Angle Cards */}
                  <div className="lg:col-span-2 space-y-4">
                    <div className="flex items-center justify-between text-xs">
                      <div>
                        <h3 className="font-bold text-foreground text-sm">Generated Angle Variations</h3>
                        <p className="text-muted-foreground text-[11px]">
                          Tailored for high Click-to-WhatsApp conversion within your 5km local radius.
                        </p>
                      </div>
                      <span className="text-[11px] font-mono text-muted-foreground">
                        {aiGeneratedVariations.length} angles ready
                      </span>
                    </div>

                    <div className="space-y-4">
                      {aiGeneratedVariations.map((v) => (
                        <div
                          key={v.id}
                          className="rounded-2xl border border-border bg-card p-5 shadow-xs space-y-4 transition-all hover:border-primary/60"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/60 pb-3">
                            <div className="flex items-center gap-2">
                              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-primary/10 text-primary">
                                {v.tag}
                              </span>
                              <span className="text-xs font-extrabold text-foreground">{v.title}</span>
                            </div>
                            <button
                              onClick={() => handleCopyVariation(`${v.headline}\n\n${v.body}`, v.id)}
                              className="text-xs font-semibold text-muted-foreground hover:text-foreground flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
                            >
                              {copiedVarId === v.id ? (
                                <>
                                  <CheckCircle2 className="size-3.5 text-primary" />
                                  <span className="text-primary font-bold">Copied!</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="size-3.5" />
                                  <span>Copy Text</span>
                                </>
                              )}
                            </button>
                          </div>

                          <div className="space-y-2">
                            <div>
                              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">
                                Headline / Hook:
                              </span>
                              <p className="text-sm font-bold text-foreground mt-0.5">{v.headline}</p>
                            </div>

                            <div>
                              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">
                                Primary Text:
                              </span>
                              <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">{v.body}</p>
                            </div>

                            <div className="p-3 rounded-xl bg-background border border-border/70 space-y-1">
                              <span className="text-[10px] font-bold text-foreground flex items-center gap-1">
                                <MessageCircle className="size-3 text-primary" />
                                Pre-Configured WhatsApp Reply:
                              </span>
                              <p className="text-[11px] text-muted-foreground font-mono italic">
                                &ldquo;{v.whatsappText}&rdquo;
                              </p>
                            </div>
                          </div>

                          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-border/60">
                            <button
                              onClick={() => {
                                setCreativeCustomHeadline(v.headline);
                                setCreativeFormat(v.format as any);
                                setCreativeSubTab("preview");
                              }}
                              className="px-3.5 py-1.5 rounded-lg bg-primary text-primary-foreground font-bold text-xs flex items-center gap-1.5 hover:opacity-90 cursor-pointer"
                            >
                              <Eye className="size-3.5" />
                              <span>Test in Live Mockup</span>
                            </button>

                            <button
                              onClick={() => {
                                setCreativeCustomHeadline(v.headline);
                                setWizardMode("business");
                                setIsWizardOpen(true);
                              }}
                              className="px-3.5 py-1.5 rounded-lg border border-border text-foreground hover:bg-muted font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                            >
                              <Megaphone className="size-3.5" />
                              <span>Use in Campaign Wizard</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* SUBVIEW 2: CANVA DESIGN STUDIO */}
              {creativeSubTab === "canva_studio" && (
                <div className="space-y-6">
                  {/* Canva Workflow Explainer */}
                  <div className="rounded-2xl border border-border bg-card p-6 shadow-xs space-y-3">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="space-y-1">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-primary/10 text-primary uppercase tracking-wider">
                          Canva Integration Workflow
                        </span>
                        <h3 className="text-base font-bold text-foreground">
                          Design in Canva, Launch with 5km Geo-Targeting in AdPulse
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          Choose a pre-dimensioned template below to edit your visuals in Canva. Once finished, upload the export to link directly with your campaign.
                        </p>
                      </div>

                      <a
                        href="https://www.canva.com/create/instagram-reels/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2.5 rounded-xl bg-primary text-primary-foreground font-bold text-xs flex items-center gap-2 shadow-xs hover:opacity-90 shrink-0 self-start md:self-center"
                      >
                        <Layers className="size-4" />
                        <span>Open Canva Editor in New Tab</span>
                      </a>
                    </div>
                  </div>

                  {/* Canva Template Presets Grid */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-foreground uppercase tracking-wider">
                        Pre-Configured Canva Template Presets
                      </h4>
                      <span className="text-[11px] text-muted-foreground font-mono">
                        {canvaPresets.length} Template Presets
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {canvaPresets.map((preset) => (
                        <div
                          key={preset.id}
                          className="rounded-2xl border border-border bg-card p-5 shadow-xs flex flex-col justify-between space-y-4 hover:border-primary/60 transition-all"
                        >
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-primary/10 text-primary font-mono">
                                {preset.badge}
                              </span>
                              <span className="text-[10px] text-muted-foreground font-mono">
                                {preset.dimensions}
                              </span>
                            </div>

                            <div>
                              <h5 className="text-xs font-bold text-foreground">{preset.name}</h5>
                              <p className="text-[11px] text-muted-foreground mt-0.5">{preset.industry}</p>
                            </div>

                            <div className="p-2.5 rounded-xl bg-background border border-border/70 text-[11px]">
                              <span className="text-[9px] uppercase font-bold text-muted-foreground block">
                                Recommended Headline:
                              </span>
                              <p className="font-semibold text-foreground mt-0.5 truncate">{preset.headline}</p>
                            </div>
                          </div>

                          <div className="space-y-2 pt-2 border-t border-border/60">
                            <a
                              href={preset.canvaUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-full py-2 px-3 rounded-lg bg-primary text-primary-foreground font-bold text-xs flex items-center justify-center gap-1.5 hover:opacity-90 transition-opacity"
                            >
                              <Layers className="size-3.5" />
                              <span>Open in Canva</span>
                            </a>

                            <button
                              onClick={() => {
                                setCreativeCustomHeadline(preset.headline);
                                if (preset.format.includes("Reel") || preset.format.includes("Story")) {
                                  setCreativeFormat("reel");
                                } else if (preset.format.includes("Feed")) {
                                  setCreativeFormat("feed");
                                } else {
                                  setCreativeFormat("search");
                                }
                                setCreativeSubTab("preview");
                              }}
                              className="w-full py-2 px-3 rounded-lg border border-border text-foreground hover:bg-muted font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                            >
                              <Eye className="size-3.5" />
                              <span>Apply to Mockup</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Canva Export Upload & Sync Area */}
                  <div className="rounded-2xl border border-border bg-card p-6 shadow-xs space-y-4">
                    <div>
                      <h4 className="text-xs font-bold text-foreground uppercase tracking-wider">
                        Import Canva Exported Graphic
                      </h4>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Download your high-resolution banner or video from Canva, then import it directly into your AdPulse media repository.
                      </p>
                    </div>

                    <div className="p-8 rounded-xl border-2 border-dashed border-border bg-background flex flex-col items-center justify-center text-center space-y-3">
                      <div className="size-12 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                        <UploadCloud className="size-6" />
                      </div>
                      <div className="space-y-1">
                        <div className="text-xs font-bold text-foreground">
                          Drag and drop Canva MP4 / PNG / JPG export
                        </div>
                        <div className="text-[11px] text-muted-foreground">
                          Supports 1080×1920 (Reels) or 1080×1080 (Square) up to 50MB
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          setCanvaImportStatus("Canva design successfully verified and attached to active campaign drafts!");
                          setTimeout(() => setCanvaImportStatus(null), 5000);
                        }}
                        className="py-2 px-4 rounded-xl bg-primary text-primary-foreground font-bold text-xs hover:opacity-90 cursor-pointer flex items-center gap-1.5 transition-opacity"
                      >
                        <UploadCloud className="size-3.5" />
                        <span>Simulate Canva Asset Upload</span>
                      </button>
                    </div>

                    {canvaImportStatus && (
                      <div className="p-3.5 rounded-xl bg-primary/10 border border-primary/20 text-xs font-bold text-primary flex items-center gap-2">
                        <CheckCircle2 className="size-4 shrink-0" />
                        <span>{canvaImportStatus}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* SUBVIEW 3: NATIVE AD DEVICE PREVIEW */}
              {creativeSubTab === "preview" && (
                <div className="rounded-2xl border border-border bg-card p-6 shadow-xs space-y-6 text-xs">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border pb-4">
                    <div>
                      <h3 className="text-base font-bold text-foreground">Native Device Ad Simulator</h3>
                      <p className="text-xs text-muted-foreground">
                        Preview how your headline, business name, and Click-to-WhatsApp actions appear across customer devices.
                      </p>
                    </div>

                    {/* Format Switcher */}
                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        onClick={() => setCreativeFormat("reel")}
                        className={`px-3.5 py-2 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer ${
                          creativeFormat === "reel"
                            ? "bg-primary text-primary-foreground shadow-2xs"
                            : "border border-border text-foreground hover:bg-muted"
                        }`}
                      >
                        <InstagramIcon className="size-3.5" />
                        <span>Instagram Reel (9:16)</span>
                      </button>

                      <button
                        onClick={() => setCreativeFormat("feed")}
                        className={`px-3.5 py-2 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer ${
                          creativeFormat === "feed"
                            ? "bg-primary text-primary-foreground shadow-2xs"
                            : "border border-border text-foreground hover:bg-muted"
                        }`}
                      >
                        <FacebookIcon className="size-3.5" />
                        <span>Meta Feed (1:1)</span>
                      </button>

                      <button
                        onClick={() => setCreativeFormat("search")}
                        className={`px-3.5 py-2 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer ${
                          creativeFormat === "search"
                            ? "bg-primary text-primary-foreground shadow-2xs"
                            : "border border-border text-foreground hover:bg-muted"
                        }`}
                      >
                        <Search className="size-3.5" />
                        <span>Google Search & Call</span>
                      </button>
                    </div>
                  </div>

                  {/* Interactive Customizer & Preview Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                    <div className="p-5 rounded-2xl border border-border bg-background space-y-4">
                      <span className="font-bold text-foreground uppercase tracking-wider text-[10px] block">
                        Live Parameter Testing
                      </span>

                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-muted-foreground">Promotion Headline / Hook</label>
                        <input
                          type="text"
                          value={creativeCustomHeadline}
                          onChange={(e) => setCreativeCustomHeadline(e.target.value)}
                          placeholder="e.g. Pain-Free Root Canal Special"
                          className="w-full p-2.5 rounded-xl border border-border bg-card text-foreground focus:outline-primary"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-muted-foreground">Target Business & Neighborhood</label>
                        <div className="p-2.5 rounded-xl border border-border bg-muted/40 text-muted-foreground font-medium">
                          {workspaceProfile.businessName} • {workspaceProfile.geoCenter} (5km)
                        </div>
                      </div>

                      <div className="p-3.5 rounded-xl bg-primary/5 border border-primary/20 text-[11px] text-primary space-y-1">
                        <strong>Compliance Guarantee:</strong> AdPulse automatically formats callouts and aspect ratios, ensuring zero rejections by Meta or Google policy filters.
                      </div>
                    </div>

                    {/* Live Preview Display */}
                    <div className="p-5 rounded-2xl border border-border bg-background space-y-3">
                      <span className="font-bold text-foreground uppercase tracking-wider text-[10px] block">
                        Real-time Native Simulation
                      </span>

                      {creativeFormat === "reel" && (
                        <div className="max-w-[260px] mx-auto aspect-9/16 rounded-2xl bg-zinc-950 text-white p-4 flex flex-col justify-between border border-border relative overflow-hidden shadow-xl">
                          <div className="flex justify-between items-center text-[10px] text-white/70">
                            <span>Reels</span>
                            <Play className="size-3 fill-current" />
                          </div>

                          <div className="space-y-2 text-center py-6">
                            <div className="size-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center mx-auto border border-white/20">
                              <Play className="size-5 fill-white text-white translate-x-0.5" />
                            </div>
                            <div className="text-xs font-black leading-tight text-white px-2">
                              {creativeCustomHeadline || "Your Offer Headline"}
                            </div>
                            <div className="text-[10px] text-white/80">
                              {workspaceProfile.businessName}
                            </div>
                          </div>

                          <div className="space-y-2">
                            <div className="p-2 rounded-xl bg-primary text-primary-foreground font-bold text-[10px] text-center flex items-center justify-center gap-1">
                              <MessageCircle className="size-3" /> Send WhatsApp Message
                            </div>
                            <div className="text-[9px] text-white/60 text-center font-mono">
                              Sponsored • Within 5km of {workspaceProfile.geoCenter.split(",")[0]}
                            </div>
                          </div>
                        </div>
                      )}

                      {creativeFormat === "feed" && (
                        <div className="max-w-xs mx-auto rounded-2xl bg-card border border-border p-4 space-y-3 shadow-md">
                          <div className="flex items-center gap-2">
                            <div className="size-7 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary text-[10px]">
                              {workspaceProfile.businessName.charAt(0)}
                            </div>
                            <div>
                              <div className="font-bold text-xs text-foreground">{workspaceProfile.businessName}</div>
                              <div className="text-[9px] text-muted-foreground">Sponsored • 5km Local Feed</div>
                            </div>
                          </div>

                          <div className="aspect-square rounded-xl bg-muted border border-border flex items-center justify-center p-4 text-center">
                            <div className="space-y-1">
                              <Sparkles className="size-6 text-primary mx-auto mb-1" />
                              <div className="font-extrabold text-sm text-foreground">
                                {creativeCustomHeadline || "Your Offer Headline"}
                              </div>
                              <div className="text-[11px] text-muted-foreground">Direct Appointment Inquiries</div>
                            </div>
                          </div>

                          <div className="p-2 rounded-xl bg-primary text-primary-foreground font-bold text-[10px] text-center flex items-center justify-center gap-1">
                            <MessageCircle className="size-3" /> WhatsApp Consultation
                          </div>
                        </div>
                      )}

                      {creativeFormat === "search" && (
                        <div className="p-4 rounded-xl border border-border bg-card space-y-2">
                          <div className="text-[10px] text-muted-foreground flex items-center gap-1">
                            <strong className="text-foreground">Sponsored</strong> • local.adpulse.app
                          </div>
                          <div className="text-sm font-bold text-primary hover:underline cursor-pointer">
                            {creativeCustomHeadline || "Your Offer Headline"}
                          </div>
                          <div className="text-xs text-muted-foreground leading-relaxed">
                            Book direct consultation at {workspaceProfile.businessName}. Immediate chat on WhatsApp. 5km local service.
                          </div>
                          <div className="pt-2 flex items-center gap-2">
                            <span className="px-2.5 py-1 rounded-lg bg-primary/10 text-primary font-bold text-[10px] flex items-center gap-1">
                              <Phone className="size-3" /> Call {workspaceProfile.contactPhone}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* SUBVIEW 4: SAVED CREATIVE LIBRARY */}
              {creativeSubTab === "library" && (
                <div className="rounded-2xl border border-border bg-card p-6 shadow-xs space-y-4 text-xs">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border pb-4">
                    <div>
                      <h3 className="text-base font-bold text-foreground">Saved Creative Assets</h3>
                      <p className="text-xs text-muted-foreground">
                        Your library of AI-generated copies and imported Canva templates.
                      </p>
                    </div>
                    <button
                      onClick={() => setCreativeSubTab("ai_generator")}
                      className="px-3.5 py-1.5 rounded-lg bg-primary text-primary-foreground font-bold text-xs self-start sm:self-auto cursor-pointer"
                    >
                      + Generate New Angle
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {savedCreativesList.map((item) => (
                      <div
                        key={item.id}
                        className="p-4 rounded-xl border border-border bg-background space-y-3 shadow-2xs hover:border-primary/60 transition-all flex flex-col justify-between"
                      >
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-primary/10 text-primary font-mono">
                              {item.source}
                            </span>
                            <span className="text-[10px] text-muted-foreground font-mono">{item.updatedAt}</span>
                          </div>
                          <h4 className="text-xs font-bold text-foreground">{item.title}</h4>
                          <p className="text-[11px] text-muted-foreground">{item.channel}</p>
                          <div className="text-[10px] font-semibold text-primary">
                            Status: {item.status}
                          </div>
                        </div>

                        <div className="flex items-center gap-2 pt-2 border-t border-border/60">
                          <button
                            onClick={() => {
                              setCreativeCustomHeadline(item.title);
                              setCreativeSubTab("preview");
                            }}
                            className="flex-1 py-1.5 rounded-lg bg-primary text-primary-foreground font-bold text-xs flex items-center justify-center gap-1 cursor-pointer"
                          >
                            <Eye className="size-3" />
                            <span>Preview</span>
                          </button>
                          <button
                            onClick={() => {
                              setCreativeCustomHeadline(item.title);
                              setWizardMode("business");
                              setIsWizardOpen(true);
                            }}
                            className="flex-1 py-1.5 rounded-lg border border-border text-foreground hover:bg-muted font-bold text-xs flex items-center justify-center gap-1 cursor-pointer"
                          >
                            <Megaphone className="size-3" />
                            <span>Use</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 5: ANALYTICS */}
          {activeTab === "analytics" && (
            <div className="rounded-2xl border border-border bg-card p-6 shadow-xs space-y-6 text-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border pb-4">
                <div>
                  <h2 className="text-base font-bold text-foreground">Performance & Channel Analytics</h2>
                  <p className="text-xs text-muted-foreground">Real-time attention, customer clicks, and WhatsApp lead attribution.</p>
                </div>

                {/* Timeframe Switcher */}
                <div className="flex items-center gap-1 p-1 rounded-xl border border-border bg-background w-fit">
                  {(["7d", "30d", "all"] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => setAnalyticsTimeframe(t)}
                      className={`px-3 py-1 rounded-lg font-bold text-xs transition-colors cursor-pointer ${
                        analyticsTimeframe === t
                          ? "bg-primary text-primary-foreground shadow-2xs"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {t === "7d" ? "Last 7 Days" : t === "30d" ? "Last 30 Days" : "All Time"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl border border-border bg-background space-y-1">
                  <span className="text-muted-foreground block text-[11px]">Local Ad Views</span>
                  <strong className="text-2xl font-black text-foreground">
                    {analyticsTimeframe === "7d" ? "14,280" : analyticsTimeframe === "30d" ? "48,150" : "62,430"}
                  </strong>
                  <span className="text-[10px] text-primary font-semibold block">Within 5km geo-fence</span>
                </div>

                <div className="p-4 rounded-xl border border-border bg-background space-y-1">
                  <span className="text-muted-foreground block text-[11px]">WhatsApp Chats Opened</span>
                  <strong className="text-2xl font-black text-foreground">
                    {analyticsTimeframe === "7d" ? "18" : analyticsTimeframe === "30d" ? "64" : leads.length}
                  </strong>
                  <span className="text-[10px] text-primary font-semibold block">Click-to-chat links</span>
                </div>

                <div className="p-4 rounded-xl border border-border bg-background space-y-1">
                  <span className="text-muted-foreground block text-[11px]">Average Cost / Chat</span>
                  <strong className="text-2xl font-black text-foreground">₹109</strong>
                  <span className="text-[10px] text-muted-foreground block">Meta & Google blended CPI</span>
                </div>

                <div className="p-4 rounded-xl border border-border bg-background space-y-1">
                  <span className="text-muted-foreground block text-[11px]">Converted Customers</span>
                  <strong className="text-2xl font-black text-foreground">
                    {leads.filter((l) => l.stage === "Converted").length}
                  </strong>
                  <span className="text-[10px] text-primary font-semibold block">Completed appointments</span>
                </div>
              </div>

              {/* Channel Breakdown & Funnel */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 rounded-2xl border border-border bg-background space-y-3">
                  <span className="font-bold text-foreground text-xs block">Channel Distribution</span>
                  <div className="space-y-3 text-xs">
                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground flex items-center gap-1.5">
                          <InstagramIcon className="size-3.5 text-primary" /> Instagram Reels (5km)
                        </span>
                        <strong className="text-foreground">62% of Inquiries</strong>
                      </div>
                      <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
                        <div className="bg-primary h-full w-[62%]" />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground flex items-center gap-1.5">
                          <Search className="size-3.5 text-foreground" /> Google Local Search Call Ads
                        </span>
                        <strong className="text-foreground">28% of Inquiries</strong>
                      </div>
                      <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
                        <div className="bg-muted-foreground/60 h-full w-[28%]" />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground flex items-center gap-1.5">
                          <FacebookIcon /> Meta Local Feed Posts
                        </span>
                        <strong className="text-foreground">10% of Inquiries</strong>
                      </div>
                      <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
                        <div className="bg-primary/50 h-full w-[10%]" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-5 rounded-2xl border border-border bg-background space-y-3">
                  <span className="font-bold text-foreground text-xs block">Inquiry CRM Funnel</span>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between items-center p-2 rounded-lg bg-muted/40">
                      <span>1. New Inquiries</span>
                      <strong className="text-foreground font-mono">{leads.length} (100%)</strong>
                    </div>
                    <div className="flex justify-between items-center p-2 rounded-lg bg-muted/40">
                      <span>2. Contacted on WhatsApp</span>
                      <strong className="text-foreground font-mono">
                        {leads.filter((l) => l.stage !== "New").length} ({leads.length > 0 ? Math.round((leads.filter((l) => l.stage !== "New").length / leads.length) * 100) : 0}%)
                      </strong>
                    </div>
                    <div className="flex justify-between items-center p-2 rounded-lg bg-muted/40">
                      <span>3. Qualified Appointment / Slot</span>
                      <strong className="text-foreground font-mono">
                        {leads.filter((l) => l.stage === "Qualified" || l.stage === "Converted").length}
                      </strong>
                    </div>
                    <div className="flex justify-between items-center p-2 rounded-lg bg-primary/10 text-primary font-bold">
                      <span>4. Converted Patient / Customer</span>
                      <span className="font-mono">
                        {leads.filter((l) => l.stage === "Converted").length}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: INTEGRATIONS (PHASE 2D HONEST DISCLOSURE) */}
          {activeTab === "integrations" && (
            <div className="rounded-2xl border border-border bg-card p-6 shadow-xs space-y-6 text-xs">
              <div>
                <h2 className="text-base font-bold text-foreground">Ad Platform Integrations</h2>
                <p className="text-xs text-muted-foreground">Connect external accounts for automatic ad synchronization.</p>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-xl border border-border bg-background flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <FacebookIcon />
                      <span className="font-bold text-foreground">Meta Business Manager</span>
                      <span className="px-2 py-0.5 rounded-full bg-muted text-muted-foreground font-mono text-[10px]">
                        Pending OAuth Credentials
                      </span>
                    </div>
                    <p className="text-muted-foreground text-[11px]">
                      Requires Meta Developer App ID and system user access token for direct Instagram/Facebook feed publishing.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setIntegrationPlatform("meta");
                      setIsIntegrationModalOpen(true);
                    }}
                    className="px-4 py-2 rounded-xl border border-primary/30 text-primary hover:bg-primary/10 font-bold text-xs self-start sm:self-center transition-colors cursor-pointer shadow-2xs"
                  >
                    Configure Meta OAuth
                  </button>
                </div>

                <div className="p-4 rounded-xl border border-border bg-background flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Search className="size-4 text-primary" />
                      <span className="font-bold text-foreground">Google Ads MCC</span>
                      <span className="px-2 py-0.5 rounded-full bg-muted text-muted-foreground font-mono text-[10px]">
                        Pending Developer Token
                      </span>
                    </div>
                    <p className="text-muted-foreground text-[11px]">
                      Requires Google Ads API Developer Token and service account client credentials.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setIntegrationPlatform("google");
                      setIsIntegrationModalOpen(true);
                    }}
                    className="px-4 py-2 rounded-xl border border-primary/30 text-primary hover:bg-primary/10 font-bold text-xs self-start sm:self-center transition-colors cursor-pointer shadow-2xs"
                  >
                    Configure Google Token
                  </button>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-muted/50 border border-border text-[11px] text-muted-foreground space-y-1">
                <strong>Phase 2D Integration Status:</strong> Real external ad publishing requires production credentials from Meta for Developers and Google Cloud Console. Until tokens are provided, campaign drafts are safely stored in your persistent local database.
              </div>
            </div>
          )}

          {/* TAB 7: BILLING (PHASE 2E TRANSPARENCY) */}
          {activeTab === "billing" && (
            <div className="rounded-2xl border border-border bg-card p-6 shadow-xs space-y-6 text-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border pb-4">
                <div>
                  <h2 className="text-base font-bold text-foreground">Billing & Ad Spend Accounting</h2>
                  <p className="text-xs text-muted-foreground">Clear itemization of software subscriptions vs direct ad network spend.</p>
                </div>
                <button
                  onClick={() => setIsPlanModalOpen(true)}
                  className="px-4 py-2 rounded-xl bg-primary text-primary-foreground font-bold text-xs shadow-xs hover:opacity-95 self-start sm:self-auto cursor-pointer"
                >
                  Change Subscription Plan
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="p-5 rounded-xl border border-border bg-background space-y-3">
                  <span className="text-[11px] font-bold text-primary uppercase tracking-wider block">AdPulse Software Subscription</span>
                  <div className="text-2xl font-extrabold text-foreground">
                    ₹2,499 / month
                  </div>
                  <p className="text-muted-foreground text-[11px] leading-relaxed">
                    Covers AI creative generation, campaign formatting, 5km geo-fencing, and lead CRM management.
                  </p>
                </div>

                <div className="p-5 rounded-xl border border-border bg-background space-y-3">
                  <span className="text-[11px] font-bold text-foreground uppercase tracking-wider block">Media Advertising Budget</span>
                  <div className="text-2xl font-extrabold text-foreground">
                    Direct Meta/Google Card Billing
                  </div>
                  <p className="text-muted-foreground text-[11px] leading-relaxed">
                    Media budget is deployed directly into Meta and Google ad inventory with zero AdPulse markup.
                  </p>
                </div>
              </div>

              {/* Past Invoices and Payment Receipts Table */}
              <div className="p-5 rounded-2xl border border-border bg-background space-y-3">
                <span className="font-bold text-foreground text-xs block">Invoice Receipts & Tax Statements</span>
                <div className="divide-y divide-border text-xs">
                  <div className="py-2.5 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-foreground">Growth Business Monthly Subscription (October)</div>
                      <div className="text-[10px] text-muted-foreground font-mono">12 Oct 2026 • Inv-8921</div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-bold text-foreground">₹2,499</span>
                      <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold">Paid</span>
                      <button
                        onClick={() => alert("Downloading simulated GST tax receipt PDF...")}
                        className="text-primary hover:underline font-bold text-[11px] cursor-pointer"
                      >
                        Receipt
                      </button>
                    </div>
                  </div>

                  <div className="py-2.5 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-foreground">Growth Business Monthly Subscription (September)</div>
                      <div className="text-[10px] text-muted-foreground font-mono">12 Sep 2026 • Inv-8840</div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-bold text-foreground">₹2,499</span>
                      <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold">Paid</span>
                      <button
                        onClick={() => alert("Downloading simulated GST tax receipt PDF...")}
                        className="text-primary hover:underline font-bold text-[11px] cursor-pointer"
                      >
                        Receipt
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-muted/60 border border-border text-[11px] text-muted-foreground space-y-1">
                <strong>Payment Gateway Status:</strong> Live payment collection (Razorpay / Stripe) will be activated following certified merchant tax and pass-through accounting validation.
              </div>
            </div>
          )}

          {/* TAB 8: SETTINGS (PHASE 2A & 2C PERSISTENT WORKSPACE PROFILE) */}
          {activeTab === "settings" && (
            <div className="rounded-2xl border border-border bg-card p-6 shadow-xs space-y-6 text-xs max-w-2xl">
              <div>
                <h2 className="text-base font-bold text-foreground">Workspace Profile Settings</h2>
                <p className="text-xs text-muted-foreground">Persist business name, geo-fence center, and default contact details.</p>
              </div>

              {profileSaveSuccess && (
                <div className="p-3.5 rounded-xl bg-primary/10 border border-primary/20 text-primary font-semibold flex items-center gap-2">
                  <CheckCircle2 className="size-4 shrink-0" />
                  <span>Workspace profile saved successfully to database!</span>
                </div>
              )}

              <form onSubmit={handleSaveProfile} className="space-y-4">
                <div className="space-y-1">
                  <label className="font-bold text-foreground block">Business / Storefront Name</label>
                  <input
                    type="text"
                    required
                    value={workspaceProfile.businessName}
                    onChange={(e) => setWorkspaceProfile({ ...workspaceProfile, businessName: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-border bg-background text-foreground focus:outline-primary"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-foreground block">Geo-Fence Center (Street / Neighborhood)</label>
                  <input
                    type="text"
                    required
                    value={workspaceProfile.geoCenter}
                    onChange={(e) => setWorkspaceProfile({ ...workspaceProfile, geoCenter: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-border bg-background text-foreground focus:outline-primary"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-bold text-foreground block">Target Radius (km)</label>
                    <input
                      type="number"
                      min="1"
                      max="50"
                      value={workspaceProfile.geoRadiusKm}
                      onChange={(e) => setWorkspaceProfile({ ...workspaceProfile, geoRadiusKm: Number(e.target.value) })}
                      className="w-full p-2.5 rounded-xl border border-border bg-background text-foreground focus:outline-primary"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-foreground block">WhatsApp Inquiries Contact Phone</label>
                    <input
                      type="text"
                      required
                      value={workspaceProfile.contactPhone}
                      onChange={(e) => setWorkspaceProfile({ ...workspaceProfile, contactPhone: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-border bg-background text-foreground focus:outline-primary"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSavingProfile}
                    className="px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-bold text-xs shadow-xs hover:opacity-95 disabled:opacity-50 flex items-center gap-2 cursor-pointer"
                  >
                    {isSavingProfile ? <Loader2 className="size-3.5 animate-spin" /> : null}
                    <span>Save Workspace Profile</span>
                  </button>
                </div>
              </form>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
