import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Globe, 
  Shield, 
  AlertTriangle, 
  Server,
  Eye,
  Settings,
  Layers,
  Activity
} from "lucide-react";

interface GeospatialThreat {
  id: string;
  latitude: number;
  longitude: number;
  altitude?: number;
  threatType: string;
  severity: string;
  source: string;
  timestamp: string;
  ip: string;
  country: string;
  city: string;
  confidence: number;
  indicators: string[];
  description: string;
  mitigated: boolean;
}

interface InfrastructureAsset {
  id: string;
  name: string;
  type: string;
  latitude: number;
  longitude: number;
  status: string;
  ipAddress: string;
  vulnerabilities: number;
  complianceScore: number;
  incidents: number;
  criticality: string;
  location: string;
}

interface ComplianceRegion {
  id: string;
  name: string;
  framework: string;
  boundaries: Array<{latitude: number; longitude: number}>;
  complianceLevel: number;
  violations: number;
  riskLevel: string;
}

interface IncidentLocation {
  id: string;
  incidentId: string;
  latitude: number;
  longitude: number;
  title: string;
  type: string;
  severity: string;
  status: string;
  timestamp: string;
  affectedAssets: string[];
}

interface GeospatialMapProps {
  className?: string;
}

declare global {
  interface Window {
    google: any;
  }
}

