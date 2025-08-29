import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MarketingLayout } from "@/components/MarketingLayout";
import { 
  Shield, 
  Settings, 
  Users, 
  CheckCircle,
  ArrowRight,
  Star,
  ExternalLink,
  Clock,
  Award,
  Target,
  Eye,
  Phone,
  Building,
  Server,
  Network,
  HardDrive,
  Cpu,
  Database,
  Crown,
  Globe
} from "lucide-react";
import {
  CustomShieldIcon,
  CustomBrainIcon,
  CustomTargetIcon,
  CustomEyeIcon,
  CustomHeadphonesIcon,
  CustomSettingsIcon
} from "@/components/CustomIcons";
import { Link } from "wouter";

// Professional services images
import managedServicesImg from "@assets/generated_images/SOC_Dashboard_Management_23c1af0b.png";
import professionalImg from "@assets/generated_images/Client_Success_Story_e83fb121.png";
import supportImg from "@assets/generated_images/Success_Kit_Collection_aad5a657.png";

export default function Services() {
  const [selectedCategory, setSelectedCategory] = useState("managed");

  const enhancedAICapabilities = [
    {
      title: "Advanced AI-Driven Threat Hunting",
      description: "Proactive AI-powered threat hunting that identifies potential threats before they manifest",
      icon: <CustomEyeIcon className="w-8 h-8 text-red-400" size={32} />,
      features: [
        "PyMISP-powered real-time threat detection and analysis",
        "CIRCL-enhanced behavioral analytics for anomaly detection",
        "Multi-source threat intelligence integration (CIRCL + MISP)",
        "Predictive threat modeling",
        "Continuous monitoring and response",
        "AI-enhanced investigation tools"
      ],
      metrics: "99.7% Accuracy",
      price: "Contact for Pricing"
    },
    {
      title: "AI-Enhanced Predictive Risk Analysis",
      description: "Advanced machine learning models that predict potential vulnerabilities based on historical data",
      icon: <CustomBrainIcon className="w-8 h-8 text-purple-400" size={32} />,
      features: [
        "Customized risk modeling for education/government",
        "Trend analysis and forecasting",
        "Prioritized vulnerability management",
        "Historical data pattern analysis",
        "Emerging threat pattern recognition",
        "Risk score optimization"
      ],
      metrics: "87% Risk Reduction",
      price: "Contact for Pricing"
    },
    {
      title: "AI-Powered Compliance Automation",
      description: "Sophisticated AI to streamline regulatory compliance across multiple frameworks",
      icon: <CustomShieldIcon className="w-8 h-8 text-green-400" size={32} />,
      features: [
        "FERPA, COPPA, CIPA automation",
        "FedRAMP, FISMA compliance",
        "Dynamic policy enforcement",
        "Automated compliance monitoring",
        "Compliance reporting and documentation",
        "Multi-framework management"
      ],
      metrics: "85% Less Admin",
      price: "Contact for Pricing"
    },
    {
      title: "Interactive Security Visualization",
      description: "5D security visualization environment for intuitive threat exploration",
      icon: <Eye className="w-8 h-8 text-cyan-400" />,
      features: [
        "Real-time security dashboard",
        "Interactive threat maps",
        "Custom visualization for stakeholders",
        "5D security environment",
        "Intuitive threat exploration",
        "Executive-level reporting"
      ],
      metrics: "5D Visualization",
      price: "Contact for Pricing"
    },
    {
      title: "AI-Based User Behavior Analytics",
      description: "Advanced user behavior pattern analysis to detect anomalies and insider threats",
      icon: <Users className="w-8 h-8 text-orange-400" />,
      features: [
        "User activity profiling",
        "Anomaly detection and alerting",
        "Continuous authentication monitoring",
        "Insider threat detection",
        "Compromised account identification",
        "Behavioral baseline establishment"
      ],
      metrics: "24/7 Monitoring",
      price: "Contact for Pricing"
    }
  ];

  const additionalSpecializedOfferings = [
    {
      title: "Advanced Threat Intelligence Integration",
      description: "Comprehensive threat intelligence with education and government-specific data",
      icon: <Network className="w-8 h-8 text-blue-400" />,
      features: [
        "Sector-specific threat feeds",
        "Integration with national security databases",
        "Customized threat intelligence reporting",
        "Multi-source intelligence aggregation",
        "Real-time threat correlation",
        "Government threat data access"
      ],
      price: "Contact for Pricing"
    },
    {
      title: "Multi-State Security Coalition Platform",
      description: "Collaborative platform enabling state governments to share resources and threat intelligence",
      icon: <Globe className="w-8 h-8 text-green-400" />,
      features: [
        "Secure information sharing portal",
        "Cross-jurisdiction threat alerting",
        "Collaborative incident response",
        "Multi-state coordination tools",
        "Secure communication channels",
        "Joint operation capabilities"
      ],
      price: "Contact for Pricing"
    },
    {
      title: "Smart City Security Suite",
      description: "Specialized protection for IoT and AI-powered smart city initiatives",
      icon: <Building className="w-8 h-8 text-purple-400" />,
      features: [
        "IoT device security management",
        "Smart infrastructure protection",
        "Public safety system security",
        "Traffic management protection",
        "Utility grid monitoring",
        "Emergency services integration"
      ],
      price: "Contact for Pricing"
    }
  ];

  const professionalServices = [
    {
      category: "Strategic Consulting",
      icon: <CustomTargetIcon className="w-6 h-6 text-cyan-400" size={24} />,
      services: [
        {
          name: "Cybersecurity Strategy Development",
          description: "Comprehensive security strategy aligned with your organizational goals",
          deliverables: ["Security roadmap", "Risk assessment", "Budget planning", "Executive briefings"],
          timeline: "4-6 weeks",
          price: "Contact for Pricing"
        },
        {
          name: "Zero Trust Architecture Design",
          description: "Complete zero trust implementation planning and design",
          deliverables: ["Architecture blueprint", "Implementation plan", "Technology recommendations"],
          timeline: "6-8 weeks", 
          price: "Contact for Pricing"
        },
        {
          name: "Multi-State Collaboration Platform",
          description: "Inter-agency cybersecurity coordination and threat sharing",
          deliverables: ["NIEM compliance setup", "Cross-state protocols", "Emergency response coordination"],
          timeline: "8-12 weeks",
          price: "Contact for Pricing"
        }
      ]
    },
    {
      category: "Implementation & Integration",
      icon: <CustomSettingsIcon className="w-6 h-6 text-green-400" size={24} />,
      services: [
        {
          name: "Platform Implementation", 
          description: "Expert deployment and configuration of CyberSecure AI platform",
          deliverables: ["Platform setup", "Custom configuration", "Integration testing", "User training"],
          timeline: "2-4 weeks",
          price: "Contact for Pricing"
        },
        {
          name: "Legacy System Integration",
          description: "Seamless integration with existing security infrastructure",
          deliverables: ["Integration architecture", "Data migration", "API development", "Testing"],
          timeline: "4-8 weeks",
          price: "Contact for Pricing"
        },
        {
          name: "Advanced Authentication Setup",
          description: "FIDO2/WebAuthn, PIV/CAC, and hardware security key integration",
          deliverables: ["Multi-factor authentication", "Hardware key provisioning", "Government authentication"],
          timeline: "3-5 weeks",
          price: "Contact for Pricing"
        }
      ]
    },
    {
      category: "Specialized Solutions",
      icon: <Building className="w-6 h-6 text-purple-400" />,
      services: [
        {
          name: "Smart City Infrastructure Security",
          description: "Comprehensive protection for smart city and critical infrastructure",
          deliverables: ["Traffic system security", "Utility grid monitoring", "Emergency services integration"],
          timeline: "6-10 weeks",
          price: "Contact for Pricing"
        },
        {
          name: "Education Sector Integration",
          description: "FERPA-compliant security for educational institutions",
          deliverables: ["LMS integration", "Student data protection", "Campus security coordination"],
          timeline: "4-6 weeks",
          price: "Contact for Pricing"
        }
      ]
    }
  ];

  return (
    <MarketingLayout>
      <div className="min-h-screen bg-slate-900">
        
        {/* Bold Hero - Huntress Style */}
        <section className="relative py-24 px-6 bg-gradient-to-br from-slate-900 via-orange-900/20 to-slate-900">
          <div className="absolute inset-0 bg-grid-white/[0.02]"></div>
          <div className="container mx-auto max-w-7xl relative z-10">
            <div className="text-center mb-20">
              <Badge className="mb-8 bg-orange-500/20 text-orange-300 border-orange-500/30 text-lg px-6 py-3">
                Expert Security Services
              </Badge>
              <h1 className="text-6xl md:text-8xl font-bold text-white mb-8 leading-tight">
                Threats Hunted.<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
                  Expertise Delivered.
                </span>
              </h1>
              <p className="text-2xl md:text-3xl text-gray-300 mb-12 max-w-5xl mx-auto leading-relaxed">
                Expert-led cybersecurity services backed by our industry-proven team and 
                24/7 AI-assisted SOC for continuous protection.
              </p>
              
              <div className="flex items-center justify-center space-x-2 mb-8">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                ))}
                <span className="ml-4 text-white font-semibold text-lg">4.9/5 customer satisfaction rating</span>
              </div>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link href="/contact">
                  <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white px-10 py-4 text-lg font-semibold">
                    Consult with Experts
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link href="/pricing">
                  <Button size="lg" variant="outline" className="border-orange-500 text-orange-400 hover:bg-orange-500/10 px-10 py-4 text-lg font-semibold">
                    View Service Pricing
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Service Categories */}
        <section className="py-20 px-6 bg-slate-800">
          <div className="container mx-auto max-w-7xl">
            <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
                  Expert Services<br />
                  <span className="text-orange-400">Tailored for You</span>
                </h2>
                <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-2 bg-slate-700">
                  <TabsTrigger value="managed" className="data-[state=active]:bg-orange-600 text-lg py-4">
                    <CustomEyeIcon className="w-6 h-6 mr-2" size={24} />
                    Managed Services
                  </TabsTrigger>
                  <TabsTrigger value="professional" className="data-[state=active]:bg-orange-600 text-lg py-4">
                    <CustomHeadphonesIcon className="w-6 h-6 mr-2" size={24} />
                    Professional Services
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="managed" className="space-y-12">
                {/* Enhanced AI Capabilities */}
                <div>
                  <h3 className="text-3xl font-bold text-white mb-8 text-center">Enhanced AI Capabilities</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {enhancedAICapabilities.slice(0, 3).map((service, index) => (
                      <Card key={index} className="bg-slate-700/60 border border-orange-500/30 hover:border-orange-400/60 transition-all duration-300 group">
                        <CardHeader className="p-6 text-center">
                          <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-500/30 transition-colors">
                            {service.icon}
                          </div>
                          <div className="flex justify-center mb-3">
                            <Badge className="bg-white/10 text-orange-300 font-bold text-xs">
                              {service.metrics}
                            </Badge>
                          </div>
                          <CardTitle className="text-xl text-white mb-3">{service.title}</CardTitle>
                          <p className="text-gray-300 text-sm mb-4">{service.description}</p>
                        </CardHeader>
                        <CardContent className="p-6 pt-0">
                          <ul className="space-y-2 mb-4">
                            {service.features.slice(0, 4).map((feature, fIndex) => (
                              <li key={fIndex} className="flex items-center space-x-2">
                                <CheckCircle className="w-3 h-3 text-green-400 flex-shrink-0" />
                                <span className="text-gray-300 text-xs">{feature}</span>
                              </li>
                            ))}
                          </ul>
                          <div className="text-center mb-4">
                            <div className="text-orange-400 font-bold">{service.price}</div>
                          </div>
                          <Button 
                            size="sm" 
                            className="button-4d w-full"
onClick={() => { window.location.href = '/solutions'; setTimeout(() => window.scrollTo(0, 0), 100); }}
                          >
                            Learn More
                            <ArrowRight className="ml-2 w-3 h-3" />
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 max-w-4xl mx-auto">
                    {enhancedAICapabilities.slice(3, 5).map((service, index) => (
                      <Card key={index + 3} className="bg-slate-700/60 border border-orange-500/30 hover:border-orange-400/60 transition-all duration-300 group">
                        <CardHeader className="p-6 text-center">
                          <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-500/30 transition-colors">
                            {service.icon}
                          </div>
                          <div className="flex justify-center mb-3">
                            <Badge className="bg-white/10 text-orange-300 font-bold text-xs">
                              {service.metrics}
                            </Badge>
                          </div>
                          <CardTitle className="text-xl text-white mb-3">{service.title}</CardTitle>
                          <p className="text-gray-300 text-sm mb-4">{service.description}</p>
                        </CardHeader>
                        <CardContent className="p-6 pt-0">
                          <ul className="space-y-2 mb-4">
                            {service.features.slice(0, 4).map((feature, fIndex) => (
                              <li key={fIndex} className="flex items-center space-x-2">
                                <CheckCircle className="w-3 h-3 text-green-400 flex-shrink-0" />
                                <span className="text-gray-300 text-xs">{feature}</span>
                              </li>
                            ))}
                          </ul>
                          <div className="text-center mb-4">
                            <div className="text-orange-400 font-bold">{service.price}</div>
                          </div>
                          <Button 
                            size="sm" 
                            className="button-4d w-full"
onClick={() => { window.location.href = '/solutions'; setTimeout(() => window.scrollTo(0, 0), 100); }}
                          >
                            Learn More
                            <ArrowRight className="ml-2 w-3 h-3" />
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Additional Specialized Offerings */}
                <div>
                  <h3 className="text-3xl font-bold text-white mb-8 text-center">Additional Specialized Offerings</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {additionalSpecializedOfferings.map((service, index) => (
                      <Card key={index} className="bg-slate-700/60 border border-cyan-500/30 hover:border-cyan-400/60 transition-all duration-300 group">
                        <CardHeader className="p-6 text-center">
                          <div className="w-16 h-16 bg-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-cyan-500/30 transition-colors">
                            {service.icon}
                          </div>
                          <CardTitle className="text-xl text-white mb-3">{service.title}</CardTitle>
                          <p className="text-gray-300 text-sm mb-4">{service.description}</p>
                        </CardHeader>
                        <CardContent className="p-6 pt-0">
                          <ul className="space-y-2 mb-4">
                            {service.features.slice(0, 4).map((feature, fIndex) => (
                              <li key={fIndex} className="flex items-center space-x-2">
                                <CheckCircle className="w-3 h-3 text-green-400 flex-shrink-0" />
                                <span className="text-gray-300 text-xs">{feature}</span>
                              </li>
                            ))}
                          </ul>
                          <div className="text-center mb-4">
                            <div className="text-cyan-400 font-bold">{service.price}</div>
                          </div>
                          <Button 
                            size="sm" 
                            className="button-4d w-full"
onClick={() => { window.location.href = '/solutions'; setTimeout(() => window.scrollTo(0, 0), 100); }}
                          >
                            Learn More
                            <ArrowRight className="ml-2 w-3 h-3" />
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* IT Support Tiers */}
                <div>
                  <h3 className="text-3xl font-bold text-white mb-8 text-center">Protection Level</h3>
                  
                  <div className="flex justify-center mb-8">
                    <div className="flex bg-gray-800/50 rounded-lg p-1">
                      <button 
                        className={`px-6 py-2 rounded-md font-semibold transition-colors ${
                          selectedCategory === 'managed' ? 'bg-green-500 text-white' : 'text-gray-300 hover:text-white'
                        }`}
                        onClick={() => setSelectedCategory('managed')}
                      >
                        🎓 Education
                      </button>
                      <button 
                        className={`px-6 py-2 rounded-md font-semibold transition-colors ${
                          selectedCategory === 'government' ? 'bg-green-500 text-white' : 'text-gray-300 hover:text-white'
                        }`}
                        onClick={() => setSelectedCategory('government')}
                      >
                        🏛️ Government
                      </button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {selectedCategory === 'managed' ? (
                      // Education Protection Levels
                      <>
                        <Card className="bg-slate-700/60 border border-blue-500/30">
                          <CardHeader className="p-6 text-center">
                            <Server className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                            <Badge className="mb-4 bg-blue-500/20 text-blue-300">Basic</Badge>
                            <CardTitle className="text-xl text-white mb-3">Essential Protection</CardTitle>
                            <div className="text-2xl font-bold text-blue-400 mb-2">Essential Protection</div>
                            <p className="text-gray-300 text-sm">Professional cybersecurity solution</p>
                            <div className="mt-2">
                              <Badge className="bg-blue-500/20 text-blue-300">250 Users Max</Badge>
                            </div>
                          </CardHeader>
                          <CardContent className="p-6 pt-0">
                            <ul className="space-y-2 mb-6">
                              <li className="flex items-center space-x-2">
                                <CheckCircle className="w-4 h-4 text-green-400" />
                                <span className="text-gray-300 text-sm">Up to 250 users</span>
                              </li>
                              <li className="flex items-center space-x-2">
                                <CheckCircle className="w-4 h-4 text-green-400" />
                                <span className="text-gray-300 text-sm">AI-powered threat detection</span>
                              </li>
                              <li className="flex items-center space-x-2">
                                <CheckCircle className="w-4 h-4 text-green-400" />
                                <span className="text-gray-300 text-sm">Basic incident response</span>
                              </li>
                              <li className="flex items-center space-x-2">
                                <CheckCircle className="w-4 h-4 text-green-400" />
                                <span className="text-gray-300 text-sm">FERPA/CIPA compliance</span>
                              </li>
                              <li className="flex items-center space-x-2">
                                <CheckCircle className="w-4 h-4 text-green-400" />
                                <span className="text-gray-300 text-sm">Email & chat support</span>
                              </li>
                            </ul>
                            <Button 
                              className="button-4d w-full"
            onClick={() => { window.location.href = '/contact#top'; setTimeout(() => window.scrollTo(0, 0), 100); }}
                            >
                              Get Quote
                            </Button>
                          </CardContent>
                        </Card>
                      </>
                    ) : (
                      // Government Protection Levels
                      <>
                        <Card className="bg-slate-700/60 border border-red-500/30">
                          <CardHeader className="p-6 text-center">
                            <Building className="w-12 h-12 text-red-400 mx-auto mb-4" />
                            <Badge className="mb-4 bg-red-500/20 text-red-300">Federal</Badge>
                            <CardTitle className="text-xl text-white mb-3">Federal Security</CardTitle>
                            <div className="text-2xl font-bold text-red-400 mb-2">Federal Security</div>
                            <p className="text-gray-300 text-sm">Government-grade cybersecurity solution</p>
                            <div className="mt-2">
                              <Badge className="bg-red-500/20 text-red-300">FISMA Ready</Badge>
                            </div>
                          </CardHeader>
                          <CardContent className="p-6 pt-0">
                            <ul className="space-y-2 mb-6">
                              <li className="flex items-center space-x-2">
                                <CheckCircle className="w-4 h-4 text-green-400" />
                                <span className="text-gray-300 text-sm">FISMA compliance framework</span>
                              </li>
                              <li className="flex items-center space-x-2">
                                <CheckCircle className="w-4 h-4 text-green-400" />
                                <span className="text-gray-300 text-sm">FedRAMP authorized infrastructure</span>
                              </li>
                              <li className="flex items-center space-x-2">
                                <CheckCircle className="w-4 h-4 text-green-400" />
                                <span className="text-gray-300 text-sm">PIV/CAC authentication</span>
                              </li>
                              <li className="flex items-center space-x-2">
                                <CheckCircle className="w-4 h-4 text-green-400" />
                                <span className="text-gray-300 text-sm">Classified data handling</span>
                              </li>
                              <li className="flex items-center space-x-2">
                                <CheckCircle className="w-4 h-4 text-green-400" />
                                <span className="text-gray-300 text-sm">24/7 government SOC</span>
                              </li>
                            </ul>
                            <Button 
                              className="button-4d w-full"
            onClick={() => { window.location.href = '/contact#top'; setTimeout(() => window.scrollTo(0, 0), 100); }}
                            >
                              Contact Government Sales
                            </Button>
                          </CardContent>
                        </Card>
                        <Card className="bg-slate-700/60 border border-purple-500/30 relative">
                          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                            <Badge className="bg-purple-600 text-white">Recommended</Badge>
                          </div>
                          <CardHeader className="p-6 text-center">
                            <Network className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                            <Badge className="mb-4 bg-purple-500/20 text-purple-300">Advanced</Badge>
                            <CardTitle className="text-xl text-white mb-3">Multi-Agency Security</CardTitle>
                            <div className="text-2xl font-bold text-purple-400 mb-2">Multi-Agency Security</div>
                            <p className="text-gray-300 text-sm">Cross-jurisdiction collaboration platform</p>
                            <div className="mt-2">
                              <Badge className="bg-purple-500/20 text-purple-300">NIEM Compliant</Badge>
                            </div>
                          </CardHeader>
                          <CardContent className="p-6 pt-0">
                            <ul className="space-y-2 mb-6">
                              <li className="flex items-center space-x-2">
                                <CheckCircle className="w-4 h-4 text-green-400" />
                                <span className="text-gray-300 text-sm">Multi-state coordination</span>
                              </li>
                              <li className="flex items-center space-x-2">
                                <CheckCircle className="w-4 h-4 text-green-400" />
                                <span className="text-gray-300 text-sm">Secure information sharing</span>
                              </li>
                              <li className="flex items-center space-x-2">
                                <CheckCircle className="w-4 h-4 text-green-400" />
                                <span className="text-gray-300 text-sm">Joint incident response</span>
                              </li>
                              <li className="flex items-center space-x-2">
                                <CheckCircle className="w-4 h-4 text-green-400" />
                                <span className="text-gray-300 text-sm">Emergency coordination</span>
                              </li>
                              <li className="flex items-center space-x-2">
                                <CheckCircle className="w-4 h-4 text-green-400" />
                                <span className="text-gray-300 text-sm">Advanced threat sharing</span>
                              </li>
                            </ul>
                            <Button 
                              className="button-4d w-full"
            onClick={() => { window.location.href = '/contact#top'; setTimeout(() => window.scrollTo(0, 0), 100); }}
                            >
                              Contact Government Sales
                            </Button>
                          </CardContent>
                        </Card>
                        <Card className="bg-slate-700/60 border border-yellow-500/30">
                          <CardHeader className="p-6 text-center">
                            <Crown className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                            <Badge className="mb-4 bg-yellow-500/20 text-yellow-300">Premium</Badge>
                            <CardTitle className="text-xl text-white mb-3">Smart City Security</CardTitle>
                            <div className="text-2xl font-bold text-yellow-400 mb-2">Smart City Security</div>
                            <p className="text-gray-300 text-sm">IoT and smart infrastructure protection</p>
                            <div className="mt-2">
                              <Badge className="bg-yellow-500/20 text-yellow-300">IoT Specialized</Badge>
                            </div>
                          </CardHeader>
                          <CardContent className="p-6 pt-0">
                            <ul className="space-y-2 mb-6">
                              <li className="flex items-center space-x-2">
                                <CheckCircle className="w-4 h-4 text-green-400" />
                                <span className="text-gray-300 text-sm">IoT device security</span>
                              </li>
                              <li className="flex items-center space-x-2">
                                <CheckCircle className="w-4 h-4 text-green-400" />
                                <span className="text-gray-300 text-sm">Traffic management protection</span>
                              </li>
                              <li className="flex items-center space-x-2">
                                <CheckCircle className="w-4 h-4 text-green-400" />
                                <span className="text-gray-300 text-sm">Utility grid monitoring</span>
                              </li>
                              <li className="flex items-center space-x-2">
                                <CheckCircle className="w-4 h-4 text-green-400" />
                                <span className="text-gray-300 text-sm">Public safety integration</span>
                              </li>
                              <li className="flex items-center space-x-2">
                                <CheckCircle className="w-4 h-4 text-green-400" />
                                <span className="text-gray-300 text-sm">Emergency services security</span>
                              </li>
                            </ul>
                            <Button 
                              className="button-4d w-full"
            onClick={() => { window.location.href = '/contact#top'; setTimeout(() => window.scrollTo(0, 0), 100); }}
                            >
                              Contact Enterprise
                            </Button>
                          </CardContent>
                        </Card>
                      </>
                    )}
                    
                    {selectedCategory === 'managed' && (
                      <>
                        <Card className="bg-slate-700/60 border border-purple-500/30 relative">
                          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                            <Badge className="bg-purple-600 text-white">Popular</Badge>
                          </div>
                          <CardHeader className="p-6 text-center">
                            <Network className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                            <Badge className="mb-4 bg-purple-500/20 text-purple-300">Advanced</Badge>
                            <CardTitle className="text-xl text-white mb-3">Advanced Security</CardTitle>
                            <div className="text-2xl font-bold text-purple-400 mb-2">Advanced Security</div>
                            <p className="text-gray-300 text-sm">Professional cybersecurity solution</p>
                            <div className="mt-2">
                              <Badge className="bg-purple-500/20 text-purple-300">1K Users Max</Badge>
                            </div>
                          </CardHeader>
                          <CardContent className="p-6 pt-0">
                            <ul className="space-y-2 mb-6">
                              <li className="flex items-center space-x-2">
                                <CheckCircle className="w-4 h-4 text-green-400" />
                                <span className="text-gray-300 text-sm">Up to 1000 users</span>
                              </li>
                              <li className="flex items-center space-x-2">
                                <CheckCircle className="w-4 h-4 text-green-400" />
                                <span className="text-gray-300 text-sm">Advanced AI threat detection</span>
                              </li>
                              <li className="flex items-center space-x-2">
                                <CheckCircle className="w-4 h-4 text-green-400" />
                                <span className="text-gray-300 text-sm">Automated incident response</span>
                              </li>
                              <li className="flex items-center space-x-2">
                                <CheckCircle className="w-4 h-4 text-green-400" />
                                <span className="text-gray-300 text-sm">Full compliance automation</span>
                              </li>
                              <li className="flex items-center space-x-2">
                                <CheckCircle className="w-4 h-4 text-green-400" />
                                <span className="text-gray-300 text-sm">24/7 priority support</span>
                              </li>
                            </ul>
                            <Button 
                              className="button-4d w-full"
            onClick={() => { window.location.href = '/contact#top'; setTimeout(() => window.scrollTo(0, 0), 100); }}
                            >
                              Get Quote
                            </Button>
                          </CardContent>
                        </Card>
                        
                        <Card className="bg-slate-700/60 border border-yellow-500/30">
                          <CardHeader className="p-6 text-center">
                            <Crown className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                            <Badge className="mb-4 bg-yellow-500/20 text-yellow-300">Premium</Badge>
                            <CardTitle className="text-xl text-white mb-3">Enterprise Shield</CardTitle>
                            <div className="text-2xl font-bold text-yellow-400 mb-2">Enterprise Shield</div>
                            <p className="text-gray-300 text-sm">Professional cybersecurity solution</p>
                            <div className="mt-2">
                              <Badge className="bg-yellow-500/20 text-yellow-300">Unlimited Scale</Badge>
                            </div>
                          </CardHeader>
                          <CardContent className="p-6 pt-0">
                            <ul className="space-y-2 mb-6">
                              <li className="flex items-center space-x-2">
                                <CheckCircle className="w-4 h-4 text-green-400" />
                                <span className="text-gray-300 text-sm">Unlimited users</span>
                              </li>
                              <li className="flex items-center space-x-2">
                                <CheckCircle className="w-4 h-4 text-green-400" />
                                <span className="text-gray-300 text-sm">Premium AI models</span>
                              </li>
                              <li className="flex items-center space-x-2">
                                <CheckCircle className="w-4 h-4 text-green-400" />
                                <span className="text-gray-300 text-sm">Custom response playbooks</span>
                              </li>
                              <li className="flex items-center space-x-2">
                                <CheckCircle className="w-4 h-4 text-green-400" />
                                <span className="text-gray-300 text-sm">White-glove compliance</span>
                              </li>
                              <li className="flex items-center space-x-2">
                                <CheckCircle className="w-4 h-4 text-green-400" />
                                <span className="text-gray-300 text-sm">Dedicated success team</span>
                              </li>
                            </ul>
                            <Button 
                              className="button-4d w-full"
            onClick={() => { window.location.href = '/contact#top'; setTimeout(() => window.scrollTo(0, 0), 100); }}
                            >
                              Contact Enterprise
                            </Button>
                          </CardContent>
                        </Card>
                      </>
                    )}
                  </div>
                </div>

                {/* Security Add-on Services */}
                <div>
                  <h3 className="text-3xl font-bold text-white mb-8 text-center">Security Add-on Services</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Card className="bg-slate-700/60 border border-cyan-500/30">
                      <CardContent className="p-6">
                        <div className="flex items-center mb-4">
                          <Server className="w-8 h-8 text-cyan-400 mr-3" />
                          <div>
                            <h4 className="text-white font-semibold">Secure Server Room Kit</h4>
                            <p className="text-cyan-400 font-bold">Contact for Pricing</p>
                          </div>
                        </div>
                        <p className="text-gray-300 text-sm">Complete secure server infrastructure setup</p>
                      </CardContent>
                    </Card>

                    <Card className="bg-slate-700/60 border border-green-500/30">
                      <CardContent className="p-6">
                        <div className="flex items-center mb-4">
                          <Shield className="w-8 h-8 text-green-400 mr-3" />
                          <div>
                            <h4 className="text-white font-semibold">Multi-Factor Authentication Hardware</h4>
                            <p className="text-green-400 font-bold">Contact for Pricing</p>
                          </div>
                        </div>
                        <p className="text-gray-300 text-sm">Hardware security keys and MFA infrastructure</p>
                      </CardContent>
                    </Card>

                    <Card className="bg-slate-700/60 border border-purple-500/30">
                      <CardContent className="p-6">
                        <div className="flex items-center mb-4">
                          <Network className="w-8 h-8 text-purple-400 mr-3" />
                          <div>
                            <h4 className="text-white font-semibold">Network Segmentation Bundle</h4>
                            <p className="text-purple-400 font-bold">Contact for Pricing</p>
                          </div>
                        </div>
                        <p className="text-gray-300 text-sm">Advanced network isolation and security</p>
                      </CardContent>
                    </Card>

                    <Card className="bg-slate-700/60 border border-red-500/30">
                      <CardContent className="p-6">
                        <div className="flex items-center mb-4">
                          <Database className="w-8 h-8 text-red-400 mr-3" />
                          <div>
                            <h4 className="text-white font-semibold">Disaster Recovery Infrastructure</h4>
                            <p className="text-red-400 font-bold">Contact for Pricing</p>
                          </div>
                        </div>
                        <p className="text-gray-300 text-sm">Complete backup and recovery solutions</p>
                      </CardContent>
                    </Card>

                    <Card className="bg-slate-700/60 border border-yellow-500/30">
                      <CardContent className="p-6">
                        <div className="flex items-center mb-4">
                          <Target className="w-8 h-8 text-yellow-400 mr-3" />
                          <div>
                            <h4 className="text-white font-semibold">Advanced Security Assessment</h4>
                            <p className="text-yellow-400 font-bold">Contact for Pricing</p>
                          </div>
                        </div>
                        <p className="text-gray-300 text-sm">Comprehensive security evaluation and recommendations</p>
                      </CardContent>
                    </Card>

                    <Card className="bg-slate-700/60 border border-orange-500/30">
                      <CardContent className="p-6">
                        <div className="flex items-center mb-4">
                          <Eye className="w-8 h-8 text-orange-400 mr-3" />
                          <div>
                            <h4 className="text-white font-semibold">Penetration Testing</h4>
                            <p className="text-orange-400 font-bold">Contact for Pricing</p>
                          </div>
                        </div>
                        <p className="text-gray-300 text-sm">Professional penetration testing services</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="professional" className="space-y-12">
                {/* Assessment and Planning Services */}
                <div>
                  <h3 className="text-3xl font-bold text-white mb-8 text-center">Assessment and Planning</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="bg-slate-700/60 border border-cyan-500/30">
                      <CardContent className="p-6 text-center">
                        <Target className="w-10 h-10 text-cyan-400 mx-auto mb-4" />
                        <h4 className="text-white font-semibold mb-2">Security Assessment</h4>
                        <p className="text-gray-300 text-sm mb-4">Comprehensive security evaluation</p>
                        <Button 
                          variant="outline" 
className="button-4d border-cyan-500 text-cyan-400"
                          onClick={() => { window.location.href = '/solutions'; setTimeout(() => window.scrollTo(0, 0), 100); }}
                        >
                          Learn More
                        </Button>
                      </CardContent>
                    </Card>
                    <Card className="bg-slate-700/60 border border-green-500/30">
                      <CardContent className="p-6 text-center">
                        <Server className="w-10 h-10 text-green-400 mx-auto mb-4" />
                        <h4 className="text-white font-semibold mb-2">IT Infrastructure Assessment</h4>
                        <p className="text-gray-300 text-sm mb-4">Complete infrastructure evaluation</p>
                        <Button 
                          variant="outline" 
                          className="button-4d border-green-500 text-green-400"
                          onClick={() => { window.location.href = '/solutions'; setTimeout(() => window.scrollTo(0, 0), 100); }}
                        >
                          Learn More
                        </Button>
                      </CardContent>
                    </Card>
                    <Card className="bg-slate-700/60 border border-purple-500/30">
                      <CardContent className="p-6 text-center">
                        <Shield className="w-10 h-10 text-purple-400 mx-auto mb-4" />
                        <h4 className="text-white font-semibold mb-2">Compliance Readiness Assessment</h4>
                        <p className="text-gray-300 text-sm mb-4">Regulatory compliance evaluation</p>
                        <Button 
                          variant="outline" 
                          className="button-4d border-purple-500 text-purple-400"
                          onClick={() => { window.location.href = '/solutions'; setTimeout(() => window.scrollTo(0, 0), 100); }}
                        >
                          Learn More
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Professional Services Categories */}
                <div className="space-y-16">
                  {professionalServices.map((category, index) => (
                    <div key={index}>
                      <div className="flex items-center space-x-4 mb-8">
                        {category.icon}
                        <h3 className="text-3xl font-bold text-white">{category.category}</h3>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {category.services.map((service, sIndex) => (
                          <Card key={sIndex} className="bg-slate-700/60 border border-cyan-500/30">
                            <CardHeader className="p-6">
                              <CardTitle className="text-xl text-white mb-3">{service.name}</CardTitle>
                              <p className="text-gray-300 text-sm mb-4">{service.description}</p>
                              
                              <div className="grid grid-cols-2 gap-4 mb-4">
                                <div>
                                  <div className="text-cyan-400 font-semibold mb-1 text-sm">Timeline</div>
                                  <div className="text-gray-300 text-sm">{service.timeline}</div>
                                </div>
                                <div>
                                  <div className="text-cyan-400 font-semibold mb-1 text-sm">Investment</div>
                                  <div className="text-gray-300 text-sm">{service.price}</div>
                                </div>
                              </div>
                            </CardHeader>
                            <CardContent className="p-6 pt-0">
                              <div className="mb-4">
                                <h4 className="text-white font-semibold mb-2 text-sm">Deliverables</h4>
                                <ul className="space-y-1">
                                  {service.deliverables.map((deliverable, dIndex) => (
                                    <li key={dIndex} className="flex items-center space-x-2">
                                      <CheckCircle className="w-3 h-3 text-green-400 flex-shrink-0" />
                                      <span className="text-gray-300 text-xs">{deliverable}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <Button variant="outline" className="w-full border-cyan-500 text-cyan-400 hover:bg-cyan-500/10">
                                Get Quote
                                <ArrowRight className="ml-2 w-3 h-3" />
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

        {/* Service Guarantees */}
        <section className="py-20 px-6 bg-slate-900">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
                Service Excellence<br />
                <span className="text-orange-400">Guaranteed</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <Card className="bg-slate-800/60 border border-green-500/30 text-center">
                <CardContent className="p-8">
                  <Clock className="w-12 h-12 text-green-400 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-green-400 mb-2">99.9%</div>
                  <div className="text-white font-semibold mb-2">Uptime SLA</div>
                  <div className="text-gray-400 text-sm">Enterprise-grade reliability</div>
                </CardContent>
              </Card>
              
              <Card className="bg-slate-800/60 border border-cyan-500/30 text-center">
                <CardContent className="p-8">
                  <CustomHeadphonesIcon className="w-12 h-12 text-cyan-400 mx-auto mb-4" size={48} />
                  <div className="text-3xl font-bold text-cyan-400 mb-2">24/7</div>
                  <div className="text-white font-semibold mb-2">Expert Support</div>
                  <div className="text-gray-400 text-sm">Always available assistance</div>
                </CardContent>
              </Card>
              
              <Card className="bg-slate-800/60 border border-purple-500/30 text-center">
                <CardContent className="p-8">
                  <Award className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-purple-400 mb-2">8min</div>
                  <div className="text-white font-semibold mb-2">Response Time</div>
                  <div className="text-gray-400 text-sm">Industry-leading MTTR</div>
                </CardContent>
              </Card>
              
              <Card className="bg-slate-800/60 border border-orange-500/30 text-center">
                <CardContent className="p-8">
                  <Star className="w-12 h-12 text-orange-400 mx-auto mb-4 fill-orange-400" />
                  <div className="text-3xl font-bold text-orange-400 mb-2">4.9/5</div>
                  <div className="text-white font-semibold mb-2">Satisfaction</div>
                  <div className="text-gray-400 text-sm">Customer rating</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Customer Success Story */}
        <section className="py-20 px-6 bg-slate-800">
          <div className="container mx-auto max-w-6xl">
            <Card className="bg-slate-700/60 border border-cyan-500/30 overflow-hidden">
              <CardContent className="p-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <div className="flex items-center space-x-1 mb-6">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                    <blockquote className="text-2xl font-bold text-white mb-8 leading-relaxed italic">
                      "With the CyberSecure AI SOC, we have some of the best minds in cybersecurity at our disposal. 
                      They help us validate incidents, handle them and also level up our own knowledge."
                    </blockquote>
                    <div className="text-gray-300">
                      <div className="font-semibold text-lg">Dr. Anthony Rodriguez</div>
                      <div className="text-cyan-400">Chief Information Security Officer</div>
                      <div className="text-gray-400">Major University System</div>
                    </div>
                  </div>
                  <div>
                    <img 
                      src={professionalImg}
                      alt="Customer Success"
                      className="w-full rounded-xl shadow-xl border border-cyan-500/20"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Support Tiers */}
        <section className="py-20 px-6 bg-slate-900">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-16">
              <Badge className="mb-6 bg-purple-500/20 text-purple-300 border-purple-500/30">
                Support Excellence
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
                World-Class<br />
                <span className="text-purple-400">Customer Success</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="bg-slate-800/60 border border-blue-500/30">
                <CardHeader className="p-8 text-center">
                  <Badge className="mb-4 bg-blue-500/20 text-blue-300">Standard</Badge>
                  <CardTitle className="text-2xl text-white mb-4">Business Support</CardTitle>
                  <div className="text-4xl font-bold text-blue-400 mb-2">Included</div>
                  <p className="text-gray-300">with all plans</p>
                </CardHeader>
                <CardContent className="p-8 pt-0">
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-gray-300">Email support</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-gray-300">Knowledge base access</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-gray-300">Community forums</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-gray-300">Business hours response</span>
                    </li>
                  </ul>
                  <Button 
                    variant="outline" 
                    className="button-4d w-full border-blue-500 text-blue-400"
                    onClick={() => window.location.href = '/contact'}
                  >
                    Get Started
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/60 border border-purple-500/30 relative">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-purple-600 text-white">Most Popular</Badge>
                </div>
                <CardHeader className="p-8 text-center">
                  <Badge className="mb-4 bg-purple-500/20 text-purple-300">Premium</Badge>
                  <CardTitle className="text-2xl text-white mb-4">Enterprise Support</CardTitle>
                  <div className="text-4xl font-bold text-purple-400 mb-2">Contact for Quote</div>
                  <p className="text-gray-300">per month</p>
                </CardHeader>
                <CardContent className="p-8 pt-0">
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-gray-300">24/7 priority support</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-gray-300">Dedicated success manager</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-gray-300">Phone & video support</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-gray-300">Custom training sessions</span>
                    </li>
                  </ul>
                  <Button 
                    className="button-4d w-full bg-purple-600 text-white"
                    onClick={() => window.location.href = '/contact'}
                  >
                    Contact Sales
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/60 border border-yellow-500/30">
                <CardHeader className="p-8 text-center">
                  <Badge className="mb-4 bg-yellow-500/20 text-yellow-300">Elite</Badge>
                  <CardTitle className="text-2xl text-white mb-4">White Glove Support</CardTitle>
                  <div className="text-4xl font-bold text-yellow-400 mb-2">Custom</div>
                  <p className="text-gray-300">pricing</p>
                </CardHeader>
                <CardContent className="p-8 pt-0">
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-gray-300">Dedicated technical team</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-gray-300">On-site consulting</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-gray-300">Custom integrations</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-gray-300">Executive briefings</span>
                    </li>
                  </ul>
                  <Button 
                    variant="outline" 
                    className="button-4d w-full border-yellow-500 text-yellow-400"
                    onClick={() => window.location.href = '/contact'}
                  >
                    Contact Enterprise
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 px-6 bg-gradient-to-b from-slate-900 to-slate-800">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              Ready to Get<br />
              <span className="text-orange-400">Expert Protection?</span>
            </h2>
            <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
              Talk to our cybersecurity experts and discover how our services 
              can strengthen your organization's security posture.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/contact">
                <Button 
                  size="lg" 
                  className="button-4d bg-orange-600 text-white px-10 py-4 text-lg"
onClick={() => { window.location.href = '/contact#top'; setTimeout(() => window.scrollTo(0, 0), 100); }}
                >
                  Schedule Consultation
                  <Phone className="ml-2 w-6 h-6" />
                </Button>
              </Link>
              <Link href="/pricing">
                <Button size="lg" variant="outline" className="border-orange-500 text-orange-400 hover:bg-orange-500/10 px-10 py-4 text-lg">
                  View All Pricing
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