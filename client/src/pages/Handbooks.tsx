import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Search,
  BookOpen,
  Building,
  GraduationCap,
  School,
  Shield,
  Users,
  ExternalLink,
  Download,
  FileText,
  Filter
} from "lucide-react";
import definitiveAIHandbookImg from "@assets/generated_images/Definitive_AI_Security_Handbook_11b99390.png";
import federalAIHandbookImg from "@assets/generated_images/Federal_AI_Security_Handbook_9586f7b5.png";
import universityAIHandbookImg from "@assets/generated_images/University_AI_Security_Handbook_1c87369e.png";
import k12AIHandbookImg from "@assets/generated_images/K12_AI_Security_Handbook_220cb241.png";
import aiFieldGuideImg from "@assets/generated_images/AI_Security_Field_Guide_a103de8a.png";

const handbooks = [
  {
    title: "The Definitive AI Security Handbook: Comprehensive Protection Strategies",
    description: "Complete 450-page reference covering all aspects of AI security across industries. Advanced strategies, cutting-edge tools, and proven techniques for protecting intelligent systems in any environment.",
    fullDescription: "This comprehensive handbook serves as the ultimate reference for AI security professionals across all sectors. Content includes advanced threat detection and response strategies, comprehensive security architecture frameworks for AI systems, cutting-edge tools and technologies for AI protection, industry-specific implementation guides for government and education, and emerging threat landscape analysis with future-proofing strategies. Features detailed case studies, technical specifications, implementation checklists, and expert interviews from leading AI security practitioners.",
    sector: "general",
    pages: "450+",
    version: "2025 Edition",
    downloadCount: "8,900",
    featured: true,
    image: definitiveAIHandbookImg,
    keywords: "comprehensive AI security handbook, advanced AI protection strategies, AI cybersecurity best practices, intelligent systems security, AI threat detection",
    studyGuides: [
      "AI Security Professional Certification Guide",
      "Advanced Threat Response Playbook",
      "AI Security Architecture Reference"
    ]
  },
  {
    title: "Federal AI Security Handbook: Government Compliance, Protection, and Response",
    description: "Specialized 320-page handbook for federal agencies implementing AI security. FISMA compliance, FedRAMP certification, classified systems protection, and inter-agency coordination strategies.",
    fullDescription: "This authoritative handbook provides federal security professionals with comprehensive guidance on government AI security implementation. Content includes detailed FISMA compliance frameworks and implementation strategies, FedRAMP certification processes and documentation requirements, classified AI systems protection and compartmented security, inter-agency coordination protocols and resource sharing, and executive order compliance and regulatory adaptation. Features federal case studies, compliance templates, security assessment tools, and coordination frameworks.",
    sector: "federal",
    pages: "320+",
    version: "2025 Edition",
    downloadCount: "2,400",
    featured: true,
    image: federalAIHandbookImg,
    keywords: "federal AI security handbook, government cybersecurity compliance, FISMA AI implementation, FedRAMP certification guide, federal security frameworks",
    studyGuides: [
      "Federal AI Compliance Master Guide",
      "Government Security Assessment Toolkit",
      "Inter-Agency Coordination Framework"
    ]
  },
  {
    title: "University AI Security Handbook: Balancing Academic Freedom with Comprehensive Protection",
    description: "Academic-focused 275-page handbook addressing unique higher education challenges. Research protection, collaborative security, campus-wide implementation, and academic freedom preservation strategies.",
    fullDescription: "This specialized handbook addresses the complex security challenges faced by universities implementing AI systems. Content includes academic-specific threat assessment and research vulnerability analysis, collaborative security frameworks that preserve academic freedom, research data protection and intellectual property safeguards, campus-wide deployment strategies for diverse academic environments, and student privacy protection with FERPA compliance. Features university case studies, policy templates, implementation roadmaps, and stakeholder engagement strategies.",
    sector: "higher-ed",
    pages: "275+",
    version: "2025 Edition",
    downloadCount: "1,800",
    featured: true,
    image: universityAIHandbookImg,
    keywords: "university AI security handbook, academic cybersecurity, research protection strategies, campus security implementation, higher education AI safety",
    studyGuides: [
      "Academic Security Policy Template Library",
      "Research Data Protection Framework",
      "Campus Deployment Strategy Guide"
    ]
  },
  {
    title: "K-12 AI Security Handbook: Comprehensive Student Safety and Educational Technology Protection",
    description: "Essential 185-page handbook for K-12 administrators and technology leaders. Age-appropriate security measures, student safety protocols, classroom technology protection, and parental engagement strategies.",
    fullDescription: "This comprehensive handbook provides K-12 educational leaders with complete AI security and student safety strategies. Content includes school-specific threat assessment and age-appropriate security measures, student safety protocols and privacy protection frameworks, classroom technology security and educational AI safeguards, parent and community engagement strategies for security awareness, and compliance with COPPA, FERPA, and state educational privacy regulations. Features implementation guides, safety checklists, communication templates, and district-wide deployment strategies.",
    sector: "k12",
    pages: "185+",
    version: "2025 Edition",
    downloadCount: "3,200",
    featured: true,
    image: k12AIHandbookImg,
    keywords: "K-12 AI security handbook, student safety protection, school cybersecurity, educational technology security, classroom AI safety",
    studyGuides: [
      "K-12 Security Implementation Checklist",
      "Student Safety Protocol Framework",
      "District-Wide Deployment Guide"
    ]
  },
  {
    title: "AI Security Field Guide: Advanced Practical Approaches for Security Professionals",
    description: "Hands-on 350-page reference for cybersecurity practitioners across all sectors. Practical implementation techniques, troubleshooting guides, real-world scenarios, and expert recommendations.",
    fullDescription: "This practical field guide provides cybersecurity professionals with hands-on approaches to AI security implementation and management. Content includes step-by-step implementation procedures and troubleshooting guides, real-world scenario analysis and response strategies, tool comparisons and expert recommendations, sector-specific adaptation strategies for government and education, and advanced techniques for complex security challenges. Features practical exercises, implementation templates, decision trees, and expert interviews from seasoned AI security practitioners.",
    sector: "general",
    pages: "350+",
    version: "2025 Edition",
    downloadCount: "4,600",
    featured: true,
    image: aiFieldGuideImg,
    keywords: "AI security field guide, practical AI protection, cybersecurity implementation, AI security troubleshooting, hands-on security strategies",
    studyGuides: [
      "Practical Implementation Toolkit",
      "Troubleshooting and Resolution Guide",
      "Advanced Techniques Reference"
    ]
  }
];

