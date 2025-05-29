
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { MessageCircle } from 'lucide-react';

interface Conversation {
  id: string;
  user: {
    id: string;
    username: string;
    profile_image?: string;
  };
  lastMessage: {
    content: string;
    timestamp: string;
    read: boolean;
  };
  unreadCount: number;
}

interface ConversationListProps {
  conversations: Conversation[];
  onSelectConversation: (userId: string) => void;
  selectedUserId?: string;
}

const ConversationList: React.FC<ConversationListProps> = ({
  conversations,
  onSelectConversation,
  selectedUserId
}) => {
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 24) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    return date.toLocaleDateString();
  };

  return (
    <Card className="glass border-white/10 h-full">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <MessageCircle size={20} />
          Messages
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="space-y-2">
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              onClick={() => onSelectConversation(conversation.user.id)}
              className={`p-4 cursor-pointer transition-colors border-b border-white/10 hover:bg-white/5 ${
                selectedUserId === conversation.user.id ? 'bg-skrypto-purple/20' : ''
              }`}
            >
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={conversation.user.profile_image} />
                  <AvatarFallback className="bg-skrypto-purple text-white">
                    {conversation.user.username?.[0]?.toUpperCase() || 'U'}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="text-white font-medium truncate">
                      {conversation.user.username}
                    </h3>
                    <span className="text-white/60 text-xs">
                      {formatTime(conversation.lastMessage.timestamp)}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <p className={`text-sm truncate ${
                      conversation.lastMessage.read ? 'text-white/60' : 'text-white font-medium'
                    }`}>
                      {conversation.lastMessage.content}
                    </p>
                    {conversation.unreadCount > 0 && (
                      <Badge className="bg-skrypto-purple text-white ml-2">
                        {conversation.unreadCount}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ConversationList;
