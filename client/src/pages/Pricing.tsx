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
  Smartphone,
  Crown,
  Cloud,
  Monitor,
  Wrench,
  Search,
  Settings,
  ClipboardCheck
} from "lucide-react";
import { Link } from "wouter";
import { MarketingLayout } from "@/components/MarketingLayout";

export default function Pricing() {
  // 1. Cyber Cloud Packages
  const cyberCloudPackages = [
    {
      name: "Cyber-Cloud Essential",
      icon: <Cloud className="w-12 h-12 text-blue-400" />,
      color: "from-blue-400 to-blue-600",
      features: [
        "CyberSecure AI Core Platform (limited users)",
        "Thales Luna Network HSM entry model",
        "Basic automated incident response with predefined playbooks",
        "Standard threat detection with signature-based analysis",
        "Essential compliance automation for FERPA/CIPA",
        "Cloud security monitoring with basic alerting",
        "YubiKey integration (10-pack)",
        "Integration with Microsoft 365/Google Workspace"
      ]
    },
    {
      name: "Cyber-Cloud Advanced",
      icon: <Brain className="w-12 h-12 text-purple-400" />,
      color: "from-purple-400 to-purple-600",
      features: [
        "CyberSecure AI Core Platform (expanded licenses)",
        "Thales Luna Network HSM 7 Series",
        "Advanced automated incident response with custom playbooks",
        "AI-powered threat detection with behavioral analysis",
        "Predictive risk analysis engine",
        "Comprehensive compliance automation",
        "24/7 cloud security monitoring",
        "SAML/OAUTH federated identity management"
      ]
    },
    {
      name: "Cyber-Cloud Enterprise",
      icon: <Network className="w-12 h-12 text-cyan-400" />,
      color: "from-cyan-400 to-cyan-600",
      features: [
        "CyberSecure AI Core Platform (unlimited users)",
        "Thales Luna Network HSM 7+ Series (clustered configuration)",
        "Enterprise automated incident response with SOAR capabilities",
        "Advanced threat detection with ML/behavioral analytics",
        "Custom predictive risk models",
        "Comprehensive compliance frameworks",
        "24/7 premium monitoring with dedicated SOC analysts",
        "Custom integration framework for third-party systems",
        "Full integration with SIS/LMS/ERP systems"
      ]
    }
  ];

  // 2. CyberSecure AI-EDU Pilot Programs
  const eduPilotPrograms = [
    {
      name: "K-12 Pilot Small",
      coverage: "Up to 5,000 sq ft coverage",
      icon: <GraduationCap className="w-12 h-12 text-green-400" />,
      color: "from-green-400 to-green-600",
      features: [
        "CyberSecure AI Core Platform (15 admin users)",
        "Basic threat detection for up to 300 endpoints",
        "CIPA-compliant web filtering and FERPA compliance framework",
        "Student data protection",
        "Secure network cabinet with basic hardware",
        "3-month implementation and support"
      ]
    },
    {
      name: "Higher Education Pilot",
      coverage: "Coverage from 8,000 to 40,000 sq ft (based on package)",
      icon: <Award className="w-12 h-12 text-orange-400" />,
      color: "from-orange-400 to-orange-600",
      features: [
        "CyberSecure AI Core Platform (30-80 users, depending on size)",
        "Research network security and data protection",
        "Advanced threat detection",
        "Department-level access control",
        "Secure network cabinets with monitoring",
        "4-month implementation and support"
      ]
    }
  ];

  // 3. Standalone HSM Solutions
  const hsmSolutions = [
    {
      name: "Basic HSM Implementation",
      icon: <Key className="w-10 h-10 text-blue-400" />,
      features: [
        "Thales Luna Network HSM entry model",
        "Basic encryption key management",
        "YubiKey 5 Series deployment (15 keys)",
        "Essential compliance configurations"
      ]
    },
    {
      name: "Advanced HSM Implementation",
      icon: <Server className="w-10 h-10 text-purple-400" />,
      features: [
        "Thales Luna Network HSM 7 Series",
        "Entrust nShield HSM Solo (backup)",
        "Advanced encryption key lifecycle management",
        "YubiKey deployment (30 keys)",
        "Tamper-evident equipment seals"
      ]
    },
    {
      name: "Enterprise HSM Implementation",
      icon: <Lock className="w-10 h-10 text-cyan-400" />,
      features: [
        "Thales Luna Network HSM 7+ Series (clustered)",
        "Entrust nShield Connect HSM (redundant configuration)",
        "FIPS 140-2 Level 3 compliant key storage",
        "Hardware-based certificate authority",
        "YubiKey deployment (enterprise pack)"
      ]
    }
  ];

  // 4. Cloud Integrated with HSM
  const cloudHsmPackages = [
    {
      name: "CyberSecure Essential",
      icon: <Shield className="w-12 h-12 text-blue-400" />,
      color: "from-blue-400 to-blue-600",
      features: [
        "CyberSecure AI Core Platform",
        "Thales Luna Network HSM (basic model)",
        "Automated Incident Response (basic playbooks)",
        "Threat Detection System",
        "Compliance Automation",
        "Sophos Intercept X endpoint protection",
        "Integration with SIS/Google Workspace",
        "FERPA/CIPA compliance templates"
      ]
    },
    {
      name: "CyberSecure Advanced",
      icon: <Brain className="w-12 h-12 text-purple-400" />,
      color: "from-purple-400 to-purple-600",
      features: [
        "CyberSecure AI Core Platform",
        "Thales Luna Network HSM 7 Series",
        "Advanced Automated Incident Response",
        "Threat Detection with AI Analysis",
        "Predictive Risk Analysis",
        "Comprehensive Compliance Automation",
        "24/7 Monitoring and Vulnerability Management",
        "CrowdStrike Falcon endpoint protection",
        "Splunk SIEM integration",
        "Okta identity management integration"
      ]
    },
    {
      name: "CyberSecure Enterprise",
      icon: <Crown className="w-12 h-12 text-gold-400" />,
      color: "from-yellow-400 to-orange-600",
      features: [
        "CyberSecure AI Core Platform (unlimited users)",
        "Thales Luna Network HSM 7+ Series (clustered)",
        "Entrust nShield Connect HSM (backup)",
        "Enterprise Automated Incident Response",
        "Advanced Threat Detection with ML",
        "Predictive Risk Analysis with customized models",
        "Comprehensive Compliance Automation",
        "24/7 Monitoring",
        "Privileged Access Management (CyberArk)",
        "Microsoft Defender for Cloud integration",
        "Elastic Stack SIEM implementation",
        "Advanced EDR with SentinelOne"
      ]
    }
  ];

  // 5. IT Support & Managed Services
  const itSupportServices = [
    {
      name: "Basic IT Support",
      icon: <Monitor className="w-10 h-10 text-green-400" />,
      features: [
        "System Administration for 25+ users",
        "Workstation management (Windows 11 Pro)",
        "Basic performance monitoring",
        "OS patch management",
        "Standard help desk support (business hours)",
        "Monthly security reviews"
      ]
    },
    {
      name: "Advanced IT Support",
      icon: <Settings className="w-10 h-10 text-blue-400" />,
      features: [
        "System Administration for 100+ users",
        "Comprehensive workstation management",
        "Advanced performance monitoring",
        "OS and application patch management",
        "Active Directory and Exchange maintenance",
        "License and asset management",
        "Enhanced help desk support (extended hours)",
        "Dedicated technical account manager"
      ]
    },
    {
      name: "Premium IT Support",
      icon: <Crown className="w-10 h-10 text-purple-400" />,
      features: [
        "System Administration for enterprise environments",
        "Complete workstation and server management",
        "Comprehensive performance monitoring and optimization",
        "Advanced OS and application management",
        "Complete Active Directory and Exchange administration",
        "Strategic license and asset management",
        "24/7 premium help desk support",
        "On-site technical support",
        "Weekly security reviews",
        "Strategic IT planning"
      ]
    }
  ];

  // 6. Security Add-on Services
  const securityAddons = [
    {
      name: "Secure Server Room Kit",
      icon: <Server className="w-10 h-10 text-red-400" />,
      features: [
        "APC NetShelter SX server racks with electronic locks",
        "Biometric access control system",
        "Environmental monitoring system",
        "Fire suppression system",
        "Redundant power systems with UPS",
        "Security cameras with motion detection"
      ]
    },
    {
      name: "Multi-Factor Authentication Hardware",
      icon: <Fingerprint className="w-10 h-10 text-blue-400" />,
      features: [
        "YubiKey 5 Series devices (bulk deployment)",
        "RSA SecurID hardware tokens",
        "Suprema biometric readers",
        "Authentication server appliance",
        "Hardware-based certificate authority"
      ]
    },
    {
      name: "Network Segmentation Bundle",
      icon: <Network className="w-10 h-10 text-green-400" />,
      features: [
        "Cisco Catalyst switches with VLAN capabilities",
        "Palo Alto Networks PA-220 firewall for micro-segmentation",
        "Network Access Control appliance",
        "Specialized cabling for segmented networks",
        "Network traffic analyzers"
      ]
    },
    {
      name: "Disaster Recovery Infrastructure",
      icon: <Database className="w-10 h-10 text-orange-400" />,
      features: [
        "Redundant storage systems (Dell EMC)",
        "Off-site backup appliances (Rubrik/Cohesity)",
        "Backup power generators",
        "Redundant internet connections",
        "Hardware-based replication devices",
        "Automated recovery testing systems"
      ]
    },
    {
      name: "Advanced Threat Intelligence Services",
      icon: <Eye className="w-10 h-10 text-purple-400" />,
      features: [
        "Education-specific threat feeds",
        "Government sector threat intelligence",
        "Sector-specific IOC database",
        "MITRE ATT&CK framework mapping"
      ]
    }
  ];

  // 7. Professional Services
  const professionalServices = [
    {
      category: "Assessment and Planning",
      icon: <Search className="w-8 h-8 text-cyan-400" />,
      services: [
        "Security Assessment",
        "IT Infrastructure Assessment",
        "Compliance Readiness Assessment",
        "Risk Assessment",
        "Strategic Planning"
      ]
    },
    {
      category: "Implementation Services",
      icon: <Wrench className="w-8 h-8 text-green-400" />,
      services: [
        "Hardware Installation and Configuration",
        "Software Deployment",
        "System Integration",
        "Network Configuration",
        "Migration Services"
      ]
    },
    {
      category: "Ongoing Services",
      icon: <ClipboardCheck className="w-8 h-8 text-orange-400" />,
      services: [
        "Security Training",
        "Regular Security Reviews",
        "Incident Response Support",
        "Custom Security Policies",
        "Compliance Monitoring",
        "Executive Reporting"
      ]
    }
  ];

  const PackageCard = ({ pkg, showPricing = true }: { pkg: any, showPricing?: boolean }) => (
    <Card className="bg-surface/80 backdrop-blur-md border border-cyan-500/30 cyber-glow h-full">
      <CardHeader>
        <div className="flex items-center justify-between mb-4">
          <div className={`w-20 h-20 bg-gradient-to-r ${pkg.color || 'from-gray-400 to-gray-600'} rounded-xl flex items-center justify-center cyber-glow`}>
            {pkg.icon}
          </div>
        </div>
        <CardTitle className="text-2xl text-white geometric-text">{pkg.name}</CardTitle>
        {pkg.coverage && (
          <p className="text-gray-400 text-sm">{pkg.coverage}</p>
        )}
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-white mb-3">Features Include:</h4>
          <ul className="space-y-2">
            {pkg.features.map((feature: string, idx: number) => (
              <li key={idx} className="flex items-start text-sm text-gray-300">
                <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
        <Button className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700">
          Get Quote
        </Button>
      </CardContent>
    </Card>
  );

  const ServiceCard = ({ service }: { service: any }) => (
    <Card className="bg-surface/80 backdrop-blur-md border border-purple-500/30 cyber-glow">
      <CardHeader>
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
            {service.icon}
          </div>
        </div>
        <CardTitle className="text-xl text-white">{service.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {service.features.map((feature: string, idx: number) => (
            <li key={idx} className="flex items-start text-sm text-gray-300">
              <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
              {feature}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );

  const HSMCard = ({ hsm }: { hsm: any }) => (
    <Card className="bg-surface/80 backdrop-blur-md border border-orange-500/30 cyber-glow">
      <CardHeader>
        <div className="w-16 h-16 bg-orange-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
          {hsm.icon}
        </div>
        <CardTitle className="text-xl text-white text-center">{hsm.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {hsm.features.map((feature: string, idx: number) => (
            <li key={idx} className="flex items-start text-sm text-gray-300">
              <Target className="w-3 h-3 text-cyan-400 mr-2 flex-shrink-0 mt-1" />
              {feature}
            </li>
          ))}
        </ul>
        <Button className="w-full mt-4 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700">
          Contact for Details
        </Button>
      </CardContent>
    </Card>
  );

  const ProfessionalServiceCard = ({ service }: { service: any }) => (
    <Card className="bg-surface/80 backdrop-blur-md border border-green-500/30 cyber-glow">
      <CardHeader>
        <div className="w-16 h-16 bg-green-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
          {service.icon}
        </div>
        <CardTitle className="text-xl text-white text-center">{service.category}</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {service.services.map((item: string, idx: number) => (
            <li key={idx} className="flex items-start text-sm text-gray-300">
              <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
              {item}
            </li>
          ))}
        </ul>
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
                  <span>CyberSecure AI Solutions & Pricing</span>
                  <Shield className="w-10 h-10 text-cyan-400" />
                </h1>
                <p className="text-xl text-gray-400">Comprehensive cybersecurity packages organized by category</p>
              </div>
            </div>
          </div>
        </header>

        <main className="p-6">
          <div className="container mx-auto max-w-7xl">
            <Tabs defaultValue="cyber-cloud" className="space-y-8">
              <TabsList className="bg-surface border border-surface-light grid grid-cols-7 max-w-7xl mx-auto text-xs">
                <TabsTrigger value="cyber-cloud" className="data-[state=active]:bg-blue-600">
                  <Cloud className="w-4 h-4 mr-1" />
                  Cyber Cloud
                </TabsTrigger>
                <TabsTrigger value="edu-pilot" className="data-[state=active]:bg-green-600">
                  <GraduationCap className="w-4 h-4 mr-1" />
                  EDU Pilot
                </TabsTrigger>
                <TabsTrigger value="hsm-standalone" className="data-[state=active]:bg-orange-600">
                  <Key className="w-4 h-4 mr-1" />
                  HSM Solutions
                </TabsTrigger>
                <TabsTrigger value="cloud-hsm" className="data-[state=active]:bg-purple-600">
                  <Network className="w-4 h-4 mr-1" />
                  Cloud + HSM
                </TabsTrigger>
                <TabsTrigger value="it-support" className="data-[state=active]:bg-cyan-600">
                  <Monitor className="w-4 h-4 mr-1" />
                  IT Support
                </TabsTrigger>
                <TabsTrigger value="security-addons" className="data-[state=active]:bg-red-600">
                  <Lock className="w-4 h-4 mr-1" />
                  Security Add-ons
                </TabsTrigger>
                <TabsTrigger value="professional" className="data-[state=active]:bg-gray-600">
                  <Wrench className="w-4 h-4 mr-1" />
                  Professional Services
                </TabsTrigger>
              </TabsList>

              {/* Cyber Cloud Packages */}
              <TabsContent value="cyber-cloud" className="space-y-8">
                <div className="text-center mb-12">
                  <h2 className="text-5xl font-bold text-white mb-4 geometric-text">Cyber Cloud Packages</h2>
                  <p className="text-xl text-gray-400 max-w-4xl mx-auto">
                    Cloud-based cybersecurity solutions with integrated HSM protection and comprehensive threat detection.
                  </p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {cyberCloudPackages.map((pkg, index) => (
                    <PackageCard key={index} pkg={pkg} />
                  ))}
                </div>
              </TabsContent>

              {/* EDU Pilot Programs */}
              <TabsContent value="edu-pilot" className="space-y-8">
                <div className="text-center mb-12">
                  <h2 className="text-5xl font-bold text-white mb-4 geometric-text">CyberSecure AI-EDU Pilot Programs</h2>
                  <p className="text-xl text-gray-400 max-w-4xl mx-auto">
                    Educational sector-specific pilot programs with FERPA/CIPA compliance and student data protection.
                  </p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {eduPilotPrograms.map((pkg, index) => (
                    <PackageCard key={index} pkg={pkg} />
                  ))}
                </div>
              </TabsContent>

              {/* Standalone HSM Solutions */}
              <TabsContent value="hsm-standalone" className="space-y-8">
                <div className="text-center mb-12">
                  <h2 className="text-5xl font-bold text-white mb-4 geometric-text">Standalone HSM Solutions</h2>
                  <p className="text-xl text-gray-400 max-w-4xl mx-auto">
                    Hardware Security Module implementations for encryption key management and cryptographic operations.
                  </p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {hsmSolutions.map((hsm, index) => (
                    <HSMCard key={index} hsm={hsm} />
                  ))}
                </div>
              </TabsContent>

              {/* Cloud Integrated with HSM */}
              <TabsContent value="cloud-hsm" className="space-y-8">
                <div className="text-center mb-12">
                  <h2 className="text-5xl font-bold text-white mb-4 geometric-text">Cloud Integrated with HSM</h2>
                  <p className="text-xl text-gray-400 max-w-4xl mx-auto">
                    Complete cybersecurity platforms combining cloud solutions with hardware security modules.
                  </p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {cloudHsmPackages.map((pkg, index) => (
                    <PackageCard key={index} pkg={pkg} />
                  ))}
                </div>
              </TabsContent>

              {/* IT Support & Managed Services */}
              <TabsContent value="it-support" className="space-y-8">
                <div className="text-center mb-12">
                  <h2 className="text-5xl font-bold text-white mb-4 geometric-text">IT Support & Managed Services</h2>
                  <p className="text-xl text-gray-400 max-w-4xl mx-auto">
                    Comprehensive IT support services from basic administration to enterprise-level management.
                  </p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {itSupportServices.map((service, index) => (
                    <ServiceCard key={index} service={service} />
                  ))}
                </div>
              </TabsContent>

              {/* Security Add-on Services */}
              <TabsContent value="security-addons" className="space-y-8">
                <div className="text-center mb-12">
                  <h2 className="text-5xl font-bold text-white mb-4 geometric-text">Security Add-on Services</h2>
                  <p className="text-xl text-gray-400 max-w-4xl mx-auto">
                    Specialized security enhancements including server room infrastructure and advanced authentication.
                  </p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {securityAddons.map((addon, index) => (
                    <ServiceCard key={index} service={addon} />
                  ))}
                </div>
              </TabsContent>

              {/* Professional Services */}
              <TabsContent value="professional" className="space-y-8">
                <div className="text-center mb-12">
                  <h2 className="text-5xl font-bold text-white mb-4 geometric-text">Professional Services</h2>
                  <p className="text-xl text-gray-400 max-w-4xl mx-auto">
                    Expert consulting and implementation services for comprehensive cybersecurity deployment.
                  </p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {professionalServices.map((service, index) => (
                    <ProfessionalServiceCard key={index} service={service} />
                  ))}
                </div>
              </TabsContent>
            </Tabs>

            {/* Call to Action */}
            <section className="mt-16 text-center">
              <Card className="bg-gradient-to-r from-cyan-900/50 to-blue-900/50 border border-cyan-500/30 cyber-glow">
                <CardContent className="p-12">
                  <h2 className="text-4xl font-bold text-white mb-6">Ready to Secure Your Organization?</h2>
                  <p className="text-lg text-gray-400 mb-8 max-w-3xl mx-auto">
                    Contact our cybersecurity experts to discuss your specific requirements and find the perfect 
                    combination of services for your organization's security needs.
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