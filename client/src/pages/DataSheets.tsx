import { useState } from "react";
import { useLocation } from "wouter";
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
  Eye,
  Star,
  Filter,
  Shield,
  Zap,
  Users,
  Building,
  GraduationCap,
  School,
  Clock,
  Brain,
  BookOpen,
  UserCheck,
  Activity,
  Layers,
  ShieldCheck,
  Lock,
  Globe,
  Network,
  Monitor,
  Database
} from "lucide-react";
import {
  Enhanced4DBrainIcon,
  Enhanced4DNetworkIcon,
  CustomShieldIcon,
  CustomTargetIcon,
  Enhanced4DShieldIcon,
  Enhanced4DEyeIcon,
  Enhanced4DZapIcon,
  Enhanced4DActivityIcon
} from "@/components/CustomIcons";
import platformOverviewImg from "@assets/generated_images/Platform_Overview_Datasheet_3d239cec.png";
import aiThreatDetectionImg from "@assets/generated_images/AI_Threat_Detection_Engine_58460592.png";
import federalComplianceImg from "@assets/generated_images/Federal_Compliance_Certification_2faa9e41.png";
import universityNetworkImg from "@assets/generated_images/University_Network_Integration_b94f16b2.png";
import k12PrivacyImg from "@assets/generated_images/K12_Student_Privacy_Protection_829fd6b1.png";
import securityAnalyticsImg from "@assets/generated_images/Security_Analytics_Dashboard_ca1f5822.png";
import zeroTrustImg from "@assets/generated_images/Zero_Trust_Architecture_8c331bd5.png";
import campusDeploymentImg from "@assets/generated_images/Campus_Deployment_Guide_660cca2b.png";
import apiDevelopmentImg from "@assets/generated_images/API_Development_Guide_301134f9.png";
import incidentResponseImg from "@assets/generated_images/Automated_Incident_Response_9b65f496.png";

const categories = [
  "Platform Overview",
  "Technical Specifications", 
  "Compliance Features",
  "AI Security Tools",
  "Integration Capabilities",
  "Monitoring & Analytics"
];

const industries = [
  "Federal Government",
  "Higher Education",
  "K-12 Education",
  "Cross-Industry"
];

