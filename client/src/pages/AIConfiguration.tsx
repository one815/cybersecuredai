import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Brain, 
  Settings, 
  Target, 
  BarChart3,
  Zap,
  Shield,
  Eye,
  Activity,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Play,
  Pause,
  RotateCcw,
  Save,
  Upload,
  Download,
  Cpu,
  Database,
  Clock,
  Users
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AIModel {
  id: string;
  name: string;
  type: string;
  status: "active" | "training" | "inactive";
  accuracy: number;
  lastTrained: Date;
  version: string;
  description: string;
}

interface ModelMetrics {
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  falsePositiveRate: number;
  processingTime: number;
}

interface ThreatRule {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  severity: "low" | "medium" | "high" | "critical";
  conditions: any;
  actions: string[];
  lastModified: Date;
}

export default function AIConfiguration() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedModel, setSelectedModel] = useState<string>("threat-detection");
  const [isTraining, setIsTraining] = useState(false);

  // Mock AI models data
  const aiModels: AIModel[] = [
    {
      id: "threat-detection",
      name: "Threat Detection Model",
      type: "Neural Network",
      status: "active",
      accuracy: 94.7,
      lastTrained: new Date(Date.now() - 86400000 * 2),
      version: "v2.1.3",
      description: "Deep learning model for real-time threat classification and anomaly detection"
    },
    {
      id: "behavioral-analysis",
      name: "Behavioral Analysis Model",
      type: "Random Forest",
      status: "active",
      accuracy: 89.2,
      lastTrained: new Date(Date.now() - 86400000 * 5),
      version: "v1.8.1",
      description: "Machine learning model for user behavior analysis and insider threat detection"
    },
    {
      id: "phishing-detection",
      name: "Phishing Detection Model",
      type: "Ensemble",
      status: "training",
      accuracy: 96.8,
      lastTrained: new Date(Date.now() - 86400000 * 1),
      version: "v1.4.2",
      description: "Advanced ensemble model for email and URL phishing detection"
    },
    {
      id: "malware-classifier",
      name: "Malware Classifier",
      type: "CNN",
      status: "active",
      accuracy: 98.1,
      lastTrained: new Date(Date.now() - 86400000 * 3),
      version: "v3.0.1",
      description: "Convolutional neural network for malware signature and behavior classification"
    }
  ];

  // Mock model metrics
  const modelMetrics: Record<string, ModelMetrics> = {
    "threat-detection": {
      accuracy: 94.7,
      precision: 92.3,
      recall: 89.1,
      f1Score: 90.7,
      falsePositiveRate: 2.1,
      processingTime: 12
    },
    "behavioral-analysis": {
      accuracy: 89.2,
      precision: 87.8,
      recall: 85.4,
      f1Score: 86.6,
      falsePositiveRate: 3.8,
      processingTime: 8
    },
    "phishing-detection": {
      accuracy: 96.8,
      precision: 95.2,
      recall: 94.1,
      f1Score: 94.6,
      falsePositiveRate: 1.7,
      processingTime: 15
    },
    "malware-classifier": {
      accuracy: 98.1,
      precision: 97.9,
      recall: 96.8,
      f1Score: 97.3,
      falsePositiveRate: 0.9,
      processingTime: 18
    }
  };

  // Mock threat rules
  const threatRules: ThreatRule[] = [
    {
      id: "rule-1",
      name: "Multiple Failed Login Attempts",
      description: "Detect suspicious login patterns with multiple failed attempts",
      enabled: true,
      severity: "high",
      conditions: { failedAttempts: 5, timeWindow: 300 },
      actions: ["alert", "block_ip", "notify_admin"],
      lastModified: new Date(Date.now() - 86400000)
    },
    {
      id: "rule-2",
      name: "Unusual Data Access Patterns",
      description: "Identify abnormal data access behavior from internal users",
      enabled: true,
      severity: "medium",
      conditions: { accessVolume: "anomalous", userBehavior: "deviation" },
      actions: ["alert", "monitor"],
      lastModified: new Date(Date.now() - 86400000 * 3)
    },
    {
      id: "rule-3",
      name: "Suspicious Network Traffic",
      description: "Detect malicious network communication patterns",
      enabled: false,
      severity: "critical",
      conditions: { trafficType: "encrypted_tunnel", destination: "suspicious" },
      actions: ["alert", "block_traffic", "isolate_system"],
      lastModified: new Date(Date.now() - 86400000 * 7)
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-500 text-white";
      case "training": return "bg-orange-500 text-white";
      case "inactive": return "bg-gray-500 text-white";
      default: return "bg-gray-500 text-white";
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical": return "bg-red-500 text-white";
      case "high": return "bg-orange-500 text-white";
      case "medium": return "bg-yellow-500 text-black";
      case "low": return "bg-green-500 text-white";
      default: return "bg-gray-500 text-white";
    }
  };

  const startTraining = () => {
    setIsTraining(true);
    toast({
      title: "Training Started",
      description: "AI model training has been initiated. This may take several hours.",
    });
    
    // Simulate training completion
    setTimeout(() => {
      setIsTraining(false);
      toast({
        title: "Training Complete",
        description: "AI model has been successfully retrained with improved accuracy.",
      });
    }, 5000);
  };

  return (
    <div>
      {/* Header */}
      <header className="bg-surface border-b border-surface-light p-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">AI Configuration</h2>
            <p className="text-gray-400">Configure and monitor AI-powered security models</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button 
              onClick={startTraining}
              disabled={isTraining}
              className="bg-interactive hover:bg-orange-600" 
              data-testid="start-training"
            >
              {isTraining ? (
                <>
                  <RotateCcw className="w-4 h-4 mr-2 animate-spin" />
                  Training...
                </>
              ) : (
                <>
                  <Brain className="w-4 h-4 mr-2" />
                  Train Models
                </>
              )}
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        <Tabs defaultValue="models" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="models">ML Models</TabsTrigger>
            <TabsTrigger value="thresholds">Thresholds</TabsTrigger>
            <TabsTrigger value="rules">Custom Rules</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
          </TabsList>

          {/* ML Models Tab */}
          <TabsContent value="models" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Models List */}
              <div className="lg:col-span-1">
                <Card className="bg-surface border-surface-light">
                  <CardHeader>
                    <CardTitle>AI Models</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {aiModels.map((model) => (
                      <div
                        key={model.id}
                        className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                          selectedModel === model.id 
                            ? "border-interactive bg-interactive/10" 
                            : "border-surface-light hover:border-interactive/50"
                        }`}
                        onClick={() => setSelectedModel(model.id)}
                        data-testid={`model-${model.id}`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-sm">{model.name}</h4>
                          <Badge className={getStatusColor(model.status)}>
                            {model.status.toUpperCase()}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between text-xs text-gray-400">
                          <span>{model.type}</span>
                          <span>{model.accuracy}% accuracy</span>
                        </div>
                        <div className="mt-2">
                          <Progress value={model.accuracy} className="h-1" />
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Model Details */}
              <div className="lg:col-span-2 space-y-4">
                {(() => {
                  const model = aiModels.find(m => m.id === selectedModel);
                  const metrics = modelMetrics[selectedModel];
                  
                  if (!model) return null;

                  return (
                    <>
                      <Card className="bg-surface border-surface-light">
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <CardTitle>{model.name}</CardTitle>
                            <div className="flex items-center space-x-2">
                              <Badge className={getStatusColor(model.status)}>
                                {model.status.toUpperCase()}
                              </Badge>
                              <Badge variant="outline" className="text-interactive border-interactive">
                                {model.version}
                              </Badge>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <p className="text-gray-400">{model.description}</p>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Model Type</label>
                              <p className="text-gray-400">{model.type}</p>
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Last Trained</label>
                              <p className="text-gray-400">{model.lastTrained.toLocaleDateString()}</p>
                            </div>
                          </div>

                          <div className="flex space-x-3">
                            <Button
                              variant="outline"
                              className="flex-1"
                              disabled={model.status === "training" || isTraining}
                              data-testid="retrain-model"
                            >
                              <RotateCcw className="w-4 h-4 mr-2" />
                              Retrain
                            </Button>
                            <Button
                              variant="outline"
                              className="flex-1"
                              data-testid="export-model"
                            >
                              <Download className="w-4 h-4 mr-2" />
                              Export
                            </Button>
                            <Button
                              variant="outline"
                              className="flex-1"
                              data-testid="import-model"
                            >
                              <Upload className="w-4 h-4 mr-2" />
                              Import
                            </Button>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Model Metrics */}
                      {metrics && (
                        <Card className="bg-surface border-surface-light">
                          <CardHeader>
                            <CardTitle>Model Performance Metrics</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                              <div className="text-center">
                                <div className="text-2xl font-bold text-green-400">{metrics.accuracy}%</div>
                                <div className="text-sm text-gray-400">Accuracy</div>
                              </div>
                              <div className="text-center">
                                <div className="text-2xl font-bold text-blue-400">{metrics.precision}%</div>
                                <div className="text-sm text-gray-400">Precision</div>
                              </div>
                              <div className="text-center">
                                <div className="text-2xl font-bold text-purple-400">{metrics.recall}%</div>
                                <div className="text-sm text-gray-400">Recall</div>
                              </div>
                              <div className="text-center">
                                <div className="text-2xl font-bold text-orange-400">{metrics.f1Score}%</div>
                                <div className="text-sm text-gray-400">F1 Score</div>
                              </div>
                              <div className="text-center">
                                <div className="text-2xl font-bold text-red-400">{metrics.falsePositiveRate}%</div>
                                <div className="text-sm text-gray-400">False Positive Rate</div>
                              </div>
                              <div className="text-center">
                                <div className="text-2xl font-bold text-yellow-400">{metrics.processingTime}ms</div>
                                <div className="text-sm text-gray-400">Processing Time</div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      )}
                    </>
                  );
                })()}
              </div>
            </div>
          </TabsContent>

          {/* Thresholds Tab */}
          <TabsContent value="thresholds" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-surface border-surface-light">
                <CardHeader>
                  <CardTitle>Detection Sensitivity</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Threat Detection Threshold</label>
                      <Slider
                        value={[75]}
                        onValueChange={() => {}}
                        max={100}
                        step={1}
                        className="w-full"
                        data-testid="threat-threshold"
                      />
                      <div className="flex justify-between text-xs text-gray-400 mt-1">
                        <span>Low Sensitivity</span>
                        <span>75%</span>
                        <span>High Sensitivity</span>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Anomaly Detection Sensitivity</label>
                      <Slider
                        value={[60]}
                        onValueChange={() => {}}
                        max={100}
                        step={1}
                        className="w-full"
                        data-testid="anomaly-threshold"
                      />
                      <div className="flex justify-between text-xs text-gray-400 mt-1">
                        <span>Conservative</span>
                        <span>60%</span>
                        <span>Aggressive</span>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Behavioral Analysis Threshold</label>
                      <Slider
                        value={[85]}
                        onValueChange={() => {}}
                        max={100}
                        step={1}
                        className="w-full"
                        data-testid="behavioral-threshold"
                      />
                      <div className="flex justify-between text-xs text-gray-400 mt-1">
                        <span>Permissive</span>
                        <span>85%</span>
                        <span>Strict</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-surface border-surface-light">
                <CardHeader>
                  <CardTitle>Response Configuration</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Auto-Block Threats</h4>
                      <p className="text-sm text-gray-400">Automatically block detected threats</p>
                    </div>
                    <Switch defaultChecked data-testid="auto-block" />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Real-time Alerts</h4>
                      <p className="text-sm text-gray-400">Send immediate notifications</p>
                    </div>
                    <Switch defaultChecked data-testid="real-time-alerts" />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Learning Mode</h4>
                      <p className="text-sm text-gray-400">Continuous model improvement</p>
                    </div>
                    <Switch defaultChecked data-testid="learning-mode" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Alert Frequency</label>
                    <Select defaultValue="immediate">
                      <SelectTrigger data-testid="alert-frequency">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="immediate">Immediate</SelectItem>
                        <SelectItem value="5min">Every 5 minutes</SelectItem>
                        <SelectItem value="15min">Every 15 minutes</SelectItem>
                        <SelectItem value="1hour">Hourly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Custom Rules Tab */}
          <TabsContent value="rules" className="space-y-6">
            <Card className="bg-surface border-surface-light">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Threat Detection Rules</CardTitle>
                  <Button className="bg-interactive hover:bg-orange-600" data-testid="create-rule">
                    <Zap className="w-4 h-4 mr-2" />
                    Create Rule
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {threatRules.map((rule) => (
                    <div key={rule.id} className="p-4 bg-background rounded-lg border border-surface-light">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <Switch checked={rule.enabled} data-testid={`rule-toggle-${rule.id}`} />
                          <div>
                            <h4 className="font-semibold text-white">{rule.name}</h4>
                            <p className="text-sm text-gray-400">{rule.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={getSeverityColor(rule.severity)}>
                            {rule.severity.toUpperCase()}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-4 text-gray-400">
                          <span>Actions: {rule.actions.length}</span>
                          <span>Modified: {rule.lastModified.toLocaleDateString()}</span>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline" data-testid={`edit-rule-${rule.id}`}>
                            <Settings className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline" data-testid={`delete-rule-${rule.id}`}>
                            <AlertTriangle className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Performance Tab */}
          <TabsContent value="performance" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-surface border-surface-light">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Cpu className="w-5 h-5 text-blue-400" />
                    <span>Processing Power</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">CPU Usage</span>
                    <span className="text-green-400">45%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">GPU Usage</span>
                    <span className="text-orange-400">78%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Memory</span>
                    <span className="text-green-400">6.2GB / 16GB</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Queue Size</span>
                    <span className="text-blue-400">23 tasks</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-surface border-surface-light">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-purple-400" />
                    <span>Processing Times</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Avg Response</span>
                    <span className="text-green-400">12ms</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">P95 Response</span>
                    <span className="text-orange-400">45ms</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Batch Processing</span>
                    <span className="text-green-400">2.3s</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Model Loading</span>
                    <span className="text-blue-400">890ms</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-surface border-surface-light">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Activity className="w-5 h-5 text-green-400" />
                    <span>Model Activity</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Predictions/hr</span>
                    <span className="text-green-400">12,847</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Threats Detected</span>
                    <span className="text-red-400">15</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">False Positives</span>
                    <span className="text-orange-400">3</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Accuracy</span>
                    <span className="text-green-400">94.7%</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Training History */}
            <Card className="bg-surface border-surface-light">
              <CardHeader>
                <CardTitle>Training History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    {
                      id: "1",
                      model: "Threat Detection Model",
                      date: new Date(Date.now() - 86400000 * 2),
                      duration: "4h 23m",
                      accuracy: 94.7,
                      status: "completed"
                    },
                    {
                      id: "2", 
                      model: "Behavioral Analysis Model",
                      date: new Date(Date.now() - 86400000 * 5),
                      duration: "2h 15m",
                      accuracy: 89.2,
                      status: "completed"
                    },
                    {
                      id: "3",
                      model: "Phishing Detection Model", 
                      date: new Date(Date.now() - 86400000 * 1),
                      duration: "6h 45m",
                      accuracy: 96.8,
                      status: "training"
                    }
                  ].map((training) => (
                    <div key={training.id} className="flex items-center justify-between p-3 bg-background rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-interactive/20 rounded-lg flex items-center justify-center">
                          <Brain className="w-4 h-4 text-interactive" />
                        </div>
                        <div>
                          <p className="font-medium text-white">{training.model}</p>
                          <p className="text-xs text-gray-400">{training.date.toLocaleString()}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 text-sm">
                        <span className="text-gray-400">{training.duration}</span>
                        <span className="text-green-400">{training.accuracy}%</span>
                        <Badge className={training.status === "completed" ? getStatusColor("active") : getStatusColor("training")}>
                          {training.status.toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}