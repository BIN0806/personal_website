import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { BarChart3, TrendingUp, Users, Target } from "lucide-react";

const performanceData = [
  { channel: "Email Campaigns", value: 84320, percentage: 84, color: "primary" },
  { channel: "Social Media", value: 65480, percentage: 65, color: "accent" },
  { channel: "Paid Ads", value: 92150, percentage: 92, color: "secondary" },
  { channel: "Content Marketing", value: 58940, percentage: 59, color: "primary" }
];

const topCampaigns = [
  {
    rank: 1,
    name: "Black Friday Flash Sale",
    roi: 425,
    conversion: 6.2,
    revenue: "89.2K",
    trend: "up"
  },
  {
    rank: 2,
    name: "Spring Collection Launch", 
    roi: 342,
    conversion: 5.1,
    revenue: "72.8K",
    trend: "up"
  },
  {
    rank: 3,
    name: "Customer Retention Program",
    roi: 298,
    conversion: 4.7,
    revenue: "65.4K", 
    trend: "up"
  },
  {
    rank: 4,
    name: "Summer Clearance Event",
    roi: 276,
    conversion: 4.3,
    revenue: "58.9K",
    trend: "up"
  }
];

export default function AnalyticsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const getColorClass = (color: string) => {
    switch (color) {
      case "primary": return "bg-primary";
      case "accent": return "bg-accent";
      case "secondary": return "bg-secondary";
      default: return "bg-primary";
    }
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1: return "accent";
      case 2: return "primary";
      case 3: return "secondary";
      case 4: return "accent";
      default: return "primary";
    }
  };

  return (
    <section className="py-24 lg:py-32 bg-background" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Real-Time Analytics
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Track campaign performance with comprehensive analytics and actionable insights powered by AI.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Performance Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-card border border-border rounded-2xl p-8"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-foreground">Campaign Performance</h3>
              <div className="flex items-center gap-2">
                <button className="px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors">
                  7D
                </button>
                <button className="px-3 py-1.5 text-xs font-medium bg-primary text-primary-foreground rounded-lg">
                  30D
                </button>
                <button className="px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors">
                  90D
                </button>
              </div>
            </div>
            
            <div className="space-y-4">
              {performanceData.map((item, index) => (
                <motion.div
                  key={item.channel}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                  data-testid={`performance-item-${index}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">{item.channel}</span>
                    <span className="text-sm font-mono font-semibold text-foreground">
                      {item.value.toLocaleString()}
                    </span>
                  </div>
                  <div className="h-3 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full ${getColorClass(item.color)} rounded-full`}
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${item.percentage}%` } : { width: 0 }}
                      transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-6 pt-6 border-t border-border">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Total Impressions</div>
                  <div className="text-xl font-bold text-foreground" data-testid="text-total-impressions">300.9K</div>
                  <div className="text-xs text-accent font-medium">↑ 12.5%</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Click Rate</div>
                  <div className="text-xl font-bold text-foreground" data-testid="text-click-rate">4.8%</div>
                  <div className="text-xs text-accent font-medium">↑ 0.8%</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Conversions</div>
                  <div className="text-xl font-bold text-foreground" data-testid="text-conversions">14.4K</div>
                  <div className="text-xs text-accent font-medium">↑ 18.2%</div>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Top Performing Campaigns */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-card border border-border rounded-2xl p-8"
          >
            <h3 className="text-xl font-bold text-foreground mb-6">Top Performing Campaigns</h3>
            
            <div className="space-y-4">
              {topCampaigns.map((campaign, index) => (
                <motion.div
                  key={campaign.rank}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  className="flex items-center gap-4 p-4 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors"
                  data-testid={`top-campaign-${index}`}
                >
                  <div className={`w-12 h-12 bg-${getRankColor(campaign.rank)}/10 rounded-xl flex items-center justify-center flex-shrink-0 font-bold text-${getRankColor(campaign.rank)} text-lg`}>
                    #{campaign.rank}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-foreground mb-1" data-testid={`campaign-name-${index}`}>
                      {campaign.name}
                    </div>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span data-testid={`campaign-roi-${index}`}>ROI: {campaign.roi}%</span>
                      <span>•</span>
                      <span data-testid={`campaign-conversion-${index}`}>Conv: {campaign.conversion}%</span>
                      <span>•</span>
                      <span data-testid={`campaign-revenue-${index}`}>${campaign.revenue} Revenue</span>
                    </div>
                  </div>
                  <div className={`text-2xl font-bold text-${getRankColor(campaign.rank)}`}>
                    ↑
                  </div>
                </motion.div>
              ))}
            </div>
            
            <button 
              className="w-full mt-6 px-4 py-3 text-sm font-medium text-primary hover:bg-primary/5 rounded-lg transition-colors"
              data-testid="button-view-all-campaigns"
            >
              View All Campaigns →
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
