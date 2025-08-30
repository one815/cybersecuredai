import { useState } from "react";
import { MarketingLayout } from "@/components/MarketingLayout";
import { EmailCaptureModal } from "@/components/EmailCaptureModal";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Search,
  Building,
  School,
  GraduationCap,
  Users,
  ExternalLink,
  Download,
  Eye,
  Star,
  Filter,
  ChevronDown,
  FileText,
  TrendingUp
} from "lucide-react";
import zeroTrustFederalImg from "@assets/generated_images/Zero_Trust_Federal_UseCase_917a389e.png";
import executiveOrderImg from "@assets/generated_images/Executive_Order_Compliance_fa53dcb9.png";
import criticalInfraImg from "@assets/generated_images/Critical_Infrastructure_Protection_939a6a9a.png";
import multiStateImg from "@assets/generated_images/Multi_State_Coalition_e7af0642.png";
import stateStandardsImg from "@assets/generated_images/State_AI_Standards_eedb2317.png";
import cityVulnImg from "@assets/generated_images/City_Vulnerability_Assessment_dd3a88e4.png";
import smartCityImg from "@assets/generated_images/Smart_City_Security_d206ef72.png";
import researchCollabImg from "@assets/generated_images/Research_Collaboration_Security_f063fdbf.png";
import campusAccessImg from "@assets/generated_images/Campus_Access_Control_71cb5b76.png";
import academicFrameworkImg from "@assets/generated_images/Academic_Security_Framework_75c0b524.png";
import schoolAssessmentImg from "@assets/generated_images/School_Security_Assessment_dfded22a.png";
import techTrainingImg from "@assets/generated_images/Tech_Administrator_Training_98012fa2.png";
import sharedSecOpsImg from "@assets/generated_images/Shared_Security_Operations_ad805f3d.png";
import shadowAIImg from "@assets/generated_images/Shadow_AI_Detection_efe2f3db.png";
import simplifiedFrameworkImg from "@assets/generated_images/Simplified_Security_Framework_40fa4e44.png";

const industries = [
  "Federal Government",
  "State Government", 
  "Municipal Government",
  "Higher Education",
  "K-12 Education",
  "Cross-Industry"
];

