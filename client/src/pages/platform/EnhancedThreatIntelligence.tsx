import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { MarketingLayout } from "@/components/MarketingLayout";
import { 
  Shield,
  Globe,
  Database,
  Eye,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  TrendingUp,
  TrendingDown,
  Activity,
  Search,
  Filter,
  Download,
  RefreshCw,
  Settings,
  Zap,
  Target,
  Users,
  Server,
  Lock,
  Unlock,
  Bug,
  Crown
} from "lucide-react";

interface ThreatFeed {
  id: string;
  name: string;
  provider: 'virustotal' | 'otx' | 'crowdstrike' | 'ibm_xforce' | 'misp' | 'shodan';
  status: 'active' | 'inactive' | 'error' | 'limited';
  lastUpdate: Date;
  threatCount: number;
  accuracy: number;
  subscription: 'free' | 'premium' | 'enterprise';
  apiCalls: number;
  apiLimit: number;
}

interface ThreatIntelligence {
  id: string;
  indicator: string;
  type: 'ip' | 'domain' | 'url' | 'hash' | 'email';
  threatType: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  source: string;
  firstSeen: Date;
  lastSeen: Date;
  confidence: number;
  tags: string[];
  description: string;
}

export default function EnhancedThreatIntelligence() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedFeed, setSelectedFeed] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [severityFilter, setSeverityFilter] = useState("all");

  // Mock data for demonstration
  const [threatFeeds] = useState<ThreatFeed[]>([
    {
      id: 'virustotal',
      name: 'VirusTotal Enhanced',
      provider: 'virustotal',
      status: 'active',
      lastUpdate: new Date(),
      threatCount: 15420,
      accuracy: 98.7,
      subscription: 'premium',
      apiCalls: 8947,
      apiLimit: 15000
    },
    {
      id: 'otx',
      name: 'AlienVault OTX',
      provider: 'otx',
      status: 'active',
      lastUpdate: new Date(Date.now() - 300000),
      threatCount: 9832,
      accuracy: 95.4,
      subscription: 'free',
      apiCalls: 2847,
      apiLimit: 10000
    },
    {
      id: 'crowdstrike',
      name: 'CrowdStrike Falcon',
      provider: 'crowdstrike',
      status: 'active',
      lastUpdate: new Date(Date.now() - 120000),
      threatCount: 7234,
      accuracy: 99.2,
      subscription: 'enterprise',
      apiCalls: 4521,
      apiLimit: 50000
    },
    {
      id: 'ibm_xforce',
      name: 'IBM X-Force',
      provider: 'ibm_xforce',
      status: 'active',
      lastUpdate: new Date(Date.now() - 180000),
      threatCount: 6789,
      accuracy: 97.8,
      subscription: 'premium',
      apiCalls: 3412,
      apiLimit: 25000
    },
    {
      id: 'misp',
      name: 'MISP Intelligence',
      provider: 'misp',
      status: 'limited',
      lastUpdate: new Date(Date.now() - 600000),
      threatCount: 12456,
      accuracy: 94.2,
      subscription: 'free',
      apiCalls: 9876,
      apiLimit: 10000
    },
    {
      id: 'shodan',
      name: 'Shodan IoT Intelligence',
      provider: 'shodan',
      status: 'inactive',
      lastUpdate: new Date(Date.now() - 3600000),
      threatCount: 4567,
      accuracy: 92.3,
      subscription: 'premium',
      apiCalls: 0,
      apiLimit: 20000
    }
  ]);

  const [threatIntelligence] = useState<ThreatIntelligence[]>([
    {
      id: 'threat_001',
      indicator: '192.168.1.100',
      type: 'ip',
      threatType: 'Command & Control',
      severity: 'critical',
      source: 'CrowdStrike Falcon',
      firstSeen: new Date('2024-01-15'),
      lastSeen: new Date(),
      confidence: 95,
      tags: ['APT29', 'nation-state', 'lateral-movement'],
      description: 'Known C2 server associated with APT29 campaign targeting educational institutions'
    },
    {
      id: 'threat_002',
      indicator: 'malicious-domain.com',
      type: 'domain',
      threatType: 'Phishing',
      severity: 'high',
      source: 'VirusTotal Enhanced',
      firstSeen: new Date('2024-01-20'),
      lastSeen: new Date(Date.now() - 3600000),
      confidence: 87,
      tags: ['phishing', 'credential-theft', 'education-sector'],
      description: 'Phishing domain mimicking popular education platforms'
    },
    {
      id: 'threat_003',
      indicator: 'ab1234567890cdef1234567890abcdef12345678',
      type: 'hash',
      threatType: 'Malware',
      severity: 'high',
      source: 'IBM X-Force',
      firstSeen: new Date('2024-01-18'),
      lastSeen: new Date(Date.now() - 7200000),
      confidence: 92,
      tags: ['ransomware', 'file-encryption', 'windows'],
      description: 'Ransomware sample targeting Windows systems in government networks'
    }
  ]);

  const refreshFeedMutation = useMutation({
    mutationFn: async (feedId: string) => {
      const response = await fetch(`/api/threat-intelligence/${feedId}/refresh`, {
        method: 'POST'
      });
      if (!response.ok) throw new Error('Failed to refresh feed');
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Feed Refreshed",
        description: "Threat intelligence feed has been successfully updated.",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/threat-intelligence'] });
    },
    onError: () => {
      toast({
        title: "Refresh Failed",
        description: "Failed to refresh threat intelligence feed.",
        variant: "destructive",
      });
    },
  });

  const searchThreatsMutation = useMutation({
    mutationFn: async (data: { query: string; filters: any }) => {
      const response = await fetch('/api/threat-intelligence/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error('Failed to search threats');
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Search Completed",
        description: "Threat intelligence search completed successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Search Failed",
        description: "Failed to search threat intelligence.",
        variant: "destructive",
      });
    },
  });

  const getProviderIcon = (provider: string) => {
    switch (provider) {
      case 'virustotal': return <Shield className="w-5 h-5 text-blue-500" />;
      case 'otx': return <Globe className="w-5 h-5 text-green-500" />;
      case 'crowdstrike': return <Crown className="w-5 h-5 text-orange-500" />;
      case 'ibm_xforce': return <Database className="w-5 h-5 text-purple-500" />;
      case 'misp': return <Eye className="w-5 h-5 text-red-500" />;
      case 'shodan': return <Search className="w-5 h-5 text-cyan-500" />;
      default: return <Server className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'inactive': return <XCircle className="w-4 h-4 text-gray-500" />;
      case 'error': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'limited': return <Clock className="w-4 h-4 text-yellow-500" />;
      default: return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'inactive': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'error': return 'bg-red-100 text-red-800 border-red-200';
      case 'limited': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500 text-white';
      case 'high': return 'bg-orange-500 text-white';
      case 'medium': return 'bg-yellow-500 text-black';
      case 'low': return 'bg-green-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getSubscriptionColor = (subscription: string) => {
    switch (subscription) {
      case 'enterprise': return 'bg-purple-100 text-purple-800';
      case 'premium': return 'bg-blue-100 text-blue-800';
      case 'free': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <MarketingLayout>
      <div className="ai-dashboard-bg min-h-screen">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold text-white mb-2 flex items-center">
                  <Eye className="w-8 h-8 mr-3 text-spring-green" />
                  Enhanced Threat Intelligence
                </h1>
                <p className="text-gray-400">
                  Advanced threat intelligence aggregation from premium security providers
                </p>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Export Report
                </Button>
                <Button 
                  className="bg-spring-green hover:bg-spring-green/80 text-midnight-blue"
                  onClick={() => {
                    threatFeeds.forEach(feed => {
                      if (feed.status === 'active') {
                        refreshFeedMutation.mutate(feed.id);
                      }
                    });
                  }}
                  disabled={refreshFeedMutation.isPending}
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  {refreshFeedMutation.isPending ? 'Refreshing...' : 'Refresh All'}
                </Button>
              </div>
            </div>
          </div>

          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-surface/80 backdrop-blur-md border border-spring-green/30 cyber-glow">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-white flex items-center">
                  <Database className="w-5 h-5 mr-2 text-spring-green" />
                  Active Feeds
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-spring-green">
                  {threatFeeds.filter(f => f.status === 'active').length}
                </div>
                <p className="text-gray-400 text-sm">of {threatFeeds.length} total</p>
              </CardContent>
            </Card>

            <Card className="bg-surface/80 backdrop-blur-md border border-spring-green/30 cyber-glow">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-white flex items-center">
                  <Target className="w-5 h-5 mr-2 text-spring-green" />
                  Threat Indicators
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-spring-green">
                  {threatFeeds.reduce((sum, feed) => sum + feed.threatCount, 0).toLocaleString()}
                </div>
                <p className="text-gray-400 text-sm">indicators tracked</p>
              </CardContent>
            </Card>

            <Card className="bg-surface/80 backdrop-blur-md border border-spring-green/30 cyber-glow">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-white flex items-center">
                  <Activity className="w-5 h-5 mr-2 text-spring-green" />
                  Accuracy Rate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-spring-green">
                  {(threatFeeds.reduce((sum, f) => sum + f.accuracy, 0) / threatFeeds.length).toFixed(1)}%
                </div>
                <p className="text-gray-400 text-sm">average accuracy</p>
              </CardContent>
            </Card>

            <Card className="bg-surface/80 backdrop-blur-md border border-spring-green/30 cyber-glow">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-white flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-2 text-spring-green" />
                  Critical Threats
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-spring-green">
                  {threatIntelligence.filter(t => t.severity === 'critical').length}
                </div>
                <p className="text-gray-400 text-sm">active threats</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <Tabs defaultValue="feeds" className="space-y-6">
            <TabsList className="bg-surface/50 border border-gray-700">
              <TabsTrigger value="feeds" className="data-[state=active]:bg-spring-green data-[state=active]:text-midnight-blue">
                Intelligence Feeds
              </TabsTrigger>
              <TabsTrigger value="threats" className="data-[state=active]:bg-spring-green data-[state=active]:text-midnight-blue">
                Threat Intelligence
              </TabsTrigger>
              <TabsTrigger value="analytics" className="data-[state=active]:bg-spring-green data-[state=active]:text-midnight-blue">
                Analytics
              </TabsTrigger>
            </TabsList>

            {/* Feeds Tab */}
            <TabsContent value="feeds" className="space-y-6">
              <div className="grid gap-6">
                {threatFeeds.map((feed) => (
                  <Card key={feed.id} className="bg-surface/80 backdrop-blur-md border border-gray-700">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          {getProviderIcon(feed.provider)}
                          <div>
                            <CardTitle className="text-white">{feed.name}</CardTitle>
                            <p className="text-gray-400 text-sm capitalize">
                              {feed.provider.replace('_', ' ')} Provider
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={getSubscriptionColor(feed.subscription)}>
                            {feed.subscription}
                          </Badge>
                          <Badge className={getStatusColor(feed.status)}>
                            {getStatusIcon(feed.status)}
                            <span className="ml-1 capitalize">{feed.status}</span>
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                        <div>
                          <p className="text-gray-400 text-sm">Threats</p>
                          <p className="text-white font-medium">{feed.threatCount.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">Accuracy</p>
                          <p className="text-white font-medium">{feed.accuracy}%</p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">API Usage</p>
                          <p className="text-white font-medium">
                            {feed.apiCalls.toLocaleString()} / {feed.apiLimit.toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">Last Update</p>
                          <p className="text-white font-medium">
                            {Math.floor((Date.now() - feed.lastUpdate.getTime()) / 60000)} min ago
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">Usage</p>
                          <Progress 
                            value={(feed.apiCalls / feed.apiLimit) * 100} 
                            className="h-2 mt-1"
                          />
                        </div>
                      </div>

                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" size="sm">
                          <Settings className="w-4 h-4 mr-1" />
                          Configure
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => refreshFeedMutation.mutate(feed.id)}
                          disabled={refreshFeedMutation.isPending || feed.status !== 'active'}
                        >
                          <RefreshCw className="w-4 h-4 mr-1" />
                          Refresh
                        </Button>
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-1" />
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Threats Tab */}
            <TabsContent value="threats" className="space-y-6">
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex-1">
                  <Input
                    placeholder="Search threat indicators (IP, domain, hash, etc.)"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-midnight-blue border-gray-600 text-white"
                  />
                </div>
                <Select value={severityFilter} onValueChange={setSeverityFilter}>
                  <SelectTrigger className="w-48 bg-midnight-blue border-gray-600 text-white">
                    <SelectValue placeholder="Filter by severity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Severities</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
                <Button 
                  className="bg-spring-green hover:bg-spring-green/80 text-midnight-blue"
                  onClick={() => {
                    searchThreatsMutation.mutate({
                      query: searchQuery,
                      filters: { severity: severityFilter }
                    });
                  }}
                  disabled={searchThreatsMutation.isPending}
                >
                  <Search className="w-4 h-4 mr-2" />
                  {searchThreatsMutation.isPending ? 'Searching...' : 'Search'}
                </Button>
              </div>

              <div className="grid gap-4">
                {threatIntelligence.map((threat) => (
                  <Card key={threat.id} className="bg-surface/80 backdrop-blur-md border border-gray-700">
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <Badge className={getSeverityColor(threat.severity)}>
                              {threat.severity.toUpperCase()}
                            </Badge>
                            <Badge variant="outline" className="text-gray-300">
                              {threat.type.toUpperCase()}
                            </Badge>
                            <span className="text-gray-400 text-sm">
                              Confidence: {threat.confidence}%
                            </span>
                          </div>
                          <h4 className="text-white font-medium text-lg mb-1">
                            {threat.indicator}
                          </h4>
                          <p className="text-gray-400 text-sm mb-2">
                            {threat.threatType} • Source: {threat.source}
                          </p>
                          <p className="text-gray-300 text-sm mb-3">
                            {threat.description}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {threat.tags.map((tag, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-gray-400 text-xs">First Seen</p>
                          <p className="text-white text-sm">{threat.firstSeen.toLocaleDateString()}</p>
                          <p className="text-gray-400 text-xs mt-2">Last Seen</p>
                          <p className="text-white text-sm">
                            {Math.floor((Date.now() - threat.lastSeen.getTime()) / 3600000)}h ago
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-1" />
                          View Details
                        </Button>
                        <Button variant="outline" size="sm">
                          <Shield className="w-4 h-4 mr-1" />
                          Block Indicator
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4 mr-1" />
                          Export
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-surface/80 backdrop-blur-md border border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <TrendingUp className="w-5 h-5 mr-2 text-spring-green" />
                      Threat Trends
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">New Threats (24h)</span>
                      <span className="text-white font-medium">+1,247</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Critical Threats</span>
                      <span className="text-red-400 font-medium">↑ 23%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">IOC Coverage</span>
                      <span className="text-green-400 font-medium">98.7%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">False Positives</span>
                      <span className="text-green-400 font-medium">↓ 12%</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-surface/80 backdrop-blur-md border border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Activity className="w-5 h-5 mr-2 text-spring-green" />
                      Feed Performance
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Average Response Time</span>
                      <span className="text-white font-medium">1.2s</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Data Freshness</span>
                      <span className="text-green-400 font-medium">Real-time</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">API Reliability</span>
                      <span className="text-green-400 font-medium">99.9%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Coverage Score</span>
                      <span className="text-white font-medium">95/100</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </MarketingLayout>
  );
}