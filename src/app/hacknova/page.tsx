"use client";

import React, { useState } from "react";
import { HACKNOVA_DATA, HackRewardPillar, EncryptedTrack } from "@/data/hacknova";
import { useAchievement } from "@/components/ui/AchievementSystem";
import { soundFx } from "@/lib/soundFx";
import { spawnBlockBreakParticles } from "@/lib/particles";
import { VoxelFooter } from "@/components/ui/VoxelFooter";
import { LavaFlowCanvas } from "@/components/animations/LavaFlowCanvas";
import {
  Trophy,
  Award,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Bot,
  Cloud,
  Shield,
  TrendingUp,
  ExternalLink,
  Lock,
  Wallet,
  Package,
  Utensils,
  HelpCircle,
  ArrowRight,
  Terminal,
} from "lucide-react";
import confetti from "canvas-confetti";

export default function HackNovaPage() {
  const { unlockAchievement } = useAchievement();
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  React.useEffect(() => {
    unlockAchievement("CAVE_EXPLORER");
  }, [unlockAchievement]);

  const handleCardInteract = (e: React.MouseEvent) => {
    soundFx.playChestOpen();
    spawnBlockBreakParticles(e.clientX, e.clientY, 15);
    try {
      confetti({
        particleCount: 20,
        spread: 50,
        origin: { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight },
        colors: ["#FF3B00", "#FFD34D", "#4FD9FF", "#55FF55"],
      });
    } catch {}
  };

  const toggleFaq = (index: number) => {
    soundFx.playClick();
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  const getTrackIcon = (iconName: string, className = "w-6 h-6") => {
    switch (iconName) {
      case "bot":
        return <Bot className={className} />;
      case "cloud":
        return <Cloud className={className} />;
      case "shield":
        return <Shield className={className} />;
      case "brain":
      case "trending-up":
        return <TrendingUp className={className} />;
      default:
        return <Sparkles className={className} />;
    }
  };

  const getRewardIcon = (iconName: string, className = "w-7 h-7") => {
    switch (iconName) {
      case "wallet":
        return <Wallet className={className} />;
      case "trophy":
        return <Trophy className={className} />;
      case "package":
        return <Package className={className} />;
      case "utensils":
        return <Utensils className={className} />;
      case "award":
        return <Award className={className} />;
      default:
        return <Sparkles className={className} />;
    }
  };

  return (
    <main className="min-h-screen pt-24 sm:pt-28 relative bg-[#07010C] text-white">
      {/* 4K Magma Gorge Background Image with Full-Page Continuity */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat opacity-95 brightness-110 contrast-105 saturate-110 pointer-events-none"
        style={{
          backgroundImage: "url('/images/bg_lava_forge_4k.jpg')",
        }}
      />

      {/* Dynamic Animated Flowing Molten Lava & Rising Embers Canvas */}
      <LavaFlowCanvas />

      {/* Atmospheric Soft Vignette across Entire Page */}
      <div className="fixed inset-0 bg-gradient-to-b from-[#07010C]/75 via-[#100308]/80 to-[#07010C]/95 pointer-events-none" />

      {/* 1. HERO SECTION */}
      <section className="relative z-10 px-4 sm:px-6 max-w-7xl mx-auto text-center mb-14">
        {/* Top Coalition Badge Header */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-4">
          <div className="px-3.5 py-1 bg-[#120308]/90 backdrop-blur-md border border-[#E14E3D]/60 shadow-[0_2px_12px_rgba(225,78,61,0.25)] flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#E14E3D] animate-pulse" />
            <span className="font-pixel-arcade text-[10px] sm:text-xs text-[#E14E3D] uppercase font-bold tracking-wider">
              FLAGSHIP 24H HACKATHON
            </span>
          </div>
          <div className="px-3.5 py-1 bg-[#120308]/90 backdrop-blur-md border border-[#FFD34D]/60 shadow-[0_2px_12px_rgba(255,211,77,0.2)] flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#FFD34D]" />
            <span className="font-pixel-arcade text-[10px] sm:text-xs text-[#FFD34D] uppercase font-bold tracking-wider">
              HBTU KANPUR
            </span>
          </div>
        </div>

        {/* Grand Title Lockup */}
        <h1 className="font-pixel-title text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-white font-bold tracking-wider uppercase drop-shadow-[0_8px_0_#000] [text-shadow:0_0_40px_rgba(225,78,61,0.7)]">
          HACKNOVA <span className="text-[#E14E3D]">2.0</span>
        </h1>

        <div className="font-pixel-sub text-xs sm:text-sm md:text-base text-[#FFD34D] font-bold uppercase tracking-widest mt-2 drop-shadow-[0_2px_6px_#000]">
          24-HOUR PAN-INDIA AI & AUTONOMOUS AGENTS HACKATHON
        </div>

        <p className="text-sm sm:text-base text-[#E8E8F5] font-sans max-w-3xl mx-auto mt-4 leading-relaxed font-normal drop-shadow-[0_2px_8px_#000]">
          Organized by <strong>N8N Data Science Community</strong> in strategic collaboration with <strong>AWS SBG HBTU</strong> and <strong>Department of Mathematics, HBTU Kanpur</strong>.
          Descend into the volcanic proving ground to architect autonomous agent loops, serverless workflows, and mathematical computing algorithms.
        </p>

        {/* 4 Quick Stat Pills */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto mt-8">
          <div className="bg-[#120308]/92 backdrop-blur-md border-2 border-[#E14E3D]/50 p-3.5 text-center shadow-[0_4px_16px_rgba(0,0,0,0.8)]">
            <div className="font-pixel-title text-lg sm:text-xl text-[#55FF55] font-bold">24 HOURS</div>
            <div className="font-pixel-arcade text-[9px] sm:text-[10px] text-[#A0A0B8] mt-0.5">NON-STOP SPRINT</div>
          </div>
          <div className="bg-[#120308]/92 backdrop-blur-md border-2 border-[#E14E3D]/50 p-3.5 text-center shadow-[0_4px_16px_rgba(0,0,0,0.8)]">
            <div className="font-pixel-title text-lg sm:text-xl text-[#4FD9FF] font-bold">2–4 BUILDERS</div>
            <div className="font-pixel-arcade text-[9px] sm:text-[10px] text-[#A0A0B8] mt-0.5">SQUAD SIZE</div>
          </div>
          <div className="bg-[#120308]/92 backdrop-blur-md border-2 border-[#E14E3D]/50 p-3.5 text-center shadow-[0_4px_16px_rgba(0,0,0,0.8)]">
            <div className="flex items-center justify-center gap-1 text-[#FFD34D] font-bold">
              <span className="font-sans text-lg sm:text-xl font-black">₹</span>
              <span className="font-pixel-title text-base sm:text-lg">199 / PERSON</span>
            </div>
            <div className="font-pixel-arcade text-[9px] sm:text-[10px] text-[#A0A0B8] mt-0.5">ENTRY PASS</div>
          </div>
          <div className="bg-[#120308]/92 backdrop-blur-md border-2 border-[#E14E3D]/50 p-3.5 text-center shadow-[0_4px_16px_rgba(0,0,0,0.8)]">
            <div className="flex items-center justify-center gap-1 text-[#E14E3D] font-bold">
              <span className="font-sans text-lg sm:text-xl font-black">₹</span>
              <span className="font-pixel-title text-base sm:text-lg">1,XX,XXX.XX+</span>
            </div>
            <div className="font-pixel-arcade text-[9px] sm:text-[10px] text-[#A0A0B8] mt-0.5">GRAND BOUNTY POOL</div>
          </div>
        </div>

        {/* Primary Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={HACKNOVA_DATA.portalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-voxel btn-voxel-redstone text-xs sm:text-sm px-8 py-4 flex items-center gap-2.5 shadow-[0_0_35px_rgba(225,78,61,0.6)] font-bold"
          >
            <span>REGISTER ON HACKNOVA PORTAL</span>
            <ExternalLink className="w-4 h-4" />
          </a>

          <a
            href="#rewards-vault"
            className="btn-voxel btn-voxel-gold text-xs sm:text-sm px-6 py-4 flex items-center gap-2"
          >
            <span>EXPLORE REWARD MATRIX</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* 2. WHAT IS HACKNOVA 2.0? — BUILD WITH AI & AUTONOMOUS AGENTS */}
      <section className="relative z-10 px-4 sm:px-6 max-w-7xl mx-auto mb-16">
        <div className="bg-[#120308]/92 backdrop-blur-2xl border-4 border-[#E14E3D] shadow-[0_12px_45px_rgba(0,0,0,0.95),0_0_40px_rgba(225,78,61,0.4)] p-6 sm:p-10 relative overflow-hidden">
          {/* Top glowing accent strip */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#E14E3D] via-[#FFD34D] to-[#4FD9FF] shadow-[0_0_20px_#E14E3D]" />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b-2 border-[#3A141E] pb-6 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 font-pixel-arcade text-xs text-[#55FF55] bg-[#55FF55]/10 border border-[#55FF55]/30 px-3 py-1 uppercase tracking-wider font-bold mb-2">
                <Terminal className="w-3.5 h-3.5 text-[#55FF55]" />
                WHAT IS HACKNOVA 2.0?
              </div>
              <h2 className="font-pixel-title text-2xl sm:text-4xl text-white font-bold drop-shadow-[0_4px_0_#000]">
                BUILD WITH <span className="text-[#55FF55]">AI AGENTS</span> & CLOUD SCALE
              </h2>
            </div>

            <div className="text-left md:text-right">
              <span className="font-pixel-arcade text-xs text-[#A0A0B8] block">MODE & VENUE:</span>
              <span className="text-sm font-bold text-[#FFD34D]">Offline In-Person · HBTU Kanpur</span>
            </div>
          </div>

          <p className="text-sm sm:text-base text-[#E8E8F5] font-sans leading-relaxed mb-8">
            HackNova 2.0 is not a generic hackathon — it is India&apos;s premier <strong>Build with AI & Autonomous Agents</strong> proving ground.
            Participants construct end-to-end intelligent systems: from multi-agent swarms and tool-using LLM reasoning engines to event-driven serverless architectures and discrete mathematical optimizations.
          </p>

          {/* 4 Agentic Feature Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {HACKNOVA_DATA.agenticHighlights.map((highlight) => (
              <div
                key={highlight.id}
                className="bg-[#090107]/95 border-2 border-[#3A141E] p-5 hover:border-[#E14E3D] transition-all shadow-[0_4px_16px_rgba(0,0,0,0.8)]"
              >
                <div className="flex items-center justify-between mb-3">
                  <span
                    className="font-pixel-arcade text-[10px] px-2.5 py-0.5 border font-bold"
                    style={{
                      color: highlight.color,
                      borderColor: highlight.color,
                      backgroundColor: `${highlight.color}15`,
                    }}
                  >
                    {highlight.tag}
                  </span>
                  <div
                    className="w-8 h-8 rounded-none border flex items-center justify-center"
                    style={{
                      borderColor: `${highlight.color}60`,
                      color: highlight.color,
                      backgroundColor: `${highlight.color}10`,
                    }}
                  >
                    {getTrackIcon(highlight.icon, "w-4 h-4")}
                  </div>
                </div>

                <h3 className="font-pixel-heading text-base sm:text-lg font-bold text-white mb-2">
                  {highlight.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#D0D0E0] font-sans leading-relaxed">
                  {highlight.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. STRICTLY ENCRYPTED PROBLEM STATEMENTS TERMINAL */}
      <section className="relative z-10 px-4 sm:px-6 max-w-7xl mx-auto mb-16">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 font-pixel-arcade text-xs text-[#E14E3D] bg-[#E14E3D]/15 border border-[#E14E3D]/50 px-3.5 py-1 uppercase tracking-widest font-bold mb-2 animate-pulse">
            <Lock className="w-3.5 h-3.5 text-[#E14E3D]" />
            QUANTUM ENCRYPTED MATRIX
          </div>
          <h2 className="font-pixel-title text-2xl sm:text-4xl text-white font-bold drop-shadow-[0_4px_0_#000]">
            HACKATHON CHALLENGE TRACKS
          </h2>
          <p className="text-xs sm:text-sm text-[#E0E0EE] font-sans max-w-2xl mx-auto mt-2">
            To guarantee 100% fair play and zero pre-built codebases, all challenge statements remain strictly encrypted. Problem statements will be decrypted and revealed live at the Opening Ceremony.
          </p>
        </div>

        {/* 5 Strictly Encrypted Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {HACKNOVA_DATA.encryptedTracks.map((track) => (
            <div
              key={track.id}
              className="bg-[#120308]/92 backdrop-blur-2xl border-2 border-[#4A141E] hover:border-[#E14E3D] transition-all p-6 flex flex-col justify-between shadow-[0_8px_30px_rgba(0,0,0,0.9)] relative overflow-hidden group"
            >
              {/* Scanline & subtle animated amber glow effect */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(225,78,61,0.12)_0%,_transparent_70%)] pointer-events-none" />

              <div>
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <span className="font-pixel-arcade text-[11px] text-[#4FD9FF] bg-[#4FD9FF]/10 px-3 py-1 border border-[#4FD9FF]/30 font-bold tracking-wider">
                    {track.trackNumber}
                  </span>

                  <span className="font-pixel-arcade text-[9px] text-[#E14E3D] bg-[#E14E3D]/20 px-2.5 py-1 border border-[#E14E3D]/50 flex items-center gap-1.5 font-bold tracking-wider">
                    <Lock className="w-3 h-3 text-[#E14E3D] animate-pulse" />
                    ENCRYPTED
                  </span>
                </div>

                {/* Encrypted Visual Chamber */}
                <div className="bg-[#080106] border border-[#3A141E] p-4 text-center my-3 space-y-2">
                  <div className="w-12 h-12 mx-auto bg-[#14020A] border border-[#E14E3D]/40 flex items-center justify-center shadow-[0_0_15px_rgba(225,78,61,0.25)]">
                    <Lock className="w-6 h-6 text-[#E14E3D]" />
                  </div>

                  <div className="font-pixel-title text-sm sm:text-base text-[#FFD34D] tracking-widest pt-1">
                    [CLASSIFIED]
                  </div>

                  <div className="font-pixel-arcade text-[10px] text-[#A0A0B8] tracking-widest font-mono">
                    HASH: {track.cipherHash}
                  </div>
                </div>
              </div>

              {/* Status Footer */}
              <div className="pt-3 border-t border-[#3A141E] flex items-center justify-between">
                <span className="font-pixel-arcade text-[9px] text-[#55FF55] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-[#55FF55] animate-ping" />
                  UNLOCKS AT T-0
                </span>
                <span className="font-pixel-arcade text-[9px] text-[#A0A0B8]">
                  OPENING CEREMONY
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. GRAND BOUNTY & REWARDS MATRIX (₹ 1,XX,XXX.XX+) */}
      <section id="rewards-vault" className="relative z-10 px-4 sm:px-6 max-w-7xl mx-auto mb-16 scroll-mt-28">
        <div className="bg-[#120308]/95 backdrop-blur-2xl border-4 border-[#FFD34D] shadow-[0_12px_50px_rgba(0,0,0,0.95),0_0_50px_rgba(255,211,77,0.35)] p-6 sm:p-10 relative overflow-hidden">
          {/* Top golden glowing bar */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-[#FFD34D] shadow-[0_0_20px_#FFD34D]" />

          {/* Grand Vault Header */}
          <div className="text-center max-w-4xl mx-auto border-b-2 border-[#3A1E14] pb-8 mb-10">
            <div className="inline-flex items-center gap-2 font-pixel-arcade text-xs text-[#FFD34D] bg-[#FFD34D]/15 border border-[#FFD34D]/40 px-4 py-1.5 uppercase tracking-widest font-bold mb-3 shadow-[0_0_20px_rgba(255,211,77,0.2)]">
              <Trophy className="w-4 h-4 text-[#FFD34D]" />
              GRAND BOUNTY & REWARD MATRIX
            </div>

            <h2 className="font-pixel-title text-2xl sm:text-4xl text-[#F0F0FF] font-bold tracking-wider drop-shadow-[0_4px_0_#000] uppercase mb-4">
              TOTAL PRIZE POOL
            </h2>

            {/* Clean, Non-Overlapping Grand Amount Box */}
            <div className="inline-flex items-center justify-center gap-2 sm:gap-3 px-6 py-3.5 bg-[#090107]/95 border-2 border-[#FFD34D]/70 shadow-[0_0_35px_rgba(255,211,77,0.25)]">
              <span className="font-sans text-3xl sm:text-5xl md:text-6xl font-black text-[#FFD34D] leading-none select-none drop-shadow-[0_2px_12px_rgba(255,211,77,0.8)]">
                ₹
              </span>
              <span className="font-pixel-title text-3xl sm:text-5xl md:text-6xl text-[#FFD34D] font-bold tracking-wider leading-none drop-shadow-[0_4px_0_#000] [text-shadow:0_0_30px_rgba(255,211,77,0.8)]">
                1,XX,XXX.XX+
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#E8E8F5] font-sans mt-4 leading-relaxed font-normal max-w-2xl mx-auto">
              Direct cash prizes for podium finishers, handcrafted trophies, official swags, food and beverages provided, and verified certificates for all candidates.
            </p>
          </div>

          {/* 5 Distinct Clean Reward Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {HACKNOVA_DATA.rewardPillars.map((pillar) => (
              <div
                key={pillar.id}
                onClick={handleCardInteract}
                className="p-6 border-2 bg-[#090107]/95 border-[#3A141E] hover:border-[#FFD34D] hover:bg-[#14030B] transition-all flex flex-col justify-between relative shadow-[0_8px_24px_rgba(0,0,0,0.8)] cursor-pointer select-none group"
              >
                {/* Top Accent Strip */}
                <div
                  className="absolute top-0 left-0 right-0 h-1.5 shadow-[0_0_12px_currentColor]"
                  style={{ backgroundColor: pillar.accentColor, color: pillar.accentColor }}
                />

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className="font-pixel-arcade text-[10px] px-2.5 py-1 border font-bold uppercase"
                      style={{
                        color: pillar.accentColor,
                        borderColor: pillar.accentColor,
                        backgroundColor: `${pillar.accentColor}15`,
                      }}
                    >
                      {pillar.badge}
                    </span>

                    <div
                      className="w-12 h-12 border-2 flex items-center justify-center flex-shrink-0 shadow-sm"
                      style={{
                        borderColor: pillar.accentColor,
                        color: pillar.accentColor,
                        backgroundColor: `${pillar.accentColor}15`,
                      }}
                    >
                      {getRewardIcon(pillar.icon, "w-6 h-6")}
                    </div>
                  </div>

                  <h3 className="font-pixel-heading text-xl font-bold text-white group-hover:text-[#FFD34D] transition-colors leading-tight mb-1">
                    {pillar.title}
                  </h3>

                  <div className="text-xs font-sans font-bold text-[#FFD34D] mb-3">
                    Target: {pillar.recipient}
                  </div>

                  <p className="text-xs sm:text-sm text-[#D0D0E0] font-sans leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-[#3A141E] flex items-center justify-between text-[10px] font-pixel-arcade font-bold">
                  <span style={{ color: pillar.accentColor }}>{pillar.badge}</span>
                  <span className="text-[#A0A0B8] group-hover:text-white transition-colors">
                    HACKNOVA 2.0
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. 24-HOUR SPRINT CHRONOLOGICAL ROADMAP */}
      <section className="relative z-10 px-4 sm:px-6 max-w-7xl mx-auto mb-16">
        <div className="text-center mb-10">
          <span className="font-pixel-arcade text-xs text-[#4FD9FF] uppercase tracking-widest font-bold">
            TIMELINE & RUNTIME
          </span>
          <h2 className="font-pixel-title text-2xl sm:text-4xl text-white font-bold mt-1 drop-shadow-[0_4px_0_#000]">
            24-HOUR HACKATHON MATRIX
          </h2>
          <p className="text-xs sm:text-sm text-[#E0E0EE] font-sans max-w-2xl mx-auto mt-2">
            Chronological checkpoints, mentorship raids, energy reloads, and code freeze schedule at HBTU Kanpur.
          </p>
        </div>

        <div className="space-y-3.5 max-w-4xl mx-auto">
          {HACKNOVA_DATA.timeline.map((stage) => (
            <div
              key={stage.level}
              className="bg-[#120308]/92 backdrop-blur-2xl border-2 border-[#3A141E] hover:border-[#E14E3D] transition-all p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-[0_4px_16px_rgba(0,0,0,0.8)] group"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-9 h-9 sm:w-11 sm:h-11 bg-[#0A0108] border-2 border-[#E14E3D] text-[#E14E3D] font-pixel-arcade text-xs sm:text-sm font-bold flex items-center justify-center flex-shrink-0 shadow-[0_0_12px_rgba(225,78,61,0.3)]">
                  {stage.level}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-pixel-arcade text-[10px] text-[#FFD34D] font-bold">
                      {stage.time}
                    </span>
                    <span className="text-[9px] font-pixel-arcade text-[#55FF55] bg-[#55FF55]/10 px-2 py-0.5 border border-[#55FF55]/30">
                      {stage.dayLabel}
                    </span>
                  </div>
                  <h3 className="font-pixel-heading text-sm sm:text-base font-bold text-white group-hover:text-[#4FD9FF] transition-colors mt-0.5">
                    {stage.title}
                  </h3>
                  <p className="text-xs text-[#C0C2D8] font-sans mt-1">
                    {stage.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. OFFICIAL FAQ ACCORDION (Updated with ₹199 registration & extension cord requirement) */}
      <section className="relative z-10 px-4 sm:px-6 max-w-5xl mx-auto mb-16">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 font-pixel-arcade text-xs text-[#55FF55] bg-[#55FF55]/10 border border-[#55FF55]/30 px-3 py-1 uppercase tracking-wider font-bold mb-2">
            <HelpCircle className="w-3.5 h-3.5 text-[#55FF55]" />
            FREQUENTLY ASKED QUESTIONS
          </div>
          <h2 className="font-pixel-title text-2xl sm:text-4xl text-white font-bold drop-shadow-[0_4px_0_#000]">
            HACKNOVA 2.0 PROTOCOLS & FAQ
          </h2>
          <p className="text-xs sm:text-sm text-[#E0E0EE] font-sans max-w-xl mx-auto mt-2">
            Everything you need to know about registration fee (₹199), team formation, workstation equipment, food, and prizes.
          </p>
        </div>

        <div className="space-y-3">
          {HACKNOVA_DATA.faqs.map((faq, index) => {
            const isOpen = expandedFaq === index;

            return (
              <div
                key={index}
                className="bg-[#120308]/95 backdrop-blur-2xl border-2 border-[#3A141E] transition-all shadow-[0_4px_16px_rgba(0,0,0,0.8)] overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-3 text-white font-bold select-none hover:bg-[#1A050E] transition-colors"
                >
                  <span className="font-pixel-heading text-sm sm:text-base text-white tracking-wide">
                    {faq.q}
                  </span>
                  <span className="w-7 h-7 bg-[#0A0108] border border-[#3A141E] flex items-center justify-center text-[#FFD34D] flex-shrink-0">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </span>
                </button>

                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 pt-1 border-t border-[#3A141E] bg-[#0A0108]/90">
                    <p className="text-xs sm:text-sm text-[#E0E0EE] font-sans leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 7. OFFICIAL ARENA RULES, CODE OF CONDUCT & MLH PRIVACY POLICY */}
      <section className="relative z-10 px-4 sm:px-6 max-w-6xl mx-auto mb-20">
        <div className="bg-[#120308]/92 backdrop-blur-2xl border-4 border-[#E14E3D] shadow-[0_12px_45px_rgba(0,0,0,0.95),0_0_35px_rgba(225,78,61,0.3)] p-6 sm:p-10 relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-[#3A141E] pb-5 mb-8">
            <div>
              <span className="font-pixel-arcade text-xs text-[#E14E3D] uppercase tracking-widest font-bold block mb-1">
                COMPLIANCE & PROTOCOLS
              </span>
              <h2 className="font-pixel-title text-2xl sm:text-3xl text-white font-bold drop-shadow-[0_4px_0_#000]">
                ARENA RULES & REGULATIONS
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={HACKNOVA_DATA.legalLinks.privacyPolicy}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-pixel-arcade text-[#4FD9FF] hover:underline bg-[#4FD9FF]/10 px-2.5 py-1 border border-[#4FD9FF]/30"
              >
                MLH Privacy Policy ↗
              </a>
              <a
                href={HACKNOVA_DATA.legalLinks.codeOfConduct}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-pixel-arcade text-[#55FF55] hover:underline bg-[#55FF55]/10 px-2.5 py-1 border border-[#55FF55]/30"
              >
                Code of Conduct ↗
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {HACKNOVA_DATA.rulesCategories.map((cat, idx) => (
              <div key={idx} className="bg-[#0A0108] border-2 border-[#3A141E] p-5 space-y-4">
                <h3 className="font-pixel-sub text-xs text-[#FFD34D] uppercase font-bold flex items-center gap-2 border-b border-[#3A141E] pb-2">
                  <span>{cat.title}</span>
                </h3>

                <ul className="space-y-3 font-sans text-xs text-[#D8DAEC]">
                  {cat.rules.map((rule, rIdx) => (
                    <li key={rIdx} className="space-y-0.5">
                      <strong className="text-white block font-semibold">{rule.label}:</strong>
                      <span className="leading-relaxed block text-[#C0C2D8]">{rule.detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-4 border-t-2 border-[#3A141E] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-sans text-[#A0A0B8]">
            <span>Need assistance? Email: <a href={`mailto:${HACKNOVA_DATA.legalLinks.supportEmail}`} className="text-[#4FD9FF] underline">{HACKNOVA_DATA.legalLinks.supportEmail}</a></span>
            <span className="font-pixel-arcade text-[10px] text-[#55FF55]">© 2026 HACKNOVA 2.0 × SINGULARITY HBTU</span>
          </div>
        </div>
      </section>

      {/* Global Footer */}
      <VoxelFooter />
    </main>
  );
}
