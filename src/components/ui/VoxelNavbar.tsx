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
  Sparkles,
  Zap,
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
    { href: "/events", label: "QUESTS & EVENTS", icon: Compass },
    { href: "/hacknova", label: "HACKNOVA 2.0", isSpecial: true, icon: Trophy },
    { href: "/schedule", label: "TIMELINE", icon: Calendar },
    { href: "/speakers", label: "SPEAKERS", icon: Mic },
    { href: "/sponsors", label: "SPONSORS", icon: Handshake },
    { href: "/team", label: "CREW", icon: Users },
  ];

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    soundFx.playClick();
    if (e.clientX && e.clientY) {
      spawnBlockBreakParticles(e.clientX, e.clientY, 10);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full px-2 sm:px-6 pt-2 sm:pt-3">
        {/* Floating Glassmorphism Voxel Command HUD */}
        <div className="max-w-7xl mx-auto bg-[#090214]/95 backdrop-blur-xl border-2 border-[#3A1E54] shadow-[0_8px_32px_rgba(0,0,0,0.85),0_0_20px_rgba(79,217,255,0.15)] px-3 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
          {/* Left: Custom 3D Voxel Brand Logo */}
          <Link href="/" onClick={handleClick} className="flex-shrink-0 flex items-center">
            <SingularityLogo size="sm" />
          </Link>

          {/* Center: Desktop Navigation Matrix */}
          <nav className="hidden lg:flex items-center gap-1.5 xl:gap-2.5">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={handleClick}
                  className={`relative px-2.5 py-1.5 font-pixel-arcade text-[11px] tracking-wider transition-all duration-150 select-none ${
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

          {/* Right: Desktop Action HUD */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Level / XP Pill */}
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#05010B] border border-[#2A1640] text-[10px] font-pixel-arcade text-[#55FF55]">
              <span className="w-1.5 h-1.5 bg-[#55FF55] animate-pulse inline-block" />
              <span>LVL {currentLevel}</span>
            </div>

            {/* 8-Bit Audio Toggle */}
            <button
              onClick={toggleSound}
              title={isMuted ? "Unmute 8-Bit Audio FX" : "Mute 8-Bit Audio FX"}
              className={`w-8 h-8 flex items-center justify-center border transition-all duration-150 ${
                isMuted
                  ? "bg-[#180A1A] border-[#E14E3D]/50 text-[#E14E3D]"
                  : "bg-[#0F1B12] border-[#55FF55]/60 text-[#55FF55] shadow-[0_0_10px_rgba(85,255,85,0.25)]"
              }`}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            {/* Register / Pass Button */}
            <Link
              href="/register"
              onClick={handleClick}
              className="btn-voxel btn-voxel-gold text-[10px] py-1.5 px-3 flex items-center gap-1.5"
            >
              <Ticket className="w-3.5 h-3.5" />
              <span>GET PASS</span>
            </Link>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex items-center gap-2 lg:hidden">
            {/* Mobile Sound Toggle */}
            <button
              onClick={toggleSound}
              className={`w-8 h-8 flex items-center justify-center border transition-all ${
                isMuted
                  ? "bg-[#180A1A] border-[#E14E3D]/50 text-[#E14E3D]"
                  : "bg-[#0F1B12] border-[#55FF55]/60 text-[#55FF55]"
              }`}
              aria-label="Toggle Sound"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            {/* Mobile Pass Quick Link */}
            <Link
              href="/register"
              onClick={handleClick}
              className="btn-voxel btn-voxel-gold text-[9px] py-1.5 px-2.5 font-bold"
            >
              PASS
            </Link>

            {/* Mobile Hamburger Trigger Button (44px touch area) */}
            <button
              onClick={() => {
                setMobileOpen(!mobileOpen);
                soundFx.playClick();
              }}
              className="w-10 h-10 bg-[#140624] border-2 border-[#3A1E54] text-white flex items-center justify-center active:scale-95 transition-transform"
              aria-label="Toggle Navigation Menu"
            >
              {mobileOpen ? (
                <X className="w-5 h-5 text-[#E14E3D]" />
              ) : (
                <Menu className="w-5 h-5 text-[#4FD9FF]" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* FULL-SCREEN IMMERSIVE MOBILE NAVIGATION DRAWER */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[999] bg-[#07010C]/98 backdrop-blur-2xl flex flex-col justify-between p-4 sm:p-6 overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
          {/* Top Bar inside Drawer */}
          <div className="flex items-center justify-between border-b-2 border-[#2E1546] pb-4">
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
              className="w-10 h-10 bg-[#180824] border-2 border-[#E14E3D] text-[#E14E3D] flex items-center justify-center active:scale-90"
              aria-label="Close Menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation Links Grid */}
          <div className="my-auto py-6 space-y-2.5 max-w-md mx-auto w-full">
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
                  className={`w-full min-h-[50px] px-4 py-3 font-pixel-arcade text-xs sm:text-sm flex items-center justify-between border-2 transition-all ${
                    isActive
                      ? "bg-[#4FD9FF]/20 text-[#4FD9FF] border-[#4FD9FF] shadow-[0_0_15px_rgba(79,217,255,0.4)]"
                      : link.isSpecial
                      ? "bg-[#1F0824] border-[#E14E3D] text-[#FFD34D] hover:bg-[#E14E3D]/20"
                      : "bg-[#0E031A] border-[#2A1438] text-white hover:border-[#4FD9FF] hover:bg-[#140624]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5 text-[#4FD9FF]" />
                    <span className="font-bold">{link.label}</span>
                  </div>

                  {link.isSpecial ? (
                    <span className="font-pixel-arcade text-[9px] text-[#E14E3D] bg-[#E14E3D]/15 px-2 py-0.5 border border-[#E14E3D]">
                      FLAGSHIP
                    </span>
                  ) : (
                    <ChevronRight className="w-4 h-4 text-[#707085]" />
                  )}
                </Link>
              );
            })}

            {/* Standalone Gold CTA for Registration & Pass */}
            <Link
              href="/register"
              onClick={(e) => {
                handleClick(e);
                setMobileOpen(false);
              }}
              className="btn-voxel btn-voxel-gold w-full min-h-[52px] py-3.5 mt-4 text-xs font-bold flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,211,77,0.4)]"
            >
              <Ticket className="w-4 h-4" />
              <span>FORGE FESTIVAL PASS (FREE)</span>
            </Link>
          </div>

          {/* Drawer Bottom Status & Sound Controls */}
          <div className="pt-4 border-t-2 border-[#2E1546] flex items-center justify-between max-w-md mx-auto w-full">
            <div className="text-[10px] font-pixel-arcade text-[#55FF55] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#55FF55] animate-ping inline-block" />
              <span>PLAYER LVL {currentLevel} ({totalXp} XP)</span>
            </div>

            <button
              onClick={() => {
                toggleSound();
                soundFx.playClick();
              }}
              className="px-3 py-1.5 bg-[#140624] border border-[#3A1E54] text-xs font-pixel-arcade text-[#D0D0E0] flex items-center gap-2"
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-[#E14E3D]" /> : <Volume2 className="w-4 h-4 text-[#55FF55]" />}
              <span>{isMuted ? "UNMUTE" : "AUDIO ON"}</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
