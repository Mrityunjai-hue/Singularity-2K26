export interface HackRewardPillar {
  id: string;
  title: string;
  badge: string;
  recipient: string;
  icon: string;
  accentColor: string;
  bgGlow: string;
  description: string;
}

export interface EncryptedTrack {
  id: string;
  trackNumber: string;
  cipherHash: string;
  status: "QUANTUM ENCRYPTED";
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
  entryFee: "₹199 / Person",
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

  // 5 Distinct Reward Pillars (Exact specifications: Cash for Top 3, Trophies for Top 5, Swags for all registered, Food & beverages provided, Certificates for all)
  rewardPillars: [
    {
      id: "cash-prizes",
      title: "Cash Prize Pool",
      badge: "TOP 3 TEAMS",
      recipient: "Top 3 Finishers",
      icon: "wallet",
      accentColor: "#FFD34D",
      bgGlow: "rgba(255, 211, 77, 0.3)",
      description: "Direct cash grant prize pool awarded to the top 3 contending hackathon teams (1st, 2nd, and 3rd place winners).",
    },
    {
      id: "obsidian-trophies",
      title: "Trophies",
      badge: "TOP 5 TEAMS",
      recipient: "Top 5 Finishers",
      icon: "trophy",
      accentColor: "#E14E3D",
      bgGlow: "rgba(225, 78, 61, 0.3)",
      description: "Official bespoke handcrafted trophies commemorating victory for the top 5 finishing teams.",
    },
    {
      id: "swags",
      title: "Swags",
      badge: "ALL PARTICIPANTS",
      recipient: "All Registered Participants",
      icon: "package",
      accentColor: "#4FD9FF",
      bgGlow: "rgba(79, 217, 255, 0.3)",
      description: "Exclusive official hackathon swags provided for every registered candidate.",
    },
    {
      id: "meals-fuel",
      title: "Food & Beverages Provided",
      badge: "ALL PARTICIPANTS",
      recipient: "All Registered Candidates",
      icon: "utensils",
      accentColor: "#55FF55",
      bgGlow: "rgba(85, 255, 85, 0.3)",
      description: "Food and beverages provided for all registered candidates throughout the entire 24-hour hackathon.",
    },
    {
      id: "certificates",
      title: "Certificates",
      badge: "ALL PARTICIPANTS",
      recipient: "All Candidates",
      icon: "award",
      accentColor: "#A855F7",
      bgGlow: "rgba(168, 85, 247, 0.3)",
      description: "Official digital certificates of participation and merit for all hackathon candidates.",
    },
  ] as HackRewardPillar[],

  // Purely Encrypted Challenge Statements (No leaked titles, domains, descriptions or tech stacks)
  encryptedTracks: [
    {
      id: "track-01",
      trackNumber: "TRACK 01",
      cipherHash: "0x8F4A9C2E7B1D04A3",
      status: "QUANTUM ENCRYPTED",
    },
    {
      id: "track-02",
      trackNumber: "TRACK 02",
      cipherHash: "0x3D7E81FA62C9B508",
      status: "QUANTUM ENCRYPTED",
    },
    {
      id: "track-03",
      trackNumber: "TRACK 03",
      cipherHash: "0x9B1C5F0742E8DA31",
      status: "QUANTUM ENCRYPTED",
    },
    {
      id: "track-04",
      trackNumber: "TRACK 04",
      cipherHash: "0x4A6B2D8E1F7C9350",
      status: "QUANTUM ENCRYPTED",
    },
    {
      id: "track-05",
      trackNumber: "TRACK 05",
      cipherHash: "0x1E5A7D3C9F8B2046",
      status: "QUANTUM ENCRYPTED",
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
      title: "Late Night Hacker Activity & Energy Reload",
      time: "Day 1 · 10:00 PM",
      dayLabel: "Midnight Raid",
      desc: "Hot dinner, midnight snacks & beverages sprint, mini speed-coding challenges, and energy reloads.",
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

  // Official FAQs (Updated with ₹199 registration fee & mandatory extension cord)
  faqs: [
    {
      q: "How do I register for HackNova 2.0?",
      a: "Step 1: Complete registration on the official portal (create a team, join an existing team, or register solo for matchmaking). Step 2: Pay the ₹199 per person entry fee and receive your Virtual Hacker Pass, unique team code & confirmation email. Step 3: Join the Discord war room & WhatsApp communication channels to stay updated until hackathon kickoff!",
    },
    {
      q: "Is registration free or is there an entry fee?",
      a: "Registration for HackNova 2.0 is ₹199 per person. This pass grants you complete access to the 24-hour hackathon arena, official swags, food & beverages, mentorship sessions, and eligibility for all prizes.",
    },
    {
      q: "What should I bring to the hackathon?",
      a: "You must bring your laptop, charger, an extension cord / power strip (mandatory for your team workstation power supply), valid student or government ID, toiletries, and any specific hardware components you plan to build with.",
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
      q: "Are food and beverages provided during the hackathon?",
      a: "YES. Food and beverages are provided for all registered candidates throughout the entire 24-hour hackathon duration at HBTU Kanpur.",
    },
    {
      q: "Who is eligible to participate?",
      a: "Open to all university students, researchers, and early-career developers globally. Inter-college, inter-branch, and cross-discipline teams are warmly welcomed.",
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
        { label: "Workstation Equipment", detail: "Every team must bring their own extension cord / power strip to ensure all team laptops remain powered." },
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
