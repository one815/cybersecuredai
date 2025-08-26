import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Brain, 
  Shield, 
  Zap, 
  Users, 
  Server, 
  Lock,
  CheckCircle,
  AlertTriangle,
  Database,
  Network,
  Eye,
  Clock,
  Award,
  Bot,
  GraduationCap,
  Flag,
  TrendingUp,
  Activity,
  FileText,
  Target,
  Fingerprint,
  Building,
  Home,
  Cpu,
  HardDrive,
  Camera,
  Wifi,
  Key,
  Smartphone
} from "lucide-react";
import { Link } from "wouter";
import { MarketingLayout } from "@/components/MarketingLayout";

export default function Pricing() {
  // Core Product Offerings by Package
  const corePackages = [
    {
      name: "CyberSecure Essential",
      targetAudience: "Small K-12 schools, small municipal offices",
      icon: <Shield className="w-12 h-12 text-blue-400" />,
      color: "from-blue-400 to-blue-600",
      components: [
        "CyberSecure AI Core Platform",
        "Automated Incident Response (basic playbooks)",
        "Threat Detection System",
        "Compliance Automation",
        "Cat6A Structured Cabling System",
        "Basic Network Cabinet with Lock",
        "Patch Panels and Cable Management",
        "Entry-level Access Control"
      ]
    },
    {
      name: "CyberSecure Advanced",
      targetAudience: "Mid-sized school districts, colleges, city governments",
      icon: <Brain className="w-12 h-12 text-purple-400" />,
      color: "from-purple-400 to-purple-600",
      components: [
        "CyberSecure AI Core Platform",
        "Advanced Automated Incident Response",
        "Threat Detection with AI Analysis",
        "Predictive Risk Analysis",
        "Comprehensive Compliance Automation",
        "24/7 Monitoring and Vulnerability Management",
        "Cat6A Shielded Cabling System",
        "Fiber Optic Backbone",
        "Advanced Network Cabinets",
        "Security Camera Infrastructure",
        "Intermediate Access Control System"
      ]
    },
    {
      name: "CyberSecure Enterprise",
      targetAudience: "Large universities, state education departments, federal agencies",
      icon: <Network className="w-12 h-12 text-cyan-400" />,
      color: "from-cyan-400 to-cyan-600",
      components: [
        "CyberSecure AI Core Platform (unlimited users)",
        "Enterprise Automated Incident Response",
        "Advanced Threat Detection with ML",
        "Predictive Risk Analysis with customized models",
        "Comprehensive Compliance Automation",
        "24/7 Monitoring",
        "Security Awareness Training",
        "Custom Integration Framework",
        "Campus-wide Cat6A Shielded Cabling",
        "Redundant Fiber Optic Backbone",
        "High-Security Network Cabinets",
        "Comprehensive Security Camera Infrastructure",
        "Advanced Access Control System"
      ]
    },
    {
      name: "Custom Government Package",
      targetAudience: "Specialized federal requirements (DCMA, FedRAMP)",
      icon: <Flag className="w-12 h-12 text-red-400" />,
      color: "from-red-400 to-red-600",
      components: [
        "FedRAMP/FISMA compliant solutions",
        "DCMA compliance frameworks",
        "NIST 800-53 control mapping",
        "Federal contract-specific security requirements",
        "Sole source contract support",
        "Custom hardware and cloud configurations"
      ]
    }
  ];

  // Hardware Security Module (HSM) Integration Specifications
  const hsmSolutions = [
    {
      package: "CyberSecure Essential",
      solution: "YubiHSM 2",
      specifications: [
        "FIPS 140-2 Level 3 validated",
        "16 concurrent connections",
        "RSA, ECC, ECDSA algorithms",
        "Hardware-based key protection",
        "USB form factor"
      ],
      benefits: [
        "Cost-effective hardware security",
        "Simple deployment",
        "Key protection for small institutions",
        "Compatible with basic compliance requirements"
      ],
      icon: <Key className="w-8 h-8 text-blue-400" />
    },
    {
      package: "CyberSecure Advanced",
      solution: "Thales Luna Network HSM",
      specifications: [
        "FIPS 140-2 Level 3 certified",
        "1000+ RSA ops/second",
        "Built-in backup capabilities",
        "Clustering support",
        "Network appliance"
      ],
      benefits: [
        "Scalable key management",
        "High-performance cryptographic operations",
        "Enhanced compliance capabilities",
        "Support for city governments"
      ],
      icon: <Server className="w-8 h-8 text-purple-400" />
    },
    {
      package: "CyberSecure Enterprise",
      solution: "AWS Cloud HSM + Thales Luna HSM",
      specifications: [
        "FIPS 140-2 Level 3 compliance",
        "High availability cluster",
        "Hybrid cloud/on-premises deployment",
        "24/7 managed HSM service",
        "FedRAMP certified cloud integration"
      ],
      benefits: [
        "Enterprise-grade key management",
        "Hybrid deployment flexibility",
        "Maximum regulatory compliance",
        "Federal agency readiness"
      ],
      icon: <Network className="w-8 h-8 text-cyan-400" />
    },
    {
      package: "Custom Government Package",
      solution: "Dedicated FIPS 140-3 Validated HSM",
      specifications: [
        "FIPS 140-3 validated",
        "Tamper-evident seals",
        "Physical hardware isolation",
        "Custom key ceremony support",
        "Air-gapped deployment options"
      ],
      benefits: [
        "Meets specialized federal requirements",
        "DCMA compliance",
        "Highest level of cryptographic assurance",
        "Custom deployment options"
      ],
      icon: <Lock className="w-8 h-8 text-red-400" />
    }
  ];

  // Authentication Hardware Integration
  const authSolutions = [
    {
      package: "CyberSecure Essential",
      solution: "YubiKey 5 Series",
      specifications: [
        "FIDO2/WebAuthn compliant",
        "NFC capability",
        "Multi-protocol support",
        "Physical authentication device",
        "10 keys included"
      ],
      benefits: [
        "Phishing-resistant MFA",
        "Easy deployment",
        "Support for passwordless authentication",
        "Improved security posture"
      ],
      icon: <Smartphone className="w-8 h-8 text-blue-400" />
    },
    {
      package: "CyberSecure Advanced",
      solution: "YubiKey 5 Series + Okta IAM",
      specifications: [
        "FIDO2 implementation",
        "Cloud-based IAM integration",
        "Single sign-on capabilities",
        "Role-based access control",
        "25 keys included"
      ],
      benefits: [
        "Centralized identity management",
        "Enhanced user experience",
        "Comprehensive authentication logs",
        "Streamlined user provisioning"
      ],
      icon: <Users className="w-8 h-8 text-purple-400" />
    },
    {
      package: "CyberSecure Enterprise",
      solution: "Biometric Authentication Suite",
      specifications: [
        "Fingerprint scanners",
        "Facial recognition systems",
        "Multi-factor biometric verification",
        "Enterprise-grade security",
        "Integration with existing systems"
      ],
      benefits: [
        "Maximum security assurance",
        "Seamless user experience",
        "Advanced threat protection",
        "Federal compliance ready"
      ],
      icon: <Fingerprint className="w-8 h-8 text-cyan-400" />
    }
  ];

  const PackageCard = ({ pkg }: { pkg: any }) => (
    <Card className="bg-surface/80 backdrop-blur-md border border-cyan-500/30 cyber-glow h-full">
      <CardHeader>
        <div className="flex items-center justify-between mb-4">
          <div className={`w-20 h-20 bg-gradient-to-r ${pkg.color} rounded-xl flex items-center justify-center cyber-glow`}>
            {pkg.icon}
          </div>
        </div>
        <CardTitle className="text-2xl text-white geometric-text">{pkg.name}</CardTitle>
        <p className="text-gray-400 text-sm">{pkg.targetAudience}</p>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-white mb-3">Components Include:</h4>
          <ul className="space-y-2">
            {pkg.components.map((component: string, idx: number) => (
              <li key={idx} className="flex items-start text-sm text-gray-300">
                <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                {component}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex gap-2">
          <Button className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700">
            Contact for Details
          </Button>
          <Link href="/security-scanner">
            <Button variant="outline" size="sm" className="border-cyan-500 text-cyan-400 hover:bg-cyan-500/10">
              <Eye className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );

  const HSMCard = ({ hsm }: { hsm: any }) => (
    <Card className="bg-surface/80 backdrop-blur-md border border-orange-500/30 cyber-glow">
      <CardHeader>
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center">
            {hsm.icon}
          </div>
          <Badge variant="outline" className="text-white border-white/30">
            {hsm.package}
          </Badge>
        </div>
        <CardTitle className="text-xl text-white">{hsm.solution}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-semibold text-white mb-2">Specifications:</h4>
            <ul className="space-y-1">
              {hsm.specifications.map((spec: string, idx: number) => (
                <li key={idx} className="flex items-start text-sm text-gray-300">
                  <Target className="w-3 h-3 text-cyan-400 mr-2 flex-shrink-0 mt-1" />
                  {spec}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-2">Integration Benefits:</h4>
            <ul className="space-y-1">
              {hsm.benefits.map((benefit: string, idx: number) => (
                <li key={idx} className="flex items-start text-sm text-gray-300">
                  <CheckCircle className="w-3 h-3 text-green-400 mr-2 flex-shrink-0 mt-1" />
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const AuthCard = ({ auth }: { auth: any }) => (
    <Card className="bg-surface/80 backdrop-blur-md border border-purple-500/30 cyber-glow">
      <CardHeader>
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
            {auth.icon}
          </div>
          <Badge variant="outline" className="text-white border-white/30">
            {auth.package}
          </Badge>
        </div>
        <CardTitle className="text-xl text-white">{auth.solution}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-semibold text-white mb-2">Specifications:</h4>
            <ul className="space-y-1">
              {auth.specifications.map((spec: string, idx: number) => (
                <li key={idx} className="flex items-start text-sm text-gray-300">
                  <Target className="w-3 h-3 text-cyan-400 mr-2 flex-shrink-0 mt-1" />
                  {spec}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-2">Integration Benefits:</h4>
            <ul className="space-y-1">
              {auth.benefits.map((benefit: string, idx: number) => (
                <li key={idx} className="flex items-start text-sm text-gray-300">
                  <CheckCircle className="w-3 h-3 text-green-400 mr-2 flex-shrink-0 mt-1" />
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <MarketingLayout>
      <div className="ai-dashboard-bg min-h-screen">
        {/* Header */}
        <header className="bg-surface/90 backdrop-blur-md border-b border-surface-light p-6 cyber-glow">
          <div className="container mx-auto max-w-7xl">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center cyber-glow">
                <Bot className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-white flex items-center space-x-3">
                  <span>CyberSecure AI Product Specifications</span>
                  <Shield className="w-10 h-10 text-cyan-400" />
                </h1>
                <p className="text-xl text-gray-400">Sector-Specific Infrastructure Recommendations</p>
              </div>
            </div>
          </div>
        </header>

        <main className="p-6">
          <div className="container mx-auto max-w-7xl">
            <Tabs defaultValue="core-packages" className="space-y-8">
              <TabsList className="bg-surface border border-surface-light grid grid-cols-3 max-w-3xl mx-auto">
                <TabsTrigger value="core-packages" className="data-[state=active]:bg-cyan-600">
                  <Brain className="w-4 h-4 mr-2" />
                  Core Packages
                </TabsTrigger>
                <TabsTrigger value="hsm-integration" className="data-[state=active]:bg-orange-600">
                  <Lock className="w-4 h-4 mr-2" />
                  HSM Integration
                </TabsTrigger>
                <TabsTrigger value="authentication" className="data-[state=active]:bg-purple-600">
                  <Fingerprint className="w-4 h-4 mr-2" />
                  Authentication Hardware
                </TabsTrigger>
              </TabsList>

              {/* Core Product Offerings */}
              <TabsContent value="core-packages" className="space-y-8">
                <div className="text-center mb-12">
                  <h2 className="text-5xl font-bold text-white mb-4 geometric-text">Core Product Offerings by Package</h2>
                  <p className="text-xl text-gray-400 max-w-4xl mx-auto">
                    Comprehensive cybersecurity solutions tailored for different organizational sizes and compliance requirements.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {corePackages.map((pkg, index) => (
                    <PackageCard key={index} pkg={pkg} />
                  ))}
                </div>
              </TabsContent>

              {/* HSM Integration Specifications */}
              <TabsContent value="hsm-integration" className="space-y-8">
                <div className="text-center mb-12">
                  <h2 className="text-5xl font-bold text-white mb-4 geometric-text">Hardware Security Module (HSM) Integration</h2>
                  <p className="text-xl text-gray-400 max-w-4xl mx-auto">
                    Advanced cryptographic hardware solutions for enhanced security and compliance across all package levels.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {hsmSolutions.map((hsm, index) => (
                    <HSMCard key={index} hsm={hsm} />
                  ))}
                </div>
              </TabsContent>

              {/* Authentication Hardware */}
              <TabsContent value="authentication" className="space-y-8">
                <div className="text-center mb-12">
                  <h2 className="text-5xl font-bold text-white mb-4 geometric-text">Authentication Hardware Integration</h2>
                  <p className="text-xl text-gray-400 max-w-4xl mx-auto">
                    Multi-factor authentication solutions from hardware tokens to biometric systems for comprehensive identity management.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {authSolutions.map((auth, index) => (
                    <AuthCard key={index} auth={auth} />
                  ))}
                </div>
              </TabsContent>
            </Tabs>

            {/* Key Benefits Overview */}
            <section className="mt-20">
              <Card className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 border border-purple-500/30 cyber-glow">
                <CardContent className="p-12">
                  <h2 className="text-4xl font-bold text-white mb-8 text-center">Why Choose CyberSecure AI Specifications?</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-cyan-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                        <Shield className="w-8 h-8 text-cyan-400" />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">FIPS Compliance</h3>
                      <p className="text-gray-400">FIPS 140-2/140-3 validated hardware security modules</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-green-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                        <Flag className="w-8 h-8 text-green-400" />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">Federal Ready</h3>
                      <p className="text-gray-400">FedRAMP, FISMA, and DCMA compliance frameworks</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-orange-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                        <Fingerprint className="w-8 h-8 text-orange-400" />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">Biometric Security</h3>
                      <p className="text-gray-400">Advanced biometric authentication and access control</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-purple-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                        <Network className="w-8 h-8 text-purple-400" />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">Scalable Infrastructure</h3>
                      <p className="text-gray-400">From small institutions to enterprise-wide deployments</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Call to Action */}
            <section className="mt-16 text-center">
              <Card className="bg-gradient-to-r from-cyan-900/50 to-blue-900/50 border border-cyan-500/30 cyber-glow">
                <CardContent className="p-12">
                  <h2 className="text-4xl font-bold text-white mb-6">Ready to Implement CyberSecure AI?</h2>
                  <p className="text-lg text-gray-400 mb-8 max-w-3xl mx-auto">
                    Contact our technical specialists to discuss your specific requirements and get detailed specifications 
                    for your sector-specific cybersecurity infrastructure needs.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button size="lg" className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 px-8 py-4">
                      Contact Technical Team
                    </Button>
                    <Link href="/security-scanner">
                      <Button size="lg" variant="outline" className="border-cyan-500 text-cyan-400 hover:bg-cyan-500/10 px-8 py-4">
                        Free Security Assessment
                      </Button>
                    </Link>
                  </div>
                  <p className="text-sm text-gray-400 mt-6">
                    All specifications include comprehensive implementation support and sector-specific customization
                  </p>
                </CardContent>
              </Card>
            </section>
          </div>
        </main>
      </div>
    </MarketingLayout>
  );
}