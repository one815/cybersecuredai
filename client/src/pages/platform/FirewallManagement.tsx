import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Shield,
  Network,
  Activity,
  AlertTriangle,
  CheckCircle,
  ArrowRight,
  Settings,
  TrendingUp,
  BarChart3,
  Lock,
  Eye,
  Zap,
  Database,
  Clock
} from "lucide-react";
import { MarketingLayout } from "@/components/MarketingLayout";
import { Link } from "wouter";
import { useState, useEffect } from "react";

export default function FirewallManagement() {
  const [blockedThreats, setBlockedThreats] = useState(2847);
  const [activeRules, setActiveRules] = useState(1293);
  const [throughput, setThroughput] = useState("2.4 Gbps");
  const [currentTime, setCurrentTime] = useState(new Date());
  const [liveTraffic, setLiveTraffic] = useState([
    { source: "203.0.113.5", destination: "Internal", action: "BLOCKED", protocol: "TCP:443", threat: "Malware C&C" },
    { source: "198.51.100.7", destination: "DMZ", action: "ALLOWED", protocol: "HTTPS", threat: null },
    { source: "10.0.1.45", destination: "External", action: "BLOCKED", protocol: "SSH", threat: "Brute Force" },
    { source: "172.16.0.12", destination: "Internal", action: "ALLOWED", protocol: "HTTP", threat: null }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
      if (Math.random() > 0.8) {
        setBlockedThreats(prev => prev + Math.floor(Math.random() * 5));
        setActiveRules(prev => prev + Math.floor(Math.random() * 3) - 1);
        setThroughput(`${(Math.random() * 2 + 1.5).toFixed(1)} Gbps`);
        
        // Update live traffic
        const actions = ["BLOCKED", "ALLOWED", "LOGGED"];
        const protocols = ["HTTPS", "HTTP", "SSH", "FTP", "SMTP"];
        const threats = ["Malware C&C", "Brute Force", "DDoS", "Port Scan", null, null, null];
        
        const newTraffic = {
          source: `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
          destination: ["Internal", "External", "DMZ"][Math.floor(Math.random() * 3)],
          action: actions[Math.floor(Math.random() * actions.length)],
          protocol: protocols[Math.floor(Math.random() * protocols.length)],
          threat: threats[Math.floor(Math.random() * threats.length)]
        };
        
        setLiveTraffic(prev => [newTraffic, ...prev.slice(0, 6)]);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const firewallCapabilities = [
    {
      title: "Next-Generation Firewall (NGFW)",
      description: "Advanced threat detection with deep packet inspection and application awareness",
      features: ["Application control", "Intrusion prevention", "SSL inspection", "Advanced malware protection"]
    },
    {
      title: "Unified Threat Management",
      description: "Comprehensive security platform combining multiple security functions",
      features: ["Web filtering", "Anti-virus scanning", "Email security", "Data loss prevention"]
    },
    {
      title: "Network Segmentation",
      description: "Intelligent micro-segmentation to isolate critical network resources",
      features: ["Zero-trust zones", "Dynamic policies", "Lateral movement prevention", "Asset classification"]
    },
    {
      title: "AI-Powered Analytics",
      description: "Machine learning algorithms for threat detection and policy optimization",
      features: ["Behavioral analysis", "Anomaly detection", "Predictive blocking", "Performance optimization"]
    }
  ];

  const performanceMetrics = [
    { label: "Threat Detection Rate", value: "99.7%", trend: "industry leading" },
    { label: "Latency Impact", value: "< 2ms", trend: "minimal overhead" },
    { label: "Rule Processing Speed", value: "5.2M pps", trend: "high throughput" },
    { label: "False Positive Rate", value: "< 0.1%", trend: "precision tuned" }
  ];

  const firewallZones = [
    { name: "Public DMZ", status: "Protected", rules: 247, threats: 0 },
    { name: "Internal Network", status: "Secure", rules: 156, threats: 0 },
    { name: "Guest Network", status: "Isolated", rules: 89, threats: 0 },
    { name: "Management Zone", status: "Restricted", rules: 34, threats: 0 }
  ];

  return (
    <MarketingLayout>
      <div className="ai-dashboard-bg min-h-screen">
        {/* Header */}
        <header className="bg-surface/90 backdrop-blur-md border-b border-surface-light p-6 cyber-glow">
          <div className="container mx-auto max-w-7xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl flex items-center justify-center cyber-glow">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-white geometric-text">Advanced Firewall Management</h1>
                  <p className="text-xl text-gray-400">Next-generation network security with AI-powered threat detection</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-400">Live Status</div>
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
            {/* Live Metrics Dashboard */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="bg-surface/80 backdrop-blur-md border border-red-500/30 cyber-glow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-white flex items-center">
                    <Shield className="w-5 h-5 mr-2 text-red-400" />
                    Threats Blocked
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-red-400">{blockedThreats.toLocaleString()}</div>
                  <p className="text-gray-400 text-sm">Today</p>
                </CardContent>
              </Card>

              <Card className="bg-surface/80 backdrop-blur-md border border-blue-500/30 cyber-glow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-white flex items-center">
                    <Settings className="w-5 h-5 mr-2 text-blue-400" />
                    Active Rules
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-400">{activeRules}</div>
                  <p className="text-gray-400 text-sm">Configured</p>
                </CardContent>
              </Card>

              <Card className="bg-surface/80 backdrop-blur-md border border-green-500/30 cyber-glow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-white flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2 text-green-400" />
                    Throughput
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-400">{throughput}</div>
                  <p className="text-gray-400 text-sm">Current</p>
                </CardContent>
              </Card>

              <Card className="bg-surface/80 backdrop-blur-md border border-purple-500/30 cyber-glow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-white flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2 text-purple-400" />
                    Uptime
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-purple-400">99.99%</div>
                  <p className="text-gray-400 text-sm">Last 30 days</p>
                </CardContent>
              </Card>
            </div>

            {/* Live Traffic Monitor */}
            <Card className="bg-surface/80 backdrop-blur-md border border-cyan-500/30 cyber-glow">
              <CardHeader>
                <CardTitle className="text-2xl text-white flex items-center">
                  <Activity className="w-6 h-6 mr-3 text-cyan-400" />
                  Live Traffic Monitor
                  <Badge className="ml-3 bg-green-500/20 text-green-400">LIVE</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {liveTraffic.map((traffic, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-background/30 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <Badge 
                          className={`${
                            traffic.action === 'BLOCKED' ? 'bg-red-500/20 text-red-400' :
                            traffic.action === 'ALLOWED' ? 'bg-green-500/20 text-green-400' :
                            'bg-yellow-500/20 text-yellow-400'
                          }`}
                        >
                          {traffic.action}
                        </Badge>
                        <span className="text-white font-mono">{traffic.source}</span>
                        <ArrowRight className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-300">{traffic.destination}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="text-gray-400 font-mono text-sm">{traffic.protocol}</span>
                        {traffic.threat && (
                          <Badge className="bg-red-500/20 text-red-400">
                            {traffic.threat}
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Network Zones Status */}
            <Card className="bg-surface/80 backdrop-blur-md border border-blue-500/30 cyber-glow">
              <CardHeader>
                <CardTitle className="text-2xl text-white flex items-center">
                  <Network className="w-6 h-6 mr-3 text-blue-400" />
                  Network Security Zones
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {firewallZones.map((zone, index) => (
                    <div key={index} className="p-4 bg-background/30 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-white font-semibold">{zone.name}</h4>
                        <Badge className={`${
                          zone.status === 'Protected' ? 'bg-green-500/20 text-green-400' :
                          zone.status === 'Secure' ? 'bg-blue-500/20 text-blue-400' :
                          zone.status === 'Isolated' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-purple-500/20 text-purple-400'
                        }`}>
                          {zone.status}
                        </Badge>
                      </div>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between text-gray-400">
                          <span>Active Rules:</span>
                          <span className="text-white">{zone.rules}</span>
                        </div>
                        <div className="flex justify-between text-gray-400">
                          <span>Threats:</span>
                          <span className="text-green-400">{zone.threats}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Capabilities Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {firewallCapabilities.map((capability, index) => (
                <Card key={index} className="bg-surface/80 backdrop-blur-md border border-surface-light cyber-glow">
                  <CardHeader>
                    <CardTitle className="text-xl text-white">{capability.title}</CardTitle>
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
            <Card className="bg-gradient-to-r from-red-900/50 to-orange-900/50 border border-red-500/30 cyber-glow">
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold text-white mb-8 text-center">Performance Metrics</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {performanceMetrics.map((metric, index) => (
                    <div key={index} className="text-center">
                      <div className="text-3xl font-bold text-red-400 mb-2">{metric.value}</div>
                      <div className="text-white font-semibold mb-1">{metric.label}</div>
                      <div className="text-gray-400 text-sm">{metric.trend}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Call to Action */}
            <Card className="bg-gradient-to-r from-red-900/50 to-orange-900/50 border border-red-500/30 cyber-glow">
              <CardContent className="p-12 text-center">
                <h2 className="text-4xl font-bold text-white mb-6">Secure Your Network Infrastructure</h2>
                <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                  Deploy enterprise-grade firewall management with AI-powered threat detection and automated response capabilities.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/solutions">
                    <Button size="lg" className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 px-12 py-4 text-lg">
                      View Solutions
                    </Button>
                  </Link>
                  <Link href="/security-scanner">
                    <Button size="lg" variant="outline" className="border-red-500 text-red-400 hover:bg-red-500/10 px-12 py-4 text-lg">
                      Security Assessment
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