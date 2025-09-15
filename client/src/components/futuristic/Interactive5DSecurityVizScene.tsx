import React, { useState, useEffect, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Text, Sphere, Box, Line } from '@react-three/drei';
import { Mesh, Vector3, Color } from 'three';

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

interface Interactive5DSecurityVizSceneProps {
  selectedSector: 'all' | 'education' | 'government';
  timeRange: string;
  selectedNode: SecurityNode | null;
  onSelectNode: (node: SecurityNode) => void;
  isAutoRotate: boolean;
  viewMode: '3d' | '4d' | '5d';
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
        return <Box ref={meshRef} args={[2, 2, 2]} />;
      case 'database':
        return <Box ref={meshRef} args={[1.5, 3, 1.5]} />;
      case 'network':
        return <Sphere ref={meshRef} args={[1.2, 16, 16]} />;
      case 'threat':
        return <Sphere ref={meshRef} args={[1.5, 8, 8]} />;
      default:
        return <Sphere ref={meshRef} args={[1, 16, 16]} />;
    }
  };

  return (
    <group position={node.position}>
      <mesh
        onClick={() => onSelect(node)}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        {getNodeShape()}
        <meshStandardMaterial
          color={getNodeColor()}
          emissive={getNodeColor()}
          emissiveIntensity={selected ? 0.3 : hovered ? 0.2 : 0.1}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      
      {/* Node label */}
      <Text
        position={[0, 2.5, 0]}
        fontSize={0.5}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {node.name}
      </Text>
      
      {/* Risk level indicator */}
      <Text
        position={[0, -2.5, 0]}
        fontSize={0.3}
        color={node.riskLevel > 0.7 ? '#ff4444' : node.riskLevel > 0.4 ? '#ffaa00' : '#00ff88'}
        anchorX="center"
        anchorY="middle"
      >
        Risk: {Math.round(node.riskLevel * 100)}%
      </Text>
    </group>
  );
}

// Network Connection Line Component
function NetworkConnectionLine({ connection, nodes }: { 
  connection: NetworkConnection; 
  nodes: SecurityNode[];
}) {
  const fromNode = nodes.find(n => n.id === connection.from);
  const toNode = nodes.find(n => n.id === connection.to);
  
  if (!fromNode || !toNode) return null;

  const points = [
    new Vector3(...fromNode.position),
    new Vector3(...toNode.position)
  ];

  const lineColor = connection.encrypted ? '#00ff88' : 
                   connection.riskLevel > 0.7 ? '#ff4444' : '#888888';

  return (
    <Line
      points={points}
      color={lineColor}
      lineWidth={connection.strength * 3}
      transparent
      opacity={0.6}
    />
  );
}

// Main 3D Scene Component
function SecurityScene({ 
  selectedSector, 
  selectedNode, 
  onSelectNode, 
  isAutoRotate,
  viewMode 
}: Interactive5DSecurityVizSceneProps) {
  // Mock data - replace with actual data source
  const mockNodes: SecurityNode[] = [
    {
      id: '1',
      name: 'Web Server',
      type: 'server',
      position: [0, 0, 0],
      riskLevel: 0.8,
      connections: ['2', '3'],
      sector: 'education',
      threats: [],
      vulnerabilities: []
    },
    {
      id: '2', 
      name: 'Database',
      type: 'database',
      position: [5, 0, 0],
      riskLevel: 0.3,
      connections: ['1'],
      sector: 'education',
      threats: [],
      vulnerabilities: []
    },
    {
      id: '3',
      name: 'Network Gateway',
      type: 'network', 
      position: [-5, 0, 0],
      riskLevel: 0.6,
      connections: ['1'],
      sector: 'government',
      threats: [],
      vulnerabilities: []
    }
  ];

  const mockConnections: NetworkConnection[] = [
    {
      from: '1',
      to: '2', 
      strength: 0.8,
      riskLevel: 0.4,
      encrypted: true
    },
    {
      from: '1',
      to: '3',
      strength: 0.6,
      riskLevel: 0.7,
      encrypted: false
    }
  ];

  const filteredNodes = selectedSector === 'all' 
    ? mockNodes 
    : mockNodes.filter(node => node.sector === selectedSector);

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />

      {/* Controls */}
      <OrbitControls 
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        autoRotate={isAutoRotate}
        autoRotateSpeed={0.5}
      />

      {/* Security Nodes */}
      {filteredNodes.map(node => (
        <SecurityNodeMesh
          key={node.id}
          node={node}
          onSelect={onSelectNode}
          selected={selectedNode?.id === node.id}
        />
      ))}

      {/* Network Connections */}
      {mockConnections.map((connection, index) => (
        <NetworkConnectionLine
          key={index}
          connection={connection}
          nodes={filteredNodes}
        />
      ))}

      {/* Grid Helper */}
      <gridHelper args={[20, 20, '#444444', '#222222']} />
    </>
  );
}

export default function Interactive5DSecurityVizScene(props: Interactive5DSecurityVizSceneProps) {
  return (
    <div className="h-96 w-full">
      <Canvas
        camera={{ position: [15, 15, 15], fov: 60 }}
        style={{ background: 'linear-gradient(to bottom, #000428, #004e92)' }}
      >
        <SecurityScene {...props} />
      </Canvas>
    </div>
  );
}