import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  ClipboardCheck, 
  Shield, 
  FileText, 
  CheckCircle, 
  AlertTriangle, 
  Settings,
  Flag,
  GraduationCap,
  Building2,
  Eye,
  Clock,
  Database,
  BarChart3,
  TrendingUp,
  Bot
} from "lucide-react";
import { MarketingLayout } from "@/components/MarketingLayout";
import { Link } from "wouter";

export default function ComplianceAutomation() {
  const complianceFrameworks = [
    {
      name: "FERPA",
      fullName: "Family Educational Rights and Privacy Act",
      sector: "Education",
      controls: 24,
      compliance: 97,
      description: "Protects privacy of student education records",
      icon: <GraduationCap className="w-6 h-6" />,
      color: "text-blue-400"
    },
    {
      name: "FISMA",
      fullName: "Federal Information Security Management Act", 
      sector: "Government",
      controls: 325,
      compliance: 94,
      description: "Federal information security framework",
      icon: <Flag className="w-6 h-6" />,
      color: "text-green-400"
    },
    {
      name: "FedRAMP",
      fullName: "Federal Risk and Authorization Management Program",
      sector: "Government", 
      controls: 421,
      compliance: 91,
      description: "Cloud security authorization for federal agencies",
      icon: <Shield className="w-6 h-6" />,
      color: "text-purple-400"
    },
    {
      name: "CIPA",
      fullName: "Children's Internet Protection Act",
      sector: "Education",
      controls: 12,
      compliance: 98,
      description: "Internet safety policies and filtering requirements",
      icon: <Eye className="w-6 h-6" />,
      color: "text-cyan-400"
    }
  ];

  const automationFeatures = [
    {
      title: "Continuous Compliance Monitoring",
      description: "Real-time monitoring of security controls and policy adherence across all systems",
      capabilities: ["24/7 control assessment", "Policy violation detection", "Real-time alerts", "Automated remediation"]
    },
    {
      title: "Automated Reporting",
      description: "Generate comprehensive compliance reports automatically for audits and assessments",
      capabilities: ["Custom report templates", "Scheduled generation", "Multi-format export", "Stakeholder distribution"]
    },
    {
      title: "Policy Enforcement",
      description: "Automatically enforce security policies and compliance requirements across infrastructure",
      capabilities: ["Configuration management", "Access control enforcement", "Data protection policies", "Incident escalation"]
    },
    {
      title: "Audit Trail Management",
      description: "Comprehensive logging and documentation for compliance audit requirements",
      capabilities: ["Immutable audit logs", "Evidence collection", "Timeline reconstruction", "Compliance mapping"]
    }
  ];

  const complianceMetrics = [
    { metric: "Automated Controls", value: "782", description: "Security controls monitored automatically" },
    { metric: "Compliance Score", value: "94.2%", description: "Average across all frameworks" },
    { metric: "Audit Preparation", value: "< 24hrs", description: "Time to generate audit reports" },
    { metric: "Cost Reduction", value: "67%", description: "vs manual compliance management" }
  ];

  const auditBenefits = [
    { benefit: "Reduced Audit Preparation Time", improvement: "85% faster", description: "Automated evidence collection and report generation" },
    { benefit: "Improved Compliance Scores", improvement: "23% increase", description: "Continuous monitoring prevents violations" },
    { benefit: "Lower Audit Costs", improvement: "$2.1M saved", description: "Reduced external audit firm engagement" },
    { benefit: "Faster Issue Resolution", improvement: "72% reduction", description: "Automated remediation of common violations" }
  ];

  return (
    <MarketingLayout>
      <div className="ai-dashboard-bg min-h-screen">
        {/* Hero Section */}
        <header className="bg-surface/90 backdrop-blur-md border-b border-surface-light p-8 cyber-glow">
          <div className="container mx-auto max-w-6xl">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-red-500 rounded-lg flex items-center justify-center">
                <ClipboardCheck className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <h1 className="text-4xl font-bold text-white">Compliance Automation</h1>
                  <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white">Automated</Badge>
                </div>
                <p className="text-gray-300 text-lg">
                  Automated tools to meet cybersecurity regulatory requirements for education and government
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {complianceMetrics.map((metric, index) => (
                <div key={index} className="bg-surface/50 rounded-lg p-4 border border-surface-light">
                  <div className="text-2xl font-bold text-white mb-1">{metric.value}</div>
                  <div className="text-sm text-gray-400 mb-1">{metric.metric}</div>
                  <div className="text-xs text-orange-400">{metric.description}</div>
                </div>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="text-orange-400 border-orange-400/50">
                $8,000 - $15,000 annually
              </Badge>
              <Badge variant="outline" className="text-green-400 border-green-400/50">
                Multi-framework support
              </Badge>
              <Badge variant="outline" className="text-cyan-400 border-cyan-400/50">
                Continuous monitoring
              </Badge>
            </div>
          </div>
        </header>

        <main className="container mx-auto max-w-6xl p-8 space-y-12">
          {/* Supported Compliance Frameworks */}
          <section>
            <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
              <Shield className="w-8 h-8 mr-3 text-orange-400" />
              Supported Compliance Frameworks
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {complianceFrameworks.map((framework, index) => (
                <Card key={index} className="bg-surface/50 border-surface-light">
                  <CardHeader>
                    <div className="flex items-center space-x-3 mb-4">
                      <div className={`${framework.color}`}>{framework.icon}</div>
                      <div>
                        <CardTitle className="text-white text-xl">{framework.name}</CardTitle>
                        <p className="text-gray-400 text-sm">{framework.fullName}</p>
                      </div>
                    </div>
                    <p className="text-gray-400">{framework.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-400">Compliance Rate</span>
                        <span className="text-sm font-semibold text-white">{framework.compliance}%</span>
                      </div>
                      <Progress value={framework.compliance} className="h-2" />
                      <div className="flex justify-between items-center">
                        <Badge variant="outline" className={`${framework.color} border-current/50`}>
                          {framework.sector}
                        </Badge>
                        <span className="text-sm text-gray-400">{framework.controls} controls</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Automation Features */}
          <section>
            <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
              <Settings className="w-8 h-8 mr-3 text-orange-400" />
              Automation Capabilities
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {automationFeatures.map((feature, index) => (
                <Card key={index} className="bg-surface/50 border-surface-light">
                  <CardHeader>
                    <CardTitle className="text-white text-xl">{feature.title}</CardTitle>
                    <p className="text-gray-400">{feature.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {feature.capabilities.map((capability, capIndex) => (
                        <div key={capIndex} className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                          <span className="text-gray-300 text-sm">{capability}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Compliance Visualization Center */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">
              Automated Compliance Control Center
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Compliance Hologram */}
              <div className="relative rounded-xl overflow-hidden border border-orange-500/30">
                <div className="bg-gradient-to-br from-orange-900/20 to-red-900/40 p-8 h-72 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center">
                      <ClipboardCheck className="w-12 h-12 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Compliance Matrix</h3>
                    <p className="text-orange-400 text-sm mb-4">3D compliance framework visualization with real-time status</p>
                    <div className="space-y-2">
                      <Badge className="bg-orange-500/20 text-orange-400 border border-orange-500/50">782 Controls</Badge>
                      <div className="text-xs text-gray-400">FERPA • FISMA • FedRAMP • CIPA</div>
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-orange-500/10 to-transparent pointer-events-none"></div>
              </div>

              {/* Audit Dashboard */}
              <div className="relative rounded-xl overflow-hidden border border-purple-500/30">
                <div className="bg-gradient-to-br from-purple-900/20 to-violet-900/40 p-8 h-72 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-r from-purple-400 to-violet-500 rounded-full flex items-center justify-center">
                      <FileText className="w-12 h-12 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Audit Readiness Center</h3>
                    <p className="text-purple-400 text-sm mb-4">Automated evidence collection and report generation</p>
                    <div className="space-y-2">
                      <Badge className="bg-purple-500/20 text-purple-400 border border-purple-500/50">&lt; 24hrs reports</Badge>
                      <div className="text-xs text-gray-400">Always audit-ready</div>
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-purple-500/10 to-transparent pointer-events-none"></div>
              </div>
            </div>
          </section>

          {/* Audit Benefits Dashboard */}
          <section className="bg-gradient-to-r from-surface/30 to-surface/50 rounded-xl p-8 border border-surface-light">
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
              <BarChart3 className="w-8 h-8 mr-3 text-orange-400" />
              Audit & Compliance Benefits
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {auditBenefits.map((benefit, index) => (
                <Card key={index} className="bg-surface/50 border-surface-light">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-white text-lg">{benefit.benefit}</CardTitle>
                      <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                        {benefit.improvement}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-400 text-sm">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-8 p-6 bg-surface/30 rounded-lg border border-orange-500/20">
              <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
                <FileText className="w-5 h-5 mr-2 text-orange-400" />
                Automated Evidence Collection
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                <div>
                  <p className="text-gray-300 mb-2">
                    <span className="font-semibold text-orange-400">System Configurations:</span> Automated collection of firewall rules, access controls, and security configurations for audit review.
                  </p>
                </div>
                <div>
                  <p className="text-gray-300 mb-2">
                    <span className="font-semibold text-orange-400">Activity Logs:</span> Comprehensive logging of user activities, system changes, and security events with tamper-proof storage.
                  </p>
                </div>
                <div>
                  <p className="text-gray-300">
                    <span className="font-semibold text-orange-400">Control Testing:</span> Automated testing of security controls with documented results and remediation tracking.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Sector-Specific Compliance */}
          <section>
            <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
              <Building2 className="w-8 h-8 mr-3 text-orange-400" />
              Sector-Specific Compliance
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="bg-gradient-to-br from-blue-900/20 to-blue-700/20 border-blue-500/30">
                <CardHeader>
                  <CardTitle className="text-white text-xl flex items-center">
                    <Badge className="bg-blue-500 text-white mr-3">Education</Badge>
                    Educational Compliance
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">FERPA student data privacy protection and automated monitoring</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">COPPA compliance for children's online privacy (under 13)</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">CIPA internet safety policies and automated filtering</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">State education privacy laws and institutional policies</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-900/20 to-green-700/20 border-green-500/30">
                <CardHeader>
                  <CardTitle className="text-white text-xl flex items-center">
                    <Badge className="bg-green-500 text-white mr-3">Government</Badge>
                    Government Compliance
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">FedRAMP cloud security authorization and continuous monitoring</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">FISMA security controls implementation and assessment</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">NIST 800-53 security control mapping and documentation</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">Controlled Unclassified Information (CUI) protection</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Real-time Compliance Dashboard */}
          <section>
            <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
              <TrendingUp className="w-8 h-8 mr-3 text-orange-400" />
              Real-time Compliance Monitoring
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="bg-surface/50 border-surface-light">
                <CardHeader>
                  <CardTitle className="text-white text-lg flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-cyan-400" />
                    Continuous Assessment
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-sm text-gray-300">
                    24/7 monitoring of all security controls with real-time compliance status updates
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-400">Controls Monitored</span>
                    <Badge className="bg-cyan-500 text-white">782</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-400">Assessment Frequency</span>
                    <Badge variant="outline" className="text-cyan-400 border-cyan-400/50">Every 15 min</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-surface/50 border-surface-light">
                <CardHeader>
                  <CardTitle className="text-white text-lg flex items-center">
                    <AlertTriangle className="w-5 h-5 mr-2 text-yellow-400" />
                    Violation Detection
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-sm text-gray-300">
                    Immediate detection and alerting of policy violations and compliance gaps
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-400">Detection Time</span>
                    <Badge className="bg-yellow-500 text-white">&lt; 5 min</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-400">Auto-Remediation</span>
                    <Badge variant="outline" className="text-yellow-400 border-yellow-400/50">67% of issues</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-surface/50 border-surface-light">
                <CardHeader>
                  <CardTitle className="text-white text-lg flex items-center">
                    <Database className="w-5 h-5 mr-2 text-green-400" />
                    Audit Readiness
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-sm text-gray-300">
                    Maintain audit-ready documentation and evidence collection at all times
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-400">Report Generation</span>
                    <Badge className="bg-green-500 text-white">&lt; 2 hours</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-400">Evidence Retention</span>
                    <Badge variant="outline" className="text-green-400 border-green-400/50">7 years</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Call to Action */}
          <section className="text-center">
            <div className="bg-gradient-to-r from-orange-900/20 to-red-900/20 rounded-xl p-8 border border-orange-500/20">
              <h2 className="text-3xl font-bold text-white mb-4">
                Automate Your Compliance Management
              </h2>
              <p className="text-gray-300 text-lg mb-6 max-w-2xl mx-auto">
                Reduce compliance costs by 67% while maintaining 100% audit readiness with automated monitoring and reporting.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button size="lg" className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600" data-testid="button-request-demo">
                    Request Demo
                  </Button>
                </Link>
                <Link href="/pricing">
                  <Button variant="outline" size="lg" className="border-orange-500/50 text-orange-400 hover:bg-orange-500/10" data-testid="button-view-pricing">
                    View Pricing
                  </Button>
                </Link>
              </div>
            </div>
          </section>
        </main>
      </div>
    </MarketingLayout>
  );
}