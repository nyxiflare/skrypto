
import React from 'react';
import { Button } from "@/components/ui/button";
import { UserRound, Settings, Inbox, Bell, LogOut, BarChart, Briefcase, DollarSign, Home } from 'lucide-react';
import { useProfile } from '@/contexts/ProfileContext';
import { useWallet } from '@/contexts/WalletContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from 'react-router-dom';

const ProfileButton = () => {
  const { profile, isProfileComplete } = useProfile();
  const { disconnect } = useWallet();

  const handleLogout = () => {
    disconnect();
  };

  if (!profile || !isProfileComplete) {
    return (
      <Button 
        variant="outline" 
        onClick={() => window.location.href = '/onboarding'}
        className="border-skrypto-purple text-white bg-transparent hover:bg-skrypto-purple/20 flex items-center gap-2"
      >
        <UserRound size={16} />
        Create Profile
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          className="border-skrypto-purple text-white bg-transparent hover:bg-skrypto-purple/20 flex items-center gap-2"
        >
          <Avatar className="h-6 w-6">
            {profile.profileImage ? (
              <AvatarImage src={profile.profileImage} alt={profile.username} />
            ) : (
              <AvatarFallback className="bg-skrypto-purple/30 text-white text-xs">
                {profile.username.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            )}
          </Avatar>
          <span className="hidden sm:inline">{profile.username}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 glass border-white/10 bg-gray-900/95 backdrop-blur-sm">
        <DropdownMenuLabel className="text-white">{profile.username}</DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-white/10" />
        
        {/* Dashboard Links */}
        <DropdownMenuItem className="text-white/80 hover:text-white hover:bg-white/5">
          <Link to="/dashboard" className="flex items-center w-full">
            {profile.profileType === 'hire' ? (
              <Briefcase className="mr-2" size={16} />
            ) : (
              <DollarSign className="mr-2" size={16} />
            )}
            <span>Dashboard</span>
          </Link>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator className="bg-white/10" />
        
        <DropdownMenuItem className="text-white/80 hover:text-white hover:bg-white/5">
          <Link to={`/profile/${profile.username}`} className="flex items-center w-full">
            <UserRound className="mr-2" size={16} />
            <span>My Profile</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="text-white/80 hover:text-white hover:bg-white/5">
          <Link to="/inbox" className="flex items-center w-full">
            <Inbox className="mr-2" size={16} />
            <span>Inbox</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="text-white/80 hover:text-white hover:bg-white/5">
          <Link to="/notifications" className="flex items-center w-full">
            <Bell className="mr-2" size={16} />
            <span>Notifications</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="text-white/80 hover:text-white hover:bg-white/5">
          <Link to="/analytics" className="flex items-center w-full">
            <BarChart className="mr-2" size={16} />
            <span>Analytics</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="text-white/80 hover:text-white hover:bg-white/5">
          <Link to="/settings" className="flex items-center w-full">
            <Settings className="mr-2" size={16} />
            <span>Settings</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-white/10" />
        <DropdownMenuItem 
          className="text-white/80 hover:text-white hover:bg-white/5"
          onClick={handleLogout}
        >
          <LogOut className="mr-2" size={16} />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileButton;
