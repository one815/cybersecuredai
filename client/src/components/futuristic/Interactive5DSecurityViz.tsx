import React, { useState, useEffect, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Text, Sphere, Box, Line } from '@react-three/drei';
import { Mesh, Vector3, Color } from 'three';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Shield, AlertTriangle, Zap, Network, Database, Server } from 'lucide-react';

interface SecurityNode {
  id: string;
  name: string;
  type: 'server' | 'network' | 'database' | 'user' | 'application' | 'threat';
  position: [number, number, number];
  riskLevel: number; // 0-1
  connections: string[];
  sector: 'education' | 'government' | 'both';
  threats: ThreatData[];
  vulnerabilities: VulnerabilityData[];
}

interface ThreatData {
  id: string;
  name: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  confidence: number;
  source: string;
}

interface VulnerabilityData {
  id: string;
  cve: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  exploitability: number;
  impact: number;
}

interface NetworkConnection {
  from: string;
  to: string;
  strength: number;
  riskLevel: number;
  encrypted: boolean;
}

// 3D Security Node Component
function SecurityNodeMesh({ node, onSelect, selected }: { 
  node: SecurityNode; 
  onSelect: (node: SecurityNode) => void;
  selected: boolean;
}) {
  const meshRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      // Gentle rotation and floating animation
      meshRef.current.rotation.y += 0.01;
      meshRef.current.position.y = node.position[1] + Math.sin(state.clock.elapsedTime + node.position[0]) * 0.1;
    }
  });

  const getNodeColor = (): Color => {
    if (selected) return new Color('#00ff88');
    if (hovered) return new Color('#88ff00');
    
    // Color based on risk level
    if (node.riskLevel > 0.8) return new Color('#ff4444');
    if (node.riskLevel > 0.6) return new Color('#ff8800');
    if (node.riskLevel > 0.4) return new Color('#ffdd00');
    return new Color('#00ddff');
  };

  const getNodeShape = () => {
    switch (node.type) {
      case 'server':
        return <Box args={[0.8, 1.2, 0.8]} />;
      case 'database':
        return <Box args={[1.0, 0.6, 1.0]} />;
      case 'network':
        return <Sphere args={[0.8, 12, 8]} />;
      case 'threat':
        return <Sphere args={[0.6, 8, 6]} />;
      default:
        return <Sphere args={[0.7, 10, 8]} />;
    }
  };

  return (
    <group>
      <mesh
        ref={meshRef}
        position={node.position}
        onClick={() => onSelect(node)}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        {getNodeShape()}
        <meshStandardMaterial 
          color={getNodeColor()} 
          emissive={getNodeColor().multiplyScalar(0.3)}
          transparent
          opacity={node.type === 'threat' ? 0.8 : 0.9}
        />
      </mesh>
      
      {/* Node label */}
      <Text
        position={[node.position[0], node.position[1] + 1.5, node.position[2]]}
        fontSize={0.3}
        color={selected ? '#00ff88' : '#ffffff'}
        anchorX="center"
        anchorY="middle"
      >
        {node.name}
      </Text>

      {/* Risk level indicator */}
      {node.riskLevel > 0.7 && (
        <Sphere args={[0.2, 6, 4]} position={[node.position[0] + 1, node.position[1] + 1, node.position[2]]}>
          <meshBasicMaterial color="#ff0000" transparent opacity={0.8} />
        </Sphere>
      )}
    </group>
  );
}

// 3D Connection Lines Component
function ConnectionLines({ connections, nodes }: { 
  connections: NetworkConnection[];
  nodes: SecurityNode[];
}) {
  return (
    <>
      {connections.map((conn, index) => {
        const fromNode = nodes.find(n => n.id === conn.from);
        const toNode = nodes.find(n => n.id === conn.to);
        
        if (!fromNode || !toNode) return null;

        const points = [
          new Vector3(...fromNode.position),
          new Vector3(...toNode.position)
        ];

        const lineColor = conn.riskLevel > 0.6 ? '#ff4444' : 
                         conn.encrypted ? '#00ff88' : '#ffaa00';

        return (
          <Line
            key={`connection-${index}`}
            points={points}
            color={lineColor}
            lineWidth={conn.strength * 5}
            transparent
            opacity={0.6}
          />
        );
      })}
    </>
  );
}

// Threat Visualization Component
function ThreatVisualization({ threats, nodes }: { 
  threats: ThreatData[];
  nodes: SecurityNode[];
}) {
  return (
    <>
      {threats.map((threat, index) => {
        const targetNode = nodes[Math.floor(Math.random() * nodes.length)];
        if (!targetNode) return null;

        return (
          <group key={`threat-${threat.id}`}>
            {/* Threat pulse effect */}
            <Sphere 
              args={[1.5, 16, 12]} 
              position={[
                targetNode.position[0] + Math.sin(index) * 2,
                targetNode.position[1] + 2,
                targetNode.position[2] + Math.cos(index) * 2
              ]}
            >
              <meshBasicMaterial 
                color={threat.severity === 'critical' ? '#ff0000' : '#ff8800'} 
                transparent 
                opacity={0.2}
                wireframe
              />
            </Sphere>
          </group>
        );
      })}
    </>
  );
}

