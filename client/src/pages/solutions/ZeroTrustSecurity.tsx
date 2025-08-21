import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Eye,
  Shield,
  Network,
  Users,
  CheckCircle,
  ArrowRight,
  Fingerprint,
  Key,
  Database,
  Cpu,
  Lock,
  Settings
} from "lucide-react";
import { MarketingLayout } from "@/components/MarketingLayout";
import { Link } from "wouter";

export default function ZeroTrustSecurity() {
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
      metrics: { managed: "234+", compliance: "96%", updates: "Real-time" }
    },
    {
      title: "Network Micro-Segmentation",
      description: "Dynamic network segmentation with granular access controls and traffic inspection",
      icon: <Network className="w-8 h-8" />,
      features: ["Dynamic segmentation", "Traffic analysis", "Lateral movement prevention", "Policy enforcement"],
      metrics: { segments: "1,247+", efficiency: "94%", latency: "< 1ms" }
    },
    {
      title: "Application Security",
      description: "Application-layer security with API protection and workload isolation",
      icon: <Database className="w-8 h-8" />,
      features: ["API security", "Workload protection", "Data encryption", "Access control"],
      metrics: { apis: "156+", protection: "99.8%", encryption: "AES-256" }
    }
  ];

  const industryBenefits = [
    { sector: "K-12 Education", breach_reduction: "89%", compliance: "FERPA/CIPA", implementation: "6 weeks" },
    { sector: "Higher Education", breach_reduction: "91%", compliance: "FERPA/FISMA", implementation: "8 weeks" },
    { sector: "Municipal Gov", breach_reduction: "87%", compliance: "FISMA/SOX", implementation: "10 weeks" },
    { sector: "Federal Agencies", breach_reduction: "94%", compliance: "FedRAMP/FISMA", implementation: "12 weeks" }
  ];

  const implementationAreas = [
    { area: "Identity Verification", coverage: 98, policies: 247 },
    { area: "Network Access", coverage: 94, policies: 189 },
    { area: "Application Layer", coverage: 96, policies: 156 },
    { area: "Data Protection", coverage: 99, policies: 134 }
  ];

  return (
    <MarketingLayout>
      <div className="min-h-screen bg-gradient-to-br from-background via-surface/50 to-background">
        {/* Hero Section */}
        <section className="py-20 px-6 bg-gradient-to-br from-purple-50/10 via-indigo-50/10 to-background">
          <div className="container mx-auto max-w-6xl text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl flex items-center justify-center">
                <Eye className="w-10 h-10 text-white" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 geometric-text">
              Zero Trust Security Solutions
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-4xl mx-auto">
              Never trust, always verify - comprehensive zero trust architecture implementation with continuous verification and intelligent access controls.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/security-scanner">
                <Button size="lg" className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 px-12 py-4 text-lg">
                  Zero Trust Assessment
                </Button>
              </Link>
              <Link href="/solutions">
                <Button size="lg" variant="outline" className="border-purple-500 text-purple-400 hover:bg-purple-500/10 px-12 py-4 text-lg">
                  View All Solutions
                  <ArrowRight className="ml-2 w-6 h-6" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Zero Trust Benefits */}
        <section className="py-16 px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <Card className="bg-white/10 backdrop-blur-sm border border-white/20">
                <CardContent className="p-6 text-center">
                  <Shield className="w-8 h-8 text-purple-400 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-purple-400 mb-2">90%</div>
                  <div className="text-white font-semibold mb-1">Breach Risk Reduction</div>
                  <div className="text-gray-400 text-sm">Vs traditional perimeter</div>
                </CardContent>
              </Card>
              
              <Card className="bg-white/10 backdrop-blur-sm border border-white/20">
                <CardContent className="p-6 text-center">
                  <Eye className="w-8 h-8 text-indigo-400 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-indigo-400 mb-2">67%</div>
                  <div className="text-white font-semibold mb-1">Faster Threat Detection</div>
                  <div className="text-gray-400 text-sm">Continuous verification</div>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-sm border border-white/20">
                <CardContent className="p-6 text-center">
                  <Fingerprint className="w-8 h-8 text-cyan-400 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-cyan-400 mb-2">99.7%</div>
                  <div className="text-white font-semibold mb-1">Identity Verification</div>
                  <div className="text-gray-400 text-sm">Accuracy rate</div>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-sm border border-white/20">
                <CardContent className="p-6 text-center">
                  <Settings className="w-8 h-8 text-green-400 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-green-400 mb-2">78%</div>
                  <div className="text-white font-semibold mb-1">Compliance Improvement</div>
                  <div className="text-gray-400 text-sm">Regulatory alignment</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Implementation Coverage */}
        <section className="py-16 px-6 bg-gradient-to-b from-surface/20 to-background">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-4xl font-bold text-white text-center mb-12">Zero Trust Implementation Coverage</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {implementationAreas.map((area, index) => (
                <Card key={index} className="bg-white/10 backdrop-blur-sm border border-white/20">
                  <CardContent className="p-6">
                    <h4 className="text-white font-semibold mb-4 text-xl">{area.area}</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Coverage:</span>
                        <span className="text-green-400 font-semibold">{area.coverage}%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Active Policies:</span>
                        <span className="text-white font-semibold">{area.policies}</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2 mt-3">
                        <div 
                          className="bg-gradient-to-r from-purple-500 to-indigo-500 h-2 rounded-full transition-all"
                          style={{ width: `${area.coverage}%` }}
                        ></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Zero Trust Pillars */}
        <section className="py-16 px-6">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-4xl font-bold text-white text-center mb-12">Zero Trust Security Pillars</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {zeroTrustPillars.map((pillar, index) => (
                <Card key={index} className="bg-white/10 backdrop-blur-sm border border-white/20">
                  <CardHeader>
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center">
                        {pillar.icon}
                      </div>
                      <CardTitle className="text-2xl text-white">{pillar.title}</CardTitle>
                    </div>
                    <p className="text-gray-300 text-lg mb-4">{pillar.description}</p>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      {Object.entries(pillar.metrics).map(([key, value]) => (
                        <div key={key} className="text-center p-2 bg-black/20 rounded">
                          <div className="text-sm font-bold text-purple-400">{value}</div>
                          <div className="text-xs text-gray-400 capitalize">{key}</div>
                        </div>
                      ))}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {pillar.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-gray-200">
                          <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                          <span className="text-lg">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Industry Benefits */}
        <section className="py-16 px-6 bg-gradient-to-b from-surface/20 to-background">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-4xl font-bold text-white text-center mb-12">Industry-Specific Zero Trust Benefits</h2>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {industryBenefits.map((benefit, index) => (
                <Card key={index} className="bg-white/10 backdrop-blur-sm border border-white/20">
                  <CardHeader>
                    <CardTitle className="text-white text-lg">{benefit.sector}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Breach Reduction:</span>
                        <span className="text-green-400 font-semibold">{benefit.breach_reduction}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Compliance:</span>
                        <span className="text-blue-400 font-semibold">{benefit.compliance}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Implementation:</span>
                        <span className="text-purple-400 font-semibold">{benefit.implementation}</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2 mt-3">
                        <div 
                          className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all"
                          style={{ width: benefit.breach_reduction }}
                        ></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 px-6 bg-gradient-to-r from-purple-900/20 to-indigo-900/20">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-5xl font-bold text-white mb-8">Transform Your Security with Zero Trust</h2>
            <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
              Implement comprehensive zero trust architecture designed for educational institutions and government organizations with continuous verification and intelligent access controls.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
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
          </div>
        </section>
      </div>
    </MarketingLayout>
  );
}