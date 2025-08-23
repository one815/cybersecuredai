import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
  MapPin,
  Radar,
  LineChart,
  BarChart3,
  PieChart,
  Hash,
  Mail,
  Fingerprint,
  Lock,
  Wifi
} from "lucide-react";

interface ThreatFeed {
  id: string;
  source: string;
  type: string;
  severity: "critical" | "high" | "medium" | "low";
  indicators: number;
  confidence: number;
  lastUpdate: string;
  status: "active" | "inactive" | "error";
  geography: string;
  category: string;
  description?: string;
}

interface ThreatIndicator {
  id: string;
  type: "ip" | "domain" | "hash" | "email" | "url";
  value: string;
  severity: "critical" | "high" | "medium" | "low";
  confidence: number;
  firstSeen: string;
  lastSeen: string;
  source: string;
  tags: string[];
  context: string;
}

export default function ThreatIntelligenceDashboard() {
  const [selectedFeed, setSelectedFeed] = useState<string>("all");
  const [filterSeverity, setFilterSeverity] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const { data: aiAnalytics = {} } = useQuery<any>({
    queryKey: ["/api/ai/analytics"],
    refetchInterval: 30000,
  });

  const { data: threatData = [] } = useQuery<any[]>({
    queryKey: ["/api/threats"],
    refetchInterval: 30000,
  });

  const [threatFeeds] = useState<ThreatFeed[]>([
    {
      id: "1",
      source: "CrowdStrike Falcon",
      type: "APT Intelligence",
      severity: "critical",
      indicators: 847,
      confidence: 98,
      lastUpdate: "2 minutes ago",
      status: "active",
      geography: "Global",
      category: "Malware",
      description: "Advanced persistent threat indicators from global threat hunting"
    },
    {
      id: "2",
      source: "IBM X-Force",
      type: "Vulnerability Intel",
      severity: "high", 
      indicators: 1203,
      confidence: 95,
      lastUpdate: "15 minutes ago",
      status: "active",
      geography: "Global",
      category: "Exploits",
      description: "Latest vulnerability exploitation indicators and patterns"
    },
    {
      id: "3",
      source: "Microsoft Defender",
      type: "Email Threats",
      severity: "medium",
      indicators: 2847,
      confidence: 92,
      lastUpdate: "8 minutes ago",
      status: "active",
      geography: "Americas",
      category: "Phishing",
      description: "Email-based threat indicators and phishing campaigns"
    },
    {
      id: "4",
      source: "AlienVault OTX",
      type: "Open Source Intel",
      severity: "medium",
      indicators: 5621,
      confidence: 85,
      lastUpdate: "22 minutes ago",
      status: "active",
      geography: "Global",
      category: "Mixed",
      description: "Community-driven threat intelligence sharing platform"
    }
  ]);

  const [threatIndicators] = useState<ThreatIndicator[]>([
    {
      id: "1",
      type: "ip",
      value: "192.168.1.100",
      severity: "critical",
      confidence: 95,
      firstSeen: "2024-01-25 10:30:00",
      lastSeen: "2024-01-30 15:45:00",
      source: "CrowdStrike Falcon",
      tags: ["botnet", "c2", "malware"],
      context: "Command and control server for banking trojan"
    },
    {
      id: "2",
      type: "domain",
      value: "suspicious-domain.com",
      severity: "high",
      confidence: 88,
      firstSeen: "2024-01-28 08:15:00",
      lastSeen: "2024-01-30 12:20:00",
      source: "IBM X-Force",
      tags: ["phishing", "credential-theft"],
      context: "Domain used in credential harvesting campaigns"
    },
    {
      id: "3",
      type: "hash",
      value: "d41d8cd98f00b204e9800998ecf8427e",
      severity: "high",
      confidence: 92,
      firstSeen: "2024-01-29 14:22:00",
      lastSeen: "2024-01-30 16:33:00",
      source: "Microsoft Defender",
      tags: ["ransomware", "encryption"],
      context: "File hash associated with ransomware variant"
    },
    {
      id: "4",
      type: "email",
      value: "attacker@suspicious-domain.com",
      severity: "medium",
      confidence: 76,
      firstSeen: "2024-01-26 09:45:00",
      lastSeen: "2024-01-30 11:12:00",
      source: "AlienVault OTX",
      tags: ["spear-phishing", "social-engineering"],
      context: "Email address used in targeted phishing campaigns"
    }
  ]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical": return "text-red-400 border-red-500/50 bg-red-500/10";
      case "high": return "text-orange-400 border-orange-500/50 bg-orange-500/10";
      case "medium": return "text-yellow-400 border-yellow-500/50 bg-yellow-500/10";
      case "low": return "text-green-400 border-green-500/50 bg-green-500/10";
      default: return "text-gray-400 border-gray-500/50 bg-gray-500/10";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "text-green-400 border-green-500/50";
      case "inactive": return "text-gray-400 border-gray-500/50";
      case "error": return "text-red-400 border-red-500/50";
      default: return "text-gray-400 border-gray-500/50";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "ip": return <Network className="w-4 h-4" />;
      case "domain": return <Globe className="w-4 h-4" />;
      case "hash": return <Hash className="w-4 h-4" />;
      case "email": return <Mail className="w-4 h-4" />;
      case "url": return <Globe className="w-4 h-4" />;
      default: return <AlertTriangle className="w-4 h-4" />;
    }
  };

  const filteredFeeds = threatFeeds.filter(feed => {
    if (selectedFeed !== "all" && feed.source !== selectedFeed) return false;
    if (filterSeverity !== "all" && feed.severity !== filterSeverity) return false;
    return true;
  });

  const filteredIndicators = threatIndicators.filter(indicator => {
    if (searchQuery && !indicator.value.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    if (filterSeverity !== "all" && indicator.severity !== filterSeverity) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-background text-text">
      <div className="container mx-auto p-4 sm:p-6 space-y-4 sm:space-y-6">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-white flex items-center">
              <Radar className="w-8 h-8 mr-3 text-cyan-400" />
              Threat Intelligence Dashboard
            </h1>
            <p className="text-gray-300 mt-2">Advanced threat intelligence feeds and indicator analysis</p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" className="border-cyan-500/50 text-cyan-400" data-testid="button-refresh-feeds">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh Feeds
            </Button>
            <Button className="bg-cyan-600 hover:bg-cyan-700" data-testid="button-export-intel">
              <Download className="w-4 h-4 mr-2" />
              Export Intel
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
          <Card className="holographic-card border border-red-500/30">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3 mb-2">
                <AlertTriangle className="w-5 h-5 text-red-400" />
                <h3 className="text-sm font-medium text-gray-300">Critical Indicators</h3>
              </div>
              <div className="text-2xl font-bold text-red-400">
                {threatIndicators.filter(i => i.severity === 'critical').length}
              </div>
              <div className="text-xs text-gray-400 mt-1">Requiring immediate action</div>
            </CardContent>
          </Card>

          <Card className="holographic-card border border-orange-500/30">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3 mb-2">
                <Target className="w-5 h-5 text-orange-400" />
                <h3 className="text-sm font-medium text-gray-300">High Priority</h3>
              </div>
              <div className="text-2xl font-bold text-orange-400">
                {threatIndicators.filter(i => i.severity === 'high').length}
              </div>
              <div className="text-xs text-gray-400 mt-1">High confidence threats</div>
            </CardContent>
          </Card>

          <Card className="holographic-card border border-green-500/30">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3 mb-2">
                <Shield className="w-5 h-5 text-green-400" />
                <h3 className="text-sm font-medium text-gray-300">Active Feeds</h3>
              </div>
              <div className="text-2xl font-bold text-green-400">
                {threatFeeds.filter(f => f.status === 'active').length}
              </div>
              <div className="text-xs text-gray-400 mt-1">Live intelligence sources</div>
            </CardContent>
          </Card>

          <Card className="holographic-card border border-cyan-500/30">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3 mb-2">
                <Brain className="w-5 h-5 text-cyan-400" />
                <h3 className="text-sm font-medium text-gray-300">AI Analysis</h3>
              </div>
              <div className="text-2xl font-bold text-cyan-400">
                {aiAnalytics?.threatDetection?.mlModelAccuracy || 95}%
              </div>
              <div className="text-xs text-gray-400 mt-1">Detection accuracy</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="border border-surface-light bg-surface/50">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Search indicators..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-surface border-surface-light"
                  data-testid="input-search-indicators"
                />
              </div>
              <Select value={selectedFeed} onValueChange={setSelectedFeed}>
                <SelectTrigger className="w-48 bg-surface border-surface-light" data-testid="select-threat-feed">
                  <SelectValue placeholder="Select feed" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Feeds</SelectItem>
                  {threatFeeds.map(feed => (
                    <SelectItem key={feed.id} value={feed.source}>{feed.source}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={filterSeverity} onValueChange={setFilterSeverity}>
                <SelectTrigger className="w-36 bg-surface border-surface-light" data-testid="select-severity">
                  <SelectValue placeholder="Severity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Main Intelligence Dashboard */}
        <Tabs defaultValue="feeds" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-surface border border-surface-light">
            <TabsTrigger value="feeds" className="text-white">
              <Database className="w-4 h-4 mr-2" />
              Threat Feeds
            </TabsTrigger>
            <TabsTrigger value="indicators" className="text-white">
              <Target className="w-4 h-4 mr-2" />
              Indicators
            </TabsTrigger>
            <TabsTrigger value="analysis" className="text-white">
              <Brain className="w-4 h-4 mr-2" />
              AI Analysis
            </TabsTrigger>
            <TabsTrigger value="visualization" className="text-white">
              <BarChart3 className="w-4 h-4 mr-2" />
              Visualization
            </TabsTrigger>
          </TabsList>

          <TabsContent value="feeds" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredFeeds.map((feed) => (
                <Card key={feed.id} className={`border ${getSeverityColor(feed.severity)}`}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <Database className="w-5 h-5 text-cyan-400" />
                        <div>
                          <CardTitle className="text-white text-lg">{feed.source}</CardTitle>
                          <p className="text-sm text-gray-400">{feed.type}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className={getStatusColor(feed.status)}>
                          {feed.status}
                        </Badge>
                        <div className="text-xs text-gray-400 mt-1">{feed.lastUpdate}</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-300">Indicators</span>
                        <span className="text-sm font-semibold text-cyan-400">
                          {feed.indicators.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-300">Confidence</span>
                        <span className="text-sm font-semibold text-green-400">{feed.confidence}%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-300">Geography</span>
                        <span className="text-sm text-gray-400">{feed.geography}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-300">Category</span>
                        <Badge variant="outline" className="text-purple-400 border-purple-500/50">
                          {feed.category}
                        </Badge>
                      </div>
                      {feed.description && (
                        <div className="pt-2 border-t border-surface-light">
                          <p className="text-xs text-gray-400">{feed.description}</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="indicators" className="mt-6">
            <Card className="border border-surface-light bg-surface/50">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b border-surface-light">
                      <tr className="text-left">
                        <th className="p-4 text-sm font-medium text-gray-300">Type</th>
                        <th className="p-4 text-sm font-medium text-gray-300">Indicator</th>
                        <th className="p-4 text-sm font-medium text-gray-300">Severity</th>
                        <th className="p-4 text-sm font-medium text-gray-300">Confidence</th>
                        <th className="p-4 text-sm font-medium text-gray-300">Source</th>
                        <th className="p-4 text-sm font-medium text-gray-300">Last Seen</th>
                        <th className="p-4 text-sm font-medium text-gray-300">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredIndicators.map((indicator) => (
                        <tr key={indicator.id} className="border-b border-surface-light/30 hover:bg-surface/30">
                          <td className="p-4">
                            <div className="flex items-center space-x-2">
                              {getTypeIcon(indicator.type)}
                              <span className="text-sm text-gray-300 uppercase">{indicator.type}</span>
                            </div>
                          </td>
                          <td className="p-4">
                            <span className="text-sm font-mono text-cyan-400">{indicator.value}</span>
                          </td>
                          <td className="p-4">
                            <Badge className={getSeverityColor(indicator.severity)}>
                              {indicator.severity}
                            </Badge>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center space-x-2">
                              <div className="w-16 bg-surface rounded-full h-2">
                                <div 
                                  className="h-2 rounded-full bg-green-400" 
                                  style={{ width: `${indicator.confidence}%` }}
                                ></div>
                              </div>
                              <span className="text-xs text-gray-400">{indicator.confidence}%</span>
                            </div>
                          </td>
                          <td className="p-4">
                            <span className="text-sm text-gray-300">{indicator.source}</span>
                          </td>
                          <td className="p-4">
                            <span className="text-sm text-gray-400">{indicator.lastSeen}</span>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center space-x-2">
                              <Button size="sm" variant="outline" data-testid="button-view-indicator">
                                <Eye className="w-3 h-3" />
                              </Button>
                              <Button size="sm" variant="outline" data-testid="button-block-indicator">
                                <Shield className="w-3 h-3" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analysis" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border border-surface-light bg-surface/50">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Brain className="w-5 h-5 mr-2 text-cyan-400" />
                    AI Threat Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
                      <div>
                        <div className="text-sm font-medium text-cyan-400">Machine Learning Models</div>
                        <div className="text-xs text-gray-400">Active threat detection models</div>
                      </div>
                      <div className="text-xl font-bold text-cyan-400">8</div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                      <div>
                        <div className="text-sm font-medium text-green-400">Detection Accuracy</div>
                        <div className="text-xs text-gray-400">Overall model accuracy</div>
                      </div>
                      <div className="text-xl font-bold text-green-400">{aiAnalytics?.threatDetection?.mlModelAccuracy || 95}%</div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                      <div>
                        <div className="text-sm font-medium text-blue-400">Predictions Made</div>
                        <div className="text-xs text-gray-400">Today's AI predictions</div>
                      </div>
                      <div className="text-xl font-bold text-blue-400">1,247</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-surface-light bg-surface/50">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2 text-green-400" />
                    Threat Trends
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-300">Phishing Attempts</span>
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="w-4 h-4 text-red-400" />
                        <span className="text-sm text-red-400">+23%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-300">Malware Detections</span>
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="w-4 h-4 text-red-400" />
                        <span className="text-sm text-red-400">+15%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-300">DDoS Attacks</span>
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="w-4 h-4 text-yellow-400" />
                        <span className="text-sm text-yellow-400">+8%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-300">Vulnerability Exploits</span>
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="w-4 h-4 text-orange-400" />
                        <span className="text-sm text-orange-400">+31%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="visualization" className="mt-6">
            <Card className="border border-surface-light bg-surface/50">
              <CardHeader>
                <CardTitle className="text-white">Threat Intelligence Visualization</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <BarChart3 className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-400">Advanced visualization charts will be displayed here</p>
                  <p className="text-xs text-gray-500 mt-2">Including geographic threat maps, timeline analysis, and correlation graphs</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

      </div>
    </div>
  );
}