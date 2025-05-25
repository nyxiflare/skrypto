
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

export const useCancelMembership = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userId: string) => {
      const { data, error } = await supabase.functions.invoke('membership-cancel', {
        body: { userId }
      });

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
