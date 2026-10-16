"use client";

import React, { useState } from "react";
import {
  Eye,
  MessageCircle,
  MoreHorizontal,
  Sparkles,
  ArrowRight,
  Heart,
  MessageSquare,
  Send,
  Bookmark,
  VolumeX,
  Play,
  Globe,
  Star,
  Phone,
  CheckCheck,
  Stethoscope,
  Utensils,
  Car,
  Scissors,
  Tag,
  Calendar,
  Info,
  Dumbbell,
  GraduationCap,
} from "lucide-react";

import {
  FacebookBlueIcon,
  InstagramGradientIcon,
  MetaColorIcon,
  GoogleIcon,
} from "./shared-icons";

export type PreviewSegment = "all" | "growth" | "quickblast";
export type SampleKey =
  | "dental"
  | "salon"
  | "restaurant"
  | "fitness"
  | "retail"
  | "coaching"
  | "auto"
  | "eyecare";

export interface SampleAd {
  segment: "growth";
  categoryLabel: string;
  audienceBadge: string;
  businessName: string;
  handle: string;
  headline: string;
  body: string;
  offer: string;
  cta: string;
  phone: string;
  query: string;
  likes: string;
  comments: string;
  radiusText: string;
  tagline: string;
  specs: string[];
  priceBadge: string;
  incomingWhatsAppMessage: string;
  rating: string;
  openHours: string;
  accentBg: string;
  accentText: string;
  accentBorder: string;
}

