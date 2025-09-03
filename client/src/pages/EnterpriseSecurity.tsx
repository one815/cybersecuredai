import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Shield, 
  Key, 
  Fingerprint, 
  Eye, 
  Smartphone, 
  Activity, 
  Database, 
  Network,
  Settings,
  Check,
  AlertTriangle,
  Plus,
  RefreshCw,
  Lock,
  Users,
  Monitor,
  Server,
  Brain,
  Zap,
  HardDrive,
  Cpu,
  CheckCircle,
  XCircle,
  Clock
} from "lucide-react";

export default function EnterpriseSecurity() {
  const [hsmDevices] = useState([
    { name: "Thales Luna HSM", status: "active", keys: 247, maxKeys: 1000, health: 98, location: "Primary DC" },
    { name: "YubiHSM 2", status: "active", keys: 156, maxKeys: 500, health: 95, location: "Secondary DC" },
    { name: "AWS Cloud HSM", status: "connected", keys: 89, maxKeys: "Unlimited", health: 100, location: "US-East-1" }
  ]);

  const [biometricSystems] = useState([
    { name: "Auth0 Facial Recognition", status: "active", users: 1247, accuracy: 99.7, lastUpdate: "2 min ago" },
    { name: "NEC Corporation Advanced Biometrics", status: "active", users: 1456, accuracy: 99.9, lastUpdate: "3 min ago" },
    { name: "Portal Guard Bio-Key Enterprise", status: "active", users: 987, accuracy: 99.5, lastUpdate: "8 min ago" }
  ]);

  const [threatIntelSources] = useState([
    { name: "VirusTotal", status: "configured", indicators: "2.1M", confidence: "High", lastUpdate: "Real-time" },
    { name: "Palo Alto Cortex XDR", status: "pending", indicators: "45K", confidence: "High", lastUpdate: "Awaiting API Key" },
    { name: "Mandiant", status: "optional", indicators: "32K", confidence: "High", lastUpdate: "User configurable" },
    { name: "IBM X-Force", status: "pending", indicators: "38K", confidence: "High", lastUpdate: "Awaiting API Key" },
    { name: "AlienVault OTX", status: "active", indicators: "120K", confidence: "Medium", lastUpdate: "30 min ago" }
  ]);

  const [securityInfrastructure] = useState([
    { name: "Palo Alto PA-5220", status: "active", throughput: "20 Gbps", blocked: 1847, health: 98 },
    { name: "Cisco Firepower 2130", status: "active", throughput: "10 Gbps", blocked: 956, health: 95 },
    { name: "F5 BIG-IP ASM", status: "maintenance", throughput: "0 Gbps", blocked: 0, health: 0 }
  ]);

  const [enterpriseIAM] = useState([
    { name: "Okta Identity", status: "active", users: 1247, policies: 42, lastSync: "2 min ago" },
    { name: "Azure AD", status: "active", users: 894, policies: 28, lastSync: "5 min ago" },
    { name: "OneLogin", status: "pending", users: 0, policies: 0, lastSync: "Awaiting Setup" }
  ]);

  return (
    <div className="ai-dashboard-bg min-h-screen">
      {/* Header */}
      <header className="bg-surface/90 backdrop-blur-md border-b border-surface-light p-6 cyber-glow">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent flex items-center space-x-2">
                  <span>Enterprise Security</span>
                  <Shield className="w-6 h-6 text-blue-400" />
                  <Lock className="w-6 h-6 text-purple-400" />
                </h2>
                <p className="text-gray-400">Advanced security infrastructure and enterprise-grade protection</p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button className="bg-blue-600 hover:bg-blue-700" data-testid="add-security-component-button">
              <Plus className="w-4 h-4 mr-2" />
              Add Component
            </Button>
            <Button variant="outline" className="border-blue-500 text-blue-400" data-testid="sync-security-button">
              <RefreshCw className="w-4 h-4 mr-2" />
              Sync All
            </Button>
          </div>
        </div>
      </header>

      <main className="p-6">
        <Tabs defaultValue="hsm" className="space-y-6">
          <TabsList className="bg-surface border border-surface-light">
            <TabsTrigger value="hsm" className="data-[state=active]:bg-blue-600">
              <HardDrive className="w-4 h-4 mr-2" />
              Hardware Security
            </TabsTrigger>
            <TabsTrigger value="biometric" className="data-[state=active]:bg-purple-600">
              <Fingerprint className="w-4 h-4 mr-2" />
              Biometric Auth
            </TabsTrigger>
            <TabsTrigger value="threat-intel" className="data-[state=active]:bg-red-600">
              <Brain className="w-4 h-4 mr-2" />
              Threat Intelligence
            </TabsTrigger>
            <TabsTrigger value="infrastructure" className="data-[state=active]:bg-green-600">
              <Monitor className="w-4 h-4 mr-2" />
              Infrastructure
            </TabsTrigger>
            <TabsTrigger value="iam" className="data-[state=active]:bg-orange-600">
              <Users className="w-4 h-4 mr-2" />
              Enterprise IAM
            </TabsTrigger>
          </TabsList>

          {/* Hardware Security Modules */}
          <TabsContent value="hsm" className="space-y-6">
            <Card className="bg-surface/80 backdrop-blur-md border border-blue-500/30 cyber-glow">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-white flex items-center space-x-2">
                  <span>Hardware Security Modules (HSM)</span>
                  <HardDrive className="w-5 h-5 text-blue-400" />
                  <Shield className="w-5 h-5 text-green-400" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {hsmDevices.map((device, index) => (
                    <Card key={index} className={`bg-background/50 border ${
                      device.status === 'active' ? 'border-green-500/30' : 'border-gray-500/30'
                    }`}>
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <HardDrive className="w-5 h-5 text-blue-400" />
                            <span className="font-medium">{device.name}</span>
                          </div>
                          <Badge variant={device.status === 'active' ? 'default' : 'secondary'} data-testid={`hsm-status-${index}`}>
                            {device.status}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Keys Used:</span>
                          <span className="text-white">{device.keys}/{device.maxKeys}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Health:</span>
                          <span className="text-green-400">{device.health}%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Location:</span>
                          <span className="text-white">{device.location}</span>
                        </div>
                        <Progress value={device.health} className="h-2" />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Biometric Authentication */}
          <TabsContent value="biometric" className="space-y-6">
            <Card className="bg-surface/80 backdrop-blur-md border border-purple-500/30 cyber-glow">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-white flex items-center space-x-2">
                  <span>Biometric Authentication Systems</span>
                  <Fingerprint className="w-5 h-5 text-purple-400" />
                  <Eye className="w-5 h-5 text-blue-400" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {biometricSystems.map((system, index) => (
                    <Card key={index} className={`bg-background/50 border ${
                      system.status === 'active' ? 'border-green-500/30' : 'border-gray-500/30'
                    }`}>
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Fingerprint className="w-5 h-5 text-purple-400" />
                            <span className="font-medium">{system.name}</span>
                          </div>
                          <Badge variant={system.status === 'active' ? 'default' : 'secondary'} data-testid={`biometric-status-${index}`}>
                            {system.status}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Enrolled Users:</span>
                          <span className="text-white">{system.users.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Accuracy:</span>
                          <span className="text-green-400">{system.accuracy}%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Last Update:</span>
                          <span className="text-white">{system.lastUpdate}</span>
                        </div>
                        <Progress value={system.accuracy} className="h-2" />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Enhanced Threat Intelligence */}
          <TabsContent value="threat-intel" className="space-y-6">
            <Card className="bg-surface/80 backdrop-blur-md border border-red-500/30 cyber-glow">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-white flex items-center space-x-2">
                  <span>Enhanced Threat Intelligence Feeds</span>
                  <Brain className="w-5 h-5 text-red-400" />
                  <Zap className="w-5 h-5 text-yellow-400" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {threatIntelSources.map((source, index) => (
                    <Card key={index} className={`bg-background/50 border ${
                      source.status === 'active' ? 'border-green-500/30' : 
                      source.status === 'configured' ? 'border-blue-500/30' : 'border-gray-500/30'
                    }`}>
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Brain className="w-5 h-5 text-red-400" />
                            <span className="font-medium text-sm">{source.name}</span>
                          </div>
                          <Badge variant={
                            source.status === 'active' ? 'default' : 
                            source.status === 'configured' ? 'secondary' : 'destructive'
                          } data-testid={`threat-intel-status-${index}`}>
                            {source.status}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-400">Indicators:</span>
                          <span className="text-white">{source.indicators}</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-400">Confidence:</span>
                          <span className="text-green-400">{source.confidence}</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-400">Last Update:</span>
                          <span className="text-white">{source.lastUpdate}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Infrastructure */}
          <TabsContent value="infrastructure" className="space-y-6">
            <Card className="bg-surface/80 backdrop-blur-md border border-green-500/30 cyber-glow">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-white flex items-center space-x-2">
                  <span>Security Infrastructure Monitoring</span>
                  <Monitor className="w-5 h-5 text-green-400" />
                  <Activity className="w-5 h-5 text-blue-400" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {securityInfrastructure.map((device, index) => (
                    <Card key={index} className={`bg-background/50 border ${
                      device.status === 'active' ? 'border-green-500/30' : 'border-gray-500/30'
                    }`}>
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Monitor className="w-5 h-5 text-green-400" />
                            <span className="font-medium">{device.name}</span>
                          </div>
                          <Badge variant={device.status === 'active' ? 'default' : 'secondary'} data-testid={`infrastructure-status-${index}`}>
                            {device.status}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Throughput:</span>
                          <span className="text-white">{device.throughput}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Threats Blocked:</span>
                          <span className="text-red-400">{device.blocked.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Health:</span>
                          <span className="text-green-400">{device.health}%</span>
                        </div>
                        <Progress value={device.health} className="h-2" />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Enterprise IAM */}
          <TabsContent value="iam" className="space-y-6">
            <Card className="bg-surface/80 backdrop-blur-md border border-orange-500/30 cyber-glow">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-white flex items-center space-x-2">
                  <span>Enterprise Identity & Access Management</span>
                  <Users className="w-5 h-5 text-orange-400" />
                  <Key className="w-5 h-5 text-blue-400" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {enterpriseIAM.map((iam, index) => (
                    <Card key={index} className={`bg-background/50 border ${
                      iam.status === 'active' ? 'border-green-500/30' : 'border-gray-500/30'
                    }`}>
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Users className="w-5 h-5 text-orange-400" />
                            <span className="font-medium">{iam.name}</span>
                          </div>
                          <Badge variant={iam.status === 'active' ? 'default' : 'secondary'} data-testid={`iam-status-${index}`}>
                            {iam.status}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Managed Users:</span>
                          <span className="text-white">{iam.users.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Active Policies:</span>
                          <span className="text-blue-400">{iam.policies}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Last Sync:</span>
                          <span className="text-white">{iam.lastSync}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Quick Actions */}
        <Card className="bg-surface/80 backdrop-blur-md border border-surface-light mt-6">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button variant="outline" className="justify-start h-auto p-4 border-blue-500/30" data-testid="configure-hsm-button">
                <div className="flex items-center space-x-3">
                  <Settings className="w-5 h-5 text-blue-400" />
                  <div className="text-left">
                    <div className="font-medium">Configure HSM</div>
                    <div className="text-xs text-gray-400">Set up hardware security</div>
                  </div>
                </div>
              </Button>
              
              <Button variant="outline" className="justify-start h-auto p-4 border-purple-500/30" data-testid="enroll-biometric-button">
                <div className="flex items-center space-x-3">
                  <Fingerprint className="w-5 h-5 text-purple-400" />
                  <div className="text-left">
                    <div className="font-medium">Enroll Biometric</div>
                    <div className="text-xs text-gray-400">Add biometric authentication</div>
                  </div>
                </div>
              </Button>
              
              <Button variant="outline" className="justify-start h-auto p-4 border-red-500/30" data-testid="update-threat-feeds-button">
                <div className="flex items-center space-x-3">
                  <Brain className="w-5 h-5 text-red-400" />
                  <div className="text-left">
                    <div className="font-medium">Update Feeds</div>
                    <div className="text-xs text-gray-400">Refresh threat intelligence</div>
                  </div>
                </div>
              </Button>
              
              <Button variant="outline" className="justify-start h-auto p-4 border-green-500/30" data-testid="monitor-infrastructure-button">
                <div className="flex items-center space-x-3">
                  <Monitor className="w-5 h-5 text-green-400" />
                  <div className="text-left">
                    <div className="font-medium">Monitor Infrastructure</div>
                    <div className="text-xs text-gray-400">Check system health</div>
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