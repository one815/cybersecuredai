import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  Settings, 
  Shield, 
  Eye,
  Lock,
  Server,
  Database,
  CloudCog,
  UserPlus,
  Edit,
  Trash2,
  Search,
  Filter,
  Download,
  Upload,
  AlertTriangle,
  CheckCircle,
  Clock,
  Activity
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

interface SystemSettings {
  id: string;
  category: string;
  name: string;
  value: string | boolean | number;
  description: string;
  type: "string" | "boolean" | "number" | "select";
  options?: string[];
}

interface AuditLog {
  id: string;
  userId: string;
  action: string;
  resource: string;
  details: any;
  timestamp: Date;
  ipAddress: string;
  userAgent: string;
}

export default function AdminPanel() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [isCreatingUser, setIsCreatingUser] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  const { data: users = [], isLoading: usersLoading } = useQuery<any[]>({
    queryKey: ["/api/users"],
  });

  const { data: systemStats = {} } = useQuery<any>({
    queryKey: ["/api/admin/stats"],
  });

  const { data: auditLogs = [] } = useQuery<AuditLog[]>({
    queryKey: ["/api/admin/audit"],
  });

  const createUserMutation = useMutation({
    mutationFn: async (userData: any) => {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      if (!response.ok) throw new Error("Failed to create user");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/users"] });
      toast({
        title: "User Created",
        description: "New user has been successfully created.",
      });
      setIsCreatingUser(false);
    },
  });

  const updateUserMutation = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: any }) => {
      const response = await fetch(`/api/users/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
      if (!response.ok) throw new Error("Failed to update user");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/users"] });
      toast({
        title: "User Updated",
        description: "User information has been updated.",
      });
    },
  });

  const deleteUserMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/users/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete user");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/users"] });
      toast({
        title: "User Deleted",
        description: "User has been removed from the system.",
      });
    },
  });

  // Mock system settings
  const systemSettings: SystemSettings[] = [
    {
      id: "1",
      category: "Security",
      name: "MFA Required",
      value: true,
      description: "Require multi-factor authentication for all users",
      type: "boolean"
    },
    {
      id: "2",
      category: "Security",
      name: "Session Timeout",
      value: 3600,
      description: "Session timeout in seconds",
      type: "number"
    },
    {
      id: "3",
      category: "Security",
      name: "Password Policy",
      value: "strong",
      description: "Password complexity requirements",
      type: "select",
      options: ["basic", "medium", "strong", "enterprise"]
    },
    {
      id: "4",
      category: "Monitoring",
      name: "Log Retention",
      value: 90,
      description: "Number of days to retain audit logs",
      type: "number"
    },
    {
      id: "5",
      category: "Monitoring",
      name: "Real-time Alerts",
      value: true,
      description: "Enable real-time security alerts",
      type: "boolean"
    },
    {
      id: "6",
      category: "Integration",
      name: "API Rate Limit",
      value: 1000,
      description: "API requests per hour per user",
      type: "number"
    }
  ];

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin": return "bg-red-500 text-white";
      case "security_officer": return "bg-orange-500 text-white";
      case "compliance_officer": return "bg-purple-500 text-white";
      case "faculty": return "bg-blue-500 text-white";
      case "student": return "bg-green-500 text-white";
      default: return "bg-gray-500 text-white";
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  if (usersLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-surface rounded w-1/4"></div>
          <div className="h-64 bg-surface rounded"></div>
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
            <h2 className="text-2xl font-bold">Admin Control Panel</h2>
            <p className="text-gray-400">Manage users, settings, and system configuration</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button 
              onClick={() => setIsCreatingUser(true)}
              className="bg-interactive hover:bg-orange-600" 
              data-testid="create-user"
            >
              <UserPlus className="w-4 h-4 mr-2" />
              Add User
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
            <TabsTrigger value="audit">Audit Logs</TabsTrigger>
          </TabsList>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6">
            {/* User Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="bg-surface border-surface-light">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                      <Users className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">{users.length}</h3>
                      <p className="text-gray-400">Total Users</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-surface border-surface-light">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-green-400" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">
                        {users.filter(u => u.isActive).length}
                      </h3>
                      <p className="text-gray-400">Active Users</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-surface border-surface-light">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center">
                      <Shield className="w-6 h-6 text-orange-400" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">
                        {users.filter(u => u.mfaEnabled).length}
                      </h3>
                      <p className="text-gray-400">MFA Enabled</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-surface border-surface-light">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                      <Lock className="w-6 h-6 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">
                        {users.filter(u => u.role === "admin").length}
                      </h3>
                      <p className="text-gray-400">Administrators</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* User Management */}
            <Card className="bg-surface border-surface-light">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>User Management</CardTitle>
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <Input
                        placeholder="Search users..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 w-80"
                        data-testid="user-search"
                      />
                      <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    </div>
                    
                    <Select value={roleFilter} onValueChange={setRoleFilter}>
                      <SelectTrigger className="w-48" data-testid="role-filter">
                        <Filter className="w-4 h-4 mr-2" />
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Roles</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="security_officer">Security Officer</SelectItem>
                        <SelectItem value="compliance_officer">Compliance Officer</SelectItem>
                        <SelectItem value="faculty">Faculty</SelectItem>
                        <SelectItem value="student">Student</SelectItem>
                        <SelectItem value="user">User</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredUsers.map((user) => (
                    <div
                      key={user.id}
                      className="flex items-center justify-between p-4 bg-background rounded-lg border border-surface-light hover:border-interactive/50 transition-colors"
                      data-testid={`user-${user.id}`}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-interactive/20 rounded-full flex items-center justify-center">
                          <Users className="w-6 h-6 text-interactive" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-white">
                            {user.firstName} {user.lastName}
                          </h4>
                          <p className="text-sm text-gray-400">{user.email}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge className={getRoleColor(user.role)}>
                              {user.role.replace("_", " ").toUpperCase()}
                            </Badge>
                            {user.mfaEnabled && (
                              <Badge variant="outline" className="text-green-400 border-green-400">
                                MFA
                              </Badge>
                            )}
                            {user.biometricEnabled && (
                              <Badge variant="outline" className="text-purple-400 border-purple-400">
                                Biometric
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <div className="text-right text-sm">
                          <p className={user.isActive ? "text-green-400" : "text-red-400"}>
                            {user.isActive ? "Active" : "Inactive"}
                          </p>
                          {user.lastLogin && (
                            <p className="text-gray-400">
                              Last login: {new Date(user.lastLogin).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                        
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setSelectedUser(user.id)}
                            data-testid="edit-user"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => deleteUserMutation.mutate(user.id)}
                            data-testid="delete-user"
                            className="text-red-400 border-red-400 hover:bg-red-400/10"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {["Security", "Monitoring", "Integration"].map((category) => (
                <Card key={category} className="bg-surface border-surface-light">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Settings className="w-5 h-5 text-interactive" />
                      <span>{category} Settings</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {systemSettings
                      .filter(setting => setting.category === category)
                      .map((setting) => (
                        <div key={setting.id} className="flex items-center justify-between p-3 bg-background rounded-lg">
                          <div className="flex-1">
                            <h4 className="font-medium text-white">{setting.name}</h4>
                            <p className="text-sm text-gray-400">{setting.description}</p>
                          </div>
                          <div className="ml-4">
                            {setting.type === "boolean" && (
                              <Switch
                                checked={setting.value as boolean}
                                onCheckedChange={(checked) => {
                                  // Handle setting update
                                }}
                                data-testid={`setting-${setting.id}`}
                              />
                            )}
                            {setting.type === "number" && (
                              <Input
                                type="number"
                                value={setting.value as number}
                                className="w-20"
                                data-testid={`setting-${setting.id}`}
                              />
                            )}
                            {setting.type === "select" && (
                              <Select value={setting.value as string}>
                                <SelectTrigger className="w-32">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {setting.options?.map((option) => (
                                    <SelectItem key={option} value={option}>
                                      {option}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            )}
                          </div>
                        </div>
                      ))}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Monitoring Tab */}
          <TabsContent value="monitoring" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-surface border-surface-light">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Server className="w-5 h-5 text-blue-400" />
                    <span>System Health</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">CPU Usage</span>
                    <span className="text-green-400">32%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Memory</span>
                    <span className="text-green-400">2.4GB / 8GB</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Disk Space</span>
                    <span className="text-orange-400">78%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Network</span>
                    <span className="text-green-400">Normal</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-surface border-surface-light">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Database className="w-5 h-5 text-purple-400" />
                    <span>Database</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Connections</span>
                    <span className="text-green-400">45 / 100</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Query Time</span>
                    <span className="text-green-400">12ms avg</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Storage</span>
                    <span className="text-green-400">1.2GB</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Backup</span>
                    <span className="text-green-400">2h ago</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-surface border-surface-light">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Activity className="w-5 h-5 text-green-400" />
                    <span>Activity</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Active Users</span>
                    <span className="text-green-400">{users.filter(u => u.isActive).length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">API Calls/hr</span>
                    <span className="text-green-400">1,247</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Failed Logins</span>
                    <span className="text-orange-400">3</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Incidents</span>
                    <span className="text-red-400">1</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Audit Logs Tab */}
          <TabsContent value="audit" className="space-y-6">
            <Card className="bg-surface border-surface-light">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Audit Trail</CardTitle>
                  <div className="flex space-x-2">
                    <Button variant="outline" data-testid="export-logs">
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {/* Mock audit logs since the query might be empty */}
                  {[
                    {
                      id: "1",
                      userId: "admin-1",
                      action: "user_created",
                      resource: "users",
                      details: { email: "new.user@example.com" },
                      timestamp: new Date(Date.now() - 3600000),
                      ipAddress: "192.168.1.100",
                      userAgent: "Mozilla/5.0..."
                    },
                    {
                      id: "2",
                      userId: "admin-1",
                      action: "settings_updated",
                      resource: "system",
                      details: { setting: "mfa_required", value: true },
                      timestamp: new Date(Date.now() - 7200000),
                      ipAddress: "192.168.1.100",
                      userAgent: "Mozilla/5.0..."
                    }
                  ].map((log) => (
                    <div key={log.id} className="flex items-center justify-between p-3 bg-background rounded-lg border border-surface-light">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-interactive/20 rounded-lg flex items-center justify-center">
                          <Clock className="w-4 h-4 text-interactive" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white">
                            {log.action.replace("_", " ").toUpperCase()}
                          </p>
                          <p className="text-xs text-gray-400">
                            {log.resource} • {new Date(log.timestamp).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <div className="text-right text-xs text-gray-400">
                        <p>IP: {log.ipAddress}</p>
                        <p>User: {log.userId}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Create User Dialog */}
      <Dialog open={isCreatingUser} onOpenChange={setIsCreatingUser}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create New User</DialogTitle>
          </DialogHeader>
          <form onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            createUserMutation.mutate({
              firstName: formData.get("firstName"),
              lastName: formData.get("lastName"),
              email: formData.get("email"),
              role: formData.get("role"),
              organization: formData.get("organization"),
              planType: formData.get("planType")
            });
          }} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">First Name</label>
                <Input name="firstName" required placeholder="John" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Last Name</label>
                <Input name="lastName" required placeholder="Doe" />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <Input name="email" type="email" required placeholder="john.doe@example.com" />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Role</label>
                <Select name="role" required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user">User</SelectItem>
                    <SelectItem value="faculty">Faculty</SelectItem>
                    <SelectItem value="student">Student</SelectItem>
                    <SelectItem value="security_officer">Security Officer</SelectItem>
                    <SelectItem value="compliance_officer">Compliance Officer</SelectItem>
                    <SelectItem value="admin">Administrator</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Plan Type</label>
                <Select name="planType">
                  <SelectTrigger>
                    <SelectValue placeholder="Select plan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="standard">Standard</SelectItem>
                    <SelectItem value="enterprise">Enterprise</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Organization</label>
              <Input name="organization" placeholder="Organization name" />
            </div>
            
            <div className="flex justify-end space-x-3">
              <Button type="button" variant="outline" onClick={() => setIsCreatingUser(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-interactive hover:bg-orange-600">
                Create User
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}