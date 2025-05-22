
export interface Freelancer {
  id: number;
  username: string;
  bio: string;
  skills: string[];
  rate: string;
  paymentToken: string;
  rateType: string;
  rating: number;
  completedJobs: number;
  walletAddress?: string; // Optional since it's added later
  avatarUrl?: string; // Optional profile image
  reviews?: Array<{
    id: number;
    username: string;
    rating: number;
    comment: string;
    date: string;
  }>; // Optional reviews
}

export const freelancerData: Freelancer[] = [
  {
    id: 1,
    username: "CryptoDevMaster",
    bio: "Full-stack blockchain developer specializing in Solidity smart contracts and DApp development. Over 5 years experience in Web3.",
    skills: ["coding", "blockchain", "solidity"],
    rate: "0.18",
    paymentToken: "ETH",
    rateType: "per hour",
    rating: 4.9,
    completedJobs: 27
  },
  {
    id: 2,
    username: "DesignWizard404",
    bio: "Web3 UI/UX designer creating intuitive interfaces for crypto projects. Expertise in Figma, Adobe Suite, and React implementations.",
    skills: ["ui-design", "design"],
    rate: "60",
    paymentToken: "USDC",
    rateType: "per hour",
    rating: 4.8,
    completedJobs: 18
  },
  {
    id: 3,
    username: "CryptoContentCreator",
    bio: "Specialized in crypto whitepaper writing, blog posts and technical documentation for blockchain projects.",
    skills: ["writing", "copywriting"],
    rate: "80",
    paymentToken: "USDT",
    rateType: "per project",
    rating: 4.7,
    completedJobs: 32
  },
  {
    id: 4,
    username: "Web3Marketer",
    bio: "Growth marketing specialist for crypto and NFT projects. Expert in Discord/Telegram community building and Twitter promotion.",
    skills: ["marketing", "social-media", "copywriting"],
    rate: "0.1",
    paymentToken: "ETH",
    rateType: "per hour",
    rating: 4.9,
    completedJobs: 15
  },
  {
    id: 5,
    username: "NFTArtistAnon",
    bio: "Digital artist creating unique NFT collections and generative art. Experience with multiple blockchains and marketplaces.",
    skills: ["design"],
    rate: "1.5",
    paymentToken: "ETH",
    rateType: "per project",
    rating: 5.0,
    completedJobs: 12
  },
  {
    id: 6,
    username: "CryptoCopywriter",
    bio: "Expert in blockchain storytelling, token narratives, and technical documentation that bridges complex concepts to mainstream audiences.",
    skills: ["writing", "copywriting", "marketing"],
    rate: "75",
    paymentToken: "USDT",
    rateType: "per project",
    rating: 4.8,
    completedJobs: 23
  },
  {
    id: 7,
    username: "VideoEditorDAO",
    bio: "Professional crypto explainer videos, animations and YouTube content. Quick turnaround and attention to detail.",
    skills: ["video-editing"],
    rate: "90",
    paymentToken: "USDC",
    rateType: "per project",
    rating: 4.7,
    completedJobs: 19
  },
  {
    id: 8,
    username: "SmartContractAuditor",
    bio: "Security researcher with focus on smart contract vulnerabilities and audit reports. Former white hat, current code quality evangelist.",
    skills: ["coding", "blockchain"],
    rate: "0.4",
    paymentToken: "ETH",
    rateType: "per hour",
    rating: 5.0,
    completedJobs: 31
  },
  {
    id: 9,
    username: "SEO_Maximalist",
    bio: "Crypto SEO specialist helping Web3 projects rank higher and get discovered. Data-driven approach with measurable results.",
    skills: ["seo", "marketing"],
    rate: "65",
    paymentToken: "USDC",
    rateType: "per hour",
    rating: 4.6,
    completedJobs: 14
  },
  {
    id: 10,
    username: "DeFi_Developer",
    bio: "Specialized in DeFi protocol development, yield farming strategies, and liquidity pool optimization. Solidity expert.",
    skills: ["coding", "blockchain"],
    rate: "0.25",
    paymentToken: "ETH",
    rateType: "per hour",
    rating: 4.9,
    completedJobs: 24
  },
  {
    id: 11,
    username: "TokenomicsExpert",
    bio: "Economic model designer for token ecosystems. Creating sustainable tokenomics and incentive structures for Web3 projects.",
    skills: ["blockchain"],
    rate: "3",
    paymentToken: "ETH",
    rateType: "per project",
    rating: 4.8,
    completedJobs: 9
  },
  {
    id: 12,
    username: "3D_NFT_Creator",
    bio: "3D artist specializing in immersive metaverse assets and collectible NFTs with utility. Blender and Unity expertise.",
    skills: ["design"],
    rate: "2",
    paymentToken: "ETH",
    rateType: "per project",
    rating: 4.7,
    completedJobs: 17
  }
];
