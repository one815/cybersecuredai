import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { 
  Shield,
  Server,
  Network,
  Eye,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  TrendingUp,
  TrendingDown,
  Activity,
  Settings,
  RefreshCw,
  Download,
  Play,
  Square,
  Zap,
  Target,
  Lock,
  Unlock,
  Database,
  Monitor,
  Cpu,
  MemoryStick,
  HardDrive
} from "lucide-react";

interface SecurityDevice {
  id: string;
  name: string;
  type: 'firewall' | 'ips' | 'waf' | 'utm' | 'ids';
  vendor: 'palo_alto' | 'cisco' | 'f5' | 'fortinet' | 'checkpoint';
  model: string;
  status: 'online' | 'offline' | 'maintenance' | 'error';
  location: string;
  ipAddress: string;
  version: string;
  lastHeartbeat: Date;
  throughput: number;
  maxThroughput: number;
  blockedThreats: number;
  policies: number;
  cpu: number;
  memory: number;
  storage: number;
}

interface SecurityEvent {
  id: string;
  deviceId: string;
  eventType: 'threat_blocked' | 'policy_violation' | 'system_alert' | 'performance';
  severity: 'low' | 'medium' | 'high' | 'critical';
  timestamp: Date;
  source: string;
  destination: string;
  action: string;
  description: string;
  ruleId?: string;
}

