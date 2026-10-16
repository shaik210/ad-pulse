"use client";

import React, { useState } from "react";
import {
  X,
  Megaphone,
  MapPin,
  Phone,
  Calendar,
  CreditCard,
  CheckCircle2,
  AlertCircle,
  Play,
  Pause,
  Trash2,
  ExternalLink,
  MessageCircle,
  Share2,
  ShieldCheck,
} from "lucide-react";

export interface CampaignDetailsItem {
  id: string;
  name: string;
  type: "growth" | "quickblast" | "business" | string;
  category?: string;
  channel: string;
  headline?: string;
  body?: string;
  location?: string;
  radiusKm?: number;
  contactPhone?: string;
  status: "Active" | "Paused" | "Completed" | "Draft";
  statusMessage?: string;
  budgetAmount?: number;
  budgetPeriod?: "daily" | "flat_one_time";
  platformFee?: number;
  adSpendAllowance?: number;
  inquiries?: number;
  cpi?: string;
  createdAt?: string;
}

interface CampaignDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  campaign: CampaignDetailsItem | null;
  onToggleStatus?: (id: string, newStatus: "Active" | "Paused") => void;
  onDelete?: (id: string) => void;
}

export function CampaignDetailsModal({
  isOpen,
  onClose,
  campaign,
  onToggleStatus,
  onDelete,
}: CampaignDetailsModalProps) {
  const [activePreviewTab, setActivePreviewTab] = useState<"creative" | "budget" | "settings">("creative");

  if (!isOpen || !campaign) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div
        className="fixed inset-0"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-2xl max-h-[92vh] sm:max-h-[90vh] overflow-y-auto rounded-2xl sm:rounded-3xl border border-border bg-card shadow-2xl p-4 sm:p-8 space-y-5 sm:space-y-6 z-10 text-xs">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-border pb-4 gap-3">
          <div className="space-y-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full font-bold text-[10px] uppercase tracking-wider bg-primary/10 text-primary">
                Local Business Campaign
              </span>
              <span
                className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                  campaign.status === "Active"
                    ? "bg-primary/10 text-primary"
                    : campaign.status === "Draft"
                    ? "bg-muted text-muted-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {campaign.status}
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-extrabold text-foreground truncate">{campaign.name}</h2>
            <div className="text-muted-foreground text-[11px] font-mono">
              Campaign ID: {campaign.id}
            </div>
          </div>

          <button
            onClick={onClose}
            className="size-8 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer shrink-0"
            aria-label="Close dialog"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex overflow-x-auto no-scrollbar border-b border-border gap-4 sm:gap-6 text-xs font-bold whitespace-nowrap -mx-1 px-1 sm:mx-0 sm:px-0">
          <button
            onClick={() => setActivePreviewTab("creative")}
            className={`pb-2.5 border-b-2 transition-all cursor-pointer ${
              activePreviewTab === "creative"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            Ad Creative & Copy
          </button>
          <button
            onClick={() => setActivePreviewTab("budget")}
            className={`pb-2.5 border-b-2 transition-all cursor-pointer ${
              activePreviewTab === "budget"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            Budget & Fee Breakdown
          </button>
          <button
            onClick={() => setActivePreviewTab("settings")}
            className={`pb-2.5 border-b-2 transition-all cursor-pointer ${
              activePreviewTab === "settings"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            Targeting & Delivery Status
          </button>
        </div>

        {/* TAB 1: CREATIVE & COPY */}
        {activePreviewTab === "creative" && (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl border border-border bg-background space-y-3">
              <div className="flex justify-between items-center text-muted-foreground text-[11px]">
                <span>Channel: <strong className="text-foreground">{campaign.channel}</strong></span>
                <span>Category: <strong className="text-foreground">{campaign.category || "Local Business"}</strong></span>
              </div>

              <div className="space-y-1 pt-2 border-t border-border/60">
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Ad Headline</span>
                <p className="text-sm font-bold text-foreground">
                  {campaign.headline || campaign.name}
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Body Copy</span>
                <p className="text-xs text-muted-foreground leading-relaxed whitespace-pre-line">
                  {campaign.body || "No custom description specified. Automated local delivery enabled."}
                </p>
              </div>

              {campaign.contactPhone && (
                <div className="pt-2 border-t border-border/60 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Phone className="size-3.5 text-primary" />
                    <span>WhatsApp Inquiry Target:</span>
                    <strong className="text-foreground font-mono">{campaign.contactPhone}</strong>
                  </div>

                  <a
                    href={`https://wa.me/${campaign.contactPhone.replace(/[^0-9]/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-[10px] transition-colors"
                  >
                    <MessageCircle className="size-3" /> Test Chat
                  </a>
                </div>
              )}
            </div>

            {/* Status notice */}
            {campaign.statusMessage && (
              <div className="p-3.5 rounded-xl bg-muted/60 border border-border text-foreground flex items-start gap-2">
                <AlertCircle className="size-4 shrink-0 mt-0.5 text-primary" />
                <span className="leading-relaxed text-xs">{campaign.statusMessage}</span>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: BUDGET & FEE BREAKDOWN */}
        {activePreviewTab === "budget" && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-border bg-background space-y-1">
                <span className="text-[10px] font-bold uppercase text-muted-foreground">AdPulse Software Subscription</span>
                <div className="text-xl font-black text-foreground">
                  ₹{campaign.platformFee ? campaign.platformFee.toLocaleString("en-IN") : "2,499"}{" "}
                  <span className="text-xs font-normal text-muted-foreground">/ month</span>
                </div>
                <p className="text-[11px] text-muted-foreground">
                  Includes AI creative formats, 5km geo-fence targeting, and WhatsApp lead CRM.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-border bg-background space-y-1">
                <span className="text-[10px] font-bold uppercase text-primary">
                  Direct Ad Network Spend
                </span>
                <div className="text-xl font-black text-foreground">
                  ₹{campaign.budgetAmount ? campaign.budgetAmount.toLocaleString("en-IN") : "500"}{" "}
                  <span className="text-xs font-normal text-muted-foreground">
                    {campaign.budgetPeriod === "flat_one_time" ? "one-time" : "/ day"}
                  </span>
                </div>
                <p className="text-[11px] text-muted-foreground">
                  Paid directly by your credit/debit card to Meta Ads and Google Ads.
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-muted/40 border border-border text-[11px] text-muted-foreground flex items-start gap-2">
              <ShieldCheck className="size-4 text-primary shrink-0 mt-0.5" />
              <span>
                <strong>0% Markup Guarantee:</strong> AdPulse operates exclusively on transparent software subscription tiers. 100% of your advertising budget is billed directly by Meta and Google without markups or agency commissions.
              </span>
            </div>
          </div>
        )}

        {/* TAB 3: TARGETING & SETTINGS */}
        {activePreviewTab === "settings" && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl border border-border bg-background space-y-3">
              <div className="flex items-center gap-2">
                <MapPin className="size-4 text-primary" />
                <span className="font-bold text-foreground">Local Geo-Fencing:</span>
              </div>
              <div className="pl-6 space-y-1 text-muted-foreground">
                <div>Center: <strong className="text-foreground">{campaign.location || "Default Business Location"}</strong></div>
                <div>Radius: <strong className="text-foreground">{campaign.radiusKm || 5} km circular radius</strong></div>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-border bg-background space-y-2">
              <span className="font-bold text-foreground block">Ad Network Credential Notice</span>
              <p className="text-muted-foreground text-[11px] leading-relaxed">
                Live delivery to Meta & Google requires OAuth app verification. In the current MVP phase, campaigns are saved as drafts and simulated in your workspace.
              </p>
            </div>
          </div>
        )}

        {/* Footer Actions */}
        <div className="pt-4 border-t border-border flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            {campaign.status !== "Draft" && onToggleStatus && (
              <button
                onClick={() =>
                  onToggleStatus(
                    campaign.id,
                    campaign.status === "Active" ? "Paused" : "Active"
                  )
                }
                className="flex-1 sm:flex-initial px-4 py-2 rounded-xl border border-border text-foreground hover:bg-muted font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
              >
                {campaign.status === "Active" ? (
                  <>
                    <Pause className="size-3.5 text-muted-foreground" />
                    <span>Pause Campaign</span>
                  </>
                ) : (
                  <>
                    <Play className="size-3.5 text-primary" />
                    <span>Resume Campaign</span>
                  </>
                )}
              </button>
            )}

            {onDelete && (
              <button
                onClick={() => {
                  if (confirm("Are you sure you want to delete this campaign draft?")) {
                    onDelete(campaign.id);
                    onClose();
                  }
                }}
                className="flex-1 sm:flex-initial px-3.5 py-2 rounded-xl border border-red-500/20 text-red-600 dark:text-red-400 hover:bg-red-500/10 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
              >
                <Trash2 className="size-3.5" />
                <span>Delete Draft</span>
              </button>
            )}
          </div>

          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2 rounded-xl bg-primary text-primary-foreground font-bold text-xs shadow-xs hover:opacity-95 cursor-pointer text-center"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
}
