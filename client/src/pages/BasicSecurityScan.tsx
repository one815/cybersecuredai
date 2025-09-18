import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { 
  Shield, 
  Search, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  Globe,
  Lock,
  Loader2,
  Crown,
  Zap,
  Star,
  ArrowRight
} from "lucide-react";
import { Layout } from "@/components/Layout";

interface BasicScanResult {
  check: string;
  status: 'pass' | 'fail' | 'warning';
  description: string;
  details: string;
  recommendation: string;
  score: number;
}

export default function BasicSecurityScan() {
  const [domain, setDomain] = useState("");
  const [scanResults, setScanResults] = useState<any>(null);
  const [scanProgress, setScanProgress] = useState(0);
  const { toast } = useToast();

  const scanMutation = useMutation({
    mutationFn: async (domain: string) => {
      const response = await apiRequest('/api/basic-security-scan', { method: 'POST', data: { domain } });
      return await response.json();
    },
    onSuccess: (data) => {
      setScanResults(data);
      setScanProgress(100);
      toast({
        title: "Basic Security Scan Complete",
        description: `Your domain security score: ${data.overallScore}/100`,
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

    setScanProgress(0);
    setScanResults(null);

    // Progressive scan simulation
    const progressInterval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return prev;
        }
        return prev + 15;
      });
    }, 400);

    scanMutation.mutate(domain);
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
      case 'pass': return 'border-green-500 text-green-400';
      case 'fail': return 'border-red-500 text-red-400';
      case 'warning': return 'border-yellow-500 text-yellow-400';
      default: return 'border-gray-500 text-gray-400';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <Layout>
      <div className="ai-dashboard-bg min-h-screen">
        {/* Header */}
        <header className="bg-surface/90 backdrop-blur-md border-b border-surface-light p-6 cyber-glow">
          <div className="container mx-auto max-w-6xl">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                  <Shield className="w-8 h-8 text-green-400" />
                  <span>Free Security Check</span>
                  <Globe className="w-8 h-8 text-blue-400" />
                </h1>
                <p className="text-gray-400">
                  Quick security assessment for your domain - completely free!
                </p>
              </div>
              <Button 
                variant="outline" 
                className="border-orange-500 text-orange-400 hover:bg-orange-500/10"
                onClick={() => window.location.href = '/security-scanner'}
              >
                <Crown className="w-4 h-4 mr-2" />
                Upgrade to Enterprise Scanner
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </header>

        <main className="container mx-auto max-w-6xl p-6 space-y-8">
          {/* Scan Input */}
          <section>
            <Card className="bg-surface/80 backdrop-blur-md border border-green-500/30 cyber-glow">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-white mb-4">
                  <Shield className="w-8 h-8 mx-auto mb-2 text-green-400" />
                  Basic Security Assessment
                </CardTitle>
                <p className="text-gray-400">
                  Enter your domain to get a free security check including SSL, DNS, and basic infrastructure analysis
                </p>
              </CardHeader>
              <CardContent>
                <div className="max-w-2xl mx-auto space-y-6">
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <Input
                        placeholder="Enter your domain (e.g., example.com)"
                        value={domain}
                        onChange={(e) => setDomain(e.target.value)}
                        className="bg-surface border-gray-600 text-white text-lg py-6"
                        disabled={scanMutation.isPending}
                      />
                    </div>
                    <Button 
                      onClick={handleScan} 
                      disabled={!domain || scanMutation.isPending}
                      className="bg-green-600 hover:bg-green-700 px-8 py-6 text-lg"
                    >
                      {scanMutation.isPending ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          Scanning...
                        </>
                      ) : (
                        <>
                          <Search className="w-5 h-5 mr-2" />
                          Scan Now
                        </>
                      )}
                    </Button>
                  </div>

                  {scanMutation.isPending && (
                    <div className="space-y-4">
                      <Progress value={scanProgress} className="w-full" />
                      <div className="text-center text-sm text-gray-400">
                        {scanProgress < 30 && "Checking SSL certificate..."}
                        {scanProgress >= 30 && scanProgress < 60 && "Analyzing DNS configuration..."}
                        {scanProgress >= 60 && scanProgress < 90 && "Testing domain security..."}
                        {scanProgress >= 90 && "Finalizing results..."}
                      </div>
                    </div>
                  )}

                  {/* Free Features Info */}
                  <div className="bg-gradient-to-r from-green-900/30 to-blue-900/30 border border-green-500/30 rounded-lg p-4">
                    <h3 className="font-bold text-green-400 mb-2">✅ Free Security Check Includes:</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-300">
                      <div>• SSL/TLS Certificate Analysis</div>
                      <div>• DNS Security Configuration</div>
                      <div>• Basic Domain Information</div>
                      <div>• Security Score & Recommendations</div>
                    </div>
                  </div>

                  {/* Upgrade Promotion */}
                  <div className="bg-gradient-to-r from-orange-900/30 to-red-900/30 border border-orange-500/30 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-bold text-orange-400 mb-1">🚀 Want More Comprehensive Security?</h3>
                        <p className="text-sm text-gray-300">
                          Enterprise scanner includes email security, cloud services, social engineering assessments, and 25+ advanced checks
                        </p>
                      </div>
                      <Button 
                        size="sm" 
                        className="bg-orange-600 hover:bg-orange-700 whitespace-nowrap"
                        onClick={() => {
                          window.location.href = '/pricing';
                        }}
                      >
                        <Star className="w-4 h-4 mr-2" />
                        Upgrade Now
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Scan Results */}
          {scanResults && (
            <section>
              {/* Overall Score */}
              <Card className="bg-surface/80 backdrop-blur-md border border-green-500/30 cyber-glow mb-8">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl text-white">
                    Security Report for {scanResults.domain}
                  </CardTitle>
                  <Badge className="bg-green-600 text-white mt-2">
                    Free Security Check
                  </Badge>
                </CardHeader>
                <CardContent className="text-center">
                  <div className={`text-6xl font-bold mb-4 ${getScoreColor(scanResults.overallScore)}`}>
                    {scanResults.overallScore}/100
                  </div>
                  <p className="text-gray-400 mb-6">Security Score</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-background/50 rounded-lg p-4">
                      <div className="text-2xl font-bold text-green-400">{scanResults.checksPerformed}</div>
                      <div className="text-sm text-gray-400">Checks Performed</div>
                    </div>
                    <div className="bg-background/50 rounded-lg p-4">
                      <div className="text-2xl font-bold text-red-400">{scanResults.issuesFound}</div>
                      <div className="text-sm text-gray-400">Issues Found</div>
                    </div>
                    <div className="bg-background/50 rounded-lg p-4">
                      <div className="text-2xl font-bold text-blue-400">{scanResults.recommendations}</div>
                      <div className="text-sm text-gray-400">Recommendations</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Detailed Results */}
              <Card className="bg-surface/80 backdrop-blur-md border border-blue-500/30 cyber-glow">
                <CardHeader>
                  <CardTitle className="text-xl text-white flex items-center">
                    <Lock className="w-6 h-6 mr-3 text-blue-400" />
                    Basic Security Assessment Results
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {scanResults.results.map((result: BasicScanResult, index: number) => (
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
                            <div className="flex items-center space-x-2">
                              <Badge className={`${getStatusColor(result.status)} border`} variant="outline">
                                {result.status.toUpperCase()}
                              </Badge>
                              <Badge variant="outline" className="border-blue-500 text-blue-400">
                                {result.score}/100
                              </Badge>
                            </div>
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

                  {/* Upgrade CTA */}
                  <div className="mt-8 bg-gradient-to-r from-orange-900/30 to-red-900/30 border border-orange-500/30 rounded-lg p-6 text-center">
                    <h3 className="text-xl font-bold text-orange-400 mb-3">
                      🔒 Unlock Complete Security Assessment
                    </h3>
                    <p className="text-gray-300 mb-4">
                      Get comprehensive security analysis including email security, cloud services, social engineering vulnerabilities, and 25+ advanced security checks.
                    </p>
                    <Button 
                      className="bg-orange-600 hover:bg-orange-700"
                      onClick={() => {
                        window.location.href = '/security-scanner';
                      }}
                    >
                      <Crown className="w-4 h-4 mr-2" />
                      Upgrade to Enterprise Scanner
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </section>
          )}
        </main>
      </div>
    </Layout>
  );
}