const datasheets = [
  {
    title: "CyberSecure AI Platform Overview",
    description: "Complete technical specifications and feature overview of the CyberSecure AI cybersecurity platform. Includes architecture diagrams, deployment options, and system requirements.",
    category: "Platform Overview",
    industry: "Cross-Industry",
    pages: "6 pages",
    downloadCount: "8,400",
    featured: true,
    version: "2025.1",
    image: platformOverviewImg
  },
  {
    title: "AI-Powered Threat Detection Engine",
    description: "Technical specifications for our machine learning-based threat detection system. Covers detection accuracy, false positive rates, and supported threat vectors.",
    category: "AI Security Tools",
    industry: "Cross-Industry",
    pages: "4 pages",
    downloadCount: "5,200",
    featured: true,
    version: "4.2",
    image: aiThreatDetectionImg
  },
  {
    title: "Federal Compliance & Certification",
    description: "Comprehensive overview of FedRAMP, FISMA, and other federal compliance certifications. Includes security controls mapping and audit documentation.",
    category: "Compliance Features",
    industry: "Federal Government",
    pages: "8 pages",
    downloadCount: "3,800",
    featured: true,
    version: "2025.1",
    image: federalComplianceImg
  },
  {
    title: "University Network Integration",
    description: "Technical guide for integrating CyberSecure AI with existing university IT infrastructure. Covers LDAP, SSO, and academic system compatibility.",
    category: "Integration Capabilities",
    industry: "Higher Education",
    pages: "5 pages",
    downloadCount: "2,900",
    featured: false,
    version: "3.8",
    image: universityNetworkImg
  },
  {
    title: "K-12 Student Privacy Protection",
    description: "Detailed specifications for FERPA compliance and student data protection features. Includes age-appropriate access controls and audit capabilities.",
    category: "Compliance Features",
    industry: "K-12 Education",
    pages: "6 pages",
    downloadCount: "4,100",
    featured: false,
    version: "2025.1",
    image: k12PrivacyImg
  },
  {
    title: "Real-Time Security Analytics",
    description: "Technical overview of our advanced analytics dashboard and reporting capabilities. Includes custom visualization options and automated alerting.",
    category: "Monitoring & Analytics",
    industry: "Cross-Industry",
    pages: "7 pages",
    downloadCount: "3,600",
    featured: false,
    version: "5.1",
    image: securityAnalyticsImg
  },
  {
    title: "Zero Trust Architecture Implementation",
    description: "Technical specifications for implementing zero trust security models using CyberSecure AI. Covers micro-segmentation and identity verification.",
    category: "Technical Specifications",
    industry: "Federal Government",
    pages: "9 pages",
    downloadCount: "2,700",
    featured: false,
    version: "2.4",
    image: zeroTrustImg
  },
  {
    title: "Campus-Wide Deployment Guide",
    description: "Technical requirements and deployment architecture for university-wide CyberSecure AI implementation. Includes scalability and performance metrics.",
    category: "Technical Specifications",
    industry: "Higher Education",
    pages: "10 pages",
    downloadCount: "2,200",
    featured: false,
    version: "3.5",
    image: campusDeploymentImg
  },
  {
    title: "API Integration & Development",
    description: "Complete API documentation and integration examples for developers. Includes REST endpoints, webhooks, and SDK information.",
    category: "Integration Capabilities",
    industry: "Cross-Industry",
    pages: "12 pages",
    downloadCount: "1,800",
    featured: false,
    version: "6.0",
    image: apiDevelopmentImg
  },
  {
    title: "Automated Incident Response",
    description: "Technical overview of our AI-driven incident response automation. Covers playbook customization, escalation rules, and integration workflows.",
    category: "AI Security Tools",
    industry: "Cross-Industry",
    pages: "5 pages",
    downloadCount: "3,400",
    featured: false,
    version: "4.7",
    image: incidentResponseImg
  },
  {
    title: "Federal Zero-Trust Architecture Implementation",
    description: "Technical specifications and deployment guide for FedRAMP High-compliant zero-trust security models with 99.7% threat detection accuracy and continuous verification.",
    category: "Technical Specifications",
    industry: "Federal Government",
    pages: "12 pages",
    downloadCount: "4,200",
    featured: true,
    version: "2025.1",
    image: federalComplianceImg,
    link: "/resources/datasheets/federal-zero-trust"
  },
  {
    title: "Critical Infrastructure AI Security Framework",
    description: "Standards and best practices for federal agencies protecting critical infrastructure with sector-specific security models for energy, water, transportation, and communications.",
    category: "Compliance Features",
    industry: "Federal Government",
    pages: "16 pages",
    downloadCount: "3,800",
    featured: true,
    version: "2025.1",
    image: zeroTrustImg,
    link: "/resources/datasheets/critical-infrastructure"
  },
  {
    title: "Federal Rapid Response Security Toolkit",
    description: "Technical components and implementation guidelines for sub-4-minute incident detection and containment with 200+ pre-configured attack scenario playbooks.",
    category: "AI Security Tools",
    industry: "Federal Government",
    pages: "10 pages",
    downloadCount: "3,100",
    featured: true,
    version: "2025.1",
    image: incidentResponseImg,
    link: "/resources/datasheets/rapid-response"
  },
  {
    title: "University Research Data Protection System",
    description: "Technical architecture and security features for higher education research environments with AI-powered classification and 15.6PB data support capability.",
    category: "Technical Specifications",
    industry: "Higher Education",
    pages: "14 pages",
    downloadCount: "2,900",
    featured: true,
    version: "2025.1",
    image: universityNetworkImg,
    link: "/resources/datasheets/university-research"
  }
];

