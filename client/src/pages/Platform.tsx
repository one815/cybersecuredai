import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Shield, 
  Brain, 
  Network, 
  Users, 
  ArrowRight,
  CheckCircle,
  Eye,
  Lock,
  Server,
  Star,
  ExternalLink,
  Target,
  Globe,
  Activity,
  Building
} from "lucide-react";
import {
  CustomShieldIcon,
  CustomBrainIcon,
  Enhanced4DNetworkIcon,
  Enhanced4DBrainIcon,
  CustomTargetIcon,
  CustomEyeIcon,
  CustomZapIcon,
  CustomDatabaseIcon,
  CustomFileTextIcon,
  Enhanced4DShieldIcon,
  Enhanced4DLockIcon,
  Enhanced4DTargetIcon,
  Enhanced4DEyeIcon,
  Enhanced4DBotIcon,
  Enhanced4DZapIcon,
  Enhanced4DActivityIcon,
  Enhanced4DFileIcon,
  Enhanced4DGlobeIcon,
  Enhanced4DServerIcon
} from "@/components/CustomIcons";
import { MarketingLayout } from "@/components/MarketingLayout";
import { Link, useLocation } from "wouter";

// Authority platform images
import platformOverviewImg from "@assets/generated_images/Platform_Overview_Datasheet_3d239cec.png";
import aiThreatImg from "@assets/generated_images/AI_Threat_Detection_Engine_58460592.png";
import complianceImg from "@assets/generated_images/Compliance_Dashboard_Demo_bbe28daf.png";
import networkSecurityImg from "@assets/generated_images/Network_Security_Demo_f519b96f.png";
import incidentResponseImg from "@assets/generated_images/Automated_Incident_Response_9b65f496.png";
import socDashboardImg from "@assets/generated_images/SOC_Dashboard_Management_23c1af0b.png";

