import { MarketingLayout } from "@/components/MarketingLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowLeft,
  GraduationCap,
  Shield,
  Users,
  CheckCircle,
  Star,
  Calendar,
  BookOpen,
  Lock,
  FileText,
  Award,
  TrendingUp
} from "lucide-react";
import { Link } from "wouter";
import universityFerpaImg from "@assets/generated_images/University_FERPA_Compliance_Success_c6f7fd15.jpg";

export default function UniversityFerpaCompliance() {
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
                  <GraduationCap className="w-3 h-3 mr-1" />
                  Higher Education
                </Badge>
                <Badge variant="outline" className="border-gray-400 text-gray-400">
                  12 min read
                </Badge>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-spring-400 to-cyber-blue-400 bg-clip-text text-transparent">
                State University Achieves 100% FERPA Compliance
              </h1>
              
              <p className="text-xl text-gray-300 mb-6">
                Complete digital transformation story of how California State University System implemented campus-wide cybersecurity measures while maintaining educational accessibility and student privacy.
              </p>
              
              <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Implementation: September 2023 - February 2024
                </span>
                <span className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  485,000+ Students Protected
                </span>
                <span className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  23 Campus Locations
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
                src={universityFerpaImg} 
                alt="University FERPA Compliance Success"
                className="w-full h-64 md:h-96 object-cover rounded-lg border border-midnight-600"
              />
            </div>
          </div>
        </div>

        {/* Key Results */}
        <div className="py-16 bg-midnight-900/30">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">Transformational Results</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="bg-midnight-800/50 border-midnight-700">
                  <CardHeader className="text-center">
                    <div className="w-12 h-12 bg-spring-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Award className="w-6 h-6 text-spring-400" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-spring-400">100%</CardTitle>
                    <p className="text-gray-400">FERPA Compliance Achieved</p>
                  </CardHeader>
                </Card>
                
                <Card className="bg-midnight-800/50 border-midnight-700">
                  <CardHeader className="text-center">
                    <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Shield className="w-6 h-6 text-red-400" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-red-400">75%</CardTitle>
                    <p className="text-gray-400">Reduction in Data Breaches</p>
                  </CardHeader>
                </Card>
                
                <Card className="bg-midnight-800/50 border-midnight-700">
                  <CardHeader className="text-center">
                    <div className="w-12 h-12 bg-cyber-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Lock className="w-6 h-6 text-cyber-blue-400" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-cyber-blue-400">Enhanced</CardTitle>
                    <p className="text-gray-400">Student Privacy Protection</p>
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
                    California State University System, serving 485,000 students across 23 campuses, faced mounting pressure to protect student educational records while maintaining accessibility for faculty, staff, and students themselves.
                  </p>
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    With diverse campus environments, varying IT infrastructures, and complex data sharing requirements between campuses, achieving consistent FERPA compliance was a significant challenge.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">Inconsistent data protection across 23 campuses</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">Manual compliance reporting taking 40+ hours monthly</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">12 data breach incidents in previous academic year</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">Complex access controls affecting user experience</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h2 className="text-3xl font-bold mb-6 text-spring-400">Multi-Phase Implementation</h2>
                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-spring-400 text-midnight-900 rounded-full flex items-center justify-center text-sm font-bold">1</div>
                      <div>
                        <h4 className="font-semibold text-white mb-1">Assessment & Standards Development</h4>
                        <p className="text-gray-400 text-sm">Comprehensive audit of all 23 campuses and standardization planning</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-spring-400 text-midnight-900 rounded-full flex items-center justify-center text-sm font-bold">2</div>
                      <div>
                        <h4 className="font-semibold text-white mb-1">Pilot Campus Deployment</h4>
                        <p className="text-gray-400 text-sm">Implementation at 3 representative campuses for testing and refinement</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-spring-400 text-midnight-900 rounded-full flex items-center justify-center text-sm font-bold">3</div>
                      <div>
                        <h4 className="font-semibold text-white mb-1">System-Wide Rollout</h4>
                        <p className="text-gray-400 text-sm">Phased deployment across all remaining campuses with standardized configurations</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-green-400 text-midnight-900 rounded-full flex items-center justify-center text-sm font-bold">4</div>
                      <div>
                        <h4 className="font-semibold text-white mb-1">Training & Optimization</h4>
                        <p className="text-gray-400 text-sm">Comprehensive staff training and system optimization for peak performance</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FERPA Compliance Features */}
        <div className="py-16 bg-midnight-950/50">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">FERPA Compliance Solutions Deployed</h2>
              
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <Card className="bg-midnight-800/50 border-midnight-700">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Lock className="w-5 h-5 text-spring-400" />
                      Automated Access Controls
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 mb-4">
                      Intelligent role-based access control ensuring only authorized personnel can access student educational records while maintaining legitimate educational interests.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-spring-400" />
                        <span className="text-gray-300">Dynamic permission assignment</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-spring-400" />
                        <span className="text-gray-300">Automatic access expiration</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-spring-400" />
                        <span className="text-gray-300">Emergency access protocols</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="bg-midnight-800/50 border-midnight-700">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="w-5 h-5 text-cyber-blue-400" />
                      Comprehensive Audit Trails
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 mb-4">
                      Complete logging and tracking of all access to student records, ensuring full transparency and compliance with FERPA audit requirements.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-cyber-blue-400" />
                        <span className="text-gray-300">Real-time access logging</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-cyber-blue-400" />
                        <span className="text-gray-300">Automated compliance reports</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-cyber-blue-400" />
                        <span className="text-gray-300">Violation alerting system</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <Card className="bg-midnight-800/50 border-midnight-700">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="w-5 h-5 text-green-400" />
                      Data Classification Engine
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 mb-4">
                      AI-powered automatic identification and classification of educational records, ensuring appropriate protection levels for different data types.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <span className="text-gray-300">Automatic PII detection</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <span className="text-gray-300">Educational record categorization</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <span className="text-gray-300">Directory information management</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="bg-midnight-800/50 border-midnight-700">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-purple-400" />
                      Student Consent Management
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 mb-4">
                      Streamlined system for managing student consent for information disclosure, ensuring compliance with FERPA disclosure requirements.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-purple-400" />
                        <span className="text-gray-300">Digital consent capture</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-purple-400" />
                        <span className="text-gray-300">Granular permission controls</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-purple-400" />
                        <span className="text-gray-300">Consent withdrawal tracking</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>

        {/* Campus Implementation Progress */}
        <div className="py-16">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">System-Wide Implementation Results</h2>
              
              <div className="space-y-8">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-white font-medium">FERPA Compliance Achievement</span>
                    <span className="text-spring-400 font-bold">100%</span>
                  </div>
                  <Progress value={100} className="h-3" />
                  <p className="text-xs text-gray-400 mt-1">All 23 campuses achieving full FERPA compliance</p>
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-white font-medium">Data Breach Reduction</span>
                    <span className="text-spring-400 font-bold">75%</span>
                  </div>
                  <Progress value={75} className="h-3" />
                  <p className="text-xs text-gray-400 mt-1">From 12 incidents/year to 3 incidents/year</p>
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-white font-medium">Compliance Reporting Efficiency</span>
                    <span className="text-spring-400 font-bold">87%</span>
                  </div>
                  <Progress value={87} className="h-3" />
                  <p className="text-xs text-gray-400 mt-1">From 40+ hours to 5 hours monthly reporting</p>
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-white font-medium">User Satisfaction Score</span>
                    <span className="text-spring-400 font-bold">92%</span>
                  </div>
                  <Progress value={92} className="h-3" />
                  <p className="text-xs text-gray-400 mt-1">Faculty and staff satisfaction with new system</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Campus Metrics */}
        <div className="py-16 bg-midnight-950/50">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">System-Wide Impact</h2>
              
              <div className="grid md:grid-cols-4 gap-6">
                <Card className="bg-midnight-800/50 border-midnight-700 text-center">
                  <CardContent className="p-6">
                    <div className="text-3xl font-bold text-spring-400 mb-2">23</div>
                    <p className="text-gray-400 text-sm">Campuses Protected</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-midnight-800/50 border-midnight-700 text-center">
                  <CardContent className="p-6">
                    <div className="text-3xl font-bold text-cyber-blue-400 mb-2">485K</div>
                    <p className="text-gray-400 text-sm">Student Records Secured</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-midnight-800/50 border-midnight-700 text-center">
                  <CardContent className="p-6">
                    <div className="text-3xl font-bold text-green-400 mb-2">55K</div>
                    <p className="text-gray-400 text-sm">Faculty & Staff Protected</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-midnight-800/50 border-midnight-700 text-center">
                  <CardContent className="p-6">
                    <div className="text-3xl font-bold text-purple-400 mb-2">99.9%</div>
                    <p className="text-gray-400 text-sm">System Uptime</p>
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
                    The transformation has been remarkable. We went from struggling with inconsistent compliance across our campuses to having a unified, automated system that not only meets but exceeds FERPA requirements. Our students and faculty can focus on education, knowing their data is protected.
                  </p>
                  <div className="flex items-center justify-center gap-4">
                    <div className="w-12 h-12 bg-spring-400/20 rounded-full flex items-center justify-center">
                      <GraduationCap className="w-6 h-6 text-spring-400" />
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-white">Dr. Michael Rodriguez</p>
                      <p className="text-sm text-gray-400">Chief Information Officer</p>
                      <p className="text-sm text-spring-400">California State University System</p>
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
              <h2 className="text-3xl font-bold mb-4">Achieve FERPA Compliance for Your Institution</h2>
              <p className="text-xl text-gray-300 mb-8">
                Protect student privacy while maintaining educational accessibility with our proven solution.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-spring-500 hover:bg-spring-600 text-midnight-900 font-semibold">
                  Request Compliance Assessment
                </Button>
                <Button size="lg" variant="outline" className="border-spring-400 text-spring-400 hover:bg-spring-400 hover:text-black">
                  Download FERPA Guide
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MarketingLayout>
  );
}