
import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Mock data for marketplace listings
const marketplaceItems = [
  {
    id: 1,
    title: "Smart Contract Development",
    description: "I'll develop secure, audited smart contracts for your DeFi project or NFT collection.",
    price: "0.5 ETH",
    category: "Development",
    rating: 4.9,
    reviews: 27,
  },
  {
    id: 2,
    title: "Web3 Frontend Design",
    description: "Professional UI/UX design for your Web3 application with React and Tailwind CSS.",
    price: "0.3 ETH",
    category: "Design",
    rating: 4.7,
    reviews: 18,
  },
  {
    id: 3,
    title: "Blockchain Marketing Strategy",
    description: "Complete crypto marketing plan including community building and token promotion.",
    price: "0.25 ETH",
    category: "Marketing",
    rating: 4.8,
    reviews: 12,
  }
];

const MarketplacePreview = () => {
  return (
    <section className="py-20 px-4" id="marketplace">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="text-gradient-blue">Marketplace </span>
            <span className="text-white">Preview</span>
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Check out some of the top services offered by anonymous freelancers on Skrypto.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {marketplaceItems.map((item) => (
            <div key={item.id} className="glass rounded-xl overflow-hidden hover:scale-[1.02] transition-transform duration-300">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <Badge className="bg-skrypto-purple/20 text-skrypto-purple border-none">
                    {item.category}
                  </Badge>
                  <div className="text-xl font-bold text-skrypto-green">{item.price}</div>
                </div>
                
                <h3 className="text-xl font-bold mb-3 text-white">{item.title}</h3>
                <p className="text-white/70 mb-4">{item.description}</p>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-white ml-1">{item.rating}</span>
                    <span className="text-white/50 ml-2">({item.reviews} reviews)</span>
                  </div>
                  <Button className="bg-skrypto-blue/20 hover:bg-skrypto-blue/40 text-skrypto-blue">
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button className="bg-skrypto-purple hover:bg-skrypto-purple/90 text-white px-8">
            View All Listings
          </Button>
        </div>
      </div>
    </section>
  );
};

export default MarketplacePreview;
