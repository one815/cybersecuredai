import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
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
  Calendar,
  Filter
} from "lucide-react";

const blogPosts = [
  // General Blog Posts
  {
    title: "The Intersection of AI and Cybersecurity: Protecting Digital Assets in 2025",
    description: "In today's rapidly evolving digital landscape, the convergence of artificial intelligence and cybersecurity has become not just innovative but essential. Comprehensive analysis of AI's role in modern cybersecurity landscapes, regulatory considerations, and future trends.",
    sector: "general",
    readTime: "12 min",
    author: "Security Research Team",
    publishDate: "2025-01-20",
    views: "2,400",
    featured: true,
    content: `# The Intersection of AI and Cybersecurity: Protecting Digital Assets in 2025

## Introduction

In today's rapidly evolving digital landscape, the convergence of artificial intelligence and cybersecurity has become not just innovative but essential. As organizations increasingly rely on digital assets for their core operations, the stakes for protecting these assets have never been higher. In 2025, we're witnessing unprecedented challenges and opportunities at this critical intersection.

## The Evolving Threat Landscape

Cybersecurity threats have grown exponentially in sophistication. Attackers now leverage AI-powered tools to orchestrate attacks that can adapt, learn, and evade traditional security measures. From deepfake-enabled social engineering to AI-driven vulnerability scanning, the arsenal of cyber adversaries has expanded dramatically.

## AI as Both Sword and Shield

While AI empowers attackers, it also provides defenders with powerful countermeasures. Advanced machine learning algorithms can now:

- Detect anomalous network behavior in real-time, identifying potential breaches before significant damage occurs
- Predict attack vectors based on emerging threat intelligence
- Automate incident response, reducing the critical time between detection and mitigation
- Self-heal systems by automatically implementing patches and security updates

## Protecting Cloud-Based Digital Assets

With the continued migration to cloud environments, protecting digital assets requires specialized approaches. In 2025, effective cloud security strategies include:

- AI-powered identity and access management with continuous authentication
- Quantum-resistant encryption for sensitive data
- Federated learning systems that improve security without compromising data privacy
- Automated compliance monitoring and enforcement

## Regulatory and Ethical Considerations

The regulatory landscape for AI in cybersecurity continues to evolve. Organizations must navigate complex compliance requirements while addressing ethical concerns around AI deployment, including:

- Algorithmic transparency and explainability
- Data privacy implications of AI-powered security monitoring
- Ethical boundaries for autonomous security systems
- Cross-border data protection regulations

## Best Practices for Organizations in 2025

To effectively protect digital assets in today's threat environment, organizations should:

- Implement a Zero Trust architecture enhanced by AI-driven continuous verification
- Develop comprehensive AI governance frameworks specific to security applications
- Invest in human-AI collaborative security teams, combining the strengths of both
- Conduct regular AI-resistant penetration testing
- Participate in industry threat intelligence sharing networks

## Case Study: Financial Services Transformation

Leading financial institutions have revolutionized their security posture through strategic AI integration. One global bank reduced breach detection time by 94% while decreasing false positives by 78% through their AI security operations center. Their approach combines supervised learning for known threats with unsupervised learning to identify novel attack patterns.

## Future Outlook

Looking ahead, we anticipate several emerging trends at the AI-cybersecurity intersection:

- Quantum AI security solutions becoming commercially viable
- Greater emphasis on securing AI systems themselves from manipulation
- Industry-specific AI security frameworks gaining traction
- Integration of emotional intelligence into security AI to better understand human factors

## Conclusion

The intersection of AI and cybersecurity represents both our greatest vulnerability and our most promising defense in protecting digital assets. Organizations that thoughtfully integrate AI into their security strategy while addressing the ethical and regulatory considerations will be best positioned to thrive in the complex digital ecosystem of 2025 and beyond.`
  },
  {
    title: "Zero-Day Vulnerabilities in AI Systems: Detection and Prevention Strategies",
    description: "Latest techniques for identifying and mitigating zero-day threats in AI",
    sector: "general",
    readTime: "10 min",
    author: "Vulnerability Research Team",
    publishDate: "2025-01-18",
    views: "1,800"
  },
  {
    title: "The Dark Side of AI Automation: How Neglected Security Creates Business Vulnerabilities",
    description: "Analysis of security gaps in automated AI systems and their business impact",
    sector: "general",
    readTime: "12 min",
    author: "Business Security Analysts",
    publishDate: "2025-01-15",
    views: "3,200"
  },
  // Federal Government Blog Posts
  {
    title: "Federal Zero Trust Implementation: AI-Powered Security Across Agency Boundaries",
    description: "How federal agencies implement zero trust with AI enhancement",
    sector: "federal",
    readTime: "12 min",
    author: "Federal Security Experts",
    publishDate: "2025-01-22",
    views: "1,500",
    featured: true
  },
  {
    title: "CMMC 3.0 Compliance Through AI: How Federal Contractors Are Meeting New Standards",
    description: "Real-world implementation of CMMC 3.0 using AI-powered compliance tools",
    sector: "federal",
    readTime: "15 min",
    author: "Compliance Specialists",
    publishDate: "2025-01-12",
    views: "1,200"
  },
  // Higher Education Blog Posts
  {
    title: "Campus-Wide AI Security: Results from Three University Pilot Programs",
    description: "Real-world results from university AI security implementations",
    sector: "higher-ed",
    readTime: "10 min",
    author: "Academic Security Team",
    publishDate: "2025-01-19",
    views: "900"
  },
  {
    title: "Research Security in Academia: Protecting AI Innovation Without Hampering Collaboration",
    description: "Balancing security needs with academic freedom and collaboration",
    sector: "higher-ed",
    readTime: "14 min",
    author: "Research Security Experts",
    publishDate: "2025-01-16",
    views: "1,100",
    featured: true
  },
  // K-12 Blog Posts
  {
    title: "Digital Classroom Protection: AI Security Solutions for K-12 Learning Environments",
    description: "Practical security implementations for modern digital classrooms",
    sector: "k12",
    readTime: "8 min",
    author: "Educational Security Team",
    publishDate: "2025-01-21",
    views: "1,600"
  },
  {
    title: "Teaching Cybersecurity Through AI: How K-12 Schools Are Building Security-Aware Digital Citizens",
    description: "Innovative approaches to cybersecurity education in schools",
    sector: "k12",
    readTime: "11 min",
    author: "Education Technology Team",
    publishDate: "2025-01-14",
    views: "1,300"
  }
];

