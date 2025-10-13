/**
 * Public Health Dashboard
 * 
 * Comprehensive public health monitoring and management interface featuring:
 * - Real-time disease outbreak tracking and surveillance
 * - HIPAA-compliant contact tracing management
 * - Interactive epidemiological analytics and reporting
 * - Health facility capacity monitoring and resource allocation
 * - Emergency alert system and incident response coordination
 * - CDC-integrated reporting and data export capabilities
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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { apiRequest } from '@/lib/queryClient';
import { format } from 'date-fns';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Icons for public health interface
import { 
  Activity,
  AlertTriangle,
  BarChart3,
  Bell,
  Calendar,
  CheckCircle,
  Clock,
  Database,
  Download,
  Eye,
  FileText,
  Filter,
  Globe,
  Heart,
  Hospital,
  Loader,
  MapPin,
  Microscope,
  Monitor,
  Plus,
  RefreshCw,
  Search,
  Settings,
  Shield,
  Stethoscope,
  Target,
  TrendingUp,
  Users,
  UserCheck,
  UserX,
  Bug,
  AlertTriangle as WarningIcon,
  XCircle,
  Zap,
  Phone,
  Mail,
  MessageSquare,
  Navigation,
  Radio,
  Satellite,
  Building2,
  Bed,
  Ambulance,
  ClipboardList,
  BarChart2,
  PieChart as PieChartIcon,
  LineChart as LineChartIcon,
  Map,
  Layers,
  AlertCircle,
  Info,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';

// Import types from schema
import type { 
  PublicHealthIncident,
  DiseaseSurveillance, 
  ContactTracing,
  HealthFacility,
  PublicHealthAlert,
  EpidemiologicalData
} from '@shared/schema';

// Dashboard-specific interfaces for aggregated data
interface PublicHealthDashboardData {
  systemStatus: {
    totalIncidents: number;
    activeOutbreaks: number;
    contactsUnderMonitoring: number;
    facilitiesMonitored: number;
    activeAlerts: number;
    surveillanceActiveCases: number;
  };
  outbreakTrends: Array<{
    date: string;
    newCases: number;
    totalCases: number;
    deaths: number;
    recovered: number;
  }>;
  facilityCapacity: Array<{
    facilityId: string;
    facilityName: string;
    totalBeds: number;
    occupiedBeds: number;
    availableBeds: number;
    icuBeds: number;
    ventilators: number;
    capacity: number;
  }>;
  geographicDistribution: Array<{
    region: string;
    cases: number;
    deaths: number;
    latitude: number;
    longitude: number;
  }>;
}

interface OutbreakMapData {
  outbreaks: Array<{
    id: string;
    latitude: number;
    longitude: number;
    title: string;
    severity: string;
    casesConfirmed: number;
    diseaseType: string;
    status: string;
  }>;
  facilities: Array<{
    id: string;
    latitude: number;
    longitude: number;
    name: string;
    type: string;
    capacity: number;
    status: string;
  }>;
}

interface ContactTracingStats {
  totalContacts: number;
  activelyMonitored: number;
  completedMonitoring: number;
  quarantined: number;
  tested: number;
  averageContactsPerCase: number;
  traceCompletionRate: number;
  riskDistribution: {
    high: number;
    medium: number;
    low: number;
    minimal: number;
  };
}

declare global {
  interface Window {
    google: any;
  }
}

export default function PublicHealthDashboard() {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  // State management
  const [selectedTab, setSelectedTab] = useState('overview');
  const [selectedIncident, setSelectedIncident] = useState<string>('');
  const [isWebSocketConnected, setIsWebSocketConnected] = useState(false);
  const [mapCenter, setMapCenter] = useState({ lat: 39.8283, lng: -98.5795 }); // Geographic center of US
  const [mapZoom, setMapZoom] = useState(5);
  const [selectedTimeRange, setSelectedTimeRange] = useState('30d');
  const [showEmergencyControls, setShowEmergencyControls] = useState(false);
  const [selectedFacility, setSelectedFacility] = useState<string>('');
  
  // Google Maps state management
  const [isMapReady, setIsMapReady] = useState(false);
  const [mapsFallbackMode, setMapsFallbackMode] = useState(false);
  const [isMapInitialized, setIsMapInitialized] = useState(false);
  
  // Refs for map integration
  const mapRef = useRef<HTMLDivElement>(null);
  const googleMapRef = useRef<any>(null);
  const outbreakMarkers = useRef<Map<string, any>>(new Map());
  
  // Role-based access control
  const hasPublicHealthAccess = user?.role === 'public_health_officer' || 
                               user?.role === 'epidemiologist' || 
                               user?.role === 'admin';
                               
  const hasContactTracingAccess = user?.role === 'contact_tracer' || 
                                 user?.role === 'public_health_officer' || 
                                 user?.role === 'admin';
                                 
  const hasFacilityAccess = user?.role === 'health_facility_admin' || 
                           user?.role === 'public_health_officer' || 
                           user?.role === 'admin';
                           
  const hasEmergencyAccess = user?.role === 'emergency_coordinator' || 
                            user?.role === 'admin';

  // Fetch dashboard overview data - WebSocket will trigger updates
  const { data: dashboardData, isLoading: isDashboardLoading } = useQuery<PublicHealthDashboardData>({
    queryKey: ['/api/public-health/dashboard'],
    refetchInterval: isWebSocketConnected ? 300000 : 30000, // 5 min with WebSocket, 30s fallback
    enabled: hasPublicHealthAccess,
  });

  // Fetch public health incidents (outbreaks) - Real-time via WebSocket
  const { data: incidents, isLoading: isIncidentsLoading } = useQuery<PublicHealthIncident[]>({
    queryKey: ['/api/public-health/incidents'],
    refetchInterval: isWebSocketConnected ? 600000 : 15000, // 10 min with WebSocket, 15s fallback
    enabled: hasPublicHealthAccess,
  });

  // Fetch disease surveillance data - Real-time via WebSocket
  const { data: surveillanceData, isLoading: isSurveillanceLoading } = useQuery<DiseaseSurveillance[]>({
    queryKey: ['/api/public-health/disease-surveillance'],
    refetchInterval: isWebSocketConnected ? 600000 : 30000, // 10 min with WebSocket, 30s fallback
    enabled: hasPublicHealthAccess,
  });

  // Fetch contact tracing data - Real-time via WebSocket
  const { data: contactTracingData, isLoading: isContactTracingLoading } = useQuery<ContactTracing[]>({
    queryKey: ['/api/public-health/contact-tracing'],
    refetchInterval: isWebSocketConnected ? 300000 : 10000, // 5 min with WebSocket, 10s fallback
    enabled: hasContactTracingAccess,
  });

  // Fetch contact tracing statistics - Real-time via WebSocket
  const { data: contactStats } = useQuery<ContactTracingStats>({
    queryKey: ['/api/public-health/contact-tracing/stats'],
    refetchInterval: isWebSocketConnected ? 300000 : 30000, // 5 min with WebSocket, 30s fallback
    enabled: hasContactTracingAccess,
  });

  // Fetch health facilities - Real-time via WebSocket
  const { data: healthFacilities, isLoading: isFacilitiesLoading } = useQuery<HealthFacility[]>({
    queryKey: ['/api/public-health/health-facilities'],
    refetchInterval: isWebSocketConnected ? 600000 : 60000, // 10 min with WebSocket, 1 min fallback
    enabled: hasFacilityAccess,
  });

  // Fetch public health alerts - Real-time via WebSocket (most critical)
  const { data: publicHealthAlerts, isLoading: isAlertsLoading } = useQuery<PublicHealthAlert[]>({
    queryKey: ['/api/public-health/alerts'],
    refetchInterval: isWebSocketConnected ? 120000 : 5000, // 2 min with WebSocket, 5s fallback
    enabled: hasPublicHealthAccess,
  });

  // Fetch epidemiological data for analytics - Less frequent updates needed
  const { data: epidemiologicalData, isLoading: isEpiDataLoading } = useQuery<EpidemiologicalData[]>({
    queryKey: ['/api/public-health/epidemiological-data'],
    refetchInterval: 600000, // 10 minutes - analytical data doesn't need real-time updates
    enabled: hasPublicHealthAccess,
  });

  // Fetch map data for outbreak visualization - Real-time via WebSocket
  const { data: mapData } = useQuery<OutbreakMapData>({
    queryKey: ['/api/public-health/map-data'],
    refetchInterval: isWebSocketConnected ? 300000 : 30000, // 5 min with WebSocket, 30s fallback
    enabled: hasPublicHealthAccess,
  });

  // ===== CDC INTEGRATION DATA FEEDS =====
  
  // Fetch CDC integration dashboard data - Real-time CDC feeds
  const { data: cdcDashboardData, isLoading: isCDCLoading } = useQuery({
    queryKey: ['/api/public-health/cdc/dashboard'],
    refetchInterval: isWebSocketConnected ? 300000 : 30000, // 5 min with WebSocket, 30s fallback
    enabled: hasPublicHealthAccess,
  });

  // Fetch CDC system status - Real-time CDC system monitoring
  const { data: cdcSystemStatus, isLoading: isCDCStatusLoading } = useQuery({
    queryKey: ['/api/public-health/cdc/system-status'],
    refetchInterval: 60000, // Check CDC systems every minute
    enabled: hasPublicHealthAccess,
  });

  // Fetch real-time syndromic surveillance data from CDC ESSENCE
  const { data: syndromicSurveillanceData, isLoading: isSyndromicLoading } = useQuery({
    queryKey: ['/api/public-health/cdc/essence/surveillance'],
    refetchInterval: isWebSocketConnected ? 300000 : 60000, // 5 min with WebSocket, 1 min fallback
    enabled: hasPublicHealthAccess,
  });

  // WebSocket connection for real-time updates with secure authentication
  useEffect(() => {
    if (!hasPublicHealthAccess || !user) return;

    const connectWebSocket = async () => {
      try {
        // Get JWT token for WebSocket authentication from localStorage
        const getStoredToken = () => {
          if (typeof localStorage !== 'undefined') {
            return localStorage.getItem('auth_token');
          }
          return null;
        };
        
        const token = getStoredToken();
        
        if (!token) {
          console.error('❌ No authentication token available for WebSocket connection');
          toast({
            title: "Authentication Error",
            description: "Please log in to access real-time updates.",
            variant: "destructive",
          });
          return;
        }

        // SECURITY FIX: Use WSS in production for encrypted connections
        const wsProtocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
        // SECURITY FIX: Remove JWT from URL completely - use protocol for authentication
        const wsUrl = `${wsProtocol}//${window.location.host}/ws/public-health`;
        
        console.log('🔗 Connecting to Public Health WebSocket with secure authentication...');
        
        // SECURITY FIX: Use Sec-WebSocket-Protocol for secure token transmission
        // Format: Bearer.{base64-encoded-jwt-token}
        const secureProtocol = `Bearer.${btoa(token).replace(/=/g, '')}`;
        const ws = new WebSocket(wsUrl, [secureProtocol]);
        
        ws.onopen = () => {
          console.log('📡 Public Health WebSocket connected successfully');
          setIsWebSocketConnected(true);
          
          // Send initial subscription preferences
          ws.send(JSON.stringify({
            type: 'subscribe_outbreaks',
            filters: { regions: 'all', severity: ['critical', 'high', 'medium'] }
          }));
          
          if (hasContactTracingAccess) {
            ws.send(JSON.stringify({
              type: 'subscribe_contacts',
              filters: { priority: ['high', 'medium'] }
            }));
          }
          
          ws.send(JSON.stringify({
            type: 'subscribe_facilities',
            filters: { capacityThreshold: 80 }
          }));
        };
        
        ws.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            
            console.log('📨 Public Health WebSocket message:', data.type);
            
            switch (data.type) {
              case 'welcome':
                console.log('✅ Public Health WebSocket authenticated:', data.user);
                break;
                
              case 'outbreak_update':
                queryClient.invalidateQueries({ queryKey: ['/api/public-health/incidents'] });
                queryClient.invalidateQueries({ queryKey: ['/api/public-health/map-data'] });
                queryClient.invalidateQueries({ queryKey: ['/api/public-health/dashboard'] });
                toast({
                  title: "Outbreak Update",
                  description: data.data?.title || "New outbreak data available",
                  variant: "default",
                });
                break;
                
              case 'emergency_alert':
                queryClient.invalidateQueries({ queryKey: ['/api/public-health/alerts'] });
                toast({
                  title: "🚨 Emergency Alert",
                  description: data.message || data.data?.message,
                  variant: "destructive",
                });
                break;
                
              case 'contact_update':
                if (hasContactTracingAccess) {
                  queryClient.invalidateQueries({ queryKey: ['/api/public-health/contact-tracing'] });
                  queryClient.invalidateQueries({ queryKey: ['/api/public-health/contact-tracing/stats'] });
                }
                break;
                
              case 'facility_update':
                queryClient.invalidateQueries({ queryKey: ['/api/public-health/health-facilities'] });
                queryClient.invalidateQueries({ queryKey: ['/api/public-health/dashboard'] });
                break;
                
              case 'surveillance_update':
                queryClient.invalidateQueries({ queryKey: ['/api/public-health/disease-surveillance'] });
                queryClient.invalidateQueries({ queryKey: ['/api/public-health/dashboard'] });
                break;
                
              case 'health_status':
                // Periodic health check - no action needed
                break;
                
              case 'pong':
                // Heartbeat response - connection is alive
                break;
                
              case 'error':
                console.error('❌ Public Health WebSocket server error:', data.message);
                toast({
                  title: "Connection Error",
                  description: data.message,
                  variant: "destructive",
                });
                break;
                
              default:
                console.log('📍 Unknown Public Health WebSocket message type:', data.type);
            }
          } catch (error) {
            console.error('❌ Error parsing Public Health WebSocket message:', error);
          }
        };
        
        ws.onclose = (event) => {
          console.log(`📡 Public Health WebSocket disconnected (code: ${event.code})`);
          setIsWebSocketConnected(false);
          
          // Attempt to reconnect after 5 seconds if not a normal closure
          if (event.code !== 1000 && hasPublicHealthAccess) {
            setTimeout(() => {
              console.log('🔄 Attempting to reconnect Public Health WebSocket...');
              connectWebSocket();
            }, 5000);
          }
        };
        
        ws.onerror = (error) => {
          console.error('❌ Public Health WebSocket error:', error);
          setIsWebSocketConnected(false);
        };
        
        // Heartbeat to keep connection alive
        const heartbeatInterval = setInterval(() => {
          if (ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify({ type: 'ping', timestamp: new Date().toISOString() }));
          }
        }, 30000);
        
        return () => {
          clearInterval(heartbeatInterval);
          ws.close(1000, 'Component unmounting');
        };
        
      } catch (error) {
        console.error('❌ Failed to establish Public Health WebSocket connection:', error);
        setIsWebSocketConnected(false);
      }
    };

    const cleanup = connectWebSocket();
    return () => {
      cleanup.then(cleanupFn => cleanupFn?.());
    };
  }, [hasPublicHealthAccess, hasContactTracingAccess, user, queryClient, toast]);

  // Load Google Maps script with proper error handling
  useEffect(() => {
    if (!hasPublicHealthAccess) return;

    const loadGoogleMaps = () => {
      if (window.google?.maps) {
        setIsMapReady(true);
        return;
      }

      const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
      if (!apiKey) {
        console.error('Google Maps API key not configured. Please set VITE_GOOGLE_MAPS_API_KEY environment variable.');
        setMapsFallbackMode(true);
        toast({
          title: "Maps Unavailable",
          description: "Google Maps API key not configured. Outbreak visualization will use list view.",
          variant: "destructive"
        });
        return;
      }

      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=marker,visualization,geometry&callback=initPublicHealthMap&v=weekly`;
      script.async = true;
      script.defer = true;
      
      (window as any).initPublicHealthMap = () => {
        console.log('✅ Google Maps API loaded for Public Health Dashboard');
        setIsMapReady(true);
      };
      
      script.onerror = () => {
        console.error('Failed to load Google Maps API');
        setMapsFallbackMode(true);
        toast({
          title: "Maps Failed to Load", 
          description: "Google Maps could not be loaded. Using list view for outbreak data.",
          variant: "destructive"
        });
      };
      
      document.head.appendChild(script);
    };

    loadGoogleMaps();
  }, [hasPublicHealthAccess, toast]);

  // Initialize Google Maps when ready (only once)
  useEffect(() => {
    if (!isMapReady || !mapRef.current || isMapInitialized || mapsFallbackMode) return;

    try {
      const map = new window.google.maps.Map(mapRef.current, {
        center: mapCenter,
        zoom: mapZoom,
        mapTypeId: 'roadmap',
        styles: [
          {
            "elementType": "geometry",
            "stylers": [{"color": "#242f3e"}]
          },
          {
            "elementType": "labels.text.stroke", 
            "stylers": [{"color": "#242f3e"}]
          },
          {
            "elementType": "labels.text.fill",
            "stylers": [{"color": "#746855"}]
          }
        ]
      });

      googleMapRef.current = map;
      setIsMapInitialized(true);
      
      console.log('✅ Public Health Google Map initialized successfully');
      
      // Listen for map events to preserve user interactions
      map.addListener('center_changed', () => {
        const newCenter = map.getCenter();
        if (newCenter) {
          setMapCenter({ lat: newCenter.lat(), lng: newCenter.lng() });
        }
      });
      
      map.addListener('zoom_changed', () => {
        setMapZoom(map.getZoom() || 5);
      });

    } catch (error) {
      console.error('❌ Failed to initialize Google Map:', error);
      setMapsFallbackMode(true);
      toast({
        title: "Map Initialization Failed",
        description: "Could not initialize map. Using list view mode.",
        variant: "destructive"
      });
    }
  }, [isMapReady, mapCenter, mapZoom, isMapInitialized, mapsFallbackMode, toast]);

  // Update markers when data changes (without recreating map)
  useEffect(() => {
    if (!googleMapRef.current || !mapData?.outbreaks || !isMapInitialized) return;

    try {
      // Clear existing markers first
      outbreakMarkers.current.forEach(marker => marker.setMap(null));
      outbreakMarkers.current.clear();

      // Add outbreak markers with improved performance
      mapData.outbreaks.forEach(outbreak => {
        const marker = new window.google.maps.Marker({
          position: { lat: outbreak.latitude, lng: outbreak.longitude },
          map: googleMapRef.current,
          title: outbreak.title,
          icon: {
            path: window.google.maps.SymbolPath.CIRCLE,
            scale: Math.min(8 + (outbreak.casesConfirmed / 10), 20), // Cap the size
            fillColor: outbreak.severity === 'critical' ? '#ef4444' : 
                      outbreak.severity === 'high' ? '#f97316' :
                      outbreak.severity === 'medium' ? '#eab308' : '#22c55e',
            fillOpacity: 0.8,
            strokeColor: '#1f2937',
            strokeWeight: 2,
          }
        });

        const infoWindow = new window.google.maps.InfoWindow({
          content: `
            <div class="p-3 max-w-sm">
              <h3 class="font-bold text-gray-900 mb-2">${outbreak.title}</h3>
              <div class="space-y-1 text-sm">
                <div><span class="font-medium">Disease:</span> ${outbreak.diseaseType}</div>
                <div><span class="font-medium">Cases:</span> ${outbreak.casesConfirmed.toLocaleString()}</div>
                <div><span class="font-medium">Status:</span> ${outbreak.status}</div>
                <div><span class="font-medium">Severity:</span> ${outbreak.severity}</div>
              </div>
            </div>
          `
        });

        marker.addListener('click', () => {
          infoWindow.open(googleMapRef.current, marker);
          setSelectedIncident(outbreak.id);
        });

        outbreakMarkers.current.set(outbreak.id, marker);
      });

      // Add facility markers
      if (mapData.facilities) {
        mapData.facilities.forEach(facility => {
          const marker = new window.google.maps.Marker({
            position: { lat: facility.latitude, lng: facility.longitude },
            map: googleMapRef.current,
            title: facility.name,
            icon: {
              url: 'data:image/svg+xml;base64,' + btoa(`
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
                </svg>
              `),
              scaledSize: new window.google.maps.Size(24, 24),
              anchor: new window.google.maps.Point(12, 24),
            }
          });

          const infoWindow = new window.google.maps.InfoWindow({
            content: `
              <div class="p-3 max-w-sm">
                <h3 class="font-bold text-gray-900 mb-2">${facility.name}</h3>
                <div class="space-y-1 text-sm">
                  <div><span class="font-medium">Type:</span> ${facility.type}</div>
                  <div><span class="font-medium">Capacity:</span> ${facility.capacity}%</div>
                  <div><span class="font-medium">Status:</span> ${facility.status}</div>
                </div>
              </div>
            `
          });

          marker.addListener('click', () => {
            infoWindow.open(googleMapRef.current, marker);
            setSelectedFacility(facility.id);
          });
        });
      }
      
      console.log(`✅ Updated ${mapData.outbreaks.length} outbreak markers and ${mapData.facilities?.length || 0} facility markers`);
      
    } catch (error) {
      console.error('❌ Failed to update map markers:', error);
    }
  }, [mapData]);

  // Helper functions
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-red-100 text-red-800 border-red-200';
      case 'contained': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'resolved': return 'bg-green-100 text-green-800 border-green-200';
      case 'monitoring': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  // Emergency alert mutation
  const createEmergencyAlert = useMutation({
    mutationFn: async (alertData: any) => {
      return apiRequest('/api/public-health/alerts', 'POST', alertData);
    },
    onSuccess: () => {
      toast({
        title: "Emergency Alert Created",
        description: "Emergency alert has been broadcasted to all relevant stakeholders.",
        variant: "default",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/public-health/alerts'] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create emergency alert.",
        variant: "destructive",
      });
    },
  });

  // Access control check
  if (!hasPublicHealthAccess) {
    return (
      <div className="p-8">
        <Alert className="max-w-2xl mx-auto">
          <Shield className="h-4 w-4" />
          <AlertDescription>
            Access denied. This dashboard requires public health officer, epidemiologist, or administrator privileges.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-3">
            <Stethoscope className="h-8 w-8 text-blue-600" />
            Public Health Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Comprehensive disease surveillance, outbreak tracking, and emergency response coordination
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <Badge 
            variant={isWebSocketConnected ? "default" : "destructive"} 
            className="flex items-center gap-1"
            data-testid="connection-status"
          >
            <div className={`w-2 h-2 rounded-full ${isWebSocketConnected ? 'bg-green-400' : 'bg-red-400'}`} />
            {isWebSocketConnected ? 'Connected' : 'Disconnected'}
          </Badge>
          
          {hasEmergencyAccess && (
            <Button
              onClick={() => setShowEmergencyControls(true)}
              variant="destructive"
              className="flex items-center gap-2"
              data-testid="emergency-controls"
            >
              <AlertTriangle className="h-4 w-4" />
              Emergency Controls
            </Button>
          )}
        </div>
      </div>

      {/* Main Dashboard Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-6 lg:w-auto lg:inline-flex bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <TabsTrigger value="overview" className="flex items-center gap-2" data-testid="tab-overview">
            <Activity className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="outbreaks" className="flex items-center gap-2" data-testid="tab-outbreaks">
            <Bug className="h-4 w-4" />
            Outbreaks
          </TabsTrigger>
          <TabsTrigger value="contact-tracing" className="flex items-center gap-2" data-testid="tab-contact-tracing">
            <UserCheck className="h-4 w-4" />
            Contact Tracing
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2" data-testid="tab-analytics">
            <BarChart3 className="h-4 w-4" />
            Analytics
          </TabsTrigger>
          <TabsTrigger value="facilities" className="flex items-center gap-2" data-testid="tab-facilities">
            <Hospital className="h-4 w-4" />
            Facilities
          </TabsTrigger>
          <TabsTrigger value="alerts" className="flex items-center gap-2" data-testid="tab-alerts">
            <Bell className="h-4 w-4" />
            Alerts
          </TabsTrigger>
          <TabsTrigger value="cdc" className="flex items-center gap-2" data-testid="tab-cdc">
            <Database className="h-4 w-4" />
            CDC Integration
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* System Status Cards */}
          {isDashboardLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <CardContent className="p-6">
                    <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                    <div className="h-8 bg-gray-300 rounded w-1/2"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
              <Card data-testid="card-total-incidents">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Incidents</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                        {formatNumber(dashboardData?.systemStatus?.totalIncidents || 0)}
                      </p>
                    </div>
                    <FileText className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card data-testid="card-active-outbreaks">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Outbreaks</p>
                      <p className="text-2xl font-bold text-red-600">
                        {formatNumber(dashboardData?.systemStatus?.activeOutbreaks || 0)}
                      </p>
                    </div>
                    <Bug className="h-8 w-8 text-red-600" />
                  </div>
                </CardContent>
              </Card>

              <Card data-testid="card-contacts-monitored">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Contacts Monitored</p>
                      <p className="text-2xl font-bold text-orange-600">
                        {formatNumber(dashboardData?.systemStatus?.contactsUnderMonitoring || 0)}
                      </p>
                    </div>
                    <UserCheck className="h-8 w-8 text-orange-600" />
                  </div>
                </CardContent>
              </Card>

              <Card data-testid="card-facilities-monitored">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Facilities Monitored</p>
                      <p className="text-2xl font-bold text-green-600">
                        {formatNumber(dashboardData?.systemStatus?.facilitiesMonitored || 0)}
                      </p>
                    </div>
                    <Hospital className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card data-testid="card-active-alerts">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Alerts</p>
                      <p className="text-2xl font-bold text-purple-600">
                        {formatNumber(dashboardData?.systemStatus?.activeAlerts || 0)}
                      </p>
                    </div>
                    <Bell className="h-8 w-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>

              <Card data-testid="card-surveillance-cases">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Surveillance Cases</p>
                      <p className="text-2xl font-bold text-teal-600">
                        {formatNumber(dashboardData?.systemStatus?.surveillanceActiveCases || 0)}
                      </p>
                    </div>
                    <Eye className="h-8 w-8 text-teal-600" />
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Outbreak Trends Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LineChartIcon className="h-5 w-5" />
                  Outbreak Trends (Last 30 Days)
                </CardTitle>
              </CardHeader>
              <CardContent>
                {dashboardData?.outbreakTrends ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={dashboardData.outbreakTrends}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis 
                        dataKey="date" 
                        stroke="#6B7280"
                        tickFormatter={(value) => format(new Date(value), 'MM/dd')}
                      />
                      <YAxis stroke="#6B7280" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1F2937', 
                          border: '1px solid #374151',
                          borderRadius: '8px'
                        }}
                        labelStyle={{ color: '#F3F4F6' }}
                      />
                      <Legend />
                      <Line type="monotone" dataKey="newCases" stroke="#EF4444" strokeWidth={2} name="New Cases" />
                      <Line type="monotone" dataKey="totalCases" stroke="#F59E0B" strokeWidth={2} name="Total Cases" />
                      <Line type="monotone" dataKey="deaths" stroke="#6B7280" strokeWidth={2} name="Deaths" />
                      <Line type="monotone" dataKey="recovered" stroke="#10B981" strokeWidth={2} name="Recovered" />
                    </LineChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-[300px] flex items-center justify-center text-gray-500">
                    <Loader className="h-6 w-6 animate-spin" />
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Geographic Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChartIcon className="h-5 w-5" />
                  Regional Case Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                {dashboardData?.geographicDistribution ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={dashboardData.geographicDistribution}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="cases"
                        label={({ region, cases }) => `${region}: ${cases}`}
                      >
                        {dashboardData.geographicDistribution.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={['#EF4444', '#F59E0B', '#10B981', '#3B82F6', '#8B5CF6'][index % 5]} 
                          />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1F2937', 
                          border: '1px solid #374151',
                          borderRadius: '8px'
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-[300px] flex items-center justify-center text-gray-500">
                    <Loader className="h-6 w-6 animate-spin" />
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Recent Incidents Table */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Recent Incidents
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isIncidentsLoading ? (
                <div className="space-y-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="animate-pulse h-12 bg-gray-300 rounded"></div>
                  ))}
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Incident ID</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Severity</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Region</TableHead>
                      <TableHead>Cases</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {incidents?.slice(0, 5).map((incident) => (
                      <TableRow key={incident.id}>
                        <TableCell className="font-mono text-sm">{incident.incidentId}</TableCell>
                        <TableCell className="font-medium">{incident.title}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{incident.incidentType}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className={`w-2 h-2 rounded-full inline-block mr-2 ${getSeverityColor(incident.severity)}`} />
                          {incident.severity}
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(incident.status)}>
                            {incident.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{incident.affectedRegion}</TableCell>
                        <TableCell>{formatNumber(incident.casesConfirmed || 0)}</TableCell>
                        <TableCell>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => {
                              setSelectedIncident(incident.id);
                              setSelectedTab('outbreaks');
                            }}
                            data-testid={`view-incident-${incident.id}`}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Disease Outbreak Tracking Tab */}
        <TabsContent value="outbreaks" className="space-y-6">
          {/* Outbreak Map and Controls */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Map className="h-5 w-5" />
                    Outbreak Geographic Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div 
                    ref={mapRef} 
                    className="w-full h-[500px] rounded-lg border border-gray-200 dark:border-gray-700"
                    data-testid="outbreak-map"
                  />
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Map Controls</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Map Center</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <Input
                        placeholder="Latitude"
                        value={mapCenter.lat}
                        onChange={(e) => setMapCenter(prev => ({ ...prev, lat: parseFloat(e.target.value) || prev.lat }))}
                        data-testid="input-map-lat"
                      />
                      <Input
                        placeholder="Longitude"
                        value={mapCenter.lng}
                        onChange={(e) => setMapCenter(prev => ({ ...prev, lng: parseFloat(e.target.value) || prev.lng }))}
                        data-testid="input-map-lng"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label>Zoom Level: {mapZoom}</Label>
                    <Slider
                      value={[mapZoom]}
                      onValueChange={(value) => setMapZoom(value[0])}
                      min={1}
                      max={20}
                      step={1}
                      className="mt-2"
                      data-testid="slider-map-zoom"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Legend</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-red-500" />
                    <span className="text-sm">Critical Outbreak</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-orange-500" />
                    <span className="text-sm">High Severity</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-yellow-500" />
                    <span className="text-sm">Medium Severity</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-green-500" />
                    <span className="text-sm">Low Severity</span>
                  </div>
                  <Separator />
                  <div className="flex items-center gap-2">
                    <Hospital className="h-4 w-4 text-blue-600" />
                    <span className="text-sm">Health Facility</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Outbreak Details Table */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Bug className="h-5 w-5" />
                Active Disease Outbreaks
              </CardTitle>
              <div className="flex items-center gap-2">
                <Select value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Time Range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7d">Last 7 Days</SelectItem>
                    <SelectItem value="30d">Last 30 Days</SelectItem>
                    <SelectItem value="90d">Last 90 Days</SelectItem>
                    <SelectItem value="1y">Last Year</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="sm" data-testid="button-refresh-outbreaks">
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {isIncidentsLoading ? (
                <div className="space-y-3">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="animate-pulse h-16 bg-gray-300 rounded"></div>
                  ))}
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Incident</TableHead>
                      <TableHead>Disease Type</TableHead>
                      <TableHead>Region</TableHead>
                      <TableHead>Severity</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Confirmed Cases</TableHead>
                      <TableHead>Deaths</TableHead>
                      <TableHead>Last Updated</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {incidents?.map((incident) => (
                      <TableRow 
                        key={incident.id}
                        className={selectedIncident === incident.id ? "bg-blue-50 dark:bg-blue-900/20" : ""}
                      >
                        <TableCell>
                          <div>
                            <div className="font-medium">{incident.title}</div>
                            <div className="text-sm text-gray-500 font-mono">{incident.incidentId}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{incident.diseaseType}</Badge>
                        </TableCell>
                        <TableCell className="font-medium">{incident.affectedRegion}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${getSeverityColor(incident.severity)}`} />
                            <span className="capitalize">{incident.severity}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(incident.status)}>
                            {incident.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-mono">{formatNumber(incident.casesConfirmed || 0)}</TableCell>
                        <TableCell className="font-mono">{formatNumber(incident.deathsConfirmed || 0)}</TableCell>
                        <TableCell className="text-sm">
                          {format(new Date(incident.updatedAt), 'MMM dd, HH:mm')}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => setSelectedIncident(incident.id)}
                              data-testid={`select-incident-${incident.id}`}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              data-testid={`export-incident-${incident.id}`}
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Contact Tracing Tab */}
        <TabsContent value="contact-tracing" className="space-y-6">
          {!hasContactTracingAccess ? (
            <Alert>
              <Shield className="h-4 w-4" />
              <AlertDescription>
                Contact tracing access requires contact tracer or public health officer privileges.
              </AlertDescription>
            </Alert>
          ) : (
            <>
              {/* Contact Tracing Statistics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card data-testid="card-contact-stats-total">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Contacts</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                          {formatNumber(contactStats?.totalContacts || 0)}
                        </p>
                      </div>
                      <Users className="h-8 w-8 text-blue-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card data-testid="card-contact-stats-monitored">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Actively Monitored</p>
                        <p className="text-2xl font-bold text-orange-600">
                          {formatNumber(contactStats?.activelyMonitored || 0)}
                        </p>
                      </div>
                      <UserCheck className="h-8 w-8 text-orange-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card data-testid="card-contact-stats-quarantined">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Quarantined</p>
                        <p className="text-2xl font-bold text-red-600">
                          {formatNumber(contactStats?.quarantined || 0)}
                        </p>
                      </div>
                      <Shield className="h-8 w-8 text-red-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card data-testid="card-contact-stats-completion">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Completion Rate</p>
                        <p className="text-2xl font-bold text-green-600">
                          {contactStats?.traceCompletionRate || 0}%
                        </p>
                      </div>
                      <CheckCircle className="h-8 w-8 text-green-600" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Risk Level Distribution */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5" />
                      Risk Level Distribution
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {contactStats?.riskDistribution ? (
                      <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                          <Pie
                            data={[
                              { name: 'High Risk', value: contactStats.riskDistribution.high, color: '#EF4444' },
                              { name: 'Medium Risk', value: contactStats.riskDistribution.medium, color: '#F59E0B' },
                              { name: 'Low Risk', value: contactStats.riskDistribution.low, color: '#10B981' },
                              { name: 'Minimal Risk', value: contactStats.riskDistribution.minimal, color: '#6B7280' }
                            ]}
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            dataKey="value"
                            label={({ name, value }) => `${name}: ${value}`}
                          >
                            {[
                              { name: 'High Risk', value: contactStats.riskDistribution.high, color: '#EF4444' },
                              { name: 'Medium Risk', value: contactStats.riskDistribution.medium, color: '#F59E0B' },
                              { name: 'Low Risk', value: contactStats.riskDistribution.low, color: '#10B981' },
                              { name: 'Minimal Risk', value: contactStats.riskDistribution.minimal, color: '#6B7280' }
                            ].map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: '#1F2937', 
                              border: '1px solid #374151',
                              borderRadius: '8px'
                            }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    ) : (
                      <div className="h-[300px] flex items-center justify-center text-gray-500">
                        <Loader className="h-6 w-6 animate-spin" />
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart2 className="h-5 w-5" />
                      Monitoring Progress
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Contacts Identified</span>
                        <span>{formatNumber(contactStats?.totalContacts || 0)}</span>
                      </div>
                      <Progress value={100} className="h-2" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Under Active Monitoring</span>
                        <span>{formatNumber(contactStats?.activelyMonitored || 0)}</span>
                      </div>
                      <Progress 
                        value={contactStats ? (contactStats.activelyMonitored / contactStats.totalContacts) * 100 : 0} 
                        className="h-2" 
                      />
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Completed Monitoring</span>
                        <span>{formatNumber(contactStats?.completedMonitoring || 0)}</span>
                      </div>
                      <Progress 
                        value={contactStats ? (contactStats.completedMonitoring / contactStats.totalContacts) * 100 : 0} 
                        className="h-2" 
                      />
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Testing Completed</span>
                        <span>{formatNumber(contactStats?.tested || 0)}</span>
                      </div>
                      <Progress 
                        value={contactStats ? (contactStats.tested / contactStats.totalContacts) * 100 : 0} 
                        className="h-2" 
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Contact Tracing Cases Table */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <ClipboardList className="h-5 w-5" />
                    Contact Tracing Cases
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Input 
                      placeholder="Search contacts..." 
                      className="w-[250px]"
                      data-testid="input-search-contacts"
                    />
                    <Button variant="outline" size="sm">
                      <Search className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {isContactTracingLoading ? (
                    <div className="space-y-3">
                      {Array.from({ length: 8 }).map((_, i) => (
                        <div key={i} className="animate-pulse h-16 bg-gray-300 rounded"></div>
                      ))}
                    </div>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Contact ID</TableHead>
                          <TableHead>Contact Type</TableHead>
                          <TableHead>Relationship</TableHead>
                          <TableHead>Risk Level</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Monitoring Period</TableHead>
                          <TableHead>Last Contact</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {contactTracingData?.slice(0, 10).map((contact) => (
                          <TableRow key={contact.id}>
                            <TableCell className="font-mono text-sm">{contact.contactId}</TableCell>
                            <TableCell>
                              <Badge variant="outline">{contact.contactType}</Badge>
                            </TableCell>
                            <TableCell>{contact.relationshipToCase || 'Unknown'}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <div className={`w-2 h-2 rounded-full ${
                                  contact.riskLevel === 'high' ? 'bg-red-500' :
                                  contact.riskLevel === 'medium' ? 'bg-yellow-500' :
                                  contact.riskLevel === 'low' ? 'bg-green-500' : 'bg-gray-500'
                                }`} />
                                <span className="capitalize">{contact.riskLevel}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge className={getStatusColor(contact.contactStatus)}>
                                {contact.contactStatus}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              {contact.monitoringPeriod} days
                              {contact.monitoringStartDate && (
                                <div className="text-xs text-gray-500">
                                  Until {contact.monitoringEndDate ? format(new Date(contact.monitoringEndDate), 'MMM dd') : 'TBD'}
                                </div>
                              )}
                            </TableCell>
                            <TableCell className="text-sm">
                              {contact.lastContactDate ? 
                                format(new Date(contact.lastContactDate), 'MMM dd, HH:mm') : 
                                'Not recorded'
                              }
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1">
                                <Button variant="ghost" size="sm" data-testid={`call-contact-${contact.id}`}>
                                  <Phone className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm" data-testid={`message-contact-${contact.id}`}>
                                  <MessageSquare className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm" data-testid={`view-contact-${contact.id}`}>
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </CardContent>
              </Card>
            </>
          )}
        </TabsContent>

        {/* Epidemiological Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Disease Trends Analysis */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Disease Trend Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                {epidemiologicalData ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={dashboardData?.outbreakTrends || []}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis 
                        dataKey="date" 
                        stroke="#6B7280"
                        tickFormatter={(value) => format(new Date(value), 'MM/dd')}
                      />
                      <YAxis stroke="#6B7280" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1F2937', 
                          border: '1px solid #374151',
                          borderRadius: '8px'
                        }}
                      />
                      <Legend />
                      <Line type="monotone" dataKey="newCases" stroke="#EF4444" strokeWidth={2} name="New Cases" />
                      <Line type="monotone" dataKey="totalCases" stroke="#F59E0B" strokeWidth={2} name="Total Cases" />
                    </LineChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-[300px] flex items-center justify-center text-gray-500">
                    <Loader className="h-6 w-6 animate-spin" />
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Facility Capacity Analysis */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart2 className="h-5 w-5" />
                  Healthcare Facility Capacity
                </CardTitle>
              </CardHeader>
              <CardContent>
                {dashboardData?.facilityCapacity ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={dashboardData.facilityCapacity.slice(0, 8)}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis 
                        dataKey="facilityName" 
                        stroke="#6B7280"
                        angle={-45}
                        textAnchor="end"
                        height={100}
                        interval={0}
                        fontSize={12}
                      />
                      <YAxis stroke="#6B7280" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1F2937', 
                          border: '1px solid #374151',
                          borderRadius: '8px'
                        }}
                      />
                      <Legend />
                      <Bar dataKey="occupiedBeds" stackId="a" fill="#EF4444" name="Occupied Beds" />
                      <Bar dataKey="availableBeds" stackId="a" fill="#10B981" name="Available Beds" />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-[300px] flex items-center justify-center text-gray-500">
                    <Loader className="h-6 w-6 animate-spin" />
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* CDC Export and Reporting */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="h-5 w-5" />
                CDC Reporting & Data Export
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Button 
                  variant="outline" 
                  className="flex items-center gap-2 h-20 flex-col"
                  data-testid="export-mmwr"
                >
                  <FileText className="h-6 w-6" />
                  <span>MMWR Export</span>
                  <span className="text-xs text-gray-500">Morbidity Reports</span>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="flex items-center gap-2 h-20 flex-col"
                  data-testid="export-nndss"
                >
                  <Database className="h-6 w-6" />
                  <span>NNDSS Export</span>
                  <span className="text-xs text-gray-500">Notifiable Diseases</span>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="flex items-center gap-2 h-20 flex-col"
                  data-testid="export-nedss"
                >
                  <Globe className="h-6 w-6" />
                  <span>NEDSS Export</span>
                  <span className="text-xs text-gray-500">Surveillance Data</span>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="flex items-center gap-2 h-20 flex-col"
                  data-testid="export-han"
                >
                  <Bell className="h-6 w-6" />
                  <span>HAN Export</span>
                  <span className="text-xs text-gray-500">Health Alerts</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Analytics Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Epidemiological Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-3">Population Health Metrics</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Incidence Rate:</span>
                      <span className="font-mono">0.45 per 1,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Mortality Rate:</span>
                      <span className="font-mono">0.02 per 1,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Case Fatality Rate:</span>
                      <span className="font-mono">4.2%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Recovery Rate:</span>
                      <span className="font-mono">89.3%</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-3">Surveillance Metrics</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Active Surveillance:</span>
                      <span className="font-mono">{formatNumber(dashboardData?.systemStatus?.surveillanceActiveCases || 0)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Reporting Compliance:</span>
                      <span className="font-mono">94.7%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Data Quality Score:</span>
                      <span className="font-mono">87.2%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Coverage Rate:</span>
                      <span className="font-mono">91.8%</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-3">Response Metrics</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Avg Response Time:</span>
                      <span className="font-mono">2.3 hours</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Containment Rate:</span>
                      <span className="font-mono">78.5%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Contact Trace Rate:</span>
                      <span className="font-mono">{contactStats?.traceCompletionRate || 0}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Alert Effectiveness:</span>
                      <span className="font-mono">84.1%</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Health Facilities Tab */}
        <TabsContent value="facilities" className="space-y-6">
          {!hasFacilityAccess ? (
            <Alert>
              <Shield className="h-4 w-4" />
              <AlertDescription>
                Health facility monitoring requires health facility administrator or public health officer privileges.
              </AlertDescription>
            </Alert>
          ) : (
            <>
              {/* Facility Status Overview */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card data-testid="card-facility-total">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Facilities</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                          {formatNumber(healthFacilities?.length || 0)}
                        </p>
                      </div>
                      <Building2 className="h-8 w-8 text-blue-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card data-testid="card-facility-hospitals">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Hospitals</p>
                        <p className="text-2xl font-bold text-red-600">
                          {formatNumber(healthFacilities?.filter(f => f.facilityType === 'hospital').length || 0)}
                        </p>
                      </div>
                      <Hospital className="h-8 w-8 text-red-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card data-testid="card-facility-clinics">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Clinics</p>
                        <p className="text-2xl font-bold text-green-600">
                          {formatNumber(healthFacilities?.filter(f => f.facilityType === 'clinic').length || 0)}
                        </p>
                      </div>
                      <Stethoscope className="h-8 w-8 text-green-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card data-testid="card-facility-emergency">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Emergency Ready</p>
                        <p className="text-2xl font-bold text-purple-600">
                          {formatNumber(healthFacilities?.filter(f => (f as any).emergencyPreparednessLevel === 'high').length || 0)}
                        </p>
                      </div>
                      <Ambulance className="h-8 w-8 text-purple-600" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Facility Capacity Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bed className="h-5 w-5" />
                    Facility Bed Capacity Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {dashboardData?.facilityCapacity ? (
                    <ResponsiveContainer width="100%" height={400}>
                      <BarChart data={dashboardData.facilityCapacity}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis 
                          dataKey="facilityName" 
                          stroke="#6B7280"
                          angle={-45}
                          textAnchor="end"
                          height={120}
                          interval={0}
                          fontSize={11}
                        />
                        <YAxis stroke="#6B7280" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: '#1F2937', 
                            border: '1px solid #374151',
                            borderRadius: '8px'
                          }}
                        />
                        <Legend />
                        <Bar dataKey="totalBeds" fill="#6B7280" name="Total Beds" />
                        <Bar dataKey="occupiedBeds" fill="#EF4444" name="Occupied Beds" />
                        <Bar dataKey="availableBeds" fill="#10B981" name="Available Beds" />
                        <Bar dataKey="icuBeds" fill="#3B82F6" name="ICU Beds" />
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="h-[400px] flex items-center justify-center text-gray-500">
                      <Loader className="h-6 w-6 animate-spin" />
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Facilities Table */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Monitor className="h-5 w-5" />
                    Health Facility Monitoring
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Select defaultValue="all">
                      <SelectTrigger className="w-[140px]">
                        <SelectValue placeholder="Filter Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="hospital">Hospitals</SelectItem>
                        <SelectItem value="clinic">Clinics</SelectItem>
                        <SelectItem value="testing_center">Testing Centers</SelectItem>
                        <SelectItem value="nursing_home">Nursing Homes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardHeader>
                <CardContent>
                  {isFacilitiesLoading ? (
                    <div className="space-y-3">
                      {Array.from({ length: 8 }).map((_, i) => (
                        <div key={i} className="animate-pulse h-16 bg-gray-300 rounded"></div>
                      ))}
                    </div>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Facility</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Location</TableHead>
                          <TableHead>Bed Capacity</TableHead>
                          <TableHead>Occupancy</TableHead>
                          <TableHead>ICU Available</TableHead>
                          <TableHead>Emergency Status</TableHead>
                          <TableHead>Contact</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {healthFacilities?.slice(0, 10).map((facility) => (
                          <TableRow 
                            key={facility.id}
                            className={selectedFacility === facility.id ? "bg-blue-50 dark:bg-blue-900/20" : ""}
                          >
                            <TableCell>
                              <div>
                                <div className="font-medium">{facility.facilityName}</div>
                                <div className="text-sm text-gray-500 font-mono">{facility.facilityId}</div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline">{facility.facilityType}</Badge>
                            </TableCell>
                            <TableCell>
                              <div className="text-sm">
                                <div>{facility.city}, {facility.state}</div>
                                <div className="text-gray-500">{facility.county} County</div>
                              </div>
                            </TableCell>
                            <TableCell className="font-mono">
                              {formatNumber(facility.totalBeds || 0)}
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Progress 
                                  value={(facility as any).totalBeds ? (((facility as any).occupiedBeds || 0) / (facility as any).totalBeds) * 100 : 0} 
                                  className="w-16 h-2" 
                                />
                                <span className="text-sm font-mono">
                                  {(facility as any).totalBeds ? Math.round((((facility as any).occupiedBeds || 0) / (facility as any).totalBeds) * 100) : 0}%
                                </span>
                              </div>
                            </TableCell>
                            <TableCell className="font-mono">
                              {formatNumber((facility as any).icuBedsAvailable || 0)}
                            </TableCell>
                            <TableCell>
                              <Badge className={
                                (facility as any).emergencyPreparednessLevel === 'high' ? 'bg-green-100 text-green-800 border-green-200' :
                                (facility as any).emergencyPreparednessLevel === 'medium' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
                                'bg-red-100 text-red-800 border-red-200'
                              }>
                                {(facility as any).emergencyPreparednessLevel || 'Unknown'}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1">
                                {facility.primaryPhone && (
                                  <Button variant="ghost" size="sm" data-testid={`call-facility-${facility.id}`}>
                                    <Phone className="h-4 w-4" />
                                  </Button>
                                )}
                                {facility.email && (
                                  <Button variant="ghost" size="sm" data-testid={`email-facility-${facility.id}`}>
                                    <Mail className="h-4 w-4" />
                                  </Button>
                                )}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1">
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => setSelectedFacility(facility.id)}
                                  data-testid={`select-facility-${facility.id}`}
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm" data-testid={`facility-details-${facility.id}`}>
                                  <ExternalLink className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </CardContent>
              </Card>
            </>
          )}
        </TabsContent>

        {/* Emergency Alerts Tab */}
        <TabsContent value="alerts" className="space-y-6">
          {/* Alert Status Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card data-testid="card-alerts-active">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Alerts</p>
                    <p className="text-2xl font-bold text-red-600">
                      {formatNumber(publicHealthAlerts?.filter(a => (a as any).status === 'active').length || 0)}
                    </p>
                  </div>
                  <AlertTriangle className="h-8 w-8 text-red-600" />
                </div>
              </CardContent>
            </Card>

            <Card data-testid="card-alerts-critical">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Critical Alerts</p>
                    <p className="text-2xl font-bold text-orange-600">
                      {formatNumber(publicHealthAlerts?.filter(a => a.severity === 'critical').length || 0)}
                    </p>
                  </div>
                  <WarningIcon className="h-8 w-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>

            <Card data-testid="card-alerts-resolved">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Resolved Today</p>
                    <p className="text-2xl font-bold text-green-600">
                      {formatNumber(publicHealthAlerts?.filter(a => (a as any).status === 'resolved' && 
                        a.updatedAt && new Date(a.updatedAt).toDateString() === new Date().toDateString()).length || 0)}
                    </p>
                  </div>
                  <CheckCircle2 className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card data-testid="card-alerts-broadcast">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Broadcasting</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {formatNumber(publicHealthAlerts?.filter(a => (a as any).broadcastStatus === 'broadcasting').length || 0)}
                    </p>
                  </div>
                  <Radio className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Emergency Controls */}
          {hasEmergencyAccess && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-600">
                  <AlertTriangle className="h-5 w-5" />
                  Emergency Alert Controls
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <Button 
                    variant="destructive" 
                    className="flex items-center gap-2"
                    data-testid="button-create-emergency-alert"
                  >
                    <Plus className="h-4 w-4" />
                    Create Emergency Alert
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="flex items-center gap-2"
                    data-testid="button-broadcast-test"
                  >
                    <Radio className="h-4 w-4" />
                    Test Broadcast System
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="flex items-center gap-2"
                    data-testid="button-emergency-contacts"
                  >
                    <Phone className="h-4 w-4" />
                    Emergency Contacts
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Active Alerts Table */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Public Health Alerts
              </CardTitle>
              <div className="flex items-center gap-2">
                <Select defaultValue="all">
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Filter Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Alerts</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                    <SelectItem value="expired">Expired</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="sm">
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {isAlertsLoading ? (
                <div className="space-y-3">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="animate-pulse h-16 bg-gray-300 rounded"></div>
                  ))}
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Alert ID</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Severity</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Geographic Scope</TableHead>
                      <TableHead>Target Audience</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {publicHealthAlerts?.slice(0, 10).map((alert) => (
                      <TableRow key={alert.id}>
                        <TableCell className="font-mono text-sm">{alert.alertId}</TableCell>
                        <TableCell>
                          <div className="font-medium">{alert.headline}</div>
                          <div className="text-sm text-gray-500">{alert.event}</div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{(alert as any).category || 'General'}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${getSeverityColor(alert.severity)}`} />
                            <span className="capitalize">{alert.severity}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor((alert as any).status || 'unknown')}>
                            {(alert as any).status || 'Unknown'}
                          </Badge>
                        </TableCell>
                        <TableCell className="capitalize">{alert.geographicScope}</TableCell>
                        <TableCell>
                          <div className="text-sm">
                            {Array.isArray((alert as any).targetAudience) ? (alert as any).targetAudience.slice(0, 2).join(', ') : (alert as any).targetAudience || 'General'}
                            {Array.isArray((alert as any).targetAudience) && (alert as any).targetAudience.length > 2 && ' +' + ((alert as any).targetAudience.length - 2)}
                          </div>
                        </TableCell>
                        <TableCell className="text-sm">
                          {alert.createdAt ? format(new Date(alert.createdAt), 'MMM dd, HH:mm') : 'Unknown'}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Button variant="ghost" size="sm" data-testid={`view-alert-${alert.id}`}>
                              <Eye className="h-4 w-4" />
                            </Button>
                            {hasEmergencyAccess && (
                              <>
                                <Button variant="ghost" size="sm" data-testid={`broadcast-alert-${alert.id}`}>
                                  <Radio className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm" data-testid={`edit-alert-${alert.id}`}>
                                  <Settings className="h-4 w-4" />
                                </Button>
                              </>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Emergency Controls Dialog */}
      <Dialog open={showEmergencyControls} onOpenChange={setShowEmergencyControls}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-600">
              <AlertTriangle className="h-5 w-5" />
              Emergency Alert System
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <Alert className="border-red-200 bg-red-50 dark:bg-red-900/20">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                Emergency controls provide immediate alert broadcasting capabilities. Use only in genuine emergency situations.
              </AlertDescription>
            </Alert>
            
            <div className="space-y-4">
              <div>
                <Label>Alert Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select emergency type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="disease_outbreak">Disease Outbreak</SelectItem>
                    <SelectItem value="bioterrorism">Bioterrorism Event</SelectItem>
                    <SelectItem value="contamination">Environmental Contamination</SelectItem>
                    <SelectItem value="pandemic">Pandemic Declaration</SelectItem>
                    <SelectItem value="facility_emergency">Healthcare Facility Emergency</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label>Emergency Message</Label>
                <Textarea 
                  placeholder="Enter emergency alert message..." 
                  className="min-h-[100px]"
                  data-testid="textarea-emergency-message"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Geographic Scope</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select scope" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="local">Local</SelectItem>
                      <SelectItem value="county">County</SelectItem>
                      <SelectItem value="state">State</SelectItem>
                      <SelectItem value="regional">Regional</SelectItem>
                      <SelectItem value="national">National</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label>Severity Level</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select severity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="critical">Critical</SelectItem>
                      <SelectItem value="catastrophic">Catastrophic</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end gap-3">
              <Button 
                variant="outline" 
                onClick={() => setShowEmergencyControls(false)}
                data-testid="button-cancel-emergency"
              >
                Cancel
              </Button>
              <Button 
                variant="destructive"
                className="flex items-center gap-2"
                data-testid="button-broadcast-emergency"
              >
                <Radio className="h-4 w-4" />
                Broadcast Emergency Alert
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}