export default function Handbooks() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSectors, setSelectedSectors] = useState<string[]>([]);

  const sectorNames = ["Federal Government", "Higher Education", "K-12 Education", "General"];

  const filteredHandbooks = handbooks.filter(handbook => {
    const matchesSearch = handbook.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         handbook.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSector = selectedSectors.length === 0 || selectedSectors.some(sector => {
      if (sector === "Federal Government") return handbook.sector === "federal";
      if (sector === "Higher Education") return handbook.sector === "higher-ed";
      if (sector === "K-12 Education") return handbook.sector === "k12";
      if (sector === "General") return handbook.sector === "general";
      return false;
    });
    return matchesSearch && matchesSector;
  });

  const handleSectorChange = (sector: string, checked: boolean) => {
    if (checked) {
      setSelectedSectors([...selectedSectors, sector]);
    } else {
      setSelectedSectors(selectedSectors.filter(s => s !== sector));
    }
  };

  const featuredHandbooks = handbooks.filter(handbook => handbook.featured);

  const HandbookCard = ({ handbook }: { handbook: any }) => (
    <Card className="bg-gray-800 border-gray-700 hover:border-cyan-500/50 transition-all duration-200 group">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-white group-hover:text-cyan-400 transition-colors text-lg">
              {handbook.title}
            </CardTitle>
            <CardDescription className="text-gray-300 mt-2">
              {handbook.description}
            </CardDescription>
          </div>
          <Badge variant="outline" className="ml-4 text-cyan-400 border-cyan-400">
            Handbook
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-4 text-sm text-gray-400">
          <div className="flex items-center">
            <FileText className="w-4 h-4 mr-1" />
            {handbook.pages}
          </div>
          <div className="flex items-center">
            <Download className="w-4 h-4 mr-1" />
            {handbook.downloadCount} downloads
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <Badge 
            variant="outline" 
            className={`
              ${handbook.sector === 'federal' ? 'text-blue-400 border-blue-400' : ''}
              ${handbook.sector === 'higher-ed' ? 'text-green-400 border-green-400' : ''}
              ${handbook.sector === 'k12' ? 'text-yellow-400 border-yellow-400' : ''}
              ${handbook.sector === 'general' ? 'text-purple-400 border-purple-400' : ''}
            `}
          >
            {handbook.version}
          </Badge>
          <Button 
            size="sm" 
            variant="outline" 
            className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-black min-w-[100px] flex items-center justify-center"
            onClick={() => {
              const slug = handbook.title.toLowerCase().replace(/[^a-z0-9\s]/gi, '').replace(/\s+/g, '-');
              window.open(`/marketing/documents/handbooks/${slug}.pdf`, '_blank');
            }}
            data-testid="button-download-handbook"
          >
            <Download className="w-4 h-4 mr-1" />
            Download
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-gray-900 via-blue-900/20 to-cyan-900/20 py-16">
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent"></div>
        <div className="relative container mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            Security Handbooks
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl">
            Comprehensive guides and practical handbooks for AI security implementation
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Featured Handbooks */}
        {featuredHandbooks.length > 0 && (
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-8">Featured Handbooks</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredHandbooks.map((handbook, index) => (
                <Card key={index} className="bg-gray-800 border-gray-700 hover:border-cyan-500/50 transition-all duration-200 group">
                  <div className="aspect-video bg-gradient-to-br from-cyan-600/20 to-blue-600/20 rounded-t-lg overflow-hidden">
                    {handbook.image ? (
                      <img 
                        src={handbook.image} 
                        alt={handbook.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="text-cyan-400 text-6xl opacity-30">
                          <BookOpen />
                        </div>
                      </div>
                    )}
                  </div>
                  <CardHeader>
                    <Badge className="mb-2 bg-cyan-600 text-white w-fit">Featured</Badge>
                    <CardTitle className="text-white group-hover:text-cyan-400 transition-colors text-xl">
                      {handbook.title}
                    </CardTitle>
                    <CardDescription className="text-gray-300">
                      {handbook.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <Badge variant="outline" className="text-cyan-400 border-cyan-400">
                        {handbook.pages}
                      </Badge>
                      <Button 
                        className="bg-blue-600 hover:bg-blue-700 text-white border-0 min-w-[100px] flex items-center justify-center"
                        onClick={() => {
                          const slug = handbook.title.toLowerCase().replace(/[^a-z0-9\s]/gi, '').replace(/\s+/g, '-');
                          window.open(`/marketing/documents/handbooks/${slug}.pdf`, '_blank');
                        }}
                        data-testid="button-download-handbook-featured"
                      >
                        <Download className="w-4 h-4 mr-1" />
                        Download
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* All Handbooks Section */}
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-white mb-8">All Handbooks</h2>
          
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
                      placeholder="Search handbooks..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                    />
                  </div>

                  {/* Sectors */}
                  <div>
                    <h3 className="text-white font-medium mb-3">Sector</h3>
                    <div className="space-y-2">
                      {sectorNames.map((sector) => (
                        <div key={sector} className="flex items-center space-x-2">
                          <Checkbox
                            id={`sector-${sector}`}
                            checked={selectedSectors.includes(sector)}
                            onCheckedChange={(checked) => handleSectorChange(sector, checked as boolean)}
                            className="border-gray-600 data-[state=checked]:bg-cyan-600"
                          />
                          <label
                            htmlFor={`sector-${sector}`}
                            className="text-sm text-gray-300 cursor-pointer"
                          >
                            {sector}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Handbooks Grid */}
            <div className="lg:w-3/4">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-gray-400">
                  Showing {filteredHandbooks.length} of {handbooks.length} handbooks
                </p>
                <Badge variant="outline" className="text-cyan-400 border-cyan-400">
                  {filteredHandbooks.length} results
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredHandbooks.map((handbook, index) => (
                  <HandbookCard key={index} handbook={handbook} />
                ))}
              </div>

              {filteredHandbooks.length === 0 && (
                <div className="text-center py-16">
                  <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <div className="text-gray-400 text-lg mb-2">No handbooks found</div>
                  <div className="text-gray-500">Try adjusting your search or filter criteria</div>
                  <Button 
                    variant="outline" 
                    className="mt-4 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black"
                    onClick={() => {
                      setSearchTerm("");
                      setSelectedSectors([]);
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
    </div>
  );
}