export default function BlogPosts() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSectors, setSelectedSectors] = useState<string[]>([]);

  const sectorNames = ["Federal Government", "Higher Education", "K-12 Education", "General"];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSector = selectedSectors.length === 0 || selectedSectors.some(sector => {
      if (sector === "Federal Government") return post.sector === "federal";
      if (sector === "Higher Education") return post.sector === "higher-ed";
      if (sector === "K-12 Education") return post.sector === "k12";
      if (sector === "General") return post.sector === "general";
      return false;
    });
    return matchesSearch && matchesSector;
  });

  const handleSectorChange = (sector: string, checked: boolean) => {
    if (checked) {
      setSelectedSectors([...selectedSectors, sector]);
    } else {
      setSelectedSectors(selectedSectors.filter(s => s !== sector));
    }
  };

  const featuredPosts = blogPosts.filter(post => post.featured);

  const BlogCard = ({ post }: { post: any }) => (
    <Card className="bg-gray-800 border-gray-700 hover:border-cyan-500/50 transition-all duration-200 group">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-white group-hover:text-cyan-400 transition-colors text-lg">
              {post.title}
            </CardTitle>
            <CardDescription className="text-gray-300 mt-2">
              {post.description}
            </CardDescription>
          </div>
          <Badge variant="outline" className="ml-4 text-cyan-400 border-cyan-400">
            Article
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-4 text-sm text-gray-400">
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            {post.readTime}
          </div>
          <div className="flex items-center">
            <Eye className="w-4 h-4 mr-1" />
            {post.views} views
          </div>
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-1" />
            {new Date(post.publishDate).toLocaleDateString()}
          </div>
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
            {post.author}
          </Badge>
          <Button 
            size="sm" 
            variant="outline" 
            className="border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black"
            onClick={() => window.open(`/marketing/articles/${post.title.toLowerCase().replace(/[^a-z0-9\s]/gi, '').replace(/\s+/g, '-')}`, '_blank')}
          >
            <ExternalLink className="w-4 h-4 mr-1" />
            Read Article
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-gray-900 via-blue-900/20 to-cyan-900/20 py-16">
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent"></div>
        <div className="relative container mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            Security Blog & Articles
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl">
            Latest insights, research, and best practices in AI security
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Featured Articles */}
        {featuredPosts.length > 0 && (
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-8">Featured Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredPosts.map((post, index) => (
                <Card key={index} className="bg-gray-800 border-gray-700 hover:border-cyan-500/50 transition-all duration-200 group">
                  <div className="aspect-video bg-gradient-to-br from-cyan-600/20 to-blue-600/20 rounded-t-lg flex items-center justify-center">
                    <div className="text-cyan-400 text-6xl opacity-30">
                      <FileText />
                    </div>
                  </div>
                  <CardHeader>
                    <Badge className="mb-2 bg-cyan-600 text-white w-fit">Featured</Badge>
                    <CardTitle className="text-white group-hover:text-cyan-400 transition-colors text-xl">
                      {post.title}
                    </CardTitle>
                    <CardDescription className="text-gray-300">
                      {post.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <Badge variant="outline" className="text-cyan-400 border-cyan-400">
                        {post.readTime}
                      </Badge>
                      <Button 
                        className="bg-cyan-600 hover:bg-cyan-700 text-white"
                        onClick={() => window.open(`/marketing/articles/${post.title.toLowerCase().replace(/[^a-z0-9\s]/gi, '').replace(/\s+/g, '-')}`, '_blank')}
                      >
                        <ExternalLink className="w-4 h-4 mr-1" />
                        Read Article
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* All Articles Section */}
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-white mb-8">All Articles</h2>
          
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filter Sidebar */}
            <div className="lg:w-1/4">
              <Card className="bg-gray-800 border-gray-700 sticky top-4">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Filter className="w-5 h-5 mr-2" />
                    Filter by
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Search */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search articles..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                    />
                  </div>

                  {/* Sectors */}
                  <div>
                    <h3 className="text-white font-medium mb-3">Sector</h3>
                    <div className="space-y-2">
                      {sectorNames.map((sector) => (
                        <div key={sector} className="flex items-center space-x-2">
                          <Checkbox
                            id={`sector-${sector}`}
                            checked={selectedSectors.includes(sector)}
                            onCheckedChange={(checked) => handleSectorChange(sector, checked as boolean)}
                            className="border-gray-600 data-[state=checked]:bg-cyan-600"
                          />
                          <label
                            htmlFor={`sector-${sector}`}
                            className="text-sm text-gray-300 cursor-pointer"
                          >
                            {sector}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Articles Grid */}
            <div className="lg:w-3/4">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-gray-400">
                  Showing {filteredPosts.length} of {blogPosts.length} articles
                </p>
                <Badge variant="outline" className="text-cyan-400 border-cyan-400">
                  {filteredPosts.length} results
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredPosts.map((post, index) => (
                  <BlogCard key={index} post={post} />
                ))}
              </div>

              {filteredPosts.length === 0 && (
                <div className="text-center py-16">
                  <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <div className="text-gray-400 text-lg mb-2">No articles found</div>
                  <div className="text-gray-500">Try adjusting your search or filter criteria</div>
                  <Button 
                    variant="outline" 
                    className="mt-4 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black"
                    onClick={() => {
                      setSearchTerm("");
                      setSelectedSectors([]);
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}