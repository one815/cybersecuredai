import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  AlertTriangle, 
  Clock, 
  Users, 
  FileText, 
  CheckCircle, 
  PlayCircle,
  PauseCircle,
  Shield,
  Eye,
  MessageSquare,
  Upload,
  Search,
  Filter,
  Plus,
  Calendar,
  User,
  Brain,
  Bot,
  Zap,
  Activity,
  Target,
  Cpu,
  BarChart3,
  TrendingUp,
  Radar,
  Sparkles,
  Bolt,
  Crosshair,
  Gauge,
  Settings,
  RefreshCw,
  Play,
  Pause,
  Power,
  Database,
  Network,
  Server,
  Globe,
  Wifi
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

interface Incident {
  id: string;
  title: string;
  description: string;
  severity: string;
  status: string;
  assignedTo: string | null;
  reportedBy: string | null;
  reportedAt: Date;
  resolvedAt: Date | null;
  timeline: IncidentTimelineEntry[];
  evidence: IncidentEvidence[];
  response: IncidentResponse[];
}

interface IncidentTimelineEntry {
  id: string;
  timestamp: Date;
  action: string;
  user: string;
  details: string;
}

interface IncidentEvidence {
  id: string;
  type: string;
  filename: string;
  size: number;
  uploadedBy: string;
  uploadedAt: Date;
}

interface IncidentResponse {
  id: string;
  action: string;
  status: string;
  assignedTo: string;
  completedAt: Date | null;
  notes: string;
}

interface AIAnalysis {
  confidenceScore: number;
  threatType: string;
  riskLevel: string;
  impactAssessment: string;
  recommendedActions: string[];
  indicators: string[];
  similarIncidents: string[];
}

interface AutomatedResponse {
  id: string;
  playbookId: string;
  playbookName: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  progress: number;
  startedAt: Date;
  completedAt: Date | null;
  actions: AutomatedAction[];
}

interface AutomatedAction {
  id: string;
  name: string;
  type: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  startedAt: Date | null;
  completedAt: Date | null;
  result: string | null;
  logs: string[];
}

interface ThreatDetection {
  id: string;
  timestamp: Date;
  source: string;
  threatType: string;
  severity: string;
  confidence: number;
  description: string;
  indicators: string[];
  autoCreatedIncident?: string;
}

