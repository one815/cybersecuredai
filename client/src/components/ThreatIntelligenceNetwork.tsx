import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ForceGraph3D from "react-force-graph-3d";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { 
  Network, 
  Target, 
  Shield, 
  AlertTriangle,
  Play,
  Pause,
  RotateCcw,
  Filter
} from "lucide-react";

interface ThreatNode {
  id: string;
  type: "threat" | "asset" | "actor";
  severity: "critical" | "high" | "medium" | "low";
  name: string;
  description: string;
  connections: number;
  lastSeen: string;
  coordinates: [number, number, number];
  size: number;
  color: string;
}

interface ThreatLink {
  source: string;
  target: string;
  strength: number;
  type: "attack" | "communication" | "dependency";
  label: string;
}

export function ThreatIntelligenceNetwork() {
  const fgRef = useRef<any>();
  const [isPlaying, setIsPlaying] = useState(true);
  const [timeScale, setTimeScale] = useState([1]);
  const [selectedSeverity, setSelectedSeverity] = useState<string[]>(["critical", "high", "medium", "low"]);
  const [zoomLevel, setZoomLevel] = useState(200);

  // Fetch threat intelligence network data
  const { data: networkData, isLoading } = useQuery({
    queryKey: ["/api/threat-intelligence/network"],
    refetchInterval: isPlaying ? 5000 : false, // Real-time updates when playing
    select: (data) => {
      // Transform data for 3D visualization
      const nodes: ThreatNode[] = data?.nodes?.map((node: any) => ({
        ...node,
        coordinates: [
          Math.random() * 200 - 100,
          Math.random() * 200 - 100,
          Math.random() * 200 - 100
        ],
        size: getSizeByType(node.type, node.severity),
        color: getColorBySeverity(node.severity)
      })) || [];

      const links: ThreatLink[] = data?.links?.filter((link: any) => 
        selectedSeverity.includes(nodes.find(n => n.id === link.source)?.severity || "low")
      ) || [];

      return { nodes, links };
    }
  });

  const getSizeByType = (type: string, severity: string) => {
    const baseSize = type === "threat" ? 8 : type === "asset" ? 6 : 4;
    const severityMultiplier = severity === "critical" ? 2 : severity === "high" ? 1.5 : severity === "medium" ? 1.2 : 1;
    return baseSize * severityMultiplier;
  };

  const getColorBySeverity = (severity: string) => {
    switch (severity) {
      case "critical": return "#ef4444";
      case "high": return "#f97316";
      case "medium": return "#eab308";
      case "low": return "#22c55e";
      default: return "#6b7280";
    }
  };

  // Auto-rotate the graph
  useEffect(() => {
    if (!fgRef.current || !isPlaying) return;

    const interval = setInterval(() => {
      if (fgRef.current) {
        const angle = Date.now() * 0.0001 * timeScale[0];
        fgRef.current.cameraPosition({
          x: Math.sin(angle) * zoomLevel,
          y: Math.cos(angle) * zoomLevel * 0.5,
          z: Math.cos(angle) * zoomLevel
        });
      }
    }, 50);

    return () => clearInterval(interval);
  }, [isPlaying, timeScale, zoomLevel]);

  const handleNodeClick = (node: ThreatNode) => {
    // Focus camera on selected node
    if (fgRef.current) {
      fgRef.current.cameraPosition(
        { x: node.coordinates[0] + 50, y: node.coordinates[1] + 50, z: node.coordinates[2] + 50 },
        { x: node.coordinates[0], y: node.coordinates[1], z: node.coordinates[2] },
        1000
      );
    }
  };

  const toggleSeverityFilter = (severity: string) => {
    setSelectedSeverity(prev => 
      prev.includes(severity) 
        ? prev.filter(s => s !== severity)
        : [...prev, severity]
    );
  };

  const resetView = () => {
    if (fgRef.current) {
      fgRef.current.cameraPosition({ x: 0, y: 0, z: 200 }, { x: 0, y: 0, z: 0 }, 1000);
      setZoomLevel(200);
    }
  };

  if (isLoading) {
    return (
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Network className="w-5 h-5 mr-2" />
            Threat Intelligence Network
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-white flex items-center">
            <Network className="w-5 h-5 mr-2" />
            Threat Intelligence Network
            <Badge className="ml-2 bg-blue-600 text-white">3D Interactive</Badge>
          </CardTitle>
          
          <div className="flex items-center space-x-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setIsPlaying(!isPlaying)}
              className="border-gray-600"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={resetView}
              className="border-gray-600"
            >
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        {/* Control Panel */}
        <div className="mt-4 space-y-4">
          {/* Severity Filters */}
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-400">Filter by severity:</span>
            {["critical", "high", "medium", "low"].map((severity) => (
              <Button
                key={severity}
                size="sm"
                variant={selectedSeverity.includes(severity) ? "default" : "outline"}
                onClick={() => toggleSeverityFilter(severity)}
                className={`text-xs ${
                  selectedSeverity.includes(severity)
                    ? getColorBySeverity(severity) === "#ef4444" ? "bg-red-600" :
                      getColorBySeverity(severity) === "#f97316" ? "bg-orange-600" :
                      getColorBySeverity(severity) === "#eab308" ? "bg-yellow-600" : "bg-green-600"
                    : "border-gray-600"
                }`}
              >
                {severity}
              </Button>
            ))}
          </div>
          
          {/* Animation Speed */}
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-400 min-w-[100px]">Animation Speed:</span>
            <Slider
              value={timeScale}
              onValueChange={setTimeScale}
              max={3}
              min={0.1}
              step={0.1}
              className="flex-1"
            />
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="h-96 w-full bg-black rounded-lg overflow-hidden relative">
          <ForceGraph3D
            ref={fgRef}
            graphData={networkData || { nodes: [], links: [] }}
            nodeId="id"
            nodeLabel={(node: any) => `
              <div class="bg-gray-900 text-white p-2 rounded shadow-lg border border-gray-600">
                <div class="font-bold">${node.name}</div>
                <div class="text-sm text-gray-300">${node.type}</div>
                <div class="text-sm">Severity: <span class="font-bold" style="color: ${node.color}">${node.severity}</span></div>
                <div class="text-xs text-gray-400">${node.description}</div>
                <div class="text-xs text-gray-400">Connections: ${node.connections}</div>
              </div>
            `}
            nodeColor={(node: any) => node.color}
            nodeVal={(node: any) => node.size}
            linkLabel={(link: any) => `${link.type}: ${link.label}`}
            linkColor={() => "#4a5568"}
            linkWidth={(link: any) => link.strength * 2}
            onNodeClick={handleNodeClick}
            backgroundColor="rgba(0, 0, 0, 0)"
            showNavInfo={false}
            controlType="orbit"
            enableNodeDrag={true}
            enablePointerInteraction={true}
          />
          
          {/* Network Stats Overlay */}
          <div className="absolute top-4 right-4 bg-gray-900/90 text-white p-3 rounded-lg border border-gray-600">
            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span>Nodes:</span>
                <span className="font-bold">{networkData?.nodes?.length || 0}</span>
              </div>
              <div className="flex justify-between">
                <span>Connections:</span>
                <span className="font-bold">{networkData?.links?.length || 0}</span>
              </div>
              <div className="flex justify-between">
                <span>Active Threats:</span>
                <span className="font-bold text-red-400">
                  {networkData?.nodes?.filter((n: any) => n.severity === "critical").length || 0}
                </span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Legend */}
        <div className="mt-4 flex items-center justify-center space-x-6 text-xs">
          <div className="flex items-center space-x-2">
            <Target className="w-4 h-4 text-red-400" />
            <span className="text-gray-400">Threats</span>
          </div>
          <div className="flex items-center space-x-2">
            <Shield className="w-4 h-4 text-blue-400" />
            <span className="text-gray-400">Assets</span>
          </div>
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-4 h-4 text-yellow-400" />
            <span className="text-gray-400">Threat Actors</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}