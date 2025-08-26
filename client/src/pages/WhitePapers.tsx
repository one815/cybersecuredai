import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Search,
  FileText,
  Building,
  GraduationCap,
  School,
  Shield,
  Users,
  Download,
  Calendar,
  File,
  ExternalLink,
  Filter
} from "lucide-react";

const whitepapers = [
  {
    title: "Quantifying AI Security ROI: Metrics and Measurement Frameworks",
    description: "Comprehensive framework for measuring and demonstrating AI security value",
    sector: "general",
    pages: "45",
    downloadType: "PDF",
    downloadCount: "3,200",
    publishDate: "2025-01-15",
    authors: "CyberSecure AI Research Team",
    featured: true
  },
  {
    title: "Privacy-Preserving AI: Implementing Federated Learning in High-Security Environments",
    description: "Technical implementation guide for secure federated learning systems",
    sector: "general",
    pages: "38",
    downloadType: "PDF",
    downloadCount: "2,800",
    publishDate: "2025-01-12",
    authors: "Privacy Research Institute"
  },
  {
    title: "Securing Government AI Infrastructure: Federal Compliance Frameworks",
    description: "Detailed analysis of federal AI security requirements and implementation strategies",
    sector: "federal",
    pages: "52",
    downloadType: "PDF",
    downloadCount: "1,900",
    publishDate: "2025-01-18",
    authors: "Federal Security Advisory Board",
    featured: true
  },
  {
    title: "Securing Academic Research AI: Protection Strategies for University Environments",
    description: "Comprehensive security framework for protecting research AI systems",
    sector: "higher-ed",
    pages: "41",
    downloadType: "PDF",
    downloadCount: "1,400",
    publishDate: "2025-01-20",
    authors: "Academic Security Consortium"
  },
  {
    title: "K-12 AI Security Implementation Guide: Safeguarding Educational Technology",
    description: "Practical implementation guide for K-12 AI security systems",
    sector: "k12",
    pages: "35",
    downloadType: "PDF",
    downloadCount: "2,100",
    publishDate: "2025-01-10",
    authors: "Educational Technology Security Institute",
    featured: true
  }
];

export default function WhitePapers() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSectors, setSelectedSectors] = useState<string[]>([]);

  const sectorNames = ["Federal Government", "Higher Education", "K-12 Education", "General"];

  const filteredWhitePapers = whitepapers.filter(paper => {
    const matchesSearch = paper.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         paper.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSector = selectedSectors.length === 0 || selectedSectors.some(sector => {
      if (sector === "Federal Government") return paper.sector === "federal";
      if (sector === "Higher Education") return paper.sector === "higher-ed";
      if (sector === "K-12 Education") return paper.sector === "k12";
      if (sector === "General") return paper.sector === "general";
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

  const featuredWhitePapers = whitepapers.filter(paper => paper.featured);

  const WhitePaperCard = ({ paper }: { paper: any }) => (
    <Card className="bg-gray-800 border-gray-700 hover:border-cyan-500/50 transition-all duration-200 group">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-white group-hover:text-cyan-400 transition-colors text-lg">
              {paper.title}
            </CardTitle>
            <CardDescription className="text-gray-300 mt-2">
              {paper.description}
            </CardDescription>
          </div>
          <Badge variant="outline" className="ml-4 text-cyan-400 border-cyan-400">
            White Paper
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-4 text-sm text-gray-400">
          <div className="flex items-center">
            <File className="w-4 h-4 mr-1" />
            {paper.pages} pages
          </div>
          <div className="flex items-center">
            <Download className="w-4 h-4 mr-1" />
            {paper.downloadCount} downloads
          </div>
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-1" />
            {new Date(paper.publishDate).toLocaleDateString()}
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <Badge 
            variant="outline" 
            className={`
              ${paper.sector === 'federal' ? 'text-blue-400 border-blue-400' : ''}
              ${paper.sector === 'higher-ed' ? 'text-green-400 border-green-400' : ''}
              ${paper.sector === 'k12' ? 'text-yellow-400 border-yellow-400' : ''}
              ${paper.sector === 'general' ? 'text-purple-400 border-purple-400' : ''}
            `}
          >
            {paper.downloadType}
          </Badge>
          <Button 
            size="sm" 
            variant="outline" 
            className="border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black"
            onClick={() => window.open(`/marketing/documents/white-papers/${paper.title.toLowerCase().replace(/[^a-z0-9\s]/gi, '').replace(/\s+/g, '-')}.pdf`, '_blank')}
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
            White Papers
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl">
            In-depth research papers and technical analyses on AI security topics
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Featured White Papers */}
        {featuredWhitePapers.length > 0 && (
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-8">Featured White Papers</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredWhitePapers.map((paper, index) => (
                <Card key={index} className="bg-gray-800 border-gray-700 hover:border-cyan-500/50 transition-all duration-200 group">
                  <div className="aspect-video bg-gradient-to-br from-cyan-600/20 to-blue-600/20 rounded-t-lg flex items-center justify-center">
                    <div className="text-cyan-400 text-6xl opacity-30">
                      <FileText />
                    </div>
                  </div>
                  <CardHeader>
                    <Badge className="mb-2 bg-cyan-600 text-white w-fit">Featured</Badge>
                    <CardTitle className="text-white group-hover:text-cyan-400 transition-colors text-xl">
                      {paper.title}
                    </CardTitle>
                    <CardDescription className="text-gray-300">
                      {paper.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <Badge variant="outline" className="text-cyan-400 border-cyan-400">
                        {paper.pages} pages
                      </Badge>
                      <Button 
                        className="bg-cyan-600 hover:bg-cyan-700 text-white"
                        onClick={() => window.open(`/marketing/documents/white-papers/${paper.title.toLowerCase().replace(/[^a-z0-9\s]/gi, '').replace(/\s+/g, '-')}.pdf`, '_blank')}
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

        {/* All White Papers Section */}
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-white mb-8">All White Papers</h2>
          
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
                      placeholder="Search white papers..."
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

            {/* White Papers Grid */}
            <div className="lg:w-3/4">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-gray-400">
                  Showing {filteredWhitePapers.length} of {whitepapers.length} white papers
                </p>
                <Badge variant="outline" className="text-cyan-400 border-cyan-400">
                  {filteredWhitePapers.length} results
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredWhitePapers.map((paper, index) => (
                  <WhitePaperCard key={index} paper={paper} />
                ))}
              </div>

              {filteredWhitePapers.length === 0 && (
                <div className="text-center py-16">
                  <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <div className="text-gray-400 text-lg mb-2">No white papers found</div>
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