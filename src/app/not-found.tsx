"use client";

import React from "react";
import Link from "next/link";
import { soundFx } from "@/lib/soundFx";
import { spawnBlockBreakParticles } from "@/lib/particles";
import { Compass, ArrowLeft } from "lucide-react";

export default function NotFoundPage() {
  const handleRespawn = (e: React.MouseEvent) => {
    soundFx.playLevelUp();
    spawnBlockBreakParticles(e.clientX, e.clientY, 20);
  };

  return (
    <main className="min-h-[85vh] flex items-center justify-center p-4">
      <div className="bg-[#14081E] border-4 border-[#E14E3D] shadow-[0_10px_0_#000,0_0_50px_rgba(225,78,61,0.4)] max-w-lg w-full p-8 text-center space-y-6">
        {/* Animated Bedrock / Void Icon */}
        <div className="w-20 h-20 mx-auto bg-[#07010C] border-4 border-[#3A1448] flex items-center justify-center text-4xl shadow-[0_0_20px_#E14E3D] animate-bounce">
          🕳️
        </div>

        <div>
          <span className="font-pixel-arcade text-[10px] text-[#E14E3D] bg-[#E14E3D]/20 px-2 py-1 border border-[#E14E3D]/40">
            ERROR 404 · CHUNK NOT FOUND
          </span>
          <h1 className="font-pixel-title text-2xl sm:text-3xl text-white mt-3 uppercase">
            FELL OUT OF THE WORLD
          </h1>
          <p className="font-pixel-sub text-xs text-[#FFD34D] mt-1">
            (COORDINATES: Y &lt; -64 · VOID ZONE)
          </p>
        </div>

        <p className="text-xs sm:text-sm text-[#A0A0B0] font-sans leading-relaxed">
          The requested festival coordinates do not exist in this dimension. The terrain generator encountered an unloaded chunk.
        </p>

        <div className="pt-2 flex justify-center">
          <Link
            href="/"
            onClick={handleRespawn}
            className="btn-voxel btn-voxel-diamond text-xs px-6 py-3.5 flex items-center gap-2"
          >
            <Compass className="w-4 h-4" />
            <span>RESPAWN AT WORLD SPAWN</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
