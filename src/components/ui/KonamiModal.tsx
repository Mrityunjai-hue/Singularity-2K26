"use client";

import React, { useState, useEffect } from "react";
import { registerKonamiCode } from "@/lib/konami";
import { useAchievement } from "./AchievementSystem";
import { soundFx } from "@/lib/soundFx";
import { X, Trophy, Gamepad2, Award } from "lucide-react";
import confetti from "canvas-confetti";

export function KonamiModal() {
  const [isOpen, setIsOpen] = useState(false);
  const { unlockAchievement } = useAchievement();
  const [score, setScore] = useState(0);

  useEffect(() => {
    const unregister = registerKonamiCode(() => {
      setIsOpen(true);
      unlockAchievement("KONAMI_CHAMPION");
      soundFx.playLevelUp();
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
          colors: ["#5D9C43", "#4FD9FF", "#FFD34D", "#E14E3D", "#55FF55"],
        });
      } catch {}
    });

    return () => unregister();
  }, [unlockAchievement]);

  const handleMineDiamond = (e: React.MouseEvent) => {
    soundFx.playMineBlock();
    setScore((prev) => prev + 1);
    try {
      confetti({
        particleCount: 15,
        spread: 45,
        origin: { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight },
        colors: ["#4FD9FF", "#55FF55"],
      });
    } catch {}
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999999] bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#181424] border-4 border-[#FFD34D] shadow-[0_10px_0_#000,0_0_50px_rgba(255,211,77,0.5)] max-w-lg w-full p-6 text-center relative animate-scale">
        <button
          onClick={() => {
            setIsOpen(false);
            soundFx.playClick();
          }}
          className="absolute top-4 right-4 w-8 h-8 bg-[#2A2A38] hover:bg-[#E14E3D] text-white border border-black flex items-center justify-center"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="w-16 h-16 mx-auto bg-[#FFD34D]/20 border-2 border-[#FFD34D] flex items-center justify-center text-3xl mb-3 animate-bounce">
          🏆
        </div>

        <span className="font-pixel-arcade text-[10px] text-[#55FF55] bg-[#55FF55]/20 px-2 py-1 border border-[#55FF55]/40">
          SECRET CHEAT CODE ACTIVATED!
        </span>

        <h3 className="font-pixel-title text-base sm:text-lg text-[#FFD34D] mt-3">
          LEGENDARY NETHER ARCADE VAULT
        </h3>

        <p className="text-xs sm:text-sm text-[#D0D0E0] mt-2 font-sans">
          You unlocked the developer easter egg! You have been granted{" "}
          <span className="text-[#55FF55] font-bold">+300 XP</span> and VIP access to the secret HackNova speed-bounty list.
        </p>

        {/* Mini Clicker Game */}
        <div className="my-6 p-4 bg-[#100D1A] border-2 border-[#3A3250]">
          <p className="font-pixel-sub text-[10px] text-[#A0A0B0] uppercase mb-2">
            Click the Diamond Ore to Mine Loot
          </p>
          <button
            onClick={handleMineDiamond}
            className="w-24 h-24 mx-auto bg-[#004D63] border-4 border-[#4FD9FF] shadow-[0_0_20px_#4FD9FF] flex flex-col items-center justify-center cursor-pointer hover:scale-110 active:scale-95 transition-all select-none"
          >
            <span className="text-3xl">💎</span>
            <span className="font-pixel-arcade text-[9px] text-[#4FD9FF] mt-1">
              MINE!
            </span>
          </button>
          <div className="mt-3 font-pixel-arcade text-xs text-[#FFD34D]">
            Diamonds Mined: {score}
          </div>
        </div>

        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => {
              setIsOpen(false);
              soundFx.playClick();
            }}
            className="btn-voxel btn-voxel-gold text-xs"
          >
            CLAIM TROPHY & CLOSE
          </button>
        </div>
      </div>
    </div>
  );
}
