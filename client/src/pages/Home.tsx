import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle, 
  Users, 
  AlertTriangle,
  Award,
  ArrowRight,
  Network
} from "lucide-react";
import {
  CustomShieldIcon,
  CustomBrainIcon,
  CustomLockIcon,
  CustomTrendingUpIcon,
  CustomGlobeIcon,
  CustomGraduationCapIcon,
  CustomFlagIcon,
  CustomZapIcon,
  CustomEyeIcon,
  CustomBotIcon,
  CustomActivityIcon,
  CustomSettingsIcon,
  CustomFileTextIcon,
  CustomTargetIcon,
  CustomDatabaseIcon,
  CustomHeadphonesIcon,
  CustomRedWarningIcon,
  CustomYellowWarningIcon
} from "@/components/CustomIcons";
import { Link, useLocation } from "wouter";
import { MarketingLayout } from "@/components/MarketingLayout";
import { ThreatMap } from "@/components/ThreatMap";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";
import { clearBrowserCache } from "@/utils/clearCache";

export default function Home() {
  const { user, isLoading } = useAuth();
  const [, setLocation] = useLocation();

  // Ensure no cached redirects interfere with marketing page access
  useEffect(() => {
    // Clear any problematic cached auth redirects on homepage load
    if (window.location.pathname === '/') {
      console.log("Marketing homepage loaded - clearing potential auth cache");
    }
  }, []);

  // Allow both authenticated and non-authenticated users to view marketing page

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-interactive"></div>
      </div>
    );
  }

  // Show marketing page for all users

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
                src="/attached_assets/CyberSecure AI (1)_1756164301031.png" 
                alt="CyberSecure AI" 
                className="h-60 w-auto"
              />
            </div>
            <p className="text-2xl md:text-3xl text-gray-300 mb-8 max-w-4xl mx-auto font-secondary">
              Delivering reliable, AI-powered cybersecurity solutions that protect and empower education and government organizations
            </p>
            <p className="text-lg text-gray-400 mb-10 max-w-3xl mx-auto font-secondary">
              Built on core values of <span className="text-cyan-400 font-semibold">Innovation</span>, <span className="text-cyan-400 font-semibold">Security</span>, <span className="text-cyan-400 font-semibold">Integrity</span>, <span className="text-cyan-400 font-semibold">Accessibility</span>, and <span className="text-cyan-400 font-semibold">Compliance</span>. 
              Authoritative expertise meets approachable solutions for complete operational excellence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/solutions">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-700 hover:from-blue-700 hover:via-cyan-700 hover:to-blue-800 text-white px-8 py-4 text-lg font-secondary">
                  Start Your Security Journey
                  <CustomActivityIcon className="ml-2 w-8 h-6 text-blue-200" size={32} />
                </Button>
              </Link>
              <Link href="/futuristic-demo">
                <Button size="lg" className="bg-gradient-to-r from-purple-600 via-pink-600 to-purple-700 hover:from-purple-700 hover:via-pink-700 hover:to-purple-800 text-white px-8 py-4 text-lg font-secondary border border-purple-400/30 shadow-lg shadow-purple-500/20">
                  🚀 Experience the Future
                  <CustomZapIcon className="ml-2 w-8 h-6 text-purple-200" size={32} />
                </Button>
              </Link>
              <Link href="/security-scanner">
                <Button size="lg" variant="outline" className="border-cyan-500 text-cyan-400 hover:bg-gradient-to-r hover:from-cyan-500/10 hover:to-blue-500/10 px-8 py-4 text-lg font-secondary">
                  Free Security Assessment
                  <CustomTrendingUpIcon className="ml-2 w-8 h-6 text-green-400" size={32} />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* MISP Live Dashboard Showcase */}
      <section className="py-16 px-6 bg-gradient-to-b from-emerald-900/20 to-background">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-green-500/20 text-green-400 border-green-500/30">
              🚀 NEW: Live MISP Threat Intelligence
            </Badge>
            <h2 className="text-4xl font-bold text-white mb-4 font-sans">Real-Time Threat Intelligence for Critical Organizations</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8 font-secondary">
              <span className="text-cyan-400 font-semibold">Trustworthy</span> and <span className="text-cyan-400 font-semibold">innovative</span> solutions built on our commitment to security excellence. Government agencies, educational institutions, and critical infrastructure organizations rely on our official MISP integration for live threat intelligence from 8+ trusted sources worldwide.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-slate-800/50 p-6 rounded-lg border border-green-500/20">
                <div className="text-2xl font-bold text-green-400 mb-2">429+</div>
                <div className="text-sm text-gray-400">Active Malicious IPs</div>
              </div>
              <div className="bg-slate-800/50 p-6 rounded-lg border border-orange-500/20">
                <div className="text-2xl font-bold text-orange-400 mb-2">8</div>
                <div className="text-sm text-gray-400">Official MISP Feeds</div>
              </div>
              <div className="bg-slate-800/50 p-6 rounded-lg border border-cyan-500/20">
                <div className="text-2xl font-bold text-cyan-400 mb-2">2min</div>
                <div className="text-sm text-gray-400">Real-Time Updates</div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/misp-benefits">
                <Button size="lg" className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 text-lg">
                  <CustomShieldIcon className="mr-2 w-6 h-6" size={32} />
                  Learn More About MISP
                </Button>
              </Link>
              <Link href="/misp-live">
                <Button size="lg" variant="outline" className="border-green-500 text-green-400 hover:bg-green-500/10 px-8 py-4 text-lg">
                  <CustomActivityIcon className="mr-2 w-6 h-6" size={32} />
                  View Live Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Futuristic Demo Showcase */}
      <section className="py-16 px-6 bg-gradient-to-b from-purple-900/20 via-pink-900/10 to-background">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-purple-500/20 text-purple-400 border-purple-500/30 animate-pulse">
              🚀 NEXT-GENERATION CYBERSECURITY
            </Badge>
            <h2 className="text-4xl font-bold text-white mb-4 font-sans">Experience the Future of Cyber Defense</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8 font-secondary">
              Immerse yourself in cutting-edge cybersecurity with interactive 3D visualizations, AI-powered threat timelines, 
              biometric navigation, and digital twin simulations. The future of cyber defense is here.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gradient-to-b from-cyan-900/30 to-blue-900/20 p-6 rounded-lg border border-cyan-500/30">
                <div className="text-3xl mb-2">🌐</div>
                <div className="text-lg font-bold text-cyan-400 mb-2">3D Security Visualization</div>
                <div className="text-sm text-gray-400">Interactive network topology with real-time threat mapping</div>
              </div>
              <div className="bg-gradient-to-b from-purple-900/30 to-pink-900/20 p-6 rounded-lg border border-purple-500/30">
                <div className="text-3xl mb-2">👁️</div>
                <div className="text-lg font-bold text-purple-400 mb-2">Biometric Navigation</div>
                <div className="text-sm text-gray-400">Eye tracking and gesture-based interface controls</div>
              </div>
              <div className="bg-gradient-to-b from-green-900/30 to-emerald-900/20 p-6 rounded-lg border border-green-500/30">
                <div className="text-3xl mb-2">🤖</div>
                <div className="text-lg font-bold text-green-400 mb-2">Digital Twin Simulator</div>
                <div className="text-sm text-gray-400">Real-time network simulation with attack scenarios</div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/futuristic-demo">
                <Button size="lg" className="bg-gradient-to-r from-purple-600 via-pink-600 to-purple-700 hover:from-purple-700 hover:via-pink-700 hover:to-purple-800 text-white px-12 py-4 text-xl font-secondary border border-purple-400/50 shadow-xl shadow-purple-500/30 animate-pulse">
                  🚀 Launch Futuristic Demo
                  <CustomZapIcon className="ml-3 w-8 h-6 text-purple-200" size={32} />
                </Button>
              </Link>
              <Link href="/solutions">
                <Button size="lg" variant="outline" className="border-purple-500 text-purple-400 hover:bg-gradient-to-r hover:from-purple-500/10 hover:to-pink-500/10 px-8 py-4 text-lg font-secondary">
                  Learn More About Our Tech
                  <CustomBrainIcon className="ml-2 w-8 h-6 text-purple-300" size={32} />
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
            <p className="text-gray-400 max-w-2xl mx-auto">Comprehensive security monitoring and threat intelligence through our unified dashboard</p>
          </div>
          
          {/* Enhanced Desktop Dashboard Mockup */}
          <div className="relative">
            <div className="max-w-5xl mx-auto">
              
              {/* Professional Desktop Computer Mockup */}
              <div className="relative">
                {/* Monitor Stand */}
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-8 bg-gray-600 rounded-b-lg"></div>
                </div>
                <div className="flex justify-center mb-2">
                  <div className="w-32 h-4 bg-gray-700 rounded-lg"></div>
                </div>
                
                {/* Monitor Frame */}
                <div className="bg-gray-800 rounded-3xl p-6 shadow-2xl">
                  <div className="bg-black rounded-2xl p-1">
                    {/* Screen Bezel */}
                    <div className="bg-gray-900 rounded-xl p-4 relative overflow-hidden">
                      
                      {/* Browser Chrome */}
                      <div className="bg-gray-800 rounded-t-xl px-4 py-3 flex items-center gap-3 mb-2">
                        <div className="flex gap-2">
                          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        </div>
                        <div className="flex-1 mx-6 bg-gray-700 rounded-lg px-4 py-1">
                          <span className="text-sm text-gray-300">https://cybersecure.ai/dashboard</span>
                        </div>
                        <div className="w-6 h-6 bg-gray-600 rounded"></div>
                      </div>
                      
                      {/* Full Dashboard Interface */}
                      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-b-xl border border-cyan-500/20 overflow-hidden relative">
                        {/* Shiny dashboard glow effect */}
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-purple-500/10 animate-pulse"></div>
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-cyan-400/5 to-transparent animate-pulse" style={{animationDelay: '1s'}}></div>
                        <div className="relative z-10">
                        
                        {/* Dashboard Header */}
                        <div className="bg-gray-800/80 px-6 py-4 border-b border-cyan-500/20">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <CustomShieldIcon className="w-16 h-12 text-blue-400" size={64} />
                              <div>
                                <h3 className="text-xl font-bold text-white">CyberSecure AI SOC</h3>
                                <p className="text-sm text-gray-400">Security Operations Center</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                                <span className="text-sm text-green-400 font-medium">System Active</span>
                              </div>
                              <div className="text-sm text-gray-300">
                                Live Dashboard
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="p-6 space-y-6">
                          {/* Key Metrics Row */}
                          <div className="grid grid-cols-4 gap-4">
                            <div className="bg-gray-800/60 p-4 rounded-lg border border-cyan-500/30">
                              <div className="text-2xl font-bold text-cyan-400">834</div>
                              <div className="text-xs text-gray-400">Protected Endpoints</div>
                            </div>
                            <div className="bg-gray-800/60 p-4 rounded-lg border border-green-500/30">
                              <div className="text-2xl font-bold text-green-400">24</div>
                              <div className="text-xs text-gray-400">Threats Blocked Today</div>
                            </div>
                            <div className="bg-gray-800/60 p-4 rounded-lg border border-red-500/30">
                              <div className="text-2xl font-bold text-red-400">2</div>
                              <div className="text-xs text-gray-400">Critical Alerts</div>
                            </div>
                            <div className="bg-gray-800/60 p-4 rounded-lg border border-purple-500/30">
                              <div className="text-2xl font-bold text-purple-400">98.7%</div>
                              <div className="text-xs text-gray-400">System Health</div>
                            </div>
                          </div>

                          {/* Main Dashboard Content */}
                          <div className="grid grid-cols-3 gap-6">
                            
                            {/* Live Threat Map */}
                            <div className="col-span-2 bg-gray-800/40 rounded-xl p-4 border border-red-500/30 shadow-2xl relative overflow-hidden">
                              {/* Shiny border effect */}
                              <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 via-transparent to-cyan-500/20 rounded-xl animate-pulse"></div>
                              <div className="absolute inset-0 bg-gradient-to-t from-transparent via-red-400/5 to-transparent rounded-xl animate-pulse" style={{animationDelay: '0.5s'}}></div>
                              
                              <div className="relative z-10">
                                <div className="flex items-center justify-between mb-4">
                                  <div className="flex items-center gap-3">
                                    <CustomShieldIcon className="w-8 h-8 text-red-400" size={40} />
                                    <h4 className="text-lg font-semibold text-white drop-shadow-glow">Live Threat Map</h4>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-red-400 rounded-full animate-ping drop-shadow-glow"></div>
                                    <span className="text-sm text-red-400 drop-shadow-glow">Live Updates</span>
                                  </div>
                                </div>
                                
                                {/* Professional Threat Map Component */}
                                <div className="threat-map-container">
                                  <ThreatMap className="h-[300px]" />
                                </div>
                              </div>
                            </div>

                            {/* Recent Incidents */}
                            <div className="bg-gray-800/40 rounded-xl p-6 border border-purple-500/30">
                              <div className="flex items-center gap-3 mb-4">
                                <CustomBrainIcon className="w-8 h-8 text-purple-400" size={40} />
                                <h4 className="text-lg font-semibold text-white">Recent Incidents</h4>
                              </div>
                              
                              <div className="space-y-3">
                                <div className="p-3 bg-red-900/20 rounded border-l-4 border-red-400">
                                  <div className="text-sm font-medium text-red-300">Phishing Email Blocked</div>
                                  <div className="text-xs text-gray-400">finance@university.edu</div>
                                  <div className="text-xs text-gray-500">3 min ago</div>
                                </div>
                                
                                <div className="p-3 bg-yellow-900/20 rounded border-l-4 border-yellow-400">
                                  <div className="text-sm font-medium text-yellow-300">Suspicious Login</div>
                                  <div className="text-xs text-gray-400">admin@school.edu</div>
                                  <div className="text-xs text-gray-500">8 min ago</div>
                                </div>
                                
                                <div className="p-3 bg-orange-900/20 rounded border-l-4 border-orange-400">
                                  <div className="text-sm font-medium text-orange-300">Malware Quarantined</div>
                                  <div className="text-xs text-gray-400">STUDENT-PC-42</div>
                                  <div className="text-xs text-gray-500">12 min ago</div>
                                </div>

                                <div className="p-3 bg-blue-900/20 rounded border-l-4 border-blue-400">
                                  <div className="text-sm font-medium text-blue-300">System Update</div>
                                  <div className="text-xs text-gray-400">Firewall Rules Updated</div>
                                  <div className="text-xs text-gray-500">15 min ago</div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Bottom Analytics Row */}
                          <div className="grid grid-cols-2 gap-6">
                            <div className="bg-gray-800/40 rounded-xl p-4 border border-cyan-500/30">
                              <h5 className="text-sm font-semibold text-cyan-400 mb-3">Network Traffic (Live)</h5>
                              <div className="flex items-end space-x-1 h-20">
                                {[20, 45, 60, 35, 80, 55, 90, 70, 25, 85, 40, 95, 60, 75, 30, 65].map((height, index) => (
                                  <div
                                    key={index}
                                    className="bg-gradient-to-t from-cyan-600 to-cyan-400 rounded-t flex-1 animate-pulse"
                                    style={{ 
                                      height: `${height}%`,
                                      animationDelay: `${index * 0.1}s`,
                                      animationDuration: '3s'
                                    }}
                                  ></div>
                                ))}
                              </div>
                            </div>
                            
                            <div className="bg-gray-800/40 rounded-xl p-4 border border-green-500/30">
                              <h5 className="text-sm font-semibold text-green-400 mb-3">AI Detection Engine</h5>
                              <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                  <span className="text-xs text-gray-400">Behavioral Analysis</span>
                                  <span className="text-xs text-green-400">Active</span>
                                </div>
                                <div className="w-full bg-gray-700 rounded-full h-1">
                                  <div className="bg-green-400 h-1 rounded-full animate-pulse" style={{ width: '94%' }}></div>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span className="text-xs text-gray-400">Threat Intelligence</span>
                                  <span className="text-xs text-green-400">Active</span>
                                </div>
                                <div className="w-full bg-gray-700 rounded-full h-1">
                                  <div className="bg-green-400 h-1 rounded-full animate-pulse" style={{ width: '98%', animationDelay: '0.5s' }}></div>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span className="text-xs text-gray-400">Pattern Recognition</span>
                                  <span className="text-xs text-green-400">Active</span>
                                </div>
                                <div className="w-full bg-gray-700 rounded-full h-1">
                                  <div className="bg-green-400 h-1 rounded-full animate-pulse" style={{ width: '91%', animationDelay: '1s' }}></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Brand Values Section */}
      <section className="py-16 px-6 bg-gradient-to-br from-blue-900/20 to-cyan-900/20">
        <div className="container mx-auto max-w-6xl text-center">
          <h2 className="text-3xl font-bold text-white mb-4 font-sans">Built on Core Values</h2>
          <p className="text-lg text-gray-300 mb-8 font-secondary max-w-3xl mx-auto">
            Our <span className="text-cyan-400 font-semibold">authoritative yet approachable</span> solutions are guided by five fundamental principles
          </p>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            <div className="bg-gradient-to-br from-cyan-600/20 to-blue-600/20 p-6 rounded-lg border border-cyan-500/30">
              <div className="text-2xl font-bold text-cyan-400 mb-2 font-sans">Innovation</div>
              <div className="text-sm text-gray-300 font-secondary">Forward-thinking AI solutions</div>
            </div>
            <div className="bg-gradient-to-br from-blue-600/20 to-cyan-600/20 p-6 rounded-lg border border-blue-500/30">
              <div className="text-2xl font-bold text-blue-400 mb-2 font-sans">Security</div>
              <div className="text-sm text-gray-300 font-secondary">Trustworthy protection first</div>
            </div>
            <div className="bg-gradient-to-br from-cyan-600/20 to-blue-700/20 p-6 rounded-lg border border-cyan-500/30">
              <div className="text-2xl font-bold text-cyan-400 mb-2 font-sans">Integrity</div>
              <div className="text-sm text-gray-300 font-secondary">Professional reliability</div>
            </div>
            <div className="bg-gradient-to-br from-blue-600/20 to-cyan-700/20 p-6 rounded-lg border border-blue-500/30">
              <div className="text-2xl font-bold text-blue-400 mb-2 font-sans">Accessibility</div>
              <div className="text-sm text-gray-300 font-secondary">Responsive to all needs</div>
            </div>
            <div className="bg-gradient-to-br from-cyan-700/20 to-blue-600/20 p-6 rounded-lg border border-cyan-500/30">
              <div className="text-2xl font-bold text-cyan-400 mb-2 font-sans">Compliance</div>
              <div className="text-sm text-gray-300 font-secondary">Operational excellence</div>
            </div>
          </div>
        </div>
      </section>

      {/* Unified Platform Overview */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-sans">
              The CyberSecure AI Managed Security Platform
            </h2>
            <p className="text-xl text-gray-400 max-w-4xl mx-auto font-secondary">
              Enterprise-grade cybersecurity platform built specifically for education and government sectors with <span className="text-cyan-400 font-semibold">professional</span> expertise. 
              24/7 AI-assisted Security Operations Center delivering <span className="text-cyan-400 font-semibold">reliable</span> threat detection, incident response, 
              and compliance management - demonstrating our commitment to <span className="text-cyan-400 font-semibold">operational excellence</span>.
            </p>
          </div>

          {/* Comprehensive Platform Capabilities */}

          {/* Cloud Security & AI Analytics */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-3">Cloud Security & AI Analytics</h3>
              <p className="text-gray-400">AI-powered threat detection and cloud-based security management</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="bg-surface/80 backdrop-blur-md border border-cyan-500/30 cyber-glow">
                <CardHeader>
                  <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center mb-4">
                    <CustomZapIcon className="w-10 h-8 text-yellow-400" size={48} />
                  </div>
                  <CardTitle className="text-lg text-white">Automated Incident Response</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400 text-sm mb-3">
                    AI-powered system for detecting, analyzing, and responding to cybersecurity incidents in real-time.
                  </p>
                  <ul className="space-y-1 text-xs text-gray-300">
                    <li className="flex items-center"><CheckCircle className="w-3 h-3 mr-2 text-green-400" />Real-time detection and analysis</li>
                    <li className="flex items-center"><CheckCircle className="w-3 h-3 mr-2 text-green-400" />Automated response protocols</li>
                    <li className="flex items-center"><CheckCircle className="w-3 h-3 mr-2 text-green-400" />5-minute MTTR</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-surface/80 backdrop-blur-md border border-red-500/30 cyber-glow">
                <CardHeader>
                  <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center mb-4">
                    <CustomBrainIcon className="w-10 h-8 text-purple-400" size={48} />
                  </div>
                  <CardTitle className="text-lg text-white">Threat Detection System</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400 text-sm mb-3">
                    AI analysis for identifying and classifying security threats across all system components.
                  </p>
                  <ul className="space-y-1 text-xs text-gray-300">
                    <li className="flex items-center"><CheckCircle className="w-3 h-3 mr-2 text-green-400" />Advanced threat classification</li>
                    <li className="flex items-center"><CheckCircle className="w-3 h-3 mr-2 text-green-400" />Behavioral anomaly detection</li>
                    <li className="flex items-center"><CheckCircle className="w-3 h-3 mr-2 text-green-400" />Threat hunting automation</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-surface/80 backdrop-blur-md border border-purple-500/30 cyber-glow">
                <CardHeader>
                  <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
                    <CustomEyeIcon className="w-10 h-8 text-blue-400" size={48} />
                  </div>
                  <CardTitle className="text-lg text-white">Predictive Risk Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400 text-sm mb-3">
                    AI algorithms that analyze data to predict potential vulnerabilities before exploitation.
                  </p>
                  <ul className="space-y-1 text-xs text-gray-300">
                    <li className="flex items-center"><CheckCircle className="w-3 h-3 mr-2 text-green-400" />Vulnerability prediction</li>
                    <li className="flex items-center"><CheckCircle className="w-3 h-3 mr-2 text-green-400" />Risk scoring algorithms</li>
                    <li className="flex items-center"><CheckCircle className="w-3 h-3 mr-2 text-green-400" />Proactive threat mitigation</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Network Infrastructure & Management */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-3">Network Infrastructure & Management</h3>
              <p className="text-gray-400">Comprehensive network security and zero-trust architecture</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="bg-surface/80 backdrop-blur-md border border-orange-500/30 cyber-glow">
                <CardHeader>
                  <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center mb-4">
                    <CustomShieldIcon className="w-10 h-8 text-orange-400" size={48} />
                  </div>
                  <CardTitle className="text-lg text-white">Firewall Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400 text-sm mb-3">
                    Advanced firewall configuration and maintenance with real-time threat blocking.
                  </p>
                  <ul className="space-y-1 text-xs text-gray-300">
                    <li className="flex items-center"><CheckCircle className="w-3 h-3 mr-2 text-green-400" />Next-generation firewall management</li>
                    <li className="flex items-center"><CheckCircle className="w-3 h-3 mr-2 text-green-400" />Intrusion prevention systems</li>
                    <li className="flex items-center"><CheckCircle className="w-3 h-3 mr-2 text-green-400" />Application-layer filtering</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-surface/80 backdrop-blur-md border border-green-500/30 cyber-glow">
                <CardHeader>
                  <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-4">
                    <CustomActivityIcon className="w-8 h-8 text-green-400" size={40} />
                  </div>
                  <CardTitle className="text-lg text-white">Router & Switch Monitoring</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400 text-sm mb-3">
                    Network infrastructure monitoring with performance optimization and security analytics.
                  </p>
                  <ul className="space-y-1 text-xs text-gray-300">
                    <li className="flex items-center"><CheckCircle className="w-3 h-3 mr-2 text-green-400" />Real-time performance monitoring</li>
                    <li className="flex items-center"><CheckCircle className="w-3 h-3 mr-2 text-green-400" />Network traffic analysis</li>
                    <li className="flex items-center"><CheckCircle className="w-3 h-3 mr-2 text-green-400" />Bandwidth optimization</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-surface/80 backdrop-blur-md border border-blue-500/30 cyber-glow">
                <CardHeader>
                  <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
                    <CustomLockIcon className="w-8 h-8 text-blue-400" size={40} />
                  </div>
                  <CardTitle className="text-lg text-white">Zero-Trust Architecture</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400 text-sm mb-3">
                    Zero-trust network implementation with enhanced security for private SSIDs (WPA2 or better).
                  </p>
                  <ul className="space-y-1 text-xs text-gray-300">
                    <li className="flex items-center"><CheckCircle className="w-3 h-3 mr-2 text-green-400" />Zero-trust security model</li>
                    <li className="flex items-center"><CheckCircle className="w-3 h-3 mr-2 text-green-400" />Network segmentation</li>
                    <li className="flex items-center"><CheckCircle className="w-3 h-3 mr-2 text-green-400" />VPN configuration management</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Endpoint Security & Management */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-3">Endpoint Security & Management</h3>
              <p className="text-gray-400">Comprehensive workstation and device security management</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="bg-surface/80 backdrop-blur-md border border-cyan-500/30 cyber-glow">
                <CardHeader>
                  <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center mb-4">
                    <CustomEyeIcon className="w-8 h-8 text-cyan-400" size={40} />
                  </div>
                  <CardTitle className="text-lg text-white">24/7 Monitoring & Vulnerability Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400 text-sm mb-3">
                    Continuous monitoring service using AI to detect vulnerabilities and performance issues.
                  </p>
                  <ul className="space-y-1 text-xs text-gray-300">
                    <li className="flex items-center"><CheckCircle className="w-3 h-3 mr-2 text-green-400" />CPU, disk, memory monitoring</li>
                    <li className="flex items-center"><CheckCircle className="w-3 h-3 mr-2 text-green-400" />Vulnerability scanning</li>
                    <li className="flex items-center"><CheckCircle className="w-3 h-3 mr-2 text-green-400" />Automated remediation</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-surface/80 backdrop-blur-md border border-purple-500/30 cyber-glow">
                <CardHeader>
                  <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
                    <CustomBotIcon className="w-8 h-8 text-purple-400" size={40} />
                  </div>
                  <CardTitle className="text-lg text-white">Identity & Access Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400 text-sm mb-3">
                    Comprehensive identity management with Active Directory and Exchange maintenance.
                  </p>
                  <ul className="space-y-1 text-xs text-gray-300">
                    <li className="flex items-center"><CheckCircle className="w-3 h-3 mr-2 text-green-400" />Active Directory management</li>
                    <li className="flex items-center"><CheckCircle className="w-3 h-3 mr-2 text-green-400" />User account provisioning</li>
                    <li className="flex items-center"><CheckCircle className="w-3 h-3 mr-2 text-green-400" />Group policy implementation</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-surface/80 backdrop-blur-md border border-red-500/30 cyber-glow">
                <CardHeader>
                  <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center mb-4">
                    <CustomRedWarningIcon className="w-8 h-8 text-red-400" size={40} />
                  </div>
                  <CardTitle className="text-lg text-white">System Administration</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400 text-sm mb-3">
                    Management and maintenance of workstations (Windows 11 Pro or newer) for 25+ users.
                  </p>
                  <ul className="space-y-1 text-xs text-gray-300">
                    <li className="flex items-center"><CheckCircle className="w-3 h-3 mr-2 text-green-400" />OS patch management</li>
                    <li className="flex items-center"><CheckCircle className="w-3 h-3 mr-2 text-green-400" />Application updates</li>
                    <li className="flex items-center"><CheckCircle className="w-3 h-3 mr-2 text-green-400" />License and asset tracking</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Compliance & Risk Management */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-3">Compliance & Risk Management</h3>
              <p className="text-gray-400">Automated regulatory compliance and risk assessment</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-surface/80 backdrop-blur-md border border-green-500/30 cyber-glow">
                <CardHeader>
                  <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-4">
                    <CheckCircle className="w-6 h-6 text-green-400" />
                  </div>
                  <CardTitle className="text-lg text-white">Compliance Automation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400 text-sm mb-3">
                    Tools to automate meeting cybersecurity regulatory requirements including education and government-specific frameworks.
                  </p>
                  <ul className="space-y-1 text-xs text-gray-300">
                    <li className="flex items-center"><CheckCircle className="w-3 h-3 mr-2 text-green-400" />FERPA, COPPA, CIPA for education</li>
                    <li className="flex items-center"><CheckCircle className="w-3 h-3 mr-2 text-green-400" />FedRAMP, FISMA, NIST 800-53</li>
                    <li className="flex items-center"><CheckCircle className="w-3 h-3 mr-2 text-green-400" />Automated audit reports</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-surface/80 backdrop-blur-md border border-orange-500/30 cyber-glow">
                <CardHeader>
                  <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center mb-4">
                    <CustomTrendingUpIcon className="w-8 h-8 text-orange-400" size={40} />
                  </div>
                  <CardTitle className="text-lg text-white">Security Awareness Training</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400 text-sm mb-3">
                    Interactive training modules for cybersecurity best practices customized for education and government personnel.
                  </p>
                  <ul className="space-y-1 text-xs text-gray-300">
                    <li className="flex items-center"><CheckCircle className="w-3 h-3 mr-2 text-green-400" />Sector-specific training modules</li>
                    <li className="flex items-center"><CheckCircle className="w-3 h-3 mr-2 text-green-400" />Phishing simulation campaigns</li>
                    <li className="flex items-center"><CheckCircle className="w-3 h-3 mr-2 text-green-400" />Progress tracking and reporting</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Specialized Detection Features */}
          <div className="bg-gradient-to-r from-surface/50 to-surface/30 rounded-2xl p-8 mb-16">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">Advanced Threat Detection Capabilities</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CustomRedWarningIcon className="w-12 h-12 text-red-400" size={56} />
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">Ransomware Canaries</h4>
                <p className="text-gray-400 text-sm">Lightweight tripwire files that detect ransomware activity before encryption begins, providing early warning for rapid response.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CustomBotIcon className="w-12 h-12 text-purple-400" size={56} />
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">Persistent Footholds</h4>
                <p className="text-gray-400 text-sm">Identifies advanced malware that survives reboots, detecting sophisticated threat actors maintaining access to your environment.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CustomEyeIcon className="w-12 h-12 text-green-400" size={56} />
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
                    <CheckCircle className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0 text-green-400" />
                    <span><strong className="text-white">Purpose-built for education:</strong> Custom-designed workflows for K-12 schools, universities, and government agencies</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0 text-green-400" />
                    <span><strong className="text-white">Lightweight deployment:</strong> Minimal system impact with powerful security coverage</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0 text-green-400" />
                    <span><strong className="text-white">Actionable intelligence:</strong> Priority-based alerts reduce noise and focus on real threats</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0 text-green-400" />
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
                  <CustomSettingsIcon className="w-8 h-8 text-cyan-400" size={40} />
                </div>
                <CardTitle className="text-xl text-white">Automated Incident Response</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 mb-4">
                  Intelligent response system that automatically contains, investigates, and remediates 
                  security incidents based on predefined playbooks.
                </p>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-400" />Instant threat containment</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-400" />Automated investigation</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-400" />Smart remediation</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-surface/80 backdrop-blur-md border border-green-500/30 cyber-glow">
              <CardHeader>
                <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-4">
                  <CustomFileTextIcon className="w-8 h-8 text-green-400" size={40} />
                </div>
                <CardTitle className="text-xl text-white">Compliance Automation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 mb-4">
                  Comprehensive compliance management supporting FERPA, CIPA, FedRAMP, FISMA, 
                  and NIST SP 800-53 requirements.
                </p>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-400" />Multi-framework support</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-400" />Automated reporting</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-400" />Audit trail management</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-surface/80 backdrop-blur-md border border-purple-500/30 cyber-glow">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-purple-400" />
                </div>
                <CardTitle className="text-xl text-white">Identity & Access Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 mb-4">
                  Advanced user authentication and authorization system with multi-factor authentication 
                  and role-based access control for secure resource management.
                </p>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-400" />Multi-factor authentication</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-400" />Role-based permissions</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-400" />Single sign-on integration</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-surface/80 backdrop-blur-md border border-orange-500/30 cyber-glow">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center mb-4">
                  <Network className="w-6 h-6 text-orange-400" />
                </div>
                <CardTitle className="text-xl text-white">Advanced Threat Intelligence</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 mb-4">
                  Real-time threat intelligence feeds combined with AI-powered analysis to identify 
                  and predict emerging cybersecurity threats before they impact your systems.
                </p>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-400" />Global threat feeds</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-400" />Predictive analytics</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-400" />Zero-day protection</li>
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
                  <CustomGraduationCapIcon className="w-12 h-12 text-blue-400" size={56} />
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
                  <CustomFlagIcon className="w-12 h-12 text-orange-400" size={56} />
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
                  <CustomShieldIcon className="w-12 h-12 text-red-400" size={56} />
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
                  <CustomBotIcon className="w-8 h-8 text-purple-400" size={40} />
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
                  <CustomShieldIcon className="w-8 h-8 text-green-400" size={40} />
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
                  <CustomTrendingUpIcon className="w-8 h-8 text-orange-400" size={40} />
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
                  <Network className="w-6 h-6 text-blue-400" />
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
                  <CustomHeadphonesIcon className="w-8 h-8 text-red-400" size={40} />
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
                <ArrowRight className="ml-2 w-5 h-5 text-white" />
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