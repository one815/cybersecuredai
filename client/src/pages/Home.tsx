import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  Brain, 
  CheckCircle, 
  Users, 
  Lock, 
  AlertTriangle,
  TrendingUp,
  Globe,
  GraduationCap,
  Flag,
  Award,
  Zap,
  Eye,
  ArrowRight,
  Bot
} from "lucide-react";
import { Link } from "wouter";
import { MarketingLayout } from "@/components/MarketingLayout";

export default function Home() {
  return (
    <MarketingLayout>
      <div className="ai-dashboard-bg min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-6 bg-gradient-to-br from-background via-surface/50 to-background">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <img 
                src="@assets/2_1755690695191.png" 
                alt="CyberSecure AI" 
                className="h-20 w-auto"
              />
            </div>
            <p className="text-2xl md:text-3xl text-gray-300 mb-8 max-w-4xl mx-auto">
              AI-Powered Cybersecurity Platform for Education & Government
            </p>
            <p className="text-lg text-gray-400 mb-10 max-w-3xl mx-auto">
              Comprehensive cybersecurity and IT management platform engineered for K-12 schools, 
              higher education institutions, municipal governments, and federal agencies. 
              Automated threat detection, incident response, and compliance management.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/solutions">
                <Button size="lg" className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-8 py-4 text-lg">
                  Explore Solutions
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/security-scanner">
                <Button size="lg" variant="outline" className="border-cyan-500 text-cyan-400 hover:bg-cyan-500/10 px-8 py-4 text-lg">
                  Free Security Scan
                  <Eye className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Key Stats */}
      <section className="py-16 px-6 bg-surface/30">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-cyan-400 mb-2">72%</div>
              <div className="text-gray-400">K-12 districts experienced security incidents in 2024</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-red-400 mb-2">2,300</div>
              <div className="text-gray-400">Cyberattacks per week targeting education</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-400 mb-2">3x</div>
              <div className="text-gray-400">Increase in ransomware attack costs</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-400 mb-2">$3.7B</div>
              <div className="text-gray-400">FCC cybersecurity funding requests</div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              AI-Powered Security Solutions
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Advanced cybersecurity platform combining artificial intelligence, automated response, 
              and comprehensive compliance management for education and government sectors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-surface/80 backdrop-blur-md border border-cyan-500/30 cyber-glow">
              <CardHeader>
                <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center mb-4">
                  <Brain className="w-6 h-6 text-cyan-400" />
                </div>
                <CardTitle className="text-xl text-white">AI-Powered Threat Detection</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 mb-4">
                  Real-time threat identification and classification using NIST Cybersecurity Framework 2.0 
                  with machine learning algorithms.
                </p>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-400 mr-2" />Automated threat analysis</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-400 mr-2" />Predictive risk assessment</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-400 mr-2" />24/7 monitoring</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-surface/80 backdrop-blur-md border border-purple-500/30 cyber-glow">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-purple-400" />
                </div>
                <CardTitle className="text-xl text-white">Automated Incident Response</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 mb-4">
                  Intelligent response system that automatically contains, investigates, and remediates 
                  security incidents based on predefined playbooks.
                </p>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-400 mr-2" />Instant threat containment</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-400 mr-2" />Automated investigation</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-400 mr-2" />Smart remediation</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-surface/80 backdrop-blur-md border border-green-500/30 cyber-glow">
              <CardHeader>
                <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-green-400" />
                </div>
                <CardTitle className="text-xl text-white">Compliance Automation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 mb-4">
                  Comprehensive compliance management supporting FERPA, CIPA, FedRAMP, FISMA, 
                  and NIST SP 800-53 requirements.
                </p>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-400 mr-2" />Multi-framework support</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-400 mr-2" />Automated reporting</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-400 mr-2" />Audit trail management</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Target Markets */}
      <section className="py-20 px-6 bg-surface/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Industries We Serve
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Specialized cybersecurity solutions tailored for education and government sectors
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="bg-surface/80 backdrop-blur-md border border-blue-500/30 cyber-glow text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <GraduationCap className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">K-12 Schools</h3>
                <p className="text-gray-400 text-sm">
                  Comprehensive security for school districts with FERPA compliance and student data protection
                </p>
              </CardContent>
            </Card>

            <Card className="bg-surface/80 backdrop-blur-md border border-purple-500/30 cyber-glow text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-purple-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-purple-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Higher Education</h3>
                <p className="text-gray-400 text-sm">
                  Advanced security solutions for colleges and universities with complex IT environments
                </p>
              </CardContent>
            </Card>

            <Card className="bg-surface/80 backdrop-blur-md border border-orange-500/30 cyber-glow text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-orange-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-8 h-8 text-orange-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Municipal Government</h3>
                <p className="text-gray-400 text-sm">
                  Secure IT infrastructure for city halls, public safety, and local government services
                </p>
              </CardContent>
            </Card>

            <Card className="bg-surface/80 backdrop-blur-md border border-red-500/30 cyber-glow text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-red-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Flag className="w-8 h-8 text-red-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Federal Agencies</h3>
                <p className="text-gray-400 text-sm">
                  Enterprise-grade security with FISMA and FedRAMP compliance for federal departments
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Competitive Advantages */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Why Choose CyberSecure AI?
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Our unique advantages in delivering cybersecurity solutions for education and government
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Award className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Sector-Specific Focus</h3>
                  <p className="text-gray-400">
                    Tailored solutions designed specifically for education and government sectors with 
                    deep understanding of unique challenges and requirements.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Brain className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">AI-Powered Security</h3>
                  <p className="text-gray-400">
                    Advanced threat detection using machine learning and artificial intelligence 
                    for proactive security management and predictive analysis.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Comprehensive Compliance</h3>
                  <p className="text-gray-400">
                    Automated compliance with FERPA, CIPA, FISMA, FedRAMP, and NIST frameworks 
                    with continuous monitoring and reporting.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-6 h-6 text-orange-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Scalable Solutions</h3>
                  <p className="text-gray-400">
                    Flexible deployment options from small schools to large federal agencies 
                    with packages designed for organizations of all sizes.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Lock className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Integrated Approach</h3>
                  <p className="text-gray-400">
                    Combined IT management and cybersecurity in one platform, reducing complexity 
                    and providing comprehensive security coverage.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-6 h-6 text-red-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">24/7 Support</h3>
                  <p className="text-gray-400">
                    Round-the-clock monitoring and support with guaranteed response times 
                    for critical security incidents and system issues.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-cyan-900/50 to-blue-900/50">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Secure Your Organization?
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Join the growing number of educational institutions and government agencies 
            protecting their digital infrastructure with CyberSecure AI.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/pricing">
              <Button size="lg" className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-8 py-4 text-lg">
                View Pricing Plans
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/about">
              <Button size="lg" variant="outline" className="border-cyan-500 text-cyan-400 hover:bg-cyan-500/10 px-8 py-4 text-lg">
                Learn More About Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
      </div>
    </MarketingLayout>
  );
}