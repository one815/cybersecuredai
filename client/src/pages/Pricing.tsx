import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  CheckCircle,
  Star,
  ArrowRight,
  Crown,
  Shield,
  Brain,
  Users,
  Building,
  Phone
} from "lucide-react";
import {
  CustomShieldIcon,
  CustomBrainIcon,
  CustomGraduationCapIcon,
  CustomFlagIcon,
  CustomZapIcon
} from "@/components/CustomIcons";
import { Link } from "wouter";
import { MarketingLayout } from "@/components/MarketingLayout";

export default function Pricing() {
  const pricingPlans = [
    {
      name: "Essential Protection",
      description: "Perfect for small organizations getting started",
      price: "$2,500",
      period: "per month",
      badge: "Small Organizations",
      color: "border-blue-500/30",
      buttonClass: "bg-blue-600 hover:bg-blue-700",
      features: [
        "Up to 250 users",
        "AI-powered threat detection",
        "Basic incident response",
        "FERPA/CIPA compliance",
        "Email & chat support",
        "Cloud security monitoring",
        "Basic user training",
        "Monthly security reports"
      ],
      metrics: "250 Users Max"
    },
    {
      name: "Advanced Security", 
      description: "Comprehensive protection for growing institutions",
      price: "$7,500",
      period: "per month",
      badge: "Most Popular",
      color: "border-purple-500/30",
      buttonClass: "bg-purple-600 hover:bg-purple-700",
      popular: true,
      features: [
        "Up to 1,000 users", 
        "Advanced AI threat detection",
        "Automated incident response",
        "Full compliance automation",
        "24/7 priority support",
        "Advanced threat intelligence",
        "Security awareness training",
        "Weekly executive briefings"
      ],
      metrics: "1K Users Max"
    },
    {
      name: "Enterprise Shield",
      description: "Complete security suite for large organizations", 
      price: "$15,000",
      period: "per month",
      badge: "Enterprise",
      color: "border-cyan-500/30",
      buttonClass: "bg-cyan-600 hover:bg-cyan-700",
      features: [
        "Unlimited users",
        "Premium AI models",
        "Custom response playbooks", 
        "White-glove compliance",
        "Dedicated success team",
        "Custom threat intelligence",
        "On-site training programs",
        "Real-time executive dashboards"
      ],
      metrics: "Unlimited Scale"
    }
  ];

  const governmentPlans = [
    {
      name: "Federal Standard",
      description: "FedRAMP authorized for federal agencies",
      price: "Custom",
      period: "pricing",
      badge: "FedRAMP High",
      color: "border-red-500/30", 
      buttonClass: "bg-red-600 hover:bg-red-700",
      features: [
        "FedRAMP High authorization",
        "FISMA compliance automation",
        "Classified data protection",
        "Inter-agency intelligence sharing",
        "Dedicated government SOC",
        "Security clearance requirements",
        "On-premises deployment options",
        "Government-specific training"
      ]
    },
    {
      name: "State & Local",
      description: "Tailored for state and municipal governments",
      price: "$12,000",
      period: "per month",
      badge: "Government Optimized",
      color: "border-orange-500/30",
      buttonClass: "bg-orange-600 hover:bg-orange-700", 
      features: [
        "Multi-agency coordination",
        "Public safety integration",
        "Citizen data protection",
        "Emergency response protocols",
        "Regional threat intelligence",
        "Government compliance automation",
        "Public sector training programs",
        "Crisis communication tools"
      ]
    }
  ];

  return (
    <MarketingLayout>
      <div className="min-h-screen bg-slate-900">
        
        {/* Bold Pricing Hero */}
        <section className="relative py-24 px-6 bg-gradient-to-br from-slate-900 via-green-900/20 to-slate-900">
          <div className="absolute inset-0 bg-grid-white/[0.02]"></div>
          <div className="container mx-auto max-w-7xl relative z-10">
            <div className="text-center mb-20">
              <Badge className="mb-8 bg-green-500/20 text-green-300 border-green-500/30 text-lg px-6 py-3">
                Enterprise Cybersecurity Pricing
              </Badge>
              <h1 className="text-6xl md:text-8xl font-bold text-white mb-8 leading-tight">
                Threats Stopped.<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-500">
                  Budgets Protected.
                </span>
              </h1>
              <p className="text-2xl md:text-3xl text-gray-300 mb-12 max-w-5xl mx-auto leading-relaxed">
                Transparent, predictable pricing for organizations of all sizes. 
                No hidden fees, no surprise charges.
              </p>
              
              <div className="flex items-center justify-center space-x-2 mb-8">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                ))}
                <span className="ml-4 text-white font-semibold text-lg">4.9/5 value rating from customers</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">$4.2M</div>
                  <div className="text-gray-300">Average cost savings</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-cyan-400 mb-2">ROI 450%</div>
                  <div className="text-gray-300">Within 12 months</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400 mb-2">30 Days</div>
                  <div className="text-gray-300">Free trial period</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Tables */}
        <section className="py-20 px-6 bg-slate-800">
          <div className="container mx-auto max-w-7xl">
            <Tabs defaultValue="education" className="w-full">
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
                  Choose Your<br />
                  <span className="text-green-400">Protection Level</span>
                </h2>
                <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-2 bg-slate-700">
                  <TabsTrigger value="education" className="data-[state=active]:bg-green-600 text-lg py-4">
                    <CustomGraduationCapIcon className="w-6 h-6 mr-2" size={24} />
                    Education
                  </TabsTrigger>
                  <TabsTrigger value="government" className="data-[state=active]:bg-green-600 text-lg py-4">
                    <CustomFlagIcon className="w-6 h-6 mr-2" size={24} />
                    Government
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="education">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {pricingPlans.map((plan, index) => (
                    <Card key={index} className={`bg-slate-700/60 border ${plan.color} relative ${plan.popular ? 'scale-105' : ''}`}>
                      {plan.popular && (
                        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                          <Badge className="bg-purple-600 text-white">{plan.badge}</Badge>
                        </div>
                      )}
                      <CardHeader className="p-8 text-center">
                        <Badge className="mb-4 bg-white/10 text-gray-300">{plan.badge}</Badge>
                        <CardTitle className="text-2xl text-white mb-4">{plan.name}</CardTitle>
                        <p className="text-gray-300 mb-6">{plan.description}</p>
                        <div className="text-4xl font-bold text-white mb-2">
                          {plan.price}
                          <span className="text-lg text-gray-400 font-normal">/{plan.period}</span>
                        </div>
                        <div className="text-cyan-400 font-semibold">{plan.metrics}</div>
                      </CardHeader>
                      <CardContent className="p-8 pt-0">
                        <ul className="space-y-3 mb-8">
                          {plan.features.map((feature, fIndex) => (
                            <li key={fIndex} className="flex items-center space-x-2">
                              <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                              <span className="text-gray-300 text-sm">{feature}</span>
                            </li>
                          ))}
                        </ul>
                        <Button className={`w-full text-white ${plan.buttonClass}`}>
                          Get Started
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="government">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                  {governmentPlans.map((plan, index) => (
                    <Card key={index} className={`bg-slate-700/60 border ${plan.color}`}>
                      <CardHeader className="p-8 text-center">
                        <Badge className="mb-4 bg-white/10 text-gray-300">{plan.badge}</Badge>
                        <CardTitle className="text-2xl text-white mb-4">{plan.name}</CardTitle>
                        <p className="text-gray-300 mb-6">{plan.description}</p>
                        <div className="text-4xl font-bold text-white mb-2">
                          {plan.price}
                          <span className="text-lg text-gray-400 font-normal">
                            {plan.period && `/${plan.period}`}
                          </span>
                        </div>
                      </CardHeader>
                      <CardContent className="p-8 pt-0">
                        <ul className="space-y-3 mb-8">
                          {plan.features.map((feature, fIndex) => (
                            <li key={fIndex} className="flex items-center space-x-2">
                              <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                              <span className="text-gray-300 text-sm">{feature}</span>
                            </li>
                          ))}
                        </ul>
                        <Button className={`w-full text-white ${plan.buttonClass}`}>
                          Contact Sales
                          <Phone className="ml-2 w-4 h-4" />
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Value Proposition */}
        <section className="py-20 px-6 bg-slate-900">
          <div className="container mx-auto max-w-6xl">
            <Card className="bg-slate-800/80 border border-green-500/30">
              <CardContent className="p-12 text-center">
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-8">
                  Why Organizations Choose<br />
                  <span className="text-green-400">CyberSecure AI</span>
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                  <div className="text-center">
                    <CustomShieldIcon className="w-16 h-16 text-green-400 mx-auto mb-4" size={64} />
                    <h4 className="text-xl font-bold text-white mb-2">Proven Protection</h4>
                    <p className="text-gray-300">99.7% threat detection accuracy with industry-leading response times</p>
                  </div>
                  <div className="text-center">
                    <CustomBrainIcon className="w-16 h-16 text-purple-400 mx-auto mb-4" size={64} />
                    <h4 className="text-xl font-bold text-white mb-2">AI Innovation</h4>
                    <p className="text-gray-300">Advanced machine learning models that adapt to emerging threats</p>
                  </div>
                  <div className="text-center">
                    <Crown className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
                    <h4 className="text-xl font-bold text-white mb-2">Expert Support</h4>
                    <p className="text-gray-300">24/7 access to cybersecurity experts and managed SOC services</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/trials">
                    <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-10 py-4 text-lg">
                      Start 30-Day Free Trial
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button size="lg" variant="outline" className="border-green-500 text-green-400 hover:bg-green-500/10 px-10 py-4 text-lg">
                      Talk to Sales
                      <Phone className="ml-2 w-6 h-6" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </MarketingLayout>
  );
}