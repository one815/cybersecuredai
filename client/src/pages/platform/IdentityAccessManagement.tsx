import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Users,
  Key,
  Shield,
  Fingerprint,
  Lock,
  Eye,
  CheckCircle,
  ArrowRight,
  Settings,
  Activity,
  AlertTriangle,
  Database,
  Clock,
  UserCheck,
  Smartphone
} from "lucide-react";
import { MarketingLayout } from "@/components/MarketingLayout";
import { Link } from "wouter";
import { useState, useEffect } from "react";

export default function IdentityAccessManagement() {
  const [activeUsers, setActiveUsers] = useState(1247);
  const [mfaEnabled, setMfaEnabled] = useState(89);
  const [accessRequests, setAccessRequests] = useState(34);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [liveActivities, setLiveActivities] = useState([
    { user: "sarah.johnson", action: "Login", resource: "Student Portal", status: "SUCCESS", method: "Biometric" },
    { user: "mike.davidson", action: "Access", resource: "Grade System", status: "DENIED", method: "Password" },
    { user: "admin.clark", action: "Provision", resource: "New Faculty", status: "COMPLETED", method: "Admin" },
    { user: "emily.rodriguez", action: "Reset", resource: "Password", status: "SUCCESS", method: "SMS" }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
      if (Math.random() > 0.7) {
        setActiveUsers(Math.floor(Math.random() * 50) + 1220);
        setMfaEnabled(Math.floor(Math.random() * 5) + 87);
        setAccessRequests(Math.floor(Math.random() * 20) + 25);
        
        // Update live activities
        const users = ["alex.thompson", "maria.garcia", "david.wilson", "lisa.anderson", "robert.taylor"];
        const actions = ["Login", "Access", "Logout", "Reset", "Provision"];
        const resources = ["Student Portal", "Faculty System", "Admin Panel", "Grade Portal", "File Server"];
        const statuses = ["SUCCESS", "DENIED", "PENDING", "COMPLETED"];
        const methods = ["Biometric", "MFA", "Password", "SMS", "Token"];
        
        const newActivity = {
          user: users[Math.floor(Math.random() * users.length)],
          action: actions[Math.floor(Math.random() * actions.length)],
          resource: resources[Math.floor(Math.random() * resources.length)],
          status: statuses[Math.floor(Math.random() * statuses.length)],
          method: methods[Math.floor(Math.random() * methods.length)]
        };
        
        setLiveActivities(prev => [newActivity, ...prev.slice(0, 5)]);
      }
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const iamCapabilities = [
    {
      title: "Single Sign-On (SSO)",
      description: "Unified authentication across all educational and administrative systems",
      icon: <Key className="w-8 h-8" />,
      features: ["SAML 2.0 support", "OAuth integration", "Custom applications", "Federation services"]
    },
    {
      title: "Multi-Factor Authentication",
      description: "Advanced MFA with biometric, token, and mobile authentication options",
      icon: <Fingerprint className="w-8 h-8" />,
      features: ["Biometric verification", "Hardware tokens", "Mobile push", "SMS authentication"]
    },
    {
      title: "Role-Based Access Control",
      description: "Granular permission management based on user roles and responsibilities",
      icon: <UserCheck className="w-8 h-8" />,
      features: ["Dynamic roles", "Permission inheritance", "Temporary access", "Approval workflows"]
    },
    {
      title: "Identity Lifecycle Management",
      description: "Automated provisioning and deprovisioning of user accounts and access",
      icon: <Settings className="w-8 h-8" />,
      features: ["Auto-provisioning", "Account deactivation", "Access reviews", "Compliance reporting"]
    }
  ];

  const userCategories = [
    { name: "Students", count: 456, active: 398, mfa: 92, status: "Active" },
    { name: "Faculty", count: 189, active: 167, mfa: 95, status: "Active" },
    { name: "Staff", count: 134, active: 121, mfa: 87, status: "Active" },
    { name: "Administrators", count: 23, active: 23, mfa: 100, status: "Active" }
  ];

  const authenticationMethods = [
    { method: "Biometric", usage: 45, reliability: 99.8 },
    { method: "MFA App", usage: 35, reliability: 99.5 },
    { method: "SMS Token", usage: 15, reliability: 98.7 },
    { method: "Hardware Key", usage: 5, reliability: 99.9 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'SUCCESS': case 'COMPLETED': return 'text-green-400 bg-green-500/20';
      case 'DENIED': return 'text-red-400 bg-red-500/20';
      case 'PENDING': return 'text-yellow-400 bg-yellow-500/20';
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
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-xl flex items-center justify-center cyber-glow">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-white geometric-text">Identity & Access Management</h1>
                  <p className="text-xl text-gray-400">Comprehensive IAM solution with SSO, MFA, and lifecycle management</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-400">Live Monitoring</div>
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
            {/* Live IAM Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="bg-surface/80 backdrop-blur-md border border-green-500/30 cyber-glow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-white flex items-center">
                    <Users className="w-5 h-5 mr-2 text-green-400" />
                    Active Users
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-400">{activeUsers.toLocaleString()}</div>
                  <p className="text-gray-400 text-sm">Online</p>
                </CardContent>
              </Card>

              <Card className="bg-surface/80 backdrop-blur-md border border-blue-500/30 cyber-glow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-white flex items-center">
                    <Fingerprint className="w-5 h-5 mr-2 text-blue-400" />
                    MFA Adoption
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-400">{mfaEnabled}%</div>
                  <Progress value={mfaEnabled} className="mt-2" />
                </CardContent>
              </Card>

              <Card className="bg-surface/80 backdrop-blur-md border border-purple-500/30 cyber-glow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-white flex items-center">
                    <Key className="w-5 h-5 mr-2 text-purple-400" />
                    Access Requests
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-purple-400">{accessRequests}</div>
                  <p className="text-gray-400 text-sm">Pending</p>
                </CardContent>
              </Card>

              <Card className="bg-surface/80 backdrop-blur-md border border-cyan-500/30 cyber-glow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-white flex items-center">
                    <Shield className="w-5 h-5 mr-2 text-cyan-400" />
                    Security Score
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-cyan-400">94.8%</div>
                  <p className="text-gray-400 text-sm">Overall</p>
                </CardContent>
              </Card>
            </div>

            {/* Live Identity Activities */}
            <Card className="bg-surface/80 backdrop-blur-md border border-green-500/30 cyber-glow">
              <CardHeader>
                <CardTitle className="text-2xl text-white flex items-center">
                  <Activity className="w-6 h-6 mr-3 text-green-400" />
                  Real-Time Identity Activities
                  <Badge className="ml-3 bg-green-500/20 text-green-400">LIVE</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {liveActivities.map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-background/30 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <Badge className={getStatusColor(activity.status)}>
                          {activity.status}
                        </Badge>
                        <div>
                          <div className="text-white font-semibold">{activity.user}</div>
                          <div className="text-gray-400 text-sm">{activity.action} → {activity.resource}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Badge className="bg-blue-500/20 text-blue-400">
                          {activity.method}
                        </Badge>
                        <Clock className="w-4 h-4 text-gray-400" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* User Categories Dashboard */}
            <Card className="bg-surface/80 backdrop-blur-md border border-blue-500/30 cyber-glow">
              <CardHeader>
                <CardTitle className="text-2xl text-white flex items-center">
                  <Database className="w-6 h-6 mr-3 text-blue-400" />
                  User Category Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {userCategories.map((category, index) => (
                    <div key={index} className="p-4 bg-background/30 rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-white font-semibold">{category.name}</h4>
                        <Badge className="bg-green-500/20 text-green-400">
                          {category.status}
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Total:</span>
                          <span className="text-white">{category.count}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Active:</span>
                          <span className="text-green-400">{category.active}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">MFA:</span>
                          <span className="text-blue-400">{category.mfa}%</span>
                        </div>
                        <Progress value={(category.active / category.count) * 100} className="mt-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Authentication Methods */}
            <Card className="bg-surface/80 backdrop-blur-md border border-purple-500/30 cyber-glow">
              <CardHeader>
                <CardTitle className="text-2xl text-white flex items-center">
                  <Smartphone className="w-6 h-6 mr-3 text-purple-400" />
                  Authentication Methods Usage
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-white font-semibold mb-4">Usage Distribution</h4>
                    <div className="space-y-4">
                      {authenticationMethods.map((method, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-4 h-4 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
                            <span className="text-white">{method.method}</span>
                          </div>
                          <div className="text-right">
                            <div className="text-purple-400 font-bold">{method.usage}%</div>
                            <Progress value={method.usage} className="w-20 mt-1" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-4">Reliability Scores</h4>
                    <div className="space-y-4">
                      {authenticationMethods.map((method, index) => (
                        <div key={index} className="p-3 bg-background/30 rounded-lg">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-white">{method.method}</span>
                            <span className="text-green-400 font-bold">{method.reliability}%</span>
                          </div>
                          <Progress value={method.reliability} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* IAM Capabilities Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {iamCapabilities.map((capability, index) => (
                <Card key={index} className="bg-surface/80 backdrop-blur-md border border-surface-light cyber-glow">
                  <CardHeader>
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg flex items-center justify-center">
                        {capability.icon}
                      </div>
                      <CardTitle className="text-xl text-white">{capability.title}</CardTitle>
                    </div>
                    <p className="text-gray-400">{capability.description}</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {capability.features.map((feature, idx) => (
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

            {/* Security Benefits */}
            <Card className="bg-gradient-to-r from-green-900/50 to-teal-900/50 border border-green-500/30 cyber-glow">
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold text-white mb-8 text-center">Identity Security Benefits</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-400 mb-2">78%</div>
                    <div className="text-white font-semibold mb-1">Breach Prevention</div>
                    <div className="text-gray-400 text-sm">identity-based attacks</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-teal-400 mb-2">65%</div>
                    <div className="text-white font-semibold mb-1">Password Reduction</div>
                    <div className="text-gray-400 text-sm">with SSO implementation</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-400 mb-2">90%</div>
                    <div className="text-white font-semibold mb-1">User Productivity</div>
                    <div className="text-gray-400 text-sm">improvement</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-400 mb-2">99.7%</div>
                    <div className="text-white font-semibold mb-1">Authentication Success</div>
                    <div className="text-gray-400 text-sm">rate with MFA</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Call to Action */}
            <Card className="bg-gradient-to-r from-green-900/50 to-teal-900/50 border border-green-500/30 cyber-glow">
              <CardContent className="p-12 text-center">
                <h2 className="text-4xl font-bold text-white mb-6">Secure Your Digital Identity Infrastructure</h2>
                <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                  Deploy comprehensive identity and access management with enterprise SSO, advanced MFA, and automated lifecycle management.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/solutions">
                    <Button size="lg" className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 px-12 py-4 text-lg">
                      View Solutions
                    </Button>
                  </Link>
                  <Link href="/security-scanner">
                    <Button size="lg" variant="outline" className="border-green-500 text-green-400 hover:bg-green-500/10 px-12 py-4 text-lg">
                      Identity Assessment
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