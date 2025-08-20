import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Users, UserPlus, Search, Filter, MoreVertical, Edit, Trash2, Shield, Mail, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { User } from "@shared/schema";

export default function UserManagement() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: users, isLoading } = useQuery<User[]>({
    queryKey: ["/api/users"],
  });

  const deleteUserMutation = useMutation({
    mutationFn: async (userId: string) => {
      const response = await fetch(`/api/users/${userId}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete user");
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/users"] });
      toast({
        title: "User deleted",
        description: "User has been successfully removed from the system.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete user. Please try again.",
        variant: "destructive",
      });
    },
  });

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin": return "bg-critical text-white";
      case "faculty": return "bg-interactive text-white";
      case "student": return "bg-success text-white";
      case "compliance_officer": return "bg-primary text-secondary";
      default: return "bg-gray-500 text-white";
    }
  };

  const getStatusColor = (isActive: boolean) => {
    return isActive ? "text-success border-success" : "text-critical border-critical";
  };

  const formatLastLogin = (lastLogin: string | null) => {
    if (!lastLogin) return "Never";
    const date = new Date(lastLogin);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)} days ago`;
    return date.toLocaleDateString();
  };

  const getUserInitials = (firstName: string | null, lastName: string | null) => {
    const first = firstName?.charAt(0) || "";
    const last = lastName?.charAt(0) || "";
    return (first + last).toUpperCase() || "U";
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

  const activeUsers = users?.filter(user => user.isActive).length || 0;
  const inactiveUsers = users?.filter(user => !user.isActive).length || 0;
  const adminUsers = users?.filter(user => user.role === "admin").length || 0;

  return (
    <div>
      {/* Header */}
      <header className="bg-surface border-b border-surface-light p-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold flex items-center space-x-2 geometric-text">
              <span>User Management</span>
              <Users className="w-6 h-6 text-blue-400" />
              <Shield className="w-6 h-6 text-green-400" />
            </h2>
            <p className="text-gray-400 cyber-font">Manage users, roles, and access permissions</p>
          </div>
          <Button className="bg-interactive hover:bg-orange-600" data-testid="add-user">
            <UserPlus className="w-4 h-4 mr-2" />
            Add User
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        {/* User Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-surface glow-border">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-success/20 rounded-lg flex items-center justify-center">
                  <Users className="text-success" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold tech-font">{users?.length || 0}</h3>
                  <p className="text-gray-400 text-sm">Total Users</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-surface glow-border">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-interactive/20 rounded-lg flex items-center justify-center">
                  <Users className="text-interactive" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">{activeUsers}</h3>
                  <p className="text-gray-400 text-sm">Active Users</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-surface glow-border">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-critical/20 rounded-lg flex items-center justify-center">
                  <Shield className="text-critical" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">{adminUsers}</h3>
                  <p className="text-gray-400 text-sm">Administrators</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-surface glow-border">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-muted/20 rounded-lg flex items-center justify-center">
                  <Users className="text-muted-foreground" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">{inactiveUsers}</h3>
                  <p className="text-gray-400 text-sm">Inactive Users</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <Card className="bg-surface glow-border mb-8">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="relative flex-1">
                <Input
                  type="text"
                  placeholder="Search users by name, email, or role..."
                  className="bg-background border-surface-light pl-10"
                  data-testid="search-users"
                />
                <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              </div>
              <Button variant="outline" className="border-surface-light" data-testid="filter-users">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* User List */}
        <Card className="bg-surface glow-border">
          <CardHeader>
            <CardTitle>Users</CardTitle>
          </CardHeader>
          <CardContent>
            {!users || users.length === 0 ? (
              <div className="text-center py-12">
                <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No users found</h3>
                <p className="text-gray-400 mb-4">Start by adding your first user to the system</p>
                <Button className="bg-interactive hover:bg-orange-600" data-testid="add-first-user">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Add First User
                </Button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-surface-light">
                      <th className="text-left py-3 px-4 font-medium text-gray-400">User</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-400">Role</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-400">Organization</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-400">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-400">Last Login</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-400">MFA</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-400">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-light">
                    {users.map((user) => (
                      <tr key={user.id} className="hover:bg-background/50">
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-3">
                            <Avatar className="w-10 h-10">
                              <AvatarImage src={user.profileImageUrl || undefined} />
                              <AvatarFallback className="bg-primary text-secondary">
                                {getUserInitials(user.firstName, user.lastName)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">
                                {user.firstName} {user.lastName}
                              </p>
                              <div className="flex items-center space-x-2 text-gray-400 text-sm">
                                <Mail className="w-3 h-3" />
                                <span>{user.email}</span>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <Badge className={getRoleColor(user.role)}>
                            {user.role.replace('_', ' ').toUpperCase()}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-gray-400">
                          {user.organization || "Not specified"}
                        </td>
                        <td className="py-3 px-4">
                          <Badge variant="outline" className={getStatusColor(user.isActive || false)}>
                            {user.isActive ? "Active" : "Inactive"}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-gray-400 text-sm">
                          {formatLastLogin(user.lastLogin?.toString() || null)}
                        </td>
                        <td className="py-3 px-4">
                          <Badge 
                            variant="outline" 
                            className={user.mfaEnabled ? "text-success border-success" : "text-critical border-critical"}
                          >
                            {user.mfaEnabled ? "Enabled" : "Disabled"}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" data-testid={`user-actions-${user.id}`}>
                                <MoreVertical className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="bg-surface border-surface-light">
                              <DropdownMenuItem className="hover:bg-background">
                                <Edit className="w-4 h-4 mr-2" />
                                Edit User
                              </DropdownMenuItem>
                              <DropdownMenuItem className="hover:bg-background">
                                <Shield className="w-4 h-4 mr-2" />
                                Reset Password
                              </DropdownMenuItem>
                              <DropdownMenuItem className="hover:bg-background">
                                <Mail className="w-4 h-4 mr-2" />
                                Send Invitation
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                className="hover:bg-background text-critical"
                                onClick={() => deleteUserMutation.mutate(user.id)}
                                disabled={deleteUserMutation.isPending}
                              >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete User
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
