import KPICard from "@/components/KPICard";
import NetworkMap from "@/components/NetworkMap";
import AirQualityTrends from "@/components/AirQualityTrends";
import AnalyticsSection from "@/components/AnalyticsSection";
import { Wind, Activity, MapPin, AlertTriangle } from "lucide-react";
import { unitsData, alertsData } from "@/data/mockData";

const Dashboard = () => {
  const totalUnits = Object.keys(unitsData).length;
  const onlineUnits = Object.values(unitsData).filter(u => u.status === "Online").length;
  const uptime = ((onlineUnits / totalUnits) * 100).toFixed(1);
  const avgAqi = Math.round(Object.values(unitsData).reduce((sum, u) => sum + u.aqi, 0) / totalUnits);
  const activeAlerts = alertsData.filter(a => a.status === "Active" && a.severity === "Critical").length;

  return (
    <div className="p-8">
      <div className="flex items-center justify-center gap-3 mb-6">
        <div className="bg-primary p-3 rounded-lg">
          <Wind className="w-8 h-8 text-primary-foreground" />
        </div>
        <h1 className="text-4xl font-bold text-foreground">Shuddh Vaayu</h1>
      </div>
      <header className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-foreground mb-2">
          Delhi-NCR Dashboard
        </h2>
        <p className="text-lg text-muted-foreground">
          Real-time monitoring of India's Shuddh Vaayu purification network across Delhi-NCR
        </p>
      </header>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <KPICard
          title="Total Units Deployed"
          value={totalUnits}
          subtitle="Across Delhi-NCR"
          icon={Wind}
          trend="up"
          trendValue="+3 this month"
        />
        <KPICard
          title="Network Uptime"
          value={`${uptime}%`}
          subtitle="Last 30 days"
          icon={Activity}
          trend="up"
          trendValue="+0.3% vs last month"
        />
        <KPICard
          title="Delhi-NCR Average AQI"
          value={avgAqi}
          subtitle="Poor"
          icon={MapPin}
          trend="down"
          trendValue="-5 points this week"
        />
        <KPICard
          title="Active Critical Alerts"
          value={activeAlerts}
          subtitle="Units requiring attention"
          icon={AlertTriangle}
          trend="neutral"
        />
      </div>

      {/* Network Section */}
      <div className="mb-8">
        <NetworkMap />
      </div>

      {/* Trends Section */}
      <div className="mb-8">
        <AirQualityTrends />
      </div>

      {/* Analytics Section */}
      <div>
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-foreground mb-2">Source Attribution</h2>
          <p className="text-muted-foreground">AI-powered source identification across Delhi-NCR</p>
        </div>
        <AnalyticsSection />
      </div>
    </div>
  );
};

export default Dashboard;
