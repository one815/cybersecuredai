import { useState, useEffect, useRef, useCallback } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { apiRequest } from "@/lib/queryClient";
import {
  MapPin,
  Search,
  Filter,
  RefreshCw,
  AlertTriangle,
  Eye,
  EyeOff,
  Settings,
  Activity,
  Monitor,
  Smartphone,
  Server,
  Router,
  Camera,
  Shield,
  Zap,
  Clock,
  TrendingUp,
  Navigation,
  Target,
  Globe,
  Layers,
  BarChart3,
  Info,
  Plus,
  Play,
  Pause,
  Download,
  CheckCircle,
  XCircle,
  AlertCircle
} from "lucide-react";

// Type definitions for Live Location data
interface LiveLocationDevice {
  id: string;
  deviceName: string;
  deviceType: string;
  deviceCategory: string;
  ipAddress?: string;
  macAddress?: string;
  status: 'online' | 'offline' | 'maintenance' | 'decommissioned' | 'lost' | 'stolen';
  lastSeen?: string;
  healthScore: number;
  criticalAsset: boolean;
  locationTrackingEnabled: boolean;
  organizationId: string;
  createdAt: string;
  updatedAt: string;
}

interface LiveLocationHistory {
  id: string;
  deviceId: string;
  latitude?: string;
  longitude?: string;
  address?: string;
  city?: string;
  country?: string;
  locationMethod: string;
  accuracy?: number;
  recordedAt: string;
  isInsideGeofence: boolean;
  geofenceIds: string[];
}

interface LiveLocationAlert {
  id: string;
  alertType: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'active' | 'acknowledged' | 'resolved';
  deviceId?: string;
  alertTitle: string;
  alertDescription?: string;
  currentLocation?: any;
  createdAt: string;
  acknowledgedAt?: string;
}

interface LiveLocationGeoFence {
  id: string;
  name: string;
  description?: string;
  fenceType: 'circular' | 'polygon';
  centerLatitude?: string;
  centerLongitude?: string;
  radius?: number;
  polygonCoordinates?: any;
  isActive: boolean;
  alertOnEntry: boolean;
  alertOnExit: boolean;
  securityLevel: string;
  createdAt: string;
}

interface DashboardStats {
  totalDevices: number;
  onlineDevices: number;
  criticalDevices: number;
  activeAlerts: number;
  geofences: number;
  trackedAssets: number;
  networkSegments: number;
  locationUpdatesLast24h: number;
  averageResponseTime: number;
}

declare global {
  interface Window {
    google: any;
  }
}

