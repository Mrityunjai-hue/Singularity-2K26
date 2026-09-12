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
  Swords,
  Bookmark,
  CheckCircle,
  X,
  ExternalLink,
  MapPin,
  Clock,
  Users,
  Trophy,
  Flame,
  Code2,
  Music,
  ArrowRight,
  Zap,
  Crown,
  Calendar,
} from "lucide-react";
import Link from "next/link";

export default function EventsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeModalEvent, setActiveModalEvent] = useState<EventItem | null>(null);

  const { hotbarItems, addToHotbar, removeFromHotbar, gainXp } = useAchievement();

  const getEventIcon = (name: string, size = "w-7 h-7") => {
    switch (name) {
      case "cloud":
        return <Cloud className={`${size} text-[#4FD9FF]`} />;
      case "workflow":
        return <Bot className={`${size} text-[#55FF55]`} />;
      case "brain":
        return <Brain className={`${size} text-[#FFD34D]`} />;
      case "shield-alert":
        return <ShieldAlert className={`${size} text-[#E14E3D]`} />;
      case "swords":
        return <Swords className={`${size} text-[#4FD9FF]`} />;
      case "gamepad-2":
        return <Gamepad2 className={`${size} text-[#4FD9FF]`} />;
      default:
        return <Sparkles className={`${size} text-[#FFD34D]`} />;
    }
  };

  const categories = [
    { id: "all", label: "ALL SESSIONS", icon: Sparkles, color: "#4FD9FF" },
    { id: "workshop", label: "WORKSHOPS", icon: Bot, color: "#55FF55" },
    { id: "competition", label: "HANDS-ON LECTURES", icon: Brain, color: "#FFD34D" },
    { id: "technical", label: "TECHNICAL", icon: Code2, color: "#4FD9FF" },
    { id: "cultural", label: "CULTURAL / EDM", icon: Music, color: "#FF55FF" },
  ];

  const difficulties = [
    { id: "all", label: "ALL", color: "#FFFFFF" },
    { id: "Novice", label: "NOVICE", color: "#55FF55", icon: "🌱" },
    { id: "Adept", label: "ADEPT", color: "#4FD9FF", icon: "⚡" },
    { id: "Boss Level", label: "BOSS LEVEL", color: "#E14E3D", icon: "👑" },
  ];

  const filteredEvents = FEST_EVENTS.filter((e) => {
    const matchCat = selectedCategory === "all" || e.category === selectedCategory;
    const matchDiff = selectedDifficulty === "all" || e.badgeLevel === selectedDifficulty;
    const matchSearch =
      searchQuery.trim() === "" ||
      e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.venue.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchDiff && matchSearch;
  });

  const handleBookmarkToggle = (eventId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    spawnBlockBreakParticles(e.clientX, e.clientY, 12);
    if (hotbarItems.includes(eventId)) {
      removeFromHotbar(eventId);
      soundFx.playClick();
    } else {
      const added = addToHotbar(eventId);
      if (added) {
        soundFx.playLevelUp();
        gainXp(30);
      }
    }
  };

  const handleOpenModal = (event: EventItem, e: React.MouseEvent) => {
    soundFx.playChestOpen();
    spawnBlockBreakParticles(e.clientX, e.clientY, 12);
    setActiveModalEvent(event);
  };

  const clearFilters = () => {
    soundFx.playClick();
    setSelectedCategory("all");
    setSelectedDifficulty("all");
    setSearchQuery("");
  };

  return (
    <main className="min-h-screen pt-8 relative bg-[#06010A] text-white">
      {/* Background Image: 4K Overworld Sunrise with High Contrast Backdrop */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat opacity-45 brightness-95 pointer-events-none"
        style={{
          backgroundImage: "url('/images/bg_overworld_sunrise_4k.jpg')",
        }}
      />
      {/* Deep Contrast Vignette & Dark Backplate for 100% Readable Text */}
      <div className="fixed inset-0 bg-gradient-to-b from-[#06010A]/95 via-[#0A0214]/90 to-[#06010A] pointer-events-none" />

      {/* 1. Header Banner */}
      <section className="relative z-10 px-4 sm:px-6 max-w-7xl mx-auto text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#140822] border-2 border-[#4FD9FF] shadow-[0_0_25px_rgba(79,217,255,0.35)] mb-3">
          <Zap className="w-4 h-4 text-[#4FD9FF] animate-pulse" />
          <span className="font-pixel-arcade text-xs text-[#4FD9FF] uppercase tracking-widest font-bold">
            QUEST SELECTION MATRIX
          </span>
        </div>

        <h1 className="font-pixel-title text-3xl sm:text-5xl md:text-6xl text-white mt-2 uppercase tracking-wide drop-shadow-[0_6px_0_#000] [text-shadow:0_0_35px_rgba(79,217,255,0.5)]">
          CHOOSE YOUR QUEST
        </h1>

        <p className="text-sm sm:text-base text-[#E0E2F5] font-sans max-w-3xl mx-auto mt-3 leading-relaxed font-normal drop-shadow-[0_2px_8px_#000]">
          Select from hands-on cloud masterclasses, high-stakes mathematical olympiads, cybersecurity battles, and cultural finales.
          Inspect quest scrolls to view full prerequisites and equip sessions directly to your hotbar inventory.
        </p>
      </section>

      {/* 2. Quest Control Terminal HUD (Search & Filters) — High Contrast & Clean */}
      <section className="relative z-10 px-4 sm:px-6 max-w-7xl mx-auto mb-10">
        <div className="bg-[#120524]/95 backdrop-blur-2xl border-3 border-[#4A2470] shadow-[0_12px_40px_rgba(0,0,0,0.9),0_0_30px_rgba(79,217,255,0.15)] p-5 sm:p-7 space-y-5">
          
          {/* Top Row: Search + Difficulty Controls */}
          <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
            {/* Search Input Bar */}
            <div className="relative flex-1 max-w-xl">
              <input
                type="text"
                placeholder="Search quest name, venue, lead, or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#0A0214] border-2 border-[#4A2470] focus:border-[#4FD9FF] px-4 py-3 pl-11 text-sm text-white placeholder-[#8E90A6] font-sans outline-none transition-all shadow-[inset_0_2px_6px_rgba(0,0,0,0.8)] focus:shadow-[0_0_20px_rgba(79,217,255,0.3)]"
              />
              <Search className="w-5 h-5 text-[#4FD9FF] absolute left-3.5 top-3.5" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-3 text-[#A0A0B8] hover:text-white p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Difficulty Level Badges */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
              <span className="font-pixel-arcade text-[11px] text-[#FFD34D] flex items-center gap-1.5 flex-shrink-0 font-bold mr-1">
                <Filter className="w-3.5 h-3.5 text-[#FFD34D]" />
                LEVEL:
              </span>
              {difficulties.map((diff) => {
                const isSelected = selectedDifficulty === diff.id;
                return (
                  <button
                    key={diff.id}
                    onClick={() => {
                      setSelectedDifficulty(diff.id);
                      soundFx.playClick();
                    }}
                    className={`px-3 py-2 text-xs font-pixel-arcade border-2 transition-all flex items-center gap-1.5 flex-shrink-0 select-none ${
                      isSelected
                        ? "bg-[#250E3A] border-white text-white font-bold shadow-[0_0_16px_rgba(255,255,255,0.4)] translate-y-[-1px]"
                        : "bg-[#090214] border-[#3A1E54] text-[#C0C0D8] hover:border-[#4FD9FF] hover:text-white"
                    }`}
                    style={{
                      borderColor: isSelected ? diff.color : undefined,
                    }}
                  >
                    {diff.icon && <span>{diff.icon}</span>}
                    <span style={{ color: isSelected ? diff.color : undefined }}>
                      {diff.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bottom Row: Category Filter Tabs */}
          <div className="pt-4 border-t-2 border-[#3A1E54] flex items-center gap-2.5 overflow-x-auto scrollbar-none">
            {categories.map((cat) => {
              const IconComp = cat.icon;
              const isSelected = selectedCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    soundFx.playClick();
                  }}
                  className={`px-4 py-2.5 font-pixel-arcade text-xs uppercase border-2 transition-all flex items-center gap-2 flex-shrink-0 select-none ${
                    isSelected
                      ? "bg-[#250E3A] text-white border-white shadow-[0_0_20px_rgba(79,217,255,0.4)] translate-y-[-2px] font-bold"
                      : "bg-[#0A0214] text-[#D0D2E8] border-[#3A1E54] hover:border-[#4FD9FF] hover:text-white"
                  }`}
                  style={{
                    borderColor: isSelected ? cat.color : undefined,
                  }}
                >
                  <IconComp className="w-4 h-4 flex-shrink-0" style={{ color: cat.color }} />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Quest Grid Status Header */}
      <section className="relative z-10 px-4 sm:px-6 max-w-7xl mx-auto mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-[#11051F]/90 border-2 border-[#3A1E54] px-5 py-3 shadow-[0_4px_16px_rgba(0,0,0,0.6)]">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#55FF55] animate-ping" />
            <span className="font-pixel-arcade text-xs text-[#55FF55] font-bold tracking-wide">
              {filteredEvents.length} QUEST{filteredEvents.length !== 1 ? "S" : ""} DISCOVERED
            </span>
            {(selectedCategory !== "all" || selectedDifficulty !== "all" || searchQuery) && (
              <button
                onClick={clearFilters}
                className="text-[10px] font-pixel-arcade text-[#FFD34D] hover:underline ml-2 bg-[#FFD34D]/10 px-2 py-0.5 border border-[#FFD34D]/30"
              >
                RESET FILTERS ×
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 text-xs font-pixel-sub text-[#4FD9FF]">
            <Sparkles className="w-3.5 h-3.5 text-[#4FD9FF]" />
            <span>CLICK CARD TO INSPECT QUEST SCROLL</span>
          </div>
        </div>
      </section>

      {/* 4. Spacious & Enhanced Quest Cards Grid */}
      <section className="relative z-10 px-4 sm:px-6 max-w-7xl mx-auto mb-24">
        {filteredEvents.length === 0 ? (
          <div className="bg-[#120524]/95 border-3 border-[#4A2470] p-12 text-center shadow-[0_12px_40px_rgba(0,0,0,0.9)] max-w-2xl mx-auto">
            <div className="w-16 h-16 bg-[#1D0936] border-2 border-[#FFD34D] mx-auto flex items-center justify-center mb-4 text-2xl">
              🗺️
            </div>
            <h3 className="font-pixel-title text-lg text-[#FFD34D] uppercase">
              NO QUESTS FOUND MATCHING CRITERIA
            </h3>
            <p className="text-sm text-[#C0C2D8] mt-2 font-sans">
              Try modifying your search keywords or switching category/difficulty filters.
            </p>
            <button
              onClick={clearFilters}
              className="btn-voxel btn-voxel-gold text-xs mt-6 px-6 py-3"
            >
              CLEAR ALL FILTERS
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {filteredEvents.map((event) => {
              const isBookmarked = hotbarItems.includes(event.id);
              const difficultyTheme =
                event.badgeLevel === "Boss Level"
                  ? { border: "#E14E3D", glow: "rgba(225,78,61,0.35)", icon: "👑", text: "#FF7B6E" }
                  : event.badgeLevel === "Adept"
                  ? { border: "#4FD9FF", glow: "rgba(79,217,255,0.35)", icon: "⚡", text: "#7BE4FF" }
                  : { border: "#55FF55", glow: "rgba(85,255,85,0.35)", icon: "🌱", text: "#82FF82" };

              return (
                <div
                  key={event.id}
                  onClick={(e) => handleOpenModal(event, e)}
                  className="bg-[#120524]/95 backdrop-blur-2xl border-3 border-[#4A2470] hover:border-[#4FD9FF] transition-all duration-200 p-6 sm:p-7 flex flex-col justify-between cursor-pointer group shadow-[0_12px_35px_rgba(0,0,0,0.9),0_0_20px_rgba(79,217,255,0.12)] hover:shadow-[0_16px_45px_rgba(0,0,0,0.95),0_0_30px_rgba(79,217,255,0.3)] hover:translate-y-[-4px] relative overflow-hidden"
                >
                  {/* Top colored accent indicator bar */}
                  <div
                    className="absolute top-0 left-0 right-0 h-1.5 shadow-[0_0_15px_currentColor]"
                    style={{
                      backgroundColor: difficultyTheme.border,
                      color: difficultyTheme.border,
                    }}
                  />

                  {/* Card Content Top Zone */}
                  <div>
                    {/* Top Status Badges Ribbon */}
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <div className="flex items-center gap-2 flex-wrap">
                        {/* Day Tag */}
                        <span className="font-pixel-arcade text-[11px] text-white bg-[#0A0214] px-2.5 py-1 border-2 border-[#4A2470] font-bold shadow-sm">
                          DAY 0{event.day}
                        </span>

                        {/* Difficulty Badge */}
                        <span
                          className="font-pixel-arcade text-[10px] px-2.5 py-1 border-2 font-bold flex items-center gap-1 shadow-sm uppercase"
                          style={{
                            color: difficultyTheme.text,
                            borderColor: difficultyTheme.border,
                            backgroundColor: `${difficultyTheme.border}20`,
                          }}
                        >
                          <span>{difficultyTheme.icon}</span>
                          <span>{event.badgeLevel}</span>
                        </span>

                        {/* HOT Badge if applicable */}
                        {event.isHot && (
                          <span className="font-pixel-arcade text-[9px] text-[#FFD34D] bg-[#FFD34D]/15 border border-[#FFD34D]/50 px-1.5 py-0.5 flex items-center gap-1 animate-pulse">
                            <Flame className="w-2.5 h-2.5 text-[#FFD34D]" />
                            HOT
                          </span>
                        )}
                      </div>

                      {/* 3D Hotbar Equip / Bookmark Button */}
                      <button
                        onClick={(e) => handleBookmarkToggle(event.id, e)}
                        title={isBookmarked ? "Remove from Hotbar" : "Equip to Bottom Hotbar Inventory"}
                        className={`p-2 border-2 transition-all flex items-center justify-center flex-shrink-0 select-none shadow-sm ${
                          isBookmarked
                            ? "bg-[#55FF55]/25 text-[#55FF55] border-[#55FF55] shadow-[0_0_12px_rgba(85,255,85,0.4)]"
                            : "bg-[#090214] text-[#A0A0B8] border-[#3A1E54] hover:text-[#FFD34D] hover:border-[#FFD34D] hover:bg-[#1A0830]"
                        }`}
                      >
                        <Bookmark
                          className={`w-4 h-4 ${isBookmarked ? "fill-[#55FF55]" : ""}`}
                        />
                      </button>
                    </div>

                    {/* Quest Identity (Voxel Icon Box + Category + Title) */}
                    <div className="flex items-start gap-4 mb-4">
                      {/* Voxel Item Chamber Frame */}
                      <div
                        className="w-14 h-14 bg-[#0A0214] border-2 border-[#4A2470] group-hover:border-[#4FD9FF] flex items-center justify-center flex-shrink-0 shadow-[0_4px_16px_rgba(0,0,0,0.8)] relative transition-all group-hover:scale-105"
                        style={{
                          boxShadow: `0 0 15px ${difficultyTheme.glow}`,
                        }}
                      >
                        {getEventIcon(event.iconName, "w-8 h-8")}
                      </div>

                      {/* Category & Title */}
                      <div className="flex-1 min-w-0">
                        <span className="text-[11px] font-pixel-arcade text-[#FFD34D] uppercase font-bold tracking-wider block mb-1">
                          {event.categoryLabel}
                        </span>
                        <h3 className="font-pixel-heading text-lg sm:text-xl font-bold text-white group-hover:text-[#4FD9FF] transition-colors leading-snug">
                          {event.title}
                        </h3>
                      </div>
                    </div>

                    {/* Briefing / Short Description (Spacious & highly readable) */}
                    <p className="text-sm text-[#D8DAEC] font-sans leading-relaxed mb-5 font-normal">
                      {event.shortDesc}
                    </p>

                    {/* Metadata Chips: Time, Venue, Team Format */}
                    <div className="space-y-2 mb-5">
                      <div className="flex items-center gap-2 text-xs font-sans text-[#F0F2FF] bg-[#0A0214] px-3 py-1.5 border border-[#3A1E54]">
                        <Clock className="w-3.5 h-3.5 text-[#FFD34D] flex-shrink-0" />
                        <span className="font-medium">{event.time}</span>
                      </div>

                      <div className="flex items-center gap-2 text-xs font-sans text-[#F0F2FF] bg-[#0A0214] px-3 py-1.5 border border-[#3A1E54]">
                        <MapPin className="w-3.5 h-3.5 text-[#4FD9FF] flex-shrink-0" />
                        <span className="font-medium leading-tight">{event.venue}</span>
                      </div>

                      <div className="flex items-center gap-2 text-xs font-sans text-[#C0C2D8] bg-[#0A0214]/60 px-3 py-1 border border-[#2D1642]">
                        <Users className="w-3.5 h-3.5 text-[#55FF55] flex-shrink-0" />
                        <span>Format: <strong className="text-white">{event.teamSize}</strong></span>
                      </div>
                    </div>
                  </div>

                  {/* Card Bottom: Bounty Ribbon & Action Trigger */}
                  <div className="pt-4 border-t-2 border-[#3A1E54] space-y-3">
                    {/* Prize Bounty Highlight if available */}
                    {event.prizePoolLabel && (
                      <div className="flex items-center justify-between bg-[#152410] border-2 border-[#55FF55]/60 px-3 py-1.5 text-xs font-pixel-arcade text-[#55FF55] shadow-[0_0_12px_rgba(85,255,85,0.2)]">
                        <span className="flex items-center gap-1.5 font-bold">
                          <Trophy className="w-3.5 h-3.5 text-[#FFD34D]" />
                          BOUNTY:
                        </span>
                        <span className="font-bold text-white text-[11px] truncate">
                          {event.prizePoolLabel}
                        </span>
                      </div>
                    )}

                    {/* Inspect Scroll Action Footer */}
                    <div className="flex items-center justify-between pt-1">
                      <span className="text-[11px] font-pixel-arcade text-[#A0A0B8]">
                        {isBookmarked ? (
                          <span className="text-[#55FF55] font-bold">✓ IN HOTBAR</span>
                        ) : (
                          "CLICK TO INSPECT"
                        )}
                      </span>

                      <div className="inline-flex items-center gap-1.5 font-pixel-arcade text-xs text-[#4FD9FF] group-hover:text-white group-hover:translate-x-1.5 transition-all font-bold">
                        <span>VIEW SCROLL</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* 5. Deluxe Quest Scroll Modal (Parchment / Cyber Terminal) */}
      {activeModalEvent && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-5">
          <div className="bg-[#120524] border-4 border-[#4FD9FF] shadow-[0_16px_60px_rgba(0,0,0,0.95),0_0_60px_rgba(79,217,255,0.4)] max-w-2xl w-full max-h-[92vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            
            {/* Modal Header */}
            <div className="p-4 sm:p-6 border-b-4 border-[#3A1E54] bg-[#0A0214] flex items-center justify-between">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#140822] border-2 border-[#4FD9FF] flex items-center justify-center flex-shrink-0 shadow-[0_0_20px_rgba(79,217,255,0.4)]">
                  {getEventIcon(activeModalEvent.iconName, "w-7 h-7 sm:w-8 sm:h-8")}
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-pixel-arcade text-[10px] sm:text-xs text-[#4FD9FF] font-bold">
                      DAY 0{activeModalEvent.day} · {activeModalEvent.time}
                    </span>
                    <span
                      className="font-pixel-arcade text-[9px] sm:text-[10px] px-2 py-0.5 border font-bold"
                      style={{
                        color: activeModalEvent.difficultyColor,
                        borderColor: activeModalEvent.difficultyColor,
                        backgroundColor: `${activeModalEvent.difficultyColor}15`,
                      }}
                    >
                      {activeModalEvent.badgeLevel}
                    </span>
                  </div>
                  <h3 className="font-pixel-title text-base sm:text-xl text-white mt-1">
                    {activeModalEvent.title}
                  </h3>
                </div>
              </div>

              <button
                onClick={() => {
                  setActiveModalEvent(null);
                  soundFx.playClick();
                }}
                className="w-9 h-9 bg-[#2A153E] hover:bg-[#E14E3D] border-2 border-black text-white flex items-center justify-center transition-colors active:scale-95 flex-shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Content Body */}
            <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4 font-sans text-xs sm:text-sm">
              
              {/* Full Description & Overview */}
              <div className="p-4 bg-[#0A0214] border-2 border-[#3A1E54]">
                <p className="font-pixel-sub text-xs text-[#FFD34D] uppercase font-bold mb-2 flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-[#FFD34D]" />
                  QUEST OVERVIEW:
                </p>
                <p className="text-[#F0F2FF] leading-relaxed font-normal">
                  {activeModalEvent.fullDesc}
                </p>
              </div>

              {/* Venue & Team Specs Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 bg-[#0A0214] border-2 border-[#3A1E54]">
                  <span className="font-pixel-arcade text-[10px] text-[#4FD9FF] block mb-1 font-bold">
                    📍 VENUE LOCATION:
                  </span>
                  <span className="text-white font-medium text-sm block">
                    {activeModalEvent.venue}
                  </span>
                </div>

                <div className="p-3.5 bg-[#0A0214] border-2 border-[#3A1E54]">
                  <span className="font-pixel-arcade text-[10px] text-[#55FF55] block mb-1 font-bold">
                    👥 TEAM FORMAT:
                  </span>
                  <span className="text-white font-medium text-sm block">
                    {activeModalEvent.teamSize}
                  </span>
                </div>
              </div>

              {/* Bounty Reward if present */}
              {activeModalEvent.prizePoolLabel && (
                <div className="p-4 bg-[#112410] border-2 border-[#55FF55] flex items-center justify-between shadow-[0_0_20px_rgba(85,255,85,0.25)]">
                  <div>
                    <span className="font-pixel-arcade text-[10px] text-[#55FF55] font-bold block">
                      QUEST BOUNTY & REWARDS:
                    </span>
                    <div className="font-pixel-title text-base sm:text-lg text-white mt-0.5">
                      {activeModalEvent.prizePoolLabel}
                    </div>
                  </div>
                  <Trophy className="w-9 h-9 text-[#FFD34D] flex-shrink-0" />
                </div>
              )}

              {/* Prerequisites & Required Inventory */}
              <div className="p-4 bg-[#0A0214] border-2 border-[#3A1E54]">
                <h4 className="font-pixel-sub text-xs text-[#4FD9FF] uppercase font-bold mb-2 flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-[#4FD9FF]" />
                  PREREQUISITES & INVENTORY NEEDED:
                </h4>
                <ul className="space-y-1.5 list-disc list-inside text-[#D8DAEC]">
                  {activeModalEvent.prerequisites.map((p, idx) => (
                    <li key={idx} className="leading-relaxed">
                      {p}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Arena Rules & Protocols */}
              <div className="p-4 bg-[#0A0214] border-2 border-[#3A1E54]">
                <h4 className="font-pixel-sub text-xs text-[#FFD34D] uppercase font-bold mb-2 flex items-center gap-2">
                  <ShieldAlert className="w-3.5 h-3.5 text-[#FFD34D]" />
                  ARENA RULES & PROTOCOLS:
                </h4>
                <ul className="space-y-1.5 list-disc list-inside text-[#D8DAEC]">
                  {activeModalEvent.rules.map((r, idx) => (
                    <li key={idx} className="leading-relaxed">
                      {r}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Coordinators */}
              <div className="pt-2 border-t-2 border-[#3A1E54]">
                <span className="font-pixel-arcade text-[10px] text-[#A0A0B8] block mb-2 font-bold">
                  QUEST COORDINATORS:
                </span>
                <div className="flex flex-wrap gap-2 text-xs">
                  {activeModalEvent.coordinators.map((c, idx) => (
                    <div
                      key={idx}
                      className="bg-[#190B2E] px-3 py-1.5 border-2 border-[#3A1E54] text-white font-medium"
                    >
                      {c.label}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Bottom Action Controls */}
            <div className="p-4 sm:p-5 border-t-4 border-[#3A1E54] bg-[#0A0214] flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                onClick={(e) => handleBookmarkToggle(activeModalEvent.id, e)}
                className={`btn-voxel text-xs w-full sm:w-auto px-5 py-3 flex items-center justify-center gap-2 ${
                  hotbarItems.includes(activeModalEvent.id)
                    ? "btn-voxel-stone"
                    : "btn-voxel-gold"
                }`}
              >
                <Bookmark className="w-4 h-4" />
                <span>
                  {hotbarItems.includes(activeModalEvent.id)
                    ? "✓ EQUIPPED IN HOTBAR"
                    : "🎒 EQUIP TO HOTBAR"}
                </span>
              </button>

              <Link
                href="/register"
                onClick={() => {
                  setActiveModalEvent(null);
                  soundFx.playClick();
                }}
                className="btn-voxel btn-voxel-diamond text-xs w-full sm:w-auto px-6 py-3 flex items-center justify-center gap-2"
              >
                <span>REGISTER FOR THIS QUEST</span>
                <ArrowRight className="w-4 h-4" />
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
