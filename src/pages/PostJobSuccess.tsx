
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BackButton from '@/components/BackButton';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Eye, Plus, Home, Calendar, DollarSign } from 'lucide-react';

const PostJobSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const jobData = location.state?.jobData;

  // Mock job data if none provided
  const job = jobData || {
    title: "Build NFT Minting Website",
    budget: "$500",
    deadline: "2 weeks",
    id: `JOB${Math.floor(Math.random() * 10000)}`
  };

  return (
    <div className="min-h-screen bg-skrypto-dark">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <BackButton to="/dashboard" />
            <h1 className="text-2xl font-bold text-white">Job Posted Successfully!</h1>
          </div>

          <Card className="glass border-white/10 text-center">
            <CardHeader>
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center">
                  <CheckCircle size={40} className="text-green-500" />
                </div>
              </div>
              <CardTitle className="text-2xl text-white">Job Posted Successfully!</CardTitle>
              <p className="text-white/70 mt-2">
                Your job is now live and visible to freelancers on the platform.
              </p>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="bg-white/5 rounded-lg p-6 text-left">
                <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                  <Eye size={20} />
                  Job Summary
                </h3>
                <div className="space-y-3 text-white/80">
                  <div className="flex justify-between">
                    <span>Job ID:</span>
                    <span className="text-skrypto-purple font-mono">#{job.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Title:</span>
                    <span>{job.title}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Budget:</span>
                    <span className="flex items-center gap-1">
                      <DollarSign size={16} />
                      {job.budget}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Timeline:</span>
                    <span className="flex items-center gap-1">
                      <Calendar size={16} />
                      {job.deadline}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Status:</span>
                    <span className="text-green-500">Active & Accepting Proposals</span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                <p className="text-blue-300 text-sm">
                  💡 <strong>What's next?</strong> Freelancers can now discover and apply to your job. 
                  You'll receive proposals in your dashboard and can review candidates there.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button
                  onClick={() => navigate('/dashboard')}
                  className="bg-skrypto-purple hover:bg-skrypto-purple/90 text-white glow-purple flex items-center gap-2"
                >
                  <Eye size={16} />
                  View Job in Dashboard
                </Button>
                
                <Button
                  onClick={() => navigate('/post-job')}
                  variant="outline"
                  className="border-white/10 text-white hover:bg-white/5 flex items-center gap-2"
                >
                  <Plus size={16} />
                  Post Another Job
                </Button>
                
                <Button
                  onClick={() => navigate('/home')}
                  variant="outline"
                  className="border-white/10 text-white hover:bg-white/5 flex items-center gap-2"
                >
                  <Home size={16} />
                  Back to Home
                </Button>
              </div>
              
              <div className="border-t border-white/10 pt-4 mt-6">
                <p className="text-xs text-white/60 text-center">
                  <strong>Platform Fee:</strong> A $2 platform fee will be automatically deducted from the final payment to keep the network running.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PostJobSuccess;
