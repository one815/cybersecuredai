import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Building2,
  Shield,
  Users,
  Database,
  MapPin,
  CheckCircle,
  ArrowRight,
  Eye,
  Lock,
  Phone,
  FileText,
  Zap,
  Globe
} from "lucide-react";
import { MarketingLayout } from "@/components/MarketingLayout";
import { Link } from "wouter";

export default function MunicipalGovernment() {
  const municipalChallenges = [
    {
      title: "Citizen Data Protection",
      description: "Comprehensive protection of citizen records, personal information, and public service data",
      icon: <Users className="w-8 h-8" />,
      features: ["PII protection", "Records management", "Privacy controls", "Access logging"],
      compliance: "GDPR/CCPA",
      protection: "99.3%"
    },
    {
      title: "Emergency Services Security",
      description: "Critical infrastructure protection for 911 systems, first responders, and emergency communications",
      icon: <Phone className="w-8 h-8" />,
      features: ["911 system security", "First responder comms", "Emergency protocols", "Disaster recovery"],
      compliance: "NIMS/ICS",
      protection: "99.8%"
    },
    {
      title: "Public Infrastructure Monitoring",
      description: "IoT and SCADA system security for water, power, transportation, and public facilities",
      icon: <Zap className="w-8 h-8" />,
      features: ["SCADA security", "IoT monitoring", "Infrastructure protection", "Smart city integration"],
      compliance: "NERC/NIST",
      protection: "97.6%"
    },
    {
      title: "Government Service Portals",
      description: "Secure online citizen portals for permits, payments, records, and municipal services",
      icon: <Globe className="w-8 h-8" />,
      features: ["Portal security", "Payment processing", "Document management", "Service integration"],
      compliance: "PCI DSS/SOX",
      protection: "98.4%"
    }
  ];

  const municipalStats = [
    { city: "Metro Cities (500K+)", citizens: "847K", services: "156", security_score: 94 },
    { city: "Mid-Size Cities (100-500K)", citizens: "234K", services: "89", security_score: 91 },
    { city: "Small Cities (50-100K)", citizens: "78K", services: "67", security_score: 93 },
    { city: "Towns & Villages (<50K)", citizens: "23K", services: "34", security_score: 89 }
  ];

  const publicSafety = [
    { department: "Police Department", officers: 456, systems: 12, uptime: 99.9 },
    { department: "Fire & EMS", personnel: 234, systems: 8, uptime: 99.8 },
    { department: "Emergency Management", staff: 67, systems: 15, uptime: 99.7 },
    { department: "Public Works", workers: 189, systems: 23, uptime: 98.9 }
  ];

  const governmentThreatLandscape = [
    { threat: "Ransomware Attacks", incidents: 34, prevented: 97.1, impact: "Critical" },
    { threat: "Data Breaches", incidents: 12, prevented: 99.2, impact: "High" },
    { threat: "Infrastructure Attacks", incidents: 8, prevented: 98.8, impact: "Critical" },
    { threat: "Phishing Campaigns", incidents: 167, prevented: 94.6, impact: "Medium" }
  ];

  return (
    <MarketingLayout>
      <div className="min-h-screen bg-gradient-to-br from-background via-surface/50 to-background">
        {/* Hero Section */}
        <section className="py-20 px-6 bg-gradient-to-br from-cyan-50/10 via-orange-50/10 to-background">
          <div className="container mx-auto max-w-6xl text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-r from-cyan-500 to-orange-500 rounded-2xl flex items-center justify-center">
                <Building2 className="w-10 h-10 text-white" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 geometric-text">
              Municipal Government Security
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-4xl mx-auto">
              Comprehensive cybersecurity solutions for city and local governments with citizen data protection, emergency services security, and public infrastructure monitoring.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/security-scanner">
                <Button size="lg" className="bg-gradient-to-r from-cyan-600 to-orange-600 hover:from-cyan-700 hover:to-orange-700 px-12 py-4 text-lg">
                  Municipal Security Assessment
                </Button>
              </Link>
              <Link href="/solutions">
                <Button size="lg" variant="outline" className="border-cyan-500 text-cyan-400 hover:bg-cyan-500/10 px-12 py-4 text-lg">
                  View All Solutions
                  <ArrowRight className="ml-2 w-6 h-6" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Municipal Security Benefits */}
        <section className="py-16 px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <Card className="bg-white/10 backdrop-blur-sm border border-white/20">
                <CardContent className="p-6 text-center">
                  <Users className="w-8 h-8 text-cyan-400 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-cyan-400 mb-2">1.2M</div>
                  <div className="text-white font-semibold mb-1">Citizens Protected</div>
                  <div className="text-gray-400 text-sm">Across all municipalities</div>
                </CardContent>
              </Card>
              
              <Card className="bg-white/10 backdrop-blur-sm border border-white/20">
                <CardContent className="p-6 text-center">
                  <Shield className="w-8 h-8 text-orange-400 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-orange-400 mb-2">99.1%</div>
                  <div className="text-white font-semibold mb-1">Service Uptime</div>
                  <div className="text-gray-400 text-sm">Critical systems availability</div>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-sm border border-white/20">
                <CardContent className="p-6 text-center">
                  <Phone className="w-8 h-8 text-green-400 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-green-400 mb-2">58</div>
                  <div className="text-white font-semibold mb-1">Emergency Systems</div>
                  <div className="text-gray-400 text-sm">911 & public safety</div>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-sm border border-white/20">
                <CardContent className="p-6 text-center">
                  <Database className="w-8 h-8 text-purple-400 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-purple-400 mb-2">73%</div>
                  <div className="text-white font-semibold mb-1">Cost Efficiency</div>
                  <div className="text-gray-400 text-sm">Vs traditional IT security</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Municipal Coverage Stats */}
        <section className="py-16 px-6 bg-gradient-to-b from-surface/20 to-background">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-4xl font-bold text-white text-center mb-12">Municipal Government Coverage</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {municipalStats.map((stat, index) => (
                <Card key={index} className="bg-white/10 backdrop-blur-sm border border-white/20">
                  <CardHeader>
                    <CardTitle className="text-white text-lg">{stat.city}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Citizens:</span>
                        <span className="text-white font-semibold">{stat.citizens}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Services:</span>
                        <span className="text-cyan-400 font-semibold">{stat.services}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Security Score:</span>
                        <span className="text-green-400 font-semibold">{stat.security_score}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2 mt-3">
                        <div 
                          className="bg-gradient-to-r from-cyan-500 to-orange-500 h-2 rounded-full transition-all"
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

        {/* Public Safety Systems */}
        <section className="py-16 px-6">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-4xl font-bold text-white text-center mb-12">Public Safety System Protection</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {publicSafety.map((dept, index) => (
                <Card key={index} className="bg-white/10 backdrop-blur-sm border border-white/20">
                  <CardHeader>
                    <CardTitle className="text-white text-lg">{dept.department}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Personnel:</span>
                        <span className="text-white font-semibold">{dept.officers || dept.personnel || dept.staff || dept.workers}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Systems:</span>
                        <span className="text-cyan-400 font-semibold">{dept.systems}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Uptime:</span>
                        <span className="text-green-400 font-semibold">{dept.uptime}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2 mt-3">
                        <div 
                          className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all"
                          style={{ width: `${dept.uptime}%` }}
                        ></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Government Threat Prevention */}
        <section className="py-16 px-6 bg-gradient-to-b from-surface/20 to-background">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-4xl font-bold text-white text-center mb-12">Municipal Threat Prevention Statistics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {governmentThreatLandscape.map((threat, index) => (
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

        {/* Municipal Security Solutions */}
        <section className="py-16 px-6">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-4xl font-bold text-white text-center mb-12">Municipal Security Solutions</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {municipalChallenges.map((challenge, index) => (
                <Card key={index} className="bg-white/10 backdrop-blur-sm border border-white/20">
                  <CardHeader>
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-orange-500 rounded-xl flex items-center justify-center">
                        {challenge.icon}
                      </div>
                      <CardTitle className="text-2xl text-white">{challenge.title}</CardTitle>
                    </div>
                    <p className="text-gray-300 text-lg mb-4">{challenge.description}</p>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="text-center p-2 bg-black/20 rounded">
                        <div className="text-sm font-bold text-cyan-400">{challenge.compliance}</div>
                        <div className="text-xs text-gray-400">Compliance</div>
                      </div>
                      <div className="text-center p-2 bg-black/20 rounded">
                        <div className="text-sm font-bold text-orange-400">{challenge.protection}</div>
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
        <section className="py-20 px-6 bg-gradient-to-r from-cyan-900/20 to-orange-900/20">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-5xl font-bold text-white mb-8">Secure Your Municipal Services</h2>
            <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
              Deploy comprehensive cybersecurity solutions designed for city and local governments with citizen data protection, emergency services security, and critical infrastructure monitoring.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/solutions">
                <Button size="lg" className="bg-gradient-to-r from-cyan-600 to-orange-600 hover:from-cyan-700 hover:to-orange-700 px-12 py-4 text-lg">
                  Explore All Solutions
                </Button>
              </Link>
              <Link href="/security-scanner">
                <Button size="lg" variant="outline" className="border-cyan-500 text-cyan-400 hover:bg-cyan-500/10 px-12 py-4 text-lg">
                  Municipal Assessment
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