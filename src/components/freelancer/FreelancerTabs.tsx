
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PortfolioGallery from './PortfolioGallery';
import ReviewSection from '@/components/reviews/ReviewSection';
import WalletPreview from './WalletPreview';

interface FreelancerTabsProps {
  portfolioItems: any[];
  reviews: any[];
  averageRating: number;
  walletAddress?: string;
  hasHiredBefore?: boolean;
}

const FreelancerTabs: React.FC<FreelancerTabsProps> = ({
  portfolioItems,
  reviews,
  averageRating,
  walletAddress,
  hasHiredBefore
}) => {
  return (
    <Tabs defaultValue="portfolio" className="w-full">
      <TabsList className="grid w-full grid-cols-3 glass border-white/10">
        <TabsTrigger value="portfolio" className="data-[state=active]:bg-skrypto-purple/20 data-[state=active]:text-skrypto-purple">
          Portfolio
        </TabsTrigger>
        <TabsTrigger value="reviews" className="data-[state=active]:bg-skrypto-purple/20 data-[state=active]:text-skrypto-purple">
          Reviews
        </TabsTrigger>
        <TabsTrigger value="wallet" className="data-[state=active]:bg-skrypto-purple/20 data-[state=active]:text-skrypto-purple">
          Wallet
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="portfolio" className="mt-6">
        <PortfolioGallery portfolioItems={portfolioItems} />
      </TabsContent>
      
      <TabsContent value="reviews" className="mt-6">
        <ReviewSection
          reviews={reviews}
          averageRating={averageRating}
        />
      </TabsContent>
      
      <TabsContent value="wallet" className="mt-6">
        <WalletPreview
          walletAddress={walletAddress}
          hasHiredBefore={hasHiredBefore}
        />
      </TabsContent>
    </Tabs>
  );
};

export default FreelancerTabs;
