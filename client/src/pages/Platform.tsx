import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
// Cinematic security imagery from attached assets
import securityImagesPath from "@assets/Screen Shot 2025-08-20 at 11.44.59 AM_1755708412270.png";
import { MarketingLayout } from "@/components/MarketingLayout";
import { Link } from "wouter";

export default function Platform() {
  const platformCategories = [
    {
      title: "Cloud Security & AI Analytics",
      description: "AI-powered threat detection and automated incident response systems",
      color: "from-cyan-400 to-blue-500",
      icon: <Brain className="w-8 h-8" />,
      services: [
        {
          name: "Automated Incident Response",
          description: "AI-powered system for detecting, analyzing, and responding to cybersecurity incidents in real-time",
          href: "/platform/automated-incident-response",
          features: ["Real-time threat containment", "Automated remediation", "Escalation management"]
        },
        {
          name: "Threat Detection System", 
          description: "Using AI analysis for identifying and classifying security threats with 98% detection rate",
          href: "/platform/threat-detection",
          features: ["Machine learning models", "Behavioral analysis", "Pattern recognition"]
        },
        {
          name: "Predictive Risk Analysis",
          description: "AI algorithms that analyze data to predict potential vulnerabilities before exploitation",
          href: "/platform/predictive-risk-analysis",
          features: ["Vulnerability prediction", "Risk scoring", "Threat intelligence"]
        }
      ]
    },
    {
      title: "Network Infrastructure & Management",
      description: "Comprehensive network security and zero-trust architecture implementation",
      color: "from-green-400 to-emerald-500",
      icon: <Network className="w-8 h-8" />,
      services: [
        {
          name: "Firewall Management",
          description: "Advanced firewall configuration, monitoring, and maintenance for education and government networks",
          price: "Included in packages",
          href: "/platform/firewall-management",
          features: ["Configuration management", "Rule optimization", "Traffic analysis"]
        },
        {
          name: "Router & Switch Monitoring",
          description: "Comprehensive monitoring and management of network infrastructure components",
          price: "Included in packages",
          href: "/platform/router-switch-monitoring", 
          features: ["Performance monitoring", "Network optimization", "Traffic analysis"]
        },
        {
          name: "Zero-Trust Architecture",
          description: "Implementation of zero-trust security with micro-segmentation and continuous monitoring",
          price: "Custom pricing",
          href: "/platform/zero-trust-architecture",
          features: ["Micro-segmentation", "Identity-centric controls", "Continuous validation"]
        }
      ]
    },
    {
      title: "Endpoint Security & Management", 
      description: "Comprehensive endpoint protection and system administration services",
      color: "from-purple-400 to-violet-500",
      icon: <Shield className="w-8 h-8" />,
      services: [
        {
          name: "24/7 Monitoring & Vulnerability",
          description: "Around-the-clock vulnerability detection and remediation for all endpoints",
          href: "/platform/monitoring-vulnerability",
          features: ["Continuous monitoring", "Vulnerability scanning", "Automated patching"]
        },
        {
          name: "Identity & Access Management",
          description: "Comprehensive user account provisioning, access controls, and multi-factor authentication",
          price: "Included in packages",
          href: "/platform/identity-access-management",
          features: ["User provisioning", "Role-based access", "MFA integration"]
        },
        {
          name: "System Administration",
          description: "Management and maintenance of workstations, servers, and IT infrastructure for 25+ users",
          price: "Included in packages", 
          href: "/platform/system-administration",
          features: ["Windows 11 Pro management", "Performance monitoring", "License tracking"]
        }
      ]
    },
    {
      title: "Compliance & Risk Management",
      description: "Automated compliance monitoring and security awareness training programs",
      color: "from-orange-400 to-red-500", 
      icon: <ClipboardCheck className="w-8 h-8" />,
      services: [
        {
          name: "Compliance Automation",
          description: "Tools to automate meeting cybersecurity regulatory requirements including FERPA, FISMA, and FedRAMP",
          href: "/platform/compliance-automation",
          features: ["Continuous monitoring", "Automated reporting", "Policy enforcement"]
        },
        {
          name: "Security Awareness Training",
          description: "Interactive training modules for cybersecurity best practices customized for education and government personnel",
          href: "/platform/security-training",
          features: ["Interactive modules", "Role-based training", "Progress tracking"]
        }
      ]
    }
  ];

  const platformStats = [
    { label: "Threat Detection Rate", value: "98%", icon: <Eye className="w-5 h-5" /> },
    { label: "Incident Response Time", value: "70% Reduction", icon: <Zap className="w-5 h-5" /> },
    { label: "Manual Task Reduction", value: "60-80%", icon: <Bot className="w-5 h-5" /> },
    { label: "Average Cost Savings", value: "2.22M annually", icon: <CheckCircle className="w-5 h-5" /> }
  ];

  return (
    <MarketingLayout>
      <div className="ai-dashboard-bg min-h-screen">
        {/* Hero Section */}
        <header className="bg-surface/90 backdrop-blur-md border-b border-surface-light p-8 cyber-glow">
          <div className="container mx-auto max-w-6xl">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  CyberSecure AI Platform
                </h1>
                <p className="text-gray-300 text-lg mt-2">
                  Comprehensive cybersecurity and IT management for education and government sectors
                </p>
              </div>
            </div>
            
            {/* Platform Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {platformStats.map((stat, index) => (
                <div key={index} className="bg-surface/50 rounded-lg p-4 border border-surface-light">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="text-cyan-400">{stat.icon}</div>
                    <span className="text-gray-400 text-sm">{stat.label}</span>
                  </div>
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                </div>
              ))}
            </div>

            <div className="max-w-3xl">
              <p className="text-gray-300 text-lg leading-relaxed">
                Our AI-first architecture combines machine learning, behavioral analysis, and zero-trust security 
                to deliver enterprise-grade protection specifically designed for the unique challenges facing 
                education and government organizations in 2025.
              </p>
            </div>
          </div>
        </header>

        {/* Platform Categories */}
        <main className="container mx-auto max-w-6xl p-8">
          <div className="space-y-12">
            {platformCategories.map((category, categoryIndex) => (
              <section key={categoryIndex} className="space-y-6">
                {/* Category Header */}
                <div className="flex items-center space-x-4">
                  <div className={`w-16 h-16 bg-gradient-to-r ${category.color} rounded-xl flex items-center justify-center text-white`}>
                    {category.icon}
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-white">{category.title}</h2>
                    <p className="text-gray-400 text-lg">{category.description}</p>
                  </div>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {category.services.map((service, serviceIndex) => (
                    <Card key={serviceIndex} className="bg-surface/50 border-surface-light hover:border-cyan-500/50 transition-all duration-300 group">
                      <CardHeader className="pb-4">
                        <CardTitle className="text-white text-lg group-hover:text-cyan-400 transition-colors">
                          {service.name}
                        </CardTitle>
                        <p className="text-gray-400 text-sm leading-relaxed">
                          {service.description}
                        </p>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="space-y-3 mb-4">
                          {service.features.map((feature, featureIndex) => (
                            <div key={featureIndex} className="flex items-center space-x-2">
                              <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                              <span className="text-gray-300 text-sm">{feature}</span>
                            </div>
                          ))}
                        </div>
                        <Link href="/demo">
                          <Button 
                            variant="outline" 
                            className="w-full border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10"
                            data-testid={`button-learn-more-${service.name.toLowerCase().replace(/\s+/g, '-')}`}
                          >
                            Learn More <div className="w-4 h-4 ml-2 bg-contain bg-no-repeat bg-center" style={{backgroundImage: `url(${securityImagesPath})`, backgroundPosition: '30% 90%', filter: 'brightness(1.2) saturate(1.5)'}} />
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            ))}
          </div>

          {/* Platform Visual Overview */}
          <section className="mt-16">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">
              Advanced AI Security Platform in Action
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              {/* Futuristic Holographic Interface */}
              <div className="relative rounded-xl overflow-hidden border border-cyan-500/30">
                <div className="bg-gradient-to-br from-cyan-900/20 to-blue-900/40 p-8 h-80 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center">
                      <Bot className="w-12 h-12 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">AI Holographic Interface</h3>
                    <p className="text-cyan-400 text-sm">Real-time threat visualization with 3D holographic projections</p>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/10 to-transparent pointer-events-none"></div>
                <div className="absolute top-4 right-4">
                  <Badge className="bg-cyan-500/20 text-cyan-400 border border-cyan-500/50">Live Demo</Badge>
                </div>
              </div>

              {/* Live Dashboard Mockup */}
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl border border-purple-500/30 overflow-hidden">
                {/* Dashboard Header */}
                <div className="bg-gray-800/90 border-b border-gray-700 p-4 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                      <Shield className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-white font-semibold">CyberSecure AI Dashboard</h3>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-green-400 text-sm">Live</span>
                  </div>
                </div>

                {/* Dashboard Content */}
                <div className="p-6 space-y-6">
                  {/* Top Metrics */}
                  <div className="grid grid-cols-4 gap-4">
                    <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700">
                      <div className="text-red-400 text-xs font-medium">Critical Threats</div>
                      <div className="text-white text-xl font-bold">4</div>
                    </div>
                    <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700">
                      <div className="text-orange-400 text-xs font-medium">Active Incidents</div>
                      <div className="text-white text-xl font-bold">12</div>
                    </div>
                    <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700">
                      <div className="text-cyan-400 text-xs font-medium">Response Time</div>
                      <div className="text-white text-xl font-bold">4.2m</div>
                    </div>
                    <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700">
                      <div className="text-green-400 text-xs font-medium">Systems Protected</div>
                      <div className="text-white text-xl font-bold">12.8K</div>
                    </div>
                  </div>

                  {/* Threat Map Visualization */}
                  <div className="bg-gray-800/30 rounded-lg p-4 border border-gray-700">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-white font-medium">Global Threat Map</h4>
                      <Badge className="bg-red-500/20 text-red-400 text-xs">4 Active</Badge>
                    </div>
                    <div className="h-32 bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-lg flex items-center justify-center border border-blue-500/20">
                      <div className="text-center">
                        <Network className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                        <div className="text-blue-400 text-sm">Interactive Threat Visualization</div>
                        <div className="text-gray-400 text-xs">7 Countries • 15 Attack Vectors</div>
                      </div>
                    </div>
                  </div>

                  {/* Recent Incidents */}
                  <div className="bg-gray-800/30 rounded-lg p-4 border border-gray-700">
                    <h4 className="text-white font-medium mb-3">Recent Incidents</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-2 bg-red-900/20 rounded border-l-2 border-red-500">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                          <span className="text-white text-sm">Data Exfiltration Attempt</span>
                        </div>
                        <span className="text-gray-400 text-xs">2m ago</span>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-orange-900/20 rounded border-l-2 border-orange-500">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                          <span className="text-white text-sm">Suspicious Login Activity</span>
                        </div>
                        <span className="text-gray-400 text-xs">5m ago</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Technical Architecture Overview */}
          <section className="bg-gradient-to-r from-surface/30 to-surface/50 rounded-xl p-8 border border-surface-light">
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
              <Settings className="w-8 h-8 mr-3 text-cyan-400" />
              Technical Architecture
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-cyan-400 mb-4">AI-First Security</h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                    <span>Data-driven AI automation as primary frontline defense</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                    <span>Predictive and adaptive security vs reactive systems</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                    <span>Multiple AI models for detection, response, and analysis</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                    <span>Real-time pattern recognition and behavioral analysis</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-cyan-400 mb-4">Zero-Trust Implementation</h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                    <span>Continuous session monitoring and revalidation</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                    <span>Micro-segmentation for lateral movement defense</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                    <span>Identity-centric security controls</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                    <span>Integration with existing identity systems</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-8 p-6 bg-surface/30 rounded-lg border border-cyan-500/20">
              <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2 text-orange-400" />
                Addressing Critical Market Challenges
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                <div>
                  <p className="text-gray-300 mb-2">
                    <span className="font-semibold text-orange-400">Threat Landscape:</span> 72% of K-12 districts experienced security incidents in 2024, with education remaining the #1 target globally (2,300+ attacks per week).
                  </p>
                </div>
                <div>
                  <p className="text-gray-300">
                    <span className="font-semibold text-orange-400">Resource Constraints:</span> $3.7B in funding requests for only $200M available, with 3.5M unfilled cybersecurity positions projected by 2025.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="mt-16 text-center">
            <div className="bg-gradient-to-r from-cyan-900/20 to-blue-900/20 rounded-xl p-8 border border-cyan-500/20">
              <h2 className="text-3xl font-bold text-white mb-4">
                Ready to Transform Your Cybersecurity?
              </h2>
              <p className="text-gray-300 text-lg mb-6 max-w-2xl mx-auto">
                Join educational institutions and government agencies already protecting their critical infrastructure with CyberSecure AI.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/pricing">
                  <Button size="lg" className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600" data-testid="button-view-pricing">
                    View Pricing Plans
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" size="lg" className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10" data-testid="button-contact-sales">
                    Contact Sales
                  </Button>
                </Link>
              </div>
            </div>
          </section>
        </main>
      </div>
    </MarketingLayout>
  );
}