export interface EventItem {
  id: string;
  title: string;
  category: "workshop" | "competition" | "technical" | "cultural";
  categoryLabel: string;
  badgeLevel: "Novice" | "Adept" | "Boss Level";
  difficultyColor: string;
  shortDesc: string;
  fullDesc: string;
  day: number;
  time: string;
  venue: string;
  prizePoolLabel?: string;
  teamSize: string;
  iconName: string;
  prerequisites: string[];
  rules: string[];
  coordinators: { label: string }[];
  isHot: boolean;
}

export const FEST_EVENTS: EventItem[] = [
  {
    id: "aws-cloud-craft",
    title: "Cloud Craft: Serverless on AWS",
    category: "workshop",
    categoryLabel: "Workshop",
    badgeLevel: "Novice",
    difficultyColor: "#55FF55",
    shortDesc: "Hands-on masterclass building and deploying scalable microservices with AWS Lambda, DynamoDB & App Runner.",
    fullDesc: "Led by AWS Student Builders Group (SBG) HBTU mentors. Learn cloud fundamentals, deploy full-stack serverless architectures, and earn AWS certification preparation kits.",
    day: 1,
    time: "Day 1 · Afternoon Session (02:00 PM)",
    venue: "Shatabdi Bhavan, HBTU West Campus",
    teamSize: "Individual / Solo",
    iconName: "cloud",
    prerequisites: ["Basic familiarity with JavaScript / Python", "Laptop with modern web browser"],
    rules: [
      "AWS sandbox access provided during the session",
      "Live deployment verification required for completion certificate",
      "Interactive coding walkthroughs",
    ],
    coordinators: [
      { label: "AWS SBG Student Lead" },
      { label: "Technical Coordinator" },
    ],
    isHot: true,
  },
  {
    id: "n8n-data-alchemy",
    title: "Data Alchemy: Autonomous Workflows",
    category: "workshop",
    categoryLabel: "Workshop",
    badgeLevel: "Adept",
    difficultyColor: "#4FD9FF",
    shortDesc: "Build multi-agent AI workflows and data automation pipelines integrating LLMs, webhooks and real-time streams.",
    fullDesc: "Organized by N8N Data Science Community. Discover how to orchestrate autonomous agent loops and enterprise data transformations with zero-friction automation graphs.",
    day: 1,
    time: "Day 1 · Afternoon Session (04:30 PM)",
    venue: "Shatabdi Bhavan, HBTU West Campus",
    teamSize: "Individual or Duo",
    iconName: "workflow",
    prerequisites: ["Curiosity for AI agents and automation", "Basic API concepts"],
    rules: [
      "Interactive builder challenge with real-time evaluation",
      "Top automated workflows win premium developer perks",
    ],
    coordinators: [
      { label: "N8N Community Lead" },
      { label: "Event Coordinator" },
    ],
    isHot: true,
  },
  {
    id: "mathletics-olympiad",
    title: "Mathletics: High-Dimensional Olympiad",
    category: "competition",
    categoryLabel: "Competition",
    badgeLevel: "Boss Level",
    difficultyColor: "#FFD34D",
    shortDesc: "A battle of mathematical intuition, discrete algorithms, cryptography puzzles, and quantitative problem solving.",
    fullDesc: "Hosted by Department of Mathematics, HBTU. Speed math, number theory, graph theory optimizations, and mathematical modeling rounds curated by mathematics faculty.",
    day: 2,
    time: "Day 2 · Mid-Day Session (11:30 AM)",
    venue: "Shatabdi Bhavan, HBTU West Campus",
    prizePoolLabel: "Trophies & Merit Awards",
    teamSize: "Teams of 1-3",
    iconName: "brain",
    prerequisites: ["Analytical mindset", "Discrete math & algorithm fundamentals"],
    rules: [
      "Round 1: Speed Cryptic Blitz",
      "Round 2: Algorithmic Proof & Optimization Sprint",
      "Round 3: Live Final Problem Faceoff",
    ],
    coordinators: [
      { label: "Faculty Convener, Dept. of Mathematics" },
      { label: "Student Mathematics Lead" },
    ],
    isHot: true,
  },
  {
    id: "capture-the-flag",
    title: "Zero-Day CTF: Cyber Siege",
    category: "competition",
    categoryLabel: "Competition",
    badgeLevel: "Boss Level",
    difficultyColor: "#E14E3D",
    shortDesc: "Jeopardy-style cybersecurity CTF covering reverse engineering, binary exploitation, web security & cryptography.",
    fullDesc: "Enter the cyber proving ground. High-stakes exploitation across Dockerized targets, memory corruption challenges, and forensics puzzles.",
    day: 2,
    time: "Day 2 · Afternoon Session (04:30 PM)",
    venue: "Shatabdi Bhavan, HBTU West Campus",
    prizePoolLabel: "Trophies & Cyber Medals",
    teamSize: "Teams of 2-4",
    iconName: "shield-alert",
    prerequisites: ["Networking, Linux CLI, Web vulnerabilities"],
    rules: [
      "Strict zero-collusion policy between rival squads",
      "First blood flag captures awarded bonus multipliers",
    ],
    coordinators: [
      { label: "Cybersecurity Lead" },
      { label: "Technical Moderator" },
    ],
    isHot: false,
  },
  {
    id: "algo-arena",
    title: "Algorithmic Arena: Code Brawl",
    category: "technical",
    categoryLabel: "Technical Event",
    badgeLevel: "Adept",
    difficultyColor: "#4FD9FF",
    shortDesc: "Speed competitive programming tournament on custom testbeds with live 1v1 bracket knockouts and power-ups.",
    fullDesc: "Coders face off in timed head-to-head algorithmic duels where speed and spatial memory unlock custom sabotages against opponents.",
    day: 1,
    time: "Day 1 · Evening Session (06:30 PM)",
    venue: "Shatabdi Bhavan, HBTU West Campus",
    prizePoolLabel: "Trophies & Medals",
    teamSize: "Solo Coders",
    iconName: "swords",
    prerequisites: ["Proficiency in C++, Java, Python or Rust", "Data structures & algorithms"],
    rules: [
      "ICPC-style penalty scoring with live arcade health bars",
      "Head-to-head knockout brackets",
    ],
    coordinators: [
      { label: "Algorithmic Track Lead" },
    ],
    isHot: false,
  },
  {
    id: "pulse-edm-night",
    title: "PULSE: The Grand EDM Finale",
    category: "cultural",
    categoryLabel: "Cultural Night",
    badgeLevel: "Boss Level",
    difficultyColor: "#E14E3D",
    shortDesc: "The ultimate fest finale concert featuring top national DJ line-up, synchronized lasers, and retro visual drops.",
    fullDesc: "Celebrate three days of building and competing! Bass-heavy synth drops, laser projections, glowing wristbands, and an electric atmosphere at Shatabdi Bhavan, HBTU West Campus.",
    day: 3,
    time: "Day 3 · Grand Finale Evening (07:00 PM)",
    venue: "Shatabdi Bhavan, HBTU West Campus",
    teamSize: "Open to All Pass Holders",
    iconName: "sparkles",
    prerequisites: ["Singularity 2K26 Attendee Wristband / Pass"],
    rules: [
      "College ID / Fest pass verification required at entry",
      "Strict campus security protocols enforced",
    ],
    coordinators: [
      { label: "Cultural Committee Convener" },
      { label: "Operations Team" },
    ],
    isHot: true,
  },
];
