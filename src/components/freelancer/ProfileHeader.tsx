
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MessageCircle, Star, Wallet } from 'lucide-react';

interface ProfileHeaderProps {
  freelancer: {
    id: string;
    username: string;
    bio?: string;
    profile_image?: string;
    wallet_address?: string;
  };
  skills: Array<{
    skill_name: string;
    category?: string;
    rate?: number;
    rate_type?: string;
  }>;
  averageRating?: number;
  totalReviews?: number;
  onMessage: () => void;
  onHire: () => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  freelancer,
  skills,
  averageRating = 0,
  totalReviews = 0,
  onMessage,
  onHire
}) => {
  const displayWallet = freelancer.wallet_address 
    ? `${freelancer.wallet_address.slice(0, 6)}...${freelancer.wallet_address.slice(-4)}`
    : 'Not connected';

  return (
    <Card className="glass border-white/10">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex flex-col items-center md:items-start">
            <Avatar className="h-32 w-32 mb-4">
              <AvatarImage src={freelancer.profile_image} />
              <AvatarFallback className="bg-skrypto-purple text-white text-2xl">
                {freelancer.username?.[0]?.toUpperCase() || 'U'}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex gap-2">
              <Button
                onClick={onMessage}
                className="bg-white/10 hover:bg-white/20 text-white border-white/10"
                variant="outline"
              >
                <MessageCircle size={16} className="mr-2" />
                Message
              </Button>
              <Button
                onClick={onHire}
                className="bg-skrypto-purple hover:bg-skrypto-purple/90 text-white glow-purple"
              >
                Hire Now
              </Button>
            </div>
          </div>
          
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gradient-purple mb-2">
              {freelancer.username}
            </h1>
            
            {averageRating > 0 && (
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  <Star className="text-yellow-400 fill-current" size={20} />
                  <span className="text-white font-medium ml-1">
                    {averageRating.toFixed(1)}
                  </span>
                </div>
                <span className="text-white/60">
                  ({totalReviews} {totalReviews === 1 ? 'review' : 'reviews'})
                </span>
              </div>
            )}
            
            {freelancer.bio && (
              <p className="text-white/80 mb-4 leading-relaxed">
                {freelancer.bio}
              </p>
            )}
            
            <div className="mb-4">
              <div className="flex items-center gap-2 text-white/60 mb-2">
                <Wallet size={16} />
                <span className="text-sm">Wallet: {displayWallet}</span>
              </div>
            </div>
            
            <div className="space-y-3">
              <h3 className="text-white font-semibold">Skills & Rates</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <Badge
                    key={index}
                    className="bg-skrypto-purple/20 text-skrypto-purple border-skrypto-purple/30 hover:bg-skrypto-purple/30"
                  >
                    {skill.skill_name}
                    {skill.rate && (
                      <span className="ml-2 text-xs">
                        ${skill.rate} {skill.rate_type || 'per project'}
                      </span>
                    )}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileHeader;
