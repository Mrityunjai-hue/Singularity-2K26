export interface VillagerTrade {
  id: string;
  question: string;
  category: "General" | "HackNova" | "Passes" | "Travel";
  villagerResponse: string;
  emeraldCost: number;
  itemGiven: string;
}

export const VILLAGER_TRADES: VillagerTrade[] = [
  {
    id: "trade-what-is",
    question: "What is Singularity 2K26 and who can attend?",
    category: "General",
    villagerResponse: "Hrrr! Singularity 2K26 is the grand 3-day tech & cultural fest at HBTU Kanpur, organized by N8N Data Science Community, AWS SBG HBTU, and Department of Mathematics. Students from any recognized college or school are welcome to attend!",
    emeraldCost: 1,
    itemGiven: "📜 Fest Map Scroll",
  },
  {
    id: "trade-hackathon-info",
    question: "How do I participate in HackNova 2.0 Hackathon?",
    category: "HackNova",
    villagerResponse: "Hrrrngh! Festival access and technical workshops are completely free for all verified attendees! HackNova 2.0 hackathon registration is handled directly through its official portal, providing meals, mentorship, cloud sandboxes, and grand rewards!",
    emeraldCost: 2,
    itemGiven: "💎 Diamond Pass Key",
  },
  {
    id: "trade-accommodation",
    question: "Will outstation participants get hostel rooms to sleep?",
    category: "Travel",
    villagerResponse: "Yes, fellow traveler! Verified outstation participants shortlisted for HackNova or major competitions can request campus hostel accommodation during ticket pass verification.",
    emeraldCost: 1,
    itemGiven: "🛏️ Cozy Bed Roll",
  },
  {
    id: "trade-edm-pass",
    question: "Do I need a separate pass for the PULSE EDM Night?",
    category: "Passes",
    villagerResponse: "All registered Singularity 2K26 pass holders get access to the grand EDM Night! Just show your digital QR badge at the Open Air Theatre gates before sundown!",
    emeraldCost: 1,
    itemGiven: "✨ Glowstone Wristband",
  },
  {
    id: "trade-bring-items",
    question: "What items should I equip in my inventory?",
    category: "General",
    villagerResponse: "Equip your college ID card, your trusty laptop + power brick, extension cords, government photo ID, and lots of hacker curiosity! No harmful items allowed past the iron doors.",
    emeraldCost: 1,
    itemGiven: "🎒 Adventure Backpack",
  },
  {
    id: "trade-certificates",
    question: "Will all participants get official certificates?",
    category: "General",
    villagerResponse: "Hrrr! Every verified attendee receives an official certificate of participation, plus exclusive custom pixel badges!",
    emeraldCost: 2,
    itemGiven: "🏆 Certificate of Valor",
  },
];
