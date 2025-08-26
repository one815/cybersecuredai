import { useEffect, useState } from "react";
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

export function ThreatMap({ className = "" }: ThreatMapProps) {
  const [isMapReady, setIsMapReady] = useState(false);
  
  // Fetch threat locations with geolocation data
  const { data: threatLocations, isLoading } = useQuery({
    queryKey: ['/api/threats/geolocation'],
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  // Check if Google Maps is available and load if needed
  useEffect(() => {
    const loadGoogleMaps = () => {
      if ((window as any).google?.maps) {
        setIsMapReady(true);
        return;
      }

      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&libraries=visualization`;
      script.async = true;
      script.defer = true;
      script.onload = () => {
        setIsMapReady(true);
      };
      document.head.appendChild(script);
    };

    loadGoogleMaps();
  }, []);

  if (isLoading || !isMapReady) {
    return (
      <div className={`bg-gray-900/50 rounded-lg p-4 min-h-[300px] flex items-center justify-center ${className}`}>
        <div className="text-center text-gray-400">
          <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
          <p>Loading Threat Map...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-gray-900/50 rounded-lg overflow-hidden relative ${className}`}>
      {/* Interactive Threat Map Display */}
      <div className="w-full h-full min-h-[300px] relative bg-gray-800">
        {/* World Map Background */}
        <div className="absolute inset-0 opacity-30">
          <svg viewBox="0 0 800 400" className="w-full h-full">
            {/* Continents outlines */}
            <path d="M100 160 Q160 120 240 140 Q320 150 400 160 Q480 150 560 140 Q640 150 700 160 L700 240 Q640 250 560 260 Q480 250 400 240 Q320 250 240 260 Q160 250 100 240 Z" fill="currentColor" className="text-blue-800" />
            <path d="M160 100 Q200 80 280 90 Q360 100 440 90 Q520 80 600 100 L600 160 Q520 150 440 150 Q360 160 280 150 Q200 160 160 160 Z" fill="currentColor" className="text-blue-800" />
            <path d="M240 260 Q280 240 360 250 Q440 260 520 250 Q600 240 680 260 L680 320 Q600 310 520 310 Q440 320 360 310 Q280 320 240 320 Z" fill="currentColor" className="text-blue-800" />
          </svg>
        </div>

        {/* Live Threat Markers */}
        {threatLocations && threatLocations.map((threat: ThreatLocation, index: number) => {
          const riskColor = threat.riskLevel === 'high' ? 'bg-red-500 shadow-red-500/50' : 
                           threat.riskLevel === 'medium' ? 'bg-yellow-500 shadow-yellow-500/50' : 
                           'bg-blue-500 shadow-blue-500/50';
          const size = threat.riskLevel === 'high' ? 'w-4 h-4' : threat.riskLevel === 'medium' ? 'w-3 h-3' : 'w-2 h-2';
          
          // Convert lat/lng to approximate position on the SVG map
          const x = ((threat.longitude + 180) / 360) * 100; // Convert longitude to percentage
          const y = ((90 - threat.latitude) / 180) * 100; // Convert latitude to percentage
          
          return (
            <div 
              key={`${threat.ip}-${index}`}
              className={`absolute ${size} ${riskColor} rounded-full animate-pulse shadow-lg cursor-pointer`}
              style={{
                left: `${Math.max(5, Math.min(95, x))}%`,
                top: `${Math.max(5, Math.min(95, y))}%`,
                transform: 'translate(-50%, -50%)'
              }}
              title={`${threat.ip} - ${threat.city}, ${threat.country} (${threat.riskLevel} risk: ${threat.abuseConfidence}% confidence)`}
            />
          );
        })}

        {/* Scanning Animation Lines */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse"></div>
          <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-green-400 to-transparent animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-2/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>

        {/* Center Globe with Pulse */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <div className="relative">
            <div className="absolute inset-0 w-8 h-8 bg-cyan-400 rounded-full animate-ping opacity-20"></div>
            <div className="relative w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm-1.93 15.929l-4.243-4.242L4.414 12l4.243-4.243L10.07 6.343l4.243 4.242L13.657 12l-4.242 4.243z"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Map Controls Overlay */}
      <div className="absolute top-2 left-2 bg-black/80 rounded px-2 py-1">
        <div className="text-xs text-cyan-400 font-mono">
          LIVE THREAT MONITORING
        </div>
      </div>
      
      <div className="absolute top-2 right-2 bg-black/80 rounded px-2 py-1 flex items-center">
        <div className="w-1 h-1 bg-green-400 rounded-full animate-pulse mr-1"></div>
        <div className="text-xs text-green-400 font-mono">REAL-TIME</div>
      </div>

      {/* Legend */}
      <div className="absolute bottom-2 left-2 bg-black/80 rounded p-2">
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
      <div className="absolute bottom-2 right-2 bg-black/80 rounded p-2">
        <div className="text-xs text-gray-300 font-mono">
          {threatLocations ? `${threatLocations.length} ACTIVE THREATS` : 'SCANNING...'}
        </div>
      </div>
    </div>
  );
}