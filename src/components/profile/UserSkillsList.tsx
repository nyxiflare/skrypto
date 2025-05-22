
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from '@/hooks/use-toast';
import { Coins } from 'lucide-react';

interface Skill {
  id: number;
  title: string;
  description: string;
}

interface UserSkillsListProps {
  skills: string[];
  rate: string;
  token: string;
}

const UserSkillsList = ({ skills, rate, token }: UserSkillsListProps) => {
  const { toast } = useToast();

  // Example skill listings for demonstration
  const skillListings: Skill[] = [
    {
      id: 1,
      title: `Professional ${skills[0]} Service`,
      description: "I will deliver high-quality work with attention to detail and quick turnaround times. Satisfaction guaranteed with unlimited revisions."
    },
    {
      id: 2,
      title: `Expert ${skills.length > 1 ? skills[1] : skills[0]} Solutions`,
      description: "Years of experience in providing excellent results. I focus on understanding your needs and exceeding your expectations."
    },
    {
      id: 3,
      title: "Custom Project Consultation",
      description: "Need help figuring out the best approach? I offer consultation sessions to discuss your project needs and provide expert guidance."
    }
  ];

  const handleHireForService = (skillId: number) => {
    toast({
      title: "Service Selected",
      description: `You've chosen to hire for service #${skillId}`,
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">Services Offered</h2>
      
      <div className="space-y-6">
        {skillListings.map(skill => (
          <Card key={skill.id} className="glass border-white/10 overflow-hidden hover-scale">
            <CardHeader className="pb-3">
              <CardTitle className="text-white text-xl">{skill.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-white/70 mb-6">{skill.description}</p>
              
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-lg font-mono font-bold text-skrypto-green">
                    {rate} {token}
                  </span>
                  <span className="ml-2 text-sm text-white/60">per project</span>
                </div>
                
                <Button 
                  className="bg-skrypto-purple hover:bg-skrypto-purple/90 text-white"
                  onClick={() => handleHireForService(skill.id)}
                >
                  <Coins className="mr-2" size={16} />
                  Hire for this
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default UserSkillsList;
