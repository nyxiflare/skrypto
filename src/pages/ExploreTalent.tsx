
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TalentGrid from '@/components/explore/TalentGrid';
import TalentFilters from '@/components/explore/TalentFilters';
import ExploreHeader from '@/components/explore/ExploreHeader';
import { Button } from '@/components/ui/button';
import { Plus, Briefcase } from 'lucide-react';
import { useWallet } from '@/contexts/WalletContext';

const ExploreTalent = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedToken, setSelectedToken] = useState('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const { isConnected } = useWallet();

  return (
    <div className="min-h-screen bg-skrypto-dark">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <ExploreHeader />
        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <Button 
            asChild
            className="bg-skrypto-purple hover:bg-skrypto-purple/90 text-white flex items-center gap-2"
          >
            <Link to="/offer-skill">
              <Plus size={20} />
              Offer Your Skills
            </Link>
          </Button>
          <Button 
            asChild
            variant="outline"
            className="border-skrypto-purple text-skrypto-purple hover:bg-skrypto-purple/10 flex items-center gap-2"
          >
            <Link to="/post-job">
              <Briefcase size={20} />
              Post a Job
            </Link>
          </Button>
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
            priceRange: priceRange
          }}
        />
      </main>
      <Footer />
    </div>
  );
};

export default ExploreTalent;
