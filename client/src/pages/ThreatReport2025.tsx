import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  AlertTriangle, 
  TrendingUp, 
  Target, 
  Shield, 
  Globe,
  Download,
  Calendar,
  Users,
  Building,
  GraduationCap,
  Flag,
  BarChart3,
  Eye,
  Lock,
  Zap,
  Brain
} from "lucide-react";
import { MarketingLayout } from "@/components/MarketingLayout";
import threatReportImg from "@assets/generated_images/Threat_Report_2025_Cover_50b3edd9.png";

export default function ThreatReport2025() {
  const threatStats = [
    { label: "Total Attacks Analyzed", value: "2.8M+", trend: "+34%", icon: <Target className="w-5 h-5" /> },
    { label: "Educational Institutions Affected", value: "15,240", trend: "+28%", icon: <GraduationCap className="w-5 h-5" /> },
    { label: "Government Agencies Impacted", value: "8,960", trend: "+19%", icon: <Flag className="w-5 h-5" /> },
    { label: "Average Response Time", value: "4.2 min", trend: "-42%", icon: <Zap className="w-5 h-5" /> }
  ];

  const topThreats = [
    {
      threat: "Ransomware Attacks",
      percentage: "32%",
      change: "+8%",
      severity: "Critical",
      description: "Targeting educational data systems and government infrastructure"
    },
    {
      threat: "Phishing Campaigns",
      percentage: "28%",
      change: "+12%", 
      severity: "High",
      description: "Social engineering attacks exploiting remote work vulnerabilities"
    },
    {
      threat: "Data Exfiltration",
      percentage: "21%",
      change: "+5%",
      severity: "Critical", 
      description: "Unauthorized access to sensitive educational and government records"
    },
    {
      threat: "Supply Chain Attacks",
      percentage: "19%",
      change: "+15%",
      severity: "High",
      description: "Compromising third-party vendors and educational technology providers"
    }
  ];

  const sectorAnalysis = [
    {
      sector: "K-12 Education",
      totalIncidents: 4820,
      criticalThreats: 890,
      responseTime: "6.1 min",
      mainVectors: ["Email phishing", "Ransomware", "Insider threats"],
      icon: <GraduationCap className="w-8 h-8" />
    },
    {
      sector: "Higher Education", 
      totalIncidents: 3940,
      criticalThreats: 720,
      responseTime: "4.8 min",
      mainVectors: ["Research data theft", "Campus network attacks", "Student credential compromise"],
      icon: <Building className="w-8 h-8" />
    },
    {
      sector: "Federal Government",
      totalIncidents: 2180,
      criticalThreats: 650,
      responseTime: "2.9 min",
      mainVectors: ["Nation-state attacks", "Zero-day exploits", "Supply chain compromise"],
      icon: <Flag className="w-8 h-8" />
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Critical": return "bg-red-600";
      case "High": return "bg-orange-600";
      case "Medium": return "bg-yellow-600";
      case "Low": return "bg-green-600";
      default: return "bg-gray-600";
    }
  };

  const getTrendColor = (trend: string) => {
    return trend.startsWith('+') ? 'text-red-400' : 'text-green-400';
  };

  return (
    <MarketingLayout>
      <div className="ai-dashboard-bg min-h-screen text-white">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-gray-900 via-red-900/20 to-orange-900/20 py-24">
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>
          <div className="relative container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge className="bg-red-600/20 text-red-400 border-red-500/50 mb-4">
                  2025 Annual Report
                </Badge>
                <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                  Cybersecurity Threat Landscape Report 2025
                </h1>
                <p className="text-xl text-gray-300 mb-8 max-w-2xl">
                  Comprehensive analysis of cybersecurity threats targeting educational institutions and government organizations. 
                  Based on analysis of 2.8M+ security incidents across 24,000+ organizations.
                </p>
                <div className="flex space-x-4">
                  <Button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3">
                    <Download className="w-5 h-5 mr-2" />
                    Download Full Report (PDF)
                  </Button>
                  <Button variant="outline" className="border-red-500/50 text-red-400 hover:bg-red-500/10 px-8 py-3">
                    <Eye className="w-5 h-5 mr-2" />
                    Executive Summary
                  </Button>
                </div>
              </div>
              
              <div className="relative">
                <img 
                  src={threatReportImg} 
                  alt="Threat Report 2025"
                  className="w-full max-w-md mx-auto rounded-lg shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-red-500/20 to-transparent rounded-lg pointer-events-none"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          {/* Key Statistics */}
          <section className="mb-16">
            <h2 className="text-4xl font-bold text-white mb-8 text-center">2025 Threat Intelligence Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {threatStats.map((stat, index) => (
                <Card key={index} className="bg-surface/50 border-surface-light">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-red-400">{stat.icon}</div>
                      <span className={`text-sm font-medium ${getTrendColor(stat.trend)}`}>
                        {stat.trend}
                      </span>
                    </div>
                    <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                    <div className="text-gray-400 text-sm">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Top Threats */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-8">Most Prevalent Threat Vectors</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {topThreats.map((threat, index) => (
                <Card key={index} className="bg-surface/50 border-surface-light">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-white text-xl">{threat.threat}</CardTitle>
                      <Badge className={`${getSeverityColor(threat.severity)} text-white`}>
                        {threat.severity}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-3xl font-bold text-red-400">{threat.percentage}</div>
                      <span className={`text-sm font-medium ${getTrendColor(threat.change)}`}>
                        {threat.change} vs 2024
                      </span>
                    </div>
                    <p className="text-gray-300 text-sm">{threat.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Sector Analysis */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-8">Sector-Specific Threat Analysis</h2>
            <div className="space-y-6">
              {sectorAnalysis.map((sector, index) => (
                <Card key={index} className="bg-surface/50 border-surface-light">
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl flex items-center justify-center text-white">
                        {sector.icon}
                      </div>
                      <div>
                        <CardTitle className="text-white text-2xl">{sector.sector}</CardTitle>
                        <p className="text-gray-400">Comprehensive threat analysis and response metrics</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      <div className="space-y-4">
                        <div className="bg-surface rounded-lg p-4">
                          <div className="text-2xl font-bold text-white">{sector.totalIncidents.toLocaleString()}</div>
                          <div className="text-gray-400 text-sm">Total Security Incidents</div>
                        </div>
                        <div className="bg-surface rounded-lg p-4">
                          <div className="text-2xl font-bold text-red-400">{sector.criticalThreats}</div>
                          <div className="text-gray-400 text-sm">Critical Threats Detected</div>
                        </div>
                        <div className="bg-surface rounded-lg p-4">
                          <div className="text-2xl font-bold text-green-400">{sector.responseTime}</div>
                          <div className="text-gray-400 text-sm">Avg. Response Time</div>
                        </div>
                      </div>
                      
                      <div className="md:col-span-2">
                        <h4 className="text-white font-semibold mb-4">Primary Attack Vectors</h4>
                        <div className="space-y-3">
                          {sector.mainVectors.map((vector, vectorIndex) => (
                            <div key={vectorIndex} className="flex items-center space-x-3 p-3 bg-surface/50 rounded-lg">
                              <AlertTriangle className="w-4 h-4 text-orange-400 flex-shrink-0" />
                              <span className="text-gray-300">{vector}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* AI-Powered Predictions */}
          <section className="mb-16">
            <Card className="bg-gradient-to-r from-surface/30 to-surface/50 border-surface-light">
              <CardHeader>
                <CardTitle className="text-white text-3xl flex items-center">
                  <Brain className="w-8 h-8 mr-3 text-cyan-400" />
                  AI-Powered Threat Predictions for 2025
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold text-cyan-400 mb-4">Emerging Threat Patterns</h3>
                    <ul className="space-y-3 text-gray-300">
                      <li className="flex items-start space-x-2">
                        <TrendingUp className="w-4 h-4 text-red-400 mt-1 flex-shrink-0" />
                        <span>AI-generated phishing attacks expected to increase by 45%</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <TrendingUp className="w-4 h-4 text-red-400 mt-1 flex-shrink-0" />
                        <span>Supply chain attacks targeting EdTech platforms will rise 60%</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <TrendingUp className="w-4 h-4 text-red-400 mt-1 flex-shrink-0" />
                        <span>Nation-state attacks on educational research data up 25%</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <TrendingUp className="w-4 h-4 text-red-400 mt-1 flex-shrink-0" />
                        <span>Zero-trust adoption to reduce incidents by 38%</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-green-400 mb-4">Recommended Countermeasures</h3>
                    <ul className="space-y-3 text-gray-300">
                      <li className="flex items-start space-x-2">
                        <Shield className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                        <span>Implement AI-powered behavioral analytics for early detection</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <Shield className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                        <span>Deploy automated incident response systems</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <Shield className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                        <span>Strengthen third-party vendor security assessments</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <Shield className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                        <span>Enhance security awareness training programs</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Report Metadata */}
          <section className="bg-surface/30 rounded-xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Report Details</h3>
                <div className="space-y-3 text-gray-300">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-cyan-400" />
                    <span>Published: January 2025</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <BarChart3 className="w-4 h-4 text-cyan-400" />
                    <span>Data Sources: 24,200+ organizations</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Target className="w-4 h-4 text-cyan-400" />
                    <span>Incidents Analyzed: 2.8M+</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Globe className="w-4 h-4 text-cyan-400" />
                    <span>Geographic Coverage: 15 countries</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Research Methodology</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  This report analyzes cybersecurity incidents from January 2024 to December 2024, 
                  using advanced AI algorithms to identify patterns, predict trends, and provide 
                  actionable insights for educational institutions and government organizations. 
                  Data was collected from CyberSecure AI's threat intelligence network, 
                  industry partnerships, and government cybersecurity agencies.
                </p>
              </div>
            </div>
            
            <div className="mt-8 pt-8 border-t border-surface-light text-center">
              <Button className="bg-red-600 hover:bg-red-700 text-white px-12 py-4 text-lg">
                <Download className="w-5 h-5 mr-2" />
                Download Complete Report (PDF, 127 pages)
              </Button>
              <p className="text-gray-400 text-sm mt-2">
                Detailed analysis, case studies, and implementation guidelines included
              </p>
            </div>
          </section>
        </div>
      </div>
    </MarketingLayout>
  );
}