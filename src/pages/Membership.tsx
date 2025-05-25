
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProfile } from '@/contexts/ProfileContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Wallet, Crown, X } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BackButton from '@/components/BackButton';
import { useToast } from "@/components/ui/use-toast";

const Membership = () => {
  const { profile, updateMembership, cancelMembership } = useProfile();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedPlan, setSelectedPlan] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);

  const membershipPlans = [
    {
      id: '3months',
      name: '3 Months',
      price: 15,
      duration: '3 months',
      pricePerMonth: 5,
      savings: '',
      recommended: false,
    },
    {
      id: '9months',
      name: '9 Months',
      price: 39,
      duration: '9 months',
      pricePerMonth: 4.33,
      savings: 'Save $6',
      recommended: true,
    },
    {
      id: '18months',
      name: '18 Months',
      price: 69,
      duration: '18 months',
      pricePerMonth: 3.83,
      savings: 'Save $21',
      recommended: false,
    },
  ];

  const benefits = [
    'Shop visible in talent search',
    'Priority listing in results',
    'Access to premium job alerts',
    'Enhanced profile features',
    'Direct messaging with clients',
    'Analytics and insights dashboard'
  ];

  const handlePayWithWallet = async () => {
    if (!selectedPlan) {
      toast({
        variant: "destructive",
        title: "No Plan Selected",
        description: "Please select a membership plan first.",
      });
      return;
    }

    setIsProcessing(true);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Update membership in database
      await updateMembership(selectedPlan as "3months" | "9months" | "18months");

      // Redirect to dashboard after successful payment
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);

    } catch (error) {
      console.error('Payment error:', error);
      toast({
        variant: "destructive",
        title: "Payment Failed",
        description: "There was an error processing your payment. Please try again.",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCancelMembership = async () => {
    if (!confirm('Are you sure you want to cancel your membership?')) {
      return;
    }

    setIsProcessing(true);
    try {
      await cancelMembership();
    } finally {
      setIsProcessing(false);
    }
  };

  const isActive = profile?.subscription?.active;
  const currentPlan = profile?.subscription?.plan;

  return (
    <div className="min-h-screen bg-skrypto-dark">
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        <div className="mb-6">
          <BackButton to="/dashboard" />
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 neo-glow">
              Choose Your Membership
            </h1>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Unlock premium features and make your profile visible to potential clients
            </p>
          </div>

          {isActive && (
            <div className="mb-8 p-4 glass rounded-xl border border-skrypto-green/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Crown className="text-skrypto-green" size={24} />
                  <div>
                    <h3 className="text-skrypto-green font-semibold">Membership Active</h3>
                    <p className="text-white/70 text-sm">
                      Your {currentPlan} plan is currently active
                      {profile?.subscription?.expiresAt && (
                        <span> until {new Date(profile.subscription.expiresAt).toLocaleDateString()}</span>
                      )}
                    </p>
                  </div>
                </div>
                <Button
                  onClick={handleCancelMembership}
                  disabled={isProcessing}
                  variant="outline"
                  className="border-red-500 text-red-500 hover:bg-red-500/10"
                >
                  <X size={16} className="mr-2" />
                  Cancel Subscription
                </Button>
              </div>
            </div>
          )}

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {membershipPlans.map((plan) => (
              <Card 
                key={plan.id}
                className={`glass border-white/10 relative cursor-pointer transition-all duration-300 ${
                  selectedPlan === plan.id 
                    ? 'border-skrypto-purple/50 ring-2 ring-skrypto-purple/30' 
                    : 'hover:border-white/20'
                } ${plan.recommended ? 'border-skrypto-purple/30' : ''}`}
                onClick={() => setSelectedPlan(plan.id)}
              >
                {plan.recommended && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-skrypto-purple">
                    Most Popular
                  </Badge>
                )}
                
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl text-white">{plan.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-skrypto-green">${plan.price}</span>
                    <div className="text-white/60 text-sm mt-1">
                      ${plan.pricePerMonth.toFixed(2)}/month
                    </div>
                    {plan.savings && (
                      <Badge variant="outline" className="mt-2 border-skrypto-green text-skrypto-green">
                        {plan.savings}
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-3">
                    {benefits.map((benefit, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <Check size={16} className="text-skrypto-green flex-shrink-0" />
                        <span className="text-white/80 text-sm">{benefit}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6">
                    <input
                      type="radio"
                      id={plan.id}
                      name="membership"
                      value={plan.id}
                      checked={selectedPlan === plan.id}
                      onChange={(e) => setSelectedPlan(e.target.value)}
                      className="sr-only"
                    />
                    <label 
                      htmlFor={plan.id}
                      className={`block w-full p-3 rounded-lg border text-center cursor-pointer transition-colors ${
                        selectedPlan === plan.id
                          ? 'border-skrypto-purple bg-skrypto-purple/10 text-skrypto-purple'
                          : 'border-white/20 text-white/60 hover:border-white/40'
                      }`}
                    >
                      {selectedPlan === plan.id ? 'Selected' : 'Select Plan'}
                    </label>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {!isActive && (
            <div className="text-center">
              <Button
                onClick={handlePayWithWallet}
                disabled={!selectedPlan || isProcessing}
                className="bg-skrypto-purple hover:bg-skrypto-purple/90 text-white px-8 py-6 text-lg glow-purple flex items-center gap-3 mx-auto"
              >
                <Wallet size={20} />
                {isProcessing ? 'Processing Payment...' : 'Pay with Wallet'}
              </Button>
              
              <p className="text-white/60 text-sm mt-4">
                Secure payment via your connected wallet
              </p>
            </div>
          )}

          {!isActive && (
            <div className="mt-12 p-6 glass rounded-xl border border-yellow-500/30">
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 rounded-full bg-yellow-500 flex-shrink-0 mt-2"></div>
                <div>
                  <h3 className="text-yellow-500 font-semibold mb-2">Shop Currently Hidden</h3>
                  <p className="text-white/70">
                    Your profile is not visible in talent search results. Activate a membership plan to be discovered by potential clients.
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="mt-12 p-6 glass rounded-xl border border-white/10">
            <h3 className="text-white font-semibold mb-4">Platform Fee Notice</h3>
            <p className="text-white/70">
              A $2 platform fee is automatically deducted from each transaction to keep the network running and maintain the platform.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Membership;
