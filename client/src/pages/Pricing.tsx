import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle, 
  Shield, 
  Users, 
  Building, 
  Crown,
  Bot,
  AlertTriangle,
  Lock,
  Eye,
  Network,
  Database,
  Award
} from "lucide-react";
import { Link } from "wouter";
import { MarketingLayout } from "@/components/MarketingLayout";

export default function Pricing() {
  const packages = [
    {
      id: "essential",
      name: "CyberSecure Essential",
      target: "Small K-12 schools, small municipal governments",
      icon: <Shield className="w-8 h-8 text-blue-400" />,
      color: "blue",
      borderColor: "border-blue-500/30",
      buttonColor: "bg-blue-600 hover:bg-blue-700",
      software: [
        "CyberSecure AI Core Platform (limited users)",
        "Basic automated incident response",
        "Threat detection system",
        "Basic compliance automation"
      ],
      hardware: [
        "Cat6A Structured Cabling System ($5,000-8,000)",
        "Basic Network Cabinet with Lock ($1,000-2,000)",
        "Patch Panels and Cable Management ($800-1,500)",
        "Entry-level Access Control Infrastructure ($2,000-3,000)"
      ],
      support: [
        "Email support",
        "Basic documentation",
        "Community resources",
        "Monthly health checks"
      ]
    },
    {
      id: "advanced",
      name: "CyberSecure Advanced", 
      target: "Medium-sized school districts, colleges, city governments",
      icon: <Building className="w-8 h-8 text-green-400" />,
      color: "green",
      borderColor: "border-green-500/30",
      buttonColor: "bg-green-600 hover:bg-green-700",
      popular: true,
      software: [
        "CyberSecure AI Core Platform",
        "Advanced automated incident response",
        "Threat detection system with AI analysis", 
        "Predictive risk analysis",
        "Comprehensive compliance automation",
        "24/7 monitoring and vulnerability management"
      ],
      hardware: [
        "Cat6A Shielded Cabling System ($12,000-18,000)",
        "Fiber Optic Backbone ($8,000-12,000)",
        "Advanced Network Cabinets with Electronic Locks ($3,000-5,000)",
        "Security Camera Infrastructure ($5,000-8,000)",
        "Intermediate Access Control System ($4,000-7,000)",
        "Environmental Monitoring for Server Rooms ($3,000-5,000)"
      ],
      support: [
        "Priority phone support",
        "Dedicated account manager",
        "Quarterly business reviews",
        "Advanced training resources"
      ]
    },
    {
      id: "enterprise",
      name: "CyberSecure Enterprise",
 
      target: "Large school districts, universities, state agencies, federal departments",
      icon: <Crown className="w-8 h-8 text-purple-400" />,
      color: "purple",
      borderColor: "border-purple-500/30",
      buttonColor: "bg-purple-600 hover:bg-purple-700",
      software: [
        "CyberSecure AI Core Platform (unlimited users)",
        "Enterprise automated incident response",
        "Advanced threat detection with ML",
        "Predictive risk analysis with customized models",
        "Comprehensive compliance automation",
        "24/7 monitoring and vulnerability management", 
        "Security awareness training",
        "Custom integration framework"
      ],
      hardware: [
        "Campus-wide Cat6A Shielded Cabling System ($25,000-40,000)",
        "Redundant Fiber Optic Backbone ($15,000-25,000)",
        "High-Security Network Cabinets with Biometric Access ($8,000-15,000)",
        "Comprehensive Security Camera Infrastructure ($12,000-20,000)",
        "Advanced Access Control System ($10,000-18,000)",
        "Complete Environmental Monitoring ($8,000-15,000)",
        "Tamper-Evident Cabling Solutions ($5,000-10,000)",
        "Network Segmentation Infrastructure ($7,000-12,000)"
      ],
      support: [
        "24/7 phone support",
        "Dedicated technical team",
        "Custom implementation",
        "Executive briefings",
        "Regulatory consultation"
      ]
    }
  ];

  const additionalServices = [
    {
      name: "Secure Server Room Kit",
      description: "Complete secure server room infrastructure with environmental controls"
    },
    {
      name: "Multi-Factor Authentication Hardware",
 
      description: "Hardware tokens and biometric authentication devices"
    },
    {
      name: "Network Segmentation Bundle",
      description: "Advanced network segmentation and micro-segmentation tools"
    },
    {
      name: "Disaster Recovery Infrastructure", 
      description: "Complete disaster recovery and business continuity infrastructure"
    }
  ];

  const supportTiers = [
    {
      level: "Critical",
      description: "Service outage or security breach", 
      response: "15 minutes",
      resolution: "4 hours"
    },
    {
      level: "High",
      description: "Significant impairment of services",
      response: "1 hour", 
      resolution: "8 hours"
    },
    {
      level: "Medium", 
      description: "Limited impact on operations",
      response: "4 hours",
      resolution: "24 hours"
    },
    {
      level: "Low",
      description: "Minor issues, questions",
      response: "8 hours",
      resolution: "48 hours"
    }
  ];

  const getSeverityColor = (level: string) => {
    switch (level) {
      case "Critical": return "text-red-400 border-red-500";
      case "High": return "text-orange-400 border-orange-500"; 
      case "Medium": return "text-yellow-400 border-yellow-500";
      case "Low": return "text-blue-400 border-blue-500";
      default: return "text-gray-400 border-gray-500";
    }
  };

  return (
    <MarketingLayout>
      <div className="ai-dashboard-bg min-h-screen">
      {/* Header */}
      <header className="bg-surface/90 backdrop-blur-md border-b border-surface-light p-6 cyber-glow">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg flex items-center justify-center">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white flex items-center space-x-2">
                <span>Pricing Plans</span>
                <Shield className="w-8 h-8 text-green-400" />
                <Award className="w-8 h-8 text-blue-400" />
              </h1>
              <p className="text-gray-400">Flexible cybersecurity solutions for organizations of all sizes</p>
            </div>
          </div>
        </div>
      </header>

      <main className="p-6">
        <div className="container mx-auto max-w-7xl">
          {/* Pricing Overview */}
          <section className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">Choose Your Security Package</h2>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto mb-8">
              Comprehensive cybersecurity solutions tailored for education and government sectors. 
              Each package includes both software platforms and hardware infrastructure components.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto text-sm">
              <div className="text-center">
                <div className="text-2xl font-bold text-cyan-400">Essential</div>
                <div className="text-gray-400">Small Organizations</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">Advanced</div>
                <div className="text-gray-400">Growing Organizations</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">Enterprise</div>
                <div className="text-gray-400">Large Organizations</div>
              </div>
            </div>
          </section>

          {/* Pricing Cards */}
          <section className="mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {packages.map((pkg) => (
                <Card key={pkg.id} className={`bg-surface/80 backdrop-blur-md border ${pkg.borderColor} cyber-glow relative ${pkg.popular ? 'ring-2 ring-green-500/50' : ''}`}>
                  {pkg.popular && (
                    <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-green-600 text-white">
                      Most Popular
                    </Badge>
                  )}
                  <CardHeader className="text-center pb-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-gray-700 to-gray-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                      {pkg.icon}
                    </div>
                    <CardTitle className="text-2xl text-white">{pkg.name}</CardTitle>
                    <div className="text-xl font-bold text-white mt-2">Contact for Pricing</div>
                    <p className="text-gray-400 text-sm mt-2">{pkg.target}</p>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h4 className="font-bold text-white mb-3 flex items-center">
                        <Bot className="w-4 h-4 mr-2 text-cyan-400" />
                        Software Platform
                      </h4>
                      <ul className="space-y-2">
                        {pkg.software.map((feature, index) => (
                          <li key={index} className="flex items-start text-sm text-gray-300">
                            <CheckCircle className="w-4 h-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-bold text-white mb-3 flex items-center">
                        <Network className="w-4 h-4 mr-2 text-orange-400" />
                        Hardware Components
                      </h4>
                      <ul className="space-y-2">
                        {pkg.hardware.map((hardware, index) => (
                          <li key={index} className="flex items-start text-sm text-gray-300">
                            <CheckCircle className="w-4 h-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                            {hardware}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-bold text-white mb-3 flex items-center">
                        <Users className="w-4 h-4 mr-2 text-blue-400" />
                        Support & Services
                      </h4>
                      <ul className="space-y-2">
                        {pkg.support.map((support, index) => (
                          <li key={index} className="flex items-start text-sm text-gray-300">
                            <CheckCircle className="w-4 h-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                            {support}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Button className={`w-full ${pkg.buttonColor} text-white mt-6`}>
                      Get Started with {pkg.name}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Additional Services */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-white text-center mb-12">Additional Security Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {additionalServices.map((service, index) => (
                <Card key={index} className="bg-surface/80 backdrop-blur-md border border-orange-500/30 cyber-glow">
                  <CardHeader>
                    <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center mb-4">
                      <Lock className="w-6 h-6 text-orange-400" />
                    </div>
                    <CardTitle className="text-lg text-white">{service.name}</CardTitle>
                    <Badge className="bg-orange-600 text-white w-fit">Contact for Pricing</Badge>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-400 text-sm">{service.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Support SLAs */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-white text-center mb-12">Support Level Agreements</h2>
            <Card className="bg-surface/80 backdrop-blur-md border border-blue-500/30 cyber-glow">
              <CardContent className="p-8">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-600">
                        <th className="text-left py-4 text-white font-bold">Severity Level</th>
                        <th className="text-left py-4 text-white font-bold">Description</th>
                        <th className="text-left py-4 text-white font-bold">Response Time</th>
                        <th className="text-left py-4 text-white font-bold">Resolution Target</th>
                      </tr>
                    </thead>
                    <tbody>
                      {supportTiers.map((tier, index) => (
                        <tr key={index} className="border-b border-gray-700/50">
                          <td className="py-4">
                            <Badge className={`${getSeverityColor(tier.level)} border`} variant="outline">
                              {tier.level}
                            </Badge>
                          </td>
                          <td className="py-4 text-gray-300">{tier.description}</td>
                          <td className="py-4 text-white font-medium">{tier.response}</td>
                          <td className="py-4 text-white font-medium">{tier.resolution}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Implementation Process */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-white text-center mb-12">Implementation Process</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-7 gap-4">
              {[
                { step: 1, title: "Assessment", icon: <Eye className="w-6 h-6" /> },
                { step: 2, title: "Planning", icon: <Users className="w-6 h-6" /> },
                { step: 3, title: "Design", icon: <Network className="w-6 h-6" /> },
                { step: 4, title: "Implementation", icon: <Database className="w-6 h-6" /> },
                { step: 5, title: "Testing", icon: <AlertTriangle className="w-6 h-6" /> },
                { step: 6, title: "Training", icon: <Award className="w-6 h-6" /> },
                { step: 7, title: "Go-Live", icon: <CheckCircle className="w-6 h-6" /> }
              ].map((phase) => (
                <Card key={phase.step} className="bg-surface/80 backdrop-blur-md border border-cyan-500/30 cyber-glow text-center">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center mx-auto mb-3 text-cyan-400">
                      {phase.icon}
                    </div>
                    <div className="text-sm font-bold text-white">Step {phase.step}</div>
                    <div className="text-xs text-gray-400 mt-1">{phase.title}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center">
            <Card className="bg-gradient-to-r from-cyan-900/50 to-blue-900/50 border border-cyan-500/30 cyber-glow">
              <CardContent className="p-12">
                <h2 className="text-3xl font-bold text-white mb-6">Ready to Get Started?</h2>
                <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
                  Contact our cybersecurity experts to discuss your specific requirements and 
                  find the perfect security package for your organization.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="bg-cyan-600 hover:bg-cyan-700 px-8 py-3">
                    Contact Sales Team
                  </Button>
                  <Link href="/security-scanner">
                    <Button size="lg" variant="outline" className="border-cyan-500 text-cyan-400 hover:bg-cyan-500/10 px-8 py-3">
                      Free Security Assessment
                    </Button>
                  </Link>
                </div>
                <p className="text-sm text-gray-400 mt-6">
                  All packages include comprehensive implementation, training, and ongoing support
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