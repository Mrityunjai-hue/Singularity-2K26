"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { ACHIEVEMENTS, Achievement } from "@/data/achievements";
import { soundFx } from "@/lib/soundFx";

interface AchievementContextType {
  unlocked: string[];
  totalXp: number;
  currentLevel: number;
  unlockAchievement: (id: string) => void;
  gainXp: (amount: number) => void;
  hotbarItems: string[];
  addToHotbar: (eventId: string) => boolean;
  removeFromHotbar: (eventId: string) => void;
  isNightMode: boolean;
  toggleNightMode: () => void;
  isLowRender: boolean;
  toggleLowRender: () => void;
  isMuted: boolean;
  toggleSound: () => void;
}

const AchievementContext = createContext<AchievementContextType | null>(null);

export function AchievementProvider({ children }: { children: React.ReactNode }) {
  const [unlocked, setUnlocked] = useState<string[]>([]);
  const [totalXp, setTotalXp] = useState(120);
  const [activeToast, setActiveToast] = useState<Achievement | null>(null);
  const [hotbarItems, setHotbarItems] = useState<string[]>(["aws-cloud-craft", "n8n-data-alchemy"]);
  const [isNightMode, setIsNightMode] = useState(false);
  const [isLowRender, setIsLowRender] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    try {
      const savedUnlocked = localStorage.getItem("singularity_achievements");
      if (savedUnlocked) setUnlocked(JSON.parse(savedUnlocked));

      const savedXp = localStorage.getItem("singularity_xp");
      if (savedXp) setTotalXp(parseInt(savedXp, 10));

      const savedHotbar = localStorage.getItem("singularity_hotbar");
      if (savedHotbar) setHotbarItems(JSON.parse(savedHotbar));

      const savedNight = localStorage.getItem("singularity_night_mode");
      if (savedNight) setIsNightMode(savedNight === "true");

      const savedLow = localStorage.getItem("singularity_low_render");
      if (savedLow) setIsLowRender(savedLow === "true");

      setIsMuted(soundFx.getMuted());

      // Auto-unlock spawn achievement on first load
      setTimeout(() => {
        unlockAchievement("SPAWNED");
      }, 1500);
    } catch {}
  }, []);

  const currentLevel = Math.floor(totalXp / 100) + 1;

  const gainXp = (amount: number) => {
    setTotalXp((prev) => {
      const next = prev + amount;
      try {
        localStorage.setItem("singularity_xp", String(next));
      } catch {}
      return next;
    });
    soundFx.playXp();
  };

  const unlockAchievement = (id: string) => {
    const ach = ACHIEVEMENTS[id];
    if (!ach) return;

    setUnlocked((prev) => {
      if (prev.includes(id)) return prev;
      const updated = [...prev, id];
      try {
        localStorage.setItem("singularity_achievements", JSON.stringify(updated));
      } catch {}

      setActiveToast(ach);
      soundFx.playLevelUp();
      gainXp(ach.xpReward);

      setTimeout(() => {
        setActiveToast(null);
      }, 4500);

      return updated;
    });
  };

  const addToHotbar = (eventId: string): boolean => {
    if (hotbarItems.includes(eventId)) return false;
    if (hotbarItems.length >= 8) {
      alert("Hotbar inventory full! (Maximum 8 items)");
      return false;
    }
    const next = [...hotbarItems, eventId];
    setHotbarItems(next);
    try {
      localStorage.setItem("singularity_hotbar", JSON.stringify(next));
    } catch {}
    soundFx.playEquip();
    unlockAchievement("HOTBAR_COLLECTOR");
    return true;
  };

  const removeFromHotbar = (eventId: string) => {
    const next = hotbarItems.filter((id) => id !== eventId);
    setHotbarItems(next);
    try {
      localStorage.setItem("singularity_hotbar", JSON.stringify(next));
    } catch {}
    soundFx.playClick();
  };

  const toggleNightMode = () => {
    setIsNightMode((prev) => {
      const next = !prev;
      try {
        localStorage.setItem("singularity_night_mode", String(next));
      } catch {}
      soundFx.playClick();
      return next;
    });
  };

  const toggleLowRender = () => {
    setIsLowRender((prev) => {
      const next = !prev;
      try {
        localStorage.setItem("singularity_low_render", String(next));
      } catch {}
      soundFx.playClick();
      return next;
    });
  };

  const toggleSound = () => {
    const muted = soundFx.toggleMute();
    setIsMuted(muted);
  };

  return (
    <AchievementContext.Provider
      value={{
        unlocked,
        totalXp,
        currentLevel,
        unlockAchievement,
        gainXp,
        hotbarItems,
        addToHotbar,
        removeFromHotbar,
        isNightMode,
        toggleNightMode,
        isLowRender,
        toggleLowRender,
        isMuted,
        toggleSound,
      }}
    >
      {children}

      {/* Achievement Unlocked Toast Notification */}
      {activeToast && (
        <div className="fixed top-20 right-4 z-[99999] animate-bounce">
          <div className="bg-[#1D1D24] border-4 border-[#3A3250] shadow-[0_8px_0_#0A0A0D,0_0_25px_rgba(255,211,77,0.4)] p-4 max-w-sm flex items-start gap-3">
            <div className="w-12 h-12 bg-[#141419] border-2 border-[#55FF55] flex items-center justify-center text-2xl flex-shrink-0">
              {activeToast.icon}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-pixel-title text-xs text-[#FFD34D] uppercase tracking-wider">
                  Achievement Unlocked!
                </span>
                <span className="text-[10px] font-pixel-arcade bg-[#55FF55]/20 text-[#55FF55] px-1 py-0.5 border border-[#55FF55]/40">
                  +{activeToast.xpReward} XP
                </span>
              </div>
              <h4 className="font-pixel-heading text-sm text-[#F5F5F0] font-bold mt-0.5">
                {activeToast.title}
              </h4>
              <p className="text-xs text-[#A0A0B0] mt-1 font-sans leading-tight">
                {activeToast.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </AchievementContext.Provider>
  );
}

export function useAchievement() {
  const context = useContext(AchievementContext);
  if (!context) {
    throw new Error("useAchievement must be used within an AchievementProvider");
  }
  return context;
}
