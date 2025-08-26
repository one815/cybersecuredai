import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  BookOpen, 
  FileText, 
  Video, 
  Headphones, 
  Download,
  Search,
  Shield,
  GraduationCap,
  Building,
  School,
  Users,
  Star,
  Clock,
  ExternalLink
} from "lucide-react";

const sectors = [
  { id: "all", name: "All Sectors", icon: Users },
  { id: "federal", name: "Federal Government", icon: Building },
  { id: "higher-ed", name: "Higher Education", icon: GraduationCap },
  { id: "k12", name: "K-12 Education", icon: School },
  { id: "general", name: "General", icon: Shield }
];

const contentTypes = [
  { id: "courses", name: "Courses", icon: GraduationCap, color: "bg-blue-500" },
  { id: "blogs", name: "Blog Posts", icon: FileText, color: "bg-green-500" },
  { id: "handbooks", name: "Handbooks", icon: BookOpen, color: "bg-purple-500" },
  { id: "whitepapers", name: "White Papers", icon: FileText, color: "bg-orange-500" },
  { id: "datasheets", name: "Datasheets", icon: FileText, color: "bg-cyan-500" },
  { id: "webinars", name: "Webinars", icon: Video, color: "bg-red-500" },
  { id: "podcasts", name: "Podcasts", icon: Headphones, color: "bg-pink-500" },
  { id: "use-cases", name: "Use Cases", icon: Star, color: "bg-yellow-500" },
  { id: "ebooks", name: "Ebooks", icon: BookOpen, color: "bg-indigo-500" },
  { id: "success-kits", name: "Success Kits", icon: Download, color: "bg-teal-500" }
];

