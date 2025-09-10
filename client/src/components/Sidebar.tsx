import { Link, useLocation } from "wouter";
// CyberSecure logo
import cyberSecureLogo from "@assets/CyberSecure AI (1)_1756164301031.jpg";
import { useAuth } from "@/hooks/useAuth";
import { useAuth as useAuth0 } from "@/contexts/AuthContext";
// Custom cybersecurity icons
import { 
  CustomClipboardCheckIcon, 
  CustomSettingsIcon, 
  CustomUserIcon, 
  CustomTargetIcon,
  CustomHeadphonesIcon
} from "@/components/CustomIcons";
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
  Trophy,
  GraduationCap, 
  Brain, 
  BarChart3,
  LogOut,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  Crown,
  StarIcon,
  Sparkles,
  TrendingUp,
  BookOpen,
  Video,
  FileText,
  Star,
  Monitor,
  Users
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
  // CORE SECURITY - Available to all users
  {
    id: "core-security",
    label: "Security Dashboard",
    icon: LayoutDashboard,
    items: [
      { id: "dashboard", label: "Overview", icon: LayoutDashboard, path: "/dashboard" },
      { id: "threats", label: "Threat Monitoring", icon: Shield, path: "/threats" },
      { id: "incidents", label: "Incident Response", icon: AlertTriangle, path: "/incidents" },
      { id: "files", label: "Secure File Sharing", icon: Share2, path: "/files" },
    ]
  },

  // THREAT INTELLIGENCE - Progressive from Basic to Enterprise
  {
    id: "threat-intelligence",
    label: "Threat Intelligence",
    icon: () => <CustomTargetIcon size={20} />,
    items: [
      { id: "threat-intelligence-basic", label: "Basic Intelligence", icon: () => <CustomTargetIcon size={16} />, path: "/threat-intelligence" },
      { id: "threat-analysis", label: "Advanced Analytics", icon: Activity, path: "/threat-analysis", requiredTier: 'advanced', isPremium: true },
      { id: "vulnerability-trends", label: "Vulnerability Prediction", icon: TrendingUp, path: "/vulnerability-trends", requiredTier: 'advanced', isPremium: true },
      { id: "threat-map-5d", label: "5D Threat Visualization", icon: Brain, path: "/threat-map-5d", requiredTier: 'enterprise', isPremium: true },
    ]
  },

  // ENTERPRISE THREAT OPERATIONS - Enterprise Only
  {
    id: "enterprise-threat-ops",
    label: "Enterprise Threat Ops",
    icon: Crown,
    requiredTier: 'enterprise',
    isPremium: true,
    requiredRoles: ['admin', 'security_officer'],
    items: [
      { id: "mandiant-intelligence", label: "Mandiant Intelligence", icon: Brain, path: "/platform/mandiant-intelligence", requiredTier: 'enterprise', isPremium: true },
      { id: "thehive-integration", label: "TheHive Case Management", icon: Shield, path: "/platform/thehive-integration", requiredTier: 'enterprise', isPremium: true },
      { id: "threatconnect-attribution", label: "ThreatConnect Attribution", icon: Brain, path: "/platform/threatconnect-attribution", requiredTier: 'enterprise', isPremium: true },
      { id: "taxii-stix-management", label: "TAXII/STIX Management", icon: Shield, path: "/platform/taxii-stix-management", requiredTier: 'enterprise', isPremium: true },
      { id: "enterprise-security-main", label: "Security Infrastructure", icon: Monitor, path: "/enterprise-security", requiredTier: 'enterprise', isPremium: true },
      { id: "security-integrations", label: "Premium Integrations", icon: Zap, path: "/security-integrations", requiredTier: 'enterprise', isPremium: true },
    ]
  },

  // COMPLIANCE & GOVERNANCE - Compliance officers and admins
  {
    id: "compliance-governance",
    label: "Compliance & Risk",
    icon: () => <CustomClipboardCheckIcon size={20} />,
    requiredRoles: ['admin', 'compliance_officer', 'security_officer'],
    items: [
      { id: "compliance", label: "Compliance Center", icon: () => <CustomClipboardCheckIcon size={16} />, path: "/compliance" },
      { id: "reports", label: "Security Reports", icon: BarChart3, path: "/reports", requiredTier: 'advanced' },
      { id: "custom-compliance", label: "Custom Frameworks", icon: () => <CustomSettingsIcon size={16} />, path: "/custom-compliance", requiredTier: 'enterprise', isPremium: true },
    ]
  },

  // SECURITY OPERATIONS - IT staff and security teams
  {
    id: "security-operations",
    label: "Security Operations",
    icon: Wrench,
    requiredRoles: ['admin', 'security_officer'],
    items: [
      { id: "it-management", label: "IT Management", icon: Wrench, path: "/it-management" },
      { id: "auth", label: "Authentication", icon: Lock, path: "/authentication" },
      { id: "users", label: "User Management", icon: () => <CustomUserIcon size={16} />, path: "/users", requiredRoles: ['admin'] },
      { id: "admin", label: "System Administration", icon: () => <CustomSettingsIcon size={16} />, path: "/admin", requiredRoles: ['admin'] },
      { id: "ai-config", label: "AI Configuration", icon: Brain, path: "/ai-config", requiredTier: 'enterprise', requiredRoles: ['admin'] },
    ]
  },

  // TRAINING & EDUCATION - Available to all users with role-based content
  {
    id: "education",
    label: "Security Training",
    icon: GraduationCap,
    items: [
      { id: "training", label: "Security Training", icon: GraduationCap, path: "/training" },
      { id: "courses", label: "Courses", icon: BookOpen, path: "/courses" },
      { id: "simulator", label: "Playbook Simulator", icon: Brain, path: "/simulator", requiredTier: 'advanced', isPremium: true },
      { id: "achievements", label: "Achievements", icon: Trophy, path: "/achievements" },
    ]
  },

  // KNOWLEDGE & RESOURCES - Organized by user type
  {
    id: "knowledge-resources",
    label: "Knowledge Hub",
    icon: BookOpen,
    items: [
      { id: "resources", label: "Resource Library", icon: BookOpen, path: "/resources" },
      { id: "whitepapers", label: "Technical Papers", icon: () => <FileText size={16} />, path: "/whitepapers" },
      { id: "use-cases", label: "Implementation Guides", icon: () => <Star size={16} />, path: "/use-cases" },
      { id: "webinars", label: "Expert Webinars", icon: () => <Video size={16} />, path: "/webinars" },
      { id: "blog-posts", label: "Security Insights", icon: () => <FileText size={16} />, path: "/blog-posts" },
    ]
  },

  // SUPPORT - Always accessible
  {
    id: "support-help",
    label: "Help & Support",
    icon: () => <CustomHeadphonesIcon size={20} />,
    items: [
      { id: "support", label: "Help Desk", icon: () => <CustomHeadphonesIcon size={16} />, path: "/support" },
      { id: "handbooks", label: "User Guides", icon: BookOpen, path: "/handbooks" },
    ]
  }
];


