"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sun,
  Moon,
  KeyRound,
  ArrowRight,
  Menu,
  X,
  ChevronDown,
  UserPlus,
} from "lucide-react";
import { AuthModal } from "@/components/marketing/auth-modal";

export function SiteHeader() {
  const [isDark, setIsDark] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<"login" | "signup">("login");
  const pathname = usePathname();

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (saved === "dark" || (!saved && prefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDark(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    if (nextDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const isHome = pathname === "/";
  const isPricing = pathname === "/pricing";
  const isDemo = pathname === "/demo";

  return (
    <header className="sticky top-0 z-50 h-16 border-b border-border bg-card/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto h-full flex items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 sm:gap-3 shrink-0 group">
          <div className="flex items-center justify-center size-9 rounded-xl bg-primary text-primary-foreground font-black text-lg shadow-xs group-hover:scale-105 transition-transform">
            A
          </div>
          <div className="flex flex-col">
            <span className="text-base sm:text-lg font-extrabold tracking-tight text-foreground leading-none">
              AdPulse
            </span>
            <span className="text-[9px] sm:text-[10px] font-semibold tracking-wider text-muted-foreground uppercase mt-0.5">
              Local Advertising OS & CRM
            </span>
          </div>
        </Link>

        {/* Semantic Responsive Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1.5 xl:gap-2.5 text-xs font-semibold text-muted-foreground">
          <Link
            href="/"
            className={`px-2.5 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
              isHome
                ? "text-foreground font-bold bg-muted/70"
                : "hover:text-foreground hover:bg-muted/60"
            }`}
          >
            Overview
          </Link>

          <Link
            href="/#how-it-works"
            className="px-2.5 py-1.5 rounded-lg whitespace-nowrap transition-colors hover:text-foreground hover:bg-muted/60"
          >
            How It Works
          </Link>

          <Link
            href="/#crm-pipeline"
            className="px-2.5 py-1.5 rounded-lg whitespace-nowrap transition-colors hover:text-foreground hover:bg-muted/60"
          >
            CRM & Leads
          </Link>

          <Link
            href="/pricing"
            className={`px-2.5 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
              isPricing
                ? "text-primary font-bold bg-primary/10"
                : "hover:text-foreground hover:bg-muted/60"
            }`}
          >
            Pricing
          </Link>

          <Link
            href="/demo"
            className={`px-2.5 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
              isDemo
                ? "text-primary font-bold bg-primary/10"
                : "hover:text-foreground hover:bg-muted/60"
            }`}
          >
            Live Demo
          </Link>
        </nav>

        {/* Action CTAs: Log In, Sign Up, and Theme Toggle */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* Log In Button */}
          <button
            onClick={() => {
              setAuthModalMode("login");
              setAuthModalOpen(true);
            }}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted font-bold text-xs transition-colors cursor-pointer shrink-0"
          >
            <KeyRound className="size-3.5" />
            <span>Log In</span>
          </button>

          {/* Sign Up Button */}
          <button
            onClick={() => {
              setAuthModalMode("signup");
              setAuthModalOpen(true);
            }}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-primary text-primary-foreground font-bold text-xs shadow-xs hover:opacity-95 transition-opacity cursor-pointer shrink-0"
          >
            <span>Sign Up</span>
            <ArrowRight className="size-3.5" />
          </button>

          <div className="h-4 w-px bg-border/80 mx-0.5 hidden sm:block" />

          {/* Theme Toggle (Right side, discreet icon) */}
          <button
            onClick={toggleTheme}
            className="size-9 flex items-center justify-center rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer shrink-0"
            aria-label="Toggle light or dark theme"
            title="Toggle color theme"
          >
            {isDark ? <Sun className="size-4 text-foreground" /> : <Moon className="size-4 text-muted-foreground" />}
          </button>

          {/* Mobile Drawer Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden size-9 flex items-center justify-center rounded-xl border border-border text-foreground hover:bg-muted transition-colors shrink-0 cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer with Backdrop Overlay */}
      {mobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 top-16 bg-black/40 backdrop-blur-xs z-40 lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed inset-x-0 top-16 z-50 bg-card border-b border-border p-5 sm:p-6 shadow-2xl space-y-4 max-h-[calc(100vh-4rem)] overflow-y-auto animate-in slide-in-from-top-2 lg:hidden">
            <nav className="flex flex-col space-y-1 text-xs font-semibold text-muted-foreground border-b border-border pb-4">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2.5 rounded-lg transition-colors flex items-center justify-between ${
                  isHome ? "text-foreground font-bold bg-muted" : "hover:bg-muted hover:text-foreground"
                }`}
              >
                <span>Overview</span>
                <ChevronDown className="size-3.5 -rotate-90 text-muted-foreground/60" />
              </Link>

              <Link
                href="/#how-it-works"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-lg transition-colors flex items-center justify-between hover:bg-muted hover:text-foreground"
              >
                <span>How It Works</span>
                <ChevronDown className="size-3.5 -rotate-90 text-muted-foreground/60" />
              </Link>

              <Link
                href="/#crm-pipeline"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-lg transition-colors flex items-center justify-between hover:bg-muted hover:text-foreground"
              >
                <span>CRM & Leads</span>
                <ChevronDown className="size-3.5 -rotate-90 text-muted-foreground/60" />
              </Link>

              <Link
                href="/pricing"
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2.5 rounded-lg transition-colors flex items-center justify-between ${
                  isPricing ? "text-primary font-bold bg-primary/10" : "hover:bg-muted hover:text-foreground"
                }`}
              >
                <span>Pricing</span>
                <ChevronDown className="size-3.5 -rotate-90 text-muted-foreground/60" />
              </Link>

              <Link
                href="/demo"
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2.5 rounded-lg transition-colors flex items-center justify-between ${
                  isDemo ? "text-primary font-bold bg-primary/10" : "hover:bg-muted hover:text-foreground"
                }`}
              >
                <span>Live Demo</span>
                <ChevronDown className="size-3.5 -rotate-90 text-muted-foreground/60" />
              </Link>
            </nav>

            <div className="flex flex-col gap-2.5 pt-1">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setAuthModalMode("login");
                  setAuthModalOpen(true);
                }}
                className="w-full py-2.5 rounded-xl border border-border bg-card text-foreground font-bold text-xs text-center flex items-center justify-center gap-2 hover:bg-muted transition-colors cursor-pointer"
              >
                <KeyRound className="size-4 text-muted-foreground" />
                <span>Log In</span>
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setAuthModalMode("signup");
                  setAuthModalOpen(true);
                }}
                className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-bold text-xs text-center flex items-center justify-center gap-2 shadow-xs hover:opacity-95 transition-opacity cursor-pointer"
              >
                <span>Sign Up</span>
                <ArrowRight className="size-4" />
              </button>
            </div>
          </div>
        </>
      )}

      {/* Interactive Authentication Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        defaultMode={authModalMode}
      />
    </header>
  );
}
