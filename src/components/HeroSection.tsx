
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from 'react-router-dom';
import { useWallet } from '@/contexts/WalletContext';
import { useProfile } from '@/contexts/ProfileContext';

const HeroSection = () => {
  const { isConnected } = useWallet();
  const { profile } = useProfile();
  
  const getStartedLink = isConnected ? 
    (profile ? '/dashboard' : '/onboarding') : 
    '#connect-wallet';
  
  const handleGetStarted = () => {
    if (!isConnected) {
      const walletElement = document.querySelector('#connect-wallet');
      if (walletElement) {
        walletElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };
  
  return (
    <section className="py-16 md:py-28 px-4 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-skrypto-purple/30 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-32 -left-20 w-80 h-80 bg-skrypto-blue/20 rounded-full blur-3xl"></div>
      
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="text-gradient-purple neo-glow">Skill up. </span>
            <span className="text-gradient-blue">Cash out. </span>
            <span className="text-white">Anonymously.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto mb-10">
            The first truly anonymous freelance platform. Earn crypto with your skills.
            No KYC. No taxes. Just freedom.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {isConnected ? (
              <Link to={getStartedLink}>
                <Button className="bg-skrypto-purple hover:bg-skrypto-purple/90 text-white px-6 py-6 text-lg glow-purple flex items-center gap-2">
                  Get Started
                  <ArrowRight size={18} />
                </Button>
              </Link>
            ) : (
              <Button 
                onClick={handleGetStarted} 
                className="bg-skrypto-purple hover:bg-skrypto-purple/90 text-white px-6 py-6 text-lg glow-purple flex items-center gap-2"
              >
                Get Started
                <ArrowRight size={18} />
              </Button>
            )}
            <Link to="/explore">
              <Button variant="outline" className="border-skrypto-blue text-white bg-transparent hover:bg-skrypto-blue/20 px-6 py-6 text-lg">
                Browse Gigs
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="glass p-6 rounded-lg animate-float">
            <div className="w-12 h-12 rounded-full bg-skrypto-purple/30 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-skrypto-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2 text-white">100% Anonymous</h3>
            <p className="text-white/70">No personal information needed. Connect your wallet and start earning.</p>
          </div>
          
          <div className="glass p-6 rounded-lg animate-float" style={{animationDelay: "0.2s"}}>
            <div className="w-12 h-12 rounded-full bg-skrypto-blue/30 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-skrypto-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2 text-white">Direct Crypto Payments</h3>
            <p className="text-white/70">Get paid instantly in your preferred cryptocurrency. No middlemen.</p>
          </div>
          
          <div className="glass p-6 rounded-lg animate-float" style={{animationDelay: "0.4s"}}>
            <div className="w-12 h-12 rounded-full bg-skrypto-green/30 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-skrypto-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2 text-white">Lightning Fast</h3>
            <p className="text-white/70">Find jobs or talent quickly. No lengthy onboarding or approval processes.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
