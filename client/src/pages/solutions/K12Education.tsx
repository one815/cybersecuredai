import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  GraduationCap,
  Shield,
  Users,
  Monitor,
  BookOpen,
  CheckCircle,
  ArrowRight,
  Settings,
  Activity,
  Eye,
  Lock,
  Brain,
  Wifi,
  Tablet
} from "lucide-react";
import { MarketingLayout } from "@/components/MarketingLayout";
import { Link } from "wouter";
import { useState, useEffect } from "react";

export default function K12Education() {
  const [studentsProtected, setStudentsProtected] = useState(12847);
  const [devicesManaged, setDevicesManaged] = useState(2156);
  const [threatsBlocked, setThreatsBlocked] = useState(894);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [liveActivity, setLiveActivity] = useState([
    { event: "Content Filter", action: "Blocked inappropriate site", location: "Elementary Lab", status: "PROTECTED" },
    { event: "Device Management", action: "Chromebook policy updated", location: "High School", status: "MANAGED" },
    { event: "Threat Detection", action: "Phishing email quarantined", location: "Administration", status: "BLOCKED" },
    { event: "Privacy Control", action: "Student data access logged", location: "District Office", status: "COMPLIANT" }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
      if (Math.random() > 0.7) {
        setStudentsProtected(Math.floor(Math.random() * 200) + 12700);
        setDevicesManaged(Math.floor(Math.random() * 100) + 2100);
        setThreatsBlocked(prev => prev + Math.floor(Math.random() * 5));
        
        // Update live activity
        const events = ["Content Filter", "Device Management", "Threat Detection", "Privacy Control", "Access Management"];
        const actions = ["Blocked inappropriate content", "Device policy enforced", "Malware detected", "Data access monitored", "Login validated"];
        const locations = ["Elementary School", "Middle School", "High School", "District Office", "Computer Lab"];
        const statuses = ["PROTECTED", "MANAGED", "BLOCKED", "COMPLIANT", "MONITORED"];
        
        const newActivity = {
          event: events[Math.floor(Math.random() * events.length)],
          action: actions[Math.floor(Math.random() * actions.length)],
          location: locations[Math.floor(Math.random() * locations.length)],
          status: statuses[Math.floor(Math.random() * statuses.length)]
        };
        
        setLiveActivity(prev => [newActivity, ...prev.slice(0, 5)]);
      }
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const k12Solutions = [
    {
      title: "Student Data Protection",
      description: "FERPA-compliant protection of sensitive student information and educational records",
      icon: <Shield className="w-8 h-8" />,
      features: ["FERPA compliance", "Data encryption", "Access controls", "Privacy monitoring"],
      metrics: { compliance: "100%", encryption: "AES-256", access: "Role-based" }
    },
    {
      title: "Device & Content Management",
      description: "Comprehensive management of student devices with age-appropriate content filtering",
      icon: <Monitor className="w-8 h-8" />,
      features: ["Chromebook management", "Content filtering", "App restrictions", "Screen time controls"],
      metrics: { devices: "2,156", policies: "47", uptime: "99.8%" }
    },
    {
      title: "Digital Citizenship & Safety",
      description: "Educational tools and monitoring systems to promote safe online behavior",
      icon: <BookOpen className="w-8 h-8" />,
      features: ["Cyberbullying detection", "Safety education", "Parent notifications", "Incident reporting"],
      metrics: { incidents: "12", resolved: "100%", education: "Weekly" }
    },
    {
      title: "Network Security for Schools",
      description: "Secure Wi-Fi and network infrastructure designed for educational environments",
      icon: <Wifi className="w-8 h-8" />,
      features: ["Secure Wi-Fi", "Guest networks", "Bandwidth management", "Threat protection"],
      metrics: { networks: "15", users: "Active", security: "WPA3" }
    }
  ];

  const complianceFrameworks = [
    { framework: "FERPA", compliance: 100, description: "Family Educational Rights and Privacy Act" },
    { framework: "CIPA", compliance: 100, description: "Children's Internet Protection Act" },
    { framework: "COPPA", compliance: 98, description: "Children's Online Privacy Protection Act" },
    { framework: "State Privacy Laws", compliance: 96, description: "Various state-level student privacy requirements" }
  ];

  const schoolLevels = [
    { level: "Elementary (K-5)", students: 4200, devices: 680, threats_blocked: 234, features: ["Basic content filtering", "Simplified device management", "Parent controls"] },
    { level: "Middle School (6-8)", students: 3500, devices: 720, threats_blocked: 312, features: ["Enhanced monitoring", "Social media controls", "Cyberbullying detection"] },
    { level: "High School (9-12)", students: 5147, devices: 756, threats_blocked: 348, features: ["Advanced policies", "BYOD support", "Career prep security"] }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PROTECTED': return 'text-green-400 bg-green-500/20';
      case 'MANAGED': return 'text-blue-400 bg-blue-500/20';
      case 'BLOCKED': return 'text-red-400 bg-red-500/20';
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
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl flex items-center justify-center cyber-glow">
                  <GraduationCap className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-white geometric-text">K-12 Education Cybersecurity</h1>
                  <p className="text-xl text-gray-400">Comprehensive security solutions designed specifically for elementary and secondary schools</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-400">Schools Protected</div>
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
            {/* Live K-12 Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="bg-surface/80 backdrop-blur-md border border-green-500/30 cyber-glow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-white flex items-center">
                    <Users className="w-5 h-5 mr-2 text-green-400" />
                    Students Protected
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-400">{studentsProtected.toLocaleString()}</div>
                  <p className="text-gray-400 text-sm">Across all grade levels</p>
                </CardContent>
              </Card>

              <Card className="bg-surface/80 backdrop-blur-md border border-blue-500/30 cyber-glow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-white flex items-center">
                    <Tablet className="w-5 h-5 mr-2 text-blue-400" />
                    Devices Managed
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-400">{devicesManaged.toLocaleString()}</div>
                  <p className="text-gray-400 text-sm">Chromebooks & tablets</p>
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

              <Card className="bg-surface/80 backdrop-blur-md border border-purple-500/30 cyber-glow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-white flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2 text-purple-400" />
                    FERPA Compliance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-purple-400">100%</div>
                  <p className="text-gray-400 text-sm">Maintained</p>
                </CardContent>
              </Card>
            </div>

            {/* Live School Activity */}
            <Card className="bg-surface/80 backdrop-blur-md border border-green-500/30 cyber-glow">
              <CardHeader>
                <CardTitle className="text-2xl text-white flex items-center">
                  <Eye className="w-6 h-6 mr-3 text-green-400" />
                  Real-Time School Security Activity
                  <Badge className="ml-3 bg-green-500/20 text-green-400">LIVE</Badge>
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
                        <div className="text-blue-400 font-semibold">{activity.location}</div>
                        <div className="text-gray-400 text-sm">Location</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* School Level Breakdown */}
            <Card className="bg-surface/80 backdrop-blur-md border border-blue-500/30 cyber-glow">
              <CardHeader>
                <CardTitle className="text-2xl text-white flex items-center">
                  <GraduationCap className="w-6 h-6 mr-3 text-blue-400" />
                  Protection by School Level
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {schoolLevels.map((school, index) => (
                    <div key={index} className="p-4 bg-background/30 rounded-lg">
                      <h4 className="text-white font-semibold mb-3">{school.level}</h4>
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Students:</span>
                          <span className="text-white">{school.students.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Devices:</span>
                          <span className="text-blue-400">{school.devices}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Threats Blocked:</span>
                          <span className="text-red-400">{school.threats_blocked}</span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-gray-400 text-sm mb-2">Key Features:</div>
                        {school.features.map((feature, idx) => (
                          <div key={idx} className="text-xs text-gray-300">• {feature}</div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Compliance Dashboard */}
            <Card className="bg-surface/80 backdrop-blur-md border border-purple-500/30 cyber-glow">
              <CardHeader>
                <CardTitle className="text-2xl text-white flex items-center">
                  <Lock className="w-6 h-6 mr-3 text-purple-400" />
                  Education Compliance Standards
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {complianceFrameworks.map((framework, index) => (
                    <div key={index} className="p-4 bg-background/30 rounded-lg text-center">
                      <h4 className="text-white font-semibold mb-2">{framework.framework}</h4>
                      <div className="text-3xl font-bold text-purple-400 mb-2">{framework.compliance}%</div>
                      <div className="text-xs text-gray-400 mb-3">{framework.description}</div>
                      <Progress value={framework.compliance} />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* K-12 Security Solutions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {k12Solutions.map((solution, index) => (
                <Card key={index} className="bg-surface/80 backdrop-blur-md border border-surface-light cyber-glow">
                  <CardHeader>
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                        {solution.icon}
                      </div>
                      <CardTitle className="text-xl text-white">{solution.title}</CardTitle>
                    </div>
                    <p className="text-gray-400 mb-4">{solution.description}</p>
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      {Object.entries(solution.metrics).map(([key, value]) => (
                        <div key={key} className="text-center p-2 bg-background/30 rounded">
                          <div className="text-sm font-bold text-green-400">{value}</div>
                          <div className="text-xs text-gray-400 capitalize">{key.replace('_', ' ')}</div>
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

            {/* K-12 Benefits */}
            <Card className="bg-gradient-to-r from-green-900/50 to-blue-900/50 border border-green-500/30 cyber-glow">
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold text-white mb-8 text-center">K-12 Cybersecurity Benefits</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-400 mb-2">100%</div>
                    <div className="text-white font-semibold mb-1">FERPA Compliance</div>
                    <div className="text-gray-400 text-sm">student privacy protected</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-400 mb-2">87%</div>
                    <div className="text-white font-semibold mb-1">Threat Reduction</div>
                    <div className="text-gray-400 text-sm">safer learning environment</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-400 mb-2">45%</div>
                    <div className="text-white font-semibold mb-1">IT Cost Savings</div>
                    <div className="text-gray-400 text-sm">automated management</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-cyan-400 mb-2">99.8%</div>
                    <div className="text-white font-semibold mb-1">System Uptime</div>
                    <div className="text-gray-400 text-sm">uninterrupted learning</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Call to Action */}
            <Card className="bg-gradient-to-r from-green-900/50 to-blue-900/50 border border-green-500/30 cyber-glow">
              <CardContent className="p-12 text-center">
                <h2 className="text-4xl font-bold text-white mb-6">Protect Your K-12 School District</h2>
                <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                  Deploy comprehensive cybersecurity solutions designed specifically for K-12 education with FERPA compliance, student safety features, and age-appropriate content management.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/solutions">
                    <Button size="lg" className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 px-12 py-4 text-lg">
                      Explore All Solutions
                    </Button>
                  </Link>
                  <Link href="/security-scanner">
                    <Button size="lg" variant="outline" className="border-green-500 text-green-400 hover:bg-green-500/10 px-12 py-4 text-lg">
                      School Security Assessment
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