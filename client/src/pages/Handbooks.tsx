import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search,
  BookOpen,
  Building,
  GraduationCap,
  School,
  Shield,
  Users,
  Download,
  FileText,
  Calendar,
  Star
} from "lucide-react";

const sectors = [
  { id: "all", name: "All Sectors", icon: Users },
  { id: "federal", name: "Federal Government", icon: Building },
  { id: "higher-ed", name: "Higher Education", icon: GraduationCap },
  { id: "k12", name: "K-12 Education", icon: School },
  { id: "general", name: "General", icon: Shield }
];

const handbooks = [
  // Federal Government Handbooks
  {
    title: "Federal AI Security Handbook: Compliance, Protection, and Response",
    sector: "federal",
    description: "Comprehensive guide for government AI security implementation",
    tags: ["federal security guidance", "government AI handbook", "compliance frameworks"],
    pages: "250+",
    version: "2025 Edition",
    downloadCount: "2,400",
    rating: 4.8,
    lastUpdated: "2025-01-15"
  },
  {
    title: "Municipal and State Government AI Security Handbook",
    sector: "federal",
    description: "Practical approaches for local authorities and state governments",
    tags: ["state government security", "local authority protection", "municipal AI systems"],
    pages: "180+",
    version: "2025 Edition",
    downloadCount: "1,800",
    rating: 4.6,
    lastUpdated: "2025-01-10"
  },
  {
    title: "Real-World AI Security Scenarios: Federal Case Studies",
    sector: "federal",
    description: "Case studies and lessons from federal AI deployments",
    tags: ["government case studies", "security lessons learned", "federal AI incidents"],
    pages: "160+",
    version: "2025 Edition",
    downloadCount: "1,200",
    rating: 4.7,
    lastUpdated: "2025-01-08"
  },
  // Higher Education Handbooks
  {
    title: "University AI Security Handbook: Balancing Academic Freedom with Protection",
    sector: "higher-ed",
    description: "Academic-focused security strategies and implementation guides",
    tags: ["academic security", "university protection", "research security"],
    pages: "180+",
    version: "2025 Edition",
    downloadCount: "3,200",
    rating: 4.9,
    lastUpdated: "2025-01-14"
  },
  {
    title: "AI Security Pilot Program Handbook",
    sector: "higher-ed",
    description: "Design, implementation and assessment in academic settings",
    tags: ["pilot program design", "academic security testing", "university trials"],
    pages: "150+",
    version: "2025 Edition",
    downloadCount: "950",
    rating: 4.5,
    lastUpdated: "2025-01-12"
  },
  {
    title: "Research Institution AI Security Handbook",
    sector: "higher-ed",
    description: "Protecting intellectual property and collaborative work",
    tags: ["research protection", "academic IP security", "collaborative security"],
    pages: "200+",
    version: "2025 Edition",
    downloadCount: "1,600",
    rating: 4.7,
    lastUpdated: "2025-01-06"
  },
  // K-12 Education Handbooks
  {
    title: "K-12 AI Security Handbook: Safeguarding Educational Technology",
    sector: "k12",
    description: "Student data protection and educational technology security",
    tags: ["student data protection", "educational technology security", "school cybersecurity"],
    pages: "120+",
    version: "2025 Edition",
    downloadCount: "4,100",
    rating: 4.8,
    lastUpdated: "2025-01-13"
  },
  {
    title: "School District AI Security Handbook",
    sector: "k12",
    description: "Centralized management for multiple campuses and district-wide coordination",
    tags: ["district security management", "multi-school protection", "educational administration"],
    pages: "140+",
    version: "2025 Edition",
    downloadCount: "2,300",
    rating: 4.6,
    lastUpdated: "2025-01-09"
  },
  {
    title: "Classroom AI Security Handbook",
    sector: "k12",
    description: "Teacher-focused guidance for safe technology integration",
    tags: ["classroom security", "teacher guidance", "educational technology safety"],
    pages: "100+",
    version: "2025 Edition",
    downloadCount: "3,500",
    rating: 4.7,
    lastUpdated: "2025-01-11"
  },
  // General Handbooks
  {
    title: "The Definitive AI Security Handbook",
    sector: "general",
    description: "Strategies, tools, and techniques for protecting intelligent systems",
    tags: ["comprehensive handbook", "security strategies", "protection techniques"],
    pages: "300+",
    version: "2025 Edition",
    downloadCount: "8,900",
    rating: 4.9,
    lastUpdated: "2025-01-15"
  },
  {
    title: "AI Security Field Guide: Practical Approaches for Security Professionals",
    sector: "general",
    description: "Hands-on reference for cybersecurity practitioners",
    tags: ["field guide", "practical security", "professional reference"],
    pages: "220+",
    version: "2025 Edition",
    downloadCount: "5,600",
    rating: 4.8,
    lastUpdated: "2025-01-12"
  }
];

