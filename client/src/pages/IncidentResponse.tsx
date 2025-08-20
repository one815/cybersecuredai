import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  AlertTriangle, 
  Clock, 
  Users, 
  FileText, 
  CheckCircle, 
  PlayCircle,
  PauseCircle,
  Shield,
  Eye,
  MessageSquare,
  Upload,
  Search,
  Filter,
  Plus,
  Calendar,
  User
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

interface Incident {
  id: string;
  title: string;
  description: string;
  severity: string;
  status: string;
  assignedTo: string | null;
  reportedBy: string | null;
  reportedAt: Date;
  resolvedAt: Date | null;
  timeline: IncidentTimelineEntry[];
  evidence: IncidentEvidence[];
  response: IncidentResponse[];
}

interface IncidentTimelineEntry {
  id: string;
  timestamp: Date;
  action: string;
  user: string;
  details: string;
}

interface IncidentEvidence {
  id: string;
  type: string;
  filename: string;
  size: number;
  uploadedBy: string;
  uploadedAt: Date;
}

interface IncidentResponse {
  id: string;
  action: string;
  status: string;
  assignedTo: string;
  completedAt: Date | null;
  notes: string;
}

export default function IncidentResponse() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedIncident, setSelectedIncident] = useState<string | null>(null);
  const [isCreatingIncident, setIsCreatingIncident] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const { data: incidents = [], isLoading } = useQuery<Incident[]>({
    queryKey: ["/api/incidents"],
  });

  const { data: users = [] } = useQuery<any[]>({
    queryKey: ["/api/users"],
  });

  const createIncidentMutation = useMutation({
    mutationFn: async (incidentData: any) => {
      const response = await fetch("/api/incidents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(incidentData),
      });
      if (!response.ok) throw new Error("Failed to create incident");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/incidents"] });
      toast({
        title: "Incident Created",
        description: "New security incident has been created and assigned.",
      });
      setIsCreatingIncident(false);
    },
  });

  const updateIncidentMutation = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: any }) => {
      const response = await fetch(`/api/incidents/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
      if (!response.ok) throw new Error("Failed to update incident");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/incidents"] });
      toast({
        title: "Incident Updated",
        description: "Incident status has been updated.",
      });
    },
  });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical": return "bg-red-500 text-white";
      case "high": return "bg-orange-500 text-white";
      case "medium": return "bg-yellow-500 text-black";
      case "low": return "bg-green-500 text-white";
      default: return "bg-gray-500 text-white";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open": return "text-red-400 border-red-400";
      case "investigating": return "text-orange-400 border-orange-400";
      case "resolved": return "text-green-400 border-green-400";
      default: return "text-gray-400 border-gray-400";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "open": return AlertTriangle;
      case "investigating": return Eye;
      case "resolved": return CheckCircle;
      default: return AlertTriangle;
    }
  };

  const filteredIncidents = incidents.filter(incident => {
    const matchesSearch = incident.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         incident.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || incident.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const mockIncidents: Incident[] = [
    {
      id: "inc-1",
      title: "Suspicious Network Activity Detected",
      description: "Unusual outbound traffic detected from internal systems",
      severity: "high",
      status: "investigating",
      assignedTo: "admin-1",
      reportedBy: "system",
      reportedAt: new Date(Date.now() - 3600000),
      resolvedAt: null,
      timeline: [
        {
          id: "tl-1",
          timestamp: new Date(Date.now() - 3600000),
          action: "Incident Created",
          user: "System",
          details: "Automated detection triggered by network monitoring"
        },
        {
          id: "tl-2",
          timestamp: new Date(Date.now() - 3300000),
          action: "Assigned",
          user: "Alex Morgan",
          details: "Assigned to security team for investigation"
        }
      ],
      evidence: [
        {
          id: "ev-1",
          type: "network-log",
          filename: "network_traffic_analysis.pcap",
          size: 2456789,
          uploadedBy: "system",
          uploadedAt: new Date(Date.now() - 3500000)
        }
      ],
      response: [
        {
          id: "resp-1",
          action: "Isolate Affected Systems",
          status: "in_progress",
          assignedTo: "admin-1",
          completedAt: null,
          notes: "Quarantining suspicious endpoints"
        }
      ]
    }
  ];

  const currentIncidents = incidents.length > 0 ? filteredIncidents : mockIncidents;
  const selectedIncidentData = currentIncidents.find(inc => inc.id === selectedIncident);

  if (isLoading) {
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
            <h2 className="text-2xl font-bold">Incident Response</h2>
            <p className="text-gray-400">Manage security incidents and response workflows</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button 
              onClick={() => setIsCreatingIncident(true)}
              className="bg-interactive hover:bg-orange-600" 
              data-testid="create-incident"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Incident
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        {/* Search and Filters */}
        <div className="flex items-center space-x-4 mb-6">
          <div className="relative flex-1">
            <Input
              placeholder="Search incidents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
              data-testid="incident-search"
            />
            <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
          </div>
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-48" data-testid="status-filter">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="open">Open</SelectItem>
              <SelectItem value="investigating">Investigating</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Incidents List */}
          <div className="lg:col-span-2 space-y-4">
            <Card className="bg-surface border-surface-light">
              <CardHeader>
                <CardTitle>Active Incidents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {currentIncidents.map((incident) => {
                    const StatusIcon = getStatusIcon(incident.status);
                    return (
                      <div
                        key={incident.id}
                        className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                          selectedIncident === incident.id 
                            ? "border-interactive bg-interactive/10" 
                            : "border-surface-light hover:border-interactive/50"
                        }`}
                        onClick={() => setSelectedIncident(incident.id)}
                        data-testid={`incident-${incident.id}`}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center">
                              <StatusIcon className="w-5 h-5 text-red-400" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-white">{incident.title}</h4>
                              <p className="text-sm text-gray-400">{incident.description}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge className={getSeverityColor(incident.severity)}>
                              {incident.severity.toUpperCase()}
                            </Badge>
                            <Badge variant="outline" className={getStatusColor(incident.status)}>
                              {incident.status.replace("_", " ").toUpperCase()}
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between text-sm text-gray-400">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-1">
                              <Clock className="w-4 h-4" />
                              <span>{new Date(incident.reportedAt).toLocaleString()}</span>
                            </div>
                            {incident.assignedTo && (
                              <div className="flex items-center space-x-1">
                                <User className="w-4 h-4" />
                                <span>Assigned</span>
                              </div>
                            )}
                          </div>
                          <div className="flex items-center space-x-2">
                            <span>{incident.timeline?.length || 0} updates</span>
                            <span>{incident.evidence?.length || 0} evidence</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Incident Details */}
          <div className="space-y-4">
            {selectedIncidentData ? (
              <>
                {/* Incident Overview */}
                <Card className="bg-surface border-surface-light">
                  <CardHeader>
                    <CardTitle>Incident Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">{selectedIncidentData.title}</h4>
                      <p className="text-gray-400 text-sm">{selectedIncidentData.description}</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs text-gray-400">Severity</label>
                        <Badge className={getSeverityColor(selectedIncidentData.severity)}>
                          {selectedIncidentData.severity.toUpperCase()}
                        </Badge>
                      </div>
                      <div>
                        <label className="text-xs text-gray-400">Status</label>
                        <Badge variant="outline" className={getStatusColor(selectedIncidentData.status)}>
                          {selectedIncidentData.status.replace("_", " ").toUpperCase()}
                        </Badge>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateIncidentMutation.mutate({
                          id: selectedIncidentData.id,
                          updates: { status: "investigating" }
                        })}
                        className="flex-1"
                        data-testid="start-investigation"
                      >
                        <PlayCircle className="w-4 h-4 mr-2" />
                        Investigate
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateIncidentMutation.mutate({
                          id: selectedIncidentData.id,
                          updates: { status: "resolved", resolvedAt: new Date() }
                        })}
                        className="flex-1"
                        data-testid="resolve-incident"
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Resolve
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Timeline */}
                <Card className="bg-surface border-surface-light">
                  <CardHeader>
                    <CardTitle>Timeline</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {selectedIncidentData.timeline?.map((entry) => (
                        <div key={entry.id} className="flex items-start space-x-3 p-3 bg-background rounded-lg">
                          <div className="w-8 h-8 bg-interactive/20 rounded-full flex items-center justify-center mt-1">
                            <Clock className="w-4 h-4 text-interactive" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-medium text-sm">{entry.action}</span>
                              <span className="text-xs text-gray-400">
                                {new Date(entry.timestamp).toLocaleTimeString()}
                              </span>
                            </div>
                            <p className="text-xs text-gray-400">{entry.details}</p>
                            <p className="text-xs text-interactive">by {entry.user}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Evidence */}
                <Card className="bg-surface border-surface-light">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Evidence</CardTitle>
                      <Button size="sm" variant="outline" data-testid="upload-evidence">
                        <Upload className="w-4 h-4 mr-2" />
                        Upload
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {selectedIncidentData.evidence?.map((evidence) => (
                        <div key={evidence.id} className="flex items-center justify-between p-2 bg-background rounded-lg">
                          <div className="flex items-center space-x-2">
                            <FileText className="w-4 h-4 text-interactive" />
                            <div>
                              <p className="text-sm font-medium">{evidence.filename}</p>
                              <p className="text-xs text-gray-400">
                                {(evidence.size / 1024 / 1024).toFixed(1)} MB
                              </p>
                            </div>
                          </div>
                          <Button size="sm" variant="ghost" data-testid="download-evidence">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card className="bg-surface border-surface-light">
                <CardContent className="p-6 text-center">
                  <AlertTriangle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Select an Incident</h3>
                  <p className="text-gray-400">Choose an incident from the list to view details and manage response.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>

      {/* Create Incident Dialog */}
      <Dialog open={isCreatingIncident} onOpenChange={setIsCreatingIncident}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create Security Incident</DialogTitle>
          </DialogHeader>
          <form onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            createIncidentMutation.mutate({
              title: formData.get("title"),
              description: formData.get("description"),
              severity: formData.get("severity"),
              assignedTo: formData.get("assignedTo")
            });
          }} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Title</label>
              <Input name="title" required placeholder="Brief description of the incident" />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <Textarea name="description" required placeholder="Detailed description of the security incident" />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Severity</label>
                <Select name="severity" required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select severity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Assign To</label>
                <Select name="assignedTo">
                  <SelectTrigger>
                    <SelectValue placeholder="Select assignee" />
                  </SelectTrigger>
                  <SelectContent>
                    {users.map((user) => (
                      <SelectItem key={user.id} value={user.id}>
                        {user.firstName} {user.lastName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3">
              <Button type="button" variant="outline" onClick={() => setIsCreatingIncident(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-interactive hover:bg-orange-600">
                Create Incident
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}