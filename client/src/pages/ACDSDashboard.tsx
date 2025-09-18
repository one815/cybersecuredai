/**
 * ACDS (Autonomous Cyber Defense Swarm) Dashboard
 * 
 * Advanced federal cybersecurity drone swarm coordination interface featuring:
 * - Real-time 3D drone swarm visualization and fleet monitoring
 * - Interactive drone positioning and status monitoring with map integration
 * - Live swarm coordination controls and autonomous mission management
 * - Integration with CyDEF genetic algorithms for threat response
 * - WebSocket-powered real-time coordination updates
 * - Federal-grade mission planning and analytics
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { apiRequest } from '@/lib/queryClient';
import Holographic3DRenderer from '@/components/Holographic3DRenderer';

// Icons for the advanced interface
import { 
  Drone,
  Shield,
  Target,
  Activity,
  Brain,
  Zap,
  Eye,
  Navigation,
  Command,
  Settings,
  Play,
  Pause,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  Battery,
  Wifi,
  MapPin,
  Layers,
  BarChart3,
  TrendingUp,
  AlertCircle,
  Bot,
  Network,
  Globe,
  Radar,
  Radio,
  Satellite,
  MonitorSpeaker,
  Crosshair,
  FlightTakeoff,
  FlightLand,
  RefreshCw,
  Download,
  Upload,
  Filter,
  Search,
  Plus,
  Minus,
  Maximize,
  Minimize,
  RotateCcw,
  Volume2,
  VolumeX
} from 'lucide-react';

// Type definitions for ACDS data structures
interface AcdsDrone {
  id: string;
  droneId: string;
  droneName: string;
  droneType: 'threat_hunter' | 'cyber_patrol' | 'response_unit' | 'surveillance' | 'coordinator';
  category: 'autonomous' | 'semi_autonomous' | 'manual';
  currentStatus: 'active' | 'standby' | 'maintenance' | 'charging' | 'patrol' | 'returning' | 'offline' | 'emergency';
  operationalHealth: number;
  batteryLevel: number;
  currentLatitude?: string;
  currentLongitude?: string;
  currentAltitude?: number;
  swarmRole: 'leader' | 'scout' | 'guardian' | 'specialist' | 'coordinator' | 'follower';
  autonomyLevel: 'manual' | 'semi_autonomous' | 'autonomous';
  cydefIntegration: boolean;
  capabilities: any;
  threatDetectionCapabilities: string[];
  communicationChannels: string[];
  defensiveCapabilities: string[];
  signalStrength: number;
  networkStatus: string;
  assignedMissionId?: string;
  lastLocationUpdate: string;
  lastStatusUpdate: string;
}

interface AcdsSwarmMission {
  id: string;
  missionName: string;
  missionType: 'threat_response' | 'perimeter_patrol' | 'network_scan' | 'incident_investigation' | 'proactive_hunt' | 'emergency_response';
  priority: 'low' | 'medium' | 'high' | 'critical' | 'emergency';
  status: 'planning' | 'active' | 'paused' | 'completed' | 'aborted' | 'failed';
  missionDescription: string;
  targetArea: {
    centerLatitude: string;
    centerLongitude: string;
    radius: number;
    boundaries?: any[];
  };
  objectives: any[];
  estimatedDuration: number;
  requiredDroneCount: number;
  assignedDrones: string[];
  coordinationAlgorithm: string;
  autonomyLevel: string;
  cydefIntegration: any;
  plannedStartTime?: string;
  plannedEndTime?: string;
  actualStartTime?: string;
  actualEndTime?: string;
  createdAt: string;
  updatedAt: string;
}

interface AcdsDeployment {
  id: string;
  deploymentId: string;
  droneId: string;
  missionId?: string;
  deploymentType: string;
  deploymentStatus: 'preparing' | 'deploying' | 'active' | 'returning' | 'completed' | 'failed' | 'emergency_recall';
  currentLatitude?: string;
  currentLongitude?: string;
  currentAltitude?: number;
  targetLatitude: string;
  targetLongitude: string;
  targetAltitude: number;
  batteryConsumption: number;
  sensorReadings: any;
  threatDetections: any[];
  lastHeartbeat: string;
  deploymentStartTime: string;
  createdAt: string;
  updatedAt: string;
}

interface DroneFleetStatus {
  totalDrones: number;
  activeDrones: number;
  standbyDrones: number;
  maintenanceDrones: number;
  offlineDrones: number;
  chargingDrones: number;
  emergencyDrones: number;
  averageBatteryLevel: number;
  averageHealthScore: number;
  activeDeployments: number;
  completedMissions: number;
  swarmCoordination: string;
}

interface ACDSAnalytics {
  missionSuccessRate: number;
  averageResponseTime: number;
  swarmEfficiencyScore: number;
  threatDetectionAccuracy: number;
  autonomousDecisionAccuracy: number;
  droneUtilizationRate: number;
  batteryEfficiencyScore: number;
  communicationReliability: number;
  coordinationAlgorithmPerformance: any;
  cydefIntegrationEffectiveness: number;
}

interface SwarmTelemetry {
  timestamp: string;
  fleetStatus: DroneFleetStatus;
  activeDeployments: number;
  realTimeData: {
    dronesOnline: number;
    missionsActive: number;
    averageBattery: number;
    swarmCoordination: string;
    systemStatus: string;
  };
  deploymentUpdates: Array<{
    deploymentId: string;
    droneId: string;
    status: string;
    position: {
      latitude?: string;
      longitude?: string;
      altitude?: number;
    };
    batteryLevel: number;
    lastUpdate: string;
  }>;
}

declare global {
  interface Window {
    google: any;
  }
}

export default function ACDSDashboard() {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  // State management
  const [selectedTab, setSelectedTab] = useState('overview');
  const [selectedDrone, setSelectedDrone] = useState<string>('');
  const [isWebSocketConnected, setIsWebSocketConnected] = useState(false);
  const [swarmTelemetry, setSwarmTelemetry] = useState<SwarmTelemetry | null>(null);
  const [is3DViewActive, setIs3DViewActive] = useState(true);
  const [mapCenter, setMapCenter] = useState({ lat: 38.8951, lng: -77.0364 }); // Washington DC
  const [mapZoom, setMapZoom] = useState(12);
  const [selectedMission, setSelectedMission] = useState<string>('');
  const [showEmergencyControls, setShowEmergencyControls] = useState(false);
  const [coordinationAlgorithm, setCoordinationAlgorithm] = useState('ai_optimized');
  const [autonomyLevel, setAutonomyLevel] = useState('autonomous');
  
  // Refs for map and 3D visualization
  const mapRef = useRef<HTMLDivElement>(null);
  const googleMapRef = useRef<any>(null);
  const droneMarkers = useRef<Map<string, any>>(new Map());

  // Fetch drone fleet data
  const { data: drones, isLoading: isDronesLoading } = useQuery<AcdsDrone[]>({
    queryKey: ['/api/acds/drones'],
    refetchInterval: 3000, // Refresh every 3 seconds
  });

  // Fetch drone fleet status
  const { data: fleetStatus, isLoading: isFleetLoading } = useQuery<DroneFleetStatus>({
    queryKey: ['/api/acds/drones/status'],
    refetchInterval: 2000, // Refresh every 2 seconds
  });

  // Fetch active missions
  const { data: missions, isLoading: isMissionsLoading } = useQuery<AcdsSwarmMission[]>({
    queryKey: ['/api/acds/swarm-missions'],
    refetchInterval: 5000, // Refresh every 5 seconds
  });

  // Fetch active deployments
  const { data: deployments, isLoading: isDeploymentsLoading } = useQuery<AcdsDeployment[]>({
    queryKey: ['/api/acds/deployments'],
    refetchInterval: 2000, // Refresh every 2 seconds
  });

  // Fetch analytics data
  const { data: analytics } = useQuery<ACDSAnalytics>({
    queryKey: ['/api/acds/analytics'],
    refetchInterval: 10000, // Refresh every 10 seconds
  });

  // Fetch dashboard data (comprehensive)
  const { data: dashboardData } = useQuery({
    queryKey: ['/api/acds/dashboard'],
    refetchInterval: 5000, // Refresh every 5 seconds
  });

  // Fetch real-time telemetry
  const { data: telemetryData } = useQuery<SwarmTelemetry>({
    queryKey: ['/api/acds/telemetry'],
    refetchInterval: 1000, // Refresh every 1 second for real-time data
  });

  // Drone deployment mutation
  const deployDroneMutation = useMutation({
    mutationFn: async ({ droneId, deploymentData }: { droneId: string; deploymentData: any }) => {
      return apiRequest(`/api/acds/drones/${droneId}/deploy`, {
        method: 'POST',
        body: JSON.stringify(deploymentData),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/acds/drones'] });
      queryClient.invalidateQueries({ queryKey: ['/api/acds/deployments'] });
      toast({
        title: "Drone Deployed",
        description: "Drone deployment initiated successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Deployment Failed",
        description: error.message || "Failed to deploy drone",
        variant: "destructive",
      });
    },
  });

  // Mission creation mutation
  const createMissionMutation = useMutation({
    mutationFn: async (missionData: any) => {
      return apiRequest('/api/acds/swarm-missions', {
        method: 'POST',
        body: JSON.stringify(missionData),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/acds/swarm-missions'] });
      toast({
        title: "Mission Created",
        description: "Swarm mission created successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Mission Creation Failed",
        description: error.message || "Failed to create mission",
        variant: "destructive",
      });
    },
  });

  // Emergency recall mutation
  const emergencyRecallMutation = useMutation({
    mutationFn: async ({ reason, droneIds }: { reason: string; droneIds?: string[] }) => {
      return apiRequest('/api/acds/emergency/recall', {
        method: 'POST',
        body: JSON.stringify({ reason, droneIds }),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/acds/drones'] });
      queryClient.invalidateQueries({ queryKey: ['/api/acds/deployments'] });
      toast({
        title: "Emergency Recall Initiated",
        description: "All drones are returning to base",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Emergency Recall Failed",
        description: error.message || "Failed to initiate emergency recall",
        variant: "destructive",
      });
    },
  });

  // Coordination trigger mutation
  const coordinationTriggerMutation = useMutation({
    mutationFn: async ({ coordinationType, parameters }: { coordinationType: string; parameters: any }) => {
      return apiRequest('/api/acds/coordination/trigger', {
        method: 'POST',
        body: JSON.stringify({ coordinationType, parameters }),
      });
    },
    onSuccess: () => {
      toast({
        title: "Coordination Triggered",
        description: "Swarm coordination algorithm initiated",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Coordination Failed",
        description: error.message || "Failed to trigger coordination",
        variant: "destructive",
      });
    },
  });

  // Initialize WebSocket connection for real-time updates
  useEffect(() => {
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsUrl = `${protocol}//${window.location.host}/ws/acds`;
    
    try {
      const ws = new WebSocket(wsUrl);
      
      ws.onopen = () => {
        console.log('🚁 ACDS WebSocket connected');
        setIsWebSocketConnected(true);
      };
      
      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          
          switch (data.type) {
            case 'swarm_telemetry':
              setSwarmTelemetry(data.payload);
              break;
            case 'drone_status_update':
              queryClient.invalidateQueries({ queryKey: ['/api/acds/drones'] });
              break;
            case 'mission_update':
              queryClient.invalidateQueries({ queryKey: ['/api/acds/swarm-missions'] });
              break;
            case 'deployment_update':
              queryClient.invalidateQueries({ queryKey: ['/api/acds/deployments'] });
              break;
            case 'coordination_decision':
              // Handle real-time coordination decisions
              toast({
                title: "Swarm Coordination Update",
                description: `${data.payload.decisionType} executed with ${data.payload.confidence}% confidence`,
              });
              break;
            case 'emergency_alert':
              toast({
                title: "Emergency Alert",
                description: data.payload.message,
                variant: "destructive",
              });
              break;
            default:
              console.log('Unknown ACDS WebSocket message:', data);
          }
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
        }
      };
      
      ws.onclose = () => {
        console.log('🚁 ACDS WebSocket disconnected');
        setIsWebSocketConnected(false);
      };
      
      ws.onerror = (error) => {
        console.error('🚁 ACDS WebSocket error:', error);
        setIsWebSocketConnected(false);
      };
      
      return () => {
        ws.close();
      };
    } catch (error) {
      console.error('Failed to initialize ACDS WebSocket:', error);
    }
  }, [queryClient, toast]);

  // Initialize Google Maps for drone positioning
  useEffect(() => {
    if (!mapRef.current || googleMapRef.current) return;

    const initMap = () => {
      if (!window.google) {
        console.warn('Google Maps not loaded');
        return;
      }

      googleMapRef.current = new window.google.maps.Map(mapRef.current, {
        center: mapCenter,
        zoom: mapZoom,
        mapTypeId: 'hybrid', // Shows satellite view with labels
        styles: [
          {
            featureType: 'all',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#ffffff' }]
          },
          {
            featureType: 'all',
            elementType: 'labels.text.stroke',
            stylers: [{ color: '#000000' }, { weight: 2 }]
          }
        ]
      });
    };

    if (window.google) {
      initMap();
    } else {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&libraries=geometry`;
      script.onload = initMap;
      document.head.appendChild(script);
    }
  }, [mapCenter, mapZoom]);

  // Update drone markers on map
  useEffect(() => {
    if (!googleMapRef.current || !drones) return;

    // Clear existing markers
    droneMarkers.current.forEach(marker => marker.setMap(null));
    droneMarkers.current.clear();

    // Add drone markers
    drones.forEach(drone => {
      if (drone.currentLatitude && drone.currentLongitude) {
        const position = {
          lat: parseFloat(drone.currentLatitude),
          lng: parseFloat(drone.currentLongitude)
        };

        const marker = new window.google.maps.Marker({
          position,
          map: googleMapRef.current,
          title: `${drone.droneName} (${drone.droneId})`,
          icon: {
            path: 'M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z', // Star shape for drone
            fillColor: getStatusColor(drone.currentStatus),
            fillOpacity: 0.8,
            strokeColor: '#000000',
            strokeWeight: 1,
            scale: 1.5,
          }
        });

        const infoWindow = new window.google.maps.InfoWindow({
          content: `
            <div style="color: black;">
              <h3>${drone.droneName}</h3>
              <p><strong>ID:</strong> ${drone.droneId}</p>
              <p><strong>Status:</strong> ${drone.currentStatus}</p>
              <p><strong>Battery:</strong> ${drone.batteryLevel}%</p>
              <p><strong>Health:</strong> ${drone.operationalHealth}%</p>
              <p><strong>Role:</strong> ${drone.swarmRole}</p>
              <p><strong>Altitude:</strong> ${drone.currentAltitude || 0}m</p>
            </div>
          `
        });

        marker.addListener('click', () => {
          infoWindow.open(googleMapRef.current, marker);
          setSelectedDrone(drone.droneId);
        });

        droneMarkers.current.set(drone.droneId, marker);
      }
    });
  }, [drones]);

  // Helper function to get status color
  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'active': return '#00ff00';
      case 'standby': return '#ffff00';
      case 'patrol': return '#00ffff';
      case 'returning': return '#ff8800';
      case 'charging': return '#0088ff';
      case 'maintenance': return '#888888';
      case 'offline': return '#ff0000';
      case 'emergency': return '#ff0000';
      default: return '#888888';
    }
  };

  // Helper function to get priority color
  const getPriorityColor = (priority: string): string => {
    switch (priority) {
      case 'emergency': return 'destructive';
      case 'critical': return 'destructive';
      case 'high': return 'destructive';
      case 'medium': return 'secondary';
      case 'low': return 'outline';
      default: return 'outline';
    }
  };

  // Helper function to get status badge variant
  const getStatusBadgeVariant = (status: string): "default" | "secondary" | "destructive" | "outline" => {
    switch (status) {
      case 'active':
      case 'completed':
        return 'default';
      case 'standby':
      case 'planning':
      case 'paused':
        return 'secondary';
      case 'emergency':
      case 'failed':
      case 'aborted':
      case 'offline':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  // Handle drone deployment
  const handleDeployDrone = useCallback((droneId: string, targetLat: number, targetLng: number) => {
    const deploymentData = {
      deploymentType: 'manual_deployment',
      targetLatitude: targetLat.toString(),
      targetLongitude: targetLng.toString(),
      targetAltitude: 150, // Default altitude
      missionId: selectedMission || null,
    };

    deployDroneMutation.mutate({ droneId, deploymentData });
  }, [deployDroneMutation, selectedMission]);

  // Handle emergency recall
  const handleEmergencyRecall = useCallback((reason: string) => {
    emergencyRecallMutation.mutate({ reason });
  }, [emergencyRecallMutation]);

  // Handle coordination trigger
  const handleCoordinationTrigger = useCallback((type: string) => {
    coordinationTriggerMutation.mutate({
      coordinationType: type,
      parameters: {
        algorithm: coordinationAlgorithm,
        autonomyLevel: autonomyLevel,
      },
    });
  }, [coordinationTriggerMutation, coordinationAlgorithm, autonomyLevel]);

  // Prepare 3D visualization data for drones
  const get3DVisualizationData = useCallback(() => {
    if (!drones) return [];

    return drones.map(drone => ({
      id: drone.droneId,
      position: [
        parseFloat(drone.currentLatitude || '0'),
        parseFloat(drone.currentLongitude || '0'),
        (drone.currentAltitude || 0) / 1000 // Convert to km for visualization
      ] as [number, number, number],
      scale: [1, 1, 1] as [number, number, number],
      rotation: [0, 0, 0] as [number, number, number],
      materialProperties: {
        color: getStatusColor(drone.currentStatus),
        opacity: 0.8,
        emissive: getStatusColor(drone.currentStatus),
        wireframe: false,
        holographicShader: true,
      },
      animationData: {
        movement: { enabled: drone.currentStatus === 'active' },
        pulsing: { enabled: true, speed: drone.currentStatus === 'emergency' ? 2 : 1 },
        particles: { enabled: drone.currentStatus === 'active' },
      },
      interactionBehavior: {
        hoverData: {
          title: drone.droneName,
          details: `Status: ${drone.currentStatus}, Battery: ${drone.batteryLevel}%`
        },
        clickActions: { selectDrone: drone.droneId },
      },
      severity3DMapping: {
        sizeMultiplier: drone.currentStatus === 'emergency' ? 1.5 : 1,
        colorIntensity: drone.operationalHealth / 100,
        animationSpeed: drone.currentStatus === 'active' ? 1.2 : 0.8,
      },
    }));
  }, [drones]);

  if (isDronesLoading && isFleetLoading && isMissionsLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-black text-green-400">
        <div className="text-center">
          <Drone className="h-16 w-16 animate-spin mx-auto mb-4" />
          <p className="text-xl font-mono">Initializing ACDS Command Center...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-green-400 p-6" data-testid="acds-dashboard">
      {/* Header with connection status */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Drone className="h-8 w-8" />
              <h1 className="text-3xl font-bold font-mono">ACDS Command Center</h1>
            </div>
            <div className="flex items-center space-x-2">
              <div className={`h-3 w-3 rounded-full ${isWebSocketConnected ? 'bg-green-400' : 'bg-red-400'}`} />
              <span className="text-sm font-mono">
                {isWebSocketConnected ? 'SWARM LINK ACTIVE' : 'SWARM LINK OFFLINE'}
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              variant={showEmergencyControls ? "destructive" : "outline"}
              onClick={() => setShowEmergencyControls(!showEmergencyControls)}
              data-testid="button-emergency-toggle"
            >
              <AlertTriangle className="h-4 w-4 mr-2" />
              Emergency Controls
            </Button>
            <Button
              variant="outline"
              onClick={() => setIs3DViewActive(!is3DViewActive)}
              data-testid="button-toggle-3d"
            >
              <Eye className="h-4 w-4 mr-2" />
              {is3DViewActive ? '3D View' : 'Map View'}
            </Button>
          </div>
        </div>
      </div>

      {/* Emergency Controls Panel */}
      {showEmergencyControls && (
        <Alert className="mb-6 border-red-500 bg-red-950 text-red-400">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <div className="flex items-center justify-between">
              <span className="font-bold">EMERGENCY PROTOCOLS ACTIVE</span>
              <div className="flex space-x-2">
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleEmergencyRecall('manual_emergency')}
                  data-testid="button-emergency-recall"
                >
                  <FlightLand className="h-4 w-4 mr-2" />
                  RECALL ALL DRONES
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowEmergencyControls(false)}
                  data-testid="button-emergency-close"
                >
                  Close
                </Button>
              </div>
            </div>
          </AlertDescription>
        </Alert>
      )}

      {/* Main Dashboard Content */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-6 bg-gray-900 border border-gray-700">
          <TabsTrigger value="overview" className="text-green-400" data-testid="tab-overview">
            <BarChart3 className="h-4 w-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="fleet" className="text-green-400" data-testid="tab-fleet">
            <Drone className="h-4 w-4 mr-2" />
            Fleet
          </TabsTrigger>
          <TabsTrigger value="missions" className="text-green-400" data-testid="tab-missions">
            <Target className="h-4 w-4 mr-2" />
            Missions
          </TabsTrigger>
          <TabsTrigger value="coordination" className="text-green-400" data-testid="tab-coordination">
            <Brain className="h-4 w-4 mr-2" />
            Coordination
          </TabsTrigger>
          <TabsTrigger value="analytics" className="text-green-400" data-testid="tab-analytics">
            <TrendingUp className="h-4 w-4 mr-2" />
            Analytics
          </TabsTrigger>
          <TabsTrigger value="3d-viz" className="text-green-400" data-testid="tab-3d-viz">
            <Globe className="h-4 w-4 mr-2" />
            3D View
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Fleet Status Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="bg-gray-900 border-gray-700" data-testid="card-total-drones">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">Total Drones</CardTitle>
                <Drone className="h-4 w-4 text-green-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-400">
                  {fleetStatus?.totalDrones || 0}
                </div>
                <p className="text-xs text-gray-500">
                  {fleetStatus?.activeDrones || 0} active
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-700" data-testid="card-active-missions">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">Active Missions</CardTitle>
                <Target className="h-4 w-4 text-blue-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-400">
                  {missions?.filter(m => m.status === 'active').length || 0}
                </div>
                <p className="text-xs text-gray-500">
                  {missions?.length || 0} total missions
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-700" data-testid="card-avg-battery">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">Avg Battery</CardTitle>
                <Battery className="h-4 w-4 text-yellow-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-400">
                  {Math.round(fleetStatus?.averageBatteryLevel || 0)}%
                </div>
                <Progress 
                  value={fleetStatus?.averageBatteryLevel || 0} 
                  className="mt-2"
                />
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-700" data-testid="card-system-health">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">System Health</CardTitle>
                <Activity className="h-4 w-4 text-green-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-400">
                  {Math.round(fleetStatus?.averageHealthScore || 0)}%
                </div>
                <p className="text-xs text-gray-500">
                  All systems operational
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Real-time Map and Status */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Drone Position Map */}
            <Card className="bg-gray-900 border-gray-700" data-testid="card-drone-map">
              <CardHeader>
                <CardTitle className="text-green-400 flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  Live Drone Positions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div 
                  ref={mapRef} 
                  className="w-full h-96 bg-gray-800 rounded-lg"
                  data-testid="drone-position-map"
                />
              </CardContent>
            </Card>

            {/* Active Deployments */}
            <Card className="bg-gray-900 border-gray-700" data-testid="card-active-deployments">
              <CardHeader>
                <CardTitle className="text-green-400 flex items-center">
                  <FlightTakeoff className="h-5 w-5 mr-2" />
                  Active Deployments
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-96">
                  {deployments && deployments.length > 0 ? (
                    <div className="space-y-4">
                      {deployments.map((deployment) => (
                        <div 
                          key={deployment.id} 
                          className="p-4 bg-gray-800 rounded-lg border border-gray-600"
                          data-testid={`deployment-${deployment.deploymentId}`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-mono text-sm text-green-400">
                              {deployment.deploymentId}
                            </span>
                            <Badge variant={getStatusBadgeVariant(deployment.deploymentStatus)}>
                              {deployment.deploymentStatus}
                            </Badge>
                          </div>
                          <div className="text-sm text-gray-400">
                            <p>Drone: {deployment.droneId}</p>
                            <p>Type: {deployment.deploymentType}</p>
                            <p>Started: {new Date(deployment.deploymentStartTime).toLocaleTimeString()}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center text-gray-500 py-8">
                      No active deployments
                    </div>
                  )}
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Fleet Management Tab */}
        <TabsContent value="fleet" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-green-400">Drone Fleet Management</h2>
            <div className="flex items-center space-x-4">
              <Select value={selectedDrone} onValueChange={setSelectedDrone}>
                <SelectTrigger className="w-64 bg-gray-800 border-gray-600">
                  <SelectValue placeholder="Select drone for details" />
                </SelectTrigger>
                <SelectContent>
                  {drones?.map((drone) => (
                    <SelectItem key={drone.droneId} value={drone.droneId}>
                      {drone.droneName} ({drone.droneId})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button 
                variant="outline"
                onClick={() => queryClient.invalidateQueries({ queryKey: ['/api/acds/drones'] })}
                data-testid="button-refresh-fleet"
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Drone Fleet Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {drones?.map((drone) => (
              <Card 
                key={drone.droneId} 
                className={`bg-gray-900 border-gray-700 ${selectedDrone === drone.droneId ? 'border-green-400' : ''}`}
                data-testid={`drone-card-${drone.droneId}`}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-green-400 text-lg">
                      {drone.droneName}
                    </CardTitle>
                    <Badge variant={getStatusBadgeVariant(drone.currentStatus)}>
                      {drone.currentStatus}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-400 font-mono">{drone.droneId}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-400">Type</p>
                      <p className="text-green-400">{drone.droneType}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Role</p>
                      <p className="text-green-400">{drone.swarmRole}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Battery</p>
                      <div className="flex items-center space-x-2">
                        <Progress value={drone.batteryLevel} className="flex-1" />
                        <span className="text-yellow-400">{drone.batteryLevel}%</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-gray-400">Health</p>
                      <div className="flex items-center space-x-2">
                        <Progress value={drone.operationalHealth} className="flex-1" />
                        <span className="text-green-400">{drone.operationalHealth}%</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-400">Signal</p>
                      <div className="flex items-center space-x-2">
                        <Wifi className="h-4 w-4 text-blue-400" />
                        <span className="text-blue-400">{drone.signalStrength}%</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-gray-400">Network</p>
                      <span className="text-blue-400">{drone.networkStatus}</span>
                    </div>
                  </div>

                  {drone.currentLatitude && drone.currentLongitude && (
                    <div className="text-sm">
                      <p className="text-gray-400">Position</p>
                      <p className="text-green-400 font-mono">
                        {parseFloat(drone.currentLatitude).toFixed(4)}, {parseFloat(drone.currentLongitude).toFixed(4)}
                      </p>
                      <p className="text-gray-400">Alt: {drone.currentAltitude || 0}m</p>
                    </div>
                  )}

                  <div className="flex space-x-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      disabled={drone.currentStatus === 'offline'}
                      onClick={() => setSelectedDrone(drone.droneId)}
                      data-testid={`button-select-${drone.droneId}`}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Details
                    </Button>
                    <Button 
                      size="sm" 
                      variant="default"
                      disabled={drone.currentStatus === 'offline' || drone.currentStatus === 'maintenance'}
                      onClick={() => handleDeployDrone(drone.droneId, mapCenter.lat, mapCenter.lng)}
                      data-testid={`button-deploy-${drone.droneId}`}
                    >
                      <FlightTakeoff className="h-4 w-4 mr-2" />
                      Deploy
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Missions Tab */}
        <TabsContent value="missions" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-green-400">Swarm Mission Control</h2>
            <Button 
              onClick={() => {
                // Create new mission logic would go here
                createMissionMutation.mutate({
                  missionName: `Auto Mission ${Date.now()}`,
                  missionType: 'perimeter_patrol',
                  priority: 'medium',
                  status: 'planning',
                  missionDescription: 'Automated perimeter patrol mission',
                  targetArea: {
                    centerLatitude: mapCenter.lat.toString(),
                    centerLongitude: mapCenter.lng.toString(),
                    radius: 1000,
                  },
                  objectives: [{ type: 'patrol', status: 'pending' }],
                  estimatedDuration: 3600,
                  requiredDroneCount: 2,
                  assignedDrones: [],
                  coordinationAlgorithm: 'ai_optimized',
                  autonomyLevel: 'autonomous',
                  cydefIntegration: { enabled: true },
                  realTimeReporting: true,
                });
              }}
              data-testid="button-create-mission"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Mission
            </Button>
          </div>

          {/* Mission Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {missions?.map((mission) => (
              <Card 
                key={mission.id} 
                className="bg-gray-900 border-gray-700"
                data-testid={`mission-card-${mission.id}`}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-green-400">
                      {mission.missionName}
                    </CardTitle>
                    <Badge variant={getPriorityColor(mission.priority) as any}>
                      {mission.priority}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Badge variant={getStatusBadgeVariant(mission.status)}>
                      {mission.status}
                    </Badge>
                    <span className="text-sm text-gray-400">{mission.missionType}</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-300">{mission.missionDescription}</p>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-400">Duration</p>
                      <p className="text-green-400">{Math.round(mission.estimatedDuration / 60)} min</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Drones Required</p>
                      <p className="text-green-400">{mission.requiredDroneCount}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Assigned</p>
                      <p className="text-green-400">{mission.assignedDrones.length}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Algorithm</p>
                      <p className="text-green-400">{mission.coordinationAlgorithm}</p>
                    </div>
                  </div>

                  <div className="text-sm">
                    <p className="text-gray-400">Target Area</p>
                    <p className="text-green-400 font-mono">
                      {parseFloat(mission.targetArea.centerLatitude).toFixed(4)}, {parseFloat(mission.targetArea.centerLongitude).toFixed(4)}
                    </p>
                    <p className="text-gray-400">Radius: {mission.targetArea.radius}m</p>
                  </div>

                  {mission.objectives && mission.objectives.length > 0 && (
                    <div className="text-sm">
                      <p className="text-gray-400 mb-2">Objectives</p>
                      <div className="space-y-1">
                        {mission.objectives.map((objective, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            {objective.status === 'completed' ? (
                              <CheckCircle className="h-4 w-4 text-green-400" />
                            ) : (
                              <Clock className="h-4 w-4 text-yellow-400" />
                            )}
                            <span className="text-gray-300">{objective.type}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex space-x-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => setSelectedMission(mission.id)}
                      data-testid={`button-select-mission-${mission.id}`}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Details
                    </Button>
                    {mission.status === 'planning' && (
                      <Button 
                        size="sm" 
                        variant="default"
                        onClick={() => {
                          // Start mission logic
                          toast({
                            title: "Mission Started",
                            description: `${mission.missionName} is now active`,
                          });
                        }}
                        data-testid={`button-start-mission-${mission.id}`}
                      >
                        <Play className="h-4 w-4 mr-2" />
                        Start
                      </Button>
                    )}
                    {mission.status === 'active' && (
                      <Button 
                        size="sm" 
                        variant="secondary"
                        onClick={() => {
                          // Pause mission logic
                          toast({
                            title: "Mission Paused",
                            description: `${mission.missionName} has been paused`,
                          });
                        }}
                        data-testid={`button-pause-mission-${mission.id}`}
                      >
                        <Pause className="h-4 w-4 mr-2" />
                        Pause
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Coordination Tab */}
        <TabsContent value="coordination" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-green-400">Swarm Coordination AI</h2>
            <div className="flex items-center space-x-4">
              <Select value={coordinationAlgorithm} onValueChange={setCoordinationAlgorithm}>
                <SelectTrigger className="w-48 bg-gray-800 border-gray-600">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ai_optimized">AI Optimized</SelectItem>
                  <SelectItem value="distributed_consensus">Distributed Consensus</SelectItem>
                  <SelectItem value="leader_follower">Leader-Follower</SelectItem>
                  <SelectItem value="hierarchical">Hierarchical</SelectItem>
                </SelectContent>
              </Select>
              <Select value={autonomyLevel} onValueChange={setAutonomyLevel}>
                <SelectTrigger className="w-48 bg-gray-800 border-gray-600">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="autonomous">Autonomous</SelectItem>
                  <SelectItem value="semi_autonomous">Semi-Autonomous</SelectItem>
                  <SelectItem value="manual">Manual</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Coordination Controls */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-gray-900 border-gray-700" data-testid="card-coordination-control">
              <CardHeader>
                <CardTitle className="text-green-400 flex items-center">
                  <Brain className="h-5 w-5 mr-2" />
                  Coordination Control
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  className="w-full"
                  onClick={() => handleCoordinationTrigger('formation_optimization')}
                  data-testid="button-optimize-formation"
                >
                  <Target className="h-4 w-4 mr-2" />
                  Optimize Formation
                </Button>
                <Button 
                  className="w-full" 
                  variant="outline"
                  onClick={() => handleCoordinationTrigger('role_reassignment')}
                  data-testid="button-reassign-roles"
                >
                  <Bot className="h-4 w-4 mr-2" />
                  Reassign Roles
                </Button>
                <Button 
                  className="w-full" 
                  variant="outline"
                  onClick={() => handleCoordinationTrigger('pattern_analysis')}
                  data-testid="button-analyze-patterns"
                >
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Analyze Patterns
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-700" data-testid="card-coordination-metrics">
              <CardHeader>
                <CardTitle className="text-green-400 flex items-center">
                  <Activity className="h-5 w-5 mr-2" />
                  Coordination Metrics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Response Time</span>
                    <span className="text-green-400">125ms</span>
                  </div>
                  <Progress value={85} />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Success Rate</span>
                    <span className="text-green-400">94.7%</span>
                  </div>
                  <Progress value={94.7} />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Efficiency</span>
                    <span className="text-green-400">91.2%</span>
                  </div>
                  <Progress value={91.2} />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-700" data-testid="card-cydef-integration">
              <CardHeader>
                <CardTitle className="text-green-400 flex items-center">
                  <Shield className="h-5 w-5 mr-2" />
                  CyDEF Integration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Status</span>
                  <Badge variant="default">Active</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Generation</span>
                  <span className="text-green-400">Gen 42</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Fitness Score</span>
                  <span className="text-green-400">87.3%</span>
                </div>
                <div className="space-y-2">
                  <span className="text-gray-400">Threat Response</span>
                  <Progress value={88.9} />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Real-time Coordination Events */}
          <Card className="bg-gray-900 border-gray-700" data-testid="card-coordination-events">
            <CardHeader>
              <CardTitle className="text-green-400 flex items-center">
                <Zap className="h-5 w-5 mr-2" />
                Real-time Coordination Events
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-64">
                <div className="space-y-2 font-mono text-sm">
                  <div className="p-2 bg-gray-800 rounded">
                    <span className="text-green-400">[{new Date().toLocaleTimeString()}]</span>
                    <span className="text-blue-400 ml-2">FORMATION_OPTIMIZED:</span>
                    <span className="text-gray-300 ml-2">Triangular patrol formation activated</span>
                  </div>
                  <div className="p-2 bg-gray-800 rounded">
                    <span className="text-green-400">[{new Date(Date.now() - 30000).toLocaleTimeString()}]</span>
                    <span className="text-yellow-400 ml-2">ROLE_REASSIGNED:</span>
                    <span className="text-gray-300 ml-2">ACDS-BRAVO-002 promoted to scout leader</span>
                  </div>
                  <div className="p-2 bg-gray-800 rounded">
                    <span className="text-green-400">[{new Date(Date.now() - 60000).toLocaleTimeString()}]</span>
                    <span className="text-blue-400 ml-2">SWARM_INITIALIZED:</span>
                    <span className="text-gray-300 ml-2">3 drones synchronized for perimeter patrol</span>
                  </div>
                  <div className="p-2 bg-gray-800 rounded">
                    <span className="text-green-400">[{new Date(Date.now() - 90000).toLocaleTimeString()}]</span>
                    <span className="text-purple-400 ml-2">CYDEF_INTEGRATION:</span>
                    <span className="text-gray-300 ml-2">Genetic algorithm fitness improved to 87.3%</span>
                  </div>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <h2 className="text-2xl font-bold text-green-400">Performance Analytics</h2>

          {/* Analytics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-gray-900 border-gray-700" data-testid="card-mission-success">
              <CardHeader>
                <CardTitle className="text-green-400 flex items-center">
                  <Target className="h-5 w-5 mr-2" />
                  Mission Success Rate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-400">
                  {analytics?.missionSuccessRate ? `${analytics.missionSuccessRate.toFixed(1)}%` : '0%'}
                </div>
                <Progress value={analytics?.missionSuccessRate || 0} className="mt-2" />
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-700" data-testid="card-response-time">
              <CardHeader>
                <CardTitle className="text-green-400 flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  Avg Response Time
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-400">
                  {analytics?.averageResponseTime ? `${Math.round(analytics.averageResponseTime)}ms` : '0ms'}
                </div>
                <p className="text-xs text-gray-500 mt-2">Target: < 200ms</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-700" data-testid="card-swarm-efficiency">
              <CardHeader>
                <CardTitle className="text-green-400 flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Swarm Efficiency
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-400">
                  {analytics?.swarmEfficiencyScore ? `${analytics.swarmEfficiencyScore.toFixed(1)}%` : '0%'}
                </div>
                <Progress value={analytics?.swarmEfficiencyScore || 0} className="mt-2" />
              </CardContent>
            </Card>
          </div>

          {/* Detailed Analytics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-gray-900 border-gray-700" data-testid="card-detailed-metrics">
              <CardHeader>
                <CardTitle className="text-green-400">Detailed Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Threat Detection Accuracy</span>
                    <span className="text-green-400">{analytics?.threatDetectionAccuracy?.toFixed(1) || '0'}%</span>
                  </div>
                  <Progress value={analytics?.threatDetectionAccuracy || 0} />
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Autonomous Decision Accuracy</span>
                    <span className="text-green-400">{analytics?.autonomousDecisionAccuracy?.toFixed(1) || '0'}%</span>
                  </div>
                  <Progress value={analytics?.autonomousDecisionAccuracy || 0} />
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Drone Utilization Rate</span>
                    <span className="text-blue-400">{analytics?.droneUtilizationRate?.toFixed(1) || '0'}%</span>
                  </div>
                  <Progress value={analytics?.droneUtilizationRate || 0} />
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Battery Efficiency</span>
                    <span className="text-yellow-400">{analytics?.batteryEfficiencyScore?.toFixed(1) || '0'}%</span>
                  </div>
                  <Progress value={analytics?.batteryEfficiencyScore || 0} />
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Communication Reliability</span>
                    <span className="text-green-400">{analytics?.communicationReliability?.toFixed(1) || '0'}%</span>
                  </div>
                  <Progress value={analytics?.communicationReliability || 0} />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-700" data-testid="card-system-integration">
              <CardHeader>
                <CardTitle className="text-green-400">System Integration Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-800 rounded">
                    <div className="flex items-center space-x-3">
                      <Shield className="h-5 w-5 text-green-400" />
                      <span className="text-gray-300">CyDEF Integration</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-green-400">{analytics?.cydefIntegrationEffectiveness?.toFixed(1) || '0'}%</span>
                      <CheckCircle className="h-4 w-4 text-green-400" />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-gray-800 rounded">
                    <div className="flex items-center space-x-3">
                      <MapPin className="h-5 w-5 text-blue-400" />
                      <span className="text-gray-300">Live Location</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-green-400">Active</span>
                      <CheckCircle className="h-4 w-4 text-green-400" />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-gray-800 rounded">
                    <div className="flex items-center space-x-3">
                      <Globe className="h-5 w-5 text-purple-400" />
                      <span className="text-gray-300">CypherHUM</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-green-400">Connected</span>
                      <CheckCircle className="h-4 w-4 text-green-400" />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-gray-800 rounded">
                    <div className="flex items-center space-x-3">
                      <Network className="h-5 w-5 text-green-400" />
                      <span className="text-gray-300">WebSocket Swarm Link</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-green-400">{isWebSocketConnected ? 'Active' : 'Offline'}</span>
                      {isWebSocketConnected ? (
                        <CheckCircle className="h-4 w-4 text-green-400" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-400" />
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* 3D Visualization Tab */}
        <TabsContent value="3d-viz" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-green-400">3D Swarm Visualization</h2>
            <div className="flex items-center space-x-4">
              <Button 
                variant="outline"
                onClick={() => setIs3DViewActive(!is3DViewActive)}
                data-testid="button-toggle-3d-view"
              >
                <Eye className="h-4 w-4 mr-2" />
                {is3DViewActive ? 'Disable' : 'Enable'} 3D View
              </Button>
              <Button 
                variant="outline"
                onClick={() => {
                  // Reset 3D view
                  toast({
                    title: "3D View Reset",
                    description: "3D visualization has been reset to default view",
                  });
                }}
                data-testid="button-reset-3d-view"
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {is3DViewActive ? (
            <Card className="bg-gray-900 border-gray-700" data-testid="card-3d-visualization">
              <CardContent className="p-0">
                <div className="h-[600px] relative">
                  <Holographic3DRenderer
                    threatsData={get3DVisualizationData()}
                    is3DActive={is3DViewActive}
                    holographicIntensity={0.8}
                    showParticles={true}
                    showConnections={true}
                    ambientIntensity={0.3}
                    onThreatClick={(threatId) => {
                      const drone = drones?.find(d => d.droneId === threatId);
                      if (drone) {
                        setSelectedDrone(drone.droneId);
                        toast({
                          title: "Drone Selected",
                          description: `Selected ${drone.droneName} (${drone.droneId})`,
                        });
                      }
                    }}
                    style={{ width: '100%', height: '100%' }}
                  />
                  
                  {/* 3D View Controls Overlay */}
                  <div className="absolute top-4 right-4 space-y-2">
                    <Card className="bg-gray-800/90 border-gray-600 p-4">
                      <h3 className="text-green-400 font-bold mb-2">3D Controls</h3>
                      <div className="text-xs text-gray-300 space-y-1">
                        <p>Mouse: Rotate view</p>
                        <p>Wheel: Zoom in/out</p>
                        <p>Right-click: Pan view</p>
                        <p>Click drone: Select details</p>
                      </div>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="bg-gray-900 border-gray-700">
              <CardContent className="p-8 text-center">
                <Globe className="h-16 w-16 text-gray-500 mx-auto mb-4" />
                <h3 className="text-xl text-gray-400 mb-2">3D Visualization Disabled</h3>
                <p className="text-gray-500 mb-4">Enable 3D view to see holographic drone swarm visualization</p>
                <Button 
                  onClick={() => setIs3DViewActive(true)}
                  data-testid="button-enable-3d"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Enable 3D View
                </Button>
              </CardContent>
            </Card>
          )}

          {/* 3D Visualization Legend */}
          <Card className="bg-gray-900 border-gray-700" data-testid="card-3d-legend">
            <CardHeader>
              <CardTitle className="text-green-400">Visualization Legend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded bg-green-400"></div>
                  <span className="text-gray-300">Active</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded bg-yellow-400"></div>
                  <span className="text-gray-300">Standby</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded bg-cyan-400"></div>
                  <span className="text-gray-300">Patrol</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded bg-orange-400"></div>
                  <span className="text-gray-300">Returning</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded bg-blue-400"></div>
                  <span className="text-gray-300">Charging</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded bg-gray-400"></div>
                  <span className="text-gray-300">Maintenance</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded bg-red-400"></div>
                  <span className="text-gray-300">Offline</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded bg-red-600 animate-pulse"></div>
                  <span className="text-gray-300">Emergency</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}