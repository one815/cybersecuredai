import { useState } from "react";
import { MarketingLayout } from "@/components/MarketingLayout";
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
  TrendingUp,
  Shield,
  Zap,
  AlertTriangle,
  Target
} from "lucide-react";
import zeroTrustFederalImg from "@assets/generated_images/Zero_Trust_Federal_UseCase_917a389e.png";
import executiveOrderImg from "@assets/generated_images/Executive_Order_Compliance_fa53dcb9.png";
import criticalInfraImg from "@assets/generated_images/Critical_Infrastructure_Protection_939a6a9a.png";
import multiStateImg from "@assets/generated_images/Multi_State_Coalition_e7af0642.png";
import stateStandardsImg from "@assets/generated_images/State_AI_Standards_eedb2317.png";
import cityVulnImg from "@assets/generated_images/City_Vulnerability_Assessment_dd3a88e4.png";

const industries = [
  "Federal Government",
  "State Government", 
  "Municipal Government",
  "Higher Education",
  "K-12 Education",
  "Cross-Industry"
];

const useCases = [
  // Federal Government Use Cases
  {
    title: "Zero Trust Architecture Implementation",
    description: "How Federal Agencies Achieve 47% Reduction in Security Incidents with CyberSecure AI's Zero Trust Architecture",
    fullUseCase: "The Department of Defense implemented CyberSecure AI's Zero Trust Architecture (ZTA) solution across its digital infrastructure, moving beyond traditional perimeter-based security. Following Executive Order 14028, the agency needed to verify every user, device, and application attempting to access resources, regardless of location. CyberSecure AI's implementation provided continuous verification of all access requests using AI-driven behavioral analysis, micro-segmentation of network resources to contain potential breaches, policy enforcement points that authenticate and authorize based on multiple factors, and real-time monitoring with automated threat response. Results: The agency documented a 47% reduction in security incidents within the first year, while maintaining compliance with federal mandates and NIST standards for secure AI implementation.",
    industry: "Federal Government",
    results: "47% reduction in security incidents",
    downloadCount: "1,900",
    featured: true,
    image: zeroTrustFederalImg,
    keywords: "zero trust architecture government, federal agency cybersecurity, NIST zero trust implementation, secure AI federal compliance, ZTA federal mandates, government security incident reduction"
  },
  {
    title: "Executive Order Compliance",
    description: "CyberSecure AI: Enabling Rapid Federal Compliance with Executive Orders on AI Security",
    fullUseCase: "Following new Executive Orders mandating secure AI development practices, the Department of Energy faced the challenge of quickly assessing and upgrading its AI systems across 17 national laboratories. With limited time and resources, the department needed a standardized approach to ensure compliance. CyberSecure AI provided automated compliance assessment tools mapped directly to Executive Order requirements, pre-configured security templates aligned with federal AI security frameworks, continuous monitoring for regulatory changes with implementation roadmaps, and cross-department collaboration tools to standardize security practices. Results: The Department achieved full compliance within 90 days, avoiding potential penalties while establishing a sustainable framework for adapting to future executive orders.",
    industry: "Federal Government",
    results: "Full compliance within 90 days",
    downloadCount: "1,400",
    featured: false,
    image: executiveOrderImg,
    keywords: "federal AI executive order compliance, government AI security requirements, federal AI regulatory compliance, White House AI security mandates, secure AI government implementation"
  },
  {
    title: "Critical Infrastructure Protection",
    description: "Protecting National Security: How Federal Agencies Detect and Mitigate Nation-State Attacks with CyberSecure AI",
    fullUseCase: "The Department of Homeland Security identified sophisticated nation-state actors targeting AI systems controlling power grid operations. These attacks exploited vulnerabilities in machine learning models to manipulate critical infrastructure functionality. CyberSecure AI deployment included advanced threat intelligence specifically focused on AI-targeting attack vectors, real-time anomaly detection in AI model behavior and outputs, secure model architecture with built-in resistance to adversarial attacks, and automated containment and remediation protocols. Results: Federal agencies successfully identified and neutralized 23 sophisticated attack attempts, maintaining continuous operation of critical infrastructure while providing valuable intelligence on emerging threats.",
    industry: "Federal Government",
    results: "23 attacks neutralized, continuous operations maintained",
    downloadCount: "2,100",
    featured: true,
    image: criticalInfraImg,
    keywords: "critical infrastructure AI security, nation-state attack mitigation, federal AI threat response, secure AI infrastructure protection, power grid AI security, AI adversarial attack detection"
  },
  // State Government Use Cases
  {
    title: "Multi-State Security Coalition",
    description: "Building Resilience Through Collaboration: CyberSecure AI's Multi-State Security Coalition Framework",
    fullUseCase: "Following a series of coordinated attacks targeting state-level AI systems, seven Midwestern states formed a security coalition to share resources and threat intelligence. Previously, each state operated independently, creating security gaps and duplicating efforts. CyberSecure AI enabled secure, cross-state threat intelligence sharing platform with automated analysis, pooled security resources providing 24/7 monitoring capabilities, standardized incident response protocols across state boundaries, and collaborative training and simulation exercises. Results: The coalition identified 34% more threats than individual state efforts, while reducing security costs by 28% through resource sharing and eliminating duplicate efforts.",
    industry: "State Government",
    results: "34% more threats detected, 28% cost reduction",
    downloadCount: "980",
    featured: false,
    image: multiStateImg,
    keywords: "multi-state cybersecurity collaboration, state government AI security coalition, cross-state threat intelligence sharing, collaborative state AI protection, state security resource sharing"
  },
  {
    title: "State-wide AI Security Standards",
    description: "Eliminating Security Fragmentation: How State IT Departments Standardize AI Protection with CyberSecure AI",
    fullUseCase: "The California Department of Technology faced significant challenges with inconsistent AI security practices across 137 state agencies. This fragmentation created vulnerabilities, compliance issues, and inefficient resource allocation. CyberSecure AI provided centralized security policy management with agency-specific customizations, automated compliance monitoring and reporting across all state entities, standardized security implementation templates for common AI applications, and cross-agency visibility with unified security dashboards. Results: Within 12 months, the state achieved 94% standardization across agencies, eliminated critical security gaps, and reduced redundant security spending by $3.7 million annually.",
    industry: "State Government",
    results: "94% standardization, $3.7M cost savings",
    downloadCount: "1,150",
    featured: false,
    image: stateStandardsImg,
    keywords: "state-wide AI security standards, government AI security standardization, unified state cybersecurity framework, state agency security fragmentation, consistent AI protection government"
  },
  // Municipal Government Use Cases
  {
    title: "City System Vulnerability Assessment",
    description: "Securing Municipal Infrastructure: How CyberSecure AI Helps Cities Reduce Vulnerabilities by 78%",
    fullUseCase: "The City of Lakewood faced increasing challenges with its aging digital infrastructure as AI-powered threats emerged. With limited cybersecurity personnel and budget constraints, the city needed a comprehensive approach to identify and address vulnerabilities across all municipal systems. CyberSecure AI provided automated vulnerability scanning specifically calibrated for municipal systems, risk prioritization based on threat severity and system criticality, remediation roadmaps tailored to budget constraints, and continuous monitoring with early detection capabilities. Results: Within 6 months, Lakewood identified and remediated 78% of previously unknown vulnerabilities, preventing three potential breaches and maintaining essential city services without interruption.",
    industry: "Municipal Government",
    results: "78% vulnerability reduction",
    downloadCount: "1,250",
    featured: false,
    image: cityVulnImg,
    keywords: "municipal cybersecurity assessment, city system vulnerability protection, local government AI security, urban infrastructure cybersecurity, smart city vulnerability management, municipal AI threat prevention"
  }
];

