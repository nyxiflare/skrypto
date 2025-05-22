
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import OfferSkillForm from '@/components/offer/OfferSkillForm';
import { Button } from "@/components/ui/button";
import WalletConnect from '@/components/WalletConnect';
import { useNavigate } from 'react-router-dom';

// Mock wallet connection state - would be replaced with actual wallet connection
const useWalletConnection = () => {
  const [connected, setConnected] = React.useState(false);
  return { connected, setConnected };
};

const OfferSkill = () => {
  const navigate = useNavigate();
  const { connected } = useWalletConnection();

  return (
    <div className="min-h-screen bg-skrypto-dark">
      <Navbar />
      
      <main className="container mx-auto px-4 py-12">
        <div className="mb-12 text-center md:text-left">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="text-gradient-blue">Offer Your Skill</span>
          </h1>
          <p className="text-lg text-white/70 max-w-2xl md:mx-0 mx-auto">
            List your services and start earning crypto anonymously, with no KYC required.
            Get paid directly to your wallet in your preferred tokens.
          </p>
        </div>

        {connected ? (
          <OfferSkillForm />
        ) : (
          <div className="glass p-8 rounded-xl max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Connect Wallet to Continue</h2>
            <p className="text-white/70 mb-6">
              You need to connect your crypto wallet before you can offer your skills on Skrypto.
            </p>
            <div className="flex justify-center">
              <WalletConnect />
            </div>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default OfferSkill;
