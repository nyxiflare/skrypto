
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface DashboardSummary {
  earningsThisWeek: number;
  jobsInProgress: number;
  unreadMessages: number;
  dueThisWeek: number;
}

export const useDashboardSummary = (userId: string) => {
  return useQuery({
    queryKey: ['dashboard-summary', userId],
    queryFn: async (): Promise<DashboardSummary> => {
      const { data, error } = await supabase.functions.invoke('dashboard-summary', {
        body: { userId }
      });

      if (error) throw error;
      return data;
    },
    enabled: !!userId,
  });
};

export interface AnalyticsData {
  earningsData: Array<{ month: string; earnings: number }>;
  skillsData: Array<{ skill: string; jobs: number; earnings: number }>;
  projectStatusData: Array<{ status: string; count: number; color: string }>;
  totalEarnings: number;
  completedJobs: number;
  avgRating: number;
  responseRate: number;
}

export const useAnalyticsData = (userId: string) => {
  return useQuery({
    queryKey: ['analytics', userId],
    queryFn: async (): Promise<AnalyticsData> => {
      const { data, error } = await supabase.functions.invoke('analytics', {
        body: { userId }
      });

      if (error) throw error;
      return data;
    },
    enabled: !!userId,
  });
};
