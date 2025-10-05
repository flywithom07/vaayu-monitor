import Navbar from "@/components/Navbar";
import KPICard from "@/components/KPICard";
import NetworkMap from "@/components/NetworkMap";
import AirQualityTrends from "@/components/AirQualityTrends";
import { Wind, Activity, MapPin, AlertTriangle } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            National Air Quality Dashboard
          </h1>
          <p className="text-lg text-muted-foreground">
            Real-time monitoring of India's Shuddh Vaayu purification network
          </p>
        </div>

        {/* KPI Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <KPICard
            title="Total Units Deployed"
            value="8,247"
            subtitle="Across 42 cities"
            icon={Wind}
            trend="up"
            trendValue="+12% this month"
          />
          <KPICard
            title="Network Uptime"
            value="98.7%"
            subtitle="Last 30 days"
            icon={Activity}
            trend="up"
            trendValue="+0.3% vs last month"
          />
          <KPICard
            title="National Avg AQI"
            value="142"
            subtitle="Moderate"
            icon={MapPin}
            trend="down"
            trendValue="-8 points this week"
          />
          <KPICard
            title="Active Alerts"
            value="23"
            subtitle="Units requiring attention"
            icon={AlertTriangle}
            trend="neutral"
          />
        </div>

        {/* Map Section */}
        <div className="mb-8">
          <NetworkMap />
        </div>

        {/* Trends Section */}
        <div>
          <AirQualityTrends />
        </div>
      </main>
    </div>
  );
};

export default Index;
