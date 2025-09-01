import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { MarketingLayout } from "@/components/MarketingLayout";
import { 
  Users,
  Key,
  Shield,
  Lock,
  Unlock,
  Settings,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Clock,
  Plus,
  RefreshCw,
  Download,
  Eye,
  EyeOff,
  Activity,
  Database,
  Server,
  Globe,
  Smartphone
} from "lucide-react";

interface IAMProvider {
  id: string;
  name: string;
  type: 'okta' | 'azure_ad' | 'onelogin' | 'auth0' | 'ping_identity';
  status: 'active' | 'inactive' | 'configuring' | 'error';
  connectedUsers: number;
  lastSync: Date;
  ssoEnabled: boolean;
  mfaEnabled: boolean;
  provisioningEnabled: boolean;
  configuration: any;
  apiHealth: number;
}

interface IAMUser {
  id: string;
  providerId: string;
  externalId: string;
  email: string;
  displayName: string;
  department: string;
  status: 'active' | 'inactive' | 'suspended' | 'pending';
  lastLogin: Date | null;
  mfaRegistered: boolean;
  groups: string[];
  applications: string[];
  provisionedDate: Date;
}

interface SSOApplication {
  id: string;
  name: string;
  providerId: string;
  status: 'active' | 'inactive' | 'configuring';
  userCount: number;
  protocol: 'saml' | 'oidc' | 'oauth2';
  loginUrl: string;
  lastUsed: Date;
}

