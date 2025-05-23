
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useProfile } from '@/contexts/ProfileContext';
import { useWallet } from '@/contexts/WalletContext';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { UserRound, Briefcase, FileText, BarChart, Settings } from 'lucide-react';

const Dashboard = () => {
  const { profile } = useProfile();
  const { isConnected } = useWallet();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!isConnected || !profile) {
      navigate('/');
    }
  }, [isConnected, profile, navigate]);

  if (!profile) {
    return null;
  }

  return (
    <div className="min-h-screen bg-skrypto-dark">
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">
          <span className="text-gradient-purple">Welcome, {profile.username}!</span>
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass p-6 rounded-xl col-span-3 md:col-span-1">
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-skrypto-purple/20 rounded-full flex items-center justify-center mb-4">
                {profile.profileImage ? (
                  <img 
                    src={profile.profileImage}
                    alt={profile.username}
                    className="w-full h-full rounded-full object-cover" 
                  />
                ) : (
                  <UserRound size={40} className="text-white" />
                )}
              </div>
              
              <h2 className="text-xl font-semibold text-white mb-1">{profile.username}</h2>
              <p className="text-white/60 mb-4">{profile.email}</p>
              
              <div className="bg-white/5 w-full p-4 rounded-lg mb-4">
                <h3 className="text-white font-medium mb-2">Your Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {profile.skills.map(skill => (
                    <span 
                      key={skill}
                      className="bg-white/10 text-white/80 px-2 py-1 rounded text-xs"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              <Button 
                variant="outline" 
                className="w-full border-white/20 text-white hover:bg-white/10"
              >
                Edit Profile
              </Button>
            </div>
          </div>
          
          <div className="glass p-6 rounded-xl col-span-3 md:col-span-2">
            <h2 className="text-xl font-semibold text-white mb-6">Get Started</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a 
                href="/browse-jobs"
                className="block bg-white/5 p-4 rounded-lg hover:bg-white/10 transition-colors"
              >
                <Briefcase className="text-skrypto-blue mb-2" size={24} />
                <h3 className="text-white font-medium">Browse Jobs</h3>
                <p className="text-white/60 text-sm">Find work that matches your skills</p>
              </a>
              
              <a 
                href="/create-job"
                className="block bg-white/5 p-4 rounded-lg hover:bg-white/10 transition-colors"
              >
                <FileText className="text-skrypto-purple mb-2" size={24} />
                <h3 className="text-white font-medium">Post a Job</h3>
                <p className="text-white/60 text-sm">Hire talent for your project</p>
              </a>
              
              <a 
                href="/analytics"
                className="block bg-white/5 p-4 rounded-lg hover:bg-white/10 transition-colors"
              >
                <BarChart className="text-skrypto-green mb-2" size={24} />
                <h3 className="text-white font-medium">View Analytics</h3>
                <p className="text-white/60 text-sm">Track your earnings and activity</p>
              </a>
              
              <a 
                href="/settings"
                className="block bg-white/5 p-4 rounded-lg hover:bg-white/10 transition-colors"
              >
                <Settings className="text-white/80 mb-2" size={24} />
                <h3 className="text-white font-medium">Account Settings</h3>
                <p className="text-white/60 text-sm">Manage your preferences</p>
              </a>
            </div>
            
            {profile.profileType === "earn" && (
              <div className="mt-6 bg-skrypto-purple/10 p-4 rounded-lg border border-skrypto-purple/30">
                <h3 className="text-white font-medium mb-2">Boost Your Visibility</h3>
                <p className="text-white/70 text-sm mb-4">
                  Subscribe to one of our shop listing plans to showcase your skills to more clients.
                </p>
                <Button className="bg-skrypto-purple hover:bg-skrypto-purple/90">
                  View Subscription Plans
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
