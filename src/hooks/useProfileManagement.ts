
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

export const useUpdateProfile = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profileData: { username?: string; email?: string; bio?: string; profileImage?: string }) => {
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

export const useSkillManagement = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ action, skill }: { action: 'add' | 'delete'; skill: any }) => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error('Not authenticated');

      const { data, error } = await supabase.functions.invoke('update-skills', {
        body: { action, skill },
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (error) throw error;
      return data;
    },
    onSuccess: (data, variables) => {
      toast({
        title: variables.action === 'add' ? "Skill Added" : "Skill Removed",
        description: `Skill ${variables.action === 'add' ? 'added' : 'removed'} successfully.`,
      });
      queryClient.invalidateQueries({ queryKey: ['user-skills'] });
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
    onError: (error) => {
      console.error('Skill management error:', error);
      toast({
        variant: "destructive",
        title: "Operation Failed",
        description: "There was an error managing your skills. Please try again.",
      });
    },
  });
};

export const useWalletManagement = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ action, walletAddress }: { action: 'view' | 'disconnect' | 'connect'; walletAddress?: string }) => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error('Not authenticated');

      const { data, error } = await supabase.functions.invoke('wallet-management', {
        body: { action, walletAddress },
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (error) throw error;
      return data;
    },
    onSuccess: (data, variables) => {
      if (variables.action === 'disconnect') {
        toast({
          title: "Wallet Disconnected",
          description: "Your wallet has been disconnected successfully.",
        });
      } else if (variables.action === 'connect') {
        toast({
          title: "Wallet Connected",
          description: "Your wallet has been connected successfully.",
        });
      }
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
    onError: (error) => {
      console.error('Wallet management error:', error);
      toast({
        variant: "destructive",
        title: "Operation Failed",
        description: "There was an error with your wallet operation. Please try again.",
      });
    },
  });
};
