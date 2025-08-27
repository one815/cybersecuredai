import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Brain, 
  Shield, 
  Users, 
  CheckCircle,
  ArrowRight,
  Star,
  ExternalLink,
  Target,
  Award,
  Globe,
  GraduationCap,
  Flag,
  Building,
  Network,
  Lock,
  Eye,
  FileText
} from "lucide-react";
import {
  CustomShieldIcon,
  CustomBrainIcon,
  CustomGlobeIcon,
  CustomGraduationCapIcon,
  CustomFlagIcon,
  CustomTargetIcon,
  CustomZapIcon,
  CustomEyeIcon,
  CustomFileTextIcon,
  CustomDatabaseIcon
} from "@/components/CustomIcons";
import { Link } from "wouter";
import { MarketingLayout } from "@/components/MarketingLayout";

// Professional solution images
import managedEdrImg from "@assets/generated_images/AI_Threat_Detection_Engine_58460592.png";
import complianceImg from "@assets/generated_images/Federal_Compliance_Certification_2faa9e41.png";
import educationImg from "@assets/generated_images/Academic_Security_Framework_75c0b524.png";
import governmentImg from "@assets/generated_images/Government_AI_Security_Fundamentals_722b26ac.png";
import platformImg from "@assets/generated_images/Platform_Overview_Datasheet_3d239cec.png";
import threatReportImg from "@assets/generated_images/Threat_Report_2025_Cover_50b3edd9.png";

