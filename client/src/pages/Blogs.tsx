import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Search,
  Calendar,
  User,
  ArrowRight,
  Shield,
  Brain,
  GraduationCap,
  Flag,
  AlertTriangle,
  Lock,
  Eye,
  TrendingUp,
  FileText,
  Bot
} from "lucide-react";
import { MarketingLayout } from "@/components/MarketingLayout";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  readTime: string;
  tags: string[];
  image?: string;
  featured?: boolean;
}

export default function Blogs() {
  const blogPosts: BlogPost[] = [
    {
      id: "ai-cybersecurity-intersection-2025",
      title: "The Intersection of AI and Cybersecurity: Protecting Digital Assets in 2025",
      excerpt: "Comprehensive analysis of AI's role in modern cybersecurity landscapes, exploring how artificial intelligence transforms both offensive and defensive security strategies.",
      author: "Dr. Sarah Chen, CEO",
      date: "January 20, 2025",
      category: "AI & Technology",
      readTime: "8 min read",
      tags: ["AI cybersecurity", "digital asset protection", "artificial intelligence security", "2025 cybersecurity trends"],
      featured: true
    },
    {
      id: "zero-day-ai-vulnerabilities",
      title: "Zero-Day Vulnerabilities in AI Systems: Detection and Prevention Strategies",
      excerpt: "Explore advanced techniques for identifying and mitigating zero-day vulnerabilities in AI systems before they can be exploited by malicious actors.",
      author: "Marcus Rodriguez, CTO",
      date: "January 18, 2025",
      category: "AI & Technology",
      readTime: "10 min read",
      tags: ["zero-day vulnerabilities", "AI system security", "vulnerability detection", "prevention strategies"]
    },
    {
      id: "generative-ai-threat-intelligence",
      title: "How Generative AI is Transforming Threat Intelligence: Case Studies and Results",
      excerpt: "Detailed case studies showcasing how generative AI technologies are revolutionizing threat intelligence gathering, analysis, and response capabilities.",
      author: "Dr. Sarah Chen, CEO",
      date: "January 15, 2025",
      category: "AI & Technology",
      readTime: "12 min read",
      tags: ["generative AI", "threat intelligence", "AI security case studies", "cybersecurity transformation"]
    },
    {
      id: "ai-regulatory-compliance-guide",
      title: "Regulatory Compliance for AI Security: A Comprehensive Guide for CISOs",
      excerpt: "Navigate the complex landscape of AI security regulations with this comprehensive guide designed specifically for Chief Information Security Officers.",
      author: "Jennifer Kim, VP Government Relations",
      date: "January 12, 2025",
      category: "Compliance",
      readTime: "15 min read",
      tags: ["AI security compliance", "CISO guide", "regulatory requirements", "AI governance"]
    },
    {
      id: "resilient-ai-systems-development",
      title: "Building Resilient AI Systems: Best Practices for Secure Development Lifecycles",
      excerpt: "Learn industry-proven best practices for integrating security into AI development lifecycles to build more resilient and secure AI systems.",
      author: "Marcus Rodriguez, CTO",
      date: "January 10, 2025",
      category: "AI & Technology",
      readTime: "11 min read",
      tags: ["resilient AI systems", "secure development", "SDLC", "AI security best practices"]
    },
    {
      id: "ai-automation-security-risks",
      title: "The Dark Side of AI Automation: How Neglected Security Creates Business Vulnerabilities",
      excerpt: "Examine the hidden security risks in AI automation implementations and how overlooked security measures create significant business vulnerabilities.",
      author: "David Thompson, CSO",
      date: "January 8, 2025",
      category: "Security Architecture",
      readTime: "9 min read",
      tags: ["AI automation risks", "business vulnerabilities", "security neglect", "AI security gaps"]
    },
    {
      id: "ai-security-debt-costs",
      title: "AI Security Debt: Why Postponing Security Measures Costs More Than Implementing Them",
      excerpt: "Analyze the long-term financial impact of delaying AI security implementations and why proactive security measures provide better ROI.",
      author: "Dr. Sarah Chen, CEO",
      date: "January 5, 2025",
      category: "Business Security",
      readTime: "7 min read",
      tags: ["security debt", "cost of delayed security", "AI implementation risks", "security ROI"]
    },
    {
      id: "human-factor-ai-security",
      title: "The Human Factor in AI Security: Training Employees to Recognize AI-Based Social Engineering",
      excerpt: "Discover effective strategies for training employees to identify and respond to AI-powered social engineering attacks and security threats.",
      author: "Jennifer Kim, VP Government Relations",
      date: "January 3, 2025",
      category: "Security Training",
      readTime: "8 min read",
      tags: ["human factor security", "AI social engineering", "security training", "employee awareness"]
    },
    {
      id: "quantum-ai-security-future",
      title: "Quantum Computing vs. AI Security: Preparing for the Post-Encryption Era",
      excerpt: "Prepare for the future of cybersecurity as quantum computing challenges current encryption methods and AI security paradigms.",
      author: "Marcus Rodriguez, CTO",
      date: "December 30, 2024",
      category: "Future Security",
      readTime: "13 min read",
      tags: ["quantum computing security", "post-encryption", "AI quantum threats", "future security"]
    },
    {
      id: "ai-security-budget-solutions",
      title: "AI Security on a Budget: Cost-Effective Strategies for Startups and SMBs",
      excerpt: "Practical, budget-friendly AI security strategies tailored for startups and small-to-medium businesses without enterprise-level budgets.",
      author: "David Thompson, CSO",
      date: "December 28, 2024",
      category: "Budget Security",
      readTime: "6 min read",
      tags: ["budget security solutions", "SMB cybersecurity", "startup security", "cost-effective AI protection"]
    },
    {
      id: "federal-zero-trust-ai",
      title: "Federal Zero Trust Implementation: AI-Powered Security Across Agency Boundaries",
      excerpt: "Explore how federal agencies are implementing zero trust architecture with AI-powered security to protect cross-agency communications and data.",
      author: "Jennifer Kim, VP Government Relations",
      date: "December 25, 2024",
      category: "Government Security",
      readTime: "10 min read",
      tags: ["federal zero trust", "government AI security", "cross-agency protection", "federal cybersecurity"]
    },
    {
      id: "cmmc-3-ai-compliance",
      title: "CMMC 3.0 Compliance Through AI: How Federal Contractors Are Meeting New Standards",
      excerpt: "Understand how AI tools and automation are helping federal contractors achieve and maintain compliance with CMMC 3.0 requirements.",
      author: "David Thompson, CSO",
      date: "December 22, 2024",
      category: "Government Security",
      readTime: "12 min read",
      tags: ["CMMC 3.0", "federal contractor security", "AI compliance tools", "government standards"]
    },
    {
      id: "critical-infrastructure-ai-protection",
      title: "Protecting Critical Infrastructure: How Federal Agencies Use AI to Detect and Respond to Nation-State Threats",
      excerpt: "Learn how federal agencies leverage AI technologies to protect critical infrastructure from sophisticated nation-state cyber attacks.",
      author: "Dr. Sarah Chen, CEO",
      date: "December 20, 2024",
      category: "Government Security",
      readTime: "14 min read",
      tags: ["critical infrastructure protection", "federal AI security", "nation-state threats", "government response systems"]
    },
    {
      id: "university-ai-security-pilots",
      title: "Campus-Wide AI Security: Results from Three University Pilot Programs",
      excerpt: "Detailed analysis of three successful university AI security pilot programs, including implementation strategies and measurable outcomes.",
      author: "Dr. Sarah Chen, CEO",
      date: "December 18, 2024",
      category: "Education Security",
      readTime: "11 min read",
      tags: ["university security pilots", "campus AI protection", "higher education security", "academic pilot programs"]
    },
    {
      id: "academic-research-security",
      title: "Research Security in Academia: Protecting AI Innovation Without Hampering Collaboration",
      excerpt: "Balance security and collaboration in academic research environments while protecting valuable AI innovations and intellectual property.",
      author: "Marcus Rodriguez, CTO",
      date: "December 15, 2024",
      category: "Education Security",
      readTime: "9 min read",
      tags: ["research security", "academic innovation protection", "collaborative security", "university AI safeguards"]
    },
    {
      id: "student-data-ai-protection",
      title: "Student Data Protection: How AI Security Pilots Are Transforming Privacy in Higher Education",
      excerpt: "Discover how AI security pilot programs are revolutionizing student data protection and privacy measures in higher education institutions.",
      author: "Jennifer Kim, VP Government Relations",
      date: "December 12, 2024",
      category: "Education Security",
      readTime: "8 min read",
      tags: ["student data protection", "education privacy", "AI security pilots", "university data safeguards"]
    },
    {
      id: "k12-digital-classroom-security",
      title: "Digital Classroom Protection: AI Security Solutions for K-12 Learning Environments",
      excerpt: "Comprehensive guide to implementing AI-powered security solutions in K-12 digital learning environments to protect students and educational resources.",
      author: "Dr. Sarah Chen, CEO",
      date: "December 10, 2024",
      category: "Education Security",
      readTime: "7 min read",
      tags: ["digital classroom security", "K-12 cybersecurity", "education protection", "school security solutions"]
    },
    {
      id: "k12-student-information-systems",
      title: "Securing Student Information Systems: AI-Enhanced Protection for K-12 Districts",
      excerpt: "Learn how K-12 school districts are leveraging AI to enhance protection of student information systems and sensitive educational data.",
      author: "David Thompson, CSO",
      date: "December 8, 2024",
      category: "Education Security",
      readTime: "9 min read",
      tags: ["student information security", "K-12 data protection", "district security systems", "school data safeguards"]
    },
    {
      id: "k12-cybersecurity-education",
      title: "Teaching Cybersecurity Through AI: How K-12 Schools Are Building Security-Aware Digital Citizens",
      excerpt: "Explore innovative approaches K-12 schools are using to teach cybersecurity concepts and build security awareness among digital native students.",
      author: "Jennifer Kim, VP Government Relations",
      date: "December 6, 2024",
      category: "Education Security",
      readTime: "6 min read",
      tags: ["cybersecurity education", "K-12 security awareness", "digital citizenship", "student security training"]
    },
    {
      id: "ferpa-compliance-guide",
      title: "FERPA Compliance in the Digital Age: A Complete Guide for Schools",
      excerpt: "Navigate the complexities of FERPA compliance with modern technology. Learn about student data protection requirements and best practices for educational institutions.",
      author: "Jennifer Kim, VP Government Relations",
      date: "December 5, 2024",
      category: "Compliance",
      readTime: "12 min read",
      tags: ["FERPA", "Student Privacy", "Compliance", "Data Protection"]
    },
    {
      id: "government-cybersecurity-frameworks",
      title: "Understanding Government Cybersecurity Frameworks: FISMA, FedRAMP, and Beyond",
      excerpt: "A comprehensive overview of federal cybersecurity requirements, compliance frameworks, and implementation strategies for government agencies and contractors.",
      author: "David Thompson, CSO",
      date: "November 28, 2024",
      category: "Government Security",
      readTime: "10 min read",
      tags: ["FISMA", "FedRAMP", "Government", "Compliance Frameworks"]
    },
    {
      id: "ransomware-education-sector",
      title: "Ransomware Attacks on Schools: Prevention, Response, and Recovery",
      excerpt: "Learn how educational institutions can protect themselves from ransomware attacks, including incident response planning and recovery strategies.",
      author: "Dr. Sarah Chen, CEO",
      date: "November 20, 2024",
      category: "Incident Response",
      readTime: "7 min read",
      tags: ["Ransomware", "Incident Response", "Education", "Recovery"]
    },
    {
      id: "zero-trust-architecture",
      title: "Implementing Zero-Trust Architecture in Educational Environments",
      excerpt: "Discover how zero-trust security models can enhance protection for schools and universities while maintaining usability for students and faculty.",
      author: "Marcus Rodriguez, CTO",
      date: "November 15, 2024",
      category: "Security Architecture",
      readTime: "9 min read",
      tags: ["Zero Trust", "Network Security", "Education IT", "Architecture"]
    },
    {
      id: "cybersecurity-training-employees",
      title: "Building a Strong Security Culture: Employee Training Best Practices",
      excerpt: "Effective strategies for cybersecurity awareness training in education and government organizations, including metrics for measuring program success.",
      author: "Jennifer Kim, VP Government Relations",
      date: "November 8, 2024",
      category: "Security Training",
      readTime: "5 min read",
      tags: ["Security Training", "Employee Awareness", "Culture", "Best Practices"]
    },
    {
      id: "cloud-security-education",
      title: "Cloud Security for Educational Institutions: Challenges and Solutions",
      excerpt: "Navigate the unique cloud security challenges facing schools and universities, with practical guidance for secure cloud adoption and management.",
      author: "David Thompson, CSO",
      date: "November 1, 2024",
      category: "Cloud Security",
      readTime: "8 min read",
      tags: ["Cloud Security", "Education", "SaaS", "Data Protection"]
    }
  ];

  const categories = [
    { name: "All Posts", count: blogPosts.length, icon: <FileText className="w-4 h-4" /> },
    { name: "Education Security", count: 7, icon: <GraduationCap className="w-4 h-4" /> },
    { name: "AI & Technology", count: 5, icon: <Brain className="w-4 h-4" /> },
    { name: "Government Security", count: 3, icon: <Flag className="w-4 h-4" /> },
    { name: "Security Training", count: 2, icon: <Lock className="w-4 h-4" /> },
    { name: "Compliance", count: 2, icon: <Shield className="w-4 h-4" /> },
    { name: "Security Architecture", count: 1, icon: <AlertTriangle className="w-4 h-4" /> },
    { name: "Business Security", count: 1, icon: <TrendingUp className="w-4 h-4" /> },
    { name: "Future Security", count: 1, icon: <Eye className="w-4 h-4" /> },
    { name: "Budget Security", count: 1, icon: <Bot className="w-4 h-4" /> }
  ];

  const featuredPost = blogPosts.find(post => post.featured);
  const otherPosts = blogPosts.filter(post => !post.featured);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Education Security": return "bg-blue-600";
      case "AI & Technology": return "bg-purple-600";
      case "Compliance": return "bg-green-600";
      case "Government Security": return "bg-red-600";
      case "Incident Response": return "bg-orange-600";
      case "Security Architecture": return "bg-cyan-600";
      case "Security Training": return "bg-yellow-600";
      case "Cloud Security": return "bg-pink-600";
      case "Business Security": return "bg-indigo-600";
      case "Future Security": return "bg-violet-600";
      case "Budget Security": return "bg-teal-600";
      default: return "bg-gray-600";
    }
  };

  return (
    <MarketingLayout>
      <div className="ai-dashboard-bg min-h-screen">
      {/* Header */}
      <header className="bg-surface/90 backdrop-blur-md border-b border-surface-light p-6 cyber-glow">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-teal-500 rounded-lg flex items-center justify-center">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white flex items-center space-x-2">
                <span>CyberSecure AI Blog</span>
                <FileText className="w-8 h-8 text-green-400" />
                <Brain className="w-8 h-8 text-purple-400" />
              </h1>
              <p className="text-gray-400">Insights, analysis, and best practices for cybersecurity in education and government</p>
            </div>
          </div>
        </div>
      </header>

      <main className="p-6">
        <div className="container mx-auto max-w-7xl">
          {/* Hero Section */}
          <section className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-6">Cybersecurity Insights & Analysis</h2>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto mb-8">
              Stay informed about the latest cybersecurity trends, threats, and best practices 
              specifically tailored for educational institutions and government organizations.
            </p>
            <div className="max-w-md mx-auto">
              <div className="flex gap-2">
                <Input
                  placeholder="Search articles..."
                  className="bg-surface border-gray-600 text-white"
                />
                <Button className="bg-green-600 hover:bg-green-700">
                  <Search className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Featured Post */}
              {featuredPost && (
                <section className="mb-12">
                  <h2 className="text-2xl font-bold text-white mb-6">Featured Article</h2>
                  <Card className="bg-surface/80 backdrop-blur-md border border-cyan-500/30 cyber-glow">
                    <CardHeader>
                      <div className="flex items-start justify-between mb-4">
                        <Badge className={`${getCategoryColor(featuredPost.category)} text-white`}>
                          {featuredPost.category}
                        </Badge>
                        <Badge variant="outline" className="text-cyan-400 border-cyan-500">
                          Featured
                        </Badge>
                      </div>
                      <CardTitle className="text-2xl text-white hover:text-cyan-400 transition-colors cursor-pointer">
                        {featuredPost.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-400 mb-6 text-lg">{featuredPost.excerpt}</p>
                      
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
                        <div className="flex items-center space-x-4">
                          <span className="flex items-center">
                            <User className="w-4 h-4 mr-1" />
                            {featuredPost.author}
                          </span>
                          <span className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {featuredPost.date}
                          </span>
                          <span>{featuredPost.readTime}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-2">
                          {featuredPost.tags.map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-gray-400 border-gray-600 text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <Button className="bg-cyan-600 hover:bg-cyan-700">
                          Read Full Article
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </section>
              )}

              {/* Recent Posts */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-6">Recent Articles</h2>
                <div className="space-y-6">
                  {otherPosts.map((post) => (
                    <Card key={post.id} className="bg-surface/80 backdrop-blur-md border border-blue-500/30 cyber-glow hover:border-cyan-500/50 transition-colors">
                      <CardHeader>
                        <div className="flex items-start justify-between mb-2">
                          <Badge className={`${getCategoryColor(post.category)} text-white text-xs`}>
                            {post.category}
                          </Badge>
                          <span className="text-xs text-gray-500">{post.readTime}</span>
                        </div>
                        <CardTitle className="text-xl text-white hover:text-cyan-400 transition-colors cursor-pointer">
                          {post.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-400 mb-4">{post.excerpt}</p>
                        
                        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                          <div className="flex items-center space-x-3">
                            <span className="flex items-center">
                              <User className="w-3 h-3 mr-1" />
                              {post.author}
                            </span>
                            <span className="flex items-center">
                              <Calendar className="w-3 h-3 mr-1" />
                              {post.date}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex flex-wrap gap-1">
                            {post.tags.slice(0, 3).map((tag, index) => (
                              <Badge key={index} variant="outline" className="text-gray-400 border-gray-600 text-xs">
                                {tag}
                              </Badge>
                            ))}
                            {post.tags.length > 3 && (
                              <Badge variant="outline" className="text-gray-400 border-gray-600 text-xs">
                                +{post.tags.length - 3} more
                              </Badge>
                            )}
                          </div>
                          <Button variant="outline" size="sm" className="border-cyan-500 text-cyan-400 hover:bg-cyan-500/10">
                            Read More
                            <ArrowRight className="w-3 h-3 ml-1" />
                          </Button>
                        </div>
                      </CardContent>
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
                  <CardTitle className="text-lg text-white">Categories</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {categories.map((category, index) => (
                      <div key={index} className="flex items-center justify-between p-2 rounded-lg hover:bg-surface/50 cursor-pointer">
                        <div className="flex items-center space-x-2 text-gray-300">
                          <span className="text-purple-400">{category.icon}</span>
                          <span className="text-sm">{category.name}</span>
                        </div>
                        <Badge variant="outline" className="text-gray-400 border-gray-600 text-xs">
                          {category.count}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Popular Tags */}
              <Card className="bg-surface/80 backdrop-blur-md border border-green-500/30 cyber-glow mb-8">
                <CardHeader>
                  <CardTitle className="text-lg text-white">Popular Topics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {["AI Security", "FERPA", "Ransomware", "Zero Trust", "Cloud Security", "Compliance", "Threat Detection", "Education IT", "Government", "Incident Response"].map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-gray-400 border-gray-600 hover:border-green-500 hover:text-green-400 cursor-pointer transition-colors text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Newsletter Signup */}
              <Card className="bg-surface/80 backdrop-blur-md border border-orange-500/30 cyber-glow">
                <CardHeader>
                  <CardTitle className="text-lg text-white">Stay Updated</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400 text-sm mb-4">
                    Get the latest cybersecurity insights and analysis delivered to your inbox.
                  </p>
                  <div className="space-y-3">
                    <Input
                      placeholder="Enter your email"
                      className="bg-background border-gray-600 text-white text-sm"
                    />
                    <Button className="w-full bg-orange-600 hover:bg-orange-700 text-sm">
                      Subscribe
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    No spam. Unsubscribe at any time.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      </div>
    </MarketingLayout>
  );
}