import { Card } from "@/components/ui/card";
import AQIBadge from "./AQIBadge";
import { Activity, MapPin } from "lucide-react";
import { unitsData } from "@/data/mockData";

// Group units by city
const cityGroups = Object.values(unitsData).reduce((acc, unit) => {
  if (!acc[unit.city]) {
    acc[unit.city] = [];
  }
  acc[unit.city].push(unit);
  return acc;
}, {} as Record<string, typeof unitsData[keyof typeof unitsData][]>);

const mockUnits = Object.entries(cityGroups).map(([city, units]) => {
  const avgAqi = Math.round(units.reduce((sum, u) => sum + u.aqi, 0) / units.length);
  const hasOffline = units.some(u => u.status === "Offline");
  const hasMaintenance = units.some(u => u.status === "Maintenance");
  const status = hasOffline ? "offline" : hasMaintenance ? "maintenance" : "online";
  
  return {
    id: city,
    city,
    aqi: avgAqi,
    status,
    units: units.length
  };
});

const getAQIColor = (aqi: number) => {
  if (aqi <= 50) return "bg-aqi-good";
  if (aqi <= 100) return "bg-aqi-satisfactory";
  if (aqi <= 200) return "bg-aqi-moderate";
  if (aqi <= 300) return "bg-aqi-poor";
  if (aqi <= 400) return "bg-aqi-very-poor";
  return "bg-aqi-severe";
};

const NetworkMap = () => {
  return (
    <Card className="overflow-hidden border-border/50">
      <div className="p-4 border-b border-border bg-gradient-subtle">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-foreground">Network Overview</h3>
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          Live status of {mockUnits.length} cities with active deployments
        </p>
      </div>
      
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {mockUnits.map((unit) => (
            <div 
              key={unit.id}
              className="p-4 border border-border rounded-lg hover:shadow-md transition-all cursor-pointer bg-card"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <h4 className="font-semibold text-foreground">{unit.city}</h4>
                </div>
                <div className={`w-3 h-3 rounded-full ${unit.status === 'online' ? 'bg-primary' : 'bg-muted'} animate-pulse`} />
              </div>
              
              <div className="mb-3">
                <AQIBadge aqi={unit.aqi} size="sm" />
              </div>
              
              <div className="text-sm text-muted-foreground">
                <p>{unit.units} units deployed</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default NetworkMap;
