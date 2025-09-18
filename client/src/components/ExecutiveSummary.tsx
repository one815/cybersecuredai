/**
 * Executive Summary Component
 * 
 * Provides high-level executive overview and federal compliance reporting
 * for the unified cybersecurity platform across all four revolutionary systems
 */

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart3,
  TrendingUp,
  Shield,
  CheckCircle2,
  AlertTriangle,
  Brain,
  MapPin,
  Eye,
  Drone,
  FileText,
  Download,
  Calendar,
  Clock,
  Award,
  Target,
  Activity,
  DollarSign,
  Users,
  Zap
} from 'lucide-react';

interface ExecutiveSummaryData {
  overallSecurityPosture: {
    score: number;
    status: 'excellent' | 'good' | 'fair' | 'poor';
    trend: 'improving' | 'stable' | 'declining';
  };
  systemPerformance: {
    cydef: {
      effectiveness: number;
      autonomyLevel: number;
      threatsNeutralized: number;
    };
    liveLocation: {
      deviceCoverage: number;
      responseTime: number;
      alertAccuracy: number;
    };
    cypherHum: {
      visualizationQuality: number;
      userEngagement: number;
      insightGeneration: number;
    };
    acds: {
      swarmEfficiency: number;
      missionSuccessRate: number;
      coordinationScore: number;
    };
  };
  federalCompliance: {
    fisma: number;
    nist: number;
    cisa: number;
    fedramp: number;
    overallCompliance: number;
  };
  riskMetrics: {
    threatsIdentified: number;
    threatsBlocked: number;
    incidentsPrevented: number;
    systemsProtected: number;
  };
  operationalMetrics: {
    uptime: number;
    responseTime: number;
    falsePositiveRate: number;
    userSatisfaction: number;
  };
  costEffectiveness: {
    savingsGenerated: number;
    preventedLosses: number;
    roi: number;
    operationalCosts: number;
  };
}

