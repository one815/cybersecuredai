import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Activity, TrendingUp, BarChart3, Zap, MapPin, Brain, Shield, Eye } from "lucide-react";
import { CustomDatabaseIcon, CustomTargetIcon, CustomUserIcon } from "@/components/CustomIcons";
import { ThreatMap } from "@/components/ThreatMap";
import { useQuery } from "@tanstack/react-query";

export default function ThreatAnalysis() {
  const { data: aiAnalytics } = useQuery({
    queryKey: ["/api/ai/analytics"],
    refetchInterval: 30000, // Refresh every 30 seconds for real-time data
  });

  const { data: threatPatterns = [] } = useQuery({
    queryKey: ["/api/threats/patterns"],
  });

  const { data: behavioralAnalysis } = useQuery({
    queryKey: ["/api/ai/behavioral-analysis"],
    refetchInterval: 30000,
  });

  const { data: threatAnalysisData } = useQuery({
    queryKey: ["/api/ai/threat-analysis"],
    refetchInterval: 30000,
  });
  return (
    <div className="min-h-screen bg-background text-text">
      <div className="container mx-auto p-4 sm:p-6 space-y-4 sm:space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-white">Threat Analysis Visualization</h1>
            <p className="text-sm lg:text-base text-gray-300 mt-2">Advanced threat intelligence and predictive analytics</p>
          </div>
          <div className="flex items-center space-x-2 lg:space-x-3">
            <Button variant="outline" size="sm" data-testid="button-export" className="text-xs lg:text-sm">
              <CustomDatabaseIcon size={16} className="mr-1 lg:mr-2" />
              <span className="hidden sm:inline">Export Data</span>
              <span className="sm:hidden">Export</span>
            </Button>
            <Button variant="outline" size="sm" data-testid="button-configure" className="text-xs lg:text-sm">
              <Activity className="w-3 h-3 lg:w-4 lg:h-4 mr-1 lg:mr-2" />
              <span className="hidden sm:inline">Configure</span>
              <span className="sm:hidden">Config</span>
            </Button>
          </div>
        </div>

        {/* AI Models Status Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6">
          <Card className="bg-surface border-cyan-500/30" data-testid="card-ml-models">
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <Brain className="w-6 h-6 sm:w-8 sm:h-8 text-cyan-400" />
                <div>
                  <div className="text-lg sm:text-2xl font-bold text-white">{(aiAnalytics as any)?.systemMetrics?.mlEnginesActive || 0}</div>
                  <div className="text-xs sm:text-sm text-gray-400">ML Models Active</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-surface border-green-500/30" data-testid="card-detection-rate">
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <CustomTargetIcon size={32} className="text-green-400" />
                <div>
                  <div className="text-lg sm:text-2xl font-bold text-white">{(aiAnalytics as any)?.systemMetrics?.threatDetectionRate || 0}%</div>
                  <div className="text-xs sm:text-sm text-gray-400">Detection Rate</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-surface border-orange-500/30" data-testid="card-processing-latency">
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-orange-400" />
                <div>
                  <div className="text-lg sm:text-2xl font-bold text-white">{(aiAnalytics as any)?.systemMetrics?.processingLatency || 0}ms</div>
                  <div className="text-xs sm:text-sm text-gray-400">Processing Time</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-surface border-purple-500/30" data-testid="card-threats-analyzed">
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <Activity className="w-6 h-6 sm:w-8 sm:h-8 text-purple-400" />
                <div>
                  <div className="text-lg sm:text-2xl font-bold text-white">{(aiAnalytics as any)?.threatDetection?.totalThreats || 0}</div>
                  <div className="text-xs sm:text-sm text-gray-400">Threats Analyzed</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* ML Threat Detection Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card className="bg-surface border-cyan-500/30" data-testid="card-ml-threat-detection">
            <CardHeader>
              <CardTitle className="text-white text-lg flex items-center">
                <Brain className="w-5 h-5 mr-2 text-cyan-400" />
                ML Threat Detection Engine
              </CardTitle>
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="bg-green-900/50 text-green-400 border-green-700">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-1 animate-pulse"></div>
                  Active
                </Badge>
                <Badge variant="outline" className="bg-cyan-900/50 text-cyan-400 border-cyan-700">
                  Accuracy: {(aiAnalytics as any)?.threatDetection?.mlModelAccuracy || 0}%
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-400">Total Threats</div>
                    <div className="text-2xl font-bold text-white">{(aiAnalytics as any)?.threatDetection?.totalThreats || 0}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Average Risk Score</div>
                    <div className="text-2xl font-bold text-white">{(aiAnalytics as any)?.threatDetection?.averageRiskScore || 'N/A'}</div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="text-sm text-gray-400">Threat Distribution</div>
                  {(aiAnalytics as any)?.threatDetection?.threatDistribution && (
                    <div className="space-y-2">
                      {Object.entries((aiAnalytics as any).threatDetection.threatDistribution).map(([level, count]) => (
                        <div key={level} className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div className={`w-3 h-3 rounded-full ${
                              level === 'CRITICAL' ? 'bg-red-500' :
                              level === 'HIGH' ? 'bg-orange-500' :
                              level === 'MEDIUM' ? 'bg-yellow-500' :
                              'bg-green-500'
                            }`}></div>
                            <span className="text-gray-300 text-sm">{level}</span>
                          </div>
                          <span className="text-white font-medium">{count as number}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-surface border-purple-500/30" data-testid="card-behavioral-analysis">
            <CardHeader>
              <CardTitle className="text-white text-lg flex items-center">
                <CustomUserIcon size={20} className="mr-2 text-purple-400" />
                Behavioral Analysis Engine
              </CardTitle>
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="bg-green-900/50 text-green-400 border-green-700">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-1 animate-pulse"></div>
                  Monitoring
                </Badge>
                <Badge variant="outline" className="bg-purple-900/50 text-purple-400 border-purple-700">
                  {(aiAnalytics as any)?.behavioralAnalysis?.totalUsers || 0} Users Tracked
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-400">High Risk Users</div>
                    <div className="text-2xl font-bold text-white">{(aiAnalytics as any)?.behavioralAnalysis?.highRiskUsers || 0}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Avg Risk Score</div>
                    <div className="text-2xl font-bold text-white">{(aiAnalytics as any)?.behavioralAnalysis?.averageRiskScore || 0}</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm text-gray-400">Top Risk Factors</div>
                  {(aiAnalytics as any)?.behavioralAnalysis?.topRiskyUsers?.slice(0, 3).map((user: any, index: number) => (
                    <div key={user.userId} className="flex items-center justify-between p-2 bg-gray-800/50 rounded">
                      <div className="text-sm text-gray-300">User {user.userId.slice(-4)}</div>
                      <div className="flex items-center space-x-2">
                        <div className={`w-2 h-2 rounded-full ${
                          user.riskScore > 75 ? 'bg-red-500' :
                          user.riskScore > 50 ? 'bg-orange-500' :
                          'bg-yellow-500'
                        }`}></div>
                        <span className="text-white text-sm">{user.riskScore}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Analytics Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Threat Timeline Analysis */}
          <Card className="bg-surface border-gray-700" data-testid="card-threat-timeline">
            <CardHeader>
              <CardTitle className="text-white text-lg flex items-center">
                <TrendingUp className="w-5 h-5 mr-2" />
                24-Hour Threat Timeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 relative">
                <svg viewBox="0 0 400 200" className="w-full h-full">
                  {/* Timeline grid */}
                  <defs>
                    <pattern id="grid" width="40" height="20" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 20" fill="none" stroke="#374151" strokeWidth="1" opacity="0.3"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                  
                  {/* Threat activity line chart */}
                  <polyline
                    fill="none"
                    stroke="#ef4444"
                    strokeWidth="2"
                    points="20,160 60,140 100,120 140,80 180,60 220,90 260,70 300,50 340,80 380,60"
                  />
                  
                  {/* Critical incident markers */}
                  <circle cx="140" cy="80" r="4" fill="#ef4444" className="animate-pulse" />
                  <circle cx="260" cy="70" r="4" fill="#f97316" className="animate-pulse" />
                  <circle cx="340" cy="80" r="4" fill="#eab308" className="animate-pulse" />
                  
                  {/* Time labels */}
                  <text x="20" y="190" className="text-xs fill-gray-400" fontSize="10">00:00</text>
                  <text x="140" y="190" className="text-xs fill-gray-400" fontSize="10">06:00</text>
                  <text x="260" y="190" className="text-xs fill-gray-400" fontSize="10">12:00</text>
                  <text x="380" y="190" className="text-xs fill-gray-400" fontSize="10">18:00</text>
                  
                  {/* Severity labels */}
                  <text x="5" y="60" className="text-xs fill-gray-400" fontSize="10">High</text>
                  <text x="5" y="120" className="text-xs fill-gray-400" fontSize="10">Med</text>
                  <text x="5" y="180" className="text-xs fill-gray-400" fontSize="10">Low</text>
                </svg>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
                <div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <span className="text-gray-300">Peak: 14 incidents</span>
                  </div>
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                    <span className="text-gray-300">Average: 8 incidents</span>
                  </div>
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="text-gray-300">Trend: ↗ +12%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Live Threat Intelligence Map */}
          <Card className="bg-surface border-gray-700" data-testid="card-geographic-threats">
            <CardHeader>
              <CardTitle className="text-white text-lg flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                Live Threat Intelligence Map
              </CardTitle>
              <div className="flex items-center space-x-2 mt-2">
                <Badge variant="outline" className="bg-green-900/50 text-green-400 border-green-700">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-1 animate-pulse"></div>
                  Real-time
                </Badge>
                <Badge variant="outline" className="bg-blue-900/50 text-blue-400 border-blue-700">
                  Global Coverage
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <ThreatMap height="300px" />
              <div className="mt-4 p-3 bg-orange-900/20 rounded-lg border border-orange-700/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="w-4 h-4 text-orange-400" />
                    <span className="text-sm text-orange-300">Auto-refreshes every 30 seconds</span>
                  </div>
                  <div className="text-xs text-gray-400">
                    Last update: {new Date().toLocaleTimeString()}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Advanced Analytics Row - Mobile Horizontal Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Threat Correlation Matrix */}
          <Card className="bg-surface border-gray-700" data-testid="card-correlation-matrix">
            <CardHeader>
              <CardTitle className="text-white text-lg flex items-center">
                <Zap className="w-5 h-5 mr-2" />
                Threat Correlation Matrix
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { from: "Malware", to: "Data Breach", correlation: 85, color: "bg-red-500" },
                  { from: "Phishing", to: "Credential Theft", correlation: 72, color: "bg-orange-500" },
                  { from: "DDoS", to: "Service Disruption", correlation: 91, color: "bg-red-600" },
                  { from: "SQL Injection", to: "Data Exfiltration", correlation: 67, color: "bg-yellow-500" },
                  { from: "Ransomware", to: "File Encryption", correlation: 98, color: "bg-red-700" }
                ].map((item, index) => (
                  <div key={index} className="space-y-1" data-testid={`correlation-${index}`}>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">{item.from} → {item.to}</span>
                      <span className="text-white font-medium">{item.correlation}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className={`${item.color} h-2 rounded-full transition-all duration-500`} 
                        style={{ width: `${item.correlation}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Predictive Threat Forecasting */}
          <Card className="bg-surface border-gray-700" data-testid="card-threat-forecast">
            <CardHeader>
              <CardTitle className="text-white text-lg flex items-center">
                <TrendingUp className="w-5 h-5 mr-2" />
                Threat Forecast (Next 7 Days)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { day: "Tomorrow", probability: 78, type: "DDoS Attack", color: "text-red-400" },
                  { day: "Wed", probability: 65, type: "Phishing Campaign", color: "text-orange-400" },
                  { day: "Thu", probability: 43, type: "Malware Detection", color: "text-yellow-400" },
                  { day: "Fri", probability: 82, type: "Brute Force", color: "text-red-400" },
                  { day: "Weekend", probability: 34, type: "Low Activity", color: "text-green-400" }
                ].map((forecast, index) => (
                  <div key={index} className="flex items-center justify-between" data-testid={`forecast-${index}`}>
                    <div>
                      <div className="text-sm font-medium text-white">{forecast.day}</div>
                      <div className={`text-xs ${forecast.color}`}>{forecast.type}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-white">{forecast.probability}%</div>
                      <div className="w-16 bg-gray-700 rounded-full h-1">
                        <div 
                          className="bg-gradient-to-r from-green-500 to-red-500 h-1 rounded-full" 
                          style={{ width: `${forecast.probability}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 bg-blue-900/30 rounded-lg border border-blue-700/50">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="w-4 h-4 text-blue-400" />
                  <span className="text-xs text-blue-300">AI Confidence: 89% | Model Accuracy: 94%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Attack Pattern Analysis */}
          <Card className="bg-surface border-gray-700" data-testid="card-attack-patterns">
            <CardHeader>
              <CardTitle className="text-white text-lg flex items-center">
                <Activity className="w-5 h-5 mr-2" />
                Attack Pattern Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-gray-900 rounded-lg p-3" data-testid="pattern-multi-vector">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-white">Multi-Vector Campaign</span>
                    <Badge className="bg-red-500 text-white text-xs">Active</Badge>
                  </div>
                  <div className="text-xs text-gray-400 mb-2">
                    Coordinated attack targeting financial sector
                  </div>
                  <div className="flex flex-wrap gap-1">
                    <Badge variant="outline" className="text-xs border-red-500 text-red-400">Phishing</Badge>
                    <Badge variant="outline" className="text-xs border-orange-500 text-orange-400">Malware</Badge>
                    <Badge variant="outline" className="text-xs border-yellow-500 text-yellow-400">Social Eng</Badge>
                  </div>
                </div>
                
                <div className="bg-gray-900 rounded-lg p-3" data-testid="pattern-apt">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-white">APT-like Behavior</span>
                    <Badge className="bg-orange-500 text-white text-xs">Monitoring</Badge>
                  </div>
                  <div className="text-xs text-gray-400 mb-2">
                    Persistent access attempts with lateral movement
                  </div>
                  <div className="flex flex-wrap gap-1">
                    <Badge variant="outline" className="text-xs border-red-500 text-red-400">Persistence</Badge>
                    <Badge variant="outline" className="text-xs border-orange-500 text-orange-400">Escalation</Badge>
                  </div>
                </div>
                
                <div className="bg-gray-900 rounded-lg p-3" data-testid="pattern-scanning">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-white">Automated Scanning</span>
                    <Badge className="bg-yellow-500 text-white text-xs">Low Risk</Badge>
                  </div>
                  <div className="text-xs text-gray-400 mb-2">
                    Routine vulnerability discovery attempts
                  </div>
                  <div className="flex flex-wrap gap-1">
                    <Badge variant="outline" className="text-xs border-blue-500 text-blue-400">Port Scan</Badge>
                    <Badge variant="outline" className="text-xs border-green-500 text-green-400">Recon</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Advanced Analytics Controls */}
        <Card className="bg-surface border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className="text-sm text-gray-300">
                  <span className="font-medium">Analysis Period:</span> Last 24 hours
                </div>
                <div className="text-sm text-gray-300">
                  <span className="font-medium">Data Points:</span> 2,847 events
                </div>
                <div className="text-sm text-gray-300">
                  <span className="font-medium">Confidence:</span> 94.2%
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" data-testid="button-realtime">
                  <Activity className="w-4 h-4 mr-2" />
                  Real-time Mode
                </Button>
                <Button variant="outline" size="sm" data-testid="button-export-analytics">
                  <CustomDatabaseIcon size={16} className="mr-2" />
                  Export Analytics
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}