export default function IncidentResponse() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedIncident, setSelectedIncident] = useState<string | null>(null);
  const [isCreatingIncident, setIsCreatingIncident] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [aiEngineEnabled, setAiEngineEnabled] = useState(true);
  const [autoResponseEnabled, setAutoResponseEnabled] = useState(true);
  const [selectedTab, setSelectedTab] = useState("incidents");
  const [realTimeDetections, setRealTimeDetections] = useState<ThreatDetection[]>([]);

  const { data: incidents = [], isLoading } = useQuery<Incident[]>({
    queryKey: ["/api/incidents"],
  });

  const { data: users = [] } = useQuery<any[]>({
    queryKey: ["/api/users"],
  });

  const { data: aiAnalytics = null } = useQuery<any>({
    queryKey: ["/api/ai/analytics"],
    refetchInterval: 5000, // Refresh every 5 seconds
  });

  const { data: automatedResponses = [] } = useQuery<AutomatedResponse[]>({
    queryKey: ["/api/incidents/automated-responses"],
    refetchInterval: 2000, // Refresh every 2 seconds
  });

  // Simulate real-time threat detections
  useEffect(() => {
    const interval = setInterval(() => {
      if (aiEngineEnabled && Math.random() > 0.7) {
        const newDetection: ThreatDetection = {
          id: `det-${Date.now()}`,
          timestamp: new Date(),
          source: ['Network Monitor', 'Email Security', 'Endpoint Detection', 'Web Gateway'][Math.floor(Math.random() * 4)],
          threatType: ['Malware', 'Phishing', 'Brute Force', 'Data Exfiltration', 'Ransomware'][Math.floor(Math.random() * 5)],
          severity: ['low', 'medium', 'high', 'critical'][Math.floor(Math.random() * 4)],
          confidence: Math.floor(Math.random() * 30) + 70,
          description: 'AI-detected suspicious activity requiring investigation',
          indicators: ['Unusual network traffic', 'Suspicious file behavior', 'Anomalous user activity']
        };
        setRealTimeDetections(prev => [newDetection, ...prev.slice(0, 9)]);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [aiEngineEnabled]);

  const createIncidentMutation = useMutation({
    mutationFn: async (incidentData: any) => {
      const response = await fetch("/api/incidents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(incidentData),
      });
      if (!response.ok) throw new Error("Failed to create incident");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/incidents"] });
      toast({
        title: "Incident Created",
        description: "New security incident has been created and assigned.",
      });
      setIsCreatingIncident(false);
    },
  });

  const updateIncidentMutation = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: any }) => {
      const response = await fetch(`/api/incidents/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
      if (!response.ok) throw new Error("Failed to update incident");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/incidents"] });
      toast({
        title: "Incident Updated",
        description: "Incident status has been updated.",
      });
    },
  });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical": return "bg-red-500 text-white";
      case "high": return "bg-orange-500 text-white";
      case "medium": return "bg-yellow-500 text-black";
      case "low": return "bg-green-500 text-white";
      default: return "bg-gray-500 text-white";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open": return "text-red-400 border-red-400";
      case "investigating": return "text-orange-400 border-orange-400";
      case "resolved": return "text-green-400 border-green-400";
      default: return "text-gray-400 border-gray-400";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "open": return AlertTriangle;
      case "investigating": return Eye;
      case "resolved": return CheckCircle;
      default: return AlertTriangle;
    }
  };

  const filteredIncidents = incidents.filter(incident => {
    const matchesSearch = incident.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         incident.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || incident.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Enhanced mock data with AI analysis
  const mockIncidents: Incident[] = [
    {
      id: "inc-1",
      title: "AI-Detected Ransomware Attempt",
      description: "Advanced persistent threat with file encryption indicators detected by AI engine",
      severity: "critical",
      status: "investigating",
      assignedTo: "admin-1",
      reportedBy: "ai-engine",
      reportedAt: new Date(Date.now() - 3600000),
      resolvedAt: null,
      timeline: [
        {
          id: "tl-1",
          timestamp: new Date(Date.now() - 3600000),
          action: "AI Detection Alert",
          user: "AI Engine",
          details: "Machine learning algorithm detected anomalous file encryption patterns"
        },
        {
          id: "tl-2",
          timestamp: new Date(Date.now() - 3500000),
          action: "Automated Containment",
          user: "Auto-Response System",
          details: "Initiated automated network isolation for affected endpoints"
        },
        {
          id: "tl-3",
          timestamp: new Date(Date.now() - 3300000),
          action: "AI Analysis Complete",
          user: "AI Engine",
          details: "Threat classified as ransomware variant with 94% confidence"
        },
        {
          id: "tl-4",
          timestamp: new Date(Date.now() - 3000000),
          action: "Human Analyst Assigned",
          user: "System",
          details: "Escalated to security team for validation and response planning"
        }
      ],
      evidence: [
        {
          id: "ev-1",
          type: "ai-analysis",
          filename: "threat_analysis_report.json",
          size: 156789,
          uploadedBy: "ai-engine",
          uploadedAt: new Date(Date.now() - 3500000)
        },
        {
          id: "ev-2",
          type: "network-capture",
          filename: "network_traffic_capture.pcap",
          size: 2456789,
          uploadedBy: "auto-collector",
          uploadedAt: new Date(Date.now() - 3400000)
        },
        {
          id: "ev-3",
          type: "memory-dump",
          filename: "endpoint_memory_analysis.dump",
          size: 12456789,
          uploadedBy: "auto-collector",
          uploadedAt: new Date(Date.now() - 3200000)
        }
      ],
      response: [
        {
          id: "resp-1",
          action: "Network Isolation",
          status: "completed",
          assignedTo: "auto-response",
          completedAt: new Date(Date.now() - 3400000),
          notes: "Automatically isolated 3 affected endpoints from network"
        },
        {
          id: "resp-2",
          action: "Backup Verification",
          status: "in_progress",
          assignedTo: "admin-1",
          completedAt: null,
          notes: "Verifying integrity of backup systems and recent snapshots"
        }
      ]
    },
    {
      id: "inc-2",
      title: "AI-Detected Phishing Campaign",
      description: "Coordinated phishing attack targeting multiple users detected by email AI",
      severity: "high",
      status: "investigating",
      assignedTo: "admin-1",
      reportedBy: "ai-engine",
      reportedAt: new Date(Date.now() - 7200000),
      resolvedAt: null,
      timeline: [
        {
          id: "tl-5",
          timestamp: new Date(Date.now() - 7200000),
          action: "Email AI Detection",
          user: "Email Security AI",
          details: "Pattern recognition identified suspicious email campaign"
        }
      ],
      evidence: [],
      response: []
    }
  ];

  const mockAIAnalysis: AIAnalysis = {
    confidenceScore: 94,
    threatType: "Ransomware (Conti Variant)",
    riskLevel: "Critical",
    impactAssessment: "High - Potential for data encryption and system disruption",
    recommendedActions: [
      "Immediate network isolation of affected systems",
      "Activate incident response team",
      "Verify backup system integrity",
      "Contact law enforcement if data theft suspected",
      "Prepare for potential system restoration"
    ],
    indicators: [
      "Unusual file encryption activity",
      "Suspicious network communication patterns",
      "Registry modifications consistent with ransomware",
      "Process hollowing techniques detected"
    ],
    similarIncidents: [
      "INC-2023-0847: Conti ransomware attack on healthcare network",
      "INC-2023-0923: Similar encryption patterns in financial sector"
    ]
  };

  const mockAutomatedResponses: AutomatedResponse[] = [
    {
      id: "ar-1",
      playbookId: "pb-ransomware-001",
      playbookName: "Ransomware Containment Playbook",
      status: "running",
      progress: 75,
      startedAt: new Date(Date.now() - 3500000),
      completedAt: null,
      actions: [
        {
          id: "ac-1",
          name: "Network Isolation",
          type: "containment",
          status: "completed",
          startedAt: new Date(Date.now() - 3500000),
          completedAt: new Date(Date.now() - 3400000),
          result: "Successfully isolated 3 endpoints",
          logs: ["Endpoint 192.168.1.45 isolated", "Endpoint 192.168.1.67 isolated", "Endpoint 192.168.1.89 isolated"]
        },
        {
          id: "ac-2",
          name: "Evidence Collection",
          type: "investigation",
          status: "completed",
          startedAt: new Date(Date.now() - 3300000),
          completedAt: new Date(Date.now() - 3100000),
          result: "Collected memory dumps and network captures",
          logs: ["Memory dump collected from primary endpoint", "Network traffic captured"]
        },
        {
          id: "ac-3",
          name: "Backup Verification",
          type: "recovery",
          status: "running",
          startedAt: new Date(Date.now() - 3000000),
          completedAt: null,
          result: null,
          logs: ["Verifying backup integrity...", "Checking backup encryption status..."]
        }
      ]
    }
  ];

  const currentIncidents = incidents.length > 0 ? filteredIncidents : mockIncidents;
  const selectedIncidentData = currentIncidents.find(inc => inc.id === selectedIncident);

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-surface rounded w-1/4"></div>
          <div className="h-64 bg-surface rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="ai-dashboard-bg min-h-screen">
      {/* Enhanced AI-Powered Header */}
      <header className="bg-surface/90 backdrop-blur-md border-b border-surface-light p-4 cyber-glow">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-red-400 to-orange-500 bg-clip-text text-transparent">
                  AI-Powered Incident Response
                </h2>
                <div className="text-gray-400 flex items-center space-x-4">
                  <span>Automated detection, analysis, and response system</span>
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full animate-pulse ${
                      aiEngineEnabled ? 'bg-green-400' : 'bg-red-400'
                    }`}></div>
                    <span className={`text-xs ${
                      aiEngineEnabled ? 'text-green-400' : 'text-red-400'
                    }`}>
                      AI Engine {aiEngineEnabled ? 'Active' : 'Inactive'}
                    </span>
                    <div className={`w-2 h-2 rounded-full animate-pulse ${
                      autoResponseEnabled ? 'bg-cyan-400' : 'bg-gray-400'
                    }`}></div>
                    <span className={`text-xs ${
                      autoResponseEnabled ? 'text-cyan-400' : 'text-gray-400'
                    }`}>
                      Auto-Response {autoResponseEnabled ? 'Enabled' : 'Disabled'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {/* AI Engine Controls */}
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setAiEngineEnabled(!aiEngineEnabled)}
                className={`border-green-500/30 ${aiEngineEnabled ? 'bg-green-500/20 text-green-400' : 'text-gray-400'}`}
                data-testid="toggle-ai-engine"
              >
                <Brain className="w-4 h-4 mr-1" />
                AI Engine
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setAutoResponseEnabled(!autoResponseEnabled)}
                className={`border-cyan-500/30 ${autoResponseEnabled ? 'bg-cyan-500/20 text-cyan-400' : 'text-gray-400'}`}
                data-testid="toggle-auto-response"
              >
                <Zap className="w-4 h-4 mr-1" />
                Auto-Response
              </Button>
            </div>
            <Button 
              onClick={() => setIsCreatingIncident(true)}
              className="bg-interactive hover:bg-orange-600" 
              data-testid="create-incident"
            >
              <Plus className="w-4 h-4 mr-2" />
              Manual Incident
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        {/* AI Analytics Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="bg-surface/80 backdrop-blur-md border border-green-500/30 cyber-glow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Brain className="w-5 h-5 text-green-400" />
                  <span className="text-sm text-gray-400">AI Detections</span>
                </div>
                <Sparkles className="w-4 h-4 text-green-400" />
              </div>
              <div className="text-2xl font-bold text-white mt-2">47</div>
              <div className="text-xs text-green-400">+12 last hour</div>
            </CardContent>
          </Card>

          <Card className="bg-surface/80 backdrop-blur-md border border-cyan-500/30 cyber-glow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Zap className="w-5 h-5 text-cyan-400" />
                  <span className="text-sm text-gray-400">Auto Responses</span>
                </div>
                <Bolt className="w-4 h-4 text-cyan-400" />
              </div>
              <div className="text-2xl font-bold text-white mt-2">23</div>
              <div className="text-xs text-cyan-400">94% success rate</div>
            </CardContent>
          </Card>

          <Card className="bg-surface/80 backdrop-blur-md border border-orange-500/30 cyber-glow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Target className="w-5 h-5 text-orange-400" />
                  <span className="text-sm text-gray-400">Threat Score</span>
                </div>
                <Crosshair className="w-4 h-4 text-orange-400" />
              </div>
              <div className="text-2xl font-bold text-white mt-2">78</div>
              <div className="text-xs text-orange-400">High threat level</div>
            </CardContent>
          </Card>

          <Card className="bg-surface/80 backdrop-blur-md border border-purple-500/30 cyber-glow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Gauge className="w-5 h-5 text-purple-400" />
                  <span className="text-sm text-gray-400">Response Time</span>
                </div>
                <TrendingUp className="w-4 h-4 text-purple-400" />
              </div>
              <div className="text-2xl font-bold text-white mt-2">1.2s</div>
              <div className="text-xs text-purple-400">Average detection</div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Navigation Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="mb-6">
          <TabsList className="bg-surface/50">
            <TabsTrigger value="incidents" className="flex items-center space-x-2">
              <AlertTriangle className="w-4 h-4" />
              <span>Incidents</span>
            </TabsTrigger>
            <TabsTrigger value="detections" className="flex items-center space-x-2">
              <Radar className="w-4 h-4" />
              <span>Live Detections</span>
            </TabsTrigger>
            <TabsTrigger value="automated" className="flex items-center space-x-2">
              <Bot className="w-4 h-4" />
              <span>Automated Responses</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center space-x-2">
              <BarChart3 className="w-4 h-4" />
              <span>AI Analytics</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="incidents">
            {/* Search and Filters */}
            <div className="flex items-center space-x-4 mb-6">
              <div className="relative flex-1">
                <Input
                  placeholder="Search incidents..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                  data-testid="incident-search"
                />
                <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              </div>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-48" data-testid="status-filter">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="investigating">Investigating</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Incidents List */}
              <div className="lg:col-span-2 space-y-4">
                <Card className="bg-surface/80 backdrop-blur-md border-surface-light cyber-glow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center space-x-2">
                        <Bot className="w-5 h-5 text-cyan-400" />
                        <span>AI-Managed Incidents</span>
                      </CardTitle>
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                        {currentIncidents.filter(i => i.status !== 'resolved').length} Active
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {currentIncidents.map((incident) => {
                        const StatusIcon = getStatusIcon(incident.status);
                        const isAIReported = incident.reportedBy === 'ai-engine';
                        return (
                          <div
                            key={incident.id}
                            className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                              selectedIncident === incident.id 
                                ? "border-interactive bg-interactive/10" 
                                : "border-surface-light hover:border-interactive/50"
                            } ${isAIReported ? 'border-cyan-500/30 bg-cyan-500/5' : ''}`}
                            onClick={() => setSelectedIncident(incident.id)}
                            data-testid={`incident-${incident.id}`}
                          >
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex items-center space-x-3">
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                  isAIReported ? 'bg-cyan-500/20' : 'bg-red-500/20'
                                }`}>
                                  {isAIReported ? (
                                    <Brain className="w-5 h-5 text-cyan-400" />
                                  ) : (
                                    <StatusIcon className="w-5 h-5 text-red-400" />
                                  )}
                                </div>
                                <div>
                                  <div className="flex items-center space-x-2">
                                    <h4 className="font-semibold text-white">{incident.title}</h4>
                                    {isAIReported && (
                                      <Badge variant="outline" className="text-cyan-400 border-cyan-400 text-xs">
                                        AI-Detected
                                      </Badge>
                                    )}
                                  </div>
                                  <p className="text-sm text-gray-400">{incident.description}</p>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Badge className={getSeverityColor(incident.severity)}>
                                  {incident.severity.toUpperCase()}
                                </Badge>
                                <Badge variant="outline" className={getStatusColor(incident.status)}>
                                  {incident.status.replace("_", " ").toUpperCase()}
                                </Badge>
                              </div>
                            </div>
                            
                            <div className="flex items-center justify-between text-sm text-gray-400">
                              <div className="flex items-center space-x-4">
                                <div className="flex items-center space-x-1">
                                  <Clock className="w-4 h-4" />
                                  <span>{new Date(incident.reportedAt).toLocaleString()}</span>
                                </div>
                                {incident.assignedTo && (
                                  <div className="flex items-center space-x-1">
                                    <User className="w-4 h-4" />
                                    <span>Assigned</span>
                                  </div>
                                )}
                                {isAIReported && (
                                  <div className="flex items-center space-x-1">
                                    <Brain className="w-4 h-4" />
                                    <span>AI Confidence: 94%</span>
                                  </div>
                                )}
                              </div>
                              <div className="flex items-center space-x-2">
                                <span>{incident.timeline?.length || 0} updates</span>
                                <span>{incident.evidence?.length || 0} evidence</span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Enhanced Incident Details */}
              <div className="space-y-4">
                {selectedIncidentData ? (
                  <>
                    {/* AI Analysis Panel */}
                    {selectedIncidentData.reportedBy === 'ai-engine' && (
                      <Card className="bg-surface/80 backdrop-blur-md border border-cyan-500/30 cyber-glow">
                        <CardHeader>
                          <CardTitle className="flex items-center space-x-2">
                            <Brain className="w-5 h-5 text-cyan-400" />
                            <span>AI Analysis</span>
                            <Badge className="bg-cyan-500/20 text-cyan-400">
                              {mockAIAnalysis.confidenceScore}% Confidence
                            </Badge>
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div>
                            <label className="text-xs text-gray-400">Threat Type</label>
                            <p className="text-sm font-medium text-cyan-400">{mockAIAnalysis.threatType}</p>
                          </div>
                          <div>
                            <label className="text-xs text-gray-400">Risk Assessment</label>
                            <p className="text-sm text-white">{mockAIAnalysis.impactAssessment}</p>
                          </div>
                          <div>
                            <label className="text-xs text-gray-400">Key Indicators</label>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {mockAIAnalysis.indicators.map((indicator, index) => (
                                <Badge key={index} variant="outline" className="text-xs text-orange-400 border-orange-400">
                                  {indicator}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div>
                            <label className="text-xs text-gray-400">AI Recommendations</label>
                            <ul className="text-sm text-gray-300 mt-1 space-y-1">
                              {mockAIAnalysis.recommendedActions.slice(0, 3).map((action, index) => (
                                <li key={index} className="flex items-center space-x-2">
                                  <Sparkles className="w-3 h-3 text-cyan-400" />
                                  <span>{action}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    {/* Incident Overview */}
                    <Card className="bg-surface/80 backdrop-blur-md border-surface-light cyber-glow">
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <AlertTriangle className="w-5 h-5 text-red-400" />
                          <span>Incident Details</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-2">{selectedIncidentData.title}</h4>
                          <p className="text-gray-400 text-sm">{selectedIncidentData.description}</p>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-xs text-gray-400">Severity</label>
                            <Badge className={getSeverityColor(selectedIncidentData.severity)}>
                              {selectedIncidentData.severity.toUpperCase()}
                            </Badge>
                          </div>
                          <div>
                            <label className="text-xs text-gray-400">Status</label>
                            <Badge variant="outline" className={getStatusColor(selectedIncidentData.status)}>
                              {selectedIncidentData.status.replace("_", " ").toUpperCase()}
                            </Badge>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateIncidentMutation.mutate({
                              id: selectedIncidentData.id,
                              updates: { status: "investigating" }
                            })}
                            className="flex items-center space-x-2"
                            data-testid="start-investigation"
                          >
                            <PlayCircle className="w-4 h-4" />
                            <span>Investigate</span>
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateIncidentMutation.mutate({
                              id: selectedIncidentData.id,
                              updates: { status: "resolved", resolvedAt: new Date() }
                            })}
                            className="flex items-center space-x-2"
                            data-testid="resolve-incident"
                          >
                            <CheckCircle className="w-4 h-4" />
                            <span>Resolve</span>
                          </Button>
                          {selectedIncidentData.reportedBy === 'ai-engine' && (
                            <Button
                              size="sm"
                              className="bg-cyan-600 hover:bg-cyan-700 col-span-2"
                              data-testid="trigger-ai-response"
                            >
                              <Zap className="w-4 h-4 mr-2" />
                              Trigger AI Response
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Enhanced Timeline */}
                    <Card className="bg-surface/80 backdrop-blur-md border-surface-light cyber-glow">
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <Activity className="w-5 h-5 text-green-400" />
                          <span>AI-Enhanced Timeline</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {selectedIncidentData.timeline?.map((entry) => {
                            const isAIAction = entry.user.includes('AI') || entry.user.includes('Auto');
                            return (
                              <div key={entry.id} className="flex items-start space-x-3 p-3 bg-background/50 rounded-lg border border-surface-light">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center mt-1 ${
                                  isAIAction ? 'bg-cyan-500/20' : 'bg-interactive/20'
                                }`}>
                                  {isAIAction ? (
                                    <Brain className="w-4 h-4 text-cyan-400" />
                                  ) : (
                                    <Clock className="w-4 h-4 text-interactive" />
                                  )}
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center justify-between mb-1">
                                    <div className="flex items-center space-x-2">
                                      <span className="font-medium text-sm">{entry.action}</span>
                                      {isAIAction && (
                                        <Badge variant="outline" className="text-cyan-400 border-cyan-400 text-xs">
                                          Automated
                                        </Badge>
                                      )}
                                    </div>
                                    <span className="text-xs text-gray-400">
                                      {new Date(entry.timestamp).toLocaleTimeString()}
                                    </span>
                                  </div>
                                  <p className="text-xs text-gray-400">{entry.details}</p>
                                  <p className={`text-xs ${
                                    isAIAction ? 'text-cyan-400' : 'text-interactive'
                                  }`}>by {entry.user}</p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Enhanced Evidence */}
                    <Card className="bg-surface/80 backdrop-blur-md border-surface-light cyber-glow">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="flex items-center space-x-2">
                            <Database className="w-5 h-5 text-purple-400" />
                            <span>AI-Collected Evidence</span>
                          </CardTitle>
                          <Button size="sm" variant="outline" data-testid="upload-evidence">
                            <Upload className="w-4 h-4 mr-2" />
                            Manual Upload
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {selectedIncidentData.evidence?.map((evidence) => {
                            const isAICollected = evidence.uploadedBy.includes('ai') || evidence.uploadedBy.includes('auto');
                            return (
                              <div key={evidence.id} className="flex items-center justify-between p-3 bg-background/50 rounded-lg border border-surface-light">
                                <div className="flex items-center space-x-3">
                                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                                    isAICollected ? 'bg-cyan-500/20' : 'bg-purple-500/20'
                                  }`}>
                                    {isAICollected ? (
                                      <Bot className="w-4 h-4 text-cyan-400" />
                                    ) : (
                                      <FileText className="w-4 h-4 text-purple-400" />
                                    )}
                                  </div>
                                  <div>
                                    <div className="flex items-center space-x-2">
                                      <p className="text-sm font-medium">{evidence.filename}</p>
                                      {isAICollected && (
                                        <Badge variant="outline" className="text-cyan-400 border-cyan-400 text-xs">
                                          Auto-Collected
                                        </Badge>
                                      )}
                                    </div>
                                    <p className="text-xs text-gray-400">
                                      {(evidence.size / 1024 / 1024).toFixed(1)} MB • {evidence.type}
                                    </p>
                                  </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Button size="sm" variant="ghost" data-testid="analyze-evidence">
                                    <Brain className="w-4 h-4" />
                                  </Button>
                                  <Button size="sm" variant="ghost" data-testid="download-evidence">
                                    <Eye className="w-4 h-4" />
                                  </Button>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </CardContent>
                    </Card>
                  </>
                ) : (
                  <Card className="bg-surface/80 backdrop-blur-md border-surface-light">
                    <CardContent className="p-6 text-center">
                      <Bot className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">AI-Powered Incident Analysis</h3>
                      <p className="text-gray-400">Select an incident to view AI analysis, automated responses, and detailed investigation data.</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>

          {/* Live Detections Tab */}
          <TabsContent value="detections">
            <Card className="bg-surface/80 backdrop-blur-md border border-green-500/30 cyber-glow">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Radar className="w-5 h-5 text-green-400" />
                  <span>Real-Time AI Threat Detection</span>
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {realTimeDetections.map((detection) => (
                    <div key={detection.id} className="p-4 bg-background/50 rounded-lg border border-green-500/30">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                            <Radar className="w-4 h-4 text-green-400" />
                          </div>
                          <div>
                            <h4 className="font-medium text-white">{detection.threatType} Detected</h4>
                            <p className="text-sm text-gray-400">{detection.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={getSeverityColor(detection.severity)}>
                            {detection.severity.toUpperCase()}
                          </Badge>
                          <Badge className="bg-green-500/20 text-green-400">
                            {detection.confidence}% Confidence
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">
                          Source: {detection.source} • {new Date(detection.timestamp).toLocaleTimeString()}
                        </span>
                        <Button size="sm" className="bg-interactive hover:bg-orange-600">
                          Create Incident
                        </Button>
                      </div>
                    </div>
                  ))}
                  {realTimeDetections.length === 0 && (
                    <div className="text-center py-8">
                      <Radar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-400">No threats detected. AI monitoring active.</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Automated Responses Tab */}
          <TabsContent value="automated">
            <Card className="bg-surface/80 backdrop-blur-md border border-cyan-500/30 cyber-glow">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bot className="w-5 h-5 text-cyan-400" />
                  <span>Automated Response Playbooks</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockAutomatedResponses.map((response) => (
                    <div key={response.id} className="p-4 bg-background/50 rounded-lg border border-cyan-500/30">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="font-medium text-white">{response.playbookName}</h4>
                          <p className="text-sm text-gray-400">
                            Started: {new Date(response.startedAt).toLocaleTimeString()}
                          </p>
                        </div>
                        <Badge className={`${
                          response.status === 'running' ? 'bg-cyan-500/20 text-cyan-400' :
                          response.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                          response.status === 'failed' ? 'bg-red-500/20 text-red-400' :
                          'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {response.status.toUpperCase()}
                        </Badge>
                      </div>
                      <div className="mb-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-gray-400">Progress</span>
                          <span className="text-sm text-cyan-400">{response.progress}%</span>
                        </div>
                        <Progress value={response.progress} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        {response.actions.map((action) => (
                          <div key={action.id} className="flex items-center justify-between p-2 bg-background/30 rounded">
                            <div className="flex items-center space-x-2">
                              <div className={`w-4 h-4 rounded-full ${
                                action.status === 'completed' ? 'bg-green-400' :
                                action.status === 'running' ? 'bg-cyan-400 animate-pulse' :
                                action.status === 'failed' ? 'bg-red-400' :
                                'bg-gray-400'
                              }`}></div>
                              <span className="text-sm text-white">{action.name}</span>
                            </div>
                            <span className="text-xs text-gray-400">{action.type}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* AI Analytics Tab */}
          <TabsContent value="analytics">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-surface/80 backdrop-blur-md border border-purple-500/30 cyber-glow">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="w-5 h-5 text-purple-400" />
                    <span>Threat Pattern Analysis</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="h-32 bg-background/50 rounded-lg p-4">
                      <div className="grid grid-cols-6 gap-2 h-full items-end">
                        {[65, 45, 80, 35, 90, 55].map((height, index) => (
                          <div key={index} className="relative">
                            <div 
                              className="bg-gradient-to-t from-purple-600 to-purple-400 rounded-t" 
                              style={{height: `${height}%`}}
                            ></div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-400">Malware Detection</span>
                        <span className="text-sm text-purple-400">↑ 23%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-400">Phishing Attempts</span>
                        <span className="text-sm text-purple-400">↓ 12%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-400">Intrusion Attempts</span>
                        <span className="text-sm text-purple-400">↑ 8%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-surface/80 backdrop-blur-md border border-orange-500/30 cyber-glow">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5 text-orange-400" />
                    <span>Response Effectiveness</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-orange-400 mb-2">94.2%</div>
                      <p className="text-sm text-gray-400">Average Success Rate</p>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-gray-400">Automated Containment</span>
                          <span className="text-sm text-orange-400">98%</span>
                        </div>
                        <Progress value={98} className="h-1" />
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-gray-400">Evidence Collection</span>
                          <span className="text-sm text-orange-400">96%</span>
                        </div>
                        <Progress value={96} className="h-1" />
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-gray-400">Threat Classification</span>
                          <span className="text-sm text-orange-400">92%</span>
                        </div>
                        <Progress value={92} className="h-1" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Create Incident Dialog */}
      <Dialog open={isCreatingIncident} onOpenChange={setIsCreatingIncident}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create Security Incident</DialogTitle>
          </DialogHeader>
          <form onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            createIncidentMutation.mutate({
              title: formData.get("title"),
              description: formData.get("description"),
              severity: formData.get("severity"),
              assignedTo: formData.get("assignedTo")
            });
          }} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Title</label>
              <Input name="title" required placeholder="Brief description of the incident" />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <Textarea name="description" required placeholder="Detailed description of the security incident" />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Severity</label>
                <Select name="severity" required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select severity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Assign To</label>
                <Select name="assignedTo">
                  <SelectTrigger>
                    <SelectValue placeholder="Select assignee" />
                  </SelectTrigger>
                  <SelectContent>
                    {users.map((user) => (
                      <SelectItem key={user.id} value={user.id}>
                        {user.firstName} {user.lastName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3">
              <Button type="button" variant="outline" onClick={() => setIsCreatingIncident(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-interactive hover:bg-orange-600">
                Create Incident
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}