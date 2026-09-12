"use client";

import React, { useState } from "react";
import Link from "next/link";
import { HACKNOVA_DATA, LootChest, HackTrack } from "@/data/hacknova";
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
} from "lucide-react";
import confetti from "canvas-confetti";

export default function HackNovaPage() {
  const { gainXp, unlockAchievement } = useAchievement();
  const [openedChest, setOpenedChest] = useState<string | null>("diamond-chest");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  React.useEffect(() => {
    unlockAchievement("CAVE_EXPLORER");
  }, [unlockAchievement]);

  const handleChestClick = (chest: LootChest, e: React.MouseEvent) => {
    soundFx.playChestOpen();
    spawnBlockBreakParticles(e.clientX, e.clientY, 15);
    setOpenedChest(chest.id);

    try {
      confetti({
        particleCount: 25,
        spread: 60,
        origin: { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight },
        colors: [chest.colorHex, "#FFFFFF"],
      });
    } catch {}
  };

  const getTrackIcon = (iconName: string) => {
    switch (iconName) {
      case "bot":
        return <Bot className="w-6 h-6 text-[#55FF55]" />;
      case "cloud":
        return <Cloud className="w-6 h-6 text-[#4FD9FF]" />;
      case "shield":
        return <Shield className="w-6 h-6 text-[#E14E3D]" />;
      case "trending-up":
        return <TrendingUp className="w-6 h-6 text-[#FFD34D]" />;
      default:
        return <Sparkles className="w-6 h-6 text-[#4FD9FF]" />;
    }
  };

  return (
    <main className="min-h-screen bg-[#07010C] text-[#F5F5F0]">
      {/* CAVE / ARENA HERO SECTION */}
      <section className="relative pt-16 pb-24 px-4 sm:px-6 overflow-hidden">
        {/* 4K Magma Gorge Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-100 brightness-115 contrast-105 saturate-115"
          style={{
            backgroundImage: "url('/images/bg_lava_forge_4k.jpg')",
          }}
        />

        {/* Dynamic Animated Flowing Lava Canvas */}
        <LavaFlowCanvas />

        {/* Soft edge fade allowing glowing volcanic landscape to be fully visible */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#07010C]/40 via-transparent to-[#07010C] pointer-events-none" />

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#1A0524]/90 backdrop-blur-md border-2 border-[#E14E3D] shadow-[0_0_20px_rgba(225,78,61,0.5)] mb-4">
            <span className="w-2 h-2 bg-[#E14E3D] animate-ping inline-block" />
            <span className="font-pixel-arcade text-[10px] sm:text-xs text-[#E14E3D] uppercase tracking-wider font-bold">
              FLAGSHIP 24H HACKATHON · HBTU KANPUR
            </span>
          </div>

          <h1 className="font-pixel-title text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-white tracking-wider uppercase drop-shadow-[0_8px_0_#000]">
            HACKNOVA <span className="text-[#E14E3D]">2.0</span>
          </h1>

          <p className="font-pixel-heading text-lg sm:text-2xl text-[#FFD34D] mt-3 font-bold drop-shadow-[0_2px_4px_#000]">
            24-HOUR PAN-INDIA DEEP OBSIDIAN PROVING GROUND
          </p>

          <p className="text-xs sm:text-sm text-[#E0E0EE] font-sans max-w-2xl mx-auto mt-2 leading-relaxed drop-shadow-[0_2px_4px_#000]">
            Organized by N8N Data Science Community × AWS SBG HBTU × Department of Mathematics, HBTU Kanpur. Descend into the arena to construct cutting-edge software solutions.
          </p>

          {/* Key Metrics - Zero Money Figures */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto my-8">
            <div className="p-3 bg-[#11031A]/85 backdrop-blur-md border-2 border-[#3A1448]">
              <div className="font-pixel-title text-base sm:text-lg text-[#55FF55] font-bold">24 HOURS</div>
              <div className="font-pixel-arcade text-[9px] text-[#D0D0E0] mt-0.5">NON-STOP SPRINT</div>
            </div>
            <div className="p-3 bg-[#11031A]/85 backdrop-blur-md border-2 border-[#3A1448]">
              <div className="font-pixel-title text-base sm:text-lg text-[#4FD9FF] font-bold">2–4 BUILDERS</div>
              <div className="font-pixel-arcade text-[9px] text-[#D0D0E0] mt-0.5">SQUAD SIZE</div>
            </div>
            <div className="p-3 bg-[#11031A]/85 backdrop-blur-md border-2 border-[#3A1448]">
              <div className="font-pixel-title text-base sm:text-lg text-[#FFD34D] font-bold">MEALS & SWAGS</div>
              <div className="font-pixel-arcade text-[9px] text-[#D0D0E0] mt-0.5">FOOD & REFRESHMENTS</div>
            </div>
            <div className="p-3 bg-[#11031A]/85 backdrop-blur-md border-2 border-[#3A1448]">
              <div className="font-pixel-title text-base sm:text-lg text-[#E14E3D] font-bold">GRAND LOOT</div>
              <div className="font-pixel-arcade text-[9px] text-[#D0D0E0] mt-0.5">TROPHIES & PERKS</div>
            </div>
          </div>

          {/* Primary Action Button - Opens External HackNova Portal */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://hacknova2-n8n-dsc.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                soundFx.playClick();
                spawnBlockBreakParticles(e.clientX, e.clientY, 12);
              }}
              className="btn-voxel btn-voxel-redstone text-sm px-7 py-3.5 flex items-center gap-2 shadow-[0_0_25px_rgba(225,78,61,0.5)]"
            >
              <span>⚔️</span>
              <span>REGISTER ON HACKNOVA OFFICIAL PORTAL</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* 3D LOOT CHEST PRIZE REVEALS */}
      <section className="py-16 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <span className="font-pixel-arcade text-xs text-[#FFD34D] uppercase font-bold">
            UNCOVER THE BOUNTY
          </span>
          <h2 className="font-pixel-title text-2xl sm:text-4xl text-white font-bold mt-1 drop-shadow-[0_2px_4px_#000]">
            LOOT CHEST REVEALS
          </h2>
          <p className="text-xs sm:text-sm text-[#D8D8EE] font-sans max-w-xl mx-auto mt-2">
            Click on any chest below to inspect its prize tier, handcrafted obsidian trophies, cloud credits, and perks!
          </p>
        </div>

        {/* Chests Selector Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {HACKNOVA_DATA.lootChests.map((chest) => {
            const isOpened = openedChest === chest.id;

            return (
              <div
                key={chest.id}
                onClick={(e) => handleChestClick(chest, e)}
                className={`p-6 border-4 transition-all cursor-pointer relative select-none flex flex-col items-center text-center ${
                  isOpened
                    ? "bg-[#1C0F28] scale-105 shadow-[0_0_30px_rgba(255,211,77,0.3)]"
                    : "bg-[#11081A] hover:scale-102"
                }`}
                style={{
                  borderColor: isOpened ? chest.colorHex : "#3A1448",
                }}
              >
                <div
                  className="w-16 h-16 border-2 flex items-center justify-center text-3xl mb-3"
                  style={{
                    backgroundColor: `${chest.colorHex}20`,
                    borderColor: chest.colorHex,
                  }}
                >
                  {chest.tier === "diamond" ? "💎" : chest.tier === "gold" ? "🟡" : chest.tier === "iron" ? "⚪" : "✨"}
                </div>

                <span
                  className="font-pixel-arcade text-[10px] px-2 py-0.5 border mb-1 font-bold"
                  style={{
                    color: chest.colorHex,
                    borderColor: `${chest.colorHex}60`,
                    backgroundColor: `${chest.colorHex}15`,
                  }}
                >
                  {chest.rankBadge}
                </span>

                <h3 className="font-pixel-title text-base text-white font-bold mt-1">
                  {chest.title.split("—")[0]}
                </h3>

                <div
                  className="font-pixel-arcade text-xs mt-2 font-bold"
                  style={{ color: chest.colorHex }}
                >
                  {chest.awardLabel}
                </div>

                <span className="font-pixel-arcade text-[9px] text-[#A0A0C0] mt-3 font-bold">
                  {isOpened ? "▼ CHEST UNLOCKED" : "CLICK TO UNLOCK"}
                </span>
              </div>
            );
          })}
        </div>

        {/* Active Chest Details View */}
        {openedChest && (() => {
          const activeChest = HACKNOVA_DATA.lootChests.find((c) => c.id === openedChest);
          if (!activeChest) return null;

          return (
            <div
              className="bg-[#14081E] border-4 p-6 sm:p-8 relative shadow-[0_8px_0_#000]"
              style={{ borderColor: activeChest.colorHex }}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b-2 border-[#2E123D] pb-4 mb-6">
                <div>
                  <span className="font-pixel-arcade text-xs text-[#D8D8EE] font-bold">CHEST CONTENTS:</span>
                  <h3 className="font-pixel-title text-xl sm:text-2xl text-white font-bold mt-1">
                    {activeChest.title}
                  </h3>
                </div>

                <span
                  className="font-pixel-arcade text-xs px-3 py-1 border font-bold"
                  style={{
                    color: activeChest.colorHex,
                    borderColor: activeChest.colorHex,
                  }}
                >
                  {activeChest.awardLabel}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {activeChest.perks.map((perk, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-[#0B0212] border border-[#2B1038] flex items-center gap-3 text-xs sm:text-sm font-sans text-[#E0E0EE]"
                  >
                    <span className="text-base" style={{ color: activeChest.colorHex }}>
                      ✓
                    </span>
                    <span>{perk}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })()}
      </section>

      {/* TRACKS & PROBLEM STATEMENT PROTOCOL */}
      <section className="py-16 px-4 sm:px-6 max-w-7xl mx-auto bg-[#100618] border-y-4 border-[#3A1448]">
        <div className="text-center mb-10">
          <span className="font-pixel-arcade text-xs text-[#4FD9FF] uppercase font-bold">
            PROBLEM DOMAINS
          </span>
          <h2 className="font-pixel-title text-2xl sm:text-3xl text-white font-bold mt-1 drop-shadow-[0_2px_4px_#000]">
            HACKATHON TRACKS
          </h2>
          <div className="p-3 mt-3 inline-block bg-[#1B0524] border border-[#E14E3D] text-xs font-sans text-[#FFD34D] font-medium">
            ⚠️ NOTE: Problem statements will be officially unveiled live at T-0 Hours (Event Kickoff).
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {HACKNOVA_DATA.tracks.map((track) => (
            <div
              key={track.id}
              className="p-6 bg-[#14081E] border-2 border-[#3A1448] hover:border-[#4FD9FF] transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-[#0B0212] border border-[#3A1448] flex items-center justify-center">
                    {getTrackIcon(track.icon)}
                  </div>
                  <span className="font-pixel-arcade text-[10px] text-[#4FD9FF] bg-[#4FD9FF]/10 px-2 py-0.5 border border-[#4FD9FF]/30 font-bold">
                    {track.tag}
                  </span>
                </div>

                <h3 className="font-pixel-heading text-lg font-bold text-white mb-2">
                  {track.title}
                </h3>
                <p className="text-xs text-[#D8D8EE] font-sans leading-relaxed mb-4">
                  {track.shortDesc}
                </p>
              </div>

              <div className="pt-3 border-t border-[#2A1038] text-[11px] font-sans text-[#FFD34D] italic">
                {track.problemStatementStatus}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 24-HOUR HACKATHON QUESTLINE TIMELINE */}
      <section className="py-20 px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#140822] border-2 border-[#E14E3D] shadow-[0_0_20px_rgba(225,78,61,0.4)] mb-3">
            <Clock className="w-4 h-4 text-[#E14E3D] animate-pulse" />
            <span className="font-pixel-arcade text-xs text-[#E14E3D] uppercase tracking-widest font-bold">
              24-HOUR BATTLE RUNTIME
            </span>
          </div>
          <h2 className="font-pixel-title text-2xl sm:text-4xl text-white font-bold mt-1 uppercase drop-shadow-[0_4px_0_#000]">
            HACKATHON QUESTLINE TIMELINE
          </h2>
          <p className="text-sm sm:text-base text-[#F0F2FF] font-sans max-w-2xl mx-auto mt-2 leading-relaxed">
            From physical spawn check-ins and T-0 problem unveilings to midnight snack raids and the final jury pitch arena.
          </p>
        </div>

        {/* Timeline Grid / Path */}
        <div className="relative pl-0 sm:pl-10">
          {/* Glowing Vertical Redstone Track */}
          <div className="hidden sm:block absolute left-3 top-6 bottom-8 w-1 bg-gradient-to-b from-[#E14E3D] via-[#FFD34D] to-[#55FF55] shadow-[0_0_15px_rgba(225,78,61,0.8)]" />

          <div className="space-y-5">
            {HACKNOVA_DATA.timeline.map((stage, idx) => (
              <div key={stage.level} className="relative group">
                {/* Checkpoint Node */}
                <div className="hidden sm:flex absolute -left-10 top-5 w-8 h-8 bg-[#120524] border-2 border-[#E14E3D] text-[#FFD34D] items-center justify-center font-pixel-arcade text-xs font-bold shadow-[0_0_15px_rgba(225,78,61,0.8)] z-20 group-hover:scale-110 transition-transform">
                  {stage.level}
                </div>

                {/* Stage Card */}
                <div className="p-6 sm:p-7 bg-[#120524]/98 backdrop-blur-2xl border-2 border-[#4A2470] hover:border-[#E14E3D] transition-all shadow-[0_8px_30px_rgba(0,0,0,0.9)] group-hover:translate-x-1 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 relative overflow-hidden">
                  {/* Left Accent Glow Strip */}
                  <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#E14E3D] shadow-[0_0_10px_#E14E3D]" />

                  <div className="flex items-center gap-3 sm:gap-4 w-full md:w-56 flex-shrink-0">
                    <div className="w-10 h-10 bg-[#250A10] border-2 border-[#E14E3D] flex items-center justify-center font-pixel-title text-sm text-[#FFD34D] font-bold shadow-[0_0_10px_rgba(225,78,61,0.5)] flex-shrink-0">
                      L{stage.level}
                    </div>
                    <div className="min-w-0">
                      <div className="font-mono text-sm sm:text-base font-extrabold text-white flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#E14E3D] flex-shrink-0" />
                        <span className="truncate">{stage.time}</span>
                      </div>
                      <span className="font-pixel-arcade text-[10px] text-[#FFD34D] bg-[#FFD34D]/15 px-2 py-0.5 border border-[#FFD34D]/40 uppercase mt-1 inline-block font-bold">
                        {stage.dayLabel}
                      </span>
                    </div>
                  </div>

                  <div className="flex-1 space-y-1.5">
                    <h3 className="font-pixel-heading text-lg sm:text-xl font-bold text-white tracking-wide group-hover:text-[#4FD9FF] transition-colors">
                      {stage.title}
                    </h3>
                    <p className="text-sm text-[#F0F2FF] font-sans leading-relaxed font-normal">
                      {stage.desc}
                    </p>
                  </div>

                  <div className="flex-shrink-0 self-end md:self-center">
                    <span className="text-xs font-pixel-arcade text-[#55FF55] bg-[#55FF55]/15 px-3 py-1.5 border border-[#55FF55] shadow-sm font-bold">
                      STAGE 0{stage.level}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EXTERNAL REGISTRATION ROUTING BANNER */}
      <section className="py-20 px-4 sm:px-6 max-w-4xl mx-auto">
        <div className="bg-[#14081E]/95 backdrop-blur-xl border-4 border-[#E14E3D] shadow-[0_10px_0_#000,0_0_50px_rgba(225,78,61,0.3)] p-6 sm:p-10 text-center">
          <span className="font-pixel-arcade text-xs text-[#55FF55] uppercase font-bold">
            OFFICIAL HACKATHON APPLICATION
          </span>
          <h2 className="font-pixel-title text-2xl sm:text-4xl text-white font-bold mt-2 mb-3 drop-shadow-[0_2px_4px_#000]">
            REGISTER ON HACKNOVA PORTAL
          </h2>
          <p className="text-xs sm:text-sm text-[#D8D8EE] font-sans max-w-xl mx-auto mb-8 leading-relaxed">
            HackNova 2.0 squad submissions and team management are handled on its dedicated official portal. Click below to access registration.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://hacknova2-n8n-dsc.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundFx.playClick()}
              className="btn-voxel btn-voxel-redstone text-xs sm:text-sm py-4 px-8 w-full sm:w-auto flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(225,78,61,0.5)]"
            >
              <span>⚔️</span>
              <span>PROCEED TO HACKNOVA OFFICIAL PORTAL</span>
              <ExternalLink className="w-4 h-4" />
            </a>

            <Link
              href="/register"
              onClick={() => soundFx.playClick()}
              className="btn-voxel btn-voxel-diamond text-xs sm:text-sm py-4 px-8 w-full sm:w-auto flex items-center justify-center gap-2"
            >
              <span>🎟️</span>
              <span>GET FESTIVAL ATTENDEE PASS</span>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ ACCORDION */}
      <section className="py-16 px-4 sm:px-6 max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <span className="font-pixel-arcade text-xs text-[#55FF55] uppercase font-bold">
            HACKATHON PROTOCOLS
          </span>
          <h2 className="font-pixel-title text-2xl sm:text-3xl text-white font-bold mt-1 drop-shadow-[0_2px_4px_#000]">
            HACKNOVA 2.0 FAQ
          </h2>
        </div>

        <div className="space-y-3">
          {HACKNOVA_DATA.faqs.map((faq, index) => {
            const isExpanded = expandedFaq === index;

            return (
              <div
                key={index}
                className="bg-[#14081E] border-2 border-[#3A1448] overflow-hidden"
              >
                <button
                  onClick={() => {
                    setExpandedFaq(isExpanded ? null : index);
                    soundFx.playClick();
                  }}
                  className="w-full p-4 text-left flex items-center justify-between gap-4 font-pixel-heading text-sm sm:text-base font-bold text-white hover:text-[#4FD9FF] transition-colors"
                >
                  <span>{faq.q}</span>
                  {isExpanded ? <ChevronUp className="w-5 h-5 flex-shrink-0" /> : <ChevronDown className="w-5 h-5 flex-shrink-0" />}
                </button>

                {isExpanded && (
                  <div className="px-4 pb-4 font-sans text-xs sm:text-sm text-[#D8D8EE] border-t border-[#2A1038] pt-3 leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Global Footer */}
      <VoxelFooter />
    </main>
  );
}
