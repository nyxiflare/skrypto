
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useProfile } from '@/contexts/ProfileContext';
import { useToast } from "@/components/ui/use-toast";

type OnboardingUserInfoProps = {
  onNext: () => void;
};

const OnboardingUserInfo = ({ onNext }: OnboardingUserInfoProps) => {
  const { profile, updateProfile } = useProfile();
  const { toast } = useToast();
  const [username, setUsername] = useState(profile?.username || '');
  const [email, setEmail] = useState(profile?.email || '');
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationSent, setVerificationSent] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  
  // Mock verification code for demo purposes
  const mockCode = "123456";
  
  const handleSendVerification = () => {
    if (!email || !username) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter both username and email",
      });
      return;
    }
    
    // Update profile with current values
    updateProfile({ username, email });
    
    // In a real app, we would send an email here
    setVerificationSent(true);
    toast({
      title: "Verification Code Sent",
      description: `Code sent to ${email}. Use 123456 for this demo.`,
    });
  };
  
  const handleVerifyCode = () => {
    setIsVerifying(true);
    
    // Mock verification delay
    setTimeout(() => {
      if (verificationCode === mockCode) {
        updateProfile({ emailVerified: true });
        toast({
          title: "Email Verified",
          description: "Your email has been successfully verified.",
        });
        onNext();
      } else {
        toast({
          variant: "destructive",
          title: "Verification Failed",
          description: "Incorrect code. Please try again. (Hint: use 123456)",
        });
      }
      setIsVerifying(false);
    }, 1000);
  };
  
  return (
    <div>
      <h2 className="text-2xl font-semibold text-white mb-6 text-center">Create your account</h2>
      
      <div className="space-y-6">
        <div>
          <label className="block text-white mb-2" htmlFor="username">Username</label>
          <Input
            id="username"
            placeholder="Choose a username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="bg-white/5 border-white/10 text-white"
          />
        </div>
        
        <div>
          <label className="block text-white mb-2" htmlFor="email">Email Address</label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-white/5 border-white/10 text-white"
          />
        </div>
        
        {verificationSent ? (
          <div className="mt-6">
            <label className="block text-white mb-2" htmlFor="verificationCode">Verification Code</label>
            <div className="flex gap-4">
              <Input
                id="verificationCode"
                placeholder="Enter the 6-digit code"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                className="bg-white/5 border-white/10 text-white"
              />
              <Button 
                onClick={handleVerifyCode}
                disabled={verificationCode.length !== 6 || isVerifying}
                className="bg-skrypto-purple hover:bg-skrypto-purple/90"
              >
                {isVerifying ? "Verifying..." : "Verify"}
              </Button>
            </div>
            <p className="mt-2 text-sm text-white/60">
              For this demo, use the code: 123456
            </p>
          </div>
        ) : (
          <Button 
            onClick={handleSendVerification}
            disabled={!username || !email}
            className="w-full bg-skrypto-purple hover:bg-skrypto-purple/90"
          >
            Send Verification Code
          </Button>
        )}
      </div>
    </div>
  );
};

export default OnboardingUserInfo;
