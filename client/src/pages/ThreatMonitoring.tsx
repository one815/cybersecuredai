import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Shield, Eye, Filter } from "lucide-react";

export default function ThreatMonitoring() {
  const { data: threats, isLoading } = useQuery({
    queryKey: ["/api/threats"],
  });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical": return "bg-critical text-white";
      case "high": return "bg-orange-500 text-white";
      case "medium": return "bg-interactive text-white";
      case "low": return "bg-success text-white";
      default: return "bg-gray-500 text-white";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "text-critical border-critical";
      case "investigating": return "text-interactive border-interactive";
      case "resolved": return "text-success border-success";
      default: return "text-gray-500 border-gray-500";
    }
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-surface rounded w-1/4"></div>
          <div className="h-32 bg-surface rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <header className="bg-surface border-b border-surface-light p-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Threat Monitoring</h2>
            <p className="text-gray-400">Real-time threat detection and analysis</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" className="border-surface-light" data-testid="filter-threats">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button className="bg-interactive hover:bg-orange-600" data-testid="create-threat">
              <AlertTriangle className="w-4 h-4 mr-2" />
              Report Threat
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        {/* Threat Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-surface glow-border">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-critical/20 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="text-critical" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">0</h3>
                  <p className="text-gray-400 text-sm">Critical Threats</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-surface glow-border">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-interactive/20 rounded-lg flex items-center justify-center">
                  <Eye className="text-interactive" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">0</h3>
                  <p className="text-gray-400 text-sm">Active Monitoring</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-surface glow-border">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-success/20 rounded-lg flex items-center justify-center">
                  <Shield className="text-success" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">0</h3>
                  <p className="text-gray-400 text-sm">Blocked Today</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-surface glow-border">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="text-secondary" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">98.7%</h3>
                  <p className="text-gray-400 text-sm">Detection Rate</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Threat List */}
        <Card className="bg-surface glow-border">
          <CardHeader>
            <CardTitle>Recent Threats</CardTitle>
          </CardHeader>
          <CardContent>
            {!threats || threats.length === 0 ? (
              <div className="text-center py-12">
                <Shield className="w-16 h-16 text-success mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No Active Threats</h3>
                <p className="text-gray-400">Your system is secure. All threats have been successfully blocked or resolved.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {threats.map((threat: any) => (
                  <div key={threat.id} className="flex items-center justify-between p-4 bg-background rounded-lg border border-surface-light">
                    <div className="flex items-center space-x-4">
                      <div className="w-3 h-3 rounded-full bg-critical threat-pulse"></div>
                      <div>
                        <h4 className="font-medium">{threat.type}</h4>
                        <p className="text-gray-400 text-sm">{threat.description}</p>
                        <p className="text-gray-500 text-xs">
                          Detected: {new Date(threat.detectedAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge className={getSeverityColor(threat.severity)}>
                        {threat.severity.toUpperCase()}
                      </Badge>
                      <Badge variant="outline" className={getStatusColor(threat.status)}>
                        {threat.status.toUpperCase()}
                      </Badge>
                      <Button variant="ghost" size="sm" data-testid={`view-threat-${threat.id}`}>
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
