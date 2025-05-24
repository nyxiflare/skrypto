
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BackButton from '@/components/BackButton';
import { useProfile } from '@/contexts/ProfileContext';
import { useWallet } from '@/contexts/WalletContext';
import { useNavigate } from 'react-router-dom';
import OnboardingProfileType from '@/components/onboarding/OnboardingProfileType';
import OnboardingUserInfo from '@/components/onboarding/OnboardingUserInfo';
import OnboardingIdVerification from '@/components/onboarding/OnboardingIdVerification';
import OnboardingSkills from '@/components/onboarding/OnboardingSkills';
import OnboardingTerms from '@/components/onboarding/OnboardingTerms';

enum OnboardingStep {
  ProfileType,
  UserInfo,
  IdVerification,
  Skills,
  Terms
}

const Onboarding = () => {
  const { isConnected } = useWallet();
  const { profile, isOnboarding, startOnboarding, completeOnboarding } = useProfile();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<OnboardingStep>(OnboardingStep.UserInfo);

  React.useEffect(() => {
    if (!isConnected) {
      navigate('/');
    }
    
    // Check if role was already selected from /connect page
    const selectedRole = localStorage.getItem('selectedRole');
    if (selectedRole && !profile?.profileType) {
      startOnboarding(selectedRole as "hire" | "earn" | "fun");
    }
  }, [isConnected, navigate, profile?.profileType, startOnboarding]);

  const handleStepBack = () => {
    if (currentStep === OnboardingStep.UserInfo) {
      navigate('/connect');
    } else {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case OnboardingStep.UserInfo:
        return <OnboardingUserInfo onNext={() => setCurrentStep(OnboardingStep.IdVerification)} />;
      case OnboardingStep.IdVerification:
        return <OnboardingIdVerification onNext={() => setCurrentStep(OnboardingStep.Skills)} onSkip={() => setCurrentStep(OnboardingStep.Skills)} />;
      case OnboardingStep.Skills:
        return <OnboardingSkills onNext={() => setCurrentStep(OnboardingStep.Terms)} />;
      case OnboardingStep.Terms:
        return <OnboardingTerms onComplete={() => {
          completeOnboarding();
          navigate('/home');
        }} />;
      default:
        return <OnboardingUserInfo onNext={() => setCurrentStep(OnboardingStep.IdVerification)} />;
    }
  };

  return (
    <div className="min-h-screen bg-skrypto-dark">
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <BackButton onClick={handleStepBack} />
            <h1 className="text-3xl md:text-4xl font-bold">
              <span className="text-gradient-purple">Create Your Profile</span>
            </h1>
          </div>
          
          <div className="glass p-8 rounded-xl">
            {renderStep()}
          </div>
          
          <div className="mt-8 flex justify-center">
            <div className="flex gap-2">
              {[...Array(4)].map((_, idx) => (
                <div 
                  key={idx}
                  className={`h-2 w-12 rounded-full ${idx === currentStep - 1 ? 'bg-skrypto-purple' : 'bg-white/20'}`}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Onboarding;
