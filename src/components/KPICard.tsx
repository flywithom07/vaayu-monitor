import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

interface KPICardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
}

const KPICard = ({ title, value, subtitle, icon: Icon, trend, trendValue }: KPICardProps) => {
  const trendColor = trend === "up" ? "text-primary" : trend === "down" ? "text-destructive" : "text-muted-foreground";

  return (
    <Card className="p-6 hover:shadow-lg transition-shadow bg-gradient-subtle border-border/50">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
          <h3 className="text-3xl font-bold text-foreground mb-2">{value}</h3>
          {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
          {trend && trendValue && (
            <p className={`text-xs font-medium mt-2 ${trendColor}`}>
              {trendValue}
            </p>
          )}
        </div>
        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
          <Icon className="w-6 h-6 text-primary" />
        </div>
      </div>
    </Card>
  );
};

export default KPICard;
