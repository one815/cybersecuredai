import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Bot, 
  Zap, 
  Shield, 
  Clock, 
  Activity, 
  AlertTriangle, 
  CheckCircle, 
  ArrowRight,
  Brain,
  Database,
  Network,
  Eye,
  Settings,
  TrendingUp,
  BarChart3
} from "lucide-react";
import { MarketingLayout } from "@/components/MarketingLayout";
import { Link } from "wouter";

export default function AutomatedIncidentResponse() {
  const responseSteps = [
    {
      step: "Detection",
      description: "AI algorithms continuously monitor network traffic, user behavior, and system logs",
      time: "< 1 second",
      icon: <Eye className="w-5 h-5" />,
      color: "text-cyan-400"
    },
    {
      step: "Analysis", 
      description: "Machine learning models classify threats and assess severity levels automatically",
      time: "< 5 seconds",
      icon: <Brain className="w-5 h-5" />,
      color: "text-purple-400"
    },
    {
      step: "Containment",
      description: "Automated network isolation and system quarantine to prevent lateral movement",
      time: "< 10 seconds", 
      icon: <Shield className="w-5 h-5" />,
      color: "text-green-400"
    },
    {
      step: "Response",
      description: "Orchestrated remediation actions and stakeholder notifications",
      time: "< 30 seconds",
      icon: <Zap className="w-5 h-5" />,
      color: "text-orange-400"
    }
  ];

  const capabilities = [
    {
      title: "Real-time Threat Containment",
      description: "Automatic network isolation and system quarantine to prevent attack propagation",
      features: ["Network segmentation", "Endpoint isolation", "Traffic blocking", "Access revocation"]
    },
    {
      title: "Automated Remediation",
      description: "AI-driven systems automatically remediate detected threats without human intervention", 
      features: ["Malware removal", "System restoration", "Patch deployment", "Configuration reset"]
    },
    {
      title: "Escalation Management",
      description: "Intelligent escalation workflows ensure critical incidents receive appropriate attention",
      features: ["Priority scoring", "Stakeholder notification", "Case assignment", "SLA tracking"]
    },
    {
      title: "Forensic Analysis",
      description: "Automated evidence collection and analysis for post-incident investigation",
      features: ["Log aggregation", "Timeline reconstruction", "Impact assessment", "Attribution analysis"]
    }
  ];

  const metrics = [
    { label: "Average Detection Time", value: "< 1 sec", trend: "+94% faster" },
    { label: "Response Time Reduction", value: "70%", trend: "vs manual processes" },
    { label: "False Positive Rate", value: "< 2%", trend: "industry leading" },
    { label: "Containment Success", value: "98.7%", trend: "threat isolation" }
  ];

  const integrations = [
    "SIEM Platforms", "Endpoint Detection & Response", "Network Security Tools", 
    "Identity Management", "Email Security", "Cloud Security Platforms"
  ];

  return (
    <MarketingLayout>
      <div className="ai-dashboard-bg min-h-screen">
        {/* Hero Section */}
        <header className="bg-surface/90 backdrop-blur-md border-b border-surface-light p-8 cyber-glow">
          <div className="container mx-auto max-w-6xl">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <h1 className="text-4xl font-bold text-white">Automated Incident Response</h1>
                  <Badge className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white">AI-Powered</Badge>
                </div>
                <p className="text-gray-300 text-lg">
                  Real-time threat detection, analysis, and response using advanced AI algorithms
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {metrics.map((metric, index) => (
                <div key={index} className="bg-surface/50 rounded-lg p-4 border border-surface-light">
                  <div className="text-2xl font-bold text-white mb-1">{metric.value}</div>
                  <div className="text-sm text-gray-400 mb-1">{metric.label}</div>
                  <div className="text-xs text-cyan-400">{metric.trend}</div>
                </div>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="text-cyan-400 border-cyan-400/50">
                Custom pricing available
              </Badge>
              <Badge variant="outline" className="text-green-400 border-green-400/50">
                Enterprise-grade security
              </Badge>
              <Badge variant="outline" className="text-purple-400 border-purple-400/50">
                24/7 automated protection
              </Badge>
            </div>
          </div>
        </header>

        <main className="container mx-auto max-w-6xl p-8 space-y-12">
          {/* Automated Response Timeline */}
          <section>
            <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
              <Clock className="w-8 h-8 mr-3 text-cyan-400" />
              Automated Response Timeline
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {responseSteps.map((step, index) => (
                <Card key={index} className="bg-surface/50 border-surface-light relative overflow-hidden">
                  <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-${step.color.split('-')[1]}-400 to-${step.color.split('-')[1]}-600`}></div>
                  <CardHeader className="pb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`${step.color}`}>{step.icon}</div>
                      <div>
                        <CardTitle className="text-white text-lg">{step.step}</CardTitle>
                        <Badge variant="outline" className={`${step.color} border-current/50 text-xs`}>
                          {step.time}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-400 text-sm">{step.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Core Capabilities */}
          <section>
            <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
              <Settings className="w-8 h-8 mr-3 text-cyan-400" />
              Core Capabilities
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {capabilities.map((capability, index) => (
                <Card key={index} className="bg-surface/50 border-surface-light">
                  <CardHeader>
                    <CardTitle className="text-white text-xl">{capability.title}</CardTitle>
                    <p className="text-gray-400">{capability.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {capability.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                          <span className="text-gray-300 text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Visual Demonstration */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">
              Automated Response in Action
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Holographic Threat Visualization */}
              <div className="relative rounded-xl overflow-hidden border border-cyan-500/30">
                <div className="bg-gradient-to-br from-cyan-900/20 to-blue-900/40 p-8 h-64 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center animate-pulse">
                      <AlertTriangle className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">Threat Detection Hologram</h3>
                    <p className="text-cyan-400 text-sm">3D visualization of incoming threats and attack vectors</p>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-red-500/10 to-transparent pointer-events-none"></div>
                <div className="absolute top-4 right-4">
                  <Badge className="bg-red-500/20 text-red-400 border border-red-500/50">Real-time</Badge>
                </div>
              </div>

              {/* Response Dashboard */}
              <div className="relative rounded-xl overflow-hidden border border-green-500/30">
                <div className="bg-gradient-to-br from-green-900/20 to-emerald-900/40 p-8 h-64 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                      <Zap className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">Automated Response Center</h3>
                    <p className="text-green-400 text-sm">Live incident response workflow and containment status</p>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-green-500/10 to-transparent pointer-events-none"></div>
                <div className="absolute top-4 right-4">
                  <Badge className="bg-green-500/20 text-green-400 border border-green-500/50">Automated</Badge>
                </div>
              </div>
            </div>
          </section>

          {/* Incident Response Command Center Dashboard */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">
              Incident Response Command Center
            </h2>
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl border border-cyan-500/30 overflow-hidden">
              {/* Dashboard Header */}
              <div className="bg-gray-800/90 border-b border-gray-700 p-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-white font-semibold">Automated Incident Response</h3>
                  <Badge className="bg-green-500/20 text-green-400 text-xs">&lt; 1sec Response</Badge>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                    <span className="text-red-400 text-sm">12 Active</span>
                  </div>
                  <Button size="sm" className="bg-cyan-500 hover:bg-cyan-600 text-white text-xs">Manual Override</Button>
                </div>
              </div>

              {/* Dashboard Content */}
              <div className="p-6 space-y-6">
                {/* Active Incidents */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-gray-800/30 rounded-lg p-4 border border-gray-700">
                    <h4 className="text-white font-medium mb-4 flex items-center">
                      <AlertTriangle className="w-4 h-4 text-red-400 mr-2" />
                      Active Incidents
                    </h4>
                    <div className="space-y-3">
                      <div className="bg-red-900/20 rounded-lg p-3 border-l-2 border-red-500">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-white text-sm font-medium">Data Exfiltration Attempt</span>
                          <Badge className="bg-red-500 text-white text-xs">Critical</Badge>
                        </div>
                        <div className="text-red-400 text-xs mb-2">Source: 192.168.1.45 → External</div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-400 text-xs">Auto-response: Active</span>
                          <div className="flex items-center space-x-1">
                            <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
                            <span className="text-green-400 text-xs">Containing...</span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-orange-900/20 rounded-lg p-3 border-l-2 border-orange-500">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-white text-sm font-medium">Ransomware Detection</span>
                          <Badge className="bg-orange-500 text-white text-xs">High</Badge>
                        </div>
                        <div className="text-orange-400 text-xs mb-2">Source: Email Attachment → WS-042</div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-400 text-xs">Auto-response: Isolated</span>
                          <div className="flex items-center space-x-1">
                            <CheckCircle className="w-3 h-3 text-green-400" />
                            <span className="text-green-400 text-xs">Contained</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-800/30 rounded-lg p-4 border border-gray-700">
                    <h4 className="text-white font-medium mb-4 flex items-center">
                      <Clock className="w-4 h-4 text-cyan-400 mr-2" />
                      Response Timeline
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                        <div>
                          <div className="text-white text-sm">Threat contained</div>
                          <div className="text-gray-400 text-xs">2 minutes ago</div>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                        <div>
                          <div className="text-white text-sm">Isolation protocol activated</div>
                          <div className="text-gray-400 text-xs">3 minutes ago</div>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
                        <div>
                          <div className="text-white text-sm">AI analysis completed</div>
                          <div className="text-gray-400 text-xs">4 minutes ago</div>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-red-400 rounded-full mt-2"></div>
                        <div>
                          <div className="text-white text-sm">Threat detected</div>
                          <div className="text-gray-400 text-xs">5 minutes ago</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Response Metrics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-cyan-900/20 rounded-lg p-4 border border-cyan-500/30">
                    <div className="text-cyan-400 text-2xl font-bold">&lt; 1s</div>
                    <div className="text-white text-sm font-medium">Detection Speed</div>
                    <div className="text-gray-400 text-xs">Average response time</div>
                  </div>
                  <div className="bg-green-900/20 rounded-lg p-4 border border-green-500/30">
                    <div className="text-green-400 text-2xl font-bold">98.7%</div>
                    <div className="text-white text-sm font-medium">Containment Rate</div>
                    <div className="text-gray-400 text-xs">Successful isolations</div>
                  </div>
                  <div className="bg-purple-900/20 rounded-lg p-4 border border-purple-500/30">
                    <div className="text-purple-400 text-2xl font-bold">847</div>
                    <div className="text-white text-sm font-medium">Threats Blocked</div>
                    <div className="text-gray-400 text-xs">Today</div>
                  </div>
                  <div className="bg-orange-900/20 rounded-lg p-4 border border-orange-500/30">
                    <div className="text-orange-400 text-2xl font-bold">0.3%</div>
                    <div className="text-white text-sm font-medium">False Positives</div>
                    <div className="text-gray-400 text-xs">Error rate</div>
                  </div>
                </div>

                {/* Automated Actions */}
                <div className="bg-gray-800/30 rounded-lg p-4 border border-gray-700">
                  <h4 className="text-white font-medium mb-4 flex items-center">
                    <Bot className="w-4 h-4 text-purple-400 mr-2" />
                    Automated Response Actions
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-white">Network Isolation</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-white">Account Lockdown</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-white">Process Termination</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-white">Evidence Collection</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-white">Alert Generation</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-white">Backup Restoration</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Technical Architecture */}
          <section className="bg-gradient-to-r from-surface/30 to-surface/50 rounded-xl p-8 border border-surface-light">
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
              <Brain className="w-8 h-8 mr-3 text-cyan-400" />
              AI-Driven Architecture
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-cyan-400 mb-4">Machine Learning Models</h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span><strong>Neural Networks:</strong> Deep learning models for threat classification and anomaly detection</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span><strong>Behavioral Analysis:</strong> User and Entity Behavior Analytics (UEBA) for insider threat detection</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span><strong>Pattern Recognition:</strong> Advanced algorithms for identifying attack patterns and IOCs</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span><strong>Predictive Models:</strong> Forecasting potential attack vectors and vulnerabilities</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-cyan-400 mb-4">Integration Capabilities</h3>
                <div className="space-y-3">
                  {integrations.map((integration, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Network className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                      <span className="text-gray-300">{integration}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 p-6 bg-surface/30 rounded-lg border border-cyan-500/20">
              <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-green-400" />
                Performance Benefits
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">2.22M+</div>
                  <div className="text-sm text-gray-400">Average cost savings vs traditional security</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-2">70%</div>
                  <div className="text-sm text-gray-400">Reduction in incident response time</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400 mb-2">98%</div>
                  <div className="text-sm text-gray-400">Threat detection accuracy rate</div>
                </div>
              </div>
            </div>
          </section>

          {/* Sector-Specific Benefits */}
          <section>
            <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
              <BarChart3 className="w-8 h-8 mr-3 text-cyan-400" />
              Sector-Specific Benefits
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="bg-gradient-to-br from-blue-900/20 to-blue-700/20 border-blue-500/30">
                <CardHeader>
                  <CardTitle className="text-white text-xl flex items-center">
                    <Badge className="bg-blue-500 text-white mr-3">Education</Badge>
                    K-12 & Higher Education
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">FERPA and COPPA compliance automation</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">Student data protection with automated incident response</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">Classroom device security and 1:1 program protection</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">Research network security with automated threat isolation</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-900/20 to-green-700/20 border-green-500/30">
                <CardHeader>
                  <CardTitle className="text-white text-xl flex items-center">
                    <Badge className="bg-green-500 text-white mr-3">Government</Badge>
                    Municipal & Federal
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">FedRAMP and FISMA compliance with automated controls</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">Critical infrastructure protection with rapid response</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">Citizen data security and public records protection</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">Inter-agency secure communication and data sharing</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Call to Action */}
          <section className="text-center">
            <div className="bg-gradient-to-r from-cyan-900/20 to-blue-900/20 rounded-xl p-8 border border-cyan-500/20">
              <h2 className="text-3xl font-bold text-white mb-4">
                Enhance Your Incident Response Capabilities
              </h2>
              <p className="text-gray-300 text-lg mb-6 max-w-2xl mx-auto">
                Deploy AI-powered automated incident response and reduce your mean time to containment by 70%.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button size="lg" className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600" data-testid="button-request-demo">
                    Request Demo
                  </Button>
                </Link>
                <Link href="/pricing">
                  <Button variant="outline" size="lg" className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10" data-testid="button-view-pricing">
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