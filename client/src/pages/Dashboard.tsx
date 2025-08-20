import { useQuery } from "@tanstack/react-query";
import { DashboardCard } from "@/components/DashboardCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Shield, AlertTriangle, Server, ClipboardCheck, Eye, Search, Bell, Plus, FileText, Upload, Share, Wifi, Download } from "lucide-react";
import type { DashboardStats } from "@/types";

export default function Dashboard() {
  const { data: stats, isLoading } = useQuery<DashboardStats>({
    queryKey: ["/api/dashboard/stats"],
  });

  const { data: complianceReports = [] } = useQuery<any[]>({
    queryKey: ["/api/compliance"],
  });

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-surface rounded w-1/4 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-32 bg-surface rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const getThreatLevelColor = (level: string) => {
    switch (level) {
      case "LOW": return "success";
      case "MEDIUM": return "warning";
      case "HIGH": return "error";
      case "CRITICAL": return "error";
      default: return "info";
    }
  };

  return (
    <div>
      {/* Header */}
      <header className="bg-surface border-b border-surface-light p-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Security Dashboard</h2>
            <p className="text-gray-400">Real-time threat monitoring and system status</p>
          </div>
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative">
              <Input
                type="text"
                placeholder="Search threats, users, files..."
                className="bg-background border-surface-light pl-10 w-80 text-sm focus:border-interactive"
                data-testid="dashboard-search"
              />
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            </div>
            
            {/* Notifications */}
            <div className="relative">
              <Button variant="ghost" size="icon" className="relative text-gray-400 hover:text-white" data-testid="notifications-button">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-critical text-xs rounded-full flex items-center justify-center">3</span>
              </Button>
            </div>

            {/* Quick Actions */}
            <Button className="bg-interactive hover:bg-orange-600" data-testid="new-incident-button">
              <Plus className="w-4 h-4 mr-2" />
              New Incident
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        {/* Security Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <DashboardCard
            title="Current Threat Level"
            value={stats?.threatLevel || "LOW"}
            description="Current Threat Level"
            icon={<Shield className="w-6 h-6" />}
            status={getThreatLevelColor(stats?.threatLevel || "LOW") as any}
            trend={{ value: "12% from yesterday", isPositive: true }}
          />

          <DashboardCard
            title="Active Incidents"
            value={stats?.activeIncidents || 0}
            description="Active Incidents"
            icon={<AlertTriangle className="w-6 h-6" />}
            status="warning"
            trend={{ value: "2 require attention", isPositive: false }}
          />

          <DashboardCard
            title="Protected Assets"
            value={stats?.protectedAssets?.toLocaleString() || "1,247"}
            description="Protected Assets"
            icon={<Server className="w-6 h-6" />}
            status="info"
            trend={{ value: "100% coverage", isPositive: true }}
          />

          <DashboardCard
            title="Compliance Score"
            value={`${stats?.complianceScore || 98}%`}
            description="Compliance Score"
            icon={<ClipboardCheck className="w-6 h-6" />}
            status="success"
            trend={{ value: "2.1% improvement", isPositive: true }}
          />
        </div>

        {/* Threat Monitoring and Network Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Real-time Threats */}
          <Card className="bg-surface glow-border">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-bold">Real-time Threat Detection</CardTitle>
                <Button variant="ghost" size="icon" className="text-interactive hover:text-orange-400">
                  <Eye className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="relative h-64 bg-background rounded-lg p-4 mb-4">
                <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                  <span>Threats Detected: 24h</span>
                  <Badge variant="outline" className="text-success border-success">All Blocked</Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 bg-surface/50 rounded">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-critical rounded-full threat-pulse"></div>
                      <span className="text-sm">Malware Attempt</span>
                    </div>
                    <span className="text-xs text-gray-400">2 min ago</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-surface/50 rounded">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-interactive rounded-full"></div>
                      <span className="text-sm">Phishing Email</span>
                    </div>
                    <span className="text-xs text-gray-400">15 min ago</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-surface/50 rounded">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-success rounded-full"></div>
                      <span className="text-sm">Login Anomaly</span>
                    </div>
                    <span className="text-xs text-gray-400">1 hour ago</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">
                  AI Detection Rate: <span className="text-success font-medium">98.7%</span>
                </span>
                <Button variant="link" className="text-interactive text-sm">View All Threats</Button>
              </div>
            </CardContent>
          </Card>

          {/* Network Activity */}
          <Card className="bg-surface glow-border">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-bold">Network Activity</CardTitle>
                <div className="flex space-x-2">
                  <Badge variant="default" className="bg-interactive text-white">Live</Badge>
                  <Badge variant="outline" className="bg-surface-light text-gray-400">24h</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="relative h-64 bg-background rounded-lg p-4 mb-4">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-success">{stats?.networkStats?.bandwidth || "2.1 GB/s"}</div>
                    <div className="text-xs text-gray-400">Bandwidth</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-interactive">{stats?.networkStats?.connections || 847}</div>
                    <div className="text-xs text-gray-400">Active Connections</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-secondary">{stats?.networkStats?.blocked || 12}</div>
                    <div className="text-xs text-gray-400">Blocked Today</div>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Inbound Traffic</span>
                  <Badge variant="outline" className="text-success border-success">Normal</Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Outbound Traffic</span>
                  <Badge variant="outline" className="text-success border-success">Normal</Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Firewall Status</span>
                  <Badge variant="outline" className="text-success border-success">Active</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* File Sharing Section */}
        <Card className="bg-surface glow-border mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-bold">Secure File Sharing</CardTitle>
              <Button className="bg-interactive hover:bg-orange-600" data-testid="share-file-button">
                <Plus className="w-4 h-4 mr-2" />
                Share New File
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* File Upload Section */}
              <div className="bg-background rounded-lg p-6 border-2 border-dashed border-surface-light hover:border-interactive transition-colors">
                <div className="text-center">
                  <div className="w-16 h-16 bg-interactive/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Upload className="text-interactive text-2xl" />
                  </div>
                  <h4 className="font-medium mb-2">Drag and drop files or click to browse</h4>
                  <p className="text-gray-400 text-sm mb-4">All files are automatically encrypted with AES-256</p>
                  <Button variant="outline" className="bg-surface hover:bg-surface-light" data-testid="browse-files-button">
                    Browse Files
                  </Button>
                </div>
              </div>

              {/* Recent Files */}
              <div>
                <h4 className="font-medium mb-4">Recent Secure Files</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-background rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-critical/20 rounded-lg flex items-center justify-center">
                        <FileText className="text-critical" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">Q2_Financial_Report.pdf</p>
                        <p className="text-gray-400 text-xs">2.4 MB • Uploaded today</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="text-success border-success">AES-256</Badge>
                      <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                        <Share className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-background rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                        <FileText className="text-secondary" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">Security_Protocol_v2.docx</p>
                        <p className="text-gray-400 text-xs">1.2 MB • Uploaded 3 days ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="text-interactive border-interactive">Protected</Badge>
                      <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                        <Share className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Compliance Overview */}
        <Card className="bg-surface glow-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-bold">Compliance Status</CardTitle>
              <Button variant="link" className="text-interactive">View Full Report</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {complianceReports?.map((report: any) => (
                <div key={report.id} className="bg-background rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <ClipboardCheck className="text-secondary w-4 h-4" />
                      <span className="font-medium">{report.framework}</span>
                    </div>
                    <Badge 
                      variant="outline" 
                      className={`${
                        report.status === "compliant" 
                          ? "text-success border-success" 
                          : "text-interactive border-interactive"
                      }`}
                    >
                      {report.status === "compliant" ? "Compliant" : "In Progress"}
                    </Badge>
                  </div>
                  <div className="w-full bg-surface-light rounded-full h-2 mb-2">
                    <div 
                      className={`h-2 rounded-full ${
                        report.status === "compliant" ? "bg-success" : "bg-interactive"
                      }`} 
                      style={{ width: `${report.score}%` }}
                    ></div>
                  </div>
                  <p className="text-gray-400 text-xs">
                    {report.score}% - {report.recommendations}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
