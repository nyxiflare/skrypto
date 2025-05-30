
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
  const [filters, setFilters] = useState({
    skills: [],
    priceRange: [0, 10000],
    rating: 0,
    availability: 'all'
  });

  const [searchTerm, setSearchTerm] = useState('');

  // Mock data - replace with actual data fetching
  const freelancers = [
    {
      id: '1',
      username: 'john_dev',
      name: 'John Developer',
      avatar: '/placeholder.svg',
      skills: ['React', 'Node.js', 'TypeScript'],
      rating: 4.8,
      reviewCount: 156,
      hourlyRate: 85,
      isAvailable: true,
      bio: 'Full-stack developer with 5+ years experience'
    },
    {
      id: '2',
      username: 'sarah_designer',
      name: 'Sarah Designer',
      avatar: '/placeholder.svg',
      skills: ['UI/UX', 'Figma', 'Adobe Creative Suite'],
      rating: 4.9,
      reviewCount: 203,
      hourlyRate: 65,
      isAvailable: true,
      bio: 'Creative designer specializing in modern interfaces'
    },
    {
      id: '3',
      username: 'mike_blockchain',
      name: 'Mike Blockchain',
      avatar: '/placeholder.svg',
      skills: ['Solidity', 'Web3', 'Smart Contracts'],
      rating: 4.7,
      reviewCount: 89,
      hourlyRate: 120,
      isAvailable: false,
      bio: 'Blockchain developer and smart contract specialist'
    }
  ];

  return (
    <div className="min-h-screen bg-skrypto-dark">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <ExploreHeader onSearch={setSearchTerm} />
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-8">
          <div className="lg:col-span-1">
            <TalentFilters filters={filters} onFiltersChange={setFilters} />
          </div>
          
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {freelancers.map((freelancer) => (
                <div key={freelancer.id} className="glass rounded-xl p-6 border border-white/10">
                  <div className="flex items-center mb-4">
                    <img 
                      src={freelancer.avatar} 
                      alt={freelancer.name}
                      className="w-12 h-12 rounded-full mr-3"
                    />
                    <div>
                      <h3 className="text-white font-semibold">{freelancer.name}</h3>
                      <p className="text-white/60 text-sm">@{freelancer.username}</p>
                    </div>
                  </div>
                  
                  <p className="text-white/80 text-sm mb-4">{freelancer.bio}</p>
                  
                  <div className="flex items-center mb-3">
                    <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                    <span className="text-white text-sm">{freelancer.rating}</span>
                    <span className="text-white/60 text-sm ml-1">({freelancer.reviewCount})</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {freelancer.skills.slice(0, 3).map((skill) => (
                      <span key={skill} className="bg-skrypto-purple/20 text-skrypto-purple px-2 py-1 rounded text-xs">
                        {skill}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-white font-semibold">${freelancer.hourlyRate}/hr</span>
                    <span className={`text-xs px-2 py-1 rounded ${
                      freelancer.isAvailable 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-red-500/20 text-red-400'
                    }`}>
                      {freelancer.isAvailable ? 'Available' : 'Busy'}
                    </span>
                  </div>
                  
                  <div className="flex gap-2">
                    <Link 
                      to={`/freelancer/${freelancer.id}`}
                      className="flex-1"
                    >
                      <Button className="w-full bg-skrypto-purple hover:bg-skrypto-purple/90 text-white">
                        View Profile
                      </Button>
                    </Link>
                    <Link 
                      to={`/messages/${freelancer.id}`}
                    >
                      <Button variant="outline" size="icon" className="border-white/20 text-white hover:bg-white/10">
                        <MessageCircle size={16} />
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ExploreTalent;
