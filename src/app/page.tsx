"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { soundFx } from "@/lib/soundFx";
import { spawnBlockBreakParticles } from "@/lib/particles";
import { useAchievement } from "@/components/ui/AchievementSystem";
import { VillagerTradingDialog } from "@/components/ui/VillagerTradingDialog";
import { VoxelFooter } from "@/components/ui/VoxelFooter";
import { SingularityLogo } from "@/components/ui/SingularityLogo";
import { HeroSunRays } from "@/components/animations/HeroSunRays";
import { LavaFlowCanvas } from "@/components/animations/LavaFlowCanvas";
import { NetherCelestialMoon } from "@/components/animations/NetherCelestialMoon";
import {
  Sparkles,
  Trophy,
  Calendar,
  Users,
  Award,
  Zap,
  Cloud,
  Bot,
  Brain,
  Flame,
  ChevronDown,
} from "lucide-react";

export default function HomePage() {
  const [timeLeft, setTimeLeft] = useState({ days: 34, hours: 14, minutes: 22, seconds: 45 });

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { ...prev, days: Math.max(0, prev.days - 1), hours: 23, minutes: 59, seconds: 59 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    soundFx.playClick();
    spawnBlockBreakParticles(e.clientX, e.clientY, 12);
  };

  return (
    <main className="min-h-screen bg-[#07010C] text-[#F5F5F0] overflow-x-hidden">
      {/* 1. HERO REALM — Bespoke 4K Voxel Alpine Sunrise with Animated Volumetric Sun Rays */}
      <section className="relative min-h-[94vh] flex flex-col justify-between pt-12 pb-20 px-4 sm:px-6 overflow-hidden">
        {/* 4K High-Resolution Sunrise Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-100 brightness-110 contrast-105 saturate-110 transition-transform duration-1000"
          style={{
            backgroundImage: "url('/images/bg_overworld_sunrise_4k.jpg')",
          }}
        />

        {/* Dynamic Animated Volumetric Sun Rays & Pollen Dust Particles */}
        <HeroSunRays />

        {/* Soft atmospheric bottom seam allowing seamless natural transition to Lava Realm */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#07010C] z-[3] pointer-events-none" />

        <div className="max-w-6xl mx-auto text-center relative z-10 my-auto pt-6">
          {/* Custom Brand Logo Emblem & Coalition Header */}
          <div className="flex flex-col items-center justify-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#090214]/90 backdrop-blur-md border-2 border-[#55FF55] shadow-[0_4px_24px_rgba(0,0,0,0.85)] mb-4 animate-bounce">
              <span className="w-2.5 h-2.5 bg-[#55FF55] border border-black inline-block" />
              <span className="font-pixel-arcade text-[10px] sm:text-xs text-[#55FF55] uppercase tracking-wider">
                N8N DSC · AWS SBG HBTU · DEPT OF MATHEMATICS, HBTU
              </span>
            </div>

            <SingularityLogo size="lg" showText={false} className="mb-2 hover:scale-110 transition-transform" />
          </div>

          {/* Giant Pixel Title Lockup with Contrast Drop Shadows */}
          <h1 className="font-pixel-title text-3xl min-[400px]:text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-white tracking-normal sm:tracking-wider uppercase drop-shadow-[0_8px_0_#000] [text-shadow:0_4px_28px_rgba(0,0,0,0.95)]">
            SINGULARITY
          </h1>
          <div className="font-pixel-title text-xl min-[400px]:text-2xl sm:text-4xl md:text-5xl text-[#FFD34D] tracking-wider sm:tracking-widest mt-1 drop-shadow-[0_6px_0_#000] [text-shadow:0_4px_24px_rgba(0,0,0,0.9)]">
            2K26
          </div>

          {/* Hero Tagline Card */}
          <div className="mt-4 p-4 bg-[#090214]/85 backdrop-blur-md border-2 border-[#3A1E54] max-w-3xl mx-auto shadow-[0_8px_32px_rgba(0,0,0,0.9)]">
            <p className="font-pixel-heading text-base sm:text-2xl text-[#4FD9FF]">
              WHERE CODE MEETS CRAFT · THREE DAYS. INFINITE BLOCKS OF POSSIBILITY.
            </p>
            <p className="mt-1.5 text-xs sm:text-sm text-[#F5F5F0] font-sans leading-relaxed">
              Harcourt Butler Technical University, Kanpur. The grand convergence of artificial intelligence, serverless clouds, mathematical computing, and retro arcade culture.
            </p>
          </div>

          {/* Retro 7-Segment Countdown Scoreboard */}
          <div className="my-6 inline-block w-full max-w-sm sm:max-w-md bg-[#090214]/90 backdrop-blur-md border-2 sm:border-4 border-[#3A1E54] shadow-[0_8px_0_#000,0_0_35px_rgba(79,217,255,0.3)] p-3 sm:p-5">
            <div className="font-pixel-sub text-[9px] sm:text-[10px] text-[#A0A0B0] uppercase tracking-widest mb-2 text-center">
              ⏳ COUNTDOWN TO WORLD SPAWN
            </div>
            <div className="grid grid-cols-4 gap-1.5 sm:gap-4">
              {[
                { label: "DAYS", value: String(timeLeft.days).padStart(2, "0") },
                { label: "HOURS", value: String(timeLeft.hours).padStart(2, "0") },
                { label: "MINS", value: String(timeLeft.minutes).padStart(2, "0") },
                { label: "SECS", value: String(timeLeft.seconds).padStart(2, "0") },
              ].map((t) => (
                <div key={t.label} className="bg-[#05010B] border border-[#2A1640] p-1.5 sm:p-3 text-center min-w-0">
                  <div className="font-pixel-title text-base min-[400px]:text-lg sm:text-3xl text-[#55FF55] tracking-tight">
                    {t.value}
                  </div>
                  <div className="font-pixel-arcade text-[7px] min-[400px]:text-[8px] sm:text-[9px] text-[#A0A0B0] mt-1">
                    {t.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Primary Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 max-w-sm sm:max-w-none mx-auto w-full px-2 sm:px-0">
            <Link
              href="/hacknova"
              onClick={handleClick}
              className="btn-voxel btn-voxel-redstone text-xs sm:text-base px-5 py-3 sm:py-3.5 flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(225,78,61,0.5)]"
            >
              <Trophy className="w-4 h-4" />
              <span>ENTER HACKNOVA 2.0</span>
            </Link>

            <Link
              href="/events"
              onClick={handleClick}
              className="btn-voxel btn-voxel-diamond text-xs sm:text-base px-5 py-3 sm:py-3.5 flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>EXPLORE QUESTS</span>
            </Link>

            <Link
              href="/register"
              onClick={handleClick}
              className="btn-voxel btn-voxel-stone text-xs sm:text-base px-5 py-3 sm:py-3.5 flex items-center justify-center"
            >
              🎟️ FORGE PASS
            </Link>
          </div>
        </div>

        {/* Realm Transition Scroll Indicator */}
        <div className="relative z-10 text-center animate-bounce mt-8">
          <span className="font-pixel-arcade text-[10px] text-[#FFD34D] tracking-widest uppercase">
            SCROLL TO DESCEND INTO THE ARENAS
          </span>
          <ChevronDown className="w-5 h-5 mx-auto text-[#FFD34D] mt-1" />
        </div>
      </section>

      {/* 2. THE VOLCANIC LAVA REALM — 4K Magma Gorge with Animated Flowing Lava & Rising Embers */}
      <section className="relative py-28 px-4 sm:px-6 overflow-hidden">
        {/* 4K Magma Gorge Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-100 brightness-115 contrast-105 saturate-115"
          style={{
            backgroundImage: "url('/images/bg_lava_forge_4k.jpg')",
          }}
        />

        {/* Dynamic Animated Flowing Molten Lava & Rising Embers Canvas */}
        <LavaFlowCanvas />

        {/* Seamless Soft Edge Ambient Transitions */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#07010C] via-transparent to-[#07010C] z-[3] pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="bg-[#0B0212]/85 backdrop-blur-md border-4 border-[#E14E3D] shadow-[0_12px_0_#000,0_0_50px_rgba(225,78,61,0.55)] p-6 sm:p-10 relative">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="font-pixel-arcade text-[10px] text-[#E14E3D] bg-[#E14E3D]/20 px-2 py-0.5 border border-[#E14E3D]/40">
                    FLAGSHIP 24H HACKATHON
                  </span>
                  <span className="font-pixel-arcade text-[10px] text-[#FFD34D]">
                    GRAND LOOT CHESTS & AWARDS
                  </span>
                </div>

                <h2 className="font-pixel-title text-3xl sm:text-5xl text-white">
                  HACKNOVA <span className="text-[#E14E3D]">2.0</span> ARENA
                </h2>

                <p className="text-xs sm:text-sm text-[#E0E0EE] font-sans leading-relaxed">
                  24 hours of non-stop building, automated evaluations, and mentor raids. Solve live problem statements across Autonomous AI Agents, Serverless Infrastructure, Decentralized Systems, and Mathematical Computing.
                </p>

                <div className="p-3.5 bg-[#07010C]/90 border border-[#3A1448] text-xs font-sans text-[#FFD34D] flex items-center gap-2">
                  <Flame className="w-4 h-4 text-[#E14E3D] flex-shrink-0 animate-pulse" />
                  <span>Problem statements will be officially unveiled live at T-0 Hours (Event Kickoff).</span>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  {["AI & MULTI-AGENT SWARMS", "SERVERLESS CLOUDS", "WEB3 & CRYPTO", "QUANT MATHEMATICS", "OPEN INNOVATION"].map((track) => (
                    <span key={track} className="text-[9px] font-pixel-arcade text-[#4FD9FF] bg-[#4FD9FF]/10 px-2.5 py-1 border border-[#4FD9FF]/30">
                      {track}
                    </span>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col items-center justify-center text-center p-6 bg-[#07010C]/95 border-2 border-[#3A1448] shadow-[0_6px_24px_rgba(0,0,0,0.85)]">
                <div className="text-5xl mb-2 animate-bounce">💎</div>
                <div className="font-pixel-title text-sm text-[#FFD34D]">DIAMOND LOOT CHEST</div>
                <div className="font-pixel-arcade text-xs text-[#55FF55] mt-2">
                  GRAND TROPHY + CASH BOUNTY
                </div>
                <p className="text-[10px] text-[#A0A0B0] font-sans mt-2">
                  Plus Cloud Credits, Swag Packs & Interview Referrals
                </p>

                <Link
                  href="/hacknova"
                  onClick={handleClick}
                  className="btn-voxel btn-voxel-diamond text-xs mt-5 w-full py-3"
                >
                  ENTER HACKATHON PORTAL →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. THE COSMIC NETHER REALM — 4K Void with Interactive Celestial Moon & Gravitational Waves */}
      <section className="relative py-28 px-4 sm:px-6 overflow-hidden">
        {/* 4K Celestial Moon & Nether Void Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-100 brightness-115 contrast-105 saturate-115"
          style={{
            backgroundImage: "url('/images/bg_nether_celestial_4k.jpg')",
          }}
        />

        {/* Interactive Celestial Moon with Gravitational Waves & Amethyst Dust */}
        <NetherCelestialMoon />

        {/* Seamless Soft Edge Atmospheric Blend */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#07010C] via-transparent to-[#07010C] z-[3] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <span className="font-pixel-arcade text-xs text-[#4FD9FF] uppercase tracking-widest">
              CHOOSE YOUR ADVENTURE
            </span>
            <h2 className="font-pixel-title text-2xl sm:text-4xl text-white mt-1 drop-shadow-[0_4px_12px_#000]">
              THE FOUR PILLARS OF SINGULARITY
            </h2>
            <p className="text-xs sm:text-sm text-[#F0F0F8] font-sans max-w-xl mx-auto mt-2 drop-shadow-[0_2px_6px_#000]">
              Four distinct paths of mastery across workshops, competitive battles, the flagship hackathon, and grand cultural concerts.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Pillar 1 */}
            <Link
              href="/events"
              onClick={handleClick}
              className="inventory-slot-card p-6 flex flex-col justify-between group bg-[#0F041A]/85 backdrop-blur-md shadow-[0_8px_24px_rgba(0,0,0,0.8)] border border-[#4FD9FF]/30 hover:border-[#4FD9FF]"
            >
              <div>
                <div className="item-slot-frame mb-4 border-[#4FD9FF]/40 group-hover:border-[#4FD9FF]">
                  <Cloud className="w-8 h-8 text-[#4FD9FF]" />
                </div>
                <span className="font-pixel-arcade text-[10px] text-[#4FD9FF]">PILLAR 01</span>
                <h3 className="font-pixel-title text-sm sm:text-base text-white mt-1 group-hover:text-[#4FD9FF] transition-colors">
                  WORKSHOPS
                </h3>
                <p className="text-xs text-[#D0D0E0] font-sans mt-2 leading-relaxed">
                  Serverless deployments on AWS and autonomous agent loops with n8n workflow graphs.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#2A2438] flex items-center justify-between font-pixel-arcade text-[10px] text-[#4FD9FF]">
                <span>EXPLORE SESSIONS</span>
                <span>→</span>
              </div>
            </Link>

            {/* Pillar 2 */}
            <Link
              href="/events"
              onClick={handleClick}
              className="inventory-slot-card p-6 flex flex-col justify-between group bg-[#0F041A]/85 backdrop-blur-md shadow-[0_8px_24px_rgba(0,0,0,0.8)] border border-[#FFD34D]/30 hover:border-[#FFD34D]"
            >
              <div>
                <div className="item-slot-frame mb-4 border-[#FFD34D]/40 group-hover:border-[#FFD34D]">
                  <Brain className="w-8 h-8 text-[#FFD34D]" />
                </div>
                <span className="font-pixel-arcade text-[10px] text-[#FFD34D]">PILLAR 02</span>
                <h3 className="font-pixel-title text-sm sm:text-base text-white mt-1 group-hover:text-[#FFD34D] transition-colors">
                  COMPETITIONS
                </h3>
                <p className="text-xs text-[#D0D0E0] font-sans mt-2 leading-relaxed">
                  Mathletics Olympiad, Zero-Day CTF Cyber Siege, and 1v1 Algorithmic Speed Brawls.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#2A2438] flex items-center justify-between font-pixel-arcade text-[10px] text-[#FFD34D]">
                <span>VIEW ARENAS</span>
                <span>→</span>
              </div>
            </Link>

            {/* Pillar 3 */}
            <Link
              href="/hacknova"
              onClick={handleClick}
              className="inventory-slot-card p-6 flex flex-col justify-between group border-[#E14E3D]/80 hover:border-[#E14E3D] bg-[#17031D]/85 backdrop-blur-md shadow-[0_8px_24px_rgba(0,0,0,0.8)]"
            >
              <div>
                <div className="item-slot-frame mb-4 border-[#E14E3D]/40 group-hover:border-[#E14E3D] bg-[#220710]">
                  <Trophy className="w-8 h-8 text-[#E14E3D]" />
                </div>
                <span className="font-pixel-arcade text-[10px] text-[#E14E3D]">FLAGSHIP QUEST</span>
                <h3 className="font-pixel-title text-sm sm:text-base text-white mt-1 group-hover:text-[#E14E3D] transition-colors">
                  HACKNOVA 2.0
                </h3>
                <p className="text-xs text-[#D0D0E0] font-sans mt-2 leading-relaxed">
                  24-Hour Pan-India hackathon with trophies, loot rewards, mentor checkpoints, and swags.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#2A2438] flex items-center justify-between font-pixel-arcade text-[10px] text-[#E14E3D]">
                <span>ENTER ARENA</span>
                <span>→</span>
              </div>
            </Link>

            {/* Pillar 4 */}
            <Link
              href="/events"
              onClick={handleClick}
              className="inventory-slot-card p-6 flex flex-col justify-between group bg-[#0F041A]/85 backdrop-blur-md shadow-[0_8px_24px_rgba(0,0,0,0.8)] border border-[#55FF55]/30 hover:border-[#55FF55]"
            >
              <div>
                <div className="item-slot-frame mb-4 border-[#55FF55]/40 group-hover:border-[#55FF55]">
                  <Sparkles className="w-8 h-8 text-[#55FF55]" />
                </div>
                <span className="font-pixel-arcade text-[10px] text-[#55FF55]">PILLAR 04</span>
                <h3 className="font-pixel-title text-sm sm:text-base text-white mt-1 group-hover:text-[#55FF55] transition-colors">
                  PULSE EDM NIGHT
                </h3>
                <p className="text-xs text-[#D0D0E0] font-sans mt-2 leading-relaxed">
                  Grand closing concert at HBTU Open Air Theatre. Live DJs, laser beams, and glowing wristbands.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#2A2438] flex items-center justify-between font-pixel-arcade text-[10px] text-[#55FF55]">
                <span>CULTURAL FINALE</span>
                <span>→</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 4. RETRO SYNTHWAVE & ARCADE FINALE REALM — 80s Cyber Neon Grid */}
      <section className="relative py-28 px-4 sm:px-6 overflow-hidden">
        {/* Maximum Visibility 4K Retro Synthwave Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-100 brightness-115 contrast-105 saturate-115"
          style={{
            backgroundImage: "url('/images/bg_synthwave_arcade_4k.jpg')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#07010C] via-transparent to-[#07010C] z-[3] pointer-events-none" />

        <div className="max-w-5xl mx-auto relative z-10 text-center space-y-6">
          <span className="font-pixel-arcade text-xs text-[#FF7BE5] bg-[#0E0318]/90 backdrop-blur-md px-3.5 py-1.5 border border-[#FF7BE5]/60 uppercase tracking-widest inline-block shadow-[0_0_15px_rgba(255,123,229,0.4)]">
            RETRO ARCADE × CULTURAL SYNTHESIS
          </span>

          <h2 className="font-pixel-title text-3xl sm:text-5xl text-white uppercase drop-shadow-[0_4px_16px_rgba(255,123,229,0.7)] [text-shadow:0_4px_24px_#000]">
            WE ARE THE INNOVATION
          </h2>

          <div className="p-4 bg-[#0B0218]/85 backdrop-blur-md border border-[#FF7BE5]/40 max-w-2xl mx-auto shadow-[0_8px_24px_rgba(0,0,0,0.8)]">
            <p className="text-xs sm:text-sm text-[#F0F0FF] font-sans leading-relaxed">
              Three unforgettable days of building, coding, gaming, and celebrating together. Experience retro LAN battles, custom arcade cabinets, and the electrifying PULSE EDM Night.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-4 bg-[#0F0220]/90 backdrop-blur-md border-2 border-[#FF7BE5]/60 shadow-[0_4px_16px_rgba(0,0,0,0.8)]">
              <div className="font-pixel-title text-base text-[#FF7BE5]">RETRO LAN BRAWL</div>
              <p className="text-xs text-[#D0D0E0] font-sans mt-1">Street Fighter, Tekken & Bedwars</p>
            </div>
            <div className="p-4 bg-[#0F0220]/90 backdrop-blur-md border-2 border-[#4FD9FF]/60 shadow-[0_4px_16px_rgba(0,0,0,0.8)]">
              <div className="font-pixel-title text-base text-[#4FD9FF]">PULSE EDM FINALE</div>
              <p className="text-xs text-[#D0D0E0] font-sans mt-1">HBTU Open Air Theatre (OAT)</p>
            </div>
            <div className="p-4 bg-[#0F0220]/90 backdrop-blur-md border-2 border-[#FFD34D]/60 shadow-[0_4px_16px_rgba(0,0,0,0.8)]">
              <div className="font-pixel-title text-base text-[#FFD34D]">ARCADE TROPHIES</div>
              <p className="text-xs text-[#D0D0E0] font-sans mt-1">Custom Laser-Cut Voxel Medals</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. INTERACTIVE VILLAGER TRADE FAQ */}
      <section className="relative py-24 px-4 sm:px-6 overflow-hidden">
        {/* 4K Celestial Nether Night Backdrop */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-75 brightness-115"
          style={{
            backgroundImage: "url('/images/bg_nether_celestial_4k.jpg')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#07010C]/60 via-transparent to-[#07010C] pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <span className="font-pixel-arcade text-xs text-[#55FF55] uppercase">
              COMMUNITY INTELLIGENCE
            </span>
            <h2 className="font-pixel-title text-2xl sm:text-3xl text-white mt-1">
              TRADE WITH THE VILLAGER
            </h2>
            <p className="text-xs sm:text-sm text-[#A0A0B0] font-sans mt-2">
              Click questions below to trade knowledge with the village elder and unlock sacred fest secrets!
            </p>
          </div>

          <VillagerTradingDialog />
        </div>
      </section>

      {/* GLOBAL FOOTER */}
      <VoxelFooter />
    </main>
  );
}
