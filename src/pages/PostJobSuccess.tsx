
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Eye, Home } from 'lucide-react';

const PostJobSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-skrypto-dark">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card className="glass border-white/10 text-center">
            <CardHeader>
              <div className="flex justify-center mb-4">
                <CheckCircle size={64} className="text-skrypto-green" />
              </div>
              <CardTitle className="text-2xl text-white">Job Posted Successfully!</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-white/70">
                <p className="mb-4">Your job has been posted and is now visible to freelancers.</p>
                <div className="bg-white/5 rounded-lg p-4 text-left">
                  <h3 className="font-semibold text-white mb-2">Job Details:</h3>
                  <p className="text-sm text-white/80">
                    Job ID: #JOB{Math.floor(Math.random() * 10000)}<br />
                    Budget: Varies<br />
                    Status: Active<br />
                    Posted: {new Date().toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => navigate('/dashboard')}
                  className="bg-skrypto-purple hover:bg-skrypto-purple/90 text-white glow-purple flex items-center gap-2"
                >
                  <Eye size={16} />
                  View My Jobs
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
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PostJobSuccess;
