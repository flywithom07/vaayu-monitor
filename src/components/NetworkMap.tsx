import { Card } from "@/components/ui/card";
import AQIBadge from "./AQIBadge";
import { Activity, MapPin } from "lucide-react";

// Mock data for demonstration
const mockUnits = [
  { id: 1, city: "Delhi", aqi: 285, status: "online", units: 1247 },
  { id: 2, city: "Mumbai", aqi: 145, status: "online", units: 892 },
  { id: 3, city: "Bangalore", aqi: 92, status: "online", units: 645 },
  { id: 4, city: "Kolkata", aqi: 198, status: "online", units: 734 },
  { id: 5, city: "Chennai", aqi: 76, status: "online", units: 523 },
  { id: 6, city: "Hyderabad", aqi: 118, status: "online", units: 587 },
  { id: 7, city: "Pune", aqi: 132, status: "online", units: 412 },
  { id: 8, city: "Ahmedabad", aqi: 165, status: "online", units: 498 },
];

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
