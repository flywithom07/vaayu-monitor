import { Card } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { BarChart3 } from "lucide-react";

const sourceData = [
  { name: "Vehicular", value: 35, color: "hsl(var(--aqi-poor))" },
  { name: "Industrial", value: 25, color: "hsl(var(--aqi-moderate))" },
  { name: "Biomass Burning", value: 20, color: "hsl(var(--aqi-very-poor))" },
  { name: "Dust", value: 15, color: "hsl(var(--primary))" },
  { name: "Other", value: 5, color: "hsl(var(--muted))" }
];

const impactData = [
  { metric: "Total PM2.5 Removed", value: "12,847 kg", period: "Last 30 days" },
  { metric: "Total PM10 Removed", value: "18,392 kg", period: "Last 30 days" },
  { metric: "CO2e Reduction", value: "2,145 tons", period: "This year" },
  { metric: "Air Volume Purified", value: "458M m³", period: "Last 30 days" }
];

const AnalyticsSection = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="p-6 border-border/50">
        <div className="flex items-center gap-2 mb-6">
          <BarChart3 className="w-5 h-5 text-primary" />
          <div>
            <h3 className="font-semibold text-foreground">Source Attribution</h3>
            <p className="text-sm text-muted-foreground">National average pollution sources</p>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={sourceData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {sourceData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>

        <div className="mt-4 text-sm text-muted-foreground">
          <p>AI-powered source identification based on real-time sensor data</p>
        </div>
      </Card>

      <Card className="p-6 border-border/50">
        <div className="flex items-center gap-2 mb-6">
          <BarChart3 className="w-5 h-5 text-primary" />
          <div>
            <h3 className="font-semibold text-foreground">Environmental Impact</h3>
            <p className="text-sm text-muted-foreground">Network-wide positive impact metrics</p>
          </div>
        </div>

        <div className="space-y-4">
          {impactData.map((item, index) => (
            <div 
              key={index}
              className="p-4 bg-gradient-subtle rounded-lg border border-border/50"
            >
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm font-medium text-muted-foreground">{item.metric}</p>
                <span className="text-xs text-muted-foreground">{item.period}</span>
              </div>
              <p className="text-2xl font-bold text-foreground">{item.value}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default AnalyticsSection;
