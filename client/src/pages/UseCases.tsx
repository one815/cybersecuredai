import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  CheckCircle
} from "lucide-react";

const sectors = [
  { id: "all", name: "All Sectors", icon: Users },
  { id: "federal", name: "Federal Government", icon: Building },
  { id: "higher-ed", name: "Higher Education", icon: GraduationCap },
  { id: "k12", name: "K-12 Education", icon: School },
  { id: "general", name: "General", icon: Shield }
];

const useCases = [
  {
    title: "Federal Zero Trust Architecture Implementation",
    sector: "federal",
    description: "47% reduction in security incidents while ensuring AI systems remain secure and compliant",
    tags: ["zero trust", "federal compliance", "security incidents reduction"],
    results: "47% reduction in incidents",
    industry: "Federal Government",
    organization: "Department of Defense",
    timeline: "18 months",
    investment: "$2.4M",
    roiPercentage: "340%",
    keyMetrics: ["Security incidents reduced by 47%", "Compliance score improved to 98%", "AI system uptime at 99.7%"]
  },
  {
    title: "Executive Order Compliance",
    sector: "federal",
    description: "Rapid adaptation to new White House executive orders on secure AI development",
    tags: ["executive orders", "federal compliance", "AI security mandates"],
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
    sector: "higher-ed",
    description: "Shared security standards for multi-institution research projects",
    tags: ["research collaboration", "academic security", "intellectual property protection"],
    results: "Protected $50M+ in research",
    industry: "Higher Education",
    organization: "Ivy League Research Consortium",
    timeline: "12 months",
    investment: "$1.8M",
    roiPercentage: "2,680%",
    keyMetrics: ["$50M+ research assets protected", "Data breaches reduced by 90%", "Collaboration efficiency up 45%"]
  },
  {
    title: "Campus Access Control",
    sector: "higher-ed",
    description: "92% improvement in identifying unauthorized access attempts to campus AI systems",
    tags: ["campus security", "access control", "unauthorized access detection"],
    results: "92% improvement in detection",
    industry: "Higher Education",
    organization: "Stanford University",
    timeline: "8 months",
    investment: "$950K",
    roiPercentage: "420%",
    keyMetrics: ["92% improvement in threat detection", "False positives reduced by 78%", "Response time improved by 65%"]
  },
  {
    title: "School Security Assessment",
    sector: "k12",
    description: "Comprehensive evaluation and strengthening of AI protection measures for K-12 districts",
    tags: ["school security", "K-12 assessment", "protection measures"],
    results: "Enhanced security across 500+ schools",
    industry: "K-12 Education",
    organization: "Chicago Public Schools",
    timeline: "24 months",
    investment: "$3.2M",
    roiPercentage: "450%",
    keyMetrics: ["500+ schools secured", "Student data breaches eliminated", "IT efficiency improved by 55%"]
  },
  {
    title: "Technology Administrator Training",
    sector: "k12",
    description: "Mandated security training to meet state compliance requirements",
    tags: ["administrator training", "compliance requirements", "skill development"],
    results: "100% compliance achievement",
    industry: "K-12 Education",
    organization: "Texas Education Agency",
    timeline: "6 months",
    investment: "$650K",
    roiPercentage: "280%",
    keyMetrics: ["100% compliance achieved", "Administrator competency up 85%", "Security incidents down 70%"]
  },
  {
    title: "Shadow AI Detection",
    sector: "general",
    description: "Identify and secure unauthorized AI deployments before they create vulnerabilities",
    tags: ["shadow AI", "unauthorized deployments", "vulnerability prevention"],
    results: "78% reduction in unauthorized AI",
    industry: "Cross-Industry",
    organization: "Fortune 500 Financial Services",
    timeline: "10 months",
    investment: "$1.2M",
    roiPercentage: "520%",
    keyMetrics: ["78% reduction in shadow AI", "Compliance violations down 85%", "Risk score improved by 60%"]
  },
  {
    title: "Smart City Security",
    sector: "general",
    description: "Secure IoT and AI-powered smart city initiatives with specialized protection",
    tags: ["smart city", "IoT security", "urban infrastructure"],
    results: "Protected 50+ municipal systems",
    industry: "Municipal Government",
    organization: "City of Austin",
    timeline: "15 months",
    investment: "$2.8M",
    roiPercentage: "380%",
    keyMetrics: ["50+ systems secured", "Cyber attacks prevented: 100%", "Service uptime: 99.9%"]
  }
];

