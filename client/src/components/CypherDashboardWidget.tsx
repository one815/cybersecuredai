import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Bot, 
  Activity, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  TrendingUp,
  Shield,
  Zap,
  Eye,
  MessageSquare,
  Minimize2,
  Maximize2,
  Settings
} from "lucide-react";

interface CypherReport {
  id: string;
  type: 'daily' | 'issue' | 'alert' | 'status';
  title: string;
  message: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  timestamp: string;
  data?: any;
}

interface CypherDashboardWidgetProps {
  enabled?: boolean;
  compact?: boolean;
}

export default function CypherDashboardWidget({ enabled = true, compact = false }: CypherDashboardWidgetProps) {
  const [isMinimized, setIsMinimized] = useState(compact);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  // Fetch Cypher reports
  const { data: cypherReports = [], isLoading } = useQuery<CypherReport[]>({
    queryKey: ["/api/cypher/reports"],
    enabled: enabled,
    refetchInterval: 30000, // Refresh every 30 seconds
    staleTime: 20000,
  });

  // Fetch daily recommendations
  const { data: dailyRecommendations } = useQuery({
    queryKey: ["/api/cypher/daily-recommendations/admin-1"],
    enabled: enabled,
    refetchInterval: 60000, // Refresh every minute
    staleTime: 30000,
  });

  // Fetch system status for live updates
  const { data: systemStatus } = useQuery({
    queryKey: ["/api/cypher/system-status"],
    enabled: enabled,
    refetchInterval: 10000, // Refresh every 10 seconds
    staleTime: 5000,
  });

  if (!enabled) {
    return null;
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'bg-green-500';
      case 'medium': return 'bg-yellow-500';
      case 'high': return 'bg-orange-500';
      case 'critical': return 'bg-red-500';
      default: return 'bg-blue-500';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'low': return <CheckCircle className="w-3 h-3" />;
      case 'medium': return <Clock className="w-3 h-3" />;
      case 'high': return <AlertTriangle className="w-3 h-3" />;
      case 'critical': return <Shield className="w-3 h-3" />;
      default: return <Activity className="w-3 h-3" />;
    }
  };

  return (
    <Card className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 border-blue-700/50 backdrop-blur-sm" data-testid="cypher-dashboard-widget">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
              <Bot className="w-4 h-4 text-white animate-pulse" />
            </div>
            <div>
              <CardTitle className="text-white text-lg flex items-center space-x-2">
                <span>CYPHER AI</span>
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              </CardTitle>
              <div className="text-xs text-gray-400 font-mono">
                System Analysis • {currentTime.toLocaleTimeString()}
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 text-gray-400 hover:text-white"
              data-testid="button-cypher-settings"
            >
              <Settings className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMinimized(!isMinimized)}
              className="h-8 w-8 p-0 text-gray-400 hover:text-white"
              data-testid="button-toggle-cypher"
            >
              {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
            </Button>
          </div>
        </div>
      </CardHeader>
      
      {!isMinimized && (
        <CardContent>
          {/* Quick System Status */}
          <div className="mb-4 p-3 bg-gray-800/50 rounded-lg border border-gray-700/50">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-blue-300">System Status</span>
              <Badge className="bg-green-500 text-white text-xs">
                <Activity className="w-3 h-3 mr-1" />
                Online
              </Badge>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Threat Level:</span>
                <span className="text-green-400 font-medium">
                  {systemStatus?.threatLevel || 'LOW'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Active Alerts:</span>
                <span className="text-yellow-400 font-medium">
                  {systemStatus?.activeAlerts || 0}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">System Health:</span>
                <span className="text-green-400 font-medium">
                  {systemStatus?.systemHealth || '98%'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Uptime:</span>
                <span className="text-blue-400 font-medium">
                  {systemStatus?.uptime || '99.9%'}
                </span>
              </div>
            </div>
          </div>

          {/* Daily Security Recommendations */}
          {dailyRecommendations && (
            <div className="mb-4 p-3 bg-gradient-to-r from-cyan-900/20 to-blue-900/20 rounded-lg border border-cyan-700/50">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-cyan-300 flex items-center space-x-2">
                  <Zap className="w-4 h-4 text-cyan-400" />
                  <span>Daily Security Recommendations</span>
                </span>
                <Badge className="bg-cyan-900/50 text-cyan-400 border-cyan-700 text-xs">
                  Today
                </Badge>
              </div>
              <p className="text-xs text-gray-300 mb-3 leading-relaxed">{dailyRecommendations.message}</p>
              <div className="flex flex-wrap gap-2">
                {dailyRecommendations.actions?.slice(0, 3).map((action: any, index: number) => (
                  <Button
                    key={index}
                    size="sm"
                    variant="outline"
                    className="text-xs border-cyan-600 text-cyan-400 hover:bg-cyan-900/50 h-6 px-2"
                    onClick={() => {
                      if (action.action === "run_security_scan") {
                        fetch('/api/security/run-scan', { method: 'POST' });
                        toast({ title: "Security Scan", description: "Comprehensive security scan initiated." });
                      } else if (action.action === "open_threat_dashboard") {
                        window.location.href = '/threats';
                      } else if (action.action === "review_user_activity") {
                        window.location.href = '/user-management';
                      }
                    }}
                  >
                    {action.label}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Reports Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-white flex items-center space-x-2">
                <MessageSquare className="w-4 h-4 text-blue-400" />
                <span>Daily Reports & Issues</span>
              </span>
              {cypherReports.length > 0 && (
                <Badge variant="outline" className="text-xs">
                  {cypherReports.length} updates
                </Badge>
              )}
            </div>
            
            <ScrollArea className="h-64">
              {isLoading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-400"></div>
                </div>
              ) : cypherReports.length > 0 ? (
                <div className="space-y-3 pr-3">
                  {cypherReports.map((report) => (
                    <div
                      key={report.id}
                      className="p-3 bg-gray-800/30 rounded-lg border border-gray-700/50 hover:border-blue-500/50 transition-colors"
                      data-testid={`cypher-report-${report.id}`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <div className={`w-2 h-2 rounded-full ${getSeverityColor(report.severity)}`}></div>
                          <span className="text-sm font-medium text-white">{report.title}</span>
                        </div>
                        <div className="flex items-center space-x-1 text-gray-500">
                          {getSeverityIcon(report.severity)}
                          <span className="text-xs">
                            {new Date(report.timestamp).toLocaleTimeString()}
                          </span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-300 leading-relaxed mb-2">{report.message}</p>
                      {report.data && (
                        <div className="mt-2 p-2 bg-gray-900/50 rounded text-xs">
                          {Object.entries(report.data).map(([key, value]) => (
                            <div key={key} className="flex justify-between">
                              <span className="text-gray-400 capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
                              <span className="text-blue-400 font-medium">{String(value)}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-gray-500">
                  <Eye className="w-8 h-8 mb-2" />
                  <p className="text-sm">No reports available</p>
                  <p className="text-xs">Cypher is monitoring your system</p>
                </div>
              )}
            </ScrollArea>
          </div>
          
          {/* Footer Actions */}
          <div className="mt-4 pt-3 border-t border-gray-700/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-xs text-gray-400">
                <Zap className="w-3 h-3 text-blue-400" />
                <span>AI Analysis Active</span>
              </div>
              <Button
                size="sm"
                variant="outline"
                className="h-7 text-xs"
                onClick={() => window.location.href = '/reports'}
                data-testid="button-cypher-details"
              >
                View All Reports
              </Button>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
}