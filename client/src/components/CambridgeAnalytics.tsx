import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Brain, 
  Target, 
  Zap, 
  TrendingUp,
  AlertTriangle,
  Eye,
  Network,
  BarChart3,
  PieChart
} from "lucide-react";
// Dynamic recharts imports to reduce bundle size
type RechartsComponents = {
  LineChart: any;
  Line: any;
  XAxis: any;
  YAxis: any;
  ResponsiveContainer: any;
  RadialBarChart: any;
  RadialBar: any;
  PieChart: any;
  Cell: any;
};

let rechartsComponents: RechartsComponents | null = null;
let rechartsLoading = false;
let rechartsPromise: Promise<RechartsComponents> | null = null;

const loadRechartsComponents = async (): Promise<RechartsComponents> => {
  if (rechartsComponents) return rechartsComponents;
  if (rechartsPromise) return rechartsPromise;
  
  rechartsLoading = true;
  rechartsPromise = import("recharts").then(module => {
    rechartsComponents = {
      LineChart: module.LineChart,
      Line: module.Line,
      XAxis: module.XAxis,
      YAxis: module.YAxis,
      ResponsiveContainer: module.ResponsiveContainer,
      RadialBarChart: module.RadialBarChart,
      RadialBar: module.RadialBar,
      PieChart: module.PieChart,
      Cell: module.Cell
    };
    rechartsLoading = false;
    return rechartsComponents!;
  }).catch(error => {
    console.error('Failed to load recharts:', error);
    rechartsLoading = false;
    throw error;
  });
  
  return rechartsPromise;
};

interface AnalyticsInsight {
  id: string;
  title: string;
  description: string;
  confidence: number;
  impact: "low" | "medium" | "high" | "critical";
  category: "behavioral" | "predictive" | "forensic" | "strategic";
  dataPoints: number;
  timestamp: string;
}

interface ThreatVector {
  vector: string;
  probability: number;
  severity: number;
  timeline: "immediate" | "short-term" | "medium-term" | "long-term";
}

