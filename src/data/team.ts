export interface TeamMember {
  id: string;
  name: string;
  role: string;
  subteam: "core" | "tech" | "design" | "management" | "faculty";
  subteamLabel: string;
  collegeBranch: string;
  playerLevel: number;
  hpStat: number;
  manaStat: number;
  toolItem: "pickaxe" | "redstone" | "crafting-table" | "potion" | "sword" | "book" | "compass";
  toolLabel: string;
  specialMove: string;
}

export const TEAM_MEMBERS: TeamMember[] = [
  // Faculty Patrons
  {
    id: "fac-1",
    name: "Chief Patron & University Leadership",
    role: "Patron Board, HBTU Kanpur",
    subteam: "faculty",
    subteamLabel: "Patron Board",
    collegeBranch: "HBTU Kanpur",
    playerLevel: 99,
    hpStat: 9999,
    manaStat: 9999,
    toolItem: "book",
    toolLabel: "Crown of Governance",
    specialMove: "Institutional Vision Cast",
  },
  {
    id: "fac-2",
    name: "Faculty Convener, Mathematics",
    role: "Head & Faculty Advisors",
    subteam: "faculty",
    subteamLabel: "Faculty Advisory",
    collegeBranch: "Department of Mathematics",
    playerLevel: 90,
    hpStat: 8800,
    manaStat: 9400,
    toolItem: "book",
    toolLabel: "Grimoire of Topology",
    specialMove: "Discrete Graph Optimization",
  },
  {
    id: "fac-3",
    name: "Faculty Advisor, AWS SBG",
    role: "Computer Science & Engineering Advisory",
    subteam: "faculty",
    subteamLabel: "Faculty Advisory",
    collegeBranch: "HBTU Kanpur",
    playerLevel: 88,
    hpStat: 8500,
    manaStat: 9000,
    toolItem: "redstone",
    toolLabel: "Cloud Conduit",
    specialMove: "Serverless Scaling Surge",
  },

  // Core Leadership
  {
    id: "core-1",
    name: "Festival Convener",
    role: "AWS SBG Lead Coordinator",
    subteam: "core",
    subteamLabel: "Core Leadership",
    collegeBranch: "Student Secretariat",
    playerLevel: 75,
    hpStat: 1500,
    manaStat: 1100,
    toolItem: "sword",
    toolLabel: "Netherite Blade of Leadership",
    specialMove: "Full-Stack Convergence Burst",
  },
  {
    id: "core-2",
    name: "Co-Convener",
    role: "N8N Community Lead Coordinator",
    subteam: "core",
    subteamLabel: "Core Leadership",
    collegeBranch: "Student Secretariat",
    playerLevel: 74,
    hpStat: 1450,
    manaStat: 1150,
    toolItem: "redstone",
    toolLabel: "Infinite Redstone Repeater",
    specialMove: "Autonomous Agent Orchestration",
  },
  {
    id: "core-3",
    name: "Treasurer & Finance Lead",
    role: "Department of Mathematics Secretariat",
    subteam: "core",
    subteamLabel: "Core Leadership",
    collegeBranch: "Student Secretariat",
    playerLevel: 70,
    hpStat: 1400,
    manaStat: 1000,
    toolItem: "crafting-table",
    toolLabel: "Emerald Vault Ledger",
    specialMove: "Budget Equilibrium Matrix",
  },

  // Tech & Engineering
  {
    id: "tech-1",
    name: "Lead Platform Architect",
    role: "Full-Stack & Systems Engineering",
    subteam: "tech",
    subteamLabel: "Tech & Systems",
    collegeBranch: "Technical Team",
    playerLevel: 68,
    hpStat: 1300,
    manaStat: 1400,
    toolItem: "pickaxe",
    toolLabel: "Diamond Pickaxe of React",
    specialMove: "Sub-Millisecond Voxel Render",
  },
  {
    id: "tech-2",
    name: "Cybersecurity & CTF Lead",
    role: "Infrastructure & Security Arena",
    subteam: "tech",
    subteamLabel: "Tech & Systems",
    collegeBranch: "Technical Team",
    playerLevel: 65,
    hpStat: 1250,
    manaStat: 1300,
    toolItem: "sword",
    toolLabel: "Enchanted Shield of Kali",
    specialMove: "Buffer Overflow Annihilation",
  },

  // Design & Media
  {
    id: "des-1",
    name: "Creative & UI/UX Director",
    role: "Voxel Design & Brand Identity",
    subteam: "design",
    subteamLabel: "Creative & Design",
    collegeBranch: "Design Team",
    playerLevel: 67,
    hpStat: 1200,
    manaStat: 1500,
    toolItem: "potion",
    toolLabel: "Potion of Radiant Aesthetics",
    specialMove: "Pixel-Perfect Shading Ray",
  },
  {
    id: "mgmt-1",
    name: "Operations & Logistics Head",
    role: "Stage Management & Cultural Coordination",
    subteam: "management",
    subteamLabel: "Operations & PR",
    collegeBranch: "Operations Team",
    playerLevel: 69,
    hpStat: 1550,
    manaStat: 950,
    toolItem: "crafting-table",
    toolLabel: "Stage Blueprint Workbench",
    specialMove: "Logistical Grid Mastery",
  },
];
