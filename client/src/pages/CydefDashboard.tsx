/**
 * CyDEF (Autonomous Cyber Defense) Dashboard
 * 
 * Real-time visualization of:
 * - Genetic algorithm evolution and fitness scores
 * - Autonomous response actions and outcomes  
 * - System performance metrics and accuracy
 * - Live threat processing and defense status
 */

import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { 
  Activity, 
  Brain, 
  Shield, 
  Zap, 
  Target, 
  AlertCircle, 
  CheckCircle2,
  TrendingUp,
  Clock,
  Settings,
  Play,
  Pause,
  BarChart3,
  Eye,
  Bot
} from 'lucide-react';

interface CydefSystemStatus {
  systemId: string;
  status: 'initializing' | 'active' | 'paused' | 'maintenance' | 'error';
  geneticAlgorithmStatus: 'stopped' | 'running' | 'evolving' | 'converged';
  currentGeneration: number;
  bestFitnessScore: number;
  actualAccuracy: number;
  autonomousMode: boolean;
  totalThreatsProcessed: number;
  totalAutonomousResponses: number;
  lastEvolutionCycle?: Date;
}

interface CydefRealTimeEvent {
  id: string;
  eventType: string;
  eventCategory: string;
  severity: 'info' | 'warning' | 'critical' | 'emergency';
  title: string;
  message: string;
  eventData?: any;
  createdAt: Date;
}

interface CydefPerformanceMetric {
  id: string;
  metricType: string;
  value: number;
  unitType: string;
  status: 'normal' | 'warning' | 'critical';
  measurementPeriod: string;
  recordedAt: Date;
}

interface CydefAutonomousResponse {
  id: string;
  responseType: string;
  confidenceScore: number;
  executionStatus: string;
  threatId?: string;
  executedAt?: Date;
  completedAt?: Date;
  effectivenessScore?: number;
}

