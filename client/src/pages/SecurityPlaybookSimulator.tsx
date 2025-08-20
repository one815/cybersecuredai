import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Shield, 
  AlertTriangle, 
  Zap, 
  Database, 
  Mail, 
  Clock, 
  CheckCircle, 
  XCircle,
  Play,
  RotateCcw,
  Trophy,
  Star,
  Monitor,
  Wifi,
  Server,
  Users,
  Eye,
  Lock,
  Activity,
  Skull
} from "lucide-react";

interface PlaybookScenario {
  id: string;
  title: string;
  description: string;
  type: 'phishing' | 'ransomware' | 'data-breach' | 'ddos';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: string;
  icon: typeof Shield;
  color: string;
  steps: PlaybookStep[];
}

interface PlaybookStep {
  id: string;
  title: string;
  description: string;
  question: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
    explanation: string;
    points: number;
  }[];
  context?: string;
  visual?: {
    type: 'email' | 'network' | 'dashboard' | 'alert' | 'system';
    content: any;
  };
}

interface SimulationState {
  currentScenario: PlaybookScenario | null;
  currentStepIndex: number;
  score: number;
  completedSteps: string[];
  selectedAnswers: Record<string, string>;
  showResults: boolean;
}

const scenarios: PlaybookScenario[] = [
  {
    id: "phishing-attack",
    title: "Phishing Attack Response",
    description: "Learn how to identify, contain, and respond to sophisticated phishing attacks targeting educational institutions.",
    type: "phishing",
    difficulty: "beginner",
    estimatedTime: "15 min",
    icon: Mail,
    color: "text-orange-400",
    steps: [
      {
        id: "step-1",
        title: "Initial Detection",
        description: "A faculty member reports receiving a suspicious email claiming to be from IT support asking for password verification.",
        question: "What should be your immediate first response?",
        context: "Email contains: 'Action Required: Verify your account credentials to prevent suspension. Click here to verify: http://suspicious-link.com'",
        visual: {
          type: 'email',
          content: {
            from: 'it-support@universi7y-portal.com',
            to: 'faculty@university.edu',
            subject: 'URGENT: Account Verification Required',
            timestamp: '2 minutes ago',
            body: 'Your university email account requires immediate verification to prevent suspension. Please click the link below to verify your credentials and maintain access to university systems.',
            link: 'http://suspicious-link.com/verify-account',
            suspicious: true
          }
        },
        options: [
          {
            id: "option-1",
            text: "Forward the email to all users as a warning",
            isCorrect: false,
            explanation: "Never forward suspicious emails as this can spread the threat and cause panic.",
            points: 0
          },
          {
            id: "option-2",
            text: "Immediately isolate the user's account and analyze the email",
            isCorrect: true,
            explanation: "Correct! Isolation prevents further damage while analysis determines the threat scope.",
            points: 10
          },
          {
            id: "option-3",
            text: "Delete the email and move on",
            isCorrect: false,
            explanation: "Deleting without analysis misses learning opportunities and may leave other users vulnerable.",
            points: 0
          },
          {
            id: "option-4",
            text: "Click the link to investigate",
            isCorrect: false,
            explanation: "Never click suspicious links! This could compromise your own systems.",
            points: -5
          }
        ]
      },
      {
        id: "step-2",
        title: "Threat Analysis",
        description: "Analysis reveals the email contains a link to a credential harvesting site. The domain was registered 2 days ago.",
        question: "What's your next priority action?",
        visual: {
          type: 'dashboard',
          content: {
            alerts: [
              { type: 'warning', message: 'Suspicious domain detected: universi7y-portal.com', time: '1 min ago' },
              { type: 'info', message: 'Domain registration: 2 days ago', time: '1 min ago' },
              { type: 'critical', message: 'Credential harvesting site identified', time: 'Just now' }
            ],
            networkTraffic: { suspicious: 1, total: 847 },
            threatsBlocked: 12
          }
        },
        options: [
          {
            id: "option-1",
            text: "Check email logs to see who else received similar emails",
            isCorrect: true,
            explanation: "Excellent! Identifying the scope of the attack is crucial for effective response.",
            points: 15
          },
          {
            id: "option-2",
            text: "Immediately reset all user passwords",
            isCorrect: false,
            explanation: "Too broad and disruptive. First determine the scope, then take targeted action.",
            points: 0
          },
          {
            id: "option-3",
            text: "Block the malicious domain",
            isCorrect: false,
            explanation: "Good step, but checking scope first is more important to understand the full impact.",
            points: 5
          },
          {
            id: "option-4",
            text: "Wait to see if more reports come in",
            isCorrect: false,
            explanation: "Passive waiting allows the attack to spread. Proactive investigation is essential.",
            points: -5
          }
        ]
      },
      {
        id: "step-3",
        title: "Containment",
        description: "Email logs show 47 users received the phishing email. 3 users have clicked the link in the last hour.",
        question: "How should you handle the users who clicked the malicious link?",
        visual: {
          type: 'network',
          content: {
            totalUsers: 47,
            clickedUsers: 3,
            compromisedSystems: ['HR-LAPTOP-001', 'FACULTY-DESK-07', 'STUDENT-LAB-23'],
            networkMap: true,
            timelineEvents: [
              { time: '14:23', event: 'Phishing email sent to 47 users' },
              { time: '14:31', event: 'First click detected' },
              { time: '14:45', event: 'Second click detected' },
              { time: '15:12', event: 'Third click detected - CURRENT' }
            ]
          }
        },
        options: [
          {
            id: "option-1",
            text: "Immediately disable their accounts and require password reset",
            isCorrect: true,
            explanation: "Perfect! Quick containment prevents credential theft and further compromise.",
            points: 20
          },
          {
            id: "option-2",
            text: "Monitor their accounts for suspicious activity",
            isCorrect: false,
            explanation: "Monitoring is important but immediate containment should come first.",
            points: 5
          },
          {
            id: "option-3",
            text: "Send them a warning email about phishing",
            isCorrect: false,
            explanation: "Education is good but doesn't address immediate security risk.",
            points: 0
          },
          {
            id: "option-4",
            text: "Ask them to change their passwords when convenient",
            isCorrect: false,
            explanation: "Too slow! Immediate action is needed when credentials are potentially compromised.",
            points: -5
          }
        ]
      }
    ]
  },
  {
    id: "ransomware-attack",
    title: "Ransomware Incident Response",
    description: "Navigate through a critical ransomware attack scenario affecting student information systems.",
    type: "ransomware",
    difficulty: "advanced",
    estimatedTime: "25 min",
    icon: Shield,
    color: "text-red-400",
    steps: [
      {
        id: "step-1",
        title: "Initial Alert",
        description: "Multiple users report that files are becoming inaccessible with .encrypted extensions. A ransom note appears demanding Bitcoin payment.",
        question: "What is your immediate priority in the first 5 minutes?",
        context: "Systems affected: Student Information System, HR Database, Email Server showing signs of encryption",
        visual: {
          type: 'alert',
          content: {
            criticalAlerts: 3,
            encryptedFiles: 15847,
            affectedSystems: ['SIS-SERVER-01', 'HR-DB-MAIN', 'MAIL-SRV-02'],
            ransomNote: 'Your files have been encrypted. Pay 50 BTC to recover your data.',
            encryptionProgress: 73,
            networkStatus: 'COMPROMISED'
          }
        },
        options: [
          {
            id: "option-1",
            text: "Disconnect affected systems from the network immediately",
            isCorrect: true,
            explanation: "Critical! Network isolation prevents ransomware spread to other systems.",
            points: 25
          },
          {
            id: "option-2",
            text: "Try to negotiate with the attackers",
            isCorrect: false,
            explanation: "Never negotiate first. Focus on containment and recovery through proper channels.",
            points: -10
          },
          {
            id: "option-3",
            text: "Start restoring from backups immediately",
            isCorrect: false,
            explanation: "Restoring without containment risks re-infection. Isolate first, then restore.",
            points: 0
          },
          {
            id: "option-4",
            text: "Contact law enforcement",
            isCorrect: false,
            explanation: "Important but not the immediate priority. Containment comes first.",
            points: 5
          }
        ]
      }
    ]
  },
  {
    id: "data-breach",
    title: "Student Data Breach Response",
    description: "Handle a breach involving unauthorized access to student records and personal information.",
    type: "data-breach",
    difficulty: "intermediate",
    estimatedTime: "20 min",
    icon: Database,
    color: "text-purple-400",
    steps: [
      {
        id: "step-1",
        title: "Breach Discovery",
        description: "Database administrator discovers unusual data export activity at 2 AM involving 15,000 student records including SSNs and grades.",
        question: "What should be your first action upon discovering this breach?",
        options: [
          {
            id: "option-1",
            text: "Secure the affected systems and preserve evidence",
            isCorrect: true,
            explanation: "Correct! Securing systems and preserving forensic evidence is crucial for investigation.",
            points: 20
          },
          {
            id: "option-2",
            text: "Immediately notify all affected students",
            isCorrect: false,
            explanation: "Important but premature. First secure systems and understand the full scope.",
            points: 5
          },
          {
            id: "option-3",
            text: "Check if the data was actually accessed or copied",
            isCorrect: false,
            explanation: "Investigation comes after securing systems to prevent further damage.",
            points: 10
          },
          {
            id: "option-4",
            text: "Reset all database access credentials",
            isCorrect: false,
            explanation: "Hasty credential resets might destroy evidence. Secure first, then investigate.",
            points: 0
          }
        ]
      }
    ]
  },
  {
    id: "ddos-attack",
    title: "DDoS Attack Mitigation",
    description: "Respond to a distributed denial of service attack targeting the university's online learning platform.",
    type: "ddos",
    difficulty: "intermediate",
    estimatedTime: "18 min",
    icon: Zap,
    color: "text-yellow-400",
    steps: [
      {
        id: "step-1",
        title: "Service Disruption",
        description: "The online learning platform is experiencing severe slowdowns. Monitoring shows unusual traffic patterns with 10x normal volume.",
        question: "How do you confirm this is a DDoS attack and not a legitimate traffic spike?",
        options: [
          {
            id: "option-1",
            text: "Analyze traffic patterns for geographic distribution and request types",
            isCorrect: true,
            explanation: "Excellent! Pattern analysis helps distinguish attacks from legitimate traffic surges.",
            points: 15
          },
          {
            id: "option-2",
            text: "Immediately block all international traffic",
            isCorrect: false,
            explanation: "Too aggressive and may block legitimate users. Analysis first, then targeted blocking.",
            points: 0
          },
          {
            id: "option-3",
            text: "Restart all web servers",
            isCorrect: false,
            explanation: "Won't help with ongoing DDoS and causes additional downtime.",
            points: -5
          },
          {
            id: "option-4",
            text: "Wait to see if traffic returns to normal",
            isCorrect: false,
            explanation: "Passive approach allows continued service disruption for legitimate users.",
            points: -10
          }
        ]
      }
    ]
  }
];

