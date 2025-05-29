
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ConversationList from '@/components/messaging/ConversationList';
import ChatWindow from '@/components/messaging/ChatWindow';
import ChatHeader from '@/components/messaging/ChatHeader';
import MessageInput from '@/components/messaging/MessageInput';
import { Card } from '@/components/ui/card';
import { useSendMessage, useGetConversation, useBlockUser, useReportUser } from '@/hooks/useMessaging';
import { useProfile } from '@/contexts/ProfileContext';

const MessagingPage = () => {
  const { userId } = useParams<{ userId?: string }>();
  const { profile } = useProfile();
  const [selectedUserId, setSelectedUserId] = useState<string | undefined>(userId);
  const [messages, setMessages] = useState<any[]>([]);
  const [conversations, setConversations] = useState<any[]>([]);

  const sendMessageMutation = useSendMessage();
  const getConversationMutation = useGetConversation();
  const blockUserMutation = useBlockUser();
  const reportUserMutation = useReportUser();

  // Mock conversations for demo
  useEffect(() => {
    setConversations([
      {
        id: '1',
        user: {
          id: 'user1',
          username: 'john_dev',
          profile_image: undefined
        },
        lastMessage: {
          content: 'Hey, I saw your project. Interested!',
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
          profile_image: undefined
        },
        lastMessage: {
          content: 'Thanks for the quick turnaround!',
          timestamp: new Date(Date.now() - 3600000).toISOString(),
          read: true
        },
        unreadCount: 0
      }
    ]);
  }, []);

  useEffect(() => {
    if (selectedUserId) {
      getConversationMutation.mutate(
        { with_user_id: selectedUserId },
        {
          onSuccess: (data) => {
            setMessages(data.messages || []);
          }
        }
      );
    }
  }, [selectedUserId]);

  const handleSendMessage = (content: string) => {
    if (!selectedUserId) return;

    sendMessageMutation.mutate(
      { receiver_id: selectedUserId, content },
      {
        onSuccess: () => {
          // Add message to local state for immediate feedback
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

  const handleBlockUser = (userId: string, reason?: string) => {
    blockUserMutation.mutate({ blocked_id: userId, reason });
  };

  const handleReportUser = (userId: string, reason: string) => {
    reportUserMutation.mutate({ reported_id: userId, reason });
  };

  const selectedConversation = conversations.find(c => c.user.id === selectedUserId);

  return (
    <div className="min-h-screen bg-skrypto-dark">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[600px]">
          {/* Conversations List */}
          <div className="lg:col-span-1">
            <ConversationList
              conversations={conversations}
              onSelectConversation={setSelectedUserId}
              selectedUserId={selectedUserId}
            />
          </div>

          {/* Chat Window */}
          <div className="lg:col-span-3">
            {selectedUserId && selectedConversation ? (
              <Card className="glass border-white/10 h-full flex flex-col">
                <ChatHeader
                  user={selectedConversation.user}
                  onBlock={handleBlockUser}
                  onReport={handleReportUser}
                />
                <div className="flex-1 min-h-0">
                  <ChatWindow
                    messages={messages}
                    currentUserId={profile?.id || ''}
                    otherUser={selectedConversation.user}
                  />
                </div>
                <MessageInput
                  onSendMessage={handleSendMessage}
                  disabled={sendMessageMutation.isPending}
                />
              </Card>
            ) : (
              <Card className="glass border-white/10 h-full flex items-center justify-center">
                <div className="text-center">
                  <h3 className="text-white text-xl mb-2">Select a conversation</h3>
                  <p className="text-white/60">Choose a contact to start messaging</p>
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

export default MessagingPage;
