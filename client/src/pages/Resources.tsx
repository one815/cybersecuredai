import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Search,
  BookOpen,
  FileText,
  Video,
  GraduationCap,
  Building,
  School,
  Shield,
  Users,
  ExternalLink,
  Download,
  Play,
  Eye,
  Star,
  Filter,
  ChevronDown
} from "lucide-react";

const categories = [
  "AI & Machine Learning",
  "Threat Intelligence",
  "Cloud Security", 
  "Data Protection",
  "Endpoint Protection",
  "Identity Protection",
  "Incident Response",
  "Managed Security",
  "Next-Gen SIEM",
  "Federal Government",
  "Higher Education",
  "K-12 Education",
  "Small Business"
];

const resourceTypes = [
  "Case Study",
  "Course",
  "CrowdCast",
  "Customer Story", 
  "Data Sheet",
  "Demo",
  "Guide",
  "Handbook",
  "Infographic",
  "Report",
  "Video",
  "Webinar",
  "White Paper"
];

const featuredResources = [
  {
    title: "2025 AI Security Threat Report",
    description: "Adversaries weaponize and target AI at scale - comprehensive analysis of emerging threats.",
    type: "Report",
    category: "AI & Machine Learning",
    sector: "general",
    downloadCount: "15,400",
    featured: true,
    image: "/api/placeholder/400/250"
  },
  {
    title: "CyberSecure AI named Leader in Cybersecurity",
    description: "Leading the way in AI-powered cybersecurity solutions for educational institutions and government.",
    type: "Report", 
    category: "Industry Recognition",
    sector: "general",
    downloadCount: "8,900",
    featured: true,
    image: "/api/placeholder/400/250"
  },
  {
    title: "CyberSecure AI 2025 Global Security Report",
    description: "Get your copy of the must-read cybersecurity report of the year - comprehensive threat landscape.",
    type: "Report",
    category: "Threat Intelligence", 
    sector: "general",
    downloadCount: "22,300",
    featured: true,
    image: "/api/placeholder/400/250"
  }
];

const allResources = [
  // Courses
  {
    title: "Federal AI Security Fundamentals",
    description: "Government-specific threats, FISMA compliance, and federal security frameworks",
    type: "Course",
    category: "Federal Government",
    sector: "federal",
    duration: "8 hours",
    level: "Intermediate",
    downloadCount: "1,247"
  },
  {
    title: "University Research Security",
    description: "Academic-specific threats, research data protection, and scholarly integrity safeguards",
    type: "Course",
    category: "Higher Education",
    sector: "higher-ed",
    duration: "6 hours",
    level: "Intermediate",
    downloadCount: "2,156"
  },
  {
    title: "K-12 AI Security Essentials",
    description: "Age-appropriate protections, educational technology security, and student safety frameworks",
    type: "Course",
    category: "K-12 Education",
    sector: "k12",
    duration: "4 hours",
    level: "Beginner",
    downloadCount: "3,421"
  },
  // White Papers
  {
    title: "Quantifying AI Security ROI: Metrics and Measurement Frameworks",
    description: "Comprehensive framework for measuring and demonstrating AI security value",
    type: "White Paper",
    category: "AI & Machine Learning",
    sector: "general",
    pages: "45",
    downloadCount: "3,200"
  },
  {
    title: "Privacy-Preserving AI: Implementing Federated Learning",
    description: "Technical implementation guide for secure federated learning systems",
    type: "White Paper",
    category: "AI & Machine Learning",
    sector: "general",
    pages: "38",
    downloadCount: "2,800"
  },
  // Webinars
  {
    title: "Securing Federal AI Infrastructure: NIST Framework Implementation",
    description: "Regulatory compliance walkthrough and federal case studies",
    type: "Webinar",
    category: "Federal Government",
    sector: "federal",
    duration: "60 min",
    attendees: "1,200+",
    downloadCount: "3,400"
  },
  {
    title: "Campus-Wide AI Security: Protecting University Research Assets",
    description: "Academic threat models and research protection strategies",
    type: "Webinar",
    category: "Higher Education",
    sector: "higher-ed",
    duration: "45 min",
    attendees: "800+",
    downloadCount: "1,600"
  },
  // Handbooks
  {
    title: "The Definitive AI Security Handbook",
    description: "Strategies, tools, and techniques for protecting intelligent systems",
    type: "Handbook",
    category: "AI & Machine Learning",
    sector: "general",
    pages: "300+",
    downloadCount: "8,900"
  },
  {
    title: "Federal AI Security Handbook: Compliance, Protection, and Response",
    description: "Comprehensive guide for government AI security implementation",
    type: "Handbook",
    category: "Federal Government",
    sector: "federal",
    pages: "250+",
    downloadCount: "2,400"
  },
  // Customer Stories
  {
    title: "Federal Zero Trust Architecture Implementation",
    description: "47% reduction in security incidents while ensuring AI systems remain secure and compliant",
    type: "Customer Story",
    category: "Federal Government",
    sector: "federal",
    results: "47% reduction in incidents",
    downloadCount: "1,900"
  },
  {
    title: "Research Collaboration Security Success",
    description: "Shared security standards for multi-institution research projects",
    type: "Customer Story",
    category: "Higher Education",
    sector: "higher-ed",
    results: "Protected $50M+ in research",
    downloadCount: "1,600"
  }
];