const getIndustryIcon = (industry: string) => {
  switch (industry) {
    case "Federal Government":
      return (
        <div className="relative">
          <Building className="w-4 h-4" />
          <Enhanced4DShieldIcon className="w-2 h-2 absolute -top-1 -right-1 text-blue-400" size={8} />
        </div>
      );
    case "Higher Education":
      return (
        <div className="relative">
          <GraduationCap className="w-4 h-4" />
          <BookOpen className="w-2 h-2 absolute -bottom-1 -right-1 text-green-400" />
        </div>
      );
    case "K-12 Education":
      return (
        <div className="relative">
          <School className="w-4 h-4" />
          <UserCheck className="w-2 h-2 absolute -top-1 -right-1 text-purple-400" />
        </div>
      );
    case "Cross-Industry":
      return (
        <div className="relative">
          <Users className="w-4 h-4" />
          <Globe className="w-2 h-2 absolute -bottom-1 -right-1 text-cyan-400" />
        </div>
      );
    default:
      return <FileText className="w-4 h-4" />;
  }
};

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "AI Security Tools":
      return (
        <div className="relative">
          <Enhanced4DBrainIcon className="w-4 h-4" size={16} />
          <ShieldCheck className="w-2 h-2 absolute -top-1 -right-1 text-spring-400" />
        </div>
      );
    case "Compliance Features":
      return (
        <div className="relative">
          <Enhanced4DShieldIcon className="w-4 h-4" size={16} />
          <Enhanced4DEyeIcon className="w-2 h-2 absolute -bottom-1 -right-1 text-orange-400" size={8} />
        </div>
      );
    case "Technical Specifications":
      return (
        <div className="relative">
          <Monitor className="w-4 h-4" />
          <Activity className="w-2 h-2 absolute -top-1 -right-1 text-blue-400" />
        </div>
      );
    case "Platform Overview":
      return (
        <div className="relative">
          <Layers className="w-4 h-4" />
          <Enhanced4DZapIcon className="w-2 h-2 absolute -bottom-1 -right-1 text-yellow-400" size={8} />
        </div>
      );
    case "Integration Capabilities":
      return (
        <div className="relative">
          <Enhanced4DNetworkIcon className="w-4 h-4" size={16} />
          <Globe className="w-2 h-2 absolute -top-1 -right-1 text-cyan-400" />
        </div>
      );
    case "Monitoring & Analytics":
      return (
        <div className="relative">
          <Enhanced4DEyeIcon className="w-4 h-4" size={16} />
          <Enhanced4DActivityIcon className="w-2 h-2 absolute -bottom-1 -right-1 text-green-400" size={8} />
        </div>
      );
    default:
      return <FileText className="w-4 h-4" />;
  }
};

