import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ClipboardCheck, GraduationCap, Flag, Shield, AlertTriangle, CheckCircle } from "lucide-react";

export default function Compliance() {
  const { data: complianceReports, isLoading } = useQuery({
    queryKey: ["/api/compliance"],
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "compliant": return <CheckCircle className="text-success" />;
      case "in_progress": return <AlertTriangle className="text-interactive" />;
      case "non_compliant": return <AlertTriangle className="text-critical" />;
      default: return <ClipboardCheck className="text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "compliant": return "text-success border-success";
      case "in_progress": return "text-interactive border-interactive";
      case "non_compliant": return "text-critical border-critical";
      default: return "text-gray-500 border-gray-500";
    }
  };

  const getFrameworkIcon = (framework: string) => {
    switch (framework) {
      case "FERPA": return <GraduationCap className="text-secondary" />;
      case "FISMA": return <Flag className="text-secondary" />;
      case "CIPA": return <Shield className="text-secondary" />;
      default: return <ClipboardCheck className="text-secondary" />;
    }
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-surface rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-32 bg-surface rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const overallScore = complianceReports ? 
    Math.round(complianceReports.reduce((sum: number, report: any) => sum + report.score, 0) / complianceReports.length) : 0;

  return (
    <div>
      {/* Header */}
      <header className="bg-surface border-b border-surface-light p-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Compliance Management</h2>
            <p className="text-gray-400">Monitor and manage regulatory compliance status</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className="text-2xl font-bold text-success">{overallScore}%</div>
              <div className="text-sm text-gray-400">Overall Score</div>
            </div>
            <Button className="bg-interactive hover:bg-orange-600" data-testid="generate-report">
              <ClipboardCheck className="w-4 h-4 mr-2" />
              Generate Report
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        {/* Compliance Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {complianceReports?.map((report: any) => (
            <Card key={report.id} className="bg-surface glow-border">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                      {getFrameworkIcon(report.framework)}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{report.framework}</CardTitle>
                      <p className="text-gray-400 text-sm">
                        {report.framework === "FERPA" && "Student Privacy Protection"}
                        {report.framework === "FISMA" && "Federal Security Standards"}
                        {report.framework === "CIPA" && "Internet Safety Compliance"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(report.status)}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Compliance Score</span>
                      <span className="text-2xl font-bold">{report.score}%</span>
                    </div>
                    <Progress value={report.score} className="h-2" />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className={getStatusColor(report.status)}>
                      {report.status === "compliant" ? "Compliant" : 
                       report.status === "in_progress" ? "In Progress" : "Non-Compliant"}
                    </Badge>
                    <span className="text-xs text-gray-400">
                      Last assessed: {new Date(report.lastAssessment).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <div className="bg-background rounded-lg p-3">
                    <h5 className="text-sm font-medium mb-1">Recommendations</h5>
                    <p className="text-gray-400 text-xs">{report.recommendations}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Detailed Compliance Report */}
        <Card className="bg-surface glow-border mb-8">
          <CardHeader>
            <CardTitle>Compliance Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {complianceReports?.map((report: any) => (
                <div key={report.id} className="border-b border-surface-light pb-6 last:border-b-0">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-semibold flex items-center space-x-3">
                      {getFrameworkIcon(report.framework)}
                      <span>{report.framework} Compliance</span>
                    </h4>
                    <Button variant="outline" size="sm" data-testid={`view-${report.framework.toLowerCase()}`}>
                      View Details
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="font-medium mb-3">Assessment Findings</h5>
                      <div className="space-y-2">
                        {Object.entries(report.findings).map(([key, value]: [string, any]) => (
                          <div key={key} className="flex items-center justify-between p-2 bg-background rounded">
                            <span className="text-sm capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                            <div className="flex items-center space-x-2">
                              {value ? (
                                <CheckCircle className="w-4 h-4 text-success" />
                              ) : (
                                <AlertTriangle className="w-4 h-4 text-critical" />
                              )}
                              <span className={`text-xs ${value ? 'text-success' : 'text-critical'}`}>
                                {value ? 'Compliant' : 'Action Required'}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h5 className="font-medium mb-3">Key Requirements</h5>
                      <div className="space-y-2 text-sm text-gray-400">
                        {report.framework === "FERPA" && (
                          <>
                            <div>• Student educational records protection</div>
                            <div>• Parental consent for information disclosure</div>
                            <div>• Directory information policies</div>
                            <div>• Annual notification requirements</div>
                          </>
                        )}
                        {report.framework === "FISMA" && (
                          <>
                            <div>• Federal information system security</div>
                            <div>• Risk assessment and authorization</div>
                            <div>• Continuous monitoring programs</div>
                            <div>• Security control implementation</div>
                          </>
                        )}
                        {report.framework === "CIPA" && (
                          <>
                            <div>• Internet filtering and monitoring</div>
                            <div>• Acceptable use policies</div>
                            <div>• Minor protection measures</div>
                            <div>• Internet safety education</div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Actions Required */}
        <Card className="bg-surface glow-border">
          <CardHeader>
            <CardTitle>Actions Required</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {complianceReports
                ?.filter((report: any) => report.status !== "compliant")
                .map((report: any) => (
                  <div key={report.id} className="flex items-center justify-between p-4 bg-background rounded-lg border border-surface-light">
                    <div className="flex items-center space-x-4">
                      <AlertTriangle className="w-6 h-6 text-interactive" />
                      <div>
                        <h4 className="font-medium">{report.framework} Compliance Gap</h4>
                        <p className="text-gray-400 text-sm">{report.recommendations}</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" data-testid={`resolve-${report.framework.toLowerCase()}`}>
                      Take Action
                    </Button>
                  </div>
                )) || (
                <div className="text-center py-8">
                  <CheckCircle className="w-16 h-16 text-success mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">All Requirements Met</h3>
                  <p className="text-gray-400">Your organization is fully compliant with all configured frameworks.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
