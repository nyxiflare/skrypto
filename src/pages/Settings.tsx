
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useProfile } from '@/contexts/ProfileContext';
import { useWallet } from '@/contexts/WalletContext';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, User, Bell, Shield, Wallet } from 'lucide-react';

const Settings = () => {
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

  return (
    <div className="min-h-screen bg-skrypto-dark">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(-1)}
              className="text-white hover:bg-white/10"
            >
              <ArrowLeft size={16} className="mr-2" />
              Back
            </Button>
            <h1 className="text-3xl font-bold text-gradient-purple">Settings</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="glass border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <User size={20} />
                  Profile Settings
                </CardTitle>
                <CardDescription className="text-white/60">
                  Manage your profile information and preferences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="border-skrypto-purple text-white hover:bg-skrypto-purple/20">
                  Edit Profile
                </Button>
              </CardContent>
            </Card>

            <Card className="glass border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Bell size={20} />
                  Notifications
                </CardTitle>
                <CardDescription className="text-white/60">
                  Configure your notification preferences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="border-skrypto-blue text-white hover:bg-skrypto-blue/20">
                  Manage Notifications
                </Button>
              </CardContent>
            </Card>

            <Card className="glass border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Shield size={20} />
                  Privacy & Security
                </CardTitle>
                <CardDescription className="text-white/60">
                  Manage your privacy and security settings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="border-skrypto-green text-white hover:bg-skrypto-green/20">
                  Security Settings
                </Button>
              </CardContent>
            </Card>

            <Card className="glass border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Wallet size={20} />
                  Wallet Settings
                </CardTitle>
                <CardDescription className="text-white/60">
                  Manage your connected wallet and payment methods
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="border-yellow-500 text-white hover:bg-yellow-500/20">
                  Wallet Settings
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Settings;
