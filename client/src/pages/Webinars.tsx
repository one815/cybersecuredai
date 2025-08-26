import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  Eye
} from "lucide-react";

const sectors = [
  { id: "all", name: "All Sectors", icon: Users },
  { id: "federal", name: "Federal Government", icon: Building },
  { id: "higher-ed", name: "Higher Education", icon: GraduationCap },
  { id: "k12", name: "K-12 Education", icon: School },
  { id: "general", name: "General", icon: Shield }
];

const webinars = [
  // Federal Government Webinars
  {
    title: "Securing Federal AI Infrastructure: NIST Framework Implementation",
    sector: "federal",
    description: "Regulatory compliance walkthrough and federal case studies",
    tags: ["federal AI security", "NIST framework", "government cybersecurity"],
    duration: "60 min",
    attendees: "1,200+",
    presenter: "Dr. Sarah Mitchell, Federal CISO",
    airDate: "2025-01-15",
    status: "on-demand",
    views: "3,400"
  },
  {
    title: "Classified AI Systems: Security Protocols for Federal Agencies",
    sector: "federal",
    description: "Clearance-appropriate security measures and sensitive data handling",
    tags: ["classified AI protection", "federal security protocols", "government data security"],
    duration: "75 min",
    attendees: "850+",
    presenter: "Mark Rodriguez, NSA Cybersecurity Lead",
    airDate: "2025-01-12",
    status: "on-demand",
    views: "2,100"
  },
  {
    title: "Federal Zero Trust Architecture: AI Implementation Across Agencies",
    sector: "federal",
    description: "Cross-agency coordination and unified security approaches",
    tags: ["federal zero trust", "agency security coordination", "government AI protection"],
    duration: "65 min",
    attendees: "980+",
    presenter: "Jennifer Chen, CISA Director",
    airDate: "2025-01-08",
    status: "on-demand",
    views: "2,800"
  },
  // Higher Education Webinars
  {
    title: "Campus-Wide AI Security: Protecting University Research Assets",
    sector: "higher-ed",
    description: "Academic threat models and research protection strategies",
    tags: ["university cybersecurity", "research protection", "academic security"],
    duration: "45 min",
    attendees: "800+",
    presenter: "Prof. David Kim, Stanford University",
    airDate: "2025-01-14",
    status: "on-demand",
    views: "1,600"
  },
  {
    title: "Student Data Protection: AI Security for Higher Education",
    sector: "higher-ed",
    description: "Privacy regulations and student information safeguards",
    tags: ["student data security", "education privacy", "university compliance"],
    duration: "50 min",
    attendees: "650+",
    presenter: "Dr. Lisa Park, MIT Security Officer",
    airDate: "2025-01-10",
    status: "on-demand",
    views: "1,200"
  },
  {
    title: "Multi-Campus Security Operations: Building a Unified Defense",
    sector: "higher-ed",
    description: "Consortium approaches and shared security resources",
    tags: ["campus security operations", "university defense systems", "academic security collaboration"],
    duration: "55 min",
    attendees: "420+",
    presenter: "Robert Turner, UC System CISO",
    airDate: "2025-01-06",
    status: "on-demand",
    views: "890"
  },
  // K-12 Education Webinars
  {
    title: "Protecting Digital Classrooms: K-12 AI Security Fundamentals",
    sector: "k12",
    description: "School-specific threats and student safety measures",
    tags: ["digital classroom security", "school cybersecurity", "K-12 protection"],
    duration: "45 min",
    attendees: "950+",
    presenter: "Maria Gonzalez, Texas Education Agency",
    airDate: "2025-01-11",
    status: "on-demand",
    views: "2,300"
  },
  {
    title: "District-Wide Security Implementation: Results from 500-School Pilot",
    sector: "k12",
    description: "Large-scale deployment strategies and measured outcomes",
    tags: ["school district security", "large-scale implementation", "education security results"],
    duration: "55 min",
    attendees: "1,100+",
    presenter: "Tom Williams, Chicago Public Schools",
    airDate: "2025-01-09",
    status: "on-demand",
    views: "2,800"
  },
  {
    title: "Securing Student AI Tools: Balancing Security and Educational Access",
    sector: "k12",
    description: "Appropriate security levels and educational technology protection",
    tags: ["student AI security", "educational technology protection", "classroom cybersecurity"],
    duration: "40 min",
    attendees: "760+",
    presenter: "Susan Lee, California Dept of Education",
    airDate: "2025-01-05",
    status: "on-demand",
    views: "1,900"
  },
  // General Webinars
  {
    title: "From Vulnerability to Security: Hardening Your AI Infrastructure",
    sector: "general",
    description: "Comprehensive infrastructure hardening and vulnerability remediation",
    tags: ["AI infrastructure hardening", "vulnerability remediation", "security strengthening"],
    duration: "60 min",
    attendees: "1,800+",
    presenter: "Alex Thompson, CyberSecure AI Team",
    airDate: "2025-01-13",
    status: "on-demand",
    views: "4,200"
  },
  {
    title: "AI Security Compliance: Meeting New Regulatory Requirements in 2025",
    sector: "general",
    description: "Regulatory overview, compliance checklist, and implementation timeline",
    tags: ["2025 regulations", "compliance requirements", "regulatory preparation"],
    duration: "50 min",
    attendees: "1,500+",
    presenter: "Rachel Adams, Compliance Expert",
    airDate: "2025-01-07",
    status: "on-demand",
    views: "3,600"
  }
];