export default function UseCases() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [expandedCase, setExpandedCase] = useState<number | null>(null);

  const filteredUseCases = useCases.filter(useCase => {
    const matchesSearch = useCase.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         useCase.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesIndustry = selectedIndustries.length === 0 || selectedIndustries.includes(useCase.industry);
    return matchesSearch && matchesIndustry;
  });

  const handleIndustryChange = (industry: string, checked: boolean) => {
    if (checked) {
      setSelectedIndustries([...selectedIndustries, industry]);
    } else {
      setSelectedIndustries(selectedIndustries.filter(i => i !== industry));
    }
  };

  const getIndustryIcon = (industry: string) => {
    switch (industry) {
      case "Federal Government":
        return <Building className="w-4 h-4 text-blue-400" />;
      case "State Government":
        return <Building className="w-4 h-4 text-green-400" />;
      case "Municipal Government":
        return <Building className="w-4 h-4 text-orange-400" />;
      case "Higher Education":
        return <GraduationCap className="w-4 h-4 text-purple-400" />;
      case "K-12 Education":
        return <School className="w-4 h-4 text-yellow-400" />;
      default:
        return <Users className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <MarketingLayout>
      <div className="min-h-screen bg-slate-900 text-white">
        {/* Hero Section */}
        <section className="relative py-20 px-6 bg-gradient-to-br from-slate-900 via-blue-900/20 to-slate-900">
          <div className="absolute inset-0 bg-grid-white/[0.02]" />
          <div className="container mx-auto max-w-6xl relative z-10">
            <div className="text-center mb-16">
              <Badge className="mb-6 bg-blue-500/20 text-blue-300 border-blue-500/30 text-lg px-4 py-2">
                <Target className="w-4 h-4 mr-2" />
                CyberSecure AI Use Cases
              </Badge>
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Real-World Success
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-500">
                  Stories & Results
                </span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
                Comprehensive case studies showcasing how government agencies and educational institutions achieve measurable security improvements with CyberSecure AI solutions.
              </p>
              <div className="flex items-center justify-center gap-6">
                <div className="flex items-center gap-2 text-blue-400">
                  <Shield className="w-5 h-5" />
                  <span>Detailed Case Studies</span>
                </div>
                <div className="flex items-center gap-2 text-blue-400">
                  <TrendingUp className="w-5 h-5" />
                  <span>Measurable Results</span>
                </div>
                <div className="flex items-center gap-2 text-blue-400">
                  <FileText className="w-5 h-5" />
                  <span>Implementation Guides</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Use Cases Content */}
        <section className="py-20 px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Filter Sidebar */}
              <div className="lg:w-1/4">
                <Card className="bg-slate-800/60 border-slate-700 sticky top-4">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Filter className="w-5 h-5 mr-2" />
                      Filter by Industry
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Search */}
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="Search use cases..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 bg-slate-700 border-slate-600 text-white placeholder-gray-400"
                      />
                    </div>

                    {/* Industries */}
                    <div className="space-y-2">
                      {industries.map((industry) => (
                        <div key={industry} className="flex items-center space-x-2">
                          <Checkbox
                            id={`industry-${industry}`}
                            checked={selectedIndustries.includes(industry)}
                            onCheckedChange={(checked) => handleIndustryChange(industry, checked as boolean)}
                            className="border-slate-600 data-[state=checked]:bg-blue-600"
                          />
                          <label
                            htmlFor={`industry-${industry}`}
                            className="text-sm text-gray-300 cursor-pointer flex items-center gap-2"
                          >
                            {getIndustryIcon(industry)}
                            {industry}
                          </label>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Use Cases List */}
              <div className="lg:w-3/4">
                <div className="mb-6 flex items-center justify-between">
                  <p className="text-gray-400">
                    Showing {filteredUseCases.length} of {useCases.length} use cases
                  </p>
                  <Badge variant="outline" className="text-blue-400 border-blue-400">
                    {filteredUseCases.length} results
                  </Badge>
                </div>

                <div className="space-y-8">
                  {filteredUseCases.map((useCase, index) => (
                    <Card key={index} className="bg-slate-800/60 border-slate-700 hover:border-blue-500/50 transition-all duration-300">
                      <div className="flex">
                        <div className="w-1/3">
                          <img 
                            src={useCase.image} 
                            alt={useCase.title}
                            className="w-full h-full object-cover rounded-l-lg"
                          />
                        </div>
                        <div className="w-2/3">
                          <CardHeader>
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  {getIndustryIcon(useCase.industry)}
                                  <span className="text-sm text-blue-400">{useCase.industry}</span>
                                  {useCase.featured && (
                                    <Star className="w-4 h-4 text-yellow-400" />
                                  )}
                                </div>
                                <CardTitle className="text-2xl text-white mb-3">
                                  {useCase.title}
                                </CardTitle>
                                <CardDescription className="text-gray-300 mb-4">
                                  {useCase.description}
                                </CardDescription>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="mb-4">
                              <div className="flex items-center gap-4 mb-3">
                                <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                                  <TrendingUp className="w-3 h-3 mr-1" />
                                  {useCase.results}
                                </Badge>
                                <div className="flex items-center text-sm text-gray-400">
                                  <Download className="w-4 h-4 mr-1" />
                                  {useCase.downloadCount} downloads
                                </div>
                              </div>
                              <div className="text-xs text-gray-500 mb-3">
                                <strong>SEO Keywords:</strong> {useCase.keywords}
                              </div>
                            </div>
                            
                            {expandedCase === index && (
                              <div className="mb-4 p-4 bg-slate-700/50 rounded-lg">
                                <h4 className="font-semibold text-white mb-2">Full Use Case:</h4>
                                <p className="text-gray-300 text-sm leading-relaxed">{useCase.fullUseCase}</p>
                              </div>
                            )}
                            
                            <div className="flex gap-3">
                              <Button 
                                size="sm" 
                                className="bg-blue-600 hover:bg-blue-700 text-white"
                                onClick={() => setExpandedCase(expandedCase === index ? null : index)}
                              >
                                {expandedCase === index ? (
                                  <>
                                    <ChevronDown className="w-4 h-4 mr-1" />
                                    Hide Details
                                  </>
                                ) : (
                                  <>
                                    <Eye className="w-4 h-4 mr-1" />
                                    View Full Case
                                  </>
                                )}
                              </Button>
                              <Button size="sm" variant="outline" className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-black">
                                <Download className="w-4 h-4 mr-1" />
                                Download Case Study
                              </Button>
                            </div>
                          </CardContent>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>

                {filteredUseCases.length === 0 && (
                  <div className="text-center py-16">
                    <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <div className="text-gray-400 text-lg mb-2">No use cases found</div>
                    <div className="text-gray-500">Try adjusting your search or filter criteria</div>
                    <Button 
                      variant="outline" 
                      className="mt-4 border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-black"
                      onClick={() => {
                        setSearchTerm("");
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
        </section>

        {/* Call to Action */}
        <section className="py-16 px-6 bg-slate-800">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Achieve Similar Results?
            </h2>
            <p className="text-lg text-gray-300 mb-8">
              Explore how CyberSecure AI can help your organization implement proven security solutions with measurable outcomes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4">
                <ExternalLink className="w-5 h-5 mr-2" />
                Request Implementation Consultation
              </Button>
              <Button size="lg" variant="outline" className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-black px-8 py-4">
                <Download className="w-5 h-5 mr-2" />
                Download All Case Studies
              </Button>
            </div>
          </div>
        </section>
      </div>
    </MarketingLayout>
  );
}