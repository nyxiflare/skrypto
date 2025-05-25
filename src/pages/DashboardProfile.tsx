
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BackButton from '@/components/BackButton';
import { useProfile } from '@/contexts/ProfileContext';
import { useWallet } from '@/contexts/WalletContext';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Mail, Wallet, Star, MessageCircle, Settings, Eye, Edit } from 'lucide-react';
import SkillsManager from '@/components/profile/SkillsManager';

const DashboardProfile = () => {
  const { isConnected, address } = useWallet();
  const { profile, userSkills, isProfileComplete } = useProfile();
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

  const maskWalletAddress = (address: string) => {
    if (!address) return '';
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  return (
    <div className="min-h-screen bg-skrypto-dark">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <BackButton to="/dashboard" />
            <h1 className="text-3xl font-bold text-gradient-purple">My Profile</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Overview */}
            <div className="lg:col-span-1">
              <Card className="glass border-white/10 mb-6">
                <CardHeader className="text-center">
                  <Avatar className="h-24 w-24 mx-auto mb-4">
                    {profile.profileImage ? (
                      <AvatarImage src={profile.profileImage} alt={profile.username} />
                    ) : (
                      <AvatarFallback className="bg-skrypto-purple/30 text-white text-2xl">
                        {profile.username?.substring(0, 2).toUpperCase() || 'U'}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <CardTitle className="text-white text-xl">{profile.username}</CardTitle>
                  <CardDescription className="text-white/60">
                    {profile.profileType === 'hire' ? 'Client' : profile.profileType === 'earn' ? 'Freelancer' : 'Guest User'}
                  </CardDescription>
                  <div className="flex gap-2 justify-center mt-4">
                    <Button size="sm" className="bg-skrypto-purple hover:bg-skrypto-purple/90">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Profile
                    </Button>
                    <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/5">
                      <Eye className="h-4 w-4 mr-2" />
                      Public View
                    </Button>
                  </div>
                </CardHeader>
              </Card>

              {/* Quick Stats */}
              <Card className="glass border-white/10 mb-6">
                <CardHeader>
                  <CardTitle className="text-white text-lg">Quick Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-white/70">Profile Type:</span>
                    <Badge variant="outline" className="border-white/20 text-white">
                      {profile.profileType === 'hire' ? 'Client' : profile.profileType === 'earn' ? 'Freelancer' : 'Guest'}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/70">Skills Offered:</span>
                    <span className="text-white">{userSkills.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/70">Rating:</span>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 mr-1" />
                      <span className="text-white">4.8</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/70">Projects:</span>
                    <span className="text-white">12 completed</span>
                  </div>
                </CardContent>
              </Card>

              {/* Wallet Info */}
              <Card className="glass border-white/10">
                <CardHeader>
                  <CardTitle className="text-white text-lg flex items-center">
                    <Wallet className="h-5 w-5 mr-2" />
                    Wallet Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-white/70 text-sm mb-1">Connected Address</p>
                    <p className="text-white font-mono text-sm">{maskWalletAddress(address || '')}</p>
                  </div>
                  <div>
                    <p className="text-white/70 text-sm mb-1">Provider</p>
                    <p className="text-white">MetaMask</p>
                  </div>
                  <Button variant="outline" size="sm" className="w-full border-white/20 text-white hover:bg-white/5">
                    <Settings className="h-4 w-4 mr-2" />
                    Wallet Settings
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Profile Details */}
              <Card className="glass border-white/10 mb-6">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <User className="h-5 w-5 mr-2" />
                    Profile Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-white/70 text-sm">Username</label>
                      <p className="text-white">{profile.username || 'Not set'}</p>
                    </div>
                    <div>
                      <label className="text-white/70 text-sm">Email</label>
                      <div className="flex items-center gap-2">
                        <p className="text-white">{profile.email || 'Not set'}</p>
                        {profile.emailVerified && (
                          <Badge variant="default" className="text-xs">Verified</Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="text-white/70 text-sm">Bio</label>
                    <p className="text-white">{profile.bio || 'No bio added yet'}</p>
                  </div>
                  <Button className="bg-skrypto-blue hover:bg-skrypto-blue/90">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Information
                  </Button>
                </CardContent>
              </Card>

              {/* Message Center */}
              <Card className="glass border-white/10 mb-6">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <MessageCircle className="h-5 w-5 mr-2" />
                    Message Center
                  </CardTitle>
                  <CardDescription className="text-white/60">
                    Manage your conversations with clients and freelancers
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                    <div>
                      <p className="text-white">3 unread messages</p>
                      <p className="text-white/60 text-sm">Last message 2 hours ago</p>
                    </div>
                    <Button variant="outline" className="border-white/20 text-white hover:bg-white/5">
                      Open Messages
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Skills Management - Only for freelancers */}
              {profile.profileType === 'earn' && (
                <SkillsManager />
              )}

              {/* Mini Analytics for Freelancers */}
              {profile.profileType === 'earn' && (
                <Card className="glass border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white">Performance Overview</CardTitle>
                    <CardDescription className="text-white/60">
                      Quick view of your recent performance
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-white/5 rounded-lg">
                        <p className="text-2xl font-bold text-skrypto-green">$2,450</p>
                        <p className="text-white/70 text-sm">This Month</p>
                      </div>
                      <div className="text-center p-4 bg-white/5 rounded-lg">
                        <p className="text-2xl font-bold text-skrypto-blue">3</p>
                        <p className="text-white/70 text-sm">Active Projects</p>
                      </div>
                      <div className="text-center p-4 bg-white/5 rounded-lg">
                        <p className="text-2xl font-bold text-yellow-500">4.8</p>
                        <p className="text-white/70 text-sm">Rating</p>
                      </div>
                    </div>
                    <Button 
                      className="w-full mt-4 bg-skrypto-purple hover:bg-skrypto-purple/90"
                      onClick={() => navigate('/dashboard/analytics')}
                    >
                      View Full Analytics
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DashboardProfile;
