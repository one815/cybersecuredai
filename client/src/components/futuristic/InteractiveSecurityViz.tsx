import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Zap, Eye, Lock, Server, AlertTriangle } from "lucide-react";

interface SecurityNode {
  id: string;
  type: 'firewall' | 'endpoint' | 'server' | 'threat' | 'ai-core';
  x: number;
  y: number;
  z: number;
  status: 'secure' | 'warning' | 'critical' | 'analyzing';
  connections: string[];
  pulseIntensity: number;
}

export function InteractiveSecurityViz() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const [selectedNode, setSelectedNode] = useState<SecurityNode | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isInteracting, setIsInteracting] = useState(false);

  const securityNodes: SecurityNode[] = [
    { id: 'ai-core', type: 'ai-core', x: 400, y: 200, z: 0, status: 'analyzing', connections: ['firewall-1', 'endpoint-1', 'server-1'], pulseIntensity: 0.8 },
    { id: 'firewall-1', type: 'firewall', x: 200, y: 100, z: 50, status: 'secure', connections: ['ai-core', 'endpoint-1'], pulseIntensity: 0.3 },
    { id: 'endpoint-1', type: 'endpoint', x: 600, y: 150, z: 30, status: 'secure', connections: ['ai-core', 'server-1'], pulseIntensity: 0.2 },
    { id: 'server-1', type: 'server', x: 300, y: 350, z: 20, status: 'warning', connections: ['ai-core', 'threat-1'], pulseIntensity: 0.5 },
    { id: 'threat-1', type: 'threat', x: 500, y: 400, z: 10, status: 'critical', connections: ['server-1'], pulseIntensity: 1.0 },
  ];

  const getNodeColor = (node: SecurityNode, time: number): string => {
    const pulse = Math.sin(time * 0.01 * node.pulseIntensity) * 0.3 + 0.7;
    
    switch (node.status) {
      case 'secure':
        return `rgba(16, 185, 129, ${pulse})`;  // Green
      case 'warning':
        return `rgba(245, 158, 11, ${pulse})`;  // Orange
      case 'critical':
        return `rgba(239, 68, 68, ${pulse})`;   // Red
      case 'analyzing':
        return `rgba(59, 130, 246, ${pulse})`;  // Blue
      default:
        return `rgba(156, 163, 175, ${pulse})`;
    }
  };

  const getNodeIcon = (type: string) => {
    switch (type) {
      case 'ai-core': return '🧠';
      case 'firewall': return '🛡️';
      case 'endpoint': return '💻';
      case 'server': return '🖥️';
      case 'threat': return '⚠️';
      default: return '●';
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let startTime = Date.now();

    const animate = () => {
      const currentTime = Date.now() - startTime;
      
      // Clear canvas with cyber grid background
      ctx.fillStyle = 'rgba(0, 0, 0, 0.95)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw cyber grid
      ctx.strokeStyle = 'rgba(0, 255, 255, 0.1)';
      ctx.lineWidth = 1;
      const gridSize = 40;
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Draw connections with data flow animation
      securityNodes.forEach(node => {
        node.connections.forEach(connectionId => {
          const connectedNode = securityNodes.find(n => n.id === connectionId);
          if (connectedNode) {
            // Animate data flow
            const flowProgress = (currentTime * 0.003) % 1;
            const flowX = node.x + (connectedNode.x - node.x) * flowProgress;
            const flowY = node.y + (connectedNode.y - node.y) * flowProgress;

            // Connection line
            ctx.strokeStyle = 'rgba(0, 255, 255, 0.3)';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(connectedNode.x, connectedNode.y);
            ctx.stroke();

            // Data flow particle
            ctx.fillStyle = 'rgba(0, 255, 255, 0.8)';
            ctx.beginPath();
            ctx.arc(flowX, flowY, 3, 0, Math.PI * 2);
            ctx.fill();
          }
        });
      });

      // Draw security nodes with 3D effect
      securityNodes.forEach(node => {
        const nodeColor = getNodeColor(node, currentTime);
        const shadowOffset = node.z * 0.1;
        
        // Shadow for 3D effect
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.beginPath();
        ctx.arc(node.x + shadowOffset, node.y + shadowOffset, 25, 0, Math.PI * 2);
        ctx.fill();

        // Main node
        ctx.fillStyle = nodeColor;
        ctx.beginPath();
        ctx.arc(node.x, node.y, 20 + node.pulseIntensity * 5, 0, Math.PI * 2);
        ctx.fill();

        // Inner glow
        const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, 30);
        gradient.addColorStop(0, nodeColor);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(node.x, node.y, 30, 0, Math.PI * 2);
        ctx.fill();

        // Node border
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(node.x, node.y, 20, 0, Math.PI * 2);
        ctx.stroke();

        // Node icon
        ctx.fillStyle = 'white';
        ctx.font = '16px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(getNodeIcon(node.type), node.x, node.y);
      });

      // Mouse interaction effects
      if (isInteracting) {
        const gradient = ctx.createRadialGradient(mousePos.x, mousePos.y, 0, mousePos.x, mousePos.y, 100);
        gradient.addColorStop(0, 'rgba(0, 255, 255, 0.3)');
        gradient.addColorStop(1, 'rgba(0, 255, 255, 0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [mousePos, isInteracting]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  const handleNodeClick = (e: React.MouseEvent) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const clickedNode = securityNodes.find(node => {
      const distance = Math.sqrt((clickX - node.x) ** 2 + (clickY - node.y) ** 2);
      return distance <= 25;
    });

    setSelectedNode(clickedNode || null);
  };

  return (
    <div className="relative w-full h-96 bg-black rounded-lg overflow-hidden border border-cyan-500/30">
      <canvas
        ref={canvasRef}
        width={800}
        height={400}
        className="w-full h-full cursor-crosshair"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsInteracting(true)}
        onMouseLeave={() => setIsInteracting(false)}
        onClick={handleNodeClick}
      />
      
      {/* Node Information Overlay */}
      {selectedNode && (
        <Card className="absolute top-4 right-4 w-64 bg-surface/95 backdrop-blur-md border-cyan-500/30 cyber-glow">
          <div className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-cyan-300 capitalize">
                {selectedNode.type.replace('-', ' ')}
              </h3>
              <Badge 
                className={`${
                  selectedNode.status === 'secure' ? 'bg-green-600' :
                  selectedNode.status === 'warning' ? 'bg-yellow-600' :
                  selectedNode.status === 'critical' ? 'bg-red-600' :
                  'bg-blue-600'
                }`}
              >
                {selectedNode.status}
              </Badge>
            </div>
            
            <div className="text-sm text-gray-300 space-y-1">
              <div>ID: <span className="text-cyan-400">{selectedNode.id}</span></div>
              <div>Connections: <span className="text-cyan-400">{selectedNode.connections.length}</span></div>
              <div>Pulse Intensity: <span className="text-cyan-400">{Math.round(selectedNode.pulseIntensity * 100)}%</span></div>
            </div>

            <div className="flex justify-between text-xs text-gray-400">
              <span>Position: {selectedNode.x}, {selectedNode.y}</span>
              <span>Z: {selectedNode.z}</span>
            </div>
          </div>
        </Card>
      )}

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-surface/90 backdrop-blur-md rounded-lg p-3 border border-cyan-500/20">
        <div className="text-xs text-cyan-300 mb-2 font-semibold">Security Infrastructure</div>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-gray-300">Secure</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            <span className="text-gray-300">Warning</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            <span className="text-gray-300">Critical</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="text-gray-300">Analyzing</span>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="absolute top-4 left-4 text-xs text-cyan-400/70">
        Click nodes to explore • Hover for interaction effects
      </div>
    </div>
  );
}