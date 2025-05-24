
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWallet } from '@/contexts/WalletContext';
import BackButton from '@/components/BackButton';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import WalletConnect from '@/components/WalletConnect';
import { Briefcase, DollarSign, Users } from 'lucide-react';

const Connect = () => {
  const [step, setStep] = useState<'connect' | 'role'>('connect');
  const [selectedRole, setSelectedRole] = useState<string>('');
  const { isConnected } = useWallet();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (isConnected && step === 'connect') {
      setStep('role');
    }
  }, [isConnected, step]);

  const handleRoleSelect = (role: string) => {
    setSelectedRole(role);
    // Store role temporarily in localStorage for onboarding
    localStorage.setItem('selectedRole', role);
    navigate('/onboarding');
  };

  const roleOptions = [
    {
      id: 'hire',
      title: 'Hire Someone',
      description: 'Post jobs and find talented freelancers',
      icon: Briefcase,
      color: 'bg-skrypto-purple'
    },
    {
      id: 'earn',
      title: 'Earn Money',
      description: 'Offer your skills and complete projects',
      icon: DollarSign,
      color: 'bg-skrypto-green'
    },
    {
      id: 'fun',
      title: 'Just for Fun',
      description: 'Browse and explore the platform',
      icon: Users,
      color: 'bg-skrypto-blue'
    }
  ];

  return (
    <div className="min-h-screen bg-skrypto-dark flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="mb-6">
          <BackButton to="/" />
        </div>
        
        {step === 'connect' ? (
          <Card className="glass border-white/10">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-white mb-2">Welcome to Skrypto</CardTitle>
              <CardDescription className="text-white/70">
                Connect your wallet to get started on the anonymous freelance platform
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-6">
              <WalletConnect />
              <p className="text-white/60 text-center text-sm">
                By connecting your wallet, you agree to our Terms of Service and Privacy Policy
              </p>
            </CardContent>
          </Card>
        ) : (
          <Card className="glass border-white/10">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-white mb-2">Choose Your Path</CardTitle>
              <CardDescription className="text-white/70">
                How would you like to use Skrypto?
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {roleOptions.map((option) => {
                const IconComponent = option.icon;
                return (
                  <Button
                    key={option.id}
                    onClick={() => handleRoleSelect(option.id)}
                    variant="outline"
                    className="w-full p-6 h-auto border-white/10 hover:bg-white/5 flex items-center gap-4 text-left"
                  >
                    <div className={`w-12 h-12 rounded-full ${option.color}/30 flex items-center justify-center`}>
                      <IconComponent size={24} className={`text-${option.color.split('-')[1]}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-semibold">{option.title}</h3>
                      <p className="text-white/70 text-sm">{option.description}</p>
                    </div>
                  </Button>
                );
              })}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Connect;
