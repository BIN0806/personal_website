import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  change: string;
  icon: LucideIcon;
  color: "primary" | "accent" | "secondary" | "destructive";
  testId?: string;
}

export default function MetricCard({ title, value, change, icon: Icon, color, testId }: MetricCardProps) {
  const getColorClasses = (color: string) => {
    switch (color) {
      case "primary":
        return {
          iconBg: "bg-primary/10",
          iconText: "text-primary"
        };
      case "accent":
        return {
          iconBg: "bg-accent/10", 
          iconText: "text-accent"
        };
      case "secondary":
        return {
          iconBg: "bg-secondary/10",
          iconText: "text-secondary"
        };
      case "destructive":
        return {
          iconBg: "bg-destructive/10",
          iconText: "text-destructive"
        };
      default:
        return {
          iconBg: "bg-primary/10",
          iconText: "text-primary"
        };
    }
  };

  const colorClasses = getColorClasses(color);

  return (
    <div className="bg-card border border-border rounded-xl p-6" data-testid={testId}>
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-muted-foreground">{title}</span>
        <div className={`w-5 h-5 ${colorClasses.iconBg} rounded flex items-center justify-center`}>
          <Icon className={`w-3 h-3 ${colorClasses.iconText}`} />
        </div>
      </div>
      <div className="text-3xl font-bold text-foreground mb-1" data-testid={`${testId}-value`}>
        {value}
      </div>
      <div className="text-xs text-accent font-medium" data-testid={`${testId}-change`}>
        {change} from last month
      </div>
    </div>
  );
}
