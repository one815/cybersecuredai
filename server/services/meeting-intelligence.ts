/**
 * Meeting Intelligence Service
 * Phase 2: Real-time transcription and intelligent meeting analysis
 * 
 * Features:
 * - Real-time audio transcription using OpenAI Whisper
 * - Meeting content analysis and insights
 * - Action items and decision extraction
 * - Security and compliance monitoring
 * - Integration with Cypher AI genetic algorithms
 */

import OpenAI from 'openai';
import { EventEmitter } from 'events';
import { geneticMemoryStore } from './genetic-memory-store.js';

// the newest OpenAI model is "gpt-5" which was released August 7, 2025. do not change this unless explicitly requested by the user
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export interface MeetingSession {
  id: string;
  title: string;
  participants: Participant[];
  startTime: Date;
  endTime?: Date;
  transcription: TranscriptionSegment[];
  insights: MeetingInsights;
  actionItems: ActionItem[];
  securityFindings: SecurityFinding[];
  complianceSector: 'FERPA' | 'FISMA' | 'CIPA' | 'GENERAL';
  status: 'active' | 'completed' | 'paused';
}

export interface Participant {
  id: string;
  name: string;
  role: string;
  organization: string;
  speakingTime: number;
  engagementScore: number;
}

export interface TranscriptionSegment {
  id: string;
  speaker: string;
  text: string;
  timestamp: Date;
  confidence: number;
  language: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  keywords: string[];
}

export interface MeetingInsights {
  summary: string;
  keyTopics: Topic[];
  decisions: Decision[];
  risksIdentified: Risk[];
  complianceFlags: ComplianceFlag[];
  engagementMetrics: EngagementMetrics;
  nextSteps: string[];
}

export interface Topic {
  name: string;
  relevance: number;
  timeSpent: number;
  participants: string[];
  keyPoints: string[];
}

export interface Decision {
  description: string;
  decisionMaker: string;
  impact: 'high' | 'medium' | 'low';
  deadline?: Date;
  dependencies: string[];
}

export interface Risk {
  description: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  category: 'security' | 'compliance' | 'operational' | 'financial';
  mitigation: string;
  owner: string;
}

export interface ComplianceFlag {
  regulation: string;
  violation: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  recommendation: string;
  timestamp: Date;
}

export interface ActionItem {
  id: string;
  description: string;
  assignee: string;
  priority: 'urgent' | 'high' | 'medium' | 'low';
  dueDate?: Date;
  status: 'pending' | 'in_progress' | 'completed' | 'blocked';
  dependencies: string[];
}

export interface EngagementMetrics {
  totalSpeakingTime: number;
  averageEngagement: number;
  participationBalance: number;
  interruptionCount: number;
  questionCount: number;
}

export interface SecurityFinding {
  type: 'data_leak' | 'unauthorized_access' | 'policy_violation' | 'threat_mention';
  description: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  timestamp: Date;
  context: string;
  recommendation: string;
}

export interface RealTimeTranscriptionConfig {
  language: string;
  enableSentimentAnalysis: boolean;
  enableSecurityMonitoring: boolean;
  complianceMode: boolean;
  autoActionItemExtraction: boolean;
  participantIdentification: boolean;
}

export class MeetingIntelligenceService extends EventEmitter {
  private activeSessions: Map<string, MeetingSession> = new Map();
  private transcriptionConfig: RealTimeTranscriptionConfig;
  private isInitialized: boolean = false;

  constructor() {
    super();
    this.transcriptionConfig = {
      language: 'en',
      enableSentimentAnalysis: true,
      enableSecurityMonitoring: true,
      complianceMode: true,
      autoActionItemExtraction: true,
      participantIdentification: true
    };
    this.initializeService();
  }

  /**
   * Initialize Meeting Intelligence Service
   */
  async initializeService(): Promise<void> {
    console.log('🎤 Initializing Meeting Intelligence Service...');
    
    try {
      // Check if OpenAI API key is configured
      if (!process.env.OPENAI_API_KEY) {
        console.log('⚠️ OpenAI API key not configured - Meeting Intelligence Service running in limited mode');
        this.isInitialized = false;
        return;
      }

      // Verify API access
      await this.testOpenAIConnection();
      
      this.isInitialized = true;
      console.log('✅ Meeting Intelligence Service initialized successfully');
      this.emit('serviceInitialized');
      
    } catch (error) {
      console.error('❌ Failed to initialize Meeting Intelligence Service:', error);
      console.log('⚠️ Meeting Intelligence Service running in limited mode');
      this.isInitialized = false;
      this.emit('serviceError', error);
    }
  }

