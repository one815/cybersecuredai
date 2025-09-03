import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { 
  Server,
  Shield,
  Eye,
  Database,
  Zap,
  Plus,
  Settings,
  RefreshCw,
  CheckCircle,
  XCircle,
  AlertCircle,
  Clock,
  Download,
  Search,
  Filter,
  BarChart3,
  Users,
  Activity,
  Lock,
  Globe,
  FileText,
  Bug,
  AlertTriangle,
  TrendingUp,
  Info
} from "lucide-react";

interface TaxiiServer {
  id: string;
  name: string;
  url: string;
  username?: string;
  password?: string;
  status: 'active' | 'inactive' | 'error';
  lastSync?: Date;
  collections?: TaxiiCollection[];
  cisaCompliant: boolean;
}

interface TaxiiCollection {
  id: string;
  title: string;
  description?: string;
  can_read: boolean;
  can_write: boolean;
  media_types: string[];
}

interface StixObject {
  type: string;
  spec_version: '2.1';
  id: string;
  created: string;
  modified: string;
  labels?: string[];
  [key: string]: any;
}

interface CisaComplianceStats {
  totalServers: number;
  activeServers: number;
  cisaCompliantServers: number;
  totalCollections: number;
  lastSyncTime?: Date;
  stixObjectTypes: { [type: string]: number };
}

