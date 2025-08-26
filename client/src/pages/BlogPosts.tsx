import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search,
  Clock,
  FileText,
  Building,
  GraduationCap,
  School,
  Shield,
  Users,
  ExternalLink,
  Eye,
  Calendar
} from "lucide-react";

const sectors = [
  { id: "all", name: "All Sectors", icon: Users },
  { id: "federal", name: "Federal Government", icon: Building },
  { id: "higher-ed", name: "Higher Education", icon: GraduationCap },
  { id: "k12", name: "K-12 Education", icon: School },
  { id: "general", name: "General", icon: Shield }
];

const blogPosts = [
  // General Blog Posts
  {
    title: "The Intersection of AI and Cybersecurity: Protecting Digital Assets in 2025",
    sector: "general",
    description: "Comprehensive analysis of AI's role in modern cybersecurity landscapes",
    tags: ["AI cybersecurity", "digital asset protection", "2025 cybersecurity trends"],
    readTime: "8 min",
    author: "Security Research Team",
    publishDate: "2025-01-15",
    views: "12,400",
    featured: true
  },
  {
    title: "Zero-Day Vulnerabilities in AI Systems: Detection and Prevention Strategies",
    sector: "general",
    description: "Latest techniques for identifying and mitigating zero-day threats in AI",
    tags: ["zero-day vulnerabilities", "AI system security", "vulnerability detection"],
    readTime: "10 min",
    author: "Vulnerability Research Team",
    publishDate: "2025-01-10",
    views: "9,800",
    featured: false
  },
  {
    title: "The Dark Side of AI Automation: How Neglected Security Creates Business Vulnerabilities",
    sector: "general",
    description: "Analysis of security gaps in automated AI systems and their business impact",
    tags: ["AI automation risks", "business vulnerabilities", "security neglect"],
    readTime: "12 min",
    author: "Business Security Analysts",
    publishDate: "2025-01-08",
    views: "15,600",
    featured: true
  },
  // Federal Government Blog Posts
  {
    title: "Federal Zero Trust Implementation: AI-Powered Security Across Agency Boundaries",
    sector: "federal",
    description: "How federal agencies implement zero trust with AI enhancement",
    tags: ["federal zero trust", "government AI security", "cross-agency protection"],
    readTime: "12 min",
    author: "Federal Security Experts",
    publishDate: "2025-01-12",
    views: "7,200",
    featured: false
  },
  {
    title: "CMMC 3.0 Compliance Through AI: How Federal Contractors Are Meeting New Standards",
    sector: "federal",
    description: "Real-world implementation of CMMC 3.0 using AI-powered compliance tools",
    tags: ["CMMC 3.0", "federal contractor security", "AI compliance tools"],
    readTime: "15 min",
    author: "Compliance Specialists",
    publishDate: "2025-01-05",
    views: "6,500",
    featured: false
  },
  // Higher Education Blog Posts
  {
    title: "Campus-Wide AI Security: Results from Three University Pilot Programs",
    sector: "higher-ed",
    description: "Real-world results from university AI security implementations",
    tags: ["university security pilots", "campus AI protection", "higher education security"],
    readTime: "10 min",
    author: "Academic Security Team",
    publishDate: "2025-01-14",
    views: "5,400",
    featured: false
  },
  {
    title: "Research Security in Academia: Protecting AI Innovation Without Hampering Collaboration",
    sector: "higher-ed",
    description: "Balancing security needs with academic freedom and collaboration",
    tags: ["research security", "academic innovation protection", "collaborative security"],
    readTime: "14 min",
    author: "Research Security Experts",
    publishDate: "2025-01-06",
    views: "4,800",
    featured: false
  },
  // K-12 Blog Posts
  {
    title: "Digital Classroom Protection: AI Security Solutions for K-12 Learning Environments",
    sector: "k12",
    description: "Practical security implementations for modern digital classrooms",
    tags: ["digital classroom security", "K-12 cybersecurity", "education protection"],
    readTime: "8 min",
    author: "Educational Security Team",
    publishDate: "2025-01-11",
    views: "8,900",
    featured: false
  },
  {
    title: "Teaching Cybersecurity Through AI: How K-12 Schools Are Building Security-Aware Digital Citizens",
    sector: "k12",
    description: "Innovative approaches to cybersecurity education in schools",
    tags: ["cybersecurity education", "K-12 security awareness", "digital citizenship"],
    readTime: "11 min",
    author: "Education Technology Team",
    publishDate: "2025-01-03",
    views: "11,200",
    featured: true
  }
];

