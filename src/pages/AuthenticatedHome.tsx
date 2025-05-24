
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useProfile } from '@/contexts/ProfileContext';
import { useWallet } from '@/contexts/WalletContext';
import { useNavigate, Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageCircle, Bell, DollarSign, Briefcase, TrendingUp } from 'lucide-react';

const mockNewTalents = [
  {
    id: 1,
    username: 'crypto_dev',
    skills: ['Web3', 'Smart Contracts'],
    avatar: null,
    rating: 4.9
  },
  {
    id: 2,
    username: 'ui_wizard',
    skills: ['UI/UX', 'Figma'],
    avatar: null,
    rating: 4.8
  },
  {
    id: 3,
    username: 'ai_specialist',
    skills: ['AI/ML', 'Python'],
    avatar: null,
    rating: 4.7
  }
];

const AuthenticatedHome = () => {
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
        <div className="max-w-6xl mx-auto">
          {/* Welcome Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gradient-purple mb-2">
              Welcome back, {profile.username}!
            </h1>
            <p className="text-white/70">
              Here's what's happening in your network
            </p>
          </div>

          {/* Dashboard Snippets */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="glass border-white/10">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white">
                  Earnings This Week
                </CardTitle>
                <DollarSign className="h-4 w-4 text-skrypto-green" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-skrypto-green">2.5 ETH</div>
                <p className="text-xs text-white/60">
                  +20.1% from last week
                </p>
              </CardContent>
            </Card>

            <Card className="glass border-white/10">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white">
                  Jobs in Progress
                </CardTitle>
                <Briefcase className="h-4 w-4 text-skrypto-blue" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">3</div>
                <p className="text-xs text-white/60">
                  2 due this week
                </p>
              </CardContent>
            </Card>

            <Card className="glass border-white/10">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white">
                  Unread Messages
                </CardTitle>
                <MessageCircle className="h-4 w-4 text-skrypto-purple" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">7</div>
                <p className="text-xs text-white/60">
                  3 urgent
                </p>
              </CardContent>
            </Card>
          </div>

          {/* New Talents Section */}
          <Card className="glass border-white/10 mb-8">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <TrendingUp size={20} />
                New Talents You Might Like
              </CardTitle>
              <CardDescription className="text-white/60">
                Recently joined skilled professionals
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 overflow-x-auto pb-4">
                {mockNewTalents.map((talent) => (
                  <div
                    key={talent.id}
                    className="flex-shrink-0 w-64 p-4 rounded-lg border border-white/10 hover:bg-white/5 cursor-pointer"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <Avatar className="h-12 w-12">
                        {talent.avatar ? (
                          <AvatarImage src={talent.avatar} alt={talent.username} />
                        ) : (
                          <AvatarFallback className="bg-skrypto-purple/30 text-white">
                            {talent.username.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        )}
                      </Avatar>
                      <div>
                        <h3 className="text-white font-semibold">{talent.username}</h3>
                        <div className="flex items-center gap-1">
                          <span className="text-yellow-400">★</span>
                          <span className="text-white/70 text-sm">{talent.rating}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {talent.skills.map((skill, idx) => (
                        <Badge
                          key={idx}
                          variant="secondary"
                          className="bg-skrypto-purple/20 text-white text-xs"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                    <Button
                      size="sm"
                      className="w-full bg-skrypto-purple/20 hover:bg-skrypto-purple/30 text-white border border-skrypto-purple"
                    >
                      View Profile
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="flex flex-wrap gap-4">
            <Button asChild className="bg-skrypto-purple hover:bg-skrypto-purple/90 text-white">
              <Link to="/explore">
                <Briefcase className="mr-2" size={16} />
                Explore Jobs
              </Link>
            </Button>
            <Button asChild variant="outline" className="border-skrypto-blue text-white hover:bg-skrypto-blue/20">
              <Link to="/dashboard">
                <TrendingUp className="mr-2" size={16} />
                View Dashboard
              </Link>
            </Button>
          </div>
        </div>

        {/* Floating Mini Inbox Widget */}
        <div className="fixed bottom-6 right-6">
          <Button
            size="icon"
            className="h-14 w-14 rounded-full bg-skrypto-purple hover:bg-skrypto-purple/90 shadow-lg glow-purple"
            asChild
          >
            <Link to="/inbox">
              <MessageCircle size={24} />
              <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 rounded-full text-xs flex items-center justify-center text-white">
                3
              </span>
            </Link>
          </Button>
        </div>

        {/* Notification Badge (top-right area) */}
        <div className="fixed top-20 right-6">
          <Button
            size="icon"
            variant="outline"
            className="border-white/10 bg-black/20 backdrop-blur-sm hover:bg-white/5"
            asChild
          >
            <Link to="/notifications">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-yellow-500 rounded-full text-xs flex items-center justify-center text-white">
                2
              </span>
            </Link>
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AuthenticatedHome;
