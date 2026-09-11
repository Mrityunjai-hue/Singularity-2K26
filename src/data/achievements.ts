export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  xpReward: number;
}

export const ACHIEVEMENTS: Record<string, Achievement> = {
  SPAWNED: {
    id: "SPAWNED",
    title: "Spawn in the Overworld",
    description: "You entered Singularity 2K26 website!",
    icon: "🌱",
    xpReward: 50,
  },
  HOTBAR_COLLECTOR: {
    id: "HOTBAR_COLLECTOR",
    title: "Inventory Master",
    description: "Bookmarked your first quest to the hotbar tray.",
    icon: "🎒",
    xpReward: 100,
  },
  VILLAGER_TRADE: {
    id: "VILLAGER_TRADE",
    title: "Master Negotiator",
    description: "Traded emeralds with the village elder for fest secrets.",
    icon: "💎",
    xpReward: 150,
  },
  TICKET_CRAFTED: {
    id: "TICKET_CRAFTED",
    title: "Pass Forged in Obsidian",
    description: "Customized and generated your official Singularity ticket pass!",
    icon: "🎟️",
    xpReward: 200,
  },
  KONAMI_CHAMPION: {
    id: "KONAMI_CHAMPION",
    title: "Arcade Cheat Master",
    description: "Discovered the legendary Konami code secret arena!",
    icon: "🕹️",
    xpReward: 300,
  },
  CAVE_EXPLORER: {
    id: "CAVE_EXPLORER",
    title: "Deep Dark Descent",
    description: "Explored the HackNova 2.0 obsidian cave.",
    icon: "⛏️",
    xpReward: 100,
  },
};
