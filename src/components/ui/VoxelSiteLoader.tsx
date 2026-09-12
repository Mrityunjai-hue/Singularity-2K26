"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { soundFx } from "@/lib/soundFx";

export function VoxelSiteLoader() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isReadyToEnter, setIsReadyToEnter] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    // Attempt auto-play with fallbacks
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }

    const hasLoaded = sessionStorage.getItem("sng_portal_loader_shown");
    const duration = hasLoaded ? 1800 : 3200; // 3.2s on initial visit to fully appreciate the animation, 1.8s on reload
    const startTime = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const calcProgress = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(calcProgress);

      if (elapsed >= duration) {
        clearInterval(interval);
        setProgress(100);
        setIsReadyToEnter(true);

        try {
          soundFx.playChestOpen();
        } catch {}

        sessionStorage.setItem("sng_portal_loader_shown", "true");

        // Automatically transition into the site after completion
        setTimeout(() => {
          dismissLoader();
        }, 800);
      }
    }, 30);

    return () => clearInterval(interval);
  }, []);

  const dismissLoader = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 700);
  };

  if (!isLoading) return null;

  return (
    <div
      className={`fixed inset-0 z-[99999] flex flex-col items-center justify-between bg-black select-none transition-all duration-700 overflow-hidden ${
        isFadingOut
          ? "opacity-0 pointer-events-none scale-105 filter blur-sm"
          : "opacity-100 scale-100"
      }`}
    >
      {/* 1. Main Background / Portal Video */}
      <div className="absolute inset-0 flex items-center justify-center bg-black overflow-hidden">
        {/* Poster Image Fallback while video buffers */}
        <Image
          src="/images/singularity_portal_poster.jpg"
          alt="Singularity 2K26 Portal"
          fill
          priority
          className={`object-contain transition-opacity duration-500 ${
            videoLoaded ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        />

        {/* High-Definition 3D Portal Video */}
        <video
          ref={videoRef}
          src="/videos/singularity_portal_loader.mp4"
          poster="/images/singularity_portal_poster.jpg"
          autoPlay
          muted
          loop
          playsInline
          onLoadedData={() => setVideoLoaded(true)}
          className="w-full h-full object-contain pointer-events-none"
        />

        {/* Ambient Dark Vignette Edge Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_45%,rgba(0,0,0,0.85)_95%)] pointer-events-none" />
      </div>

      {/* 2. Subtle Top Brand Stamp */}
      <header className="relative z-20 w-full p-4 sm:p-6 flex items-center justify-between text-xs font-pixel-arcade pointer-events-none">
        <div className="flex items-center gap-2 bg-[#0D031A]/80 backdrop-blur-md border border-[#4FD9FF]/40 px-3 py-1.5 shadow-[0_0_15px_rgba(79,217,255,0.3)]">
          <span className="w-2 h-2 rounded-full bg-[#55FF55] animate-pulse shadow-[0_0_8px_#55FF55]" />
          <span className="text-[#4FD9FF] font-bold tracking-widest text-[11px] uppercase">
            SINGULARITY 2K26 // PORTAL ACTIVE
          </span>
        </div>

        <button
          onClick={dismissLoader}
          className="pointer-events-auto bg-[#0D031A]/80 hover:bg-[#4FD9FF] hover:text-black border border-[#4FD9FF]/50 text-[#4FD9FF] px-3 py-1 text-[11px] font-pixel-arcade uppercase font-bold tracking-wider transition-all cursor-pointer shadow-[0_0_12px_rgba(79,217,255,0.2)]"
        >
          SKIP ➔
        </button>
      </header>

      {/* 3. Bottom Exact Match HUD: Pixel Progress Bar + Glowing Text */}
      <footer className="relative z-20 w-full max-w-xl px-6 pb-8 sm:pb-12 flex flex-col items-center text-center">
        {/* Percentage Counter */}
        <div className="mb-2 font-pixel-arcade text-xs sm:text-sm text-[#4FD9FF] font-bold tracking-widest drop-shadow-[0_0_10px_rgba(79,217,255,0.9)] flex items-center gap-2">
          <span>{progress}%</span>
        </div>

        {/* Exact Pixel Progress Bar with Crosshair Endcaps */}
        <div className="w-full flex items-center justify-center gap-2 mb-3">
          {/* Left Crosshair (+) */}
          <span className="text-[#4FD9FF] text-lg font-pixel-title leading-none select-none drop-shadow-[0_0_8px_#4FD9FF]">
            +
          </span>

          {/* Progress Track */}
          <div className="flex-1 h-3 sm:h-3.5 bg-[#0A0214]/90 border border-[#4FD9FF] p-0.5 shadow-[0_0_15px_rgba(79,217,255,0.5),inset_0_0_10px_rgba(0,0,0,0.9)] flex items-center">
            <div
              className="h-full bg-[#4FD9FF] transition-all duration-75 ease-out shadow-[0_0_12px_#4FD9FF]"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Right Crosshair (+) */}
          <span className="text-[#4FD9FF] text-lg font-pixel-title leading-none select-none drop-shadow-[0_0_8px_#4FD9FF]">
            +
          </span>
        </div>

        {/* Title Text: SINGULARITY 2K26 TECH FESTIVAL */}
        <div className="font-pixel-title text-base sm:text-xl md:text-2xl text-white font-bold tracking-widest uppercase drop-shadow-[0_2px_10px_rgba(79,217,255,0.7)]">
          SINGULARITY 2K26 TECH FESTIVAL
        </div>

        {/* Interactive Enter CTA once ready */}
        {isReadyToEnter && (
          <button
            onClick={dismissLoader}
            className="mt-3 px-6 py-1.5 bg-[#4FD9FF] hover:bg-[#7ce4ff] text-black font-pixel-arcade font-bold text-xs uppercase transition-all shadow-[0_0_25px_rgba(79,217,255,0.9),0_3px_0_#000] active:translate-y-0.5 cursor-pointer animate-pulse"
          >
            ENTER THE FESTIVAL ➔
          </button>
        )}
      </footer>
    </div>
  );
}
