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
import { SponsorHoloCanvas } from "@/components/animations/SponsorHoloCanvas";
import { VoxelOre3D } from "@/components/ui/VoxelOre3D";
import {
  Sparkles,
  Download,
  Mail,
  Shield,
  Zap,
  Award,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Sliders,
  Check,
  Building,
  Target,
  Star,
  X,
  Radio,
  Cpu,
} from "lucide-react";
import confetti from "canvas-confetti";

export default function SponsorsPage() {
  const { unlockAchievement } = useAchievement();
  const [activeTierId, setActiveTierId] = useState<"diamond" | "gold" | "iron" | "redstone">("diamond");
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

  const activeTier = SPONSORS_DATA.tiers.find((t) => t.id === activeTierId) || SPONSORS_DATA.tiers[0];

  const handleTierSwitch = (tierId: "diamond" | "gold" | "iron" | "redstone", e: React.MouseEvent) => {
    soundFx.playChestOpen();
    spawnBlockBreakParticles(e.clientX, e.clientY, 15);
    setActiveTierId(tierId);

    try {
      confetti({
        particleCount: tierId === "diamond" ? 35 : tierId === "gold" ? 25 : 15,
        spread: 60,
        origin: { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight },
        colors: [activeTier.colorHex, "#FFD34D", "#4FD9FF", "#55FF55"],
      });
    } catch {}
  };

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
Email: n8ndatasciencecommunityevents@gmail.com
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
    <main className="min-h-screen pt-24 sm:pt-28 relative bg-[#06010A] text-white overflow-hidden">
      {/* 1. DEDICATED REAL-TIME CYBER GRID & VOLUMETRIC BEACON CANVAS */}
      <SponsorHoloCanvas
        activeColor={activeTier.colorHex}
        intensity={
          activeTier.id === "diamond"
            ? "maximum"
            : activeTier.id === "gold"
            ? "high"
            : activeTier.id === "iron"
            ? "medium"
            : "subtle"
        }
      />

      {/* 2. HERO LANDMARK SHOWCASE */}
      <section className="relative z-10 px-4 sm:px-6 max-w-7xl mx-auto text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#140822]/90 backdrop-blur-md border-2 border-[#4FD9FF] shadow-[0_0_25px_rgba(79,217,255,0.35)] mb-4 animate-pulse">
          <Sparkles className="w-4 h-4 text-[#4FD9FF]" />
          <span className="font-pixel-arcade text-xs text-[#4FD9FF] uppercase tracking-widest font-bold">
            3D HOLOGRAPHIC PATRON NEXUS // SINGULARITY 2K26
          </span>
        </div>

        <h1 className="font-pixel-title text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-white font-bold tracking-wider uppercase drop-shadow-[0_8px_0_#000] [text-shadow:0_0_45px_rgba(79,217,255,0.6)]">
          SOVEREIGN <span className="text-[#FFD34D]">SPONSOR SANCTUM</span>
        </h1>

        <div className="font-pixel-sub text-xs sm:text-sm md:text-base text-[#4FD9FF] font-bold uppercase tracking-widest mt-2 drop-shadow-[0_2px_6px_#000]">
          SHATABDI BHAVAN · HBTU WEST CAMPUS · OCTOBER 22–24, 2026
        </div>

        <p className="text-sm sm:text-base text-[#E0E2F5] font-sans max-w-3xl mx-auto mt-4 leading-relaxed font-normal drop-shadow-[0_2px_8px_#000]">
          Step onto the central 3D Holo-Projector Stage. Command executive mainstage authority, recruit top-tier collegiate AI engineers, and sponsor flagship challenge tracks.
        </p>

        {/* 4 Audience Impact Metrics Telemetry HUD */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 max-w-5xl mx-auto mt-8">
          {SPONSOR_IMPACT_METRICS.map((metric, idx) => (
            <div
              key={idx}
              className="bg-[#0D041A]/95 backdrop-blur-md border-2 p-3.5 text-center shadow-[0_6px_20px_rgba(0,0,0,0.85)] hover:translate-y-[-2px] transition-all"
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

          <button
            onClick={(e) => handleOpenInquiryModal(activeTier, undefined, e)}
            className="btn-voxel btn-voxel-diamond text-xs sm:text-sm px-8 py-4 flex items-center gap-2 font-bold shadow-[0_0_35px_rgba(79,217,255,0.5)]"
          >
            <Mail className="w-4 h-4" />
            <span>CLAIM A SPONSOR SLOT</span>
          </button>
        </div>

        {downloadSuccess && (
          <div className="mt-4 inline-block bg-[#1B2E15] border-2 border-[#55FF55] px-5 py-2.5 text-xs font-pixel-arcade text-[#55FF55] animate-bounce shadow-[0_0_30px_rgba(85,255,85,0.6)] font-bold">
            ✓ SPONSORSHIP PROSPECTUS DECK DOWNLOADED TO YOUR DEVICE!
          </div>
        )}
      </section>

      {/* 3. GRAND 3D HOLO-PROJECTOR STAGE (NO GENERIC CARDS) */}
      <section className="relative z-10 px-4 sm:px-6 max-w-7xl mx-auto mb-20">
        {/* Tier Selector Holo-Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {SPONSORS_DATA.tiers.map((tier) => {
            const isSelected = activeTierId === tier.id;

            return (
              <button
                key={tier.id}
                onClick={(e) => handleTierSwitch(tier.id, e)}
                className={`p-4 border-3 text-left transition-all relative overflow-hidden select-none backdrop-blur-xl ${
                  isSelected
                    ? "bg-[#18082C] border-white shadow-[0_0_35px_rgba(255,255,255,0.4),0_6px_0_#000] translate-y-[-2px]"
                    : "bg-[#0A0214]/90 border-[#3A1E54] hover:border-white hover:bg-[#120520]"
                }`}
              >
                {/* Active Top Glow Bar */}
                <div
                  className="absolute top-0 left-0 right-0 h-1.5"
                  style={{
                    backgroundColor: tier.colorHex,
                    boxShadow: isSelected ? `0 0 15px ${tier.colorHex}` : "none",
                  }}
                />

                <div className="flex items-center justify-between mb-1">
                  <span className="font-pixel-title text-base sm:text-lg text-white font-bold">
                    {tier.name.toUpperCase()}
                  </span>
                  <span className="text-xl">
                    {tier.id === "diamond" ? "💎" : tier.id === "gold" ? "🟡" : tier.id === "iron" ? "⚪" : "🔴"}
                  </span>
                </div>

                <div
                  className="font-pixel-arcade text-[10px] font-bold truncate"
                  style={{ color: tier.colorHex }}
                >
                  {tier.badge}
                </div>

                <div className="text-[10px] font-sans text-[#A0A0B8] mt-1">
                  {tier.investmentTier}
                </div>
              </button>
            );
          })}
        </div>

        {/* 3D Holo-Chamber Stage Container */}
        <div
          className="bg-[#0A0216]/98 backdrop-blur-2xl border-4 p-6 sm:p-12 relative overflow-hidden shadow-[0_15px_60px_rgba(0,0,0,0.95)] transition-all duration-700"
          style={{ borderColor: activeTier.colorHex, boxShadow: `0 0 50px ${activeTier.colorHex}30` }}
        >
          {/* Top Stage Glowing Header Strip */}
          <div
            className="absolute top-0 left-0 right-0 h-2 shadow-[0_0_25px_currentColor]"
            style={{ backgroundColor: activeTier.colorHex, color: activeTier.colorHex }}
          />

          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 mb-10 pb-8 border-b-2 border-[#2B1540]">
            {/* 3D Model Stage Left */}
            <div className="w-full lg:w-1/2 flex flex-col items-center justify-center relative py-6">
              {/* Interactive 3D CSS Voxel Ore Model */}
              <VoxelOre3D
                tierId={activeTier.id}
                colorHex={activeTier.colorHex}
                size={activeTier.id === "diamond" ? 170 : 150}
              />

              <div className="mt-6 text-center space-y-1">
                <span
                  className="font-pixel-arcade text-xs px-3 py-1 border font-bold uppercase tracking-wider inline-block"
                  style={{
                    color: activeTier.colorHex,
                    borderColor: activeTier.colorHex,
                    backgroundColor: `${activeTier.colorHex}15`,
                  }}
                >
                  {activeTier.badge}
                </span>

                <div className="font-pixel-title text-xl sm:text-2xl text-white font-bold tracking-wide">
                  {activeTier.name} Sanctum
                </div>

                <div className="font-pixel-arcade text-[10px] text-[#A0A0B8]">
                  INTERACTIVE 3D VOXEL CORE · HOVER / DRAG TO ROTATE
                </div>
              </div>
            </div>

            {/* Stage Right: Projected Holographic Deal Package */}
            <div className="w-full lg:w-1/2 space-y-4">
              <div className="inline-flex items-center gap-2 font-pixel-arcade text-xs text-[#FFD34D] bg-[#FFD34D]/15 border border-[#FFD34D]/40 px-3 py-1 uppercase tracking-wider font-bold">
                <Radio className="w-3.5 h-3.5 text-[#FFD34D] animate-pulse" />
                PROJECTED DELIVERABLES MATRIX
              </div>

              <h2 className="font-pixel-title text-2xl sm:text-3xl text-white font-bold leading-tight">
                {activeTier.dealOverview}
              </h2>

              <p className="text-xs sm:text-sm text-[#D0D4EC] font-sans leading-relaxed">
                {activeTier.tagline}
              </p>

              {/* Deal Checklist */}
              <div className="space-y-2 pt-2">
                {activeTier.coreDeliverables.map((deliv, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 bg-[#120524] border border-[#3A1E54] flex items-center gap-3 text-xs sm:text-sm text-[#F0F4FF] font-sans hover:border-[#4FD9FF] transition-colors"
                  >
                    <span
                      className="w-5 h-5 flex items-center justify-center font-bold text-xs flex-shrink-0"
                      style={{ color: activeTier.colorHex }}
                    >
                      ✦
                    </span>
                    <span>{deliv}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Holographic Slot Vault Bay (Interactive Slot Selector) */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
              <div>
                <span className="font-pixel-arcade text-xs text-[#55FF55] uppercase tracking-wider font-bold block">
                  AVAILABLE CORPORATE SLOTS
                </span>
                <h3 className="font-pixel-title text-xl sm:text-2xl text-white font-bold">
                  {activeTier.name} Reservation Terminal
                </h3>
              </div>

              <div className="text-xs font-pixel-arcade text-[#A0A0B8]">
                TOTAL SLOTS IN TIER: {activeTier.slots.length}
              </div>
            </div>

            {/* Slots Bay */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {activeTier.slots.map((slot) => (
                <div
                  key={slot.slotId}
                  className="p-5 bg-[#120524] border-2 transition-all relative overflow-hidden flex flex-col justify-between shadow-[0_8px_25px_rgba(0,0,0,0.85)] group hover:translate-y-[-3px]"
                  style={{ borderColor: `${activeTier.colorHex}70` }}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span
                        className="font-pixel-arcade text-[10px] px-2.5 py-0.5 border font-bold"
                        style={{
                          color: activeTier.colorHex,
                          borderColor: activeTier.colorHex,
                          backgroundColor: `${activeTier.colorHex}15`,
                        }}
                      >
                        [{slot.slotCode}]
                      </span>
                      <span className="font-pixel-arcade text-[9px] text-[#55FF55] bg-[#55FF55]/15 px-2 py-0.5 border border-[#55FF55]/40 flex items-center gap-1 font-bold">
                        <span className="w-1.5 h-1.5 bg-[#55FF55] animate-ping" />
                        {slot.status}
                      </span>
                    </div>

                    <div className="text-[10px] font-pixel-arcade text-[#FFD34D] uppercase font-bold tracking-wider mb-1.5">
                      {slot.domainTag}
                    </div>

                    <h4 className="font-pixel-heading text-base sm:text-lg font-bold text-white group-hover:text-[#4FD9FF] transition-colors leading-snug mb-3">
                      {slot.slotTitle}
                    </h4>

                    <p className="text-xs text-[#C0C0D8] font-sans mb-5 leading-relaxed">
                      {slot.deliverablesHighlight}
                    </p>
                  </div>

                  <button
                    onClick={(e) => handleOpenInquiryModal(activeTier, slot, e)}
                    className="w-full btn-voxel text-xs py-3 flex items-center justify-center gap-2 font-bold shadow-md"
                    style={{
                      backgroundColor: activeTier.colorHex,
                      color: "#000",
                      borderColor: activeTier.colorHex,
                    }}
                  >
                    <span>CLAIM THIS SLOT</span>
                    <ArrowRight className="w-3.5 h-3.5 text-black" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. INTERACTIVE SPONSORSHIP ROI & TIER MATCHER CALCULATOR */}
      <section id="tier-calculator" className="relative z-10 px-4 sm:px-6 max-w-6xl mx-auto mb-20 scroll-mt-28">
        <div className="bg-[#120524]/95 backdrop-blur-2xl border-4 border-[#4FD9FF] shadow-[0_12px_50px_rgba(0,0,0,0.95),0_0_40px_rgba(79,217,255,0.3)] p-6 sm:p-10 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#4FD9FF] shadow-[0_0_20px_#4FD9FF]" />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b-2 border-[#3A1E54] pb-6 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 font-pixel-arcade text-xs text-[#4FD9FF] bg-[#4FD9FF]/15 border border-[#4FD9FF]/40 px-3 py-1 uppercase tracking-wider font-bold mb-2">
                <Sliders className="w-3.5 h-3.5 text-[#4FD9FF]" />
                INTERACTIVE ROI MATCHER
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
              onClick={(e) => {
                setActiveTierId(matchedTierObj.id);
                handleOpenInquiryModal(matchedTierObj, undefined, e);
              }}
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

      {/* 5. FULL DELIVERABLES COMPARISON MATRIX TABLE */}
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

      {/* 6. SPONSOR PROTOCOLS & FAQ ACCORDION */}
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

      {/* 7. INTERACTIVE SPONSOR SLOT CLAIM MODAL */}
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
