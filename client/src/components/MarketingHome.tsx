import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  Brain, 
  CheckCircle, 
  Users, 
  Lock, 
  AlertTriangle,
  TrendingUp,
  Globe,
  GraduationCap,
  Flag,
  Award,
  Zap,
  Eye,
  ArrowRight,
  Bot,
  Activity,
  Settings,
  FileText,
  Target,
  Database,
  Network,
  HeadphonesIcon
} from "lucide-react";
import { Link } from "wouter";
import { MarketingLayout } from "@/components/MarketingLayout";
import { ThreatMap } from "@/components/ThreatMap";

export default function MarketingHome() {
  return (
    <MarketingLayout>
      <div className="bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white overflow-hidden">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center px-6 py-12">
          {/* Background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-conic from-blue-500/10 via-cyan-500/5 to-transparent rounded-full"></div>
          </div>
          
          <div className="relative z-10 max-w-7xl mx-auto text-center">
            <div className="mb-8">
              <Badge className="bg-blue-500/20 text-cyan-400 border-cyan-500/30 hover:bg-blue-500/30 transition-colors text-sm font-medium px-4 py-2">
                ⚡ Next-Generation Cybersecurity Platform
              </Badge>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight">
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Secure Your Digital
              </span>
              <br />
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Future Today
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
              Empower your organization with AI-powered threat detection, 
              real-time security monitoring, and comprehensive compliance management.
              Built for education, government, and enterprise.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <Link href="/client-login">
                <Button size="lg" className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold px-8 py-4 text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-cyan-500/25">
                  <Shield className="mr-2 w-6 h-6" />
                  Start Free Security Assessment
                </Button>
              </Link>
              
              <Link href="/security-playbook-simulator">
                <Button variant="outline" size="lg" className="border-2 border-gray-600 hover:border-cyan-400 text-white hover:text-cyan-400 font-semibold px-8 py-4 text-lg transition-all duration-300 bg-transparent hover:bg-cyan-500/10">
                  <Bot className="mr-2 w-6 h-6" />
                  Try Security Simulator
                </Button>
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap justify-center items-center gap-8 text-gray-400 text-sm">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-400" />
                <span>SOC 2 Type II Certified</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-blue-400" />
                <span>AES-256 Encryption</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-cyan-400" />
                <span>NIST Cybersecurity Framework</span>
              </div>
            </div>
          </div>
        </section>

        {/* Live Threat Intelligence Section */}
        <section className="py-20 px-6 bg-slate-900/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                  Real-Time Threat Intelligence
                </span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Watch live cybersecurity threats as they happen around the world. 
                Our AI-powered system processes millions of threat indicators daily.
              </p>
            </div>
            
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 backdrop-blur-sm">
              <ThreatMap />
            </div>
            
            <div className="text-center mt-8">
              <Link href="/misp-live">
                <Button className="bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30 hover:border-red-500/50">
                  <Target className="mr-2 w-5 h-5" />
                  View Full Threat Intelligence Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Key Features Grid */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  Comprehensive Security Suite
                </span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Everything you need to protect, monitor, and manage your digital infrastructure.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: <Brain className="w-12 h-12" />,
                  title: "AI-Powered Threat Detection",
                  description: "Advanced machine learning algorithms detect threats in real-time with 99.7% accuracy",
                  color: "from-purple-500 to-pink-500"
                },
                {
                  icon: <Shield className="w-12 h-12" />,
                  title: "Zero-Trust Security",
                  description: "Never trust, always verify. Comprehensive identity and access management",
                  color: "from-blue-500 to-cyan-500"
                },
                {
                  icon: <Eye className="w-12 h-12" />,
                  title: "24/7 Monitoring",
                  description: "Continuous surveillance of your network, endpoints, and cloud infrastructure",
                  color: "from-green-500 to-emerald-500"
                },
                {
                  icon: <FileText className="w-12 h-12" />,
                  title: "Compliance Management",
                  description: "FERPA, FISMA, CIPA, and other regulatory framework compliance automation",
                  color: "from-orange-500 to-red-500"
                },
                {
                  icon: <Zap className="w-12 h-12" />,
                  title: "Incident Response",
                  description: "Automated incident response with customizable playbooks and workflows",
                  color: "from-yellow-500 to-orange-500"
                },
                {
                  icon: <Database className="w-12 h-12" />,
                  title: "Secure File Sharing",
                  description: "Enterprise-grade file sharing with automatic classification and encryption",
                  color: "from-indigo-500 to-purple-500"
                }
              ].map((feature, index) => (
                <Card key={index} className="bg-slate-800/50 border-slate-700 hover:border-slate-600 transition-all duration-300 hover:transform hover:scale-105 group">
                  <CardContent className="p-8">
                    <div className={`bg-gradient-to-r ${feature.color} p-3 rounded-xl w-fit mb-6 group-hover:shadow-lg transition-shadow`}>
                      <div className="text-white">
                        {feature.icon}
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-cyan-400 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Industries Section */}
        <section className="py-20 px-6 bg-slate-900/50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                  Trusted by Leading Organizations
                </span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Specialized security solutions for education, government, and enterprise sectors.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: <GraduationCap className="w-16 h-16" />,
                  title: "K-12 Education",
                  description: "FERPA-compliant security for schools and districts",
                  link: "/solutions/k12"
                },
                {
                  icon: <Users className="w-16 h-16" />,
                  title: "Higher Education",
                  description: "Comprehensive campus cybersecurity solutions",
                  link: "/solutions/higher-ed"
                },
                {
                  icon: <Flag className="w-16 h-16" />,
                  title: "Government",
                  description: "FISMA-compliant security for public sector",
                  link: "/solutions/municipal"
                },
                {
                  icon: <Award className="w-16 h-16" />,
                  title: "Federal Agencies",
                  description: "High-security solutions for federal entities",
                  link: "/solutions/federal"
                }
              ].map((industry, index) => (
                <Link key={index} href={industry.link}>
                  <Card className="bg-slate-800/30 border-slate-700 hover:border-green-500/50 transition-all duration-300 hover:transform hover:scale-105 cursor-pointer group h-full">
                    <CardContent className="p-8 text-center">
                      <div className="text-green-400 mb-6 flex justify-center group-hover:text-green-300 transition-colors">
                        {industry.icon}
                      </div>
                      <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-green-400 transition-colors">
                        {industry.title}
                      </h3>
                      <p className="text-gray-400 leading-relaxed mb-4">
                        {industry.description}
                      </p>
                      <div className="text-green-400 group-hover:text-green-300 transition-colors font-medium">
                        Learn More <ArrowRight className="inline w-4 h-4 ml-1" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Ready to Secure Your Future?
              </span>
            </h2>
            <p className="text-xl text-gray-300 mb-12">
              Join thousands of organizations that trust CyberSecure AI to protect their digital assets.
              Start your free security assessment today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link href="/client-login">
                <Button size="lg" className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold px-10 py-4 text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-cyan-500/25">
                  <Shield className="mr-2 w-6 h-6" />
                  Get Started Free
                </Button>
              </Link>
              
              <Link href="/pricing">
                <Button variant="outline" size="lg" className="border-2 border-gray-600 hover:border-cyan-400 text-white hover:text-cyan-400 font-semibold px-10 py-4 text-lg transition-all duration-300 bg-transparent hover:bg-cyan-500/10">
                  View Pricing
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </MarketingLayout>
  );
}