export default function Platform() {
  const [, setLocation] = useLocation();
  const coreAIEngines = [
    {
      title: "Advanced AI-Driven Threat Hunting",
      description: "Next-generation threat detection with 99.7% accuracy",
      icon: <Enhanced4DBrainIcon className="w-8 h-8 text-red-400" size={32} />,
      color: "border-red-500/30",
      features: [
        "Real-time behavioral analytics",
        "Neural network threat modeling",
        "Predictive threat intelligence",
        "8-minute mean response time"
      ],
      image: aiThreatImg,
      status: "Fully Operational"
    },
    {
      title: "AI-Enhanced Predictive Risk Analysis",
      description: "Machine learning risk assessment and vulnerability prediction",
      icon: <Enhanced4DTargetIcon className="w-8 h-8 text-cyan-400" size={32} />,
      color: "border-cyan-500/30",
      features: [
        "Continuous asset discovery",
        "Vulnerability prioritization",
        "Risk scoring algorithms",
        "Executive dashboards"
      ],
      image: platformOverviewImg,
      status: "Integrated & Active"
    },
    {
      title: "AI-Based User Behavior Analytics",
      description: "Advanced insider threat detection and user monitoring",
      icon: <Enhanced4DEyeIcon className="w-8 h-8 text-purple-400" size={32} />,
      color: "border-purple-500/30",
      features: [
        "Real-time user monitoring",
        "Anomaly detection",
        "Insider threat identification",
        "Behavioral baseline analysis"
      ],
      image: socDashboardImg,
      status: "Real-time Monitoring"
    },
    {
      title: "Interactive 5D Security Visualization",
      description: "Immersive security data visualization and threat exploration",
      icon: <Enhanced4DGlobeIcon className="w-8 h-8 text-green-400" size={32} />,
      color: "border-green-500/30",
      features: [
        "5D threat visualization",
        "Interactive security dashboards",
        "Real-time threat mapping",
        "Executive-level insights"
      ],
      image: networkSecurityImg,
      status: "Deployed"
    },
    {
      title: "Cloud Integration Engine",
      description: "Multi-provider cloud security with FedRAMP compliance",
      icon: <Enhanced4DServerIcon className="w-8 h-8 text-blue-400" size={32} />,
      color: "border-blue-500/30",
      features: [
        "Multi-cloud monitoring",
        "FedRAMP High compliance",
        "AWS/Azure/GCP integration",
        "Kubernetes security"
      ],
      image: complianceImg,
      status: "Multi-Provider Support"
    },
    {
      title: "AI-Based Compliance Automation",
      description: "Automated regulatory compliance with continuous monitoring",
      icon: <Enhanced4DFileIcon className="w-8 h-8 text-yellow-400" size={32} />,
      color: "border-yellow-500/30",
      features: [
        "FERPA/FISMA/CIPA automation", 
        "Automated audit reports",
        "Policy enforcement",
        "Risk assessment dashboards"
      ],
      image: complianceImg,
      status: "Regulatory Ready"
    },
    {
      title: "Multi-State Security Coalition Platform",
      description: "Inter-agency cybersecurity coordination and threat sharing",
      icon: <Enhanced4DNetworkIcon className="w-8 h-8 text-orange-400" size={32} />,
      color: "border-orange-500/30",
      features: [
        "Inter-state threat sharing",
        "NIEM-compliant protocols",
        "Multi-jurisdictional response",
        "Emergency coordination"
      ],
      image: incidentResponseImg,
      status: "Government Ready"
    },
    {
      title: "Smart City Security Suite",
      description: "Critical infrastructure protection for smart cities",
      icon: <Building className="w-8 h-8 text-pink-400" />,
      color: "border-pink-500/30",
      features: [
        "Traffic system security",
        "Utility grid monitoring",
        "Emergency services integration",
        "SCADA protection"
      ],
      image: platformOverviewImg,
      status: "Infrastructure Monitoring"
    }
  ];

  return (
    <MarketingLayout>
      <div className="min-h-screen bg-slate-900">
        
        {/* Bold Hero - Huntress Style */}
        <section className="relative py-24 px-6 bg-gradient-to-br from-slate-900 via-red-900/20 to-slate-900">
          <div className="absolute inset-0 bg-grid-white/[0.02]"></div>
          <div className="container mx-auto max-w-7xl relative z-10">
            <div className="text-center mb-20">
              <Badge className="mb-8 bg-red-500/20 text-red-300 border-red-500/30 text-lg px-6 py-3">
                The Complete Security Platform
              </Badge>
              <h1 className="text-6xl md:text-8xl font-bold text-white mb-8 leading-tight">
                Threats Eliminated.<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-500">
                  Organizations Secured.
                </span>
              </h1>
              <p className="text-2xl md:text-3xl text-gray-300 mb-12 max-w-5xl mx-auto leading-relaxed">
                Purpose-built cybersecurity platform for educational institutions and government agencies, 
                all backed by our industry-proven, 24/7 AI-assisted SOC.
              </p>
              
              <div className="flex items-center justify-center space-x-2 mb-8">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                ))}
                <span className="ml-4 text-white font-semibold text-lg">4.9/5 from 500+ organizations</span>
              </div>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link href="/demo">
                  <Button 
                    size="lg" 
                    className="button-4d px-10 py-4 text-lg font-semibold"
                    onClick={() => setLocation('/platform-demo')}
                  >
                    Watch Platform Demo
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link href="/trials">
                  <Button 
                    size="lg" 
                    className="button-4d px-10 py-4 text-lg font-semibold"
                    onClick={() => setLocation('/trials')}
                  >
                    Try Free for 30 Days
                  </Button>
                </Link>
              </div>
            </div>

            {/* Platform Overview Visual */}
            <div className="max-w-5xl mx-auto">
              <img 
                src={platformOverviewImg}
                alt="CyberSecure AI Platform Overview"
                className="w-full rounded-2xl shadow-2xl border border-red-500/30"
              />
            </div>
          </div>
        </section>

        {/* Platform Capabilities Grid */}
        <section className="py-20 px-6 bg-slate-800">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-16">
              <Badge className="mb-6 bg-green-500/20 text-green-300 border-green-500/30">
                Eight Core AI Engines - All Operational
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
                Enterprise AI Security<br />
                <span className="text-cyan-400">Platform</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-4xl mx-auto">
                Eight integrated AI engines working together to provide 
                comprehensive protection for government and educational organizations.
              </p>
              <div className="mt-8">
                <Badge className="bg-green-500/20 text-green-300 text-lg px-6 py-2">
                  ✅ All Systems Operational
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {coreAIEngines.map((engine, index) => (
                <Card key={index} className={`bg-slate-700/60 border ${engine.color} hover:border-opacity-60 transition-all duration-300 group cursor-pointer`}>
                  <CardHeader className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      {engine.icon}
                      <Badge className="bg-green-500/20 text-green-300 text-xs">
                        ✅ {engine.status}
                      </Badge>
                    </div>
                    <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors mb-3">
                      {engine.title}
                    </h3>
                    <p className="text-gray-300 text-sm mb-4">
                      {engine.description}
                    </p>
                  </CardHeader>
                  <CardContent className="p-6 pt-0">
                    <ul className="space-y-1 mb-4">
                      {engine.features.slice(0, 3).map((feature, fIndex) => (
                        <li key={fIndex} className="flex items-center space-x-2">
                          <CheckCircle className="w-3 h-3 text-green-400" />
                          <span className="text-gray-300 text-xs">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button 
                      className="button-4d w-full"
                      onClick={() => setLocation('/solutions/threat-intelligence')}
                    >
                      Learn More
                      <ArrowRight className="ml-2 w-3 h-3" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Platform Integration */}
        <section className="py-20 px-6 bg-slate-900">
          <div className="container mx-auto max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <Badge className="mb-6 bg-blue-500/20 text-blue-300 border-blue-500/30">
                  Seamless Integration
                </Badge>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
                  Integrates with Your<br />
                  <span className="text-blue-400">Existing Infrastructure</span>
                </h2>
                <p className="text-xl text-gray-300 mb-8">
                  Our platform seamlessly integrates with your current systems, 
                  providing immediate protection without disrupting operations.
                </p>
                
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-cyan-400 mb-2">300+</div>
                    <div className="text-gray-300">Integrations</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-400 mb-2">15min</div>
                    <div className="text-gray-300">Setup Time</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-400 mb-2">99.9%</div>
                    <div className="text-gray-300">Uptime SLA</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-400 mb-2">24/7</div>
                    <div className="text-gray-300">Support</div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/integrations">
                    <Button 
                      size="lg" 
                      className="button-4d px-8 py-4"
                      onClick={() => setLocation('/integrations')}
                    >
                      View Integrations
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button 
                      size="lg" 
                      className="button-4d px-8 py-4"
                      onClick={() => { setLocation('/contact'); setTimeout(() => window.scrollTo(0, 0), 100); }}
                    >
                      Talk to an Expert
                      <ExternalLink className="ml-2 w-5 h-5" />
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="relative">
                <img 
                  src={socDashboardImg}
                  alt="Platform Integration Dashboard"
                  className="w-full rounded-xl shadow-2xl border border-blue-500/20"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-500/10 to-transparent rounded-xl"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Customer Success Metrics */}
        <section className="py-20 px-6 bg-slate-800">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
                Empowering Educational<br />
                <span className="text-cyan-400">& Government Organizations</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-4xl mx-auto mb-16">
                CyberSecure AI is purpose-built for your sector. But don't take our word for it – 
                see the results from organizations like yours.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
              <Card className="bg-slate-700/60 border border-cyan-500/30 text-center">
                <CardContent className="p-8">
                  <div className="text-4xl md:text-5xl font-bold text-cyan-400 mb-4">500K+</div>
                  <div className="text-white font-semibold mb-2">Students Protected</div>
                  <div className="text-gray-400">Educational institutions secured</div>
                </CardContent>
              </Card>
              
              <Card className="bg-slate-700/60 border border-green-500/30 text-center">
                <CardContent className="p-8">
                  <div className="text-4xl md:text-5xl font-bold text-green-400 mb-4">2M+</div>
                  <div className="text-white font-semibold mb-2">Endpoints Managed</div>
                  <div className="text-gray-400">Devices under protection</div>
                </CardContent>
              </Card>
              
              <Card className="bg-slate-700/60 border border-purple-500/30 text-center">
                <CardContent className="p-8">
                  <div className="text-4xl md:text-5xl font-bold text-purple-400 mb-4">1.2M+</div>
                  <div className="text-white font-semibold mb-2">Identities Protected</div>
                  <div className="text-gray-400">User accounts secured</div>
                </CardContent>
              </Card>
              
              <Card className="bg-slate-700/60 border border-orange-500/30 text-center">
                <CardContent className="p-8">
                  <div className="text-4xl md:text-5xl font-bold text-orange-400 mb-4">8min</div>
                  <div className="text-white font-semibold mb-2">Response Time</div>
                  <div className="text-gray-400">Average threat containment</div>
                </CardContent>
              </Card>
            </div>

            <div className="text-center">
              <Link href="/case-studies">
                <Button 
                  size="lg" 
                  className="button-4d px-8 py-4"
                  onClick={() => setLocation('/client-stories')}
                >
                  Learn More About Our Success
                  <ExternalLink className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Platform Architecture */}
        <section className="py-20 px-6 bg-slate-900">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-16">
              <Badge className="mb-6 bg-purple-500/20 text-purple-300 border-purple-500/30">
                Platform Architecture
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
                Built for Scale,<br />
                <span className="text-purple-400">Designed for Security</span>
              </h2>
            </div>

            <Tabs defaultValue="security" className="max-w-6xl mx-auto">
              <TabsList className="grid w-full grid-cols-3 mb-12 bg-slate-700">
                <TabsTrigger value="security" className="data-[state=active]:bg-red-600 text-lg py-4">
                  <Enhanced4DShieldIcon className="w-6 h-6 mr-2" size={24} />
                  Security Core
                </TabsTrigger>
                <TabsTrigger value="intelligence" className="data-[state=active]:bg-cyan-600 text-lg py-4">
                  <Enhanced4DBrainIcon className="w-6 h-6 mr-2" size={24} />
                  AI Intelligence
                </TabsTrigger>
                <TabsTrigger value="compliance" className="data-[state=active]:bg-green-600 text-lg py-4">
                  <CustomFileTextIcon className="w-6 h-6 mr-2" size={24} />
                  Compliance
                </TabsTrigger>
              </TabsList>

              <TabsContent value="security" className="space-y-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                  <div>
                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
                      Enterprise-Grade<br />
                      <span className="text-red-400">Security Foundation</span>
                    </h3>
                    <p className="text-lg text-gray-300 mb-8">
                      Military-grade encryption, zero-trust architecture, and continuous 
                      monitoring provide the security foundation your organization needs.
                    </p>
                    
                    <div className="space-y-4 mb-8">
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-400" />
                        <span className="text-gray-300">AES-256 encryption at rest and in transit</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-400" />
                        <span className="text-gray-300">Zero-trust network architecture</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-400" />
                        <span className="text-gray-300">SOC 2 Type II certified infrastructure</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-400" />
                        <span className="text-gray-300">24/7 security monitoring and response</span>
                      </div>
                    </div>

                    <Button 
                      size="lg" 
                      className="button-4d px-8 py-4"
                      onClick={() => setLocation('/solutions/threat-intelligence')}
                    >
                      Explore Security Features
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </div>
                  <div>
                    <img 
                      src={networkSecurityImg}
                      alt="Security Architecture"
                      className="w-full rounded-xl shadow-2xl border border-red-500/20"
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="intelligence" className="space-y-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                  <div>
                    <img 
                      src={aiThreatImg}
                      alt="AI Intelligence Engine"
                      className="w-full rounded-xl shadow-2xl border border-cyan-500/20"
                    />
                  </div>
                  <div>
                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
                      Advanced AI<br />
                      <span className="text-cyan-400">Threat Intelligence</span>
                    </h3>
                    <p className="text-lg text-gray-300 mb-8">
                      Our proprietary AI models analyze billions of security events daily, 
                      providing predictive threat detection with industry-leading accuracy.
                    </p>
                    
                    <div className="space-y-4 mb-8">
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-400" />
                        <span className="text-gray-300">99.7% threat detection accuracy</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-400" />
                        <span className="text-gray-300">73% reduction in false positives</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-400" />
                        <span className="text-gray-300">Real-time behavioral analytics</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-400" />
                        <span className="text-gray-300">Predictive vulnerability assessment</span>
                      </div>
                    </div>

                    <Button 
                      size="lg" 
                      className="button-4d px-8 py-4"
                      onClick={() => setLocation('/solutions/ai-security')}
                    >
                      Explore AI Features
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="compliance" className="space-y-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                  <div>
                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
                      Automated<br />
                      <span className="text-green-400">Compliance Management</span>
                    </h3>
                    <p className="text-lg text-gray-300 mb-8">
                      Built specifically for educational and government compliance requirements, 
                      with automated reporting and continuous monitoring capabilities.
                    </p>
                    
                    <div className="space-y-4 mb-8">
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-400" />
                        <span className="text-gray-300">FERPA, FISMA, CIPA certified</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-400" />
                        <span className="text-gray-300">FedRAMP High authorization</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-400" />
                        <span className="text-gray-300">Automated audit reporting</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-400" />
                        <span className="text-gray-300">85% reduction in compliance overhead</span>
                      </div>
                    </div>

                    <Button 
                      size="lg" 
                      className="button-4d px-8 py-4"
                      onClick={() => setLocation('/solutions/compliance')}
                    >
                      Explore Compliance Features
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </div>
                  <div>
                    <img 
                      src={complianceImg}
                      alt="Compliance Dashboard"
                      className="w-full rounded-xl shadow-2xl border border-green-500/20"
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Customer Testimonial */}
        <section className="py-20 px-6 bg-slate-800">
          <div className="container mx-auto max-w-6xl">
            <Card className="bg-slate-700/60 border border-cyan-500/30 overflow-hidden">
              <CardContent className="p-12">
                <div className="text-center mb-8">
                  <div className="flex items-center justify-center space-x-1 mb-6">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <blockquote className="text-2xl md:text-3xl font-bold text-white mb-8 leading-relaxed italic">
                    "We pushed CyberSecure AI out to four different campuses. What we found was that one site was clean, 
                    two sites had remnants, and one site had an active threat. That was eye-opening to us, 
                    and we knew we needed to install this for every one of our institutions."
                  </blockquote>
                  <div className="text-gray-300">
                    <div className="font-semibold text-lg">Dr. Michael Thompson</div>
                    <div className="text-cyan-400">Chief Information Security Officer</div>
                    <div className="text-gray-400">Major University System</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 px-6 bg-gradient-to-b from-slate-900 to-slate-800">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              Ready to Experience<br />
              <span className="text-cyan-400">Enterprise Security?</span>
            </h2>
            <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
              Join hundreds of educational institutions and government agencies 
              who trust our platform for complete cybersecurity protection.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/demo">
                <Button 
                  size="lg" 
                  className="button-4d px-10 py-4 text-lg"
                  onClick={() => { setLocation('/contact'); setTimeout(() => window.scrollTo(0, 0), 100); }}
                >
                  Schedule Platform Demo
                </Button>
              </Link>
              <Link href="/trials">
                <Button 
                  size="lg" 
                  className="button-4d px-10 py-4 text-lg"
                  onClick={() => setLocation('/trials')}
                >
                  Start Free Trial
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