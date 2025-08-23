import { Link, useLocation } from "wouter";
// CyberSecure logo
import cyberSecureLogo from "@assets/2_1755803929285.png";
import { useAuth } from "@/hooks/useAuth";
// Modern 3D/Futuristic Icons
import { 
  LayoutDashboard, 
  Shield, 
  Activity, 
  AlertTriangle, 
  Zap, 
  Wrench, 
  Lock, 
  Share2, 
  ClipboardCheck, 
  Trophy,
  GraduationCap, 
  HelpCircle, 
  Users, 
  Settings, 
  Brain, 
  BarChart3,
  LogOut
} from "lucide-react";

const navigationItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { id: "threats", label: "Threat Monitoring", icon: Shield, path: "/threats" },
  { id: "threat-analysis", label: "Threat Analysis", icon: Activity, path: "/threat-analysis" },
  { id: "incidents", label: "Incident Response", icon: AlertTriangle, path: "/incidents" },
  { id: "security-integrations", label: "Security Integrations", icon: Zap, path: "/security-integrations" },
  { id: "it-management", label: "IT Management", icon: Wrench, path: "/it-management" },
  { id: "auth", label: "Authentication", icon: Lock, path: "/authentication" },
  { id: "files", label: "File Sharing", icon: Share2, path: "/files" },
  { id: "compliance", label: "Compliance", icon: ClipboardCheck, path: "/compliance" },
  { id: "achievements", label: "Achievements", icon: Trophy, path: "/achievements" },
  { id: "training", label: "Security Training", icon: GraduationCap, path: "/training" },
  { id: "support", label: "Help Desk", icon: HelpCircle, path: "/support" },
  { id: "users", label: "User Management", icon: Users, path: "/users" },
  { id: "admin", label: "Admin Panel", icon: Settings, path: "/admin" },
  { id: "ai-config", label: "AI Configuration", icon: Brain, path: "/ai-config" },
  { id: "reports", label: "Reports", icon: BarChart3, path: "/reports" },
];


export function Sidebar() {
  const [location] = useLocation();
  const { user } = useAuth();

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-surface border-r border-surface-light z-50">
      {/* Logo Section */}
      <div className="p-6 border-b border-surface-light bg-gray-800/20">
        <div className="flex justify-center items-center">
          <img 
            src={cyberSecureLogo} 
            alt="CyberSecure AI Logo" 
            className="h-20 w-auto object-contain max-w-full scale-150"
            style={{ filter: 'brightness(1.1) contrast(1.1)' }}
          />
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="p-4 space-y-2">
        {navigationItems.map((item) => {
          const isActive = location === item.path;
          const IconComponent = item.icon;
          
          return (
            <Link key={item.id} href={item.path}>
              <div 
                className={`flex items-center space-x-3 p-3 rounded-lg font-medium transition-all duration-300 cursor-pointer transform hover:scale-105 ${
                  isActive 
                    ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/30 text-cyan-300 shadow-lg shadow-cyan-500/20" 
                    : "hover:bg-gradient-to-r hover:from-gray-700/30 hover:to-gray-600/30 text-gray-300 hover:text-white hover:border hover:border-gray-500/30"
                }`}
                data-testid={`nav-${item.id}`}
              >
                <IconComponent 
                  className={`w-5 h-5 transition-all duration-300 ${
                    isActive 
                      ? "text-cyan-300 drop-shadow-sm filter" 
                      : "text-gray-400 group-hover:text-white"
                  }`}
                  style={{
                    filter: isActive ? 'drop-shadow(0 0 8px rgba(34, 211, 238, 0.4))' : 'none'
                  }}
                />
                <span className="transition-all duration-300">{item.label}</span>
              </div>
            </Link>
          );
        })}
      </nav>

      {/* User Profile */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-surface-light">
        <div className="flex items-center space-x-3 p-3 rounded-lg bg-gradient-to-r from-gray-800/50 to-gray-700/50 border border-gray-600/30 hover:border-gray-500/50 transition-all duration-300">
          <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-white text-sm font-semibold shadow-lg">
            {user?.email?.charAt(0).toUpperCase() || 'A'}
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-white">Admin User</p>
            <p className="text-xs text-gray-400">{user?.email || 'admin@cybersecure.ai'}</p>
          </div>
          <button className="text-gray-400 hover:text-red-400 transition-all duration-300 hover:scale-110 group" data-testid="user-settings">
            <LogOut className="w-4 h-4 transition-all duration-300 group-hover:drop-shadow-sm" style={{filter: 'drop-shadow(0 0 4px rgba(239, 68, 68, 0.3))'}} />
          </button>
        </div>
      </div>
    </div>
  );
}
