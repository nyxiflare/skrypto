
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BackButton from '@/components/BackButton';
import { useProfile } from '@/contexts/ProfileContext';
import { useWallet } from '@/contexts/WalletContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Crown, Star, Zap } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

const Membership = () => {
  const { profile } = useProfile();
  const { isConnected } = useWallet();
  const { toast } = useToast();
  const [selectedPlan, setSelectedPlan] = useState<string>('');
  const [membershipActive, setMembershipActive] = useState(false);
  const [processing, setProcessing] = useState(false);

  const plans = [
    {
      id: 'monthly',
      name: 'Monthly Plan',
      price: '$5',
      period: '/month',
      icon: Zap,
      color: 'bg-skrypto-blue',
      features: [
        'Shop visibility in search',
        'Basic analytics',
        'Standard support',
        'Up to 10 active gigs'
      ]
    },
    {
      id: '9month',
      name: '9-Month Plan',
      price: '$39',
      period: 'total (save $6)',
      icon: Star,
      color: 'bg-skrypto-purple',
      popular: true,
      features: [
        'Everything in Monthly',
        'Priority search ranking',
        'Advanced analytics',
        'Unlimited active gigs',
        'Priority support'
      ]
    },
    {
      id: '18month',
      name: '18-Month Plan',
      price: '$69',
      period: 'total (save $21)',
      icon: Crown,
      color: 'bg-skrypto-green',
      features: [
        'Everything in 9-Month',
        'Premium badge',
        'Featured listings',
        'Custom portfolio themes',
        'VIP support'
      ]
    }
  ];

  const handlePayment = async (planId: string) => {
    if (!isConnected) {
      toast({
        title: "Wallet Required",
        description: "Please connect your wallet to purchase a membership.",
        variant: "destructive"
      });
      return;
    }

    setProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setMembershipActive(true);
      setProcessing(false);
      localStorage.setItem('membershipActive', 'true');
      localStorage.setItem('membershipPlan', planId);
      
      toast({
        title: "Payment Successful!",
        description: "Your membership is now active. Your shop is visible in search.",
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-skrypto-dark">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <BackButton />
            <div>
              <h1 className="text-3xl font-bold text-gradient-purple">Membership Plans</h1>
              <p className="text-white/70 mt-2">Choose a plan to keep your shop visible and unlock premium features</p>
            </div>
          </div>

          {!membershipActive && profile?.profileType === 'earn' && (
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 mb-8">
              <p className="text-yellow-300 text-center">
                ⚠️ Your shop is currently hidden from search. Choose a membership plan to become visible to clients.
              </p>
            </div>
          )}

          {membershipActive && (
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 mb-8 flex items-center justify-center gap-2">
              <Check className="text-green-500" size={20} />
              <span className="text-green-300">Membership Active - Your shop is visible in search!</span>
            </div>
          )}

          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((plan) => {
              const IconComponent = plan.icon;
              return (
                <Card 
                  key={plan.id} 
                  className={`glass border-white/10 relative ${selectedPlan === plan.id ? 'ring-2 ring-skrypto-purple' : ''}`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-skrypto-purple text-white">Most Popular</Badge>
                    </div>
                  )}
                  
                  <CardHeader className="text-center">
                    <div className={`w-16 h-16 mx-auto rounded-full ${plan.color}/20 flex items-center justify-center mb-4`}>
                      <IconComponent size={32} className="text-white" />
                    </div>
                    <CardTitle className="text-white text-xl">{plan.name}</CardTitle>
                    <div className="text-center">
                      <span className="text-3xl font-bold text-white">{plan.price}</span>
                      <span className="text-white/60 text-sm ml-1">{plan.period}</span>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-white/80">
                          <Check size={16} className="text-green-500 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Button
                      onClick={() => {
                        setSelectedPlan(plan.id);
                        handlePayment(plan.id);
                      }}
                      disabled={processing || membershipActive}
                      className={`w-full ${plan.color} hover:opacity-90 text-white`}
                    >
                      {processing && selectedPlan === plan.id ? (
                        "Processing..."
                      ) : membershipActive ? (
                        "Current Plan"
                      ) : (
                        "Pay with Wallet"
                      )}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="mt-8 p-4 glass rounded-lg">
            <h3 className="text-white font-semibold mb-2">Platform Fee Notice</h3>
            <p className="text-white/70 text-sm">
              Note: A $2 platform fee is automatically deducted from each transaction to keep the network running and maintain platform security.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Membership;
