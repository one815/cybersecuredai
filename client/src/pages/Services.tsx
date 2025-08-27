import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MarketingLayout } from "@/components/MarketingLayout";
import { Separator } from "@/components/ui/separator";
import { 
  Shield, 
  Settings, 
  Users, 
  Server, 
  Cloud, 
  Lock, 
  AlertTriangle, 
  Target, 
  Brain, 
  Search, 
  Eye, 
  BarChart3,
  CheckCircle,
  Phone,
  Mail,
  ArrowRight,
  Zap,
  Building2,
  GraduationCap,
  Globe,
  Network
} from "lucide-react";

export default function Services() {
  const [selectedCategory, setSelectedCategory] = useState("professional");

  const professionalServices = [
    {
      category: "Assessment and Planning",
      icon: <Search className="h-6 w-6" />,
      services: [
        {
          name: "Security Assessment",
          description: "Comprehensive evaluation of your current security posture",
          features: ["Risk analysis", "Vulnerability scanning", "Compliance gap analysis"],
          price: "$8,000 - $25,000"
        },
        {
          name: "IT Infrastructure Assessment", 
          description: "Complete analysis of your technology infrastructure",
          features: ["Network topology review", "Performance analysis", "Scalability planning"],
          price: "Contact for pricing"
        },
        {
          name: "Compliance Readiness Assessment",
          description: "Prepare for regulatory compliance requirements",
          features: ["FERPA compliance", "FISMA readiness", "CIPA assessment"],
          price: "$5,000 - $15,000"
        }
      ]
    },
    {
      category: "Implementation Services",
      icon: <Settings className="h-6 w-6" />,
      services: [
        {
          name: "Hardware Installation",
          description: "Professional installation of security hardware",
          features: ["On-site installation", "Configuration", "Testing & validation"],
          price: "$2,000 - $8,000"
        },
        {
          name: "Software Deployment",
          description: "Expert deployment of security software solutions",
          features: ["Custom configuration", "Integration setup", "User training"],
          price: "$3,000 - $12,000"
        },
        {
          name: "System Integration",
          description: "Seamless integration with existing systems",
          features: ["API integration", "Data migration", "Legacy system support"],
          price: "$5,000 - $20,000"
        }
      ]
    },
    {
      category: "Ongoing Services",
      icon: <Users className="h-6 w-6" />,
      services: [
        {
          name: "Security Training",
          description: "Comprehensive security awareness training programs",
          features: ["Interactive modules", "Phishing simulations", "Progress tracking"],
          price: "$1,500 - $5,000/month"
        },
        {
          name: "Regular Security Reviews",
          description: "Scheduled security assessments and updates",
          features: ["Monthly reviews", "Threat landscape updates", "Recommendations"],
          price: "$2,000 - $8,000/month"
        },
        {
          name: "Incident Response Support",
          description: "24/7 incident response and support services",
          features: ["Emergency response", "Forensic analysis", "Recovery planning"],
          price: "$5,000 - $15,000/month"
        }
      ]
    }
  ];

  const managedServices = [
    {
      tier: "Basic IT Support",
      price: "$2,000 - $4,000/month",
      description: "Essential IT support for small organizations",
      features: [
        "8x5 help desk support",
        "Basic monitoring",
        "Patch management", 
        "Email support",
        "Remote assistance"
      ],
      icon: <Phone className="h-8 w-8" />
    },
    {
      tier: "Advanced IT Support", 
      price: "$5,000 - $9,000/month",
      description: "Comprehensive support for growing organizations",
      features: [
        "24x7 help desk support",
        "Proactive monitoring",
        "Security monitoring",
        "On-site support",
        "Priority response"
      ],
      icon: <Shield className="h-8 w-8" />
    },
    {
      tier: "Premium IT Support",
      price: "$10,000 - $20,000/month", 
      description: "Enterprise-grade support with dedicated resources",
      features: [
        "Dedicated account manager",
        "Advanced threat detection",
        "Compliance monitoring",
        "Strategic planning",
        "Custom integrations"
      ],
      icon: <Building2 className="h-8 w-8" />
    }
  ];

  const securityAddOns = [
    {
      name: "Secure Server Room Kit",
      price: "$15,000 - $30,000",
      description: "Complete physical security solution for server rooms",
      features: ["Access control systems", "Environmental monitoring", "Surveillance cameras", "Fire suppression"],
      icon: <Server className="h-6 w-6" />
    },
    {
      name: "Multi-Factor Authentication Hardware",
      price: "$5,000 - $15,000", 
      description: "Hardware-based MFA solutions for enhanced security",
      features: ["Hardware tokens", "Biometric scanners", "Smart cards", "Integration support"],
      icon: <Lock className="h-6 w-6" />
    },
    {
      name: "Network Segmentation Bundle",
      price: "$10,000 - $25,000",
      description: "Advanced network segmentation for enhanced security",
      features: ["VLAN configuration", "Firewall rules", "Access controls", "Monitoring"],
      icon: <Network className="h-6 w-6" />
    },
    {
      name: "Disaster Recovery Infrastructure", 
      price: "$20,000 - $40,000",
      description: "Comprehensive disaster recovery and business continuity",
      features: ["Backup systems", "Failover solutions", "Recovery testing", "Documentation"],
      icon: <AlertTriangle className="h-6 w-6" />
    },
    {
      name: "Penetration Testing",
      price: "$15,000 - $30,000",
      description: "Comprehensive security testing and vulnerability assessment",
      features: ["Network testing", "Application testing", "Social engineering", "Detailed reporting"],
      icon: <Target className="h-6 w-6" />
    },
    {
      name: "Advanced Threat Intelligence Integration",
      price: "$10,000 - $20,000",
      description: "Integration of advanced threat intelligence feeds",
      features: ["MISP integration", "Custom feeds", "Real-time alerts", "Threat hunting"],
      icon: <Eye className="h-6 w-6" />
    },
    {
      name: "Smart City Security Suite",
      price: "$25,000 - $45,000",
      description: "Comprehensive security solution for smart city initiatives",
      features: ["IoT security", "Infrastructure monitoring", "Emergency response", "Citizen services"],
      icon: <Globe className="h-6 w-6" />
    }
  ];

  const platformFeatures = [
    {
      category: "Core AI Features",
      features: [
        { name: "AI-Powered Threat Detection", description: "Advanced machine learning for threat identification" },
        { name: "Automated Incident Response", description: "Intelligent automated response to security incidents" },
        { name: "Compliance Automation", description: "Automated compliance monitoring and reporting" },
        { name: "Predictive Risk Analysis", description: "AI-driven risk prediction and prevention" }
      ]
    },
    {
      category: "Advanced AI Capabilities", 
      features: [
        { name: "Advanced AI-Driven Threat Hunting", description: "Proactive threat hunting using advanced AI" },
        { name: "AI-Enhanced Predictive Risk Analysis", description: "Enhanced predictive capabilities with deep learning" },
        { name: "AI-Powered Compliance Automation", description: "Intelligent compliance management" },
        { name: "Interactive Security Visualization", description: "Advanced visualization and analytics" },
        { name: "AI-Based User Behavior Analytics", description: "Behavioral analysis for anomaly detection" }
      ]
    },
    {
      category: "Security Infrastructure",
      features: [
        { name: "Multi-Factor Authentication", description: "Advanced MFA with biometric options" },
        { name: "Zero-Trust Architecture", description: "Comprehensive zero-trust security model" },
        { name: "Data Protection & Encryption", description: "End-to-end data protection" },
        { name: "Identity Management", description: "Centralized identity and access management" }
      ]
    }
  ];

  const cloudPackages = [
    {
      name: "Cyber-Cloud Essential",
      price: "$15,000 - $30,000",
      description: "Essential cloud security for small to medium organizations",
      features: ["Basic cloud monitoring", "Standard encryption", "24/7 support", "Compliance reporting"]
    },
    {
      name: "Cyber-Cloud Advanced", 
      price: "$30,000 - $60,000",
      description: "Advanced cloud security with enhanced features",
      features: ["Advanced threat detection", "AI-powered analytics", "Custom integrations", "Priority support"]
    },
    {
      name: "Cyber-Cloud Enterprise",
      price: "$60,000 - $150,000",
      description: "Enterprise-grade cloud security solution",
      features: ["Full AI suite", "Custom development", "Dedicated support", "Advanced compliance"]
    },
    {
      name: "FedRAMP-Compliant Cloud Networks",
      price: "$40,000 - $80,000", 
      description: "Government-grade cloud security compliance",
      features: ["FedRAMP compliance", "Government standards", "Audit support", "Secure communications"]
    }
  ];

  const hardwarePackages = [
    {
      name: "Hardware Essential",
      price: "$8,000 - $14,500",
      description: "Basic hardware security package",
      features: ["Firewall appliance", "Basic monitoring", "Standard support", "Basic configuration"]
    },
    {
      name: "Hardware Advanced",
      price: "$35,000 - $55,000",
      description: "Advanced hardware security solution",
      features: ["Enterprise firewalls", "IDS/IPS systems", "Advanced monitoring", "Professional services"]
    },
    {
      name: "Hardware Enterprise",
      price: "$90,000 - $155,000",
      description: "Enterprise-grade hardware security infrastructure",
      features: ["Complete security stack", "Redundancy", "24/7 monitoring", "Dedicated support"]
    }
  ];

  const educationPrograms = [
    {
      sector: "K-12 Education",
      icon: <GraduationCap className="h-6 w-6" />,
      programs: [
        { name: "K-12 Small Pilot", description: "For districts under 5,000 students", features: ["Basic monitoring", "Essential training", "Standard support"] },
        { name: "K-12 Medium Pilot", description: "For districts 5,000-15,000 students", features: ["Advanced monitoring", "Comprehensive training", "Priority support"] },
        { name: "K-12 Large Pilot", description: "For districts over 15,000 students", features: ["Enterprise features", "Custom training", "Dedicated support"] }
      ]
    },
    {
      sector: "Higher Education",
      icon: <Building2 className="h-6 w-6" />,
      programs: [
        { name: "Higher Ed Small Pilot", description: "For colleges under 10,000 students", features: ["Research network security", "Faculty training", "Student awareness"] },
        { name: "Higher Ed Medium Pilot", description: "For universities 10,000-25,000 students", features: ["Campus-wide security", "Advanced research protection", "Comprehensive training"] },
        { name: "Higher Ed Large Pilot", description: "For universities over 25,000 students", features: ["Multi-campus support", "Research collaboration security", "Enterprise integration"] }
      ]
    }
  ];

  const specializedSolutions = [
    {
      name: "Multi-State Security Coalition Platform",
      price: "$50,000 - $120,000",
      description: "Collaborative security platform for multi-state initiatives",
      features: ["Cross-border collaboration", "Shared threat intelligence", "Unified reporting", "Compliance coordination"]
    },
    {
      name: "Government Community Cloud Integration",
      price: "$30,000 - $75,000", 
      description: "Integration with government community cloud services",
      features: ["GovCloud compatibility", "Security clearance", "Compliance automation", "Secure communications"]
    },
    {
      name: "Research Network Security Partitioning",
      price: "$25,000 - $60,000",
      description: "Specialized security for research networks",
      features: ["Network segmentation", "Research data protection", "Collaboration security", "IP protection"]
    },
    {
      name: "Classroom Device Management",
      price: "$15,000 - $35,000",
      description: "Comprehensive device management for educational environments",
      features: ["Device enrollment", "Policy management", "Content filtering", "Usage monitoring"]
    },
    {
      name: "BYOD Security Management", 
      price: "$20,000 - $45,000",
      description: "Bring Your Own Device security management",
      features: ["Device compliance", "App management", "Data separation", "Security policies"]
    }
  ];

  return (
    <MarketingLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
        {/* Hero Section */}
        <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              Professional <span className="text-cyan-400">Cybersecurity Services</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Comprehensive cybersecurity solutions tailored for educational institutions, government agencies, and enterprises. From assessment to implementation and ongoing support.
            </p>
            <div className="flex justify-center space-x-4">
              <Button size="lg" className="bg-cyan-500 hover:bg-cyan-600 text-white">
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-cyan-400 text-cyan-400 hover:bg-cyan-400/10">
                Schedule Consultation
              </Button>
            </div>
          </div>
        </section>

        {/* Service Categories */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
              <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 mb-8 bg-slate-800/50">
                <TabsTrigger value="professional" className="data-[state=active]:bg-cyan-500">
                  Professional Services
                </TabsTrigger>
                <TabsTrigger value="managed" className="data-[state=active]:bg-cyan-500">
                  Managed Services
                </TabsTrigger>
                <TabsTrigger value="platform" className="data-[state=active]:bg-cyan-500">
                  Platform Features
                </TabsTrigger>
                <TabsTrigger value="solutions" className="data-[state=active]:bg-cyan-500">
                  Solution Packages
                </TabsTrigger>
                <TabsTrigger value="education" className="data-[state=active]:bg-cyan-500">
                  Education Programs
                </TabsTrigger>
              </TabsList>

              {/* Professional Services */}
              <TabsContent value="professional">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-white mb-4">Professional Services</h2>
                  <p className="text-gray-300 mb-8">Expert consulting and implementation services to establish and enhance your cybersecurity posture.</p>
                </div>
                
                <div className="space-y-8">
                  {professionalServices.map((category) => (
                    <div key={category.category}>
                      <div className="flex items-center mb-6">
                        <div className="p-2 bg-cyan-500/20 rounded-lg mr-4">
                          {category.icon}
                        </div>
                        <h3 className="text-2xl font-semibold text-white">{category.category}</h3>
                      </div>
                      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {category.services.map((service) => (
                          <Card key={service.name} className="bg-slate-800/50 border-cyan-400/30 hover:border-cyan-400/60 transition-colors">
                            <CardHeader>
                              <CardTitle className="text-white">{service.name}</CardTitle>
                              <CardDescription className="text-gray-300">{service.description}</CardDescription>
                              <Badge variant="outline" className="border-green-400 text-green-400 w-fit">
                                {service.price}
                              </Badge>
                            </CardHeader>
                            <CardContent>
                              <ul className="space-y-2">
                                {service.features.map((feature) => (
                                  <li key={feature} className="flex items-center text-gray-300">
                                    <CheckCircle className="h-4 w-4 text-green-400 mr-2 flex-shrink-0" />
                                    {feature}
                                  </li>
                                ))}
                              </ul>
                              <Button className="w-full mt-4 bg-cyan-500 hover:bg-cyan-600">
                                Learn More
                              </Button>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Security Add-on Services */}
                <div className="mt-16">
                  <h3 className="text-2xl font-bold text-white mb-6">Security Add-on Services</h3>
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {securityAddOns.map((addon) => (
                      <Card key={addon.name} className="bg-slate-800/50 border-cyan-400/30 hover:border-cyan-400/60 transition-colors">
                        <CardHeader>
                          <div className="flex items-center mb-2">
                            <div className="p-2 bg-cyan-500/20 rounded-lg mr-3">
                              {addon.icon}
                            </div>
                            <CardTitle className="text-white">{addon.name}</CardTitle>
                          </div>
                          <CardDescription className="text-gray-300">{addon.description}</CardDescription>
                          <Badge variant="outline" className="border-green-400 text-green-400 w-fit">
                            {addon.price}
                          </Badge>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2">
                            {addon.features.map((feature) => (
                              <li key={feature} className="flex items-center text-gray-300">
                                <CheckCircle className="h-4 w-4 text-green-400 mr-2 flex-shrink-0" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                          <Button className="w-full mt-4 bg-cyan-500 hover:bg-cyan-600">
                            Request Quote
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>

              {/* Managed Services */}
              <TabsContent value="managed">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-white mb-4">IT Support & Managed Services</h2>
                  <p className="text-gray-300 mb-8">Comprehensive managed IT and security services with 24/7 monitoring and support.</p>
                </div>
                
                <div className="grid gap-8 lg:grid-cols-3">
                  {managedServices.map((tier) => (
                    <Card key={tier.tier} className="bg-slate-800/50 border-cyan-400/30 hover:border-cyan-400/60 transition-colors">
                      <CardHeader className="text-center">
                        <div className="mx-auto p-4 bg-cyan-500/20 rounded-full mb-4 w-fit">
                          {tier.icon}
                        </div>
                        <CardTitle className="text-white text-xl">{tier.tier}</CardTitle>
                        <CardDescription className="text-gray-300">{tier.description}</CardDescription>
                        <Badge variant="outline" className="border-green-400 text-green-400 w-fit mx-auto">
                          {tier.price}
                        </Badge>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-3">
                          {tier.features.map((feature) => (
                            <li key={feature} className="flex items-center text-gray-300">
                              <CheckCircle className="h-4 w-4 text-green-400 mr-3 flex-shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                        <Button className="w-full mt-6 bg-cyan-500 hover:bg-cyan-600">
                          Choose Plan
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Platform Features */}
              <TabsContent value="platform">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-white mb-4">CyberSecure AI Core Platform</h2>
                  <p className="text-gray-300 mb-8">Advanced AI-powered cybersecurity platform with comprehensive threat detection and automated response capabilities.</p>
                </div>
                
                <div className="space-y-8">
                  {platformFeatures.map((category) => (
                    <div key={category.category}>
                      <h3 className="text-2xl font-semibold text-white mb-6">{category.category}</h3>
                      <div className="grid gap-6 md:grid-cols-2">
                        {category.features.map((feature) => (
                          <Card key={feature.name} className="bg-slate-800/50 border-cyan-400/30 hover:border-cyan-400/60 transition-colors">
                            <CardHeader>
                              <CardTitle className="text-white flex items-center">
                                <Brain className="h-5 w-5 text-cyan-400 mr-2" />
                                {feature.name}
                              </CardTitle>
                              <CardDescription className="text-gray-300">{feature.description}</CardDescription>
                            </CardHeader>
                          </Card>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              {/* Solution Packages */}
              <TabsContent value="solutions">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-white mb-4">Solution Packages</h2>
                  <p className="text-gray-300 mb-8">Pre-configured security solutions designed for different organizational needs and compliance requirements.</p>
                </div>
                
                <div className="space-y-12">
                  {/* Cloud Security Packages */}
                  <div>
                    <h3 className="text-2xl font-semibold text-white mb-6 flex items-center">
                      <Cloud className="h-6 w-6 text-cyan-400 mr-3" />
                      Cloud Security Packages
                    </h3>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                      {cloudPackages.map((pkg) => (
                        <Card key={pkg.name} className="bg-slate-800/50 border-cyan-400/30 hover:border-cyan-400/60 transition-colors">
                          <CardHeader>
                            <CardTitle className="text-white">{pkg.name}</CardTitle>
                            <CardDescription className="text-gray-300">{pkg.description}</CardDescription>
                            <Badge variant="outline" className="border-green-400 text-green-400 w-fit">
                              {pkg.price}
                            </Badge>
                          </CardHeader>
                          <CardContent>
                            <ul className="space-y-2">
                              {pkg.features.map((feature) => (
                                <li key={feature} className="flex items-center text-gray-300">
                                  <CheckCircle className="h-4 w-4 text-green-400 mr-2 flex-shrink-0" />
                                  {feature}
                                </li>
                              ))}
                            </ul>
                            <Button className="w-full mt-4 bg-cyan-500 hover:bg-cyan-600">
                              Select Package
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>

                  {/* Hardware Security Packages */}
                  <div>
                    <h3 className="text-2xl font-semibold text-white mb-6 flex items-center">
                      <Server className="h-6 w-6 text-cyan-400 mr-3" />
                      Hardware Security Packages
                    </h3>
                    <div className="grid gap-6 lg:grid-cols-3">
                      {hardwarePackages.map((pkg) => (
                        <Card key={pkg.name} className="bg-slate-800/50 border-cyan-400/30 hover:border-cyan-400/60 transition-colors">
                          <CardHeader>
                            <CardTitle className="text-white">{pkg.name}</CardTitle>
                            <CardDescription className="text-gray-300">{pkg.description}</CardDescription>
                            <Badge variant="outline" className="border-green-400 text-green-400 w-fit">
                              {pkg.price}
                            </Badge>
                          </CardHeader>
                          <CardContent>
                            <ul className="space-y-2">
                              {pkg.features.map((feature) => (
                                <li key={feature} className="flex items-center text-gray-300">
                                  <CheckCircle className="h-4 w-4 text-green-400 mr-2 flex-shrink-0" />
                                  {feature}
                                </li>
                              ))}
                            </ul>
                            <Button className="w-full mt-4 bg-cyan-500 hover:bg-cyan-600">
                              Get Quote
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>

                  {/* Specialized Government Solutions */}
                  <div>
                    <h3 className="text-2xl font-semibold text-white mb-6 flex items-center">
                      <Building2 className="h-6 w-6 text-cyan-400 mr-3" />
                      Specialized Solutions
                    </h3>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                      {specializedSolutions.map((solution) => (
                        <Card key={solution.name} className="bg-slate-800/50 border-cyan-400/30 hover:border-cyan-400/60 transition-colors">
                          <CardHeader>
                            <CardTitle className="text-white">{solution.name}</CardTitle>
                            <CardDescription className="text-gray-300">{solution.description}</CardDescription>
                            <Badge variant="outline" className="border-green-400 text-green-400 w-fit">
                              {solution.price}
                            </Badge>
                          </CardHeader>
                          <CardContent>
                            <ul className="space-y-2">
                              {solution.features.map((feature) => (
                                <li key={feature} className="flex items-center text-gray-300">
                                  <CheckCircle className="h-4 w-4 text-green-400 mr-2 flex-shrink-0" />
                                  {feature}
                                </li>
                              ))}
                            </ul>
                            <Button className="w-full mt-4 bg-cyan-500 hover:bg-cyan-600">
                              Learn More
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Education Programs */}
              <TabsContent value="education">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-white mb-4">CyberSecure AI-EDU Pilot Programs</h2>
                  <p className="text-gray-300 mb-8">Specialized cybersecurity programs designed for educational institutions with tailored features and pricing.</p>
                </div>
                
                <div className="space-y-12">
                  {educationPrograms.map((sector) => (
                    <div key={sector.sector}>
                      <h3 className="text-2xl font-semibold text-white mb-6 flex items-center">
                        {sector.icon}
                        <span className="ml-3">{sector.sector}</span>
                      </h3>
                      <div className="grid gap-6 lg:grid-cols-3">
                        {sector.programs.map((program) => (
                          <Card key={program.name} className="bg-slate-800/50 border-cyan-400/30 hover:border-cyan-400/60 transition-colors">
                            <CardHeader>
                              <CardTitle className="text-white">{program.name}</CardTitle>
                              <CardDescription className="text-gray-300">{program.description}</CardDescription>
                            </CardHeader>
                            <CardContent>
                              <ul className="space-y-2">
                                {program.features.map((feature) => (
                                  <li key={feature} className="flex items-center text-gray-300">
                                    <CheckCircle className="h-4 w-4 text-green-400 mr-2 flex-shrink-0" />
                                    {feature}
                                  </li>
                                ))}
                              </ul>
                              <Button className="w-full mt-4 bg-cyan-500 hover:bg-cyan-600">
                                Apply for Pilot
                              </Button>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-900/50">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Ready to Enhance Your Cybersecurity?</h2>
            <p className="text-xl text-gray-300 mb-8">
              Contact our experts to discuss your specific needs and find the right solution for your organization.
            </p>
            <div className="flex justify-center space-x-4">
              <Button size="lg" className="bg-cyan-500 hover:bg-cyan-600 text-white">
                <Phone className="mr-2 h-5 w-5" />
                Schedule Consultation
              </Button>
              <Button size="lg" variant="outline" className="border-cyan-400 text-cyan-400 hover:bg-cyan-400/10">
                <Mail className="mr-2 h-5 w-5" />
                Request Quote
              </Button>
            </div>
          </div>
        </section>
      </div>
    </MarketingLayout>
  );
}