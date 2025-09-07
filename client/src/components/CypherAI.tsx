import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { 
  Bot, 
  Send, 
  Mic, 
  MicOff, 
  Calendar, 
  FileText, 
  Shield, 
  Zap,
  Brain,
  MessageSquare,
  Phone,
  Video,
  Clock,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  Settings,
  Users,
  Activity,
  Target,
  Lightbulb,
  Search,
  Minimize2,
  Maximize2
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  type: 'user' | 'cypher';
  content: string;
  timestamp: Date;
  category?: 'threat' | 'compliance' | 'technical' | 'general' | 'emergency';
  actions?: Array<{
    label: string;
    action: string;
    priority?: 'low' | 'medium' | 'high' | 'critical';
  }>;
  attachments?: Array<{
    type: 'transcript' | 'ticket' | 'report';
    name: string;
    id: string;
  }>;
}

interface CypherAIProps {
  isExpanded?: boolean;
  onToggleExpand?: () => void;
  className?: string;
}

export function CypherAI({ isExpanded = false, onToggleExpand, className = "" }: CypherAIProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'cypher',
      content: '👋 Hello! I\'m Cypher, your AI Cyber Tech Assistant. I can help you with threat analysis, compliance management, incident response, meeting transcription, ticket management, and smart scheduling. What would you like assistance with today?',
      timestamp: new Date(),
      category: 'general',
      actions: [
        { label: 'Analyze Threats', action: 'analyze_threats' },
        { label: 'Check Compliance', action: 'check_compliance' },
        { label: 'Schedule Meeting', action: 'schedule_meeting' },
        { label: 'Review Tickets', action: 'review_tickets' }
      ]
    }
  ]);
  
  const [currentInput, setCurrentInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [cypherStats, setCypherStats] = useState({
    alertsReduced: 65,
    responseTime: 47,
    complianceEfficiency: 70,
    accuracyImproved: 53,
    transcriptionAccuracy: 95,
    ticketResolution: 40,
    calendarOptimization: 35
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognition = useRef<SpeechRecognition | null>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognition.current = new SpeechRecognition();
      recognition.current.continuous = false;
      recognition.current.interimResults = false;
      recognition.current.lang = 'en-US';

      recognition.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setCurrentInput(transcript);
        setIsListening(false);
      };

      recognition.current.onerror = () => {
        setIsListening(false);
        toast({
          title: "Speech Recognition Error",
          description: "Could not process voice input. Please try again.",
          variant: "destructive",
        });
      };

      recognition.current.onend = () => {
        setIsListening(false);
      };
    }
  }, [toast]);

  const handleVoiceInput = () => {
    if (!recognition.current) {
      toast({
        title: "Voice Not Supported",
        description: "Speech recognition is not supported in this browser.",
        variant: "destructive",
      });
      return;
    }

    if (isListening) {
      recognition.current.stop();
      setIsListening(false);
    } else {
      recognition.current.start();
      setIsListening(true);
    }
  };

  const processUserQuery = async (query: string): Promise<Message> => {
    // Simulate AI processing with realistic responses
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

    const queryLower = query.toLowerCase();
    let response = '';
    let category: Message['category'] = 'general';
    let actions: Message['actions'] = [];

    if (queryLower.includes('threat') || queryLower.includes('malware') || queryLower.includes('attack')) {
      category = 'threat';
      response = `🛡️ **Threat Analysis Complete**\n\nI've analyzed your security query and identified potential threat vectors. Based on current threat intelligence feeds, I recommend:\n\n• **Immediate Actions**: Review firewall logs for suspicious activity\n• **Risk Level**: Medium-High based on current threat landscape\n• **Recommended Response**: Implement additional monitoring for endpoints\n\n**Key Insights**: Recent threat intelligence suggests increased phishing campaigns targeting educational institutions. Would you like me to create a security incident ticket or schedule a threat briefing?`;
      actions = [
        { label: 'Create Security Ticket', action: 'create_ticket', priority: 'high' },
        { label: 'Schedule Briefing', action: 'schedule_briefing', priority: 'medium' },
        { label: 'Run Deep Scan', action: 'deep_scan', priority: 'high' }
      ];
    } else if (queryLower.includes('compliance') || queryLower.includes('ferpa') || queryLower.includes('fisma')) {
      category = 'compliance';
      response = `📋 **Compliance Assessment**\n\nCompliance status reviewed for FERPA, FISMA, and CIPA frameworks:\n\n• **FERPA Compliance**: ✅ 94% compliant (2 minor gaps identified)\n• **FISMA Controls**: ✅ 97% implemented (1 control pending)\n• **CIPA Requirements**: ✅ 100% compliant\n\n**Action Items**:\n1. Update data retention policies (FERPA)\n2. Complete AC-6 access control review (FISMA)\n\nWould you like me to generate a detailed compliance report or schedule a review meeting?`;
      actions = [
        { label: 'Generate Report', action: 'compliance_report', priority: 'medium' },
        { label: 'Schedule Review', action: 'schedule_review', priority: 'low' },
        { label: 'Fix Gaps', action: 'fix_compliance', priority: 'high' }
      ];
    } else if (queryLower.includes('meeting') || queryLower.includes('schedule') || queryLower.includes('calendar')) {
      category = 'general';
      response = `📅 **Smart Scheduling Analysis**\n\nI've optimized your calendar for maximum efficiency:\n\n• **Best Meeting Times**: Tuesday-Thursday, 10 AM - 3 PM\n• **Conflict Resolution**: 3 scheduling conflicts resolved\n• **Focus Time**: 4 hours of uninterrupted work time protected\n\n**Upcoming Priorities**:\n- Security team standup (Tomorrow, 9 AM)\n- Compliance review meeting (Thursday, 2 PM)\n- Incident response drill (Next week)\n\n**Meeting Transcription**: All scheduled meetings will be automatically recorded and transcribed with 95% accuracy. Action items will be extracted and added to your task list.`;
      actions = [
        { label: 'View Calendar', action: 'view_calendar', priority: 'low' },
        { label: 'Schedule Meeting', action: 'schedule_new', priority: 'medium' },
        { label: 'Meeting Settings', action: 'meeting_settings', priority: 'low' }
      ];
    } else if (queryLower.includes('ticket') || queryLower.includes('incident') || queryLower.includes('support')) {
      category = 'technical';
      response = `🎫 **Ticket Management Overview**\n\nCurrent ticket status and AI-optimized priorities:\n\n• **Open Tickets**: 12 (3 critical, 4 high, 5 medium)\n• **Average Resolution**: 2.3 days (40% improvement with AI)\n• **Smart Prioritization**: Tickets auto-categorized by urgency\n\n**Priority Queue**:\n1. Security incident #CYBER-20250907-1234 (Critical)\n2. Network anomaly #CYBER-20250907-1235 (High) \n3. User access request #CYBER-20250907-1236 (Medium)\n\n**AI Insights**: Pattern detected in recent tickets suggests potential infrastructure issue. Recommend proactive system check.`;
      actions = [
        { label: 'View All Tickets', action: 'view_tickets', priority: 'medium' },
        { label: 'Create New Ticket', action: 'create_ticket', priority: 'medium' },
        { label: 'System Check', action: 'system_check', priority: 'high' }
      ];
    } else {
      response = `🤖 I'm here to help! I can assist you with:\n\n**Core Capabilities**:\n• **Threat Analysis**: Automated security threat classification and response\n• **Compliance Management**: FERPA, FISMA, CIPA compliance tracking\n• **Meeting Support**: Transcription, summarization, and action item extraction\n• **Ticket Management**: AI-powered prioritization and workflow optimization\n• **Smart Scheduling**: Calendar optimization with 35% efficiency improvement\n• **Communication Tracking**: Email and message engagement analytics\n\n**24/7 Support**: I'm available around the clock to help reduce alert fatigue and accelerate your incident response by 47%. What specific area would you like assistance with?`;
      actions = [
        { label: 'Security Analysis', action: 'security_analysis', priority: 'medium' },
        { label: 'Compliance Check', action: 'compliance_check', priority: 'medium' },
        { label: 'Schedule Assistant', action: 'schedule_assistant', priority: 'low' },
        { label: 'View Dashboard', action: 'view_dashboard', priority: 'low' }
      ];
    }

    return {
      id: Date.now().toString(),
      type: 'cypher',
      content: response,
      timestamp: new Date(),
      category,
      actions
    };
  };

  const handleSendMessage = async () => {
    if (!currentInput.trim() || isProcessing) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: currentInput,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setCurrentInput('');
    setIsProcessing(true);

    try {
      const cypherResponse = await processUserQuery(currentInput);
      setMessages(prev => [...prev, cypherResponse]);
    } catch (error) {
      const errorMessage: Message = {
        id: Date.now().toString(),
        type: 'cypher',
        content: '⚠️ I encountered an error processing your request. Please try again or contact support if the issue persists.',
        timestamp: new Date(),
        category: 'general'
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleActionClick = (action: string) => {
    const actionMessages: Record<string, string> = {
      analyze_threats: 'analyze current threat landscape',
      check_compliance: 'show compliance status',
      schedule_meeting: 'help me schedule a meeting',
      review_tickets: 'show me current tickets',
      create_ticket: 'create a new security ticket',
      schedule_briefing: 'schedule a security briefing',
      view_calendar: 'show my calendar',
      view_dashboard: 'open security dashboard'
    };

    setCurrentInput(actionMessages[action] || action.replace('_', ' '));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Card className={`bg-slate-900/95 border-cyan-500/30 ${className}`}>
      <CardContent className="p-0">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700/50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Cypher AI Assistant</h3>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-xs text-gray-400">Online • AI-Powered</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Badge className="bg-spring-500/20 text-spring-400 border-spring-500/30 text-xs">
              95% Accuracy
            </Badge>
            {onToggleExpand && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onToggleExpand}
                className="text-gray-400 hover:text-white"
                data-testid="toggle-expand"
              >
                {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </Button>
            )}
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-4 gap-1 p-3 bg-slate-800/50">
          <div className="text-center">
            <div className="text-spring-400 text-sm font-bold">-{cypherStats.alertsReduced}%</div>
            <div className="text-xs text-gray-400">Alert Fatigue</div>
          </div>
          <div className="text-center">
            <div className="text-cyan-400 text-sm font-bold">+{cypherStats.responseTime}%</div>
            <div className="text-xs text-gray-400">Response Speed</div>
          </div>
          <div className="text-center">
            <div className="text-orange-400 text-sm font-bold">-{cypherStats.complianceEfficiency}%</div>
            <div className="text-xs text-gray-400">Manual Work</div>
          </div>
          <div className="text-center">
            <div className="text-blue-400 text-sm font-bold">+{cypherStats.accuracyImproved}%</div>
            <div className="text-xs text-gray-400">Accuracy</div>
          </div>
        </div>

        {/* Messages */}
        <div className={`${isExpanded ? 'h-96' : 'h-64'} overflow-y-auto p-4 space-y-4`}>
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] ${message.type === 'user' 
                ? 'bg-cyan-600 text-white rounded-l-lg rounded-tr-lg' 
                : 'bg-slate-800 text-gray-100 rounded-r-lg rounded-tl-lg border border-gray-700/50'
              } p-3`}>
                {message.type === 'cypher' && (
                  <div className="flex items-center space-x-2 mb-2">
                    <Brain className="w-4 h-4 text-cyan-400" />
                    <span className="text-xs text-cyan-400 font-medium">Cypher AI</span>
                    {message.category && (
                      <Badge 
                        className={`text-xs ${
                          message.category === 'threat' ? 'bg-red-500/20 text-red-400 border-red-500/30' :
                          message.category === 'compliance' ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' :
                          message.category === 'technical' ? 'bg-purple-500/20 text-purple-400 border-purple-500/30' :
                          'bg-gray-500/20 text-gray-400 border-gray-500/30'
                        }`}
                      >
                        {message.category}
                      </Badge>
                    )}
                  </div>
                )}
                
                <div className="text-sm whitespace-pre-wrap">{message.content}</div>
                
                {message.actions && message.actions.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {message.actions.map((action, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        className={`text-xs ${
                          action.priority === 'critical' ? 'border-red-500/50 text-red-400 hover:bg-red-500/10' :
                          action.priority === 'high' ? 'border-orange-500/50 text-orange-400 hover:bg-orange-500/10' :
                          action.priority === 'medium' ? 'border-yellow-500/50 text-yellow-400 hover:bg-yellow-500/10' :
                          'border-gray-500/50 text-gray-400 hover:bg-gray-500/10'
                        }`}
                        onClick={() => handleActionClick(action.action)}
                        data-testid={`action-${action.action}`}
                      >
                        {action.label}
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
          
          {isProcessing && (
            <div className="flex justify-start">
              <div className="bg-slate-800 border border-gray-700/50 rounded-r-lg rounded-tl-lg p-3">
                <div className="flex items-center space-x-2">
                  <Brain className="w-4 h-4 text-cyan-400 animate-pulse" />
                  <span className="text-sm text-gray-400">Cypher AI is thinking...</span>
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-gray-700/50">
          <div className="flex items-end space-x-2">
            <div className="flex-1">
              <Textarea
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Ask Cypher about threats, compliance, scheduling, tickets, or any security concern..."
                className="bg-slate-800 border-gray-600 text-white resize-none"
                rows={2}
                disabled={isProcessing}
                data-testid="cypher-input"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <Button
                onClick={handleVoiceInput}
                variant={isListening ? "destructive" : "outline"}
                size="sm"
                className="w-10 h-10"
                disabled={isProcessing}
                data-testid="voice-input"
              >
                {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </Button>
              <Button
                onClick={handleSendMessage}
                className="w-10 h-10 bg-cyan-600 hover:bg-cyan-700"
                disabled={!currentInput.trim() || isProcessing}
                data-testid="send-message"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
            <span>Press Enter to send • Shift+Enter for new line</span>
            <span>🎯 24/7 AI-Powered Security Operations</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}