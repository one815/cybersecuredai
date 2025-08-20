import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Activity, Database, TrendingUp, BarChart3, Zap } from "lucide-react";

export default function ThreatAnalysis() {
  return (
    <div className="min-h-screen bg-background text-text">
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Threat Analysis Visualization</h1>
            <p className="text-gray-300 mt-2">Advanced threat intelligence and predictive analytics</p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm" data-testid="button-export">
              <Database className="w-4 h-4 mr-2" />
              Export Data
            </Button>
            <Button variant="outline" size="sm" data-testid="button-configure">
              <Activity className="w-4 h-4 mr-2" />
              Configure
            </Button>
          </div>
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

          {/* Geographic Threat Heatmap */}
          <Card className="bg-surface border-gray-700" data-testid="card-geographic-threats">
            <CardHeader>
              <CardTitle className="text-white text-lg flex items-center">
                <BarChart3 className="w-5 h-5 mr-2" />
                Geographic Threat Intelligence
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 relative bg-gray-900 rounded-lg overflow-hidden">
                <svg viewBox="0 0 400 200" className="w-full h-full">
                  {/* World regions heatmap */}
                  <rect x="50" y="40" width="80" height="40" fill="#ef4444" opacity="0.8" rx="4" />
                  <text x="90" y="65" className="text-xs fill-white" fontSize="10" textAnchor="middle">Russia</text>
                  <text x="90" y="78" className="text-xs fill-white" fontSize="8" textAnchor="middle">High Risk</text>
                  
                  <rect x="180" y="50" width="70" height="35" fill="#f97316" opacity="0.8" rx="4" />
                  <text x="215" y="70" className="text-xs fill-white" fontSize="10" textAnchor="middle">China</text>
                  <text x="215" y="83" className="text-xs fill-white" fontSize="8" textAnchor="middle">Med Risk</text>
                  
                  <rect x="280" y="45" width="60" height="30" fill="#eab308" opacity="0.8" rx="4" />
                  <text x="310" y="63" className="text-xs fill-white" fontSize="10" textAnchor="middle">N. Korea</text>
                  <text x="310" y="76" className="text-xs fill-white" fontSize="8" textAnchor="middle">Med Risk</text>
                  
                  <rect x="50" y="110" width="90" height="35" fill="#22c55e" opacity="0.8" rx="4" />
                  <text x="95" y="130" className="text-xs fill-white" fontSize="10" textAnchor="middle">Europe</text>
                  <text x="95" y="143" className="text-xs fill-white" fontSize="8" textAnchor="middle">Low Risk</text>
                  
                  <rect x="180" y="120" width="80" height="30" fill="#3b82f6" opacity="0.8" rx="4" />
                  <text x="220" y="138" className="text-xs fill-white" fontSize="10" textAnchor="middle">Americas</text>
                  <text x="220" y="151" className="text-xs fill-white" fontSize="8" textAnchor="middle">Very Low</text>
                </svg>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <div className="text-sm text-gray-300">Risk Level Distribution</div>
                <div className="flex items-center space-x-4 text-xs">
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-red-500 rounded"></div>
                    <span className="text-gray-400">Critical</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-orange-500 rounded"></div>
                    <span className="text-gray-400">High</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-yellow-500 rounded"></div>
                    <span className="text-gray-400">Medium</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-500 rounded"></div>
                    <span className="text-gray-400">Low</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Advanced Analytics Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
                  <Database className="w-4 h-4 mr-2" />
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