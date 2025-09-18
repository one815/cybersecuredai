/**
 * CypherHUM Interface - Revolutionary 3D Holographic AI Interface
 * 
 * Advanced threat visualization and AI-powered command interface featuring:
 * - Immersive 3D holographic threat landscape visualization
 * - Real-time AI-powered threat analysis and natural language processing
 * - Interactive 3D threat exploration with spatial relationships
 * - WebSocket-powered real-time updates and animations
 * - Integration with CyDEF genetic AI and Live Location systems
 */

import { useState, useEffect, useRef } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Holographic3DRenderer from '@/components/Holographic3DRenderer';

// Icons for the futuristic interface
import { 
  Brain, 
  Eye, 
  Zap, 
  Activity, 
  Settings, 
  Mic, 
  MicOff, 
  Play, 
  Pause, 
  RotateCcw,
  Target,
  Network,
  Globe,
  AlertTriangle,
  Shield,
  Bot,
  Command,
  Layers,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  RefreshCw
} from 'lucide-react';

interface CypherHumSession {
  id: string;
  userId: string;
  sessionType: string;
  status: 'active' | 'paused' | 'completed' | 'terminated';
  startTime: string;
  endTime?: string;
  duration?: number;
  threatsVisualized: number;
  aiInteractions: number;
  visualizationPresetId?: string;
  sessionData: any;
  performanceMetrics: any;
  createdAt: string;
  updatedAt: string;
}

interface AIAnalysisResult {
  threatId: string;
  naturalLanguageQuery: string;
  aiResponse: {
    analysis: string;
    confidence: number;
    visualizationRecommendations: any;
    actionableInsights: string[];
    riskAssessment: any;
    correlatedThreats: string[];
  };
  processingTime: number;
  contextData: any;
}

interface ThreatVisualization3D {
  threatId: string;
  position: [number, number, number];
  scale: [number, number, number];
  rotation: [number, number, number];
  materialProperties: {
    color: string;
    opacity: number;
    emissive: string;
    wireframe: boolean;
    holographicShader: boolean;
  };
  animationData: {
    movement: any;
    pulsing: any;
    particles: any;
  };
  interactionBehavior: {
    hoverData: any;
    clickActions: any;
  };
  severity3DMapping: {
    sizeMultiplier: number;
    colorIntensity: number;
    animationSpeed: number;
  };
}

