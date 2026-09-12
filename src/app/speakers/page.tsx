"use client";

import React from "react";
import { SPEAKERS_DATA, Speaker } from "@/data/speakers";
import { soundFx } from "@/lib/soundFx";
import { spawnBlockBreakParticles } from "@/lib/particles";
import { VoxelFooter } from "@/components/ui/VoxelFooter";
import { Award, Sparkles, MapPin, Clock, ExternalLink, Globe } from "lucide-react";

export default function SpeakersPage() {
  const featuredSpeaker = SPEAKERS_DATA.find((s) => s.isKeynoteFeatured) || SPEAKERS_DATA[0];
  const otherSpeakers = SPEAKERS_DATA.filter((s) => s.id !== featuredSpeaker.id);

  const getAvatarIcon = (style: string) => {
    switch (style) {
      case "wizard":
        return "🧙‍♂️";
      case "oracle":
        return "🔮";
      case "architect":
        return "🏛️";
      case "knight":
        return "⚔️";
      case "hacker":
        return "💻";
      default:
        return "🌟";
    }
  };

  return (
    <main className="min-h-screen pt-20 sm:pt-24 relative bg-[#07010C]">
      {/* Background Image: 4K Ultra-Vivid Synthwave Arcade Atmosphere */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat opacity-80 brightness-115 pointer-events-none"
        style={{
          backgroundImage: "url('/images/bg_synthwave_arcade_4k.jpg')",
        }}
      />
      <div className="fixed inset-0 bg-gradient-to-b from-[#07010C]/60 via-transparent to-[#07010C] pointer-events-none" />

      {/* Page Header */}
      <section className="relative z-10 px-4 sm:px-6 max-w-7xl mx-auto text-center mb-12">
        <span className="font-pixel-arcade text-xs text-[#FFD34D] bg-[#FFD34D]/10 px-3 py-1 border border-[#FFD34D]/30 uppercase font-bold">
          CELESTIAL ARCHITECTS & MENTORS
        </span>
        <h1 className="font-pixel-title text-3xl sm:text-5xl text-white font-bold mt-3 uppercase drop-shadow-[0_4px_0_#000]">
          DISTINGUISHED GUESTS & KEYNOTES
        </h1>
        <p className="text-xs sm:text-sm text-[#F0F0F8] font-sans max-w-2xl mx-auto mt-2 leading-relaxed drop-shadow-[0_2px_4px_#000]">
          Learn directly from technology leaders, researchers, open-source architects, and distinguished mathematical computing faculty.
        </p>
      </section>

      {/* FEATURED KEYNOTE SPOTLIGHT CARD */}
      <section className="px-4 sm:px-6 max-w-7xl mx-auto mb-16">
        <div className="bg-gradient-to-r from-[#180A26] via-[#10061A] to-[#180A26] border-4 border-[#FFD34D] shadow-[0_8px_0_#000,0_0_40px_rgba(255,211,77,0.3)] p-6 sm:p-10 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Pixel Frame Avatar */}
            <div className="lg:col-span-4 flex flex-col items-center text-center">
              <div className="w-36 h-36 bg-[#10071C] border-4 border-[#FFD34D] shadow-[0_0_25px_#FFD34D] flex items-center justify-center text-6xl mb-4 relative">
                {getAvatarIcon(featuredSpeaker.avatarStyle)}
                <span className="absolute -bottom-2 px-2 py-0.5 bg-[#FFD34D] text-black font-pixel-arcade text-[9px] font-bold">
                  KEYNOTE SPEAKER
                </span>
              </div>

              <h3 className="font-pixel-title text-xl text-white font-bold mt-1 drop-shadow-[0_2px_4px_#000]">
                {featuredSpeaker.name}
              </h3>
              <p className="text-xs text-[#4FD9FF] font-sans mt-0.5 font-medium">
                {featuredSpeaker.role}
              </p>
              <p className="text-xs text-[#D8D8EE] font-sans">
                {featuredSpeaker.organization}
              </p>

              <div className="mt-4">
                <span className="px-3 py-1 bg-[#1A1426] border border-[#3A3250] text-[#55FF55] font-pixel-arcade text-[10px] font-bold">
                  ★ INAUGURAL KEYNOTE
                </span>
              </div>
            </div>

            {/* Right: Keynote Abstract & Meta */}
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center gap-2">
                <span className="font-pixel-arcade text-[10px] text-[#55FF55] bg-[#55FF55]/10 px-2 py-0.5 border border-[#55FF55]/30 font-bold">
                  GRAND INAUGURAL KEYNOTE
                </span>
                <span className="font-pixel-arcade text-[10px] text-[#4FD9FF] font-bold">
                  DAY {featuredSpeaker.day} · {featuredSpeaker.time}
                </span>
              </div>

              <h2 className="font-pixel-heading text-xl sm:text-2xl font-bold text-white leading-snug">
                &quot;{featuredSpeaker.keynoteTopic}&quot;
              </h2>

              <p className="text-xs sm:text-sm text-[#E0E0EE] font-sans leading-relaxed">
                {featuredSpeaker.sessionAbstract}
              </p>

              <div className="p-4 bg-[#10071C] border border-[#2E1644] text-xs font-sans text-[#D8D8EE] space-y-1">
                <div className="font-semibold text-white">SPEAKER BIO:</div>
                <p>{featuredSpeaker.bio}</p>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {featuredSpeaker.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[9px] font-pixel-arcade text-[#FFD34D] bg-[#FFD34D]/10 px-2 py-1 border border-[#FFD34D]/30 font-bold"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OTHER SPEAKERS & MENTORS GRID */}
      <section className="px-4 sm:px-6 max-w-7xl mx-auto mb-20">
        <div className="text-center mb-10">
          <span className="font-pixel-arcade text-xs text-[#4FD9FF] uppercase font-bold">
            PARALLEL SESSIONS & PANELS
          </span>
          <h2 className="font-pixel-title text-2xl sm:text-3xl text-white font-bold mt-1 drop-shadow-[0_2px_4px_#000]">
            DISTINGUISHED SPEAKER ROSTER
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {otherSpeakers.map((speaker) => (
            <div
              key={speaker.id}
              className="inventory-slot-card p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-16 h-16 bg-[#10071C] border-2 border-[#4FD9FF] flex items-center justify-center text-3xl flex-shrink-0">
                    {getAvatarIcon(speaker.avatarStyle)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-pixel-arcade text-[9px] text-[#FFD34D] bg-[#FFD34D]/10 px-1.5 py-0.5 border border-[#FFD34D]/30 font-bold">
                        {speaker.badgeLevel}
                      </span>
                    </div>
                    <h3 className="font-pixel-heading text-lg font-bold text-white mt-1">
                      {speaker.name}
                    </h3>
                    <p className="text-xs text-[#4FD9FF] font-sans font-medium">
                      {speaker.role}
                    </p>
                    <p className="text-xs text-[#D8D8EE] font-sans">
                      {speaker.organization}
                    </p>
                  </div>
                </div>

                {/* Session Box */}
                <div className="p-3.5 bg-[#120D1F] border border-[#2B203C] mb-4 space-y-1.5">
                  <div className="flex items-center justify-between text-[10px] font-pixel-arcade text-[#55FF55] font-bold">
                    <span>SESSION TALK</span>
                    <span>DAY {speaker.day} · {speaker.time}</span>
                  </div>
                  <h4 className="font-pixel-heading text-sm font-bold text-white">
                    &quot;{speaker.keynoteTopic}&quot;
                  </h4>
                  <p className="text-xs text-[#D8D8EE] font-sans leading-relaxed">
                    {speaker.sessionAbstract}
                  </p>
                </div>

                <p className="text-xs text-[#D8D8EE] font-sans leading-relaxed mb-4">
                  {speaker.bio}
                </p>
              </div>

              {/* Footer */}
              <div className="pt-3 border-t border-[#2A2438] flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-sans text-[#D8D8EE]">
                  <MapPin className="w-3.5 h-3.5 text-[#FFD34D]" />
                  <span>{speaker.venue}</span>
                </div>

                <span className="font-pixel-arcade text-[9px] text-[#4FD9FF] bg-[#4FD9FF]/10 px-2 py-0.5 border border-[#4FD9FF]/30 font-bold">
                  DISTINGUISHED SPEAKER
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
