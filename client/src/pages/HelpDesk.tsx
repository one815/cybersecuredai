import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  HelpCircle,
  MessageSquare,
  Phone,
  Mail,
  Clock,
  CheckCircle,
  AlertTriangle,
  User,
  Calendar,
  Target,
  BarChart3,
  Search,
  Filter,
  Plus,
  Eye,
  Settings,
  Monitor,
  Headphones,
  Users,
  FileText,
  Star,
  TrendingUp
} from "lucide-react";

export default function HelpDesk() {
  const [supportStats] = useState({
    totalTickets: 1247,
    openTickets: 89,
    resolvedToday: 156,
    averageResponseTime: "15 minutes",
    customerSatisfaction: 4.7,
    slaCompliance: 97
  });

  const [tickets] = useState([
    {
      id: "TKT-2024-001",
      title: "WiFi Connection Issues in Computer Lab",
      description: "Students unable to connect to wireless network in Lab A",
      category: "Network",
      priority: "high",
      status: "open",
      requestor: "teacher@school.edu",
      assignedTo: "Michael Chen",
      created: "2024-01-30 09:15 AM",
      updated: "2024-01-30 10:30 AM",
      slaDeadline: "2024-01-30 01:15 PM",
      department: "Computer Lab A",
      tags: ["wifi", "connectivity", "lab"]
    },
    {
      id: "TKT-2024-002", 
      title: "Password Reset Request - Admin Account",
      description: "Administrative user needs password reset for domain access",
      category: "Access Management",
      priority: "medium",
      status: "in-progress",
      requestor: "admin@city.gov",
      assignedTo: "Sarah Johnson",
      created: "2024-01-30 08:45 AM",
      updated: "2024-01-30 11:00 AM",
      slaDeadline: "2024-01-30 04:45 PM",
      department: "City Administration",
      tags: ["password", "access", "admin"]
    },
    {
      id: "TKT-2024-003",
      title: "Email Server Performance Issues",
      description: "Exchange server responding slowly, affecting all users",
      category: "Email System",
      priority: "critical",
      status: "escalated",
      requestor: "it@school.edu",
      assignedTo: "Level 2 Support",
      created: "2024-01-30 07:30 AM",
      updated: "2024-01-30 11:15 AM",
      slaDeadline: "2024-01-30 11:30 AM",
      department: "IT Infrastructure",
      tags: ["exchange", "performance", "critical"]
    },
    {
      id: "TKT-2024-004",
      title: "Software Installation Request",
      description: "Need Adobe Creative Suite installed on design lab computers",
      category: "Software",
      priority: "low",
      status: "pending",
      requestor: "art.teacher@school.edu",
      assignedTo: "Unassigned",
      created: "2024-01-29 02:30 PM",
      updated: "2024-01-29 02:30 PM",
      slaDeadline: "2024-01-31 02:30 PM",
      department: "Art Department",
      tags: ["software", "installation", "lab"]
    }
  ]);

  const [knowledgeBase] = useState([
    {
      id: "KB-001",
      title: "How to Reset Student Passwords",
      category: "Authentication",
      views: 1247,
      helpful: 95,
      lastUpdated: "2024-01-28",
      tags: ["password", "students", "reset"]
    },
    {
      id: "KB-002",
      title: "Troubleshooting WiFi Connection Problems",
      category: "Network",
      views: 892,
      helpful: 88,
      lastUpdated: "2024-01-25",
      tags: ["wifi", "troubleshooting", "network"]
    },
    {
      id: "KB-003",
      title: "FERPA Compliance Guidelines for Staff",
      category: "Compliance",
      views: 634,
      helpful: 97,
      lastUpdated: "2024-01-20",
      tags: ["ferpa", "compliance", "privacy"]
    },
    {
      id: "KB-004",
      title: "Email Setup for New Employees",
      category: "Email",
      views: 523,
      helpful: 92,
      lastUpdated: "2024-01-22",
      tags: ["email", "setup", "onboarding"]
    }
  ]);

  const [supportChannels] = useState([
    {
      channel: "Email Support",
      icon: Mail,
      responseTime: "< 30 minutes",
      availability: "24/7",
      status: "active",
      volume: 45,
      satisfaction: 4.6
    },
    {
      channel: "Phone Support",
      icon: Phone,
      responseTime: "< 5 minutes",
      availability: "8 AM - 6 PM",
      status: "active",
      volume: 23,
      satisfaction: 4.8
    },
    {
      channel: "Live Chat",
      icon: MessageSquare,
      responseTime: "< 2 minutes",
      availability: "8 AM - 8 PM",
      status: "active",
      volume: 67,
      satisfaction: 4.5
    },
    {
      channel: "Remote Support",
      icon: Monitor,
      responseTime: "< 15 minutes",
      availability: "8 AM - 6 PM",
      status: "active",
      volume: 34,
      satisfaction: 4.9
    }
  ]);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical": return "bg-red-600";
      case "high": return "bg-orange-600";
      case "medium": return "bg-yellow-600";
      case "low": return "bg-blue-600";
      default: return "bg-gray-600";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open": return "text-red-400 bg-red-900/20 border-red-500/30";
      case "in-progress": return "text-yellow-400 bg-yellow-900/20 border-yellow-500/30";
      case "pending": return "text-blue-400 bg-blue-900/20 border-blue-500/30";
      case "escalated": return "text-purple-400 bg-purple-900/20 border-purple-500/30";
      case "resolved": return "text-green-400 bg-green-900/20 border-green-500/30";
      default: return "text-gray-400 bg-gray-900/20 border-gray-500/30";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "open": return <AlertTriangle className="w-4 h-4 text-red-400" />;
      case "in-progress": return <Clock className="w-4 h-4 text-yellow-400" />;
      case "pending": return <Calendar className="w-4 h-4 text-blue-400" />;
      case "escalated": return <TrendingUp className="w-4 h-4 text-purple-400" />;
      case "resolved": return <CheckCircle className="w-4 h-4 text-green-400" />;
      default: return <HelpCircle className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <div className="ai-dashboard-bg min-h-screen">
      {/* Header */}
      <header className="bg-surface/90 backdrop-blur-md border-b border-surface-light p-6 cyber-glow">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
                <HelpCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  Help Desk & Support
                </h2>
                <p className="text-gray-400 flex items-center space-x-2">
                  <span>Multi-channel IT support with guaranteed response times</span>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-green-400 text-xs">All Channels Active</span>
                  </div>
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search tickets, users, solutions..."
                className="bg-background border-surface-light pl-10 w-80 text-sm focus:border-cyan-500"
                data-testid="support-search"
              />
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            </div>
            <Button variant="outline" className="border-cyan-500 text-cyan-400" data-testid="filter-tickets">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button className="bg-cyan-600 hover:bg-cyan-700" data-testid="new-ticket">
              <Plus className="w-4 h-4 mr-2" />
              New Ticket
            </Button>
          </div>
        </div>
      </header>

      <main className="p-6">
        {/* Support Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-surface/80 backdrop-blur-md border border-red-500/30 cyber-glow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <AlertTriangle className="w-8 h-8 text-red-400" />
                <Badge className="bg-red-600">Open</Badge>
              </div>
              <div className="text-3xl font-bold text-white mb-2">{supportStats.openTickets}</div>
              <div className="text-sm text-gray-400">Open Tickets</div>
              <div className="text-xs text-red-400 mt-1">7 critical priority</div>
            </CardContent>
          </Card>

          <Card className="bg-surface/80 backdrop-blur-md border border-green-500/30 cyber-glow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <CheckCircle className="w-8 h-8 text-green-400" />
                <Badge className="bg-green-600">Resolved</Badge>
              </div>
              <div className="text-3xl font-bold text-white mb-2">{supportStats.resolvedToday}</div>
              <div className="text-sm text-gray-400">Resolved Today</div>
              <div className="text-xs text-green-400 mt-1">+23% from yesterday</div>
            </CardContent>
          </Card>

          <Card className="bg-surface/80 backdrop-blur-md border border-blue-500/30 cyber-glow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Clock className="w-8 h-8 text-blue-400" />
                <Badge className="bg-blue-600">Response</Badge>
              </div>
              <div className="text-3xl font-bold text-white mb-2">{supportStats.averageResponseTime}</div>
              <div className="text-sm text-gray-400">Avg Response</div>
              <div className="text-xs text-blue-400 mt-1">Under SLA target</div>
            </CardContent>
          </Card>

          <Card className="bg-surface/80 backdrop-blur-md border border-yellow-500/30 cyber-glow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Star className="w-8 h-8 text-yellow-400" />
                <Badge className="bg-yellow-600">Rating</Badge>
              </div>
              <div className="text-3xl font-bold text-white mb-2">{supportStats.customerSatisfaction}</div>
              <div className="text-sm text-gray-400">Satisfaction</div>
              <div className="text-xs text-yellow-400 mt-1">out of 5.0 stars</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="tickets" className="space-y-6">
          <TabsList className="bg-surface border border-surface-light">
            <TabsTrigger value="tickets" className="data-[state=active]:bg-red-600">
              <FileText className="w-4 h-4 mr-2" />
              Active Tickets
            </TabsTrigger>
            <TabsTrigger value="channels" className="data-[state=active]:bg-cyan-600">
              <Headphones className="w-4 h-4 mr-2" />
              Support Channels
            </TabsTrigger>
            <TabsTrigger value="knowledge" className="data-[state=active]:bg-purple-600">
              <FileText className="w-4 h-4 mr-2" />
              Knowledge Base
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-green-600">
              <BarChart3 className="w-4 h-4 mr-2" />
              Analytics
            </TabsTrigger>
          </TabsList>

          {/* Active Tickets */}
          <TabsContent value="tickets" className="space-y-6">
            <Card className="bg-surface/80 backdrop-blur-md border border-red-500/30 cyber-glow">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-white">Active Support Tickets</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {tickets.map((ticket, index) => (
                    <Card key={index} className={`bg-background/50 border ${
                      ticket.priority === 'critical' ? 'border-red-500/50' :
                      ticket.priority === 'high' ? 'border-orange-500/50' :
                      ticket.priority === 'medium' ? 'border-yellow-500/50' : 'border-blue-500/50'
                    }`}>
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              {getStatusIcon(ticket.status)}
                              <h3 className="text-lg font-medium text-white">{ticket.title}</h3>
                              <Badge className={getPriorityColor(ticket.priority)}>
                                {ticket.priority}
                              </Badge>
                              <Badge className={`${getStatusColor(ticket.status)} text-xs`}>
                                {ticket.status.replace('-', ' ')}
                              </Badge>
                            </div>
                            <div className="text-sm text-gray-400 mb-3">
                              {ticket.id} • {ticket.category} • {ticket.department}
                            </div>
                            <p className="text-sm text-gray-300 mb-3">{ticket.description}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-gray-400">SLA Deadline</div>
                            <div className="text-sm text-red-400 font-medium">{ticket.slaDeadline}</div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          <div>
                            <div className="text-xs text-gray-400">Requestor</div>
                            <div className="text-sm text-cyan-400">{ticket.requestor}</div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-400">Assigned To</div>
                            <div className="text-sm text-white">{ticket.assignedTo}</div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-400">Created</div>
                            <div className="text-sm text-white">{ticket.created}</div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-400">Last Updated</div>
                            <div className="text-sm text-green-400">{ticket.updated}</div>
                          </div>
                        </div>

                        <div className="mb-4">
                          <div className="text-xs text-gray-400 mb-2">Tags</div>
                          <div className="flex flex-wrap gap-2">
                            {ticket.tags.map((tag, i) => (
                              <Badge key={i} variant="outline" className="text-xs border-gray-500 text-gray-400">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="flex justify-between items-center">
                          <div className="flex space-x-2">
                            <Button size="sm" className={`${
                              ticket.priority === 'critical' ? 'bg-red-600 hover:bg-red-700' :
                              ticket.priority === 'high' ? 'bg-orange-600 hover:bg-orange-700' :
                              'bg-cyan-600 hover:bg-cyan-700'
                            }`}>
                              <Eye className="w-4 h-4 mr-2" />
                              View Details
                            </Button>
                            <Button size="sm" variant="outline">
                              Update Status
                            </Button>
                            <Button size="sm" variant="outline">
                              Assign
                            </Button>
                          </div>
                          <div className="text-xs text-gray-400">
                            Priority: {ticket.priority.toUpperCase()}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Support Channels */}
          <TabsContent value="channels" className="space-y-6">
            <Card className="bg-surface/80 backdrop-blur-md border border-cyan-500/30 cyber-glow">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-white">Support Channels & Response Times</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {supportChannels.map((channel, index) => (
                    <Card key={index} className="bg-background/50 border border-cyan-500/30">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <channel.icon className="w-6 h-6 text-cyan-400" />
                            <h3 className="text-lg font-medium text-white">{channel.channel}</h3>
                          </div>
                          <Badge className={`${
                            channel.status === 'active' ? 'bg-green-600' : 'bg-gray-600'
                          }`}>
                            {channel.status}
                          </Badge>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Response Time:</span>
                            <span className="text-green-400">{channel.responseTime}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Availability:</span>
                            <span className="text-white">{channel.availability}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Current Volume:</span>
                            <span className="text-blue-400">{channel.volume} tickets</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Satisfaction:</span>
                            <span className="text-yellow-400">{channel.satisfaction}/5.0</span>
                          </div>
                        </div>
                        
                        <div className="mt-4">
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-gray-400">Channel Load</span>
                            <span className="text-white">{channel.volume}%</span>
                          </div>
                          <Progress value={channel.volume} className="h-2" />
                        </div>
                        
                        <div className="mt-4 flex space-x-2">
                          <Button size="sm" variant="outline" className="flex-1">
                            Configure
                          </Button>
                          <Button size="sm" variant="ghost" className="text-gray-400">
                            <Settings className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Knowledge Base */}
          <TabsContent value="knowledge" className="space-y-6">
            <Card className="bg-surface/80 backdrop-blur-md border border-purple-500/30 cyber-glow">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-white">Knowledge Base Articles</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {knowledgeBase.map((article, index) => (
                    <Card key={index} className="bg-background/50 border border-purple-500/30">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <FileText className="w-5 h-5 text-purple-400" />
                              <h3 className="text-lg font-medium text-white">{article.title}</h3>
                            </div>
                            <div className="text-sm text-gray-400 mb-3">{article.category}</div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div>
                            <div className="text-xs text-gray-400">Views</div>
                            <div className="text-sm text-cyan-400">{article.views.toLocaleString()}</div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-400">Helpful Rating</div>
                            <div className="text-sm text-green-400">{article.helpful}%</div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-400">Last Updated</div>
                            <div className="text-sm text-white">{article.lastUpdated}</div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-400">Article ID</div>
                            <div className="text-sm text-purple-400">{article.id}</div>
                          </div>
                        </div>

                        <div className="mb-4">
                          <div className="text-xs text-gray-400 mb-2">Tags</div>
                          <div className="flex flex-wrap gap-2">
                            {article.tags.map((tag, i) => (
                              <Badge key={i} variant="outline" className="text-xs border-purple-500 text-purple-400">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="flex justify-between items-center">
                          <div className="flex space-x-2">
                            <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                              <Eye className="w-4 h-4 mr-2" />
                              View Article
                            </Button>
                            <Button size="sm" variant="outline">
                              Edit
                            </Button>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-400" />
                            <span className="text-sm text-white">{article.helpful}%</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Support Analytics */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-surface/80 backdrop-blur-md border border-green-500/30 cyber-glow">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-white">Support Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-green-400 mb-2">{supportStats.slaCompliance}%</div>
                      <div className="text-sm text-gray-400">SLA Compliance Rate</div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-400">First Response:</span>
                          <span className="text-green-400">98% on time</span>
                        </div>
                        <Progress value={98} className="h-2" />
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-400">Resolution Rate:</span>
                          <span className="text-blue-400">94% same day</span>
                        </div>
                        <Progress value={94} className="h-2" />
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-400">Escalation Rate:</span>
                          <span className="text-yellow-400">6% escalated</span>
                        </div>
                        <Progress value={6} className="h-2" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-surface/80 backdrop-blur-md border border-blue-500/30 cyber-glow">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-white">Support Insights</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 bg-green-900/20 rounded-lg border border-green-600/50">
                      <div className="text-sm text-green-400 font-medium mb-2">Excellent Performance</div>
                      <div className="text-xs text-gray-400">
                        Phone support maintaining 4.8/5 satisfaction with under 5-minute response times
                      </div>
                    </div>
                    
                    <div className="p-3 bg-blue-900/20 rounded-lg border border-blue-600/50">
                      <div className="text-sm text-blue-400 font-medium mb-2">Trending Categories</div>
                      <div className="text-xs text-gray-400">
                        Network issues (32%) and password resets (28%) are top ticket categories
                      </div>
                    </div>
                    
                    <div className="p-3 bg-yellow-900/20 rounded-lg border border-yellow-600/50">
                      <div className="text-sm text-yellow-400 font-medium mb-2">Knowledge Base Impact</div>
                      <div className="text-xs text-gray-400">
                        Self-service resolution increased 23% after publishing WiFi troubleshooting guide
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-700">
                      <div className="text-sm text-gray-400 mb-3">Support Metrics</div>
                      <div className="grid grid-cols-2 gap-4 text-center">
                        <div>
                          <div className="text-2xl font-bold text-cyan-400">15m</div>
                          <div className="text-xs text-gray-400">Avg Response</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-green-400">4.7</div>
                          <div className="text-xs text-gray-400">Satisfaction</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}