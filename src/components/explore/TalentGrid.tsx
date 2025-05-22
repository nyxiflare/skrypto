
import React from 'react';
import TalentCard from '@/components/explore/TalentCard';
import { freelancerData } from '@/data/freelancer-data';

interface TalentGridProps {
  viewMode: 'grid' | 'list';
  filters: {
    skills: string[];
    token: string;
    priceRange: [number, number];
  };
}

const TalentGrid = ({ viewMode, filters }: TalentGridProps) => {
  const filteredFreelancers = freelancerData.filter(freelancer => {
    // Filter by skills (if any selected)
    if (filters.skills.length > 0 && !freelancer.skills.some(skill => filters.skills.includes(skill))) {
      return false;
    }
    
    // Filter by token (if specific token selected)
    if (filters.token !== 'all' && freelancer.paymentToken !== filters.token) {
      return false;
    }
    
    // Filter by price range
    const rate = parseFloat(freelancer.rate);
    if (rate < filters.priceRange[0] || rate > filters.priceRange[1]) {
      return false;
    }
    
    return true;
  });

  if (filteredFreelancers.length === 0) {
    return (
      <div className="text-center py-20">
        <h3 className="text-lg font-medium text-white mb-2">No freelancers match your filters</h3>
        <p className="text-white/60">Try changing your search criteria</p>
      </div>
    );
  }

  return (
    <div className={`
      ${viewMode === 'grid' 
        ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
        : 'flex flex-col gap-4'
      }
    `}>
      {filteredFreelancers.map(freelancer => (
        <TalentCard 
          key={freelancer.id}
          freelancer={freelancer}
          viewMode={viewMode}
        />
      ))}
    </div>
  );
};

export default TalentGrid;
