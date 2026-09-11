"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAchievement } from "./AchievementSystem";
import { SingularityLogo } from "./SingularityLogo";
import { soundFx } from "@/lib/soundFx";
import { spawnBlockBreakParticles } from "@/lib/particles";
import {
  Volume2,
  VolumeX,
  Menu,
  X,
  Trophy,
  Sparkles,
  Zap,
} from "lucide-react";

export function VoxelNavbar() {
  const pathname = usePathname();
  const { isMuted, toggleSound, totalXp, currentLevel } = useAchievement();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "HOME" },
    { href: "/events", label: "QUESTS" },
    { href: "/hacknova", label: "HACKNOVA", isSpecial: true },
    { href: "/speakers", label: "SPEAKERS" },
    { href: "/sponsors", label: "SPONSORS" },
    { href: "/schedule", label: "TIMELINE" },
    { href: "/team", label: "CREW" },
  ];

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    soundFx.playClick();
    spawnBlockBreakParticles(e.clientX, e.clientY, 10);
  };

  return (
    <header className="sticky top-0 z-50 w-full px-3 sm:px-6 pt-2 sm:pt-3">
      {/* Floating Glassmorphism Voxel Command HUD */}
      <div className="max-w-7xl mx-auto bg-[#090214]/90 backdrop-blur-xl border-2 border-[#3A1E54] shadow-[0_8px_32px_rgba(0,0,0,0.85),0_0_20px_rgba(79,217,255,0.15)] px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Left: Custom 3D Voxel Brand Logo */}
        <Link href="/" onClick={handleClick} className="flex-shrink-0">
          <SingularityLogo size="sm" />
        </Link>

        {/* Center: Spacious & Clean Navigation Matrix */}
        <nav className="hidden lg:flex items-center gap-1.5 xl:gap-3">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={handleClick}
                className={`relative px-3 py-1.5 font-pixel-arcade text-[11px] tracking-wider transition-all duration-200 select-none ${
                  isActive
                    ? "text-[#4FD9FF] bg-[#4FD9FF]/10 border-b-2 border-[#4FD9FF] shadow-[0_0_12px_rgba(79,217,255,0.3)]"
                    : link.isSpecial
                    ? "text-[#FFD34D] hover:text-white hover:bg-[#FFD34D]/10"
                    : "text-[#D0D0E0] hover:text-white hover:bg-white/5"
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#4FD9FF] shadow-[0_0_6px_#4FD9FF]" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right: Integrated Action HUD */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Level / XP Pill */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#05010B] border border-[#2A1640] text-[10px] font-pixel-arcade text-[#55FF55]">
            <span className="w-1.5 h-1.5 bg-[#55FF55] animate-pulse inline-block" />
            <span>LVL {currentLevel}</span>
          </div>

          {/* 8-Bit Audio Synthesizer Toggle */}
          <button
            onClick={toggleSound}
            title={isMuted ? "Unmute 8-Bit Audio FX" : "Mute 8-Bit Audio FX"}
            className={`w-8 h-8 flex items-center justify-center border transition-all duration-200 ${
              isMuted
                ? "bg-[#180A1A] border-[#E14E3D]/50 text-[#E14E3D]"
                : "bg-[#0F1B12] border-[#55FF55]/60 text-[#55FF55] shadow-[0_0_10px_rgba(85,255,85,0.25)]"
            }`}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {/* Primary Beacon CTA: HackNova 2.0 */}
          <Link
            href="/hacknova"
            onClick={handleClick}
            className="btn-voxel btn-voxel-diamond text-[10px] sm:text-xs py-2 px-3.5 flex items-center gap-2"
          >
            <Trophy className="w-3.5 h-3.5" />
            <span>HACKNOVA 2.0</span>
          </Link>
        </div>

        {/* Mobile Action Hub Trigger */}
        <div className="flex items-center gap-2 lg:hidden">
          <Link
            href="/hacknova"
            onClick={handleClick}
            className="btn-voxel btn-voxel-diamond text-[9px] py-1.5 px-2.5"
          >
            HACKNOVA
          </Link>

          <button
            onClick={() => {
              setMobileOpen(!mobileOpen);
              soundFx.playClick();
            }}
            className="w-9 h-9 bg-[#140624] border border-[#3A1E54] text-white flex items-center justify-center"
            aria-label="Toggle Navigation Menu"
          >
            {mobileOpen ? <X className="w-4 h-4 text-[#E14E3D]" /> : <Menu className="w-4 h-4 text-[#4FD9FF]" />}
          </button>
        </div>
      </div>

      {/* Mobile Glassmorphism Command Drawer */}
      {mobileOpen && (
        <div className="lg:hidden mt-2 max-w-7xl mx-auto bg-[#090214]/95 backdrop-blur-2xl border-2 border-[#3A1E54] p-4 space-y-2 shadow-[0_12px_36px_rgba(0,0,0,0.9)] animate-in fade-in slide-in-from-top-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  handleClick(e);
                  setMobileOpen(false);
                }}
                className={`w-full p-2.5 font-pixel-arcade text-xs flex items-center justify-between border-l-2 transition-all ${
                  isActive
                    ? "bg-[#4FD9FF]/15 text-[#4FD9FF] border-[#4FD9FF]"
                    : "border-transparent text-white hover:bg-white/5"
                }`}
              >
                <span>{link.label}</span>
                {link.isSpecial && <span className="text-[#FFD34D] text-[10px]">★ FLAGSHIP</span>}
              </Link>
            );
          })}

          <div className="pt-3 border-t border-[#2A1640] flex items-center justify-between">
            <div className="text-[10px] font-pixel-arcade text-[#55FF55]">
              PLAYER STATUS: LVL {currentLevel} ({totalXp} XP)
            </div>
            <button
              onClick={toggleSound}
              className="text-xs font-pixel-arcade text-[#A0A0B0] flex items-center gap-1.5"
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-[#E14E3D]" /> : <Volume2 className="w-4 h-4 text-[#55FF55]" />}
              <span>{isMuted ? "MUTED" : "AUDIO ON"}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