export default function Webinars() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSector, setSelectedSector] = useState("all");

  const filteredWebinars = webinars.filter(webinar => {
    const matchesSearch = webinar.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         webinar.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         webinar.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesSector = selectedSector === "all" || webinar.sector === selectedSector;
    return matchesSearch && matchesSector;
  });

  const recentWebinars = webinars.sort((a, b) => new Date(b.airDate).getTime() - new Date(a.airDate).getTime()).slice(0, 3);

  const WebinarCard = ({ webinar, recent = false }: { webinar: any, recent?: boolean }) => (
    <Card className={`bg-gray-800 border-gray-700 hover:border-cyan-500/50 transition-all duration-200 group ${recent ? 'border-green-500/30' : ''}`}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            {recent && (
              <Badge className="mb-2 bg-green-600 text-white">Recently Added</Badge>
            )}
            <CardTitle className="text-white group-hover:text-cyan-400 transition-colors text-lg">
              {webinar.title}
            </CardTitle>
            <CardDescription className="text-gray-300 mt-2">
              {webinar.description}
            </CardDescription>
          </div>
          <div className="ml-4 flex flex-col items-end space-y-2">
            <div className="flex items-center text-gray-400 text-sm">
              <Users className="w-4 h-4 mr-1" />
              {webinar.attendees}
            </div>
            <div className="flex items-center text-gray-400 text-sm">
              <Clock className="w-4 h-4 mr-1" />
              {webinar.duration}
            </div>
            <div className="flex items-center text-gray-400 text-sm">
              <Eye className="w-4 h-4 mr-1" />
              {webinar.views} views
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center text-gray-400 text-sm mb-3">
          <Calendar className="w-4 h-4 mr-1" />
          {new Date(webinar.airDate).toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
          <span className="mx-2">•</span>
          <span>by {webinar.presenter}</span>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {webinar.tags.slice(0, 3).map((tag: string, index: number) => (
            <Badge key={index} variant="secondary" className="text-xs bg-gray-700 text-gray-300">
              {tag}
            </Badge>
          ))}
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
            {sectors.find(s => s.id === webinar.sector)?.name}
          </Badge>
          <Button size="sm" variant="outline" className="border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black">
            <Play className="w-4 h-4 mr-1" />
            Watch Now
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
            On-Demand Webinars
          </h1>
          <p className="text-gray-400 text-lg mb-6">
            Expert-led webinars covering the latest in AI security and implementation strategies
          </p>
          
          {/* Webinar Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-cyan-400">{webinars.length}</div>
                <div className="text-sm text-gray-400">Total Webinars</div>
              </CardContent>
            </Card>
            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-400">{webinars.reduce((acc, webinar) => acc + parseInt(webinar.attendees.replace(/[+,]/g, '')), 0).toLocaleString()}</div>
                <div className="text-sm text-gray-400">Total Attendees</div>
              </CardContent>
            </Card>
            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-yellow-400">{webinars.reduce((acc, webinar) => acc + parseInt(webinar.views.replace(',', '')), 0).toLocaleString()}</div>
                <div className="text-sm text-gray-400">Total Views</div>
              </CardContent>
            </Card>
            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-400">{Math.round(webinars.reduce((acc, webinar) => acc + parseInt(webinar.duration.replace(' min', '')), 0) / 60)}</div>
                <div className="text-sm text-gray-400">Hours of Content</div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Recent Webinars */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">Recently Added</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentWebinars.map((webinar, index) => (
              <WebinarCard key={index} webinar={webinar} recent={true} />
            ))}
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search webinars..."
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
                  size="sm"
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

        {/* All Webinars */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">All Webinars</h2>
          <Badge variant="outline" className="text-cyan-400 border-cyan-400">
            {filteredWebinars.length} webinars
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWebinars.map((webinar, index) => (
            <WebinarCard key={index} webinar={webinar} />
          ))}
        </div>

        {filteredWebinars.length === 0 && (
          <div className="text-center py-12">
            <Video className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <div className="text-gray-400 text-lg mb-2">No webinars found</div>
            <div className="text-gray-500">Try adjusting your search or filter criteria</div>
          </div>
        )}
      </div>
    </div>
  );
}