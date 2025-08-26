import { useState } from "react";
import { MarketingLayout } from "@/components/MarketingLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Search,
  Users,
  ExternalLink,
  Star,
  Filter,
  TrendingUp,
  Building,
  GraduationCap,
  School,
  Award,
  CheckCircle
} from "lucide-react";
import placeholderImg from "@/assets/images/placeholder.svg";

const categories = [
  "Implementation Success",
  "ROI & Cost Savings", 
  "Threat Prevention",
  "Compliance Achievement",
  "Digital Transformation",
  "Partnership Stories"
];

const industries = [
  "Federal Government",
  "Higher Education", 
  "K-12 Education",
  "Cross-Industry"
];

const clientStories = [
  {
    title: "Federal Agency Reduces Security Incidents by 89%",
    client: "U.S. Department of Education",
    description: "How a major federal agency transformed their cybersecurity posture using CyberSecure AI's comprehensive platform, achieving unprecedented threat detection and response capabilities.",
    category: "Threat Prevention",
    industry: "Federal Government",
    results: ["89% reduction in security incidents", "$2.3M annual savings", "50% faster incident response"],
    readTime: "8 min read",
    featured: true,
    image: placeholderImg
  },
  {
    title: "State University Achieves 100% FERPA Compliance",
    client: "California State University System",
    description: "Complete digital transformation story of how CSU implemented campus-wide cybersecurity measures while maintaining educational accessibility and student privacy.",
    category: "Compliance Achievement", 
    industry: "Higher Education",
    results: ["100% FERPA compliance", "75% reduction in data breaches", "Enhanced student privacy protection"],
    readTime: "12 min read",
    featured: true,
    image: placeholderImg
  },
  {
    title: "K-12 District Saves $1.2M Annually on Security",
    client: "Austin Independent School District",
    description: "How Texas's second-largest school district modernized their cybersecurity infrastructure while reducing costs and improving educational technology safety.",
    category: "ROI & Cost Savings",
    industry: "K-12 Education", 
    results: ["$1.2M annual cost savings", "Zero successful phishing attacks", "95% user satisfaction"],
    readTime: "10 min read",
    featured: true,
    image: placeholderImg
  },
  {
    title: "Multi-Agency Collaboration Platform Success",
    client: "State of Colorado",
    description: "Statewide implementation enabling secure information sharing across multiple government agencies while maintaining strict security protocols.",
    category: "Digital Transformation",
    industry: "Federal Government",
    results: ["15 agencies connected", "Secure data sharing enabled", "30% operational efficiency gain"],
    readTime: "15 min read", 
    featured: false,
    image: placeholderImg
  },
  {
    title: "Research University Protects Intellectual Property",
    client: "MIT Technology Research Division",
    description: "Comprehensive security implementation protecting valuable research data and intellectual property from sophisticated threat actors.",
    category: "Threat Prevention",
    industry: "Higher Education",
    results: ["Zero IP theft incidents", "Advanced threat detection", "Researcher productivity maintained"],
    readTime: "11 min read",
    featured: false,
    image: placeholderImg
  },
  {
    title: "Rural School District Digital Equity Success",
    client: "Montana Rural Education Consortium", 
    description: "Enabling secure remote learning and digital equity across 47 rural schools with limited IT resources.",
    category: "Implementation Success",
    industry: "K-12 Education",
    results: ["100% secure remote learning", "Digital equity achieved", "Teacher satisfaction up 85%"],
    readTime: "9 min read",
    featured: false,
    image: placeholderImg
  }
];

const getIndustryIcon = (industry: string) => {
  switch (industry) {
    case "Federal Government":
      return <Building className="w-4 h-4" />;
    case "Higher Education":
      return <GraduationCap className="w-4 h-4" />;
    case "K-12 Education":
      return <School className="w-4 h-4" />;
    case "Cross-Industry":
      return <Users className="w-4 h-4" />;
    default:
      return <Users className="w-4 h-4" />;
  }
};

