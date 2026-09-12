"use client";

import React, { useState } from "react";
import { useAchievement } from "./AchievementSystem";
import { FEST_EVENTS } from "@/data/events";
import { soundFx } from "@/lib/soundFx";
import { spawnBlockBreakParticles } from "@/lib/particles";
import {
  Sparkles,
  Volume2,
  VolumeX,
  Calendar,
  X,
  Trash2,
  ExternalLink,
  ShieldAlert,
  Cloud,
  Brain,
  Bot,
  Gamepad2,
} from "lucide-react";
import Link from "next/link";

export function VoxelHotbar() {
  const { hotbarItems, removeFromHotbar, totalXp, currentLevel, isMuted, toggleSound } =
    useAchievement();
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Map icons for events
  const getEventIcon = (name: string) => {
    switch (name) {
      case "cloud":
        return <Cloud className="w-4 h-4 sm:w-5 sm:h-5 text-[#4FD9FF]" />;
      case "workflow":
        return <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-[#55FF55]" />;
      case "brain":
        return <Brain className="w-4 h-4 sm:w-5 sm:h-5 text-[#FFD34D]" />;
      case "shield-alert":
        return <ShieldAlert className="w-4 h-4 sm:w-5 sm:h-5 text-[#E14E3D]" />;
      case "gamepad-2":
        return <Gamepad2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#4FD9FF]" />;
      default:
        return <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-[#FFD34D]" />;
    }
  };

  const levelProgress = totalXp % 100;

  const hotbarSlots = Array.from({ length: 9 }).map((_, index) => {
    if (index < 6) {
      const eventId = hotbarItems[index];
      const event = FEST_EVENTS.find((e) => e.id === eventId);
      return { type: "quest", event, index };
    }
    if (index === 6) {
      return { type: "xp", index };
    }
    if (index === 7) {
      return { type: "audio", index };
    }
    return { type: "schedule", index };
  });

  const handleSlotClick = (slot: typeof hotbarSlots[0], e: React.MouseEvent) => {
    soundFx.playClick();
    if (e.clientX && e.clientY) {
      spawnBlockBreakParticles(e.clientX, e.clientY, 8);
    }
    setSelectedSlot(slot.index);

    if (slot.type === "schedule" || slot.type === "quest") {
      setIsDrawerOpen(true);
    } else if (slot.type === "audio") {
      toggleSound();
    }
  };

  return (
    <>
      {/* Floating Bottom Hotbar Container */}
      <div className="fixed bottom-2 left-1/2 -translate-x-1/2 z-40 w-auto max-w-[calc(100vw-12px)] pointer-events-none select-none">
        {/* XP Level Bar above hotbar */}
        <div className="flex items-center justify-between px-1 sm:px-2 mb-1 gap-1 sm:gap-2">
          <div className="flex items-center gap-1 sm:gap-1.5 flex-shrink-0">
            <span className="font-pixel-arcade text-[8px] sm:text-[10px] text-[#55FF55] font-bold">
              LVL {currentLevel}
            </span>
            <span className="text-[7px] sm:text-[9px] font-pixel-sub text-[#A0A0B0]">
              ({totalXp} XP)
            </span>
          </div>

          <div className="w-24 min-[360px]:w-36 min-[420px]:w-48 sm:w-64 xp-bar-container rounded-none">
            <div
              className="xp-bar-fill"
              style={{ width: `${levelProgress}%` }}
            />
          </div>

          <span className="font-pixel-arcade text-[7px] sm:text-[9px] text-[#FFD34D] hidden min-[400px]:inline flex-shrink-0">
            HOTBAR HUD
          </span>
        </div>

        {/* 9-Slot Minecraft Inventory Tray */}
        <div className="pointer-events-auto bg-[#1A1A22]/95 backdrop-blur-md border-2 sm:border-4 border-[#3A3250] shadow-[0_6px_0_#0A0A0D,0_10px_25px_rgba(0,0,0,0.85)] p-0.5 sm:p-1.5 flex items-center justify-center gap-0.5 sm:gap-1.5 rounded-none max-w-full">
          {hotbarSlots.map((slot) => {
            const isSelected = selectedSlot === slot.index;

            return (
              <button
                key={slot.index}
                onClick={(e) => handleSlotClick(slot, e)}
                title={
                  slot.type === "quest" && slot.event
                    ? `Slot ${slot.index + 1}: ${slot.event.title}`
                    : slot.type === "xp"
                    ? `Level ${currentLevel} (${totalXp} Total XP)`
                    : slot.type === "audio"
                    ? isMuted ? "Audio Muted (Click to enable)" : "Audio Active"
                    : "Open Quest Log / Saved Schedule"
                }
                className={`w-7 h-7 min-[360px]:w-7.5 min-[360px]:h-7.5 min-[400px]:w-8.5 min-[400px]:h-8.5 sm:w-11 sm:h-11 bg-[#121217] border sm:border-2 transition-all relative flex items-center justify-center select-none group flex-shrink-0 touch-manipulation ${
                  isSelected
                    ? "border-[#4FD9FF] bg-[#4FD9FF]/20 shadow-[0_0_10px_#4FD9FF]"
                    : "border-[#2A2A38] hover:border-[#5D9C43] hover:bg-[#1D1D28] active:scale-95"
                }`}
              >
                {/* Hotbar Slot Number */}
                <span className="absolute top-0.5 left-0.5 text-[6px] sm:text-[8px] font-pixel-arcade text-[#707085] group-hover:text-white pointer-events-none">
                  {slot.index + 1}
                </span>

                {/* Slot Content */}
                {slot.type === "quest" && slot.event && (
                  <div className="relative scale-75 sm:scale-100 flex items-center justify-center">
                    {getEventIcon(slot.event.iconName)}
                    <span className="absolute -bottom-1 -right-1 text-[6px] sm:text-[8px] font-pixel-arcade text-[#55FF55] bg-black/90 px-0.5">
                      1
                    </span>
                  </div>
                )}

                {slot.type === "quest" && !slot.event && (
                  <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-[#2A2A38] opacity-40" />
                )}

                {slot.type === "xp" && (
                  <div className="text-center font-pixel-arcade text-[7px] sm:text-[9px] text-[#55FF55]">
                    ★{currentLevel}
                  </div>
                )}

                {slot.type === "audio" && (
                  <div className="scale-75 sm:scale-100 flex items-center justify-center">
                    {isMuted ? (
                      <VolumeX className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5 text-[#E14E3D]" />
                    ) : (
                      <Volume2 className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5 text-[#55FF55]" />
                    )}
                  </div>
                )}

                {slot.type === "schedule" && (
                  <div className="relative scale-75 sm:scale-100 flex items-center justify-center">
                    <Calendar className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5 text-[#FFD34D]" />
                    {hotbarItems.length > 0 && (
                      <span className="absolute -top-1 -right-1 w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 bg-[#E14E3D] text-white text-[6px] sm:text-[8px] font-pixel-arcade flex items-center justify-center">
                        {hotbarItems.length}
                      </span>
                    )}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Quest Log & Inventory Drawer Modal */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
          <div className="bg-[#1D1D24] border-4 border-[#3A3250] shadow-[0_8px_0_#0A0A0D,0_0_40px_rgba(79,217,255,0.2)] max-w-2xl w-full max-h-[88vh] flex flex-col overflow-hidden">
            {/* Drawer Header */}
            <div className="p-3 sm:p-4 border-b-4 border-[#3A3250] bg-[#14121F] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xl">🎒</span>
                <div>
                  <h3 className="font-pixel-title text-xs sm:text-sm text-[#FFD34D] uppercase">
                    Quest Log & Hotbar
                  </h3>
                  <p className="text-[11px] text-[#A0A0B0] font-sans">
                    {hotbarItems.length}/8 Bookmarked · Level {currentLevel}
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  setIsDrawerOpen(false);
                  soundFx.playClick();
                }}
                className="w-8 h-8 bg-[#2A2A38] hover:bg-[#E14E3D] border border-black text-white flex items-center justify-center transition-colors active:scale-95"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Drawer Content */}
            <div className="p-3 sm:p-6 overflow-y-auto flex-1 space-y-3">
              {hotbarItems.length === 0 ? (
                <div className="text-center py-8">
                  <p className="font-pixel-title text-xs text-[#A0A0B0]">
                    HOTBAR IS EMPTY!
                  </p>
                  <p className="text-xs text-[#707085] mt-2 font-sans">
                    Visit{" "}
                    <Link
                      href="/events"
                      onClick={() => setIsDrawerOpen(false)}
                      className="text-[#4FD9FF] underline"
                    >
                      Events & Quests
                    </Link>{" "}
                    to equip sessions.
                  </p>
                </div>
              ) : (
                <div className="space-y-2.5">
                  {hotbarItems.map((id) => {
                    const event = FEST_EVENTS.find((e) => e.id === id);
                    if (!event) return null;

                    return (
                      <div
                        key={id}
                        className="bg-[#141419] border-2 border-[#2A2A38] p-3 flex items-center justify-between gap-2.5 transition-colors"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="w-9 h-9 bg-[#1D1D24] border border-[#3A3250] flex items-center justify-center flex-shrink-0">
                            {getEventIcon(event.iconName)}
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span className="font-pixel-arcade text-[9px] text-[#4FD9FF]">
                                Day {event.day} · {event.time}
                              </span>
                              <span className="text-[8px] font-pixel-sub text-[#55FF55] bg-[#55FF55]/10 px-1 border border-[#55FF55]/30">
                                {event.badgeLevel}
                              </span>
                            </div>
                            <h4 className="font-pixel-heading text-xs sm:text-sm text-[#F5F5F0] font-bold truncate">
                              {event.title}
                            </h4>
                            <p className="text-[10px] text-[#A0A0B0] font-sans truncate">
                              📍 {event.venue}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 flex-shrink-0">
                          <Link
                            href="/schedule"
                            onClick={() => setIsDrawerOpen(false)}
                            className="p-1.5 bg-[#2A2A38] hover:bg-[#4FD9FF] hover:text-black text-white border border-black text-[10px] font-pixel-arcade flex items-center gap-1"
                          >
                            <ExternalLink className="w-3 h-3" />
                            <span className="hidden sm:inline">VIEW</span>
                          </Link>

                          <button
                            onClick={() => removeFromHotbar(id)}
                            title="Drop from Hotbar"
                            className="p-1.5 bg-[#2A2A38] hover:bg-[#E14E3D] text-[#E14E3D] hover:text-white border border-black transition-colors"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Drawer Footer */}
            <div className="p-3 border-t-4 border-[#3A3250] bg-[#14121F] flex items-center justify-between gap-2">
              <Link
                href="/schedule"
                onClick={() => {
                  setIsDrawerOpen(false);
                  soundFx.playClick();
                }}
                className="font-pixel-arcade text-[10px] sm:text-xs text-[#4FD9FF] hover:underline flex items-center gap-1 truncate"
              >
                <Calendar className="w-3.5 h-3.5 flex-shrink-0" />
                <span>Full Schedule →</span>
              </Link>

              <Link
                href="/register"
                onClick={() => {
                  setIsDrawerOpen(false);
                  soundFx.playClick();
                }}
                className="btn-voxel btn-voxel-gold text-[10px] py-1.5 px-3 flex-shrink-0"
              >
                FORGE PASS
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