export function CambridgeAnalytics() {
  const [activeTab, setActiveTab] = useState("insights");
  const [isRechartsLoaded, setIsRechartsLoaded] = useState(!!rechartsComponents);
  const [rechartsError, setRechartsError] = useState<string | null>(null);

  // Load recharts dynamically
  useEffect(() => {
    let mounted = true;
    
    const initializeCharts = async () => {
      try {
        await loadRechartsComponents();
        if (mounted) {
          setIsRechartsLoaded(true);
        }
      } catch (error) {
        if (mounted) {
          setRechartsError(error instanceof Error ? error.message : 'Failed to load charts');
        }
      }
    };

    if (!rechartsComponents) {
      initializeCharts();
    }

    return () => {
      mounted = false;
    };
  }, []);

  const { data: analyticsData, isLoading } = useQuery<{
    insights: AnalyticsInsight[];
    threatVectors: ThreatVector[];
    riskMatrix: Array<{ category: string; current: number; predicted: number; confidence: number }>;
    behavioralPatterns: Array<{ time: string; anomalies: number; normal: number; suspicious: number }>;
  }>({
    queryKey: ["/api/cambridge-analytics"],
    refetchInterval: 60000,
  });

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "critical": return "text-red-400 border-red-500/50";
      case "high": return "text-orange-400 border-orange-500/50";
      case "medium": return "text-yellow-400 border-yellow-500/50";
      case "low": return "text-green-400 border-green-500/50";
      default: return "text-gray-400 border-gray-500/50";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "behavioral": return <Eye className="w-4 h-4" />;
      case "predictive": return <Brain className="w-4 h-4" />;
      case "forensic": return <Target className="w-4 h-4" />;
      case "strategic": return <BarChart3 className="w-4 h-4" />;
      default: return <Zap className="w-4 h-4" />;
    }
  };

  const COLORS = ['#00ffff', '#ff00ff', '#ffff00', '#00ff7f', '#ff4500'];

  if (isLoading) {
    return (
      <Card className="holographic-card border-purple-500/30">
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-6 bg-gray-700 rounded w-1/2"></div>
            <div className="space-y-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-4 bg-gray-700 rounded"></div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="holographic-card border-purple-500/30 backdrop-blur-xl floating-3d">
      <CardHeader>
        <CardTitle className="text-purple-300 flex items-center font-bold tracking-wide">
          <Brain className="w-6 h-6 mr-3 text-purple-400 animate-pulse" />
          CAMBRIDGE INTELLIGENCE ANALYTICS
          <Badge className="ml-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white animate-pulse">
            AI-POWERED
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-background/50 backdrop-blur-sm">
            <TabsTrigger value="insights" className="cyber-button">
              Strategic Insights
            </TabsTrigger>
            <TabsTrigger value="threats" className="cyber-button">
              Threat Vectors
            </TabsTrigger>
            <TabsTrigger value="behavioral" className="cyber-button">
              Behavioral Analysis
            </TabsTrigger>
          </TabsList>

          <TabsContent value="insights" className="space-y-4 mt-6">
            <div className="grid gap-4">
              {(analyticsData?.insights || [
                {
                  id: "1",
                  title: "Emerging Phishing Campaign Pattern",
                  description: "Detected sophisticated email campaign targeting educational institutions with 94% confidence",
                  confidence: 94,
                  impact: "high",
                  category: "predictive",
                  dataPoints: 2847,
                  timestamp: new Date().toISOString()
                },
                {
                  id: "2", 
                  title: "Anomalous Network Behavior",
                  description: "Unusual data exfiltration patterns identified in server cluster B",
                  confidence: 89,
                  impact: "critical",
                  category: "behavioral",
                  dataPoints: 1203,
                  timestamp: new Date().toISOString()
                },
                {
                  id: "3",
                  title: "Compliance Gap Analysis",
                  description: "FERPA compliance optimization opportunities identified across 3 domains",
                  confidence: 97,
                  impact: "medium",
                  category: "strategic",
                  dataPoints: 456,
                  timestamp: new Date().toISOString()
                }
              ]).slice(0, 3).map((insight) => (
                <div key={insight.id} className="p-4 bg-background/20 rounded-lg border border-purple-500/20 hover:border-purple-400/40 transition-all">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      {getCategoryIcon(insight.category)}
                      <span className="text-sm font-medium text-purple-300">{insight.title}</span>
                    </div>
                    <Badge className={`${getImpactColor(insight.impact)} bg-transparent border`}>
                      {insight.impact.toUpperCase()}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-gray-300 mb-3">{insight.description}</p>
                  
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-4">
                      <span className="text-gray-400">Confidence: {insight.confidence}%</span>
                      <span className="text-gray-400">Data Points: {insight.dataPoints.toLocaleString()}</span>
                    </div>
                    <span className="text-gray-500 capitalize">{insight.category} Analysis</span>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="threats" className="space-y-4 mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {(analyticsData?.threatVectors || [
                { vector: "Advanced Persistent Threat", probability: 0.23, severity: 0.89, timeline: "medium-term" },
                { vector: "Insider Threat Activity", probability: 0.15, severity: 0.67, timeline: "immediate" },
                { vector: "Supply Chain Compromise", probability: 0.31, severity: 0.78, timeline: "short-term" },
                { vector: "Zero-Day Exploitation", probability: 0.08, severity: 0.95, timeline: "long-term" }
              ]).map((threat, index) => (
                <div key={index} className="p-4 bg-background/20 rounded-lg border border-orange-500/20">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm font-medium text-orange-300">{threat.vector}</h4>
                    <Badge className={`${
                      threat.timeline === "immediate" ? "text-red-400 border-red-500/50" :
                      threat.timeline === "short-term" ? "text-orange-400 border-orange-500/50" :
                      threat.timeline === "medium-term" ? "text-yellow-400 border-yellow-500/50" :
                      "text-green-400 border-green-500/50"
                    } bg-transparent border`}>
                      {threat.timeline.toUpperCase()}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-400">Probability</span>
                      <span className="text-cyan-400">{Math.round(threat.probability * 100)}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-1.5">
                      <div 
                        className="bg-gradient-to-r from-cyan-500 to-blue-500 h-1.5 rounded-full" 
                        style={{ width: `${threat.probability * 100}%` }}
                      ></div>
                    </div>
                    
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-400">Severity</span>
                      <span className="text-red-400">{Math.round(threat.severity * 100)}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-1.5">
                      <div 
                        className="bg-gradient-to-r from-orange-500 to-red-500 h-1.5 rounded-full" 
                        style={{ width: `${threat.severity * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="behavioral" className="space-y-4 mt-6">
            <div className="h-64 w-full">
              {rechartsError ? (
                <div className="flex items-center justify-center h-full text-red-400">
                  Failed to load chart: {rechartsError}
                </div>
              ) : !isRechartsLoaded ? (
                <div className="flex items-center justify-center h-full">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"></div>
                  <span className="ml-2 text-gray-400">Loading chart...</span>
                </div>
              ) : (
                <rechartsComponents.ResponsiveContainer width="100%" height="100%">
                  <rechartsComponents.LineChart data={analyticsData?.behavioralPatterns || [
                    { time: "00:00", anomalies: 2, normal: 1456, suspicious: 8 },
                    { time: "06:00", anomalies: 1, normal: 2134, suspicious: 3 },
                    { time: "12:00", anomalies: 5, normal: 3421, suspicious: 12 },
                    { time: "18:00", anomalies: 3, normal: 2876, suspicious: 7 },
                    { time: "24:00", anomalies: 1, normal: 1234, suspicious: 4 }
                  ]}>
                    <rechartsComponents.XAxis dataKey="time" stroke="#6b7280" fontSize={12} />
                    <rechartsComponents.YAxis stroke="#6b7280" fontSize={12} />
                    <rechartsComponents.Line type="monotone" dataKey="normal" stroke="#22c55e" strokeWidth={2} />
                    <rechartsComponents.Line type="monotone" dataKey="suspicious" stroke="#eab308" strokeWidth={2} />
                    <rechartsComponents.Line type="monotone" dataKey="anomalies" stroke="#ef4444" strokeWidth={2} />
                  </rechartsComponents.LineChart>
                </rechartsComponents.ResponsiveContainer>
              )}
            </div>
            
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/30">
                <div className="text-lg font-bold text-green-400">Normal</div>
                <div className="text-sm text-gray-400">Baseline Activity</div>
              </div>
              <div className="p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/30">
                <div className="text-lg font-bold text-yellow-400">Suspicious</div>
                <div className="text-sm text-gray-400">Flagged Events</div>
              </div>
              <div className="p-3 bg-red-500/10 rounded-lg border border-red-500/30">
                <div className="text-lg font-bold text-red-400">Anomalies</div>
                <div className="text-sm text-gray-400">Critical Events</div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}