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
  CheckCircle,
  ArrowRight,
  Settings,
  Activity,
  Fingerprint,
  Key,
  Brain,
  Database,
  Cpu
} from "lucide-react";
import { MarketingLayout } from "@/components/MarketingLayout";
import { Link } from "wouter";
import { useState, useEffect } from "react";

export default function ZeroTrustSecurity() {
  const [verificationEvents, setVerificationEvents] = useState(8547);
  const [trustedDevices, setTrustedDevices] = useState(234);
  const [policyChecks, setPolicyChecks] = useState(15672);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [liveVerifications, setLiveVerifications] = useState([
    { user: "faculty@university.edu", resource: "Student Database", result: "GRANTED", risk: "Low", method: "Biometric + MFA" },
    { user: "admin@school.district", resource: "Financial System", result: "DENIED", risk: "High", method: "Device Trust Failed" },
    { user: "student@k12.edu", resource: "Learning Portal", result: "GRANTED", risk: "Low", method: "SSO Validated" },
    { user: "clerk@city.gov", resource: "Citizen Records", result: "GRANTED", risk: "Medium", method: "Token + Location" }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
      if (Math.random() > 0.6) {
        setVerificationEvents(prev => prev + Math.floor(Math.random() * 15));
        setTrustedDevices(Math.floor(Math.random() * 20) + 225);
        setPolicyChecks(prev => prev + Math.floor(Math.random() * 50));
        
        // Update live verifications
        const users = ["teacher@elementary.edu", "principal@highschool.edu", "librarian@university.edu", "manager@county.gov"];
        const resources = ["Grade Portal", "HR System", "Research Data", "Public Records", "Budget System"];
        const results = ["GRANTED", "DENIED", "CONDITIONAL"];
        const risks = ["Low", "Medium", "High"];
        const methods = ["Biometric + MFA", "SSO Validated", "Token + Location", "Device Trust Failed", "Certificate Auth"];
        
        const newVerification = {
          user: users[Math.floor(Math.random() * users.length)],
          resource: resources[Math.floor(Math.random() * resources.length)],
          result: results[Math.floor(Math.random() * results.length)],
          risk: risks[Math.floor(Math.random() * risks.length)],
          method: methods[Math.floor(Math.random() * methods.length)]
        };
        
        setLiveVerifications(prev => [newVerification, ...prev.slice(0, 5)]);
      }
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  const zeroTrustPillars = [
    {
      title: "Identity-Centric Security",
      description: "Comprehensive identity verification and continuous authentication for all users and devices",
      icon: <Fingerprint className="w-8 h-8" />,
      features: ["Multi-factor authentication", "Biometric verification", "Behavioral analysis", "Continuous validation"],
      metrics: { accuracy: "99.7%", speed: "< 2s", coverage: "100%" }
    },
    {
      title: "Device Trust & Management",
      description: "Continuous device health assessment and trust scoring based on security posture",
      icon: <Cpu className="w-8 h-8" />,
      features: ["Device fingerprinting", "Health monitoring", "Compliance checking", "Risk assessment"],
      metrics: { managed: "234", compliance: "96%", updates: "Real-time" }
    },
    {
      title: "Network Micro-Segmentation",
      description: "Dynamic network segmentation with granular access controls and traffic inspection",
      icon: <Network className="w-8 h-8" />,
      features: ["Dynamic segmentation", "Traffic analysis", "Lateral movement prevention", "Policy enforcement"],
      metrics: { segments: "1,247", efficiency: "94%", latency: "< 1ms" }
    },
    {
      title: "Application Security",
      description: "Application-layer security with API protection and workload isolation",
      icon: <Database className="w-8 h-8" />,
      features: ["API security", "Workload protection", "Data encryption", "Access control"],
      metrics: { apis: "156", protection: "99.8%", encryption: "AES-256" }
    }
  ];

  const implementationAreas = [
    { area: "Identity Verification", coverage: 98, policies: 247, alerts: 0 },
    { area: "Network Access", coverage: 94, policies: 189, alerts: 2 },
    { area: "Application Layer", coverage: 96, policies: 156, alerts: 1 },
    { area: "Data Protection", coverage: 99, policies: 134, alerts: 0 }
  ];

  const industryBenefits = [
    { sector: "K-12 Education", breach_reduction: "89%", compliance: "FERPA/CIPA", implementation: "6 weeks" },
    { sector: "Higher Education", breach_reduction: "91%", compliance: "FERPA/FISMA", implementation: "8 weeks" },
    { sector: "Municipal Gov", breach_reduction: "87%", compliance: "FISMA/SOX", implementation: "10 weeks" },
    { sector: "Federal Agencies", breach_reduction: "94%", compliance: "FedRAMP/FISMA", implementation: "12 weeks" }
  ];

  const getResultColor = (result: string) => {
    switch (result) {
      case 'GRANTED': return 'text-green-400 bg-green-500/20';
      case 'DENIED': return 'text-red-400 bg-red-500/20';
      case 'CONDITIONAL': return 'text-yellow-400 bg-yellow-500/20';
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
                  <Eye className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-white geometric-text">Zero Trust Security Solutions</h1>
                  <p className="text-xl text-gray-400">Never trust, always verify - comprehensive zero trust architecture implementation</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-400">Live Security</div>
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
            {/* Live Zero Trust Metrics */}
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
                    <Cpu className="w-5 h-5 mr-2 text-green-400" />
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
                    <Settings className="w-5 h-5 mr-2 text-blue-400" />
                    Policy Checks
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-400">{policyChecks.toLocaleString()}</div>
                  <p className="text-gray-400 text-sm">This hour</p>
                </CardContent>
              </Card>

              <Card className="bg-surface/80 backdrop-blur-md border border-cyan-500/30 cyber-glow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-white flex items-center">
                    <Shield className="w-5 h-5 mr-2 text-cyan-400" />
                    Trust Score
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-cyan-400">96.8%</div>
                  <p className="text-gray-400 text-sm">Network-wide</p>
                </CardContent>
              </Card>
            </div>

            {/* Live Access Verification */}
            <Card className="bg-surface/80 backdrop-blur-md border border-purple-500/30 cyber-glow">
              <CardHeader>
                <CardTitle className="text-2xl text-white flex items-center">
                  <Fingerprint className="w-6 h-6 mr-3 text-purple-400" />
                  Real-Time Access Verification
                  <Badge className="ml-3 bg-purple-500/20 text-purple-400">LIVE</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {liveVerifications.map((verification, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-background/30 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <Badge className={getResultColor(verification.result)}>
                          {verification.result}
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

            {/* Zero Trust Implementation Status */}
            <Card className="bg-surface/80 backdrop-blur-md border border-blue-500/30 cyber-glow">
              <CardHeader>
                <CardTitle className="text-2xl text-white flex items-center">
                  <Network className="w-6 h-6 mr-3 text-blue-400" />
                  Zero Trust Implementation Coverage
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {implementationAreas.map((area, index) => (
                    <div key={index} className="p-4 bg-background/30 rounded-lg">
                      <h4 className="text-white font-semibold mb-3">{area.area}</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Coverage:</span>
                          <span className="text-green-400">{area.coverage}%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Policies:</span>
                          <span className="text-white">{area.policies}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Alerts:</span>
                          <span className={area.alerts === 0 ? "text-green-400" : "text-red-400"}>
                            {area.alerts}
                          </span>
                        </div>
                        <Progress value={area.coverage} className="mt-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Zero Trust Pillars */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {zeroTrustPillars.map((pillar, index) => (
                <Card key={index} className="bg-surface/80 backdrop-blur-md border border-surface-light cyber-glow">
                  <CardHeader>
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg flex items-center justify-center">
                        {pillar.icon}
                      </div>
                      <CardTitle className="text-xl text-white">{pillar.title}</CardTitle>
                    </div>
                    <p className="text-gray-400 mb-4">{pillar.description}</p>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      {Object.entries(pillar.metrics).map(([key, value]) => (
                        <div key={key} className="text-center">
                          <div className="text-lg font-bold text-purple-400">{value}</div>
                          <div className="text-xs text-gray-400 capitalize">{key}</div>
                        </div>
                      ))}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {pillar.features.map((feature, idx) => (
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

            {/* Industry Implementation Benefits */}
            <Card className="bg-surface/80 backdrop-blur-md border border-green-500/30 cyber-glow">
              <CardHeader>
                <CardTitle className="text-2xl text-white flex items-center">
                  <Users className="w-6 h-6 mr-3 text-green-400" />
                  Industry-Specific Zero Trust Benefits
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                  {industryBenefits.map((benefit, index) => (
                    <div key={index} className="p-4 bg-background/30 rounded-lg">
                      <h4 className="text-white font-semibold mb-3">{benefit.sector}</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Breach Reduction:</span>
                          <span className="text-green-400">{benefit.breach_reduction}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Compliance:</span>
                          <span className="text-blue-400">{benefit.compliance}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Implementation:</span>
                          <span className="text-purple-400">{benefit.implementation}</span>
                        </div>
                        <Progress value={parseInt(benefit.breach_reduction)} className="mt-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Zero Trust Benefits */}
            <Card className="bg-gradient-to-r from-purple-900/50 to-indigo-900/50 border border-purple-500/30 cyber-glow">
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold text-white mb-8 text-center">Zero Trust Security Benefits</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-400 mb-2">90%</div>
                    <div className="text-white font-semibold mb-1">Breach Risk Reduction</div>
                    <div className="text-gray-400 text-sm">vs traditional perimeter</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-indigo-400 mb-2">67%</div>
                    <div className="text-white font-semibold mb-1">Faster Threat Detection</div>
                    <div className="text-gray-400 text-sm">continuous verification</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-cyan-400 mb-2">99.7%</div>
                    <div className="text-white font-semibold mb-1">Identity Verification</div>
                    <div className="text-gray-400 text-sm">accuracy rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-400 mb-2">78%</div>
                    <div className="text-white font-semibold mb-1">Compliance Improvement</div>
                    <div className="text-gray-400 text-sm">regulatory alignment</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Call to Action */}
            <Card className="bg-gradient-to-r from-purple-900/50 to-indigo-900/50 border border-purple-500/30 cyber-glow">
              <CardContent className="p-12 text-center">
                <h2 className="text-4xl font-bold text-white mb-6">Transform Your Security with Zero Trust</h2>
                <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                  Implement comprehensive zero trust architecture designed for educational institutions and government organizations with continuous verification and intelligent access controls.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/solutions">
                    <Button size="lg" className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 px-12 py-4 text-lg">
                      Explore All Solutions
                    </Button>
                  </Link>
                  <Link href="/security-scanner">
                    <Button size="lg" variant="outline" className="border-purple-500 text-purple-400 hover:bg-purple-500/10 px-12 py-4 text-lg">
                      Zero Trust Assessment
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