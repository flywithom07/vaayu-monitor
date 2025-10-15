import { LayoutDashboard, MapPin, BarChart3, Bell, FileText, Settings } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  
  const navItems = [
    { name: "Dashboard", path: "/", icon: LayoutDashboard },
    { name: "Unit Details", path: "/units", icon: MapPin },
    { name: "Analytics", path: "/analytics", icon: BarChart3 },
    { name: "Alerts", path: "/alerts", icon: Bell },
    { name: "Reports", path: "/reports", icon: FileText },
  ];
  
  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <aside className="w-64 bg-card border-r border-border flex-shrink-0 flex flex-col justify-between">
      <div className="p-4">
        <div className="flex items-center gap-3 px-2 mb-8">
          <div className="bg-primary p-2 rounded-lg">
            <svg className="w-6 h-6 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
            </svg>
          </div>
          <h1 className="text-xl font-bold text-foreground">Shuddh Vaayu</h1>
        </div>
        
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 p-2.5 rounded-md transition-all ${
                  isActive(item.path)
                    ? "bg-primary text-primary-foreground font-semibold shadow-md"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>
      
      <div className="border-t border-border p-4">
        <Link
          to="/settings"
          className="flex items-center gap-3 p-2.5 rounded-md text-muted-foreground hover:bg-secondary hover:text-foreground transition-all"
        >
          <Settings className="w-5 h-5" />
          <span>Settings</span>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
