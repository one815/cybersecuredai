import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Bell, 
  AlertTriangle, 
  Shield, 
  Eye, 
  Check, 
  X, 
  Filter,
  SortDesc,
  Clock,
  Zap,
  Skull,
  Bug,
  Lock,
  Activity
} from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import type { ThreatNotification } from "@shared/schema";

// Icon mappings for severity and category
const getSeverityIcon = (severity: string) => {
  switch (severity.toLowerCase()) {
    case "critical": return <AlertTriangle className="w-4 h-4" />;
    case "high": return <Zap className="w-4 h-4" />;
    case "medium": return <Clock className="w-4 h-4" />;
    case "low": return <Eye className="w-4 h-4" />;
    default: return <Bell className="w-4 h-4" />;
  }
};

const getCategoryIcon = (category: string) => {
  switch (category.toLowerCase()) {
    case "malware": return <Bug className="w-4 h-4" />;
    case "phishing": return <Skull className="w-4 h-4" />;
    case "breach": return <Lock className="w-4 h-4" />;
    case "anomaly": return <Activity className="w-4 h-4" />;
    case "system": return <Shield className="w-4 h-4" />;
    default: return <Shield className="w-4 h-4" />;
  }
};

const getSeverityColor = (severity: string) => {
  switch (severity.toLowerCase()) {
    case "critical": return "bg-red-600/20 text-red-400 border-red-500/30";
    case "high": return "bg-orange-600/20 text-orange-400 border-orange-500/30";
    case "medium": return "bg-yellow-600/20 text-yellow-400 border-yellow-500/30";
    case "low": return "bg-blue-600/20 text-blue-400 border-blue-500/30";
    default: return "bg-gray-600/20 text-gray-400 border-gray-500/30";
  }
};

const getPriorityIcon = (priority: number) => {
  switch (priority) {
    case 1: return <Zap className="w-4 h-4 text-red-500" />;
    case 2: return <AlertTriangle className="w-4 h-4 text-orange-500" />;
    case 3: return <Clock className="w-4 h-4 text-yellow-500" />;
    case 4: return <Eye className="w-4 h-4 text-blue-500" />;
    default: return <Bell className="w-4 h-4 text-gray-500" />;
  }
};

