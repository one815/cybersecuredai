import { useState } from "react";
import { MarketingLayout } from "@/components/MarketingLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Shield, 
  Brain, 
  Users, 
  Award, 
  Target, 
  CheckCircle,
  TrendingUp,
  Globe,
  ArrowRight,
  ExternalLink,
  Star,
  Building
} from "lucide-react";
import {
  CustomShieldIcon,
  CustomBrainIcon,
  CustomGlobeIcon,
  CustomGraduationCapIcon,
  CustomFlagIcon,
  CustomTargetIcon,
  Enhanced4DShieldIcon,
  Enhanced4DBrainIcon,
  Enhanced4DTargetIcon
} from "@/components/CustomIcons";
import { Link } from "wouter";

// Import professional images
import leadershipImg from "@assets/generated_images/Cybersecurity_Podcast_Studio_526ffd72.png";
import innovationImg from "@assets/generated_images/AI_Security_Implementation_d7886bac.png";
import complianceImg from "@assets/generated_images/Federal_Compliance_Certification_2faa9e41.png";
import platformImg from "@assets/generated_images/Security_Analytics_Dashboard_ca1f5822.png";
import researchImg from "@assets/generated_images/Academic_Research_AI_Security_8041a1e2.png";
import governmentImg from "@assets/generated_images/Government_AI_Security_Fundamentals_722b26ac.png";

