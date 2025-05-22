
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import UserProfileHeader from '@/components/profile/UserProfileHeader';
import UserSkillsList from '@/components/profile/UserSkillsList';
import UserReviews from '@/components/profile/UserReviews';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Freelancer } from '@/data/freelancer-data';
import { useGetUserProfile } from '@/hooks/use-user-profile';

const UserProfile = () => {
  const { username } = useParams<{ username: string }>();
  const { isLoading, error, profileData } = useGetUserProfile(username || '');

  if (isLoading) {
    return (
      <div className="min-h-screen bg-skrypto-dark">
        <Navbar />
        <main className="container mx-auto px-4 py-12">
          <div className="glass p-12 rounded-xl flex justify-center items-center">
            <div className="animate-pulse flex flex-col items-center">
              <div className="h-32 w-32 bg-skrypto-purple/20 rounded-full mb-4"></div>
              <div className="h-8 w-64 bg-skrypto-purple/20 rounded mb-2"></div>
              <div className="h-4 w-96 bg-skrypto-purple/10 rounded"></div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !profileData) {
    return (
      <div className="min-h-screen bg-skrypto-dark">
        <Navbar />
        <main className="container mx-auto px-4 py-12">
          <div className="glass p-12 rounded-xl text-center">
            <h2 className="text-2xl font-bold text-white mb-4">User not found</h2>
            <p className="text-white/70 mb-6">
              The profile you are looking for does not exist or has been removed.
            </p>
            <Button asChild>
              <Link to="/explore">Back to Explore</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-skrypto-dark">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            asChild 
            className="text-white/70 hover:text-white hover:bg-white/5"
          >
            <Link to="/explore" className="flex items-center">
              <ArrowLeft className="mr-2" size={16} />
              Back to Explore
            </Link>
          </Button>
        </div>

        <UserProfileHeader user={profileData} />
        
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <UserSkillsList skills={profileData.skills || []} rate={profileData.rate} token={profileData.paymentToken} />
          </div>
          <div>
            <UserReviews reviews={profileData.reviews || []} />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default UserProfile;