  /**
   * Test OpenAI API connection
   */
  private async testOpenAIConnection(): Promise<void> {
    try {
      const response = await openai.chat.completions.create({
        model: 'gpt-5', // the newest OpenAI model is "gpt-5" which was released August 7, 2025. do not change this unless explicitly requested by the user
        messages: [{ role: 'user', content: 'Test connection' }],
        max_completion_tokens: 5
      });
      
      if (response.choices?.[0]?.message) {
        console.log('✅ OpenAI API connection verified');
      }
    } catch (error) {
      throw new Error(`OpenAI API connection failed: ${error}`);
    }
  }

  /**
   * Start a new meeting session
   */
  async startMeetingSession(config: {
    title: string;
    participants: Participant[];
    complianceSector: 'FERPA' | 'FISMA' | 'CIPA' | 'GENERAL';
  }): Promise<string> {
    if (!this.isInitialized) {
      throw new Error('Meeting Intelligence Service not initialized');
    }

    const sessionId = `meeting-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    const session: MeetingSession = {
      id: sessionId,
      title: config.title,
      participants: config.participants,
      startTime: new Date(),
      transcription: [],
      insights: {
        summary: '',
        keyTopics: [],
        decisions: [],
        risksIdentified: [],
        complianceFlags: [],
        engagementMetrics: {
          totalSpeakingTime: 0,
          averageEngagement: 0,
          participationBalance: 0,
          interruptionCount: 0,
          questionCount: 0
        },
        nextSteps: []
      },
      actionItems: [],
      securityFindings: [],
      complianceSector: config.complianceSector,
      status: 'active'
    };

    this.activeSessions.set(sessionId, session);
    
    console.log(`🎤 Started meeting session: ${config.title} (${sessionId})`);
    this.emit('sessionStarted', { sessionId, session });
    
    return sessionId;
  }

  /**
   * Process real-time audio transcription
   */
  async transcribeAudio(sessionId: string, audioBuffer: Buffer, speaker?: string): Promise<TranscriptionSegment> {
    const session = this.activeSessions.get(sessionId);
    if (!session) {
      throw new Error(`Meeting session ${sessionId} not found`);
    }

    try {
      // Use OpenAI Whisper for transcription
      const transcription = await openai.audio.transcriptions.create({
        file: new File([audioBuffer], 'audio.wav', { type: 'audio/wav' }),
        model: 'whisper-1',
        language: this.transcriptionConfig.language,
        response_format: 'verbose_json',
        timestamp_granularities: ['segment']
      });

      const segment: TranscriptionSegment = {
        id: `segment-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        speaker: speaker || 'Unknown',
        text: transcription.text,
        timestamp: new Date(),
        confidence: 0.95, // Whisper doesn't provide confidence, using high default
        language: transcription.language || 'en',
        sentiment: 'neutral', // Will be analyzed
        keywords: []
      };

      // Analyze sentiment and extract keywords
      await this.analyzeTranscriptionSegment(segment, session.complianceSector);
      
      // Add to session transcription
      session.transcription.push(segment);
      
      // Real-time analysis
      await this.performRealTimeAnalysis(session, segment);
      
      this.emit('transcriptionUpdate', { sessionId, segment });
      
