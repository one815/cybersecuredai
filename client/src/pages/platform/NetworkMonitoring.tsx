import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Network,
  Activity,
  Router,
  Wifi,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  ArrowRight,
  Settings,
  BarChart3,
  Database,
  Clock,
  Zap,
  Eye
} from "lucide-react";
import { MarketingLayout } from "@/components/MarketingLayout";
import { Link } from "wouter";
import { useState, useEffect } from "react";

export default function NetworkMonitoring() {
  const [networkUtilization, setNetworkUtilization] = useState(67);
  const [activeDevices, setActiveDevices] = useState(147);
  const [bandwidth, setBandwidth] = useState("1.2 Gbps");
  const [currentTime, setCurrentTime] = useState(new Date());
  const [networkDevices, setNetworkDevices] = useState([
    { name: "Core Switch", type: "Switch", status: "Optimal", utilization: 45, latency: "0.8ms" },
    { name: "Edge Router", type: "Router", status: "Warning", utilization: 87, latency: "2.1ms" },
    { name: "WiFi Controller", type: "Wireless", status: "Optimal", utilization: 62, latency: "1.4ms" },
    { name: "Firewall", type: "Security", status: "Optimal", utilization: 34, latency: "0.6ms" }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
      if (Math.random() > 0.7) {
        setNetworkUtilization(Math.floor(Math.random() * 40) + 50);
        setActiveDevices(Math.floor(Math.random() * 20) + 140);
        setBandwidth(`${(Math.random() * 2 + 0.8).toFixed(1)} Gbps`);
        
        // Update device metrics
        setNetworkDevices(prev => prev.map(device => ({
          ...device,
          utilization: Math.floor(Math.random() * 50) + 30,
          latency: `${(Math.random() * 2 + 0.5).toFixed(1)}ms`,
          status: device.utilization > 85 ? "Warning" : device.utilization > 95 ? "Critical" : "Optimal"
        })));
      }
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const monitoringCapabilities = [
    {
      title: "Real-Time Network Visibility",
      description: "Complete visibility into network performance, traffic patterns, and device health",
      features: ["Live topology mapping", "Traffic flow analysis", "Performance dashboards", "Capacity planning"]
    },
    {
      title: "Proactive Issue Detection",
      description: "AI-powered monitoring that identifies potential issues before they impact users",
      features: ["Anomaly detection", "Predictive analytics", "Performance baselines", "Automated alerting"]
    },
    {
      title: "Automated Network Optimization",
      description: "Intelligent optimization of network paths, QoS policies, and bandwidth allocation",
      features: ["Load balancing", "QoS management", "Path optimization", "Bandwidth throttling"]
    },
    {
      title: "Comprehensive Reporting",
      description: "Detailed analytics and reporting for network performance and utilization trends",
      features: ["Performance reports", "Utilization trending", "SLA monitoring", "Capacity forecasting"]
    }
  ];

  const performanceMetrics = [
    { label: "Network Uptime", value: "99.98%", trend: "last 30 days" },
    { label: "Average Latency", value: "1.2ms", trend: "inter-site" },
    { label: "Packet Loss Rate", value: "< 0.01%", trend: "industry best" },
    { label: "Mean Time to Detection", value: "< 30s", trend: "issue identification" }
  ];

  const trafficAnalysis = [
    { protocol: "HTTPS", percentage: 45, volume: "2.1 GB" },
    { protocol: "HTTP", percentage: 25, volume: "1.2 GB" },
    { protocol: "SSH", percentage: 15, volume: "0.7 GB" },
    { protocol: "DNS", percentage: 8, volume: "0.4 GB" },
    { protocol: "Other", percentage: 7, volume: "0.3 GB" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Optimal': return 'text-green-400 bg-green-500/20';
      case 'Warning': return 'text-yellow-400 bg-yellow-500/20';
      case 'Critical': return 'text-red-400 bg-red-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  return (
    <MarketingLayout>
      <div className="ai-dashboard-bg min-h-screen">
        {/* Header */}
        <header className="bg-surface/90 backdrop-blur-md border-b border-surface-light p-6 cyber-glow">
          <div className="container mx-auto max-w-7xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center cyber-glow">
                  <Network className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-white geometric-text">Network & Infrastructure Monitoring</h1>
                  <p className="text-xl text-gray-400">Comprehensive monitoring and management of routers, switches, and network infrastructure</p>
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
            {/* Live Network Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="bg-surface/80 backdrop-blur-md border border-blue-500/30 cyber-glow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-white flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2 text-blue-400" />
                    Network Utilization
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-400">{networkUtilization}%</div>
                  <Progress value={networkUtilization} className="mt-2" />
                </CardContent>
              </Card>

              <Card className="bg-surface/80 backdrop-blur-md border border-green-500/30 cyber-glow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-white flex items-center">
                    <Router className="w-5 h-5 mr-2 text-green-400" />
                    Active Devices
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-400">{activeDevices}</div>
                  <p className="text-gray-400 text-sm">Monitored</p>
                </CardContent>
              </Card>

              <Card className="bg-surface/80 backdrop-blur-md border border-purple-500/30 cyber-glow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-white flex items-center">
                    <Zap className="w-5 h-5 mr-2 text-purple-400" />
                    Bandwidth Usage
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-purple-400">{bandwidth}</div>
                  <p className="text-gray-400 text-sm">Current</p>
                </CardContent>
              </Card>

              <Card className="bg-surface/80 backdrop-blur-md border border-cyan-500/30 cyber-glow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-white flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2 text-cyan-400" />
                    Health Score
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-cyan-400">98.7%</div>
                  <p className="text-gray-400 text-sm">Overall</p>
                </CardContent>
              </Card>
            </div>

            {/* Network Device Status */}
            <Card className="bg-surface/80 backdrop-blur-md border border-green-500/30 cyber-glow">
              <CardHeader>
                <CardTitle className="text-2xl text-white flex items-center">
                  <Router className="w-6 h-6 mr-3 text-green-400" />
                  Infrastructure Device Status
                  <Badge className="ml-3 bg-green-500/20 text-green-400">LIVE</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {networkDevices.map((device, index) => (
                    <div key={index} className="p-4 bg-background/30 rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-white font-semibold">{device.name}</h4>
                        <Badge className={getStatusColor(device.status)}>
                          {device.status}
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Type:</span>
                          <span className="text-white">{device.type}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Utilization:</span>
                          <span className="text-white">{device.utilization}%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Latency:</span>
                          <span className="text-white">{device.latency}</span>
                        </div>
                        <Progress value={device.utilization} className="mt-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Traffic Analysis */}
            <Card className="bg-surface/80 backdrop-blur-md border border-purple-500/30 cyber-glow">
              <CardHeader>
                <CardTitle className="text-2xl text-white flex items-center">
                  <BarChart3 className="w-6 h-6 mr-3 text-purple-400" />
                  Real-Time Traffic Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-white font-semibold mb-4">Protocol Distribution</h4>
                    <div className="space-y-3">
                      {trafficAnalysis.map((traffic, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-4 h-4 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
                            <span className="text-white">{traffic.protocol}</span>
                          </div>
                          <div className="text-right">
                            <div className="text-purple-400 font-bold">{traffic.percentage}%</div>
                            <div className="text-gray-400 text-sm">{traffic.volume}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-4">Network Performance</h4>
                    <div className="space-y-4">
                      <div className="p-3 bg-background/30 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-400">Throughput</span>
                          <span className="text-green-400 font-bold">2.4 Gbps</span>
                        </div>
                        <Progress value={75} />
                      </div>
                      <div className="p-3 bg-background/30 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-400">Latency</span>
                          <span className="text-blue-400 font-bold">1.2ms avg</span>
                        </div>
                        <Progress value={20} />
                      </div>
                      <div className="p-3 bg-background/30 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-400">Error Rate</span>
                          <span className="text-yellow-400 font-bold">0.01%</span>
                        </div>
                        <Progress value={5} />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Capabilities Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {monitoringCapabilities.map((capability, index) => (
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
            <Card className="bg-gradient-to-r from-blue-900/50 to-cyan-900/50 border border-blue-500/30 cyber-glow">
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold text-white mb-8 text-center">Network Performance Metrics</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {performanceMetrics.map((metric, index) => (
                    <div key={index} className="text-center">
                      <div className="text-3xl font-bold text-blue-400 mb-2">{metric.value}</div>
                      <div className="text-white font-semibold mb-1">{metric.label}</div>
                      <div className="text-gray-400 text-sm">{metric.trend}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Call to Action */}
            <Card className="bg-gradient-to-r from-blue-900/50 to-cyan-900/50 border border-blue-500/30 cyber-glow">
              <CardContent className="p-12 text-center">
                <h2 className="text-4xl font-bold text-white mb-6">Optimize Your Network Infrastructure</h2>
                <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                  Deploy comprehensive network monitoring with AI-powered analytics and automated optimization capabilities.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/solutions">
                    <Button size="lg" className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 px-12 py-4 text-lg">
                      View Solutions
                    </Button>
                  </Link>
                  <Link href="/security-scanner">
                    <Button size="lg" variant="outline" className="border-blue-500 text-blue-400 hover:bg-blue-500/10 px-12 py-4 text-lg">
                      Network Assessment
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