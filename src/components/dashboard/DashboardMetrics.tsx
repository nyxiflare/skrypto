
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, DollarSign, Users, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDashboardSummary } from '@/hooks/useDashboardData';
import { useProfile } from '@/contexts/ProfileContext';

const DashboardMetrics = () => {
  const { profile } = useProfile();
  const { data: summary, isLoading } = useDashboardSummary(profile?.id || '');

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} className="glass border-white/10 animate-pulse">
            <CardContent className="p-6">
              <div className="h-20 bg-white/5 rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const metrics = [
    {
      title: "Earnings This Week",
      value: `$${summary?.earningsThisWeek || 0}`,
      icon: DollarSign,
      color: "text-skrypto-green",
      link: "/dashboard/analytics"
    },
    {
      title: "Jobs in Progress",
      value: summary?.jobsInProgress || 0,
      icon: Users,
      color: "text-skrypto-blue",
      link: "/dashboard/jobs"
    },
    {
      title: "Unread Messages",
      value: summary?.unreadMessages || 0,
      icon: TrendingUp,
      color: "text-skrypto-purple",
      link: "/inbox"
    },
    {
      title: "Due This Week",
      value: summary?.dueThisWeek || 0,
      icon: Clock,
      color: "text-yellow-500",
      link: "/dashboard/jobs"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {metrics.map((metric, index) => {
        const Icon = metric.icon;
        return (
          <Link key={index} to={metric.link}>
            <Card className="glass border-white/10 hover:bg-white/5 transition-colors cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white/70">
                  {metric.title}
                </CardTitle>
                <Icon className={`h-4 w-4 ${metric.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{metric.value}</div>
              </CardContent>
            </Card>
          </Link>
        );
      })}
    </div>
  );
};

export default DashboardMetrics;
