
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

export const useNotificationAction = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ notificationId, action }: { notificationId: string; action: 'read' | 'pin' | 'unpin' }) => {
      const { data, error } = await supabase.functions.invoke('notifications-action', {
        body: { notificationId, action }
      });

      if (error) throw error;
      return data;
    },
    onSuccess: (data, variables) => {
      toast({
        title: "Action Completed",
        description: `Notification ${variables.action} successfully.`,
      });
      // Invalidate notifications to refresh the list
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
    onError: (error) => {
      console.error('Notification action error:', error);
      toast({
        variant: "destructive",
        title: "Action Failed",
        description: "There was an error performing this action. Please try again.",
      });
    },
  });
};
