import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  GitMerge, 
  Shield, 
  Brain, 
  Network,
  Users,
  TrendingUp,
  Download,
  ArrowRight,
  Layers,
  Target,
  Zap
} from "lucide-react";
import { MarketingLayout } from "@/components/MarketingLayout";

export default function WhitePaperSecurityConvergence() {
  return (
    <MarketingLayout>
      <div className="min-h-screen bg-slate-900">
        {/* SEO Optimized Header */}
        <section className="py-20 px-6 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-12">
              <Badge className="mb-6 bg-purple-500/20 text-purple-300 border-purple-500/30">
                Security Convergence Framework
              </Badge>
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                AI Security <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-500">
                  Convergence
                </span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                Integrating Traditional Cybersecurity with AI-Specific Protections for Unified Defense Architecture
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white">
                  <Download className="mr-2 w-5 h-5" />
                  Download Framework Guide
                </Button>
                <Button size="lg" variant="outline" className="border-purple-500 text-purple-400 hover:bg-purple-500/10">
                  <Target className="mr-2 w-5 h-5" />
                  Assessment Tool
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Executive Summary */}
        <section className="py-16 px-6 bg-slate-800">
          <div className="container mx-auto max-w-4xl">
            <Card className="bg-slate-700/60 border border-purple-500/30">
              <CardHeader>
                <CardTitle className="text-2xl text-white flex items-center">
                  <GitMerge className="mr-3 w-6 h-6 text-purple-400" />
                  Executive Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-300">
                <p className="text-lg leading-relaxed">
                  The critical intersection between traditional cybersecurity frameworks and emerging AI-specific security challenges 
                  demands an <strong className="text-purple-400">integrated protection strategy</strong>. Organizations implementing 
                  converged security architectures report <strong className="text-purple-400">67% fewer security gaps</strong> and 
                  <strong className="text-purple-400">43% faster threat response times</strong>.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-400 mb-2">67%</div>
                    <div className="text-sm text-gray-400">Reduction in security gaps</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-cyan-400 mb-2">43%</div>
                    <div className="text-sm text-gray-400">Faster threat response</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-400 mb-2">89%</div>
                    <div className="text-sm text-gray-400">Improved security posture</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Visual: Security Convergence Intersection */}
        <section className="py-16 px-6 bg-slate-900">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-white text-center mb-12">
              Traditional Cybersecurity & AI-Specific Protection Domains
            </h2>
            <Card className="bg-slate-800/60 border border-cyan-500/30">
              <CardContent className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Shield className="w-10 h-10 text-blue-400" />
                    </div>
                    <h3 className="text-xl font-bold text-blue-400 mb-4">Traditional Cybersecurity</h3>
                    <div className="space-y-2 text-gray-300">
                      <p>• Network perimeter defense</p>
                      <p>• Endpoint protection</p>
                      <p>• Identity & access management</p>
                      <p>• Compliance frameworks</p>
                      <p>• Incident response procedures</p>
                      <p>• Vulnerability management</p>
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="w-20 h-20 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <GitMerge className="w-10 h-10 text-purple-400" />
                    </div>
                    <h3 className="text-xl font-bold text-purple-400 mb-4">Convergence Zone</h3>
                    <div className="space-y-2 text-gray-300">
                      <p>• Unified threat intelligence</p>
                      <p>• Integrated monitoring</p>
                      <p>• Cross-domain analytics</p>
                      <p>• Shared governance</p>
                      <p>• Coordinated response</p>
                      <p>• Holistic risk assessment</p>
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Brain className="w-10 h-10 text-green-400" />
                    </div>
                    <h3 className="text-xl font-bold text-green-400 mb-4">AI-Specific Protection</h3>
                    <div className="space-y-2 text-gray-300">
                      <p>• Model integrity verification</p>
                      <p>• Adversarial attack detection</p>
                      <p>• Data poisoning prevention</p>
                      <p>• AI ethics & bias monitoring</p>
                      <p>• Model extraction protection</p>
                      <p>• Algorithmic transparency</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Convergence Architecture Framework */}
        <section className="py-16 px-6 bg-slate-800">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-white text-center mb-12">
              Converged Security Architecture Framework
            </h2>
            <Card className="bg-slate-700/60 border border-orange-500/30">
              <CardContent className="p-8">
                <div className="space-y-8">
                  {/* Layer 1: Governance */}
                  <div className="border border-orange-500/30 rounded-lg p-6">
                    <div className="flex items-center mb-4">
                      <Layers className="w-6 h-6 text-orange-400 mr-3" />
                      <h3 className="text-xl font-bold text-orange-400">Layer 1: Unified Governance</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-slate-800/60 p-4 rounded">
                        <h4 className="font-bold text-white mb-2">Policy Integration</h4>
                        <p className="text-gray-300 text-sm">Harmonized security policies covering traditional and AI domains</p>
                      </div>
                      <div className="bg-slate-800/60 p-4 rounded">
                        <h4 className="font-bold text-white mb-2">Risk Framework</h4>
                        <p className="text-gray-300 text-sm">Unified risk assessment methodology for all security domains</p>
                      </div>
                      <div className="bg-slate-800/60 p-4 rounded">
                        <h4 className="font-bold text-white mb-2">Compliance Management</h4>
                        <p className="text-gray-300 text-sm">Centralized compliance tracking across regulatory requirements</p>
                      </div>
                    </div>
                  </div>

                  {/* Layer 2: Detection & Analytics */}
                  <div className="border border-cyan-500/30 rounded-lg p-6">
                    <div className="flex items-center mb-4">
                      <Target className="w-6 h-6 text-cyan-400 mr-3" />
                      <h3 className="text-xl font-bold text-cyan-400">Layer 2: Integrated Detection & Analytics</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-slate-800/60 p-4 rounded">
                        <h4 className="font-bold text-white mb-2">Cross-Domain Monitoring</h4>
                        <p className="text-gray-300 text-sm">Unified monitoring across network, endpoint, and AI systems</p>
                      </div>
                      <div className="bg-slate-800/60 p-4 rounded">
                        <h4 className="font-bold text-white mb-2">Threat Intelligence Fusion</h4>
                        <p className="text-gray-300 text-sm">Combined traditional and AI-specific threat intelligence feeds</p>
                      </div>
                      <div className="bg-slate-800/60 p-4 rounded">
                        <h4 className="font-bold text-white mb-2">Behavioral Analytics</h4>
                        <p className="text-gray-300 text-sm">AI-powered analysis of both system and model behaviors</p>
                      </div>
                    </div>
                  </div>

                  {/* Layer 3: Response & Recovery */}
                  <div className="border border-green-500/30 rounded-lg p-6">
                    <div className="flex items-center mb-4">
                      <Zap className="w-6 h-6 text-green-400 mr-3" />
                      <h3 className="text-xl font-bold text-green-400">Layer 3: Coordinated Response & Recovery</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-slate-800/60 p-4 rounded">
                        <h4 className="font-bold text-white mb-2">Automated Response</h4>
                        <p className="text-gray-300 text-sm">Orchestrated response across traditional and AI security controls</p>
                      </div>
                      <div className="bg-slate-800/60 p-4 rounded">
                        <h4 className="font-bold text-white mb-2">Incident Correlation</h4>
                        <p className="text-gray-300 text-sm">Unified incident management for complex multi-domain attacks</p>
                      </div>
                      <div className="bg-slate-800/60 p-4 rounded">
                        <h4 className="font-bold text-white mb-2">Recovery Orchestration</h4>
                        <p className="text-gray-300 text-sm">Coordinated recovery procedures for affected systems and models</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Integration Process Flow */}
        <section className="py-16 px-6 bg-slate-900">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-white text-center mb-12">
              Integrated Incident Response Process Flow
            </h2>
            <Card className="bg-slate-800/60 border border-purple-500/30">
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-red-400 font-bold">1</span>
                      </div>
                      <h4 className="text-sm font-bold text-red-400 mb-2">Detection</h4>
                      <p className="text-xs text-gray-300">Unified threat detection across all domains</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-orange-400 font-bold">2</span>
                      </div>
                      <h4 className="text-sm font-bold text-orange-400 mb-2">Analysis</h4>
                      <p className="text-xs text-gray-300">Cross-domain correlation and impact assessment</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-yellow-400 font-bold">3</span>
                      </div>
                      <h4 className="text-sm font-bold text-yellow-400 mb-2">Containment</h4>
                      <p className="text-xs text-gray-300">Coordinated isolation of affected systems</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-green-400 font-bold">4</span>
                      </div>
                      <h4 className="text-sm font-bold text-green-400 mb-2">Eradication</h4>
                      <p className="text-xs text-gray-300">Unified threat removal and vulnerability patching</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-blue-400 font-bold">5</span>
                      </div>
                      <h4 className="text-sm font-bold text-blue-400 mb-2">Recovery</h4>
                      <p className="text-xs text-gray-300">Orchestrated system and model restoration</p>
                    </div>
                  </div>

                  {/* Process Details */}
                  <div className="bg-slate-700/60 p-6 rounded-lg">
                    <h4 className="text-lg font-bold text-white mb-4">Key Integration Points:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <ArrowRight className="w-4 h-4 text-purple-400 mr-2" />
                          <span className="text-gray-300">Shared threat intelligence feeds</span>
                        </div>
                        <div className="flex items-center">
                          <ArrowRight className="w-4 h-4 text-purple-400 mr-2" />
                          <span className="text-gray-300">Unified incident ticketing system</span>
                        </div>
                        <div className="flex items-center">
                          <ArrowRight className="w-4 h-4 text-purple-400 mr-2" />
                          <span className="text-gray-300">Cross-domain forensic capabilities</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <ArrowRight className="w-4 h-4 text-purple-400 mr-2" />
                          <span className="text-gray-300">Coordinated communication protocols</span>
                        </div>
                        <div className="flex items-center">
                          <ArrowRight className="w-4 h-4 text-purple-400 mr-2" />
                          <span className="text-gray-300">Integrated recovery procedures</span>
                        </div>
                        <div className="flex items-center">
                          <ArrowRight className="w-4 h-4 text-purple-400 mr-2" />
                          <span className="text-gray-300">Lessons learned consolidation</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Maturity Model Visualization */}
        <section className="py-16 px-6 bg-slate-800">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-white text-center mb-12">
              Security Convergence Maturity Model
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="bg-slate-700/60 border border-red-500/30">
                <CardHeader className="text-center">
                  <Badge className="mb-4 bg-red-500/20 text-red-300">Level 1</Badge>
                  <CardTitle className="text-lg text-red-400">Isolated</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-gray-300 text-sm">
                  <p>• Separate security teams</p>
                  <p>• Disconnected tools</p>
                  <p>• Manual processes</p>
                  <p>• Limited visibility</p>
                  <div className="mt-4">
                    <div className="text-center text-red-400 font-bold">25% Effectiveness</div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-700/60 border border-orange-500/30">
                <CardHeader className="text-center">
                  <Badge className="mb-4 bg-orange-500/20 text-orange-300">Level 2</Badge>
                  <CardTitle className="text-lg text-orange-400">Coordinated</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-gray-300 text-sm">
                  <p>• Shared communication</p>
                  <p>• Some tool integration</p>
                  <p>• Cross-training initiated</p>
                  <p>• Basic automation</p>
                  <div className="mt-4">
                    <div className="text-center text-orange-400 font-bold">55% Effectiveness</div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-700/60 border border-green-500/30">
                <CardHeader className="text-center">
                  <Badge className="mb-4 bg-green-500/20 text-green-300">Level 3</Badge>
                  <CardTitle className="text-lg text-green-400">Integrated</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-gray-300 text-sm">
                  <p>• Unified governance</p>
                  <p>• Integrated platforms</p>
                  <p>• Automated workflows</p>
                  <p>• Shared metrics</p>
                  <div className="mt-4">
                    <div className="text-center text-green-400 font-bold">80% Effectiveness</div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-700/60 border border-purple-500/30">
                <CardHeader className="text-center">
                  <Badge className="mb-4 bg-purple-500/20 text-purple-300">Level 4</Badge>
                  <CardTitle className="text-lg text-purple-400">Optimized</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-gray-300 text-sm">
                  <p>• AI-driven convergence</p>
                  <p>• Predictive capabilities</p>
                  <p>• Self-healing systems</p>
                  <p>• Continuous improvement</p>
                  <div className="mt-4">
                    <div className="text-center text-purple-400 font-bold">95% Effectiveness</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Implementation Timeline */}
        <section className="py-16 px-6 bg-slate-900">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-white text-center mb-12">
              Evolution of Cybersecurity Approaches
            </h2>
            <Card className="bg-slate-800/60 border border-cyan-500/30">
              <CardContent className="p-8">
                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="text-center">
                      <div className="text-lg font-bold text-cyan-400 mb-2">2020-2022</div>
                      <h4 className="font-bold text-white mb-3">Traditional Focus</h4>
                      <div className="space-y-2 text-gray-300 text-sm">
                        <p>• Perimeter-based security</p>
                        <p>• Signature-based detection</p>
                        <p>• Manual response processes</p>
                        <p>• Compliance-driven approach</p>
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-cyan-400 mb-2">2023-2024</div>
                      <h4 className="font-bold text-white mb-3">AI Emergence</h4>
                      <div className="space-y-2 text-gray-300 text-sm">
                        <p>• AI security awareness</p>
                        <p>• Initial AI protections</p>
                        <p>• Separate AI security teams</p>
                        <p>• Siloed approaches</p>
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-cyan-400 mb-2">2025-2026</div>
                      <h4 className="font-bold text-white mb-3">Convergence Era</h4>
                      <div className="space-y-2 text-gray-300 text-sm">
                        <p>• Integrated security frameworks</p>
                        <p>• Unified threat intelligence</p>
                        <p>• Cross-domain analytics</p>
                        <p>• Coordinated response</p>
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-cyan-400 mb-2">2027+</div>
                      <h4 className="font-bold text-white mb-3">Adaptive Security</h4>
                      <div className="space-y-2 text-gray-300 text-sm">
                        <p>• Self-evolving protections</p>
                        <p>• Predictive security posture</p>
                        <p>• Autonomous response</p>
                        <p>• Zero-touch operations</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Supplementary Content: Assessment Tool */}
        <section className="py-16 px-6 bg-slate-800">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold text-white text-center mb-12">
              Security Convergence Assessment Tool
            </h2>
            <Card className="bg-slate-700/60 border border-purple-500/30">
              <CardHeader>
                <CardTitle className="text-xl text-purple-400 flex items-center">
                  <Target className="mr-3 w-5 h-5" />
                  Evaluate Your Current Convergence Maturity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="text-lg font-bold text-white">Assessment Categories</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-slate-800/60 rounded">
                        <span className="text-gray-300">Governance Integration:</span>
                        <span className="text-orange-400 font-bold">Level 2</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-slate-800/60 rounded">
                        <span className="text-gray-300">Technology Convergence:</span>
                        <span className="text-red-400 font-bold">Level 1</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-slate-800/60 rounded">
                        <span className="text-gray-300">Process Integration:</span>
                        <span className="text-green-400 font-bold">Level 3</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-slate-800/60 rounded">
                        <span className="text-gray-300">Team Collaboration:</span>
                        <span className="text-orange-400 font-bold">Level 2</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-lg font-bold text-white">Recommendations</h4>
                    <div className="space-y-3">
                      <div className="p-3 bg-blue-500/10 rounded">
                        <div className="font-bold text-blue-400 mb-1">Priority 1: Technology Integration</div>
                        <div className="text-gray-300 text-sm">Implement unified security platform for monitoring</div>
                      </div>
                      <div className="p-3 bg-green-500/10 rounded">
                        <div className="font-bold text-green-400 mb-1">Priority 2: Team Structure</div>
                        <div className="text-gray-300 text-sm">Create cross-functional security teams</div>
                      </div>
                      <div className="p-3 bg-purple-500/10 rounded">
                        <div className="font-bold text-purple-400 mb-1">Priority 3: Governance</div>
                        <div className="text-gray-300 text-sm">Establish unified security policies</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                    Start Full Assessment
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Conclusion and Call to Action */}
        <section className="py-20 px-6 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-4xl font-bold text-white mb-8">
              Bridge the Security Divide
            </h2>
            <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
              Organizations implementing converged security architectures achieve 67% fewer security gaps 
              and position themselves for the future of unified cyber defense.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white">
                <GitMerge className="mr-2 w-5 h-5" />
                Begin Convergence Assessment
              </Button>
              <Button size="lg" variant="outline" className="border-purple-500 text-purple-400 hover:bg-purple-500/10">
                <Users className="mr-2 w-5 h-5" />
                Consult Convergence Experts
              </Button>
            </div>
          </div>
        </section>
      </div>
    </MarketingLayout>
  );
}