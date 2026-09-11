export interface SponsorTier {
  id: "diamond" | "gold" | "iron" | "redstone";
  name: string;
  badge: string;
  tagline: string;
  colorHex: string;
  borderHex: string;
  bgGradient: string;
  sponsors: SponsorItem[];
}

export interface SponsorItem {
  name: string;
  category: string;
  logoText: string;
  desc: string;
  website: string;
  perksOffered: string[];
}

export const SPONSORS_TIERS: SponsorTier[] = [
  {
    id: "diamond",
    name: "Diamond Tier",
    badge: "TITLE SPONSORS",
    tagline: "The rare foundation powering the core of Singularity 2K26.",
    colorHex: "#4FD9FF",
    borderHex: "#00B4D8",
    bgGradient: "from-[#0B0014] via-[#051824] to-[#0B0014]",
    sponsors: [
      {
        name: "Amazon Web Services",
        category: "Cloud & AI Title Patron",
        logoText: "AWS SBG",
        desc: "World's most comprehensive and broadly adopted cloud platform, powering global developers with scalable compute, storage, and generative AI models.",
        website: "https://aws.amazon.com",
        perksOffered: ["$10,000+ in attendee credits", "Direct recruitment interviews", "Exclusive keynote session", "Dedicated booth at HackNova Arena"],
      },
      {
        name: "n8n.io",
        category: "Workflow Automation & AI Orchestration",
        logoText: "n8n",
        desc: "The open-source workflow automation platform that gives technical teams the flexibility to connect anything with custom code and AI agents.",
        website: "https://n8n.io",
        perksOffered: ["Enterprise cloud access", "Autonomous agent bounties", "Hackathon mentor track", "Premium developer swag kit"],
      },
    ],
  },
  {
    id: "gold",
    name: "Gold Tier",
    badge: "POWERED BY",
    tagline: "Empowering builder infrastructure, computational clusters, and prize chests.",
    colorHex: "#FFD34D",
    borderHex: "#FFAA00",
    bgGradient: "from-[#0B0014] via-[#1E1704] to-[#0B0014]",
    sponsors: [
      {
        name: "Department of Mathematics, HBTU",
        category: "Academic & Mathematical Patron",
        logoText: "DoM HBTU",
        desc: "Premier department cultivating analytical rigor, theoretical computer science, cryptography, and quantitative research since 1921.",
        website: "https://hbtu.ac.in",
        perksOffered: ["Mathletics Olympiad funding", "Research fellowship fast-tracks", "Academic keynote sessions"],
      },
      {
        name: "Devfolio",
        category: "Official Hackathon Platform Partner",
        logoText: "Devfolio",
        desc: "India's largest and fastest-growing community of builders, revolutionizing hackathons and developer credentialing.",
        website: "https://devfolio.co",
        perksOffered: ["Seamless one-click check-in", "Automated project judging matrix", "Hacker profile badges"],
      },
      {
        name: "GitHub Education",
        category: "Developer Tools Partner",
        logoText: "GitHub",
        desc: "Empowering the next generation of software creators with GitHub Student Developer Pack and Copilot tools.",
        website: "https://education.github.com",
        perksOffered: ["GitHub Copilot access", "Octocat collectible swag packs", "Open source workshop kits"],
      },
    ],
  },
  {
    id: "iron",
    name: "Iron Tier",
    badge: "ASSOCIATE PATRONS",
    tagline: "Solid bedrock providing tools, hardware kits, and developer sandboxes.",
    colorHex: "#C4CBCE",
    borderHex: "#8B8B8B",
    bgGradient: "from-[#0B0014] via-[#121618] to-[#0B0014]",
    sponsors: [
      {
        name: "Postman",
        category: "API Platform Partner",
        logoText: "Postman",
        desc: "API platform for building and using APIs, simplifying each step of the API lifecycle and streamlining collaboration.",
        website: "https://postman.com",
        perksOffered: ["API challenge bounties", "Postman Student Expert badges", "Special edition merchandise"],
      },
      {
        name: "Polygon Labs",
        category: "Web3 & Zero-Knowledge Partner",
        logoText: "Polygon",
        desc: "Fundamental blockchain scalability suite delivering fast, low-cost transactions with cutting-edge zero-knowledge technology.",
        website: "https://polygon.technology",
        perksOffered: ["Web3 track pool prize", "Devnet gas subsidies", "Mentorship from core devs"],
      },
      {
        name: "NordVPN",
        category: "Cybersecurity & Privacy Partner",
        logoText: "Nord Security",
        desc: "Global leader in digital privacy, network encryption, and next-generation cybersecurity solutions.",
        website: "https://nordvpn.com",
        perksOffered: ["CTF prize pool vouchers", "Complimentary 1-year cybersecurity passes"],
      },
    ],
  },
  {
    id: "redstone",
    name: "Redstone Tier",
    badge: "COMMUNITY & MEDIA",
    tagline: "The high-voltage wiring connecting 50+ college developer clubs across the subcontinent.",
    colorHex: "#E14E3D",
    borderHex: "#FF2A2A",
    bgGradient: "from-[#0B0014] via-[#1F0707] to-[#0B0014]",
    sponsors: [
      {
        name: "HBTU Alumni Association",
        category: "Heritage Network",
        logoText: "HBTU Alumni",
        desc: "Centennial global alumni network supporting innovation, student startups, and campus excellence.",
        website: "https://hbtualumni.org",
        perksOffered: ["Seed mentorship grants", "Alumni connect lounge"],
      },
      {
        name: "Unstop",
        category: "Student Opportunity Partner",
        logoText: "Unstop",
        desc: "Leading early talent engagement and competitive gamification platform.",
        website: "https://unstop.com",
        perksOffered: ["Nationwide outreach", "Verified leaderboard hosting"],
      },
      {
        name: "GeeksforGeeks HBTU Chapter",
        category: "Community Partner",
        logoText: "GFG Student Chapter",
        desc: "Student community fostering coding proficiency, algorithm mastery, and interview preparation.",
        website: "https://geeksforgeeks.org",
        perksOffered: ["Discounted course vouchers", "CP challenge curation"],
      },
    ],
  },
];

export const SPONSOR_PERKS_MATRIX = [
  { perk: "Keynote & Stage Announcement Time", diamond: "15 Mins Mainstage", gold: "5 Mins Mainstage", iron: "Logo Slide", redstone: "Mention" },
  { perk: "Dedicated HackNova Arena Booth", diamond: "Prime Double Slot", gold: "Single Slot", iron: "Shared Desk", redstone: "Brochure Desk" },
  { perk: "Direct Resume / Hacker Database Access", diamond: "Full Access + Fast Track", gold: "Full Access", iron: "Opt-In List", redstone: "—" },
  { perk: "Custom Challenge Track & Bounty Naming", diamond: "Yes (Exclusive)", gold: "Yes", iron: "—", redstone: "—" },
  { perk: "Logo on Festival Shirts & Swags", diamond: "Front Top Prominent", gold: "Back Top", iron: "Sleeve / Pocket", redstone: "Website Only" },
  { perk: "Social Media & Community Broadcasts", diamond: "Dedicated Video + 10 Posts", gold: "5 Posts + Shoutouts", iron: "2 Posts", redstone: "1 Combined Post" },
];
