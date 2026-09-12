export interface VillagerTrade {
  id: string;
  question: string;
  category: "General" | "HackNova" | "Passes" | "Sessions";
  villagerResponse: string;
  emeraldCost: number;
  itemGiven: string;
}

export const VILLAGER_TRADES: VillagerTrade[] = [
  {
    id: "trade-what-is",
    question: "What is Singularity 2K26 and who is organizing it?",
    category: "General",
    villagerResponse: "Singularity 2K26 is the annual technical festival of Harcourt Butler Technical University (HBTU), Kanpur. It is organized collaboratively by N8N Data Science Community, AWS SBG HBTU, and the Department of Mathematics.",
    emeraldCost: 1,
    itemGiven: "📜 Fest Intelligence",
  },
  {
    id: "trade-registration-cost",
    question: "Is fest entry and workshop registration free?",
    category: "Passes",
    villagerResponse: "Yes! Fest entry, general attendance, and technical workshops are completely free for all students. You can generate your digital pass directly on the registration portal for verification.",
    emeraldCost: 1,
    itemGiven: "🎟️ Free Fest Pass",
  },
  {
    id: "trade-hackathon-info",
    question: "How do I register for the HackNova 2.0 Hackathon?",
    category: "HackNova",
    villagerResponse: "HackNova 2.0 is the flagship 24-hour hackathon of Singularity 2K26. Team and solo registration is handled directly on its official portal at https://hacknova2-n8n-dsc.netlify.app/.",
    emeraldCost: 2,
    itemGiven: "🏆 Hackathon Badge",
  },
  {
    id: "trade-workshops-lectures",
    question: "What will happen in Hands-on Lectures & Workshops?",
    category: "Sessions",
    villagerResponse: "Industry mentors and professors will lead interactive, hands-on masterclasses covering Artificial Intelligence, Machine Learning, Serverless Cloud Architectures with AWS, and workflow automation.",
    emeraldCost: 1,
    itemGiven: "⚡ Masterclass Scroll",
  },
  {
    id: "trade-who-can-attend",
    question: "Who is eligible to participate in Singularity 2K26?",
    category: "General",
    villagerResponse: "Students from all recognized colleges, universities, and schools across all branches, departments, and academic years are eligible to participate.",
    emeraldCost: 1,
    itemGiven: "🌐 Access Permit",
  },
  {
    id: "trade-certificates",
    question: "Will all participants get official certificates?",
    category: "General",
    villagerResponse: "Yes! Every verified participant attending workshops, hands-on lectures, and the hackathon will receive an official Certificate of Participation from HBTU Kanpur.",
    emeraldCost: 2,
    itemGiven: "📜 Official Certificate",
  },
];
