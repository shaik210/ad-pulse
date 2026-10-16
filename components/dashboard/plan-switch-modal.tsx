"use client";

import React, { useState } from "react";
import {
  X,
  Check,
  Building2,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Loader2,
} from "lucide-react";

import { BUSINESS_SAAS_PLANS } from "@/lib/pricing";

interface PlanSwitchModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPlanId: string;
  onPlanChanged: (newPlanId: string) => void;
}

export function PlanSwitchModal({
  isOpen,
  onClose,
  currentPlanId,
  onPlanChanged,
}: PlanSwitchModalProps) {
  const [selectedPlan, setSelectedPlan] = useState(currentPlanId);
  const [isUpdating, setIsUpdating] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleConfirm = () => {
    setIsUpdating(true);
    setTimeout(() => {
      setIsUpdating(false);
      setSuccess(true);
      onPlanChanged(selectedPlan);
      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 1200);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      <div className="relative w-full max-w-2xl max-h-[92vh] sm:max-h-[90vh] overflow-y-auto rounded-2xl sm:rounded-3xl border border-border bg-card shadow-2xl p-4 sm:p-8 space-y-5 sm:space-y-6 z-10 text-xs">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-border pb-4 gap-3">
          <div className="space-y-1 min-w-0">
            <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
              Subscription Management
            </span>
            <h2 className="text-lg sm:text-xl font-extrabold text-foreground truncate">
              Select Business Growth Plan
            </h2>
            <p className="text-xs text-muted-foreground">
              Upgrade or adjust your recurring subscription tier. Billed monthly.
            </p>
          </div>
          <button
            onClick={onClose}
            className="size-8 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer shrink-0"
          >
            <X className="size-4" />
          </button>
        </div>

        {success ? (
          <div className="py-8 text-center space-y-3">
            <CheckCircle2 className="size-12 mx-auto text-primary animate-bounce" />
            <h3 className="text-base font-bold text-foreground">
              Workspace Plan Updated!
            </h3>
            <p className="text-xs text-muted-foreground">
              Your subscription tier has been changed successfully.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              {BUSINESS_SAAS_PLANS.map((plan) => {
                const isSelected = selectedPlan === plan.id;
                const isCurrent = currentPlanId === plan.id;

                return (
                  <div
                    key={plan.id}
                    onClick={() => setSelectedPlan(plan.id)}
                    className={`p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 sm:space-y-4 ${
                      isSelected
                        ? "border-primary bg-primary/5 shadow-md ring-2 ring-primary/20"
                        : "border-border bg-background hover:border-foreground/20"
                    }`}
                  >
                    <div className="space-y-2">
                      <div className="flex justify-between items-start">
                        <span className="text-[10px] font-bold text-primary uppercase">
                          {plan.badge}
                        </span>
                        {isCurrent && (
                          <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
                            Active
                          </span>
                        )}
                      </div>
                      <h3 className="font-bold text-sm text-foreground">{plan.name}</h3>
                      <div className="text-lg font-black text-foreground">
                        ₹{plan.monthlyPrice.toLocaleString("en-IN")}{" "}
                        <span className="text-[10px] font-normal text-muted-foreground">/mo</span>
                      </div>
                      <p className="text-[11px] text-muted-foreground leading-relaxed">
                        {plan.description}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-border/60 text-[11px] text-muted-foreground space-y-1">
                      <div>• {plan.workspaces}</div>
                      <div>• {plan.activeCampaigns}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="p-3.5 rounded-xl bg-muted/40 border border-border text-[11px] text-muted-foreground flex items-center gap-2">
              <ShieldCheck className="size-4 text-primary shrink-0" />
              <span>
                Plan changes take effect immediately. Advertising budget deployed to Meta/Google is billed separately directly to your corporate card.
              </span>
            </div>

            <div className="pt-4 border-t border-border flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-2.5 sm:gap-3">
              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto px-4 py-2 rounded-xl border border-border hover:bg-muted text-foreground font-bold text-xs cursor-pointer text-center"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirm}
                disabled={isUpdating || selectedPlan === currentPlanId}
                className="w-full sm:w-auto px-5 py-2 rounded-xl bg-primary text-primary-foreground font-bold text-xs shadow-xs hover:opacity-95 flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50 text-center"
              >
                {isUpdating && <Loader2 className="size-3.5 animate-spin" />}
                <span>{selectedPlan === currentPlanId ? "Current Plan" : "Confirm Plan Change"}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
