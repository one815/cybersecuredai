/**
 * Unified System Status Component
 * 
 * Displays real-time operational status of all four revolutionary cybersecurity systems:
 * - CyDEF (Genetic AI Defense)
 * - Live Location (Asset Tracking)  
 * - CypherHUM (3D Holographic Interface)
 * - ACDS (Autonomous Cyber Defense Swarm)
 */

import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { 
  Brain, 
  MapPin, 
  Eye, 
  Drone,
  Shield,
  Zap,
  Activity,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Clock,
  TrendingUp,
  Wifi,
  WifiOff
} from 'lucide-react';

interface SystemStatus {
  systemId: string;
  systemName: string;
  status: 'operational' | 'degraded' | 'maintenance' | 'offline';
  healthScore: number;
  webSocketStatus: 'connected' | 'disconnected' | 'connecting';
  lastUpdate: string;
  activeConnections: number;
  systemMetrics: {
    uptime: number;
    performance: number;
    availability: number;
  };
}

interface UnifiedSystemData {
  cydef: {
    status: 'active' | 'paused' | 'error';
    geneticAlgorithmStatus: string;
    currentGeneration: number;
    bestFitnessScore: number;
    actualAccuracy: number;
    autonomousMode: boolean;
    totalThreatsProcessed: number;
  };
  liveLocation: {
    totalDevices: number;
    onlineDevices: number;
    activeAlerts: number;
    geofences: number;
    averageResponseTime: number;
  };
  cypherHum: {
    activeSessions: number;
    threatsVisualized: number;
    aiInteractions: number;
    holographicEffects: boolean;
    renderQuality: string;
  };
  acds: {
    totalDrones: number;
    activeDrones: number;
    activeDeployments: number;
    completedMissions: number;
    swarmCoordination: string;
    averageBatteryLevel: number;
  };
}

