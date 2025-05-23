
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";

type OnboardingTermsProps = {
  onComplete: () => void;
};

const OnboardingTerms = ({ onComplete }: OnboardingTermsProps) => {
  const { toast } = useToast();
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  
  const handleComplete = () => {
    if (!termsAccepted || !privacyAccepted) {
      toast({
        variant: "destructive",
        title: "Agreement Required",
        description: "You must agree to both the Terms of Service and Privacy Policy to continue.",
      });
      return;
    }
    
    onComplete();
  };
  
  return (
    <div>
      <h2 className="text-2xl font-semibold text-white mb-6 text-center">Almost there!</h2>
      <p className="text-white/70 text-center mb-8">
        Please review and accept our terms to complete your registration
      </p>
      
      <div className="space-y-6 mb-8">
        <div className="bg-white/5 p-6 rounded-xl">
          <h3 className="text-xl font-medium text-white mb-4">Terms of Service</h3>
          <div className="h-40 overflow-y-auto text-white/70 text-sm mb-4 p-2 bg-black/20 rounded">
            <p className="mb-4">
              Welcome to Skrypto. By using our platform, you agree to these terms, which will help ensure a fair and positive experience for everyone.
            </p>
            <p className="mb-4">
              1. <strong>Account Security:</strong> You are responsible for maintaining the confidentiality of your wallet credentials and for all activities that occur under your account.
            </p>
            <p className="mb-4">
              2. <strong>Use of Services:</strong> Our services must be used only for lawful purposes and in accordance with these Terms. You agree not to use our platform for illegal activities or to harm others.
            </p>
            <p className="mb-4">
              3. <strong>Fees and Payments:</strong> We charge a small platform fee for each completed job. All payments are processed through smart contracts on the blockchain.
            </p>
            <p className="mb-4">
              4. <strong>Dispute Resolution:</strong> In the event of a dispute between a client and a freelancer, we provide a resolution process through our smart contract system.
            </p>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="terms" 
              checked={termsAccepted}
              onCheckedChange={(checked) => setTermsAccepted(checked === true)}
            />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none text-white peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              I agree to the Terms of Service
            </label>
          </div>
        </div>
        
        <div className="bg-white/5 p-6 rounded-xl">
          <h3 className="text-xl font-medium text-white mb-4">Privacy Policy</h3>
          <div className="h-40 overflow-y-auto text-white/70 text-sm mb-4 p-2 bg-black/20 rounded">
            <p className="mb-4">
              At Skrypto, we take your privacy seriously. This policy explains how we collect, use, and protect your information.
            </p>
            <p className="mb-4">
              1. <strong>Information Collection:</strong> We collect minimal personal information, mainly your email and wallet address. ID verification is optional but helps build trust on the platform.
            </p>
            <p className="mb-4">
              2. <strong>Information Use:</strong> We use your information to provide and improve our services, process transactions, and communicate with you about your account.
            </p>
            <p className="mb-4">
              3. <strong>Information Sharing:</strong> We do not sell your personal data. Information is shared only as necessary for providing our services or as required by law.
            </p>
            <p className="mb-4">
              4. <strong>Data Security:</strong> We implement measures to protect your information from unauthorized access, using encryption and secure protocols.
            </p>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="privacy" 
              checked={privacyAccepted}
              onCheckedChange={(checked) => setPrivacyAccepted(checked === true)}
            />
            <label
              htmlFor="privacy"
              className="text-sm font-medium leading-none text-white peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              I agree to the Privacy Policy
            </label>
          </div>
        </div>
      </div>
      
      <Button 
        onClick={handleComplete}
        disabled={!termsAccepted || !privacyAccepted}
        className="w-full bg-skrypto-purple hover:bg-skrypto-purple/90"
      >
        Complete Registration
      </Button>
    </div>
  );
};

export default OnboardingTerms;
