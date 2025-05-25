
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useWallet } from '@/contexts/WalletContext';
import { useProfile } from '@/contexts/ProfileContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiresProfile?: boolean;
  guestRestricted?: boolean;
  clientOnly?: boolean;
  freelancerOnly?: boolean;
}

const ProtectedRoute = ({ 
  children, 
  requiresProfile = false, 
  guestRestricted = false,
  clientOnly = false,
  freelancerOnly = false
}: ProtectedRouteProps) => {
  const { isConnected } = useWallet();
  const { profile, isProfileComplete } = useProfile();

  // If wallet not connected, redirect to connect page
  if (!isConnected) {
    return <Navigate to="/connect" replace />;
  }

  // If profile is required but not complete, redirect to onboarding
  if (requiresProfile && !isProfileComplete) {
    return <Navigate to="/onboarding" replace />;
  }

  // If guest users are restricted from this route
  if (guestRestricted && profile?.profileType === 'fun') {
    return (
      <div className="min-h-screen bg-skrypto-dark flex items-center justify-center">
        <div className="max-w-md mx-auto p-6 glass rounded-xl text-center">
          <h2 className="text-xl font-bold text-white mb-4">Access Restricted</h2>
          <p className="text-white/70 mb-6">
            This feature is only available for working users. Update your profile type in settings to access this feature.
          </p>
          <button
            onClick={() => window.history.back()}
            className="bg-skrypto-purple hover:bg-skrypto-purple/90 text-white px-6 py-2 rounded"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // If route is client-only but user is not a client
  if (clientOnly && profile?.profileType !== 'hire') {
    return (
      <div className="min-h-screen bg-skrypto-dark flex items-center justify-center">
        <div className="max-w-md mx-auto p-6 glass rounded-xl text-center">
          <h2 className="text-xl font-bold text-white mb-4">Client Access Only</h2>
          <p className="text-white/70 mb-6">
            This feature is only available for clients who hire freelancers. Please update your profile type to access this feature.
          </p>
          <button
            onClick={() => window.history.back()}
            className="bg-skrypto-purple hover:bg-skrypto-purple/90 text-white px-6 py-2 rounded"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // If route is freelancer-only but user is not a freelancer
  if (freelancerOnly && profile?.profileType !== 'earn') {
    return (
      <div className="min-h-screen bg-skrypto-dark flex items-center justify-center">
        <div className="max-w-md mx-auto p-6 glass rounded-xl text-center">
          <h2 className="text-xl font-bold text-white mb-4">Freelancer Access Only</h2>
          <p className="text-white/70 mb-6">
            This feature is only available for freelancers who offer services. Please update your profile type to access this feature.
          </p>
          <button
            onClick={() => window.history.back()}
            className="bg-skrypto-purple hover:bg-skrypto-purple/90 text-white px-6 py-2 rounded"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
