import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Shield, 
  AlertTriangle, 
  TrendingUp, 
  TrendingDown,
  Users, 
  Database,
  Server,
  CheckCircle,
  XCircle,
  Clock,
  Target,
  Zap,
  Brain,
  BarChart3,
  Globe,
  Activity,
  Eye,
  Lock,
  Network,
  FileText,
  DollarSign,
  Calendar
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

interface ExecutiveMetric {
  title: string;
  value: string | number;
  change: string;
  trend: "up" | "down" | "stable";
  status: "good" | "warning" | "critical";
  description: string;
}

export default function SecurityDashboard() {
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
    refetchInterval: 300000,
  });

  const { data: incidents = [] } = useQuery<any[]>({
    queryKey: ["/api/incidents"],
    refetchInterval: 60000,
  });

  const { data: threatData = [] } = useQuery<any[]>({
    queryKey: ["/api/threats"],
    refetchInterval: 30000,
  });

  const executiveMetrics: ExecutiveMetric[] = [
    {
      title: "Overall Security Posture",
      value: `${Math.round((complianceHealth?.overallHealthScore || 85) * 0.95)}%`,
      change: "+3.2%",
      trend: "up",
      status: (complianceHealth?.overallHealthScore || 85) > 80 ? "good" : "warning",
      description: "Comprehensive security health across all systems"
    },
    {
      title: "Risk Reduction",
      value: "73%",
      change: "+12%",
      trend: "up", 
      status: "good",
      description: "Risk reduction achieved through AI-powered threat prevention"
    },
    {
      title: "Mean Time to Detection",
      value: "4.3 min",
      change: "-2.1 min",
      trend: "down",
      status: "good",
      description: "Average time to detect security threats"
    },
    {
      title: "Security Investment ROI",
      value: "340%",
      change: "+45%",
      trend: "up",
      status: "good", 
      description: "Return on security investment over past 12 months"
    },
    {
      title: "Compliance Score",
      value: `${complianceHealth?.overallHealthScore || 85}%`,
      change: "+5%",
      trend: "up",
      status: (complianceHealth?.overallHealthScore || 85) > 80 ? "good" : "warning",
      description: "Regulatory compliance across all frameworks"
    },
    {
      title: "Active Threats Blocked",
      value: dashboardStats?.threatsBlocked || 1247,
      change: "+89",
      trend: "up",
      status: "good",
      description: "Threats automatically blocked this month"
    }
  ];

  const getMetricIcon = (title: string) => {
    switch (title) {
      case "Overall Security Posture": return <Shield className="w-5 h-5" />;
      case "Risk Reduction": return <TrendingDown className="w-5 h-5" />;
      case "Mean Time to Detection": return <Clock className="w-5 h-5" />;
      case "Security Investment ROI": return <DollarSign className="w-5 h-5" />;
      case "Compliance Score": return <CheckCircle className="w-5 h-5" />;
      case "Active Threats Blocked": return <Target className="w-5 h-5" />;
      default: return <Activity className="w-5 h-5" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "good": return "text-green-400 border-green-500/50 bg-green-500/10";
      case "warning": return "text-yellow-400 border-yellow-500/50 bg-yellow-500/10";
      case "critical": return "text-red-400 border-red-500/50 bg-red-500/10";
      default: return "text-gray-400 border-gray-500/50 bg-gray-500/10";
    }
  };

  const getTrendIcon = (trend: string) => {
    if (trend === "up") return <TrendingUp className="w-4 h-4 text-green-400" />;
    if (trend === "down") return <TrendingDown className="w-4 h-4 text-green-400" />; // Down is good for security metrics like MTTD
    return <Activity className="w-4 h-4 text-gray-400" />;
  };

  const activeIncidents = incidents?.filter(i => i.status === 'open' || i.status === 'investigating')?.length || 0;
  const resolvedIncidents = incidents?.filter(i => i.status === 'resolved')?.length || 0;
  const totalUsers = users?.length || 0;
  const mfaEnabledUsers = users?.filter(u => u.mfaEnabled)?.length || 0;

  return (
    <div className="min-h-screen bg-background text-text">
      <div className="container mx-auto p-4 sm:p-6 space-y-4 sm:space-y-6">
        
        {/* Executive Header */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-white flex items-center">
              <BarChart3 className="w-8 h-8 mr-3 text-cyan-400" />
              Executive Security Dashboard
            </h1>
            <p className="text-gray-300 mt-2">Strategic security overview and key performance indicators</p>
          </div>
          <div className="flex items-center space-x-3">
            <Badge variant="outline" className="text-cyan-400 border-cyan-500/50">
              <Calendar className="w-3 h-3 mr-1" />
              Q1 2024 Report
            </Badge>
            <Button className="bg-cyan-600 hover:bg-cyan-700" data-testid="button-generate-executive-report">
              <FileText className="w-4 h-4 mr-2" />
              Generate Report
            </Button>
          </div>
        </div>

        {/* Key Performance Indicators */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-8">
          {executiveMetrics.map((metric, index) => (
            <Card key={index} className={`holographic-card border ${getStatusColor(metric.status)}`}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    {getMetricIcon(metric.title)}
                    <h3 className="text-sm font-medium text-gray-300">{metric.title}</h3>
                  </div>
                  {getTrendIcon(metric.trend)}
                </div>
                
                <div className="mb-3">
                  <div className="text-2xl font-bold text-white mb-1">{metric.value}</div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-green-400">{metric.change}</span>
                    <span className="text-xs text-gray-400">vs last month</span>
                  </div>
                </div>
                
                <p className="text-xs text-gray-400">{metric.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Risk Management Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          
          {/* Threat Landscape */}
          <Card className="holographic-card border border-red-500/30">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2 text-red-400" />
                Threat Landscape
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-red-500/10 rounded-lg border border-red-500/20">
                  <div>
                    <div className="text-sm font-medium text-red-400">Critical Threats</div>
                    <div className="text-xs text-gray-400">Requiring immediate attention</div>
                  </div>
                  <div className="text-xl font-bold text-red-400">
                    {threatData?.filter((t: any) => t.severity === 'critical')?.length || 2}
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                  <div>
                    <div className="text-sm font-medium text-yellow-400">Active Incidents</div>
                    <div className="text-xs text-gray-400">Currently under investigation</div>
                  </div>
                  <div className="text-xl font-bold text-yellow-400">
                    {activeIncidents}
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                  <div>
                    <div className="text-sm font-medium text-green-400">Resolved Today</div>
                    <div className="text-xs text-gray-400">Successfully mitigated</div>
                  </div>
                  <div className="text-xl font-bold text-green-400">
                    {resolvedIncidents}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Organizational Security Health */}
          <Card className="holographic-card border border-blue-500/30">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Users className="w-5 h-5 mr-2 text-blue-400" />
                Organizational Health
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-300">Multi-Factor Authentication</span>
                    <span className="text-sm font-semibold text-cyan-400">
                      {Math.round((mfaEnabledUsers / totalUsers) * 100)}%
                    </span>
                  </div>
                  <Progress value={(mfaEnabledUsers / totalUsers) * 100} className="h-2" />
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-300">Security Training Completion</span>
                    <span className="text-sm font-semibold text-green-400">94%</span>
                  </div>
                  <Progress value={94} className="h-2" />
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-300">Policy Compliance</span>
                    <span className="text-sm font-semibold text-blue-400">87%</span>
                  </div>
                  <Progress value={87} className="h-2" />
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-300">Incident Response Readiness</span>
                    <span className="text-sm font-semibold text-purple-400">92%</span>
                  </div>
                  <Progress value={92} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Strategic Insights */}
        <Tabs defaultValue="trends" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-surface border border-surface-light">
            <TabsTrigger value="trends" className="text-white">
              <TrendingUp className="w-4 h-4 mr-2" />
              Trends
            </TabsTrigger>
            <TabsTrigger value="investments" className="text-white">
              <DollarSign className="w-4 h-4 mr-2" />
              Investments
            </TabsTrigger>
            <TabsTrigger value="benchmarks" className="text-white">
              <Target className="w-4 h-4 mr-2" />
              Benchmarks
            </TabsTrigger>
            <TabsTrigger value="roadmap" className="text-white">
              <Calendar className="w-4 h-4 mr-2" />
              Roadmap
            </TabsTrigger>
          </TabsList>

          <TabsContent value="trends" className="mt-6">
            <Card className="border border-surface-light bg-surface/50">
              <CardHeader>
                <CardTitle className="text-white">Security Trends & Patterns</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-cyan-400">Positive Trends</h4>
                    <div className="space-y-2">
                      <div className="flex items-center text-sm">
                        <TrendingUp className="w-4 h-4 text-green-400 mr-2" />
                        <span className="text-gray-300">73% reduction in successful phishing attacks</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <TrendingUp className="w-4 h-4 text-green-400 mr-2" />
                        <span className="text-gray-300">45% faster incident response times</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <TrendingUp className="w-4 h-4 text-green-400 mr-2" />
                        <span className="text-gray-300">89% user satisfaction with security tools</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-yellow-400">Areas for Improvement</h4>
                    <div className="space-y-2">
                      <div className="flex items-center text-sm">
                        <AlertTriangle className="w-4 h-4 text-yellow-400 mr-2" />
                        <span className="text-gray-300">Mobile device compliance needs attention</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <AlertTriangle className="w-4 h-4 text-yellow-400 mr-2" />
                        <span className="text-gray-300">Third-party vendor security assessments</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <AlertTriangle className="w-4 h-4 text-yellow-400 mr-2" />
                        <span className="text-gray-300">Cloud security governance framework</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="investments" className="mt-6">
            <Card className="border border-surface-light bg-surface/50">
              <CardHeader>
                <CardTitle className="text-white">Security Investment Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-400 mb-2">$2.4M</div>
                    <div className="text-sm text-gray-400">Annual Security Budget</div>
                    <div className="text-xs text-green-400 mt-1">+15% from last year</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-cyan-400 mb-2">340%</div>
                    <div className="text-sm text-gray-400">Return on Investment</div>
                    <div className="text-xs text-cyan-400 mt-1">Industry leading ROI</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-400 mb-2">$8.2M</div>
                    <div className="text-sm text-gray-400">Risk Mitigation Value</div>
                    <div className="text-xs text-blue-400 mt-1">Prevented losses</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="benchmarks" className="mt-6">
            <Card className="border border-surface-light bg-surface/50">
              <CardHeader>
                <CardTitle className="text-white">Industry Benchmarks</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-surface/30 rounded-lg">
                    <span className="text-gray-300">Mean Time to Detection</span>
                    <div className="text-right">
                      <div className="text-green-400 font-semibold">4.3 min (Us)</div>
                      <div className="text-xs text-gray-400">vs 24.7 min (Industry)</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-surface/30 rounded-lg">
                    <span className="text-gray-300">Security Awareness Score</span>
                    <div className="text-right">
                      <div className="text-green-400 font-semibold">94% (Us)</div>
                      <div className="text-xs text-gray-400">vs 76% (Industry)</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-surface/30 rounded-lg">
                    <span className="text-gray-300">Incident Response Time</span>
                    <div className="text-right">
                      <div className="text-green-400 font-semibold">8.2 min (Us)</div>
                      <div className="text-xs text-gray-400">vs 47.3 min (Industry)</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="roadmap" className="mt-6">
            <Card className="border border-surface-light bg-surface/50">
              <CardHeader>
                <CardTitle className="text-white">Security Roadmap</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-3 h-3 rounded-full bg-green-400 mt-1"></div>
                    <div>
                      <div className="text-white font-medium">Q1 2024 - Zero Trust Implementation</div>
                      <div className="text-sm text-gray-400">Complete rollout of zero trust architecture</div>
                      <div className="text-xs text-green-400 mt-1">✓ On Track</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-3 h-3 rounded-full bg-yellow-400 mt-1"></div>
                    <div>
                      <div className="text-white font-medium">Q2 2024 - AI Threat Detection</div>
                      <div className="text-sm text-gray-400">Advanced ML models for threat prediction</div>
                      <div className="text-xs text-yellow-400 mt-1">⚠ In Progress</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-3 h-3 rounded-full bg-blue-400 mt-1"></div>
                    <div>
                      <div className="text-white font-medium">Q3 2024 - Cloud Security Hub</div>
                      <div className="text-sm text-gray-400">Centralized cloud security management</div>
                      <div className="text-xs text-blue-400 mt-1">📅 Planned</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Executive Actions */}
        <Card className="border border-surface-light bg-surface/50">
          <CardHeader>
            <CardTitle className="text-white">Recommended Executive Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <Button variant="outline" className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/20 h-auto py-4" data-testid="button-quarterly-review">
                <div className="text-center">
                  <FileText className="w-6 h-6 mx-auto mb-2" />
                  <div className="font-medium">Quarterly Security Review</div>
                  <div className="text-xs text-gray-400 mt-1">Board presentation ready</div>
                </div>
              </Button>
              <Button variant="outline" className="border-green-500/50 text-green-400 hover:bg-green-500/20 h-auto py-4" data-testid="button-budget-planning">
                <div className="text-center">
                  <DollarSign className="w-6 h-6 mx-auto mb-2" />
                  <div className="font-medium">Budget Planning</div>
                  <div className="text-xs text-gray-400 mt-1">Next fiscal year planning</div>
                </div>
              </Button>
              <Button variant="outline" className="border-purple-500/50 text-purple-400 hover:bg-purple-500/20 h-auto py-4" data-testid="button-risk-assessment">
                <div className="text-center">
                  <Target className="w-6 h-6 mx-auto mb-2" />
                  <div className="font-medium">Risk Assessment</div>
                  <div className="text-xs text-gray-400 mt-1">Annual risk review</div>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}