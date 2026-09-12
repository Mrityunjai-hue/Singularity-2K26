"use client";

import React, { useState } from "react";
import { SPONSORS_TIERS, SPONSOR_PERKS_MATRIX, SponsorTier } from "@/data/sponsors";
import { soundFx } from "@/lib/soundFx";
import { spawnBlockBreakParticles } from "@/lib/particles";
import { VoxelFooter } from "@/components/ui/VoxelFooter";
import { Zap, ExternalLink, Download, Mail, CheckCircle2, Shield } from "lucide-react";

export default function SponsorsPage() {
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleDownloadBrochure = (e: React.MouseEvent) => {
    soundFx.playChestOpen();
    spawnBlockBreakParticles(e.clientX, e.clientY, 15);
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 4000);
  };

  return (
    <main className="min-h-screen pt-20 sm:pt-24 relative bg-[#07010C]">
      {/* Background Image: 4K Ultra-Vivid Celestial Nether Hall */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat opacity-80 brightness-115 pointer-events-none"
        style={{
          backgroundImage: "url('/images/bg_nether_celestial_4k.jpg')",
        }}
      />
      <div className="fixed inset-0 bg-gradient-to-b from-[#07010C]/60 via-transparent to-[#07010C] pointer-events-none" />

      {/* Header Banner */}
      <section className="relative z-10 px-4 sm:px-6 max-w-7xl mx-auto text-center mb-12">
        <span className="font-pixel-arcade text-xs text-[#55FF55] bg-[#55FF55]/10 px-3 py-1 border border-[#55FF55]/30 uppercase font-bold">
          COSMIC PATRONS & INDUSTRY PARTNERS
        </span>
        <h1 className="font-pixel-title text-3xl sm:text-5xl text-white font-bold mt-3 uppercase drop-shadow-[0_4px_0_#000]">
          ORE-THEMED SPONSOR HALL
        </h1>
        <p className="text-xs sm:text-sm text-[#F0F0F8] font-sans max-w-2xl mx-auto mt-2 leading-relaxed drop-shadow-[0_2px_4px_#000]">
          The driving bedrock of Singularity 2K26. Our patrons empower infrastructure, computational grants, recruitment pipelines, and prize vaults.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 mt-6">
          <button
            onClick={handleDownloadBrochure}
            className="btn-voxel btn-voxel-gold text-xs flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>DOWNLOAD SPONSORSHIP BROCHURE (PDF)</span>
          </button>

          <a
            href="mailto:singularity.sponsors@hbtu.ac.in"
            className="btn-voxel btn-voxel-stone text-xs flex items-center gap-2"
          >
            <Mail className="w-4 h-4" />
            <span>BECOME A SPONSOR</span>
          </a>
        </div>

        {downloadSuccess && (
          <div className="mt-4 inline-block bg-[#1B2E15] border-2 border-[#55FF55] px-4 py-2 text-xs font-pixel-arcade text-[#55FF55] animate-bounce font-bold">
            ✓ BROCHURE PROSPECTUS DOWNLOAD INITIATED!
          </div>
        )}
      </section>

      {/* TIERED ORE SECTIONS */}
      <section className="px-4 sm:px-6 max-w-7xl mx-auto space-y-16 mb-20">
        {SPONSORS_TIERS.map((tier) => (
          <div key={tier.id} className="space-y-6">
            {/* Tier Banner */}
            <div
              className="p-4 sm:p-5 border-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-[0_6px_0_#000]"
              style={{
                backgroundColor: "#130A1F",
                borderColor: tier.borderHex,
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 border-2 flex items-center justify-center text-xl flex-shrink-0"
                  style={{
                    backgroundColor: `${tier.colorHex}20`,
                    borderColor: tier.colorHex,
                  }}
                >
                  {tier.id === "diamond" ? "💎" : tier.id === "gold" ? "🟡" : tier.id === "iron" ? "⚪" : "🔴"}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-pixel-title text-base sm:text-lg text-white font-bold">
                      {tier.name}
                    </h3>
                    <span
                      className="font-pixel-arcade text-[9px] px-1.5 py-0.5 border font-bold"
                      style={{
                        color: tier.colorHex,
                        borderColor: `${tier.colorHex}50`,
                      }}
                    >
                      {tier.badge}
                    </span>
                  </div>
                  <p className="text-xs text-[#D8D8EE] font-sans mt-0.5">
                    {tier.tagline}
                  </p>
                </div>
              </div>
            </div>

            {/* Sponsor Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tier.sponsors.map((sponsor) => (
                <div
                  key={sponsor.name}
                  className="inventory-slot-card p-6 flex flex-col justify-between"
                  style={{
                    borderTopColor: `${tier.colorHex}80`,
                  }}
                >
                  <div>
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="px-3 py-2 bg-[#0E0617] border-2 border-[#2B163B] font-pixel-title text-xs text-white font-bold">
                        {sponsor.logoText}
                      </div>
                      <span
                        className="font-pixel-arcade text-[9px] px-1.5 py-0.5 border font-bold"
                        style={{
                          color: tier.colorHex,
                          borderColor: `${tier.colorHex}40`,
                        }}
                      >
                        {sponsor.category}
                      </span>
                    </div>

                    <h4 className="font-pixel-heading text-lg font-bold text-white mb-2">
                      {sponsor.name}
                    </h4>

                    <p className="text-xs text-[#D8D8EE] font-sans leading-relaxed mb-4">
                      {sponsor.desc}
                    </p>

                    {/* Perks Offered */}
                    <div className="space-y-1.5 mb-4">
                      <span className="font-pixel-arcade text-[9px] text-[#A0A0C0] block font-bold">
                        PARTNER PERKS:
                      </span>
                      {sponsor.perksOffered.map((p, pidx) => (
                        <div key={pidx} className="flex items-center gap-1.5 text-xs text-[#E0E0EE] font-sans">
                          <span className="text-[#55FF55] text-[10px]">✓</span>
                          <span>{p}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <a
                    href={sponsor.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      soundFx.playClick();
                      spawnBlockBreakParticles(e.clientX, e.clientY, 8);
                    }}
                    className="pt-3 border-t border-[#2A2438] flex items-center justify-between font-pixel-arcade text-[10px] text-[#4FD9FF] hover:text-white transition-colors font-bold"
                  >
                    <span>VISIT PARTNER PORTAL</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* ORE PERKS COMPARISON MATRIX */}
      <section className="px-4 sm:px-6 max-w-7xl mx-auto mb-20">
        <div className="bg-[#140C20] border-4 border-[#3A3250] shadow-[0_8px_0_#000] p-6 sm:p-8">
          <div className="text-center mb-8">
            <span className="font-pixel-arcade text-xs text-[#FFD34D] uppercase font-bold">
              TIER COMPARISON MATRIX
            </span>
            <h2 className="font-pixel-title text-xl sm:text-2xl text-white font-bold mt-1 drop-shadow-[0_2px_4px_#000]">
              SPONSORSHIP DELIVERABLES BY ORE TIER
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-sans text-xs border-collapse">
              <thead>
                <tr className="border-b-2 border-[#3A3250] bg-[#1B102B]">
                  <th className="p-3 font-pixel-arcade text-[10px] text-[#E0E0EE] font-bold">DELIVERABLE / PERK</th>
                  <th className="p-3 font-pixel-arcade text-[10px] text-[#4FD9FF] font-bold">💎 DIAMOND</th>
                  <th className="p-3 font-pixel-arcade text-[10px] text-[#FFD34D] font-bold">🟡 GOLD</th>
                  <th className="p-3 font-pixel-arcade text-[10px] text-[#C4CBCE] font-bold">⚪ IRON</th>
                  <th className="p-3 font-pixel-arcade text-[10px] text-[#E14E3D] font-bold">🔴 REDSTONE</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2B1B3F]">
                {SPONSOR_PERKS_MATRIX.map((row, idx) => (
                  <tr key={idx} className="hover:bg-[#1C122C] transition-colors">
                    <td className="p-3 text-white font-medium">{row.perk}</td>
                    <td className="p-3 text-[#4FD9FF]">{row.diamond}</td>
                    <td className="p-3 text-[#FFD34D]">{row.gold}</td>
                    <td className="p-3 text-[#C4CBCE]">{row.iron}</td>
                    <td className="p-3 text-[#E14E3D]">{row.redstone}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Global Footer */}
      <VoxelFooter />
    </main>
  );
}
