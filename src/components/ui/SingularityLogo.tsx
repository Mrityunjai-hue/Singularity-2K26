"use client";

import React from "react";
import Image from "next/image";

interface SingularityLogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  showText?: boolean;
  className?: string;
}

export function SingularityLogo({ size = "md", showText = true, className = "" }: SingularityLogoProps) {
  const sizeMap = {
    sm: { img: 32, fontTitle: "text-xs", fontSub: "text-[8px]" },
    md: { img: 40, fontTitle: "text-sm sm:text-base", fontSub: "text-[9px]" },
    lg: { img: 64, fontTitle: "text-lg sm:text-xl", fontSub: "text-xs" },
    xl: { img: 96, fontTitle: "text-2xl sm:text-3xl", fontSub: "text-sm" },
  };

  const currentSize = sizeMap[size];

  return (
    <div className={`inline-flex items-center gap-2.5 group select-none ${className}`}>
      {/* 3D Voxel Obsidian Cube with Glowing Singularity Vortex */}
      <div className="relative flex-shrink-0">
        <div className="relative overflow-hidden rounded-sm border border-[#4FD9FF]/40 shadow-[0_0_15px_rgba(79,217,255,0.4)] transition-all duration-300 group-hover:shadow-[0_0_25px_rgba(79,217,255,0.7)] group-hover:scale-105">
          <Image
            src="/images/singularity_brand_logo.png"
            alt="Singularity 2K26 Logo"
            width={currentSize.img}
            height={currentSize.img}
            className="object-cover transition-transform duration-500 group-hover:rotate-3"
            priority
          />
        </div>

        {/* Ambient Pulsing Glow Underlay */}
        <span className="absolute -inset-1 bg-gradient-to-r from-[#4FD9FF] to-[#FFD34D] opacity-30 blur-sm -z-10 group-hover:opacity-60 transition-opacity" />
      </div>

      {showText && (
        <div className="flex flex-col text-left">
          <div className="flex items-center gap-1.5">
            <span className={`font-pixel-title text-white tracking-wider uppercase ${currentSize.fontTitle}`}>
              SINGULARITY
            </span>
            <span className={`font-pixel-title text-[#FFD34D] tracking-widest ${currentSize.fontTitle}`}>
              2K26
            </span>
          </div>
          <span className={`font-pixel-arcade text-[#55FF55] uppercase tracking-widest ${currentSize.fontSub}`}>
            VOXEL × RETRO ARCADE FEST
          </span>
        </div>
      )}
    </div>
  );
}
