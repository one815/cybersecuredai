import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Building,
  Shield,
  Lock,
  Eye,
  CheckCircle,
  ArrowRight,
  Database,
  Network,
  Users,
  Flag,
  AlertTriangle,
  Settings
} from "lucide-react";
import { MarketingLayout } from "@/components/MarketingLayout";
import { Link } from "wouter";

export default function Government() {
  const governmentSolutions = [
    {
      title: "Federal Agency Security",
      description: "FedRAMP and FISMA compliant cybersecurity solutions for federal government agencies",
      icon: <Flag className="w-8 h-8" />,
      features: ["FedRAMP authorization", "FISMA compliance", "Continuous monitoring", "Risk management framework"],
      compliance: "FedRAMP High",
      clearance: "Public Trust to Top Secret"
    },
    {
      title: "State & Local Government",
      description: "Comprehensive cybersecurity for state agencies, counties, and municipal governments",
      icon: <Building className="w-8 h-8" />,
      features: ["Multi-jurisdiction support", "Citizen data protection", "Emergency response systems", "Inter-agency collaboration"],
      compliance: "CJIS/NIST 800-53",
      clearance: "Public Trust"
    },
    {
      title: "Critical Infrastructure",
      description: "Protection for essential services including utilities, transportation, and emergency systems",
      icon: <Network className="w-8 h-8" />,
      features: ["SCADA security", "ICS protection", "Operational technology", "24/7 monitoring"],
      compliance: "NERC CIP/ICS-CERT",
      clearance: "Sensitive Security Information"
    },
    {
      title: "Citizen Services Security",
      description: "Secure digital government services and citizen data protection with privacy controls",
      icon: <Users className="w-8 h-8" />,
      features: ["Digital identity management", "Privacy protection", "Secure portals", "Mobile government services"],
      compliance: "Privacy Act/GDPR",
      clearance: "Controlled Unclassified Information"
    }
  ];

  const agencyMetrics = [
    { agency: "Federal Departments", employees: "2.8M", systems: "15,647", security_score: 96 },
    { agency: "State Agencies", employees: "5.2M", systems: "24,891", security_score: 93 },
    { agency: "Local Governments", employees: "14.1M", systems: "67,234", security_score: 89 },
    { agency: "Critical Infrastructure", employees: "3.6M", systems: "8,456", security_score: 98 }
  ];

  const complianceFrameworks = [
    { framework: "FedRAMP High", coverage: 98.7, controls: 421, status: "Authorized" },
    { framework: "FISMA Moderate", coverage: 99.2, controls: 325, status: "Compliant" },
    { framework: "NIST 800-53", coverage: 97.8, controls: 978, status: "Implemented" },
    { framework: "CJIS Security Policy", coverage: 96.4, controls: 289, status: "Certified" }
  ];

  const governmentThreats = [
    { threat: "Nation-State Attacks", incidents: 89, prevented: 97.3, classification: "Top Secret" },
    { threat: "Insider Threats", incidents: 34, prevented: 91.2, classification: "Secret" },
    { threat: "Supply Chain Attacks", incidents: 67, prevented: 94.8, classification: "Confidential" },
    { threat: "Critical Infrastructure", incidents: 23, prevented: 99.1, classification: "Sensitive" }
  ];

  return (
    <MarketingLayout>
      <div className="solutions-light-bg min-h-screen">
        {/* Hero Section */}
        <section className="py-20 px-6 solutions-light-hero">
          <div className="container mx-auto max-w-6xl text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-blue-500 rounded-2xl flex items-center justify-center">
                <Building className="w-10 h-10 text-white" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold solutions-light-text mb-6 geometric-text">
              Government Cybersecurity Solutions
            </h1>
            <p className="text-xl solutions-light-muted mb-8 max-w-4xl mx-auto">
              Comprehensive cybersecurity solutions for federal, state, and local government agencies with FedRAMP and FISMA compliance, citizen data protection, and national security capabilities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/security-scanner">
                <Button size="lg" className="bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-700 hover:to-blue-700 px-12 py-4 text-lg text-white">
                  Government Security Assessment
                </Button>
              </Link>
              <Link href="/solutions">
                <Button size="lg" variant="outline" className="border-red-500 text-red-600 hover:bg-red-50 px-12 py-4 text-lg">
                  View All Solutions
                  <ArrowRight className="ml-2 w-6 h-6" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Government Security Benefits */}
        <section className="py-16 px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <Card className="solutions-light-card">
                <CardContent className="p-6 text-center">
                  <Shield className="w-8 h-8 text-red-500 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-red-500 mb-2">98.7%</div>
                  <div className="solutions-light-text font-semibold mb-1">FedRAMP Compliance</div>
                  <div className="solutions-light-muted text-sm">High baseline controls</div>
                </CardContent>
              </Card>
              
              <Card className="solutions-light-card">
                <CardContent className="p-6 text-center">
                  <Eye className="w-8 h-8 text-blue-500 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-blue-500 mb-2">24/7</div>
                  <div className="solutions-light-text font-semibold mb-1">Security Operations</div>
                  <div className="solutions-light-muted text-sm">Continuous monitoring</div>
                </CardContent>
              </Card>

              <Card className="solutions-light-card">
                <CardContent className="p-6 text-center">
                  <Lock className="w-8 h-8 text-green-500 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-green-500 mb-2">456M</div>
                  <div className="solutions-light-text font-semibold mb-1">Citizens Protected</div>
                  <div className="solutions-light-muted text-sm">Across all levels</div>
                </CardContent>
              </Card>

              <Card className="solutions-light-card">
                <CardContent className="p-6 text-center">
                  <Database className="w-8 h-8 text-purple-500 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-purple-500 mb-2">73%</div>
                  <div className="solutions-light-text font-semibold mb-1">Cost Efficiency</div>
                  <div className="solutions-light-muted text-sm">Vs traditional methods</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Agency Coverage Statistics */}
        <section className="py-16 px-6 solutions-light-section">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-4xl font-bold solutions-light-text text-center mb-12">Government Agency Coverage</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {agencyMetrics.map((agency, index) => (
                <Card key={index} className="solutions-light-card">
                  <CardHeader>
                    <CardTitle className="solutions-light-text text-lg">{agency.agency}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="solutions-light-muted">Employees:</span>
                        <span className="solutions-light-text font-semibold">{agency.employees}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="solutions-light-muted">Systems:</span>
                        <span className="text-blue-500 font-semibold">{agency.systems}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="solutions-light-muted">Security Score:</span>
                        <span className="text-green-500 font-semibold">{agency.security_score}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                        <div 
                          className="bg-gradient-to-r from-red-500 to-blue-500 h-2 rounded-full transition-all"
                          style={{ width: `${agency.security_score}%` }}
                        ></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Compliance Framework Status */}
        <section className="py-16 px-6">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-4xl font-bold solutions-light-text text-center mb-12">Government Compliance Framework Status</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {complianceFrameworks.map((framework, index) => (
                <Card key={index} className="solutions-light-card">
                  <CardHeader>
                    <CardTitle className="solutions-light-text text-lg">{framework.framework}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="solutions-light-muted">Coverage:</span>
                        <span className="text-green-500 font-semibold">{framework.coverage}%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="solutions-light-muted">Controls:</span>
                        <span className="solutions-light-text font-semibold">{framework.controls}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="solutions-light-muted">Status:</span>
                        <Badge className="bg-green-100 text-green-800 text-xs">{framework.status}</Badge>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                        <div 
                          className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all"
                          style={{ width: `${framework.coverage}%` }}
                        ></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Government Threat Landscape */}
        <section className="py-16 px-6 solutions-light-section">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-4xl font-bold solutions-light-text text-center mb-12">Government Threat Prevention Metrics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {governmentThreats.map((threat, index) => (
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
                        <span className="solutions-light-muted">Classification:</span>
                        <Badge className="bg-red-100 text-red-800 text-xs">{threat.classification}</Badge>
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

        {/* Government Security Solutions */}
        <section className="py-16 px-6">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-4xl font-bold solutions-light-text text-center mb-12">Government Security Solutions</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {governmentSolutions.map((solution, index) => (
                <Card key={index} className="solutions-light-card">
                  <CardHeader>
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-blue-500 rounded-xl flex items-center justify-center text-white">
                        {solution.icon}
                      </div>
                      <CardTitle className="text-2xl solutions-light-text">{solution.title}</CardTitle>
                    </div>
                    <p className="solutions-light-muted text-lg mb-4">{solution.description}</p>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="text-center p-2 bg-gray-50 rounded">
                        <div className="text-sm font-bold text-red-500">{solution.compliance}</div>
                        <div className="text-xs solutions-light-muted">Compliance</div>
                      </div>
                      <div className="text-center p-2 bg-gray-50 rounded">
                        <div className="text-sm font-bold text-blue-500">{solution.clearance}</div>
                        <div className="text-xs solutions-light-muted">Clearance Level</div>
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
        <section className="py-20 px-6 bg-gradient-to-r from-red-50 to-blue-50">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-5xl font-bold solutions-light-text mb-8">Secure Government Operations</h2>
            <p className="text-xl solutions-light-muted mb-10 max-w-3xl mx-auto">
              Deploy comprehensive cybersecurity solutions for government agencies with FedRAMP and FISMA compliance, citizen data protection, and national security capabilities across federal, state, and local levels.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/solutions">
                <Button size="lg" className="bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-700 hover:to-blue-700 px-12 py-4 text-lg text-white">
                  Explore All Solutions
                </Button>
              </Link>
              <Link href="/security-scanner">
                <Button size="lg" variant="outline" className="border-red-500 text-red-600 hover:bg-red-50 px-12 py-4 text-lg">
                  Government Assessment
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