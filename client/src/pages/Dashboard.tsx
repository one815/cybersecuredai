import { useQuery } from "@tanstack/react-query";
import { DashboardCard } from "@/components/DashboardCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Shield, AlertTriangle, Server, ClipboardCheck, Eye, Search, Bell, Plus, FileText, Upload, Share, Wifi, Download, Lock, Users, Activity, RefreshCw, Database, Cpu, Brain, Zap, Bot, Globe, MonitorSpeaker, Check } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
    <div className="ai-dashboard-bg min-h-screen">
      {/* Enhanced Header with Holographic AI Theme */}
      <header className="holographic-card backdrop-blur-md border-b border-surface-light p-4 chart-glow">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center floating-3d text-white text-2xl">
                🤖
              </div>
              <div>
                <h2 className="text-3xl font-bold geometric-text bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent flex items-center space-x-3">
                  <span>AI SECURITY COMMAND CENTER</span>
                  <div className="text-blue-400 text-2xl">🛡️</div>
                  <div className="text-green-400 text-2xl">📋</div>
                </h2>
                <div className="text-gray-400 flex items-center space-x-4 cyber-font">
                  <span>Real-time AI threat monitoring and autonomous security automation</span>
                  <div className="live-indicator">
                    AI NEURAL NETWORK ACTIVE
                  </div>
                </div>
              </div>
            </div>
            
            {/* Security Indicators Panel */}
            <div className="flex items-center space-x-4">
              <div className="encryption-indicator">
                QUANTUM ENCRYPTED
              </div>
              <div className="verification-badge">
                BIOMETRIC VERIFIED
              </div>
              <div className="security-protocol">
                ZERO-TRUST ACTIVE
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-6">
            {/* Facial Recognition Auth */}
            <div className="face-recognition scale-75"></div>
            
            {/* Multi-factor Authentication Panel */}
            <div className="flex items-center space-x-2 p-3 holographic-card rounded-lg">
              <div className="fingerprint-scanner scale-50"></div>
              <div className="text-sm">
                <div className="tech-font text-green-400">ADMIN AUTHENTICATED</div>
                <div className="text-gray-400 text-xs">Security Level: MAX</div>
              </div>
            </div>
            
            {/* Enhanced Search */}
            <div className="relative">
              <Input
                type="text"
                placeholder="Search threats, users, files..."
                className="bg-background border-surface-light pl-10 w-80 text-sm focus:border-interactive"
                data-testid="dashboard-search"
              />
              <div className="absolute left-3 top-3 w-4 h-4 text-gray-400">🔍</div>
            </div>
            
            {/* Notifications */}
            <div className="relative">
              <Button variant="ghost" size="icon" className="relative text-gray-400 hover:text-white" data-testid="notifications-button">
                <div className="w-5 h-5 text-lg">🔔</div>
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-critical text-xs rounded-full flex items-center justify-center">3</span>
              </Button>
            </div>

            {/* Quick Actions */}
            <Button className="bg-interactive hover:bg-orange-600" data-testid="new-incident-button">
              <div className="w-4 h-4 mr-2">➕</div>
              New Incident
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        {/* Enhanced Security Overview Cards with AI Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="holographic-card border border-blue-500/30 data-glow micro-hover floating-3d">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 text-yellow-400 text-lg">🛡️</div>
                  <span className="text-sm text-gray-400 tech-font">THREAT LEVEL</span>
                </div>
                <div className="w-5 h-5 text-yellow-400 text-lg">⚠️</div>
              </div>
              <div className="mb-4">
                <div className="text-3xl font-bold text-white mb-1 geometric-text">MEDIUM</div>
                <div className="flex justify-between mb-2">
                  <span className="text-xs text-gray-400">Safe</span>
                  <span className="text-xs text-gray-400">Critical</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-gradient-to-r from-green-500 to-yellow-500 h-2 rounded-full chart-glow" style={{width: '60%'}}></div>
                </div>
              </div>
              <div className="security-protocol">
                QUANTUM SCAN ACTIVE
              </div>
            </CardContent>
          </Card>

          <Card className="holographic-card border border-red-500/30 holographic-glow micro-hover">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 text-red-400 relative text-lg">
                    <div>⚡</div>
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  </div>
                  <span className="text-sm text-gray-400 tech-font">ACTIVE THREATS</span>
                </div>
                <div className="live-indicator">
                  LIVE
                </div>
              </div>
              <div className="text-3xl font-bold text-white mb-2 geometric-text">07</div>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-400 cyber-font">Critical</span>
                  <span className="text-red-400 font-bold">2</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 cyber-font">High</span>
                  <span className="text-orange-400 font-bold">3</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 cyber-font">Medium</span>
                  <span className="text-yellow-400 font-bold">2</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="holographic-card border border-green-500/30 data-glow micro-hover">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 text-green-400 text-lg">🔒</div>
                  <span className="text-sm text-gray-400 tech-font">SYSTEM SECURITY</span>
                </div>
                <div className="w-5 h-5 text-green-400 text-lg">✅</div>
              </div>
              <div className="text-3xl font-bold text-white mb-2 geometric-text">86%</div>
              <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                <div className="bg-gradient-to-r from-green-500 to-green-400 h-2 rounded-full chart-glow" style={{width: '86%'}}></div>
              </div>
              <div className="flex justify-between text-xs mb-2">
                <span className="text-gray-400">0%</span>
                <span className="text-gray-400">100%</span>
              </div>
              <div className="verification-badge">
                SECURED
              </div>
            </CardContent>
          </Card>

          <Card className="holographic-card border border-cyan-500/30 chart-glow micro-hover">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 text-cyan-400 text-lg">🧠</div>
                  <span className="text-sm text-gray-400 tech-font">AUTHENTICATION</span>
                </div>
                <div className="mfa-badge">
                  MFA ACTIVE
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400 cyber-font">Biometric Scan</span>
                  <div className="verification-badge">
                    VERIFIED
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400 cyber-font">Multi-Factor Auth</span>
                  <div className="encryption-indicator">
                    ACTIVE
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">✓ Password</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Threat Activity Chart */}
        <Card className="mb-8 bg-surface/80 backdrop-blur-md border border-blue-500/30 cyber-glow">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-bold text-white">Threat Activity</CardTitle>
              <Tabs defaultValue="daily" className="w-48">
                <TabsList className="bg-gray-800">
                  <TabsTrigger value="daily">Daily</TabsTrigger>
                  <TabsTrigger value="weekly">Weekly</TabsTrigger>
                  <TabsTrigger value="monthly">Monthly</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-background/50 rounded-lg p-4 mb-4 relative overflow-hidden">
              {/* Simulated Chart */}
              <div className="absolute inset-0 p-4">
                <div className="grid grid-cols-12 gap-1 h-full items-end">
                  {[3, 2, 4, 1.5, 2.8, 3.5, 2.2, 4.1, 2.9, 3.8, 2.1, 3.6].map((height, index) => (
                    <div key={index} className="relative">
                      <div 
                        className="bg-gradient-to-t from-red-600 to-red-400 rounded-t opacity-70" 
                        style={{height: `${height * 20}%`}}
                      ></div>
                      <div 
                        className="bg-gradient-to-t from-orange-600 to-orange-400 rounded-t opacity-70 mt-1" 
                        style={{height: `${(height + 1) * 15}%`}}
                      ></div>
                      <div 
                        className="bg-gradient-to-t from-cyan-600 to-cyan-400 rounded-t opacity-70 mt-1" 
                        style={{height: `${(height + 2) * 25}%`}}
                      ></div>
                    </div>
                  ))}
                </div>
                <div className="absolute bottom-4 left-4 text-xs text-gray-400">
                  00:00
                </div>
                <div className="absolute bottom-4 right-4 text-xs text-gray-400">
                  Now
                </div>
              </div>
              {/* Legend */}
              <div className="absolute top-4 right-4 space-y-1">
                <div className="flex items-center space-x-2 text-xs">
                  <div className="w-3 h-3 bg-red-500 rounded"></div>
                  <span className="text-gray-400">Critical Threats</span>
                </div>
                <div className="flex items-center space-x-2 text-xs">
                  <div className="w-3 h-3 bg-orange-500 rounded"></div>
                  <span className="text-gray-400">High Threats</span>
                </div>
                <div className="flex items-center space-x-2 text-xs">
                  <div className="w-3 h-3 bg-cyan-500 rounded"></div>
                  <span className="text-gray-400">Medium Threats</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Active Threats and Encryption Status */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Active Threats List */}
          <Card className="bg-surface/80 backdrop-blur-md border border-red-500/30 cyber-glow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-bold text-white">Active Threats</CardTitle>
                <div className="flex items-center space-x-2">
                  <Badge className="bg-red-500 text-white">Now</Badge>
                  <Button variant="link" className="text-cyan-400">View all threats</Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border border-red-500/30 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                      <span className="font-medium text-red-400">Critical</span>
                    </div>
                    <span className="text-xs text-gray-400">Now</span>
                  </div>
                  <div className="text-sm text-white font-medium mb-1">Ransomware Attempt Detected</div>
                  <div className="text-xs text-gray-400">File encryption attempt blocked on server-03</div>
                </div>
                
                <div className="border border-red-500/30 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                      <span className="font-medium text-red-400">Critical</span>
                    </div>
                    <span className="text-xs text-gray-400">10m ago</span>
                  </div>
                  <div className="text-sm text-white font-medium mb-1">Brute Force Attack</div>
                  <div className="text-xs text-gray-400">Multiple failed login attempts from IP 192.168.1.45</div>
                </div>
                
                <div className="border border-orange-500/30 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span className="font-medium text-orange-400">High</span>
                    </div>
                    <span className="text-xs text-gray-400">25m ago</span>
                  </div>
                  <div className="text-sm text-white font-medium mb-1">Suspicious Network Activity</div>
                  <div className="text-xs text-gray-400">Unusual outbound traffic detected on port 445</div>
                </div>
                
                <div className="border border-orange-500/30 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span className="font-medium text-orange-400">High</span>
                    </div>
                    <span className="text-xs text-gray-400">42m ago</span>
                  </div>
                  <div className="text-sm text-white font-medium mb-1">Unauthorized Access Attempt</div>
                  <div className="text-xs text-gray-400">User tried to access restricted database from dev-workstation</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Encryption Status */}
          <Card className="bg-surface/80 backdrop-blur-md border border-green-500/30 cyber-glow">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-white">Encryption Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-background/50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-white font-medium">Database Encryption</span>
                    <Check className="w-4 h-4 text-green-400" />
                  </div>
                  <div className="text-xs text-gray-400 mb-2">AES-256 Active</div>
                  <Progress value={100} className="h-1" />
                </div>
                
                <div className="bg-background/50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-white font-medium">File System Encryption</span>
                    <Check className="w-4 h-4 text-green-400" />
                  </div>
                  <div className="text-xs text-gray-400 mb-2">BitLocker Active</div>
                  <Progress value={100} className="h-1" />
                </div>
                
                <div className="bg-background/50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-white font-medium">Network Encryption</span>
                    <Check className="w-4 h-4 text-green-400" />
                  </div>
                  <div className="text-xs text-gray-400 mb-2">TLS 1.3 Active</div>
                  <Progress value={100} className="h-1" />
                </div>
                
                <div className="bg-background/50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-white font-medium">Email Encryption</span>
                    <AlertTriangle className="w-4 h-4 text-yellow-400" />
                  </div>
                  <div className="text-xs text-gray-400 mb-2">PGP Partial</div>
                  <Progress value={65} className="h-1" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Authentication & Access Control and System Security */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Authentication & Access Control */}
          <Card className="bg-surface/80 backdrop-blur-md border border-cyan-500/30 cyber-glow">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-white">Authentication & Access Control</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-white font-medium">Multi-Factor Authentication</span>
                    <span className="text-green-400 text-sm">92% Compliance</span>
                  </div>
                  <div className="text-xs text-gray-400 mb-2">40/50 users have MFA enabled</div>
                  <Progress value={92} className="h-2" />
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-white font-medium">Permission Boundaries</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="bg-blue-900/30 rounded px-2 py-1 text-center">
                      <div className="text-blue-400">Admin: 5</div>
                    </div>
                    <div className="bg-purple-900/30 rounded px-2 py-1 text-center">
                      <div className="text-purple-400">Power: 12</div>
                    </div>
                    <div className="bg-gray-700 rounded px-2 py-1 text-center">
                      <div className="text-gray-400">Basic: 33</div>
                    </div>
                  </div>
                  <div className="mt-2 space-y-1 text-xs text-gray-400">
                    <div className="flex justify-between">
                      <span>Last permission review:</span>
                      <span>3 days ago</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Unusual access attempts:</span>
                      <span>4 in last 24h</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Privilege escalations:</span>
                      <span>1 pending approval</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-white font-medium">Anti-Phishing Protection</span>
                    <span className="text-green-400 text-sm">Active</span>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-blue-400">24</div>
                      <div className="text-xs text-gray-400">Emails Blocked</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-400">7</div>
                      <div className="text-xs text-gray-400">Links Sanitized</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-orange-400">2</div>
                      <div className="text-xs text-gray-400">User Reports</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* System Security Status */}
          <Card className="bg-surface/80 backdrop-blur-md border border-purple-500/30 cyber-glow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-bold text-white">System Security Status</CardTitle>
                <Button className="bg-cyan-600 hover:bg-cyan-700 text-white text-xs" size="sm">
                  Run Full Scan
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="grid grid-cols-6 gap-2 text-xs text-gray-400 border-b border-gray-700 pb-2">
                  <span>SYSTEM</span>
                  <span>LAST UPDATE</span>
                  <span>FIREWALL</span>
                  <span>ANTIVIRUS</span>
                  <span>VULNERABILITIES</span>
                  <span>STATUS</span>
                </div>
                
                <div className="grid grid-cols-6 gap-2 text-xs items-center">
                  <div className="flex items-center space-x-2">
                    <Server className="w-4 h-4 text-blue-400" />
                    <span className="text-white">Main Server</span>
                  </div>
                  <span className="text-gray-400">Today, 09:45 AM</span>
                  <Badge className="bg-green-900/50 text-green-400 border-green-700 text-xs">Active</Badge>
                  <Badge className="bg-green-900/50 text-green-400 border-green-700 text-xs">Active</Badge>
                  <span className="text-green-400">0 detected</span>
                  <Badge className="bg-green-900/50 text-green-400 border-green-700 text-xs">Secure</Badge>
                </div>
                
                <div className="grid grid-cols-6 gap-2 text-xs items-center">
                  <div className="flex items-center space-x-2">
                    <Database className="w-4 h-4 text-blue-400" />
                    <span className="text-white">Database Server</span>
                  </div>
                  <span className="text-gray-400">Today, 08:30 AM</span>
                  <Badge className="bg-green-900/50 text-green-400 border-green-700 text-xs">Active</Badge>
                  <Badge className="bg-green-900/50 text-green-400 border-green-700 text-xs">Active</Badge>
                  <span className="text-green-400">0 detected</span>
                  <Badge className="bg-green-900/50 text-green-400 border-green-700 text-xs">Secure</Badge>
                </div>
                
                <div className="grid grid-cols-6 gap-2 text-xs items-center">
                  <div className="flex items-center space-x-2">
                    <Globe className="w-4 h-4 text-orange-400" />
                    <span className="text-white">Network Gateway</span>
                  </div>
                  <span className="text-gray-400">3 days ago</span>
                  <Badge className="bg-green-900/50 text-green-400 border-green-700 text-xs">Active</Badge>
                  <Badge className="bg-orange-900/50 text-orange-400 border-orange-700 text-xs">Update Required</Badge>
                  <span className="text-orange-400">2 medium</span>
                  <Badge className="bg-orange-900/50 text-orange-400 border-orange-700 text-xs">At Risk</Badge>
                </div>
                
                <div className="grid grid-cols-6 gap-2 text-xs items-center">
                  <div className="flex items-center space-x-2">
                    <Cpu className="w-4 h-4 text-blue-400" />
                    <span className="text-white">Cloud Storage</span>
                  </div>
                  <span className="text-gray-400">Today, 10:15 AM</span>
                  <Badge className="bg-green-900/50 text-green-400 border-green-700 text-xs">Active</Badge>
                  <Badge className="bg-green-900/50 text-green-400 border-green-700 text-xs">Active</Badge>
                  <span className="text-green-400">0 detected</span>
                  <Badge className="bg-green-900/50 text-green-400 border-green-700 text-xs">Secure</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Security Alerts */}
        <Card className="bg-surface/80 backdrop-blur-md border border-red-500/30 cyber-glow mb-8">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-white">Security Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 p-3 bg-red-900/20 rounded-lg border border-red-700/50">
                <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5" />
                <div className="flex-1">
                  <div className="text-sm font-medium text-red-400">Critical Security Update</div>
                  <div className="text-xs text-gray-300 mt-1">Network Gateway requires immediate security patch for CVE-2023-32456</div>
                  <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white mt-2">Apply Now</Button>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 p-3 bg-yellow-900/20 rounded-lg border border-yellow-700/50">
                <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5" />
                <div className="flex-1">
                  <div className="text-sm font-medium text-yellow-400">MFA Not Configured</div>
                  <div className="text-xs text-gray-300 mt-1">4 users have not enabled multi-factor authentication</div>
                  <Button size="sm" variant="outline" className="border-yellow-600 text-yellow-400 hover:bg-yellow-900/50 mt-2">Send Reminder</Button>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 p-3 bg-blue-900/20 rounded-lg border border-blue-700/50">
                <Eye className="w-5 h-5 text-blue-400 mt-0.5" />
                <div className="flex-1">
                  <div className="text-sm font-medium text-blue-400">Security Scan Complete</div>
                  <div className="text-xs text-gray-300 mt-1">Weekly security scan completed. 2 medium vulnerabilities detected.</div>
                  <Button size="sm" variant="outline" className="border-blue-600 text-blue-400 hover:bg-blue-900/50 mt-2">View Report</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Original sections with enhanced styling */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Real-time AI Threat Detection */}
          <Card className="bg-surface/80 backdrop-blur-md border border-cyan-500/30 cyber-glow">
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

          {/* AI-Powered Network Activity */}
          <Card className="bg-surface/80 backdrop-blur-md border border-green-500/30 cyber-glow">
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

        {/* AI-Secured File Sharing */}
        <Card className="bg-surface/80 backdrop-blur-md border border-blue-500/30 cyber-glow mb-8">
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

        {/* AI Compliance Monitoring */}
        <Card className="bg-surface/80 backdrop-blur-md border border-purple-500/30 cyber-glow">
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
