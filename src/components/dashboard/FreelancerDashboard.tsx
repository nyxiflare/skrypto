
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, MessageSquare, TrendingUp, Star, Clock, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';
import DashboardMetrics from './DashboardMetrics';

const FreelancerDashboard = () => {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gradient-purple mb-2">Dashboard</h1>
          <p className="text-white/70">Welcome back! Here's your freelance overview.</p>
        </div>

        {/* Metrics Cards */}
        <DashboardMetrics />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <Card className="glass border-white/10 mb-6">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <CalendarDays className="h-5 w-5 mr-2" />
                  Recent Activity
                </CardTitle>
                <CardDescription className="text-white/60">
                  Your latest projects and milestones
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                  <div>
                    <p className="text-white font-medium">NFT Marketplace UI completed</p>
                    <p className="text-white/60 text-sm">Client: 0xABC...123</p>
                  </div>
                  <Badge variant="default" className="bg-skrypto-green">Completed</Badge>
                </div>
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                  <div>
                    <p className="text-white font-medium">Smart Contract Audit in progress</p>
                    <p className="text-white/60 text-sm">Due: Tomorrow</p>
                  </div>
                  <Badge variant="outline" className="border-yellow-500 text-yellow-500">In Progress</Badge>
                </div>
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                  <div>
                    <p className="text-white font-medium">New project proposal received</p>
                    <p className="text-white/60 text-sm">DeFi Dashboard Design</p>
                  </div>
                  <Badge variant="outline" className="border-skrypto-blue text-skrypto-blue">New</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="glass border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <Button asChild className="bg-skrypto-purple hover:bg-skrypto-purple/90">
                    <Link to="/offer-skill">Add New Skill</Link>
                  </Button>
                  <Button asChild variant="outline" className="border-white/20 text-white hover:bg-white/5">
                    <Link to="/dashboard/profile">Edit Profile</Link>
                  </Button>
                  <Button asChild variant="outline" className="border-white/20 text-white hover:bg-white/5">
                    <Link to="/inbox">Check Messages</Link>
                  </Button>
                  <Button asChild variant="outline" className="border-white/20 text-white hover:bg-white/5">
                    <Link to="/dashboard/analytics">View Analytics</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Performance Summary */}
            <Card className="glass border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Performance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-white/70">Rating</span>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 mr-1" />
                    <span className="text-white">4.9</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/70">Response Rate</span>
                  <span className="text-white">98%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/70">On-time Delivery</span>
                  <span className="text-white">100%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/70">Repeat Clients</span>
                  <span className="text-white">12</span>
                </div>
              </CardContent>
            </Card>

            {/* Messages Preview */}
            <Card className="glass border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <MessageSquare className="h-5 w-5 mr-2" />
                  Recent Messages
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-white/5 rounded-lg">
                  <p className="text-white text-sm font-medium">Sarah Chen</p>
                  <p className="text-white/60 text-xs">Project milestone approved!</p>
                  <p className="text-white/40 text-xs">2 hours ago</p>
                </div>
                <div className="p-3 bg-white/5 rounded-lg">
                  <p className="text-white text-sm font-medium">Alex Rivera</p>
                  <p className="text-white/60 text-xs">When can we start the audit?</p>
                  <p className="text-white/40 text-xs">5 hours ago</p>
                </div>
                <Button asChild variant="outline" size="sm" className="w-full border-white/20 text-white hover:bg-white/5">
                  <Link to="/inbox">View All Messages</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Earnings Summary */}
            <Card className="glass border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <DollarSign className="h-5 w-5 mr-2" />
                  Earnings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-skrypto-green">$3,240</p>
                  <p className="text-white/60 text-sm">This Month</p>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/70">Pending</span>
                    <span className="text-white">$850</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/70">Available</span>
                    <span className="text-white">$2,390</span>
                  </div>
                </div>
                <Button asChild variant="outline" size="sm" className="w-full border-white/20 text-white hover:bg-white/5">
                  <Link to="/dashboard/analytics">View Details</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
};

export default FreelancerDashboard;
