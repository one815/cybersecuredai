import { useState } from "react";
import { MarketingLayout } from "@/components/MarketingLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Search,
  ExternalLink,
  Star,
  Filter,
  CheckCircle,
  Building,
  GraduationCap,
  School,
  Users,
  Database,
  Cloud,
  Monitor,
  Cpu,
  Globe,
  ShieldAlert,
  BookOpen,
  UserCheck,
  Layers,
  ShieldCheck
} from "lucide-react";
import {
  Enhanced4DBrainIcon,
  Enhanced4DNetworkIcon,
  Enhanced4DShieldIcon,
  Enhanced4DEyeIcon,
  Enhanced4DLockIcon,
  Enhanced4DZapIcon,
  Enhanced4DActivityIcon,
  CustomShieldIcon,
  CustomTargetIcon
} from "@/components/CustomIcons";
import integrationImg from "@assets/generated_images/Integration_Hub_Network_a0bbdbbb.png";
import sentinelImg from "@assets/generated_images/Microsoft_Sentinel_Integration_50e01dae.png";
import azureAdImg from "@assets/generated_images/Azure_AD_SSO_Integration_0e96f0ea.png";
import cortexXdrImg from "@assets/generated_images/CrowdStrike_Falcon_Integration_b7b00887.png";
import awsLogo from "@assets/download-1_1756487272282.jpg";

const categories = [
  "SIEM & Security Analytics",
  "Identity & Access Management", 
  "Endpoint Protection",
  "Network Security",
  "Cloud Security",
  "Compliance & GRC",
  "Communication & Collaboration",
  "Database & Storage"
];

const industries = [
  "Federal Government",
  "Higher Education", 
  "K-12 Education",
  "Cross-Industry"
];

const integrationTypes = [
  "Native Integration",
  "API Integration", 
  "Webhook Support",
  "Custom Connector"
];

const integrations = [
  {
    title: "Microsoft Sentinel Integration",
    vendor: "Microsoft",
    description: "Native integration with Microsoft Sentinel for comprehensive SIEM capabilities, including automated threat hunting, incident correlation, and centralized security monitoring.",
    category: "SIEM & Security Analytics",
    industry: "Cross-Industry",
    type: "Native Integration",
    features: ["Real-time threat correlation", "Automated incident response", "Centralized log management", "Custom dashboards"],
    setupTime: "< 30 minutes",
    featured: true,
    certified: true,
    image: sentinelImg
  },
  {
    title: "Azure Active Directory SSO",
    vendor: "Microsoft",
    description: "Seamless single sign-on integration with Azure Active Directory for enterprise-grade identity and access management across government and educational institutions.",
    category: "Identity & Access Management",
    industry: "Federal Government", 
    type: "Native Integration",
    features: ["Single sign-on", "Multi-factor authentication", "Conditional access policies", "User provisioning"],
    setupTime: "< 15 minutes",
    featured: true,
    certified: true,
    image: azureAdImg
  },
  {
    title: "Palo Alto Cortex XDR Integration",
    vendor: "Palo Alto Networks",
    description: "Advanced endpoint detection and response integration providing comprehensive threat visibility and automated incident response capabilities.",
    category: "Endpoint Protection",
    industry: "Cross-Industry",
    type: "API Integration", 
    features: ["Endpoint threat detection", "Behavioral analysis", "Threat intelligence sharing", "Automated containment"],
    setupTime: "< 45 minutes",
    featured: true,
    certified: true,
    image: cortexXdrImg
  },
  {
    title: "Mandiant Threat Intelligence",
    vendor: "Google Cloud",
    description: "Optional premium threat intelligence integration for advanced APT attribution and specialized threat hunting capabilities.",
    category: "Endpoint Protection",
    industry: "Federal Government",
    type: "API Integration", 
    features: ["APT attribution", "Advanced threat hunting", "Incident response intelligence", "Custom threat analysis"],
    setupTime: "< 60 minutes",
    featured: false,
    certified: true,
    image: integrationImg
  },
  {
    title: "Canvas LMS Security Integration",
    vendor: "Instructure",
    description: "Specialized integration for Canvas Learning Management System providing student data protection and educational compliance monitoring.",
    category: "Communication & Collaboration",
    industry: "Higher Education",
    type: "API Integration",
    features: ["Student data protection", "FERPA compliance monitoring", "Access control", "Audit logging"],
    setupTime: "< 60 minutes",
    featured: false,
    certified: true,
    image: integrationImg
  },
  {
    title: "Splunk Enterprise Security",
    vendor: "Splunk",
    description: "Comprehensive SIEM integration enabling advanced security analytics, threat hunting, and compliance reporting for enterprise environments.",
    category: "SIEM & Security Analytics", 
    industry: "Federal Government",
    type: "Custom Connector",
    features: ["Advanced analytics", "Threat hunting", "Compliance reporting", "Custom dashboards"],
    setupTime: "< 90 minutes",
    featured: false,
    certified: true,
    image: integrationImg
  },
  {
    title: "Google Workspace for Education",
    vendor: "Google",
    description: "Secure integration with Google Workspace for Education providing student privacy protection and educational technology security.",
    category: "Communication & Collaboration",
    industry: "K-12 Education", 
    type: "Native Integration",
    features: ["Student privacy protection", "Safe browsing", "Content filtering", "Admin controls"],
    setupTime: "< 20 minutes",
    featured: false,
    certified: true,
    image: integrationImg
  },
  {
    title: "Amazon Web Services Security Hub",
    vendor: "Amazon Web Services",
    description: "Comprehensive AWS Security Hub integration for centralized security findings management, compliance status monitoring, and automated security standards assessment.",
    category: "Cloud Security",
    industry: "Cross-Industry",
    type: "Native Integration",
    features: ["Centralized security findings", "Compliance dashboard", "Security standards automation", "Multi-account management"],
    setupTime: "< 25 minutes",
    featured: true,
    certified: true,
    image: integrationImg
  }
];

