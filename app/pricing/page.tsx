"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Check,
  X,
  HelpCircle,
  ArrowRight,
  Building2,
  ShieldCheck,
  Sparkles,
  Phone,
  MessageCircle,
  TrendingUp,
  Layers,
  MapPin,
} from "lucide-react";

import { SiteHeader } from "@/components/marketing/site-header";
import { SiteFooter } from "@/components/marketing/site-footer";
import { BUSINESS_SAAS_PLANS, TAX_CONFIG } from "@/lib/pricing";

export default function PricingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const tierComparison = [
    {
      category: "Campaign Capabilities & Radius",
      items: [
        {
          name: "Active Campaigns Concurrent",
          basic: "1 Active Campaign",
          growth: "Up to 3 Active Campaigns",
          premium: "Unlimited Active Campaigns",
        },
        {
          name: "Local Geo-Fencing",
          basic: "Fixed 5km Radius",
          growth: "5km to 15km Radius",
          premium: "Custom 3km to 25km Multi-Pin",
        },
        {
          name: "Ad Networks Supported",
          basic: "Instagram & Facebook Feed",
          growth: "Instagram Reels, Facebook, Google Search",
          premium: "All Networks + Google Call Ads",
        },
        {
          name: "Direct Ad Spend Markup",
          basic: "0% (Billed directly to your card)",
          growth: "0% (Billed directly to your card)",
          premium: "0% (Billed directly to your card)",
        },
      ],
    },
    {
      category: "Lead Capture & CRM Pipeline",
      items: [
        {
          name: "WhatsApp Inquiry Routing",
          basic: "Direct Click-to-WhatsApp",
          growth: "Instant WhatsApp + CRM Sync",
          premium: "Instant WhatsApp + Multi-Staff Sync",
        },
        {
          name: "CRM Kanban Board",
          basic: "Standard List View",
          growth: "Full 6-Stage Visual Kanban",
          premium: "Full 6-Stage Visual Kanban",
        },
        {
          name: "Consultation Notes & Timeline",
          basic: "—",
          growth: "Included (Timestamped audit log)",
          premium: "Included (Staff notes & tracking)",
        },
        {
          name: "Scheduled Follow-Up Reminders",
          basic: "—",
          growth: "Included",
          premium: "Included + Priority Notifications",
        },
      ],
    },
    {
      category: "Creatives & Integrations",
      items: [
        {
          name: "AI Copy & Headline Generator",
          basic: "Standard Generation",
          growth: "Unlimited AI Variations & A/B testing",
          premium: "Unlimited AI + Custom Brand Tone",
        },
        {
          name: "Canva Integration & Export",
          basic: "—",
          growth: "Native 9:16 & 1:1 Templates",
          premium: "Full Canva Workflow + Custom Assets",
        },
        {
          name: "Meta & Google OAuth Sync",
          basic: "Included (OAuth 2.0)",
          growth: "Included (OAuth 2.0)",
          premium: "Included + Priority Verification",
        },
        {
          name: "Dedicated Business Workspace",
          basic: "Single Location",
          growth: "Single Location (Up to 3 Users)",
          premium: "Multi-Location Workspaces",
        },
      ],
    },
  ];

  const pricingFaqs = [
    {
      q: "How does billing work for AdPulse software vs advertising spend?",
      a: "AdPulse is a pure software subscription (₹1,499 to ₹4,999/mo). Your software fee pays for our AI creative suite, local geo-targeting engine, and full WhatsApp CRM workspace. 100% of your advertising budget is billed directly to your credit or debit card by Meta Ads and Google Ads. AdPulse charges 0% commission or markup on your media spend.",
    },
    {
      q: "How is GST (Goods & Services Tax) applied?",
      a: "As an Indian B2B SaaS software provider, statutory 18% GST is added strictly to the AdPulse software subscription invoice. A valid GST tax invoice with input tax credit (ITC) is automatically generated for your registered business.",
    },
    {
      q: "Which plan is best for my local business?",
      a: "If you operate a single clinic, salon, gym, or retail store testing digital ads, the Basic Plan (₹1,499/mo) provides everything you need to run one continuous local campaign. The Growth Plan (₹2,499/mo) is our most popular choice because it includes the complete 6-stage CRM Kanban board, customer consultation notes, and multi-offer rotation. For multi-branch clinics or gyms, the Premium Plan (₹4,999/mo) unlocks multi-location workspaces.",
    },
    {
      q: "Are there any long-term contracts or cancellation penalties?",
      a: "None. All plans are month-to-month SaaS subscriptions. You can upgrade, downgrade, or cancel anytime directly from your dashboard billing settings.",
    },
    {
      q: "Do I need my own Facebook or Google Ads account?",
      a: "Yes. AdPulse connects to your own Meta Business account and Google Ads account via standard OAuth 2.0. This guarantees you retain 100% ownership of your customer audience data, pixel history, and ad account reputation.",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-primary/20">
      <SiteHeader />

      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 border-b border-border bg-card/40 relative overflow-hidden">
          <div className="absolute inset-0 bg-radial-gradient from-primary/5 via-transparent to-transparent pointer-events-none" />

          <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold tracking-wide uppercase">
              <Sparkles className="size-3.5" />
              <span>Transparent SaaS Software Pricing</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-foreground leading-[1.1]">
              Predictable Monthly Plans for Local Business Growth
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Empower your clinic, salon, gym, cafe, or store with AI-assisted local ads and an integrated customer follow-up CRM. Direct ad spend billing with 0% AdPulse markup.
            </p>
          </div>
        </section>

        {/* PRICING CARDS SECTION */}
        <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="space-y-12">
            <div className="text-center space-y-2 max-w-xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">
                Software Subscription Tiers
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Billed monthly. Cancel anytime. Media ad spend is paid directly to Meta Ads and Google Ads.
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
                        + Direct Ad Network Spend (0% AdPulse markup)
                      </div>
                    </div>

                    <div className="space-y-3 pt-4 border-t border-border">
                      <div className="text-xs font-bold text-foreground">What&apos;s Included:</div>
                      <ul className="space-y-2.5 text-xs text-muted-foreground">
                        {plan.features.map((feat, idx) => (
                          <li key={idx} className="flex items-start gap-2.5">
                            {feat.available ? (
                              <Check className="size-4 text-primary shrink-0 mt-0.5" />
                            ) : (
                              <X className="size-4 text-muted-foreground/40 shrink-0 mt-0.5" />
                            )}
                            <span className={feat.available ? "text-foreground" : "text-muted-foreground/60"}>
                              {feat.name}
                              {feat.note && (
                                <span className="ml-1 text-[10px] text-primary font-mono block sm:inline">
                                  ({feat.note})
                                </span>
                              )}
                            </span>
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
          </div>
        </section>

        {/* DETAILED FEATURE COMPARISON TABLE */}
        <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-t border-border bg-card/30">
          <div className="max-w-5xl mx-auto space-y-10">
            <div className="text-center space-y-3">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">
                Plan Comparison
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground max-w-xl mx-auto">
                Detailed comparison across advertising reach, CRM features, and creative capabilities.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-xs">
              <div className="grid grid-cols-12 bg-muted/60 p-4 font-bold text-xs border-b border-border text-foreground">
                <div className="col-span-4 sm:col-span-3">Capability</div>
                <div className="col-span-2 sm:col-span-3 text-center sm:text-left text-foreground">
                  Basic (₹1,499)
                </div>
                <div className="col-span-3 sm:col-span-3 text-center sm:text-left text-primary font-extrabold">
                  Growth (₹2,499)
                </div>
                <div className="col-span-3 sm:col-span-3 text-center sm:text-left text-foreground">
                  Premium (₹4,999)
                </div>
              </div>

              <div className="divide-y divide-border text-xs">
                {tierComparison.map((group, groupIdx) => (
                  <React.Fragment key={groupIdx}>
                    <div className="p-3.5 bg-background font-bold text-[11px] uppercase tracking-wider text-muted-foreground">
                      {group.category}
                    </div>
                    {group.items.map((item, itemIdx) => (
                      <div
                        key={itemIdx}
                        className="grid grid-cols-12 p-4 items-center gap-2 hover:bg-muted/30 transition-colors"
                      >
                        <div className="col-span-4 sm:col-span-3 font-semibold text-foreground">
                          {item.name}
                        </div>
                        <div className="col-span-2 sm:col-span-3 text-muted-foreground">
                          {item.basic}
                        </div>
                        <div className="col-span-3 sm:col-span-3 text-foreground font-semibold">
                          {item.growth}
                        </div>
                        <div className="col-span-3 sm:col-span-3 text-muted-foreground">
                          {item.premium}
                        </div>
                      </div>
                    ))}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* GST & TAX TRANSPARENCY NOTICE */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <div className="p-6 rounded-2xl border border-border bg-muted/30 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-foreground">
              <ShieldCheck className="size-4 text-primary" />
              <span>Tax Compliance & Transparent Billing Model</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {TAX_CONFIG.disclaimer}
            </p>
            <div className="text-[11px] text-muted-foreground/80 font-mono">
              Statutory 18% GST applies strictly to the software subscription fee. 100% of your advertising budget is billed directly to your payment card by Meta Ads and Google Ads with zero AdPulse markup.
            </div>
          </div>
        </section>

        {/* PRICING FAQ ACCORDION */}
        <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-t border-border bg-card/20">
          <div className="max-w-3xl mx-auto space-y-10">
            <div className="text-center space-y-3">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">
                Frequently Asked Questions
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Clear answers regarding subscription billing, ad network accounts, and CRM lead capture.
              </p>
            </div>

            <div className="space-y-3">
              {pricingFaqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-border bg-card overflow-hidden transition-all shadow-2xs"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full p-5 text-left font-bold text-xs sm:text-sm text-foreground flex items-center justify-between gap-4 cursor-pointer hover:bg-muted/40 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <HelpCircle className="size-4 text-muted-foreground shrink-0" />
                  </button>
                  {openFaq === idx && (
                    <div className="px-5 pb-5 pt-1 text-xs text-muted-foreground leading-relaxed border-t border-border/40">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
