export interface HackRewardPillar {
  id: string;
  title: string;
  badge: string;
  recipient: string;
  icon: string;
  accentColor: string;
  bgGlow: string;
  description: string;
  perks: string[];
}

export interface EncryptedTrack {
  id: string;
  trackNumber: string;
  title: string;
  domain: string;
  icon: string;
  status: "ENCRYPTED" | "UNLOCKED";
  teaser: string;
  techStack: string[];
}

export interface HackTimelineStage {
  level: number;
  title: string;
  time: string;
  dayLabel: string;
  desc: string;
  icon: string;
}

export interface HackFaq {
  q: string;
  a: string;
}

export interface HackRuleCategory {
  title: string;
  icon: string;
  rules: { label: string; detail: string }[];
}

export const HACKNOVA_DATA = {
  title: "HACKNOVA 2.0",
  tagline: "India's Premier 24-Hour AI & Autonomous Agents Hackathon",
  subtitle:
    "Organized by N8N Data Science Community in strategic collaboration with AWS SBG HBTU and Department of Mathematics, HBTU Kanpur.",
  blurb:
    "Descend into the deep volcanic obsidian proving ground. 24 hours of non-stop autonomous AI building, LLM orchestration, automated testbed evaluations, mentor raids, and national glory.",
  grandPrizePoolFormatted: "₹ 1,XX,XXX.XX+",
  duration: "24 Hours Non-Stop",
  format: "Offline (In-Person Grand Arena at HBTU Kanpur)",
  teamSize: "2 to 4 Builders",
  targetDevelopers: "1000+ Developers Across India",
  portalUrl: "https://hacknova2-n8n-dsc.netlify.app/",
  registrationNote:
    "Official registrations and team management are handled directly through the official HackNova 2.0 portal.",

  // What is HackNova 2.0 (AI Agentic Hackathon Pillars)
  agenticHighlights: [
    {
      id: "autonomous-agents",
      title: "Autonomous Agent Swarms",
      tag: "CORE FOCUS",
      icon: "bot",
      color: "#55FF55",
      desc: "Engineer multi-agent loops, supervisor-worker hierarchies, and tool-use agents using frameworks like LangGraph, CrewAI, AutoGen, and n8n workflows.",
    },
    {
      id: "serverless-scale",
      title: "Cloud Scale & Serverless Infrastructure",
      tag: "AWS SBG POWERED",
      icon: "cloud",
      color: "#4FD9FF",
      desc: "Deploy highly scalable microservices, event-driven webhooks, AWS Lambda backends, and low-latency inference pipelines.",
    },
    {
      id: "algorithmic-intelligence",
      title: "High-Dimensional Quant Computing",
      tag: "DEPT OF MATH",
      icon: "brain",
      color: "#FFD34D",
      desc: "Solve discrete optimization, graph algorithms, zero-knowledge verification, and cryptographic modeling puzzles curated by mathematics faculty.",
    },
    {
      id: "continuous-deployment",
      title: "Live 24-Hour Evaluation Matrix",
      tag: "24H SPRINT",
      icon: "flame",
      color: "#E14E3D",
      desc: "No mock presentations. Projects undergo automated testbed validations, live code audits, and round-the-clock mentor raids from industry architects.",
    },
  ],

  // 5 Distinct Reward Pillars (Explicit Breakdown)
  rewardPillars: [
    {
      id: "cash-prizes",
      title: "Direct Cash Bounty Pool",
      badge: "TOP 3 TEAMS",
      recipient: "1st, 2nd & 3rd Place Finishers",
      icon: "wallet",
      accentColor: "#FFD34D",
      bgGlow: "rgba(255, 211, 77, 0.3)",
      description: "Direct cash grant prizes transferred to the top 3 contending hackathon teams.",
      perks: [
        "1st Place: Champion Cash Bounty + Fast-Track Partner Interviews",
        "2nd Place: 1st Runner-Up Cash Bounty + Cloud Credits",
        "3rd Place: 2nd Runner-Up Cash Bounty + Tooling Subscriptions",
      ],
    },
    {
      id: "obsidian-trophies",
      title: "3D Voxel Obsidian Trophies",
      badge: "TOP 5 TEAMS",
      recipient: "Top 5 Grand Finalist Teams",
      icon: "trophy",
      accentColor: "#E14E3D",
      bgGlow: "rgba(225, 78, 61, 0.3)",
      description: "Custom handcrafted 3D Voxel Obsidian & Gold Champions Trophies permanently commemorating your victory.",
      perks: [
        "Handcrafted Obsidian Champions Trophy (1st)",
        "Obsidian & Gold Runner Trophies (2nd & 3rd)",
        "Obsidian Merit Plaques for 4th & 5th Finalists",
        "Permanent Hall of Fame inductee on Singularity & N8N DSC channels",
      ],
    },
    {
      id: "swag-kits",
      title: "Exclusive Developer Swag Kits",
      badge: "ALL PARTICIPANTS",
      recipient: "Every Registered Attendee",
      icon: "package",
      accentColor: "#4FD9FF",
      bgGlow: "rgba(79, 217, 255, 0.3)",
      description: "Exclusive physical swag bags packed with custom Singularity 2K26 gear.",
      perks: [
        "Custom Heavyweight Singularity 2K26 Hacker Graphic Tee",
        "Custom Die-Cut Laptop Decals & Holographic Pixel Stickers",
        "Developer Sandbox Cloud Credits & API Tooling Passes",
        "Collector Enamel Pins & HackNova Wristbands",
      ],
    },
    {
      id: "meals-fuel",
      title: "100% Free Meals & Refreshments",
      badge: "ALL PARTICIPANTS",
      recipient: "All In-Person Builders at HBTU",
      icon: "utensils",
      accentColor: "#55FF55",
      bgGlow: "rgba(85, 255, 85, 0.3)",
      description: "Complete complimentary catering throughout the entire 24-hour sprint window.",
      perks: [
        "Complimentary Breakfast, Lunch & Grand Dinner",
        "Midnight Hot Snacks & Redstone Energy Reloads",
        "24/7 Unlimited Coffee, Tea & Refreshment Hydration Bars",
        "Dedicated resting zones & sleeping arrangements on campus",
      ],
    },
    {
      id: "certificates",
      title: "Verified Digital Certificates",
      badge: "ALL PARTICIPANTS",
      recipient: "Every Valid Project Submission",
      icon: "award",
      accentColor: "#A855F7",
      bgGlow: "rgba(168, 85, 247, 0.3)",
      description: "Cryptographically verifiable digital credential recognized across industry partners.",
      perks: [
        "Official Certificate of Participation for all active builders",
        "Winner & Runner Certificates of Exceptional Merit",
        "Endorsed by N8N DSC, AWS SBG HBTU & Dept of Mathematics, HBTU",
        "Direct shareable verification link for LinkedIn & resumes",
      ],
    },
  ] as HackRewardPillar[],

  // Encrypted Challenge Statements
  encryptedTracks: [
    {
      id: "track-01",
      trackNumber: "TRACK 01",
      title: "Autonomous Multi-Agent AI Swarms",
      domain: "AI / Multi-Agent / LLMs",
      icon: "bot",
      status: "ENCRYPTED",
      teaser: "Autonomous reasoning loops, multi-agent collaboration networks, and self-healing software agents.",
      techStack: ["LangGraph", "CrewAI", "n8n", "OpenAI / Anthropic APIs"],
    },
    {
      id: "track-02",
      trackNumber: "TRACK 02",
      title: "Next-Gen Cloud & Serverless Infrastructure",
      domain: "Cloud / DevOps / Microservices",
      icon: "cloud",
      status: "ENCRYPTED",
      teaser: "Event-driven serverless architectures, real-time streaming pipelines, and fault-tolerant cloud backends.",
      techStack: ["AWS Lambda", "DynamoDB", "Docker", "Kubernetes"],
    },
    {
      id: "track-03",
      trackNumber: "TRACK 03",
      title: "Decentralized Systems & Cryptography",
      domain: "Web3 / Cryptography / Zero-Knowledge",
      icon: "shield",
      status: "ENCRYPTED",
      teaser: "Smart contract security protocols, zero-knowledge proofs, and decentralized data storage systems.",
      techStack: ["Solidity", "Rust", "IPFS", "ZK-Rollups"],
    },
    {
      id: "track-04",
      trackNumber: "TRACK 04",
      title: "Mathematical Computing & Algorithmic Optimization",
      domain: "Quant Math / Graph Theory / Algorithms",
      icon: "brain",
      status: "ENCRYPTED",
      teaser: "High-dimensional quantitative models, combinatorial search optimizations, and numerical computing testbeds.",
      techStack: ["Python", "C++", "NumPy", "NetworkX"],
    },
    {
      id: "track-05",
      trackNumber: "TRACK 05",
      title: "Open Innovation & Societal Tech Impact",
      domain: "Open Innovation / Civic Tech / Healthcare",
      icon: "sparkles",
      status: "ENCRYPTED",
      teaser: "Bespoke high-impact solutions addressing accessibility, healthcare, education, and climate resilience.",
      techStack: ["Next.js", "FastAPI", "TensorFlow", "IoT Sandboxes"],
    },
  ] as EncryptedTrack[],

  // 24-Hour Sprint Timeline
  timeline: [
    {
      level: 1,
      title: "Spawn & Registration Desk Opens",
      time: "Day 1 · 10:00 AM",
      dayLabel: "Spawn Desk",
      desc: "Check-in, badge pickup, swag drops collection, team verification, and assigned workstation setup at Grand Arena.",
      icon: "map-pin",
    },
    {
      level: 2,
      title: "Opening Ceremony & Problem Statement Decryption",
      time: "Day 1 · 11:30 AM",
      dayLabel: "T-0 Hours",
      desc: "Official welcome address by dignitaries, decryption of live challenge statements, and the 24-hour countdown begins!",
      icon: "sparkles",
    },
    {
      level: 3,
      title: "Hacking Commences (24-Hour Matrix Timer Starts)",
      time: "Day 1 · 12:00 PM (Noon)",
      dayLabel: "Hacking Starts",
      desc: "Repository initialization, architecture scaffolding, and live brainstorming with squadmates.",
      icon: "flame",
    },
    {
      level: 4,
      title: "Mentor Raid #1 & Technical Architecture Reviews",
      time: "Day 1 · 06:00 PM",
      dayLabel: "Checkpoint 1",
      desc: "Mentors from N8N DSC and AWS SBG inspect architectural blueprints, database schemas, and unblock bottlenecks.",
      icon: "bot",
    },
    {
      level: 5,
      title: "Late Night Hacker Activity & Redstone Energy Reload",
      time: "Day 1 · 10:00 PM",
      dayLabel: "Midnight Raid",
      desc: "Hot dinner, midnight coffee sprint, mini speed-coding challenges, and energy reloads.",
      icon: "zap",
    },
    {
      level: 6,
      title: "Breakfast & Progress Health Check",
      time: "Day 2 · 08:00 AM",
      dayLabel: "Morning Sprint",
      desc: "Complimentary breakfast, final UI polish, edge-case unit testing, and pitch preparation.",
      icon: "utensils",
    },
    {
      level: 7,
      title: "Code Freeze & Final Repository Submissions",
      time: "Day 2 · 12:00 PM (Noon)",
      dayLabel: "T+24 Hours",
      desc: "24-hour hacking timer halts! Git repositories are locked, demo videos uploaded, and project briefs submitted.",
      icon: "shield",
    },
    {
      level: 8,
      title: "Live Judging Demos & Project Evaluation",
      time: "Day 2 · 02:00 PM",
      dayLabel: "Jury Arena",
      desc: "Contending teams demonstrate live working software, agent workflows, and architecture before the Grand Jury.",
      icon: "trophy",
    },
    {
      level: 9,
      title: "Closing Ceremony & Award Announcements",
      time: "Day 2 · 04:30 PM",
      dayLabel: "Victory Stage",
      desc: "Grand announcement of winners, trophy distribution, cash prize conferment, and celebration.",
      icon: "award",
    },
  ] as HackTimelineStage[],

  // Official FAQs imported from hacknova2-n8n-dsc.netlify.app/faq
  faqs: [
    {
      q: "How do I register for HackNova 2.0?",
      a: "Step 1: Complete registration on the official portal (create a team, join an existing team, or register solo for matchmaking). Step 2: Receive your Virtual Hacker Pass, unique team code & confirmation email. Step 3: Join the Discord war room & WhatsApp communication channels to stay updated until hackathon kickoff!",
    },
    {
      q: "Is registration free?",
      a: "YES. Registration for HackNova 2.0 is completely free for all participants. There are zero hidden admission or platform fees.",
    },
    {
      q: "What is the team size requirement?",
      a: "Teams must consist of 2 to 4 members. If you don't have a team yet, join our official Discord server to access the automated hacker matchmaking channels.",
    },
    {
      q: "Can we use pre-existing code or past projects?",
      a: "NO. All project code and core logic must be developed exclusively within the 24-hour hackathon window. Using pre-existing projects or 'wrapped' old codebases is strictly prohibited and grounds for immediate disqualification. Standard open-source libraries and public APIs are permitted when declared in the README.",
    },
    {
      q: "Are food, meals, and accommodation provided?",
      a: "YES! We provide complimentary breakfast, lunch, dinner, midnight energy snacks, beverages, and campus resting arrangements for all registered participants throughout the 24-hour hackathon duration.",
    },
    {
      q: "Who is eligible to participate?",
      a: "Open to all university students, researchers, and early-career developers globally. Inter-college, inter-branch, and cross-discipline teams are warmly welcomed.",
    },
    {
      q: "What should I bring to the hackathon?",
      a: "Bring your laptop, charger, power strip (optional), valid student/government ID, toiletries, and any specific hardware components/microcontrollers you plan to use for your project.",
    },
    {
      q: "Can beginners and first-time hackers participate?",
      a: "ABSOLUTELY. Hackathons are incredible learning proving grounds. We have experienced mentors from AWS SBG and N8N DSC available 24/7 to help you troubleshoot architecture, debug code, and learn cutting-edge tools.",
    },
    {
      q: "Will projects be judged on mobile & cross-platform responsiveness?",
      a: "YES. The jury will evaluate projects on both mobile and desktop screens. A polished, responsive design and intuitive user interface demonstrate complete technical competence.",
    },
    {
      q: "What are the primary evaluation metrics?",
      a: "Submissions are evaluated on four key pillars: 1) Real-World Impact & Utility, 2) Technical Complexity & Code Quality, 3) Originality & Innovation, and 4) Presentation, Demo & Documentation quality.",
    },
  ] as HackFaq[],

  // Official Rules & Code of Conduct from hacknova2-n8n-dsc.netlify.app/rules
  rulesCategories: [
    {
      title: "General Eligibility & Teams",
      icon: "users",
      rules: [
        { label: "Global Student Eligibility", detail: "Open to all university students, research scholars, and early-career developers globally." },
        { label: "Team Structure", detail: "Teams must consist of 2 to 4 members. Solo nodes are restricted from final prize contention." },
        { label: "Physical Presence Required", detail: "Offline in-person presence at Harcourt Butler Technical University (HBTU), Kanpur is mandatory for all team members." },
      ],
    },
    {
      title: "Project Development & Integrity",
      icon: "shield",
      rules: [
        { label: "24-Hour Build Window", detail: "All application code must be committed and developed exclusively during the 24-hour sprint." },
        { label: "Zero Pre-existing Code", detail: "Repositories will be audited. Pre-existing codebases or cloned templates are strictly prohibited." },
        { label: "Open-Source Declaration", detail: "Standard public libraries, open-source SDKs, and foundational APIs are allowed but must be cited in the README.md." },
        { label: "100% Intellectual Property", detail: "Participants retain 100% intellectual property ownership of all software and designs created during the hackathon." },
      ],
    },
    {
      title: "Code of Conduct & Protocols",
      icon: "flame",
      rules: [
        { label: "Zero Tolerance Policy", detail: "Harassment, discrimination, or abusive conduct of any kind (physical or digital) results in instant disqualification." },
        { label: "Collaboration over Sabotage", detail: "Any attempt to tamper with network infrastructure or other teams' deployments leads to permanent banning." },
        { label: "Submission Deliverables", detail: "Teams must submit: 1) Public GitHub repo link with full README, 2) Max 3-minute video demo, and 3) 300-word project brief." },
      ],
    },
  ] as HackRuleCategory[],

  // Official MLH & Legal Links
  legalLinks: {
    privacyPolicy: "https://mlh.com/privacy",
    codeOfConduct: "https://static.mlh.io/docs/mlh-code-of-conduct.pdf",
    supportEmail: "n8ndatasciencecommunityevents@gmail.com",
  },
};
