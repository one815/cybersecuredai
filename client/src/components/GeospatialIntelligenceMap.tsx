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
  mapMode?: string;
  threatFilter?: string;
  dimension?: string;
}

declare global {
  interface Window {
    google: {
      maps: {
        Map: any;
        marker: any;
        maps3d: any;
        importLibrary: (library: string) => Promise<any>;
        LatLng: any;
        Marker: any;
        InfoWindow: any;
        Polyline: any;
        Polygon: any;
        Circle: any;
        AdvancedMarkerElement: any;
        PinElement: any;
        Marker3DInteractiveElement: any;
        MapsLibrary: any;
        SymbolPath: any;
        Animation: any;
      };
    };
  }
}

export function GeospatialIntelligenceMap({ 
  className = "", 
  mapMode: externalMapMode = 'standard',
  threatFilter = 'all',
  dimension = 'global'
}: GeospatialMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);
  const [activeLayer, setActiveLayer] = useState<string>('threats');
  const [mapMode, setMapMode] = useState<'standard' | '3d' | 'satellite'>(externalMapMode as 'standard' | '3d' | 'satellite');
  const [isMapReady, setIsMapReady] = useState(false);
  const [overlays, setOverlays] = useState<any[]>([]);

  // Sync external props with internal state
  useEffect(() => {
    setMapMode(externalMapMode as 'standard' | '3d' | 'satellite');
  }, [externalMapMode]);

  // Fetch comprehensive geospatial data
  const { data: geospatialData = {}, isLoading } = useQuery({
    queryKey: ['/api/geospatial/overview'],
    refetchInterval: 30000,
  });

  const { data: threats = [] } = useQuery({
    queryKey: ['/api/geospatial/threats'],
    refetchInterval: 15000,
  });

  const { data: infrastructureResponse = {} } = useQuery({
    queryKey: ['/api/geospatial/infrastructure'],
    queryFn: () => fetch('/api/geospatial/infrastructure?realtime=true').then(res => res.json()),
    refetchInterval: 15000, // Faster updates for real-time monitoring
  });
  
  // Extract devices from the enhanced response with proper fallback
  const infrastructure = (infrastructureResponse as any)?.devices || [];

  const { data: complianceRegions = [] } = useQuery({
    queryKey: ['/api/geospatial/compliance'],
    refetchInterval: 300000, // 5 minutes
  });

  const { data: incidents = [] } = useQuery({
    queryKey: ['/api/geospatial/incidents'],
    refetchInterval: 10000,
  });

  // Load Google Maps with photorealistic 3D tiles support
  useEffect(() => {
    const loadGoogleMaps = () => {
      if (window.google?.maps) {
        setIsMapReady(true);
        return;
      }

      const script = document.createElement('script');
      // Load Google Maps with latest version and advanced marker support
      const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || 'AIzaSyAvPZ_0E5dkqYgCqTebp3l3AVTvbz0Nmh8';
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=marker,visualization,geometry,places&callback=initGeospatialMap&v=weekly`;
      script.async = true;
      script.defer = true;
      
      (window as any).initGeospatialMap = () => {
        console.log('✅ Google Maps API loaded with 3D support');
        setIsMapReady(true);
      };
      
      document.head.appendChild(script);
    };

    loadGoogleMaps();
  }, []);

  // Initialize enhanced map with photorealistic 3D capabilities
  useEffect(() => {
    if (!isMapReady || !mapRef.current || map) return;

    const initializeMap = async () => {
      try {
        if (mapMode === '3d') {
          try {
            // Use standard Maps library for reliable satellite view
            const googleMap = new window.google.maps.Map(mapRef.current, {
              center: { lat: 37.4239163, lng: -122.0947209 },
              zoom: 16,
              mapTypeId: 'satellite',
              mapId: 'DEMO_MAP_ID', // Add Map ID for Advanced Markers
              tilt: 45, // 3D tilt effect
              heading: 0,
              clickableIcons: true,
              gestureHandling: 'greedy',
              keyboardShortcuts: true
            });
            
            console.log('🌍 3D-style satellite map loaded successfully');
            setMap(googleMap);
          } catch (error) {
            console.error('❌ Failed to load 3D Maps:', error);
            console.log('ℹ️ Falling back to enhanced 2D map with advanced markers');
            // Fallback to enhanced satellite view with latest features
            const { Map } = await window.google.maps.importLibrary("maps") as any;
            const googleMap = new Map(mapRef.current, {
              center: { lat: 37.4239163, lng: -122.0947209 },
              zoom: 16,
              mapTypeId: 'hybrid', // Better than satellite for infrastructure
              tilt: 45,
              heading: 0,
              clickableIcons: true,
              gestureHandling: 'greedy',
              keyboardShortcuts: true
            });
            setMap(googleMap);
          }
        } else {
          // Standard 2D map 
          const googleMap = new window.google.maps.Map(mapRef.current, {
            center: { lat: 30, lng: 0 },
            zoom: 3,
            mapTypeId: mapMode === 'satellite' ? 'hybrid' : 'roadmap',
            mapId: 'DEMO_MAP_ID', // Add Map ID for Advanced Markers
            tilt: mapMode === 'satellite' ? 45 : 0,
            heading: 0,
            // Only apply custom styles for standard mode, not when mapId is used
            ...(mapMode === 'standard' && false ? {
              styles: [
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
                  "featureType": "water",
                  "elementType": "geometry",
                  "stylers": [{ "color": "#000000" }]
                }
              ]
            } : {}),
            zoomControl: true,
            mapTypeControl: true,
            scaleControl: true,
            streetViewControl: mapMode === 'satellite',
            rotateControl: mapMode === 'satellite',
            fullscreenControl: true,
            // Enhanced controls for better UX
            gestureHandling: 'greedy',
            clickableIcons: true
          });
          
          setMap(googleMap);
        }
      } catch (error) {
        console.error('❌ Error initializing map:', error);
        console.log('ℹ️ For photorealistic 3D maps, ensure:');
        console.log('1. Map Tiles API is enabled in Google Cloud Console');
        console.log('2. Billing is set up (required for 3D tiles)');
        console.log('3. API key has proper permissions');
        
        // Fallback to enhanced standard map
        const googleMap = new window.google.maps.Map(mapRef.current, {
          center: { lat: 20, lng: 0 },
          zoom: 2,
          mapTypeId: 'hybrid',
          mapId: 'DEMO_MAP_ID', // Add Map ID for Advanced Markers
          zoomControl: true,
          mapTypeControl: true,
          streetViewControl: true,
          fullscreenControl: true
        });
        setMap(googleMap);
      }
    };

    initializeMap();
  }, [isMapReady, mapMode]);

  // Clear existing overlays
  const clearOverlays = () => {
    overlays.forEach(overlay => {
      if (overlay.setMap) overlay.setMap(null);
      if (overlay.setVisible) overlay.setVisible(false);
    });
    setOverlays([]);
  };

  // Render advanced threat markers with 3D capabilities
  const renderThreatMarkers = async () => {
    if (!map || !threats) return;

    const newOverlays: any[] = [];

    try {
      if (mapMode === '3d') {
        // 3D Markers for photorealistic map
        const { Marker3DInteractiveElement } = await window.google.maps.importLibrary("maps3d");
        
        (threats as GeospatialThreat[]).forEach((threat: GeospatialThreat) => {
          // Validate coordinates before creating marker
          if (typeof threat.latitude !== 'number' || typeof threat.longitude !== 'number' || 
              isNaN(threat.latitude) || isNaN(threat.longitude)) {
            console.warn('Invalid coordinates for threat:', threat);
            return;
          }

          const color = threat.severity === 'critical' ? '#ef4444' : 
                       threat.severity === 'high' ? '#f97316' : 
                       threat.severity === 'medium' ? '#eab308' : '#22c55e';
          
          const altitude = threat.severity === 'critical' ? 200 : 
                          threat.severity === 'high' ? 150 : 
                          threat.severity === 'medium' ? 100 : 50;

          const marker3D = new Marker3DInteractiveElement({
            position: { lat: threat.latitude, lng: threat.longitude, altitude: altitude },
            altitudeMode: "ABSOLUTE",
            extruded: true,
            label: `${threat.threatType.toUpperCase()}`,
            collisionBehavior: "REQUIRED"
          });

          // Custom 3D marker styling
          marker3D.style.backgroundColor = color;
          marker3D.style.borderColor = '#ffffff';
          marker3D.style.color = '#ffffff';
          marker3D.style.fontWeight = 'bold';
          marker3D.style.fontSize = '12px';
          marker3D.style.padding = '8px';
          marker3D.style.borderRadius = '8px';
          marker3D.style.boxShadow = `0 0 20px ${color}`;

          marker3D.addEventListener('click', () => {
            console.log('3D Threat marker clicked:', threat);
            // Custom 3D interaction logic
          });

          map.append(marker3D);
          newOverlays.push(marker3D);
        });
      } else {
        // Advanced 2D markers
        const { AdvancedMarkerElement, PinElement } = await window.google.maps.importLibrary("marker");
        
        (threats as GeospatialThreat[]).forEach((threat: GeospatialThreat) => {
          const color = threat.severity === 'critical' ? '#ef4444' : 
                       threat.severity === 'high' ? '#f97316' : 
                       threat.severity === 'medium' ? '#eab308' : '#22c55e';
          
          // Create custom HTML content for advanced marker
          const content = document.createElement('div');
          content.className = 'threat-marker';
          content.innerHTML = `
            <div style="
              background: ${color};
              color: white;
              padding: 8px 12px;
              border-radius: 20px;
              font-size: 12px;
              font-weight: bold;
              box-shadow: 0 4px 12px rgba(0,0,0,0.3);
              border: 2px solid #ffffff;
              animation: pulse 2s infinite;
              position: relative;
            ">
              🚨 ${threat.threatType.toUpperCase()}
              <div style="
                position: absolute;
                bottom: -8px;
                left: 50%;
                transform: translateX(-50%);
                width: 0;
                height: 0;
                border-left: 8px solid transparent;
                border-right: 8px solid transparent;
                border-top: 8px solid ${color};
              "></div>
            </div>
          `;

          const advancedMarker = new AdvancedMarkerElement({
            map: map,
            position: { lat: threat.latitude, lng: threat.longitude },
            content: content,
            title: `${threat.threatType} - ${threat.city}, ${threat.country}`
          });

          const infoWindow = new window.google.maps.InfoWindow({
            content: `
              <div style="color: #333; font-size: 14px; max-width: 350px; font-family: 'Segoe UI', sans-serif;">
                <div style="font-weight: bold; margin-bottom: 12px; color: ${color}; font-size: 16px; text-align: center; text-transform: uppercase;">
                  🚨 ${threat.threatType} THREAT
                </div>
                <div style="background: #f8f9fa; padding: 12px; border-radius: 8px; margin-bottom: 12px;">
                  <div style="margin-bottom: 6px;"><strong>Source:</strong> ${threat.source.toUpperCase()}</div>
                  <div style="margin-bottom: 6px;"><strong>Location:</strong> ${threat.city}, ${threat.country}</div>
                  <div style="margin-bottom: 6px;"><strong>IP Address:</strong> <code>${threat.ip}</code></div>
                  <div style="margin-bottom: 6px;"><strong>Severity:</strong> <span style="color: ${color}; font-weight: bold;">${threat.severity.toUpperCase()}</span></div>
                  <div style="margin-bottom: 6px;"><strong>Confidence:</strong> <span style="color: #28a745; font-weight: bold;">${threat.confidence}%</span></div>
                  <div style="margin-bottom: 6px;"><strong>Status:</strong> <span style="color: ${threat.mitigated ? '#28a745' : '#dc3545'}; font-weight: bold;">${threat.mitigated ? '✅ MITIGATED' : '⚠️ ACTIVE'}</span></div>
                </div>
                <div style="margin-bottom: 12px; padding: 8px; background: #e8f4f8; border-radius: 6px;">
                  <strong>Description:</strong> ${threat.description}
                </div>
                <div style="font-size: 11px; color: #666; text-align: center; border-top: 1px solid #eee; padding-top: 8px;">
                  🕒 Detected: ${new Date(threat.timestamp).toLocaleString()}
                </div>
              </div>
            `
          });

          advancedMarker.addListener('click', () => {
            infoWindow.open(map, advancedMarker);
          });

          newOverlays.push(advancedMarker);
        });
      }
    } catch (error) {
      console.error('Error creating markers:', error);
      // Fallback to basic markers
      (threats as GeospatialThreat[]).forEach((threat: GeospatialThreat) => {
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
            strokeColor: '#ffffff',
            strokeOpacity: 1,
            strokeWeight: 2,
            scale: 12
          },
          title: `${threat.threatType} - ${threat.city}, ${threat.country}`
        });

        newOverlays.push(marker);
      });
    }

    setOverlays(newOverlays);
  };

  // Render advanced infrastructure assets with 3D capabilities
  const renderInfrastructureAssets = async () => {
    console.log('🔧 Attempting to render infrastructure:', { 
      map: !!map, 
      infrastructure: !!infrastructure, 
      isArray: Array.isArray(infrastructure),
      length: infrastructure?.length 
    });
    
    if (!map || !infrastructure || !Array.isArray(infrastructure)) {
      console.log('❌ Infrastructure data not ready:', { map: !!map, infrastructure: !!infrastructure, isArray: Array.isArray(infrastructure) });
      return;
    }
    
    if (infrastructure.length === 0) {
      console.log('⚠️ No infrastructure devices to display');
      return;
    }
    
    console.log('✅ Rendering', infrastructure.length, 'infrastructure devices');

    const newOverlays: any[] = [];

    try {
      if (mapMode === '3d') {
        // 3D Infrastructure markers for photorealistic map
        const { Marker3DInteractiveElement } = await window.google.maps.importLibrary("maps3d");
        
        (infrastructure as InfrastructureAsset[]).forEach((asset: InfrastructureAsset) => {
          const color = asset.status === 'healthy' ? '#22c55e' : 
                       asset.status === 'warning' ? '#eab308' : 
                       asset.status === 'critical' ? '#ef4444' : '#6b7280';
          
          const altitude = asset.criticality === 'critical' ? 300 : 
                          asset.criticality === 'high' ? 200 : 
                          asset.criticality === 'medium' ? 100 : 50;
          
          const icon = asset.type === 'server' ? '🖥️' :
                       asset.type === 'firewall' ? '🛡️' :
                       asset.type === 'database' ? '🗄️' :
                       asset.type === 'router' ? '📡' : '⚙️';

          const marker3D = new Marker3DInteractiveElement({
            position: { lat: asset.latitude, lng: asset.longitude, altitude: altitude },
            altitudeMode: "ABSOLUTE",
            extruded: true,
            label: `${icon} ${asset.name}`,
            collisionBehavior: "REQUIRED"
          });

          // Custom 3D infrastructure styling
          marker3D.style.backgroundColor = color;
          marker3D.style.borderColor = '#ffffff';
          marker3D.style.color = '#ffffff';
          marker3D.style.fontWeight = 'bold';
          marker3D.style.fontSize = '11px';
          marker3D.style.padding = '6px 10px';
          marker3D.style.borderRadius = '12px';
          marker3D.style.boxShadow = `0 0 15px ${color}`;
          marker3D.style.minWidth = '120px';
          marker3D.style.textAlign = 'center';

          marker3D.addEventListener('click', () => {
            console.log('3D Infrastructure asset clicked:', asset);
          });

          map.append(marker3D);
          newOverlays.push(marker3D);
        });
      } else {
        // Advanced 2D infrastructure markers
        const { AdvancedMarkerElement } = await window.google.maps.importLibrary("marker");
        
        (infrastructure as InfrastructureAsset[]).forEach((asset: InfrastructureAsset) => {
          const color = asset.status === 'healthy' ? '#22c55e' : 
                       asset.status === 'warning' ? '#eab308' : 
                       asset.status === 'critical' ? '#ef4444' : '#6b7280';
          
          const icon = asset.type === 'server' ? '🖥️' :
                       asset.type === 'firewall' ? '🛡️' :
                       asset.type === 'database' ? '🗄️' :
                       asset.type === 'router' ? '📡' : '⚙️';
          
          // Create custom HTML content for infrastructure marker
          const content = document.createElement('div');
          content.className = 'infrastructure-marker';
          content.innerHTML = `
            <div style="
              background: linear-gradient(135deg, ${color}, ${color}cc);
              color: white;
              padding: 10px 14px;
              border-radius: 25px;
              font-size: 12px;
              font-weight: bold;
              box-shadow: 0 6px 20px rgba(0,0,0,0.3);
              border: 2px solid #ffffff;
              position: relative;
              min-width: 140px;
              text-align: center;
              backdrop-filter: blur(5px);
            ">
              <div style="font-size: 16px; margin-bottom: 2px;">${icon}</div>
              <div style="font-size: 10px; text-transform: uppercase;">${asset.name}</div>
              <div style="
                position: absolute;
                bottom: -10px;
                left: 50%;
                transform: translateX(-50%);
                width: 0;
                height: 0;
                border-left: 10px solid transparent;
                border-right: 10px solid transparent;
                border-top: 10px solid ${color};
              "></div>
            </div>
          `;

          const advancedMarker = new AdvancedMarkerElement({
            map: map,
            position: { lat: asset.latitude, lng: asset.longitude },
            content: content,
            title: `${asset.name} - ${asset.location}`
          });

          const infoWindow = new window.google.maps.InfoWindow({
            content: `
              <div style="color: #333; font-size: 14px; max-width: 400px; font-family: 'Segoe UI', sans-serif;">
                <div style="font-weight: bold; margin-bottom: 12px; color: ${color}; font-size: 16px; text-align: center; display: flex; align-items: center; justify-content: center;">
                  <span style="margin-right: 8px; font-size: 20px;">${icon}</span>
                  ${asset.name}
                </div>
                <div style="background: #f8f9fa; padding: 12px; border-radius: 8px; margin-bottom: 12px;">
                  <div style="margin-bottom: 6px;"><strong>Type:</strong> <span style="text-transform: uppercase; color: #007bff;">${asset.type}</span></div>
                  <div style="margin-bottom: 6px;"><strong>Status:</strong> 
                    <span style="color: ${color}; font-weight: bold; text-transform: uppercase;">
                      ${asset.status === 'healthy' ? '✅' : asset.status === 'warning' ? '⚠️' : '❌'} ${asset.status}
                    </span>
                  </div>
                  <div style="margin-bottom: 6px;"><strong>IP Address:</strong> <code style="background: #e9ecef; padding: 2px 6px; border-radius: 4px;">${asset.ipAddress}</code></div>
                  <div style="margin-bottom: 6px;"><strong>Location:</strong> ${asset.location}</div>
                  <div style="margin-bottom: 6px;"><strong>Criticality:</strong> <span style="color: ${asset.criticality === 'critical' ? '#dc3545' : '#6c757d'}; font-weight: bold; text-transform: uppercase;">${asset.criticality}</span></div>
                </div>
                <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px; margin-bottom: 12px;">
                  <div style="text-align: center; padding: 8px; background: #fff3cd; border-radius: 6px;">
                    <div style="font-weight: bold; color: #856404;">${asset.vulnerabilities}</div>
                    <div style="font-size: 11px; color: #856404;">Vulnerabilities</div>
                  </div>
                  <div style="text-align: center; padding: 8px; background: #d1ecf1; border-radius: 6px;">
                    <div style="font-weight: bold; color: #0c5460;">${asset.complianceScore}%</div>
                    <div style="font-size: 11px; color: #0c5460;">Compliance</div>
                  </div>
                  <div style="text-align: center; padding: 8px; background: #f8d7da; border-radius: 6px;">
                    <div style="font-weight: bold; color: #721c24;">${asset.incidents}</div>
                    <div style="font-size: 11px; color: #721c24;">Incidents</div>
                  </div>
                </div>
                <div style="font-size: 11px; color: #666; text-align: center; border-top: 1px solid #eee; padding-top: 8px;">
                  🏢 Infrastructure Asset Monitoring
                </div>
              </div>
            `
          });

          advancedMarker.addListener('click', () => {
            infoWindow.open(map, advancedMarker);
          });

          newOverlays.push(advancedMarker);
        });
      }
    } catch (error) {
      console.error('❌ Error creating advanced markers, using basic markers:', error);
      
      // Clear any partial overlays from failed attempt
      newOverlays.length = 0;
      
      // Ensure we have valid data before fallback
      if (!Array.isArray(infrastructure) || infrastructure.length === 0) {
        console.warn('⚠️ No valid infrastructure data for fallback');
        return;
      }
      
      console.log('🔧 Creating basic markers for', infrastructure.length, 'devices');
      
      // Fallback to basic markers
      infrastructure.forEach((asset: InfrastructureAsset) => {
        const color = asset.status === 'healthy' ? '#22c55e' : 
                     asset.status === 'warning' ? '#eab308' : 
                     asset.status === 'critical' ? '#ef4444' : '#6b7280';

        try {
          const marker = new window.google.maps.Marker({
            position: { lat: asset.latitude, lng: asset.longitude },
            map: map,
            icon: {
              path: window.google.maps.SymbolPath.CIRCLE,
              fillColor: color,
              fillOpacity: 0.8,
              strokeColor: '#ffffff',
              strokeOpacity: 1,
              strokeWeight: 2,
              scale: 12
            },
            title: `${asset.name} - ${asset.location}`
          });
          
          const infoWindow = new window.google.maps.InfoWindow({
            content: `
              <div style="color: #333; max-width: 250px;">
                <h4 style="margin: 0 0 8px 0; color: ${color};">${asset.name}</h4>
                <p style="margin: 0; font-size: 12px;"><strong>Type:</strong> ${asset.type}</p>
                <p style="margin: 0; font-size: 12px;"><strong>Status:</strong> ${asset.status}</p>
                <p style="margin: 0; font-size: 12px;"><strong>Location:</strong> ${asset.location}</p>
              </div>
            `
          });
          
          marker.addListener('click', () => {
            infoWindow.open(map, marker);
          });

          newOverlays.push(marker);
        } catch (markerError) {
          console.warn('⚠️ Failed to create marker for device:', asset.id, markerError);
        }
      });
    }

    setOverlays(newOverlays);
  };

  // Render compliance regions
  const renderComplianceRegions = () => {
    if (!map || !complianceRegions) return;

    const newOverlays: any[] = [];

    (complianceRegions as ComplianceRegion[]).forEach((region: ComplianceRegion) => {
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

    (incidents as IncidentLocation[]).forEach((incident: IncidentLocation) => {
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

  const resetView = async () => {
    if (map) {
      if (mapMode === '3d') {
        // Reset 3D view with smooth animation
        try {
          await map.flyCameraTo({
            endCamera: {
              center: { lat: 37.4239163, lng: -122.0947209, altitude: 0 },
              tilt: 67.5,
              range: 2000,
              heading: 0,
              roll: 0
            },
            durationMillis: 2000
          });
        } catch (error) {
          console.error('Error resetting 3D view:', error);
        }
      } else {
        // Reset 2D view
        map.setCenter({ lat: 20, lng: 0 });
        map.setZoom(2);
        if (map.setTilt) map.setTilt(0);
        if (map.setHeading) map.setHeading(0);
      }
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
                  {(geospatialData as any)?.overview?.activeThreats || 0}
                </Badge>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-400">Infrastructure</span>
                <Badge variant="secondary" className="text-xs">
                  {(geospatialData as any)?.overview?.healthyAssets || 0} Healthy
                </Badge>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-400">Open Incidents</span>
                <Badge variant="destructive" className="text-xs">
                  {(geospatialData as any)?.overview?.openIncidents || 0}
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
                {mapMode === '3d' ? 'PHOTOREALISTIC 3D INTELLIGENCE' : 'LIVE GEOSPATIAL INTELLIGENCE'}
              </div>
              <div className="text-xs text-gray-300 mt-1">
                Layer: {activeLayer.toUpperCase()} | Mode: {mapMode === '3d' ? 'PHOTOREALISTIC 3D' : mapMode.toUpperCase()}
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
                {activeLayer === 'threats' && Array.isArray(threats) ? `${threats.length} THREATS TRACKED` :
                 activeLayer === 'infrastructure' && Array.isArray(infrastructure) ? `${infrastructure.length} ASSETS MONITORED` :
                 activeLayer === 'incidents' && Array.isArray(incidents) ? `${incidents.length} ACTIVE INCIDENTS` :
                 activeLayer === 'compliance' && Array.isArray(complianceRegions) ? `${complianceRegions.length} COMPLIANCE ZONES` :
                 'MULTIPLE LAYERS ACTIVE'}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}