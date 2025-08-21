import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  University,
  Shield,
  Users,
  Database,
  BookOpen,
  CheckCircle,
  ArrowRight,
  Settings,
  Activity,
  Eye,
  Lock,
  Brain,
  Laptop,
  Globe
} from "lucide-react";
import { MarketingLayout } from "@/components/MarketingLayout";
import { Link } from "wouter";
import { useState, useEffect } from "react";

export default function HigherEducation() {
  const [studentsProtected, setStudentsProtected] = useState(45789);
  const [researchDataSecured, setResearchDataSecured] = useState(847.3);
  const [threatsBlocked, setThreatsBlocked] = useState(1247);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [liveActivity, setLiveActivity] = useState([
    { event: "Research Data Access", action: "PhD student accessed genomics database", department: "Biology", status: "AUTHORIZED" },
    { event: "Phishing Detection", action: "Suspicious email targeting faculty quarantined", department: "Administration", status: "BLOCKED" },
    { event: "BYOD Management", action: "Personal laptop enrolled in security policy", department: "Computer Science", status: "MANAGED" },
    { event: "Compliance Check", action: "FERPA audit completed successfully", department: "Registrar", status: "COMPLIANT" }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
      if (Math.random() > 0.7) {
        setStudentsProtected(Math.floor(Math.random() * 500) + 45500);
        setResearchDataSecured(parseFloat((Math.random() * 50 + 820).toFixed(1)));
        setThreatsBlocked(prev => prev + Math.floor(Math.random() * 8));
        
        // Update live activity
        const events = ["Research Data Access", "Phishing Detection", "BYOD Management", "Compliance Check", "Network Access"];
        const actions = ["Database accessed", "Threat quarantined", "Device enrolled", "Audit completed", "VPN connection"];
        const departments = ["Biology", "Computer Science", "Engineering", "Medical School", "Business", "Library"];
        const statuses = ["AUTHORIZED", "BLOCKED", "MANAGED", "COMPLIANT", "MONITORED"];
        
        const newActivity = {
          event: events[Math.floor(Math.random() * events.length)],
          action: actions[Math.floor(Math.random() * actions.length)],
          department: departments[Math.floor(Math.random() * departments.length)],
          status: statuses[Math.floor(Math.random() * statuses.length)]
        };
        
        setLiveActivity(prev => [newActivity, ...prev.slice(0, 5)]);
      }
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const higherEdSolutions = [
    {
      title: "Research Data Protection",
      description: "Advanced security for sensitive research data, intellectual property, and grant-funded projects",
      icon: <Database className="w-8 h-8" />,
      features: ["Data classification", "Access controls", "Collaboration security", "IP protection"],
      metrics: { data: "847TB", grants: "156", protection: "99.9%" }
    },
    {
      title: "Campus Network Security",
      description: "Comprehensive network protection for complex campus environments with diverse user populations",
      icon: <Globe className="w-8 h-8" />,
      features: ["Network segmentation", "Wi-Fi security", "Guest access", "IoT device management"],
      metrics: { networks: "47", devices: "15K+", uptime: "99.7%" }
    },
    {
      title: "BYOD & Mobile Management",
      description: "Secure management of personal devices and mobile access for students, faculty, and staff",
      icon: <Laptop className="w-8 h-8" />,
      features: ["BYOD policies", "Mobile device management", "App security", "Remote access"],
      metrics: { devices: "8,900", policies: "23", compliance: "94%" }
    },
    {
      title: "Identity & Access Management",
      description: "Sophisticated IAM for diverse campus populations including students, faculty, staff, and visitors",
      icon: <Users className="w-8 h-8" />,
      features: ["SSO integration", "Multi-factor auth", "Role management", "Visitor access"],
      metrics: { users: "45K+", systems: "89", uptime: "99.9%" }
    }
  ];

  const campusAreas = [
    { area: "Academic Departments", users: 12456, threats_blocked: 234, compliance: 98, description: "Research labs, classrooms, faculty offices" },
    { area: "Student Services", users: 45789, threats_blocked: 456, compliance: 99, description: "Dormitories, dining, student activities" },
    { area: "Administration", users: 2134, threats_blocked: 123, compliance: 100, description: "Finance, HR, registrar, admissions" },
    { area: "Medical/Health", users: 5678, threats_blocked: 89, compliance: 100, description: "Medical school, health center, research" }
  ];

  const complianceStandards = [
    { standard: "FERPA", compliance: 100, description: "Student education records privacy" },
    { standard: "FISMA", compliance: 96, description: "Federal information systems security" },
    { standard: "HIPAA", compliance: 99, description: "Health information privacy (medical programs)" },
    { standard: "Export Control", compliance: 94, description: "Research export control regulations" }
  ];

  const researchSecurity = [
    { field: "Medical Research", projects: 89, security_level: "High", data_volume: "245 TB" },
    { field: "Engineering", projects: 156, security_level: "Medium", data_volume: "178 TB" },
    { field: "Computer Science", projects: 234, security_level: "High", data_volume: "167 TB" },
    { field: "Social Sciences", projects: 67, security_level: "Medium", data_volume: "89 TB" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'AUTHORIZED': return 'text-green-400 bg-green-500/20';
      case 'BLOCKED': return 'text-red-400 bg-red-500/20';
      case 'MANAGED': return 'text-blue-400 bg-blue-500/20';
      case 'COMPLIANT': return 'text-purple-400 bg-purple-500/20';
      case 'MONITORED': return 'text-cyan-400 bg-cyan-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
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
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center cyber-glow">
                  <University className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-white geometric-text">Higher Education Cybersecurity</h1>
                  <p className="text-xl text-gray-400">Advanced security solutions for colleges, universities, and research institutions</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-400">Campus Protection</div>
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
            {/* Live Higher Ed Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="bg-surface/80 backdrop-blur-md border border-purple-500/30 cyber-glow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-white flex items-center">
                    <Users className="w-5 h-5 mr-2 text-purple-400" />
                    Campus Users
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-purple-400">{studentsProtected.toLocaleString()}</div>
                  <p className="text-gray-400 text-sm">Students, faculty & staff</p>
                </CardContent>
              </Card>

              <Card className="bg-surface/80 backdrop-blur-md border border-blue-500/30 cyber-glow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-white flex items-center">
                    <Database className="w-5 h-5 mr-2 text-blue-400" />
                    Research Data
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-400">{researchDataSecured} TB</div>
                  <p className="text-gray-400 text-sm">Protected research assets</p>
                </CardContent>
              </Card>

              <Card className="bg-surface/80 backdrop-blur-md border border-red-500/30 cyber-glow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-white flex items-center">
                    <Shield className="w-5 h-5 mr-2 text-red-400" />
                    Threats Blocked
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-red-400">{threatsBlocked}</div>
                  <p className="text-gray-400 text-sm">This week</p>
                </CardContent>
              </Card>

              <Card className="bg-surface/80 backdrop-blur-md border border-green-500/30 cyber-glow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-white flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2 text-green-400" />
                    Compliance Score
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-400">97.8%</div>
                  <p className="text-gray-400 text-sm">Multi-framework</p>
                </CardContent>
              </Card>
            </div>

            {/* Live Campus Activity */}
            <Card className="bg-surface/80 backdrop-blur-md border border-purple-500/30 cyber-glow">
              <CardHeader>
                <CardTitle className="text-2xl text-white flex items-center">
                  <Eye className="w-6 h-6 mr-3 text-purple-400" />
                  Real-Time Campus Security Activity
                  <Badge className="ml-3 bg-purple-500/20 text-purple-400">LIVE</Badge>
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
                      <div className="text-right">
                        <div className="text-blue-400 font-semibold">{activity.department}</div>
                        <div className="text-gray-400 text-sm">Department</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Campus Area Protection */}
            <Card className="bg-surface/80 backdrop-blur-md border border-blue-500/30 cyber-glow">
              <CardHeader>
                <CardTitle className="text-2xl text-white flex items-center">
                  <University className="w-6 h-6 mr-3 text-blue-400" />
                  Campus Area Security Coverage
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                  {campusAreas.map((area, index) => (
                    <div key={index} className="p-4 bg-background/30 rounded-lg">
                      <h4 className="text-white font-semibold mb-3">{area.area}</h4>
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Users:</span>
                          <span className="text-white">{area.users.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Threats Blocked:</span>
                          <span className="text-red-400">{area.threats_blocked}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Compliance:</span>
                          <span className="text-green-400">{area.compliance}%</span>
                        </div>
                      </div>
                      <Progress value={area.compliance} className="mb-2" />
                      <div className="text-xs text-gray-300">{area.description}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Research Security Dashboard */}
            <Card className="bg-surface/80 backdrop-blur-md border border-green-500/30 cyber-glow">
              <CardHeader>
                <CardTitle className="text-2xl text-white flex items-center">
                  <Brain className="w-6 h-6 mr-3 text-green-400" />
                  Research Data Security by Field
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {researchSecurity.map((research, index) => (
                    <div key={index} className="p-4 bg-background/30 rounded-lg">
                      <h4 className="text-white font-semibold mb-3">{research.field}</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Projects:</span>
                          <span className="text-white">{research.projects}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Security Level:</span>
                          <span className={research.security_level === 'High' ? 'text-red-400' : 'text-yellow-400'}>
                            {research.security_level}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Data Volume:</span>
                          <span className="text-blue-400">{research.data_volume}</span>
                        </div>
                        <Progress value={research.security_level === 'High' ? 90 : 70} className="mt-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Compliance Standards */}
            <Card className="bg-surface/80 backdrop-blur-md border border-yellow-500/30 cyber-glow">
              <CardHeader>
                <CardTitle className="text-2xl text-white flex items-center">
                  <Lock className="w-6 h-6 mr-3 text-yellow-400" />
                  Higher Education Compliance Standards
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {complianceStandards.map((standard, index) => (
                    <div key={index} className="p-4 bg-background/30 rounded-lg text-center">
                      <h4 className="text-white font-semibold mb-2">{standard.standard}</h4>
                      <div className="text-3xl font-bold text-yellow-400 mb-2">{standard.compliance}%</div>
                      <div className="text-xs text-gray-400 mb-3">{standard.description}</div>
                      <Progress value={standard.compliance} />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Higher Ed Security Solutions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {higherEdSolutions.map((solution, index) => (
                <Card key={index} className="bg-surface/80 backdrop-blur-md border border-surface-light cyber-glow">
                  <CardHeader>
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg flex items-center justify-center">
                        {solution.icon}
                      </div>
                      <CardTitle className="text-xl text-white">{solution.title}</CardTitle>
                    </div>
                    <p className="text-gray-400 mb-4">{solution.description}</p>
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      {Object.entries(solution.metrics).map(([key, value]) => (
                        <div key={key} className="text-center p-2 bg-background/30 rounded">
                          <div className="text-sm font-bold text-purple-400">{value}</div>
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

            {/* Higher Ed Benefits */}
            <Card className="bg-gradient-to-r from-purple-900/50 to-indigo-900/50 border border-purple-500/30 cyber-glow">
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold text-white mb-8 text-center">Higher Education Security Benefits</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-400 mb-2">98%</div>
                    <div className="text-white font-semibold mb-1">Research Data Protection</div>
                    <div className="text-gray-400 text-sm">IP and grant security</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-indigo-400 mb-2">73%</div>
                    <div className="text-white font-semibold mb-1">Threat Reduction</div>
                    <div className="text-gray-400 text-sm">campus-wide security</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-400 mb-2">56%</div>
                    <div className="text-white font-semibold mb-1">IT Cost Savings</div>
                    <div className="text-gray-400 text-sm">centralized management</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-400 mb-2">99.7%</div>
                    <div className="text-white font-semibold mb-1">System Availability</div>
                    <div className="text-gray-400 text-sm">academic continuity</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Call to Action */}
            <Card className="bg-gradient-to-r from-purple-900/50 to-indigo-900/50 border border-purple-500/30 cyber-glow">
              <CardContent className="p-12 text-center">
                <h2 className="text-4xl font-bold text-white mb-6">Secure Your Higher Education Institution</h2>
                <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                  Deploy advanced cybersecurity solutions designed for the complex needs of colleges and universities, with research data protection, campus-wide coverage, and comprehensive compliance management.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/solutions">
                    <Button size="lg" className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 px-12 py-4 text-lg">
                      Explore All Solutions
                    </Button>
                  </Link>
                  <Link href="/security-scanner">
                    <Button size="lg" variant="outline" className="border-purple-500 text-purple-400 hover:bg-purple-500/10 px-12 py-4 text-lg">
                      Campus Security Assessment
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