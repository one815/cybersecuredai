import { Link, useLocation } from "wouter";
// Vector security icons from attached assets
import securityIconsPath from "@assets/Screen Shot 2025-08-20 at 11.44.59 AM_1755708412270.png";
// CyberSecure logo
import cyberSecureLogo from "@assets/2_1755803929285.png";
import { useAuth } from "@/hooks/useAuth";
import type { NavigationItem } from "@/types";

const navigationItems: NavigationItem[] = [
  { id: "dashboard", label: "Dashboard", icon: "tachometer", path: "/" },
  { id: "threats", label: "Threat Monitoring", icon: "exclamation-triangle", path: "/threats" },
  { id: "threat-analysis", label: "Threat Analysis", icon: "activity", path: "/threat-analysis" },
  { id: "incidents", label: "Incident Response", icon: "alert-triangle", path: "/incidents" },
  { id: "security-integrations", label: "Security Integrations", icon: "zap", path: "/security-integrations" },
  { id: "it-management", label: "IT Management", icon: "wrench", path: "/it-management" },
  { id: "auth", label: "Authentication", icon: "lock", path: "/authentication" },
  { id: "files", label: "File Sharing", icon: "share", path: "/files" },
  { id: "compliance", label: "Compliance", icon: "clipboard-check", path: "/compliance" },
  { id: "training", label: "Security Training", icon: "graduation-cap", path: "/training" },
  { id: "support", label: "Help Desk", icon: "help-circle", path: "/support" },
  { id: "users", label: "User Management", icon: "users", path: "/users" },
  { id: "admin", label: "Admin Panel", icon: "user-cog", path: "/admin" },
  { id: "ai-config", label: "AI Configuration", icon: "brain", path: "/ai-config" },
  { id: "reports", label: "Reports", icon: "chart-bar", path: "/reports" },
];

const iconMap = {
  tachometer: { position: '30% 40%', color: 'hue-rotate(200deg)' },
  "exclamation-triangle": { position: '10% 90%', color: 'hue-rotate(50deg)' },
  activity: { position: '50% 70%', color: 'hue-rotate(120deg)' },
  "alert-triangle": { position: '10% 90%', color: 'hue-rotate(0deg)' },
  zap: { position: '50% 70%', color: 'hue-rotate(200deg)' },
  wrench: { position: '70% 90%', color: 'hue-rotate(20deg)' },
  lock: { position: '90% 10%', color: 'hue-rotate(120deg)' },
  share: { position: '30% 40%', color: 'hue-rotate(180deg)' },
  "clipboard-check": { position: '90% 40%', color: 'hue-rotate(120deg)' },
  "graduation-cap": { position: '50% 90%', color: 'hue-rotate(280deg)' },
  "help-circle": { position: '30% 40%', color: 'hue-rotate(200deg)' },
  users: { position: '50% 40%', color: 'hue-rotate(200deg)' },
  "user-cog": { position: '30% 40%', color: 'hue-rotate(280deg)' },
  brain: { position: '50% 90%', color: 'hue-rotate(180deg)' },
  "chart-bar": { position: '30% 90%', color: 'hue-rotate(200deg)' },
};

export function Sidebar() {
  const [location] = useLocation();
  const { user } = useAuth();

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-surface border-r border-surface-light z-50">
      {/* Logo Section */}
      <div className="p-12 border-b border-surface-light bg-gray-800/20">
        <div className="flex justify-center items-center">
          <img 
            src={cyberSecureLogo} 
            alt="CyberSecure AI Logo" 
            className="h-60 w-auto object-contain max-w-full"
            style={{ filter: 'brightness(1.1) contrast(1.1)' }}
          />
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="p-4 space-y-2">
        {navigationItems.map((item) => {
          const iconConfig = iconMap[item.icon as keyof typeof iconMap];
          const isActive = location === item.path;
          
          return (
            <Link key={item.id} href={item.path}>
              <div 
                className={`flex items-center space-x-3 p-3 rounded-lg font-medium transition-colors cursor-pointer ${
                  isActive 
                    ? "bg-primary text-secondary" 
                    : "hover:bg-surface-light text-gray-300 hover:text-white"
                }`}
                data-testid={`nav-${item.id}`}
              >
                <div 
                  className="w-5 h-5 bg-contain bg-no-repeat bg-center" 
                  style={{
                    backgroundImage: `url(${securityIconsPath})`, 
                    backgroundPosition: iconConfig?.position || '50% 50%', 
                    filter: `${iconConfig?.color || 'hue-rotate(180deg)'} saturate(1.5) brightness(1.2)`
                  }} 
                />
                <span>{item.label}</span>
              </div>
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
            <div 
              className="w-4 h-4 bg-contain bg-no-repeat bg-center" 
              style={{
                backgroundImage: `url(${securityIconsPath})`, 
                backgroundPosition: '70% 90%', 
                filter: 'hue-rotate(200deg) saturate(1.5) brightness(1.2)'
              }} 
            />
          </button>
        </div>
      </div>
    </div>
  );
}
