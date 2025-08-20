import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ClipboardCheck, 
  GraduationCap, 
  Flag, 
  Shield, 
  AlertTriangle, 
  Check, 
  Building2, 
  FileText, 
  Users, 
  Database,
  Lock,
  Eye,
  Download,
  RefreshCw,
  Calendar,
  Target
} from "lucide-react";
import { useState } from "react";

export default function Compliance() {
  const { data: complianceReports = [], isLoading } = useQuery<any[]>({
    queryKey: ["/api/compliance"],
  });

  const [educationCompliance] = useState([
    {
      framework: "FERPA",
      name: "Family Educational Rights and Privacy Act",
      sector: "Education",
      score: 94,
      status: "compliant",
      lastAudit: "2024-01-15",
      nextReview: "2024-07-15",
      controls: 24,
      compliantControls: 23,
      findings: 1,
      description: "Protects privacy of student education records"
    },
    {
      framework: "COPPA", 
      name: "Children's Online Privacy Protection Act",
      sector: "Education",
      score: 97,
      status: "compliant",
      lastAudit: "2024-01-20",
      nextReview: "2024-07-20",
      controls: 18,
      compliantControls: 18,
      findings: 0,
      description: "Protects online privacy of children under 13"
    },
    {
      framework: "CIPA",
      name: "Children's Internet Protection Act",
      sector: "Education", 
      score: 91,
      status: "compliant",
      lastAudit: "2024-01-10",
      nextReview: "2024-07-10",
      controls: 12,
      compliantControls: 11,
      findings: 1,
      description: "Requires internet safety policies and filtering"
    }
  ]);

  const [governmentCompliance] = useState([
    {
      framework: "FedRAMP",
      name: "Federal Risk and Authorization Management Program",
      sector: "Government",
      score: 89,
      status: "in_progress",
      lastAudit: "2024-01-25",
      nextReview: "2024-04-25",
      controls: 325,
      compliantControls: 289,
      findings: 36,
      description: "Cloud security authorization for federal agencies"
    },
    {
      framework: "FISMA",
      name: "Federal Information Security Management Act",
      sector: "Government",
      score: 92,
      status: "compliant",
      lastAudit: "2024-01-18",
      nextReview: "2024-07-18",
      controls: 218,
      compliantControls: 201,
      findings: 17,
      description: "Information security framework for federal agencies"
    },
    {
      framework: "NIST 800-53",
      name: "Security Controls for Federal Information Systems",
      sector: "Government",
      score: 88,
      status: "in_progress", 
      lastAudit: "2024-01-22",
      nextReview: "2024-04-22",
      controls: 946,
      compliantControls: 833,
      findings: 113,
      description: "Comprehensive security control catalog"
    },
    {
      framework: "CMMC",
      name: "Cybersecurity Maturity Model Certification",
      sector: "Defense",
      score: 85,
      status: "in_progress",
      lastAudit: "2024-01-28",
      nextReview: "2024-04-28",
      controls: 171,
      compliantControls: 145,
      findings: 26,
      description: "DoD contractor cybersecurity certification"
    },
    {
      framework: "NIST 800-171",
      name: "Protecting Controlled Unclassified Information",
      sector: "Defense",
      score: 87,
      status: "in_progress",
      lastAudit: "2024-01-30",
      nextReview: "2024-04-30",
      controls: 110,
      compliantControls: 96,
      findings: 14,
      description: "CUI protection requirements for contractors"
    }
  ]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "compliant": return <Check className="text-green-400" />;
      case "in_progress": return <AlertTriangle className="text-yellow-400" />;
      case "non_compliant": return <AlertTriangle className="text-red-400" />;
      default: return <ClipboardCheck className="text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "compliant": return "text-green-400 border-green-500/30 bg-green-900/20";
      case "in_progress": return "text-yellow-400 border-yellow-500/30 bg-yellow-900/20";
      case "non_compliant": return "text-red-400 border-red-500/30 bg-red-900/20";
      default: return "text-gray-400 border-gray-500/30 bg-gray-900/20";
    }
  };

  const getFrameworkIcon = (framework: string) => {
    switch (framework) {
      case "FERPA": 
      case "COPPA":
      case "CIPA": return <GraduationCap className="text-blue-400" />;
      case "FedRAMP":
      case "FISMA": 
      case "NIST 800-53": return <Flag className="text-purple-400" />;
      case "CMMC":
      case "NIST 800-171": return <Shield className="text-orange-400" />;
      default: return <ClipboardCheck className="text-gray-400" />;
    }
  };

  const getSectorColor = (sector: string) => {
    switch (sector) {
      case "Education": return "bg-blue-600";
      case "Government": return "bg-purple-600";
      case "Defense": return "bg-orange-600";
      default: return "bg-gray-600";
    }
  };

  const allCompliance = [...educationCompliance, ...governmentCompliance];
  const overallScore = allCompliance.length > 0 ? 
    Math.round(allCompliance.reduce((sum, report) => sum + report.score, 0) / allCompliance.length) : 0;

  if (isLoading) {
    return (
      <div className="ai-dashboard-bg min-h-screen p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-surface rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-32 bg-surface rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="ai-dashboard-bg min-h-screen">
      {/* Header */}
      <header className="bg-surface/90 backdrop-blur-md border-b border-surface-light p-6 cyber-glow">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg flex items-center justify-center">
                <ClipboardCheck className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                  Compliance Management
                </h2>
                <p className="text-gray-400">Monitor regulatory compliance across education and government frameworks</p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className="text-3xl font-bold text-green-400">{overallScore}%</div>
              <div className="text-sm text-gray-400">Overall Compliance</div>
            </div>
            <Button variant="outline" className="border-green-500 text-green-400" data-testid="refresh-compliance">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
            <Button className="bg-green-600 hover:bg-green-700" data-testid="generate-report">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>
      </header>

      <main className="p-6">
        {/* Compliance Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-surface/80 backdrop-blur-md border border-green-500/30 cyber-glow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <GraduationCap className="w-8 h-8 text-blue-400" />
                <Badge className="bg-blue-600">Education</Badge>
              </div>
              <div className="text-3xl font-bold text-white mb-2">3</div>
              <div className="text-sm text-gray-400">Frameworks</div>
              <div className="text-xs text-blue-400 mt-1">FERPA, COPPA, CIPA</div>
            </CardContent>
          </Card>

          <Card className="bg-surface/80 backdrop-blur-md border border-purple-500/30 cyber-glow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Flag className="w-8 h-8 text-purple-400" />
                <Badge className="bg-purple-600">Government</Badge>
              </div>
              <div className="text-3xl font-bold text-white mb-2">5</div>
              <div className="text-sm text-gray-400">Frameworks</div>
              <div className="text-xs text-purple-400 mt-1">FedRAMP, FISMA, NIST</div>
            </CardContent>
          </Card>

          <Card className="bg-surface/80 backdrop-blur-md border border-yellow-500/30 cyber-glow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <AlertTriangle className="w-8 h-8 text-yellow-400" />
                <Badge className="bg-yellow-600">Action Required</Badge>
              </div>
              <div className="text-3xl font-bold text-white mb-2">207</div>
              <div className="text-sm text-gray-400">Open Findings</div>
              <div className="text-xs text-yellow-400 mt-1">36 high priority</div>
            </CardContent>
          </Card>

          <Card className="bg-surface/80 backdrop-blur-md border border-cyan-500/30 cyber-glow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Calendar className="w-8 h-8 text-cyan-400" />
                <Badge className="bg-cyan-600">Upcoming</Badge>
              </div>
              <div className="text-3xl font-bold text-white mb-2">4</div>
              <div className="text-sm text-gray-400">Reviews Due</div>
              <div className="text-xs text-cyan-400 mt-1">Next 90 days</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="education" className="space-y-6">
          <TabsList className="bg-surface border border-surface-light">
            <TabsTrigger value="education" className="data-[state=active]:bg-blue-600">
              <GraduationCap className="w-4 h-4 mr-2" />
              Education Sector
            </TabsTrigger>
            <TabsTrigger value="government" className="data-[state=active]:bg-purple-600">
              <Flag className="w-4 h-4 mr-2" />
              Government Sector  
            </TabsTrigger>
            <TabsTrigger value="federal" className="data-[state=active]:bg-orange-600">
              <Shield className="w-4 h-4 mr-2" />
              Defense/Federal
            </TabsTrigger>
            <TabsTrigger value="overview" className="data-[state=active]:bg-green-600">
              <Target className="w-4 h-4 mr-2" />
              Executive Overview
            </TabsTrigger>
          </TabsList>

          {/* Education Sector Compliance */}
          <TabsContent value="education" className="space-y-6">
            <Card className="bg-surface/80 backdrop-blur-md border border-blue-500/30 cyber-glow">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-white">Education Sector Compliance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {educationCompliance.map((framework, index) => (
                    <Card key={index} className={`bg-background/50 border ${
                      framework.status === 'compliant' ? 'border-green-500/30' : 
                      framework.status === 'in_progress' ? 'border-yellow-500/30' : 'border-red-500/30'
                    }`}>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-2">
                            {getFrameworkIcon(framework.framework)}
                            <span className="font-medium text-white">{framework.framework}</span>
                          </div>
                          <Badge className={getSectorColor(framework.sector)}>
                            {framework.sector}
                          </Badge>
                        </div>
                        
                        <h3 className="text-sm font-medium text-white mb-2">{framework.name}</h3>
                        <p className="text-xs text-gray-400 mb-4">{framework.description}</p>

                        <div className="space-y-3">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Compliance Score:</span>
                            <span className={framework.score >= 90 ? 'text-green-400' : 
                                          framework.score >= 80 ? 'text-yellow-400' : 'text-red-400'}>
                              {framework.score}%
                            </span>
                          </div>
                          <Progress value={framework.score} className="h-2" />
                          
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Controls:</span>
                            <span className="text-white">{framework.compliantControls}/{framework.controls}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Open Findings:</span>
                            <span className={framework.findings > 0 ? 'text-red-400' : 'text-green-400'}>
                              {framework.findings}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Last Audit:</span>
                            <span className="text-white">{framework.lastAudit}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Next Review:</span>
                            <span className="text-cyan-400">{framework.nextReview}</span>
                          </div>
                        </div>
                        
                        <div className="mt-4 flex space-x-2">
                          <Button size="sm" variant="outline" className="flex-1">
                            View Details
                          </Button>
                          <Button size="sm" variant="ghost" className="text-gray-400">
                            <FileText className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Government Sector Compliance */}
          <TabsContent value="government" className="space-y-6">
            <Card className="bg-surface/80 backdrop-blur-md border border-purple-500/30 cyber-glow">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-white">Government Sector Compliance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {governmentCompliance.filter(f => f.sector === 'Government').map((framework, index) => (
                    <Card key={index} className={`bg-background/50 border ${
                      framework.status === 'compliant' ? 'border-green-500/30' : 
                      framework.status === 'in_progress' ? 'border-yellow-500/30' : 'border-red-500/30'
                    }`}>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-2">
                            {getFrameworkIcon(framework.framework)}
                            <span className="font-medium text-white">{framework.framework}</span>
                          </div>
                          <Badge className={getSectorColor(framework.sector)}>
                            {framework.sector}
                          </Badge>
                        </div>
                        
                        <h3 className="text-sm font-medium text-white mb-2">{framework.name}</h3>
                        <p className="text-xs text-gray-400 mb-4">{framework.description}</p>

                        <div className="space-y-3">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Compliance Score:</span>
                            <span className={framework.score >= 90 ? 'text-green-400' : 
                                          framework.score >= 80 ? 'text-yellow-400' : 'text-red-400'}>
                              {framework.score}%
                            </span>
                          </div>
                          <Progress value={framework.score} className="h-2" />
                          
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Controls:</span>
                            <span className="text-white">{framework.compliantControls}/{framework.controls}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Open Findings:</span>
                            <span className={framework.findings > 0 ? 'text-red-400' : 'text-green-400'}>
                              {framework.findings}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Last Audit:</span>
                            <span className="text-white">{framework.lastAudit}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Next Review:</span>
                            <span className="text-cyan-400">{framework.nextReview}</span>
                          </div>
                        </div>
                        
                        <div className="mt-4 flex space-x-2">
                          <Button size="sm" variant="outline" className="flex-1">
                            View Details
                          </Button>
                          <Button size="sm" variant="ghost" className="text-gray-400">
                            <FileText className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Defense/Federal Compliance */}
          <TabsContent value="federal" className="space-y-6">
            <Card className="bg-surface/80 backdrop-blur-md border border-orange-500/30 cyber-glow">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-white">Defense & Federal Compliance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {governmentCompliance.filter(f => f.sector === 'Defense').map((framework, index) => (
                    <Card key={index} className={`bg-background/50 border ${
                      framework.status === 'compliant' ? 'border-green-500/30' : 
                      framework.status === 'in_progress' ? 'border-yellow-500/30' : 'border-red-500/30'
                    }`}>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-2">
                            {getFrameworkIcon(framework.framework)}
                            <span className="font-medium text-white">{framework.framework}</span>
                          </div>
                          <Badge className={getSectorColor(framework.sector)}>
                            {framework.sector}
                          </Badge>
                        </div>
                        
                        <h3 className="text-sm font-medium text-white mb-2">{framework.name}</h3>
                        <p className="text-xs text-gray-400 mb-4">{framework.description}</p>

                        <div className="space-y-3">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Compliance Score:</span>
                            <span className={framework.score >= 90 ? 'text-green-400' : 
                                          framework.score >= 80 ? 'text-yellow-400' : 'text-red-400'}>
                              {framework.score}%
                            </span>
                          </div>
                          <Progress value={framework.score} className="h-2" />
                          
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Controls:</span>
                            <span className="text-white">{framework.compliantControls}/{framework.controls}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Open Findings:</span>
                            <span className={framework.findings > 0 ? 'text-red-400' : 'text-green-400'}>
                              {framework.findings}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Last Audit:</span>
                            <span className="text-white">{framework.lastAudit}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Next Review:</span>
                            <span className="text-cyan-400">{framework.nextReview}</span>
                          </div>
                        </div>
                        
                        <div className="mt-4 flex space-x-2">
                          <Button size="sm" variant="outline" className="flex-1">
                            View Details
                          </Button>
                          <Button size="sm" variant="ghost" className="text-gray-400">
                            <FileText className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <Card className="bg-background/50 border border-orange-500/30 mt-6">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-medium text-white mb-4">DCMA & Federal Contract Compliance</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-400 mb-2">87%</div>
                        <div className="text-sm text-gray-400">CUI Protection</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-yellow-400 mb-2">85%</div>
                        <div className="text-sm text-gray-400">CMMC Level 3</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-400 mb-2">92%</div>
                        <div className="text-sm text-gray-400">FAR/DFARS</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Executive Overview */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-surface/80 backdrop-blur-md border border-green-500/30 cyber-glow">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-white">Compliance Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-green-400 mb-2">{overallScore}%</div>
                      <div className="text-sm text-gray-400">Overall Compliance Score</div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Education Frameworks:</span>
                        <span className="text-blue-400">94% avg</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Government Frameworks:</span>
                        <span className="text-purple-400">90% avg</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Defense Frameworks:</span>
                        <span className="text-orange-400">86% avg</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-surface/80 backdrop-blur-md border border-red-500/30 cyber-glow">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-white">Priority Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 bg-red-900/20 rounded-lg border border-red-600/50">
                      <div className="text-sm text-red-400 font-medium">High Priority</div>
                      <div className="text-xs text-gray-400">NIST 800-53 - 113 open findings</div>
                    </div>
                    <div className="p-3 bg-yellow-900/20 rounded-lg border border-yellow-600/50">
                      <div className="text-sm text-yellow-400 font-medium">Medium Priority</div>
                      <div className="text-xs text-gray-400">FedRAMP - 36 control gaps</div>
                    </div>
                    <div className="p-3 bg-orange-900/20 rounded-lg border border-orange-600/50">
                      <div className="text-sm text-orange-400 font-medium">Upcoming Review</div>
                      <div className="text-xs text-gray-400">CMMC Level 3 - Q2 2024</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}