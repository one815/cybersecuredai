import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// All icons now use Enhanced 4D versions with glass morphism effects
import {
  CustomShieldIcon,
  CustomBrainIcon,
  CustomHeadphonesIcon,
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
  Enhanced4DServerIcon,
  Enhanced4DCheckCircleIcon,
  Enhanced4DUsersIcon,
  Enhanced4DArrowRightIcon,
  Enhanced4DExternalLinkIcon,
  Enhanced4DBuildingIcon,
  Enhanced4DStarIcon
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
  
  // Cypher AI Dual Intelligence Models
  const cypherAIModels = [
    {
      title: "Cypher AI Genetic Model",
      description: "Self-evolving AI with genetic algorithms and multi-generational learning",
      icon: <Enhanced4DBrainIcon className="w-10 h-10 text-purple-400" size={40} />,
      color: "border-purple-500/50",
      gradient: "from-purple-900/50 to-slate-800/50",
      features: [
        "Genetic Algorithm Engine with PyTorch & DEAP",
        "Multi-Generational Learning & Knowledge Inheritance",
        "Autonomous Policy Generation (99.2% accuracy)",
        "Adaptive Neural Architecture Search (NAS)",
        "Federated Genetic Learning across environments",
        "Sector-specific adaptation (FERPA/FISMA genetics)"
      ],
      metrics: [
        { label: "False Positive Reduction", value: "-78%", color: "text-purple-400" },
        { label: "Threat Response Speed", value: "+65%", color: "text-purple-400" },
        { label: "Security Gap Reduction", value: "-82%", color: "text-purple-400" },
        { label: "Autonomous Accuracy", value: "99.2%", color: "text-purple-400" }
      ],
      technology: "TensorFlow 2.x, PyTorch, Neural Architecture Search, Custom Genetic Operators"
    },
    {
      title: "Cypher AI Assistant",
      description: "Internal operations AI for meeting intelligence and workflow automation",
      icon: <Enhanced4DBotIcon className="w-10 h-10 text-cyan-400" size={40} />,
      color: "border-cyan-500/50", 
      gradient: "from-cyan-900/50 to-slate-800/50",
      features: [
        "Multi-Platform Meeting Intelligence (Teams, Zoom, Google Meet)",
        "95% Transcription Accuracy with Speaker Recognition",
        "Smart Calendar Management & Conflict Resolution",
        "Automated Email Processing & Lead Qualification",
        "Social Platform Management (LinkedIn, Twitter, GitHub)",
        "24/7 Website Chat Support with Technical Q&A"
      ],
      metrics: [
        { label: "Meeting Prep Time", value: "-70%", color: "text-cyan-400" },
        { label: "Team Productivity", value: "+45%", color: "text-cyan-400" },
        { label: "Client Response Time", value: "+60%", color: "text-cyan-400" },
        { label: "Transcription Accuracy", value: "95%", color: "text-cyan-400" }
      ],
      technology: "Chrome Extensions, Teams Bot API, Twilio API, SendGrid Integration, Real-time WebSockets"
    }
  ];

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
      title: "Advanced Threat Intelligence Processing",
      description: "Multi-source threat intelligence with real-time analysis",
      icon: <Enhanced4DBrainIcon className="w-8 h-8 text-spring-400" size={32} />,
      color: "border-spring-500/30",
      features: [
        "VirusTotal & IBM X-Force integration",
        "PyMISP & CIRCL threat feeds",
        "Real-time threat correlation",
        "Sub-20ms intelligence processing"
      ],
      image: socDashboardImg,
      status: "Multi-Source Active"
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
      icon: <Enhanced4DBuildingIcon className="w-8 h-8 text-pink-400" size={32} />,
      color: "border-pink-500/30",
      features: [
        "Traffic system security",
        "Utility grid monitoring",
        "Emergency services integration",
        "SCADA protection"
      ],
      image: platformOverviewImg,
      status: "Infrastructure Monitoring"
    },
    {
      title: "IT Management & Infrastructure",
      description: "Complete system administration and infrastructure oversight",
      icon: <Enhanced4DServerIcon className="w-8 h-8 text-emerald-400" size={32} />,
      color: "border-emerald-500/30",
      features: [
        "Workstation management & monitoring",
        "Server health analytics",
        "Automated patch deployment",
        "System performance optimization"
      ],
      image: socDashboardImg,
      status: "System Management Active"
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
                Cypher AI Dual Intelligence Platform
              </Badge>
              <h1 className="text-6xl md:text-8xl font-bold text-white mb-8 leading-tight">
                Threats Eliminated.<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-500">
                  Organizations Secured.
                </span>
              </h1>
              <p className="text-2xl md:text-3xl text-gray-300 mb-12 max-w-5xl mx-auto leading-relaxed">
                Purpose-built cybersecurity platform with advanced AI engines, 
                real-time threat intelligence, and automated compliance management for educational institutions and government agencies.
              </p>
              
              <div className="flex items-center justify-center space-x-2 mb-8">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Enhanced4DStarIcon key={star} className="w-6 h-6 text-yellow-400 fill-yellow-400" size={24} />
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
                    <Enhanced4DArrowRightIcon className="ml-2 w-5 h-5" size={20} />
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
                alt="CyberSecured AI Platform Overview"
                className="w-full rounded-2xl shadow-2xl border border-red-500/30"
              />
            </div>
          </div>
        </section>

        {/* Cypher AI Dual Intelligence Models */}
        <section className="py-20 px-6 bg-gradient-to-b from-slate-900 to-slate-800">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-16">
              <Badge className="mb-6 bg-purple-500/20 text-purple-300 border-purple-500/30">
                🧬 Revolutionary AI Architecture
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
                Cypher AI Dual Intelligence<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Models</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-4xl mx-auto mb-12">
                Revolutionary dual AI architecture featuring self-evolving genetic algorithms and advanced internal operations automation. 
                The first platform to combine genetic learning with comprehensive workflow intelligence.
              </p>
            </div>

            {/* Cypher AI Models Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
              {cypherAIModels.map((model, index) => (
                <Card key={index} className={`bg-gradient-to-br ${model.gradient} border-2 ${model.color} hover:scale-105 transition-all duration-500`}>
                  <CardContent className="p-8">
                    <div className="flex items-center mb-6">
                      <div className="w-16 h-16 bg-white/10 rounded-xl flex items-center justify-center mr-6">
                        {model.icon}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white">{model.title}</h3>
                        <p className="text-gray-300 text-sm">{model.description}</p>
                      </div>
                    </div>

                    {/* Features List */}
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold text-white mb-4">Core Capabilities</h4>
                      <ul className="space-y-2">
                        {model.features.map((feature, fIndex) => (
                          <li key={fIndex} className="flex items-start">
                            <span className="w-2 h-2 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            <span className="text-gray-300 text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Performance Metrics */}
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold text-white mb-4">Performance Metrics</h4>
                      <div className="grid grid-cols-2 gap-4">
                        {model.metrics.map((metric, mIndex) => (
                          <div key={mIndex} className="text-center p-3 bg-white/5 rounded-lg border border-white/10">
                            <div className={`text-xl font-bold ${metric.color} mb-1`}>{metric.value}</div>
                            <div className="text-xs text-gray-400">{metric.label}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Technology Stack */}
                    <div>
                      <h4 className="text-sm font-semibold text-gray-400 mb-2">Technology Stack</h4>
                      <p className="text-xs text-gray-500">{model.technology}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Architecture Overview */}
            <div className="mt-16 p-8 bg-gradient-to-r from-slate-900/80 to-slate-800/80 rounded-xl border border-cyan-500/30">
              <h3 className="text-2xl font-bold text-white mb-6 text-center">Integrated AI Architecture</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Enhanced4DBrainIcon className="w-8 h-8 text-purple-400" size={32} />
                  </div>
                  <h4 className="text-lg font-bold text-purple-400 mb-2">Genetic Evolution</h4>
                  <p className="text-sm text-gray-300">Self-evolving algorithms that improve through genetic programming and multi-generational learning</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-cyan-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Enhanced4DBotIcon className="w-8 h-8 text-cyan-400" size={32} />
                  </div>
                  <h4 className="text-lg font-bold text-cyan-400 mb-2">Operations Intelligence</h4>
                  <p className="text-sm text-gray-300">Advanced workflow automation with meeting intelligence and communication management</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Enhanced4DNetworkIcon className="w-8 h-8 text-green-400" size={32} />
                  </div>
                  <h4 className="text-lg font-bold text-green-400 mb-2">Unified Platform</h4>
                  <p className="text-sm text-gray-300">Seamless integration across all security modules with cross-platform learning capabilities</p>
                </div>
              </div>
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
                          <Enhanced4DCheckCircleIcon className="w-3 h-3 text-green-400" size={12} />
                          <span className="text-gray-300 text-xs">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button 
                      className="button-4d w-full"
                      onClick={() => setLocation('/solutions/threat-intelligence')}
                    >
                      Learn More
                      <Enhanced4DArrowRightIcon className="ml-2 w-3 h-3" size={12} />
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
                      <Enhanced4DExternalLinkIcon className="ml-2 w-5 h-5" size={20} />
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

        {/* Platform Value Proposition */}
        <section className="py-20 px-6 bg-slate-900">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-16">
              <Badge className="mb-6 bg-orange-500/20 text-orange-300 border-orange-500/30">
                Platform Benefits
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
                Why Organizations Choose<br />
                <span className="text-orange-400">CyberSecured AI</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-4xl mx-auto mb-16">
                Beyond advanced technology, we deliver measurable business outcomes that transform
                your security posture and operational efficiency.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {/* Cost Reduction */}
              <Card className="bg-slate-700/60 border border-green-500/30 hover:border-green-400/50 transition-all duration-300">
                <CardHeader className="p-8 text-center">
                  <div className="w-16 h-16 bg-green-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Enhanced4DTrendingUpIcon className="w-8 h-8 text-green-400" size={32} />
                  </div>
                  <CardTitle className="text-xl text-white mb-4">Reduce Security Costs</CardTitle>
                </CardHeader>
                <CardContent className="p-8 pt-0">
                  <div className="text-center mb-6">
                    <div className="text-3xl font-bold text-green-400 mb-2">67%</div>
                    <div className="text-gray-300">Average cost reduction</div>
                  </div>
                  <div className="space-y-3 text-sm text-gray-300">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span>Replace multiple point solutions</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span>Reduce staffing requirements</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span>Automate manual processes</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Response Time */}
              <Card className="bg-slate-700/60 border border-cyan-500/30 hover:border-cyan-400/50 transition-all duration-300">
                <CardHeader className="p-8 text-center">
                  <div className="w-16 h-16 bg-cyan-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Enhanced4DZapIcon className="w-8 h-8 text-cyan-400" size={32} />
                  </div>
                  <CardTitle className="text-xl text-white mb-4">Faster Response Times</CardTitle>
                </CardHeader>
                <CardContent className="p-8 pt-0">
                  <div className="text-center mb-6">
                    <div className="text-3xl font-bold text-cyan-400 mb-2">8min</div>
                    <div className="text-gray-300">Average containment time</div>
                  </div>
                  <div className="space-y-3 text-sm text-gray-300">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                      <span>Automated threat response</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                      <span>AI-powered decision making</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                      <span>Real-time alerting</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Compliance Confidence */}
              <Card className="bg-slate-700/60 border border-purple-500/30 hover:border-purple-400/50 transition-all duration-300">
                <CardHeader className="p-8 text-center">
                  <div className="w-16 h-16 bg-purple-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Enhanced4DCheckCircleIcon className="w-8 h-8 text-purple-400" size={32} />
                  </div>
                  <CardTitle className="text-xl text-white mb-4">Compliance Confidence</CardTitle>
                </CardHeader>
                <CardContent className="p-8 pt-0">
                  <div className="text-center mb-6">
                    <div className="text-3xl font-bold text-purple-400 mb-2">96%</div>
                    <div className="text-gray-300">Compliance score average</div>
                  </div>
                  <div className="space-y-3 text-sm text-gray-300">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                      <span>Automated reporting</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                      <span>Continuous monitoring</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                      <span>Audit-ready documentation</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Threat Detection */}
              <Card className="bg-slate-700/60 border border-red-500/30 hover:border-red-400/50 transition-all duration-300">
                <CardHeader className="p-8 text-center">
                  <div className="w-16 h-16 bg-red-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Enhanced4DTargetIcon className="w-8 h-8 text-red-400" size={32} />
                  </div>
                  <CardTitle className="text-xl text-white mb-4">Superior Detection</CardTitle>
                </CardHeader>
                <CardContent className="p-8 pt-0">
                  <div className="text-center mb-6">
                    <div className="text-3xl font-bold text-red-400 mb-2">99.7%</div>
                    <div className="text-gray-300">Threat detection accuracy</div>
                  </div>
                  <div className="space-y-3 text-sm text-gray-300">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                      <span>AI-powered analysis</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                      <span>Behavioral monitoring</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                      <span>Predictive intelligence</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* User Experience */}
              <Card className="bg-slate-700/60 border border-blue-500/30 hover:border-blue-400/50 transition-all duration-300">
                <CardHeader className="p-8 text-center">
                  <div className="w-16 h-16 bg-blue-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Enhanced4DUsersIcon className="w-8 h-8 text-blue-400" size={32} />
                  </div>
                  <CardTitle className="text-xl text-white mb-4">Enhanced Productivity</CardTitle>
                </CardHeader>
                <CardContent className="p-8 pt-0">
                  <div className="text-center mb-6">
                    <div className="text-3xl font-bold text-blue-400 mb-2">78%</div>
                    <div className="text-gray-300">Less false positives</div>
                  </div>
                  <div className="space-y-3 text-sm text-gray-300">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      <span>Reduced alert fatigue</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      <span>Intuitive dashboard</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      <span>Streamlined workflows</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Scalability */}
              <Card className="bg-slate-700/60 border border-yellow-500/30 hover:border-yellow-400/50 transition-all duration-300">
                <CardHeader className="p-8 text-center">
                  <div className="w-16 h-16 bg-yellow-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Enhanced4DGlobeIcon className="w-8 h-8 text-yellow-400" size={32} />
                  </div>
                  <CardTitle className="text-xl text-white mb-4">Effortless Scaling</CardTitle>
                </CardHeader>
                <CardContent className="p-8 pt-0">
                  <div className="text-center mb-6">
                    <div className="text-3xl font-bold text-yellow-400 mb-2">2M+</div>
                    <div className="text-gray-300">Devices supported</div>
                  </div>
                  <div className="space-y-3 text-sm text-gray-300">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                      <span>Cloud-native architecture</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                      <span>Auto-scaling capabilities</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                      <span>Multi-site support</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Call to Action */}
            <div className="text-center">
              <div className="bg-gradient-to-r from-slate-800/80 to-slate-700/80 rounded-xl p-8 border border-orange-500/30">
                <h3 className="text-2xl font-bold text-white mb-4">Ready to Transform Your Security?</h3>
                <p className="text-gray-300 mb-6">See how these benefits apply to your organization with a personalized demo.</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    size="lg" 
                    className="button-4d px-8 py-4"
                    onClick={() => setLocation('/contact')}
                  >
                    Schedule Your Demo
                    <Enhanced4DArrowRightIcon className="ml-2 w-5 h-5" size={20} />
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="border-orange-500 text-orange-400 hover:bg-orange-500/10 px-8 py-4"
                    onClick={() => setLocation('/trials')}
                  >
                    Try Free for 30 Days
                  </Button>
                </div>
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
                CyberSecured AI is purpose-built for your sector. But don't take our word for it – 
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
                  <Enhanced4DExternalLinkIcon className="ml-2 w-5 h-5" size={20} />
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
                        <Enhanced4DCheckCircleIcon className="w-5 h-5 text-green-400" size={20} />
                        <span className="text-gray-300">AES-256 encryption at rest and in transit</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Enhanced4DCheckCircleIcon className="w-5 h-5 text-green-400" size={20} />
                        <span className="text-gray-300">Zero-trust network architecture</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Enhanced4DCheckCircleIcon className="w-5 h-5 text-green-400" size={20} />
                        <span className="text-gray-300">SOC 2 Type II certified infrastructure</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Enhanced4DCheckCircleIcon className="w-5 h-5 text-green-400" size={20} />
                        <span className="text-gray-300">24/7 security monitoring and response</span>
                      </div>
                    </div>

                    <Button 
                      size="lg" 
                      className="button-4d px-8 py-4"
                      onClick={() => setLocation('/solutions/threat-intelligence')}
                    >
                      Explore Security Features
                      <Enhanced4DArrowRightIcon className="ml-2 w-5 h-5" size={20} />
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
                        <Enhanced4DCheckCircleIcon className="w-5 h-5 text-green-400" size={20} />
                        <span className="text-gray-300">99.7% threat detection accuracy</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Enhanced4DCheckCircleIcon className="w-5 h-5 text-green-400" size={20} />
                        <span className="text-gray-300">73% reduction in false positives</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Enhanced4DCheckCircleIcon className="w-5 h-5 text-green-400" size={20} />
                        <span className="text-gray-300">Real-time behavioral analytics</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Enhanced4DCheckCircleIcon className="w-5 h-5 text-green-400" size={20} />
                        <span className="text-gray-300">Predictive vulnerability assessment</span>
                      </div>
                    </div>

                    <Button 
                      size="lg" 
                      className="button-4d px-8 py-4"
                      onClick={() => setLocation('/solutions/ai-security')}
                    >
                      Explore AI Features
                      <Enhanced4DArrowRightIcon className="ml-2 w-5 h-5" size={20} />
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
                        <Enhanced4DCheckCircleIcon className="w-5 h-5 text-green-400" size={20} />
                        <span className="text-gray-300">FERPA, FISMA, CIPA certified</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Enhanced4DCheckCircleIcon className="w-5 h-5 text-green-400" size={20} />
                        <span className="text-gray-300">FedRAMP High authorization</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Enhanced4DCheckCircleIcon className="w-5 h-5 text-green-400" size={20} />
                        <span className="text-gray-300">Automated audit reporting</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Enhanced4DCheckCircleIcon className="w-5 h-5 text-green-400" size={20} />
                        <span className="text-gray-300">85% reduction in compliance overhead</span>
                      </div>
                    </div>

                    <Button 
                      size="lg" 
                      className="button-4d px-8 py-4"
                      onClick={() => setLocation('/solutions/compliance')}
                    >
                      Explore Compliance Features
                      <Enhanced4DArrowRightIcon className="ml-2 w-5 h-5" size={20} />
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
                      <Enhanced4DStarIcon key={star} className="w-6 h-6 text-yellow-400 fill-yellow-400" size={24} />
                    ))}
                  </div>
                  <blockquote className="text-2xl md:text-3xl font-bold text-white mb-8 leading-relaxed italic">
                    "We pushed CyberSecured AI out to four different campuses. What we found was that one site was clean, 
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
                  <Enhanced4DArrowRightIcon className="ml-2 w-6 h-6" size={24} />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </MarketingLayout>
  );
}