// Function to get brand logos for vendors
const getBrandLogo = (vendor: string) => {
  switch (vendor) {
    case "Amazon Web Services":
      return (
        <img 
          src={awsLogo} 
          alt="AWS Logo" 
          className="w-8 h-8 object-contain bg-white rounded p-1"
        />
      );
    case "Microsoft":
      return (
        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-400 rounded flex items-center justify-center text-white font-bold text-xs">
          MS
        </div>
      );
    case "Google":
      return (
        <div className="w-8 h-8 bg-gradient-to-br from-red-500 via-yellow-500 to-green-500 rounded flex items-center justify-center text-white font-bold text-xs">
          G
        </div>
      );
    case "Palo Alto Networks":
      return (
        <div className="w-8 h-8 bg-gradient-to-br from-orange-600 to-red-600 rounded flex items-center justify-center text-white font-bold text-xs">
          PA
        </div>
      );
    case "Splunk":
      return (
        <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded flex items-center justify-center text-white font-bold text-xs">
          SP
        </div>
      );
    default:
      return <Building className="w-4 h-4" />;
  }
};

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
      return <Enhanced4DZapIcon className="w-4 h-4" size={16} />;
  }
};

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "SIEM & Security Analytics":
      return (
        <div className="relative">
          <Enhanced4DEyeIcon className="w-4 h-4" size={16} />
          <Enhanced4DActivityIcon className="w-2 h-2 absolute -top-1 -right-1 text-spring-400" size={8} />
        </div>
      );
    case "Identity & Access Management":
      return (
        <div className="relative">
          <UserCheck className="w-4 h-4" />
          <Enhanced4DLockIcon className="w-2 h-2 absolute -bottom-1 -right-1 text-spring-400" size={8} />
        </div>
      );
    case "Endpoint Protection":
      return (
        <div className="relative">
          <Monitor className="w-4 h-4" />
          <ShieldCheck className="w-2 h-2 absolute -top-1 -right-1 text-green-400" />
        </div>
      );
    case "Network Security":
      return (
        <div className="relative">
          <Enhanced4DNetworkIcon className="w-4 h-4" size={16} />
          <ShieldAlert className="w-2 h-2 absolute -top-1 -right-1 text-orange-400" />
        </div>
      );
    case "Cloud Security":
      return (
        <div className="relative">
          <Cloud className="w-4 h-4" />
          <Layers className="w-2 h-2 absolute -bottom-1 -right-1 text-blue-400" />
        </div>
      );
    case "Database & Storage":
      return (
        <div className="relative">
          <Database className="w-4 h-4" />
          <Enhanced4DLockIcon className="w-2 h-2 absolute -top-1 -right-1 text-purple-400" size={8} />
        </div>
      );
    case "Communication & Collaboration":
      return (
        <div className="relative">
          <Globe className="w-4 h-4" />
          <Users className="w-2 h-2 absolute -bottom-1 -right-1 text-cyan-400" />
        </div>
      );
    default:
      return <Enhanced4DBrainIcon className="w-4 h-4" size={16} />;
  }
};