export default function DataSheets() {
  const [, setLocation] = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);

  const handleDataSheetClick = (datasheet: any) => {
    if (datasheet.link) {
      setLocation(datasheet.link);
    }
  };

  const filteredDataSheets = datasheets.filter(datasheet => {
    const matchesSearch = datasheet.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         datasheet.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(datasheet.category);
    const matchesIndustry = selectedIndustries.length === 0 || selectedIndustries.includes(datasheet.industry);
    const matchesFeatured = !showFeaturedOnly || datasheet.featured;
    
    return matchesSearch && matchesCategory && matchesIndustry && matchesFeatured;
  });

  const featuredDataSheets = datasheets.filter(datasheet => datasheet.featured);

  return (
    <MarketingLayout>
      <div className="min-h-screen ai-dashboard-bg text-white">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-midnight-900 via-midnight-800 to-midnight-900 py-24">
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
          <div className="container mx-auto px-6 relative">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-spring-400 to-cyber-blue-400 bg-clip-text text-transparent">
                Data Sheets
              </h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Technical specifications, compliance documentation, and feature overviews to help you 
                understand and implement CyberSecure AI solutions.
              </p>
              <div className="flex items-center justify-center gap-4 text-sm text-gray-400">
                <span className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  {datasheets.length} Technical Documents
                </span>
                <span className="flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  PDF Downloads Available
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Data Sheets */}
        <div className="py-16 bg-midnight-950/50">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold mb-8 text-center">Featured Technical Documents</h2>
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {featuredDataSheets.map((datasheet, index) => (
                <Card key={index} className="bg-midnight-800/50 border-midnight-700 hover:border-spring-400/50 transition-all duration-300 group">
                  <div className="relative overflow-hidden">
                    <img 
                      src={datasheet.image} 
                      alt={datasheet.title}
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
                        v{datasheet.version}
                      </Badge>
                    </div>
                  </div>
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {getIndustryIcon(datasheet.industry)}
                        <span className="text-sm text-spring-400">{datasheet.industry}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-400">
                        {getCategoryIcon(datasheet.category)}
                        <span>{datasheet.category}</span>
                      </div>
                    </div>
                    <CardTitle className="text-white group-hover:text-spring-400 transition-colors">
                      {datasheet.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-300 mb-4 line-clamp-3">
                      {datasheet.description}
                    </CardDescription>
                    <div className="flex items-center justify-between mb-4 text-sm text-gray-400">
                      <span className="flex items-center gap-1">
                        <FileText className="w-3 h-3" />
                        {datasheet.pages}
                      </span>
                      <span className="flex items-center gap-1">
                        <Download className="w-3 h-3" />
                        {datasheet.downloadCount}
                      </span>
                    </div>
                    <Button 
                      size="sm" 
                      className="w-full bg-spring-500 hover:bg-spring-600 text-midnight-900 font-semibold"
                      onClick={() => handleDataSheetClick(datasheet)}
                    >
                      {datasheet.link ? (
                        <>
                          <Enhanced4DEyeIcon className="w-4 h-4 mr-2" size={16} />
                          View Details
                        </>
                      ) : (
                        <>
                          <Download className="w-4 h-4 mr-2" />
                          Download PDF
                        </>
                      )}
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
                      placeholder="Search data sheets..."
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

        {/* Data Sheets Grid */}
        <div className="py-16">
          <div className="container mx-auto px-6">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold">
                All Data Sheets 
                <span className="text-spring-400 ml-2">({filteredDataSheets.length})</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDataSheets.map((datasheet, index) => (
                <Card key={index} className="bg-midnight-800/50 border-midnight-700 hover:border-spring-400/50 transition-all duration-300 group">
                  <div className="relative overflow-hidden">
                    <img 
                      src={datasheet.image} 
                      alt={datasheet.title}
                      className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {datasheet.featured && (
                      <div className="absolute top-3 left-3">
                        <Badge className="bg-spring-500 text-black font-semibold text-xs">
                          Featured
                        </Badge>
                      </div>
                    )}
                    <div className="absolute top-3 right-3">
                      <Badge variant="outline" className="bg-midnight-900/90 border-midnight-600 text-white text-xs">
                        v{datasheet.version}
                      </Badge>
                    </div>
                  </div>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {getIndustryIcon(datasheet.industry)}
                        <span className="text-xs text-spring-400">{datasheet.industry}</span>
                      </div>
                      <Badge variant="outline" className="border-midnight-600 text-gray-400 text-xs">
                        {datasheet.category}
                      </Badge>
                    </div>
                    <CardTitle className="text-sm text-white group-hover:text-spring-400 transition-colors line-clamp-2">
                      {datasheet.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <CardDescription className="text-gray-300 mb-3 text-sm line-clamp-2">
                      {datasheet.description}
                    </CardDescription>
                    <div className="flex items-center justify-between mb-3 text-xs text-gray-400">
                      <span className="flex items-center gap-1">
                        <FileText className="w-3 h-3" />
                        {datasheet.pages}
                      </span>
                      <span className="flex items-center gap-1">
                        <Download className="w-3 h-3" />
                        {datasheet.downloadCount}
                      </span>
                    </div>
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="w-full border-spring-400 text-spring-400 hover:bg-spring-400 hover:text-black text-xs"
                      onClick={() => handleDataSheetClick(datasheet)}
                    >
                      {datasheet.link ? (
                        <>
                          <Enhanced4DEyeIcon className="w-3 h-3 mr-2" size={12} />
                          View Details
                        </>
                      ) : (
                        <>
                          <Download className="w-3 h-3 mr-2" />
                          Download PDF
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredDataSheets.length === 0 && (
              <div className="text-center py-12">
                <FileText className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-400 mb-2">No data sheets found</h3>
                <p className="text-gray-500">Try adjusting your filters or search terms</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </MarketingLayout>
  );
}