export default function SecurityPlaybookSimulator() {
  const [simulationState, setSimulationState] = useState<SimulationState>({
    currentScenario: null,
    currentStepIndex: 0,
    score: 0,
    completedSteps: [],
    selectedAnswers: {},
    showResults: false
  });

  const startScenario = (scenario: PlaybookScenario) => {
    setSimulationState({
      currentScenario: scenario,
      currentStepIndex: 0,
      score: 0,
      completedSteps: [],
      selectedAnswers: {},
      showResults: false
    });
  };

  const selectAnswer = (stepId: string, optionId: string) => {
    const { currentScenario, currentStepIndex } = simulationState;
    if (!currentScenario) return;

    const currentStep = currentScenario.steps[currentStepIndex];
    const selectedOption = currentStep.options.find(opt => opt.id === optionId);
    
    if (!selectedOption) return;

    const newScore = simulationState.score + selectedOption.points;
    const newCompletedSteps = [...simulationState.completedSteps, stepId];
    const newSelectedAnswers = {
      ...simulationState.selectedAnswers,
      [stepId]: optionId
    };

    setSimulationState(prev => ({
      ...prev,
      score: newScore,
      completedSteps: newCompletedSteps,
      selectedAnswers: newSelectedAnswers
    }));

    // Move to next step after a delay to show feedback
    setTimeout(() => {
      if (currentStepIndex < currentScenario.steps.length - 1) {
        setSimulationState(prev => ({
          ...prev,
          currentStepIndex: prev.currentStepIndex + 1
        }));
      } else {
        // Show final results
        setSimulationState(prev => ({
          ...prev,
          showResults: true
        }));
      }
    }, 2000);
  };

  const resetSimulator = () => {
    setSimulationState({
      currentScenario: null,
      currentStepIndex: 0,
      score: 0,
      completedSteps: [],
      selectedAnswers: {},
      showResults: false
    });
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-500/20 text-green-400';
      case 'intermediate': return 'bg-yellow-500/20 text-yellow-400';
      case 'advanced': return 'bg-red-500/20 text-red-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getScoreRating = (score: number, maxScore: number) => {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 90) return { rating: 'Excellent', color: 'text-green-400', icon: Trophy };
    if (percentage >= 75) return { rating: 'Good', color: 'text-blue-400', icon: Star };
    if (percentage >= 60) return { rating: 'Average', color: 'text-yellow-400', icon: CheckCircle };
    return { rating: 'Needs Improvement', color: 'text-red-400', icon: XCircle };
  };

  // Visual Components
  const EmailVisual = ({ content }: { content: any }) => (
    <div className="bg-gray-900 rounded-lg p-4 border border-gray-700 font-mono text-sm">
      <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-700">
        <Mail className="w-5 h-5 text-blue-400" />
        <span className="text-xs text-gray-400">Outlook Web Access</span>
      </div>
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-red-400 font-medium">From:</span>
          <span className={`${content.suspicious ? 'text-red-300' : 'text-gray-300'}`}>
            {content.from}
            {content.suspicious && <AlertTriangle className="w-4 h-4 inline ml-1 text-red-400" />}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gray-400 font-medium">To:</span>
          <span className="text-gray-300">{content.to}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gray-400 font-medium">Subject:</span>
          <span className="text-yellow-300 font-medium">{content.subject}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gray-400 font-medium">Time:</span>
          <span className="text-gray-300">{content.timestamp}</span>
        </div>
      </div>
      <div className="mt-4 p-3 bg-gray-800 rounded border-l-4 border-red-500">
        <p className="text-gray-300 mb-3">{content.body}</p>
        <div className="p-2 bg-red-900/30 rounded border border-red-500/50">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-red-400" />
            <span className="text-red-300 text-sm underline">{content.link}</span>
          </div>
        </div>
      </div>
    </div>
  );

  const DashboardVisual = ({ content }: { content: any }) => (
    <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Monitor className="w-5 h-5 text-cyan-400" />
          <span className="text-white font-medium">Security Operations Center</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-sm">
            <span className="text-gray-400">Network Traffic:</span>
            <span className="text-cyan-400 ml-1">{content.networkTraffic.suspicious}/{content.networkTraffic.total}</span>
          </div>
          <div className="text-sm">
            <span className="text-gray-400">Threats Blocked:</span>
            <span className="text-green-400 ml-1">{content.threatsBlocked}</span>
          </div>
        </div>
      </div>
      <div className="space-y-2">
        {content.alerts.map((alert: any, index: number) => (
          <div key={index} className={`p-3 rounded flex items-center gap-3 ${
            alert.type === 'critical' ? 'bg-red-900/30 border border-red-500/50' :
            alert.type === 'warning' ? 'bg-yellow-900/30 border border-yellow-500/50' :
            'bg-blue-900/30 border border-blue-500/50'
          }`}>
            {alert.type === 'critical' && <Skull className="w-4 h-4 text-red-400" />}
            {alert.type === 'warning' && <AlertTriangle className="w-4 h-4 text-yellow-400" />}
            {alert.type === 'info' && <Eye className="w-4 h-4 text-blue-400" />}
            <div className="flex-1">
              <span className="text-gray-300">{alert.message}</span>
            </div>
            <span className="text-xs text-gray-500">{alert.time}</span>
          </div>
        ))}
      </div>
    </div>
  );

  const NetworkVisual = ({ content }: { content: any }) => (
    <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Wifi className="w-5 h-5 text-cyan-400" />
          <span className="text-white font-medium">Network Topology</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-sm">
            <span className="text-gray-400">Total Users:</span>
            <span className="text-cyan-400 ml-1">{content.totalUsers}</span>
          </div>
          <div className="text-sm">
            <span className="text-gray-400">Compromised:</span>
            <span className="text-red-400 ml-1">{content.clickedUsers}</span>
          </div>
        </div>
      </div>
      
      {/* Simple Network Visualization */}
      <div className="mb-6 p-4 bg-gray-800 rounded">
        <div className="flex items-center justify-center">
          <div className="flex items-center space-x-8">
            {/* Router */}
            <div className="flex flex-col items-center">
              <div className="w-12 h-8 bg-gray-700 rounded flex items-center justify-center mb-2">
                <Server className="w-6 h-6 text-cyan-400" />
              </div>
              <span className="text-xs text-gray-400">Router</span>
            </div>
            
            {/* Compromised Systems */}
            <div className="flex flex-col space-y-2">
              {content.compromisedSystems.map((system: string, index: number) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="w-8 h-6 bg-red-900 rounded flex items-center justify-center border border-red-500">
                    <Monitor className="w-4 h-4 text-red-400" />
                  </div>
                  <span className="text-xs text-red-300">{system}</span>
                  <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="space-y-2">
        <h4 className="text-sm font-medium text-white mb-2">Attack Timeline</h4>
        {content.timelineEvents.map((event: any, index: number) => (
          <div key={index} className={`flex items-center gap-3 p-2 rounded ${
            event.event.includes('CURRENT') ? 'bg-red-900/30 border border-red-500/50' : 'bg-gray-800'
          }`}>
            <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
            <span className="text-xs text-gray-400 font-mono">{event.time}</span>
            <span className="text-sm text-gray-300">{event.event}</span>
            {event.event.includes('CURRENT') && <Activity className="w-4 h-4 text-red-400 animate-pulse" />}
          </div>
        ))}
      </div>
    </div>
  );

  const AlertVisual = ({ content }: { content: any }) => (
    <div className="bg-gray-900 rounded-lg p-4 border border-red-500/50">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-red-400 animate-pulse" />
          <span className="text-red-300 font-medium">CRITICAL SECURITY ALERT</span>
        </div>
        <div className="text-sm text-red-400 font-mono">
          STATUS: {content.networkStatus}
        </div>
      </div>

      {/* Critical Stats */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="bg-red-900/30 p-3 rounded text-center border border-red-500/30">
          <div className="text-2xl font-bold text-red-400">{content.criticalAlerts}</div>
          <div className="text-xs text-gray-400">Critical Alerts</div>
        </div>
        <div className="bg-red-900/30 p-3 rounded text-center border border-red-500/30">
          <div className="text-2xl font-bold text-red-400">{content.encryptedFiles.toLocaleString()}</div>
          <div className="text-xs text-gray-400">Files Encrypted</div>
        </div>
        <div className="bg-red-900/30 p-3 rounded text-center border border-red-500/30">
          <div className="text-2xl font-bold text-red-400">{content.encryptionProgress}%</div>
          <div className="text-xs text-gray-400">Encryption Progress</div>
        </div>
      </div>

      {/* Encryption Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-sm mb-1">
          <span className="text-gray-400">Encryption Progress</span>
          <span className="text-red-400">{content.encryptionProgress}%</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div 
            className="bg-red-500 h-2 rounded-full animate-pulse" 
            style={{ width: `${content.encryptionProgress}%` }}
          ></div>
        </div>
      </div>

      {/* Affected Systems */}
      <div className="mb-4">
        <h4 className="text-sm font-medium text-white mb-2">Affected Systems</h4>
        <div className="space-y-1">
          {content.affectedSystems.map((system: string, index: number) => (
            <div key={index} className="flex items-center gap-2 p-2 bg-red-900/20 rounded">
              <Lock className="w-4 h-4 text-red-400" />
              <span className="text-red-300 text-sm font-mono">{system}</span>
              <div className="ml-auto flex items-center gap-1">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-red-400">ENCRYPTED</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Ransom Note */}
      <div className="p-3 bg-black rounded border border-red-500">
        <div className="flex items-center gap-2 mb-2">
          <Skull className="w-5 h-5 text-red-400" />
          <span className="text-red-300 font-bold">RANSOM NOTE</span>
        </div>
        <p className="text-gray-300 text-sm font-mono">{content.ransomNote}</p>
      </div>
    </div>
  );

  const renderStepVisual = (visual: any) => {
    if (!visual) return null;

    switch (visual.type) {
      case 'email':
        return <EmailVisual content={visual.content} />;
      case 'dashboard':
        return <DashboardVisual content={visual.content} />;
      case 'network':
        return <NetworkVisual content={visual.content} />;
      case 'alert':
        return <AlertVisual content={visual.content} />;
      default:
        return null;
    }
  };

  // Scenario Selection View
  if (!simulationState.currentScenario) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-surface/50 to-background p-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center mr-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <div className="text-left">
                <h1 className="text-4xl font-bold text-white mb-2">Interactive Security Playbook Simulator</h1>
                <p className="text-gray-400">Practice incident response through realistic cybersecurity scenarios</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {scenarios.map((scenario) => {
              const IconComponent = scenario.icon;
              return (
                <Card key={scenario.id} className="bg-surface/80 backdrop-blur-md border border-cyan-500/30 cyber-glow hover:border-cyan-400/50 transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className={`w-12 h-12 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-lg flex items-center justify-center mb-4`}>
                        <IconComponent className={`w-6 h-6 ${scenario.color}`} />
                      </div>
                      <div className="flex gap-2">
                        <Badge className={getDifficultyColor(scenario.difficulty)}>
                          {scenario.difficulty}
                        </Badge>
                        <Badge className="bg-gray-500/20 text-gray-300">
                          <Clock className="w-3 h-3 mr-1" />
                          {scenario.estimatedTime}
                        </Badge>
                      </div>
                    </div>
                    <CardTitle className="text-xl text-white">{scenario.title}</CardTitle>
                    <CardDescription className="text-gray-400">
                      {scenario.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-300">
                        {scenario.steps.length} steps
                      </span>
                      <Button
                        onClick={() => startScenario(scenario)}
                        className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
                        data-testid={`button-start-${scenario.id}`}
                      >
                        <Play className="w-4 h-4 mr-2" />
                        Start Simulation
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="mt-16 text-center">
            <Card className="bg-gradient-to-r from-cyan-900/20 to-blue-900/20 border border-cyan-500/30">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-white mb-4">How It Works</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                  <div>
                    <div className="w-12 h-12 bg-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-cyan-400">1</span>
                    </div>
                    <h4 className="text-lg font-semibold text-white mb-2">Choose Scenario</h4>
                    <p className="text-gray-400">Select from real-world cybersecurity incident scenarios</p>
                  </div>
                  <div>
                    <div className="w-12 h-12 bg-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-cyan-400">2</span>
                    </div>
                    <h4 className="text-lg font-semibold text-white mb-2">Make Decisions</h4>
                    <p className="text-gray-400">Navigate through each step making critical security decisions</p>
                  </div>
                  <div>
                    <div className="w-12 h-12 bg-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-cyan-400">3</span>
                    </div>
                    <h4 className="text-lg font-semibold text-white mb-2">Learn & Improve</h4>
                    <p className="text-gray-400">Receive detailed feedback and improve your response skills</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // Results View
  if (simulationState.showResults) {
    const maxScore = simulationState.currentScenario.steps.reduce(
      (sum, step) => sum + Math.max(...step.options.map(opt => opt.points)),
      0
    );
    const scoreRating = getScoreRating(simulationState.score, maxScore);
    const ScoreIcon = scoreRating.icon;

    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-surface/50 to-background p-6">
        <div className="container mx-auto max-w-4xl">
          <Card className="bg-surface/80 backdrop-blur-md border border-cyan-500/30">
            <CardHeader className="text-center">
              <div className="flex items-center justify-center mb-4">
                <ScoreIcon className={`w-16 h-16 ${scoreRating.color}`} />
              </div>
              <CardTitle className="text-3xl text-white mb-2">Simulation Complete!</CardTitle>
              <CardDescription className="text-xl text-gray-300">
                {simulationState.currentScenario.title}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="text-5xl font-bold text-cyan-400 mb-2">
                  {simulationState.score}/{maxScore}
                </div>
                <div className={`text-xl font-semibold ${scoreRating.color} mb-4`}>
                  {scoreRating.rating}
                </div>
                <Progress 
                  value={(simulationState.score / maxScore) * 100} 
                  className="w-full max-w-md mx-auto"
                />
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white">Step-by-Step Results</h3>
                {simulationState.currentScenario.steps.map((step, index) => {
                  const selectedAnswer = simulationState.selectedAnswers[step.id];
                  const selectedOption = step.options.find(opt => opt.id === selectedAnswer);
                  
                  return (
                    <Alert key={step.id} className={`${selectedOption?.isCorrect ? 'border-green-500/50 bg-green-500/10' : 'border-red-500/50 bg-red-500/10'}`}>
                      <AlertTriangle className="w-4 h-4" />
                      <AlertDescription>
                        <div className="space-y-2">
                          <div className="font-semibold">Step {index + 1}: {step.title}</div>
                          <div className="text-sm opacity-90">{step.question}</div>
                          <div className="flex items-center gap-2">
                            {selectedOption?.isCorrect ? (
                              <CheckCircle className="w-4 h-4 text-green-400" />
                            ) : (
                              <XCircle className="w-4 h-4 text-red-400" />
                            )}
                            <span className="text-sm">{selectedOption?.explanation}</span>
                          </div>
                          <div className="text-sm font-medium">
                            Points: {selectedOption?.points || 0}
                          </div>
                        </div>
                      </AlertDescription>
                    </Alert>
                  );
                })}
              </div>

              <div className="flex gap-4 justify-center">
                <Button
                  onClick={() => startScenario(simulationState.currentScenario!)}
                  variant="outline"
                  className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10"
                  data-testid="button-retry-scenario"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Try Again
                </Button>
                <Button
                  onClick={resetSimulator}
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
                  data-testid="button-new-scenario"
                >
                  Choose New Scenario
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Simulation View
  const currentStep = simulationState.currentScenario.steps[simulationState.currentStepIndex];
  const selectedAnswer = simulationState.selectedAnswers[currentStep.id];
  const progressPercentage = ((simulationState.currentStepIndex + 1) / simulationState.currentScenario.steps.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-surface/50 to-background p-6">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-white">{simulationState.currentScenario.title}</h1>
            <Button
              onClick={resetSimulator}
              variant="outline"
              size="sm"
              className="border-gray-600 text-gray-400 hover:text-white"
              data-testid="button-exit-simulation"
            >
              Exit Simulation
            </Button>
          </div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">
              Step {simulationState.currentStepIndex + 1} of {simulationState.currentScenario.steps.length}
            </span>
            <span className="text-sm text-cyan-400 font-semibold">
              Score: {simulationState.score}
            </span>
          </div>
          <Progress value={progressPercentage} className="w-full" />
        </div>

        {/* Visual Scenario Display */}
        {currentStep.visual && (
          <Card className="bg-surface/80 backdrop-blur-md border border-cyan-500/30 mb-6">
            <CardHeader>
              <CardTitle className="text-lg text-white flex items-center gap-2">
                <Monitor className="w-5 h-5" />
                Live Incident View
              </CardTitle>
            </CardHeader>
            <CardContent>
              {renderStepVisual(currentStep.visual)}
            </CardContent>
          </Card>
        )}

        {/* Current Step */}
        <Card className="bg-surface/80 backdrop-blur-md border border-cyan-500/30">
          <CardHeader>
            <CardTitle className="text-xl text-white">{currentStep.title}</CardTitle>
            <CardDescription className="text-gray-300 text-base">
              {currentStep.description}
            </CardDescription>
            {currentStep.context && (
              <Alert className="mt-4 border-orange-500/50 bg-orange-500/10">
                <AlertTriangle className="w-4 h-4" />
                <AlertDescription className="font-medium">
                  Context: {currentStep.context}
                </AlertDescription>
              </Alert>
            )}
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">{currentStep.question}</h3>
              
              <div className="space-y-3">
                {currentStep.options.map((option) => {
                  const isSelected = selectedAnswer === option.id;
                  const showFeedback = !!selectedAnswer;
                  
                  return (
                    <Button
                      key={option.id}
                      onClick={() => !selectedAnswer && selectAnswer(currentStep.id, option.id)}
                      disabled={!!selectedAnswer}
                      variant="outline"
                      className={`w-full p-4 h-auto text-left justify-start ${
                        isSelected
                          ? option.isCorrect
                            ? 'border-green-500 bg-green-500/10 text-green-300'
                            : 'border-red-500 bg-red-500/10 text-red-300'
                          : showFeedback && option.isCorrect
                          ? 'border-green-500/50 bg-green-500/5'
                          : 'border-gray-600 hover:border-cyan-500/50 text-gray-300'
                      }`}
                      data-testid={`option-${option.id}`}
                    >
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          {showFeedback && isSelected && (
                            option.isCorrect ? (
                              <CheckCircle className="w-4 h-4 text-green-400" />
                            ) : (
                              <XCircle className="w-4 h-4 text-red-400" />
                            )
                          )}
                          <span className="font-medium">{option.text}</span>
                        </div>
                        {showFeedback && isSelected && (
                          <div className="text-sm opacity-90 mt-2">
                            {option.explanation}
                          </div>
                        )}
                      </div>
                    </Button>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}