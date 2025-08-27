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
  Zap,
  Shield,
  Globe,
  Bot,
  FileText
} from "lucide-react";
import { MarketingLayout } from "@/components/MarketingLayout";
import fundingNewsImg from "@assets/generated_images/CyberSecure_AI_MarketingReport_f6c089f4.png";
import fedrampImg from "@assets/generated_images/Federal_Compliance_Certification_2faa9e41.png";
import nistAwardImg from "@assets/generated_images/Federal_AI_Security_Handbook_9586f7b5.png";
import partnershipImg from "@assets/generated_images/Multi_State_Coalition_e7af0642.png";
import aiThreatDetectionImg from "@assets/generated_images/AI_Threat_Detection_Engine_58460592.png";
import industryReportImg from "@assets/generated_images/Market_Research_Report_f84a91b6.png";
import contractAwardImg from "@assets/generated_images/Government_AI_Security_Fundamentals_722b26ac.png";
import teamExpansionImg from "@assets/generated_images/Multi_Agency_Collaboration_Platform_b50f0b2a.png";
import complianceUpdateImg from "@assets/generated_images/Compliance_Automation_Success_2b4e2ceb.png";
import awarenessMonthImg from "@assets/generated_images/AI_Security_Awareness_Training_643d9a03.png";

interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: "Company News" | "Product Updates" | "Industry News" | "Awards" | "Partnerships";
  type: "press-release" | "blog-post" | "external-link" | "announcement";
  link?: string;
  featured?: boolean;
  image?: string;
}

