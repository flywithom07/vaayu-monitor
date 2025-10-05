import { Card } from "@/components/ui/card";
import { FileText, Download, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

const ReportsSection = () => {
  const reports = [
    {
      title: "NCAP Compliance Report",
      description: "Monthly air quality improvement metrics for City Action Plans",
      date: "December 2024",
      type: "PDF"
    },
    {
      title: "Network Performance Summary",
      description: "Operational metrics and uptime statistics across all units",
      date: "December 2024",
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
    }
  ];

  return (
    <Card className="p-6 border-border/50">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-foreground">Reports & Compliance</h3>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Generate and download compliance reports for NCAP and CPCB
          </p>
        </div>
        <Button variant="default" size="sm" className="gap-2">
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
                <h4 className="font-semibold text-foreground mb-1">{report.title}</h4>
                <p className="text-sm text-muted-foreground">{report.description}</p>
              </div>
              <span className="text-xs font-medium px-2 py-1 bg-primary/10 text-primary rounded">
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
  );
};

export default ReportsSection;
