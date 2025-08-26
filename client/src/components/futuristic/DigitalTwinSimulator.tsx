import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Pause, RotateCcw, Zap, Shield, AlertTriangle, CheckCircle } from "lucide-react";

interface SimulationNode {
  id: string;
  type: 'server' | 'endpoint' | 'firewall' | 'database';
  x: number;
  y: number;
  status: 'healthy' | 'compromised' | 'protected' | 'analyzing';
  connections: string[];
}

interface SimulationScenario {
  id: string;
  name: string;
  description: string;
  duration: number;
  steps: SimulationStep[];
}

interface SimulationStep {
  timestamp: number;
  nodeId: string;
  action: 'attack' | 'detect' | 'mitigate' | 'recover';
  description: string;
}

export function DigitalTwinSimulator() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [selectedScenario, setSelectedScenario] = useState(0);
  const [nodes, setNodes] = useState<SimulationNode[]>([
    { id: 'web-server', type: 'server', x: 150, y: 100, status: 'healthy', connections: ['firewall-1', 'database-1'] },
    { id: 'database-1', type: 'database', x: 300, y: 200, status: 'healthy', connections: ['web-server'] },
    { id: 'endpoint-1', type: 'endpoint', x: 50, y: 250, status: 'healthy', connections: ['firewall-1'] },
    { id: 'firewall-1', type: 'firewall', x: 150, y: 300, status: 'healthy', connections: ['web-server', 'endpoint-1'] }
  ]);

  const scenarios: SimulationScenario[] = [
    {
      id: 'ransomware',
      name: 'Ransomware Attack',
      description: 'Simulates a ransomware attack targeting the database through endpoint compromise',
      duration: 30000,
      steps: [
        { timestamp: 2000, nodeId: 'endpoint-1', action: 'attack', description: 'Phishing email opens backdoor' },
        { timestamp: 5000, nodeId: 'endpoint-1', action: 'detect', description: 'AI detects anomalous behavior' },
        { timestamp: 8000, nodeId: 'database-1', action: 'attack', description: 'Lateral movement to database' },
        { timestamp: 10000, nodeId: 'firewall-1', action: 'mitigate', description: 'Firewall blocks suspicious traffic' },
        { timestamp: 15000, nodeId: 'endpoint-1', action: 'recover', description: 'Endpoint isolated and restored' },
        { timestamp: 20000, nodeId: 'database-1', action: 'recover', description: 'Database backup restored' }
      ]
    },
    {
      id: 'ddos',
      name: 'DDoS Attack',
      description: 'Distributed denial of service attack overwhelming the web server',
      duration: 25000,
      steps: [
        { timestamp: 1000, nodeId: 'web-server', action: 'attack', description: 'Massive traffic influx detected' },
        { timestamp: 3000, nodeId: 'firewall-1', action: 'detect', description: 'Traffic pattern analysis' },
        { timestamp: 6000, nodeId: 'firewall-1', action: 'mitigate', description: 'Rate limiting activated' },
        { timestamp: 12000, nodeId: 'web-server', action: 'recover', description: 'Load balancing restored' }
      ]
    },
    {
      id: 'insider-threat',
      name: 'Insider Threat',
      description: 'Malicious insider attempting to access sensitive database information',
      duration: 35000,
      steps: [
        { timestamp: 3000, nodeId: 'database-1', action: 'attack', description: 'Unusual access patterns detected' },
        { timestamp: 7000, nodeId: 'database-1', action: 'detect', description: 'AI identifies privilege escalation' },
        { timestamp: 12000, nodeId: 'database-1', action: 'mitigate', description: 'Access permissions revoked' },
        { timestamp: 18000, nodeId: 'database-1', action: 'recover', description: 'Security audit completed' }
      ]
    }
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          const newTime = prev + 100;
          if (newTime >= scenarios[selectedScenario].duration) {
            setIsPlaying(false);
            return scenarios[selectedScenario].duration;
          }
          return newTime;
        });
      }, 100);
    }

    return () => clearInterval(interval);
  }, [isPlaying, selectedScenario]);

  useEffect(() => {
    // Reset nodes when scenario changes
    setNodes(prev => prev.map(node => ({ ...node, status: 'healthy' })));
    setCurrentTime(0);
  }, [selectedScenario]);

  useEffect(() => {
    // Update node states based on current simulation time
    const currentScenario = scenarios[selectedScenario];
    const relevantSteps = currentScenario.steps.filter(step => step.timestamp <= currentTime);
    
    setNodes(prev => prev.map(node => {
      const lastStep = relevantSteps
        .filter(step => step.nodeId === node.id)
        .sort((a, b) => b.timestamp - a.timestamp)[0];

      if (lastStep) {
        switch (lastStep.action) {
          case 'attack':
            return { ...node, status: 'compromised' };
          case 'detect':
            return { ...node, status: 'analyzing' };
          case 'mitigate':
            return { ...node, status: 'protected' };
          case 'recover':
            return { ...node, status: 'healthy' };
          default:
            return node;
        }
      }
      return node;
    }));
  }, [currentTime, selectedScenario]);

  const getNodeColor = (status: string): string => {
    const colors = {
      healthy: '#10B981',    // Green
      compromised: '#EF4444', // Red
      protected: '#3B82F6',   // Blue
      analyzing: '#F59E0B'    // Orange
    };
    return colors[status as keyof typeof colors] || colors.healthy;
  };

  const getStatusIcon = (status: string) => {
    const icons = {
      healthy: <CheckCircle className="w-4 h-4 text-green-400" />,
      compromised: <AlertTriangle className="w-4 h-4 text-red-400" />,
      protected: <Shield className="w-4 h-4 text-blue-400" />,
      analyzing: <Zap className="w-4 h-4 text-yellow-400" />
    };
    return icons[status as keyof typeof icons];
  };

  const resetSimulation = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const progress = (currentTime / scenarios[selectedScenario].duration) * 100;

  return (
    <div className="w-full space-y-6">
      {/* Scenario Selection */}
      <Card className="bg-surface border-cyan-500/30 cyber-glow">
        <CardHeader>
          <CardTitle className="text-cyan-300">Digital Twin Security Simulator</CardTitle>
          <p className="text-gray-400 text-sm">
            Interactive network simulation showing real-time security responses
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {scenarios.map((scenario, index) => (
              <Card
                key={scenario.id}
                className={`cursor-pointer transition-all duration-200 ${
                  selectedScenario === index
                    ? 'border-cyan-400 bg-cyan-400/10 cyber-glow'
                    : 'border-surface-light hover:border-cyan-500/50 bg-surface-light/30'
                }`}
                onClick={() => {
                  setSelectedScenario(index);
                  resetSimulation();
                }}
              >
                <CardContent className="p-4">
                  <h3 className="font-semibold text-white mb-2">{scenario.name}</h3>
                  <p className="text-xs text-gray-400 mb-3">{scenario.description}</p>
                  <div className="flex justify-between items-center">
                    <Badge variant="outline" className="text-xs border-cyan-500/50 text-cyan-400">
                      {scenario.duration / 1000}s
                    </Badge>
                    <span className="text-xs text-gray-500">
                      {scenario.steps.length} steps
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <Button
                onClick={() => setIsPlaying(!isPlaying)}
                className="bg-cyan-600 hover:bg-cyan-700"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </Button>
              <Button onClick={resetSimulation} variant="outline" className="border-gray-500">
                <RotateCcw className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="text-sm text-gray-400">
              {Math.round(currentTime / 1000)}s / {scenarios[selectedScenario].duration / 1000}s
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="w-full bg-surface-light rounded-full h-2">
              <div 
                className="h-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-200"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Network Visualization */}
      <Card className="bg-surface border-cyan-500/30 cyber-glow">
        <CardContent className="p-6">
          <div className="relative bg-black rounded-lg h-96 overflow-hidden border border-cyan-500/20">
            <svg viewBox="0 0 400 350" className="w-full h-full">
              {/* Connection lines */}
              {nodes.map(node =>
                node.connections.map(connectionId => {
                  const connectedNode = nodes.find(n => n.id === connectionId);
                  return connectedNode ? (
                    <line
                      key={`${node.id}-${connectionId}`}
                      x1={node.x}
                      y1={node.y}
                      x2={connectedNode.x}
                      y2={connectedNode.y}
                      stroke="rgba(0, 255, 255, 0.3)"
                      strokeWidth="2"
                    />
                  ) : null;
                })
              )}

              {/* Network nodes */}
              {nodes.map(node => (
                <g key={node.id}>
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r="20"
                    fill={getNodeColor(node.status)}
                    stroke="white"
                    strokeWidth="2"
                    className="animate-pulse"
                  />
                  <text
                    x={node.x}
                    y={node.y + 35}
                    fill="white"
                    fontSize="12"
                    textAnchor="middle"
                    className="font-mono"
                  >
                    {node.id.split('-')[0]}
                  </text>
                </g>
              ))}
            </svg>

            {/* Legend */}
            <div className="absolute top-4 right-4 bg-surface/90 rounded-lg p-3 space-y-2">
              <div className="text-xs font-semibold text-cyan-300 mb-2">Node Status</div>
              {[
                { status: 'healthy', label: 'Healthy' },
                { status: 'analyzing', label: 'Analyzing' },
                { status: 'compromised', label: 'Compromised' },
                { status: 'protected', label: 'Protected' }
              ].map(item => (
                <div key={item.status} className="flex items-center space-x-2 text-xs">
                  {getStatusIcon(item.status)}
                  <span className="text-gray-300">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Current Event Display */}
      <Card className="bg-surface border-cyan-500/30 cyber-glow">
        <CardContent className="p-4">
          <div className="text-sm">
            <div className="text-cyan-300 font-semibold mb-2">Current Simulation Event:</div>
            {(() => {
              const currentStep = scenarios[selectedScenario].steps
                .filter(step => step.timestamp <= currentTime)
                .sort((a, b) => b.timestamp - a.timestamp)[0];
              
              return currentStep ? (
                <div className="flex items-center space-x-3">
                  <Badge className={`${
                    currentStep.action === 'attack' ? 'bg-red-600' :
                    currentStep.action === 'detect' ? 'bg-yellow-600' :
                    currentStep.action === 'mitigate' ? 'bg-blue-600' : 'bg-green-600'
                  }`}>
                    {currentStep.action.toUpperCase()}
                  </Badge>
                  <span className="text-gray-300">{currentStep.description}</span>
                  <span className="text-cyan-400">({currentStep.nodeId})</span>
                </div>
              ) : (
                <span className="text-gray-400">Simulation ready - Press play to start</span>
              );
            })()}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}