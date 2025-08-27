import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Shield, 
  AlertTriangle, 
  Activity, 
  Globe, 
  Server,
  Users,
  Eye,
  Lock,
  Zap,
  Target,
  TrendingUp,
  CheckCircle,
  XCircle,
  Clock
} from "lucide-react";

export function HeimdallSOCDashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Fetch real-time SOC data
  const { data: socData } = useQuery({
    queryKey: ["/api/soc/dashboard"],
    refetchInterval: 5000,
  });

  const { data: threatStats } = useQuery({
    queryKey: ["/api/threats/stats"],
    refetchInterval: 10000,
  });

  const { data: networkHealth } = useQuery({
    queryKey: ["/api/network/health"],
    refetchInterval: 15000,
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 p-4">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">CyberSecure SOC</h1>
              <p className="text-blue-300">Security Operations Center</p>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-2xl font-mono text-white">
              {currentTime.toLocaleTimeString()}
            </div>
            <div className="text-blue-300">
              {currentTime.toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="mb-6 bg-slate-800/50 rounded-lg p-4 border border-blue-500/30">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">SECURE</div>
            <div className="text-xs text-gray-400">Overall Status</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400">24/7</div>
            <div className="text-xs text-gray-400">Monitoring</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-400">3</div>
            <div className="text-xs text-gray-400">Active Alerts</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-400">0</div>
            <div className="text-xs text-gray-400">Critical</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">98.7%</div>
            <div className="text-xs text-gray-400">Uptime</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400">847</div>
            <div className="text-xs text-gray-400">Endpoints</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Threat Level Monitor */}
        <Card className="bg-slate-800/70 border-blue-500/30 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2 text-yellow-400" />
                Threat Level
              </h3>
              <Badge className="bg-green-600 text-white">LOW</Badge>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Network Intrusions</span>
                <span className="text-green-400 font-bold">0</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Malware Detected</span>
                <span className="text-yellow-400 font-bold">2</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Phishing Attempts</span>
                <span className="text-orange-400 font-bold">7</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Data Exfiltration</span>
                <span className="text-green-400 font-bold">0</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-700">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400 mb-2">94%</div>
                <div className="text-sm text-gray-400">Security Score</div>
                <Progress value={94} className="h-2 mt-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Network Activity */}
        <Card className="bg-slate-800/70 border-blue-500/30 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white flex items-center">
                <Activity className="w-5 h-5 mr-2 text-blue-400" />
                Network Activity
              </h3>
              <Badge className="bg-blue-600 text-white">LIVE</Badge>
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-300">Bandwidth Usage</span>
                  <span className="text-white">2.4 GB/s</span>
                </div>
                <Progress value={68} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-300">Active Connections</span>
                  <span className="text-white">1,247</span>
                </div>
                <Progress value={42} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-300">Blocked Requests</span>
                  <span className="text-red-400">156</span>
                </div>
                <Progress value={25} className="h-2" />
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-700">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">Firewall Status</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-green-400 text-sm">Active</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* System Health */}
        <Card className="bg-slate-800/70 border-blue-500/30 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white flex items-center">
                <Server className="w-5 h-5 mr-2 text-green-400" />
                System Health
              </h3>
              <Badge className="bg-green-600 text-white">OPTIMAL</Badge>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">99.9%</div>
                <div className="text-xs text-gray-400">CPU Health</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">87%</div>
                <div className="text-xs text-gray-400">Memory</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400">2.1TB</div>
                <div className="text-xs text-gray-400">Storage</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">Normal</div>
                <div className="text-xs text-gray-400">Temperature</div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-700">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Backup Status</span>
                  <CheckCircle className="w-4 h-4 text-green-400" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Updates</span>
                  <CheckCircle className="w-4 h-4 text-green-400" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Monitoring Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Global Threat Map */}
        <Card className="bg-slate-800/70 border-blue-500/30 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white flex items-center">
                <Globe className="w-5 h-5 mr-2 text-blue-400" />
                Global Threat Map
              </h3>
              <Button size="sm" variant="outline" className="border-blue-500 text-blue-400">
                <Eye className="w-4 h-4 mr-1" />
                Full View
              </Button>
            </div>
            
            <div className="relative h-64 bg-slate-900 rounded-lg mb-4 overflow-hidden">
              {/* World Map Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-slate-900/40"></div>
              
              {/* Threat Indicators */}
              <div className="absolute top-1/4 left-1/3 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <div className="absolute top-1/2 left-2/3 w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
              <div className="absolute top-3/4 left-1/4 w-4 h-4 bg-red-500 rounded-full animate-pulse opacity-75"></div>
              <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
              
              {/* Attack Vectors */}
              <div className="absolute top-1/4 left-1/3 w-32 h-0.5 bg-red-500/50 transform rotate-45 animate-pulse"></div>
              <div className="absolute top-1/2 left-2/3 w-24 h-0.5 bg-yellow-500/50 transform -rotate-12 animate-pulse"></div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-xl font-bold text-red-400">23</div>
                <div className="text-xs text-gray-400">Active Attacks</div>
              </div>
              <div>
                <div className="text-xl font-bold text-yellow-400">156</div>
                <div className="text-xs text-gray-400">Blocked IPs</div>
              </div>
              <div>
                <div className="text-xl font-bold text-blue-400">89</div>
                <div className="text-xs text-gray-400">Countries</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security Modules Status */}
        <Card className="bg-slate-800/70 border-blue-500/30 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white flex items-center">
                <Shield className="w-5 h-5 mr-2 text-green-400" />
                Security Modules
              </h3>
              <Badge className="bg-green-600 text-white">ALL ACTIVE</Badge>
            </div>
            
            <div className="space-y-3">
              {[
                { name: "Endpoint Protection", status: "active", threats: 0 },
                { name: "Email Security", status: "active", threats: 3 },
                { name: "Network Firewall", status: "active", threats: 0 },
                { name: "DNS Filtering", status: "active", threats: 12 },
                { name: "Vulnerability Scanner", status: "active", threats: 5 },
                { name: "Identity Management", status: "active", threats: 1 },
                { name: "Backup & Recovery", status: "active", threats: 0 },
                { name: "Compliance Monitor", status: "warning", threats: 2 }
              ].map((module, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    {module.status === "active" ? (
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    ) : (
                      <AlertTriangle className="w-5 h-5 text-yellow-400" />
                    )}
                    <span className="text-white font-medium">{module.name}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Badge 
                      className={`${
                        module.threats === 0 ? "bg-green-600" : 
                        module.threats < 5 ? "bg-yellow-600" : "bg-red-600"
                      } text-white text-xs`}
                    >
                      {module.threats} threats
                    </Badge>
                    <div className={`w-2 h-2 rounded-full ${
                      module.status === "active" ? "bg-green-400 animate-pulse" : "bg-yellow-400"
                    }`}></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Incidents */}
      <div className="mt-6">
        <Card className="bg-slate-800/70 border-blue-500/30 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white flex items-center">
                <Target className="w-5 h-5 mr-2 text-orange-400" />
                Recent Security Events
              </h3>
              <Button size="sm" variant="outline" className="border-blue-500 text-blue-400">
                View All
              </Button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="text-left text-gray-400 font-medium py-2">Time</th>
                    <th className="text-left text-gray-400 font-medium py-2">Event Type</th>
                    <th className="text-left text-gray-400 font-medium py-2">Source</th>
                    <th className="text-left text-gray-400 font-medium py-2">Severity</th>
                    <th className="text-left text-gray-400 font-medium py-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { time: "14:32:15", type: "Phishing Email", source: "External", severity: "Medium", status: "Blocked" },
                    { time: "14:28:43", type: "Malware Detection", source: "Endpoint-247", severity: "High", status: "Quarantined" },
                    { time: "14:25:12", type: "Failed Login", source: "192.168.1.45", severity: "Low", status: "Monitoring" },
                    { time: "14:22:01", type: "DNS Query Block", source: "malware.example.com", severity: "Medium", status: "Blocked" },
                    { time: "14:18:33", type: "Port Scan", source: "External", severity: "Medium", status: "Blocked" }
                  ].map((event, index) => (
                    <tr key={index} className="border-b border-slate-700/50 hover:bg-slate-700/30">
                      <td className="py-3 text-gray-300 font-mono">{event.time}</td>
                      <td className="py-3 text-white">{event.type}</td>
                      <td className="py-3 text-gray-300">{event.source}</td>
                      <td className="py-3">
                        <Badge className={`${
                          event.severity === "High" ? "bg-red-600" :
                          event.severity === "Medium" ? "bg-yellow-600" : "bg-blue-600"
                        } text-white text-xs`}>
                          {event.severity}
                        </Badge>
                      </td>
                      <td className="py-3">
                        <Badge className={`${
                          event.status === "Blocked" || event.status === "Quarantined" ? "bg-green-600" :
                          event.status === "Monitoring" ? "bg-blue-600" : "bg-gray-600"
                        } text-white text-xs`}>
                          {event.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}