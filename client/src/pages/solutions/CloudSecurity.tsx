import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Cloud,
  Shield,
  Database,
  Network,
  Lock,
  CheckCircle,
  ArrowRight,
  Eye,
  Server,
  Brain,
  HardDrive,
  Key
} from "lucide-react";
import { MarketingLayout } from "@/components/MarketingLayout";
import { Link } from "wouter";

export default function CloudSecurity() {
  const cloudSecurityPillars = [
    {
      title: "Multi-Cloud Visibility",
      description: "Comprehensive visibility and control across AWS, Azure, Google Cloud, and SaaS platforms",
      icon: <Eye className="w-8 h-8" />,
      features: ["Asset discovery", "Configuration monitoring", "Compliance tracking", "Risk assessment"],
      coverage: { aws: 98, azure: 95, gcp: 92, saas: 97 }
    },
    {
      title: "Data Protection & Encryption",
      description: "Advanced data protection with encryption at rest, in transit, and in use",
      icon: <Lock className="w-8 h-8" />,
      features: ["End-to-end encryption", "Key management", "Data classification", "Privacy controls"],
      coverage: { encrypted: 99, classified: 87, protected: 94, compliant: 96 }
    },
    {
      title: "Identity & Access Management",
      description: "Cloud-native IAM with single sign-on, privileged access, and identity governance",
      icon: <Network className="w-8 h-8" />,
      features: ["SSO integration", "Privileged access", "Identity governance", "Access analytics"],
      coverage: { sso: 89, pam: 92, governance: 85, analytics: 88 }
    },
    {
      title: "Threat Detection & Response",
      description: "AI-powered threat detection with automated response across cloud environments",
      icon: <Brain className="w-8 h-8" />,
      features: ["Anomaly detection", "Behavioral analysis", "Automated response", "Threat intelligence"],
      coverage: { detection: 97, analysis: 94, response: 91, intelligence: 89 }
    }
  ];

  const cloudProviders = [
    { name: "Amazon Web Services", workloads: 456, security_score: 94, compliance: "SOC2/FedRAMP" },
    { name: "Microsoft Azure", workloads: 234, security_score: 91, compliance: "ISO27001/FISMA" },
    { name: "Google Cloud Platform", workloads: 189, security_score: 93, compliance: "SOC2/HIPAA" },
    { name: "SaaS Applications", workloads: 368, security_score: 89, compliance: "Multiple Frameworks" }
  ];

  const dataProtectionMetrics = [
    { type: "Student Records", volume: "4.2 TB", encryption: "100%", classification: "Highly Sensitive" },
    { type: "Financial Data", volume: "1.8 TB", encryption: "100%", classification: "Confidential" },
    { type: "Research Data", volume: "8.7 TB", encryption: "100%", classification: "Restricted" },
    { type: "Public Records", volume: "2.3 TB", encryption: "100%", classification: "Internal Use" }
  ];

  return (
    <MarketingLayout>
      <div className="min-h-screen bg-gradient-to-br from-background via-surface/50 to-background">
        {/* Hero Section */}
        <section className="py-20 px-6 bg-gradient-to-br from-blue-50/10 via-cyan-50/10 to-background">
          <div className="container mx-auto max-w-6xl text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center">
                <Cloud className="w-10 h-10 text-white" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 geometric-text">
              Cloud Security Solutions
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-4xl mx-auto">
              Comprehensive multi-cloud security with AI-powered protection, advanced data encryption, and seamless compliance management for modern organizations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/security-scanner">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 px-12 py-4 text-lg">
                  Cloud Security Assessment
                </Button>
              </Link>
              <Link href="/solutions">
                <Button size="lg" variant="outline" className="border-blue-500 text-blue-400 hover:bg-blue-500/10 px-12 py-4 text-lg">
                  View All Solutions
                  <ArrowRight className="ml-2 w-6 h-6" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Cloud Security Benefits */}
        <section className="py-16 px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <Card className="bg-white/10 backdrop-blur-sm border border-white/20">
                <CardContent className="p-6 text-center">
                  <Server className="w-8 h-8 text-blue-400 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-blue-400 mb-2">85%</div>
                  <div className="text-white font-semibold mb-1">Cost Reduction</div>
                  <div className="text-gray-400 text-sm">Vs on-premises security</div>
                </CardContent>
              </Card>
              
              <Card className="bg-white/10 backdrop-blur-sm border border-white/20">
                <CardContent className="p-6 text-center">
                  <Lock className="w-8 h-8 text-cyan-400 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-cyan-400 mb-2">99.9%</div>
                  <div className="text-white font-semibold mb-1">Data Protection</div>
                  <div className="text-gray-400 text-sm">Encryption coverage</div>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-sm border border-white/20">
                <CardContent className="p-6 text-center">
                  <Eye className="w-8 h-8 text-green-400 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-green-400 mb-2">74%</div>
                  <div className="text-white font-semibold mb-1">Faster Detection</div>
                  <div className="text-gray-400 text-sm">Threat response time</div>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-sm border border-white/20">
                <CardContent className="p-6 text-center">
                  <Shield className="w-8 h-8 text-purple-400 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-purple-400 mb-2">95%</div>
                  <div className="text-white font-semibold mb-1">Compliance Rate</div>
                  <div className="text-gray-400 text-sm">Regulatory standards</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Cloud Provider Security Status */}
        <section className="py-16 px-6 bg-gradient-to-b from-surface/20 to-background">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-4xl font-bold text-white text-center mb-12">Multi-Cloud Security Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {cloudProviders.map((provider, index) => (
                <Card key={index} className="bg-white/10 backdrop-blur-sm border border-white/20">
                  <CardHeader>
                    <CardTitle className="text-white text-lg">{provider.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Workloads:</span>
                        <span className="text-white font-semibold">{provider.workloads}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Security Score:</span>
                        <span className="text-green-400 font-semibold">{provider.security_score}%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Compliance:</span>
                        <span className="text-blue-400 font-semibold">{provider.compliance}</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2 mt-3">
                        <div 
                          className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all"
                          style={{ width: `${provider.security_score}%` }}
                        ></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Data Protection Dashboard */}
        <section className="py-16 px-6">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-4xl font-bold text-white text-center mb-12">Cloud Data Protection Status</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {dataProtectionMetrics.map((data, index) => (
                <Card key={index} className="bg-white/10 backdrop-blur-sm border border-white/20">
                  <CardHeader>
                    <CardTitle className="text-white text-lg">{data.type}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Volume:</span>
                        <span className="text-white font-semibold">{data.volume}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Encrypted:</span>
                        <span className="text-green-400 font-semibold">{data.encryption}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Classification:</span>
                        <span className="text-purple-400 font-semibold">{data.classification}</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2 mt-3">
                        <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full w-full"></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Cloud Security Pillars */}
        <section className="py-16 px-6 bg-gradient-to-b from-surface/20 to-background">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-4xl font-bold text-white text-center mb-12">Cloud Security Architecture</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {cloudSecurityPillars.map((pillar, index) => (
                <Card key={index} className="bg-white/10 backdrop-blur-sm border border-white/20">
                  <CardHeader>
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                        {pillar.icon}
                      </div>
                      <CardTitle className="text-2xl text-white">{pillar.title}</CardTitle>
                    </div>
                    <p className="text-gray-300 text-lg mb-4">{pillar.description}</p>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      {Object.entries(pillar.coverage).map(([key, value]) => (
                        <div key={key} className="text-center p-2 bg-black/20 rounded">
                          <div className="text-sm font-bold text-blue-400">{value}%</div>
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

        {/* Call to Action */}
        <section className="py-20 px-6 bg-gradient-to-r from-blue-900/20 to-cyan-900/20">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-5xl font-bold text-white mb-8">Secure Your Cloud Infrastructure</h2>
            <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
              Deploy comprehensive multi-cloud security with advanced data protection, AI-powered threat detection, and seamless compliance management for educational institutions and government organizations.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/solutions">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 px-12 py-4 text-lg">
                  Explore All Solutions
                </Button>
              </Link>
              <Link href="/security-scanner">
                <Button size="lg" variant="outline" className="border-blue-500 text-blue-400 hover:bg-blue-500/10 px-12 py-4 text-lg">
                  Cloud Security Assessment
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