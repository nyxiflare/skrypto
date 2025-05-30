
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BackButton from '@/components/BackButton';
import OfferSkillForm from '@/components/offer/OfferSkillForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const OfferSkill = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-skrypto-dark">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <BackButton to="/explore" />
        </div>
        
        <div className="max-w-4xl mx-auto">
          <Card className="glass border-white/10">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gradient-purple">
                Offer Your Skills
              </CardTitle>
              <p className="text-white/70">
                Share your expertise and start earning in cryptocurrency
              </p>
            </CardHeader>
            <CardContent>
              <OfferSkillForm />
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OfferSkill;
