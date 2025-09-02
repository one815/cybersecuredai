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
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { 
  Target,
  Globe,
  Users,
  Activity,
  AlertTriangle,
  Shield,
  Eye,
  Search,
  Upload,
  Download,
  Filter,
  RefreshCw,
  TrendingUp,
  Calendar,
  Clock,
  MapPin,
  Flag,
  Zap,
  Brain,
  Network,
  FileText,
  BarChart3,
  PieChart,
  LineChart
} from "lucide-react";

interface APTGroup {
  id: string;
  name: string;
  aliases: string[];
  description: string;
  firstSeen: Date;
  lastSeen: Date;
  motivation: string[];
  sophistication: 'low' | 'medium' | 'high' | 'expert';
  resource: 'individual' | 'group' | 'government' | 'syndicate';
  attribution: {
    confidence: 'low' | 'medium' | 'high';
    assessmentDate: Date;
    analyst: string;
    reasoning: string;
    sources: string[];
    geopoliticalContext: string;
  };
}

interface ThreatIndicator {
  id: string;
  type: 'ip' | 'domain' | 'hash' | 'url' | 'email';
  value: string;
  confidence: number;
  firstSeen: Date;
  lastSeen: Date;
  tlp: 'white' | 'green' | 'amber' | 'red';
  source: string;
  associatedGroups: string[];
}

interface OTXPulse {
  id: string;
  name: string;
  description: string;
  author: string;
  created: Date;
  modified: Date;
  tags: string[];
  malwareFamilies: string[];
  attackIds: string[];
  industries: string[];
  targetedCountries: string[];
}

