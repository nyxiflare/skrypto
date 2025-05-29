
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useWallet } from '@/contexts/WalletContext';
import { useToast } from '@/components/ui/use-toast';

export interface UserProfile {
  id: string;
  username: string;
  email: string;
  bio: string;
  profile_image: string;
  profile_type: 'hire' | 'earn' | 'guest';
  email_verified: boolean;
  wallet_address: string;
  created_at: string;
  updated_at: string;
}

export interface UserSkill {
  id: string;
  user_id: string;
  skill_name: string;
  category: string;
  rate: number;
  rate_type: string;
  description: string;
  created_at: string;
}

export const useGetProfile = (userId?: string) => {
  return useQuery({
    queryKey: ['profile', userId],
    queryFn: async (): Promise<UserProfile | null> => {
      if (!userId) return null;
      
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Profile fetch error:', error);
        return null;
      }
      
      return data;
    },
    enabled: !!userId,
  });
};

export const useGetUserSkills = (userId?: string) => {
  return useQuery({
    queryKey: ['user-skills', userId],
    queryFn: async (): Promise<UserSkill[]> => {
      if (!userId) return [];
      
      const { data, error } = await supabase
        .from('skills')
        .select('*')
        .eq('user_id', userId);

      if (error) {
        console.error('Skills fetch error:', error);
        return [];
      }
      
      return data || [];
    },
    enabled: !!userId,
  });
};

export const useUpdateProfile = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profileData: Partial<UserProfile>) => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error('Not authenticated');

      const { data, error } = await supabase.functions.invoke('update-profile', {
        body: profileData,
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      toast({
        title: "Profile Updated",
        description: "Your profile has been updated successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
    onError: (error) => {
      console.error('Update profile error:', error);
      toast({
        variant: "destructive",
        title: "Update Failed",
        description: "There was an error updating your profile. Please try again.",
      });
    },
  });
};
