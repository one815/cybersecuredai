import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Shield,
  Lock,
  Eye,
  Network,
  Users,
  Database,
  CheckCircle,
  ArrowRight,
  Settings,
  Activity,
  AlertTriangle,
  Fingerprint,
  Key,
  Cpu
} from "lucide-react";
import { MarketingLayout } from "@/components/MarketingLayout";
import { Link } from "wouter";
import { useState, useEffect } from "react";

export default function ZeroTrustArchitecture() {
  const [verificationEvents, setVerificationEvents] = useState(3247);
  const [trustedDevices, setTrustedDevices] = useState(89);
  const [accessRequests, setAccessRequests] = useState(156);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [liveVerifications, setLiveVerifications] = useState([
    { user: "john.doe@edu.gov", resource: "Student Database", action: "GRANTED", risk: "Low", method: "MFA" },
    { user: "admin@school.edu", resource: "Network Config", action: "DENIED", risk: "High", method: "Device" },
    { user: "teacher@k12.edu", resource: "Grade Portal", action: "GRANTED", risk: "Low", method: "Biometric" },
    { user: "support@district.gov", resource: "File Server", action: "GRANTED", risk: "Medium", method: "Token" }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
      if (Math.random() > 0.6) {
        setVerificationEvents(prev => prev + Math.floor(Math.random() * 10));
        setTrustedDevices(Math.floor(Math.random() * 10) + 85);
        setAccessRequests(Math.floor(Math.random() * 20) + 150);
        
        // Update live verifications
        const users = ["alice.johnson@edu.gov", "bob.smith@school.edu", "carol.williams@district.gov", "david.brown@k12.edu"];
        const resources = ["Student Records", "Financial System", "HR Database", "Grade Portal", "Network Config"];
        const actions = ["GRANTED", "DENIED", "PENDING"];
        const risks = ["Low", "Medium", "High"];
        const methods = ["MFA", "Biometric", "Token", "Device", "Certificate"];
        
        const newVerification = {
          user: users[Math.floor(Math.random() * users.length)],
          resource: resources[Math.floor(Math.random() * resources.length)],
          action: actions[Math.floor(Math.random() * actions.length)],
          risk: risks[Math.floor(Math.random() * risks.length)],
          method: methods[Math.floor(Math.random() * methods.length)]
        };
        
        setLiveVerifications(prev => [newVerification, ...prev.slice(0, 5)]);
      }
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  const zeroTrustPrinciples = [
    {
      title: "Never Trust, Always Verify",
      description: "Every access request is verified regardless of location or credentials",
      icon: <Eye className="w-8 h-8" />,
      features: ["Identity verification", "Device authentication", "Contextual analysis", "Continuous monitoring"]
    },
    {
      title: "Least Privilege Access",
      description: "Users and devices receive minimal access necessary for their function",
      icon: <Key className="w-8 h-8" />,
      features: ["Role-based access", "Just-in-time permissions", "Privilege escalation controls", "Access reviews"]
    },
    {
      title: "Micro-Segmentation",
      description: "Network segmentation creates secure zones with granular access controls",
      icon: <Network className="w-8 h-8" />,
      features: ["Network isolation", "East-west traffic control", "Workload protection", "Dynamic policies"]
    },
    {
      title: "Continuous Verification",
      description: "Real-time monitoring and adaptive security posture based on risk assessment",
      icon: <Activity className="w-8 h-8" />,
      features: ["Behavioral analytics", "Risk scoring", "Adaptive policies", "Threat intelligence"]
    }
  ];

  const securityLayers = [
    { name: "Identity & Device", status: "Secured", policies: 247, coverage: 100 },
    { name: "Network Perimeter", status: "Protected", policies: 156, coverage: 98 },
    { name: "Application Layer", status: "Secured", policies: 189, coverage: 97 },
    { name: "Data Protection", status: "Encrypted", policies: 134, coverage: 100 }
  ];

  const complianceFrameworks = [
    { name: "NIST Zero Trust", compliance: 94, status: "Compliant" },
    { name: "CISA Guidelines", compliance: 97, status: "Compliant" },
    { name: "FERPA Requirements", compliance: 99, status: "Compliant" },
    { name: "FISMA Controls", compliance: 96, status: "Compliant" }
  ];

  const getActionColor = (action: string) => {
    switch (action) {
      case 'GRANTED': return 'text-green-400 bg-green-500/20';
      case 'DENIED': return 'text-red-400 bg-red-500/20';
      case 'PENDING': return 'text-yellow-400 bg-yellow-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low': return 'text-green-400';
      case 'Medium': return 'text-yellow-400';
      case 'High': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <MarketingLayout>
      <div className="ai-dashboard-bg min-h-screen">
        {/* Header */}
        <header className="bg-surface/90 backdrop-blur-md border-b border-surface-light p-6 cyber-glow">
          <div className="container mx-auto max-w-7xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center cyber-glow">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-white geometric-text">Zero Trust Security Architecture</h1>
                  <p className="text-xl text-gray-400">Never trust, always verify - comprehensive zero trust implementation</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-400">Live Monitoring</div>
                <div className="flex items-center text-green-400 font-bold">
                  <Activity className="w-4 h-4 mr-1" />
                  {currentTime.toLocaleTimeString()}
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="p-6">
          <div className="container mx-auto max-w-7xl space-y-8">
            {/* Live Security Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="bg-surface/80 backdrop-blur-md border border-purple-500/30 cyber-glow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-white flex items-center">
                    <Eye className="w-5 h-5 mr-2 text-purple-400" />
                    Verifications
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-purple-400">{verificationEvents.toLocaleString()}</div>
                  <p className="text-gray-400 text-sm">Today</p>
                </CardContent>
              </Card>

              <Card className="bg-surface/80 backdrop-blur-md border border-green-500/30 cyber-glow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-white flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2 text-green-400" />
                    Trusted Devices
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-400">{trustedDevices}</div>
                  <p className="text-gray-400 text-sm">Verified</p>
                </CardContent>
              </Card>

              <Card className="bg-surface/80 backdrop-blur-md border border-blue-500/30 cyber-glow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-white flex items-center">
                    <Key className="w-5 h-5 mr-2 text-blue-400" />
                    Access Requests
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-400">{accessRequests}</div>
                  <p className="text-gray-400 text-sm">Last hour</p>
                </CardContent>
              </Card>

              <Card className="bg-surface/80 backdrop-blur-md border border-cyan-500/30 cyber-glow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-white flex items-center">
                    <Lock className="w-5 h-5 mr-2 text-cyan-400" />
                    Security Score
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-cyan-400">96.7%</div>
                  <p className="text-gray-400 text-sm">Trust Level</p>
                </CardContent>
              </Card>
            </div>

            {/* Live Access Verifications */}
            <Card className="bg-surface/80 backdrop-blur-md border border-purple-500/30 cyber-glow">
              <CardHeader>
                <CardTitle className="text-2xl text-white flex items-center">
                  <Fingerprint className="w-6 h-6 mr-3 text-purple-400" />
                  Real-Time Access Verifications
                  <Badge className="ml-3 bg-purple-500/20 text-purple-400">LIVE</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {liveVerifications.map((verification, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-background/30 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <Badge className={getActionColor(verification.action)}>
                          {verification.action}
                        </Badge>
                        <div>
                          <div className="text-white font-semibold">{verification.user}</div>
                          <div className="text-gray-400 text-sm">→ {verification.resource}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <div className={`font-semibold ${getRiskColor(verification.risk)}`}>
                            {verification.risk} Risk
                          </div>
                          <div className="text-gray-400 text-sm">{verification.method}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Security Layers Status */}
            <Card className="bg-surface/80 backdrop-blur-md border border-green-500/30 cyber-glow">
              <CardHeader>
                <CardTitle className="text-2xl text-white flex items-center">
                  <Shield className="w-6 h-6 mr-3 text-green-400" />
                  Zero Trust Security Layers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {securityLayers.map((layer, index) => (
                    <div key={index} className="p-4 bg-background/30 rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-white font-semibold">{layer.name}</h4>
                        <Badge className="bg-green-500/20 text-green-400">
                          {layer.status}
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Policies:</span>
                          <span className="text-white">{layer.policies}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Coverage:</span>
                          <span className="text-green-400">{layer.coverage}%</span>
                        </div>
                        <Progress value={layer.coverage} className="mt-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Compliance Dashboard */}
            <Card className="bg-surface/80 backdrop-blur-md border border-blue-500/30 cyber-glow">
              <CardHeader>
                <CardTitle className="text-2xl text-white flex items-center">
                  <Database className="w-6 h-6 mr-3 text-blue-400" />
                  Zero Trust Compliance Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {complianceFrameworks.map((framework, index) => (
                    <div key={index} className="p-4 bg-background/30 rounded-lg text-center">
                      <h4 className="text-white font-semibold mb-2">{framework.name}</h4>
                      <div className="text-3xl font-bold text-blue-400 mb-2">{framework.compliance}%</div>
                      <Badge className="bg-green-500/20 text-green-400">
                        {framework.status}
                      </Badge>
                      <Progress value={framework.compliance} className="mt-3" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Zero Trust Principles */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {zeroTrustPrinciples.map((principle, index) => (
                <Card key={index} className="bg-surface/80 backdrop-blur-md border border-surface-light cyber-glow">
                  <CardHeader>
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg flex items-center justify-center">
                        {principle.icon}
                      </div>
                      <CardTitle className="text-xl text-white">{principle.title}</CardTitle>
                    </div>
                    <p className="text-gray-400">{principle.description}</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {principle.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-gray-300">
                          <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Implementation Benefits */}
            <Card className="bg-gradient-to-r from-purple-900/50 to-indigo-900/50 border border-purple-500/30 cyber-glow">
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold text-white mb-8 text-center">Zero Trust Implementation Benefits</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-400 mb-2">87%</div>
                    <div className="text-white font-semibold mb-1">Breach Risk Reduction</div>
                    <div className="text-gray-400 text-sm">vs traditional perimeter</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-indigo-400 mb-2">45%</div>
                    <div className="text-white font-semibold mb-1">Faster Incident Response</div>
                    <div className="text-gray-400 text-sm">automated verification</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-cyan-400 mb-2">99.9%</div>
                    <div className="text-white font-semibold mb-1">Identity Verification</div>
                    <div className="text-gray-400 text-sm">accuracy rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-400 mb-2">60%</div>
                    <div className="text-white font-semibold mb-1">Compliance Improvement</div>
                    <div className="text-gray-400 text-sm">regulatory alignment</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Call to Action */}
            <Card className="bg-gradient-to-r from-purple-900/50 to-indigo-900/50 border border-purple-500/30 cyber-glow">
              <CardContent className="p-12 text-center">
                <h2 className="text-4xl font-bold text-white mb-6">Implement Zero Trust Architecture</h2>
                <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                  Transform your security posture with comprehensive zero trust implementation designed for educational and government institutions.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/solutions">
                    <Button size="lg" className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 px-12 py-4 text-lg">
                      View Solutions
                    </Button>
                  </Link>
                  <Link href="/security-scanner">
                    <Button size="lg" variant="outline" className="border-purple-500 text-purple-400 hover:bg-purple-500/10 px-12 py-4 text-lg">
                      Security Assessment
                      <ArrowRight className="ml-2 w-6 h-6" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </MarketingLayout>
  );
}