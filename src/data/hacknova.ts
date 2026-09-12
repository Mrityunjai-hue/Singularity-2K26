export interface LootChest {
  id: string;
  tier: "diamond" | "gold" | "iron" | "emerald";
  title: string;
  rankBadge: string;
  awardLabel: string;
  colorHex: string;
  borderHex: string;
  icon: string;
  perks: string[];
}

export interface HackTrack {
  id: string;
  title: string;
  icon: string;
  tag: string;
  shortDesc: string;
  problemStatementStatus: string;
}

export interface HackTimelineStage {
  level: number;
  title: string;
  time: string;
  dayLabel: string;
  desc: string;
}

export const HACKNOVA_DATA = {
  title: "HackNova 2.0",
  tagline: "24-Hour Pan-India Flagship Hackathon",
  blurb:
    "Descend into the deep obsidian proving ground. 24 hours of non-stop building, automated evaluations, mentor raids, and grand rewards.",
  prizePoolLabel: "GRAND OBSIDIAN TROPHIES & CURATED LOOT CHESTS",
  dates: "3-Day Festival Timeline",
  duration: "24 Hours Non-Stop",
  format: "In-Person Grand Arena at HBTU Kanpur",
  teamSize: "2 to 4 Builders",
  registrationNote: "Official registrations are handled directly through the official HackNova portal.",

  lootChests: [
    {
      id: "diamond-chest",
      tier: "diamond",
      title: "1st Place — Diamond Loot Chest",
      rankBadge: "GRAND CHAMPION",
      awardLabel: "GRAND TROPHY + EXCLUSIVE PERKS",
      colorHex: "#4FD9FF",
      borderHex: "#00B4D8",
      icon: "trophy",
      perks: [
        "Handcrafted 3D Voxel Obsidian Trophy",
        "Cloud Developer Credits & Premium Tooling Passes",
        "Direct Fast-Track Interviews with Partner Companies",
        "Champion Gold-Embroidered Hacker Hoodies",
        "Verified Winner Certificate of Exceptional Merit",
      ],
    },
    {
      id: "gold-chest",
      tier: "gold",
      title: "2nd Place — Gold Loot Chest",
      rankBadge: "1ST RUNNER UP",
      awardLabel: "SILVER TROPHY + DEV CREDITS",
      colorHex: "#FFD34D",
      borderHex: "#FFAA00",
      icon: "award",
      perks: [
        "Laser-Cut Voxel Silver Trophy",
        "Cloud Developer Credits & Tooling Subscriptions",
        "Partner Recruitment Referral Opportunities",
        "Official Singularity Hacker Merch Kits",
        "Verified Certificate of Excellence",
      ],
    },
    {
      id: "iron-chest",
      tier: "iron",
      title: "3rd Place — Iron Loot Chest",
      rankBadge: "2ND RUNNER UP",
      awardLabel: "BRONZE PLAQUE + SWAG CHEST",
      colorHex: "#C4CBCE",
      borderHex: "#8B8B8B",
      icon: "medal",
      perks: [
        "Handcrafted Bronze Voxel Plaque",
        "Exclusive Hacker Swag Bags & Pixel Stickers",
        "Cloud Credits & API Access Bundles",
        "Verified Certificate of Achievement",
      ],
    },
    {
      id: "emerald-bounties",
      tier: "emerald",
      title: "Special Quest Bounties",
      rankBadge: "SPECIAL CATEGORIES",
      awardLabel: "SPECIAL CATEGORY AWARDS",
      colorHex: "#55FF55",
      borderHex: "#00AA00",
      icon: "sparkles",
      perks: [
        "Best All-Women Hacker Squad Award",
        "Best Autonomous AI Workflow / Automation Award",
        "Best Serverless / Cloud Architecture Award",
        "Best Freshmen (1st Year) Prodigy Team Award",
      ],
    },
  ] as LootChest[],

  swags: [
    { title: "Voxel Swag Bag", desc: "Limited edition festival tote, custom die-cut pixel stickers & enamel pins." },
    { title: "Hacker Apparel", desc: "Heavyweight cotton Singularity 2K26 arcade graphic tee." },
    { title: "Cloud Credits", desc: "Developer sandbox credits & API passes for participating squads." },
    { title: "Verifiable NFT/Cert", desc: "Cryptographically verifiable digital certificate of participation." },
    { title: "Fuel & Sustenance", desc: "Midnight refreshments, energy drinks, and meals." },
    { title: "Hardware Sandboxes", desc: "On-site IoT kits & microcontroller loaner stations." },
  ],

  tracks: [
    {
      id: "track-01",
      title: "Track 01: Autonomous AI & Intelligent Systems",
      icon: "bot",
      tag: "AI / ML",
      shortDesc: "Problem domain and exact challenge statements will be officially unveiled at event kickoff.",
      problemStatementStatus: "Problem statement will be unveiled at event time.",
    },
    {
      id: "track-02",
      title: "Track 02: Next-Gen Cloud & Serverless Infrastructure",
      icon: "cloud",
      tag: "Cloud / DevOps",
      shortDesc: "Problem domain and exact challenge statements will be officially unveiled at event kickoff.",
      problemStatementStatus: "Problem statement will be unveiled at event time.",
    },
    {
      id: "track-03",
      title: "Track 03: Decentralized Systems & Cryptography",
      icon: "shield",
      tag: "Web3 / Security",
      shortDesc: "Problem domain and exact challenge statements will be officially unveiled at event kickoff.",
      problemStatementStatus: "Problem statement will be unveiled at event time.",
    },
    {
      id: "track-04",
      title: "Track 04: Mathematical Computing & Algorithmic Models",
      icon: "trending-up",
      tag: "Math / Algorithms",
      shortDesc: "Problem domain and exact challenge statements will be officially unveiled at event kickoff.",
      problemStatementStatus: "Problem statement will be unveiled at event time.",
    },
    {
      id: "track-05",
      title: "Track 05: Open Innovation & Societal Impact",
      icon: "sparkles",
      tag: "Open Innovation",
      shortDesc: "Problem domain and exact challenge statements will be officially unveiled at event kickoff.",
      problemStatementStatus: "Problem statement will be unveiled at event time.",
    },
  ] as HackTrack[],

  timeline: [
    {
      level: 1,
      title: "Spawn & Registration Check-in",
      time: "Day 1 · Morning Session",
      dayLabel: "Spawn Day",
      desc: "Physical badge pick-up, swag drop collection, team verification, and desk assignment at Grand Arena.",
    },
    {
      level: 2,
      title: "Problem Statement Unveiling & T-0 Kickoff",
      time: "Day 1 · Midday",
      dayLabel: "T-0 Hours",
      desc: "Opening address, official live problem statement release, and the 24-hour build clock begins!",
    },
    {
      level: 3,
      title: "Mentor Raid #1 (Architecture Checkpoint)",
      time: "Day 1 · Evening",
      dayLabel: "Checkpoint 1",
      desc: "Industry mentors review design blueprints, database schemas, and unblock bottlenecks.",
    },
    {
      level: 4,
      title: "Midnight Redstone Reload & Snack Sprint",
      time: "Day 1 · Midnight",
      dayLabel: "Midnight Raid",
      desc: "Hot refreshments, energy drinks, and midnight speed-bounty announcement.",
    },
    {
      level: 5,
      title: "Mentor Raid #2 (Code & Progress Review)",
      time: "Day 2 · Early Morning",
      dayLabel: "Checkpoint 2",
      desc: "Final mentor review round, edge-case testing, and pitch coaching.",
    },
    {
      level: 6,
      title: "Boss Level: Code Freeze & Final Submissions",
      time: "Day 2 · Midday",
      dayLabel: "T+24 Hours",
      desc: "Build window closes! Teams freeze repositories, submit project artifacts, and stage live demos.",
    },
    {
      level: 7,
      title: "Grand Arena Demos & Loot Distribution",
      time: "Day 2 · Afternoon",
      dayLabel: "Victory Stage",
      desc: "Top contending finalist teams demonstrate live software before the grand jury. Winners crowned!",
    },
  ] as HackTimelineStage[],

  faqs: [
    {
      q: "Who is eligible to participate in HackNova 2.0?",
      a: "Any student enrolled in an accredited university or college is eligible. Inter-college and inter-branch teams of 2–4 members are warmly welcomed.",
    },
    {
      q: "Where is HackNova 2.0 registration handled?",
      a: "HackNova 2.0 registrations are handled directly on its own official portal. Check the link provided on this page.",
    },
    {
      q: "When will the problem statements and tracks be released?",
      a: "To ensure a fair and competitive playing field, exact problem statements will be officially unveiled live at T-0 Hours during the opening ceremony.",
    },
    {
      q: "Will accommodation be arranged for outstation participants?",
      a: "Yes! Verified outstation participants shortlisted for the physical hackathon at HBTU Kanpur will receive campus accommodation options.",
    },
    {
      q: "Can we use pre-existing code or libraries?",
      a: "All project code and designs must be crafted during the 24-hour sprint. Open-source libraries, frameworks, APIs, and foundational models are permitted.",
    },
  ],
};
