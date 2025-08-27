import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  GraduationCap, 
  Shield, 
  Users, 
  Database,
  Lock,
  CheckCircle,
  Download,
  ArrowRight,
  Target,
  FileText,
  Globe,
  Brain
} from "lucide-react";
import { MarketingLayout } from "@/components/MarketingLayout";

export default function DataSheetUniversityResearch() {
  return (
    <MarketingLayout>
      <div className="min-h-screen bg-slate-900">
        {/* SEO Optimized Header */}
        <section className="py-20 px-6 bg-gradient-to-br from-slate-900 via-green-900/20 to-slate-900">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-12">
              <Badge className="mb-6 bg-green-500/20 text-green-300 border-green-500/30">
                University Research Data Protection
              </Badge>
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                University Research <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-500">
                  Data Protection
                </span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                Technical Architecture and Security Features for Higher Education Research Environments
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white">
                  <Download className="mr-2 w-5 h-5" />
                  Download System Guide
                </Button>
                <Button size="lg" variant="outline" className="border-green-500 text-green-400 hover:bg-green-500/10">
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
            <Card className="bg-slate-700/60 border border-green-500/30">
              <CardHeader>
                <CardTitle className="text-2xl text-white flex items-center">
                  <GraduationCap className="mr-3 w-6 h-6 text-green-400" />
                  System Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-300">
                <p className="text-lg leading-relaxed">
                  CyberSecured AI's University Research Data Protection System provides comprehensive technical architecture 
                  and security features designed specifically for higher education research environments. Our solution 
                  <strong className="text-green-400"> safeguards sensitive research data</strong> while maintaining the 
                  <strong className="text-green-400">collaborative nature</strong> of academic work.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-400 mb-2">847</div>
                    <div className="text-sm text-gray-400">Universities protected</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-cyan-400 mb-2">15.6PB</div>
                    <div className="text-sm text-gray-400">Research data secured</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-400 mb-2">99.8%</div>
                    <div className="text-sm text-gray-400">Compliance automation</div>
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
              Research Data Protection Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="bg-slate-800/60 border border-blue-500/30">
                <CardHeader>
                  <CardTitle className="text-lg text-blue-400 flex items-center">
                    <Brain className="mr-3 w-5 h-5" />
                    AI-Powered Classification
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-gray-300 text-sm">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    <span>Automatic sensitivity detection</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    <span>Research data categorization</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    <span>Compliance requirement mapping</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    <span>Dynamic policy application</span>
                  </div>
                  <div className="mt-4 text-center">
                    <Badge className="bg-blue-500/20 text-blue-300">97.3% accuracy</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/60 border border-green-500/30">
                <CardHeader>
                  <CardTitle className="text-lg text-green-400 flex items-center">
                    <Users className="mr-3 w-5 h-5" />
                    Collaboration Controls
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-gray-300 text-sm">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    <span>Fine-grained access controls</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    <span>Research workflow integration</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    <span>External partner management</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    <span>Time-limited access grants</span>
                  </div>
                  <div className="mt-4 text-center">
                    <Badge className="bg-green-500/20 text-green-300">Role-based security</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/60 border border-purple-500/30">
                <CardHeader>
                  <CardTitle className="text-lg text-purple-400 flex items-center">
                    <Lock className="mr-3 w-5 h-5" />
                    End-to-End Encryption
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-gray-300 text-sm">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    <span>Data at rest encryption</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    <span>Data in transit protection</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    <span>Key management automation</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    <span>Quantum-resistant algorithms</span>
                  </div>
                  <div className="mt-4 text-center">
                    <Badge className="bg-purple-500/20 text-purple-300">AES-256 standard</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/60 border border-orange-500/30">
                <CardHeader>
                  <CardTitle className="text-lg text-orange-400 flex items-center">
                    <Globe className="mr-3 w-5 h-5" />
                    Collaboration Portals
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-gray-300 text-sm">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    <span>Secure research portals</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    <span>External partner integration</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    <span>Project-based workspaces</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    <span>Version control systems</span>
                  </div>
                  <div className="mt-4 text-center">
                    <Badge className="bg-orange-500/20 text-orange-300">Multi-institution</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/60 border border-cyan-500/30">
                <CardHeader>
                  <CardTitle className="text-lg text-cyan-400 flex items-center">
                    <FileText className="mr-3 w-5 h-5" />
                    Compliance Automation
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-gray-300 text-sm">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    <span>FERPA compliance monitoring</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    <span>HIPAA research protections</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    <span>Grant-specific requirements</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    <span>Automated audit reporting</span>
                  </div>
                  <div className="mt-4 text-center">
                    <Badge className="bg-cyan-500/20 text-cyan-300">Multi-regulation</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/60 border border-red-500/30">
                <CardHeader>
                  <CardTitle className="text-lg text-red-400 flex items-center">
                    <Database className="mr-3 w-5 h-5" />
                    Research Tool Integration
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-gray-300 text-sm">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    <span>SPSS, R, Python support</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    <span>HPC environment integration</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    <span>Jupyter notebook protection</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                    <span>Database platform support</span>
                  </div>
                  <div className="mt-4 text-center">
                    <Badge className="bg-red-500/20 text-red-300">50+ platforms</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Research Data Lifecycle Security */}
        <section className="py-16 px-6 bg-slate-800">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-white text-center mb-12">
              Research Data Lifecycle Security Visualization
            </h2>
            <Card className="bg-slate-700/60 border border-green-500/30">
              <CardContent className="p-8">
                <div className="space-y-8">
                  {/* Lifecycle Stages */}
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-blue-400 font-bold">1</span>
                      </div>
                      <h4 className="text-sm font-bold text-blue-400 mb-2">Data Collection</h4>
                      <p className="text-xs text-gray-300">Automated classification and initial protection</p>
                      <div className="mt-2">
                        <Badge className="bg-blue-500/20 text-blue-300 text-xs">AI Classification</Badge>
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-green-400 font-bold">2</span>
                      </div>
                      <h4 className="text-sm font-bold text-green-400 mb-2">Data Processing</h4>
                      <p className="text-xs text-gray-300">Secure analysis environments with tool integration</p>
                      <div className="mt-2">
                        <Badge className="bg-green-500/20 text-green-300 text-xs">Protected Compute</Badge>
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-purple-400 font-bold">3</span>
                      </div>
                      <h4 className="text-sm font-bold text-purple-400 mb-2">Data Sharing</h4>
                      <p className="text-xs text-gray-300">Controlled collaboration with external partners</p>
                      <div className="mt-2">
                        <Badge className="bg-purple-500/20 text-purple-300 text-xs">Access Controls</Badge>
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-orange-400 font-bold">4</span>
                      </div>
                      <h4 className="text-sm font-bold text-orange-400 mb-2">Data Storage</h4>
                      <p className="text-xs text-gray-300">Long-term retention with compliance monitoring</p>
                      <div className="mt-2">
                        <Badge className="bg-orange-500/20 text-orange-300 text-xs">Encrypted Storage</Badge>
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-red-400 font-bold">5</span>
                      </div>
                      <h4 className="text-sm font-bold text-red-400 mb-2">Data Disposal</h4>
                      <p className="text-xs text-gray-300">Secure deletion and compliance verification</p>
                      <div className="mt-2">
                        <Badge className="bg-red-500/20 text-red-300 text-xs">Certified Deletion</Badge>
                      </div>
                    </div>
                  </div>

                  {/* Security Controls by Stage */}
                  <div className="bg-slate-800/60 p-6 rounded-lg">
                    <h4 className="text-lg font-bold text-white mb-4">Security Controls Applied at Each Stage:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <div className="flex items-center p-3 bg-slate-700/60 rounded">
                          <Shield className="w-5 h-5 text-green-400 mr-3" />
                          <span className="text-gray-300">Continuous monitoring and threat detection</span>
                        </div>
                        <div className="flex items-center p-3 bg-slate-700/60 rounded">
                          <Lock className="w-5 h-5 text-blue-400 mr-3" />
                          <span className="text-gray-300">End-to-end encryption throughout lifecycle</span>
                        </div>
                        <div className="flex items-center p-3 bg-slate-700/60 rounded">
                          <Users className="w-5 h-5 text-purple-400 mr-3" />
                          <span className="text-gray-300">Role-based access controls and permissions</span>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center p-3 bg-slate-700/60 rounded">
                          <FileText className="w-5 h-5 text-orange-400 mr-3" />
                          <span className="text-gray-300">Automated compliance reporting and auditing</span>
                        </div>
                        <div className="flex items-center p-3 bg-slate-700/60 rounded">
                          <Database className="w-5 h-5 text-cyan-400 mr-3" />
                          <span className="text-gray-300">Data integrity verification and backups</span>
                        </div>
                        <div className="flex items-center p-3 bg-slate-700/60 rounded">
                          <Brain className="w-5 h-5 text-red-400 mr-3" />
                          <span className="text-gray-300">AI-powered anomaly detection and response</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* University Research Collaboration Dashboard */}
        <section className="py-16 px-6 bg-slate-900">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-white text-center mb-12">
              University Research Collaboration Dashboard
            </h2>
            <Card className="bg-slate-800/60 border border-blue-500/30">
              <CardContent className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <h3 className="text-xl font-bold text-blue-400 mb-6">Active Research Projects Protection</h3>
                    <div className="space-y-4">
                      <div className="bg-slate-700/60 p-4 rounded">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-bold text-white">Research Projects by Classification</h4>
                          <Badge className="bg-green-500/20 text-green-300">2,847 Active</Badge>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center p-2 bg-green-500/10 rounded">
                            <span className="text-gray-300">Public Research</span>
                            <span className="text-green-400 font-bold">1,856 projects</span>
                          </div>
                          <div className="flex justify-between items-center p-2 bg-yellow-500/10 rounded">
                            <span className="text-gray-300">Sensitive Research</span>
                            <span className="text-yellow-400 font-bold">743 projects</span>
                          </div>
                          <div className="flex justify-between items-center p-2 bg-red-500/10 rounded">
                            <span className="text-gray-300">Restricted Research</span>
                            <span className="text-red-400 font-bold">248 projects</span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-slate-700/60 p-4 rounded">
                        <h4 className="font-bold text-white mb-3">Data Volume and Protection Status</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-300">Total Research Data:</span>
                            <span className="text-blue-400 font-bold">15.6 PB</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-300">Encrypted Data:</span>
                            <span className="text-green-400 font-bold">15.6 PB (100%)</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-300">Compliance Violations:</span>
                            <span className="text-green-400 font-bold">0 Active</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-green-400 mb-6">Secure Laboratory Access</h3>
                    <div className="space-y-4">
                      <div className="bg-green-500/10 p-4 rounded border border-green-500/30">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <div className="font-bold text-green-400">Active Researchers</div>
                            <div className="text-sm text-gray-400">Currently accessing systems</div>
                          </div>
                          <Users className="w-8 h-8 text-green-400" />
                        </div>
                        <div className="text-2xl font-bold text-white">3,847</div>
                      </div>
                      <div className="bg-blue-500/10 p-4 rounded border border-blue-500/30">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <div className="font-bold text-blue-400">External Partners</div>
                            <div className="text-sm text-gray-400">Authorized collaborators</div>
                          </div>
                          <Globe className="w-8 h-8 text-blue-400" />
                        </div>
                        <div className="text-2xl font-bold text-white">567</div>
                      </div>
                      <div className="bg-purple-500/10 p-4 rounded border border-purple-500/30">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <div className="font-bold text-purple-400">Secure Sessions</div>
                            <div className="text-sm text-gray-400">Protected data access</div>
                          </div>
                          <Lock className="w-8 h-8 text-purple-400" />
                        </div>
                        <div className="text-2xl font-bold text-white">12,456</div>
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
                  <CardTitle className="text-xl text-blue-400">Platform Integration</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-slate-800/60 rounded">
                      <span className="text-gray-300">Research Tools:</span>
                      <span className="text-blue-400 font-bold">SPSS, R, Python, MATLAB</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-slate-800/60 rounded">
                      <span className="text-gray-300">HPC Environments:</span>
                      <span className="text-blue-400 font-bold">Slurm, PBS, LSF</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-slate-800/60 rounded">
                      <span className="text-gray-300">Data Scale Support:</span>
                      <span className="text-green-400 font-bold">Petabyte-level</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-slate-800/60 rounded">
                      <span className="text-gray-300">Database Systems:</span>
                      <span className="text-blue-400 font-bold">PostgreSQL, MongoDB, Neo4j</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-700/60 border border-green-500/30">
                <CardHeader>
                  <CardTitle className="text-xl text-green-400">Compliance & Reporting</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-slate-800/60 rounded">
                      <span className="text-gray-300">FERPA Compliance:</span>
                      <span className="text-green-400 font-bold">Automated</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-slate-800/60 rounded">
                      <span className="text-gray-300">HIPAA Support:</span>
                      <span className="text-green-400 font-bold">Research-specific</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-slate-800/60 rounded">
                      <span className="text-gray-300">Grant Compliance:</span>
                      <span className="text-green-400 font-bold">NIH, NSF, DOE</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-slate-800/60 rounded">
                      <span className="text-gray-300">Audit Reporting:</span>
                      <span className="text-green-400 font-bold">Real-time</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Conclusion and Call to Action */}
        <section className="py-20 px-6 bg-gradient-to-br from-slate-900 via-green-900/20 to-slate-900">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-4xl font-bold text-white mb-8">
              Secure Research Data with Confidence
            </h2>
            <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
              Deploy comprehensive research data protection with AI-powered classification and 
              99.8% compliance automation for higher education research environments.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white">
                <GraduationCap className="mr-2 w-5 h-5" />
                Request University Demo
              </Button>
              <Button size="lg" variant="outline" className="border-green-500 text-green-400 hover:bg-green-500/10">
                <Download className="mr-2 w-5 h-5" />
                Download Architecture Guide
              </Button>
            </div>
          </div>
        </section>
      </div>
    </MarketingLayout>
  );
}