const resourceData = {
  courses: [
    // Federal Government Courses
    {
      title: "Federal AI Security Fundamentals",
      sector: "federal",
      description: "Government-specific threats, FISMA compliance, and federal security frameworks",
      tags: ["federal security training", "government AI protection", "FISMA compliance"],
      duration: "8 hours",
      level: "Intermediate"
    },
    {
      title: "Securing Classified AI Systems",
      sector: "federal", 
      description: "Compartmentalized security, clearance-level access controls, and sensitive data handling",
      tags: ["classified AI security", "government clearance", "sensitive data protection"],
      duration: "12 hours",
      level: "Advanced"
    },
    {
      title: "Cross-Agency Threat Response",
      sector: "federal",
      description: "Collaborative incident management, unified security operations, and inter-agency coordination",
      tags: ["agency collaboration", "government incident response", "cross-agency security"],
      duration: "10 hours",
      level: "Advanced"
    },
    // Higher Education Courses
    {
      title: "University Research Security",
      sector: "higher-ed",
      description: "Academic-specific threats, research data protection, and scholarly integrity safeguards",
      tags: ["research security", "academic protection", "university cybersecurity"],
      duration: "6 hours",
      level: "Intermediate"
    },
    {
      title: "Campus AI Security Implementation",
      sector: "higher-ed",
      description: "Multi-department deployment, student privacy considerations, and campus-wide coordination",
      tags: ["campus security", "university implementation", "education protection"],
      duration: "8 hours",
      level: "Intermediate"
    },
    {
      title: "Higher Education Security Pilot Design",
      sector: "higher-ed",
      description: "Experimental security frameworks, metrics collection, and academic pilot assessment",
      tags: ["education pilots", "academic security testing", "university trials"],
      duration: "6 hours",
      level: "Advanced"
    },
    // K-12 Education Courses
    {
      title: "K-12 AI Security Essentials",
      sector: "k12",
      description: "Age-appropriate protections, educational technology security, and student safety frameworks",
      tags: ["school security", "K-12 protection", "student safety"],
      duration: "4 hours",
      level: "Beginner"
    },
    {
      title: "District Security Operations",
      sector: "k12",
      description: "Centralized management, multi-school coordination, and resource optimization",
      tags: ["school district security", "K-12 operations", "educational administration"],
      duration: "6 hours",
      level: "Intermediate"
    },
    {
      title: "Protecting Student AI Interactions",
      sector: "k12",
      description: "Classroom AI tools, student data safeguards, and appropriate security levels",
      tags: ["student interaction security", "classroom AI", "educational data protection"],
      duration: "5 hours",
      level: "Intermediate"
    },
    // General Courses
    {
      title: "Certified AI Security Professional",
      sector: "general",
      description: "Foundational concepts, threat modeling, secure coding practices, and hands-on labs",
      tags: ["security certification", "professional training", "AI security skills"],
      duration: "40 hours",
      level: "Advanced"
    },
    {
      title: "AI Incident Response and Forensics",
      sector: "general",
      description: "Detection techniques, containment strategies, and post-incident analysis",
      tags: ["incident response", "security forensics", "breach containment"],
      duration: "16 hours",
      level: "Advanced"
    },
    {
      title: "Secure AI Architecture and Design",
      sector: "general",
      description: "Design principles, security patterns, and architecture evaluation",
      tags: ["security architecture", "design principles", "secure structures"],
      duration: "12 hours",
      level: "Advanced"
    }
  ],
  blogs: [
    // General Blog Posts
    {
      title: "The Intersection of AI and Cybersecurity: Protecting Digital Assets in 2025",
      sector: "general",
      description: "Comprehensive analysis of AI's role in modern cybersecurity landscapes",
      tags: ["AI cybersecurity", "digital asset protection", "2025 cybersecurity trends"],
      readTime: "8 min",
      author: "Security Research Team"
    },
    {
      title: "Zero-Day Vulnerabilities in AI Systems: Detection and Prevention Strategies",
      sector: "general",
      description: "Latest techniques for identifying and mitigating zero-day threats in AI",
      tags: ["zero-day vulnerabilities", "AI system security", "vulnerability detection"],
      readTime: "10 min",
      author: "Vulnerability Research Team"
    },
    {
      title: "The Dark Side of AI Automation: How Neglected Security Creates Business Vulnerabilities",
      sector: "general",
      description: "Analysis of security gaps in automated AI systems and their business impact",
      tags: ["AI automation risks", "business vulnerabilities", "security neglect"],
      readTime: "12 min",
      author: "Business Security Analysts"
    },
    // Federal Government Blog Posts
    {
      title: "Federal Zero Trust Implementation: AI-Powered Security Across Agency Boundaries",
      sector: "federal",
      description: "How federal agencies implement zero trust with AI enhancement",
      tags: ["federal zero trust", "government AI security", "cross-agency protection"],
      readTime: "12 min",
      author: "Federal Security Experts"
    },
    {
      title: "CMMC 3.0 Compliance Through AI: How Federal Contractors Are Meeting New Standards",
      sector: "federal",
      description: "Real-world implementation of CMMC 3.0 using AI-powered compliance tools",
      tags: ["CMMC 3.0", "federal contractor security", "AI compliance tools"],
      readTime: "15 min",
      author: "Compliance Specialists"
    },
    // Higher Education Blog Posts
    {
      title: "Campus-Wide AI Security: Results from Three University Pilot Programs",
      sector: "higher-ed",
      description: "Real-world results from university AI security implementations",
      tags: ["university security pilots", "campus AI protection", "higher education security"],
      readTime: "10 min",
      author: "Academic Security Team"
    },
    {
      title: "Research Security in Academia: Protecting AI Innovation Without Hampering Collaboration",
      sector: "higher-ed",
      description: "Balancing security needs with academic freedom and collaboration",
      tags: ["research security", "academic innovation protection", "collaborative security"],
      readTime: "14 min",
      author: "Research Security Experts"
    },
    // K-12 Blog Posts
    {
      title: "Digital Classroom Protection: AI Security Solutions for K-12 Learning Environments",
      sector: "k12",
      description: "Practical security implementations for modern digital classrooms",
      tags: ["digital classroom security", "K-12 cybersecurity", "education protection"],
      readTime: "8 min",
      author: "Educational Security Team"
    },
    {
      title: "Teaching Cybersecurity Through AI: How K-12 Schools Are Building Security-Aware Digital Citizens",
      sector: "k12",
      description: "Innovative approaches to cybersecurity education in schools",
      tags: ["cybersecurity education", "K-12 security awareness", "digital citizenship"],
      readTime: "11 min",
      author: "Education Technology Team"
    }
  ],
  handbooks: [
    // Federal Government Handbooks
    {
      title: "Federal AI Security Handbook: Compliance, Protection, and Response",
      sector: "federal",
      description: "Comprehensive guide for government AI security implementation",
      tags: ["federal security guidance", "government AI handbook", "compliance frameworks"],
      pages: "250+",
      version: "2025 Edition"
    },
    {
      title: "Municipal and State Government AI Security Handbook",
      sector: "federal",
      description: "Practical approaches for local authorities and state governments",
      tags: ["state government security", "local authority protection", "municipal AI systems"],
      pages: "180+",
      version: "2025 Edition"
    },
    // Higher Education Handbooks
    {
      title: "University AI Security Handbook: Balancing Academic Freedom with Protection",
      sector: "higher-ed",
      description: "Academic-focused security strategies and implementation guides",
      tags: ["academic security", "university protection", "research security"],
      pages: "180+",
      version: "2025 Edition"
    },
    {
      title: "AI Security Pilot Program Handbook",
      sector: "higher-ed",
      description: "Design, implementation and assessment in academic settings",
      tags: ["pilot program design", "academic security testing", "university trials"],
      pages: "150+",
      version: "2025 Edition"
    },
    // K-12 Education Handbooks
    {
      title: "K-12 AI Security Handbook: Safeguarding Educational Technology",
      sector: "k12",
      description: "Student data protection and educational technology security",
      tags: ["student data protection", "educational technology security", "school cybersecurity"],
      pages: "120+",
      version: "2025 Edition"
    },
    {
      title: "School District AI Security Handbook",
      sector: "k12",
      description: "Centralized management for multiple campuses and district-wide coordination",
      tags: ["district security management", "multi-school protection", "educational administration"],
      pages: "140+",
      version: "2025 Edition"
    },
    // General Handbooks
    {
      title: "The Definitive AI Security Handbook",
      sector: "general",
      description: "Strategies, tools, and techniques for protecting intelligent systems",
      tags: ["comprehensive handbook", "security strategies", "protection techniques"],
      pages: "300+",
      version: "2025 Edition"
    },
    {
      title: "AI Security Field Guide: Practical Approaches for Security Professionals",
      sector: "general",
      description: "Hands-on reference for cybersecurity practitioners",
      tags: ["field guide", "practical security", "professional reference"],
      pages: "220+",
      version: "2025 Edition"
    }
  ],
  whitepapers: [
    {
      title: "Quantifying AI Security ROI: Metrics and Measurement Frameworks",
      sector: "general",
      description: "Comprehensive framework for measuring and demonstrating AI security value",
      tags: ["security ROI", "AI metrics", "enterprise security measurement"],
      pages: "45",
      downloadType: "PDF"
    },
    {
      title: "Privacy-Preserving AI: Implementing Federated Learning in High-Security Environments",
      sector: "general",
      description: "Technical implementation guide for secure federated learning systems",
      tags: ["privacy-preserving AI", "federated learning", "secure environments"],
      pages: "38",
      downloadType: "PDF"
    },
    {
      title: "Securing Government AI Infrastructure: Federal Compliance Frameworks",
      sector: "federal",
      description: "Detailed analysis of federal AI security requirements and implementation strategies",
      tags: ["federal AI compliance", "government security frameworks", "regulatory implementation"],
      pages: "52",
      downloadType: "PDF"
    },
    {
      title: "Securing Academic Research AI: Protection Strategies for University Environments",
      sector: "higher-ed",
      description: "Comprehensive security framework for protecting research AI systems",
      tags: ["academic research security", "university AI protection", "research data safeguards"],
      pages: "41",
      downloadType: "PDF"
    },
    {
      title: "K-12 AI Security Implementation Guide: Safeguarding Educational Technology",
      sector: "k12",
      description: "Practical implementation guide for K-12 AI security systems",
      tags: ["school technology security", "K-12 implementation", "educational AI protection"],
      pages: "35",
      downloadType: "PDF"
    }
  ],
  datasheets: [
    {
      title: "Federal Zero-Trust Architecture Implementation",
      sector: "federal",
      description: "Technical specifications and deployment guide for federal zero-trust systems",
      tags: ["federal zero trust", "government security architecture", "secure federal networks"],
      specifications: "Technical specs",
      compatibility: "FedRAMP Certified"
    },
    {
      title: "University Research Data Protection System",
      sector: "higher-ed",
      description: "Technical architecture and security features for research data protection",
      tags: ["research data security", "university protection systems", "academic data safeguards"],
      specifications: "Technical specs",
      compatibility: "FERPA Compliant"
    },
    {
      title: "K-12 District-Wide Security Platform",
      sector: "k12",
      description: "Technical components and integration options for school district security",
      tags: ["school district security", "K-12 protection systems", "educational security infrastructure"],
      specifications: "Technical specs",
      compatibility: "COPPA Compliant"
    },
    {
      title: "CyberSecure AI Platform: Technical Specifications",
      sector: "general",
      description: "Complete technical specifications and security capabilities overview",
      tags: ["AI platform specs", "security capabilities", "technical specifications"],
      specifications: "Comprehensive specs",
      compatibility: "Multi-platform"
    },
    {
      title: "AI Threat Detection Engine: Performance Metrics",
      sector: "general",
      description: "Performance benchmarks and integration options for threat detection",
      tags: ["threat detection", "AI engine performance", "security integration"],
      specifications: "Performance metrics",
      compatibility: "API Integration"
    }
  ],
  webinars: [
    // Federal Government Webinars
    {
      title: "Securing Federal AI Infrastructure: NIST Framework Implementation",
      sector: "federal",
      description: "Regulatory compliance walkthrough and federal case studies",
      tags: ["federal AI security", "NIST framework", "government cybersecurity"],
      duration: "60 min",
      attendees: "1,200+"
    },
    {
      title: "Classified AI Systems: Security Protocols for Federal Agencies",
      sector: "federal",
      description: "Clearance-appropriate security measures and sensitive data handling",
      tags: ["classified AI protection", "federal security protocols", "government data security"],
      duration: "75 min",
      attendees: "850+"
    },
    // Higher Education Webinars
    {
      title: "Campus-Wide AI Security: Protecting University Research Assets",
      sector: "higher-ed",
      description: "Academic threat models and research protection strategies",
      tags: ["university cybersecurity", "research protection", "academic security"],
      duration: "45 min",
      attendees: "800+"
    },
    {
      title: "Student Data Protection: AI Security for Higher Education",
      sector: "higher-ed",
      description: "Privacy regulations and student information safeguards",
      tags: ["student data security", "education privacy", "university compliance"],
      duration: "50 min",
      attendees: "650+"
    },
    // K-12 Education Webinars
    {
      title: "Protecting Digital Classrooms: K-12 AI Security Fundamentals",
      sector: "k12",
      description: "School-specific threats and student safety measures",
      tags: ["digital classroom security", "school cybersecurity", "K-12 protection"],
      duration: "45 min",
      attendees: "950+"
    },
    {
      title: "District-Wide Security Implementation: Results from 500-School Pilot",
      sector: "k12",
      description: "Large-scale deployment strategies and measured outcomes",
      tags: ["school district security", "large-scale implementation", "education security results"],
      duration: "55 min",
      attendees: "1,100+"
    },
    // General Webinars
    {
      title: "From Vulnerability to Security: Hardening Your AI Infrastructure",
      sector: "general",
      description: "Comprehensive infrastructure hardening and vulnerability remediation",
      tags: ["AI infrastructure hardening", "vulnerability remediation", "security strengthening"],
      duration: "60 min",
      attendees: "1,800+"
    },
    {
      title: "AI Security Compliance: Meeting New Regulatory Requirements in 2025",
      sector: "general",
      description: "Regulatory overview, compliance checklist, and implementation timeline",
      tags: ["2025 regulations", "compliance requirements", "regulatory preparation"],
      duration: "50 min",
      attendees: "1,500+"
    }
  ],
  podcasts: [
    // Higher Education Podcasts
    {
      title: "Securing University Research Data",
      sector: "higher-ed",
      description: "Protecting sensitive research data at higher education institutions",
      tags: ["research data security", "university protection", "academic cybersecurity"],
      duration: "30 min",
      episode: "#1"
    },
    {
      title: "AI Ethics in Higher Education",
      sector: "higher-ed",
      description: "Panel discussion examining ethical considerations of AI implementation on campus",
      tags: ["AI ethics", "higher education", "campus AI deployment"],
      duration: "30 min",
      episode: "#2"
    },
    // K-12 Education Podcasts
    {
      title: "Cybersecurity Fundamentals for K-12 IT Administrators",
      sector: "k12",
      description: "Educational episode for school district IT teams",
      tags: ["K-12 cybersecurity", "school IT", "educational security"],
      duration: "30 min",
      episode: "#3"
    },
    {
      title: "Protecting Student Data in the Age of EdTech",
      sector: "k12",
      description: "Intersection of educational technology, student privacy, and security",
      tags: ["student data protection", "EdTech security", "privacy compliance"],
      duration: "30 min",
      episode: "#4"
    },
    // Federal Government Podcasts
    {
      title: "Zero Trust Architecture in Federal Agencies",
      sector: "federal",
      description: "Implementation strategies for zero trust security models",
      tags: ["federal zero trust", "government security", "agency implementation"],
      duration: "30 min",
      episode: "#5"
    },
    {
      title: "AI-Powered Threat Intelligence for Federal Security Operations",
      sector: "federal",
      description: "How AI transforms federal cybersecurity operations",
      tags: ["federal threat intelligence", "AI security operations", "government protection"],
      duration: "35 min",
      episode: "#6"
    },
    // General Podcasts
    {
      title: "AI Security Myths Debunked",
      sector: "general",
      description: "Separating AI security facts from fiction with expert panel",
      tags: ["AI myths", "security misconceptions", "expert insights"],
      duration: "30 min",
      episode: "#11"
    },
    {
      title: "The Human Factor in Cybersecurity",
      sector: "general",
      description: "Why technical solutions alone aren't enough - the psychology of security",
      tags: ["human factor security", "security awareness", "organizational culture"],
      duration: "30 min",
      episode: "#14"
    }
  ],
  "use-cases": [
    {
      title: "Federal Zero Trust Architecture Implementation",
      sector: "federal",
      description: "47% reduction in security incidents while ensuring AI systems remain secure and compliant",
      tags: ["zero trust", "federal compliance", "security incidents reduction"],
      results: "47% reduction in incidents",
      industry: "Federal Government"
    },
    {
      title: "Executive Order Compliance",
      sector: "federal",
      description: "Rapid adaptation to new White House executive orders on secure AI development",
      tags: ["executive orders", "federal compliance", "AI security mandates"],
      results: "100% compliance achieved",
      industry: "Federal Government"
    },
    {
      title: "Research Collaboration Security",
      sector: "higher-ed",
      description: "Shared security standards for multi-institution research projects",
      tags: ["research collaboration", "academic security", "intellectual property protection"],
      results: "Protected $50M+ in research",
      industry: "Higher Education"
    },
    {
      title: "Campus Access Control",
      sector: "higher-ed",
      description: "92% improvement in identifying unauthorized access attempts to campus AI systems",
      tags: ["campus security", "access control", "unauthorized access detection"],
      results: "92% improvement in detection",
      industry: "Higher Education"
    },
    {
      title: "School Security Assessment",
      sector: "k12",
      description: "Comprehensive evaluation and strengthening of AI protection measures for K-12 districts",
      tags: ["school security", "K-12 assessment", "protection measures"],
      results: "Enhanced security across 500+ schools",
      industry: "K-12 Education"
    },
    {
      title: "Technology Administrator Training",
      sector: "k12",
      description: "Mandated security training to meet state compliance requirements",
      tags: ["administrator training", "compliance requirements", "skill development"],
      results: "100% compliance achievement",
      industry: "K-12 Education"
    },
    {
      title: "Shadow AI Detection",
      sector: "general",
      description: "Identify and secure unauthorized AI deployments before they create vulnerabilities",
      tags: ["shadow AI", "unauthorized deployments", "vulnerability prevention"],
      results: "78% reduction in unauthorized AI",
      industry: "Cross-Industry"
    },
    {
      title: "Smart City Security",
      sector: "general",
      description: "Secure IoT and AI-powered smart city initiatives with specialized protection",
      tags: ["smart city", "IoT security", "urban infrastructure"],
      results: "Protected 50+ municipal systems",
      industry: "Municipal Government"
    }
  ],
  ebooks: [
    // Federal Government Ebooks
    {
      title: "Securing Federal AI Systems: Compliance Frameworks and Implementation Guidelines",
      sector: "federal",
      description: "Complete guide to federal AI security compliance and implementation",
      tags: ["federal AI security", "government compliance", "federal implementation"],
      pages: "180+",
      format: "Digital PDF"
    },
    {
      title: "Critical Infrastructure Protection: AI Security Strategies for Government Agencies",
      sector: "federal",
      description: "Advanced strategies for protecting critical infrastructure with AI",
      tags: ["critical infrastructure", "government protection", "agency security"],
      pages: "220+",
      format: "Digital PDF"
    },
    // Higher Education Ebooks
    {
      title: "Securing Academic Research: AI Protection Strategies for Higher Education",
      sector: "higher-ed",
      description: "Comprehensive protection strategies for academic research environments",
      tags: ["academic security", "research protection", "university cybersecurity"],
      pages: "160+",
      format: "Digital PDF"
    },
    {
      title: "Student Data Protection: AI Security Frameworks for Educational Institutions",
      sector: "higher-ed",
      description: "Privacy-focused security frameworks for protecting student information",
      tags: ["student data security", "educational privacy", "university data protection"],
      pages: "140+",
      format: "Digital PDF"
    },
    // K-12 Education Ebooks
    {
      title: "Protecting Digital Classrooms: K-12 AI Security Essentials",
      sector: "k12",
      description: "Essential security practices for modern digital learning environments",
      tags: ["classroom security", "school protection", "K-12 cybersecurity"],
      pages: "120+",
      format: "Digital PDF"
    },
    {
      title: "District-Wide Security Planning: AI Protection for K-12 School Systems",
      sector: "k12",
      description: "Comprehensive security planning for multi-school districts",
      tags: ["school district security", "K-12 planning", "educational system protection"],
      pages: "130+",
      format: "Digital PDF"
    },
    // General Ebooks
    {
      title: "The Complete Guide to AI Security: From Development to Deployment",
      sector: "general",
      description: "End-to-end security guidance for AI systems lifecycle",
      tags: ["comprehensive security", "AI development security", "deployment protection"],
      pages: "250+",
      format: "Digital PDF"
    },
    {
      title: "AI Security for Business Leaders: Strategic Planning and Risk Management",
      sector: "general",
      description: "Executive-focused guide to AI security strategy and risk management",
      tags: ["executive security", "business risk management", "strategic security planning"],
      pages: "200+",
      format: "Digital PDF"
    }
  ],
  "success-kits": [
    // Federal Government Success Kits
    {
      title: "Federal AI Security Compliance Kit",
      sector: "federal",
      description: "FISMA compliance templates, FedRAMP certification guidance, and assessment tools",
      tags: ["federal compliance", "government security", "FISMA tools"],
      includes: "Templates, guides, assessment tools",
      deliveryTime: "Immediate download"
    },
    {
      title: "National Security AI Protection Kit",
      sector: "federal",
      description: "Classified data handling procedures and national security threat response playbooks",
      tags: ["national security", "classified AI", "government protection"],
      includes: "Procedures, controls, playbooks",
      deliveryTime: "Immediate download"
    },
    // Higher Education Success Kits
    {
      title: "University Research AI Security Kit",
      sector: "higher-ed",
      description: "Academic data protection guidelines and collaborative project security frameworks",
      tags: ["research security", "academic protection", "university data"],
      includes: "Guidelines, frameworks, tools",
      deliveryTime: "Immediate download"
    },
    {
      title: "Campus-Wide AI Security Implementation Kit",
      sector: "higher-ed",
      description: "Multi-department deployment strategies and student privacy protection tools",
      tags: ["campus security", "university deployment", "student privacy"],
      includes: "Strategies, tools, templates",
      deliveryTime: "Immediate download"
    },
    // K-12 Education Success Kits
    {
      title: "K-12 AI Student Safety Kit",
      sector: "k12",
      description: "Age-appropriate security guidelines and classroom technology protection tools",
      tags: ["student safety", "classroom security", "K-12 protection"],
      includes: "Guidelines, tools, frameworks",
      deliveryTime: "Immediate download"
    },
    {
      title: "District-Wide AI Security Management Kit",
      sector: "k12",
      description: "Multi-school coordination strategies and centralized security administration tools",
      tags: ["district security", "school coordination", "K-12 administration"],
      includes: "Strategies, tools, frameworks",
      deliveryTime: "Immediate download"
    },
    // General Success Kits
    {
      title: "AI Security Implementation Blueprint",
      sector: "general",
      description: "Assessment tools, implementation timeline, and ROI calculator",
      tags: ["implementation planning", "security blueprint", "assessment toolkit"],
      includes: "Tools, timeline, calculator",
      deliveryTime: "Immediate download"
    },
    {
      title: "CISO's Guide to Securing AI Systems",
      sector: "general",
      description: "Executive briefing templates, risk assessment frameworks, and budget justification tools",
      tags: ["CISO resources", "executive security", "risk frameworks"],
      includes: "Templates, frameworks, tools",
      deliveryTime: "Immediate download"
    }
  ]
};