export default function TaxiiStixManagement() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [showAddServer, setShowAddServer] = useState(false);
  const [selectedServer, setSelectedServer] = useState<string | null>(null);
  const [selectedCollection, setSelectedCollection] = useState<string | null>(null);
  const [stixFilter, setStixFilter] = useState({ type: '', limit: 100 });
  const [newServer, setNewServer] = useState({
    id: '',
    name: '',
    url: '',
    username: '',
    password: '',
    cisaCompliant: false
  });

  // Fetch TAXII servers
  const { data: servers = [], isLoading: serversLoading } = useQuery({
    queryKey: ['/api/taxii/servers'],
    refetchInterval: 30000
  });

  // Fetch CISA compliance stats
  const { data: cisaStats } = useQuery<CisaComplianceStats>({
    queryKey: ['/api/taxii/cisa-compliance'],
    refetchInterval: 60000
  });

  // Fetch STIX objects for selected server/collection
  const { data: stixObjects = [], isLoading: stixLoading } = useQuery({
    queryKey: ['/api/taxii/servers', selectedServer, 'collections', selectedCollection, 'objects', stixFilter],
    enabled: !!(selectedServer && selectedCollection),
    refetchInterval: 120000
  });

  // Add server mutation
  const addServerMutation = useMutation({
    mutationFn: async (serverData: typeof newServer) => {
      return await apiRequest('/api/taxii/servers', {
        method: 'POST',
        body: JSON.stringify(serverData)
      });
    },
    onSuccess: () => {
      toast({
        title: "TAXII Server Added",
        description: "Server has been successfully configured and tested.",
      });
      setShowAddServer(false);
      setNewServer({
        id: '',
        name: '',
        url: '',
        username: '',
        password: '',
        cisaCompliant: false
      });
      queryClient.invalidateQueries({ queryKey: ['/api/taxii/servers'] });
    },
    onError: (error: any) => {
      toast({
        title: "Failed to Add Server",
        description: error.message || "Unable to add TAXII server",
        variant: "destructive",
      });
    },
  });

  // Sync servers mutation
  const syncServersMutation = useMutation({
    mutationFn: async () => {
      return await apiRequest('/api/taxii/sync', { method: 'POST' });
    },
    onSuccess: (data) => {
      toast({
        title: "Sync Completed",
        description: `${data.success} servers synced successfully, ${data.failed} failed.`,
      });
      queryClient.invalidateQueries({ queryKey: ['/api/taxii/servers'] });
      queryClient.invalidateQueries({ queryKey: ['/api/taxii/cisa-compliance'] });
    },
    onError: () => {
      toast({
        title: "Sync Failed",
        description: "Unable to sync TAXII servers.",
        variant: "destructive",
      });
    },
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'inactive': return <XCircle className="w-4 h-4 text-gray-500" />;
      case 'error': return <AlertCircle className="w-4 h-4 text-red-500" />;
      default: return <Clock className="w-4 h-4 text-yellow-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-100';
      case 'inactive': return 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-100';
      case 'error': return 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900 dark:text-red-100';
      default: return 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900 dark:text-yellow-100';
    }
  };

  const getStixTypeIcon = (type: string) => {
    switch (type) {
      case 'indicator': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'malware': return <Bug className="w-4 h-4 text-purple-500" />;
      case 'attack-pattern': return <Zap className="w-4 h-4 text-orange-500" />;
      case 'threat-actor': return <Users className="w-4 h-4 text-blue-500" />;
      case 'campaign': return <TrendingUp className="w-4 h-4 text-green-500" />;
      default: return <FileText className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2 flex items-center">
              <Server className="w-8 h-8 mr-3 text-spring-green" />
              TAXII/STIX Management
            </h1>
            <p className="text-gray-400">
              CISA compliant threat intelligence sharing with STIX 2.1 and TAXII 2.1 protocols
            </p>
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              onClick={() => syncServersMutation.mutate()}
              disabled={syncServersMutation.isPending}
              data-testid="button-sync-servers"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${syncServersMutation.isPending ? 'animate-spin' : ''}`} />
              {syncServersMutation.isPending ? 'Syncing...' : 'Sync All'}
            </Button>
            <Dialog open={showAddServer} onOpenChange={setShowAddServer}>
              <DialogTrigger asChild>
                <Button className="bg-spring-green hover:bg-spring-green/80 text-midnight-blue" data-testid="button-add-server">
                  <Plus className="w-4 h-4 mr-2" />
                  Add TAXII Server
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-surface border border-gray-700 max-w-2xl">
                <DialogHeader>
                  <DialogTitle className="text-white">Add TAXII 2.1 Server</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-gray-300">Server ID</Label>
                      <Input
                        value={newServer.id}
                        onChange={(e) => setNewServer({...newServer, id: e.target.value})}
                        placeholder="server-001"
                        className="bg-midnight-blue border-gray-600 text-white"
                        data-testid="input-server-id"
                      />
                    </div>
                    <div>
                      <Label className="text-gray-300">Server Name</Label>
                      <Input
                        value={newServer.name}
                        onChange={(e) => setNewServer({...newServer, name: e.target.value})}
                        placeholder="MITRE ATT&CK Server"
                        className="bg-midnight-blue border-gray-600 text-white"
                        data-testid="input-server-name"
                      />
                    </div>
                  </div>
                  <div>
                    <Label className="text-gray-300">Server URL</Label>
                    <Input
                      value={newServer.url}
                      onChange={(e) => setNewServer({...newServer, url: e.target.value})}
                      placeholder="https://cti-taxii.mitre.org"
                      className="bg-midnight-blue border-gray-600 text-white"
                      data-testid="input-server-url"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-gray-300">Username (Optional)</Label>
                      <Input
                        value={newServer.username}
                        onChange={(e) => setNewServer({...newServer, username: e.target.value})}
                        placeholder="username"
                        className="bg-midnight-blue border-gray-600 text-white"
                        data-testid="input-username"
                      />
                    </div>
                    <div>
                      <Label className="text-gray-300">Password (Optional)</Label>
                      <Input
                        type="password"
                        value={newServer.password}
                        onChange={(e) => setNewServer({...newServer, password: e.target.value})}
                        placeholder="password"
                        className="bg-midnight-blue border-gray-600 text-white"
                        data-testid="input-password"
                      />
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={newServer.cisaCompliant}
                      onCheckedChange={(checked) => setNewServer({...newServer, cisaCompliant: checked})}
                      data-testid="switch-cisa-compliant"
                    />
                    <Label className="text-gray-300">CISA Compliant Server</Label>
                  </div>
                  <div className="flex justify-end space-x-2 pt-4">
                    <Button variant="outline" onClick={() => setShowAddServer(false)}>
                      Cancel
                    </Button>
                    <Button
                      className="bg-spring-green hover:bg-spring-green/80 text-midnight-blue"
                      onClick={() => addServerMutation.mutate(newServer)}
                      disabled={!newServer.id || !newServer.name || !newServer.url || addServerMutation.isPending}
                      data-testid="button-save-server"
                    >
                      {addServerMutation.isPending ? 'Adding...' : 'Add Server'}
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      {/* CISA Compliance Dashboard */}
      {cisaStats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-surface/80 backdrop-blur-md border border-spring-green/30 cyber-glow">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-white flex items-center">
                <Shield className="w-5 h-5 mr-2 text-spring-green" />
                CISA Compliant
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-spring-green">
                {cisaStats.cisaCompliantServers}
              </div>
              <p className="text-gray-400 text-sm">servers configured</p>
            </CardContent>
          </Card>

          <Card className="bg-surface/80 backdrop-blur-md border border-spring-green/30 cyber-glow">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-white flex items-center">
                <Activity className="w-5 h-5 mr-2 text-spring-green" />
                Active Servers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-spring-green">
                {cisaStats.activeServers}/{cisaStats.totalServers}
              </div>
              <p className="text-gray-400 text-sm">operational status</p>
            </CardContent>
          </Card>

          <Card className="bg-surface/80 backdrop-blur-md border border-spring-green/30 cyber-glow">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-white flex items-center">
                <Database className="w-5 h-5 mr-2 text-spring-green" />
                Collections
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-spring-green">
                {cisaStats.totalCollections}
              </div>
              <p className="text-gray-400 text-sm">threat intel sources</p>
            </CardContent>
          </Card>

          <Card className="bg-surface/80 backdrop-blur-md border border-spring-green/30 cyber-glow">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-white flex items-center">
                <FileText className="w-5 h-5 mr-2 text-spring-green" />
                STIX Objects
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-spring-green">
                {Object.values(cisaStats.stixObjectTypes).reduce((sum, count) => sum + count, 0)}
              </div>
              <p className="text-gray-400 text-sm">threat indicators</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Main Content */}
      <Tabs defaultValue="servers" className="space-y-6">
        <TabsList className="bg-surface/50 border border-gray-700">
          <TabsTrigger value="servers" className="data-[state=active]:bg-spring-green data-[state=active]:text-midnight-blue">
            TAXII Servers
          </TabsTrigger>
          <TabsTrigger value="stix" className="data-[state=active]:bg-spring-green data-[state=active]:text-midnight-blue">
            STIX Objects
          </TabsTrigger>
          <TabsTrigger value="compliance" className="data-[state=active]:bg-spring-green data-[state=active]:text-midnight-blue">
            CISA Compliance
          </TabsTrigger>
        </TabsList>

        {/* TAXII Servers Tab */}
        <TabsContent value="servers" className="space-y-6">
          {serversLoading ? (
            <div className="flex items-center justify-center h-64">
              <RefreshCw className="w-8 h-8 animate-spin text-spring-green" />
            </div>
          ) : (
            <div className="grid gap-6">
              {servers.map((server: TaxiiServer) => (
                <Card key={server.id} className="bg-surface/80 backdrop-blur-md border border-gray-700">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Server className="w-6 h-6 text-spring-green" />
                        <div>
                          <CardTitle className="text-white flex items-center">
                            {server.name}
                            {server.cisaCompliant && (
                              <Shield className="w-4 h-4 ml-2 text-spring-green" title="CISA Compliant" />
                            )}
                          </CardTitle>
                          <p className="text-gray-400 text-sm">{server.url}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getStatusColor(server.status)}>
                          {getStatusIcon(server.status)}
                          <span className="ml-1 capitalize">{server.status}</span>
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-gray-400 text-sm">Collections</p>
                        <p className="text-white font-medium">{server.collections?.length || 0}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Last Sync</p>
                        <p className="text-white font-medium">
                          {server.lastSync ? new Date(server.lastSync).toLocaleDateString() : 'Never'}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Authentication</p>
                        <p className="text-white font-medium">
                          {server.username ? 'Required' : 'None'}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">CISA Status</p>
                        <p className="text-white font-medium">
                          {server.cisaCompliant ? 'Compliant' : 'Standard'}
                        </p>
                      </div>
                    </div>

                    {server.collections && server.collections.length > 0 && (
                      <div className="bg-midnight-blue/30 p-3 rounded-lg mb-4">
                        <h5 className="text-white font-medium mb-2">Collections ({server.collections.length})</h5>
                        <div className="space-y-2">
                          {server.collections.slice(0, 3).map((collection) => (
                            <div key={collection.id} className="flex items-center justify-between">
                              <div>
                                <span className="text-gray-300 text-sm">{collection.title}</span>
                                {collection.description && (
                                  <p className="text-gray-500 text-xs">{collection.description}</p>
                                )}
                              </div>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  setSelectedServer(server.id);
                                  setSelectedCollection(collection.id);
                                }}
                                data-testid={`button-view-collection-${collection.id}`}
                              >
                                <Eye className="w-3 h-3 mr-1" />
                                View
                              </Button>
                            </div>
                          ))}
                          {server.collections.length > 3 && (
                            <p className="text-gray-400 text-xs">
                              +{server.collections.length - 3} more collections
                            </p>
                          )}
                        </div>
                      </div>
                    )}

                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" size="sm">
                        <Settings className="w-4 h-4 mr-1" />
                        Configure
                      </Button>
                      <Button variant="outline" size="sm">
                        <Globe className="w-4 h-4 mr-1" />
                        Test Connection
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        {/* STIX Objects Tab */}
        <TabsContent value="stix" className="space-y-6">
          <div className="flex items-center space-x-4 mb-6">
            <div className="flex-1 flex items-center space-x-2">
              <Select value={selectedServer || ''} onValueChange={setSelectedServer}>
                <SelectTrigger className="bg-midnight-blue border-gray-600 text-white">
                  <SelectValue placeholder="Select TAXII Server" />
                </SelectTrigger>
                <SelectContent>
                  {servers.filter((s: TaxiiServer) => s.status === 'active').map((server: TaxiiServer) => (
                    <SelectItem key={server.id} value={server.id}>
                      {server.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              {selectedServer && (
                <Select value={selectedCollection || ''} onValueChange={setSelectedCollection}>
                  <SelectTrigger className="bg-midnight-blue border-gray-600 text-white">
                    <SelectValue placeholder="Select Collection" />
                  </SelectTrigger>
                  <SelectContent>
                    {servers.find((s: TaxiiServer) => s.id === selectedServer)?.collections?.map((collection) => (
                      <SelectItem key={collection.id} value={collection.id}>
                        {collection.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <Input
                placeholder="Filter by type..."
                value={stixFilter.type}
                onChange={(e) => setStixFilter({...stixFilter, type: e.target.value})}
                className="bg-midnight-blue border-gray-600 text-white w-48"
                data-testid="input-stix-filter"
              />
              <Select
                value={stixFilter.limit.toString()}
                onValueChange={(value) => setStixFilter({...stixFilter, limit: parseInt(value)})}
              >
                <SelectTrigger className="bg-midnight-blue border-gray-600 text-white w-20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="50">50</SelectItem>
                  <SelectItem value="100">100</SelectItem>
                  <SelectItem value="500">500</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {selectedServer && selectedCollection ? (
            <Card className="bg-surface/80 backdrop-blur-md border border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">STIX 2.1 Objects</CardTitle>
              </CardHeader>
              <CardContent>
                {stixLoading ? (
                  <div className="flex items-center justify-center h-32">
                    <RefreshCw className="w-6 h-6 animate-spin text-spring-green" />
                  </div>
                ) : (
                  <ScrollArea className="h-96" data-testid="stix-objects-list">
                    <div className="space-y-3">
                      {stixObjects.map((obj: StixObject, index: number) => (
                        <div key={obj.id || index} className="bg-midnight-blue/30 p-3 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              {getStixTypeIcon(obj.type)}
                              <span className="text-white font-medium capitalize">
                                {obj.type.replace('-', ' ')}
                              </span>
                              <Badge variant="outline" className="text-xs">
                                STIX {obj.spec_version}
                              </Badge>
                            </div>
                            <span className="text-gray-400 text-xs">
                              {new Date(obj.created).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="space-y-1">
                            <p className="text-gray-300 text-sm">ID: {obj.id}</p>
                            {obj.labels && (
                              <div className="flex flex-wrap gap-1">
                                {obj.labels.map((label: string, idx: number) => (
                                  <Badge key={idx} variant="secondary" className="text-xs">
                                    {label}
                                  </Badge>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                )}
              </CardContent>
            </Card>
          ) : (
            <Card className="bg-surface/80 backdrop-blur-md border border-gray-700">
              <CardContent className="text-center py-12">
                <Database className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-400 mb-2">No Collection Selected</p>
                <p className="text-gray-500 text-sm">
                  Select a TAXII server and collection to view STIX objects
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* CISA Compliance Tab */}
        <TabsContent value="compliance" className="space-y-6">
          {cisaStats && (
            <>
              <Card className="bg-surface/80 backdrop-blur-md border border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Shield className="w-6 h-6 mr-2 text-spring-green" />
                    CISA Compliance Status
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-lg font-medium text-white mb-4">Server Compliance</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">Total Servers</span>
                          <span className="text-white font-medium">{cisaStats.totalServers}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">CISA Compliant</span>
                          <span className="text-spring-green font-medium">{cisaStats.cisaCompliantServers}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">Active Servers</span>
                          <span className="text-white font-medium">{cisaStats.activeServers}</span>
                        </div>
                        <Progress 
                          value={(cisaStats.cisaCompliantServers / cisaStats.totalServers) * 100} 
                          className="h-2"
                          data-testid="compliance-progress"
                        />
                        <p className="text-gray-400 text-sm">
                          {Math.round((cisaStats.cisaCompliantServers / cisaStats.totalServers) * 100)}% compliant
                        </p>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-lg font-medium text-white mb-4">STIX Object Types</h4>
                      <div className="space-y-2 max-h-48 overflow-y-auto">
                        {Object.entries(cisaStats.stixObjectTypes)
                          .sort(([,a], [,b]) => b - a)
                          .map(([type, count]) => (
                          <div key={type} className="flex justify-between items-center">
                            <div className="flex items-center space-x-2">
                              {getStixTypeIcon(type)}
                              <span className="text-gray-300 capitalize">{type.replace('-', ' ')}</span>
                            </div>
                            <span className="text-white font-medium">{count}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {cisaStats.lastSyncTime && (
                    <div className="bg-midnight-blue/30 p-4 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-400 text-sm">
                          Last synchronized: {new Date(cisaStats.lastSyncTime).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="bg-surface/80 backdrop-blur-md border border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Info className="w-6 h-6 mr-2 text-blue-500" />
                    CISA Requirements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                      <div>
                        <p className="text-white font-medium">TAXII 2.1 Protocol Support</p>
                        <p className="text-gray-400 text-sm">
                          Platform supports TAXII 2.1 compliant servers for threat intelligence sharing
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                      <div>
                        <p className="text-white font-medium">STIX 2.1 Object Processing</p>
                        <p className="text-gray-400 text-sm">
                          Full support for STIX 2.1 formatted threat intelligence objects and relationships
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                      <div>
                        <p className="text-white font-medium">Automated Indicator Sharing (AIS)</p>
                        <p className="text-gray-400 text-sm">
                          Ready to integrate with CISA's AIS platform for bidirectional threat intelligence sharing
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}