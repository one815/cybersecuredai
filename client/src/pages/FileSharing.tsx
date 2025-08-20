import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Upload, 
  FileText, 
  Share, 
  Trash2, 
  Download, 
  Lock, 
  Shield, 
  Settings,
  Filter,
  Search,
  ChevronDown,
  Eye,
  Edit3,
  Link,
  Copy,
  MoreHorizontal,
  Users,
  Calendar,
  Bell,
  X,
  Plus
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function FileSharing() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [encryptionLevel, setEncryptionLevel] = useState("AES-256");
  const [accessExpiration, setAccessExpiration] = useState("7");
  const [passwordProtection, setPasswordProtection] = useState(false);
  const [preventDownloads, setPreventDownloads] = useState(false);
  const [linkAccess, setLinkAccess] = useState(false);
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserPermission, setNewUserPermission] = useState("Can view");

  const { data: files = [], isLoading } = useQuery<any[]>({
    queryKey: ["/api/files"],
  });

  const { data: users = [] } = useQuery<any[]>({
    queryKey: ["/api/users"],
  });

  const deleteFileMutation = useMutation({
    mutationFn: async (fileId: string) => {
      const response = await fetch(`/api/files/${fileId}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete file");
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/files"] });
      toast({
        title: "File deleted",
        description: "File has been securely deleted from the system.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete file. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Mock data matching the design
  const mockSecureFiles = [
    {
      id: "file-1",
      name: "Q2_Financial_Report.pdf",
      size: "2.4 MB",
      uploadedAt: "today",
      securityStatus: "AES-256 Encrypted",
      sharedWith: [
        { id: "user-1", name: "Alex Morgan", avatar: "/api/placeholder/32/32", count: "+2" }
      ],
      expiration: "6 days left",
      type: "pdf"
    },
    {
      id: "file-2", 
      name: "Product_Mockups_Final.png",
      size: "8.7 MB",
      uploadedAt: "yesterday",
      securityStatus: "AES-256 Encrypted",
      sharedWith: [
        { id: "user-2", name: "Sarah Johnson", avatar: "/api/placeholder/32/32" }
      ],
      expiration: "13 days left",
      type: "image"
    },
    {
      id: "file-3",
      name: "Security_Protocol_v2.docx", 
      size: "1.2 MB",
      uploadedAt: "3 days ago",
      securityStatus: "Password Protected",
      sharedWith: [
        { id: "user-3", name: "Mark Williams", avatar: "/api/placeholder/32/32" },
        { id: "user-4", name: "Emma Davis", avatar: "/api/placeholder/32/32" }
      ],
      expiration: "2 days left",
      type: "document"
    }
  ];

  const mockSharedWithMe = [
    {
      id: "shared-1",
      name: "Cybersecurity_Report_2023.pdf",
      size: "4.2 MB",
      sharedBy: "Sarah Chen",
      status: "Encrypted",
      expiration: "Expires in 5 days"
    },
    {
      id: "shared-2",
      name: "Security_Metrics_Q2.xlsx",
      size: "1.8 MB", 
      sharedBy: "Michael Wong",
      status: "Encrypted",
      expiration: "Expires in 12 days"
    },
    {
      id: "shared-3",
      name: "Threat_Analysis_Presentation.pptx",
      size: "6.7 MB",
      sharedBy: "David Kim",
      status: "Password Protected",
      expiration: "Expires tomorrow"
    }
  ];

  const selectedFileData = selectedFile || mockSecureFiles[0];

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const getFileIcon = (type: string) => {
    if (type === "pdf") return <FileText className="w-5 h-5 text-red-400" />;
    if (type === "image") return <FileText className="w-5 h-5 text-blue-400" />;
    if (type === "document") return <FileText className="w-5 h-5 text-blue-400" />;
    return <FileText className="w-5 h-5 text-gray-400" />;
  };

  const addUser = () => {
    if (newUserEmail) {
      toast({
        title: "User Added",
        description: `Shared with ${newUserEmail} (${newUserPermission})`
      });
      setNewUserEmail("");
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
    <div className="h-screen bg-background">
      {/* Header */}
      <header className="bg-surface border-b border-surface-light p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h2 className="text-2xl font-bold">Secure File Sharing</h2>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                Security Status: Protected
              </Badge>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Input
                placeholder="Search files..."
                className="w-64 pl-10"
                data-testid="search-files"
              />
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            </div>
            <Button className="bg-interactive hover:bg-orange-600" data-testid="notifications">
              <Bell className="w-4 h-4" />
            </Button>
            <Button className="bg-interactive hover:bg-orange-600" data-testid="settings">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex h-[calc(100vh-80px)]">
        {/* Left Main Area */}
        <div className="flex-1 p-6 pr-3 overflow-y-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Secure File Upload */}
            <div className="lg:col-span-2">
              <Card className="bg-surface border border-cyan-500/30 cyber-glow h-full">
                <CardHeader>
                  <CardTitle className="text-cyan-400">Secure File Upload</CardTitle>
                  <p className="text-sm text-gray-400">Drag and drop files or click to browse. All files are automatically encrypted.</p>
                </CardHeader>
                <CardContent>
                  <div className="bg-background/50 rounded-lg p-8 border-2 border-dashed border-cyan-500/50 hover:border-cyan-400 transition-colors cursor-pointer">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Upload className="w-8 h-8 text-cyan-400" />
                      </div>
                      <h4 className="font-medium mb-2 text-white">Drag files here or browse</h4>
                      <p className="text-gray-400 text-sm mb-4">Supported formats: PDF, DOCX, XLSX, JPG, PNG (Max 100MB)</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Security Settings */}
            <div>
              <Card className="bg-surface border border-green-500/30 cyber-glow h-full">
                <CardHeader>
                  <CardTitle className="text-green-400 flex items-center space-x-2">
                    <Shield className="w-5 h-5" />
                    <span>Security Settings</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-sm text-gray-400">Encryption Level</Label>
                    <Select value={encryptionLevel} onValueChange={setEncryptionLevel}>
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="AES-256">AES-256 (Recommended)</SelectItem>
                        <SelectItem value="AES-192">AES-192</SelectItem>
                        <SelectItem value="AES-128">AES-128</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-sm text-gray-400">Access Expiration</Label>
                    <Select value={accessExpiration} onValueChange={setAccessExpiration}>
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 day</SelectItem>
                        <SelectItem value="7">7 days</SelectItem>
                        <SelectItem value="30">30 days</SelectItem>
                        <SelectItem value="never">Never</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <Label className="text-sm text-gray-400">Password protection</Label>
                    <Checkbox 
                      checked={passwordProtection} 
                      onCheckedChange={setPasswordProtection}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label className="text-sm text-gray-400">Prevent downloads</Label>
                    <Checkbox 
                      checked={preventDownloads} 
                      onCheckedChange={setPreventDownloads}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Recent Secure Files */}
          <Card className="bg-surface border-surface-light cyber-glow mb-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Recent Secure Files</CardTitle>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                  <Button variant="outline" size="sm">
                    Sort
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>File Name</TableHead>
                    <TableHead>Security Status</TableHead>
                    <TableHead>Shared With</TableHead>
                    <TableHead>Expiration</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockSecureFiles.map((file) => (
                    <TableRow 
                      key={file.id} 
                      className="cursor-pointer hover:bg-surface-light/50"
                      onClick={() => setSelectedFile(file)}
                    >
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          {getFileIcon(file.type)}
                          <div>
                            <p className="font-medium text-white">{file.name}</p>
                            <p className="text-sm text-gray-400">{file.size} • Uploaded {file.uploadedAt}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={file.securityStatus.includes('AES') ? 'bg-green-500/20 text-green-400' : 'bg-orange-500/20 text-orange-400'}>
                          {file.securityStatus.includes('AES') ? 'AES-256 Encrypted' : 'Password Protected'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          {file.sharedWith.map((user, index) => (
                            <Avatar key={index} className="w-6 h-6">
                              <AvatarImage src={user.avatar} />
                              <AvatarFallback className="text-xs">{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                          ))}
                          {file.sharedWith[0]?.count && (
                            <span className="text-sm text-gray-400">{file.sharedWith[0].count}</span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-gray-400">{file.expiration}</span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <Button variant="ghost" size="sm">
                            <Share className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit3 className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Shared With Me */}
          <Card className="bg-surface border-surface-light cyber-glow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Shared With Me</CardTitle>
                <Button variant="link" className="text-cyan-400">
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {mockSharedWithMe.map((file) => (
                  <div key={file.id} className="p-4 bg-background/50 rounded-lg border border-surface-light">
                    <div className="flex items-center space-x-3 mb-3">
                      {getFileIcon('pdf')}
                      <div className="flex-1">
                        <p className="font-medium text-white text-sm">{file.name}</p>
                        <p className="text-xs text-gray-400">{file.size} • Shared by {file.sharedBy}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <Badge className={file.status === 'Encrypted' ? 'bg-green-500/20 text-green-400' : 'bg-orange-500/20 text-orange-400'}>
                        {file.status}
                      </Badge>
                      <span className="text-xs text-gray-400">{file.expiration}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar */}
        <div className="w-80 bg-surface border-l border-surface-light p-6 overflow-y-auto">
          {/* Share File Button */}
          <Button className="w-full bg-interactive hover:bg-orange-600 mb-6" data-testid="share-file">
            <div className="text-center">
              <div className="font-medium">Share File</div>
              <div className="text-xs opacity-75">Configure security settings before sharing</div>
            </div>
          </Button>

          {/* Current File Info */}
          <Card className="bg-background/50 border-surface-light mb-6">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3 mb-3">
                {getFileIcon('pdf')}
                <div>
                  <p className="font-medium text-white">{selectedFileData.name}</p>
                  <p className="text-sm text-gray-400">{selectedFileData.size} • Uploaded {selectedFileData.uploadedAt}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Security Status */}
          <Card className="bg-background/50 border-surface-light mb-6">
            <CardHeader>
              <CardTitle className="text-sm">Security Status</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Encryption</span>
                  <Badge className="bg-green-500/20 text-green-400">AES-256</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Access Control</span>
                  <Badge className="bg-blue-500/20 text-blue-400">Enabled</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Password Protection</span>
                  <Badge className="bg-gray-500/20 text-gray-400">Disabled</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* People with Access */}
          <Card className="bg-background/50 border-surface-light mb-6">
            <CardHeader>
              <CardTitle className="text-sm">People with Access</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback>AM</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium text-white">Alex Morgan (You)</p>
                      <p className="text-xs text-gray-400">alex.morgan@company.com</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs">Owner</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback>SJ</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium text-white">Sarah Johnson</p>
                      <p className="text-xs text-gray-400">sarah@company.com</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs">Editor</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback>MW</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium text-white">Mark Williams</p>
                      <p className="text-xs text-gray-400">mark.w@company.com</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs">Viewer</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Add People */}
          <Card className="bg-background/50 border-surface-light mb-6">
            <CardHeader>
              <CardTitle className="text-sm">Add People</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Input
                    placeholder="Email address or name"
                    value={newUserEmail}
                    onChange={(e) => setNewUserEmail(e.target.value)}
                    className="flex-1"
                  />
                  <Button size="sm" onClick={addUser}>
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <Select value={newUserPermission} onValueChange={setNewUserPermission}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Can view">Can view</SelectItem>
                    <SelectItem value="Can edit">Can edit</SelectItem>
                    <SelectItem value="Can comment">Can comment</SelectItem>
                  </SelectContent>
                </Select>
                <Button className="w-full bg-interactive hover:bg-orange-600">
                  Add
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* General Access */}
          <Card className="bg-background/50 border-surface-light mb-6">
            <CardHeader>
              <CardTitle className="text-sm">General Access</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Link className="w-4 h-4 text-orange-400" />
                    <span className="text-sm text-gray-400">Anyone with the link</span>
                  </div>
                  <Switch checked={linkAccess} onCheckedChange={setLinkAccess} />
                </div>
                {linkAccess && (
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Input
                        value="https://secure.cybersecureai..."
                        readOnly
                        className="flex-1 text-xs"
                      />
                      <Button size="sm" variant="outline">
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                    <Select value="Viewer" onValueChange={() => {}}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Viewer">Viewer</SelectItem>
                        <SelectItem value="Editor">Editor</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Advanced Settings */}
          <Card className="bg-background/50 border-surface-light">
            <CardHeader>
              <CardTitle className="text-sm">Advanced Settings</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Download restrictions</span>
                  <Switch checked={preventDownloads} onCheckedChange={setPreventDownloads} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Watermark files</span>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Track access</span>
                  <Switch defaultChecked />
                </div>
                <Separator className="my-4" />
                <div className="space-y-2">
                  <Button variant="outline" className="w-full" size="sm">
                    Cancel
                  </Button>
                  <Button className="w-full bg-interactive hover:bg-orange-600" size="sm">
                    Save & Share
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}