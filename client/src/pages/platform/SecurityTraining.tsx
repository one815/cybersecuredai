import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  GraduationCap, 
  Users, 
  Target, 
  CheckCircle, 
  TrendingUp, 
  Shield, 
  Brain,
  Play,
  Award,
  Clock,
  BarChart3,
  Settings,
  AlertTriangle,
  Flag,
  Building2,
  Bot
} from "lucide-react";
import { MarketingLayout } from "@/components/MarketingLayout";
import { Link } from "wouter";

export default function SecurityTraining() {
  const trainingModules = [
    {
      title: "Phishing & Email Security",
      duration: "45 minutes",
      participants: 1247,
      completion: 94,
      description: "Recognition and prevention of phishing attacks and email-based threats",
      topics: ["Email threat identification", "Safe link practices", "Attachment security", "Reporting procedures"]
    },
    {
      title: "Password Security & MFA",
      duration: "30 minutes", 
      participants: 1158,
      completion: 96,
      description: "Best practices for password creation and multi-factor authentication",
      topics: ["Strong password creation", "Password manager usage", "MFA setup", "Account security"]
    },
    {
      title: "Data Protection & Privacy",
      duration: "60 minutes",
      participants: 892,
      completion: 89,
      description: "Student and citizen data protection requirements and procedures",
      topics: ["FERPA compliance", "PII handling", "Data classification", "Incident reporting"]
    },
    {
      title: "Social Engineering Awareness",
      duration: "40 minutes",
      participants: 743,
      completion: 91,
      description: "Recognition and prevention of social engineering attacks",
      topics: ["Pretexting recognition", "Baiting prevention", "Tailgating awareness", "Verification procedures"]
    }
  ];

  const sectorPrograms = [
    {
      sector: "K-12 Education",
      icon: <GraduationCap className="w-6 h-6" />,
      color: "text-blue-400",
      programs: [
        "Student-appropriate cybersecurity education (grades 6-12)",
        "Teacher and staff security awareness training",
        "IT administrator advanced security courses",
        "Parent and guardian digital safety workshops"
      ]
    },
    {
      sector: "Higher Education",
      icon: <Building2 className="w-6 h-6" />,
      color: "text-purple-400", 
      programs: [
        "Faculty research data protection training",
        "Student information security awareness",
        "Campus IT security certification programs",
        "Administrative staff compliance training"
      ]
    },
    {
      sector: "Government Agencies",
      icon: <Flag className="w-6 h-6" />,
      color: "text-green-400",
      programs: [
        "Federal security clearance training modules",
        "Municipal employee cybersecurity awareness",
        "Incident response team specialized training",
        "Leadership cybersecurity briefings"
      ]
    }
  ];

  const trainingMetrics = [
    { metric: "Training Modules", value: "47", description: "Role-specific training programs" },
    { metric: "Average Completion", value: "92.5%", description: "Across all modules" },
    { metric: "Knowledge Retention", value: "87%", description: "6-month follow-up assessment" },
    { metric: "Incident Reduction", value: "73%", description: "Post-training security incidents" }
  ];

  const gamificationFeatures = [
    {
      feature: "Interactive Simulations",
      description: "Real-world scenario-based learning with immediate feedback",
      engagement: 94,
      icon: <Play className="w-5 h-5" />
    },
    {
      feature: "Progress Tracking",
      description: "Individual and organizational progress monitoring and reporting",
      engagement: 89,
      icon: <BarChart3 className="w-5 h-5" />
    },
    {
      feature: "Achievement Badges",
      description: "Recognition system for completing training milestones",
      engagement: 92,
      icon: <Award className="w-5 h-5" />
    },
    {
      feature: "Leaderboards",
      description: "Friendly competition between departments and teams",
      engagement: 87,
      icon: <Target className="w-5 h-5" />
    }
  ];

  return (
    <MarketingLayout>
      <div className="ai-dashboard-bg min-h-screen">
        {/* Hero Section */}
        <header className="bg-surface/90 backdrop-blur-md border-b border-surface-light p-8 cyber-glow">
          <div className="container mx-auto max-w-6xl">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-violet-500 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <h1 className="text-4xl font-bold text-white">Security Awareness Training</h1>
                  <Badge className="bg-gradient-to-r from-purple-500 to-violet-500 text-white">Interactive</Badge>
                </div>
                <p className="text-gray-300 text-lg">
                  Customized cybersecurity training modules for education and government personnel
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {trainingMetrics.map((metric, index) => (
                <div key={index} className="bg-surface/50 rounded-lg p-4 border border-surface-light">
                  <div className="text-2xl font-bold text-white mb-1">{metric.value}</div>
                  <div className="text-sm text-gray-400 mb-1">{metric.metric}</div>
                  <div className="text-xs text-purple-400">{metric.description}</div>
                </div>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="text-purple-400 border-purple-400/50">
                $5,000 - $10,000 annually
              </Badge>
              <Badge variant="outline" className="text-green-400 border-green-400/50">
                Role-based training
              </Badge>
              <Badge variant="outline" className="text-cyan-400 border-cyan-400/50">
                Progress tracking
              </Badge>
            </div>
          </div>
        </header>

        <main className="container mx-auto max-w-6xl p-8 space-y-12">
          {/* Training Modules */}
          <section>
            <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
              <Brain className="w-8 h-8 mr-3 text-purple-400" />
              Core Training Modules
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {trainingModules.map((module, index) => (
                <Card key={index} className="bg-surface/50 border-surface-light">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-3">
                      <CardTitle className="text-white text-xl">{module.title}</CardTitle>
                      <Badge variant="outline" className="text-purple-400 border-purple-400/50">
                        {module.duration}
                      </Badge>
                    </div>
                    <p className="text-gray-400">{module.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-400">Completion Rate</span>
                        <span className="text-sm font-semibold text-white">{module.completion}%</span>
                      </div>
                      <Progress value={module.completion} className="h-2" />
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-400">Participants</span>
                        <span className="text-white">{module.participants.toLocaleString()}</span>
                      </div>
                      <div className="space-y-2 pt-2 border-t border-surface-light">
                        {module.topics.map((topic, topicIndex) => (
                          <div key={topicIndex} className="flex items-center space-x-2">
                            <CheckCircle className="w-3 h-3 text-green-400 flex-shrink-0" />
                            <span className="text-gray-300 text-xs">{topic}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Sector-Specific Programs */}
          <section>
            <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
              <Users className="w-8 h-8 mr-3 text-purple-400" />
              Sector-Specific Training Programs
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {sectorPrograms.map((program, index) => (
                <Card key={index} className="bg-surface/50 border-surface-light">
                  <CardHeader>
                    <CardTitle className="text-white text-xl flex items-center space-x-3">
                      <div className={`${program.color}`}>{program.icon}</div>
                      <span>{program.sector}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {program.programs.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex items-start space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                          <span className="text-gray-300 text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Interactive Training Experience */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">
              Interactive Security Training Experience
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Training Simulation */}
              <div className="relative rounded-xl overflow-hidden border border-purple-500/30">
                <div className="bg-gradient-to-br from-purple-900/20 to-violet-900/40 p-8 h-72 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-r from-purple-400 to-violet-500 rounded-full flex items-center justify-center">
                      <GraduationCap className="w-12 h-12 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Interactive Training Simulation</h3>
                    <p className="text-purple-400 text-sm mb-4">Immersive phishing and social engineering scenarios</p>
                    <div className="space-y-2">
                      <Badge className="bg-purple-500/20 text-purple-400 border border-purple-500/50">92.5% Completion</Badge>
                      <div className="text-xs text-gray-400">Role-based learning paths</div>
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-purple-500/10 to-transparent pointer-events-none"></div>
              </div>

              {/* Progress Analytics */}
              <div className="relative rounded-xl overflow-hidden border border-cyan-500/30">
                <div className="bg-gradient-to-br from-cyan-900/20 to-blue-900/40 p-8 h-72 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center">
                      <BarChart3 className="w-12 h-12 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Progress Analytics Dashboard</h3>
                    <p className="text-cyan-400 text-sm mb-4">Real-time learning analytics and performance tracking</p>
                    <div className="space-y-2">
                      <Badge className="bg-cyan-500/20 text-cyan-400 border border-cyan-500/50">87% Retention</Badge>
                      <div className="text-xs text-gray-400">6-month measurement</div>
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/10 to-transparent pointer-events-none"></div>
              </div>
            </div>
          </section>

          {/* Gamification & Engagement */}
          <section className="bg-gradient-to-r from-surface/30 to-surface/50 rounded-xl p-8 border border-surface-light">
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
              <Target className="w-8 h-8 mr-3 text-purple-400" />
              Gamification & Engagement Features
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {gamificationFeatures.map((feature, index) => (
                <Card key={index} className="bg-surface/50 border-surface-light">
                  <CardHeader className="pb-3">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="text-purple-400">{feature.icon}</div>
                      <CardTitle className="text-white text-lg">{feature.feature}</CardTitle>
                    </div>
                    <p className="text-gray-400 text-sm">{feature.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-400">Engagement</span>
                        <span className="text-sm font-semibold text-white">{feature.engagement}%</span>
                      </div>
                      <Progress value={feature.engagement} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-8 p-6 bg-surface/30 rounded-lg border border-purple-500/20">
              <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
                <Settings className="w-5 h-5 mr-2 text-purple-400" />
                Advanced Learning Analytics
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                <div>
                  <p className="text-gray-300 mb-2">
                    <span className="font-semibold text-purple-400">Adaptive Learning:</span> AI-powered content adjustment based on individual learning pace and knowledge gaps.
                  </p>
                </div>
                <div>
                  <p className="text-gray-300 mb-2">
                    <span className="font-semibold text-purple-400">Risk Assessment:</span> Personalized phishing simulations and security tests based on role and department.
                  </p>
                </div>
                <div>
                  <p className="text-gray-300">
                    <span className="font-semibold text-purple-400">Performance Analytics:</span> Detailed insights into training effectiveness and security behavior improvement.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Training Impact & ROI */}
          <section>
            <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
              <TrendingUp className="w-8 h-8 mr-3 text-purple-400" />
              Training Impact & ROI
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="bg-gradient-to-br from-green-900/20 to-green-700/20 border-green-500/30">
                <CardHeader>
                  <CardTitle className="text-white text-lg flex items-center">
                    <Shield className="w-5 h-5 mr-2 text-green-400" />
                    Security Incidents
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-3xl font-bold text-green-400">-73%</div>
                  <div className="text-sm text-gray-300">Reduction in security incidents post-training</div>
                  <div className="text-xs text-green-400">6-month measurement period</div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-900/20 to-blue-700/20 border-blue-500/30">
                <CardHeader>
                  <CardTitle className="text-white text-lg flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-blue-400" />
                    Response Time
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-3xl font-bold text-blue-400">-58%</div>
                  <div className="text-sm text-gray-300">Faster incident reporting and response</div>
                  <div className="text-xs text-blue-400">Average improvement across all users</div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-900/20 to-purple-700/20 border-purple-500/30">
                <CardHeader>
                  <CardTitle className="text-white text-lg flex items-center">
                    <AlertTriangle className="w-5 h-5 mr-2 text-purple-400" />
                    Phishing Success
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-3xl font-bold text-purple-400">-84%</div>
                  <div className="text-sm text-gray-300">Reduction in successful phishing attacks</div>
                  <div className="text-xs text-purple-400">Simulated phishing campaign results</div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Compliance & Certification */}
          <section>
            <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
              <Award className="w-8 h-8 mr-3 text-purple-400" />
              Compliance & Certification
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="bg-gradient-to-br from-blue-900/20 to-blue-700/20 border-blue-500/30">
                <CardHeader>
                  <CardTitle className="text-white text-xl flex items-center">
                    <Badge className="bg-blue-500 text-white mr-3">Education</Badge>
                    Educational Compliance
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">FERPA-compliant data protection training for all staff</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">Age-appropriate cybersecurity education for students</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">CIPA internet safety training and documentation</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">Educational technology security best practices</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-900/20 to-green-700/20 border-green-500/30">
                <CardHeader>
                  <CardTitle className="text-white text-xl flex items-center">
                    <Badge className="bg-green-500 text-white mr-3">Government</Badge>
                    Government Requirements
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">FISMA security awareness training requirements</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">Federal security clearance training modules</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">NIST cybersecurity framework training</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">Controlled Unclassified Information (CUI) handling</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Call to Action */}
          <section className="text-center">
            <div className="bg-gradient-to-r from-purple-900/20 to-violet-900/20 rounded-xl p-8 border border-purple-500/20">
              <h2 className="text-3xl font-bold text-white mb-4">
                Empower Your Team with Security Knowledge
              </h2>
              <p className="text-gray-300 text-lg mb-6 max-w-2xl mx-auto">
                Reduce security incidents by 73% with engaging, role-based cybersecurity training customized for your sector.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button size="lg" className="bg-gradient-to-r from-purple-500 to-violet-500 hover:from-purple-600 hover:to-violet-600" data-testid="button-request-demo">
                    Request Demo
                  </Button>
                </Link>
                <Link href="/pricing">
                  <Button variant="outline" size="lg" className="border-purple-500/50 text-purple-400 hover:bg-purple-500/10" data-testid="button-view-pricing">
                    View Pricing
                  </Button>
                </Link>
              </div>
            </div>
          </section>
        </main>
      </div>
    </MarketingLayout>
  );
}