export default function ThreatConnectAttribution() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState<"all" | "ip" | "domain" | "hash">("all");
  const [selectedAPT, setSelectedAPT] = useState<APTGroup | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [attributionInput, setAttributionInput] = useState("");
  const [attributionContext, setAttributionContext] = useState("");

  // Fetch APT groups from ThreatConnect
  const { data: aptGroups = [], isLoading: loadingAPTs } = useQuery({
    queryKey: ['/api/threatconnect/apt-groups'],
    refetchInterval: 300000 // Refresh every 5 minutes
  });

  // Fetch OTX threat pulses
  const { data: otxPulsesData, isLoading: loadingOTX } = useQuery({
    queryKey: ['/api/otx/pulses'],
    refetchInterval: 600000 // Refresh every 10 minutes
  });
  const otxPulses = otxPulsesData?.pulses || [];

  // Fetch APT intelligence from OTX
  const { data: otxAPTIntel = [], isLoading: loadingAPTIntel } = useQuery({
    queryKey: ['/api/otx/apt-intelligence'],
    refetchInterval: 600000
  });

  // Search indicators mutation
  const searchMutation = useMutation({
    mutationFn: async (params: { query: string; type?: string }) => {
      const queryParams = new URLSearchParams({ q: params.query });
      if (params.type && params.type !== 'all') queryParams.append('type', params.type);
      return apiRequest(`/api/threatconnect/indicators/search?${queryParams}`);
    },
    onSuccess: () => {
      toast({
        title: "Search Complete",
        description: "Threat indicators found and analyzed for attribution.",
      });
    }
  });

  // Submit for attribution mutation
  const attributionMutation = useMutation({
    mutationFn: async (data: { indicator: string; type: string; context?: string }) => {
      return apiRequest('/api/threatconnect/attribution/submit', {
        method: 'POST',
        body: JSON.stringify(data)
      });
    },
    onSuccess: () => {
      toast({
        title: "Attribution Analysis Submitted",
        description: "Your indicator has been submitted for expert attribution analysis.",
      });
      setAttributionInput("");
      setAttributionContext("");
    }
  });

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    searchMutation.mutate({ query: searchQuery, type: searchType });
  };

  const handleAttributionSubmit = () => {
    if (!attributionInput.trim()) return;
    
    // Auto-detect type
    const type = attributionInput.includes('.') ? 
      (attributionInput.match(/\d+\.\d+\.\d+\.\d+/) ? 'ip' : 'domain') : 'hash';
    
    attributionMutation.mutate({
      indicator: attributionInput,
      type,
      context: attributionContext
    });
  };

  const getSophisticationColor = (sophistication: string) => {
    switch (sophistication) {
      case 'expert': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getConfidenceColor = (confidence: string) => {
    switch (confidence) {
      case 'high': return 'text-green-400 bg-green-900/30 border-green-700/50';
      case 'medium': return 'text-yellow-400 bg-yellow-900/30 border-yellow-700/50';
      case 'low': return 'text-red-400 bg-red-900/30 border-red-700/50';
      default: return 'text-gray-400 bg-gray-900/30 border-gray-700/50';
    }
  };

  const getTLPColor = (tlp: string) => {
    switch (tlp) {
      case 'red': return 'bg-red-500 text-white';
      case 'amber': return 'bg-orange-500 text-white';
      case 'green': return 'bg-green-500 text-white';
      case 'white': return 'bg-gray-100 text-black';
      default: return 'bg-gray-500 text-white';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-midnight-blue via-midnight-blue/95 to-midnight-blue/90 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">ThreatConnect APT Attribution</h1>
            <p className="text-gray-300">Advanced Persistent Threat Analysis & Attribution Intelligence</p>
          </div>
          <div className="flex items-center space-x-3">
            <Badge variant="outline" className="text-spring-green border-spring-green">
              <Target className="w-3 h-3 mr-1" />
              Enterprise APT Platform
            </Badge>
            <Badge variant="outline" className="text-neon-orange border-neon-orange">
              <Brain className="w-3 h-3 mr-1" />
              AI-Powered Attribution
            </Badge>
          </div>
        </div>

        {/* Quick Actions & Search */}
        <Card className="bg-midnight-blue/60 border-gray-700/30">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-white">
              <Search className="w-5 h-5 text-spring-green" />
              <span>Threat Intelligence Lookup & Attribution</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex space-x-4">
              <div className="flex-1">
                <Label htmlFor="search-input" className="text-gray-300">Search Indicators</Label>
                <Input
                  id="search-input"
                  data-testid="input-threat-search"
                  placeholder="Enter IP, domain, hash, or URL..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-midnight-blue/40 border-gray-600 text-white"
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
              </div>
              <div className="w-40">
                <Label htmlFor="search-type" className="text-gray-300">Type</Label>
                <Select value={searchType} onValueChange={(value: any) => setSearchType(value)}>
                  <SelectTrigger data-testid="select-search-type" className="bg-midnight-blue/40 border-gray-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="ip">IP Address</SelectItem>
                    <SelectItem value="domain">Domain</SelectItem>
                    <SelectItem value="hash">File Hash</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end">
                <Button 
                  data-testid="button-search-threats"
                  onClick={handleSearch}
                  disabled={searchMutation.isPending}
                  className="bg-spring-green hover:bg-spring-green/90 text-midnight-blue"
                >
                  {searchMutation.isPending ? (
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Search className="w-4 h-4 mr-2" />
                  )}
                  Search
                </Button>
              </div>
            </div>

            {/* Submit for Attribution */}
            <div className="border-t border-gray-700/50 pt-4">
              <h4 className="text-white font-medium mb-3">Submit Indicator for Expert Attribution</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-1">
                  <Label htmlFor="attribution-input" className="text-gray-300">Indicator</Label>
                  <Input
                    id="attribution-input"
                    data-testid="input-attribution-indicator"
                    placeholder="IP, domain, or hash..."
                    value={attributionInput}
                    onChange={(e) => setAttributionInput(e.target.value)}
                    className="bg-midnight-blue/40 border-gray-600 text-white"
                  />
                </div>
                <div className="md:col-span-1">
                  <Label htmlFor="attribution-context" className="text-gray-300">Context (Optional)</Label>
                  <Textarea
                    id="attribution-context"
                    data-testid="input-attribution-context"
                    placeholder="Additional context or incident details..."
                    value={attributionContext}
                    onChange={(e) => setAttributionContext(e.target.value)}
                    className="bg-midnight-blue/40 border-gray-600 text-white h-10"
                  />
                </div>
                <div className="flex items-end">
                  <Button 
                    data-testid="button-submit-attribution"
                    onClick={handleAttributionSubmit}
                    disabled={attributionMutation.isPending}
                    className="bg-neon-orange hover:bg-neon-orange/90 text-midnight-blue w-full"
                  >
                    {attributionMutation.isPending ? (
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <Upload className="w-4 h-4 mr-2" />
                    )}
                    Submit for Attribution
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="apt-groups" className="space-y-6">
          <TabsList className="bg-midnight-blue/40 border-gray-700/30">
            <TabsTrigger value="apt-groups" data-testid="tab-apt-groups">APT Groups</TabsTrigger>
            <TabsTrigger value="indicators" data-testid="tab-indicators">Threat Indicators</TabsTrigger>
            <TabsTrigger value="otx-intelligence" data-testid="tab-otx-intelligence">OTX Intelligence</TabsTrigger>
            <TabsTrigger value="campaigns" data-testid="tab-campaigns">Active Campaigns</TabsTrigger>
            <TabsTrigger value="attribution" data-testid="tab-attribution">Attribution Analytics</TabsTrigger>
          </TabsList>

          {/* APT Groups Tab */}
          <TabsContent value="apt-groups" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-white">Known APT Groups</h2>
              <Button 
                data-testid="button-refresh-apt-groups"
                variant="outline" 
                size="sm"
                onClick={() => queryClient.invalidateQueries({ queryKey: ['/api/threatconnect/apt-groups'] })}
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
            </div>
            
            {loadingAPTs ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <Card key={i} className="bg-midnight-blue/60 border-gray-700/30 animate-pulse">
                    <CardContent className="p-6">
                      <div className="h-4 bg-gray-700 rounded mb-2"></div>
                      <div className="h-3 bg-gray-700 rounded w-3/4 mb-4"></div>
                      <div className="space-y-2">
                        <div className="h-2 bg-gray-700 rounded"></div>
                        <div className="h-2 bg-gray-700 rounded w-2/3"></div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {aptGroups.map((apt: APTGroup) => (
                  <Card 
                    key={apt.id} 
                    className="bg-midnight-blue/60 border-gray-700/30 hover:border-spring-green/50 transition-colors cursor-pointer"
                    onClick={() => setSelectedAPT(apt)}
                    data-testid={`card-apt-group-${apt.id}`}
                  >
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-white">{apt.name}</h3>
                          <p className="text-sm text-gray-400">
                            {apt.aliases.slice(0, 2).join(', ')}
                            {apt.aliases.length > 2 && ` +${apt.aliases.length - 2} more`}
                          </p>
                        </div>
                        <div className="flex flex-col items-end space-y-2">
                          <div className={`w-3 h-3 rounded-full ${getSophisticationColor(apt.sophistication)}`} 
                               title={`Sophistication: ${apt.sophistication}`}></div>
                          <Badge className={getConfidenceColor(apt.attribution.confidence)} variant="outline">
                            {apt.attribution.confidence} confidence
                          </Badge>
                        </div>
                      </div>
                      
                      <p className="text-gray-300 text-sm mb-4 line-clamp-2">{apt.description}</p>
                      
                      <div className="grid grid-cols-2 gap-4 text-xs">
                        <div>
                          <p className="text-gray-400">First Seen</p>
                          <p className="text-white">{new Date(apt.firstSeen).getFullYear()}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Resource</p>
                          <p className="text-white capitalize">{apt.resource}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Motivation</p>
                          <p className="text-white">{apt.motivation.slice(0, 2).join(', ')}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Last Active</p>
                          <p className="text-white">
                            {Math.floor((Date.now() - new Date(apt.lastSeen).getTime()) / (1000 * 60 * 60 * 24))}d ago
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Search Results Tab */}
          <TabsContent value="indicators" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-white">Threat Indicator Search Results</h2>
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="text-spring-green border-spring-green">
                  <Activity className="w-3 h-3 mr-1" />
                  {searchMutation.data?.length || 0} Results
                </Badge>
              </div>
            </div>
            
            {searchMutation.isPending && (
              <div className="text-center py-8">
                <RefreshCw className="w-8 h-8 text-spring-green animate-spin mx-auto mb-4" />
                <p className="text-gray-300">Searching threat intelligence databases...</p>
              </div>
            )}
            
            {searchMutation.data && (
              <div className="space-y-4">
                {searchMutation.data.map((indicator: ThreatIndicator) => (
                  <Card 
                    key={indicator.id} 
                    className="bg-midnight-blue/60 border-gray-700/30"
                    data-testid={`card-indicator-${indicator.id}`}
                  >
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-lg font-semibold text-white font-mono">{indicator.value}</h3>
                            <Badge className={getTLPColor(indicator.tlp)} variant="outline">
                              TLP:{indicator.tlp.toUpperCase()}
                            </Badge>
                            <Badge variant="outline" className="text-gray-300 border-gray-500">
                              {indicator.type.toUpperCase()}
                            </Badge>
                          </div>
                          <p className="text-gray-400">Source: {indicator.source}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-spring-green">{indicator.confidence}%</div>
                          <div className="text-xs text-gray-400">Confidence</div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
                        <div>
                          <p className="text-gray-400">First Seen</p>
                          <p className="text-white">{new Date(indicator.firstSeen).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Last Seen</p>
                          <p className="text-white">{new Date(indicator.lastSeen).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Associated Groups</p>
                          <p className="text-white">{indicator.associatedGroups.length} groups</p>
                        </div>
                        <div>
                          <p className="text-gray-400">TLP Classification</p>
                          <p className="text-white capitalize">{indicator.tlp}</p>
                        </div>
                      </div>
                      
                      {indicator.associatedGroups.length > 0 && (
                        <div className="bg-red-900/20 border border-red-700/30 rounded-lg p-3">
                          <h5 className="text-red-400 font-medium mb-2">Associated APT Groups</h5>
                          <div className="flex flex-wrap gap-2">
                            {indicator.associatedGroups.map((group) => (
                              <Badge key={group} className="bg-red-800/30 text-red-300 border-red-700">
                                {group.toUpperCase()}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
            
            {searchMutation.data && searchMutation.data.length === 0 && (
              <div className="text-center py-8">
                <Target className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                <p className="text-gray-400">No threat indicators found for your search.</p>
              </div>
            )}
          </TabsContent>

          {/* OTX Intelligence Tab */}
          <TabsContent value="otx-intelligence" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-white">AT&T OTX Threat Intelligence</h2>
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="text-spring-green border-spring-green">
                  <Globe className="w-3 h-3 mr-1" />
                  Community Intelligence
                </Badge>
                <Badge variant="outline" className="text-neon-orange border-neon-orange">
                  <Zap className="w-3 h-3 mr-1" />
                  Real-time
                </Badge>
              </div>
            </div>
            
            {loadingOTX ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[...Array(4)].map((_, i) => (
                  <Card key={i} className="bg-midnight-blue/60 border-gray-700/30 animate-pulse">
                    <CardContent className="p-6">
                      <div className="h-4 bg-gray-700 rounded mb-2"></div>
                      <div className="h-3 bg-gray-700 rounded w-3/4 mb-4"></div>
                      <div className="space-y-2">
                        <div className="h-2 bg-gray-700 rounded"></div>
                        <div className="h-2 bg-gray-700 rounded w-2/3"></div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {otxPulses.map((pulse: OTXPulse) => (
                  <Card 
                    key={pulse.id} 
                    className="bg-midnight-blue/60 border-gray-700/30 hover:border-neon-orange/50 transition-colors"
                    data-testid={`card-otx-pulse-${pulse.id}`}
                  >
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-white mb-1">{pulse.name}</h3>
                          <p className="text-sm text-gray-400">by {pulse.author}</p>
                        </div>
                        <div className="text-right text-xs text-gray-400">
                          <p>{new Date(pulse.created).toLocaleDateString()}</p>
                          <p>{new Date(pulse.modified).toLocaleDateString()}</p>
                        </div>
                      </div>
                      
                      <p className="text-gray-300 text-sm mb-4 line-clamp-2">{pulse.description}</p>
                      
                      {pulse.tags.length > 0 && (
                        <div className="mb-4">
                          <p className="text-gray-400 text-xs mb-2">Tags</p>
                          <div className="flex flex-wrap gap-1">
                            {pulse.tags.slice(0, 4).map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs text-gray-300 border-gray-500">
                                {tag}
                              </Badge>
                            ))}
                            {pulse.tags.length > 4 && (
                              <Badge variant="outline" className="text-xs text-gray-400 border-gray-600">
                                +{pulse.tags.length - 4} more
                              </Badge>
                            )}
                          </div>
                        </div>
                      )}
                      
                      {pulse.targetedCountries.length > 0 && (
                        <div className="bg-orange-900/20 border border-orange-700/30 rounded-lg p-3">
                          <div className="flex items-center space-x-2 mb-2">
                            <Flag className="w-4 h-4 text-orange-400" />
                            <span className="text-orange-400 font-medium text-sm">Targeted Regions</span>
                          </div>
                          <p className="text-orange-300 text-sm">{pulse.targetedCountries.join(', ')}</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Active Campaigns Tab */}
          <TabsContent value="campaigns" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-white">Active APT Campaigns</h2>
              <Badge variant="outline" className="text-red-400 border-red-500">
                <AlertTriangle className="w-3 h-3 mr-1" />
                High Priority Tracking
              </Badge>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Mock active campaigns for demonstration */}
              {[
                {
                  id: 'camp_001',
                  name: 'Operation Ghost Writer',
                  aptGroup: 'APT29',
                  status: 'Active',
                  confidence: 'High',
                  targets: ['Government', 'Healthcare', 'Technology'],
                  startDate: '2024-12-15',
                  indicatorCount: 47,
                  lastActivity: '2 hours ago'
                },
                {
                  id: 'camp_002', 
                  name: 'Lazarus Financial Campaign',
                  aptGroup: 'Lazarus Group',
                  status: 'Monitoring',
                  confidence: 'Medium',
                  targets: ['Financial', 'Cryptocurrency'],
                  startDate: '2024-11-20',
                  indicatorCount: 23,
                  lastActivity: '6 hours ago'
                }
              ].map((campaign) => (
                <Card 
                  key={campaign.id} 
                  className="bg-midnight-blue/60 border-gray-700/30"
                  data-testid={`card-campaign-${campaign.id}`}
                >
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-white">{campaign.name}</h3>
                        <p className="text-sm text-gray-400">by {campaign.aptGroup}</p>
                      </div>
                      <div className="flex flex-col items-end space-y-1">
                        <Badge className={
                          campaign.status === 'Active' ? 'bg-red-500 text-white' : 'bg-yellow-500 text-black'
                        }>
                          {campaign.status}
                        </Badge>
                        <Badge className={getConfidenceColor(campaign.confidence.toLowerCase())} variant="outline">
                          {campaign.confidence}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <p className="text-gray-400 text-xs">Target Industries</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {campaign.targets.map((target) => (
                            <Badge key={target} variant="outline" className="text-xs text-gray-300 border-gray-500">
                              {target}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-xs">
                        <div>
                          <p className="text-gray-400">Campaign Start</p>
                          <p className="text-white">{new Date(campaign.startDate).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Indicators</p>
                          <p className="text-white">{campaign.indicatorCount} IOCs</p>
                        </div>
                      </div>
                      
                      <div className="bg-red-900/20 border border-red-700/30 rounded-lg p-3">
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-red-400" />
                          <span className="text-red-400 font-medium text-sm">Last Activity: {campaign.lastActivity}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Attribution Analytics Tab */}
          <TabsContent value="attribution" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-white">Attribution Analytics & Trends</h2>
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="text-spring-green border-spring-green">
                  <BarChart3 className="w-3 h-3 mr-1" />
                  ML-Enhanced
                </Badge>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Attribution Confidence Distribution */}
              <Card className="bg-midnight-blue/60 border-gray-700/30">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-white text-base">
                    <PieChart className="w-4 h-4 text-spring-green" />
                    <span>Attribution Confidence</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-300">High Confidence</span>
                      <span className="text-sm text-green-400">73%</span>
                    </div>
                    <Progress value={73} className="bg-gray-700" />
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-300">Medium Confidence</span>
                      <span className="text-sm text-yellow-400">21%</span>
                    </div>
                    <Progress value={21} className="bg-gray-700" />
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-300">Low Confidence</span>
                      <span className="text-sm text-red-400">6%</span>
                    </div>
                    <Progress value={6} className="bg-gray-700" />
                  </div>
                </CardContent>
              </Card>

              {/* Geographic Attribution */}
              <Card className="bg-midnight-blue/60 border-gray-700/30">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-white text-base">
                    <MapPin className="w-4 h-4 text-neon-orange" />
                    <span>Attribution by Region</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { region: 'Russia/CIS', percentage: 35, color: 'text-red-400' },
                      { region: 'China', percentage: 28, color: 'text-orange-400' },
                      { region: 'North Korea', percentage: 15, color: 'text-yellow-400' },
                      { region: 'Iran', percentage: 12, color: 'text-purple-400' },
                      { region: 'Other', percentage: 10, color: 'text-gray-400' }
                    ].map((item) => (
                      <div key={item.region} className="flex justify-between items-center">
                        <span className="text-sm text-gray-300">{item.region}</span>
                        <span className={`text-sm ${item.color}`}>{item.percentage}%</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card className="bg-midnight-blue/60 border-gray-700/30">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-white text-base">
                    <TrendingUp className="w-4 h-4 text-spring-green" />
                    <span>Recent Activity</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-300">New APT Groups</span>
                      <span className="text-sm text-spring-green">+3</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-300">Active Campaigns</span>
                      <span className="text-sm text-neon-orange">12</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-300">New Indicators</span>
                      <span className="text-sm text-blue-400">247</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-300">Attribution Updates</span>
                      <span className="text-sm text-purple-400">18</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
            </div>
          </TabsContent>
        </Tabs>

        {/* APT Group Detail Modal */}
        {selectedAPT && (
          <Dialog open={!!selectedAPT} onOpenChange={() => setSelectedAPT(null)}>
            <DialogContent className="max-w-4xl bg-midnight-blue border-gray-700">
              <DialogHeader>
                <DialogTitle className="text-xl text-white">{selectedAPT.name}</DialogTitle>
              </DialogHeader>
              <div className="space-y-6 max-h-96 overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-white font-medium mb-2">Group Information</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Aliases:</span>
                        <span className="text-white">{selectedAPT.aliases.join(', ')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Sophistication:</span>
                        <Badge className={getSophisticationColor(selectedAPT.sophistication)} variant="outline">
                          {selectedAPT.sophistication}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Resource Level:</span>
                        <span className="text-white capitalize">{selectedAPT.resource}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-white font-medium mb-2">Attribution Assessment</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Confidence:</span>
                        <Badge className={getConfidenceColor(selectedAPT.attribution.confidence)} variant="outline">
                          {selectedAPT.attribution.confidence}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Analyst:</span>
                        <span className="text-white">{selectedAPT.attribution.analyst}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Assessment Date:</span>
                        <span className="text-white">{new Date(selectedAPT.attribution.assessmentDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-white font-medium mb-2">Description</h4>
                  <p className="text-gray-300 text-sm">{selectedAPT.description}</p>
                </div>
                
                <div>
                  <h4 className="text-white font-medium mb-2">Geopolitical Context</h4>
                  <p className="text-gray-300 text-sm">{selectedAPT.attribution.geopoliticalContext}</p>
                </div>
                
                <div>
                  <h4 className="text-white font-medium mb-2">Attribution Reasoning</h4>
                  <p className="text-gray-300 text-sm">{selectedAPT.attribution.reasoning}</p>
                </div>
                
                <div>
                  <h4 className="text-white font-medium mb-2">Intelligence Sources</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedAPT.attribution.sources.map((source) => (
                      <Badge key={source} variant="outline" className="text-gray-300 border-gray-500">
                        {source}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
}