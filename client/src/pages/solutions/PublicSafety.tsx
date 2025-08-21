import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Zap,
  Shield,
  Radio,
  Siren,
  CheckCircle,
  ArrowRight,
  Phone,
  Satellite,
  Users,
  AlertTriangle,
  Eye,
  Database
} from "lucide-react";
import { MarketingLayout } from "@/components/MarketingLayout";
import { Link } from "wouter";

export default function PublicSafety() {
  const publicsafetySolutions = [
    {
      title: "Emergency Response Systems",
      description: "Secure communications and data systems for police, fire, and emergency medical services",
      icon: <Siren className="w-8 h-8" />,
      features: ["CAD system security", "MDT protection", "Emergency communications", "Incident data security"],
      compliance: "CJIS/FirstNet",
      uptime: "99.97%"
    },
    {
      title: "Law Enforcement Security",
      description: "CJIS-compliant cybersecurity for law enforcement agencies and criminal justice systems",
      icon: <Shield className="w-8 h-8" />,
      features: ["CJIS compliance", "Criminal database security", "Evidence management", "Officer safety systems"],
      compliance: "CJIS/FBI Standards",
      uptime: "99.95%"
    },
    {
      title: "FirstNet & Communications",
      description: "Secure communications infrastructure for first responders with redundancy and failover",
      icon: <Radio className="w-8 h-8" />,
      features: ["FirstNet integration", "Radio system security", "Interoperability", "Mission-critical voice"],
      compliance: "FirstNet/3GPP",
      uptime: "99.99%"
    },
    {
      title: "911 & Dispatch Centers",
      description: "Next-generation 911 security with multimedia support and location-based services",
      icon: <Phone className="w-8 h-8" />,
      features: ["NG911 security", "PSAP protection", "Location services", "Multi-media support"],
      compliance: "NENA i3/FCC",
      uptime: "99.98%"
    }
  ];

  const publicsafetyMetrics = [
    { agency: "Police Departments", officers: "847K", calls: "34.2M/year", response_time: "8.3 min" },
    { agency: "Fire Departments", firefighters: "365K", incidents: "12.7M/year", response_time: "6.8 min" },
    { agency: "EMS Services", paramedics: "256K", transports: "23.1M/year", response_time: "7.2 min" },
    { agency: "Emergency Management", coordinators: "89K", events: "2.4M/year", response_time: "15.6 min" }
  ];

  const communicationsSystems = [
    { system: "Computer-Aided Dispatch", deployments: 8947, reliability: 99.97, encryption: "AES-256" },
    { system: "Mobile Data Terminals", deployments: 34567, reliability: 99.85, encryption: "AES-256" },
    { system: "Radio Communications", deployments: 156789, reliability: 99.92, encryption: "P25 AES" },
    { system: "Emergency Notification", deployments: 2456, reliability: 99.89, encryption: "TLS 1.3" }
  ];

  const publicSafetyThreats = [
    { threat: "Communication Jamming", incidents: 67, prevented: 98.5, priority: "Critical" },
    { threat: "Data Breaches", incidents: 23, prevented: 99.1, priority: "High" },
    { threat: "System Intrusions", incidents: 134, prevented: 94.7, priority: "High" },
    { threat: "Service Disruption", incidents: 89, prevented: 96.3, priority: "Medium" }
  ];

  return (
    <MarketingLayout>
      <div className="solutions-light-bg min-h-screen">
        {/* Hero Section */}
        <section className="py-20 px-6 solutions-light-hero">
          <div className="container mx-auto max-w-6xl text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center">
                <Zap className="w-10 h-10 text-white" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold solutions-light-text mb-6 geometric-text">
              Public Safety Cybersecurity
            </h1>
            <p className="text-xl solutions-light-muted mb-8 max-w-4xl mx-auto">
              Mission-critical cybersecurity solutions for law enforcement, fire departments, EMS, and emergency management with CJIS compliance and FirstNet integration.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/security-scanner">
                <Button size="lg" className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 px-12 py-4 text-lg text-white">
                  Public Safety Assessment
                </Button>
              </Link>
              <Link href="/solutions">
                <Button size="lg" variant="outline" className="border-orange-500 text-orange-600 hover:bg-orange-50 px-12 py-4 text-lg">
                  View All Solutions
                  <ArrowRight className="ml-2 w-6 h-6" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Public Safety Benefits */}
        <section className="py-16 px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <Card className="solutions-light-card">
                <CardContent className="p-6 text-center">
                  <Siren className="w-8 h-8 text-orange-500 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-orange-500 mb-2">99.97%</div>
                  <div className="solutions-light-text font-semibold mb-1">System Uptime</div>
                  <div className="solutions-light-muted text-sm">Mission-critical reliability</div>
                </CardContent>
              </Card>
              
              <Card className="solutions-light-card">
                <CardContent className="p-6 text-center">
                  <Radio className="w-8 h-8 text-red-500 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-red-500 mb-2">1.47M</div>
                  <div className="solutions-light-text font-semibold mb-1">First Responders</div>
                  <div className="solutions-light-muted text-sm">Protected nationwide</div>
                </CardContent>
              </Card>

              <Card className="solutions-light-card">
                <CardContent className="p-6 text-center">
                  <Phone className="w-8 h-8 text-blue-500 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-blue-500 mb-2">70.4M</div>
                  <div className="solutions-light-text font-semibold mb-1">Annual Calls</div>
                  <div className="solutions-light-muted text-sm">Securely processed</div>
                </CardContent>
              </Card>

              <Card className="solutions-light-card">
                <CardContent className="p-6 text-center">
                  <AlertTriangle className="w-8 h-8 text-green-500 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-green-500 mb-2">8.1min</div>
                  <div className="solutions-light-text font-semibold mb-1">Avg Response Time</div>
                  <div className="solutions-light-muted text-sm">Nationwide average</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Public Safety Agency Metrics */}
        <section className="py-16 px-6 solutions-light-section">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-4xl font-bold solutions-light-text text-center mb-12">Public Safety Agency Coverage</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {publicsafetyMetrics.map((metric, index) => (
                <Card key={index} className="solutions-light-card">
                  <CardHeader>
                    <CardTitle className="solutions-light-text text-lg">{metric.agency}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="solutions-light-muted">Personnel:</span>
                        <span className="solutions-light-text font-semibold">{metric.officers || metric.firefighters || metric.paramedics || metric.coordinators}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="solutions-light-muted">Volume:</span>
                        <span className="text-orange-500 font-semibold">{metric.calls || metric.incidents || metric.transports || metric.events}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="solutions-light-muted">Response Time:</span>
                        <span className="text-red-500 font-semibold">{metric.response_time}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                        <div className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full w-full"></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Communications Systems Status */}
        <section className="py-16 px-6">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-4xl font-bold solutions-light-text text-center mb-12">Mission-Critical Systems Status</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {communicationsSystems.map((system, index) => (
                <Card key={index} className="solutions-light-card">
                  <CardHeader>
                    <CardTitle className="solutions-light-text text-lg">{system.system}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="solutions-light-muted">Deployments:</span>
                        <span className="solutions-light-text font-semibold">{system.deployments.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="solutions-light-muted">Reliability:</span>
                        <span className="text-green-500 font-semibold">{system.reliability}%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="solutions-light-muted">Encryption:</span>
                        <Badge className="bg-blue-100 text-blue-800 text-xs">{system.encryption}</Badge>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                        <div 
                          className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all"
                          style={{ width: `${system.reliability}%` }}
                        ></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Public Safety Threat Prevention */}
        <section className="py-16 px-6 solutions-light-section">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-4xl font-bold solutions-light-text text-center mb-12">Public Safety Threat Prevention</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {publicSafetyThreats.map((threat, index) => (
                <Card key={index} className="solutions-light-card">
                  <CardHeader>
                    <CardTitle className="solutions-light-text text-lg">{threat.threat}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="solutions-light-muted">Incidents:</span>
                        <span className="solutions-light-text font-semibold">{threat.incidents}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="solutions-light-muted">Prevention:</span>
                        <span className="text-green-500 font-semibold">{threat.prevented}%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="solutions-light-muted">Priority:</span>
                        <Badge className={`text-xs ${threat.priority === 'Critical' ? 'bg-red-100 text-red-800' : threat.priority === 'High' ? 'bg-orange-100 text-orange-800' : 'bg-amber-100 text-amber-800'}`}>
                          {threat.priority}
                        </Badge>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
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

        {/* Public Safety Security Solutions */}
        <section className="py-16 px-6">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-4xl font-bold solutions-light-text text-center mb-12">Public Safety Security Solutions</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {publicsafetySolutions.map((solution, index) => (
                <Card key={index} className="solutions-light-card">
                  <CardHeader>
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center text-white">
                        {solution.icon}
                      </div>
                      <CardTitle className="text-2xl solutions-light-text">{solution.title}</CardTitle>
                    </div>
                    <p className="solutions-light-muted text-lg mb-4">{solution.description}</p>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="text-center p-2 bg-gray-50 rounded">
                        <div className="text-sm font-bold text-orange-500">{solution.compliance}</div>
                        <div className="text-xs solutions-light-muted">Compliance</div>
                      </div>
                      <div className="text-center p-2 bg-gray-50 rounded">
                        <div className="text-sm font-bold text-red-500">{solution.uptime}</div>
                        <div className="text-xs solutions-light-muted">Uptime SLA</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {solution.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center solutions-light-text">
                          <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
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
        <section className="py-20 px-6 bg-gradient-to-r from-orange-50 to-red-50">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-5xl font-bold solutions-light-text mb-8">Protect First Responders & Citizens</h2>
            <p className="text-xl solutions-light-muted mb-10 max-w-3xl mx-auto">
              Deploy mission-critical cybersecurity solutions for public safety agencies with CJIS compliance, FirstNet integration, and 99.97% uptime to protect first responders and the communities they serve.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/solutions">
                <Button size="lg" className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 px-12 py-4 text-lg text-white">
                  Explore All Solutions
                </Button>
              </Link>
              <Link href="/security-scanner">
                <Button size="lg" variant="outline" className="border-orange-500 text-orange-600 hover:bg-orange-50 px-12 py-4 text-lg">
                  Public Safety Assessment
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