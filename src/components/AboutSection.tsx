
import React from 'react';

const AboutSection = () => {
  return (
    <section className="py-20 px-4 relative" id="about">
      {/* Background elements */}
      <div className="absolute top-20 right-0 w-72 h-72 bg-skrypto-purple/10 rounded-full blur-3xl"></div>
      
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="text-white">About </span>
            <span className="text-gradient-purple">Skrypto</span>
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Built for freedom and financial sovereignty in a world of increasing surveillance.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-bold mb-6 text-white">Our Vision</h3>
            <p className="text-white/70 mb-6">
              Skrypto was born from a simple belief: your skills and labor are yours alone, and you should be able to profit from them without unnecessary intermediaries, taxes, or oversight.
            </p>
            <p className="text-white/70 mb-6">
              In today's digital economy, platforms take huge cuts from freelancers while requiring extensive personal information. We're building a true peer-to-peer alternative where privacy isn't just a feature—it's the foundation.
            </p>
            <p className="text-white/70">
              Our platform leverages blockchain technology to create trustless interactions between clients and service providers, ensuring that value flows directly between parties without needless friction.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass p-6 rounded-lg">
              <div className="w-12 h-12 rounded-full bg-skrypto-purple/20 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-skrypto-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h4 className="text-xl font-bold mb-2 text-white">Privacy First</h4>
              <p className="text-white/70">No KYC, no identity verification. Your wallet is your identity.</p>
            </div>
            
            <div className="glass p-6 rounded-lg">
              <div className="w-12 h-12 rounded-full bg-skrypto-blue/20 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-skrypto-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                </svg>
              </div>
              <h4 className="text-xl font-bold mb-2 text-white">True Freedom</h4>
              <p className="text-white/70">Choose how you work, what you charge, and how you receive payment.</p>
            </div>
            
            <div className="glass p-6 rounded-lg">
              <div className="w-12 h-12 rounded-full bg-skrypto-green/20 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-skrypto-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="text-xl font-bold mb-2 text-white">Financial Empowerment</h4>
              <p className="text-white/70">Keep 100% of what you earn. No platform fees, no hidden costs.</p>
            </div>
            
            <div className="glass p-6 rounded-lg">
              <div className="w-12 h-12 rounded-full bg-skrypto-purple/20 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-skrypto-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h4 className="text-xl font-bold mb-2 text-white">Decentralized Trust</h4>
              <p className="text-white/70">Smart contracts ensure work is delivered before payment is released.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
