import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Building2,
  Shield,
  Users,
  Database,
  MapPin,
  CheckCircle,
  ArrowRight,
  Settings,
  Activity,
  Eye,
  Lock,
  Phone,
  FileText,
  Zap
} from "lucide-react";
import { MarketingLayout } from "@/components/MarketingLayout";
import { Link } from "wouter";
import { useState, useEffect } from "react";

export default function MunicipalGovernment() {
  const [citizenRecords, setCitizenRecords] = useState(89247);
  const [systemsProtected, setSystemsProtected] = useState(47);
  const [threatsBlocked, setThreatsBlocked] = useState(234);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [liveActivity, setLiveActivity] = useState([
    { event: "Citizen Portal Access", action: "Property tax payment processed", department: "Finance", status: "SECURE" },
    { event: "Emergency Response", action: "911 system status check completed", department: "Public Safety", status: "OPERATIONAL" },
    { event: "Infrastructure Monitor", action: "Water system sensors updated", department: "Public Works", status: "MONITORED" },
    { event: "Data Backup", action: "City records backup completed", department: "IT Services", status: "PROTECTED" }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
      if (Math.random() > 0.7) {
        setCitizenRecords(Math.floor(Math.random() * 500) + 88800);
        setSystemsProtected(Math.floor(Math.random() * 5) + 45);
        setThreatsBlocked(prev => prev + Math.floor(Math.random() * 3));
        
        // Update live activity
        const events = ["Citizen Portal Access", "Emergency Response", "Infrastructure Monitor", "Data Backup", "Public Services"];
        const actions = ["Service request processed", "System check completed", "Sensor data updated", "Records archived", "Payment processed"];
        const departments = ["Finance", "Public Safety", "Public Works", "Planning", "Parks & Recreation"];
        const statuses = ["SECURE", "OPERATIONAL", "MONITORED", "PROTECTED", "COMPLIANT"];
        
        const newActivity = {
          event: events[Math.floor(Math.random() * events.length)],
          action: actions[Math.floor(Math.random() * actions.length)],
          department: departments[Math.floor(Math.random() * departments.length)],
          status: statuses[Math.floor(Math.random() * statuses.length)]
        };
        
        setLiveActivity(prev => [newActivity, ...prev.slice(0, 5)]);
      }
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  const municipalSolutions = [
    {
      title: "Citizen Data Protection",
      description: "Comprehensive protection of citizen records, personal information, and public service data",
      icon: <Users className="w-8 h-8" />,
      features: ["PII protection", "Records management", "Privacy controls", "Access logging"],
      metrics: { records: "89K+", encryption: "100%", compliance: "GDPR/CCPA" }
    },
    {
      title: "Emergency Services Security",
      description: "Critical infrastructure protection for 911 systems, first responders, and emergency communications",
      icon: <Phone className="w-8 h-8" />,
      features: ["911 system security", "First responder comms", "Emergency alerts", "Backup systems"],
      metrics: { uptime: "99.99%", response: "< 2s", backup: "Real-time" }
    },
    {
      title: "Smart City Infrastructure",
      description: "IoT security and monitoring for smart city systems including traffic, utilities, and sensors",
      icon: <MapPin className="w-8 h-8" />,
      features: ["IoT security", "Traffic systems", "Utility monitoring", "Sensor networks"],
      metrics: { devices: "1,247", networks: "15", coverage: "City-wide" }
    },
    {
      title: "Public Services Digital Security",
      description: "Secure citizen portals, online services, and digital government operations",
      icon: <FileText className="w-8 h-8" />,
      features: ["Citizen portals", "Online payments", "Digital forms", "Service delivery"],
      metrics: { users: "45K+", transactions: "Daily", satisfaction: "92%" }
    }
  ];

  const departmentSecurity = [
    { department: "Finance & Revenue", systems: 12, threats_blocked: 67, compliance: 100, priority: "High" },
    { department: "Public Safety", systems: 8, threats_blocked: 23, compliance: 99, priority: "Critical" },
    { department: "Public Works", systems: 15, threats_blocked: 45, compliance: 97, priority: "Medium" },
    { department: "Planning & Zoning", systems: 6, threats_blocked: 12, compliance: 98, priority: "Medium" },
    { department: "Parks & Recreation", systems: 4, threats_blocked: 8, compliance: 95, priority: "Low" },
    { department: "IT Services", systems: 2, threats_blocked: 79, compliance: 100, priority: "Critical" }
  ];

  const complianceRequirements = [
    { requirement: "Open Records Laws", compliance: 98, description: "Transparent access to public information" },
    { requirement: "PCI DSS", compliance: 100, description: "Payment card industry security standards" },
    { requirement: "State Privacy Laws", compliance: 94, description: "Various state-level privacy requirements" },
    { requirement: "ADA Compliance", compliance: 96, description: "Digital accessibility for public services" }
  ];

  const smartCityMetrics = [
    { system: "Traffic Management", sensors: 234, status: "Operational", security: "High", data_flow: "Real-time" },
    { system: "Water Utilities", sensors: 156, status: "Monitored", security: "High", data_flow: "Continuous" },
    { system: "Street Lighting", sensors: 890, status: "Automated", security: "Medium", data_flow: "Scheduled" },
    { system: "Environmental", sensors: 67, status: "Active", security: "Medium", data_flow: "Hourly" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'SECURE': return 'text-green-400 bg-green-500/20';
      case 'OPERATIONAL': return 'text-blue-400 bg-blue-500/20';
      case 'MONITORED': return 'text-cyan-400 bg-cyan-500/20';
      case 'PROTECTED': return 'text-purple-400 bg-purple-500/20';
      case 'COMPLIANT': return 'text-orange-400 bg-orange-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
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
                <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center cyber-glow">
                  <Building2 className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-white geometric-text">Municipal Government Security</h1>
                  <p className="text-xl text-gray-400">Comprehensive cybersecurity for city and local government operations</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-400">City Protection</div>
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
            {/* Live Municipal Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="bg-surface/80 backdrop-blur-md border border-emerald-500/30 cyber-glow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-white flex items-center">
                    <Users className="w-5 h-5 mr-2 text-emerald-400" />
                    Citizen Records
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-emerald-400">{citizenRecords.toLocaleString()}</div>
                  <p className="text-gray-400 text-sm">Protected records</p>
                </CardContent>
              </Card>

              <Card className="bg-surface/80 backdrop-blur-md border border-teal-500/30 cyber-glow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-white flex items-center">
                    <Settings className="w-5 h-5 mr-2 text-teal-400" />
                    City Systems
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-teal-400">{systemsProtected}</div>
                  <p className="text-gray-400 text-sm">Secured systems</p>
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
                  <p className="text-gray-400 text-sm">This month</p>
                </CardContent>
              </Card>

              <Card className="bg-surface/80 backdrop-blur-md border border-blue-500/30 cyber-glow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-white flex items-center">
                    <Zap className="w-5 h-5 mr-2 text-blue-400" />
                    System Uptime
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-400">99.8%</div>
                  <p className="text-gray-400 text-sm">Service availability</p>
                </CardContent>
              </Card>
            </div>

            {/* Live Municipal Activity */}
            <Card className="bg-surface/80 backdrop-blur-md border border-emerald-500/30 cyber-glow">
              <CardHeader>
                <CardTitle className="text-2xl text-white flex items-center">
                  <Eye className="w-6 h-6 mr-3 text-emerald-400" />
                  Real-Time Municipal Security Activity
                  <Badge className="ml-3 bg-emerald-500/20 text-emerald-400">LIVE</Badge>
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
                        <div className="text-teal-400 font-semibold">{activity.department}</div>
                        <div className="text-gray-400 text-sm">Department</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Department Security Overview */}
            <Card className="bg-surface/80 backdrop-blur-md border border-teal-500/30 cyber-glow">
              <CardHeader>
                <CardTitle className="text-2xl text-white flex items-center">
                  <Building2 className="w-6 h-6 mr-3 text-teal-400" />
                  Department Security Coverage
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  {departmentSecurity.map((dept, index) => (
                    <div key={index} className="p-4 bg-background/30 rounded-lg">
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="text-white font-semibold">{dept.department}</h4>
                        <div className={`text-sm font-bold ${getPriorityColor(dept.priority)}`}>
                          {dept.priority}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Systems:</span>
                          <span className="text-white">{dept.systems}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Threats Blocked:</span>
                          <span className="text-red-400">{dept.threats_blocked}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Compliance:</span>
                          <span className="text-green-400">{dept.compliance}%</span>
                        </div>
                        <Progress value={dept.compliance} className="mt-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Smart City Infrastructure */}
            <Card className="bg-surface/80 backdrop-blur-md border border-blue-500/30 cyber-glow">
              <CardHeader>
                <CardTitle className="text-2xl text-white flex items-center">
                  <MapPin className="w-6 h-6 mr-3 text-blue-400" />
                  Smart City Infrastructure Security
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                  {smartCityMetrics.map((system, index) => (
                    <div key={index} className="p-4 bg-background/30 rounded-lg">
                      <h4 className="text-white font-semibold mb-3">{system.system}</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Sensors:</span>
                          <span className="text-white">{system.sensors}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Status:</span>
                          <span className="text-green-400">{system.status}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Security:</span>
                          <span className={system.security === 'High' ? 'text-green-400' : 'text-yellow-400'}>
                            {system.security}
                          </span>
                        </div>
                        <div className="text-xs text-blue-400 mt-2">{system.data_flow}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Compliance Requirements */}
            <Card className="bg-surface/80 backdrop-blur-md border border-purple-500/30 cyber-glow">
              <CardHeader>
                <CardTitle className="text-2xl text-white flex items-center">
                  <Lock className="w-6 h-6 mr-3 text-purple-400" />
                  Municipal Compliance Requirements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {complianceRequirements.map((requirement, index) => (
                    <div key={index} className="p-4 bg-background/30 rounded-lg text-center">
                      <h4 className="text-white font-semibold mb-2">{requirement.requirement}</h4>
                      <div className="text-3xl font-bold text-purple-400 mb-2">{requirement.compliance}%</div>
                      <div className="text-xs text-gray-400 mb-3">{requirement.description}</div>
                      <Progress value={requirement.compliance} />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Municipal Security Solutions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {municipalSolutions.map((solution, index) => (
                <Card key={index} className="bg-surface/80 backdrop-blur-md border border-surface-light cyber-glow">
                  <CardHeader>
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
                        {solution.icon}
                      </div>
                      <CardTitle className="text-xl text-white">{solution.title}</CardTitle>
                    </div>
                    <p className="text-gray-400 mb-4">{solution.description}</p>
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      {Object.entries(solution.metrics).map(([key, value]) => (
                        <div key={key} className="text-center p-2 bg-background/30 rounded">
                          <div className="text-sm font-bold text-emerald-400">{value}</div>
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

            {/* Municipal Benefits */}
            <Card className="bg-gradient-to-r from-emerald-900/50 to-teal-900/50 border border-emerald-500/30 cyber-glow">
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold text-white mb-8 text-center">Municipal Government Security Benefits</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-emerald-400 mb-2">99.8%</div>
                    <div className="text-white font-semibold mb-1">Service Uptime</div>
                    <div className="text-gray-400 text-sm">citizen service availability</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-teal-400 mb-2">76%</div>
                    <div className="text-white font-semibold mb-1">Threat Reduction</div>
                    <div className="text-gray-400 text-sm">municipal security improvement</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-400 mb-2">62%</div>
                    <div className="text-white font-semibold mb-1">Operational Cost Savings</div>
                    <div className="text-gray-400 text-sm">automated security management</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-400 mb-2">97%</div>
                    <div className="text-white font-semibold mb-1">Compliance Rate</div>
                    <div className="text-gray-400 text-sm">regulatory standards</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Call to Action */}
            <Card className="bg-gradient-to-r from-emerald-900/50 to-teal-900/50 border border-emerald-500/30 cyber-glow">
              <CardContent className="p-12 text-center">
                <h2 className="text-4xl font-bold text-white mb-6">Secure Your Municipal Government</h2>
                <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                  Deploy comprehensive cybersecurity solutions designed specifically for municipal and local government operations, with citizen data protection, smart city security, and regulatory compliance.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/solutions">
                    <Button size="lg" className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 px-12 py-4 text-lg">
                      Explore All Solutions
                    </Button>
                  </Link>
                  <Link href="/security-scanner">
                    <Button size="lg" variant="outline" className="border-emerald-500 text-emerald-400 hover:bg-emerald-500/10 px-12 py-4 text-lg">
                      Municipal Security Assessment
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