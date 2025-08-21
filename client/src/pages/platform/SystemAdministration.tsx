import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Server,
  Monitor,
  HardDrive,
  Cpu,
  MemoryStick,
  Activity,
  Settings,
  CheckCircle,
  ArrowRight,
  AlertTriangle,
  Database,
  Network,
  Shield,
  Clock,
  TrendingUp,
  Zap
} from "lucide-react";
import { MarketingLayout } from "@/components/MarketingLayout";
import { Link } from "wouter";
import { useState, useEffect } from "react";

export default function SystemAdministration() {
  const [managedSystems, setManagedSystems] = useState(247);
  const [systemUptime, setSystemUptime] = useState(99.8);
  const [activeAlerts, setActiveAlerts] = useState(3);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [systemStatus, setSystemStatus] = useState([
    { name: "Web Server Cluster", status: "Optimal", cpu: 45, memory: 67, storage: 34, uptime: 99.9 },
    { name: "Database Servers", status: "Warning", cpu: 78, memory: 84, storage: 67, uptime: 99.7 },
    { name: "File Storage", status: "Optimal", cpu: 23, memory: 45, storage: 89, uptime: 100 },
    { name: "Backup Systems", status: "Optimal", cpu: 15, memory: 32, storage: 45, uptime: 99.8 }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
      if (Math.random() > 0.8) {
        setManagedSystems(Math.floor(Math.random() * 10) + 242);
        setSystemUptime(parseFloat((Math.random() * 1 + 99).toFixed(2)));
        setActiveAlerts(Math.floor(Math.random() * 8));
        
        // Update system status
        setSystemStatus(prev => prev.map(system => ({
          ...system,
          cpu: Math.floor(Math.random() * 60) + 20,
          memory: Math.floor(Math.random() * 60) + 30,
          storage: Math.floor(Math.random() * 40) + 20,
          status: system.cpu > 85 ? "Critical" : system.cpu > 75 ? "Warning" : "Optimal"
        })));
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const systemAdminCapabilities = [
    {
      title: "Infrastructure Management",
      description: "Comprehensive management of servers, workstations, and network infrastructure",
      icon: <Server className="w-8 h-8" />,
      features: ["Server provisioning", "Workstation management", "Performance monitoring", "Capacity planning"]
    },
    {
      title: "Automated Maintenance",
      description: "Automated system updates, patches, and maintenance procedures",
      icon: <Settings className="w-8 h-8" />,
      features: ["Patch management", "System updates", "Scheduled maintenance", "Rollback procedures"]
    },
    {
      title: "Performance Optimization",
      description: "Continuous monitoring and optimization of system performance and resources",
      icon: <TrendingUp className="w-8 h-8" />,
      features: ["Resource optimization", "Performance tuning", "Bottleneck identification", "Capacity forecasting"]
    },
    {
      title: "Disaster Recovery",
      description: "Comprehensive backup and disaster recovery planning and implementation",
      icon: <Shield className="w-8 h-8" />,
      features: ["Automated backups", "Recovery testing", "Business continuity", "Data replication"]
    }
  ];

  const systemMetrics = [
    { label: "Average System Uptime", value: "99.8%", trend: "last 30 days" },
    { label: "Patch Compliance", value: "97.4%", trend: "all managed systems" },
    { label: "Incident Resolution", value: "< 2 hours", trend: "average response time" },
    { label: "Resource Utilization", value: "67%", trend: "optimal efficiency" }
  ];

  const managedServices = [
    { service: "Windows 11 Pro", systems: 156, compliance: 98, issues: 2 },
    { service: "Server Management", systems: 34, compliance: 99, issues: 1 },
    { service: "Network Infrastructure", systems: 28, compliance: 97, issues: 0 },
    { service: "Security Systems", systems: 29, compliance: 100, issues: 0 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Optimal': return 'text-green-400 bg-green-500/20';
      case 'Warning': return 'text-yellow-400 bg-yellow-500/20';
      case 'Critical': return 'text-red-400 bg-red-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getResourceColor = (usage: number) => {
    if (usage > 85) return 'text-red-400';
    if (usage > 75) return 'text-yellow-400';
    return 'text-green-400';
  };

  return (
    <MarketingLayout>
      <div className="ai-dashboard-bg min-h-screen">
        {/* Header */}
        <header className="bg-surface/90 backdrop-blur-md border-b border-surface-light p-6 cyber-glow">
          <div className="container mx-auto max-w-7xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center cyber-glow">
                  <Server className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-white geometric-text">System Administration</h1>
                  <p className="text-xl text-gray-400">Comprehensive IT infrastructure management for 25+ users</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-400">Live Monitoring</div>
                <div className="flex items-center text-green-400 font-bold">
                  <Activity className="w-4 h-4 mr-1" />
                  {currentTime.toLocaleTimeString()}
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="p-6">
          <div className="container mx-auto max-w-7xl space-y-8">
            {/* Live System Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="bg-surface/80 backdrop-blur-md border border-orange-500/30 cyber-glow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-white flex items-center">
                    <Server className="w-5 h-5 mr-2 text-orange-400" />
                    Managed Systems
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-orange-400">{managedSystems}</div>
                  <p className="text-gray-400 text-sm">Active</p>
                </CardContent>
              </Card>

              <Card className="bg-surface/80 backdrop-blur-md border border-green-500/30 cyber-glow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-white flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2 text-green-400" />
                    System Uptime
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-400">{systemUptime}%</div>
                  <Progress value={systemUptime} className="mt-2" />
                </CardContent>
              </Card>

              <Card className="bg-surface/80 backdrop-blur-md border border-red-500/30 cyber-glow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-white flex items-center">
                    <AlertTriangle className="w-5 h-5 mr-2 text-red-400" />
                    Active Alerts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-red-400">{activeAlerts}</div>
                  <p className="text-gray-400 text-sm">Requiring attention</p>
                </CardContent>
              </Card>

              <Card className="bg-surface/80 backdrop-blur-md border border-blue-500/30 cyber-glow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-white flex items-center">
                    <Zap className="w-5 h-5 mr-2 text-blue-400" />
                    Performance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-400">Optimal</div>
                  <p className="text-gray-400 text-sm">Overall status</p>
                </CardContent>
              </Card>
            </div>

            {/* System Status Dashboard */}
            <Card className="bg-surface/80 backdrop-blur-md border border-orange-500/30 cyber-glow">
              <CardHeader>
                <CardTitle className="text-2xl text-white flex items-center">
                  <Monitor className="w-6 h-6 mr-3 text-orange-400" />
                  Real-Time System Status
                  <Badge className="ml-3 bg-orange-500/20 text-orange-400">LIVE</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {systemStatus.map((system, index) => (
                    <div key={index} className="p-4 bg-background/30 rounded-lg">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-white font-semibold">{system.name}</h4>
                        <Badge className={getStatusColor(system.status)}>
                          {system.status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <div className="text-center">
                          <Cpu className="w-5 h-5 text-blue-400 mx-auto mb-1" />
                          <div className={`text-lg font-bold ${getResourceColor(system.cpu)}`}>
                            {system.cpu}%
                          </div>
                          <div className="text-xs text-gray-400">CPU</div>
                          <Progress value={system.cpu} className="mt-1" />
                        </div>
                        <div className="text-center">
                          <MemoryStick className="w-5 h-5 text-purple-400 mx-auto mb-1" />
                          <div className={`text-lg font-bold ${getResourceColor(system.memory)}`}>
                            {system.memory}%
                          </div>
                          <div className="text-xs text-gray-400">Memory</div>
                          <Progress value={system.memory} className="mt-1" />
                        </div>
                        <div className="text-center">
                          <HardDrive className="w-5 h-5 text-green-400 mx-auto mb-1" />
                          <div className={`text-lg font-bold ${getResourceColor(system.storage)}`}>
                            {system.storage}%
                          </div>
                          <div className="text-xs text-gray-400">Storage</div>
                          <Progress value={system.storage} className="mt-1" />
                        </div>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Uptime:</span>
                        <span className="text-green-400">{system.uptime}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Managed Services Overview */}
            <Card className="bg-surface/80 backdrop-blur-md border border-blue-500/30 cyber-glow">
              <CardHeader>
                <CardTitle className="text-2xl text-white flex items-center">
                  <Settings className="w-6 h-6 mr-3 text-blue-400" />
                  Managed Services Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {managedServices.map((service, index) => (
                    <div key={index} className="p-4 bg-background/30 rounded-lg">
                      <h4 className="text-white font-semibold mb-3">{service.service}</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Systems:</span>
                          <span className="text-white">{service.systems}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Compliance:</span>
                          <span className="text-green-400">{service.compliance}%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Issues:</span>
                          <span className={service.issues === 0 ? "text-green-400" : "text-red-400"}>
                            {service.issues}
                          </span>
                        </div>
                        <Progress value={service.compliance} className="mt-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Resource Utilization Trends */}
            <Card className="bg-surface/80 backdrop-blur-md border border-purple-500/30 cyber-glow">
              <CardHeader>
                <CardTitle className="text-2xl text-white flex items-center">
                  <TrendingUp className="w-6 h-6 mr-3 text-purple-400" />
                  Infrastructure Resource Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div>
                    <h4 className="text-white font-semibold mb-4">CPU Utilization (24h)</h4>
                    <div className="space-y-3">
                      <div className="p-3 bg-background/30 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-400">Peak Usage</span>
                          <span className="text-red-400 font-bold">78%</span>
                        </div>
                        <Progress value={78} />
                      </div>
                      <div className="p-3 bg-background/30 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-400">Average Usage</span>
                          <span className="text-yellow-400 font-bold">45%</span>
                        </div>
                        <Progress value={45} />
                      </div>
                      <div className="p-3 bg-background/30 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-400">Minimum Usage</span>
                          <span className="text-green-400 font-bold">12%</span>
                        </div>
                        <Progress value={12} />
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-4">Memory Usage (24h)</h4>
                    <div className="space-y-3">
                      <div className="p-3 bg-background/30 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-400">Peak Usage</span>
                          <span className="text-red-400 font-bold">84%</span>
                        </div>
                        <Progress value={84} />
                      </div>
                      <div className="p-3 bg-background/30 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-400">Average Usage</span>
                          <span className="text-yellow-400 font-bold">62%</span>
                        </div>
                        <Progress value={62} />
                      </div>
                      <div className="p-3 bg-background/30 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-400">Minimum Usage</span>
                          <span className="text-green-400 font-bold">34%</span>
                        </div>
                        <Progress value={34} />
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-4">Storage Usage</h4>
                    <div className="space-y-3">
                      <div className="p-3 bg-background/30 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-400">Web Servers</span>
                          <span className="text-green-400 font-bold">34%</span>
                        </div>
                        <Progress value={34} />
                      </div>
                      <div className="p-3 bg-background/30 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-400">Database</span>
                          <span className="text-yellow-400 font-bold">67%</span>
                        </div>
                        <Progress value={67} />
                      </div>
                      <div className="p-3 bg-background/30 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-400">File Storage</span>
                          <span className="text-red-400 font-bold">89%</span>
                        </div>
                        <Progress value={89} />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* System Admin Capabilities Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {systemAdminCapabilities.map((capability, index) => (
                <Card key={index} className="bg-surface/80 backdrop-blur-md border border-surface-light cyber-glow">
                  <CardHeader>
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                        {capability.icon}
                      </div>
                      <CardTitle className="text-xl text-white">{capability.title}</CardTitle>
                    </div>
                    <p className="text-gray-400">{capability.description}</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {capability.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-gray-300">
                          <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Performance Metrics */}
            <Card className="bg-gradient-to-r from-orange-900/50 to-red-900/50 border border-orange-500/30 cyber-glow">
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold text-white mb-8 text-center">System Administration Metrics</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {systemMetrics.map((metric, index) => (
                    <div key={index} className="text-center">
                      <div className="text-3xl font-bold text-orange-400 mb-2">{metric.value}</div>
                      <div className="text-white font-semibold mb-1">{metric.label}</div>
                      <div className="text-gray-400 text-sm">{metric.trend}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Call to Action */}
            <Card className="bg-gradient-to-r from-orange-900/50 to-red-900/50 border border-orange-500/30 cyber-glow">
              <CardContent className="p-12 text-center">
                <h2 className="text-4xl font-bold text-white mb-6">Optimize Your IT Infrastructure</h2>
                <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                  Deploy comprehensive system administration with automated management, monitoring, and optimization for your IT infrastructure.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/solutions">
                    <Button size="lg" className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 px-12 py-4 text-lg">
                      View Solutions
                    </Button>
                  </Link>
                  <Link href="/security-scanner">
                    <Button size="lg" variant="outline" className="border-orange-500 text-orange-400 hover:bg-orange-500/10 px-12 py-4 text-lg">
                      Infrastructure Assessment
                      <ArrowRight className="ml-2 w-6 h-6" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </MarketingLayout>
  );
}