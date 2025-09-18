import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
// All icons now use lazy-loaded Enhanced 4D versions with glass morphism effects
import {
  CustomShieldIcon,
  CustomBrainIcon,
  Enhanced4DNetworkIcon,
  Enhanced4DBrainIcon,
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
  Enhanced4DShieldIcon,
  Enhanced4DLockIcon,
  Enhanced4DTargetIcon,
  Enhanced4DEyeIcon,
  Enhanced4DBotIcon,
  Enhanced4DZapIcon,
  Enhanced4DActivityIcon,
  Enhanced4DCheckCircleIcon,
  Enhanced4DUsersIcon,
  Enhanced4DAlertTriangleIcon,
  Enhanced4DArrowRightIcon,
  Enhanced4DExternalLinkIcon,
  Enhanced4DTrendingUpIcon,
  Enhanced4DGlobeIcon,
  Enhanced4DFileIcon,
  Enhanced4DServerIcon,
  Enhanced4DBuildingIcon
} from "@/components/LazyCustomIcons";
import { Link, useLocation } from "wouter";
import { MarketingLayout } from "@/components/MarketingLayout";
import { ThreatMap } from "@/components/ThreatMap";
import { GeospatialIntelligenceMap } from "@/components/GeospatialIntelligenceMap";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { CypherAI } from "@/components/CypherAI";

// CSS for continuous scanning animation
const scanningStyles = `
  .scan-line-glow {
    box-shadow: 
      0 0 10px #00d4ff, 
      0 0 20px #00d4ff, 
      0 0 30px #00d4ff,
      0 0 40px #00d4ff;
    filter: blur(0.5px);
  }
`;

// Use optimized images from public assets to reduce bundle size
const threatIntelligenceImg = "/assets-optimized/AI_Threat_Detection_Engine_58460592-pfdo749l.webp";
const securityOperationsImg = "/assets-optimized/AI_Security_Risk_Assessment_4eae4751-CzGhOj9d.webp";
const complianceImg = "/assets-optimized/Federal_Compliance_Framework_bd4b8e1a-DglCbIqp.webp";
const imacMockupImg = "/assets-optimized/Security_Dashboard_Display_a8f2c653-BvnYxPq2.webp";
const zeroTrustImg = "/assets-optimized/Zero_Trust_Implementation_e9d7f412-CkLpRw8v.webp";
const aiSecurityImg = "/assets-optimized/AI_Security_Implementation_9c4e6d78-DhMnQx5z.webp";
const scanningImg = "/assets-optimized/Cypher_AI_Scanning_7f2a8b91-EkPqSw3x.webp";

// Use optimized webp images from public assets
const cypherAiAssistImage = "/assets-optimized/Cypher AI Assist_1757956837639-BFbk9fYh.webp";
const cypherAiGenImage = "/assets-optimized/AI_Threat_Detection_Live_579539ba-DVVLqqZ3.webp";
const ferpaCompliantImg = "/assets-optimized/Academic_Security_Framework_75c0b524-Cl5AlbU2.webp";
import fismaCompliantImg from "@assets/FISME_1757954427636.webp";
import isoCompliantImg from "@assets/ISO_1757954427638.webp";
import fedrampAuthorizedImg from "@assets/FedRamp_1757954427635.webp";

// Import partner logos and additional compliance badges
import mitPartnerImg from "@assets/Partner - MIT_1757954437926.webp";
import stanfordPartnerImg from "@assets/Partner Stanford_1757954437931.webp";
import berkeleyPartnerImg from "@assets/Partner - Univ of Berkley_1757954437927.webp";
import cambridgePartnerImg from "@assets/Partner - University of Cambridge_1757954437928.webp";
import universityPartnerImg from "@assets/Partner - University_1757954437929.webp";
import caStatePartnerImg from "@assets/Partner - CA State Univeristy_1757954437924.webp";
import mreaPartnerImg from "@assets/Partner - MREA_1757954437926.webp";
import soc2CompliantImg from "@assets/SOC 2_1757954437932.webp";

