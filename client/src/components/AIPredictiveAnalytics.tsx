import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Brain, 
  TrendingUp, 
  TrendingDown,
  AlertTriangle, 
  Target,
  Zap,
  Activity,
  BarChart3,
  RefreshCw
} from "lucide-react";
// Dynamic recharts imports to reduce bundle size
type RechartsComponents = {
  LineChart: any;
  Line: any;
  XAxis: any;
  YAxis: any;
  CartesianGrid: any;
  Tooltip: any;
  ResponsiveContainer: any;
  AreaChart: any;
  Area: any;
};

let rechartsComponents: RechartsComponents | null = null;
let rechartsPromise: Promise<RechartsComponents> | null = null;

const loadRechartsComponents = async (): Promise<RechartsComponents> => {
  if (rechartsComponents) return rechartsComponents;
  if (rechartsPromise) return rechartsPromise;
  
  rechartsPromise = import("recharts").then(module => {
    rechartsComponents = {
      LineChart: module.LineChart,
      Line: module.Line,
      XAxis: module.XAxis,
      YAxis: module.YAxis,
      CartesianGrid: module.CartesianGrid,
      Tooltip: module.Tooltip,
      ResponsiveContainer: module.ResponsiveContainer,
      AreaChart: module.AreaChart,
      Area: module.Area
    };
    return rechartsComponents!;
  }).catch(error => {
    console.error('Failed to load recharts:', error);
    throw error;
  });
  
  return rechartsPromise;
};

interface PredictionData {
  timestamp: string;
  confidence: number;
  riskScore: number;
  threatType: string;
  prediction: string;
  likelihood: number;
}

interface AlertThreshold {
  type: string;
  threshold: number;
  current: number;
  trend: "up" | "down" | "stable";
}

