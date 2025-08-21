import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  GraduationCap,
  Shield,
  Users,
  Database,
  CheckCircle,
  ArrowRight,
  Eye,
  Lock,
  Brain,
  Laptop,
  Globe,
  BookOpen
} from "lucide-react";
import { MarketingLayout } from "@/components/MarketingLayout";
import { Link } from "wouter";

export default function HigherEducation() {
  const higherEdChallenges = [
    {
      title: "Research Data Protection",
      description: "Advanced security for sensitive research data, intellectual property, and grant-funded projects",
      icon: <Database className="w-8 h-8" />,
      features: ["Multi-level data classification", "Collaborative research security", "IP protection controls", "Grant compliance monitoring"],
      compliance: "FERPA/FISMA",
      protection: "99.7%"
    },
    {
      title: "Campus Network Security",
      description: "Comprehensive network protection for complex campus environments with diverse user populations",
      icon: <Globe className="w-8 h-8" />,
      features: ["Campus-wide coverage", "BYOD management", "Guest network isolation", "IoT device security"],
      compliance: "NIST/ISO 27001",
      protection: "96.8%"
    },
    {
      title: "Student & Faculty Protection",
      description: "Identity management and access control for students, faculty, and administrative staff",
      icon: <Users className="w-8 h-8" />,
      features: ["Single sign-on", "Multi-factor authentication", "Role-based access", "Identity governance"],
      compliance: "FERPA/GDPR",
      protection: "98.3%"
    },
    {
      title: "Academic System Security",
      description: "Protection for learning management systems, student information systems, and academic applications",
      icon: <BookOpen className="w-8 h-8" />,
      features: ["LMS security", "SIS protection", "Academic app security", "Grade protection"],
      compliance: "FERPA/SOX",
      protection: "97.9%"
    }
  ];

  const universityStats = [
    { institution: "Research Universities", students: "45,789", faculty: "3,456", security_score: 94 },
    { institution: "Liberal Arts Colleges", students: "12,234", faculty: "1,892", security_score: 96 },
    { institution: "Community Colleges", students: "28,567", faculty: "2,134", security_score: 91 },
    { institution: "Graduate Schools", students: "8,945", faculty: "1,567", security_score: 98 }
  ];

  const researchSecurity = [
    { area: "Medical Research", grants: 89, data: "247 TB", protection: 99.8 },
    { area: "Engineering Projects", grants: 156, data: "134 TB", protection: 98.4 },
    { area: "Social Sciences", grants: 67, data: "89 TB", protection: 97.6 },
    { area: "Physical Sciences", grants: 203, data: "456 TB", protection: 99.2 }
  ];

  const campusThreatLandscape = [
    { threat: "Advanced Persistent Threats", incidents: 23, prevented: 95.7, impact: "High" },
    { threat: "Research Data Breaches", incidents: 8, prevented: 99.1, impact: "Critical" },
    { threat: "Phishing Campaigns", incidents: 456, prevented: 94.2, impact: "Medium" },
    { threat: "Insider Threats", incidents: 12, prevented: 91.7, impact: "High" }
  ];

  return (
    <MarketingLayout>
      <div className="min-h-screen bg-gradient-to-br from-background via-surface/50 to-background">
        {/* Hero Section */}
        <section className="py-20 px-6 bg-gradient-to-br from-blue-50/10 via-purple-50/10 to-background">
          <div className="container mx-auto max-w-6xl text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center">
                <GraduationCap className="w-10 h-10 text-white" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 geometric-text">
              Higher Education Cybersecurity
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-4xl mx-auto">
              Advanced cybersecurity solutions for colleges, universities, and research institutions with comprehensive research data protection and campus-wide security.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/security-scanner">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-12 py-4 text-lg">
                  University Security Assessment
                </Button>
              </Link>
              <Link href="/solutions">
                <Button size="lg" variant="outline" className="border-blue-500 text-blue-400 hover:bg-blue-500/10 px-12 py-4 text-lg">
                  View All Solutions
                  <ArrowRight className="ml-2 w-6 h-6" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Higher Education Benefits */}
        <section className="py-16 px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <Card className="bg-white/10 backdrop-blur-sm border border-white/20">
                <CardContent className="p-6 text-center">
                  <Database className="w-8 h-8 text-blue-400 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-blue-400 mb-2">926TB</div>
                  <div className="text-white font-semibold mb-1">Research Data</div>
                  <div className="text-gray-400 text-sm">Securely protected</div>
                </CardContent>
              </Card>
              
              <Card className="bg-white/10 backdrop-blur-sm border border-white/20">
                <CardContent className="p-6 text-center">
                  <Brain className="w-8 h-8 text-purple-400 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-purple-400 mb-2">515</div>
                  <div className="text-white font-semibold mb-1">Research Grants</div>
                  <div className="text-gray-400 text-sm">Protected projects</div>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-sm border border-white/20">
                <CardContent className="p-6 text-center">
                  <Eye className="w-8 h-8 text-cyan-400 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-cyan-400 mb-2">99.1%</div>
                  <div className="text-white font-semibold mb-1">FERPA Compliance</div>
                  <div className="text-gray-400 text-sm">Student data security</div>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-sm border border-white/20">
                <CardContent className="p-6 text-center">
                  <Laptop className="w-8 h-8 text-green-400 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-green-400 mb-2">62%</div>
                  <div className="text-white font-semibold mb-1">IT Cost Reduction</div>
                  <div className="text-gray-400 text-sm">Vs traditional security</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* University Coverage Stats */}
        <section className="py-16 px-6 bg-gradient-to-b from-surface/20 to-background">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-4xl font-bold text-white text-center mb-12">Higher Education Institution Coverage</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {universityStats.map((stat, index) => (
                <Card key={index} className="bg-white/10 backdrop-blur-sm border border-white/20">
                  <CardHeader>
                    <CardTitle className="text-white text-lg">{stat.institution}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Students:</span>
                        <span className="text-white font-semibold">{stat.students}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Faculty:</span>
                        <span className="text-blue-400 font-semibold">{stat.faculty}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Security Score:</span>
                        <span className="text-green-400 font-semibold">{stat.security_score}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2 mt-3">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all"
                          style={{ width: `${stat.security_score}%` }}
                        ></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Research Security Metrics */}
        <section className="py-16 px-6">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-4xl font-bold text-white text-center mb-12">Research Data Protection Metrics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {researchSecurity.map((research, index) => (
                <Card key={index} className="bg-white/10 backdrop-blur-sm border border-white/20">
                  <CardHeader>
                    <CardTitle className="text-white text-lg">{research.area}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Active Grants:</span>
                        <span className="text-white font-semibold">{research.grants}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Data Volume:</span>
                        <span className="text-blue-400 font-semibold">{research.data}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Protection Rate:</span>
                        <span className="text-green-400 font-semibold">{research.protection}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2 mt-3">
                        <div 
                          className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all"
                          style={{ width: `${research.protection}%` }}
                        ></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Campus Threat Prevention */}
        <section className="py-16 px-6 bg-gradient-to-b from-surface/20 to-background">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-4xl font-bold text-white text-center mb-12">Campus Threat Prevention Statistics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {campusThreatLandscape.map((threat, index) => (
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

        {/* Higher Education Security Solutions */}
        <section className="py-16 px-6">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-4xl font-bold text-white text-center mb-12">Higher Education Security Solutions</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {higherEdChallenges.map((challenge, index) => (
                <Card key={index} className="bg-white/10 backdrop-blur-sm border border-white/20">
                  <CardHeader>
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                        {challenge.icon}
                      </div>
                      <CardTitle className="text-2xl text-white">{challenge.title}</CardTitle>
                    </div>
                    <p className="text-gray-300 text-lg mb-4">{challenge.description}</p>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="text-center p-2 bg-black/20 rounded">
                        <div className="text-sm font-bold text-blue-400">{challenge.compliance}</div>
                        <div className="text-xs text-gray-400">Compliance</div>
                      </div>
                      <div className="text-center p-2 bg-black/20 rounded">
                        <div className="text-sm font-bold text-purple-400">{challenge.protection}</div>
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
        <section className="py-20 px-6 bg-gradient-to-r from-blue-900/20 to-purple-900/20">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-5xl font-bold text-white mb-8">Secure Your Campus & Research</h2>
            <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
              Deploy advanced cybersecurity solutions designed for higher education with comprehensive research data protection, campus-wide security, and FERPA compliance for universities and colleges.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/solutions">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-12 py-4 text-lg">
                  Explore All Solutions
                </Button>
              </Link>
              <Link href="/security-scanner">
                <Button size="lg" variant="outline" className="border-blue-500 text-blue-400 hover:bg-blue-500/10 px-12 py-4 text-lg">
                  University Assessment
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