export default function CypherHumInterface() {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  // Session management state
  const [currentSession, setCurrentSession] = useState<CypherHumSession | null>(null);
  const [isSessionActive, setIsSessionActive] = useState(false);
  
  // AI interface state
  const [aiQuery, setAiQuery] = useState('');
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [aiAnalysisResults, setAiAnalysisResults] = useState<AIAnalysisResult[]>([]);
  
  // 3D visualization state
  const [threats3D, setThreats3D] = useState<ThreatVisualization3D[]>([]);
  const [selectedThreat, setSelectedThreat] = useState<ThreatVisualization3D | null>(null);
  const [hoveredThreat, setHoveredThreat] = useState<ThreatVisualization3D | null>(null);
  const [cameraPosition, setCameraPosition] = useState<[number, number, number]>([0, 10, 20]);
  
  // Rendering settings
  const [holographicEffects, setHolographicEffects] = useState(true);
  const [particleEffects, setParticleEffects] = useState(true);
  const [renderQuality, setRenderQuality] = useState<'low' | 'medium' | 'high' | 'ultra'>('high');
  const [realTimeUpdates, setRealTimeUpdates] = useState(true);
  
  // WebSocket connection
  const wsRef = useRef<WebSocket | null>(null);
  const [wsConnectionStatus, setWsConnectionStatus] = useState<'disconnected' | 'connecting' | 'connected'>('disconnected');
  
  // Voice recognition
  const recognitionRef = useRef<any>(null);
  
  // Dashboard data query
  const { data: dashboardData, refetch: refetchDashboard } = useQuery({
    queryKey: ['/api/cypherhum/dashboard'],
    enabled: !!user
  });

  // Create session mutation
  const createSessionMutation = useMutation({
    mutationFn: async (sessionData: any) => {
      return await apiRequest('/api/cypherhum/sessions', {
        method: 'POST',
        body: sessionData
      });
    },
    onSuccess: (session: CypherHumSession) => {
      setCurrentSession(session);
      setIsSessionActive(true);
      setupWebSocketConnection(session.id);
      toast({
        title: '🚀 CypherHUM Session Initialized',
        description: 'Revolutionary holographic interface is now active!'
      });
    },
    onError: (error: any) => {
      toast({
        title: '❌ Session Creation Failed',
        description: error.message || 'Failed to initialize CypherHUM session'
      });
    }
  });

  // AI analysis mutation
  const aiAnalysisMutation = useMutation({
    mutationFn: async ({ sessionId, query, contextData }: { sessionId: string; query: string; contextData?: any }) => {
      return await apiRequest('/api/cypherhum/ai-analysis', {
        method: 'POST',
        body: { sessionId, query, contextData }
      });
    },
    onSuccess: (result: AIAnalysisResult) => {
      setAiAnalysisResults(prev => [result, ...prev.slice(0, 4)]);
      toast({
        title: '🧠 AI Analysis Complete',
        description: `Analysis confidence: ${result.aiResponse.confidence}%`
      });
    }
  });

  // Initialize session on component mount
  useEffect(() => {
    if (user && !currentSession) {
      initializeSession();
    }
  }, [user]);

  // Setup voice recognition
  useEffect(() => {
    if (voiceEnabled && 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        let finalTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          }
        }
        if (finalTranscript) {
          setAiQuery(finalTranscript.trim());
        }
      };

      recognitionRef.current.onerror = (error: any) => {
        console.error('Speech recognition error:', error);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [voiceEnabled]);

  // Generate mock 3D threats for demonstration
  useEffect(() => {
    const generateMockThreats = () => {
      const mockThreats: ThreatVisualization3D[] = [
        {
          threatId: 'threat-001',
          position: [5, 2, 5],
          scale: [2, 2, 2],
          rotation: [0, 0, 0],
          materialProperties: {
            color: '#ff0000',
            opacity: 0.8,
            emissive: '#ff0000',
            wireframe: false,
            holographicShader: true
          },
          animationData: {
            movement: { type: 'orbital', speed: 2, radius: 2 },
            pulsing: { enabled: true, frequency: 3, intensity: 0.3 },
            particles: { enabled: true, count: 100, color: '#ff0000' }
          },
          interactionBehavior: {
            hoverData: { type: 'Critical Malware', severity: 'critical' },
            clickActions: { drillDown: true, aiAnalysis: true }
          },
          severity3DMapping: {
            sizeMultiplier: 2,
            colorIntensity: 1,
            animationSpeed: 2
          }
        },
        {
          threatId: 'threat-002',
          position: [-8, 1, -3],
          scale: [1.5, 1.5, 1.5],
          rotation: [0, 0, 0],
          materialProperties: {
            color: '#ff4400',
            opacity: 0.7,
            emissive: '#ff4400',
            wireframe: false,
            holographicShader: true
          },
          animationData: {
            movement: { type: 'orbital', speed: 1.5, radius: 1.5 },
            pulsing: { enabled: true, frequency: 2, intensity: 0.2 },
            particles: { enabled: true, count: 50, color: '#ff4400' }
          },
          interactionBehavior: {
            hoverData: { type: 'Phishing Attack', severity: 'high' },
            clickActions: { drillDown: true, aiAnalysis: true }
          },
          severity3DMapping: {
            sizeMultiplier: 1.5,
            colorIntensity: 0.8,
            animationSpeed: 1.5
          }
        },
        {
          threatId: 'threat-003',
          position: [0, 0, -10],
          scale: [1, 1, 1],
          rotation: [0, 0, 0],
          materialProperties: {
            color: '#ffaa00',
            opacity: 0.6,
            emissive: '#ffaa00',
            wireframe: false,
            holographicShader: true
          },
          animationData: {
            movement: { type: 'orbital', speed: 1, radius: 1 },
            pulsing: { enabled: true, frequency: 1, intensity: 0.15 },
            particles: { enabled: false }
          },
          interactionBehavior: {
            hoverData: { type: 'Suspicious Network Activity', severity: 'medium' },
            clickActions: { drillDown: true, aiAnalysis: true }
          },
          severity3DMapping: {
            sizeMultiplier: 1,
            colorIntensity: 0.6,
            animationSpeed: 1
          }
        }
      ];
      setThreats3D(mockThreats);
    };

    if (isSessionActive) {
      generateMockThreats();
    }
  }, [isSessionActive]);

  const initializeSession = async () => {
    try {
      await createSessionMutation.mutateAsync({
        sessionType: 'holographic',
        sessionData: {
          initialCameraPosition: cameraPosition,
          renderingSettings: {
            quality: renderQuality,
            holographicEffects,
            particleEffects
          }
        }
      });
    } catch (error) {
      console.error('Failed to initialize session:', error);
    }
  };

  const setupWebSocketConnection = (sessionId: string) => {
    if (!user) return;

    setWsConnectionStatus('connecting');
    
    const token = localStorage.getItem('auth_token') || 'demo-token';
    const wsUrl = `${window.location.protocol === 'https:' ? 'wss:' : 'ws:'}//${window.location.host}/ws/cypherhum?token=${token}&sessionId=${sessionId}`;
    
    const ws = new WebSocket(wsUrl);
    
    ws.onopen = () => {
      console.log('✅ CypherHUM WebSocket connected');
      setWsConnectionStatus('connected');
      wsRef.current = ws;
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        handleWebSocketMessage(data);
      } catch (error) {
        console.error('Failed to parse WebSocket message:', error);
      }
    };

    ws.onclose = () => {
      console.log('🔌 CypherHUM WebSocket disconnected');
      setWsConnectionStatus('disconnected');
      wsRef.current = null;
    };

    ws.onerror = (error) => {
      console.error('❌ CypherHUM WebSocket error:', error);
      setWsConnectionStatus('disconnected');
    };
  };

  const handleWebSocketMessage = (data: any) => {
    switch (data.type) {
      case 'cypherhum_initial_data':
        if (data.data?.threats) {
          setThreats3D(data.data.threats);
        }
        break;
      case 'cypherhum_3d_update':
        if (data.data?.threats) {
          setThreats3D(data.data.threats);
        }
        break;
      case 'ai_analysis_result':
        setAiAnalysisResults(prev => [data.data, ...prev.slice(0, 4)]);
        break;
      default:
        console.log('Unknown WebSocket message type:', data.type);
    }
  };

  const handleAIQuery = async () => {
    if (!aiQuery.trim() || !currentSession) return;

    try {
      await aiAnalysisMutation.mutateAsync({
        sessionId: currentSession.id,
        query: aiQuery,
        contextData: {
          selectedThreat: selectedThreat?.threatId,
          cameraPosition,
          renderingSettings: {
            holographicEffects,
            particleEffects,
            renderQuality
          }
        }
      });
      setAiQuery('');
    } catch (error) {
      console.error('AI analysis failed:', error);
    }
  };

  const toggleVoiceListening = () => {
    if (!recognitionRef.current) return;

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const handleThreatClick = (threat: ThreatVisualization3D) => {
    setSelectedThreat(threat);
    toast({
      title: '🎯 Threat Selected',
      description: `Analyzing ${threat.threatId} with AI systems...`
    });

    // Auto-generate AI analysis for clicked threat
    if (currentSession) {
      aiAnalysisMutation.mutate({
        sessionId: currentSession.id,
        query: `Analyze threat ${threat.threatId} and provide detailed risk assessment`,
        contextData: { selectedThreat: threat.threatId }
      });
    }
  };

  const handleThreatHover = (threat: ThreatVisualization3D | null) => {
    setHoveredThreat(threat);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white overflow-hidden">
      {/* Header */}
      <div className="relative z-10 bg-black/20 backdrop-blur-sm border-b border-cyan-500/30 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center animate-pulse">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1">
                <div className={`w-3 h-3 rounded-full ${wsConnectionStatus === 'connected' ? 'bg-green-400' : 'bg-red-400'} animate-pulse`}></div>
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                CypherHUM Interface
              </h1>
              <p className="text-sm text-gray-400">Revolutionary 3D Holographic AI Threat Visualization</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Badge variant={isSessionActive ? "default" : "secondary"} data-testid="session-status">
              {isSessionActive ? '🟢 Active Session' : '🔴 No Session'}
            </Badge>
            <Badge variant="outline" data-testid="websocket-status">
              WS: {wsConnectionStatus}
            </Badge>
            {dashboardData && (
              <Badge variant="outline" data-testid="threats-count">
                Threats: {threats3D.length}
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* Main Interface */}
      <div className="flex h-[calc(100vh-80px)]">
        {/* Left Sidebar - AI Interface */}
        <div className="w-80 bg-black/40 backdrop-blur-sm border-r border-cyan-500/30 p-4 overflow-y-auto">
          <Tabs defaultValue="ai-command" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="ai-command" data-testid="ai-command-tab">
                <Bot className="w-4 h-4 mr-2" />
                AI Command
              </TabsTrigger>
              <TabsTrigger value="settings" data-testid="settings-tab">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </TabsTrigger>
            </TabsList>

            <TabsContent value="ai-command" className="space-y-4">
              {/* AI Query Interface */}
              <Card className="bg-black/50 border-cyan-500/30">
                <CardHeader>
                  <CardTitle className="flex items-center text-cyan-400">
                    <Command className="w-5 h-5 mr-2" />
                    AI Command Interface
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Switch
                      checked={voiceEnabled}
                      onCheckedChange={setVoiceEnabled}
                      data-testid="voice-enabled-switch"
                    />
                    <span className="text-sm">Voice Input</span>
                    {voiceEnabled && (
                      <Button
                        size="sm"
                        variant={isListening ? "destructive" : "default"}
                        onClick={toggleVoiceListening}
                        data-testid="voice-toggle-button"
                      >
                        {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                      </Button>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Textarea
                      placeholder="Ask AI about threats, request analysis, or command the holographic interface..."
                      value={aiQuery}
                      onChange={(e) => setAiQuery(e.target.value)}
                      className="min-h-20 bg-black/50 border-gray-600 text-white placeholder-gray-400"
                      data-testid="ai-query-input"
                    />
                    <Button
                      onClick={handleAIQuery}
                      disabled={!aiQuery.trim() || aiAnalysisMutation.isPending || !currentSession}
                      className="w-full"
                      data-testid="submit-ai-query"
                    >
                      {aiAnalysisMutation.isPending ? (
                        <>
                          <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <Zap className="w-4 h-4 mr-2" />
                          Process with AI
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* AI Analysis Results */}
              {aiAnalysisResults.length > 0 && (
                <Card className="bg-black/50 border-purple-500/30">
                  <CardHeader>
                    <CardTitle className="flex items-center text-purple-400">
                      <Brain className="w-5 h-5 mr-2" />
                      AI Analysis Results
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 max-h-60 overflow-y-auto">
                    {aiAnalysisResults.map((result, index) => (
                      <div key={index} className="p-3 bg-black/50 rounded border border-purple-500/20">
                        <div className="text-sm text-purple-300 mb-1">
                          Query: {result.naturalLanguageQuery}
                        </div>
                        <div className="text-xs text-gray-400 mb-2">
                          Confidence: {result.aiResponse.confidence}% | Time: {result.processingTime}ms
                        </div>
                        <div className="text-sm text-white">
                          {result.aiResponse.analysis}
                        </div>
                        {result.aiResponse.actionableInsights.length > 0 && (
                          <div className="mt-2">
                            <div className="text-xs text-cyan-400 mb-1">Insights:</div>
                            {result.aiResponse.actionableInsights.map((insight, i) => (
                              <div key={i} className="text-xs text-gray-300">• {insight}</div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="settings" className="space-y-4">
              {/* Rendering Settings */}
              <Card className="bg-black/50 border-cyan-500/30">
                <CardHeader>
                  <CardTitle className="flex items-center text-cyan-400">
                    <Eye className="w-5 h-5 mr-2" />
                    Visualization Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Holographic Effects</span>
                    <Switch
                      checked={holographicEffects}
                      onCheckedChange={setHolographicEffects}
                      data-testid="holographic-effects-switch"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm">Particle Systems</span>
                    <Switch
                      checked={particleEffects}
                      onCheckedChange={setParticleEffects}
                      data-testid="particle-effects-switch"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm">Real-time Updates</span>
                    <Switch
                      checked={realTimeUpdates}
                      onCheckedChange={setRealTimeUpdates}
                      data-testid="realtime-updates-switch"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm">Render Quality</label>
                    <Select value={renderQuality} onValueChange={(value: any) => setRenderQuality(value)}>
                      <SelectTrigger data-testid="render-quality-select">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="ultra">Ultra</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm">Camera Position</label>
                    <div className="grid grid-cols-3 gap-2">
                      <Input
                        type="number"
                        placeholder="X"
                        value={cameraPosition[0]}
                        onChange={(e) => setCameraPosition([parseFloat(e.target.value) || 0, cameraPosition[1], cameraPosition[2]])}
                        className="text-xs"
                        data-testid="camera-x-input"
                      />
                      <Input
                        type="number"
                        placeholder="Y"
                        value={cameraPosition[1]}
                        onChange={(e) => setCameraPosition([cameraPosition[0], parseFloat(e.target.value) || 0, cameraPosition[2]])}
                        className="text-xs"
                        data-testid="camera-y-input"
                      />
                      <Input
                        type="number"
                        placeholder="Z"
                        value={cameraPosition[2]}
                        onChange={(e) => setCameraPosition([cameraPosition[0], cameraPosition[1], parseFloat(e.target.value) || 0])}
                        className="text-xs"
                        data-testid="camera-z-input"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Session Controls */}
              <Card className="bg-black/50 border-yellow-500/30">
                <CardHeader>
                  <CardTitle className="flex items-center text-yellow-400">
                    <Activity className="w-5 h-5 mr-2" />
                    Session Controls
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {!isSessionActive ? (
                    <Button
                      onClick={initializeSession}
                      disabled={createSessionMutation.isPending}
                      className="w-full"
                      data-testid="start-session-button"
                    >
                      {createSessionMutation.isPending ? (
                        <>
                          <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                          Initializing...
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4 mr-2" />
                          Start Session
                        </>
                      )}
                    </Button>
                  ) : (
                    <div className="space-y-2">
                      <div className="text-xs text-gray-400">
                        Session ID: {currentSession?.id?.slice(-8)}
                      </div>
                      <div className="text-xs text-gray-400">
                        Threats Visualized: {threats3D.length}
                      </div>
                      <div className="text-xs text-gray-400">
                        AI Interactions: {aiAnalysisResults.length}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Central 3D Visualization */}
        <div className="flex-1 relative">
          {isSessionActive ? (
            <Holographic3DRenderer
              className="w-full h-full"
              threats={threats3D}
              onThreatClick={handleThreatClick}
              onThreatHover={handleThreatHover}
              cameraPosition={cameraPosition}
              enableHolographicEffects={holographicEffects}
              enableParticles={particleEffects}
              renderQuality={renderQuality}
              realTimeUpdates={realTimeUpdates}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-black/20">
              <div className="text-center">
                <Brain className="w-20 h-20 text-cyan-400 mx-auto mb-4 animate-pulse" />
                <h2 className="text-2xl font-bold text-cyan-400 mb-2">CypherHUM Awaiting Initialization</h2>
                <p className="text-gray-400">Start a session to activate the holographic interface</p>
              </div>
            </div>
          )}
        </div>

        {/* Right Sidebar - Threat Details */}
        <div className="w-80 bg-black/40 backdrop-blur-sm border-l border-cyan-500/30 p-4 overflow-y-auto">
          <Card className="bg-black/50 border-cyan-500/30">
            <CardHeader>
              <CardTitle className="flex items-center text-cyan-400">
                <Target className="w-5 h-5 mr-2" />
                Threat Intelligence
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {selectedThreat ? (
                <div className="space-y-3" data-testid="selected-threat-details">
                  <div>
                    <div className="text-sm font-semibold text-cyan-300">Threat ID</div>
                    <div className="text-sm text-gray-300">{selectedThreat.threatId}</div>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-cyan-300">3D Position</div>
                    <div className="text-sm text-gray-300">
                      [{selectedThreat.position.map(p => p.toFixed(1)).join(', ')}]
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-cyan-300">Scale Factor</div>
                    <div className="text-sm text-gray-300">
                      {selectedThreat.severity3DMapping.sizeMultiplier}x
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-cyan-300">Material Properties</div>
                    <div className="text-sm text-gray-300">
                      Color: {selectedThreat.materialProperties.color}<br/>
                      Opacity: {selectedThreat.materialProperties.opacity}<br/>
                      Emissive: {selectedThreat.materialProperties.emissive}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-cyan-300">Animation Data</div>
                    <div className="text-sm text-gray-300">
                      Movement: {selectedThreat.animationData.movement?.type || 'Static'}<br/>
                      Pulsing: {selectedThreat.animationData.pulsing?.enabled ? 'Enabled' : 'Disabled'}<br/>
                      Particles: {selectedThreat.animationData.particles?.enabled ? `${selectedThreat.animationData.particles.count} particles` : 'Disabled'}
                    </div>
                  </div>
                  <Button
                    onClick={() => setSelectedThreat(null)}
                    variant="outline"
                    className="w-full"
                    data-testid="deselect-threat-button"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Clear Selection
                  </Button>
                </div>
              ) : hoveredThreat ? (
                <div className="space-y-2" data-testid="hovered-threat-details">
                  <div className="text-sm font-semibold text-yellow-300">Hovered Threat</div>
                  <div className="text-sm text-gray-300">{hoveredThreat.threatId}</div>
                  <div className="text-xs text-gray-400">
                    Click to select and analyze
                  </div>
                </div>
              ) : (
                <div className="text-center text-gray-400 py-8" data-testid="no-threat-selected">
                  <Target className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <div className="text-sm">Hover or click on threats in the 3D space to view details</div>
                </div>
              )}

              {/* Quick Actions */}
              {selectedThreat && (
                <div className="space-y-2 pt-4 border-t border-gray-700">
                  <Button
                    size="sm"
                    onClick={() => {
                      if (currentSession) {
                        aiAnalysisMutation.mutate({
                          sessionId: currentSession.id,
                          query: `Provide comprehensive risk assessment for threat ${selectedThreat.threatId}`,
                          contextData: { selectedThreat: selectedThreat.threatId }
                        });
                      }
                    }}
                    className="w-full"
                    data-testid="analyze-threat-button"
                  >
                    <Brain className="w-4 h-4 mr-2" />
                    AI Deep Analysis
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setCameraPosition([
                        selectedThreat.position[0],
                        selectedThreat.position[1] + 5,
                        selectedThreat.position[2] + 10
                      ]);
                    }}
                    className="w-full"
                    data-testid="focus-camera-button"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Focus Camera
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Performance Metrics */}
          {isSessionActive && (
            <Card className="bg-black/50 border-green-500/30 mt-4">
              <CardHeader>
                <CardTitle className="flex items-center text-green-400">
                  <Activity className="w-5 h-5 mr-2" />
                  System Performance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-xs space-y-1">
                  <div className="flex justify-between">
                    <span>WebSocket</span>
                    <Badge variant={wsConnectionStatus === 'connected' ? 'default' : 'destructive'}>
                      {wsConnectionStatus}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>3D Objects</span>
                    <span>{threats3D.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Render Quality</span>
                    <span className="capitalize">{renderQuality}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Effects</span>
                    <span>
                      {holographicEffects ? '🌟' : '⭘'} {particleEffects ? '✨' : '⭘'} {realTimeUpdates ? '🔄' : '⭘'}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}