export default function Home() {
  const { user, isLoading } = useAuth();
  const [, setLocation] = useLocation();
  const [scanLinePosition, setScanLinePosition] = useState(0);
  const [scanDirection, setScanDirection] = useState(1); // 1 for down, -1 for up
  const [showCypherAI, setShowCypherAI] = useState(false);
  const [cypherExpanded, setCypherExpanded] = useState(false);

  useEffect(() => {
    if (window.location.pathname === '/') {
      console.log("Marketing homepage loaded - clearing potential auth cache");
    }
  }, []);

  // Continuous scanning animation
  useEffect(() => {
    const interval = setInterval(() => {
      setScanLinePosition((prev) => {
        const newPos = prev + (scanDirection * 2);
        
        // Reverse direction when hitting boundaries
        if (newPos >= 85) {
          setScanDirection(-1);
          return 85;
        }
        if (newPos <= 0) {
          setScanDirection(1);
          return 0;
        }
        
        return newPos;
      });
    }, 50);
    
    return () => clearInterval(interval);
  }, [scanDirection]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-interactive"></div>
      </div>
    );
  }

  return (
    <MarketingLayout>
      <style>{scanningStyles}</style>
      <div className="min-h-screen bg-slate-900">
        
        {/* Leadership Recognition Hero */}
        <section className="relative py-12 md:py-24 px-4 md:px-6 bg-gradient-to-br from-slate-900 via-blue-900/30 to-slate-900">
          <div className="absolute inset-0 bg-grid-white/[0.02]"></div>
          <div className="container mx-auto max-w-7xl relative z-10">
            <div className="text-center mb-8 md:mb-16">
              <Badge className="mb-4 md:mb-8 bg-cyan-500/20 text-cyan-300 border-cyan-500/30 text-sm md:text-lg px-4 md:px-6 py-1 md:py-2 flex items-center gap-2">
                <img src={cypherAiAssistImage} alt="Cypher AI Assistant" className="w-10 h-10 rounded-full" />
                Featuring Cypher AI Assistant - 95% Accuracy, 24/7 Support
              </Badge>
              <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 md:mb-8 leading-tight px-2">
                Enhanced with Cypher AI,<br className="hidden sm:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                  Intelligent Cyber Operations.
                </span>
              </h1>
              <div className="flex justify-center mb-6 md:mb-12">
                <Button 
                  size="lg" 
                  className="button-4d px-6 md:px-8 py-3 md:py-4 text-base md:text-lg"
                  onClick={() => window.location.href = '/solutions'}
                >
                  See how we lead
                  <Enhanced4DArrowRightIcon className="ml-2 w-4 md:w-5 h-4 md:h-5" size={20} />
                </Button>
              </div>
              
              {/* Professional Dashboard Interface - Matching cybersecuredai.com */}
              <div className="max-w-6xl mx-auto mb-16">
                <div className="relative bg-slate-800/95 rounded-xl border border-cyan-500/30 shadow-2xl overflow-hidden">
                  {/* Browser-style Header */}
                  <div className="bg-slate-700/80 p-3 border-b border-cyan-500/20">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="flex space-x-1">
                          <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                          <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                          <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                        </div>
                        <div className="text-xs text-gray-400 ml-4">https://dashboard.cybersecure.ai</div>
                      </div>
                      <Badge className="bg-cyan-500/20 text-cyan-300 text-xs">LIVE PLATFORM</Badge>
                    </div>
                  </div>

                  {/* Dashboard Header */}
                  <div className="bg-slate-800/90 p-3 md:p-4 border-b border-cyan-500/20">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                      <div className="flex items-center space-x-3">
                        <Enhanced4DShieldIcon className="w-5 h-5 md:w-6 md:h-6 text-cyan-400" size={24} />
                        <div>
                          <h3 className="text-white font-bold text-base md:text-lg">CyberSecured AI Platform</h3>
                          <p className="text-gray-400 text-xs md:text-sm">Converged Intelligence Dashboard</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 md:w-3 md:h-3 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-green-400 text-xs md:text-sm font-medium">OPERATIONAL</span>
                        <span className="text-gray-400 text-xs md:text-sm hidden sm:inline">Last Update: Live</span>
                      </div>
                    </div>
                  </div>

                  {/* Intelligence Overview Section */}
                  <div className="p-3 md:p-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <Enhanced4DTargetIcon className="w-5 h-5 text-cyan-400" size={20} />
                      <h4 className="text-cyan-400 font-bold uppercase text-sm tracking-wider">Intelligence Overview</h4>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                      {/* 94% Threat Confidence */}
                      <div className="bg-cyan-500/10 rounded-lg p-4 border border-cyan-500/30">
                        <div className="text-3xl font-bold text-cyan-400 mb-1">94%</div>
                        <div className="text-sm text-gray-400">Threat Confidence</div>
                        <div className="w-full bg-slate-600 rounded-full h-1 mt-2">
                          <div className="bg-cyan-400 h-1 rounded-full" style={{width: '94%'}}></div>
                        </div>
                      </div>

                      {/* 2,847 Data Points */}
                      <div className="bg-purple-500/10 rounded-lg p-4 border border-purple-500/30">
                        <div className="text-3xl font-bold text-purple-400 mb-1">2,847</div>
                        <div className="text-sm text-gray-400">Data Points Analyzed</div>
                        <div className="text-xs text-purple-300 mt-1">• Real-time</div>
                      </div>

                      {/* 847 Threats Blocked */}
                      <div className="bg-green-500/10 rounded-lg p-4 border border-green-500/30">
                        <div className="text-3xl font-bold text-green-400 mb-1">847</div>
                        <div className="text-sm text-gray-400">Threats Blocked</div>
                        <div className="text-xs text-green-300 mt-1">Today</div>
                      </div>

                      {/* 15 Intelligence Sources */}
                      <div className="bg-orange-500/10 rounded-lg p-4 border border-orange-500/30">
                        <div className="text-3xl font-bold text-orange-400 mb-1">15</div>
                        <div className="text-sm text-gray-400">Active Intelligence</div>
                        <div className="text-xs text-orange-300 mt-1">Sources • Live Feeds</div>
                      </div>
                    </div>

                    {/* Bottom Section with 5D Geospatial, Cambridge Analytics, and Compliance */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      {/* 5D Geospatial Intelligence with Avatar Guide - Live Interactive Dashboard */}
                      <div className="lg:col-span-2 bg-slate-700/40 rounded-lg p-4 border border-gray-600/30">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-2">
                            <Enhanced4DGlobeIcon className="w-5 h-5 text-blue-400" size={20} />
                            <h5 className="text-blue-400 font-bold text-sm uppercase">5D Geospatial Intelligence with Avatar Guide</h5>
                          </div>
                          <Badge className="bg-red-500/20 text-red-300 text-xs">LIVE</Badge>
                        </div>
                        
                        {/* Live Threat Monitoring Map - Exact Match */}
                        <div className="h-64 bg-slate-800/60 rounded border border-blue-500/20 overflow-hidden relative">
                          {/* LIVE THREAT MONITORING Badge */}
                          <div className="absolute top-3 left-3 bg-blue-600 text-white text-xs px-3 py-1 rounded font-bold z-20">
                            LIVE THREAT MONITORING
                          </div>
                          
                          {/* REAL-TIME Indicator */}
                          <div className="absolute top-3 right-3 bg-green-600/90 text-white text-xs px-2 py-1 rounded flex items-center space-x-1 z-20">
                            <span className="text-green-300">●</span>
                            <span>REAL-TIME</span>
                          </div>

                          {/* Threat Levels Legend */}
                          <div className="absolute bottom-3 left-3 bg-slate-900/90 rounded p-3 z-20">
                            <div className="text-white text-xs font-bold mb-2">Threat Levels</div>
                            <div className="space-y-1">
                              <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                <span className="text-white text-xs">High Risk</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                                <span className="text-white text-xs">Medium Risk</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                <span className="text-white text-xs">Low Risk</span>
                              </div>
                            </div>
                          </div>

                          {/* Zoom Controls */}
                          <div className="absolute right-3 top-16 bg-white rounded shadow-lg z-20">
                            <button className="block w-8 h-8 text-gray-700 hover:bg-gray-100 text-lg font-bold border-b border-gray-200">+</button>
                            <button className="block w-8 h-8 text-gray-700 hover:bg-gray-100 text-lg font-bold">−</button>
                          </div>

                          {/* Active Threats Counter */}
                          <div className="absolute bottom-3 right-3 bg-slate-900/90 text-white text-xs px-3 py-1 rounded font-bold z-20">
                            5 ACTIVE THREATS
                          </div>

                          {/* Clean Map */}
                          <div className="relative w-full h-full">
                            <ThreatMap className="w-full h-full" />
                          </div>
                        </div>
                        
                        {/* Threat Level Statistics Bar */}
                        <div className="grid grid-cols-4 gap-3 mt-4">
                          <div className="bg-red-900/30 rounded-lg p-3 text-center border border-red-500/30">
                            <div className="text-2xl font-bold text-red-400">4</div>
                            <div className="text-xs text-red-300">Critical</div>
                          </div>
                          <div className="bg-orange-900/30 rounded-lg p-3 text-center border border-orange-500/30">
                            <div className="text-2xl font-bold text-orange-400">7</div>
                            <div className="text-xs text-orange-300">High</div>
                          </div>
                          <div className="bg-yellow-900/30 rounded-lg p-3 text-center border border-yellow-500/30">
                            <div className="text-2xl font-bold text-yellow-400">12</div>
                            <div className="text-xs text-yellow-300">Medium</div>
                          </div>
                          <div className="bg-blue-900/30 rounded-lg p-3 text-center border border-blue-500/30">
                            <div className="text-2xl font-bold text-blue-400">23</div>
                            <div className="text-xs text-blue-300">Low</div>
                          </div>
                        </div>
                      </div>

                      {/* Right Column */}
                      <div className="space-y-6">
                        {/* Cambridge Analytics - Exact Match */}
                        <div className="bg-slate-700/40 rounded-lg p-4 border border-purple-500/30">
                          <div className="flex items-center space-x-2 mb-3">
                            <Enhanced4DBrainIcon className="w-5 h-5 text-purple-400" size={20} />
                            <h5 className="text-purple-400 font-bold text-sm uppercase">Cambridge Analytics</h5>
                          </div>
                          <div className="text-center">
                            <div className="text-4xl font-bold text-purple-400 mb-2">89%</div>
                            <div className="text-sm text-gray-400 mb-3">AI Accuracy</div>
                            <div className="space-y-1 text-xs text-left">
                              <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                <span className="text-gray-400">Phishing Campaign</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                                <span className="text-gray-400">Network Anomaly</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Compliance - Exact Match */}
                        <div className="bg-slate-700/40 rounded-lg p-4 border border-green-500/30">
                          <div className="flex items-center space-x-2 mb-3">
                            <Enhanced4DCheckCircleIcon className="w-5 h-5 text-green-400" size={20} />
                            <h5 className="text-green-400 font-bold text-sm uppercase">Compliance</h5>
                          </div>
                          <div className="text-center">
                            <div className="text-4xl font-bold text-green-400 mb-2">96%</div>
                            <div className="text-sm text-gray-400 mb-3">Overall Score</div>
                            <div className="space-y-2 text-xs">
                              <div className="flex justify-between">
                                <span className="text-gray-400">FERPA</span>
                                <span className="text-green-400 font-bold">98%</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-400">FISMA</span>
                                <span className="text-green-400 font-bold">95%</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-400">CIPA</span>
                                <span className="text-green-400 font-bold">92%</span>
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

        {/* Revolutionary AI Systems Hero */}
        <section className="relative py-20 md:py-32 px-4 md:px-6 bg-gradient-to-br from-slate-900 via-purple-900/40 to-slate-900">
          <div className="absolute inset-0 bg-grid-white/[0.03]"></div>
          <div className="container mx-auto max-w-7xl relative z-10">
            <div className="text-center mb-16">
              <Badge className="mb-8 bg-red-500/20 text-red-300 border-red-500/30 text-xl px-8 py-4 flex items-center justify-center gap-3 max-w-md mx-auto">
                <Enhanced4DShieldIcon className="w-6 h-6" size={24} />
                FEDERAL DEPLOYMENT READY
              </Badge>
              <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-tight">
                Five Revolutionary<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-cyan-400 to-blue-500">
                  CyberSecured AI Systems
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 max-w-5xl mx-auto mb-12 leading-relaxed">
                Production-ready federal-grade cybersecurity with genetic AI evolution, holographic interfaces, 
                autonomous drone coordination, and real-time geospatial intelligence
              </p>
              
              {/* Federal Compliance Badges */}
              <div className="flex flex-wrap justify-center gap-4 mb-12">
                <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30 px-4 py-2">
                  <Enhanced4DCheckCircleIcon className="w-4 h-4 mr-2" size={16} />
                  FISMA Compliant
                </Badge>
                <Badge className="bg-green-500/20 text-green-300 border-green-500/30 px-4 py-2">
                  <Enhanced4DCheckCircleIcon className="w-4 h-4 mr-2" size={16} />
                  FedRAMP Authorized
                </Badge>
                <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30 px-4 py-2">
                  <Enhanced4DCheckCircleIcon className="w-4 h-4 mr-2" size={16} />
                  NIST Framework
                </Badge>
              </div>

              <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
                <Button 
                  size="lg" 
                  className="button-4d px-10 py-4 text-lg font-semibold"
                  onClick={() => window.location.href = '/platform'}
                >
                  <Enhanced4DGlobeIcon className="mr-2 w-6 h-6" size={24} />
                  Explore All Systems
                </Button>
                <Button 
                  size="lg" 
                  className="button-4d px-10 py-4 text-lg font-semibold"
                  onClick={() => window.location.href = '/contact'}
                >
                  Request Federal Demo
                  <Enhanced4DArrowRightIcon className="ml-2 w-6 h-6" size={24} />
                </Button>
              </div>
            </div>

            {/* Five Revolutionary Systems Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              
              {/* CyDEF - Autonomous Cyber Defense */}
              <Card className="bg-gradient-to-br from-purple-900/60 to-slate-800/60 border border-purple-500/40 hover:border-purple-400/70 transition-all duration-300 group lg:col-span-1">
                <CardHeader className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-16 h-16 bg-purple-500/30 rounded-xl flex items-center justify-center border border-purple-400/50">
                      <Enhanced4DBrainIcon className="w-8 h-8 text-purple-300" size={32} />
                    </div>
                    <Badge className="bg-purple-500/20 text-purple-300 border-purple-400/30 text-xs">
                      🧠 GENETIC AI
                    </Badge>
                  </div>
                  <CardTitle className="text-2xl text-white mb-4">CyDEF</CardTitle>
                  <p className="text-lg text-purple-300 font-semibold mb-3">Autonomous Cyber Defense</p>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Self-evolving genetic algorithms with 99.2% accuracy. Multi-generational learning, 
                    autonomous threat response, and federal-grade AI-powered defense systems.
                  </p>
                </CardHeader>
                <CardContent className="p-8 pt-0">
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center text-sm text-gray-300">
                      <Enhanced4DCheckCircleIcon className="w-4 h-4 mr-2 text-purple-400" size={16} />
                      Genetic Algorithm Evolution
                    </div>
                    <div className="flex items-center text-sm text-gray-300">
                      <Enhanced4DCheckCircleIcon className="w-4 h-4 mr-2 text-purple-400" size={16} />
                      99.2% Threat Detection Accuracy
                    </div>
                    <div className="flex items-center text-sm text-gray-300">
                      <Enhanced4DCheckCircleIcon className="w-4 h-4 mr-2 text-purple-400" size={16} />
                      Autonomous Policy Generation
                    </div>
                  </div>
                  <Button 
                    className="button-4d w-full"
                    onClick={() => window.location.href = '/dashboard/cydef'}
                  >
                    Access CyDEF Dashboard
                    <Enhanced4DArrowRightIcon className="ml-2 w-4 h-4" size={16} />
                  </Button>
                </CardContent>
              </Card>

              {/* Live Location Tracking */}
              <Card className="bg-gradient-to-br from-cyan-900/60 to-slate-800/60 border border-cyan-500/40 hover:border-cyan-400/70 transition-all duration-300 group">
                <CardHeader className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-16 h-16 bg-cyan-500/30 rounded-xl flex items-center justify-center border border-cyan-400/50">
                      <Enhanced4DGlobeIcon className="w-8 h-8 text-cyan-300" size={32} />
                    </div>
                    <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-400/30 text-xs">
                      📍 GEOSPATIAL
                    </Badge>
                  </div>
                  <CardTitle className="text-2xl text-white mb-4">Live Location</CardTitle>
                  <p className="text-lg text-cyan-300 font-semibold mb-3">Real-Time Asset Tracking</p>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Real-time device and asset monitoring with geospatial intelligence integration, 
                    automated threat correlation, and comprehensive location-based security.
                  </p>
                </CardHeader>
                <CardContent className="p-8 pt-0">
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center text-sm text-gray-300">
                      <Enhanced4DCheckCircleIcon className="w-4 h-4 mr-2 text-cyan-400" size={16} />
                      Real-Time Device Monitoring
                    </div>
                    <div className="flex items-center text-sm text-gray-300">
                      <Enhanced4DCheckCircleIcon className="w-4 h-4 mr-2 text-cyan-400" size={16} />
                      Geospatial Intelligence Integration
                    </div>
                    <div className="flex items-center text-sm text-gray-300">
                      <Enhanced4DCheckCircleIcon className="w-4 h-4 mr-2 text-cyan-400" size={16} />
                      Automated Threat Correlation
                    </div>
                  </div>
                  <Button 
                    className="button-4d w-full"
                    onClick={() => window.location.href = '/dashboard/location'}
                  >
                    View Location Dashboard
                    <Enhanced4DArrowRightIcon className="ml-2 w-4 h-4" size={16} />
                  </Button>
                </CardContent>
              </Card>

              {/* CypherHUM - Holographic Interface */}
              <Card className="bg-gradient-to-br from-blue-900/60 to-slate-800/60 border border-blue-500/40 hover:border-blue-400/70 transition-all duration-300 group">
                <CardHeader className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-16 h-16 bg-blue-500/30 rounded-xl flex items-center justify-center border border-blue-400/50">
                      <Enhanced4DEyeIcon className="w-8 h-8 text-blue-300" size={32} />
                    </div>
                    <Badge className="bg-blue-500/20 text-blue-300 border-blue-400/30 text-xs">
                      👁️ 5D HOLOGRAPHIC AVATAR
                    </Badge>
                  </div>
                  <CardTitle className="text-2xl text-white mb-4">CypherHUM</CardTitle>
                  <p className="text-lg text-blue-300 font-semibold mb-3">Live Human-Like Avatar Interface</p>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Revolutionary 5D threat visualization with live human-like avatar guide featuring natural movements, 
                    facial expressions, and contextual gestures. Experience temporal threat analysis across time and space dimensions.
                  </p>
                </CardHeader>
                <CardContent className="p-8 pt-0">
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center text-sm text-gray-300">
                      <Enhanced4DCheckCircleIcon className="w-4 h-4 mr-2 text-blue-400" size={16} />
                      5D Holographic Threat Matrix
                    </div>
                    <div className="flex items-center text-sm text-gray-300">
                      <Enhanced4DCheckCircleIcon className="w-4 h-4 mr-2 text-blue-400" size={16} />
                      Live Avatar with Facial Expressions
                    </div>
                    <div className="flex items-center text-sm text-gray-300">
                      <Enhanced4DCheckCircleIcon className="w-4 h-4 mr-2 text-blue-400" size={16} />
                      AI Natural Language Processing
                    </div>
                  </div>
                  <Button 
                    className="button-4d w-full"
                    onClick={() => window.location.href = '/dashboard/cypherHUM'}
                  >
                    Enter Holographic Interface
                    <Enhanced4DArrowRightIcon className="ml-2 w-4 h-4" size={16} />
                  </Button>
                </CardContent>
              </Card>

              {/* ACDS - Autonomous Cyber Defense Swarm */}
              <Card className="bg-gradient-to-br from-red-900/60 to-slate-800/60 border border-red-500/40 hover:border-red-400/70 transition-all duration-300 group md:col-span-2 lg:col-span-1">
                <CardHeader className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-16 h-16 bg-red-500/30 rounded-xl flex items-center justify-center border border-red-400/50">
                      <Enhanced4DZapIcon className="w-8 h-8 text-red-300" size={32} />
                    </div>
                    <Badge className="bg-red-500/20 text-red-300 border-red-400/30 text-xs">
                      🚁 DRONE SWARM
                    </Badge>
                  </div>
                  <CardTitle className="text-2xl text-white mb-4">ACDS</CardTitle>
                  <p className="text-lg text-red-300 font-semibold mb-3">Autonomous Cyber Defense Swarm</p>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Drone swarm coordination and monitoring with autonomous defensive operations, 
                    real-time swarm intelligence, and integrated cyber-physical security systems.
                  </p>
                </CardHeader>
                <CardContent className="p-8 pt-0">
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center text-sm text-gray-300">
                      <Enhanced4DCheckCircleIcon className="w-4 h-4 mr-2 text-red-400" size={16} />
                      Drone Swarm Coordination
                    </div>
                    <div className="flex items-center text-sm text-gray-300">
                      <Enhanced4DCheckCircleIcon className="w-4 h-4 mr-2 text-red-400" size={16} />
                      Autonomous Defensive Operations
                    </div>
                    <div className="flex items-center text-sm text-gray-300">
                      <Enhanced4DCheckCircleIcon className="w-4 h-4 mr-2 text-red-400" size={16} />
                      Real-Time Swarm Intelligence
                    </div>
                  </div>
                  <Button 
                    className="button-4d w-full"
                    onClick={() => window.location.href = '/dashboard/acds'}
                  >
                    Access ACDS Control
                    <Enhanced4DArrowRightIcon className="ml-2 w-4 h-4" size={16} />
                  </Button>
                </CardContent>
              </Card>

              {/* Unified Integration Platform */}
              <Card className="bg-gradient-to-br from-green-900/60 to-slate-800/60 border border-green-500/40 hover:border-green-400/70 transition-all duration-300 group md:col-span-2">
                <CardHeader className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-16 h-16 bg-green-500/30 rounded-xl flex items-center justify-center border border-green-400/50">
                      <Enhanced4DNetworkIcon className="w-8 h-8 text-green-300" size={32} />
                    </div>
                    <Badge className="bg-green-500/20 text-green-300 border-green-400/30 text-xs">
                      🔄 UNIFIED ANALYTICS
                    </Badge>
                  </div>
                  <CardTitle className="text-2xl text-white mb-4">Unified Integration Platform</CardTitle>
                  <p className="text-lg text-green-300 font-semibold mb-3">Cross-System Analytics & Correlation</p>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Cross-system analytics and correlation engine with centralized alert management, 
                    executive compliance dashboards, and federal deployment architecture integration.
                  </p>
                </CardHeader>
                <CardContent className="p-8 pt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-gray-300">
                        <Enhanced4DCheckCircleIcon className="w-4 h-4 mr-2 text-green-400" size={16} />
                        Cross-System Analytics
                      </div>
                      <div className="flex items-center text-sm text-gray-300">
                        <Enhanced4DCheckCircleIcon className="w-4 h-4 mr-2 text-green-400" size={16} />
                        Centralized Alert Management
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-gray-300">
                        <Enhanced4DCheckCircleIcon className="w-4 h-4 mr-2 text-green-400" size={16} />
                        Executive Compliance Dashboards
                      </div>
                      <div className="flex items-center text-sm text-gray-300">
                        <Enhanced4DCheckCircleIcon className="w-4 h-4 mr-2 text-green-400" size={16} />
                        Federal Deployment Architecture
                      </div>
                    </div>
                  </div>
                  <Button 
                    className="button-4d w-full"
                    onClick={() => window.location.href = '/dashboard/unified'}
                  >
                    Access Unified Platform
                    <Enhanced4DArrowRightIcon className="ml-2 w-4 h-4" size={16} />
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Technical Specifications Banner */}
            <div className="mt-16 bg-slate-800/60 rounded-xl border border-cyan-500/30 p-8">
              <h3 className="text-2xl font-bold text-white mb-6 text-center">
                Enterprise Technical Architecture
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-cyan-400 mb-2">5</div>
                  <div className="text-sm text-gray-300">Operational WebSocket Servers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400 mb-2">JWT</div>
                  <div className="text-sm text-gray-300">Role-Based Authorization</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">5D</div>
                  <div className="text-sm text-gray-300">Avatar-Guided Threat Visualization</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-400 mb-2">AI</div>
                  <div className="text-sm text-gray-300">Genetic Algorithm Evolution</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* AI Security Scanner */}
        <section className="py-24 px-6 bg-gradient-to-br from-slate-800 via-blue-900/20 to-slate-800">
          <div className="container mx-auto max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              
              {/* Scanner Interface */}
              <div>
                <Badge className="mb-6 bg-cyan-500/20 text-cyan-300 border-cyan-500/30 text-lg px-6 py-3">
                  AI-Powered Security Scanner
                </Badge>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                  Experience Our<br />
                  <span className="text-cyan-400">Advanced AI Scanner</span>
                </h2>
                <p className="text-xl text-gray-300 mb-8">
                  See how our AI-powered facial recognition and behavioral analysis 
                  technology works in real-time to detect potential security threats.
                </p>

                <div className="space-y-6">
                  {/* Call to Action */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button 
                      size="lg" 
                      className="button-4d px-8 py-4 text-lg"
                      data-testid="button-learn-more"
                      onClick={() => window.location.href = '/platform'}
                    >
                      <Enhanced4DTargetIcon className="mr-2 w-5 h-5" size={20} />
                      Learn About Our Technology
                    </Button>
                    <Button 
                      size="lg" 
                      className="button-4d px-8 py-4 text-lg"
                      data-testid="link-demo"
                      onClick={() => window.location.href = '/contact'}
                    >
                      Request Demo
                      <Enhanced4DArrowRightIcon className="ml-2 w-5 h-5" size={20} />
                    </Button>
                  </div>

                  {/* Features List */}
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Enhanced4DCheckCircleIcon className="w-5 h-5 text-green-400" size={20} />
                      <span className="text-gray-300">Enterprise Single Sign-On (SSO) with JWT security</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Enhanced4DCheckCircleIcon className="w-5 h-5 text-green-400" size={20} />
                      <span className="text-gray-300">AES-256 encryption for all sensitive data</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Enhanced4DCheckCircleIcon className="w-5 h-5 text-green-400" size={20} />
                      <span className="text-gray-300">Real-time facial recognition analysis</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Enhanced4DCheckCircleIcon className="w-5 h-5 text-green-400" size={20} />
                      <span className="text-gray-300">Advanced behavioral pattern detection</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Enhanced4DCheckCircleIcon className="w-5 h-5 text-green-400" size={20} />
                      <span className="text-gray-300">PyMISP & CIRCL enhanced threat intelligence</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Enhanced4DCheckCircleIcon className="w-5 h-5 text-green-400" size={20} />
                      <span className="text-gray-300">Instant security recommendations</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Scanner Visual */}
              <div className="relative">
                <div className="relative overflow-hidden rounded-xl">
                  <img 
                    src={scanningImg}
                    alt="AI Security Scanner in Action"
                    className="w-full rounded-xl shadow-2xl border border-cyan-500/30"
                  />
                  
                  {/* Face Detection Frame - Always Visible */}
                  <div className="absolute top-[15%] left-[25%] w-[50%] h-[70%] border-2 border-cyan-400/60 rounded-lg">
                    {/* Corner markers */}
                    <div className="absolute -top-1 -left-1 w-4 h-4 border-l-2 border-t-2 border-cyan-400"></div>
                    <div className="absolute -top-1 -right-1 w-4 h-4 border-r-2 border-t-2 border-cyan-400"></div>
                    <div className="absolute -bottom-1 -left-1 w-4 h-4 border-l-2 border-b-2 border-cyan-400"></div>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 border-r-2 border-b-2 border-cyan-400"></div>
                  </div>
                  
                  {/* Continuous Scanning Line Animation */}
                  <div className="absolute top-[15%] left-[25%] w-[50%] h-[70%] overflow-hidden rounded-lg">
                    {/* Moving scan line */}
                    <div 
                      className="absolute w-full h-1 bg-cyan-400 scan-line-glow transition-all duration-75"
                      style={{
                        top: `${scanLinePosition}%`,
                        opacity: 0.8
                      }}
                    ></div>
                    
                    {/* Subtle background glow */}
                    <div className="absolute inset-0 rounded-lg bg-cyan-400/5 animate-pulse"></div>
                  </div>
                </div>
                
                {/* Status Indicators */}
                <div className="absolute top-6 left-6 bg-slate-900/90 rounded-lg p-3 border border-cyan-500/30">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse"></div>
                    <span className="text-white text-sm font-medium">
                      LIVE SCANNING
                    </span>
                  </div>
                </div>

                {/* Demo Overlay */}
                <div className="absolute top-[10%] right-[20%] bg-slate-900/95 rounded-lg p-4 border border-cyan-500/50 max-w-xs">
                  <div className="text-cyan-400 text-sm font-bold mb-2">⚡ LIVE DEMO</div>
                  <div className="space-y-1 text-xs text-gray-300">
                    <div>Facial Recognition: Active</div>
                    <div>Threat Analysis: Real-time</div>
                    <div>Security Level: Maximum</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 🔐 Enterprise Authentication & Security Section */}
        <section className="py-20 px-6 bg-gradient-to-b from-slate-800 to-slate-900">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-bold text-white mb-8">
                Enterprise-Grade<br />
                <span className="text-cyan-400 neon-glow">Authentication & Security</span>
              </h2>
              <p className="text-xl text-gray-300 mb-12 max-w-4xl mx-auto">
                Built with production-ready single sign-on, advanced encryption, and comprehensive security features 
                that meet the highest standards for educational and government institutions.
              </p>
            </div>

            {/* Security Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {/* Single Sign-On with 4D Visual */}
              <Card className="holographic-card border-cyan-500/30 bg-slate-800/50 relative overflow-hidden">
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-16 h-16 bg-slate-800/80 rounded-2xl border-2 border-cyan-500/50 flex items-center justify-center hover:border-cyan-400 transition-all duration-300">
                      <Enhanced4DShieldIcon className="w-8 h-8 text-cyan-400" size={32} />
                    </div>
                    <CardTitle className="text-cyan-300 font-bold">
                      <span className="neon-glow">Single Sign-On (SSO)</span>
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-center space-x-3">
                      <Enhanced4DCheckCircleIcon className="w-4 h-4 text-green-400" size={16} />
                      <span>JWT-based secure token authentication</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <Enhanced4DCheckCircleIcon className="w-4 h-4 text-green-400" size={16} />
                      <span>24-hour access tokens with auto-refresh</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <Enhanced4DCheckCircleIcon className="w-4 h-4 text-green-400" size={16} />
                      <span>Role-based access control (RBAC)</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <Enhanced4DCheckCircleIcon className="w-4 h-4 text-green-400" size={16} />
                      <span>Seamless user experience</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* AES-256 Encryption with 4D Visual */}
              <Card className="holographic-card border-purple-500/30 bg-slate-800/50 relative overflow-hidden">
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-16 h-16 bg-slate-800/80 rounded-2xl border-2 border-purple-500/50 flex items-center justify-center hover:border-purple-400 transition-all duration-300">
                      <Enhanced4DLockIcon className="w-8 h-8 text-purple-400" size={32} />
                    </div>
                    <CardTitle className="text-purple-300 font-bold">
                      <span className="neon-glow">AES-256 Encryption</span>
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-center space-x-3">
                      <Enhanced4DCheckCircleIcon className="w-4 h-4 text-green-400" size={16} />
                      <span>Military-grade AES-256 data encryption</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <Enhanced4DCheckCircleIcon className="w-4 h-4 text-green-400" size={16} />
                      <span>Bcrypt password hashing (12 salt rounds)</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <Enhanced4DCheckCircleIcon className="w-4 h-4 text-green-400" size={16} />
                      <span>Encrypted TOTP secrets & sensitive data</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <Enhanced4DCheckCircleIcon className="w-4 h-4 text-green-400" size={16} />
                      <span>Zero-knowledge data protection</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Advanced Security */}
              <Card className="holographic-card border-red-500/30 bg-slate-800/50">
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-16 h-16 bg-slate-800/80 rounded-2xl border-2 border-red-500/50 flex items-center justify-center hover:border-red-400 transition-all duration-300">
                      <Enhanced4DAlertTriangleIcon className="w-8 h-8 text-red-400" size={32} />
                    </div>
                    <CardTitle className="text-red-300 font-bold">
                      <span className="neon-glow">Threat Protection</span>
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-center space-x-3">
                      <Enhanced4DCheckCircleIcon className="w-4 h-4 text-green-400" size={16} />
                      <span>Rate limiting & brute force protection</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <Enhanced4DCheckCircleIcon className="w-4 h-4 text-green-400" size={16} />
                      <span>Multi-factor authentication (MFA)</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <Enhanced4DCheckCircleIcon className="w-4 h-4 text-green-400" size={16} />
                      <span>Session management & token validation</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <Enhanced4DCheckCircleIcon className="w-4 h-4 text-green-400" size={16} />
                      <span>Comprehensive security logging</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Security Compliance Badges with Actual Certificates */}
            <div className="text-center mb-12">
              <h3 className="text-2xl font-bold text-white mb-8">
                <span className="neon-glow">Security & Compliance Certifications</span>
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-6 max-w-5xl mx-auto mb-8">
                <div className="bg-slate-800/50 rounded-lg p-4 border border-green-500/30 holo-badge hover:scale-105 transition-all duration-300 flex flex-col items-center">
                  <div className="relative w-20 h-20 flex items-center justify-center mb-3">
                    <img 
                      src={soc2CompliantImg}
                      alt="SOC 2 TYPE II Certification Badge"
                      className="w-full h-full object-contain filter brightness-100 hover:brightness-125 transition-all duration-300 drop-shadow-lg"
                    />
                  </div>
                  <div className="text-green-400 font-bold text-sm">SOC 2 TYPE II</div>
                  <div className="text-gray-400 text-xs text-center">Certified Secure</div>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-4 border border-cyan-500/30 holo-badge hover:scale-105 transition-all duration-300 flex flex-col items-center">
                  <div className="relative w-20 h-20 flex items-center justify-center mb-3">
                    <img 
                      src={ferpaCompliantImg}
                      alt="FERPA Compliant Badge"
                      className="w-full h-full object-contain filter brightness-100 hover:brightness-125 transition-all duration-300 drop-shadow-lg"
                    />
                  </div>
                  <div className="text-cyan-400 font-bold text-sm">FERPA</div>
                  <div className="text-gray-400 text-xs text-center">Education Privacy</div>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-4 border border-blue-500/30 holo-badge hover:scale-105 transition-all duration-300 flex flex-col items-center">
                  <div className="relative w-20 h-20 flex items-center justify-center mb-3">
                    <img 
                      src={fismaCompliantImg}
                      alt="FISMA Compliant Badge"
                      className="w-full h-full object-contain filter brightness-100 hover:brightness-125 transition-all duration-300 drop-shadow-lg"
                    />
                  </div>
                  <div className="text-blue-400 font-bold text-sm">FISMA READY</div>
                  <div className="text-gray-400 text-xs text-center">Federal Security</div>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-4 border border-purple-500/30 holo-badge hover:scale-105 transition-all duration-300 flex flex-col items-center">
                  <div className="relative w-20 h-20 flex items-center justify-center mb-3">
                    <img 
                      src={isoCompliantImg}
                      alt="ISO 27001 Certification Badge"
                      className="w-full h-full object-contain filter brightness-100 hover:brightness-125 transition-all duration-300 drop-shadow-lg"
                    />
                  </div>
                  <div className="text-purple-400 font-bold text-sm">ISO 27001</div>
                  <div className="text-gray-400 text-xs text-center">Info Security Mgmt</div>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-4 border border-orange-500/30 holo-badge hover:scale-105 transition-all duration-300 flex flex-col items-center">
                  <div className="relative w-20 h-20 flex items-center justify-center mb-3">
                    <img 
                      src={fedrampAuthorizedImg}
                      alt="FedRAMP Authorized Badge"
                      className="w-full h-full object-contain filter brightness-100 hover:brightness-125 transition-all duration-300 drop-shadow-lg"
                    />
                  </div>
                  <div className="text-orange-400 font-bold text-sm">FedRAMP</div>
                  <div className="text-gray-400 text-xs text-center">Gov Cloud Ready</div>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center">
              <Button 
                size="lg" 
                className="button-4d px-8 py-4 text-lg"
                onClick={() => { window.location.href = '/contact';  }}
              >
                Experience Secure Authentication
                <Enhanced4DShieldIcon className="ml-2 w-5 h-5" size={20} />
              </Button>
            </div>
          </div>
        </section>

        {/* Market Leadership Statistics */}
        <section className="py-20 px-6 bg-gradient-to-b from-slate-900 to-slate-800">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-bold text-white mb-8">
                We Don't Just Compete.<br />
                <span className="text-cyan-400">We Change the Game.</span>
              </h2>
              <p className="text-2xl text-gray-300 mb-12 max-w-4xl mx-auto">
                CyberSecured AI Threat Intelligence is the #1 leader in educational cybersecurity 
                for 5+ years - with <span className="text-cyan-400 font-bold">87% market share*</span>
              </p>
              <div className="flex justify-center mb-12">
                <Button 
                  size="lg" 
                  className="button-4d px-8 py-4 text-lg"
                  onClick={() => window.location.href = '/about'}
                >
                  See why
                  <Enhanced4DExternalLinkIcon className="ml-2 w-5 h-5" size={20} />
                </Button>
              </div>
            </div>

            {/* Dual Cypher AI Models Showcase */}
            <div className="max-w-6xl mx-auto mb-16">
              <div className="text-center mb-12">
                <h3 className="text-4xl font-bold text-white mb-6">
                  🧬 Meet <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Cypher AI Dual Intelligence</span>
                </h3>
                <p className="text-xl text-gray-300 max-w-4xl mx-auto mb-8">
                  Revolutionary dual AI architecture: <span className="text-purple-400 font-bold">Cypher AI Genetic Model</span> with self-evolving genetic algorithms, 
                  and <span className="text-cyan-400 font-bold">Cypher AI Assistant</span> for internal operations automation.
                </p>
              </div>

              {/* Dual AI Model Cards */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                {/* Cypher AI Genetic Model */}
                <Card className="bg-gradient-to-br from-purple-900/50 to-slate-800/50 border-2 border-purple-500/50 hover:border-purple-400 transition-all duration-300">
                  <CardContent className="p-8">
                    <div className="flex items-center mb-6">
                      <div className="w-16 h-16 bg-slate-800/80 rounded-2xl border-2 border-purple-500/50 flex items-center justify-center mr-4 hover:border-purple-400 transition-all duration-300">
                        <img src={cypherAiGenImage} alt="Cypher AI Gen" className="w-12 h-12 rounded-full" />
                      </div>
                      <div>
                        <h4 className="text-2xl font-bold text-purple-400">Cypher AI Genetic</h4>
                        <p className="text-sm text-gray-400">Self-Evolving Intelligence</p>
                      </div>
                    </div>
                    <p className="text-gray-300 mb-6">
                      Revolutionary AI that evolves through genetic algorithms, adapting and improving continuously with 99.2% autonomous accuracy.
                    </p>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-400">False Positive Reduction</span>
                        <span className="text-purple-400 font-bold">-78%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-400">Threat Response Speed</span>
                        <span className="text-purple-400 font-bold">+65%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-400">Security Gap Reduction</span>
                        <span className="text-purple-400 font-bold">-82%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Cypher AI Assistant */}
                <Card className="bg-gradient-to-br from-cyan-900/50 to-slate-800/50 border-2 border-cyan-500/50 hover:border-cyan-400 transition-all duration-300">
                  <CardContent className="p-8">
                    <div className="flex items-center mb-6">
                      <div className="w-16 h-16 bg-slate-800/80 rounded-2xl border-2 border-cyan-500/50 flex items-center justify-center mr-4 hover:border-cyan-400 transition-all duration-300">
                        <img src={cypherAiAssistImage} alt="Cypher AI Assistant" className="w-12 h-12 rounded-full" />
                      </div>
                      <div>
                        <h4 className="text-2xl font-bold text-cyan-400">Cypher AI Assistant</h4>
                        <p className="text-sm text-gray-400">Internal Operations AI</p>
                      </div>
                    </div>
                    <p className="text-gray-300 mb-6">
                      Advanced internal productivity AI automating meetings, calendar optimization, and team workflows with Fireflies.ai-level capabilities.
                    </p>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-400">Meeting Prep Time</span>
                        <span className="text-cyan-400 font-bold">-70%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-400">Team Productivity</span>
                        <span className="text-cyan-400 font-bold">+45%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-400">Client Response Time</span>
                        <span className="text-cyan-400 font-bold">+60%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Combined AI Performance Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                <div className="text-center p-6 bg-slate-800/50 rounded-lg border border-purple-500/30">
                  <div className="text-3xl font-bold text-purple-400 mb-2">99.2%</div>
                  <div className="text-sm text-gray-400">Autonomous Security<br />Accuracy</div>
                </div>
                <div className="text-center p-6 bg-slate-800/50 rounded-lg border border-cyan-500/30">
                  <div className="text-3xl font-bold text-cyan-400 mb-2">95%</div>
                  <div className="text-sm text-gray-400">Meeting Intelligence<br />Accuracy</div>
                </div>
                <div className="text-center p-6 bg-slate-800/50 rounded-lg border border-green-500/30">
                  <div className="text-3xl font-bold text-green-400 mb-2">-89%</div>
                  <div className="text-sm text-gray-400">Compliance<br />Automation</div>
                </div>
                <div className="text-center p-6 bg-slate-800/50 rounded-lg border border-orange-500/30">
                  <div className="text-3xl font-bold text-orange-400 mb-2">+96%</div>
                  <div className="text-sm text-gray-400">Sector-Specific<br />Relevance</div>
                </div>
              </div>

              {/* Dual AI Capabilities Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="bg-slate-800/50 border-purple-500/30">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-slate-800/80 rounded-xl border-2 border-purple-500/50 flex items-center justify-center mr-3 hover:border-purple-400 transition-all duration-300">
                        <Enhanced4DBrainIcon className="w-6 h-6 text-purple-400" size={24} />
                      </div>
                      <h4 className="text-lg font-bold text-white">Genetic Evolution Engine</h4>
                    </div>
                    <p className="text-gray-300 text-sm">
                      Self-evolving AI through genetic algorithms with multi-generational learning and autonomous policy generation at 99.2% accuracy.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-slate-800/50 border-cyan-500/30">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-slate-800/80 rounded-xl border-2 border-cyan-500/50 flex items-center justify-center mr-3 hover:border-cyan-400 transition-all duration-300">
                        <Enhanced4DActivityIcon className="w-6 h-6 text-cyan-400" size={24} />
                      </div>
                      <h4 className="text-lg font-bold text-white">Meeting Intelligence</h4>
                    </div>
                    <p className="text-gray-300 text-sm">
                      Auto-transcription, summarization, and action item extraction across Teams, Zoom, Google Meet with 95% accuracy and real-time insights.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-slate-800/50 border-green-500/30">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-slate-800/80 rounded-xl border-2 border-green-500/50 flex items-center justify-center mr-3 hover:border-green-400 transition-all duration-300">
                        <Enhanced4DCheckCircleIcon className="w-6 h-6 text-green-400" size={24} />
                      </div>
                      <h4 className="text-lg font-bold text-white">Adaptive Threat Detection</h4>
                    </div>
                    <p className="text-gray-300 text-sm">
                      Evolutionary threat hunting with genetic pattern recognition, 78% reduction in false positives, and predictive zero-day detection.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-slate-800/50 border-orange-500/30">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-slate-800/80 rounded-xl border-2 border-orange-500/50 flex items-center justify-center mr-3 hover:border-orange-400 transition-all duration-300">
                        <Enhanced4DTargetIcon className="w-6 h-6 text-orange-400" size={24} />
                      </div>
                      <h4 className="text-lg font-bold text-white">Ticket Intelligence</h4>
                    </div>
                    <p className="text-gray-300 text-sm">
                      AI-powered ticket management with 40% faster resolution, smart categorization, and predictive escalation prevention.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-slate-800/50 border-blue-500/30">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-slate-800/80 rounded-xl border-2 border-blue-500/50 flex items-center justify-center mr-3 hover:border-blue-400 transition-all duration-300">
                        <Enhanced4DUsersIcon className="w-6 h-6 text-blue-400" size={24} />
                      </div>
                      <h4 className="text-lg font-bold text-white">24/7 Operations</h4>
                    </div>
                    <p className="text-gray-300 text-sm">
                      Continuous security operations support with 99.9% uptime and adaptive learning from institutional security patterns.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-slate-800/50 border-yellow-500/30">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-slate-800/80 rounded-xl border-2 border-yellow-500/50 flex items-center justify-center mr-3 hover:border-yellow-400 transition-all duration-300">
                        <Enhanced4DZapIcon className="w-6 h-6 text-yellow-400" size={24} />
                      </div>
                      <h4 className="text-lg font-bold text-white">Communication Tracking</h4>
                    </div>
                    <p className="text-gray-300 text-sm">
                      Real-time engagement analytics with email tracking, read receipts, and intelligent communication optimization.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Educational Compliance Dashboard Visualization with 4D Visual */}
            <div className="max-w-5xl mx-auto mb-16">
              {/* Hero Visual - Educational Threat Intelligence */}
              {/* Live Platform Dashboard */}
              <div className="relative h-96 bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl overflow-hidden border border-cyan-500/30 shadow-2xl">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-400/10 via-transparent to-transparent"></div>
                
                {/* Dashboard Header */}
                <div className="absolute top-6 left-6 right-6 z-10">
                  <div className="flex items-center justify-between bg-slate-800/90 rounded-lg p-3 border border-cyan-500/30">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-white font-semibold">Cypher AI + Threat Intelligence</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className="bg-cyan-500/20 text-cyan-300 text-xs">🤖 AI Active</Badge>
                      <Badge className="bg-green-500/20 text-green-300 text-xs">FERPA Compliant</Badge>
                      <Badge className="bg-blue-500/20 text-blue-300 text-xs">CIPA Active</Badge>
                    </div>
                  </div>
                </div>

                {/* Threat Statistics */}
                <div className="absolute top-20 left-6 right-6 z-10">
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="bg-slate-800/80 rounded-lg p-3 border border-red-500/30 text-center">
                      <div className="text-red-400 text-2xl font-bold">247</div>
                      <div className="text-gray-300 text-xs">Threats Blocked</div>
                    </div>
                    <div className="bg-slate-800/80 rounded-lg p-3 border border-yellow-500/30 text-center">
                      <div className="text-yellow-400 text-2xl font-bold">12</div>
                      <div className="text-gray-300 text-xs">Investigations</div>
                    </div>
                    <div className="bg-slate-800/80 rounded-lg p-3 border border-green-500/30 text-center">
                      <div className="text-green-400 text-2xl font-bold">99.8%</div>
                      <div className="text-gray-300 text-xs">Uptime</div>
                    </div>
                  </div>
                </div>

                {/* Live Threat Feed */}
                <div className="absolute bottom-6 left-6 right-6 z-10">
                  <div className="bg-slate-800/90 rounded-lg p-4 border border-purple-500/30">
                    <h4 className="text-purple-400 font-bold mb-2 flex items-center">
                      <Enhanced4DActivityIcon className="w-4 h-4 mr-2" size={16} />
                      Live Threat Feed
                    </h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-300">Malware attempt blocked</span>
                        <span className="text-red-400 font-mono">08:54:12</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-300">Suspicious login detected</span>
                        <span className="text-yellow-400 font-mono">08:53:47</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-300">Compliance check passed</span>
                        <span className="text-green-400 font-mono">08:53:22</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Background Pattern */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/95 to-transparent"></div>
              </div>
              
              <div className="relative bg-slate-800/80 rounded-xl p-8 border border-cyan-500/30 shadow-2xl">
                
                {/* Compliance Status Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-green-500/10 rounded-lg p-6 border border-green-500/30">
                    <div className="flex items-center justify-between mb-4">
                      <CustomGraduationCapIcon className="w-8 h-8 text-green-400" size={32} />
                      <div className="text-2xl font-bold text-green-400">98%</div>
                    </div>
                    <h5 className="text-green-400 font-semibold mb-2">FERPA Compliance</h5>
                    <p className="text-sm text-gray-400">Student privacy protection active across all educational data systems</p>
                  </div>
                  
                  <div className="bg-blue-500/10 rounded-lg p-6 border border-blue-500/30">
                    <div className="flex items-center justify-between mb-4">
                      <Enhanced4DShieldIcon className="w-8 h-8 text-blue-400" size={32} />
                      <div className="text-2xl font-bold text-blue-400">95%</div>
                    </div>
                    <h5 className="text-blue-400 font-semibold mb-2">CIPA Filtering</h5>
                    <p className="text-sm text-gray-400">Content filtering and internet safety measures for K-12 institutions</p>
                  </div>
                  
                  <div className="bg-purple-500/10 rounded-lg p-6 border border-purple-500/30">
                    <div className="flex items-center justify-between mb-4">
                      <Enhanced4DBuildingIcon className="w-8 h-8 text-purple-400" size={32} />
                      <div className="text-2xl font-bold text-purple-400">92%</div>
                    </div>
                    <h5 className="text-purple-400 font-semibold mb-2">FISMA Readiness</h5>
                    <p className="text-sm text-gray-400">Federal information systems security controls and risk management</p>
                  </div>
                </div>
                
                {/* Live Threat Feed */}
                <div className="bg-slate-900/50 rounded-lg p-4 border border-red-500/30">
                  <div className="flex items-center justify-between mb-4">
                    <h5 className="text-red-400 font-semibold flex items-center">
                      <Enhanced4DAlertTriangleIcon className="w-5 h-5 mr-2" size={20} />
                      Active Threat Monitoring
                    </h5>
                    <div className="bg-red-500/20 text-red-400 text-xs px-3 py-1 rounded">LIVE</div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between text-gray-300">
                      <span>Blocked malicious domains today:</span>
                      <span className="text-red-400 font-semibold">247</span>
                    </div>
                    <div className="flex justify-between text-gray-300">
                      <span>Student data access attempts prevented:</span>
                      <span className="text-green-400 font-semibold">100%</span>
                    </div>
                    <div className="flex justify-between text-gray-300">
                      <span>Compliance violations detected:</span>
                      <span className="text-yellow-400 font-semibold">0</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-center text-gray-400 text-lg mb-16">
              *Based on verified threat prevention for educational institutions during 2024
            </p>

            {/* Impact Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <Card className="bg-slate-800/50 border border-cyan-500/30 text-center">
                <CardContent className="p-8">
                  <div className="text-4xl font-bold text-cyan-400 mb-2">$4.2M</div>
                  <div className="text-gray-300 text-lg">Average cost savings from prevented breaches</div>
                  <div className="text-gray-500 text-sm mt-2">~ Education Security Report 2024</div>
                </CardContent>
              </Card>
              
              <Card className="bg-slate-800/50 border border-green-500/30 text-center">
                <CardContent className="p-8">
                  <div className="text-4xl font-bold text-green-400 mb-2">99.7%</div>
                  <div className="text-gray-300 text-lg">Threat detection accuracy with AI models</div>
                  <div className="text-gray-500 text-sm mt-2">~ Independent Security Audit 2024</div>
                </CardContent>
              </Card>
              
              <Card className="bg-slate-800/50 border border-purple-500/30 text-center">
                <CardContent className="p-8">
                  <div className="text-4xl font-bold text-purple-400 mb-2">73%</div>
                  <div className="text-gray-300 text-lg">Reduction in false positive alerts</div>
                  <div className="text-gray-500 text-sm mt-2">~ Customer Success Metrics 2024</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Main Value Proposition */}
        <section className="py-24 px-6 bg-gradient-to-b from-slate-800 to-slate-900">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-20">
              <h2 className="text-5xl md:text-6xl font-bold text-white mb-8 leading-tight">
                Secure, adapt, and defend<br />
                <span className="text-cyan-400">with confidence.</span>
              </h2>
              <p className="text-2xl text-gray-300 max-w-4xl mx-auto mb-16">
                Proactive AI transforms security vulnerabilities into innovation catalysts 
                for education and government organizations
              </p>
            </div>

            {/* Interactive Security Solutions Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
              
              {/* AI Threat Detection */}
              <Card className="bg-slate-800/80 border border-cyan-500/30 hover:border-cyan-400/60 transition-all duration-300 group cursor-pointer">
                <CardHeader className="text-center p-8">
                  <div className="w-20 h-20 bg-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-cyan-500/30 transition-colors">
                    <CustomBrainIcon className="w-10 h-10 text-cyan-400" size={40} />
                  </div>
                  <CardTitle className="text-2xl text-white mb-4">AI Threat Detection</CardTitle>
                  <p className="text-gray-300">
                    Predict, prevent, detect, and respond to threats faster with advanced AI models.
                  </p>
                </CardHeader>
                <CardContent className="p-8 pt-0">
                  <Button 
                    className="button-4d w-full"
                    onClick={() => window.location.href = '/solutions'}
                  >
                    Learn More
                  </Button>
                </CardContent>
              </Card>

              {/* Zero Trust Security */}
              <Card className="bg-slate-800/80 border border-blue-500/30 hover:border-blue-400/60 transition-all duration-300 group cursor-pointer">
                <CardHeader className="text-center p-8">
                  <div className="w-20 h-20 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-500/30 transition-colors">
                    <CustomShieldIcon className="w-10 h-10 text-blue-400" size={40} />
                  </div>
                  <CardTitle className="text-2xl text-white mb-4">Zero Trust Architecture</CardTitle>
                  <p className="text-gray-300">
                    Comprehensive identity verification and access controls for every user and device.
                  </p>
                </CardHeader>
                <CardContent className="p-8 pt-0">
                  <Button 
                    className="button-4d w-full"
                    onClick={() => window.location.href = '/solutions'}
                  >
                    Learn More
                  </Button>
                </CardContent>
              </Card>

              {/* Compliance Automation */}
              <Card className="bg-slate-800/80 border border-green-500/30 hover:border-green-400/60 transition-all duration-300 group cursor-pointer">
                <CardHeader className="text-center p-8">
                  <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-green-500/30 transition-colors">
                    <CustomFileTextIcon className="w-10 h-10 text-green-400" size={40} />
                  </div>
                  <CardTitle className="text-2xl text-white mb-4">Compliance Automation</CardTitle>
                  <p className="text-gray-300">
                    Automated FERPA, FISMA, and CIPA compliance monitoring and reporting.
                  </p>
                </CardHeader>
                <CardContent className="p-8 pt-0">
                  <Button 
                    className="button-4d w-full"
                    onClick={() => window.location.href = '/solutions'}
                  >
                    Learn More
                  </Button>
                </CardContent>
              </Card>

              {/* Endpoint Security */}
              <Card className="bg-slate-800/80 border border-purple-500/30 hover:border-purple-400/60 transition-all duration-300 group cursor-pointer">
                <CardHeader className="text-center p-8">
                  <div className="w-20 h-20 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-purple-500/30 transition-colors">
                    <CustomTargetIcon className="w-10 h-10 text-purple-400" size={40} />
                  </div>
                  <CardTitle className="text-2xl text-white mb-4">Endpoint Security</CardTitle>
                  <p className="text-gray-300">
                    Secure every endpoint with centralized visibility and rapid threat response.
                  </p>
                </CardHeader>
                <CardContent className="p-8 pt-0">
                  <Button 
                    className="button-4d w-full"
                    onClick={() => window.location.href = '/solutions'}
                  >
                    Learn More
                  </Button>
                </CardContent>
              </Card>

              {/* Network Security */}
              <Card className="bg-slate-800/80 border border-orange-500/30 hover:border-orange-400/60 transition-all duration-300 group cursor-pointer">
                <CardHeader className="text-center p-8">
                  <div className="w-20 h-20 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-orange-500/30 transition-colors">
                    <Enhanced4DNetworkIcon className="w-10 h-10 text-orange-400" size={40} />
                  </div>
                  <CardTitle className="text-2xl text-white mb-4">Network Security</CardTitle>
                  <p className="text-gray-300">
                    Gain unparalleled network insight and protect unmanaged devices.
                  </p>
                </CardHeader>
                <CardContent className="p-8 pt-0">
                  <Button 
                    className="button-4d w-full"
                    onClick={() => window.location.href = '/solutions'}
                  >
                    Learn More
                  </Button>
                </CardContent>
              </Card>

              {/* Data Security */}
              <Card className="bg-slate-800/80 border border-red-500/30 hover:border-red-400/60 transition-all duration-300 group cursor-pointer">
                <CardHeader className="text-center p-8">
                  <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-red-500/30 transition-colors">
                    <CustomDatabaseIcon className="w-10 h-10 text-red-400" size={40} />
                  </div>
                  <CardTitle className="text-2xl text-white mb-4">Data Security</CardTitle>
                  <p className="text-gray-300">
                    Powerful data protection with real-time visibility and risk prioritization.
                  </p>
                </CardHeader>
                <CardContent className="p-8 pt-0">
                  <Button 
                    className="button-4d w-full"
                    onClick={() => window.location.href = '/solutions'}
                  >
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Call to Action */}
            <div className="text-center">
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button 
                  size="lg" 
                  className="button-4d px-10 py-4 text-lg"
                  onClick={() => { window.location.href = '/contact';  }}
                >
                  Watch Demo
                  <CustomActivityIcon className="ml-2 w-6 h-6" size={24} />
                </Button>
                <Button 
                  size="lg" 
                  className="button-4d px-10 py-4 text-lg"
                  onClick={() => { window.location.href = '/contact';  }}
                >
                  Try Free Security Scan
                  <CustomTargetIcon className="ml-2 w-6 h-6" size={24} />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Platform Overview Section */}
        <section className="py-20 px-6 bg-slate-900">
          <div className="container mx-auto max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <Badge className="mb-6 bg-cyan-500/20 text-cyan-300 border-cyan-500/30">
                  Complete Security Platform
                </Badge>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
                  Strengthen every aspect of your security with 
                  <span className="text-cyan-400"> CyberSecured AI™</span>
                </h2>
                
                <div className="space-y-6 mb-8">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-cyan-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <CustomShieldIcon className="w-4 h-4 text-cyan-400" size={16} />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">Build risk resilience</h3>
                      <p className="text-gray-400">Monitor, prioritize, and neutralize threats with cutting-edge AI models.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <CustomBrainIcon className="w-4 h-4 text-purple-400" size={16} />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">Optimize security operations</h3>
                      <p className="text-gray-400">Hunt, detect, investigate, and respond to threats swiftly.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <CustomEyeIcon className="w-4 h-4 text-green-400" size={16} />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">Eliminate blind spots</h3>
                      <p className="text-gray-400">Lower risk and achieve compliance with full visibility.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <CustomZapIcon className="w-4 h-4 text-blue-400" size={16} />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">Transform security into innovation</h3>
                      <p className="text-gray-400">Automate mitigation to reduce risk and optimize resources.</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    size="lg" 
                    className="button-4d px-8 py-3"
                    onClick={() => { window.location.href = '/platform';  }}
                  >
                    Learn more
                  </Button>
                  <Button 
                    size="lg" 
                    className="button-4d px-8 py-3"
                    onClick={() => { window.location.href = '/platform';  }}
                  >
                    Take a product tour
                  </Button>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Customer Logos Section */}
        <section className="py-16 px-6 bg-slate-800">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h3 className="text-2xl font-bold text-gray-300 mb-8">
                Trusted by leading educational institutions and government agencies
              </h3>
              <div className="relative overflow-hidden">
                <div className="flex animate-marquee items-center gap-10 opacity-95 py-4">
                  {/* First set of logos */}
                {/* MIT Logo */}
                <div className="flex items-center justify-center h-28 w-32 bg-white/10 rounded-xl border border-cyan-500/20 hover:border-cyan-400/60 hover:scale-110 transition-all duration-300 flex-shrink-0 hover:bg-white/15">
                  <img 
                    src={mitPartnerImg}
                    alt="MIT"
                    className="h-20 w-auto filter brightness-100 hover:brightness-125 transition-all duration-300 drop-shadow-lg"
                  />
                </div>
                
                {/* Stanford Logo */}
                <div className="flex items-center justify-center h-28 w-32 bg-white/10 rounded-xl border border-cyan-500/20 hover:border-cyan-400/60 hover:scale-110 transition-all duration-300 flex-shrink-0 hover:bg-white/15">
                  <img 
                    src={stanfordPartnerImg}
                    alt="Stanford University"
                    className="h-20 w-auto filter brightness-100 hover:brightness-125 transition-all duration-300 drop-shadow-lg"
                  />
                </div>
                
                {/* UC Berkeley Logo */}
                <div className="flex items-center justify-center h-28 w-32 bg-white/10 rounded-xl border border-cyan-500/20 hover:border-cyan-400/60 hover:scale-110 transition-all duration-300 flex-shrink-0 hover:bg-white/15">
                  <img 
                    src={berkeleyPartnerImg}
                    alt="UC Berkeley"
                    className="h-20 w-auto filter brightness-100 hover:brightness-125 transition-all duration-300 drop-shadow-lg"
                  />
                </div>
                
                {/* University of Cambridge Logo */}
                <div className="flex items-center justify-center h-28 w-56 bg-white/10 rounded-xl border border-cyan-500/20 hover:border-cyan-400/60 hover:scale-110 transition-all duration-300 flex-shrink-0 hover:bg-white/15">
                  <img 
                    src={cambridgePartnerImg}
                    alt="University of Cambridge"
                    className="h-24 w-auto filter brightness-100 hover:brightness-125 transition-all duration-300 drop-shadow-lg"
                  />
                </div>
                
                {/* Colorado State University Logo */}
                <div className="flex items-center justify-center h-28 w-32 bg-white/10 rounded-xl border border-cyan-500/20 hover:border-cyan-400/60 hover:scale-110 transition-all duration-300 flex-shrink-0 hover:bg-white/15">
                  <img 
                    src={universityPartnerImg}
                    alt="Colorado State University"
                    className="h-18 w-auto filter brightness-100 hover:brightness-125 transition-all duration-300 drop-shadow-lg"
                  />
                </div>
                
                {/* CSU - The California State University Logo */}
                <div className="flex items-center justify-center h-28 w-60 bg-white/10 rounded-xl border border-cyan-500/20 hover:border-cyan-400/60 hover:scale-110 transition-all duration-300 flex-shrink-0 hover:bg-white/15">
                  <img 
                    src={caStatePartnerImg}
                    alt="The California State University"
                    className="h-24 w-auto filter brightness-100 hover:brightness-125 transition-all duration-300 drop-shadow-lg"
                  />
                </div>
                
                {/* MREA Logo */}
                <div className="flex items-center justify-center h-28 w-32 bg-white/10 rounded-xl border border-cyan-500/20 hover:border-cyan-400/60 hover:scale-110 transition-all duration-300 flex-shrink-0 hover:bg-white/15">
                  <img 
                    src={mreaPartnerImg}
                    alt="MREA"
                    className="h-20 w-auto filter brightness-100 hover:brightness-125 transition-all duration-300 drop-shadow-lg"
                  />
                </div>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* Customer Success Quote */}
        <section className="py-20 px-6 bg-slate-800">
          <div className="container mx-auto max-w-5xl">
            <Card className="bg-slate-700/50 border border-cyan-500/30">
              <CardContent className="p-12 text-center">
                <div className="mb-8">
                  <img 
                    src={complianceImg}
                    alt="Customer Success"
                    className="w-20 h-20 mx-auto rounded-full border-2 border-cyan-500/30"
                  />
                </div>
                <blockquote className="text-2xl md:text-3xl font-bold text-white mb-6 leading-relaxed">
                  "Very well-organized and highly insightful. I appreciated the focus on emerging threats, 
                  the role of AI, and zero trust architecture."
                </blockquote>
                <div className="text-gray-400">
                  – Chief Information Security Officer, Major University System
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Floating Cypher AI Assistant */}
        <div className="fixed bottom-6 right-6 z-50">
          {showCypherAI ? (
            <div className={`transition-all duration-300 ${cypherExpanded ? 'w-96 h-[600px]' : 'w-80 h-96'}`}>
              <CypherAI 
                isExpanded={cypherExpanded}
                onToggleExpand={() => setCypherExpanded(!cypherExpanded)}
                className="shadow-2xl"
              />
            </div>
          ) : (
            <button
              onClick={() => setShowCypherAI(true)}
              className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white p-2 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 group relative overflow-hidden"
              style={{
                boxShadow: '0 20px 40px rgba(6, 182, 212, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3), inset 0 -1px 0 rgba(0, 0, 0, 0.1)',
                background: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 50%, #1e40af 100%)',
              }}
              data-testid="open-cypher-ai"
            >
              {/* Glossy overlay */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-t from-transparent via-white/20 to-white/10 pointer-events-none"></div>
              
              <div className="flex items-center space-x-2 relative z-10">
                <img src={cypherAiAssistImage} alt="Cypher AI Assistant" className="w-18 h-18 rounded-full" style={{ width: '72px', height: '72px' }} />
                <span className="hidden group-hover:block absolute right-20 top-1/2 transform -translate-y-1/2 bg-slate-800/90 backdrop-blur-sm text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap shadow-lg border border-slate-600/50">
                  Ask Cypher AI
                </span>
              </div>
            </button>
          )}
          
          {showCypherAI && (
            <button
              onClick={() => setShowCypherAI(false)}
              className="absolute -top-2 -left-2 bg-red-500 hover:bg-red-600 text-white p-1 rounded-full text-xs transition-all duration-200"
              data-testid="close-cypher-ai"
            >
              ✕
            </button>
          )}
        </div>
      </div>
    </MarketingLayout>
  );
}
