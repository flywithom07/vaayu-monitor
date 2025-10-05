import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { TrendingDown } from "lucide-react";

const mockData = [
  { date: "Jan", pm25: 145, pm10: 198, co: 1.2, nox: 45 },
  { date: "Feb", pm25: 138, pm10: 185, co: 1.1, nox: 42 },
  { date: "Mar", pm25: 125, pm10: 172, co: 1.0, nox: 38 },
  { date: "Apr", pm25: 118, pm10: 165, co: 0.9, nox: 35 },
  { date: "May", pm25: 135, pm10: 178, co: 1.1, nox: 40 },
  { date: "Jun", pm25: 122, pm10: 168, co: 0.95, nox: 37 },
];

const AirQualityTrends = () => {
  return (
    <Card className="p-6 border-border/50">
      <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-2">
              <TrendingDown className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-foreground">Delhi-NCR Air Quality Trends</h3>
            </div>
            <p className="text-sm text-muted-foreground mt-1">6-month average pollutant levels (PM2.5)</p>
          </div>
      </div>

      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={mockData}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis 
            dataKey="date" 
            stroke="hsl(var(--muted-foreground))"
            style={{ fontSize: '12px' }}
          />
          <YAxis 
            stroke="hsl(var(--muted-foreground))"
            style={{ fontSize: '12px' }}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px'
            }}
          />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="pm25" 
            stroke="hsl(var(--aqi-poor))" 
            strokeWidth={2}
            name="PM2.5 (µg/m³)"
            dot={{ fill: "hsl(var(--aqi-poor))", r: 4 }}
          />
          <Line 
            type="monotone" 
            dataKey="pm10" 
            stroke="hsl(var(--aqi-moderate))" 
            strokeWidth={2}
            name="PM10 (µg/m³)"
            dot={{ fill: "hsl(var(--aqi-moderate))", r: 4 }}
          />
          <Line 
            type="monotone" 
            dataKey="co" 
            stroke="hsl(var(--primary))" 
            strokeWidth={2}
            name="CO (ppm)"
            dot={{ fill: "hsl(var(--primary))", r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default AirQualityTrends;
