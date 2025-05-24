
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useProfile } from '@/contexts/ProfileContext';
import { useWallet } from '@/contexts/WalletContext';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { ArrowLeft, Calendar, DollarSign } from 'lucide-react';
import { skillCategories } from '@/contexts/ProfileContext';

const PostJob = () => {
  const { isConnected } = useWallet();
  const { profile, isProfileComplete } = useProfile();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    skills: [],
    budget: [500],
    deadline: ''
  });

  React.useEffect(() => {
    if (!isConnected) {
      navigate('/');
    }
    if (!isProfileComplete) {
      navigate('/onboarding');
    }
  }, [isConnected, isProfileComplete, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Submit job posting
    console.log('Job posted:', formData);
    navigate('/post-job-success');
  };

  const toggleSkill = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  if (!profile || !isProfileComplete) {
    return null;
  }

  return (
    <div className="min-h-screen bg-skrypto-dark">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(-1)}
              className="text-white hover:bg-white/10"
            >
              <ArrowLeft size={16} className="mr-2" />
              Back
            </Button>
            <h1 className="text-3xl font-bold text-gradient-purple">Post a New Job</h1>
          </div>

          <Card className="glass border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Job Details</CardTitle>
              <CardDescription className="text-white/60">
                Fill in the details for your job posting
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-white">Job Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="e.g., Build NFT Minting Website"
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/50"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-white">Job Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Describe what you need done..."
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/50 min-h-32"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-white">Required Skills</Label>
                  <div className="space-y-4">
                    {skillCategories.map((category) => (
                      <div key={category.name}>
                        <h4 className="text-white/80 text-sm font-medium mb-2">{category.name}</h4>
                        <div className="flex flex-wrap gap-2">
                          {category.skills.map((skill) => (
                            <Button
                              key={skill}
                              type="button"
                              variant={formData.skills.includes(skill) ? "default" : "outline"}
                              size="sm"
                              onClick={() => toggleSkill(skill)}
                              className={
                                formData.skills.includes(skill)
                                  ? "bg-skrypto-purple hover:bg-skrypto-purple/90 text-white"
                                  : "border-white/10 text-white hover:bg-white/5"
                              }
                            >
                              {skill}
                            </Button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-white flex items-center gap-2">
                    <DollarSign size={16} />
                    Budget Range: ${formData.budget[0]}
                  </Label>
                  <Slider
                    value={formData.budget}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, budget: value }))}
                    max={5000}
                    min={50}
                    step={50}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-white/60">
                    <span>$50</span>
                    <span>$5,000</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="deadline" className="text-white flex items-center gap-2">
                    <Calendar size={16} />
                    Deadline
                  </Label>
                  <Input
                    id="deadline"
                    type="date"
                    value={formData.deadline}
                    onChange={(e) => setFormData(prev => ({ ...prev, deadline: e.target.value }))}
                    className="bg-white/5 border-white/10 text-white"
                    required
                  />
                </div>

                <div className="pt-4">
                  <Button
                    type="submit"
                    className="w-full bg-skrypto-purple hover:bg-skrypto-purple/90 text-white glow-purple"
                  >
                    Post Job & Setup Escrow
                  </Button>
                  <p className="text-xs text-white/60 mt-2 text-center">
                    Note: A $2 platform fee is automatically deducted from each transaction.
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PostJob;