// Auth0 User Profile Component
function AuthUserProfile() {
  const { user, isAuthenticated, isLoading, login, logout } = useAuth0();

  if (isLoading) {
    return (
      <div className="flex items-center space-x-2 lg:space-x-3 p-2 lg:p-3 rounded-lg bg-gradient-to-r from-gray-800/50 to-gray-700/50 border border-gray-600/30">
        <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gray-700 rounded-full animate-pulse"></div>
        <div className="flex-1">
          <div className="h-3 bg-gray-700 rounded mb-1"></div>
          <div className="h-2 bg-gray-700 rounded"></div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <button
        onClick={login}
        className="w-full flex items-center justify-center space-x-2 p-3 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 border border-cyan-500/30 hover:border-cyan-400/50 transition-all duration-300 text-white font-medium"
        data-testid="login-button"
      >
        <LogOut className="w-4 h-4 rotate-180" />
        <span>Login with Auth0</span>
      </button>
    );
  }

  return (
    <div className="flex items-center space-x-2 lg:space-x-3 p-2 lg:p-3 rounded-lg bg-gradient-to-r from-gray-800/50 to-gray-700/50 border border-gray-600/30 hover:border-gray-500/50 transition-all duration-300">
      {user?.picture ? (
        <img 
          src={user.picture} 
          alt={user.name || 'User'} 
          className="w-8 h-8 lg:w-10 lg:h-10 rounded-full border-2 border-cyan-400/30"
        />
      ) : (
        <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-white text-xs lg:text-sm font-semibold shadow-lg flex-shrink-0">
          {user?.name?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || 'U'}
        </div>
      )}
      <div className="flex-1 min-w-0">
        <p className="text-xs lg:text-sm font-medium text-white truncate">{user?.name || 'Auth0 User'}</p>
        <p className="text-xs text-gray-400 truncate">{user?.email}</p>
      </div>
      <button 
        onClick={logout}
        className="text-gray-400 hover:text-red-400 transition-all duration-300 hover:scale-110 group flex-shrink-0" 
        data-testid="logout-button"
        title="Logout"
      >
        <LogOut className="w-3 h-3 lg:w-4 lg:h-4 transition-all duration-300 group-hover:drop-shadow-sm" style={{filter: 'drop-shadow(0 0 4px rgba(239, 68, 68, 0.3))'}} />
      </button>
    </div>
  );
}