export function GeospatialIntelligenceMap({ className = "" }: GeospatialMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);
  const [activeLayer, setActiveLayer] = useState<string>('threats');
  const [mapMode, setMapMode] = useState<'standard' | '3d' | 'satellite'>('standard');
  const [isMapReady, setIsMapReady] = useState(false);
  const [overlays, setOverlays] = useState<any[]>([]);

  // Fetch comprehensive geospatial data
  const { data: geospatialData, isLoading } = useQuery({
    queryKey: ['/api/geospatial/overview'],
    refetchInterval: 30000,
  });

  const { data: threats } = useQuery({
    queryKey: ['/api/geospatial/threats'],
    refetchInterval: 15000,
  });

  const { data: infrastructure } = useQuery({
    queryKey: ['/api/geospatial/infrastructure'],
    refetchInterval: 30000,
  });

  const { data: complianceRegions } = useQuery({
    queryKey: ['/api/geospatial/compliance'],
    refetchInterval: 300000, // 5 minutes
  });

  const { data: incidents } = useQuery({
    queryKey: ['/api/geospatial/incidents'],
    refetchInterval: 10000,
  });

  // Load Google Maps with enhanced features
  useEffect(() => {
    const loadGoogleMaps = () => {
      if (window.google?.maps) {
        setIsMapReady(true);
        return;
      }

      const script = document.createElement('script');
      // Enhanced Google Maps with 3D tiles and advanced features
      script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&libraries=visualization,geometry&callback=initGeospatialMap&v=3.55`;
      script.async = true;
      script.defer = true;
      
      (window as any).initGeospatialMap = () => {
        setIsMapReady(true);
      };
      
      document.head.appendChild(script);
    };

    loadGoogleMaps();
  }, []);

  // Initialize enhanced map with 3D capabilities
  useEffect(() => {
    if (!isMapReady || !mapRef.current || map) return;

    const googleMap = new window.google.maps.Map(mapRef.current, {
      center: { lat: 20, lng: 0 },
      zoom: 2,
      mapTypeId: mapMode === 'satellite' ? 'satellite' : 'roadmap',
      tilt: mapMode === '3d' ? 45 : 0,
      heading: 0,
      styles: mapMode === 'standard' ? [
        {
          "featureType": "all",
          "elementType": "geometry",
          "stylers": [{ "color": "#1a1a1a" }]
        },
        {
          "featureType": "all",
          "elementType": "labels.text.fill",
          "stylers": [{ "color": "#ffffff" }]
        },
        {
          "featureType": "all",
          "elementType": "labels.text.stroke",
          "stylers": [{ "color": "#000000" }]
        },
        {
          "featureType": "water",
          "elementType": "geometry",
          "stylers": [{ "color": "#000000" }]
        },
        {
          "featureType": "administrative",
          "elementType": "geometry.stroke",
          "stylers": [{ "color": "#144973" }, { "lightness": 14 }, { "weight": 1.3 }]
        }
      ] : [],
      zoomControl: true,
      mapTypeControl: false,
      scaleControl: true,
      streetViewControl: false,
      rotateControl: mapMode === '3d',
      fullscreenControl: true
    });

    setMap(googleMap);
  }, [isMapReady, mapMode]);

  // Clear existing overlays
  const clearOverlays = () => {
    overlays.forEach(overlay => {
      if (overlay.setMap) overlay.setMap(null);
      if (overlay.setVisible) overlay.setVisible(false);
    });
    setOverlays([]);
  };

  // Render threat markers
  const renderThreatMarkers = () => {
    if (!map || !threats) return;

    const newOverlays: any[] = [];

    threats.forEach((threat: GeospatialThreat) => {
      const color = threat.severity === 'critical' ? '#ef4444' : 
                   threat.severity === 'high' ? '#f97316' : 
                   threat.severity === 'medium' ? '#eab308' : '#22c55e';

      const marker = new window.google.maps.Marker({
        position: { lat: threat.latitude, lng: threat.longitude },
        map: map,
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE,
          fillColor: color,
          fillOpacity: 0.8,
          strokeColor: color,
          strokeOpacity: 1,
          strokeWeight: 2,
          scale: threat.severity === 'critical' ? 12 : 
                 threat.severity === 'high' ? 10 : 
                 threat.severity === 'medium' ? 8 : 6
        },
        title: `${threat.threatType} - ${threat.city}, ${threat.country}`,
        animation: threat.mitigated ? null : window.google.maps.Animation.BOUNCE
      });

      const infoWindow = new window.google.maps.InfoWindow({
        content: `
          <div style="color: #333; font-size: 14px; max-width: 300px;">
            <div style="font-weight: bold; margin-bottom: 8px; color: ${color};">
              ${threat.threatType.toUpperCase()} THREAT
            </div>
            <div style="margin-bottom: 4px;"><strong>Source:</strong> ${threat.source.toUpperCase()}</div>
            <div style="margin-bottom: 4px;"><strong>Location:</strong> ${threat.city}, ${threat.country}</div>
            <div style="margin-bottom: 4px;"><strong>IP:</strong> ${threat.ip}</div>
            <div style="margin-bottom: 4px;"><strong>Severity:</strong> ${threat.severity.toUpperCase()}</div>
            <div style="margin-bottom: 4px;"><strong>Confidence:</strong> ${threat.confidence}%</div>
            <div style="margin-bottom: 4px;"><strong>Status:</strong> ${threat.mitigated ? 'MITIGATED' : 'ACTIVE'}</div>
            <div style="margin-bottom: 8px;"><strong>Description:</strong> ${threat.description}</div>
            <div style="font-size: 12px; color: #666;">
              Detected: ${new Date(threat.timestamp).toLocaleString()}
            </div>
          </div>
        `
      });

      marker.addListener('click', () => {
        infoWindow.open(map, marker);
      });

      newOverlays.push(marker);
    });

    setOverlays(newOverlays);
  };

  // Render infrastructure assets
  const renderInfrastructureAssets = () => {
    if (!map || !infrastructure) return;

    const newOverlays: any[] = [];

    infrastructure.forEach((asset: InfrastructureAsset) => {
      const color = asset.status === 'healthy' ? '#22c55e' : 
                   asset.status === 'warning' ? '#eab308' : 
                   asset.status === 'critical' ? '#ef4444' : '#6b7280';

      const icon = asset.type === 'server' ? '🖥️' :
                   asset.type === 'firewall' ? '🛡️' :
                   asset.type === 'database' ? '🗄️' :
                   asset.type === 'router' ? '📡' : '⚙️';

      const marker = new window.google.maps.Marker({
        position: { lat: asset.latitude, lng: asset.longitude },
        map: map,
        icon: {
          path: window.google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
          fillColor: color,
          fillOpacity: 0.8,
          strokeColor: '#ffffff',
          strokeOpacity: 1,
          strokeWeight: 2,
          scale: asset.criticality === 'critical' ? 8 : 6,
          rotation: 0
        },
        title: `${asset.name} - ${asset.location}`,
        animation: asset.status === 'critical' ? window.google.maps.Animation.BOUNCE : null
      });

      const infoWindow = new window.google.maps.InfoWindow({
        content: `
          <div style="color: #333; font-size: 14px; max-width: 300px;">
            <div style="font-weight: bold; margin-bottom: 8px; display: flex; align-items: center;">
              <span style="margin-right: 8px;">${icon}</span>
              ${asset.name}
            </div>
            <div style="margin-bottom: 4px;"><strong>Type:</strong> ${asset.type.toUpperCase()}</div>
            <div style="margin-bottom: 4px;"><strong>Status:</strong> 
              <span style="color: ${color}; font-weight: bold;">${asset.status.toUpperCase()}</span>
            </div>
            <div style="margin-bottom: 4px;"><strong>IP:</strong> ${asset.ipAddress}</div>
            <div style="margin-bottom: 4px;"><strong>Location:</strong> ${asset.location}</div>
            <div style="margin-bottom: 4px;"><strong>Criticality:</strong> ${asset.criticality.toUpperCase()}</div>
            <div style="margin-bottom: 4px;"><strong>Vulnerabilities:</strong> ${asset.vulnerabilities}</div>
            <div style="margin-bottom: 4px;"><strong>Compliance Score:</strong> ${asset.complianceScore}%</div>
            <div style="margin-bottom: 4px;"><strong>Open Incidents:</strong> ${asset.incidents}</div>
          </div>
        `
      });

      marker.addListener('click', () => {
        infoWindow.open(map, marker);
      });

      newOverlays.push(marker);
    });

    setOverlays(newOverlays);
  };

  // Render compliance regions
  const renderComplianceRegions = () => {
    if (!map || !complianceRegions) return;

    const newOverlays: any[] = [];

    complianceRegions.forEach((region: ComplianceRegion) => {
      const color = region.riskLevel === 'critical' ? '#ef4444' : 
                   region.riskLevel === 'high' ? '#f97316' : 
                   region.riskLevel === 'medium' ? '#eab308' : '#22c55e';

      const polygon = new window.google.maps.Polygon({
        paths: region.boundaries,
        strokeColor: color,
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: color,
        fillOpacity: 0.2,
        map: map
      });

      const infoWindow = new window.google.maps.InfoWindow({
        content: `
          <div style="color: #333; font-size: 14px; max-width: 300px;">
            <div style="font-weight: bold; margin-bottom: 8px;">${region.name}</div>
            <div style="margin-bottom: 4px;"><strong>Framework:</strong> ${region.framework}</div>
            <div style="margin-bottom: 4px;"><strong>Compliance Level:</strong> ${region.complianceLevel}%</div>
            <div style="margin-bottom: 4px;"><strong>Risk Level:</strong> 
              <span style="color: ${color}; font-weight: bold;">${region.riskLevel.toUpperCase()}</span>
            </div>
            <div style="margin-bottom: 4px;"><strong>Violations:</strong> ${region.violations}</div>
          </div>
        `
      });

      polygon.addListener('click', (event: any) => {
        infoWindow.setPosition(event.latLng);
        infoWindow.open(map);
      });

      newOverlays.push(polygon);
    });

    setOverlays(newOverlays);
  };

  // Render incident markers
  const renderIncidentMarkers = () => {
    if (!map || !incidents) return;

    const newOverlays: any[] = [];

    incidents.forEach((incident: IncidentLocation) => {
      const color = incident.severity === 'critical' ? '#ef4444' : 
                   incident.severity === 'high' ? '#f97316' : 
                   incident.severity === 'medium' ? '#eab308' : '#3b82f6';

      const marker = new window.google.maps.Marker({
        position: { lat: incident.latitude, lng: incident.longitude },
        map: map,
        icon: {
          path: window.google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
          fillColor: color,
          fillOpacity: 0.9,
          strokeColor: '#ffffff',
          strokeOpacity: 1,
          strokeWeight: 2,
          scale: 10
        },
        title: `${incident.title} - ${incident.type.toUpperCase()}`,
        animation: incident.status === 'open' ? window.google.maps.Animation.BOUNCE : null
      });

      const infoWindow = new window.google.maps.InfoWindow({
        content: `
          <div style="color: #333; font-size: 14px; max-width: 300px;">
            <div style="font-weight: bold; margin-bottom: 8px; color: ${color};">
              🚨 ${incident.title}
            </div>
            <div style="margin-bottom: 4px;"><strong>ID:</strong> ${incident.incidentId}</div>
            <div style="margin-bottom: 4px;"><strong>Type:</strong> ${incident.type.toUpperCase()}</div>
            <div style="margin-bottom: 4px;"><strong>Severity:</strong> ${incident.severity.toUpperCase()}</div>
            <div style="margin-bottom: 4px;"><strong>Status:</strong> 
              <span style="font-weight: bold;">${incident.status.toUpperCase()}</span>
            </div>
            <div style="margin-bottom: 4px;"><strong>Affected Assets:</strong> ${incident.affectedAssets.length}</div>
            <div style="font-size: 12px; color: #666;">
              Reported: ${new Date(incident.timestamp).toLocaleString()}
            </div>
          </div>
        `
      });

      marker.addListener('click', () => {
        infoWindow.open(map, marker);
      });

      newOverlays.push(marker);
    });

    setOverlays(newOverlays);
  };

  // Update map based on active layer
  useEffect(() => {
    if (!map) return;

    clearOverlays();

    switch (activeLayer) {
      case 'threats':
        renderThreatMarkers();
        break;
      case 'infrastructure':
        renderInfrastructureAssets();
        break;
      case 'compliance':
        renderComplianceRegions();
        break;
      case 'incidents':
        renderIncidentMarkers();
        break;
      case 'all':
        renderThreatMarkers();
        renderInfrastructureAssets();
        renderComplianceRegions();
        renderIncidentMarkers();
        break;
    }
  }, [map, activeLayer, threats, infrastructure, complianceRegions, incidents]);

  const resetView = () => {
    if (map) {
      map.setCenter({ lat: 20, lng: 0 });
      map.setZoom(2);
      map.setTilt(0);
      map.setHeading(0);
    }
  };

  if (isLoading || !isMapReady) {
    return (
      <div className={`bg-gray-900/50 rounded-lg p-4 min-h-[600px] flex items-center justify-center ${className}`}>
        <div className="text-center text-gray-400">
          <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
          <p>Loading Geospatial Intelligence...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-300">Data Layers</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={activeLayer} onValueChange={setActiveLayer}>
              <TabsList className="grid grid-cols-2 bg-gray-700 text-xs">
                <TabsTrigger value="threats" className="text-xs">Threats</TabsTrigger>
                <TabsTrigger value="infrastructure" className="text-xs">Assets</TabsTrigger>
              </TabsList>
              <TabsList className="grid grid-cols-2 bg-gray-700 text-xs mt-2">
                <TabsTrigger value="compliance" className="text-xs">Compliance</TabsTrigger>
                <TabsTrigger value="incidents" className="text-xs">Incidents</TabsTrigger>
              </TabsList>
              <Button
                size="sm"
                variant={activeLayer === 'all' ? 'default' : 'outline'}
                onClick={() => setActiveLayer('all')}
                className="w-full mt-2 text-xs"
              >
                <Layers className="w-3 h-3 mr-1" />
                All Layers
              </Button>
            </Tabs>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-300">Map Mode</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={mapMode} onValueChange={(value: any) => setMapMode(value)}>
              <TabsList className="grid grid-cols-3 bg-gray-700">
                <TabsTrigger value="standard" className="text-xs">2D</TabsTrigger>
                <TabsTrigger value="3d" className="text-xs">3D</TabsTrigger>
                <TabsTrigger value="satellite" className="text-xs">Sat</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-300">View Controls</CardTitle>
          </CardHeader>
          <CardContent>
            <Button
              size="sm"
              variant="outline"
              onClick={resetView}
              className="w-full"
            >
              <Settings className="w-4 h-4 mr-2" />
              Reset View
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-300">Live Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-400">Active Threats</span>
                <Badge variant="destructive" className="text-xs">
                  {geospatialData?.overview?.activeThrents || 0}
                </Badge>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-400">Infrastructure</span>
                <Badge variant="secondary" className="text-xs">
                  {geospatialData?.overview?.healthyAssets || 0} Healthy
                </Badge>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-400">Open Incidents</span>
                <Badge variant="destructive" className="text-xs">
                  {geospatialData?.overview?.openIncidents || 0}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Map */}
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center space-x-2">
              <Globe className="w-5 h-5" />
              <span>Live Geospatial Security Intelligence</span>
            </span>
            <Badge variant="outline" className="border-green-500 text-green-400">
              <Activity className="w-3 h-3 mr-1" />
              Real-Time
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="relative h-[600px] rounded-b-lg overflow-hidden">
            <div ref={mapRef} className="w-full h-full" />
            
            {/* Map Overlay Controls */}
            <div className="absolute top-4 left-4 bg-black/80 rounded px-3 py-2 z-10">
              <div className="text-xs text-cyan-400 font-mono font-bold">
                LIVE GEOSPATIAL INTELLIGENCE
              </div>
              <div className="text-xs text-gray-300 mt-1">
                Layer: {activeLayer.toUpperCase()} | Mode: {mapMode.toUpperCase()}
              </div>
            </div>
            
            <div className="absolute top-4 right-4 bg-black/80 rounded px-3 py-2 flex items-center z-10">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2"></div>
              <div className="text-xs text-green-400 font-mono">OPERATIONAL</div>
            </div>

            {/* Legend */}
            <div className="absolute bottom-4 left-4 bg-black/90 rounded p-3 z-10 max-w-xs">
              <div className="text-xs text-gray-300 mb-2 font-semibold">Legend - {activeLayer.toUpperCase()}</div>
              {activeLayer === 'threats' || activeLayer === 'all' ? (
                <div className="space-y-1 mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-xs text-gray-300">Critical Threats</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                    <span className="text-xs text-gray-300">High Risk</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span className="text-xs text-gray-300">Medium Risk</span>
                  </div>
                </div>
              ) : null}
              
              {activeLayer === 'infrastructure' || activeLayer === 'all' ? (
                <div className="space-y-1 mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-xs text-gray-300">Healthy Assets</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span className="text-xs text-gray-300">Warning</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-xs text-gray-300">Critical</span>
                  </div>
                </div>
              ) : null}
            </div>

            {/* Stats */}
            <div className="absolute bottom-4 right-4 bg-black/90 rounded p-3 z-10">
              <div className="text-xs text-gray-300 font-mono">
                {activeLayer === 'threats' && threats ? `${threats.length} THREATS TRACKED` :
                 activeLayer === 'infrastructure' && infrastructure ? `${infrastructure.length} ASSETS MONITORED` :
                 activeLayer === 'incidents' && incidents ? `${incidents.length} ACTIVE INCIDENTS` :
                 activeLayer === 'compliance' && complianceRegions ? `${complianceRegions.length} COMPLIANCE ZONES` :
                 'MULTIPLE LAYERS ACTIVE'}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}