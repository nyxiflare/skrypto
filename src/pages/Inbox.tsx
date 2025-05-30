
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ConversationList from '@/components/messaging/ConversationList';
import ChatWindow from '@/components/messaging/ChatWindow';
import MessageInput from '@/components/messaging/MessageInput';
import ChatHeader from '@/components/messaging/ChatHeader';
import { Card } from '@/components/ui/card';
import { useGetConversation, useSendMessage } from '@/hooks/useMessaging';
import { useProfile } from '@/contexts/ProfileContext';

const Inbox = () => {
  const { userId } = useParams();
  const [selectedUserId, setSelectedUserId] = useState<string | null>(userId || null);
  const { profile } = useProfile();
  
  const getConversationMutation = useGetConversation();
  const sendMessageMutation = useSendMessage();

  // Mock conversations data - replace with actual data fetching
  const conversations = [
    {
      id: '1',
      user: {
        id: 'user1',
        username: 'john_dev',
        profile_image: '/placeholder.svg'
      },
      lastMessage: {
        content: 'Hey, I saw your proposal. Looks great!',
        timestamp: new Date().toISOString(),
        read: false
      },
      unreadCount: 2
    },
    {
      id: '2',
      user: {
        id: 'user2',
        username: 'sarah_designer',
        profile_image: '/placeholder.svg'
      },
      lastMessage: {
        content: 'When can we start the project?',
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        read: true
      },
      unreadCount: 0
    }
  ];

  const [messages, setMessages] = useState([
    {
      id: '1',
      sender_id: 'user1',
      receiver_id: profile?.id || '',
      content: 'Hey, I saw your proposal. Looks great!',
      timestamp: new Date().toISOString(),
      read: false
    },
    {
      id: '2',
      sender_id: profile?.id || '',
      receiver_id: 'user1',
      content: 'Thank you! When would you like to start?',
      timestamp: new Date(Date.now() + 300000).toISOString(),
      read: true
    }
  ]);

  const handleSelectConversation = (userId: string) => {
    setSelectedUserId(userId);
    // Fetch conversation messages
    getConversationMutation.mutate({ with_user_id: userId });
  };

  const handleSendMessage = (content: string) => {
    if (!selectedUserId) return;
    
    sendMessageMutation.mutate(
      { receiver_id: selectedUserId, content },
      {
        onSuccess: () => {
          // Add message to local state for immediate UI update
          const newMessage = {
            id: Date.now().toString(),
            sender_id: profile?.id || '',
            receiver_id: selectedUserId,
            content,
            timestamp: new Date().toISOString(),
            read: false
          };
          setMessages(prev => [...prev, newMessage]);
        }
      }
    );
  };

  const selectedUser = conversations.find(conv => conv.user.id === selectedUserId)?.user;

  return (
    <div className="min-h-screen bg-skrypto-dark">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
          {/* Conversations List */}
          <div className="lg:col-span-1">
            <ConversationList
              conversations={conversations}
              onSelectConversation={handleSelectConversation}
              selectedUserId={selectedUserId || undefined}
            />
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-2 flex flex-col">
            {selectedUserId && selectedUser ? (
              <>
                <ChatHeader
                  user={selectedUser}
                  onBlock={() => console.log('Block user')}
                  onReport={() => console.log('Report user')}
                />
                <div className="flex-1">
                  <ChatWindow
                    messages={messages}
                    currentUserId={profile?.id || ''}
                    otherUser={selectedUser}
                  />
                </div>
                <MessageInput
                  onSendMessage={handleSendMessage}
                  disabled={sendMessageMutation.isPending}
                />
              </>
            ) : (
              <Card className="glass border-white/10 h-full flex items-center justify-center">
                <div className="text-center text-white/70">
                  <h3 className="text-xl mb-2">Select a conversation</h3>
                  <p>Choose a conversation from the list to start messaging</p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Inbox;
