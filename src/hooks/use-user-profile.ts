
import { useState, useEffect } from 'react';
import { freelancerData, Freelancer } from '@/data/freelancer-data';

interface UserProfileResult {
  isLoading: boolean;
  error: string | null;
  profileData: Freelancer | null;
}

export const useGetUserProfile = (username: string): UserProfileResult => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [profileData, setProfileData] = useState<Freelancer | null>(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Find freelancer by username
        const freelancer = freelancerData.find(
          f => f.username.toLowerCase() === username.toLowerCase()
        );
        
        if (!freelancer) {
          setError('User not found');
        } else {
          // Add mock wallet address to the freelancer data
          setProfileData({
            ...freelancer,
            walletAddress: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
            // We'll simulate reviews array for now
            reviews: []
          });
        }
      } catch (err) {
        setError('Failed to load profile data');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, [username]);

  return { isLoading, error, profileData };
};
