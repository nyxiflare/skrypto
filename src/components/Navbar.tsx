
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { PenLine, Bitcoin } from 'lucide-react';
import { Link } from 'react-router-dom';
import WalletConnect from '@/components/WalletConnect';
import { useWallet } from '@/contexts/WalletContext';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isConnected } = useWallet();

  return (
    <header className="relative z-50">
      <nav className="glass px-4 md:px-6 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <Bitcoin className="h-8 w-8 text-skrypto-purple mr-2" />
            <span className="text-xl font-bold text-gradient-purple">Skrypto</span>
          </Link>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-white/80 hover:text-white transition-colors">
            Home
          </Link>
          <Link to="/explore" className="text-white/80 hover:text-white transition-colors">
            Explore Talent
          </Link>
          <Link to="/offer-skill" className="text-white/80 hover:text-white transition-colors flex items-center gap-1">
            <PenLine size={16} />
            Offer Your Skill
          </Link>
          <Link to="/about" className="text-white/80 hover:text-white transition-colors">
            About
          </Link>
          <Link to="/faq" className="text-white/80 hover:text-white transition-colors">
            FAQ
          </Link>
          
          {/* Desktop wallet connection */}
          <div className="ml-4">
            {isConnected ? (
              <WalletConnect />
            ) : (
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="border-skrypto-purple text-white bg-transparent hover:bg-skrypto-purple/20 flex items-center gap-2">
                    Connect Wallet
                  </Button>
                </SheetTrigger>
                <SheetContent className="glass border-white/10">
                  <div className="flex flex-col items-center justify-center h-full space-y-8">
                    <h2 className="text-2xl font-bold text-white">Connect Your Wallet</h2>
                    <p className="text-white/70 text-center mb-4">
                      Connect your wallet to access all features on Skrypto
                    </p>
                    <WalletConnect />
                  </div>
                </SheetContent>
              </Sheet>
            )}
          </div>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {mobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="glass md:hidden absolute w-full py-2 px-4 space-y-3">
          <Link
            to="/"
            className="block py-2 text-white/80 hover:text-white"
            onClick={() => setMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/explore"
            className="block py-2 text-white/80 hover:text-white"
            onClick={() => setMobileMenuOpen(false)}
          >
            Explore Talent
          </Link>
          <Link
            to="/offer-skill"
            className="block py-2 text-white/80 hover:text-white flex items-center gap-1"
            onClick={() => setMobileMenuOpen(false)}
          >
            <PenLine size={16} />
            Offer Your Skill
          </Link>
          <Link
            to="/about"
            className="block py-2 text-white/80 hover:text-white"
            onClick={() => setMobileMenuOpen(false)}
          >
            About
          </Link>
          <Link
            to="/faq"
            className="block py-2 text-white/80 hover:text-white"
            onClick={() => setMobileMenuOpen(false)}
          >
            FAQ
          </Link>
          <div className="py-2">
            <WalletConnect />
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