const useCases = [
  {
    title: "Zero Trust Architecture Implementation",
    description: "Federal agencies deploy CyberSecured AI to establish and maintain zero trust frameworks, resulting in a 47% reduction in security incidents while ensuring AI systems remain secure and compliant with federal mandates.",
    industry: "Federal Government",
    results: "47% reduction in security incidents",
    downloadCount: "1,900",
    featured: true,
    image: zeroTrustFederalImg
  },
  {
    title: "Executive Order Compliance",
    description: "Government departments leverage CyberSecured AI to rapidly adapt to new White House executive orders on secure AI development, ensuring all federal systems meet the latest security requirements.",
    industry: "Federal Government",
    results: "Rapid compliance adaptation",
    downloadCount: "1,400",
    featured: false,
    image: executiveOrderImg
  },
  {
    title: "Critical Infrastructure Protection",
    description: "Federal agencies use CyberSecured AI to detect and mitigate nation-state attacks targeting AI systems in critical infrastructure, enabling real-time threat assessment and response.",
    industry: "Federal Government",
    results: "Real-time threat mitigation",
    downloadCount: "2,100",
    featured: true,
    image: criticalInfraImg
  },
  {
    title: "Multi-State Security Coalition",
    description: "State governments implement CyberSecured AI's collaborative platform to share resources and threat intelligence across state lines, creating a unified defense against evolving AI threats.",
    industry: "State Government",
    results: "Unified multi-state defense",
    downloadCount: "980",
    featured: false,
    image: multiStateImg
  },
  {
    title: "State-wide AI Security Standards",
    description: "State IT departments utilize CyberSecured AI to develop and enforce consistent security standards across all state agencies, reducing fragmentation and security gaps.",
    industry: "State Government",
    results: "Consistent statewide standards",
    downloadCount: "1,150",
    featured: false,
    image: stateStandardsImg
  },
  {
    title: "City System Vulnerability Assessment",
    description: "Municipal governments deploy CyberSecured AI's gap analysis tools to identify and remediate the 78% of city systems vulnerable to emerging AI threats.",
    industry: "Municipal Government",
    results: "78% vulnerability reduction",
    downloadCount: "1,250",
    featured: false,
    image: cityVulnImg
  },
  {
    title: "Smart City Security",
    description: "Local governments secure IoT and AI-powered smart city initiatives using CyberSecured AI's specialized urban infrastructure protection suite.",
    industry: "Municipal Government",
    results: "Complete IoT protection",
    downloadCount: "1,600",
    featured: true,
    image: smartCityImg
  },
  {
    title: "Research Collaboration Security",
    description: "Universities implement CyberSecured AI to establish shared security standards for multi-institution research projects, protecting valuable intellectual property and sensitive data.",
    industry: "Higher Education",
    results: "Protected intellectual property",
    downloadCount: "1,800",
    featured: true,
    image: researchCollabImg
  },
  {
    title: "Campus Access Control",
    description: "Higher education institutions deploy CyberSecured AI's detection systems, achieving a 92% improvement in identifying unauthorized access attempts to campus AI systems.",
    industry: "Higher Education",
    results: "92% improvement in access detection",
    downloadCount: "1,450",
    featured: false,
    image: campusAccessImg
  },
  {
    title: "Academic Security Framework",
    description: "Colleges adopt CyberSecured AI's comprehensive protection framework specifically designed for academic environments with complex access needs and collaborative workflows.",
    industry: "Higher Education",
    results: "Comprehensive academic protection",
    downloadCount: "2,200",
    featured: true,
    image: academicFrameworkImg
  },
  {
    title: "School Security Assessment",
    description: "K-12 districts utilize CyberSecured AI's assessment toolkit to evaluate and strengthen AI protection measures, ensuring student data remains secure.",
    industry: "K-12 Education",
    results: "Strengthened student data protection",
    downloadCount: "2,800",
    featured: true,
    image: schoolAssessmentImg
  },
  {
    title: "Technology Administrator Training",
    description: "School IT staff receive mandated CyberSecured AI security training to meet state compliance requirements while developing practical skills for educational environments.",
    industry: "K-12 Education",
    results: "State compliance achieved",
    downloadCount: "1,900",
    featured: false,
    image: techTrainingImg
  },
  {
    title: "Shared Security Operations",
    description: "Rural and small school districts implement CyberSecured AI's resource-pooling solution to create shared security operations centers, making enterprise-grade protection affordable.",
    industry: "K-12 Education",
    results: "Affordable enterprise protection",
    downloadCount: "1,650",
    featured: false,
    image: sharedSecOpsImg
  },
  {
    title: "Shadow AI Detection",
    description: "Organizations across sectors use CyberSecured AI to identify and secure unauthorized AI deployments, addressing the emerging 'Shadow AI' problem before it creates security vulnerabilities.",
    industry: "Cross-Industry",
    results: "Eliminated Shadow AI risks",
    downloadCount: "3,200",
    featured: true,
    image: shadowAIImg
  },
  {
    title: "Simplified Security Framework",
    description: "Companies implement CyberSecured AI's streamlined security approach to overcome the #1 barrier to AI adoption while maintaining robust protection.",
    industry: "Cross-Industry",
    results: "Streamlined AI adoption",
    downloadCount: "2,900",
    featured: true,
    image: simplifiedFrameworkImg
  }
];

const getIndustryIcon = (industry: string) => {
  switch (industry) {
    case "Federal Government":
    case "State Government":
    case "Municipal Government":
      return <Building className="w-5 h-5" />;
    case "Higher Education":
      return <GraduationCap className="w-5 h-5" />;
    case "K-12 Education":
      return <School className="w-5 h-5" />;
    case "Cross-Industry":
      return <Users className="w-5 h-5" />;
    default:
      return <FileText className="w-5 h-5" />;
  }
};

