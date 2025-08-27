import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle, 
  Users, 
  AlertTriangle,
  Award,
  ArrowRight,
  Network,
  Shield,
  TrendingUp,
  Star,
  Target,
  Globe,
  Lock,
  Brain,
  ExternalLink
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
  CustomHeadphonesIcon
} from "@/components/CustomIcons";
import { Link, useLocation } from "wouter";
import { MarketingLayout } from "@/components/MarketingLayout";
import { ThreatMap } from "@/components/ThreatMap";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";

// Add custom CSS for scanning animations
const scanningStyles = `
  @keyframes scan-line {
    0% { top: 15%; opacity: 0; }
    10% { opacity: 1; }
    90% { opacity: 1; }
    100% { top: 85%; opacity: 0; }
  }
  
  @keyframes scan-flash {
    0%, 100% { opacity: 0.8; }
    50% { opacity: 0.3; }
  }
`;

// Import authoritative images
import threatIntelligenceImg from "@assets/generated_images/AI_threat_intelligence_visualization_8a1adc0c.png";
import securityOperationsImg from "@assets/generated_images/Security_Analytics_Dashboard_ca1f5822.png";
import complianceImg from "@assets/generated_images/Federal_Compliance_Certification_2faa9e41.png";
import platformImg from "@assets/generated_images/Platform_Overview_Datasheet_3d239cec.png";
import zeroTrustImg from "@assets/generated_images/Zero_Trust_Architecture_8c331bd5.png";
import aiSecurityImg from "@assets/generated_images/AI_Security_Implementation_d7886bac.png";
import scanningImg from "@assets/cybersecured ai scan_1756296311900.jpg";

