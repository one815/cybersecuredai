import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { 
  Shield, 
  CheckCircle, 
  AlertTriangle, 
  XCircle,
  TrendingUp,
  Clock
} from "lucide-react";

interface HealthData {
  overallHealthScore: number;
  riskAdjustedHealthScore: number;
  maturityScore: number;
  trendScore: number;
  frameworkScores: Array<{
    frameworkId: string;
    name: string;
    score: number;
    riskAdjustedScore: number;
    maturityScore: number;
    trendScore: number;
    status: "excellent" | "good" | "fair" | "poor";
    lastAssessed: Date | null;
  }>;
  criticalGaps: number;
  totalFindings: number;
  complianceDistribution: {
    excellent: number;
    good: number;
    fair: number;
    poor: number;
  };
  industryComparison?: {
    averageIndustryScore: number;
    performancePercentile: number;
    bestPracticeGap: number;
  };
}

export default function ComplianceHealthIndicator() {
  const { data: healthData, isLoading } = useQuery<HealthData>({
    queryKey: ["/api/compliance/health"],
  });

  if (isLoading) {
    return (
      <Card className="holographic-card border border-blue-500/30" data-testid="card-compliance-health">
        <CardContent className="p-6">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>
            <div className="h-8 bg-gray-300 rounded w-1/2 mb-2"></div>
            <div className="h-2 bg-gray-300 rounded w-full"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const getHealthColor = (score: number) => {
    if (score >= 90) return "text-green-400";
    if (score >= 70) return "text-blue-400";
    if (score >= 50) return "text-yellow-400";
    return "text-red-400";
  };

  const getHealthStatus = (score: number) => {
    if (score >= 90) return { text: "Excellent", color: "bg-green-900/50 text-green-400 border-green-700" };
    if (score >= 70) return { text: "Good", color: "bg-blue-900/50 text-blue-400 border-blue-700" };
    if (score >= 50) return { text: "Fair", color: "bg-yellow-900/50 text-yellow-400 border-yellow-700" };
    return { text: "Needs Attention", color: "bg-red-900/50 text-red-400 border-red-700" };
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "excellent":
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case "good":
        return <Shield className="w-4 h-4 text-blue-400" />;
      case "fair":
        return <AlertTriangle className="w-4 h-4 text-yellow-400" />;
      case "poor":
        return <XCircle className="w-4 h-4 text-red-400" />;
      default:
        return <Shield className="w-4 h-4 text-gray-400" />;
    }
  };

  const overallScore = healthData?.overallHealthScore || 0;
  const riskAdjustedScore = healthData?.riskAdjustedHealthScore || 0;
  const maturityScore = healthData?.maturityScore || 0;
  const trendScore = healthData?.trendScore || 0;
  const healthStatus = getHealthStatus(riskAdjustedScore); // Use risk-adjusted score for status

  const getTrendColor = (trend: number) => {
    if (trend > 5) return "text-green-400";
    if (trend < -5) return "text-red-400";
    return "text-yellow-400";
  };

  const getTrendIcon = (trend: number) => {
    if (trend > 5) return "↗";
    if (trend < -5) return "↘";
    return "→";
  };

  return (
    <div className="space-y-6">
      {/* Overall Compliance Health */}
      <Card className="holographic-card border border-blue-500/30 chart-glow" data-testid="card-compliance-health">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-blue-400" />
              </div>
              <span className="text-sm text-gray-400 tech-font">ADVANCED COMPLIANCE METRICS</span>
            </div>
            <Badge className={healthStatus.color} data-testid="badge-health-status">
              {healthStatus.text}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Advanced Score Dashboard */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-background/50 rounded-lg">
              <div className={`text-2xl font-bold mb-1 geometric-text ${getHealthColor(overallScore)}`} data-testid="text-overall-score">
                {overallScore}%
              </div>
              <div className="text-xs text-gray-400">Base Score</div>
            </div>
            <div className="text-center p-3 bg-background/50 rounded-lg">
              <div className={`text-2xl font-bold mb-1 geometric-text ${getHealthColor(riskAdjustedScore)}`} data-testid="text-risk-adjusted-score">
                {riskAdjustedScore}%
              </div>
              <div className="text-xs text-gray-400">Risk-Adjusted</div>
            </div>
            <div className="text-center p-3 bg-background/50 rounded-lg">
              <div className={`text-2xl font-bold mb-1 geometric-text ${getHealthColor(maturityScore)}`} data-testid="text-maturity-score">
                {maturityScore}%
              </div>
              <div className="text-xs text-gray-400">Maturity Level</div>
            </div>
            <div className="text-center p-3 bg-background/50 rounded-lg">
              <div className={`text-2xl font-bold mb-1 geometric-text ${getTrendColor(trendScore)}`} data-testid="text-trend-score">
                {getTrendIcon(trendScore)} {trendScore > 0 ? '+' : ''}{trendScore}
              </div>
              <div className="text-xs text-gray-400">Trend Score</div>
            </div>
          </div>

          {/* Primary Risk-Adjusted Score Display */}
          <div className="text-center">
            <div className="text-xs text-gray-400 mb-2">PRIMARY COMPLIANCE SCORE</div>
            <Progress 
              value={riskAdjustedScore} 
              className="h-4 bg-gray-700 mb-2" 
              data-testid="progress-compliance-health"
            />
            <div className="text-sm text-gray-300">
              Risk-weighted assessment across all frameworks
            </div>
          </div>

          {/* Industry Comparison */}
          {healthData?.industryComparison && (
            <div className="grid grid-cols-3 gap-3 p-4 bg-purple-900/20 rounded-lg border border-purple-500/30">
              <div className="text-center">
                <div className="text-lg font-bold text-purple-400">
                  {healthData.industryComparison.performancePercentile}th
                </div>
                <div className="text-xs text-gray-400">Percentile</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-blue-400">
                  {healthData.industryComparison.averageIndustryScore}%
                </div>
                <div className="text-xs text-gray-400">Industry Avg</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-orange-400">
                  {healthData.industryComparison.bestPracticeGap}
                </div>
                <div className="text-xs text-gray-400">Best Practice Gap</div>
              </div>
            </div>
          )}

          {/* Health Distribution */}
          {healthData?.complianceDistribution && (
            <div className="grid grid-cols-4 gap-2 text-center text-xs">
              <div>
                <div className="text-green-400 font-bold text-lg" data-testid="count-excellent">
                  {healthData.complianceDistribution.excellent}
                </div>
                <div className="text-gray-400">Excellent</div>
              </div>
              <div>
                <div className="text-blue-400 font-bold text-lg" data-testid="count-good">
                  {healthData.complianceDistribution.good}
                </div>
                <div className="text-gray-400">Good</div>
              </div>
              <div>
                <div className="text-yellow-400 font-bold text-lg" data-testid="count-fair">
                  {healthData.complianceDistribution.fair}
                </div>
                <div className="text-gray-400">Fair</div>
              </div>
              <div>
                <div className="text-red-400 font-bold text-lg" data-testid="count-poor">
                  {healthData.complianceDistribution.poor}
                </div>
                <div className="text-gray-400">Poor</div>
              </div>
            </div>
          )}

          {/* Critical Issues */}
          {healthData?.criticalGaps && healthData.criticalGaps > 0 && (
            <div className="flex items-center justify-between p-3 bg-red-900/20 rounded-lg border border-red-500/30">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4 text-red-400" />
                <span className="text-sm text-red-400 font-medium">Critical Issues</span>
              </div>
              <Badge className="bg-red-900/50 text-red-400 border-red-700" data-testid="badge-critical-gaps">
                {healthData?.criticalGaps || 0}
              </Badge>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Framework Details */}
      <Card className="holographic-card border border-purple-500/30" data-testid="card-framework-scores">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-purple-400" />
            <span className="text-sm text-gray-400 tech-font">FRAMEWORK SCORES</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {healthData?.frameworkScores?.map((framework) => (
              <div 
                key={framework.frameworkId} 
                className="flex items-center justify-between p-3 bg-background/50 rounded-lg"
                data-testid={`framework-${framework.frameworkId}`}
              >
                <div className="flex items-center space-x-3">
                  {getStatusIcon(framework.status)}
                  <div className="flex-1">
                    <div className="text-sm text-white font-medium">{framework.name}</div>
                    <div className="flex items-center space-x-2 text-xs text-gray-400">
                      <Clock className="w-3 h-3" />
                      <span>
                        {framework.lastAssessed 
                          ? `Assessed ${new Date(framework.lastAssessed).toLocaleDateString()}`
                          : "Not assessed"
                        }
                      </span>
                    </div>
                    {/* Advanced Metrics Row */}
                    <div className="grid grid-cols-4 gap-2 mt-2 text-xs">
                      <div className="text-center p-1 bg-gray-800/50 rounded">
                        <div className={`font-bold ${getHealthColor(framework.score)}`}>{framework.score}%</div>
                        <div className="text-gray-500 text-[10px]">Base</div>
                      </div>
                      <div className="text-center p-1 bg-gray-800/50 rounded">
                        <div className={`font-bold ${getHealthColor(framework.riskAdjustedScore)}`}>{framework.riskAdjustedScore}%</div>
                        <div className="text-gray-500 text-[10px]">Risk-Adj</div>
                      </div>
                      <div className="text-center p-1 bg-gray-800/50 rounded">
                        <div className={`font-bold ${getHealthColor(framework.maturityScore)}`}>{framework.maturityScore}%</div>
                        <div className="text-gray-500 text-[10px]">Maturity</div>
                      </div>
                      <div className="text-center p-1 bg-gray-800/50 rounded">
                        <div className={`font-bold ${getTrendColor(framework.trendScore)}`}>
                          {getTrendIcon(framework.trendScore)}{framework.trendScore > 0 ? '+' : ''}{framework.trendScore}
                        </div>
                        <div className="text-gray-500 text-[10px]">Trend</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-lg font-bold ${getHealthColor(framework.riskAdjustedScore)}`} data-testid={`score-${framework.frameworkId}`}>
                    {framework.riskAdjustedScore}%
                  </div>
                  <div className="text-xs text-gray-400 mb-1">Risk-Adjusted</div>
                  <Badge 
                    className={getHealthStatus(framework.riskAdjustedScore).color} 
                    data-testid={`status-${framework.frameworkId}`}
                  >
                    {framework.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}