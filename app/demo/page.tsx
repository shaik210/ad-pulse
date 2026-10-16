"use client";

import React from "react";
import Link from "next/link";
import {
  Play,
  Building2,
  Sparkles,
  ArrowRight,
  MessageCircle,
  Eye,
  Sliders,
  CheckCircle2,
  Laptop,
  Smartphone,
  Layers,
  ChevronRight,
  Kanban,
  ShieldCheck,
} from "lucide-react";

import { SiteHeader } from "@/components/marketing/site-header";
import { SiteFooter } from "@/components/marketing/site-footer";
import { AdPreviewSandbox } from "@/components/marketing/ad-preview-sandbox";
import { OutcomeEstimator } from "@/components/marketing/outcome-estimator";
import { CrmPipelinePreview } from "@/components/marketing/crm-pipeline-preview";

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-primary/20">
      <SiteHeader />

      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 border-b border-border bg-card/40 relative overflow-hidden">
          <div className="absolute inset-0 bg-radial-gradient from-primary/5 via-transparent to-transparent pointer-events-none" />

          <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold tracking-wide uppercase">
              <Play className="size-3.5 fill-current" />
              <span>Interactive SaaS Platform Walkthrough</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-foreground leading-[1.1]">
              See How AdPulse Turns Nearby Attention Into Paying Customers
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Explore placement-specific ad mockups, simulate realistic campaign outcomes, and test the 6-stage WhatsApp lead CRM — without creating an account.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <a
                href="#ad-previews"
                className="px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-bold text-xs shadow-xs hover:opacity-95 transition-opacity flex items-center gap-2"
              >
                <Eye className="size-4" />
                <span>Explore Ad Previews</span>
              </a>
              <a
                href="#crm-pipeline"
                className="px-5 py-2.5 rounded-xl border border-border bg-card hover:bg-muted text-foreground font-bold text-xs transition-colors flex items-center gap-2"
              >
                <Kanban className="size-4 text-primary" />
                <span>Tour CRM Pipeline</span>
              </a>
            </div>
          </div>
        </section>

        {/* STEP-BY-STEP FLOW VISUALIZER */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 border-b border-border bg-background">
          <div className="max-w-6xl mx-auto space-y-10">
            <div className="text-center space-y-2">
              <span className="text-xs font-bold text-primary uppercase tracking-wider">
                End-to-End Workflow
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">
                How Local Businesses Acquire & Retain Customers with AdPulse
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground max-w-xl mx-auto">
                A single unified workspace designed for non-technical business owners.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl border border-border bg-card space-y-3 relative shadow-2xs">
                <div className="size-8 rounded-xl bg-primary/10 text-primary font-extrabold flex items-center justify-center text-sm">
                  1
                </div>
                <h3 className="font-bold text-base text-foreground">Connect Ad Accounts</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Authorize Meta Ads and Google Ads via standard OAuth 2.0. Maintain full financial ownership — 100% of ad spend is charged directly to your card by ad networks with 0% AdPulse markup.
                </p>
              </div>

              <div className="p-6 rounded-2xl border border-border bg-card space-y-3 relative shadow-2xs">
                <div className="size-8 rounded-xl bg-primary/10 text-primary font-extrabold flex items-center justify-center text-sm">
                  2
                </div>
                <h3 className="font-bold text-base text-foreground">Hyper-Local Ad Targeting</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Pin your shop, clinic, or gym and launch Instagram Reels, Facebook Feed, and Google Search campaigns focused strictly on potential customers within a 5km radius.
                </p>
              </div>

              <div className="p-6 rounded-2xl border border-border bg-card space-y-3 relative shadow-2xs">
                <div className="size-8 rounded-xl bg-primary/10 text-primary font-extrabold flex items-center justify-center text-sm">
                  3
                </div>
                <h3 className="font-bold text-base text-foreground">WhatsApp CRM & Follow-Ups</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Ad clicks open pre-filled WhatsApp conversations on your smartphone. Track leads across 6 Kanban stages, log consultation notes, and schedule return appointments.
                </p>
              </div>
            </div>

            <div className="text-center pt-2">
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-primary text-primary-foreground font-bold text-xs sm:text-sm shadow-xs hover:opacity-95 transition-opacity"
              >
                <span>Launch Business Workspace (Starting ₹1,499/mo)</span>
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* INTERACTIVE AD PREVIEW SANDBOX */}
        <section id="ad-previews" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-border bg-card/20">
          <div className="max-w-6xl mx-auto space-y-8">
            <div className="text-center space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                Component Sandbox
              </span>
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-foreground">
                Live Interactive Ad Simulator
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground max-w-xl mx-auto">
                Toggle between dental clinics, salons, gyms, restaurants, and retail stores to inspect native formats and pre-filled WhatsApp conversation flows.
              </p>
            </div>

            <AdPreviewSandbox defaultSample="dental" />
          </div>
        </section>

        {/* CRM PIPELINE WALKTHROUGH */}
        <section id="crm-pipeline" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-border bg-background">
          <div className="max-w-6xl mx-auto space-y-8">
            <div className="text-center space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                CRM Architecture
              </span>
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-foreground">
                6-Stage Inquiry-to-Customer Pipeline Tour
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground max-w-xl mx-auto">
                Organize incoming inquiries from New Lead to Qualified, Consulted, and Converted Customer with notes and scheduled reminders.
              </p>
            </div>

            <CrmPipelinePreview />
          </div>
        </section>

        {/* CAMPAIGN OUTCOME ESTIMATOR */}
        <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-card/30">
          <div className="max-w-6xl mx-auto space-y-8">
            <div className="text-center space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                Predictive Planning
              </span>
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-foreground">
                Campaign Outcome & Attention Estimator
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground max-w-xl mx-auto">
                Simulate potential impressions, WhatsApp chats, and local customer inquiries based on your target category and monthly ad budget.
              </p>
            </div>

            <OutcomeEstimator initialBudget={5000} />
          </div>
        </section>

        {/* BOTTOM CTA */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-border bg-card text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl font-black text-foreground">
              Ready to Grow Your Local Business?
            </h2>
            <p className="text-sm text-muted-foreground max-w-lg mx-auto">
              Open your interactive workspace, configure your 5km local campaign, and experience the full platform today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/dashboard"
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-primary text-primary-foreground font-bold text-xs sm:text-sm shadow-xs hover:opacity-95 transition-opacity"
              >
                Open Business Workspace
              </Link>
              <Link
                href="/pricing"
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl border border-border text-foreground font-bold text-xs sm:text-sm hover:bg-muted transition-colors"
              >
                Compare SaaS Plans
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
