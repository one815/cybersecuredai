import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
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

const webinars = [
  {
    title: "Securing Federal AI Infrastructure: NIST Framework Implementation",
    description: "Regulatory compliance walkthrough and federal case studies",
    sector: "federal",
    duration: "60 min",
    attendees: "1,200+",
    presenter: "Dr. Sarah Mitchell, Federal CISO",
    airDate: "2025-01-15",
    status: "on-demand",
    views: "3,400",
    featured: true
  },
  {
    title: "Campus-Wide AI Security: Protecting University Research Assets",
    description: "Academic threat models and research protection strategies",
    sector: "higher-ed",
    duration: "45 min",
    attendees: "800+",
    presenter: "Prof. Michael Chen, University CIO",
    airDate: "2025-01-18",
    status: "on-demand",
    views: "1,600"
  },
  {
    title: "Protecting Digital Classrooms: K-12 AI Security Fundamentals",
    description: "School-specific threats and student safety measures",
    sector: "k12",
    duration: "45 min",
    attendees: "950+",
    presenter: "Jennifer Adams, K-12 Security Expert",
    airDate: "2025-01-20",
    status: "on-demand",
    views: "2,100",
    featured: true
  },
  {
    title: "From Vulnerability to Security: Hardening Your AI Infrastructure",
    description: "Comprehensive infrastructure hardening and vulnerability remediation",
    sector: "general",
    duration: "60 min",
    attendees: "1,800+",
    presenter: "Alex Thompson, Security Architect",
    airDate: "2025-01-22",
    status: "on-demand",
    views: "2,800"
  },
  {
    title: "AI Security Compliance: Meeting New Regulatory Requirements in 2025",
    description: "Regulatory overview, compliance checklist, and implementation timeline",
    sector: "general",
    duration: "50 min",
    attendees: "1,500+",
    presenter: "Dr. Lisa Rodriguez, Compliance Director",
    airDate: "2025-01-12",
    status: "on-demand",
    views: "2,400",
    featured: true
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
            className="border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black"
            onClick={() => window.open(`/marketing/webinars/${webinar.title.toLowerCase().replace(/[^a-z0-9\s]/gi, '').replace(/\s+/g, '-')}`, '_blank')}
          >
            <Play className="w-4 h-4 mr-1" />
            Watch Now
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
                  <div className="aspect-video bg-gradient-to-br from-cyan-600/20 to-blue-600/20 rounded-t-lg flex items-center justify-center">
                    <div className="text-cyan-400 text-6xl opacity-30">
                      <Video />
                    </div>
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
  );
}