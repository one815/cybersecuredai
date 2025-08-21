import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Brain,
  Eye,
  Zap,
  Target,
  Activity,
  CheckCircle,
  ArrowRight,
  Settings,
  Network,
  Database,
  Shield,
  Clock,
  TrendingUp,
  AlertTriangle
} from "lucide-react";
import { MarketingLayout } from "@/components/MarketingLayout";
import { Link } from "wouter";
import { useState, useEffect } from "react";

export default function AIThreatDetection() {
  const [threatsDetected, setThreatsDetected] = useState(3847);
  const [accuracy, setAccuracy] = useState(98.7);
  const [modelsActive, setModelsActive] = useState(15);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [liveDetections, setLiveDetections] = useState([
    { type: "Advanced Persistent Threat", confidence: 94, source: "Network Traffic", action: "BLOCKED", severity: "Critical" },
    { type: "Zero-Day Exploit", confidence: 87, source: "Email Attachment", action: "QUARANTINED", severity: "High" },
    { type: "Polymorphic Malware", confidence: 91, source: "Web Download", action: "ISOLATED", severity: "High" },
    { type: "AI-Generated Phishing", confidence: 96, source: "Email Content", action: "BLOCKED", severity: "Medium" }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
      if (Math.random() > 0.6) {
        setThreatsDetected(prev => prev + Math.floor(Math.random() * 12));
        setAccuracy(parseFloat((Math.random() * 2 + 97.5).toFixed(1)));
        setModelsActive(Math.floor(Math.random() * 3) + 14);
        
        // Update live detections
        const types = ["Advanced Persistent Threat", "Zero-Day Exploit", "Fileless Malware", "AI-Generated Phishing", "Living-off-the-Land Attack"];
        const sources = ["Network Traffic", "Email Content", "System Behavior", "API Calls", "File Analysis"];
        const actions = ["BLOCKED", "QUARANTINED", "ISOLATED", "MONITORED", "ANALYZED"];
        const severities = ["Low", "Medium", "High", "Critical"];
        
        const newDetection = {
          type: types[Math.floor(Math.random() * types.length)],
          confidence: Math.floor(Math.random() * 20) + 80,
          source: sources[Math.floor(Math.random() * sources.length)],
          action: actions[Math.floor(Math.random() * actions.length)],
          severity: severities[Math.floor(Math.random() * severities.length)]
        };
        
        setLiveDetections(prev => [newDetection, ...prev.slice(0, 5)]);
      }
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  const aiModels = [
    {
      name: "Deep Learning Neural Network",
      description: "Multi-layered neural networks for complex pattern recognition and threat classification",
      icon: <Brain className="w-8 h-8" />,
      capabilities: ["Behavioral analysis", "Pattern recognition", "Anomaly detection", "Threat classification"],
      performance: { accuracy: 98.7, speed: "< 100ms", coverage: "Network + Endpoint" }
    },
    {
      name: "Natural Language Processing",
      description: "Advanced NLP for analyzing communications, documents, and social engineering attacks",
      icon: <Eye className="w-8 h-8" />,
      capabilities: ["Content analysis", "Phishing detection", "Social engineering", "Communication monitoring"],
      performance: { accuracy: 96.4, speed: "< 50ms", coverage: "Email + Chat" }
    },
    {
      name: "Computer Vision Analysis",
      description: "AI-powered visual analysis for detecting malicious images, documents, and media",
      icon: <Target className="w-8 h-8" />,
      capabilities: ["Image analysis", "Document scanning", "Visual steganography", "Media forensics"],
      performance: { accuracy: 94.8, speed: "< 200ms", coverage: "Files + Media" }
    },
    {
      name: "Reinforcement Learning",
      description: "Adaptive AI that learns from security incidents and improves detection over time",
      icon: <TrendingUp className="w-8 h-8" />,
      capabilities: ["Adaptive learning", "Strategy optimization", "Response improvement", "Predictive modeling"],
      performance: { accuracy: 97.3, speed: "Real-time", coverage: "Full Stack" }
    }
  ];

  const threatCategories = [
    { category: "Advanced Persistent Threats", detected: 156, accuracy: 94.2, prevented: 98.7 },
    { category: "Zero-Day Exploits", detected: 43, accuracy: 87.6, prevented: 92.3 },
    { category: "AI-Generated Attacks", detected: 89, accuracy: 96.8, prevented: 99.1 },
    { category: "Insider Threats", detected: 27, accuracy: 91.4, prevented: 85.2 }
  ];

  const industryApplications = [
    { sector: "Education", use_case: "Student data protection", accuracy: 97.2, deployment: "Cloud + On-Premise" },
    { sector: "Government", use_case: "Citizen data security", accuracy: 98.1, deployment: "Air-Gapped + Hybrid" },
    { sector: "Healthcare", use_case: "Patient record protection", accuracy: 96.7, deployment: "HIPAA Compliant" },
    { sector: "Finance", use_case: "Transaction monitoring", accuracy: 99.3, deployment: "Real-time Processing" }
  ];

  const getActionColor = (action: string) => {
    switch (action) {
      case 'BLOCKED': return 'text-red-400 bg-red-500/20';
      case 'QUARANTINED': return 'text-orange-400 bg-orange-500/20';
      case 'ISOLATED': return 'text-yellow-400 bg-yellow-500/20';
      case 'MONITORED': return 'text-blue-400 bg-blue-500/20';
      case 'ANALYZED': return 'text-purple-400 bg-purple-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Critical': return 'text-red-400';
      case 'High': return 'text-orange-400';
      case 'Medium': return 'text-yellow-400';
      case 'Low': return 'text-green-400';
      default: return 'text-gray-400';
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
                <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl flex items-center justify-center cyber-glow">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-white geometric-text">AI-Powered Threat Detection</h1>
                  <p className="text-xl text-gray-400">Advanced machine learning and AI for next-generation cybersecurity</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-400">AI Processing</div>
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
            {/* Live AI Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="bg-surface/80 backdrop-blur-md border border-cyan-500/30 cyber-glow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-white flex items-center">
                    <Target className="w-5 h-5 mr-2 text-cyan-400" />
                    Threats Detected
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-cyan-400">{threatsDetected.toLocaleString()}</div>
                  <p className="text-gray-400 text-sm">This month</p>
                </CardContent>
              </Card>

              <Card className="bg-surface/80 backdrop-blur-md border border-purple-500/30 cyber-glow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-white flex items-center">
                    <Brain className="w-5 h-5 mr-2 text-purple-400" />
                    AI Accuracy
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-purple-400">{accuracy}%</div>
                  <Progress value={accuracy} className="mt-2" />
                </CardContent>
              </Card>

              <Card className="bg-surface/80 backdrop-blur-md border border-green-500/30 cyber-glow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-white flex items-center">
                    <Zap className="w-5 h-5 mr-2 text-green-400" />
                    Active Models
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-400">{modelsActive}</div>
                  <p className="text-gray-400 text-sm">Running</p>
                </CardContent>
              </Card>

              <Card className="bg-surface/80 backdrop-blur-md border border-orange-500/30 cyber-glow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-white flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-orange-400" />
                    Response Time
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-orange-400">&lt; 100ms</div>
                  <p className="text-gray-400 text-sm">Average</p>
                </CardContent>
              </Card>
            </div>

            {/* Live AI Detection Feed */}
            <Card className="bg-surface/80 backdrop-blur-md border border-cyan-500/30 cyber-glow">
              <CardHeader>
                <CardTitle className="text-2xl text-white flex items-center">
                  <Brain className="w-6 h-6 mr-3 text-cyan-400" />
                  Real-Time AI Threat Detection
                  <Badge className="ml-3 bg-cyan-500/20 text-cyan-400">LIVE AI</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {liveDetections.map((detection, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-background/30 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <Badge className={getActionColor(detection.action)}>
                          {detection.action}
                        </Badge>
                        <div>
                          <div className="text-white font-semibold">{detection.type}</div>
                          <div className="text-gray-400 text-sm">Source: {detection.source}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <div className="text-cyan-400 font-bold">{detection.confidence}%</div>
                          <div className="text-gray-400 text-sm">Confidence</div>
                        </div>
                        <div className={`font-semibold ${getSeverityColor(detection.severity)}`}>
                          {detection.severity}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Threat Category Analysis */}
            <Card className="bg-surface/80 backdrop-blur-md border border-purple-500/30 cyber-glow">
              <CardHeader>
                <CardTitle className="text-2xl text-white flex items-center">
                  <AlertTriangle className="w-6 h-6 mr-3 text-purple-400" />
                  AI Threat Category Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {threatCategories.map((category, index) => (
                    <div key={index} className="p-4 bg-background/30 rounded-lg">
                      <h4 className="text-white font-semibold mb-3">{category.category}</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Detected:</span>
                          <span className="text-white">{category.detected}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Accuracy:</span>
                          <span className="text-purple-400">{category.accuracy}%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Prevention:</span>
                          <span className="text-green-400">{category.prevented}%</span>
                        </div>
                        <Progress value={category.accuracy} className="mt-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* AI Models */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {aiModels.map((model, index) => (
                <Card key={index} className="bg-surface/80 backdrop-blur-md border border-surface-light cyber-glow">
                  <CardHeader>
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg flex items-center justify-center">
                        {model.icon}
                      </div>
                      <CardTitle className="text-xl text-white">{model.name}</CardTitle>
                    </div>
                    <p className="text-gray-400 mb-4">{model.description}</p>
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      {Object.entries(model.performance).map(([key, value]) => (
                        <div key={key} className="text-center p-2 bg-background/30 rounded">
                          <div className="text-sm font-bold text-cyan-400">{value}</div>
                          <div className="text-xs text-gray-400 capitalize">{key}</div>
                        </div>
                      ))}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {model.capabilities.map((capability, idx) => (
                        <li key={idx} className="flex items-center text-gray-300">
                          <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                          {capability}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Industry Applications */}
            <Card className="bg-surface/80 backdrop-blur-md border border-green-500/30 cyber-glow">
              <CardHeader>
                <CardTitle className="text-2xl text-white flex items-center">
                  <Network className="w-6 h-6 mr-3 text-green-400" />
                  AI Applications by Industry
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                  {industryApplications.map((app, index) => (
                    <div key={index} className="p-4 bg-background/30 rounded-lg">
                      <h4 className="text-white font-semibold mb-3">{app.sector}</h4>
                      <div className="space-y-2">
                        <div className="text-sm text-gray-400 mb-2">{app.use_case}</div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">AI Accuracy:</span>
                          <span className="text-green-400">{app.accuracy}%</span>
                        </div>
                        <div className="text-sm">
                          <span className="text-gray-400">Deployment:</span>
                          <div className="text-blue-400 mt-1">{app.deployment}</div>
                        </div>
                        <Progress value={app.accuracy} className="mt-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* AI Benefits */}
            <Card className="bg-gradient-to-r from-cyan-900/50 to-purple-900/50 border border-cyan-500/30 cyber-glow">
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold text-white mb-8 text-center">AI-Powered Detection Benefits</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-cyan-400 mb-2">98.7%</div>
                    <div className="text-white font-semibold mb-1">Detection Accuracy</div>
                    <div className="text-gray-400 text-sm">including zero-days</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-400 mb-2">89%</div>
                    <div className="text-white font-semibold mb-1">False Positive Reduction</div>
                    <div className="text-gray-400 text-sm">vs traditional methods</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-400 mb-2">24/7</div>
                    <div className="text-white font-semibold mb-1">Continuous Learning</div>
                    <div className="text-gray-400 text-sm">adaptive improvement</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-400 mb-2">&lt; 100ms</div>
                    <div className="text-white font-semibold mb-1">Response Time</div>
                    <div className="text-gray-400 text-sm">real-time detection</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Call to Action */}
            <Card className="bg-gradient-to-r from-cyan-900/50 to-purple-900/50 border border-cyan-500/30 cyber-glow">
              <CardContent className="p-12 text-center">
                <h2 className="text-4xl font-bold text-white mb-6">Deploy Next-Generation AI Security</h2>
                <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                  Harness the power of advanced artificial intelligence and machine learning for unprecedented threat detection and response capabilities tailored for educational institutions and government organizations.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/solutions">
                    <Button size="lg" className="bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700 px-12 py-4 text-lg">
                      Explore All Solutions
                    </Button>
                  </Link>
                  <Link href="/security-scanner">
                    <Button size="lg" variant="outline" className="border-cyan-500 text-cyan-400 hover:bg-cyan-500/10 px-12 py-4 text-lg">
                      AI Capability Assessment
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