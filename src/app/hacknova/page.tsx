"use client";

import React, { useState } from "react";
import Link from "next/link";
import { HACKNOVA_DATA, HackRewardPillar, EncryptedTrack, HackTimelineStage } from "@/data/hacknova";
import { useAchievement } from "@/components/ui/AchievementSystem";
import { soundFx } from "@/lib/soundFx";
import { spawnBlockBreakParticles } from "@/lib/particles";
import { VoxelFooter } from "@/components/ui/VoxelFooter";
import { LavaFlowCanvas } from "@/components/animations/LavaFlowCanvas";
import {
  Trophy,
  Award,
  Medal,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Clock,
  Calendar,
  Users,
  MapPin,
  Bot,
  Cloud,
  Shield,
  TrendingUp,
  Flame,
  CheckCircle,
  ExternalLink,
  Lock,
  Wallet,
  Package,
  Utensils,
  FileText,
  Zap,
  HelpCircle,
  AlertTriangle,
  Mail,
  ArrowRight,
  Code2,
  Terminal,
} from "lucide-react";
import confetti from "canvas-confetti";

export default function HackNovaPage() {
  const { gainXp, unlockAchievement } = useAchievement();
  const [activeRewardTab, setActiveRewardTab] = useState<string>("cash-prizes");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  React.useEffect(() => {
    unlockAchievement("CAVE_EXPLORER");
  }, [unlockAchievement]);

  const handleRewardPillarClick = (pillar: HackRewardPillar, e: React.MouseEvent) => {
    soundFx.playChestOpen();
    spawnBlockBreakParticles(e.clientX, e.clientY, 15);
    setActiveRewardTab(pillar.id);

    try {
      confetti({
        particleCount: 25,
        spread: 60,
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

  const getRewardIcon = (iconName: string, className = "w-8 h-8") => {
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

  const selectedPillar =
    HACKNOVA_DATA.rewardPillars.find((p) => p.id === activeRewardTab) ||
    HACKNOVA_DATA.rewardPillars[0];

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
            <div className="font-pixel-title text-lg sm:text-xl text-[#FFD34D] font-bold">100% FREE</div>
            <div className="font-pixel-arcade text-[9px] sm:text-[10px] text-[#A0A0B8] mt-0.5">MEALS & SWAGS</div>
          </div>
          <div className="bg-[#120308]/92 backdrop-blur-md border-2 border-[#E14E3D]/50 p-3.5 text-center shadow-[0_4px_16px_rgba(0,0,0,0.8)]">
            <div className="font-pixel-title text-lg sm:text-xl text-[#E14E3D] font-bold">{HACKNOVA_DATA.grandPrizePoolFormatted}</div>
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
            <span>EXPLORE GRAND BOUNTIES</span>
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

      {/* 3. ENCRYPTED PROBLEM STATEMENTS TERMINAL */}
      <section className="relative z-10 px-4 sm:px-6 max-w-7xl mx-auto mb-16">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 font-pixel-arcade text-xs text-[#E14E3D] bg-[#E14E3D]/15 border border-[#E14E3D]/50 px-3.5 py-1 uppercase tracking-widest font-bold mb-2 animate-pulse">
            <Lock className="w-3.5 h-3.5 text-[#E14E3D]" />
            CLASSIFIED // QUANTUM ENCRYPTED
          </div>
          <h2 className="font-pixel-title text-2xl sm:text-4xl text-white font-bold drop-shadow-[0_4px_0_#000]">
            HACKATHON CHALLENGE DOMAINS
          </h2>
          <p className="text-xs sm:text-sm text-[#E0E0EE] font-sans max-w-2xl mx-auto mt-2">
            To ensure zero pre-built code and 100% fair competition, specific challenge statements remain encrypted until the live countdown reaches T-00:00:00 at the Opening Ceremony.
          </p>
        </div>

        {/* 5 Encrypted Domain Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {HACKNOVA_DATA.encryptedTracks.map((track) => (
            <div
              key={track.id}
              className="bg-[#120308]/92 backdrop-blur-2xl border-3 border-[#4A141E] hover:border-[#FFD34D] transition-all p-6 flex flex-col justify-between shadow-[0_8px_30px_rgba(0,0,0,0.9)] relative group"
            >
              {/* Top lock bar */}
              <div className="flex items-center justify-between mb-4">
                <span className="font-pixel-arcade text-[10px] text-[#4FD9FF] bg-[#4FD9FF]/10 px-2.5 py-1 border border-[#4FD9FF]/30 font-bold">
                  {track.trackNumber}
                </span>

                <span className="font-pixel-arcade text-[9px] text-[#E14E3D] bg-[#E14E3D]/20 px-2.5 py-1 border border-[#E14E3D]/50 flex items-center gap-1 font-bold">
                  <Lock className="w-3 h-3 text-[#E14E3D]" />
                  ENCRYPTED
                </span>
              </div>

              {/* Title & Domain */}
              <div className="space-y-2 mb-4">
                <span className="text-[10px] font-pixel-arcade text-[#FFD34D] uppercase font-bold tracking-wider block">
                  {track.domain}
                </span>
                <h3 className="font-pixel-heading text-lg font-bold text-white group-hover:text-[#4FD9FF] transition-colors leading-snug">
                  {track.title}
                </h3>
                <p className="text-xs text-[#C0C2D8] font-sans leading-relaxed">
                  {track.teaser}
                </p>
              </div>

              {/* Recommended Stack Chips */}
              <div className="pt-4 border-t border-[#3A141E]">
                <span className="font-pixel-arcade text-[9px] text-[#A0A0B8] block mb-2 font-bold">
                  COMPATIBLE STACKS:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {track.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="text-[9px] font-pixel-arcade text-white bg-[#0A0108] px-2 py-0.5 border border-[#3A141E]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. GRAND BOUNTY & REWARDS VAULT (₹ 1,XX,XXX.XX+) */}
      <section id="rewards-vault" className="relative z-10 px-4 sm:px-6 max-w-7xl mx-auto mb-16 scroll-mt-28">
        <div className="bg-[#120308]/95 backdrop-blur-2xl border-4 border-[#FFD34D] shadow-[0_12px_50px_rgba(0,0,0,0.95),0_0_50px_rgba(255,211,77,0.35)] p-6 sm:p-10 relative overflow-hidden">
          {/* Top golden glowing bar */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-[#FFD34D] shadow-[0_0_20px_#FFD34D]" />

          {/* Grand Vault Header */}
          <div className="text-center max-w-3xl mx-auto border-b-2 border-[#3A1E14] pb-8 mb-10">
            <div className="inline-flex items-center gap-2 font-pixel-arcade text-xs text-[#FFD34D] bg-[#FFD34D]/15 border border-[#FFD34D]/40 px-4 py-1.5 uppercase tracking-widest font-bold mb-3 shadow-[0_0_20px_rgba(255,211,77,0.2)]">
              <Trophy className="w-4 h-4 text-[#FFD34D]" />
              GRAND BOUNTY & REWARD MATRIX
            </div>

            <h2 className="font-pixel-title text-3xl sm:text-5xl md:text-6xl text-white font-bold drop-shadow-[0_6px_0_#000]">
              TOTAL PRIZE POOL:{" "}
              <span className="text-[#FFD34D] [text-shadow:0_0_30px_rgba(255,211,77,0.8)]">
                {HACKNOVA_DATA.grandPrizePoolFormatted}
              </span>
            </h2>

            <p className="text-xs sm:text-sm text-[#E8E8F5] font-sans mt-3 leading-relaxed font-normal">
              High-stakes bounties, handcrafted obsidian trophies, physical swag kits, complimentary catering, and verifiable certificates. Every single participant receives tangible value.
            </p>
          </div>

          {/* 5 Distinct Reward Pillars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {HACKNOVA_DATA.rewardPillars.map((pillar) => (
              <div
                key={pillar.id}
                onClick={(e) => handleRewardPillarClick(pillar, e)}
                className={`p-6 border-3 transition-all cursor-pointer select-none flex flex-col justify-between relative group ${
                  activeRewardTab === pillar.id
                    ? "bg-[#1C0510] border-white shadow-[0_0_30px_rgba(255,255,255,0.35),0_8px_0_#000] translate-y-[-2px]"
                    : "bg-[#090107]/95 border-[#3A141E] hover:border-[#FFD34D] hover:bg-[#14030B]"
                }`}
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
                      className="w-11 h-11 border-2 flex items-center justify-center flex-shrink-0 shadow-sm"
                      style={{
                        borderColor: pillar.accentColor,
                        color: pillar.accentColor,
                        backgroundColor: `${pillar.accentColor}15`,
                      }}
                    >
                      {getRewardIcon(pillar.icon, "w-6 h-6")}
                    </div>
                  </div>

                  <h3 className="font-pixel-heading text-lg font-bold text-white group-hover:text-[#FFD34D] transition-colors leading-tight mb-1">
                    {pillar.title}
                  </h3>

                  <div className="text-xs font-sans font-bold text-[#FFD34D] mb-3">
                    Target: {pillar.recipient}
                  </div>

                  <p className="text-xs text-[#D0D0E0] font-sans leading-relaxed mb-4">
                    {pillar.description}
                  </p>

                  <ul className="space-y-1.5 text-xs text-[#E0E0F0] font-sans list-disc list-inside">
                    {pillar.perks.map((perk, idx) => (
                      <li key={idx} className="leading-tight">
                        {perk}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-5 pt-3 border-t border-[#3A141E] flex items-center justify-between text-[10px] font-pixel-arcade font-bold">
                  <span style={{ color: pillar.accentColor }}>{pillar.badge}</span>
                  <span className="text-white group-hover:translate-x-1 transition-transform">INSPECT →</span>
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

      {/* 6. OFFICIAL FAQ ACCORDION (Imported from hacknova2-n8n-dsc.netlify.app/faq) */}
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
            Everything you need to know about registration, team formation, code originality, free meals, and accommodation.
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
