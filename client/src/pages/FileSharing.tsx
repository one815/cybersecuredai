import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Upload, FileText, Share, Trash2, Download, Lock, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function FileSharing() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: files = [], isLoading } = useQuery<any[]>({
    queryKey: ["/api/files"],
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

  const getFileIcon = (type: string) => {
    if (type.includes("pdf")) return "text-critical";
    if (type.includes("image")) return "text-success";
    if (type.includes("document") || type.includes("word")) return "text-secondary";
    return "text-interactive";
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
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
            <h2 className="text-2xl font-bold">Secure File Sharing</h2>
            <p className="text-gray-400">Upload, share, and manage encrypted files</p>
          </div>
          <Button className="bg-interactive hover:bg-orange-600" data-testid="upload-file">
            <Upload className="w-4 h-4 mr-2" />
            Upload File
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        {/* Upload Section */}
        <Card className="bg-surface glow-border mb-8">
          <CardHeader>
            <CardTitle>File Upload</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-background rounded-lg p-8 border-2 border-dashed border-surface-light hover:border-interactive transition-colors cursor-pointer">
              <div className="text-center">
                <div className="w-16 h-16 bg-interactive/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Upload className="text-interactive text-2xl" />
                </div>
                <h4 className="font-medium mb-2">Drag and drop files or click to browse</h4>
                <p className="text-gray-400 text-sm mb-4">All files are automatically encrypted with AES-256 encryption</p>
                <div className="flex items-center justify-center space-x-4 text-sm text-gray-400">
                  <div className="flex items-center space-x-1">
                    <Lock className="w-4 h-4" />
                    <span>End-to-end encrypted</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Shield className="w-4 h-4" />
                    <span>Virus scanned</span>
                  </div>
                </div>
                <Button variant="outline" className="mt-4" data-testid="browse-files">
                  Browse Files
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* File Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-surface glow-border">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-success/20 rounded-lg flex items-center justify-center">
                  <FileText className="text-success" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">{files?.length || 0}</h3>
                  <p className="text-gray-400 text-sm">Total Files</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-surface glow-border">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-interactive/20 rounded-lg flex items-center justify-center">
                  <Lock className="text-interactive" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">100%</h3>
                  <p className="text-gray-400 text-sm">Encrypted</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-surface glow-border">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                  <Share className="text-secondary" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">0</h3>
                  <p className="text-gray-400 text-sm">Shared</p>
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
                  <h3 className="text-2xl font-bold">0</h3>
                  <p className="text-gray-400 text-sm">Quarantined</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* File List */}
        <Card className="bg-surface glow-border">
          <CardHeader>
            <CardTitle>Your Files</CardTitle>
          </CardHeader>
          <CardContent>
            {!files || files.length === 0 ? (
              <div className="text-center py-12">
                <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No files uploaded</h3>
                <p className="text-gray-400 mb-4">Upload your first secure file to get started</p>
                <Button className="bg-interactive hover:bg-orange-600" data-testid="upload-first-file">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Your First File
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {files.map((file: any) => (
                  <div key={file.id} className="flex items-center justify-between p-4 bg-background rounded-lg border border-surface-light">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-interactive/20 rounded-lg flex items-center justify-center">
                        <FileText className={getFileIcon(file.type)} />
                      </div>
                      <div>
                        <h4 className="font-medium">{file.name}</h4>
                        <div className="flex items-center space-x-4 text-sm text-gray-400">
                          <span>{formatFileSize(file.size)}</span>
                          <span>•</span>
                          <span>Uploaded {new Date(file.uploadedAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge 
                        variant="outline" 
                        className={file.encryptionStatus === "encrypted" ? "text-success border-success" : "text-interactive border-interactive"}
                      >
                        {file.encryptionStatus === "encrypted" ? "AES-256" : "Processing"}
                      </Badge>
                      <Badge 
                        variant="outline" 
                        className={
                          file.accessLevel === "private" ? "text-critical border-critical" :
                          file.accessLevel === "public" ? "text-success border-success" :
                          "text-interactive border-interactive"
                        }
                      >
                        {file.accessLevel.charAt(0).toUpperCase() + file.accessLevel.slice(1)}
                      </Badge>
                      <div className="flex space-x-1">
                        <Button variant="ghost" size="sm" data-testid={`download-${file.id}`}>
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" data-testid={`share-${file.id}`}>
                          <Share className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => deleteFileMutation.mutate(file.id)}
                          disabled={deleteFileMutation.isPending}
                          data-testid={`delete-${file.id}`}
                        >
                          <Trash2 className="w-4 h-4 text-critical" />
                        </Button>
                      </div>
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
