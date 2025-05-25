
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BackButton from '@/components/BackButton';
import { useProfile } from '@/contexts/ProfileContext';
import { useWallet } from '@/contexts/WalletContext';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, DollarSign, Users, Star, Award, Calendar, BarChart3, Target, Clock } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const DashboardAnalytics = () => {
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
    // Redirect non-freelancers
    if (profile && profile.profileType !== 'earn') {
      navigate('/dashboard');
    }
  }, [isConnected, isProfileComplete, profile, navigate]);

  if (!profile || !isProfileComplete || profile.profileType !== 'earn') {
    return null;
  }

  // Mock analytics data - in production, fetch from Supabase
  const earningsData = [
    { month: 'Jan', earnings: 1200 },
    { month: 'Feb', earnings: 1800 },
    { month: 'Mar', earnings: 2200 },
    { month: 'Apr', earnings: 1900 },
    { month: 'May', earnings: 2800 },
    { month: 'Jun', earnings: 3200 },
  ];

  const skillsData = [
    { skill: 'Web Development', jobs: 15, earnings: 8500 },
    { skill: 'UI/UX Design', jobs: 8, earnings: 4200 },
    { skill: 'Mobile Apps', jobs: 5, earnings: 3800 },
    { skill: 'Consulting', jobs: 3, earnings: 2100 },
  ];

  const projectStatusData = [
    { status: 'Completed', count: 24, color: '#10B981' },
    { status: 'In Progress', count: 6, color: '#F59E0B' },
    { status: 'Pending', count: 3, color: '#EF4444' },
  ];

  const analyticsMetrics = {
    totalEarnings: 18600,
    monthlyEarnings: 3200,
    totalJobs: 33,
    activeJobs: 6,
    avgRating: 4.9,
    responseRate: 98,
    completionRate: 94,
    repeatClients: 15
  };

  return (
    <div className="min-h-screen bg-skrypto-dark">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <BackButton to="/dashboard" />
            <h1 className="text-3xl font-bold text-gradient-purple">Analytics Dashboard</h1>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="glass border-white/10">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white/70">Total Earnings</CardTitle>
                <DollarSign className="h-4 w-4 text-skrypto-green" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">${analyticsMetrics.totalEarnings}</div>
                <p className="text-xs text-white/60">
                  <TrendingUp className="inline h-3 w-3 mr-1" />
                  +15% from last month
                </p>
              </CardContent>
            </Card>

            <Card className="glass border-white/10">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white/70">This Month</CardTitle>
                <Calendar className="h-4 w-4 text-skrypto-blue" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">${analyticsMetrics.monthlyEarnings}</div>
                <p className="text-xs text-white/60">Current month earnings</p>
              </CardContent>
            </Card>

            <Card className="glass border-white/10">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white/70">Completed Jobs</CardTitle>
                <Award className="h-4 w-4 text-skrypto-purple" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{analyticsMetrics.totalJobs}</div>
                <p className="text-xs text-white/60">{analyticsMetrics.completionRate}% completion rate</p>
              </CardContent>
            </Card>

            <Card className="glass border-white/10">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white/70">Client Rating</CardTitle>
                <Star className="h-4 w-4 text-yellow-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{analyticsMetrics.avgRating}</div>
                <p className="text-xs text-white/60">Average rating</p>
              </CardContent>
            </Card>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Earnings Chart */}
            <Card className="glass border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Earnings Over Time</CardTitle>
                <CardDescription className="text-white/60">Monthly earnings for the past 6 months</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={earningsData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="month" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(17, 24, 39, 0.9)', 
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '8px'
                      }}
                    />
                    <Line type="monotone" dataKey="earnings" stroke="#8B5CF6" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Project Status Distribution */}
            <Card className="glass border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Project Status</CardTitle>
                <CardDescription className="text-white/60">Current project distribution</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={projectStatusData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="count"
                      label={({ status, count }) => `${status}: ${count}`}
                    >
                      {projectStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Skills Performance */}
          <Card className="glass border-white/10 mb-8">
            <CardHeader>
              <CardTitle className="text-white">Skills Performance</CardTitle>
              <CardDescription className="text-white/60">Earnings and job count by skill category</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={skillsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="skill" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(17, 24, 39, 0.9)', 
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar dataKey="earnings" fill="#8B5CF6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Performance Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="glass border-white/10">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white/70">Response Rate</CardTitle>
                <Clock className="h-4 w-4 text-skrypto-green" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{analyticsMetrics.responseRate}%</div>
                <p className="text-xs text-white/60">Average response time</p>
              </CardContent>
            </Card>

            <Card className="glass border-white/10">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white/70">Active Projects</CardTitle>
                <Target className="h-4 w-4 text-skrypto-blue" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{analyticsMetrics.activeJobs}</div>
                <p className="text-xs text-white/60">Currently in progress</p>
              </CardContent>
            </Card>

            <Card className="glass border-white/10">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white/70">Repeat Clients</CardTitle>
                <Users className="h-4 w-4 text-skrypto-purple" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{analyticsMetrics.repeatClients}</div>
                <p className="text-xs text-white/60">Returning customers</p>
              </CardContent>
            </Card>

            <Card className="glass border-white/10">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white/70">Success Rate</CardTitle>
                <BarChart3 className="h-4 w-4 text-skrypto-green" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{analyticsMetrics.completionRate}%</div>
                <p className="text-xs text-white/60">Project completion</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DashboardAnalytics;
