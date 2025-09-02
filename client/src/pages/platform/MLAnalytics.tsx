import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { 
  Brain, 
  Target, 
  FileText, 
  Activity, 
  TrendingUp, 
  BarChart3, 
  Zap, 
  CheckCircle, 
  AlertTriangle, 
  Clock, 
  Cpu, 
  Database,
  Bot,
  Shield,
  Eye
} from "lucide-react";

interface MLPrediction {
  prediction: string;
  confidence: number;
  threat_type?: string;
  severity?: string;
  recommendations?: string[];
  model_version: string;
  inference_time_ms: number;
}

interface ModelStatus {
  endpoint_name: string;
  status: string;
  instance_type: string;
  instance_count: number;
  model_version: string;
  last_updated: string;
}

export default function MLAnalytics() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState("threat-detection");
  const [predictionResults, setPredictionResults] = useState<MLPrediction | null>(null);

  // Form states for different ML models
  const [threatData, setThreatData] = useState({
    source_ip: "",
    destination_ip: "",
    port: "",
    protocol: "HTTPS",
    packet_size: "",
    connection_duration: "",
    data_volume: "",
    features: "",
    metadata: JSON.stringify({ timestamp: new Date().toISOString(), source: "manual_input" }, null, 2)
  });

  const [behavioralData, setBehavioralData] = useState({
    user_id: "",
    login_time: new Date().toISOString(),
    login_location: "",
    device_fingerprint: "",
    session_duration: "",
    avg_session_duration: "",
    typical_locations: "",
    usual_access_times: ""
  });

  const [documentData, setDocumentData] = useState({
    file_name: "",
    file_type: "pdf",
    file_size: "",
    organization_type: "educational",
    compliance_frameworks: "FERPA,FISMA"
  });

  const [anomalyData, setAnomalyData] = useState({
    cpu_usage: "",
    memory_usage: "",
    network_io: "",
    disk_io: "",
    active_connections: "",
    failed_logins: "",
    error_rate: "",
    time_window: "5_minutes",
    baseline_period: "24_hours"
  });

  // Fetch model status
  const { data: modelStatus, isLoading: statusLoading } = useQuery<ModelStatus[]>({
    queryKey: ['/api/ml/models/status'],
    refetchInterval: 30000,
  });

  const { data: serviceStatus } = useQuery({
    queryKey: ['/api/ml/service/status'],
    refetchInterval: 60000,
  });

  // ML prediction mutations
  const threatDetectionMutation = useMutation({
    mutationFn: (data: any) => apiRequest('/api/ml/threat-detection/predict', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
    onSuccess: (result) => {
      setPredictionResults(result);
      toast({
        title: "Threat Analysis Complete",
        description: `Prediction: ${result.prediction} (${(result.confidence * 100).toFixed(1)}% confidence)`,
      });
    },
    onError: () => {
      toast({
        title: "Analysis Failed",
        description: "Failed to analyze threat data. Please check your inputs.",
        variant: "destructive",
      });
    },
  });

  const behavioralAnalysisMutation = useMutation({
    mutationFn: (data: any) => apiRequest('/api/ml/behavioral-analysis/predict', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
    onSuccess: (result) => {
      setPredictionResults(result);
      toast({
        title: "Behavioral Analysis Complete",
        description: `Risk Level: ${result.risk_level} (Anomaly Score: ${(result.anomaly_score * 100).toFixed(1)}%)`,
      });
    },
  });

  const documentClassificationMutation = useMutation({
    mutationFn: (data: any) => apiRequest('/api/ml/document-classification/predict', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
    onSuccess: (result) => {
      setPredictionResults(result);
      toast({
        title: "Document Classification Complete",
        description: `Classification: ${result.classification} (${(result.confidence * 100).toFixed(1)}% confidence)`,
      });
    },
  });

  const anomalyDetectionMutation = useMutation({
    mutationFn: (data: any) => apiRequest('/api/ml/anomaly-detection/predict', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
    onSuccess: (result) => {
      setPredictionResults(result);
      toast({
        title: "Anomaly Detection Complete",
        description: `${result.anomaly_detected ? 'Anomaly Detected' : 'Normal Activity'} (Score: ${(result.anomaly_score * 100).toFixed(1)}%)`,
      });
    },
  });

  const handleThreatDetection = () => {
    const features = threatData.features.split(',').map(f => parseFloat(f.trim())).filter(f => !isNaN(f));
    
    const payload = {
      network_traffic: {
        source_ip: threatData.source_ip,
        destination_ip: threatData.destination_ip,
        port: parseInt(threatData.port),
        protocol: threatData.protocol,
        packet_size: parseInt(threatData.packet_size),
        connection_duration: parseFloat(threatData.connection_duration),
        data_volume: parseInt(threatData.data_volume)
      },
      features,
      metadata: JSON.parse(threatData.metadata)
    };

    threatDetectionMutation.mutate(payload);
  };

  const handleBehavioralAnalysis = () => {
    const payload = {
      user_behavior: {
        user_id: behavioralData.user_id,
        login_time: behavioralData.login_time,
        login_location: behavioralData.login_location,
        device_fingerprint: behavioralData.device_fingerprint,
        session_duration: parseInt(behavioralData.session_duration)
      },
      historical_baseline: {
        avg_session_duration: parseInt(behavioralData.avg_session_duration),
        typical_locations: behavioralData.typical_locations.split(',').map(l => l.trim()),
        usual_access_times: behavioralData.usual_access_times.split(',').map(t => t.trim())
      }
    };

    behavioralAnalysisMutation.mutate(payload);
  };

  const handleDocumentClassification = () => {
    const payload = {
      document: {
        content: "Base64EncodedDocumentContent", // Placeholder
        file_type: documentData.file_type,
        file_size: parseInt(documentData.file_size),
        file_name: documentData.file_name
      },
      classification_context: {
        organization_type: documentData.organization_type,
        compliance_frameworks: documentData.compliance_frameworks.split(',').map(f => f.trim())
      }
    };

    documentClassificationMutation.mutate(payload);
  };

  const handleAnomalyDetection = () => {
    const payload = {
      system_metrics: {
        cpu_usage: parseFloat(anomalyData.cpu_usage),
        memory_usage: parseFloat(anomalyData.memory_usage),
        network_io: parseInt(anomalyData.network_io),
        disk_io: parseInt(anomalyData.disk_io),
        active_connections: parseInt(anomalyData.active_connections),
        failed_logins: parseInt(anomalyData.failed_logins),
        error_rate: parseFloat(anomalyData.error_rate)
      },
      time_window: anomalyData.time_window,
      baseline_period: anomalyData.baseline_period
    };

    anomalyDetectionMutation.mutate(payload);
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'inservice': return 'bg-green-500';
      case 'outofservice': return 'bg-red-500';
      case 'creating': return 'bg-yellow-500';
      case 'updating': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getSeverityIcon = (severity?: string) => {
    switch (severity?.toLowerCase()) {
      case 'critical': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'high': return <AlertTriangle className="h-4 w-4 text-orange-500" />;
      case 'medium': return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'low': return <CheckCircle className="h-4 w-4 text-green-500" />;
      default: return <Activity className="h-4 w-4 text-blue-500" />;
    }
  };

  return (
    <div className="space-y-6" data-testid="ml-analytics-page">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">AWS SageMaker ML Analytics</h1>
          <p className="text-muted-foreground">Advanced machine learning threat detection and behavioral analysis</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant={serviceStatus?.service === 'AWS SageMaker ML Service' ? 'default' : 'secondary'}>
            <Bot className="h-3 w-3 mr-1" />
            {serviceStatus?.status || 'Unknown'}
          </Badge>
        </div>
      </div>

      {/* Model Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statusLoading ? (
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 animate-spin" />
                <span>Loading models...</span>
              </div>
            </CardContent>
          </Card>
        ) : (
          modelStatus?.map((model) => (
            <Card key={model.endpoint_name} data-testid={`model-status-${model.endpoint_name}`}>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${getStatusColor(model.status)}`} />
                  <span className="font-medium">{model.endpoint_name}</span>
                </div>
                <div className="mt-2 text-sm text-muted-foreground">
                  <div>Status: {model.status}</div>
                  <div>Version: {model.model_version}</div>
                  <div>Instances: {model.instance_count}</div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ML Prediction Interface */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                ML Prediction Interface
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="threat-detection" data-testid="tab-threat-detection">
                    <Target className="h-4 w-4 mr-2" />
                    Threat Detection
                  </TabsTrigger>
                  <TabsTrigger value="behavioral-analysis" data-testid="tab-behavioral-analysis">
                    <Eye className="h-4 w-4 mr-2" />
                    Behavioral Analysis
                  </TabsTrigger>
                  <TabsTrigger value="document-classification" data-testid="tab-document-classification">
                    <FileText className="h-4 w-4 mr-2" />
                    Document Classification
                  </TabsTrigger>
                  <TabsTrigger value="anomaly-detection" data-testid="tab-anomaly-detection">
                    <Activity className="h-4 w-4 mr-2" />
                    Anomaly Detection
                  </TabsTrigger>
                </TabsList>

                {/* Threat Detection Tab */}
                <TabsContent value="threat-detection" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="source_ip">Source IP</Label>
                      <Input
                        id="source_ip"
                        placeholder="192.168.1.100"
                        value={threatData.source_ip}
                        onChange={(e) => setThreatData({...threatData, source_ip: e.target.value})}
                        data-testid="input-source-ip"
                      />
                    </div>
                    <div>
                      <Label htmlFor="destination_ip">Destination IP</Label>
                      <Input
                        id="destination_ip"
                        placeholder="10.0.0.50"
                        value={threatData.destination_ip}
                        onChange={(e) => setThreatData({...threatData, destination_ip: e.target.value})}
                        data-testid="input-destination-ip"
                      />
                    </div>
                    <div>
                      <Label htmlFor="port">Port</Label>
                      <Input
                        id="port"
                        type="number"
                        placeholder="443"
                        value={threatData.port}
                        onChange={(e) => setThreatData({...threatData, port: e.target.value})}
                        data-testid="input-port"
                      />
                    </div>
                    <div>
                      <Label htmlFor="protocol">Protocol</Label>
                      <Select value={threatData.protocol} onValueChange={(value) => setThreatData({...threatData, protocol: value})}>
                        <SelectTrigger data-testid="select-protocol">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="HTTP">HTTP</SelectItem>
                          <SelectItem value="HTTPS">HTTPS</SelectItem>
                          <SelectItem value="TCP">TCP</SelectItem>
                          <SelectItem value="UDP">UDP</SelectItem>
                          <SelectItem value="ICMP">ICMP</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="features">Features (comma-separated)</Label>
                      <Input
                        id="features"
                        placeholder="0.1, 0.3, 0.7, 0.2, 0.9"
                        value={threatData.features}
                        onChange={(e) => setThreatData({...threatData, features: e.target.value})}
                        data-testid="input-features"
                      />
                    </div>
                  </div>
                  <Button 
                    onClick={handleThreatDetection} 
                    disabled={threatDetectionMutation.isPending}
                    className="w-full"
                    data-testid="button-analyze-threat"
                  >
                    {threatDetectionMutation.isPending ? <Clock className="h-4 w-4 mr-2 animate-spin" /> : <Target className="h-4 w-4 mr-2" />}
                    Analyze Threat
                  </Button>
                </TabsContent>

                {/* Behavioral Analysis Tab */}
                <TabsContent value="behavioral-analysis" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="user_id">User ID</Label>
                      <Input
                        id="user_id"
                        placeholder="user_12345"
                        value={behavioralData.user_id}
                        onChange={(e) => setBehavioralData({...behavioralData, user_id: e.target.value})}
                        data-testid="input-user-id"
                      />
                    </div>
                    <div>
                      <Label htmlFor="login_location">Login Location</Label>
                      <Input
                        id="login_location"
                        placeholder="New York, NY"
                        value={behavioralData.login_location}
                        onChange={(e) => setBehavioralData({...behavioralData, login_location: e.target.value})}
                        data-testid="input-login-location"
                      />
                    </div>
                    <div>
                      <Label htmlFor="session_duration">Session Duration (seconds)</Label>
                      <Input
                        id="session_duration"
                        type="number"
                        placeholder="3600"
                        value={behavioralData.session_duration}
                        onChange={(e) => setBehavioralData({...behavioralData, session_duration: e.target.value})}
                        data-testid="input-session-duration"
                      />
                    </div>
                    <div>
                      <Label htmlFor="avg_session_duration">Average Session Duration</Label>
                      <Input
                        id="avg_session_duration"
                        type="number"
                        placeholder="2400"
                        value={behavioralData.avg_session_duration}
                        onChange={(e) => setBehavioralData({...behavioralData, avg_session_duration: e.target.value})}
                        data-testid="input-avg-session-duration"
                      />
                    </div>
                  </div>
                  <Button 
                    onClick={handleBehavioralAnalysis} 
                    disabled={behavioralAnalysisMutation.isPending}
                    className="w-full"
                    data-testid="button-analyze-behavior"
                  >
                    {behavioralAnalysisMutation.isPending ? <Clock className="h-4 w-4 mr-2 animate-spin" /> : <Eye className="h-4 w-4 mr-2" />}
                    Analyze Behavior
                  </Button>
                </TabsContent>

                {/* Document Classification Tab */}
                <TabsContent value="document-classification" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="file_name">File Name</Label>
                      <Input
                        id="file_name"
                        placeholder="security_policy_2025.pdf"
                        value={documentData.file_name}
                        onChange={(e) => setDocumentData({...documentData, file_name: e.target.value})}
                        data-testid="input-file-name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="file_type">File Type</Label>
                      <Select value={documentData.file_type} onValueChange={(value) => setDocumentData({...documentData, file_type: value})}>
                        <SelectTrigger data-testid="select-file-type">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pdf">PDF</SelectItem>
                          <SelectItem value="docx">DOCX</SelectItem>
                          <SelectItem value="txt">TXT</SelectItem>
                          <SelectItem value="xlsx">XLSX</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Button 
                    onClick={handleDocumentClassification} 
                    disabled={documentClassificationMutation.isPending}
                    className="w-full"
                    data-testid="button-classify-document"
                  >
                    {documentClassificationMutation.isPending ? <Clock className="h-4 w-4 mr-2 animate-spin" /> : <FileText className="h-4 w-4 mr-2" />}
                    Classify Document
                  </Button>
                </TabsContent>

                {/* Anomaly Detection Tab */}
                <TabsContent value="anomaly-detection" className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="cpu_usage">CPU Usage (%)</Label>
                      <Input
                        id="cpu_usage"
                        type="number"
                        placeholder="85.2"
                        value={anomalyData.cpu_usage}
                        onChange={(e) => setAnomalyData({...anomalyData, cpu_usage: e.target.value})}
                        data-testid="input-cpu-usage"
                      />
                    </div>
                    <div>
                      <Label htmlFor="memory_usage">Memory Usage (%)</Label>
                      <Input
                        id="memory_usage"
                        type="number"
                        placeholder="76.8"
                        value={anomalyData.memory_usage}
                        onChange={(e) => setAnomalyData({...anomalyData, memory_usage: e.target.value})}
                        data-testid="input-memory-usage"
                      />
                    </div>
                    <div>
                      <Label htmlFor="active_connections">Active Connections</Label>
                      <Input
                        id="active_connections"
                        type="number"
                        placeholder="1250"
                        value={anomalyData.active_connections}
                        onChange={(e) => setAnomalyData({...anomalyData, active_connections: e.target.value})}
                        data-testid="input-active-connections"
                      />
                    </div>
                  </div>
                  <Button 
                    onClick={handleAnomalyDetection} 
                    disabled={anomalyDetectionMutation.isPending}
                    className="w-full"
                    data-testid="button-detect-anomaly"
                  >
                    {anomalyDetectionMutation.isPending ? <Clock className="h-4 w-4 mr-2 animate-spin" /> : <Activity className="h-4 w-4 mr-2" />}
                    Detect Anomaly
                  </Button>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Results Panel */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Prediction Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              {predictionResults ? (
                <div className="space-y-4" data-testid="prediction-results">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Prediction:</span>
                    <Badge variant={predictionResults.prediction === 'malicious' ? 'destructive' : 'default'}>
                      {predictionResults.prediction}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Confidence</span>
                      <span>{(predictionResults.confidence * 100).toFixed(1)}%</span>
                    </div>
                    <Progress value={predictionResults.confidence * 100} />
                  </div>
                  {predictionResults.threat_type && (
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Threat Type:</span>
                      <span className="text-sm">{predictionResults.threat_type}</span>
                    </div>
                  )}
                  {predictionResults.severity && (
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Severity:</span>
                      <div className="flex items-center gap-1">
                        {getSeverityIcon(predictionResults.severity)}
                        <span className="text-sm capitalize">{predictionResults.severity}</span>
                      </div>
                    </div>
                  )}
                  {predictionResults.recommendations && (
                    <div>
                      <span className="font-medium">Recommendations:</span>
                      <ul className="mt-1 text-sm space-y-1">
                        {predictionResults.recommendations.map((rec, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <Shield className="h-3 w-3" />
                            {rec}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <div className="pt-2 border-t text-xs text-muted-foreground space-y-1">
                    <div>Model: {predictionResults.model_version}</div>
                    <div>Inference time: {predictionResults.inference_time_ms}ms</div>
                  </div>
                </div>
              ) : (
                <div className="text-center text-muted-foreground py-8">
                  <Brain className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Run a prediction to see results</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}