export default function UnifiedSystemStatus() {
  const [webSocketStatuses, setWebSocketStatuses] = useState<Record<string, 'connected' | 'disconnected' | 'connecting'>>({});

  // Fetch unified system status data
  const { data: systemStatuses, isLoading } = useQuery<SystemStatus[]>({
    queryKey: ['/api/unified/system-status'],
    refetchInterval: 5000,
  });

  // Fetch system-specific data
  const { data: unifiedData } = useQuery<UnifiedSystemData>({
    queryKey: ['/api/unified/system-data'],
    refetchInterval: 3000,
  });

  // Monitor WebSocket connections for all systems
  useEffect(() => {
    const systems = ['cydef', 'live-location', 'cypherhum', 'acds'];
    const wsConnections: Record<string, WebSocket> = {};

    systems.forEach(system => {
      const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
      const wsUrl = `${protocol}//${window.location.host}/ws/${system}`;
      
      try {
        const ws = new WebSocket(wsUrl);
        
        ws.onopen = () => {
          setWebSocketStatuses(prev => ({ ...prev, [system]: 'connected' }));
        };
        
        ws.onclose = () => {
          setWebSocketStatuses(prev => ({ ...prev, [system]: 'disconnected' }));
        };
        
        ws.onerror = () => {
          setWebSocketStatuses(prev => ({ ...prev, [system]: 'disconnected' }));
        };
        
        wsConnections[system] = ws;
      } catch (error) {
        setWebSocketStatuses(prev => ({ ...prev, [system]: 'disconnected' }));
      }
    });

    return () => {
      Object.values(wsConnections).forEach(ws => ws.close());
    };
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational':
      case 'active':
      case 'connected':
        return 'text-green-400 bg-green-900/20 border-green-500/30';
      case 'degraded':
      case 'paused':
      case 'connecting':
        return 'text-yellow-400 bg-yellow-900/20 border-yellow-500/30';
      case 'maintenance':
        return 'text-blue-400 bg-blue-900/20 border-blue-500/30';
      case 'offline':
      case 'error':
      case 'disconnected':
        return 'text-red-400 bg-red-900/20 border-red-500/30';
      default:
        return 'text-gray-400 bg-gray-900/20 border-gray-500/30';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'operational':
      case 'active':
      case 'connected':
        return <CheckCircle2 className="w-4 h-4" />;
      case 'degraded':
      case 'paused':
      case 'connecting':
        return <AlertTriangle className="w-4 h-4" />;
      case 'maintenance':
        return <Clock className="w-4 h-4" />;
      case 'offline':
      case 'error':
      case 'disconnected':
        return <XCircle className="w-4 h-4" />;
      default:
        return <Activity className="w-4 h-4" />;
    }
  };

  const getWebSocketIcon = (status: 'connected' | 'disconnected' | 'connecting') => {
    switch (status) {
      case 'connected':
        return <Wifi className="w-3 h-3 text-green-400" />;
      case 'connecting':
        return <Wifi className="w-3 h-3 text-yellow-400 animate-pulse" />;
      case 'disconnected':
        return <WifiOff className="w-3 h-3 text-red-400" />;
    }
  };

  const systemConfigs = [
    {
      id: 'cydef',
      name: 'CyDEF Genetic AI',
      icon: Brain,
      description: 'Autonomous Cyber Defense with Genetic Algorithms',
      color: 'from-purple-500 to-violet-600',
      data: unifiedData?.cydef
    },
    {
      id: 'live-location',
      name: 'Live Location Tracking',
      icon: MapPin,
      description: 'Real-time Asset & Threat Geolocation',
      color: 'from-blue-500 to-cyan-600',
      data: unifiedData?.liveLocation
    },
    {
      id: 'cypherhum',
      name: 'CypherHUM Interface',
      icon: Eye,
      description: '3D Holographic Threat Visualization',
      color: 'from-green-500 to-teal-600',
      data: unifiedData?.cypherHum
    },
    {
      id: 'acds',
      name: 'ACDS Drone Swarm',
      icon: Drone,
      description: 'Autonomous Cyber Defense Swarm',
      color: 'from-orange-500 to-red-600',
      data: unifiedData?.acds
    }
  ];

  if (isLoading) {
    return (
      <Card className="bg-black/50 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center space-x-2">
            <Shield className="w-5 h-5 text-cyan-400" />
            <span>System Status</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-20 bg-gray-800 rounded"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-black/50 border-gray-700 backdrop-blur-sm" data-testid="unified-system-status">
      <CardHeader>
        <CardTitle className="text-white flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Shield className="w-5 h-5 text-cyan-400" />
            <span>Federal Cybersecurity Platform Status</span>
          </div>
          <Badge variant="outline" className="text-green-400 border-green-500/30 bg-green-900/20">
            <CheckCircle2 className="w-3 h-3 mr-1" />
            All Systems Operational
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {systemConfigs.map((system, index) => {
          const status = systemStatuses?.find(s => s.systemId === system.id);
          const wsStatus = webSocketStatuses[system.id] || 'disconnected';
          const SystemIcon = system.icon;

          return (
            <div 
              key={system.id}
              className="group relative bg-gray-900/30 border border-gray-700/50 rounded-lg p-4 hover:border-cyan-500/30 transition-all duration-300"
              data-testid={`system-status-${system.id}`}
            >
              {/* System Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg bg-gradient-to-r ${system.color} bg-opacity-20`}>
                    <SystemIcon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{system.name}</h3>
                    <p className="text-xs text-gray-400">{system.description}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {getWebSocketIcon(wsStatus)}
                  <Badge className={getStatusColor(status?.status || 'offline')}>
                    {getStatusIcon(status?.status || 'offline')}
                    <span className="ml-1 text-xs font-medium">
                      {(status?.status || 'offline').toUpperCase()}
                    </span>
                  </Badge>
                </div>
              </div>

              {/* System Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {system.id === 'cydef' && system.data && (
                  <>
                    <div className="text-center">
                      <div className="text-lg font-bold text-white">{system.data.currentGeneration}</div>
                      <div className="text-xs text-gray-400">Generation</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-white">{system.data.actualAccuracy}%</div>
                      <div className="text-xs text-gray-400">Accuracy</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-white">{system.data.totalThreatsProcessed}</div>
                      <div className="text-xs text-gray-400">Threats Processed</div>
                    </div>
                    <div className="text-center">
                      <Badge variant={system.data.autonomousMode ? "default" : "secondary"} className="w-full text-xs">
                        {system.data.autonomousMode ? 'AUTONOMOUS' : 'MANUAL'}
                      </Badge>
                    </div>
                  </>
                )}

                {system.id === 'live-location' && system.data && (
                  <>
                    <div className="text-center">
                      <div className="text-lg font-bold text-white">{system.data.totalDevices}</div>
                      <div className="text-xs text-gray-400">Total Devices</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-green-400">{system.data.onlineDevices}</div>
                      <div className="text-xs text-gray-400">Online</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-yellow-400">{system.data.activeAlerts}</div>
                      <div className="text-xs text-gray-400">Active Alerts</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-white">{system.data.geofences}</div>
                      <div className="text-xs text-gray-400">Geofences</div>
                    </div>
                  </>
                )}

                {system.id === 'cypherhum' && system.data && (
                  <>
                    <div className="text-center">
                      <div className="text-lg font-bold text-white">{system.data.activeSessions}</div>
                      <div className="text-xs text-gray-400">Active Sessions</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-white">{system.data.threatsVisualized}</div>
                      <div className="text-xs text-gray-400">Threats Visualized</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-white">{system.data.aiInteractions}</div>
                      <div className="text-xs text-gray-400">AI Interactions</div>
                    </div>
                    <div className="text-center">
                      <Badge variant={system.data.holographicEffects ? "default" : "secondary"} className="w-full text-xs">
                        {system.data.renderQuality.toUpperCase()}
                      </Badge>
                    </div>
                  </>
                )}

                {system.id === 'acds' && system.data && (
                  <>
                    <div className="text-center">
                      <div className="text-lg font-bold text-white">{system.data.totalDrones}</div>
                      <div className="text-xs text-gray-400">Total Drones</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-green-400">{system.data.activeDrones}</div>
                      <div className="text-xs text-gray-400">Active</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-white">{system.data.activeDeployments}</div>
                      <div className="text-xs text-gray-400">Deployments</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-white">{system.data.averageBatteryLevel}%</div>
                      <div className="text-xs text-gray-400">Avg Battery</div>
                    </div>
                  </>
                )}
              </div>

              {/* Health Score Progress */}
              {status && (
                <div className="mt-3 space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">System Health</span>
                    <span className="text-white">{status.healthScore}%</span>
                  </div>
                  <Progress 
                    value={status.healthScore} 
                    className="h-2"
                    data-testid={`health-progress-${system.id}`}
                  />
                </div>
              )}
            </div>
          );
        })}

        {/* Overall Platform Status */}
        <div className="mt-6 pt-4 border-t border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4 text-green-400" />
              <span className="text-sm text-gray-300">Platform Performance</span>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className="text-cyan-400 border-cyan-500/30 hover:bg-cyan-500/10"
              data-testid="button-view-detailed-status"
            >
              View Detailed Status
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}