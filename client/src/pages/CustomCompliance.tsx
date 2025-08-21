import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Settings, Trash2, Edit, FileText, Shield, AlertTriangle } from "lucide-react";
import { z } from "zod";
import { apiRequest } from "@/lib/queryClient";

// Types for custom compliance
interface CustomComplianceFramework {
  id: string;
  organizationId: string;
  frameworkId: string;
  name: string;
  fullName: string;
  description: string | null;
  sector: string;
  version: string;
  isActive: boolean;
  createdBy: string;
  lastModifiedBy: string | null;
  createdAt: string;
  updatedAt: string;
}

interface CustomComplianceControl {
  id: string;
  frameworkId: string;
  controlId: string;
  title: string;
  description: string;
  category: string;
  priority: string;
  implementation: string;
  requiredEvidence: string[];
  testMethods: string[];
  complianceStatement: string | null;
  implementationGuidance: string | null;
  assessmentCriteria: string | null;
  isActive: boolean;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

const frameworkSchema = z.object({
  frameworkId: z.string().min(1, "Framework ID is required").regex(/^[a-z0-9-]+$/, "Framework ID must be lowercase alphanumeric with hyphens"),
  name: z.string().min(1, "Name is required"),
  fullName: z.string().min(1, "Full name is required"),
  description: z.string().optional(),
  sector: z.string().default("custom"),
  version: z.string().default("1.0"),
});

const controlSchema = z.object({
  controlId: z.string().min(1, "Control ID is required"),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  category: z.string().default("custom"),
  priority: z.string().default("medium"),
  implementation: z.string().default("manual"),
  complianceStatement: z.string().optional(),
  implementationGuidance: z.string().optional(),
  assessmentCriteria: z.string().optional(),
});

export default function CustomCompliance() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedFramework, setSelectedFramework] = useState<CustomComplianceFramework | null>(null);
  const [showFrameworkDialog, setShowFrameworkDialog] = useState(false);
  const [showControlDialog, setShowControlDialog] = useState(false);
  const [editingFramework, setEditingFramework] = useState<CustomComplianceFramework | null>(null);

  const organizationId = "admin-1"; // In real app, get from auth context

  // Check if user has enterprise access
  const { data: userAccessLevel } = useQuery({
    queryKey: ['/api/auth/user', 'accessLevel'],
    queryFn: async () => {
      const response = await apiRequest('GET', '/api/auth/user');
      const user = await response.json() as any;
      // Simulate enterprise access check - in real app, this would come from backend
      return user.planType?.includes('enterprise') ? 'enterprise' : 'standard';
    }
  });

  // Fetch custom frameworks
  const { data: frameworks = [], isLoading: frameworksLoading } = useQuery({
    queryKey: ['/api/compliance/custom/frameworks', organizationId],
    queryFn: async () => {
      const response = await apiRequest('GET', `/api/compliance/custom/frameworks/${organizationId}`);
      const data = await response.json();
      return Array.isArray(data) ? data : [];
    },
    enabled: userAccessLevel === 'enterprise'
  });

  // Fetch controls for selected framework
  const { data: controls = [] } = useQuery({
    queryKey: ['/api/compliance/custom/controls', selectedFramework?.frameworkId],
    queryFn: async () => {
      const response = await apiRequest('GET', `/api/compliance/custom/controls/${selectedFramework?.frameworkId}`);
      const data = await response.json();
      return Array.isArray(data) ? data : [];
    },
    enabled: !!selectedFramework
  });

  // Framework form
  const frameworkForm = useForm({
    resolver: zodResolver(frameworkSchema),
    defaultValues: {
      frameworkId: "",
      name: "",
      fullName: "",
      description: "",
      sector: "custom",
      version: "1.0",
    }
  });

  // Control form
  const controlForm = useForm({
    resolver: zodResolver(controlSchema),
    defaultValues: {
      controlId: "",
      title: "",
      description: "",
      category: "custom",
      priority: "medium",
      implementation: "manual",
      complianceStatement: "",
      implementationGuidance: "",
      assessmentCriteria: "",
    }
  });

  // Create framework mutation
  const createFrameworkMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await apiRequest('POST', '/api/compliance/custom/frameworks', { 
        ...data, 
        organizationId, 
        createdBy: organizationId 
      });
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/compliance/custom/frameworks'] });
      setShowFrameworkDialog(false);
      frameworkForm.reset();
      toast({
        title: "Framework Created",
        description: "Your custom compliance framework has been created successfully."
      });
    },
    onError: (error: any) => {
      toast({
        title: "Creation Failed",
        description: error.message || "Failed to create framework",
        variant: "destructive"
      });
    }
  });

  // Create control mutation
  const createControlMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await apiRequest('POST', '/api/compliance/custom/controls', { 
        ...data, 
        frameworkId: selectedFramework?.frameworkId,
        createdBy: organizationId,
        requiredEvidence: [],
        testMethods: []
      });
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/compliance/custom/controls'] });
      setShowControlDialog(false);
      controlForm.reset();
      toast({
        title: "Control Created",
        description: "Your custom compliance control has been created successfully."
      });
    },
    onError: (error: any) => {
      toast({
        title: "Creation Failed",
        description: error.message || "Failed to create control",
        variant: "destructive"
      });
    }
  });

  // Delete framework mutation
  const deleteFrameworkMutation = useMutation({
    mutationFn: async (frameworkId: string) => {
      const response = await apiRequest('DELETE', `/api/compliance/custom/framework/${frameworkId}`);
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/compliance/custom/frameworks'] });
      setSelectedFramework(null);
      toast({
        title: "Framework Deleted",
        description: "The custom compliance framework has been deleted."
      });
    }
  });

  if (userAccessLevel !== 'enterprise') {
    return (
      <div className="container mx-auto py-8">
        <Card className="max-w-2xl mx-auto">
          <CardContent className="pt-6">
            <div className="text-center">
              <Shield className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-2xl font-semibold mb-2">Enterprise Feature</h2>
              <p className="text-muted-foreground mb-6">
                Custom Compliance Frameworks are available exclusively for Enterprise plan customers.
                Create your own compliance frameworks tailored to your organization's specific needs.
              </p>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold mb-2">🎯 Custom Frameworks</h3>
                    <p className="text-sm text-muted-foreground">Build compliance frameworks specific to your industry or regulatory requirements</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold mb-2">⚙️ Custom Controls</h3>
                    <p className="text-sm text-muted-foreground">Define your own security controls and assessment criteria</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold mb-2">📊 Automated Assessment</h3>
                    <p className="text-sm text-muted-foreground">Run automated compliance assessments on your custom frameworks</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold mb-2">🏆 Achievement Tracking</h3>
                    <p className="text-sm text-muted-foreground">Earn custom badges and track progress on your own compliance goals</p>
                  </div>
                </div>
                <Button className="w-full max-w-xs" data-testid="button-upgrade">
                  Upgrade to Enterprise
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Custom Compliance</h1>
          <p className="text-muted-foreground">
            Create and manage your own compliance frameworks and controls
          </p>
        </div>
        <Dialog open={showFrameworkDialog} onOpenChange={setShowFrameworkDialog}>
          <DialogTrigger asChild>
            <Button data-testid="button-create-framework">
              <Plus className="h-4 w-4 mr-2" />
              Create Framework
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Create Custom Compliance Framework</DialogTitle>
              <DialogDescription>
                Define a new compliance framework for your organization
              </DialogDescription>
            </DialogHeader>
            <Form {...frameworkForm}>
              <form onSubmit={frameworkForm.handleSubmit((data) => createFrameworkMutation.mutate(data))} className="space-y-4">
                <FormField
                  control={frameworkForm.control}
                  name="frameworkId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Framework ID</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., acme-security-2024" {...field} data-testid="input-framework-id" />
                      </FormControl>
                      <FormDescription>
                        Unique identifier for your framework (lowercase, alphanumeric, hyphens only)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={frameworkForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="ACME Security Framework" {...field} data-testid="input-framework-name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={frameworkForm.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="ACME Corporation Security and Compliance Framework" {...field} data-testid="input-framework-fullname" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={frameworkForm.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe the purpose and scope of this compliance framework..."
                          {...field} 
                          data-testid="input-framework-description"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-end space-x-2 pt-4">
                  <Button type="button" variant="outline" onClick={() => setShowFrameworkDialog(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={createFrameworkMutation.isPending} data-testid="button-submit-framework">
                    {createFrameworkMutation.isPending ? "Creating..." : "Create Framework"}
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Frameworks List */}
        <div className="lg:col-span-1 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Your Frameworks</CardTitle>
              <CardDescription>
                {frameworks.length} custom framework{frameworks.length !== 1 ? 's' : ''}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {frameworksLoading ? (
                <div className="text-center py-4 text-muted-foreground">Loading frameworks...</div>
              ) : frameworks.length === 0 ? (
                <div className="text-center py-8">
                  <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No custom frameworks yet</p>
                  <p className="text-sm text-muted-foreground">Create your first framework to get started</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {frameworks.map((framework: CustomComplianceFramework) => (
                    <Card 
                      key={framework.frameworkId}
                      className={`cursor-pointer transition-colors ${
                        selectedFramework?.frameworkId === framework.frameworkId ? 'ring-2 ring-primary' : ''
                      }`}
                      onClick={() => setSelectedFramework(framework)}
                      data-testid={`card-framework-${framework.frameworkId}`}
                    >
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h3 className="font-semibold">{framework.name}</h3>
                            <p className="text-sm text-muted-foreground">{framework.frameworkId}</p>
                            <Badge variant={framework.isActive ? "default" : "secondary"} className="mt-2">
                              {framework.isActive ? "Active" : "Inactive"}
                            </Badge>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteFrameworkMutation.mutate(framework.frameworkId);
                            }}
                            data-testid={`button-delete-framework-${framework.frameworkId}`}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Framework Details */}
        <div className="lg:col-span-2">
          {selectedFramework ? (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{selectedFramework.name}</CardTitle>
                      <CardDescription>{selectedFramework.fullName}</CardDescription>
                    </div>
                    <Badge variant={selectedFramework.isActive ? "default" : "secondary"}>
                      {selectedFramework.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  {selectedFramework.description && (
                    <p className="text-muted-foreground mb-4">{selectedFramework.description}</p>
                  )}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Framework ID:</span>
                      <span className="ml-2 font-mono">{selectedFramework.frameworkId}</span>
                    </div>
                    <div>
                      <span className="font-medium">Version:</span>
                      <span className="ml-2">{selectedFramework.version}</span>
                    </div>
                    <div>
                      <span className="font-medium">Sector:</span>
                      <span className="ml-2 capitalize">{selectedFramework.sector}</span>
                    </div>
                    <div>
                      <span className="font-medium">Created:</span>
                      <span className="ml-2">{new Date(selectedFramework.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Controls</CardTitle>
                      <CardDescription>
                        {controls.length} control{controls.length !== 1 ? 's' : ''} defined
                      </CardDescription>
                    </div>
                    <Dialog open={showControlDialog} onOpenChange={setShowControlDialog}>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" data-testid="button-add-control">
                          <Plus className="h-4 w-4 mr-2" />
                          Add Control
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[700px]">
                        <DialogHeader>
                          <DialogTitle>Add Control to {selectedFramework.name}</DialogTitle>
                          <DialogDescription>
                            Define a new compliance control for this framework
                          </DialogDescription>
                        </DialogHeader>
                        <Form {...controlForm}>
                          <form onSubmit={controlForm.handleSubmit((data) => createControlMutation.mutate(data))} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <FormField
                                control={controlForm.control}
                                name="controlId"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Control ID</FormLabel>
                                    <FormControl>
                                      <Input placeholder="e.g., ACME-AC-001" {...field} data-testid="input-control-id" />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={controlForm.control}
                                name="priority"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Priority</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                      <FormControl>
                                        <SelectTrigger data-testid="select-control-priority">
                                          <SelectValue placeholder="Select priority" />
                                        </SelectTrigger>
                                      </FormControl>
                                      <SelectContent>
                                        <SelectItem value="critical">Critical</SelectItem>
                                        <SelectItem value="high">High</SelectItem>
                                        <SelectItem value="medium">Medium</SelectItem>
                                        <SelectItem value="low">Low</SelectItem>
                                      </SelectContent>
                                    </Select>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                            <FormField
                              control={controlForm.control}
                              name="title"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Title</FormLabel>
                                  <FormControl>
                                    <Input placeholder="e.g., Access Control Management" {...field} data-testid="input-control-title" />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={controlForm.control}
                              name="description"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Description</FormLabel>
                                  <FormControl>
                                    <Textarea 
                                      placeholder="Describe what this control requires..."
                                      {...field} 
                                      data-testid="input-control-description"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={controlForm.control}
                              name="complianceStatement"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Compliance Statement (Optional)</FormLabel>
                                  <FormControl>
                                    <Textarea 
                                      placeholder="What needs to be achieved for compliance..."
                                      {...field}
                                      data-testid="input-control-statement"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <div className="flex justify-end space-x-2 pt-4">
                              <Button type="button" variant="outline" onClick={() => setShowControlDialog(false)}>
                                Cancel
                              </Button>
                              <Button type="submit" disabled={createControlMutation.isPending} data-testid="button-submit-control">
                                {createControlMutation.isPending ? "Creating..." : "Add Control"}
                              </Button>
                            </div>
                          </form>
                        </Form>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardHeader>
                <CardContent>
                  {controls.length === 0 ? (
                    <div className="text-center py-8">
                      <Settings className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">No controls defined</p>
                      <p className="text-sm text-muted-foreground">Add your first control to this framework</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {controls.map((control: CustomComplianceControl) => (
                        <Card key={control.id} data-testid={`card-control-${control.controlId}`}>
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <span className="font-mono text-sm bg-muted px-2 py-1 rounded">{control.controlId}</span>
                                  <Badge variant={
                                    control.priority === 'critical' ? 'destructive' :
                                    control.priority === 'high' ? 'default' :
                                    control.priority === 'medium' ? 'secondary' : 'outline'
                                  }>
                                    {control.priority}
                                  </Badge>
                                </div>
                                <h4 className="font-semibold">{control.title}</h4>
                                <p className="text-sm text-muted-foreground mt-1">{control.description}</p>
                                {control.complianceStatement && (
                                  <div className="mt-3 p-3 bg-muted rounded text-sm">
                                    <span className="font-medium">Compliance Statement: </span>
                                    {control.complianceStatement}
                                  </div>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          ) : (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center py-12">
                  <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Select a Framework</h3>
                  <p className="text-muted-foreground">
                    Choose a custom compliance framework from the list to view its details and controls
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}