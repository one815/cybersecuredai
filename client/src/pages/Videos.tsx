import { useState } from "react";
import { MarketingLayout } from "@/components/MarketingLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Search,
  Video,
  Play,
  Clock,
  Star,
  Filter,
  Eye,
  Building,
  GraduationCap,
  School,
  Users
} from "lucide-react";
import govAIFundamentalsImg from "@assets/generated_images/Government_AI_Security_Fundamentals_722b26ac.png";
import advThreatDetectionImg from "@assets/generated_images/Advanced_Threat_Detection_Video_03258c71.png";
import ferpaComplianceVideoImg from "@assets/generated_images/FERPA_Compliance_Training_Video_c287b1a6.png";
import k12StudentDataProtImg from "@assets/generated_images/K12_Student_Data_Protection_3f09fa2a.png";
import zeroTrustArchVideoImg from "@assets/generated_images/Zero_Trust_Architecture_Video_8765cbeb.png";
import fedAgencyCaseStudyImg from "@assets/generated_images/Federal_Agency_Case_Study_6de66494.png";
import aiComplianceAutoVideoImg from "@assets/generated_images/AI_Compliance_Automation_Video_c14385ca.png";
import univResearchDataProtImg from "@assets/generated_images/University_Research_Data_Protection_2c521546.png";

const categories = [
  "AI Security Fundamentals",
  "Threat Detection",
  "Compliance Training",
  "Implementation Guides",
  "Best Practices",
  "Case Studies",
  "Technical Deep Dives"
];

const industries = [
  "Federal Government",
  "Higher Education", 
  "K-12 Education",
  "Cross-Industry"
];

const videoTopics = [
  {
    title: "AI Security Fundamentals for Government Agencies",
    description: "Introduction to AI security concepts and implementation strategies specifically designed for federal and state government environments.",
    category: "AI Security Fundamentals",
    industry: "Federal Government",
    duration: "25 min",
    viewCount: "8,400",
    featured: true,
    level: "Beginner",
    image: govAIFundamentalsImg
  },
  {
    title: "Advanced Threat Detection with AI",
    description: "Deep dive into AI-powered threat detection systems, including machine learning algorithms and pattern recognition techniques.",
    category: "Threat Detection",
    industry: "Cross-Industry",
    duration: "45 min",
    viewCount: "12,300",
    featured: true,
    level: "Advanced",
    image: advThreatDetectionImg
  },
  {
    title: "FERPA Compliance in AI Systems",
    description: "Understanding and implementing FERPA compliance requirements when deploying AI security solutions in educational environments.",
    category: "Compliance Training",
    industry: "Higher Education",
    duration: "30 min",
    viewCount: "5,700",
    featured: true,
    level: "Intermediate",
    image: ferpaComplianceVideoImg
  },
  {
    title: "K-12 Student Data Protection Strategies",
    description: "Comprehensive guide to protecting student data and privacy in K-12 educational technology environments using AI security.",
    category: "Best Practices",
    industry: "K-12 Education",
    duration: "35 min",
    viewCount: "6,900",
    featured: false,
    level: "Intermediate",
    image: k12StudentDataProtImg
  },
  {
    title: "Zero Trust Architecture Implementation",
    description: "Step-by-step implementation guide for zero trust security architecture with AI-powered monitoring and access control.",
    category: "Implementation Guides",
    industry: "Cross-Industry",
    duration: "55 min",
    viewCount: "9,800",
    featured: false,
    level: "Advanced",
    image: zeroTrustArchVideoImg
  },
  {
    title: "Federal Agency AI Security Case Study",
    description: "Real-world case study of a major federal agency's successful AI security implementation and lessons learned.",
    category: "Case Studies",
    industry: "Federal Government",
    duration: "40 min",
    viewCount: "4,200",
    featured: false,
    level: "Intermediate",
    image: fedAgencyCaseStudyImg
  },
  {
    title: "AI Security Compliance Automation",
    description: "Technical deep dive into automating compliance processes using AI, including audit trails and regulatory reporting.",
    category: "Technical Deep Dives",
    industry: "Cross-Industry",
    duration: "50 min",
    viewCount: "7,600",
    featured: false,
    level: "Advanced",
    image: aiComplianceAutoVideoImg
  },
  {
    title: "University Research Data Protection",
    description: "Protecting sensitive research data and intellectual property in university environments using AI security frameworks.",
    category: "Best Practices",
    industry: "Higher Education",
    duration: "38 min",
    viewCount: "3,800",
    featured: false,
    level: "Intermediate",
    image: univResearchDataProtImg
  }
];

