import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { 
  Shield, 
  Search, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  Globe,
  Mail,
  Lock,
  Server,
  Eye,
  Database,
  Network,
  Users,
  Bot,
  Loader2,
  Download,
  FileText,
  Crown,
  Zap,
  Star
} from "lucide-react";
import { Layout } from "@/components/Layout";

interface ScanResult {
  check: string;
  status: 'pass' | 'fail' | 'warning';
  description: string;
  details: string;
  recommendation?: string;
}

interface ScanResults {
  domain: string;
  overall_score: number;
  categories: {
    email_security: ScanResult[];
    web_infrastructure: ScanResult[];
    cloud_services: ScanResult[];
    social_engineering: ScanResult[];
    business_systems: ScanResult[];
  };
}

export default function SecurityScanner() {
  const { user } = useAuth();

  // Admin-only access check
  if (!user || !['admin', 'cyber_admin', 'internal_admin'].includes(user.role)) {
    return (
      <Layout>
        <div className="ai-dashboard-bg min-h-screen flex items-center justify-center">
          <Card className="bg-surface/80 backdrop-blur-md border border-red-500/30 max-w-md">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-white flex items-center justify-center">
                <Shield className="w-6 h-6 mr-3 text-red-400" />
                Access Restricted
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-400 mb-4">
                This enterprise security assessment tool is restricted to authorized CyberSecure administrators only.
              </p>
              <Button 
                onClick={() => window.location.href = '/basic-security-scan'}
                className="bg-green-600 hover:bg-green-700"
              >
                Use Basic Scanner Instead
              </Button>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  const [scanConfig, setScanConfig] = useState({
    domain: "",
    subdomains: "",
    ipRanges: "",
    emailDomains: "",
    cloudServices: "",
    applications: "",
    scanType: "comprehensive",
    includeSubdomains: true,
    deepScan: true,
    socialEngineering: true,
    cloudAnalysis: true,
    businessSystems: true
  });
  const [scanResults, setScanResults] = useState<any>(null);
  const [scanProgress, setScanProgress] = useState(0);
  const [activeTab, setActiveTab] = useState("configuration");
  const { toast } = useToast();

  const scanMutation = useMutation({
    mutationFn: async (config: any) => {
      const response = await apiRequest('POST', '/api/security-scan', config);
      return await response.json();
    },
    onSuccess: (data) => {
      setScanResults(data);
      setScanProgress(100);
      setActiveTab("results");
      toast({
        title: "Enterprise Security Assessment Complete",
        description: `Found ${data.scanResults?.totalIssues || 0} potential security issues`,
      });
    },
    onError: (error) => {
      toast({
        title: "Scan Failed",
        description: "Unable to complete security scan. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleScan = async () => {
    if (!scanConfig.domain) {
      toast({
        title: "Domain Required",
        description: "Please enter a domain to scan",
        variant: "destructive",
      });
      return;
    }
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to use the enterprise security scanner",
        variant: "destructive",
      });
      return;
    }

    setScanProgress(0);
    setScanResults(null);
    setActiveTab("scanning");

    // Progressive scan simulation for comprehensive scan
    const progressInterval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return prev;
        }
        return prev + 5; // Slower progress for comprehensive scan
      });
    }, 800);

    scanMutation.mutate(scanConfig);
  };

  const getTierDisplayName = (tier: string) => {
    switch (tier) {
      case "standard": return "Free";
      case "enterprise": return "Enterprise";
      case "cyber_cloud_advanced": return "Cyber Cloud Advanced";
      case "cyber_cloud_enterprise": return "Cyber Cloud Enterprise";
      default: return tier;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pass': return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'fail': return <XCircle className="w-5 h-5 text-red-400" />;
      case 'warning': return <AlertTriangle className="w-5 h-5 text-yellow-400" />;
      default: return <AlertTriangle className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pass': return 'text-green-400 border-green-500';
      case 'fail': return 'text-red-400 border-red-500';
      case 'warning': return 'text-yellow-400 border-yellow-500';
      default: return 'text-gray-400 border-gray-500';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-400';
    if (score >= 75) return 'text-yellow-400';
    if (score >= 60) return 'text-orange-400';
    return 'text-red-400';
  };

  const categoryIcons = {
    email_security: <Mail className="w-6 h-6" />,
    web_infrastructure: <Globe className="w-6 h-6" />,
    cloud_services: <Database className="w-6 h-6" />,
    social_engineering: <Users className="w-6 h-6" />,
    business_systems: <Server className="w-6 h-6" />
  };

  const categoryNames = {
    email_security: "Email Security",
    web_infrastructure: "Web Infrastructure", 
    cloud_services: "Cloud Services",
    social_engineering: "Social Engineering",
    business_systems: "Business Systems"
  };

  return (
    <Layout>
      <div className="ai-dashboard-bg min-h-screen">
        {/* Header */}
        <header className="bg-surface/90 backdrop-blur-md border-b border-surface-light p-6 cyber-glow">
          <div className="container mx-auto max-w-6xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-red-500 rounded-lg flex items-center justify-center">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white flex items-center space-x-2">
                    <span>Enterprise Security Scanner</span>
                    <Shield className="w-8 h-8 text-orange-400" />
                    <Crown className="w-8 h-8 text-yellow-400" />
                  </h1>
                  <p className="text-gray-400">
                    Advanced cybersecurity assessment with comprehensive threat analysis and compliance reporting
                    {user && (
                      <span className="ml-2 inline-flex items-center">
                        <Crown className="w-4 h-4 mr-1 text-yellow-400" />
                        <span className="text-yellow-400 font-medium">{getTierDisplayName(user.planType || "standard")}</span>
                      </span>
                    )}
                  </p>
                </div>
              </div>
              <Button 
                variant="outline" 
                className="border-green-500 text-green-400 hover:bg-green-500/10"
                onClick={() => window.location.href = '/basic-security-scan'}
              >
                Try Free Scanner
              </Button>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-12">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="bg-surface border border-surface-light grid grid-cols-4 max-w-2xl mx-auto">
              <TabsTrigger value="configuration">Configuration</TabsTrigger>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="scanning" disabled={!scanMutation.isPending && !scanResults}>Scanning</TabsTrigger>
              <TabsTrigger value="results" disabled={!scanResults}>Results</TabsTrigger>
            </TabsList>

            {/* Configuration Tab */}
            <TabsContent value="configuration" className="space-y-6">
              <Card className="bg-surface/80 backdrop-blur-md border border-orange-500/30 cyber-glow">
                <CardHeader>
                  <CardTitle className="text-2xl text-white flex items-center">
                    <Shield className="w-6 h-6 mr-3 text-orange-400" />
                    Enterprise Security Assessment Configuration
                  </CardTitle>
                  <p className="text-gray-400">
                    Configure comprehensive security scanning parameters for your organization's digital infrastructure
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Primary Targets */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-white flex items-center">
                        <Globe className="w-5 h-5 mr-2 text-blue-400" />
                        Primary Targets
                      </h3>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Primary Domain *</label>
                          <Input
                            placeholder="example.edu or city.gov"
                            value={scanConfig.domain}
                            onChange={(e) => setScanConfig(prev => ({ ...prev, domain: e.target.value }))}
                            className="bg-background border-gray-600 text-white"
                            data-testid="input-primary-domain"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Additional Subdomains</label>
                          <Input
                            placeholder="mail.example.edu, portal.example.edu"
                            value={scanConfig.subdomains}
                            onChange={(e) => setScanConfig(prev => ({ ...prev, subdomains: e.target.value }))}
                            className="bg-background border-gray-600 text-white"
                            data-testid="input-subdomains"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">IP Ranges/CIDR</label>
                          <Input
                            placeholder="192.168.1.0/24, 10.0.0.0/16"
                            value={scanConfig.ipRanges}
                            onChange={(e) => setScanConfig(prev => ({ ...prev, ipRanges: e.target.value }))}
                            className="bg-background border-gray-600 text-white"
                            data-testid="input-ip-ranges"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Communication & Cloud */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-white flex items-center">
                        <Mail className="w-5 h-5 mr-2 text-green-400" />
                        Communication & Cloud
                      </h3>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Email Domains</label>
                          <Input
                            placeholder="@example.edu, @department.gov"
                            value={scanConfig.emailDomains}
                            onChange={(e) => setScanConfig(prev => ({ ...prev, emailDomains: e.target.value }))}
                            className="bg-background border-gray-600 text-white"
                            data-testid="input-email-domains"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Cloud Services</label>
                          <Input
                            placeholder="AWS Account IDs, Azure Subscriptions"
                            value={scanConfig.cloudServices}
                            onChange={(e) => setScanConfig(prev => ({ ...prev, cloudServices: e.target.value }))}
                            className="bg-background border-gray-600 text-white"
                            data-testid="input-cloud-services"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Business Applications</label>
                          <Input
                            placeholder="SIS, ERP, CRM URLs or identifiers"
                            value={scanConfig.applications}
                            onChange={(e) => setScanConfig(prev => ({ ...prev, applications: e.target.value }))}
                            className="bg-background border-gray-600 text-white"
                            data-testid="input-applications"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Scan Configuration */}
                  <div className="border-t border-gray-700 pt-6">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                      <Eye className="w-5 h-5 mr-2 text-purple-400" />
                      Advanced Scan Configuration
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      <div className="space-y-3">
                        <label className="block text-sm font-medium text-gray-300">Scan Type</label>
                        <select 
                          value={scanConfig.scanType}
                          onChange={(e) => setScanConfig(prev => ({ ...prev, scanType: e.target.value }))}
                          className="w-full bg-background border border-gray-600 text-white rounded-md px-3 py-2"
                          data-testid="select-scan-type"
                        >
                          <option value="comprehensive">Comprehensive Assessment</option>
                          <option value="compliance">Compliance-Focused</option>
                          <option value="threat-focused">Threat-Focused</option>
                          <option value="pen-test">Penetration Testing</option>
                        </select>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <input 
                            type="checkbox" 
                            id="includeSubdomains"
                            checked={scanConfig.includeSubdomains}
                            onChange={(e) => setScanConfig(prev => ({ ...prev, includeSubdomains: e.target.checked }))}
                            className="rounded border-gray-600"
                            data-testid="checkbox-include-subdomains"
                          />
                          <label htmlFor="includeSubdomains" className="text-sm text-gray-300">
                            Include Subdomain Discovery
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input 
                            type="checkbox" 
                            id="deepScan"
                            checked={scanConfig.deepScan}
                            onChange={(e) => setScanConfig(prev => ({ ...prev, deepScan: e.target.checked }))}
                            className="rounded border-gray-600"
                            data-testid="checkbox-deep-scan"
                          />
                          <label htmlFor="deepScan" className="text-sm text-gray-300">
                            Deep Infrastructure Scan
                          </label>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <input 
                            type="checkbox" 
                            id="socialEngineering"
                            checked={scanConfig.socialEngineering}
                            onChange={(e) => setScanConfig(prev => ({ ...prev, socialEngineering: e.target.checked }))}
                            className="rounded border-gray-600"
                            data-testid="checkbox-social-engineering"
                          />
                          <label htmlFor="socialEngineering" className="text-sm text-gray-300">
                            Social Engineering Analysis
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input 
                            type="checkbox" 
                            id="cloudAnalysis"
                            checked={scanConfig.cloudAnalysis}
                            onChange={(e) => setScanConfig(prev => ({ ...prev, cloudAnalysis: e.target.checked }))}
                            className="rounded border-gray-600"
                            data-testid="checkbox-cloud-analysis"
                          />
                          <label htmlFor="cloudAnalysis" className="text-sm text-gray-300">
                            Cloud Security Analysis
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Start Scan Button */}
                  <div className="text-center pt-6 border-t border-gray-700">
                    <Button 
                      onClick={handleScan} 
                      disabled={!scanConfig.domain || scanMutation.isPending}
                      className="bg-orange-600 hover:bg-orange-700 px-12 py-3 text-lg"
                      size="lg"
                      data-testid="button-launch-scan"
                    >
                      {scanMutation.isPending ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          Starting Comprehensive Scan...
                        </>
                      ) : (
                        <>
                          <Shield className="w-5 h-5 mr-2" />
                          Launch Enterprise Security Assessment
                        </>
                      )}
                    </Button>
                    <p className="text-sm text-gray-400 mt-3">
                      Estimated scan time: 15-25 minutes for comprehensive assessment
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-surface/80 backdrop-blur-md border border-blue-500/30">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg text-white flex items-center">
                      <Globe className="w-5 h-5 mr-2 text-blue-400" />
                      Infrastructure Assessment
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-400 text-sm">
                      Comprehensive analysis of your network infrastructure, including domains, subdomains, and IP ranges
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-surface/80 backdrop-blur-md border border-green-500/30">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg text-white flex items-center">
                      <Shield className="w-5 h-5 mr-2 text-green-400" />
                      Threat Intelligence
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-400 text-sm">
                      Real-time threat detection using advanced machine learning and behavioral analytics
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-surface/80 backdrop-blur-md border border-purple-500/30">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg text-white flex items-center">
                      <FileText className="w-5 h-5 mr-2 text-purple-400" />
                      Compliance Reporting
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-400 text-sm">
                      FERPA, FISMA, and CIPA compliance assessment with detailed reporting
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Scanning Tab */}
            <TabsContent value="scanning" className="space-y-6">
              <Card className="bg-surface/80 backdrop-blur-md border border-orange-500/30 cyber-glow">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl text-white">Enterprise Security Assessment in Progress</CardTitle>
                  <p className="text-gray-400">
                    Conducting comprehensive security analysis of your digital infrastructure
                  </p>
                </CardHeader>
                <CardContent>
                  {scanMutation.isPending && (
                    <div className="space-y-6 max-w-2xl mx-auto">
                      <Progress value={scanProgress} className="w-full h-3" />
                      <div className="text-center">
                        <div className="text-lg font-semibold text-white mb-2">{scanProgress}% Complete</div>
                        <div className="text-sm text-gray-400">
                          {scanProgress < 15 && "🔍 Analyzing domain configuration and DNS records..."}
                          {scanProgress >= 15 && scanProgress < 30 && "📧 Comprehensive email security assessment..."}
                          {scanProgress >= 30 && scanProgress < 45 && "🌐 Web infrastructure and SSL analysis..."}
                          {scanProgress >= 45 && scanProgress < 60 && "☁️ Cloud services security evaluation..."}
                          {scanProgress >= 60 && scanProgress < 75 && "👥 Social engineering vulnerability analysis..."}
                          {scanProgress >= 75 && scanProgress < 90 && "🏢 Business systems security assessment..."}
                          {scanProgress >= 90 && scanProgress < 100 && "📊 Generating comprehensive security report..."}
                          {scanProgress === 100 && "✅ Enterprise security assessment complete!"}
                        </div>
                      </div>
                      
                      {/* Real-time scan details */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                        <div className="bg-background/50 rounded-lg p-4">
                          <h4 className="font-semibold text-white mb-2">Current Analysis</h4>
                          <div className="text-sm text-gray-300 space-y-1">
                            <div>• Domain: {scanConfig.domain}</div>
                            <div>• Scan Type: {scanConfig.scanType}</div>
                            <div>• Deep Scan: {scanConfig.deepScan ? 'Enabled' : 'Disabled'}</div>
                          </div>
                        </div>
                        <div className="bg-background/50 rounded-lg p-4">
                          <h4 className="font-semibold text-white mb-2">Security Checks</h4>
                          <div className="text-sm text-gray-300 space-y-1">
                            <div>• Email Security: {scanConfig.socialEngineering ? 'Included' : 'Basic'}</div>
                            <div>• Cloud Analysis: {scanConfig.cloudAnalysis ? 'Enabled' : 'Disabled'}</div>
                            <div>• Subdomains: {scanConfig.includeSubdomains ? 'Scanning' : 'Skipped'}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Results Tab */}
            <TabsContent value="results" className="space-y-6">
              {scanResults && (
                <div className="space-y-6">
                  {/* Overall Score */}
                  <Card className="bg-surface/80 backdrop-blur-md border border-orange-500/30 cyber-glow">
                    <CardHeader className="text-center">
                      <CardTitle className="text-2xl text-white">Security Assessment Results</CardTitle>
                      <div className={`text-4xl font-bold ${getScoreColor(scanResults.overall_score || 0)}`}>
                        {scanResults.overall_score || 0}/100
                      </div>
                      <p className="text-gray-400">Overall Security Score</p>
                    </CardHeader>
                  </Card>

                  {/* Category Results */}
                  {scanResults.categories && Object.entries(scanResults.categories).map(([category, results]: [string, any]) => (
                    <Card key={category} className="bg-surface/80 backdrop-blur-md border border-surface-light">
                      <CardHeader>
                        <CardTitle className="text-white flex items-center">
                          {categoryIcons[category as keyof typeof categoryIcons]}
                          <span className="ml-3">{categoryNames[category as keyof typeof categoryNames]}</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {results?.map((result: any, index: number) => (
                            <div key={index} className={`p-4 border rounded-lg ${getStatusColor(result.status)}`}>
                              <div className="flex items-start space-x-3">
                                {getStatusIcon(result.status)}
                                <div className="flex-1">
                                  <h4 className="font-semibold text-white">{result.check}</h4>
                                  <p className="text-gray-300 text-sm mt-1">{result.description}</p>
                                  {result.details && (
                                    <p className="text-gray-400 text-xs mt-2">{result.details}</p>
                                  )}
                                  {result.recommendation && (
                                    <div className="mt-3 p-2 bg-blue-500/20 rounded">
                                      <p className="text-blue-300 text-sm">
                                        <strong>Recommendation:</strong> {result.recommendation}
                                      </p>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                  {/* Download Report */}
                  <div className="text-center">
                    <Button 
                      className="bg-green-600 hover:bg-green-700 px-8 py-3"
                      data-testid="button-download-report"
                    >
                      <Download className="w-5 h-5 mr-2" />
                      Download Comprehensive Report
                    </Button>
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </Layout>
  );
}