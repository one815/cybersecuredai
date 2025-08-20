import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
// Using emoji representations for cybersecurity icons
import { MarketingLayout } from "@/components/MarketingLayout";
import { Link } from "wouter";
import { useState, useEffect } from "react";

export default function PredictiveRiskAnalysis() {
  const [currentRiskScore, setCurrentRiskScore] = useState(67);
  const [predictionsGenerated, setPredictionsGenerated] = useState(12847);
  const [accuracyRate, setAccuracyRate] = useState(91.2);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isLive, setIsLive] = useState(true);
  const [riskTrends, setRiskTrends] = useState([
    { time: "14:23", score: 68, alerts: 3 },
    { time: "14:18", score: 67, alerts: 2 },
    { time: "14:13", score: 69, alerts: 4 },
    { time: "14:08", score: 66, alerts: 1 },
    { time: "14:03", score: 70, alerts: 5 }
  ]);

  // Simulate live risk analysis updates
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
      if (Math.random() > 0.6) {
        const newScore = Math.floor(Math.random() * 30 + 50); // 50-80 range
        setCurrentRiskScore(newScore);
        setPredictionsGenerated(prev => prev + Math.floor(Math.random() * 5) + 1);
        setAccuracyRate(prev => Math.min(99, prev + (Math.random() - 0.5) * 0.5));
        
        // Add new risk trend data
        const newTrend = {
          time: new Date().toLocaleTimeString().slice(0, 5),
          score: newScore,
          alerts: Math.floor(Math.random() * 6)
        };
        setRiskTrends(prev => [newTrend, ...prev.slice(0, 9)]);
      }
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  const riskCategories = [
    {
      category: "Vulnerability Prediction",
      description: "Identify potential system vulnerabilities before they can be exploited",
      accuracy: 92,
      timeframe: "1-30 days ahead",
      icon: <div className="w-6 h-6 text-2xl">🛡️</div>,
      color: "text-cyan-400"
    },
    {
      category: "Threat Intelligence",
      description: "Predictive analysis of emerging threat patterns and attack vectors", 
      accuracy: 89,
      timeframe: "1-14 days ahead",
      icon: <div className="w-6 h-6 text-2xl">👁️</div>,
      color: "text-purple-400"
    },
    {
      category: "Risk Scoring",
      description: "Dynamic risk assessment based on organizational behavior and threat landscape",
      accuracy: 94,
      timeframe: "Real-time updates",
      icon: <div className="w-6 h-6 text-2xl">📊</div>,
      color: "text-green-400"
    },
    {
      category: "Behavioral Forecasting",
      description: "Predict anomalous user behavior patterns that may indicate insider threats",
      accuracy: 87,
      timeframe: "1-7 days ahead",
      icon: <div className="w-6 h-6 text-2xl">📈</div>,
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
        {/* Tablet Dashboard Header */}
        <header className="bg-gradient-to-r from-gray-900/95 to-gray-800/95 backdrop-blur-md border-b border-green-500/30 p-6 cyber-glow">
          <div className="container mx-auto max-w-7xl">
            {/* Dashboard Title Bar */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-emerald-500 rounded-lg flex items-center justify-center text-white text-xl">
                  📈
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white geometric-text">Predictive Risk Analysis Dashboard</h1>
                  <p className="text-gray-400 text-sm cyber-font">AI-powered risk forecasting and threat prediction</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${isLive ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`}></div>
                  <span className="text-green-400 text-sm font-medium">LIVE</span>
                </div>
                <div className="text-gray-400 text-sm">{currentTime.toLocaleTimeString()}</div>
              </div>
            </div>

            {/* Live Risk Metrics Dashboard */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="holographic-card p-4 border border-red-500/30 data-glow floating-3d">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 text-sm cyber-font">Current Risk Score</span>
                  <div className="w-4 h-4 text-red-400 text-lg">⚠️</div>
                </div>
                <div className="text-3xl font-bold text-red-400 tech-font animate-pulse">{currentRiskScore}</div>
                <div className="text-xs text-gray-500">Real-time analysis</div>
                <div className="live-indicator mt-2">
                  LIVE MONITORING
                </div>
              </div>
              
              <div className="holographic-card p-4 border border-green-500/30 data-glow micro-hover">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 text-sm cyber-font">Predictions Generated</span>
                  <div className="w-4 h-4 text-green-400 text-lg">🧠</div>
                </div>
                <div className="text-3xl font-bold text-green-400 tech-font">{predictionsGenerated.toLocaleString()}</div>
                <div className="text-xs text-gray-500">Last 30 days</div>
                <div className="verification-badge mt-2">
                  AI POWERED
                </div>
              </div>
              
              <div className="holographic-card p-4 border border-cyan-500/30 chart-glow micro-hover">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 text-sm cyber-font">Accuracy Rate</span>
                  <div className="w-4 h-4 text-cyan-400 text-lg">🎯</div>
                </div>
                <div className="text-3xl font-bold text-cyan-400 tech-font">{accuracyRate.toFixed(1)}%</div>
                <div className="text-xs text-gray-500">AI model performance</div>
                <div className="encryption-indicator mt-2">
                  VERIFIED
                </div>
              </div>
              
              <div className="holographic-card p-4 border border-purple-500/30 holographic-glow micro-hover">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 text-sm cyber-font">Threat Prevention</span>
                  <div className="w-4 h-4 text-purple-400 text-lg">🛡️</div>
                </div>
                <div className="text-3xl font-bold text-purple-400 tech-font">68%</div>
                <div className="text-xs text-gray-500">Risk reduction</div>
                <div className="mfa-badge mt-2">
                  ACTIVE SHIELD
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Tablet Dashboard Interface */}
        <main className="container mx-auto max-w-7xl p-6 space-y-6">
          {/* Dashboard Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Live Risk Timeline */}
            <div className="lg:col-span-2 holographic-card p-6 border border-green-500/30 chart-glow floating-3d">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white flex items-center geometric-text">
                  <div className="w-5 h-5 mr-2 text-green-400 text-lg">📊</div>
                  Risk Score Timeline
                </h3>
                <div className="flex items-center space-x-3">
                  <div className="live-indicator">
                    LIVE UPDATES
                  </div>
                  <div className="security-protocol">
                    TLS 1.3
                  </div>
                </div>
              </div>
              
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {riskTrends.map((trend, index) => (
                  <div key={index} className={`flex items-center justify-between p-3 rounded-lg border ${
                    trend.score > 70 ? 'bg-red-900/20 border-red-500/30' :
                    trend.score > 60 ? 'bg-orange-900/20 border-orange-500/30' :
                    'bg-green-900/20 border-green-500/30'
                  } ${index === 0 ? 'animate-pulse' : ''}`}>
                    <div className="flex items-center space-x-4">
                      <span className="text-gray-400 font-mono text-sm">{trend.time}</span>
                      <div className={`text-lg font-bold font-mono ${
                        trend.score > 70 ? 'text-red-400' :
                        trend.score > 60 ? 'text-orange-400' :
                        'text-green-400'
                      }`}>
                        {trend.score}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={`${
                        trend.alerts > 3 ? 'bg-red-500' :
                        trend.alerts > 1 ? 'bg-orange-500' :
                        'bg-green-500'
                      } text-white text-xs`}>
                        {trend.alerts} alerts
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Risk Analysis Models */}
            <div className="bg-black/40 rounded-xl p-6 border border-cyan-500/30 cyber-glow">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center geometric-text">
                <div className="w-5 h-5 mr-2 text-cyan-400 text-lg">🧠</div>
                AI Models Status
              </h3>
              
              <div className="space-y-4">
                {predictionModels.map((model, index) => (
                  <div key={index} className="p-3 bg-gray-800/50 rounded-lg border border-gray-700">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white text-sm font-medium">{model.name}</span>
                      <Badge className="bg-cyan-500 text-white text-xs">{model.accuracy}</Badge>
                    </div>
                    <p className="text-gray-400 text-xs mb-2">{model.prediction}</p>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-green-400 text-xs">Active</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Risk Factors Dashboard */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {riskFactors.map((factor, index) => (
              <div key={index} className="bg-black/40 rounded-xl p-4 border border-purple-500/30 cyber-glow">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-white text-sm font-medium">{factor.factor}</span>
                  <div className={`flex items-center space-x-1 ${
                    factor.trend === 'increasing' ? 'text-red-400' :
                    factor.trend === 'decreasing' ? 'text-green-400' :
                    'text-yellow-400'
                  }`}>
                    <div className={`w-3 h-3 text-lg ${
                      factor.trend === 'decreasing' ? 'rotate-180' : 
                      factor.trend === 'stable' ? 'rotate-90' : ''
                    }`}>📈</div>
                    <span className="text-xs">{factor.trend}</span>
                  </div>
                </div>
                
                <div className="mb-2">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-400">Risk Weight</span>
                    <span className="text-purple-400 font-mono">{factor.weight}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        factor.weight > 70 ? 'bg-red-500' :
                        factor.weight > 50 ? 'bg-orange-500' :
                        'bg-green-500'
                      }`} 
                      style={{width: `${factor.weight}%`}}
                    ></div>
                  </div>
                </div>
                
                <Badge className={`${
                  factor.impact === 'high' ? 'bg-red-500' :
                  factor.impact === 'medium' ? 'bg-orange-500' :
                  'bg-green-500'
                } text-white text-xs`}>
                  {factor.impact} impact
                </Badge>
              </div>
            ))}
          </div>
        </main>

        {/* Call to Action */}
        <div className="text-center py-8">
          <Link href="/demo">
            <Button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3">
              Learn More About Predictive Risk Analysis
            </Button>
          </Link>
        </div>
      </div>
    </MarketingLayout>
  );
}