
import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MarketplaceFilters from '@/components/marketplace/MarketplaceFilters';
import GigCard from '@/components/marketplace/GigCard';
import MarketplaceHeader from '@/components/marketplace/MarketplaceHeader';
import { Grid2X2, LayoutList, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { gigData } from '@/data/marketplace-data';

type ViewMode = 'grid' | 'list';

const Marketplace = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const { toast } = useToast();

  // Get filter values from URL params or defaults
  const categoryFilter = searchParams.get('category') || 'all';
  const tokenFilter = searchParams.get('token') || 'all';
  const skillFilter = searchParams.get('skill') || 'all';

  // Apply filters to gigs
  const filteredGigs = gigData.filter(gig => {
    if (categoryFilter !== 'all' && gig.category !== categoryFilter) return false;
    if (tokenFilter !== 'all' && gig.paymentToken !== tokenFilter) return false;
    if (skillFilter !== 'all' && !gig.skills.includes(skillFilter)) return false;
    return true;
  });

  const handleFilterChange = (filterType: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value === 'all') {
      newParams.delete(filterType);
    } else {
      newParams.set(filterType, value);
    }
    setSearchParams(newParams);
  };

  const handlePostGig = () => {
    if (!isWalletConnected) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet to post a gig.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Coming Soon!",
      description: "This feature is under development.",
    });
  };

  const handleConnectWallet = () => {
    setIsWalletConnected(true);
    toast({
      title: "Wallet Connected!",
      description: "You've successfully connected your wallet.",
    });
  };

  return (
    <div className="min-h-screen bg-skrypto-dark">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <MarketplaceHeader />
        
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          <div className="w-full md:w-1/4">
            <MarketplaceFilters 
              categoryFilter={categoryFilter}
              tokenFilter={tokenFilter}
              skillFilter={skillFilter}
              onFilterChange={handleFilterChange}
            />
          </div>
          
          <div className="w-full md:w-3/4">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${viewMode === 'grid' ? 'bg-skrypto-purple/20 text-skrypto-purple' : 'text-white/70'}`}
                >
                  <Grid2X2 size={20} />
                </button>
                <button 
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${viewMode === 'list' ? 'bg-skrypto-purple/20 text-skrypto-purple' : 'text-white/70'}`}
                >
                  <LayoutList size={20} />
                </button>
                <span className="text-white/50 ml-2">{filteredGigs.length} results</span>
              </div>
              
              {isWalletConnected ? (
                <Button 
                  onClick={handlePostGig}
                  className="bg-skrypto-purple hover:bg-skrypto-purple/90 text-white"
                >
                  Post a Gig
                </Button>
              ) : (
                <Button 
                  onClick={handleConnectWallet}
                  className="bg-skrypto-green hover:bg-skrypto-green/90 text-white"
                >
                  <Wallet className="mr-2 h-4 w-4" /> Connect Wallet
                </Button>
              )}
            </div>
            
            {filteredGigs.length === 0 ? (
              <div className="glass rounded-xl p-8 text-center">
                <h3 className="text-xl font-medium text-white mb-2">No gigs found</h3>
                <p className="text-white/70">Try adjusting your filters or check back later</p>
              </div>
            ) : (
              <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
                {filteredGigs.map((gig) => (
                  <GigCard key={gig.id} gig={gig} viewMode={viewMode} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Marketplace;
