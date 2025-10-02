import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Plus, Filter, MoreHorizontal, TrendingUp, Users, Target, DollarSign } from "lucide-react";
import MetricCard from "./ui/metric-card";
import StatusBadge from "./ui/status-badge";
import ProgressBar from "./ui/progress-bar";
import type { Campaign } from "@shared/schema";

export default function CampaignDashboard() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const { data: summary, isLoading: summaryLoading } = useQuery({
    queryKey: ["/api/dashboard/summary"],
  });

  const { data: campaigns, isLoading: campaignsLoading } = useQuery({
    queryKey: ["/api/campaigns"],
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "status-active";
      case "scheduled": return "status-scheduled";
      case "paused": return "status-paused";
      case "completed": return "status-completed";
      default: return "status-paused";
    }
  };

  const getChannelBadges = (channels: string[]) => {
    return channels?.map((channel, index) => (
      <span key={index} className="px-2 py-1 bg-muted rounded text-xs font-medium text-muted-foreground">
        {channel}
      </span>
    ));
  };

  if (summaryLoading || campaignsLoading) {
    return (
      <section className="py-24 lg:py-32 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-1/3 mx-auto mb-4"></div>
            <div className="h-4 bg-muted rounded w-1/2 mx-auto mb-16"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-32 bg-card rounded-xl border"></div>
              ))}
            </div>
            <div className="h-96 bg-card rounded-2xl border"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 lg:py-32 bg-muted/30" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Active Campaign Dashboard
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Monitor all your campaigns in real-time with comprehensive analytics and performance metrics.
          </p>
        </motion.div>
        
        {/* Campaign Overview Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <MetricCard
            title="Active Campaigns"
            value={summary?.activeCampaigns || 0}
            change="+12%"
            icon={Target}
            color="primary"
            testId="metric-active-campaigns"
          />
          <MetricCard
            title="Total Reach"
            value={`${summary?.totalReach || 0}M`}
            change="+28%"
            icon={Users}
            color="accent"
            testId="metric-total-reach"
          />
          <MetricCard
            title="Conversion Rate"
            value={`${summary?.conversionRate || 0}%`}
            change="+0.8%"
            icon={TrendingUp}
            color="secondary"
            testId="metric-conversion-rate"
          />
          <MetricCard
            title="ROI"
            value={`${summary?.avgROI || 0}%`}
            change="+45%"
            icon={DollarSign}
            color="primary"
            testId="metric-roi"
          />
        </motion.div>
        
        {/* Active Campaigns Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-card border border-border rounded-2xl overflow-hidden"
        >
          <div className="p-6 border-b border-border">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-foreground">Recent Campaigns</h3>
              <div className="flex items-center gap-3">
                <button 
                  className="px-4 py-2 text-sm border border-border rounded-lg hover:bg-muted transition-colors flex items-center gap-2"
                  data-testid="button-filter-campaigns"
                >
                  <Filter className="w-4 h-4" />
                  Filter
                </button>
                <button 
                  className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2"
                  data-testid="button-new-campaign"
                >
                  <Plus className="w-4 h-4" />
                  New Campaign
                </button>
              </div>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Campaign Name
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Channel
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Budget
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Performance
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {campaigns?.map((campaign: Campaign, index: number) => {
                  const progress = Math.min(
                    ((campaign.metrics as any)?.reach || 0) / (campaign.budget / 10) * 100, 
                    100
                  );
                  
                  return (
                    <tr 
                      key={campaign.id} 
                      className="hover:bg-muted/20 transition-colors"
                      data-testid={`campaign-row-${index}`}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                            <span className="text-sm font-bold text-primary">
                              {campaign.name.substring(0, 2).toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <div className="font-semibold text-foreground" data-testid={`campaign-name-${index}`}>
                              {campaign.name}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {campaign.description}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <StatusBadge 
                          status={campaign.status} 
                          className={getStatusColor(campaign.status)}
                          testId={`campaign-status-${index}`}
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 flex-wrap">
                          {getChannelBadges(campaign.channels as string[])}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-mono text-foreground" data-testid={`campaign-budget-${index}`}>
                          {formatCurrency(campaign.budget)}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <ProgressBar 
                          progress={Math.round(progress)}
                          testId={`campaign-progress-${index}`}
                        />
                      </td>
                      <td className="px-6 py-4">
                        <button 
                          className="text-muted-foreground hover:text-foreground transition-colors"
                          data-testid={`campaign-actions-${index}`}
                        >
                          <MoreHorizontal className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
