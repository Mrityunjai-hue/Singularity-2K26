"use client";

import React, { useState } from "react";
import { FEST_EVENTS, EventItem } from "@/data/events";
import { useAchievement } from "@/components/ui/AchievementSystem";
import { soundFx } from "@/lib/soundFx";
import { spawnBlockBreakParticles } from "@/lib/particles";
import { VoxelFooter } from "@/components/ui/VoxelFooter";
import {
  Search,
  Filter,
  Sparkles,
  Cloud,
  Bot,
  Brain,
  ShieldAlert,
  Gamepad2,
  Bookmark,
  CheckCircle,
  X,
  ExternalLink,
  MapPin,
  Clock,
  Users,
  Trophy,
} from "lucide-react";
import Link from "next/link";

export default function EventsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeModalEvent, setActiveModalEvent] = useState<EventItem | null>(null);

  const { hotbarItems, addToHotbar, gainXp } = useAchievement();

  const getEventIcon = (name: string) => {
    switch (name) {
      case "cloud":
        return <Cloud className="w-8 h-8 text-[#4FD9FF]" />;
      case "workflow":
        return <Bot className="w-8 h-8 text-[#55FF55]" />;
      case "brain":
        return <Brain className="w-8 h-8 text-[#FFD34D]" />;
      case "shield-alert":
        return <ShieldAlert className="w-8 h-8 text-[#E14E3D]" />;
      case "gamepad-2":
        return <Gamepad2 className="w-8 h-8 text-[#4FD9FF]" />;
      default:
        return <Sparkles className="w-8 h-8 text-[#FFD34D]" />;
    }
  };

  const categories = [
    { id: "all", label: "All Sessions" },
    { id: "workshop", label: "Workshops" },
    { id: "competition", label: "Hands-on Lectures" },
    { id: "technical", label: "Technical" },
    { id: "cultural", label: "Cultural" },
  ];

  const difficulties = ["all", "Novice", "Adept", "Boss Level"];

  const filteredEvents = FEST_EVENTS.filter((e) => {
    const matchCat = selectedCategory === "all" || e.category === selectedCategory;
    const matchDiff = selectedDifficulty === "all" || e.badgeLevel === selectedDifficulty;
    const matchSearch =
      searchQuery.trim() === "" ||
      e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.venue.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchDiff && matchSearch;
  });

  const handleBookmark = (eventId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    spawnBlockBreakParticles(e.clientX, e.clientY, 10);
    const added = addToHotbar(eventId);
    if (added) {
      gainXp(30);
    }
  };

  const handleOpenModal = (event: EventItem, e: React.MouseEvent) => {
    soundFx.playChestOpen();
    spawnBlockBreakParticles(e.clientX, e.clientY, 10);
    setActiveModalEvent(event);
  };

  return (
    <main className="min-h-screen pt-8 relative bg-[#07010C]">
      {/* Background Image: 4K Ultra-Vivid Overworld Sunrise */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat opacity-80 brightness-110 pointer-events-none"
        style={{
          backgroundImage: "url('/images/bg_overworld_sunrise_4k.jpg')",
        }}
      />
      <div className="fixed inset-0 bg-gradient-to-b from-[#07010C]/60 via-transparent to-[#07010C] pointer-events-none" />

      {/* Header Banner */}
      <section className="relative z-10 px-4 sm:px-6 max-w-7xl mx-auto text-center mb-10">
        <span className="font-pixel-arcade text-xs text-[#4FD9FF] bg-[#4FD9FF]/10 px-3 py-1 border border-[#4FD9FF]/30 uppercase">
          QUEST SELECTION MATRIX
        </span>
        <h1 className="font-pixel-title text-3xl sm:text-5xl text-white mt-3 uppercase drop-shadow-[0_4px_0_#000]">
          CHOOSE YOUR QUEST
        </h1>
        <p className="text-xs sm:text-sm text-[#F0F0F8] font-sans max-w-2xl mx-auto mt-2 leading-relaxed drop-shadow-[0_2px_4px_#000]">
          Select from hands-on cloud masterclasses, high-stakes mathematical olympiads, cybersecurity battles, and cultural finales. Click to inspect quest scrolls or bookmark them to your bottom hotbar!
        </p>
      </section>

      {/* Filter & Search Bar */}
      <section className="px-4 sm:px-6 max-w-7xl mx-auto mb-8">
        <div className="bg-[#181424] border-4 border-[#3A3250] shadow-[0_6px_0_#0A0A0D] p-4 sm:p-6 space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <input
                type="text"
                placeholder="Search quest name, venue, or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#100D1A] border-2 border-[#2A2438] focus:border-[#4FD9FF] px-3.5 py-2.5 pl-9 text-xs text-white placeholder-[#707085] font-sans outline-none"
              />
              <Search className="w-4 h-4 text-[#707085] absolute left-3 top-3" />
            </div>

            {/* Difficulty Filter */}
            <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
              <span className="font-pixel-arcade text-[10px] text-[#A0A0B0] flex-shrink-0">
                LEVEL:
              </span>
              {difficulties.map((diff) => (
                <button
                  key={diff}
                  onClick={() => {
                    setSelectedDifficulty(diff);
                    soundFx.playClick();
                  }}
                  className={`px-2.5 py-1 text-[10px] font-pixel-arcade border transition-all ${
                    selectedDifficulty === diff
                      ? "bg-[#FFD34D] text-black border-[#FFD34D] font-bold"
                      : "bg-[#100D1A] text-[#A0A0B0] border-[#2A2438] hover:text-white"
                  }`}
                >
                  {diff === "all" ? "ALL" : diff.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pt-2 border-t border-[#2A2438]">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  soundFx.playClick();
                }}
                className={`px-4 py-2 font-pixel-arcade text-xs uppercase border-2 transition-all flex-shrink-0 ${
                  selectedCategory === cat.id
                    ? "bg-[#4FD9FF]/20 text-[#4FD9FF] border-[#4FD9FF] shadow-[0_0_12px_rgba(79,217,255,0.3)]"
                    : "bg-[#100D1A] text-[#D0D0E0] border-[#2A2438] hover:border-[#5D9C43]"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="px-4 sm:px-6 max-w-7xl mx-auto mb-16">
        <div className="flex items-center justify-between mb-4">
          <span className="font-pixel-arcade text-xs text-[#A0A0B0]">
            SHOWING {filteredEvents.length} AVAILABLE QUESTS
          </span>
          <span className="text-xs text-[#55FF55] font-pixel-sub">
            ⚡ CLICK CARD TO VIEW SCROLL
          </span>
        </div>

        {filteredEvents.length === 0 ? (
          <div className="bg-[#181424] border-4 border-[#3A3250] p-12 text-center">
            <p className="font-pixel-title text-sm text-[#A0A0B0]">NO QUESTS FOUND MATCHING FILTERS</p>
            <p className="text-xs text-[#707085] mt-2 font-sans">Try clearing your search query or adjusting difficulty level.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => {
              const isBookmarked = hotbarItems.includes(event.id);

              return (
                <div
                  key={event.id}
                  onClick={(e) => handleOpenModal(event, e)}
                  className="inventory-slot-card p-5 flex flex-col justify-between cursor-pointer group"
                >
                  <div>
                    {/* Header bar */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="font-pixel-arcade text-[10px] text-[#4FD9FF] bg-[#4FD9FF]/10 px-1.5 py-0.5 border border-[#4FD9FF]/30">
                          DAY {event.day}
                        </span>
                        <span
                          className="font-pixel-arcade text-[9px] px-1.5 py-0.5 border"
                          style={{
                            color: event.difficultyColor,
                            borderColor: `${event.difficultyColor}40`,
                            backgroundColor: `${event.difficultyColor}15`,
                          }}
                        >
                          {event.badgeLevel}
                        </span>
                      </div>

                      {/* Bookmark Hotbar Button */}
                      <button
                        onClick={(e) => handleBookmark(event.id, e)}
                        title={isBookmarked ? "In Hotbar Inventory" : "Equip to Hotbar"}
                        className={`p-1.5 border transition-all ${
                          isBookmarked
                            ? "bg-[#55FF55]/20 text-[#55FF55] border-[#55FF55]"
                            : "bg-[#100D1A] text-[#A0A0B0] border-[#2A2438] hover:text-[#FFD34D] hover:border-[#FFD34D]"
                        }`}
                      >
                        <Bookmark className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Icon + Title */}
                    <div className="flex items-start gap-3 mb-3">
                      <div className="item-slot-frame flex-shrink-0 group-hover:border-[#4FD9FF]">
                        {getEventIcon(event.iconName)}
                      </div>
                      <div>
                        <span className="text-[10px] font-pixel-sub text-[#A0A0B0] uppercase">
                          {event.categoryLabel}
                        </span>
                        <h3 className="font-pixel-heading text-base font-bold text-white group-hover:text-[#4FD9FF] transition-colors line-clamp-2">
                          {event.title}
                        </h3>
                      </div>
                    </div>

                    {/* Short Desc */}
                    <p className="text-xs text-[#A0A0B0] font-sans leading-relaxed mb-4 line-clamp-2">
                      {event.shortDesc}
                    </p>
                  </div>

                  {/* Footer Meta */}
                  <div className="pt-3 border-t border-[#2A2438] space-y-2">
                    <div className="flex items-center justify-between text-xs font-sans text-[#D0D0E0]">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-[#FFD34D]" />
                        {event.time}
                      </span>
                      {event.prizePoolLabel && (
                        <span className="font-pixel-arcade text-[10px] text-[#55FF55]">
                          🏆 {event.prizePoolLabel}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between text-xs font-sans text-[#707085] pt-1">
                      <span className="truncate max-w-[200px]">📍 {event.venue}</span>
                      <span className="font-pixel-arcade text-[10px] text-[#4FD9FF] group-hover:translate-x-1 transition-transform">
                        SCROLL →
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Quest Details Modal */}
      {activeModalEvent && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#181424] border-4 border-[#4FD9FF] shadow-[0_10px_0_#000,0_0_50px_rgba(79,217,255,0.35)] max-w-2xl w-full max-h-[90vh] flex flex-col">
            {/* Header */}
            <div className="p-4 sm:p-6 border-b-4 border-[#3A3250] bg-[#120E1C] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#100D1A] border-2 border-[#4FD9FF] flex items-center justify-center flex-shrink-0">
                  {getEventIcon(activeModalEvent.iconName)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-pixel-arcade text-[10px] text-[#4FD9FF]">
                      DAY {activeModalEvent.day} · {activeModalEvent.time}
                    </span>
                    <span
                      className="font-pixel-arcade text-[9px] px-1 border"
                      style={{
                        color: activeModalEvent.difficultyColor,
                        borderColor: `${activeModalEvent.difficultyColor}40`,
                      }}
                    >
                      {activeModalEvent.badgeLevel}
                    </span>
                  </div>
                  <h3 className="font-pixel-title text-base sm:text-lg text-white mt-0.5">
                    {activeModalEvent.title}
                  </h3>
                </div>
              </div>

              <button
                onClick={() => {
                  setActiveModalEvent(null);
                  soundFx.playClick();
                }}
                className="w-8 h-8 bg-[#2A2A38] hover:bg-[#E14E3D] border border-black text-white flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scroll Content */}
            <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4 font-sans text-xs sm:text-sm">
              <div className="p-3 bg-[#100D1A] border border-[#2A2438]">
                <p className="font-pixel-sub text-[10px] text-[#FFD34D] uppercase mb-1">
                  QUEST OVERVIEW:
                </p>
                <p className="text-[#E0E0EE] leading-relaxed">
                  {activeModalEvent.fullDesc}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-[#100D1A] border border-[#2A2438]">
                  <span className="font-pixel-arcade text-[10px] text-[#A0A0B0] block">VENUE:</span>
                  <span className="text-white font-medium">{activeModalEvent.venue}</span>
                </div>
                <div className="p-3 bg-[#100D1A] border border-[#2A2438]">
                  <span className="font-pixel-arcade text-[10px] text-[#A0A0B0] block">TEAM FORMAT:</span>
                  <span className="text-white font-medium">{activeModalEvent.teamSize}</span>
                </div>
              </div>

              {activeModalEvent.prizePoolLabel && (
                <div className="p-3 bg-[#100D1A] border-2 border-[#55FF55]/40 flex items-center justify-between">
                  <div>
                    <span className="font-pixel-arcade text-[10px] text-[#55FF55]">PRIZE BOUNTY:</span>
                    <div className="font-pixel-title text-base text-[#55FF55]">{activeModalEvent.prizePoolLabel}</div>
                  </div>
                  <Trophy className="w-8 h-8 text-[#FFD34D]" />
                </div>
              )}

              {/* Prerequisites */}
              <div>
                <h4 className="font-pixel-sub text-xs text-[#4FD9FF] uppercase mb-1.5">
                  PREREQUISITES & INVENTORY NEEDED:
                </h4>
                <ul className="space-y-1 list-disc list-inside text-[#D0D0E0]">
                  {activeModalEvent.prerequisites.map((p, idx) => (
                    <li key={idx}>{p}</li>
                  ))}
                </ul>
              </div>

              {/* Rules */}
              <div>
                <h4 className="font-pixel-sub text-xs text-[#FFD34D] uppercase mb-1.5">
                  ARENA RULES & PROTOCOLS:
                </h4>
                <ul className="space-y-1 list-disc list-inside text-[#D0D0E0]">
                  {activeModalEvent.rules.map((r, idx) => (
                    <li key={idx}>{r}</li>
                  ))}
                </ul>
              </div>

              {/* Coordinators */}
              <div className="pt-2 border-t border-[#2A2438]">
                <span className="font-pixel-arcade text-[10px] text-[#A0A0B0] block mb-1">
                  QUEST COORDINATORS:
                </span>
                <div className="flex flex-wrap gap-2 text-xs text-[#D0D0E0]">
                  {activeModalEvent.coordinators.map((c, idx) => (
                    <div key={idx} className="bg-[#120E1C] px-2.5 py-1 border border-[#2A2438] text-white">
                      {c.label}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="p-4 border-t-4 border-[#3A3250] bg-[#120E1C] flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                onClick={(e) => {
                  handleBookmark(activeModalEvent.id, e);
                }}
                className={`btn-voxel text-xs w-full sm:w-auto ${
                  hotbarItems.includes(activeModalEvent.id)
                    ? "btn-voxel-stone"
                    : "btn-voxel-gold"
                }`}
              >
                {hotbarItems.includes(activeModalEvent.id)
                  ? "✓ SAVED IN HOTBAR"
                  : "🎒 BOOKMARK TO HOTBAR"}
              </button>

              <Link
                href="/register"
                onClick={() => {
                  setActiveModalEvent(null);
                  soundFx.playClick();
                }}
                className="btn-voxel btn-voxel-diamond text-xs w-full sm:w-auto"
              >
                REGISTER FOR THIS QUEST →
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Global Footer */}
      <VoxelFooter />
    </main>
  );
}
