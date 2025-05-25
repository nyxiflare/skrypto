
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProfile } from '@/contexts/ProfileContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BackButton from '@/components/BackButton';
import OfferSkillForm from '@/components/offer/OfferSkillForm';
import { Button } from "@/components/ui/button";
import { Briefcase } from 'lucide-react';

const OfferSkill = () => {
  const navigate = useNavigate();
  const { profile } = useProfile();
  const [showForm, setShowForm] = useState(false);

  const handleGetStarted = () => {
    if (!profile?.subscription?.active) {
      navigate('/membership');
    } else {
      setShowForm(true);
    }
  };

  return (
    <div className="min-h-screen bg-skrypto-dark">
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        <div className="mb-6">
          <BackButton to="/dashboard" />
        </div>

        {!showForm ? (
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <Briefcase size={64} className="mx-auto text-skrypto-blue mb-4" />
              <h1 className="text-4xl md:text-5xl font-bold mb-4 neo-glow">
                Offer Your Skills
              </h1>
              <p className="text-xl text-white/70 max-w-2xl mx-auto">
                Create a professional profile and start earning crypto by offering your skills to clients worldwide.
              </p>
            </div>

            {!profile?.subscription?.active ? (
              <div className="glass p-8 rounded-xl border border-yellow-500/30 mb-8">
                <h3 className="text-yellow-500 font-semibold text-xl mb-4">Membership Required</h3>
                <p className="text-white/70 mb-6">
                  You need an active membership to offer your skills and be visible to potential clients.
                </p>
                <Button
                  onClick={() => navigate('/membership')}
                  className="bg-skrypto-purple hover:bg-skrypto-purple/90 text-white px-6 py-3"
                >
                  View Membership Plans
                </Button>
              </div>
            ) : (
              <Button
                onClick={handleGetStarted}
                className="bg-skrypto-blue hover:bg-skrypto-blue/90 text-white px-8 py-6 text-lg glow-blue"
              >
                Create Your Profile
              </Button>
            )}

            <div className="mt-12 grid md:grid-cols-3 gap-6">
              <div className="glass p-6 rounded-xl">
                <h3 className="text-white font-semibold mb-3">Showcase Skills</h3>
                <p className="text-white/70 text-sm">
                  Highlight your expertise and attract the right clients with a detailed skill profile.
                </p>
              </div>
              <div className="glass p-6 rounded-xl">
                <h3 className="text-white font-semibold mb-3">Set Your Rates</h3>
                <p className="text-white/70 text-sm">
                  Control your pricing and work with clients who value your skills.
                </p>
              </div>
              <div className="glass p-6 rounded-xl">
                <h3 className="text-white font-semibold mb-3">Earn Crypto</h3>
                <p className="text-white/70 text-sm">
                  Get paid directly in cryptocurrency without intermediaries or lengthy processes.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <OfferSkillForm />
        )}
      </main>
      <Footer />
    </div>
  );
};

export default OfferSkill;
