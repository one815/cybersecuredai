import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  Brain, 
  AlertTriangle, 
  Shield, 
  Target, 
  CheckCircle, 
  BarChart3,
  Activity,
  Database,
  Network,
  Eye,
  Settings,
  Clock,
  Bot
} from "lucide-react";
import { MarketingLayout } from "@/components/MarketingLayout";
import { Link } from "wouter";

export default function PredictiveRiskAnalysis() {
  const riskCategories = [
    {
      category: "Vulnerability Prediction",
      description: "Identify potential system vulnerabilities before they can be exploited",
      accuracy: 92,
      timeframe: "1-30 days ahead",
      icon: <Shield className="w-6 h-6" />,
      color: "text-cyan-400"
    },
    {
      category: "Threat Intelligence",
      description: "Predictive analysis of emerging threat patterns and attack vectors", 
      accuracy: 89,
      timeframe: "1-14 days ahead",
      icon: <Eye className="w-6 h-6" />,
      color: "text-purple-400"
    },
    {
      category: "Risk Scoring",
      description: "Dynamic risk assessment based on organizational behavior and threat landscape",
      accuracy: 94,
      timeframe: "Real-time updates",
      icon: <BarChart3 className="w-6 h-6" />,
      color: "text-green-400"
    },
    {
      category: "Behavioral Forecasting",
      description: "Predict anomalous user behavior patterns that may indicate insider threats",
      accuracy: 87,
      timeframe: "1-7 days ahead",
      icon: <Activity className="w-6 h-6" />,
      color: "text-orange-400"
    }
  ];

  const riskFactors = [
    { factor: "Unpatched Systems", weight: 85, trend: "increasing", impact: "high" },
    { factor: "User Behavior Anomalies", weight: 72, trend: "stable", impact: "medium" },
    { factor: "Network Configuration", weight: 68, trend: "decreasing", impact: "high" },
    { factor: "Third-party Integrations", weight: 61, trend: "increasing", impact: "medium" },
    { factor: "Data Access Patterns", weight: 59, trend: "stable", impact: "medium" },
    { factor: "Email Security Gaps", weight: 54, trend: "decreasing", impact: "high" }
  ];

  const predictionModels = [
    {
      name: "Zero-Day Vulnerability Predictor",
      accuracy: "89.3%",
      dataset: "CVE Database + Dark Web Intelligence",
      prediction: "Forecasts potential zero-day exploits in commonly used software"
    },
    {
      name: "Attack Path Analyzer", 
      accuracy: "92.7%",
      dataset: "Network Topology + Historical Incidents",
      prediction: "Identifies most likely attack vectors and progression paths"
    },
    {
      name: "Compliance Risk Forecaster",
      accuracy: "94.1%",
      dataset: "Regulatory Changes + Audit History",
      prediction: "Predicts compliance violations before audits occur"
    }
  ];

  const analyticsMetrics = [
    { metric: "Predictions Generated", value: "12,847", period: "Last 30 days" },
    { metric: "Accuracy Rate", value: "91.2%", period: "Average" },
    { metric: "False Positives", value: "4.8%", period: "Last quarter" },
    { metric: "Risk Reduction", value: "68%", period: "vs reactive approach" }
  ];

  return (
    <MarketingLayout>
      <div className="ai-dashboard-bg min-h-screen">
        {/* Hero Section */}
        <header className="bg-surface/90 backdrop-blur-md border-b border-surface-light p-8 cyber-glow">
          <div className="container mx-auto max-w-6xl">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <h1 className="text-4xl font-bold text-white">Predictive Risk Analysis</h1>
                  <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">AI-Powered</Badge>
                </div>
                <p className="text-gray-300 text-lg">
                  Advanced AI algorithms that analyze data to predict potential vulnerabilities before exploitation
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {analyticsMetrics.map((metric, index) => (
                <div key={index} className="bg-surface/50 rounded-lg p-4 border border-surface-light">
                  <div className="text-2xl font-bold text-white mb-1">{metric.value}</div>
                  <div className="text-sm text-gray-400 mb-1">{metric.metric}</div>
                  <div className="text-xs text-green-400">{metric.period}</div>
                </div>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="text-green-400 border-green-400/50">
                Custom pricing available
              </Badge>
              <Badge variant="outline" className="text-cyan-400 border-cyan-400/50">
                Predictive intelligence
              </Badge>
              <Badge variant="outline" className="text-purple-400 border-purple-400/50">
                Proactive defense
              </Badge>
            </div>
          </div>
        </header>

        <main className="container mx-auto max-w-6xl p-8 space-y-12">
          {/* Risk Analysis Categories */}
          <section>
            <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
              <Target className="w-8 h-8 mr-3 text-green-400" />
              Risk Analysis Categories
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {riskCategories.map((category, index) => (
                <Card key={index} className="bg-surface/50 border-surface-light">
                  <CardHeader>
                    <div className="flex items-center space-x-3 mb-4">
                      <div className={`${category.color}`}>{category.icon}</div>
                      <CardTitle className="text-white text-xl">{category.category}</CardTitle>
                    </div>
                    <p className="text-gray-400">{category.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-400">Accuracy Rate</span>
                        <span className="text-sm font-semibold text-white">{category.accuracy}%</span>
                      </div>
                      <Progress value={category.accuracy} className="h-2" />
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-400">Prediction Window</span>
                        <Badge variant="outline" className={`${category.color} border-current/50 text-xs`}>
                          {category.timeframe}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Real-time Risk Dashboard */}
          <section>
            <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
              <BarChart3 className="w-8 h-8 mr-3 text-green-400" />
              Real-time Risk Factors
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {riskFactors.map((risk, index) => (
                <Card key={index} className="bg-surface/50 border-surface-light">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-white text-lg">{risk.factor}</CardTitle>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className={`${
                          risk.impact === 'high' ? 'text-red-400 border-red-400/50' : 
                          risk.impact === 'medium' ? 'text-yellow-400 border-yellow-400/50' : 
                          'text-green-400 border-green-400/50'
                        }`}>
                          {risk.impact}
                        </Badge>
                        <div className={`w-2 h-2 rounded-full ${
                          risk.trend === 'increasing' ? 'bg-red-400' :
                          risk.trend === 'decreasing' ? 'bg-green-400' :
                          'bg-yellow-400'
                        }`}></div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-400">Risk Weight</span>
                        <span className="text-sm font-semibold text-white">{risk.weight}%</span>
                      </div>
                      <Progress value={risk.weight} className="h-2" />
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-gray-500">Trend: {risk.trend}</span>
                        <span className={`${
                          risk.trend === 'increasing' ? 'text-red-400' :
                          risk.trend === 'decreasing' ? 'text-green-400' :
                          'text-yellow-400'
                        }`}>
                          {risk.trend === 'increasing' ? '↗' : risk.trend === 'decreasing' ? '↘' : '→'}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Predictive Analytics Visualization */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">
              Predictive Intelligence Dashboard
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Risk Prediction Hologram */}
              <div className="relative rounded-xl overflow-hidden border border-green-500/30">
                <div className="bg-gradient-to-br from-green-900/20 to-emerald-900/40 p-8 h-72 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                      <TrendingUp className="w-12 h-12 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Risk Prediction Matrix</h3>
                    <p className="text-green-400 text-sm mb-4">3D holographic risk visualization with predictive modeling</p>
                    <div className="space-y-2">
                      <Badge className="bg-green-500/20 text-green-400 border border-green-500/50">91.2% Accuracy</Badge>
                      <div className="text-xs text-gray-400">Next 30 days forecast</div>
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-green-500/10 to-transparent pointer-events-none"></div>
              </div>

              {/* Analytics Dashboard */}
              <div className="relative rounded-xl overflow-hidden border border-blue-500/30">
                <div className="bg-gradient-to-br from-blue-900/20 to-blue-700/40 p-8 h-72 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                      <BarChart3 className="w-12 h-12 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Live Analytics Engine</h3>
                    <p className="text-blue-400 text-sm mb-4">Real-time risk assessment and vulnerability scoring</p>
                    <div className="space-y-2">
                      <Badge className="bg-blue-500/20 text-blue-400 border border-blue-500/50">Processing 50TB+ daily</Badge>
                      <div className="text-xs text-gray-400">Multi-source data fusion</div>
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-blue-500/10 to-transparent pointer-events-none"></div>
              </div>
            </div>
          </section>

          {/* Prediction Models */}
          <section className="bg-gradient-to-r from-surface/30 to-surface/50 rounded-xl p-8 border border-surface-light">
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
              <Brain className="w-8 h-8 mr-3 text-green-400" />
              AI Prediction Models
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {predictionModels.map((model, index) => (
                <Card key={index} className="bg-surface/50 border-surface-light">
                  <CardHeader>
                    <CardTitle className="text-white text-lg">{model.name}</CardTitle>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">Accuracy</span>
                      <Badge className="bg-green-500 text-white">{model.accuracy}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <span className="text-xs text-gray-400 uppercase tracking-wider">Data Sources</span>
                      <p className="text-sm text-cyan-400 mt-1">{model.dataset}</p>
                    </div>
                    <div className="pt-2 border-t border-surface-light">
                      <span className="text-xs text-gray-400 uppercase tracking-wider">Prediction Capability</span>
                      <p className="text-sm text-gray-300 mt-1">{model.prediction}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-8 p-6 bg-surface/30 rounded-lg border border-green-500/20">
              <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
                <Database className="w-5 h-5 mr-2 text-green-400" />
                Advanced Analytics Engine
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                <div>
                  <p className="text-gray-300 mb-2">
                    <span className="font-semibold text-green-400">Machine Learning Pipeline:</span> Processes 50TB+ of security data daily from multiple sources including threat intelligence feeds, vulnerability databases, and organizational metrics.
                  </p>
                </div>
                <div>
                  <p className="text-gray-300">
                    <span className="font-semibold text-green-400">Predictive Algorithms:</span> Ensemble methods combining gradient boosting, neural networks, and time series analysis for multi-dimensional risk forecasting.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Implementation Benefits */}
          <section>
            <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
              <CheckCircle className="w-8 h-8 mr-3 text-green-400" />
              Implementation Benefits
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="bg-gradient-to-br from-green-900/20 to-green-700/20 border-green-500/30">
                <CardHeader>
                  <CardTitle className="text-white text-lg flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-green-400" />
                    Proactive Security
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="text-sm text-gray-300">Address vulnerabilities before exploitation</div>
                  <div className="text-xs text-green-400">68% reduction in successful attacks</div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-cyan-900/20 to-cyan-700/20 border-cyan-500/30">
                <CardHeader>
                  <CardTitle className="text-white text-lg flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2 text-cyan-400" />
                    Resource Optimization
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="text-sm text-gray-300">Focus security efforts on highest-risk areas</div>
                  <div className="text-xs text-cyan-400">45% reduction in security staff workload</div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-900/20 to-purple-700/20 border-purple-500/30">
                <CardHeader>
                  <CardTitle className="text-white text-lg flex items-center">
                    <Shield className="w-5 h-5 mr-2 text-purple-400" />
                    Compliance Assurance
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="text-sm text-gray-300">Predict and prevent compliance violations</div>
                  <div className="text-xs text-purple-400">100% audit success rate</div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Sector Applications */}
          <section>
            <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
              <Settings className="w-8 h-8 mr-3 text-green-400" />
              Sector-Specific Applications
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="bg-gradient-to-br from-blue-900/20 to-blue-700/20 border-blue-500/30">
                <CardHeader>
                  <CardTitle className="text-white text-xl flex items-center">
                    <Badge className="bg-blue-500 text-white mr-3">Education</Badge>
                    Educational Risk Modeling
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">Student data breach risk assessment and prevention</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">FERPA compliance violation prediction and mitigation</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">Campus device security risk forecasting</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">Research data protection risk analysis</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-900/20 to-green-700/20 border-green-500/30">
                <CardHeader>
                  <CardTitle className="text-white text-xl flex items-center">
                    <Badge className="bg-green-500 text-white mr-3">Government</Badge>
                    Government Risk Intelligence
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">Critical infrastructure vulnerability prediction</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">Nation-state threat actor behavior forecasting</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">FISMA and FedRAMP compliance risk assessment</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">Interagency data sharing security analysis</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Call to Action */}
          <section className="text-center">
            <div className="bg-gradient-to-r from-green-900/20 to-emerald-900/20 rounded-xl p-8 border border-green-500/20">
              <h2 className="text-3xl font-bold text-white mb-4">
                Transform Risk Management with Predictive AI
              </h2>
              <p className="text-gray-300 text-lg mb-6 max-w-2xl mx-auto">
                Stay ahead of threats with advanced predictive analytics that identify vulnerabilities before they become breaches.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button size="lg" className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600" data-testid="button-request-demo">
                    Request Demo
                  </Button>
                </Link>
                <Link href="/pricing">
                  <Button variant="outline" size="lg" className="border-green-500/50 text-green-400 hover:bg-green-500/10" data-testid="button-view-pricing">
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