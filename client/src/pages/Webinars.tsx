import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { MarketingLayout } from "@/components/MarketingLayout";
import { 
  Search,
  Video,
  Building,
  GraduationCap,
  School,
  Shield,
  Users,
  Play,
  Clock,
  Calendar,
  Eye,
  ExternalLink,
  Filter
} from "lucide-react";
import fedAIInfraWebinarImg from "@assets/generated_images/Federal_AI_Infrastructure_Webinar_73974936.jpg";
import campusAISecWebinarImg from "@assets/generated_images/Campus_AI_Security_Webinar_032ea4d4.jpg";
import k12ClassroomWebinarImg from "@assets/generated_images/K12_Digital_Classroom_Webinar_ccef445f.jpg";
import aiInfraHardeningWebinarImg from "@assets/generated_images/AI_Infrastructure_Hardening_Webinar_b8dbbc10.jpg";
import aiSecComplianceWebinarImg from "@assets/generated_images/AI_Security_Compliance_Webinar_ae1e454f.jpg";

const webinars = [
  // Federal Government Webinars
  {
    title: "Securing Federal AI Infrastructure: NIST Framework Implementation",
    description: "Comprehensive deep-dive into implementing NIST Cybersecurity Framework specifically for federal AI systems. Covers regulatory compliance walkthrough, federal case studies, and practical implementation roadmaps.",
    fullDescription: "This webinar provides federal IT professionals with actionable guidance on implementing the NIST Cybersecurity Framework for AI systems. Content includes detailed compliance walkthroughs mapped to federal requirements, real-world case studies from successful federal implementations, hands-on demonstration of security assessment tools, and Q&A sessions addressing common federal implementation challenges. Learn how agencies achieve 47% reduction in security incidents while maintaining full regulatory compliance.",
    sector: "federal",
    duration: "60 min",
    attendees: "1,200+",
    presenter: "Dr. Sarah Mitchell, Federal CISO",
    airDate: "2025-01-15",
    status: "on-demand",
    views: "3,400",
    featured: true,
    image: fedAIInfraWebinarImg,
    keywords: "federal AI security, NIST framework implementation, government cybersecurity compliance, federal security assessment tools, AI regulatory compliance",
    studyGuides: [
      "Federal AI Security Implementation Checklist",
      "NIST Framework Mapping for Government AI Systems",
      "Federal Compliance Quick Reference Guide"
    ]
  },
  {
    title: "National Security AI Protection: Advanced Threat Response",
    description: "Specialized training for protecting classified and sensitive AI systems against nation-state threats. Advanced threat detection, response protocols, and security clearance considerations.",
    fullDescription: "This advanced webinar covers sophisticated threats targeting federal AI systems, with focus on nation-state actors and advanced persistent threats. Content includes threat intelligence specific to AI-targeting attacks, classified data handling procedures for AI systems, multi-level security protocols and compartmentalization, and coordinated response strategies across agencies. Ideal for federal security professionals with appropriate clearance levels.",
    sector: "federal",
    duration: "75 min",
    attendees: "650+",
    presenter: "Colonel James Harrison, NSA Cybersecurity Director",
    airDate: "2025-01-25",
    status: "on-demand",
    views: "1,800",
    featured: true,
    image: aiInfraHardeningWebinarImg,
    keywords: "national security AI protection, classified AI systems security, nation-state threat response, federal AI threat intelligence, advanced AI security protocols",
    studyGuides: [
      "Classified AI Security Protocols Guide",
      "Nation-State Threat Intelligence Briefing",
      "Advanced AI Security Response Playbook"
    ]
  },
  {
    title: "Cross-Agency AI Security Coordination",
    description: "Strategies for unified AI security across federal agencies. Inter-agency collaboration frameworks, shared threat intelligence, and coordinated incident response.",
    fullDescription: "Learn how federal agencies coordinate AI security efforts across organizational boundaries. This webinar covers establishing inter-agency security protocols, implementing shared threat intelligence platforms, coordinating incident response across agencies, and standardizing security practices while maintaining agency autonomy. Includes case studies from successful multi-agency security initiatives.",
    sector: "federal",
    duration: "45 min",
    attendees: "890+",
    presenter: "Maria Santos, DHS Cybersecurity Coordinator",
    airDate: "2025-01-30",
    status: "on-demand",
    views: "2,100",
    featured: false,
    image: aiSecComplianceWebinarImg,
    keywords: "cross-agency AI security, federal inter-agency coordination, government security collaboration, unified federal AI protection, multi-agency threat response",
    studyGuides: [
      "Inter-Agency Security Coordination Framework",
      "Federal AI Security Standards Guide",
      "Cross-Agency Communication Protocols"
    ]
  },
  // Higher Education Webinars
  {
    title: "Campus-Wide AI Security: Protecting University Research Assets",
    description: "Comprehensive guide to securing academic AI systems while maintaining research collaboration and academic freedom. Research data protection strategies and campus-wide implementation.",
    fullDescription: "This webinar addresses the unique security challenges faced by higher education institutions implementing AI systems. Content includes academic threat models and research-specific vulnerabilities, research data protection strategies and intellectual property safeguards, collaborative security frameworks that preserve academic freedom, and campus-wide deployment strategies for diverse academic environments. Learn how universities achieve 92% improvement in unauthorized access detection.",
    sector: "higher-ed",
    duration: "45 min",
    attendees: "800+",
    presenter: "Prof. Michael Chen, University CIO",
    airDate: "2025-01-18",
    status: "on-demand",
    views: "1,600",
    featured: true,
    image: campusAISecWebinarImg,
    keywords: "campus AI security, university research protection, academic cybersecurity, higher education AI implementation, research data security",
    studyGuides: [
      "Campus AI Security Implementation Guide",
      "Academic Research Protection Framework",
      "University AI Policy Templates"
    ]
  },
  {
    title: "Higher Education AI Security Pilot Programs",
    description: "Designing and implementing AI security pilot programs in academic environments. Pilot design, metrics collection, evaluation frameworks, and scaling strategies.",
    fullDescription: "Learn how to design effective AI security pilot programs tailored for higher education environments. This webinar covers pilot program design principles for academic settings, metrics and evaluation frameworks for educational contexts, stakeholder engagement across diverse academic departments, and strategies for scaling successful pilots campus-wide. Includes real examples from successful university security pilot implementations.",
    sector: "higher-ed",
    duration: "55 min",
    attendees: "720+",
    presenter: "Dr. Lisa Park, Academic Security Researcher",
    airDate: "2025-02-05",
    status: "on-demand",
    views: "1,450",
    featured: false,
    image: fedAIInfraWebinarImg,
    keywords: "higher education security pilots, academic AI testing, university security trials, educational pilot programs, campus security experiments",
    studyGuides: [
      "Academic Security Pilot Design Template",
      "Higher Education Metrics Framework",
      "University Pilot Evaluation Toolkit"
    ]
  },
  // K-12 Education Webinars
  {
    title: "Protecting Digital Classrooms: K-12 AI Security Fundamentals",
    description: "Essential security training for K-12 educational technology leaders. Student safety measures, age-appropriate protections, and classroom technology security.",
    fullDescription: "This webinar provides K-12 administrators and IT staff with comprehensive guidance on securing AI systems in educational environments. Content includes school-specific threats and age-appropriate security measures, student safety protocols and privacy protection strategies, classroom technology security and teacher training programs, and parent engagement and communication strategies. Learn practical approaches to maintaining educational effectiveness while ensuring student safety.",
    sector: "k12",
    duration: "45 min",
    attendees: "950+",
    presenter: "Jennifer Adams, K-12 Security Expert",
    airDate: "2025-01-20",
    status: "on-demand",
    views: "2,100",
    featured: true,
    image: k12ClassroomWebinarImg,
    keywords: "K-12 AI security, student safety digital classroom, school cybersecurity, educational technology protection, classroom AI safety",
    studyGuides: [
      "K-12 AI Security Essentials Checklist",
      "Student Safety Protocol Guide",
      "Classroom Technology Security Framework"
    ]
  },
  // General Webinars
  {
    title: "From Vulnerability to Security: Hardening Your AI Infrastructure",
    description: "Comprehensive infrastructure hardening strategies for AI systems. Vulnerability assessment, remediation techniques, and ongoing security maintenance.",
    fullDescription: "This technical webinar provides IT professionals with advanced techniques for securing AI infrastructure across any organization type. Content includes comprehensive vulnerability assessment methodologies, prioritized remediation strategies based on risk levels, infrastructure hardening techniques specific to AI workloads, and continuous monitoring and maintenance protocols. Suitable for technical audiences across government and education sectors.",
    sector: "general",
    duration: "60 min",
    attendees: "1,800+",
    presenter: "Alex Thompson, Security Architect",
    airDate: "2025-01-22",
    status: "on-demand",
    views: "2,800",
    featured: true,
    image: aiInfraHardeningWebinarImg,
    keywords: "AI infrastructure hardening, vulnerability assessment AI systems, AI security architecture, infrastructure security best practices, AI system protection",
    studyGuides: [
      "AI Infrastructure Security Assessment Guide",
      "Vulnerability Remediation Priority Matrix",
      "AI Hardening Best Practices Checklist"
    ]
  },
  {
    title: "AI Security Compliance: Meeting New Regulatory Requirements in 2025",
    description: "Navigate the complex regulatory landscape for AI security. Updated compliance requirements, implementation timelines, and practical guidance.",
    fullDescription: "Stay ahead of evolving AI security regulations with this comprehensive compliance webinar. Content includes detailed overview of 2025 regulatory changes affecting AI systems, compliance checklist and implementation timeline guidance, sector-specific requirements for government and education, and practical strategies for maintaining ongoing compliance. Essential for compliance officers and security leaders across all sectors.",
    sector: "general",
    duration: "50 min",
    attendees: "1,500+",
    presenter: "Dr. Lisa Rodriguez, Compliance Director",
    airDate: "2025-01-12",
    status: "on-demand",
    views: "2,400",
    featured: true,
    image: aiSecComplianceWebinarImg,
    keywords: "AI security compliance 2025, regulatory requirements AI, compliance implementation timeline, AI governance frameworks, security regulation updates",
    studyGuides: [
      "2025 AI Compliance Requirements Guide",
      "Regulatory Implementation Timeline",
      "AI Compliance Self-Assessment Tool"
    ]
  }
];

