import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Shield, 
  Brain, 
  Activity, 
  Target, 
  Zap,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Eye,
  Globe
} from "lucide-react";

interface IntelligenceMetric {
  label: string;
  value: string | number;
  change: string;
  trend: "up" | "down" | "stable";
  confidence: number;
  category: "security" | "intelligence" | "operations" | "compliance";
}

export function IntelligenceOverview() {
  const { data: intelligenceData, isLoading } = useQuery<{
    threatLevel: "low" | "medium" | "high" | "critical";
    systemHealth: number;
    activeThreats: number;
    protectedAssets: number;
    intelligenceFeeds: number;
    analysisConfidence: number;
    metrics: IntelligenceMetric[];
  }>({
    queryKey: ["/api/intelligence/overview"],
    refetchInterval: 30000,
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "security": return <Shield className="w-4 h-4" />;
      case "intelligence": return <Brain className="w-4 h-4" />;
      case "operations": return <Activity className="w-4 h-4" />;
      case "compliance": return <CheckCircle className="w-4 h-4" />;
      default: return <Target className="w-4 h-4" />;
    }
  };

  const getThreatLevelColor = (level: string) => {
    switch (level) {
      case "low": return "border-green-500/50 bg-green-500/10";
      case "medium": return "border-yellow-500/50 bg-yellow-500/10";
      case "high": return "border-orange-500/50 bg-orange-500/10";
      case "critical": return "border-red-500/50 bg-red-500/10";
      default: return "border-gray-500/50 bg-gray-500/10";
    }
  };

  const getThreatLevelText = (level: string) => {
    switch (level) {
      case "low": return "text-green-400";
      case "medium": return "text-yellow-400";
      case "high": return "text-orange-400";
      case "critical": return "text-red-400";
      default: return "text-gray-400";
    }
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i} className="holographic-card border-cyan-500/30">
            <CardContent className="p-6">
              <div className="animate-pulse space-y-4">
                <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                <div className="h-8 bg-gray-700 rounded w-1/2"></div>
                <div className="h-2 bg-gray-700 rounded"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Main Intelligence Status */}
      <Card className={`holographic-card border-2 floating-3d ${getThreatLevelColor(intelligenceData?.threatLevel || "low")}`}>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-white flex items-center font-bold tracking-wide">
              <Globe className="w-6 h-6 mr-3 text-cyan-400 animate-pulse" />
              PLATFORM INTELLIGENCE STATUS
            </CardTitle>
            <Badge className={`${getThreatLevelText(intelligenceData?.threatLevel || "low")} bg-transparent border-current animate-pulse`}>
              {(intelligenceData?.threatLevel || "low").toUpperCase()} THREAT LEVEL
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-4 bg-background/30 rounded-lg neon-border">
              <div className="text-2xl font-bold text-cyan-400 cyber-text-glow">
                {intelligenceData?.protectedAssets || 847}
              </div>
              <div className="text-xs text-gray-400 mt-1">Protected Assets</div>
            </div>
            <div className="text-center p-4 bg-background/30 rounded-lg neon-border">
              <div className="text-2xl font-bold text-green-400 cyber-text-glow">
                {intelligenceData?.systemHealth || 98}%
              </div>
              <div className="text-xs text-gray-400 mt-1">System Health</div>
            </div>
            <div className="text-center p-4 bg-background/30 rounded-lg neon-border">
              <div className="text-2xl font-bold text-orange-400 cyber-text-glow">
                {intelligenceData?.activeThreats || 12}
              </div>
              <div className="text-xs text-gray-400 mt-1">Active Threats</div>
            </div>
            <div className="text-center p-4 bg-background/30 rounded-lg neon-border">
              <div className="text-2xl font-bold text-purple-400 cyber-text-glow">
                {intelligenceData?.intelligenceFeeds || 28}
              </div>
              <div className="text-xs text-gray-400 mt-1">Intel Feeds</div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">Analysis Confidence</span>
              <span className="text-cyan-400 font-bold">
                {intelligenceData?.analysisConfidence || 94}%
              </span>
            </div>
            <Progress 
              value={intelligenceData?.analysisConfidence || 94} 
              className="h-2 bg-gray-700"
            />
          </div>
        </CardContent>
      </Card>

      {/* Key Intelligence Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {(intelligenceData?.metrics || [
          { label: "Threat Detection Rate", value: "99.7%", change: "+0.3%", trend: "up", confidence: 98, category: "security" },
          { label: "Response Time", value: "2.1s", change: "-0.8s", trend: "up", confidence: 95, category: "operations" },
          { label: "Intelligence Quality", value: "A+", change: "+5pts", trend: "up", confidence: 97, category: "intelligence" },
          { label: "Compliance Score", value: "96%", change: "+2%", trend: "up", confidence: 93, category: "compliance" }
        ]).map((metric, index) => (
          <Card key={index} className="holographic-card border-cyan-500/20 backdrop-blur-lg">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  {getCategoryIcon(metric.category)}
                  <span className="text-xs text-gray-400 uppercase tracking-wide">
                    {metric.category}
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  {metric.trend === "up" ? (
                    <TrendingUp className="w-3 h-3 text-green-400" />
                  ) : metric.trend === "down" ? (
                    <TrendingUp className="w-3 h-3 text-red-400 rotate-180" />
                  ) : (
                    <Activity className="w-3 h-3 text-gray-400" />
                  )}
                  <span className={`text-xs font-medium ${
                    metric.trend === "up" ? "text-green-400" : 
                    metric.trend === "down" ? "text-red-400" : "text-gray-400"
                  }`}>
                    {metric.change}
                  </span>
                </div>
              </div>
              
              <div className="text-xl font-bold text-white mb-1 cyber-text-glow">
                {metric.value}
              </div>
              <div className="text-xs text-gray-400 mb-2">{metric.label}</div>
              
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-500">Confidence</span>
                <span className="text-cyan-400 font-medium">{metric.confidence}%</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}