import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  AlertTriangle, 
  Shield, 
  Activity, 
  FileText, 
  Eye, 
  Clock,
  Users,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  XCircle
} from "lucide-react";

interface TheHiveCase {
  _id: string;
  title: string;
  description: string;
  severity: number;
  tlp: number;
  status: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  owner?: string;
}

interface TheHiveAlert {
  _id: string;
  title: string;
  description: string;
  severity: number;
  tlp: number;
  status: string;
  tags: string[];
  type: string;
  source: string;
  sourceRef: string;
  createdAt: string;
  updatedAt: string;
}

interface TheHiveObservable {
  _id: string;
  dataType: string;
  data: string;
  message?: string;
  tlp: number;
  ioc: boolean;
  sighted: boolean;
  tags: string[];
  createdAt: string;
}

interface TheHiveSummary {
  totalCases: number;
  totalAlerts: number;
  totalIOCs: number;
  criticalCases: number;
  highSeverityAlerts: number;
  activeIOCs: number;
  recentActivity: {
    cases: TheHiveCase[];
    alerts: TheHiveAlert[];
  };
}

export function TheHiveIntegration() {
  // Fetch TheHive summary data
  const { data: summary, isLoading: summaryLoading } = useQuery({
    queryKey: ['/api/thehive/summary'],
    refetchInterval: 30000, // Refresh every 30 seconds
  }) as { data: TheHiveSummary | undefined; isLoading: boolean };

  // Fetch recent cases
  const { data: cases, isLoading: casesLoading } = useQuery({
    queryKey: ['/api/thehive/cases'],
    refetchInterval: 30000,
  }) as { data: TheHiveCase[] | undefined; isLoading: boolean };

  // Fetch active alerts
  const { data: alerts, isLoading: alertsLoading } = useQuery({
    queryKey: ['/api/thehive/alerts'],
    refetchInterval: 15000, // More frequent updates for alerts
  }) as { data: TheHiveAlert[] | undefined; isLoading: boolean };

  // Fetch IOCs
  const { data: iocs, isLoading: iocsLoading } = useQuery({
    queryKey: ['/api/thehive/iocs'],
    refetchInterval: 60000,
  }) as { data: TheHiveObservable[] | undefined; isLoading: boolean };

  // Fetch TheHive status
  const { data: status } = useQuery({
    queryKey: ['/api/thehive/status'],
    refetchInterval: 300000, // Check every 5 minutes
  });

  const getSeverityColor = (severity: number) => {
    switch (severity) {
      case 4: return "bg-red-500 text-white";
      case 3: return "bg-orange-500 text-white";
      case 2: return "bg-yellow-500 text-black";
      case 1: return "bg-blue-500 text-white";
      default: return "bg-gray-500 text-white";
    }
  };

  const getSeverityLabel = (severity: number) => {
    switch (severity) {
      case 4: return "Critical";
      case 3: return "High";
      case 2: return "Medium";
      case 1: return "Low";
      default: return "Info";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'open':
      case 'new':
        return <AlertCircle className="h-4 w-4 text-orange-500" />;
      case 'inprogress':
        return <Activity className="h-4 w-4 text-blue-500" />;
      case 'resolved':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'closed':
        return <XCircle className="h-4 w-4 text-gray-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  if (summaryLoading) {
    return (
      <div className="space-y-6 p-6">
        <div className="flex items-center space-x-2">
          <Shield className="h-6 w-6 text-blue-500" />
          <h1 className="text-2xl font-bold">TheHive Case Management</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="pb-2">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </CardHeader>
              <CardContent>
                <div className="h-8 bg-gray-200 rounded w-1/2"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6" data-testid="thehive-integration">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Shield className="h-6 w-6 text-blue-500" />
          <h1 className="text-2xl font-bold">TheHive Case Management</h1>
          <Badge variant={status?.initialized ? "default" : "secondary"} data-testid="thehive-status">
            {status?.initialized ? "Connected" : "Demo Mode"}
          </Badge>
        </div>
        <Button variant="outline" size="sm" data-testid="button-refresh">
          <Activity className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card data-testid="card-total-cases">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <FileText className="h-4 w-4 mr-2 text-blue-500" />
              Total Cases
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summary?.totalCases || 0}</div>
            <p className="text-sm text-muted-foreground">Active investigations</p>
          </CardContent>
        </Card>

        <Card data-testid="card-critical-cases">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <AlertTriangle className="h-4 w-4 mr-2 text-red-500" />
              Critical Cases
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{summary?.criticalCases || 0}</div>
            <p className="text-sm text-muted-foreground">High priority</p>
          </CardContent>
        </Card>

        <Card data-testid="card-active-alerts">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <AlertCircle className="h-4 w-4 mr-2 text-orange-500" />
              Active Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summary?.totalAlerts || 0}</div>
            <p className="text-sm text-muted-foreground">Pending review</p>
          </CardContent>
        </Card>

        <Card data-testid="card-total-iocs">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Eye className="h-4 w-4 mr-2 text-purple-500" />
              Total IOCs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summary?.totalIOCs || 0}</div>
            <p className="text-sm text-muted-foreground">Observables</p>
          </CardContent>
        </Card>

        <Card data-testid="card-active-iocs">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <TrendingUp className="h-4 w-4 mr-2 text-green-500" />
              Active IOCs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{summary?.activeIOCs || 0}</div>
            <p className="text-sm text-muted-foreground">Sighted indicators</p>
          </CardContent>
        </Card>

        <Card data-testid="card-high-severity">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Users className="h-4 w-4 mr-2 text-yellow-500" />
              High Severity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{summary?.highSeverityAlerts || 0}</div>
            <p className="text-sm text-muted-foreground">Alerts requiring attention</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="cases" className="space-y-4">
        <TabsList data-testid="tabs-thehive">
          <TabsTrigger value="cases">Cases</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
          <TabsTrigger value="observables">Observables</TabsTrigger>
        </TabsList>

        {/* Cases Tab */}
        <TabsContent value="cases" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Cases</CardTitle>
            </CardHeader>
            <CardContent>
              {casesLoading ? (
                <div className="space-y-3">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="animate-pulse border rounded-lg p-4">
                      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  {cases?.map(caseItem => (
                    <div key={caseItem._id} className="border rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800" data-testid={`case-${caseItem._id}`}>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            {getStatusIcon(caseItem.status)}
                            <h3 className="font-semibold text-sm">{caseItem.title}</h3>
                            <Badge className={`text-xs ${getSeverityColor(caseItem.severity)}`}>
                              {getSeverityLabel(caseItem.severity)}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{caseItem.description}</p>
                          <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                            <span>Owner: {caseItem.owner || 'Unassigned'}</span>
                            <span>Status: {caseItem.status}</span>
                            <span>Updated: {new Date(caseItem.updatedAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {caseItem.tags.map(tag => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Alerts Tab */}
        <TabsContent value="alerts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Active Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              {alertsLoading ? (
                <div className="space-y-3">
                  {[1, 2].map(i => (
                    <div key={i} className="animate-pulse border rounded-lg p-4">
                      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  {alerts?.map(alert => (
                    <div key={alert._id} className="border rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800" data-testid={`alert-${alert._id}`}>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            {getStatusIcon(alert.status)}
                            <h3 className="font-semibold text-sm">{alert.title}</h3>
                            <Badge className={`text-xs ${getSeverityColor(alert.severity)}`}>
                              {getSeverityLabel(alert.severity)}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{alert.description}</p>
                          <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                            <span>Source: {alert.source}</span>
                            <span>Type: {alert.type}</span>
                            <span>Ref: {alert.sourceRef}</span>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" data-testid={`button-promote-${alert._id}`}>
                          Promote to Case
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {alert.tags.map(tag => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Observables Tab */}
        <TabsContent value="observables" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Indicators of Compromise (IOCs)</CardTitle>
            </CardHeader>
            <CardContent>
              {iocsLoading ? (
                <div className="space-y-3">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="animate-pulse border rounded-lg p-3">
                      <div className="h-3 bg-gray-200 rounded w-1/4 mb-1"></div>
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  {iocs?.map(ioc => (
                    <div key={ioc._id} className="border rounded-lg p-3 hover:bg-gray-50 dark:hover:bg-gray-800" data-testid={`ioc-${ioc._id}`}>
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <Badge variant="outline" className="text-xs">
                              {ioc.dataType}
                            </Badge>
                            {ioc.ioc && <Badge className="text-xs bg-red-100 text-red-800">IOC</Badge>}
                            {ioc.sighted && <Badge className="text-xs bg-orange-100 text-orange-800">Sighted</Badge>}
                          </div>
                          <code className="text-sm font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                            {ioc.data}
                          </code>
                          {ioc.message && (
                            <p className="text-sm text-muted-foreground mt-1">{ioc.message}</p>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {ioc.tags.map(tag => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}