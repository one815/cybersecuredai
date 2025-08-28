import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { DashboardCard } from "@/components/DashboardCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useState, useRef } from "react";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ComplianceHealthIndicator from "@/components/ComplianceHealthIndicator";
import BadgeDisplay from "@/components/BadgeDisplay";
import CypherDashboardWidget from "@/components/CypherDashboardWidget";
import ThreatFeedsDisplay from "@/components/ThreatFeedsDisplay";
import { ThreatMap } from "@/components/ThreatMap";
import { IntelligenceOverview } from "@/components/IntelligenceOverview";
import { CambridgeAnalytics } from "@/components/CambridgeAnalytics";
import { apiRequest } from "@/lib/queryClient";
import type { DashboardStats } from "@/types";
// Modern 3D/Futuristic Icons
import { 
  Shield, 
  Eye, 
  Search, 
  Bell, 
  AlertTriangle, 
  Activity, 
  Lock, 
  Zap, 
  TrendingUp,
  CheckCircle,
  ExternalLink,
  Users,
  Settings,
  BarChart,
  Calendar,
  FileText,
  Brain,
  AlertCircle,
  KeyRound,
  QrCode,
  Fingerprint,
  CreditCard,
  Key,
  Target,
  Bot,
  Monitor,
  Globe
} from "lucide-react";

