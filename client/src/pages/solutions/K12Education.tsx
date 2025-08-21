import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  GraduationCap,
  Shield,
  Users,
  BookOpen,
  CheckCircle,
  ArrowRight,
  Eye,
  Lock,
  Monitor,
  Smartphone,
  Wifi,
  Database
} from "lucide-react";
import { MarketingLayout } from "@/components/MarketingLayout";
import { Link } from "wouter";

export default function K12Education() {
  const educationChallenges = [
    {
      title: "Student Data Protection",
      description: "Comprehensive FERPA and CIPA compliant security for student records and educational data",
      icon: <Lock className="w-8 h-8" />,
      features: ["FERPA compliance", "Student privacy protection", "Academic record security", "Automated data governance"],
      compliance: "FERPA/CIPA",
      protection: "99.8%"
    },
    {
      title: "Device & Network Management",
      description: "Complete security for Chromebooks, tablets, and BYOD devices in educational environments",
      icon: <Monitor className="w-8 h-8" />,
      features: ["1:1 device protection", "Chromebook security", "BYOD management", "Network access control"],
      compliance: "E-Rate Compatible",
      protection: "97.3%"
    },
    {
      title: "Digital Learning Safety",
      description: "Safe online learning environments with content filtering and cyber-bullying prevention",
      icon: <BookOpen className="w-8 h-8" />,
      features: ["Content filtering", "Online safety monitoring", "Digital citizenship tools", "Learning platform security"],
      compliance: "CIPA/AUP",
      protection: "96.7%"
    },
    {
      title: "Staff & Administrative Security",
      description: "Comprehensive security training and administrative system protection for education staff",
      icon: <Users className="w-8 h-8" />,
      features: ["Staff security training", "Administrative system protection", "Role-based access control", "Incident response training"],
      compliance: "FERPA/SOX",
      protection: "98.1%"
    }
  ];

  const schoolDistricts = [
    { district: "Urban Elementary Schools", students: "2,847", devices: "3,156", security_score: 94 },
    { district: "Suburban Middle Schools", students: "1,923", devices: "2,078", security_score: 96 },
    { district: "Rural High Schools", students: "4,156", devices: "4,892", security_score: 91 },
    { district: "Charter Schools", students: "1,634", devices: "1,847", security_score: 93 }
  ];

  const threatLandscape = [
    { threat: "Ransomware Attacks", incidents: 127, prevented: 98.4, impact: "High" },
    { threat: "Phishing Attempts", incidents: 356, prevented: 96.7, impact: "Medium" },
    { threat: "Data Breaches", incidents: 43, prevented: 99.1, impact: "Critical" },
    { threat: "Inappropriate Content", incidents: 892, prevented: 94.3, impact: "Medium" }
  ];

  return (
    <MarketingLayout>
      <div className="min-h-screen bg-gradient-to-br from-background via-surface/50 to-background">
        {/* Hero Section */}
        <section className="py-20 px-6 bg-gradient-to-br from-green-50/10 via-blue-50/10 to-background">
          <div className="container mx-auto max-w-6xl text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl flex items-center justify-center">
                <GraduationCap className="w-10 h-10 text-white" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 geometric-text">
              K-12 Education Cybersecurity
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-4xl mx-auto">
              Comprehensive cybersecurity solutions designed specifically for elementary, middle, and high schools with FERPA and CIPA compliance built-in.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/security-scanner">
                <Button size="lg" className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 px-12 py-4 text-lg">
                  Free School Security Assessment
                </Button>
              </Link>
              <Link href="/solutions">
                <Button size="lg" variant="outline" className="border-green-500 text-green-400 hover:bg-green-500/10 px-12 py-4 text-lg">
                  View All Solutions
                  <ArrowRight className="ml-2 w-6 h-6" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* K-12 Security Benefits */}
        <section className="py-16 px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <Card className="bg-white/10 backdrop-blur-sm border border-white/20">
                <CardContent className="p-6 text-center">
                  <Shield className="w-8 h-8 text-green-400 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-green-400 mb-2">47%</div>
                  <div className="text-white font-semibold mb-1">Cost Savings</div>
                  <div className="text-gray-400 text-sm">Vs traditional IT security</div>
                </CardContent>
              </Card>
              
              <Card className="bg-white/10 backdrop-blur-sm border border-white/20">
                <CardContent className="p-6 text-center">
                  <Eye className="w-8 h-8 text-blue-400 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-blue-400 mb-2">99.2%</div>
                  <div className="text-white font-semibold mb-1">FERPA Compliance</div>
                  <div className="text-gray-400 text-sm">Student data protection</div>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-sm border border-white/20">
                <CardContent className="p-6 text-center">
                  <Wifi className="w-8 h-8 text-purple-400 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-purple-400 mb-2">78%</div>
                  <div className="text-white font-semibold mb-1">Network Efficiency</div>
                  <div className="text-gray-400 text-sm">Optimized bandwidth</div>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-sm border border-white/20">
                <CardContent className="p-6 text-center">
                  <Database className="w-8 h-8 text-cyan-400 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-cyan-400 mb-2">24/7</div>
                  <div className="text-white font-semibold mb-1">Student Safety</div>
                  <div className="text-gray-400 text-sm">Continuous monitoring</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* School District Coverage */}
        <section className="py-16 px-6 bg-gradient-to-b from-surface/20 to-background">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-4xl font-bold text-white text-center mb-12">K-12 School District Protection</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {schoolDistricts.map((district, index) => (
                <Card key={index} className="bg-white/10 backdrop-blur-sm border border-white/20">
                  <CardHeader>
                    <CardTitle className="text-white text-lg">{district.district}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Students:</span>
                        <span className="text-white font-semibold">{district.students}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Devices:</span>
                        <span className="text-blue-400 font-semibold">{district.devices}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Security Score:</span>
                        <span className="text-green-400 font-semibold">{district.security_score}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2 mt-3">
                        <div 
                          className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all"
                          style={{ width: `${district.security_score}%` }}
                        ></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Education Threat Landscape */}
        <section className="py-16 px-6">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-4xl font-bold text-white text-center mb-12">K-12 Threat Prevention Metrics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {threatLandscape.map((threat, index) => (
                <Card key={index} className="bg-white/10 backdrop-blur-sm border border-white/20">
                  <CardHeader>
                    <CardTitle className="text-white text-lg">{threat.threat}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Incidents:</span>
                        <span className="text-white font-semibold">{threat.incidents}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Prevention:</span>
                        <span className="text-green-400 font-semibold">{threat.prevented}%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Impact Level:</span>
                        <span className={`font-semibold ${threat.impact === 'Critical' ? 'text-red-400' : threat.impact === 'High' ? 'text-orange-400' : 'text-yellow-400'}`}>
                          {threat.impact}
                        </span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2 mt-3">
                        <div 
                          className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all"
                          style={{ width: `${threat.prevented}%` }}
                        ></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Education Security Solutions */}
        <section className="py-16 px-6 bg-gradient-to-b from-surface/20 to-background">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-4xl font-bold text-white text-center mb-12">K-12 Security Solutions</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {educationChallenges.map((challenge, index) => (
                <Card key={index} className="bg-white/10 backdrop-blur-sm border border-white/20">
                  <CardHeader>
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl flex items-center justify-center">
                        {challenge.icon}
                      </div>
                      <CardTitle className="text-2xl text-white">{challenge.title}</CardTitle>
                    </div>
                    <p className="text-gray-300 text-lg mb-4">{challenge.description}</p>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="text-center p-2 bg-black/20 rounded">
                        <div className="text-sm font-bold text-green-400">{challenge.compliance}</div>
                        <div className="text-xs text-gray-400">Compliance</div>
                      </div>
                      <div className="text-center p-2 bg-black/20 rounded">
                        <div className="text-sm font-bold text-blue-400">{challenge.protection}</div>
                        <div className="text-xs text-gray-400">Protection Rate</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {challenge.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-gray-200">
                          <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                          <span className="text-lg">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 px-6 bg-gradient-to-r from-green-900/20 to-blue-900/20">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-5xl font-bold text-white mb-8">Protect Your Students & Schools</h2>
            <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
              Deploy comprehensive cybersecurity solutions designed specifically for K-12 education with built-in FERPA and CIPA compliance, student data protection, and safe learning environments.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/solutions">
                <Button size="lg" className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 px-12 py-4 text-lg">
                  Explore All Solutions
                </Button>
              </Link>
              <Link href="/security-scanner">
                <Button size="lg" variant="outline" className="border-green-500 text-green-400 hover:bg-green-500/10 px-12 py-4 text-lg">
                  Free School Assessment
                  <ArrowRight className="ml-2 w-6 h-6" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </MarketingLayout>
  );
}