export default function News() {
  const newsItems: NewsItem[] = [
    {
      id: "series-a-funding",
      title: "CyberSecure AI Raises $50M Series A to Expand AI-Powered Cybersecurity Platform",
      excerpt: "Funding round led by Andreessen Horowitz will accelerate development of AI-powered threat detection and compliance automation for education and government sectors.",
      date: "December 18, 2024",
      category: "Company News",
      type: "press-release",
      featured: true,
      image: fundingNewsImg
    },
    {
      id: "fedramp-authorization",
      title: "CyberSecure AI Achieves FedRAMP Authorization for Government Deployment",
      excerpt: "Platform now authorized for use by federal agencies, meeting strict security and compliance requirements for government cloud services.",
      date: "December 12, 2024",
      category: "Product Updates",
      type: "announcement",
      image: fedrampImg
    },
    {
      id: "nist-cybersecurity-award",
      title: "CyberSecure AI Receives NIST Cybersecurity Excellence Award",
      excerpt: "Recognition for innovative AI-powered threat detection system that advances cybersecurity capabilities for critical infrastructure protection.",
      date: "December 8, 2024",
      category: "Awards",
      type: "press-release",
      image: nistAwardImg
    },
    {
      id: "education-partnership",
      title: "Strategic Partnership with National Education Association",
      excerpt: "Collaboration will bring advanced cybersecurity training and resources to over 3 million educators nationwide through NEA's professional development programs.",
      date: "December 1, 2024",
      category: "Partnerships",
      type: "announcement",
      image: partnershipImg
    },
    {
      id: "ai-threat-detection-v2",
      title: "New AI Threat Detection Engine Reduces False Positives by 75%",
      excerpt: "Latest machine learning algorithms improve accuracy of threat identification while significantly reducing alert fatigue for security teams.",
      date: "November 25, 2024",
      category: "Product Updates",
      type: "blog-post",
      image: aiThreatDetectionImg
    },
    {
      id: "k12-security-report",
      title: "Industry Report: K-12 Cyber Incidents Increase 40% in 2024",
      excerpt: "Comprehensive analysis shows continued targeting of educational institutions, highlighting urgent need for enhanced cybersecurity measures.",
      date: "November 20, 2024",
      category: "Industry News",
      type: "external-link",
      link: "https://example.com/k12-security-report-2024",
      image: industryReportImg
    },
    {
      id: "government-contract-award",
      title: "CyberSecure AI Awarded Major Department of Education Contract",
      excerpt: "$25M contract will provide cybersecurity services and training to regional education agencies across 15 states over three years.",
      date: "November 15, 2024",
      category: "Company News",
      type: "press-release",
      image: contractAwardImg
    },
    {
      id: "team-expansion",
      title: "CyberSecure AI Expands Leadership Team with Former NSA Director",
      excerpt: "General Patricia Martinez joins as Chief Strategy Officer to guide expansion into federal government markets and enhance national security partnerships.",
      date: "November 8, 2024",
      category: "Company News",
      type: "announcement",
      image: teamExpansionImg
    },
    {
      id: "compliance-automation-update",
      title: "Enhanced Compliance Dashboard Supports 15 New Regulatory Frameworks",
      excerpt: "Platform expansion includes support for state-specific education regulations and local government compliance requirements.",
      date: "November 1, 2024",
      category: "Product Updates",
      type: "blog-post",
      image: complianceUpdateImg
    },
    {
      id: "cybersecurity-month",
      title: "CyberSecure AI Launches National Cybersecurity Awareness Month Campaign",
      excerpt: "Free cybersecurity training resources and assessments provided to over 10,000 educational institutions during October awareness campaign.",
      date: "October 28, 2024",
      category: "Company News",
      type: "announcement",
      image: awarenessMonthImg
    }
  ];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Company News": return <Building className="w-4 h-4" />;
      case "Product Updates": return <Zap className="w-4 h-4" />;
      case "Industry News": return <Globe className="w-4 h-4" />;
      case "Awards": return <Award className="w-4 h-4" />;
      case "Partnerships": return <Users className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Company News": return "bg-blue-600";
      case "Product Updates": return "bg-purple-600";
      case "Industry News": return "bg-green-600";
      case "Awards": return "bg-yellow-600";
      case "Partnerships": return "bg-orange-600";
      default: return "bg-gray-600";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "press-release": return <FileText className="w-4 h-4" />;
      case "blog-post": return <FileText className="w-4 h-4" />;
      case "external-link": return <ExternalLink className="w-4 h-4" />;
      case "announcement": return <TrendingUp className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const featuredNews = newsItems.find(item => item.featured);
  const otherNews = newsItems.filter(item => !item.featured);

  const categories = [
    { name: "All News", count: newsItems.length },
    { name: "Company News", count: newsItems.filter(item => item.category === "Company News").length },
    { name: "Product Updates", count: newsItems.filter(item => item.category === "Product Updates").length },
    { name: "Industry News", count: newsItems.filter(item => item.category === "Industry News").length },
    { name: "Awards", count: newsItems.filter(item => item.category === "Awards").length },
    { name: "Partnerships", count: newsItems.filter(item => item.category === "Partnerships").length }
  ];

  return (
    <MarketingLayout>
      <div className="ai-dashboard-bg min-h-screen">
      {/* Header */}
      <header className="bg-surface/90 backdrop-blur-md border-b border-surface-light p-6 cyber-glow">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-red-400 to-pink-500 rounded-lg flex items-center justify-center">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white flex items-center space-x-2">
                <span>CyberSecure AI News</span>
                <TrendingUp className="w-8 h-8 text-red-400" />
                <Globe className="w-8 h-8 text-blue-400" />
              </h1>
              <p className="text-gray-400">Latest company updates, product announcements, and industry developments</p>
            </div>
          </div>
        </div>
      </header>

      <main className="p-6">
        <div className="container mx-auto max-w-7xl">
          {/* Hero Section */}
          <section className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-6">Stay Informed</h2>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto mb-8">
              Get the latest updates on CyberSecure AI developments, product launches, partnerships, 
              and industry insights that shape the future of cybersecurity.
            </p>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Featured News */}
              {featuredNews && (
                <section className="mb-12">
                  <h2 className="text-2xl font-bold text-white mb-6">Featured News</h2>
                  <Card className="bg-surface/80 backdrop-blur-md border border-red-500/30 cyber-glow">
                    {featuredNews.image && (
                      <div className="relative h-64 overflow-hidden rounded-t-lg">
                        <img 
                          src={featuredNews.image} 
                          alt={featuredNews.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-4 left-4 flex items-center space-x-2">
                          <Badge className={`${getCategoryColor(featuredNews.category)} text-white`}>
                            <span className="mr-1">{getCategoryIcon(featuredNews.category)}</span>
                            {featuredNews.category}
                          </Badge>
                          <Badge variant="outline" className="text-red-400 border-red-500 bg-black/50">
                            <span className="mr-1">{getTypeIcon(featuredNews.type)}</span>
                            Featured
                          </Badge>
                        </div>
                      </div>
                    )}
                    <CardHeader>
                      {!featuredNews.image && (
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center space-x-2">
                            <Badge className={`${getCategoryColor(featuredNews.category)} text-white`}>
                              <span className="mr-1">{getCategoryIcon(featuredNews.category)}</span>
                              {featuredNews.category}
                            </Badge>
                            <Badge variant="outline" className="text-red-400 border-red-500">
                              <span className="mr-1">{getTypeIcon(featuredNews.type)}</span>
                              Featured
                            </Badge>
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <Calendar className="w-4 h-4 mr-1" />
                            {featuredNews.date}
                          </div>
                        </div>
                      )}
                      <div className="flex items-center justify-between mb-4">
                        <CardTitle className="text-2xl text-white hover:text-red-400 transition-colors cursor-pointer">
                          {featuredNews.title}
                        </CardTitle>
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="w-4 h-4 mr-1" />
                          {featuredNews.date}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-400 mb-6 text-lg">{featuredNews.excerpt}</p>
                      <Button className="bg-red-600 hover:bg-red-700">
                        Read Full Story
                        <ArrowRight className="w-4 h-4 ml-2 text-blue-400" />
                      </Button>
                    </CardContent>
                  </Card>
                </section>
              )}

              {/* Recent News */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-6">Recent Updates</h2>
                <div className="space-y-6">
                  {otherNews.map((item) => (
                    <Card key={item.id} className="bg-surface/80 backdrop-blur-md border border-blue-500/30 cyber-glow hover:border-cyan-500/50 transition-colors">
                      <div className="grid md:grid-cols-4 gap-6">
                        {item.image && (
                          <div className="md:col-span-1">
                            <img 
                              src={item.image} 
                              alt={item.title}
                              className="w-full h-32 md:h-full object-cover rounded-l-lg"
                            />
                          </div>
                        )}
                        <div className={item.image ? "md:col-span-3" : "md:col-span-4"}>
                          <CardHeader>
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex items-center space-x-2">
                                <Badge className={`${getCategoryColor(item.category)} text-white text-xs`}>
                                  <span className="mr-1">{getCategoryIcon(item.category)}</span>
                                  {item.category}
                                </Badge>
                                <Badge variant="outline" className="text-gray-400 border-gray-600 text-xs">
                                  <span className="mr-1">{getTypeIcon(item.type)}</span>
                                  {item.type.replace("-", " ").replace(/\b\w/g, l => l.toUpperCase())}
                                </Badge>
                              </div>
                              <div className="flex items-center text-xs text-gray-500">
                                <Calendar className="w-3 h-3 mr-1" />
                                {item.date}
                              </div>
                            </div>
                            <CardTitle className="text-xl text-white hover:text-cyan-400 transition-colors cursor-pointer">
                              {item.title}
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-gray-400 mb-4">{item.excerpt}</p>
                            <div className="flex items-center justify-between">
                              <div className="text-sm text-gray-500">
                                {item.link ? "External Article" : "Read More"}
                              </div>
                              <Button variant="outline" size="sm" className="border-cyan-500 text-cyan-400 hover:bg-cyan-500/10">
                                {item.link ? (
                                  <>
                                    View Article
                                    <ExternalLink className="w-3 h-3 ml-1" />
                                  </>
                                ) : (
                                  <>
                                    Read More
                                    <ExternalLink className="w-3 h-3 ml-1 text-blue-400" />
                                  </>
                                )}
                              </Button>
                            </div>
                          </CardContent>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Categories */}
              <Card className="bg-surface/80 backdrop-blur-md border border-purple-500/30 cyber-glow mb-8">
                <CardHeader>
                  <CardTitle className="text-lg text-white">News Categories</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {categories.map((category, index) => (
                      <div key={index} className="flex items-center justify-between p-2 rounded-lg hover:bg-surface/50 cursor-pointer">
                        <span className="text-gray-300 text-sm">{category.name}</span>
                        <Badge variant="outline" className="text-gray-400 border-gray-600 text-xs">
                          {category.count}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card className="bg-surface/80 backdrop-blur-md border border-green-500/30 cyber-glow mb-8">
                <CardHeader>
                  <CardTitle className="text-lg text-white">Company Highlights</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-400">$50M</div>
                      <div className="text-gray-400 text-xs">Series A Funding</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-400">50+</div>
                      <div className="text-gray-400 text-xs">Team Members</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-400">10,000+</div>
                      <div className="text-gray-400 text-xs">Schools Protected</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-400">5</div>
                      <div className="text-gray-400 text-xs">Government Contracts</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Media Kit */}
              <Card className="bg-surface/80 backdrop-blur-md border border-orange-500/30 cyber-glow">
                <CardHeader>
                  <CardTitle className="text-lg text-white">Media Resources</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400 text-sm mb-4">
                    Access our media kit with logos, executive bios, and press materials.
                  </p>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full border-orange-500 text-orange-400 hover:bg-orange-500/10 text-sm">
                      Download Media Kit
                    </Button>
                    <Button variant="outline" className="w-full border-gray-500 text-gray-400 hover:bg-gray-500/10 text-sm">
                      Press Contact Info
                    </Button>
                  </div>
                  <div className="mt-4 text-xs text-gray-500">
                    <p>Press Contact:</p>
                    <p>media@cybersecure.ai</p>
                    <p>(555) 123-CYBER</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Newsletter Signup */}
          <section className="mt-16">
            <Card className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 border border-blue-500/30 cyber-glow">
              <CardContent className="p-12 text-center">
                <h2 className="text-3xl font-bold text-white mb-6">Stay in the Loop</h2>
                <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
                  Subscribe to receive the latest CyberSecure AI news, product updates, 
                  and industry insights delivered directly to your inbox.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="flex-1 px-4 py-3 bg-surface border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                  />
                  <Button className="bg-blue-600 hover:bg-blue-700 px-8 py-3">
                    Subscribe
                  </Button>
                </div>
                <p className="text-sm text-gray-400 mt-4">
                  Join 5,000+ cybersecurity professionals staying informed about our latest developments
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