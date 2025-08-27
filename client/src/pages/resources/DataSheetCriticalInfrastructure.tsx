import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  Zap, 
  Eye, 
  Server,
  Building,
  CheckCircle,
  Download,
  ArrowRight,
  Network,
  AlertTriangle,
  Target,
  Globe
} from "lucide-react";
import { MarketingLayout } from "@/components/MarketingLayout";

export default function DataSheetCriticalInfrastructure() {
  return (
    <MarketingLayout>
      <div className="min-h-screen bg-slate-900">
        {/* SEO Optimized Header */}
        <section className="py-20 px-6 bg-gradient-to-br from-slate-900 via-red-900/20 to-slate-900">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-12">
              <Badge className="mb-6 bg-red-500/20 text-red-300 border-red-500/30">
                Critical Infrastructure Security
              </Badge>
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Critical Infrastructure <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-500">
                  AI Security Framework
                </span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                Standards and Best Practices for Federal Agencies Protecting National Security Assets
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white">
                  <Download className="mr-2 w-5 h-5" />
                  Download Framework
                </Button>
                <Button size="lg" variant="outline" className="border-red-500 text-red-400 hover:bg-red-500/10">
                  <Target className="mr-2 w-5 h-5" />
                  Request Assessment
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Overview */}
        <section className="py-16 px-6 bg-slate-800">
          <div className="container mx-auto max-w-4xl">
            <Card className="bg-slate-700/60 border border-red-500/30">
              <CardHeader>
                <CardTitle className="text-2xl text-white flex items-center">
                  <Shield className="mr-3 w-6 h-6 text-red-400" />
                  Framework Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-300">
                <p className="text-lg leading-relaxed">
                  CyberSecured AI's Critical Infrastructure AI Security Framework provides comprehensive standards and best practices 
                  specifically designed for federal agencies protecting critical infrastructure. Our framework integrates 
                  <strong className="text-red-400"> advanced AI capabilities</strong> with <strong className="text-red-400">rigorous security protocols</strong> 
                  to safeguard national security assets.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-red-400 mb-2">95%</div>
                    <div className="text-sm text-gray-400">Threat prediction accuracy</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-400 mb-2">99.999%</div>
                    <div className="text-sm text-gray-400">System uptime guarantee</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-yellow-400 mb-2">16 Sectors</div>
                    <div className="text-sm text-gray-400">Critical infrastructure covered</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Sector-Specific Security Models */}
        <section className="py-16 px-6 bg-slate-900">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-white text-center mb-12">
              Sector-Specific Security Models
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-slate-800/60 border border-yellow-500/30">
                <CardHeader>
                  <CardTitle className="text-lg text-yellow-400 flex items-center">
                    <Zap className="mr-3 w-5 h-5" />
                    Energy Sector
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-gray-300 text-sm">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    <span>NERC CIP compliance automation</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    <span>Grid stability monitoring</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    <span>SCADA system protection</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    <span>Smart grid security</span>
                  </div>
                  <div className="mt-4 text-center">
                    <Badge className="bg-yellow-500/20 text-yellow-300">2,847 facilities protected</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/60 border border-blue-500/30">
                <CardHeader>
                  <CardTitle className="text-lg text-blue-400 flex items-center">
                    <Globe className="mr-3 w-5 h-5" />
                    Water Systems
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-gray-300 text-sm">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    <span>Treatment plant monitoring</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    <span>Distribution system security</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    <span>Quality sensor protection</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    <span>EPA compliance reporting</span>
                  </div>
                  <div className="mt-4 text-center">
                    <Badge className="bg-blue-500/20 text-blue-300">1,523 systems secured</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/60 border border-green-500/30">
                <CardHeader>
                  <CardTitle className="text-lg text-green-400 flex items-center">
                    <Network className="mr-3 w-5 h-5" />
                    Transportation
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-gray-300 text-sm">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    <span>TSA security standards</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    <span>Railway control systems</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    <span>Aviation infrastructure</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    <span>Port security systems</span>
                  </div>
                  <div className="mt-4 text-center">
                    <Badge className="bg-green-500/20 text-green-300">894 hubs protected</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/60 border border-purple-500/30">
                <CardHeader>
                  <CardTitle className="text-lg text-purple-400 flex items-center">
                    <Server className="mr-3 w-5 h-5" />
                    Communications
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-gray-300 text-sm">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    <span>5G network security</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    <span>Emergency communications</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    <span>Satellite infrastructure</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    <span>FCC compliance automation</span>
                  </div>
                  <div className="mt-4 text-center">
                    <Badge className="bg-purple-500/20 text-purple-300">567 networks secured</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* OT/IT Convergence Monitoring */}
        <section className="py-16 px-6 bg-slate-800">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-white text-center mb-12">
              OT/IT Convergence Point Monitoring
            </h2>
            <Card className="bg-slate-700/60 border border-orange-500/30">
              <CardContent className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-bold text-orange-400 mb-6">Real-Time Monitoring Capabilities</h3>
                    <div className="space-y-4">
                      <div className="bg-slate-800/60 p-4 rounded">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-300">Network Traffic Analysis</span>
                          <span className="text-green-400 font-bold">Active</span>
                        </div>
                        <div className="text-sm text-gray-400">Deep packet inspection of OT/IT communications</div>
                      </div>
                      <div className="bg-slate-800/60 p-4 rounded">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-300">Protocol Anomaly Detection</span>
                          <span className="text-blue-400 font-bold">98.7% Accuracy</span>
                        </div>
                        <div className="text-sm text-gray-400">Industrial protocol behavior analysis</div>
                      </div>
                      <div className="bg-slate-800/60 p-4 rounded">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-300">Asset Discovery & Mapping</span>
                          <span className="text-purple-400 font-bold">Continuous</span>
                        </div>
                        <div className="text-sm text-gray-400">Automated OT device identification and cataloging</div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-red-400 mb-6">Automatic Isolation Capabilities</h3>
                    <div className="space-y-4">
                      <div className="bg-red-500/10 p-4 rounded border border-red-500/30">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-gray-300">Threat Response Time</span>
                          <span className="text-red-400 font-bold">&lt; 2 seconds</span>
                        </div>
                        <div className="text-sm text-gray-400">Automated containment upon threat detection</div>
                      </div>
                      <div className="bg-orange-500/10 p-4 rounded border border-orange-500/30">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-gray-300">Granular Segmentation</span>
                          <span className="text-orange-400 font-bold">Device-Level</span>
                        </div>
                        <div className="text-sm text-gray-400">Individual OT device isolation capabilities</div>
                      </div>
                      <div className="bg-yellow-500/10 p-4 rounded border border-yellow-500/30">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-gray-300">Recovery Automation</span>
                          <span className="text-yellow-400 font-bold">Self-Healing</span>
                        </div>
                        <div className="text-sm text-gray-400">Automatic restoration after threat clearance</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Supply Chain Risk Management */}
        <section className="py-16 px-6 bg-slate-900">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-white text-center mb-12">
              Supply Chain Risk Management & Vendor Assessment
            </h2>
            <Card className="bg-slate-800/60 border border-cyan-500/30">
              <CardContent className="p-8">
                <div className="space-y-8">
                  {/* Vendor Assessment Dashboard */}
                  <div className="bg-slate-700/60 p-6 rounded-lg">
                    <h3 className="text-xl font-bold text-cyan-400 mb-6">Continuous Vendor Security Assessment</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="text-center">
                        <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                          <CheckCircle className="w-10 h-10 text-green-400" />
                        </div>
                        <h4 className="font-bold text-green-400 mb-2">Approved Vendors</h4>
                        <div className="text-2xl font-bold text-white">2,847</div>
                        <div className="text-sm text-gray-400">Active security clearance</div>
                      </div>
                      <div className="text-center">
                        <div className="w-20 h-20 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Eye className="w-10 h-10 text-yellow-400" />
                        </div>
                        <h4 className="font-bold text-yellow-400 mb-2">Under Review</h4>
                        <div className="text-2xl font-bold text-white">156</div>
                        <div className="text-sm text-gray-400">Pending assessment</div>
                      </div>
                      <div className="text-center">
                        <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                          <AlertTriangle className="w-10 h-10 text-red-400" />
                        </div>
                        <h4 className="font-bold text-red-400 mb-2">High Risk</h4>
                        <div className="text-2xl font-bold text-white">23</div>
                        <div className="text-sm text-gray-400">Requires immediate attention</div>
                      </div>
                    </div>
                  </div>

                  {/* Risk Assessment Criteria */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-lg font-bold text-white mb-4">Automated Assessment Criteria:</h4>
                      <div className="space-y-3">
                        <div className="flex items-center p-3 bg-slate-800/60 rounded">
                          <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                          <span className="text-gray-300">Security certification compliance</span>
                        </div>
                        <div className="flex items-center p-3 bg-slate-800/60 rounded">
                          <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                          <span className="text-gray-300">Financial stability analysis</span>
                        </div>
                        <div className="flex items-center p-3 bg-slate-800/60 rounded">
                          <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                          <span className="text-gray-300">Geopolitical risk assessment</span>
                        </div>
                        <div className="flex items-center p-3 bg-slate-800/60 rounded">
                          <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                          <span className="text-gray-300">Cyber threat intelligence correlation</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white mb-4">Continuous Monitoring:</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-slate-800/60 rounded">
                          <span className="text-gray-300">Security posture tracking</span>
                          <Badge className="bg-green-500/20 text-green-300">Real-time</Badge>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-slate-800/60 rounded">
                          <span className="text-gray-300">Breach notification monitoring</span>
                          <Badge className="bg-blue-500/20 text-blue-300">Automated</Badge>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-slate-800/60 rounded">
                          <span className="text-gray-300">Compliance status updates</span>
                          <Badge className="bg-purple-500/20 text-purple-300">Weekly</Badge>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-slate-800/60 rounded">
                          <span className="text-gray-300">Risk score recalculation</span>
                          <Badge className="bg-orange-500/20 text-orange-300">Daily</Badge>
                        </div>
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
                  <CardTitle className="text-xl text-blue-400">ICS/SCADA Environment Protection</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-slate-800/60 rounded">
                      <span className="text-gray-300">Protocol Support:</span>
                      <span className="text-blue-400 font-bold">200+ Industrial Protocols</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-slate-800/60 rounded">
                      <span className="text-gray-300">Detection Algorithms:</span>
                      <span className="text-blue-400 font-bold">AI-Powered Behavioral</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-slate-800/60 rounded">
                      <span className="text-gray-300">Air-Gap Deployment:</span>
                      <span className="text-green-400 font-bold">Supported</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-slate-800/60 rounded">
                      <span className="text-gray-300">Update Mechanism:</span>
                      <span className="text-green-400 font-bold">Secure Offline</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-700/60 border border-green-500/30">
                <CardHeader>
                  <CardTitle className="text-xl text-green-400">High Availability Architecture</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-slate-800/60 rounded">
                      <span className="text-gray-300">Uptime Guarantee:</span>
                      <span className="text-green-400 font-bold">99.999%</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-slate-800/60 rounded">
                      <span className="text-gray-300">Redundancy:</span>
                      <span className="text-green-400 font-bold">N+2 Architecture</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-slate-800/60 rounded">
                      <span className="text-gray-300">Failover Time:</span>
                      <span className="text-green-400 font-bold">&lt; 30 seconds</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-slate-800/60 rounded">
                      <span className="text-gray-300">Geographic Distribution:</span>
                      <span className="text-green-400 font-bold">Multi-Region</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Compliance Automation */}
        <section className="py-16 px-6 bg-slate-900">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold text-white text-center mb-12">
              Federal Compliance Automation
            </h2>
            <Card className="bg-slate-800/60 border border-purple-500/30">
              <CardHeader>
                <CardTitle className="text-xl text-purple-400">Automated Compliance Reporting</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="text-lg font-bold text-white">Supported Regulations:</h4>
                    <div className="space-y-3">
                      <div className="flex items-center p-3 bg-purple-500/10 rounded">
                        <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                        <span className="text-gray-300">NERC CIP Standards</span>
                      </div>
                      <div className="flex items-center p-3 bg-purple-500/10 rounded">
                        <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                        <span className="text-gray-300">TSA Security Directives</span>
                      </div>
                      <div className="flex items-center p-3 bg-purple-500/10 rounded">
                        <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                        <span className="text-gray-300">CISA Emergency Directives</span>
                      </div>
                      <div className="flex items-center p-3 bg-purple-500/10 rounded">
                        <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                        <span className="text-gray-300">Sector-specific requirements</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-lg font-bold text-white">Reporting Capabilities:</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-purple-500/10 rounded">
                        <span className="text-gray-300">Report Generation:</span>
                        <span className="text-purple-400 font-bold">Automated</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-purple-500/10 rounded">
                        <span className="text-gray-300">Submission Schedule:</span>
                        <span className="text-purple-400 font-bold">Configurable</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-purple-500/10 rounded">
                        <span className="text-gray-300">Evidence Collection:</span>
                        <span className="text-purple-400 font-bold">Continuous</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-purple-500/10 rounded">
                        <span className="text-gray-300">Audit Trail:</span>
                        <span className="text-purple-400 font-bold">Immutable</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Conclusion and Call to Action */}
        <section className="py-20 px-6 bg-gradient-to-br from-slate-900 via-red-900/20 to-slate-900">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-4xl font-bold text-white mb-8">
              Protect Critical Infrastructure with AI
            </h2>
            <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
              Deploy sector-specific AI security models with 95% threat prediction accuracy and 
              comprehensive compliance automation for critical infrastructure protection.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white">
                <Shield className="mr-2 w-5 h-5" />
                Request Infrastructure Assessment
              </Button>
              <Button size="lg" variant="outline" className="border-red-500 text-red-400 hover:bg-red-500/10">
                <Download className="mr-2 w-5 h-5" />
                Download Framework Guide
              </Button>
            </div>
          </div>
        </section>
      </div>
    </MarketingLayout>
  );
}