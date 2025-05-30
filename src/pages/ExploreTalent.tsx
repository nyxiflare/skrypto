
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TalentGrid from '@/components/explore/TalentGrid';
import TalentFilters from '@/components/explore/TalentFilters';
import ExploreHeader from '@/components/explore/ExploreHeader';
import { Button } from '@/components/ui/button';
import { MessageCircle, Star } from 'lucide-react';

const ExploreTalent = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedToken, setSelectedToken] = useState('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);

  return (
    <div className="min-h-screen bg-skrypto-dark">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <ExploreHeader />
        
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
