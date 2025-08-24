import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Shield, 
  Users, 
  Globe, 
  Clock, 
  Database, 
  Activity, 
  TrendingUp, 
  CheckCircle,
  Building,
  GraduationCap,
  Landmark,
  Hospital,
  Banknote,
  Server,
  AlertTriangle,
  Eye
} from "lucide-react";
import { Link } from "wouter";

export default function MISPBenefits() {
  const industryBeneficiaries = [
    {
      icon: Landmark,
      title: "Government & Public Sector",
      description: "National cybersecurity centers, CSIRTs, and federal agencies",
      benefits: [
        "Real-time national threat monitoring",
        "Cross-agency intelligence sharing",
        "Critical infrastructure protection",
        "Compliance with federal security standards"
      ],
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: GraduationCap,
      title: "Educational Institutions",
      description: "Universities, K-12 districts, and research institutions",
      benefits: [
        "Protect sensitive research data",
        "FERPA compliance monitoring",
        "Campus-wide threat visibility",
        "Budget-conscious security solutions"
      ],
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Banknote,
      title: "Financial Services",
      description: "Banks, credit unions, and financial institutions",
      benefits: [
        "Real-time fraud detection",
        "Regulatory compliance tracking",
        "Customer data protection",
        "24/7 threat monitoring"
      ],
      color: "from-orange-500 to-red-500"
    },
    {
      icon: Hospital,
      title: "Healthcare Organizations",
      description: "Hospitals, clinics, and healthcare networks",
      benefits: [
        "HIPAA compliance assurance",
        "Patient data protection",
        "Medical device security",
        "Ransomware prevention"
      ],
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Building,
      title: "Critical Infrastructure",
      description: "Energy, utilities, and transportation sectors",
      benefits: [
        "Industrial control system protection",
        "Supply chain threat monitoring",
        "Operational technology security",
        "Business continuity assurance"
      ],
      color: "from-slate-500 to-gray-500"
    },
    {
      icon: Server,
      title: "Managed Security Providers",
      description: "MSSPs and cybersecurity service providers",
      benefits: [
        "Multi-client threat monitoring",
        "Scalable security operations",
        "Enhanced service offerings",
        "Competitive differentiation"
      ],
      color: "from-indigo-500 to-blue-500"
    }
  ];

  const keyCapabilities = [
    {
      icon: Activity,
      title: "Real-Time Threat Intelligence",
      description: "Live feeds from 8+ official MISP sources with automatic IOC collection",
      metrics: "1,652+ malicious IPs tracked"
    },
    {
      icon: Globe,
      title: "Global Situational Awareness",
      description: "Geolocation-based threat mapping with country-level threat analysis",
      metrics: "50+ countries monitored"
    },
    {
      icon: TrendingUp,
      title: "Trending Threat Analysis",
      description: "AI-powered identification of emerging threats and attack patterns",
      metrics: "Real-time pattern detection"
    },
    {
      icon: Users,
      title: "Collaborative Intelligence",
      description: "Organization contribution tracking and gamified threat sharing",
      metrics: "Cross-organization insights"
    },
    {
      icon: Eye,
      title: "Live Activity Monitoring",
      description: "Continuous stream of IOC sightings, events, and security updates",
      metrics: "Sub-second alerting"
    },
    {
      icon: Database,
      title: "Comprehensive Feed Integration",
      description: "Official MISP feeds including CIRCL, Shadowserver, and Emerging Threats",
      metrics: "8 active threat feeds"
    }
  ];

  const roiMetrics = [
    { label: "Threat Detection Speed", value: "85% faster", description: "Compared to manual analysis" },
    { label: "False Positive Reduction", value: "70% decrease", description: "Through AI-powered filtering" },
    { label: "Security Team Efficiency", value: "3x improvement", description: "Automated threat correlation" },
    { label: "Incident Response Time", value: "2.1 min average", description: "From detection to action" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Hero Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <Badge className="mb-6 bg-green-500/20 text-green-400 border-green-500/30">
            Live MISP Threat Intelligence
          </Badge>
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
            Real-Time Threat Intelligence for Critical Organizations
          </h1>
          <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
            CyberSecure AI's MISP Live Dashboard provides government agencies, educational institutions, and critical infrastructure with real-time threat intelligence from official feeds worldwide.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/misp-live">
              <Button size="lg" className="bg-green-500 hover:bg-green-600 text-white">
                <Activity className="w-5 h-5 mr-2" />
                View Live Dashboard
              </Button>
            </Link>
            <Link href="/client-login">
              <Button size="lg" variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800">
                Request Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Industry Beneficiaries */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Who Benefits Most</h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              Organizations protecting critical infrastructure, sensitive data, and public safety rely on our MISP integration for comprehensive threat intelligence.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industryBeneficiaries.map((industry, index) => (
              <Card key={index} className="bg-slate-800 border-slate-700 hover:border-slate-600 transition-colors">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${industry.color} flex items-center justify-center mb-4`}>
                    <industry.icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">{industry.title}</CardTitle>
                  <p className="text-slate-400">{industry.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {industry.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-slate-300">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Key Capabilities */}
      <section className="py-20 px-6 bg-slate-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Advanced MISP Capabilities</h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              Our implementation goes beyond basic threat feeds to provide actionable intelligence with real-time analysis and collaborative features.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {keyCapabilities.map((capability, index) => (
              <Card key={index} className="bg-slate-900 border-slate-700">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 rounded-lg bg-gradient-to-r from-green-500 to-cyan-500">
                      <capability.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-2">{capability.title}</h3>
                      <p className="text-slate-400 text-sm mb-3">{capability.description}</p>
                      <Badge variant="outline" className="text-xs border-green-500/30 text-green-400">
                        {capability.metrics}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ROI Metrics */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Measurable Security ROI</h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              Organizations using our MISP Live Dashboard see immediate improvements in threat detection speed, accuracy, and security team efficiency.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {roiMetrics.map((metric, index) => (
              <Card key={index} className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700 text-center">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-green-400 mb-2">{metric.value}</div>
                  <div className="text-lg font-semibold mb-2">{metric.label}</div>
                  <div className="text-sm text-slate-400">{metric.description}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Live Dashboard Preview */}
      <section className="py-20 px-6 bg-slate-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Experience Real-Time Intelligence</h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              See live threat data from official MISP feeds with our interactive dashboard designed for security operations centers and threat analysis teams.
            </p>
          </div>
          
          <Card className="bg-slate-900 border-slate-700 overflow-hidden">
            <CardContent className="p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-lg font-semibold">Live MISP Dashboard</span>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                    429 Active IOCs
                  </Badge>
                </div>
                <Link href="/misp-live">
                  <Button variant="outline" className="border-green-500 text-green-400 hover:bg-green-500/10">
                    <Eye className="w-4 h-4 mr-2" />
                    View Full Dashboard
                  </Button>
                </Link>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-slate-800 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-cyan-400">8</div>
                  <div className="text-sm text-slate-400">Active Feeds</div>
                </div>
                <div className="bg-slate-800 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-orange-400">429</div>
                  <div className="text-sm text-slate-400">Malicious IPs</div>
                </div>
                <div className="bg-slate-800 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-red-400">56</div>
                  <div className="text-sm text-slate-400">Malicious Domains</div>
                </div>
                <div className="bg-slate-800 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-green-400">2min</div>
                  <div className="text-sm text-slate-400">Data Freshness</div>
                </div>
              </div>
              
              <div className="bg-slate-800 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Activity className="w-5 h-5 mr-2 text-green-400" />
                  Live Activity Stream
                </h3>
                <div className="space-y-3">
                  {[
                    { type: "IOC", desc: "New malicious IP detected from ELLIO feed", time: "2s ago", severity: "high" },
                    { type: "Event", desc: "Threat actor campaign published to CIRCL", time: "15s ago", severity: "critical" },
                    { type: "Sighting", desc: "Botnet C2 domain confirmed active", time: "34s ago", severity: "medium" }
                  ].map((activity, i) => (
                    <div key={i} className="flex items-center space-x-3 p-3 bg-slate-700/50 rounded">
                      <AlertTriangle className={`w-4 h-4 ${
                        activity.severity === 'critical' ? 'text-red-500' : 
                        activity.severity === 'high' ? 'text-orange-500' : 'text-yellow-500'
                      }`} />
                      <div className="flex-1">
                        <div className="text-sm font-medium">{activity.desc}</div>
                        <div className="text-xs text-slate-400">{activity.time}</div>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {activity.type}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Enhance Your Threat Intelligence?</h2>
          <p className="text-xl text-slate-400 mb-8">
            Join leading government agencies, educational institutions, and critical infrastructure organizations using CyberSecure AI's MISP Live Dashboard.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/misp-live">
              <Button size="lg" className="bg-green-500 hover:bg-green-600 text-white">
                <Shield className="w-5 h-5 mr-2" />
                Access Live Dashboard
              </Button>
            </Link>
            <Link href="/client-login">
              <Button size="lg" variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800">
                Schedule Consultation
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}