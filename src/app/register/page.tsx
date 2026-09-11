"use client";

import React, { useState } from "react";
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
  Send,
  CheckCircle,
  Shield,
  MessageSquare,
  Users,
  Train,
  Plane,
} from "lucide-react";
import confetti from "canvas-confetti";

export default function RegisterPage() {
  const { gainXp, unlockAchievement } = useAchievement();

  // Ticket Generator State
  const [gamerTag, setGamerTag] = useState("VoxelHacker");
  const [fullName, setFullName] = useState("Aarav Dev");
  const [collegeName, setCollegeName] = useState("HBTU Kanpur");
  const [characterClass, setCharacterClass] = useState("hacker");
  const [passTier, setPassTier] = useState<"general" | "hacker" | "vip">("hacker");
  const [generatedPassId, setGeneratedPassId] = useState("SNG-2026-7842");
  const [isForged, setIsForged] = useState(false);

  // Contact Form State
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMsg, setContactMsg] = useState("");
  const [contactSent, setContactSent] = useState(false);

  const characterClasses = [
    { id: "hacker", label: "Zero-Day Hacker", icon: "💻", color: "#4FD9FF" },
    { id: "alchemist", label: "AI Alchemist", icon: "🧙‍♂️", color: "#55FF55" },
    { id: "knight", label: "Cloud Knight", icon: "⚔️", color: "#FFD34D" },
    { id: "oracle", label: "Math Oracle", icon: "📐", color: "#E14E3D" },
    { id: "artist", label: "Voxel Artist", icon: "🎨", color: "#FF7BE5" },
  ];

  const handleForgeTicket = (e: React.FormEvent) => {
    e.preventDefault();
    soundFx.playLevelUp();
    spawnBlockBreakParticles(window.innerWidth / 2, window.innerHeight / 2, 25);

    const randomId = `SNG-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    setGeneratedPassId(randomId);
    setIsForged(true);
    gainXp(50);
    unlockAchievement("TICKET_CRAFTED");

    try {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#5D9C43", "#4FD9FF", "#FFD34D", "#E14E3D"],
      });
    } catch {}
  };

  const handleDownloadBadge = (e: React.MouseEvent) => {
    soundFx.playChestOpen();
    spawnBlockBreakParticles(e.clientX, e.clientY, 15);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundFx.playLevelUp();
    setContactSent(true);
    gainXp(20);

    setTimeout(() => {
      setContactSent(false);
      setContactName("");
      setContactEmail("");
      setContactMsg("");
    }, 4000);
  };

  const selectedClassObj = characterClasses.find((c) => c.id === characterClass) || characterClasses[0];

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

      {/* Header Banner */}
      <section className="relative z-10 px-4 sm:px-6 max-w-7xl mx-auto text-center mb-12">
        <span className="font-pixel-arcade text-xs text-[#4FD9FF] bg-[#4FD9FF]/10 px-3 py-1 border border-[#4FD9FF]/30 uppercase">
          CREDENTIAL FORGE & REGISTRATION
        </span>
        <h1 className="font-pixel-title text-3xl sm:text-5xl text-white mt-3 uppercase drop-shadow-[0_4px_0_#000]">
          FORGE YOUR FESTIVAL PASS
        </h1>
        <p className="text-xs sm:text-sm text-[#F0F0F8] font-sans max-w-2xl mx-auto mt-2 leading-relaxed drop-shadow-[0_2px_4px_#000]">
          Customize your official attendee credential, generate your unique QR access badge, and discover campus navigation guidelines for HBTU Kanpur.
        </p>
      </section>

      {/* TICKET PASS TIERS OVERVIEW */}
      <section className="px-4 sm:px-6 max-w-7xl mx-auto mb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* General Pass */}
          <div
            onClick={() => {
              setPassTier("general");
              soundFx.playClick();
            }}
            className={`p-6 border-4 cursor-pointer transition-all flex flex-col justify-between backdrop-blur-xl ${
              passTier === "general"
                ? "bg-[#0E1A0F]/95 border-[#55FF55] shadow-[0_0_30px_rgba(85,255,85,0.4)]"
                : "bg-[#090214]/90 border-[#2A1640] hover:border-[#5D9C43]"
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-pixel-arcade text-[10px] text-[#55FF55]">TIER 01</span>
                <span className="font-pixel-title text-base text-[#55FF55]">FREE</span>
              </div>
              <h3 className="font-pixel-title text-lg text-white">GENERAL OVERWORLD PASS</h3>
              <p className="text-xs text-[#E0E0EE] font-sans mt-2 leading-relaxed">
                Access to all workshops, keynotes, non-hackathon competitions, exhibition arenas, and EDM Night gates.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#2A2438] font-pixel-arcade text-[10px] text-[#55FF55]">
              {passTier === "general" ? "✓ SELECTED TIER" : "SELECT TIER →"}
            </div>
          </div>

          {/* Hacker Pass */}
          <div
            onClick={() => {
              setPassTier("hacker");
              soundFx.playClick();
            }}
            className={`p-6 border-4 cursor-pointer transition-all flex flex-col justify-between backdrop-blur-xl ${
              passTier === "hacker"
                ? "bg-[#140624]/95 border-[#4FD9FF] shadow-[0_0_35px_rgba(79,217,255,0.45)]"
                : "bg-[#090214]/90 border-[#2A1640] hover:border-[#4FD9FF]"
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-pixel-arcade text-[10px] text-[#4FD9FF]">FLAGSHIP</span>
                <span className="font-pixel-title text-base text-[#4FD9FF]">FREE</span>
              </div>
              <h3 className="font-pixel-title text-lg text-white">HACKNOVA 2.0 HACKER PASS</h3>
              <p className="text-xs text-[#E0E0EE] font-sans mt-2 leading-relaxed">
                Full 24-hour hackathon entry, complimentary food, midnight pizza, AWS cloud sandboxes, and ₹1.8L+ loot chest eligibility.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#2A2438] font-pixel-arcade text-[10px] text-[#4FD9FF]">
              {passTier === "hacker" ? "✓ SELECTED TIER" : "SELECT TIER →"}
            </div>
          </div>

          {/* VIP Pass */}
          <div
            onClick={() => {
              setPassTier("vip");
              soundFx.playClick();
            }}
            className={`p-6 border-4 cursor-pointer transition-all flex flex-col justify-between backdrop-blur-xl ${
              passTier === "vip"
                ? "bg-[#1A1405]/95 border-[#FFD34D] shadow-[0_0_35px_rgba(255,211,77,0.4)]"
                : "bg-[#090214]/90 border-[#2A1640] hover:border-[#FFD34D]"
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-pixel-arcade text-[10px] text-[#FFD34D]">EXCLUSIVE</span>
                <span className="font-pixel-title text-base text-[#FFD34D]">INVITE / VIP</span>
              </div>
              <h3 className="font-pixel-title text-lg text-white">VIP ALL-ACCESS PASS</h3>
              <p className="text-xs text-[#E0E0EE] font-sans mt-2 leading-relaxed">
                Front-row keynote seating, VIP networking lounge with speakers and sponsors, guaranteed physical swag kit, and fast-track entry.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#2A2438] font-pixel-arcade text-[10px] text-[#FFD34D]">
              {passTier === "vip" ? "✓ SELECTED TIER" : "SELECT TIER →"}
            </div>
          </div>
        </div>
      </section>

      {/* TICKET FORGE & REAL-TIME PREVIEW WORKBENCH */}
      <section className="px-4 sm:px-6 max-w-7xl mx-auto mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Generator Form Controls */}
          <div className="lg:col-span-6 bg-[#090214]/90 backdrop-blur-xl border-4 border-[#3A1E54] shadow-[0_8px_32px_rgba(0,0,0,0.9)] p-6 sm:p-8">
            <div className="flex items-center gap-3 border-b-2 border-[#2E1546] pb-4 mb-6">
              <div className="w-10 h-10 bg-[#FFD34D] border-2 border-black flex items-center justify-center text-xl shadow-[2px_2px_0_#000]">
                🛠️
              </div>
              <div>
                <h2 className="font-pixel-title text-lg sm:text-xl text-white">
                  TICKET FORGE WORKBENCH
                </h2>
                <p className="text-xs text-[#A0A0B0] font-sans">
                  Craft your character identity for Singularity 2K26
                </p>
              </div>
            </div>

            <form onSubmit={handleForgeTicket} className="space-y-4">
              <div>
                <label className="block font-pixel-sub text-[10px] text-[#A0A0B0] uppercase mb-1">
                  GAMER TAG / CALLSIGN:
                </label>
                <input
                  type="text"
                  required
                  value={gamerTag}
                  onChange={(e) => setGamerTag(e.target.value)}
                  className="w-full bg-[#100D1A] border-2 border-[#2A2438] focus:border-[#4FD9FF] p-2.5 text-xs text-white font-pixel-arcade outline-none"
                />
              </div>

              <div>
                <label className="block font-pixel-sub text-[10px] text-[#A0A0B0] uppercase mb-1">
                  FULL ATTENDEE NAME:
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-[#100D1A] border-2 border-[#2A2438] focus:border-[#4FD9FF] p-2.5 text-xs text-white font-sans outline-none"
                />
              </div>

              <div>
                <label className="block font-pixel-sub text-[10px] text-[#A0A0B0] uppercase mb-1">
                  COLLEGE / UNIVERSITY:
                </label>
                <input
                  type="text"
                  required
                  value={collegeName}
                  onChange={(e) => setCollegeName(e.target.value)}
                  className="w-full bg-[#100D1A] border-2 border-[#2A2438] focus:border-[#4FD9FF] p-2.5 text-xs text-white font-sans outline-none"
                />
              </div>

              {/* Character Class Picker */}
              <div>
                <label className="block font-pixel-sub text-[10px] text-[#A0A0B0] uppercase mb-2">
                  CHOOSE CHARACTER CLASS:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {characterClasses.map((cls) => {
                    const isSelected = characterClass === cls.id;
                    return (
                      <button
                        type="button"
                        key={cls.id}
                        onClick={() => {
                          setCharacterClass(cls.id);
                          soundFx.playClick();
                        }}
                        className={`p-2 border-2 text-left flex items-center gap-2 transition-all ${
                          isSelected
                            ? "bg-[#1E172E] border-[#4FD9FF] text-white shadow-[0_0_10px_rgba(79,217,255,0.3)]"
                            : "bg-[#100D1A] border-[#2A2438] text-[#A0A0B0] hover:text-white"
                        }`}
                      >
                        <span className="text-lg">{cls.icon}</span>
                        <span className="font-pixel-arcade text-[9px] truncate">
                          {cls.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <button
                type="submit"
                className="btn-voxel btn-voxel-gold text-xs w-full py-3.5 mt-2"
              >
                ⚒️ CRAFT PASS CREDENTIAL (+50 XP)
              </button>
            </form>
          </div>

          {/* Right Column: Real-Time Generated 3D Voxel Pass Card */}
          <div className="lg:col-span-6 flex flex-col items-center">
            <div className="w-full max-w-md bg-[#130920] border-4 border-[#4FD9FF] shadow-[0_10px_0_#000,0_0_45px_rgba(79,217,255,0.3)] p-6 relative select-none">
              {/* Top Pass Header */}
              <div className="flex items-center justify-between border-b-2 border-[#2E1546] pb-3 mb-4">
                <SingularityLogo size="sm" />
                <span
                  className="font-pixel-arcade text-[9px] px-2 py-0.5 border font-bold uppercase"
                  style={{
                    color: selectedClassObj.color,
                    borderColor: `${selectedClassObj.color}60`,
                    backgroundColor: `${selectedClassObj.color}15`,
                  }}
                >
                  {passTier.toUpperCase()} PASS
                </span>
              </div>

              {/* Pass Body */}
              <div className="flex items-start gap-4 mb-5">
                <div
                  className="w-20 h-20 border-2 flex items-center justify-center text-4xl flex-shrink-0 bg-[#0B0314]"
                  style={{ borderColor: selectedClassObj.color }}
                >
                  {selectedClassObj.icon}
                </div>

                <div className="flex-1 space-y-1">
                  <span className="text-[9px] font-pixel-sub text-[#FFD34D] block uppercase">
                    {selectedClassObj.label}
                  </span>
                  <h4 className="font-pixel-title text-sm sm:text-base text-white truncate">
                    {gamerTag || "HackerAnon"}
                  </h4>
                  <p className="text-xs text-[#4FD9FF] font-sans font-medium truncate">
                    {fullName || "Registered Attendee"}
                  </p>
                  <p className="text-xs text-[#808098] font-sans truncate">
                    🏛️ {collegeName || "HBTU Kanpur"}
                  </p>
                </div>
              </div>

              {/* Pass Barcode & QR Simulation */}
              <div className="p-3 bg-[#0A0410] border border-[#2A123E] flex items-center justify-between gap-4">
                <div className="space-y-1 font-sans text-xs text-[#A0A0B0]">
                  <div className="font-pixel-arcade text-[9px] text-[#55FF55]">
                    CREDENTIAL ID:
                  </div>
                  <div className="font-pixel-title text-xs text-white">
                    {generatedPassId}
                  </div>
                  <div className="text-[10px]">📍 HBTU East Campus · Oct 16–18</div>
                </div>

                <div className="w-16 h-16 bg-white p-1 border-2 border-black flex items-center justify-center">
                  <QrCode className="w-full h-full text-black" />
                </div>
              </div>

              {/* Holographic Footer Watermark */}
              <div className="mt-4 pt-2 border-t border-[#2E1546] flex items-center justify-between text-[8px] font-pixel-arcade text-[#707085]">
                <span>SECURITY PROTOCOL: VERIFIED</span>
                <span className="text-[#55FF55]">● ACTIVE CREDENTIAL</span>
              </div>
            </div>

            {/* Print / Download Button */}
            <div className="mt-4 w-full max-w-md flex items-center gap-3">
              <button
                onClick={handleDownloadBadge}
                className="btn-voxel btn-voxel-diamond text-xs flex-1 py-3 flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>DOWNLOAD / PRINT BADGE</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* VENUE & CAMPUS NAVIGATION GUIDE */}
      <section className="px-4 sm:px-6 max-w-7xl mx-auto mb-20">
        <div className="bg-[#140C20] border-4 border-[#3A3250] p-6 sm:p-8">
          <div className="text-center mb-8">
            <span className="font-pixel-arcade text-xs text-[#55FF55] uppercase">
              CAMPUS COORDINATES & TRAVEL
            </span>
            <h2 className="font-pixel-title text-2xl sm:text-3xl text-white mt-1">
              VENUE & TRAVEL GUIDE
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 bg-[#0F0819] border border-[#2B173E] space-y-2">
              <div className="flex items-center gap-2 text-[#FFD34D] font-pixel-arcade text-xs">
                <MapPin className="w-4 h-4" />
                <span>PHYSICAL VENUE</span>
              </div>
              <h4 className="font-bold text-white text-sm">HBTU East Campus</h4>
              <p className="text-xs text-[#A0A0B0] font-sans leading-relaxed">
                Nawabganj, Kanpur, Uttar Pradesh 208002. Main activities are staged across the University Auditorium, RCC Labs, and Open Air Theatre (OAT).
              </p>
            </div>

            <div className="p-5 bg-[#0F0819] border border-[#2B173E] space-y-2">
              <div className="flex items-center gap-2 text-[#4FD9FF] font-pixel-arcade text-xs">
                <Train className="w-4 h-4" />
                <span>BY TRAIN</span>
              </div>
              <h4 className="font-bold text-white text-sm">Kanpur Central (CNB)</h4>
              <p className="text-xs text-[#A0A0B0] font-sans leading-relaxed">
                Located ~9 km from campus. Direct auto-rickshaws, app cabs (Uber/Ola), and city buses run continuously to HBTU Nawabganj gate.
              </p>
            </div>

            <div className="p-5 bg-[#0F0819] border border-[#2B173E] space-y-2">
              <div className="flex items-center gap-2 text-[#55FF55] font-pixel-arcade text-xs">
                <Plane className="w-4 h-4" />
                <span>BY AIR</span>
              </div>
              <h4 className="font-bold text-white text-sm">Kanpur (KNU) / Lucknow (LKO)</h4>
              <p className="text-xs text-[#A0A0B0] font-sans leading-relaxed">
                Kanpur Airport (Chakeri) connects key metros. Chaudhary Charan Singh International Airport (Lucknow) is ~85 km away with express bus and taxi shuttles.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* OFFICIAL CONTACT & INQUIRIES FORM */}
      <section className="px-4 sm:px-6 max-w-4xl mx-auto mb-20">
        <div className="bg-[#161222] border-4 border-[#3A3250] p-6 sm:p-8">
          <div className="text-center mb-6">
            <span className="font-pixel-arcade text-xs text-[#FFD34D] uppercase">
              DIRECT DISPATCH
            </span>
            <h2 className="font-pixel-title text-xl sm:text-2xl text-white mt-1">
              CONTACT ORGANIZING SECRETARIAT
            </h2>
            <p className="text-xs text-[#A0A0B0] font-sans mt-1">
              Have questions regarding registrations, team formations, or partnerships?
            </p>
          </div>

          <form onSubmit={handleContactSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-pixel-sub text-[10px] text-[#A0A0B0] uppercase mb-1">
                  YOUR NAME:
                </label>
                <input
                  type="text"
                  required
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  className="w-full bg-[#0F0A18] border border-[#2B173E] focus:border-[#4FD9FF] p-2.5 text-xs text-white font-sans outline-none"
                />
              </div>

              <div>
                <label className="block font-pixel-sub text-[10px] text-[#A0A0B0] uppercase mb-1">
                  EMAIL ADDRESS:
                </label>
                <input
                  type="email"
                  required
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  className="w-full bg-[#0F0A18] border border-[#2B173E] focus:border-[#4FD9FF] p-2.5 text-xs text-white font-sans outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block font-pixel-sub text-[10px] text-[#A0A0B0] uppercase mb-1">
                MESSAGE / QUERY:
              </label>
              <textarea
                required
                rows={3}
                value={contactMsg}
                onChange={(e) => setContactMsg(e.target.value)}
                placeholder="Ask about travel, accommodations, sponsorships or registrations..."
                className="w-full bg-[#0F0A18] border border-[#2B173E] focus:border-[#4FD9FF] p-2.5 text-xs text-white font-sans outline-none resize-none"
              />
            </div>

            <button
              type="submit"
              className="btn-voxel btn-voxel-diamond text-xs w-full py-3 flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>SEND INQUIRY TO ORGANIZERS</span>
            </button>

            {contactSent && (
              <div className="p-3 bg-[#172E15] border border-[#55FF55] text-xs font-pixel-arcade text-[#55FF55] text-center">
                ✓ DISPATCH RECEIVED! OUR TEAM WILL RESPOND PROMPTLY.
              </div>
            )}
          </form>
        </div>
      </section>

      {/* Global Footer */}
      <VoxelFooter />
    </main>
  );
}
