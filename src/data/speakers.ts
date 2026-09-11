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
    name: "Distinguished AI Keynote Speaker",
    role: "Industry AI Leader & Cloud Architect",
    organization: "Global Cloud / AI Research Labs",
    bio: "Pioneer in distributed foundation models, serverless multi-agent swarms, and large-scale autonomous reasoning pipelines.",
    keynoteTopic: "The Singularity Horizon: Autonomous Agent Swarms at Scale",
    sessionAbstract: "How the convergence of mathematical graph theory, serverless orchestration, and agentic loops is reshaping software synthesis.",
    day: 1,
    time: "Day 1 · Inaugural Keynote",
    venue: "Main University Auditorium",
    badgeLevel: "KEYNOTE MASTER",
    tags: ["Artificial Intelligence", "Multi-Agent Systems", "Serverless"],
    avatarStyle: "wizard",
    isKeynoteFeatured: true,
  },
  {
    id: "speaker-n8n",
    name: "Developer Ecosystem Lead",
    role: "Open-Source Workflow Architect",
    organization: "n8n Automation Community",
    bio: "Specializing in visual automation graphs, enterprise event orchestration, and self-hosted AI agents.",
    keynoteTopic: "Autonomous Workflows & Multi-Agent Graphs",
    sessionAbstract: "Building reliable, self-healing automation workflows connecting enterprise databases, vector indexes, and multi-modal models.",
    day: 1,
    time: "Day 1 · Afternoon Masterclass",
    venue: "Seminar Complex",
    badgeLevel: "TECH ARCHITECT",
    tags: ["Automation", "n8n Workflows", "AI Agents"],
    avatarStyle: "architect",
  },
  {
    id: "speaker-math",
    name: "Department of Mathematics Patron",
    role: "Senior Faculty & Researcher in Discrete Computing",
    organization: "Department of Mathematics, HBTU",
    bio: "Distinguished academic leader in cryptography, discrete graph optimization, and mathematical foundations of computing.",
    keynoteTopic: "Mathematical Topology & Cryptographic Zero-Knowledge",
    sessionAbstract: "A mathematical exploration into how elliptic curves, polynomial commitments, and manifolds power verifiable privacy in modern systems.",
    day: 2,
    time: "Day 2 · Morning Lecture",
    venue: "Dept. of Mathematics Complex",
    badgeLevel: "GRAND ORACLE",
    tags: ["Mathematics", "Zero-Knowledge", "Cryptography"],
    avatarStyle: "oracle",
  },
  {
    id: "speaker-cloud",
    name: "Cloud Infrastructure Architect",
    role: "Staff Edge & Systems Engineer",
    organization: "HBTU Alumni Network",
    bio: "Specializing in global edge networks, microsecond latency optimization, and resilient distributed data backbones.",
    keynoteTopic: "Low-Latency Edge Compute & High-Frequency Backbones",
    sessionAbstract: "Practical lessons from managing planet-scale distributed edge nodes, memory isolation, and high-frequency data pipelines.",
    day: 2,
    time: "Day 2 · Afternoon Session",
    venue: "East Campus Mini-Auditorium",
    badgeLevel: "EDGE KNIGHT",
    tags: ["Cloud Infra", "Edge Computing", "Security"],
    avatarStyle: "knight",
  },
];
