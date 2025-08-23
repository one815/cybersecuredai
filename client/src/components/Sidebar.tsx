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
  LogOut,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  Crown,
  StarIcon,
  Sparkles
} from "lucide-react";
import { useState } from "react";

// Define subscription tier requirements
type SubscriptionTier = 'essential' | 'advanced' | 'enterprise' | 'cyber_cloud_essential' | 'cyber_cloud_advanced' | 'cyber_cloud_enterprise';
type UserRole = 'admin' | 'security_officer' | 'compliance_officer' | 'faculty' | 'student' | 'user';

interface NavigationItem {
  id: string;
  label: string;
  icon: any;
  path: string;
  requiredRoles?: UserRole[];
  requiredTier?: SubscriptionTier;
  isPremium?: boolean;
}

interface NavigationCategory {
  id: string;
  label: string;
  icon: any;
  items: NavigationItem[];
  requiredRoles?: UserRole[];
  requiredTier?: SubscriptionTier;
  isPremium?: boolean;
}

const navigationCategories: NavigationCategory[] = [
  {
    id: "overview",
    label: "Security Overview",
    icon: LayoutDashboard,
    items: [
      { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
      { id: "reports", label: "Security Reports", icon: BarChart3, path: "/reports", requiredTier: 'advanced' },
    ]
  },
  {
    id: "threat-operations",
    label: "Threat Operations",
    icon: Shield,
    requiredTier: 'essential',
    items: [
      { id: "threats", label: "Threat Monitoring", icon: Shield, path: "/threats" },
      { id: "threat-analysis", label: "Advanced Analytics", icon: Activity, path: "/threat-analysis", requiredTier: 'advanced', isPremium: true },
      { id: "incidents", label: "Incident Response", icon: AlertTriangle, path: "/incidents" },
      { id: "security-integrations", label: "Security Integrations", icon: Zap, path: "/security-integrations", requiredTier: 'enterprise', isPremium: true },
    ]
  },
  {
    id: "infrastructure",
    label: "IT Infrastructure",
    icon: Wrench,
    requiredRoles: ['admin', 'security_officer'],
    items: [
      { id: "it-management", label: "IT Management", icon: Wrench, path: "/it-management" },
      { id: "auth", label: "Authentication", icon: Lock, path: "/authentication" },
      { id: "files", label: "Secure File Sharing", icon: Share2, path: "/files" },
    ]
  },
  {
    id: "compliance",
    label: "Compliance & Risk",
    icon: ClipboardCheck,
    items: [
      { id: "compliance", label: "Compliance Center", icon: ClipboardCheck, path: "/compliance" },
      { id: "custom-compliance", label: "Custom Frameworks", icon: Settings, path: "/custom-compliance", requiredTier: 'enterprise', isPremium: true },
    ]
  },
  {
    id: "learning",
    label: "Learning & Development",
    icon: GraduationCap,
    items: [
      { id: "training", label: "Security Training", icon: GraduationCap, path: "/training" },
      { id: "achievements", label: "Achievements", icon: Trophy, path: "/achievements" },
      { id: "simulator", label: "Playbook Simulator", icon: Brain, path: "/simulator", requiredTier: 'advanced', isPremium: true },
    ]
  },
  {
    id: "administration",
    label: "System Administration",
    icon: Settings,
    requiredRoles: ['admin'],
    isPremium: true,
    items: [
      { id: "users", label: "User Management", icon: Users, path: "/users" },
      { id: "admin", label: "Admin Panel", icon: Settings, path: "/admin" },
      { id: "ai-config", label: "AI Configuration", icon: Brain, path: "/ai-config", requiredTier: 'enterprise' },
    ]
  },
  {
    id: "support",
    label: "Support & Resources",
    icon: HelpCircle,
    items: [
      { id: "support", label: "Help Desk", icon: HelpCircle, path: "/support" },
    ]
  }
];


export function Sidebar() {
  const [location] = useLocation();
  const { user } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(['overview', 'threat-operations']));

  // Helper functions for access control
  const hasRoleAccess = (requiredRoles?: UserRole[]) => {
    if (!requiredRoles || requiredRoles.length === 0) return true;
    return requiredRoles.includes(user?.role as UserRole);
  };

  const hasTierAccess = (requiredTier?: SubscriptionTier) => {
    if (!requiredTier) return true;
    const userTier = user?.planType as SubscriptionTier;
    
    const tierHierarchy: SubscriptionTier[] = [
      'essential', 'cyber_cloud_essential', 'advanced', 'cyber_cloud_advanced', 
      'enterprise', 'cyber_cloud_enterprise'
    ];
    
    const userTierIndex = tierHierarchy.indexOf(userTier);
    const requiredTierIndex = tierHierarchy.indexOf(requiredTier);
    
    return userTierIndex >= requiredTierIndex;
  };

  const canAccessItem = (item: NavigationItem | NavigationCategory) => {
    return hasRoleAccess(item.requiredRoles) && hasTierAccess(item.requiredTier);
  };

  const toggleCategory = (categoryId: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

  const getPremiumBadge = (isPremium?: boolean, requiredTier?: SubscriptionTier) => {
    if (!isPremium && !requiredTier) return null;
    
    if (requiredTier === 'enterprise' || requiredTier === 'cyber_cloud_enterprise') {
      return <Crown className="w-3 h-3 text-yellow-400 ml-1" />;
    } else if (requiredTier === 'advanced' || requiredTier === 'cyber_cloud_advanced') {
      return <Sparkles className="w-3 h-3 text-blue-400 ml-1" />;
    } else if (isPremium) {
      return <StarIcon className="w-3 h-3 text-purple-400 ml-1" />;
    }
    return null;
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button 
        onClick={() => setIsMobileMenuOpen(true)}
        className="fixed top-4 left-4 z-50 lg:hidden bg-surface border border-surface-light rounded-lg p-2 text-white hover:bg-gray-800 transition-all duration-300"
        data-testid="mobile-menu-button"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-full w-64 bg-surface border-r border-surface-light z-50 transition-transform duration-300 ${
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0`}>
        {/* Mobile Close Button */}
        <button 
          onClick={() => setIsMobileMenuOpen(false)}
          className="absolute top-4 right-4 z-50 lg:hidden bg-gray-800 border border-gray-600 rounded-lg p-2 text-white hover:bg-gray-700 transition-all duration-300"
          data-testid="mobile-menu-close"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Logo Section */}
        <div className="p-4 lg:p-6 border-b border-surface-light bg-gray-800/20">
          <div className="flex justify-center items-center">
            <img 
              src={cyberSecureLogo} 
              alt="CyberSecure AI Logo" 
              className="h-16 lg:h-20 w-auto object-contain max-w-full scale-150"
              style={{ filter: 'brightness(1.1) contrast(1.1)' }}
            />
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="p-3 lg:p-4 space-y-1 max-h-[calc(100vh-200px)] overflow-y-auto">
          {navigationCategories
            .filter(category => canAccessItem(category))
            .map((category) => {
              const isExpanded = expandedCategories.has(category.id);
              const CategoryIcon = category.icon;
              const hasAccessibleItems = category.items.some(item => canAccessItem(item));
              
              if (!hasAccessibleItems) return null;

              return (
                <div key={category.id} className="mb-2">
                  {/* Category Header */}
                  <button
                    onClick={() => toggleCategory(category.id)}
                    className="w-full flex items-center justify-between p-2 lg:p-3 rounded-lg font-medium transition-all duration-300 hover:bg-gradient-to-r hover:from-gray-700/30 hover:to-gray-600/30 text-gray-300 hover:text-white group"
                    data-testid={`category-${category.id}`}
                  >
                    <div className="flex items-center space-x-2 lg:space-x-3">
                      <CategoryIcon 
                        className="w-4 h-4 lg:w-5 lg:h-5 text-gray-400 group-hover:text-cyan-400 transition-all duration-300 flex-shrink-0"
                      />
                      <span className="transition-all duration-300 text-sm lg:text-base font-semibold truncate">
                        {category.label}
                      </span>
                      {getPremiumBadge(category.isPremium, category.requiredTier)}
                    </div>
                    <div className="flex items-center space-x-1">
                      {category.requiredTier && (
                        <div className="text-xs text-gray-500 uppercase font-bold px-1.5 py-0.5 rounded bg-gray-800/50 border border-gray-600/50">
                          {category.requiredTier.includes('enterprise') ? 'ENT' : 
                           category.requiredTier.includes('advanced') ? 'ADV' : 'ESS'}
                        </div>
                      )}
                      {isExpanded ? (
                        <ChevronDown className="w-3 h-3 lg:w-4 lg:h-4 text-gray-400 group-hover:text-cyan-400 transition-all duration-300" />
                      ) : (
                        <ChevronRight className="w-3 h-3 lg:w-4 lg:h-4 text-gray-400 group-hover:text-cyan-400 transition-all duration-300" />
                      )}
                    </div>
                  </button>

                  {/* Category Items */}
                  {isExpanded && (
                    <div className="ml-4 lg:ml-6 mt-1 space-y-1 border-l-2 border-gray-700/50 pl-3">
                      {category.items
                        .filter(item => canAccessItem(item))
                        .map((item) => {
                          const isActive = location === item.path;
                          const ItemIcon = item.icon;
                          const hasAccess = canAccessItem(item);
                          
                          return (
                            <Link key={item.id} href={item.path}>
                              <div 
                                className={`flex items-center justify-between p-2 lg:p-2.5 rounded-lg font-medium transition-all duration-300 cursor-pointer group ${
                                  isActive 
                                    ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/30 text-cyan-300 shadow-lg shadow-cyan-500/20" 
                                    : hasAccess
                                      ? "hover:bg-gradient-to-r hover:from-gray-700/30 hover:to-gray-600/30 text-gray-300 hover:text-white hover:border hover:border-gray-500/30"
                                      : "text-gray-500 opacity-50 cursor-not-allowed"
                                }`}
                                data-testid={`nav-${item.id}`}
                                onClick={() => hasAccess && setIsMobileMenuOpen(false)}
                              >
                                <div className="flex items-center space-x-2 lg:space-x-3 flex-1">
                                  <ItemIcon 
                                    className={`w-3.5 h-3.5 lg:w-4 lg:h-4 transition-all duration-300 flex-shrink-0 ${
                                      isActive 
                                        ? "text-cyan-300 drop-shadow-sm filter" 
                                        : hasAccess
                                          ? "text-gray-400 group-hover:text-white"
                                          : "text-gray-600"
                                    }`}
                                    style={{
                                      filter: isActive ? 'drop-shadow(0 0 8px rgba(34, 211, 238, 0.4))' : 'none'
                                    }}
                                  />
                                  <span className="transition-all duration-300 text-sm truncate">
                                    {item.label}
                                  </span>
                                </div>
                                
                                <div className="flex items-center space-x-1">
                                  {!hasAccess && item.requiredTier && (
                                    <div className="text-xs text-red-400 uppercase font-bold px-1 py-0.5 rounded bg-red-900/20 border border-red-700/50">
                                      {item.requiredTier.includes('enterprise') ? 'ENT' : 
                                       item.requiredTier.includes('advanced') ? 'ADV' : 'PRO'}
                                    </div>
                                  )}
                                  {getPremiumBadge(item.isPremium, item.requiredTier)}
                                </div>
                              </div>
                            </Link>
                          );
                        })}
                    </div>
                  )}
                </div>
              );
            })}
        </nav>

        {/* User Profile */}
        <div className="absolute bottom-0 left-0 right-0 p-3 lg:p-4 border-t border-surface-light">
          <div className="flex items-center space-x-2 lg:space-x-3 p-2 lg:p-3 rounded-lg bg-gradient-to-r from-gray-800/50 to-gray-700/50 border border-gray-600/30 hover:border-gray-500/50 transition-all duration-300">
            <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-white text-xs lg:text-sm font-semibold shadow-lg flex-shrink-0">
              {user?.email?.charAt(0).toUpperCase() || 'A'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs lg:text-sm font-medium text-white truncate">Admin User</p>
              <p className="text-xs text-gray-400 truncate">{user?.email || 'admin@cybersecure.ai'}</p>
            </div>
            <button className="text-gray-400 hover:text-red-400 transition-all duration-300 hover:scale-110 group flex-shrink-0" data-testid="user-settings">
              <LogOut className="w-3 h-3 lg:w-4 lg:h-4 transition-all duration-300 group-hover:drop-shadow-sm" style={{filter: 'drop-shadow(0 0 4px rgba(239, 68, 68, 0.3))'}} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
