"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { soundFx } from "@/lib/soundFx";
import { spawnBlockBreakParticles } from "@/lib/particles";
import { useAchievement } from "@/components/ui/AchievementSystem";
import { VoxelFooter } from "@/components/ui/VoxelFooter";
import { SingularityLogo } from "@/components/ui/SingularityLogo";
import {
  Ticket,
  Sparkles,
  Download,
  QrCode,
  MapPin,
  CheckCircle,
  Shield,
  Users,
  Train,
  Plane,
  Flame,
  Zap,
  Award,
  HelpCircle,
  ExternalLink,
  Printer,
  Copy,
  Check,
} from "lucide-react";
import confetti from "canvas-confetti";

// Live Google Apps Script Web App URL for Singularity 2K26 Attendee Database
const SCRIPT_URL =
  process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL ||
  "https://script.google.com/macros/s/AKfycbwMZsilK8DsAE34sLjVnQCDsM6EGFQwDjzgBTdC3F4Q2eGXs3NoBV-XQcB8pqP5rLg/exec";

const TARGET_ATTENDEES = 1500;
const BASE_SIMULATED_COUNT = 487;

interface CharacterClass {
  id: string;
  label: string;
  icon: string;
  color: string;
  desc: string;
}

const CHARACTER_CLASSES: CharacterClass[] = [
  { id: "hacker", label: "Zero-Day Hacker", icon: "💻", color: "#4FD9FF", desc: "Code, architecture & logic" },
  { id: "alchemist", label: "AI Alchemist", icon: "🧙‍♂️", color: "#55FF55", desc: "LLMs, agents & machine intelligence" },
  { id: "knight", label: "Cloud Knight", icon: "⚔️", color: "#FFD34D", desc: "Distributed systems & scalable cloud" },
  { id: "oracle", label: "Math Oracle", icon: "📐", color: "#E14E3D", desc: "Algorithms, quant models & discrete math" },
  { id: "artist", label: "Voxel Artist", icon: "🎨", color: "#FF7BE5", desc: "UI/UX, 3D worlds & creative design" },
];

