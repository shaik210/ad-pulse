"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Calendar,
  Building2,
  ChevronDown,
  Info,
  Clock,
  MessageCircle,
  TrendingUp,
  MapPin,
  Sparkles,
  Smartphone,
  Kanban,
  Target,
  Shield,
  Check,
  Stethoscope,
  Scissors,
  Dumbbell,
  UtensilsCrossed,
  Eye,
  GraduationCap,
  Layers,
} from "lucide-react";

import { SiteHeader } from "@/components/marketing/site-header";
import { SiteFooter } from "@/components/marketing/site-footer";
import { AdPreviewSandbox } from "@/components/marketing/ad-preview-sandbox";
import { CrmPipelinePreview } from "@/components/marketing/crm-pipeline-preview";
import { OutcomeEstimator } from "@/components/marketing/outcome-estimator";
import { InstagramGradientIcon, FacebookBlueIcon, GoogleIcon } from "@/components/marketing/shared-icons";
import { BUSINESS_SAAS_PLANS } from "@/lib/pricing";

type GoalType = "inquiries" | "bookings" | "memberships" | "admissions";

export default function HomePage() {
  const [selectedGoal, setSelectedGoal] = useState<GoalType>("inquiries");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Mouse spotlight state
  const [heroMouse, setHeroMouse] = useState({ x: 0, y: 0 });
  const [heroHovered, setHeroHovered] = useState(false);

  const handleHeroMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setHeroMouse({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const goalDefinitions: Record<
    GoalType,
    {
      title: string;
      desc: string;
      category: string;
      highlights: string[];
      sampleExample: string;
    }
  > = {
    inquiries: {
      title: "Get More Customer Inquiries & Walk-Ins",
      desc: "For local salons, spas, boutique retail stores, and cafes wanting neighbors chatting directly on WhatsApp.",
      category: "Stores & Salons",
      highlights: ["5km Radius Local Feed Ads", "Direct Click-to-WhatsApp Inflow", "Customer Inquiry Kanban Board"],
      sampleExample: "Salon ₹999 Pamper Package & Boutique Handloom Special",
    },
    bookings: {
      title: "Generate Qualified Patient Appointments",
      desc: "For dental clinics, diagnostic centers, physiotherapy clinics, and specialized wellness practitioners.",
      category: "Clinics & Doctors",
      highlights: ["Google Search Local Call Ads", "Consultation Notes & Timeline", "Scheduled Appointment Reminders"],
      sampleExample: "Painless Root Canal 30% Off (Apex Dental Clinic)",
    },
    memberships: {
      title: "Drive Trial Passes & Gym Memberships",
      desc: "For fitness gyms, CrossFit boxes, yoga studios, and personal training facilities.",
      category: "Fitness & Studios",
      highlights: ["Instagram Reels Video Mockups", "Free Trial Pass WhatsApp Delivery", "Membership Follow-Up CRM"],
      sampleExample: "IronPulse Gym 3-Day Free Trial Pass + Body Composition",
    },
    admissions: {
      title: "Enroll Students in Batches & Courses",
      desc: "For coaching academies, test prep centers, tutoring institutes, and creative art workshops.",
      category: "Coaching & Institutes",
      highlights: ["Diagnostic Assessment Funnels", "Parent WhatsApp Communication", "Batch Enrollment Tracking"],
      sampleExample: "Class 9-12 Science & Maths Free Diagnostic Assessment",
    },
  };

  const homeFaqs = [
    {
      category: "Platform Model",
      q: "What is AdPulse and who is it built for?",
      a: "AdPulse is a Local Advertising Operating System and CRM built for non-technical Indian business owners — including dental clinics, salons, gyms, restaurants, coaching institutes, and local service providers. It simplifies local ad creation across Meta and Google, drives inquiries straight to WhatsApp, and tracks leads in a built-in CRM.",
    },
    {
      category: "Billing & Ad Spend",
      q: "How does billing work? Are there hidden agency fees?",
      a: "AdPulse operates exclusively as a predictable SaaS software subscription (Basic ₹1,499/mo, Growth ₹2,499/mo, Premium ₹4,999/mo). 100% of your advertising budget is billed directly to your payment card by Meta Ads and Google Ads. AdPulse charges 0% commission and 0% markup on your media spend.",
    },
    {
      category: "Ad Accounts",
      q: "Do I need my own Meta or Google Ads account?",
      a: "Yes. AdPulse connects to your existing Meta Business account and Google Ads account via standard OAuth 2.0. This guarantees you retain complete ownership of your customer audiences, advertising data, and ad account reputation.",
    },
    {
      category: "WhatsApp Inflow",
      q: "How do customer inquiries reach me?",
      a: "When a customer within 5km taps your ad on Instagram, Facebook, or Google, it opens a WhatsApp chat on their smartphone addressed directly to your phone number. The message is pre-filled with the exact offer they tapped, ensuring zero drop-off from complicated web forms.",
    },
    {
      category: "Targeting",
      q: "How precise is the 5km neighborhood geo-targeting?",
      a: "We pin your physical clinic, shop, or studio address and establish a strict circular perimeter (default 5km). Your ads are delivered exclusively to people living, working, or actively searching within that radius, preventing wasted budget on distant prospects.",
    },
    {
      category: "Creative Automation",
      q: "Do I need a graphic designer to create ads?",
      a: "No. AdPulse provides built-in industry creative templates tailored for Instagram 9:16 Reels, 1:1 Feed posts, and Google Search call formats. You can also utilize our Canva integration for customized 9:16 video visual assets.",
    },
    {
      category: "Customer CRM",
      q: "What is included in the built-in CRM?",
      a: "AdPulse includes a visual 6-stage Kanban board (New Lead, Contacted, Qualified, Consulted, Converted, Lost). You can log consultation notes, record pricing discussions, and schedule return follow-up reminder dates directly on each lead card.",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-200 font-sans selection:bg-primary selection:text-primary-foreground">
      <SiteHeader />

      {/* =========================================================================
          SECTION 1: HERO & PRODUCT PREVIEW
          ========================================================================= */}
      <section
        id="hero"
        onMouseMove={handleHeroMouseMove}
        onMouseEnter={() => setHeroHovered(true)}
        onMouseLeave={() => setHeroHovered(false)}
        className="relative pt-12 sm:pt-16 md:pt-20 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-background group"
      >
        {/* Subtle Decorative Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,69,38,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,69,38,0.06)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_65%_55%_at_50%_45%,#000_70%,transparent_100%)] pointer-events-none" />

        {/* Dynamic Mouse Spotlight */}
        <div
          className="pointer-events-none absolute size-[240px] sm:size-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-2xl transition-opacity duration-300 ease-out"
          style={{
            left: `${heroMouse.x}px`,
            top: `${heroMouse.y}px`,
            opacity: heroHovered ? 1 : 0,
          }}
        />

        <div className="relative max-w-5xl mx-auto text-center space-y-6 sm:space-y-8 z-10">
          {/* Top Pill Tag */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-card/80 backdrop-blur-md text-xs font-semibold text-muted-foreground shadow-xs">
            <span className="size-2 rounded-full bg-primary animate-pulse" />
            <span>Local Advertising OS & WhatsApp CRM for Indian SMBs</span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.15] sm:leading-tight text-foreground">
            Run Local Ads. Capture Leads. <br className="hidden sm:inline" />
            <span className="text-primary">
              Grow Your Business.
            </span>
          </h1>

          {/* Supporting Copy */}
          <p className="max-w-3xl mx-auto text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed">
            Reach customers within 5km of your doorstep, turn interest into direct WhatsApp inquiries, and manage leads in an integrated CRM workspace.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
            <Link
              href="/dashboard"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-primary text-primary-foreground font-extrabold text-xs shadow-md transition-all hover:scale-[1.01]"
            >
              <Building2 className="size-4" />
              <span>Launch Business Workspace</span>
              <ArrowRight className="size-3.5" />
            </Link>

            <Link
              href="/demo"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl border border-border bg-card hover:bg-muted text-foreground font-extrabold text-xs shadow-xs transition-all hover:scale-[1.01]"
            >
              <Eye className="size-4 text-primary" />
              <span>Explore Interactive Demo</span>
              <ArrowRight className="size-3.5" />
            </Link>
          </div>

          {/* Concise Product Preview Showing Actual Workspace Components */}
          <div className="pt-8 sm:pt-10 max-w-4xl mx-auto">
            <div className="rounded-2xl border border-border bg-card shadow-xl p-4 sm:p-6 lg:p-7 text-left space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-3 text-xs">
                <div className="flex items-center gap-2.5">
                  <div className="size-7 rounded-lg bg-primary text-primary-foreground font-bold flex items-center justify-center text-xs">
                    A
                  </div>
                  <div>
                    <span className="font-bold text-foreground">Apex Dental Clinic Workspace</span>
                    <span className="text-[10px] text-muted-foreground block">5km Green Park Local Geo-Fence • Live Preview</span>
                  </div>
                </div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-muted text-[10px] font-mono text-muted-foreground font-bold">
                  <Info className="size-3" />
                  <span>Simulated Workspace Preview</span>
                </div>
              </div>

              {/* Mini Workspace Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4 text-xs">
                {/* Active Campaign Card */}
                <div className="p-3.5 rounded-xl border border-border bg-background space-y-2">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-bold text-foreground flex items-center gap-1">
                      <InstagramGradientIcon className="size-3.5" /> Reels & Feed
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary font-bold text-[10px]">
                      Active
                    </span>
                  </div>
                  <div className="font-semibold text-foreground text-xs">Root Canal 30% Off Offer</div>
                  <div className="text-[11px] text-muted-foreground">Budget: ₹500/day • 5km Local Geo-Fence</div>
                </div>

                {/* Lead Pipeline Inflow Card */}
                <div className="p-3.5 rounded-xl border border-border bg-background space-y-2">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-bold text-foreground flex items-center gap-1">
                      <MessageCircle className="size-3.5 text-primary" /> WhatsApp Inflow
                    </span>
                    <span className="font-mono text-primary font-bold text-[10px]">16 Inquiries</span>
                  </div>
                  <div className="text-muted-foreground text-[11px] space-y-1">
                    <div className="flex justify-between"><span>Ravi Patel</span> <strong className="text-foreground">Contacted</strong></div>
                    <div className="flex justify-between"><span>Sneha Sharma</span> <strong className="text-primary font-bold">Qualified</strong></div>
                  </div>
                </div>

                {/* CRM Follow-Up Activity */}
                <div className="p-3.5 rounded-xl border border-border bg-background space-y-2">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-bold text-foreground flex items-center gap-1">
                      <Clock className="size-3.5 text-primary" /> Follow-Up Schedule
                    </span>
                    <span className="text-[10px] text-muted-foreground">Today</span>
                  </div>
                  <div className="text-[11px] text-muted-foreground">
                    <div>11:00 AM • Consult with Dr. Sharma</div>
                    <div className="text-foreground font-semibold pt-0.5">Note: Weekend treatment confirmed</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Trust & Capability Strip */}
            <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
              <div className="p-3 rounded-xl border border-border bg-card/60 backdrop-blur-xs space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-foreground">
                  <Target className="size-3.5 text-primary" />
                  <span>5km Geo-Fence</span>
                </div>
                <p className="text-[11px] text-muted-foreground">Pin-point neighborhood targeting so ads reach people who can actually visit.</p>
              </div>

              <div className="p-3 rounded-xl border border-border bg-card/60 backdrop-blur-xs space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-foreground">
                  <Smartphone className="size-3.5 text-primary" />
                  <span>WhatsApp Inflow</span>
                </div>
                <p className="text-[11px] text-muted-foreground">1-click direct chat links straight to your personal or business phone.</p>
              </div>

              <div className="p-3 rounded-xl border border-border bg-card/60 backdrop-blur-xs space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-foreground">
                  <Shield className="size-3.5 text-primary" />
                  <span>0% Media Markup</span>
                </div>
                <p className="text-[11px] text-muted-foreground">100% of ad spend is billed directly by Meta and Google with zero agency cut.</p>
              </div>

              <div className="p-3 rounded-xl border border-border bg-card/60 backdrop-blur-xs space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-foreground">
                  <Kanban className="size-3.5 text-primary" />
                  <span>6-Stage CRM</span>
                </div>
                <p className="text-[11px] text-muted-foreground">Track inquiry stages, follow-up dates, and consultation notes in one board.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: CHOOSE YOUR BUSINESS GOAL
          ========================================================================= */}
      <section id="goals" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 border-t border-border bg-card/40">
        <div className="max-w-6xl mx-auto space-y-8 sm:space-y-10">
          <div className="text-center space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">Tailored Playbooks</span>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-foreground">What Is Your Growth Goal?</h2>
            <p className="text-muted-foreground text-sm max-w-xl mx-auto">
              Select your local business objective to inspect the matching campaign funnel and CRM setup.
            </p>
          </div>

          {/* Goal Selectors 4-Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
            {[
              { id: "inquiries", label: "Customer Inquiries", icon: MessageCircle, category: "Stores & Salons" },
              { id: "bookings", label: "Patient Appointments", icon: Calendar, category: "Clinics & Doctors" },
              { id: "memberships", label: "Gym Memberships", icon: Dumbbell, category: "Fitness & Studios" },
              { id: "admissions", label: "Student Admissions", icon: GraduationCap, category: "Coaching & Institutes" },
            ].map((g) => {
              const Icon = g.icon;
              const isSelected = selectedGoal === g.id;
              return (
                <button
                  key={g.id}
                  onClick={() => setSelectedGoal(g.id as GoalType)}
                  className={`p-4 sm:p-5 rounded-xl border text-left transition-all cursor-pointer space-y-2 ${
                    isSelected
                      ? "bg-primary text-primary-foreground border-primary shadow-md scale-[1.02]"
                      : "bg-card border-border text-muted-foreground hover:text-foreground hover:border-border/80"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <Icon className="size-5 shrink-0" />
                    <span className="text-[10px] font-mono uppercase opacity-80">{g.category}</span>
                  </div>
                  <div className="font-extrabold text-xs sm:text-sm">{g.label}</div>
                </button>
              );
            })}
          </div>

          {/* Detailed Destination Card for Selected Goal */}
          {(() => {
            const active = goalDefinitions[selectedGoal];
            return (
              <div className="p-6 sm:p-8 rounded-2xl border border-border bg-card shadow-xs space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-5">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-primary font-mono uppercase">Optimized Funnel:</span>
                      <span className="px-2.5 py-0.5 rounded-full font-bold text-xs bg-primary/10 text-primary">
                        Local Business OS
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-foreground">{active.title}</h3>
                    <p className="text-xs text-muted-foreground max-w-2xl leading-relaxed">{active.desc}</p>
                  </div>

                  <Link
                    href="/dashboard"
                    className="self-start md:self-center shrink-0 inline-flex items-center gap-2 py-3 px-6 rounded-xl bg-primary text-primary-foreground font-bold text-xs shadow-xs hover:opacity-95 transition-opacity"
                  >
                    <span>Launch This Campaign</span>
                    <ArrowRight className="size-3.5" />
                  </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                  <div className="p-3.5 rounded-xl bg-background border border-border space-y-1">
                    <span className="text-muted-foreground text-[11px] block">Live Example Offer:</span>
                    <strong className="text-foreground">{active.sampleExample}</strong>
                  </div>
                  {active.highlights.map((item, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-background border border-border flex items-center gap-2">
                      <CheckCircle2 className="size-4 text-primary shrink-0" />
                      <span className="text-foreground font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: THREE PILLARS OF THE LOCAL ADVERTISING OS
          ========================================================================= */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 border-t border-border bg-background">
        <div className="max-w-6xl mx-auto space-y-10 sm:space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">Core Platform Architecture</span>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-foreground">
              The Three Pillars of AdPulse
            </h2>
            <p className="text-muted-foreground text-sm max-w-xl mx-auto">
              Everything your local business needs to drive customer acquisition from one self-service software platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {/* Pillar 1 */}
            <div className="p-6 sm:p-8 rounded-2xl border border-border bg-card flex flex-col justify-between space-y-6 shadow-sm">
              <div className="space-y-4">
                <div className="size-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <Sparkles className="size-5" />
                </div>
                <h3 className="text-xl font-bold text-foreground">1. Automated Local Ads</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Turn your local offers into vertical Instagram Reels (9:16), square Facebook Feeds (1:1), and Google Search call ads with compelling copy and headline variations automatically generated for you.
                </p>
                <ul className="space-y-2 text-xs text-muted-foreground pt-2">
                  <li className="flex items-center gap-2 text-foreground font-medium">
                    <Check className="size-4 text-primary shrink-0" />
                    <span>Native Instagram, Facebook & Google placements</span>
                  </li>
                  <li className="flex items-center gap-2 text-foreground font-medium">
                    <Check className="size-4 text-primary shrink-0" />
                    <span>Canva integration for 9:16 video visual assets</span>
                  </li>
                  <li className="flex items-center gap-2 text-foreground font-medium">
                    <Check className="size-4 text-primary shrink-0" />
                    <span>0% markup — direct ad network card billing</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="p-6 sm:p-8 rounded-2xl border border-border bg-card flex flex-col justify-between space-y-6 shadow-sm">
              <div className="space-y-4">
                <div className="size-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <Target className="size-5" />
                </div>
                <h3 className="text-xl font-bold text-foreground">2. 5km Pinpoint Geo-Fencing</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Set a precise circular perimeter around your shop, clinic, or studio. Your ad budget is shown only to verified residents and commuters physically present within 5km who can realistically visit.
                </p>
                <ul className="space-y-2 text-xs text-muted-foreground pt-2">
                  <li className="flex items-center gap-2 text-foreground font-medium">
                    <Check className="size-4 text-primary shrink-0" />
                    <span>Pin-drop radius eliminates city-wide ad waste</span>
                  </li>
                  <li className="flex items-center gap-2 text-foreground font-medium">
                    <Check className="size-4 text-primary shrink-0" />
                    <span>Customizable from 3km to 25km radius</span>
                  </li>
                  <li className="flex items-center gap-2 text-foreground font-medium">
                    <Check className="size-4 text-primary shrink-0" />
                    <span>Real-time location budget pacing</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="p-6 sm:p-8 rounded-2xl border border-border bg-card flex flex-col justify-between space-y-6 shadow-sm">
              <div className="space-y-4">
                <div className="size-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <Kanban className="size-5" />
                </div>
                <h3 className="text-xl font-bold text-foreground">3. WhatsApp Leads & CRM</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Customer ad clicks open pre-filled WhatsApp conversations on your smartphone. Track leads across 6 visual Kanban stages, record consultation notes, and schedule return follow-up reminders.
                </p>
                <ul className="space-y-2 text-xs text-muted-foreground pt-2">
                  <li className="flex items-center gap-2 text-foreground font-medium">
                    <Check className="size-4 text-primary shrink-0" />
                    <span>Zero web form drop-off — instant chat</span>
                  </li>
                  <li className="flex items-center gap-2 text-foreground font-medium">
                    <Check className="size-4 text-primary shrink-0" />
                    <span>6-stage visual lead pipeline Kanban board</span>
                  </li>
                  <li className="flex items-center gap-2 text-foreground font-medium">
                    <Check className="size-4 text-primary shrink-0" />
                    <span>Consultation notes & appointment scheduling</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: INTERACTIVE MULTICHANNEL SANDBOX EMBED
          ========================================================================= */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 border-t border-border bg-card/30">
        <AdPreviewSandbox defaultSample="dental" />
      </section>

      {/* =========================================================================
          SECTION 5: CRM PIPELINE PREVIEW EMBED
          ========================================================================= */}
      <section id="crm-pipeline" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 border-t border-border bg-background">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="text-center space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">Inquiry-to-Customer Architecture</span>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-foreground">
              Integrated CRM & Lead Follow-Up Board
            </h2>
            <p className="text-muted-foreground text-sm max-w-xl mx-auto">
              Never let a warm prospect slip through the cracks. Organize inquiries, add staff consultation notes, and schedule return visits in one place.
            </p>
          </div>

          <CrmPipelinePreview />
        </div>
      </section>

      {/* =========================================================================
          SECTION 6: CAMPAIGN OUTCOME ESTIMATOR EMBED
          ========================================================================= */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 border-t border-border bg-card/30">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="text-center space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">Predictive Planning</span>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-foreground">
              Estimate Your Local Reach & Inquiries
            </h2>
            <p className="text-muted-foreground text-sm max-w-xl mx-auto">
              Simulate realistic potential impressions and WhatsApp chats based on your local business vertical and daily ad spend.
            </p>
          </div>

          <OutcomeEstimator initialBudget={5000} />
        </div>
      </section>

      {/* =========================================================================
          SECTION 7: PRICING PLANS PREVIEW
          ========================================================================= */}
      <section id="pricing" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 border-t border-border bg-background">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">Transparent SaaS Software</span>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-foreground">
              Predictable Monthly Plans
            </h2>
            <p className="text-muted-foreground text-sm max-w-xl mx-auto">
              Flat software subscriptions with 0% markup on your advertising spend. Cancel anytime.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {BUSINESS_SAAS_PLANS.map((plan) => (
              <div
                key={plan.id}
                className={`relative rounded-3xl border p-6 sm:p-8 flex flex-col justify-between transition-all bg-card ${
                  plan.popular
                    ? "border-primary shadow-xl ring-2 ring-primary/20 scale-[1.02]"
                    : "border-border shadow-xs hover:border-foreground/20"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary text-primary-foreground text-xs font-black uppercase tracking-wider shadow-sm">
                    Most Popular
                  </div>
                )}

                <div className="space-y-6">
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-primary uppercase tracking-wider block">
                      {plan.badge}
                    </span>
                    <h3 className="text-2xl font-extrabold text-foreground">{plan.name}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {plan.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-border">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl sm:text-5xl font-black text-foreground">
                        ₹{plan.monthlyPrice.toLocaleString("en-IN")}
                      </span>
                      <span className="text-xs font-semibold text-muted-foreground">/ month</span>
                    </div>
                    <div className="text-[11px] text-muted-foreground mt-1 font-mono">
                      + Direct Ad Spend (0% AdPulse fee)
                    </div>
                  </div>

                  <div className="space-y-3 pt-4 border-t border-border">
                    <div className="text-xs font-bold text-foreground">Plan Highlights:</div>
                    <ul className="space-y-2 text-xs text-muted-foreground">
                      {plan.features.slice(0, 4).map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="size-4 text-primary shrink-0 mt-0.5" />
                          <span className="text-foreground">{feat.name}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-8">
                  <Link
                    href={plan.ctaUrl}
                    className={`w-full py-3.5 rounded-2xl font-bold text-xs sm:text-sm text-center flex items-center justify-center gap-2 transition-all shadow-xs ${
                      plan.popular
                        ? "bg-primary text-primary-foreground hover:opacity-95"
                        : "border border-border text-foreground hover:bg-muted"
                    }`}
                  >
                    <span>{plan.ctaText}</span>
                    <ArrowRight className="size-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center pt-4">
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 text-xs font-bold text-primary hover:underline"
            >
              <span>View full feature comparison matrix and tax disclosures →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 8: FAQ HIGHLIGHTS
          ========================================================================= */}
      <section id="faq" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-8 border-t border-border">
        <div className="text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-primary">Trust & Governance</span>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-foreground">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground text-sm max-w-xl mx-auto">
            Clear, honest answers regarding campaign delivery, fees, ad accounts, and lead capture.
          </p>
        </div>

        <div className="space-y-3 pt-2">
          {homeFaqs.map((faq, idx) => (
            <div key={idx} className="rounded-xl border border-border bg-card overflow-hidden shadow-2xs">
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full flex items-center justify-between p-4 sm:p-5 text-left font-bold text-sm text-foreground cursor-pointer hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-center gap-2.5 pr-4">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-muted text-muted-foreground shrink-0 hidden sm:inline">
                    {faq.category}
                  </span>
                  <span>{faq.q}</span>
                </div>
                <ChevronDown className={`size-4 text-muted-foreground shrink-0 transition-transform ${openFaq === idx ? "rotate-180" : ""}`} />
              </button>
              {openFaq === idx && (
                <div className="px-4 sm:px-5 pb-5 text-xs text-muted-foreground leading-relaxed border-t border-border/50 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION 9: FINAL CONVERSION CTA
          ========================================================================= */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 border-t border-border bg-card/60">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-3">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
              Ready to Turn Local Attention Into Paying Customers?
            </h2>
            <p className="text-muted-foreground text-sm max-w-xl mx-auto">
              Launch your local business workspace, connect your ad accounts, and begin capturing verified WhatsApp leads within 5km.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/dashboard"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-extrabold text-xs shadow-md hover:opacity-95 transition-all"
            >
              <Building2 className="size-4" />
              <span>Launch Business Workspace</span>
              <ArrowRight className="size-3.5" />
            </Link>

            <Link
              href="/pricing"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border border-border bg-card hover:bg-muted text-foreground font-extrabold text-xs shadow-xs transition-all"
            >
              <span>Compare Pricing Plans</span>
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}