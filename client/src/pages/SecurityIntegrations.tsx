import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Shield, 
  Key, 
  Fingerprint, 
  Eye, 
  Smartphone, 
  Globe, 
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
  Zap
} from "lucide-react";

export default function SecurityIntegrations() {
  const [iamConnections, setIamConnections] = useState([
    { name: "Okta", status: "connected", users: 1247, lastSync: "2 min ago", health: 98 },
    { name: "Azure AD", status: "connected", users: 894, lastSync: "5 min ago", health: 95 },
    { name: "OneLogin", status: "disconnected", users: 0, lastSync: "Never", health: 0 }
  ]);

  const [siemIntegrations, setSiemIntegrations] = useState([
    { name: "Splunk Enterprise", status: "active", events: "2.1M/day", storage: "85%", alerts: 14 },
    { name: "IBM QRadar", status: "active", events: "1.8M/day", storage: "72%", alerts: 8 },
    { name: "LogRhythm", status: "pending", events: "0", storage: "0%", alerts: 0 }
  ]);

  const [threatIntelFeeds, setThreatIntelFeeds] = useState([
    { name: "CrowdStrike Falcon", status: "active", indicators: "45K", confidence: "High", lastUpdate: "Real-time" },
    { name: "IBM X-Force", status: "active", indicators: "38K", confidence: "High", lastUpdate: "15 min ago" },
    { name: "AlienVault OTX", status: "active", indicators: "120K", confidence: "Medium", lastUpdate: "30 min ago" },
    { name: "Microsoft Defender", status: "connected", indicators: "52K", confidence: "High", lastUpdate: "5 min ago" }
  ]);

  return (
    <div className="ai-dashboard-bg min-h-screen">
      {/* Header */}
      <header className="bg-surface/90 backdrop-blur-md border-b border-surface-light p-6 cyber-glow">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-500 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent flex items-center space-x-2">
                  <span>Security Integrations</span>
                  <Shield className="w-6 h-6 text-purple-400" />
                  <Lock className="w-6 h-6 text-blue-400" />
                </h2>
                <p className="text-gray-400">Enterprise security platform connections and configurations</p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button className="bg-purple-600 hover:bg-purple-700" data-testid="add-integration-button">
              <Plus className="w-4 h-4 mr-2" />
              Add Integration
            </Button>
            <Button variant="outline" className="border-purple-500 text-purple-400" data-testid="sync-all-button">
              <RefreshCw className="w-4 h-4 mr-2" />
              Sync All
            </Button>
          </div>
        </div>
      </header>

      <main className="p-6">
        <Tabs defaultValue="iam" className="space-y-6">
          <TabsList className="bg-surface border border-surface-light">
            <TabsTrigger value="iam" className="data-[state=active]:bg-purple-600">
              <Users className="w-4 h-4 mr-2" />
              IAM Platforms
            </TabsTrigger>
            <TabsTrigger value="authentication" className="data-[state=active]:bg-blue-600">
              <Key className="w-4 h-4 mr-2" />
              Authentication
            </TabsTrigger>
            <TabsTrigger value="threat-intel" className="data-[state=active]:bg-red-600">
              <Brain className="w-4 h-4 mr-2" />
              Threat Intelligence
            </TabsTrigger>
            <TabsTrigger value="siem" className="data-[state=active]:bg-green-600">
              <Activity className="w-4 h-4 mr-2" />
              SIEM & Analytics
            </TabsTrigger>
            <TabsTrigger value="ztna" className="data-[state=active]:bg-orange-600">
              <Network className="w-4 h-4 mr-2" />
              Zero Trust
            </TabsTrigger>
          </TabsList>

          {/* IAM Platforms */}
          <TabsContent value="iam" className="space-y-6">
            <Card className="bg-surface/80 backdrop-blur-md border border-purple-500/30 cyber-glow">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-white flex items-center space-x-2">
                  <span>Identity & Access Management Platforms</span>
                  <Users className="w-5 h-5 text-purple-400" />
                  <Key className="w-5 h-5 text-blue-400" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {iamConnections.map((iam, index) => (
                    <Card key={index} className={`bg-background/50 border ${
                      iam.status === 'connected' ? 'border-green-500/30' : 'border-gray-500/30'
                    }`}>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-2">
                            <div className={`w-3 h-3 rounded-full ${
                              iam.status === 'connected' ? 'bg-green-400' : 'bg-gray-400'
                            }`}></div>
                            <span className="font-medium text-white">{iam.name}</span>
                          </div>
                          <Badge variant={iam.status === 'connected' ? 'default' : 'secondary'} 
                                 className={iam.status === 'connected' ? 'bg-green-600' : 'bg-gray-600'}>
                            {iam.status}
                          </Badge>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Connected Users:</span>
                            <span className="text-white">{iam.users.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Last Sync:</span>
                            <span className="text-white">{iam.lastSync}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Health Score:</span>
                            <span className="text-white">{iam.health}%</span>
                          </div>
                          {iam.status === 'connected' && (
                            <Progress value={iam.health} className="h-2" />
                          )}
                        </div>
                        
                        <div className="mt-4 flex space-x-2">
                          <Button size="sm" variant={iam.status === 'connected' ? 'outline' : 'default'} 
                                  className="flex-1">
                            {iam.status === 'connected' ? 'Configure' : 'Connect'}
                          </Button>
                          {iam.status === 'connected' && (
                            <Button size="sm" variant="ghost" className="text-gray-400">
                              <Settings className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Authentication Methods */}
          <TabsContent value="authentication" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Hardware Security Keys */}
              <Card className="bg-surface/80 backdrop-blur-md border border-blue-500/30 cyber-glow">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-white flex items-center">
                    <Key className="w-5 h-5 mr-2 text-blue-400" />
                    Hardware Security Keys
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                          <Key className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <div className="font-medium text-white">YubiKey 5 Series</div>
                          <div className="text-xs text-gray-400">FIDO2/WebAuthn Compatible</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className="bg-green-600">Active</Badge>
                        <span className="text-sm text-gray-400">247 enrolled</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                          <Shield className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <div className="font-medium text-white">Titan Security Keys</div>
                          <div className="text-xs text-gray-400">Google Authenticator Compatible</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className="bg-green-600">Active</Badge>
                        <span className="text-sm text-gray-400">89 enrolled</span>
                      </div>
                    </div>

                    <div className="mt-4 p-3 bg-blue-900/20 rounded-lg border border-blue-600/50">
                      <div className="text-sm text-blue-400 font-medium mb-2">FIDO2/WebAuthn Status</div>
                      <div className="grid grid-cols-2 gap-4 text-xs">
                        <div>
                          <div className="text-gray-400">Registered Keys:</div>
                          <div className="text-white font-medium">336</div>
                        </div>
                        <div>
                          <div className="text-gray-400">Success Rate:</div>
                          <div className="text-green-400 font-medium">99.7%</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Biometric Authentication */}
              <Card className="bg-surface/80 backdrop-blur-md border border-cyan-500/30 cyber-glow">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-white flex items-center">
                    <Fingerprint className="w-5 h-5 mr-2 text-cyan-400" />
                    Biometric Authentication
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Fingerprint className="w-6 h-6 text-cyan-400" />
                        <div>
                          <div className="font-medium text-white">Fingerprint Recognition</div>
                          <div className="text-xs text-gray-400">TouchID / Windows Hello</div>
                        </div>
                      </div>
                      <Switch checked={true} />
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Eye className="w-6 h-6 text-purple-400" />
                        <div>
                          <div className="font-medium text-white">Facial Recognition</div>
                          <div className="text-xs text-gray-400">FaceID / Windows Hello</div>
                        </div>
                      </div>
                      <Switch checked={true} />
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Monitor className="w-6 h-6 text-green-400" />
                        <div>
                          <div className="font-medium text-white">Voice Recognition</div>
                          <div className="text-xs text-gray-400">Azure Cognitive Services</div>
                        </div>
                      </div>
                      <Switch checked={false} />
                    </div>

                    <div className="mt-4 p-3 bg-cyan-900/20 rounded-lg border border-cyan-600/50">
                      <div className="text-sm text-cyan-400 font-medium mb-2">Biometric Enrollment</div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-400">Fingerprint:</span>
                          <span className="text-white">412 users (82%)</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-400">Facial:</span>
                          <span className="text-white">387 users (77%)</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-400">Voice:</span>
                          <span className="text-white">156 users (31%)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* TOTP Authentication */}
              <Card className="bg-surface/80 backdrop-blur-md border border-green-500/30 cyber-glow">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-white flex items-center">
                    <Smartphone className="w-5 h-5 mr-2 text-green-400" />
                    TOTP Authentication Services
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                          <Smartphone className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <div className="font-medium text-white">Google Authenticator</div>
                          <div className="text-xs text-gray-400">Primary TOTP Provider</div>
                        </div>
                      </div>
                      <Badge className="bg-green-600">Active</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                          <Shield className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <div className="font-medium text-white">Microsoft Authenticator</div>
                          <div className="text-xs text-gray-400">Enterprise Integration</div>
                        </div>
                      </div>
                      <Badge className="bg-green-600">Active</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                          <Lock className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <div className="font-medium text-white">Authy</div>
                          <div className="text-xs text-gray-400">Backup Authentication</div>
                        </div>
                      </div>
                      <Badge className="bg-green-600">Active</Badge>
                    </div>

                    <div className="mt-4 p-3 bg-green-900/20 rounded-lg border border-green-600/50">
                      <div className="text-sm text-green-400 font-medium mb-2">TOTP Usage Statistics</div>
                      <div className="grid grid-cols-2 gap-4 text-xs">
                        <div>
                          <div className="text-gray-400">Total Enrolled:</div>
                          <div className="text-white font-medium">463 users</div>
                        </div>
                        <div>
                          <div className="text-gray-400">Success Rate:</div>
                          <div className="text-green-400 font-medium">98.9%</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Threat Intelligence */}
          <TabsContent value="threat-intel" className="space-y-6">
            <Card className="bg-surface/80 backdrop-blur-md border border-red-500/30 cyber-glow">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-white">Threat Intelligence Platforms</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {threatIntelFeeds.map((feed, index) => (
                    <Card key={index} className="bg-background/50 border border-red-500/30">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-2">
                            <Brain className="w-5 h-5 text-red-400" />
                            <span className="font-medium text-white">{feed.name}</span>
                          </div>
                          <Badge className={`${
                            feed.status === 'active' ? 'bg-green-600' : 'bg-yellow-600'
                          }`}>
                            {feed.status}
                          </Badge>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Threat Indicators:</span>
                            <span className="text-white">{feed.indicators}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Confidence Level:</span>
                            <span className={`${
                              feed.confidence === 'High' ? 'text-green-400' : 'text-yellow-400'
                            }`}>{feed.confidence}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Last Update:</span>
                            <span className="text-white">{feed.lastUpdate}</span>
                          </div>
                        </div>
                        
                        <div className="mt-4 flex space-x-2">
                          <Button size="sm" variant="outline" className="flex-1">
                            Configure
                          </Button>
                          <Button size="sm" variant="ghost" className="text-gray-400">
                            <RefreshCw className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* SIEM & Analytics */}
          <TabsContent value="siem" className="space-y-6">
            <Card className="bg-surface/80 backdrop-blur-md border border-green-500/30 cyber-glow">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-white">SIEM & Security Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {siemIntegrations.map((siem, index) => (
                    <Card key={index} className={`bg-background/50 border ${
                      siem.status === 'active' ? 'border-green-500/30' : 'border-yellow-500/30'
                    }`}>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-2">
                            <Activity className="w-5 h-5 text-green-400" />
                            <span className="font-medium text-white">{siem.name}</span>
                          </div>
                          <Badge className={`${
                            siem.status === 'active' ? 'bg-green-600' : 'bg-yellow-600'
                          }`}>
                            {siem.status}
                          </Badge>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Events/Day:</span>
                            <span className="text-white">{siem.events}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Storage Used:</span>
                            <span className="text-white">{siem.storage}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Active Alerts:</span>
                            <span className="text-red-400">{siem.alerts}</span>
                          </div>
                        </div>
                        
                        <div className="mt-4">
                          <Button size="sm" variant="outline" className="w-full">
                            View Dashboard
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Zero Trust Network Access */}
          <TabsContent value="ztna" className="space-y-6">
            <Card className="bg-surface/80 backdrop-blur-md border border-orange-500/30 cyber-glow">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-white">Zero Trust Network Access</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="bg-background/50 border border-orange-500/30">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-medium text-white">Network Segmentation</h3>
                        <Badge className="bg-green-600">Active</Badge>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 bg-surface/50 rounded-lg">
                          <span className="text-gray-400">Micro-segmentation</span>
                          <Switch checked={true} />
                        </div>
                        <div className="flex items-center justify-between p-3 bg-surface/50 rounded-lg">
                          <span className="text-gray-400">Dynamic Policies</span>
                          <Switch checked={true} />
                        </div>
                        <div className="flex items-center justify-between p-3 bg-surface/50 rounded-lg">
                          <span className="text-gray-400">Continuous Verification</span>
                          <Switch checked={true} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-background/50 border border-orange-500/30">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-medium text-white">Access Policies</h3>
                        <Button size="sm" variant="outline">Manage</Button>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Active Policies:</span>
                          <span className="text-white">247</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Users Covered:</span>
                          <span className="text-white">100%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Devices Managed:</span>
                          <span className="text-white">1,847</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Trust Score:</span>
                          <span className="text-green-400">94%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card className="bg-background/50 border border-orange-500/30 mt-6">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-medium text-white mb-4">Zero Trust Posture</h3>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-green-400 mb-2">97%</div>
                        <div className="text-sm text-gray-400">Identity Verification</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-blue-400 mb-2">94%</div>
                        <div className="text-sm text-gray-400">Device Compliance</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-purple-400 mb-2">89%</div>
                        <div className="text-sm text-gray-400">Network Segmentation</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-orange-400 mb-2">92%</div>
                        <div className="text-sm text-gray-400">Policy Enforcement</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}