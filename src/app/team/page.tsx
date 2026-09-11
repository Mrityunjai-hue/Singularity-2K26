"use client";

import React, { useState } from "react";
import { TEAM_MEMBERS, TeamMember } from "@/data/team";
import { soundFx } from "@/lib/soundFx";
import { spawnBlockBreakParticles } from "@/lib/particles";
import { VoxelFooter } from "@/components/ui/VoxelFooter";
import { Users, Heart, Zap, Shield, Sparkles, Globe } from "lucide-react";

export default function TeamPage() {
  const [selectedSubteam, setSelectedSubteam] = useState<string>("all");

  const subteams = [
    { id: "all", label: "All Builders" },
    { id: "faculty", label: "Faculty Patrons" },
    { id: "core", label: "Core Leadership" },
    { id: "tech", label: "Tech & Systems" },
    { id: "design", label: "Creative & Design" },
    { id: "management", label: "Operations & PR" },
  ];

  const filteredMembers = TEAM_MEMBERS.filter((m) => {
    return selectedSubteam === "all" || m.subteam === selectedSubteam;
  });

  const getToolIcon = (tool: string) => {
    switch (tool) {
      case "pickaxe":
        return "⛏️";
      case "redstone":
        return "🔴";
      case "crafting-table":
        return "🪵";
      case "potion":
        return "🧪";
      case "sword":
        return "⚔️";
      case "book":
        return "📜";
      case "compass":
        return "🧭";
      default:
        return "✨";
    }
  };

  return (
    <main className="min-h-screen pt-8 relative bg-[#07010C]">
      {/* Background Image: 4K Ultra-Vivid Retro Synthwave Guild Atmosphere */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat opacity-80 brightness-115 pointer-events-none"
        style={{
          backgroundImage: "url('/images/bg_synthwave_arcade_4k.jpg')",
        }}
      />
      <div className="fixed inset-0 bg-gradient-to-b from-[#07010C]/60 via-transparent to-[#07010C] pointer-events-none" />

      {/* Header Banner */}
      <section className="relative z-10 px-4 sm:px-6 max-w-7xl mx-auto text-center mb-10">
        <span className="font-pixel-arcade text-xs text-[#55FF55] bg-[#55FF55]/10 px-3 py-1 border border-[#55FF55]/30 uppercase">
          GUILD OF ARCHITECTS & ORGANIZERS
        </span>
        <h1 className="font-pixel-title text-3xl sm:text-5xl text-white mt-3 uppercase drop-shadow-[0_4px_0_#000]">
          MEET THE BUILDERS
        </h1>
        <p className="text-xs sm:text-sm text-[#F0F0F8] font-sans max-w-2xl mx-auto mt-2 leading-relaxed drop-shadow-[0_2px_4px_#000]">
          The collaborative squad behind Singularity 2K26. Brought to you by N8N Data Science Community, AWS SBG HBTU, and the Department of Mathematics, HBTU Kanpur.
        </p>

        {/* Subteam Selector */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
          {subteams.map((st) => (
            <button
              key={st.id}
              onClick={(e) => {
                setSelectedSubteam(st.id);
                soundFx.playClick();
                spawnBlockBreakParticles(e.clientX, e.clientY, 8);
              }}
              className={`px-3.5 py-1.5 font-pixel-arcade text-xs uppercase border-2 transition-all ${
                selectedSubteam === st.id
                  ? "bg-[#FFD34D] text-black border-[#FFD34D] font-bold shadow-[0_0_12px_rgba(255,211,77,0.4)]"
                  : "bg-[#14121F] text-[#D0D0E0] border-[#3A3250] hover:border-[#5D9C43]"
              }`}
            >
              {st.label}
            </button>
          ))}
        </div>
      </section>

      {/* PLAYER CARDS GRID */}
      <section className="px-4 sm:px-6 max-w-7xl mx-auto mb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMembers.map((member) => (
            <div
              key={member.id}
              className="inventory-slot-card p-6 flex flex-col justify-between group"
            >
              <div>
                {/* Header: Level & Branch */}
                <div className="flex items-center justify-between border-b border-[#2A2438] pb-3 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 bg-[#55FF55] border border-black inline-block" />
                    <span className="font-pixel-arcade text-[10px] text-[#55FF55]">
                      LVL {member.playerLevel}
                    </span>
                  </div>
                  <span className="font-pixel-arcade text-[9px] text-[#FFD34D] bg-[#FFD34D]/10 px-1.5 py-0.5 border border-[#FFD34D]/30">
                    {member.subteamLabel}
                  </span>
                </div>

                {/* Avatar + Name */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-16 h-16 bg-[#100D1A] border-2 border-[#5D9C43] group-hover:border-[#4FD9FF] flex items-center justify-center text-3xl flex-shrink-0 transition-colors">
                    {getToolIcon(member.toolItem)}
                  </div>

                  <div>
                    <h3 className="font-pixel-heading text-lg font-bold text-white group-hover:text-[#4FD9FF] transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-xs text-[#4FD9FF] font-sans font-medium">
                      {member.role}
                    </p>
                    <p className="text-xs text-[#808098] font-sans mt-0.5">
                      {member.collegeBranch}
                    </p>
                  </div>
                </div>

                {/* RPG Stats Bar: HP & Mana */}
                <div className="p-3 bg-[#100D1A] border border-[#2A2438] mb-4 space-y-2">
                  <div className="flex items-center justify-between text-[10px] font-pixel-arcade">
                    <span className="text-[#E14E3D] flex items-center gap-1">
                      <Heart className="w-3 h-3" /> HP: {member.hpStat}
                    </span>
                    <span className="text-[#4FD9FF] flex items-center gap-1">
                      <Zap className="w-3 h-3" /> MANA: {member.manaStat}
                    </span>
                  </div>

                  <div className="border-t border-[#1F192C] pt-2">
                    <div className="text-[9px] font-pixel-arcade text-[#A0A0B0]">
                      EQUIPPED TOOL:
                    </div>
                    <div className="text-xs font-sans text-white font-medium">
                      {getToolIcon(member.toolItem)} {member.toolLabel}
                    </div>
                  </div>

                  <div className="border-t border-[#1F192C] pt-1.5">
                    <div className="text-[9px] font-pixel-arcade text-[#FFD34D]">
                      SPECIAL MOVE:
                    </div>
                    <div className="text-xs font-sans text-[#E0E0EE] italic">
                      &quot;{member.specialMove}&quot;
                    </div>
                  </div>
                </div>
              </div>

              {/* Guild Badge Footer */}
              <div className="pt-3 border-t border-[#2A2438] flex items-center justify-between">
                <span className="text-[10px] font-pixel-sub text-[#A0A0B0]">
                  GUILD CREW
                </span>

                <span className="px-2 py-0.5 bg-[#100D1A] border border-[#2A2438] text-[#55FF55] font-pixel-arcade text-[8px]">
                  VERIFIED ORGANIZER
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Global Footer */}
      <VoxelFooter />
    </main>
  );
}
