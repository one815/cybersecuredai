import { useState } from "react";
import { MarketingLayout } from "@/components/MarketingLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Search,
  BookOpen,
  Download,
  Eye,
  Star,
  Filter,
  FileText,
  Clock,
  Users,
  Building,
  GraduationCap,
  School
} from "lucide-react";
import placeholderImg from "@/assets/images/placeholder.svg";

const categories = [
  "AI & Cybersecurity",
  "Compliance & Governance", 
  "Threat Intelligence",
  "Zero Trust Architecture",
  "Educational Security",
  "Government Security"
];

const industries = [
  "Federal Government",
  "Higher Education",
  "K-12 Education",
  "Cross-Industry"
];

const ebooks = [
  {
    title: "Complete Guide to Cybersecurity for Educational Institutions",
    description: "Comprehensive eBook covering all aspects of educational cybersecurity from K-12 to university level. Includes practical implementation guides, compliance frameworks, and real-world case studies.",
    category: "Educational Security",
    industry: "Higher Education",
    pages: "120 pages",
    downloadCount: "5,400",
    readTime: "8 hours",
    featured: true,
    image: placeholderImg
  },
  {
    title: "Federal Cybersecurity Compliance Handbook",
    description: "Essential guide for federal agencies to meet cybersecurity compliance requirements. Covers NIST frameworks, FedRAMP, and emerging AI security mandates.",
    category: "Government Security",
    industry: "Federal Government",
    pages: "95 pages",
    downloadCount: "3,800",
    readTime: "6 hours",
    featured: true,
    image: placeholderImg
  },
  {
    title: "AI Security Implementation Guide",
    description: "Step-by-step guide to implementing AI security measures across organizations. Includes technical specifications, best practices, and monitoring strategies.",
    category: "AI & Cybersecurity",
    industry: "Cross-Industry",
    pages: "156 pages",
    downloadCount: "4,200",
    readTime: "10 hours",
    featured: true,
    image: placeholderImg
  },
  {
    title: "Zero Trust for Universities",
    description: "Comprehensive guide to implementing zero trust architecture in higher education environments. Addresses unique academic challenges and collaboration needs.",
    category: "Zero Trust Architecture",
    industry: "Higher Education",
    pages: "89 pages",
    downloadCount: "2,900",
    readTime: "5 hours",
    featured: false,
    image: placeholderImg
  },
  {
    title: "K-12 Digital Safety & Security",
    description: "Complete resource for protecting K-12 students and educational technology. Covers privacy laws, age-appropriate security measures, and incident response.",
    category: "Educational Security",
    industry: "K-12 Education",
    pages: "67 pages",
    downloadCount: "3,500",
    readTime: "4 hours",
    featured: false,
    image: placeholderImg
  },
  {
    title: "Threat Intelligence for Government",
    description: "Advanced guide to implementing threat intelligence programs in government agencies. Includes inter-agency collaboration and classified information handling.",
    category: "Threat Intelligence",
    industry: "Federal Government",
    pages: "134 pages",
    downloadCount: "2,100",
    readTime: "8 hours",
    featured: false,
    image: placeholderImg
  },
  {
    title: "Compliance Automation Strategies",
    description: "Learn how to automate compliance monitoring and reporting across educational and government institutions. Includes tool recommendations and implementation roadmaps.",
    category: "Compliance & Governance",
    industry: "Cross-Industry",
    pages: "78 pages",
    downloadCount: "1,800",
    readTime: "5 hours",
    featured: false,
    image: placeholderImg
  },
  {
    title: "Campus Cybersecurity Incident Response",
    description: "Detailed playbook for responding to cybersecurity incidents in university environments. Covers communication, containment, and recovery procedures.",
    category: "Educational Security",
    industry: "Higher Education",
    pages: "101 pages",
    downloadCount: "2,600",
    readTime: "6 hours",
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

export default function EBooks() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);

  const filteredEBooks = ebooks.filter(ebook => {
    const matchesSearch = ebook.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ebook.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(ebook.category);
    const matchesIndustry = selectedIndustries.length === 0 || selectedIndustries.includes(ebook.industry);
    const matchesFeatured = !showFeaturedOnly || ebook.featured;
    
    return matchesSearch && matchesCategory && matchesIndustry && matchesFeatured;
  });

  const featuredEBooks = ebooks.filter(ebook => ebook.featured).slice(0, 3);

  return (
    <MarketingLayout>
      <div className="min-h-screen ai-dashboard-bg text-white">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-midnight-900 via-midnight-800 to-midnight-900 py-24">
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
          <div className="container mx-auto px-6 relative">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-spring-400 to-cyber-blue-400 bg-clip-text text-transparent">
                eBooks
              </h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Download comprehensive cybersecurity guides and implementation resources designed specifically 
                for government agencies and educational institutions.
              </p>
              <div className="flex items-center justify-center gap-4 text-sm text-gray-400">
                <span className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  {ebooks.length} Professional Resources
                </span>
                <span className="flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Free PDF Downloads
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Featured eBooks */}
        <div className="py-16 bg-midnight-950/50">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold mb-8 text-center">Featured Downloads</h2>
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {featuredEBooks.map((ebook, index) => (
                <Card key={index} className="bg-midnight-800/50 border-midnight-700 hover:border-spring-400/50 transition-all duration-300 group">
                  <div className="relative overflow-hidden">
                    <img 
                      src={ebook.image} 
                      alt={ebook.title}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-spring-500 text-black font-semibold">
                        <Star className="w-3 h-3 mr-1" />
                        Featured
                      </Badge>
                    </div>
                    <div className="absolute bottom-4 right-4">
                      <Badge variant="outline" className="bg-midnight-900/90 border-midnight-600 text-white">
                        {ebook.pages}
                      </Badge>
                    </div>
                  </div>
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      {getIndustryIcon(ebook.industry)}
                      <span className="text-sm text-spring-400">{ebook.industry}</span>
                    </div>
                    <CardTitle className="text-white group-hover:text-spring-400 transition-colors">
                      {ebook.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-300 mb-4 line-clamp-3">
                      {ebook.description}
                    </CardDescription>
                    <div className="flex items-center justify-between mb-4 text-sm text-gray-400">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {ebook.readTime}
                      </span>
                      <span className="flex items-center gap-1">
                        <Download className="w-3 h-3" />
                        {ebook.downloadCount}
                      </span>
                    </div>
                    <Button 
                      size="sm" 
                      className="w-full bg-spring-500 hover:bg-spring-600 text-black font-semibold"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download PDF
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
                      placeholder="Search eBooks..."
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
                    <div className="space-y-2">
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

        {/* eBooks Grid */}
        <div className="py-16">
          <div className="container mx-auto px-6">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold">
                All eBooks 
                <span className="text-spring-400 ml-2">({filteredEBooks.length})</span>
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredEBooks.map((ebook, index) => (
                <Card key={index} className="bg-midnight-800/50 border-midnight-700 hover:border-spring-400/50 transition-all duration-300 group">
                  <div className="relative overflow-hidden">
                    <img 
                      src={ebook.image} 
                      alt={ebook.title}
                      className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {ebook.featured && (
                      <div className="absolute top-3 left-3">
                        <Badge className="bg-spring-500 text-black font-semibold text-xs">
                          Featured
                        </Badge>
                      </div>
                    )}
                    <div className="absolute bottom-3 right-3">
                      <Badge variant="outline" className="bg-midnight-900/90 border-midnight-600 text-white text-xs">
                        {ebook.pages}
                      </Badge>
                    </div>
                  </div>
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-2 mb-2">
                      {getIndustryIcon(ebook.industry)}
                      <span className="text-xs text-spring-400">{ebook.industry}</span>
                    </div>
                    <CardTitle className="text-sm text-white group-hover:text-spring-400 transition-colors line-clamp-2">
                      {ebook.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <CardDescription className="text-gray-300 mb-3 text-sm line-clamp-2">
                      {ebook.description}
                    </CardDescription>
                    <div className="flex items-center justify-between mb-3 text-xs text-gray-400">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {ebook.readTime}
                      </span>
                      <span className="flex items-center gap-1">
                        <Download className="w-3 h-3" />
                        {ebook.downloadCount}
                      </span>
                    </div>
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="w-full border-spring-400 text-spring-400 hover:bg-spring-400 hover:text-black text-xs"
                    >
                      <Download className="w-3 h-3 mr-2" />
                      Download PDF
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredEBooks.length === 0 && (
              <div className="text-center py-12">
                <BookOpen className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-400 mb-2">No eBooks found</h3>
                <p className="text-gray-500">Try adjusting your filters or search terms</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </MarketingLayout>
  );
}