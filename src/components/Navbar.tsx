import { Wind, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center shadow-glow">
              <Wind className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Shuddh Vaayu
              </h1>
              <p className="text-xs text-muted-foreground">National Air Quality Network</p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-6">
            <a href="#overview" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Overview
            </a>
            <a href="#network" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Network
            </a>
            <a href="#analytics" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Analytics
            </a>
            <a href="#reports" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Reports
            </a>
          </div>

          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
