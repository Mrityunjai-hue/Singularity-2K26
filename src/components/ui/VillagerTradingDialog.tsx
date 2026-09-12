"use client";

import React, { useState } from "react";
import { VILLAGER_TRADES, VillagerTrade } from "@/data/villagerFaq";
import { useAchievement } from "./AchievementSystem";
import { soundFx } from "@/lib/soundFx";
import { spawnBlockBreakParticles } from "@/lib/particles";
import { Sparkles, MessageSquare, ArrowRight, CheckCircle } from "lucide-react";

export function VillagerTradingDialog() {
  const [selectedTrade, setSelectedTrade] = useState<VillagerTrade>(VILLAGER_TRADES[0]);
  const [tradedItems, setTradedItems] = useState<string[]>([]);
  const { gainXp, unlockAchievement } = useAchievement();

  const handleSelectTrade = (trade: VillagerTrade, e: React.MouseEvent) => {
    soundFx.playVillagerHuh();
    spawnBlockBreakParticles(e.clientX, e.clientY, 8);
    setSelectedTrade(trade);

    if (!tradedItems.includes(trade.id)) {
      setTradedItems((prev) => [...prev, trade.id]);
      gainXp(25);
      unlockAchievement("VILLAGER_TRADE");
    }
  };

  return (
    <div className="bg-[#181424] border-4 border-[#3A3250] shadow-[0_8px_0_#0A0A0D,0_0_35px_rgba(85,255,85,0.15)] p-4 sm:p-6">
      {/* Title Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b-4 border-[#2A2438] pb-4 mb-6">
        <div className="flex items-center gap-3">
          {/* Villager Avatar Frame */}
          <div className="w-12 h-12 bg-[#2B1B10] border-2 border-[#55FF55] flex items-center justify-center text-2xl flex-shrink-0 relative">
            🧙‍♂️
            <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#55FF55] text-black text-[9px] font-pixel-arcade flex items-center justify-center font-bold">
              NPC
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-pixel-title text-sm sm:text-base text-[#55FF55]">
                VILLAGE ELDER OF HBTU
              </h3>
              <span className="text-[9px] font-pixel-arcade text-[#FFD34D] bg-[#FFD34D]/10 px-1 border border-[#FFD34D]/30">
                LEVEL 99 SAGE
              </span>
            </div>
            <p className="text-xs text-[#A0A0B0] font-sans">
              &quot;Trade emeralds for sacred fest intelligence and secrets!&quot;
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <div className="flex items-center gap-1.5 bg-[#141419] border border-[#55FF55]/40 px-2.5 py-1">
            <span className="text-sm">💎</span>
            <span className="font-pixel-arcade text-xs text-[#55FF55]">
              Trades Completed: {tradedItems.length}/{VILLAGER_TRADES.length}
            </span>
          </div>
        </div>
      </div>

      {/* Trading Window Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: List of Trade Offers (Questions) */}
        <div className="lg:col-span-5 space-y-2">
          <p className="font-pixel-sub text-[10px] text-[#A0A0B0] uppercase tracking-wider mb-2">
            SELECT INQUIRY TO TRADE:
          </p>
          {VILLAGER_TRADES.map((trade) => {
            const isSelected = selectedTrade.id === trade.id;
            const isTraded = tradedItems.includes(trade.id);

            return (
              <button
                key={trade.id}
                onClick={(e) => handleSelectTrade(trade, e)}
                className={`w-full text-left p-3 border-2 transition-all flex items-center justify-between gap-2 select-none ${
                  isSelected
                    ? "bg-[#55FF55]/15 border-[#55FF55] text-white shadow-[0_0_12px_rgba(85,255,85,0.3)]"
                    : "bg-[#141419] border-[#2A2A38] text-[#D0D0E0] hover:border-[#5D9C43] hover:bg-[#1A1A22]"
                }`}
              >
                <div className="flex items-center gap-2 overflow-hidden">
                  <div className="w-6 h-6 bg-[#2B1B10] border border-[#3A3250] flex items-center justify-center text-xs flex-shrink-0">
                    {isTraded ? "✨" : "📜"}
                  </div>
                  <span className="font-sans text-xs sm:text-sm truncate font-medium">
                    {trade.question}
                  </span>
                </div>

                <div className="flex items-center gap-1 flex-shrink-0">
                  <span className="text-xs">💎</span>
                  <span className="font-pixel-arcade text-[10px] text-[#55FF55]">
                    {trade.emeraldCost}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Column: Active Trade Interaction & Response */}
        <div className="lg:col-span-7 bg-[#14121F] border-2 border-[#3A3250] p-4 sm:p-6 flex flex-col justify-between">
          <div>
            {/* Trade Exchange Header */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#2A2438] mb-4">
              <div className="flex items-center gap-2">
                <span className="font-pixel-arcade text-[10px] text-[#FFD34D] font-bold uppercase">
                  TOPIC:
                </span>
                <span className="text-[10px] font-pixel-arcade text-[#55FF55] bg-[#55FF55]/15 px-2 py-0.5 border border-[#55FF55]/40 font-bold uppercase">
                  {selectedTrade.category}
                </span>
              </div>
              <div className="text-[11px] font-pixel-arcade text-[#55FF55] flex items-center gap-1.5 font-bold">
                <span className="text-[#A0A0B0]">UNLOCKED:</span>
                <span className="text-[#FFD34D]">{selectedTrade.itemGiven}</span>
              </div>
            </div>

            <h4 className="font-pixel-heading text-sm sm:text-base text-[#FFFFFF] font-bold mb-3 leading-snug">
              &quot;{selectedTrade.question}&quot;
            </h4>

            {/* Villager Speech Box */}
            <div className="bg-[#0D0A17] border-2 border-[#55FF55]/50 p-4 sm:p-5 relative shadow-[inset_0_2px_8px_rgba(0,0,0,0.85)]">
              <div className="flex items-start gap-3.5">
                <span className="text-2xl flex-shrink-0 select-none">📜</span>
                <p className="text-xs sm:text-sm text-[#F0F0F8] font-sans leading-relaxed">
                  {selectedTrade.villagerResponse}
                </p>
              </div>
            </div>
          </div>

          {/* Trade Footer Actions */}
          <div className="mt-6 pt-4 border-t border-[#2A2438] flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs text-[#A0A0B0] font-sans">
              <CheckCircle className="w-4 h-4 text-[#55FF55]" />
              <span>{tradedItems.includes(selectedTrade.id) ? "Scroll unlocked (+25 XP earned)" : "Click inquiry to decode knowledge"}</span>
            </div>

            <button
              onClick={(e) => handleSelectTrade(selectedTrade, e)}
              className="btn-voxel btn-voxel-diamond text-xs w-full sm:w-auto"
            >
              TRADE KNOWLEDGE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
