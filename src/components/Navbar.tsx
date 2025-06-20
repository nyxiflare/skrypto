
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Bitcoin, Inbox } from 'lucide-react';
import { Link } from 'react-router-dom';
import WalletConnect from '@/components/WalletConnect';
import ProfileButton from '@/components/ProfileButton';
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
          <Link to="/about" className="text-white/80 hover:text-white transition-colors">
            About
          </Link>
          <Link to="/faq" className="text-white/80 hover:text-white transition-colors">
            FAQ
          </Link>
          
          {/* Add Membership and Inbox links for logged-in users */}
          {isConnected && (
            <>
              <Link to="/membership" className="text-white/80 hover:text-white transition-colors">
                Membership
              </Link>
              <Link to="/inbox" className="text-white/80 hover:text-white transition-colors flex items-center gap-1">
                <Inbox size={16} />
                Inbox
              </Link>
            </>
          )}
          
          {/* Desktop wallet connection and profile */}
          <div className="ml-4 flex items-center gap-2">
            {isConnected ? (
              <>
                <ProfileButton />
                <WalletConnect />
              </>
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
          {isConnected && (
            <>
              <Link
                to="/membership"
                className="block py-2 text-white/80 hover:text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                Membership
              </Link>
              <Link
                to="/inbox"
                className="flex items-center gap-2 py-2 text-white/80 hover:text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Inbox size={16} />
                Inbox
              </Link>
            </>
          )}
          <div className="py-2 flex flex-col gap-2">
            {isConnected && <ProfileButton />}
            <WalletConnect />
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
