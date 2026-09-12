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
    { id: "all", label: "All Organizers" },
    { id: "faculty", label: "Faculty Patrons" },
    { id: "core", label: "Core Leadership" },
    { id: "tech", label: "Tech & Systems" },
    { id: "design", label: "Creative & Design" },
    { id: "management", label: "Operations & PR" },
  ];

  const filteredMembers = TEAM_MEMBERS.filter((m) => {
    return selectedSubteam === "all" || m.subteam === selectedSubteam;
  });

  return (
    <main className="min-h-screen pt-20 sm:pt-24 relative bg-[#07010C]">
      {/* Background Image: 4K Ultra-Vivid Retro Synthwave Atmosphere */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat opacity-80 brightness-115 pointer-events-none"
        style={{
          backgroundImage: "url('/images/bg_synthwave_arcade_4k.jpg')",
        }}
      />
      <div className="fixed inset-0 bg-gradient-to-b from-[#07010C]/60 via-transparent to-[#07010C] pointer-events-none" />

      {/* Header Banner */}
      <section className="relative z-10 px-4 sm:px-6 max-w-7xl mx-auto text-center mb-10">
        <span className="font-pixel-arcade text-xs text-[#55FF55] bg-[#55FF55]/10 px-3 py-1 border border-[#55FF55]/30 uppercase font-bold">
          ORGANIZING COMMITTEE & SECRETARIAT
        </span>
        <h1 className="font-pixel-title text-3xl sm:text-5xl text-white font-bold mt-3 uppercase drop-shadow-[0_4px_0_#000]">
          ORGANIZING TEAM
        </h1>
        <p className="text-xs sm:text-sm text-[#F0F0F8] font-sans max-w-2xl mx-auto mt-2 leading-relaxed drop-shadow-[0_2px_4px_#000]">
          Organized by N8N Data Science Community, AWS SBG HBTU, and the Department of Mathematics, HBTU Kanpur.
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

      {/* MEMBER CARDS GRID */}
      <section className="px-4 sm:px-6 max-w-7xl mx-auto mb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMembers.map((member) => (
            <div
              key={member.id}
              className="inventory-slot-card p-6 flex flex-col justify-between group"
            >
              <div>
                {/* Header Badge */}
                <div className="flex items-center justify-between border-b border-[#2A2438] pb-3 mb-4">
                  <span className="font-pixel-arcade text-[10px] text-[#55FF55] font-bold flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-[#55FF55] inline-block" />
                    {member.badgeLabel}
                  </span>
                  <span className="font-pixel-arcade text-[9px] text-[#FFD34D] bg-[#FFD34D]/10 px-1.5 py-0.5 border border-[#FFD34D]/30 font-bold">
                    {member.subteamLabel}
                  </span>
                </div>

                {/* Avatar + Name */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-16 h-16 bg-[#100D1A] border-2 border-[#5D9C43] group-hover:border-[#4FD9FF] flex items-center justify-center text-3xl flex-shrink-0 transition-colors">
                    🏛️
                  </div>

                  <div>
                    <h3 className="font-pixel-heading text-lg font-bold text-white group-hover:text-[#4FD9FF] transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-xs text-[#4FD9FF] font-sans font-medium">
                      {member.role}
                    </p>
                    <p className="text-xs text-[#D8D8EE] font-sans mt-0.5">
                      {member.departmentLabel}
                    </p>
                  </div>
                </div>

                {/* Role Label Box */}
                <div className="p-3 bg-[#100D1A] border border-[#2A2438] mb-4 space-y-1.5">
                  <div className="text-[9px] font-pixel-arcade text-[#A0A0C0] font-bold">
                    ORGANIZATIONAL DESIGNATION:
                  </div>
                  <div className="text-xs font-sans text-white font-medium">
                    {member.role} · {member.departmentLabel}
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="pt-3 border-t border-[#2A2438] flex items-center justify-between">
                <span className="text-[10px] font-pixel-sub text-[#D8D8EE] font-bold">
                  ORGANIZING DESK
                </span>

                <span className="px-2 py-0.5 bg-[#100D1A] border border-[#2A2438] text-[#55FF55] font-pixel-arcade text-[8px] font-bold">
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
