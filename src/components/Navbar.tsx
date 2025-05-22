
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Wallet, PenLine, Bitcoin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
          <Button variant="outline" className="ml-4 border-skrypto-purple text-white bg-transparent hover:bg-skrypto-purple/20 flex items-center gap-2">
            <Wallet size={16} />
            Connect Wallet
          </Button>
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
          <Button variant="outline" className="w-full mt-2 mb-2 border-skrypto-purple text-white bg-transparent hover:bg-skrypto-purple/20 flex items-center justify-center gap-2">
            <Wallet size={16} />
            Connect Wallet
          </Button>
        </div>
      )}
    </header>
  );
};

export default Navbar;
