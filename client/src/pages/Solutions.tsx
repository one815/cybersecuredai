import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// Cinematic security imagery from attached assets
import securityImagesPath from "@assets/Screen Shot 2025-08-20 at 11.44.59 AM_1755708412270.png";
import { Link } from "wouter";
import { MarketingLayout } from "@/components/MarketingLayout";

export default function Solutions() {
  const aiSolutions = [
    {
      title: "Automated Threat Detection System",
      description: "AI-powered threat detection using NIST Cybersecurity Framework 2.0 to automatically identify and classify security threats in real-time",
      features: ["Real-time threat analysis", "NIST CSF 2.0 compliance", "Automated classification", "Machine learning algorithms", "24/7 monitoring"],
      icon: <div className="w-8 h-8 bg-contain bg-no-repeat bg-center" style={{backgroundImage: `url(${securityImagesPath})`, backgroundPosition: '50% 90%', filter: 'hue-rotate(180deg) saturate(1.5) brightness(1.2)'}} />
    },
    {
      title: "Predictive Risk Analysis Engine", 
      description: "AI-driven system that analyzes historical data, system configurations, and threat intelligence to predict potential vulnerabilities",
      features: ["Historical data analysis", "Configuration assessment", "Threat intelligence integration", "Vulnerability prediction", "Risk scoring"],
      icon: <div className="w-8 h-8 bg-contain bg-no-repeat bg-center" style={{backgroundImage: `url(${securityImagesPath})`, backgroundPosition: '30% 90%', filter: 'hue-rotate(280deg) saturate(1.5) brightness(1.2)'}} />
    },
    {
      title: "Automated Incident Response System",
      description: "Intelligent response system that automatically contains, investigates, and remediates security incidents based on predefined playbooks",
      features: ["Automatic containment", "Incident investigation", "Smart remediation", "Custom playbooks", "Response automation"],
      icon: <div className="w-8 h-8 bg-contain bg-no-repeat bg-center" style={{backgroundImage: `url(${securityImagesPath})`, backgroundPosition: '50% 70%', filter: 'hue-rotate(20deg) saturate(1.5) brightness(1.2)'}} />
    }
  ];

  const complianceSolutions = [
    {
      title: "Multi-Framework Compliance Automation",
      description: "Comprehensive compliance management system supporting FERPA, CIPA, FedRAMP, and FISMA requirements",
      features: ["FERPA compliance", "CIPA framework support", "FedRAMP authorization", "FISMA requirements", "Automated reporting"],
      icon: <div className="w-8 h-8 bg-contain bg-no-repeat bg-center" style={{backgroundImage: `url(${securityImagesPath})`, backgroundPosition: '70% 10%', filter: 'hue-rotate(120deg) saturate(1.5) brightness(1.2)'}} />
    },
    {
      title: "Student Data Protection Controls",
      description: "Specialized data protection controls designed to meet FERPA requirements for protecting student education records",
      features: ["FERPA compliance", "Data encryption", "Access controls", "Audit logging", "Privacy controls"],
      icon: <GraduationCap className="w-8 h-8 text-blue-400" />
    },
    {
      title: "Federal Security Controls Implementation",
      description: "Implementation of NIST SP 800-53 security controls as required by FedRAMP and FISMA",
      features: ["NIST SP 800-53 controls", "FedRAMP compliance", "FISMA requirements", "Control automation", "Continuous monitoring"],
      icon: <Flag className="w-8 h-8 text-red-400" />
    }
  ];

  const itManagementSolutions = [
    {
      title: "Comprehensive System Administration",
      description: "Complete system administration capabilities for 25+ users across multiple facilities",
      features: ["User management", "System monitoring", "Performance optimization", "Multi-facility support", "Resource allocation"],
      icon: <Users className="w-8 h-8 text-blue-400" />
    },
    {
      title: "Advanced Network Management", 
      description: "Network security including firewall management, secure wireless, and zero-trust architecture implementation",
      features: ["Firewall management", "Secure wireless", "Zero-trust architecture", "Network segmentation", "Traffic monitoring"],
      icon: <Network className="w-8 h-8 text-purple-400" />
    },
    {
      title: "Automated Backup and Recovery",
      description: "Comprehensive data protection with automated backup, verification, and disaster recovery",
      features: ["Automated backups", "Data verification", "Disaster recovery", "Point-in-time recovery", "Cross-site replication"],
      icon: <Database className="w-8 h-8 text-green-400" />
    }
  ];

  const securityInfrastructure = [
    {
      title: "Zero-Trust Network Architecture",
      description: "Implementation of zero-trust security model with identity verification and micro-segmentation",
      features: ["Identity verification", "Micro-segmentation", "Continuous authentication", "Access policies", "Network isolation"],
      icon: <Lock className="w-8 h-8 text-cyan-400" />
    },
    {
      title: "Endpoint Detection and Response",
      description: "Advanced endpoint protection with real-time threat detection and automated response",
      features: ["Real-time monitoring", "Threat detection", "Automated response", "Endpoint isolation", "Forensic analysis"],
      icon: <Eye className="w-8 h-8 text-orange-400" />
    },
    {
      title: "Identity and Access Management",
      description: "Comprehensive identity security with multi-factor authentication and privileged access management",
      features: ["Multi-factor authentication", "Privileged access management", "Single sign-on", "Identity governance", "Access reviews"],
      icon: <Fingerprint className="w-8 h-8 text-purple-400" />
    }
  ];

  const trainingServices = [
    {
      title: "Security Awareness Training",
      description: "Interactive training modules for cybersecurity best practices customized for education and government personnel",
      features: ["Interactive modules", "Sector-specific content", "Progress tracking", "Certification", "Regular updates"],
      icon: <Award className="w-8 h-8 text-blue-400" />
    },
    {
      title: "24/7 Monitoring and Vulnerability Management",
      description: "Continuous monitoring service using AI to detect vulnerabilities",
      features: ["24/7 monitoring", "Vulnerability scanning", "AI-powered detection", "Threat intelligence", "Alert management"],
      icon: <Activity className="w-8 h-8 text-red-400" />
    }
  ];

  return (
    <MarketingLayout>
      <div className="ai-dashboard-bg min-h-screen">
      {/* Header */}
      <header className="bg-surface/90 backdrop-blur-md border-b border-surface-light p-6 cyber-glow">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-lg flex items-center justify-center">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white flex items-center space-x-2">
                <span>CyberSecure AI Solutions</span>
                <Shield className="w-8 h-8 text-purple-400" />
                <Lock className="w-8 h-8 text-blue-400" />
              </h1>
              <p className="text-gray-400">Comprehensive cybersecurity and IT management solutions for education and government</p>
            </div>
          </div>
        </div>
      </header>

      <main className="p-6">
        <div className="container mx-auto max-w-6xl">
          <Tabs defaultValue="ai-security" className="space-y-8">
            <TabsList className="bg-surface border border-surface-light grid grid-cols-5 max-w-4xl mx-auto">
              <TabsTrigger value="ai-security" className="data-[state=active]:bg-cyan-600">
                <Brain className="w-4 h-4 mr-2" />
                AI Security
              </TabsTrigger>
              <TabsTrigger value="compliance" className="data-[state=active]:bg-green-600">
                <Shield className="w-4 h-4 mr-2" />
                Compliance
              </TabsTrigger>
              <TabsTrigger value="it-management" className="data-[state=active]:bg-blue-600">
                <Server className="w-4 h-4 mr-2" />
                IT Management
              </TabsTrigger>
              <TabsTrigger value="security-infra" className="data-[state=active]:bg-purple-600">
                <Lock className="w-4 h-4 mr-2" />
                Security Infrastructure
              </TabsTrigger>
              <TabsTrigger value="training" className="data-[state=active]:bg-orange-600">
                <Award className="w-4 h-4 mr-2" />
                Training & Support
              </TabsTrigger>
            </TabsList>

            {/* AI-Powered Security */}
            <TabsContent value="ai-security" className="space-y-8">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-white mb-4 geometric-text">AI-Powered Security Solutions</h2>
                <p className="text-lg text-gray-400 max-w-3xl mx-auto">
                  Advanced artificial intelligence and machine learning technologies for proactive threat detection, 
                  predictive analysis, and automated incident response.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {aiSolutions.map((solution, index) => (
                  <Card key={index} className="bg-surface/80 backdrop-blur-md border border-cyan-500/30 cyber-glow">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-16 h-16 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                          {solution.icon}
                        </div>
                      </div>
                      <CardTitle className="text-xl text-white geometric-text">{solution.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-400 mb-6">{solution.description}</p>
                      <ul className="space-y-2 mb-6">
                        {solution.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center text-sm text-gray-300">
                            <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <Link href="/pricing">
                        <Button className="w-full bg-cyan-600 hover:bg-cyan-700">
                          Learn More
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Compliance Management */}
            <TabsContent value="compliance" className="space-y-8">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-white mb-4">Compliance Management</h2>
                <p className="text-lg text-gray-400 max-w-3xl mx-auto">
                  Comprehensive compliance automation for education and government regulatory frameworks 
                  including FERPA, CIPA, FedRAMP, FISMA, and NIST SP 800-53.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {complianceSolutions.map((solution, index) => (
                  <Card key={index} className="bg-surface/80 backdrop-blur-md border border-green-500/30 cyber-glow">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-16 h-16 bg-green-500/20 rounded-lg flex items-center justify-center">
                          {solution.icon}
                        </div>
                      </div>
                      <CardTitle className="text-xl text-white geometric-text">{solution.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-400 mb-6">{solution.description}</p>
                      <ul className="space-y-2 mb-6">
                        {solution.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center text-sm text-gray-300">
                            <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <Link href="/pricing">
                        <Button className="w-full bg-green-600 hover:bg-green-700">
                          Learn More
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* IT Management */}
            <TabsContent value="it-management" className="space-y-8">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-white mb-4">IT Management Services</h2>
                <p className="text-lg text-gray-400 max-w-3xl mx-auto">
                  Comprehensive system administration, network management, and data protection services 
                  designed for educational institutions and government agencies.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {itManagementSolutions.map((solution, index) => (
                  <Card key={index} className="bg-surface/80 backdrop-blur-md border border-blue-500/30 cyber-glow">
                    <CardHeader>
                      <div className="w-16 h-16 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
                        {solution.icon}
                      </div>
                      <CardTitle className="text-xl text-white geometric-text">{solution.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-400 mb-6">{solution.description}</p>
                      <ul className="space-y-2 mb-6">
                        {solution.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center text-sm text-gray-300">
                            <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <Link href="/pricing">
                        <Button className="w-full bg-blue-600 hover:bg-blue-700">
                          Learn More
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Security Infrastructure */}
            <TabsContent value="security-infra" className="space-y-8">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-white mb-4">Security Infrastructure</h2>
                <p className="text-lg text-gray-400 max-w-3xl mx-auto">
                  Advanced security infrastructure including zero-trust architecture, endpoint protection, 
                  and comprehensive identity and access management.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {securityInfrastructure.map((solution, index) => (
                  <Card key={index} className="bg-surface/80 backdrop-blur-md border border-purple-500/30 cyber-glow">
                    <CardHeader>
                      <div className="w-16 h-16 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
                        {solution.icon}
                      </div>
                      <CardTitle className="text-xl text-white geometric-text">{solution.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-400 mb-6">{solution.description}</p>
                      <ul className="space-y-2 mb-6">
                        {solution.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center text-sm text-gray-300">
                            <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <Link href="/pricing">
                        <Button className="w-full bg-purple-600 hover:bg-purple-700">
                          Learn More
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Training & Support */}
            <TabsContent value="training" className="space-y-8">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-white mb-4">Training & Support Services</h2>
                <p className="text-lg text-gray-400 max-w-3xl mx-auto">
                  Security awareness training and 24/7 monitoring services to enhance your organization's 
                  security posture and incident response capabilities.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {trainingServices.map((solution, index) => (
                  <Card key={index} className="bg-surface/80 backdrop-blur-md border border-orange-500/30 cyber-glow">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-16 h-16 bg-orange-500/20 rounded-lg flex items-center justify-center">
                          {solution.icon}
                        </div>
                      </div>
                      <CardTitle className="text-xl text-white geometric-text">{solution.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-400 mb-6">{solution.description}</p>
                      <ul className="space-y-2 mb-6">
                        {solution.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center text-sm text-gray-300">
                            <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <Link href="/pricing">
                        <Button className="w-full bg-orange-600 hover:bg-orange-700">
                          Learn More
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          {/* Call to Action */}
          <section className="mt-20 text-center">
            <Card className="bg-gradient-to-r from-cyan-900/50 to-blue-900/50 border border-cyan-500/30 cyber-glow">
              <CardContent className="p-12">
                <h2 className="text-3xl font-bold text-white mb-6">Ready to Secure Your Organization?</h2>
                <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
                  Contact us to learn how CyberSecure AI can protect your educational institution 
                  or government agency with our comprehensive cybersecurity solutions.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/pricing">
                    <Button size="lg" className="bg-cyan-600 hover:bg-cyan-700 px-8 py-3">
                      View Pricing Plans
                    </Button>
                  </Link>
                  <Link href="/security-scanner">
                    <Button size="lg" variant="outline" className="border-cyan-500 text-cyan-400 hover:bg-cyan-500/10 px-8 py-3">
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