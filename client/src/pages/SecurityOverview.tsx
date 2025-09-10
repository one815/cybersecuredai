import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Shield, 
  AlertTriangle, 
  Eye, 
  Activity, 
  TrendingUp, 
  TrendingDown,
  Users, 
  Lock, 
  Database,
  Network,
  Server,
  CheckCircle,
  XCircle,
  Clock,
  Target,
  Zap,
  Brain,
  BarChart3,
  Globe,
  Radar
} from "lucide-react";
import {
  Enhanced4DBrainIcon,
  Enhanced4DNetworkIcon,
  CustomTargetIcon,
  CustomShieldIcon,
  Enhanced4DShieldIcon,
  Enhanced4DEyeIcon,
  Enhanced4DActivityIcon
} from "@/components/LazyCustomIcons";
import { useAuth } from "@/hooks/useAuth";

interface SecurityMetric {
  name: string;
  value: number | string;
  status: "good" | "warning" | "critical";
  trend: "up" | "down" | "stable";
  change?: number;
}

export default function SecurityOverview() {
  const { user } = useAuth();
  
  const { data: dashboardStats = {} } = useQuery<any>({
    queryKey: ["/api/dashboard/stats"],
    refetchInterval: 30000,
  });

  const { data: threatStats = {} } = useQuery<any>({
    queryKey: ["/api/threats/stats"],
    refetchInterval: 30000,
  });

  const { data: complianceHealth = {} } = useQuery<any>({
    queryKey: ["/api/compliance/health"],
    refetchInterval: 60000,
  });

  const { data: aiAnalytics = {} } = useQuery<any>({
    queryKey: ["/api/ai/analytics"],
    refetchInterval: 30000,
  });

  const { data: users = [] } = useQuery<any[]>({
    queryKey: ["/api/users"],
    refetchInterval: 300000, // 5 minutes
  });

  const { data: threats = [] } = useQuery<any[]>({
    queryKey: ["/api/threats"],
    refetchInterval: 30000,
  });

  const securityMetrics: SecurityMetric[] = [
    {
      name: "Threat Detection Rate",
      value: `${aiAnalytics?.systemMetrics?.threatDetectionRate || 95}%`,
      status: (aiAnalytics?.systemMetrics?.threatDetectionRate || 95) > 90 ? "good" : "warning",
      trend: "up",
      change: 2.3
    },
    {
      name: "Active Incidents",
      value: dashboardStats?.activeIncidents || 0,
      status: (dashboardStats?.activeIncidents || 0) === 0 ? "good" : "warning",
      trend: "stable"
    },
    {
      name: "System Uptime",
      value: "99.7%",
      status: "good",
      trend: "stable"
    },
    {
      name: "MFA Adoption",
      value: `${Math.round(((users?.filter(u => u.mfaEnabled)?.length || 0) / (users?.length || 1)) * 100)}%`,
      status: ((users?.filter(u => u.mfaEnabled)?.length || 0) / (users?.length || 1)) * 100 > 80 ? "good" : "warning",
      trend: "up",
      change: 12
    },
    {
      name: "Compliance Score",
      value: `${complianceHealth?.overallHealthScore || 85}%`,
      status: (complianceHealth?.overallHealthScore || 85) > 80 ? "good" : "warning",
      trend: "up",
      change: 5
    },
    {
      name: "Threat Intelligence Feeds",
      value: "Active",
      status: "good",
      trend: "stable"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "good": return "text-green-400 border-green-500/50";
      case "warning": return "text-yellow-400 border-yellow-500/50";
      case "critical": return "text-red-400 border-red-500/50";
      default: return "text-gray-400 border-gray-500/50";
    }
  };

  const getTrendIcon = (trend: string, change?: number) => {
    if (trend === "up") return <TrendingUp className="w-4 h-4 text-green-400" />;
    if (trend === "down") return <TrendingDown className="w-4 h-4 text-red-400" />;
    return <Enhanced4DActivityIcon className="w-4 h-4 text-gray-400" size={16} />;
  };

  return (
    <div className="min-h-screen bg-background text-text">
      <div className="container mx-auto p-4 sm:p-6 space-y-4 sm:space-y-6">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-white flex items-center">
              <Enhanced4DShieldIcon className="w-8 h-8 mr-3 text-cyan-400" size={32} />
              Security Overview
            </h1>
            <p className="text-gray-300 mt-2">Comprehensive security posture and threat landscape analysis</p>
          </div>
          <div className="flex items-center space-x-3">
            <Badge variant="outline" className="text-cyan-400 border-cyan-500/50">
              <Clock className="w-3 h-3 mr-1" />
              Last Updated: {new Date().toLocaleTimeString()}
            </Badge>
          </div>
        </div>

        {/* Key Security Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-8">
          {securityMetrics.map((metric, index) => (
            <Card key={index} className="holographic-card border border-surface-light/30 bg-surface/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-gray-300">{metric.name}</h3>
                  {getTrendIcon(metric.trend, metric.change)}
                </div>
                <div className="flex items-center justify-between">
                  <span className={`text-2xl font-bold ${getStatusColor(metric.status)}`}>
                    {metric.value}
                  </span>
                  {metric.change && (
                    <span className="text-xs text-green-400">
                      +{metric.change}%
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Security Status Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          
          {/* Real-time Threat Status */}
          <Card className="holographic-card border border-red-500/30">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Radar className="w-5 h-5 mr-2 text-red-400" />
                Real-time Threat Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Threat Level</span>
                  <Badge className={`${
                    (dashboardStats?.threatLevel || "LOW") === "HIGH" ? "bg-red-600" :
                    (dashboardStats?.threatLevel || "LOW") === "MEDIUM" ? "bg-yellow-600" : "bg-green-600"
                  } text-white`}>
                    {dashboardStats?.threatLevel || "LOW"}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Active Threats</span>
                  <span className="text-red-400 font-semibold">{threats?.length || 0}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Incidents Today</span>
                  <span className="text-yellow-400 font-semibold">{dashboardStats?.activeIncidents || 0}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">AI Detection Accuracy</span>
                  <span className="text-cyan-400 font-semibold">{aiAnalytics?.threatDetection?.mlModelAccuracy || 95}%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* System Health */}
          <Card className="holographic-card border border-green-500/30">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Enhanced4DActivityIcon className="w-5 h-5 mr-2 text-green-400" size={20} />
                System Health & Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">System Uptime</span>
                    <span className="text-green-400 font-semibold">99.7%</span>
                  </div>
                  <Progress value={99.7} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Security Services</span>
                    <span className="text-green-400 font-semibold">8/8 Online</span>
                  </div>
                  <Progress value={100} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Database Health</span>
                    <span className="text-green-400 font-semibold">Optimal</span>
                  </div>
                  <Progress value={95} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Security Dashboard Tabs */}
        <Tabs defaultValue="threats" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-surface border border-surface-light">
            <TabsContent value="threats" className="border-0">
              <Button variant="ghost" className="text-white">
                <AlertTriangle className="w-4 h-4 mr-2" />
                Threats
              </Button>
            </TabsContent>
            <TabsContent value="users" className="border-0">
              <Button variant="ghost" className="text-white">
                <Users className="w-4 h-4 mr-2" />
                Users
              </Button>
            </TabsContent>
            <TabsContent value="compliance" className="border-0">
              <Button variant="ghost" className="text-white">
                <CheckCircle className="w-4 h-4 mr-2" />
                Compliance
              </Button>
            </TabsContent>
            <TabsContent value="infrastructure" className="border-0">
              <Button variant="ghost" className="text-white">
                <Server className="w-4 h-4 mr-2" />
                Infrastructure
              </Button>
            </TabsContent>
          </TabsList>

          <TabsContent value="threats" className="mt-6">
            <Card className="border border-surface-light bg-surface/50">
              <CardHeader>
                <CardTitle className="text-white">Threat Intelligence Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-400">{threatStats?.suspiciousIPsCount || 45}</div>
                    <div className="text-sm text-gray-400">Suspicious IPs Blocked</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-400">{threatStats?.recentEventsCount || 23}</div>
                    <div className="text-sm text-gray-400">Recent Security Events</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400">{threatStats?.trustedDevicesCount || 156}</div>
                    <div className="text-sm text-gray-400">Trusted Devices</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="mt-6">
            <Card className="border border-surface-light bg-surface/50">
              <CardHeader>
                <CardTitle className="text-white">User Security Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-cyan-400">{users?.length || 0}</div>
                    <div className="text-sm text-gray-400">Total Users</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400">{users?.filter(u => u.mfaEnabled)?.length || 0}</div>
                    <div className="text-sm text-gray-400">MFA Enabled</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400">{users?.filter(u => u.isActive)?.length || 0}</div>
                    <div className="text-sm text-gray-400">Active Users</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="compliance" className="mt-6">
            <Card className="border border-surface-light bg-surface/50">
              <CardHeader>
                <CardTitle className="text-white">Compliance Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400">{complianceHealth?.overallHealthScore || 85}%</div>
                    <div className="text-sm text-gray-400">Overall Health Score</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400">3</div>
                    <div className="text-sm text-gray-400">Frameworks Monitored</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-400">{complianceHealth?.riskScore || 15}</div>
                    <div className="text-sm text-gray-400">Risk Score</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="infrastructure" className="mt-6">
            <Card className="border border-surface-light bg-surface/50">
              <CardHeader>
                <CardTitle className="text-white">Infrastructure Security</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400">8/8</div>
                    <div className="text-sm text-gray-400">Security Services Online</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-cyan-400">99.7%</div>
                    <div className="text-sm text-gray-400">Network Uptime</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400">0</div>
                    <div className="text-sm text-gray-400">Critical Vulnerabilities</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Quick Actions */}
        <Card className="border border-surface-light bg-surface/50">
          <CardHeader>
            <CardTitle className="text-white">Quick Security Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button variant="outline" className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/20" data-testid="button-scan-threats">
                <Enhanced4DEyeIcon className="w-4 h-4 mr-2" size={16} />
                Scan for Threats
              </Button>
              <Button variant="outline" className="border-blue-500/50 text-blue-400 hover:bg-blue-500/20" data-testid="button-generate-report">
                <BarChart3 className="w-4 h-4 mr-2" />
                Generate Report
              </Button>
              <Button variant="outline" className="border-green-500/50 text-green-400 hover:bg-green-500/20" data-testid="button-backup-config">
                <Database className="w-4 h-4 mr-2" />
                Backup Config
              </Button>
              <Button variant="outline" className="border-purple-500/50 text-purple-400 hover:bg-purple-500/20" data-testid="button-ai-analysis">
                <Enhanced4DBrainIcon className="w-4 h-4 mr-2" size={16} />
                AI Analysis
              </Button>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}