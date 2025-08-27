import { MarketingLayout } from "@/components/MarketingLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowLeft,
  Building,
  Shield,
  TrendingDown,
  Clock,
  CheckCircle,
  Star,
  Users,
  DollarSign,
  AlertTriangle,
  Target,
  Calendar,
  BarChart3
} from "lucide-react";
import { Link } from "wouter";
import federalEducationImg from "@assets/generated_images/Federal_Education_Security_Success_147eb718.png";

export default function FederalEducationSecurity() {
  return (
    <MarketingLayout>
      <div className="min-h-screen ai-dashboard-bg text-white">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-midnight-900 via-midnight-800 to-midnight-900 py-16">
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
          <div className="container mx-auto px-6 relative">
            <Link href="/client-stories">
              <Button variant="outline" className="mb-6 border-spring-400 text-spring-400 hover:bg-spring-400 hover:text-black">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Client Stories
              </Button>
            </Link>
            
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-4 mb-6">
                <Badge className="bg-spring-500 text-midnight-900 font-semibold">
                  <Star className="w-3 h-3 mr-1" />
                  Featured Success Story
                </Badge>
                <Badge variant="outline" className="border-spring-400 text-spring-400">
                  <Building className="w-3 h-3 mr-1" />
                  Federal Government
                </Badge>
                <Badge variant="outline" className="border-gray-400 text-gray-400">
                  8 min read
                </Badge>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-spring-400 to-cyber-blue-400 bg-clip-text text-transparent">
                Federal Agency Reduces Security Incidents by 89%
              </h1>
              
              <p className="text-xl text-gray-300 mb-6">
                How the U.S. Department of Education transformed their cybersecurity posture using CyberSecure AI's comprehensive platform, achieving unprecedented threat detection and response capabilities.
              </p>
              
              <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Implementation: January 2024 - March 2024
                </span>
                <span className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  12,500+ Users Protected
                </span>
                <span className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  FedRAMP High Authorized
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Image */}
        <div className="py-8 bg-midnight-950/50">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <img 
                src={federalEducationImg} 
                alt="Federal Education Security Success"
                className="w-full h-64 md:h-96 object-cover rounded-lg border border-midnight-600"
              />
            </div>
          </div>
        </div>

        {/* Key Results */}
        <div className="py-16 bg-midnight-900/30">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">Key Results Achieved</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="bg-midnight-800/50 border-midnight-700">
                  <CardHeader className="text-center">
                    <div className="w-12 h-12 bg-spring-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <TrendingDown className="w-6 h-6 text-spring-400" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-spring-400">89%</CardTitle>
                    <p className="text-gray-400">Reduction in Security Incidents</p>
                  </CardHeader>
                </Card>
                
                <Card className="bg-midnight-800/50 border-midnight-700">
                  <CardHeader className="text-center">
                    <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <DollarSign className="w-6 h-6 text-green-400" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-green-400">$2.3M</CardTitle>
                    <p className="text-gray-400">Annual Cost Savings</p>
                  </CardHeader>
                </Card>
                
                <Card className="bg-midnight-800/50 border-midnight-700">
                  <CardHeader className="text-center">
                    <div className="w-12 h-12 bg-cyber-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Clock className="w-6 h-6 text-cyber-blue-400" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-cyber-blue-400">50%</CardTitle>
                    <p className="text-gray-400">Faster Incident Response</p>
                  </CardHeader>
                </Card>
              </div>
            </div>
          </div>
        </div>

        {/* Challenge Section */}
        <div className="py-16">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <h2 className="text-3xl font-bold mb-6 text-spring-400">The Challenge</h2>
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    The U.S. Department of Education faced mounting cybersecurity challenges with their legacy systems. With over 12,500 employees accessing sensitive student data and educational records, the agency was experiencing an average of 47 security incidents per month.
                  </p>
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    Legacy security tools were generating excessive false positives, overwhelming the IT security team. Mean time to detection (MTTD) averaged 18 hours, while mean time to response (MTTR) exceeded 72 hours for critical incidents.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                      <span className="text-gray-300">47 security incidents per month on average</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                      <span className="text-gray-300">18-hour average detection time</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                      <span className="text-gray-300">72+ hour incident response times</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                      <span className="text-gray-300">85% false positive rate causing alert fatigue</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h2 className="text-3xl font-bold mb-6 text-spring-400">Implementation Timeline</h2>
                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-3 h-3 bg-spring-400 rounded-full mt-2"></div>
                      <div>
                        <h4 className="font-semibold text-white mb-1">Week 1-2: Assessment & Planning</h4>
                        <p className="text-gray-400 text-sm">Comprehensive security audit and implementation planning</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-3 h-3 bg-spring-400 rounded-full mt-2"></div>
                      <div>
                        <h4 className="font-semibold text-white mb-1">Week 3-6: Core Platform Deployment</h4>
                        <p className="text-gray-400 text-sm">AI threat detection engine and monitoring systems installation</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-3 h-3 bg-spring-400 rounded-full mt-2"></div>
                      <div>
                        <h4 className="font-semibold text-white mb-1">Week 7-10: Staff Training & Integration</h4>
                        <p className="text-gray-400 text-sm">Team training and legacy system integration</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-3 h-3 bg-green-400 rounded-full mt-2"></div>
                      <div>
                        <h4 className="font-semibold text-white mb-1">Week 11-12: Full Production</h4>
                        <p className="text-gray-400 text-sm">Complete deployment and optimization</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Solution Section */}
        <div className="py-16 bg-midnight-950/50">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">CyberSecure AI Solution</h2>
              
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <Card className="bg-midnight-800/50 border-midnight-700">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="w-5 h-5 text-spring-400" />
                      AI-Powered Threat Detection
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 mb-4">
                      Deployed advanced machine learning algorithms capable of detecting sophisticated threats with 99.7% accuracy while reducing false positives by 92%.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-spring-400" />
                        <span className="text-gray-300">Real-time behavioral analytics</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-spring-400" />
                        <span className="text-gray-300">Zero-day threat protection</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-spring-400" />
                        <span className="text-gray-300">Automated incident response</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="bg-midnight-800/50 border-midnight-700">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="w-5 h-5 text-cyber-blue-400" />
                      Compliance Dashboard
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 mb-4">
                      Comprehensive compliance monitoring ensuring continuous adherence to FedRAMP High, FISMA, and other federal security requirements.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-cyber-blue-400" />
                        <span className="text-gray-300">Automated compliance reporting</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-cyber-blue-400" />
                        <span className="text-gray-300">Risk assessment automation</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-cyber-blue-400" />
                        <span className="text-gray-300">Audit trail management</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>

        {/* Metrics Progress */}
        <div className="py-16">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">Performance Improvements</h2>
              
              <div className="space-y-8">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-white font-medium">Security Incident Reduction</span>
                    <span className="text-spring-400 font-bold">89%</span>
                  </div>
                  <Progress value={89} className="h-3" />
                  <p className="text-xs text-gray-400 mt-1">From 47 incidents/month to 5 incidents/month</p>
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-white font-medium">Detection Time Improvement</span>
                    <span className="text-spring-400 font-bold">94%</span>
                  </div>
                  <Progress value={94} className="h-3" />
                  <p className="text-xs text-gray-400 mt-1">From 18 hours to 1.2 hours average detection</p>
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-white font-medium">Response Time Improvement</span>
                    <span className="text-spring-400 font-bold">83%</span>
                  </div>
                  <Progress value={83} className="h-3" />
                  <p className="text-xs text-gray-400 mt-1">From 72 hours to 12 hours average response</p>
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-white font-medium">False Positive Reduction</span>
                    <span className="text-spring-400 font-bold">92%</span>
                  </div>
                  <Progress value={92} className="h-3" />
                  <p className="text-xs text-gray-400 mt-1">From 85% false positive rate to 7%</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ROI Analysis */}
        <div className="py-16 bg-midnight-950/50">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">Return on Investment</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <Card className="bg-midnight-800/50 border-midnight-700">
                  <CardHeader>
                    <CardTitle className="text-green-400">Cost Savings Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-gray-300">Reduced incident response costs</span>
                        <span className="text-green-400 font-semibold">$1,200,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Avoided data breach penalties</span>
                        <span className="text-green-400 font-semibold">$800,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Staff productivity gains</span>
                        <span className="text-green-400 font-semibold">$300,000</span>
                      </div>
                      <div className="border-t border-midnight-600 pt-4">
                        <div className="flex justify-between text-lg font-bold">
                          <span className="text-white">Total Annual Savings</span>
                          <span className="text-green-400">$2,300,000</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-midnight-800/50 border-midnight-700">
                  <CardHeader>
                    <CardTitle className="text-spring-400">Implementation Investment</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-gray-300">Software licensing (annual)</span>
                        <span className="text-gray-300">$450,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Implementation services</span>
                        <span className="text-gray-300">$180,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Training and support</span>
                        <span className="text-gray-300">$70,000</span>
                      </div>
                      <div className="border-t border-midnight-600 pt-4">
                        <div className="flex justify-between text-lg font-bold">
                          <span className="text-white">Total Investment</span>
                          <span className="text-white">$700,000</span>
                        </div>
                        <div className="flex justify-between text-lg font-bold mt-2">
                          <span className="text-spring-400">Net ROI (Year 1)</span>
                          <span className="text-spring-400">329%</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>

        {/* Quote Section */}
        <div className="py-16">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <Card className="bg-gradient-to-r from-midnight-800 to-midnight-700 border-spring-400/30">
                <CardContent className="p-8 text-center">
                  <div className="text-4xl text-spring-400 mb-4">"</div>
                  <p className="text-xl text-gray-200 mb-6 leading-relaxed italic">
                    CyberSecure AI has transformed our security operations from reactive firefighting to proactive threat prevention. The platform's AI capabilities have given us visibility we never had before, and the reduction in false positives has allowed our team to focus on real threats.
                  </p>
                  <div className="flex items-center justify-center gap-4">
                    <div className="w-12 h-12 bg-spring-400/20 rounded-full flex items-center justify-center">
                      <Users className="w-6 h-6 text-spring-400" />
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-white">Sarah Mitchell</p>
                      <p className="text-sm text-gray-400">Chief Information Security Officer</p>
                      <p className="text-sm text-spring-400">U.S. Department of Education</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="py-16 bg-midnight-950/50">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Security Posture?</h2>
              <p className="text-xl text-gray-300 mb-8">
                See how CyberSecure AI can help your organization achieve similar results.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-spring-500 hover:bg-spring-600 text-midnight-900 font-semibold">
                  Schedule a Demo
                </Button>
                <Button size="lg" variant="outline" className="border-spring-400 text-spring-400 hover:bg-spring-400 hover:text-black">
                  View More Case Studies
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MarketingLayout>
  );
}