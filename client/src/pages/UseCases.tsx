import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Search,
  Star,
  Building,
  GraduationCap,
  School,
  Shield,
  Users,
  ExternalLink,
  TrendingUp,
  Award,
  CheckCircle,
  Filter
} from "lucide-react";

const useCases = [
  {
    title: "Federal Zero Trust Architecture Implementation",
    description: "47% reduction in security incidents while ensuring AI systems remain secure and compliant",
    sector: "federal",
    results: "47% reduction in incidents",
    industry: "Federal Government",
    organization: "Department of Defense",
    timeline: "18 months",
    investment: "$2.4M",
    roiPercentage: "340%",
    keyMetrics: ["Security incidents reduced by 47%", "Compliance score improved to 98%", "AI system uptime at 99.7%"],
    featured: true
  },
  {
    title: "Executive Order Compliance",
    description: "Rapid adaptation to new White House executive orders on secure AI development",
    sector: "federal",
    results: "100% compliance achieved",
    industry: "Federal Government",
    organization: "General Services Administration",
    timeline: "6 months",
    investment: "$850K",
    roiPercentage: "180%",
    keyMetrics: ["100% compliance achieved", "Documentation time reduced by 60%", "Audit readiness improved by 85%"]
  },
  {
    title: "Research Collaboration Security",
    description: "Shared security standards for multi-institution research projects",
    sector: "higher-ed",
    results: "Protected $50M+ in research",
    industry: "Higher Education",
    organization: "Stanford Research Consortium",
    timeline: "12 months",
    investment: "$1.2M",
    roiPercentage: "280%",
    keyMetrics: ["$50M+ research protected", "Cross-institution collaboration increased 65%", "Security incidents down 82%"],
    featured: true
  },
  {
    title: "Campus Access Control",
    description: "92% improvement in identifying unauthorized access attempts to campus AI systems",
    sector: "higher-ed",
    results: "92% improvement in detection",
    industry: "Higher Education",
    organization: "University of California System",
    timeline: "8 months",
    investment: "$950K",
    roiPercentage: "220%",
    keyMetrics: ["Unauthorized access detection up 92%", "Response time reduced by 75%", "Security awareness increased 88%"]
  },
  {
    title: "School Security Assessment",
    description: "Comprehensive evaluation and strengthening of AI protection measures for K-12 districts",
    sector: "k12",
    results: "Enhanced security across 500+ schools",
    industry: "K-12 Education",
    organization: "Texas Education Agency",
    timeline: "15 months",
    investment: "$1.8M",
    roiPercentage: "245%",
    keyMetrics: ["500+ schools secured", "Student data breaches down 95%", "Compliance score at 97%"],
    featured: true
  },
  {
    title: "Technology Administrator Training",
    description: "Mandated security training to meet state compliance requirements",
    sector: "k12",
    results: "Training completion rate: 98%",
    industry: "K-12 Education",
    organization: "Florida School District Alliance",
    timeline: "10 months",
    investment: "$650K",
    roiPercentage: "190%",
    keyMetrics: ["98% training completion", "Security incidents down 78%", "Administrator confidence up 85%"]
  }
];

export default function UseCases() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSectors, setSelectedSectors] = useState<string[]>([]);

  const sectorNames = ["Federal Government", "Higher Education", "K-12 Education", "General"];

  const filteredUseCases = useCases.filter(useCase => {
    const matchesSearch = useCase.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         useCase.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSector = selectedSectors.length === 0 || selectedSectors.some(sector => {
      if (sector === "Federal Government") return useCase.sector === "federal";
      if (sector === "Higher Education") return useCase.sector === "higher-ed";
      if (sector === "K-12 Education") return useCase.sector === "k12";
      if (sector === "General") return useCase.sector === "general";
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

  const featuredUseCases = useCases.filter(useCase => useCase.featured);

  const UseCaseCard = ({ useCase }: { useCase: any }) => (
    <Card className="bg-gray-800 border-gray-700 hover:border-cyan-500/50 transition-all duration-200 group">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-white group-hover:text-cyan-400 transition-colors text-lg">
              {useCase.title}
            </CardTitle>
            <CardDescription className="text-gray-300 mt-2">
              {useCase.description}
            </CardDescription>
          </div>
          <Badge variant="outline" className="ml-4 text-cyan-400 border-cyan-400">
            Use Case
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 mb-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">Organization:</span>
            <span className="text-white">{useCase.organization}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">Timeline:</span>
            <span className="text-white">{useCase.timeline}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">ROI:</span>
            <Badge className="bg-green-600 text-white">{useCase.roiPercentage}</Badge>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <Badge 
            variant="outline" 
            className={`
              ${useCase.sector === 'federal' ? 'text-blue-400 border-blue-400' : ''}
              ${useCase.sector === 'higher-ed' ? 'text-green-400 border-green-400' : ''}
              ${useCase.sector === 'k12' ? 'text-yellow-400 border-yellow-400' : ''}
              ${useCase.sector === 'general' ? 'text-purple-400 border-purple-400' : ''}
            `}
          >
            {useCase.results}
          </Badge>
          <Button 
            size="sm" 
            variant="outline" 
            className="border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black"
            onClick={() => window.open(`/marketing/case-studies/${useCase.title.toLowerCase().replace(/[^a-z0-9\s]/gi, '').replace(/\s+/g, '-')}`, '_blank')}
          >
            <ExternalLink className="w-4 h-4 mr-1" />
            View Details
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
            Customer Success Stories
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl">
            Real-world implementations and measurable results from our security solutions
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Featured Use Cases */}
        {featuredUseCases.length > 0 && (
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-8">Featured Success Stories</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredUseCases.map((useCase, index) => (
                <Card key={index} className="bg-gray-800 border-gray-700 hover:border-cyan-500/50 transition-all duration-200 group">
                  <div className="aspect-video bg-gradient-to-br from-cyan-600/20 to-blue-600/20 rounded-t-lg flex items-center justify-center">
                    <div className="text-cyan-400 text-6xl opacity-30">
                      <Star />
                    </div>
                  </div>
                  <CardHeader>
                    <Badge className="mb-2 bg-cyan-600 text-white w-fit">Featured</Badge>
                    <CardTitle className="text-white group-hover:text-cyan-400 transition-colors text-xl">
                      {useCase.title}
                    </CardTitle>
                    <CardDescription className="text-gray-300">
                      {useCase.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <Badge variant="outline" className="text-green-400 border-green-400">
                        {useCase.roiPercentage} ROI
                      </Badge>
                      <Button 
                        className="bg-cyan-600 hover:bg-cyan-700 text-white"
                        onClick={() => window.open(`/marketing/case-studies/${useCase.title.toLowerCase().replace(/[^a-z0-9\s]/gi, '').replace(/\s+/g, '-')}`, '_blank')}
                      >
                        <ExternalLink className="w-4 h-4 mr-1" />
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* All Use Cases Section */}
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-white mb-8">All Success Stories</h2>
          
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
                      placeholder="Search use cases..."
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

            {/* Use Cases Grid */}
            <div className="lg:w-3/4">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-gray-400">
                  Showing {filteredUseCases.length} of {useCases.length} success stories
                </p>
                <Badge variant="outline" className="text-cyan-400 border-cyan-400">
                  {filteredUseCases.length} results
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredUseCases.map((useCase, index) => (
                  <UseCaseCard key={index} useCase={useCase} />
                ))}
              </div>

              {filteredUseCases.length === 0 && (
                <div className="text-center py-16">
                  <Star className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <div className="text-gray-400 text-lg mb-2">No success stories found</div>
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