export default function UseCases() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSector, setSelectedSector] = useState("all");

  const filteredCases = useCases.filter(useCase => {
    const matchesSearch = useCase.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         useCase.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         useCase.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesSector = selectedSector === "all" || useCase.sector === selectedSector;
    return matchesSearch && matchesSector;
  });

  const topPerformers = useCases.sort((a, b) => parseInt(b.roiPercentage.replace('%', '')) - parseInt(a.roiPercentage.replace('%', ''))).slice(0, 3);

  const UseCaseCard = ({ useCase, topPerformer = false }: { useCase: any, topPerformer?: boolean }) => (
    <Card className={`bg-gray-800 border-gray-700 hover:border-cyan-500/50 transition-all duration-200 group ${topPerformer ? 'border-yellow-500/30' : ''}`}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            {topPerformer && (
              <Badge className="mb-2 bg-yellow-600 text-white flex items-center">
                <Award className="w-3 h-3 mr-1" />
                Top ROI
              </Badge>
            )}
            <CardTitle className="text-white group-hover:text-cyan-400 transition-colors text-lg">
              {useCase.title}
            </CardTitle>
            <CardDescription className="text-gray-300 mt-2">
              {useCase.description}
            </CardDescription>
          </div>
          <div className="ml-4 flex flex-col items-end space-y-2">
            <Badge variant="outline" className="text-yellow-400 border-yellow-400">
              {useCase.industry}
            </Badge>
            <div className="text-gray-400 text-sm">{useCase.results}</div>
            <div className="flex items-center text-green-400 text-sm font-medium">
              <TrendingUp className="w-4 h-4 mr-1" />
              {useCase.roiPercentage} ROI
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between text-gray-400 text-sm mb-3">
          <div className="flex items-center">
            <Building className="w-4 h-4 mr-1" />
            {useCase.organization}
          </div>
          <div className="flex items-center">
            <span>{useCase.timeline}</span>
            <span className="mx-2">•</span>
            <span>{useCase.investment}</span>
          </div>
        </div>

        <div className="mb-4">
          <h4 className="text-white text-sm font-medium mb-2">Key Results:</h4>
          {useCase.keyMetrics.map((metric: string, index: number) => (
            <div key={index} className="flex items-center text-gray-300 text-sm mb-1">
              <CheckCircle className="w-3 h-3 mr-2 text-green-400" />
              {metric}
            </div>
          ))}
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {useCase.tags.slice(0, 3).map((tag: string, index: number) => (
            <Badge key={index} variant="secondary" className="text-xs bg-gray-700 text-gray-300">
              {tag}
            </Badge>
          ))}
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
            {sectors.find(s => s.id === useCase.sector)?.name}
          </Badge>
          <Button size="sm" variant="outline" className="border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black">
            <ExternalLink className="w-4 h-4 mr-1" />
            Read Full Case
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
            Success Stories & Use Cases
          </h1>
          <p className="text-gray-400 text-lg mb-6">
            Real-world implementations and measurable results from CyberSecure AI deployments
          </p>
          
          {/* Use Case Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-cyan-400">{useCases.length}</div>
                <div className="text-sm text-gray-400">Success Stories</div>
              </CardContent>
            </Card>
            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-400">{Math.round(useCases.reduce((acc, useCase) => acc + parseInt(useCase.roiPercentage.replace('%', '')), 0) / useCases.length)}%</div>
                <div className="text-sm text-gray-400">Average ROI</div>
              </CardContent>
            </Card>
            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-yellow-400">{new Set(useCases.map(useCase => useCase.organization)).size}</div>
                <div className="text-sm text-gray-400">Organizations</div>
              </CardContent>
            </Card>
            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-400">{sectors.length - 1}</div>
                <div className="text-sm text-gray-400">Sectors Served</div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Top Performers */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">Top ROI Performers</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {topPerformers.map((useCase, index) => (
              <UseCaseCard key={index} useCase={useCase} topPerformer={true} />
            ))}
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search use cases..."
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

        {/* All Use Cases */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">All Success Stories</h2>
          <Badge variant="outline" className="text-cyan-400 border-cyan-400">
            {filteredCases.length} cases
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCases.map((useCase, index) => (
            <UseCaseCard key={index} useCase={useCase} />
          ))}
        </div>

        {filteredCases.length === 0 && (
          <div className="text-center py-12">
            <Star className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <div className="text-gray-400 text-lg mb-2">No use cases found</div>
            <div className="text-gray-500">Try adjusting your search or filter criteria</div>
          </div>
        )}
      </div>
    </div>
  );
}