export default function SecurityInfrastructureMonitoring() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);
  const [isConfiguring, setIsConfiguring] = useState(false);

  // Mock data for demonstration
  const [securityDevices] = useState<SecurityDevice[]>([
    {
      id: 'pa_fw_001',
      name: 'Palo Alto PA-5220 - Primary',
      type: 'firewall',
      vendor: 'palo_alto',
      model: 'PA-5220',
      status: 'online',
      location: 'Data Center - DMZ',
      ipAddress: '10.1.1.10',
      version: '10.2.3',
      lastHeartbeat: new Date(),
      throughput: 8500,
      maxThroughput: 13000,
      blockedThreats: 2847,
      policies: 456,
      cpu: 45,
      memory: 62,
      storage: 34
    },
    {
      id: 'cisco_ips_001',
      name: 'Cisco Firepower 2130 - Main',
      type: 'ips',
      vendor: 'cisco',
      model: 'Firepower 2130',
      status: 'online',
      location: 'Network Core',
      ipAddress: '10.1.1.20',
      version: '7.2.1',
      lastHeartbeat: new Date(Date.now() - 120000),
      throughput: 3200,
      maxThroughput: 5000,
      blockedThreats: 1234,
      policies: 189,
      cpu: 67,
      memory: 78,
      storage: 45
    },
    {
      id: 'f5_waf_001',
      name: 'F5 BIG-IP ASM - Web Protection',
      type: 'waf',
      vendor: 'f5',
      model: 'BIG-IP ASM',
      status: 'online',
      location: 'Web Farm',
      ipAddress: '10.1.1.30',
      version: '16.1.2',
      lastHeartbeat: new Date(Date.now() - 60000),
      throughput: 1800,
      maxThroughput: 3000,
      blockedThreats: 892,
      policies: 67,
      cpu: 34,
      memory: 56,
      storage: 23
    }
  ]);

  const [securityEvents] = useState<SecurityEvent[]>([
    {
      id: 'event_001',
      deviceId: 'pa_fw_001',
      eventType: 'threat_blocked',
      severity: 'high',
      timestamp: new Date(),
      source: '192.168.100.55',
      destination: '10.1.1.100',
      action: 'blocked',
      description: 'Malware command and control communication blocked',
      ruleId: 'THREAT-001'
    },
    {
      id: 'event_002',
      deviceId: 'cisco_ips_001',
      eventType: 'threat_blocked',
      severity: 'critical',
      timestamp: new Date(Date.now() - 300000),
      source: '203.45.67.89',
      destination: '10.1.1.200',
      action: 'blocked',
      description: 'SQL injection attempt detected and blocked',
      ruleId: 'IPS-SQL-001'
    },
    {
      id: 'event_003',
      deviceId: 'f5_waf_001',
      eventType: 'policy_violation',
      severity: 'medium',
      timestamp: new Date(Date.now() - 600000),
      source: '172.16.1.45',
      destination: 'web.example.edu',
      action: 'blocked',
      description: 'Cross-site scripting attempt blocked by WAF policy',
      ruleId: 'WAF-XSS-001'
    }
  ]);

  const refreshDeviceMutation = useMutation({
    mutationFn: async (deviceId: string) => {
      const response = await fetch(`/api/security-infrastructure/${deviceId}/refresh`, {
        method: 'POST'
      });
      if (!response.ok) throw new Error('Failed to refresh device');
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Device Refreshed",
        description: "Security device status has been updated successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/security-infrastructure'] });
    },
    onError: () => {
      toast({
        title: "Refresh Failed",
        description: "Failed to refresh device status.",
        variant: "destructive",
      });
    },
  });

  const configureDeviceMutation = useMutation({
    mutationFn: async (data: { deviceId: string; configuration: any }) => {
      const response = await fetch(`/api/security-infrastructure/${data.deviceId}/configure`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data.configuration)
      });
      if (!response.ok) throw new Error('Failed to configure device');
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Configuration Updated",
        description: "Security device has been configured successfully.",
      });
      setIsConfiguring(false);
      queryClient.invalidateQueries({ queryKey: ['/api/security-infrastructure'] });
    },
    onError: () => {
      toast({
        title: "Configuration Failed",
        description: "Failed to update device configuration.",
        variant: "destructive",
      });
    },
  });

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case 'firewall': return <Shield className="w-5 h-5 text-red-500" />;
      case 'ips': return <Eye className="w-5 h-5 text-blue-500" />;
      case 'waf': return <Lock className="w-5 h-5 text-green-500" />;
      case 'utm': return <Target className="w-5 h-5 text-purple-500" />;
      case 'ids': return <Search className="w-5 h-5 text-orange-500" />;
      default: return <Server className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'offline': return <XCircle className="w-4 h-4 text-gray-500" />;
      case 'maintenance': return <Settings className="w-4 h-4 text-yellow-500" />;
      case 'error': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      default: return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-100 text-green-800 border-green-200';
      case 'offline': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'error': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500 text-white';
      case 'high': return 'bg-orange-500 text-white';
      case 'medium': return 'bg-yellow-500 text-black';
      case 'low': return 'bg-green-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getVendorColor = (vendor: string) => {
    switch (vendor) {
      case 'palo_alto': return 'bg-red-100 text-red-800';
      case 'cisco': return 'bg-blue-100 text-blue-800';
      case 'f5': return 'bg-green-100 text-green-800';
      case 'fortinet': return 'bg-purple-100 text-purple-800';
      case 'checkpoint': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold text-white mb-2 flex items-center">
                  <Monitor className="w-8 h-8 mr-3 text-spring-green" />
                  Security Infrastructure Monitoring
                </h1>
                <p className="text-gray-400">
                  Real-time monitoring of Palo Alto, Cisco Firepower, and F5 security devices
                </p>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Export Report
                </Button>
                <Button 
                  className="bg-spring-green hover:bg-spring-green/80 text-midnight-blue"
                  onClick={() => {
                    securityDevices.forEach(device => {
                      if (device.status === 'online') {
                        refreshDeviceMutation.mutate(device.id);
                      }
                    });
                  }}
                  disabled={refreshDeviceMutation.isPending}
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  {refreshDeviceMutation.isPending ? 'Refreshing...' : 'Refresh All'}
                </Button>
              </div>
            </div>
          </div>

          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-surface/80 backdrop-blur-md border border-spring-green/30 cyber-glow">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-white flex items-center">
                  <Server className="w-5 h-5 mr-2 text-spring-green" />
                  Online Devices
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-spring-green">
                  {securityDevices.filter(d => d.status === 'online').length}
                </div>
                <p className="text-gray-400 text-sm">of {securityDevices.length} total</p>
              </CardContent>
            </Card>

            <Card className="bg-surface/80 backdrop-blur-md border border-spring-green/30 cyber-glow">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-white flex items-center">
                  <Shield className="w-5 h-5 mr-2 text-spring-green" />
                  Threats Blocked
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-spring-green">
                  {securityDevices.reduce((sum, device) => sum + device.blockedThreats, 0).toLocaleString()}
                </div>
                <p className="text-gray-400 text-sm">today</p>
              </CardContent>
            </Card>

            <Card className="bg-surface/80 backdrop-blur-md border border-spring-green/30 cyber-glow">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-white flex items-center">
                  <Activity className="w-5 h-5 mr-2 text-spring-green" />
                  Total Throughput
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-spring-green">
                  {(securityDevices.reduce((sum, device) => sum + device.throughput, 0) / 1000).toFixed(1)}
                </div>
                <p className="text-gray-400 text-sm">Gbps processed</p>
              </CardContent>
            </Card>

            <Card className="bg-surface/80 backdrop-blur-md border border-spring-green/30 cyber-glow">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-white flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2 text-spring-green" />
                  Health Score
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-spring-green">98%</div>
                <p className="text-gray-400 text-sm">infrastructure health</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <Tabs defaultValue="devices" className="space-y-6">
            <TabsList className="bg-surface/50 border border-gray-700">
              <TabsTrigger value="devices" className="data-[state=active]:bg-spring-green data-[state=active]:text-midnight-blue">
                Security Devices
              </TabsTrigger>
              <TabsTrigger value="events" className="data-[state=active]:bg-spring-green data-[state=active]:text-midnight-blue">
                Security Events
              </TabsTrigger>
              <TabsTrigger value="analytics" className="data-[state=active]:bg-spring-green data-[state=active]:text-midnight-blue">
                Performance Analytics
              </TabsTrigger>
            </TabsList>

            {/* Devices Tab */}
            <TabsContent value="devices" className="space-y-6">
              <div className="grid gap-6">
                {securityDevices.map((device) => (
                  <Card key={device.id} className="bg-surface/80 backdrop-blur-md border border-gray-700">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          {getDeviceIcon(device.type)}
                          <div>
                            <CardTitle className="text-white">{device.name}</CardTitle>
                            <p className="text-gray-400 text-sm">
                              {device.location} • {device.ipAddress}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={getVendorColor(device.vendor)}>
                            {device.vendor.replace('_', ' ').toUpperCase()}
                          </Badge>
                          <Badge className={getStatusColor(device.status)}>
                            {getStatusIcon(device.status)}
                            <span className="ml-1 capitalize">{device.status}</span>
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-4">
                        <div>
                          <p className="text-gray-400 text-sm">Model</p>
                          <p className="text-white font-medium">{device.model}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">Version</p>
                          <p className="text-white font-medium">{device.version}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">Throughput</p>
                          <p className="text-white font-medium">
                            {(device.throughput / 1000).toFixed(1)} / {(device.maxThroughput / 1000).toFixed(1)} Gbps
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">Threats Blocked</p>
                          <p className="text-white font-medium">{device.blockedThreats.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">Policies</p>
                          <p className="text-white font-medium">{device.policies}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">Last Check</p>
                          <p className="text-white font-medium">
                            {Math.floor((Date.now() - device.lastHeartbeat.getTime()) / 60000)} min ago
                          </p>
                        </div>
                      </div>

                      {/* Performance Metrics */}
                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-gray-400 text-sm">CPU</span>
                            <span className="text-white text-sm">{device.cpu}%</span>
                          </div>
                          <Progress value={device.cpu} className="h-2" />
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-gray-400 text-sm">Memory</span>
                            <span className="text-white text-sm">{device.memory}%</span>
                          </div>
                          <Progress value={device.memory} className="h-2" />
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-gray-400 text-sm">Storage</span>
                            <span className="text-white text-sm">{device.storage}%</span>
                          </div>
                          <Progress value={device.storage} className="h-2" />
                        </div>
                      </div>

                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-1" />
                          View Details
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            setSelectedDevice(device.id);
                            setIsConfiguring(true);
                          }}
                        >
                          <Settings className="w-4 h-4 mr-1" />
                          Configure
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => refreshDeviceMutation.mutate(device.id)}
                          disabled={refreshDeviceMutation.isPending || device.status !== 'online'}
                        >
                          <RefreshCw className="w-4 h-4 mr-1" />
                          Refresh
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Events Tab */}
            <TabsContent value="events" className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-white">Recent Security Events</h3>
                <div className="flex space-x-2">
                  <Select>
                    <SelectTrigger className="w-48 bg-midnight-blue border-gray-600 text-white">
                      <SelectValue placeholder="Filter by severity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Severities</SelectItem>
                      <SelectItem value="critical">Critical</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-1" />
                    Export
                  </Button>
                </div>
              </div>

              <div className="grid gap-4">
                {securityEvents.map((event) => (
                  <Card key={event.id} className="bg-surface/80 backdrop-blur-md border border-gray-700">
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <Badge className={getSeverityColor(event.severity)}>
                              {event.severity.toUpperCase()}
                            </Badge>
                            <Badge variant="outline" className="text-gray-300 capitalize">
                              {event.eventType.replace('_', ' ')}
                            </Badge>
                            {event.ruleId && (
                              <Badge variant="outline" className="text-gray-300">
                                {event.ruleId}
                              </Badge>
                            )}
                          </div>
                          <h4 className="text-white font-medium mb-1">{event.description}</h4>
                          <div className="grid grid-cols-3 gap-4 text-sm mb-2">
                            <div>
                              <span className="text-gray-400">Source: </span>
                              <span className="text-white">{event.source}</span>
                            </div>
                            <div>
                              <span className="text-gray-400">Destination: </span>
                              <span className="text-white">{event.destination}</span>
                            </div>
                            <div>
                              <span className="text-gray-400">Action: </span>
                              <span className="text-white capitalize">{event.action}</span>
                            </div>
                          </div>
                          <p className="text-gray-400 text-sm">
                            Device: {securityDevices.find(d => d.id === event.deviceId)?.name}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-white text-sm">
                            {event.timestamp.toLocaleTimeString()}
                          </p>
                          <p className="text-gray-400 text-xs">
                            {event.timestamp.toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-surface/80 backdrop-blur-md border border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <TrendingUp className="w-5 h-5 mr-2 text-spring-green" />
                      Threat Statistics
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Blocked Today</span>
                      <span className="text-white font-medium">5,973</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Critical Threats</span>
                      <span className="text-red-400 font-medium">↑ 15%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Detection Rate</span>
                      <span className="text-green-400 font-medium">99.7%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">False Positives</span>
                      <span className="text-green-400 font-medium">↓ 8%</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-surface/80 backdrop-blur-md border border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Activity className="w-5 h-5 mr-2 text-spring-green" />
                      Performance Metrics
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Average Response Time</span>
                      <span className="text-white font-medium">0.8ms</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">System Uptime</span>
                      <span className="text-green-400 font-medium">99.9%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Policy Updates</span>
                      <span className="text-white font-medium">Real-time</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Capacity Usage</span>
                      <span className="text-white font-medium">67%</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>

          {/* Configuration Dialog */}
          <Dialog open={isConfiguring} onOpenChange={setIsConfiguring}>
            <DialogContent className="bg-surface border border-gray-700 max-w-2xl">
              <DialogHeader>
                <DialogTitle className="text-white">Configure Security Device</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div className="bg-midnight-blue/50 p-4 rounded-lg border border-gray-600">
                  <h4 className="text-white font-medium mb-2">Device Configuration</h4>
                  <p className="text-gray-400 text-sm mb-3">
                    Update security policies, threat detection rules, and performance settings.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-gray-300">Threat Detection</Label>
                      <Select>
                        <SelectTrigger className="bg-midnight-blue border-gray-600 text-white">
                          <SelectValue placeholder="Select level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="high">High Sensitivity</SelectItem>
                          <SelectItem value="medium">Medium Sensitivity</SelectItem>
                          <SelectItem value="low">Low Sensitivity</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-gray-300">Logging Level</Label>
                      <Select>
                        <SelectTrigger className="bg-midnight-blue border-gray-600 text-white">
                          <SelectValue placeholder="Select level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="debug">Debug</SelectItem>
                          <SelectItem value="info">Information</SelectItem>
                          <SelectItem value="warning">Warning</SelectItem>
                          <SelectItem value="error">Error Only</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end space-x-2 pt-4">
                  <Button variant="outline" onClick={() => setIsConfiguring(false)}>
                    Cancel
                  </Button>
                  <Button 
                    className="bg-spring-green hover:bg-spring-green/80 text-midnight-blue"
                    onClick={() => {
                      if (selectedDevice) {
                        configureDeviceMutation.mutate({
                          deviceId: selectedDevice,
                          configuration: { threatDetection: 'high', logging: 'info' }
                        });
                      }
                    }}
                    disabled={configureDeviceMutation.isPending}
                  >
                    {configureDeviceMutation.isPending ? 'Updating...' : 'Update Configuration'}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
    </div>
  );
}