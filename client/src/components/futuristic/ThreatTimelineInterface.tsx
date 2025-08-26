import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Shield, Zap, Eye, CheckCircle, Clock } from "lucide-react";

interface ThreatEvent {
  id: string;
  timestamp: number;
  type: 'attack' | 'detection' | 'mitigation' | 'resolution';
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  source: string;
  duration: number;
  impact: string[];
}

export function ThreatTimelineInterface() {
  const [currentTime, setCurrentTime] = useState(Date.now());
  const [selectedEvent, setSelectedEvent] = useState<ThreatEvent | null>(null);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);

  const threatEvents: ThreatEvent[] = [
    {
      id: '1',
      timestamp: Date.now() - 300000, // 5 minutes ago
      type: 'attack',
      severity: 'high',
      title: 'DDoS Attack Detected',
      description: 'Massive distributed denial of service attack targeting main servers',
      source: '185.220.101.42',
      duration: 45000,
      impact: ['Network Performance', 'User Access']
    },
    {
      id: '2', 
      timestamp: Date.now() - 240000, // 4 minutes ago
      type: 'detection',
      severity: 'critical',
      title: 'AI System Activated',
      description: 'CyberSecured AI threat detection system initiated emergency protocols',
      source: 'AI Core System',
      duration: 5000,
      impact: ['Automated Response']
    },
    {
      id: '3',
      timestamp: Date.now() - 180000, // 3 minutes ago
      type: 'mitigation',
      severity: 'medium',
      title: 'Traffic Filtering Applied',
      description: 'Automated traffic filtering and rate limiting deployed',
      source: 'Security Layer',
      duration: 30000,
      impact: ['Attack Mitigation']
    },
    {
      id: '4',
      timestamp: Date.now() - 120000, // 2 minutes ago
      type: 'resolution',
      severity: 'low',
      title: 'Threat Neutralized',
      description: 'DDoS attack successfully mitigated, systems restored to normal operation',
      source: 'AI Defense Grid',
      duration: 10000,
      impact: ['Full Recovery']
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000 / playbackSpeed);

    return () => clearInterval(interval);
  }, [playbackSpeed]);

  const getEventColor = (event: ThreatEvent): string => {
    const colors = {
      attack: 'from-red-500 to-red-700',
      detection: 'from-yellow-500 to-orange-600', 
      mitigation: 'from-blue-500 to-blue-700',
      resolution: 'from-green-500 to-green-700'
    };
    return colors[event.type];
  };

  const getEventIcon = (event: ThreatEvent) => {
    const icons = {
      attack: <AlertTriangle className="w-4 h-4" />,
      detection: <Eye className="w-4 h-4" />,
      mitigation: <Shield className="w-4 h-4" />,
      resolution: <CheckCircle className="w-4 h-4" />
    };
    return icons[event.type];
  };

  const getSeverityColor = (severity: string): string => {
    const colors = {
      low: 'border-green-500 text-green-400',
      medium: 'border-yellow-500 text-yellow-400',
      high: 'border-orange-500 text-orange-400',
      critical: 'border-red-500 text-red-400'
    };
    return colors[severity as keyof typeof colors] || colors.low;
  };

  const formatTimeAgo = (timestamp: number): string => {
    const diff = currentTime - timestamp;
    const minutes = Math.floor(diff / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);
    
    if (minutes > 0) {
      return `${minutes}m ${seconds}s ago`;
    }
    return `${seconds}s ago`;
  };

  return (
    <div className="w-full bg-surface rounded-lg border border-cyan-500/30 cyber-glow">
      <div className="p-6">
        {/* Header Controls */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-cyan-300 mb-2">Threat Response Timeline</h2>
            <p className="text-gray-400 text-sm">Real-time visualization of security incidents and AI responses</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-cyan-400" />
              <span className="text-sm text-gray-300">Playback Speed:</span>
              {[0.5, 1, 2, 4].map(speed => (
                <button
                  key={speed}
                  onClick={() => setPlaybackSpeed(speed)}
                  className={`px-2 py-1 text-xs rounded ${
                    playbackSpeed === speed 
                      ? 'bg-cyan-600 text-white' 
                      : 'bg-surface-light text-gray-400 hover:bg-cyan-600/20'
                  }`}
                >
                  {speed}x
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Timeline Visualization */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-400 via-blue-500 to-green-400"></div>

          {/* Timeline Events */}
          <div className="space-y-6">
            {threatEvents.map((event, index) => {
              const isActive = selectedEvent?.id === event.id;
              const progressWidth = Math.min(100, ((currentTime - event.timestamp) / event.duration) * 100);

              return (
                <div
                  key={event.id}
                  className={`relative flex items-start space-x-4 cursor-pointer transition-all duration-300 ${
                    isActive ? 'transform scale-105' : 'hover:transform hover:scale-102'
                  }`}
                  onClick={() => setSelectedEvent(isActive ? null : event)}
                >
                  {/* Timeline Node */}
                  <div className={`relative z-10 w-16 h-16 rounded-full bg-gradient-to-r ${getEventColor(event)} 
                                   flex items-center justify-center border-4 border-surface shadow-2xl
                                   ${isActive ? 'ring-4 ring-cyan-400/50' : ''}`}>
                    {getEventIcon(event)}
                  </div>

                  {/* Event Card */}
                  <Card className={`flex-1 bg-surface-light/50 border transition-all duration-300
                                  ${isActive ? 'border-cyan-400 cyber-glow' : 'border-surface-light hover:border-cyan-500/50'}`}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold text-white mb-1">{event.title}</h3>
                          <p className="text-sm text-gray-400 mb-2">{event.description}</p>
                        </div>
                        <div className="flex space-x-2">
                          <Badge className={`${getSeverityColor(event.severity)} bg-transparent border`}>
                            {event.severity.toUpperCase()}
                          </Badge>
                          <span className="text-xs text-gray-500">{formatTimeAgo(event.timestamp)}</span>
                        </div>
                      </div>

                      {/* Progress Bar for Active Events */}
                      {event.type === 'attack' && progressWidth < 100 && (
                        <div className="mb-3">
                          <div className="flex justify-between text-xs text-gray-400 mb-1">
                            <span>Attack Progress</span>
                            <span>{Math.round(progressWidth)}%</span>
                          </div>
                          <div className="w-full bg-surface rounded-full h-2">
                            <div 
                              className="h-2 bg-gradient-to-r from-red-500 to-red-600 rounded-full transition-all duration-1000"
                              style={{ width: `${progressWidth}%` }}
                            ></div>
                          </div>
                        </div>
                      )}

                      <div className="flex justify-between text-xs">
                        <span className="text-gray-400">Source: <span className="text-cyan-400">{event.source}</span></span>
                        <span className="text-gray-400">Impact: {event.impact.length} systems</span>
                      </div>

                      {/* Expanded Details */}
                      {isActive && (
                        <div className="mt-4 pt-4 border-t border-surface-light">
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-gray-400">Duration:</span>
                              <span className="ml-2 text-cyan-400">{(event.duration / 1000).toFixed(1)}s</span>
                            </div>
                            <div>
                              <span className="text-gray-400">Event ID:</span>
                              <span className="ml-2 text-cyan-400">{event.id}</span>
                            </div>
                          </div>
                          <div className="mt-2">
                            <span className="text-gray-400">Affected Systems:</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {event.impact.map(impact => (
                                <Badge key={impact} variant="outline" className="text-xs border-cyan-500/50 text-cyan-400">
                                  {impact}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>

        {/* Stats Summary */}
        <div className="mt-8 grid grid-cols-4 gap-4">
          {[
            { label: 'Threats Detected', value: '1,247', color: 'text-red-400' },
            { label: 'AI Responses', value: '1,239', color: 'text-blue-400' },
            { label: 'Mitigated', value: '1,235', color: 'text-green-400' },
            { label: 'Response Time', value: '0.8s', color: 'text-cyan-400' }
          ].map(stat => (
            <div key={stat.label} className="text-center p-3 bg-surface-light/30 rounded-lg">
              <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
              <div className="text-xs text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}