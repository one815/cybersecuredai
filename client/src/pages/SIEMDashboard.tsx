import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Activity, 
  AlertTriangle, 
  Database, 
  Server, 
  Monitor, 
  Search,
  Filter,
  Download,
  RefreshCw,
  Eye,
  TrendingUp,
  Zap,
  Users,
  Network,
  Clock,
  BarChart3,
  PieChart,
  LineChart
} from "lucide-react";

export default function SIEMDashboard() {
  const [siemSystems] = useState([
    {
      name: "Splunk Enterprise",
      status: "active",
      version: "9.1.2",
      eventsPerDay: "2.1M",
      dataIngestion: "85 GB/day",
      indexers: 3,
      searchHeads: 2,
      alertsToday: 247,
      criticalAlerts: 14,
      health: 98,
      uptime: "99.9%"
    },
    {
      name: "IBM QRadar",
      status: "active", 
      version: "7.5.0",
      eventsPerDay: "1.8M",
      dataIngestion: "72 GB/day",
      processors: 4,
      collectors: 8,
      alertsToday: 189,
      criticalAlerts: 8,
      health: 95,
      uptime: "99.7%"
    },
    {
      name: "LogRhythm",
      status: "warning",
      version: "7.15.1", 
      eventsPerDay: "890K",
      dataIngestion: "45 GB/day",
      mediators: 2,
      agents: 156,
      alertsToday: 94,
      criticalAlerts: 3,
      health: 87,
      uptime: "98.9%"
    }
  ]);

  const [recentAlerts] = useState([
    {
      id: "SIEM-2024-0847",
      severity: "critical",
      title: "Multiple Failed Login Attempts",
      source: "Active Directory",
      timestamp: "2 minutes ago",
      affectedAssets: 3,
      ruleTriggered: "Brute Force Detection",
      investigationStatus: "in-progress",
      assignedTo: "SOC Analyst 1"
    },
    {
      id: "SIEM-2024-0846",
      severity: "high", 
      title: "Unusual Data Exfiltration Pattern",
      source: "Network Traffic",
      timestamp: "15 minutes ago",
      affectedAssets: 1,
      ruleTriggered: "Data Loss Prevention",
      investigationStatus: "pending",
      assignedTo: "SOC Analyst 2"
    },
    {
      id: "SIEM-2024-0845",
      severity: "medium",
      title: "Privilege Escalation Attempt",
      source: "Windows Events",
      timestamp: "1 hour ago", 
      affectedAssets: 2,
      ruleTriggered: "Privilege Change Detection",
      investigationStatus: "resolved",
      assignedTo: "SOC Analyst 3"
    },
    {
      id: "SIEM-2024-0844",
      severity: "low",
      title: "New Device Connected",
      source: "Network Access Control",
      timestamp: "2 hours ago",
      affectedAssets: 1,
      ruleTriggered: "Device Discovery",
      investigationStatus: "approved",
      assignedTo: "SOC Analyst 1"
    }
  ]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical": return "bg-red-600";
      case "high": return "bg-orange-600";
      case "medium": return "bg-yellow-600";
      case "low": return "bg-blue-600";
      default: return "bg-gray-600";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "text-green-400";
      case "warning": return "text-yellow-400";
      case "error": return "text-red-400";
      default: return "text-gray-400";
    }
  };

  return (
    <div className="ai-dashboard-bg min-h-screen">
      {/* Header */}
      <header className="bg-surface/90 backdrop-blur-md border-b border-surface-light p-6 cyber-glow">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg flex items-center justify-center">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent flex items-center space-x-2">
                  <span>SIEM Dashboard</span>
                  <Activity className="w-6 h-6 text-green-400" />
                  <Database className="w-6 h-6 text-blue-400" />
                  <Monitor className="w-6 h-6 text-purple-400" />
                </h2>
                <p className="text-gray-400 flex items-center space-x-2">
                  <span>Security Information and Event Management - Real-time monitoring</span>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-green-400 text-xs">All Systems Active</span>
                  </div>
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search events, alerts, rules..."
                className="bg-background border-surface-light pl-10 w-80 text-sm focus:border-green-500"
                data-testid="siem-search"
              />
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            </div>
            <Button variant="outline" className="border-green-500 text-green-400" data-testid="filter-events">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button className="bg-green-600 hover:bg-green-700" data-testid="export-data">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </header>

      <main className="p-6">
        {/* SIEM Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-surface/80 backdrop-blur-md border border-green-500/30 cyber-glow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Database className="w-8 h-8 text-green-400" />
                <Badge className="bg-green-600">Active</Badge>
              </div>
              <div className="text-3xl font-bold text-white mb-2">4.9M</div>
              <div className="text-sm text-gray-400">Events Today</div>
              <div className="text-xs text-green-400 mt-1">+12% from yesterday</div>
            </CardContent>
          </Card>

          <Card className="bg-surface/80 backdrop-blur-md border border-red-500/30 cyber-glow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <AlertTriangle className="w-8 h-8 text-red-400" />
                <Badge className="bg-red-600">Critical</Badge>
              </div>
              <div className="text-3xl font-bold text-white mb-2">25</div>
              <div className="text-sm text-gray-400">Critical Alerts</div>
              <div className="text-xs text-red-400 mt-1">5 require attention</div>
            </CardContent>
          </Card>

          <Card className="bg-surface/80 backdrop-blur-md border border-blue-500/30 cyber-glow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <TrendingUp className="w-8 h-8 text-blue-400" />
                <Badge className="bg-blue-600">Trending</Badge>
              </div>
              <div className="text-3xl font-bold text-white mb-2">97.2%</div>
              <div className="text-sm text-gray-400">Detection Rate</div>
              <div className="text-xs text-blue-400 mt-1">Above baseline</div>
            </CardContent>
          </Card>

          <Card className="bg-surface/80 backdrop-blur-md border border-purple-500/30 cyber-glow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Clock className="w-8 h-8 text-purple-400" />
                <Badge className="bg-purple-600">Performance</Badge>
              </div>
              <div className="text-3xl font-bold text-white mb-2">1.2s</div>
              <div className="text-sm text-gray-400">Avg Response Time</div>
              <div className="text-xs text-purple-400 mt-1">-200ms improvement</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="systems" className="space-y-6">
          <TabsList className="bg-surface border border-surface-light">
            <TabsTrigger value="systems" className="data-[state=active]:bg-green-600">
              <Server className="w-4 h-4 mr-2" />
              SIEM Systems
            </TabsTrigger>
            <TabsTrigger value="alerts" className="data-[state=active]:bg-red-600">
              <AlertTriangle className="w-4 h-4 mr-2" />
              Active Alerts
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-blue-600">
              <BarChart3 className="w-4 h-4 mr-2" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="correlation" className="data-[state=active]:bg-purple-600">
              <Network className="w-4 h-4 mr-2" />
              Correlation Rules
            </TabsTrigger>
          </TabsList>

          {/* SIEM Systems */}
          <TabsContent value="systems" className="space-y-6">
            <Card className="bg-surface/80 backdrop-blur-md border border-green-500/30 cyber-glow">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-white">SIEM Platform Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {siemSystems.map((system, index) => (
                    <Card key={index} className={`bg-background/50 border ${
                      system.status === 'active' ? 'border-green-500/30' : 'border-yellow-500/30'
                    }`}>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-2">
                            <div className={`w-3 h-3 rounded-full ${
                              system.status === 'active' ? 'bg-green-400 animate-pulse' : 'bg-yellow-400'
                            }`}></div>
                            <span className="font-medium text-white">{system.name}</span>
                          </div>
                          <Badge className={`${
                            system.status === 'active' ? 'bg-green-600' : 'bg-yellow-600'
                          }`}>
                            {system.status}
                          </Badge>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Version:</span>
                            <span className="text-white">{system.version}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Events/Day:</span>
                            <span className="text-blue-400">{system.eventsPerDay}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Data Ingestion:</span>
                            <span className="text-white">{system.dataIngestion}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Critical Alerts:</span>
                            <span className="text-red-400">{system.criticalAlerts}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Health Score:</span>
                            <span className={getStatusColor(system.status)}>{system.health}%</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Uptime:</span>
                            <span className="text-green-400">{system.uptime}</span>
                          </div>
                        </div>
                        
                        <div className="mt-4">
                          <Progress value={system.health} className="h-2 mb-3" />
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline" className="flex-1">
                              Dashboard
                            </Button>
                            <Button size="sm" variant="ghost" className="text-gray-400">
                              <Monitor className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Active Alerts */}
          <TabsContent value="alerts" className="space-y-6">
            <Card className="bg-surface/80 backdrop-blur-md border border-red-500/30 cyber-glow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-bold text-white">Security Alerts</CardTitle>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="border-red-500 text-red-400">
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Refresh
                    </Button>
                    <Button size="sm" className="bg-red-600 hover:bg-red-700">
                      Escalate All Critical
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentAlerts.map((alert, index) => (
                    <Card key={index} className={`bg-background/50 border ${
                      alert.severity === 'critical' ? 'border-red-500/50' :
                      alert.severity === 'high' ? 'border-orange-500/50' :
                      alert.severity === 'medium' ? 'border-yellow-500/50' : 'border-blue-500/50'
                    }`}>
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <div className={`w-3 h-3 rounded-full ${
                                alert.severity === 'critical' ? 'bg-red-500 animate-pulse' : 
                                alert.severity === 'high' ? 'bg-orange-500' : 
                                alert.severity === 'medium' ? 'bg-yellow-500' : 'bg-blue-500'
                              }`}></div>
                              <h3 className="text-lg font-medium text-white">{alert.title}</h3>
                              <Badge className={getSeverityColor(alert.severity)}>
                                {alert.severity}
                              </Badge>
                            </div>
                            <div className="text-sm text-gray-400 mb-3">
                              Alert ID: {alert.id} • Rule: {alert.ruleTriggered}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-gray-400">Timestamp</div>
                            <div className="text-sm text-white">{alert.timestamp}</div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          <div>
                            <div className="text-xs text-gray-400">Source</div>
                            <div className="text-sm text-cyan-400">{alert.source}</div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-400">Affected Assets</div>
                            <div className="text-sm text-white">{alert.affectedAssets}</div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-400">Status</div>
                            <div className={`text-sm capitalize ${
                              alert.investigationStatus === 'resolved' ? 'text-green-400' :
                              alert.investigationStatus === 'in-progress' ? 'text-yellow-400' :
                              alert.investigationStatus === 'approved' ? 'text-blue-400' : 'text-gray-400'
                            }`}>
                              {alert.investigationStatus.replace('-', ' ')}
                            </div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-400">Assigned To</div>
                            <div className="text-sm text-purple-400">{alert.assignedTo}</div>
                          </div>
                        </div>

                        <div className="flex justify-between items-center">
                          <div className="flex space-x-2">
                            <Button size="sm" className={`${
                              alert.severity === 'critical' ? 'bg-red-600 hover:bg-red-700' :
                              alert.severity === 'high' ? 'bg-orange-600 hover:bg-orange-700' :
                              'bg-blue-600 hover:bg-blue-700'
                            }`}>
                              <Eye className="w-4 h-4 mr-2" />
                              Investigate
                            </Button>
                            <Button size="sm" variant="outline">
                              Assign
                            </Button>
                            {alert.investigationStatus === 'pending' && (
                              <Button size="sm" variant="outline" className="border-yellow-500 text-yellow-400">
                                Escalate
                              </Button>
                            )}
                          </div>
                          <div className="text-xs text-gray-400">
                            Auto-correlation: Active
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-surface/80 backdrop-blur-md border border-blue-500/30 cyber-glow">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-white flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2 text-blue-400" />
                    Event Volume Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-background/50 rounded-lg p-4 mb-4 relative overflow-hidden">
                    {/* Simulated Chart */}
                    <div className="absolute inset-0 p-4">
                      <div className="grid grid-cols-12 gap-1 h-full items-end">
                        {[65, 78, 90, 85, 72, 88, 92, 67, 79, 94, 82, 87].map((height, index) => (
                          <div key={index} className="relative">
                            <div 
                              className="bg-gradient-to-t from-blue-600 to-blue-400 rounded-t opacity-80" 
                              style={{height: `${height}%`}}
                            ></div>
                          </div>
                        ))}
                      </div>
                      <div className="absolute bottom-4 left-4 text-xs text-gray-400">
                        00:00
                      </div>
                      <div className="absolute bottom-4 right-4 text-xs text-gray-400">
                        23:59
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-blue-400">4.9M</div>
                      <div className="text-xs text-gray-400">Events Today</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-400">97.2%</div>
                      <div className="text-xs text-gray-400">Processing Rate</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-purple-400">530</div>
                      <div className="text-xs text-gray-400">Alerts Generated</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-surface/80 backdrop-blur-md border border-purple-500/30 cyber-glow">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-white flex items-center">
                    <PieChart className="w-5 h-5 mr-2 text-purple-400" />
                    Alert Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 bg-red-500 rounded"></div>
                        <span className="text-sm text-gray-400">Critical</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-white">25</span>
                        <span className="text-xs text-gray-400">(4.7%)</span>
                      </div>
                    </div>
                    <Progress value={4.7} className="h-2" />

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 bg-orange-500 rounded"></div>
                        <span className="text-sm text-gray-400">High</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-white">89</span>
                        <span className="text-xs text-gray-400">(16.8%)</span>
                      </div>
                    </div>
                    <Progress value={16.8} className="h-2" />

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                        <span className="text-sm text-gray-400">Medium</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-white">247</span>
                        <span className="text-xs text-gray-400">(46.6%)</span>
                      </div>
                    </div>
                    <Progress value={46.6} className="h-2" />

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 bg-blue-500 rounded"></div>
                        <span className="text-sm text-gray-400">Low</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-white">169</span>
                        <span className="text-xs text-gray-400">(31.9%)</span>
                      </div>
                    </div>
                    <Progress value={31.9} className="h-2" />
                  </div>

                  <div className="mt-6 p-4 bg-purple-900/20 rounded-lg border border-purple-600/50">
                    <div className="text-sm text-purple-400 font-medium mb-2">Alert Trends</div>
                    <div className="text-xs text-gray-400">
                      Critical alerts increased by 12% compared to last week. 
                      Recommend reviewing correlation rules for network anomalies.
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Correlation Rules */}
          <TabsContent value="correlation" className="space-y-6">
            <Card className="bg-surface/80 backdrop-blur-md border border-purple-500/30 cyber-glow">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-white">Active Correlation Rules</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="bg-background/50 border border-red-500/30">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-medium text-white">Brute Force Detection</h3>
                        <Badge className="bg-green-600">Active</Badge>
                      </div>
                      
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Triggers/Day:</span>
                          <span className="text-red-400">47</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">False Positives:</span>
                          <span className="text-yellow-400">3%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Effectiveness:</span>
                          <span className="text-green-400">97%</span>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <Button size="sm" variant="outline" className="w-full">
                          Configure Rule
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-background/50 border border-orange-500/30">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-medium text-white">Data Exfiltration</h3>
                        <Badge className="bg-green-600">Active</Badge>
                      </div>
                      
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Triggers/Day:</span>
                          <span className="text-orange-400">12</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">False Positives:</span>
                          <span className="text-yellow-400">8%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Effectiveness:</span>
                          <span className="text-green-400">92%</span>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <Button size="sm" variant="outline" className="w-full">
                          Configure Rule
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-background/50 border border-purple-500/30">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-medium text-white">Privilege Escalation</h3>
                        <Badge className="bg-green-600">Active</Badge>
                      </div>
                      
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Triggers/Day:</span>
                          <span className="text-purple-400">8</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">False Positives:</span>
                          <span className="text-yellow-400">5%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Effectiveness:</span>
                          <span className="text-green-400">95%</span>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <Button size="sm" variant="outline" className="w-full">
                          Configure Rule
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-background/50 border border-blue-500/30">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-medium text-white">Lateral Movement</h3>
                        <Badge className="bg-yellow-600">Tuning</Badge>
                      </div>
                      
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Triggers/Day:</span>
                          <span className="text-blue-400">23</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">False Positives:</span>
                          <span className="text-yellow-400">15%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Effectiveness:</span>
                          <span className="text-yellow-400">85%</span>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <Button size="sm" variant="outline" className="w-full">
                          Configure Rule
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}