export default function Resources() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSector, setSelectedSector] = useState("all");
  const [selectedContentType, setSelectedContentType] = useState("courses");

  const filteredResources = resourceData[selectedContentType]?.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesSector = selectedSector === "all" || resource.sector === selectedSector;
    return matchesSearch && matchesSector;
  }) || [];

  const ResourceCard = ({ resource, type }) => (
    <Card className="bg-gray-800 border-gray-700 hover:border-cyan-500/50 transition-all duration-200 group">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-white group-hover:text-cyan-400 transition-colors text-lg">
              {resource.title}
            </CardTitle>
            <CardDescription className="text-gray-300 mt-2 line-clamp-2">
              {resource.description}
            </CardDescription>
          </div>
          <div className="ml-4 flex flex-col items-end space-y-2">
            {type === "courses" && (
              <>
                <Badge variant="outline" className="text-cyan-400 border-cyan-400">
                  {resource.level}
                </Badge>
                <div className="flex items-center text-gray-400 text-sm">
                  <Clock className="w-4 h-4 mr-1" />
                  {resource.duration}
                </div>
              </>
            )}
            {type === "blogs" && (
              <>
                <div className="flex items-center text-gray-400 text-sm">
                  <Clock className="w-4 h-4 mr-1" />
                  {resource.readTime}
                </div>
                <div className="text-gray-400 text-sm">{resource.author}</div>
              </>
            )}
            {type === "webinars" && (
              <>
                <div className="flex items-center text-gray-400 text-sm">
                  <Users className="w-4 h-4 mr-1" />
                  {resource.attendees}
                </div>
                <div className="flex items-center text-gray-400 text-sm">
                  <Clock className="w-4 h-4 mr-1" />
                  {resource.duration}
                </div>
              </>
            )}
            {type === "podcasts" && (
              <>
                <Badge variant="outline" className="text-green-400 border-green-400">
                  Episode {resource.episode}
                </Badge>
                <div className="flex items-center text-gray-400 text-sm">
                  <Clock className="w-4 h-4 mr-1" />
                  {resource.duration}
                </div>
              </>
            )}
            {type === "handbooks" && (
              <>
                <Badge variant="outline" className="text-purple-400 border-purple-400">
                  {resource.version}
                </Badge>
                <div className="text-gray-400 text-sm">{resource.pages}</div>
              </>
            )}
            {type === "whitepapers" && (
              <>
                <Badge variant="outline" className="text-orange-400 border-orange-400">
                  {resource.downloadType}
                </Badge>
                <div className="text-gray-400 text-sm">{resource.pages} pages</div>
              </>
            )}
            {type === "datasheets" && (
              <>
                <Badge variant="outline" className="text-cyan-400 border-cyan-400">
                  {resource.compatibility}
                </Badge>
                <div className="text-gray-400 text-sm">{resource.specifications}</div>
              </>
            )}
            {type === "use-cases" && (
              <>
                <Badge variant="outline" className="text-yellow-400 border-yellow-400">
                  {resource.industry}
                </Badge>
                <div className="text-gray-400 text-sm">{resource.results}</div>
              </>
            )}
            {type === "ebooks" && (
              <>
                <Badge variant="outline" className="text-indigo-400 border-indigo-400">
                  {resource.format}
                </Badge>
                <div className="text-gray-400 text-sm">{resource.pages}</div>
              </>
            )}
            {type === "success-kits" && (
              <>
                <Badge variant="outline" className="text-teal-400 border-teal-400">
                  {resource.deliveryTime}
                </Badge>
                <div className="text-gray-400 text-sm">{resource.includes}</div>
              </>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2 mb-4">
          {resource.tags.slice(0, 3).map((tag, index) => (
            <Badge key={index} variant="secondary" className="text-xs bg-gray-700 text-gray-300">
              {tag}
            </Badge>
          ))}
        </div>
        <div className="flex justify-between items-center">
          <Badge 
            variant="outline" 
            className={`
              ${resource.sector === 'federal' ? 'text-blue-400 border-blue-400' : ''}
              ${resource.sector === 'higher-ed' ? 'text-green-400 border-green-400' : ''}
              ${resource.sector === 'k12' ? 'text-yellow-400 border-yellow-400' : ''}
              ${resource.sector === 'general' ? 'text-purple-400 border-purple-400' : ''}
            `}
          >
            {sectors.find(s => s.id === resource.sector)?.name}
          </Badge>
          <Button size="sm" variant="outline" className="border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black">
            <ExternalLink className="w-4 h-4 mr-1" />
            {type === "success-kits" ? "Download" : type === "ebooks" ? "Download" : type === "whitepapers" ? "Download" : "Access"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            Security Resources
          </h1>
          <p className="text-gray-400 text-lg mb-6">
            Comprehensive AI security training, documentation, and implementation resources
          </p>
          
          {/* Resource Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {contentTypes.map((type) => {
              const count = resourceData[type.id]?.length || 0;
              return (
                <Card key={type.id} className="bg-gray-800/50 border-gray-700">
                  <CardContent className="p-4 text-center">
                    <div className={`w-3 h-3 rounded-full ${type.color} mx-auto mb-2`}></div>
                    <div className="text-2xl font-bold text-white">{count}</div>
                    <div className="text-sm text-gray-400">{type.name}</div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search resources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-gray-800 border-gray-700 text-white placeholder-gray-400"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {sectors.map((sector) => {
              const Icon = sector.icon;
              return (
                <Button
                  key={sector.id}
                  variant={selectedSector === sector.id ? "default" : "outline"}
                  onClick={() => setSelectedSector(sector.id)}
                  className={`
                    ${selectedSector === sector.id 
                      ? 'bg-cyan-600 text-white' 
                      : 'border-gray-600 text-gray-300 hover:border-cyan-400 hover:text-cyan-400'
                    }
                  `}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {sector.name}
                </Button>
              );
            })}
          </div>
        </div>

        {/* Content Type Tabs */}
        <Tabs value={selectedContentType} onValueChange={setSelectedContentType} className="w-full">
          <TabsList className="grid grid-cols-5 lg:grid-cols-10 bg-gray-800 border-gray-700 mb-8">
            {contentTypes.map((type) => {
              const Icon = type.icon;
              return (
                <TabsTrigger
                  key={type.id}
                  value={type.id}
                  className="data-[state=active]:bg-cyan-600 data-[state=active]:text-white flex items-center justify-center p-2"
                >
                  <Icon className="w-4 h-4 mr-1" />
                  <span className="hidden sm:inline">{type.name}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>

          {contentTypes.map((type) => (
            <TabsContent key={type.id} value={type.id}>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white flex items-center">
                  <div className={`w-3 h-3 rounded-full ${type.color} mr-3`}></div>
                  {type.name}
                </h2>
                <Badge variant="outline" className="text-cyan-400 border-cyan-400">
                  {filteredResources.length} resources
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredResources.map((resource, index) => (
                  <ResourceCard key={index} resource={resource} type={type.id} />
                ))}
              </div>

              {filteredResources.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-gray-400 text-lg mb-2">No resources found</div>
                  <div className="text-gray-500">Try adjusting your search or filter criteria</div>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}