const getTypeColor = (type: string) => {
  switch (type) {
    case "Native Integration":
      return "bg-green-500/10 text-green-400 border-green-500/20";
    case "API Integration":
      return "bg-blue-500/10 text-blue-400 border-blue-500/20";
    case "Webhook Support":
      return "bg-purple-500/10 text-purple-400 border-purple-500/20";
    case "Custom Connector":
      return "bg-orange-500/10 text-orange-400 border-orange-500/20";
    default:
      return "bg-gray-500/10 text-gray-400 border-gray-500/20";
  }
};

export default function Integrations() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);
  const [showCertifiedOnly, setShowCertifiedOnly] = useState(false);

  const filteredIntegrations = integrations.filter(integration => {
    const matchesSearch = integration.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         integration.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         integration.vendor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(integration.category);
    const matchesIndustry = selectedIndustries.length === 0 || selectedIndustries.includes(integration.industry);
    const matchesType = selectedTypes.length === 0 || selectedTypes.includes(integration.type);
    const matchesFeatured = !showFeaturedOnly || integration.featured;
    const matchesCertified = !showCertifiedOnly || integration.certified;
    
    return matchesSearch && matchesCategory && matchesIndustry && matchesType && matchesFeatured && matchesCertified;
  });

  const featuredIntegrations = integrations.filter(integration => integration.featured);

  return (
    <MarketingLayout>
      <div className="min-h-screen ai-dashboard-bg text-white">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-midnight-900 via-midnight-800 to-midnight-900 py-24">
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
          <div className="container mx-auto px-6 relative">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-spring-400 to-cyber-blue-400 bg-clip-text text-transparent">
                Security Integrations
              </h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Seamlessly connect CyberSecured AI with your existing security tools and infrastructure. 
                Our extensive integration library ensures compatibility with leading enterprise solutions.
              </p>
              <div className="flex items-center justify-center gap-4 text-sm text-gray-400">
                <span className="flex items-center gap-2">
                  <Enhanced4DZapIcon className="w-4 h-4" size={16} />
                  {integrations.length}+ Certified Integrations
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Enterprise Ready
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Integrations */}
        <div className="py-16 bg-midnight-950/50">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold mb-8 text-center">Featured Integrations</h2>
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {featuredIntegrations.map((integration, index) => (
                <Card key={index} className="bg-midnight-800/50 border-midnight-700 hover:border-spring-400/50 transition-all duration-300 group">
                  <div className="relative overflow-hidden">
                    <img 
                      src={integration.image} 
                      alt={integration.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <Badge className="bg-spring-500 text-midnight-900 font-semibold">
                        <Star className="w-3 h-3 mr-1" />
                        Featured
                      </Badge>
                      {integration.certified && (
                        <Badge className="bg-blue-500 text-white font-semibold">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Certified
                        </Badge>
                      )}
                    </div>
                    <div className="absolute top-4 right-4">
                      <Badge variant="outline" className="bg-midnight-900/90 border-midnight-600 text-white">
                        {integration.setupTime}
                      </Badge>
                    </div>
                  </div>
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {getIndustryIcon(integration.industry)}
                        <span className="text-sm text-spring-400">{integration.industry}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {getCategoryIcon(integration.category)}
                        {getBrandLogo(integration.vendor)}
                      </div>
                    </div>
                    <CardTitle className="text-white group-hover:text-spring-400 transition-colors">
                      {integration.title}
                    </CardTitle>
                    <Badge variant="outline" className={`w-fit text-xs ${getTypeColor(integration.type)}`}>
                      {integration.type}
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-300 mb-4 line-clamp-3">
                      {integration.description}
                    </CardDescription>
                    <div className="space-y-2 mb-4">
                      <span className="text-sm font-medium text-spring-400">Key Features:</span>
                      {integration.features.slice(0, 3).map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="w-3 h-3 text-spring-400 flex-shrink-0" />
                          <span className="text-gray-300">{feature}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mb-4">
                      <Badge variant="outline" className="border-midnight-600 text-gray-400 text-xs">
                        {integration.category}
                      </Badge>
                    </div>
                    <Button 
                      size="sm" 
                      className="w-full bg-spring-500 hover:bg-spring-600 text-midnight-900 font-semibold"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View Integration
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
                      placeholder="Search integrations..."
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
                      {integrationTypes.map((type) => (
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

                {/* Options Filter */}
                <div className="lg:w-32">
                  <div className="space-y-3">
                    <span className="text-sm font-medium text-spring-400">Options</span>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <Checkbox
                          checked={showFeaturedOnly}
                          onCheckedChange={(checked) => setShowFeaturedOnly(checked === true)}
                          className="data-[state=checked]:bg-spring-500 data-[state=checked]:border-spring-500"
                        />
                        <span className="text-sm text-gray-300">Featured</span>
                      </label>
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <Checkbox
                          checked={showCertifiedOnly}
                          onCheckedChange={(checked) => setShowCertifiedOnly(checked === true)}
                          className="data-[state=checked]:bg-spring-500 data-[state=checked]:border-spring-500"
                        />
                        <span className="text-sm text-gray-300">Certified</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Active Filters */}
              {(selectedCategories.length > 0 || selectedIndustries.length > 0 || selectedTypes.length > 0 || showFeaturedOnly || showCertifiedOnly) && (
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
                    {showCertifiedOnly && (
                      <Badge variant="outline" className="border-spring-400 text-spring-400">
                        Certified
                        <button
                          onClick={() => setShowCertifiedOnly(false)}
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

        {/* Integrations Grid */}
        <div className="py-16">
          <div className="container mx-auto px-6">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold">
                All Integrations 
                <span className="text-spring-400 ml-2">({filteredIntegrations.length})</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredIntegrations.map((integration, index) => (
                <Card key={index} className="bg-midnight-800/50 border-midnight-700 hover:border-spring-400/50 transition-all duration-300 group">
                  <div className="relative overflow-hidden">
                    <img 
                      src={integration.image} 
                      alt={integration.title}
                      className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3 flex gap-1">
                      {integration.featured && (
                        <Badge className="bg-spring-500 text-midnight-900 font-semibold text-xs">
                          Featured
                        </Badge>
                      )}
                      {integration.certified && (
                        <Badge className="bg-blue-500 text-white font-semibold text-xs">
                          Certified
                        </Badge>
                      )}
                    </div>
                    <div className="absolute top-3 right-3">
                      <Badge variant="outline" className="bg-midnight-900/90 border-midnight-600 text-white text-xs">
                        {integration.setupTime}
                      </Badge>
                    </div>
                  </div>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {getIndustryIcon(integration.industry)}
                        <span className="text-xs text-spring-400">{integration.industry}</span>
                      </div>
                      {getBrandLogo(integration.vendor)}
                    </div>
                    <CardTitle className="text-sm text-white group-hover:text-spring-400 transition-colors line-clamp-2">
                      {integration.title}
                    </CardTitle>
                    <Badge variant="outline" className={`w-fit text-xs ${getTypeColor(integration.type)}`}>
                      {integration.type}
                    </Badge>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <CardDescription className="text-gray-300 mb-3 text-sm line-clamp-2">
                      {integration.description}
                    </CardDescription>
                    <div className="space-y-1 mb-3">
                      {integration.features.slice(0, 2).map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs">
                          <CheckCircle className="w-3 h-3 text-spring-400 flex-shrink-0" />
                          <span className="text-gray-400">{feature}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mb-3">
                      <Badge variant="outline" className="border-midnight-600 text-gray-400 text-xs">
                        {integration.category}
                      </Badge>
                    </div>
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="w-full border-spring-400 text-spring-400 hover:bg-spring-400 hover:text-black text-xs"
                    >
                      <ExternalLink className="w-3 h-3 mr-2" />
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredIntegrations.length === 0 && (
              <div className="text-center py-12">
                <Enhanced4DZapIcon className="w-16 h-16 text-gray-600 mx-auto mb-4" size={64} />
                <h3 className="text-xl font-semibold text-gray-400 mb-2">No integrations found</h3>
                <p className="text-gray-500">Try adjusting your filters or search terms</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </MarketingLayout>
  );
}