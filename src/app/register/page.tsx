"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
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
  CreditCard,
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
  { id: "hacker", label: "Zero-Day Hacker", icon: "💻", color: "#4FD9FF", desc: "Code, exploits & architecture" },
  { id: "alchemist", label: "AI Alchemist", icon: "🧙‍♂️", color: "#55FF55", desc: "LLMs, agents & neural networks" },
  { id: "knight", label: "Cloud Knight", icon: "⚔️", color: "#FFD34D", desc: "Serverless, DevOps & scale" },
  { id: "oracle", label: "Math Oracle", icon: "📐", color: "#E14E3D", desc: "Algorithms, quant & crypto" },
  { id: "artist", label: "Voxel Artist", icon: "🎨", color: "#FF7BE5", desc: "UI/UX, 3D worlds & creative tech" },
];

function RegisterFormContent() {
  const searchParams = useSearchParams();
  const initialTypeParam = searchParams.get("type") || searchParams.get("tier");

  const { gainXp, unlockAchievement } = useAchievement();

  // Registration Type: "fest" (Free festival & workshops verification pass) | "hackathon" (HackNova 2.0 ₹199)
  const [registrationType, setRegistrationType] = useState<"fest" | "hackathon">(
    initialTypeParam === "hacker" || initialTypeParam === "hackathon" ? "hackathon" : "fest"
  );

  // Form State
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [collegeName, setCollegeName] = useState("HBTU Kanpur");
  const [branch, setBranch] = useState("Computer Science & Engineering");
  const [academicYear, setAcademicYear] = useState("3rd Year");
  const [characterClass, setCharacterClass] = useState("hacker");
  const [gamerTag, setGamerTag] = useState("");
  const [teamName, setTeamName] = useState("");
  const [trackInterest, setTrackInterest] = useState("AI & Autonomous Agents");
  const [paymentRef, setPaymentRef] = useState("");

  // State for submission & ticket generation
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isForged, setIsForged] = useState(false);
  const [generatedPassId, setGeneratedPassId] = useState("");
  const [copiedToken, setCopiedToken] = useState(false);

  // Live Attendee Counter State
  const [attendeeCount, setAttendeeCount] = useState(BASE_SIMULATED_COUNT);

  // Sync initial type from URL query if changed
  useEffect(() => {
    if (initialTypeParam === "hacker" || initialTypeParam === "hackathon") {
      setRegistrationType("hackathon");
    }
  }, [initialTypeParam]);

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

  const handleTypeSelect = (type: "fest" | "hackathon") => {
    setRegistrationType(type);
    soundFx.playClick();
  };

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

    const isHackathon = registrationType === "hackathon";

    const payload = {
      pass_token: uniquePassToken,
      name: fullName,
      email: email,
      phone: phone,
      college: collegeName,
      branch: branch,
      year: academicYear,
      registration_type: isHackathon
        ? "HackNova 2.0 24h Hackathon (₹199 Paid)"
        : "Singularity 2K26 Festival & Workshops Pass (FREE Verification)",
      amount_paid: isHackathon ? "₹199" : "FREE (₹0)",
      payment_ref: isHackathon ? (paymentRef || "Pending / UPI Verification") : "N/A (Free Pass)",
      character_class: CHARACTER_CLASSES.find((c) => c.id === characterClass)?.label || "Zero-Day Hacker",
      gamer_tag: gamerTag || fullName.split(" ")[0] || "Builder",
      team_name: isHackathon ? (teamName || "Squad") : (teamName || "Individual Attendee"),
      interest: trackInterest,
      timestamp: new Date().toISOString(),
    };

    try {
      if (SCRIPT_URL && !SCRIPT_URL.includes("placeholder")) {
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
      console.warn("Apps Script dispatch note:", err);
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
          All festival events, hands-on workshops, keynotes, and EDM Night gates are <strong>100% FREE for all attendees</strong> (pass is used for campus check-in & verification). HackNova 2.0 hackathon registration is ₹199.
        </p>
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
                <span className="font-pixel-arcade text-[10px] text-[#FFD34D] uppercase flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#55FF55] animate-ping inline-block" />
                  LIVE ATTENDEE COUNTER
                </span>
                <h3 className="font-pixel-title text-lg sm:text-2xl text-white">
                  {attendeeCount.toLocaleString()} / {TARGET_ATTENDEES.toLocaleString()} ATTENDEES ENLISTED
                </h3>
              </div>
            </div>

            <div className="text-left sm:text-right">
              <div className="font-pixel-arcade text-xs text-[#55FF55] bg-[#55FF55]/10 px-3 py-1 border border-[#55FF55]/30 inline-block">
                {countPercentage}% CAPACITY REACHED
              </div>
              <p className="text-[11px] text-[#A0A0B8] font-sans mt-1">
                ⚡ Free verification passes issuing for all collegiate tracks
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

          <div className="flex justify-between items-center text-[9px] font-pixel-arcade text-[#85859E] mt-2">
            <span>START: 0</span>
            <span>CHECKPOINT: 500</span>
            <span>MILESTONE: 1,000</span>
            <span className="text-[#FFD34D]">CAP: 1,500</span>
          </div>
        </div>
      </section>

      {/* REGISTRATION TYPE SELECTION (FREE FEST PASS vs HACKATHON 199) */}
      <section className="px-4 sm:px-6 max-w-5xl mx-auto mb-12">
        <div className="text-center mb-6">
          <span className="font-pixel-arcade text-xs text-[#4FD9FF] uppercase">
            REGISTRATION TYPE
          </span>
          <h2 className="font-pixel-title text-xl sm:text-3xl text-white mt-1">
            SELECT YOUR ENLISTMENT
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Free Festival & Workshops Verification Pass */}
          <div
            onClick={() => handleTypeSelect("fest")}
            className={`p-6 border-4 cursor-pointer transition-all flex flex-col justify-between backdrop-blur-xl relative ${
              registrationType === "fest"
                ? "bg-[#0E1A0F]/98 border-[#55FF55] shadow-[0_0_35px_rgba(85,255,85,0.45)] scale-102"
                : "bg-[#090214]/90 border-[#2A1640] hover:border-[#5D9C43]"
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-pixel-arcade text-xs text-[#55FF55] bg-[#55FF55]/15 px-2.5 py-1 border border-[#55FF55]/40 font-bold">
                  100% FREE FOR ALL
                </span>
                <span className="font-pixel-title text-lg text-[#55FF55]">₹0 / FREE</span>
              </div>
              <h3 className="font-pixel-title text-xl text-white">
                FESTIVAL & WORKSHOPS PASS
              </h3>
              <p className="text-xs text-[#D8D8E8] font-sans mt-2 leading-relaxed">
                Official digital verification credential for campus entry at HBTU Kanpur, all hands-on technical workshops, guest keynotes, Mathletics Olympiad, RoboClash exhibitions, and EDM Night gates.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-[#2A2438] flex items-center justify-between font-pixel-arcade text-[10px]">
              <span className="text-[#55FF55]">
                {registrationType === "fest" ? "✓ SELECTED ENLISTMENT" : "CLICK TO SELECT →"}
              </span>
              <span className="text-[#A0A0B0]">VERIFICATION BADGE</span>
            </div>
          </div>

          {/* HackNova 2.0 Hackathon (Paid ₹199) */}
          <div
            onClick={() => handleTypeSelect("hackathon")}
            className={`p-6 border-4 cursor-pointer transition-all flex flex-col justify-between backdrop-blur-xl relative ${
              registrationType === "hackathon"
                ? "bg-[#1C081A]/98 border-[#E14E3D] shadow-[0_0_35px_rgba(225,78,61,0.45)] scale-102"
                : "bg-[#090214]/90 border-[#2A1640] hover:border-[#E14E3D]"
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-pixel-arcade text-xs text-[#FFD34D] bg-[#FFD34D]/15 px-2.5 py-1 border border-[#FFD34D]/40 font-bold">
                  FLAGSHIP 24H ARENA
                </span>
                <span className="font-pixel-title text-lg text-[#FFD34D]">₹199 / SQUAD</span>
              </div>
              <h3 className="font-pixel-title text-xl text-white">
                HACKNOVA 2.0 HACKATHON
              </h3>
              <p className="text-xs text-[#D8D8E8] font-sans mt-2 leading-relaxed">
                Full 24-hour hackathon entry, complimentary food & midnight pizza, AWS cloud sandboxes, mentorship, and eligibility for ₹1.8 Lakh+ loot chests (includes free festival pass).
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-[#2A2438] flex items-center justify-between font-pixel-arcade text-[10px]">
              <span className="text-[#FFD34D]">
                {registrationType === "hackathon" ? "✓ SELECTED ENLISTMENT" : "CLICK TO SELECT →"}
              </span>
              <span className="text-[#E14E3D]">HACKATHON + PASS</span>
            </div>
          </div>
        </div>
      </section>

      {/* UNIFIED FESTIVAL REGISTRATION & PASS FORGE WORKBENCH */}
      <section className="px-4 sm:px-6 max-w-7xl mx-auto mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Official Registration Form */}
          <div className="lg:col-span-7 bg-[#0E041A]/95 backdrop-blur-xl border-4 border-[#3A1E54] shadow-[0_12px_40px_rgba(0,0,0,0.95)] p-6 sm:p-8">
            <div className="flex items-center gap-3 border-b-2 border-[#2E1546] pb-4 mb-6">
              <div
                className="w-12 h-12 border-2 border-black flex items-center justify-center text-2xl shadow-[3px_3px_0_#000]"
                style={{
                  backgroundColor: registrationType === "hackathon" ? "#E14E3D" : "#55FF55",
                }}
              >
                {registrationType === "hackathon" ? "⚔️" : "🎟️"}
              </div>
              <div>
                <h2 className="font-pixel-title text-xl sm:text-2xl text-white">
                  {registrationType === "hackathon"
                    ? "HACKNOVA 2.0 REGISTRATION & PASS"
                    : "FESTIVAL VERIFICATION PASS FORGE"}
                </h2>
                <p className="text-xs text-[#A0A0B8] font-sans">
                  {registrationType === "hackathon"
                    ? "Fill squad/hacker details (₹199 entry) & generate your verified credential"
                    : "Workshops & fest are free for all. Generate your official verification pass"}
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmitRegistration} className="space-y-4 font-sans text-xs">
              {/* Row 1: Full Name & Gamer Tag */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-pixel-sub text-[10px] text-[#A0A0B0] uppercase mb-1">
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
                  <label className="block font-pixel-sub text-[10px] text-[#A0A0B0] uppercase mb-1">
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
                  <label className="block font-pixel-sub text-[10px] text-[#A0A0B0] uppercase mb-1">
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
                  <label className="block font-pixel-sub text-[10px] text-[#A0A0B0] uppercase mb-1">
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
                  <label className="block font-pixel-sub text-[10px] text-[#A0A0B0] uppercase mb-1">
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
                  <label className="block font-pixel-sub text-[10px] text-[#A0A0B0] uppercase mb-1">
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

              {/* Row 4: Academic Year & Squad / Team Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-pixel-sub text-[10px] text-[#A0A0B0] uppercase mb-1">
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

                <div>
                  <label className="block font-pixel-sub text-[10px] text-[#A0A0B0] uppercase mb-1">
                    {registrationType === "hackathon" ? "SQUAD / TEAM NAME:" : "TEAM / GROUP (OPTIONAL):"}
                  </label>
                  <input
                    type="text"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    placeholder={registrationType === "hackathon" ? "e.g. VoxelRaiders (Required for Hackathon)" : "e.g. Solo / Club Name"}
                    className="w-full bg-[#140822] border-2 border-[#3A1E54] focus:border-[#4FD9FF] p-2.5 text-white outline-none"
                  />
                </div>
              </div>

              {/* Primary Domain of Interest */}
              <div>
                <label className="block font-pixel-sub text-[10px] text-[#A0A0B0] uppercase mb-1">
                  PRIMARY WORKSHOP / QUEST TRACK OF INTEREST:
                </label>
                <select
                  value={trackInterest}
                  onChange={(e) => setTrackInterest(e.target.value)}
                  className="w-full bg-[#140822] border-2 border-[#3A1E54] focus:border-[#55FF55] p-2.5 text-white outline-none"
                >
                  <option value="AI & Autonomous Agents">Autonomous AI & Multi-Agent Swarms Workshop</option>
                  <option value="Cloud & Serverless">Next-Gen Cloud & Serverless Infrastructure (AWS)</option>
                  <option value="Web3 & Cryptography">Decentralized Systems & Zero-Knowledge</option>
                  <option value="Mathematical Computing">Mathematical Computing & Quant Models (HBTU Math)</option>
                  <option value="Game Dev & Creative Tech">Game Dev, Voxel Engines & Creative Tech</option>
                  <option value="RoboClash & Hardware">RoboClash Battle Arena & Embedded Systems</option>
                  <option value="All Festival Events">All Festival Tracks & Workshops (Full Access)</option>
                </select>
              </div>

              {/* Character Class Picker */}
              <div>
                <label className="block font-pixel-sub text-[10px] text-[#A0A0B0] uppercase mb-2">
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
                            : "bg-[#10081C] border-[#2A1438] text-[#A0A0B0] hover:text-white hover:border-[#3A1E54]"
                        }`}
                      >
                        <span className="text-xl">{cls.icon}</span>
                        <div className="truncate">
                          <div className="font-pixel-arcade text-[9px] truncate">
                            {cls.label}
                          </div>
                          <div className="text-[8px] text-[#808098] font-sans truncate">
                            {cls.desc}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Hackathon ₹199 Payment Reference Info Box */}
              {registrationType === "hackathon" && (
                <div className="p-4 bg-[#1A0815] border-2 border-[#E14E3D] space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-[#FFD34D] font-pixel-arcade text-xs">
                      <CreditCard className="w-4 h-4" />
                      <span>HACKATHON ENTRY FEE: ₹199 / SQUAD</span>
                    </div>
                    <span className="font-pixel-arcade text-[10px] text-[#55FF55] bg-[#55FF55]/15 px-2 py-0.5 border border-[#55FF55]/30">
                      ₹199 ONLY
                    </span>
                  </div>

                  <p className="text-[11px] text-[#D0D0E0] leading-relaxed">
                    HackNova 2.0 registration fee is ₹199 per squad (covers 24h meals, pizza, cloud labs, and loot chests). General fest & workshops are 100% free.
                  </p>

                  <div>
                    <label className="block font-pixel-sub text-[10px] text-[#FFD34D] uppercase mb-1">
                      UPI TRANSACTION REF / UTR NO. (OPTIONAL AT REGISTRATION):
                    </label>
                    <input
                      type="text"
                      value={paymentRef}
                      onChange={(e) => setPaymentRef(e.target.value)}
                      placeholder="e.g. UTR 426891234567 or Pay on Desk"
                      className="w-full bg-[#0E0312] border border-[#E14E3D] p-2 text-white outline-none font-mono text-xs"
                    />
                  </div>
                </div>
              )}

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
                    <span>
                      {registrationType === "hackathon"
                        ? "CONFIRM HACKATHON REGISTRATION (₹199) & FORGE PASS"
                        : "FORGE FREE FESTIVAL VERIFICATION PASS (+100 XP)"}
                    </span>
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
                  {registrationType === "hackathon" ? "HACKNOVA HACKER (₹199)" : "VERIFIED FEST PASS (FREE)"}
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
                  <span className="text-[9px] font-pixel-sub text-[#FFD34D] block uppercase">
                    {selectedClassObj.label}
                  </span>
                  <h4 className="font-pixel-title text-base sm:text-lg text-white truncate">
                    {gamerTag || (fullName ? fullName.split(" ")[0] : "VoxelBuilder")}
                  </h4>
                  <p className="text-xs text-[#4FD9FF] font-sans font-medium truncate">
                    {fullName || "Registered Attendee"}
                  </p>
                  <p className="text-xs text-[#A0A0B8] font-sans truncate">
                    🏛️ {collegeName || "HBTU Kanpur"}
                  </p>
                </div>
              </div>

              {/* Pass Barcode & QR Verification */}
              <div className="p-3.5 bg-[#080210] border border-[#2A123E] flex items-center justify-between gap-4">
                <div className="space-y-1 font-sans text-xs text-[#A0A0B0]">
                  <div className="font-pixel-arcade text-[9px] text-[#55FF55]">
                    PASS TOKEN ID:
                  </div>
                  <div className="font-pixel-title text-xs sm:text-sm text-white flex items-center gap-1.5">
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
                  <div className="text-[10px] text-[#808098]">📍 HBTU East Campus · Oct 16–18</div>
                </div>

                <div className="w-16 h-16 bg-white p-1 border-2 border-black flex items-center justify-center flex-shrink-0">
                  <QrCode className="w-full h-full text-black" />
                </div>
              </div>

              {/* Holographic Watermark Footer */}
              <div className="mt-4 pt-2.5 border-t border-[#2E1546] flex items-center justify-between text-[8px] font-pixel-arcade text-[#85859E]">
                <span>ENTRY PROTOCOL: {registrationType === "hackathon" ? "24H HACKATHON ARENA" : "FREE WORKSHOP & FEST"}</span>
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
                <div className="text-center font-pixel-arcade text-[10px] text-[#55FF55] animate-pulse">
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
            <span className="font-pixel-arcade text-xs text-[#55FF55] uppercase">
              CAMPUS COORDINATES & ARRIVAL
            </span>
            <h2 className="font-pixel-title text-2xl sm:text-3xl text-white mt-1">
              VENUE & TRAVEL GUIDE
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 bg-[#090214] border border-[#2B173E] space-y-2">
              <div className="flex items-center gap-2 text-[#FFD34D] font-pixel-arcade text-xs">
                <MapPin className="w-4 h-4" />
                <span>PHYSICAL VENUE</span>
              </div>
              <h4 className="font-bold text-white text-sm">HBTU East Campus</h4>
              <p className="text-xs text-[#A0A0B0] font-sans leading-relaxed">
                Nawabganj, Kanpur, UP 208002. Activities run across University Auditorium, RCC Labs, and Open Air Theatre (OAT).
              </p>
            </div>

            <div className="p-5 bg-[#090214] border border-[#2B173E] space-y-2">
              <div className="flex items-center gap-2 text-[#4FD9FF] font-pixel-arcade text-xs">
                <Train className="w-4 h-4" />
                <span>BY TRAIN</span>
              </div>
              <h4 className="font-bold text-white text-sm">Kanpur Central (CNB)</h4>
              <p className="text-xs text-[#A0A0B0] font-sans leading-relaxed">
                Located ~9 km from campus. Direct auto-rickshaws, cabs (Uber/Ola), and city buses run continuously to HBTU Nawabganj gate.
              </p>
            </div>

            <div className="p-5 bg-[#090214] border border-[#2B173E] space-y-2">
              <div className="flex items-center gap-2 text-[#55FF55] font-pixel-arcade text-xs">
                <Plane className="w-4 h-4" />
                <span>BY AIR</span>
              </div>
              <h4 className="font-bold text-white text-sm">Kanpur (KNU) / Lucknow (LKO)</h4>
              <p className="text-xs text-[#A0A0B0] font-sans leading-relaxed">
                Kanpur Chakeri Airport connects key metros. Lucknow Airport (LKO) is ~85 km away with express intercity shuttles.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FESTIVAL HELP DESK & COMMUNITY FAQS (NO EXTRA FORMS) */}
      <section className="px-4 sm:px-6 max-w-4xl mx-auto mb-20">
        <div className="bg-[#120524]/90 backdrop-blur-xl border-4 border-[#3A3250] p-6 sm:p-8 text-center">
          <span className="font-pixel-arcade text-xs text-[#FFD34D] uppercase">
            COMMUNITY & SUPPORT
          </span>
          <h2 className="font-pixel-title text-xl sm:text-2xl text-white mt-1 mb-2">
            FESTIVAL DESK & CONTACTS
          </h2>
          <p className="text-xs sm:text-sm text-[#A0A0B8] font-sans max-w-xl mx-auto mb-6">
            Need special accommodations, travel assistance, or team matchmaking support? Connect with our team directly.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
            <div className="p-4 bg-[#090214] border border-[#2B173E] flex items-center gap-3">
              <div className="w-10 h-10 bg-[#4FD9FF]/10 border border-[#4FD9FF] flex items-center justify-center text-lg text-[#4FD9FF]">
                💬
              </div>
              <div>
                <div className="font-pixel-arcade text-[10px] text-[#4FD9FF]">COMMUNITY DISCORD</div>
                <div className="text-xs font-sans text-white font-bold">discord.gg/singularity2k26</div>
              </div>
            </div>

            <div className="p-4 bg-[#090214] border border-[#2B173E] flex items-center gap-3">
              <div className="w-10 h-10 bg-[#55FF55]/10 border border-[#55FF55] flex items-center justify-center text-lg text-[#55FF55]">
                ✉️
              </div>
              <div>
                <div className="font-pixel-arcade text-[10px] text-[#55FF55]">ORGANIZER INBOX</div>
                <div className="text-xs font-sans text-white font-bold">singularity@hbtu.ac.in</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default function RegisterPage() {
  return (
    <main className="min-h-screen pt-8 relative bg-[#07010C]">
      {/* Background Image: 4K Ultra-Vivid Forge Atmosphere */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat opacity-80 brightness-115 pointer-events-none"
        style={{
          backgroundImage: "url('/images/bg_lava_forge_4k.jpg')",
        }}
      />
      <div className="fixed inset-0 bg-gradient-to-b from-[#07010C]/60 via-transparent to-[#07010C] pointer-events-none" />

      <Suspense
        fallback={
          <div className="py-32 text-center font-pixel-arcade text-xs text-[#4FD9FF]">
            LOADING CREDENTIAL FORGE...
          </div>
        }
      >
        <RegisterFormContent />
      </Suspense>

      {/* Global Footer */}
      <VoxelFooter />
    </main>
  );
}
