import { useState } from "react";
import { MarketingLayout } from "@/components/MarketingLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Search,
  Package,
  Download,
  Star,
  Filter,
  CheckCircle,
  Building,
  GraduationCap,
  School,
  Users,
  FileText,
  Video,
  BookOpen
} from "lucide-react";
import successKitImg from "@assets/generated_images/CyberSecure_AI_SuccessKit_8dc59fb5.png";

const categories = [
  "Implementation",
  "Compliance",
  "Training",
  "Incident Response",
  "Risk Assessment",
  "Security Awareness"
];

const industries = [
  "Federal Government",
  "Higher Education", 
  "K-12 Education",
  "Cross-Industry"
];

const successKits = [
  {
    title: "Federal AI Security Implementation Kit",
    description: "Complete implementation package including deployment guides, compliance checklists, training materials, and best practices for federal agencies.",
    category: "Implementation",
    industry: "Federal Government",
    components: ["Deployment Guide", "Compliance Checklist", "Training Videos", "Templates"],
    downloadCount: "2,400",
    featured: true,
    image: successKitImg
  },
  {
    title: "University AI Security Success Kit",
    description: "Comprehensive package for higher education institutions including FERPA compliance, research protection, and campus-wide security implementation.",
    category: "Implementation",
    industry: "Higher Education",
    components: ["FERPA Compliance Guide", "Research Protection Plan", "Campus Security Framework", "Training Materials"],
    downloadCount: "1,800",
    featured: true,
    image: successKitImg
  },
  {
    title: "K-12 Student Data Protection Kit",
    description: "Student privacy protection package with age-appropriate security measures, COPPA compliance, and educational technology safety protocols.",
    category: "Compliance",
    industry: "K-12 Education",
    components: ["COPPA Compliance Guide", "Privacy Framework", "Safety Protocols", "Parent Communication Kit"],
    downloadCount: "3,200",
    featured: true,
    image: successKitImg
  },
  {
    title: "AI Threat Response Playbook Kit",
    description: "Incident response package with playbooks, communication templates, recovery procedures, and post-incident analysis frameworks.",
    category: "Incident Response",
    industry: "Cross-Industry",
    components: ["Response Playbooks", "Communication Templates", "Recovery Procedures", "Analysis Framework"],
    downloadCount: "4,100",
    featured: false,
    image: successKitImg
  },
  {
    title: "AI Security Risk Assessment Kit",
    description: "Comprehensive risk assessment package with evaluation frameworks, scoring matrices, mitigation strategies, and reporting templates.",
    category: "Risk Assessment",
    industry: "Cross-Industry",
    components: ["Assessment Framework", "Scoring Matrix", "Mitigation Strategies", "Report Templates"],
    downloadCount: "2,900",
    featured: false,
    image: successKitImg
  },
  {
    title: "AI Security Awareness Training Kit",
    description: "Complete training package with presentations, videos, quizzes, and certification materials for organization-wide security education.",
    category: "Training",
    industry: "Cross-Industry",
    components: ["Training Presentations", "Educational Videos", "Interactive Quizzes", "Certification Materials"],
    downloadCount: "5,600",
    featured: false,
    image: successKitImg
  }
];

export default function SuccessKits() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);

  const filteredKits = successKits.filter(kit => {
    const matchesSearch = kit.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         kit.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(kit.category);
    const matchesIndustry = selectedIndustries.length === 0 || selectedIndustries.includes(kit.industry);
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

  const KitCard = ({ kit }: { kit: any }) => (
    <Card className="bg-gray-800 border-gray-700 hover:border-cyan-500/50 transition-all duration-200 group">
      <div className="flex">
        <div className="w-1/3">
          <img 
            src={kit.image} 
            alt={kit.title}
            className="w-full h-full object-cover rounded-l-lg"
          />
        </div>
        <div className="w-2/3">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className="text-white group-hover:text-cyan-400 transition-colors text-lg">
                  {kit.title}
                </CardTitle>
                <CardDescription className="text-gray-300 mt-2">
                  {kit.description}
                </CardDescription>
              </div>
              {kit.featured && (
                <Star className="w-5 h-5 text-yellow-400 ml-4" />
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-400 mb-2">Includes:</h4>
              <div className="grid grid-cols-2 gap-2">
                {kit.components.map((component: string, index: number) => (
                  <div key={index} className="flex items-center text-sm text-gray-300">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
                    {component}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <Badge 
                  variant="outline" 
                  className={`
                    ${kit.industry === 'Federal Government' ? 'text-blue-400 border-blue-400' : ''}
                    ${kit.industry === 'Higher Education' ? 'text-green-400 border-green-400' : ''}
                    ${kit.industry === 'K-12 Education' ? 'text-yellow-400 border-yellow-400' : ''}
                    ${kit.industry === 'Cross-Industry' ? 'text-purple-400 border-purple-400' : ''}
                  `}
                >
                  {kit.category}
                </Badge>
                <div className="text-sm text-gray-400 flex items-center">
                  <Download className="w-4 h-4 mr-1" />
                  {kit.downloadCount} downloads
                </div>
              </div>
              <Button size="sm" className="bg-cyan-600 hover:bg-cyan-700 text-white">
                <Package className="w-4 h-4 mr-1" />
                Download Kit
              </Button>
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
              Success Kits
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl">
              Complete implementation packages with guides, templates, and resources for successful AI security deployments.
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
                      placeholder="Search success kits..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                    />
                  </div>

                  {/* Categories */}
                  <div>
                    <h3 className="text-white font-medium mb-3">Category</h3>
                    <div className="space-y-2">
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

            {/* Success Kits List */}
            <div className="lg:w-3/4">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-gray-400">
                  Showing {filteredKits.length} of {successKits.length} success kits
                </p>
                <Badge variant="outline" className="text-cyan-400 border-cyan-400">
                  {filteredKits.length} results
                </Badge>
              </div>

              <div className="space-y-6">
                {filteredKits.map((kit, index) => (
                  <KitCard key={index} kit={kit} />
                ))}
              </div>

              {filteredKits.length === 0 && (
                <div className="text-center py-16">
                  <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <div className="text-gray-400 text-lg mb-2">No success kits found</div>
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