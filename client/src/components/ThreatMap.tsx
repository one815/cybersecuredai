import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";

interface ThreatLocation {
  ip: string;
  latitude: number;
  longitude: number;
  country: string;
  city: string;
  riskLevel: 'high' | 'medium' | 'low';
  abuseConfidence: number;
  lastSeen: string;
}

interface ThreatMapProps {
  className?: string;
}

declare global {
  interface Window {
    google: any;
  }
}

export function ThreatMap({ className = "" }: ThreatMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);
  const [markers, setMarkers] = useState<any[]>([]);
  const [isMapReady, setIsMapReady] = useState(false);
  const [mapMode, setMapMode] = useState('3d'); // Set to 3D by default for marketing demo
  
  // Fetch threat locations with geolocation data
  const { data: threatLocations, isLoading } = useQuery({
    queryKey: ['/api/threats/geolocation'],
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  // Load Google Maps script
  useEffect(() => {
    const loadGoogleMaps = () => {
      if (window.google?.maps) {
        setIsMapReady(true);
        return;
      }

      const script = document.createElement('script');
      // Load with enhanced features for 3D satellite view - using environment variable
      const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || 'AIzaSyAvPZ_0E5dkqYgCqTebp3l3AVTvbz0Nmh8';
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=marker,visualization,geometry,places&callback=initMap&v=weekly`;
      script.async = true;
      script.defer = true;
      
      // Add global callback
      (window as any).initMap = () => {
        setIsMapReady(true);
      };
      
      document.head.appendChild(script);
    };

    loadGoogleMaps();
  }, []);

  // Initialize the map when ready
  useEffect(() => {
    if (!isMapReady || !mapRef.current || map) return;

    const googleMap = new window.google.maps.Map(mapRef.current, {
      center: { lat: 39.8283, lng: -98.5795 }, // Center on US for better marketing demo
      zoom: 4,
      mapTypeId: 'satellite', // Use satellite view for 3D effect
      mapId: 'DEMO_MAP_ID', // Add Map ID for Advanced Markers
      tilt: 45, // Enhanced 3D perspective
      heading: 0,
      styles: [
        // Enhanced satellite styling for 3D marketing demo
        {
          "featureType": "all",
          "elementType": "labels",
          "stylers": [{ "visibility": "on" }]
        },
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
      zoomControlOptions: {
        position: window.google.maps.ControlPosition.RIGHT_CENTER
      },
      // Enhanced controls for 3D demo
      rotateControl: true,
      tiltControl: true,
      fullscreenControl: false,
      streetViewControl: false
    });

    setMap(googleMap);
  }, [isMapReady, map]);

  // Update markers when threat locations change
  useEffect(() => {
    console.log('🗺️ ThreatMap: Received data:', { 
      hasMap: !!map, 
      hasData: !!threatLocations, 
      isArray: Array.isArray(threatLocations),
      dataCount: threatLocations?.length,
      data: threatLocations 
    });

    if (!map || !threatLocations || !Array.isArray(threatLocations)) return;

    // Clear existing markers
    markers.forEach(marker => marker.setMap(null));
    setMarkers([]);

    const newMarkers: any[] = [];

    (threatLocations as ThreatLocation[]).forEach((threat: ThreatLocation) => {
      const color = threat.riskLevel === 'high' ? '#ef4444' : 
                   threat.riskLevel === 'medium' ? '#f59e0b' : '#3b82f6';

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
          scale: threat.riskLevel === 'high' ? 10 : threat.riskLevel === 'medium' ? 8 : 6
        },
        title: `${threat.ip} - ${threat.city}, ${threat.country}`,
        animation: window.google.maps.Animation.DROP
      });

      const infoWindow = new window.google.maps.InfoWindow({
        content: `
          <div style="color: #333; font-size: 14px;">
            <div style="font-weight: bold; margin-bottom: 8px;">${threat.ip}</div>
            <div style="margin-bottom: 4px;">📍 ${threat.city}, ${threat.country}</div>
            <div style="margin-bottom: 4px;">⚠️ Risk: ${threat.riskLevel.toUpperCase()}</div>
            <div style="margin-bottom: 4px;">🎯 Confidence: ${threat.abuseConfidence}%</div>
            <div>🕒 Last Seen: ${new Date(threat.lastSeen).toLocaleString()}</div>
          </div>
        `
      });

      marker.addListener('click', () => {
        infoWindow.open(map, marker);
      });

      newMarkers.push(marker);
    });

    setMarkers(newMarkers);
  }, [map, threatLocations]);

  if (isLoading || !isMapReady) {
    return (
      <div className={`bg-gray-900/50 rounded-lg p-4 min-h-[300px] flex items-center justify-center ${className}`}>
        <div className="text-center text-gray-400">
          <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
          <p>{isLoading ? 'Loading Threat Data...' : 'Loading Google Maps...'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-gray-900/50 rounded-lg overflow-hidden relative ${className}`}>
      {/* Google Maps Container */}
      <div ref={mapRef} className="w-full h-full min-h-[300px]" />

      {/* Map Controls Overlay */}
      <div className="absolute top-2 left-2 bg-black/80 rounded px-2 py-1 z-10">
        <div className="text-xs text-cyan-400 font-mono">
          LIVE THREAT MONITORING
        </div>
      </div>
      
      <div className="absolute top-2 right-2 bg-black/80 rounded px-2 py-1 flex items-center z-10">
        <div className="w-1 h-1 bg-green-400 rounded-full animate-pulse mr-1"></div>
        <div className="text-xs text-green-400 font-mono">REAL-TIME</div>
      </div>

      {/* Legend */}
      <div className="absolute bottom-2 left-2 bg-black/80 rounded p-2 z-10">
        <div className="text-xs text-gray-300 mb-1 font-semibold">Threat Levels</div>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            <span className="text-xs text-gray-300">High Risk</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            <span className="text-xs text-gray-300">Medium Risk</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="text-xs text-gray-300">Low Risk</span>
          </div>
        </div>
      </div>

      {/* Threat Stats */}
      <div className="absolute bottom-2 right-2 bg-black/80 rounded p-2 z-10">
        <div className="text-xs text-gray-300 font-mono">
          {threatLocations && Array.isArray(threatLocations) ? `${threatLocations.length} ACTIVE THREATS` : 'SCANNING...'}
        </div>
      </div>
    </div>
  );
}