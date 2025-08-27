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
import educationalSecurityImg from "@assets/generated_images/Educational_Security_Guide_330f6e1c.png";
import federalComplianceImg from "@assets/generated_images/Federal_Compliance_Handbook_8fbedcba.png";
import aiSecurityImg from "@assets/generated_images/AI_Security_Implementation_d7886bac.png";
import universityZeroTrustImg from "@assets/generated_images/University_Zero_Trust_411ba981.png";
import k12DigitalSafetyImg from "@assets/generated_images/K12_Digital_Safety_1bedbed4.png";
import governmentThreatImg from "@assets/generated_images/Government_Threat_Intelligence_aa6e2a67.png";
import complianceAutomationImg from "@assets/generated_images/Compliance_Automation_Strategies_dd60a808.png";
import campusIncidentImg from "@assets/generated_images/Campus_Incident_Response_ea29c3c7.png";

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
  // Federal Government eBooks
  {
    title: "Federal AI Security Compliance Guide: FISMA & FedRAMP Implementation",
    description: "Comprehensive guide for federal agencies implementing AI security compliance requirements. Covers FISMA frameworks, FedRAMP certification processes, executive order compliance, and practical implementation strategies.",
    fullDescription: "This essential 180-page guide provides federal IT professionals with detailed guidance on implementing AI security compliance across government agencies. Content includes step-by-step FISMA compliance implementation for AI systems, comprehensive FedRAMP certification preparation and documentation, executive order compliance strategies and adaptation frameworks, federal security assessment tools and methodologies, and inter-agency coordination protocols. Features real case studies from successful federal implementations, compliance checklists, and template documentation.",
    category: "Government Security",
    industry: "Federal Government",
    pages: "180 pages",
    downloadCount: "3,800",
    readTime: "10 hours",
    featured: true,
    image: federalComplianceImg,
    keywords: "federal AI security compliance, FISMA implementation guide, FedRAMP certification, government cybersecurity compliance, federal security frameworks",
    studyGuides: [
      "Federal AI Compliance Quick Reference",
      "FISMA Implementation Checklist",
      "FedRAMP Documentation Templates"
    ]
  },
  {
    title: "National Security AI Protection: Advanced Threat Response",
    description: "Specialized guide for protecting classified and sensitive AI systems. Covers compartmentalized security architectures, multi-level access controls, nation-state threat response, and classified data handling.",
    fullDescription: "This 225-page advanced guide addresses sophisticated threats targeting federal AI systems handling classified information. Content includes compartmentalized security architectures for AI workloads, multi-level security protocols and clearance-based access controls, classified data handling procedures and processing requirements, nation-state threat assessment and response strategies, and coordinated security operations for sensitive systems. Designed for security professionals with appropriate clearance levels.",
    category: "Threat Intelligence",
    industry: "Federal Government",
    pages: "225 pages",
    downloadCount: "1,950",
    readTime: "12 hours",
    featured: true,
    image: governmentThreatImg,
    keywords: "national security AI protection, classified AI security, nation-state threat response, compartmented information security, federal AI threat intelligence",
    studyGuides: [
      "Classified AI Security Protocols",
      "Nation-State Threat Assessment Framework",
      "Compartmented Security Implementation Guide"
    ]
  },
  {
    title: "Cross-Agency AI Security Coordination Handbook",
    description: "Comprehensive guide for coordinating AI security efforts across federal agencies. Inter-agency collaboration frameworks, shared threat intelligence, unified incident response, and standardized practices.",
    fullDescription: "This 165-page handbook provides federal security leaders with frameworks for coordinating AI security across agency boundaries. Content includes inter-agency security communication protocols and frameworks, shared threat intelligence platforms and analysis methodologies, coordinated incident response procedures across multiple agencies, standardized security practices while respecting agency autonomy, and resource sharing strategies for enhanced security coverage. Includes detailed case studies from successful multi-agency security initiatives.",
    category: "Government Security",
    industry: "Federal Government",
    pages: "165 pages",
    downloadCount: "1,450",
    readTime: "9 hours",
    featured: false,
    image: complianceAutomationImg,
    keywords: "cross-agency AI security, federal inter-agency coordination, government security collaboration, unified federal protection, multi-agency threat response",
    studyGuides: [
      "Inter-Agency Coordination Framework",
      "Federal Security Standards Template",
      "Multi-Agency Response Protocols"
    ]
  },
  // Higher Education eBooks
  {
    title: "Complete Guide to University AI Security: Research Protection & Academic Freedom",
    description: "Comprehensive 195-page guide covering all aspects of AI security in higher education environments. Research data protection, intellectual property safeguards, collaborative security frameworks, and campus-wide implementation.",
    fullDescription: "This comprehensive guide addresses the unique security challenges faced by universities implementing AI systems. Content includes academic-specific threat assessment and vulnerability analysis, research data protection strategies and intellectual property safeguards, collaborative security frameworks that preserve academic freedom and research collaboration, campus-wide deployment strategies for diverse academic environments, and student privacy considerations and FERPA compliance. Features detailed case studies from successful university implementations, security policy templates, and implementation roadmaps.",
    category: "Educational Security",
    industry: "Higher Education",
    pages: "195 pages",
    downloadCount: "5,400",
    readTime: "12 hours",
    featured: true,
    image: educationalSecurityImg,
    keywords: "university AI security, academic research protection, higher education cybersecurity, research data security, scholarly integrity protection",
    studyGuides: [
      "Academic Security Assessment Framework",
      "Research Data Protection Templates",
      "University AI Policy Guidelines"
    ]
  },
  {
    title: "Campus AI Security Implementation: Multi-Department Coordination Guide",
    description: "Practical guide for implementing AI security across university campuses. Multi-department coordination strategies, stakeholder engagement, student privacy compliance, and scalable deployment approaches.",
    fullDescription: "This 145-page implementation guide provides university IT leaders with proven strategies for campus-wide AI security deployment. Content includes multi-department coordination techniques and communication strategies, stakeholder engagement across academic and administrative units, student privacy protection and FERPA compliance frameworks, scalable implementation approaches for large campus environments, and change management strategies for academic settings. Includes practical templates, checklists, and real-world implementation timelines.",
    category: "Educational Security",
    industry: "Higher Education",
    pages: "145 pages",
    downloadCount: "3,200",
    readTime: "8 hours",
    featured: true,
    image: universityZeroTrustImg,
    keywords: "campus AI security implementation, university deployment strategies, higher education protection, multi-department coordination, student privacy compliance",
    studyGuides: [
      "Campus Deployment Roadmap",
      "Multi-Department Coordination Toolkit",
      "Student Privacy Compliance Guide"
    ]
  },
  {
    title: "Higher Education AI Security Pilot Programs: Design & Evaluation",
    description: "Comprehensive guide to designing, implementing, and evaluating AI security pilot programs in academic environments. Pilot design principles, metrics frameworks, evaluation methodologies, and scaling strategies.",
    fullDescription: "This 120-page guide provides higher education security leaders with frameworks for successful security pilot programs. Content includes pilot program design principles tailored for academic environments, metrics and evaluation frameworks for educational contexts, stakeholder engagement strategies across diverse academic departments, pilot evaluation methodologies and success criteria, and strategies for scaling successful pilots to full campus deployment. Features detailed case studies from successful university pilot programs and evaluation templates.",
    category: "Educational Security",
    industry: "Higher Education",
    pages: "120 pages",
    downloadCount: "1,850",
    readTime: "7 hours",
    featured: false,
    image: campusIncidentImg,
    keywords: "higher education security pilots, academic security testing, university pilot programs, educational security trials, campus security experiments",
    studyGuides: [
      "Pilot Program Design Template",
      "Academic Metrics Framework",
      "University Pilot Evaluation Toolkit"
    ]
  },
  // K-12 Education eBooks
  {
    title: "K-12 AI Security & Student Safety: Complete Protection Guide",
    description: "Essential 110-page resource for protecting K-12 students and educational technology. Age-appropriate security measures, privacy law compliance, student safety frameworks, and parental engagement strategies.",
    fullDescription: "This comprehensive guide provides K-12 administrators with complete AI security and student safety strategies. Content includes school-specific threat assessment and age-appropriate security measures, student safety protocols and privacy protection frameworks, classroom technology security and educational AI safeguards, parent engagement and communication strategies for security awareness, and compliance with COPPA, FERPA, and state privacy regulations. Features practical implementation guides, safety checklists, and communication templates for parents and educators.",
    category: "Educational Security",
    industry: "K-12 Education",
    pages: "110 pages",
    downloadCount: "4,500",
    readTime: "6 hours",
    featured: true,
    image: k12DigitalSafetyImg,
    keywords: "K-12 AI security, student safety protection, school cybersecurity, educational technology security, classroom AI safety",
    studyGuides: [
      "K-12 Security Implementation Checklist",
      "Student Safety Protocol Framework",
      "Parent Communication Toolkit"
    ]
  },
  // Cross-Industry eBooks
  {
    title: "AI Security Implementation Guide: Technical Specifications & Best Practices",
    description: "Comprehensive 210-page technical guide for implementing AI security across any organization. Technical specifications, architectural frameworks, monitoring strategies, and industry-specific adaptations.",
    fullDescription: "This detailed technical guide provides IT professionals with comprehensive AI security implementation strategies. Content includes technical specifications for secure AI architectures, security frameworks and implementation methodologies, monitoring and detection strategies for AI-specific threats, incident response procedures tailored for AI systems, and industry-specific adaptation guidance for government and education sectors. Features code examples, configuration templates, and detailed technical appendices.",
    category: "AI & Cybersecurity",
    industry: "Cross-Industry",
    pages: "210 pages",
    downloadCount: "4,200",
    readTime: "14 hours",
    featured: true,
    image: aiSecurityImg,
    keywords: "AI security implementation, technical AI protection, secure AI architecture, AI cybersecurity best practices, AI security frameworks",
    studyGuides: [
      "AI Security Technical Specifications",
      "Implementation Best Practices Guide",
      "AI Security Monitoring Framework"
    ]
  },
  {
    title: "Compliance Automation Strategies: Government & Education Focus",
    description: "Learn how to automate compliance monitoring and reporting across government and educational institutions. Tool recommendations, implementation roadmaps, and sector-specific guidance.",
    fullDescription: "This 135-page guide provides compliance officers and IT leaders with automation strategies for regulatory compliance. Content includes automated compliance monitoring tools and implementation strategies, reporting automation and dashboard development, sector-specific compliance requirements for government and education, tool selection criteria and vendor evaluation frameworks, and implementation roadmaps with timelines and milestones. Features comparative tool analysis and ROI calculations for compliance automation initiatives.",
    category: "Compliance & Governance",
    industry: "Cross-Industry",
    pages: "135 pages",
    downloadCount: "2,300",
    readTime: "8 hours",
    featured: false,
    image: complianceAutomationImg,
    keywords: "compliance automation, regulatory monitoring automation, government compliance tools, education sector compliance, automated reporting strategies",
    studyGuides: [
      "Compliance Automation Implementation Guide",
      "Tool Selection and Evaluation Framework",
      "ROI Calculator for Compliance Automation"
    ]
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
                      <Badge className="bg-spring-500 text-midnight-900 font-semibold">
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
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white border-0 font-semibold min-h-[40px] flex items-center justify-center"
                      data-testid="button-download-ebook-featured"
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
                      className="w-full border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-black min-h-[36px] flex items-center justify-center"
                      data-testid="button-download-ebook-list"
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