export default function BlogPosts() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSector, setSelectedSector] = useState("all");

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesSector = selectedSector === "all" || post.sector === selectedSector;
    return matchesSearch && matchesSector;
  });

  const featuredPosts = blogPosts.filter(post => post.featured);

  const BlogCard = ({ post, featured = false }: { post: any, featured?: boolean }) => (
    <Card className={`bg-gray-800 border-gray-700 hover:border-cyan-500/50 transition-all duration-200 group ${featured ? 'border-cyan-500/30' : ''}`}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            {featured && (
              <Badge className="mb-2 bg-cyan-600 text-white">Featured</Badge>
            )}
            <CardTitle className="text-white group-hover:text-cyan-400 transition-colors text-lg">
              {post.title}
            </CardTitle>
            <CardDescription className="text-gray-300 mt-2">
              {post.description}
            </CardDescription>
          </div>
          <div className="ml-4 flex flex-col items-end space-y-2">
            <div className="flex items-center text-gray-400 text-sm">
              <Clock className="w-4 h-4 mr-1" />
              {post.readTime}
            </div>
            <div className="flex items-center text-gray-400 text-sm">
              <Eye className="w-4 h-4 mr-1" />
              {post.views}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center text-gray-400 text-sm mb-3">
          <Calendar className="w-4 h-4 mr-1" />
          {new Date(post.publishDate).toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
          <span className="mx-2">•</span>
          <span>by {post.author}</span>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.slice(0, 3).map((tag: string, index: number) => (
            <Badge key={index} variant="secondary" className="text-xs bg-gray-700 text-gray-300">
              {tag}
            </Badge>
          ))}
        </div>
        
        <div className="flex justify-between items-center">
          <Badge 
            variant="outline" 
            className={`
              ${post.sector === 'federal' ? 'text-blue-400 border-blue-400' : ''}
              ${post.sector === 'higher-ed' ? 'text-green-400 border-green-400' : ''}
              ${post.sector === 'k12' ? 'text-yellow-400 border-yellow-400' : ''}
              ${post.sector === 'general' ? 'text-purple-400 border-purple-400' : ''}
            `}
          >
            {sectors.find(s => s.id === post.sector)?.name}
          </Badge>
          <Button size="sm" variant="outline" className="border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black">
            <ExternalLink className="w-4 h-4 mr-1" />
            Read Article
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            Security Blog & Articles
          </h1>
          <p className="text-gray-400 text-lg mb-6">
            Latest insights, research, and best practices in AI security
          </p>
          
          {/* Blog Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-cyan-400">{blogPosts.length}</div>
                <div className="text-sm text-gray-400">Total Articles</div>
              </CardContent>
            </Card>
            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-400">{blogPosts.reduce((acc, post) => acc + parseInt(post.views.replace(',', '')), 0).toLocaleString()}</div>
                <div className="text-sm text-gray-400">Total Views</div>
              </CardContent>
            </Card>
            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-yellow-400">{featuredPosts.length}</div>
                <div className="text-sm text-gray-400">Featured Articles</div>
              </CardContent>
            </Card>
            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-400">{new Set(blogPosts.map(post => post.author)).size}</div>
                <div className="text-sm text-gray-400">Expert Authors</div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Featured Articles */}
        {featuredPosts.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">Featured Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredPosts.map((post, index) => (
                <BlogCard key={index} post={post} featured={true} />
              ))}
            </div>
          </div>
        )}

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-gray-800 border-gray-700 text-white placeholder-gray-400"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {sectors.map((sector) => {
              const Icon = sector.icon;
              return (
                <Button
                  key={sector.id}
                  variant={selectedSector === sector.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedSector(sector.id)}
                  className={`
                    ${selectedSector === sector.id 
                      ? 'bg-cyan-600 text-white' 
                      : 'border-gray-600 text-gray-300 hover:border-cyan-400 hover:text-cyan-400'
                    }
                  `}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {sector.name}
                </Button>
              );
            })}
          </div>
        </div>

        {/* All Articles */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">All Articles</h2>
          <Badge variant="outline" className="text-cyan-400 border-cyan-400">
            {filteredPosts.length} articles
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post, index) => (
            <BlogCard key={index} post={post} />
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <div className="text-gray-400 text-lg mb-2">No articles found</div>
            <div className="text-gray-500">Try adjusting your search or filter criteria</div>
          </div>
        )}
      </div>
    </div>
  );
}