import { Card } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { generateTrendData } from "@/data/mockData";

const Analytics = () => {
  const historicalData = generateTrendData(30);

  const impactMetrics = [
    { metric: "Total PM2.5 Removed", value: "1,247 kg", period: "Last 30 days", color: "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800" },
    { metric: "Total PM10 Removed", value: "2,839 kg", period: "Last 30 days", color: "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800" },
    { metric: "CO2e Reduction", value: "385 tons", period: "This year", color: "bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800" },
    { metric: "Air Volume Purified", value: "158M m³", period: "Last 30 days", color: "bg-teal-50 dark:bg-teal-900/20 border-teal-200 dark:border-teal-800" },
    { metric: "Energy from Solar", value: "3,450 kWh", period: "This month", color: "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800" },
    { metric: "Units Active", value: "125", period: "Current", color: "bg-primary/10 border-primary/20" }
  ];

  return (
    <div className="p-8">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-foreground mb-2">
          Analytics & Source Apportionment
        </h1>
        <p className="text-lg text-muted-foreground">
          Transform raw data into actionable intelligence for policy and planning
        </p>
      </header>

      {/* Historical Data Analysis */}
      <Card className="p-6 mb-8 border-border/50">
        <div className="flex items-center gap-2 mb-6">
          <BarChart3 className="w-5 h-5 text-primary" />
          <div>
            <h2 className="text-xl font-semibold text-foreground">Historical Data Analysis</h2>
            <p className="text-sm text-muted-foreground">
              Query and visualize historical trends for Delhi-NCR network (Last 30 days)
            </p>
          </div>
        </div>
        
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={historicalData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="day" 
              stroke="hsl(var(--muted-foreground))"
              tick={{ fontSize: 12 }}
            />
            <YAxis stroke="hsl(var(--muted-foreground))" />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--popover))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "0.5rem"
              }}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="pm25" 
              stroke="hsl(var(--primary))" 
              strokeWidth={2}
              name="PM2.5 (µg/m³)"
              dot={false}
            />
            <Line 
              type="monotone" 
              dataKey="pm10" 
              stroke="hsl(var(--accent))" 
              strokeWidth={2}
              name="PM10 (µg/m³)"
              dot={false}
            />
            <Line 
              type="monotone" 
              dataKey="co" 
              stroke="hsl(var(--destructive))" 
              strokeWidth={2}
              name="CO (ppm)"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Environmental Impact Reporting */}
      <Card className="p-6 border-border/50">
        <div className="flex items-center gap-2 mb-6">
          <BarChart3 className="w-5 h-5 text-primary" />
          <div>
            <h2 className="text-xl font-semibold text-foreground">Environmental Impact Reporting</h2>
            <p className="text-sm text-muted-foreground">
              Aggregated positive environmental impact across the Delhi-NCR network
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {impactMetrics.map((item, index) => (
            <div
              key={index}
              className={`p-6 rounded-lg border-2 ${item.color}`}
            >
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-muted-foreground">{item.metric}</p>
                <span className="text-xs text-muted-foreground">{item.period}</span>
              </div>
              <p className="text-3xl font-bold text-foreground">{item.value}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Analytics;
