import type { Metadata } from "next";
import { Press_Start_2P, VT323, Silkscreen, Pixelify_Sans, Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import { VoxelNavbar } from "@/components/ui/VoxelNavbar";
import { VoxelHotbar } from "@/components/ui/VoxelHotbar";
import { AchievementProvider } from "@/components/ui/AchievementSystem";
import { KonamiModal } from "@/components/ui/KonamiModal";
import { CustomCursor } from "@/components/ui/CustomCursor";

const pressStart2P = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-arcade",
  display: "swap",
});

const vt323 = VT323({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-vt323",
  display: "swap",
});

const silkscreen = Silkscreen({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-silkscreen",
  display: "swap",
});

const pixelify = Pixelify_Sans({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-pixelify",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SINGULARITY 2K26 — Minecraft Voxel World × Retro Arcade Fest | HBTU",
  description:
    "Official 3-Day Tech & Cultural Festival organized by N8N Data Science Community in collaboration with AWS SBG HBTU & Department of Mathematics, HBTU Kanpur. Featuring HackNova 2.0, masterclasses, Mathletics, CTF, and grand EDM Night.",
  keywords: [
    "Singularity 2K26",
    "HackNova 2.0",
    "HBTU Kanpur",
    "N8N Data Science Community",
    "AWS SBG HBTU",
    "Department of Mathematics HBTU",
    "Minecraft Techfest",
    "Retro Arcade UI",
    "Voxel Techfest",
  ],
  authors: [{ name: "N8N × AWS SBG × Dept. of Mathematics HBTU" }],
  openGraph: {
    title: "SINGULARITY 2K26 — Where Code Meets Craft",
    description: "3 Days. Infinite Blocks of Possibility. Build. Battle. Break the Loop.",
    siteName: "SINGULARITY 2K26",
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${pressStart2P.variable} ${vt323.variable} ${silkscreen.variable} ${pixelify.variable} ${spaceGrotesk.variable} ${inter.variable} dark scroll-smooth`}
    >
      <body className="bg-[#0B0014] text-[#F5F5F0] font-sans antialiased selection:bg-[#4FD9FF]/30 selection:text-[#4FD9FF] overflow-x-hidden min-h-screen pb-24">
        <AchievementProvider>
          {/* Custom Pixel Crosshair Cursor */}
          <CustomCursor />

          {/* Sticky Voxel Navigation Bar */}
          <VoxelNavbar />

          {/* Main Page Body */}
          <div className="min-h-screen relative z-10">{children}</div>

          {/* Floating Hotbar HUD Inventory */}
          <VoxelHotbar />

          {/* Easter Egg Konami Code Modal */}
          <KonamiModal />
        </AchievementProvider>
      </body>
    </html>
  );
}