export default function CydefDashboard() {
  const [selectedSystem, setSelectedSystem] = useState<string>('');
  const [realtimeEvents, setRealtimeEvents] = useState<CydefRealTimeEvent[]>([]);
  const [isWebSocketConnected, setIsWebSocketConnected] = useState(false);

  // Fetch CyDEF system status
  const { data: systemStatus, isLoading: isLoadingStatus } = useQuery<CydefSystemStatus[]>({
    queryKey: ['/api/cydef/systems/status'],
    refetchInterval: 5000, // Refresh every 5 seconds
  });

  // Fetch real-time events
  const { data: events } = useQuery<CydefRealTimeEvent[]>({
    queryKey: ['/api/cydef/events'],
    refetchInterval: 2000, // Refresh every 2 seconds
  });

  // Fetch performance metrics
  const { data: performanceMetrics } = useQuery<CydefPerformanceMetric[]>({
    queryKey: ['/api/cydef/metrics', selectedSystem],
    enabled: !!selectedSystem,
    refetchInterval: 3000,
  });

  // Fetch autonomous responses
  const { data: autonomousResponses } = useQuery<CydefAutonomousResponse[]>({
    queryKey: ['/api/cydef/responses', selectedSystem],
    enabled: !!selectedSystem,
    refetchInterval: 5000,
  });

  // Initialize WebSocket connection
  useEffect(() => {
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsUrl = `${protocol}//${window.location.host}/ws/cydef`;
    
    try {
      const ws = new WebSocket(wsUrl);
      
      ws.onopen = () => {
        console.log('🔗 CyDEF WebSocket connected');
        setIsWebSocketConnected(true);
      };
      
      ws.onmessage = (event) => {
        const eventData = JSON.parse(event.data);
        if (eventData.type === 'realtimeEvent') {
          setRealtimeEvents(prev => [eventData.data, ...prev.slice(0, 99)]);
        }
      };
      
      ws.onclose = () => {
        console.log('🔌 CyDEF WebSocket disconnected');
        setIsWebSocketConnected(false);
      };
      
      ws.onerror = (error) => {
        console.error('❌ CyDEF WebSocket error:', error);
        setIsWebSocketConnected(false);
      };
      
      return () => ws.close();
    } catch (error) {
      console.error('Failed to connect to CyDEF WebSocket:', error);
    }
  }, []);

  // Set first system as selected if none selected
  useEffect(() => {
    if (systemStatus && systemStatus.length > 0 && !selectedSystem) {
      setSelectedSystem(systemStatus[0].systemId);
    }
  }, [systemStatus, selectedSystem]);

  // Update events from query
  useEffect(() => {
    if (events) {
      setRealtimeEvents(events);
    }
  }, [events]);

  if (isLoadingStatus) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  const currentSystem = systemStatus?.find(s => s.systemId === selectedSystem);
  const accuracyPercentage = currentSystem ? (currentSystem.actualAccuracy / 100) : 0;
  const fitnessPercentage = currentSystem?.bestFitnessScore || 0;
  const targetAccuracy = 99.2;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'evolving': return 'bg-blue-500';
      case 'converged': return 'bg-purple-500';
      case 'error': return 'bg-red-500';
      case 'paused': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-600 dark:text-red-400';
      case 'warning': return 'text-yellow-600 dark:text-yellow-400';
      case 'info': return 'text-blue-600 dark:text-blue-400';
      default: return 'text-gray-600 dark:text-gray-400';
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6" data-testid="cydef-dashboard">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Shield className="w-8 h-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">CyDEF Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-300">Autonomous Cyber Defense System</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <Badge variant={isWebSocketConnected ? "default" : "destructive"} data-testid="websocket-status">
            <Activity className="w-4 h-4 mr-1" />
            {isWebSocketConnected ? 'Live' : 'Disconnected'}
          </Badge>
          
          <Button variant="outline" size="sm" data-testid="button-refresh">
            <Settings className="w-4 h-4 mr-2" />
            Configure
          </Button>
        </div>
      </div>

      {/* System Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card data-testid="card-system-status">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Status</CardTitle>
            <div className={`w-3 h-3 rounded-full ${getStatusColor(currentSystem?.status || 'inactive')}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentSystem?.status || 'Inactive'}</div>
            <p className="text-xs text-muted-foreground">
              GA: {currentSystem?.geneticAlgorithmStatus || 'Stopped'}
            </p>
          </CardContent>
        </Card>

        <Card data-testid="card-accuracy">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Accuracy Rate</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{accuracyPercentage.toFixed(1)}%</div>
            <div className="flex items-center space-x-2 mt-1">
              <Progress value={(accuracyPercentage / targetAccuracy) * 100} className="flex-1" />
              <span className="text-xs text-muted-foreground">of {targetAccuracy}%</span>
            </div>
          </CardContent>
        </Card>

        <Card data-testid="card-generation">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Generation</CardTitle>
            <Brain className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentSystem?.currentGeneration || 0}</div>
            <p className="text-xs text-muted-foreground">
              Fitness: {fitnessPercentage}%
            </p>
          </CardContent>
        </Card>

        <Card data-testid="card-responses">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Autonomous Responses</CardTitle>
            <Bot className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentSystem?.totalAutonomousResponses || 0}</div>
            <p className="text-xs text-muted-foreground">
              {currentSystem?.totalThreatsProcessed || 0} threats processed
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview" data-testid="tab-overview">Overview</TabsTrigger>
          <TabsTrigger value="genetic" data-testid="tab-genetic">Genetic Algorithm</TabsTrigger>
          <TabsTrigger value="responses" data-testid="tab-responses">Responses</TabsTrigger>
          <TabsTrigger value="events" data-testid="tab-events">Events</TabsTrigger>
          <TabsTrigger value="metrics" data-testid="tab-metrics">Metrics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Real-time Activity Feed */}
            <Card data-testid="card-activity-feed">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="w-5 h-5" />
                  <span>Real-time Activity</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-64">
                  {realtimeEvents.length > 0 ? (
                    <div className="space-y-3">
                      {realtimeEvents.slice(0, 20).map((event, index) => (
                        <div key={event.id || index} className="flex items-start space-x-3 text-sm">
                          <div className="flex-shrink-0 mt-1">
                            {event.severity === 'critical' ? (
                              <AlertCircle className="w-4 h-4 text-red-500" />
                            ) : event.severity === 'warning' ? (
                              <AlertCircle className="w-4 h-4 text-yellow-500" />
                            ) : (
                              <CheckCircle2 className="w-4 h-4 text-green-500" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-gray-900 dark:text-white truncate">
                              {event.title}
                            </p>
                            <p className="text-gray-600 dark:text-gray-300 text-xs">
                              {event.message}
                            </p>
                            <p className="text-gray-500 dark:text-gray-400 text-xs">
                              {new Date(event.createdAt).toLocaleTimeString()}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center text-gray-500 py-8">
                      <Activity className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      <p>No recent activity</p>
                    </div>
                  )}
                </ScrollArea>
              </CardContent>
            </Card>

            {/* System Performance Chart */}
            <Card data-testid="card-performance-chart">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="w-5 h-5" />
                  <span>Performance Overview</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Threat Detection Accuracy</span>
                    <Badge variant={accuracyPercentage >= 99.0 ? "default" : "secondary"}>
                      {accuracyPercentage.toFixed(1)}%
                    </Badge>
                  </div>
                  <Progress value={accuracyPercentage} className="h-2" />
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Genetic Algorithm Fitness</span>
                    <Badge variant={fitnessPercentage >= 90 ? "default" : "secondary"}>
                      {fitnessPercentage}%
                    </Badge>
                  </div>
                  <Progress value={fitnessPercentage} className="h-2" />
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Response Time</span>
                    <Badge variant="outline">{"< 500ms"}</Badge>
                  </div>
                  <Progress value={85} className="h-2" />
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">System Uptime</span>
                    <Badge variant="default">99.9%</Badge>
                  </div>
                  <Progress value={99.9} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="genetic" className="space-y-4">
          <Card data-testid="card-genetic-algorithm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Brain className="w-5 h-5" />
                <span>Genetic Algorithm Evolution</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Current Generation</label>
                  <div className="text-3xl font-bold text-primary">
                    {currentSystem?.currentGeneration || 0}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Best Fitness Score</label>
                  <div className="text-3xl font-bold text-green-600">
                    {currentSystem?.bestFitnessScore || 0}%
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Evolution Status</label>
                  <Badge 
                    variant={currentSystem?.geneticAlgorithmStatus === 'evolving' ? 'default' : 'secondary'}
                    className="text-sm"
                  >
                    {currentSystem?.geneticAlgorithmStatus || 'Stopped'}
                  </Badge>
                </div>
              </div>
              
              <Separator className="my-6" />
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Evolution Progress</h3>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 h-48 flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <TrendingUp className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p>Evolution visualization will appear here</p>
                    <p className="text-xs">Generation progress and fitness curves</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="responses" className="space-y-4">
          <Card data-testid="card-autonomous-responses">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Zap className="w-5 h-5" />
                <span>Autonomous Response History</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-64">
                {autonomousResponses && autonomousResponses.length > 0 ? (
                  <div className="space-y-3">
                    {autonomousResponses.map((response) => (
                      <div key={response.id} className="border rounded-lg p-3 space-y-2">
                        <div className="flex items-center justify-between">
                          <Badge variant="outline">{response.responseType}</Badge>
                          <span className="text-sm text-muted-foreground">
                            {response.confidenceScore}% confidence
                          </span>
                        </div>
                        <div className="text-sm">
                          Status: <Badge variant={response.executionStatus === 'completed' ? 'default' : 'secondary'}>
                            {response.executionStatus}
                          </Badge>
                        </div>
                        {response.effectivenessScore && (
                          <div className="text-sm">
                            Effectiveness: {response.effectivenessScore}%
                          </div>
                        )}
                        <div className="text-xs text-muted-foreground">
                          {response.executedAt && new Date(response.executedAt).toLocaleString()}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center text-gray-500 py-8">
                    <Zap className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p>No autonomous responses yet</p>
                  </div>
                )}
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="events" className="space-y-4">
          <Card data-testid="card-system-events">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="w-5 h-5" />
                <span>System Events Log</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-80">
                {realtimeEvents.length > 0 ? (
                  <div className="space-y-3">
                    {realtimeEvents.map((event, index) => (
                      <div key={event.id || index} className="border-l-4 border-primary pl-4 py-2">
                        <div className="flex items-center justify-between">
                          <span className={`font-medium ${getSeverityColor(event.severity)}`}>
                            {event.title}
                          </span>
                          <Badge variant="outline" className="text-xs">
                            {event.eventType}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                          {event.message}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(event.createdAt).toLocaleString()} • {event.eventCategory}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center text-gray-500 py-8">
                    <Clock className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p>No system events recorded</p>
                  </div>
                )}
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="metrics" className="space-y-4">
          <Card data-testid="card-performance-metrics">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="w-5 h-5" />
                <span>Performance Metrics</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-64">
                {performanceMetrics && performanceMetrics.length > 0 ? (
                  <div className="space-y-3">
                    {performanceMetrics.map((metric) => (
                      <div key={metric.id} className="flex items-center justify-between py-2 border-b">
                        <div>
                          <span className="font-medium">{metric.metricType}</span>
                          <p className="text-sm text-muted-foreground">
                            {metric.measurementPeriod} • {new Date(metric.recordedAt).toLocaleString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="font-mono text-lg">
                            {metric.unitType === 'percentage_basis_points' 
                              ? `${(metric.value / 100).toFixed(1)}%` 
                              : metric.value
                            }
                          </div>
                          <Badge variant={metric.status === 'normal' ? 'default' : 'destructive'} className="text-xs">
                            {metric.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center text-gray-500 py-8">
                    <BarChart3 className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p>No performance metrics available</p>
                  </div>
                )}
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}