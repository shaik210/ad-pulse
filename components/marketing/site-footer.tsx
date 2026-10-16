import React from "react";
import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card py-12 px-4 sm:px-6 lg:px-8 text-xs text-muted-foreground font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Brand & Overview */}
          <div className="space-y-3 md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="relative flex items-center justify-center size-8 rounded-xl bg-primary text-primary-foreground font-black text-base shadow-xs">
                A
              </div>
              <span className="text-base font-extrabold tracking-tight text-foreground">
                AdPulse
              </span>
            </Link>
            <p className="text-muted-foreground text-xs leading-relaxed">
              The Local Advertising OS and Customer CRM for independent storefronts, clinics, salons, and service businesses.
            </p>
            <div className="text-[11px] text-muted-foreground/80 font-mono">
              © {new Date().getFullYear()} AdPulse Technologies.
            </div>
          </div>

          {/* Col 2: Solutions */}
          <div className="space-y-3">
            <div className="font-bold text-foreground uppercase tracking-wider text-[11px]">Platform OS</div>
            <ul className="space-y-2">
              <li>
                <Link href="/#how-it-works" className="hover:text-foreground transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/#crm-pipeline" className="hover:text-foreground transition-colors">
                  Lead CRM & Pipeline
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-foreground transition-colors">
                  Pricing Plans (from ₹1,499)
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-foreground transition-colors">
                  Customer Workspace
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Product Highlights */}
          <div className="space-y-3">
            <div className="font-bold text-foreground uppercase tracking-wider text-[11px]">Tools & Demos</div>
            <ul className="space-y-2">
              <li>
                <Link href="/demo" className="hover:text-foreground transition-colors">
                  Interactive Live Demo
                </Link>
              </li>
              <li>
                <Link href="/#roi-calculator" className="hover:text-foreground transition-colors">
                  Outcome & ROI Calculator
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="hover:text-foreground transition-colors">
                  Billing & Ad Spend FAQ
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-foreground transition-colors">
                  Feature Comparison Table
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Trust & Compliance */}
          <div className="space-y-3">
            <div className="font-bold text-foreground uppercase tracking-wider text-[11px]">Clear Notice</div>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              AdPulse connects with Meta (Facebook & Instagram) and Google. Ad spend is billed directly to your payment card by ad platforms with zero markup. Inquiries and revenue are projections based on assumptions, not guaranteed outcomes.
            </p>
          </div>
        </div>

        <div className="pt-6 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-muted-foreground text-center sm:text-left">
          <div>Local Advertising OS • Built for Indian storefronts, clinics & service businesses</div>
          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-3 sm:gap-4">
            <Link href="/" className="hover:text-foreground">Home</Link>
            <Link href="/#how-it-works" className="hover:text-foreground">How It Works</Link>
            <Link href="/pricing" className="hover:text-foreground">Pricing</Link>
            <Link href="/demo" className="hover:text-foreground">Live Demo</Link>
            <Link href="/dashboard" className="hover:text-foreground font-semibold">Workspace</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
