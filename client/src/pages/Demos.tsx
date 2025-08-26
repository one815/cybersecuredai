import { useState } from "react";
import { MarketingLayout } from "@/components/MarketingLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Search,
  Play,
  Calendar,
  Clock,
  Star,
  Filter,
  Monitor,
  Building,
  GraduationCap,
  School,
  Users,
  Video
} from "lucide-react";
import demoImg from "@assets/generated_images/CyberSecure_AI_Demo_66434319.png";

const categories = [
  "Platform Overview",
  "Live Demonstrations", 
  "Feature Deep Dives",
  "Integration Showcases",
  "Implementation Walkthroughs",
  "Interactive Tutorials"
];

const industries = [
  "Federal Government",
  "Higher Education", 
  "K-12 Education",
  "Cross-Industry"
];

const demoTypes = [
  "On-Demand Video",
  "Live Demo", 
  "Interactive Tutorial",
  "Scheduled Presentation"
];

const demos = [
  {
    title: "CyberSecure AI Platform Complete Walkthrough",
    description: "Comprehensive 45-minute demonstration of the entire CyberSecure AI platform, including threat detection, incident response, and compliance management features.",
    category: "Platform Overview",
    industry: "Cross-Industry",
    type: "On-Demand Video",
    duration: "45 min",
    viewCount: "12,400",
    featured: true,
    schedulable: false,
    image: demoImg
  },
  {
    title: "AI-Powered Threat Detection in Action",
    description: "Live demonstration of real-time threat detection capabilities, showing how our AI engine identifies and responds to sophisticated cyber attacks.",
    category: "Feature Deep Dives",
    industry: "Federal Government", 
    type: "Live Demo",
    duration: "30 min",
    viewCount: "8,900",
    featured: true,
    schedulable: true,
    image: demoImg
  },
  {
    title: "Higher Education FERPA Compliance Demo",
    description: "Step-by-step walkthrough of compliance management features specifically designed for educational institutions and FERPA requirements.",
    category: "Implementation Walkthroughs",
    industry: "Higher Education",
    type: "Scheduled Presentation", 
    duration: "25 min",
    viewCount: "5,600",
    featured: true,
    schedulable: true,
    image: demoImg
  },
  {
    title: "K-12 Student Data Protection Interactive Tutorial",
    description: "Hands-on interactive tutorial showing how K-12 administrators can implement comprehensive student data protection measures.",
    category: "Interactive Tutorials",
    industry: "K-12 Education",
    type: "Interactive Tutorial",
    duration: "20 min",
    viewCount: "7,200",
    featured: false,
    schedulable: false,
    image: demoImg
  },
  {
    title: "Enterprise Integration Showcase",
    description: "Demonstration of seamless integration capabilities with existing enterprise security tools and government systems.",
    category: "Integration Showcases", 
    industry: "Federal Government",
    type: "On-Demand Video",
    duration: "35 min",
    viewCount: "4,100",
    featured: false,
    schedulable: false,
    image: demoImg
  },
  {
    title: "SOC Dashboard Management Live Demo", 
    description: "Real-time demonstration of Security Operations Center dashboard features, incident management, and threat intelligence integration.",
    category: "Live Demonstrations",
    industry: "Cross-Industry",
    type: "Live Demo",
    duration: "40 min", 
    viewCount: "9,800",
    featured: false,
    schedulable: true,
    image: demoImg
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
      return <Monitor className="w-4 h-4" />;
  }
};

const getTypeIcon = (type: string) => {
  switch (type) {
    case "Live Demo":
      return <Video className="w-4 h-4 text-red-400" />;
    case "Interactive Tutorial":
      return <Monitor className="w-4 h-4 text-blue-400" />;
    case "Scheduled Presentation":
      return <Calendar className="w-4 h-4 text-purple-400" />;
    default:
      return <Play className="w-4 h-4 text-green-400" />;
  }
};

