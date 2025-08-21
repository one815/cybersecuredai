import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Shield,
  Lock,
  Database,
  AlertTriangle,
  CheckCircle,
  ArrowRight,
  Brain,
  HardDrive,
  Network,
  Zap,
  Target
} from "lucide-react";
import { MarketingLayout } from "@/components/MarketingLayout";
import { Link } from "wouter";

export default function RansomwareProtection() {
  const protectionLayers = [
    {
      title: "Predictive Ransomware Detection",
      description: "AI-powered behavioral analysis identifies ransomware before file encryption begins",
      icon: <Brain className="w-8 h-8" />,
      features: ["Machine learning models", "Behavioral pattern analysis", "Pre-encryption detection", "Zero-day protection"]
    },
    {
      title: "Real-Time File Protection",
      description: "Continuous monitoring and protection of critical files and systems",
      icon: <Shield className="w-8 h-8" />,
      features: ["File integrity monitoring", "Access control enforcement", "Automated backups", "Version recovery"]
    },
    {
      title: "Network Isolation & Containment",
      description: "Automatic network segmentation to prevent ransomware spread",
      icon: <Network className="w-8 h-8" />,
      features: ["Automated isolation", "Lateral movement prevention", "Network segmentation", "Quarantine protocols"]
    },
    {
      title: "Rapid Recovery Systems",
      description: "Automated recovery and restoration processes for ransomware incidents",
      icon: <HardDrive className="w-8 h-8" />,
      features: ["Automated restoration", "Clean backup verification", "System rollback", "Business continuity"]
    }
  ];

  const industryStats = [
    { sector: "K-12 Education", attacks: "45% increase", recovery: "72 hours avg", protection: "99.2%" },
    { sector: "Higher Education", attacks: "38% increase", recovery: "48 hours avg", protection: "98.7%" },
    { sector: "Municipal Gov", attacks: "52% increase", recovery: "96 hours avg", protection: "99.1%" },
    { sector: "Federal Agencies", attacks: "31% increase", recovery: "24 hours avg", protection: "99.8%" }
  ];

  const ransomwareFamilies = [
    { name: "Ryuk", detectionRate: 99.8, samples: "2,847 samples analyzed" },
    { name: "Maze", detectionRate: 99.5, samples: "1,923 samples analyzed" },
    { name: "Sodinokibi", detectionRate: 99.7, samples: "2,156 samples analyzed" },
    { name: "DarkSide", detectionRate: 99.9, samples: "1,634 samples analyzed" }
  ];

  return (
    <MarketingLayout>
      <div className="solutions-light-bg min-h-screen">
        {/* Hero Section */}
        <section className="py-20 px-6 solutions-light-hero">
          <div className="container mx-auto max-w-6xl text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl flex items-center justify-center">
                <Shield className="w-10 h-10 text-white" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold solutions-light-text mb-6 geometric-text">
              Advanced Ransomware Protection
            </h1>
            <p className="text-xl solutions-light-muted mb-8 max-w-4xl mx-auto">
              Multi-layered ransomware defense with AI-powered detection and automated response capabilities designed for educational institutions and government organizations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/security-scanner">
                <Button size="lg" className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 px-12 py-4 text-lg text-white">
                  Free Security Assessment
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

        {/* Protection Statistics */}
        <section className="py-16 px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <Card className="solutions-light-card">
                <CardContent className="p-6 text-center">
                  <Target className="w-8 h-8 text-red-500 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-red-500 mb-2">99.8%</div>
                  <div className="solutions-light-text font-semibold mb-1">Detection Rate</div>
                  <div className="solutions-light-muted text-sm">Including zero-days</div>
                </CardContent>
              </Card>
              
              <Card className="solutions-light-card">
                <CardContent className="p-6 text-center">
                  <Zap className="w-8 h-8 text-orange-500 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-orange-500 mb-2">&lt; 30s</div>
                  <div className="solutions-light-text font-semibold mb-1">Response Time</div>
                  <div className="solutions-light-muted text-sm">Automated containment</div>
                </CardContent>
              </Card>

              <Card className="solutions-light-card">
                <CardContent className="p-6 text-center">
                  <Database className="w-8 h-8 text-green-500 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-green-500 mb-2">2.4M</div>
                  <div className="solutions-light-text font-semibold mb-1">Files Protected</div>
                  <div className="solutions-light-muted text-sm">Continuously monitored</div>
                </CardContent>
              </Card>

              <Card className="solutions-light-card">
                <CardContent className="p-6 text-center">
                  <Lock className="w-8 h-8 text-blue-500 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-blue-500 mb-2">87%</div>
                  <div className="solutions-light-text font-semibold mb-1">Cost Reduction</div>
                  <div className="solutions-light-muted text-sm">Vs manual recovery</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Ransomware Family Detection */}
        <section className="py-16 px-6 solutions-light-section">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-4xl font-bold solutions-light-text text-center mb-12">Ransomware Family Detection Rates</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {ransomwareFamilies.map((family, index) => (
                <Card key={index} className="solutions-light-card">
                  <CardContent className="p-6 text-center">
                    <h4 className="solutions-light-text font-semibold mb-4 text-xl">{family.name}</h4>
                    <div className="text-4xl font-bold text-orange-500 mb-3">{family.detectionRate}%</div>
                    <div className="solutions-light-muted text-sm mb-4">{family.samples}</div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full transition-all"
                        style={{ width: `${family.detectionRate}%` }}
                      ></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Industry Impact Statistics */}
        <section className="py-16 px-6">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-4xl font-bold solutions-light-text text-center mb-12">Industry Ransomware Impact & Protection</h2>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {industryStats.map((stat, index) => (
                <Card key={index} className="solutions-light-card">
                  <CardHeader>
                    <CardTitle className="solutions-light-text text-lg">{stat.sector}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="solutions-light-muted">Attack Increase:</span>
                        <span className="text-red-500 font-semibold">{stat.attacks}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="solutions-light-muted">Recovery Time:</span>
                        <span className="text-amber-500 font-semibold">{stat.recovery}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="solutions-light-muted">Our Protection:</span>
                        <span className="text-green-500 font-semibold">{stat.protection}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                        <div 
                          className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all"
                          style={{ width: stat.protection }}
                        ></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Protection Layers */}
        <section className="py-16 px-6 solutions-light-section">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-4xl font-bold solutions-light-text text-center mb-12">Multi-Layered Protection Architecture</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {protectionLayers.map((layer, index) => (
                <Card key={index} className="solutions-light-card">
                  <CardHeader>
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl flex items-center justify-center text-white">
                        {layer.icon}
                      </div>
                      <CardTitle className="text-2xl solutions-light-text">{layer.title}</CardTitle>
                    </div>
                    <p className="solutions-light-muted text-lg">{layer.description}</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {layer.features.map((feature, idx) => (
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
        <section className="py-20 px-6 bg-gradient-to-r from-red-50 to-orange-50">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-5xl font-bold solutions-light-text mb-8">Protect Against Ransomware Attacks</h2>
            <p className="text-xl solutions-light-muted mb-10 max-w-3xl mx-auto">
              Deploy comprehensive ransomware protection with AI-powered detection, automated response, and rapid recovery capabilities designed for educational institutions and government organizations.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/solutions">
                <Button size="lg" className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 px-12 py-4 text-lg text-white">
                  Explore All Solutions
                </Button>
              </Link>
              <Link href="/security-scanner">
                <Button size="lg" variant="outline" className="border-red-500 text-red-600 hover:bg-red-50 px-12 py-4 text-lg">
                  Free Security Assessment
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