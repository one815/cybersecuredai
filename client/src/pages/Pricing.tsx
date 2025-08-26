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
  Wifi
} from "lucide-react";
import { Link } from "wouter";
import { MarketingLayout } from "@/components/MarketingLayout";
// Solution images
import zeroTrustImg from "@assets/generated_images/Zero_Trust_Architecture_8c331bd5.png";
import cloudSecurityImg from "@assets/generated_images/Cloud_Security_Analytics_Platform_0c84c42d.png";
import federalSolutionsImg from "@assets/generated_images/Federal_AI_Implementation_778c3628.png";
import higherEdImg from "@assets/generated_images/Campus_AI_Implementation_Course_a7477413.png";

export default function Pricing() {
  // Cloud Security Packages
  const cloudSecurityPackages = [
    {
      name: "Cyber-Cloud Essential",
      tier: "Essential",
      targetAudience: "Small K-12 schools, small municipal offices",
      category: "cloud_security",
      icon: <Shield className="w-12 h-12 text-blue-400" />,
      color: "from-blue-400 to-blue-600",
      components: [
        "CyberSecure AI Core Platform (limited users)",
        "Basic automated incident response",
        "Standard threat detection",
        "Essential compliance automation",
        "Cloud security monitoring"
      ],
      features: [
        "AI-powered threat detection",
        "Automated incident response",
        "FERPA/CIPA compliance",
        "24/7 monitoring",
        "Basic user management"
      ]
    },
    {
      name: "Cyber-Cloud Advanced",
      tier: "Advanced", 
      targetAudience: "Mid-sized school districts, colleges, city governments",
      category: "cloud_security",
      icon: <Brain className="w-12 h-12 text-purple-400" />,
      color: "from-purple-400 to-purple-600",
      components: [
        "CyberSecure AI Core Platform",
        "Advanced automated incident response",
        "AI-powered threat detection",
        "Predictive risk analysis",
        "Comprehensive compliance automation",
        "24/7 cloud security monitoring"
      ],
      features: [
        "Machine learning threat detection",
        "Predictive risk analysis",
        "Advanced incident response",
        "Multi-framework compliance",
        "Enhanced monitoring dashboard"
      ]
    },
    {
      name: "Cyber-Cloud Enterprise",
      tier: "Enterprise",
      targetAudience: "Large universities, state education departments, federal agencies",
      category: "cloud_security",
      icon: <Network className="w-12 h-12 text-cyan-400" />,
      color: "from-cyan-400 to-cyan-600",
      components: [
        "CyberSecure AI Core Platform (unlimited users)",
        "Enterprise automated incident response",
        "Advanced threat detection with ML",
        "Custom predictive risk models",
        "Comprehensive compliance frameworks",
        "24/7 premium monitoring",
        "Custom integration framework"
      ],
      features: [
        "Unlimited user access",
        "Custom ML models",
        "Enterprise integrations",
        "Premium support",
        "Advanced analytics"
      ]
    }
  ];

  // K-12 Pilot Programs
  const k12PilotPrograms = [
    {
      name: "K-12 Pilot Small",
      tier: "Small",
      targetAudience: "Small K-12 schools looking to evaluate AI-powered security",
      category: "k12_pilot",
      maxUsers: "15 admin users",
      maxEndpoints: "300 endpoints",
      coverage: "Up to 5,000 sq ft",
      icon: <Home className="w-12 h-12 text-green-400" />,
      color: "from-green-400 to-green-600",
      components: [
        "CyberSecure AI Core Platform (15 admin users)",
        "Basic threat detection for up to 300 endpoints",
        "CIPA-compliant web filtering",
        "FERPA compliance framework",
        "Student data protection",
        "Secure network cabinet with basic hardware",
        "3-month implementation and support"
      ]
    },
    {
      name: "K-12 Pilot Medium",
      tier: "Medium",
      targetAudience: "Medium K-12 schools looking to evaluate AI-powered security",
      category: "k12_pilot",
      maxUsers: "25 admin users",
      maxEndpoints: "500 endpoints",
      coverage: "5,000-15,000 sq ft",
      icon: <Building className="w-12 h-12 text-blue-400" />,
      color: "from-blue-400 to-blue-600",
      components: [
        "CyberSecure AI Core Platform (25 admin users)",
        "Basic threat detection for up to 500 endpoints",
        "CIPA-compliant web filtering",
        "FERPA compliance framework",
        "Student data protection",
        "Secure network cabinet with basic hardware",
        "3-month implementation and support"
      ]
    },
    {
      name: "K-12 Pilot Large",
      tier: "Large",
      targetAudience: "Large K-12 schools looking to evaluate AI-powered security",
      category: "k12_pilot",
      maxUsers: "40 admin users",
      maxEndpoints: "800 endpoints",
      coverage: "15,000-30,000 sq ft",
      icon: <GraduationCap className="w-12 h-12 text-purple-400" />,
      color: "from-purple-400 to-purple-600",
      components: [
        "CyberSecure AI Core Platform (40 admin users)",
        "Basic threat detection for up to 800 endpoints",
        "CIPA-compliant web filtering",
        "FERPA compliance framework",
        "Student data protection",
        "Multiple secure network cabinets with basic hardware",
        "3-month implementation and support"
      ]
    }
  ];

  // Higher Education Pilot Programs
  const higherEdPilotPrograms = [
    {
      name: "Higher Education Pilot Small",
      tier: "Small",
      targetAudience: "Small college/university departments with research data",
      category: "higher_ed_pilot",
      maxUsers: "30 users",
      coverage: "Up to 8,000 sq ft",
      icon: <FileText className="w-12 h-12 text-orange-400" />,
      color: "from-orange-400 to-orange-600",
      components: [
        "CyberSecure AI Core Platform (30 users)",
        "Research network security",
        "Advanced threat detection",
        "Research data protection",
        "Department-level access control",
        "1 secure network cabinet with monitoring",
        "4-month implementation and support"
      ]
    },
    {
      name: "Higher Education Pilot Medium",
      tier: "Medium",
      targetAudience: "Medium college/university departments with research data",
      category: "higher_ed_pilot",
      maxUsers: "50 users",
      coverage: "8,000-20,000 sq ft",
      icon: <Database className="w-12 h-12 text-teal-400" />,
      color: "from-teal-400 to-teal-600",
      components: [
        "CyberSecure AI Core Platform (50 users)",
        "Research network security",
        "Advanced threat detection",
        "Research data protection",
        "Department-level access control",
        "2 secure network cabinets with monitoring",
        "4-month implementation and support"
      ]
    },
    {
      name: "Higher Education Pilot Large",
      tier: "Large",
      targetAudience: "Large college/university departments with research data",
      category: "higher_ed_pilot",
      maxUsers: "80 users",
      coverage: "20,000-40,000 sq ft",
      icon: <Award className="w-12 h-12 text-indigo-400" />,
      color: "from-indigo-400 to-indigo-600",
      components: [
        "CyberSecure AI Core Platform (80 users)",
        "Research network security",
        "Advanced threat detection",
        "Research data protection",
        "Department-level access control",
        "3 secure network cabinets with monitoring",
        "4-month implementation and support"
      ]
    }
  ];

  // Hardware Security Packages
  const hardwareSecurityPackages = [
    {
      name: "Hardware Essential",
      tier: "Essential",
      targetAudience: "Small educational institutions, small government offices",
      category: "hardware",
      icon: <Server className="w-12 h-12 text-gray-400" />,
      color: "from-gray-400 to-gray-600",
      components: [
        "Cat6A Structured Cabling System",
        "Basic Network Cabinet with Lock",
        "Patch Panels and Cable Management",
        "Entry-level Access Control Infrastructure"
      ]
    },
    {
      name: "Hardware Advanced",
      tier: "Advanced",
      targetAudience: "Mid-sized institutions, city government facilities",
      category: "hardware",
      icon: <Lock className="w-12 h-12 text-yellow-400" />,
      color: "from-yellow-400 to-yellow-600",
      components: [
        "Cat6A Shielded Cabling System",
        "Fiber Optic Backbone",
        "Advanced Network Cabinets with Electronic Locks",
        "Security Camera Infrastructure",
        "Intermediate Access Control System",
        "Environmental Monitoring for Server Rooms"
      ]
    },
    {
      name: "Hardware Enterprise",
      tier: "Enterprise",
      targetAudience: "Large campuses, government complexes",
      category: "hardware",
      icon: <Fingerprint className="w-12 h-12 text-red-400" />,
      color: "from-red-400 to-red-600",
      components: [
        "Campus-wide Cat6A Shielded Cabling System",
        "Redundant Fiber Optic Backbone",
        "High-Security Network Cabinets with Biometric Access",
        "Comprehensive Security Camera Infrastructure",
        "Advanced Access Control System",
        "Complete Environmental Monitoring Solution",
        "Tamper-Evident Cabling Solutions",
        "Network Segmentation Infrastructure"
      ]
    }
  ];

  const PackageCard = ({ pkg, category }: { pkg: any, category: string }) => (
    <Card className={`bg-surface/80 backdrop-blur-md border border-${category === 'cloud_security' ? 'cyan' : category === 'k12_pilot' ? 'green' : category === 'higher_ed_pilot' ? 'orange' : 'gray'}-500/30 cyber-glow h-full`}>
      <CardHeader>
        <div className="flex items-center justify-between mb-4">
          <div className={`w-20 h-20 bg-gradient-to-r ${pkg.color} rounded-xl flex items-center justify-center cyber-glow`}>
            {pkg.icon}
          </div>
          <Badge variant="outline" className="text-white border-white/30">
            {pkg.tier}
          </Badge>
        </div>
        <CardTitle className="text-2xl text-white geometric-text">{pkg.name}</CardTitle>
        <div className="space-y-2">
          <p className="text-gray-400 text-sm">{pkg.targetAudience}</p>
        </div>
      </CardHeader>
      <CardContent>
        {pkg.maxUsers && (
          <div className="mb-4 p-3 bg-background/50 rounded-lg">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex items-center text-gray-300">
                <Users className="w-4 h-4 mr-2" />
                {pkg.maxUsers}
              </div>
              {pkg.maxEndpoints && (
                <div className="flex items-center text-gray-300">
                  <Cpu className="w-4 h-4 mr-2" />
                  {pkg.maxEndpoints}
                </div>
              )}
              {pkg.coverage && (
                <div className="flex items-center text-gray-300 col-span-2">
                  <Building className="w-4 h-4 mr-2" />
                  {pkg.coverage}
                </div>
              )}
            </div>
          </div>
        )}
        
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

        {pkg.features && (
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-white mb-3">Key Features:</h4>
            <ul className="space-y-1">
              {pkg.features.map((feature: string, idx: number) => (
                <li key={idx} className="flex items-center text-sm text-gray-400">
                  <Target className="w-3 h-3 text-cyan-400 mr-2 flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex gap-2">
          <Link href="/pricing" className="flex-1">
            <Button className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700">
              Get Quote
            </Button>
          </Link>
          <Link href="/security-scanner">
            <Button variant="outline" size="sm" className="border-cyan-500 text-cyan-400 hover:bg-cyan-500/10">
              <Eye className="w-4 h-4" />
            </Button>
          </Link>
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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center cyber-glow">
                  <Bot className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-white flex items-center space-x-3">
                    <span>CyberSecure AI Solutions</span>
                    <Shield className="w-10 h-10 text-cyan-400" />
                  </h1>
                  <p className="text-xl text-gray-400">Comprehensive cybersecurity packages for education and government sectors</p>
                </div>
              </div>
              
              {/* Solution Overview Images */}
              <div className="grid grid-cols-2 gap-4">
                <div className="relative group">
                  <img src={zeroTrustImg} alt="Zero Trust Architecture" className="rounded-lg shadow-lg w-full h-20 object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="absolute bottom-2 left-2 text-white text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                    Zero Trust Security
                  </div>
                </div>
                <div className="relative group">
                  <img src={cloudSecurityImg} alt="Cloud Security Analytics" className="rounded-lg shadow-lg w-full h-20 object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="absolute bottom-2 left-2 text-white text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                    Cloud Security
                  </div>
                </div>
                <div className="relative group">
                  <img src={federalSolutionsImg} alt="Federal AI Implementation" className="rounded-lg shadow-lg w-full h-20 object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="absolute bottom-2 left-2 text-white text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                    Federal Solutions
                  </div>
                </div>
                <div className="relative group">
                  <img src={higherEdImg} alt="Higher Education Security" className="rounded-lg shadow-lg w-full h-20 object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="absolute bottom-2 left-2 text-white text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                    Higher Education
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="p-6">
          <div className="container mx-auto max-w-7xl">
            <Tabs defaultValue="cloud-security" className="space-y-8">
              <TabsList className="bg-surface border border-surface-light grid grid-cols-4 max-w-4xl mx-auto">
                <TabsTrigger value="cloud-security" className="data-[state=active]:bg-cyan-600">
                  <Brain className="w-4 h-4 mr-2" />
                  Cloud Security
                </TabsTrigger>
                <TabsTrigger value="k12-pilot" className="data-[state=active]:bg-green-600">
                  <GraduationCap className="w-4 h-4 mr-2" />
                  K-12 Pilot
                </TabsTrigger>
                <TabsTrigger value="higher-ed-pilot" className="data-[state=active]:bg-orange-600">
                  <Award className="w-4 h-4 mr-2" />
                  Higher Ed Pilot
                </TabsTrigger>
                <TabsTrigger value="hardware" className="data-[state=active]:bg-gray-600">
                  <Server className="w-4 h-4 mr-2" />
                  Hardware Security
                </TabsTrigger>
              </TabsList>

              {/* Cloud Security Packages */}
              <TabsContent value="cloud-security" className="space-y-8">
                <div className="text-center mb-12">
                  <h2 className="text-5xl font-bold text-white mb-4 geometric-text">Cloud Security Packages</h2>
                  <p className="text-xl text-gray-400 max-w-4xl mx-auto">
                    Comprehensive AI-powered cybersecurity solutions with cloud-based threat detection, 
                    automated incident response, and compliance management tailored for educational institutions and government agencies.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {cloudSecurityPackages.map((pkg, index) => (
                    <PackageCard key={index} pkg={pkg} category="cloud_security" />
                  ))}
                </div>
              </TabsContent>

              {/* K-12 Pilot Programs */}
              <TabsContent value="k12-pilot" className="space-y-8">
                <div className="text-center mb-12">
                  <h2 className="text-5xl font-bold text-white mb-4 geometric-text">K-12 Pilot Programs</h2>
                  <p className="text-xl text-gray-400 max-w-4xl mx-auto">
                    Specialized cybersecurity solutions for K-12 schools with CIPA-compliant web filtering, 
                    FERPA compliance frameworks, and student data protection. Includes 3-month implementation and support.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {k12PilotPrograms.map((pkg, index) => (
                    <PackageCard key={index} pkg={pkg} category="k12_pilot" />
                  ))}
                </div>
              </TabsContent>

              {/* Higher Education Pilot Programs */}
              <TabsContent value="higher-ed-pilot" className="space-y-8">
                <div className="text-center mb-12">
                  <h2 className="text-5xl font-bold text-white mb-4 geometric-text">Higher Education Pilot Programs</h2>
                  <p className="text-xl text-gray-400 max-w-4xl mx-auto">
                    Advanced cybersecurity solutions for colleges and universities with research network security, 
                    advanced threat detection, and research data protection. Includes 4-month implementation and support.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {higherEdPilotPrograms.map((pkg, index) => (
                    <PackageCard key={index} pkg={pkg} category="higher_ed_pilot" />
                  ))}
                </div>
              </TabsContent>

              {/* Hardware Security Packages */}
              <TabsContent value="hardware" className="space-y-8">
                <div className="text-center mb-12">
                  <h2 className="text-5xl font-bold text-white mb-4 geometric-text">Hardware Security Packages</h2>
                  <p className="text-xl text-gray-400 max-w-4xl mx-auto">
                    Physical infrastructure security solutions including structured cabling, network cabinets, 
                    access control systems, and comprehensive environmental monitoring for maximum security.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {hardwareSecurityPackages.map((pkg, index) => (
                    <PackageCard key={index} pkg={pkg} category="hardware" />
                  ))}
                </div>
              </TabsContent>
            </Tabs>

            {/* Comprehensive Features Overview */}
            <section className="mt-20">
              <Card className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 border border-purple-500/30 cyber-glow">
                <CardContent className="p-12">
                  <h2 className="text-4xl font-bold text-white mb-8 text-center">Why Choose CyberSecure AI?</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-cyan-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                        <Brain className="w-8 h-8 text-cyan-400" />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">AI-Powered Detection</h3>
                      <p className="text-gray-400">Advanced machine learning algorithms for 98% threat detection accuracy</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-green-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                        <Shield className="w-8 h-8 text-green-400" />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">Compliance Ready</h3>
                      <p className="text-gray-400">FERPA, CIPA, FISMA, and FedRAMP compliance frameworks included</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-orange-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                        <Zap className="w-8 h-8 text-orange-400" />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">Real-Time Response</h3>
                      <p className="text-gray-400">Automated incident response with 60-second threat neutralization</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Call to Action */}
            <section className="mt-16 text-center">
              <Card className="bg-gradient-to-r from-cyan-900/50 to-blue-900/50 border border-cyan-500/30 cyber-glow">
                <CardContent className="p-12">
                  <h2 className="text-4xl font-bold text-white mb-6">Ready to Secure Your Organization?</h2>
                  <p className="text-lg text-gray-400 mb-8 max-w-3xl mx-auto">
                    Contact our cybersecurity experts to discuss your specific requirements and find the perfect security solution for your organization.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button size="lg" className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 px-8 py-4">
                      Get Custom Quote
                    </Button>
                    <Link href="/security-scanner">
                      <Button size="lg" variant="outline" className="border-cyan-500 text-cyan-400 hover:bg-cyan-500/10 px-8 py-4">
                        Free Security Assessment
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </section>
          </div>
        </main>
      </div>
    </MarketingLayout>
  );
}