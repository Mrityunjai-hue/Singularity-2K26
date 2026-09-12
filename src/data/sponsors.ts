export interface SponsorSlot {
  slotId: string;
  slotCode: string;
  domainTag: string;
  slotTitle: string;
  status: "OPEN FOR INQUIRY" | "RESERVED";
  deliverablesHighlight: string;
}

export interface SponsorTierData {
  id: "diamond" | "gold" | "iron" | "redstone";
  name: string;
  badge: string;
  tagline: string;
  colorHex: string;
  borderHex: string;
  bgGlow: string;
  animationLevel: "MAXIMUM (PRISMATIC VORTEX & 3D BEACONS)" | "HIGH (GOLDEN RADIANT EMBERS)" | "MEDIUM (METALLIC CYBER SHEEN)" | "SUBTLE (REDSTONE SIGNAL PULSE)";
  investmentTier: string;
  dealOverview: string;
  coreDeliverables: string[];
  slots: SponsorSlot[];
}

export interface ImpactMetric {
  value: string;
  label: string;
  sub: string;
  icon: string;
  color: string;
}

export interface SponsorFaq {
  q: string;
  a: string;
}

export const SPONSOR_IMPACT_METRICS: ImpactMetric[] = [
  {
    value: "1,000+",
    label: "ACTIVE BUILDERS",
    sub: "Elite collegiate hackers & AI engineers at HBTU",
    icon: "users",
    color: "#55FF55",
  },
  {
    value: "50+",
    label: "TOP UNIVERSITIES",
    sub: "Pan-India engineering talent network",
    icon: "award",
    color: "#4FD9FF",
  },
  {
    value: "100K+",
    label: "DIGITAL IMPRESSIONS",
    sub: "Multi-channel developer & social broadcast",
    icon: "zap",
    color: "#FFD34D",
  },
  {
    value: "24 HOURS",
    label: "NON-STOP IMMERSION",
    sub: "Continuous hackathon booth & keynote visibility",
    icon: "flame",
    color: "#E14E3D",
  },
];

