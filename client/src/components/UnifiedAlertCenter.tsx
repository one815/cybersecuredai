/**
 * Unified Alert Center Component
 * 
 * Centralizes all alerts and notifications from the four revolutionary cybersecurity systems:
 * - CyDEF genetic algorithm alerts and autonomous response notifications
 * - Live Location geofence breaches and device status alerts  
 * - CypherHUM visualization anomalies and AI interaction alerts
 * - ACDS drone swarm emergency alerts and mission status updates
 */

import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { 
  Bell,
  AlertTriangle,
  AlertCircle,
  Info,
  CheckCircle2,
  XCircle,
  Brain,
  MapPin,
  Eye,
  Drone,
  Clock,
  Filter,
  MoreHorizontal,
  X,
  Volume2,
  VolumeX
} from 'lucide-react';

interface UnifiedAlert {
  id: string;
  sourceSystem: 'cydef' | 'live-location' | 'cypherhum' | 'acds';
  alertType: string;
  severity: 'info' | 'warning' | 'critical' | 'emergency';
  status: 'active' | 'acknowledged' | 'resolved' | 'dismissed';
  title: string;
  message: string;
  timestamp: string;
  metadata: any;
  acknowledgedBy?: string;
  acknowledgedAt?: string;
  resolvedAt?: string;
  relatedAlerts?: string[];
  actionRequired: boolean;
  autoResolvable: boolean;
}

interface AlertStats {
  total: number;
  active: number;
  critical: number;
  emergency: number;
  bySeverity: Record<string, number>;
  bySystem: Record<string, number>;
  acknowledgedToday: number;
  resolvedToday: number;
}