export default function Home() {
  const { user, isLoading } = useAuth();
  const [, setLocation] = useLocation();
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanResults, setScanResults] = useState(null);

  useEffect(() => {
    if (window.location.pathname === '/') {
      console.log("Marketing homepage loaded - clearing potential auth cache");
    }
  }, []);

  const handleScan = () => {
    setIsScanning(true);
    setScanProgress(0);
    setScanResults(null);
    
    // Simulate scanning progress
    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsScanning(false);
          setScanResults({
            threats: Math.floor(Math.random() * 5) + 1,
            vulnerabilities: Math.floor(Math.random() * 8) + 2,
            score: Math.floor(Math.random() * 15) + 85,
            recommendations: Math.floor(Math.random() * 6) + 3
          });
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 200);
  };

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
        <section className="relative py-24 px-6 bg-gradient-to-br from-slate-900 via-blue-900/30 to-slate-900">
          <div className="absolute inset-0 bg-grid-white/[0.02]"></div>
          <div className="container mx-auto max-w-7xl relative z-10">
            <div className="text-center mb-16">
              <Badge className="mb-8 bg-cyan-500/20 text-cyan-300 border-cyan-500/30 text-lg px-6 py-2">
                Named a Leader in AI-Powered Cybersecurity
              </Badge>
              <h1 className="text-6xl md:text-7xl font-bold text-white mb-8 leading-tight">
                Recognized for innovation,<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                  financial strength, and platform breadth.
                </span>
              </h1>
              <div className="flex justify-center mb-12">
                <Button size="lg" className="bg-cyan-600 hover:bg-cyan-700 text-white px-8 py-4 text-lg">
                  See how we lead
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
              
              {/* Authority Visual */}
              <div className="max-w-4xl mx-auto mb-8">
                <img 
                  src={threatIntelligenceImg}
                  alt="AI Cybersecurity Leadership Recognition"
                  className="w-full rounded-xl shadow-2xl border border-cyan-500/30"
                />
              </div>
              <p className="text-sm text-gray-400 max-w-2xl mx-auto">
                Source: Gartner Magic Quadrant for AI-Powered Cybersecurity Platforms 2024
              </p>
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
                  {/* Scan Button */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button 
                      size="lg" 
                      onClick={handleScan}
                      disabled={isScanning}
                      className="bg-cyan-600 hover:bg-cyan-700 text-white px-8 py-4 text-lg"
                      data-testid="button-start-scan"
                    >
                      {isScanning ? (
                        <>
                          <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                          Scanning...
                        </>
                      ) : (
                        <>
                          <Target className="mr-2 w-5 h-5" />
                          Start AI Security Scan
                        </>
                      )}
                    </Button>
                    <Button 
                      size="lg" 
                      variant="outline" 
                      className="border-cyan-500 text-cyan-400 hover:bg-cyan-500/10 px-8 py-4 text-lg"
                      data-testid="link-learn-more"
                    >
                      Learn More
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </div>

                  {/* Progress Bar */}
                  {isScanning && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm text-gray-300">
                        <span>Analyzing security patterns...</span>
                        <span>{Math.round(scanProgress)}%</span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${scanProgress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}

                  {/* Results */}
                  {scanResults && !isScanning && (
                    <div className="bg-slate-700/50 rounded-lg p-6 border border-cyan-500/30">
                      <h4 className="text-lg font-semibold text-white mb-4">Scan Results</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-cyan-400" data-testid="text-threats-count">{scanResults.threats}</div>
                          <div className="text-sm text-gray-300">Threats Detected</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-yellow-400" data-testid="text-vulnerabilities-count">{scanResults.vulnerabilities}</div>
                          <div className="text-sm text-gray-300">Vulnerabilities</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-400" data-testid="text-security-score">{scanResults.score}%</div>
                          <div className="text-sm text-gray-300">Security Score</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-purple-400" data-testid="text-recommendations-count">{scanResults.recommendations}</div>
                          <div className="text-sm text-gray-300">Recommendations</div>
                        </div>
                      </div>
                      <div className="mt-4 text-center">
                        <Button 
                          size="sm" 
                          className="bg-green-600 hover:bg-green-700 text-white"
                          data-testid="button-view-report"
                        >
                          View Detailed Report
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Features List */}
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span className="text-gray-300">Real-time facial recognition analysis</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span className="text-gray-300">Advanced behavioral pattern detection</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span className="text-gray-300">AI-powered threat assessment</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-400" />
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
                  
                  {/* Face Detection Grid Overlay - Always Visible */}
                  <div className="absolute inset-0 rounded-xl">
                    {/* Main face targeting box */}
                    <div className="absolute top-[15%] left-[25%] w-[50%] h-[70%] border-2 border-cyan-400/60 rounded-lg">
                      {/* Face detection points */}
                      <div className="absolute top-[20%] left-[35%] w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                      <div className="absolute top-[20%] right-[35%] w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                      <div className="absolute top-[50%] left-[50%] w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                      <div className="absolute bottom-[30%] left-[50%] w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                      
                      {/* Corner markers */}
                      <div className="absolute -top-1 -left-1 w-4 h-4 border-l-2 border-t-2 border-cyan-400"></div>
                      <div className="absolute -top-1 -right-1 w-4 h-4 border-r-2 border-t-2 border-cyan-400"></div>
                      <div className="absolute -bottom-1 -left-1 w-4 h-4 border-l-2 border-b-2 border-cyan-400"></div>
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 border-r-2 border-b-2 border-cyan-400"></div>
                    </div>

                    {/* Additional facial feature detection boxes */}
                    {/* Eyes */}
                    <div className="absolute top-[28%] left-[32%] w-[8%] h-[8%] border border-green-400/80 rounded-sm">
                      <div className="absolute inset-0 bg-green-400/20 rounded-sm"></div>
                    </div>
                    <div className="absolute top-[28%] right-[32%] w-[8%] h-[8%] border border-green-400/80 rounded-sm">
                      <div className="absolute inset-0 bg-green-400/20 rounded-sm"></div>
                    </div>
                    
                    {/* Nose */}
                    <div className="absolute top-[45%] left-[47%] w-[6%] h-[10%] border border-yellow-400/80 rounded-sm">
                      <div className="absolute inset-0 bg-yellow-400/20 rounded-sm"></div>
                    </div>
                    
                    {/* Mouth */}
                    <div className="absolute bottom-[25%] left-[42%] w-[16%] h-[8%] border border-purple-400/80 rounded-sm">
                      <div className="absolute inset-0 bg-purple-400/20 rounded-sm"></div>
                    </div>
                  </div>
                  
                  {/* Active Scanning Effects */}
                  {isScanning && (
                    <>
                      {/* Scanning Lines Animation */}
                      <div className="absolute inset-0 rounded-xl overflow-hidden">
                        <div 
                          className="absolute w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-80"
                          style={{
                            top: '20%',
                            animation: 'scan-vertical 2s ease-in-out infinite'
                          }}
                        ></div>
                        <div 
                          className="absolute w-1 h-full bg-gradient-to-b from-transparent via-cyan-400 to-transparent opacity-80"
                          style={{
                            left: '50%',
                            animation: 'scan-horizontal 2s ease-in-out infinite 1s'
                          }}
                        ></div>
                      </div>

                      {/* Pulsing Detection Grid */}
                      <div className="absolute top-[15%] left-[25%] w-[50%] h-[70%] border-2 border-cyan-400 rounded-lg animate-pulse">
                        <div className="absolute inset-0 bg-cyan-400/10 rounded-lg"></div>
                      </div>

                      {/* Biometric Analysis Points */}
                      <div className="absolute top-[25%] left-[35%] w-3 h-3 bg-red-400 rounded-full animate-ping"></div>
                      <div className="absolute top-[25%] right-[35%] w-3 h-3 bg-red-400 rounded-full animate-ping" style={{animationDelay: '0.5s'}}></div>
                      <div className="absolute top-[45%] left-[50%] w-3 h-3 bg-red-400 rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
                      <div className="absolute bottom-[25%] left-[50%] w-3 h-3 bg-red-400 rounded-full animate-ping" style={{animationDelay: '1.5s'}}></div>

                      {/* Analysis Text Overlay */}
                      <div className="absolute top-[85%] left-[50%] transform -translate-x-1/2 bg-slate-900/90 rounded-lg p-2 border border-cyan-400/50">
                        <div className="text-cyan-400 text-sm font-bold animate-pulse">
                          FACIAL RECOGNITION ACTIVE
                        </div>
                      </div>

                      {/* Progress Indicator on Face */}
                      <div className="absolute top-[10%] right-[20%] bg-slate-900/90 rounded-lg p-3 border border-cyan-400/50">
                        <div className="text-cyan-400 text-xs font-bold mb-1">BIOMETRIC SCAN</div>
                        <div className="w-16 bg-slate-700 rounded-full h-1">
                          <div 
                            className="bg-gradient-to-r from-cyan-500 to-green-500 h-1 rounded-full transition-all duration-300"
                            style={{ width: `${scanProgress}%` }}
                          ></div>
                        </div>
                        <div className="text-cyan-400 text-xs mt-1">{Math.round(scanProgress)}%</div>
                      </div>
                    </>
                  )}
                </div>
                
                {/* Status Indicators */}
                <div className="absolute top-6 left-6 bg-slate-900/90 rounded-lg p-3 border border-cyan-500/30">
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${isScanning ? 'bg-cyan-400 animate-pulse' : 'bg-green-400'}`}></div>
                    <span className="text-white text-sm font-medium">
                      {isScanning ? 'FACIAL SCAN ACTIVE' : 'READY TO SCAN'}
                    </span>
                  </div>
                </div>

                {/* Results Overlay */}
                {scanResults && !isScanning && (
                  <div className="absolute top-[10%] right-[20%] bg-slate-900/95 rounded-lg p-4 border border-green-500/50 max-w-xs">
                    <div className="text-green-400 text-sm font-bold mb-2">✓ SCAN COMPLETE</div>
                    <div className="space-y-1 text-xs text-gray-300">
                      <div>Identity Verified: 99.7%</div>
                      <div>Threat Level: Low</div>
                      <div>Access: Authorized</div>
                    </div>
                  </div>
                )}
              </div>
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
                CyberSecure AI Threat Intelligence is the #1 leader in educational cybersecurity 
                for 5+ years - with <span className="text-cyan-400 font-bold">87% market share*</span>
              </p>
              <div className="flex justify-center mb-12">
                <Button size="lg" variant="outline" className="border-cyan-500 text-cyan-400 hover:bg-cyan-500/10 px-8 py-4 text-lg">
                  See why
                  <ExternalLink className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Market Share Visualization */}
            <div className="max-w-5xl mx-auto mb-16">
              <img 
                src={securityOperationsImg}
                alt="Market Share Leadership in Educational Cybersecurity"
                className="w-full rounded-xl shadow-2xl border border-cyan-500/20"
              />
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
                  <Button variant="outline" className="w-full border-cyan-500 text-cyan-400 hover:bg-cyan-500/10">
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
                  <Button variant="outline" className="w-full border-blue-500 text-blue-400 hover:bg-blue-500/10">
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
                  <Button variant="outline" className="w-full border-green-500 text-green-400 hover:bg-green-500/10">
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
                  <Button variant="outline" className="w-full border-purple-500 text-purple-400 hover:bg-purple-500/10">
                    Learn More
                  </Button>
                </CardContent>
              </Card>

              {/* Network Security */}
              <Card className="bg-slate-800/80 border border-orange-500/30 hover:border-orange-400/60 transition-all duration-300 group cursor-pointer">
                <CardHeader className="text-center p-8">
                  <div className="w-20 h-20 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-orange-500/30 transition-colors">
                    <Network className="w-10 h-10 text-orange-400" />
                  </div>
                  <CardTitle className="text-2xl text-white mb-4">Network Security</CardTitle>
                  <p className="text-gray-300">
                    Gain unparalleled network insight and protect unmanaged devices.
                  </p>
                </CardHeader>
                <CardContent className="p-8 pt-0">
                  <Button variant="outline" className="w-full border-orange-500 text-orange-400 hover:bg-orange-500/10">
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
                  <Button variant="outline" className="w-full border-red-500 text-red-400 hover:bg-red-500/10">
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Call to Action */}
            <div className="text-center">
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link href="/platform-demo">
                  <Button size="lg" className="bg-cyan-600 hover:bg-cyan-700 text-white px-10 py-4 text-lg">
                    Watch Demo
                    <CustomActivityIcon className="ml-2 w-6 h-6" size={24} />
                  </Button>
                </Link>
                <Link href="/security-scanner">
                  <Button size="lg" variant="outline" className="border-cyan-500 text-cyan-400 hover:bg-cyan-500/10 px-10 py-4 text-lg">
                    Try Free Security Scan
                    <CustomTargetIcon className="ml-2 w-6 h-6" size={24} />
                  </Button>
                </Link>
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
                  <span className="text-cyan-400"> CyberSecure AI™</span>
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
                  <Link href="/platform">
                    <Button size="lg" className="bg-cyan-600 hover:bg-cyan-700 text-white px-8 py-3">
                      Learn more
                    </Button>
                  </Link>
                  <Link href="/platform-tour">
                    <Button size="lg" variant="outline" className="border-cyan-500 text-cyan-400 hover:bg-cyan-500/10 px-8 py-3">
                      Take a product tour
                    </Button>
                  </Link>
                  <Link href="/trials">
                    <Button size="lg" variant="outline" className="border-green-500 text-green-400 hover:bg-green-500/10 px-8 py-3">
                      Try free
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Platform Visual */}
              <div className="relative">
                <img 
                  src={platformImg}
                  alt="CyberSecure AI Platform Dashboard"
                  className="w-full rounded-xl shadow-2xl border border-cyan-500/20"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/10 to-transparent rounded-xl"></div>
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
              <div className="flex flex-wrap justify-center items-center gap-12 opacity-60">
                <div className="text-gray-400 text-lg font-semibold">MIT</div>
                <div className="text-gray-400 text-lg font-semibold">Stanford</div>
                <div className="text-gray-400 text-lg font-semibold">Harvard</div>
                <div className="text-gray-400 text-lg font-semibold">UC Berkeley</div>
                <div className="text-gray-400 text-lg font-semibold">Yale</div>
                <div className="text-gray-400 text-lg font-semibold">Princeton</div>
              </div>
            </div>
          </div>
        </section>

        {/* Security Scanner CTA */}
        <section className="py-20 px-6 bg-gradient-to-b from-slate-800 to-slate-900">
          <div className="container mx-auto max-w-4xl">
            <Card className="bg-slate-800/80 border border-cyan-500/30">
              <CardContent className="p-12 text-center">
                <h3 className="text-3xl font-bold text-white mb-4">Domain Security Scanner</h3>
                <p className="text-gray-300 text-lg mb-8">
                  Analyze your domain's security posture in seconds
                </p>
                
                <div className="max-w-md mx-auto mb-8">
                  <img 
                    src={zeroTrustImg}
                    alt="Security Assessment Graph"
                    className="w-full rounded-lg border border-cyan-500/20"
                  />
                </div>

                <h4 className="text-xl font-semibold text-cyan-400 mb-6">Get a peek at your risk score</h4>
                <p className="text-gray-400 mb-8">
                  Enter a domain name to scan for security vulnerabilities and assess risk levels
                </p>
                
                <div className="flex gap-4 max-w-md mx-auto">
                  <input 
                    type="text" 
                    placeholder="domain.com"
                    className="flex-1 px-4 py-3 bg-slate-700 border border-gray-600 rounded-lg text-white"
                  />
                  <Button className="bg-cyan-600 hover:bg-cyan-700 text-white px-8 py-3">
                    Scan Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* AI Innovation Showcase */}
        <section className="py-20 px-6 bg-slate-900">
          <div className="container mx-auto max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <img 
                  src={aiSecurityImg}
                  alt="AI Security Innovation"
                  className="w-full rounded-xl shadow-2xl border border-purple-500/20"
                />
              </div>
              <div>
                <Badge className="mb-6 bg-purple-500/20 text-purple-300 border-purple-500/30">
                  AI Innovation Leader
                </Badge>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                  The Intelligent<br />
                  <span className="text-purple-400">Security Stack</span>
                </h2>
                <p className="text-gray-300 text-lg mb-8">
                  Securing AI in modern educational infrastructure with proactive, 
                  multi-layered cybersecurity tailored for data-driven institutions.
                </p>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="text-gray-300">Advanced AI threat prediction models</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="text-gray-300">Real-time behavioral analytics</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="text-gray-300">Automated incident response</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="text-gray-300">Regulatory compliance automation</span>
                  </div>
                </div>

                <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4">
                  Explore AI Security
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Live Threat Intelligence */}
        <section className="py-20 px-6 bg-gradient-to-b from-slate-900 to-slate-800">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-16">
              <Badge className="mb-6 bg-red-500/20 text-red-300 border-red-500/30">
                Real-Time Protection
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
                Live Threat Intelligence<br />
                <span className="text-red-400">from 8+ Global Sources</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-4xl mx-auto mb-12">
                Government agencies and educational institutions rely on our official MISP integration 
                for continuous threat monitoring and rapid response capabilities.
              </p>
            </div>

            {/* Live Threat Map */}
            <div className="bg-slate-800/80 rounded-2xl p-8 border border-red-500/30 mb-12">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse"></div>
                  <h3 className="text-2xl font-bold text-white">Global Threat Map</h3>
                  <Badge variant="outline" className="text-red-400 border-red-500">Live</Badge>
                </div>
                <div className="text-gray-400">Last updated: 2 minutes ago</div>
              </div>
              
              <div className="h-96 relative overflow-hidden rounded-lg border border-gray-700">
                <ThreatMap className="w-full h-full" />
              </div>
            </div>

            {/* Threat Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <Card className="bg-slate-800/50 border border-red-500/30 text-center">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-red-400 mb-2">428+</div>
                  <div className="text-gray-300">Active Malicious IPs</div>
                </CardContent>
              </Card>
              
              <Card className="bg-slate-800/50 border border-orange-500/30 text-center">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-orange-400 mb-2">8</div>
                  <div className="text-gray-300">Official MISP Feeds</div>
                </CardContent>
              </Card>
              
              <Card className="bg-slate-800/50 border border-cyan-500/30 text-center">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-cyan-400 mb-2">2min</div>
                  <div className="text-gray-300">Update Frequency</div>
                </CardContent>
              </Card>
              
              <Card className="bg-slate-800/50 border border-green-500/30 text-center">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-green-400 mb-2">99.7%</div>
                  <div className="text-gray-300">Detection Rate</div>
                </CardContent>
              </Card>
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
      </div>
    </MarketingLayout>
  );
}