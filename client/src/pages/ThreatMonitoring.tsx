import { useState, useCallback, useRef, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertTriangle, Shield, Eye, Filter, Clock, Globe, MapPin, Activity, Database, Server, Users, CheckCircle, PlayCircle, PauseCircle, SkipForward, Search, TrendingUp, BarChart3, Zap, Settings, RefreshCw, Download, Layers, Cpu, Cloud } from "lucide-react";
import { ThreatMap } from "@/components/ThreatMap";

// Extend window interface for Google Maps
declare global {
  interface Window {
    google: typeof google;
  }
}

export default function ThreatMonitoring() {
  const [selectedTab, setSelectedTab] = useState("map");
  const [timeFilter, setTimeFilter] = useState("24h");
  const [threatTypeFilter, setThreatTypeFilter] = useState("all");
  const [severityFilter, setSeverityFilter] = useState("all");
  const [dataSourcesActive, setDataSourcesActive] = useState({
    alienvault: true,
    xforce: true,
    virustotal: true,
    custom: false
  });
  
  const { data: threats = [], isLoading } = useQuery<any[]>({
    queryKey: ["/api/threats"],
  });

  // Mock data to match the design
  const threatStats = {
    currentLevel: "Critical",
    activeIncidents: 12,
    responseTime: "4.2 min",
    threatSources: 7
  };

  const criticalIncidents = [
    {
      id: 1,
      type: "Data Exfiltration Attempt",
      target: "Database server (192.168.1.45)",
      description: "Unusual outbound data transfer of 2.4GB to unknown IP",
      time: "14 minutes ago",
      status: "Live"
    },
    {
      id: 2,
      type: "Ransomware Activity",
      target: "File Server (192.168.2.12)",
      description: "Multiple file encryption attempts detected. BlackCat variant",
      time: "23 minutes ago", 
      status: "Live"
    },
    {
      id: 3,
      type: "Privilege Escalation",
      target: "Domain Controller (10.0.0.1)",
      description: "Unauthorized admin access attempt",
      time: "45 minutes ago",
      status: "Live"
    }
  ];

  const recentIncidents = [
    {
      severity: "Critical",
      type: "Data Exfiltration Attempt",
      target: "Database Server (192.168.1.45)",
      source: "45.227.x.x (Russia)",
      timestamp: "Today, 10:24 AM",
      status: "Active"
    },
    {
      severity: "Critical",
      type: "Ransomware Activity", 
      target: "File Server (192.168.2.12)",
      source: "Internal (Compromised Account)",
      timestamp: "Today, 10:15 AM",
      status: "Active"
    },
    {
      severity: "High",
      type: "Brute Force Attack",
      target: "Admin Portal (admin.company.com)",
      source: "Multiple IPs (China)",
      timestamp: "Today, 09:52 AM",
      status: "In Progress"
    },
    {
      severity: "High",
      type: "SQL Injection Attempt",
      target: "Customer Portal (app.company.com)",
      source: "103.85.x.x (North Korea)",
      timestamp: "Today, 09:37 AM",
      status: "Mitigated"
    },
    {
      severity: "Medium",
      type: "Suspicious Login",
      target: "VPN (User: jsmith)",
      source: "89.175.x.x (Ukraine)",
      timestamp: "Today, 09:14 AM",
      status: "Resolved"
    },
    {
      severity: "Medium",
      type: "Malware Detection",
      target: "Workstation (WS-045)",
      source: "Email Attachment",
      timestamp: "Today, 08:47 AM",
      status: "Resolved"
    }
  ];

  const responseRecommendations = [
    {
      title: "Data Exfiltration Response",
      priority: "Critical Priority",
      actions: [
        { text: "Isolate database server from network", completed: true },
        { text: "Block outbound traffic to suspicious IP", completed: true },
        { text: "Analyze data packet signatures", completed: false },
        { text: "Implement database activity monitoring", completed: false }
      ]
    },
    {
      title: "Ransomware Mitigation",
      priority: "Critical Priority",
      actions: [
        { text: "Implement IP-based rate limiting", completed: true },
        { text: "Enable CAPTCHA after failed attempts", completed: true },
        { text: "Force password reset for targeted accounts", completed: false },
        { text: "Prepare offline backup restoration", completed: false }
      ]
    },
    {
      title: "Brute Force Protection",
      priority: "High Priority",
      actions: [
        { text: "Implement IP-based rate limiting", completed: true },
        { text: "Enable CAPTCHA after failed attempts", completed: true },
        { text: "Force password reset for targeted accounts", completed: false },
        { text: "Implement geo-blocking for suspicious regions", completed: false }
      ]
    }
  ];

  const countryStats = [
    { country: "Russia", percentage: 42 },
    { country: "China", percentage: 28 },
    { country: "Others", percentage: 30 }
  ];

  // Threat locations for Google Maps
  const threatLocations = [
    {
      lat: 55.7558,
      lng: 37.6176,
      country: "Russia",
      attacks: 34,
      severity: "critical",
      city: "Moscow"
    },
    {
      lat: 39.9042,
      lng: 116.4074,
      country: "China",
      attacks: 21,
      severity: "high",
      city: "Beijing"
    },
    {
      lat: 39.0392,
      lng: 125.7625,
      country: "North Korea",
      attacks: 15,
      severity: "medium",
      city: "Pyongyang"
    },
    {
      lat: 35.6762,
      lng: 139.6503,
      country: "Japan",
      attacks: 8,
      severity: "low",
      city: "Tokyo"
    },
    {
      lat: 52.5200,
      lng: 13.4050,
      country: "Germany",
      attacks: 12,
      severity: "medium",
      city: "Berlin"
    },
    {
      lat: 51.5074,
      lng: -0.1278,
      country: "United Kingdom",
      attacks: 6,
      severity: "low",
      city: "London"
    }
  ];

  // Google Maps component
  const ThreatMap = ({ locations }: { locations: typeof threatLocations }) => {
    const mapRef = useRef<HTMLDivElement>(null);
    const [map, setMap] = useState<google.maps.Map | null>(null);

    const initMap = useCallback(() => {
      if (!mapRef.current || !window.google) return;

      const mapInstance = new window.google.maps.Map(mapRef.current, {
        center: { lat: 30, lng: 0 },
        zoom: 2,
        styles: [
          {
            elementType: "geometry",
            stylers: [{ color: "#1a1a2e" }]
          },
          {
            elementType: "labels.text.stroke",
            stylers: [{ color: "#1a1a2e" }]
          },
          {
            elementType: "labels.text.fill",
            stylers: [{ color: "#746855" }]
          },
          {
            featureType: "administrative.locality",
            elementType: "labels.text.fill",
            stylers: [{ color: "#d59563" }]
          },
          {
            featureType: "poi",
            elementType: "labels.text.fill",
            stylers: [{ color: "#d59563" }]
          },
          {
            featureType: "poi.park",
            elementType: "geometry",
            stylers: [{ color: "#263c3f" }]
          },
          {
            featureType: "poi.park",
            elementType: "labels.text.fill",
            stylers: [{ color: "#6b9a76" }]
          },
          {
            featureType: "road",
            elementType: "geometry",
            stylers: [{ color: "#38414e" }]
          },
          {
            featureType: "road",
            elementType: "geometry.stroke",
            stylers: [{ color: "#212a37" }]
          },
          {
            featureType: "road",
            elementType: "labels.text.fill",
            stylers: [{ color: "#9ca5b3" }]
          },
          {
            featureType: "road.highway",
            elementType: "geometry",
            stylers: [{ color: "#746855" }]
          },
          {
            featureType: "road.highway",
            elementType: "geometry.stroke",
            stylers: [{ color: "#1f2835" }]
          },
          {
            featureType: "road.highway",
            elementType: "labels.text.fill",
            stylers: [{ color: "#f3d19c" }]
          },
          {
            featureType: "transit",
            elementType: "geometry",
            stylers: [{ color: "#2f3948" }]
          },
          {
            featureType: "transit.station",
            elementType: "labels.text.fill",
            stylers: [{ color: "#d59563" }]
          },
          {
            featureType: "water",
            elementType: "geometry",
            stylers: [{ color: "#17263c" }]
          },
          {
            featureType: "water",
            elementType: "labels.text.fill",
            stylers: [{ color: "#515c6d" }]
          },
          {
            featureType: "water",
            elementType: "labels.text.stroke",
            stylers: [{ color: "#17263c" }]
          }
        ],
        disableDefaultUI: true,
        zoomControl: true,
        zoomControlOptions: {
          position: google.maps.ControlPosition.TOP_RIGHT
        }
      });

      setMap(mapInstance);

      // Add threat markers
      locations.forEach((location) => {
        const getMarkerColor = (severity: string) => {
          switch (severity) {
            case 'critical': return '#ef4444';
            case 'high': return '#f97316';
            case 'medium': return '#eab308';
            case 'low': return '#22c55e';
            default: return '#6b7280';
          }
        };

        const marker = new window.google.maps.Marker({
          position: { lat: location.lat, lng: location.lng },
          map: mapInstance,
          icon: {
            path: window.google.maps.SymbolPath.CIRCLE,
            scale: Math.max(6, location.attacks / 2),
            fillColor: getMarkerColor(location.severity),
            fillOpacity: 0.8,
            strokeColor: '#ffffff',
            strokeWeight: 2
          },
          title: `${location.city}, ${location.country}: ${location.attacks} attacks`
        });

        // Add info window
        const infoWindow = new window.google.maps.InfoWindow({
          content: `
            <div style="color: #000; padding: 8px;">
              <h3 style="margin: 0 0 8px 0; font-size: 14px; font-weight: bold;">${location.city}, ${location.country}</h3>
              <p style="margin: 0; font-size: 12px;">Active Attacks: <strong>${location.attacks}</strong></p>
              <p style="margin: 0; font-size: 12px;">Severity: <strong style="color: ${getMarkerColor(location.severity)};">${location.severity.toUpperCase()}</strong></p>
            </div>
          `
        });

        marker.addListener('click', () => {
          infoWindow.open(mapInstance, marker);
        });
      });
    }, [locations]);

    useEffect(() => {
      if (window.google) {
        initMap();
      }
    }, [initMap]);

    return (
      <div 
        ref={mapRef} 
        className="w-full h-80 rounded-lg overflow-hidden"
        style={{ minHeight: '320px' }}
      />
    );
  };

  const renderMap = (status: Status): React.ReactElement => {
    switch (status) {
      case Status.LOADING:
        return (
          <div className="w-full h-80 bg-gray-900 rounded-lg flex items-center justify-center">
            <div className="text-white">Loading map...</div>
          </div>
        );
      case Status.FAILURE:
        return (
          <div className="w-full h-80 bg-gray-900 rounded-lg flex items-center justify-center">
            <div className="text-red-400">Error loading map. Using fallback visualization.</div>
            <FallbackMap locations={threatLocations} />
          </div>
        );
      case Status.SUCCESS:
        return <ThreatMap locations={threatLocations} />;
      default:
        return (
          <div className="w-full h-80 bg-gray-900 rounded-lg flex items-center justify-center">
            <div className="text-white">Initializing map...</div>
          </div>
        );
    }
  };

  // Fallback SVG map component
  const FallbackMap = ({ locations }: { locations: typeof threatLocations }) => {
    return (
      <div className="relative bg-gray-900 rounded-lg h-80 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20">
          <svg viewBox="0 0 800 400" className="w-full h-full">
            {/* Continents (simplified shapes) */}
            <path d="M150 100 L250 90 L300 120 L280 180 L200 200 L120 160 Z" fill="#1e3a8a" opacity="0.6" />
            <path d="M350 80 L500 70 L550 100 L520 150 L480 180 L400 170 L330 140 Z" fill="#1e3a8a" opacity="0.6" />
            <path d="M100 220 L200 210 L250 240 L220 300 L150 320 L80 280 Z" fill="#1e3a8a" opacity="0.6" />
            <path d="M300 200 L400 190 L450 220 L420 280 L350 300 L280 260 Z" fill="#1e3a8a" opacity="0.6" />
            
            {/* Attack indicators based on actual data */}
            {locations.map((location, index) => {
              // Convert lat/lng to SVG coordinates (simplified)
              const x = ((location.lng + 180) / 360) * 800;
              const y = ((90 - location.lat) / 180) * 400;
              
              const getColor = (severity: string) => {
                switch (severity) {
                  case 'critical': return '#ef4444';
                  case 'high': return '#f97316';
                  case 'medium': return '#eab308';
                  case 'low': return '#22c55e';
                  default: return '#6b7280';
                }
              };
              
              return (
                <g key={index}>
                  <circle 
                    cx={x} 
                    cy={y} 
                    r={Math.max(4, location.attacks / 4)} 
                    fill={getColor(location.severity)} 
                    className="animate-pulse" 
                  />
                  <text 
                    x={x + 10} 
                    y={y + 5} 
                    className="text-xs fill-white"
                    fontSize="12"
                  >
                    {location.country} - {location.attacks} attacks
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>
    );
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical": return "bg-critical text-white";
      case "high": return "bg-orange-500 text-white";
      case "medium": return "bg-interactive text-white";
      case "low": return "bg-success text-white";
      default: return "bg-gray-500 text-white";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "text-critical border-critical";
      case "investigating": return "text-interactive border-interactive";
      case "resolved": return "text-success border-success";
      default: return "text-gray-500 border-gray-500";
    }
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-surface rounded w-1/4"></div>
          <div className="h-32 bg-surface rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-background">
      {/* Header */}
      <header className="bg-surface border-b border-surface-light p-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">Threat Monitoring</h2>
            <p className="text-gray-400">Real-time threat intelligence and incident response</p>
          </div>
          <div className="flex items-center space-x-4">
            <select 
              value={timeFilter} 
              onChange={(e) => setTimeFilter(e.target.value)}
              className="bg-surface border border-surface-light rounded px-3 py-2 text-white"
            >
              <option value="24h">Last 24 hours</option>
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
            </select>
            <Button className="bg-interactive hover:bg-orange-600" data-testid="refresh-threats">
              Refresh
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6 space-y-6">
        {/* Top Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-surface border-red-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Current Threat Level</p>
                  <p className="text-2xl font-bold text-red-500">{threatStats.currentLevel}</p>
                  <div className="flex items-center mt-2">
                    <div className="flex space-x-1">
                      <span className="text-xs">Safe</span>
                      <div className="w-16 h-2 bg-gray-700 rounded-full mt-1">
                        <div className="w-full h-full bg-red-500 rounded-full"></div>
                      </div>
                      <span className="text-xs">Critical</span>
                    </div>
                  </div>
                </div>
                <AlertTriangle className="text-red-500 w-8 h-8" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-surface border-red-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Active Incidents</p>
                  <p className="text-2xl font-bold text-white">{threatStats.activeIncidents}</p>
                  <div className="flex items-center mt-2 text-xs text-gray-400">
                    <span>Critical: 4</span>
                    <span className="ml-4">High: 5</span>
                    <span className="ml-4">Medium: 3</span>
                  </div>
                </div>
                <Activity className="text-red-500 w-8 h-8" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-surface border-blue-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Response Time</p>
                  <p className="text-2xl font-bold text-white">{threatStats.responseTime}</p>
                  <div className="flex items-center mt-2">
                    <span className="text-xs text-gray-400">Average</span>
                    <div className="w-16 h-2 bg-gray-700 rounded-full ml-2 mt-1">
                      <div className="w-1/3 h-full bg-blue-500 rounded-full"></div>
                    </div>
                    <span className="text-xs text-gray-400 ml-2">5.3 min</span>
                    <span className="text-xs text-gray-400 ml-4">0 min</span>
                    <span className="text-xs text-gray-400 ml-8">10 min</span>
                  </div>
                </div>
                <Clock className="text-blue-500 w-8 h-8" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-surface border-yellow-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Threat Sources</p>
                  <p className="text-2xl font-bold text-white">{threatStats.threatSources} Countries</p>
                  <div className="mt-2 space-y-1">
                    {countryStats.map((country, index) => (
                      <div key={index} className="flex justify-between text-xs">
                        <span className="text-gray-400">{country.country}</span>
                        <span className="text-white">{country.percentage}%</span>
                      </div>
                    ))}
                  </div>
                </div>
                <Globe className="text-yellow-500 w-8 h-8" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Live Global Threat Intelligence Map */}
          <Card className="lg:col-span-2 bg-surface">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-white flex items-center">
                    <Globe className="w-5 h-5 mr-2" />
                    Live Global Threat Map
                  </CardTitle>
                  <div className="flex items-center space-x-4 mt-2">
                    <Badge className="bg-green-900/50 text-green-400 border-green-700">
                      <div className="w-2 h-2 bg-green-400 rounded-full mr-1 animate-pulse"></div>
                      Real-time Processing
                    </Badge>
                    <Badge className="bg-blue-900/50 text-blue-400 border-blue-700">
                      <Database className="w-3 h-3 mr-1" />
                      4 Data Sources
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button size="sm" variant="outline" className="h-8">
                    <Settings className="w-3 h-3 mr-1" />
                    Configure
                  </Button>
                  <Button size="sm" variant="outline" className="h-8">
                    <Download className="w-3 h-3 mr-1" />
                    Export
                  </Button>
                </div>
              </div>
              
              {/* Data Sources Pipeline Status */}
              <div className="mt-4 p-3 bg-gray-800/50 rounded-lg border border-gray-700">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-medium text-white">Threat Intelligence Pipeline</h4>
                  <div className="flex items-center space-x-2">
                    <RefreshCw className="w-3 h-3 text-green-400 animate-spin" />
                    <span className="text-xs text-green-400">Processing</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                  <div className={`p-3 sm:p-2 rounded border ${dataSourcesActive.alienvault ? 'bg-green-900/30 border-green-700' : 'bg-gray-800 border-gray-600'}`}>
                    <div className="flex items-center space-x-2 mb-1">
                      <div className={`w-2 h-2 rounded-full ${dataSourcesActive.alienvault ? 'bg-green-400' : 'bg-gray-500'}`}></div>
                      <span className="text-xs font-medium text-white leading-tight">AlienVault OTX</span>
                    </div>
                    <div className="text-xs text-gray-400">47.2k IOCs/hr</div>
                  </div>
                  <div className={`p-3 sm:p-2 rounded border ${dataSourcesActive.xforce ? 'bg-green-900/30 border-green-700' : 'bg-gray-800 border-gray-600'}`}>
                    <div className="flex items-center space-x-2 mb-1">
                      <div className={`w-2 h-2 rounded-full ${dataSourcesActive.xforce ? 'bg-green-400' : 'bg-gray-500'}`}></div>
                      <span className="text-xs font-medium text-white leading-tight">IBM X-Force</span>
                    </div>
                    <div className="text-xs text-gray-400">23.8k IOCs/hr</div>
                  </div>
                  <div className={`p-3 sm:p-2 rounded border ${dataSourcesActive.virustotal ? 'bg-green-900/30 border-green-700' : 'bg-gray-800 border-gray-600'}`}>
                    <div className="flex items-center space-x-2 mb-1">
                      <div className={`w-2 h-2 rounded-full ${dataSourcesActive.virustotal ? 'bg-green-400' : 'bg-gray-500'}`}></div>
                      <span className="text-xs font-medium text-white leading-tight">VirusTotal</span>
                    </div>
                    <div className="text-xs text-gray-400">156k IOCs/hr</div>
                  </div>
                  <div className={`p-3 sm:p-2 rounded border ${dataSourcesActive.custom ? 'bg-green-900/30 border-green-700' : 'bg-gray-800 border-gray-600'}`}>
                    <div className="flex items-center space-x-2 mb-1">
                      <div className={`w-2 h-2 rounded-full ${dataSourcesActive.custom ? 'bg-green-400' : 'bg-gray-500'}`}></div>
                      <span className="text-xs font-medium text-white leading-tight">Custom Feeds</span>
                    </div>
                    <div className="text-xs text-gray-400">Offline</div>
                  </div>
                </div>
              </div>
              
              {/* Advanced Filtering Controls */}
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Filter className="w-4 h-4 text-gray-400" />
                    <select 
                      value={threatTypeFilter} 
                      onChange={(e) => setThreatTypeFilter(e.target.value)}
                      className="bg-gray-800 border border-gray-600 text-white text-xs rounded px-2 py-1"
                    >
                      <option value="all">All Threat Types</option>
                      <option value="malware">Malware</option>
                      <option value="phishing">Phishing</option>
                      <option value="ddos">DDoS</option>
                      <option value="ransomware">Ransomware</option>
                      <option value="botnet">Botnet</option>
                    </select>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Layers className="w-4 h-4 text-gray-400" />
                    <select 
                      value={severityFilter} 
                      onChange={(e) => setSeverityFilter(e.target.value)}
                      className="bg-gray-800 border border-gray-600 text-white text-xs rounded px-2 py-1"
                    >
                      <option value="all">All Severities</option>
                      <option value="critical">Critical</option>
                      <option value="high">High</option>
                      <option value="medium">Medium</option>
                      <option value="low">Low</option>
                    </select>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <select 
                      value={timeFilter} 
                      onChange={(e) => setTimeFilter(e.target.value)}
                      className="bg-gray-800 border border-gray-600 text-white text-xs rounded px-2 py-1"
                    >
                      <option value="1h">Last Hour</option>
                      <option value="24h">Last 24 Hours</option>
                      <option value="7d">Last 7 Days</option>
                      <option value="30d">Last 30 Days</option>
                    </select>
                  </div>
                </div>
                <div className="flex items-center space-x-3 text-xs text-gray-400">
                  <div className="flex items-center space-x-1">
                    <Cpu className="w-3 h-3" />
                    <span>Cache: 98.7% hit rate</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Cloud className="w-3 h-3" />
                    <span>Latency: 45ms</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Enhanced Threat Map */}
              <ThreatMap height="400px" />
              
              {/* Real-time Processing Stats */}
              <div className="mt-4 grid grid-cols-3 gap-4">
                <div className="p-3 bg-blue-900/20 rounded-lg border border-blue-700/50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-blue-300">Data Normalization</span>
                    <Badge className="bg-blue-500 text-white text-xs">Active</Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-400">IOCs Processed:</span>
                      <span className="text-white">227,384</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-400">Duplicates Removed:</span>
                      <span className="text-white">45,672</span>
                    </div>
                    <Progress value={85} className="h-1" />
                  </div>
                </div>
                
                <div className="p-3 bg-green-900/20 rounded-lg border border-green-700/50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-green-300">Geolocation Engine</span>
                    <Badge className="bg-green-500 text-white text-xs">Online</Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-400">IPs Geolocated:</span>
                      <span className="text-white">156,892</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-400">Accuracy Rate:</span>
                      <span className="text-white">94.2%</span>
                    </div>
                    <Progress value={94} className="h-1" />
                  </div>
                </div>
                
                <div className="p-3 bg-purple-900/20 rounded-lg border border-purple-700/50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-purple-300">Stream Processing</span>
                    <Badge className="bg-purple-500 text-white text-xs">Real-time</Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-400">Events/Second:</span>
                      <span className="text-white">2,847</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-400">Queue Depth:</span>
                      <span className="text-white">127</span>
                    </div>
                    <Progress value={78} className="h-1" />
                  </div>
                </div>
              </div>
              
              {/* Compliance & Privacy Stats */}
              <div className="mt-4 p-3 bg-orange-900/20 rounded-lg border border-orange-700/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Shield className="w-4 h-4 text-orange-400" />
                    <span className="text-sm font-medium text-orange-300">Data Privacy & Compliance</span>
                  </div>
                  <div className="flex items-center space-x-4 text-xs text-gray-400">
                    <span>PII Scrubbed: 100%</span>
                    <span>GDPR Compliant: ✓</span>
                    <span>Data Retention: 90 days</span>
                    <span>Encryption: AES-256</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Critical Incidents */}
          <Card className="bg-surface">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white">Critical Incidents</CardTitle>
                <Badge className="bg-red-500 text-white">4 Active</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {criticalIncidents.map((incident) => (
                  <div key={incident.id} className="border border-red-500/30 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                        <span className="font-medium text-white text-sm">{incident.type}</span>
                      </div>
                      <Badge className="bg-red-500 text-white text-xs">{incident.status}</Badge>
                    </div>
                    <p className="text-xs text-gray-400 mb-1">{incident.target}</p>
                    <p className="text-xs text-gray-300 mb-2">{incident.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-400">First detected: {incident.time}</span>
                      <Button size="sm" variant="outline" className="h-6 text-xs">
                        Contain
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Analytics Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Threat Categories */}
          <Card className="bg-surface">
            <CardHeader>
              <CardTitle className="text-white">Threat Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative w-40 h-40 mx-auto">
                {/* Simple pie chart representation */}
                <svg viewBox="0 0 160 160" className="w-full h-full">
                  <circle cx="80" cy="80" r="60" fill="none" stroke="#374151" strokeWidth="2" />
                  <circle cx="80" cy="80" r="60" fill="none" stroke="#ef4444" strokeWidth="20" 
                    strokeDasharray="75 188" strokeDashoffset="0" transform="rotate(-90 80 80)" />
                  <circle cx="80" cy="80" r="60" fill="none" stroke="#f97316" strokeWidth="20" 
                    strokeDasharray="56 188" strokeDashoffset="-75" transform="rotate(-90 80 80)" />
                  <circle cx="80" cy="80" r="60" fill="none" stroke="#eab308" strokeWidth="20" 
                    strokeDasharray="38 188" strokeDashoffset="-131" transform="rotate(-90 80 80)" />
                  <circle cx="80" cy="80" r="60" fill="none" stroke="#22c55e" strokeWidth="20" 
                    strokeDasharray="19 188" strokeDashoffset="-169" transform="rotate(-90 80 80)" />
                </svg>
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <span className="text-sm text-gray-300">Malware</span>
                  </div>
                  <span className="text-sm text-white">40%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                    <span className="text-sm text-gray-300">Phishing</span>
                  </div>
                  <span className="text-sm text-white">30%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <span className="text-sm text-gray-300">DDoS</span>
                  </div>
                  <span className="text-sm text-white">20%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="text-sm text-gray-300">Other</span>
                  </div>
                  <span className="text-sm text-white">10%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Attack Vectors */}
          <Card className="bg-surface">
            <CardHeader>
              <CardTitle className="text-white">Attack Vectors</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "Email", value: 45, color: "bg-red-500" },
                  { name: "Web", value: 35, color: "bg-orange-500" },
                  { name: "Network", value: 25, color: "bg-yellow-500" },
                  { name: "USB", value: 15, color: "bg-green-500" },
                  { name: "Social", value: 10, color: "bg-blue-500" }
                ].map((vector, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">{vector.name}</span>
                      <span className="text-white">{vector.value}</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className={`${vector.color} h-2 rounded-full`} style={{ width: `${vector.value}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Target Analysis */}
          <Card className="bg-surface">
            <CardHeader>
              <CardTitle className="text-white">Target Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "Database Servers", value: 42, color: "bg-red-500" },
                  { name: "Web Applications", value: 27, color: "bg-orange-500" },
                  { name: "User Endpoints", value: 18, color: "bg-yellow-500" },
                  { name: "Network Infrastructure", value: 13, color: "bg-green-500" }
                ].map((target, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">{target.name}</span>
                      <span className="text-white">{target.value}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className={`${target.color} h-2 rounded-full`} style={{ width: `${target.value}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Security Incidents Table */}
        <Card className="bg-surface">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-white">Recent Security Incidents</CardTitle>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input 
                    type="text" 
                    placeholder="Search incidents..."
                    className="bg-gray-800 border border-gray-700 rounded pl-10 pr-4 py-2 text-sm text-white"
                  />
                </div>
                <Button variant="outline" size="sm">All</Button>
                <Button variant="outline" size="sm">Critical</Button>
                <Button variant="outline" size="sm">High</Button>
                <Button variant="outline" size="sm">Medium</Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-3 px-2 text-gray-400 text-sm">SEVERITY</th>
                    <th className="text-left py-3 px-2 text-gray-400 text-sm">INCIDENT TYPE</th>
                    <th className="text-left py-3 px-2 text-gray-400 text-sm">TARGET</th>
                    <th className="text-left py-3 px-2 text-gray-400 text-sm">SOURCE</th>
                    <th className="text-left py-3 px-2 text-gray-400 text-sm">TIMESTAMP</th>
                    <th className="text-left py-3 px-2 text-gray-400 text-sm">STATUS</th>
                    <th className="text-left py-3 px-2 text-gray-400 text-sm">ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  {recentIncidents.map((incident, index) => (
                    <tr key={index} className="border-b border-gray-800 hover:bg-gray-800/50">
                      <td className="py-3 px-2">
                        <div className="flex items-center space-x-2">
                          <div className={`w-2 h-2 rounded-full ${
                            incident.severity === 'Critical' ? 'bg-red-500' :
                            incident.severity === 'High' ? 'bg-orange-500' :
                            'bg-yellow-500'
                          }`}></div>
                          <span className={`text-sm ${
                            incident.severity === 'Critical' ? 'text-red-400' :
                            incident.severity === 'High' ? 'text-orange-400' :
                            'text-yellow-400'
                          }`}>{incident.severity}</span>
                        </div>
                      </td>
                      <td className="py-3 px-2 text-white text-sm">{incident.type}</td>
                      <td className="py-3 px-2 text-gray-300 text-sm">{incident.target}</td>
                      <td className="py-3 px-2 text-gray-300 text-sm">{incident.source}</td>
                      <td className="py-3 px-2 text-gray-300 text-sm">{incident.timestamp}</td>
                      <td className="py-3 px-2">
                        <Badge className={`text-xs ${
                          incident.status === 'Active' ? 'bg-red-500' :
                          incident.status === 'In Progress' ? 'bg-orange-500' :
                          incident.status === 'Mitigated' ? 'bg-blue-500' :
                          'bg-green-500'
                        }`}>{incident.status}</Badge>
                      </td>
                      <td className="py-3 px-2">
                        <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex items-center justify-between mt-4">
              <span className="text-sm text-gray-400">Showing 6 of 42 incidents</span>
              <div className="flex items-center space-x-2">
                <Button size="sm" variant="outline" disabled>
                  &lt;
                </Button>
                <Button size="sm" variant="outline" className="bg-blue-600 text-white">1</Button>
                <Button size="sm" variant="outline">2</Button>
                <Button size="sm" variant="outline">3</Button>
                <Button size="sm" variant="outline">4</Button>
                <Button size="sm" variant="outline">
                  &gt;
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* AI-Powered Response Recommendations */}
        <Card className="bg-surface">
          <CardHeader>
            <CardTitle className="text-white">AI-Powered Response Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {responseRecommendations.map((recommendation, index) => (
                <div key={index} className="bg-gray-800 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-3">
                    <Database className="w-5 h-5 text-red-500" />
                    <div>
                      <h4 className="font-medium text-white">{recommendation.title}</h4>
                      <p className="text-xs text-red-400">{recommendation.priority}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    {recommendation.actions.map((action, actionIndex) => (
                      <div key={actionIndex} className="flex items-center space-x-2">
                        <CheckCircle className={`w-4 h-4 ${
                          action.completed ? 'text-green-500' : 'text-gray-500'
                        }`} />
                        <span className={`text-sm ${
                          action.completed ? 'text-gray-400 line-through' : 'text-gray-300'
                        }`}>{action.text}</span>
                      </div>
                    ))}
                  </div>
                  
                  {/* Playback controls */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <Button size="sm" variant="ghost">
                        <SkipForward className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <PlayCircle className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <PauseCircle className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="text-xs text-gray-400">
                      00:05 / 00:11
                    </div>
                  </div>
                  
                  <div className="w-full bg-gray-700 rounded-full h-1 mb-4">
                    <div className="bg-blue-500 h-1 rounded-full" style={{ width: '45%' }}></div>
                  </div>
                  
                  <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                    Apply Response Plan
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
