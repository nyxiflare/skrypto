
import React from 'react';
import { useProfile } from '@/contexts/ProfileContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BackButton from '@/components/BackButton';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, DollarSign, Users, Star, Clock, Briefcase } from 'lucide-react';

const Analytics = () => {
  const { profile } = useProfile();

  // Mock data - replace with real data from your backend
  const earningsData = [
    { month: 'Jan', freelancer: 2400, client: 1200 },
    { month: 'Feb', freelancer: 1398, client: 2100 },
    { month: 'Mar', freelancer: 9800, client: 1800 },
    { month: 'Apr', freelancer: 3908, client: 2800 },
    { month: 'May', freelancer: 4800, client: 1900 },
    { month: 'Jun', freelancer: 3800, client: 2400 },
  ];

  const skillsData = [
    { name: 'Web Development', value: 35, color: '#8B5CF6' },
    { name: 'Design', value: 25, color: '#06D6A0' },
    { name: 'Writing', value: 20, color: '#FFD60A' },
    { name: 'Marketing', value: 20, color: '#F72585' },
  ];

  const isClient = profile?.profileType === 'hire';
  const isFreelancer = profile?.profileType === 'earn';

  const getStatsForUserType = () => {
    if (isClient) {
      return [
        {
          title: "Total Spent",
          value: "$12,345",
          icon: DollarSign,
          trend: "+12%",
          color: "text-red-400"
        },
        {
          title: "Jobs Posted",
          value: "24",
          icon: Briefcase,
          trend: "+3",
          color: "text-blue-400"
        },
        {
          title: "Active Projects",
          value: "8",
          icon: Clock,
          trend: "+2",
          color: "text-yellow-400"
        },
        {
          title: "Hired Freelancers",
          value: "16",
          icon: Users,
          trend: "+5",
          color: "text-green-400"
        }
      ];
    } else {
      return [
        {
          title: "Total Earnings",
          value: "$8,945",
          icon: DollarSign,
          trend: "+23%",
          color: "text-green-400"
        },
        {
          title: "Completed Jobs",
          value: "47",
          icon: Briefcase,
          trend: "+8",
          color: "text-blue-400"
        },
        {
          title: "Active Projects",
          value: "3",
          icon: Clock,
          trend: "±0",
          color: "text-yellow-400"
        },
        {
          title: "Client Rating",
          value: "4.8",
          icon: Star,
          trend: "+0.2",
          color: "text-purple-400"
        }
      ];
    }
  };

  const stats = getStatsForUserType();

  return (
    <div className="min-h-screen bg-skrypto-dark">
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        <div className="mb-6">
          <BackButton to="/dashboard" />
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gradient-purple mb-2">
              {isClient ? 'Client' : 'Freelancer'} Analytics
            </h1>
            <p className="text-white/70">
              {isClient ? 'Track your hiring activities and project investments' : 'Monitor your earnings, performance, and growth'}
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <Card key={index} className="glass border-white/10">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-white/60">
                      {stat.title}
                    </CardTitle>
                    <IconComponent className={`h-4 w-4 ${stat.color}`} />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                    <p className="text-xs text-white/60">
                      <span className={stat.trend.startsWith('+') ? 'text-green-400' : stat.trend.startsWith('-') ? 'text-red-400' : 'text-yellow-400'}>
                        {stat.trend}
                      </span>
                      {' '}from last month
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Earnings/Spending Chart */}
            <Card className="glass border-white/10">
              <CardHeader>
                <CardTitle className="text-white">
                  {isClient ? 'Monthly Spending' : 'Monthly Earnings'}
                </CardTitle>
                <CardDescription className="text-white/60">
                  {isClient ? 'Your investment in projects over time' : 'Your earnings trend over the last 6 months'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={earningsData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                    <XAxis dataKey="month" stroke="#ffffff60" />
                    <YAxis stroke="#ffffff60" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1a1a2e', 
                        border: '1px solid #ffffff20',
                        borderRadius: '8px'
                      }}
                    />
                    <Bar 
                      dataKey={isClient ? "client" : "freelancer"} 
                      fill={isClient ? "#F72585" : "#06D6A0"} 
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Skills/Projects Distribution */}
            <Card className="glass border-white/10">
              <CardHeader>
                <CardTitle className="text-white">
                  {isClient ? 'Project Categories' : 'Skills Distribution'}
                </CardTitle>
                <CardDescription className="text-white/60">
                  {isClient ? 'Types of projects you typically hire for' : 'Breakdown of your service offerings'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={skillsData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {skillsData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Performance Metrics */}
          <Card className="glass border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <TrendingUp className="text-green-400" size={20} />
                Performance Insights
              </CardTitle>
              <CardDescription className="text-white/60">
                Key metrics and recommendations for improvement
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-white">
                    {isClient ? 'Hiring Efficiency' : 'Work Quality'}
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-white/70">
                        {isClient ? 'Average hire time' : 'On-time delivery'}
                      </span>
                      <Badge className="bg-green-500/20 text-green-400">
                        {isClient ? '3.2 days' : '94%'}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/70">
                        {isClient ? 'Project success rate' : 'Client satisfaction'}
                      </span>
                      <Badge className="bg-blue-500/20 text-blue-400">
                        {isClient ? '89%' : '4.8/5'}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/70">
                        {isClient ? 'Repeat freelancers' : 'Repeat clients'}
                      </span>
                      <Badge className="bg-purple-500/20 text-purple-400">
                        {isClient ? '67%' : '43%'}
                      </Badge>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-semibold text-white">
                    {isClient ? 'Budget Management' : 'Earnings Growth'}
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-white/70">
                        {isClient ? 'Budget accuracy' : 'Monthly growth'}
                      </span>
                      <Badge className="bg-green-500/20 text-green-400">
                        {isClient ? '±8%' : '+23%'}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/70">
                        {isClient ? 'Cost per project' : 'Average project value'}
                      </span>
                      <Badge className="bg-blue-500/20 text-blue-400">
                        {isClient ? '$514' : '$267'}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/70">
                        {isClient ? 'ROI estimate' : 'Hourly rate'}
                      </span>
                      <Badge className="bg-yellow-500/20 text-yellow-400">
                        {isClient ? '234%' : '$28/hr'}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Analytics;
