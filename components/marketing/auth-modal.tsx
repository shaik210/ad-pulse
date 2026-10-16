"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { X, Mail, User, Building, ArrowRight, CheckCircle2, Lock, Sparkles } from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMode?: "login" | "signup";
}

export function AuthModal({ isOpen, onClose, defaultMode = "login" }: AuthModalProps) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [mode, setMode] = useState<"login" | "signup">(defaultMode);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Sync mode with defaultMode when modal is opened
  useEffect(() => {
    setMode(defaultMode);
    setError(null);
    setSuccess(false);
  }, [defaultMode, isOpen]);

  // Lock body scroll and listen for Escape key while modal is open
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !mounted) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          name: mode === "signup" ? name : undefined,
          businessName: mode === "signup" ? businessName : undefined,
          mode: "growth",
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Authentication failed. Please check your details.");
      }

      setSuccess(true);
      setTimeout(() => {
        onClose();
        router.push("/dashboard");
        router.refresh();
      }, 700);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-[99999] overflow-y-auto bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 text-center">
        {/* Backdrop Click Dismiss */}
        <div
          className="fixed inset-0 z-0"
          onClick={onClose}
        />

        {/* Centered Modal Card */}
        <div className="relative z-10 w-full max-w-md bg-card border border-border rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6 text-left animate-in zoom-in-95 duration-200 my-auto">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 sm:top-5 sm:right-5 size-8 flex items-center justify-center rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="size-4" />
          </button>

        {/* Header Branding & Mode Toggle */}
        <div className="space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="size-9 rounded-xl bg-primary text-primary-foreground font-black text-base flex items-center justify-center shadow-xs">
              A
            </div>
            <div>
              <span className="font-extrabold text-foreground tracking-tight text-lg">AdPulse</span>
              <span className="text-[10px] text-muted-foreground block font-medium">Customer Workspace</span>
            </div>
          </div>

          <div className="flex p-1 rounded-xl bg-muted border border-border/60 text-xs font-bold">
            <button
              type="button"
              onClick={() => {
                setMode("login");
                setError(null);
              }}
              className={`flex-1 py-2 rounded-lg transition-all cursor-pointer ${
                mode === "login"
                  ? "bg-card text-foreground shadow-xs font-extrabold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Log In
            </button>
            <button
              type="button"
              onClick={() => {
                setMode("signup");
                setError(null);
              }}
              className={`flex-1 py-2 rounded-lg transition-all cursor-pointer ${
                mode === "signup"
                  ? "bg-primary text-primary-foreground shadow-xs font-extrabold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Sign Up
            </button>
          </div>
        </div>

        {/* Title */}
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-foreground">
            {mode === "login" ? "Welcome back" : "Create your account"}
          </h2>
          <p className="text-xs text-muted-foreground mt-1">
            {mode === "login"
              ? "Enter your email to access your campaign dashboard and WhatsApp leads."
              : "Get started with local ads and customer inquiries in under 2 minutes."}
          </p>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-muted border border-border text-foreground text-xs font-semibold">
            {error}
          </div>
        )}

        {success && (
          <div className="p-3 rounded-xl bg-primary/10 border border-primary/30 text-primary text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="size-4 shrink-0" />
            <span>Success! Redirecting to your workspace...</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "signup" && (
            <>
              {/* Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-foreground">Your Name</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. Rajesh Sharma"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-xs placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
              </div>

              {/* Business Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-foreground">Shop / Clinic / Business Name</label>
                <div className="relative">
                  <Building className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Apex Dental Care"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-xs placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
              </div>
            </>
          )}

          {/* Email */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-foreground">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <input
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-xs placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
          </div>

          {/* Submit CTA */}
          <button
            type="submit"
            disabled={loading || success}
            className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-extrabold text-xs shadow-md hover:opacity-95 transition-opacity flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {loading ? (
              <span>Please wait...</span>
            ) : mode === "login" ? (
              <>
                <span>Enter Workspace</span>
                <ArrowRight className="size-3.5" />
              </>
            ) : (
              <>
                <span>Create Workspace</span>
                <ArrowRight className="size-3.5" />
              </>
            )}
          </button>
        </form>

        {/* Footer info */}
        <div className="pt-2 text-center text-[11px] text-muted-foreground">
          {mode === "login" ? (
            <span>
              Don&apos;t have an account yet?{" "}
              <button
                type="button"
                onClick={() => {
                  setMode("signup");
                  setError(null);
                }}
                className="font-bold text-primary hover:underline cursor-pointer"
              >
                Sign up free
              </button>
            </span>
          ) : (
            <span>
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => {
                  setMode("login");
                  setError(null);
                }}
                className="font-bold text-primary hover:underline cursor-pointer"
              >
                Log in
              </button>
            </span>
          )}
        </div>
      </div>
    </div>
  </div>,
  document.body
);
}
