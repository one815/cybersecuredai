import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { 
  Search, 
  Globe, 
  Shield, 
  AlertTriangle, 
  FileText, 
  Database, 
  Target, 
  MapPin, 
  Clock, 
  TrendingUp, 
  Eye, 
  Bug, 
  Crown,
  CheckCircle,
  XCircle,
  Activity,
  Zap
} from "lucide-react";

interface XForceReport {
  ip?: string;
  url?: string;
  domain?: string;
  country?: string;
  geo?: {
    country: string;
    countrycode: string;
  };
  malware?: {
    risk: number;
    family?: string[];
  };
  reputation?: {
    score: number;
    cats: { [key: string]: number };
  };
  result?: {
    score: number;
    cats: { [key: string]: number };
    categoryDescriptions: { [key: string]: string };
  };
}

interface VulnerabilityReport {
  xfdbid: string;
  title: string;
  description: string;
  risk_level: number;
  cvss?: {
    version: string;
    base_score: number;
    temporal_score: number;
    environmental_score: number;
  };
  stdcode?: string[];
  exploit_availability?: boolean;
  references?: Array<{
    link_target: string;
    link_name: string;
  }>;
}

export default function IBMXForceIntelligence() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState("ip-reputation");
  const [searchInput, setSearchInput] = useState("");
  const [bulkIndicators, setBulkIndicators] = useState("");
  const [reportResults, setReportResults] = useState<any>(null);

  // Fetch service status
  const { data: serviceStatus } = useQuery({
    queryKey: ['/api/threat-intelligence/status'],
    refetchInterval: 60000,
  });

  // Search mutations for different indicator types
  const ipReputationMutation = useMutation({
    mutationFn: (ip: string) => apiRequest(`/api/threat-intelligence/ip/${ip}`),
    onSuccess: (result) => {
      setReportResults(result);
      toast({
        title: "IP Analysis Complete",
        description: `Reputation score: ${result.reputation?.score || 'Unknown'}`,
      });
    },
    onError: () => {
      toast({
        title: "Analysis Failed",
        description: "Failed to analyze IP address. Please check the input.",
        variant: "destructive",
      });
    },
  });

  const urlAnalysisMutation = useMutation({
    mutationFn: (url: string) => apiRequest(`/api/threat-intelligence/url?url=${encodeURIComponent(url)}`),
    onSuccess: (result) => {
      setReportResults(result);
      toast({
        title: "URL Analysis Complete",
        description: `Risk score: ${result.result?.score || 'Unknown'}`,
      });
    },
  });

  const domainIntelligenceMutation = useMutation({
    mutationFn: (domain: string) => apiRequest(`/api/threat-intelligence/domain/${domain}`),
    onSuccess: (result) => {
      setReportResults(result);
      toast({
        title: "Domain Analysis Complete",
        description: `Found ${result.a?.length || 0} A records`,
      });
    },
  });

  const vulnerabilitySearchMutation = useMutation({
    mutationFn: (cve: string) => apiRequest(`/api/threat-intelligence/vulnerability/${cve}`),
    onSuccess: (result) => {
      setReportResults(result);
      toast({
        title: "Vulnerability Analysis Complete",
        description: `Risk level: ${result.risk_level || 'Unknown'}`,
      });
    },
  });

  const malwareSearchMutation = useMutation({
    mutationFn: (hash: string) => apiRequest(`/api/threat-intelligence/malware/${hash}`),
    onSuccess: (result) => {
      setReportResults(result);
      toast({
        title: "Malware Analysis Complete",
        description: `Type: ${result.type || 'Unknown'}`,
      });
    },
  });

  const bulkAnalysisMutation = useMutation({
    mutationFn: (indicators: string[]) => apiRequest('/api/threat-intelligence/bulk', {
      method: 'POST',
      body: JSON.stringify({ indicators }),
    }),
    onSuccess: (result) => {
      setReportResults(result);
      toast({
        title: "Bulk Analysis Complete",
        description: `Analyzed ${result.length} indicators`,
      });
    },
  });

  const handleSearch = () => {
    if (!searchInput.trim()) return;

    const input = searchInput.trim();
    
    // Auto-detect input type and trigger appropriate search
    if (/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(input)) {
      ipReputationMutation.mutate(input);
    } else if (input.startsWith('http')) {
      urlAnalysisMutation.mutate(input);
    } else if (/^CVE-\d{4}-\d{4,7}$/i.test(input)) {
      vulnerabilitySearchMutation.mutate(input);
    } else if (/^[a-fA-F0-9]{32}$|^[a-fA-F0-9]{40}$|^[a-fA-F0-9]{64}$/.test(input)) {
      malwareSearchMutation.mutate(input);
    } else {
      domainIntelligenceMutation.mutate(input);
    }
  };

  const handleBulkAnalysis = () => {
    const indicators = bulkIndicators
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);
    
    if (indicators.length === 0) return;
    
    bulkAnalysisMutation.mutate(indicators);
  };

  const getRiskColor = (score: number) => {
    if (score >= 7) return 'text-red-500';
    if (score >= 4) return 'text-orange-500';
    if (score >= 2) return 'text-yellow-500';
    return 'text-green-500';
  };

  const getRiskBadgeVariant = (score: number) => {
    if (score >= 7) return 'destructive';
    if (score >= 4) return 'default';
    return 'secondary';
  };

  const isSearching = ipReputationMutation.isPending || 
                    urlAnalysisMutation.isPending || 
                    domainIntelligenceMutation.isPending || 
                    vulnerabilitySearchMutation.isPending || 
                    malwareSearchMutation.isPending || 
                    bulkAnalysisMutation.isPending;

  return (
    <div className="space-y-6" data-testid="ibm-xforce-page">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">IBM X-Force Exchange</h1>
          <p className="text-muted-foreground">Premium threat intelligence and security research platform</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant={serviceStatus?.status === 'configured' ? 'default' : 'secondary'}>
            <Crown className="h-3 w-3 mr-1" />
            {serviceStatus?.status || 'Unknown'}
          </Badge>
        </div>
      </div>

      {/* Quick Search */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Quick Threat Intelligence Lookup
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <div className="flex-1">
              <Input
                placeholder="Enter IP, domain, URL, CVE, or file hash..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                data-testid="input-search"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Auto-detects: IP addresses, domains, URLs, CVE numbers, MD5/SHA1/SHA256 hashes
              </p>
            </div>
            <Button 
              onClick={handleSearch} 
              disabled={isSearching || !searchInput.trim()}
              data-testid="button-search"
            >
              {isSearching ? <Clock className="h-4 w-4 mr-2 animate-spin" /> : <Search className="h-4 w-4 mr-2" />}
              Search
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Advanced Search Interface */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Advanced Threat Intelligence
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="ip-reputation" data-testid="tab-ip-reputation">
                    <Globe className="h-4 w-4 mr-2" />
                    IP Reputation
                  </TabsTrigger>
                  <TabsTrigger value="url-analysis" data-testid="tab-url-analysis">
                    <Eye className="h-4 w-4 mr-2" />
                    URL Analysis
                  </TabsTrigger>
                  <TabsTrigger value="domain-intelligence" data-testid="tab-domain-intelligence">
                    <Database className="h-4 w-4 mr-2" />
                    Domain Intel
                  </TabsTrigger>
                  <TabsTrigger value="vulnerability-research" data-testid="tab-vulnerability-research">
                    <Bug className="h-4 w-4 mr-2" />
                    Vulnerabilities
                  </TabsTrigger>
                  <TabsTrigger value="bulk-analysis" data-testid="tab-bulk-analysis">
                    <FileText className="h-4 w-4 mr-2" />
                    Bulk Analysis
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="ip-reputation" className="space-y-4">
                  <div>
                    <Label htmlFor="ip-input">IP Address</Label>
                    <div className="flex gap-2">
                      <Input
                        id="ip-input"
                        placeholder="192.168.1.1"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        data-testid="input-ip-address"
                      />
                      <Button 
                        onClick={() => ipReputationMutation.mutate(searchInput)}
                        disabled={ipReputationMutation.isPending}
                        data-testid="button-analyze-ip"
                      >
                        Analyze
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="url-analysis" className="space-y-4">
                  <div>
                    <Label htmlFor="url-input">URL</Label>
                    <div className="flex gap-2">
                      <Input
                        id="url-input"
                        placeholder="https://example.com"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        data-testid="input-url"
                      />
                      <Button 
                        onClick={() => urlAnalysisMutation.mutate(searchInput)}
                        disabled={urlAnalysisMutation.isPending}
                        data-testid="button-analyze-url"
                      >
                        Analyze
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="domain-intelligence" className="space-y-4">
                  <div>
                    <Label htmlFor="domain-input">Domain</Label>
                    <div className="flex gap-2">
                      <Input
                        id="domain-input"
                        placeholder="example.com"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        data-testid="input-domain"
                      />
                      <Button 
                        onClick={() => domainIntelligenceMutation.mutate(searchInput)}
                        disabled={domainIntelligenceMutation.isPending}
                        data-testid="button-analyze-domain"
                      >
                        Analyze
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="vulnerability-research" className="space-y-4">
                  <div>
                    <Label htmlFor="cve-input">CVE Number</Label>
                    <div className="flex gap-2">
                      <Input
                        id="cve-input"
                        placeholder="CVE-2024-1234"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        data-testid="input-cve"
                      />
                      <Button 
                        onClick={() => vulnerabilitySearchMutation.mutate(searchInput)}
                        disabled={vulnerabilitySearchMutation.isPending}
                        data-testid="button-analyze-cve"
                      >
                        Research
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="bulk-analysis" className="space-y-4">
                  <div>
                    <Label htmlFor="bulk-input">Indicators (one per line)</Label>
                    <Textarea
                      id="bulk-input"
                      placeholder="192.168.1.1&#10;example.com&#10;https://malicious.site&#10;CVE-2024-1234"
                      value={bulkIndicators}
                      onChange={(e) => setBulkIndicators(e.target.value)}
                      rows={6}
                      data-testid="textarea-bulk-indicators"
                    />
                    <Button 
                      onClick={handleBulkAnalysis}
                      disabled={bulkAnalysisMutation.isPending}
                      className="w-full"
                      data-testid="button-bulk-analyze"
                    >
                      {bulkAnalysisMutation.isPending ? <Clock className="h-4 w-4 mr-2 animate-spin" /> : <FileText className="h-4 w-4 mr-2" />}
                      Analyze All
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Results Panel */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Threat Intelligence Report
              </CardTitle>
            </CardHeader>
            <CardContent>
              {reportResults ? (
                <div className="space-y-4" data-testid="xforce-results">
                  {/* IP Reputation Results */}
                  {reportResults.ip && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">IP Address:</span>
                        <code className="text-sm bg-muted px-2 py-1 rounded">{reportResults.ip}</code>
                      </div>
                      
                      {reportResults.geo && (
                        <div className="flex items-center justify-between">
                          <span className="font-medium">Location:</span>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            <span className="text-sm">{reportResults.geo.country}</span>
                          </div>
                        </div>
                      )}

                      {reportResults.reputation && (
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Reputation Score</span>
                            <span className={getRiskColor(reportResults.reputation.score)}>
                              {reportResults.reputation.score}/10
                            </span>
                          </div>
                          <Progress value={reportResults.reputation.score * 10} />
                        </div>
                      )}

                      {reportResults.malware && (
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Malware Risk</span>
                            <Badge variant={getRiskBadgeVariant(reportResults.malware.risk)}>
                              {reportResults.malware.risk}/10
                            </Badge>
                          </div>
                          {reportResults.malware.family && reportResults.malware.family.length > 0 && (
                            <div className="text-xs text-muted-foreground">
                              Families: {reportResults.malware.family.join(', ')}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}

                  {/* URL Analysis Results */}
                  {reportResults.url && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">URL:</span>
                        <code className="text-sm bg-muted px-2 py-1 rounded truncate max-w-32">
                          {reportResults.url}
                        </code>
                      </div>
                      
                      {reportResults.result && (
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Risk Score</span>
                            <span className={getRiskColor(reportResults.result.score)}>
                              {reportResults.result.score}/10
                            </span>
                          </div>
                          <Progress value={reportResults.result.score * 10} />
                        </div>
                      )}
                    </div>
                  )}

                  {/* Domain Intelligence Results */}
                  {reportResults.domain && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Domain:</span>
                        <code className="text-sm bg-muted px-2 py-1 rounded">{reportResults.domain}</code>
                      </div>
                      
                      {reportResults.a && (
                        <div>
                          <span className="font-medium text-sm">A Records:</span>
                          <div className="mt-1 space-y-1">
                            {reportResults.a.slice(0, 3).map((ip: string, index: number) => (
                              <div key={index} className="text-xs bg-muted px-2 py-1 rounded font-mono">
                                {ip}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Vulnerability Research Results */}
                  {reportResults.xfdbid && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">CVE:</span>
                        <code className="text-sm bg-muted px-2 py-1 rounded">{reportResults.xfdbid}</code>
                      </div>
                      
                      <div>
                        <span className="font-medium text-sm">Title:</span>
                        <p className="text-sm mt-1">{reportResults.title}</p>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Risk Level</span>
                          <Badge variant={getRiskBadgeVariant(reportResults.risk_level)}>
                            {reportResults.risk_level}/10
                          </Badge>
                        </div>
                        
                        {reportResults.cvss && (
                          <div className="text-xs text-muted-foreground">
                            CVSS {reportResults.cvss.version}: {reportResults.cvss.base_score}
                          </div>
                        )}
                      </div>

                      {reportResults.exploit_availability && (
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="h-3 w-3 text-red-500" />
                          <span className="text-xs text-red-500">Exploits Available</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Bulk Analysis Results */}
                  {Array.isArray(reportResults) && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Bulk Analysis:</span>
                        <Badge>{reportResults.length} indicators</Badge>
                      </div>
                      
                      <div className="space-y-2 max-h-64 overflow-y-auto">
                        {reportResults.map((result: any, index: number) => (
                          <div key={index} className="text-xs p-2 bg-muted rounded">
                            <div className="flex justify-between items-center">
                              <span className="font-mono">{result.indicator}</span>
                              <Badge variant="outline" className="text-xs">
                                {result.type}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                </div>
              ) : (
                <div className="text-center text-muted-foreground py-8">
                  <Shield className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Search for threat intelligence</p>
                  <p className="text-xs mt-1">Enter indicators above to analyze</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Service Features */}
          <Card className="mt-4">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sm">
                <Crown className="h-4 w-4" />
                X-Force Features
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {serviceStatus?.features?.map((feature: string, index: number) => (
                <div key={index} className="flex items-center gap-2 text-xs">
                  <CheckCircle className="h-3 w-3 text-green-500" />
                  <span>{feature}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}