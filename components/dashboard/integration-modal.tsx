"use client";

import React, { useState } from "react";
import {
  X,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Shield,
  Loader2,
  Check,
  Copy,
  Info,
} from "lucide-react";
import { FacebookBlueIcon, GoogleIcon } from "@/components/marketing/shared-icons";

interface IntegrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  platform: "meta" | "google" | null;
}

export function IntegrationModal({
  isOpen,
  onClose,
  platform,
}: IntegrationModalProps) {
  const [adAccountId, setAdAccountId] = useState("");
  const [pageOrChannelName, setPageOrChannelName] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  if (!isOpen || !platform) return null;

  const isMeta = platform === "meta";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    // Simulate OAuth connection handshake
    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => {
        setSaveSuccess(false);
        onClose();
      }, 1500);
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      <div className="relative w-full max-w-lg rounded-3xl border border-border bg-card shadow-2xl p-6 sm:p-8 space-y-5 z-10 text-xs">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-border pb-4">
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
              Advertising Account Connection
            </span>
            <h2 className="text-lg font-extrabold text-foreground flex items-center gap-2">
              {isMeta ? (
                <>
                  <FacebookBlueIcon className="size-5" />
                  <span>Connect Meta Ads & Instagram</span>
                </>
              ) : (
                <>
                  <GoogleIcon className="size-5" />
                  <span>Connect Google Ads</span>
                </>
              )}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="size-8 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
          >
            <X className="size-4" />
          </button>
        </div>

        {saveSuccess ? (
          <div className="py-8 text-center space-y-3">
            <CheckCircle2 className="size-12 mx-auto text-primary animate-bounce" />
            <h3 className="text-base font-bold text-foreground">
              Account Connected Successfully!
            </h3>
            <p className="text-xs text-muted-foreground max-w-xs mx-auto">
              {isMeta
                ? "Your Meta Business Manager & WhatsApp account are now linked to this workspace."
                : "Your Google Ads account is now connected for local search & call campaigns."}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Guided Non-Technical Instructions */}
            <div className="p-3.5 rounded-xl bg-muted/40 border border-border space-y-2">
              <div className="font-bold text-foreground flex items-center gap-1.5">
                <Shield className="size-3.5 text-primary" />
                <span>How This Works:</span>
              </div>
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                {isMeta
                  ? "AdPulse connects via official Meta Graph API OAuth. You do NOT need developer tokens. AdPulse only requests permission to publish local ads and synchronize incoming WhatsApp inquiries."
                  : "AdPulse connects via official Google Ads OAuth 2.0. AdPulse only requests permission to publish local smart campaigns and measure incoming call conversions."}
              </p>
            </div>

            {/* Account Identifiers */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                {isMeta ? "Meta Business Page / Brand Name" : "Google Business Name / Location"}
              </label>
              <input
                type="text"
                required
                placeholder={isMeta ? "e.g. Apex Multi-Specialty Dental Clinic" : "e.g. Apex Dental Green Park"}
                value={pageOrChannelName}
                onChange={(e) => setPageOrChannelName(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-border bg-background text-foreground text-xs focus:outline-primary"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                {isMeta ? "Meta Ad Account ID (Optional)" : "Google Ads Customer ID (Optional)"}
              </label>
              <input
                type="text"
                placeholder={isMeta ? "e.g. act_1092837465098" : "e.g. 123-456-7890"}
                value={adAccountId}
                onChange={(e) => setAdAccountId(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-border bg-background text-foreground font-mono text-xs focus:outline-primary"
              />
            </div>

            <div className="p-3 rounded-xl bg-primary/10 border border-primary/20 text-primary text-[11px] flex items-start gap-2">
              <Info className="size-3.5 shrink-0 mt-0.5" />
              <span>
                <strong>Direct Ad Billing:</strong> All advertising spend is charged directly to your payment card saved in your {isMeta ? "Meta Ads Manager" : "Google Ads Account"}. AdPulse never takes a cut of your ad spend.
              </span>
            </div>

            <div className="pt-2 flex items-center justify-end gap-2.5 border-t border-border">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl border border-border hover:bg-muted text-foreground font-bold text-xs cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSaving}
                className="px-5 py-2 rounded-xl bg-primary text-primary-foreground font-bold text-xs shadow-xs hover:opacity-95 flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                {isSaving && <Loader2 className="size-3.5 animate-spin" />}
                <span>{isSaving ? "Connecting OAuth..." : isMeta ? "Authorize with Meta" : "Authorize with Google"}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
