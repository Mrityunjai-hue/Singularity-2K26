"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { soundFx } from "@/lib/soundFx";

export function VoxelSiteLoader() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [statusMessageIndex, setStatusMessageIndex] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);

  const STATUS_MESSAGES = [
    "GENERATING VOXEL CHUNKS...",
    "INITIALIZING QUANTUM RUNTIME...",
    "CONNECTING TO OVERWORLD NEXUS...",
    "CALIBRATING REDSTONE FLUX...",
    "LOADING RETRO ARCADE PROTOCOLS...",
    "SINGULARITY 2K26 CORE READY!",
  ];

  useEffect(() => {
    // Check if previously loaded in this session to keep navigation fast,
    // but show on initial site arrival.
    const hasLoaded = sessionStorage.getItem("sng_site_loader_shown");
    const duration = hasLoaded ? 1000 : 1800; // Snappy 1.8s on first load, 1.0s on refresh

    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const calculatedProgress = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(calculatedProgress);

      const msgIndex = Math.min(
        STATUS_MESSAGES.length - 1,
        Math.floor((calculatedProgress / 100) * STATUS_MESSAGES.length)
      );
      setStatusMessageIndex(msgIndex);

      if (elapsed >= duration) {
        clearInterval(interval);
        setProgress(100);
        setIsFadingOut(true);

        try {
          soundFx.playChestOpen();
        } catch {}

        sessionStorage.setItem("sng_site_loader_shown", "true");

        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      }
    }, 30);

    return () => clearInterval(interval);
  }, []);

  if (!isLoading) return null;

  return (
    <div
      className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#07010C] select-none transition-all duration-500 ${
        isFadingOut ? "opacity-0 pointer-events-none scale-105" : "opacity-100"
      }`}
      style={{
        backgroundImage: "radial-gradient(circle at 50% 40%, #1A062E 0%, #07010C 70%)",
      }}
    >
      {/* Background Animated Scanline & Retro Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#4FD9FF_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-md w-full">
        {/* Animated Brand Emblem Lockup */}
        <div className="relative mb-6">
          {/* Pulsating Outer Neon Rings */}
          <div className="absolute -inset-6 rounded-full bg-[#4FD9FF]/20 blur-xl animate-pulse" />
          <div className="absolute -inset-3 rounded-full bg-[#FFD34D]/25 blur-lg animate-ping duration-1000" />

          {/* Glowing 3D Pixel Frame Container */}
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 bg-[#0D031A] border-4 border-[#4FD9FF] shadow-[0_0_35px_rgba(79,217,255,0.7),0_8px_0_#000] p-2 flex items-center justify-center animate-[levitate_3s_ease-in-out_infinite]">
            <Image
              src="/images/singularity_brand_logo.png"
              alt="Singularity 2K26"
              width={100}
              height={100}
              className="object-contain filter drop-shadow-[0_0_12px_rgba(79,217,255,0.8)]"
              priority
            />

            {/* Corner Pixel Accents */}
            <div className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-[#FFD34D] border border-black" />
            <div className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-[#55FF55] border border-black" />
            <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-[#E14E3D] border border-black" />
            <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-[#4FD9FF] border border-black" />
          </div>
        </div>

        {/* Fest Title Typography */}
        <div className="space-y-1 mb-6">
          <div className="flex items-center justify-center gap-2">
            <span className="font-pixel-title text-2xl sm:text-3xl text-white font-bold tracking-wider uppercase drop-shadow-[0_4px_0_#000]">
              SINGULARITY
            </span>
            <span className="font-pixel-title text-2xl sm:text-3xl text-[#4FD9FF] font-bold tracking-widest drop-shadow-[0_4px_0_#000]">
              2K26
            </span>
          </div>
          <div className="font-pixel-arcade text-[10px] text-[#FFD34D] uppercase tracking-widest font-bold">
            MINECRAFT VOXEL × RETRO ARCADE FEST
          </div>
        </div>

        {/* Retro Multi-Segment Progress Bar */}
        <div className="w-full bg-[#0D031A] border-4 border-[#3A1E54] shadow-[0_6px_0_#000,0_0_25px_rgba(79,217,255,0.2)] p-1.5 mb-3">
          <div className="h-5 bg-[#05010B] relative overflow-hidden flex items-center">
            {/* Filled Progress Bar */}
            <div
              className="h-full bg-gradient-to-r from-[#E14E3D] via-[#FFD34D] via-[#4FD9FF] to-[#55FF55] transition-all duration-75 ease-out relative"
              style={{ width: `${progress}%` }}
            >
              {/* Shimmer Effect */}
              <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.4)_50%,transparent_100%)] animate-[shimmer_1.5s_infinite]" />
            </div>

            {/* Segment Grid Overlay */}
            <div
              className="absolute inset-0 bg-[linear-gradient(90deg,transparent_90%,rgba(0,0,0,0.6)_10%)] pointer-events-none"
              style={{ backgroundSize: "16px 100%" }}
            />
          </div>
        </div>

        {/* Loading Meta & Cycling Status Messages */}
        <div className="w-full flex items-center justify-between text-xs font-pixel-arcade">
          <span className="text-[#55FF55] flex items-center gap-1.5 font-bold truncate">
            <span className="w-2 h-2 rounded-full bg-[#55FF55] animate-ping inline-block" />
            {STATUS_MESSAGES[statusMessageIndex]}
          </span>
          <span className="text-[#FFD34D] font-bold ml-2 font-mono text-sm">
            {progress}%
          </span>
        </div>

        {/* Institutional Accreditation Footer */}
        <div className="mt-8 text-[9px] font-pixel-arcade text-[#A0A0C0] uppercase">
          N8N DSC · AWS SBG HBTU · DEPT OF MATHEMATICS
        </div>
      </div>
    </div>
  );
}
