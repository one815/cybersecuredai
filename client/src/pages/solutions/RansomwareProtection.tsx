import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Shield,
  Lock,
  Database,
  AlertTriangle,
  CheckCircle,
  ArrowRight,
  Settings,
  Activity,
  Eye,
  Zap,
  Brain,
  Clock,
  FileX,
  HardDrive,
  Network
} from "lucide-react";
import { MarketingLayout } from "@/components/MarketingLayout";
import { Link } from "wouter";
import { useState, useEffect } from "react";

export default function RansomwareProtection() {
  const [threatsBlocked, setThreatsBlocked] = useState(1847);
  const [filesProtected, setFilesProtected] = useState(2.4);
  const [systemsSecured, setSystemsSecured] = useState(156);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [liveThreats, setLiveThreats] = useState([
    { source: "External", type: "Ransomware.Ryuk", action: "BLOCKED", target: "File Server", method: "Behavioral Detection" },
    { source: "Email", type: "Ransomware.Locky", action: "QUARANTINED", target: "Workstation", method: "ML Analysis" },
    { source: "Web", type: "Ransomware.WannaCry", action: "BLOCKED", target: "Network Share", method: "Signature Match" },
    { source: "USB", type: "Ransomware.BadRabbit", action: "ISOLATED", target: "Endpoint", method: "Zero-Day Detection" }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
      if (Math.random() > 0.7) {
        setThreatsBlocked(prev => prev + Math.floor(Math.random() * 8));
        setFilesProtected(prev => parseFloat((prev + Math.random() * 0.1).toFixed(1)));
        setSystemsSecured(Math.floor(Math.random() * 5) + 154);
        
        // Update live threats
        const sources = ["External", "Email", "Web", "USB", "Network"];
        const types = ["Ransomware.Ryuk", "Ransomware.Maze", "Ransomware.Sodinokibi", "Ransomware.DarkSide"];
        const actions = ["BLOCKED", "QUARANTINED", "ISOLATED", "ANALYZED"];
        const targets = ["File Server", "Workstation", "Network Share", "Database", "Backup System"];
        const methods = ["Behavioral Detection", "ML Analysis", "Signature Match", "Zero-Day Detection"];
        
        const newThreat = {
          source: sources[Math.floor(Math.random() * sources.length)],
          type: types[Math.floor(Math.random() * types.length)],
          action: actions[Math.floor(Math.random() * actions.length)],
          target: targets[Math.floor(Math.random() * targets.length)],
          method: methods[Math.floor(Math.random() * methods.length)]
        };
        
        setLiveThreats(prev => [newThreat, ...prev.slice(0, 5)]);
      }
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const protectionLayers = [
    {
      title: "Predictive Ransomware Detection",
      description: "AI-powered behavioral analysis identifies ransomware before file encryption begins",
      icon: <Brain className="w-8 h-8" />,
      features: ["Machine learning models", "Behavioral pattern analysis", "Pre-encryption detection", "Zero-day protection"]
    },
    {
      title: "Real-Time File Protection",
      description: "Continuous monitoring and protection of critical files and systems",
      icon: <Shield className="w-8 h-8" />,
      features: ["File integrity monitoring", "Access control enforcement", "Automated backups", "Version recovery"]
    },
    {
      title: "Network Isolation & Containment",
      description: "Automatic network segmentation to prevent ransomware spread",
      icon: <Network className="w-8 h-8" />,
      features: ["Automated isolation", "Lateral movement prevention", "Network segmentation", "Quarantine protocols"]
    },
    {
      title: "Rapid Recovery Systems",
      description: "Automated recovery and restoration processes for ransomware incidents",
      icon: <HardDrive className="w-8 h-8" />,
      features: ["Automated restoration", "Clean backup verification", "System rollback", "Business continuity"]
    }
  ];

  const industryStats = [
    { sector: "K-12 Education", attacks: "45% increase", recovery: "72 hours avg", protection: "99.2%" },
    { sector: "Higher Education", attacks: "38% increase", recovery: "48 hours avg", protection: "98.7%" },
    { sector: "Municipal Gov", attacks: "52% increase", recovery: "96 hours avg", protection: "99.1%" },
    { sector: "Federal Agencies", attacks: "31% increase", recovery: "24 hours avg", protection: "99.8%" }
  ];

  const ransomwareFamilies = [
    { name: "Ryuk", detectionRate: 99.8, samples: 2847 },
    { name: "Maze", detectionRate: 99.5, samples: 1923 },
    { name: "Sodinokibi", detectionRate: 99.7, samples: 2156 },
    { name: "DarkSide", detectionRate: 99.9, samples: 1634 }
  ];

  const getActionColor = (action: string) => {
    switch (action) {
      case 'BLOCKED': return 'text-red-400 bg-red-500/20';
      case 'QUARANTINED': return 'text-yellow-400 bg-yellow-500/20';
      case 'ISOLATED': return 'text-orange-400 bg-orange-500/20';
      case 'ANALYZED': return 'text-blue-400 bg-blue-500/20';
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
                <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl flex items-center justify-center cyber-glow">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-white geometric-text">Advanced Ransomware Protection</h1>
                  <p className="text-xl text-gray-400">Multi-layered ransomware defense with AI-powered detection and automated response</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-400">Live Protection</div>
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
            {/* Live Protection Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="bg-surface/80 backdrop-blur-md border border-red-500/30 cyber-glow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-white flex items-center">
                    <FileX className="w-5 h-5 mr-2 text-red-400" />
                    Threats Blocked
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-red-400">{threatsBlocked.toLocaleString()}</div>
                  <p className="text-gray-400 text-sm">This month</p>
                </CardContent>
              </Card>

              <Card className="bg-surface/80 backdrop-blur-md border border-green-500/30 cyber-glow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-white flex items-center">
                    <Database className="w-5 h-5 mr-2 text-green-400" />
                    Files Protected
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-400">{filesProtected}M</div>
                  <p className="text-gray-400 text-sm">Continuously monitored</p>
                </CardContent>
              </Card>

              <Card className="bg-surface/80 backdrop-blur-md border border-blue-500/30 cyber-glow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-white flex items-center">
                    <Lock className="w-5 h-5 mr-2 text-blue-400" />
                    Systems Secured
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-400">{systemsSecured}</div>
                  <p className="text-gray-400 text-sm">Endpoints protected</p>
                </CardContent>
              </Card>

              <Card className="bg-surface/80 backdrop-blur-md border border-purple-500/30 cyber-glow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-white flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2 text-purple-400" />
                    Success Rate
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-purple-400">99.8%</div>
                  <p className="text-gray-400 text-sm">Detection accuracy</p>
                </CardContent>
              </Card>
            </div>

            {/* Live Threat Detection */}
            <Card className="bg-surface/80 backdrop-blur-md border border-red-500/30 cyber-glow">
              <CardHeader>
                <CardTitle className="text-2xl text-white flex items-center">
                  <Eye className="w-6 h-6 mr-3 text-red-400" />
                  Real-Time Ransomware Detection
                  <Badge className="ml-3 bg-red-500/20 text-red-400">LIVE</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {liveThreats.map((threat, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-background/30 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <Badge className={getActionColor(threat.action)}>
                          {threat.action}
                        </Badge>
                        <div>
                          <div className="text-white font-semibold">{threat.type}</div>
                          <div className="text-gray-400 text-sm">{threat.source} → {threat.target}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Badge className="bg-blue-500/20 text-blue-400">
                          {threat.method}
                        </Badge>
                        <Clock className="w-4 h-4 text-gray-400" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Ransomware Family Detection */}
            <Card className="bg-surface/80 backdrop-blur-md border border-orange-500/30 cyber-glow">
              <CardHeader>
                <CardTitle className="text-2xl text-white flex items-center">
                  <Brain className="w-6 h-6 mr-3 text-orange-400" />
                  Ransomware Family Detection Rates
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {ransomwareFamilies.map((family, index) => (
                    <div key={index} className="p-4 bg-background/30 rounded-lg text-center">
                      <h4 className="text-white font-semibold mb-2">{family.name}</h4>
                      <div className="text-3xl font-bold text-orange-400 mb-2">{family.detectionRate}%</div>
                      <div className="text-gray-400 text-sm mb-3">{family.samples} samples analyzed</div>
                      <Progress value={family.detectionRate} />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Industry Impact Statistics */}
            <Card className="bg-surface/80 backdrop-blur-md border border-yellow-500/30 cyber-glow">
              <CardHeader>
                <CardTitle className="text-2xl text-white flex items-center">
                  <AlertTriangle className="w-6 h-6 mr-3 text-yellow-400" />
                  Industry Ransomware Impact & Protection
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                  {industryStats.map((stat, index) => (
                    <div key={index} className="p-4 bg-background/30 rounded-lg">
                      <h4 className="text-white font-semibold mb-3">{stat.sector}</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Attack Increase:</span>
                          <span className="text-red-400">{stat.attacks}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Recovery Time:</span>
                          <span className="text-yellow-400">{stat.recovery}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Our Protection:</span>
                          <span className="text-green-400">{stat.protection}</span>
                        </div>
                        <Progress value={parseFloat(stat.protection)} className="mt-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Protection Layers */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {protectionLayers.map((layer, index) => (
                <Card key={index} className="bg-surface/80 backdrop-blur-md border border-surface-light cyber-glow">
                  <CardHeader>
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg flex items-center justify-center">
                        {layer.icon}
                      </div>
                      <CardTitle className="text-xl text-white">{layer.title}</CardTitle>
                    </div>
                    <p className="text-gray-400">{layer.description}</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {layer.features.map((feature, idx) => (
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

            {/* Protection Benefits */}
            <Card className="bg-gradient-to-r from-red-900/50 to-orange-900/50 border border-red-500/30 cyber-glow">
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold text-white mb-8 text-center">Ransomware Protection Benefits</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-red-400 mb-2">99.8%</div>
                    <div className="text-white font-semibold mb-1">Detection Rate</div>
                    <div className="text-gray-400 text-sm">including zero-days</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-400 mb-2">&lt; 30s</div>
                    <div className="text-white font-semibold mb-1">Response Time</div>
                    <div className="text-gray-400 text-sm">automated containment</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-yellow-400 mb-2">87%</div>
                    <div className="text-white font-semibold mb-1">Cost Reduction</div>
                    <div className="text-gray-400 text-sm">vs manual recovery</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-400 mb-2">24/7</div>
                    <div className="text-white font-semibold mb-1">Monitoring</div>
                    <div className="text-gray-400 text-sm">continuous protection</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Call to Action */}
            <Card className="bg-gradient-to-r from-red-900/50 to-orange-900/50 border border-red-500/30 cyber-glow">
              <CardContent className="p-12 text-center">
                <h2 className="text-4xl font-bold text-white mb-6">Protect Against Ransomware Attacks</h2>
                <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                  Deploy comprehensive ransomware protection with AI-powered detection, automated response, and rapid recovery capabilities designed for educational institutions and government organizations.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/solutions">
                    <Button size="lg" className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 px-12 py-4 text-lg">
                      Explore All Solutions
                    </Button>
                  </Link>
                  <Link href="/security-scanner">
                    <Button size="lg" variant="outline" className="border-red-500 text-red-400 hover:bg-red-500/10 px-12 py-4 text-lg">
                      Free Security Assessment
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