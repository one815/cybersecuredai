import { useQuery } from "@tanstack/react-query";
import { DashboardCard } from "@/components/DashboardCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ComplianceHealthIndicator from "@/components/ComplianceHealthIndicator";
import BadgeDisplay from "@/components/BadgeDisplay";
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
  Brain
} from "lucide-react";

export default function Dashboard() {
  const { data: stats, isLoading } = useQuery<DashboardStats>({
    queryKey: ["/api/dashboard/stats"],
  });

  const { data: complianceReports = [] } = useQuery<any[]>({
    queryKey: ["/api/compliance/frameworks"],
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
      {/* Enhanced Header with Unified Layout */}
      <header className="holographic-card backdrop-blur-md border-b border-surface-light p-6 chart-glow">
        <div className="flex items-center justify-between max-w-full">
          {/* Left Section - Main Title and Status */}
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center floating-3d text-white text-2xl">
                <Shield className="w-6 h-6" style={{filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.3))'}} />
              </div>
              <div>
                <h1 className="text-2xl font-bold geometric-text bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent flex items-center space-x-2">
                  <span>AI SECURITY COMMAND CENTER</span>
                  <Activity className="w-5 h-5 text-cyan-400" style={{filter: 'drop-shadow(0 0 4px rgba(34, 211, 238, 0.5))'}} />
                </h1>
                <div className="text-gray-400 text-sm cyber-font flex items-center space-x-3">
                  <span>Real-time AI threat monitoring and autonomous security automation</span>
                  <div className="live-indicator text-xs">
                    AI NEURAL NETWORK ACTIVE
                  </div>
                </div>
              </div>
            </div>
            
            {/* Security Status Indicators */}
            <div className="hidden xl:flex items-center space-x-3">
              <div className="encryption-indicator text-xs">
                QUANTUM ENCRYPTED
              </div>
              <div className="verification-badge text-xs">
                BIOMETRIC VERIFIED
              </div>
              <div className="security-protocol text-xs">
                ZERO-TRUST ACTIVE
              </div>
            </div>
          </div>

          {/* Right Section - Auth, Search, and Actions */}
          <div className="flex items-center space-x-4">
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
      <main className="p-4 sm:p-6">
        {/* Enhanced Security Overview Cards with AI Metrics */}
        {/* Badge Achievement Section */}
        {userBadges && userBadges.totalBadges > 0 && (
          <div className="mb-8">
            <BadgeDisplay userBadges={userBadges} limit={5} variant="card" />
          </div>
        )}

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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="holographic-card border border-blue-500/30 data-glow micro-hover floating-3d">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Shield className="w-6 h-6 text-yellow-400" style={{filter: 'drop-shadow(0 0 6px rgba(251, 191, 36, 0.5))'}} />
                  <span className="text-sm text-gray-400 tech-font">THREAT LEVEL</span>
                </div>
                <TrendingUp className="w-5 h-5 text-yellow-400" style={{filter: 'drop-shadow(0 0 4px rgba(251, 191, 36, 0.4))'}} />
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
            <CardContent className="p-6">
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

        {/* Enhanced Threat Activity Chart */}
        <Card className="mb-8 bg-surface/80 backdrop-blur-md border border-blue-500/30 cyber-glow">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-bold text-white geometric-text">Threat Activity</CardTitle>
              <Tabs defaultValue="daily" className="w-48">
                <TabsList className="bg-gray-800">
                  <TabsTrigger value="daily">Daily</TabsTrigger>
                  <TabsTrigger value="weekly">Weekly</TabsTrigger>
                  <TabsTrigger value="monthly">Monthly</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-background/50 rounded-lg p-4 mb-4 relative overflow-hidden">
              {/* Simulated Chart */}
              <div className="absolute inset-0 p-4">
                <div className="grid grid-cols-12 gap-1 h-full items-end">
                  {[3, 2, 4, 1.5, 2.8, 3.5, 2.2, 4.1, 2.9, 3.8, 2.1, 3.6].map((height, index) => (
                    <div key={index} className="relative">
                      <div 
                        className="bg-gradient-to-t from-red-600 to-red-400 rounded-t opacity-70" 
                        style={{height: `${height * 20}%`}}
                      ></div>
                      <div 
                        className="bg-gradient-to-t from-orange-600 to-orange-400 rounded-t opacity-70 mt-1" 
                        style={{height: `${(height + 1) * 15}%`}}
                      ></div>
                      <div 
                        className="bg-gradient-to-t from-cyan-600 to-cyan-400 rounded-t opacity-70 mt-1" 
                        style={{height: `${(height + 2) * 25}%`}}
                      ></div>
                    </div>
                  ))}
                </div>
                <div className="absolute bottom-4 left-4 text-xs text-gray-400">
                  00:00
                </div>
                <div className="absolute bottom-4 right-4 text-xs text-gray-400">
                  Now
                </div>
              </div>
              {/* Legend */}
              <div className="absolute top-4 right-4 space-y-1">
                <div className="flex items-center space-x-2 text-xs">
                  <div className="w-3 h-3 bg-red-500 rounded"></div>
                  <span className="text-gray-400">Critical Threats</span>
                </div>
                <div className="flex items-center space-x-2 text-xs">
                  <div className="w-3 h-3 bg-orange-500 rounded"></div>
                  <span className="text-gray-400">High Threats</span>
                </div>
                <div className="flex items-center space-x-2 text-xs">
                  <div className="w-3 h-3 bg-cyan-500 rounded"></div>
                  <span className="text-gray-400">Medium Threats</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Active Threats and Encryption Status */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Active Threats List */}
          <Card className="bg-surface/80 backdrop-blur-md border border-red-500/30 cyber-glow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-bold text-white">Active Threats</CardTitle>
                <div className="flex items-center space-x-2">
                  <Badge className="bg-red-500 text-white">Now</Badge>
                  <Button variant="link" className="text-cyan-400">View all threats</Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border border-red-500/30 rounded-lg p-4">
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
            <CardHeader>
              <CardTitle className="text-xl font-bold text-white">Encryption Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-background/50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-white font-medium">Database Encryption</span>
                    <Lock className="w-4 h-4 text-green-400" style={{filter: 'drop-shadow(0 0 4px rgba(34, 197, 94, 0.4))'}} />
                  </div>
                  <div className="text-xs text-gray-400 mb-2">AES-256 Active</div>
                  <Progress value={100} className="h-1" />
                </div>
                
                <div className="bg-background/50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-white font-medium">File System Encryption</span>
                    <Lock className="w-4 h-4 text-green-400" style={{filter: 'drop-shadow(0 0 4px rgba(34, 197, 94, 0.4))'}} />
                  </div>
                  <div className="text-xs text-gray-400 mb-2">BitLocker Active</div>
                  <Progress value={100} className="h-1" />
                </div>
                
                <div className="bg-background/50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-white font-medium">Network Encryption</span>
                    <Lock className="w-4 h-4 text-green-400" style={{filter: 'drop-shadow(0 0 4px rgba(34, 197, 94, 0.4))'}} />
                  </div>
                  <div className="text-xs text-gray-400 mb-2">TLS 1.3 Active</div>
                  <Progress value={100} className="h-1" />
                </div>
                
                <div className="bg-background/50 rounded-lg p-4">
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
                <Button className="bg-cyan-600 hover:bg-cyan-700 text-white text-xs" size="sm">
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
                  <span className="text-gray-400">3 days ago</span>
                  <Badge className="bg-green-900/50 text-green-400 border-green-700 text-xs">Active</Badge>
                  <Badge className="bg-orange-900/50 text-orange-400 border-orange-700 text-xs">Update Required</Badge>
                  <span className="text-orange-400">2 medium</span>
                  <Badge className="bg-orange-900/50 text-orange-400 border-orange-700 text-xs">At Risk</Badge>
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
              <div className="flex items-start space-x-3 p-3 bg-red-900/20 rounded-lg border border-red-700/50">
                <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5" style={{filter: 'drop-shadow(0 0 4px rgba(248, 113, 113, 0.4))'}} />
                <div className="flex-1">
                  <div className="text-sm font-medium text-red-400">Critical Security Update</div>
                  <div className="text-xs text-gray-300 mt-1">Network Gateway requires immediate security patch for CVE-2023-32456</div>
                  <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white mt-2">Apply Now</Button>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 p-3 bg-yellow-900/20 rounded-lg border border-yellow-700/50">
                <Shield className="w-5 h-5 text-yellow-400 mt-0.5" style={{filter: 'drop-shadow(0 0 4px rgba(251, 191, 36, 0.4))'}} />
                <div className="flex-1">
                  <div className="text-sm font-medium text-yellow-400">MFA Not Configured</div>
                  <div className="text-xs text-gray-300 mt-1">4 users have not enabled multi-factor authentication</div>
                  <Button size="sm" variant="outline" className="border-yellow-600 text-yellow-400 hover:bg-yellow-900/50 mt-2">Send Reminder</Button>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 p-3 bg-blue-900/20 rounded-lg border border-blue-700/50">
                <TrendingUp className="w-5 h-5 text-cyan-400 mt-0.5" style={{filter: 'drop-shadow(0 0 4px rgba(34, 211, 238, 0.4))'}} />
                <div className="flex-1">
                  <div className="text-sm font-medium text-blue-400">Security Scan Complete</div>
                  <div className="text-xs text-gray-300 mt-1">Weekly security scan completed. 2 medium vulnerabilities detected.</div>
                  <Button size="sm" variant="outline" className="border-blue-600 text-blue-400 hover:bg-blue-900/50 mt-2">View Report</Button>
                </div>
              </div>
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
                <Button variant="ghost" size="icon" className="text-interactive hover:text-orange-400">
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
                <Button variant="link" className="text-interactive text-sm">View All Threats</Button>
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
                  <Badge variant="outline" className="bg-surface-light text-gray-400">24h</Badge>
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
              <Button className="bg-interactive hover:bg-orange-600" data-testid="share-file-button">
                <FileText className="w-4 h-4 mr-2 text-gray-400" style={{filter: 'drop-shadow(0 0 4px rgba(156, 163, 175, 0.4))'}} />
                Share New File
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* File Upload Section */}
              <div className="bg-background rounded-lg p-6 border-2 border-dashed border-surface-light hover:border-interactive transition-colors">
                <div className="text-center">
                  <div className="w-16 h-16 bg-interactive/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FileText className="w-6 h-6 text-orange-400" style={{filter: 'drop-shadow(0 0 6px rgba(251, 146, 60, 0.5))'}} />
                  </div>
                  <h4 className="font-medium mb-2">Drag and drop files or click to browse</h4>
                  <p className="text-gray-400 text-sm mb-4">All files are automatically encrypted with AES-256</p>
                  <Button variant="outline" className="bg-surface hover:bg-surface-light" data-testid="browse-files-button">
                    Browse Files
                  </Button>
                </div>
              </div>

              {/* Recent Files */}
              <div>
                <h4 className="font-medium mb-4">Recent Secure Files</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-background rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-critical/20 rounded-lg flex items-center justify-center">
                        <AlertTriangle className="w-4 h-4 text-red-400" style={{filter: 'drop-shadow(0 0 4px rgba(248, 113, 113, 0.4))'}} />
                      </div>
                      <div>
                        <p className="font-medium text-sm">Q2_Financial_Report.pdf</p>
                        <p className="text-gray-400 text-xs">2.4 MB • Uploaded today</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="text-success border-success">AES-256</Badge>
                      <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                        <ExternalLink className="w-4 h-4 text-gray-400" style={{filter: 'drop-shadow(0 0 4px rgba(156, 163, 175, 0.4))'}} />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-background rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-green-400" style={{filter: 'drop-shadow(0 0 4px rgba(34, 197, 94, 0.4))'}} />
                      </div>
                      <div>
                        <p className="font-medium text-sm">Security_Protocol_v2.docx</p>
                        <p className="text-gray-400 text-xs">1.2 MB • Uploaded 3 days ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="text-interactive border-interactive">Protected</Badge>
                      <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                        <ExternalLink className="w-4 h-4 text-gray-400" style={{filter: 'drop-shadow(0 0 4px rgba(156, 163, 175, 0.4))'}} />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Compliance Health Progress Indicator */}
        <ComplianceHealthIndicator />
      </main>
    </div>
  );
}
