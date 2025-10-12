import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, Calendar } from "lucide-react";

const Reports = () => {
  const reports = [
    {
      title: "NCAP Compliance Report",
      description: "Monthly air quality improvement metrics for City Action Plans",
      date: "January 2025",
      type: "PDF"
    },
    {
      title: "Network Performance Summary",
      description: "Operational metrics and uptime statistics across all units",
      date: "January 2025",
      type: "PDF"
    },
    {
      title: "Environmental Impact Analysis",
      description: "Total pollutants removed and CO2e reduction calculations",
      date: "Q4 2024",
      type: "PDF"
    },
    {
      title: "Public Dashboard Export",
      description: "Real-time AQI data for public communication portal",
      date: "Live Data",
      type: "CSV"
    },
    {
      title: "Delhi-NCR Monthly Summary",
      description: "Comprehensive monthly report for all NCR cities",
      date: "December 2024",
      type: "PDF"
    },
    {
      title: "Filter Maintenance Log",
      description: "Historical maintenance records and scheduled replacements",
      date: "2024 Annual",
      type: "XLSX"
    }
  ];

  return (
    <div className="p-8">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-foreground mb-2">
          Reporting & Communication
        </h1>
        <p className="text-lg text-muted-foreground">
          Tools for compliance, transparency, and public engagement
        </p>
      </header>

      {/* Report Generation */}
      <Card className="p-6 mb-8 border-border/50">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <FileText className="w-5 h-5 text-primary" />
            <div>
              <h2 className="text-xl font-semibold text-foreground">Reports & Compliance</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Generate and download compliance reports for local authorities
              </p>
            </div>
          </div>
          <Button className="gap-2">
            <Download className="w-4 h-4" />
            Generate New Report
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reports.map((report, index) => (
            <div
              key={index}
              className="p-4 border border-border rounded-lg hover:shadow-md transition-all bg-gradient-subtle"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-1">{report.title}</h3>
                  <p className="text-sm text-muted-foreground">{report.description}</p>
                </div>
                <span className="text-xs font-medium px-2 py-1 bg-primary/10 text-primary rounded ml-2">
                  {report.type}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span>{report.date}</span>
                </div>
                <Button variant="ghost" size="sm" className="gap-1">
                  <Download className="w-3 h-3" />
                  Download
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Public Dashboard Preview */}
      <Card className="p-6 border-border/50">
        <h2 className="text-xl font-semibold text-foreground mb-4">
          Public Dashboard Preview
        </h2>
        <p className="text-sm text-muted-foreground mb-6">
          A simplified view for the public communication portal
        </p>
        
        <div className="border-2 border-border rounded-lg p-6 bg-secondary/20">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-2xl text-foreground">Delhi Air Quality</h3>
            <span className="px-4 py-2 text-lg font-bold rounded-full bg-aqi-poor text-white">
              AQI 268
            </span>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {[
              { label: "PM2.5", value: "115 µg/m³" },
              { label: "PM10", value: "268 µg/m³" },
              { label: "CO", value: "2.4 ppm" },
              { label: "NOx", value: "48 ppb" }
            ].map((item) => (
              <div key={item.label} className="bg-card p-4 rounded-lg border border-border">
                <p className="text-xs text-muted-foreground mb-1">{item.label}</p>
                <p className="font-bold text-lg text-foreground">{item.value}</p>
              </div>
            ))}
          </div>
          
          <p className="text-xs text-center text-muted-foreground">
            Data from Unit SV-DEL-001 (Connaught Place) • Updated 2 minutes ago
          </p>
        </div>
      </Card>
    </div>
  );
};

export default Reports;
