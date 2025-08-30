import { MarketingLayout } from "@/components/MarketingLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowLeft,
  School,
  DollarSign,
  Shield,
  Users,
  CheckCircle,
  Star,
  Calendar,
  TrendingDown,
  Clock,
  Award,
  Target,
  Laptop
} from "lucide-react";
import { Link } from "wouter";
import k12CostSavingsImg from "@assets/generated_images/K12_District_Cost_Savings_62fda7d5.png";

export default function K12CostSavings() {
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
                  <School className="w-3 h-3 mr-1" />
                  K-12 Education
                </Badge>
                <Badge variant="outline" className="border-gray-400 text-gray-400">
                  10 min read
                </Badge>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-spring-400 to-cyber-blue-400 bg-clip-text text-transparent">
                K-12 District Saves $1.2M Annually on Security
              </h1>
              
              <p className="text-xl text-gray-300 mb-6">
                How Texas's second-largest school district modernized their cybersecurity infrastructure while reducing costs and improving educational technology safety for 75,000+ students.
              </p>
              
              <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Implementation: August 2023 - December 2023
                </span>
                <span className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  75,000+ Students & 8,500+ Staff
                </span>
                <span className="flex items-center gap-2">
                  <School className="w-4 h-4" />
                  127 Campus Locations
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
                src={k12CostSavingsImg} 
                alt="K-12 District Cost Savings Success"
                className="w-full h-64 md:h-96 object-cover rounded-lg border border-midnight-600"
              />
            </div>
          </div>
        </div>

        {/* Key Results */}
        <div className="py-16 bg-midnight-900/30">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">Outstanding Results Achieved</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="bg-midnight-800/50 border-midnight-700">
                  <CardHeader className="text-center">
                    <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <DollarSign className="w-6 h-6 text-green-400" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-green-400">$1.2M</CardTitle>
                    <p className="text-gray-400">Annual Cost Savings</p>
                  </CardHeader>
                </Card>
                
                <Card className="bg-midnight-800/50 border-midnight-700">
                  <CardHeader className="text-center">
                    <div className="w-12 h-12 bg-spring-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Shield className="w-6 h-6 text-spring-400" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-spring-400">Zero</CardTitle>
                    <p className="text-gray-400">Successful Phishing Attacks</p>
                  </CardHeader>
                </Card>
                
                <Card className="bg-midnight-800/50 border-midnight-700">
                  <CardHeader className="text-center">
                    <div className="w-12 h-12 bg-cyber-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Award className="w-6 h-6 text-cyber-blue-400" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-cyber-blue-400">95%</CardTitle>
                    <p className="text-gray-400">User Satisfaction Rate</p>
                  </CardHeader>
                </Card>
              </div>
            </div>
          </div>
        </div>

        {/* Challenge & Solution */}
        <div className="py-16">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <h2 className="text-3xl font-bold mb-6 text-spring-400">The Challenge</h2>
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    Austin Independent School District (AISD), serving 75,000+ students across 127 campuses, was spending over $2.8 million annually on cybersecurity tools and services from multiple vendors, creating a complex and costly security ecosystem.
                  </p>
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    The district faced increasing cyber threats targeting educational technology, with 23 successful phishing attacks in the previous year affecting both student data and educational continuity.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">$2.8M annual cybersecurity spending across multiple vendors</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">23 successful phishing attacks impacting operations</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">Complex vendor management consuming IT resources</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">Inconsistent security across different campus environments</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h2 className="text-3xl font-bold mb-6 text-spring-400">Phased Rollout Strategy</h2>
                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-spring-400 text-midnight-900 rounded-full flex items-center justify-center text-sm font-bold">1</div>
                      <div>
                        <h4 className="font-semibold text-white mb-1">Pilot Program (3 weeks)</h4>
                        <p className="text-gray-400 text-sm">Testing with 5 representative campuses including elementary, middle, and high schools</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-spring-400 text-midnight-900 rounded-full flex items-center justify-center text-sm font-bold">2</div>
                      <div>
                        <h4 className="font-semibold text-white mb-1">Administrative Centers (2 weeks)</h4>
                        <p className="text-gray-400 text-sm">Deployment across central administration and support facilities</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-spring-400 text-midnight-900 rounded-full flex items-center justify-center text-sm font-bold">3</div>
                      <div>
                        <h4 className="font-semibold text-white mb-1">District-Wide Implementation (12 weeks)</h4>
                        <p className="text-gray-400 text-sm">Systematic rollout across all 127 campuses with staggered training</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-green-400 text-midnight-900 rounded-full flex items-center justify-center text-sm font-bold">4</div>
                      <div>
                        <h4 className="font-semibold text-white mb-1">Legacy System Decommission (4 weeks)</h4>
                        <p className="text-gray-400 text-sm">Gradual retirement of previous security tools and vendor consolidation</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Cost Analysis */}
        <div className="py-16 bg-midnight-950/50">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">Comprehensive Cost Analysis</h2>
              
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <Card className="bg-midnight-800/50 border-midnight-700">
                  <CardHeader>
                    <CardTitle className="text-red-400">Previous Annual Costs</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-gray-300">Legacy security software licenses</span>
                        <span className="text-red-400">$1,200,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Multiple vendor management</span>
                        <span className="text-red-400">$480,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Incident response and remediation</span>
                        <span className="text-red-400">$650,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Training and support costs</span>
                        <span className="text-red-400">$470,000</span>
                      </div>
                      <div className="border-t border-midnight-600 pt-4">
                        <div className="flex justify-between text-lg font-bold">
                          <span className="text-white">Total Previous Costs</span>
                          <span className="text-red-400">$2,800,000</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-midnight-800/50 border-midnight-700">
                  <CardHeader>
                    <CardTitle className="text-green-400">New Annual Costs</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-gray-300">CyberSecured AI platform license</span>
                        <span className="text-green-400">$950,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Implementation and training</span>
                        <span className="text-green-400">$180,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Ongoing support and maintenance</span>
                        <span className="text-green-400">$200,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Additional security services</span>
                        <span className="text-green-400">$270,000</span>
                      </div>
                      <div className="border-t border-midnight-600 pt-4">
                        <div className="flex justify-between text-lg font-bold">
                          <span className="text-white">Total Current Costs</span>
                          <span className="text-green-400">$1,600,000</span>
                        </div>
                        <div className="flex justify-between text-xl font-bold mt-4">
                          <span className="text-spring-400">Annual Savings</span>
                          <span className="text-spring-400">$1,200,000</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>

        {/* Security Improvements */}
        <div className="py-16">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">Security Enhancement Results</h2>
              
              <div className="space-y-8">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-white font-medium">Phishing Attack Prevention</span>
                    <span className="text-spring-400 font-bold">100%</span>
                  </div>
                  <Progress value={100} className="h-3" />
                  <p className="text-xs text-gray-400 mt-1">Zero successful phishing attacks in 12 months post-implementation</p>
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-white font-medium">Threat Detection Speed</span>
                    <span className="text-spring-400 font-bold">89%</span>
                  </div>
                  <Progress value={89} className="h-3" />
                  <p className="text-xs text-gray-400 mt-1">Average detection time reduced from 6 hours to 40 minutes</p>
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-white font-medium">False Positive Reduction</span>
                    <span className="text-spring-400 font-bold">78%</span>
                  </div>
                  <Progress value={78} className="h-3" />
                  <p className="text-xs text-gray-400 mt-1">IT team can focus on real threats instead of false alarms</p>
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-white font-medium">System Uptime Improvement</span>
                    <span className="text-spring-400 font-bold">99.7%</span>
                  </div>
                  <Progress value={99.7} className="h-3" />
                  <p className="text-xs text-gray-400 mt-1">Minimal disruption to educational activities</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Educational Technology Benefits */}
        <div className="py-16 bg-midnight-950/50">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">Educational Technology Enhancement</h2>
              
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="bg-midnight-800/50 border-midnight-700">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Laptop className="w-5 h-5 text-spring-400" />
                      1:1 Device Security
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 mb-4">
                      Enhanced protection for 75,000+ student devices without impacting educational software performance.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-spring-400" />
                        <span className="text-gray-300">Real-time threat monitoring</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-spring-400" />
                        <span className="text-gray-300">Automatic security updates</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-spring-400" />
                        <span className="text-gray-300">Educational app whitelisting</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="bg-midnight-800/50 border-midnight-700">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="w-5 h-5 text-cyber-blue-400" />
                      Network Protection
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 mb-4">
                      Comprehensive network security across all 127 campuses with centralized management and monitoring.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-cyber-blue-400" />
                        <span className="text-gray-300">Unified threat management</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-cyber-blue-400" />
                        <span className="text-gray-300">Bandwidth optimization</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-cyber-blue-400" />
                        <span className="text-gray-300">Content filtering automation</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="bg-midnight-800/50 border-midnight-700">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-green-400" />
                      User Experience
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 mb-4">
                      Seamless security that doesn't interfere with teaching and learning activities.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <span className="text-gray-300">Single sign-on integration</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <span className="text-gray-300">Minimal user intervention</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <span className="text-gray-300">Teacher-friendly controls</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonial */}
        <div className="py-16">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <Card className="bg-gradient-to-r from-midnight-800 to-midnight-700 border-spring-400/30">
                <CardContent className="p-8 text-center">
                  <div className="text-4xl text-spring-400 mb-4">"</div>
                  <p className="text-xl text-gray-200 mb-6 leading-relaxed italic">
                    The cost savings alone would have been worth it, but the improved security and user experience have exceeded our expectations. Our teachers can focus on teaching, our students can learn safely, and our IT team can be proactive instead of reactive. It's a win-win-win situation.
                  </p>
                  <div className="flex items-center justify-center gap-4">
                    <div className="w-12 h-12 bg-spring-400/20 rounded-full flex items-center justify-center">
                      <School className="w-6 h-6 text-spring-400" />
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-white">Maria Gonzalez</p>
                      <p className="text-sm text-gray-400">Chief Technology Officer</p>
                      <p className="text-sm text-spring-400">Austin Independent School District</p>
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
              <h2 className="text-3xl font-bold mb-4">Ready to Optimize Your District's Security Costs?</h2>
              <p className="text-xl text-gray-300 mb-8">
                Discover how much your district could save while improving security and user satisfaction.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-spring-500 hover:bg-spring-600 text-midnight-900 font-semibold">
                  Calculate Your Savings
                </Button>
                <Button size="lg" variant="outline" className="border-spring-400 text-spring-400 hover:bg-spring-400 hover:text-black">
                  Download K-12 Security Guide
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MarketingLayout>
  );
}