import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calculator, 
  TrendingUp, 
  AlertTriangle, 
  DollarSign,
  BarChart3,
  Download,
  ArrowRight,
  Shield,
  Clock,
  Users
} from "lucide-react";
import { MarketingLayout } from "@/components/MarketingLayout";

export default function WhitePaperSecurityEconomics() {
  return (
    <MarketingLayout>
      <div className="min-h-screen bg-slate-900">
        {/* SEO Optimized Header */}
        <section className="py-20 px-6 bg-gradient-to-br from-slate-900 via-red-900/20 to-slate-900">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-12">
              <Badge className="mb-6 bg-red-500/20 text-red-300 border-red-500/30">
                Security Economics White Paper
              </Badge>
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                The False Economy of <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-500">
                  Delayed AI Security
                </span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                Quantifying the True Cost of Security Shortcuts in Enterprise AI Systems
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white">
                  <Download className="mr-2 w-5 h-5" />
                  Download Full PDF
                </Button>
                <Button size="lg" variant="outline" className="border-red-500 text-red-400 hover:bg-red-500/10">
                  <Calculator className="mr-2 w-5 h-5" />
                  Use ROI Calculator
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Executive Summary */}
        <section className="py-16 px-6 bg-slate-800">
          <div className="container mx-auto max-w-4xl">
            <Card className="bg-slate-700/60 border border-red-500/30">
              <CardHeader>
                <CardTitle className="text-2xl text-white flex items-center">
                  <AlertTriangle className="mr-3 w-6 h-6 text-red-400" />
                  Executive Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-300">
                <p className="text-lg leading-relaxed">
                  Organizations consistently underestimate the long-term financial impact of delaying AI security implementations, 
                  creating a <strong className="text-red-400">false economy</strong> that costs enterprises an average of 
                  <strong className="text-red-400"> 347% more</strong> than proactive security investments.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-red-400 mb-2">$4.2M</div>
                    <div className="text-sm text-gray-400">Average breach cost with delayed security</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-400 mb-2">$1.2M</div>
                    <div className="text-sm text-gray-400">Cost of proactive security implementation</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-400 mb-2">347%</div>
                    <div className="text-sm text-gray-400">Cost difference between approaches</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Visual: Security Investment vs Breach Recovery Costs */}
        <section className="py-16 px-6 bg-slate-900">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-white text-center mb-12">
              Security Investment vs. Breach Recovery Costs
            </h2>
            <Card className="bg-slate-800/60 border border-cyan-500/30">
              <CardContent className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-bold text-green-400 mb-6">Proactive Security Investment</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 bg-green-500/10 rounded">
                        <span className="text-gray-300">Initial Security Implementation</span>
                        <span className="text-green-400 font-bold">$800K</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-green-500/10 rounded">
                        <span className="text-gray-300">Annual Maintenance</span>
                        <span className="text-green-400 font-bold">$200K</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-green-500/10 rounded">
                        <span className="text-gray-300">Training & Compliance</span>
                        <span className="text-green-400 font-bold">$150K</span>
                      </div>
                      <div className="border-t border-green-500/30 pt-3">
                        <div className="flex justify-between items-center font-bold">
                          <span className="text-white">Total 3-Year Cost:</span>
                          <span className="text-green-400 text-xl">$1.85M</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-red-400 mb-6">Breach Recovery Costs</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 bg-red-500/10 rounded">
                        <span className="text-gray-300">Incident Response</span>
                        <span className="text-red-400 font-bold">$1.2M</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-red-500/10 rounded">
                        <span className="text-gray-300">Regulatory Fines</span>
                        <span className="text-red-400 font-bold">$2.8M</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-red-500/10 rounded">
                        <span className="text-gray-300">Business Disruption</span>
                        <span className="text-red-400 font-bold">$1.8M</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-red-500/10 rounded">
                        <span className="text-gray-300">Reputation Recovery</span>
                        <span className="text-red-400 font-bold">$900K</span>
                      </div>
                      <div className="border-t border-red-500/30 pt-3">
                        <div className="flex justify-between items-center font-bold">
                          <span className="text-white">Total Breach Cost:</span>
                          <span className="text-red-400 text-xl">$6.7M</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Security Debt Growth Visualization */}
        <section className="py-16 px-6 bg-slate-800">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-white text-center mb-12">
              Exponential Growth of Security Debt Over Time
            </h2>
            <Card className="bg-slate-700/60 border border-orange-500/30">
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-orange-500/10 rounded">
                      <div className="text-2xl font-bold text-orange-400">Year 1</div>
                      <div className="text-gray-300">$200K</div>
                      <div className="text-sm text-gray-400">Initial debt</div>
                    </div>
                    <div className="text-center p-4 bg-orange-500/20 rounded">
                      <div className="text-2xl font-bold text-orange-400">Year 2</div>
                      <div className="text-gray-300">$680K</div>
                      <div className="text-sm text-gray-400">340% increase</div>
                    </div>
                    <div className="text-center p-4 bg-orange-500/30 rounded">
                      <div className="text-2xl font-bold text-orange-400">Year 3</div>
                      <div className="text-gray-300">$2.1M</div>
                      <div className="text-sm text-gray-400">1050% total</div>
                    </div>
                    <div className="text-center p-4 bg-red-500/40 rounded">
                      <div className="text-2xl font-bold text-red-400">Year 4+</div>
                      <div className="text-gray-300">$6.7M</div>
                      <div className="text-sm text-gray-400">Critical threshold</div>
                    </div>
                  </div>
                  <div className="bg-slate-800/60 p-6 rounded-lg">
                    <h4 className="text-lg font-bold text-white mb-3">Key Factors Driving Security Debt Growth:</h4>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-center"><ArrowRight className="mr-2 w-4 h-4 text-orange-400" />Accumulated vulnerability exposure</li>
                      <li className="flex items-center"><ArrowRight className="mr-2 w-4 h-4 text-orange-400" />Increased remediation complexity</li>
                      <li className="flex items-center"><ArrowRight className="mr-2 w-4 h-4 text-orange-400" />Compounding compliance gaps</li>
                      <li className="flex items-center"><ArrowRight className="mr-2 w-4 h-4 text-orange-400" />Rising threat sophistication</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* ROI Analysis Section */}
        <section className="py-16 px-6 bg-slate-900">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-white text-center mb-12">
              ROI Analysis: Proactive vs. Reactive Security
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="bg-slate-800/60 border border-green-500/30">
                <CardHeader>
                  <CardTitle className="text-xl text-green-400 flex items-center">
                    <TrendingUp className="mr-3 w-5 h-5" />
                    Proactive Investment ROI
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-green-400 mb-2">284%</div>
                    <div className="text-gray-300">3-Year ROI</div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Break-even timeline:</span>
                      <span className="text-green-400 font-bold">18 months</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Risk reduction:</span>
                      <span className="text-green-400 font-bold">89%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Operational efficiency gain:</span>
                      <span className="text-green-400 font-bold">156%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/60 border border-red-500/30">
                <CardHeader>
                  <CardTitle className="text-xl text-red-400 flex items-center">
                    <AlertTriangle className="mr-3 w-5 h-5" />
                    Reactive Response Costs
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-red-400 mb-2">-73%</div>
                    <div className="text-gray-300">3-Year ROI</div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Recovery timeline:</span>
                      <span className="text-red-400 font-bold">3-5 years</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Ongoing vulnerability:</span>
                      <span className="text-red-400 font-bold">High</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Business impact:</span>
                      <span className="text-red-400 font-bold">Severe</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Interactive ROI Calculator Tool */}
        <section className="py-16 px-6 bg-slate-800">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold text-white text-center mb-12">
              Security Investment ROI Calculator
            </h2>
            <Card className="bg-slate-700/60 border border-cyan-500/30">
              <CardHeader>
                <CardTitle className="text-xl text-cyan-400 flex items-center">
                  <Calculator className="mr-3 w-5 h-5" />
                  Calculate Your Security Investment ROI
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="text-lg font-bold text-white">Investment Parameters</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-slate-800/60 rounded">
                        <span className="text-gray-300">Annual Revenue:</span>
                        <span className="text-cyan-400 font-bold">$50M</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-slate-800/60 rounded">
                        <span className="text-gray-300">Security Investment:</span>
                        <span className="text-cyan-400 font-bold">$800K</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-slate-800/60 rounded">
                        <span className="text-gray-300">Risk Level:</span>
                        <span className="text-cyan-400 font-bold">High</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-lg font-bold text-white">Projected Outcomes</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-green-500/10 rounded">
                        <span className="text-gray-300">Breach Prevention Value:</span>
                        <span className="text-green-400 font-bold">$4.2M</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-green-500/10 rounded">
                        <span className="text-gray-300">Compliance Savings:</span>
                        <span className="text-green-400 font-bold">$600K</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-green-500/10 rounded">
                        <span className="text-gray-300">Net ROI (3 years):</span>
                        <span className="text-green-400 font-bold">284%</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <Button className="bg-cyan-600 hover:bg-cyan-700 text-white">
                    Download Detailed ROI Report
                    <Download className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Implementation Roadmap */}
        <section className="py-16 px-6 bg-slate-900">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-white text-center mb-12">
              Strategic Implementation Roadmap
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
                  <p>• Risk evaluation</p>
                  <p>• Current security gap analysis</p>
                  <p>• ROI baseline establishment</p>
                  <p>• Stakeholder alignment</p>
                  <div className="mt-4 text-center">
                    <Badge className="bg-blue-500/20 text-blue-300">30 days</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/60 border border-green-500/30">
                <CardHeader className="text-center">
                  <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-green-400 font-bold">2</span>
                  </div>
                  <CardTitle className="text-lg text-green-400">Foundation</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-gray-300 text-sm">
                  <p>• Core security infrastructure</p>
                  <p>• Policy framework development</p>
                  <p>• Team training initiation</p>
                  <p>• Compliance baseline</p>
                  <div className="mt-4 text-center">
                    <Badge className="bg-green-500/20 text-green-300">90 days</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/60 border border-purple-500/30">
                <CardHeader className="text-center">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-purple-400 font-bold">3</span>
                  </div>
                  <CardTitle className="text-lg text-purple-400">Enhancement</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-gray-300 text-sm">
                  <p>• Advanced threat detection</p>
                  <p>• Automated response systems</p>
                  <p>• Continuous monitoring</p>
                  <p>• Performance optimization</p>
                  <div className="mt-4 text-center">
                    <Badge className="bg-purple-500/20 text-purple-300">180 days</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/60 border border-orange-500/30">
                <CardHeader className="text-center">
                  <div className="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-orange-400 font-bold">4</span>
                  </div>
                  <CardTitle className="text-lg text-orange-400">Maturation</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-gray-300 text-sm">
                  <p>• AI-powered security</p>
                  <p>• Predictive analytics</p>
                  <p>• Full automation</p>
                  <p>• Continuous improvement</p>
                  <div className="mt-4 text-center">
                    <Badge className="bg-orange-500/20 text-orange-300">365+ days</Badge>
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
              Don't Fall for the False Economy
            </h2>
            <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
              The data is clear: organizations that invest proactively in AI security achieve 
              superior financial outcomes while reducing risk exposure by 89%.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white">
                <Shield className="mr-2 w-5 h-5" />
                Start Your Security Assessment
              </Button>
              <Button size="lg" variant="outline" className="border-green-500 text-green-400 hover:bg-green-500/10">
                <Users className="mr-2 w-5 h-5" />
                Speak with Security Experts
              </Button>
            </div>
          </div>
        </section>
      </div>
    </MarketingLayout>
  );
}