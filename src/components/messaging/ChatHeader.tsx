
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MoreVertical, Shield, Flag } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import BlockUserModal from '@/components/modals/BlockUserModal';
import ReportUserModal from '@/components/modals/ReportUserModal';

interface ChatHeaderProps {
  user: {
    id: string;
    username: string;
    profile_image?: string;
  };
  onBlock: (userId: string, reason?: string) => void;
  onReport: (userId: string, reason: string) => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ user, onBlock, onReport }) => {
  const [showBlockModal, setShowBlockModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);

  return (
    <>
      <CardHeader className="border-b border-white/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={user.profile_image} />
              <AvatarFallback className="bg-skrypto-purple text-white">
                {user.username?.[0]?.toUpperCase() || 'U'}
              </AvatarFallback>
            </Avatar>
            <CardTitle className="text-white">{user.username}</CardTitle>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                <MoreVertical size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-skrypto-dark border-white/10">
              <DropdownMenuItem
                onClick={() => setShowBlockModal(true)}
                className="text-white hover:bg-white/10 cursor-pointer"
              >
                <Shield size={16} className="mr-2" />
                Block User
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setShowReportModal(true)}
                className="text-white hover:bg-white/10 cursor-pointer"
              >
                <Flag size={16} className="mr-2" />
                Report User
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <BlockUserModal
        isOpen={showBlockModal}
        onClose={() => setShowBlockModal(false)}
        onBlock={(reason) => {
          onBlock(user.id, reason);
          setShowBlockModal(false);
        }}
        username={user.username}
      />

      <ReportUserModal
        isOpen={showReportModal}
        onClose={() => setShowReportModal(false)}
        onReport={(reason) => {
          onReport(user.id, reason);
          setShowReportModal(false);
        }}
        username={user.username}
      />
    </>
  );
};

export default ChatHeader;
