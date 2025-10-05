export interface UnitData {
  id: string;
  location: string;
  city: string;
  aqi: number;
  pm25: number;
  pm10: number;
  status: "Online" | "Offline" | "Maintenance";
  lastSync: string;
  co: number;
  nox: number;
  sox: number;
  temp: number;
  humidity: number;
  filterIn: number;
  filterOut: number;
  batteryLevel?: number;
  powerSource: "Grid" | "Solar" | "Battery";
}

export interface AlertData {
  id: string;
  unitId: string;
  alert: string;
  severity: "Critical" | "Warning" | "Info";
  timestamp: string;
  status: "Active" | "Resolved";
}

export const unitsData: Record<string, UnitData> = {
  "SV-DEL-001": {
    id: "SV-DEL-001",
    location: "Connaught Place",
    city: "New Delhi",
    aqi: 258,
    pm25: 110,
    pm10: 258,
    status: "Online",
    lastSync: "2m ago",
    co: 2.1,
    nox: 45,
    sox: 12,
    temp: 28,
    humidity: 65,
    filterIn: 110,
    filterOut: 11,
    batteryLevel: 95,
    powerSource: "Grid"
  },
  "SV-DEL-002": {
    id: "SV-DEL-002",
    location: "India Gate",
    city: "New Delhi",
    aqi: 185,
    pm25: 85,
    pm10: 185,
    status: "Online",
    lastSync: "1m ago",
    co: 1.8,
    nox: 38,
    sox: 10,
    temp: 29,
    humidity: 63,
    filterIn: 85,
    filterOut: 9,
    batteryLevel: 88,
    powerSource: "Solar"
  },
  "SV-DEL-003": {
    id: "SV-DEL-003",
    location: "Chandni Chowk",
    city: "New Delhi",
    aqi: 312,
    pm25: 152,
    pm10: 312,
    status: "Offline",
    lastSync: "4h ago",
    co: 3.5,
    nox: 65,
    sox: 20,
    temp: 27,
    humidity: 68,
    filterIn: 152,
    filterOut: 120,
    batteryLevel: 15,
    powerSource: "Battery"
  },
  "SV-GUR-001": {
    id: "SV-GUR-001",
    location: "Cyber Hub",
    city: "Gurgaon",
    aqi: 290,
    pm25: 120,
    pm10: 290,
    status: "Maintenance",
    lastSync: "5m ago",
    co: 2.8,
    nox: 55,
    sox: 18,
    temp: 28,
    humidity: 66,
    filterIn: 120,
    filterOut: 45,
    batteryLevel: 72,
    powerSource: "Grid"
  },
  "SV-NOI-001": {
    id: "SV-NOI-001",
    location: "Sector 18",
    city: "Noida",
    aqi: 265,
    pm25: 115,
    pm10: 265,
    status: "Online",
    lastSync: "3m ago",
    co: 2.5,
    nox: 50,
    sox: 15,
    temp: 28,
    humidity: 67,
    filterIn: 115,
    filterOut: 12,
    batteryLevel: 90,
    powerSource: "Solar"
  },
  "SV-FAR-001": {
    id: "SV-FAR-001",
    location: "Surajkund",
    city: "Faridabad",
    aqi: 278,
    pm25: 125,
    pm10: 278,
    status: "Online",
    lastSync: "2m ago",
    co: 2.6,
    nox: 52,
    sox: 16,
    temp: 27,
    humidity: 70,
    filterIn: 125,
    filterOut: 13,
    batteryLevel: 85,
    powerSource: "Grid"
  },
  "SV-GAZ-001": {
    id: "SV-GAZ-001",
    location: "Raj Nagar",
    city: "Ghaziabad",
    aqi: 295,
    pm25: 130,
    pm10: 295,
    status: "Online",
    lastSync: "1m ago",
    co: 2.9,
    nox: 58,
    sox: 19,
    temp: 29,
    humidity: 64,
    filterIn: 130,
    filterOut: 14,
    batteryLevel: 92,
    powerSource: "Solar"
  },
  "SV-DEL-004": {
    id: "SV-DEL-004",
    location: "Karol Bagh",
    city: "New Delhi",
    aqi: 245,
    pm25: 105,
    pm10: 245,
    status: "Online",
    lastSync: "2m ago",
    co: 2.2,
    nox: 48,
    sox: 13,
    temp: 28,
    humidity: 66,
    filterIn: 105,
    filterOut: 10,
    batteryLevel: 87,
    powerSource: "Grid"
  }
};

export const alertsData: AlertData[] = [
  {
    id: "ALT-001",
    unitId: "SV-DEL-003",
    alert: "Unit offline for >1 hour - Connectivity issue detected",
    severity: "Critical",
    timestamp: "2 hours ago",
    status: "Active"
  },
  {
    id: "ALT-002",
    unitId: "SV-GUR-001",
    alert: "Anomalous PM2.5 readings - Filter replacement required",
    severity: "Warning",
    timestamp: "5 hours ago",
    status: "Active"
  },
  {
    id: "ALT-003",
    unitId: "SV-DEL-001",
    alert: "Filter change scheduled - Maintenance due in 48 hours",
    severity: "Info",
    timestamp: "1 day ago",
    status: "Active"
  },
  {
    id: "ALT-004",
    unitId: "SV-NOI-001",
    alert: "Low battery level detected - Solar charging active",
    severity: "Warning",
    timestamp: "2 days ago",
    status: "Resolved"
  },
  {
    id: "ALT-005",
    unitId: "SV-DEL-003",
    alert: "High battery drain - Power source switched to grid",
    severity: "Critical",
    timestamp: "4 hours ago",
    status: "Active"
  },
  {
    id: "ALT-006",
    unitId: "SV-GAZ-001",
    alert: "Sensor calibration required - NOx readings drift detected",
    severity: "Info",
    timestamp: "3 days ago",
    status: "Active"
  }
];

export const generateTrendData = (days: number = 30) => {
  return Array.from({ length: days }, (_, i) => ({
    day: `Day ${i + 1}`,
    pm25: Math.floor(Math.random() * 150) + 50,
    pm10: Math.floor(Math.random() * 250) + 100,
    co: Math.random() * 3 + 0.5
  }));
};
