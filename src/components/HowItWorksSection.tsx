
import React from 'react';

const HowItWorksSection = () => {
  return (
    <section className="py-20 px-4 relative" id="how-it-works">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-skrypto-darker/50"></div>
      
      <div className="max-w-6xl mx-auto relative">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="text-gradient-purple">How It </span>
            <span className="text-white">Works</span>
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Three simple steps to start earning or hiring on the most anonymous crypto freelance platform.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass p-8 rounded-xl relative overflow-hidden">
            <div className="absolute -top-4 -left-4 text-8xl font-bold text-skrypto-purple/10">1</div>
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-skrypto-purple/20 flex items-center justify-center mb-6 glow-purple">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-skrypto-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-white">Connect Your Wallet</h3>
              <p className="text-white/70">
                Link your crypto wallet to create an anonymous profile. No email or personal details required.
              </p>
            </div>
          </div>
          
          <div className="glass p-8 rounded-xl relative overflow-hidden">
            <div className="absolute -top-4 -left-4 text-8xl font-bold text-skrypto-blue/10">2</div>
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-skrypto-blue/20 flex items-center justify-center mb-6 glow-blue">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-skrypto-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-white">Offer or Find Services</h3>
              <p className="text-white/70">
                Browse available gigs or offer your services. Set your rates in your preferred crypto.
              </p>
            </div>
          </div>
          
          <div className="glass p-8 rounded-xl relative overflow-hidden">
            <div className="absolute -top-4 -left-4 text-8xl font-bold text-skrypto-green/10">3</div>
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-skrypto-green/20 flex items-center justify-center mb-6 glow-green">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-skrypto-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-white">Get Paid in Crypto</h3>
              <p className="text-white/70">
                Complete work and receive payments directly to your wallet. No delays, no intermediaries.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
