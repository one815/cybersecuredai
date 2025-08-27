import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Shield, 
  CheckCircle, 
  AlertTriangle, 
  XCircle,
  FileText,
  Download,
  Eye
} from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, RadialBarChart, RadialBar, Legend } from "recharts";

interface ComplianceFramework {
  id: string;
  name: string;
  fullName: string;
  score: number;
  status: "compliant" | "partial" | "non-compliant";
  requirements: {
    total: number;
    completed: number;
    inProgress: number;
    notStarted: number;
  };
  lastAudit: string;
  nextAudit: string;
}

export function CompliancePostureRadialChart() {
  const [selectedFramework, setSelectedFramework] = useState<string | null>(null);

  // Fetch compliance frameworks data
  const { data: complianceData, isLoading } = useQuery<{
    frameworks: ComplianceFramework[];
    overallScore: number;
    riskLevel: "low" | "medium" | "high";
  }>({
    queryKey: ["/api/compliance/posture"],
    refetchInterval: 300000, // Refresh every 5 minutes
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "compliant": return "#22c55e";
      case "partial": return "#eab308";
      case "non-compliant": return "#ef4444";
      default: return "#6b7280";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "compliant": return <CheckCircle className="w-4 h-4 text-green-400" />;
      case "partial": return <AlertTriangle className="w-4 h-4 text-yellow-400" />;
      case "non-compliant": return <XCircle className="w-4 h-4 text-red-400" />;
      default: return <Shield className="w-4 h-4 text-gray-400" />;
    }
  };

  // Prepare data for radial chart
  const radialData = complianceData?.frameworks?.map(framework => ({
    name: framework.name,
    score: framework.score,
    fill: getStatusColor(framework.status)
  })) || [];

  // Prepare data for overall compliance pie chart
  const overallData = complianceData?.frameworks ? [
    {
      name: "Compliant",
      value: complianceData.frameworks.filter(f => f.status === "compliant").length,
      fill: "#22c55e"
    },
    {
      name: "Partial",
      value: complianceData.frameworks.filter(f => f.status === "partial").length,
      fill: "#eab308"
    },
    {
      name: "Non-Compliant",
      value: complianceData.frameworks.filter(f => f.status === "non-compliant").length,
      fill: "#ef4444"
    }
  ] : [];

  if (isLoading) {
    return (
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Shield className="w-5 h-5 mr-2" />
            Compliance Posture Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const selectedFrameworkData = complianceData?.frameworks?.find(f => f.id === selectedFramework);

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-white flex items-center">
            <Shield className="w-5 h-5 mr-2" />
            Compliance Posture Analysis
            <Badge className="ml-2 bg-green-600 text-white">Real-time</Badge>
          </CardTitle>
          
          <div className="flex items-center space-x-2">
            <Badge 
              className={`${
                complianceData?.riskLevel === "low" ? "bg-green-600" :
                complianceData?.riskLevel === "medium" ? "bg-yellow-600" : "bg-red-600"
              } text-white`}
            >
              {complianceData?.riskLevel?.toUpperCase()} Risk
            </Badge>
            <Button size="sm" variant="outline" className="border-gray-600">
              <Download className="w-4 h-4 mr-1" />
              Export
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Radial Chart */}
          <div className="bg-gray-900 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-medium">Framework Compliance Scores</h3>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{complianceData?.overallScore}%</div>
                <div className="text-xs text-gray-400">Overall Score</div>
              </div>
            </div>
            
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart 
                  data={radialData} 
                  innerRadius="20%" 
                  outerRadius="80%"
                  startAngle={90}
                  endAngle={450}
                >
                  <RadialBar dataKey="score" cornerRadius={4} />
                  <Legend 
                    iconSize={8}
                    wrapperStyle={{ fontSize: '12px', color: '#fff' }}
                    layout="vertical"
                    verticalAlign="middle"
                    align="right"
                  />
                </RadialBarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* Overall Status Breakdown */}
          <div className="bg-gray-900 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-medium">Status Distribution</h3>
              <Badge className="bg-blue-600 text-white text-xs">
                {complianceData?.frameworks?.length || 0} Frameworks
              </Badge>
            </div>
            
            <div className="h-32 mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={overallData}
                    cx="50%"
                    cy="50%"
                    innerRadius={25}
                    outerRadius={60}
                    dataKey="value"
                  >
                    {overallData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="space-y-2">
              {overallData.map((entry, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: entry.fill }}
                    ></div>
                    <span className="text-gray-300">{entry.name}</span>
                  </div>
                  <span className="text-white font-medium">{entry.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Framework List */}
        <div className="mt-6 bg-gray-900 rounded-lg p-4">
          <h3 className="text-white font-medium mb-4">Compliance Frameworks</h3>
          <div className="space-y-3">
            {complianceData?.frameworks?.map((framework) => (
              <div 
                key={framework.id} 
                className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                  selectedFramework === framework.id 
                    ? 'border-blue-500 bg-blue-900/20' 
                    : 'border-gray-700 hover:border-gray-600'
                }`}
                onClick={() => setSelectedFramework(
                  selectedFramework === framework.id ? null : framework.id
                )}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(framework.status)}
                    <div>
                      <div className="text-white font-medium">{framework.name}</div>
                      <div className="text-xs text-gray-400">{framework.fullName}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="text-right">
                      <div className="text-white font-bold">{framework.score}%</div>
                      <div className="text-xs text-gray-400">
                        {framework.requirements.completed}/{framework.requirements.total} completed
                      </div>
                    </div>
                    
                    <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                
                {selectedFramework === framework.id && (
                  <div className="mt-4 pt-4 border-t border-gray-700">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="text-center">
                        <div className="text-lg font-bold text-green-400">
                          {framework.requirements.completed}
                        </div>
                        <div className="text-xs text-gray-400">Completed</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-yellow-400">
                          {framework.requirements.inProgress}
                        </div>
                        <div className="text-xs text-gray-400">In Progress</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-red-400">
                          {framework.requirements.notStarted}
                        </div>
                        <div className="text-xs text-gray-400">Not Started</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-blue-400">
                          {framework.requirements.total}
                        </div>
                        <div className="text-xs text-gray-400">Total</div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Progress:</span>
                        <span className="text-white">{framework.score}%</span>
                      </div>
                      <Progress value={framework.score} className="h-2" />
                      
                      <div className="flex justify-between text-xs text-gray-400">
                        <span>Last Audit: {new Date(framework.lastAudit).toLocaleDateString()}</span>
                        <span>Next Audit: {new Date(framework.nextAudit).toLocaleDateString()}</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-end mt-4">
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        <FileText className="w-3 h-3 mr-1" />
                        View Details
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}