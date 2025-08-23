import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Wrench,
  Server,
  Monitor,
  Network,
  HardDrive,
  Cpu,
  MemoryStick,
  Wifi,
  Shield,
  RefreshCw,
  AlertTriangle,
  Check,
  Clock,
  Users,
  Database,
  Download,
  Settings,
  Search,
  Filter,
  Plus,
  Eye,
  Activity,
  BarChart3
} from "lucide-react";

export default function ITManagement() {
  const [systemStats] = useState({
    totalWorkstations: 247,
    onlineWorkstations: 239,
    pendingUpdates: 23,
    healthyServers: 8,
    totalServers: 8,
    networkUptime: 99.7,
    storageUsed: 72,
    backupStatus: 98
  });

  const [workstations] = useState([
    {
      id: "WS-001",
      hostname: "LAB-PC-001",
      location: "Computer Lab A",
      os: "Windows 11 Pro",
      lastPatch: "2024-01-15",
      status: "healthy",
      cpuUsage: 35,
      memoryUsage: 68,
      diskUsage: 45,
      uptime: "14 days",
      assignedUser: "teacher1@school.edu"
    },
    {
      id: "WS-002", 
      hostname: "OFFICE-PC-002",
      location: "Admin Office",
      os: "Windows 11 Pro", 
      lastPatch: "2024-01-10",
      status: "warning",
      cpuUsage: 78,
      memoryUsage: 85,
      diskUsage: 92,
      uptime: "7 days",
      assignedUser: "admin@school.edu"
    },
    {
      id: "WS-003",
      hostname: "LIB-PC-003", 
      location: "Library",
      os: "Windows 11 Pro",
      lastPatch: "2024-01-20",
      status: "healthy",
      cpuUsage: 22,
      memoryUsage: 41,
      diskUsage: 38,
      uptime: "21 days",
      assignedUser: "librarian@school.edu"
    }
  ]);

  const [servers] = useState([
    {
      id: "SRV-001",
      hostname: "DC-PRIMARY",
      role: "Domain Controller",
      os: "Windows Server 2022",
      status: "healthy",
      cpuUsage: 15,
      memoryUsage: 45,
      diskUsage: 68,
      uptime: "45 days",
      services: ["Active Directory", "DNS", "DHCP"]
    },
    {
      id: "SRV-002",
      hostname: "EXCHANGE-01",
      role: "Email Server", 
      os: "Windows Server 2022",
      status: "healthy",
      cpuUsage: 28,
      memoryUsage: 72,
      diskUsage: 55,
      uptime: "38 days",
      services: ["Exchange Server", "SMTP", "IMAP"]
    },
    {
      id: "SRV-003",
      hostname: "FILE-SERVER-01",
      role: "File Storage",
      os: "Windows Server 2022", 
      status: "warning",
      cpuUsage: 42,
      memoryUsage: 88,
      diskUsage: 91,
      uptime: "52 days",
      services: ["File Sharing", "Print Server", "Backup"]
    }
  ]);

  const [networkDevices] = useState([
    {
      id: "NET-001",
      hostname: "CORE-SWITCH-01",
      type: "Core Switch",
      location: "Main Server Room",
      status: "healthy",
      uptime: "99.9%",
      ports: { total: 48, used: 42, available: 6 },
      traffic: { in: "1.2 Gbps", out: "950 Mbps" }
    },
    {
      id: "NET-002", 
      hostname: "FIREWALL-01",
      type: "Next-Gen Firewall",
      location: "Main Server Room",
      status: "healthy", 
      uptime: "99.8%",
      threats: { blocked: 1247, allowed: 98234 },
      bandwidth: { total: "1 Gbps", used: "65%" }
    },
    {
      id: "NET-003",
      hostname: "WAP-LAB-A",
      type: "Wireless Access Point",
      location: "Computer Lab A",
      status: "healthy",
      uptime: "99.5%",
      clients: { connected: 28, max: 50 },
      signal: { strength: "-45 dBm", quality: "Excellent" }
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy": return "text-green-400 bg-green-900/20 border-green-500/30";
      case "warning": return "text-yellow-400 bg-yellow-900/20 border-yellow-500/30";
      case "critical": return "text-red-400 bg-red-900/20 border-red-500/30";
      default: return "text-gray-400 bg-gray-900/20 border-gray-500/30";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "healthy": return <Check className="w-4 h-4 text-green-400" />;
      case "warning": return <AlertTriangle className="w-4 h-4 text-yellow-400" />;
      case "critical": return <AlertTriangle className="w-4 h-4 text-red-400" />;
      default: return <AlertTriangle className="w-4 h-4 text-gray-400" />;
    }
  };

  const getUsageColor = (usage: number) => {
    if (usage < 70) return "text-green-400";
    if (usage < 90) return "text-yellow-400";
    return "text-red-400";
  };

  return (
    <div className="ai-dashboard-bg min-h-screen">
      {/* Header */}
      <header className="bg-surface/90 backdrop-blur-md border-b border-surface-light p-6 cyber-glow">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-red-500 rounded-lg flex items-center justify-center">
                <Wrench className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent geometric-text">
                  IT Management
                </h2>
                <p className="text-gray-400 cyber-font">Comprehensive system administration and infrastructure management</p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search systems, devices, users..."
                className="bg-background border-surface-light pl-10 w-80 text-sm focus:border-orange-500"
                data-testid="it-search"
              />
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            </div>
            <Button variant="outline" className="border-orange-500 text-orange-400" data-testid="filter-systems">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button className="bg-orange-600 hover:bg-orange-700" data-testid="add-system">
              <Plus className="w-4 h-4 mr-2" />
              Add System
            </Button>
          </div>
        </div>
      </header>

      <main className="p-6">
        {/* IT Management Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-surface/80 backdrop-blur-md border border-green-500/30 cyber-glow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Monitor className="w-8 h-8 text-green-400" />
                <Badge className="bg-green-600">Online</Badge>
              </div>
              <div className="text-3xl font-bold text-white mb-2">{systemStats.onlineWorkstations}</div>
              <div className="text-sm text-gray-400">Workstations</div>
              <div className="text-xs text-green-400 mt-1">
                {systemStats.onlineWorkstations}/{systemStats.totalWorkstations} online
              </div>
            </CardContent>
          </Card>

          <Card className="bg-surface/80 backdrop-blur-md border border-blue-500/30 cyber-glow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Server className="w-8 h-8 text-blue-400" />
                <Badge className="bg-blue-600">Active</Badge>
              </div>
              <div className="text-3xl font-bold text-white mb-2">{systemStats.healthyServers}</div>
              <div className="text-sm text-gray-400">Servers</div>
              <div className="text-xs text-blue-400 mt-1">
                {systemStats.healthyServers}/{systemStats.totalServers} healthy
              </div>
            </CardContent>
          </Card>

          <Card className="bg-surface/80 backdrop-blur-md border border-yellow-500/30 cyber-glow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Download className="w-8 h-8 text-yellow-400" />
                <Badge className="bg-yellow-600">Pending</Badge>
              </div>
              <div className="text-3xl font-bold text-white mb-2">{systemStats.pendingUpdates}</div>
              <div className="text-sm text-gray-400">Updates</div>
              <div className="text-xs text-yellow-400 mt-1">Critical patches available</div>
            </CardContent>
          </Card>

          <Card className="bg-surface/80 backdrop-blur-md border border-purple-500/30 cyber-glow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Network className="w-8 h-8 text-purple-400" />
                <Badge className="bg-purple-600">Stable</Badge>
              </div>
              <div className="text-3xl font-bold text-white mb-2">{systemStats.networkUptime}%</div>
              <div className="text-sm text-gray-400">Network Uptime</div>
              <div className="text-xs text-purple-400 mt-1">Last 30 days</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="workstations" className="space-y-6">
          <TabsList className="bg-surface border border-surface-light">
            <TabsTrigger value="workstations" className="data-[state=active]:bg-green-600">
              <Monitor className="w-4 h-4 mr-2" />
              Workstations
            </TabsTrigger>
            <TabsTrigger value="servers" className="data-[state=active]:bg-blue-600">
              <Server className="w-4 h-4 mr-2" />
              Servers
            </TabsTrigger>
            <TabsTrigger value="network" className="data-[state=active]:bg-purple-600">
              <Network className="w-4 h-4 mr-2" />
              Network
            </TabsTrigger>
            <TabsTrigger value="maintenance" className="data-[state=active]:bg-orange-600">
              <Settings className="w-4 h-4 mr-2" />
              Maintenance
            </TabsTrigger>
          </TabsList>

          {/* Workstations Management */}
          <TabsContent value="workstations" className="space-y-6">
            <Card className="bg-surface/80 backdrop-blur-md border border-green-500/30 cyber-glow">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-white">Workstation Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {workstations.map((workstation, index) => (
                    <Card key={index} className={`bg-background/50 border ${
                      workstation.status === 'healthy' ? 'border-green-500/30' : 
                      workstation.status === 'warning' ? 'border-yellow-500/30' : 'border-red-500/30'
                    }`}>
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <Monitor className="w-5 h-5 text-green-400" />
                              <h3 className="text-lg font-medium text-white">{workstation.hostname}</h3>
                              <Badge className={getStatusColor(workstation.status)}>
                                {workstation.status}
                              </Badge>
                            </div>
                            <div className="text-sm text-gray-400 mb-3">
                              {workstation.location} • {workstation.os} • User: {workstation.assignedUser}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-gray-400">Uptime</div>
                            <div className="text-lg font-bold text-green-400">{workstation.uptime}</div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          <div>
                            <div className="flex items-center space-x-2 mb-2">
                              <Cpu className="w-4 h-4 text-blue-400" />
                              <span className="text-xs text-gray-400">CPU</span>
                            </div>
                            <div className={`text-sm font-medium ${getUsageColor(workstation.cpuUsage)}`}>
                              {workstation.cpuUsage}%
                            </div>
                            <Progress value={workstation.cpuUsage} className="h-1 mt-1" />
                          </div>
                          <div>
                            <div className="flex items-center space-x-2 mb-2">
                              <MemoryStick className="w-4 h-4 text-purple-400" />
                              <span className="text-xs text-gray-400">Memory</span>
                            </div>
                            <div className={`text-sm font-medium ${getUsageColor(workstation.memoryUsage)}`}>
                              {workstation.memoryUsage}%
                            </div>
                            <Progress value={workstation.memoryUsage} className="h-1 mt-1" />
                          </div>
                          <div>
                            <div className="flex items-center space-x-2 mb-2">
                              <HardDrive className="w-4 h-4 text-yellow-400" />
                              <span className="text-xs text-gray-400">Disk</span>
                            </div>
                            <div className={`text-sm font-medium ${getUsageColor(workstation.diskUsage)}`}>
                              {workstation.diskUsage}%
                            </div>
                            <Progress value={workstation.diskUsage} className="h-1 mt-1" />
                          </div>
                          <div>
                            <div className="flex items-center space-x-2 mb-2">
                              <Clock className="w-4 h-4 text-cyan-400" />
                              <span className="text-xs text-gray-400">Last Patch</span>
                            </div>
                            <div className="text-sm text-white">{workstation.lastPatch}</div>
                          </div>
                        </div>

                        <div className="flex justify-between items-center">
                          <div className="flex space-x-2">
                            <Button size="sm" className="bg-green-600 hover:bg-green-700">
                              <Eye className="w-4 h-4 mr-2" />
                              Remote Access
                            </Button>
                            <Button size="sm" variant="outline">
                              Update System
                            </Button>
                            <Button size="sm" variant="outline">
                              Restart
                            </Button>
                          </div>
                          <div className="text-xs text-gray-400">
                            ID: {workstation.id}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Server Management */}
          <TabsContent value="servers" className="space-y-6">
            <Card className="bg-surface/80 backdrop-blur-md border border-blue-500/30 cyber-glow">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-white">Server Infrastructure</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {servers.map((server, index) => (
                    <Card key={index} className={`bg-background/50 border ${
                      server.status === 'healthy' ? 'border-green-500/30' : 
                      server.status === 'warning' ? 'border-yellow-500/30' : 'border-red-500/30'
                    }`}>
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <Server className="w-5 h-5 text-blue-400" />
                              <h3 className="text-lg font-medium text-white">{server.hostname}</h3>
                              <Badge className={getStatusColor(server.status)}>
                                {server.status}
                              </Badge>
                            </div>
                            <div className="text-sm text-gray-400 mb-3">
                              {server.role} • {server.os}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-gray-400">Uptime</div>
                            <div className="text-lg font-bold text-green-400">{server.uptime}</div>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4 mb-4">
                          <div>
                            <div className="flex items-center space-x-2 mb-2">
                              <Cpu className="w-4 h-4 text-blue-400" />
                              <span className="text-xs text-gray-400">CPU Usage</span>
                            </div>
                            <div className={`text-sm font-medium ${getUsageColor(server.cpuUsage)}`}>
                              {server.cpuUsage}%
                            </div>
                            <Progress value={server.cpuUsage} className="h-1 mt-1" />
                          </div>
                          <div>
                            <div className="flex items-center space-x-2 mb-2">
                              <MemoryStick className="w-4 h-4 text-purple-400" />
                              <span className="text-xs text-gray-400">Memory</span>
                            </div>
                            <div className={`text-sm font-medium ${getUsageColor(server.memoryUsage)}`}>
                              {server.memoryUsage}%
                            </div>
                            <Progress value={server.memoryUsage} className="h-1 mt-1" />
                          </div>
                          <div>
                            <div className="flex items-center space-x-2 mb-2">
                              <HardDrive className="w-4 h-4 text-yellow-400" />
                              <span className="text-xs text-gray-400">Storage</span>
                            </div>
                            <div className={`text-sm font-medium ${getUsageColor(server.diskUsage)}`}>
                              {server.diskUsage}%
                            </div>
                            <Progress value={server.diskUsage} className="h-1 mt-1" />
                          </div>
                        </div>

                        <div className="mb-4">
                          <div className="text-xs text-gray-400 mb-2">Running Services</div>
                          <div className="flex flex-wrap gap-2">
                            {server.services.map((service, i) => (
                              <Badge key={i} variant="outline" className="text-xs border-blue-500 text-blue-400">
                                {service}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="flex justify-between items-center">
                          <div className="flex space-x-2">
                            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                              <Activity className="w-4 h-4 mr-2" />
                              Monitor
                            </Button>
                            <Button size="sm" variant="outline">
                              Manage Services
                            </Button>
                            <Button size="sm" variant="outline">
                              Maintenance
                            </Button>
                          </div>
                          <div className="text-xs text-gray-400">
                            ID: {server.id}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Network Management */}
          <TabsContent value="network" className="space-y-6">
            <Card className="bg-surface/80 backdrop-blur-md border border-purple-500/30 cyber-glow">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-white">Network Infrastructure</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {networkDevices.map((device, index) => (
                    <Card key={index} className="bg-background/50 border border-purple-500/30">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <Network className="w-5 h-5 text-purple-400" />
                              <h3 className="text-lg font-medium text-white">{device.hostname}</h3>
                              <Badge className={getStatusColor(device.status)}>
                                {device.status}
                              </Badge>
                            </div>
                            <div className="text-sm text-gray-400 mb-3">
                              {device.type} • {device.location}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-gray-400">Uptime</div>
                            <div className="text-lg font-bold text-green-400">{device.uptime}</div>
                          </div>
                        </div>

                        {device.type === "Core Switch" && (
                          <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                              <div className="text-xs text-gray-400 mb-2">Port Usage</div>
                              <div className="text-sm text-white">
                                {device.ports?.used || 0}/{device.ports?.total || 0} ports
                              </div>
                              <Progress value={((device.ports?.used || 0) / (device.ports?.total || 1)) * 100} className="h-1 mt-1" />
                            </div>
                            <div>
                              <div className="text-xs text-gray-400 mb-2">Traffic</div>
                              <div className="text-sm text-cyan-400">↓ {device.traffic?.in || '0 MB/s'}</div>
                              <div className="text-sm text-orange-400">↑ {device.traffic?.out || '0 MB/s'}</div>
                            </div>
                          </div>
                        )}

                        {device.type === "Next-Gen Firewall" && (
                          <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                              <div className="text-xs text-gray-400 mb-2">Threats Blocked</div>
                              <div className="text-sm text-red-400">{device.threats?.blocked?.toLocaleString() || '0'}</div>
                            </div>
                            <div>
                              <div className="text-xs text-gray-400 mb-2">Bandwidth Usage</div>
                              <div className="text-sm text-white">{device.bandwidth?.used || '0'} of {device.bandwidth?.total || '0'}</div>
                            </div>
                          </div>
                        )}

                        {device.type === "Wireless Access Point" && (
                          <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                              <div className="text-xs text-gray-400 mb-2">Connected Clients</div>
                              <div className="text-sm text-white">
                                {device.clients?.connected || 0}/{device.clients?.max || 0}
                              </div>
                              <Progress value={((device.clients?.connected || 0) / (device.clients?.max || 1)) * 100} className="h-1 mt-1" />
                            </div>
                            <div>
                              <div className="text-xs text-gray-400 mb-2">Signal Quality</div>
                              <div className="text-sm text-green-400">{device.signal?.quality || 0}</div>
                              <div className="text-xs text-gray-400">{device.signal?.strength || 0}</div>
                            </div>
                          </div>
                        )}

                        <div className="flex justify-between items-center">
                          <div className="flex space-x-2">
                            <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                              <Settings className="w-4 h-4 mr-2" />
                              Configure
                            </Button>
                            <Button size="sm" variant="outline">
                              Diagnostics
                            </Button>
                          </div>
                          <div className="text-xs text-gray-400">
                            ID: {device.id}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Maintenance & Updates */}
          <TabsContent value="maintenance" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-surface/80 backdrop-blur-md border border-orange-500/30 cyber-glow">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-white">Patch Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-red-900/20 rounded-lg border border-red-600/50">
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-sm text-red-400 font-medium">Critical Security Updates</div>
                        <Badge className="bg-red-600">23 Pending</Badge>
                      </div>
                      <div className="text-xs text-gray-400 mb-3">
                        Windows Security Updates available for deployment
                      </div>
                      <Button size="sm" className="bg-red-600 hover:bg-red-700 w-full">
                        Deploy Critical Updates
                      </Button>
                    </div>

                    <div className="p-4 bg-yellow-900/20 rounded-lg border border-yellow-600/50">
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-sm text-yellow-400 font-medium">Application Updates</div>
                        <Badge className="bg-yellow-600">47 Available</Badge>
                      </div>
                      <div className="text-xs text-gray-400 mb-3">
                        Third-party software updates available
                      </div>
                      <Button size="sm" variant="outline" className="w-full border-yellow-600 text-yellow-400">
                        Schedule Updates
                      </Button>
                    </div>

                    <div className="p-4 bg-blue-900/20 rounded-lg border border-blue-600/50">
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-sm text-blue-400 font-medium">Driver Updates</div>
                        <Badge className="bg-blue-600">12 Available</Badge>
                      </div>
                      <div className="text-xs text-gray-400 mb-3">
                        Hardware driver updates available
                      </div>
                      <Button size="sm" variant="outline" className="w-full border-blue-600 text-blue-400">
                        Review Drivers
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-surface/80 backdrop-blur-md border border-green-500/30 cyber-glow">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-white">Backup & Recovery</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center mb-4">
                      <div className="text-3xl font-bold text-green-400 mb-2">{systemStats.backupStatus}%</div>
                      <div className="text-sm text-gray-400">Backup Success Rate</div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Last Full Backup:</span>
                        <span className="text-green-400">Yesterday 2:00 AM</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Next Scheduled:</span>
                        <span className="text-white">Today 2:00 AM</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Storage Used:</span>
                        <span className="text-white">{systemStats.storageUsed}%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Recovery Point:</span>
                        <span className="text-cyan-400">4 hours</span>
                      </div>
                    </div>

                    <div className="mt-4 space-y-2">
                      <Button size="sm" className="bg-green-600 hover:bg-green-700 w-full">
                        <Database className="w-4 h-4 mr-2" />
                        Manual Backup
                      </Button>
                      <Button size="sm" variant="outline" className="w-full">
                        Test Recovery
                      </Button>
                      <Button size="sm" variant="outline" className="w-full">
                        Backup Configuration
                      </Button>
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