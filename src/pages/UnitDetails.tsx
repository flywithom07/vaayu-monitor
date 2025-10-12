import { useState } from "react";
import { Card } from "@/components/ui/card";
import AQIBadge from "@/components/AQIBadge";
import { unitsData } from "@/data/mockData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const UnitDetails = () => {
  const [selectedUnit, setSelectedUnit] = useState(Object.keys(unitsData)[0]);
  const unit = unitsData[selectedUnit];

  const getStatusClass = (status: string) => {
    switch (status) {
      case "Online": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "Offline": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      case "Maintenance": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      default: return "";
    }
  };

  const filtrationData = [
    { name: "Before", pm25: unit.filterIn },
    { name: "After", pm25: unit.filterOut }
  ];

  const efficiency = ((1 - unit.filterOut / unit.filterIn) * 100).toFixed(1);

  return (
    <div className="p-8">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-foreground mb-2">Unit-Level Drilldown</h1>
        <p className="text-lg text-muted-foreground">
          Granular data for each unit within the Delhi-NCR network
        </p>
      </header>

      {/* Unit Status Table */}
      <Card className="mb-8 overflow-hidden border-border/50">
        <div className="p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground">Unit Status Panel</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Unit ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  AQI
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  PM2.5 (µg/m³)
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Last Sync
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {Object.values(unitsData).map((u) => (
                <tr
                  key={u.id}
                  onClick={() => setSelectedUnit(u.id)}
                  className={`cursor-pointer transition-colors hover:bg-secondary/50 ${
                    selectedUnit === u.id ? "bg-primary/5 border-l-4 border-l-primary" : ""
                  }`}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-foreground">
                    {u.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                    {u.location}, {u.city}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <AQIBadge aqi={u.aqi} size="sm" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                    {u.pm25}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusClass(u.status)}`}>
                      {u.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                    {u.lastSync}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Detailed View */}
      <Card className="p-6 border-border/50">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-foreground">
            Detailed View: <span className="text-primary">{selectedUnit}</span>
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            {unit.location}, {unit.city}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Real-time Environmental Data */}
          <Card className="p-6 bg-gradient-subtle border-border/50">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Real-Time Environmental Data
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[
                { label: "PM2.5", value: `${unit.pm25} µg/m³` },
                { label: "PM10", value: `${unit.pm10} µg/m³` },
                { label: "CO", value: `${unit.co} ppm` },
                { label: "NOx", value: `${unit.nox} ppb` },
                { label: "SOx", value: `${unit.sox} ppb` },
                { label: "Temperature", value: `${unit.temp}°C` },
                { label: "Humidity", value: `${unit.humidity}%` },
                { label: "Battery", value: `${unit.batteryLevel}%` },
                { label: "Power", value: unit.powerSource }
              ].map((item) => (
                <div key={item.label} className="bg-background p-4 rounded-lg border border-border">
                  <p className="text-xs text-muted-foreground mb-1">{item.label}</p>
                  <p className="text-lg font-bold text-foreground">{item.value}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Filtration Performance */}
          <Card className="p-6 bg-gradient-subtle border-border/50">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Filtration Performance (PM2.5)
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Efficiency: <span className="font-bold text-primary">{efficiency}%</span>
            </p>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={filtrationData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis type="number" stroke="hsl(var(--muted-foreground))" />
                <YAxis dataKey="name" type="category" stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--popover))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "0.5rem"
                  }}
                />
                <Legend />
                <Bar dataKey="pm25" fill="hsl(var(--primary))" name="PM2.5 (µg/m³)" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>
      </Card>
    </div>
  );
};

export default UnitDetails;
