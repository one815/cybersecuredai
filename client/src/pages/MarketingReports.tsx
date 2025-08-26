import { useState } from "react";
import { MarketingLayout } from "@/components/MarketingLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Search,
  FileText,
  Download,
  Star,
  Filter,
  Calendar,
  TrendingUp,
  Users,
  Building,
  GraduationCap,
  School
} from "lucide-react";
import placeholderImg from "@/assets/images/placeholder.svg";

const categories = [
  "Threat Reports",
  "Industry Analysis", 
  "Security Assessments",
  "Compliance Reports",
  "Market Research",
  "Annual Security Reports"
];

const industries = [
  "Federal Government",
  "Higher Education", 
  "K-12 Education",
  "Cross-Industry"
];

const reports = [
  {
    title: "2025 AI Security Threat Report",
    description: "Adversaries weaponize and target AI at scale - comprehensive analysis of emerging threats. Get your copy of the must-read cybersecurity report of the year - comprehensive threat landscape.",
    category: "Threat Reports",
    industry: "Cross-Industry", 
    pages: "68 pages",
    downloadCount: "15,400",
    publishDate: "January 2025",
    featured: true,
    image: placeholderImg
  },
  {
    title: "CyberSecure AI named Leader in Cybersecurity",
    description: "Leading the way in AI-powered cybersecurity solutions for educational institutions and government.",
    category: "Industry Analysis",
    industry: "Cross-Industry",
    pages: "24 pages", 
    downloadCount: "8,900",
    publishDate: "December 2024",
    featured: true,
    image: placeholderImg
  },
  {
    title: "CyberSecure AI 2025 Global Security Report",
    description: "Get your copy of the must-read cybersecurity report of the year - comprehensive threat landscape, attack trends, and security recommendations.",
    category: "Annual Security Reports",
    industry: "Cross-Industry",
    pages: "156 pages",
    downloadCount: "22,100", 
    publishDate: "January 2025",
    featured: true,
    image: placeholderImg
  },
  {
    title: "Federal Government Security Assessment 2024",
    description: "Comprehensive analysis of cybersecurity posture across federal agencies with recommendations for improvement.",
    category: "Security Assessments",
    industry: "Federal Government",
    pages: "89 pages",
    downloadCount: "5,200",
    publishDate: "November 2024",
    featured: false,
    image: placeholderImg
  },
  {
    title: "Higher Education Cybersecurity Market Analysis",
    description: "Market trends, challenges, and opportunities in the higher education cybersecurity sector.",
    category: "Market Research", 
    industry: "Higher Education",
    pages: "45 pages",
    downloadCount: "3,800",
    publishDate: "October 2024",
    featured: false,
    image: placeholderImg
  },
  {
    title: "K-12 Privacy Compliance Report",
    description: "Analysis of student privacy regulations and compliance requirements across K-12 educational institutions.",
    category: "Compliance Reports",
    industry: "K-12 Education", 
    pages: "72 pages",
    downloadCount: "6,700",
    publishDate: "September 2024",
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
      return <FileText className="w-4 h-4" />;
  }
};

