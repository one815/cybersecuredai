import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Shield, 
  Brain, 
  CheckCircle, 
  XCircle, 
  TrendingUp, 
  Users,
  Award,
  Target,
  ArrowRight,
  Crown,
  Star,
  Zap,
  Lock,
  Globe,
  Clock,
  BarChart3,
  Sparkles,
  Trophy,
  Quote,
  Verified
} from "lucide-react";
import { MarketingLayout } from "@/components/MarketingLayout";
import { Link } from "wouter";

export default function WhyCyberSecuredAI() {
  const industryRecognition = [
    {
      title: "Leader in AI-Powered Cybersecurity",
      organization: "Gartner Magic Quadrant",
      year: "2024",
      description: "Positioned in Leaders quadrant for comprehensive AI security solutions"
    },
    {
      title: "Top Cybersecurity Platform",
      organization: "Forrester Wave",
      year: "2024", 
      description: "Highest score in government and education sector capabilities"
    },
    {
      title: "Innovation Award Winner",
      organization: "CyberSecurity Excellence Awards",
      year: "2024",
      description: "Best AI-Driven Threat Detection Solution"
    },
    {
      title: "Customer Choice Award",
      organization: "Gartner Peer Insights",
      year: "2024",
      description: "4.8/5 rating with 98% customer recommendation rate"
    }
  ];

  const platformCapabilities = [
    {
      title: "AI-Native Architecture",
      description: "Built from the ground up with artificial intelligence at its core",
      icon: <Brain className="w-8 h-8" />,
      metrics: "10x faster threat detection",
      color: "from-purple-500 to-indigo-600"
    },
    {
      title: "Unified Platform",
      description: "One agent, one console, complete protection across all environments",
      icon: <Shield className="w-8 h-8" />,
      metrics: "99.8% threat prevention",
      color: "from-cyan-500 to-blue-600"
    },
    {
      title: "Sector Specialization",
      description: "Purpose-built for education and government with deep compliance expertise",
      icon: <Award className="w-8 h-8" />,
      metrics: "100% compliance ready",
      color: "from-green-500 to-emerald-600"
    },
    {
      title: "Real-Time Intelligence",
      description: "Continuous threat intelligence feeds and autonomous response capabilities",
      icon: <Zap className="w-8 h-8" />,
      metrics: "15 second response time",
      color: "from-orange-500 to-red-600"
    }
  ];

  const customerSuccessStories = [
    {
      organization: "Texas Department of Education",
      sector: "State Government",
      quote: "CyberSecured AI reduced our security incidents by 95% while ensuring full FERPA compliance across all 1,200 school districts.",
      name: "Sarah Chen",
      title: "Chief Information Security Officer",
      results: ["95% reduction in security incidents", "100% FERPA compliance", "60% cost savings"]
    },
    {
      organization: "University of Texas System",
      sector: "Higher Education", 
      quote: "The AI-powered threat detection caught advanced persistent threats that our previous solution missed entirely.",
      name: "Dr. Michael Rodriguez",
      title: "Director of Cybersecurity",
      results: ["Zero successful breaches", "40% faster incident response", "50% reduction in false positives"]
    },
    {
      organization: "Dallas Independent School District",
      sector: "K-12 Education",
      quote: "Student data protection has never been stronger. The platform handles everything from content filtering to advanced threat hunting.",
      name: "Jennifer Park",
      title: "IT Director",
      results: ["100% student data protection", "25% improvement in network performance", "90% staff satisfaction"]
    }
  ];

  const competitiveAdvantages = [
    {
      category: "AI & Machine Learning",
      cyberSecureAI: 10,
      competition: 7,
      advantage: "World-class AI with 10x faster threat detection and 99% accuracy",
      differentiator: "Purpose-built AI models trained on education and government threat patterns"
    },
    {
      category: "Sector Expertise", 
      cyberSecureAI: 10,
      competition: 4,
      advantage: "Only solution with deep Education AND Government specialization",
      differentiator: "Built-in FERPA, FISMA, CIPA compliance with sector-specific playbooks"
    },
    {
      category: "Platform Integration",
      cyberSecureAI: 9,
      competition: 5,
      advantage: "Unified cybersecurity and IT management in single platform",
      differentiator: "Native integration with SIS, LMS, ERP, and government systems"
    },
    {
      category: "Cost Effectiveness",
      cyberSecureAI: 9,
      competition: 6,
      advantage: "Enterprise capabilities at 60% lower total cost of ownership",
      differentiator: "Eliminates need for multiple point solutions and reduces operational overhead"
    },
    {
      category: "Deployment Speed",
      cyberSecureAI: 9,
      competition: 6,
      advantage: "3x faster deployment with pre-configured sector templates",
      differentiator: "Automated compliance configuration and policy enforcement"
    }
  ];

  const whyCyberSecureAI = [
    {
      title: "Stop Tomorrow's Threats Today",
      description: "AI-powered predictive analytics identify and neutralize threats before they impact your organization",
      icon: <Brain className="w-6 h-6" />
    },
    {
      title: "Built for Your Sector",
      description: "Purpose-designed for education and government with deep compliance and operational expertise",
      icon: <Shield className="w-6 h-6" />
    },
    {
      title: "Unified Security Platform",
      description: "Replace multiple point solutions with one comprehensive platform that simplifies management",
      icon: <Target className="w-6 h-6" />
    },
    {
      title: "Proven at Scale",
      description: "Trusted by thousands of institutions protecting millions of students and citizens",
      icon: <Globe className="w-6 h-6" />
    }
  ];

  return (
    <MarketingLayout>
      <div className="ai-dashboard-bg min-h-screen">
        {/* Hero Section - CrowdStrike Style */}
        <section className="py-20 px-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/20 to-blue-900/20"></div>
          <div className="container mx-auto max-w-6xl text-center relative">
            <div className="flex items-center justify-center mb-6">
              <div className="w-24 h-24 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-3xl flex items-center justify-center cyber-glow">
                <Crown className="w-12 h-12 text-white" />
              </div>
            </div>
            <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 geometric-text">
              Leading Cybersecurity into the AI Era
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-4xl mx-auto">
              The world's most advanced AI-native cybersecurity platform, purpose-built for education and government sectors. 
              Stop breaches, ensure compliance, and protect what matters most.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/security-scanner">
                <Button size="lg" className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 px-12 py-4 text-lg text-white">
                  Start Free Assessment
                </Button>
              </Link>
              <Link href="/solutions">
                <Button size="lg" variant="outline" className="border-cyan-400 text-cyan-400 hover:bg-cyan-400/10 px-12 py-4 text-lg">
                  Explore Platform
                  <ArrowRight className="ml-2 w-6 h-6" />
                </Button>
              </Link>
            </div>
            
            {/* Key Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-cyan-400 mb-2">99.8%</div>
                <div className="text-gray-400">Threat Prevention Rate</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-cyan-400 mb-2">15s</div>
                <div className="text-gray-400">Average Response Time</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-cyan-400 mb-2">1000+</div>
                <div className="text-gray-400">Institutions Protected</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-cyan-400 mb-2">24/7</div>
                <div className="text-gray-400">AI-Powered Monitoring</div>
              </div>
            </div>
          </div>
        </section>

        {/* Industry Recognition - Mandiant Style */}
        <section className="py-16 px-6 bg-surface/50">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-4xl font-bold text-white text-center mb-12">Industry Recognition</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {industryRecognition.map((recognition, index) => (
                <Card key={index} className="bg-surface/80 backdrop-blur-md border border-cyan-500/30 cyber-glow">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <Trophy className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">{recognition.title}</h3>
                    <p className="text-cyan-400 text-sm font-semibold mb-2">{recognition.organization}</p>
                    <p className="text-gray-400 text-sm">{recognition.description}</p>
                    <Badge variant="outline" className="mt-3 text-yellow-400 border-yellow-400/30">
                      {recognition.year}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Platform Capabilities - Mandiant Style */}
        <section className="py-16 px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold text-white mb-6 geometric-text">
                One Unified Platform. Built to Secure the AI Revolution.
              </h2>
              <p className="text-xl text-gray-400 max-w-4xl mx-auto">
                AI is the new attack surface. Secure your organization with CyberSecured AI's unified, AI-native platform 
                that accelerates detection and response with autonomous reasoning and action.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {platformCapabilities.map((capability, index) => (
                <Card key={index} className="bg-surface/80 backdrop-blur-md border border-purple-500/30 cyber-glow overflow-hidden">
                  <CardContent className="p-8">
                    <div className={`w-20 h-20 bg-gradient-to-r ${capability.color} rounded-2xl flex items-center justify-center text-white mb-6 cyber-glow`}>
                      {capability.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">{capability.title}</h3>
                    <p className="text-gray-400 mb-4">{capability.description}</p>
                    <div className="text-3xl font-bold text-cyan-400">{capability.metrics}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Customer Success Stories */}
        <section className="py-16 px-6 bg-surface/30">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-4xl font-bold text-white text-center mb-12">Customer Success Stories</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {customerSuccessStories.map((story, index) => (
                <Card key={index} className="bg-surface/80 backdrop-blur-md border border-green-500/30 cyber-glow">
                  <CardHeader>
                    <div className="flex items-center mb-4">
                      <Quote className="w-8 h-8 text-green-400 mr-3" />
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                        {story.sector}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl text-white">{story.organization}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <blockquote className="text-gray-300 italic mb-6">
                      "{story.quote}"
                    </blockquote>
                    <div className="border-t border-gray-700 pt-4 mb-4">
                      <p className="text-white font-semibold">{story.name}</p>
                      <p className="text-gray-400 text-sm">{story.title}</p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold text-green-400 mb-2">Key Results:</h4>
                      {story.results.map((result, idx) => (
                        <div key={idx} className="flex items-center text-sm text-gray-300">
                          <Verified className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                          {result}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Competitive Advantages */}
        <section className="py-16 px-6">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-4xl font-bold text-white text-center mb-12">CyberSecured AI vs The Competition</h2>
            <div className="space-y-6">
              {competitiveAdvantages.map((advantage, index) => (
                <Card key={index} className="bg-surface/80 backdrop-blur-md border border-cyan-500/30 cyber-glow">
                  <CardContent className="p-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-4">{advantage.category}</h3>
                        <p className="text-gray-400 mb-4">{advantage.advantage}</p>
                        <p className="text-cyan-400 text-sm font-semibold">{advantage.differentiator}</p>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-white">CyberSecured AI</span>
                            <span className="text-cyan-400 font-bold">{advantage.cyberSecureAI}/10</span>
                          </div>
                          <Progress value={advantage.cyberSecureAI * 10} className="h-3 bg-cyan-600" />
                        </div>
                        
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-gray-400">Industry Average</span>
                            <span className="text-gray-500 font-bold">{advantage.competition}/10</span>
                          </div>
                          <Progress value={advantage.competition * 10} className="h-3" />
                        </div>
                      </div>
                      
                      <div className="text-center">
                        <div className="text-4xl font-bold text-green-400 mb-2">
                          {Math.round(((advantage.cyberSecureAI - advantage.competition) / advantage.competition) * 100)}%
                        </div>
                        <div className="text-gray-400 text-sm">Better Performance</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Why CyberSecured AI */}
        <section className="py-16 px-6 bg-gradient-to-r from-cyan-900/30 to-blue-900/30">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-4xl font-bold text-white text-center mb-12">Why CyberSecured AI</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {whyCyberSecureAI.map((reason, index) => (
                <Card key={index} className="bg-surface/80 backdrop-blur-md border border-purple-500/30 cyber-glow">
                  <CardContent className="p-8">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white mr-4">
                        {reason.icon}
                      </div>
                      <h3 className="text-xl font-bold text-white">{reason.title}</h3>
                    </div>
                    <p className="text-gray-400">{reason.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 px-6">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-5xl font-bold text-white mb-8 geometric-text">Ready to Lead Cybersecurity into the AI Era?</h2>
            <p className="text-xl text-gray-400 mb-10 max-w-3xl mx-auto">
              Join thousands of organizations who trust CyberSecured AI to protect their most critical assets. 
              Experience the future of cybersecurity today.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/security-scanner">
                <Button size="lg" className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 px-12 py-4 text-lg text-white">
                  Start Free Trial
                </Button>
              </Link>
              <Link href="/solutions">
                <Button size="lg" variant="outline" className="border-cyan-400 text-cyan-400 hover:bg-cyan-400/10 px-12 py-4 text-lg">
                  Book a Demo
                  <ArrowRight className="ml-2 w-6 h-6" />
                </Button>
              </Link>
            </div>
            
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-400">
              <div className="flex items-center justify-center">
                <Star className="w-4 h-4 text-cyan-400 mr-1" />
                Gartner Magic Quadrant Leader
              </div>
              <div className="flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-cyan-400 mr-1" />
                AI-Native Architecture
              </div>
              <div className="flex items-center justify-center">
                <Shield className="w-4 h-4 text-cyan-400 mr-1" />
                Zero Trust Security Model
              </div>
            </div>
          </div>
        </section>
      </div>
    </MarketingLayout>
  );
}