export default function Resources() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const filteredResources = allResources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(resource.category);
    const matchesType = selectedTypes.length === 0 || selectedTypes.includes(resource.type);
    return matchesSearch && matchesCategory && matchesType;
  });

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, category]);
    } else {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    }
  };

  const handleTypeChange = (type: string, checked: boolean) => {
    if (checked) {
      setSelectedTypes([...selectedTypes, type]);
    } else {
      setSelectedTypes(selectedTypes.filter(t => t !== type));
    }
  };

  const FeaturedCard = ({ resource }: { resource: any }) => (
    <Card className="bg-gray-800 border-gray-700 hover:border-cyan-500/50 transition-all duration-200 group">
      <div className="aspect-video bg-gradient-to-br from-cyan-600/20 to-blue-600/20 rounded-t-lg flex items-center justify-center">
        <div className="text-cyan-400 text-6xl opacity-30">
          <Shield />
        </div>
      </div>
      <CardHeader>
        <CardTitle className="text-white group-hover:text-cyan-400 transition-colors text-xl">
          {resource.title}
        </CardTitle>
        <CardDescription className="text-gray-300">
          {resource.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <Badge variant="outline" className="text-cyan-400 border-cyan-400">
            {resource.type}
          </Badge>
          <Button className="bg-cyan-600 hover:bg-cyan-700 text-white">
            <Download className="w-4 h-4 mr-1" />
            Download
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const ResourceCard = ({ resource }: { resource: any }) => (
    <Card className="bg-gray-800 border-gray-700 hover:border-cyan-500/50 transition-all duration-200 group">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-white group-hover:text-cyan-400 transition-colors text-lg">
              {resource.title}
            </CardTitle>
            <CardDescription className="text-gray-300 mt-2">
              {resource.description}
            </CardDescription>
          </div>
          <Badge variant="outline" className="ml-4 text-cyan-400 border-cyan-400">
            {resource.type}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-4 text-sm text-gray-400">
          <div className="flex items-center">
            <Download className="w-4 h-4 mr-1" />
            {resource.downloadCount} downloads
          </div>
          {resource.duration && (
            <div className="flex items-center">
              <Play className="w-4 h-4 mr-1" />
              {resource.duration}
            </div>
          )}
          {resource.pages && (
            <div className="flex items-center">
              <FileText className="w-4 h-4 mr-1" />
              {resource.pages}
            </div>
          )}
        </div>
        
        <div className="flex justify-between items-center">
          <Badge 
            variant="outline" 
            className={`
              ${resource.sector === 'federal' ? 'text-blue-400 border-blue-400' : ''}
              ${resource.sector === 'higher-ed' ? 'text-green-400 border-green-400' : ''}
              ${resource.sector === 'k12' ? 'text-yellow-400 border-yellow-400' : ''}
              ${resource.sector === 'general' ? 'text-purple-400 border-purple-400' : ''}
            `}
          >
            {resource.category}
          </Badge>
          <Button size="sm" variant="outline" className="border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black">
            <ExternalLink className="w-4 h-4 mr-1" />
            View
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <MarketingLayout>
      <div className="ai-dashboard-bg min-h-screen text-white">
        {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-gray-900 via-blue-900/20 to-cyan-900/20 py-24">
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent"></div>
        <div className="relative container mx-auto px-4">
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            Resource Center
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl">
            Reports, white papers, webinars, and more comprehensive cybersecurity resources.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Featured Resources */}
        <div className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredResources.map((resource, index) => (
              <FeaturedCard key={index} resource={resource} />
            ))}
          </div>
        </div>

        {/* All Resources Section */}
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-white mb-8">All Resources</h2>
          
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
                      placeholder="Search resources..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                    />
                  </div>

                  {/* Categories */}
                  <div>
                    <h3 className="text-white font-medium mb-3">Category</h3>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {categories.map((category) => (
                        <div key={category} className="flex items-center space-x-2">
                          <Checkbox
                            id={`category-${category}`}
                            checked={selectedCategories.includes(category)}
                            onCheckedChange={(checked) => handleCategoryChange(category, checked as boolean)}
                            className="border-gray-600 data-[state=checked]:bg-cyan-600"
                          />
                          <label
                            htmlFor={`category-${category}`}
                            className="text-sm text-gray-300 cursor-pointer"
                          >
                            {category}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Types */}
                  <div>
                    <h3 className="text-white font-medium mb-3">Type</h3>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {resourceTypes.map((type) => (
                        <div key={type} className="flex items-center space-x-2">
                          <Checkbox
                            id={`type-${type}`}
                            checked={selectedTypes.includes(type)}
                            onCheckedChange={(checked) => handleTypeChange(type, checked as boolean)}
                            className="border-gray-600 data-[state=checked]:bg-cyan-600"
                          />
                          <label
                            htmlFor={`type-${type}`}
                            className="text-sm text-gray-300 cursor-pointer"
                          >
                            {type}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Resources Grid */}
            <div className="lg:w-3/4">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-gray-400">
                  Showing {filteredResources.length} of {allResources.length} resources
                </p>
                <Badge variant="outline" className="text-cyan-400 border-cyan-400">
                  {filteredResources.length} results
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredResources.map((resource, index) => (
                  <ResourceCard key={index} resource={resource} />
                ))}
              </div>

              {filteredResources.length === 0 && (
                <div className="text-center py-16">
                  <Shield className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <div className="text-gray-400 text-lg mb-2">No resources found</div>
                  <div className="text-gray-500">Try adjusting your search or filter criteria</div>
                  <Button 
                    variant="outline" 
                    className="mt-4 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black"
                    onClick={() => {
                      setSearchTerm("");
                      setSelectedCategories([]);
                      setSelectedTypes([]);
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
    </MarketingLayout>
  );
}