
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { MessageSquare, User } from 'lucide-react';
import { Freelancer } from '@/data/freelancer-data';
import { Link, useNavigate } from 'react-router-dom';

interface TalentCardProps {
  freelancer: Freelancer;
  viewMode: 'grid' | 'list';
}

const TalentCard = ({ freelancer, viewMode }: TalentCardProps) => {
  const navigate = useNavigate();

  const cardClasses = viewMode === 'list'
    ? 'flex flex-col md:flex-row'
    : 'flex flex-col';

  const contentClasses = viewMode === 'list'
    ? 'flex-1'
    : '';

  const handleMessage = () => {
    navigate(`/inbox/${freelancer.id}`);
  };

  return (
    <Card className={`glass hover-scale border-white/10 overflow-hidden ${cardClasses}`}>
      {viewMode === 'list' && (
        <div className="p-4 flex items-center justify-center bg-skrypto-card md:w-20">
          <User size={32} className="text-skrypto-purple" />
        </div>
      )}
      
      <CardContent className={`p-6 ${contentClasses}`}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            {viewMode === 'grid' && (
              <User size={24} className="text-skrypto-purple" />
            )}
            <Link to={`/freelancer/${freelancer.id}`}>
              <h3 className="font-bold text-lg text-white hover:text-skrypto-purple transition-colors">
                {freelancer.username}
              </h3>
            </Link>
          </div>
          <div className="text-right">
            <span className="text-skrypto-green font-mono font-bold">
              {freelancer.rate} {freelancer.paymentToken}
            </span>
            <span className="block text-xs text-white/60">
              {freelancer.rateType}
            </span>
          </div>
        </div>
        
        <p className="text-sm text-white/80 mb-4 line-clamp-2">
          {freelancer.bio}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-1">
          {freelancer.skills.slice(0, 3).map(skill => (
            <span 
              key={skill}
              className="text-xs px-2 py-1 bg-white/5 rounded-full text-white/70"
            >
              {skill.replace('-', ' ')}
            </span>
          ))}
          {freelancer.skills.length > 3 && (
            <span className="text-xs px-2 py-1 bg-white/5 rounded-full text-white/70">
              +{freelancer.skills.length - 3} more
            </span>
          )}
        </div>
      </CardContent>
      
      <CardFooter className={`p-4 ${viewMode === 'list' ? 'md:w-48 md:flex-col md:items-stretch' : ''}`}>
        <div className={`flex gap-2 ${viewMode === 'list' ? 'flex-col w-full' : 'flex-1'}`}>
          <Button 
            className="bg-skrypto-purple hover:bg-skrypto-purple/90 text-white flex-1"
            asChild
          >
            <Link to={`/freelancer/${freelancer.id}`}>
              Hire
            </Link>
          </Button>
          <Button 
            variant="outline" 
            className="border-white/10 hover:bg-white/5 text-white flex items-center gap-2 flex-1"
            onClick={handleMessage}
          >
            <MessageSquare size={16} />
            <span>Message</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default TalentCard;
