
export interface Gig {
  id: number;
  title: string;
  description: string;
  price: string;
  paymentToken: string;
  category: string;
  skills: string[];
  rating: number;
  reviews: number;
}

export const gigData: Gig[] = [
  {
    id: 1,
    title: "Smart Contract Development",
    description: "I'll develop secure, audited smart contracts for your DeFi project or NFT collection. Includes full documentation and deployment.",
    price: "0.5",
    paymentToken: "ETH",
    category: "development",
    skills: ["coding", "blockchain", "solidity"],
    rating: 4.9,
    reviews: 27
  },
  {
    id: 2,
    title: "Web3 Frontend Design",
    description: "Professional UI/UX design for your Web3 application with React and Tailwind CSS. Responsive design for all devices.",
    price: "0.3",
    paymentToken: "ETH",
    category: "design",
    skills: ["ui-design", "coding", "react"],
    rating: 4.7,
    reviews: 18
  },
  {
    id: 3,
    title: "Blockchain Marketing Strategy",
    description: "Complete crypto marketing plan including community building, token promotion, and social media management for your blockchain project.",
    price: "0.25",
    paymentToken: "ETH",
    category: "marketing",
    skills: ["social-media", "seo", "copywriting"],
    rating: 4.8,
    reviews: 12
  },
  {
    id: 4,
    title: "Whitepaper & Tokenomics Writing",
    description: "Professional whitepaper and tokenomics documentation for your crypto project. Clear explanations and professional formatting.",
    price: "800",
    paymentToken: "USDT",
    category: "content",
    skills: ["copywriting", "blockchain"],
    rating: 4.6,
    reviews: 15
  },
  {
    id: 5,
    title: "NFT Collection Creation",
    description: "End-to-end NFT collection creation including artwork, smart contracts, and marketplace listing. Up to 10,000 unique NFTs.",
    price: "2",
    paymentToken: "ETH",
    category: "design",
    skills: ["ui-design", "blockchain"],
    rating: 4.9,
    reviews: 32
  },
  {
    id: 6,
    title: "Solana Program Development",
    description: "Custom Solana program development in Rust. High performance and low fees guaranteed. Includes testing and deployment.",
    price: "3",
    paymentToken: "SOL",
    category: "development",
    skills: ["coding", "blockchain"],
    rating: 5.0,
    reviews: 9
  },
  {
    id: 7,
    title: "DApp Security Audit",
    description: "Comprehensive security audit for your decentralized application. Identify vulnerabilities before hackers do.",
    price: "0.8",
    paymentToken: "ETH",
    category: "services",
    skills: ["coding", "blockchain"],
    rating: 4.8,
    reviews: 21
  },
  {
    id: 8,
    title: "Crypto Community Management",
    description: "Full-time community management for your crypto project. Discord, Telegram, and Twitter engagement strategies.",
    price: "1200",
    paymentToken: "USDT",
    category: "marketing",
    skills: ["social-media", "copywriting"],
    rating: 4.7,
    reviews: 16
  },
  {
    id: 9,
    title: "DAO Governance Setup",
    description: "Complete DAO governance setup including voting mechanisms, treasury management, and governance token distribution.",
    price: "0.7",
    paymentToken: "ETH",
    category: "development",
    skills: ["blockchain", "coding"],
    rating: 4.9,
    reviews: 11
  },
  {
    id: 10,
    title: "Crypto SEO & Content Strategy",
    description: "SEO-optimized content strategy for your crypto website. Increase visibility and attract more users to your platform.",
    price: "600",
    paymentToken: "USDC",
    category: "marketing",
    skills: ["seo", "copywriting"],
    rating: 4.6,
    reviews: 14
  },
  {
    id: 11,
    title: "Cross-chain Bridge Development",
    description: "Develop a secure cross-chain bridge for token transfers between Ethereum, BSC, Polygon, and other EVM chains.",
    price: "1.5",
    paymentToken: "ETH",
    category: "development",
    skills: ["coding", "blockchain"],
    rating: 4.8,
    reviews: 7
  },
  {
    id: 12,
    title: "Web3 Brand Identity Design",
    description: "Complete brand identity package for your Web3 project. Logo, color palette, typography, and brand guidelines.",
    price: "0.4",
    paymentToken: "ETH",
    category: "design",
    skills: ["ui-design"],
    rating: 4.7,
    reviews: 23
  }
];
