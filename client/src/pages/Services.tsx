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
  Lock, 
  AlertTriangle, 
  Target, 
  Search, 
  Eye,
  CheckCircle,
  Phone,
  Mail,
  ArrowRight,
  Building2,
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
              <TabsList className="grid w-full grid-cols-2 mb-8 bg-slate-800/50">
                <TabsTrigger value="professional" className="data-[state=active]:bg-cyan-500">
                  Professional Services
                </TabsTrigger>
                <TabsTrigger value="managed" className="data-[state=active]:bg-cyan-500">
                  Managed Services
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