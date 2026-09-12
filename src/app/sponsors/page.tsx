"use client";

import React, { useState } from "react";
import {
  SPONSORS_DATA,
  SPONSOR_IMPACT_METRICS,
  SponsorTierData,
  SponsorSlot,
} from "@/data/sponsors";
import { soundFx } from "@/lib/soundFx";
import { spawnBlockBreakParticles } from "@/lib/particles";
import { useAchievement } from "@/components/ui/AchievementSystem";
import { VoxelFooter } from "@/components/ui/VoxelFooter";
import {
  Trophy,
  Sparkles,
  Download,
  Mail,
  CheckCircle2,
  Shield,
  Zap,
  Users,
  Award,
  Flame,
  ArrowRight,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Sliders,
  Check,
  Building,
  Target,
  FileText,
  Star,
  Send,
  X,
} from "lucide-react";
import confetti from "canvas-confetti";

export default function SponsorsPage() {
  const { unlockAchievement } = useAchievement();
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);
  const [selectedSlotForModal, setSelectedSlotForModal] = useState<{
    tierId: string;
    tierName: string;
    slotTitle: string;
    slotCode: string;
  } | null>(null);

  // ROI Tier Matcher Calculator State
  const [calcStage, setCalcStage] = useState<"keynote" | "short" | "none">("keynote");
  const [calcBooth, setCalcBooth] = useState<"double" | "single" | "shared">("double");
  const [calcRecruitment, setCalcRecruitment] = useState<"full" | "optin" | "none">("full");
  const [calcTrack, setCalcTrack] = useState<"flagship" | "tooling" | "none">("flagship");

  React.useEffect(() => {
    unlockAchievement("NETHER_PORTAL");
  }, [unlockAchievement]);

  // Determine matched tier from calculator
  const getMatchedTier = (): "diamond" | "gold" | "iron" | "redstone" => {
    if (calcStage === "keynote" || calcBooth === "double" || calcTrack === "flagship") {
      return "diamond";
    }
    if (calcStage === "short" || calcBooth === "single" || calcRecruitment === "full") {
      return "gold";
    }
    if (calcBooth === "shared" || calcRecruitment === "optin" || calcTrack === "tooling") {
      return "iron";
    }
    return "redstone";
  };

  const matchedTierId = getMatchedTier();
  const matchedTierObj = SPONSORS_DATA.tiers.find((t) => t.id === matchedTierId) || SPONSORS_DATA.tiers[0];

  const handleDownloadBrochure = (e: React.MouseEvent) => {
    soundFx.playChestOpen();
    spawnBlockBreakParticles(e.clientX, e.clientY, 15);
    setDownloadSuccess(true);

    try {
      confetti({
        particleCount: 30,
        spread: 60,
        origin: { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight },
        colors: ["#4FD9FF", "#FFD34D", "#55FF55", "#E14E3D"],
      });
    } catch {}

    // Simulated prospectus deck generation
    const dummyProspectus = `SINGULARITY 2K26 — SPONSORSHIP PROSPECTUS & CORPORATE PARTNERSHIP DECK
========================================================================
Event: Singularity 2K26 & HackNova 2.0 (Flagship AI Hackathon)
Dates: October 22, 23, 24, 2026
Venue: Shatabdi Bhavan, HBTU West Campus, Kanpur
Audience: 1,000+ In-Person Collegiate Hackers & Engineers (50+ Top Universities)

TIER DELIVERABLES SUMMARY:
1. Diamond Sovereign Tier (Title Partner): 15-Min Keynote, Double HackHub Arena Booth, Full Resume Access, Flagship Track Naming, Front-Top T-Shirt Logo.
2. Gold Gilded Tier (Co-Powered): 5-Min Address, Dedicated Arena Booth, Candidate Access, Back-Top Logo, Track Bounty.
3. Iron Forge Tier (Associate): Shared Demo Desk, Opt-In Resume List, Sleeve Logo, Tooling Bounty.
4. Redstone Relay Tier (Community): Swag Distribution Desk, Web Portal Feature, Community Social Blast.

CONTACT SECRETARIAT:
Email: singularity.sponsors@hbtu.ac.in
Portal: https://singularity-2k26.vercel.app/sponsors
`;

    const blob = new Blob([dummyProspectus], { type: "text/plain;charset=utf-8" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute("download", "Singularity_2K26_Sponsorship_Prospectus.txt");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => setDownloadSuccess(false), 4000);
  };

  const handleOpenInquiryModal = (tier: SponsorTierData, slot?: SponsorSlot, e?: React.MouseEvent) => {
    soundFx.playClick();
    if (e) spawnBlockBreakParticles(e.clientX, e.clientY, 10);
    setSelectedSlotForModal({
      tierId: tier.id,
      tierName: tier.name,
      slotTitle: slot ? slot.slotTitle : `${tier.name} General Inquiry`,
      slotCode: slot ? slot.slotCode : `${tier.id.toUpperCase()}_TIER`,
    });
  };

  const toggleFaq = (index: number) => {
    soundFx.playClick();
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <main className="min-h-screen pt-24 sm:pt-28 relative bg-[#06010A] text-white">
      {/* Background Image: 4K Ultra-Vivid Celestial Nether Hall with Full Page Continuity */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat opacity-90 brightness-110 contrast-105 saturate-110 pointer-events-none"
        style={{
          backgroundImage: "url('/images/bg_nether_celestial_4k.jpg')",
        }}
      />
      {/* Balanced contrast backing for vibrant celestial nebula + pristine text contrast */}
      <div className="fixed inset-0 bg-gradient-to-b from-[#06010A]/75 via-[#0E0318]/70 to-[#06010A]/90 pointer-events-none" />

      {/* 1. HERO LANDMARK SHOWCASE */}
      <section className="relative z-10 px-4 sm:px-6 max-w-7xl mx-auto text-center mb-14">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#140822]/90 backdrop-blur-md border-2 border-[#4FD9FF] shadow-[0_0_25px_rgba(79,217,255,0.35)] mb-4">
          <Sparkles className="w-4 h-4 text-[#4FD9FF] animate-pulse" />
          <span className="font-pixel-arcade text-xs text-[#4FD9FF] uppercase tracking-widest font-bold">
            SOVEREIGN PATRON NEXUS // SINGULARITY 2K26
          </span>
        </div>

        <h1 className="font-pixel-title text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-white font-bold tracking-wider uppercase drop-shadow-[0_8px_0_#000] [text-shadow:0_0_45px_rgba(79,217,255,0.6)]">
          ORE-THEMED <span className="text-[#FFD34D]">SPONSOR SANCTUM</span>
        </h1>

        <div className="font-pixel-sub text-xs sm:text-sm md:text-base text-[#4FD9FF] font-bold uppercase tracking-widest mt-2 drop-shadow-[0_2px_6px_#000]">
          EMPOWERING INDIA&apos;S PREMIER PAN-UNIVERSITY BUILDER ODYSSEY
        </div>

        <p className="text-sm sm:text-base text-[#E0E2F5] font-sans max-w-3xl mx-auto mt-4 leading-relaxed font-normal drop-shadow-[0_2px_8px_#000]">
          The driving bedrock of Singularity 2K26 and HackNova 2.0 at <strong>Shatabdi Bhavan, HBTU West Campus</strong>.
          Partner with our collegiate ecosystem to command executive mainstage presence, recruit top-tier AI engineering talent, and sponsor high-stakes challenge tracks.
        </p>

        {/* 4 Audience Impact Metrics Telemetry HUD */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 max-w-5xl mx-auto mt-8">
          {SPONSOR_IMPACT_METRICS.map((metric, idx) => (
            <div
              key={idx}
              className="bg-[#120524]/92 backdrop-blur-md border-2 p-4 text-center shadow-[0_6px_20px_rgba(0,0,0,0.85)] hover:translate-y-[-2px] transition-all"
              style={{ borderColor: `${metric.color}60` }}
            >
              <div
                className="font-pixel-title text-2xl sm:text-3xl font-extrabold"
                style={{ color: metric.color, textShadow: `0 0 15px ${metric.color}60` }}
              >
                {metric.value}
              </div>
              <div className="font-pixel-arcade text-[10px] text-white font-bold mt-1">
                {metric.label}
              </div>
              <div className="text-[11px] font-sans text-[#A0A0B8] mt-0.5 leading-tight">
                {metric.sub}
              </div>
            </div>
          ))}
        </div>

        {/* Primary Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={handleDownloadBrochure}
            className="btn-voxel btn-voxel-gold text-xs sm:text-sm px-8 py-4 flex items-center gap-2.5 shadow-[0_0_35px_rgba(255,211,77,0.5)] font-bold"
          >
            <Download className="w-4 h-4 text-black" />
            <span className="text-black">DOWNLOAD SPONSORSHIP DECK (PDF)</span>
          </button>

          <a
            href="#tier-calculator"
            className="btn-voxel btn-voxel-diamond text-xs sm:text-sm px-6 py-4 flex items-center gap-2"
          >
            <Sliders className="w-4 h-4" />
            <span>CALCULATE SPONSORSHIP ROI</span>
          </a>
        </div>

        {downloadSuccess && (
          <div className="mt-4 inline-block bg-[#1B2E15] border-2 border-[#55FF55] px-5 py-2.5 text-xs font-pixel-arcade text-[#55FF55] animate-bounce shadow-[0_0_30px_rgba(85,255,85,0.6)] font-bold">
            ✓ SPONSORSHIP PROSPECTUS DECK DOWNLOADED TO YOUR DEVICE!
          </div>
        )}
      </section>

      {/* 2. INTERACTIVE SPONSORSHIP ROI & TIER MATCHER CALCULATOR */}
      <section id="tier-calculator" className="relative z-10 px-4 sm:px-6 max-w-6xl mx-auto mb-20 scroll-mt-28">
        <div className="bg-[#120524]/95 backdrop-blur-2xl border-4 border-[#4FD9FF] shadow-[0_12px_50px_rgba(0,0,0,0.95),0_0_40px_rgba(79,217,255,0.3)] p-6 sm:p-10 relative overflow-hidden">
          {/* Top cyan glowing bar */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#4FD9FF] shadow-[0_0_20px_#4FD9FF]" />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b-2 border-[#3A1E54] pb-6 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 font-pixel-arcade text-xs text-[#4FD9FF] bg-[#4FD9FF]/15 border border-[#4FD9FF]/40 px-3 py-1 uppercase tracking-wider font-bold mb-2">
                <Sliders className="w-3.5 h-3.5 text-[#4FD9FF]" />
                INTERACTIVE ROI ENGINE
              </div>
              <h2 className="font-pixel-title text-2xl sm:text-4xl text-white font-bold drop-shadow-[0_4px_0_#000]">
                FIND YOUR BRAND&apos;S <span className="text-[#FFD34D]">OPTIMAL TIER</span>
              </h2>
            </div>

            <div className="text-left md:text-right">
              <span className="font-pixel-arcade text-xs text-[#A0A0B8] block">INSTANT REPUTATION MATCH:</span>
              <span className="text-base font-bold font-pixel-title text-[#55FF55]">
                {matchedTierObj.name.toUpperCase()} ({matchedTierObj.badge})
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {/* Control 1: Stage Keynote */}
            <div className="bg-[#090214] border-2 border-[#3A1E54] p-4 space-y-2">
              <label className="font-pixel-arcade text-xs text-[#FFD34D] block font-bold">
                🎤 STAGE & KEYNOTE:
              </label>
              <div className="space-y-1.5">
                {[
                  { id: "keynote", label: "15-Min Prime Keynote" },
                  { id: "short", label: "5-Min Address" },
                  { id: "none", label: "Logo Slide Only" },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setCalcStage(opt.id as any)}
                    className={`w-full text-left px-3 py-2 text-xs font-sans border transition-all flex items-center justify-between ${
                      calcStage === opt.id
                        ? "bg-[#4FD9FF]/20 border-[#4FD9FF] text-white font-bold"
                        : "bg-[#140624] border-[#2A1540] text-[#A0A0B8] hover:text-white"
                    }`}
                  >
                    <span>{opt.label}</span>
                    {calcStage === opt.id && <Check className="w-3.5 h-3.5 text-[#4FD9FF]" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Control 2: Arena Booth Space */}
            <div className="bg-[#090214] border-2 border-[#3A1E54] p-4 space-y-2">
              <label className="font-pixel-arcade text-xs text-[#FFD34D] block font-bold">
                🏢 ARENA WORKSTATION:
              </label>
              <div className="space-y-1.5">
                {[
                  { id: "double", label: "Prime Double Booth" },
                  { id: "single", label: "Single HackHub Booth" },
                  { id: "shared", label: "Shared Demo Desk" },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setCalcBooth(opt.id as any)}
                    className={`w-full text-left px-3 py-2 text-xs font-sans border transition-all flex items-center justify-between ${
                      calcBooth === opt.id
                        ? "bg-[#4FD9FF]/20 border-[#4FD9FF] text-white font-bold"
                        : "bg-[#140624] border-[#2A1540] text-[#A0A0B8] hover:text-white"
                    }`}
                  >
                    <span>{opt.label}</span>
                    {calcBooth === opt.id && <Check className="w-3.5 h-3.5 text-[#4FD9FF]" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Control 3: Talent Recruitment */}
            <div className="bg-[#090214] border-2 border-[#3A1E54] p-4 space-y-2">
              <label className="font-pixel-arcade text-xs text-[#FFD34D] block font-bold">
                👥 TALENT DATABASE:
              </label>
              <div className="space-y-1.5">
                {[
                  { id: "full", label: "Full 1,000+ Resume DB" },
                  { id: "optin", label: "Opt-in Candidate List" },
                  { id: "none", label: "General Exposure" },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setCalcRecruitment(opt.id as any)}
                    className={`w-full text-left px-3 py-2 text-xs font-sans border transition-all flex items-center justify-between ${
                      calcRecruitment === opt.id
                        ? "bg-[#4FD9FF]/20 border-[#4FD9FF] text-white font-bold"
                        : "bg-[#140624] border-[#2A1540] text-[#A0A0B8] hover:text-white"
                    }`}
                  >
                    <span>{opt.label}</span>
                    {calcRecruitment === opt.id && <Check className="w-3.5 h-3.5 text-[#4FD9FF]" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Control 4: Hackathon Challenge Track */}
            <div className="bg-[#090214] border-2 border-[#3A1E54] p-4 space-y-2">
              <label className="font-pixel-arcade text-xs text-[#FFD34D] block font-bold">
                🏆 CHALLENGE TRACK:
              </label>
              <div className="space-y-1.5">
                {[
                  { id: "flagship", label: "Flagship Track Naming" },
                  { id: "tooling", label: "Tooling Bounty Category" },
                  { id: "none", label: "General Supporter" },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setCalcTrack(opt.id as any)}
                    className={`w-full text-left px-3 py-2 text-xs font-sans border transition-all flex items-center justify-between ${
                      calcTrack === opt.id
                        ? "bg-[#4FD9FF]/20 border-[#4FD9FF] text-white font-bold"
                        : "bg-[#140624] border-[#2A1540] text-[#A0A0B8] hover:text-white"
                    }`}
                  >
                    <span>{opt.label}</span>
                    {calcTrack === opt.id && <Check className="w-3.5 h-3.5 text-[#4FD9FF]" />}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Calculator Output Match Banner */}
          <div
            className="p-5 border-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0A0214] shadow-[0_4px_20px_rgba(0,0,0,0.9)]"
            style={{ borderColor: matchedTierObj.colorHex }}
          >
            <div>
              <div className="flex items-center gap-2">
                <span
                  className="font-pixel-arcade text-xs px-2.5 py-0.5 border font-bold uppercase"
                  style={{
                    color: matchedTierObj.colorHex,
                    borderColor: matchedTierObj.colorHex,
                    backgroundColor: `${matchedTierObj.colorHex}15`,
                  }}
                >
                  RECOMMENDED: {matchedTierObj.name}
                </span>
                <span className="text-xs text-[#A0A0B8] font-sans font-bold">
                  ({matchedTierObj.investmentTier})
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#E0E2F5] font-sans mt-1">
                {matchedTierObj.dealOverview}
              </p>
            </div>

            <button
              onClick={(e) => handleOpenInquiryModal(matchedTierObj, undefined, e)}
              className="btn-voxel text-xs px-5 py-3 whitespace-nowrap flex items-center gap-2 font-bold flex-shrink-0"
              style={{
                backgroundColor: matchedTierObj.colorHex,
                color: "#000",
                borderColor: matchedTierObj.colorHex,
              }}
            >
              <span>CLAIM {matchedTierObj.name.toUpperCase()} SLOT</span>
              <ArrowRight className="w-4 h-4 text-black" />
            </button>
          </div>
        </div>
      </section>

      {/* 3. TIER 1: DIAMOND TIER — MAXIMUM SPECTACLE & ANIMATION (TITLE PATRONS) */}
      <section className="relative z-10 px-4 sm:px-6 max-w-7xl mx-auto mb-20">
        <div className="p-1 bg-gradient-to-r from-[#00E5FF] via-[#4FD9FF] to-[#D400FF] shadow-[0_0_60px_rgba(79,217,255,0.4)]">
          <div className="bg-[#0B0218]/98 backdrop-blur-2xl p-6 sm:p-10 relative overflow-hidden">
            {/* Top Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b-2 border-[#3A1E54] pb-6 mb-8">
              <div className="flex items-center gap-4">
                {/* 3D Floating Rotating Diamond Gem Effect */}
                <div className="w-14 h-14 bg-[#0A0118] border-2 border-[#4FD9FF] flex items-center justify-center text-2xl shadow-[0_0_30px_rgba(79,217,255,0.8)] animate-pulse">
                  💎
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="font-pixel-title text-2xl sm:text-4xl text-white font-bold drop-shadow-[0_4px_0_#000]">
                      DIAMOND TIER
                    </h2>
                    <span className="font-pixel-arcade text-[10px] text-[#4FD9FF] bg-[#4FD9FF]/20 px-2.5 py-0.5 border border-[#4FD9FF] font-bold animate-pulse">
                      TITLE SOVEREIGN PATRON
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#A0E8FF] font-sans mt-0.5">
                    {SPONSORS_DATA.tiers[0].tagline}
                  </p>
                </div>
              </div>

              <div className="text-left md:text-right">
                <span className="font-pixel-arcade text-[10px] text-[#55FF55] bg-[#55FF55]/10 px-2.5 py-1 border border-[#55FF55]/40 font-bold block mb-1">
                  ⚡ ANIMATION LEVEL: MAXIMUM
                </span>
                <span className="text-xs font-sans text-[#FFD34D] font-bold">
                  {SPONSORS_DATA.tiers[0].investmentTier}
                </span>
              </div>
            </div>

            {/* Core Deal Package Ribbon */}
            <div className="mb-8 p-4 sm:p-5 bg-[#070112] border-2 border-[#4FD9FF]/60 shadow-[0_0_25px_rgba(79,217,255,0.2)]">
              <div className="font-pixel-arcade text-xs text-[#4FD9FF] uppercase tracking-wider font-bold mb-2 flex items-center gap-2">
                <Star className="w-4 h-4 text-[#4FD9FF]" />
                EXCLUSIVE DIAMOND DELIVERABLES PACKAGE:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {SPONSORS_DATA.tiers[0].coreDeliverables.map((deliv, dIdx) => (
                  <div key={dIdx} className="flex items-start gap-2 text-xs text-[#E0F4FF] font-sans">
                    <span className="text-[#55FF55] font-bold mt-0.5">✓</span>
                    <span>{deliv}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 2 Grand Diamond Slot Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {SPONSORS_DATA.tiers[0].slots.map((slot) => (
                <div
                  key={slot.slotId}
                  className="bg-[#0D0320] border-3 border-[#00E5FF] p-6 sm:p-8 flex flex-col justify-between relative shadow-[0_0_40px_rgba(0,229,255,0.25),0_10px_30px_rgba(0,0,0,0.9)] hover:scale-[1.01] transition-all group overflow-hidden"
                >
                  {/* Holographic sweep ray */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#4FD9FF]/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />

                  <div>
                    {/* Slot Header */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-pixel-arcade text-xs text-[#4FD9FF] bg-[#4FD9FF]/20 px-3 py-1 border border-[#4FD9FF] font-bold">
                        [{slot.slotCode}]
                      </span>
                      <span className="font-pixel-arcade text-[10px] text-[#55FF55] bg-[#55FF55]/15 px-2.5 py-1 border border-[#55FF55]/50 flex items-center gap-1.5 font-bold">
                        <span className="w-2 h-2 bg-[#55FF55] animate-ping" />
                        {slot.status}
                      </span>
                    </div>

                    <div className="text-xs font-pixel-arcade text-[#FFD34D] uppercase font-bold tracking-wider mb-2">
                      {slot.domainTag}
                    </div>

                    <h3 className="font-pixel-heading text-xl sm:text-2xl font-bold text-white group-hover:text-[#4FD9FF] transition-colors leading-snug mb-3">
                      {slot.slotTitle}
                    </h3>

                    <div className="p-3.5 bg-[#06010F] border border-[#3A1E54] space-y-1 mb-6">
                      <span className="font-pixel-arcade text-[10px] text-[#A0A0B8] block font-bold">
                        KEY HIGHLIGHTS:
                      </span>
                      <p className="text-xs text-[#D8E8F5] font-sans font-semibold">
                        {slot.deliverablesHighlight}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={(e) => handleOpenInquiryModal(SPONSORS_DATA.tiers[0], slot, e)}
                    className="w-full btn-voxel btn-voxel-diamond text-xs sm:text-sm py-3.5 flex items-center justify-center gap-2 font-bold shadow-[0_0_20px_rgba(79,217,255,0.4)]"
                  >
                    <span>CLAIM TITLE PATRON SLOT</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. TIER 2: GOLD TIER — HIGH SPECTACLE (POWERED BY) */}
      <section className="relative z-10 px-4 sm:px-6 max-w-7xl mx-auto mb-20">
        <div className="bg-[#120524]/95 backdrop-blur-2xl border-4 border-[#FFAA00] shadow-[0_12px_45px_rgba(0,0,0,0.95),0_0_35px_rgba(255,170,0,0.3)] p-6 sm:p-10 relative overflow-hidden">
          {/* Top golden glowing bar */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-[#FFD34D] shadow-[0_0_20px_#FFD34D]" />

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b-2 border-[#3A1E54] pb-6 mb-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#0A0118] border-2 border-[#FFD34D] flex items-center justify-center text-xl shadow-[0_0_20px_rgba(255,211,77,0.6)]">
                🟡
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-pixel-title text-2xl sm:text-3xl text-white font-bold drop-shadow-[0_4px_0_#000]">
                    GOLD TIER
                  </h2>
                  <span className="font-pixel-arcade text-[10px] text-[#FFD34D] bg-[#FFD34D]/20 px-2.5 py-0.5 border border-[#FFD34D] font-bold">
                    CO-POWERED PATRON
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#E0E2F5] font-sans mt-0.5">
                  {SPONSORS_DATA.tiers[1].tagline}
                </p>
              </div>
            </div>

            <div className="text-left md:text-right">
              <span className="font-pixel-arcade text-[10px] text-[#FFD34D] bg-[#FFD34D]/10 px-2.5 py-1 border border-[#FFD34D]/40 font-bold block mb-1">
                ⚡ ANIMATION LEVEL: HIGH (GOLDEN RADIANCE)
              </span>
              <span className="text-xs font-sans text-[#55FF55] font-bold">
                {SPONSORS_DATA.tiers[1].investmentTier}
              </span>
            </div>
          </div>

          {/* Deal Package */}
          <div className="mb-8 p-4 bg-[#080214] border-2 border-[#FFD34D]/50 shadow-[0_0_20px_rgba(255,211,77,0.15)]">
            <div className="font-pixel-arcade text-xs text-[#FFD34D] uppercase tracking-wider font-bold mb-2 flex items-center gap-2">
              <Star className="w-4 h-4 text-[#FFD34D]" />
              GOLD TIER DELIVERABLES PACKAGE:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {SPONSORS_DATA.tiers[1].coreDeliverables.map((deliv, dIdx) => (
                <div key={dIdx} className="flex items-start gap-2 text-xs text-[#F0E6FF] font-sans">
                  <span className="text-[#55FF55] font-bold mt-0.5">✓</span>
                  <span>{deliv}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 3 Gold Slots */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {SPONSORS_DATA.tiers[1].slots.map((slot) => (
              <div
                key={slot.slotId}
                className="bg-[#090214] border-2 border-[#FFD34D]/70 p-6 flex flex-col justify-between relative shadow-[0_6px_20px_rgba(0,0,0,0.85)] hover:border-[#FFD34D] hover:bg-[#120520] transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-pixel-arcade text-[10px] text-[#FFD34D] bg-[#FFD34D]/15 px-2.5 py-1 border border-[#FFD34D]/40 font-bold">
                      [{slot.slotCode}]
                    </span>
                    <span className="font-pixel-arcade text-[9px] text-[#55FF55] bg-[#55FF55]/15 px-2 py-0.5 border border-[#55FF55]/40 font-bold">
                      {slot.status}
                    </span>
                  </div>

                  <div className="text-[10px] font-pixel-arcade text-[#4FD9FF] uppercase font-bold tracking-wider mb-2">
                    {slot.domainTag}
                  </div>

                  <h3 className="font-pixel-heading text-lg font-bold text-white group-hover:text-[#FFD34D] transition-colors leading-snug mb-3">
                    {slot.slotTitle}
                  </h3>

                  <p className="text-xs text-[#C0C0D8] font-sans mb-5">
                    {slot.deliverablesHighlight}
                  </p>
                </div>

                <button
                  onClick={(e) => handleOpenInquiryModal(SPONSORS_DATA.tiers[1], slot, e)}
                  className="w-full btn-voxel btn-voxel-gold text-xs py-2.5 flex items-center justify-center gap-1.5 font-bold"
                >
                  <span className="text-black">CLAIM GOLD SLOT</span>
                  <ArrowRight className="w-3.5 h-3.5 text-black" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. TIER 3: IRON TIER — MEDIUM SPECTACLE (ASSOCIATE PATRONS) */}
      <section className="relative z-10 px-4 sm:px-6 max-w-7xl mx-auto mb-20">
        <div className="bg-[#120524]/95 backdrop-blur-2xl border-4 border-[#9EABB0] shadow-[0_10px_40px_rgba(0,0,0,0.95)] p-6 sm:p-10 relative overflow-hidden">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b-2 border-[#3A1E54] pb-6 mb-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#0A0118] border-2 border-[#C4CBCE] flex items-center justify-center text-xl shadow-[0_0_15px_rgba(196,203,206,0.4)]">
                ⚪
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-pixel-title text-2xl sm:text-3xl text-white font-bold drop-shadow-[0_4px_0_#000]">
                    IRON TIER
                  </h2>
                  <span className="font-pixel-arcade text-[10px] text-[#C4CBCE] bg-[#C4CBCE]/20 px-2.5 py-0.5 border border-[#C4CBCE] font-bold">
                    ASSOCIATE PATRON
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#E0E2F5] font-sans mt-0.5">
                  {SPONSORS_DATA.tiers[2].tagline}
                </p>
              </div>
            </div>

            <div className="text-left md:text-right">
              <span className="font-pixel-arcade text-[10px] text-[#C4CBCE] bg-[#C4CBCE]/10 px-2.5 py-1 border border-[#C4CBCE]/40 font-bold block mb-1">
                ⚡ ANIMATION LEVEL: MEDIUM (METALLIC SHEEN)
              </span>
              <span className="text-xs font-sans text-[#FFD34D] font-bold">
                {SPONSORS_DATA.tiers[2].investmentTier}
              </span>
            </div>
          </div>

          {/* 3 Iron Slots */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {SPONSORS_DATA.tiers[2].slots.map((slot) => (
              <div
                key={slot.slotId}
                className="bg-[#090214] border-2 border-[#3A1E54] p-5 flex flex-col justify-between hover:border-[#C4CBCE] hover:bg-[#120520] transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-pixel-arcade text-[10px] text-[#C4CBCE] bg-[#C4CBCE]/15 px-2 py-0.5 border border-[#C4CBCE]/40 font-bold">
                      [{slot.slotCode}]
                    </span>
                    <span className="font-pixel-arcade text-[9px] text-[#55FF55] bg-[#55FF55]/10 px-2 py-0.5 border border-[#55FF55]/30">
                      {slot.status}
                    </span>
                  </div>

                  <div className="text-[10px] font-pixel-arcade text-[#FFD34D] uppercase font-bold tracking-wider mb-1">
                    {slot.domainTag}
                  </div>

                  <h3 className="font-pixel-heading text-base font-bold text-white group-hover:text-[#C4CBCE] transition-colors leading-snug mb-2">
                    {slot.slotTitle}
                  </h3>

                  <p className="text-xs text-[#B0B0C8] font-sans mb-4">
                    {slot.deliverablesHighlight}
                  </p>
                </div>

                <button
                  onClick={(e) => handleOpenInquiryModal(SPONSORS_DATA.tiers[2], slot, e)}
                  className="w-full btn-voxel btn-voxel-stone text-xs py-2 flex items-center justify-center gap-1.5 font-bold"
                >
                  <span>CLAIM ASSOCIATE SLOT</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. TIER 4: REDSTONE TIER — SUBTLE SPECTACLE (COMMUNITY & MEDIA) */}
      <section className="relative z-10 px-4 sm:px-6 max-w-7xl mx-auto mb-20">
        <div className="bg-[#120524]/95 backdrop-blur-2xl border-4 border-[#FF2A2A] shadow-[0_10px_40px_rgba(0,0,0,0.95)] p-6 sm:p-10 relative overflow-hidden">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b-2 border-[#3A1E54] pb-6 mb-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#0A0118] border-2 border-[#E14E3D] flex items-center justify-center text-xl shadow-[0_0_15px_rgba(225,78,61,0.4)]">
                🔴
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-pixel-title text-2xl sm:text-3xl text-white font-bold drop-shadow-[0_4px_0_#000]">
                    REDSTONE TIER
                  </h2>
                  <span className="font-pixel-arcade text-[10px] text-[#E14E3D] bg-[#E14E3D]/20 px-2.5 py-0.5 border border-[#E14E3D] font-bold">
                    COMMUNITY & MEDIA SIGNAL
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#E0E2F5] font-sans mt-0.5">
                  {SPONSORS_DATA.tiers[3].tagline}
                </p>
              </div>
            </div>

            <div className="text-left md:text-right">
              <span className="font-pixel-arcade text-[10px] text-[#E14E3D] bg-[#E14E3D]/10 px-2.5 py-1 border border-[#E14E3D]/40 font-bold block mb-1">
                ⚡ ANIMATION LEVEL: SUBTLE (SIGNAL PULSE)
              </span>
              <span className="text-xs font-sans text-[#FFD34D] font-bold">
                {SPONSORS_DATA.tiers[3].investmentTier}
              </span>
            </div>
          </div>

          {/* 3 Redstone Slots */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {SPONSORS_DATA.tiers[3].slots.map((slot) => (
              <div
                key={slot.slotId}
                className="bg-[#090214] border-2 border-[#3A1E54] p-5 flex flex-col justify-between hover:border-[#E14E3D] hover:bg-[#150408] transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-pixel-arcade text-[10px] text-[#E14E3D] bg-[#E14E3D]/15 px-2 py-0.5 border border-[#E14E3D]/40 font-bold">
                      [{slot.slotCode}]
                    </span>
                    <span className="font-pixel-arcade text-[9px] text-[#55FF55] bg-[#55FF55]/10 px-2 py-0.5 border border-[#55FF55]/30">
                      {slot.status}
                    </span>
                  </div>

                  <div className="text-[10px] font-pixel-arcade text-[#FFD34D] uppercase font-bold tracking-wider mb-1">
                    {slot.domainTag}
                  </div>

                  <h3 className="font-pixel-heading text-base font-bold text-white group-hover:text-[#E14E3D] transition-colors leading-snug mb-2">
                    {slot.slotTitle}
                  </h3>

                  <p className="text-xs text-[#B0B0C8] font-sans mb-4">
                    {slot.deliverablesHighlight}
                  </p>
                </div>

                <button
                  onClick={(e) => handleOpenInquiryModal(SPONSORS_DATA.tiers[3], slot, e)}
                  className="w-full btn-voxel btn-voxel-redstone text-xs py-2 flex items-center justify-center gap-1.5 font-bold"
                >
                  <span>CLAIM COMMUNITY SLOT</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. FULL DELIVERABLES COMPARISON MATRIX TABLE */}
      <section className="relative z-10 px-4 sm:px-6 max-w-7xl mx-auto mb-20">
        <div className="bg-[#120524]/95 backdrop-blur-2xl border-4 border-[#FFD34D] shadow-[0_12px_50px_rgba(0,0,0,0.95),0_0_35px_rgba(255,211,77,0.25)] p-6 sm:p-10">
          <div className="text-center mb-8">
            <span className="font-pixel-arcade text-xs text-[#FFD34D] uppercase tracking-widest font-bold">
              CROSS-TIER MATRIX & DELIVERABLES
            </span>
            <h2 className="font-pixel-title text-2xl sm:text-4xl text-white font-bold mt-1 drop-shadow-[0_4px_0_#000]">
              SPONSORSHIP DELIVERABLES COMPARISON
            </h2>
            <p className="text-xs sm:text-sm text-[#E0E2F5] font-sans max-w-2xl mx-auto mt-2">
              Compare executive benefits, stage presence, recruitment privileges, and brand footprint across all ore tiers.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-sans text-xs border-collapse">
              <thead>
                <tr className="border-b-2 border-[#3A1E54] bg-[#1C0A32]">
                  <th className="p-3.5 font-pixel-arcade text-[10px] text-[#E0E2F5] font-bold">DELIVERABLE / ENTITLEMENT</th>
                  <th className="p-3.5 font-pixel-arcade text-[10px] text-[#4FD9FF] font-bold bg-[#4FD9FF]/10">💎 DIAMOND TITLE</th>
                  <th className="p-3.5 font-pixel-arcade text-[10px] text-[#FFD34D] font-bold bg-[#FFD34D]/10">🟡 GOLD POWERED</th>
                  <th className="p-3.5 font-pixel-arcade text-[10px] text-[#C4CBCE] font-bold bg-[#C4CBCE]/10">⚪ IRON ASSOCIATE</th>
                  <th className="p-3.5 font-pixel-arcade text-[10px] text-[#E14E3D] font-bold bg-[#E14E3D]/10">🔴 REDSTONE SIGNAL</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2B1540]">
                {SPONSORS_DATA.deliverablesMatrix.map((row, idx) => (
                  <tr key={idx} className="hover:bg-[#1A0830] transition-colors">
                    <td className="p-3.5 text-white font-bold">{row.perk}</td>
                    <td className="p-3.5 text-[#4FD9FF] font-semibold bg-[#4FD9FF]/5">{row.diamond}</td>
                    <td className="p-3.5 text-[#FFD34D] font-semibold bg-[#FFD34D]/5">{row.gold}</td>
                    <td className="p-3.5 text-[#C4CBCE] font-semibold bg-[#C4CBCE]/5">{row.iron}</td>
                    <td className="p-3.5 text-[#E14E3D] font-semibold bg-[#E14E3D]/5">{row.redstone}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 8. SPONSOR FAQ ACCORDION */}
      <section className="relative z-10 px-4 sm:px-6 max-w-5xl mx-auto mb-20">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 font-pixel-arcade text-xs text-[#55FF55] bg-[#55FF55]/10 border border-[#55FF55]/30 px-3 py-1 uppercase tracking-wider font-bold mb-2">
            <Target className="w-3.5 h-3.5 text-[#55FF55]" />
            CORPORATE PARTNERSHIP FAQ
          </div>
          <h2 className="font-pixel-title text-2xl sm:text-4xl text-white font-bold drop-shadow-[0_4px_0_#000]">
            SPONSORSHIP PROTOCOLS & INQUIRIES
          </h2>
        </div>

        <div className="space-y-3">
          {SPONSORS_DATA.faqs.map((faq, index) => {
            const isOpen = expandedFaq === index;

            return (
              <div
                key={index}
                className="bg-[#120524]/95 backdrop-blur-2xl border-2 border-[#3A1E54] transition-all shadow-[0_4px_16px_rgba(0,0,0,0.8)] overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-3 text-white font-bold select-none hover:bg-[#1A0830] transition-colors"
                >
                  <span className="font-pixel-heading text-sm sm:text-base text-white tracking-wide">
                    {faq.q}
                  </span>
                  <span className="w-7 h-7 bg-[#090214] border border-[#3A1E54] flex items-center justify-center text-[#FFD34D] flex-shrink-0">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </span>
                </button>

                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 pt-1 border-t border-[#3A1E54] bg-[#090214]/90">
                    <p className="text-xs sm:text-sm text-[#E0E2F5] font-sans leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 9. INTERACTIVE SPONSOR SLOT CLAIM MODAL */}
      {selectedSlotForModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="bg-[#120524] border-4 border-[#4FD9FF] shadow-[0_0_60px_rgba(79,217,255,0.5)] p-6 sm:p-8 max-w-xl w-full relative">
            <button
              onClick={() => setSelectedSlotForModal(null)}
              className="absolute top-4 right-4 text-[#A0A0B8] hover:text-white p-1 border border-[#3A1E54] bg-[#090214]"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="inline-flex items-center gap-2 font-pixel-arcade text-xs text-[#4FD9FF] bg-[#4FD9FF]/15 border border-[#4FD9FF]/40 px-3 py-1 uppercase tracking-wider font-bold mb-3">
              <Building className="w-3.5 h-3.5 text-[#4FD9FF]" />
              OFFICIAL SPONSORSHIP INQUIRY TERMINAL
            </div>

            <h3 className="font-pixel-title text-xl sm:text-2xl text-white font-bold mb-1">
              CLAIM {selectedSlotForModal.tierName.toUpperCase()}
            </h3>

            <p className="text-xs text-[#FFD34D] font-pixel-arcade mb-4">
              SLOT CODE: [{selectedSlotForModal.slotCode}] · {selectedSlotForModal.slotTitle}
            </p>

            <p className="text-xs sm:text-sm text-[#E0E2F5] font-sans leading-relaxed mb-6">
              Our corporate relations secretariat will coordinate your branding deliverables, booth dimensions, stage time, and contract draft directly.
            </p>

            <div className="space-y-3">
              <a
                href={`mailto:${SPONSORS_DATA.contactEmail}?subject=Sponsorship%20Inquiry%20-%20${encodeURIComponent(
                  selectedSlotForModal.tierName
                )}%20[${selectedSlotForModal.slotCode}]&body=Dear%20Singularity%202K26%20Corporate%20Secretariat,%0A%0AWe%20are%20interested%20in%20claiming%20the%20${encodeURIComponent(
                  selectedSlotForModal.tierName
                )}%20slot%20(${encodeURIComponent(
                  selectedSlotForModal.slotTitle
                )})%20for%20our%20organization.%0A%0AOrganization%20Name:%20%0AContact%20Person:%20%0APhone/WhatsApp:%20%0AKey%20Objectives:%20%0A%0APlease%20share%20the%20commercial%20prospectus%20and%20agreement%20draft.`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundFx.playChestOpen()}
                className="w-full btn-voxel btn-voxel-gold text-xs sm:text-sm py-3.5 flex items-center justify-center gap-2 font-bold shadow-[0_0_25px_rgba(255,211,77,0.5)]"
              >
                <Mail className="w-4 h-4 text-black" />
                <span className="text-black">SEND INQUIRY VIA EMAIL</span>
              </a>

              <button
                onClick={() => setSelectedSlotForModal(null)}
                className="w-full btn-voxel btn-voxel-stone text-xs py-2.5"
              >
                CLOSE TERMINAL
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Global Footer */}
      <VoxelFooter />
    </main>
  );
}
