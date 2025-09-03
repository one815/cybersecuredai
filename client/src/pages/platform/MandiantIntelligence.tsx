import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { useQuery } from "@tanstack/react-query";
import { 
  Shield, 
  TrendingUp, 
  Users, 
  Zap, 
  AlertTriangle, 
  Target, 
  Globe, 
  Clock,
  Search,
  Filter,
  Download,
  ExternalLink,
  Activity,
  Brain,
  Bug
} from "lucide-react";

interface MandiantIndicator {
  id: string;
  type: 'ipv4-addr' | 'domain-name' | 'file' | 'url' | 'email-addr';
  value: string;
  pattern?: string;
  valid_from: string;
  valid_until?: string;
  labels: string[];
  confidence: number;
  severity: 'low' | 'medium' | 'high' | 'critical';
  malware_family?: string;
  threat_actor?: string;
  campaign?: string;
  first_seen: string;
  last_seen: string;
  source: string;
  description?: string;
  attribution?: {
    actor?: string;
    motivation?: string;
    sophistication?: string;
    resource_level?: string;
  };
}

interface MandiantThreatActor {
  id: string;
  name: string;
  aliases: string[];
  description: string;
  first_seen: string;
  last_seen: string;
  sophistication: 'novice' | 'practitioner' | 'expert' | 'innovator';
  resource_level: 'individual' | 'club' | 'contest' | 'team' | 'organization' | 'government';
  primary_motivation: string;
  secondary_motivations: string[];
  goals: string[];
  roles: string[];
  threat_actor_types: string[];
  attribution_scope: 'suspected' | 'possible' | 'confirmed';
  associated_campaigns: string[];
  associated_malware: string[];
  targeted_sectors: string[];
  targeted_countries: string[];
  attack_patterns: Array<{
    id: string;
    name: string;
    description: string;
  }>;
}

interface MandiantCampaign {
  id: string;
  name: string;
  description: string;
  aliases: string[];
  first_seen: string;
  last_seen: string;
  attributed_to: string[];
  associated_malware: string[];
  targeted_sectors: string[];
  targeted_countries: string[];
  objectives: string[];
  attack_patterns: string[];
  indicators_count: number;
  confidence: number;
}

interface MandiantVulnerability {
  id: string;
  cve_id?: string;
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  cvss_score?: number;
  cvss_vector?: string;
  published_date: string;
  modified_date: string;
  affected_products: string[];
  exploit_available: boolean;
  exploitation_state?: 'poc' | 'active' | 'weaponized';
  associated_malware: string[];
  references: Array<{
    source: string;
    url: string;
    description?: string;
  }>;
}

interface MandiantAnalytics {
  totalIndicators: number;
  totalThreatActors: number;
  totalCampaigns: number;
  totalVulnerabilities: number;
  recentIndicators: number;
  criticalVulnerabilities: number;
  severityBreakdown: Record<string, number>;
  typeBreakdown: Record<string, number>;
  topThreatActors: Array<{
    name: string;
    sophistication: string;
    campaigns: number;
  }>;
  activeCampaigns: number;
  apiConfigured: boolean;
}

const severityColors = {
  low: "bg-green-500",
  medium: "bg-yellow-500", 
  high: "bg-orange-500",
  critical: "bg-red-500"
};

const severityBadgeColors = {
  low: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  medium: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  high: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
  critical: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
};

