import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { 
  Shield, 
  Database, 
  Globe, 
  Search, 
  RefreshCw, 
  CheckCircle, 
  AlertTriangle, 
  Clock, 
  Activity, 
  TrendingUp, 
  BarChart3, 
  Filter,
  Download,
  Eye,
  Target,
  Zap,
  Server,
  Bug
} from "lucide-react";

interface ThreatIndicator {
  type: 'ip' | 'domain' | 'url' | 'hash';
  value: string;
  source: string;
  confidence: number;
  severity: 'low' | 'medium' | 'high' | 'critical';
  first_seen: string;
  last_seen: string;
  tags: string[];
  description?: string;
}

interface FeedStatus {
  name: string;
  status: 'active' | 'inactive' | 'error';
  last_update: string;
  indicators_count: number;
  error_message?: string;
}

export default function AlternativeThreatFeeds() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [indicatorType, setIndicatorType] = useState("all");
  const [severityFilter, setSeverityFilter] = useState("all");
  const [sourceFilter, setSourceFilter] = useState("all");

  // Fetch aggregated threat intelligence
  const { data: aggregatedFeeds, isLoading: feedsLoading, refetch: refetchFeeds } = useQuery<ThreatIndicator[]>({
    queryKey: ['/api/alternative-feeds/aggregated'],
    refetchInterval: 300000, // 5 minutes
  });

  // Fetch individual feed status
  const { data: feedStatus, isLoading: statusLoading } = useQuery<FeedStatus[]>({
    queryKey: ['/api/alternative-feeds/status'],
    refetchInterval: 60000, // 1 minute
  });

  // Fetch specific feed data
  const { data: sansData } = useQuery({
    queryKey: ['/api/alternative-feeds/sans'],
    refetchInterval: 300000,
  });

  const { data: otxData } = useQuery({
    queryKey: ['/api/alternative-feeds/otx'],
    refetchInterval: 300000,
  });

  const { data: openphishData } = useQuery({
    queryKey: ['/api/alternative-feeds/openphish'],
    refetchInterval: 300000,
  });

  const { data: spamhausData } = useQuery({
    queryKey: ['/api/alternative-feeds/spamhaus'],
    refetchInterval: 300000,
  });

  // Search mutation
  const searchMutation = useMutation({
    mutationFn: async (query: string): Promise<ThreatIndicator[]> => {
      const response = await apiRequest(`/api/alternative-feeds/search?q=${encodeURIComponent(query)}`);
      return response as ThreatIndicator[];
    },
    onSuccess: (result: ThreatIndicator[]) => {
      toast({
        title: "Search Complete",
        description: `Found ${result.length} matching indicators`,
      });
    },
    onError: () => {
      toast({
        title: "Search Failed",
        description: "Failed to search threat indicators. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Refresh specific feed mutation
  const refreshFeedMutation = useMutation({
    mutationFn: (feedName: string) => apiRequest(`/api/alternative-feeds/refresh/${feedName}`, 'POST'),
    onSuccess: (result, feedName) => {
      toast({
        title: "Feed Refreshed",
        description: `${feedName} has been updated successfully`,
      });
      queryClient.invalidateQueries({ queryKey: ['/api/alternative-feeds'] });
    },
    onError: (error, feedName) => {
      toast({
        title: "Refresh Failed",
        description: `Failed to refresh ${feedName}. Please try again.`,
        variant: "destructive",
      });
    },
  });

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    searchMutation.mutate(searchQuery);
  };

  const filteredIndicators = aggregatedFeeds?.filter(indicator => {
    const matchesType = indicatorType === 'all' || indicator.type === indicatorType;
    const matchesSeverity = severityFilter === 'all' || indicator.severity === severityFilter;
    const matchesSource = sourceFilter === 'all' || indicator.source === sourceFilter;
    const matchesSearch = !searchQuery || 
      indicator.value.toLowerCase().includes(searchQuery.toLowerCase()) ||
      indicator.description?.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesType && matchesSeverity && matchesSource && matchesSearch;
  }) || [];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'error': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default: return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'critical': return 'text-red-500';
      case 'high': return 'text-orange-500';
      case 'medium': return 'text-yellow-500';
      case 'low': return 'text-green-500';
      default: return 'text-blue-500';
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'critical': return 'destructive';
      case 'high': return 'default';
      case 'medium': return 'secondary';
      case 'low': return 'outline';
      default: return 'outline';
    }
  };

  const feedSources = [
    { name: 'SANS ISC', key: 'sans', icon: Shield, description: 'Internet Storm Center attacking IPs' },
    { name: 'AlienVault OTX', key: 'otx', icon: Database, description: 'Community threat intelligence' },
    { name: 'OpenPhish', key: 'openphish', icon: Bug, description: 'Real-time phishing URLs' },
    { name: 'Spamhaus DROP', key: 'spamhaus', icon: Server, description: 'Hijacked/compromised IPs' },
  ];

  return (
    <div className="space-y-6" data-testid="alternative-feeds-page">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Alternative Threat Feeds</h1>
          <p className="text-muted-foreground">Government-grade threat intelligence from trusted sources (CISA alternatives)</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="default">
            <Shield className="h-3 w-3 mr-1" />
            {feedStatus?.filter(f => f.status === 'active').length || 0} Active Sources
          </Badge>
          <Button 
            onClick={() => refetchFeeds()} 
            variant="outline" 
            size="sm"
            data-testid="button-refresh-all"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh All
          </Button>
        </div>
      </div>

      {/* Feed Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {feedSources.map((source) => {
          const status = feedStatus?.find(f => f.name.toLowerCase().includes(source.key));
          const Icon = source.icon;
          
          return (
            <Card key={source.key} data-testid={`feed-status-${source.key}`}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{source.name}</span>
                  </div>
                  {getStatusIcon(status?.status || 'inactive')}
                </div>
                <p className="text-xs text-muted-foreground mt-2">{source.description}</p>
                <div className="mt-3 flex justify-between text-sm">
                  <span>Indicators: {status?.indicators_count || 0}</span>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => refreshFeedMutation.mutate(source.key)}
                    disabled={refreshFeedMutation.isPending}
                    data-testid={`button-refresh-${source.key}`}
                  >
                    <RefreshCw className={`h-3 w-3 ${refreshFeedMutation.isPending ? 'animate-spin' : ''}`} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Search Threat Intelligence
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="md:col-span-2">
              <Label htmlFor="search-input">Search Indicators</Label>
              <div className="flex gap-2">
                <Input
                  id="search-input"
                  placeholder="IP, domain, URL, or hash..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  data-testid="input-search-indicators"
                />
                <Button 
                  onClick={handleSearch}
                  disabled={searchMutation.isPending}
                  data-testid="button-search-indicators"
                >
                  {searchMutation.isPending ? <Clock className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            
            <div>
              <Label htmlFor="type-filter">Type</Label>
              <Select value={indicatorType} onValueChange={setIndicatorType}>
                <SelectTrigger data-testid="select-indicator-type">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="ip">IP Addresses</SelectItem>
                  <SelectItem value="domain">Domains</SelectItem>
                  <SelectItem value="url">URLs</SelectItem>
                  <SelectItem value="hash">Hashes</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="severity-filter">Severity</Label>
              <Select value={severityFilter} onValueChange={setSeverityFilter}>
                <SelectTrigger data-testid="select-severity-filter">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Severities</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="source-filter">Source</Label>
              <Select value={sourceFilter} onValueChange={setSourceFilter}>
                <SelectTrigger data-testid="select-source-filter">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sources</SelectItem>
                  <SelectItem value="sans">SANS ISC</SelectItem>
                  <SelectItem value="otx">AlienVault OTX</SelectItem>
                  <SelectItem value="openphish">OpenPhish</SelectItem>
                  <SelectItem value="spamhaus">Spamhaus</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Threat Intelligence Data */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Threat Indicators
                <Badge variant="outline" className="ml-auto">
                  {filteredIndicators.length} indicators
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {feedsLoading ? (
                <div className="flex items-center justify-center py-8">
                  <Clock className="h-8 w-8 animate-spin" />
                  <span className="ml-2">Loading threat intelligence...</span>
                </div>
              ) : (
                <div className="space-y-3 max-h-96 overflow-y-auto" data-testid="threat-indicators-list">
                  {filteredIndicators.length === 0 ? (
                    <div className="text-center text-muted-foreground py-8">
                      <Target className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>No threat indicators found</p>
                      <p className="text-xs mt-1">Adjust your filters or search terms</p>
                    </div>
                  ) : (
                    filteredIndicators.slice(0, 50).map((indicator, index) => (
                      <div 
                        key={index} 
                        className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                        data-testid={`indicator-${index}`}
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <code className="text-sm font-mono bg-muted px-2 py-1 rounded truncate">
                              {indicator.value}
                            </code>
                            <Badge variant="outline" className="text-xs">
                              {indicator.type}
                            </Badge>
                            <Badge variant={getSeverityBadge(indicator.severity) as any} className="text-xs">
                              {indicator.severity}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span>Source: {indicator.source}</span>
                            <span>•</span>
                            <span>Confidence: {(indicator.confidence * 100).toFixed(0)}%</span>
                            <span>•</span>
                            <span>First seen: {new Date(indicator.first_seen).toLocaleDateString()}</span>
                          </div>
                          {indicator.description && (
                            <p className="text-xs text-muted-foreground mt-1 truncate">
                              {indicator.description}
                            </p>
                          )}
                          {indicator.tags.length > 0 && (
                            <div className="flex gap-1 mt-1">
                              {indicator.tags.slice(0, 3).map((tag, tagIndex) => (
                                <Badge key={tagIndex} variant="outline" className="text-xs px-1 py-0">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-1 ml-2">
                          <div className={`w-2 h-2 rounded-full ${getSeverityColor(indicator.severity).replace('text-', 'bg-')}`} />
                          <span className="text-xs">
                            {(indicator.confidence * 100).toFixed(0)}%
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Statistics and Analysis */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Intelligence Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {aggregatedFeeds && (
                <div className="grid grid-cols-2 gap-4" data-testid="intelligence-summary">
                  <div className="text-center">
                    <div className="text-2xl font-bold">{aggregatedFeeds.length}</div>
                    <div className="text-xs text-muted-foreground">Total Indicators</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-500">
                      {aggregatedFeeds.filter(i => i.severity === 'critical').length}
                    </div>
                    <div className="text-xs text-muted-foreground">Critical Threats</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">
                      {aggregatedFeeds.filter(i => i.type === 'ip').length}
                    </div>
                    <div className="text-xs text-muted-foreground">IP Addresses</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">
                      {aggregatedFeeds.filter(i => i.type === 'domain').length}
                    </div>
                    <div className="text-xs text-muted-foreground">Domains</div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Source Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              {aggregatedFeeds && (
                <div className="space-y-3" data-testid="source-distribution">
                  {feedSources.map((source) => {
                    const count = aggregatedFeeds.filter(i => 
                      i.source.toLowerCase().includes(source.key)
                    ).length;
                    const percentage = aggregatedFeeds.length > 0 ? (count / aggregatedFeeds.length) * 100 : 0;
                    
                    return (
                      <div key={source.key} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>{source.name}</span>
                          <span>{count} ({percentage.toFixed(1)}%)</span>
                        </div>
                        <Progress value={percentage} />
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start" data-testid="button-export-indicators">
                <Download className="h-4 w-4 mr-2" />
                Export Indicators
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start" data-testid="button-view-analytics">
                <BarChart3 className="h-4 w-4 mr-2" />
                View Analytics
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start" data-testid="button-configure-feeds">
                <Filter className="h-4 w-4 mr-2" />
                Configure Feeds
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}