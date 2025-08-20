import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Brain, 
  Eye, 
  Shield, 
  Activity, 
  AlertTriangle, 
  CheckCircle, 
  Target,
  TrendingUp,
  Database,
  Network,
  Cpu,
  Zap,
  Settings,
  BarChart3,
  Bot
} from "lucide-react";
import { MarketingLayout } from "@/components/MarketingLayout";
import { Link } from "wouter";

export default function ThreatDetection() {
  const detectionMethods = [
    {
      title: "Behavioral Analysis",
      description: "User and Entity Behavior Analytics (UEBA) to identify anomalous activities",
      accuracy: 94,
      icon: <Activity className="w-6 h-6" />,
      color: "text-purple-400"
    },
    {
      title: "Pattern Recognition",
      description: "Advanced algorithms analyzing network traffic patterns and attack signatures",
      accuracy: 96,
      icon: <Target className="w-6 h-6" />,
      color: "text-cyan-400"
    },
    {
      title: "Machine Learning",
      description: "Neural networks trained on threat intelligence from global security datasets",
      accuracy: 98,
      icon: <Brain className="w-6 h-6" />,
      color: "text-green-400"
    },
    {
      title: "Real-time Monitoring",
      description: "Continuous analysis of system logs, network traffic, and endpoint activities",
      accuracy: 92,
      icon: <Eye className="w-6 h-6" />,
      color: "text-orange-400"
    }
  ];

  const threatCategories = [
    { name: "Ransomware", detected: 1247, blocked: 1243, rate: 99.7 },
    { name: "Phishing", detected: 892, blocked: 889, rate: 99.6 },
    { name: "Malware", detected: 2156, blocked: 2148, rate: 99.6 },
    { name: "Zero-Day", detected: 34, blocked: 33, rate: 97.1 },
    { name: "Insider Threats", detected: 67, blocked: 65, rate: 97.0 },
    { name: "DDoS", detected: 156, blocked: 154, rate: 98.7 }
  ];

  const aiModels = [
    {
      name: "Deep Neural Network",
      purpose: "Multi-layered threat classification",
      accuracy: "98.2%",
      speed: "< 100ms",
      specialty: "Complex attack pattern recognition"
    },
    {
      name: "Random Forest",
      purpose: "Behavioral anomaly detection", 
      accuracy: "94.7%",
      speed: "< 50ms",
      specialty: "User behavior analysis"
    },
    {
      name: "Gradient Boosting",
      purpose: "Predictive threat modeling",
      accuracy: "96.1%", 
      speed: "< 75ms",
      specialty: "Zero-day threat prediction"
    }
  ];

  const integrationPoints = [
    "SIEM Platforms (Splunk, QRadar, ArcSight)",
    "Endpoint Detection & Response (CrowdStrike, SentinelOne)",
    "Network Security (Palo Alto, Fortinet, Cisco)",
    "Cloud Security (AWS GuardDuty, Azure Sentinel)",
    "Email Security (Proofpoint, Mimecast)",
    "Identity Management (Active Directory, Okta)"
  ];

  return (
    <MarketingLayout>
      <div className="ai-dashboard-bg min-h-screen">
        {/* Hero Section */}
        <header className="bg-surface/90 backdrop-blur-md border-b border-surface-light p-8 cyber-glow">
          <div className="container mx-auto max-w-6xl">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-purple-600 rounded-lg flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <h1 className="text-4xl font-bold text-white">AI Threat Detection System</h1>
                  <Badge className="bg-gradient-to-r from-purple-500 to-purple-700 text-white">98% Accuracy</Badge>
                </div>
                <p className="text-gray-300 text-lg">
                  Advanced AI analysis for identifying and classifying security threats in real-time
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="bg-surface/50 rounded-lg p-4 border border-surface-light">
                <div className="text-2xl font-bold text-white mb-1">98%</div>
                <div className="text-sm text-gray-400 mb-1">Detection Accuracy</div>
                <div className="text-xs text-green-400">Industry leading</div>
              </div>
              <div className="bg-surface/50 rounded-lg p-4 border border-surface-light">
                <div className="text-2xl font-bold text-white mb-1">&lt; 1s</div>
                <div className="text-sm text-gray-400 mb-1">Detection Time</div>
                <div className="text-xs text-cyan-400">Real-time analysis</div>
              </div>
              <div className="bg-surface/50 rounded-lg p-4 border border-surface-light">
                <div className="text-2xl font-bold text-white mb-1">&lt; 2%</div>
                <div className="text-sm text-gray-400 mb-1">False Positives</div>
                <div className="text-xs text-purple-400">Minimal disruption</div>
              </div>
              <div className="bg-surface/50 rounded-lg p-4 border border-surface-light">
                <div className="text-2xl font-bold text-white mb-1">24/7</div>
                <div className="text-sm text-gray-400 mb-1">Monitoring</div>
                <div className="text-xs text-orange-400">Continuous protection</div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="text-purple-400 border-purple-400/50">
                $12,000 - $20,000 annually
              </Badge>
              <Badge variant="outline" className="text-green-400 border-green-400/50">
                AI-powered detection
              </Badge>
              <Badge variant="outline" className="text-cyan-400 border-cyan-400/50">
                Real-time classification
              </Badge>
            </div>
          </div>
        </header>

        <main className="container mx-auto max-w-6xl p-8 space-y-12">
          {/* Detection Methods */}
          <section>
            <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
              <Settings className="w-8 h-8 mr-3 text-purple-400" />
              AI Detection Methods
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {detectionMethods.map((method, index) => (
                <Card key={index} className="bg-surface/50 border-surface-light">
                  <CardHeader>
                    <div className="flex items-center space-x-3 mb-4">
                      <div className={`${method.color}`}>{method.icon}</div>
                      <CardTitle className="text-white text-xl">{method.title}</CardTitle>
                    </div>
                    <p className="text-gray-400">{method.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-400">Accuracy Rate</span>
                      <span className="text-sm font-semibold text-white">{method.accuracy}%</span>
                    </div>
                    <Progress value={method.accuracy} className="h-2" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Threat Detection Statistics */}
          <section>
            <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
              <BarChart3 className="w-8 h-8 mr-3 text-purple-400" />
              Real-time Threat Statistics
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {threatCategories.map((threat, index) => (
                <Card key={index} className="bg-surface/50 border-surface-light">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-white text-lg">{threat.name}</CardTitle>
                      <Badge variant="outline" className={`${threat.rate > 98 ? 'text-green-400 border-green-400/50' : threat.rate > 95 ? 'text-yellow-400 border-yellow-400/50' : 'text-orange-400 border-orange-400/50'}`}>
                        {threat.rate}%
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Detected:</span>
                        <span className="text-white">{threat.detected.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Blocked:</span>
                        <span className="text-green-400">{threat.blocked.toLocaleString()}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Live Threat Detection Visualization */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">
              AI Threat Detection in Real-Time
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Neural Network Visualization */}
              <div className="relative rounded-xl overflow-hidden border border-purple-500/30">
                <div className="bg-gradient-to-br from-purple-900/20 to-violet-900/40 p-6 h-64 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-r from-purple-400 to-violet-500 rounded-full flex items-center justify-center">
                      <Brain className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">Neural Network</h3>
                    <p className="text-purple-400 text-xs">Deep learning threat classification</p>
                    <div className="mt-3">
                      <Badge className="bg-purple-500 text-white text-xs">98.2% Accuracy</Badge>
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-purple-500/10 to-transparent pointer-events-none"></div>
              </div>

              {/* Behavioral Analysis */}
              <div className="relative rounded-xl overflow-hidden border border-cyan-500/30">
                <div className="bg-gradient-to-br from-cyan-900/20 to-blue-900/40 p-6 h-64 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center">
                      <Activity className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">Behavioral AI</h3>
                    <p className="text-cyan-400 text-xs">User behavior anomaly detection</p>
                    <div className="mt-3">
                      <Badge className="bg-cyan-500 text-white text-xs">94.7% Accuracy</Badge>
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/10 to-transparent pointer-events-none"></div>
              </div>

              {/* Pattern Recognition */}
              <div className="relative rounded-xl overflow-hidden border border-green-500/30">
                <div className="bg-gradient-to-br from-green-900/20 to-emerald-900/40 p-6 h-64 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                      <Target className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">Pattern Engine</h3>
                    <p className="text-green-400 text-xs">Attack signature recognition</p>
                    <div className="mt-3">
                      <Badge className="bg-green-500 text-white text-xs">96.1% Accuracy</Badge>
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-green-500/10 to-transparent pointer-events-none"></div>
              </div>
            </div>
          </section>

          {/* Live Dashboard Demo */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">
              Real-Time Threat Detection Dashboard
            </h2>
            <div className="relative rounded-xl overflow-hidden border border-purple-500/30">
              <img 
                src="/attached_assets/Threat Monitoring Dashboard_1755656113116.png" 
                alt="CyberSecure AI Live Threat Detection Dashboard" 
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/60 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-surface/90 backdrop-blur-md rounded-lg p-6 border border-surface-light">
                  <h3 className="text-xl font-bold text-white mb-3">Live Global Threat Intelligence</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <div className="text-red-400 font-semibold">Critical Threats</div>
                      <div className="text-white">4 Active</div>
                    </div>
                    <div>
                      <div className="text-orange-400 font-semibold">High Priority</div>
                      <div className="text-white">12 Incidents</div>
                    </div>
                    <div>
                      <div className="text-cyan-400 font-semibold">Response Time</div>
                      <div className="text-white">4.2 min avg</div>
                    </div>
                    <div>
                      <div className="text-green-400 font-semibold">Threat Sources</div>
                      <div className="text-white">7 Countries</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute top-4 right-4">
                <Badge className="bg-red-500/80 text-white border border-red-500/50">Live Monitoring</Badge>
              </div>
            </div>
          </section>

          {/* AI Models Architecture */}
          <section className="bg-gradient-to-r from-surface/30 to-surface/50 rounded-xl p-8 border border-surface-light">
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
              <Cpu className="w-8 h-8 mr-3 text-purple-400" />
              AI Models Architecture
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {aiModels.map((model, index) => (
                <Card key={index} className="bg-surface/50 border-surface-light">
                  <CardHeader>
                    <CardTitle className="text-white text-lg">{model.name}</CardTitle>
                    <p className="text-gray-400">{model.purpose}</p>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Accuracy:</span>
                      <span className="text-green-400 font-semibold">{model.accuracy}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Speed:</span>
                      <span className="text-cyan-400 font-semibold">{model.speed}</span>
                    </div>
                    <div className="pt-2 border-t border-surface-light">
                      <span className="text-xs text-purple-400">{model.specialty}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-8 p-6 bg-surface/30 rounded-lg border border-purple-500/20">
              <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
                <Database className="w-5 h-5 mr-2 text-purple-400" />
                Training Dataset
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                <div>
                  <p className="text-gray-300 mb-2">
                    <span className="font-semibold text-purple-400">Global Threat Intelligence:</span> Over 100 billion security events analyzed from worldwide sources
                  </p>
                </div>
                <div>
                  <p className="text-gray-300 mb-2">
                    <span className="font-semibold text-purple-400">Behavioral Patterns:</span> 50+ million user behavior profiles across education and government sectors
                  </p>
                </div>
                <div>
                  <p className="text-gray-300">
                    <span className="font-semibold text-purple-400">Attack Signatures:</span> Continuously updated with 10,000+ new threat signatures daily
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Integration Capabilities */}
          <section>
            <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
              <Network className="w-8 h-8 mr-3 text-purple-400" />
              Platform Integrations
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {integrationPoints.map((integration, index) => (
                <Card key={index} className="bg-surface/50 border-surface-light hover:border-purple-500/50 transition-colors">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                      <span className="text-gray-300">{integration}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Sector Benefits */}
          <section>
            <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
              <TrendingUp className="w-8 h-8 mr-3 text-purple-400" />
              Sector-Specific Benefits
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="bg-gradient-to-br from-blue-900/20 to-blue-700/20 border-blue-500/30">
                <CardHeader>
                  <CardTitle className="text-white text-xl flex items-center">
                    <Badge className="bg-blue-500 text-white mr-3">Education</Badge>
                    Educational Institutions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">Protection against education-targeting ransomware campaigns</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">Student credential theft and identity protection</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">Learning management system security monitoring</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">BYOD and 1:1 device threat detection</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-900/20 to-green-700/20 border-green-500/30">
                <CardHeader>
                  <CardTitle className="text-white text-xl flex items-center">
                    <Badge className="bg-green-500 text-white mr-3">Government</Badge>
                    Government Agencies
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">Nation-state actor detection and attribution</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">Critical infrastructure protection monitoring</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">Sensitive data exfiltration prevention</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">Advanced persistent threat (APT) identification</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Call to Action */}
          <section className="text-center">
            <div className="bg-gradient-to-r from-purple-900/20 to-purple-700/20 rounded-xl p-8 border border-purple-500/20">
              <h2 className="text-3xl font-bold text-white mb-4">
                Deploy Advanced AI Threat Detection
              </h2>
              <p className="text-gray-300 text-lg mb-6 max-w-2xl mx-auto">
                Protect your organization with industry-leading 98% threat detection accuracy and real-time AI analysis.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button size="lg" className="bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800" data-testid="button-request-demo">
                    Request Demo
                  </Button>
                </Link>
                <Link href="/pricing">
                  <Button variant="outline" size="lg" className="border-purple-500/50 text-purple-400 hover:bg-purple-500/10" data-testid="button-view-pricing">
                    View Pricing
                  </Button>
                </Link>
              </div>
            </div>
          </section>
        </main>
      </div>
    </MarketingLayout>
  );
}