export function MandiantIntelligence() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSeverity, setSelectedSeverity] = useState<string>("all");
  const [selectedType, setSelectedType] = useState<string>("all");

  // Fetch analytics data
  const { data: analytics, isLoading: analyticsLoading } = useQuery<MandiantAnalytics>({
    queryKey: ['/api/mandiant/analytics'],
    refetchInterval: 30000
  });

  // Fetch indicators
  const { data: indicators, isLoading: indicatorsLoading } = useQuery<MandiantIndicator[]>({
    queryKey: ['/api/mandiant/indicators'],
    refetchInterval: 60000
  });

  // Fetch threat actors
  const { data: threatActors, isLoading: actorsLoading } = useQuery<MandiantThreatActor[]>({
    queryKey: ['/api/mandiant/threat-actors'],
    refetchInterval: 300000
  });

  // Fetch campaigns
  const { data: campaigns, isLoading: campaignsLoading } = useQuery<MandiantCampaign[]>({
    queryKey: ['/api/mandiant/campaigns'],
    refetchInterval: 300000
  });

  // Fetch vulnerabilities
  const { data: vulnerabilities, isLoading: vulnLoading } = useQuery<MandiantVulnerability[]>({
    queryKey: ['/api/mandiant/vulnerabilities'],
    refetchInterval: 180000
  });

  // Filter indicators based on search and filters
  const filteredIndicators = indicators?.filter(indicator => {
    const matchesSearch = !searchQuery || 
      indicator.value.toLowerCase().includes(searchQuery.toLowerCase()) ||
      indicator.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      indicator.threat_actor?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesSeverity = selectedSeverity === "all" || indicator.severity === selectedSeverity;
    const matchesType = selectedType === "all" || indicator.type === selectedType;
    
    return matchesSearch && matchesSeverity && matchesType;
  }) || [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Mandiant Threat Intelligence</h1>
            <p className="text-muted-foreground mt-2">
              Advanced threat intelligence powered by Mandiant's enterprise-grade security research
            </p>
          </div>
          <div className="flex items-center space-x-2">
            {analytics?.apiConfigured ? (
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                API Connected
              </Badge>
            ) : (
              <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">
                Demo Mode
              </Badge>
            )}
          </div>
        </div>

        {!analytics?.apiConfigured && (
          <Card className="border-orange-500/30 bg-orange-500/5">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-3">
                <AlertTriangle className="h-5 w-5 text-orange-400" />
                <div>
                  <p className="text-sm text-orange-400 font-medium">Demo Mode Active</p>
                  <p className="text-xs text-muted-foreground">
                    Configure your Mandiant API key to access real-time threat intelligence data
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Analytics Overview */}
      {analytics && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Indicators</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <Target className="h-4 w-4 text-red-400" />
                <span className="text-2xl font-bold">{analytics.totalIndicators.toLocaleString()}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {analytics.recentIndicators} added this week
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Threat Actors</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-orange-400" />
                <span className="text-2xl font-bold">{analytics.totalThreatActors}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {analytics.activeCampaigns} active campaigns
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Vulnerabilities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <Bug className="h-4 w-4 text-yellow-400" />
                <span className="text-2xl font-bold">{analytics.totalVulnerabilities}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {analytics.criticalVulnerabilities} critical severity
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Campaigns</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <Activity className="h-4 w-4 text-blue-400" />
                <span className="text-2xl font-bold">{analytics.totalCampaigns}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Multi-stage attack operations
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      <Tabs defaultValue="indicators" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="indicators" data-testid="tab-indicators">
            <Target className="h-4 w-4 mr-2" />
            Indicators
          </TabsTrigger>
          <TabsTrigger value="actors" data-testid="tab-actors">
            <Users className="h-4 w-4 mr-2" />
            Threat Actors
          </TabsTrigger>
          <TabsTrigger value="campaigns" data-testid="tab-campaigns">
            <Activity className="h-4 w-4 mr-2" />
            Campaigns
          </TabsTrigger>
          <TabsTrigger value="vulnerabilities" data-testid="tab-vulnerabilities">
            <Bug className="h-4 w-4 mr-2" />
            Vulnerabilities
          </TabsTrigger>
        </TabsList>

        {/* Indicators Tab */}
        <TabsContent value="indicators" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="h-5 w-5" />
                <span>Threat Indicators</span>
              </CardTitle>
              <CardDescription>
                Real-time indicators of compromise (IOCs) from Mandiant's threat intelligence feeds
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Search and Filters */}
              <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      placeholder="Search indicators..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                      data-testid="input-search-indicators"
                    />
                  </div>
                </div>
                <Select value={selectedSeverity} onValueChange={setSelectedSeverity}>
                  <SelectTrigger className="w-full md:w-48" data-testid="select-severity">
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
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="w-full md:w-48" data-testid="select-type">
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="ipv4-addr">IP Address</SelectItem>
                    <SelectItem value="domain-name">Domain</SelectItem>
                    <SelectItem value="file">File Hash</SelectItem>
                    <SelectItem value="url">URL</SelectItem>
                    <SelectItem value="email-addr">Email</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Indicators List */}
              <div className="space-y-3">
                {indicatorsLoading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="text-muted-foreground mt-2">Loading indicators...</p>
                  </div>
                ) : filteredIndicators.length > 0 ? (
                  filteredIndicators.map((indicator) => (
                    <Card key={indicator.id} className="border-l-4 border-l-red-500" data-testid={`indicator-${indicator.id}`}>
                      <CardContent className="pt-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <Badge className={severityBadgeColors[indicator.severity]}>
                                {indicator.severity.toUpperCase()}
                              </Badge>
                              <Badge variant="outline">{indicator.type}</Badge>
                              <span className="text-sm text-muted-foreground">
                                Confidence: {indicator.confidence}%
                              </span>
                            </div>
                            <p className="font-mono text-sm bg-muted p-2 rounded">
                              {indicator.value}
                            </p>
                            {indicator.description && (
                              <p className="text-sm text-muted-foreground mt-2">
                                {indicator.description}
                              </p>
                            )}
                            <div className="flex items-center space-x-4 mt-3 text-xs text-muted-foreground">
                              {indicator.threat_actor && (
                                <span>Actor: {indicator.threat_actor}</span>
                              )}
                              {indicator.malware_family && (
                                <span>Malware: {indicator.malware_family}</span>
                              )}
                              <span>Last Seen: {new Date(indicator.last_seen).toLocaleDateString()}</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Progress value={indicator.confidence} className="w-20" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <Target className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No indicators found matching your criteria</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Threat Actors Tab */}
        <TabsContent value="actors" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>Threat Actors</span>
              </CardTitle>
              <CardDescription>
                Comprehensive profiles of known threat actors and APT groups
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {actorsLoading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="text-muted-foreground mt-2">Loading threat actors...</p>
                  </div>
                ) : threatActors && threatActors.length > 0 ? (
                  threatActors.map((actor) => (
                    <Card key={actor.id} className="border-l-4 border-l-orange-500" data-testid={`actor-${actor.id}`}>
                      <CardContent className="pt-4">
                        <div className="space-y-3">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="text-lg font-semibold">{actor.name}</h3>
                              <div className="flex items-center space-x-2 mt-1">
                                {actor.aliases.slice(0, 3).map((alias, idx) => (
                                  <Badge key={idx} variant="secondary">{alias}</Badge>
                                ))}
                                {actor.aliases.length > 3 && (
                                  <Badge variant="secondary">+{actor.aliases.length - 3}</Badge>
                                )}
                              </div>
                            </div>
                            <Badge className={
                              actor.attribution_scope === 'confirmed' ? 'bg-green-500/20 text-green-400' :
                              actor.attribution_scope === 'possible' ? 'bg-yellow-500/20 text-yellow-400' :
                              'bg-gray-500/20 text-gray-400'
                            }>
                              {actor.attribution_scope}
                            </Badge>
                          </div>

                          <p className="text-sm text-muted-foreground">{actor.description}</p>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                            <div>
                              <span className="font-medium">Sophistication:</span>
                              <p className="text-muted-foreground">{actor.sophistication}</p>
                            </div>
                            <div>
                              <span className="font-medium">Resource Level:</span>
                              <p className="text-muted-foreground">{actor.resource_level}</p>
                            </div>
                            <div>
                              <span className="font-medium">Motivation:</span>
                              <p className="text-muted-foreground">{actor.primary_motivation}</p>
                            </div>
                          </div>

                          {actor.targeted_sectors.length > 0 && (
                            <div>
                              <span className="font-medium text-sm">Targeted Sectors:</span>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {actor.targeted_sectors.slice(0, 5).map((sector, idx) => (
                                  <Badge key={idx} variant="outline" className="text-xs">{sector}</Badge>
                                ))}
                                {actor.targeted_sectors.length > 5 && (
                                  <Badge variant="outline" className="text-xs">+{actor.targeted_sectors.length - 5}</Badge>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No threat actors available</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Campaigns Tab */}
        <TabsContent value="campaigns" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="h-5 w-5" />
                <span>Active Campaigns</span>
              </CardTitle>
              <CardDescription>
                Ongoing and historical attack campaigns tracked by Mandiant
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {campaignsLoading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="text-muted-foreground mt-2">Loading campaigns...</p>
                  </div>
                ) : campaigns && campaigns.length > 0 ? (
                  campaigns.map((campaign) => (
                    <Card key={campaign.id} className="border-l-4 border-l-blue-500" data-testid={`campaign-${campaign.id}`}>
                      <CardContent className="pt-4">
                        <div className="space-y-3">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="text-lg font-semibold">{campaign.name}</h3>
                              <div className="flex items-center space-x-2 mt-1">
                                {campaign.aliases.slice(0, 2).map((alias, idx) => (
                                  <Badge key={idx} variant="secondary">{alias}</Badge>
                                ))}
                                <Badge className="bg-blue-500/20 text-blue-400">
                                  {campaign.indicators_count} indicators
                                </Badge>
                              </div>
                            </div>
                            <Progress value={campaign.confidence} className="w-24" />
                          </div>

                          <p className="text-sm text-muted-foreground">{campaign.description}</p>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {campaign.attributed_to.length > 0 && (
                              <div>
                                <span className="font-medium text-sm">Attribution:</span>
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {campaign.attributed_to.map((actor, idx) => (
                                    <Badge key={idx} variant="outline" className="text-xs">{actor}</Badge>
                                  ))}
                                </div>
                              </div>
                            )}

                            {campaign.objectives.length > 0 && (
                              <div>
                                <span className="font-medium text-sm">Objectives:</span>
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {campaign.objectives.slice(0, 3).map((objective, idx) => (
                                    <Badge key={idx} variant="outline" className="text-xs">{objective}</Badge>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>

                          <div className="text-xs text-muted-foreground">
                            Active: {new Date(campaign.first_seen).toLocaleDateString()} - {new Date(campaign.last_seen).toLocaleDateString()}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <Activity className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No campaigns available</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Vulnerabilities Tab */}
        <TabsContent value="vulnerabilities" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bug className="h-5 w-5" />
                <span>Critical Vulnerabilities</span>
              </CardTitle>
              <CardDescription>
                Latest vulnerability intelligence and exploitation trends
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {vulnLoading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="text-muted-foreground mt-2">Loading vulnerabilities...</p>
                  </div>
                ) : vulnerabilities && vulnerabilities.length > 0 ? (
                  vulnerabilities.map((vuln) => (
                    <Card key={vuln.id} className="border-l-4 border-l-red-500" data-testid={`vulnerability-${vuln.id}`}>
                      <CardContent className="pt-4">
                        <div className="space-y-3">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-2">
                                {vuln.cve_id && (
                                  <Badge variant="outline">{vuln.cve_id}</Badge>
                                )}
                                <Badge className={severityBadgeColors[vuln.severity]}>
                                  {vuln.severity.toUpperCase()}
                                </Badge>
                                {vuln.exploit_available && (
                                  <Badge className="bg-red-500/20 text-red-400">
                                    Exploit Available
                                  </Badge>
                                )}
                              </div>
                              <h3 className="text-lg font-semibold">{vuln.title}</h3>
                              <p className="text-sm text-muted-foreground mt-1">{vuln.description}</p>
                            </div>
                            {vuln.cvss_score && (
                              <div className="text-right">
                                <div className="text-lg font-bold text-red-400">{vuln.cvss_score}</div>
                                <div className="text-xs text-muted-foreground">CVSS Score</div>
                              </div>
                            )}
                          </div>

                          {vuln.affected_products.length > 0 && (
                            <div>
                              <span className="font-medium text-sm">Affected Products:</span>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {vuln.affected_products.slice(0, 4).map((product, idx) => (
                                  <Badge key={idx} variant="outline" className="text-xs">{product}</Badge>
                                ))}
                                {vuln.affected_products.length > 4 && (
                                  <Badge variant="outline" className="text-xs">+{vuln.affected_products.length - 4}</Badge>
                                )}
                              </div>
                            </div>
                          )}

                          <div className="text-xs text-muted-foreground">
                            Published: {new Date(vuln.published_date).toLocaleDateString()}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <Bug className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No vulnerabilities available</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}