export default function EnterpriseIAM() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);
  const [isConfiguring, setIsConfiguring] = useState(false);
  const [isAddingProvider, setIsAddingProvider] = useState(false);

  // Mock data for demonstration
  const [iamProviders] = useState<IAMProvider[]>([
    {
      id: 'okta_001',
      name: 'Okta Identity Cloud',
      type: 'okta',
      status: 'active',
      connectedUsers: 1247,
      lastSync: new Date(),
      ssoEnabled: true,
      mfaEnabled: true,
      provisioningEnabled: true,
      configuration: {
        domain: 'example.okta.com',
        clientId: 'oa2xxxxxxxxx',
        scopes: ['openid', 'profile', 'email', 'groups']
      },
      apiHealth: 99.8
    },
    {
      id: 'azure_ad_001',
      name: 'Azure Active Directory',
      type: 'azure_ad',
      status: 'active',
      connectedUsers: 892,
      lastSync: new Date(Date.now() - 300000),
      ssoEnabled: true,
      mfaEnabled: true,
      provisioningEnabled: false,
      configuration: {
        tenantId: 'tenant-id-here',
        clientId: 'client-id-here',
        conditionalAccess: true
      },
      apiHealth: 98.5
    },
    {
      id: 'onelogin_001',
      name: 'OneLogin',
      type: 'onelogin',
      status: 'configuring',
      connectedUsers: 456,
      lastSync: new Date(Date.now() - 600000),
      ssoEnabled: false,
      mfaEnabled: true,
      provisioningEnabled: true,
      configuration: {
        subdomain: 'example.onelogin.com',
        region: 'us',
        smartHooks: true
      },
      apiHealth: 95.2
    }
  ]);

  const [iamUsers] = useState<IAMUser[]>([
    {
      id: 'user_001',
      providerId: 'okta_001',
      externalId: 'okta-user-12345',
      email: 'sarah.johnson@university.edu',
      displayName: 'Sarah Johnson',
      department: 'Computer Science',
      status: 'active',
      lastLogin: new Date(),
      mfaRegistered: true,
      groups: ['Faculty', 'Researchers', 'CS_Department'],
      applications: ['Canvas', 'Office365', 'Research_Portal'],
      provisionedDate: new Date('2024-01-15')
    },
    {
      id: 'user_002',
      providerId: 'azure_ad_001',
      externalId: 'azure-user-67890',
      email: 'mike.davidson@university.edu',
      displayName: 'Mike Davidson',
      department: 'Student Affairs',
      status: 'active',
      lastLogin: new Date(Date.now() - 3600000),
      mfaRegistered: false,
      groups: ['Students', 'SA_Department'],
      applications: ['Canvas', 'Student_Portal'],
      provisionedDate: new Date('2024-01-20')
    }
  ]);

  const [ssoApplications] = useState<SSOApplication[]>([
    {
      id: 'app_001',
      name: 'Canvas LMS',
      providerId: 'okta_001',
      status: 'active',
      userCount: 1247,
      protocol: 'saml',
      loginUrl: 'https://canvas.university.edu/login/saml',
      lastUsed: new Date()
    },
    {
      id: 'app_002',
      name: 'Microsoft Office 365',
      providerId: 'azure_ad_001',
      status: 'active',
      userCount: 892,
      protocol: 'oidc',
      loginUrl: 'https://login.microsoftonline.com',
      lastUsed: new Date(Date.now() - 120000)
    }
  ]);

  const syncProviderMutation = useMutation({
    mutationFn: async (providerId: string) => {
      const response = await fetch(`/api/iam/${providerId}/sync`, {
        method: 'POST'
      });
      if (!response.ok) throw new Error('Failed to sync provider');
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Sync Completed",
        description: "IAM provider synchronization completed successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/iam'] });
    },
    onError: () => {
      toast({
        title: "Sync Failed",
        description: "Failed to synchronize IAM provider.",
        variant: "destructive",
      });
    },
  });

  const configureProviderMutation = useMutation({
    mutationFn: async (data: { providerId: string; configuration: any }) => {
      const response = await fetch(`/api/iam/${data.providerId}/configure`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data.configuration)
      });
      if (!response.ok) throw new Error('Failed to configure provider');
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Configuration Updated",
        description: "IAM provider has been configured successfully.",
      });
      setIsConfiguring(false);
      queryClient.invalidateQueries({ queryKey: ['/api/iam'] });
    },
    onError: () => {
      toast({
        title: "Configuration Failed",
        description: "Failed to update provider configuration.",
        variant: "destructive",
      });
    },
  });

  const addProviderMutation = useMutation({
    mutationFn: async (data: { type: string; configuration: any }) => {
      const response = await fetch('/api/iam/providers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error('Failed to add provider');
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Provider Added",
        description: "New IAM provider has been added successfully.",
      });
      setIsAddingProvider(false);
      queryClient.invalidateQueries({ queryKey: ['/api/iam'] });
    },
    onError: () => {
      toast({
        title: "Failed to Add Provider",
        description: "Failed to add new IAM provider.",
        variant: "destructive",
      });
    },
  });

  const getProviderIcon = (type: string) => {
    switch (type) {
      case 'okta': return <Shield className="w-5 h-5 text-blue-500" />;
      case 'azure_ad': return <Server className="w-5 h-5 text-cyan-500" />;
      case 'onelogin': return <Key className="w-5 h-5 text-green-500" />;
      case 'auth0': return <Lock className="w-5 h-5 text-orange-500" />;
      case 'ping_identity': return <Globe className="w-5 h-5 text-purple-500" />;
      default: return <Users className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'inactive': return <XCircle className="w-4 h-4 text-gray-500" />;
      case 'configuring': return <Settings className="w-4 h-4 text-yellow-500" />;
      case 'error': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      default: return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'inactive': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'configuring': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'error': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getProviderColor = (type: string) => {
    switch (type) {
      case 'okta': return 'bg-blue-100 text-blue-800';
      case 'azure_ad': return 'bg-cyan-100 text-cyan-800';
      case 'onelogin': return 'bg-green-100 text-green-800';
      case 'auth0': return 'bg-orange-100 text-orange-800';
      case 'ping_identity': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <MarketingLayout>
      <div className="ai-dashboard-bg min-h-screen">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold text-white mb-2 flex items-center">
                  <Users className="w-8 h-8 mr-3 text-spring-green" />
                  Enterprise Identity & Access Management
                </h1>
                <p className="text-gray-400">
                  Centralized identity management with Okta, Azure AD, and OneLogin integration
                </p>
              </div>
              <Dialog open={isAddingProvider} onOpenChange={setIsAddingProvider}>
                <DialogTrigger asChild>
                  <Button className="bg-spring-green hover:bg-spring-green/80 text-midnight-blue">
                    <Plus className="w-4 h-4 mr-2" />
                    Add IAM Provider
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-surface border border-gray-700">
                  <DialogHeader>
                    <DialogTitle className="text-white">Add New IAM Provider</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 mt-4">
                    <div>
                      <Label className="text-gray-300">Provider Type</Label>
                      <Select>
                        <SelectTrigger className="bg-midnight-blue border-gray-600 text-white">
                          <SelectValue placeholder="Select IAM provider" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="okta">Okta</SelectItem>
                          <SelectItem value="azure_ad">Azure Active Directory</SelectItem>
                          <SelectItem value="onelogin">OneLogin</SelectItem>
                          <SelectItem value="auth0">Auth0</SelectItem>
                          <SelectItem value="ping_identity">Ping Identity</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-gray-300">Provider Name</Label>
                      <Input 
                        className="bg-midnight-blue border-gray-600 text-white" 
                        placeholder="Enter provider name"
                      />
                    </div>
                    <div>
                      <Label className="text-gray-300">Domain/Tenant</Label>
                      <Input 
                        className="bg-midnight-blue border-gray-600 text-white" 
                        placeholder="example.okta.com or tenant-id"
                      />
                    </div>
                    <div className="flex justify-end space-x-2 pt-4">
                      <Button variant="outline" onClick={() => setIsAddingProvider(false)}>
                        Cancel
                      </Button>
                      <Button 
                        className="bg-spring-green hover:bg-spring-green/80 text-midnight-blue"
                        onClick={() => {
                          addProviderMutation.mutate({
                            type: 'okta',
                            configuration: { domain: 'example.okta.com' }
                          });
                        }}
                        disabled={addProviderMutation.isPending}
                      >
                        {addProviderMutation.isPending ? 'Adding...' : 'Add Provider'}
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-surface/80 backdrop-blur-md border border-spring-green/30 cyber-glow">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-white flex items-center">
                  <Users className="w-5 h-5 mr-2 text-spring-green" />
                  Connected Users
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-spring-green">
                  {iamProviders.reduce((sum, provider) => sum + provider.connectedUsers, 0).toLocaleString()}
                </div>
                <p className="text-gray-400 text-sm">across all providers</p>
              </CardContent>
            </Card>

            <Card className="bg-surface/80 backdrop-blur-md border border-spring-green/30 cyber-glow">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-white flex items-center">
                  <Shield className="w-5 h-5 mr-2 text-spring-green" />
                  Active Providers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-spring-green">
                  {iamProviders.filter(p => p.status === 'active').length}
                </div>
                <p className="text-gray-400 text-sm">identity providers</p>
              </CardContent>
            </Card>

            <Card className="bg-surface/80 backdrop-blur-md border border-spring-green/30 cyber-glow">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-white flex items-center">
                  <Smartphone className="w-5 h-5 mr-2 text-spring-green" />
                  MFA Coverage
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-spring-green">
                  {Math.round((iamUsers.filter(u => u.mfaRegistered).length / iamUsers.length) * 100)}%
                </div>
                <p className="text-gray-400 text-sm">users with MFA</p>
              </CardContent>
            </Card>

            <Card className="bg-surface/80 backdrop-blur-md border border-spring-green/30 cyber-glow">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-white flex items-center">
                  <Activity className="w-5 h-5 mr-2 text-spring-green" />
                  SSO Sessions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-spring-green">1,847</div>
                <p className="text-gray-400 text-sm">active sessions</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <Tabs defaultValue="providers" className="space-y-6">
            <TabsList className="bg-surface/50 border border-gray-700">
              <TabsTrigger value="providers" className="data-[state=active]:bg-spring-green data-[state=active]:text-midnight-blue">
                IAM Providers
              </TabsTrigger>
              <TabsTrigger value="users" className="data-[state=active]:bg-spring-green data-[state=active]:text-midnight-blue">
                User Management
              </TabsTrigger>
              <TabsTrigger value="applications" className="data-[state=active]:bg-spring-green data-[state=active]:text-midnight-blue">
                SSO Applications
              </TabsTrigger>
            </TabsList>

            {/* Providers Tab */}
            <TabsContent value="providers" className="space-y-6">
              <div className="grid gap-6">
                {iamProviders.map((provider) => (
                  <Card key={provider.id} className="bg-surface/80 backdrop-blur-md border border-gray-700">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          {getProviderIcon(provider.type)}
                          <div>
                            <CardTitle className="text-white">{provider.name}</CardTitle>
                            <p className="text-gray-400 text-sm capitalize">
                              {provider.type.replace('_', ' ')} Provider
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={getProviderColor(provider.type)}>
                            {provider.type.replace('_', ' ').toUpperCase()}
                          </Badge>
                          <Badge className={getStatusColor(provider.status)}>
                            {getStatusIcon(provider.status)}
                            <span className="ml-1 capitalize">{provider.status}</span>
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                        <div>
                          <p className="text-gray-400 text-sm">Connected Users</p>
                          <p className="text-white font-medium">{provider.connectedUsers.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">API Health</p>
                          <p className="text-white font-medium">{provider.apiHealth}%</p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">Last Sync</p>
                          <p className="text-white font-medium">
                            {Math.floor((Date.now() - provider.lastSync.getTime()) / 60000)} min ago
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">SSO</p>
                          <Badge className={provider.ssoEnabled ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                            {provider.ssoEnabled ? 'Enabled' : 'Disabled'}
                          </Badge>
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">Provisioning</p>
                          <Badge className={provider.provisioningEnabled ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                            {provider.provisioningEnabled ? 'Enabled' : 'Disabled'}
                          </Badge>
                        </div>
                      </div>

                      {/* Configuration Details */}
                      <div className="bg-midnight-blue/30 p-3 rounded-lg mb-4">
                        <h5 className="text-white font-medium mb-2">Configuration</h5>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                          {Object.entries(provider.configuration).map(([key, value]) => (
                            <div key={key} className="flex items-center space-x-2">
                              <span className="text-gray-400 capitalize">
                                {key.replace(/([A-Z])/g, ' $1').toLowerCase()}:
                              </span>
                              <span className="text-white">
                                {typeof value === 'boolean' ? (value ? 'Yes' : 'No') : 
                                 Array.isArray(value) ? value.join(', ') : value}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-1" />
                          View Details
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            setSelectedProvider(provider.id);
                            setIsConfiguring(true);
                          }}
                        >
                          <Settings className="w-4 h-4 mr-1" />
                          Configure
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => syncProviderMutation.mutate(provider.id)}
                          disabled={syncProviderMutation.isPending || provider.status !== 'active'}
                        >
                          <RefreshCw className="w-4 h-4 mr-1" />
                          Sync
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Users Tab */}
            <TabsContent value="users" className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-white">Managed Users</h3>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-1" />
                    Export Users
                  </Button>
                  <Button variant="outline" size="sm">
                    <RefreshCw className="w-4 h-4 mr-1" />
                    Sync All
                  </Button>
                </div>
              </div>

              <div className="grid gap-4">
                {iamUsers.map((user) => (
                  <Card key={user.id} className="bg-surface/80 backdrop-blur-md border border-gray-700">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Users className="w-5 h-5 text-spring-green" />
                          <div>
                            <h4 className="text-white font-medium">{user.displayName}</h4>
                            <p className="text-gray-400 text-sm">
                              {user.email} • {user.department}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <p className="text-white text-sm">
                              Provider: {iamProviders.find(p => p.id === user.providerId)?.name}
                            </p>
                            <p className="text-gray-400 text-xs">
                              Groups: {user.groups.join(', ')}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-white text-sm">
                              {user.applications.length} Apps
                            </p>
                            <p className="text-gray-400 text-xs">
                              MFA: {user.mfaRegistered ? '✓' : '✗'}
                            </p>
                          </div>
                          <Badge className={getStatusColor(user.status)}>
                            {user.status}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Applications Tab */}
            <TabsContent value="applications" className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-white">SSO Applications</h3>
                <Button variant="outline" size="sm">
                  <Plus className="w-4 h-4 mr-1" />
                  Add Application
                </Button>
              </div>

              <div className="grid gap-4">
                {ssoApplications.map((app) => (
                  <Card key={app.id} className="bg-surface/80 backdrop-blur-md border border-gray-700">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Database className="w-5 h-5 text-spring-green" />
                          <div>
                            <h4 className="text-white font-medium">{app.name}</h4>
                            <p className="text-gray-400 text-sm">
                              {app.protocol.toUpperCase()} • {app.loginUrl}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <p className="text-white text-sm">{app.userCount} Users</p>
                            <p className="text-gray-400 text-xs">
                              Last used: {Math.floor((Date.now() - app.lastUsed.getTime()) / 60000)} min ago
                            </p>
                          </div>
                          <Badge className={getStatusColor(app.status)}>
                            {app.status}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          {/* Configuration Dialog */}
          <Dialog open={isConfiguring} onOpenChange={setIsConfiguring}>
            <DialogContent className="bg-surface border border-gray-700 max-w-2xl">
              <DialogHeader>
                <DialogTitle className="text-white">Configure IAM Provider</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div className="bg-midnight-blue/50 p-4 rounded-lg border border-gray-600">
                  <h4 className="text-white font-medium mb-2">Provider Settings</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label className="text-gray-300">Enable SSO</Label>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label className="text-gray-300">Enable MFA</Label>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label className="text-gray-300">Auto Provisioning</Label>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label className="text-gray-300">Just-in-Time Provisioning</Label>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>
                <div className="flex justify-end space-x-2 pt-4">
                  <Button variant="outline" onClick={() => setIsConfiguring(false)}>
                    Cancel
                  </Button>
                  <Button 
                    className="bg-spring-green hover:bg-spring-green/80 text-midnight-blue"
                    onClick={() => {
                      if (selectedProvider) {
                        configureProviderMutation.mutate({
                          providerId: selectedProvider,
                          configuration: { ssoEnabled: true, mfaEnabled: true }
                        });
                      }
                    }}
                    disabled={configureProviderMutation.isPending}
                  >
                    {configureProviderMutation.isPending ? 'Updating...' : 'Update Configuration'}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </MarketingLayout>
  );
}