export const SPONSORS_DATA: {
  tiers: SponsorTierData[];
  deliverablesMatrix: { perk: string; diamond: string; gold: string; iron: string; redstone: string }[];
  faqs: SponsorFaq[];
  contactEmail: string;
} = {
  contactEmail: "n8ndatasciencecommunityevents@gmail.com",

  tiers: [
    {
      id: "diamond",
      name: "Diamond Tier",
      badge: "TITLE SOVEREIGN PATRON",
      tagline: "The rare foundation powering the core of Singularity 2K26. Maximum stage presence and executive branding.",
      colorHex: "#4FD9FF",
      borderHex: "#00E5FF",
      bgGlow: "rgba(79, 217, 255, 0.4)",
      animationLevel: "MAXIMUM (PRISMATIC VORTEX & 3D BEACONS)",
      investmentTier: "Exclusive Co-Branding Title",
      dealOverview: "Complete event co-branding, 15-minute mainstage keynote, double-size HackNova arena booth, and full unrestricted access to the 1,000+ hacker resume database.",
      coreDeliverables: [
        "15-Minute Prime Mainstage Keynote & Opening Address",
        "Prime Double-Slot Booth in HackNova 2.0 Grand Arena",
        "Full Unrestricted Access to 1,000+ Hacker Resumes + Fast-Track Interviews",
        "Exclusive Naming Rights on Flagship Hackathon Track & Grand Champions Trophy",
        "Prominent Front-Top Logo on 1,500+ Official Festival T-Shirts, Banners & Passes",
        "Dedicated Video Showcase + 10 Targeted Pan-India Social Media Broadcasts",
        "VIP Jury Seat on HackNova Grand Evaluation Panel",
      ],
      slots: [
        {
          slotId: "diamond-01",
          slotCode: "TITLE_PATRON_01",
          domainTag: "CLOUD & GENERATIVE AI INFRASTRUCTURE",
          slotTitle: "Title Cloud & AI Infrastructure Partner",
          status: "OPEN FOR INQUIRY",
          deliverablesHighlight: "15-Min Keynote + Double Arena Booth + Full Talent Database",
        },
        {
          slotId: "diamond-02",
          slotCode: "TITLE_PATRON_02",
          domainTag: "AUTONOMOUS AGENT ORCHESTRATION & COMPUTE",
          slotTitle: "Title Agentic Computing & Systems Partner",
          status: "OPEN FOR INQUIRY",
          deliverablesHighlight: "Flagship Track Naming + Jury Seat + Prime Banner Placement",
        },
      ],
    },
    {
      id: "gold",
      name: "Gold Tier",
      badge: "CO-POWERED PATRON",
      tagline: "Empowering computational clusters, high-dimensional quant tracks, and grand prize vaults.",
      colorHex: "#FFD34D",
      borderHex: "#FFAA00",
      bgGlow: "rgba(255, 211, 77, 0.35)",
      animationLevel: "HIGH (GOLDEN RADIANT EMBERS)",
      investmentTier: "Co-Powered Category",
      dealOverview: "5-minute mainstage address, dedicated arena workstation, co-branded challenge track, back-top t-shirt placement, and talent recruitment access.",
      coreDeliverables: [
        "5-Minute Mainstage Address during Opening Ceremony",
        "Dedicated Single Booth in HackNova 2.0 Arena",
        "Access to Verified Hacker Resumes & Candidate Profiles",
        "Co-Branded Hackathon Challenge Track & Track Bounty Placement",
        "Back-Top Logo on Official Festival T-Shirts & Stage Backdrops",
        "5 Targeted Social Media Blasts & Discord War Room Announcements",
        "Dedicated Mentor & Workshop Session Slot",
      ],
      slots: [
        {
          slotId: "gold-01",
          slotCode: "POWERED_BY_01",
          domainTag: "HIGH-DIMENSIONAL QUANT & MATHEMATICS",
          slotTitle: "Algorithmic & Mathematical Modeling Partner",
          status: "OPEN FOR INQUIRY",
          deliverablesHighlight: "5-Min Address + Dedicated Booth + Challenge Track",
        },
        {
          slotId: "gold-02",
          slotCode: "POWERED_BY_02",
          domainTag: "DEVELOPER ECOSYSTEM & PLATFORM",
          slotTitle: "Official Hackathon Platform & Dev Tools Partner",
          status: "OPEN FOR INQUIRY",
          deliverablesHighlight: "Single HackHub Booth + Resume Access + Swag Drops",
        },
        {
          slotId: "gold-03",
          slotCode: "POWERED_BY_03",
          domainTag: "TOOLING & CODE ENGINE",
          slotTitle: "Developer Productivity & Tooling Partner",
          status: "OPEN FOR INQUIRY",
          deliverablesHighlight: "Workshop Slot + Back-Top Shirt Logo + Discord Blast",
        },
      ],
    },
    {
      id: "iron",
      name: "Iron Tier",
      badge: "ASSOCIATE PATRON",
      tagline: "Solid bedrock providing development tools, hardware sandboxes, and API credits.",
      colorHex: "#C4CBCE",
      borderHex: "#9EABB0",
      bgGlow: "rgba(196, 203, 206, 0.25)",
      animationLevel: "MEDIUM (METALLIC CYBER SHEEN)",
      investmentTier: "Associate Category",
      dealOverview: "Shared demo desk, opt-in talent list, logo on t-shirt sleeves & web portal, and tooling prize category sponsorship.",
      coreDeliverables: [
        "Shared Demo Desk & Product Showcase in HackNova Arena",
        "Opt-In Talent Resume List from Hackathon Participants",
        "Logo on Official Festival T-Shirt Sleeves & Web Portal Roll",
        "Tooling / API Prize Category Sponsorship",
        "2 Dedicated Social Media & Discord Announcements",
        "Product Swag & Sticker Inclusion in All 1,000+ Attendee Kits",
      ],
      slots: [
        {
          slotId: "iron-01",
          slotCode: "ASSOCIATE_SLOT_01",
          domainTag: "API & CLOUD SANDBOX PLATFORM",
          slotTitle: "API & Developer Sandbox Partner",
          status: "OPEN FOR INQUIRY",
          deliverablesHighlight: "Shared Demo Desk + Opt-in Resume List + Swag Bag",
        },
        {
          slotId: "iron-02",
          slotCode: "ASSOCIATE_SLOT_02",
          domainTag: "CYBERSECURITY & ZERO-KNOWLEDGE LABS",
          slotTitle: "Cybersecurity & Cryptography Partner",
          status: "OPEN FOR INQUIRY",
          deliverablesHighlight: "CTF Bounty Category + Sleeve Logo + Portal Spotlight",
        },
        {
          slotId: "iron-03",
          slotCode: "ASSOCIATE_SLOT_03",
          domainTag: "DEVELOPER PRODUCTIVITY NETWORK",
          slotTitle: "Dev Productivity & Education Partner",
          status: "OPEN FOR INQUIRY",
          deliverablesHighlight: "2x Social Broadcasts + Digital Portal Feature",
        },
      ],
    },
    {
      id: "redstone",
      name: "Redstone Tier",
      badge: "COMMUNITY & MEDIA",
      tagline: "The high-voltage signal connecting 50+ college developer clubs across the subcontinent.",
      colorHex: "#E14E3D",
      borderHex: "#FF2A2A",
      bgGlow: "rgba(225, 78, 61, 0.2)",
      animationLevel: "SUBTLE (REDSTONE SIGNAL PULSE)",
      investmentTier: "Community & Media Category",
      dealOverview: "Swag desk distribution, web portal listing, and combined community broadcast across university channels.",
      coreDeliverables: [
        "Brochure & Swag Distribution at Attendee Registration Hub",
        "Logo on Web Portal Partner Roll & Digital Screens",
        "1 Combined Community Social Broadcast across Fest Channels",
        "Access to Hackathon Demo Expo",
      ],
      slots: [
        {
          slotId: "redstone-01",
          slotCode: "COMMUNITY_SIGNAL_01",
          domainTag: "CAMPUS DEVELOPER NETWORK",
          slotTitle: "Collegiate Tech Club Network Partner",
          status: "OPEN FOR INQUIRY",
          deliverablesHighlight: "Brochure Distribution + Digital Screen Roll",
        },
        {
          slotId: "redstone-02",
          slotCode: "COMMUNITY_SIGNAL_02",
          domainTag: "MEDIA & TECH OUTREACH PARTNER",
          slotTitle: "Official Media & Press Broadcast Partner",
          status: "OPEN FOR INQUIRY",
          deliverablesHighlight: "Media Mention + Web Partner Badge",
        },
        {
          slotId: "redstone-03",
          slotCode: "COMMUNITY_SIGNAL_03",
          domainTag: "HACKER COMMUNITY ECOSYSTEM",
          slotTitle: "Student Developer Community Partner",
          status: "OPEN FOR INQUIRY",
          deliverablesHighlight: "Combined Social Broadcast + Expo Access",
        },
      ],
    },
  ],

  deliverablesMatrix: [
    { perk: "Keynote & Stage Announcement Time", diamond: "15 Mins Prime Mainstage", gold: "5 Mins Mainstage Address", iron: "Logo Slide", redstone: "Mention" },
    { perk: "Dedicated HackNova Arena Booth", diamond: "Prime Double Slot", gold: "Dedicated Single Slot", iron: "Shared Demo Desk", redstone: "Brochure Desk" },
    { perk: "Direct Resume & Talent Database Access", diamond: "Full Access + Fast Track", gold: "Full Candidate Access", iron: "Opt-In List", redstone: "—" },
    { perk: "Custom Challenge Track & Bounty Naming", diamond: "Exclusive Flagship Track", gold: "Co-Branded Track", iron: "Tooling Bounty", redstone: "—" },
    { perk: "Logo on 1,500+ Official Shirts & Passes", diamond: "Front Top Prominent", gold: "Back Top", iron: "Sleeve / Pocket", redstone: "Web Roll" },
    { perk: "Dedicated Social Media & Video Blasts", diamond: "Dedicated Video + 10 Posts", gold: "5 Targeted Posts", iron: "2 Posts", redstone: "1 Combined Post" },
    { perk: "VIP Jury & Evaluation Seat", diamond: "Grand Jury Panel Seat", gold: "Mentor Track Lead", iron: "Invited Observer", redstone: "—" },
    { perk: "Physical Swag Insertion in Attendee Bags", diamond: "Unlimited Items & Hardware", gold: "Up to 3 Items", iron: "1 Item / Sticker", redstone: "Brochure" },
  ],

  faqs: [
    {
      q: "How can our brand claim an open sponsorship slot?",
      a: "Click on any open tier slot or use the 'Claim a Sponsor Slot' button to send an instant inquiry to our corporate relations secretariat at n8ndatasciencecommunityevents@gmail.com. You will receive the detailed commercial prospectus, contract draft, and invoice guidelines within 24 hours.",
    },
    {
      q: "Can sponsors conduct technical workshops or mentor hackathon squads?",
      a: "Yes! Diamond and Gold tier patrons have dedicated masterclass time slots and round-the-clock mentor raids during HackNova 2.0 to engage directly with builder teams using their developer tools or APIs.",
    },
    {
      q: "Can custom sponsorship packages or in-kind hardware grants be arranged?",
      a: "Absolutely. We offer tailored agreements for cloud credit grants, hardware testbed sponsorships (e.g. FPGAs, microcontrollers, GPUs), and bespoke track bounty funding.",
    },
    {
      q: "What is the timeline to finalize sponsorship agreements?",
      a: "Due to print deadlines for 1,500+ official attendee shirts, ID cards, and stage backdrops, Diamond and Gold slots must be finalized at least 2 weeks prior to the festival start date (October 22, 2026).",
    },
  ],
};