export default function LiveLocationDashboard() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { user, isAuthenticated, isLoading: authLoading, login } = useAuth();
  const mapRef = useRef<HTMLDivElement>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [map, setMap] = useState<any>(null);
  const [markers, setMarkers] = useState<any[]>([]);
  const [geofenceOverlays, setGeofenceOverlays] = useState<any[]>([]);
  const [isMapReady, setIsMapReady] = useState(false);
  const [mapsFallbackMode, setMapsFallbackMode] = useState(false);
  const [realTimeEnabled, setRealTimeEnabled] = useState(true);
  const [wsConnected, setWsConnected] = useState(false);
  const [wsReconnectAttempts, setWsReconnectAttempts] = useState(0);
  const [selectedDevice, setSelectedDevice] = useState<LiveLocationDevice | null>(null);
  const [mapView, setMapView] = useState<'satellite' | 'roadmap' | 'hybrid'>('satellite');
  const [showGeofences, setShowGeofences] = useState(true);
  const [showDeviceLabels, setShowDeviceLabels] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterDeviceType, setFilterDeviceType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Fetch dashboard data - gate on authentication state, use WebSocket when connected, fallback to polling
  const { data: dashboardData, isLoading: loadingDashboard, refetch: refetchDashboard, error: dashboardError } = useQuery({
    queryKey: ['/api/live-location/dashboard'],
    enabled: isAuthenticated, // Only fetch when authenticated
    refetchInterval: (realTimeEnabled && !wsConnected && isAuthenticated) ? 10000 : false, // Only poll if WebSocket not connected and authenticated
    retry: (failureCount, error: any) => {
      // Don't retry on 401 errors - authentication issue
      if (error?.response?.status === 401) return false;
      return failureCount < 3;
    }
  });

  // Fetch devices with filtering - gate on authentication state, use WebSocket when connected, fallback to polling
  const { data: devicesData, isLoading: loadingDevices, refetch: refetchDevices, error: devicesError } = useQuery({
    queryKey: (() => {
      const baseUrl = '/api/live-location/devices';
      const params = new URLSearchParams();
      if (filterStatus !== 'all') params.append('status', filterStatus);
      if (filterDeviceType !== 'all') params.append('deviceType', filterDeviceType);
      if (searchQuery) params.append('search', searchQuery);
      const queryString = params.toString();
      return [queryString ? `${baseUrl}?${queryString}` : baseUrl];
    })(),
    enabled: isAuthenticated, // Only fetch when authenticated
    refetchInterval: (realTimeEnabled && !wsConnected && isAuthenticated) ? 15000 : false, // Only poll if WebSocket not connected and authenticated
    retry: (failureCount, error: any) => {
      // Don't retry on 401 errors - authentication issue
      if (error?.response?.status === 401) return false;
      return failureCount < 3;
    }
  });

  // Fetch alerts - gate on authentication state, use WebSocket when connected, fallback to polling
  const { data: alertsData, isLoading: loadingAlerts, refetch: refetchAlerts, error: alertsError } = useQuery({
    queryKey: ['/api/live-location/alerts'],
    enabled: isAuthenticated, // Only fetch when authenticated
    refetchInterval: (realTimeEnabled && !wsConnected && isAuthenticated) ? 5000 : false, // Only poll if WebSocket not connected and authenticated
    retry: (failureCount, error: any) => {
      // Don't retry on 401 errors - authentication issue
      if (error?.response?.status === 401) return false;
      return failureCount < 3;
    }
  });

  // Fetch geofences - gate on authentication state
  const { data: geofencesData, isLoading: loadingGeofences, error: geofencesError } = useQuery({
    queryKey: ['/api/live-location/geofences'],
    enabled: isAuthenticated, // Only fetch when authenticated
    retry: (failureCount, error: any) => {
      // Don't retry on 401 errors - authentication issue
      if (error?.response?.status === 401) return false;
      return failureCount < 3;
    }
  });

  // WebSocket connection and real-time updates
  useEffect(() => {
    if (!realTimeEnabled) return;

    const connectWebSocket = () => {
      const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
      
      // Get authentication token from localStorage
      const token = localStorage.getItem('auth_token');
      if (!token) {
        console.warn('📍 No authentication token found, WebSocket connection skipped');
        toast({
          title: "Authentication Required",
          description: "Please log in to enable real-time location tracking.",
          variant: "destructive"
        });
        return;
      }
      
      // Include token in WebSocket URL as query parameter
      const wsUrl = `${protocol}//${window.location.host}/ws/live-location?token=${encodeURIComponent(token)}`;
      
      try {
        const ws = new WebSocket(wsUrl);
        wsRef.current = ws;
        
        ws.onopen = () => {
          console.log('📍 Live Location WebSocket connected');
          setWsConnected(true);
          setWsReconnectAttempts(0);
          
          // Subscribe to live location events
          ws.send(JSON.stringify({
            type: 'subscribe',
            events: ['locationUpdate', 'deviceStatusChange', 'alertUpdate', 'statsUpdate']
          }));
          
          // Request initial stats
          ws.send(JSON.stringify({ type: 'requestStats' }));
          
          toast({
            title: "Real-time Updates Connected",
            description: "WebSocket connection established for live location tracking.",
          });
        };
        
        ws.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            handleWebSocketMessage(data);
          } catch (error) {
            console.error('❌ Error parsing WebSocket message:', error);
          }
        };
        
        ws.onerror = (error) => {
          console.error('❌ Live Location WebSocket error:', error);
          setWsConnected(false);
        };
        
        ws.onclose = (event) => {
          console.log('📍 Live Location WebSocket disconnected', event.code, event.reason);
          setWsConnected(false);
          wsRef.current = null;
          
          // Handle authentication-related close codes
          if (event.code === 1008) {
            console.error('❌ WebSocket authentication failed:', event.reason);
            toast({
              title: "Authentication Failed",
              description: "Real-time updates require valid authentication. Please log in again.",
              variant: "destructive"
            });
            return; // Don't attempt reconnection for auth failures
          }
          
          // Attempt to reconnect with exponential backoff for other failures
          if (realTimeEnabled && wsReconnectAttempts < 5) {
            const backoffDelay = Math.min(1000 * Math.pow(2, wsReconnectAttempts), 30000);
            setWsReconnectAttempts(prev => prev + 1);
            
            reconnectTimeoutRef.current = setTimeout(() => {
              console.log(`🔄 Attempting WebSocket reconnection (${wsReconnectAttempts + 1}/5)...`);
              connectWebSocket();
            }, backoffDelay);
          } else if (wsReconnectAttempts >= 5) {
            toast({
              title: "Connection Failed",
              description: "WebSocket connection failed. Falling back to polling for updates.",
              variant: "destructive"
            });
          }
        };
      } catch (error) {
        console.error('❌ Failed to create WebSocket connection:', error);
        setWsConnected(false);
      }
    };
    
    connectWebSocket();
    
    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [realTimeEnabled, toast]);
  
  // Handle WebSocket messages and update cache
  const handleWebSocketMessage = useCallback((data: any) => {
    switch (data.type) {
      case 'locationUpdate':
        // Invalidate devices query to trigger refetch with new location
        queryClient.invalidateQueries({ queryKey: ['/api/live-location/devices'] });
        break;
      case 'deviceStatusChange':
        // Invalidate relevant queries
        queryClient.invalidateQueries({ queryKey: ['/api/live-location/devices'] });
        queryClient.invalidateQueries({ queryKey: ['/api/live-location/dashboard'] });
        break;
      case 'alertUpdate':
        // Invalidate alerts query
        queryClient.invalidateQueries({ queryKey: ['/api/live-location/alerts'] });
        queryClient.invalidateQueries({ queryKey: ['/api/live-location/dashboard'] });
        
        if (data.data?.severity === 'high' || data.data?.severity === 'critical') {
          toast({
            title: `${data.data.severity.toUpperCase()} Alert`,
            description: data.data.alertTitle || 'New security alert detected',
            variant: "destructive"
          });
        }
        break;
      case 'statsUpdate':
        // Invalidate dashboard stats
        queryClient.invalidateQueries({ queryKey: ['/api/live-location/dashboard'] });
        break;
      case 'pong':
        // Heartbeat response - connection is alive
        break;
      default:
        console.log('📍 Unknown WebSocket message type:', data.type);
    }
  }, [queryClient, toast]);
  
  // Heartbeat to keep WebSocket alive
  useEffect(() => {
    if (!wsConnected || !wsRef.current) return;
    
    const heartbeatInterval = setInterval(() => {
      if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
        wsRef.current.send(JSON.stringify({ type: 'ping', timestamp: new Date().toISOString() }));
      }
    }, 30000); // Send ping every 30 seconds
    
    return () => clearInterval(heartbeatInterval);
  }, [wsConnected]);

  // Load Google Maps script with fallback handling
  useEffect(() => {
    const loadGoogleMaps = () => {
      if (window.google?.maps) {
        setIsMapReady(true);
        return;
      }

      const script = document.createElement('script');
      const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
      if (!apiKey) {
        console.error('Google Maps API key not configured. Please set VITE_GOOGLE_MAPS_API_KEY environment variable.');
        setMapsFallbackMode(true);
        toast({
          title: "Maps Unavailable",
          description: "Google Maps API key not configured. Using list view mode.",
          variant: "destructive"
        });
        return;
      }
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=marker,visualization,geometry,places&callback=initLiveLocationMap&v=weekly`;
      script.async = true;
      script.defer = true;
      
      (window as any).initLiveLocationMap = () => {
        setIsMapReady(true);
      };
      
      script.onerror = () => {
        console.error('Failed to load Google Maps API');
        setMapsFallbackMode(true);
        toast({
          title: "Maps Failed to Load",
          description: "Google Maps could not be loaded. Using list view mode.",
          variant: "destructive"
        });
      };
      
      document.head.appendChild(script);
    };

    loadGoogleMaps();
  }, [toast]);

  // Initialize the map when ready
  useEffect(() => {
    if (!isMapReady || !mapRef.current || map) return;

    const googleMap = new window.google.maps.Map(mapRef.current, {
      center: { lat: 39.8283, lng: -98.5795 }, // Center on US
      zoom: 5,
      mapTypeId: mapView,
      mapId: 'LIVE_LOCATION_MAP_ID',
      tilt: mapView === 'satellite' ? 45 : 0,
      heading: 0,
      styles: [
        {
          "featureType": "administrative",
          "elementType": "labels.text.fill",
          "stylers": [{ "color": "#00ff88" }, { "weight": 1.2 }]
        },
        {
          "featureType": "water",
          "elementType": "labels.text.fill",
          "stylers": [{ "color": "#00d4ff" }]
        }
      ],
      disableDefaultUI: true,
      zoomControl: true,
      mapTypeControl: false,
      fullscreenControl: true,
      streetViewControl: false,
      gestureHandling: 'auto'
    });

    setMap(googleMap);
  }, [isMapReady, map, mapView]);

  // Update device markers on map
  useEffect(() => {
    if (!map || !devicesData?.devices) return;

    // Clear existing markers
    markers.forEach(marker => marker.setMap(null));
    const newMarkers: any[] = [];

    devicesData.devices.forEach((device: LiveLocationDevice) => {
      // Get latest location for device
      if (!device.locationTrackingEnabled) return;

      // For demo purposes, assign random coordinates to devices
      const demoCoordinates = [
        { lat: 37.7749, lng: -122.4194 }, // San Francisco
        { lat: 40.7128, lng: -74.0060 },  // New York
        { lat: 34.0522, lng: -118.2437 }, // Los Angeles
        { lat: 39.7392, lng: -104.9903 }, // Denver
        { lat: 41.8781, lng: -87.6298 },  // Chicago
        { lat: 25.7617, lng: -80.1918 },  // Miami
        { lat: 47.6062, lng: -122.3321 }, // Seattle
        { lat: 30.2672, lng: -97.7431 },  // Austin
      ];
      
      const coords = demoCoordinates[Math.floor(Math.random() * demoCoordinates.length)];

      const getDeviceIcon = (type: string, status: string) => {
        let color = '#4ade80'; // green for online
        if (status === 'offline') color = '#ef4444'; // red
        if (status === 'maintenance') color = '#f59e0b'; // amber
        if (status === 'lost' || status === 'stolen') color = '#dc2626'; // dark red

        const iconPaths: { [key: string]: string } = {
          'server': window.google.maps.SymbolPath.CIRCLE,
          'workstation': window.google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
          'mobile': window.google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
          'iot': window.google.maps.SymbolPath.CIRCLE,
          'router': window.google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
          'camera': window.google.maps.SymbolPath.CIRCLE,
        };

        return {
          path: iconPaths[type] || window.google.maps.SymbolPath.CIRCLE,
          fillColor: color,
          fillOpacity: 0.8,
          strokeColor: color,
          strokeOpacity: 1,
          strokeWeight: 2,
          scale: device.criticalAsset ? 12 : 8
        };
      };

      const marker = new window.google.maps.Marker({
        position: coords,
        map: map,
        icon: getDeviceIcon(device.deviceType, device.status),
        title: `${device.deviceName} (${device.status})`,
        animation: window.google.maps.Animation.DROP
      });

      // Add info window
      const infoWindow = new window.google.maps.InfoWindow({
        content: `
          <div class="p-3 min-w-[200px]">
            <h3 class="font-semibold text-lg mb-2">${device.deviceName}</h3>
            <div class="space-y-1 text-sm">
              <div><strong>Type:</strong> ${device.deviceType}</div>
              <div><strong>Status:</strong> <span class="px-2 py-1 rounded text-xs ${
                device.status === 'online' ? 'bg-green-100 text-green-800' :
                device.status === 'offline' ? 'bg-red-100 text-red-800' :
                'bg-yellow-100 text-yellow-800'
              }">${device.status}</span></div>
              <div><strong>Health:</strong> ${device.healthScore}%</div>
              ${device.ipAddress ? `<div><strong>IP:</strong> ${device.ipAddress}</div>` : ''}
              ${device.lastSeen ? `<div><strong>Last Seen:</strong> ${new Date(device.lastSeen).toLocaleString()}</div>` : ''}
              ${device.criticalAsset ? '<div class="text-red-600 font-semibold">⚠️ Critical Asset</div>' : ''}
            </div>
            <button onclick="window.selectDevice('${device.id}')" 
              class="mt-2 px-3 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600">
              View Details
            </button>
          </div>
        `
      });

      marker.addListener('click', () => {
        infoWindow.open(map, marker);
      });

      if (showDeviceLabels) {
        const label = new window.google.maps.Marker({
          position: { lat: coords.lat + 0.02, lng: coords.lng },
          map: map,
          icon: {
            labelOrigin: new window.google.maps.Point(0, 0),
            size: new window.google.maps.Size(0, 0),
          },
          label: {
            text: device.deviceName,
            color: '#ffffff',
            fontSize: '12px',
            fontWeight: 'bold'
          }
        });
        newMarkers.push(label);
      }

      newMarkers.push(marker);
    });

    setMarkers(newMarkers);

    // Global function for device selection
    (window as any).selectDevice = (deviceId: string) => {
      const device = devicesData.devices.find((d: LiveLocationDevice) => d.id === deviceId);
      if (device) {
        setSelectedDevice(device);
      }
    };
  }, [map, devicesData, showDeviceLabels]);

  // Update geofence overlays
  useEffect(() => {
    if (!map || !geofencesData?.geofences || !showGeofences) return;

    // Clear existing overlays
    geofenceOverlays.forEach(overlay => overlay.setMap(null));
    const newOverlays: any[] = [];

    geofencesData.geofences.forEach((geofence: LiveLocationGeoFence) => {
      if (!geofence.isActive) return;

      let overlay: any;

      if (geofence.fenceType === 'circular' && geofence.centerLatitude && geofence.centerLongitude && geofence.radius) {
        overlay = new window.google.maps.Circle({
          strokeColor: geofence.securityLevel === 'restricted' ? '#dc2626' : 
                      geofence.securityLevel === 'classified' ? '#7c2d12' : '#3b82f6',
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: geofence.securityLevel === 'restricted' ? '#dc2626' : 
                     geofence.securityLevel === 'classified' ? '#7c2d12' : '#3b82f6',
          fillOpacity: 0.15,
          map: map,
          center: {
            lat: parseFloat(geofence.centerLatitude),
            lng: parseFloat(geofence.centerLongitude)
          },
          radius: geofence.radius
        });
      } else if (geofence.fenceType === 'polygon' && geofence.polygonCoordinates) {
        overlay = new window.google.maps.Polygon({
          paths: geofence.polygonCoordinates,
          strokeColor: geofence.securityLevel === 'restricted' ? '#dc2626' : '#3b82f6',
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: geofence.securityLevel === 'restricted' ? '#dc2626' : '#3b82f6',
          fillOpacity: 0.15,
          map: map
        });
      }

      if (overlay) {
        // Add geofence info window
        const infoWindow = new window.google.maps.InfoWindow({
          content: `
            <div class="p-3">
              <h3 class="font-semibold">${geofence.name}</h3>
              <p class="text-sm mt-1">${geofence.description || 'No description'}</p>
              <div class="mt-2 text-xs">
                <div><strong>Security Level:</strong> ${geofence.securityLevel}</div>
                <div><strong>Alert on Entry:</strong> ${geofence.alertOnEntry ? 'Yes' : 'No'}</div>
                <div><strong>Alert on Exit:</strong> ${geofence.alertOnExit ? 'Yes' : 'No'}</div>
              </div>
            </div>
          `
        });

        overlay.addListener('click', (event: any) => {
          infoWindow.setPosition(event.latLng);
          infoWindow.open(map);
        });

        newOverlays.push(overlay);
      }
    });

    setGeofenceOverlays(newOverlays);
  }, [map, geofencesData, showGeofences]);

  // Auto-refresh data
  useEffect(() => {
    if (!realTimeEnabled) return;

    const interval = setInterval(() => {
      refetchDashboard();
      refetchDevices();
      refetchAlerts();
    }, 10000); // Refresh every 10 seconds

    return () => clearInterval(interval);
  }, [realTimeEnabled, refetchDashboard, refetchDevices, refetchAlerts]);

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-100 text-green-800';
      case 'offline': return 'bg-red-100 text-red-800';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800';
      case 'lost': case 'stolen': return 'bg-red-200 text-red-900';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case 'server': return <Server className="w-4 h-4" />;
      case 'workstation': return <Monitor className="w-4 h-4" />;
      case 'mobile': return <Smartphone className="w-4 h-4" />;
      case 'router': case 'switch': return <Router className="w-4 h-4" />;
      case 'camera': return <Camera className="w-4 h-4" />;
      default: return <Monitor className="w-4 h-4" />;
    }
  };

  const getSeverityBadgeColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Mutation for acknowledging alerts
  const acknowledgeAlertMutation = useMutation({
    mutationFn: ({ alertId, acknowledgedBy, notes }: { alertId: string; acknowledgedBy: string; notes?: string }) =>
      apiRequest(`/api/live-location/alerts/${alertId}/acknowledge`, {
        method: 'PUT',
        body: { acknowledgedBy, notes }
      }),
    onSuccess: () => {
      toast({ title: "Alert acknowledged successfully" });
      refetchAlerts();
    },
    onError: () => {
      toast({ title: "Failed to acknowledge alert", variant: "destructive" });
    }
  });

  const acknowledgeAlert = (alertId: string, notes?: string) => {
    acknowledgeAlertMutation.mutate({
      alertId,
      acknowledgedBy: 'current-user', // TODO: Get from auth context
      notes
    });
  };

  // Show loading state while checking authentication
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white mb-4"></div>
          <p className="text-xl">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // Show user-friendly unauthenticated UI instead of noisy 401 errors
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 text-white flex items-center justify-center">
        <div className="max-w-md mx-auto text-center">
          <div className="mb-8">
            <Shield className="w-16 h-16 mx-auto mb-4 text-blue-400" />
            <h1 className="text-3xl font-bold mb-2">Authentication Required</h1>
            <p className="text-gray-300 mb-6">
              Live Location Dashboard requires authentication to access real-time device tracking and monitoring features.
            </p>
          </div>
          
          <Alert className="mb-6 bg-blue-900/20 border-blue-400">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-blue-200">
              Please log in to access:
              <ul className="mt-2 space-y-1 text-left">
                <li>• Real-time device location tracking</li>
                <li>• Live WebSocket connections</li>
                <li>• Security alerts and monitoring</li>
                <li>• Geofence management</li>
              </ul>
            </AlertDescription>
          </Alert>

          <Button 
            onClick={login} 
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
            data-testid="button-login"
          >
            <Shield className="w-5 h-5 mr-2" />
            Log In to Continue
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 text-white p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Live Location Tracking
            </h1>
            <p className="text-gray-400 mt-1">Real-time device and asset monitoring with geospatial intelligence</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button
              variant={realTimeEnabled ? "default" : "outline"}
              size="sm"
              onClick={() => setRealTimeEnabled(!realTimeEnabled)}
              className="flex items-center space-x-2"
            >
              {realTimeEnabled ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span>{realTimeEnabled ? 'Pause' : 'Resume'} Real-time</span>
            </Button>
            
            <Button variant="outline" size="sm" onClick={() => {
              refetchDashboard();
              refetchDevices();
              refetchAlerts();
            }}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        {loadingDashboard ? (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-24 bg-gray-800" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Total Devices</p>
                    <p className="text-2xl font-bold text-white">{dashboardData?.stats?.totalDevices || 0}</p>
                  </div>
                  <Monitor className="w-8 h-8 text-blue-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Online Devices</p>
                    <p className="text-2xl font-bold text-green-400">{dashboardData?.stats?.onlineDevices || 0}</p>
                  </div>
                  <Activity className="w-8 h-8 text-green-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Active Alerts</p>
                    <p className="text-2xl font-bold text-red-400">{dashboardData?.stats?.activeAlerts || 0}</p>
                  </div>
                  <AlertTriangle className="w-8 h-8 text-red-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Geofences</p>
                    <p className="text-2xl font-bold text-purple-400">{dashboardData?.stats?.geofences || 0}</p>
                  </div>
                  <Shield className="w-8 h-8 text-purple-400" />
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Interactive Map */}
          <div className="lg:col-span-2">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white flex items-center space-x-2">
                    <Globe className="w-5 h-5" />
                    <span>Live Location Map</span>
                  </CardTitle>
                  
                  <div className="flex items-center space-x-2">
                    <Select value={mapView} onValueChange={(value: any) => setMapView(value)}>
                      <SelectTrigger className="w-32 bg-gray-700 border-gray-600">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="satellite">Satellite</SelectItem>
                        <SelectItem value="roadmap">Roadmap</SelectItem>
                        <SelectItem value="hybrid">Hybrid</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Button
                      variant={showGeofences ? "default" : "outline"}
                      size="sm"
                      onClick={() => setShowGeofences(!showGeofences)}
                    >
                      <Shield className="w-4 h-4 mr-1" />
                      Geofences
                    </Button>
                    
                    <Button
                      variant={showDeviceLabels ? "default" : "outline"}
                      size="sm"
                      onClick={() => setShowDeviceLabels(!showDeviceLabels)}
                    >
                      <Target className="w-4 h-4 mr-1" />
                      Labels
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div 
                  ref={mapRef} 
                  className="w-full h-[600px] rounded-b-lg"
                  data-testid="live-location-map"
                />
                {!isMapReady && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-800 rounded-b-lg">
                    <div className="text-center">
                      <Globe className="w-16 h-16 mx-auto mb-4 text-gray-400 animate-pulse" />
                      <p className="text-gray-400">Loading interactive map...</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Device Filters */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader className="pb-4">
                <CardTitle className="text-white flex items-center space-x-2">
                  <Filter className="w-5 h-5" />
                  <span>Filters</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-gray-300">Search Devices</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search by name or IP..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 bg-gray-700 border-gray-600 text-white"
                      data-testid="search-devices"
                    />
                  </div>
                </div>
                
                <div>
                  <Label className="text-gray-300">Status</Label>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="bg-gray-700 border-gray-600">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="online">Online</SelectItem>
                      <SelectItem value="offline">Offline</SelectItem>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
                      <SelectItem value="lost">Lost</SelectItem>
                      <SelectItem value="stolen">Stolen</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label className="text-gray-300">Device Type</Label>
                  <Select value={filterDeviceType} onValueChange={setFilterDeviceType}>
                    <SelectTrigger className="bg-gray-700 border-gray-600">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="server">Servers</SelectItem>
                      <SelectItem value="workstation">Workstations</SelectItem>
                      <SelectItem value="mobile">Mobile Devices</SelectItem>
                      <SelectItem value="iot">IoT Devices</SelectItem>
                      <SelectItem value="router">Network Equipment</SelectItem>
                      <SelectItem value="camera">Security Cameras</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Recent Alerts */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader className="pb-4">
                <CardTitle className="text-white flex items-center space-x-2">
                  <AlertTriangle className="w-5 h-5" />
                  <span>Recent Alerts</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {loadingAlerts ? (
                  <div className="space-y-3">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <Skeleton key={i} className="h-16 bg-gray-700" />
                    ))}
                  </div>
                ) : alertsData?.alerts?.length === 0 ? (
                  <div className="text-center py-8">
                    <CheckCircle className="w-12 h-12 mx-auto mb-2 text-green-400" />
                    <p className="text-gray-400">No active alerts</p>
                  </div>
                ) : (
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {alertsData?.alerts?.slice(0, 10).map((alert: LiveLocationAlert) => (
                      <div key={alert.id} className="p-3 bg-gray-700 rounded-lg">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <Badge className={getSeverityBadgeColor(alert.severity)}>
                              {alert.severity}
                            </Badge>
                            <Badge className={
                              alert.status === 'active' ? 'bg-red-100 text-red-800' :
                              alert.status === 'acknowledged' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-green-100 text-green-800'
                            }>
                              {alert.status}
                            </Badge>
                          </div>
                          {alert.status === 'active' && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => acknowledgeAlert(alert.id)}
                              className="h-6 px-2 text-xs"
                              data-testid={`acknowledge-alert-${alert.id}`}
                            >
                              Acknowledge
                            </Button>
                          )}
                        </div>
                        <h4 className="font-semibold text-sm text-white mb-1">{alert.alertTitle}</h4>
                        {alert.alertDescription && (
                          <p className="text-xs text-gray-300 mb-2">{alert.alertDescription}</p>
                        )}
                        <div className="flex items-center justify-between text-xs text-gray-400">
                          <span>{new Date(alert.createdAt).toLocaleString()}</span>
                          {alert.acknowledgedAt && (
                            <span>Ack: {new Date(alert.acknowledgedAt).toLocaleString()}</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Device Management Table */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <Monitor className="w-5 h-5" />
              <span>Device Management</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loadingDevices ? (
              <div className="space-y-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton key={i} className="h-12 bg-gray-700" />
                ))}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-600">
                      <th className="text-left py-3 px-2 text-gray-300">Device</th>
                      <th className="text-left py-3 px-2 text-gray-300">Type</th>
                      <th className="text-left py-3 px-2 text-gray-300">Status</th>
                      <th className="text-left py-3 px-2 text-gray-300">Health</th>
                      <th className="text-left py-3 px-2 text-gray-300">Last Seen</th>
                      <th className="text-left py-3 px-2 text-gray-300">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {devicesData?.devices?.map((device: LiveLocationDevice) => (
                      <tr key={device.id} className="border-b border-gray-700 hover:bg-gray-700">
                        <td className="py-3 px-2">
                          <div className="flex items-center space-x-3">
                            <div className="flex items-center space-x-2">
                              {getDeviceIcon(device.deviceType)}
                              <div>
                                <div className="font-medium text-white">{device.deviceName}</div>
                                {device.ipAddress && (
                                  <div className="text-xs text-gray-400">{device.ipAddress}</div>
                                )}
                              </div>
                            </div>
                            {device.criticalAsset && (
                              <Badge className="bg-red-100 text-red-800 text-xs">Critical</Badge>
                            )}
                          </div>
                        </td>
                        <td className="py-3 px-2">
                          <Badge variant="outline" className="text-gray-300 border-gray-600">
                            {device.deviceType}
                          </Badge>
                        </td>
                        <td className="py-3 px-2">
                          <Badge className={getStatusBadgeColor(device.status)}>
                            {device.status}
                          </Badge>
                        </td>
                        <td className="py-3 px-2">
                          <div className="flex items-center space-x-2">
                            <div className="w-16 bg-gray-600 rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full ${
                                  device.healthScore >= 80 ? 'bg-green-400' :
                                  device.healthScore >= 60 ? 'bg-yellow-400' : 'bg-red-400'
                                }`}
                                style={{ width: `${device.healthScore}%` }}
                              />
                            </div>
                            <span className="text-xs text-gray-300">{device.healthScore}%</span>
                          </div>
                        </td>
                        <td className="py-3 px-2 text-gray-300">
                          {device.lastSeen ? new Date(device.lastSeen).toLocaleString() : 'Never'}
                        </td>
                        <td className="py-3 px-2">
                          <div className="flex items-center space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setSelectedDevice(device)}
                              className="h-8 px-3 text-xs"
                              data-testid={`view-device-${device.id}`}
                            >
                              <Eye className="w-3 h-3 mr-1" />
                              View
                            </Button>
                            {device.locationTrackingEnabled && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                  // TODO: Center map on device location
                                  toast({ title: `Locating ${device.deviceName}` });
                                }}
                                className="h-8 px-3 text-xs"
                                data-testid={`locate-device-${device.id}`}
                              >
                                <Navigation className="w-3 h-3 mr-1" />
                                Locate
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Device Details Dialog */}
        {selectedDevice && (
          <Dialog open={!!selectedDevice} onOpenChange={() => setSelectedDevice(null)}>
            <DialogContent className="bg-gray-800 border-gray-700 text-white max-w-2xl">
              <DialogHeader>
                <DialogTitle className="flex items-center space-x-2">
                  {getDeviceIcon(selectedDevice.deviceType)}
                  <span>{selectedDevice.deviceName}</span>
                  {selectedDevice.criticalAsset && (
                    <Badge className="bg-red-100 text-red-800">Critical Asset</Badge>
                  )}
                </DialogTitle>
              </DialogHeader>
              
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-gray-300">Device Type</Label>
                    <p className="text-white">{selectedDevice.deviceType}</p>
                  </div>
                  <div>
                    <Label className="text-gray-300">Category</Label>
                    <p className="text-white">{selectedDevice.deviceCategory}</p>
                  </div>
                  <div>
                    <Label className="text-gray-300">Status</Label>
                    <Badge className={getStatusBadgeColor(selectedDevice.status)}>
                      {selectedDevice.status}
                    </Badge>
                  </div>
                  <div>
                    <Label className="text-gray-300">Health Score</Label>
                    <p className="text-white">{selectedDevice.healthScore}%</p>
                  </div>
                  {selectedDevice.ipAddress && (
                    <div>
                      <Label className="text-gray-300">IP Address</Label>
                      <p className="text-white">{selectedDevice.ipAddress}</p>
                    </div>
                  )}
                  {selectedDevice.macAddress && (
                    <div>
                      <Label className="text-gray-300">MAC Address</Label>
                      <p className="text-white">{selectedDevice.macAddress}</p>
                    </div>
                  )}
                  <div>
                    <Label className="text-gray-300">Location Tracking</Label>
                    <p className="text-white">
                      {selectedDevice.locationTrackingEnabled ? 'Enabled' : 'Disabled'}
                    </p>
                  </div>
                  <div>
                    <Label className="text-gray-300">Last Seen</Label>
                    <p className="text-white">
                      {selectedDevice.lastSeen ? new Date(selectedDevice.lastSeen).toLocaleString() : 'Never'}
                    </p>
                  </div>
                </div>

                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setSelectedDevice(null)}>
                    Close
                  </Button>
                  <Button>
                    <Settings className="w-4 h-4 mr-2" />
                    Configure
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
}