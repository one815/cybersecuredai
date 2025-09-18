/**
 * Cross-System Analytics Component
 * 
 * Provides unified analytics and correlation analysis across all four systems:
 * - Threat correlation between CyDEF genetic insights and ACDS drone deployments
 * - Integration of Live Location threat geolocation with CypherHUM 3D visualization
 * - Unified threat scoring that considers all four system inputs
 * - Executive reporting features for federal compliance requirements
 */

import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart3,
  TrendingUp,
  Target,
  Brain,
  MapPin,
  Eye,
  Drone,
  Shield,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Zap,
  Network,
  Activity,
  Globe
} from 'lucide-react';

interface ThreatCorrelation {
  id: string;
  threatId: string;
  correlationScore: number;
  involvedSystems: string[];
  cydefInsights: {
    geneticAlgorithmConfidence: number;
    threatClassification: string;
    evolutionGeneration: number;
  };
  liveLocationData: {
    geographicDistribution: any[];
    highRiskAreas: string[];
    affectedDevices: number;
  };
  cypherhumVisualization: {
    threeDModelingAccuracy: number;
    holographicComplexity: string;
    visualizationScore: number;
  };
  acdsResponse: {
    dronesDeployed: number;
    missionSuccess: boolean;
    responseTime: number;
    coordinationEfficiency: number;
  };
  unifiedThreatScore: number;
  timestamp: string;
}

interface SystemCorrelationMetrics {
  cydefToAcds: {
    correlationStrength: number;
    successfulCoordinations: number;
    averageResponseTime: number;
  };
  liveLocationToCypherHum: {
    visualizationAccuracy: number;
    geospatialIntegration: number;
    realTimeSync: number;
  };
  overallIntegration: {
    systemSynergy: number;
    crossSystemEfficiency: number;
    federalComplianceScore: number;
  };
}

interface ExecutiveMetrics {
  threatPrevention: {
    totalThreatsIdentified: number;
    threatsNeutralized: number;
    preventionRate: number;
  };
  systemEfficiency: {
    averageResponseTime: number;
    systemUptime: number;
    crossSystemCoordination: number;
  };
  complianceStatus: {
    federalRequirements: number;
    securityStandards: number;
    overallCompliance: number;
  };
  costEffectiveness: {
    automationSavings: number;
    preventedDamages: number;
    roi: number;
  };
}

