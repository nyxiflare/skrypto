
import React from 'react';
import { Freelancer } from '@/data/freelancer-data';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { 
  BadgeCheck, 
  Briefcase, 
  MessageSquare, 
  Star, 
  Wallet,
  Award,
  Shield
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface ProfileSidebarProps {
  user: Freelancer;
}

const ProfileSidebar = ({ user }: ProfileSidebarProps) => {
  return (
    <Sidebar variant="inset">
      <SidebarHeader className="flex flex-col items-center justify-center py-6">
        <Avatar className="h-24 w-24 mb-4">
          <AvatarImage src={user.avatarUrl} alt={user.username} />
          <AvatarFallback className="bg-skrypto-purple/20 text-2xl">
            {user.username.substring(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <h3 className="text-xl font-bold text-white">{user.username}</h3>
        <p className="text-white/60 text-sm">{user.skills[0]}</p>
        
        <div className="flex items-center space-x-2 mt-3">
          {user.rating >= 4.5 && (
            <Badge variant="secondary" className="bg-skrypto-purple/30">
              <BadgeCheck size={12} className="mr-1 text-skrypto-purple" />
              Verified
            </Badge>
          )}
          
          <Badge variant="outline" className="border-white/10 text-white/70">
            <Star size={12} className="mr-1 text-yellow-500" />
            {user.rating}
          </Badge>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Profile">
              <BadgeCheck />
              <span>Profile Overview</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Portfolio">
              <Briefcase />
              <span>Portfolio</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Reviews">
              <Star />
              <span>Reviews</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Messages">
              <MessageSquare />
              <span>Messages</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Wallet">
              <Wallet />
              <span>Wallet</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      
      <SidebarFooter>
        <div className="px-4 py-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-center text-xs text-white/60">
              <Award size={14} className="mr-2 text-skrypto-purple" />
              Member since: {new Date().getFullYear()}
            </div>
            <div className="flex items-center text-xs text-white/60">
              <Shield size={14} className="mr-2 text-skrypto-purple" />
              Escrow protected
            </div>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default ProfileSidebar;
