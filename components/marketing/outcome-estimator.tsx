"use client";

import React, { useState } from "react";
import { Calculator } from "lucide-react";

interface OutcomeEstimatorProps {
  initialBudget?: number;
  minBudget?: number;
  maxBudget?: number;
  stepBudget?: number;
  title?: string;
  subtitle?: string;
}

export function OutcomeEstimator({
  initialBudget = 5000,
  minBudget = 1000,
  maxBudget = 50000,
  stepBudget = 500,
  title = "Campaign Outcome Estimator",
  subtitle = "Test hypothetical campaign scenarios based on your advertising budget and editable market assumptions.",
}: OutcomeEstimatorProps) {
  const [calcBudget, setCalcBudget] = useState<number>(initialBudget);
  const [calcChannel, setCalcChannel] = useState<string>("meta-reels");
  const [calcCpc, setCalcCpc] = useState<number>(12);
  const [calcConvRate, setCalcConvRate] = useState<number>(8); // 8% click to lead

  // Numerical Computations with division-by-zero protection
  const safeBudget = Math.max(0, calcBudget || 0);
  const safeCpc = Math.max(0.5, calcCpc || 0.5);
  const safeConvRate = Math.max(0, Math.min(100, calcConvRate || 0));

  const estimatedClicks = safeCpc > 0 ? Math.floor(safeBudget / safeCpc) : 0;
  const estimatedLeads = Math.floor(estimatedClicks * (safeConvRate / 100));
  const estimatedMediaCostPerLead =
    estimatedLeads > 0 ? Math.round(safeBudget / estimatedLeads) : 0;

  return (
    <section id="roi-calculator" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 border-t border-border bg-card/40">
      <div className="max-w-5xl mx-auto space-y-10 sm:space-y-12">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold border border-primary/20">
            <Calculator className="size-3.5" /> Interactive Math Estimator
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-foreground">
            {title}
          </h2>
          <p className="text-muted-foreground text-sm max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Calculator Interactive Box */}
        <div className="rounded-2xl border border-border bg-card shadow-lg p-6 sm:p-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* Left Column: Editable Inputs */}
            <div className="space-y-5">
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold text-foreground">
                  <label htmlFor="budget-input">1. Advertising Media Budget (₹)</label>
                  <span className="font-mono text-primary text-sm font-extrabold">
                    ₹{safeBudget.toLocaleString("en-IN")}
                  </span>
                </div>
                <input
                  id="budget-input"
                  type="range"
                  min={minBudget}
                  max={maxBudget}
                  step={stepBudget}
                  value={safeBudget}
                  onChange={(e) => setCalcBudget(Number(e.target.value))}
                  className="w-full accent-primary cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-muted-foreground font-mono">
                  <span>₹{minBudget.toLocaleString("en-IN")} (Min)</span>
                  <span>₹{Math.round((minBudget + maxBudget) / 2).toLocaleString("en-IN")}</span>
                  <span>₹{maxBudget.toLocaleString("en-IN")} (Max)</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="channel-select" className="text-xs font-bold text-foreground block">
                  2. Advertising Channel Focus
                </label>
                <select
                  id="channel-select"
                  value={calcChannel}
                  onChange={(e) => setCalcChannel(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-border bg-background text-xs font-semibold text-foreground focus:outline-primary"
                >
                  <option value="meta-reels">Instagram Reels (9:16 Vertical Video)</option>
                  <option value="meta-feed">Instagram & Facebook Feed (1:1 / 16:9)</option>
                  <option value="google-search">Google Search Local Call Ads</option>
                  <option value="multi-channel">Multi-Channel Blend (Meta + Google)</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div className="space-y-1.5">
                  <label htmlFor="cpc-input" className="text-xs font-bold text-foreground block">
                    3. Assumed Cost Per Click (₹)
                  </label>
                  <input
                    id="cpc-input"
                    type="number"
                    min="1"
                    max="100"
                    value={calcCpc}
                    onChange={(e) => setCalcCpc(Math.max(1, Number(e.target.value)))}
                    className="w-full p-2.5 rounded-xl border border-border bg-background font-mono text-xs text-foreground focus:outline-primary"
                  />
                  <span className="text-[10px] text-muted-foreground block">
                    Typical local range: ₹8 - ₹25
                  </span>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="conv-input" className="text-xs font-bold text-foreground block">
                    4. Assumed Click-to-Lead Rate (%)
                  </label>
                  <input
                    id="conv-input"
                    type="number"
                    min="1"
                    max="50"
                    value={calcConvRate}
                    onChange={(e) => setCalcConvRate(Math.max(0, Number(e.target.value)))}
                    className="w-full p-2.5 rounded-xl border border-border bg-background font-mono text-xs text-foreground focus:outline-primary"
                  />
                  <span className="text-[10px] text-muted-foreground block">
                    Typical WhatsApp CTR: 5% - 12%
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Calculated Outputs Display */}
            <div className="p-5 sm:p-6 rounded-2xl bg-muted/50 border border-border space-y-5">
              <div className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider flex items-center justify-between border-b border-border pb-3">
                <span>Mathematical Projection</span>
                <span className="text-[10px] font-mono font-bold text-primary">Live Formula</span>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs text-muted-foreground">Estimated Ad Clicks:</div>
                    <span className="text-[10px] text-muted-foreground font-mono">Budget ÷ Assumed CPC</span>
                  </div>
                  <div className="text-2xl font-black text-foreground font-mono">
                    ~{estimatedClicks.toLocaleString("en-IN")}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-border/60">
                  <div>
                    <div className="text-xs text-muted-foreground">Estimated Customer Inquiries:</div>
                    <span className="text-[10px] text-muted-foreground font-mono">Clicks × Conversion Rate</span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-primary font-mono">
                    ~{estimatedLeads.toLocaleString("en-IN")}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-border/60">
                  <div>
                    <div className="text-xs text-muted-foreground">Illustrative Media Cost Per Inquiry:</div>
                    <span className="text-[10px] text-muted-foreground font-mono">Excluding Software/Service Fees</span>
                  </div>
                  <div className="text-xl font-extrabold text-foreground font-mono">
                    {estimatedLeads > 0 ? `₹${estimatedMediaCostPerLead}` : "—"}
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-border text-[11px] text-muted-foreground space-y-1">
                <strong>Important Disclaimer:</strong> These figures are illustrative mathematical projections based on your editable assumptions, not a guarantee or verified prediction. Actual ad platform performance varies by market competition, creative quality, customer response, and platform review. Inquiries may be zero.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