function RegisterFormContent() {
  const { gainXp, unlockAchievement } = useAchievement();

  // Form State - Festival Verification Pass Forge
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [collegeName, setCollegeName] = useState("HBTU Kanpur");
  const [branch, setBranch] = useState("Computer Science & Engineering");
  const [academicYear, setAcademicYear] = useState("3rd Year");
  const [characterClass, setCharacterClass] = useState("hacker");
  const [gamerTag, setGamerTag] = useState("");
  const [trackInterest, setTrackInterest] = useState("All Festival Events & Workshops");

  // State for submission & ticket generation
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isForged, setIsForged] = useState(false);
  const [generatedPassId, setGeneratedPassId] = useState("");
  const [copiedToken, setCopiedToken] = useState(false);

  // Live Attendee Counter State
  const [attendeeCount, setAttendeeCount] = useState(BASE_SIMULATED_COUNT);

  // Fetch live attendee count from Google Apps Script on mount
  useEffect(() => {
    let isMounted = true;
    async function fetchLiveCount() {
      try {
        const localSavedCount = Number(localStorage.getItem("sng_attendee_count") || "0");
        if (localSavedCount > 0) {
          setAttendeeCount(BASE_SIMULATED_COUNT + localSavedCount);
        }

        if (SCRIPT_URL && !SCRIPT_URL.includes("placeholder")) {
          const res = await fetch(SCRIPT_URL, { method: "GET" });
          if (res.ok) {
            const data = await res.json();
            if (isMounted && data && typeof data.count === "number") {
              setAttendeeCount(Math.max(data.count, BASE_SIMULATED_COUNT));
            }
          }
        }
      } catch {
        // Fallback safely to simulated + local saved count
      }
    }

    fetchLiveCount();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleClassSelect = (classId: string) => {
    setCharacterClass(classId);
    soundFx.playClick();
  };

  const handleSubmitRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    soundFx.playClick();

    const uniquePassToken = `SNG-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    setGeneratedPassId(uniquePassToken);

    const payload = {
      pass_token: uniquePassToken,
      name: fullName,
      gamer_tag: gamerTag || fullName.split(" ")[0] || "Builder",
      email: email,
      phone: phone,
      college: collegeName,
      branch: branch,
      year: academicYear,
      character_class: CHARACTER_CLASSES.find((c) => c.id === characterClass)?.label || "Zero-Day Hacker",
      interest: trackInterest,
      timestamp: new Date().toISOString(),
    };

    try {
      if (SCRIPT_URL && !SCRIPT_URL.includes("placeholder")) {
        // Dispatch to Google Apps Script Web App
        await fetch(SCRIPT_URL, {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "text/plain;charset=utf-8",
          },
          body: JSON.stringify(payload),
        });
      }
    } catch (err) {
      console.warn("Apps Script dispatch notice:", err);
    }

    // Update local counter
    const prevSaved = Number(localStorage.getItem("sng_attendee_count") || "0");
    localStorage.setItem("sng_attendee_count", String(prevSaved + 1));
    setAttendeeCount((prev) => prev + 1);

    // Trigger celebration effects
    soundFx.playLevelUp();
    spawnBlockBreakParticles(window.innerWidth / 2, window.innerHeight / 2, 35);
    gainXp(100);
    unlockAchievement("TICKET_CRAFTED");

    try {
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.55 },
        colors: ["#55FF55", "#4FD9FF", "#FFD34D", "#E14E3D", "#FF7BE5"],
      });
    } catch {}

    setIsForged(true);
    setIsSubmitting(false);

    // Smooth scroll down to generated badge
    setTimeout(() => {
      const badgeElem = document.getElementById("forged-pass-badge");
      if (badgeElem) {
        badgeElem.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 200);
  };

  const handleDownloadBadge = (e: React.MouseEvent) => {
    soundFx.playChestOpen();
    spawnBlockBreakParticles(e.clientX, e.clientY, 20);
    window.print();
  };

  const handleCopyToken = () => {
    if (!generatedPassId) return;
    navigator.clipboard.writeText(generatedPassId);
    setCopiedToken(true);
    soundFx.playClick();
    setTimeout(() => setCopiedToken(false), 2500);
  };

  const selectedClassObj =
    CHARACTER_CLASSES.find((c) => c.id === characterClass) || CHARACTER_CLASSES[0];

  const countPercentage = Math.min(100, Math.round((attendeeCount / TARGET_ATTENDEES) * 100));

  return (
    <>
      {/* HEADER BANNER */}
      <section className="relative z-10 px-4 sm:px-6 max-w-7xl mx-auto text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#140822] border-2 border-[#55FF55] shadow-[0_0_20px_rgba(85,255,85,0.3)] mb-3">
          <Zap className="w-4 h-4 text-[#55FF55] animate-pulse" />
          <span className="font-pixel-arcade text-xs text-[#55FF55] uppercase tracking-wider font-bold">
            OFFICIAL FESTIVAL ENLISTMENT & PASS VERIFICATION
          </span>
        </div>
        <h1 className="font-pixel-title text-3xl sm:text-5xl text-white mt-2 uppercase drop-shadow-[0_4px_0_#000]">
          FORGE YOUR FESTIVAL PASS
        </h1>
        <p className="text-xs sm:text-sm text-[#F0F2FF] font-sans max-w-2xl mx-auto mt-2 leading-relaxed drop-shadow-[0_2px_4px_#000]">
          All festival events, hands-on workshops, keynotes, Mathletics Olympiad, RoboClash exhibitions, and EDM Night gates are free for all verified attendees (pass is used for campus check-in & verification).
        </p>

        {/* Dedicated Banner for HackNova 2.0 Hackathon External Registration */}
        <div className="mt-5 max-w-3xl mx-auto p-3.5 bg-[#180820] border-2 border-[#E14E3D] shadow-[0_0_25px_rgba(225,78,61,0.25)] flex flex-col sm:flex-row items-center justify-between gap-3 text-left">
          <div className="flex items-center gap-3">
            <span className="text-2xl">⚔️</span>
            <div>
              <div className="font-pixel-arcade text-[10px] sm:text-xs text-[#FFD34D] font-bold uppercase">
                LOOKING FOR HACKNOVA 2.0 HACKATHON REGISTRATION?
              </div>
              <div className="text-[11px] text-[#E0E0EE] font-sans">
                HackNova 2.0 squad registrations are handled exclusively through its official portal.
              </div>
            </div>
          </div>
          <a
            href="https://hacknova2-n8n-dsc.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-voxel btn-voxel-redstone text-xs px-4 py-2 flex items-center gap-1.5 flex-shrink-0"
          >
            <span>HACKNOVA PORTAL</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </section>

      {/* LIVE ATTENDEE COUNT & PROGRESS HUD */}
      <section className="px-4 sm:px-6 max-w-5xl mx-auto mb-10">
        <div className="bg-[#120524]/95 backdrop-blur-2xl border-4 border-[#FFD34D] p-5 sm:p-6 shadow-[0_10px_35px_rgba(0,0,0,0.9),0_0_25px_rgba(255,211,77,0.2)]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#2A1E05] border-2 border-[#FFD34D] flex items-center justify-center text-xl shadow-[0_0_10px_rgba(255,211,77,0.4)]">
                🔥
              </div>
              <div>
                <span className="font-pixel-arcade text-[10px] text-[#FFD34D] uppercase flex items-center gap-1.5 font-bold">
                  <span className="w-2 h-2 rounded-full bg-[#55FF55] animate-ping inline-block" />
                  LIVE ATTENDEE COUNTER
                </span>
                <h3 className="font-pixel-title text-lg sm:text-2xl text-white font-bold drop-shadow-[0_2px_4px_#000]">
                  {attendeeCount.toLocaleString()} / {TARGET_ATTENDEES.toLocaleString()} ATTENDEES ENLISTED
                </h3>
              </div>
            </div>

            <div className="text-left sm:text-right">
              <div className="font-pixel-arcade text-xs text-[#55FF55] bg-[#55FF55]/10 px-3 py-1 border border-[#55FF55]/30 inline-block font-bold">
                {countPercentage}% CAPACITY REACHED
              </div>
              <p className="text-[11px] text-[#E0E0EE] font-sans mt-1">
                ⚡ Verification passes issuing for all collegiate tracks
              </p>
            </div>
          </div>

          {/* Voxel Health/XP Bar */}
          <div className="w-full bg-[#080210] border-2 border-[#3A1E54] h-6 p-1 relative overflow-hidden shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-[#E14E3D] via-[#FFD34D] to-[#55FF55] transition-all duration-1000 relative"
              style={{ width: `${Math.max(6, countPercentage)}%` }}
            >
              <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.3)_50%,transparent_100%)] animate-[shimmer_2s_infinite]" />
            </div>
          </div>

          <div className="flex justify-between items-center text-[9px] font-pixel-arcade text-[#A0A0C0] mt-2 font-bold">
            <span>START: 0</span>
            <span>CHECKPOINT: 500</span>
            <span>MILESTONE: 1,000</span>
            <span className="text-[#FFD34D]">CAP: 1,500</span>
          </div>
        </div>
      </section>

      {/* FESTIVAL PASS FORGE WORKBENCH */}
      <section className="px-4 sm:px-6 max-w-7xl mx-auto mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Official Pass Verification Form */}
          <div className="lg:col-span-7 bg-[#0E041A]/95 backdrop-blur-xl border-4 border-[#3A1E54] shadow-[0_12px_40px_rgba(0,0,0,0.95)] p-6 sm:p-8">
            <div className="flex items-center gap-3 border-b-2 border-[#2E1546] pb-4 mb-6">
              <div className="w-12 h-12 border-2 border-black flex items-center justify-center text-2xl shadow-[3px_3px_0_#000] bg-[#55FF55]">
                🎟️
              </div>
              <div>
                <h2 className="font-pixel-title text-xl sm:text-2xl text-white font-bold drop-shadow-[0_2px_4px_#000]">
                  FESTIVAL VERIFICATION PASS FORGE
                </h2>
                <p className="text-xs text-[#D8D8EE] font-sans">
                  Workshops & festival access are free for all. Generate your official verification credential.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmitRegistration} className="space-y-4 font-sans text-xs">
              {/* Row 1: Full Name & Gamer Tag */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-pixel-sub text-[10px] text-[#E0E0EE] font-bold uppercase mb-1">
                    FULL ATTENDEE NAME <span className="text-[#E14E3D]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Aarav Sharma"
                    className="w-full bg-[#140822] border-2 border-[#3A1E54] focus:border-[#55FF55] p-2.5 text-white outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block font-pixel-sub text-[10px] text-[#E0E0EE] font-bold uppercase mb-1">
                    CALLSIGN / GAMER TAG <span className="text-[#A0A0B0]">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    value={gamerTag}
                    onChange={(e) => setGamerTag(e.target.value)}
                    placeholder="e.g. VoxelHunter"
                    className="w-full bg-[#140822] border-2 border-[#3A1E54] focus:border-[#4FD9FF] p-2.5 text-white font-pixel-arcade text-[11px] outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Row 2: Email & WhatsApp Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-pixel-sub text-[10px] text-[#E0E0EE] font-bold uppercase mb-1">
                    EMAIL ADDRESS <span className="text-[#E14E3D]">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@college.edu"
                    className="w-full bg-[#140822] border-2 border-[#3A1E54] focus:border-[#55FF55] p-2.5 text-white outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block font-pixel-sub text-[10px] text-[#E0E0EE] font-bold uppercase mb-1">
                    WHATSAPP / PHONE NO. <span className="text-[#E14E3D]">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full bg-[#140822] border-2 border-[#3A1E54] focus:border-[#55FF55] p-2.5 text-white outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Row 3: College & Branch */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-pixel-sub text-[10px] text-[#E0E0EE] font-bold uppercase mb-1">
                    COLLEGE / UNIVERSITY <span className="text-[#E14E3D]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={collegeName}
                    onChange={(e) => setCollegeName(e.target.value)}
                    placeholder="HBTU Kanpur / IIT / etc."
                    className="w-full bg-[#140822] border-2 border-[#3A1E54] focus:border-[#55FF55] p-2.5 text-white outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block font-pixel-sub text-[10px] text-[#E0E0EE] font-bold uppercase mb-1">
                    BRANCH / DEPARTMENT <span className="text-[#E14E3D]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
                    placeholder="Computer Science / IT / Electronics"
                    className="w-full bg-[#140822] border-2 border-[#3A1E54] focus:border-[#55FF55] p-2.5 text-white outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Row 4: Academic Year */}
              <div>
                <label className="block font-pixel-sub text-[10px] text-[#E0E0EE] font-bold uppercase mb-1">
                  ACADEMIC YEAR:
                </label>
                <select
                  value={academicYear}
                  onChange={(e) => setAcademicYear(e.target.value)}
                  className="w-full bg-[#140822] border-2 border-[#3A1E54] focus:border-[#4FD9FF] p-2.5 text-white outline-none"
                >
                  <option value="1st Year">1st Year (Freshman)</option>
                  <option value="2nd Year">2nd Year (Sophomore)</option>
                  <option value="3rd Year">3rd Year (Junior)</option>
                  <option value="4th Year">4th Year (Senior)</option>
                  <option value="Postgraduate / Researcher">Postgraduate / Researcher</option>
                </select>
              </div>

              {/* Primary Domain of Interest */}
              <div>
                <label className="block font-pixel-sub text-[10px] text-[#E0E0EE] font-bold uppercase mb-1">
                  PRIMARY WORKSHOP / QUEST TRACK OF INTEREST:
                </label>
                <select
                  value={trackInterest}
                  onChange={(e) => setTrackInterest(e.target.value)}
                  className="w-full bg-[#140822] border-2 border-[#3A1E54] focus:border-[#55FF55] p-2.5 text-white outline-none"
                >
                  <option value="AI & Autonomous Agents">Autonomous AI & Multi-Agent Swarms Workshop</option>
                  <option value="Cloud & Serverless">Next-Gen Cloud & Serverless Infrastructure (AWS)</option>
                  <option value="Web3 & Cryptography">Decentralized Systems & Cryptography</option>
                  <option value="Mathematical Computing">Mathematical Computing & Quant Models (HBTU Math)</option>
                  <option value="Game Dev & Creative Tech">Game Dev, Voxel Engines & Creative Tech</option>
                  <option value="RoboClash & Hardware">RoboClash Battle Arena & Embedded Systems</option>
                  <option value="All Festival Events & Workshops">All Festival Tracks & Workshops (Full Access)</option>
                </select>
              </div>

              {/* Character Class Picker */}
              <div>
                <label className="block font-pixel-sub text-[10px] text-[#E0E0EE] font-bold uppercase mb-2">
                  CHOOSE YOUR CHARACTER CLASS:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {CHARACTER_CLASSES.map((cls) => {
                    const isSelected = characterClass === cls.id;
                    return (
                      <button
                        type="button"
                        key={cls.id}
                        onClick={() => handleClassSelect(cls.id)}
                        className={`p-2.5 border-2 text-left flex items-center gap-2.5 transition-all ${
                          isSelected
                            ? "bg-[#1E172E] border-[#4FD9FF] text-white shadow-[0_0_12px_rgba(79,217,255,0.4)]"
                            : "bg-[#10081C] border-[#2A1438] text-[#D0D0E0] hover:text-white hover:border-[#3A1E54]"
                        }`}
                      >
                        <span className="text-xl">{cls.icon}</span>
                        <div className="truncate">
                          <div className="font-pixel-arcade text-[9px] truncate font-bold">
                            {cls.label}
                          </div>
                          <div className="text-[8px] text-[#A0A0C0] font-sans truncate">
                            {cls.desc}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-voxel btn-voxel-gold text-xs w-full py-4 mt-4 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,211,77,0.3)] disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>⏳ RECORDING IN ATTENDEE DATABASE...</span>
                ) : (
                  <>
                    <span>⚒️</span>
                    <span>FORGE FESTIVAL VERIFICATION PASS (+100 XP)</span>
                    <span>→</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Right Column: Real-Time Generated 3D Voxel Pass Card Badge */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div
              id="forged-pass-badge"
              className="w-full max-w-md bg-[#120524] border-4 p-6 relative select-none shadow-[0_12px_0_#000,0_0_45px_rgba(79,217,255,0.3)] transition-all"
              style={{ borderColor: selectedClassObj.color }}
            >
              {/* Top Pass Header */}
              <div className="flex items-center justify-between border-b-2 border-[#2E1546] pb-3 mb-4">
                <SingularityLogo size="sm" />
                <span
                  className="font-pixel-arcade text-[9px] px-2.5 py-1 border font-bold uppercase tracking-wider"
                  style={{
                    color: selectedClassObj.color,
                    borderColor: `${selectedClassObj.color}60`,
                    backgroundColor: `${selectedClassObj.color}15`,
                  }}
                >
                  VERIFIED FEST PASS
                </span>
              </div>

              {/* Pass Body */}
              <div className="flex items-start gap-4 mb-5">
                <div
                  className="w-20 h-20 border-2 flex items-center justify-center text-4xl flex-shrink-0 bg-[#0B0314] shadow-[0_0_15px_rgba(0,0,0,0.8)]"
                  style={{ borderColor: selectedClassObj.color }}
                >
                  {selectedClassObj.icon}
                </div>

                <div className="flex-1 space-y-1 overflow-hidden">
                  <span className="text-[9px] font-pixel-sub text-[#FFD34D] block uppercase font-bold">
                    {selectedClassObj.label}
                  </span>
                  <h4 className="font-pixel-title text-base sm:text-lg text-white font-bold truncate drop-shadow-[0_2px_4px_#000]">
                    {gamerTag || (fullName ? fullName.split(" ")[0] : "VoxelBuilder")}
                  </h4>
                  <p className="text-xs text-[#4FD9FF] font-sans font-medium truncate">
                    {fullName || "Registered Attendee"}
                  </p>
                  <p className="text-xs text-[#E0E0EE] font-sans truncate">
                    🏛️ {collegeName || "HBTU Kanpur"}
                  </p>
                </div>
              </div>

              {/* Pass Barcode & QR Verification */}
              <div className="p-3.5 bg-[#080210] border border-[#2A123E] flex items-center justify-between gap-4">
                <div className="space-y-1 font-sans text-xs text-[#D0D0E0]">
                  <div className="font-pixel-arcade text-[9px] text-[#55FF55] font-bold">
                    PASS TOKEN ID:
                  </div>
                  <div className="font-pixel-title text-xs sm:text-sm text-white font-bold flex items-center gap-1.5">
                    <span>{generatedPassId || "SNG-2026-PENDING"}</span>
                    {generatedPassId && (
                      <button
                        type="button"
                        onClick={handleCopyToken}
                        className="text-[#FFD34D] hover:text-white p-0.5"
                        title="Copy Pass Token"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                  <div className="text-[10px] text-[#A0A0C0]">📍 HBTU East Campus · Oct 16–18</div>
                </div>

                <div className="w-16 h-16 bg-white p-1 border-2 border-black flex items-center justify-center flex-shrink-0">
                  <QrCode className="w-full h-full text-black" />
                </div>
              </div>

              {/* Holographic Watermark Footer */}
              <div className="mt-4 pt-2.5 border-t border-[#2E1546] flex items-center justify-between text-[8px] font-pixel-arcade text-[#A0A0C0] font-bold">
                <span>ENTRY PROTOCOL: FREE WORKSHOP & FEST ACCESS</span>
                <span className={isForged ? "text-[#55FF55]" : "text-[#FFD34D]"}>
                  {isForged ? "● PASS VERIFIED" : "○ READY TO FORGE"}
                </span>
              </div>
            </div>

            {/* Badge Action Buttons */}
            <div className="mt-4 w-full max-w-md space-y-2">
              <button
                onClick={handleDownloadBadge}
                className="btn-voxel btn-voxel-diamond text-xs w-full py-3.5 flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>PRINT / DOWNLOAD ATTENDEE BADGE</span>
              </button>

              {copiedToken && (
                <div className="text-center font-pixel-arcade text-[10px] text-[#55FF55] animate-pulse font-bold">
                  ✓ PASS TOKEN COPIED TO CLIPBOARD
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* VENUE & TRAVEL NAVIGATION GUIDE */}
      <section className="px-4 sm:px-6 max-w-7xl mx-auto mb-20">
        <div className="bg-[#120524]/90 backdrop-blur-xl border-4 border-[#3A3250] p-6 sm:p-8">
          <div className="text-center mb-8">
            <span className="font-pixel-arcade text-xs text-[#55FF55] uppercase font-bold">
              CAMPUS COORDINATES & ARRIVAL
            </span>
            <h2 className="font-pixel-title text-2xl sm:text-3xl text-white font-bold mt-1 drop-shadow-[0_2px_4px_#000]">
              VENUE & TRAVEL GUIDE
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 bg-[#090214] border border-[#2B173E] space-y-2">
              <div className="flex items-center gap-2 text-[#FFD34D] font-pixel-arcade text-xs font-bold">
                <MapPin className="w-4 h-4" />
                <span>PHYSICAL VENUE</span>
              </div>
              <h4 className="font-bold text-white text-sm">HBTU East Campus</h4>
              <p className="text-xs text-[#D8D8EE] font-sans leading-relaxed">
                Nawabganj, Kanpur, UP 208002. Activities run across University Auditorium, RCC Labs, and Open Air Theatre (OAT).
              </p>
            </div>

            <div className="p-5 bg-[#090214] border border-[#2B173E] space-y-2">
              <div className="flex items-center gap-2 text-[#4FD9FF] font-pixel-arcade text-xs font-bold">
                <Train className="w-4 h-4" />
                <span>BY TRAIN</span>
              </div>
              <h4 className="font-bold text-white text-sm">Kanpur Central (CNB)</h4>
              <p className="text-xs text-[#D8D8EE] font-sans leading-relaxed">
                Located ~9 km from campus. Direct auto-rickshaws, cabs (Uber/Ola), and city buses run continuously to HBTU Nawabganj gate.
              </p>
            </div>

            <div className="p-5 bg-[#090214] border border-[#2B173E] space-y-2">
              <div className="flex items-center gap-2 text-[#55FF55] font-pixel-arcade text-xs font-bold">
                <Plane className="w-4 h-4" />
                <span>BY AIR</span>
              </div>
              <h4 className="font-bold text-white text-sm">Kanpur (KNU) / Lucknow (LKO)</h4>
              <p className="text-xs text-[#D8D8EE] font-sans leading-relaxed">
                Kanpur Chakeri Airport connects key metros. Lucknow Airport (LKO) is ~85 km away with express intercity shuttles.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FESTIVAL HELP DESK & CONTACTS */}
      <section className="px-4 sm:px-6 max-w-4xl mx-auto mb-20">
        <div className="bg-[#120524]/90 backdrop-blur-xl border-4 border-[#3A3250] p-6 sm:p-8 text-center">
          <span className="font-pixel-arcade text-xs text-[#FFD34D] uppercase font-bold">
            COMMUNITY & SUPPORT
          </span>
          <h2 className="font-pixel-title text-xl sm:text-2xl text-white font-bold mt-1 mb-2 drop-shadow-[0_2px_4px_#000]">
            FESTIVAL DESK & CONTACTS
          </h2>
          <p className="text-xs sm:text-sm text-[#D8D8EE] font-sans max-w-xl mx-auto mb-6">
            Have questions about physical check-ins, workshops, or group travel? Reach out to the student coordinators at HBTU Kanpur.
          </p>

          <div className="flex flex-wrap justify-center gap-4 text-xs font-pixel-arcade">
            <span className="px-4 py-2 bg-[#090214] border border-[#55FF55]/40 text-[#55FF55]">
              📍 SPAWN DESK: HBTU AUDITORIUM FOYER
            </span>
            <span className="px-4 py-2 bg-[#090214] border border-[#4FD9FF]/40 text-[#4FD9FF]">
              ✉️ ORGANIZERS: N8N & AWS SBG HBTU
            </span>
          </div>
        </div>
      </section>
    </>
  );
}

export default function RegisterPage() {
  return (
    <main className="min-h-screen pt-8 relative bg-[#07010C]">
      {/* 4K Magma/Overworld Atmosphere Background */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat opacity-80 brightness-115 pointer-events-none"
        style={{
          backgroundImage: "url('/images/bg_nether_celestial_4k.jpg')",
        }}
      />
      <div className="fixed inset-0 bg-gradient-to-b from-[#07010C]/60 via-transparent to-[#07010C] pointer-events-none" />

      <Suspense
        fallback={
          <div className="min-h-[50vh] flex items-center justify-center text-white font-pixel-arcade">
            LOADING PASS FORGE...
          </div>
        }
      >
        <RegisterFormContent />
      </Suspense>

      <VoxelFooter />
    </main>
  );
}
