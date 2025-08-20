import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  FileText
} from "lucide-react";
import { MarketingLayout } from "@/components/MarketingLayout";

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
  const [isScanning, setIsScanning] = useState(false);
  const [scanResults, setScanResults] = useState<ScanResults | null>(null);
  const [scanProgress, setScanProgress] = useState(0);

  const handleScan = async () => {
    if (!domain) return;

    setIsScanning(true);
    setScanProgress(0);
    setScanResults(null);

    // Simulate progressive scanning
    const progressIntervals = [20, 40, 60, 80, 90, 100];
    let currentStep = 0;

    const progressInterval = setInterval(() => {
      if (currentStep < progressIntervals.length) {
        setScanProgress(progressIntervals[currentStep]);
        currentStep++;
      }
    }, 800);

    // Simulate scan results after 5 seconds
    setTimeout(() => {
      clearInterval(progressInterval);
      setIsScanning(false);
      setScanProgress(100);
      
      // Mock results based on the scanner document
      setScanResults({
        domain: domain,
        overall_score: Math.floor(Math.random() * 40) + 60, // 60-100 score
        categories: {
          email_security: [
            {
              check: "SPF Record",
              status: Math.random() > 0.3 ? 'pass' : 'fail',
              description: "Sender Policy Framework configuration",
              details: "Prevents email spoofing from unauthorized servers",
              recommendation: "Configure SPF record with appropriate restrictions"
            },
            {
              check: "DKIM Implementation", 
              status: Math.random() > 0.4 ? 'pass' : 'warning',
              description: "DomainKeys Identified Mail signatures",
              details: "Ensures email authenticity and prevents tampering",
              recommendation: "Enable DKIM signing for all outbound emails"
            },
            {
              check: "DMARC Policy",
              status: Math.random() > 0.5 ? 'pass' : 'fail',
              description: "Domain-based Message Authentication policy",
              details: "Provides instructions on handling authentication failures",
              recommendation: "Implement DMARC policy with quarantine/reject"
            }
          ],
          web_infrastructure: [
            {
              check: "SSL/TLS Certificate",
              status: Math.random() > 0.2 ? 'pass' : 'fail',
              description: "SSL certificate validity and configuration",
              details: "Secures communications and prevents MitM attacks",
              recommendation: "Update to latest TLS version with strong ciphers"
            },
            {
              check: "Security Headers",
              status: Math.random() > 0.6 ? 'pass' : 'warning',
              description: "HTTP security headers implementation",
              details: "Protects against common web vulnerabilities",
              recommendation: "Implement CSP, HSTS, and X-Frame-Options headers"
            },
            {
              check: "Open Ports",
              status: Math.random() > 0.4 ? 'pass' : 'warning',
              description: "Unnecessary exposed network ports",
              details: "Reduces attack surface and potential entry points",
              recommendation: "Close unnecessary ports and services"
            }
          ],
          cloud_services: [
            {
              check: "Cloud Storage Exposure",
              status: Math.random() > 0.7 ? 'pass' : 'fail',
              description: "Publicly accessible cloud storage buckets",
              details: "Prevents data leakage from misconfigured storage",
              recommendation: "Review and secure cloud storage permissions"
            },
            {
              check: "API Security",
              status: Math.random() > 0.5 ? 'pass' : 'warning', 
              description: "API authentication and rate limiting",
              details: "Prevents unauthorized access or API abuse",
              recommendation: "Implement proper API authentication and rate limits"
            }
          ],
          social_engineering: [
            {
              check: "Employee Information Exposure",
              status: Math.random() > 0.3 ? 'warning' : 'fail',
              description: "Excessive personal information in public directories",
              details: "Could be used for targeted social engineering attacks",
              recommendation: "Limit public employee information disclosure"
            },
            {
              check: "Password Policy Indicators",
              status: Math.random() > 0.4 ? 'pass' : 'warning',
              description: "Password strength requirements assessment",
              details: "Indicates overall security maturity and prevents brute force",
              recommendation: "Enforce strong password policies and MFA"
            }
          ],
          business_systems: [
            {
              check: "Authentication Methods",
              status: Math.random() > 0.5 ? 'pass' : 'warning',
              description: "Multi-factor authentication implementation",
              details: "Strong authentication reduces breach risk",
              recommendation: "Implement MFA across all business systems"
            },
            {
              check: "Third-Party Integrations",
              status: Math.random() > 0.6 ? 'pass' : 'warning',
              description: "Security of connected third-party services",
              details: "Prevents unauthorized access through connected systems",
              recommendation: "Audit and secure all third-party integrations"
            }
          ]
        }
      });
    }, 5000);
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
    <MarketingLayout>
      <div className="ai-dashboard-bg min-h-screen">
      {/* Header */}
      <header className="bg-surface/90 backdrop-blur-md border-b border-surface-light p-6 cyber-glow">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-red-500 rounded-lg flex items-center justify-center">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white flex items-center space-x-2">
                <span>Security Scanner</span>
                <Shield className="w-8 h-8 text-orange-400" />
                <Eye className="w-8 h-8 text-blue-400" />
              </h1>
              <p className="text-gray-400">Free infrastructure security assessment for your organization</p>
            </div>
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
                        disabled={isScanning}
                      />
                    </div>
                    <Button 
                      onClick={handleScan} 
                      disabled={!domain || isScanning}
                      className="bg-orange-600 hover:bg-orange-700 px-8"
                    >
                      {isScanning ? (
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

                  {isScanning && (
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
                </CardHeader>
                <CardContent className="text-center">
                  <div className={`text-6xl font-bold mb-4 ${getScoreColor(scanResults.overall_score)}`}>
                    {scanResults.overall_score}/100
                  </div>
                  <p className="text-gray-400 mb-6">Overall Security Score</p>
                  <div className="flex justify-center gap-4">
                    <Button className="bg-cyan-600 hover:bg-cyan-700">
                      <Download className="w-4 h-4 mr-2" />
                      Download Report
                    </Button>
                    <Button variant="outline" className="border-cyan-500 text-cyan-400">
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

                {Object.entries(scanResults.categories).map(([categoryKey, results]) => (
                  <TabsContent key={categoryKey} value={categoryKey}>
                    <Card className="bg-surface/80 backdrop-blur-md border border-blue-500/30 cyber-glow">
                      <CardHeader>
                        <CardTitle className="flex items-center text-xl text-white">
                          <span className="mr-3 text-blue-400">
                            {categoryIcons[categoryKey as keyof typeof categoryIcons]}
                          </span>
                          {categoryNames[categoryKey as keyof typeof categoryNames]} Assessment
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
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
                              </CardContent>
                            </Card>
                          ))}
                        </div>
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
                    <Button size="lg" className="bg-green-600 hover:bg-green-700 px-8">
                      Schedule Security Consultation
                    </Button>
                    <Button size="lg" variant="outline" className="border-green-500 text-green-400 hover:bg-green-500/10 px-8">
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
    </MarketingLayout>
  );
}