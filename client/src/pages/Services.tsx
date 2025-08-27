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
  Phone
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

  const managedServices = [
    {
      title: "24/7 Managed SOC",
      description: "Expert-staffed Security Operations Center with AI assistance",
      icon: <CustomEyeIcon className="w-8 h-8 text-red-400" size={32} />,
      features: [
        "24/7 threat monitoring and response",
        "Expert security analysts", 
        "AI-assisted threat hunting",
        "8-minute mean response time",
        "Incident escalation management"
      ],
      metrics: "8min MTTR",
      price: "Starting at $5,000/month"
    },
    {
      title: "Managed Compliance",
      description: "Automated regulatory compliance monitoring and reporting",
      icon: <CustomShieldIcon className="w-8 h-8 text-green-400" size={32} />,
      features: [
        "FERPA/FISMA/CIPA automation",
        "Continuous compliance monitoring",
        "Automated audit reporting",
        "Policy enforcement",
        "Risk assessment dashboards"
      ],
      metrics: "85% Less Admin",
      price: "Starting at $3,000/month"
    },
    {
      title: "Managed Threat Intelligence",
      description: "Curated threat intelligence with actionable insights",
      icon: <CustomBrainIcon className="w-8 h-8 text-purple-400" size={32} />,
      features: [
        "Real-time threat feeds",
        "Custom threat analysis",
        "Industry-specific intelligence",
        "Threat landscape reporting",
        "Predictive threat modeling"
      ],
      metrics: "50+ Sources",
      price: "Starting at $2,500/month"
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
          price: "$25,000 - $75,000"
        },
        {
          name: "Zero Trust Architecture Design",
          description: "Complete zero trust implementation planning and design",
          deliverables: ["Architecture blueprint", "Implementation plan", "Technology recommendations"],
          timeline: "6-8 weeks", 
          price: "$35,000 - $85,000"
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
          price: "$15,000 - $45,000"
        },
        {
          name: "Legacy System Integration",
          description: "Seamless integration with existing security infrastructure",
          deliverables: ["Integration architecture", "Data migration", "API development", "Testing"],
          timeline: "4-8 weeks",
          price: "$20,000 - $60,000"
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
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {managedServices.map((service, index) => (
                    <Card key={index} className="bg-slate-700/60 border border-orange-500/30 hover:border-orange-400/60 transition-all duration-300 group">
                      <CardHeader className="p-8 text-center">
                        <div className="w-20 h-20 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-orange-500/30 transition-colors">
                          {service.icon}
                        </div>
                        <div className="flex justify-center mb-4">
                          <Badge className="bg-white/10 text-orange-300 font-bold">
                            {service.metrics}
                          </Badge>
                        </div>
                        <CardTitle className="text-2xl text-white mb-4">{service.title}</CardTitle>
                        <p className="text-gray-300 mb-6">{service.description}</p>
                      </CardHeader>
                      <CardContent className="p-8 pt-0">
                        <ul className="space-y-3 mb-6">
                          {service.features.map((feature, fIndex) => (
                            <li key={fIndex} className="flex items-center space-x-2">
                              <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                              <span className="text-gray-300 text-sm">{feature}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="text-center mb-6">
                          <div className="text-orange-400 font-bold text-lg">{service.price}</div>
                        </div>
                        <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white">
                          Learn More
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="professional" className="space-y-12">
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
                            <CardHeader className="p-8">
                              <CardTitle className="text-2xl text-white mb-4">{service.name}</CardTitle>
                              <p className="text-gray-300 mb-6">{service.description}</p>
                              
                              <div className="grid grid-cols-2 gap-4 mb-6">
                                <div>
                                  <div className="text-cyan-400 font-semibold mb-2">Timeline</div>
                                  <div className="text-gray-300">{service.timeline}</div>
                                </div>
                                <div>
                                  <div className="text-cyan-400 font-semibold mb-2">Investment</div>
                                  <div className="text-gray-300">{service.price}</div>
                                </div>
                              </div>
                            </CardHeader>
                            <CardContent className="p-8 pt-0">
                              <div className="mb-6">
                                <h4 className="text-white font-semibold mb-3">Deliverables</h4>
                                <ul className="space-y-2">
                                  {service.deliverables.map((deliverable, dIndex) => (
                                    <li key={dIndex} className="flex items-center space-x-2">
                                      <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                                      <span className="text-gray-300 text-sm">{deliverable}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <Button variant="outline" className="w-full border-cyan-500 text-cyan-400 hover:bg-cyan-500/10">
                                Get Quote
                                <ArrowRight className="ml-2 w-4 h-4" />
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
                  <Button variant="outline" className="w-full border-blue-500 text-blue-400 hover:bg-blue-500/10">
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
                  <div className="text-4xl font-bold text-purple-400 mb-2">$2,500</div>
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
                  <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
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
                  <Button variant="outline" className="w-full border-yellow-500 text-yellow-400 hover:bg-yellow-500/10">
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
                <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white px-10 py-4 text-lg">
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