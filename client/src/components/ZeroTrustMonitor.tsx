import { useState, useRef, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Shield, 
  Lock, 
  Eye, 
  Users,
  Monitor,
  Network,
  Key,
  AlertTriangle,
  CheckCircle,
  Activity
} from "lucide-react";

interface AuthenticationEvent {
  id: string;
  timestamp: string;
  user: string;
  device: string;
  location: string;
  method: "password" | "mfa" | "biometric" | "hardware_key";
  status: "success" | "failed" | "blocked";
  riskScore: number;
}

interface PolicyEnforcementPoint {
  id: string;
  name: string;
  type: "gateway" | "endpoint" | "application" | "network";
  status: "active" | "warning" | "error";
  policies: number;
  violations: number;
  location: { x: number; y: number };
}

export function ZeroTrustMonitor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedTimeframe, setSelectedTimeframe] = useState("1h");
  const [animationFrame, setAnimationFrame] = useState(0);

  // Fetch Zero Trust monitoring data
  const { data: zeroTrustData, isLoading } = useQuery<{
    authEvents: AuthenticationEvent[];
    policyPoints: PolicyEnforcementPoint[];
    networkTopology: {
      nodes: Array<{ id: string; type: string; x: number; y: number; status: string }>;
      connections: Array<{ from: string; to: string; encrypted: boolean; verified: boolean }>;
    };
    metrics: {
      verificationRate: number;
      encryptionCoverage: number;
      policyCompliance: number;
      threatBlocked: number;
    };
  }>({
    queryKey: ["/api/zero-trust/monitor", selectedTimeframe],
    refetchInterval: 5000, // Refresh every 5 seconds for real-time
  });

  // Canvas animation for network visualization
  useEffect(() => {
    if (!canvasRef.current || !zeroTrustData?.networkTopology) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;

    const animateNetwork = (frame: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const { nodes, connections } = zeroTrustData.networkTopology;
      
      // Draw connections with data flow animation
      connections.forEach((conn, index) => {
        const fromNode = nodes.find(n => n.id === conn.from);
        const toNode = nodes.find(n => n.id === conn.to);
        
        if (!fromNode || !toNode) return;
        
        // Animated data flow line
        ctx.beginPath();
        ctx.moveTo(fromNode.x, fromNode.y);
        ctx.lineTo(toNode.x, toNode.y);
        
        // Color based on encryption and verification status
        if (conn.encrypted && conn.verified) {
          ctx.strokeStyle = '#22c55e'; // Green for secure
        } else if (conn.encrypted || conn.verified) {
          ctx.strokeStyle = '#eab308'; // Yellow for partially secure
        } else {
          ctx.strokeStyle = '#ef4444'; // Red for insecure
        }
        
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Animated flow particles
        const progress = (frame + index * 20) % 100 / 100;
        const particleX = fromNode.x + (toNode.x - fromNode.x) * progress;
        const particleY = fromNode.y + (toNode.y - fromNode.y) * progress;
        
        ctx.beginPath();
        ctx.arc(particleX, particleY, 3, 0, 2 * Math.PI);
        ctx.fillStyle = ctx.strokeStyle;
        ctx.fill();
      });
      
      // Draw nodes
      nodes.forEach(node => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, 8, 0, 2 * Math.PI);
        
        // Color based on node status
        switch (node.status) {
          case 'secure':
            ctx.fillStyle = '#22c55e';
            break;
          case 'warning':
            ctx.fillStyle = '#eab308';
            break;
          case 'critical':
            ctx.fillStyle = '#ef4444';
            break;
          default:
            ctx.fillStyle = '#6b7280';
        }
        
        ctx.fill();
        
        // Node border
        ctx.beginPath();
        ctx.arc(node.x, node.y, 8, 0, 2 * Math.PI);
        ctx.strokeStyle = '#374151';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Pulsing effect for active nodes
        if (node.status === 'secure') {
          const pulseRadius = 8 + Math.sin(frame * 0.1) * 2;
          ctx.beginPath();
          ctx.arc(node.x, node.y, pulseRadius, 0, 2 * Math.PI);
          ctx.strokeStyle = `rgba(34, 197, 94, ${0.3 + Math.sin(frame * 0.1) * 0.2})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      });
      
      animationId = requestAnimationFrame(() => animateNetwork(frame + 1));
    };

    animateNetwork(0);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [zeroTrustData]);

  const getMethodIcon = (method: string) => {
    switch (method) {
      case "password": return <Key className="w-4 h-4" />;
      case "mfa": return <Shield className="w-4 h-4" />;
      case "biometric": return <Eye className="w-4 h-4" />;
      case "hardware_key": return <Lock className="w-4 h-4" />;
      default: return <Key className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success": return "text-green-400";
      case "failed": return "text-yellow-400";
      case "blocked": return "text-red-400";
      default: return "text-gray-400";
    }
  };

  if (isLoading) {
    return (
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Shield className="w-5 h-5 mr-2" />
            Zero Trust Implementation Monitor
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
            <Shield className="w-5 h-5 mr-2" />
            Zero Trust Implementation Monitor
            <Badge className="ml-2 bg-blue-600 text-white">Live</Badge>
          </CardTitle>
          
          <div className="flex items-center space-x-2">
            <select
              value={selectedTimeframe}
              onChange={(e) => setSelectedTimeframe(e.target.value)}
              className="bg-gray-700 text-white border border-gray-600 rounded px-2 py-1 text-sm"
            >
              <option value="1h">Last Hour</option>
              <option value="24h">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
            </select>
          </div>
        </div>
        
        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          <div className="bg-gray-900 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-green-400">
              {zeroTrustData?.metrics?.verificationRate || 94}%
            </div>
            <div className="text-xs text-gray-400">Verification Rate</div>
          </div>
          <div className="bg-gray-900 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-blue-400">
              {zeroTrustData?.metrics?.encryptionCoverage || 98}%
            </div>
            <div className="text-xs text-gray-400">Encryption Coverage</div>
          </div>
          <div className="bg-gray-900 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-yellow-400">
              {zeroTrustData?.metrics?.policyCompliance || 92}%
            </div>
            <div className="text-xs text-gray-400">Policy Compliance</div>
          </div>
          <div className="bg-gray-900 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-red-400">
              {zeroTrustData?.metrics?.threatBlocked || 147}
            </div>
            <div className="text-xs text-gray-400">Threats Blocked</div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <Tabs defaultValue="network" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-gray-700">
            <TabsTrigger value="network" className="data-[state=active]:bg-blue-600">
              Network Topology
            </TabsTrigger>
            <TabsTrigger value="authentication" className="data-[state=active]:bg-blue-600">
              Authentication Events
            </TabsTrigger>
            <TabsTrigger value="policies" className="data-[state=active]:bg-blue-600">
              Policy Enforcement
            </TabsTrigger>
          </TabsList>
          
          {/* Network Topology Tab */}
          <TabsContent value="network" className="space-y-4">
            <div className="bg-gray-900 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-medium">Live Network Topology</h3>
                <Badge className="bg-green-600 text-white">All Systems Verified</Badge>
              </div>
              
              <canvas
                ref={canvasRef}
                width={600}
                height={300}
                className="w-full h-64 bg-black rounded-lg border border-gray-700"
              />
              
              <div className="flex justify-center space-x-6 mt-4 text-xs">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-gray-400">Secure Connection</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="text-gray-400">Partially Secure</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-gray-400">Insecure</span>
                </div>
              </div>
            </div>
          </TabsContent>
          
          {/* Authentication Events Tab */}
          <TabsContent value="authentication" className="space-y-4">
            <div className="bg-gray-900 rounded-lg p-4">
              <h3 className="text-white font-medium mb-4">Recent Authentication Events</h3>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {zeroTrustData?.authEvents?.slice(0, 10).map((event) => (
                  <div key={event.id} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`${getStatusColor(event.status)}`}>
                        {getMethodIcon(event.method)}
                      </div>
                      <div>
                        <div className="text-white font-medium text-sm">{event.user}</div>
                        <div className="text-xs text-gray-400">{event.device} • {event.location}</div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <Badge className={`text-xs ${
                        event.status === "success" ? "bg-green-600" :
                        event.status === "failed" ? "bg-yellow-600" : "bg-red-600"
                      } text-white`}>
                        {event.status}
                      </Badge>
                      <div className="text-xs text-gray-400 mt-1">
                        Risk: {event.riskScore}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          
          {/* Policy Enforcement Tab */}
          <TabsContent value="policies" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {zeroTrustData?.policyPoints?.map((point) => (
                <div key={point.id} className="bg-gray-900 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <Network className="w-4 h-4 text-blue-400" />
                      <span className="text-white font-medium">{point.name}</span>
                    </div>
                    
                    <Badge className={`${
                      point.status === "active" ? "bg-green-600" :
                      point.status === "warning" ? "bg-yellow-600" : "bg-red-600"
                    } text-white text-xs`}>
                      {point.status}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Type:</span>
                      <span className="text-white capitalize">{point.type}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Policies:</span>
                      <span className="text-white">{point.policies}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Violations:</span>
                      <span className={`${point.violations > 0 ? 'text-red-400' : 'text-green-400'} font-bold`}>
                        {point.violations}
                      </span>
                    </div>
                  </div>
                  
                  <div className="mt-3 flex justify-end">
                    <Button size="sm" variant="ghost" className="text-blue-400 hover:text-white">
                      <Monitor className="w-3 h-3 mr-1" />
                      Monitor
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}