export default function Demos() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);

  const filteredDemos = demos.filter(demo => {
    const matchesSearch = demo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         demo.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(demo.category);
    const matchesIndustry = selectedIndustries.length === 0 || selectedIndustries.includes(demo.industry);
    const matchesType = selectedTypes.length === 0 || selectedTypes.includes(demo.type);
    const matchesFeatured = !showFeaturedOnly || demo.featured;
    
    return matchesSearch && matchesCategory && matchesIndustry && matchesType && matchesFeatured;
  });

  const featuredDemos = demos.filter(demo => demo.featured);

  return (
    <MarketingLayout>
      <div className="min-h-screen ai-dashboard-bg text-white">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-midnight-900 via-midnight-800 to-midnight-900 py-24">
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
          <div className="container mx-auto px-6 relative">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-spring-400 to-cyber-blue-400 bg-clip-text text-transparent">
                Platform Demos
              </h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Experience CyberSecure AI in action through live demonstrations, interactive tutorials, 
                and comprehensive platform walkthroughs tailored to your industry.
              </p>
              <div className="flex items-center justify-center gap-4 text-sm text-gray-400">
                <span className="flex items-center gap-2">
                  <Play className="w-4 h-4" />
                  {demos.length} Demonstrations Available
                </span>
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Live & On-Demand Options
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Demos */}
        <div className="py-16 bg-midnight-950/50">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold mb-8 text-center">Featured Demonstrations</h2>
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {featuredDemos.map((demo, index) => (
                <Card key={index} className="bg-midnight-800/50 border-midnight-700 hover:border-spring-400/50 transition-all duration-300 group">
                  <div className="relative overflow-hidden">
                    <img 
                      src={demo.image} 
                      alt={demo.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300" />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-spring-500 text-midnight-900 font-semibold">
                        <Star className="w-3 h-3 mr-1" />
                        Featured
                      </Badge>
                    </div>
                    <div className="absolute top-4 right-4">
                      <Badge variant="outline" className="bg-midnight-900/90 border-midnight-600 text-white">
                        <Clock className="w-3 h-3 mr-1" />
                        {demo.duration}
                      </Badge>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-spring-500/90 hover:bg-spring-400 rounded-full p-4 transition-all duration-300 group-hover:scale-110">
                        <Play className="w-8 h-8 text-black" />
                      </div>
                    </div>
                  </div>
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {getIndustryIcon(demo.industry)}
                        <span className="text-sm text-spring-400">{demo.industry}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        {getTypeIcon(demo.type)}
                        <span className="text-xs text-gray-400">{demo.type}</span>
                      </div>
                    </div>
                    <CardTitle className="text-white group-hover:text-spring-400 transition-colors">
                      {demo.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-300 mb-4 line-clamp-3">
                      {demo.description}
                    </CardDescription>
                    <div className="flex items-center justify-between mb-4 text-sm text-gray-400">
                      <span className="flex items-center gap-1">
                        <Play className="w-3 h-3" />
                        {demo.viewCount} views
                      </span>
                      <Badge variant="outline" className="border-midnight-600 text-gray-400 text-xs">
                        {demo.category}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <Button 
                        size="sm" 
                        className="w-full bg-spring-500 hover:bg-spring-600 text-midnight-900 font-semibold"
                      >
                        <Play className="w-4 h-4 mr-2" />
                        Watch Demo
                      </Button>
                      {demo.schedulable && (
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="w-full border-spring-400 text-spring-400 hover:bg-spring-400 hover:text-black"
                        >
                          <Calendar className="w-4 h-4 mr-2" />
                          Schedule Live Demo
                        </Button>
                      )}
                    </div>
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
                      placeholder="Search demonstrations..."
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

                {/* Type Filter */}
                <div className="lg:w-48">
                  <div className="space-y-3">
                    <span className="text-sm font-medium text-spring-400">Type</span>
                    <div className="space-y-2">
                      {demoTypes.map((type) => (
                        <label key={type} className="flex items-center space-x-2 cursor-pointer">
                          <Checkbox
                            checked={selectedTypes.includes(type)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedTypes([...selectedTypes, type]);
                              } else {
                                setSelectedTypes(selectedTypes.filter(t => t !== type));
                              }
                            }}
                            className="data-[state=checked]:bg-spring-500 data-[state=checked]:border-spring-500"
                          />
                          <span className="text-sm text-gray-300">{type}</span>
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
              </div>

              {/* Active Filters */}
              {(selectedCategories.length > 0 || selectedIndustries.length > 0 || selectedTypes.length > 0 || showFeaturedOnly) && (
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
                    {selectedTypes.map((type) => (
                      <Badge key={type} variant="outline" className="border-spring-400 text-spring-400">
                        {type}
                        <button
                          onClick={() => setSelectedTypes(selectedTypes.filter(t => t !== type))}
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
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Demos Grid */}
        <div className="py-16">
          <div className="container mx-auto px-6">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold">
                All Demonstrations 
                <span className="text-spring-400 ml-2">({filteredDemos.length})</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDemos.map((demo, index) => (
                <Card key={index} className="bg-midnight-800/50 border-midnight-700 hover:border-spring-400/50 transition-all duration-300 group">
                  <div className="relative overflow-hidden">
                    <img 
                      src={demo.image} 
                      alt={demo.title}
                      className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300" />
                    {demo.featured && (
                      <div className="absolute top-3 left-3">
                        <Badge className="bg-spring-500 text-midnight-900 font-semibold text-xs">
                          Featured
                        </Badge>
                      </div>
                    )}
                    <div className="absolute top-3 right-3">
                      <Badge variant="outline" className="bg-midnight-900/90 border-midnight-600 text-white text-xs">
                        {demo.duration}
                      </Badge>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-spring-500/80 hover:bg-spring-400 rounded-full p-3 transition-all duration-300 group-hover:scale-110">
                        <Play className="w-6 h-6 text-black" />
                      </div>
                    </div>
                  </div>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {getIndustryIcon(demo.industry)}
                        <span className="text-xs text-spring-400">{demo.industry}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        {getTypeIcon(demo.type)}
                        <span className="text-xs text-gray-400">{demo.type}</span>
                      </div>
                    </div>
                    <CardTitle className="text-sm text-white group-hover:text-spring-400 transition-colors line-clamp-2">
                      {demo.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <CardDescription className="text-gray-300 mb-3 text-sm line-clamp-2">
                      {demo.description}
                    </CardDescription>
                    <div className="flex items-center justify-between mb-3 text-xs text-gray-400">
                      <span className="flex items-center gap-1">
                        <Play className="w-3 h-3" />
                        {demo.viewCount}
                      </span>
                      <Badge variant="outline" className="border-midnight-600 text-gray-400 text-xs">
                        {demo.category}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="w-full border-spring-400 text-spring-400 hover:bg-spring-400 hover:text-black text-xs"
                      >
                        <Play className="w-3 h-3 mr-2" />
                        Watch
                      </Button>
                      {demo.schedulable && (
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="w-full border-gray-600 text-gray-400 hover:bg-gray-600 hover:text-white text-xs"
                        >
                          <Calendar className="w-3 h-3 mr-2" />
                          Schedule
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredDemos.length === 0 && (
              <div className="text-center py-12">
                <Monitor className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-400 mb-2">No demos found</h3>
                <p className="text-gray-500">Try adjusting your filters or search terms</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </MarketingLayout>
  );
}