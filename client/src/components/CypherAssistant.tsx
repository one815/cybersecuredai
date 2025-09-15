import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { MessageCircle, Send, Bot, User, Shield, AlertTriangle, Info, CheckCircle, X, Minimize2 } from 'lucide-react';
import cypherAiAssistImage from '@assets/Cypher AI Asst. webp_1757952570718.webp';
import { useAuth } from '@/hooks/useAuth';
import { apiRequest } from '@/lib/queryClient';
import { useMutation } from '@tanstack/react-query';

interface CypherMessage {
  id: string;
  userId: string;
  userRole: string;
  message: string;
  timestamp: Date;
  context?: any;
}

interface CypherResponse {
  id: string;
  message: string;
  timestamp: Date;
  type: 'text' | 'action' | 'recommendation' | 'analysis' | 'alert';
  confidence: number;
  actions?: {
    label: string;
    action: string;
    data?: any;
  }[];
  visualData?: any;
  followUpSuggestions?: string[];
}

interface CypherAssistantProps {
  currentPage?: string;
  contextData?: any;
  minimized?: boolean;
  onToggleMinimize?: () => void;
}

export function CypherAssistant({ 
  currentPage, 
  contextData, 
  minimized = false, 
  onToggleMinimize 
}: CypherAssistantProps) {
  const { user } = useAuth();
  const [messages, setMessages] = useState<(CypherMessage | CypherResponse)[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const cypherMutation = useMutation({
    mutationFn: async (message: CypherMessage): Promise<CypherResponse> => {
      const response = await apiRequest('/api/cypher/chat', 'POST', message);
      return await response.json();
    },
    onSuccess: (response: CypherResponse) => {
      setMessages(prev => [...prev, response]);
      scrollToBottom();
    },
    onError: (error) => {
      console.error('Cypher error:', error);
      // Add error message
      const errorResponse: CypherResponse = {
        id: `error-${Date.now()}`,
        message: "I apologize, but I'm experiencing technical difficulties. Please try again in a moment.",
        timestamp: new Date(),
        type: 'text',
        confidence: 0
      };
      setMessages(prev => [...prev, errorResponse]);
    }
  });

  const scrollToBottom = () => {
    setTimeout(() => {
      if (scrollAreaRef.current) {
        const scrollElement = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
        if (scrollElement) {
          scrollElement.scrollTop = scrollElement.scrollHeight;
        }
      }
    }, 100);
  };

  const sendMessage = async () => {
    if (!inputMessage.trim() || !user) return;

    const userMessage: CypherMessage = {
      id: `user-${Date.now()}`,
      userId: user.id,
      userRole: user.role,
      message: inputMessage.trim(),
      timestamp: new Date(),
      context: {
        currentPage,
        securityData: contextData
      }
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    scrollToBottom();

    cypherMutation.mutate(userMessage);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const executeCypherAction = async (action: string, data?: any) => {
    console.log('Executing Cypher action:', action, data);
    // In a real implementation, this would trigger specific platform actions
    
    const actionResponse: CypherResponse = {
      id: `action-${Date.now()}`,
      message: `✅ Action "${action}" has been initiated. Check the relevant dashboard section for updates.`,
      timestamp: new Date(),
      type: 'text',
      confidence: 1.0
    };
    
    setMessages(prev => [...prev, actionResponse]);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputMessage(suggestion);
    sendMessage();
  };

  const getMessageIcon = (type: string) => {
    switch (type) {
      case 'alert': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'recommendation': return <Info className="w-4 h-4 text-blue-500" />;
      case 'analysis': return <Shield className="w-4 h-4 text-green-500" />;
      case 'action': return <CheckCircle className="w-4 h-4 text-orange-500" />;
      default: return <img src={cypherAiAssistImage} alt="Cypher AI" className="w-4 h-4 rounded-full" />;
    }
  };

  const getConfidenceBadge = (confidence: number) => {
    if (confidence >= 0.9) return <Badge variant="default" className="text-xs font-semibold bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">🎯 High Confidence</Badge>;
    if (confidence >= 0.7) return <Badge variant="secondary" className="text-xs font-semibold bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">⚡ Medium Confidence</Badge>;
    return <Badge variant="outline" className="text-xs font-semibold bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">⚠️ Low Confidence</Badge>;
  };

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Send welcome message
      const welcomeMessage: CypherResponse = {
        id: 'welcome',
        message: `Hello ${user?.firstName || 'there'}! I'm Cypher, your AI Cyber Tech Assistant. I'm here to help you with cybersecurity operations, threat analysis, compliance guidance, and security best practices.\n\nHow can I assist you today?`,
        timestamp: new Date(),
        type: 'text',
        confidence: 1.0,
        followUpSuggestions: [
          "What's our current security status?",
          "Help me with incident response",
          "Show me compliance requirements",
          "What are today's security alerts?"
        ]
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, user]);

  if (minimized) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={() => onToggleMinimize?.()}
          className="rounded-full w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg p-0 overflow-hidden"
          data-testid="cypher-toggle-button"
        >
          <img src={cypherAiAssistImage} alt="Cypher AI Assistant" className="w-8 h-8 rounded-full" />
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen ? (
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg p-0 overflow-hidden"
          data-testid="cypher-open-button"
        >
          <img src={cypherAiAssistImage} alt="Cypher AI Assistant" className="w-8 h-8 rounded-full" />
        </Button>
      ) : (
        <Card className="w-96 h-[600px] shadow-2xl border-2 border-blue-200 dark:border-blue-800 bg-white dark:bg-gray-950">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img src={cypherAiAssistImage} alt="Cypher AI Assistant" className="w-5 h-5 rounded-full" />
                <CardTitle className="text-lg font-bold">Cypher AI Assistant</CardTitle>
              </div>
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onToggleMinimize?.()}
                  className="text-white hover:bg-white/20 h-8 w-8 p-0"
                  data-testid="cypher-minimize-button"
                >
                  <Minimize2 className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:bg-white/20 h-8 w-8 p-0"
                  data-testid="cypher-close-button"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div className="text-xs opacity-90 font-medium">
              🛡️ AI-powered cybersecurity assistance
            </div>
          </CardHeader>

          <CardContent className="p-0 h-[520px] flex flex-col bg-gray-50 dark:bg-gray-900">
            <ScrollArea ref={scrollAreaRef} className="flex-1 p-4 bg-gray-50 dark:bg-gray-900">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className="space-y-2">
                    {'userRole' in message ? (
                      // User message
                      <div className="flex justify-end mb-4">
                        <div className="max-w-[80%] bg-blue-600 text-white rounded-lg p-4 shadow-md">
                          <div className="flex items-center gap-2 mb-2">
                            <User className="w-4 h-4" />
                            <span className="text-xs font-semibold">You</span>
                          </div>
                          <p className="text-sm leading-relaxed font-medium">{message.message}</p>
                          <div className="text-xs opacity-75 mt-2">
                            {new Date(message.timestamp).toLocaleTimeString()}
                          </div>
                        </div>
                      </div>
                    ) : (
                      // Cypher response
                      <div className="flex justify-start mb-4">
                        <div className="max-w-[85%] bg-white dark:bg-gray-900 border-2 border-purple-200 dark:border-purple-700 rounded-lg p-4 shadow-md">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                              {getMessageIcon(message.type)}
                              <span className="text-sm font-bold text-purple-600 dark:text-purple-400">Cypher AI</span>
                            </div>
                            {getConfidenceBadge(message.confidence)}
                          </div>
                          
                          <div className="text-sm leading-relaxed mb-3 text-gray-900 dark:text-gray-100" dangerouslySetInnerHTML={{
                            __html: message.message.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-gray-900 dark:text-white">$1</strong>')
                              .replace(/• /g, '• ')
                              .replace(/\n/g, '<br>')
                          }} />
                          
                          <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                            {new Date(message.timestamp).toLocaleTimeString()}
                          </div>

                          {message.actions && message.actions.length > 0 && (
                            <div className="space-y-2 mb-3 border-t border-gray-200 dark:border-gray-700 pt-3">
                              <div className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">Quick Actions:</div>
                              <div className="grid grid-cols-1 gap-2">
                                {message.actions.map((action, index) => (
                                  <Button
                                    key={index}
                                    variant="outline"
                                    size="sm"
                                    onClick={() => executeCypherAction(action.action, action.data)}
                                    className="text-xs justify-start bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/40 border-blue-200 dark:border-blue-700 text-blue-700 dark:text-blue-300"
                                    data-testid={`cypher-action-${action.action}`}
                                  >
                                    {action.label}
                                  </Button>
                                ))}
                              </div>
                            </div>
                          )}

                          {message.followUpSuggestions && message.followUpSuggestions.length > 0 && (
                            <div className="space-y-2 border-t border-gray-200 dark:border-gray-700 pt-3">
                              <div className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">Try asking:</div>
                              <div className="space-y-1">
                                {message.followUpSuggestions.map((suggestion, index) => (
                                  <Button
                                    key={index}
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleSuggestionClick(suggestion)}
                                    className="text-xs justify-start h-auto p-2 text-left whitespace-normal bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600"
                                    data-testid={`cypher-suggestion-${index}`}
                                  >
                                    💡 {suggestion}
                                  </Button>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))}

                {cypherMutation.isPending && (
                  <div className="flex justify-start mb-4">
                    <div className="bg-white dark:bg-gray-900 border-2 border-purple-200 dark:border-purple-700 rounded-lg p-4 shadow-md">
                      <div className="flex items-center gap-3">
                        <img src={cypherAiAssistImage} alt="Cypher AI" className="w-5 h-5 rounded-full animate-pulse" />
                        <div className="flex flex-col">
                          <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">Cypher AI</span>
                          <span className="text-xs text-gray-600 dark:text-gray-400">Analyzing your request...</span>
                        </div>
                      </div>
                      <div className="mt-2 flex space-x-1">
                        <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
              <div className="flex gap-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask Cypher about cybersecurity..."
                  className="flex-1 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 font-medium"
                  disabled={cypherMutation.isPending}
                  data-testid="cypher-message-input"
                />
                <Button
                  onClick={sendMessage}
                  disabled={!inputMessage.trim() || cypherMutation.isPending}
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold"
                  data-testid="cypher-send-button"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}