export default function Webinars() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSectors, setSelectedSectors] = useState<string[]>([]);

  const sectorNames = ["Federal Government", "Higher Education", "K-12 Education", "General"];

  const filteredWebinars = webinars.filter(webinar => {
    const matchesSearch = webinar.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         webinar.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSector = selectedSectors.length === 0 || selectedSectors.some(sector => {
      if (sector === "Federal Government") return webinar.sector === "federal";
      if (sector === "Higher Education") return webinar.sector === "higher-ed";
      if (sector === "K-12 Education") return webinar.sector === "k12";
      if (sector === "General") return webinar.sector === "general";
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

  const featuredWebinars = webinars.filter(webinar => webinar.featured);

  const WebinarCard = ({ webinar }: { webinar: any }) => (
    <Card className="bg-gray-800 border-gray-700 hover:border-cyan-500/50 transition-all duration-200 group">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-white group-hover:text-cyan-400 transition-colors text-lg">
              {webinar.title}
            </CardTitle>
            <CardDescription className="text-gray-300 mt-2">
              {webinar.description}
            </CardDescription>
          </div>
          <Badge variant="outline" className="ml-4 text-cyan-400 border-cyan-400">
            Webinar
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-4 text-sm text-gray-400">
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            {webinar.duration}
          </div>
          <div className="flex items-center">
            <Users className="w-4 h-4 mr-1" />
            {webinar.attendees}
          </div>
          <div className="flex items-center">
            <Eye className="w-4 h-4 mr-1" />
            {webinar.views} views
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <Badge 
            variant="outline" 
            className={`
              ${webinar.sector === 'federal' ? 'text-blue-400 border-blue-400' : ''}
              ${webinar.sector === 'higher-ed' ? 'text-green-400 border-green-400' : ''}
              ${webinar.sector === 'k12' ? 'text-yellow-400 border-yellow-400' : ''}
              ${webinar.sector === 'general' ? 'text-purple-400 border-purple-400' : ''}
            `}
          >
            {webinar.status === 'on-demand' ? 'On-Demand' : 'Live'}
          </Badge>
          <Button 
            size="sm" 
            variant="outline" 
            className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-black min-w-[110px] flex items-center justify-center"
            onClick={() => {
              const slug = webinar.title.toLowerCase().replace(/[^a-z0-9\s]/gi, '').replace(/\s+/g, '-');
              window.location.href = `/marketing/webinars/${slug}`;
            }}
            data-testid="button-watch-webinar"
          >
            <Play className="w-4 h-4 mr-1" />
            Watch Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <MarketingLayout>
      <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-gray-900 via-blue-900/20 to-cyan-900/20 py-16">
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent"></div>
        <div className="relative container mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            Security Webinars
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl">
            Expert-led webinars on AI security, compliance, and best practices
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Featured Webinars */}
        {featuredWebinars.length > 0 && (
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-8">Featured Webinars</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredWebinars.map((webinar, index) => (
                <Card key={index} className="bg-gray-800 border-gray-700 hover:border-cyan-500/50 transition-all duration-200 group">
                  <div className="aspect-video bg-gradient-to-br from-cyan-600/20 to-blue-600/20 rounded-t-lg overflow-hidden">
                    {webinar.image ? (
                      <img 
                        src={webinar.image} 
                        alt={webinar.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="text-cyan-400 text-6xl opacity-30">
                          <Video />
                        </div>
                      </div>
                    )}
                  </div>
                  <CardHeader>
                    <Badge className="mb-2 bg-cyan-600 text-white w-fit">Featured</Badge>
                    <CardTitle className="text-white group-hover:text-cyan-400 transition-colors text-xl">
                      {webinar.title}
                    </CardTitle>
                    <CardDescription className="text-gray-300">
                      {webinar.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <Badge variant="outline" className="text-cyan-400 border-cyan-400">
                        {webinar.duration}
                      </Badge>
                      <Button 
                        className="bg-cyan-600 hover:bg-cyan-700 text-white"
                        onClick={() => window.open(`/marketing/webinars/${webinar.title.toLowerCase().replace(/[^a-z0-9\s]/gi, '').replace(/\s+/g, '-')}`, '_blank')}
                      >
                        <Play className="w-4 h-4 mr-1" />
                        Watch Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* All Webinars Section */}
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-white mb-8">All Webinars</h2>
          
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
                      placeholder="Search webinars..."
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

            {/* Webinars Grid */}
            <div className="lg:w-3/4">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-gray-400">
                  Showing {filteredWebinars.length} of {webinars.length} webinars
                </p>
                <Badge variant="outline" className="text-cyan-400 border-cyan-400">
                  {filteredWebinars.length} results
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredWebinars.map((webinar, index) => (
                  <WebinarCard key={index} webinar={webinar} />
                ))}
              </div>

              {filteredWebinars.length === 0 && (
                <div className="text-center py-16">
                  <Video className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <div className="text-gray-400 text-lg mb-2">No webinars found</div>
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
    </MarketingLayout>
  );
}