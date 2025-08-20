import { useEffect, useState } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";

interface ThreatLocation {
  id: string;
  type: string;
  latitude: number;
  longitude: number;
  severity: "high" | "medium" | "low";
  timestamp: number;
  country: string;
  description: string;
}

interface ThreatMapProps {
  height?: string;
  width?: string;
}

export function ThreatMap({ height = "400px", width = "100%" }: ThreatMapProps) {
  const [threats, setThreats] = useState<ThreatLocation[]>([]);
  const [stats, setStats] = useState({
    total: 0,
    high: 0,
    medium: 0,
    low: 0
  });

  useEffect(() => {
    // Generate mock threat data - in real implementation, this would come from API
    const generateThreats = () => {
      const threatTypes = ["malware", "ddos", "phishing", "ransomware", "botnet", "intrusion"];
      const severities: ("high" | "medium" | "low")[] = ["high", "medium", "low"];
      const countries = [
        { name: "United States", lat: 39.8283, lng: -98.5795 },
        { name: "China", lat: 35.8617, lng: 104.1954 },
        { name: "Russia", lat: 61.5240, lng: 105.3188 },
        { name: "Germany", lat: 51.1657, lng: 10.4515 },
        { name: "United Kingdom", lat: 55.3781, lng: -3.4360 },
        { name: "Japan", lat: 36.2048, lng: 138.2529 },
        { name: "Brazil", lat: -14.2350, lng: -51.9253 },
        { name: "India", lat: 20.5937, lng: 78.9629 },
        { name: "Australia", lat: -25.2744, lng: 133.7751 },
        { name: "Canada", lat: 56.1304, lng: -106.3468 }
      ];

      const newThreats: ThreatLocation[] = [];
      
      for (let i = 0; i < 15; i++) {
        const country = countries[Math.floor(Math.random() * countries.length)];
        const threatType = threatTypes[Math.floor(Math.random() * threatTypes.length)];
        const severity = severities[Math.floor(Math.random() * severities.length)];
        
        // Add some randomness to coordinates for spread
        const lat = country.lat + (Math.random() - 0.5) * 10;
        const lng = country.lng + (Math.random() - 0.5) * 20;
        
        newThreats.push({
          id: `threat-${i}`,
          type: threatType,
          latitude: lat,
          longitude: lng,
          severity,
          timestamp: Date.now() - Math.random() * 86400000, // Last 24 hours
          country: country.name,
          description: `${threatType.charAt(0).toUpperCase() + threatType.slice(1)} attack detected`
        });
      }

      setThreats(newThreats);
      
      // Calculate stats
      const newStats = {
        total: newThreats.length,
        high: newThreats.filter(t => t.severity === "high").length,
        medium: newThreats.filter(t => t.severity === "medium").length,
        low: newThreats.filter(t => t.severity === "low").length
      };
      setStats(newStats);
    };

    generateThreats();
    
    // Update threats every 30 seconds
    const interval = setInterval(generateThreats, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const getThreatColor = (severity: string): string => {
    switch (severity) {
      case "high": return "#ef4444"; // red-500
      case "medium": return "#f59e0b"; // amber-500  
      case "low": return "#3b82f6"; // blue-500
      default: return "#6b7280"; // gray-500
    }
  };

  const getThreatRadius = (severity: string): number => {
    switch (severity) {
      case "high": return 12;
      case "medium": return 8;
      case "low": return 6;
      default: return 5;
    }
  };

  const formatTimestamp = (timestamp: number): string => {
    const now = Date.now();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    
    if (hours > 0) {
      return `${hours}h ago`;
    } else if (minutes > 0) {
      return `${minutes}m ago`;
    } else {
      return "Just now";
    }
  };

  const mapCenter: LatLngExpression = [20, 0];

  return (
    <div className="w-full" style={{ height, width }}>
      <div className="bg-surface border border-surface-light rounded-lg overflow-hidden">
        {/* Stats Header */}
        <div className="p-4 border-b border-surface-light bg-surface/50">
          <div className="grid grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-white">{stats.total}</div>
              <div className="text-xs text-gray-400 uppercase">Total Threats</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-red-400">{stats.high}</div>
              <div className="text-xs text-gray-400 uppercase">High Risk</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-amber-400">{stats.medium}</div>
              <div className="text-xs text-gray-400 uppercase">Medium Risk</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-400">{stats.low}</div>
              <div className="text-xs text-gray-400 uppercase">Low Risk</div>
            </div>
          </div>
        </div>

        {/* Map Container */}
        <div style={{ height: `calc(${height} - 80px)` }}>
          <MapContainer
            center={mapCenter}
            zoom={2}
            style={{ height: "100%", width: "100%" }}
            className="threat-map"
          >
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            />
            
            {threats.map((threat) => (
              <CircleMarker
                key={threat.id}
                center={[threat.latitude, threat.longitude]}
                radius={getThreatRadius(threat.severity)}
                fillColor={getThreatColor(threat.severity)}
                color="#ffffff"
                weight={2}
                opacity={0.8}
                fillOpacity={0.6}
                className="threat-marker"
              >
                <Popup className="threat-popup">
                  <div className="p-2">
                    <div className="font-semibold text-lg mb-2 capitalize">
                      {threat.type} Attack
                    </div>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Severity:</span>
                        <span className={`font-medium ${
                          threat.severity === "high" ? "text-red-500" :
                          threat.severity === "medium" ? "text-amber-500" :
                          "text-blue-500"
                        }`}>
                          {threat.severity.charAt(0).toUpperCase() + threat.severity.slice(1)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Location:</span>
                        <span className="font-medium">{threat.country}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Detected:</span>
                        <span className="font-medium">{formatTimestamp(threat.timestamp)}</span>
                      </div>
                      <div className="mt-2 pt-2 border-t border-gray-200">
                        <div className="text-gray-600 text-xs">{threat.description}</div>
                      </div>
                    </div>
                  </div>
                </Popup>
              </CircleMarker>
            ))}
          </MapContainer>
        </div>
      </div>

      {/* Custom CSS for dark theme map */}
      <style>{`
        .threat-map .leaflet-container {
          background: #1a1a1a;
        }
        
        .threat-marker {
          animation: threatPulse 2s ease-in-out infinite;
        }
        
        @keyframes threatPulse {
          0% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.2); opacity: 1; }
          100% { transform: scale(1); opacity: 0.8; }
        }
        
        .leaflet-popup-content-wrapper {
          background: #2d3748;
          color: #e2e8f0;
          border-radius: 8px;
        }
        
        .leaflet-popup-tip {
          background: #2d3748;
        }
        
        .leaflet-control-zoom a {
          background: #2d3748;
          color: #e2e8f0;
          border: 1px solid #4a5568;
        }
        
        .leaflet-control-zoom a:hover {
          background: #4a5568;
        }
        
        .leaflet-control-attribution {
          background: rgba(45, 55, 72, 0.8);
          color: #a0aec0;
        }
      `}</style>
    </div>
  );
}