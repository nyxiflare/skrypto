
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useProfile } from '@/contexts/ProfileContext';
import { useWallet } from '@/contexts/WalletContext';
import { useNavigate } from 'react-router-dom';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Analytics = () => {
  const { isConnected } = useWallet();
  const { profile, isProfileComplete } = useProfile();
  const navigate = useNavigate();
  const [timeFilter, setTimeFilter] = useState('30days');

  React.useEffect(() => {
    if (!isConnected) {
      navigate('/');
    }
    if (!isProfileComplete) {
      navigate('/onboarding');
    }
  }, [isConnected, isProfileComplete, navigate]);

  // Mock data for charts
  const earningsOverTime = [
    { month: 'Jan', earnings: 320 },
    { month: 'Feb', earnings: 450 },
    { month: 'Mar', earnings: 620 },
    { month: 'Apr', earnings: 300 },
    { month: 'May', earnings: 780 },
    { month: 'Jun', earnings: 590 }
  ];

  const earningsPerSkill = [
    { skill: 'Web Development', amount: 1250, jobs: 8 },
    { skill: 'UI/UX Design', amount: 880, jobs: 5 },
    { skill: 'Content Writing', amount: 420, jobs: 12 },
    { skill: 'Digital Marketing', amount: 650, jobs: 6 }
  ];

  const earningsPerClient = [
    { client: 'TechCorp', value: 800, color: '#8b5cf6' },
    { client: 'StartupX', value: 600, color: '#06b6d4' },
    { client: 'DesignLab', value: 500, color: '#10b981' },
    { client: 'Others', value: 400, color: '#f59e0b' }
  ];

  const skillRatings = [
    { skill: 'Web Development', rating: 4.8, jobs: 8 },
    { skill: 'UI/UX Design', rating: 4.5, jobs: 5 },
    { skill: 'Content Writing', rating: 4.9, jobs: 12 },
    { skill: 'Digital Marketing', rating: 4.6, jobs: 6 }
  ];

  const totalEarnings = earningsPerSkill.reduce((sum, skill) => sum + skill.amount, 0);
  const totalJobs = skillRatings.reduce((sum, skill) => sum + skill.jobs, 0);
  const avgRating = skillRatings.reduce((sum, skill) => sum + skill.rating, 0) / skillRatings.length;

  const chartConfig = {
    earnings: {
      label: "Earnings (USDT)",
      color: "#8b5cf6",
    },
    amount: {
      label: "Amount",
      color: "#06b6d4",
    },
  };

  if (!profile || !isProfileComplete) {
    return null;
  }

  return (
    <div className="min-h-screen bg-skrypto-dark">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            <span className="text-gradient-purple">Analytics Dashboard</span>
          </h1>
          <p className="text-white/70">Track your performance and earnings</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="glass border-white/10">
            <CardHeader className="pb-2">
              <CardDescription className="text-white/60">Total Earnings</CardDescription>
              <CardTitle className="text-2xl text-skrypto-green">${totalEarnings.toLocaleString()}</CardTitle>
            </CardHeader>
          </Card>
          
          <Card className="glass border-white/10">
            <CardHeader className="pb-2">
              <CardDescription className="text-white/60">Jobs Completed</CardDescription>
              <CardTitle className="text-2xl text-white">{totalJobs}</CardTitle>
            </CardHeader>
          </Card>
          
          <Card className="glass border-white/10">
            <CardHeader className="pb-2">
              <CardDescription className="text-white/60">Average Rating</CardDescription>
              <CardTitle className="text-2xl text-skrypto-purple">{avgRating.toFixed(1)} ⭐</CardTitle>
            </CardHeader>
          </Card>
          
          <Card className="glass border-white/10">
            <CardHeader className="pb-2">
              <CardDescription className="text-white/60">Active Skills</CardDescription>
              <CardTitle className="text-2xl text-white">{profile.skills.length}</CardTitle>
            </CardHeader>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Earnings Over Time */}
          <Card className="glass border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Earnings Over Time</CardTitle>
              <CardDescription className="text-white/60">
                Monthly earnings for the past 6 months
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig}>
                <LineChart data={earningsOverTime}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="month" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    type="monotone"
                    dataKey="earnings"
                    stroke="#8b5cf6"
                    strokeWidth={2}
                    dot={{ fill: "#8b5cf6" }}
                  />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Earnings Per Skill */}
          <Card className="glass border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Earnings Per Skill</CardTitle>
              <CardDescription className="text-white/60">
                Revenue breakdown by skill category
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig}>
                <BarChart data={earningsPerSkill}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="skill" stroke="#9ca3af" fontSize={12} />
                  <YAxis stroke="#9ca3af" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="amount" fill="#06b6d4" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Earnings Per Client */}
          <Card className="glass border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Client Distribution</CardTitle>
              <CardDescription className="text-white/60">
                Revenue from top clients
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig}>
                <PieChart>
                  <Pie
                    data={earningsPerClient}
                    dataKey="value"
                    nameKey="client"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label={({ client, value }) => `${client}: $${value}`}
                  >
                    {earningsPerClient.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Skill Ratings */}
          <Card className="glass border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Skill Performance</CardTitle>
              <CardDescription className="text-white/60">
                Ratings and job completion by skill
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {skillRatings.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <div>
                      <span className="text-white font-medium">{item.skill}</span>
                      <p className="text-sm text-white/60">{item.jobs} jobs completed</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-yellow-400 border-yellow-400">
                        {item.rating} ⭐
                      </Badge>
                    </div>
                  </div>
                ))}
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
