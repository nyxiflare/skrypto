
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

export const useGetFreelancerProfile = (freelancerId: string) => {
  return useQuery({
    queryKey: ['freelancer-profile', freelancerId],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke('get-freelancer-profile', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: freelancerId }),
      });

      if (error) throw error;
      return data;
    },
    enabled: !!freelancerId,
  });
};

export const useAddPortfolioItem = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ title, description, media_url }: { title: string; description?: string; media_url?: string }) => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error('Not authenticated');

      const { data, error } = await supabase.functions.invoke('add-portfolio-item', {
        body: { title, description, media_url },
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      toast({
        title: "Portfolio Item Added",
        description: "Your portfolio item has been added successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ['freelancer-profile'] });
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
    onError: (error) => {
      console.error('Add portfolio item error:', error);
      toast({
        variant: "destructive",
        title: "Failed to Add",
        description: "There was an error adding your portfolio item.",
      });
    },
  });
};

export const useDeletePortfolioItem = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ item_id }: { item_id: string }) => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error('Not authenticated');

      const { data, error } = await supabase.functions.invoke('delete-portfolio-item', {
        body: { item_id },
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      toast({
        title: "Portfolio Item Deleted",
        description: "Portfolio item has been deleted successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ['freelancer-profile'] });
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
    onError: (error) => {
      console.error('Delete portfolio item error:', error);
      toast({
        variant: "destructive",
        title: "Delete Failed",
        description: "There was an error deleting the portfolio item.",
      });
    },
  });
};

export const useSubmitReview = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ freelancer_id, rating, comment }: { freelancer_id: string; rating: number; comment?: string }) => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error('Not authenticated');

      const { data, error } = await supabase.functions.invoke('submit-review', {
        body: { freelancer_id, rating, comment },
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      toast({
        title: "Review Submitted",
        description: "Your review has been submitted successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ['freelancer-profile'] });
    },
    onError: (error) => {
      console.error('Submit review error:', error);
      toast({
        variant: "destructive",
        title: "Review Failed",
        description: "There was an error submitting your review.",
      });
    },
  });
};
