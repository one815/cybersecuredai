import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Flag,
  Shield,
  Lock,
  Database,
  Eye,
  CheckCircle,
  ArrowRight,
  Settings,
  Activity,
  AlertTriangle,
  Key,
  Brain,
  Globe,
  Server
} from "lucide-react";
import { MarketingLayout } from "@/components/MarketingLayout";
import { Link } from "wouter";
import { useState, useEffect } from "react";

export default function FederalAgencies() {
  const [classifiedSystems, setClassifiedSystems] = useState(127);
  const [securityClearances, setSecurityClearances] = useState(8947);
  const [threatsBlocked, setThreatsBlocked] = useState(1847);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [liveActivity, setLiveActivity] = useState([
    { event: "Classified Access", action: "Secret clearance validated", classification: "SECRET", status: "AUTHORIZED", location: "DC Facility" },
    { event: "Threat Intelligence", action: "APT activity detected and blocked", classification: "UNCLASSIFIED", status: "NEUTRALIZED", location: "Network SOC" },
    { event: "FISMA Compliance", action: "Security controls assessment completed", classification: "UNCLASSIFIED", status: "COMPLIANT", location: "Data Center" },
    { event: "Zero Trust", action: "Identity verification enforced", classification: "CONFIDENTIAL", status: "VERIFIED", location: "Remote Access" }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
      if (Math.random() > 0.8) {
        setClassifiedSystems(Math.floor(Math.random() * 10) + 125);
        setSecurityClearances(Math.floor(Math.random() * 100) + 8900);
        setThreatsBlocked(prev => prev + Math.floor(Math.random() * 5));
        
        // Update live activity
        const events = ["Classified Access", "Threat Intelligence", "FISMA Compliance", "Zero Trust", "Incident Response"];
        const actions = ["Clearance validated", "Threat neutralized", "Audit completed", "Access verified", "Breach contained"];
        const classifications = ["UNCLASSIFIED", "CONFIDENTIAL", "SECRET", "TOP SECRET"];
        const statuses = ["AUTHORIZED", "NEUTRALIZED", "COMPLIANT", "VERIFIED", "CONTAINED"];
        const locations = ["DC Facility", "Network SOC", "Data Center", "Field Office", "SCIF"];
        
        const newActivity = {
          event: events[Math.floor(Math.random() * events.length)],
          action: actions[Math.floor(Math.random() * actions.length)],
          classification: classifications[Math.floor(Math.random() * classifications.length)],
          status: statuses[Math.floor(Math.random() * statuses.length)],
          location: locations[Math.floor(Math.random() * locations.length)]
        };
        
        setLiveActivity(prev => [newActivity, ...prev.slice(0, 5)]);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const federalSolutions = [
    {
      title: "Classified Information Systems",
      description: "Ultra-secure protection for classified and sensitive government information at all classification levels",
      icon: <Lock className="w-8 h-8" />,
      features: ["Multi-level security", "Classification controls", "Compartmented access", "Air-gapped networks"],
      metrics: { systems: "127", clearances: "8.9K+", uptime: "99.99%" }
    },
    {
      title: "FISMA & FedRAMP Compliance",
      description: "Comprehensive compliance framework meeting all federal security requirements and regulations",
      icon: <CheckCircle className="w-8 h-8" />,
      features: ["FISMA controls", "FedRAMP authorization", "NIST framework", "Continuous monitoring"],
      metrics: { controls: "800+", compliance: "100%", audits: "Quarterly" }
    },
    {
      title: "Advanced Persistent Threat Defense",
      description: "Nation-state level threat protection with advanced detection and response capabilities",
      icon: <Brain className="w-8 h-8" />,
      features: ["APT detection", "Attribution analysis", "Threat hunting", "Nation-state defense"],
      metrics: { threats: "1.8K+", accuracy: "99.3%", response: "&lt; 15min" }
    },
    {
      title: "Zero Trust for Government",
      description: "Government-grade zero trust architecture with continuous verification and least privilege access",
      icon: <Eye className="w-8 h-8" />,
      features: ["Continuous verification", "Least privilege", "Identity governance", "Device trust"],
      metrics: { verification: "24/7", policies: "247", trust_score: "97.8%" }
    }
  ];

  const agencyTypes = [
    { agency: "Defense Agencies", systems: 45, clearance_level: "TS/SCI", threats_blocked: 789, mission: "National Defense" },
    { agency: "Intelligence Community", systems: 23, clearance_level: "TS/SCI", threats_blocked: 456, mission: "Intelligence Operations" },
    { agency: "Law Enforcement", systems: 34, clearance_level: "SECRET", threats_blocked: 234, mission: "Federal Law Enforcement" },
    { agency: "Civilian Agencies", systems: 25, clearance_level: "PUBLIC TRUST", threats_blocked: 368, mission: "Public Services" }
  ];

  const complianceFrameworks = [
    { framework: "FISMA", compliance: 100, description: "Federal Information Security Management Act", authority: "NIST" },
    { framework: "FedRAMP", compliance: 98, description: "Federal Risk and Authorization Management Program", authority: "GSA" },
    { framework: "NIST 800-53", compliance: 97, description: "Security and Privacy Controls", authority: "NIST" },
    { framework: "CNSSI-1253", compliance: 94, description: "Categorization and Control Selection", authority: "CNSS" }
  ];

  const threatLandscape = [
    { threat_type: "Nation-State APTs", incidents: 234, attribution: "China, Russia, Iran, DPRK", impact: "High", mitigation: "98%" },
    { threat_type: "Insider Threats", incidents: 67, attribution: "Malicious/Negligent Insiders", impact: "Critical", mitigation: "89%" },
    { threat_type: "Supply Chain Attacks", incidents: 89, attribution: "Various Actors", impact: "High", mitigation: "94%" },
    { threat_type: "Ransomware Groups", incidents: 45, attribution: "Criminal Organizations", impact: "Medium", mitigation: "97%" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'AUTHORIZED': return 'text-green-400 bg-green-500/20';
      case 'NEUTRALIZED': return 'text-red-400 bg-red-500/20';
      case 'COMPLIANT': return 'text-blue-400 bg-blue-500/20';
      case 'VERIFIED': return 'text-purple-400 bg-purple-500/20';
      case 'CONTAINED': return 'text-orange-400 bg-orange-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getClassificationColor = (classification: string) => {
    switch (classification) {
      case 'TOP SECRET': return 'text-red-400 bg-red-500/10 border border-red-500/30';
      case 'SECRET': return 'text-orange-400 bg-orange-500/10 border border-orange-500/30';
      case 'CONFIDENTIAL': return 'text-yellow-400 bg-yellow-500/10 border border-yellow-500/30';
      case 'UNCLASSIFIED': return 'text-green-400 bg-green-500/10 border border-green-500/30';
      default: return 'text-gray-400 bg-gray-500/10 border border-gray-500/30';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'Critical': return 'text-red-400';
      case 'High': return 'text-orange-400';
      case 'Medium': return 'text-yellow-400';
      case 'Low': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <MarketingLayout>
      <div className="ai-dashboard-bg min-h-screen">
        {/* Header */}
        <header className="bg-surface/90 backdrop-blur-md border-b border-surface-light p-6 cyber-glow">
          <div className="container mx-auto max-w-7xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-r from-red-600 to-blue-600 rounded-xl flex items-center justify-center cyber-glow">
                  <Flag className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-white geometric-text">Federal Agency Cybersecurity</h1>
                  <p className="text-xl text-gray-400">Mission-critical security solutions for federal government departments and agencies</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-400">National Security</div>
                <div className="flex items-center text-green-400 font-bold">
                  <Activity className="w-4 h-4 mr-1" />
                  {currentTime.toLocaleTimeString()}
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="p-6">
          <div className="container mx-auto max-w-7xl space-y-8">
            {/* Live Federal Security Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="bg-surface/80 backdrop-blur-md border border-red-500/30 cyber-glow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-white flex items-center">
                    <Lock className="w-5 h-5 mr-2 text-red-400" />
                    Classified Systems
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-red-400">{classifiedSystems}</div>
                  <p className="text-gray-400 text-sm">Protected systems</p>
                </CardContent>
              </Card>

              <Card className="bg-surface/80 backdrop-blur-md border border-blue-500/30 cyber-glow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-white flex items-center">
                    <Key className="w-5 h-5 mr-2 text-blue-400" />
                    Security Clearances
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-400">{securityClearances.toLocaleString()}</div>
                  <p className="text-gray-400 text-sm">Active clearances</p>
                </CardContent>
              </Card>

              <Card className="bg-surface/80 backdrop-blur-md border border-orange-500/30 cyber-glow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-white flex items-center">
                    <Shield className="w-5 h-5 mr-2 text-orange-400" />
                    Threats Neutralized
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-orange-400">{threatsBlocked}</div>
                  <p className="text-gray-400 text-sm">This quarter</p>
                </CardContent>
              </Card>

              <Card className="bg-surface/80 backdrop-blur-md border border-green-500/30 cyber-glow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-white flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2 text-green-400" />
                    FISMA Compliance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-400">100%</div>
                  <p className="text-gray-400 text-sm">Maintained</p>
                </CardContent>
              </Card>
            </div>

            {/* Live Federal Activity */}
            <Card className="bg-surface/80 backdrop-blur-md border border-red-500/30 cyber-glow">
              <CardHeader>
                <CardTitle className="text-2xl text-white flex items-center">
                  <Eye className="w-6 h-6 mr-3 text-red-400" />
                  Real-Time Federal Security Operations
                  <Badge className="ml-3 bg-red-500/20 text-red-400">CLASSIFIED SYSTEM</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {liveActivity.map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-background/30 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <Badge className={getStatusColor(activity.status)}>
                          {activity.status}
                        </Badge>
                        <div>
                          <div className="text-white font-semibold">{activity.event}</div>
                          <div className="text-gray-400 text-sm">{activity.action}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Badge className={getClassificationColor(activity.classification)}>
                          {activity.classification}
                        </Badge>
                        <div className="text-right">
                          <div className="text-blue-400 font-semibold">{activity.location}</div>
                          <div className="text-gray-400 text-xs">Location</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Agency Type Coverage */}
            <Card className="bg-surface/80 backdrop-blur-md border border-blue-500/30 cyber-glow">
              <CardHeader>
                <CardTitle className="text-2xl text-white flex items-center">
                  <Flag className="w-6 h-6 mr-3 text-blue-400" />
                  Federal Agency Security Coverage
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                  {agencyTypes.map((agency, index) => (
                    <div key={index} className="p-4 bg-background/30 rounded-lg">
                      <h4 className="text-white font-semibold mb-3">{agency.agency}</h4>
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Systems:</span>
                          <span className="text-white">{agency.systems}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Clearance Level:</span>
                          <span className="text-red-400">{agency.clearance_level}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Threats Blocked:</span>
                          <span className="text-orange-400">{agency.threats_blocked}</span>
                        </div>
                      </div>
                      <div className="text-xs text-blue-400">{agency.mission}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Threat Landscape */}
            <Card className="bg-surface/80 backdrop-blur-md border border-orange-500/30 cyber-glow">
              <CardHeader>
                <CardTitle className="text-2xl text-white flex items-center">
                  <AlertTriangle className="w-6 h-6 mr-3 text-orange-400" />
                  Federal Threat Landscape Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                  {threatLandscape.map((threat, index) => (
                    <div key={index} className="p-4 bg-background/30 rounded-lg">
                      <h4 className="text-white font-semibold mb-3">{threat.threat_type}</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Incidents:</span>
                          <span className="text-white">{threat.incidents}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Impact Level:</span>
                          <span className={getImpactColor(threat.impact)}>{threat.impact}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Mitigation:</span>
                          <span className="text-green-400">{threat.mitigation}</span>
                        </div>
                        <div className="text-xs text-gray-300 mt-2">
                          <span className="text-gray-400">Attribution:</span><br />
                          {threat.attribution}
                        </div>
                        <Progress value={parseInt(threat.mitigation)} className="mt-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Compliance Frameworks */}
            <Card className="bg-surface/80 backdrop-blur-md border border-green-500/30 cyber-glow">
              <CardHeader>
                <CardTitle className="text-2xl text-white flex items-center">
                  <CheckCircle className="w-6 h-6 mr-3 text-green-400" />
                  Federal Compliance Framework Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {complianceFrameworks.map((framework, index) => (
                    <div key={index} className="p-4 bg-background/30 rounded-lg text-center">
                      <h4 className="text-white font-semibold mb-2">{framework.framework}</h4>
                      <div className="text-3xl font-bold text-green-400 mb-2">{framework.compliance}%</div>
                      <div className="text-xs text-gray-400 mb-1">{framework.description}</div>
                      <div className="text-xs text-blue-400 mb-3">Authority: {framework.authority}</div>
                      <Progress value={framework.compliance} />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Federal Security Solutions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {federalSolutions.map((solution, index) => (
                <Card key={index} className="bg-surface/80 backdrop-blur-md border border-surface-light cyber-glow">
                  <CardHeader>
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-red-600 to-blue-600 rounded-lg flex items-center justify-center">
                        {solution.icon}
                      </div>
                      <CardTitle className="text-xl text-white">{solution.title}</CardTitle>
                    </div>
                    <p className="text-gray-400 mb-4">{solution.description}</p>
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      {Object.entries(solution.metrics).map(([key, value]) => (
                        <div key={key} className="text-center p-2 bg-background/30 rounded">
                          <div className="text-sm font-bold text-red-400">{value}</div>
                          <div className="text-xs text-gray-400 capitalize">{key}</div>
                        </div>
                      ))}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {solution.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-gray-300">
                          <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Federal Benefits */}
            <Card className="bg-gradient-to-r from-red-900/50 to-blue-900/50 border border-red-500/30 cyber-glow">
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold text-white mb-8 text-center">Federal Agency Security Benefits</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-red-400 mb-2">100%</div>
                    <div className="text-white font-semibold mb-1">FISMA Compliance</div>
                    <div className="text-gray-400 text-sm">continuous authorization</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-400 mb-2">94%</div>
                    <div className="text-white font-semibold mb-1">APT Detection Rate</div>
                    <div className="text-gray-400 text-sm">nation-state threats</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-400 mb-2">99.99%</div>
                    <div className="text-white font-semibold mb-1">System Availability</div>
                    <div className="text-gray-400 text-sm">mission-critical uptime</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-400 mb-2">&lt; 15min</div>
                    <div className="text-white font-semibold mb-1">Incident Response</div>
                    <div className="text-gray-400 text-sm">threat neutralization</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Call to Action */}
            <Card className="bg-gradient-to-r from-red-900/50 to-blue-900/50 border border-red-500/30 cyber-glow">
              <CardContent className="p-12 text-center">
                <h2 className="text-4xl font-bold text-white mb-6">Secure Your Federal Agency</h2>
                <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                  Deploy mission-critical cybersecurity solutions designed specifically for federal government operations, with full FISMA compliance, classified system protection, and advanced threat defense capabilities.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/solutions">
                    <Button size="lg" className="bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-700 hover:to-blue-700 px-12 py-4 text-lg">
                      Explore All Solutions
                    </Button>
                  </Link>
                  <Link href="/security-scanner">
                    <Button size="lg" variant="outline" className="border-red-500 text-red-400 hover:bg-red-500/10 px-12 py-4 text-lg">
                      Federal Security Assessment
                      <ArrowRight className="ml-2 w-6 h-6" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </MarketingLayout>
  );
}