
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useProfile } from '@/contexts/ProfileContext';
import { useWallet } from '@/contexts/WalletContext';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Bell, CheckCircle, AlertCircle, Info } from 'lucide-react';

const mockNotifications = [
  {
    id: 1,
    type: 'success',
    title: 'Payment Received',
    message: 'You received 0.8 ETH for completing the logo design project',
    time: '1 hour ago',
    unread: true,
  },
  {
    id: 2,
    type: 'info',
    title: 'New Message',
    message: 'You have a new message from client 0xA1B2C3...E9F0',
    time: '3 hours ago',
    unread: true,
  },
  {
    id: 3,
    type: 'warning',
    title: 'Project Deadline Approaching',
    message: 'NFT Minting Website project deadline is in 2 days',
    time: '1 day ago',
    unread: false,
  },
];

const Notifications = () => {
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

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle size={20} className="text-skrypto-green" />;
      case 'warning':
        return <AlertCircle size={20} className="text-yellow-400" />;
      case 'info':
      default:
        return <Info size={20} className="text-skrypto-blue" />;
    }
  };

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
            <h1 className="text-3xl font-bold text-gradient-purple">Notifications</h1>
          </div>

          <Card className="glass border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Bell size={20} />
                Recent Notifications
              </CardTitle>
              <CardDescription className="text-white/60">
                Stay updated with your latest activities and messages
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 rounded-lg border border-white/10 hover:bg-white/5 ${
                      notification.unread ? 'bg-white/5' : 'bg-transparent'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {getNotificationIcon(notification.type)}
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="text-white font-semibold">{notification.title}</h3>
                          <div className="flex items-center gap-2">
                            {notification.unread && (
                              <Badge className="bg-skrypto-purple text-white text-xs">New</Badge>
                            )}
                            <span className="text-white/60 text-sm">{notification.time}</span>
                          </div>
                        </div>
                        <p className="text-white/70">{notification.message}</p>
                      </div>
                    </div>
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

export default Notifications;
