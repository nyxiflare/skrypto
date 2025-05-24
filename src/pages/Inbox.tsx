
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useProfile } from '@/contexts/ProfileContext';
import { useWallet } from '@/contexts/WalletContext';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, MessageCircle } from 'lucide-react';

const mockMessages = [
  {
    id: 1,
    sender: '0xA1B2C3...E9F0',
    subject: 'Project Update Required',
    preview: 'Hi, I need an update on the NFT minting website...',
    time: '2 hours ago',
    unread: true,
  },
  {
    id: 2,
    sender: '0xCD2E4F...F91A',
    subject: 'Payment Released',
    preview: 'Your payment for the logo design has been released...',
    time: '1 day ago',
    unread: false,
  },
];

const Inbox = () => {
  const { isConnected } = useWallet();
  const { profile, isProfileComplete } = useProfile();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!isConnected) {
      navigate('/');
    }
    if (!isProfileComplete) {
      navigate('/onboarding');
    }
  }, [isConnected, isProfileComplete, navigate]);

  if (!profile || !isProfileComplete) {
    return null;
  }

  return (
    <div className="min-h-screen bg-skrypto-dark">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(-1)}
              className="text-white hover:bg-white/10"
            >
              <ArrowLeft size={16} className="mr-2" />
              Back
            </Button>
            <h1 className="text-3xl font-bold text-gradient-purple">Inbox</h1>
          </div>

          <Card className="glass border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <MessageCircle size={20} />
                Messages
              </CardTitle>
              <CardDescription className="text-white/60">
                Your conversation history with clients and freelancers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`p-4 rounded-lg border border-white/10 hover:bg-white/5 cursor-pointer ${
                      message.unread ? 'bg-skrypto-purple/10' : 'bg-white/5'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-white font-medium">{message.sender}</span>
                        {message.unread && (
                          <span className="bg-skrypto-purple text-white text-xs px-2 py-1 rounded-full">
                            New
                          </span>
                        )}
                      </div>
                      <span className="text-white/60 text-sm">{message.time}</span>
                    </div>
                    <h3 className="text-white font-semibold mb-1">{message.subject}</h3>
                    <p className="text-white/70 text-sm">{message.preview}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Inbox;
