import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import AQIBadge from "@/components/AQIBadge";
import { unitsData as initialUnitsData, UnitData } from "@/data/mockData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const UnitDetails = () => {
  const [unitsData, setUnitsData] = useState<Record<string, UnitData>>(initialUnitsData);
  const [selectedUnit, setSelectedUnit] = useState(Object.keys(initialUnitsData)[0]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();
  const unit = unitsData[selectedUnit];

  const [newUnit, setNewUnit] = useState<Partial<UnitData>>({
    status: "Online",
    powerSource: "Grid"
  });

  const handleAddUnit = () => {
    if (!newUnit.id || !newUnit.location || !newUnit.city) {
      toast({
        title: "Error",
        description: "Please fill in all required fields (ID, Location, City)",
        variant: "destructive"
      });
      return;
    }

    if (unitsData[newUnit.id]) {
      toast({
        title: "Error",
        description: "Unit ID already exists",
        variant: "destructive"
      });
      return;
    }

    const unitToAdd: UnitData = {
      id: newUnit.id,
      location: newUnit.location,
      city: newUnit.city,
      aqi: Number(newUnit.aqi) || 0,
      pm25: Number(newUnit.pm25) || 0,
      pm10: Number(newUnit.pm10) || 0,
      status: newUnit.status || "Online",
      lastSync: "Just now",
      co: Number(newUnit.co) || 0,
      nox: Number(newUnit.nox) || 0,
      sox: Number(newUnit.sox) || 0,
      temp: Number(newUnit.temp) || 0,
      humidity: Number(newUnit.humidity) || 0,
      filterIn: Number(newUnit.filterIn) || 0,
      filterOut: Number(newUnit.filterOut) || 0,
      batteryLevel: Number(newUnit.batteryLevel) || 100,
      powerSource: newUnit.powerSource || "Grid"
    };

    setUnitsData(prev => ({ ...prev, [unitToAdd.id]: unitToAdd }));
    setSelectedUnit(unitToAdd.id);
    setDialogOpen(false);
    setNewUnit({ status: "Online", powerSource: "Grid" });
    
    toast({
      title: "Success",
      description: `Unit ${unitToAdd.id} added successfully`
    });
  };

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
      <header className="mb-8 flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">Unit-Level Drilldown</h1>
          <p className="text-lg text-muted-foreground">
            Granular data for each unit within the Delhi-NCR network
          </p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add New Unit
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Unit</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="id">Unit ID *</Label>
                <Input
                  id="id"
                  placeholder="SV-XXX-XXX"
                  value={newUnit.id || ""}
                  onChange={(e) => setNewUnit({ ...newUnit, id: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  placeholder="Area name"
                  value={newUnit.location || ""}
                  onChange={(e) => setNewUnit({ ...newUnit, location: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  placeholder="City name"
                  value={newUnit.city || ""}
                  onChange={(e) => setNewUnit({ ...newUnit, city: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select value={newUnit.status} onValueChange={(value) => setNewUnit({ ...newUnit, status: value as UnitData["status"] })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Online">Online</SelectItem>
                    <SelectItem value="Offline">Offline</SelectItem>
                    <SelectItem value="Maintenance">Maintenance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="aqi">AQI</Label>
                <Input
                  id="aqi"
                  type="number"
                  placeholder="0-500"
                  value={newUnit.aqi || ""}
                  onChange={(e) => setNewUnit({ ...newUnit, aqi: Number(e.target.value) })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pm25">PM2.5 (µg/m³)</Label>
                <Input
                  id="pm25"
                  type="number"
                  placeholder="0-999"
                  value={newUnit.pm25 || ""}
                  onChange={(e) => setNewUnit({ ...newUnit, pm25: Number(e.target.value) })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pm10">PM10 (µg/m³)</Label>
                <Input
                  id="pm10"
                  type="number"
                  placeholder="0-999"
                  value={newUnit.pm10 || ""}
                  onChange={(e) => setNewUnit({ ...newUnit, pm10: Number(e.target.value) })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="co">CO (ppm)</Label>
                <Input
                  id="co"
                  type="number"
                  step="0.1"
                  placeholder="0-50"
                  value={newUnit.co || ""}
                  onChange={(e) => setNewUnit({ ...newUnit, co: Number(e.target.value) })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="nox">NOx (ppb)</Label>
                <Input
                  id="nox"
                  type="number"
                  placeholder="0-999"
                  value={newUnit.nox || ""}
                  onChange={(e) => setNewUnit({ ...newUnit, nox: Number(e.target.value) })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sox">SOx (ppb)</Label>
                <Input
                  id="sox"
                  type="number"
                  placeholder="0-999"
                  value={newUnit.sox || ""}
                  onChange={(e) => setNewUnit({ ...newUnit, sox: Number(e.target.value) })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="temp">Temperature (°C)</Label>
                <Input
                  id="temp"
                  type="number"
                  placeholder="0-50"
                  value={newUnit.temp || ""}
                  onChange={(e) => setNewUnit({ ...newUnit, temp: Number(e.target.value) })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="humidity">Humidity (%)</Label>
                <Input
                  id="humidity"
                  type="number"
                  placeholder="0-100"
                  value={newUnit.humidity || ""}
                  onChange={(e) => setNewUnit({ ...newUnit, humidity: Number(e.target.value) })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="filterIn">Filter In (µg/m³)</Label>
                <Input
                  id="filterIn"
                  type="number"
                  placeholder="0-999"
                  value={newUnit.filterIn || ""}
                  onChange={(e) => setNewUnit({ ...newUnit, filterIn: Number(e.target.value) })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="filterOut">Filter Out (µg/m³)</Label>
                <Input
                  id="filterOut"
                  type="number"
                  placeholder="0-999"
                  value={newUnit.filterOut || ""}
                  onChange={(e) => setNewUnit({ ...newUnit, filterOut: Number(e.target.value) })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="batteryLevel">Battery Level (%)</Label>
                <Input
                  id="batteryLevel"
                  type="number"
                  placeholder="0-100"
                  value={newUnit.batteryLevel || ""}
                  onChange={(e) => setNewUnit({ ...newUnit, batteryLevel: Number(e.target.value) })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="powerSource">Power Source</Label>
                <Select value={newUnit.powerSource} onValueChange={(value) => setNewUnit({ ...newUnit, powerSource: value as UnitData["powerSource"] })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Grid">Grid</SelectItem>
                    <SelectItem value="Solar">Solar</SelectItem>
                    <SelectItem value="Battery">Battery</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddUnit}>
                Add Unit
              </Button>
            </div>
          </DialogContent>
        </Dialog>
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
