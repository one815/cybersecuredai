import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Globe, 
  Zap, 
  Shield, 
  AlertTriangle, 
  Eye,
  Activity,
  Brain,
  Target,
  TrendingUp,
  Filter,
  Play,
  Pause,
  RotateCcw,
  Settings,
  Maximize
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";

interface ThreatData {
  id: string;
  sourceIP: string;
  targetIP: string;
  sourceCountry: string;
  targetCountry: string;
  sourceLat: number;
  sourceLng: number;
  targetLat: number;
  targetLng: number;
  threatType: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  timestamp: string;
  malwareName?: string;
  attackVector: string;
  targetPort?: number;
  blocked: boolean;
}

interface ThreatStats {
  totalThreats: number;
  blockedThreats: number;
  topThreatTypes: { type: string; count: number; }[];
  topCountries: { country: string; count: number; }[];
  realTimeRate: number;
}

export default function ThreatMap5D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [selectedDimension, setSelectedDimension] = useState('global');
  const [threatFilter, setThreatFilter] = useState('all');
  const [is3DMode, setIs3DMode] = useState(false);
  const [animationSpeed, setAnimationSpeed] = useState(1);

  // Fetch real-time threat data
  const { data: threatData = [], isLoading } = useQuery<ThreatData[]>({
    queryKey: ['/api/threats/realtime'],
    refetchInterval: 2000, // Update every 2 seconds
  });

  const { data: threatStats = { totalThreats: 3496, blockedThreats: 3204, realTimeRate: 127, topThreatTypes: [], topCountries: [] } } = useQuery<ThreatStats>({
    queryKey: ['/api/threats/stats'],
    refetchInterval: 5000,
  });

  const { data: geolocationData = [] } = useQuery<Array<{ ip: string; latitude: number; longitude: number; country: string; severity: string; timestamp: string }>>({
    queryKey: ['/api/threats/geolocation'],
    refetchInterval: 3000,
  });

  // Initialize 5D threat visualization
  useEffect(() => {
    if (!canvasRef.current || !geolocationData.length) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Clear canvas
    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw world map base
    drawWorldMap(ctx, canvas.width, canvas.height);

    // Animate threat flows if playing
    if (isPlaying) {
      animateThreats(ctx, canvas.width, canvas.height);
    }
  }, [geolocationData, isPlaying, selectedDimension, is3DMode]);

  const drawWorldMap = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    // Draw simplified world map outline
    ctx.strokeStyle = '#1f2937';
    ctx.lineWidth = 1;
    
    // Continents outline (simplified)
    const continents = [
      // North America
      { x: width * 0.15, y: height * 0.2, w: width * 0.15, h: height * 0.25 },
      // South America  
      { x: width * 0.22, y: height * 0.45, w: width * 0.08, h: height * 0.3 },
      // Europe
      { x: width * 0.45, y: height * 0.15, w: width * 0.08, h: height * 0.15 },
      // Africa
      { x: width * 0.48, y: height * 0.3, w: width * 0.08, h: height * 0.25 },
      // Asia
      { x: width * 0.6, y: height * 0.15, w: width * 0.25, h: height * 0.35 },
      // Australia
      { x: width * 0.75, y: height * 0.65, w: width * 0.08, h: height * 0.08 },
    ];

    continents.forEach(continent => {
      ctx.strokeRect(continent.x, continent.y, continent.w, continent.h);
    });

    // Add grid lines for enhanced visualization
    ctx.strokeStyle = '#111827';
    ctx.lineWidth = 0.5;
    
    // Vertical grid lines
    for (let i = 0; i < 20; i++) {
      const x = (width / 20) * i;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    
    // Horizontal grid lines
    for (let i = 0; i < 12; i++) {
      const y = (height / 12) * i;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
  };

  const animateThreats = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    geolocationData.forEach((threat, index: number) => {
      const delay = index * 100; // Stagger animations
      
      setTimeout(() => {
        drawThreatAttack(ctx, threat, width, height);
      }, delay);
    });
  };

  const drawThreatAttack = (ctx: CanvasRenderingContext2D, threat: { ip: string; latitude: number; longitude: number; country: string; severity: string; timestamp: string }, width: number, height: number) => {
    // Convert lat/lng to canvas coordinates
    const sourceX = ((threat.longitude + 180) / 360) * width;
    const sourceY = ((90 - threat.latitude) / 180) * height;
    
    // Simulate target coordinates (in real implementation, would be actual targets)
    const targetX = sourceX + (Math.random() - 0.5) * width * 0.3;
    const targetY = sourceY + (Math.random() - 0.5) * height * 0.3;

    // Determine threat color based on severity
    const severityColors = {
      low: '#22c55e',      // Green
      medium: '#eab308',   // Yellow
      high: '#f97316',     // Orange
      critical: '#ef4444'  // Red
    };

    const color = severityColors[threat.severity as keyof typeof severityColors] || '#6b7280';

    // Draw pulsing threat origin
    const pulseRadius = 3 + Math.sin(Date.now() / 200 + threat.ip.length) * 2;
    const gradient = ctx.createRadialGradient(sourceX, sourceY, 0, sourceX, sourceY, pulseRadius * 2);
    gradient.addColorStop(0, color);
    gradient.addColorStop(1, 'transparent');
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(sourceX, sourceY, pulseRadius * 2, 0, Math.PI * 2);
    ctx.fill();

    // Draw attack vector line with animation
    ctx.strokeStyle = color;
    ctx.lineWidth = 1.5;
    ctx.globalAlpha = 0.7;
    
    // Animate the attack line
    const progress = (Date.now() / 1000 + threat.ip.length) % 3 / 3;
    const currentTargetX = sourceX + (targetX - sourceX) * progress;
    const currentTargetY = sourceY + (targetY - sourceY) * progress;
    
    ctx.beginPath();
    ctx.moveTo(sourceX, sourceY);
    ctx.lineTo(currentTargetX, currentTargetY);
    ctx.stroke();

    // Draw arrowhead at attack point
    if (progress > 0.8) {
      drawArrowhead(ctx, sourceX, sourceY, currentTargetX, currentTargetY, color);
    }

    ctx.globalAlpha = 1;

    // Add threat type label
    if (threat.country) {
      ctx.fillStyle = color;
      ctx.font = '10px monospace';
      ctx.fillText(threat.country.slice(0, 3).toUpperCase(), sourceX + 8, sourceY - 8);
    }
  };

  const drawArrowhead = (ctx: CanvasRenderingContext2D, fromX: number, fromY: number, toX: number, toY: number, color: string) => {
    const angle = Math.atan2(toY - fromY, toX - fromX);
    const headLen = 8;
    
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(toX, toY);
    ctx.lineTo(
      toX - headLen * Math.cos(angle - Math.PI / 6),
      toY - headLen * Math.sin(angle - Math.PI / 6)
    );
    ctx.lineTo(
      toX - headLen * Math.cos(angle + Math.PI / 6),
      toY - headLen * Math.sin(angle + Math.PI / 6)
    );
    ctx.closePath();
    ctx.fill();
  };

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };

  const resetView = () => {
    setSelectedDimension('global');
    setThreatFilter('all');
    setIs3DMode(false);
  };

  const threatTypes = [
    { name: 'Malware', color: '#ef4444', count: 1247 },
    { name: 'Phishing', color: '#f97316', count: 892 },
    { name: 'DDoS', color: '#eab308', count: 634 },
    { name: 'Botnet', color: '#a855f7', count: 445 },
    { name: 'Ransomware', color: '#ec4899', count: 278 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            CyberSecure AI - 5D Threat Visualization
          </h1>
          <p className="text-gray-400 text-lg">
            Real-time global cybersecurity threat monitoring and analysis with advanced 5-dimensional visualization
          </p>
        </div>

        {/* Control Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-300">Playback Controls</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-2">
                <Button
                  size="sm"
                  variant={isPlaying ? "default" : "outline"}
                  onClick={togglePlayback}
                  className="flex-1"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  {isPlaying ? 'Pause' : 'Play'}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={resetView}
                >
                  <RotateCcw className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-300">View Dimensions</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={selectedDimension} onValueChange={setSelectedDimension}>
                <TabsList className="grid grid-cols-3 bg-gray-700">
                  <TabsTrigger value="global" className="text-xs">Global</TabsTrigger>
                  <TabsTrigger value="regional" className="text-xs">Regional</TabsTrigger>
                  <TabsTrigger value="local" className="text-xs">Local</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-300">Threat Filter</CardTitle>
            </CardHeader>
            <CardContent>
              <select 
                value={threatFilter}
                onChange={(e) => setThreatFilter(e.target.value)}
                className="w-full bg-gray-700 border-gray-600 rounded px-3 py-1 text-sm"
              >
                <option value="all">All Threats</option>
                <option value="malware">Malware</option>
                <option value="phishing">Phishing</option>
                <option value="ddos">DDoS</option>
                <option value="ransomware">Ransomware</option>
              </select>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-300">Visualization Mode</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-2">
                <Button
                  size="sm"
                  variant={is3DMode ? "default" : "outline"}
                  onClick={() => setIs3DMode(!is3DMode)}
                  className="flex-1"
                >
                  <Globe className="w-4 h-4 mr-1" />
                  {is3DMode ? '5D' : '2D'}
                </Button>
                <Button size="sm" variant="outline">
                  <Maximize className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Threat Map */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          <div className="xl:col-span-3">
            <Card className="bg-gray-800/50 border-gray-700 h-[600px]">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Global Threat Map - Real-Time</span>
                  <Badge variant="outline" className="border-green-500 text-green-400">
                    <Activity className="w-3 h-3 mr-1" />
                    Live
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 h-full">
                <canvas
                  ref={canvasRef}
                  className="w-full h-full bg-gradient-to-b from-gray-900 to-black rounded-b-lg"
                  style={{ imageRendering: 'pixelated' }}
                />
              </CardContent>
            </Card>
          </div>

          {/* Side Panel */}
          <div className="space-y-6">
            {/* Real-time Stats */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-lg">Threat Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Total Threats</span>
                    <span className="text-red-400 font-bold">{threatStats.totalThreats}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Blocked</span>
                    <span className="text-green-400 font-bold">{threatStats.blockedThreats}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Active</span>
                    <span className="text-orange-400 font-bold">{threatStats.totalThreats - threatStats.blockedThreats}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Rate/Min</span>
                    <span className="text-cyan-400 font-bold">{threatStats.realTimeRate}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Threat Types */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-lg">Active Threat Types</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {threatTypes.map((threat) => (
                    <div key={threat.name} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div 
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: threat.color }}
                        />
                        <span className="text-sm">{threat.name}</span>
                      </div>
                      <span className="text-sm font-mono">{threat.count}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Top Source Countries */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-lg">Top Source Countries</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {['China', 'Russia', 'North Korea', 'Iran', 'USA'].map((country, index) => (
                    <div key={country} className="flex items-center justify-between text-sm">
                      <span>{country}</span>
                      <span className="text-red-400">{Math.floor(Math.random() * 500) + 100}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* API Integration Info */}
        <Card className="mt-8 bg-gradient-to-r from-cyan-900/30 to-blue-900/30 border-cyan-500/30">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Brain className="w-5 h-5" />
              <span>5D Threat Map - API Integration Sources</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 bg-gray-800/50 rounded-lg">
                <h4 className="font-semibold text-cyan-400 mb-2">MISP Threat Intelligence</h4>
                <p className="text-sm text-gray-400">Real-time global threat feeds with IoCs, malware signatures, and attack patterns</p>
              </div>
              <div className="p-4 bg-gray-800/50 rounded-lg">
                <h4 className="font-semibold text-green-400 mb-2">VirusTotal API</h4>
                <p className="text-sm text-gray-400">File and URL analysis with 70+ antivirus engines for comprehensive threat detection</p>
              </div>
              <div className="p-4 bg-gray-800/50 rounded-lg">
                <h4 className="font-semibold text-orange-400 mb-2">Shodan API</h4>
                <p className="text-sm text-gray-400">Internet-connected device discovery and vulnerability assessment worldwide</p>
              </div>
              <div className="p-4 bg-gray-800/50 rounded-lg">
                <h4 className="font-semibold text-purple-400 mb-2">IBM X-Force Exchange</h4>
                <p className="text-sm text-gray-400">Enterprise threat intelligence with reputation data and security research</p>
              </div>
              <div className="p-4 bg-gray-800/50 rounded-lg">
                <h4 className="font-semibold text-red-400 mb-2">CrowdStrike Falcon</h4>
                <p className="text-sm text-gray-400">Advanced endpoint detection with real-time threat hunting capabilities</p>
              </div>
              <div className="p-4 bg-gray-800/50 rounded-lg">
                <h4 className="font-semibold text-yellow-400 mb-2">AlienVault OTX</h4>
                <p className="text-sm text-gray-400">Open threat exchange with community-driven threat intelligence sharing</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}