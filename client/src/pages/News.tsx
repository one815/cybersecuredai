import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar,
  ArrowRight,
  ExternalLink,
  TrendingUp,
  Award,
  Users,
  Building,
  Shield,
  Globe,
  FileText,
  Star,
  PlayCircle
} from "lucide-react";
import { MarketingLayout } from "@/components/MarketingLayout";
import { Link } from "wouter";

// Authority news images
import threatReportImg from "@assets/generated_images/Threat_Report_2025_Cover_50b3edd9.png";
import industryLeadershipImg from "@assets/generated_images/Market_Research_Report_f84a91b6.png";
import federalAuthImg from "@assets/generated_images/Federal_Compliance_Certification_2faa9e41.png";
import partnershipImg from "@assets/generated_images/Multi_State_Coalition_e7af0642.png";
import aiInnovationImg from "@assets/generated_images/AI_Security_Implementation_d7886bac.png";
import complianceImg from "@assets/generated_images/Compliance_Automation_Success_2b4e2ceb.png";

interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: "Industry Leadership" | "Product Innovation" | "Compliance Updates" | "Awards" | "Partnerships";
  type: "announcement" | "report" | "recognition" | "breakthrough";
  featured?: boolean;
  image: string;
  metrics?: string;
}

export default function News() {
  const newsItems: NewsItem[] = [
    {
      id: "industry-leadership",
      title: "Named a Leader in 2025 Gartner Magic Quadrant for AI-Powered Cybersecurity",
      excerpt: "CyberSecured AI recognized for innovation, financial strength, and platform breadth in comprehensive industry analysis covering execution and vision.",
      date: "January 15, 2025", 
      category: "Industry Leadership",
      type: "recognition",
      featured: true,
      image: industryLeadershipImg,
      metrics: "Leader Quadrant Position"
    },
    {
      id: "threat-report-2025",
      title: "CyberSecured AI 2025 Cyber Threat Report: Educational Sector Under Siege",
      excerpt: "Comprehensive analysis reveals 340% increase in ransomware attacks targeting educational institutions, with AI-powered defenses proving critical for protection.",
      date: "January 8, 2025",
      category: "Industry Leadership", 
      type: "report",
      featured: true,
      image: threatReportImg,
      metrics: "340% Attack Increase"
    },
    {
      id: "federal-authorization",
      title: "Achieves FedRAMP High Authorization for Federal Government Deployment",
      excerpt: "Platform now authorized for use by federal agencies, meeting the strictest security requirements for government cloud services and classified data protection.",
      date: "December 22, 2024",
      category: "Compliance Updates",
      type: "announcement",
      image: federalAuthImg,
      metrics: "FedRAMP High Certified"
    },
    {
      id: "ai-breakthrough", 
      title: "Breakthrough: 99.7% Threat Detection Accuracy with New AI Models",
      excerpt: "Revolutionary machine learning advancement reduces false positives by 73% while achieving industry-leading threat detection accuracy for educational environments.",
      date: "December 18, 2024",
      category: "Product Innovation",
      type: "breakthrough",
      image: aiInnovationImg,
      metrics: "99.7% Detection Rate"
    },
    {
      id: "state-partnership",
      title: "Multi-State Coalition Adopts CyberSecured AI for K-12 Protection",
      excerpt: "15 state education departments form unprecedented partnership to deploy unified cybersecurity infrastructure protecting over 2.3 million students.",
      date: "December 12, 2024",
      category: "Partnerships",
      type: "announcement", 
      image: partnershipImg,
      metrics: "2.3M Students Protected"
    },
    {
      id: "compliance-automation",
      title: "Automated Compliance Reduces Administrative Burden by 85%",
      excerpt: "New study shows CyberSecured AI's automated compliance features dramatically reduce manual oversight requirements while improving audit readiness.",
      date: "December 5, 2024",
      category: "Product Innovation",
      type: "report",
      image: complianceImg,
      metrics: "85% Reduction"
    }
  ];

  const featuredNews = newsItems.filter(item => item.featured);
  const regularNews = newsItems.filter(item => !item.featured);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Industry Leadership": return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30";
      case "Product Innovation": return "bg-purple-500/20 text-purple-300 border-purple-500/30";
      case "Compliance Updates": return "bg-green-500/20 text-green-300 border-green-500/30";
      case "Awards": return "bg-orange-500/20 text-orange-300 border-orange-500/30";
      case "Partnerships": return "bg-blue-500/20 text-blue-300 border-blue-500/30";
      default: return "bg-gray-500/20 text-gray-300 border-gray-500/30";
    }
  };

  return (
    <MarketingLayout>
      <div className="min-h-screen bg-slate-900">
        
        {/* Authority Hero */}
        <section className="relative py-24 px-6 bg-gradient-to-br from-slate-900 via-cyan-900/20 to-slate-900">
          <div className="absolute inset-0 bg-grid-white/[0.02]"></div>
          <div className="container mx-auto max-w-7xl relative z-10">
            <div className="text-center mb-20">
              <Badge className="mb-8 bg-cyan-500/20 text-cyan-300 border-cyan-500/30 text-lg px-6 py-3">
                Industry Authority & Innovation
              </Badge>
              <h1 className="text-6xl md:text-7xl font-bold text-white mb-8 leading-tight">
                Leading the Future of<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                  Cybersecurity
                </span>
              </h1>
              <p className="text-2xl text-gray-300 mb-12 max-w-5xl mx-auto leading-relaxed">
                Stay informed with the latest cybersecurity innovations, industry recognition, 
                and breakthrough developments from CyberSecured AI.
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-400 mb-2">15+</div>
                <div className="text-gray-300">Industry Awards</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400 mb-2">500K+</div>
                <div className="text-gray-300">Users Protected</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">25+</div>
                <div className="text-gray-300">Research Papers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-400 mb-2">99.7%</div>
                <div className="text-gray-300">Threat Detection</div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured News */}
        <section className="py-20 px-6 bg-slate-800">
          <div className="container mx-auto max-w-7xl">
            <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-16">
              Latest <span className="text-cyan-400">Developments</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
              {featuredNews.map((item) => (
                <Card key={item.id} className="bg-slate-700/60 border border-cyan-500/30 overflow-hidden group hover:border-cyan-400/60 transition-colors">
                  <div className="relative h-64">
                    <img 
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className={getCategoryColor(item.category)}>
                        {item.category}
                      </Badge>
                    </div>
                    {item.metrics && (
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-white/90 text-slate-900 font-bold">
                          {item.metrics}
                        </Badge>
                      </div>
                    )}
                  </div>
                  <CardContent className="p-8">
                    <div className="flex items-center text-gray-400 text-sm mb-4">
                      <Calendar className="w-4 h-4 mr-2" />
                      {item.date}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-gray-300 mb-6 leading-relaxed">
                      {item.excerpt}
                    </p>
                    <Button variant="outline" className="border-cyan-500 text-cyan-400 hover:bg-cyan-500/10">
                      Read Full Story
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Download CTA */}
            <div className="text-center">
              <Link href="/threat-report">
                <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white px-10 py-4 text-lg">
                  Download 2025 Threat Report
                  <ArrowRight className="ml-2 w-6 h-6" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Recent Updates */}
        <section className="py-20 px-6 bg-slate-900">
          <div className="container mx-auto max-w-7xl">
            <h2 className="text-4xl font-bold text-white text-center mb-16">
              Recent <span className="text-cyan-400">Updates</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularNews.map((item) => (
                <Card key={item.id} className="bg-slate-800/60 border border-gray-700/50 hover:border-cyan-500/30 transition-colors group">
                  <div className="relative h-48">
                    <img 
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge className={getCategoryColor(item.category)}>
                        {item.category}
                      </Badge>
                    </div>
                    {item.metrics && (
                      <div className="absolute bottom-3 right-3">
                        <Badge className="bg-black/70 text-cyan-400 font-bold">
                          {item.metrics}
                        </Badge>
                      </div>
                    )}
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center text-gray-400 text-sm mb-3">
                      <Calendar className="w-4 h-4 mr-2" />
                      {item.date}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                      {item.excerpt}
                    </p>
                    <Button variant="ghost" className="text-cyan-400 hover:text-cyan-300 p-0">
                      Read More
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Subscription */}
        <section className="py-20 px-6 bg-gradient-to-b from-slate-900 to-slate-800">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              Stay Ahead of<br />
              <span className="text-cyan-400">Emerging Threats</span>
            </h2>
            <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
              Get the latest threat intelligence, security insights, and product updates 
              delivered directly to your inbox.
            </p>
            
            <Card className="bg-slate-800/80 border border-cyan-500/30 max-w-2xl mx-auto">
              <CardContent className="p-8">
                <div className="flex flex-col sm:flex-row gap-4">
                  <input 
                    type="email"
                    placeholder="Enter your email address"
                    className="flex-1 px-4 py-3 bg-slate-700 border border-gray-600 rounded-lg text-white placeholder-gray-400"
                  />
                  <Button className="bg-cyan-600 hover:bg-cyan-700 text-white px-8 py-3">
                    Subscribe
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
                <p className="text-gray-400 text-sm mt-4">
                  Join 25,000+ cybersecurity professionals who trust our insights
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Resource Library CTA */}
        <section className="py-16 px-6 bg-slate-800">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="bg-slate-700/60 border border-purple-500/30 text-center">
                <CardContent className="p-8">
                  <FileText className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-4">Research Papers</h3>
                  <p className="text-gray-300 mb-6">Access cutting-edge cybersecurity research</p>
                  <Button variant="outline" className="border-purple-500 text-purple-400 hover:bg-purple-500/10">
                    Browse Research
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="bg-slate-700/60 border border-green-500/30 text-center">
                <CardContent className="p-8">
                  <PlayCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-4">Webinars</h3>
                  <p className="text-gray-300 mb-6">Expert-led cybersecurity training sessions</p>
                  <Button variant="outline" className="border-green-500 text-green-400 hover:bg-green-500/10">
                    Watch Webinars
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="bg-slate-700/60 border border-orange-500/30 text-center">
                <CardContent className="p-8">
                  <Award className="w-12 h-12 text-orange-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-4">Case Studies</h3>
                  <p className="text-gray-300 mb-6">Real-world implementation success stories</p>
                  <Button variant="outline" className="border-orange-500 text-orange-400 hover:bg-orange-500/10">
                    Read Cases
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>
    </MarketingLayout>
  );
}