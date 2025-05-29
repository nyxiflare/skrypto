
import React, { useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface Message {
  id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  timestamp: string;
  read: boolean;
}

interface ChatWindowProps {
  messages: Message[];
  currentUserId: string;
  otherUser: {
    username: string;
    profile_image?: string;
  };
}

const ChatWindow: React.FC<ChatWindowProps> = ({
  messages,
  currentUserId,
  otherUser
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <Card className="glass border-white/10 h-full flex flex-col">
      <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => {
          const isSent = message.sender_id === currentUserId;
          
          return (
            <div
              key={message.id}
              className={`flex items-end gap-2 ${isSent ? 'justify-end' : 'justify-start'}`}
            >
              {!isSent && (
                <Avatar className="h-8 w-8">
                  <AvatarImage src={otherUser.profile_image} />
                  <AvatarFallback className="bg-skrypto-purple text-white text-xs">
                    {otherUser.username?.[0]?.toUpperCase() || 'U'}
                  </AvatarFallback>
                </Avatar>
              )}
              
              <div className={`max-w-xs lg:max-w-md ${isSent ? 'order-1' : ''}`}>
                <div
                  className={`px-4 py-2 rounded-2xl ${
                    isSent
                      ? 'bg-skrypto-purple text-white rounded-br-sm'
                      : 'bg-white/10 text-white rounded-bl-sm'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                </div>
                <p className={`text-xs text-white/60 mt-1 ${isSent ? 'text-right' : ''}`}>
                  {formatTime(message.timestamp)}
                </p>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </CardContent>
    </Card>
  );
};

export default ChatWindow;