export default function Handbooks() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSector, setSelectedSector] = useState("all");

  const filteredHandbooks = handbooks.filter(handbook => {
    const matchesSearch = handbook.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         handbook.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         handbook.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesSector = selectedSector === "all" || handbook.sector === selectedSector;
    return matchesSearch && matchesSector;
  });

  const popularHandbooks = handbooks.sort((a, b) => parseInt(b.downloadCount.replace(',', '')) - parseInt(a.downloadCount.replace(',', ''))).slice(0, 3);

  const HandbookCard = ({ handbook, popular = false }: { handbook: any, popular?: boolean }) => (
    <Card className={`bg-gray-800 border-gray-700 hover:border-cyan-500/50 transition-all duration-200 group ${popular ? 'border-purple-500/30' : ''}`}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            {popular && (
              <Badge className="mb-2 bg-purple-600 text-white">Popular</Badge>
            )}
            <CardTitle className="text-white group-hover:text-cyan-400 transition-colors text-lg">
              {handbook.title}
            </CardTitle>
            <CardDescription className="text-gray-300 mt-2">
              {handbook.description}
            </CardDescription>
          </div>
          <div className="ml-4 flex flex-col items-end space-y-2">
            <Badge variant="outline" className="text-purple-400 border-purple-400">
              {handbook.version}
            </Badge>
            <div className="text-gray-400 text-sm">{handbook.pages}</div>
            <div className="flex items-center text-yellow-400 text-sm">
              <Star className="w-4 h-4 mr-1 fill-current" />
              {handbook.rating}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center text-gray-400 text-sm mb-3">
          <Calendar className="w-4 h-4 mr-1" />
          Updated {new Date(handbook.lastUpdated).toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
          })}
          <span className="mx-2">•</span>
          <Download className="w-4 h-4 mr-1" />
          {handbook.downloadCount} downloads
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {handbook.tags.slice(0, 3).map((tag: string, index: number) => (
            <Badge key={index} variant="secondary" className="text-xs bg-gray-700 text-gray-300">
              {tag}
            </Badge>
          ))}
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
            {sectors.find(s => s.id === handbook.sector)?.name}
          </Badge>
          <Button size="sm" variant="outline" className="border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black">
            <Download className="w-4 h-4 mr-1" />
            Download PDF
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
            Security Handbooks & Guides
          </h1>
          <p className="text-gray-400 text-lg mb-6">
            Comprehensive guides and reference materials for AI security implementation
          </p>
          
          {/* Handbook Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-cyan-400">{handbooks.length}</div>
                <div className="text-sm text-gray-400">Total Handbooks</div>
              </CardContent>
            </Card>
            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-400">{handbooks.reduce((acc, handbook) => acc + parseInt(handbook.downloadCount.replace(',', '')), 0).toLocaleString()}</div>
                <div className="text-sm text-gray-400">Total Downloads</div>
              </CardContent>
            </Card>
            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-yellow-400">{handbooks.reduce((acc, handbook) => acc + parseInt(handbook.pages.replace('+', '')), 0).toLocaleString()}+</div>
                <div className="text-sm text-gray-400">Total Pages</div>
              </CardContent>
            </Card>
            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-400">{(handbooks.reduce((acc, handbook) => acc + handbook.rating, 0) / handbooks.length).toFixed(1)}</div>
                <div className="text-sm text-gray-400">Avg Rating</div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Popular Handbooks */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">Most Downloaded</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {popularHandbooks.map((handbook, index) => (
              <HandbookCard key={index} handbook={handbook} popular={true} />
            ))}
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search handbooks..."
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

        {/* All Handbooks */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">All Handbooks</h2>
          <Badge variant="outline" className="text-cyan-400 border-cyan-400">
            {filteredHandbooks.length} handbooks
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHandbooks.map((handbook, index) => (
            <HandbookCard key={index} handbook={handbook} />
          ))}
        </div>

        {filteredHandbooks.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <div className="text-gray-400 text-lg mb-2">No handbooks found</div>
            <div className="text-gray-500">Try adjusting your search or filter criteria</div>
          </div>
        )}
      </div>
    </div>
  );
}