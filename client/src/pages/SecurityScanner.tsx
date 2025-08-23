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
  const [domain, setDomain] = useState("");
  const [scanResults, setScanResults] = useState<any>(null);
  const [scanProgress, setScanProgress] = useState(0);
  const { user } = useAuth();
  const { toast } = useToast();

  const scanMutation = useMutation({
    mutationFn: async (domain: string) => {
      const response = await apiRequest('POST', '/api/security-scan', { domain });
      return await response.json();
    },
    onSuccess: (data) => {
      setScanResults(data);
      setScanProgress(100);
      toast({
        title: "Security Scan Complete",
        description: `Found ${data.scanResults.totalIssues} potential security issues`,
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
    if (!domain) return;
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to use the security scanner",
        variant: "destructive",
      });
      return;
    }

    setScanProgress(0);
    setScanResults(null);

    // Progressive scan simulation
    const progressInterval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return prev;
        }
        return prev + 10;
      });
    }, 500);

    scanMutation.mutate(domain);
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

      <main className="p-6">
        <div className="container mx-auto max-w-6xl">
          {/* Scanner Input */}
          <section className="mb-12">
            <Card className="bg-surface/80 backdrop-blur-md border border-orange-500/30 cyber-glow">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-white">Quick Infrastructure Security Assessment</CardTitle>
                <p className="text-gray-400 mt-2">
                  Get a rapid assessment of your organization's security posture by scanning 
                  publicly available information about your digital infrastructure.
                </p>
              </CardHeader>
              <CardContent>
                <div className="max-w-2xl mx-auto">
                  <div className="flex gap-4 mb-6">
                    <div className="flex-1">
                      <Input
                        placeholder="Enter your domain (e.g., example.edu, city.gov)"
                        value={domain}
                        onChange={(e) => setDomain(e.target.value)}
                        className="bg-surface border-gray-600 text-white"
                        disabled={scanMutation.isPending}
                      />
                    </div>
                    <Button 
                      onClick={handleScan} 
                      disabled={!domain || scanMutation.isPending}
                      className="bg-orange-600 hover:bg-orange-700 px-8"
                    >
                      {scanMutation.isPending ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Scanning...
                        </>
                      ) : (
                        <>
                          <Search className="w-4 h-4 mr-2" />
                          Scan Now
                        </>
                      )}
                    </Button>
                  </div>

                  {scanMutation.isPending && (
                    <div className="space-y-4">
                      <Progress value={scanProgress} className="w-full" />
                      <div className="text-center text-sm text-gray-400">
                        {scanProgress < 20 && "Analyzing domain configuration..."}
                        {scanProgress >= 20 && scanProgress < 40 && "Checking email security settings..."}
                        {scanProgress >= 40 && scanProgress < 60 && "Scanning web infrastructure..."}
                        {scanProgress >= 60 && scanProgress < 80 && "Evaluating cloud services..."}
                        {scanProgress >= 80 && scanProgress < 100 && "Assessing social engineering risks..."}
                        {scanProgress === 100 && "Scan complete!"}
                      </div>
                    </div>
                  )}

                  {/* Tier Information */}
                  {user && user.planType === "standard" && (
                    <div className="mt-6 bg-gradient-to-r from-yellow-900/30 to-orange-900/30 border border-yellow-500/30 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Star className="w-6 h-6 text-yellow-400" />
                          <div>
                            <h3 className="font-bold text-yellow-400">Free Tier - Limited Scanning</h3>
                            <p className="text-sm text-gray-300">Basic domain and SSL checks only</p>
                          </div>
                        </div>
                        <Button size="sm" className="bg-yellow-600 hover:bg-yellow-700">
                          <Zap className="w-4 h-4 mr-2" />
                          Upgrade for Full Scan
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Scan Results */}
          {scanResults && (
            <section>
              {/* Overall Score */}
              <Card className="bg-surface/80 backdrop-blur-md border border-cyan-500/30 cyber-glow mb-8">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl text-white">
                    Security Assessment Results for {scanResults.domain}
                  </CardTitle>
                  <div className="flex justify-center items-center mt-2 space-x-4">
                    <Badge className="bg-blue-600 text-white">
                      {getTierDisplayName(scanResults.userTier)} Scan
                    </Badge>
                    {scanResults.totalIssues > 0 && (
                      <Badge variant="outline" className="border-red-500 text-red-400">
                        {scanResults.totalIssues} Issues Found
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="text-center">
                  <div className={`text-6xl font-bold mb-4 ${getScoreColor(scanResults.scanResults.overall_score)}`}>
                    {scanResults.scanResults.overall_score}/100
                  </div>
                  <p className="text-gray-400 mb-6">Overall Security Score</p>
                  
                  {scanResults.upgradeRequired && (
                    <div className="bg-gradient-to-r from-yellow-900/30 to-orange-900/30 border border-yellow-500/30 rounded-lg p-4 mb-6">
                      <p className="text-yellow-400 font-medium mb-2">
                        🔒 Comprehensive scanning requires a paid subscription
                      </p>
                      <p className="text-sm text-gray-300">
                        Upgrade to access advanced security assessments, compliance checks, and detailed remediation guidance
                      </p>
                    </div>
                  )}
                  
                  <div className="flex justify-center gap-4">
                    <Button className="bg-cyan-600 hover:bg-cyan-700">
                      <Download className="w-4 h-4 mr-2" />
                      Download Report
                    </Button>
                    <Button 
                      variant="outline" 
                      className="border-cyan-500 text-cyan-400"
                      onClick={() => {
                        toast({
                          title: "Consultation Scheduled",
                          description: "Our security experts will contact you within 24 hours to discuss your assessment results.",
                        });
                        // Open calendar booking or contact form
                        window.open('mailto:security@cybersecure.ai?subject=Security Consultation Request&body=I would like to schedule a security consultation to discuss my assessment results.', '_blank');
                      }}
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      Schedule Consultation
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Detailed Results */}
              <Tabs defaultValue="email_security" className="space-y-6">
                <TabsList className="bg-surface border border-surface-light grid grid-cols-5 max-w-4xl mx-auto">
                  {Object.entries(categoryNames).map(([key, name]) => (
                    <TabsTrigger key={key} value={key} className="text-xs">
                      <span className="hidden sm:inline mr-2">{categoryIcons[key as keyof typeof categoryIcons]}</span>
                      <span className="hidden md:inline">{name}</span>
                      <span className="md:hidden">{name.split(' ')[0]}</span>
                    </TabsTrigger>
                  ))}
                </TabsList>

                {Object.entries(scanResults.scanResults.categories).map(([categoryKey, results]) => (
                  <TabsContent key={categoryKey} value={categoryKey}>
                    <Card className="bg-surface/80 backdrop-blur-md border border-blue-500/30 cyber-glow">
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between text-xl text-white">
                          <div className="flex items-center">
                            <span className="mr-3 text-blue-400">
                              {categoryIcons[categoryKey as keyof typeof categoryIcons]}
                            </span>
                            {categoryNames[categoryKey as keyof typeof categoryNames]} Assessment
                          </div>
                          <Badge variant="outline" className="border-blue-500 text-blue-400">
                            {results.length} checks
                          </Badge>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        {results.length === 0 ? (
                          <div className="text-center py-8">
                            <Lock className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-gray-400 mb-2">
                              Advanced Checks Require Upgrade
                            </h3>
                            <p className="text-sm text-gray-500 mb-4">
                              {categoryNames[categoryKey as keyof typeof categoryNames]} assessments are available in paid plans
                            </p>
                            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                              <Star className="w-4 h-4 mr-2" />
                              Upgrade Now
                            </Button>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            {results.map((result, index) => (
                              <Card key={index} className="bg-background/50 border border-gray-700">
                                <CardContent className="p-4">
                                  <div className="flex items-start justify-between mb-3">
                                    <div className="flex items-center space-x-3">
                                      {getStatusIcon(result.status)}
                                      <div>
                                        <h4 className="font-bold text-white">{result.check}</h4>
                                        <p className="text-sm text-gray-400">{result.description}</p>
                                      </div>
                                    </div>
                                    <Badge className={`${getStatusColor(result.status)} border`} variant="outline">
                                      {result.status.toUpperCase()}
                                    </Badge>
                                  </div>
                                  <p className="text-sm text-gray-300 mb-2">{result.details}</p>
                                  {result.recommendation && (
                                    <div className="bg-blue-900/30 border border-blue-500/30 rounded-lg p-3 mt-3">
                                      <p className="text-sm text-blue-300">
                                        <strong>Recommendation:</strong> {result.recommendation}
                                      </p>
                                    </div>
                                  )}
                                  {result.technical_details && scanResults.userTier !== "standard" && (
                                    <div className="bg-gray-900/30 border border-gray-600/30 rounded-lg p-3 mt-2">
                                      <p className="text-xs text-gray-400 font-mono">
                                        <strong>Technical:</strong> {result.technical_details}
                                      </p>
                                    </div>
                                  )}
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>
                ))}
              </Tabs>

              {/* Next Steps */}
              <Card className="bg-surface/80 backdrop-blur-md border border-green-500/30 cyber-glow mt-12">
                <CardHeader>
                  <CardTitle className="text-2xl text-white text-center">Improve Your Security Posture</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-400 mb-8 max-w-3xl mx-auto">
                    Based on your assessment results, CyberSecure AI can help address the identified 
                    security gaps and implement comprehensive cybersecurity solutions tailored for 
                    your organization.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-green-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                        <Shield className="w-8 h-8 text-green-400" />
                      </div>
                      <h3 className="font-bold text-white mb-2">Automated Solutions</h3>
                      <p className="text-gray-400 text-sm">AI-powered threat detection and response</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                        <Lock className="w-8 h-8 text-blue-400" />
                      </div>
                      <h3 className="font-bold text-white mb-2">Compliance Management</h3>
                      <p className="text-gray-400 text-sm">FERPA, FISMA, FedRAMP automation</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-purple-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                        <Users className="w-8 h-8 text-purple-400" />
                      </div>
                      <h3 className="font-bold text-white mb-2">Expert Support</h3>
                      <p className="text-gray-400 text-sm">24/7 security monitoring and response</p>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button 
                      size="lg" 
                      className="bg-green-600 hover:bg-green-700 px-8"
                      onClick={() => {
                        toast({
                          title: "Consultation Request Submitted",
                          description: "A cybersecurity expert will contact you within 2 business hours to schedule your consultation.",
                        });
                        // Open contact form with pre-filled security consultation request
                        const subject = "Enterprise Security Consultation Request";
                        const body = `Hello,

I would like to schedule a comprehensive security consultation to discuss:
- My recent security assessment results
- Enterprise security strategy recommendations  
- Advanced threat protection implementation
- Compliance framework alignment

Please contact me at your earliest convenience.

Best regards`;
                        window.open(`mailto:enterprise@cybersecure.ai?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, '_blank');
                      }}
                    >
                      Schedule Security Consultation
                    </Button>
                    <Button 
                      size="lg" 
                      variant="outline" 
                      className="border-green-500 text-green-400 hover:bg-green-500/10 px-8"
                      onClick={() => {
                        // Navigate to solutions page
                        window.location.href = '/solutions';
                      }}
                    >
                      View Security Solutions
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </section>
          )}
        </div>
      </main>
      </div>
    </Layout>
  );
}