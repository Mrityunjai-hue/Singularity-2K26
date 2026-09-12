export interface TeamMember {
  id: string;
  name: string;
  role: string;
  subteam: "core" | "tech" | "design" | "management" | "faculty";
  subteamLabel: string;
  departmentLabel: string;
  badgeLabel: string;
}

export const TEAM_MEMBERS: TeamMember[] = [
  // Faculty Patrons
  {
    id: "fac-1",
    name: "Name Here",
    role: "Chief Patron",
    subteam: "faculty",
    subteamLabel: "Faculty Patrons",
    departmentLabel: "University Leadership",
    badgeLabel: "PATRON BOARD",
  },
  {
    id: "fac-2",
    name: "Name Here",
    role: "Faculty Convener",
    subteam: "faculty",
    subteamLabel: "Faculty Patrons",
    departmentLabel: "Department of Mathematics",
    badgeLabel: "FACULTY ADVISORY",
  },
  {
    id: "fac-3",
    name: "Name Here",
    role: "Faculty Advisor",
    subteam: "faculty",
    subteamLabel: "Faculty Patrons",
    departmentLabel: "AWS SBG / Computer Science",
    badgeLabel: "FACULTY ADVISORY",
  },

  // Core Leadership
  {
    id: "core-1",
    name: "Name Here",
    role: "Festival Convener",
    subteam: "core",
    subteamLabel: "Core Leadership",
    departmentLabel: "Student Secretariat",
    badgeLabel: "CORE LEADERSHIP",
  },
  {
    id: "core-2",
    name: "Name Here",
    role: "Co-Convener",
    subteam: "core",
    subteamLabel: "Core Leadership",
    departmentLabel: "Student Secretariat",
    badgeLabel: "CORE LEADERSHIP",
  },
  {
    id: "core-3",
    name: "Name Here",
    role: "Treasurer & Finance Lead",
    subteam: "core",
    subteamLabel: "Core Leadership",
    departmentLabel: "Student Secretariat",
    badgeLabel: "CORE LEADERSHIP",
  },

  // Tech & Systems
  {
    id: "tech-1",
    name: "Name Here",
    role: "Lead Platform Architect",
    subteam: "tech",
    subteamLabel: "Tech & Systems",
    departmentLabel: "Technical Team",
    badgeLabel: "TECH & SYSTEMS",
  },
  {
    id: "tech-2",
    name: "Name Here",
    role: "Cybersecurity & CTF Lead",
    subteam: "tech",
    subteamLabel: "Tech & Systems",
    departmentLabel: "Technical Team",
    badgeLabel: "TECH & SYSTEMS",
  },

  // Design & Creative
  {
    id: "des-1",
    name: "Name Here",
    role: "Creative & UI/UX Lead",
    subteam: "design",
    subteamLabel: "Creative & Design",
    departmentLabel: "Design Team",
    badgeLabel: "CREATIVE & DESIGN",
  },

  // Operations & PR
  {
    id: "mgmt-1",
    name: "Name Here",
    role: "Operations & Logistics Lead",
    subteam: "management",
    subteamLabel: "Operations & PR",
    departmentLabel: "Operations Team",
    badgeLabel: "OPERATIONS & PR",
  },
];
