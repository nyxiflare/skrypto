
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BackButton from '@/components/BackButton';
import { useProfile } from '@/contexts/ProfileContext';
import { useWallet } from '@/contexts/WalletContext';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, DollarSign, Users, Star, Award, Calendar } from 'lucide-react';
import SkillsManager from '@/components/profile/SkillsManager';

const Analytics = () => {
  const { isConnected } = useWallet();
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

  // Mock analytics data - in a real app, this would come from your backend
  const analyticsData = {
    totalEarnings: 2450,
    activeProjects: 3,
    completedJobs: 12,
    clientRating: 4.8,
    profileViews: 156,
    responseRate: 95
  };

  return (
    <div className="min-h-screen bg-skrypto-dark">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <BackButton to="/dashboard" />
            <h1 className="text-3xl font-bold text-gradient-purple">
              {profile.profileType === 'hire' ? 'Client Analytics' : 'Work Analytics'}
            </h1>
          </div>

          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <Card className="glass border-white/10">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white/70">Total Earnings</CardTitle>
                <DollarSign className="h-4 w-4 text-skrypto-green" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">${analyticsData.totalEarnings}</div>
                <p className="text-xs text-white/60">
                  <TrendingUp className="inline h-3 w-3 mr-1" />
                  +12% from last month
                </p>
              </CardContent>
            </Card>

            <Card className="glass border-white/10">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white/70">Active Projects</CardTitle>
                <Users className="h-4 w-4 text-skrypto-blue" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{analyticsData.activeProjects}</div>
                <p className="text-xs text-white/60">Currently in progress</p>
              </CardContent>
            </Card>

            <Card className="glass border-white/10">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white/70">Completed Jobs</CardTitle>
                <Award className="h-4 w-4 text-skrypto-purple" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{analyticsData.completedJobs}</div>
                <p className="text-xs text-white/60">Total completed</p>
              </CardContent>
            </Card>

            <Card className="glass border-white/10">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white/70">Client Rating</CardTitle>
                <Star className="h-4 w-4 text-yellow-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{analyticsData.clientRating}</div>
                <p className="text-xs text-white/60">Out of 5.0 stars</p>
              </CardContent>
            </Card>

            <Card className="glass border-white/10">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white/70">Profile Views</CardTitle>
                <Users className="h-4 w-4 text-skrypto-green" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{analyticsData.profileViews}</div>
                <p className="text-xs text-white/60">This month</p>
              </CardContent>
            </Card>

            <Card className="glass border-white/10">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white/70">Response Rate</CardTitle>
                <Calendar className="h-4 w-4 text-skrypto-blue" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{analyticsData.responseRate}%</div>
                <p className="text-xs text-white/60">Average response time</p>
              </CardContent>
            </Card>
          </div>

          {/* Profile Information */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <Card className="glass border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Profile Overview</CardTitle>
                <CardDescription className="text-white/60">
                  Your current profile status and information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-white/70">Username:</span>
                  <span className="text-white">{profile.username}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/70">Profile Type:</span>
                  <Badge variant="outline" className="border-white/20 text-white">
                    {profile.profileType === 'hire' ? 'Client' : profile.profileType === 'earn' ? 'Freelancer' : 'Guest'}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/70">Email Verified:</span>
                  <Badge variant={profile.emailVerified ? "default" : "destructive"}>
                    {profile.emailVerified ? 'Verified' : 'Not Verified'}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/70">Membership:</span>
                  <Badge variant={profile.subscription?.active ? "default" : "secondary"}>
                    {profile.subscription?.active ? `Active (${profile.subscription.plan})` : 'Inactive'}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="glass border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Skills Summary</CardTitle>
                <CardDescription className="text-white/60">
                  Your offered skills and expertise
                </CardDescription>
              </CardHeader>
              <CardContent>
                {userSkills.length > 0 ? (
                  <div className="space-y-2">
                    {userSkills.slice(0, 5).map((skill) => (
                      <div key={skill.id} className="flex items-center justify-between">
                        <span className="text-white">{skill.skill_name}</span>
                        <span className="text-skrypto-green">${skill.rate}</span>
                      </div>
                    ))}
                    {userSkills.length > 5 && (
                      <p className="text-white/60 text-sm">+{userSkills.length - 5} more skills</p>
                    )}
                  </div>
                ) : (
                  <p className="text-white/60">No skills added yet</p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Skills Management - Only for freelancers */}
          {profile.profileType === 'earn' && (
            <SkillsManager />
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Analytics;