export default function UseCases() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [selectedResource, setSelectedResource] = useState<any>(null);

  const handleViewCaseStudy = (useCase: any) => {
    setSelectedResource(useCase);
    setEmailModalOpen(true);
  };

  const filteredUseCases = useCases.filter(useCase => {
    const matchesSearch = useCase.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         useCase.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesIndustry = selectedIndustries.length === 0 || selectedIndustries.includes(useCase.industry);
    const matchesFeatured = !showFeaturedOnly || useCase.featured;
    
    return matchesSearch && matchesIndustry && matchesFeatured;
  });

  const featuredUseCases = useCases.filter(useCase => useCase.featured).slice(0, 3);

  return (
    <MarketingLayout>
      <div className="min-h-screen ai-dashboard-bg text-white">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-midnight-900 via-midnight-800 to-midnight-900 py-24">
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
          <div className="container mx-auto px-6 relative">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-spring-400 to-cyber-blue-400 bg-clip-text text-transparent">
                Use Cases
              </h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Discover how organizations across government and education sectors are successfully implementing 
                CyberSecured AI to protect their critical systems and achieve measurable security outcomes.
              </p>
              <div className="flex items-center justify-center gap-4 text-sm text-gray-400">
                <span className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  {useCases.length} Real Implementation Stories
                </span>
                <span className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Proven Results & Metrics
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Use Cases */}
        <div className="py-16 bg-midnight-950/50">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold mb-8 text-center">Featured Success Stories</h2>
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {featuredUseCases.map((useCase, index) => (
                <Card key={index} className="bg-midnight-800/50 border-midnight-700 hover:border-spring-400/50 transition-all duration-300 group">
                  <div className="relative overflow-hidden">
                    <img 
                      src={useCase.image} 
                      alt={useCase.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-spring-500 text-midnight-900 font-semibold">
                        Featured
                      </Badge>
                    </div>
                  </div>
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      {getIndustryIcon(useCase.industry)}
                      <span className="text-sm text-spring-400">{useCase.industry}</span>
                    </div>
                    <CardTitle className="text-white group-hover:text-spring-400 transition-colors">
                      {useCase.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-300 mb-4 line-clamp-3">
                      {useCase.description}
                    </CardDescription>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm text-spring-400 font-semibold">
                        {useCase.results}
                      </span>
                      <span className="text-xs text-gray-500">
                        {useCase.downloadCount} views
                      </span>
                    </div>
                    <Button 
                      size="sm" 
                      className="w-full bg-spring-500 hover:bg-spring-600 text-midnight-900 font-semibold"
                      onClick={() => handleViewCaseStudy(useCase)}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View Case Study
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
                      placeholder="Search use cases..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 bg-midnight-700 border-midnight-600 text-white placeholder-gray-400"
                    />
                  </div>
                </div>

                {/* Industry Filter */}
                <div className="lg:w-80">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Filter className="w-4 h-4 text-spring-400" />
                      <span className="text-sm font-medium text-spring-400">Filter by Industry</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
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
                <div className="lg:w-48">
                  <div className="space-y-3">
                    <span className="text-sm font-medium text-spring-400">Show Options</span>
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
              {(selectedIndustries.length > 0 || showFeaturedOnly) && (
                <div className="mt-4 pt-4 border-t border-midnight-600">
                  <div className="flex flex-wrap gap-2">
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

        {/* Use Cases Grid */}
        <div className="py-16">
          <div className="container mx-auto px-6">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold">
                All Use Cases 
                <span className="text-spring-400 ml-2">({filteredUseCases.length})</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredUseCases.map((useCase, index) => (
                <Card key={index} className="bg-midnight-800/50 border-midnight-700 hover:border-spring-400/50 transition-all duration-300 group">
                  <div className="relative overflow-hidden">
                    <img 
                      src={useCase.image} 
                      alt={useCase.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {useCase.featured && (
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-spring-500 text-black font-semibold">
                          <Star className="w-3 h-3 mr-1" />
                          Featured
                        </Badge>
                      </div>
                    )}
                    <div className="absolute top-4 right-4">
                      <Badge variant="outline" className="bg-midnight-900/80 border-midnight-600 text-white">
                        <Download className="w-3 h-3 mr-1" />
                        {useCase.downloadCount}
                      </Badge>
                    </div>
                  </div>
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      {getIndustryIcon(useCase.industry)}
                      <span className="text-sm text-spring-400">{useCase.industry}</span>
                    </div>
                    <CardTitle className="text-white group-hover:text-spring-400 transition-colors">
                      {useCase.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-300 mb-4 line-clamp-3">
                      {useCase.description}
                    </CardDescription>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm text-spring-400 font-semibold">
                        {useCase.results}
                      </span>
                    </div>
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="w-full border-spring-400 text-spring-400 hover:bg-spring-400 hover:text-black"
                      onClick={() => handleViewCaseStudy(useCase)}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View Case Study
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredUseCases.length === 0 && (
              <div className="text-center py-12">
                <FileText className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-400 mb-2">No use cases found</h3>
                <p className="text-gray-500">Try adjusting your filters or search terms</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Email Capture Modal */}
      {selectedResource && (
        <EmailCaptureModal
          isOpen={emailModalOpen}
          onClose={() => {
            setEmailModalOpen(false);
            setSelectedResource(null);
          }}
          resourceTitle={`${selectedResource.title} - Case Study`}
          resourceId={selectedResource.title.toLowerCase().replace(/[^a-z0-9\s]/gi, '').replace(/\s+/g, '-')}
          downloadUrl={`/marketing/documents/case-studies/${selectedResource.title.toLowerCase().replace(/[^a-z0-9\s]/gi, '').replace(/\s+/g, '-')}.pdf`}
        />
      )}
    </MarketingLayout>
  );
}