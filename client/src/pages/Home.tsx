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
                src="/attached_assets/2_1755699581990.png" 
                alt="CyberSecure AI" 
                className="h-60 w-auto"
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

      {/* Platform Dashboard Showcase */}
      <section className="py-16 px-6 bg-gradient-to-b from-surface/20 to-background">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Experience the CyberSecure AI Platform</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Real-time security monitoring and threat intelligence through our unified dashboard</p>
          </div>
          
          {/* Dashboard Mockups */}
          <div className="relative">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              
              {/* Main Security Operations Dashboard - Desktop Mockup */}
              <div className="relative">
                {/* Desktop Frame */}
                <div className="bg-gray-800 rounded-2xl p-4 shadow-2xl">
                  <div className="bg-black rounded-xl p-2">
                    {/* Monitor Bezel */}
                    <div className="bg-gray-900 rounded-lg p-8 relative">
                      {/* Browser Chrome */}
                      <div className="bg-gray-700 rounded-t-lg px-4 py-2 flex items-center gap-2 mb-1">
                        <div className="flex gap-1.5">
                          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        </div>
                        <div className="flex-1 mx-4 bg-gray-600 rounded px-3 py-1">
                          <span className="text-xs text-gray-300">cybersecure.ai/dashboard</span>
                        </div>
                      </div>
                      {/* Dashboard Content */}
                      <div className="bg-gray-900 rounded-b-lg border border-cyan-500/30 p-6 shadow-2xl cyber-glow">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <Shield className="w-6 h-6 text-cyan-400" />
                      <h3 className="text-lg font-semibold text-white">Security Operations Center</h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-sm text-green-400">Live</span>
                    </div>
                  </div>
                  
                  {/* Mock Statistics */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="bg-surface/50 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-cyan-400">247</div>
                      <div className="text-xs text-gray-400">Endpoints Protected</div>
                    </div>
                    <div className="bg-surface/50 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-green-400">12</div>
                      <div className="text-xs text-gray-400">Threats Blocked</div>
                    </div>
                    <div className="bg-surface/50 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-orange-400">3</div>
                      <div className="text-xs text-gray-400">Active Alerts</div>
                    </div>
                  </div>
                  
                  {/* Mock Chart */}
                  <div className="bg-surface/30 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-sm text-gray-400">Network Activity (24h)</span>
                      <span className="text-xs text-green-400">↑ Normal</span>
                    </div>
                    <div className="flex items-end space-x-1 h-16">
                      {[40, 60, 30, 80, 50, 90, 70, 45, 85, 65, 55, 75].map((height, index) => (
                        <div
                          key={index}
                          className="bg-cyan-500 rounded-t flex-1"
                          style={{ height: `${height}%` }}
                        ></div>
                      ))}
                    </div>
                  </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

              {/* Threat Monitoring Interface - MacBook Mockup */}
              <div className="relative">
                {/* MacBook Frame */}
                <div className="bg-gray-700 rounded-2xl p-2 shadow-2xl">
                  <div className="bg-black rounded-xl">
                    {/* MacBook Screen */}
                    <div className="bg-gray-900 rounded-lg p-6 relative">
                      {/* Browser Chrome */}
                      <div className="bg-gray-800 rounded-t-lg px-4 py-2 flex items-center gap-2 mb-1">
                        <div className="flex gap-1.5">
                          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        </div>
                        <div className="flex-1 mx-4 bg-gray-700 rounded px-3 py-1">
                          <span className="text-xs text-gray-300">cybersecure.ai/threats</span>
                        </div>
                      </div>
                      {/* Dashboard Content */}
                      <div className="bg-gray-900 rounded-b-lg border border-purple-500/30 p-6 shadow-2xl cyber-glow">
                  <div className="flex items-center gap-3 mb-6">
                    <AlertTriangle className="w-6 h-6 text-purple-400" />
                    <h3 className="text-lg font-semibold text-white">Threat Intelligence</h3>
                  </div>
                  
                  {/* Recent Threats List */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-red-900/20 rounded-lg border border-red-500/30">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                        <div>
                          <div className="text-sm font-medium text-red-300">Phishing Attempt Blocked</div>
                          <div className="text-xs text-gray-400">HR-LAPTOP-07</div>
                        </div>
                      </div>
                      <div className="text-xs text-gray-500">2m ago</div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-yellow-900/20 rounded-lg border border-yellow-500/30">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                        <div>
                          <div className="text-sm font-medium text-yellow-300">Suspicious Login Detected</div>
                          <div className="text-xs text-gray-400">admin@university.edu</div>
                        </div>
                      </div>
                      <div className="text-xs text-gray-500">5m ago</div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-blue-900/20 rounded-lg border border-blue-500/30">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                        <div>
                          <div className="text-sm font-medium text-blue-300">System Update Required</div>
                          <div className="text-xs text-gray-400">STUDENT-LAB-15</div>
                        </div>
                      </div>
                      <div className="text-xs text-gray-500">12m ago</div>
                    </div>
                  </div>
                  
                  {/* Threat Level Gauge */}
                  <div className="mt-6 p-4 bg-surface/30 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-400">Current Threat Level</span>
                      <span className="text-sm font-medium text-green-400">LOW</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-green-400 h-2 rounded-full" style={{ width: '25%' }}></div>
                    </div>
                  </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </div>
            
            {/* Additional Dashboard Panels */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              
              {/* Compliance Dashboard */}
              <div className="bg-gray-900 rounded-xl border border-green-500/30 p-6 shadow-2xl cyber-glow">
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <h4 className="text-base font-semibold text-white">Compliance Status</h4>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">FERPA</span>
                    <span className="text-green-400 text-sm font-medium">✓ 100%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">FISMA</span>
                    <span className="text-green-400 text-sm font-medium">✓ 98%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">CIPA</span>
                    <span className="text-yellow-400 text-sm font-medium">⚠ 92%</span>
                  </div>
                </div>
                
                <div className="mt-4 p-3 bg-green-900/20 rounded-lg">
                  <div className="text-xs text-green-400 font-medium">Next Audit: March 15, 2025</div>
                </div>
              </div>

              {/* Network Monitoring */}
              <div className="bg-gray-900 rounded-xl border border-cyan-500/30 p-6 shadow-2xl cyber-glow">
                <div className="flex items-center gap-3 mb-4">
                  <Globe className="w-5 h-5 text-cyan-400" />
                  <h4 className="text-base font-semibold text-white">Network Overview</h4>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">Active Devices</span>
                    <span className="text-cyan-400 text-sm font-medium">834</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">Bandwidth Usage</span>
                    <span className="text-cyan-400 text-sm font-medium">67%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">Blocked IPs</span>
                    <span className="text-red-400 text-sm font-medium">23</span>
                  </div>
                </div>
                
                <div className="mt-4 p-3 bg-cyan-900/20 rounded-lg">
                  <div className="text-xs text-cyan-400 font-medium">Peak Hours: 9AM - 3PM</div>
                </div>
              </div>

              {/* AI Insights */}
              <div className="bg-gray-900 rounded-xl border border-purple-500/30 p-6 shadow-2xl cyber-glow">
                <div className="flex items-center gap-3 mb-4">
                  <Brain className="w-5 h-5 text-purple-400" />
                  <h4 className="text-base font-semibold text-white">AI Insights</h4>
                </div>
                
                <div className="space-y-3">
                  <div className="p-3 bg-purple-900/20 rounded-lg">
                    <div className="text-xs text-purple-300 font-medium mb-1">Recommendation</div>
                    <div className="text-xs text-gray-400">Update firewall rules for subnet 192.168.1.0/24</div>
                  </div>
                  <div className="p-3 bg-blue-900/20 rounded-lg">
                    <div className="text-xs text-blue-300 font-medium mb-1">Pattern Detected</div>
                    <div className="text-xs text-gray-400">Unusual login attempts from IP 45.67.89.123</div>
                  </div>
                </div>
                
                <div className="mt-4 p-3 bg-gradient-to-r from-purple-900/20 to-blue-900/20 rounded-lg">
                  <div className="text-xs text-purple-400 font-medium">Threat Score: 7.2/10</div>
                </div>
              </div>
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

      {/* Unified Platform Overview */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              The CyberSecure AI Managed Security Platform
            </h2>
            <p className="text-xl text-gray-400 max-w-4xl mx-auto">
              Enterprise-grade cybersecurity platform built specifically for education and government sectors. 
              24/7 AI-assisted Security Operations Center with comprehensive threat detection, incident response, 
              and compliance management - all from a single unified dashboard.
            </p>
          </div>

          {/* Platform Core Services */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <Card className="bg-surface/80 backdrop-blur-md border border-cyan-500/30 cyber-glow">
              <CardHeader>
                <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-cyan-400" />
                </div>
                <CardTitle className="text-lg text-white">Managed EDR</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 text-sm mb-3">
                  Fully managed Endpoint Detection & Response with 24/7 SOC monitoring and 5-minute MTTR.
                </p>
                <ul className="space-y-1 text-xs text-gray-300">
                  <li className="flex items-center"><CheckCircle className="w-3 h-3 text-green-400 mr-2" />Continuous endpoint monitoring</li>
                  <li className="flex items-center"><CheckCircle className="w-3 h-3 text-green-400 mr-2" />Malware persistence detection</li>
                  <li className="flex items-center"><CheckCircle className="w-3 h-3 text-green-400 mr-2" />Automated threat containment</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-surface/80 backdrop-blur-md border border-purple-500/30 cyber-glow">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-purple-400" />
                </div>
                <CardTitle className="text-lg text-white">Identity Protection</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 text-sm mb-3">
                  Identity Threat Detection & Response for Microsoft 365, Google Workspace, and active directory environments.
                </p>
                <ul className="space-y-1 text-xs text-gray-300">
                  <li className="flex items-center"><CheckCircle className="w-3 h-3 text-green-400 mr-2" />Session token monitoring</li>
                  <li className="flex items-center"><CheckCircle className="w-3 h-3 text-green-400 mr-2" />Suspicious login detection</li>
                  <li className="flex items-center"><CheckCircle className="w-3 h-3 text-green-400 mr-2" />Privilege escalation alerts</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-surface/80 backdrop-blur-md border border-green-500/30 cyber-glow">
              <CardHeader>
                <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-4">
                  <Brain className="w-6 h-6 text-green-400" />
                </div>
                <CardTitle className="text-lg text-white">AI-Powered SIEM</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 text-sm mb-3">
                  Intelligent Security Information & Event Management that captures critical data while filtering noise.
                </p>
                <ul className="space-y-1 text-xs text-gray-300">
                  <li className="flex items-center"><CheckCircle className="w-3 h-3 text-green-400 mr-2" />Priority-based alerting</li>
                  <li className="flex items-center"><CheckCircle className="w-3 h-3 text-green-400 mr-2" />Forensic data analysis</li>
                  <li className="flex items-center"><CheckCircle className="w-3 h-3 text-green-400 mr-2" />Threat hunting automation</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-surface/80 backdrop-blur-md border border-orange-500/30 cyber-glow">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center mb-4">
                  <GraduationCap className="w-6 h-6 text-orange-400" />
                </div>
                <CardTitle className="text-lg text-white">Security Awareness</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 text-sm mb-3">
                  Comprehensive security training for faculty, staff, and students with phishing simulation and education.
                </p>
                <ul className="space-y-1 text-xs text-gray-300">
                  <li className="flex items-center"><CheckCircle className="w-3 h-3 text-green-400 mr-2" />Phishing attack training</li>
                  <li className="flex items-center"><CheckCircle className="w-3 h-3 text-green-400 mr-2" />Policy compliance tracking</li>
                  <li className="flex items-center"><CheckCircle className="w-3 h-3 text-green-400 mr-2" />Custom educational content</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Specialized Detection Features */}
          <div className="bg-gradient-to-r from-surface/50 to-surface/30 rounded-2xl p-8 mb-16">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">Advanced Threat Detection Capabilities</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertTriangle className="w-8 h-8 text-red-400" />
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">Ransomware Canaries</h4>
                <p className="text-gray-400 text-sm">Lightweight tripwire files that detect ransomware activity before encryption begins, providing early warning for rapid response.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Eye className="w-8 h-8 text-purple-400" />
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">Persistent Footholds</h4>
                <p className="text-gray-400 text-sm">Identifies advanced malware that survives reboots, detecting sophisticated threat actors maintaining access to your environment.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-8 h-8 text-green-400" />
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">External Vulnerability Scanning</h4>
                <p className="text-gray-400 text-sm">Continuous perimeter security assessment with automated vulnerability discovery and prioritized remediation guidance.</p>
              </div>
            </div>
          </div>

          {/* Platform Benefits */}
          <div className="text-center">
            <h3 className="text-3xl font-bold text-white mb-8">Why Choose CyberSecure AI?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6">
                <div className="text-3xl font-bold text-cyan-400 mb-2">5 min</div>
                <div className="text-white font-semibold mb-1">Mean Time to Response</div>
                <div className="text-gray-400 text-sm">Industry-leading response times</div>
              </div>
              <div className="p-6">
                <div className="text-3xl font-bold text-green-400 mb-2">24/7</div>
                <div className="text-white font-semibold mb-1">SOC Monitoring</div>
                <div className="text-gray-400 text-sm">Always-on security operations</div>
              </div>
              <div className="p-6">
                <div className="text-3xl font-bold text-purple-400 mb-2">99.9%</div>
                <div className="text-white font-semibold mb-1">Uptime Guarantee</div>
                <div className="text-gray-400 text-sm">Reliable platform availability</div>
              </div>
              <div className="p-6">
                <div className="text-3xl font-bold text-orange-400 mb-2">100%</div>
                <div className="text-white font-semibold mb-1">Compliance Coverage</div>
                <div className="text-gray-400 text-sm">FERPA, FISMA, CIPA ready</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Integration */}
      <section className="py-16 px-6 bg-surface/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">Unified Dashboard Experience</h3>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Single pane of glass for comprehensive security visibility across all your endpoints, 
              identities, and infrastructure with real-time threat intelligence and incident management.
            </p>
          </div>
          <div className="bg-gradient-to-br from-cyan-900/20 to-purple-900/20 rounded-2xl p-8 border border-cyan-500/20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h4 className="text-2xl font-bold text-white mb-4">Enterprise-Grade, Education-Focused</h4>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span><strong className="text-white">Purpose-built for education:</strong> Custom-designed workflows for K-12 schools, universities, and government agencies</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span><strong className="text-white">Lightweight deployment:</strong> Minimal system impact with powerful security coverage</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span><strong className="text-white">Actionable intelligence:</strong> Priority-based alerts reduce noise and focus on real threats</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span><strong className="text-white">Human-verified:</strong> 24/7 SOC analysts validate threats before escalation</span>
                  </li>
                </ul>
              </div>
              <div className="bg-surface/50 rounded-xl p-6 border border-cyan-500/30">
                <h5 className="text-lg font-semibold text-white mb-4">Platform Integration</h5>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Microsoft 365</span>
                    <Badge className="bg-green-500/20 text-green-400">Connected</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Google Workspace</span>
                    <Badge className="bg-green-500/20 text-green-400">Connected</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Active Directory</span>
                    <Badge className="bg-green-500/20 text-green-400">Connected</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Student Information Systems</span>
                    <Badge className="bg-cyan-500/20 text-cyan-400">Available</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Learning Management Systems</span>
                    <Badge className="bg-cyan-500/20 text-cyan-400">Available</Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industry Focus */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Built for Education & Government
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Specialized cybersecurity solutions designed for the unique challenges and requirements 
              of educational institutions and government agencies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="bg-surface/80 backdrop-blur-md border border-cyan-500/30 cyber-glow">
              <CardHeader>
                <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center mb-4">
                  <GraduationCap className="w-6 h-6 text-cyan-400" />
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