export function ThreatNotificationCenter() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [filterSeverity, setFilterSeverity] = useState<string>("all");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [showOnlyUnread, setShowOnlyUnread] = useState(false);
  const queryClient = useQueryClient();

  const { data: notifications = [], isLoading } = useQuery<ThreatNotification[]>({
    queryKey: ["/api/threat-notifications"],
    refetchInterval: 30000, // Refetch every 30 seconds for real-time updates
  });

  const markAsReadMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest(`/api/threat-notifications/${id}/read`, { method: "PUT" });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/threat-notifications"] });
    },
  });

  const acknowledgeMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest(`/api/threat-notifications/${id}/acknowledge`, { method: "PUT" });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/threat-notifications"] });
    },
  });

  const dismissMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest(`/api/threat-notifications/${id}`, { method: "DELETE" });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/threat-notifications"] });
    },
  });

  // Filter and sort notifications
  const filteredNotifications = notifications
    .filter(notification => {
      if (filterSeverity !== "all" && notification.severity !== filterSeverity) return false;
      if (filterCategory !== "all" && notification.category !== filterCategory) return false;
      if (showOnlyUnread && notification.isRead) return false;
      return true;
    })
    .sort((a, b) => {
      // Sort by priority first, then by created date
      const aPriority = a.priority ?? 3;
      const bPriority = b.priority ?? 3;
      if (aPriority !== bPriority) {
        return aPriority - bPriority;
      }
      const aDate = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const bDate = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return bDate - aDate;
    });

  const unreadCount = notifications.filter(n => !n.isRead).length;
  const criticalCount = notifications.filter(n => n.severity === "critical" && !n.isRead).length;

  const handleNotificationClick = (notification: ThreatNotification) => {
    if (!notification.isRead) {
      markAsReadMutation.mutate(notification.id);
    }
  };

  if (!isExpanded) {
    return (
      <div className="fixed top-4 right-4 z-50">
        <Button
          onClick={() => setIsExpanded(true)}
          className="relative bg-surface/90 backdrop-blur-md border border-surface-light hover:bg-surface text-white"
          data-testid="threat-notification-button"
        >
          <div className="flex items-center space-x-2">
            <Bell className="w-5 h-5" />
            <span className="font-medium">Threat Alerts</span>
            {unreadCount > 0 && (
              <Badge className="bg-red-600 text-white text-xs px-2 py-1 min-w-[1.5rem] h-6 rounded-full">
                {unreadCount > 99 ? "99+" : unreadCount}
              </Badge>
            )}
          </div>
          {criticalCount > 0 && (
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
          )}
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed top-4 right-4 w-96 max-h-[80vh] z-50">
      <Card className="bg-surface/95 backdrop-blur-md border border-surface-light cyber-glow">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-bold text-white flex items-center space-x-2">
              <Bell className="w-5 h-5 text-cyan-400" />
              <span>Threat Alert Center</span>
              {unreadCount > 0 && (
                <Badge className="bg-red-600 text-white text-xs">
                  {unreadCount}
                </Badge>
              )}
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(false)}
              className="text-gray-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-4 gap-2 mt-3">
            <div className="bg-red-600/20 rounded-lg p-2 text-center">
              <div className="text-red-400 font-bold text-sm">
                {notifications.filter(n => n.severity === "critical").length}
              </div>
              <div className="text-xs text-red-300">🚨 Critical</div>
            </div>
            <div className="bg-orange-600/20 rounded-lg p-2 text-center">
              <div className="text-orange-400 font-bold text-sm">
                {notifications.filter(n => n.severity === "high").length}
              </div>
              <div className="text-xs text-orange-300">⚠️ High</div>
            </div>
            <div className="bg-yellow-600/20 rounded-lg p-2 text-center">
              <div className="text-yellow-400 font-bold text-sm">
                {notifications.filter(n => n.actionRequired).length}
              </div>
              <div className="text-xs text-yellow-300">⚡ Action</div>
            </div>
            <div className="bg-blue-600/20 rounded-lg p-2 text-center">
              <div className="text-blue-400 font-bold text-sm">
                {notifications.filter(n => !n.isAcknowledged).length}
              </div>
              <div className="text-xs text-blue-300">👁️ Pending</div>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-surface-light">
              <TabsTrigger value="all" className="text-xs">
                All ({notifications.length})
              </TabsTrigger>
              <TabsTrigger value="unread" className="text-xs">
                Unread ({unreadCount})
              </TabsTrigger>
              <TabsTrigger value="critical" className="text-xs">
                🚨 Critical ({criticalCount})
              </TabsTrigger>
            </TabsList>

            {/* Filters */}
            <div className="flex items-center space-x-2 mt-3 mb-3">
              <select
                value={filterSeverity}
                onChange={(e) => setFilterSeverity(e.target.value)}
                className="bg-surface border border-surface-light rounded px-2 py-1 text-xs text-white"
              >
                <option value="all">All Severities</option>
                <option value="critical">🚨 Critical</option>
                <option value="high">⚠️ High</option>
                <option value="medium">🟡 Medium</option>
                <option value="low">🔵 Low</option>
              </select>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="bg-surface border border-surface-light rounded px-2 py-1 text-xs text-white"
              >
                <option value="all">All Types</option>
                <option value="malware">🦠 Malware</option>
                <option value="phishing">🎣 Phishing</option>
                <option value="breach">🔓 Breach</option>
                <option value="anomaly">🔍 Anomaly</option>
                <option value="system">⚙️ System</option>
              </select>
            </div>

            <TabsContent value="all" className="mt-0">
              <ScrollArea className="h-[400px]">
                <div className="space-y-2">
                  {isLoading ? (
                    <div className="text-center text-gray-400 py-8">
                      Loading notifications...
                    </div>
                  ) : filteredNotifications.length === 0 ? (
                    <div className="text-center text-gray-400 py-8">
                      <Shield className="w-8 h-8 mx-auto mb-2" />
                      <p>No threat notifications</p>
                      <p className="text-xs">Your systems are secure</p>
                    </div>
                  ) : (
                    filteredNotifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-3 rounded-lg border cursor-pointer transition-all hover:bg-surface/50 ${
                          getSeverityColor(notification.severity)
                        } ${!notification.isRead ? "bg-opacity-100" : "bg-opacity-50"}`}
                        onClick={() => handleNotificationClick(notification)}
                        data-testid={`notification-${notification.id}`}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <span className="text-lg">
                              {getSeverityIcon(notification.severity)}
                            </span>
                            <span className="text-sm">
                              {getCategoryIcon(notification.category)}
                            </span>
                            {getPriorityIcon(notification.priority ?? 3)}
                            {!notification.isRead && (
                              <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                            )}
                          </div>
                          <div className="text-xs text-gray-400">
                            {notification.createdAt ? new Date(notification.createdAt).toLocaleTimeString() : 'Unknown'}
                          </div>
                        </div>

                        <h4 className="font-semibold text-sm text-white mb-1">
                          {notification.title}
                        </h4>
                        <p className="text-xs text-gray-300 mb-2 line-clamp-2">
                          {notification.message}
                        </p>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-1">
                            <Badge
                              variant="outline"
                              className={`text-xs px-2 py-0 ${getSeverityColor(notification.severity)}`}
                            >
                              {notification.severity.toUpperCase()}
                            </Badge>
                            {notification.actionRequired && (
                              <Badge variant="outline" className="text-xs px-2 py-0 bg-yellow-600/20 text-yellow-400 border-yellow-500/30">
                                ACTION REQUIRED
                              </Badge>
                            )}
                          </div>
                          <div className="flex space-x-1">
                            {!notification.isAcknowledged && (
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-6 px-2 text-xs text-green-400 hover:bg-green-600/20"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  acknowledgeMutation.mutate(notification.id);
                                }}
                                data-testid={`acknowledge-${notification.id}`}
                              >
                                <Check className="w-3 h-3" />
                              </Button>
                            )}
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-6 px-2 text-xs text-red-400 hover:bg-red-600/20"
                              onClick={(e) => {
                                e.stopPropagation();
                                dismissMutation.mutate(notification.id);
                              }}
                              data-testid={`dismiss-${notification.id}`}
                            >
                              <X className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="unread" className="mt-0">
              <ScrollArea className="h-[400px]">
                <div className="space-y-2">
                  {filteredNotifications
                    .filter(n => !n.isRead)
                    .map((notification) => (
                      <div key={notification.id} className="p-3 rounded-lg border bg-surface/80">
                        {/* Same notification structure as above */}
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <span className="text-lg">
                              {getSeverityIcon(notification.severity)}
                            </span>
                            <span className="text-sm">
                              {getCategoryIcon(notification.category)}
                            </span>
                            {getPriorityIcon(notification.priority ?? 3)}
                            <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                          </div>
                          <div className="text-xs text-gray-400">
                            {notification.createdAt ? new Date(notification.createdAt).toLocaleTimeString() : 'Unknown'}
                          </div>
                        </div>
                        <h4 className="font-semibold text-sm text-white mb-1">
                          {notification.title}
                        </h4>
                        <p className="text-xs text-gray-300 mb-2">
                          {notification.message}
                        </p>
                      </div>
                    ))}
                  {filteredNotifications.filter(n => !n.isRead).length === 0 && (
                    <div className="text-center text-gray-400 py-8">
                      <Eye className="w-8 h-8 mx-auto mb-2" />
                      <p>All notifications read</p>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="critical" className="mt-0">
              <ScrollArea className="h-[400px]">
                <div className="space-y-2">
                  {filteredNotifications
                    .filter(n => n.severity === "critical")
                    .map((notification) => (
                      <div key={notification.id} className="p-3 rounded-lg border bg-red-600/20 border-red-500/30">
                        {/* Critical notification structure */}
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <span className="text-lg animate-pulse">🚨</span>
                            <span className="text-sm">
                              {getCategoryIcon(notification.category)}
                            </span>
                            <Zap className="w-4 h-4 text-red-500" />
                          </div>
                          <div className="text-xs text-gray-400">
                            {notification.createdAt ? new Date(notification.createdAt).toLocaleTimeString() : 'Unknown'}
                          </div>
                        </div>
                        <h4 className="font-semibold text-sm text-red-300 mb-1">
                          {notification.title}
                        </h4>
                        <p className="text-xs text-gray-300 mb-2">
                          {notification.message}
                        </p>
                        {notification.actionRequired && (
                          <div className="bg-yellow-600/20 border border-yellow-500/30 rounded p-2 mt-2">
                            <p className="text-xs text-yellow-300 font-medium">
                              ⚡ IMMEDIATE ACTION REQUIRED
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  {filteredNotifications.filter(n => n.severity === "critical").length === 0 && (
                    <div className="text-center text-gray-400 py-8">
                      <Shield className="w-8 h-8 mx-auto mb-2 text-green-400" />
                      <p>No critical threats</p>
                      <p className="text-xs">System status: Secure</p>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}