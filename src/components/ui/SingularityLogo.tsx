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
    sm: { img: 28, fontTitle: "text-xs", fontSub: "text-[7.5px]" },
    md: { img: 36, fontTitle: "text-sm sm:text-base", fontSub: "text-[8.5px]" },
    lg: { img: 56, fontTitle: "text-lg sm:text-xl", fontSub: "text-xs" },
    xl: { img: 80, fontTitle: "text-2xl sm:text-3xl", fontSub: "text-sm" },
  };

  const currentSize = sizeMap[size];

  return (
    <div className={`inline-flex items-center gap-2 group select-none ${className}`}>
      {/* 3D Voxel Obsidian Cube with Glowing Singularity Vortex */}
      <div className="relative flex-shrink-0">
        <div className="relative overflow-hidden rounded-none border-2 border-[#4FD9FF]/40 shadow-[0_0_12px_rgba(79,217,255,0.3)] transition-all duration-200 group-hover:border-[#4FD9FF] group-hover:shadow-[0_0_20px_rgba(79,217,255,0.6)] group-hover:scale-105">
          <Image
            src="/images/singularity_brand_logo.png"
            alt="Singularity 2K26 Logo"
            width={currentSize.img}
            height={currentSize.img}
            className="object-cover"
            priority
          />
        </div>

        {/* Ambient Cyan Glow Underlay */}
        <span className="absolute -inset-1 bg-[#4FD9FF] opacity-20 blur-sm -z-10 group-hover:opacity-50 transition-opacity" />
      </div>

      {showText && (
        <div className="flex flex-col text-left leading-none">
          <div className="flex items-center gap-1.5">
            <span className={`font-pixel-title text-white tracking-wider uppercase ${currentSize.fontTitle}`}>
              SINGULARITY
            </span>
            <span className={`font-pixel-title text-[#4FD9FF] tracking-widest ${currentSize.fontTitle}`}>
              2K26
            </span>
          </div>
          <span className={`font-pixel-arcade text-[#8E8E9F] uppercase tracking-widest mt-1 ${currentSize.fontSub}`}>
            VOXEL × ARCADE FEST
          </span>
        </div>
      )}
    </div>
  );
}
