import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  GraduationCap,
  BookOpen,
  Users,
  Play,
  CheckCircle,
  Clock,
  Award,
  Target,
  Brain,
  Shield,
  AlertTriangle,
  TrendingUp,
  Search,
  Filter,
  Download,
  Plus,
  Eye,
  Calendar,
  BarChart3
} from "lucide-react";

export default function SecurityTraining() {
  const [trainingStats] = useState({
    totalUsers: 247,
    completedUsers: 189,
    inProgressUsers: 34,
    overdueCertifications: 24,
    averageScore: 87,
    complianceRate: 94
  });

  const [educationModules] = useState([
    {
      id: "EDU-001",
      title: "Password Security for Students",
      description: "Age-appropriate password creation and management for K-12 students",
      targetAudience: "Students (K-12)",
      duration: "15 minutes",
      completionRate: 92,
      averageScore: 89,
      difficulty: "Beginner",
      category: "Password Security",
      lastUpdated: "2024-01-15",
      enrollments: 156,
      certificates: 144
    },
    {
      id: "EDU-002", 
      title: "Digital Citizenship & Online Safety",
      description: "Responsible internet use and cyberbullying prevention",
      targetAudience: "Students (Grades 6-12)",
      duration: "25 minutes",
      completionRate: 88,
      averageScore: 91,
      difficulty: "Beginner",
      category: "Digital Citizenship",
      lastUpdated: "2024-01-20",
      enrollments: 134,
      certificates: 118
    },
    {
      id: "EDU-003",
      title: "FERPA Compliance for Educators",
      description: "Student privacy protection and educational record handling",
      targetAudience: "Faculty & Staff",
      duration: "45 minutes",
      completionRate: 96,
      averageScore: 93,
      difficulty: "Intermediate",
      category: "Compliance",
      lastUpdated: "2024-01-12",
      enrollments: 89,
      certificates: 85
    },
    {
      id: "EDU-004",
      title: "Phishing Recognition for Schools",
      description: "Identifying and responding to email-based threats in education",
      targetAudience: "All Staff",
      duration: "30 minutes",
      completionRate: 85,
      averageScore: 87,
      difficulty: "Intermediate",
      category: "Threat Recognition",
      lastUpdated: "2024-01-18",
      enrollments: 112,
      certificates: 95
    }
  ]);

  const [governmentModules] = useState([
    {
      id: "GOV-001",
      title: "Federal Information Security Awareness",
      description: "FISMA compliance and federal security requirements",
      targetAudience: "Federal Employees",
      duration: "60 minutes",
      completionRate: 94,
      averageScore: 91,
      difficulty: "Advanced",
      category: "Federal Compliance",
      lastUpdated: "2024-01-10",
      enrollments: 78,
      certificates: 73
    },
    {
      id: "GOV-002",
      title: "Controlled Unclassified Information (CUI)",
      description: "Handling and protecting CUI in government systems",
      targetAudience: "Government Contractors",
      duration: "90 minutes",
      completionRate: 89,
      averageScore: 88,
      difficulty: "Advanced",
      category: "Data Protection",
      lastUpdated: "2024-01-25",
      enrollments: 45,
      certificates: 40
    },
    {
      id: "GOV-003",
      title: "Municipal Cybersecurity Fundamentals",
      description: "Cybersecurity basics for city and county employees",
      targetAudience: "Municipal Staff",
      duration: "40 minutes",
      completionRate: 91,
      averageScore: 86,
      difficulty: "Beginner",
      category: "Municipal Security",
      lastUpdated: "2024-01-22",
      enrollments: 124,
      certificates: 113
    },
    {
      id: "GOV-004",
      title: "Incident Response for Government",
      description: "Responding to security incidents in government environments",
      targetAudience: "IT Staff & Administrators",
      duration: "75 minutes",
      completionRate: 87,
      averageScore: 92,
      difficulty: "Advanced",
      category: "Incident Response",
      lastUpdated: "2024-01-28",
      enrollments: 67,
      certificates: 58
    }
  ]);

  const [userProgress] = useState([
    {
      id: "USR-001",
      name: "Sarah Johnson",
      role: "Teacher",
      department: "Mathematics",
      modulesCompleted: 3,
      totalModules: 4,
      averageScore: 91,
      lastActivity: "2024-01-30",
      certifications: ["FERPA Compliance", "Password Security"],
      status: "Active",
      nextDeadline: "2024-03-15"
    },
    {
      id: "USR-002",
      name: "Michael Chen",
      role: "IT Administrator", 
      department: "Technology",
      modulesCompleted: 6,
      totalModules: 8,
      averageScore: 94,
      lastActivity: "2024-01-29",
      certifications: ["FISMA Compliance", "Incident Response", "CUI Handling"],
      status: "Active",
      nextDeadline: "2024-02-28"
    },
    {
      id: "USR-003",
      name: "Jennifer Davis",
      role: "Principal",
      department: "Administration",
      modulesCompleted: 2,
      totalModules: 4,
      averageScore: 88,
      lastActivity: "2024-01-25",
      certifications: ["Digital Citizenship"],
      status: "Behind Schedule",
      nextDeadline: "2024-02-15"
    }
  ]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "bg-green-600";
      case "Intermediate": return "bg-yellow-600";
      case "Advanced": return "bg-red-600";
      default: return "bg-gray-600";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "text-green-400";
      case "Behind Schedule": return "text-yellow-400";
      case "Overdue": return "text-red-400";
      default: return "text-gray-400";
    }
  };

  const allModules = [...educationModules, ...governmentModules];

  return (
    <div className="ai-dashboard-bg min-h-screen">
      {/* Header */}
      <header className="bg-surface/90 backdrop-blur-md border-b border-surface-light p-6 cyber-glow">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                  Security Awareness Training
                </h2>
                <p className="text-gray-400">Interactive cybersecurity education for education and government sectors</p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search training modules, users..."
                className="bg-background border-surface-light pl-10 w-80 text-sm focus:border-blue-500"
                data-testid="training-search"
              />
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            </div>
            <Button variant="outline" className="border-blue-500 text-blue-400" data-testid="filter-training">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700" data-testid="create-module">
              <Plus className="w-4 h-4 mr-2" />
              Create Module
            </Button>
          </div>
        </div>
      </header>

      <main className="p-6">
        {/* Training Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-surface/80 backdrop-blur-md border border-green-500/30 cyber-glow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Users className="w-8 h-8 text-green-400" />
                <Badge className="bg-green-600">Active</Badge>
              </div>
              <div className="text-3xl font-bold text-white mb-2">{trainingStats.completedUsers}</div>
              <div className="text-sm text-gray-400">Trained Users</div>
              <div className="text-xs text-green-400 mt-1">
                {trainingStats.completedUsers}/{trainingStats.totalUsers} completed
              </div>
            </CardContent>
          </Card>

          <Card className="bg-surface/80 backdrop-blur-md border border-blue-500/30 cyber-glow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <TrendingUp className="w-8 h-8 text-blue-400" />
                <Badge className="bg-blue-600">Score</Badge>
              </div>
              <div className="text-3xl font-bold text-white mb-2">{trainingStats.averageScore}%</div>
              <div className="text-sm text-gray-400">Average Score</div>
              <div className="text-xs text-blue-400 mt-1">+3% from last month</div>
            </CardContent>
          </Card>

          <Card className="bg-surface/80 backdrop-blur-md border border-purple-500/30 cyber-glow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Award className="w-8 h-8 text-purple-400" />
                <Badge className="bg-purple-600">Compliance</Badge>
              </div>
              <div className="text-3xl font-bold text-white mb-2">{trainingStats.complianceRate}%</div>
              <div className="text-sm text-gray-400">Compliance Rate</div>
              <div className="text-xs text-purple-400 mt-1">FERPA, FISMA certified</div>
            </CardContent>
          </Card>

          <Card className="bg-surface/80 backdrop-blur-md border border-yellow-500/30 cyber-glow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Clock className="w-8 h-8 text-yellow-400" />
                <Badge className="bg-yellow-600">Overdue</Badge>
              </div>
              <div className="text-3xl font-bold text-white mb-2">{trainingStats.overdueCertifications}</div>
              <div className="text-sm text-gray-400">Overdue Certs</div>
              <div className="text-xs text-yellow-400 mt-1">Require attention</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="education" className="space-y-6">
          <TabsList className="bg-surface border border-surface-light">
            <TabsTrigger value="education" className="data-[state=active]:bg-blue-600">
              <GraduationCap className="w-4 h-4 mr-2" />
              Education Modules
            </TabsTrigger>
            <TabsTrigger value="government" className="data-[state=active]:bg-purple-600">
              <Shield className="w-4 h-4 mr-2" />
              Government Modules
            </TabsTrigger>
            <TabsTrigger value="progress" className="data-[state=active]:bg-green-600">
              <BarChart3 className="w-4 h-4 mr-2" />
              User Progress
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-orange-600">
              <Target className="w-4 h-4 mr-2" />
              Analytics
            </TabsTrigger>
          </TabsList>

          {/* Education Sector Training */}
          <TabsContent value="education" className="space-y-6">
            <Card className="bg-surface/80 backdrop-blur-md border border-blue-500/30 cyber-glow">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-white">Education Sector Training Modules</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {educationModules.map((module, index) => (
                    <Card key={index} className="bg-background/50 border border-blue-500/30">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <BookOpen className="w-5 h-5 text-blue-400" />
                              <h3 className="text-lg font-medium text-white">{module.title}</h3>
                              <Badge className={getDifficultyColor(module.difficulty)}>
                                {module.difficulty}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-400 mb-3">{module.description}</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div>
                            <div className="text-xs text-gray-400">Target Audience</div>
                            <div className="text-sm text-cyan-400">{module.targetAudience}</div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-400">Duration</div>
                            <div className="text-sm text-white">{module.duration}</div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-400">Completion Rate</div>
                            <div className="text-sm text-green-400">{module.completionRate}%</div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-400">Average Score</div>
                            <div className="text-sm text-purple-400">{module.averageScore}%</div>
                          </div>
                        </div>

                        <div className="mb-4">
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-gray-400">Enrollment Progress</span>
                            <span className="text-white">{module.certificates}/{module.enrollments}</span>
                          </div>
                          <Progress value={(module.certificates / module.enrollments) * 100} className="h-2" />
                        </div>

                        <div className="flex justify-between items-center">
                          <div className="flex space-x-2">
                            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                              <Play className="w-4 h-4 mr-2" />
                              Preview
                            </Button>
                            <Button size="sm" variant="outline">
                              Edit Module
                            </Button>
                          </div>
                          <div className="text-xs text-gray-400">
                            Updated: {module.lastUpdated}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Government Sector Training */}
          <TabsContent value="government" className="space-y-6">
            <Card className="bg-surface/80 backdrop-blur-md border border-purple-500/30 cyber-glow">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-white">Government Sector Training Modules</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {governmentModules.map((module, index) => (
                    <Card key={index} className="bg-background/50 border border-purple-500/30">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <Shield className="w-5 h-5 text-purple-400" />
                              <h3 className="text-lg font-medium text-white">{module.title}</h3>
                              <Badge className={getDifficultyColor(module.difficulty)}>
                                {module.difficulty}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-400 mb-3">{module.description}</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div>
                            <div className="text-xs text-gray-400">Target Audience</div>
                            <div className="text-sm text-cyan-400">{module.targetAudience}</div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-400">Duration</div>
                            <div className="text-sm text-white">{module.duration}</div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-400">Completion Rate</div>
                            <div className="text-sm text-green-400">{module.completionRate}%</div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-400">Average Score</div>
                            <div className="text-sm text-purple-400">{module.averageScore}%</div>
                          </div>
                        </div>

                        <div className="mb-4">
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-gray-400">Enrollment Progress</span>
                            <span className="text-white">{module.certificates}/{module.enrollments}</span>
                          </div>
                          <Progress value={(module.certificates / module.enrollments) * 100} className="h-2" />
                        </div>

                        <div className="flex justify-between items-center">
                          <div className="flex space-x-2">
                            <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                              <Play className="w-4 h-4 mr-2" />
                              Preview
                            </Button>
                            <Button size="sm" variant="outline">
                              Edit Module
                            </Button>
                          </div>
                          <div className="text-xs text-gray-400">
                            Updated: {module.lastUpdated}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* User Progress Tracking */}
          <TabsContent value="progress" className="space-y-6">
            <Card className="bg-surface/80 backdrop-blur-md border border-green-500/30 cyber-glow">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-white">User Training Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {userProgress.map((user, index) => (
                    <Card key={index} className="bg-background/50 border border-green-500/30">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <Users className="w-5 h-5 text-green-400" />
                              <h3 className="text-lg font-medium text-white">{user.name}</h3>
                              <Badge className={`${getStatusColor(user.status)} border border-current`}>
                                {user.status}
                              </Badge>
                            </div>
                            <div className="text-sm text-gray-400 mb-3">
                              {user.role} • {user.department}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-gray-400">Progress</div>
                            <div className="text-lg font-bold text-green-400">
                              {Math.round((user.modulesCompleted / user.totalModules) * 100)}%
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          <div>
                            <div className="text-xs text-gray-400">Modules Completed</div>
                            <div className="text-sm text-white">{user.modulesCompleted}/{user.totalModules}</div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-400">Average Score</div>
                            <div className="text-sm text-purple-400">{user.averageScore}%</div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-400">Last Activity</div>
                            <div className="text-sm text-cyan-400">{user.lastActivity}</div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-400">Next Deadline</div>
                            <div className="text-sm text-yellow-400">{user.nextDeadline}</div>
                          </div>
                        </div>

                        <div className="mb-4">
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-gray-400">Training Progress</span>
                            <span className="text-white">{user.modulesCompleted}/{user.totalModules}</span>
                          </div>
                          <Progress value={(user.modulesCompleted / user.totalModules) * 100} className="h-2" />
                        </div>

                        <div className="mb-4">
                          <div className="text-xs text-gray-400 mb-2">Current Certifications</div>
                          <div className="flex flex-wrap gap-2">
                            {user.certifications.map((cert, i) => (
                              <Badge key={i} variant="outline" className="text-xs border-green-500 text-green-400">
                                <Award className="w-3 h-3 mr-1" />
                                {cert}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="flex justify-between items-center">
                          <div className="flex space-x-2">
                            <Button size="sm" className="bg-green-600 hover:bg-green-700">
                              <Eye className="w-4 h-4 mr-2" />
                              View Details
                            </Button>
                            <Button size="sm" variant="outline">
                              Send Reminder
                            </Button>
                          </div>
                          <div className="text-xs text-gray-400">
                            ID: {user.id}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Training Analytics */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-surface/80 backdrop-blur-md border border-orange-500/30 cyber-glow">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-white">Training Effectiveness</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-orange-400 mb-2">{trainingStats.averageScore}%</div>
                      <div className="text-sm text-gray-400">Overall Training Score</div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-400">Education Modules:</span>
                          <span className="text-blue-400">90% avg</span>
                        </div>
                        <Progress value={90} className="h-2" />
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-400">Government Modules:</span>
                          <span className="text-purple-400">91% avg</span>
                        </div>
                        <Progress value={91} className="h-2" />
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-400">Completion Rate:</span>
                          <span className="text-green-400">89% avg</span>
                        </div>
                        <Progress value={89} className="h-2" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-surface/80 backdrop-blur-md border border-cyan-500/30 cyber-glow">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-white">Training Insights</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 bg-green-900/20 rounded-lg border border-green-600/50">
                      <div className="text-sm text-green-400 font-medium mb-2">High Performance</div>
                      <div className="text-xs text-gray-400">
                        FERPA compliance training showing 96% completion rate with 93% average score
                      </div>
                    </div>
                    
                    <div className="p-3 bg-yellow-900/20 rounded-lg border border-yellow-600/50">
                      <div className="text-sm text-yellow-400 font-medium mb-2">Attention Needed</div>
                      <div className="text-xs text-gray-400">
                        CUI handling module has lower completion rate (89%) - consider simplifying content
                      </div>
                    </div>
                    
                    <div className="p-3 bg-blue-900/20 rounded-lg border border-blue-600/50">
                      <div className="text-sm text-blue-400 font-medium mb-2">Trending Up</div>
                      <div className="text-xs text-gray-400">
                        Digital citizenship training engagement increased 15% this quarter
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-700">
                      <div className="text-sm text-gray-400 mb-3">Training Statistics</div>
                      <div className="grid grid-cols-2 gap-4 text-center">
                        <div>
                          <div className="text-2xl font-bold text-cyan-400">8.2</div>
                          <div className="text-xs text-gray-400">Avg Modules/User</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-green-400">94%</div>
                          <div className="text-xs text-gray-400">Satisfaction Rate</div>
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