export const sampleAdsData: Record<SampleKey, SampleAd> = {
  fitness: {
    segment: "growth",
    categoryLabel: "Gym & Fitness Studio",
    audienceBadge: "Local Business OS",
    businessName: "IronPulse Fitness Studio",
    handle: "ironpulse_gym",
    headline: "Transform Your Fitness: 3-Day Free Trial Pass",
    body: "Full gym floor access, cardio zone, certified personal trainers, and steam room. Valid for neighborhood residents within 5km. Claim your pass on WhatsApp.",
    offer: "Free 3-Day Trial Pass + Body Composition Analysis.",
    cta: "Claim Free Pass on WhatsApp",
    phone: "+91 98765 11223",
    query: "Gym and fitness center near me Green Park trial pass",
    likes: "248 nearby fitness enthusiasts",
    comments: "38 trial pass claims",
    radiusText: "Green Park (5km Radius)",
    tagline: "3-DAY PASS • PERSONAL TRAINING • STEAM",
    specs: ["Strength & Cardio", "Certified Trainers", "Steam & Showers"],
    priceBadge: "Free 3-Day Pass",
    incomingWhatsAppMessage:
      "Hi IronPulse! I saw your 3-day free trial pass ad on Instagram Reels. Can I activate my pass this Saturday morning?",
    rating: "★ 4.9 (340+ reviews)",
    openHours: "Open: 6:00 AM - 10:00 PM",
    accentBg: "bg-primary/10",
    accentText: "text-primary",
    accentBorder: "border-primary/20",
  },
  auto: {
    segment: "growth",
    categoryLabel: "Car Detailing & Garage",
    audienceBadge: "Local Business OS",
    businessName: "Precision Auto Care Garage",
    handle: "precision_autocare",
    headline: "Complete Car Spa & Foam Wash — Flat ₹599 This Week",
    body: "Deep interior vacuuming, high-pressure snow foam wash, dashboard polish, and AC vent disinfection. 5km radius doorstep pickup available.",
    offer: "Flat ₹599 complete car wash & detailing combo.",
    cta: "Book Car Spa on WhatsApp",
    phone: "+91 98112 33445",
    query: "Car wash and detailing center near me South Delhi",
    likes: "182 vehicle owners nearby",
    comments: "24 wash bookings",
    radiusText: "South Delhi (5km Radius)",
    tagline: "DEEP INTERIOR & FOAM WASH • ₹599",
    specs: ["Snow Foam Wash", "Interior Vacuum", "AC Disinfection"],
    priceBadge: "₹599 Special",
    incomingWhatsAppMessage:
      "Hello Precision Auto Care! I saw your ₹599 car spa special on Meta. Do you have a slot available for a sedan tomorrow at 11 AM?",
    rating: "★ 4.8 (210+ car owners)",
    openHours: "Open: 8:30 AM - 8:00 PM",
    accentBg: "bg-primary/10",
    accentText: "text-primary",
    accentBorder: "border-primary/20",
  },
  coaching: {
    segment: "growth",
    categoryLabel: "Coaching Academy",
    audienceBadge: "Local Business OS",
    businessName: "Apex Medical & IIT Academy",
    handle: "apex_academy_delhi",
    headline: "Class 9-12 Science & Maths: Free Diagnostic Assessment",
    body: "Comprehensive concept assessment by top IIT/NEET faculty. Identify learning gaps and receive a personalized study roadmap. 5km neighborhood admissions.",
    offer: "Free 60-Minute Diagnostic Test + Counseling Session.",
    cta: "Book Diagnostic Slot via WhatsApp",
    phone: "+91 99001 22334",
    query: "Best IIT NEET coaching center near me South Extension",
    likes: "195 parents & students",
    comments: "31 slot reservations",
    radiusText: "South Extension (5km Radius)",
    tagline: "TOP IIT FACULTY • SMALL BATCH SIZES",
    specs: ["Free Diagnostic", "Personal Roadmap", "Small Batches"],
    priceBadge: "Free Assessment",
    incomingWhatsAppMessage:
      "Hello Apex Academy, I saw your Class 10 Science diagnostic test ad. I would like to book an evaluation slot for my daughter this Sunday.",
    rating: "★ 4.9 (180+ student results)",
    openHours: "Counseling: Mon-Sun 10 AM - 7 PM",
    accentBg: "bg-primary/10",
    accentText: "text-primary",
    accentBorder: "border-primary/20",
  },
  eyecare: {
    segment: "growth",
    categoryLabel: "Eye Clinic & Opticals",
    audienceBadge: "Local Business OS",
    businessName: "ClearVision Eye Clinic & Opticals",
    handle: "clearvision_optical",
    headline: "Digital Eye Strain Exam + Flat 30% Off Branded Frames",
    body: "Comprehensive computerized vision checkup by certified optometrists. Wide range of anti-glare computer lenses and designer frames within 5km.",
    offer: "Computerized Eye Checkup + 30% off Ray-Ban & Vogue frames.",
    cta: "Reserve Checkup Slot on WhatsApp",
    phone: "+91 97400 11223",
    query: "Computerized eye checkup optical store near me Hauz Khas",
    likes: "168 nearby residents",
    comments: "26 appointment slots",
    radiusText: "Hauz Khas (5km Radius)",
    tagline: "COMPUTER VISION EXAM • 30% OFF FRAMES",
    specs: ["Zeiss Digital Exam", "Anti-Glare Lenses", "Instant Fitting"],
    priceBadge: "30% Off Frames",
    incomingWhatsAppMessage:
      "Hi ClearVision! I saw your computerized eye checkup and frame discount ad on Google. Are eye testing slots open today around 5 PM?",
    rating: "★ 4.9 (290+ patients)",
    openHours: "Open Now • Closes 8:30 PM",
    accentBg: "bg-primary/10",
    accentText: "text-primary",
    accentBorder: "border-primary/20",
  },

  // Business Growth Examples (Recurring Local Businesses)
  dental: {
    segment: "growth",
    categoryLabel: "Dental Clinic",
    audienceBadge: "Business Growth • Recurring",
    businessName: "Apex Multi-Specialty Dental",
    handle: "apexdentalclinic",
    headline: "Painless Root Canal & Smile Makeover — Flat 30% Off",
    body: "Pain-free single-sitting rotary root canal treatment by certified MDS endodontists. Free digital OPG X-ray consultation within 5km of Green Park.",
    offer: "Flat 30% off Root Canal + Free 3D digital dental X-ray consultation.",
    cta: "Book WhatsApp Consultation",
    phone: "+91 98765 43210",
    query: "Painless root canal treatment near me Green Park New Delhi",
    likes: "312 nearby residents",
    comments: "28 WhatsApp consults",
    radiusText: "Green Park (5km Radius)",
    tagline: "PAIN-FREE MDS ENDODONTICS • 30% OFF",
    specs: ["Single-Sitting RCT", "German Rotary Tech", "Free Digital OPG"],
    priceBadge: "From ₹2,499",
    incomingWhatsAppMessage:
      "Hello Dr. Sharma! I saw your root canal 30% discount ad on Instagram Reels. I have a molar ache and want to book a consultation for tomorrow morning in Green Park.",
    rating: "★ 4.9 (480+ Google reviews)",
    openHours: "Open Now • Closes 9:00 PM",
    accentBg: "bg-primary/10",
    accentText: "text-primary",
    accentBorder: "border-primary/20",
  },
  restaurant: {
    segment: "growth",
    categoryLabel: "Italian Bistro & Cafe",
    audienceBadge: "Business Growth • Recurring",
    businessName: "Bella Bistro & Pizzeria",
    handle: "bellabistrodelhi",
    headline: "Buy 1 Get 1 Free on Wood-Fired Sourdough Pizzas",
    body: "Authentic Neapolitan sourdough pizzas baked in 450°C Italian wood-fired stone oven. Dine-in offer valid this Friday through Sunday near Hauz Khas.",
    offer: "BOGO on all 12-inch artisanal pizzas this Friday evening.",
    cta: "Claim BOGO Voucher on WhatsApp",
    phone: "+91 98111 22334",
    query: "Best wood fired pizza Italian bistro near me Hauz Khas",
    likes: "450 foodies nearby",
    comments: "56 coupon claims",
    radiusText: "Hauz Khas (5km Radius)",
    tagline: "WOOD-FIRED NEAPOLITAN • BUY 1 GET 1",
    specs: ["48-Hour Sourdough", "San Marzano Tomatoes", "Dine-In Special"],
    priceBadge: "BOGO Pizza Friday",
    incomingWhatsAppMessage:
      "Hi Bella Bistro! I saw your Friday BOGO wood-fired pizza ad on Meta. Could you share the WhatsApp coupon code for dinner tonight?",
    rating: "★ 4.8 (520+ reviews)",
    openHours: "Open Now • Closes 11:30 PM",
    accentBg: "bg-primary/10",
    accentText: "text-primary",
    accentBorder: "border-primary/20",
  },
  salon: {
    segment: "growth",
    categoryLabel: "Salon & Wellness Spa",
    audienceBadge: "Business Growth • Recurring",
    businessName: "Glow Beauty Lounge",
    handle: "glowbeautylounge",
    headline: "Glow Beauty Lounge — ₹999 Pamper Package",
    body: "Luxury hair spa + organic fruit facial. Top-rated neighborhood stylists. Limited appointment slots available within 5km.",
    offer: "Weekend Hair Spa & Facial combo package for ₹999 at Glow Lounge.",
    cta: "Book WhatsApp Slot",
    phone: "+91 99887 66554",
    query: "Best Salon and hair spa package near me",
    likes: "189 nearby customers",
    comments: "22 reservations",
    radiusText: "South Extension (5km Radius)",
    tagline: "WEEKEND PAMPER COMBO • ₹999",
    specs: ["L'Oreal Hair Spa", "Organic Fruit Facial", "Head Massage"],
    priceBadge: "₹999 Combo",
    incomingWhatsAppMessage:
      "Hi Glow Beauty Lounge! I saw your ₹999 Hair Spa + Facial package on Instagram. Can I reserve a slot for Saturday at 4 PM?",
    rating: "★ 4.9 (310+ clients)",
    openHours: "Open Now • Closes 8:00 PM",
    accentBg: "bg-primary/10",
    accentText: "text-primary",
    accentBorder: "border-primary/20",
  },
  retail: {
    segment: "growth",
    categoryLabel: "Boutique Retail",
    audienceBadge: "Business Growth • Recurring",
    businessName: "Fabrika Handloom Boutique",
    handle: "fabrikaboutique",
    headline: "Festive Silk Saree Exhibition — Flat 25% Off",
    body: "Direct master weavers collection in store this week. Pure Chanderi & Tussar silk. Tap WhatsApp for catalog & store direction.",
    offer: "Flat 25% off festive handloom sarees collection this week.",
    cta: "View Collection on WhatsApp",
    phone: "+91 97110 55443",
    query: "Handloom silk saree store near me Delhi",
    likes: "276 local shoppers",
    comments: "41 catalog requests",
    radiusText: "Connaught Place (5km Radius)",
    tagline: "PURE SILK EXHIBITION • 25% OFF",
    specs: ["Chanderi & Tussar", "Direct Weaver Craft", "Free Blouse Piece"],
    priceBadge: "Flat 25% Off",
    incomingWhatsAppMessage:
      "Hello Fabrika Boutique! I saw your festive handloom silk saree exhibition ad. Could you send your digital catalog on WhatsApp and share your store location?",
    rating: "★ 4.9 (190+ shoppers)",
    openHours: "Open Now • Closes 9:00 PM",
    accentBg: "bg-primary/10",
    accentText: "text-primary",
    accentBorder: "border-primary/20",
  },
};

