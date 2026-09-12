"use client";

import React, { useState, useEffect } from "react";
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
  Home,
  Compass,
  Calendar,
  Mic,
  Handshake,
  Users,
  Ticket,
  ChevronRight,
} from "lucide-react";

export function VoxelNavbar() {
  const pathname = usePathname();
  const { isMuted, toggleSound, totalXp, currentLevel } = useAchievement();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Track scroll to shrink navbar and increase backdrop-blur
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [mobileOpen]);

  const navLinks = [
    { href: "/", label: "HOME", icon: Home },
    { href: "/events", label: "QUESTS", icon: Compass },
    { href: "/hacknova", label: "HACKNOVA", icon: Trophy },
    { href: "/schedule", label: "TIMELINE", icon: Calendar },
    { href: "/speakers", label: "SPEAKERS", icon: Mic },
    { href: "/sponsors", label: "SPONSORS", icon: Handshake },
    { href: "/team", label: "CREW", icon: Users },
  ];

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    soundFx.playClick();
    if (e.clientX && e.clientY) {
      spawnBlockBreakParticles(e.clientX, e.clientY, 8);
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 w-full px-2 sm:px-6 pointer-events-none transition-all duration-200 ${
          isScrolled ? "pt-1 sm:pt-2" : "pt-2 sm:pt-3"
        }`}
      >
        {/* Unified Glassmorphism Voxel HUD Navigation Bar */}
        <div
          className={`max-w-7xl mx-auto pointer-events-auto border-2 border-[#2E2840] shadow-[0_8px_24px_rgba(0,0,0,0.85)] px-3 sm:px-5 flex items-center justify-between transition-all duration-200 ${
            isScrolled
              ? "h-13 sm:h-14 bg-[#07010C]/95 backdrop-blur-2xl border-[#3A3250]"
              : "h-14 sm:h-16 bg-[#090214]/90 backdrop-blur-xl border-[#2E2840]"
          }`}
        >
          {/* ZONE 1 (LEFT): BRAND LOGO + FEST TITLE + TAGLINE */}
          <Link
            href="/"
            onClick={handleClick}
            className="flex-shrink-0 flex items-center active:translate-y-0.5 transition-transform"
          >
            <SingularityLogo size={isScrolled ? "sm" : "md"} />
          </Link>

          {/* ZONE 2 (CENTER): TIGHTLY & EVENLY SPACED NAVIGATION LINKS */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={handleClick}
                  className={`font-pixel-arcade text-[10px] tracking-wider px-2.5 py-1.5 border-2 transition-all duration-100 select-none active:translate-y-0.5 rounded-none flex items-center gap-1 ${
                    isActive
                      ? "bg-[#4FD9FF]/15 border-[#4FD9FF] text-[#4FD9FF] shadow-[0_0_10px_rgba(79,217,255,0.35)]"
                      : "bg-[#12101B]/70 border-[#252233] text-[#A0A0B0] hover:text-white hover:border-[#3E3852] hover:bg-[#1C182A]"
                  }`}
                >
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* ZONE 3 (RIGHT - DESKTOP): COHESIVE BOXED HUD CLUSTER (LVL BADGE + SOUND TOGGLE) */}
          <div className="hidden lg:flex items-center gap-1.5 bg-[#0E0B1A]/90 border-2 border-[#262136] p-1 shadow-[inset_0_1px_3px_rgba(0,0,0,0.6)] rounded-none">
            {/* 1. Neutral Stone LVL Badge */}
            <div
              className="px-2.5 py-1 bg-[#151222] border border-[#302B42] text-[9px] font-pixel-arcade text-[#D8D8E8] flex items-center gap-1.5 select-none"
              title={`Total Experience: ${totalXp} XP`}
            >
              <span className="w-1.5 h-1.5 bg-[#4FD9FF] inline-block" />
              <span>LVL {currentLevel}</span>
            </div>

            {/* 2. Pixel Bevel Audio Toggle Button */}
            <button
              onClick={() => {
                toggleSound();
                soundFx.playClick();
              }}
              title={isMuted ? "Unmute 8-Bit Audio FX" : "Mute 8-Bit Audio FX"}
              className={`w-7 h-7 flex items-center justify-center border transition-all duration-100 active:translate-y-0.5 rounded-none ${
                isMuted
                  ? "bg-[#14101E] border-[#2A2438] text-[#706B82] hover:text-[#A09BB2]"
                  : "bg-[#181426] border-[#38314C] text-[#D8D8E8] hover:border-[#4FD9FF] hover:text-[#4FD9FF]"
              }`}
              aria-label="Toggle Audio"
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* ZONE 3 (RIGHT - MOBILE / TABLET): COMPACT SOUND + HAMBURGER CONTROLS */}
          <div className="flex items-center gap-2 lg:hidden">
            {/* Mobile Sound Toggle */}
            <button
              onClick={() => {
                toggleSound();
                soundFx.playClick();
              }}
              className={`w-8 h-8 flex items-center justify-center border transition-all rounded-none ${
                isMuted
                  ? "bg-[#140E20] border-[#2E2840] text-[#706B82]"
                  : "bg-[#160E26] border-[#382F4E] text-[#4FD9FF]"
              }`}
              aria-label="Toggle Audio"
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            </button>

            {/* Mobile Pixel Hamburger Toggle */}
            <button
              onClick={() => {
                setMobileOpen(!mobileOpen);
                soundFx.playClick();
              }}
              className="w-9 h-9 bg-[#140E24] border-2 border-[#322A48] hover:border-[#4FD9FF] text-[#E0E0F0] flex items-center justify-center active:translate-y-0.5 transition-all rounded-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileOpen ? <X className="w-4 h-4 text-[#4FD9FF]" /> : <Menu className="w-4 h-4 text-[#E0E0F0]" />}
            </button>
          </div>
        </div>
      </header>

      {/* FULL-SCREEN IMMERSIVE MOBILE NAVIGATION DRAWER */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[999] bg-[#07010C]/98 backdrop-blur-2xl flex flex-col justify-between p-4 sm:p-6 overflow-y-auto animate-in fade-in zoom-in-95 duration-150">
          {/* Top Bar inside Drawer */}
          <div className="flex items-center justify-between border-b-2 border-[#251F36] pb-3.5">
            <Link
              href="/"
              onClick={() => setMobileOpen(false)}
              className="flex items-center"
            >
              <SingularityLogo size="sm" />
            </Link>

            <button
              onClick={() => {
                setMobileOpen(false);
                soundFx.playClick();
              }}
              className="w-9 h-9 bg-[#160F26] border-2 border-[#382F4E] hover:border-[#4FD9FF] text-[#D8D8E8] hover:text-[#4FD9FF] flex items-center justify-center active:scale-95 transition-all rounded-none"
              aria-label="Close Menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links Grid with Unified Pixel Borders */}
          <div className="my-auto py-5 space-y-2 max-w-md mx-auto w-full">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              const Icon = link.icon;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    handleClick(e);
                    setMobileOpen(false);
                  }}
                  className={`w-full min-h-[46px] px-3.5 py-2.5 font-pixel-arcade text-xs flex items-center justify-between border-2 transition-all rounded-none active:translate-y-0.5 ${
                    isActive
                      ? "bg-[#4FD9FF]/15 text-[#4FD9FF] border-[#4FD9FF] shadow-[0_0_12px_rgba(79,217,255,0.3)]"
                      : "bg-[#100B1C] border-[#251F36] text-[#C4C4D4] hover:border-[#3D3455] hover:bg-[#181228] hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 text-[#4FD9FF]" />
                    <span>{link.label}</span>
                  </div>

                  <ChevronRight className={`w-3.5 h-3.5 ${isActive ? "text-[#4FD9FF]" : "text-[#554E6B]"}`} />
                </Link>
              );
            })}

            {/* Standalone Cyan Bevel CTA for Registration & Pass */}
            <Link
              href="/register"
              onClick={(e) => {
                handleClick(e);
                setMobileOpen(false);
              }}
              className="w-full min-h-[48px] py-3 mt-3 font-pixel-arcade text-xs font-bold uppercase tracking-wider text-[#04121A] bg-[#00A6D6] border-t-2 border-l-2 border-[#7BE4FF] border-r-2 border-b-3 border-[#005570] shadow-[0_2px_0_#00384D,0_0_16px_rgba(79,217,255,0.35)] flex items-center justify-center gap-2 active:translate-y-0.5 rounded-none"
            >
              <Ticket className="w-4 h-4 text-[#04121A]" />
              <span>FORGE FESTIVAL PASS (FREE)</span>
            </Link>
          </div>

          {/* Drawer Bottom Status & Sound Controls */}
          <div className="pt-3.5 border-t-2 border-[#251F36] flex items-center justify-between max-w-md mx-auto w-full">
            <div className="text-[9px] font-pixel-arcade text-[#A0A0B2] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-[#4FD9FF] inline-block" />
              <span>PLAYER LVL {currentLevel} ({totalXp} XP)</span>
            </div>

            <button
              onClick={() => {
                toggleSound();
                soundFx.playClick();
              }}
              className="px-2.5 py-1 bg-[#120B20] border border-[#2B233E] hover:border-[#4FD9FF] text-[10px] font-pixel-arcade text-[#C4C4D4] flex items-center gap-1.5 active:translate-y-0.5 rounded-none"
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5 text-[#888]" /> : <Volume2 className="w-3.5 h-3.5 text-[#4FD9FF]" />}
              <span>{isMuted ? "MUTED" : "AUDIO"}</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
