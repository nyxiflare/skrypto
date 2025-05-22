
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Coins, MessageSquare, Star, Wallet } from 'lucide-react';
import { Freelancer } from '@/data/freelancer-data';
import { useToast } from '@/hooks/use-toast';

interface UserProfileHeaderProps {
  user: Freelancer;
}

const UserProfileHeader = ({ user }: UserProfileHeaderProps) => {
  const { toast } = useToast();
  
  const handleHire = () => {
    toast({
      title: "Hire Request Sent",
      description: `You've initiated hiring ${user.username}`,
    });
  };

  const handleMessage = () => {
    toast({
      title: "Message Initiated",
      description: `Starting conversation with ${user.username}`,
    });
  };

  // Get first character of username for avatar fallback
  const userInitial = user.username.charAt(0).toUpperCase();
  
  // Mask wallet address for privacy (example format)
  const maskedWallet = user.walletAddress 
    ? `${user.walletAddress.substring(0, 6)}...${user.walletAddress.substring(user.walletAddress.length - 4)}`
    : '0x1234...5678'; // default masked address
  
  return (
    <div className="glass p-8 rounded-xl">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
        <div className="flex flex-col items-center">
          <Avatar className="h-32 w-32 border-2 border-skrypto-purple glow-purple">
            <AvatarImage src={user.avatarUrl} />
            <AvatarFallback className="bg-skrypto-purple/30 text-2xl font-bold text-white">
              {userInitial}
            </AvatarFallback>
          </Avatar>
          
          <div className="mt-4 flex items-center">
            <Star className="text-yellow-400 mr-1" size={16} />
            <span className="font-medium text-white">{user.rating || '4.9'}</span>
            <span className="text-white/60 ml-2">
              ({user.completedJobs || 0} jobs)
            </span>
          </div>
          
          <div className="mt-2 flex items-center text-white/70 text-sm">
            <Wallet className="mr-1" size={14} />
            <span>{maskedWallet}</span>
          </div>
        </div>
        
        <div className="flex-1 text-center md:text-left">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
            <h1 className="text-3xl md:text-4xl font-bold text-gradient-purple">
              {user.username}
            </h1>
            
            <div className="flex flex-wrap gap-2 justify-center md:justify-end">
              <Button 
                className="bg-skrypto-purple hover:bg-skrypto-purple/90 text-white glow-purple"
                onClick={handleHire}
              >
                <Coins className="mr-2" size={16} />
                Hire Now
              </Button>
              <Button 
                variant="outline" 
                className="border-white/10 hover:bg-white/5 text-white"
                onClick={handleMessage}
              >
                <MessageSquare className="mr-2" size={16} />
                Send Message
              </Button>
            </div>
          </div>
          
          <p className="text-lg text-white/80 mb-6 max-w-2xl">
            {user.bio}
          </p>
          
          <div className="flex flex-wrap gap-2">
            {user.skills.map(skill => (
              <Badge 
                key={skill} 
                className="bg-skrypto-purple/20 hover:bg-skrypto-purple/30 text-white border-none"
              >
                {skill.replace('-', ' ')}
              </Badge>
            ))}
          </div>
          
          <div className="mt-4 flex items-center">
            <span className="text-xl font-mono font-bold text-skrypto-green">
              {user.rate} {user.paymentToken}
            </span>
            <span className="ml-2 text-white/60">
              {user.rateType}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileHeader;