export default function Solutions() {
  const customerTestimonials = [
    {
      quote: "We pushed CyberSecure AI out to four different campuses. What we found was that one site was clean, two sites had remnants, and one site had an active threat. That was eye-opening to us, and we knew we needed to install this for every one of our institutions.",
      name: "Dr. Sarah Chen",
      title: "University System Chancellor",
      company: "State University System",
      image: educationImg
    },
    {
      quote: "We rolled out CyberSecure AI to our entire network of 90+ agencies over 30 days. We wanted to ensure every endpoint was protected as remote work became dominant. Today, we can rest assured knowing CyberSecure AI plays a vital role in our security infrastructure.",
      name: "General Patricia Martinez",
      title: "Chief Information Officer", 
      company: "Federal Agency Alliance",
      image: governmentImg
    },
    {
      quote: "The alert from CyberSecure AI gave us clear understanding of the threat we were dealing with and which users were affected, making it easy to respond immediately. The platform truly delivered - we contained the breach within twenty minutes.",
      name: "Marcus Rodriguez",
      title: "Director of IT Security",
      company: "Metropolitan School District",
      image: complianceImg
    }
  ];

  return (
    <MarketingLayout>
      <div className="min-h-screen bg-slate-900">
        
        {/* Huntress-Style Bold Hero */}
        <section className="relative py-24 px-6 bg-gradient-to-br from-slate-900 via-red-900/20 to-slate-900">
          <div className="absolute inset-0 bg-grid-white/[0.02]"></div>
          <div className="container mx-auto max-w-7xl relative z-10">
            <div className="text-center mb-20">
              <h1 className="text-6xl md:text-8xl font-bold text-white mb-8 leading-tight">
                Threats Eliminated.<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-500">
                  Institutions Secured.
                </span>
              </h1>
              <p className="text-2xl md:text-3xl text-gray-300 mb-12 max-w-5xl mx-auto leading-relaxed">
                Purpose-built cybersecurity solutions for educational institutions and government agencies, 
                all backed by our industry-proven, 24/7 AI-assisted SOC for continuous protection.
              </p>
              <p className="text-xl text-cyan-400 font-semibold mb-16">
                Enterprise-grade cybersecurity for ALL organizations.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
                <Link href="/trials">
                  <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white px-10 py-4 text-lg font-semibold">
                    Start for Free
                  </Button>
                </Link>
                <Link href="/demo">
                  <Button size="lg" variant="outline" className="border-red-500 text-red-400 hover:bg-red-500/10 px-10 py-4 text-lg font-semibold">
                    Get a Demo
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              </div>

              {/* Social Proof */}
              <div className="flex items-center justify-center space-x-2 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-gray-300 text-lg">
                <strong>4.9/5 based on hundreds of customer reviews</strong>
              </p>
            </div>
          </div>
        </section>

        {/* Purpose-Built Solutions */}
        <section className="py-20 px-6 bg-slate-800">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-bold text-white mb-8">
                Purpose-Built<br />
                <span className="text-cyan-400">Solutions</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Managed AI Threat Detection */}
              <Card className="bg-slate-700/60 border border-cyan-500/30 hover:border-cyan-400/60 transition-all duration-300 group cursor-pointer">
                <CardHeader className="p-8 text-center">
                  <div className="w-20 h-20 bg-cyan-500/20 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:bg-cyan-500/30 transition-colors">
                    <CustomBrainIcon className="w-10 h-10 text-cyan-400" size={40} />
                  </div>
                  <CardTitle className="text-xl text-white mb-4">Managed AI Threat Detection</CardTitle>
                  <p className="text-gray-300 text-sm mb-6">
                    Defend against attacks as they're happening with AI-powered threat detection and response.
                  </p>
                </CardHeader>
                <CardContent className="p-8 pt-0">
                  <Button variant="outline" className="w-full border-cyan-500 text-cyan-400 hover:bg-cyan-500/10">
                    Learn More
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>

              {/* Managed Compliance */}
              <Card className="bg-slate-700/60 border border-green-500/30 hover:border-green-400/60 transition-all duration-300 group cursor-pointer">
                <CardHeader className="p-8 text-center">
                  <div className="w-20 h-20 bg-green-500/20 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:bg-green-500/30 transition-colors">
                    <CustomFileTextIcon className="w-10 h-10 text-green-400" size={40} />
                  </div>
                  <CardTitle className="text-xl text-white mb-4">Managed Compliance</CardTitle>
                  <p className="text-gray-300 text-sm mb-6">
                    Protect your regulatory requirements with automated FERPA, FISMA, and CIPA compliance.
                  </p>
                </CardHeader>
                <CardContent className="p-8 pt-0">
                  <Button variant="outline" className="w-full border-green-500 text-green-400 hover:bg-green-500/10">
                    Learn More
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>

              {/* Managed Security Training */}
              <Card className="bg-slate-700/60 border border-purple-500/30 hover:border-purple-400/60 transition-all duration-300 group cursor-pointer">
                <CardHeader className="p-8 text-center">
                  <div className="w-20 h-20 bg-purple-500/20 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:bg-purple-500/30 transition-colors">
                    <Users className="w-10 h-10 text-purple-400" />
                  </div>
                  <CardTitle className="text-xl text-white mb-4">Managed Security Training</CardTitle>
                  <p className="text-gray-300 text-sm mb-6">
                    Enable your teams to identify and avoid phishing attacks, malware, and social engineering.
                  </p>
                </CardHeader>
                <CardContent className="p-8 pt-0">
                  <Button variant="outline" className="w-full border-purple-500 text-purple-400 hover:bg-purple-500/10">
                    Learn More
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>

              {/* Managed SOC */}
              <Card className="bg-slate-700/60 border border-orange-500/30 hover:border-orange-400/60 transition-all duration-300 group cursor-pointer">
                <CardHeader className="p-8 text-center">
                  <div className="w-20 h-20 bg-orange-500/20 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:bg-orange-500/30 transition-colors">
                    <CustomEyeIcon className="w-10 h-10 text-orange-400" size={40} />
                  </div>
                  <CardTitle className="text-xl text-white mb-4">Managed SOC</CardTitle>
                  <p className="text-gray-300 text-sm mb-6">
                    Capture the security data that matters while filtering out the noise with 24/7 monitoring.
                  </p>
                </CardHeader>
                <CardContent className="p-8 pt-0">
                  <Button variant="outline" className="w-full border-orange-500 text-orange-400 hover:bg-orange-500/10">
                    Learn More
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Authority Metrics - Huntress Style */}
        <section className="py-20 px-6 bg-slate-900">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
                Empowering the Educational<br />
                <span className="text-cyan-400">and Government Sector</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-4xl mx-auto mb-16">
                CyberSecure AI is custom built for you. But don't take our word for it – 
                hear directly from institutions like yours.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
              <Card className="bg-slate-800/60 border border-cyan-500/30 text-center">
                <CardContent className="p-8">
                  <div className="text-4xl md:text-5xl font-bold text-cyan-400 mb-4">500K+</div>
                  <div className="text-white font-semibold mb-2">Students Protected</div>
                  <div className="text-gray-400">Educational institutions secured</div>
                </CardContent>
              </Card>
              
              <Card className="bg-slate-800/60 border border-green-500/30 text-center">
                <CardContent className="p-8">
                  <div className="text-4xl md:text-5xl font-bold text-green-400 mb-4">2M+</div>
                  <div className="text-white font-semibold mb-2">Endpoints Managed</div>
                  <div className="text-gray-400">Devices under protection</div>
                </CardContent>
              </Card>
              
              <Card className="bg-slate-800/60 border border-purple-500/30 text-center">
                <CardContent className="p-8">
                  <div className="text-4xl md:text-5xl font-bold text-purple-400 mb-4">1.2M+</div>
                  <div className="text-white font-semibold mb-2">Identities Protected</div>
                  <div className="text-gray-400">User accounts secured</div>
                </CardContent>
              </Card>
              
              <Card className="bg-slate-800/60 border border-orange-500/30 text-center">
                <CardContent className="p-8">
                  <div className="text-4xl md:text-5xl font-bold text-orange-400 mb-4">300+</div>
                  <div className="text-white font-semibold mb-2">Partners</div>
                  <div className="text-gray-400">Technology integrations</div>
                </CardContent>
              </Card>
            </div>

            <div className="text-center">
              <Link href="/case-studies">
                <Button size="lg" variant="outline" className="border-cyan-500 text-cyan-400 hover:bg-cyan-500/10 px-8 py-4">
                  Learn More About Our Success
                  <ExternalLink className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* 2025 Threat Report CTA */}
        <section className="py-16 px-6 bg-gradient-to-r from-red-900/30 to-orange-900/30">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge className="mb-6 bg-red-500/20 text-red-300 border-red-500/30">
                  Latest Intelligence
                </Badge>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  CyberSecure AI 2025<br />
                  <span className="text-red-400">Cyber Threat Report</span>
                </h2>
                <p className="text-xl text-gray-300 mb-8">
                  Get details on the cyberattacks we saw most last year, learn key industry insights, 
                  and build strategies to outsmart the most sophisticated threat actors.
                </p>
                <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white px-8 py-4">
                  Download the Threat Report
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
              <div>
                <img 
                  src={threatReportImg}
                  alt="2025 Cyber Threat Report"
                  className="w-full max-w-md mx-auto rounded-xl shadow-2xl border border-red-500/30"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Industry-Specific Solutions */}
        <section className="py-20 px-6 bg-slate-800">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
                Built for Your<br />
                <span className="text-cyan-400">Industry</span>
              </h2>
            </div>

            <Tabs defaultValue="education" className="max-w-6xl mx-auto">
              <TabsList className="grid w-full grid-cols-2 mb-12 bg-slate-700">
                <TabsTrigger value="education" className="data-[state=active]:bg-cyan-600 text-lg py-4">
                  <CustomGraduationCapIcon className="w-6 h-6 mr-2" size={24} />
                  Education
                </TabsTrigger>
                <TabsTrigger value="government" className="data-[state=active]:bg-cyan-600 text-lg py-4">
                  <CustomFlagIcon className="w-6 h-6 mr-2" size={24} />
                  Government
                </TabsTrigger>
              </TabsList>

              <TabsContent value="education" className="space-y-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                  <div>
                    <Badge className="mb-6 bg-blue-500/20 text-blue-300 border-blue-500/30">
                      K-12 & Higher Education
                    </Badge>
                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
                      Protecting Student Data<br />
                      <span className="text-blue-400">& Academic Freedom</span>
                    </h3>
                    <p className="text-lg text-gray-300 mb-8">
                      Purpose-built for educational institutions with FERPA compliance, 
                      student privacy protection, and academic research security.
                    </p>
                    
                    <div className="space-y-4 mb-8">
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-400" />
                        <span className="text-gray-300">FERPA & COPPA compliance automation</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-400" />
                        <span className="text-gray-300">Student data protection & privacy</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-400" />
                        <span className="text-gray-300">Campus network security monitoring</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-400" />
                        <span className="text-gray-300">Research data protection</span>
                      </div>
                    </div>

                    <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4">
                      Explore Education Solutions
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </div>
                  <div>
                    <img 
                      src={educationImg}
                      alt="Education Security Solutions"
                      className="w-full rounded-xl shadow-2xl border border-blue-500/20"
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="government" className="space-y-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                  <div>
                    <Badge className="mb-6 bg-red-500/20 text-red-300 border-red-500/30">
                      Federal, State & Local Government
                    </Badge>
                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
                      Securing Critical<br />
                      <span className="text-red-400">Government Infrastructure</span>
                    </h3>
                    <p className="text-lg text-gray-300 mb-8">
                      Built for government agencies with FISMA compliance, classified data protection, 
                      and multi-agency collaboration capabilities.
                    </p>
                    
                    <div className="space-y-4 mb-8">
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-400" />
                        <span className="text-gray-300">FISMA & FedRAMP compliance</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-400" />
                        <span className="text-gray-300">Classified data protection protocols</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-400" />
                        <span className="text-gray-300">Inter-agency threat intelligence sharing</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-400" />
                        <span className="text-gray-300">Critical infrastructure monitoring</span>
                      </div>
                    </div>

                    <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white px-8 py-4">
                      Explore Government Solutions
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </div>
                  <div>
                    <img 
                      src={governmentImg}
                      alt="Government Security Solutions"
                      className="w-full rounded-xl shadow-2xl border border-red-500/20"
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Customer Success Stories - Huntress Style */}
        <section className="py-20 px-6 bg-slate-900">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
                Protecting Organizations<br />
                <span className="text-cyan-400">Like Yours</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {customerTestimonials.map((testimonial, index) => (
                <Card key={index} className="bg-slate-800/60 border border-cyan-500/30 overflow-hidden">
                  <CardContent className="p-8">
                    <div className="flex items-center space-x-1 mb-6">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                    <blockquote className="text-gray-300 italic mb-6 leading-relaxed">
                      "{testimonial.quote}"
                    </blockquote>
                    <div className="flex items-center space-x-4">
                      <img 
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full border-2 border-cyan-500/30 object-cover"
                      />
                      <div>
                        <div className="text-white font-semibold">{testimonial.name}</div>
                        <div className="text-cyan-400 text-sm">{testimonial.title}</div>
                        <div className="text-gray-400 text-sm">{testimonial.company}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Platform Showcase */}
        <section className="py-20 px-6 bg-slate-800">
          <div className="container mx-auto max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <Badge className="mb-6 bg-purple-500/20 text-purple-300 border-purple-500/30">
                  Complete Platform
                </Badge>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
                  Leading the Charge for<br />
                  <span className="text-purple-400">Managed Cybersecurity</span>
                </h2>
                <p className="text-xl text-gray-300 mb-8">
                  See how CyberSecure AI Managed Security stacks up against enterprise-first platforms – 
                  reviewed by organizations just like yours.
                </p>
                
                <div className="flex items-center space-x-2 mb-6">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                  ))}
                  <span className="ml-4 text-white font-semibold">4.9/5 based on hundreds of reviews</span>
                </div>

                <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4">
                  Read Customer Reviews
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>

              <div className="relative">
                <img 
                  src={platformImg}
                  alt="Platform Dashboard"
                  className="w-full rounded-xl shadow-2xl border border-purple-500/20"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-500/10 to-transparent rounded-xl"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Solution Categories */}
        <section className="py-20 px-6 bg-slate-900">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
                Comprehensive Security<br />
                <span className="text-cyan-400">Architecture</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Threat Detection */}
              <Card className="bg-slate-800/60 border border-red-500/30 hover:border-red-400/60 transition-colors">
                <CardHeader className="p-8 text-center">
                  <CustomTargetIcon className="w-16 h-16 text-red-400 mx-auto mb-6" size={64} />
                  <CardTitle className="text-2xl text-white mb-4">AI Threat Detection</CardTitle>
                  <p className="text-gray-300">
                    Advanced machine learning models for real-time threat identification and response
                  </p>
                </CardHeader>
                <CardContent className="p-8 pt-0">
                  <ul className="space-y-2 text-gray-400 mb-6">
                    <li>• Neural network analysis</li>
                    <li>• Behavioral anomaly detection</li>
                    <li>• Predictive threat modeling</li>
                    <li>• 8-minute mean response time</li>
                  </ul>
                  <Button variant="outline" className="w-full border-red-500 text-red-400 hover:bg-red-500/10">
                    Learn More
                  </Button>
                </CardContent>
              </Card>

              {/* Identity Protection */}
              <Card className="bg-slate-800/60 border border-blue-500/30 hover:border-blue-400/60 transition-colors">
                <CardHeader className="p-8 text-center">
                  <CustomShieldIcon className="w-16 h-16 text-blue-400 mx-auto mb-6" size={64} />
                  <CardTitle className="text-2xl text-white mb-4">Identity Security</CardTitle>
                  <p className="text-gray-300">
                    Comprehensive identity and access management with multi-factor authentication
                  </p>
                </CardHeader>
                <CardContent className="p-8 pt-0">
                  <ul className="space-y-2 text-gray-400 mb-6">
                    <li>• Multi-factor authentication</li>
                    <li>• Role-based access control</li>
                    <li>• Identity threat detection</li>
                    <li>• Single sign-on integration</li>
                  </ul>
                  <Button variant="outline" className="w-full border-blue-500 text-blue-400 hover:bg-blue-500/10">
                    Learn More
                  </Button>
                </CardContent>
              </Card>

              {/* Compliance Automation */}
              <Card className="bg-slate-800/60 border border-green-500/30 hover:border-green-400/60 transition-colors">
                <CardHeader className="p-8 text-center">
                  <CustomFileTextIcon className="w-16 h-16 text-green-400 mx-auto mb-6" size={64} />
                  <CardTitle className="text-2xl text-white mb-4">Compliance Automation</CardTitle>
                  <p className="text-gray-300">
                    Automated regulatory compliance with continuous monitoring and reporting
                  </p>
                </CardHeader>
                <CardContent className="p-8 pt-0">
                  <ul className="space-y-2 text-gray-400 mb-6">
                    <li>• FERPA/FISMA/CIPA certified</li>
                    <li>• Automated audit reports</li>
                    <li>• Policy enforcement</li>
                    <li>• Risk assessment dashboards</li>
                  </ul>
                  <Button variant="outline" className="w-full border-green-500 text-green-400 hover:bg-green-500/10">
                    Learn More
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
              Ready to Transform<br />
              <span className="text-cyan-400">Your Security?</span>
            </h2>
            <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
              Join hundreds of educational institutions and government agencies 
              who trust CyberSecure AI for enterprise-grade protection.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/trials">
                <Button size="lg" className="bg-cyan-600 hover:bg-cyan-700 text-white px-10 py-4 text-lg">
                  Start Free Trial
                </Button>
              </Link>
              <Link href="/demo">
                <Button size="lg" variant="outline" className="border-cyan-500 text-cyan-400 hover:bg-cyan-500/10 px-10 py-4 text-lg">
                  Schedule Demo
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