interface AdPreviewSandboxProps {
  filterSegment?: "all" | "quickblast" | "growth";
  defaultSample?: SampleKey;
  title?: string;
  subtitle?: string;
}

export function AdPreviewSandbox({
  filterSegment = "all",
  defaultSample = "dental",
  title = "Product Demonstration & Ad Previews",
  subtitle = "Explore native ad previews for Instagram, Facebook, and Google Search — plus inspect the exact WhatsApp conversation triggered when a customer clicks.",
}: AdPreviewSandboxProps) {
  const [selectedSample, setSelectedSample] = useState<SampleKey>(defaultSample);
  const [placementTab, setPlacementTab] = useState<
    "ig-feed" | "ig-reels" | "fb-feed" | "google-search"
  >("ig-feed");
  const [previewMode, setPreviewMode] = useState<"creative" | "whatsapp">("creative");
  const [isMuted, setIsMuted] = useState(true);

  const currentAd = sampleAdsData[selectedSample];

  const sampleButtons: { id: SampleKey; name: string; icon: React.ComponentType<{ className?: string }>; segment: PreviewSegment }[] = [
    { id: "dental", name: "Apex Dental Clinic", icon: Stethoscope, segment: "growth" },
    { id: "salon", name: "Glow Beauty Spa", icon: Scissors, segment: "growth" },
    { id: "restaurant", name: "Bella Bistro Pizza", icon: Utensils, segment: "growth" },
    { id: "fitness", name: "IronPulse Gym", icon: Dumbbell, segment: "growth" },
    { id: "retail", name: "Silk Saree Boutique", icon: Tag, segment: "growth" },
    { id: "coaching", name: "Apex IIT Academy", icon: GraduationCap, segment: "growth" },
    { id: "auto", name: "Precision Auto Care", icon: Car, segment: "growth" },
    { id: "eyecare", name: "ClearVision Opticals", icon: Eye, segment: "growth" },
  ];

  const filteredSamples =
    filterSegment === "all"
      ? sampleButtons
      : sampleButtons.filter((s) => s.segment === filterSegment);

  return (
    <section id="ad-previews" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-10 sm:space-y-12">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold border border-primary/20">
          <Eye className="size-3.5" /> Interactive Multichannel Sandbox
        </div>
        <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-foreground">
          {title}
        </h2>
        <p className="text-muted-foreground text-sm max-w-2xl mx-auto">
          {subtitle}
        </p>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-primary text-[11px] font-semibold">
          <Info className="size-3.5 shrink-0" />
          <span>Illustrative Sample Previews • Placement-Specific Native Formats</span>
        </div>
      </div>

      {/* 2-Column Split: Mockup Display on Left, Interactive Selectors on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
        {/* LEFT COLUMN: High-Fidelity Mockup Container */}
        <div className="lg:col-span-7 rounded-2xl border border-border bg-card shadow-lg p-4 sm:p-6 flex flex-col justify-between min-h-[540px] relative">
          {/* Top Toolbar: View Mode Toggle & Format Tag */}
          <div className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-border/40 pb-3">
            <div className="flex items-center p-1 rounded-xl bg-muted border border-border text-[11px] font-sans font-bold">
              <button
                onClick={() => setPreviewMode("creative")}
                className={`px-3 py-1 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                  previewMode === "creative"
                    ? "bg-card text-foreground shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Eye className="size-3.5" />
                <span>Ad Creative Mockup</span>
              </button>
              <button
                onClick={() => setPreviewMode("whatsapp")}
                className={`px-3 py-1 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                  previewMode === "whatsapp"
                    ? "bg-primary text-primary-foreground shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <MessageCircle className="size-3.5" />
                <span>Customer WhatsApp Chat</span>
              </button>
            </div>

            <span className="px-2.5 py-1 rounded-full bg-primary/10 text-primary font-bold text-[10px]">
              {placementTab.toUpperCase().replace("-", " ")} • {currentAd.audienceBadge}
            </span>
          </div>

          {/* MOCKUP VIEWER */}
          <div className="w-full flex items-center justify-center my-auto py-2">
            {previewMode === "creative" ? (
              <>
                {/* 1. INSTAGRAM FEED MOCKUP */}
                {placementTab === "ig-feed" && (
                  <div className="w-full max-w-sm mx-auto rounded-xl sm:rounded-2xl border border-border bg-card shadow-2xl font-sans overflow-hidden">
                    <div className="flex items-center justify-between p-3 sm:p-3.5 border-b border-border/40 bg-card">
                      <div className="flex items-center gap-2.5">
                        <div className="relative">
                          <div className="size-8 rounded-full bg-primary/20 text-primary font-black text-xs flex items-center justify-center border border-primary/30">
                            {currentAd.businessName.substring(0, 2).toUpperCase()}
                          </div>
                          <InstagramGradientIcon className="size-3.5 absolute -bottom-1 -right-1" />
                        </div>
                        <div className="flex flex-col">
                          <div className="flex items-center gap-1">
                            <span className="text-xs font-bold text-foreground leading-none">
                              {currentAd.businessName}
                            </span>
                            <MetaColorIcon className="size-3" />
                          </div>
                          <span className="text-[10px] text-muted-foreground font-semibold">
                            Sponsored • {currentAd.radiusText}
                          </span>
                        </div>
                      </div>
                      <MoreHorizontal className="size-5 text-muted-foreground cursor-pointer" />
                    </div>

                    <div
                      className={`relative aspect-square p-4 sm:p-5 flex flex-col justify-between border-y border-border/40 text-center ${currentAd.accentBg}`}
                    >
                      <div className="flex items-center justify-between text-[10px] font-mono">
                        <span
                          className={`px-2 py-0.5 rounded-full font-bold uppercase tracking-wider border ${currentAd.accentBorder} ${currentAd.accentText} bg-card/80`}
                        >
                          {currentAd.tagline}
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-card/80 text-muted-foreground font-semibold border border-border">
                          5km Radius
                        </span>
                      </div>

                      <div className="p-3.5 rounded-2xl bg-card/90 backdrop-blur-md border border-border/80 shadow-md space-y-2 my-auto">
                        <div className="size-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center mx-auto shadow-sm">
                          <Sparkles className="size-5" />
                        </div>
                        <h4 className="text-sm sm:text-base font-black text-foreground leading-snug">
                          {currentAd.headline}
                        </h4>
                        <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary font-black text-xs">
                          {currentAd.priceBadge}
                        </div>
                        <div className="flex flex-wrap items-center justify-center gap-1.5 pt-1">
                          {currentAd.specs.map((spec, i) => (
                            <span
                              key={i}
                              className="px-2 py-0.5 rounded-md bg-muted text-[10px] font-semibold text-muted-foreground"
                            >
                              {spec}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="pt-1">
                        <div className="w-full py-2 px-3.5 rounded-xl bg-primary text-primary-foreground font-extrabold text-xs flex items-center justify-between shadow-sm cursor-pointer">
                          <span className="flex items-center gap-1.5">
                            <MessageCircle className="size-4" />
                            <span>{currentAd.cta}</span>
                          </span>
                          <ArrowRight className="size-3.5" />
                        </div>
                      </div>
                    </div>

                    <div className="p-3 sm:p-3.5 space-y-2 text-xs bg-card">
                      <div className="flex items-center justify-between text-foreground">
                        <div className="flex items-center gap-3.5">
                          <Heart className="size-5 text-primary fill-primary/20" />
                          <MessageSquare className="size-5 text-muted-foreground" />
                          <Send className="size-5 text-muted-foreground" />
                        </div>
                        <Bookmark className="size-5 text-muted-foreground" />
                      </div>
                      <div className="font-bold text-foreground text-xs pt-0.5">
                        Liked by {currentAd.likes}
                      </div>
                      <div className="text-xs text-foreground">
                        <strong className="font-bold mr-1.5">{currentAd.handle}</strong>
                        <span className="text-muted-foreground">{currentAd.body}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. INSTAGRAM REELS MOCKUP */}
                {placementTab === "ig-reels" && (
                  <div className="w-full max-w-[285px] sm:max-w-[305px] mx-auto aspect-[9/16] rounded-2xl sm:rounded-3xl border-2 sm:border-4 border-card bg-black text-white relative shadow-2xl overflow-hidden flex flex-col justify-between p-4 sm:p-5 font-sans">
                    <div className="flex items-center justify-between z-10 text-xs text-white/90">
                      <div className="flex items-center gap-1.5">
                        <InstagramGradientIcon className="size-4" />
                        <span className="font-bold">Reels</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => setIsMuted(!isMuted)}
                          className="p-1 rounded-full bg-white/10 hover:bg-white/20"
                          aria-label="Toggle mute"
                        >
                          {isMuted ? (
                            <VolumeX className="size-3 text-white" />
                          ) : (
                            <Play className="size-3 text-white fill-current" />
                          )}
                        </button>
                        <span className="px-2 py-0.5 rounded bg-white/20 backdrop-blur-md text-[9px] font-bold uppercase flex items-center gap-1">
                          <MetaColorIcon className="size-2.5" /> Sponsored
                        </span>
                      </div>
                    </div>

                    <div className="my-auto text-center space-y-2.5 z-10 p-2">
                      <div className="size-12 rounded-full bg-primary/30 backdrop-blur-md border border-primary/50 text-white flex items-center justify-center mx-auto animate-pulse">
                        <Play className="size-6 fill-current ml-0.5" />
                      </div>
                      <div className="p-3 rounded-2xl bg-black/60 backdrop-blur-md border border-white/20 space-y-1.5 shadow-xl">
                        <span className="inline-block px-2 py-0.5 rounded-full bg-primary text-[9px] font-bold uppercase tracking-wider text-white">
                          {currentAd.tagline}
                        </span>
                        <h4 className="font-black text-xs sm:text-sm text-white leading-snug">
                          {currentAd.headline}
                        </h4>
                        <div className="text-[11px] font-extrabold text-white">
                          {currentAd.priceBadge}
                        </div>
                      </div>
                    </div>

                    <div className="absolute right-3 bottom-20 z-20 flex flex-col items-center gap-3.5 text-white">
                      <div className="flex flex-col items-center gap-0.5">
                        <Heart className="size-5 fill-primary text-primary" />
                        <span className="text-[9px] font-bold">142</span>
                      </div>
                      <div className="flex flex-col items-center gap-0.5">
                        <MessageSquare className="size-5" />
                        <span className="text-[9px] font-bold">18</span>
                      </div>
                      <div className="flex flex-col items-center gap-0.5">
                        <Send className="size-5" />
                        <span className="text-[9px] font-bold">Share</span>
                      </div>
                    </div>

                    <div className="z-10 space-y-2 pr-10">
                      <div className="flex items-center gap-2">
                        <div className="size-6 rounded-full bg-primary text-white font-bold text-[9px] flex items-center justify-center border border-white/40">
                          {currentAd.businessName.substring(0, 2)}
                        </div>
                        <span className="text-xs font-bold text-white truncate">
                          {currentAd.businessName}
                        </span>
                      </div>
                      <p className="text-[11px] text-white/90 line-clamp-2 leading-tight">
                        {currentAd.body}
                      </p>
                      <div className="w-full py-2 px-3 rounded-xl bg-primary text-primary-foreground font-extrabold text-xs text-center flex items-center justify-center gap-1.5 shadow-lg">
                        <MessageCircle className="size-3.5" />
                        <span className="truncate">{currentAd.cta}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. FACEBOOK FEED MOCKUP */}
                {placementTab === "fb-feed" && (
                  <div className="w-full max-w-sm sm:max-w-md mx-auto rounded-2xl border border-border bg-card shadow-2xl p-4 font-sans space-y-3">
                    <div className="flex items-center justify-between border-b border-border/40 pb-3">
                      <div className="flex items-center gap-3">
                        <FacebookBlueIcon className="size-10" />
                        <div className="flex flex-col">
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-bold text-foreground">
                              {currentAd.businessName}
                            </span>
                            <MetaColorIcon className="size-3" />
                          </div>
                          <span className="text-[10px] text-muted-foreground flex items-center gap-1 font-semibold">
                            <span>Sponsored</span> • <Globe className="size-3" />
                          </span>
                        </div>
                      </div>
                      <MoreHorizontal className="size-5 text-muted-foreground" />
                    </div>
                    <p className="text-xs text-foreground leading-relaxed">{currentAd.body}</p>
                    <div
                      className={`relative aspect-[16/9] rounded-xl border border-border/60 p-4 flex flex-col justify-between items-center text-center ${currentAd.accentBg}`}
                    >
                      <span
                        className={`px-2 py-0.5 rounded-full font-bold uppercase tracking-wide border ${currentAd.accentBorder} ${currentAd.accentText} bg-card/80 text-[10px]`}
                      >
                        {currentAd.tagline}
                      </span>
                      <h4 className="text-sm sm:text-base font-bold text-foreground">
                        {currentAd.headline}
                      </h4>
                      <span className="px-2.5 py-0.5 rounded-full bg-primary text-primary-foreground font-extrabold text-[11px]">
                        {currentAd.priceBadge}
                      </span>
                    </div>
                    <div className="p-3 rounded-xl bg-background border border-border flex items-center justify-between gap-3">
                      <span className="text-xs font-bold text-foreground truncate">
                        {currentAd.headline}
                      </span>
                      <button className="px-3.5 py-2 rounded-lg bg-primary text-primary-foreground font-bold text-xs shrink-0 flex items-center gap-1.5">
                        <MessageCircle className="size-3.5" />
                        <span>Send Message</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* 4. GOOGLE SEARCH MOCKUP */}
                {placementTab === "google-search" && (
                  <div className="w-full max-w-sm sm:max-w-md mx-auto rounded-2xl border border-border bg-card shadow-2xl p-4 sm:p-5 font-sans space-y-4">
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-background border border-border text-xs text-foreground">
                      <GoogleIcon className="size-4 shrink-0" />
                      <span className="font-semibold text-foreground truncate">{currentAd.query}</span>
                    </div>
                    <div className="p-4 rounded-xl border border-border bg-background space-y-2.5">
                      <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                        <span className="font-extrabold text-foreground px-1.5 py-0.5 rounded bg-muted text-[10px] flex items-center gap-1">
                          <GoogleIcon className="size-3" /> Sponsored
                        </span>
                        <span className="font-mono truncate">
                          https://local.adpulse.app/{selectedSample}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-primary hover:underline cursor-pointer">
                        {currentAd.headline}
                      </h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">{currentAd.body}</p>
                      <div className="flex flex-wrap items-center gap-2 text-[11px] text-muted-foreground pt-1">
                        <span className="flex items-center gap-1 font-bold text-foreground">
                          <Star className="size-3 fill-current text-primary" /> {currentAd.rating}
                        </span>
                        <span>•</span>
                        <span>{currentAd.openHours}</span>
                        <span>•</span>
                        <span className="font-semibold text-foreground">📍 Within 5 km</span>
                      </div>
                    </div>
                  </div>
                )}
              </>
            ) : (
              /* VIEW MODE 2: INCOMING WHATSAPP CHAT */
              <div className="w-full max-w-sm sm:max-w-md mx-auto rounded-2xl border border-border bg-[#0b141a] text-white shadow-2xl font-sans overflow-hidden">
                <div className="bg-[#202c33] p-3.5 flex items-center justify-between border-b border-white/10">
                  <div className="flex items-center gap-2.5">
                    <div className="size-9 rounded-full bg-primary text-primary-foreground font-black text-xs flex items-center justify-center">
                      {currentAd.businessName.substring(0, 2).toUpperCase()}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-white truncate max-w-[170px] sm:max-w-[220px]">
                        {currentAd.businessName}
                      </span>
                      <span className="text-[10px] text-white/60">Business Account • online</span>
                    </div>
                  </div>
                  <Phone className="size-4 text-white/70" />
                </div>
                <div className="p-4 space-y-4 min-h-[300px] bg-[radial-gradient(#1f2c34_1px,transparent_1px)] bg-[size:16px_16px] flex flex-col justify-between">
                  <div className="text-center">
                    <span className="inline-block px-3 py-1 rounded-lg bg-[#182229] border border-white/10 text-[10px] text-muted-foreground font-mono">
                      🔒 End-to-end encrypted lead delivery
                    </span>
                  </div>
                  <div className="space-y-3">
                    <div className="max-w-[85%] rounded-2xl rounded-tl-xs p-3.5 bg-[#202c33] text-white/95 text-xs space-y-1.5 shadow-md">
                      <div className="text-[10px] font-bold text-primary flex items-center justify-between border-b border-white/10 pb-1">
                        <span>Nearby Customer Inquiry</span>
                        <span className="font-mono text-white/50 text-[9px]">10:14 AM</span>
                      </div>
                      <p className="leading-relaxed">{currentAd.incomingWhatsAppMessage}</p>
                      <div className="pt-1 flex items-center justify-between text-[9px] text-white/50 border-t border-white/5 font-mono">
                        <span>Ad: {placementTab.toUpperCase()} (5km Pin)</span>
                        <CheckCheck className="size-3 text-primary inline" />
                      </div>
                    </div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#111b21] border border-white/10 text-[11px] text-white/70">
                    💡 <strong>Zero Form Drop-Off:</strong> Ad click routes straight to this WhatsApp conversation on your smartphone.
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Interactive Selectors & Specs */}
        <div className="lg:col-span-5 rounded-2xl border border-border bg-card shadow-lg p-4 sm:p-6 space-y-6">
          <div className="space-y-2.5">
            <div className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
              1. Select Ad Placement
            </div>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: "ig-feed", name: "Instagram Feed", sub: "1:1 • 1080×1080", icon: InstagramGradientIcon },
                { id: "ig-reels", name: "Instagram Reels", sub: "9:16 • 1080×1920", icon: InstagramGradientIcon },
                { id: "fb-feed", name: "Facebook Feed", sub: "16:9 • 1200×628", icon: FacebookBlueIcon },
                { id: "google-search", name: "Google Search", sub: "Call & Text SERP", icon: GoogleIcon },
              ].map((p) => {
                const Icon = p.icon;
                const isActive = placementTab === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => setPlacementTab(p.id as any)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-2.5 ${
                      isActive
                        ? "bg-primary text-primary-foreground border-primary shadow-sm"
                        : "bg-background border-border text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Icon className="size-4 shrink-0" />
                    <div className="min-w-0">
                      <div className="text-xs font-bold truncate">{p.name}</div>
                      <div className="text-[10px] opacity-80 font-mono">{p.sub}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Choose Example */}
          <div className="space-y-3 pt-4 border-t border-border">
            <div className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
              2. Select Sample Creative
            </div>
            <div className="grid grid-cols-2 gap-2">
              {filteredSamples.map((ex) => {
                const Icon = ex.icon;
                const isSelected = selectedSample === ex.id;
                return (
                  <button
                    key={ex.id}
                    onClick={() => setSelectedSample(ex.id as SampleKey)}
                    className={`px-3 py-2 rounded-lg text-xs font-bold text-left transition-all cursor-pointer flex items-center gap-2 ${
                      isSelected
                        ? "bg-primary text-primary-foreground shadow-xs"
                        : "bg-background border border-border text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Icon className="size-3.5 shrink-0" />
                    <span className="truncate">{ex.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Spec Meters */}
          <div className="pt-4 border-t border-border space-y-2.5 text-xs">
            <div className="flex justify-between text-[11px]">
              <span className="text-muted-foreground">Headline Character Count:</span>
              <span className="font-mono font-bold text-foreground">
                {currentAd.headline.length} / 60 Chars
              </span>
            </div>
            <div className="flex justify-between text-[11px]">
              <span className="text-muted-foreground">Target Radius Geo-Fence:</span>
              <span className="font-bold text-foreground">{currentAd.radiusText}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
