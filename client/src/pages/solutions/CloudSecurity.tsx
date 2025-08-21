import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Cloud,
  Shield,
  Database,
  Network,
  Lock,
  CheckCircle,
  ArrowRight,
  Settings,
  Activity,
  Eye,
  Server,
  Brain,
  Zap,
  HardDrive
} from "lucide-react";
import { MarketingLayout } from "@/components/MarketingLayout";
import { Link } from "wouter";
import { useState, useEffect } from "react";

export default function CloudSecurity() {
  const [cloudAssets, setCloudAssets] = useState(1247);
  const [dataProtected, setDataProtected] = useState(15.7);
  const [securityEvents, setSecurityEvents] = useState(2893);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [liveMonitoring, setLiveMonitoring] = useState([
    { service: "AWS S3 Bucket", event: "Access Granted", user: "admin@school.edu", status: "SECURE", encryption: "AES-256" },
    { service: "Azure Database", event: "Query Executed", user: "analyst@university.edu", status: "MONITORED", encryption: "TDE" },
    { service: "Google Workspace", event: "File Shared", user: "teacher@k12.edu", status: "COMPLIANT", encryption: "Client-side" },
    { service: "Office 365", event: "Email Sent", user: "admin@district.gov", status: "SCANNED", encryption: "S/MIME" }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
      if (Math.random() > 0.7) {
        setCloudAssets(Math.floor(Math.random() * 50) + 1220);
        setDataProtected(parseFloat((Math.random() * 2 + 14.5).toFixed(1)));
        setSecurityEvents(prev => prev + Math.floor(Math.random() * 15));
        
        // Update live monitoring
        const services = ["AWS EC2", "Azure VM", "GCP Storage", "Office 365", "Google Drive", "Salesforce"];
        const events = ["Data Access", "File Upload", "API Call", "Login Event", "Policy Change"];
        const users = ["teacher@school.edu", "student@university.edu", "clerk@city.gov", "admin@district.org"];
        const statuses = ["SECURE", "MONITORED", "COMPLIANT", "SCANNED", "ENCRYPTED"];
        const encryptions = ["AES-256", "RSA-2048", "TDE", "Client-side", "E2E"];
        
        const newEvent = {
          service: services[Math.floor(Math.random() * services.length)],
          event: events[Math.floor(Math.random() * events.length)],
          user: users[Math.floor(Math.random() * users.length)],
          status: statuses[Math.floor(Math.random() * statuses.length)],
          encryption: encryptions[Math.floor(Math.random() * encryptions.length)]
        };
        
        setLiveMonitoring(prev => [newEvent, ...prev.slice(0, 5)]);
      }
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const cloudSecurityPillars = [
    {
      title: "Multi-Cloud Visibility",
      description: "Comprehensive visibility and control across AWS, Azure, Google Cloud, and SaaS platforms",
      icon: <Eye className="w-8 h-8" />,
      features: ["Asset discovery", "Configuration monitoring", "Compliance tracking", "Risk assessment"],
      coverage: { aws: 98, azure: 95, gcp: 92, saas: 97 }
    },
    {
      title: "Data Protection & Encryption",
      description: "Advanced data protection with encryption at rest, in transit, and in use",
      icon: <Lock className="w-8 h-8" />,
      features: ["End-to-end encryption", "Key management", "Data classification", "Privacy controls"],
      coverage: { encrypted: 99, classified: 87, protected: 94, compliant: 96 }
    },
    {
      title: "Identity & Access Management",
      description: "Cloud-native IAM with single sign-on, privileged access, and identity governance",
      icon: <Network className="w-8 h-8" />,
      features: ["SSO integration", "Privileged access", "Identity governance", "Access analytics"],
      coverage: { sso: 89, pam: 92, governance: 85, analytics: 88 }
    },
    {
      title: "Threat Detection & Response",
      description: "AI-powered threat detection with automated response across cloud environments",
      icon: <Brain className="w-8 h-8" />,
      features: ["Anomaly detection", "Behavioral analysis", "Automated response", "Threat intelligence"],
      coverage: { detection: 97, analysis: 94, response: 91, intelligence: 89 }
    }
  ];

  const cloudProviders = [
    { name: "Amazon Web Services", workloads: 456, security_score: 94, compliance: "SOC2/FedRAMP" },
    { name: "Microsoft Azure", workloads: 234, security_score: 91, compliance: "ISO27001/FISMA" },
    { name: "Google Cloud Platform", workloads: 189, security_score: 93, compliance: "SOC2/HIPAA" },
    { name: "SaaS Applications", workloads: 368, security_score: 89, compliance: "Multiple" }
  ];

  const dataProtectionMetrics = [
    { type: "Student Records", volume: "4.2 TB", encryption: "100%", classification: "Highly Sensitive" },
    { type: "Financial Data", volume: "1.8 TB", encryption: "100%", classification: "Confidential" },
    { type: "Research Data", volume: "8.7 TB", encryption: "100%", classification: "Restricted" },
    { type: "Public Records", volume: "2.3 TB", encryption: "100%", classification: "Internal" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'SECURE': return 'text-green-400 bg-green-500/20';
      case 'MONITORED': return 'text-blue-400 bg-blue-500/20';
      case 'COMPLIANT': return 'text-purple-400 bg-purple-500/20';
      case 'SCANNED': return 'text-cyan-400 bg-cyan-500/20';
      case 'ENCRYPTED': return 'text-orange-400 bg-orange-500/20';
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
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center cyber-glow">
                  <Cloud className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-white geometric-text">Cloud Security Solutions</h1>
                  <p className="text-xl text-gray-400">Comprehensive multi-cloud security with AI-powered protection and compliance</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-400">Live Cloud Monitoring</div>
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
            {/* Live Cloud Security Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="bg-surface/80 backdrop-blur-md border border-blue-500/30 cyber-glow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-white flex items-center">
                    <Server className="w-5 h-5 mr-2 text-blue-400" />
                    Cloud Assets
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-400">{cloudAssets.toLocaleString()}</div>
                  <p className="text-gray-400 text-sm">Monitored</p>
                </CardContent>
              </Card>

              <Card className="bg-surface/80 backdrop-blur-md border border-green-500/30 cyber-glow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-white flex items-center">
                    <Database className="w-5 h-5 mr-2 text-green-400" />
                    Data Protected
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-400">{dataProtected} TB</div>
                  <p className="text-gray-400 text-sm">Encrypted & classified</p>
                </CardContent>
              </Card>

              <Card className="bg-surface/80 backdrop-blur-md border border-purple-500/30 cyber-glow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-white flex items-center">
                    <Eye className="w-5 h-5 mr-2 text-purple-400" />
                    Security Events
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-purple-400">{securityEvents.toLocaleString()}</div>
                  <p className="text-gray-400 text-sm">Analyzed today</p>
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
                  <div className="text-3xl font-bold text-cyan-400">94.2%</div>
                  <p className="text-gray-400 text-sm">Multi-cloud average</p>
                </CardContent>
              </Card>
            </div>

            {/* Live Cloud Activity Monitoring */}
            <Card className="bg-surface/80 backdrop-blur-md border border-blue-500/30 cyber-glow">
              <CardHeader>
                <CardTitle className="text-2xl text-white flex items-center">
                  <Cloud className="w-6 h-6 mr-3 text-blue-400" />
                  Real-Time Cloud Activity Monitoring
                  <Badge className="ml-3 bg-blue-500/20 text-blue-400">LIVE</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {liveMonitoring.map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-background/30 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <Badge className={getStatusColor(activity.status)}>
                          {activity.status}
                        </Badge>
                        <div>
                          <div className="text-white font-semibold">{activity.service}</div>
                          <div className="text-gray-400 text-sm">{activity.event} by {activity.user}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Badge className="bg-green-500/20 text-green-400">
                          {activity.encryption}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Cloud Provider Security Status */}
            <Card className="bg-surface/80 backdrop-blur-md border border-green-500/30 cyber-glow">
              <CardHeader>
                <CardTitle className="text-2xl text-white flex items-center">
                  <Server className="w-6 h-6 mr-3 text-green-400" />
                  Multi-Cloud Security Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {cloudProviders.map((provider, index) => (
                    <div key={index} className="p-4 bg-background/30 rounded-lg">
                      <h4 className="text-white font-semibold mb-3">{provider.name}</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Workloads:</span>
                          <span className="text-white">{provider.workloads}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Security Score:</span>
                          <span className="text-green-400">{provider.security_score}%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Compliance:</span>
                          <span className="text-blue-400">{provider.compliance}</span>
                        </div>
                        <Progress value={provider.security_score} className="mt-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Data Protection Dashboard */}
            <Card className="bg-surface/80 backdrop-blur-md border border-purple-500/30 cyber-glow">
              <CardHeader>
                <CardTitle className="text-2xl text-white flex items-center">
                  <HardDrive className="w-6 h-6 mr-3 text-purple-400" />
                  Cloud Data Protection Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {dataProtectionMetrics.map((data, index) => (
                    <div key={index} className="p-4 bg-background/30 rounded-lg">
                      <h4 className="text-white font-semibold mb-3">{data.type}</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Volume:</span>
                          <span className="text-white">{data.volume}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Encrypted:</span>
                          <span className="text-green-400">{data.encryption}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Classification:</span>
                          <span className="text-purple-400">{data.classification}</span>
                        </div>
                        <Progress value={100} className="mt-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Cloud Security Pillars */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {cloudSecurityPillars.map((pillar, index) => (
                <Card key={index} className="bg-surface/80 backdrop-blur-md border border-surface-light cyber-glow">
                  <CardHeader>
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                        {pillar.icon}
                      </div>
                      <CardTitle className="text-xl text-white">{pillar.title}</CardTitle>
                    </div>
                    <p className="text-gray-400 mb-4">{pillar.description}</p>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      {Object.entries(pillar.coverage).map(([key, value]) => (
                        <div key={key} className="text-center p-2 bg-background/30 rounded">
                          <div className="text-lg font-bold text-blue-400">{value}%</div>
                          <div className="text-xs text-gray-400 capitalize">{key}</div>
                        </div>
                      ))}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {pillar.features.map((feature, idx) => (
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

            {/* Cloud Security Benefits */}
            <Card className="bg-gradient-to-r from-blue-900/50 to-cyan-900/50 border border-blue-500/30 cyber-glow">
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold text-white mb-8 text-center">Cloud Security Benefits</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-400 mb-2">85%</div>
                    <div className="text-white font-semibold mb-1">Cost Reduction</div>
                    <div className="text-gray-400 text-sm">vs on-premises security</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-cyan-400 mb-2">99.9%</div>
                    <div className="text-white font-semibold mb-1">Data Protection</div>
                    <div className="text-gray-400 text-sm">encryption coverage</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-400 mb-2">74%</div>
                    <div className="text-white font-semibold mb-1">Faster Detection</div>
                    <div className="text-gray-400 text-sm">threat response time</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-400 mb-2">95%</div>
                    <div className="text-white font-semibold mb-1">Compliance Rate</div>
                    <div className="text-gray-400 text-sm">regulatory standards</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Call to Action */}
            <Card className="bg-gradient-to-r from-blue-900/50 to-cyan-900/50 border border-blue-500/30 cyber-glow">
              <CardContent className="p-12 text-center">
                <h2 className="text-4xl font-bold text-white mb-6">Secure Your Cloud Infrastructure</h2>
                <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                  Deploy comprehensive multi-cloud security with advanced data protection, AI-powered threat detection, and seamless compliance management for educational institutions and government organizations.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/solutions">
                    <Button size="lg" className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 px-12 py-4 text-lg">
                      Explore All Solutions
                    </Button>
                  </Link>
                  <Link href="/security-scanner">
                    <Button size="lg" variant="outline" className="border-blue-500 text-blue-400 hover:bg-blue-500/10 px-12 py-4 text-lg">
                      Cloud Security Assessment
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