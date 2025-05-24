
import React from 'react';
import { useProfile } from '@/contexts/ProfileContext';
import { useWallet } from '@/contexts/WalletContext';
import { useNavigate } from 'react-router-dom';
import ClientDashboard from '@/components/dashboard/ClientDashboard';
import FreelancerDashboard from '@/components/dashboard/FreelancerDashboard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Dashboard = () => {
  const { isConnected } = useWallet();
  const { profile, isProfileComplete } = useProfile();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!isConnected) {
      navigate('/');
    }
    if (!isProfileComplete) {
      navigate('/onboarding');
    }
  }, [isConnected, isProfileComplete, navigate]);

  if (!profile || !isProfileComplete) {
    return null;
  }

  // Determine which dashboard to show based on profile type
  const renderDashboard = () => {
    if (profile.profileType === 'client') {
      return <ClientDashboard />;
    } else {
      return <FreelancerDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-skrypto-dark">
      <Navbar />
      {renderDashboard()}
      <Footer />
    </div>
  );
};

export default Dashboard;
