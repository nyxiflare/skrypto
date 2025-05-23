
import React from 'react';
import { Button } from "@/components/ui/button";
import { BriefcaseBusiness, Coins, Sparkles } from 'lucide-react';

type OnboardingProfileTypeProps = {
  onNext: (type: "hire" | "earn" | "fun") => void;
};

const OnboardingProfileType = ({ onNext }: OnboardingProfileTypeProps) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-white mb-6 text-center">Choose your profile type</h2>
      <p className="text-white/70 text-center mb-8">
        Tell us how you plan to use Skrypto so we can personalize your experience
      </p>
      
      <div className="grid md:grid-cols-3 gap-4">
        <button 
          onClick={() => onNext("hire")}
          className="flex flex-col items-center p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
        >
          <BriefcaseBusiness size={48} className="text-skrypto-blue mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">Hire Talent</h3>
          <p className="text-center text-white/70 text-sm">
            Find skilled professionals for your projects
          </p>
        </button>
        
        <button 
          onClick={() => onNext("earn")}
          className="flex flex-col items-center p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
        >
          <Coins size={48} className="text-skrypto-purple mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">Earn Money</h3>
          <p className="text-center text-white/70 text-sm">
            Offer your skills and get paid in crypto
          </p>
        </button>
        
        <button 
          onClick={() => onNext("fun")}
          className="flex flex-col items-center p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
        >
          <Sparkles size={48} className="text-skrypto-green mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">Just Browsing</h3>
          <p className="text-center text-white/70 text-sm">
            Explore the platform and see what's available
          </p>
        </button>
      </div>
    </div>
  );
};

export default OnboardingProfileType;