// Control Panel Component
function ControlPanel({ 
  currentView,
  onViewChange,
  selectedNode,
  onFilterChange,
  currentFilter
}: {
  currentView: string;
  onViewChange: (view: string) => void;
  selectedNode: SecurityNode | null;
  onFilterChange: (filter: string) => void;
  currentFilter: string;
}) {
  return (
    <div className="absolute top-4 left-4 z-10 space-y-4 max-w-80">
      <Card className="bg-gray-900/90 border-green-500/30 backdrop-blur">
        <CardHeader className="pb-2">
          <CardTitle className="text-green-400 flex items-center gap-2">
            <Shield className="w-5 h-5" />
            5D Security Visualization
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex flex-col gap-2">
            <label className="text-xs text-gray-300">View Mode</label>
            <Select value={currentView} onValueChange={onViewChange}>
              <SelectTrigger className="bg-gray-800 border-gray-600">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-600">
                <SelectItem value="network">Network Topology</SelectItem>
                <SelectItem value="threats">Threat Landscape</SelectItem>
                <SelectItem value="vulnerabilities">Vulnerability Map</SelectItem>
                <SelectItem value="compliance">Compliance View</SelectItem>
                <SelectItem value="realtime">Real-time Security</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs text-gray-300">Sector Filter</label>
            <Select value={currentFilter} onValueChange={onFilterChange}>
              <SelectTrigger className="bg-gray-800 border-gray-600">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-600">
                <SelectItem value="all">All Sectors</SelectItem>
                <SelectItem value="education">Education</SelectItem>
                <SelectItem value="government">Government</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2">
            <Button 
              size="sm" 
              variant="outline" 
              className="border-green-500/50 text-green-400 hover:bg-green-500/20"
              onClick={() => onViewChange('ai-analysis')}
            >
              <Zap className="w-4 h-4 mr-1" />
              AI Analysis
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Selected Node Details */}
      {selectedNode && (
        <Card className="bg-gray-900/90 border-blue-500/30 backdrop-blur">
          <CardHeader className="pb-2">
            <CardTitle className="text-blue-400 flex items-center gap-2">
              {selectedNode.type === 'server' && <Server className="w-4 h-4" />}
              {selectedNode.type === 'database' && <Database className="w-4 h-4" />}
              {selectedNode.type === 'network' && <Network className="w-4 h-4" />}
              {selectedNode.type === 'threat' && <AlertTriangle className="w-4 h-4" />}
              {selectedNode.name}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-400">Risk Level</span>
              <Badge 
                variant={selectedNode.riskLevel > 0.7 ? "destructive" : "secondary"}
                className="text-xs"
              >
                {Math.round(selectedNode.riskLevel * 100)}%
              </Badge>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-400">Sector</span>
              <Badge variant="outline" className="text-xs">
                {selectedNode.sector}
              </Badge>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-400">Threats</span>
              <span className="text-xs text-orange-400">
                {selectedNode.threats.length}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-400">Vulnerabilities</span>
              <span className="text-xs text-red-400">
                {selectedNode.vulnerabilities.length}
              </span>
            </div>

            {selectedNode.threats.length > 0 && (
              <div className="pt-2 border-t border-gray-700">
                <div className="text-xs text-gray-400 mb-1">Active Threats</div>
                <div className="space-y-1">
                  {selectedNode.threats.slice(0, 3).map(threat => (
                    <div key={threat.id} className="flex justify-between items-center">
                      <span className="text-xs text-gray-200">{threat.name}</span>
                      <Badge 
                        size="sm"
                        variant={threat.severity === 'critical' ? 'destructive' : 'secondary'}
                      >
                        {threat.severity}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// Main Interactive 5D Security Visualization Component
export function Interactive5DSecurityViz() {
  const [currentView, setCurrentView] = useState('network');
  const [selectedNode, setSelectedNode] = useState<SecurityNode | null>(null);
  const [currentFilter, setCurrentFilter] = useState('all');
  const [securityNodes, setSecurityNodes] = useState<SecurityNode[]>([]);
  const [connections, setConnections] = useState<NetworkConnection[]>([]);
  const [threats, setThreats] = useState<ThreatData[]>([]);

  // Initialize security visualization data
  useEffect(() => {
    const initializeVisualization = () => {
      // Generate realistic security infrastructure nodes
      const nodes: SecurityNode[] = [
        // Education sector nodes
        {
          id: 'edu-server-001',
          name: 'Student Portal Server',
          type: 'server',
          position: [-4, 2, 0],
          riskLevel: 0.3,
          connections: ['edu-db-001', 'edu-net-001'],
          sector: 'education',
          threats: [
            { id: 't1', name: 'SQL Injection Attempt', severity: 'medium', confidence: 0.7, source: 'Web Scanner' }
          ],
          vulnerabilities: [
            { id: 'v1', cve: 'CVE-2024-1234', severity: 'medium', exploitability: 0.6, impact: 0.7 }
          ]
        },
        {
          id: 'edu-db-001',
          name: 'Student Records DB',
          type: 'database',
          position: [-6, 0, -2],
          riskLevel: 0.8,
          connections: ['edu-server-001'],
          sector: 'education',
          threats: [
            { id: 't2', name: 'Data Exfiltration Attempt', severity: 'high', confidence: 0.85, source: 'Behavioral Analytics' },
            { id: 't3', name: 'Privilege Escalation', severity: 'critical', confidence: 0.9, source: 'Access Monitor' }
          ],
          vulnerabilities: [
            { id: 'v2', cve: 'CVE-2024-5678', severity: 'high', exploitability: 0.8, impact: 0.9 }
          ]
        },
        {
          id: 'edu-net-001',
          name: 'Campus Network Core',
          type: 'network',
          position: [-2, -1, 1],
          riskLevel: 0.5,
          connections: ['edu-server-001', 'edu-user-001'],
          sector: 'education',
          threats: [],
          vulnerabilities: []
        },
        {
          id: 'edu-user-001',
          name: 'Faculty Workstations',
          type: 'user',
          position: [0, 1, 3],
          riskLevel: 0.4,
          connections: ['edu-net-001'],
          sector: 'education',
          threats: [
            { id: 't4', name: 'Phishing Detection', severity: 'medium', confidence: 0.65, source: 'Email Security' }
          ],
          vulnerabilities: []
        },

        // Government sector nodes
        {
          id: 'gov-server-001',
          name: 'Citizen Services Portal',
          type: 'server',
          position: [4, 2, 0],
          riskLevel: 0.2,
          connections: ['gov-db-001', 'gov-net-001'],
          sector: 'government',
          threats: [],
          vulnerabilities: []
        },
        {
          id: 'gov-db-001',
          name: 'Citizen Data Repository',
          type: 'database',
          position: [6, 0, -2],
          riskLevel: 0.6,
          connections: ['gov-server-001'],
          sector: 'government',
          threats: [
            { id: 't5', name: 'Advanced Persistent Threat', severity: 'critical', confidence: 0.95, source: 'Threat Intelligence' }
          ],
          vulnerabilities: [
            { id: 'v3', cve: 'CVE-2024-9999', severity: 'critical', exploitability: 0.9, impact: 1.0 }
          ]
        },
        {
          id: 'gov-net-001',
          name: 'Government Network',
          type: 'network',
          position: [2, -1, 1],
          riskLevel: 0.3,
          connections: ['gov-server-001', 'gov-app-001'],
          sector: 'government',
          threats: [],
          vulnerabilities: []
        },
        {
          id: 'gov-app-001',
          name: 'Budget Management System',
          type: 'application',
          position: [0, -2, 2],
          riskLevel: 0.7,
          connections: ['gov-net-001'],
          sector: 'government',
          threats: [
            { id: 't6', name: 'Insider Threat Activity', severity: 'high', confidence: 0.8, source: 'Behavior Analytics' }
          ],
          vulnerabilities: []
        },

        // Shared/threat nodes
        {
          id: 'threat-001',
          name: 'Botnet Command Center',
          type: 'threat',
          position: [-8, 4, -4],
          riskLevel: 1.0,
          connections: [],
          sector: 'both',
          threats: [
            { id: 't7', name: 'Botnet Activity', severity: 'critical', confidence: 0.98, source: 'External Intelligence' }
          ],
          vulnerabilities: []
        },
        {
          id: 'threat-002',
          name: 'Phishing Infrastructure',
          type: 'threat',
          position: [8, 4, -4],
          riskLevel: 0.9,
          connections: [],
          sector: 'both',
          threats: [
            { id: 't8', name: 'Phishing Campaign', severity: 'high', confidence: 0.85, source: 'Email Intelligence' }
          ],
          vulnerabilities: []
        }
      ];

      // Generate network connections
      const nodeConnections: NetworkConnection[] = [
        { from: 'edu-server-001', to: 'edu-db-001', strength: 0.8, riskLevel: 0.4, encrypted: true },
        { from: 'edu-server-001', to: 'edu-net-001', strength: 0.9, riskLevel: 0.2, encrypted: true },
        { from: 'edu-net-001', to: 'edu-user-001', strength: 0.7, riskLevel: 0.3, encrypted: false },
        { from: 'gov-server-001', to: 'gov-db-001', strength: 0.9, riskLevel: 0.1, encrypted: true },
        { from: 'gov-server-001', to: 'gov-net-001', strength: 0.8, riskLevel: 0.2, encrypted: true },
        { from: 'gov-net-001', to: 'gov-app-001', strength: 0.6, riskLevel: 0.5, encrypted: true },
        // Threat connections (attacks)
        { from: 'threat-001', to: 'edu-db-001', strength: 0.3, riskLevel: 0.9, encrypted: false },
        { from: 'threat-002', to: 'edu-user-001', strength: 0.4, riskLevel: 0.8, encrypted: false },
        { from: 'threat-002', to: 'gov-app-001', strength: 0.2, riskLevel: 0.7, encrypted: false }
      ];

      // Aggregate all threats
      const allThreats: ThreatData[] = nodes.flatMap(node => node.threats);

      setSecurityNodes(nodes);
      setConnections(nodeConnections);
      setThreats(allThreats);
    };

    initializeVisualization();
  }, []);

  // Filter nodes based on current filter
  const filteredNodes = securityNodes.filter(node => {
    if (currentFilter === 'all') return true;
    return node.sector === currentFilter || node.sector === 'both';
  });

  const handleNodeSelect = (node: SecurityNode) => {
    setSelectedNode(node);
  };

  return (
    <div className="relative w-full h-[800px] bg-gradient-to-br from-gray-900 via-blue-900/20 to-green-900/20 rounded-lg border border-gray-700 overflow-hidden">
      <Canvas
        camera={{ position: [10, 10, 10], fov: 60 }}
        gl={{ antialias: true, alpha: false }}
        style={{ background: 'linear-gradient(135deg, #0f1419 0%, #1a2332 50%, #0d2818 100%)' }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.8} color="#ffffff" />
        <pointLight position={[-10, -10, -10]} intensity={0.4} color="#00ff88" />
        <pointLight position={[0, 15, 0]} intensity={0.5} color="#0088ff" />

        {/* Controls */}
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          maxDistance={50}
          minDistance={5}
        />

        {/* Security Nodes */}
        {filteredNodes.map(node => (
          <SecurityNodeMesh
            key={node.id}
            node={node}
            onSelect={handleNodeSelect}
            selected={selectedNode?.id === node.id}
          />
        ))}

        {/* Network Connections */}
        <ConnectionLines connections={connections} nodes={filteredNodes} />

        {/* Threat Visualization */}
        {currentView === 'threats' && (
          <ThreatVisualization threats={threats} nodes={filteredNodes} />
        )}

        {/* Grid reference */}
        <gridHelper args={[20, 20, '#333', '#333']} position={[0, -5, 0]} />
      </Canvas>

      {/* Control Panel */}
      <ControlPanel
        currentView={currentView}
        onViewChange={setCurrentView}
        selectedNode={selectedNode}
        onFilterChange={setCurrentFilter}
        currentFilter={currentFilter}
      />

      {/* Legend */}
      <div className="absolute bottom-4 right-4 z-10">
        <Card className="bg-gray-900/90 border-purple-500/30 backdrop-blur">
          <CardContent className="p-3">
            <div className="text-xs text-purple-400 mb-2 font-semibold">Legend</div>
            <div className="space-y-1 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-400 rounded"></div>
                <span className="text-gray-300">Low Risk</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-400 rounded"></div>
                <span className="text-gray-300">Medium Risk</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-orange-400 rounded"></div>
                <span className="text-gray-300">High Risk</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-400 rounded"></div>
                <span className="text-gray-300">Critical Risk</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-1 bg-green-400 rounded"></div>
                <span className="text-gray-300">Encrypted Connection</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-1 bg-red-400 rounded"></div>
                <span className="text-gray-300">Attack Vector</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Real-time Stats */}
      <div className="absolute top-4 right-4 z-10">
        <Card className="bg-gray-900/90 border-cyan-500/30 backdrop-blur">
          <CardContent className="p-3">
            <div className="text-xs text-cyan-400 mb-2 font-semibold">Real-time Security Status</div>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-300">Active Nodes:</span>
                <span className="text-green-400">{filteredNodes.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Active Threats:</span>
                <span className="text-red-400">{threats.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Risk Level:</span>
                <span className="text-orange-400">
                  {Math.round(filteredNodes.reduce((acc, node) => acc + node.riskLevel, 0) / filteredNodes.length * 100)}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Encrypted Links:</span>
                <span className="text-blue-400">
                  {connections.filter(c => c.encrypted).length}/{connections.length}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}