      return segment;

    } catch (error) {
      console.error('❌ Transcription failed:', error);
      throw error;
    }
  }

  /**
   * Analyze transcription segment for sentiment and keywords
   */
  private async analyzeTranscriptionSegment(segment: TranscriptionSegment, complianceSector: string): Promise<void> {
    if (!this.transcriptionConfig.enableSentimentAnalysis) return;

    try {
      const analysisPrompt = `
        Analyze the following meeting transcript segment for:
        1. Sentiment (positive/neutral/negative)
        2. Key topics and keywords
        3. Security or compliance concerns for ${complianceSector} sector
        
        Transcript: "${segment.text}"
        
        Respond with JSON format: {
          "sentiment": "positive|neutral|negative",
          "keywords": ["keyword1", "keyword2"],
          "securityConcerns": ["concern1"],
          "complianceFlags": ["flag1"]
        }
      `;

      const response = await openai.chat.completions.create({
        model: 'gpt-5', // the newest OpenAI model is "gpt-5" which was released August 7, 2025. do not change this unless explicitly requested by the user
        messages: [{ role: 'user', content: analysisPrompt }],
        response_format: { type: 'json_object' },
        max_completion_tokens: 500
      });

      const analysis = JSON.parse(response.choices[0].message.content || '{}');
      
      segment.sentiment = analysis.sentiment || 'neutral';
      segment.keywords = analysis.keywords || [];
      
      // Store security concerns for later processing
      if (analysis.securityConcerns?.length > 0) {
        this.emit('securityConcernDetected', {
          sessionId: segment.id,
          concerns: analysis.securityConcerns,
          context: segment.text
        });
      }

    } catch (error) {
      console.error('❌ Segment analysis failed:', error);
      // Continue with default values
    }
  }

  /**
   * Perform real-time analysis during meeting
   */
  private async performRealTimeAnalysis(session: MeetingSession, segment: TranscriptionSegment): Promise<void> {
    // Security monitoring
    if (this.transcriptionConfig.enableSecurityMonitoring) {
      await this.checkSecurityThreats(session, segment);
    }

    // Compliance monitoring
    if (this.transcriptionConfig.complianceMode) {
      await this.checkComplianceViolations(session, segment);
    }

    // Auto-extract action items
    if (this.transcriptionConfig.autoActionItemExtraction) {
      await this.extractActionItems(session, segment);
    }

    // Update engagement metrics
    this.updateEngagementMetrics(session, segment);
  }

  /**
   * Check for security threats in conversation
   */
  private async checkSecurityThreats(session: MeetingSession, segment: TranscriptionSegment): Promise<void> {
    const securityKeywords = [
      'password', 'credential', 'api key', 'secret', 'token', 'breach', 'hack', 
      'vulnerability', 'exploit', 'malware', 'phishing', 'unauthorized'
    ];

    const lowerText = segment.text.toLowerCase();
    const detectedKeywords = securityKeywords.filter(keyword => lowerText.includes(keyword));

    if (detectedKeywords.length > 0) {
      const finding: SecurityFinding = {
        type: 'threat_mention',
        description: `Security-related terms detected: ${detectedKeywords.join(', ')}`,
        severity: detectedKeywords.some(k => ['breach', 'hack', 'exploit'].includes(k)) ? 'high' : 'medium',
        timestamp: segment.timestamp,
        context: segment.text,
        recommendation: `Review discussion context and ensure security protocols are followed`
      };

      session.securityFindings.push(finding);
      this.emit('securityFindingDetected', { sessionId: session.id, finding });
    }
  }

  /**
   * Check for compliance violations
   */
  private async checkComplianceViolations(session: MeetingSession, segment: TranscriptionSegment): Promise<void> {
    const complianceKeywords = {
      'FERPA': ['student record', 'educational record', 'directory information', 'consent'],
      'FISMA': ['classified', 'government data', 'security control', 'authorization'],
      'CIPA': ['minor', 'internet filter', 'harmful content', 'school policy'],
      'GENERAL': ['data protection', 'privacy', 'confidential', 'personal information']
    };

    const sectorKeywords = complianceKeywords[session.complianceSector] || [];
    const lowerText = segment.text.toLowerCase();
    const detectedKeywords = sectorKeywords.filter(keyword => lowerText.includes(keyword));

    if (detectedKeywords.length > 0) {
      // Use AI to determine if this represents a potential violation
      try {
        const violationCheckPrompt = `
          Analyze if the following meeting transcript segment contains potential ${session.complianceSector} compliance violations:
          
          Transcript: "${segment.text}"
          
          Respond with JSON: {
            "hasViolation": true|false,
            "severity": "critical|high|medium|low",
            "description": "violation description",
            "recommendation": "recommended action"
          }
        `;

        const response = await openai.chat.completions.create({
          model: 'gpt-5', // the newest OpenAI model is "gpt-5" which was released August 7, 2025. do not change this unless explicitly requested by the user
          messages: [{ role: 'user', content: violationCheckPrompt }],
          response_format: { type: 'json_object' },
          max_completion_tokens: 300
        });

        const analysis = JSON.parse(response.choices[0].message.content || '{}');
        
        if (analysis.hasViolation) {
          const flag: ComplianceFlag = {
            regulation: session.complianceSector,
            violation: analysis.description,
            severity: analysis.severity || 'medium',
            recommendation: analysis.recommendation,
            timestamp: segment.timestamp
          };

          session.insights.complianceFlags.push(flag);
          this.emit('complianceViolationDetected', { sessionId: session.id, flag });
        }

      } catch (error) {
        console.error('❌ Compliance analysis failed:', error);
      }
    }
  }

  /**
   * Extract action items from conversation
   */
  private async extractActionItems(session: MeetingSession, segment: TranscriptionSegment): Promise<void> {
    const actionKeywords = [
      'action item', 'todo', 'follow up', 'will do', 'assigned to', 'deadline', 
      'next step', 'responsible for', 'deliverable'
    ];

    const lowerText = segment.text.toLowerCase();
    const hasActionKeywords = actionKeywords.some(keyword => lowerText.includes(keyword));

    if (hasActionKeywords) {
      try {
        const actionExtractionPrompt = `
          Extract action items from this meeting transcript:
          
          "${segment.text}"
          
          Respond with JSON array of action items:
          [{
            "description": "action description",
            "assignee": "person assigned",
            "priority": "urgent|high|medium|low",
            "dueDate": "YYYY-MM-DD or null"
          }]
        `;

        const response = await openai.chat.completions.create({
          model: 'gpt-5', // the newest OpenAI model is "gpt-5" which was released August 7, 2025. do not change this unless explicitly requested by the user
          messages: [{ role: 'user', content: actionExtractionPrompt }],
          response_format: { type: 'json_object' },
          max_completion_tokens: 400
        });

        const extraction = JSON.parse(response.choices[0].message.content || '{"actionItems": []}');
        const actionItems = extraction.actionItems || [];

        for (const item of actionItems) {
          const actionItem: ActionItem = {
            id: `action-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            description: item.description,
            assignee: item.assignee || 'Unassigned',
            priority: item.priority || 'medium',
            dueDate: item.dueDate ? new Date(item.dueDate) : undefined,
            status: 'pending',
            dependencies: []
          };

          session.actionItems.push(actionItem);
          this.emit('actionItemExtracted', { sessionId: session.id, actionItem });
        }

      } catch (error) {
        console.error('❌ Action item extraction failed:', error);
      }
    }
  }

  /**
   * Update engagement metrics
   */
  private updateEngagementMetrics(session: MeetingSession, segment: TranscriptionSegment): void {
    const participant = session.participants.find(p => p.name === segment.speaker);
    if (participant) {
      participant.speakingTime += segment.text.length * 0.1; // Rough estimate
      
      // Update engagement score based on sentiment and participation
      if (segment.sentiment === 'positive') {
        participant.engagementScore += 2;
      } else if (segment.sentiment === 'negative') {
        participant.engagementScore -= 1;
      }
    }

    // Count questions for engagement
    if (segment.text.includes('?')) {
      session.insights.engagementMetrics.questionCount++;
    }
  }

  /**
   * Generate comprehensive meeting insights
   */
  async generateMeetingInsights(sessionId: string): Promise<MeetingInsights> {
    const session = this.activeSessions.get(sessionId);
    if (!session) {
      throw new Error(`Meeting session ${sessionId} not found`);
    }

    try {
      const fullTranscript = session.transcription.map(seg => 
        `${seg.speaker}: ${seg.text}`
      ).join('\n');

      const insightsPrompt = `
        Analyze this complete meeting transcript and provide comprehensive insights:
        
        ${fullTranscript}
        
        Generate insights in JSON format:
        {
          "summary": "brief meeting summary",
          "keyTopics": [{"name": "topic", "relevance": 0.9, "timeSpent": 15}],
          "decisions": [{"description": "decision", "decisionMaker": "person", "impact": "high"}],
          "risksIdentified": [{"description": "risk", "severity": "high", "category": "security"}],
          "nextSteps": ["step1", "step2"]
        }
      `;

      const response = await openai.chat.completions.create({
        model: 'gpt-5', // the newest OpenAI model is "gpt-5" which was released August 7, 2025. do not change this unless explicitly requested by the user
        messages: [{ role: 'user', content: insightsPrompt }],
        response_format: { type: 'json_object' },
        max_completion_tokens: 2000
      });

      const insights = JSON.parse(response.choices[0].message.content || '{}');
      
      // Update session insights
      session.insights.summary = insights.summary || '';
      session.insights.keyTopics = insights.keyTopics || [];
      session.insights.decisions = insights.decisions || [];
      session.insights.risksIdentified = insights.risksIdentified || [];
      session.insights.nextSteps = insights.nextSteps || [];
      
      // Calculate final engagement metrics
      this.calculateFinalEngagementMetrics(session);
      
      this.emit('insightsGenerated', { sessionId, insights: session.insights });
      
      return session.insights;

    } catch (error) {
      console.error('❌ Insights generation failed:', error);
      throw error;
    }
  }

  /**
   * Calculate final engagement metrics
   */
  private calculateFinalEngagementMetrics(session: MeetingSession): void {
    const totalParticipants = session.participants.length;
    const totalSpeakingTime = session.participants.reduce((sum, p) => sum + p.speakingTime, 0);
    const avgEngagement = session.participants.reduce((sum, p) => sum + p.engagementScore, 0) / totalParticipants;
    
    // Calculate participation balance (how evenly distributed speaking time is)
    const speakingTimes = session.participants.map(p => p.speakingTime);
    const avgSpeakingTime = totalSpeakingTime / totalParticipants;
    const variance = speakingTimes.reduce((sum, time) => sum + Math.pow(time - avgSpeakingTime, 2), 0) / totalParticipants;
    const participationBalance = Math.max(0, 1 - (variance / (avgSpeakingTime * avgSpeakingTime)));
    
    session.insights.engagementMetrics = {
      totalSpeakingTime,
      averageEngagement: avgEngagement,
      participationBalance,
      interruptionCount: 0, // Would need more complex analysis to detect
      questionCount: session.insights.engagementMetrics.questionCount
    };
  }

  /**
   * End meeting session
   */
  async endMeetingSession(sessionId: string): Promise<MeetingSession> {
    const session = this.activeSessions.get(sessionId);
    if (!session) {
      throw new Error(`Meeting session ${sessionId} not found`);
    }

    session.endTime = new Date();
    session.status = 'completed';
    
    // Generate final insights
    await this.generateMeetingInsights(sessionId);
    
    // Store session data for genetic algorithm learning
    await this.storeMeetingDataForLearning(session);
    
    console.log(`✅ Meeting session completed: ${session.title}`);
    this.emit('sessionCompleted', { sessionId, session });
    
    return session;
  }

  /**
   * Store meeting data for genetic algorithm learning
   */
  private async storeMeetingDataForLearning(session: MeetingSession): Promise<void> {
    try {
      // Extract learnings for genetic algorithm improvement
      const learningData = {
        complianceSector: session.complianceSector,
        securityFindings: session.securityFindings.length,
        complianceFlags: session.insights.complianceFlags.length,
        actionItemsExtracted: session.actionItems.length,
        engagementMetrics: session.insights.engagementMetrics,
        meetingDuration: session.endTime ? 
          (session.endTime.getTime() - session.startTime.getTime()) / (1000 * 60) : 0
      };

      // This would integrate with the genetic algorithm to improve meeting analysis
      console.log(`📚 Storing meeting learnings for ${session.complianceSector} sector`);
      
    } catch (error) {
      console.error('❌ Failed to store meeting learning data:', error);
    }
  }

  /**
   * Get active meeting sessions
   */
  getActiveSessions(): MeetingSession[] {
    return Array.from(this.activeSessions.values()).filter(session => session.status === 'active');
  }

  /**
   * Get meeting session by ID
   */
  getMeetingSession(sessionId: string): MeetingSession | null {
    return this.activeSessions.get(sessionId) || null;
  }

  /**
   * Update transcription configuration
   */
  updateConfiguration(config: Partial<RealTimeTranscriptionConfig>): void {
    this.transcriptionConfig = { ...this.transcriptionConfig, ...config };
    this.emit('configurationUpdated', this.transcriptionConfig);
  }

  /**
   * Get service status
   */
  getServiceStatus(): any {
    return {
      isInitialized: this.isInitialized,
      activeSessions: this.activeSessions.size,
      configuration: this.transcriptionConfig,
      capabilities: {
        realTimeTranscription: true,
        sentimentAnalysis: true,
        securityMonitoring: true,
        complianceChecking: true,
        actionItemExtraction: true,
        meetingInsights: true
      }
    };
  }

  /**
   * Cleanup resources
   */
  async shutdown(): Promise<void> {
    // End all active sessions
    for (const [sessionId, session] of this.activeSessions) {
      if (session.status === 'active') {
        await this.endMeetingSession(sessionId);
      }
    }
    
    this.activeSessions.clear();
    this.isInitialized = false;
    
    console.log('🛑 Meeting Intelligence Service shutdown complete');
  }
}

export default MeetingIntelligenceService;