export default function UnifiedAlertCenter() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'active' | 'critical' | 'emergency'>('all');
  const [selectedSystem, setSelectedSystem] = useState<'all' | 'cydef' | 'live-location' | 'cypherhum' | 'acds'>('all');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [expandedAlert, setExpandedAlert] = useState<string | null>(null);

  // Fetch unified alerts
  const { data: alerts, isLoading } = useQuery<UnifiedAlert[]>({
    queryKey: ['/api/unified/alerts', selectedFilter, selectedSystem],
    refetchInterval: 2000, // Real-time updates every 2 seconds
  });

  // Fetch alert statistics
  const { data: alertStats } = useQuery<AlertStats>({
    queryKey: ['/api/unified/alert-stats'],
    refetchInterval: 5000,
  });

  // Acknowledge alert mutation
  const acknowledgeAlertMutation = useMutation({
    mutationFn: async (alertId: string) => {
      return apiRequest(`/api/unified/alerts/${alertId}/acknowledge`, {
        method: 'POST',
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/unified/alerts'] });
      queryClient.invalidateQueries({ queryKey: ['/api/unified/alert-stats'] });
      toast({
        title: "Alert Acknowledged",
        description: "Alert has been marked as acknowledged",
      });
    },
  });

  // Resolve alert mutation
  const resolveAlertMutation = useMutation({
    mutationFn: async (alertId: string) => {
      return apiRequest(`/api/unified/alerts/${alertId}/resolve`, {
        method: 'POST',
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/unified/alerts'] });
      queryClient.invalidateQueries({ queryKey: ['/api/unified/alert-stats'] });
      toast({
        title: "Alert Resolved",
        description: "Alert has been marked as resolved",
      });
    },
  });

  // Dismiss alert mutation
  const dismissAlertMutation = useMutation({
    mutationFn: async (alertId: string) => {
      return apiRequest(`/api/unified/alerts/${alertId}/dismiss`, {
        method: 'POST',
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/unified/alerts'] });
      queryClient.invalidateQueries({ queryKey: ['/api/unified/alert-stats'] });
      toast({
        title: "Alert Dismissed",
        description: "Alert has been dismissed",
      });
    },
  });

  // Auto-resolve eligible alerts mutation
  const autoResolveAlertsMutation = useMutation({
    mutationFn: async () => {
      return apiRequest('/api/unified/alerts/auto-resolve', {
        method: 'POST',
      });
    },
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: ['/api/unified/alerts'] });
      queryClient.invalidateQueries({ queryKey: ['/api/unified/alert-stats'] });
      toast({
        title: "Auto-Resolution Complete",
        description: `${data.resolved} alerts automatically resolved`,
      });
    },
  });

  // WebSocket for real-time alert updates
  useEffect(() => {
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsUrl = `${protocol}//${window.location.host}/ws/unified-alerts`;
    
    try {
      const ws = new WebSocket(wsUrl);
      
      ws.onmessage = (event) => {
        const alertData = JSON.parse(event.data);
        
        if (alertData.type === 'new_alert') {
          // Play sound notification if enabled
          if (soundEnabled && (alertData.severity === 'critical' || alertData.severity === 'emergency')) {
            // In a real implementation, you'd play an audio file
            console.log('🔊 Alert sound notification');
          }
          
          // Show toast notification
          toast({
            title: `${alertData.sourceSystem.toUpperCase()} Alert`,
            description: alertData.title,
            variant: alertData.severity === 'critical' || alertData.severity === 'emergency' ? 'destructive' : 'default',
          });
          
          // Refresh alerts
          queryClient.invalidateQueries({ queryKey: ['/api/unified/alerts'] });
          queryClient.invalidateQueries({ queryKey: ['/api/unified/alert-stats'] });
        }
      };
      
      return () => ws.close();
    } catch (error) {
      console.error('Failed to connect to unified alerts WebSocket:', error);
    }
  }, [soundEnabled, toast, queryClient]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'emergency': return 'text-red-600 bg-red-900/30 border-red-500';
      case 'critical': return 'text-red-400 bg-red-900/20 border-red-500/50';
      case 'warning': return 'text-yellow-400 bg-yellow-900/20 border-yellow-500/50';
      case 'info': return 'text-blue-400 bg-blue-900/20 border-blue-500/50';
      default: return 'text-gray-400 bg-gray-900/20 border-gray-500/50';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'emergency': return <AlertCircle className="w-4 h-4 text-red-600" />;
      case 'critical': return <AlertTriangle className="w-4 h-4 text-red-400" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-yellow-400" />;
      case 'info': return <Info className="w-4 h-4 text-blue-400" />;
      default: return <Bell className="w-4 h-4 text-gray-400" />;
    }
  };

  const getSystemIcon = (system: string) => {
    switch (system) {
      case 'cydef': return <Brain className="w-4 h-4 text-purple-400" />;
      case 'live-location': return <MapPin className="w-4 h-4 text-blue-400" />;
      case 'cypherhum': return <Eye className="w-4 h-4 text-green-400" />;
      case 'acds': return <Drone className="w-4 h-4 text-orange-400" />;
      default: return <Bell className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'resolved': return <CheckCircle2 className="w-3 h-3 text-green-400" />;
      case 'acknowledged': return <Clock className="w-3 h-3 text-yellow-400" />;
      case 'dismissed': return <X className="w-3 h-3 text-gray-400" />;
      default: return <AlertCircle className="w-3 h-3 text-red-400" />;
    }
  };

  const filteredAlerts = alerts?.filter(alert => {
    if (selectedFilter !== 'all') {
      if (selectedFilter === 'active' && alert.status !== 'active') return false;
      if (selectedFilter === 'critical' && alert.severity !== 'critical') return false;
      if (selectedFilter === 'emergency' && alert.severity !== 'emergency') return false;
    }
    if (selectedSystem !== 'all' && alert.sourceSystem !== selectedSystem) return false;
    return true;
  }) || [];

  return (
    <Card className="bg-black/50 border-gray-700 backdrop-blur-sm" data-testid="unified-alert-center">
      <CardHeader>
        <CardTitle className="text-white flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Bell className="w-5 h-5 text-cyan-400" />
            <span>Unified Alert Center</span>
            {alertStats && alertStats.active > 0 && (
              <Badge variant="destructive" className="ml-2">
                {alertStats.active} Active
              </Badge>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="text-gray-400 hover:text-white"
              data-testid="button-toggle-sound"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => autoResolveAlertsMutation.mutate()}
              disabled={autoResolveAlertsMutation.isPending}
              className="text-cyan-400 border-cyan-500/30 hover:bg-cyan-500/10"
              data-testid="button-auto-resolve"
            >
              Auto-Resolve
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Alert Statistics */}
        {alertStats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{alertStats.total}</div>
              <div className="text-xs text-gray-400">Total Alerts</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-400">{alertStats.active}</div>
              <div className="text-xs text-gray-400">Active</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400">{alertStats.critical}</div>
              <div className="text-xs text-gray-400">Critical</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{alertStats.emergency}</div>
              <div className="text-xs text-gray-400">Emergency</div>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-400">Filter by:</span>
          </div>
          <select
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value as any)}
            className="bg-gray-800 border border-gray-600 rounded px-2 py-1 text-sm text-white"
            data-testid="select-severity-filter"
          >
            <option value="all">All Severities</option>
            <option value="active">Active Only</option>
            <option value="critical">Critical Only</option>
            <option value="emergency">Emergency Only</option>
          </select>
          <select
            value={selectedSystem}
            onChange={(e) => setSelectedSystem(e.target.value as any)}
            className="bg-gray-800 border border-gray-600 rounded px-2 py-1 text-sm text-white"
            data-testid="select-system-filter"
          >
            <option value="all">All Systems</option>
            <option value="cydef">CyDEF Only</option>
            <option value="live-location">Live Location Only</option>
            <option value="cypherhum">CypherHUM Only</option>
            <option value="acds">ACDS Only</option>
          </select>
        </div>

        {/* Alerts List */}
        <ScrollArea className="h-96">
          {isLoading ? (
            <div className="animate-pulse space-y-4">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="h-16 bg-gray-800 rounded"></div>
              ))}
            </div>
          ) : filteredAlerts.length === 0 ? (
            <div className="text-center py-8">
              <CheckCircle2 className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <p className="text-gray-400">No alerts match the current filters</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredAlerts.map((alert) => (
                <div 
                  key={alert.id}
                  className={`bg-gray-900/50 border rounded-lg p-4 transition-all duration-200 ${
                    alert.severity === 'emergency' ? 'border-red-500 shadow-red-500/20 shadow-lg' :
                    alert.severity === 'critical' ? 'border-red-500/50' :
                    alert.severity === 'warning' ? 'border-yellow-500/50' :
                    'border-gray-700'
                  }`}
                  data-testid={`alert-${alert.id}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 flex-1">
                      <div className="flex items-center space-x-1 mt-0.5">
                        {getSystemIcon(alert.sourceSystem)}
                        {getSeverityIcon(alert.severity)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="font-medium text-white">{alert.title}</h4>
                          <Badge variant="outline" className={getSeverityColor(alert.severity)}>
                            {alert.severity.toUpperCase()}
                          </Badge>
                          <div className="flex items-center space-x-1">
                            {getStatusIcon(alert.status)}
                            <span className="text-xs text-gray-400">{alert.status}</span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-300 mb-2">{alert.message}</p>
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <span>{alert.sourceSystem.toUpperCase()}</span>
                          <span>{new Date(alert.timestamp).toLocaleString()}</span>
                          {alert.actionRequired && (
                            <Badge variant="outline" className="text-yellow-400 border-yellow-500/30">
                              Action Required
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      {alert.status === 'active' && (
                        <>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => acknowledgeAlertMutation.mutate(alert.id)}
                            disabled={acknowledgeAlertMutation.isPending}
                            className="text-yellow-400 hover:text-yellow-300"
                            data-testid={`button-acknowledge-${alert.id}`}
                          >
                            <Clock className="w-3 h-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => resolveAlertMutation.mutate(alert.id)}
                            disabled={resolveAlertMutation.isPending}
                            className="text-green-400 hover:text-green-300"
                            data-testid={`button-resolve-${alert.id}`}
                          >
                            <CheckCircle2 className="w-3 h-3" />
                          </Button>
                        </>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => dismissAlertMutation.mutate(alert.id)}
                        disabled={dismissAlertMutation.isPending}
                        className="text-gray-400 hover:text-gray-300"
                        data-testid={`button-dismiss-${alert.id}`}
                      >
                        <X className="w-3 h-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setExpandedAlert(expandedAlert === alert.id ? null : alert.id)}
                        className="text-gray-400 hover:text-gray-300"
                        data-testid={`button-expand-${alert.id}`}
                      >
                        <MoreHorizontal className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>

                  {/* Expanded Alert Details */}
                  {expandedAlert === alert.id && (
                    <div className="mt-4 pt-4 border-t border-gray-700">
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="text-gray-400 mb-1">Alert Type:</div>
                          <div className="text-white">{alert.alertType}</div>
                        </div>
                        <div>
                          <div className="text-gray-400 mb-1">Auto-Resolvable:</div>
                          <div className="text-white">{alert.autoResolvable ? 'Yes' : 'No'}</div>
                        </div>
                        {alert.acknowledgedBy && (
                          <div>
                            <div className="text-gray-400 mb-1">Acknowledged By:</div>
                            <div className="text-white">{alert.acknowledgedBy}</div>
                          </div>
                        )}
                        {alert.acknowledgedAt && (
                          <div>
                            <div className="text-gray-400 mb-1">Acknowledged At:</div>
                            <div className="text-white">{new Date(alert.acknowledgedAt).toLocaleString()}</div>
                          </div>
                        )}
                        {alert.relatedAlerts && alert.relatedAlerts.length > 0 && (
                          <div className="md:col-span-2">
                            <div className="text-gray-400 mb-1">Related Alerts:</div>
                            <div className="text-white">{alert.relatedAlerts.join(', ')}</div>
                          </div>
                        )}
                        {alert.metadata && (
                          <div className="md:col-span-2">
                            <div className="text-gray-400 mb-1">Additional Details:</div>
                            <pre className="text-xs text-gray-300 bg-gray-800 p-2 rounded overflow-x-auto">
                              {JSON.stringify(alert.metadata, null, 2)}
                            </pre>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}