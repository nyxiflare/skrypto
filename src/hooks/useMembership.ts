
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

export const useCreateMembership = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ plan, price }: { plan: string; price: number }) => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error('Not authenticated');

      // Calculate end date based on plan
      const endDate = new Date();
      switch (plan) {
        case '3months':
          endDate.setMonth(endDate.getMonth() + 3);
          break;
        case '9months':
          endDate.setMonth(endDate.getMonth() + 9);
          break;
        case '18months':
          endDate.setMonth(endDate.getMonth() + 18);
          break;
        default:
          throw new Error('Invalid plan');
      }

      const { data, error } = await supabase
        .from('memberships')
        .insert({
          user_id: session.user.id,
          plan,
          status: 'active',
          start_date: new Date().toISOString(),
          end_date: endDate.toISOString()
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      toast({
        title: "Membership Activated",
        description: "Your membership has been activated successfully!",
      });
      // Invalidate profile data to refresh membership status
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      queryClient.invalidateQueries({ queryKey: ['membership'] });
    },
    onError: (error) => {
      console.error('Create membership error:', error);
      toast({
        variant: "destructive",
        title: "Activation Failed",
        description: "There was an error activating your membership. Please try again.",
      });
    },
  });
};

export const useGetMembership = () => {
  return useQuery({
    queryKey: ['membership'],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('memberships')
        .select('*')
        .eq('user_id', session.user.id)
        .eq('status', 'active')
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) throw error;
      return data;
    },
    enabled: true,
  });
};

export const useCancelMembership = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (membershipId: string) => {
      const { data, error } = await supabase
        .from('memberships')
        .update({ status: 'cancelled' })
        .eq('id', membershipId)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      toast({
        title: "Membership Cancelled",
        description: "Your membership has been cancelled successfully. You can renew anytime.",
      });
      // Invalidate profile data to refresh membership status
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      queryClient.invalidateQueries({ queryKey: ['membership'] });
    },
    onError: (error) => {
      console.error('Cancel membership error:', error);
      toast({
        variant: "destructive",
        title: "Cancellation Failed",
        description: "There was an error cancelling your membership. Please try again.",
      });
    },
  });
};
