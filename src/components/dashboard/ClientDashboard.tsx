
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, Plus, MessageCircle, CheckCircle, XCircle, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const mockJobs = [
  {
    id: 1,
    title: 'Build NFT Minting Website',
    freelancer: '0xA1B2C3...E9F0',
    status: 'In Progress',
    escrow: '2.5 ETH',
    deadline: 'June 12, 2025',
  },
  {
    id: 2,
    title: 'Design Token Logo',
    freelancer: '0xCD2E4F...F91A',
    status: 'Completed',
    escrow: '0.8 ETH',
    deadline: 'May 2, 2025',
  },
  {
    id: 3,
    title: 'Smart Contract Audit',
    freelancer: '0x123456...789B',
    status: 'In Progress',
    escrow: '5.0 ETH',
    deadline: 'July 1, 2025',
  },
];

const ClientDashboard = () => {
  const navigate = useNavigate();

  const handleReleasePayment = (jobId: number) => {
    console.log(`Releasing payment for job ${jobId}`);
    // TODO: Integrate with smart contract
  };

  const handleCancelJob = (jobId: number) => {
    console.log(`Canceling job ${jobId}`);
    // TODO: Integrate with smart contract
  };

  const getStatusBadge = (status: string) => {
    if (status === 'Completed') {
      return <Badge className="bg-skrypto-green text-white">{status}</Badge>;
    } else if (status === 'In Progress') {
      return <Badge className="bg-yellow-600 text-white">{status}</Badge>;
    }
    return <Badge variant="outline" className="text-white border-white/20">{status}</Badge>;
  };

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
            <h1 className="text-3xl font-bold text-gradient-purple">Client Dashboard</h1>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-white">Quick Actions</h2>
          <div className="flex flex-wrap gap-4">
            <Button className="bg-skrypto-green hover:bg-skrypto-green/90 text-white">
              <Plus size={16} className="mr-2" />
              Post New Job
            </Button>
            <Button variant="outline" className="border-skrypto-blue text-white hover:bg-skrypto-blue/20">
              <MessageCircle size={16} className="mr-2" />
              Messages
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="glass border-white/10">
            <CardHeader className="pb-2">
              <CardDescription className="text-white/60">Total Jobs Posted</CardDescription>
              <CardTitle className="text-2xl text-white">{mockJobs.length}</CardTitle>
            </CardHeader>
          </Card>
          
          <Card className="glass border-white/10">
            <CardHeader className="pb-2">
              <CardDescription className="text-white/60">Active Jobs</CardDescription>
              <CardTitle className="text-2xl text-skrypto-purple">
                {mockJobs.filter(job => job.status === 'In Progress').length}
              </CardTitle>
            </CardHeader>
          </Card>
          
          <Card className="glass border-white/10">
            <CardHeader className="pb-2">
              <CardDescription className="text-white/60">Total Spent</CardDescription>
              <CardTitle className="text-2xl text-skrypto-green">
                {mockJobs.reduce((sum, job) => sum + parseFloat(job.escrow.split(' ')[0]), 0).toFixed(1)} ETH
              </CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Jobs Table */}
        <Card className="glass border-white/10">
          <CardHeader>
            <CardTitle className="text-white">My Jobs</CardTitle>
            <CardDescription className="text-white/60">
              Track and manage your posted jobs
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-white/10">
                  <TableHead className="text-white/60">Job Title</TableHead>
                  <TableHead className="text-white/60">Freelancer</TableHead>
                  <TableHead className="text-white/60">Status</TableHead>
                  <TableHead className="text-white/60">Escrow</TableHead>
                  <TableHead className="text-white/60">Deadline</TableHead>
                  <TableHead className="text-white/60">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockJobs.map((job) => (
                  <TableRow key={job.id} className="border-white/10 hover:bg-white/5">
                    <TableCell className="text-white font-medium">{job.title}</TableCell>
                    <TableCell className="text-white/80 font-mono text-sm">{job.freelancer}</TableCell>
                    <TableCell>{getStatusBadge(job.status)}</TableCell>
                    <TableCell className="text-skrypto-green font-semibold">{job.escrow}</TableCell>
                    <TableCell className="text-white/80">{job.deadline}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="ghost" className="text-skrypto-blue hover:bg-skrypto-blue/20">
                          <Eye size={14} className="mr-1" />
                          View
                        </Button>
                        {job.status === 'In Progress' && (
                          <>
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              onClick={() => handleReleasePayment(job.id)}
                              className="text-skrypto-green hover:bg-skrypto-green/20"
                            >
                              <CheckCircle size={14} className="mr-1" />
                              Release
                            </Button>
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              onClick={() => handleCancelJob(job.id)}
                              className="text-red-400 hover:bg-red-400/20"
                            >
                              <XCircle size={14} className="mr-1" />
                              Cancel
                            </Button>
                          </>
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

export default ClientDashboard;
