import { Link, useLocation } from "wouter";
import { Shield, Gauge, TriangleAlert, Lock, Share, ClipboardCheck, Users, ChartBar, Settings, AlertTriangle, UserCog, Brain } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import type { NavigationItem } from "@/types";

const navigationItems: NavigationItem[] = [
  { id: "dashboard", label: "Dashboard", icon: "tachometer", path: "/" },
  { id: "threats", label: "Threat Monitoring", icon: "exclamation-triangle", path: "/threats" },
  { id: "incidents", label: "Incident Response", icon: "alert-triangle", path: "/incidents" },
  { id: "auth", label: "Authentication", icon: "lock", path: "/authentication" },
  { id: "files", label: "File Sharing", icon: "share", path: "/files" },
  { id: "compliance", label: "Compliance", icon: "clipboard-check", path: "/compliance" },
  { id: "users", label: "User Management", icon: "users", path: "/users" },
  { id: "admin", label: "Admin Panel", icon: "user-cog", path: "/admin" },
  { id: "ai-config", label: "AI Configuration", icon: "brain", path: "/ai-config" },
  { id: "reports", label: "Reports", icon: "chart-bar", path: "/reports" },
];

const iconMap = {
  tachometer: Gauge,
  "exclamation-triangle": TriangleAlert,
  "alert-triangle": AlertTriangle,
  lock: Lock,
  share: Share,
  "clipboard-check": ClipboardCheck,
  users: Users,
  "user-cog": UserCog,
  brain: Brain,
  "chart-bar": ChartBar,
};

export function Sidebar() {
  const [location] = useLocation();
  const { user } = useAuth();

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-surface border-r border-surface-light z-50">
      {/* Logo Section */}
      <div className="p-6 border-b border-surface-light">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <Shield className="text-secondary text-xl" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">CyberSecure AI</h1>
            <p className="text-xs text-gray-400">Security Platform</p>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="p-4 space-y-2">
        {navigationItems.map((item) => {
          const IconComponent = iconMap[item.icon as keyof typeof iconMap];
          const isActive = location === item.path;
          
          return (
            <Link key={item.id} href={item.path}>
              <a 
                className={`flex items-center space-x-3 p-3 rounded-lg font-medium transition-colors ${
                  isActive 
                    ? "bg-primary text-secondary" 
                    : "hover:bg-surface-light text-gray-300 hover:text-white"
                }`}
                data-testid={`nav-${item.id}`}
              >
                <IconComponent className="w-5 h-5" />
                <span>{item.label}</span>
              </a>
            </Link>
          );
        })}
      </nav>

      {/* User Profile */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-surface-light">
        <div className="flex items-center space-x-3">
          <img 
            src={user?.profileImageUrl || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"} 
            alt="User profile" 
            className="w-10 h-10 rounded-full object-cover" 
          />
          <div className="flex-1">
            <p className="text-sm font-medium">{user?.firstName} {user?.lastName}</p>
            <p className="text-xs text-gray-400 capitalize">{user?.role}</p>
          </div>
          <button className="text-gray-400 hover:text-white" data-testid="user-settings">
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