export default function Dashboard() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // State for tracking resolved security alerts (persisted)
  const [resolvedAlerts, setResolvedAlerts] = useState<Set<string>>(() => {
    const saved = localStorage.getItem('resolvedAlerts');
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });

  // State for dashboard file management
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  
  // Function to mark alert as resolved with persistence
  const resolveAlert = (alertId: string) => {
    setResolvedAlerts(prev => {
      const newSet = new Set(Array.from(prev).concat(alertId));
      localStorage.setItem('resolvedAlerts', JSON.stringify(Array.from(newSet)));
      return newSet;
    });
  };
  const { data: stats, isLoading } = useQuery<DashboardStats>({
    queryKey: ["/api/dashboard/stats"],
  });

  const { data: complianceReports = [] } = useQuery<any[]>({
    queryKey: ["/api/compliance/frameworks"],
  });
  
  // File upload mutation
  const uploadFileMutation = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('encryptionStatus', 'encrypted');
      formData.append('accessExpiration', '7');
      formData.append('passwordProtection', 'false');

      const response = await fetch('/api/files/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Upload failed');
      }

      return response.json();
    },
    onSuccess: (data, file) => {
      toast({
        title: "File uploaded successfully",
        description: `${file.name} has been secured and classified`,
      });
      
      // Add file to local state with classification info
      setUploadedFiles(prev => [...prev, {
        id: data.file.id,
        name: file.name,
        size: file.size,
        type: data.file.type,
        uploadedAt: new Date().toISOString(),
        classification: 'Processing...',
        encrypted: true
      }]);

      // Refresh files query
      queryClient.invalidateQueries({ queryKey: ["/api/files"] });
    },
    onError: (error: Error) => {
      toast({
        title: "Upload failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Drag and drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    files.forEach(file => {
      uploadFileMutation.mutate(file);
    });
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    files.forEach(file => {
      uploadFileMutation.mutate(file);
    });
  };

  // Query for uploaded files
  const { data: recentFiles = [] } = useQuery({
    queryKey: ["/api/files"],
    refetchInterval: 2000, // Refresh every 2 seconds to get classification updates
  });

  const { data: threatStats } = useQuery<{
    recentEventsCount: number;
    suspiciousIPsCount: number;
    activeSessionsCount: number;
    trustedDevicesCount: number;
  }>({
    queryKey: ["/api/threats/stats"],
  });

  // Fetch AI analytics data
  const { data: aiAnalytics } = useQuery({
    queryKey: ["/api/ai/analytics"],
    refetchInterval: 30000, // Refresh every 30 seconds
    staleTime: 20000, // Cache for 20 seconds
  });

  const { data: dataClassificationSummary } = useQuery({
    queryKey: ["/api/data-classification/summary"],
  });

  // Fetch user badges for the dashboard
  const { data: userBadges } = useQuery<{
    userId: string;
    badges: any[];
    totalBadges: number;
    tierCounts: {
      bronze: number;
      silver: number;
      gold: number;
      platinum: number;
      diamond: number;
    };
  }>({
    queryKey: ["/api/badges/user/admin-1"], // Using admin-1 as demo user
    staleTime: 30000, // Cache for 30 seconds
  });

  // Fetch daily recommendations from Cypher AI
  const { data: dailyRecommendations } = useQuery({
    queryKey: ["/api/cypher/daily-recommendations/admin-1"],
    staleTime: 1000 * 60 * 30, // Cache for 30 minutes
    refetchInterval: 1000 * 60 * 60, // Refresh every hour
  });

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-surface rounded w-1/4 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-32 bg-surface rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const getThreatLevelColor = (level: string) => {
    switch (level) {
      case "LOW": return "success";
      case "MEDIUM": return "warning";
      case "HIGH": return "error";
      case "CRITICAL": return "error";
      default: return "info";
    }
  };

  return (
    <div className="ai-dashboard-bg min-h-screen">
      {/* SOC Header */}
      <header className="holographic-card backdrop-blur-md border-b border-surface-light p-4 sm:p-6 chart-glow">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between max-w-full space-y-4 lg:space-y-0">
          {/* Left Section - SOC Title and Status */}
          <div className="flex items-center space-x-3 sm:space-x-8">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg flex items-center justify-center floating-3d text-white text-xl sm:text-2xl">
                <Shield className="w-5 h-5 sm:w-6 sm:h-6" style={{filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.3))'}} />
              </div>
              <div className="flex-1 min-w-0">
                <h1 className="text-lg sm:text-xl lg:text-2xl font-bold geometric-text bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent flex items-center space-x-2">
                  <span className="truncate">CyberSecure AI SOC</span>
                </h1>
                <div className="text-gray-400 text-xs sm:text-sm cyber-font">
                  <span className="truncate">Security Operations Center</span>
                </div>
              </div>
            </div>
            
            {/* Status Indicators */}
            <div className="hidden xl:flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-400 text-sm font-medium">System Active</span>
              </div>
              <div className="text-white text-sm font-medium">Live Dashboard</div>
            </div>
          </div>

          {/* Right Section - Auth, Search, and Actions */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 w-full lg:w-auto">
            {/* Authentication Status */}
            <div className="hidden lg:flex items-center space-x-3">
              <div className="relative flex items-center space-x-4 p-4 holographic-card rounded-lg bg-green-900/20 border border-green-400/30">
                {/* Combined Scanning Effects */}
                <div className="absolute inset-0 rounded-lg border-2 border-green-400/50 animate-pulse"></div>
                <div className="absolute inset-0 rounded-lg border border-cyan-400/30 animate-ping"></div>
                
                {/* Eye Scanner with Scanning Animation */}
                <div className="relative">
                  <div className="absolute inset-0 rounded-full border-2 border-blue-400/60 animate-pulse"></div>
                  <div className="absolute inset-0 rounded-full border border-cyan-400/40 animate-ping"></div>
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                    <Eye className="w-8 h-8 text-white" style={{filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.4))'}} />
                  </div>
                </div>
                
                {/* Status Text */}
                <div className="relative">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse mb-1"></div>
                  <div className="text-xs">
                    <div className="tech-font text-green-400 font-semibold">ADMIN AUTHENTICATED</div>
                    <div className="text-gray-400">Security Level: MAX</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Quick Search */}
            <div className="relative hidden md:block">
              <Input
                type="text"
                placeholder="Search threats, users, files..."
                className="bg-background border-surface-light pl-10 w-56 text-sm focus:border-interactive"
                data-testid="dashboard-search"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
            </div>
            
            {/* Action Buttons */}
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Button variant="ghost" size="icon" className="relative text-gray-400 hover:text-white" data-testid="notifications-button">
                  <Bell className="w-5 h-5" style={{filter: 'drop-shadow(0 0 4px rgba(34, 211, 238, 0.3))'}} />
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-critical text-xs rounded-full flex items-center justify-center animate-pulse">3</span>
                </Button>
              </div>
              
              <Button className="bg-interactive hover:bg-orange-600 text-sm px-4 py-2" data-testid="new-incident-button">
                <AlertTriangle className="w-4 h-4 mr-2" style={{filter: 'drop-shadow(0 0 4px rgba(255, 255, 255, 0.3))'}} />
                <span className="hidden sm:inline">New Incident</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-3 sm:p-4 lg:p-6">
        {/* Post-Onboarding Tasks */}
        {user?.onboardingCompleted && (
          [user?.digitalKeyEnabled, user?.totpEnabled, user?.biometricEnabled, user?.hardwareKeyEnabled].filter(Boolean).length < 2
        ) && (
          <div className="mb-8">
            <Card className="bg-gradient-to-r from-orange-900/30 to-yellow-900/30 border-orange-500/50">
              <CardHeader>
                <CardTitle className="text-white text-lg flex items-center">
                  <AlertCircle className="w-5 h-5 mr-3 text-orange-400" />
                  Complete Your Security Setup
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {!user?.totpEnabled && (
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-white mb-1">Set up TOTP Authentication</h4>
                      <p className="text-gray-300 text-sm">Use Google Authenticator or similar apps for secure access codes.</p>
                    </div>
                    <Button 
                      onClick={() => window.location.href = '/authentication'}
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                      data-testid="setup-totp-task"
                    >
                      <QrCode className="w-4 h-4 mr-2" />
                      Setup TOTP
                    </Button>
                  </div>
                )}
                
                {!user?.biometricEnabled && (
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-white mb-1">Set up Biometric Authentication</h4>
                      <p className="text-gray-300 text-sm">Use fingerprint, face recognition, or device biometrics.</p>
                    </div>
                    <Button 
                      onClick={() => window.location.href = '/authentication'}
                      className="bg-purple-600 hover:bg-purple-700 text-white"
                      data-testid="setup-biometric-task"
                    >
                      <Fingerprint className="w-4 h-4 mr-2" />
                      Setup Biometric
                    </Button>
                  </div>
                )}
                
                {!user?.hardwareKeyEnabled && (
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-white mb-1">Set up Hardware Key Authentication</h4>
                      <p className="text-gray-300 text-sm">Use physical security keys like YubiKey or Titan keys.</p>
                    </div>
                    <Button 
                      onClick={() => window.location.href = '/authentication'}
                      className="bg-red-600 hover:bg-red-700 text-white"
                      data-testid="setup-hardware-key-task"
                    >
                      <Key className="w-4 h-4 mr-2" />
                      Setup Hardware Key
                    </Button>
                  </div>
                )}
                
                {!user?.digitalKeyEnabled && (
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-white mb-1">Set up Digital Key Authentication</h4>
                      <p className="text-gray-300 text-sm">Use smart cards or digital certificates for authentication.</p>
                    </div>
                    <Button 
                      onClick={() => window.location.href = '/authentication'}
                      className="bg-yellow-600 hover:bg-yellow-700 text-white"
                      data-testid="setup-digital-key-task"
                    >
                      <CreditCard className="w-4 h-4 mr-2" />
                      Setup Digital Key
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Badge Achievement Section */}
        {userBadges && (userBadges as any)?.totalBadges > 0 && (
          <div className="mb-8">
            <BadgeDisplay 
              userBadges={userBadges as any} 
              showProgress={true} 
              limit={3}
              variant="compact"
            />
          </div>
        )}

        {/* Essential Platform Overview */}
        <div className="mb-8">
          <Card className="holographic-card border-cyan-500/30 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-cyan-300 flex items-center font-bold tracking-wide">
                <Monitor className="w-6 h-6 mr-3 text-cyan-400 animate-pulse" />
                PLATFORM CAPABILITIES OVERVIEW
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-background/20 rounded-lg border border-cyan-500/20">
                  <Shield className="w-12 h-12 mx-auto mb-4 text-cyan-400" />
                  <h3 className="text-lg font-bold text-white mb-2">AI-Powered Security</h3>
                  <p className="text-sm text-gray-400">Advanced threat detection and response using machine learning algorithms</p>
                </div>
                <div className="text-center p-6 bg-background/20 rounded-lg border border-purple-500/20">
                  <Brain className="w-12 h-12 mx-auto mb-4 text-purple-400" />
                  <h3 className="text-lg font-bold text-white mb-2">Intelligence Analytics</h3>
                  <p className="text-sm text-gray-400">Cambridge-style analytical insights for strategic security planning</p>
                </div>
                <div className="text-center p-6 bg-background/20 rounded-lg border border-green-500/20">
                  <CheckCircle className="w-12 h-12 mx-auto mb-4 text-green-400" />
                  <h3 className="text-lg font-bold text-white mb-2">Compliance Management</h3>
                  <p className="text-sm text-gray-400">Automated compliance tracking for FERPA, FISMA, and CIPA requirements</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Live Threat Map - Dedicated Section */}
        <div className="mb-8">
          <Card className="holographic-card border-red-500/40 backdrop-blur-xl floating-3d">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-red-300 flex items-center font-bold tracking-wide text-xl">
                  <Globe className="w-7 h-7 mr-3 text-red-400 animate-pulse" />
                  GLOBAL THREAT INTELLIGENCE MAP
                  <Badge className="ml-3 bg-gradient-to-r from-red-500 to-orange-500 text-white animate-pulse">
                    LIVE MONITORING
                  </Badge>
                </CardTitle>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse"></div>
                    <span className="text-red-400 text-sm font-medium">Real-Time Updates</span>
                  </div>
                  <Button 
                    className="cyber-button border border-red-500/50 hover:bg-red-500/20"
                    onClick={() => setLocation('/threat-map-5d')}
                  >
                    <Target className="w-4 h-4 mr-2" />
                    5D View
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <div className="relative bg-gray-900 rounded-lg h-[400px] overflow-hidden min-h-[400px] border border-red-500/30">
                  <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 to-orange-900/20">
                    <svg viewBox="0 0 800 400" className="w-full h-full">
                      {/* Continents (simplified shapes) */}
                      <path d="M150 100 L250 90 L300 120 L280 180 L200 200 L120 160 Z" fill="#1e3a8a" opacity="0.6" />
                      <path d="M350 80 L500 70 L550 100 L520 150 L480 180 L400 170 L330 140 Z" fill="#1e3a8a" opacity="0.6" />
                      <path d="M100 220 L200 210 L250 240 L220 300 L150 320 L80 280 Z" fill="#1e3a8a" opacity="0.6" />
                      <path d="M300 200 L400 190 L450 220 L420 280 L350 300 L280 260 Z" fill="#1e3a8a" opacity="0.6" />
                      <path d="M500 180 L600 170 L650 200 L620 260 L550 280 L480 240 Z" fill="#1e3a8a" opacity="0.6" />
                      <path d="M650 90 L750 80 L780 110 L750 160 L700 180 L620 140 Z" fill="#1e3a8a" opacity="0.6" />
                      
                      {/* Threat indicators */}
                      <circle cx="200" cy="150" r="8" fill="#ef4444" className="animate-pulse" />
                      <circle cx="450" cy="120" r="6" fill="#f97316" className="animate-pulse" />
                      <circle cx="380" cy="250" r="5" fill="#eab308" className="animate-pulse" />
                      <circle cx="650" cy="180" r="7" fill="#ef4444" className="animate-pulse" />
                      <circle cx="550" cy="130" r="4" fill="#22c55e" className="animate-pulse" />
                      
                      {/* Threat labels */}
                      <text x="210" y="155" className="text-xs fill-red-400" fontSize="11">US - 15 threats</text>
                      <text x="460" y="125" className="text-xs fill-orange-400" fontSize="11">EU - 8 threats</text>
                      <text x="390" y="255" className="text-xs fill-yellow-400" fontSize="11">APAC - 5 threats</text>
                      <text x="660" y="185" className="text-xs fill-red-400" fontSize="11">RU - 12 threats</text>
                      <text x="560" y="135" className="text-xs fill-green-400" fontSize="11">CA - 2 threats</text>
                    </svg>
                  </div>
                  
                  {/* Map overlays */}
                  <div className="absolute top-4 left-4 bg-black/80 rounded px-3 py-2">
                    <div className="text-xs text-cyan-400 font-mono">GLOBAL THREAT OVERVIEW</div>
                  </div>
                  
                  <div className="absolute top-4 right-4 bg-black/80 rounded px-3 py-2 flex items-center">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2"></div>
                    <div className="text-xs text-green-400 font-mono">LIVE DATA</div>
                  </div>
                  
                  {/* Legend */}
                  <div className="absolute bottom-4 left-4 bg-black/80 rounded p-3">
                    <div className="text-xs text-gray-300 mb-2 font-semibold">Threat Levels</div>
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <span className="text-xs text-gray-300">Critical</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                        <span className="text-xs text-gray-300">High</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <span className="text-xs text-gray-300">Medium</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="text-xs text-gray-300">Low</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Stats */}
                  <div className="absolute bottom-4 right-4 bg-black/80 rounded p-3">
                    <div className="text-xs text-gray-300 font-mono">42 GLOBAL THREATS</div>
                  </div>
                </div>
              </div>
              
              {/* Threat Statistics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-4 bg-red-500/10 rounded-lg border border-red-500/30">
                  <div className="text-3xl font-bold text-red-400 cyber-text-glow mb-2">15</div>
                  <div className="text-sm text-gray-400">Active Threats</div>
                  <div className="text-xs text-red-400 mt-1">↑ 3 new</div>
                </div>
                <div className="text-center p-4 bg-orange-500/10 rounded-lg border border-orange-500/30">
                  <div className="text-3xl font-bold text-orange-400 cyber-text-glow mb-2">4</div>
                  <div className="text-sm text-gray-400">High Risk</div>
                  <div className="text-xs text-orange-400 mt-1">Critical</div>
                </div>
                <div className="text-center p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/30">
                  <div className="text-3xl font-bold text-yellow-400 cyber-text-glow mb-2">5</div>
                  <div className="text-sm text-gray-400">Medium Risk</div>
                  <div className="text-xs text-yellow-400 mt-1">Monitoring</div>
                </div>
                <div className="text-center p-4 bg-blue-500/10 rounded-lg border border-blue-500/30">
                  <div className="text-3xl font-bold text-blue-400 cyber-text-glow mb-2">6</div>
                  <div className="text-sm text-gray-400">Low Risk</div>
                  <div className="text-xs text-blue-400 mt-1">Routine</div>
                </div>
              </div>

              {/* Recent Threat Activity */}
              <div className="bg-background/20 rounded-lg p-4 border border-red-500/20">
                <h4 className="text-red-300 font-bold mb-3 flex items-center">
                  <Activity className="w-4 h-4 mr-2" />
                  Recent Threat Activity
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                      <span className="text-white">DDoS Attack Vector - 192.168.1.0/24</span>
                    </div>
                    <span className="text-gray-400">2 min ago</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                      <span className="text-white">Malware Signature Detected - EU Region</span>
                    </div>
                    <span className="text-gray-400">5 min ago</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                      <span className="text-white">Suspicious Traffic Pattern - Asia-Pacific</span>
                    </div>
                    <span className="text-gray-400">8 min ago</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Network Traffic and AI Detection Engine */}
        <div className="mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Network Traffic (Live) */}
            <Card className="holographic-card border border-cyan-500/30 bg-background/50">
              <CardHeader>
                <CardTitle className="text-white text-lg">Network Traffic (Live)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-900/50 rounded-lg p-4 min-h-[150px] flex items-center justify-center">
                  <div className="text-center text-gray-400">
                    <Activity className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p>Real-time network monitoring</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* AI Detection Engine */}
            <Card className="holographic-card border border-green-500/30 bg-background/50">
              <CardHeader>
                <CardTitle className="text-white text-lg">AI Detection Engine</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-900/50 rounded-lg p-4 min-h-[150px] flex items-center justify-center">
                  <div className="text-center text-gray-400">
                    <Brain className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p>AI-powered threat analysis</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Vulnerability Management Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <Target className="w-7 h-7 mr-3 text-orange-400" style={{filter: 'drop-shadow(0 0 6px rgba(251, 146, 60, 0.5))'}} />
            Vulnerability Management
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 24/7 Monitoring & Vulnerability Management */}
            <Card 
              className="holographic-card border border-orange-500/30 hover:border-orange-400/50 transition-all duration-300 cursor-pointer group"
              onClick={() => setLocation('/vulnerability-monitoring')}
              data-testid="vulnerability-monitoring-card"
            >
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Monitor className="w-6 h-6 text-white" style={{filter: 'drop-shadow(0 0 6px rgba(255, 255, 255, 0.3))'}} />
                    </div>
                    <div>
                      <CardTitle className="text-white text-lg group-hover:text-orange-300 transition-colors">
                        24/7 Monitoring & Vulnerability Management
                      </CardTitle>
                      <p className="text-gray-400 text-sm mt-1">Around-the-clock vulnerability detection and remediation</p>
                    </div>
                  </div>
                  <ExternalLink className="w-5 h-5 text-gray-500 group-hover:text-orange-400 transition-colors" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="bg-surface/30 rounded-lg p-3 text-center">
                      <div className="text-orange-400 font-bold text-lg">12,847</div>
                      <div className="text-gray-400 text-xs">Endpoints Monitored</div>
                    </div>
                    <div className="bg-surface/30 rounded-lg p-3 text-center">
                      <div className="text-orange-400 font-bold text-lg">98.4%</div>
                      <div className="text-gray-400 text-xs">Vulnerability Coverage</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-green-400">Real-time monitoring active</span>
                    </div>
                    <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/50">
                      24/7 Active
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Security Scanner */}
            <Card 
              className="holographic-card border border-blue-500/30 hover:border-blue-400/50 transition-all duration-300 cursor-pointer group"
              onClick={() => setLocation('/security-scanner')}
              data-testid="security-scanner-card"
            >
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Bot className="w-6 h-6 text-white" style={{filter: 'drop-shadow(0 0 6px rgba(255, 255, 255, 0.3))'}} />
                    </div>
                    <div>
                      <CardTitle className="text-white text-lg group-hover:text-blue-300 transition-colors">
                        Security Scanner
                      </CardTitle>
                      <p className="text-gray-400 text-sm mt-1">Free infrastructure security assessment tool</p>
                    </div>
                  </div>
                  <ExternalLink className="w-5 h-5 text-gray-500 group-hover:text-blue-400 transition-colors" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="bg-surface/30 rounded-lg p-3 text-center">
                      <div className="text-blue-400 font-bold text-lg">5</div>
                      <div className="text-gray-400 text-xs">Security Categories</div>
                    </div>
                    <div className="bg-surface/30 rounded-lg p-3 text-center">
                      <div className="text-blue-400 font-bold text-lg">100/100</div>
                      <div className="text-gray-400 text-xs">Assessment Score</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                      <span className="text-blue-400">Ready to scan domains</span>
                    </div>
                    <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/50">
                      Free Tool
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* AI Analytics Status Section */}
        {aiAnalytics && (
          <div className="mb-8">
            <Card className="holographic-card border border-cyan-500/30 chart-glow">
              <CardHeader>
                <CardTitle className="text-white text-xl flex items-center">
                  <Brain className="w-6 h-6 mr-3 text-cyan-400" style={{filter: 'drop-shadow(0 0 6px rgba(34, 211, 238, 0.5))'}} />
                  AI THREAT DETECTION ENGINE STATUS
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
                  <div className="text-center">
                    <div className="text-2xl lg:text-3xl font-bold text-cyan-400 mb-2">{(aiAnalytics as any)?.threatDetection?.mlModelAccuracy || 0}%</div>
                    <div className="text-sm text-gray-400">ML Accuracy</div>
                    <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                      <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full" style={{width: `${(aiAnalytics as any)?.threatDetection?.mlModelAccuracy || 0}%`}}></div>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl lg:text-3xl font-bold text-green-400 mb-2">{(aiAnalytics as any)?.systemMetrics?.threatDetectionRate || 0}%</div>
                    <div className="text-sm text-gray-400">Detection Rate</div>
                    <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                      <div className="bg-gradient-to-r from-green-500 to-green-400 h-2 rounded-full" style={{width: `${(aiAnalytics as any)?.systemMetrics?.threatDetectionRate || 0}%`}}></div>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl lg:text-3xl font-bold text-orange-400 mb-2">{(aiAnalytics as any)?.systemMetrics?.processingLatency || 0}ms</div>
                    <div className="text-sm text-gray-400">Processing Time</div>
                    <div className="flex items-center justify-center mt-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2"></div>
                      <span className="text-xs text-green-400">Real-time</span>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl lg:text-3xl font-bold text-purple-400 mb-2">{(aiAnalytics as any)?.behavioralAnalysis?.totalUsers || 0}</div>
                    <div className="text-sm text-gray-400">Users Monitored</div>
                    <div className="text-xs text-gray-400 mt-2">
                      Risk Score: {(aiAnalytics as any)?.behavioralAnalysis?.averageRiskScore || 0}
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div className="bg-gray-800/50 rounded-lg p-4">
                    <div className="text-sm text-gray-400 mb-2">Threat Distribution</div>
                    {(aiAnalytics as any)?.threatDetection?.threatDistribution && (
                      <div className="space-y-1">
                        {Object.entries((aiAnalytics as any).threatDetection.threatDistribution).map(([level, count]) => (
                          <div key={level} className="flex items-center justify-between text-xs">
                            <div className="flex items-center space-x-2">
                              <div className={`w-2 h-2 rounded-full ${
                                level === 'CRITICAL' ? 'bg-red-500' :
                                level === 'HIGH' ? 'bg-orange-500' :
                                level === 'MEDIUM' ? 'bg-yellow-500' :
                                'bg-green-500'
                              }`}></div>
                              <span className="text-gray-300">{level}</span>
                            </div>
                            <span className="text-white font-medium">{count as number}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <div className="bg-gray-800/50 rounded-lg p-4">
                    <div className="text-sm text-gray-400 mb-2">System Health</div>
                    <div className="space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">ML Engines</span>
                        <div className="flex items-center space-x-1">
                          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                          <span className="text-green-400">{(aiAnalytics as any)?.systemMetrics?.mlEnginesActive || 0} Active</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">False Positive Rate</span>
                        <span className="text-yellow-400">{(aiAnalytics as any)?.systemMetrics?.falsePositiveRate || 0}%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Data Points</span>
                        <span className="text-cyan-400">{(aiAnalytics as any)?.systemMetrics?.dataPointsProcessed || 0}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 mb-6 sm:mb-8">
          <Card className="holographic-card border border-blue-500/30 data-glow micro-hover floating-3d">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" style={{filter: 'drop-shadow(0 0 6px rgba(251, 191, 36, 0.5))'}} />
                  <span className="text-xs sm:text-sm text-gray-400 tech-font">THREAT LEVEL</span>
                </div>
                <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" style={{filter: 'drop-shadow(0 0 4px rgba(251, 191, 36, 0.4))'}} />
              </div>
              <div className="mb-4">
                <div className="text-3xl font-bold text-white mb-1 geometric-text">
                  {stats?.threatLevel || "LOW"}
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-xs text-gray-400">Safe</span>
                  <span className="text-xs text-gray-400">Critical</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-gradient-to-r from-green-500 to-yellow-500 h-2 rounded-full chart-glow" style={{width: '60%'}}></div>
                </div>
              </div>
              <div className="security-protocol">
                QUANTUM SCAN ACTIVE
              </div>
            </CardContent>
          </Card>

          <Card className="holographic-card border border-red-500/30 holographic-glow micro-hover">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <AlertTriangle className="w-6 h-6 text-red-400" style={{filter: 'drop-shadow(0 0 6px rgba(248, 113, 113, 0.5))'}} />
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  </div>
                  <span className="text-sm text-gray-400 tech-font">ACTIVE THREATS</span>
                </div>
                <div className="live-indicator">
                  LIVE
                </div>
              </div>
              <div className="text-3xl font-bold text-white mb-2 geometric-text">
                {threatStats ? threatStats.recentEventsCount + threatStats.suspiciousIPsCount : "07"}
              </div>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-400 cyber-font">Suspicious IPs</span>
                  <span className="text-red-400 font-bold">{threatStats?.suspiciousIPsCount || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 cyber-font">Recent Events</span>
                  <span className="text-orange-400 font-bold">{threatStats?.recentEventsCount || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 cyber-font">Zero-Trust Sessions</span>
                  <span className="text-yellow-400 font-bold">{threatStats?.activeSessionsCount || 0}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="holographic-card border border-green-500/30 data-glow micro-hover">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Lock className="w-6 h-6 text-green-400" style={{filter: 'drop-shadow(0 0 6px rgba(34, 197, 94, 0.5))'}} />
                  <span className="text-sm text-gray-400 tech-font">SYSTEM SECURITY</span>
                </div>
                <CheckCircle className="w-5 h-5 text-green-400" style={{filter: 'drop-shadow(0 0 4px rgba(34, 197, 94, 0.4))'}} />
              </div>
              <div className="text-3xl font-bold text-white mb-2 geometric-text">
                {complianceReports.length > 0 ? 
                  Math.round(complianceReports.reduce((sum: any, framework: any) => 
                    sum + (framework.controls?.length || 0), 0) / complianceReports.length * 10) + "%" : "86%"}
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                <div className="bg-gradient-to-r from-green-500 to-green-400 h-2 rounded-full chart-glow" 
                     style={{width: complianceReports.length > 0 ? 
                       Math.round(complianceReports.reduce((sum: any, framework: any) => 
                         sum + (framework.controls?.length || 0), 0) / complianceReports.length * 10) + "%" : '86%'}}></div>
              </div>
              <div className="flex justify-between text-xs mb-2">
                <span className="text-gray-400">0%</span>
                <span className="text-gray-400">100%</span>
              </div>
              <div className="verification-badge">
                SECURED
              </div>
            </CardContent>
          </Card>

          <Card className="holographic-card border border-cyan-500/30 chart-glow micro-hover">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Eye className="w-6 h-6 text-cyan-400" style={{filter: 'drop-shadow(0 0 6px rgba(34, 211, 238, 0.5))'}} />
                  <span className="text-sm text-gray-400 tech-font">AUTHENTICATION</span>
                </div>
                <div className="mfa-badge">
                  MFA ACTIVE
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400 cyber-font">Biometric Scan</span>
                  <div className="verification-badge">
                    VERIFIED
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400 cyber-font">Multi-Factor Auth</span>
                  <div className="encryption-indicator">
                    ACTIVE
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Lock className="w-4 h-4 text-green-400" style={{filter: 'drop-shadow(0 0 4px rgba(34, 197, 94, 0.4))'}} />
                    <span className="text-sm text-gray-400">Password</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Dynamic Threat Intelligence Feeds */}
        <Card className="mb-6 sm:mb-8 bg-surface/80 backdrop-blur-md border border-blue-500/30 cyber-glow">
          <CardHeader className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
              <CardTitle className="text-lg sm:text-xl font-bold text-white geometric-text">Threat Intelligence Feeds</CardTitle>
              <Tabs defaultValue="daily" className="w-full sm:w-48">
                <TabsList className="bg-gray-800">
                  <TabsTrigger value="daily">Daily</TabsTrigger>
                  <TabsTrigger value="weekly">Weekly</TabsTrigger>
                  <TabsTrigger value="monthly">Monthly</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>
          <CardContent>
            <ThreatFeedsDisplay />
          </CardContent>
        </Card>

        {/* Active Threats and Encryption Status */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {/* Active Threats List */}
          <Card className="bg-surface/80 backdrop-blur-md border border-red-500/30 cyber-glow">
            <CardHeader className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                <CardTitle className="text-lg sm:text-xl font-bold text-white">Active Threats</CardTitle>
                <div className="flex items-center space-x-2">
                  <Badge className="bg-red-500 text-white text-xs">Now</Badge>
                  <Button 
                    variant="link" 
                    className="text-cyan-400 text-xs sm:text-sm p-0 h-auto"
                    onClick={() => window.location.href = '/threats'}
                    data-testid="button-view-all-threats"
                  >
                    View all
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <div className="space-y-3 sm:space-y-4">
                <div className="border border-red-500/30 rounded-lg p-3 sm:p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                      <span className="font-medium text-red-400">Critical</span>
                    </div>
                    <span className="text-xs text-gray-400">Now</span>
                  </div>
                  <div className="text-sm text-white font-medium mb-1">Ransomware Attempt Detected</div>
                  <div className="text-xs text-gray-400">File encryption attempt blocked on server-03</div>
                </div>
                
                <div className="border border-red-500/30 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                      <span className="font-medium text-red-400">Critical</span>
                    </div>
                    <span className="text-xs text-gray-400">10m ago</span>
                  </div>
                  <div className="text-sm text-white font-medium mb-1">Brute Force Attack</div>
                  <div className="text-xs text-gray-400">Multiple failed login attempts from IP 192.168.1.45</div>
                </div>
                
                <div className="border border-orange-500/30 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span className="font-medium text-orange-400">High</span>
                    </div>
                    <span className="text-xs text-gray-400">25m ago</span>
                  </div>
                  <div className="text-sm text-white font-medium mb-1">Suspicious Network Activity</div>
                  <div className="text-xs text-gray-400">Unusual outbound traffic detected on port 445</div>
                </div>
                
                <div className="border border-orange-500/30 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span className="font-medium text-orange-400">High</span>
                    </div>
                    <span className="text-xs text-gray-400">42m ago</span>
                  </div>
                  <div className="text-sm text-white font-medium mb-1">Unauthorized Access Attempt</div>
                  <div className="text-xs text-gray-400">User tried to access restricted database from dev-workstation</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Encryption Status */}
          <Card className="bg-surface/80 backdrop-blur-md border border-green-500/30 cyber-glow">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-lg sm:text-xl font-bold text-white">Encryption Status</CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="bg-background/50 rounded-lg p-3 sm:p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-white font-medium">Database Encryption</span>
                    <Lock className="w-4 h-4 text-green-400" style={{filter: 'drop-shadow(0 0 4px rgba(34, 197, 94, 0.4))'}} />
                  </div>
                  <div className="text-xs text-gray-400 mb-2">AES-256 Active</div>
                  <Progress value={100} className="h-1" />
                </div>
                
                <div className="bg-background/50 rounded-lg p-3 sm:p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-white font-medium">File System Encryption</span>
                    <Lock className="w-4 h-4 text-green-400" style={{filter: 'drop-shadow(0 0 4px rgba(34, 197, 94, 0.4))'}} />
                  </div>
                  <div className="text-xs text-gray-400 mb-2">BitLocker Active</div>
                  <Progress value={100} className="h-1" />
                </div>
                
                <div className="bg-background/50 rounded-lg p-3 sm:p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-white font-medium">Network Encryption</span>
                    <Lock className="w-4 h-4 text-green-400" style={{filter: 'drop-shadow(0 0 4px rgba(34, 197, 94, 0.4))'}} />
                  </div>
                  <div className="text-xs text-gray-400 mb-2">TLS 1.3 Active</div>
                  <Progress value={100} className="h-1" />
                </div>
                
                <div className="bg-background/50 rounded-lg p-3 sm:p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-white font-medium">Email Encryption</span>
                    <AlertTriangle className="w-4 h-4 text-yellow-400" style={{filter: 'drop-shadow(0 0 4px rgba(251, 191, 36, 0.4))'}} />
                  </div>
                  <div className="text-xs text-gray-400 mb-2">PGP Partial</div>
                  <Progress value={65} className="h-1" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Authentication & Access Control and System Security */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Authentication & Access Control */}
          <Card className="bg-surface/80 backdrop-blur-md border border-cyan-500/30 cyber-glow">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-white">Authentication & Access Control</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-white font-medium">Multi-Factor Authentication</span>
                    <span className="text-green-400 text-sm">92% Compliance</span>
                  </div>
                  <div className="text-xs text-gray-400 mb-2">40/50 users have MFA enabled</div>
                  <Progress value={92} className="h-2" />
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-white font-medium">Permission Boundaries</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="bg-blue-900/30 rounded px-2 py-1 text-center">
                      <div className="text-blue-400">Admin: 5</div>
                    </div>
                    <div className="bg-purple-900/30 rounded px-2 py-1 text-center">
                      <div className="text-purple-400">Power: 12</div>
                    </div>
                    <div className="bg-gray-700 rounded px-2 py-1 text-center">
                      <div className="text-gray-400">Basic: 33</div>
                    </div>
                  </div>
                  <div className="mt-2 space-y-1 text-xs text-gray-400">
                    <div className="flex justify-between">
                      <span>Last permission review:</span>
                      <span>3 days ago</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Unusual access attempts:</span>
                      <span>4 in last 24h</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Privilege escalations:</span>
                      <span>1 pending approval</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-white font-medium">Anti-Phishing Protection</span>
                    <span className="text-green-400 text-sm">Active</span>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-blue-400">24</div>
                      <div className="text-xs text-gray-400">Emails Blocked</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-400">7</div>
                      <div className="text-xs text-gray-400">Links Sanitized</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-orange-400">2</div>
                      <div className="text-xs text-gray-400">User Reports</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* System Security Status */}
          <Card className="bg-surface/80 backdrop-blur-md border border-purple-500/30 cyber-glow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-bold text-white">System Security Status</CardTitle>
                <Button 
                  className="bg-cyan-600 hover:bg-cyan-700 text-white text-xs" 
                  size="sm"
                  onClick={async () => {
                    try {
                      toast({ 
                        title: "Starting Security Scan", 
                        description: "Initiating comprehensive security assessment..."
                      });
                      
                      const response = await fetch('/api/security/run-scan', { method: 'POST', headers: { 'Content-Type': 'application/json' } });
                      const result = await response.json();
                      
                      if (result.success) {
                        // Redirect to vulnerability monitoring page to show results
                        setTimeout(() => {
                          setLocation('/vulnerability-monitoring');
                        }, 1500);
                      } else {
                        toast({ 
                          title: "Scan Failed", 
                          description: "Failed to start security scan. Please try again.", 
                          variant: "destructive" 
                        });
                      }
                    } catch (error) {
                      toast({ 
                        title: "Scan Failed", 
                        description: "Failed to start security scan. Please try again.", 
                        variant: "destructive" 
                      });
                    }
                  }}
                >
                  Run Full Scan
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="grid grid-cols-6 gap-2 text-xs text-gray-400 border-b border-gray-700 pb-2">
                  <span>SYSTEM</span>
                  <span>LAST UPDATE</span>
                  <span>FIREWALL</span>
                  <span>ANTIVIRUS</span>
                  <span>VULNERABILITIES</span>
                  <span>STATUS</span>
                </div>
                
                <div className="grid grid-cols-6 gap-2 text-xs items-center">
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-cyan-400" style={{filter: 'drop-shadow(0 0 4px rgba(34, 211, 238, 0.4))'}} />
                    <span className="text-white">Main Server</span>
                  </div>
                  <span className="text-gray-400">Today, 09:45 AM</span>
                  <Badge className="bg-green-900/50 text-green-400 border-green-700 text-xs">Active</Badge>
                  <Badge className="bg-green-900/50 text-green-400 border-green-700 text-xs">Active</Badge>
                  <span className="text-green-400">0 detected</span>
                  <Badge className="bg-green-900/50 text-green-400 border-green-700 text-xs">Secure</Badge>
                </div>
                
                <div className="grid grid-cols-6 gap-2 text-xs items-center">
                  <div className="flex items-center space-x-2">
                    <BarChart className="w-4 h-4 text-cyan-400" style={{filter: 'drop-shadow(0 0 4px rgba(34, 211, 238, 0.4))'}} />
                    <span className="text-white">Database Server</span>
                  </div>
                  <span className="text-gray-400">Today, 08:30 AM</span>
                  <Badge className="bg-green-900/50 text-green-400 border-green-700 text-xs">Active</Badge>
                  <Badge className="bg-green-900/50 text-green-400 border-green-700 text-xs">Active</Badge>
                  <span className="text-green-400">0 detected</span>
                  <Badge className="bg-green-900/50 text-green-400 border-green-700 text-xs">Secure</Badge>
                </div>
                
                <div className="grid grid-cols-6 gap-2 text-xs items-center">
                  <div className="flex items-center space-x-2">
                    <Zap className="w-4 h-4 text-orange-400" style={{filter: 'drop-shadow(0 0 4px rgba(251, 146, 60, 0.4))'}} />
                    <span className="text-white">Network Gateway</span>
                  </div>
                  <span className="text-gray-400">{resolvedAlerts.has('critical-update') ? 'Today, 12:55 PM' : '3 days ago'}</span>
                  <Badge className="bg-green-900/50 text-green-400 border-green-700 text-xs">Active</Badge>
                  <Badge className={resolvedAlerts.has('critical-update') ? "bg-green-900/50 text-green-400 border-green-700 text-xs" : "bg-orange-900/50 text-orange-400 border-orange-700 text-xs"}>
                    {resolvedAlerts.has('critical-update') ? 'Updated' : 'Update Required'}
                  </Badge>
                  <span className={resolvedAlerts.has('critical-update') ? "text-green-400" : "text-orange-400"}>
                    {resolvedAlerts.has('critical-update') ? '0 detected' : '2 medium'}
                  </span>
                  <Badge className={resolvedAlerts.has('critical-update') ? "bg-green-900/50 text-green-400 border-green-700 text-xs" : "bg-orange-900/50 text-orange-400 border-orange-700 text-xs"}>
                    {resolvedAlerts.has('critical-update') ? 'Secure' : 'At Risk'}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-6 gap-2 text-xs items-center">
                  <div className="flex items-center space-x-2">
                    <Activity className="w-4 h-4 text-cyan-400" style={{filter: 'drop-shadow(0 0 4px rgba(34, 211, 238, 0.4))'}} />
                    <span className="text-white">Cloud Storage</span>
                  </div>
                  <span className="text-gray-400">Today, 10:15 AM</span>
                  <Badge className="bg-green-900/50 text-green-400 border-green-700 text-xs">Active</Badge>
                  <Badge className="bg-green-900/50 text-green-400 border-green-700 text-xs">Active</Badge>
                  <span className="text-green-400">0 detected</span>
                  <Badge className="bg-green-900/50 text-green-400 border-green-700 text-xs">Secure</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Security Alerts */}
        <Card className="bg-surface/80 backdrop-blur-md border border-red-500/30 cyber-glow mb-8">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-white">Security Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Critical Security Update Alert */}
              {!resolvedAlerts.has('critical-update') && (
                <div className="flex items-start space-x-3 p-3 bg-red-900/20 rounded-lg border border-red-700/50">
                  <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5" style={{filter: 'drop-shadow(0 0 4px rgba(248, 113, 113, 0.4))'}} />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-red-400">Critical Security Update</div>
                    <div className="text-xs text-gray-300 mt-1">Network Gateway requires immediate security patch for CVE-2023-32456</div>
                    <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white mt-2" onClick={async () => {
                      try {
                        await fetch('/api/security/apply-update', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ updateId: 'CVE-2023-32456' }) });
                        toast({ title: "Security Update Applied", description: "Critical security update has been successfully applied." });
                        resolveAlert('critical-update');
                      } catch (error) {
                        toast({ title: "Update Failed", description: "Failed to apply security update. Please try again.", variant: "destructive" });
                      }
                    }}>Apply Now</Button>
                  </div>
                </div>
              )}
              
              {/* MFA Not Configured Alert */}
              {!resolvedAlerts.has('mfa-not-configured') && (
                <div className="flex items-start space-x-3 p-3 bg-yellow-900/20 rounded-lg border border-yellow-700/50">
                  <Shield className="w-5 h-5 text-yellow-400 mt-0.5" style={{filter: 'drop-shadow(0 0 4px rgba(251, 191, 36, 0.4))'}} />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-yellow-400">MFA Not Configured</div>
                    <div className="text-xs text-gray-300 mt-1">4 users have not enabled multi-factor authentication</div>
                    <Button size="sm" variant="outline" className="border-yellow-600 text-yellow-400 hover:bg-yellow-900/50 mt-2" onClick={async () => {
                      try {
                        await fetch('/api/users/send-mfa-reminder', { method: 'POST', headers: { 'Content-Type': 'application/json' } });
                        toast({ title: "MFA Reminders Sent", description: "Multi-factor authentication reminders sent to all users." });
                        resolveAlert('mfa-not-configured');
                      } catch (error) {
                        toast({ title: "Failed to Send", description: "Failed to send MFA reminders. Please try again.", variant: "destructive" });
                      }
                    }}>Send Reminder</Button>
                  </div>
                </div>
              )}
              
              {/* Security Scan Complete Alert - This one stays as informational */}
              <div className="flex items-start space-x-3 p-3 bg-blue-900/20 rounded-lg border border-blue-700/50">
                <TrendingUp className="w-5 h-5 text-cyan-400 mt-0.5" style={{filter: 'drop-shadow(0 0 4px rgba(34, 211, 238, 0.4))'}} />
                <div className="flex-1">
                  <div className="text-sm font-medium text-blue-400">Security Scan Complete</div>
                  <div className="text-xs text-gray-300 mt-1">Weekly security scan completed. 2 medium vulnerabilities detected.</div>
                  <Button size="sm" variant="outline" className="border-blue-600 text-blue-400 hover:bg-blue-900/50 mt-2" onClick={() => window.location.href = '/reports'}>View Report</Button>
                </div>
              </div>
              
              {/* Show success message when all critical alerts are resolved */}
              {resolvedAlerts.has('critical-update') && resolvedAlerts.has('mfa-not-configured') && (
                <div className="flex items-start space-x-3 p-3 bg-green-900/20 rounded-lg border border-green-700/50">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" style={{filter: 'drop-shadow(0 0 4px rgba(34, 197, 94, 0.4))'}} />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-green-400">All Critical Issues Resolved</div>
                    <div className="text-xs text-gray-300 mt-1">Your security posture has been improved. All critical alerts have been addressed.</div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Original sections with enhanced styling */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Real-time AI Threat Detection */}
          <Card className="bg-surface/80 backdrop-blur-md border border-cyan-500/30 cyber-glow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-bold">Real-time Threat Detection</CardTitle>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-interactive hover:text-orange-400"
                  onClick={() => setLocation('/threat-detection')}
                  data-testid="button-view-threat-detection"
                >
                  <Eye className="w-4 h-4 text-cyan-400" style={{filter: 'drop-shadow(0 0 4px rgba(34, 211, 238, 0.4))'}} />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="relative h-64 bg-background rounded-lg p-4 mb-4">
                <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                  <span>Threats Detected: 24h</span>
                  <Badge variant="outline" className="text-success border-success">All Blocked</Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 bg-surface/50 rounded">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-critical rounded-full threat-pulse"></div>
                      <span className="text-sm">Malware Attempt</span>
                    </div>
                    <span className="text-xs text-gray-400">2 min ago</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-surface/50 rounded">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-interactive rounded-full"></div>
                      <span className="text-sm">Phishing Email</span>
                    </div>
                    <span className="text-xs text-gray-400">15 min ago</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-surface/50 rounded">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-success rounded-full"></div>
                      <span className="text-sm">Login Anomaly</span>
                    </div>
                    <span className="text-xs text-gray-400">1 hour ago</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">
                  AI Detection Rate: <span className="text-success font-medium">98.7%</span>
                </span>
                <Button 
                  variant="link" 
                  className="text-interactive text-sm"
                  onClick={() => window.location.href = '/threats'}
                  data-testid="button-view-all-threats-2"
                >
                  View All Threats
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* AI-Powered Network Activity */}
          <Card className="bg-surface/80 backdrop-blur-md border border-green-500/30 cyber-glow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-bold">Network Activity</CardTitle>
                <div className="flex space-x-2">
                  <Badge variant="default" className="bg-interactive text-white">Live</Badge>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="bg-surface-light text-gray-400 hover:text-white h-6 px-2 text-xs"
                    onClick={() => setLocation('/threats')}
                    data-testid="button-network-24h"
                  >
                    View 24h
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="relative h-64 bg-background rounded-lg p-4 mb-4">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-success">{stats?.networkStats?.bandwidth || "2.1 GB/s"}</div>
                    <div className="text-xs text-gray-400">Bandwidth</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-interactive">{stats?.networkStats?.connections || 847}</div>
                    <div className="text-xs text-gray-400">Active Connections</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-secondary">{stats?.networkStats?.blocked || 12}</div>
                    <div className="text-xs text-gray-400">Blocked Today</div>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Inbound Traffic</span>
                  <Badge variant="outline" className="text-success border-success">Normal</Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Outbound Traffic</span>
                  <Badge variant="outline" className="text-success border-success">Normal</Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Firewall Status</span>
                  <Badge variant="outline" className="text-success border-success">Active</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* AI-Secured File Sharing */}
        <Card className="bg-surface/80 backdrop-blur-md border border-blue-500/30 cyber-glow mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-bold">Secure File Sharing</CardTitle>
              <Button 
                className="bg-interactive hover:bg-orange-600" 
                onClick={() => setLocation('/file-sharing')}
                data-testid="share-file-button"
              >
                <FileText className="w-4 h-4 mr-2 text-gray-400" style={{filter: 'drop-shadow(0 0 4px rgba(156, 163, 175, 0.4))'}} />
                Share New File
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* File Upload Section */}
              <div 
                className={`bg-background rounded-lg p-6 border-2 border-dashed transition-colors cursor-pointer ${
                  isDragging 
                    ? 'border-interactive bg-interactive/5' 
                    : 'border-surface-light hover:border-interactive'
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  className="hidden"
                  onChange={handleFileSelect}
                  accept=".pdf,.doc,.docx,.xls,.xlsx,.txt,.jpg,.jpeg,.png,.gif"
                />
                <div className="text-center">
                  <div className="w-16 h-16 bg-interactive/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FileText className="w-6 h-6 text-orange-400" style={{filter: 'drop-shadow(0 0 6px rgba(251, 146, 60, 0.5))'}} />
                  </div>
                  <h4 className="font-medium mb-2">
                    {isDragging ? 'Drop files here' : 'Drag and drop files or click to browse'}
                  </h4>
                  <p className="text-gray-400 text-sm mb-4">
                    All files are automatically encrypted with AES-256 and classified for sensitive data
                  </p>
                  <Button 
                    variant="outline" 
                    className="bg-surface hover:bg-surface-light" 
                    onClick={(e) => {
                      e.stopPropagation();
                      fileInputRef.current?.click();
                    }}
                    data-testid="browse-files-button"
                    disabled={uploadFileMutation.isPending}
                  >
                    {uploadFileMutation.isPending ? 'Uploading...' : 'Browse Files'}
                  </Button>
                </div>
              </div>

              {/* Recent Files */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium">Recent Secure Files</h4>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setLocation('/file-sharing')}
                    className="text-xs text-cyan-400 hover:text-cyan-300"
                  >
                    View All
                  </Button>
                </div>
                <div className="space-y-3 max-h-80 overflow-y-auto">
                  {/* Recently uploaded files */}
                  {uploadedFiles.slice(0, 2).map((file, index) => (
                    <div key={file.id || index} className="flex items-center justify-between p-3 bg-background rounded-lg border border-blue-500/20">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                          <FileText className="w-4 h-4 text-blue-400" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{file.name}</p>
                          <p className="text-gray-400 text-xs">
                            {(file.size / 1024 / 1024).toFixed(1)} MB • Just uploaded
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="text-blue-400 border-blue-400 text-xs">
                          {file.classification || 'Classifying...'}
                        </Badge>
                        <Badge variant="outline" className="text-success border-success text-xs">
                          AES-256
                        </Badge>
                      </div>
                    </div>
                  ))}

                  {/* Files from API */}
                  {recentFiles.slice(0, 3 - uploadedFiles.length).map((file: any, index: number) => {
                    const getClassificationColor = (classification: string) => {
                      switch (classification?.toLowerCase()) {
                        case 'confidential':
                        case 'restricted':
                          return 'text-red-400 border-red-400';
                        case 'internal':
                          return 'text-yellow-400 border-yellow-400';
                        case 'public':
                          return 'text-green-400 border-green-400';
                        default:
                          return 'text-blue-400 border-blue-400';
                      }
                    };

                    const getIcon = (classification: string) => {
                      switch (classification?.toLowerCase()) {
                        case 'confidential':
                        case 'restricted':
                          return <AlertTriangle className="w-4 h-4 text-red-400" />;
                        case 'internal':
                          return <Lock className="w-4 h-4 text-yellow-400" />;
                        case 'public':
                          return <CheckCircle className="w-4 h-4 text-green-400" />;
                        default:
                          return <FileText className="w-4 h-4 text-blue-400" />;
                      }
                    };

                    return (
                      <div key={file.id || index} className="flex items-center justify-between p-3 bg-background rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                            {getIcon(file.classification)}
                          </div>
                          <div>
                            <p className="font-medium text-sm">{file.name}</p>
                            <p className="text-gray-400 text-xs">
                              {file.size ? `${(file.size / 1024 / 1024).toFixed(1)} MB • ` : ''}
                              {file.uploadedAt ? new Date(file.uploadedAt).toLocaleDateString() : 'Recently uploaded'}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className={`text-xs ${getClassificationColor(file.classification)}`}>
                            {file.classification || 'Public'}
                          </Badge>
                          <Badge variant="outline" className="text-success border-success text-xs">
                            Encrypted
                          </Badge>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="text-gray-400 hover:text-white"
                            onClick={() => setLocation('/file-sharing')}
                            data-testid={`open-file-sharing-${index}`}
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    );
                  })}

                  {/* Show message if no files */}
                  {uploadedFiles.length === 0 && recentFiles.length === 0 && (
                    <div className="text-center py-6 text-gray-500">
                      <FileText className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">No files uploaded yet</p>
                      <p className="text-xs">Upload a file to see automatic classification</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>


        {/* Platform Intelligence Overview */}
        <div className="mb-8">
          <IntelligenceOverview />
        </div>

        {/* Cambridge-Style Analytics */}
        <div className="mb-8">
          <CambridgeAnalytics />
        </div>

        {/* Cypher AI Assistant Dashboard Widget */}
        <div className="mb-8">
          <CypherDashboardWidget enabled={true} compact={false} />
        </div>

        {/* Compliance Health Progress Indicator */}
        <ComplianceHealthIndicator />
      </main>
    </div>
  );
}
