import { useState } from "react";
import { MarketingLayout } from "@/components/MarketingLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Search,
  Mic,
  Play,
  Download,
  Star,
  Filter,
  Calendar,
  Clock,
  Building,
  GraduationCap,
  School,
  Users
} from "lucide-react";
import cybersecurityImg from "@/assets/images/cybersecurity-team.png";
import threatImg from "@/assets/images/threat-monitoring.png";
import federalImg from "@/assets/images/federal-agency.png";
import uniImg from "@/assets/images/university.png";
import schoolImg from "@/assets/images/school-district.png";

const categories = [
  "AI Security",
  "Threat Intelligence",
  "Compliance",
  "Federal Government",
  "Higher Education",
  "K-12 Education",
  "Industry Insights",
  "Leadership",
  "Technical Deep Dives"
];

const industries = [
  "Federal Government",
  "Higher Education", 
  "K-12 Education",
  "Cross-Industry"
];

const podcasts = [
  {
    title: "The Future of AI Security",
    description: "Industry leaders discuss emerging AI threats and defense strategies for the next decade.",
    category: "AI Security",
    industry: "Cross-Industry",
    duration: "45 min",
    episode: "Episode 1",
    publishDate: "January 2025",
    downloadCount: "12,400",
    featured: true,
    image: cybersecurityImg
  },
  {
    title: "Federal AI Implementation Best Practices",
    description: "Government cybersecurity experts share insights on secure AI deployment in federal agencies.",
    category: "Federal Government",
    industry: "Federal Government",
    duration: "38 min",
    episode: "Episode 2",
    publishDate: "December 2024",
    downloadCount: "8,900",
    featured: true,
    image: federalImg
  },
  {
    title: "Campus Security in the AI Era",
    description: "University CISOs discuss protecting academic institutions from AI-powered threats.",
    category: "Higher Education",
    industry: "Higher Education",
    duration: "42 min",
    episode: "Episode 3",
    publishDate: "November 2024",
    downloadCount: "6,700",
    featured: true,
    image: uniImg
  },
  {
    title: "Protecting Student Data with AI",
    description: "K-12 technology leaders explore AI solutions for enhanced student privacy and security.",
    category: "K-12 Education",
    industry: "K-12 Education",
    duration: "35 min",
    episode: "Episode 4",
    publishDate: "October 2024",
    downloadCount: "5,200",
    featured: false,
    image: schoolImg
  },
  {
    title: "Threat Intelligence Revolution",
    description: "Security analysts discuss how AI is transforming threat detection and response capabilities.",
    category: "Threat Intelligence",
    industry: "Cross-Industry",
    duration: "50 min",
    episode: "Episode 5",
    publishDate: "September 2024",
    downloadCount: "9,800",
    featured: false,
    image: threatImg
  },
  {
    title: "Compliance Automation Success Stories",
    description: "Compliance officers share real-world examples of AI-driven regulatory compliance achievements.",
    category: "Compliance",
    industry: "Cross-Industry",
    duration: "40 min",
    episode: "Episode 6",
    publishDate: "August 2024",
    downloadCount: "7,300",
    featured: false,
    image: cybersecurityImg
  }
];

export default function Podcasts() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);

  const filteredPodcasts = podcasts.filter(podcast => {
    const matchesSearch = podcast.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         podcast.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(podcast.category);
    const matchesIndustry = selectedIndustries.length === 0 || selectedIndustries.includes(podcast.industry);
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

  const PodcastCard = ({ podcast }: { podcast: any }) => (
    <Card className="bg-gray-800 border-gray-700 hover:border-cyan-500/50 transition-all duration-200 group">
      <div className="flex">
        <div className="w-1/3">
          <img 
            src={podcast.image} 
            alt={podcast.title}
            className="w-full h-full object-cover rounded-l-lg"
          />
        </div>
        <div className="w-2/3">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className="text-white group-hover:text-cyan-400 transition-colors text-lg">
                  {podcast.title}
                </CardTitle>
                <CardDescription className="text-gray-300 mt-2">
                  {podcast.description}
                </CardDescription>
              </div>
              {podcast.featured && (
                <Star className="w-5 h-5 text-yellow-400 ml-4" />
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4 text-sm text-gray-400">
              <div className="flex items-center">
                <Mic className="w-4 h-4 mr-1" />
                {podcast.episode}
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {podcast.duration}
              </div>
              <div className="flex items-center">
                <Download className="w-4 h-4 mr-1" />
                {podcast.downloadCount}
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <Badge 
                variant="outline" 
                className={`
                  ${podcast.industry === 'Federal Government' ? 'text-blue-400 border-blue-400' : ''}
                  ${podcast.industry === 'Higher Education' ? 'text-green-400 border-green-400' : ''}
                  ${podcast.industry === 'K-12 Education' ? 'text-yellow-400 border-yellow-400' : ''}
                  ${podcast.industry === 'Cross-Industry' ? 'text-purple-400 border-purple-400' : ''}
                `}
              >
                {podcast.category}
              </Badge>
              <div className="flex gap-2">
                <Button size="sm" className="bg-cyan-600 hover:bg-cyan-700 text-white">
                  <Play className="w-4 h-4 mr-1" />
                  Listen
                </Button>
                <Button size="sm" variant="outline" className="border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black">
                  <Download className="w-4 h-4 mr-1" />
                  Download
                </Button>
              </div>
            </div>
          </CardContent>
        </div>
      </div>
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
              Podcasts
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl">
              Listen to cybersecurity experts discuss AI security, threat intelligence, and industry insights.
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
                      placeholder="Search podcasts..."
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

            {/* Podcasts List */}
            <div className="lg:w-3/4">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-gray-400">
                  Showing {filteredPodcasts.length} of {podcasts.length} podcasts
                </p>
                <Badge variant="outline" className="text-cyan-400 border-cyan-400">
                  {filteredPodcasts.length} results
                </Badge>
              </div>

              <div className="space-y-6">
                {filteredPodcasts.map((podcast, index) => (
                  <PodcastCard key={index} podcast={podcast} />
                ))}
              </div>

              {filteredPodcasts.length === 0 && (
                <div className="text-center py-16">
                  <Mic className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <div className="text-gray-400 text-lg mb-2">No podcasts found</div>
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