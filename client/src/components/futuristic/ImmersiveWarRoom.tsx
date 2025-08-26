import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Shield, 
  AlertTriangle, 
  Eye, 
  Zap, 
  Globe, 
  Monitor, 
  Network,
  Activity,
  Users,
  Database
} from "lucide-react";

interface ThreatAlert {
  id: string;
  type: 'intrusion' | 'malware' | 'ddos' | 'insider';
  severity: 'low' | 'medium' | 'high' | 'critical';
  location: { x: number; y: number; z: number };
  timestamp: number;
  status: 'active' | 'investigating' | 'mitigated' | 'resolved';
  source: string;
  target: string;
  impact: string;
}

interface SystemMetric {
  id: string;
  name: string;
  value: number;
  unit: string;
  status: 'normal' | 'warning' | 'critical';
  trend: 'up' | 'down' | 'stable';
}

export function ImmersiveWarRoom() {
  const [activeThreats, setActiveThreats] = useState<ThreatAlert[]>([]);
  const [selectedThreat, setSelectedThreat] = useState<ThreatAlert | null>(null);
  const [viewMode, setViewMode] = useState<'overview' | 'tactical' | 'forensic'>('overview');
  const [isFullscreen, setIsFullscreen] = useState(false);

  const systemMetrics: SystemMetric[] = [
    { id: 'cpu', name: 'CPU Usage', value: 67, unit: '%', status: 'normal', trend: 'stable' },
    { id: 'memory', name: 'Memory', value: 84, unit: '%', status: 'warning', trend: 'up' },
    { id: 'network', name: 'Network I/O', value: 156, unit: 'Mbps', status: 'normal', trend: 'down' },
    { id: 'threats', name: 'Active Threats', value: 3, unit: '', status: 'critical', trend: 'up' },
    { id: 'endpoints', name: 'Endpoints', value: 2847, unit: '', status: 'normal', trend: 'stable' },
    { id: 'response', name: 'Avg Response', value: 0.8, unit: 's', status: 'normal', trend: 'down' }
  ];

  useEffect(() => {
    // Generate random threats
    const generateThreat = (): ThreatAlert => ({
      id: Math.random().toString(36).substr(2, 9),
      type: ['intrusion', 'malware', 'ddos', 'insider'][Math.floor(Math.random() * 4)] as any,
      severity: ['low', 'medium', 'high', 'critical'][Math.floor(Math.random() * 4)] as any,
      location: {
        x: Math.random() * 800,
        y: Math.random() * 400,
        z: Math.random() * 100
      },
      timestamp: Date.now(),
      status: 'active',
      source: `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
      target: ['Web Server', 'Database', 'User Workstation', 'Domain Controller'][Math.floor(Math.random() * 4)],
      impact: ['Data Exfiltration', 'Service Disruption', 'Credential Compromise', 'Lateral Movement'][Math.floor(Math.random() * 4)]
    });

    // Initialize with some threats
    setActiveThreats([generateThreat(), generateThreat(), generateThreat()]);

    // Periodically update threats
    const interval = setInterval(() => {
      setActiveThreats(prev => {
        const updated = prev.map(threat => {
          if (Math.random() > 0.7) {
            const statuses = ['active', 'investigating', 'mitigated', 'resolved'];
            const currentIndex = statuses.indexOf(threat.status);
            const nextStatus = statuses[Math.min(currentIndex + 1, statuses.length - 1)];
            return { ...threat, status: nextStatus as any };
          }
          return threat;
        });

        // Sometimes add new threats
        if (Math.random() > 0.8 && updated.filter(t => t.status === 'active').length < 5) {
          updated.push(generateThreat());
        }

        // Remove resolved threats after some time
        return updated.filter(threat => 
          threat.status !== 'resolved' || Date.now() - threat.timestamp < 30000
        );
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const getThreatColor = (threat: ThreatAlert): string => {
    const severityColors = {
      low: 'rgba(34, 197, 94, 0.8)',
      medium: 'rgba(251, 191, 36, 0.8)',
      high: 'rgba(249, 115, 22, 0.8)',
      critical: 'rgba(239, 68, 68, 0.8)'
    };
    return severityColors[threat.severity];
  };

  const getThreatIcon = (type: string) => {
    const icons = {
      intrusion: '🔴',
      malware: '🦠',
      ddos: '⚡',
      insider: '👤'
    };
    return icons[type as keyof typeof icons] || '⚠️';
  };

  const getMetricColor = (status: string): string => {
    const colors = {
      normal: 'text-green-400',
      warning: 'text-yellow-400',
      critical: 'text-red-400'
    };
    return colors[status as keyof typeof colors] || colors.normal;
  };

  return (
    <div className={`w-full space-y-4 ${isFullscreen ? 'fixed inset-0 z-50 bg-black p-6' : ''}`}>
      {/* War Room Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-cyan-300 mb-2">
            🚨 Cyber Defense Command Center
          </h1>
          <p className="text-gray-400">Real-time security operations center with immersive threat visualization</p>
        </div>
        
        <div className="flex space-x-2">
          {['overview', 'tactical', 'forensic'].map(mode => (
            <Button
              key={mode}
              onClick={() => setViewMode(mode as any)}
              className={`${
                viewMode === mode 
                  ? 'bg-cyan-600 text-white' 
                  : 'bg-surface-light text-gray-300 hover:bg-cyan-600/20'
              }`}
            >
              {mode.charAt(0).toUpperCase() + mode.slice(1)}
            </Button>
          ))}
          <Button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="bg-purple-600 hover:bg-purple-700"
          >
            {isFullscreen ? '📱' : '🖥️'} {isFullscreen ? 'Exit' : 'Fullscreen'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Threat Visualization */}
        <div className="lg:col-span-2">
          <Card className="bg-black border-red-500/30 cyber-glow h-96">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-red-300 flex items-center">
                  <Globe className="w-5 h-5 mr-2" />
                  Global Threat Map - {viewMode.toUpperCase()} MODE
                </CardTitle>
                <Badge className={`${
                  activeThreats.filter(t => t.status === 'active').length > 3 ? 'bg-red-600' :
                  activeThreats.filter(t => t.status === 'active').length > 1 ? 'bg-yellow-600' : 'bg-green-600'
                }`}>
                  {activeThreats.filter(t => t.status === 'active').length} Active Threats
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="relative h-72 bg-gradient-to-b from-gray-900 to-black overflow-hidden">
                {/* Grid overlay */}
                <div 
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: `
                      linear-gradient(rgba(0, 255, 255, 0.3) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(0, 255, 255, 0.3) 1px, transparent 1px)
                    `,
                    backgroundSize: '40px 40px'
                  }}
                ></div>

                {/* Threat visualization */}
                {activeThreats.map(threat => {
                  const pulseIntensity = threat.severity === 'critical' ? 2 : 
                                        threat.severity === 'high' ? 1.5 : 
                                        threat.severity === 'medium' ? 1 : 0.5;

                  return (
                    <div
                      key={threat.id}
                      className={`absolute cursor-pointer transform transition-all duration-500 ${
                        selectedThreat?.id === threat.id ? 'scale-150 z-10' : 'hover:scale-125'
                      }`}
                      style={{
                        left: threat.location.x * 0.8,
                        top: threat.location.y * 0.6,
                      }}
                      onClick={() => setSelectedThreat(threat)}
                    >
                      {/* Threat pulse effect */}
                      <div 
                        className="absolute inset-0 rounded-full animate-ping"
                        style={{
                          width: '40px',
                          height: '40px',
                          backgroundColor: getThreatColor(threat),
                          animationDuration: `${2 / pulseIntensity}s`
                        }}
                      ></div>
                      
                      {/* Threat marker */}
                      <div 
                        className="relative w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                        style={{ backgroundColor: getThreatColor(threat) }}
                      >
                        {getThreatIcon(threat.type)}
                      </div>

                      {/* Threat info tooltip */}
                      {selectedThreat?.id === threat.id && (
                        <div className="absolute top-8 left-0 bg-surface/95 border border-cyan-500 rounded-lg p-3 min-w-64 z-20">
                          <div className="text-sm space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="font-semibold text-cyan-300">{threat.type.toUpperCase()}</span>
                              <Badge className={`${
                                threat.severity === 'critical' ? 'bg-red-600' :
                                threat.severity === 'high' ? 'bg-orange-600' :
                                threat.severity === 'medium' ? 'bg-yellow-600' : 'bg-green-600'
                              }`}>
                                {threat.severity}
                              </Badge>
                            </div>
                            <div className="text-gray-300">
                              <div><strong>Source:</strong> {threat.source}</div>
                              <div><strong>Target:</strong> {threat.target}</div>
                              <div><strong>Impact:</strong> {threat.impact}</div>
                              <div><strong>Status:</strong> <span className="text-cyan-400">{threat.status}</span></div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}

                {/* Scanning beam effect */}
                <div className="absolute inset-0">
                  <div className="w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse"></div>
                  <div 
                    className="w-1 h-full bg-gradient-to-b from-transparent via-cyan-400 to-transparent animate-pulse"
                    style={{ animationDelay: '0.5s' }}
                  ></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* System Status Panel */}
        <div className="space-y-4">
          <Card className="bg-surface border-cyan-500/30 cyber-glow">
            <CardHeader className="pb-2">
              <CardTitle className="text-cyan-300 flex items-center text-lg">
                <Activity className="w-5 h-5 mr-2" />
                System Metrics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {systemMetrics.map(metric => (
                <div key={metric.id} className="flex justify-between items-center p-2 bg-surface-light/30 rounded">
                  <div>
                    <div className="text-sm text-gray-300">{metric.name}</div>
                    <div className={`text-lg font-bold ${getMetricColor(metric.status)}`}>
                      {metric.value}{metric.unit}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-xs ${
                      metric.trend === 'up' ? 'text-red-400' :
                      metric.trend === 'down' ? 'text-green-400' : 'text-gray-400'
                    }`}>
                      {metric.trend === 'up' ? '↗️' : metric.trend === 'down' ? '↘️' : '→'}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-surface border-cyan-500/30 cyber-glow">
            <CardHeader className="pb-2">
              <CardTitle className="text-cyan-300 flex items-center text-lg">
                <Shield className="w-5 h-5 mr-2" />
                Defense Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { name: 'AI Detection', status: 'Active', color: 'text-green-400' },
                { name: 'Firewall', status: 'Protected', color: 'text-green-400' },
                { name: 'Intrusion Prevention', status: 'Armed', color: 'text-cyan-400' },
                { name: 'Threat Intelligence', status: 'Updated', color: 'text-green-400' }
              ].map(defense => (
                <div key={defense.name} className="flex justify-between items-center p-2 bg-surface-light/30 rounded">
                  <span className="text-sm text-gray-300">{defense.name}</span>
                  <Badge className={`bg-transparent border ${
                    defense.color === 'text-green-400' ? 'border-green-500 text-green-400' :
                    'border-cyan-500 text-cyan-400'
                  }`}>
                    {defense.status}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Alert Stream */}
      <Card className="bg-surface border-yellow-500/30 cyber-glow">
        <CardHeader className="pb-2">
          <CardTitle className="text-yellow-300 flex items-center">
            <AlertTriangle className="w-5 h-5 mr-2" />
            Live Alert Stream
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {activeThreats.slice(0, 5).map(threat => (
              <div key={threat.id} className="flex justify-between items-center text-sm p-2 bg-surface-light/30 rounded">
                <div className="flex items-center space-x-3">
                  <span>{getThreatIcon(threat.type)}</span>
                  <span className="text-gray-300">{threat.impact} from {threat.source}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={`${
                    threat.severity === 'critical' ? 'bg-red-600' :
                    threat.severity === 'high' ? 'bg-orange-600' :
                    threat.severity === 'medium' ? 'bg-yellow-600' : 'bg-green-600'
                  }`}>
                    {threat.severity}
                  </Badge>
                  <span className="text-xs text-gray-500">
                    {Math.floor((Date.now() - threat.timestamp) / 1000)}s ago
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}