export default function AboutUs() {
  const [activeMetric, setActiveMetric] = useState(0);

  const keyMetrics = [
    { value: "500K+", label: "Students Protected", description: "Educational institutions secured" },
    { value: "98.7%", label: "Threat Detection Rate", description: "AI-powered accuracy" },
    { value: "24/7", label: "Continuous Monitoring", description: "Real-time protection" },
    { value: "15+", label: "Compliance Frameworks", description: "FERPA, FISMA, CIPA certified" }
  ];

  const recognitions = [
    {
      logo: "Gartner",
      title: "Named a Leader in the 2025 Gartner Magic Quadrant for AI-Powered Cybersecurity Platforms",
      year: "2025",
      category: "Market Leadership"
    },
    {
      logo: "Forrester", 
      title: "Recognized as a Strong Performer in Educational Cybersecurity Solutions",
      year: "2024",
      category: "Innovation Excellence"
    },
    {
      logo: "NIST",
      title: "Awarded NIST Cybersecurity Framework Excellence Recognition",
      year: "2024",
      category: "Technical Leadership"
    }
  ];

  const leadershipTeam = [
    {
      name: "Dr. Sarah Chen",
      title: "Chief Executive Officer",
      background: "Former NSA Cybersecurity Director",
      image: leadershipImg,
      credentials: "PhD Computer Science, MIT"
    },
    {
      name: "Marcus Rodriguez",
      title: "Chief Technology Officer", 
      background: "Ex-Google AI Security Lead",
      image: innovationImg,
      credentials: "MS Cybersecurity, Stanford"
    },
    {
      name: "General Patricia Martinez",
      title: "Chief Strategy Officer",
      background: "Former NSA Director",
      image: governmentImg,
      credentials: "25+ years federal cybersecurity"
    }
  ];

  return (
    <MarketingLayout>
      <div className="min-h-screen bg-slate-900">
        
        {/* Authority Hero */}
        <section className="relative py-24 px-6 bg-gradient-to-br from-slate-900 via-blue-900/20 to-slate-900">
          <div className="absolute inset-0 bg-grid-white/[0.02]"></div>
          <div className="container mx-auto max-w-7xl relative z-10">
            <div className="text-center mb-20">
              <Badge className="mb-8 bg-cyan-500/20 text-cyan-300 border-cyan-500/30 text-lg px-6 py-3">
                Industry Authority in AI-Powered Cybersecurity
              </Badge>
              <h1 className="text-6xl md:text-7xl font-bold text-white mb-8 leading-tight">
                Leading the Future<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                  of Cyber Defense
                </span>
              </h1>
              <p className="text-2xl text-gray-300 mb-16 max-w-4xl mx-auto leading-relaxed">
                Trusted by 500+ educational institutions and government agencies worldwide. 
                Our AI-powered platform protects critical infrastructure while enabling innovation.
              </p>
            </div>

            {/* Key Metrics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
              {keyMetrics.map((metric, index) => (
                <Card 
                  key={index}
                  className={`bg-slate-800/60 border transition-all duration-300 cursor-pointer ${
                    activeMetric === index ? 'border-cyan-400/60' : 'border-gray-700/50'
                  }`}
                  onMouseEnter={() => setActiveMetric(index)}
                >
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl md:text-4xl font-bold text-cyan-400 mb-2">{metric.value}</div>
                    <div className="text-white font-semibold mb-1">{metric.label}</div>
                    <div className="text-gray-400 text-sm">{metric.description}</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Authority Image */}
            <div className="max-w-5xl mx-auto">
              <img 
                src={platformImg}
                alt="CyberSecure AI Platform Authority"
                className="w-full rounded-2xl shadow-2xl border border-cyan-500/20"
              />
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20 px-6 bg-slate-800">
          <div className="container mx-auto max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <Badge className="mb-6 bg-blue-500/20 text-blue-300 border-blue-500/30">
                  Our Mission
                </Badge>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
                  Protecting the institutions<br />
                  <span className="text-blue-400">that shape our future</span>
                </h2>
                <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                  We exist to safeguard educational institutions and government agencies with 
                  cutting-edge AI-powered cybersecurity solutions that enable, rather than hinder, 
                  innovation and growth.
                </p>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-cyan-500/20 rounded-full flex items-center justify-center">
                      <Enhanced4DShieldIcon className="w-4 h-4 text-cyan-400" size={16} />
                    </div>
                    <span className="text-gray-300">Proactive threat prevention and response</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                    </div>
                    <span className="text-gray-300">Regulatory compliance automation</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center">
                      <Enhanced4DBrainIcon className="w-4 h-4 text-purple-400" size={16} />
                    </div>
                    <span className="text-gray-300">AI-driven security intelligence</span>
                  </div>
                </div>

                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4">
                  Learn About Our Platform
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>

              <div className="relative">
                <img 
                  src={innovationImg}
                  alt="CyberSecure AI Innovation"
                  className="w-full rounded-xl shadow-2xl border border-blue-500/20"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-500/10 to-transparent rounded-xl"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Industry Recognition */}
        <section className="py-20 px-6 bg-slate-900">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <Badge className="mb-6 bg-yellow-500/20 text-yellow-300 border-yellow-500/30">
                Industry Recognition
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
                Recognized by Leading<br />
                <span className="text-yellow-400">Industry Analysts</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {recognitions.map((recognition, index) => (
                <Card key={index} className="bg-slate-800/60 border border-yellow-500/30 hover:border-yellow-400/60 transition-colors">
                  <CardHeader className="text-center p-8">
                    <div className="text-2xl font-bold text-yellow-400 mb-4">{recognition.logo}</div>
                    <Badge variant="outline" className="text-yellow-300 border-yellow-500 mb-4">
                      {recognition.year}
                    </Badge>
                    <CardTitle className="text-lg text-white leading-tight">{recognition.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-8 pt-0">
                    <Badge className="bg-yellow-500/20 text-yellow-300 text-sm">
                      {recognition.category}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Leadership Team */}
        <section className="py-20 px-6 bg-slate-800">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-16">
              <Badge className="mb-6 bg-purple-500/20 text-purple-300 border-purple-500/30">
                Leadership Excellence
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
                Led by Industry<br />
                <span className="text-purple-400">Visionaries</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Our executive team brings decades of experience from NSA, Google, MIT, 
                and leading cybersecurity organizations.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {leadershipTeam.map((leader, index) => (
                <Card key={index} className="bg-slate-700/50 border border-purple-500/30 overflow-hidden">
                  <div className="relative h-64">
                    <img 
                      src={leader.image}
                      alt={leader.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
                  </div>
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold text-white mb-2">{leader.name}</h3>
                    <p className="text-purple-400 font-semibold mb-4">{leader.title}</p>
                    <p className="text-gray-300 mb-4">{leader.background}</p>
                    <Badge variant="outline" className="text-gray-400 border-gray-600">
                      {leader.credentials}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Customer Success Stories */}
        <section className="py-20 px-6 bg-slate-900">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-16">
              <Badge className="mb-6 bg-green-500/20 text-green-300 border-green-500/30">
                Customer Success
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
                Trusted by the Organizations<br />
                <span className="text-green-400">That Matter Most</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Government Success */}
              <Card className="bg-slate-800/60 border border-blue-500/30">
                <CardHeader className="p-8">
                  <div className="flex items-center space-x-4 mb-6">
                    <CustomFlagIcon className="w-12 h-12 text-blue-400" size={48} />
                    <div>
                      <h3 className="text-2xl font-bold text-white">Federal Government</h3>
                      <p className="text-blue-400">Department of Education</p>
                    </div>
                  </div>
                  <img 
                    src={governmentImg}
                    alt="Government Implementation"
                    className="w-full h-48 object-cover rounded-lg mb-6"
                  />
                </CardHeader>
                <CardContent className="p-8 pt-0">
                  <blockquote className="text-lg text-gray-300 italic mb-6">
                    "CyberSecure AI has transformed our security posture. The AI-powered threat detection 
                    has prevented multiple sophisticated attacks while maintaining our operational efficiency."
                  </blockquote>
                  <div className="text-gray-400">
                    <strong>James Wilson</strong><br />
                    Chief Information Security Officer
                  </div>
                </CardContent>
              </Card>

              {/* Education Success */}
              <Card className="bg-slate-800/60 border border-green-500/30">
                <CardHeader className="p-8">
                  <div className="flex items-center space-x-4 mb-6">
                    <CustomGraduationCapIcon className="w-12 h-12 text-green-400" size={48} />
                    <div>
                      <h3 className="text-2xl font-bold text-white">Higher Education</h3>
                      <p className="text-green-400">Major University System</p>
                    </div>
                  </div>
                  <img 
                    src={researchImg}
                    alt="University Implementation"
                    className="w-full h-48 object-cover rounded-lg mb-6"
                  />
                </CardHeader>
                <CardContent className="p-8 pt-0">
                  <blockquote className="text-lg text-gray-300 italic mb-6">
                    "The integration with our existing systems was seamless. We now have complete 
                    visibility across our entire network with automated compliance reporting."
                  </blockquote>
                  <div className="text-gray-400">
                    <strong>Dr. Michael Thompson</strong><br />
                    Chief Information Security Officer
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Company Values & Innovation */}
        <section className="py-20 px-6 bg-slate-800">
          <div className="container mx-auto max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="relative">
                <img 
                  src={complianceImg}
                  alt="Innovation and Compliance"
                  className="w-full rounded-xl shadow-2xl border border-cyan-500/20"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/10 to-transparent rounded-xl"></div>
              </div>
              
              <div>
                <Badge className="mb-6 bg-cyan-500/20 text-cyan-300 border-cyan-500/30">
                  Innovation Excellence
                </Badge>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
                  Built on a Foundation of<br />
                  <span className="text-cyan-400">Trust & Innovation</span>
                </h2>
                
                <div className="space-y-6 mb-8">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-3">Security First</h3>
                    <p className="text-gray-300">
                      Every feature is designed with security as the primary consideration, 
                      ensuring your data and operations remain protected.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold text-white mb-3">AI Innovation</h3>
                    <p className="text-gray-300">
                      Cutting-edge artificial intelligence and machine learning models 
                      provide unmatched threat detection and prevention capabilities.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold text-white mb-3">Regulatory Excellence</h3>
                    <p className="text-gray-300">
                      Purpose-built for educational and government compliance requirements 
                      including FERPA, FISMA, and CIPA standards.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="bg-cyan-600 hover:bg-cyan-700 text-white px-8 py-4">
                    Explore Our Technology
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                  <Button size="lg" variant="outline" className="border-cyan-500 text-cyan-400 hover:bg-cyan-500/10 px-8 py-4">
                    View Case Studies
                    <ExternalLink className="ml-2 w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Research & Development */}
        <section className="py-20 px-6 bg-slate-900">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-16">
              <Badge className="mb-6 bg-purple-500/20 text-purple-300 border-purple-500/30">
                Research & Development
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
                Advancing Cybersecurity<br />
                <span className="text-purple-400">Through Research</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-4xl mx-auto">
                Our dedicated research team collaborates with leading universities and 
                government labs to stay ahead of emerging threats.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="bg-slate-800/60 border border-cyan-500/30">
                <CardContent className="p-8 text-center">
                  <Enhanced4DBrainIcon className="w-16 h-16 text-cyan-400 mx-auto mb-6" size={64} />
                  <h3 className="text-xl font-bold text-white mb-4">AI Research Lab</h3>
                  <p className="text-gray-300 mb-6">
                    Advanced machine learning research for next-generation threat detection
                  </p>
                  <div className="text-2xl font-bold text-cyan-400">12+</div>
                  <div className="text-gray-400">Active Research Projects</div>
                </CardContent>
              </Card>
              
              <Card className="bg-slate-800/60 border border-green-500/30">
                <CardContent className="p-8 text-center">
                  <Award className="w-16 h-16 text-green-400 mx-auto mb-6" />
                  <h3 className="text-xl font-bold text-white mb-4">Academic Partnerships</h3>
                  <p className="text-gray-300 mb-6">
                    Collaborations with top universities on cybersecurity research
                  </p>
                  <div className="text-2xl font-bold text-green-400">25+</div>
                  <div className="text-gray-400">University Partners</div>
                </CardContent>
              </Card>
              
              <Card className="bg-slate-800/60 border border-purple-500/30">
                <CardContent className="p-8 text-center">
                  <Globe className="w-16 h-16 text-purple-400 mx-auto mb-6" />
                  <h3 className="text-xl font-bold text-white mb-4">Global Intelligence</h3>
                  <p className="text-gray-300 mb-6">
                    Worldwide threat intelligence network and data sharing
                  </p>
                  <div className="text-2xl font-bold text-purple-400">50+</div>
                  <div className="text-gray-400">Intelligence Sources</div>
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
              <span className="text-cyan-400">Your Security Posture?</span>
            </h2>
            <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
              Join hundreds of educational institutions and government agencies 
              who trust CyberSecure AI to protect their most critical assets.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/contact">
                <Button size="lg" className="bg-cyan-600 hover:bg-cyan-700 text-white px-10 py-4 text-lg">
                  Schedule a Demo
                  <ArrowRight className="ml-2 w-6 h-6" />
                </Button>
              </Link>
              <Link href="/security-scanner">
                <Button size="lg" variant="outline" className="border-cyan-500 text-cyan-400 hover:bg-cyan-500/10 px-10 py-4 text-lg">
                  Free Security Assessment
                  <Enhanced4DTargetIcon className="ml-2 w-6 h-6" size={24} />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </MarketingLayout>
  );
}