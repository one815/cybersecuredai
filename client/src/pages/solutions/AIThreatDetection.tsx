import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Brain,
  Eye,
  Zap,
  Target,
  CheckCircle,
  ArrowRight,
  Network,
  Database,
  Shield,
  TrendingUp,
  AlertTriangle,
  Settings
} from "lucide-react";
import { MarketingLayout } from "@/components/MarketingLayout";
import { Link } from "wouter";

export default function AIThreatDetection() {
  const aiModels = [
    {
      name: "Deep Learning Neural Network",
      description: "Multi-layered neural networks for complex pattern recognition and threat classification",
      icon: <Brain className="w-8 h-8" />,
      capabilities: ["Behavioral analysis", "Pattern recognition", "Anomaly detection", "Threat classification"],
      performance: { accuracy: "98.7%", speed: "< 100ms", coverage: "Network + Endpoint" }
    },
    {
      name: "Natural Language Processing",
      description: "Advanced NLP for analyzing communications, documents, and social engineering attacks",
      icon: <Eye className="w-8 h-8" />,
      capabilities: ["Content analysis", "Phishing detection", "Social engineering", "Communication monitoring"],
      performance: { accuracy: "96.4%", speed: "< 50ms", coverage: "Email + Chat" }
    },
    {
      name: "Computer Vision Analysis",
      description: "AI-powered visual analysis for detecting malicious images, documents, and media",
      icon: <Target className="w-8 h-8" />,
      capabilities: ["Image analysis", "Document scanning", "Visual steganography", "Media forensics"],
      performance: { accuracy: "94.8%", speed: "< 200ms", coverage: "Files + Media" }
    },
    {
      name: "Reinforcement Learning",
      description: "Adaptive AI that learns from security incidents and improves detection over time",
      icon: <TrendingUp className="w-8 h-8" />,
      capabilities: ["Adaptive learning", "Strategy optimization", "Response improvement", "Predictive modeling"],
      performance: { accuracy: "97.3%", speed: "Real-time", coverage: "Full Stack" }
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

  return (
    <MarketingLayout>
      <div className="solutions-light-bg min-h-screen">
        {/* Hero Section */}
        <section className="py-20 px-6 solutions-light-hero">
          <div className="container mx-auto max-w-6xl text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-2xl flex items-center justify-center">
                <Brain className="w-10 h-10 text-white" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold solutions-light-text mb-6 geometric-text">
              AI-Powered Threat Detection
            </h1>
            <p className="text-xl solutions-light-muted mb-8 max-w-4xl mx-auto">
              Advanced machine learning and artificial intelligence for next-generation cybersecurity with unprecedented threat detection and response capabilities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/security-scanner">
                <Button size="lg" className="bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700 px-12 py-4 text-lg text-white">
                  AI Capability Assessment
                </Button>
              </Link>
              <Link href="/solutions">
                <Button size="lg" variant="outline" className="border-cyan-500 text-cyan-600 hover:bg-cyan-50 px-12 py-4 text-lg">
                  View All Solutions
                  <ArrowRight className="ml-2 w-6 h-6" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* AI Detection Benefits */}
        <section className="py-16 px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <Card className="solutions-light-card">
                <CardContent className="p-6 text-center">
                  <Target className="w-8 h-8 text-cyan-500 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-cyan-500 mb-2">98.7%</div>
                  <div className="solutions-light-text font-semibold mb-1">Detection Accuracy</div>
                  <div className="solutions-light-muted text-sm">Including zero-days</div>
                </CardContent>
              </Card>
              
              <Card className="solutions-light-card">
                <CardContent className="p-6 text-center">
                  <Zap className="w-8 h-8 text-purple-500 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-purple-500 mb-2">89%</div>
                  <div className="solutions-light-text font-semibold mb-1">False Positive Reduction</div>
                  <div className="solutions-light-muted text-sm">Vs traditional methods</div>
                </CardContent>
              </Card>

              <Card className="solutions-light-card">
                <CardContent className="p-6 text-center">
                  <Settings className="w-8 h-8 text-green-500 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-green-500 mb-2">24/7</div>
                  <div className="solutions-light-text font-semibold mb-1">Continuous Learning</div>
                  <div className="solutions-light-muted text-sm">Adaptive improvement</div>
                </CardContent>
              </Card>

              <Card className="solutions-light-card">
                <CardContent className="p-6 text-center">
                  <Brain className="w-8 h-8 text-orange-500 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-orange-500 mb-2">&lt; 100ms</div>
                  <div className="solutions-light-text font-semibold mb-1">Response Time</div>
                  <div className="solutions-light-muted text-sm">Real-time detection</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Threat Category Performance */}
        <section className="py-16 px-6 solutions-light-section">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-4xl font-bold solutions-light-text text-center mb-12">AI Threat Category Performance</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {threatCategories.map((category, index) => (
                <Card key={index} className="solutions-light-card">
                  <CardHeader>
                    <CardTitle className="solutions-light-text text-lg">{category.category}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="solutions-light-muted">Detected:</span>
                        <span className="solutions-light-text font-semibold">{category.detected}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="solutions-light-muted">AI Accuracy:</span>
                        <span className="text-purple-500 font-semibold">{category.accuracy}%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="solutions-light-muted">Prevention Rate:</span>
                        <span className="text-green-500 font-semibold">{category.prevented}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                        <div 
                          className="bg-gradient-to-r from-cyan-500 to-purple-500 h-2 rounded-full transition-all"
                          style={{ width: `${category.accuracy}%` }}
                        ></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* AI Models */}
        <section className="py-16 px-6">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-4xl font-bold solutions-light-text text-center mb-12">Advanced AI Security Models</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {aiModels.map((model, index) => (
                <Card key={index} className="solutions-light-card">
                  <CardHeader>
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl flex items-center justify-center text-white">
                        {model.icon}
                      </div>
                      <CardTitle className="text-2xl solutions-light-text">{model.name}</CardTitle>
                    </div>
                    <p className="solutions-light-muted text-lg mb-4">{model.description}</p>
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      {Object.entries(model.performance).map(([key, value]) => (
                        <div key={key} className="text-center p-2 bg-gray-50 rounded">
                          <div className="text-sm font-bold text-cyan-500">{value}</div>
                          <div className="text-xs solutions-light-muted capitalize">{key}</div>
                        </div>
                      ))}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {model.capabilities.map((capability, idx) => (
                        <li key={idx} className="flex items-center solutions-light-text">
                          <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                          <span className="text-lg">{capability}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Industry Applications */}
        <section className="py-16 px-6 solutions-light-section">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-4xl font-bold solutions-light-text text-center mb-12">AI Applications by Industry</h2>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {industryApplications.map((app, index) => (
                <Card key={index} className="solutions-light-card">
                  <CardHeader>
                    <CardTitle className="solutions-light-text text-lg">{app.sector}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="text-sm solutions-light-muted mb-3">{app.use_case}</div>
                      <div className="flex justify-between text-sm">
                        <span className="solutions-light-muted">AI Accuracy:</span>
                        <span className="text-green-500 font-semibold">{app.accuracy}%</span>
                      </div>
                      <div className="text-sm">
                        <span className="solutions-light-muted">Deployment:</span>
                        <div className="text-blue-500 font-semibold mt-1">{app.deployment}</div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                        <div 
                          className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all"
                          style={{ width: `${app.accuracy}%` }}
                        ></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 px-6 bg-gradient-to-r from-cyan-50 to-purple-50">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-5xl font-bold solutions-light-text mb-8">Deploy Next-Generation AI Security</h2>
            <p className="text-xl solutions-light-muted mb-10 max-w-3xl mx-auto">
              Harness the power of advanced artificial intelligence and machine learning for unprecedented threat detection and response capabilities tailored for educational institutions and government organizations.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/solutions">
                <Button size="lg" className="bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700 px-12 py-4 text-lg text-white">
                  Explore All Solutions
                </Button>
              </Link>
              <Link href="/security-scanner">
                <Button size="lg" variant="outline" className="border-cyan-500 text-cyan-600 hover:bg-cyan-50 px-12 py-4 text-lg">
                  AI Capability Assessment
                  <ArrowRight className="ml-2 w-6 h-6" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </MarketingLayout>
  );
}