export function Sidebar() {
  const [location] = useLocation();
  const { user } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(['core-security', 'threat-intelligence', 'enterprise-threat-ops', 'compliance-governance', 'security-operations', 'education', 'knowledge-resources', 'support-help']));

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
    // If user is not authenticated, grant access to admin user by default for demo
    if (!user || !user.role) {
      console.log('No user found, granting admin access for demo:', item.label);
      return true; // Allow all access when not authenticated for demo
    }
    
    // For debugging - let admin users see everything
    if (user?.role === 'admin') {
      console.log('Admin access granted for:', item.label);
      return true;
    }
    
    const hasRole = hasRoleAccess(item.requiredRoles);
    const hasTier = hasTierAccess(item.requiredTier);
    console.log('Access check result:', item.label, 'hasRole:', hasRole, 'hasTier:', hasTier);
    
    return hasRole && hasTier;
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

  const getUpgradePrompt = (requiredTier?: SubscriptionTier) => {
    const userTier = user?.planType as SubscriptionTier;
    if (!requiredTier || hasTierAccess(requiredTier)) return null;

    const upgradeMessage = requiredTier === 'enterprise' ? 
      'Upgrade to Enterprise for advanced threat intelligence' :
      'Upgrade to Advanced for enhanced security features';

    return (
      <div className="text-xs text-muted-foreground mt-1 px-2 py-1 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded border border-blue-500/20">
        {upgradeMessage}
      </div>
    );
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
              alt="CyberSecured AI Logo" 
              className="h-16 lg:h-20 w-auto object-contain max-w-full scale-150"
              style={{ filter: 'brightness(1.1) contrast(1.1)' }}
            />
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="p-3 lg:p-4 space-y-1 max-h-[calc(100vh-200px)] overflow-y-auto">
          {/* Debug info */}
          <div className="text-xs text-gray-500 mb-2">
            User: {user?.role} | Plan: {user?.planType}
          </div>
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
                            <div key={item.id}>
                              <Link href={item.path}>
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
                              {!canAccessItem(item) && getUpgradePrompt(item.requiredTier)}
                            </div>
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
          <AuthUserProfile />
        </div>
      </div>
    </>
  );
}