export default function MarketingReports() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(report.category);
    const matchesIndustry = selectedIndustries.length === 0 || selectedIndustries.includes(report.industry);
    const matchesFeatured = !showFeaturedOnly || report.featured;
    
    return matchesSearch && matchesCategory && matchesIndustry && matchesFeatured;
  });

  const featuredReports = reports.filter(report => report.featured);

  return (
    <MarketingLayout>
      <div className="min-h-screen ai-dashboard-bg text-white">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-midnight-900 via-midnight-800 to-midnight-900 py-24">
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
          <div className="container mx-auto px-6 relative">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-spring-400 to-cyber-blue-400 bg-clip-text text-transparent">
                Reports
              </h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                In-depth research reports, threat analyses, and industry insights to keep you informed 
                about the evolving cybersecurity landscape.
              </p>
              <div className="flex items-center justify-center gap-4 text-sm text-gray-400">
                <span className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  {reports.length} Research Reports
                </span>
                <span className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Latest Threat Intelligence
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Reports */}
        <div className="py-16 bg-midnight-950/50">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold mb-8 text-center">Featured Reports</h2>
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {featuredReports.map((report, index) => (
                <Card key={index} className="bg-midnight-800/50 border-midnight-700 hover:border-spring-400/50 transition-all duration-300 group">
                  <div className="relative overflow-hidden">
                    <img 
                      src={report.image} 
                      alt={report.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-spring-500 text-midnight-900 font-semibold">
                        <Star className="w-3 h-3 mr-1" />
                        Featured
                      </Badge>
                    </div>
                    <div className="absolute top-4 right-4">
                      <Badge variant="outline" className="bg-midnight-900/90 border-midnight-600 text-white">
                        {report.pages}
                      </Badge>
                    </div>
                  </div>
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {getIndustryIcon(report.industry)}
                        <span className="text-sm text-spring-400">{report.industry}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-400">
                        <Calendar className="w-3 h-3" />
                        <span>{report.publishDate}</span>
                      </div>
                    </div>
                    <CardTitle className="text-white group-hover:text-spring-400 transition-colors">
                      {report.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-300 mb-4 line-clamp-3">
                      {report.description}
                    </CardDescription>
                    <div className="flex items-center justify-between mb-4 text-sm text-gray-400">
                      <span className="flex items-center gap-1">
                        <Download className="w-3 h-3" />
                        {report.downloadCount}
                      </span>
                      <Badge variant="outline" className="border-midnight-600 text-gray-400 text-xs">
                        {report.category}
                      </Badge>
                    </div>
                    <Button 
                      size="sm" 
                      className="w-full bg-spring-500 hover:bg-spring-600 text-midnight-900 font-semibold"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download Report
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
                      placeholder="Search reports..."
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

        {/* Reports Grid */}
        <div className="py-16">
          <div className="container mx-auto px-6">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold">
                All Reports 
                <span className="text-spring-400 ml-2">({filteredReports.length})</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredReports.map((report, index) => (
                <Card key={index} className="bg-midnight-800/50 border-midnight-700 hover:border-spring-400/50 transition-all duration-300 group">
                  <div className="relative overflow-hidden">
                    <img 
                      src={report.image} 
                      alt={report.title}
                      className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {report.featured && (
                      <div className="absolute top-3 left-3">
                        <Badge className="bg-spring-500 text-midnight-900 font-semibold text-xs">
                          Featured
                        </Badge>
                      </div>
                    )}
                    <div className="absolute top-3 right-3">
                      <Badge variant="outline" className="bg-midnight-900/90 border-midnight-600 text-white text-xs">
                        {report.pages}
                      </Badge>
                    </div>
                  </div>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {getIndustryIcon(report.industry)}
                        <span className="text-xs text-spring-400">{report.industry}</span>
                      </div>
                      <span className="text-xs text-gray-400">{report.publishDate}</span>
                    </div>
                    <CardTitle className="text-sm text-white group-hover:text-spring-400 transition-colors line-clamp-2">
                      {report.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <CardDescription className="text-gray-300 mb-3 text-sm line-clamp-2">
                      {report.description}
                    </CardDescription>
                    <div className="flex items-center justify-between mb-3 text-xs text-gray-400">
                      <span className="flex items-center gap-1">
                        <Download className="w-3 h-3" />
                        {report.downloadCount}
                      </span>
                      <Badge variant="outline" className="border-midnight-600 text-gray-400 text-xs">
                        {report.category}
                      </Badge>
                    </div>
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="w-full border-spring-400 text-spring-400 hover:bg-spring-400 hover:text-black text-xs"
                    >
                      <Download className="w-3 h-3 mr-2" />
                      Download
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredReports.length === 0 && (
              <div className="text-center py-12">
                <FileText className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-400 mb-2">No reports found</h3>
                <p className="text-gray-500">Try adjusting your filters or search terms</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </MarketingLayout>
  );
}