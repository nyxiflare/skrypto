
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ExploreHeader from '@/components/explore/ExploreHeader';
import TalentGrid from '@/components/explore/TalentGrid';
import TalentFilters from '@/components/explore/TalentFilters';
import { Button } from "@/components/ui/button";
import { Briefcase, Pen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import WalletConnect from '@/components/WalletConnect';
import { useWallet } from '@/contexts/WalletContext';

const ExploreTalent = () => {
  const navigate = useNavigate();
  const { isConnected } = useWallet();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedToken, setSelectedToken] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);

  return (
    <div className="min-h-screen bg-skrypto-dark">
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        <ExploreHeader />

        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-10">
          <div className="w-full md:w-auto flex gap-4">
            {isConnected ? (
              <>
                <Button 
                  className="bg-skrypto-purple hover:bg-skrypto-purple/90 text-white glow-purple flex items-center gap-2"
                  onClick={() => navigate('/post-job')}
                >
                  <Briefcase size={18} />
                  Post a Job
                </Button>
                <Button 
                  className="bg-skrypto-blue hover:bg-skrypto-blue/90 text-white glow-blue flex items-center gap-2"
                  onClick={() => navigate('/offer-skill')}
                >
                  <Pen size={18} />
                  Offer Your Skill
                </Button>
              </>
            ) : (
              <div className="flex flex-col w-full md:w-auto">
                <WalletConnect />
                <p className="text-sm text-white/60 mt-2 text-center">Connect wallet to post jobs or offer skills</p>
              </div>
            )}
          </div>
        </div>

        <TalentFilters 
          viewMode={viewMode}
          setViewMode={setViewMode}
          selectedSkills={selectedSkills}
          setSelectedSkills={setSelectedSkills}
          selectedToken={selectedToken}
          setSelectedToken={setSelectedToken}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
        />

        <TalentGrid 
          viewMode={viewMode}
          filters={{
            skills: selectedSkills,
            token: selectedToken,
            priceRange
          }}
        />
      </main>
      <Footer />
    </div>
  );
};

export default ExploreTalent;
