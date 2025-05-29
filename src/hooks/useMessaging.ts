
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

export const useSendMessage = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ receiver_id, content }: { receiver_id: string; content: string }) => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error('Not authenticated');

      const { data, error } = await supabase.functions.invoke('send-message', {
        body: { receiver_id, content },
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      toast({
        title: "Message Sent",
        description: "Your message has been sent successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
    },
    onError: (error) => {
      console.error('Send message error:', error);
      toast({
        variant: "destructive",
        title: "Failed to Send",
        description: "There was an error sending your message. Please try again.",
      });
    },
  });
};

export const useGetConversation = () => {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ with_user_id }: { with_user_id: string }) => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error('Not authenticated');

      const { data, error } = await supabase.functions.invoke('get-conversation', {
        body: { with_user_id },
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (error) throw error;
      return data;
    },
    onError: (error) => {
      console.error('Get conversation error:', error);
      toast({
        variant: "destructive",
        title: "Failed to Load",
        description: "There was an error loading the conversation.",
      });
    },
  });
};

export const useBlockUser = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ blocked_id, reason }: { blocked_id: string; reason?: string }) => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error('Not authenticated');

      const { data, error } = await supabase.functions.invoke('block-user', {
        body: { blocked_id, reason },
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      toast({
        title: "User Blocked",
        description: "User has been blocked successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
    },
    onError: (error) => {
      console.error('Block user error:', error);
      toast({
        variant: "destructive",
        title: "Block Failed",
        description: "There was an error blocking the user.",
      });
    },
  });
};

export const useReportUser = () => {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ reported_id, reason }: { reported_id: string; reason: string }) => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error('Not authenticated');

      const { data, error } = await supabase.functions.invoke('report-user', {
        body: { reported_id, reason },
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      toast({
        title: "Report Submitted",
        description: "Your report has been submitted successfully.",
      });
    },
    onError: (error) => {
      console.error('Report user error:', error);
      toast({
        variant: "destructive",
        title: "Report Failed",
        description: "There was an error submitting your report.",
      });
    },
  });
};