export default function ClientStories() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);

  const filteredStories = clientStories.filter(story => {
    const matchesSearch = story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         story.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         story.client.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(story.category);
    const matchesIndustry = selectedIndustries.length === 0 || selectedIndustries.includes(story.industry);
    const matchesFeatured = !showFeaturedOnly || story.featured;
    
    return matchesSearch && matchesCategory && matchesIndustry && matchesFeatured;
  });

  const featuredStories = clientStories.filter(story => story.featured);

  return (
    <MarketingLayout>
      <div className="min-h-screen ai-dashboard-bg text-white">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-midnight-900 via-midnight-800 to-midnight-900 py-24">
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
          <div className="container mx-auto px-6 relative">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-spring-400 to-cyber-blue-400 bg-clip-text text-transparent">
                Client Stories
              </h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Real success stories from government agencies and educational institutions who have 
                transformed their cybersecurity posture with CyberSecure AI.
              </p>
              <div className="flex items-center justify-center gap-4 text-sm text-gray-400">
                <span className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  {clientStories.length} Success Stories
                </span>
                <span className="flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  Proven Results
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Stories */}
        <div className="py-16 bg-midnight-950/50">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold mb-8 text-center">Featured Success Stories</h2>
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {featuredStories.map((story, index) => (
                <Card key={index} className="bg-midnight-800/50 border-midnight-700 hover:border-spring-400/50 transition-all duration-300 group">
                  <div className="relative overflow-hidden">
                    <img 
                      src={story.image} 
                      alt={story.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-spring-500 text-black font-semibold">
                        <Star className="w-3 h-3 mr-1" />
                        Featured
                      </Badge>
                    </div>
                    <div className="absolute top-4 right-4">
                      <Badge variant="outline" className="bg-midnight-900/90 border-midnight-600 text-white">
                        {story.readTime}
                      </Badge>
                    </div>
                  </div>
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {getIndustryIcon(story.industry)}
                        <span className="text-sm text-spring-400">{story.industry}</span>
                      </div>
                      <Badge variant="outline" className="border-midnight-600 text-gray-400 text-xs">
                        {story.category}
                      </Badge>
                    </div>
                    <CardTitle className="text-white group-hover:text-spring-400 transition-colors">
                      {story.title}
                    </CardTitle>
                    <p className="text-sm text-spring-300 font-medium">{story.client}</p>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-300 mb-4 line-clamp-3">
                      {story.description}
                    </CardDescription>
                    <div className="space-y-2 mb-4">
                      {story.results.slice(0, 2).map((result, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-spring-400 flex-shrink-0" />
                          <span className="text-gray-300">{result}</span>
                        </div>
                      ))}
                    </div>
                    <Button 
                      size="sm" 
                      className="w-full bg-spring-500 hover:bg-spring-600 text-black font-semibold"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Read Full Story
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="py-8 bg-midnight-900/50">
          <div className="container mx-auto px-6">
            <div className="bg-midnight-800/50 border border-midnight-700 rounded-lg p-6">
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Search */}
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      placeholder="Search client stories..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 bg-midnight-700 border-midnight-600 text-white placeholder-gray-400"
                    />
                  </div>
                </div>

                {/* Category Filter */}
                <div className="lg:w-64">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Filter className="w-4 h-4 text-spring-400" />
                      <span className="text-sm font-medium text-spring-400">Category</span>
                    </div>
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {categories.map((category) => (
                        <label key={category} className="flex items-center space-x-2 cursor-pointer">
                          <Checkbox
                            checked={selectedCategories.includes(category)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedCategories([...selectedCategories, category]);
                              } else {
                                setSelectedCategories(selectedCategories.filter(c => c !== category));
                              }
                            }}
                            className="data-[state=checked]:bg-spring-500 data-[state=checked]:border-spring-500"
                          />
                          <span className="text-sm text-gray-300">{category}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Industry Filter */}
                <div className="lg:w-48">
                  <div className="space-y-3">
                    <span className="text-sm font-medium text-spring-400">Industry</span>
                    <div className="space-y-2">
                      {industries.map((industry) => (
                        <label key={industry} className="flex items-center space-x-2 cursor-pointer">
                          <Checkbox
                            checked={selectedIndustries.includes(industry)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedIndustries([...selectedIndustries, industry]);
                              } else {
                                setSelectedIndustries(selectedIndustries.filter(i => i !== industry));
                              }
                            }}
                            className="data-[state=checked]:bg-spring-500 data-[state=checked]:border-spring-500"
                          />
                          <span className="text-sm text-gray-300">{industry}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Featured Filter */}
                <div className="lg:w-32">
                  <div className="space-y-3">
                    <span className="text-sm font-medium text-spring-400">Options</span>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <Checkbox
                        checked={showFeaturedOnly}
                        onCheckedChange={(checked) => setShowFeaturedOnly(checked === true)}
                        className="data-[state=checked]:bg-spring-500 data-[state=checked]:border-spring-500"
                      />
                      <span className="text-sm text-gray-300">Featured only</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Active Filters */}
              {(selectedCategories.length > 0 || selectedIndustries.length > 0 || showFeaturedOnly) && (
                <div className="mt-4 pt-4 border-t border-midnight-600">
                  <div className="flex flex-wrap gap-2">
                    {selectedCategories.map((category) => (
                      <Badge key={category} variant="outline" className="border-spring-400 text-spring-400">
                        {category}
                        <button
                          onClick={() => setSelectedCategories(selectedCategories.filter(c => c !== category))}
                          className="ml-2 hover:text-white"
                        >
                          ×
                        </button>
                      </Badge>
                    ))}
                    {selectedIndustries.map((industry) => (
                      <Badge key={industry} variant="outline" className="border-spring-400 text-spring-400">
                        {industry}
                        <button
                          onClick={() => setSelectedIndustries(selectedIndustries.filter(i => i !== industry))}
                          className="ml-2 hover:text-white"
                        >
                          ×
                        </button>
                      </Badge>
                    ))}
                    {showFeaturedOnly && (
                      <Badge variant="outline" className="border-spring-400 text-spring-400">
                        Featured
                        <button
                          onClick={() => setShowFeaturedOnly(false)}
                          className="ml-2 hover:text-white"
                        >
                          ×
                        </button>
                      </Badge>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Stories Grid */}
        <div className="py-16">
          <div className="container mx-auto px-6">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold">
                All Client Stories 
                <span className="text-spring-400 ml-2">({filteredStories.length})</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredStories.map((story, index) => (
                <Card key={index} className="bg-midnight-800/50 border-midnight-700 hover:border-spring-400/50 transition-all duration-300 group">
                  <div className="relative overflow-hidden">
                    <img 
                      src={story.image} 
                      alt={story.title}
                      className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {story.featured && (
                      <div className="absolute top-3 left-3">
                        <Badge className="bg-spring-500 text-black font-semibold text-xs">
                          Featured
                        </Badge>
                      </div>
                    )}
                    <div className="absolute top-3 right-3">
                      <Badge variant="outline" className="bg-midnight-900/90 border-midnight-600 text-white text-xs">
                        {story.readTime}
                      </Badge>
                    </div>
                  </div>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {getIndustryIcon(story.industry)}
                        <span className="text-xs text-spring-400">{story.industry}</span>
                      </div>
                      <Badge variant="outline" className="border-midnight-600 text-gray-400 text-xs">
                        {story.category}
                      </Badge>
                    </div>
                    <CardTitle className="text-sm text-white group-hover:text-spring-400 transition-colors line-clamp-2">
                      {story.title}
                    </CardTitle>
                    <p className="text-xs text-spring-300 font-medium">{story.client}</p>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <CardDescription className="text-gray-300 mb-3 text-sm line-clamp-2">
                      {story.description}
                    </CardDescription>
                    <div className="space-y-1 mb-3">
                      {story.results.slice(0, 2).map((result, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs">
                          <CheckCircle className="w-3 h-3 text-spring-400 flex-shrink-0" />
                          <span className="text-gray-400">{result}</span>
                        </div>
                      ))}
                    </div>
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="w-full border-spring-400 text-spring-400 hover:bg-spring-400 hover:text-black text-xs"
                    >
                      <ExternalLink className="w-3 h-3 mr-2" />
                      Read Story
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredStories.length === 0 && (
              <div className="text-center py-12">
                <Users className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-400 mb-2">No stories found</h3>
                <p className="text-gray-500">Try adjusting your filters or search terms</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </MarketingLayout>
  );
}