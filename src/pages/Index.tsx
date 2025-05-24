import React from 'react';
import { useWallet } from '@/contexts/WalletContext';
import { useProfile } from '@/contexts/ProfileContext';
import AuthenticatedHome from './AuthenticatedHome';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import HowItWorksSection from '@/components/HowItWorksSection';
import MarketplacePreview from '@/components/MarketplacePreview';
import AboutSection from '@/components/AboutSection';
import FaqSection from '@/components/FaqSection';
import Footer from '@/components/Footer';
import WalletConnect from '@/components/WalletConnect';

const Index = () => {
  const { isConnected } = useWallet();
  const { profile, isProfileComplete } = useProfile();

  // If user is logged in and has completed profile, show authenticated home
  if (isConnected && isProfileComplete && profile) {
    return <AuthenticatedHome />;
  }

  // Otherwise show public homepage
  return (
    <div className="min-h-screen bg-skrypto-dark">
      <Navbar />
      <main>
        <HeroSection />
        <HowItWorksSection />
        <MarketplacePreview />
        <AboutSection />
        <FaqSection />
        
        {/* CTA Section */}
        <section className="py-20 px-4 relative overflow-hidden" id="connect-wallet">
          {/* Background elements */}
          <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-b from-skrypto-purple/10 to-transparent"></div>
          
          <div className="max-w-4xl mx-auto text-center relative">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 neo-glow">
              Ready to Join the Financial Freedom Movement?
            </h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto mb-10">
              Connect your wallet now and start earning crypto anonymously. 
              No paperwork, no KYC, no middlemen.
            </p>
            
            <div className="flex justify-center">
              <WalletConnect />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
