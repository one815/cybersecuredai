import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Zap, 
  Shield, 
  Clock, 
  Users,
  AlertTriangle,
  CheckCircle,
  Download,
  ArrowRight,
  Target,
  Phone,
  FileText,
  Lock
} from "lucide-react";
import { MarketingLayout } from "@/components/MarketingLayout";

export default function DataSheetRapidResponse() {
  return (
    <MarketingLayout>
      <div className="min-h-screen bg-slate-900">
        {/* SEO Optimized Header */}
        <section className="py-20 px-6 bg-gradient-to-br from-slate-900 via-orange-900/20 to-slate-900">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-12">
              <Badge className="mb-6 bg-orange-500/20 text-orange-300 border-orange-500/30">
                Federal Rapid Response Toolkit
              </Badge>
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Federal <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
                  Rapid Response
                </span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                Security Toolkit: Technical Components and Implementation Guidelines for Federal Incident Response
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white">
                  <Download className="mr-2 w-5 h-5" />
                  Download Toolkit
                </Button>
                <Button size="lg" variant="outline" className="border-orange-500 text-orange-400 hover:bg-orange-500/10">
                  <Target className="mr-2 w-5 h-5" />
                  Request Demo
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Overview */}
        <section className="py-16 px-6 bg-slate-800">
          <div className="container mx-auto max-w-4xl">
            <Card className="bg-slate-700/60 border border-orange-500/30">
              <CardHeader>
                <CardTitle className="text-2xl text-white flex items-center">
                  <Zap className="mr-3 w-6 h-6 text-orange-400" />
                  Toolkit Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-300">
                <p className="text-lg leading-relaxed">
                  CyberSecured AI's Federal Rapid Response Security Toolkit provides comprehensive technical components and 
                  implementation guidelines for federal agencies to quickly <strong className="text-orange-400">detect</strong>, 
                  <strong className="text-orange-400">contain</strong>, and <strong className="text-orange-400">remediate</strong> 
                  security incidents. This solution dramatically reduces response times and minimizes impact.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-400 mb-2">&lt; 4 min</div>
                    <div className="text-sm text-gray-400">Detection to containment</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-red-400 mb-2">200+</div>
                    <div className="text-sm text-gray-400">Attack scenario playbooks</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-400 mb-2">24/7</div>
                    <div className="text-sm text-gray-400">Cross-agency coordination</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Key Features */}
        <section className="py-16 px-6 bg-slate-900">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-white text-center mb-12">
              Rapid Response Components
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="bg-slate-800/60 border border-red-500/30">
                <CardHeader>
                  <CardTitle className="text-lg text-red-400 flex items-center">
                    <AlertTriangle className="mr-3 w-5 h-5" />
                    Automated Incident Triage
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-gray-300 text-sm">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    <span>AI-powered severity assessment</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    <span>Automatic prioritization ranking</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    <span>Impact scope determination</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    <span>Resource allocation guidance</span>
                  </div>
                  <div className="mt-4 text-center">
                    <Badge className="bg-red-500/20 text-red-300">Sub-minute analysis</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/60 border border-blue-500/30">
                <CardHeader>
                  <CardTitle className="text-lg text-blue-400 flex items-center">
                    <FileText className="mr-3 w-5 h-5" />
                    Pre-configured Playbooks
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-gray-300 text-sm">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    <span>200+ attack scenario responses</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    <span>Federal-specific procedures</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    <span>Compliance-aware workflows</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    <span>Customizable response steps</span>
                  </div>
                  <div className="mt-4 text-center">
                    <Badge className="bg-blue-500/20 text-blue-300">NIST 800-61r2 aligned</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/60 border border-green-500/30">
                <CardHeader>
                  <CardTitle className="text-lg text-green-400 flex items-center">
                    <Lock className="mr-3 w-5 h-5" />
                    One-Click Isolation
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-gray-300 text-sm">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    <span>Instant system quarantine</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    <span>Network segmentation control</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    <span>Distributed network support</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    <span>Selective service isolation</span>
                  </div>
                  <div className="mt-4 text-center">
                    <Badge className="bg-green-500/20 text-green-300">2-second response</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/60 border border-purple-500/30">
                <CardHeader>
                  <CardTitle className="text-lg text-purple-400 flex items-center">
                    <Shield className="mr-3 w-5 h-5" />
                    Chain-of-Custody
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-gray-300 text-sm">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    <span>Digital forensics preservation</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    <span>Legal admissibility standards</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    <span>Tamper-evident evidence</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    <span>Automated documentation</span>
                  </div>
                  <div className="mt-4 text-center">
                    <Badge className="bg-purple-500/20 text-purple-300">Court-ready</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/60 border border-cyan-500/30">
                <CardHeader>
                  <CardTitle className="text-lg text-cyan-400 flex items-center">
                    <Phone className="mr-3 w-5 h-5" />
                    Cross-Agency Coordination
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-gray-300 text-sm">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    <span>Secure communication channels</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    <span>Multi-agency incident sharing</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    <span>Coordinated response protocols</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    <span>Resource pooling capabilities</span>
                  </div>
                  <div className="mt-4 text-center">
                    <Badge className="bg-cyan-500/20 text-cyan-300">FedRAMP secure</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/60 border border-yellow-500/30">
                <CardHeader>
                  <CardTitle className="text-lg text-yellow-400 flex items-center">
                    <Clock className="mr-3 w-5 h-5" />
                    SOC Integration
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-gray-300 text-sm">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    <span>EINSTEIN integration</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    <span>CDM dashboard connectivity</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    <span>Agency-specific SIEM support</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    <span>Standalone deployment option</span>
                  </div>
                  <div className="mt-4 text-center">
                    <Badge className="bg-yellow-500/20 text-yellow-300">Flexible deployment</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Response Timeline Visualization */}
        <section className="py-16 px-6 bg-slate-800">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-white text-center mb-12">
              Emergency Response Timeline Efficiency
            </h2>
            <Card className="bg-slate-700/60 border border-green-500/30">
              <CardContent className="p-8">
                <div className="space-y-8">
                  {/* Before vs After Comparison */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-bold text-red-400 mb-6">Traditional Response Timeline</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 bg-red-500/10 rounded">
                          <span className="text-gray-300">Initial Detection:</span>
                          <span className="text-red-400 font-bold">47 minutes</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-red-500/10 rounded">
                          <span className="text-gray-300">Analysis & Triage:</span>
                          <span className="text-red-400 font-bold">2.3 hours</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-red-500/10 rounded">
                          <span className="text-gray-300">Containment Decision:</span>
                          <span className="text-red-400 font-bold">1.8 hours</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-red-500/10 rounded">
                          <span className="text-gray-300">Implementation:</span>
                          <span className="text-red-400 font-bold">3.2 hours</span>
                        </div>
                        <div className="border-t border-red-500/30 pt-3">
                          <div className="flex justify-between items-center font-bold">
                            <span className="text-white">Total Response Time:</span>
                            <span className="text-red-400 text-xl">7.6 hours</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-green-400 mb-6">Rapid Response Toolkit</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 bg-green-500/10 rounded">
                          <span className="text-gray-300">Automated Detection:</span>
                          <span className="text-green-400 font-bold">12 seconds</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-green-500/10 rounded">
                          <span className="text-gray-300">AI-Powered Triage:</span>
                          <span className="text-green-400 font-bold">45 seconds</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-green-500/10 rounded">
                          <span className="text-gray-300">Playbook Activation:</span>
                          <span className="text-green-400 font-bold">15 seconds</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-green-500/10 rounded">
                          <span className="text-gray-300">One-Click Containment:</span>
                          <span className="text-green-400 font-bold">2 seconds</span>
                        </div>
                        <div className="border-t border-green-500/30 pt-3">
                          <div className="flex justify-between items-center font-bold">
                            <span className="text-white">Total Response Time:</span>
                            <span className="text-green-400 text-xl">1.2 minutes</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Improvement Metrics */}
                  <div className="bg-slate-800/60 p-6 rounded-lg">
                    <h4 className="text-lg font-bold text-white mb-4">Performance Improvements:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-green-400 mb-2">99.7%</div>
                        <div className="text-sm text-gray-400">Faster incident response</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-blue-400 mb-2">87%</div>
                        <div className="text-sm text-gray-400">Reduction in damage scope</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-purple-400 mb-2">92%</div>
                        <div className="text-sm text-gray-400">Fewer manual intervention</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Command Center Visualization */}
        <section className="py-16 px-6 bg-slate-900">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-white text-center mb-12">
              Federal Emergency Response Command Center
            </h2>
            <Card className="bg-slate-800/60 border border-orange-500/30">
              <CardContent className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <h3 className="text-xl font-bold text-orange-400 mb-6">Cross-Agency Incident Coordination</h3>
                    <div className="space-y-4">
                      <div className="bg-slate-700/60 p-4 rounded">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-bold text-white">Active Incidents</h4>
                          <Badge className="bg-red-500/20 text-red-300">3 Critical</Badge>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center p-2 bg-red-500/10 rounded">
                            <span className="text-gray-300">DOD Network Intrusion</span>
                            <span className="text-red-400 font-bold">Active Response</span>
                          </div>
                          <div className="flex justify-between items-center p-2 bg-orange-500/10 rounded">
                            <span className="text-gray-300">Treasury DDoS Attack</span>
                            <span className="text-orange-400 font-bold">Contained</span>
                          </div>
                          <div className="flex justify-between items-center p-2 bg-yellow-500/10 rounded">
                            <span className="text-gray-300">HHS Phishing Campaign</span>
                            <span className="text-yellow-400 font-bold">Investigating</span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-slate-700/60 p-4 rounded">
                        <h4 className="font-bold text-white mb-3">Resource Allocation</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-300">Security Analysts Deployed:</span>
                            <span className="text-green-400 font-bold">47/52</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-300">Forensics Teams Active:</span>
                            <span className="text-blue-400 font-bold">8/12</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-300">Communication Channels:</span>
                            <span className="text-purple-400 font-bold">23 Open</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-cyan-400 mb-6">Mobile Response Capabilities</h3>
                    <div className="space-y-4">
                      <div className="bg-cyan-500/10 p-4 rounded border border-cyan-500/30">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <div className="font-bold text-cyan-400">Mobile Users</div>
                            <div className="text-sm text-gray-400">Secure federal devices</div>
                          </div>
                          <Users className="w-8 h-8 text-cyan-400" />
                        </div>
                        <div className="text-2xl font-bold text-white">156</div>
                      </div>
                      <div className="bg-green-500/10 p-4 rounded border border-green-500/30">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <div className="font-bold text-green-400">Field Operations</div>
                            <div className="text-sm text-gray-400">Remote incident response</div>
                          </div>
                          <Target className="w-8 h-8 text-green-400" />
                        </div>
                        <div className="text-2xl font-bold text-white">23</div>
                      </div>
                      <div className="bg-blue-500/10 p-4 rounded border border-blue-500/30">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <div className="font-bold text-blue-400">Secure Channels</div>
                            <div className="text-sm text-gray-400">Encrypted communications</div>
                          </div>
                          <Phone className="w-8 h-8 text-blue-400" />
                        </div>
                        <div className="text-2xl font-bold text-white">34</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Technical Specifications */}
        <section className="py-16 px-6 bg-slate-800">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-white text-center mb-12">
              Technical Specifications
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="bg-slate-700/60 border border-blue-500/30">
                <CardHeader>
                  <CardTitle className="text-xl text-blue-400">Integration Capabilities</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-slate-800/60 rounded">
                      <span className="text-gray-300">EINSTEIN Integration:</span>
                      <span className="text-green-400 font-bold">Native Support</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-slate-800/60 rounded">
                      <span className="text-gray-300">CDM Compatibility:</span>
                      <span className="text-green-400 font-bold">Full Integration</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-slate-800/60 rounded">
                      <span className="text-gray-300">SIEM Platforms:</span>
                      <span className="text-blue-400 font-bold">15+ Supported</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-slate-800/60 rounded">
                      <span className="text-gray-300">API Integration:</span>
                      <span className="text-blue-400 font-bold">RESTful, SOAP</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-700/60 border border-green-500/30">
                <CardHeader>
                  <CardTitle className="text-xl text-green-400">Performance Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-slate-800/60 rounded">
                      <span className="text-gray-300">Detection Speed:</span>
                      <span className="text-green-400 font-bold">&lt; 12 seconds</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-slate-800/60 rounded">
                      <span className="text-gray-300">Containment Time:</span>
                      <span className="text-green-400 font-bold">&lt; 4 minutes</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-slate-800/60 rounded">
                      <span className="text-gray-300">Playbook Execution:</span>
                      <span className="text-green-400 font-bold">Automated</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-slate-800/60 rounded">
                      <span className="text-gray-300">Compliance Alignment:</span>
                      <span className="text-green-400 font-bold">NIST SP 800-61r2</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Conclusion and Call to Action */}
        <section className="py-20 px-6 bg-gradient-to-br from-slate-900 via-orange-900/20 to-slate-900">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-4xl font-bold text-white mb-8">
              Accelerate Federal Incident Response
            </h2>
            <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
              Deploy rapid response capabilities with sub-4-minute containment times and 
              200+ pre-configured attack scenario playbooks for federal agencies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white">
                <Zap className="mr-2 w-5 h-5" />
                Request Emergency Demo
              </Button>
              <Button size="lg" variant="outline" className="border-orange-500 text-orange-400 hover:bg-orange-500/10">
                <Download className="mr-2 w-5 h-5" />
                Download Implementation Guide
              </Button>
            </div>
          </div>
        </section>
      </div>
    </MarketingLayout>
  );
}