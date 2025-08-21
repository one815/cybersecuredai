import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Flag,
  Shield,
  Lock,
  Database,
  Eye,
  CheckCircle,
  ArrowRight,
  AlertTriangle,
  Key,
  Brain,
  Globe,
  Server
} from "lucide-react";
import { MarketingLayout } from "@/components/MarketingLayout";
import { Link } from "wouter";

export default function FederalAgencies() {
  const federalChallenges = [
    {
      title: "Classified Information Systems",
      description: "Ultra-secure protection for classified and sensitive government information at all classification levels",
      icon: <Lock className="w-8 h-8" />,
      features: ["Multi-level security", "Classification controls", "Compartmented access", "Air-gapped networks"],
      compliance: "FedRAMP/FISMA",
      protection: "99.9%"
    },
    {
      title: "Zero Trust Architecture",
      description: "Advanced zero trust implementation with continuous verification and micro-segmentation",
      icon: <Eye className="w-8 h-8" />,
      features: ["Continuous verification", "Micro-segmentation", "Identity-centric security", "Least privilege access"],
      compliance: "NIST 800-207",
      protection: "98.7%"
    },
    {
      title: "Advanced Persistent Threat Defense",
      description: "Nation-state level threat detection and response with AI-powered analysis",
      icon: <Brain className="w-8 h-8" />,
      features: ["APT detection", "Threat intelligence", "Advanced analytics", "Attribution analysis"],
      compliance: "NIST CSF",
      protection: "97.4%"
    },
    {
      title: "Secure Communications",
      description: "End-to-end encrypted communications for sensitive government operations and coordination",
      icon: <Globe className="w-8 h-8" />,
      features: ["End-to-end encryption", "Secure voice/video", "Message security", "Key management"],
      compliance: "CNSS/NSA",
      protection: "99.8%"
    }
  ];

  const agencyStats = [
    { agency: "Defense Agencies", personnel: "156K", systems: "2,847", security_score: 98 },
    { agency: "Intelligence Community", personnel: "89K", systems: "1,234", security_score: 99 },
    { agency: "Civilian Agencies", personnel: "234K", systems: "4,567", security_score: 94 },
    { agency: "Law Enforcement", personnel: "67K", systems: "892", security_score: 96 }
  ];

  const classificationLevels = [
    { level: "UNCLASSIFIED", systems: 4567, access_controls: 99.2, monitoring: "24/7" },
    { level: "CONFIDENTIAL", systems: 1234, access_controls: 99.7, monitoring: "Real-time" },
    { level: "SECRET", systems: 892, access_controls: 99.9, monitoring: "Continuous" },
    { level: "TOP SECRET", systems: 234, access_controls: 100.0, monitoring: "Advanced" }
  ];

  const federalThreatLandscape = [
    { threat: "Nation-State Actors", incidents: 89, prevented: 96.6, impact: "Critical" },
    { threat: "Advanced Persistent Threats", incidents: 156, prevented: 94.2, impact: "High" },
    { threat: "Insider Threats", incidents: 23, prevented: 91.3, impact: "High" },
    { threat: "Supply Chain Attacks", incidents: 12, prevented: 98.7, impact: "Critical" }
  ];

  return (
    <MarketingLayout>
      <div className="min-h-screen bg-gradient-to-br from-background via-surface/50 to-background">
        {/* Hero Section */}
        <section className="py-20 px-6 bg-gradient-to-br from-red-50/10 via-blue-50/10 to-background">
          <div className="container mx-auto max-w-6xl text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-blue-500 rounded-2xl flex items-center justify-center">
                <Flag className="w-10 h-10 text-white" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 geometric-text">
              Federal Agency Cybersecurity
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-4xl mx-auto">
              Mission-critical cybersecurity solutions for federal government departments and agencies with classified system protection, zero trust architecture, and nation-state threat defense.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/security-scanner">
                <Button size="lg" className="bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-700 hover:to-blue-700 px-12 py-4 text-lg">
                  Federal Security Assessment
                </Button>
              </Link>
              <Link href="/solutions">
                <Button size="lg" variant="outline" className="border-red-500 text-red-400 hover:bg-red-500/10 px-12 py-4 text-lg">
                  View All Solutions
                  <ArrowRight className="ml-2 w-6 h-6" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Federal Security Benefits */}
        <section className="py-16 px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <Card className="bg-white/10 backdrop-blur-sm border border-white/20">
                <CardContent className="p-6 text-center">
                  <Shield className="w-8 h-8 text-red-400 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-red-400 mb-2">9,785</div>
                  <div className="text-white font-semibold mb-1">Classified Systems</div>
                  <div className="text-gray-400 text-sm">All levels protected</div>
                </CardContent>
              </Card>
              
              <Card className="bg-white/10 backdrop-blur-sm border border-white/20">
                <CardContent className="p-6 text-center">
                  <Key className="w-8 h-8 text-blue-400 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-blue-400 mb-2">546K</div>
                  <div className="text-white font-semibold mb-1">Security Clearances</div>
                  <div className="text-gray-400 text-sm">Managed & monitored</div>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-sm border border-white/20">
                <CardContent className="p-6 text-center">
                  <AlertTriangle className="w-8 h-8 text-orange-400 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-orange-400 mb-2">97.1%</div>
                  <div className="text-white font-semibold mb-1">Threat Prevention</div>
                  <div className="text-gray-400 text-sm">Nation-state actors</div>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-sm border border-white/20">
                <CardContent className="p-6 text-center">
                  <Server className="w-8 h-8 text-green-400 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-green-400 mb-2">99.99%</div>
                  <div className="text-white font-semibold mb-1">Mission Uptime</div>
                  <div className="text-gray-400 text-sm">Critical operations</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Federal Agency Coverage */}
        <section className="py-16 px-6 bg-gradient-to-b from-surface/20 to-background">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-4xl font-bold text-white text-center mb-12">Federal Agency Protection Coverage</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {agencyStats.map((stat, index) => (
                <Card key={index} className="bg-white/10 backdrop-blur-sm border border-white/20">
                  <CardHeader>
                    <CardTitle className="text-white text-lg">{stat.agency}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Personnel:</span>
                        <span className="text-white font-semibold">{stat.personnel}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Systems:</span>
                        <span className="text-red-400 font-semibold">{stat.systems}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Security Score:</span>
                        <span className="text-green-400 font-semibold">{stat.security_score}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2 mt-3">
                        <div 
                          className="bg-gradient-to-r from-red-500 to-blue-500 h-2 rounded-full transition-all"
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

        {/* Classification Level Security */}
        <section className="py-16 px-6">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-4xl font-bold text-white text-center mb-12">Classification Level Protection</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {classificationLevels.map((level, index) => (
                <Card key={index} className="bg-white/10 backdrop-blur-sm border border-white/20">
                  <CardHeader>
                    <CardTitle className="text-white text-lg">{level.level}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Systems:</span>
                        <span className="text-white font-semibold">{level.systems}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Access Control:</span>
                        <span className="text-blue-400 font-semibold">{level.access_controls}%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Monitoring:</span>
                        <span className="text-green-400 font-semibold">{level.monitoring}</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2 mt-3">
                        <div 
                          className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all"
                          style={{ width: `${level.access_controls}%` }}
                        ></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Federal Threat Prevention */}
        <section className="py-16 px-6 bg-gradient-to-b from-surface/20 to-background">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-4xl font-bold text-white text-center mb-12">Federal Threat Prevention Statistics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {federalThreatLandscape.map((threat, index) => (
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

        {/* Federal Security Solutions */}
        <section className="py-16 px-6">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-4xl font-bold text-white text-center mb-12">Federal Agency Security Solutions</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {federalChallenges.map((challenge, index) => (
                <Card key={index} className="bg-white/10 backdrop-blur-sm border border-white/20">
                  <CardHeader>
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-blue-500 rounded-xl flex items-center justify-center">
                        {challenge.icon}
                      </div>
                      <CardTitle className="text-2xl text-white">{challenge.title}</CardTitle>
                    </div>
                    <p className="text-gray-300 text-lg mb-4">{challenge.description}</p>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="text-center p-2 bg-black/20 rounded">
                        <div className="text-sm font-bold text-red-400">{challenge.compliance}</div>
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
        <section className="py-20 px-6 bg-gradient-to-r from-red-900/20 to-blue-900/20">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-5xl font-bold text-white mb-8">Secure Federal Operations</h2>
            <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
              Deploy mission-critical cybersecurity solutions designed for federal government departments and agencies with classified system protection, zero trust architecture, and advanced threat defense.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/solutions">
                <Button size="lg" className="bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-700 hover:to-blue-700 px-12 py-4 text-lg">
                  Explore All Solutions
                </Button>
              </Link>
              <Link href="/security-scanner">
                <Button size="lg" variant="outline" className="border-red-500 text-red-400 hover:bg-red-500/10 px-12 py-4 text-lg">
                  Federal Assessment
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