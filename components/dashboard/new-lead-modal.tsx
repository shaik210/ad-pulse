"use client";

import React, { useState } from "react";
import { X, UserPlus, Phone, Mail, Tag, AlertCircle, Loader2 } from "lucide-react";

interface NewLeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLeadCreated: (lead: any) => void;
}

export function NewLeadModal({ isOpen, onClose, onLeadCreated }: NewLeadModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [interest, setInterest] = useState("");
  const [source, setSource] = useState("Instagram Reel Ad");
  const [stage, setStage] = useState<"New" | "Contacted" | "Qualified">("New");
  const [notes, setNotes] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!name.trim()) {
      setErrorMessage("Please enter customer name.");
      return;
    }
    if (!phone.trim() || phone.trim().length < 8) {
      setErrorMessage("Please enter a valid phone number (at least 8 digits).");
      return;
    }

    setIsSaving(true);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          email: email.trim() || undefined,
          source,
          stage,
          interest: interest.trim() || "General Service Inquiry",
          notes: notes.trim() || undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to create customer lead record");
      }

      onLeadCreated(data.lead);
      onClose();
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : "Error creating lead.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs font-sans animate-in fade-in">
      <div className="w-full max-w-md bg-card border border-border rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-border bg-muted/30">
          <div className="flex items-center gap-2">
            <UserPlus className="size-4 text-primary" />
            <h3 className="font-bold text-sm text-foreground">Add New Customer Inquiry</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-muted-foreground hover:text-foreground">
            <X className="size-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4 text-xs">
          {errorMessage && (
            <div className="p-3 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive flex items-center gap-2">
              <AlertCircle className="size-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <div className="space-y-1">
            <label className="font-bold text-foreground block">Customer Full Name *</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Vikram Malhotra"
              className="w-full p-2.5 rounded-xl border border-border bg-background text-foreground focus:outline-primary"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="font-bold text-foreground block">Contact Phone *</label>
              <div className="relative">
                <Phone className="size-3.5 absolute left-3 top-3 text-muted-foreground" />
                <input
                  type="text"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-border bg-background text-foreground focus:outline-primary"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-foreground block">Email (Optional)</label>
              <div className="relative">
                <Mail className="size-3.5 absolute left-3 top-3 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="vikram@example.com"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-border bg-background text-foreground focus:outline-primary"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="font-bold text-foreground block">Inquiry Source</label>
              <select
                value={source}
                onChange={(e) => setSource(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-border bg-background text-foreground focus:outline-primary"
              >
                <option value="Instagram Reel Ad">Instagram Reel Ad</option>
                <option value="Google Search Ad">Google Search Ad</option>
                <option value="7-Day Quick Blast">7-Day Quick Blast</option>
                <option value="Direct WhatsApp Referral">Direct WhatsApp Referral</option>
                <option value="Walk-in Consultation">Walk-in Consultation</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-foreground block">Initial Stage</label>
              <select
                value={stage}
                onChange={(e) => setStage(e.target.value as any)}
                className="w-full p-2.5 rounded-xl border border-border bg-background text-foreground focus:outline-primary"
              >
                <option value="New">1. New</option>
                <option value="Contacted">2. Contacted</option>
                <option value="Qualified">3. Qualified</option>
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-bold text-foreground block">Service or Offer Interest</label>
            <input
              type="text"
              value={interest}
              onChange={(e) => setInterest(e.target.value)}
              placeholder="e.g. Root Canal Treatment, 3BHK Rental, Hair Spa"
              className="w-full p-2.5 rounded-xl border border-border bg-background text-foreground focus:outline-primary"
            />
          </div>

          <div className="space-y-1">
            <label className="font-bold text-foreground block">Consultation Notes</label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Inquired about weekend appointment availability."
              className="w-full p-2.5 rounded-xl border border-border bg-background text-foreground focus:outline-primary"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-2 border-t border-border">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-2 rounded-xl border border-border text-muted-foreground hover:text-foreground text-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="px-5 py-2 rounded-xl bg-primary text-primary-foreground font-bold text-xs shadow-xs hover:opacity-95 disabled:opacity-50 flex items-center gap-1.5"
            >
              {isSaving ? <Loader2 className="size-3.5 animate-spin" /> : null}
              <span>Save Lead Record</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
