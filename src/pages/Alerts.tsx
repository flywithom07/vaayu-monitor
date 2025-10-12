import { Card } from "@/components/ui/card";
import { alertsData } from "@/data/mockData";
import { Bell } from "lucide-react";

const Alerts = () => {
  const getSeverityClass = (severity: string) => {
    switch (severity) {
      case "Critical": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      case "Warning": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "Info": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      default: return "";
    }
  };

  const getStatusColor = (status: string) => {
    return status === "Active" ? "text-red-600 dark:text-red-400" : "text-green-600 dark:text-green-400";
  };

  return (
    <div className="p-8">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-foreground mb-2">
          Network Health & Maintenance
        </h1>
        <p className="text-lg text-muted-foreground">
          Proactively flag issues and trigger maintenance actions across the network
        </p>
      </header>

      <Card className="overflow-hidden border-border/50">
        <div className="p-6 border-b border-border flex items-center gap-3">
          <Bell className="w-5 h-5 text-primary" />
          <div>
            <h2 className="text-xl font-semibold text-foreground">Active & Recent Alerts</h2>
            <p className="text-sm text-muted-foreground">
              Monitoring {alertsData.length} alerts across {new Set(alertsData.map(a => a.unitId)).size} units
            </p>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Unit ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Alert Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Severity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Timestamp
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {alertsData.map((alert) => (
                <tr key={alert.id} className="hover:bg-secondary/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-foreground">
                    {alert.unitId}
                  </td>
                  <td className="px-6 py-4 text-sm text-foreground">
                    {alert.alert}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getSeverityClass(alert.severity)}`}>
                      {alert.severity}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                    {alert.timestamp}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <span className={getStatusColor(alert.status)}>
                      {alert.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default Alerts;