export function AIPredictiveAnalytics() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("24h");
  const [refreshing, setRefreshing] = useState(false);
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

  // Fetch AI prediction data
  const { data: predictiveData, refetch, isLoading } = useQuery<{
    predictions: PredictionData[];
    thresholds: AlertThreshold[];
    models: {
      name: string;
      accuracy: number;
      lastTrained: string;
      status: "active" | "training" | "error";
    }[];
  }>({
    queryKey: ["/api/ai/predictions", selectedTimeframe],
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  const { data: vulnerabilityPrediction } = useQuery({
    queryKey: ["/api/vulnerability-prediction/trends"],
    refetchInterval: 60000, // Refresh every minute
  });

  const handleRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setTimeout(() => setRefreshing(false), 1000);
  };

  // Generate time-series data for prediction visualization
  const generatePredictionChart = () => {
    if (!predictiveData?.predictions) return [];
    
    return predictiveData.predictions.map((pred, index) => ({
      time: new Date(pred.timestamp).toLocaleTimeString(),
      confidence: pred.confidence,
      riskScore: pred.riskScore,
      likelihood: pred.likelihood,
    }));
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return "text-green-400";
    if (confidence >= 60) return "text-yellow-400";
    return "text-red-400";
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up": return <TrendingUp className="w-4 h-4 text-red-400" />;
      case "down": return <TrendingDown className="w-4 h-4 text-green-400" />;
      default: return <Activity className="w-4 h-4 text-gray-400" />;
    }
  };

  if (isLoading) {
    return (
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Brain className="w-5 h-5 mr-2" />
            AI Predictive Analytics Hub
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Show error if recharts failed to load
  if (rechartsError) {
    return (
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Brain className="w-5 h-5 mr-2" />
            AI Predictive Analytics Hub
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-64 text-red-400">
            Failed to load charts: {rechartsError}
          </div>
        </CardContent>
      </Card>
    );
  }

  // Show loading if recharts is not loaded yet
  if (!isRechartsLoaded || !rechartsComponents) {
    return (
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Brain className="w-5 h-5 mr-2" />
            AI Predictive Analytics Hub
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400"></div>
            <span className="ml-3 text-gray-400">Loading charts...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Destructure loaded components
  const { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Line } = rechartsComponents;

  return (
    <Card className="holographic-card border-purple-500/30 backdrop-blur-xl floating-3d">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-purple-300 flex items-center font-bold tracking-wide">
            <Brain className="w-5 h-5 mr-2 text-purple-400 animate-pulse" />
            AI PREDICTIVE ANALYTICS HUB
            <Badge className="ml-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white animate-pulse">ML-POWERED</Badge>
          </CardTitle>
          
          <div className="flex items-center space-x-2">
            <select
              value={selectedTimeframe}
              onChange={(e) => setSelectedTimeframe(e.target.value)}
              className="bg-gray-700 text-white border border-gray-600 rounded px-2 py-1 text-sm"
            >
              <option value="1h">1 Hour</option>
              <option value="24h">24 Hours</option>
              <option value="7d">7 Days</option>
              <option value="30d">30 Days</option>
            </select>
            
            <Button
              size="sm"
              variant="outline"
              onClick={handleRefresh}
              disabled={refreshing}
              className="border-gray-600"
            >
              <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <Tabs defaultValue="predictions" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-gray-700">
            <TabsTrigger value="predictions" className="data-[state=active]:bg-blue-600">
              Predictions
            </TabsTrigger>
            <TabsTrigger value="thresholds" className="data-[state=active]:bg-blue-600">
              Alert Thresholds
            </TabsTrigger>
            <TabsTrigger value="models" className="data-[state=active]:bg-blue-600">
              ML Models
            </TabsTrigger>
          </TabsList>
          
          {/* Predictions Tab */}
          <TabsContent value="predictions" className="space-y-4">
            {/* Prediction Timeline Chart */}
            <div className="bg-gray-900 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-medium">Threat Prediction Timeline</h3>
                <Badge className="bg-blue-600 text-white">Real-time</Badge>
              </div>
              
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={generatePredictionChart()}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="time" stroke="#9ca3af" fontSize={10} />
                    <YAxis stroke="#9ca3af" fontSize={10} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1f2937', 
                        border: '1px solid #4b5563',
                        borderRadius: '6px',
                        color: '#fff'
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="confidence" 
                      stroke="#3b82f6" 
                      strokeWidth={2}
                      name="Confidence %"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="riskScore" 
                      stroke="#ef4444" 
                      strokeWidth={2}
                      name="Risk Score"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            {/* Active Predictions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {predictiveData?.predictions?.slice(0, 4).map((prediction, index) => (
                <div key={index} className="bg-gray-900 rounded-lg p-4 border border-gray-700">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Target className="w-4 h-4 text-blue-400" />
                      <span className="text-sm font-medium text-blue-400">{prediction.threatType}</span>
                    </div>
                    <Badge className={`${getConfidenceColor(prediction.confidence)}`}>
                      {prediction.confidence}% confidence
                    </Badge>
                  </div>
                  
                  <p className="text-white text-sm mb-3">{prediction.prediction}</p>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-400">Likelihood:</span>
                      <span className="text-white">{prediction.likelihood}%</span>
                    </div>
                    <Progress value={prediction.likelihood} className="h-1" />
                    
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-400">Risk Score:</span>
                      <span className={`font-bold ${prediction.riskScore > 70 ? 'text-red-400' : prediction.riskScore > 40 ? 'text-yellow-400' : 'text-green-400'}`}>
                        {prediction.riskScore}/100
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          {/* Alert Thresholds Tab */}
          <TabsContent value="thresholds" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {predictiveData?.thresholds?.map((threshold, index) => (
                <div key={index} className="bg-gray-900 rounded-lg p-4 border border-gray-700">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="w-4 h-4 text-yellow-400" />
                      <span className="text-white font-medium">{threshold.type}</span>
                    </div>
                    {getTrendIcon(threshold.trend)}
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Current Value:</span>
                      <span className="text-white font-bold">{threshold.current}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-400">Threshold:</span>
                      <span className="text-red-400 font-bold">{threshold.threshold}</span>
                    </div>
                    
                    <Progress 
                      value={(threshold.current / threshold.threshold) * 100} 
                      className="h-2"
                    />
                    
                    <div className="text-xs text-center">
                      {threshold.current >= threshold.threshold ? (
                        <span className="text-red-400 font-bold">⚠️ THRESHOLD EXCEEDED</span>
                      ) : (
                        <span className="text-green-400">Within normal range</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          {/* ML Models Tab */}
          <TabsContent value="models" className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              {predictiveData?.models?.map((model, index) => (
                <div key={index} className="bg-gray-900 rounded-lg p-4 border border-gray-700">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <BarChart3 className="w-5 h-5 text-purple-400" />
                      <div>
                        <h3 className="text-white font-medium">{model.name}</h3>
                        <p className="text-xs text-gray-400">Last trained: {new Date(model.lastTrained).toLocaleString()}</p>
                      </div>
                    </div>
                    
                    <Badge className={`${
                      model.status === "active" ? "bg-green-600" :
                      model.status === "training" ? "bg-yellow-600" : "bg-red-600"
                    } text-white`}>
                      {model.status}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-gray-400 text-sm">Accuracy:</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={model.accuracy} className="h-2 flex-1" />
                        <span className="text-white font-bold text-sm">{model.accuracy}%</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="border-purple-600 text-purple-400 hover:bg-purple-600 hover:text-white"
                      >
                        <Zap className="w-3 h-3 mr-1" />
                        Retrain
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}