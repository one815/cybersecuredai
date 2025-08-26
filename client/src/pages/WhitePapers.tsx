import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  File
} from "lucide-react";

const sectors = [
  { id: "all", name: "All Sectors", icon: Users },
  { id: "federal", name: "Federal Government", icon: Building },
  { id: "higher-ed", name: "Higher Education", icon: GraduationCap },
  { id: "k12", name: "K-12 Education", icon: School },
  { id: "general", name: "General", icon: Shield }
];

const whitepapers = [
  {
    title: "Quantifying AI Security ROI: Metrics and Measurement Frameworks",
    sector: "general",
    description: "Comprehensive framework for measuring and demonstrating AI security value",
    tags: ["security ROI", "AI metrics", "enterprise security measurement"],
    pages: "45",
    downloadType: "PDF",
    downloadCount: "3,200",
    publishDate: "2025-01-15",
    authors: "CyberSecure AI Research Team"
  },
  {
    title: "Privacy-Preserving AI: Implementing Federated Learning in High-Security Environments",
    sector: "general",
    description: "Technical implementation guide for secure federated learning systems",
    tags: ["privacy-preserving AI", "federated learning", "secure environments"],
    pages: "38",
    downloadType: "PDF",
    downloadCount: "2,800",
    publishDate: "2025-01-12",
    authors: "Privacy Research Institute"
  },
  {
    title: "Securing Government AI Infrastructure: Federal Compliance Frameworks",
    sector: "federal",
    description: "Detailed analysis of federal AI security requirements and implementation strategies",
    tags: ["federal AI compliance", "government security frameworks", "regulatory implementation"],
    pages: "52",
    downloadType: "PDF",
    downloadCount: "1,900",
    publishDate: "2025-01-10",
    authors: "Federal Security Advisory Board"
  },
  {
    title: "Securing Academic Research AI: Protection Strategies for University Environments",
    sector: "higher-ed",
    description: "Comprehensive security framework for protecting research AI systems",
    tags: ["academic research security", "university AI protection", "research data safeguards"],
    pages: "41",
    downloadType: "PDF",
    downloadCount: "1,600",
    publishDate: "2025-01-08",
    authors: "Academic Security Consortium"
  },
  {
    title: "K-12 AI Security Implementation Guide: Safeguarding Educational Technology",
    sector: "k12",
    description: "Practical implementation guide for K-12 AI security systems",
    tags: ["school technology security", "K-12 implementation", "educational AI protection"],
    pages: "35",
    downloadType: "PDF",
    downloadCount: "2,100",
    publishDate: "2025-01-06",
    authors: "Educational Technology Security Group"
  },
  {
    title: "The Future of AI Security: Emerging Threats and Defense Mechanisms",
    sector: "general",
    description: "Forward-looking analysis of AI security challenges and solutions",
    tags: ["future AI threats", "emerging security", "defense mechanisms"],
    pages: "48",
    downloadType: "PDF",
    downloadCount: "2,700",
    publishDate: "2025-01-05",
    authors: "Future Security Research Lab"
  },
  {
    title: "Zero Trust Architecture for AI Systems: Implementation and Best Practices",
    sector: "general",
    description: "Complete guide to implementing zero trust principles in AI environments",
    tags: ["zero trust AI", "implementation guide", "security best practices"],
    pages: "43",
    downloadType: "PDF",
    downloadCount: "2,400",
    publishDate: "2025-01-03",
    authors: "Zero Trust Security Institute"
  }
];

export default function WhitePapers() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSector, setSelectedSector] = useState("all");

  const filteredPapers = whitepapers.filter(paper => {
    const matchesSearch = paper.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         paper.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         paper.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesSector = selectedSector === "all" || paper.sector === selectedSector;
    return matchesSearch && matchesSector;
  });

  const recentPapers = whitepapers.sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()).slice(0, 3);

  const WhitePaperCard = ({ paper, recent = false }: { paper: any, recent?: boolean }) => (
    <Card className={`bg-gray-800 border-gray-700 hover:border-cyan-500/50 transition-all duration-200 group ${recent ? 'border-orange-500/30' : ''}`}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            {recent && (
              <Badge className="mb-2 bg-orange-600 text-white">New Release</Badge>
            )}
            <CardTitle className="text-white group-hover:text-cyan-400 transition-colors text-lg">
              {paper.title}
            </CardTitle>
            <CardDescription className="text-gray-300 mt-2">
              {paper.description}
            </CardDescription>
          </div>
          <div className="ml-4 flex flex-col items-end space-y-2">
            <Badge variant="outline" className="text-orange-400 border-orange-400">
              {paper.downloadType}
            </Badge>
            <div className="text-gray-400 text-sm">{paper.pages} pages</div>
            <div className="flex items-center text-gray-400 text-sm">
              <Download className="w-4 h-4 mr-1" />
              {paper.downloadCount}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center text-gray-400 text-sm mb-3">
          <Calendar className="w-4 h-4 mr-1" />
          {new Date(paper.publishDate).toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
          <span className="mx-2">•</span>
          <span>by {paper.authors}</span>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {paper.tags.slice(0, 3).map((tag: string, index: number) => (
            <Badge key={index} variant="secondary" className="text-xs bg-gray-700 text-gray-300">
              {tag}
            </Badge>
          ))}
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
            {sectors.find(s => s.id === paper.sector)?.name}
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
            White Papers & Research
          </h1>
          <p className="text-gray-400 text-lg mb-6">
            In-depth technical papers and research on AI security frameworks and implementations
          </p>
          
          {/* White Paper Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-cyan-400">{whitepapers.length}</div>
                <div className="text-sm text-gray-400">Total Papers</div>
              </CardContent>
            </Card>
            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-400">{whitepapers.reduce((acc, paper) => acc + parseInt(paper.downloadCount.replace(',', '')), 0).toLocaleString()}</div>
                <div className="text-sm text-gray-400">Total Downloads</div>
              </CardContent>
            </Card>
            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-yellow-400">{whitepapers.reduce((acc, paper) => acc + parseInt(paper.pages), 0)}</div>
                <div className="text-sm text-gray-400">Total Pages</div>
              </CardContent>
            </Card>
            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-400">{new Set(whitepapers.map(paper => paper.authors)).size}</div>
                <div className="text-sm text-gray-400">Research Teams</div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Recent Papers */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">Latest Publications</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentPapers.map((paper, index) => (
              <WhitePaperCard key={index} paper={paper} recent={true} />
            ))}
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search white papers..."
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

        {/* All White Papers */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">All White Papers</h2>
          <Badge variant="outline" className="text-cyan-400 border-cyan-400">
            {filteredPapers.length} papers
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPapers.map((paper, index) => (
            <WhitePaperCard key={index} paper={paper} />
          ))}
        </div>

        {filteredPapers.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <div className="text-gray-400 text-lg mb-2">No white papers found</div>
            <div className="text-gray-500">Try adjusting your search or filter criteria</div>
          </div>
        )}
      </div>
    </div>
  );
}