export default function Videos() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);

  const filteredVideos = videoTopics.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         video.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(video.category);
    const matchesIndustry = selectedIndustries.length === 0 || selectedIndustries.includes(video.industry);
    return matchesSearch && matchesCategory && matchesIndustry;
  });

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, category]);
    } else {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    }
  };

  const handleIndustryChange = (industry: string, checked: boolean) => {
    if (checked) {
      setSelectedIndustries([...selectedIndustries, industry]);
    } else {
      setSelectedIndustries(selectedIndustries.filter(i => i !== industry));
    }
  };

  const VideoCard = ({ video }: { video: any }) => (
    <Card className="bg-gray-800 border-gray-700 hover:border-cyan-500/50 transition-all duration-200 group">
      <div className="relative">
        <img 
          src={video.image} 
          alt={video.title}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-t-lg">
          <Play className="w-12 h-12 text-white" />
        </div>
        {video.featured && (
          <Star className="absolute top-2 right-2 w-5 h-5 text-yellow-400" />
        )}
        <Badge 
          className={`absolute bottom-2 right-2 ${
            video.level === 'Beginner' ? 'bg-green-600' : 
            video.level === 'Intermediate' ? 'bg-yellow-600' : 
            'bg-red-600'
          }`}
        >
          {video.level}
        </Badge>
      </div>
      <CardHeader>
        <CardTitle className="text-white group-hover:text-cyan-400 transition-colors text-lg">
          {video.title}
        </CardTitle>
        <CardDescription className="text-gray-300">
          {video.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-4 text-sm text-gray-400">
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            {video.duration}
          </div>
          <div className="flex items-center">
            <Eye className="w-4 h-4 mr-1" />
            {video.viewCount} views
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <Badge 
            variant="outline" 
            className={`
              ${video.industry === 'Federal Government' ? 'text-blue-400 border-blue-400' : ''}
              ${video.industry === 'Higher Education' ? 'text-green-400 border-green-400' : ''}
              ${video.industry === 'K-12 Education' ? 'text-yellow-400 border-yellow-400' : ''}
              ${video.industry === 'Cross-Industry' ? 'text-purple-400 border-purple-400' : ''}
            `}
          >
            {video.category}
          </Badge>
          <Button size="sm" className="bg-cyan-600 hover:bg-cyan-700 text-white">
            <Play className="w-4 h-4 mr-1" />
            Watch Now
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
              Videos
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl">
              Educational video content covering AI security fundamentals, implementation guides, and technical deep dives.
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
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
                      placeholder="Search videos..."
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

                  {/* Industries */}
                  <div>
                    <h3 className="text-white font-medium mb-3">Industry</h3>
                    <div className="space-y-2">
                      {industries.map((industry) => (
                        <div key={industry} className="flex items-center space-x-2">
                          <Checkbox
                            id={`industry-${industry}`}
                            checked={selectedIndustries.includes(industry)}
                            onCheckedChange={(checked) => handleIndustryChange(industry, checked as boolean)}
                            className="border-gray-600 data-[state=checked]:bg-cyan-600"
                          />
                          <label
                            htmlFor={`industry-${industry}`}
                            className="text-sm text-gray-300 cursor-pointer"
                          >
                            {industry}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Videos Grid */}
            <div className="lg:w-3/4">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-gray-400">
                  Showing {filteredVideos.length} of {videoTopics.length} videos
                </p>
                <Badge variant="outline" className="text-cyan-400 border-cyan-400">
                  {filteredVideos.length} results
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredVideos.map((video, index) => (
                  <VideoCard key={index} video={video} />
                ))}
              </div>

              {filteredVideos.length === 0 && (
                <div className="text-center py-16">
                  <Video className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <div className="text-gray-400 text-lg mb-2">No videos found</div>
                  <div className="text-gray-500">Try adjusting your search or filter criteria</div>
                  <Button 
                    variant="outline" 
                    className="mt-4 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black"
                    onClick={() => {
                      setSearchTerm("");
                      setSelectedCategories([]);
                      setSelectedIndustries([]);
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
    </MarketingLayout>
  );
}