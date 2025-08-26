import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { 
  ChartBar, 
  Download, 
  FileText, 
  TrendingUp, 
  TrendingDown, 
  Shield, 
  AlertTriangle, 
  Users, 
  Server,
  Calendar,
  Filter
} from "lucide-react";
import securityReportImg from "@assets/generated_images/Security_Report_Analysis_a04e4b7e.png";
import complianceReportImg from "@assets/generated_images/Compliance_Audit_Report_c7bd1ed8.png";
import userActivityReportImg from "@assets/generated_images/User_Activity_Analytics_Report_3cf64d91.png";
import infrastructureReportImg from "@assets/generated_images/Infrastructure_Health_Report_51e19268.png";

export default function Reports() {
  const { toast } = useToast();
  
  const { data: dashboardStats = {} } = useQuery<any>({
    queryKey: ["/api/dashboard/stats"],
  });

  const { data: threats = [] } = useQuery<any[]>({
    queryKey: ["/api/threats"],
  });

  const { data: users = [] } = useQuery<any[]>({
    queryKey: ["/api/users"],
  });

  const { data: complianceReports = [] } = useQuery<any[]>({
    queryKey: ["/api/compliance/frameworks"],
  });

  const { data: incidents = [] } = useQuery<any[]>({
    queryKey: ["/api/incidents"],
  });

  // Generate report data
  const generateReportMetrics = () => {
    const totalThreats = threats?.length || 0;
    const resolvedThreats = threats?.filter((t: any) => t.status === "resolved").length || 0;
    const activeUsers = users?.filter((u: any) => u.isActive).length || 0;
    const mfaEnabledUsers = users?.filter((u: any) => u.mfaEnabled).length || 0;
    const openIncidents = incidents?.filter((i: any) => i.status === "open").length || 0;
    
    return {
      securityMetrics: {
        threatDetectionRate: totalThreats > 0 ? Math.round((resolvedThreats / totalThreats) * 100) : 100,
        mfaAdoption: users?.length ? Math.round((mfaEnabledUsers / users.length) * 100) : 0,
        systemUptime: 99.8,
        incidentResponseTime: "2.3 hours",
      },
      complianceMetrics: {
        overallScore: complianceReports ? 
          Math.round(complianceReports.reduce((sum: number, report: any) => sum + report.score, 0) / complianceReports.length) : 0,
        frameworks: complianceReports?.length || 0,
        criticalFindings: complianceReports?.filter((r: any) => r.status !== "compliant").length || 0,
      },
      userMetrics: {
        totalUsers: users?.length || 0,
        activeUsers,
        newUsersThisMonth: Math.floor((users?.length || 0) * 0.15), // Mock 15% growth
        passwordResets: Math.floor((users?.length || 0) * 0.05), // Mock 5% password resets
      }
    };
  };

  const reportMetrics = generateReportMetrics();

  // Report generation mutation
  const generateReportMutation = useMutation({
    mutationFn: async (reportType: string) => {
      const response = await apiRequest('POST', `/api/reports/generate/${reportType}`);
      return await response.json();
    },
    onSuccess: (data, reportType) => {
      console.log('Report generation success:', data);
      const reportTitle = data.report?.title || `${reportType} report`;
      
      // Add the generated report to our list
      if (data.report) {
        console.log('Adding report to state:', data.report);
        setGeneratedReports(prev => {
          const newReports = [data.report, ...prev.slice(0, 4)]; // Keep last 5 reports
          console.log('Updated reports state:', newReports);
          return newReports;
        });
      }
      
      toast({
        title: "Report Generated Successfully",
        description: `${reportTitle} has been created and is ready for download.`,
        action: (
          <button 
            onClick={() => downloadReport(data.report?.id)}
            className="bg-orange-600 hover:bg-orange-700 text-white px-3 py-1 rounded text-sm"
          >
            Download Now
          </button>
        ),
      });
      queryClient.invalidateQueries({ queryKey: ["/api/reports"] });
    },
    onError: (error) => {
      console.error('Report generation error:', error);
      toast({
        title: "Report Generation Failed",
        description: error.message || "Failed to generate report. Please try again.",
        variant: "destructive"
      });
    }
  });

  // Download report function
  const downloadReport = async (reportId: string) => {
    try {
      const response = await fetch(`/api/reports/download/${reportId}`);
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${reportId}-report.pdf`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        toast({
          title: "Download Started",
          description: "Report download has started."
        });
      } else {
        throw new Error('Download failed');
      }
    } catch (error) {
      toast({
        title: "Download Failed", 
        description: "Failed to download report. Please try again.",
        variant: "destructive"
      });
    }
  };

  // State to track generated reports
  const [generatedReports, setGeneratedReports] = useState<Array<{
    id: string;
    title: string;
    type: string;
    generatedAt: string;
    downloadUrl: string;
  }>>([]);

  // Handle report generation button click
  const handleGenerateReport = (reportType?: string) => {
    const type = reportType || 'comprehensive';
    generateReportMutation.mutate(type);
  };

  const reportCategories = [
    {
      id: "security",
      title: "Security Report",
      description: "Comprehensive security analysis and threat assessment",
      icon: <Shield className="w-6 h-6" />,
      image: securityReportImg,
      lastGenerated: "Today, 09:30 AM",
      status: "up-to-date",
      metrics: [
        { label: "Threat Detection Rate", value: `${reportMetrics.securityMetrics.threatDetectionRate}%`, trend: "up" },
        { label: "System Uptime", value: `${reportMetrics.securityMetrics.systemUptime}%`, trend: "stable" },
        { label: "Avg Response Time", value: reportMetrics.securityMetrics.incidentResponseTime, trend: "down" },
      ]
    },
    {
      id: "compliance",
      title: "Compliance Report",
      description: "Regulatory compliance status and audit findings",
      icon: <FileText className="w-6 h-6" />,
      image: complianceReportImg,
      lastGenerated: "Yesterday, 11:45 AM",
      status: "pending",
      metrics: [
        { label: "Overall Compliance", value: `${reportMetrics.complianceMetrics.overallScore}%`, trend: "up" },
        { label: "Active Frameworks", value: reportMetrics.complianceMetrics.frameworks, trend: "stable" },
        { label: "Critical Findings", value: reportMetrics.complianceMetrics.criticalFindings, trend: "down" },
      ]
    },
    {
      id: "users",
      title: "User Activity Report",
      description: "User engagement, access patterns, and authentication metrics",
      icon: <Users className="w-6 h-6" />,
      image: userActivityReportImg,
      lastGenerated: "Today, 08:15 AM",
      status: "up-to-date",
      metrics: [
        { label: "Active Users", value: reportMetrics.userMetrics.activeUsers, trend: "up" },
        { label: "MFA Adoption", value: `${reportMetrics.securityMetrics.mfaAdoption}%`, trend: "up" },
        { label: "New Users (30d)", value: reportMetrics.userMetrics.newUsersThisMonth, trend: "up" },
      ]
    },
    {
      id: "infrastructure",
      title: "Infrastructure Report",
      description: "System performance, capacity, and infrastructure health",
      icon: <Server className="w-6 h-6" />,
      image: infrastructureReportImg,
      lastGenerated: "Today, 06:00 AM",
      status: "up-to-date",
      metrics: [
        { label: "Protected Assets", value: dashboardStats?.protectedAssets?.toLocaleString() || "1,247", trend: "stable" },
        { label: "Network Connections", value: dashboardStats?.networkStats?.connections || 847, trend: "up" },
        { label: "Blocked Threats", value: dashboardStats?.networkStats?.blocked || 12, trend: "down" },
      ]
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "up-to-date": return "text-success border-success";
      case "pending": return "text-interactive border-interactive";
      case "outdated": return "text-critical border-critical";
      default: return "text-gray-500 border-gray-500";
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up": return <TrendingUp className="w-4 h-4 text-success" />;
      case "down": return <TrendingDown className="w-4 h-4 text-critical" />;
      default: return <div className="w-4 h-4 bg-interactive rounded-full"></div>;
    }
  };

  return (
    <div>
      {/* Header */}
      <header className="bg-surface border-b border-surface-light p-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold flex items-center space-x-2">
              <span>Reports & Analytics</span>
              <ChartBar className="w-6 h-6 text-blue-400" />
              <FileText className="w-6 h-6 text-green-400" />
              <TrendingUp className="w-6 h-6 text-purple-400" />
            </h2>
            <p className="text-gray-400">Generate comprehensive security and compliance reports</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" className="border-surface-light" data-testid="filter-reports">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button 
              className="bg-interactive hover:bg-orange-600" 
              data-testid="generate-report"
              onClick={() => handleGenerateReport()}
              disabled={generateReportMutation.isPending}
            >
              <FileText className="w-4 h-4 mr-2" />
              {generateReportMutation.isPending ? 'Generating...' : 'Generate Report'}
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        {/* Executive Summary */}
        <Card className="bg-surface glow-border mb-8">
          <CardHeader>
            <CardTitle>Executive Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-background rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 text-sm">Security Posture</span>
                  <Shield className="w-5 h-5 text-success" />
                </div>
                <div className="text-2xl font-bold text-success mb-1">Strong</div>
                <div className="text-xs text-gray-400">
                  {reportMetrics.securityMetrics.threatDetectionRate}% threat detection rate
                </div>
              </div>

              <div className="bg-background rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 text-sm">Compliance Status</span>
                  <FileText className="w-5 h-5 text-success" />
                </div>
                <div className="text-2xl font-bold text-success mb-1">{reportMetrics.complianceMetrics.overallScore}%</div>
                <div className="text-xs text-gray-400">
                  {reportMetrics.complianceMetrics.frameworks} frameworks monitored
                </div>
              </div>

              <div className="bg-background rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 text-sm">User Engagement</span>
                  <Users className="w-5 h-5 text-interactive" />
                </div>
                <div className="text-2xl font-bold text-interactive mb-1">{reportMetrics.userMetrics.activeUsers}</div>
                <div className="text-xs text-gray-400">
                  Active users from {reportMetrics.userMetrics.totalUsers} total
                </div>
              </div>

              <div className="bg-background rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 text-sm">System Health</span>
                  <Server className="w-5 h-5 text-success" />
                </div>
                <div className="text-2xl font-bold text-success mb-1">{reportMetrics.securityMetrics.systemUptime}%</div>
                <div className="text-xs text-gray-400">
                  Uptime last 30 days
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Downloads */}
        {true && (
          <Card className="border-green-500/20 bg-green-500/5 mb-6">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg text-green-700 dark:text-green-400">
                <Download className="w-5 h-5" />
                Recent Downloads
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {generatedReports.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No reports generated yet. Generate a report to see downloads here.</p>
                ) : generatedReports.map((report, index) => (
                  <div key={report.id} className="flex items-center justify-between p-3 bg-background rounded-lg border">
                    <div className="flex items-center gap-3">
                      <FileText className="w-4 h-4 text-blue-500" />
                      <div>
                        <p className="font-medium text-sm">{report.title}</p>
                        <p className="text-xs text-muted-foreground">
                          Generated: {new Date(report.generatedAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <Button
                      onClick={() => downloadReport(report.id)}
                      size="sm"
                      className="bg-green-600 hover:bg-green-700 text-white"
                      data-testid={`download-recent-${report.id}`}
                    >
                      <Download className="w-4 h-4 mr-1" />
                      Download PDF
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Report Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {reportCategories.map((category) => (
            <Card key={category.id} className="bg-surface glow-border">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-interactive/20 rounded-lg flex items-center justify-center overflow-hidden">
                      {category.image ? (
                        <img 
                          src={category.image} 
                          alt={category.title}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        category.icon
                      )}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{category.title}</CardTitle>
                      <p className="text-gray-400 text-sm">{category.description}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className={getStatusColor(category.status)}>
                    {category.status.replace('-', ' ')}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {category.metrics.map((metric, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-background rounded-lg">
                      <div className="flex items-center space-x-3">
                        {getTrendIcon(metric.trend)}
                        <span className="text-sm font-medium">{metric.label}</span>
                      </div>
                      <span className="text-lg font-bold">{metric.value}</span>
                    </div>
                  ))}
                  
                  <div className="flex items-center justify-between pt-4 border-t border-surface-light">
                    <div className="text-sm text-gray-400">
                      <Calendar className="w-4 h-4 inline mr-1" />
                      {category.lastGenerated}
                    </div>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        data-testid={`view-${category.id}`}
                        onClick={() => handleGenerateReport(category.id)}
                        disabled={generateReportMutation.isPending}
                      >
                        {generateReportMutation.isPending ? 'Generating...' : 'View Report'}
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        data-testid={`download-${category.id}`}
                        onClick={() => downloadReport(category.id)}
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Detailed Analytics */}
        <Card className="bg-surface glow-border mb-8">
          <CardHeader>
            <CardTitle>Security Analytics Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Threat Analysis */}
              <div>
                <h4 className="font-medium mb-4">Threat Analysis (Last 30 Days)</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Malware Attempts</span>
                    <div className="flex items-center space-x-3">
                      <div className="w-24 bg-surface-light rounded-full h-2">
                        <div className="bg-critical h-2 rounded-full" style={{ width: "15%" }}></div>
                      </div>
                      <span className="text-sm font-medium">15</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Phishing Emails</span>
                    <div className="flex items-center space-x-3">
                      <div className="w-24 bg-surface-light rounded-full h-2">
                        <div className="bg-interactive h-2 rounded-full" style={{ width: "32%" }}></div>
                      </div>
                      <span className="text-sm font-medium">32</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Login Anomalies</span>
                    <div className="flex items-center space-x-3">
                      <div className="w-24 bg-surface-light rounded-full h-2">
                        <div className="bg-success h-2 rounded-full" style={{ width: "8%" }}></div>
                      </div>
                      <span className="text-sm font-medium">8</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Network Intrusions</span>
                    <div className="flex items-center space-x-3">
                      <div className="w-24 bg-surface-light rounded-full h-2">
                        <div className="bg-secondary h-2 rounded-full" style={{ width: "5%" }}></div>
                      </div>
                      <span className="text-sm font-medium">5</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Compliance Trends */}
              <div>
                <h4 className="font-medium mb-4">Compliance Trends</h4>
                <div className="space-y-4">
                  {complianceReports?.map((report: any) => (
                    <div key={report.id} className="bg-background rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">{report.framework}</span>
                        <span className="text-lg font-bold">{report.score}%</span>
                      </div>
                      <Progress value={report.score} className="h-2" />
                      <div className="flex items-center justify-between mt-2 text-xs text-gray-400">
                        <span>Last Assessment: {new Date(report.lastAssessment).toLocaleDateString()}</span>
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${
                            report.status === "compliant" ? "text-success border-success" : "text-interactive border-interactive"
                          }`}
                        >
                          {report.status === "compliant" ? "Compliant" : "In Progress"}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Report Actions */}
        <Card className="bg-surface glow-border">
          <CardHeader>
            <CardTitle>Report Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button 
                variant="outline" 
                className="justify-start h-auto p-4 border-surface-light" 
                data-testid="schedule-reports"
                onClick={() => toast({ title: "Feature Coming Soon", description: "Report scheduling will be available in the next update." })}
              >
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-interactive" />
                  <div className="text-left">
                    <div className="font-medium">Schedule Reports</div>
                    <div className="text-xs text-gray-400">Automate report generation</div>
                  </div>
                </div>
              </Button>

              <Button 
                variant="outline" 
                className="justify-start h-auto p-4 border-surface-light" 
                data-testid="export-data"
                onClick={() => downloadReport('data-export')}
              >
                <div className="flex items-center space-x-3">
                  <Download className="w-5 h-5 text-interactive" />
                  <div className="text-left">
                    <div className="font-medium">Export Data</div>
                    <div className="text-xs text-gray-400">Download raw data sets</div>
                  </div>
                </div>
              </Button>

              <Button 
                variant="outline" 
                className="justify-start h-auto p-4 border-surface-light" 
                data-testid="custom-report"
                onClick={() => handleGenerateReport('custom')}
                disabled={generateReportMutation.isPending}
              >
                <div className="flex items-center space-x-3">
                  <ChartBar className="w-5 h-5 text-interactive" />
                  <div className="text-left">
                    <div className="font-medium">Custom Report</div>
                    <div className="text-xs text-gray-400">Build custom analytics</div>
                  </div>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
