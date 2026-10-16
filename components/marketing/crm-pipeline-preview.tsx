"use client";

import React from "react";
import { MessageCircle } from "lucide-react";

export function CrmPipelinePreview() {
  return (
    <section id="lead-management" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 border-t border-border bg-card/40">
      <div className="max-w-6xl mx-auto space-y-10 sm:space-y-12">
        <div className="text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-primary">Inquiry Management</span>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-foreground">
            CRM & Lead Lifecycle
          </h2>
          <p className="text-muted-foreground text-sm max-w-2xl mx-auto">
            Track customer inquiries through a structured pipeline: New → Contacted → Qualified → Converted.
          </p>
        </div>

        {/* 4 Pipeline Stages */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs font-bold">
          <div className="p-4 rounded-xl border border-border bg-card space-y-1 shadow-2xs">
            <span className="size-2 rounded-full bg-primary/40 inline-block" />
            <div className="text-foreground font-extrabold">1. New</div>
            <div className="text-[10px] text-muted-foreground font-normal">Fresh Click-to-WhatsApp</div>
          </div>

          <div className="p-4 rounded-xl border border-border bg-card space-y-1 shadow-2xs">
            <span className="size-2 rounded-full bg-primary/60 inline-block" />
            <div className="text-foreground font-extrabold">2. Contacted</div>
            <div className="text-[10px] text-muted-foreground font-normal">Message / Pricing Sent</div>
          </div>

          <div className="p-4 rounded-xl border border-border bg-card space-y-1 shadow-2xs">
            <span className="size-2 rounded-full bg-primary/80 inline-block" />
            <div className="text-foreground font-extrabold">3. Qualified</div>
            <div className="text-[10px] text-muted-foreground font-normal">Budget & Slot Confirmed</div>
          </div>

          <div className="p-4 rounded-xl border border-border bg-card space-y-1 shadow-2xs">
            <span className="size-2 rounded-full bg-primary inline-block" />
            <div className="text-foreground font-extrabold">4. Converted</div>
            <div className="text-[10px] text-muted-foreground font-normal">Visit Completed & Paid</div>
          </div>
        </div>

        {/* Fictional Sample Lead Timeline Demonstration */}
        <div className="p-6 md:p-8 rounded-2xl border border-border bg-card shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border pb-4">
            <div>
              <h3 className="text-base font-bold text-foreground">Interactive Lead Record & Activity Timeline</h3>
              <p className="text-xs text-muted-foreground">Sample customer lead record showing attribution, notes, and next step follow-up.</p>
            </div>
            <span className="text-xs font-mono px-3 py-1 rounded-full bg-muted text-muted-foreground font-bold w-fit">
              Fictional Sample Lead Data • Demo Mode
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            <div className="p-4 rounded-xl border border-border bg-background space-y-3">
              <div className="flex items-center justify-between font-bold">
                <div className="flex items-center gap-2">
                  <span className="text-foreground text-sm">Ravi Patel</span>
                  <span className="px-2 py-0.5 rounded bg-primary/10 text-primary text-[10px] font-bold">
                    Stage: Contacted
                  </span>
                </div>
                <span className="text-muted-foreground font-mono text-[10px]">ID: ld-101</span>
              </div>

              <div className="text-muted-foreground space-y-1.5 pt-1">
                <div className="flex justify-between">
                  <span>Contact Phone:</span>
                  <strong className="font-mono text-foreground">+91 98765 43210</strong>
                </div>
                <div className="flex justify-between">
                  <span>Campaign Source:</span>
                  <strong className="text-primary font-semibold">Instagram Reel Ad (5km)</strong>
                </div>
                <div className="flex justify-between">
                  <span>Service Interest:</span>
                  <strong className="text-foreground">Root Canal Consultation</strong>
                </div>
                <div className="flex justify-between">
                  <span>Follow-Up Scheduled:</span>
                  <strong className="text-foreground">Tomorrow, 11:00 AM</strong>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-card border border-border text-muted-foreground italic text-[11px]">
                "Customer inquired about weekend slots, digital X-ray pricing, and clinic location."
              </div>

              <div className="pt-2 flex flex-wrap gap-2">
                <span className="px-3 py-1.5 rounded-lg bg-primary text-primary-foreground font-bold text-xs inline-flex items-center gap-1.5 cursor-default">
                  <MessageCircle className="size-3.5" />
                  <span>WhatsApp Lead Connected</span>
                </span>
                <span className="px-3 py-1.5 rounded-lg border border-border bg-card text-foreground font-semibold text-xs">
                  Schedule Follow-Up
                </span>
                <span className="px-3 py-1.5 rounded-lg border border-border bg-card text-foreground font-semibold text-xs">
                  + Add Consultation Note
                </span>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-border bg-background space-y-3">
              <div className="font-bold text-foreground">Chronological Activity Log</div>
              <div className="space-y-3 pt-1 text-[11px]">
                <div className="flex gap-2.5 border-l-2 border-primary pl-3 py-0.5">
                  <span className="text-muted-foreground font-mono text-[10px] shrink-0">10:14 AM</span>
                  <span className="text-foreground">Inquiry created via Click-to-WhatsApp ad on Instagram Reel.</span>
                </div>
                <div className="flex gap-2.5 border-l-2 border-primary pl-3 py-0.5">
                  <span className="text-muted-foreground font-mono text-[10px] shrink-0">10:18 AM</span>
                  <span className="text-foreground">Sent fee schedule and clinic location on WhatsApp.</span>
                </div>
                <div className="flex gap-2.5 border-l-2 border-primary/60 pl-3 py-0.5">
                  <span className="text-muted-foreground font-mono text-[10px] shrink-0">10:25 AM</span>
                  <span className="text-foreground">Stage moved to Contacted. Follow-up reminder set for tomorrow.</span>
                </div>
                <div className="flex gap-2.5 border-l-2 border-primary/30 pl-3 py-0.5">
                  <span className="text-muted-foreground font-mono text-[10px] shrink-0">Target</span>
                  <span className="text-muted-foreground italic">Mark Qualified upon slot confirmation.</span>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-muted/60 border border-border text-[11px] text-muted-foreground">
                <strong>Audience Note:</strong> Quick Blast customers receive instant notifications straight to their WhatsApp phone without managing this multi-step pipeline. Full CRM is included with Business Growth.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
