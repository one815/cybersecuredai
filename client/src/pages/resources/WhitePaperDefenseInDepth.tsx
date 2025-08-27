import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  Layers, 
  Lock, 
  Eye,
  Server,
  Network,
  Database,
  Brain,
  Download,
  ArrowRight,
  CheckCircle,
  AlertTriangle,
  Target
} from "lucide-react";
import { MarketingLayout } from "@/components/MarketingLayout";

export default function WhitePaperDefenseInDepth() {
  return (
    <MarketingLayout>
      <div className="min-h-screen bg-slate-900">
        {/* SEO Optimized Header */}
        <section className="py-20 px-6 bg-gradient-to-br from-slate-900 via-green-900/20 to-slate-900">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-12">
              <Badge className="mb-6 bg-green-500/20 text-green-300 border-green-500/30">
                Defense-in-Depth Strategy Guide
              </Badge>
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Beyond the <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-500">
                  Firewall
                </span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                Building Defense-in-Depth Strategies for AI Systems: Multi-Layered Protection Against Advanced Threats
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white">
                  <Download className="mr-2 w-5 h-5" />
                  Download Strategy Guide
                </Button>
                <Button size="lg" variant="outline" className="border-green-500 text-green-400 hover:bg-green-500/10">
                  <Target className="mr-2 w-5 h-5" />
                  Defense Assessment
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Executive Summary */}
        <section className="py-16 px-6 bg-slate-800">
          <div className="container mx-auto max-w-4xl">
            <Card className="bg-slate-700/60 border border-green-500/30">
              <CardHeader>
                <CardTitle className="text-2xl text-white flex items-center">
                  <Shield className="mr-3 w-6 h-6 text-green-400" />
                  Executive Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-300">
                <p className="text-lg leading-relaxed">
                  Traditional perimeter security is insufficient for AI systems facing sophisticated threats. Organizations implementing 
                  <strong className="text-green-400"> defense-in-depth strategies</strong> for AI achieve 
                  <strong className="text-green-400">91% better threat containment</strong> and 
                  <strong className="text-green-400">78% faster recovery times</strong> compared to single-layer defenses.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-400 mb-2">91%</div>
                    <div className="text-sm text-gray-400">Better threat containment</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-cyan-400 mb-2">78%</div>
                    <div className="text-sm text-gray-400">Faster recovery times</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-400 mb-2">6 Layers</div>
                    <div className="text-sm text-gray-400">Comprehensive protection</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Visual: Multiple Layers of AI Security Defense */}
        <section className="py-16 px-6 bg-slate-900">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-white text-center mb-12">
              Multiple Layers of AI Security Defense
            </h2>
            <Card className="bg-slate-800/60 border border-cyan-500/30">
              <CardContent className="p-8">
                <div className="space-y-6">
                  {/* Layer 6: Physical */}
                  <div className="border border-red-500/30 rounded-lg p-6 bg-red-500/5">
                    <div className="flex items-center mb-4">
                      <Server className="w-6 h-6 text-red-400 mr-3" />
                      <h3 className="text-xl font-bold text-red-400">Layer 6: Physical Security</h3>
                      <Badge className="ml-auto bg-red-500/20 text-red-300">Foundation Layer</Badge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-slate-800/60 p-4 rounded">
                        <h4 className="font-bold text-white mb-2">Hardware Security</h4>
                        <p className="text-gray-300 text-sm">AI accelerator protection, secure boot, TPM integration</p>
                      </div>
                      <div className="bg-slate-800/60 p-4 rounded">
                        <h4 className="font-bold text-white mb-2">Facility Controls</h4>
                        <p className="text-gray-300 text-sm">Data center access, environmental monitoring</p>
                      </div>
                      <div className="bg-slate-800/60 p-4 rounded">
                        <h4 className="font-bold text-white mb-2">Supply Chain</h4>
                        <p className="text-gray-300 text-sm">Hardware provenance, firmware verification</p>
                      </div>
                    </div>
                  </div>

                  {/* Layer 5: Network */}
                  <div className="border border-orange-500/30 rounded-lg p-6 bg-orange-500/5">
                    <div className="flex items-center mb-4">
                      <Network className="w-6 h-6 text-orange-400 mr-3" />
                      <h3 className="text-xl font-bold text-orange-400">Layer 5: Network Security</h3>
                      <Badge className="ml-auto bg-orange-500/20 text-orange-300">Communication Layer</Badge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-slate-800/60 p-4 rounded">
                        <h4 className="font-bold text-white mb-2">Traffic Analysis</h4>
                        <p className="text-gray-300 text-sm">AI model communication monitoring, anomaly detection</p>
                      </div>
                      <div className="bg-slate-800/60 p-4 rounded">
                        <h4 className="font-bold text-white mb-2">Encryption</h4>
                        <p className="text-gray-300 text-sm">End-to-end encryption, secure channels</p>
                      </div>
                      <div className="bg-slate-800/60 p-4 rounded">
                        <h4 className="font-bold text-white mb-2">Segmentation</h4>
                        <p className="text-gray-300 text-sm">AI workload isolation, micro-segmentation</p>
                      </div>
                    </div>
                  </div>

                  {/* Layer 4: Infrastructure */}
                  <div className="border border-yellow-500/30 rounded-lg p-6 bg-yellow-500/5">
                    <div className="flex items-center mb-4">
                      <Database className="w-6 h-6 text-yellow-400 mr-3" />
                      <h3 className="text-xl font-bold text-yellow-400">Layer 4: Infrastructure Security</h3>
                      <Badge className="ml-auto bg-yellow-500/20 text-yellow-300">Platform Layer</Badge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-slate-800/60 p-4 rounded">
                        <h4 className="font-bold text-white mb-2">Container Security</h4>
                        <p className="text-gray-300 text-sm">AI container scanning, runtime protection</p>
                      </div>
                      <div className="bg-slate-800/60 p-4 rounded">
                        <h4 className="font-bold text-white mb-2">Cloud Controls</h4>
                        <p className="text-gray-300 text-sm">Resource isolation, access controls</p>
                      </div>
                      <div className="bg-slate-800/60 p-4 rounded">
                        <h4 className="font-bold text-white mb-2">Deployment Security</h4>
                        <p className="text-gray-300 text-sm">Secure deployment pipelines, environment isolation</p>
                      </div>
                    </div>
                  </div>

                  {/* Layer 3: Application */}
                  <div className="border border-green-500/30 rounded-lg p-6 bg-green-500/5">
                    <div className="flex items-center mb-4">
                      <Lock className="w-6 h-6 text-green-400 mr-3" />
                      <h3 className="text-xl font-bold text-green-400">Layer 3: Application Security</h3>
                      <Badge className="ml-auto bg-green-500/20 text-green-300">Runtime Layer</Badge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-slate-800/60 p-4 rounded">
                        <h4 className="font-bold text-white mb-2">Runtime Monitoring</h4>
                        <p className="text-gray-300 text-sm">Execution monitoring, anomaly detection</p>
                      </div>
                      <div className="bg-slate-800/60 p-4 rounded">
                        <h4 className="font-bold text-white mb-2">Input Validation</h4>
                        <p className="text-gray-300 text-sm">Adversarial input detection, sanitization</p>
                      </div>
                      <div className="bg-slate-800/60 p-4 rounded">
                        <h4 className="font-bold text-white mb-2">Output Verification</h4>
                        <p className="text-gray-300 text-sm">Result validation, bias detection</p>
                      </div>
                    </div>
                  </div>

                  {/* Layer 2: Model */}
                  <div className="border border-blue-500/30 rounded-lg p-6 bg-blue-500/5">
                    <div className="flex items-center mb-4">
                      <Brain className="w-6 h-6 text-blue-400 mr-3" />
                      <h3 className="text-xl font-bold text-blue-400">Layer 2: Model Security</h3>
                      <Badge className="ml-auto bg-blue-500/20 text-blue-300">AI Core Layer</Badge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-slate-800/60 p-4 rounded">
                        <h4 className="font-bold text-white mb-2">Model Integrity</h4>
                        <p className="text-gray-300 text-sm">Tampering detection, model verification</p>
                      </div>
                      <div className="bg-slate-800/60 p-4 rounded">
                        <h4 className="font-bold text-white mb-2">Extraction Protection</h4>
                        <p className="text-gray-300 text-sm">Model theft prevention, API rate limiting</p>
                      </div>
                      <div className="bg-slate-800/60 p-4 rounded">
                        <h4 className="font-bold text-white mb-2">Adversarial Defense</h4>
                        <p className="text-gray-300 text-sm">Attack detection, robust training</p>
                      </div>
                    </div>
                  </div>

                  {/* Layer 1: Data */}
                  <div className="border border-purple-500/30 rounded-lg p-6 bg-purple-500/5">
                    <div className="flex items-center mb-4">
                      <Eye className="w-6 h-6 text-purple-400 mr-3" />
                      <h3 className="text-xl font-bold text-purple-400">Layer 1: Data Security</h3>
                      <Badge className="ml-auto bg-purple-500/20 text-purple-300">Core Asset Layer</Badge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-slate-800/60 p-4 rounded">
                        <h4 className="font-bold text-white mb-2">Training Data Protection</h4>
                        <p className="text-gray-300 text-sm">Poisoning prevention, data validation</p>
                      </div>
                      <div className="bg-slate-800/60 p-4 rounded">
                        <h4 className="font-bold text-white mb-2">Privacy Preservation</h4>
                        <p className="text-gray-300 text-sm">Differential privacy, federated learning</p>
                      </div>
                      <div className="bg-slate-800/60 p-4 rounded">
                        <h4 className="font-bold text-white mb-2">Data Lineage</h4>
                        <p className="text-gray-300 text-sm">Provenance tracking, audit trails</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Threat Vector Mapping */}
        <section className="py-16 px-6 bg-slate-800">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-white text-center mb-12">
              Threat Vector Heat Map Across AI Technology Stack
            </h2>
            <Card className="bg-slate-700/60 border border-red-500/30">
              <CardContent className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-bold text-red-400 mb-6">High-Risk Attack Vectors</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-red-500/20 rounded">
                        <div>
                          <div className="font-bold text-red-300">Model Extraction</div>
                          <div className="text-sm text-gray-400">API Layer, Model Layer</div>
                        </div>
                        <Badge className="bg-red-600 text-white">Critical</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-red-500/20 rounded">
                        <div>
                          <div className="font-bold text-red-300">Data Poisoning</div>
                          <div className="text-sm text-gray-400">Data Layer, Training Pipeline</div>
                        </div>
                        <Badge className="bg-red-600 text-white">Critical</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-orange-500/20 rounded">
                        <div>
                          <div className="font-bold text-orange-300">Adversarial Examples</div>
                          <div className="text-sm text-gray-400">Input Layer, Model Layer</div>
                        </div>
                        <Badge className="bg-orange-600 text-white">High</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-orange-500/20 rounded">
                        <div>
                          <div className="font-bold text-orange-300">Supply Chain Attacks</div>
                          <div className="text-sm text-gray-400">Infrastructure, Dependencies</div>
                        </div>
                        <Badge className="bg-orange-600 text-white">High</Badge>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-green-400 mb-6">Defense Effectiveness by Layer</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-green-500/10 rounded">
                        <span className="text-gray-300">Data Layer Protection:</span>
                        <div className="flex items-center">
                          <div className="w-20 h-2 bg-green-400 rounded mr-2"></div>
                          <span className="text-green-400 font-bold">95%</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-green-500/10 rounded">
                        <span className="text-gray-300">Model Layer Security:</span>
                        <div className="flex items-center">
                          <div className="w-16 h-2 bg-blue-400 rounded mr-2"></div>
                          <span className="text-blue-400 font-bold">87%</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-green-500/10 rounded">
                        <span className="text-gray-300">Application Controls:</span>
                        <div className="flex items-center">
                          <div className="w-18 h-2 bg-purple-400 rounded mr-2"></div>
                          <span className="text-purple-400 font-bold">92%</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-green-500/10 rounded">
                        <span className="text-gray-300">Network Security:</span>
                        <div className="flex items-center">
                          <div className="w-14 h-2 bg-yellow-400 rounded mr-2"></div>
                          <span className="text-yellow-400 font-bold">78%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Implementation Guide by Security Layer */}
        <section className="py-16 px-6 bg-slate-900">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-white text-center mb-12">
              Layer-by-Layer Implementation Guide
            </h2>
            <div className="space-y-8">
              {/* Data Layer Implementation */}
              <Card className="bg-slate-800/60 border border-purple-500/30">
                <CardHeader>
                  <CardTitle className="text-xl text-purple-400 flex items-center">
                    <Eye className="mr-3 w-5 h-5" />
                    Data Layer: Securing Training Data, Inference Inputs, and Outputs
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-3">
                      <h4 className="font-bold text-white">Training Data Security</h4>
                      <div className="space-y-2 text-gray-300 text-sm">
                        <div className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                          <span>Data validation and sanitization</span>
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                          <span>Poisoning detection algorithms</span>
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                          <span>Provenance tracking systems</span>
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                          <span>Differential privacy implementation</span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-bold text-white">Inference Protection</h4>
                      <div className="space-y-2 text-gray-300 text-sm">
                        <div className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                          <span>Input validation frameworks</span>
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                          <span>Adversarial example detection</span>
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                          <span>Output sanitization</span>
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                          <span>Real-time monitoring</span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-bold text-white">Privacy Controls</h4>
                      <div className="space-y-2 text-gray-300 text-sm">
                        <div className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                          <span>Federated learning implementation</span>
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                          <span>Homomorphic encryption</span>
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                          <span>Secure multi-party computation</span>
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                          <span>Data minimization strategies</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Model Layer Implementation */}
              <Card className="bg-slate-800/60 border border-blue-500/30">
                <CardHeader>
                  <CardTitle className="text-xl text-blue-400 flex items-center">
                    <Brain className="mr-3 w-5 h-5" />
                    Model Layer: Protection Against Tampering, Extraction, and Inversion
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-3">
                      <h4 className="font-bold text-white">Model Integrity</h4>
                      <div className="space-y-2 text-gray-300 text-sm">
                        <div className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                          <span>Cryptographic model signing</span>
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                          <span>Runtime integrity verification</span>
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                          <span>Tampering detection systems</span>
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                          <span>Version control and audit trails</span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-bold text-white">Extraction Prevention</h4>
                      <div className="space-y-2 text-gray-300 text-sm">
                        <div className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                          <span>API rate limiting and throttling</span>
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                          <span>Query pattern analysis</span>
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                          <span>Model watermarking</span>
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                          <span>Behavioral monitoring</span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-bold text-white">Adversarial Defense</h4>
                      <div className="space-y-2 text-gray-300 text-sm">
                        <div className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                          <span>Adversarial training techniques</span>
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                          <span>Input preprocessing defenses</span>
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                          <span>Ensemble defense methods</span>
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                          <span>Certified robustness verification</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Before/After Security Posture Comparison */}
        <section className="py-16 px-6 bg-slate-800">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-white text-center mb-12">
              Security Posture: Before vs. After Defense-in-Depth Implementation
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="bg-slate-700/60 border border-red-500/30">
                <CardHeader>
                  <CardTitle className="text-xl text-red-400 flex items-center">
                    <AlertTriangle className="mr-3 w-5 h-5" />
                    Before: Single-Layer Defense
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-red-500/10 rounded">
                      <span className="text-gray-300">Threat Detection Rate:</span>
                      <span className="text-red-400 font-bold">34%</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-red-500/10 rounded">
                      <span className="text-gray-300">Containment Time:</span>
                      <span className="text-red-400 font-bold">4.2 hours</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-red-500/10 rounded">
                      <span className="text-gray-300">False Positive Rate:</span>
                      <span className="text-red-400 font-bold">23%</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-red-500/10 rounded">
                      <span className="text-gray-300">Recovery Time:</span>
                      <span className="text-red-400 font-bold">18 hours</span>
                    </div>
                  </div>
                  <div className="mt-6">
                    <h4 className="font-bold text-white mb-3">Key Vulnerabilities:</h4>
                    <div className="space-y-2 text-gray-300 text-sm">
                      <div className="flex items-center">
                        <AlertTriangle className="w-4 h-4 text-red-400 mr-2" />
                        <span>Single point of failure</span>
                      </div>
                      <div className="flex items-center">
                        <AlertTriangle className="w-4 h-4 text-red-400 mr-2" />
                        <span>Limited threat visibility</span>
                      </div>
                      <div className="flex items-center">
                        <AlertTriangle className="w-4 h-4 text-red-400 mr-2" />
                        <span>Slow incident response</span>
                      </div>
                      <div className="flex items-center">
                        <AlertTriangle className="w-4 h-4 text-red-400 mr-2" />
                        <span>No redundant controls</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-700/60 border border-green-500/30">
                <CardHeader>
                  <CardTitle className="text-xl text-green-400 flex items-center">
                    <Shield className="mr-3 w-5 h-5" />
                    After: Defense-in-Depth
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-green-500/10 rounded">
                      <span className="text-gray-300">Threat Detection Rate:</span>
                      <span className="text-green-400 font-bold">91%</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-green-500/10 rounded">
                      <span className="text-gray-300">Containment Time:</span>
                      <span className="text-green-400 font-bold">12 minutes</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-green-500/10 rounded">
                      <span className="text-gray-300">False Positive Rate:</span>
                      <span className="text-green-400 font-bold">5%</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-green-500/10 rounded">
                      <span className="text-gray-300">Recovery Time:</span>
                      <span className="text-green-400 font-bold">4 hours</span>
                    </div>
                  </div>
                  <div className="mt-6">
                    <h4 className="font-bold text-white mb-3">Key Advantages:</h4>
                    <div className="space-y-2 text-gray-300 text-sm">
                      <div className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                        <span>Multiple security layers</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                        <span>Comprehensive visibility</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                        <span>Automated response</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                        <span>Overlapping controls</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Interactive Defense Assessment Tool */}
        <section className="py-16 px-6 bg-slate-900">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold text-white text-center mb-12">
              Defense-in-Depth Assessment Tool
            </h2>
            <Card className="bg-slate-800/60 border border-green-500/30">
              <CardHeader>
                <CardTitle className="text-xl text-green-400 flex items-center">
                  <Target className="mr-3 w-5 h-5" />
                  Evaluate Your AI System Defense Layers
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="text-lg font-bold text-white">Current Defense Coverage</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-slate-700/60 rounded">
                        <span className="text-gray-300">Data Layer Protection:</span>
                        <div className="flex items-center">
                          <div className="w-16 h-2 bg-yellow-400 rounded mr-2"></div>
                          <span className="text-yellow-400 font-bold">67%</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-slate-700/60 rounded">
                        <span className="text-gray-300">Model Security:</span>
                        <div className="flex items-center">
                          <div className="w-12 h-2 bg-red-400 rounded mr-2"></div>
                          <span className="text-red-400 font-bold">45%</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-slate-700/60 rounded">
                        <span className="text-gray-300">Application Controls:</span>
                        <div className="flex items-center">
                          <div className="w-18 h-2 bg-green-400 rounded mr-2"></div>
                          <span className="text-green-400 font-bold">78%</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-slate-700/60 rounded">
                        <span className="text-gray-300">Infrastructure Security:</span>
                        <div className="flex items-center">
                          <div className="w-14 h-2 bg-orange-400 rounded mr-2"></div>
                          <span className="text-orange-400 font-bold">58%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-lg font-bold text-white">Priority Recommendations</h4>
                    <div className="space-y-3">
                      <div className="p-3 bg-red-500/10 rounded">
                        <div className="font-bold text-red-400 mb-1">Critical: Model Security</div>
                        <div className="text-gray-300 text-sm">Implement model integrity verification and extraction protection</div>
                      </div>
                      <div className="p-3 bg-orange-500/10 rounded">
                        <div className="font-bold text-orange-400 mb-1">High: Infrastructure</div>
                        <div className="text-gray-300 text-sm">Deploy container security and runtime monitoring</div>
                      </div>
                      <div className="p-3 bg-yellow-500/10 rounded">
                        <div className="font-bold text-yellow-400 mb-1">Medium: Data Controls</div>
                        <div className="text-gray-300 text-sm">Enhance data validation and privacy protections</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <Button className="bg-green-600 hover:bg-green-700 text-white">
                    Generate Full Defense Report
                    <Download className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Conclusion and Call to Action */}
        <section className="py-20 px-6 bg-gradient-to-br from-slate-900 via-green-900/20 to-slate-900">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-4xl font-bold text-white mb-8">
              Build Unbreachable AI Defenses
            </h2>
            <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
              Organizations implementing defense-in-depth strategies achieve 91% better threat containment 
              and 78% faster recovery times. Don't rely on a single layer when comprehensive protection is within reach.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white">
                <Layers className="mr-2 w-5 h-5" />
                Start Defense Assessment
              </Button>
              <Button size="lg" variant="outline" className="border-green-500 text-green-400 hover:bg-green-500/10">
                <Shield className="mr-2 w-5 h-5" />
                Consult Defense Experts
              </Button>
            </div>
          </div>
        </section>
      </div>
    </MarketingLayout>
  );
}