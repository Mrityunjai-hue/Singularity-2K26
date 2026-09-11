"use client";

import React, { useState } from "react";
import { DAYS_SCHEDULE, ScheduleItem } from "@/data/schedule";
import { soundFx } from "@/lib/soundFx";
import { spawnBlockBreakParticles } from "@/lib/particles";
import { useAchievement } from "@/components/ui/AchievementSystem";
import { VoxelFooter } from "@/components/ui/VoxelFooter";
import {
  Calendar,
  Clock,
  MapPin,
  Download,
  Sun,
  Moon,
  Sparkles,
  CheckCircle,
  Shield,
  Zap,
  Filter,
  Trophy,
  Code,
  Music,
  Users,
  Flame,
} from "lucide-react";

export default function SchedulePage() {
  const [activeDayNumber, setActiveDayNumber] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const { gainXp } = useAchievement();
  const [calendarToast, setCalendarToast] = useState(false);

  const activeDay = DAYS_SCHEDULE.find((d) => d.dayNumber === activeDayNumber) || DAYS_SCHEDULE[0];

  const handleDaySelect = (dayNum: number, e: React.MouseEvent) => {
    soundFx.playClick();
    spawnBlockBreakParticles(e.clientX, e.clientY, 12);
    setActiveDayNumber(dayNum);
  };

  const handleCategoryFilter = (cat: string, e: React.MouseEvent) => {
    soundFx.playClick();
    spawnBlockBreakParticles(e.clientX, e.clientY, 8);
    setSelectedCategory(cat);
  };

  const handleDownloadFullCalendar = (e: React.MouseEvent) => {
    soundFx.playChestOpen();
    spawnBlockBreakParticles(e.clientX, e.clientY, 15);
    setCalendarToast(true);

    // Generate .ics text payload
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Singularity 2K26 HBTU//Fest Schedule//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
X-WR-CALNAME:Singularity 2K26 Festival Schedule
X-WR-TIMEZONE:Asia/Kolkata
BEGIN:VEVENT
UID:singularity-2026-spawn@hbtu.ac.in
DTSTART:20261016T083000
DTEND:20261018T233000
SUMMARY:Singularity 2K26 — HBTU Kanpur
DESCRIPTION:Flagship 3-day Techfest organized by N8N DSC, AWS SBG HBTU and Dept of Mathematics.
LOCATION:Harcourt Butler Technical University, Kanpur
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute("download", "Singularity_2K26_Schedule.ics");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => setCalendarToast(false), 4000);
  };

  // Filter items by category
  const filteredItems = activeDay.items.filter((item) => {
    if (selectedCategory === "all") return true;
    return item.category.toLowerCase() === selectedCategory.toLowerCase();
  });

  const categories = [
    { id: "all", label: "ALL SESSIONS", icon: Sparkles, color: "#4FD9FF" },
    { id: "hackathon", label: "HACKNOVA 2.0", icon: Trophy, color: "#E14E3D" },
    { id: "workshop", label: "WORKSHOPS", icon: Code, color: "#FFD34D" },
    { id: "competition", label: "COMPETITIONS", icon: Flame, color: "#FF9900" },
    { id: "cultural", label: "CULTURAL / EDM", icon: Music, color: "#FF55FF" },
    { id: "ceremony", label: "CEREMONIES", icon: Shield, color: "#55FF55" },
  ];

  return (
    <main className="min-h-screen pt-8 relative bg-[#06010A] text-[#FFFFFF]">
      {/* Background Image: High-Definition Nether Celestial Backdrop with High Visibility Overlay */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat opacity-40 brightness-90 pointer-events-none"
        style={{
          backgroundImage: "url('/images/bg_nether_celestial_4k.jpg')",
        }}
      />
      {/* Heavy contrast backing for pristine text visibility */}
      <div className="fixed inset-0 bg-gradient-to-b from-[#06010A]/95 via-[#0A0214]/90 to-[#06010A] pointer-events-none" />

      {/* 1. HEADER HERO SECTION */}
      <section className="relative z-10 px-4 sm:px-6 max-w-7xl mx-auto text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#140822] border-2 border-[#FFD34D] shadow-[0_0_20px_rgba(255,211,77,0.35)] mb-4">
          <Clock className="w-4 h-4 text-[#FFD34D] animate-pulse" />
          <span className="font-pixel-arcade text-xs text-[#FFD34D] uppercase tracking-widest font-bold">
            FESTIVAL RUNTIME ENGINE & TIMELINE
          </span>
        </div>

        <h1 className="font-pixel-title text-3xl sm:text-5xl md:text-6xl text-white mt-2 uppercase tracking-wide drop-shadow-[0_6px_0_#000] [text-shadow:0_0_30px_rgba(79,217,255,0.4)]">
          CHRONOLOGICAL SCHEDULE
        </h1>

        <p className="text-sm sm:text-base text-[#E0E2F5] font-sans max-w-3xl mx-auto mt-3 leading-relaxed font-normal drop-shadow-[0_2px_8px_#000]">
          Step-by-step chronological roadmap spanning all 3 days at Harcourt Butler Technical University, Kanpur.
          Explore keynote addresses, 24-hour HackNova checkpoints, hands-on masterclasses, gaming tournaments, and the grand PULSE EDM concert.
        </p>

        <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={handleDownloadFullCalendar}
            className="btn-voxel btn-voxel-gold text-xs sm:text-sm px-6 py-3.5 flex items-center gap-2.5 shadow-[0_0_30px_rgba(255,211,77,0.4)]"
          >
            <Download className="w-4 h-4 text-black" />
            <span className="font-bold text-black">EXPORT FULL CALENDAR (.ICS)</span>
          </button>
        </div>

        {calendarToast && (
          <div className="mt-4 inline-block bg-[#1B2E15] border-2 border-[#55FF55] px-5 py-2.5 text-xs font-pixel-arcade text-[#55FF55] animate-bounce shadow-[0_0_30px_rgba(85,255,85,0.6)]">
            ✓ FESTIVAL CALENDAR (.ICS) DOWNLOADED TO YOUR DEVICE!
          </div>
        )}
      </section>

      {/* 2. DAY SELECTOR TABS — VIBRANT & HIGH CONTRAST */}
      <section className="relative z-10 px-4 sm:px-6 max-w-6xl mx-auto mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {DAYS_SCHEDULE.map((day) => {
            const isSelected = activeDayNumber === day.dayNumber;

            // Distinct Day Accent Colors
            const dayTheme =
              day.dayNumber === 1
                ? { accent: "#55FF55", bgActive: "bg-[#0E2012]/95", border: "border-[#55FF55]" }
                : day.dayNumber === 2
                ? { accent: "#E14E3D", bgActive: "bg-[#250A10]/95", border: "border-[#E14E3D]" }
                : { accent: "#4FD9FF", bgActive: "bg-[#0E1A2E]/95", border: "border-[#4FD9FF]" };

            return (
              <button
                key={day.dayNumber}
                onClick={(e) => handleDaySelect(day.dayNumber, e)}
                className={`p-6 border-4 text-left transition-all select-none flex flex-col justify-between backdrop-blur-2xl relative overflow-hidden group shadow-[0_8px_24px_rgba(0,0,0,0.85)] ${
                  isSelected
                    ? `${dayTheme.bgActive} ${dayTheme.border} shadow-[0_0_40px_rgba(255,255,255,0.25),0_8px_0_#000] translate-y-[-4px]`
                    : "bg-[#11051F]/95 border-[#452066] hover:border-white hover:bg-[#1A0830]"
                }`}
              >
                {/* Active Indicator Top Glow Bar */}
                {isSelected && (
                  <div
                    className="absolute top-0 left-0 right-0 h-1.5 shadow-[0_0_15px_currentColor]"
                    style={{ backgroundColor: dayTheme.accent, color: dayTheme.accent }}
                  />
                )}

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-pixel-title text-xl sm:text-2xl text-white font-extrabold tracking-wide">
                      DAY 0{day.dayNumber}
                    </span>
                    <span
                      className="font-pixel-arcade text-xs px-2.5 py-1 border-2 font-bold uppercase shadow-sm"
                      style={{
                        color: isSelected ? "#FFFFFF" : dayTheme.accent,
                        borderColor: dayTheme.accent,
                        backgroundColor: isSelected ? dayTheme.accent : "rgba(0,0,0,0.5)",
                      }}
                    >
                      {day.dayTitle.split("—")[1]?.trim()}
                    </span>
                  </div>

                  <p
                    className="font-pixel-sub text-xs sm:text-sm font-bold uppercase mt-1 tracking-wider"
                    style={{ color: isSelected ? dayTheme.accent : "#FFD34D" }}
                  >
                    {day.themeTitle}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-[#3A1E54] flex items-center justify-between">
                  <span className="text-xs sm:text-sm text-[#F0F2FF] font-sans font-bold flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#4FD9FF]" />
                    <span>{day.dateStr}</span>
                  </span>
                  <span
                    className="font-pixel-arcade text-[10px] uppercase font-bold"
                    style={{ color: isSelected ? "#55FF55" : "#A0A0B8" }}
                  >
                    {isSelected ? "● ACTIVE VIEW" : "CLICK TO VIEW"}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* 3. CATEGORY FILTER CHIPS */}
      <section className="relative z-10 px-4 sm:px-6 max-w-6xl mx-auto mb-10">
        <div className="p-4 bg-[#11051F]/95 border-2 border-[#452066] shadow-[0_6px_20px_rgba(0,0,0,0.85)] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-pixel-arcade text-[#FFD34D]">
            <Filter className="w-4 h-4 text-[#FFD34D]" />
            <span>FILTER BY QUEST TYPE:</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => {
              const IconComp = cat.icon;
              const isActive = selectedCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={(e) => handleCategoryFilter(cat.id, e)}
                  className={`px-3.5 py-1.5 border-2 text-xs font-pixel-arcade transition-all flex items-center gap-2 ${
                    isActive
                      ? "bg-[#250E3A] border-white text-white font-bold shadow-[0_0_15px_rgba(255,255,255,0.4)]"
                      : "bg-[#090214] border-[#3A1E54] text-[#C0C0D8] hover:border-[#4FD9FF] hover:text-white"
                  }`}
                  style={{
                    borderColor: isActive ? cat.color : undefined,
                    color: isActive ? "#FFFFFF" : undefined,
                  }}
                >
                  <IconComp className="w-3.5 h-3.5" style={{ color: cat.color }} />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. ACTIVE DAY TIMELINE SPINE & EVENT CARDS */}
      <section className="relative z-10 px-4 sm:px-6 max-w-6xl mx-auto mb-24">
        {/* Active Horizon Day Theme Banner */}
        <div className="p-6 sm:p-8 bg-[#120524]/95 backdrop-blur-2xl border-4 border-[#FFD34D] shadow-[0_10px_40px_rgba(0,0,0,0.95),0_0_30px_rgba(255,211,77,0.3)] mb-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-[#3A1E54] pb-5 mb-5">
            <div>
              <div className="inline-block font-pixel-arcade text-xs text-[#FFD34D] bg-[#FFD34D]/15 border border-[#FFD34D]/40 px-3 py-1 uppercase tracking-wider mb-1">
                ACTIVE DAY HORIZON · {activeDay.dayTitle}
              </div>
              <h2 className="font-pixel-title text-2xl sm:text-4xl text-white mt-2 drop-shadow-[0_4px_0_#000]">
                {activeDay.themeTitle}
              </h2>
            </div>
            <div className="px-4 py-2 bg-[#080112] border-2 border-[#55FF55] text-xs sm:text-sm font-pixel-sub text-[#55FF55] flex items-center gap-2.5 shadow-[0_0_15px_rgba(85,255,85,0.25)] self-start sm:self-auto">
              <Calendar className="w-4 h-4 text-[#55FF55]" />
              <span className="font-bold">{activeDay.dateStr}</span>
            </div>
          </div>
          <p className="text-sm sm:text-base text-[#F0F2FF] font-sans leading-relaxed font-normal">
            {activeDay.themeTagline}
          </p>
        </div>

        {/* Continuous Timeline Rail & Nodes Container */}
        <div className="relative pl-0 sm:pl-12">
          {/* Glowing Vertical Timeline Track Line (Visible on tablet & desktop) */}
          <div className="hidden sm:block absolute left-4 top-4 bottom-8 w-1 bg-gradient-to-b from-[#4FD9FF] via-[#FFD34D] to-[#55FF55] shadow-[0_0_20px_rgba(79,217,255,0.7)]" />

          {/* Timeline Cards */}
          <div className="space-y-6">
            {filteredItems.length === 0 ? (
              <div className="p-12 text-center bg-[#11051F]/95 border-2 border-[#452066] text-white">
                <p className="font-pixel-title text-lg text-[#FFD34D]">NO EVENTS FOUND FOR THIS FILTER</p>
                <button
                  onClick={() => setSelectedCategory("all")}
                  className="btn-voxel btn-voxel-diamond text-xs mt-4"
                >
                  VIEW ALL EVENTS
                </button>
              </div>
            ) : (
              filteredItems.map((item, index) => {
                return (
                  <div key={item.id} className="relative group">
                    {/* Glowing Checkpoint Node Diamond on the Timeline Rail */}
                    <div className="hidden sm:flex absolute -left-12 top-6 w-9 h-9 bg-[#11051F] border-2 border-[#4FD9FF] text-white items-center justify-center font-pixel-arcade text-xs font-bold shadow-[0_0_20px_rgba(79,217,255,0.9)] z-20 group-hover:scale-110 group-hover:border-[#FFD34D] transition-transform">
                      {index + 1}
                    </div>

                    {/* Timeline Event Card */}
                    <div className="p-6 sm:p-7 bg-[#120524]/98 backdrop-blur-2xl border-3 border-[#4A2470] hover:border-[#4FD9FF] transition-all shadow-[0_10px_35px_rgba(0,0,0,0.95),0_0_20px_rgba(79,217,255,0.15)] group-hover:translate-x-1 relative overflow-hidden">
                      {/* Left Category Accent Strip */}
                      <div
                        className="absolute left-0 top-0 bottom-0 w-2 shadow-[0_0_15px_currentColor]"
                        style={{ backgroundColor: item.categoryColor, color: item.categoryColor }}
                      />

                      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                        {/* 1. Time & Icon Block */}
                        <div className="flex items-center gap-3 sm:gap-4 w-full lg:w-64 flex-shrink-0">
                          {/* Day/Night Glow Icon */}
                          <div
                            className="w-10 h-10 sm:w-12 sm:h-12 border-2 flex items-center justify-center flex-shrink-0 shadow-[0_0_20px_rgba(0,0,0,0.9)]"
                            style={{
                              backgroundColor: `${item.categoryColor}25`,
                              borderColor: item.categoryColor,
                              color: item.categoryColor,
                            }}
                          >
                            {item.isNightTime ? <Moon className="w-5 h-5 sm:w-6 sm:h-6" /> : <Sun className="w-5 h-5 sm:w-6 sm:h-6" />}
                          </div>

                          <div>
                            {/* Crystal-Clear High-Contrast Time */}
                            <div className="font-mono text-base sm:text-lg font-extrabold text-white tracking-wide flex items-center gap-2">
                              <Clock className="w-4 h-4 text-[#4FD9FF] flex-shrink-0" />
                              <span>{item.timeRange}</span>
                            </div>

                            {/* Vibrant Category Badge */}
                            <span
                              className="font-pixel-arcade text-[11px] uppercase font-bold tracking-widest px-2.5 py-0.5 border mt-1 inline-block"
                              style={{
                                color: item.categoryColor,
                                borderColor: item.categoryColor,
                                backgroundColor: `${item.categoryColor}15`,
                              }}
                            >
                              {item.category}
                            </span>
                          </div>
                        </div>

                        {/* 2. Main Event Content */}
                        <div className="flex-1 space-y-2">
                          <h3 className="font-pixel-heading text-xl sm:text-2xl font-bold text-white tracking-wide group-hover:text-[#4FD9FF] transition-colors">
                            {item.title}
                          </h3>

                          <div className="text-sm font-sans font-bold text-[#4FD9FF]">
                            {item.subtitle}
                          </div>

                          <p className="text-sm sm:text-base text-[#F0F2FF] font-sans leading-relaxed font-normal">
                            {item.description}
                          </p>

                          {item.speakerOrLead && (
                            <div className="mt-2 text-xs sm:text-sm font-pixel-sub text-[#FFD34D] bg-[#FFD34D]/15 px-3.5 py-1.5 border border-[#FFD34D] inline-flex items-center gap-2 shadow-[0_0_10px_rgba(255,211,77,0.2)]">
                              <span>⭐ LEAD / KEYNOTE:</span>
                              <span className="font-bold text-white font-sans">{item.speakerOrLead}</span>
                            </div>
                          )}
                        </div>

                        {/* 3. Venue & Status Badges */}
                        <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between w-full lg:w-auto gap-3 flex-shrink-0 pt-4 lg:pt-0 border-t lg:border-t-0 border-[#3A1E54]">
                          <div className="flex items-center gap-2 text-xs sm:text-sm text-white font-sans font-semibold bg-[#080112] px-4 py-2 border-2 border-[#4FD9FF]/40 shadow-sm">
                            <MapPin className="w-4 h-4 text-[#FFD34D] flex-shrink-0" />
                            <span>{item.venue}</span>
                          </div>

                          <span className="text-xs font-pixel-arcade text-[#55FF55] bg-[#55FF55]/20 px-3 py-1.5 border-2 border-[#55FF55] shadow-[0_0_15px_rgba(85,255,85,0.3)]">
                            ● CONFIRMED
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </section>

      {/* Global Footer */}
      <VoxelFooter />
    </main>
  );
}

