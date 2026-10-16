"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  Building2,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  MapPin,
  Phone,
  Sparkles,
  Info,
  AlertCircle,
  Eye,
  Loader2,
  MessageCircle,
  Wand2,
  Layers,
  ShieldCheck,
} from "lucide-react";
import { BUSINESS_SAAS_PLANS, TAX_CONFIG } from "@/lib/pricing";

interface CampaignWizardModalProps {
  isOpen: boolean;
  mode?: "quickblast" | "business";
  initialPackageId?: string;
  initialPlanId?: string;
  defaultLocation?: string;
  defaultPhone?: string;
  onClose: () => void;
  onCampaignCreated: (campaign: any) => void;
}

export function CampaignWizardModal({
  isOpen,
  mode = "business",
  initialPlanId = "growth",
  defaultLocation = "Green Park, New Delhi (5km Radius)",
  defaultPhone = "+91 98765 43210",
  onClose,
  onCampaignCreated,
}: CampaignWizardModalProps) {
  const [step, setStep] = useState(1);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successSaved, setSuccessSaved] = useState<any | null>(null);

  // Form State
  const [selectedPlanId, setSelectedPlanId] = useState(initialPlanId);
  const [useCase, setUseCase] = useState("Clinic & Health");
  const [campaignName, setCampaignName] = useState("");
  const [headline, setHeadline] = useState("");
  const [bodyText, setBodyText] = useState("");
  const [location, setLocation] = useState(defaultLocation);
  const [contactPhone, setContactPhone] = useState(defaultPhone);
  const [channel, setChannel] = useState("Instagram Reels & Feed");
  const [dailyBudget, setDailyBudget] = useState(500);

  // Reset or preset on open
  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setErrorMessage(null);
      setSuccessSaved(null);
      setSelectedPlanId(initialPlanId || "growth");
      setCampaignName("Painless Root Canal Promotion");
      setHeadline("Painless Root Canal & Smile Checkup — 30% Off");
      setBodyText(
        "Pain-free single-sitting RCT by certified MDS specialists. Free digital OPG consultation within 5km."
      );
      setUseCase("Clinic & Health");
    }
  }, [isOpen, initialPlanId]);

  if (!isOpen) return null;

  const currentPlan =
    BUSINESS_SAAS_PLANS.find((p) => p.id === selectedPlanId) || BUSINESS_SAAS_PLANS[1];

  const handleNextStep = () => {
    setErrorMessage(null);
    if (step === 2) {
      if (!campaignName.trim() || campaignName.length < 3) {
        setErrorMessage("Please enter a campaign name of at least 3 characters.");
        return;
      }
      if (!headline.trim() || headline.length < 5) {
        setErrorMessage("Please enter an ad headline of at least 5 characters.");
        return;
      }
      if (!bodyText.trim() || bodyText.length < 10) {
        setErrorMessage("Please enter ad copy description of at least 10 characters.");
        return;
      }
      if (!contactPhone.trim()) {
        setErrorMessage("Please provide a valid WhatsApp contact phone number.");
        return;
      }
    }
    setStep((prev) => Math.min(prev + 1, 4));
  };

  const handleSaveDraft = async () => {
    setIsSaving(true);
    setErrorMessage(null);

    const payload = {
      name: campaignName.trim(),
      type: "growth",
      category: useCase,
      channel,
      headline: headline.trim(),
      body: bodyText.trim(),
      location: location.trim(),
      radiusKm: 5,
      contactPhone: contactPhone.trim(),
      budgetAmount: dailyBudget,
      budgetPeriod: "daily",
      durationDays: 30,
      platformFee: currentPlan.monthlyPrice,
      adSpendAllowance: 0,
      planId: currentPlan.id,
    };

    try {
      const res = await fetch("/api/campaigns", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to save campaign draft");
      }

      setSuccessSaved(data.campaign);
      onCampaignCreated(data.campaign);
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : "Network error saving draft.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs font-sans animate-in fade-in">
      <div className="w-full max-w-2xl bg-card border border-border rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        {/* Wizard Top Header */}
        <div className="flex items-center justify-between p-5 border-b border-border bg-muted/30">
          <div className="flex items-center gap-2.5">
            <div className="size-8 rounded-xl flex items-center justify-center text-primary-foreground bg-primary text-xs font-bold">
              <Building2 className="size-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-foreground">
                New Local Business Ad Campaign
              </h2>
              <span className="text-[11px] text-muted-foreground block">
                Step {step} of 4 • {step === 1 ? "Category & Plan" : step === 2 ? "Creative & Targeting" : step === 3 ? "Ad Preview" : "Fee Breakdown & Confirmation"}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Wizard Body Steps */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1 text-xs">
          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-xs flex items-center gap-2">
              <AlertCircle className="size-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {successSaved ? (
            /* Success confirmation screen */
            <div className="py-8 text-center space-y-4">
              <div className="size-14 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto">
                <CheckCircle2 className="size-8" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-foreground">Campaign Draft Saved to Workspace</h3>
                <p className="text-muted-foreground text-xs max-w-md mx-auto">
                  Your campaign &ldquo;{successSaved.name}&rdquo; is safely stored in your persistent database.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-muted/60 border border-border text-left max-w-md mx-auto space-y-1.5 text-[11px]">
                <div className="font-bold text-foreground flex items-center gap-1.5">
                  <Info className="size-3.5 text-primary" /> Current Next Step Status:
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Ad publishing is pending Meta Graph API & Google Ads OAuth authentication. When live credentials are connected, this draft can be submitted for ad platform policy approval with one click.
                </p>
              </div>

              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl bg-primary text-primary-foreground font-bold text-xs shadow-xs hover:opacity-95 cursor-pointer"
              >
                Close and View in Campaigns Tab
              </button>
            </div>
          ) : (
            <>
              {/* STEP 1: CATEGORY & SAAS PLAN */}
              {step === 1 && (
                <div className="space-y-5">
                  <div className="space-y-2">
                    <label className="font-bold text-foreground block text-xs">1. Select Business Category</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        "Clinic & Health",
                        "Salon & Wellness",
                        "Restaurant & Cafe",
                        "Fitness & Gym",
                        "Retail Boutique",
                        "Coaching Academy",
                        "Auto Care & Detailing",
                        "Local Professional",
                      ].map((cat) => (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => setUseCase(cat)}
                          className={`p-2.5 rounded-xl border text-left font-semibold text-xs transition-all cursor-pointer ${
                            useCase === cat
                              ? "bg-primary text-primary-foreground border-primary shadow-xs"
                              : "bg-background border-border text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2 pt-2">
                    <label className="font-bold text-foreground block text-xs">2. Business Subscription Tier</label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {BUSINESS_SAAS_PLANS.map((plan) => (
                        <button
                          key={plan.id}
                          type="button"
                          onClick={() => setSelectedPlanId(plan.id)}
                          className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer space-y-1.5 ${
                            selectedPlanId === plan.id
                              ? "border-primary bg-primary/10 text-foreground shadow-xs ring-1 ring-primary"
                              : "border-border bg-background text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          <div className="font-bold text-xs text-foreground flex items-center justify-between">
                            <span>{plan.name}</span>
                            <span className="text-[10px] text-primary font-mono font-bold uppercase">{plan.badge}</span>
                          </div>
                          <div className="text-base font-extrabold text-foreground">₹{plan.monthlyPrice.toLocaleString("en-IN")} / mo</div>
                          <div className="text-[10px] text-muted-foreground">{plan.activeCampaigns}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-muted/40 border border-border text-[11px] text-muted-foreground flex items-center gap-2">
                    <ShieldCheck className="size-4 text-primary shrink-0" />
                    <span>Pure SaaS Model: Software subscription covers unlimited CRM leads and AI ad creation. 100% of your ad spend is paid directly to Meta/Google.</span>
                  </div>
                </div>
              )}

              {/* STEP 2: CREATIVE & DETAILS */}
              {step === 2 && (
                <div className="space-y-4">
                  {/* AI & Canva Quick Fill Toolbar */}
                  <div className="p-3.5 rounded-xl border border-border bg-card space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-foreground flex items-center gap-1.5">
                        <Wand2 className="size-3.5 text-primary" />
                        <span>AI & Canva Auto-Fill Presets</span>
                      </span>
                      <span className="text-[10px] text-muted-foreground font-mono">1-Click Apply</span>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      <button
                        type="button"
                        onClick={() => {
                          setCampaignName("Painless Root Canal Promotion");
                          setHeadline("Painless Root Canal & Smile Checkup — 30% Off");
                          setBodyText("Pain-free single-sitting RCT by certified specialists. Free digital OPG consultation within 5km.");
                        }}
                        className="px-2.5 py-1 rounded-lg border border-border bg-background hover:border-primary/50 text-[11px] font-semibold text-foreground transition-all cursor-pointer flex items-center gap-1"
                      >
                        <Sparkles className="size-3 text-primary" />
                        <span>Dental Clinic</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setCampaignName("Deluxe Hair Spa & Keratin Special");
                          setHeadline("Keratin & Deluxe Hair Spa — Flat ₹1,499 This Week");
                          setBodyText("Frizz-free, salon-finish hair in 60 minutes. Premium organic products used by senior stylists within 5km.");
                        }}
                        className="px-2.5 py-1 rounded-lg border border-border bg-background hover:border-primary/50 text-[11px] font-semibold text-foreground transition-all cursor-pointer flex items-center gap-1"
                      >
                        <Sparkles className="size-3 text-primary" />
                        <span>Salon & Spa</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setCampaignName("Fitness Transformation 3-Day Pass");
                          setHeadline("Transform Your Fitness: 3-Day Free Trial Pass");
                          setBodyText("Full gym floor access, cardio zone, certified personal trainers, and steam room. 5km neighborhood booking.");
                        }}
                        className="px-2.5 py-1 rounded-lg border border-border bg-background hover:border-primary/50 text-[11px] font-semibold text-foreground transition-all cursor-pointer flex items-center gap-1"
                      >
                        <Sparkles className="size-3 text-primary" />
                        <span>Gym & Fitness</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setCampaignName("Family Dinner Feast Special");
                          setHeadline("Artisan Wood-Fired Pizza & Pasta Feast");
                          setBodyText("Hand-stretched sourdough pizza baked at 450°C. Family dinner combos starting at ₹899 with mocktails.");
                        }}
                        className="px-2.5 py-1 rounded-lg border border-border bg-background hover:border-primary/50 text-[11px] font-semibold text-foreground transition-all cursor-pointer flex items-center gap-1"
                      >
                        <Sparkles className="size-3 text-primary" />
                        <span>Restaurant</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setCampaignName("Canva 9:16 Reel Visual Campaign");
                          setHeadline("Exclusive Local Neighborhood Special — Limited Slots");
                          setBodyText("Designed with Canva 1080x1920 Reel template. Direct WhatsApp consultation and booking.");
                        }}
                        className="px-2.5 py-1 rounded-lg border border-primary/30 bg-primary/5 hover:bg-primary/10 text-[11px] font-bold text-primary transition-all cursor-pointer flex items-center gap-1"
                      >
                        <Layers className="size-3 text-primary" />
                        <span>Canva 9:16 Preset</span>
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-foreground block text-xs">Campaign Title</label>
                    <input
                      type="text"
                      value={campaignName}
                      onChange={(e) => setCampaignName(e.target.value)}
                      placeholder="e.g. Painless Root Canal Promotion"
                      className="w-full p-2.5 rounded-xl border border-border bg-background text-xs text-foreground focus:outline-primary"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <label className="font-bold text-foreground">Ad Headline (60 Chars max)</label>
                      <span className="font-mono text-muted-foreground text-[11px]">{headline.length}/60</span>
                    </div>
                    <input
                      type="text"
                      maxLength={60}
                      value={headline}
                      onChange={(e) => setHeadline(e.target.value)}
                      placeholder="e.g. Painless Root Canal & Smile Checkup — 30% Off"
                      className="w-full p-2.5 rounded-xl border border-border bg-background text-xs text-foreground focus:outline-primary"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-foreground block text-xs">Offer Description & Key Specs</label>
                    <textarea
                      rows={3}
                      value={bodyText}
                      onChange={(e) => setBodyText(e.target.value)}
                      placeholder="e.g. Pain-free single-sitting RCT by certified MDS specialists. Free digital OPG consultation within 5km."
                      className="w-full p-2.5 rounded-xl border border-border bg-background text-xs text-foreground focus:outline-primary"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="font-bold text-foreground block text-xs">Target Location (5km Radius)</label>
                      <div className="relative">
                        <MapPin className="size-3.5 absolute left-3 top-3 text-muted-foreground" />
                        <input
                          type="text"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          className="w-full pl-9 pr-3 py-2 rounded-xl border border-border bg-background text-xs text-foreground focus:outline-primary"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-bold text-foreground block text-xs">Contact WhatsApp Phone</label>
                      <div className="relative">
                        <Phone className="size-3.5 absolute left-3 top-3 text-muted-foreground" />
                        <input
                          type="text"
                          value={contactPhone}
                          onChange={(e) => setContactPhone(e.target.value)}
                          className="w-full pl-9 pr-3 py-2 rounded-xl border border-border bg-background text-xs text-foreground focus:outline-primary"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1.5 pt-2 border-t border-border">
                    <div className="flex justify-between text-xs font-bold text-foreground">
                      <label>Daily Ad Budget (Billed directly to your card by Meta Ads / Google Ads)</label>
                      <span className="font-mono text-primary font-bold">₹{dailyBudget} / day</span>
                    </div>
                    <input
                      type="range"
                      min="200"
                      max="3000"
                      step="100"
                      value={dailyBudget}
                      onChange={(e) => setDailyBudget(Number(e.target.value))}
                      className="w-full accent-primary cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-muted-foreground font-mono">
                      <span>Min ₹200/day</span>
                      <span>Target: ~₹{(dailyBudget * 30).toLocaleString("en-IN")}/mo direct media spend</span>
                      <span>Max ₹3,000/day</span>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: PREVIEW */}
              {step === 3 && (
                <div className="space-y-4">
                  <div className="p-4 rounded-xl border border-border bg-background space-y-3">
                    <div className="flex items-center justify-between text-xs border-b border-border pb-2.5">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-foreground">{campaignName || "Draft Campaign"}</span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-primary/10 text-primary font-bold">
                          {channel}
                        </span>
                      </div>
                      <span className="text-[10px] text-muted-foreground">5km Geo-Fence</span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-card border border-border/80 space-y-2">
                      <div className="size-7 rounded-lg bg-primary text-primary-foreground font-black text-xs flex items-center justify-center">
                        A
                      </div>
                      <h4 className="font-bold text-sm text-foreground">{headline}</h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">{bodyText}</p>
                      <div className="pt-2 flex items-center justify-between text-[11px] text-muted-foreground border-t border-border/50">
                        <span>Delivery: {location}</span>
                        <span className="text-primary font-bold">
                          WhatsApp: {contactPhone}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-primary/10 border border-primary/20 text-primary text-xs flex items-center gap-2">
                    <MessageCircle className="size-4 shrink-0" />
                    <span>
                      Customer taps ad → Pre-filled WhatsApp inquiry opens with text: &ldquo;Hi! I saw your {headline} ad. Could you share details?&rdquo;
                    </span>
                  </div>
                </div>
              )}

              {/* STEP 4: FEE BREAKDOWN & CONFIRMATION */}
              {step === 4 && (
                <div className="space-y-5">
                  <div className="p-4 rounded-xl border border-border bg-background space-y-3">
                    <div className="font-bold text-sm text-foreground border-b border-border pb-2">
                      Transparent Cost Breakdown
                    </div>

                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">AdPulse Software Subscription ({currentPlan.name}):</span>
                        <strong className="font-mono text-foreground">₹{currentPlan.monthlyPrice.toLocaleString("en-IN")} / month</strong>
                      </div>
                      <div className="flex justify-between text-muted-foreground">
                        <span>Applicable 18% GST on Software:</span>
                        <span className="font-mono">₹{Math.round(currentPlan.monthlyPrice * 0.18).toLocaleString("en-IN")} / mo</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Direct Ad Spend Limit:</span>
                        <strong className="font-mono text-primary">₹{dailyBudget} / day (Billed to your card by Meta/Google)</strong>
                      </div>
                      <div className="flex justify-between font-extrabold text-foreground border-t border-border pt-2 text-sm">
                        <span>Total Monthly Software Fee:</span>
                        <span className="text-primary font-mono text-base">
                          ₹{(currentPlan.monthlyPrice + Math.round(currentPlan.monthlyPrice * 0.18)).toLocaleString("en-IN")} / mo incl. GST
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-muted/60 border border-border text-[11px] text-muted-foreground space-y-1">
                    <strong>Honest Integration Status:</strong> Clicking &ldquo;Save Campaign Draft&rdquo; stores your complete campaign payload securely in your workspace database. Live ad submission to Meta Ads and Google Ads will be activated once API credentials are authenticated.
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Wizard Bottom Controls */}
        {!successSaved && (
          <div className="flex items-center justify-between p-4 sm:p-5 border-t border-border bg-card">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep((prev) => Math.max(prev - 1, 1))}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-border bg-background text-foreground text-xs font-semibold hover:bg-muted cursor-pointer"
              >
                <ArrowLeft className="size-3.5" />
                <span>Back</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={onClose}
                className="px-3.5 py-2 rounded-xl border border-border text-muted-foreground hover:text-foreground text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>
            )}

            {step < 4 ? (
              <button
                type="button"
                onClick={handleNextStep}
                className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-bold shadow-xs hover:opacity-95 cursor-pointer"
              >
                <span>Continue</span>
                <ArrowRight className="size-3.5" />
              </button>
            ) : (
              <button
                type="button"
                disabled={isSaving}
                onClick={handleSaveDraft}
                className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-extrabold shadow-sm cursor-pointer disabled:opacity-50"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="size-3.5 animate-spin" />
                    <span>Saving Draft...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="size-3.5" />
                    <span>Save Campaign Draft</span>
                  </>
                )}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
