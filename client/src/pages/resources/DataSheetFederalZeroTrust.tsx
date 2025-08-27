import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  Lock, 
  Eye, 
  Server,
  Users,
  CheckCircle,
  Download,
  ArrowRight,
  Network,
  Building,
  Zap,
  Target
} from "lucide-react";
import { MarketingLayout } from "@/components/MarketingLayout";

export default function DataSheetFederalZeroTrust() {
  return (
    <MarketingLayout>
      <div className="min-h-screen bg-slate-900">
        {/* SEO Optimized Header */}
        <section className="py-20 px-6 bg-gradient-to-br from-slate-900 via-blue-900/20 to-slate-900">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-12">
              <Badge className="mb-6 bg-blue-500/20 text-blue-300 border-blue-500/30">
                Federal Zero-Trust Architecture
              </Badge>
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Federal <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-500">
                  Zero-Trust Architecture
                </span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                Technical Specifications and Deployment Guide for FedRAMP High-Compliant Zero-Trust Implementation
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Download className="mr-2 w-5 h-5" />
                  Download Technical Specs
                </Button>
                <Button size="lg" variant="outline" className="border-blue-500 text-blue-400 hover:bg-blue-500/10">
                  <Target className="mr-2 w-5 h-5" />
                  Request Implementation Guide
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Overview and Key Features */}
        <section className="py-16 px-6 bg-slate-800">
          <div className="container mx-auto max-w-4xl">
            <Card className="bg-slate-700/60 border border-blue-500/30">
              <CardHeader>
                <CardTitle className="text-2xl text-white flex items-center">
                  <Building className="mr-3 w-6 h-6 text-blue-400" />
                  Solution Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-300">
                <p className="text-lg leading-relaxed">
                  CyberSecured AI's Federal Zero-Trust Architecture Implementation provides comprehensive technical specifications 
                  and deployment guidance for federal agencies transitioning to zero-trust security models. This solution ensures 
                  <strong className="text-blue-400"> continuous verification</strong>, <strong className="text-blue-400">least privilege access</strong>, 
                  and <strong className="text-blue-400">micro-segmentation</strong> across all government networks.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-400 mb-2">99.7%</div>
                    <div className="text-sm text-gray-400">Threat detection accuracy</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-400 mb-2">500K+</div>
                    <div className="text-sm text-gray-400">Endpoints supported</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-cyan-400 mb-2">24/7</div>
                    <div className="text-sm text-gray-400">SOC monitoring</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Key Features Grid */}
        <section className="py-16 px-6 bg-slate-900">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-white text-center mb-12">
              Key Features & Capabilities
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="bg-slate-800/60 border border-green-500/30">
                <CardHeader>
                  <CardTitle className="text-lg text-green-400 flex items-center">
                    <Lock className="mr-3 w-5 h-5" />
                    FedRAMP High Compliance
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-gray-300 text-sm">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    <span>Continuous behavioral monitoring</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    <span>PIV/CAC infrastructure integration</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    <span>Multi-factor authentication</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    <span>FISMA compliance automation</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/60 border border-blue-500/30">
                <CardHeader>
                  <CardTitle className="text-lg text-blue-400 flex items-center">
                    <Eye className="mr-3 w-5 h-5" />
                    AI-Powered Detection
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-gray-300 text-sm">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    <span>99.7% threat detection accuracy</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    <span>Behavioral anomaly analysis</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    <span>ML-enhanced threat intelligence</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    <span>Real-time risk assessment</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/60 border border-purple-500/30">
                <CardHeader>
                  <CardTitle className="text-lg text-purple-400 flex items-center">
                    <Network className="mr-3 w-5 h-5" />
                    Micro-Segmentation
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-gray-300 text-sm">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    <span>Automated deployment</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    <span>Legacy system support</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    <span>Cloud infrastructure ready</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    <span>Dynamic policy enforcement</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/60 border border-orange-500/30">
                <CardHeader>
                  <CardTitle className="text-lg text-orange-400 flex items-center">
                    <Shield className="mr-3 w-5 h-5" />
                    Policy Enforcement
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-gray-300 text-sm">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    <span>Real-time policy updates</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    <span>Granular access controls</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    <span>Least privilege enforcement</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    <span>Contextual access decisions</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/60 border border-cyan-500/30">
                <CardHeader>
                  <CardTitle className="text-lg text-cyan-400 flex items-center">
                    <Server className="mr-3 w-5 h-5" />
                    Compliance Reporting
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-gray-300 text-sm">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    <span>FISMA automated reporting</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    <span>NIST 800-207 compliance</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    <span>EO 14028 alignment</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    <span>Comprehensive audit logs</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/60 border border-red-500/30">
                <CardHeader>
                  <CardTitle className="text-lg text-red-400 flex items-center">
                    <Zap className="mr-3 w-5 h-5" />
                    24/7 SOC Monitoring
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-gray-300 text-sm">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    <span>Continuous threat monitoring</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    <span>Expert security analysts</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    <span>Incident response coordination</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    <span>Government clearance staff</span>
                  </div>
                </CardContent>
              </Card>
            </div>
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
                  <CardTitle className="text-xl text-blue-400">Deployment Architecture</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-slate-800/60 rounded">
                      <span className="text-gray-300">Deployment Options:</span>
                      <span className="text-blue-400 font-bold">On-premises, GovCloud, Hybrid</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-slate-800/60 rounded">
                      <span className="text-gray-300">Endpoint Capacity:</span>
                      <span className="text-blue-400 font-bold">500,000+ endpoints</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-slate-800/60 rounded">
                      <span className="text-gray-300">Latency Impact:</span>
                      <span className="text-green-400 font-bold">&lt; 5ms additional</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-slate-800/60 rounded">
                      <span className="text-gray-300">High Availability:</span>
                      <span className="text-green-400 font-bold">99.999% uptime</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-700/60 border border-green-500/30">
                <CardHeader>
                  <CardTitle className="text-xl text-green-400">Integration Capabilities</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-slate-800/60 rounded">
                      <span className="text-gray-300">Identity Systems:</span>
                      <span className="text-green-400 font-bold">PIV/CAC, Active Directory</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-slate-800/60 rounded">
                      <span className="text-gray-300">SIEM Integration:</span>
                      <span className="text-green-400 font-bold">Splunk, QRadar, Sentinel</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-slate-800/60 rounded">
                      <span className="text-gray-300">API Support:</span>
                      <span className="text-green-400 font-bold">RESTful, GraphQL</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-slate-800/60 rounded">
                      <span className="text-gray-300">Data Formats:</span>
                      <span className="text-green-400 font-bold">STIX/TAXII, JSON, XML</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Visual: Zero-Trust Architecture Diagram */}
        <section className="py-16 px-6 bg-slate-900">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-white text-center mb-12">
              Interactive Zero-Trust Architecture Diagram
            </h2>
            <Card className="bg-slate-800/60 border border-cyan-500/30">
              <CardContent className="p-8">
                <div className="space-y-8">
                  {/* Verification Points */}
                  <div className="text-center mb-8">
                    <h3 className="text-xl font-bold text-cyan-400 mb-4">Continuous Verification Points</h3>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="bg-slate-700/60 p-4 rounded text-center">
                        <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Users className="w-6 h-6 text-blue-400" />
                        </div>
                        <h4 className="font-bold text-white text-sm">User Identity</h4>
                        <p className="text-gray-400 text-xs mt-1">PIV/CAC + Behavioral</p>
                      </div>
                      <div className="bg-slate-700/60 p-4 rounded text-center">
                        <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Server className="w-6 h-6 text-green-400" />
                        </div>
                        <h4 className="font-bold text-white text-sm">Device Trust</h4>
                        <p className="text-gray-400 text-xs mt-1">Endpoint Compliance</p>
                      </div>
                      <div className="bg-slate-700/60 p-4 rounded text-center">
                        <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Network className="w-6 h-6 text-purple-400" />
                        </div>
                        <h4 className="font-bold text-white text-sm">Network Context</h4>
                        <p className="text-gray-400 text-xs mt-1">Location + Security</p>
                      </div>
                      <div className="bg-slate-700/60 p-4 rounded text-center">
                        <div className="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Lock className="w-6 h-6 text-orange-400" />
                        </div>
                        <h4 className="font-bold text-white text-sm">Resource Access</h4>
                        <p className="text-gray-400 text-xs mt-1">Least Privilege</p>
                      </div>
                    </div>
                  </div>

                  {/* Architecture Flow */}
                  <div className="bg-slate-700/60 p-6 rounded-lg">
                    <h4 className="text-lg font-bold text-white mb-4">Federal Agency Implementation Flow:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                          <span className="text-blue-400 font-bold">1</span>
                        </div>
                        <h5 className="text-sm font-bold text-blue-400 mb-2">Identity Verification</h5>
                        <p className="text-xs text-gray-300">PIV/CAC authentication with behavioral analysis</p>
                      </div>
                      <div className="text-center">
                        <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                          <span className="text-green-400 font-bold">2</span>
                        </div>
                        <h5 className="text-sm font-bold text-green-400 mb-2">Device Assessment</h5>
                        <p className="text-xs text-gray-300">Endpoint compliance and trust evaluation</p>
                      </div>
                      <div className="text-center">
                        <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                          <span className="text-purple-400 font-bold">3</span>
                        </div>
                        <h5 className="text-sm font-bold text-purple-400 mb-2">Risk Analysis</h5>
                        <p className="text-xs text-gray-300">AI-powered threat and risk assessment</p>
                      </div>
                      <div className="text-center">
                        <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                          <span className="text-orange-400 font-bold">4</span>
                        </div>
                        <h5 className="text-sm font-bold text-orange-400 mb-2">Policy Decision</h5>
                        <p className="text-xs text-gray-300">Dynamic access policy enforcement</p>
                      </div>
                      <div className="text-center">
                        <div className="w-16 h-16 bg-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                          <span className="text-cyan-400 font-bold">5</span>
                        </div>
                        <h5 className="text-sm font-bold text-cyan-400 mb-2">Continuous Monitoring</h5>
                        <p className="text-xs text-gray-300">Ongoing verification and adaptation</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Secure Operations Center Visualization */}
        <section className="py-16 px-6 bg-slate-800">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-white text-center mb-12">
              Federal Security Operations Center Dashboard
            </h2>
            <Card className="bg-slate-700/60 border border-green-500/30">
              <CardContent className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <h3 className="text-xl font-bold text-green-400 mb-6">Real-Time Threat Detection Metrics</h3>
                    <div className="space-y-4">
                      <div className="bg-slate-800/60 p-4 rounded">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-300">Threat Detection Accuracy</span>
                          <span className="text-green-400 font-bold">99.7%</span>
                        </div>
                        <div className="w-full bg-slate-600 rounded-full h-2">
                          <div className="bg-green-400 h-2 rounded-full" style={{width: '99.7%'}}></div>
                        </div>
                      </div>
                      <div className="bg-slate-800/60 p-4 rounded">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-300">False Positive Rate</span>
                          <span className="text-blue-400 font-bold">0.3%</span>
                        </div>
                        <div className="w-full bg-slate-600 rounded-full h-2">
                          <div className="bg-blue-400 h-2 rounded-full" style={{width: '0.3%'}}></div>
                        </div>
                      </div>
                      <div className="bg-slate-800/60 p-4 rounded">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-300">System Availability</span>
                          <span className="text-cyan-400 font-bold">99.999%</span>
                        </div>
                        <div className="w-full bg-slate-600 rounded-full h-2">
                          <div className="bg-cyan-400 h-2 rounded-full" style={{width: '99.999%'}}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-blue-400 mb-6">Live Security Status</h3>
                    <div className="space-y-4">
                      <div className="bg-green-500/10 p-4 rounded border border-green-500/30">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-bold text-green-400">Protected Endpoints</div>
                            <div className="text-2xl font-bold text-white">487,329</div>
                          </div>
                          <CheckCircle className="w-8 h-8 text-green-400" />
                        </div>
                      </div>
                      <div className="bg-blue-500/10 p-4 rounded border border-blue-500/30">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-bold text-blue-400">Active Sessions</div>
                            <div className="text-2xl font-bold text-white">124,876</div>
                          </div>
                          <Users className="w-8 h-8 text-blue-400" />
                        </div>
                      </div>
                      <div className="bg-purple-500/10 p-4 rounded border border-purple-500/30">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-bold text-purple-400">Policies Enforced</div>
                            <div className="text-2xl font-bold text-white">2,847</div>
                          </div>
                          <Shield className="w-8 h-8 text-purple-400" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Implementation Guide */}
        <section className="py-16 px-6 bg-slate-900">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-white text-center mb-12">
              Federal Implementation Timeline
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="bg-slate-800/60 border border-blue-500/30">
                <CardHeader className="text-center">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-blue-400 font-bold">1</span>
                  </div>
                  <CardTitle className="text-lg text-blue-400">Assessment</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-gray-300 text-sm">
                  <p>• Current infrastructure analysis</p>
                  <p>• Risk assessment and gap identification</p>
                  <p>• Compliance requirement mapping</p>
                  <p>• Stakeholder alignment</p>
                  <div className="mt-4 text-center">
                    <Badge className="bg-blue-500/20 text-blue-300">30-45 days</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/60 border border-green-500/30">
                <CardHeader className="text-center">
                  <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-green-400 font-bold">2</span>
                  </div>
                  <CardTitle className="text-lg text-green-400">Pilot Deployment</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-gray-300 text-sm">
                  <p>• Limited scope implementation</p>
                  <p>• Identity system integration</p>
                  <p>• Initial policy configuration</p>
                  <p>• User training and feedback</p>
                  <div className="mt-4 text-center">
                    <Badge className="bg-green-500/20 text-green-300">60-90 days</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/60 border border-purple-500/30">
                <CardHeader className="text-center">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-purple-400 font-bold">3</span>
                  </div>
                  <CardTitle className="text-lg text-purple-400">Full Rollout</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-gray-300 text-sm">
                  <p>• Agency-wide deployment</p>
                  <p>• Complete micro-segmentation</p>
                  <p>• Advanced policy enforcement</p>
                  <p>• SOC integration and monitoring</p>
                  <div className="mt-4 text-center">
                    <Badge className="bg-purple-500/20 text-purple-300">120-180 days</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/60 border border-orange-500/30">
                <CardHeader className="text-center">
                  <div className="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-orange-400 font-bold">4</span>
                  </div>
                  <CardTitle className="text-lg text-orange-400">Optimization</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-gray-300 text-sm">
                  <p>• Performance tuning</p>
                  <p>• Policy refinement</p>
                  <p>• Advanced analytics</p>
                  <p>• Continuous improvement</p>
                  <div className="mt-4 text-center">
                    <Badge className="bg-orange-500/20 text-orange-300">Ongoing</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Conclusion and Call to Action */}
        <section className="py-20 px-6 bg-gradient-to-br from-slate-900 via-blue-900/20 to-slate-900">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-4xl font-bold text-white mb-8">
              Secure Federal Networks with Zero-Trust
            </h2>
            <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
              Deploy FedRAMP High-compliant zero-trust architecture with 99.7% threat detection accuracy 
              and comprehensive compliance automation for federal agencies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                <Building className="mr-2 w-5 h-5" />
                Request Federal Demo
              </Button>
              <Button size="lg" variant="outline" className="border-blue-500 text-blue-400 hover:bg-blue-500/10">
                <Download className="mr-2 w-5 h-5" />
                Download Technical Specs
              </Button>
            </div>
          </div>
        </section>
      </div>
    </MarketingLayout>
  );
}