export default function ExecutiveSummary() {
  const [selectedTimeframe, setSelectedTimeframe] = useState('month');
  const [reportType, setReportType] = useState('executive');

  // Fetch executive summary data
  const { data: executiveData, isLoading } = useQuery<ExecutiveSummaryData>({
    queryKey: ['/api/unified/executive-summary', selectedTimeframe],
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-green-400 bg-green-900/20 border-green-500/30';
      case 'good': return 'text-blue-400 bg-blue-900/20 border-blue-500/30';
      case 'fair': return 'text-yellow-400 bg-yellow-900/20 border-yellow-500/30';
      case 'poor': return 'text-red-400 bg-red-900/20 border-red-500/30';
      default: return 'text-gray-400 bg-gray-900/20 border-gray-500/30';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'improving': return <TrendingUp className="w-4 h-4 text-green-400" />;
      case 'stable': return <Activity className="w-4 h-4 text-blue-400" />;
      case 'declining': return <TrendingUp className="w-4 h-4 text-red-400 rotate-180" />;
      default: return <Activity className="w-4 h-4 text-gray-400" />;
    }
  };

  if (isLoading) {
    return (
      <Card className="bg-black/50 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center space-x-2">
            <BarChart3 className="w-5 h-5 text-cyan-400" />
            <span>Executive Summary</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-24 bg-gray-800 rounded"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-black/50 border-gray-700 backdrop-blur-sm" data-testid="executive-summary">
      <CardHeader>
        <CardTitle className="text-white flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <BarChart3 className="w-5 h-5 text-cyan-400" />
            <span>Executive Summary & Federal Compliance</span>
          </div>
          <div className="flex items-center space-x-2">
            <select
              value={selectedTimeframe}
              onChange={(e) => setSelectedTimeframe(e.target.value)}
              className="bg-gray-800 border border-gray-600 rounded px-2 py-1 text-sm text-white"
              data-testid="select-timeframe"
            >
              <option value="week">Last Week</option>
              <option value="month">Last Month</option>
              <option value="quarter">Last Quarter</option>
              <option value="year">Last Year</option>
            </select>
            <Button
              variant="outline"
              size="sm"
              className="text-cyan-400 border-cyan-500/30 hover:bg-cyan-500/10"
              data-testid="button-export-report"
            >
              <Download className="w-4 h-4 mr-1" />
              Export
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={reportType} onValueChange={setReportType}>
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="executive" data-testid="tab-executive">
              Executive Overview
            </TabsTrigger>
            <TabsTrigger value="compliance" data-testid="tab-compliance">
              Federal Compliance
            </TabsTrigger>
            <TabsTrigger value="operational" data-testid="tab-operational">
              Operational Metrics
            </TabsTrigger>
          </TabsList>

          {/* Executive Overview */}
          <TabsContent value="executive" className="space-y-6">
            {executiveData && (
              <>
                {/* Overall Security Posture */}
                <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white flex items-center space-x-2">
                      <Shield className="w-5 h-5 text-cyan-400" />
                      <span>Overall Security Posture</span>
                    </h3>
                    <div className="flex items-center space-x-2">
                      <Badge className={getStatusColor(executiveData.overallSecurityPosture.status)}>
                        {executiveData.overallSecurityPosture.status.toUpperCase()}
                      </Badge>
                      {getTrendIcon(executiveData.overallSecurityPosture.trend)}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-white mb-2">
                        {executiveData.overallSecurityPosture.score}%
                      </div>
                      <div className="text-sm text-gray-400">Security Score</div>
                      <Progress 
                        value={executiveData.overallSecurityPosture.score} 
                        className="h-2 mt-2"
                      />
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-400 mb-2">
                        {executiveData.riskMetrics.threatsBlocked}
                      </div>
                      <div className="text-sm text-gray-400">Threats Blocked</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-400 mb-2">
                        {executiveData.riskMetrics.incidentsPrevented}
                      </div>
                      <div className="text-sm text-gray-400">Incidents Prevented</div>
                    </div>
                  </div>
                </div>

                {/* System Performance Overview */}
                <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                    <Activity className="w-5 h-5 text-cyan-400" />
                    <span>Revolutionary Systems Performance</span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* CyDEF Performance */}
                    <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-3">
                        <Brain className="w-5 h-5 text-purple-400" />
                        <span className="font-medium text-white">CyDEF Genetic AI</span>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Effectiveness:</span>
                          <span className="text-white">{executiveData.systemPerformance.cydef.effectiveness}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Autonomy:</span>
                          <span className="text-white">{executiveData.systemPerformance.cydef.autonomyLevel}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Neutralized:</span>
                          <span className="text-green-400">{executiveData.systemPerformance.cydef.threatsNeutralized}</span>
                        </div>
                      </div>
                    </div>

                    {/* Live Location Performance */}
                    <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-3">
                        <MapPin className="w-5 h-5 text-blue-400" />
                        <span className="font-medium text-white">Live Location</span>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Coverage:</span>
                          <span className="text-white">{executiveData.systemPerformance.liveLocation.deviceCoverage}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Response:</span>
                          <span className="text-white">{executiveData.systemPerformance.liveLocation.responseTime}s</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Accuracy:</span>
                          <span className="text-green-400">{executiveData.systemPerformance.liveLocation.alertAccuracy}%</span>
                        </div>
                      </div>
                    </div>

                    {/* CypherHUM Performance */}
                    <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-3">
                        <Eye className="w-5 h-5 text-green-400" />
                        <span className="font-medium text-white">CypherHUM 3D</span>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Visualization:</span>
                          <span className="text-white">{executiveData.systemPerformance.cypherHum.visualizationQuality}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Engagement:</span>
                          <span className="text-white">{executiveData.systemPerformance.cypherHum.userEngagement}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Insights:</span>
                          <span className="text-green-400">{executiveData.systemPerformance.cypherHum.insightGeneration}</span>
                        </div>
                      </div>
                    </div>

                    {/* ACDS Performance */}
                    <div className="bg-orange-900/20 border border-orange-500/30 rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-3">
                        <Drone className="w-5 h-5 text-orange-400" />
                        <span className="font-medium text-white">ACDS Swarm</span>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Efficiency:</span>
                          <span className="text-white">{executiveData.systemPerformance.acds.swarmEfficiency}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Success Rate:</span>
                          <span className="text-white">{executiveData.systemPerformance.acds.missionSuccessRate}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Coordination:</span>
                          <span className="text-green-400">{executiveData.systemPerformance.acds.coordinationScore}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Cost Effectiveness */}
                <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                    <DollarSign className="w-5 h-5 text-cyan-400" />
                    <span>Cost Effectiveness & ROI</span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-400 mb-1">
                        ${executiveData.costEffectiveness.savingsGenerated.toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-400">Savings Generated</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-400 mb-1">
                        ${executiveData.costEffectiveness.preventedLosses.toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-400">Prevented Losses</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white mb-1">
                        {Math.round(executiveData.costEffectiveness.roi * 100)}%
                      </div>
                      <div className="text-xs text-gray-400">Return on Investment</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white mb-1">
                        ${executiveData.costEffectiveness.operationalCosts.toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-400">Operational Costs</div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </TabsContent>

          {/* Federal Compliance */}
          <TabsContent value="compliance" className="space-y-6">
            {executiveData && (
              <>
                <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                    <Award className="w-5 h-5 text-cyan-400" />
                    <span>Federal Compliance Status</span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white mb-2">
                        {Math.round(executiveData.federalCompliance.overallCompliance * 100)}%
                      </div>
                      <div className="text-sm text-gray-400 mb-2">Overall Compliance</div>
                      <Progress 
                        value={executiveData.federalCompliance.overallCompliance * 100} 
                        className="h-2"
                      />
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-blue-400 mb-2">
                        {Math.round(executiveData.federalCompliance.fisma * 100)}%
                      </div>
                      <div className="text-sm text-gray-400 mb-2">FISMA</div>
                      <Progress 
                        value={executiveData.federalCompliance.fisma * 100} 
                        className="h-2"
                      />
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-blue-400 mb-2">
                        {Math.round(executiveData.federalCompliance.nist * 100)}%
                      </div>
                      <div className="text-sm text-gray-400 mb-2">NIST</div>
                      <Progress 
                        value={executiveData.federalCompliance.nist * 100} 
                        className="h-2"
                      />
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-blue-400 mb-2">
                        {Math.round(executiveData.federalCompliance.cisa * 100)}%
                      </div>
                      <div className="text-sm text-gray-400 mb-2">CISA</div>
                      <Progress 
                        value={executiveData.federalCompliance.cisa * 100} 
                        className="h-2"
                      />
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-blue-400 mb-2">
                        {Math.round(executiveData.federalCompliance.fedramp * 100)}%
                      </div>
                      <div className="text-sm text-gray-400 mb-2">FedRAMP</div>
                      <Progress 
                        value={executiveData.federalCompliance.fedramp * 100} 
                        className="h-2"
                      />
                    </div>
                  </div>
                </div>
              </>
            )}
          </TabsContent>

          {/* Operational Metrics */}
          <TabsContent value="operational" className="space-y-6">
            {executiveData && (
              <>
                <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                    <Target className="w-5 h-5 text-cyan-400" />
                    <span>Operational Excellence Metrics</span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-400 mb-2">
                        {executiveData.operationalMetrics.uptime}%
                      </div>
                      <div className="text-sm text-gray-400 mb-2">System Uptime</div>
                      <Progress 
                        value={executiveData.operationalMetrics.uptime} 
                        className="h-2"
                      />
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white mb-2">
                        {executiveData.operationalMetrics.responseTime}s
                      </div>
                      <div className="text-sm text-gray-400">Average Response Time</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white mb-2">
                        {executiveData.operationalMetrics.falsePositiveRate}%
                      </div>
                      <div className="text-sm text-gray-400">False Positive Rate</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-400 mb-2">
                        {executiveData.operationalMetrics.userSatisfaction}%
                      </div>
                      <div className="text-sm text-gray-400 mb-2">User Satisfaction</div>
                      <Progress 
                        value={executiveData.operationalMetrics.userSatisfaction} 
                        className="h-2"
                      />
                    </div>
                  </div>
                </div>
              </>
            )}
          </TabsContent>
        </Tabs>

        {/* Quick Actions */}
        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <Clock className="w-4 h-4" />
            <span>Last updated: {new Date().toLocaleString()}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              className="text-blue-400 border-blue-500/30 hover:bg-blue-500/10"
              data-testid="button-schedule-report"
            >
              <Calendar className="w-4 h-4 mr-1" />
              Schedule Report
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-green-400 border-green-500/30 hover:bg-green-500/10"
              data-testid="button-generate-detailed-report"
            >
              <FileText className="w-4 h-4 mr-1" />
              Detailed Report
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}