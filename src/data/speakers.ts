export interface Speaker {
  id: string;
  name: string;
  role: string;
  organization: string;
  bio: string;
  keynoteTopic: string;
  sessionAbstract: string;
  day: number;
  time: string;
  venue: string;
  badgeLevel: string;
  tags: string[];
  avatarStyle: "wizard" | "architect" | "knight" | "oracle" | "hacker";
  isKeynoteFeatured?: boolean;
}

export const SPEAKERS_DATA: Speaker[] = [
  {
    id: "keynote-featured",
    name: "Keynote Speaker",
    role: "Industry AI Leader & Cloud Architect",
    organization: "Distinguished Guest",
    bio: "Keynote bio and speaker details will be announced with the official schedule release.",
    keynoteTopic: "Keynote Session: Autonomous Systems & Cloud Architecture",
    sessionAbstract: "Keynote address exploring software architecture, AI agent systems, and distributed platforms.",
    day: 1,
    time: "Day 1 · Inaugural Keynote",
    venue: "Main Auditorium",
    badgeLevel: "KEYNOTE SPEAKER",
    tags: ["Artificial Intelligence", "Cloud Architecture", "Future Tech"],
    avatarStyle: "wizard",
    isKeynoteFeatured: true,
  },
  {
    id: "speaker-2",
    name: "Speaker Name",
    role: "Workflow & Systems Architect",
    organization: "Special Guest Speaker",
    bio: "Speaker details and session notes will be officially announced.",
    keynoteTopic: "Technical Session: Workflow Orchestration & Systems",
    sessionAbstract: "Deep-dive technical session covering modern infrastructure and automation graphs.",
    day: 1,
    time: "Day 1 · Masterclass",
    venue: "Seminar Complex",
    badgeLevel: "GUEST SPEAKER",
    tags: ["Automation", "Architecture", "Systems"],
    avatarStyle: "architect",
  },
  {
    id: "speaker-3",
    name: "Speaker Name",
    role: "Senior Faculty & Researcher",
    organization: "Department of Mathematics, HBTU",
    bio: "Faculty speaker and research guide in mathematical computing and algorithms.",
    keynoteTopic: "Mathematical Computing & Algorithmic Foundations",
    sessionAbstract: "Exploration of discrete mathematics, algorithmic optimization, and computational models.",
    day: 2,
    time: "Day 2 · Morning Lecture",
    venue: "Mathematics Complex",
    badgeLevel: "FACULTY SPEAKER",
    tags: ["Mathematics", "Algorithms", "Computation"],
    avatarStyle: "oracle",
  },
  {
    id: "speaker-4",
    name: "Speaker Name",
    role: "Cloud & Systems Engineer",
    organization: "Distinguished Alumnus",
    bio: "Engineering leadership and practical experience in distributed scaling.",
    keynoteTopic: "Scalable Infrastructure & Performance Engineering",
    sessionAbstract: "Practical insights on building high-reliability distributed systems.",
    day: 2,
    time: "Day 2 · Afternoon Session",
    venue: "Mini-Auditorium",
    badgeLevel: "GUEST SPEAKER",
    tags: ["Cloud Infra", "Performance", "Security"],
    avatarStyle: "knight",
  },
];
