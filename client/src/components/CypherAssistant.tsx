import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { MessageCircle, Send, Bot, User, Shield, AlertTriangle, Info, CheckCircle, X, Minimize2 } from 'lucide-react';
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
      const response = await fetch('/api/cypher/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(message)
      });
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
      default: return <Bot className="w-4 h-4 text-purple-500" />;
    }
  };

  const getConfidenceBadge = (confidence: number) => {
    if (confidence >= 0.9) return <Badge variant="default" className="text-xs">High Confidence</Badge>;
    if (confidence >= 0.7) return <Badge variant="secondary" className="text-xs">Medium Confidence</Badge>;
    return <Badge variant="outline" className="text-xs">Low Confidence</Badge>;
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
          className="rounded-full w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg"
          data-testid="cypher-toggle-button"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen ? (
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg"
          data-testid="cypher-open-button"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      ) : (
        <Card className="w-96 h-[600px] shadow-2xl border-2 border-blue-200 dark:border-blue-800">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5" />
                <CardTitle className="text-lg">Cypher AI Assistant</CardTitle>
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
            <div className="text-xs opacity-90">
              AI-powered cybersecurity assistance
            </div>
          </CardHeader>

          <CardContent className="p-0 h-[520px] flex flex-col">
            <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className="space-y-2">
                    {'userRole' in message ? (
                      // User message
                      <div className="flex justify-end">
                        <div className="max-w-[80%] bg-blue-500 text-white rounded-lg p-3">
                          <div className="flex items-center gap-2 mb-1">
                            <User className="w-4 h-4" />
                            <span className="text-xs font-medium">You</span>
                          </div>
                          <p className="text-sm whitespace-pre-wrap">{message.message}</p>
                        </div>
                      </div>
                    ) : (
                      // Cypher response
                      <div className="flex justify-start">
                        <div className="max-w-[85%] bg-gray-100 dark:bg-gray-800 rounded-lg p-3">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              {getMessageIcon(message.type)}
                              <span className="text-xs font-medium text-purple-600 dark:text-purple-400">Cypher</span>
                            </div>
                            {getConfidenceBadge(message.confidence)}
                          </div>
                          
                          <div className="text-sm whitespace-pre-wrap mb-3" dangerouslySetInnerHTML={{
                            __html: message.message.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                              .replace(/• /g, '• ')
                              .replace(/\n/g, '<br>')
                          }} />

                          {message.actions && message.actions.length > 0 && (
                            <div className="space-y-2 mb-3">
                              <Separator />
                              <div className="grid grid-cols-1 gap-2">
                                {message.actions.map((action, index) => (
                                  <Button
                                    key={index}
                                    variant="outline"
                                    size="sm"
                                    onClick={() => executeCypherAction(action.action, action.data)}
                                    className="text-xs justify-start"
                                    data-testid={`cypher-action-${action.action}`}
                                  >
                                    {action.label}
                                  </Button>
                                ))}
                              </div>
                            </div>
                          )}

                          {message.followUpSuggestions && message.followUpSuggestions.length > 0 && (
                            <div className="space-y-2">
                              <Separator />
                              <div className="text-xs text-gray-600 dark:text-gray-400 mb-2">Suggestions:</div>
                              <div className="space-y-1">
                                {message.followUpSuggestions.map((suggestion, index) => (
                                  <Button
                                    key={index}
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleSuggestionClick(suggestion)}
                                    className="text-xs justify-start h-auto p-2 text-left whitespace-normal"
                                    data-testid={`cypher-suggestion-${index}`}
                                  >
                                    {suggestion}
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
                  <div className="flex justify-start">
                    <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3">
                      <div className="flex items-center gap-2">
                        <Bot className="w-4 h-4 text-purple-500 animate-pulse" />
                        <span className="text-xs text-gray-600 dark:text-gray-400">Cypher is thinking...</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask Cypher about cybersecurity..."
                  className="flex-1"
                  disabled={cypherMutation.isPending}
                  data-testid="cypher-message-input"
                />
                <Button
                  onClick={sendMessage}
                  disabled={!inputMessage.trim() || cypherMutation.isPending}
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700"
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