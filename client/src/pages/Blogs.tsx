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
      id: "education-cybersecurity-2024",
      title: "The State of Cybersecurity in Education: 2024 Threat Landscape Report",
      excerpt: "An in-depth analysis of the cybersecurity challenges facing K-12 schools and higher education institutions, including the latest threat statistics and recommended defense strategies.",
      author: "Dr. Sarah Chen, CEO",
      date: "December 15, 2024",
      category: "Education Security",
      readTime: "8 min read",
      tags: ["Education", "Threat Analysis", "K-12 Security", "Higher Ed"],
      featured: true
    },
    {
      id: "ai-threat-detection",
      title: "How AI is Revolutionizing Cybersecurity Threat Detection",
      excerpt: "Explore the latest advances in artificial intelligence for cybersecurity, including machine learning models that can predict and prevent attacks before they happen.",
      author: "Marcus Rodriguez, CTO",
      date: "December 10, 2024",
      category: "AI & Technology",
      readTime: "6 min read",
      tags: ["AI", "Machine Learning", "Threat Detection", "Automation"]
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
    { name: "Education Security", count: 3, icon: <GraduationCap className="w-4 h-4" /> },
    { name: "AI & Technology", count: 2, icon: <Brain className="w-4 h-4" /> },
    { name: "Compliance", count: 2, icon: <Shield className="w-4 h-4" /> },
    { name: "Government Security", count: 1, icon: <Flag className="w-4 h-4" /> }
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
      default: return "bg-gray-600";
    }
  };

  return (
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
  );
}