"use client";

import React from "react";
import Link from "next/link";
import { soundFx } from "@/lib/soundFx";
import { spawnBlockBreakParticles } from "@/lib/particles";
import { Compass, Sparkles, Trophy, Award, Zap, Calendar, Users, Heart, ArrowUp } from "lucide-react";

export function VoxelFooter() {
  const scrollToTop = (e: React.MouseEvent) => {
    soundFx.playClick();
    spawnBlockBreakParticles(e.clientX, e.clientY, 10);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#07020C] border-t-2 border-[#2E1A40] mt-20 pt-12 pb-20 text-[#A0A0B0]">

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b-2 border-[#1E192B]">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-[#5D9C43] border-t-2 border-l-2 border-[#82C864] border-r-2 border-b-2 border-[#233C19] flex items-center justify-center font-pixel-arcade text-white text-xs">
                S
              </div>
              <span className="font-pixel-title text-base text-white tracking-wider">
                SINGULARITY 2K26
              </span>
            </div>

            <p className="text-xs sm:text-sm leading-relaxed font-sans text-[#B0B0C0] max-w-sm">
              The premier Minecraft Voxel World × Retro Arcade technical & cultural convergence at Harcourt Butler Technical University (HBTU Kanpur).
            </p>

            <div className="p-3 bg-[#120E1C] border border-[#2B223B] text-xs font-sans space-y-1">
              <div className="font-pixel-arcade text-[10px] text-[#55FF55]">ORGANIZATIONAL COALITION:</div>
              <div className="text-[#E0E0EE]">· N8N Data Science Community</div>
              <div className="text-[#E0E0EE]">· AWS Student Builders Group (SBG) HBTU</div>
              <div className="text-[#E0E0EE]">· Department of Mathematics, HBTU Kanpur</div>
            </div>
          </div>

          {/* Quick Nav */}
          <div className="space-y-3">
            <h4 className="font-pixel-title text-xs text-[#FFD34D] uppercase">
              Festival Pages
            </h4>
            <ul className="space-y-2 text-xs font-pixel-arcade">
              <li>
                <Link href="/" className="hover:text-[#4FD9FF] transition-colors flex items-center gap-1.5">
                  <Compass className="w-3 h-3 text-[#5D9C43]" /> Home World
                </Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-[#4FD9FF] transition-colors flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-[#4FD9FF]" /> Events & Quests
                </Link>
              </li>
              <li>
                <Link href="/hacknova" className="hover:text-[#4FD9FF] transition-colors flex items-center gap-1.5 text-[#FFD34D]">
                  <Trophy className="w-3 h-3 text-[#FFD34D]" /> HackNova 2.0
                </Link>
              </li>
              <li>
                <Link href="/speakers" className="hover:text-[#4FD9FF] transition-colors flex items-center gap-1.5">
                  <Award className="w-3 h-3 text-[#E14E3D]" /> Keynote Speakers
                </Link>
              </li>
              <li>
                <Link href="/sponsors" className="hover:text-[#4FD9FF] transition-colors flex items-center gap-1.5">
                  <Zap className="w-3 h-3 text-[#55FF55]" /> Ore Sponsors
                </Link>
              </li>
            </ul>
          </div>

          {/* Schedule & Team */}
          <div className="space-y-3">
            <h4 className="font-pixel-title text-xs text-[#FFD34D] uppercase">
              Schedule & Crew
            </h4>
            <ul className="space-y-2 text-xs font-pixel-arcade">
              <li>
                <Link href="/schedule" className="hover:text-[#4FD9FF] transition-colors flex items-center gap-1.5">
                  <Calendar className="w-3 h-3" /> 3-Day Timeline
                </Link>
              </li>
              <li>
                <Link href="/team" className="hover:text-[#4FD9FF] transition-colors flex items-center gap-1.5">
                  <Users className="w-3 h-3" /> Meet the Builders
                </Link>
              </li>
              <li>
                <Link href="/register" className="hover:text-[#4FD9FF] transition-colors flex items-center gap-1.5 text-[#55FF55]">
                  🎟️ Pass Customizer
                </Link>
              </li>
              <li>
                <a href="https://hbtu.ac.in" target="_blank" rel="noopener noreferrer" className="hover:text-[#4FD9FF] transition-colors">
                  🏛️ HBTU Official Portal
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Teleport */}
          <div className="space-y-3">
            <h4 className="font-pixel-title text-xs text-[#FFD34D] uppercase">
              Campus Coordinates
            </h4>
            <div className="text-xs font-sans space-y-1 text-[#B0B0C0]">
              <p className="font-semibold text-white">Harcourt Butler Technical University</p>
              <p>East Campus, Nawabganj, Kanpur, Uttar Pradesh, 208002</p>
              <p className="text-[#4FD9FF] pt-1">singularity@hbtu.ac.in</p>
            </div>

            <button
              onClick={scrollToTop}
              className="mt-3 w-full py-2 bg-[#1A1426] hover:bg-[#5D9C43] hover:text-black border border-[#3A3250] text-white text-[10px] font-pixel-arcade flex items-center justify-center gap-1.5 transition-colors"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              TELEPORT TO SPAWN
            </button>
          </div>
        </div>

        {/* Bottom Credits & Heart Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans">
          <p className="text-[#707085] text-center sm:text-left">
            © 2026 Singularity Techfest. Crafted with pixel precision by N8N DSC × AWS SBG HBTU × Dept of Mathematics.
          </p>

          <div className="flex items-center gap-1.5 text-xs text-[#FFD34D] font-pixel-arcade">
            <span>HEALTH:</span>
            <span className="text-[#E14E3D]">♥♥♥♥♥</span>
            <span className="text-[#55FF55]">10/10 HP</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
