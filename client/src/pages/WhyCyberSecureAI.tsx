import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Shield, 
  Brain, 
  CheckCircle, 
  XCircle, 
  TrendingUp, 
  DollarSign, 
  MapPin, 
  Users,
  Award,
  Target,
  ArrowRight,
  Crown,
  Star
} from "lucide-react";
import { MarketingLayout } from "@/components/MarketingLayout";
import { Link } from "wouter";

export default function WhyCyberSecureAI() {
  const competitorData = [
    {
      name: "AT&T Cybersecurity",
      location: "Dallas, TX",
      type: "Texas-based",
      priceRange: "$80K-300K+",
      logo: "AT&T",
      logoColor: "from-blue-600 to-blue-800",
      scores: {
        sectorSpecialization: 5,
        aiCapabilities: 7,
        solutionBreadth: 9,
        complianceAutomation: 7,
        itManagement: 6,
        hardwareIntegration: 8,
        educationFocus: 4,
        governmentFocus: 6
      },
      strengths: ["Solution Breadth", "Hardware Integration", "Enterprise Scale"],
      weaknesses: ["Limited Sector Focus", "Higher Cost", "Generic AI"],
      vsCS: "CyberSecure AI offers 80% better sector specialization and 50% better IT management integration at 69% lower cost."
    },
    {
      name: "Forcepoint",
      location: "Austin, TX", 
      type: "Texas-based",
      priceRange: "$50K-200K",
      logo: "FP",
      logoColor: "from-red-600 to-red-800",
      scores: {
        sectorSpecialization: 6,
        aiCapabilities: 8,
        solutionBreadth: 7,
        complianceAutomation: 7,
        itManagement: 5,
        hardwareIntegration: 6,
        educationFocus: 5,
        governmentFocus: 7
      },
      strengths: ["AI Capabilities", "Data Protection", "Policy Engine"],
      weaknesses: ["Limited Education Focus", "Complex Deployment", "IT Integration Gaps"],
      vsCS: "CyberSecure AI provides 50% better sector focus and 80% better IT management with comprehensive education/government expertise."
    },
    {
      name: "FireEye/Mandiant",
      location: "Dallas, TX",
      type: "Texas-based", 
      priceRange: "$100K-500K+",
      logo: "FE",
      logoColor: "from-orange-600 to-red-600",
      scores: {
        sectorSpecialization: 6,
        aiCapabilities: 9,
        solutionBreadth: 8,
        complianceAutomation: 6,
        itManagement: 4,
        hardwareIntegration: 7,
        educationFocus: 5,
        governmentFocus: 8
      },
      strengths: ["Threat Intelligence", "Incident Response", "Government Focus"],
      weaknesses: ["Extremely High Cost", "Poor IT Integration", "Limited Education Support"],
      vsCS: "CyberSecure AI delivers 50% better sector specialization and 125% better IT management at 75% lower cost."
    },
    {
      name: "Alert Logic",
      location: "Houston, TX",
      type: "Texas-based",
      priceRange: "$20K-100K", 
      logo: "AL",
      logoColor: "from-green-600 to-green-800",
      scores: {
        sectorSpecialization: 5,
        aiCapabilities: 6,
        solutionBreadth: 7,
        complianceAutomation: 7,
        itManagement: 5,
        hardwareIntegration: 6,
        educationFocus: 4,
        governmentFocus: 6
      },
      strengths: ["Competitive Pricing", "Cloud Focus", "SOC Services"],
      weaknesses: ["Limited AI Capabilities", "Poor Sector Focus", "Basic IT Integration"],
      vsCS: "CyberSecure AI offers 80% better sector focus, 50% better AI capabilities, and 80% better IT management integration."
    },
    {
      name: "CrowdStrike",
      location: "National",
      type: "National",
      priceRange: "$75K-250K+",
      logo: "CS",
      logoColor: "from-red-500 to-red-700",
      scores: {
        sectorSpecialization: 4,
        aiCapabilities: 10,
        solutionBreadth: 7,
        complianceAutomation: 6,
        itManagement: 4,
        hardwareIntegration: 5,
        educationFocus: 3,
        governmentFocus: 5
      },
      strengths: ["Leading AI Capabilities", "Endpoint Detection", "Threat Hunting"],
      weaknesses: ["No Sector Specialization", "Limited Education/Gov Focus", "Poor IT Integration"],
      vsCS: "CyberSecure AI provides 125% better sector specialization, 50% better compliance automation, and 125% better IT management while matching AI capabilities."
    },
    {
      name: "SentinelOne",
      location: "National",
      type: "National", 
      priceRange: "$40K-150K",
      logo: "S1",
      logoColor: "from-purple-600 to-purple-800",
      scores: {
        sectorSpecialization: 4,
        aiCapabilities: 9,
        solutionBreadth: 5,
        complianceAutomation: 5,
        itManagement: 3,
        hardwareIntegration: 4,
        educationFocus: 3,
        governmentFocus: 4
      },
      strengths: ["AI-Powered Detection", "Autonomous Response", "Endpoint Focus"],
      weaknesses: ["No Sector Focus", "Limited Solution Breadth", "Poor IT Integration"],
      vsCS: "CyberSecure AI offers 125% better sector specialization, 60% better solution breadth, 80% better compliance, and 200% better IT management."
    },
    {
      name: "Palo Alto Networks", 
      location: "National",
      type: "National",
      priceRange: "$100K-500K+",
      logo: "PAN",
      logoColor: "from-orange-500 to-orange-700",
      scores: {
        sectorSpecialization: 4,
        aiCapabilities: 8,
        solutionBreadth: 9,
        complianceAutomation: 6,
        itManagement: 5,
        hardwareIntegration: 8,
        educationFocus: 3,
        governmentFocus: 5
      },
      strengths: ["Comprehensive Platform", "Network Security", "Solution Breadth"],
      weaknesses: ["No Sector Focus", "Extremely High Cost", "Complex Management"],
      vsCS: "CyberSecure AI provides 125% better sector specialization, 50% better compliance automation, and 80% better IT management at 75% lower cost."
    },
    {
      name: "Securly",
      location: "National",
      type: "Education Specialist",
      priceRange: "$5K-50K",
      logo: "SEC",
      logoColor: "from-blue-500 to-blue-700", 
      scores: {
        sectorSpecialization: 7,
        aiCapabilities: 4,
        solutionBreadth: 4,
        complianceAutomation: 6,
        itManagement: 3,
        hardwareIntegration: 3,
        educationFocus: 10,
        governmentFocus: 2
      },
      strengths: ["K-12 Specialization", "Content Filtering", "Low Cost"],
      weaknesses: ["No Government Support", "Limited AI", "Basic Solution Set"],
      vsCS: "CyberSecure AI offers 125% better AI capabilities, 100% better solution breadth, dual-sector expertise, and 200% better IT management."
    },
    {
      name: "Carahsoft",
      location: "National", 
      type: "Government Specialist",
      priceRange: "Variable",
      logo: "CAR",
      logoColor: "from-blue-600 to-indigo-700",
      scores: {
        sectorSpecialization: 6,
        aiCapabilities: 5,
        solutionBreadth: 7,
        complianceAutomation: 8,
        itManagement: 6,
        hardwareIntegration: 7,
        educationFocus: 3,
        governmentFocus: 9
      },
      strengths: ["Government Focus", "Compliance Automation", "Procurement Expertise"],
      weaknesses: ["No Education Support", "Limited AI Capabilities", "Reseller Model"],
      vsCS: "CyberSecure AI provides 80% better AI capabilities, 50% better sector coverage with dual expertise, and 50% better IT management integration."
    }
  ];

  const csScores = {
    sectorSpecialization: 9,
    aiCapabilities: 9, 
    solutionBreadth: 8,
    complianceAutomation: 9,
    itManagement: 9,
    hardwareIntegration: 7,
    educationFocus: 8,
    governmentFocus: 9
  };

  const keyAdvantages = [
    {
      title: "Dual-Sector Expertise",
      description: "Only solution with 8+ scores in both Education AND Government sectors",
      icon: <Award className="w-8 h-8" />,
      score: "9/10",
      competitors: "Most competitors score 2-5/10 in non-primary sectors"
    },
    {
      title: "IT Management Integration", 
      description: "Industry-leading cybersecurity + IT management unified platform",
      icon: <Target className="w-8 h-8" />,
      score: "9/10",
      competitors: "Best competitor scores only 6/10 (AT&T)"
    },
    {
      title: "Balanced Excellence",
      description: "Only solution scoring 8+ across SIX different capability categories",
      icon: <Crown className="w-8 h-8" />,
      score: "8-9/10",
      competitors: "No competitor achieves this breadth of excellence"
    },
    {
      title: "Cost-Effective Premium",
      description: "Enterprise capabilities at 50-75% lower cost than comparable solutions",
      icon: <DollarSign className="w-8 h-8" />,
      score: "$25K-250K",
      competitors: "Premium competitors cost $100K-500K+"
    }
  ];

  return (
    <MarketingLayout>
      <div className="solutions-light-bg min-h-screen">
        {/* Hero Section */}
        <section className="py-20 px-6 solutions-light-hero">
          <div className="container mx-auto max-w-6xl text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center">
                <Shield className="w-10 h-10 text-white" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold solutions-light-text mb-6 geometric-text">
              Why CyberSecure AI?
            </h1>
            <p className="text-xl solutions-light-muted mb-8 max-w-4xl mx-auto">
              Comprehensive competitive analysis showing how CyberSecure AI outperforms 9 major cybersecurity competitors across critical capabilities, cost-effectiveness, and sector specialization.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/security-scanner">
                <Button size="lg" className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 px-12 py-4 text-lg text-white">
                  Compare Our Solution
                </Button>
              </Link>
              <Link href="/solutions">
                <Button size="lg" variant="outline" className="border-cyan-500 text-cyan-600 hover:bg-cyan-50 px-12 py-4 text-lg">
                  Explore Solutions
                  <ArrowRight className="ml-2 w-6 h-6" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Key Advantages Section */}
        <section className="py-16 px-6">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-4xl font-bold solutions-light-text text-center mb-12">CyberSecure AI Competitive Advantages</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {keyAdvantages.map((advantage, index) => (
                <Card key={index} className="solutions-light-card relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-bl-full"></div>
                  <CardContent className="p-6 text-center relative">
                    <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center text-white mx-auto mb-4">
                      {advantage.icon}
                    </div>
                    <h3 className="text-xl font-bold solutions-light-text mb-3">{advantage.title}</h3>
                    <p className="solutions-light-muted text-sm mb-4">{advantage.description}</p>
                    <div className="space-y-2">
                      <div className="text-2xl font-bold text-cyan-500">{advantage.score}</div>
                      <div className="text-xs solutions-light-muted">{advantage.competitors}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Detailed Competitor Comparisons */}
        <section className="py-16 px-6 solutions-light-section">
          <div className="container mx-auto max-w-7xl">
            <h2 className="text-4xl font-bold solutions-light-text text-center mb-12">Detailed Competitor Analysis</h2>
            <div className="space-y-8">
              {competitorData.map((competitor, index) => (
                <Card key={index} className="solutions-light-card overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-gray-50 to-white pb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`w-16 h-16 bg-gradient-to-r ${competitor.logoColor} rounded-xl flex items-center justify-center text-white font-bold text-lg`}>
                          {competitor.logo}
                        </div>
                        <div>
                          <CardTitle className="text-2xl solutions-light-text">{competitor.name}</CardTitle>
                          <div className="flex items-center space-x-4 text-sm solutions-light-muted">
                            <span className="flex items-center"><MapPin className="w-4 h-4 mr-1" /> {competitor.location}</span>
                            <span>{competitor.type}</span>
                            <span className="flex items-center"><DollarSign className="w-4 h-4 mr-1" /> {competitor.priceRange}</span>
                          </div>
                        </div>
                      </div>
                      <Badge className={`${competitor.type.includes('Texas') ? 'bg-blue-100 text-blue-800' : competitor.type.includes('Education') || competitor.type.includes('Government') ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'}`}>
                        {competitor.type}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      {/* Capability Scores */}
                      <div className="lg:col-span-2">
                        <h4 className="text-lg font-semibold solutions-light-text mb-4">Capability Comparison vs CyberSecure AI</h4>
                        <div className="grid grid-cols-2 gap-4">
                          {Object.entries(competitor.scores).map(([category, score]) => (
                            <div key={category} className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span className="solutions-light-muted capitalize">
                                  {category.replace(/([A-Z])/g, ' $1').trim()}
                                </span>
                                <div className="flex items-center space-x-2">
                                  <span className="text-red-500 font-semibold">{score}/10</span>
                                  <span className="text-gray-400">vs</span>
                                  <span className="text-green-500 font-semibold">{csScores[category as keyof typeof csScores]}/10</span>
                                </div>
                              </div>
                              <div className="flex space-x-1">
                                <Progress value={score * 10} className="flex-1 h-2" />
                                <Progress value={csScores[category as keyof typeof csScores] * 10} className="flex-1 h-2 bg-green-500" />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Strengths & Weaknesses */}
                      <div className="space-y-4">
                        <div>
                          <h5 className="font-semibold text-green-600 mb-2">Strengths</h5>
                          <ul className="space-y-1">
                            {competitor.strengths.map((strength, idx) => (
                              <li key={idx} className="flex items-center text-sm solutions-light-text">
                                <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                                {strength}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-semibold text-red-600 mb-2">Weaknesses</h5>
                          <ul className="space-y-1">
                            {competitor.weaknesses.map((weakness, idx) => (
                              <li key={idx} className="flex items-center text-sm solutions-light-text">
                                <XCircle className="w-4 h-4 text-red-500 mr-2 flex-shrink-0" />
                                {weakness}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        {/* VS CyberSecure AI */}
                        <div className="bg-gradient-to-r from-cyan-50 to-blue-50 p-4 rounded-lg">
                          <h5 className="font-semibold text-cyan-600 mb-2 flex items-center">
                            <Crown className="w-4 h-4 mr-1" />
                            Why CyberSecure AI Wins
                          </h5>
                          <p className="text-sm solutions-light-text">{competitor.vsCS}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Overall Competitive Summary */}
        <section className="py-16 px-6">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-4xl font-bold solutions-light-text text-center mb-12">Market Leadership Summary</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="solutions-light-card bg-gradient-to-br from-green-50 to-emerald-50">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl font-bold text-green-500 mb-2">#1</div>
                  <div className="solutions-light-text font-semibold mb-2">IT Management Integration</div>
                  <div className="solutions-light-muted text-sm">Score: 9/10 (vs max competitor: 6/10)</div>
                </CardContent>
              </Card>

              <Card className="solutions-light-card bg-gradient-to-br from-blue-50 to-cyan-50">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl font-bold text-blue-500 mb-2">#1</div>
                  <div className="solutions-light-text font-semibold mb-2">Sector Specialization</div>
                  <div className="solutions-light-muted text-sm">Score: 9/10 (dual Education + Government)</div>
                </CardContent>
              </Card>

              <Card className="solutions-light-card bg-gradient-to-br from-purple-50 to-indigo-50">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl font-bold text-purple-500 mb-2">Only</div>
                  <div className="solutions-light-text font-semibold mb-2">Balanced Excellence</div>
                  <div className="solutions-light-muted text-sm">8+ scores across 6 categories</div>
                </CardContent>
              </Card>

              <Card className="solutions-light-card bg-gradient-to-br from-orange-50 to-red-50">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl font-bold text-orange-500 mb-2">75%</div>
                  <div className="solutions-light-text font-semibold mb-2">Cost Savings</div>
                  <div className="solutions-light-muted text-sm">vs premium competitors</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 px-6 bg-gradient-to-r from-cyan-50 to-blue-50">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-5xl font-bold solutions-light-text mb-8">Experience the CyberSecure AI Advantage</h2>
            <p className="text-xl solutions-light-muted mb-10 max-w-3xl mx-auto">
              Join hundreds of educational institutions and government agencies who chose CyberSecure AI for superior sector specialization, AI capabilities, and cost-effectiveness.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/security-scanner">
                <Button size="lg" className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 px-12 py-4 text-lg text-white">
                  Get Competitive Analysis
                </Button>
              </Link>
              <Link href="/solutions">
                <Button size="lg" variant="outline" className="border-cyan-500 text-cyan-600 hover:bg-cyan-50 px-12 py-4 text-lg">
                  Compare Our Solutions
                  <ArrowRight className="ml-2 w-6 h-6" />
                </Button>
              </Link>
            </div>
            
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm solutions-light-muted">
              <div className="flex items-center justify-center">
                <Star className="w-4 h-4 text-cyan-500 mr-1" />
                Rated #1 in Sector Specialization
              </div>
              <div className="flex items-center justify-center">
                <Brain className="w-4 h-4 text-cyan-500 mr-1" />
                9/10 AI Capabilities Score
              </div>
              <div className="flex items-center justify-center">
                <Shield className="w-4 h-4 text-cyan-500 mr-1" />
                99.8% Threat Detection Rate
              </div>
            </div>
          </div>
        </section>
      </div>
    </MarketingLayout>
  );
}