
import React from 'react';
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-skrypto-dark">
      <Navbar />
      <div className="flex-grow flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="text-8xl font-bold mb-4 text-gradient-purple">404</div>
          <h1 className="text-3xl font-bold mb-4 text-white">Page Not Found</h1>
          <p className="text-white/70 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Button asChild className="bg-skrypto-purple hover:bg-skrypto-purple/90 text-white">
            <Link to="/">Return to Home</Link>
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
