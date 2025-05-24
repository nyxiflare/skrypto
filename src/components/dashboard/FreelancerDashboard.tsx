
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, MessageCircle, Eye, Clock, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const mockFreelancerJobs = [
  {
    id: 1,
    title: 'Build NFT Minting Website',
    client: '0xC1D2E3...F4G5',
    status: 'In Progress',
    payment: '2.5 ETH',
    deadline: 'June 12, 2025',
    progress: 70,
  },
  {
    id: 2,
    title: 'Design Token Logo',
    client: '0xH6I7J8...K9L0',
    status: 'Completed',
    payment: '0.8 ETH',
    deadline: 'May 2, 2025',
    progress: 100,
  },
  {
    id: 3,
    title: 'Write Smart Contract Documentation',
    client: '0xM1N2O3...P4Q5',
    status: 'Pending Review',
    payment: '1.2 ETH',
    deadline: 'June 20, 2025',
    progress: 90,
  },
];

const FreelancerDashboard = () => {
  const navigate = useNavigate();

  const getStatusBadge = (status: string) => {
    if (status === 'Completed') {
      return <Badge className="bg-skrypto-green text-white">{status}</Badge>;
    } else if (status === 'In Progress') {
      return <Badge className="bg-skrypto-purple text-white">{status}</Badge>;
    } else if (status === 'Pending Review') {
      return <Badge className="bg-yellow-600 text-white">{status}</Badge>;
    }
    return <Badge variant="outline" className="text-white border-white/20">{status}</Badge>;
  };

  const totalEarnings = mockFreelancerJobs
    .filter(job => job.status === 'Completed')
    .reduce((sum, job) => sum + parseFloat(job.payment.split(' ')[0]), 0);

  return (
    <div className="min-h-screen bg-skrypto-dark text-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(-1)}
              className="text-white hover:bg-white/10"
            >
              <ArrowLeft size={16} className="mr-2" />
              Back
            </Button>
            <h1 className="text-3xl font-bold text-gradient-purple">Freelancer Dashboard</h1>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-white">Quick Actions</h2>
          <div className="flex flex-wrap gap-4">
            <Button className="bg-skrypto-purple hover:bg-skrypto-purple/90 text-white">
              Browse Jobs
            </Button>
            <Button variant="outline" className="border-skrypto-blue text-white hover:bg-skrypto-blue/20">
              <MessageCircle size={16} className="mr-2" />
              Messages
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="glass border-white/10">
            <CardHeader className="pb-2">
              <CardDescription className="text-white/60">Total Earnings</CardDescription>
              <CardTitle className="text-2xl text-skrypto-green">{totalEarnings.toFixed(1)} ETH</CardTitle>
            </CardHeader>
          </Card>
          
          <Card className="glass border-white/10">
            <CardHeader className="pb-2">
              <CardDescription className="text-white/60">Active Jobs</CardDescription>
              <CardTitle className="text-2xl text-skrypto-purple">
                {mockFreelancerJobs.filter(job => job.status === 'In Progress').length}
              </CardTitle>
            </CardHeader>
          </Card>
          
          <Card className="glass border-white/10">
            <CardHeader className="pb-2">
              <CardDescription className="text-white/60">Completed Jobs</CardDescription>
              <CardTitle className="text-2xl text-white">
                {mockFreelancerJobs.filter(job => job.status === 'Completed').length}
              </CardTitle>
            </CardHeader>
          </Card>

          <Card className="glass border-white/10">
            <CardHeader className="pb-2">
              <CardDescription className="text-white/60">Pending Reviews</CardDescription>
              <CardTitle className="text-2xl text-yellow-400">
                {mockFreelancerJobs.filter(job => job.status === 'Pending Review').length}
              </CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Jobs Table */}
        <Card className="glass border-white/10">
          <CardHeader>
            <CardTitle className="text-white">My Jobs</CardTitle>
            <CardDescription className="text-white/60">
              Track your active and completed projects
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-white/10">
                  <TableHead className="text-white/60">Job Title</TableHead>
                  <TableHead className="text-white/60">Client</TableHead>
                  <TableHead className="text-white/60">Status</TableHead>
                  <TableHead className="text-white/60">Payment</TableHead>
                  <TableHead className="text-white/60">Progress</TableHead>
                  <TableHead className="text-white/60">Deadline</TableHead>
                  <TableHead className="text-white/60">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockFreelancerJobs.map((job) => (
                  <TableRow key={job.id} className="border-white/10 hover:bg-white/5">
                    <TableCell className="text-white font-medium">{job.title}</TableCell>
                    <TableCell className="text-white/80 font-mono text-sm">{job.client}</TableCell>
                    <TableCell>{getStatusBadge(job.status)}</TableCell>
                    <TableCell className="text-skrypto-green font-semibold">{job.payment}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-2 bg-white/20 rounded-full">
                          <div 
                            className="h-full bg-skrypto-purple rounded-full" 
                            style={{ width: `${job.progress}%` }}
                          />
                        </div>
                        <span className="text-sm text-white/60">{job.progress}%</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-white/80">{job.deadline}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="ghost" className="text-skrypto-blue hover:bg-skrypto-blue/20">
                          <Eye size={14} className="mr-1" />
                          View
                        </Button>
                        {job.status === 'In Progress' && (
                          <Button size="sm" variant="ghost" className="text-skrypto-green hover:bg-skrypto-green/20">
                            <Clock size={14} className="mr-1" />
                            Update
                          </Button>
                        )}
                        {job.status === 'Pending Review' && (
                          <Button size="sm" variant="ghost" className="text-yellow-400 hover:bg-yellow-400/20">
                            <CheckCircle size={14} className="mr-1" />
                            Submit
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FreelancerDashboard;
