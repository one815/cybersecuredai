import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Brain, 
  AlertTriangle, 
  TrendingUp, 
  Globe, 
  Activity, 
  Search,
  Filter,
  Download,
  RefreshCw,
  Eye,
  Target,
  Zap,
  Shield,
  Database,
  Network,
  Users,
  Clock,
  MapPin
} from "lucide-react";
import {
  Enhanced4DBrainIcon,
  Enhanced4DNetworkIcon,
  CustomTargetIcon,
  CustomShieldIcon,
  Enhanced4DShieldIcon,
  Enhanced4DTargetIcon,
  Enhanced4DEyeIcon,
  Enhanced4DActivityIcon
} from "@/components/CustomIcons";

export default function ThreatIntelligence() {
  const [threatFeeds] = useState([
    {
      source: "CrowdStrike Falcon",
      type: "APT Intelligence",
      severity: "critical",
      indicators: 847,
      confidence: 98,
      lastUpdate: "2 minutes ago",
      status: "active",
      geography: "Global",
      category: "Malware"
    },
    {
      source: "IBM X-Force",
      type: "Vulnerability Intel",
      severity: "high", 
      indicators: 1203,
      confidence: 95,
      lastUpdate: "15 minutes ago",
      status: "active",
      geography: "Global",
      category: "Exploits"
    },
    {
      source: "Microsoft Defender",
      type: "Email Threats",
      severity: "medium",
      indicators: 2847,
      confidence: 87,
      lastUpdate: "5 minutes ago", 
      status: "active",
      geography: "Americas",
      category: "Phishing"
    },
    {
      source: "AlienVault OTX",
      type: "IoC Database",
      severity: "medium",
      indicators: 5284,
      confidence: 82,
      lastUpdate: "30 minutes ago",
      status: "active", 
      geography: "Global",
      category: "Multi-Vector"
    }
  ]);

  const [recentThreats] = useState([
    {
      id: "THR-2024-0847",
      name: "APT29 CloudHopper Campaign",
      severity: "critical",
      confidence: 97,
      firstSeen: "2 hours ago",
      affectedSectors: ["Government", "Healthcare", "Finance"],
      iocs: 24,
      source: "CrowdStrike"
    },
    {
      id: "THR-2024-0846", 
      name: "Ransomware.BlackCat.v3",
      severity: "high",
      confidence: 94,
      firstSeen: "6 hours ago",
      affectedSectors: ["Education", "Manufacturing"],
      iocs: 18,
      source: "IBM X-Force"
    },
    {
      id: "THR-2024-0845",
      name: "Business Email Compromise Wave",
      severity: "medium",
      confidence: 89,
      firstSeen: "1 day ago",
      affectedSectors: ["All Sectors"],
      iocs: 156,
      source: "Microsoft Defender"
    }
  ]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical": return "bg-red-600";
      case "high": return "bg-orange-600";
      case "medium": return "bg-yellow-600";
      case "low": return "bg-blue-600";
      default: return "bg-gray-600";
    }
  };

  const getSeverityBorder = (severity: string) => {
    switch (severity) {
      case "critical": return "border-red-500/30";
      case "high": return "border-orange-500/30";
      case "medium": return "border-yellow-500/30";
      case "low": return "border-blue-500/30";
      default: return "border-gray-500/30";
    }
  };

  return (
    <div className="ai-dashboard-bg min-h-screen">
      {/* Header */}
      <header className="bg-surface/90 backdrop-blur-md border-b border-surface-light p-6 cyber-glow">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-red-400 to-pink-500 rounded-lg flex items-center justify-center">
                <Enhanced4DBrainIcon className="w-5 h-5 text-white" size={20} />
              </div>
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-red-400 to-pink-500 bg-clip-text text-transparent flex items-center space-x-2">
                  <span>Threat Intelligence</span>
                  <Enhanced4DShieldIcon className="w-6 h-6 text-red-400" size={24} />
                  <AlertTriangle className="w-6 h-6 text-orange-400" />
                </h2>
                <p className="text-gray-400 flex items-center space-x-2">
                  <span>Real-time global threat intelligence feeds and analysis</span>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                    <span className="text-red-400 text-xs">Live Feeds Active</span>
                  </div>
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search IOCs, threats, campaigns..."
                className="bg-background border-surface-light pl-10 w-80 text-sm focus:border-red-500"
                data-testid="threat-search"
              />
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            </div>
            <Button variant="outline" className="border-red-500 text-red-400" data-testid="filter-threats">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button className="bg-red-600 hover:bg-red-700" data-testid="export-intel">
              <Download className="w-4 h-4 mr-2" />
              Export Intel
            </Button>
          </div>
        </div>
      </header>

      <main className="p-6">
        {/* Intelligence Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-surface/80 backdrop-blur-md border border-red-500/30 cyber-glow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Enhanced4DBrainIcon className="w-8 h-8 text-red-400" size={32} />
                <Badge className="bg-red-600">Live</Badge>
              </div>
              <div className="text-3xl font-bold text-white mb-2">12,847</div>
              <div className="text-sm text-gray-400">Active Indicators</div>
              <div className="text-xs text-red-400 mt-1">+247 in last hour</div>
            </CardContent>
          </Card>

          <Card className="bg-surface/80 backdrop-blur-md border border-orange-500/30 cyber-glow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <AlertTriangle className="w-8 h-8 text-orange-400" />
                <Badge className="bg-orange-600">High</Badge>
              </div>
              <div className="text-3xl font-bold text-white mb-2">847</div>
              <div className="text-sm text-gray-400">Critical Threats</div>
              <div className="text-xs text-orange-400 mt-1">24 new today</div>
            </CardContent>
          </Card>

          <Card className="bg-surface/80 backdrop-blur-md border border-purple-500/30 cyber-glow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <TrendingUp className="w-8 h-8 text-purple-400" />
                <Badge className="bg-purple-600">Trending</Badge>
              </div>
              <div className="text-3xl font-bold text-white mb-2">94%</div>
              <div className="text-sm text-gray-400">Confidence Score</div>
              <div className="text-xs text-purple-400 mt-1">+2% from last week</div>
            </CardContent>
          </Card>

          <Card className="bg-surface/80 backdrop-blur-md border border-green-500/30 cyber-glow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Enhanced4DShieldIcon className="w-8 h-8 text-green-400" size={32} />
                <Badge className="bg-green-600">Protected</Badge>
              </div>
              <div className="text-3xl font-bold text-white mb-2">1,247</div>
              <div className="text-sm text-gray-400">Blocked Attacks</div>
              <div className="text-xs text-green-400 mt-1">97% prevention rate</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="feeds" className="space-y-6">
          <TabsList className="bg-surface border border-surface-light">
            <TabsTrigger value="feeds" className="data-[state=active]:bg-red-600">
              <Database className="w-4 h-4 mr-2" />
              Intelligence Feeds
            </TabsTrigger>
            <TabsTrigger value="threats" className="data-[state=active]:bg-orange-600">
              <Enhanced4DTargetIcon className="w-4 h-4 mr-2" size={16} />
              Active Threats
            </TabsTrigger>
            <TabsTrigger value="analysis" className="data-[state=active]:bg-purple-600">
              <Enhanced4DBrainIcon className="w-4 h-4 mr-2" size={16} />
              AI Analysis
            </TabsTrigger>
            <TabsTrigger value="geography" className="data-[state=active]:bg-blue-600">
              <MapPin className="w-4 h-4 mr-2" />
              Geographic Intel
            </TabsTrigger>
          </TabsList>

          {/* Intelligence Feeds */}
          <TabsContent value="feeds" className="space-y-6">
            <Card className="bg-surface/80 backdrop-blur-md border border-red-500/30 cyber-glow">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-white">Active Intelligence Feeds</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {threatFeeds.map((feed, index) => (
                    <Card key={index} className={`bg-background/50 border ${getSeverityBorder(feed.severity)}`}>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-2">
                            <div className={`w-3 h-3 rounded-full ${
                              feed.status === 'active' ? 'bg-green-400 animate-pulse' : 'bg-gray-400'
                            }`}></div>
                            <span className="font-medium text-white">{feed.source}</span>
                          </div>
                          <Badge className={getSeverityColor(feed.severity)}>
                            {feed.severity}
                          </Badge>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Type:</span>
                            <span className="text-white">{feed.type}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Active Indicators:</span>
                            <span className="text-white">{feed.indicators.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Confidence:</span>
                            <span className="text-green-400">{feed.confidence}%</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Last Update:</span>
                            <span className="text-white">{feed.lastUpdate}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Geography:</span>
                            <span className="text-white">{feed.geography}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Category:</span>
                            <span className="text-purple-400">{feed.category}</span>
                          </div>
                        </div>
                        
                        <div className="mt-4 flex space-x-2">
                          <Button size="sm" variant="outline" className="flex-1">
                            View Details
                          </Button>
                          <Button size="sm" variant="ghost" className="text-gray-400">
                            <RefreshCw className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Active Threats */}
          <TabsContent value="threats" className="space-y-6">
            <Card className="bg-surface/80 backdrop-blur-md border border-orange-500/30 cyber-glow">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-white">Active Threat Campaigns</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentThreats.map((threat, index) => (
                    <Card key={index} className={`bg-background/50 border ${getSeverityBorder(threat.severity)}`}>
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <div className={`w-3 h-3 rounded-full ${
                                threat.severity === 'critical' ? 'bg-red-500 animate-pulse' : 
                                threat.severity === 'high' ? 'bg-orange-500' : 'bg-yellow-500'
                              }`}></div>
                              <h3 className="text-lg font-medium text-white">{threat.name}</h3>
                              <Badge className={getSeverityColor(threat.severity)}>
                                {threat.severity}
                              </Badge>
                            </div>
                            <div className="text-sm text-gray-400 mb-3">ID: {threat.id}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-gray-400">Confidence</div>
                            <div className="text-lg font-bold text-green-400">{threat.confidence}%</div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          <div>
                            <div className="text-xs text-gray-400">First Seen</div>
                            <div className="text-sm text-white">{threat.firstSeen}</div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-400">IOCs</div>
                            <div className="text-sm text-purple-400">{threat.iocs}</div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-400">Source</div>
                            <div className="text-sm text-cyan-400">{threat.source}</div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-400">Sectors</div>
                            <div className="text-sm text-white">{threat.affectedSectors.length}</div>
                          </div>
                        </div>

                        <div className="mb-4">
                          <div className="text-xs text-gray-400 mb-2">Affected Sectors</div>
                          <div className="flex flex-wrap gap-2">
                            {threat.affectedSectors.map((sector, i) => (
                              <Badge key={i} variant="outline" className="text-xs border-purple-500 text-purple-400">
                                {sector}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="flex justify-between items-center">
                          <div className="flex space-x-2">
                            <Button size="sm" className="bg-red-600 hover:bg-red-700">
                              <Enhanced4DEyeIcon className="w-4 h-4 mr-2" size={16} />
                              Investigate
                            </Button>
                            <Button size="sm" variant="outline">
                              Block IOCs
                            </Button>
                          </div>
                          <div className="text-xs text-gray-400">
                            Auto-updated: {threat.firstSeen}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* AI Analysis */}
          <TabsContent value="analysis" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-surface/80 backdrop-blur-md border border-purple-500/30 cyber-glow">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-white flex items-center">
                    <Enhanced4DBrainIcon className="w-5 h-5 mr-2 text-purple-400" size={20} />
                    AI Threat Correlation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-purple-900/20 rounded-lg border border-purple-600/50">
                      <div className="text-sm text-purple-400 font-medium mb-2">Campaign Clustering</div>
                      <div className="text-xs text-gray-400 mb-3">AI has identified 3 related campaigns targeting education sector</div>
                      <div className="flex justify-between items-center">
                        <div className="text-sm text-white">Confidence: 97%</div>
                        <Button size="sm" variant="outline" className="border-purple-600 text-purple-400">
                          View Cluster
                        </Button>
                      </div>
                    </div>

                    <div className="p-4 bg-red-900/20 rounded-lg border border-red-600/50">
                      <div className="text-sm text-red-400 font-medium mb-2">Attribution Analysis</div>
                      <div className="text-xs text-gray-400 mb-3">Pattern matches indicate APT29 involvement in recent campaigns</div>
                      <div className="flex justify-between items-center">
                        <div className="text-sm text-white">Confidence: 89%</div>
                        <Button size="sm" variant="outline" className="border-red-600 text-red-400">
                          View Analysis
                        </Button>
                      </div>
                    </div>

                    <div className="p-4 bg-orange-900/20 rounded-lg border border-orange-600/50">
                      <div className="text-sm text-orange-400 font-medium mb-2">Predictive Modeling</div>
                      <div className="text-xs text-gray-400 mb-3">High probability of email-based attacks targeting finance sector</div>
                      <div className="flex justify-between items-center">
                        <div className="text-sm text-white">Risk Score: 85%</div>
                        <Button size="sm" variant="outline" className="border-orange-600 text-orange-400">
                          View Forecast
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-surface/80 backdrop-blur-md border border-cyan-500/30 cyber-glow">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-white flex items-center">
                    <Enhanced4DActivityIcon className="w-5 h-5 mr-2 text-cyan-400" size={20} />
                    Intelligence Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-400">Feed Coverage</span>
                        <span className="text-white">94%</span>
                      </div>
                      <Progress value={94} className="h-2" />
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-400">Data Quality</span>
                        <span className="text-white">97%</span>
                      </div>
                      <Progress value={97} className="h-2" />
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-400">Response Time</span>
                        <span className="text-white">87%</span>
                      </div>
                      <Progress value={87} className="h-2" />
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-400">False Positive Rate</span>
                        <span className="text-white">3%</span>
                      </div>
                      <Progress value={3} className="h-2" />
                    </div>

                    <div className="pt-4 border-t border-gray-700">
                      <div className="text-sm text-gray-400 mb-3">Processing Statistics</div>
                      <div className="grid grid-cols-2 gap-4 text-center">
                        <div>
                          <div className="text-2xl font-bold text-cyan-400">2.1M</div>
                          <div className="text-xs text-gray-400">Events/Day</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-green-400">847ms</div>
                          <div className="text-xs text-gray-400">Avg Processing</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Geographic Intelligence */}
          <TabsContent value="geography" className="space-y-6">
            <Card className="bg-surface/80 backdrop-blur-md border border-blue-500/30 cyber-glow">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-white">Geographic Threat Intelligence</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <Card className="bg-background/50 border border-red-500/30">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <MapPin className="w-6 h-6 text-red-400" />
                        <Badge className="bg-red-600">High Risk</Badge>
                      </div>
                      <h3 className="text-lg font-medium text-white mb-2">Eastern Europe</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Active Threats:</span>
                          <span className="text-red-400">247</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">APT Groups:</span>
                          <span className="text-white">8</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">IOCs:</span>
                          <span className="text-white">1,847</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-background/50 border border-orange-500/30">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <MapPin className="w-6 h-6 text-orange-400" />
                        <Badge className="bg-orange-600">Medium Risk</Badge>
                      </div>
                      <h3 className="text-lg font-medium text-white mb-2">Southeast Asia</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Active Threats:</span>
                          <span className="text-orange-400">156</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">APT Groups:</span>
                          <span className="text-white">5</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">IOCs:</span>
                          <span className="text-white">1,203</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-background/50 border border-blue-500/30">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <MapPin className="w-6 h-6 text-blue-400" />
                        <Badge className="bg-blue-600">Low Risk</Badge>
                      </div>
                      <h3 className="text-lg font-medium text-white mb-2">North America</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Active Threats:</span>
                          <span className="text-blue-400">89</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">APT Groups:</span>
                          <span className="text-white">3</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">IOCs:</span>
                          <span className="text-white">892</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}