export default function CrossSystemAnalytics() {
  const [selectedTimeRange, setSelectedTimeRange] = useState('24h');
  const [selectedAnalysisType, setSelectedAnalysisType] = useState('correlation');

  // Fetch threat correlation data
  const { data: threatCorrelations, isLoading: isLoadingCorrelations } = useQuery<ThreatCorrelation[]>({
    queryKey: ['/api/unified/threat-correlations', selectedTimeRange],
    refetchInterval: 10000,
  });

  // Fetch system correlation metrics
  const { data: correlationMetrics } = useQuery<SystemCorrelationMetrics>({
    queryKey: ['/api/unified/correlation-metrics', selectedTimeRange],
    refetchInterval: 15000,
  });

  // Fetch executive metrics
  const { data: executiveMetrics } = useQuery<ExecutiveMetrics>({
    queryKey: ['/api/unified/executive-metrics', selectedTimeRange],
    refetchInterval: 30000,
  });

  const getCorrelationColor = (score: number) => {
    if (score >= 0.8) return 'text-green-400 bg-green-900/20';
    if (score >= 0.6) return 'text-yellow-400 bg-yellow-900/20';
    return 'text-red-400 bg-red-900/20';
  };

  const getSystemIcon = (systemName: string) => {
    switch (systemName) {
      case 'cydef': return <Brain className="w-4 h-4 text-purple-400" />;
      case 'live-location': return <MapPin className="w-4 h-4 text-blue-400" />;
      case 'cypherhum': return <Eye className="w-4 h-4 text-green-400" />;
      case 'acds': return <Drone className="w-4 h-4 text-orange-400" />;
      default: return <Shield className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <Card className="bg-black/50 border-gray-700 backdrop-blur-sm" data-testid="cross-system-analytics">
      <CardHeader>
        <CardTitle className="text-white flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <BarChart3 className="w-5 h-5 text-cyan-400" />
            <span>Cross-System Analytics & Correlation</span>
          </div>
          <div className="flex items-center space-x-2">
            <select
              value={selectedTimeRange}
              onChange={(e) => setSelectedTimeRange(e.target.value)}
              className="bg-gray-800 border border-gray-600 rounded px-2 py-1 text-sm text-white"
              data-testid="select-time-range"
            >
              <option value="1h">Last Hour</option>
              <option value="24h">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
            </select>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={selectedAnalysisType} onValueChange={setSelectedAnalysisType}>
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="correlation" data-testid="tab-correlation">
              Threat Correlation
            </TabsTrigger>
            <TabsTrigger value="metrics" data-testid="tab-metrics">
              System Metrics
            </TabsTrigger>
            <TabsTrigger value="executive" data-testid="tab-executive">
              Executive Summary
            </TabsTrigger>
          </TabsList>

          {/* Threat Correlation Analysis */}
          <TabsContent value="correlation" className="space-y-4">
            <div className="grid gap-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">Real-Time Threat Correlations</h3>
                <Badge variant="outline" className="text-cyan-400 border-cyan-500/30">
                  <Activity className="w-3 h-3 mr-1" />
                  Live Analysis
                </Badge>
              </div>

              {isLoadingCorrelations ? (
                <div className="animate-pulse space-y-4">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="h-24 bg-gray-800 rounded"></div>
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  {threatCorrelations?.slice(0, 5).map((correlation) => (
                    <div 
                      key={correlation.id}
                      className="bg-gray-900/50 border border-gray-700 rounded-lg p-4"
                      data-testid={`correlation-${correlation.id}`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <Target className="w-4 h-4 text-red-400" />
                          <span className="font-medium text-white">Threat ID: {correlation.threatId}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-gray-400">Unified Score:</span>
                          <Badge className={getCorrelationColor(correlation.unifiedThreatScore / 100)}>
                            {Math.round(correlation.unifiedThreatScore)}%
                          </Badge>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                        {/* CyDEF Insights */}
                        <div className="space-y-1">
                          <div className="flex items-center space-x-1">
                            {getSystemIcon('cydef')}
                            <span className="text-xs font-medium text-purple-400">CyDEF</span>
                          </div>
                          <div className="text-xs text-gray-300">
                            Confidence: {Math.round(correlation.cydefInsights.geneticAlgorithmConfidence)}%
                          </div>
                          <div className="text-xs text-gray-400">
                            Gen: {correlation.cydefInsights.evolutionGeneration}
                          </div>
                        </div>

                        {/* Live Location Data */}
                        <div className="space-y-1">
                          <div className="flex items-center space-x-1">
                            {getSystemIcon('live-location')}
                            <span className="text-xs font-medium text-blue-400">Location</span>
                          </div>
                          <div className="text-xs text-gray-300">
                            Devices: {correlation.liveLocationData.affectedDevices}
                          </div>
                          <div className="text-xs text-gray-400">
                            Risk Areas: {correlation.liveLocationData.highRiskAreas.length}
                          </div>
                        </div>

                        {/* CypherHUM Visualization */}
                        <div className="space-y-1">
                          <div className="flex items-center space-x-1">
                            {getSystemIcon('cypherhum')}
                            <span className="text-xs font-medium text-green-400">CypherHUM</span>
                          </div>
                          <div className="text-xs text-gray-300">
                            3D Accuracy: {Math.round(correlation.cypherhumVisualization.threeDModelingAccuracy)}%
                          </div>
                          <div className="text-xs text-gray-400">
                            Complexity: {correlation.cypherhumVisualization.holographicComplexity}
                          </div>
                        </div>

                        {/* ACDS Response */}
                        <div className="space-y-1">
                          <div className="flex items-center space-x-1">
                            {getSystemIcon('acds')}
                            <span className="text-xs font-medium text-orange-400">ACDS</span>
                          </div>
                          <div className="text-xs text-gray-300">
                            Drones: {correlation.acdsResponse.dronesDeployed}
                          </div>
                          <div className="text-xs text-gray-400">
                            Response: {correlation.acdsResponse.responseTime}s
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-400">Systems Involved:</span>
                        <div className="flex space-x-1">
                          {correlation.involvedSystems.map((system) => (
                            <div key={system} className="flex items-center">
                              {getSystemIcon(system)}
                            </div>
                          ))}
                        </div>
                        <div className="flex-1"></div>
                        <span className="text-xs text-gray-500">
                          {new Date(correlation.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          {/* System Metrics */}
          <TabsContent value="metrics" className="space-y-4">
            <div className="grid gap-4">
              <h3 className="text-lg font-semibold text-white">System Integration Metrics</h3>
              
              {correlationMetrics && (
                <div className="grid gap-4">
                  {/* CyDEF to ACDS Correlation */}
                  <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-3">
                      <Brain className="w-4 h-4 text-purple-400" />
                      <Zap className="w-3 h-3 text-gray-400" />
                      <Drone className="w-4 h-4 text-orange-400" />
                      <span className="font-medium text-white">CyDEF ↔ ACDS Integration</span>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <div className="text-xs text-gray-400 mb-1">Correlation Strength</div>
                        <div className="text-lg font-bold text-white">
                          {Math.round(correlationMetrics.cydefToAcds.correlationStrength * 100)}%
                        </div>
                        <Progress 
                          value={correlationMetrics.cydefToAcds.correlationStrength * 100} 
                          className="h-2 mt-1"
                        />
                      </div>
                      <div>
                        <div className="text-xs text-gray-400 mb-1">Successful Coordinations</div>
                        <div className="text-lg font-bold text-green-400">
                          {correlationMetrics.cydefToAcds.successfulCoordinations}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-400 mb-1">Avg Response Time</div>
                        <div className="text-lg font-bold text-white">
                          {correlationMetrics.cydefToAcds.averageResponseTime}s
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Live Location to CypherHUM Integration */}
                  <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-3">
                      <MapPin className="w-4 h-4 text-blue-400" />
                      <Zap className="w-3 h-3 text-gray-400" />
                      <Eye className="w-4 h-4 text-green-400" />
                      <span className="font-medium text-white">Live Location ↔ CypherHUM Integration</span>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <div className="text-xs text-gray-400 mb-1">Visualization Accuracy</div>
                        <div className="text-lg font-bold text-white">
                          {Math.round(correlationMetrics.liveLocationToCypherHum.visualizationAccuracy * 100)}%
                        </div>
                        <Progress 
                          value={correlationMetrics.liveLocationToCypherHum.visualizationAccuracy * 100} 
                          className="h-2 mt-1"
                        />
                      </div>
                      <div>
                        <div className="text-xs text-gray-400 mb-1">Geospatial Integration</div>
                        <div className="text-lg font-bold text-white">
                          {Math.round(correlationMetrics.liveLocationToCypherHum.geospatialIntegration * 100)}%
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-400 mb-1">Real-Time Sync</div>
                        <div className="text-lg font-bold text-green-400">
                          {Math.round(correlationMetrics.liveLocationToCypherHum.realTimeSync * 100)}%
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Overall Integration */}
                  <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-3">
                      <Network className="w-4 h-4 text-cyan-400" />
                      <span className="font-medium text-white">Overall Platform Integration</span>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <div className="text-xs text-gray-400 mb-1">System Synergy</div>
                        <div className="text-lg font-bold text-white">
                          {Math.round(correlationMetrics.overallIntegration.systemSynergy * 100)}%
                        </div>
                        <Progress 
                          value={correlationMetrics.overallIntegration.systemSynergy * 100} 
                          className="h-2 mt-1"
                        />
                      </div>
                      <div>
                        <div className="text-xs text-gray-400 mb-1">Cross-System Efficiency</div>
                        <div className="text-lg font-bold text-white">
                          {Math.round(correlationMetrics.overallIntegration.crossSystemEfficiency * 100)}%
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-400 mb-1">Federal Compliance</div>
                        <div className="text-lg font-bold text-green-400">
                          {Math.round(correlationMetrics.overallIntegration.federalComplianceScore * 100)}%
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Executive Summary */}
          <TabsContent value="executive" className="space-y-4">
            <div className="grid gap-4">
              <h3 className="text-lg font-semibold text-white">Executive Dashboard</h3>
              
              {executiveMetrics && (
                <div className="grid md:grid-cols-2 gap-4">
                  {/* Threat Prevention */}
                  <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-3">
                      <Shield className="w-4 h-4 text-green-400" />
                      <span className="font-medium text-white">Threat Prevention</span>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-400">Threats Identified</span>
                        <span className="text-lg font-bold text-white">
                          {executiveMetrics.threatPrevention.totalThreatsIdentified}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-400">Threats Neutralized</span>
                        <span className="text-lg font-bold text-green-400">
                          {executiveMetrics.threatPrevention.threatsNeutralized}
                        </span>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-400">Prevention Rate</span>
                          <span className="text-lg font-bold text-white">
                            {Math.round(executiveMetrics.threatPrevention.preventionRate * 100)}%
                          </span>
                        </div>
                        <Progress 
                          value={executiveMetrics.threatPrevention.preventionRate * 100} 
                          className="h-2"
                        />
                      </div>
                    </div>
                  </div>

                  {/* System Efficiency */}
                  <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-3">
                      <TrendingUp className="w-4 h-4 text-cyan-400" />
                      <span className="font-medium text-white">System Efficiency</span>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-400">Avg Response Time</span>
                        <span className="text-lg font-bold text-white">
                          {executiveMetrics.systemEfficiency.averageResponseTime}s
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-400">System Uptime</span>
                        <span className="text-lg font-bold text-green-400">
                          {Math.round(executiveMetrics.systemEfficiency.systemUptime * 100)}%
                        </span>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-400">Cross-System Coordination</span>
                          <span className="text-lg font-bold text-white">
                            {Math.round(executiveMetrics.systemEfficiency.crossSystemCoordination * 100)}%
                          </span>
                        </div>
                        <Progress 
                          value={executiveMetrics.systemEfficiency.crossSystemCoordination * 100} 
                          className="h-2"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Compliance Status */}
                  <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-3">
                      <CheckCircle2 className="w-4 h-4 text-blue-400" />
                      <span className="font-medium text-white">Compliance Status</span>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-400">Federal Requirements</span>
                        <span className="text-lg font-bold text-green-400">
                          {Math.round(executiveMetrics.complianceStatus.federalRequirements * 100)}%
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-400">Security Standards</span>
                        <span className="text-lg font-bold text-green-400">
                          {Math.round(executiveMetrics.complianceStatus.securityStandards * 100)}%
                        </span>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-400">Overall Compliance</span>
                          <span className="text-lg font-bold text-white">
                            {Math.round(executiveMetrics.complianceStatus.overallCompliance * 100)}%
                          </span>
                        </div>
                        <Progress 
                          value={executiveMetrics.complianceStatus.overallCompliance * 100} 
                          className="h-2"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Cost Effectiveness */}
                  <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-3">
                      <Globe className="w-4 h-4 text-yellow-400" />
                      <span className="font-medium text-white">Cost Effectiveness</span>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-400">Automation Savings</span>
                        <span className="text-lg font-bold text-green-400">
                          ${executiveMetrics.costEffectiveness.automationSavings.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-400">Prevented Damages</span>
                        <span className="text-lg font-bold text-green-400">
                          ${executiveMetrics.costEffectiveness.preventedDamages.toLocaleString()}
                        </span>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-400">ROI</span>
                          <span className="text-lg font-bold text-white">
                            {Math.round(executiveMetrics.costEffectiveness.roi * 100)}%
                          </span>
                        </div>
                        <Progress 
                          value={Math.min(executiveMetrics.costEffectiveness.roi * 100, 100)} 
                          className="h-2"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}