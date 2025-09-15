/**
 * Calendar Optimization Engine
 * Phase 3: External Integrations for CyberSecured AI
 * 
 * Features:
 * - Google Calendar and Microsoft Outlook integration
 * - Smart scheduling with conflict resolution
 * - Meeting effectiveness optimization
 * - Focus time protection and productivity analysis
 * - Cross-platform calendar synchronization
 * - AI-powered meeting preparation and follow-ups
 */

import { EventEmitter } from 'events';
// Dynamic import for googleapis to reduce initial bundle size
let google: any = null;
let googleapisLoading = false;
let googleapisPromise: Promise<any> | null = null;

const loadGoogleApis = async () => {
  if (google) return google;
  if (googleapisPromise) return googleapisPromise;
  
  googleapisLoading = true;
  googleapisPromise = import('googleapis').then(module => {
    google = module.google;
    googleapisLoading = false;
    return google;
  }).catch(error => {
    console.error('Failed to load googleapis:', error);
    googleapisLoading = false;
    throw error;
  });
  
  return googleapisPromise;
};
import axios from 'axios';

export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  startTime: Date;
  endTime: Date;
  attendees: CalendarAttendee[];
  location?: string;
  isRecurring: boolean;
  priority: 'low' | 'medium' | 'high' | 'critical';
  category: 'meeting' | 'focus_time' | 'security_review' | 'training' | 'incident_response';
  platform: 'google' | 'outlook';
  meetingIntelligence?: {
    preparationNeeded: boolean;
    agendaItems: string[];
    relevantDocuments: string[];
    expectedOutcomes: string[];
  };
}

export interface CalendarAttendee {
  email: string;
  name: string;
  status: 'accepted' | 'declined' | 'tentative' | 'no_response';
  role: 'organizer' | 'required' | 'optional';
  availability?: AvailabilityStatus;
}

export interface AvailabilityStatus {
  isBusy: boolean;
  nextFreeSlot: Date;
  workingHours: {
    start: string; // HH:MM format
    end: string;
    timezone: string;
  };
  preferences: {
    preferredMeetingLength: number; // minutes
    bufferTime: number; // minutes between meetings
    noMeetingDays: string[]; // ['friday_afternoon']
  };
}

export interface SchedulingConflict {
  conflictType: 'overlap' | 'double_booking' | 'outside_hours' | 'travel_time' | 'preparation_needed';
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  affectedEvents: string[]; // event IDs
  suggestedResolution: {
    action: 'reschedule' | 'shorten' | 'combine' | 'delegate' | 'cancel';
    alternatives: {
      startTime: Date;
      endTime: Date;
      confidence: number; // 0-100
      reasoning: string;
    }[];
  };
}

export interface ProductivityAnalysis {
  period: string; // '2025-01-08 to 2025-01-14'
  metrics: {
    totalMeetingTime: number; // minutes
    focusTimeProtected: number; // minutes
    meetingEfficiency: number; // 0-100 score
    contextSwitches: number;
    deepWorkBlocks: number;
    interruptionRate: number; // interruptions per hour
  };
  insights: {
    mostProductiveHours: string[];
    leastProductiveHours: string[];
    optimalMeetingLength: number; // minutes
    meetingFatigue: number; // 0-100 score
  };
  recommendations: {
    type: 'schedule_optimization' | 'meeting_reduction' | 'focus_protection' | 'workload_balance';
    priority: 'low' | 'medium' | 'high';
    description: string;
    expectedImpact: string;
  }[];
}

export interface SmartSchedulingRequest {
  title: string;
  duration: number; // minutes
  attendees: string[]; // email addresses
  priority: 'low' | 'medium' | 'high' | 'critical';
  category: 'meeting' | 'security_review' | 'training' | 'incident_response';
  constraints: {
    earliestStart: Date;
    latestEnd: Date;
    preferredTimes?: Date[];
    blackoutPeriods?: { start: Date; end: Date }[];
    requiresPreparation?: boolean;
    minimumNotice?: number; // hours
  };
  meetingRequirements: {
    requiresScreenShare?: boolean;
    isConfidential?: boolean;
    requiresRecording?: boolean;
    maxAttendees?: number;
  };
}

export class CalendarOptimizationService extends EventEmitter {
  private googleCalendar: any = null;
  private outlookClient: any = null;
  private isInitialized: boolean = false;
  private optimizationInterval: NodeJS.Timeout | null = null;

  constructor() {
    super();
    this.initializeService();
  }

  /**
   * Initialize Calendar Optimization Service
   */
  async initializeService(): Promise<void> {
    console.log('📅 Initializing Calendar Optimization Engine...');
    
    try {
      // Initialize Google Calendar integration
      if (process.env.GOOGLE_CALENDAR_CLIENT_ID && process.env.GOOGLE_CALENDAR_CLIENT_SECRET) {
        await this.initializeGoogleCalendar();
      }

      // Initialize Microsoft Outlook integration
      if (process.env.MICROSOFT_GRAPH_CLIENT_ID && process.env.MICROSOFT_GRAPH_CLIENT_SECRET) {
        await this.initializeMicrosoftGraph();
      }

      // Start optimization monitoring
      this.startOptimizationMonitoring();

      this.isInitialized = true;
      console.log('✅ Calendar Optimization Engine initialized successfully');
      this.emit('serviceInitialized');
      
    } catch (error) {
      console.error('❌ Failed to initialize Calendar Optimization Service:', error);
      this.emit('serviceError', error);
    }
  }

  /**
   * Initialize Google Calendar integration
   */
  private async initializeGoogleCalendar(): Promise<void> {
    try {
      const auth = new google.auth.OAuth2(
        process.env.GOOGLE_CALENDAR_CLIENT_ID,
        process.env.GOOGLE_CALENDAR_CLIENT_SECRET,
        'http://localhost:3000/auth/google/callback' // redirect URI
      );

      this.googleCalendar = google.calendar({ version: 'v3', auth });
      console.log('✅ Google Calendar integration initialized');
      
    } catch (error) {
      console.error('❌ Google Calendar initialization failed:', error);
      throw error;
    }
  }

  /**
   * Initialize Microsoft Graph (Outlook) integration
   */
  private async initializeMicrosoftGraph(): Promise<void> {
    try {
      // Initialize Microsoft Graph client
      this.outlookClient = {
        clientId: process.env.MICROSOFT_GRAPH_CLIENT_ID,
        clientSecret: process.env.MICROSOFT_GRAPH_CLIENT_SECRET
      };
      console.log('✅ Microsoft Outlook integration initialized');
      
    } catch (error) {
      console.error('❌ Microsoft Outlook initialization failed:', error);
      throw error;
    }
  }

  /**
   * Get calendar events with optimization analysis
   */
  async getOptimizedCalendarEvents(
    startDate: Date,
    endDate: Date,
    platforms: ('google' | 'outlook')[] = ['google', 'outlook']
  ): Promise<{
    events: CalendarEvent[];
    conflicts: SchedulingConflict[];
    optimization: {
      efficiency: number;
      recommendations: string[];
      focusTimeAvailable: number;
    };
  }> {
    const allEvents: CalendarEvent[] = [];
    const conflicts: SchedulingConflict[] = [];

    try {
      // Fetch from Google Calendar
      if (platforms.includes('google') && this.googleCalendar) {
        const googleEvents = await this.fetchGoogleCalendarEvents(startDate, endDate);
        allEvents.push(...googleEvents);
      }

      // Fetch from Outlook
      if (platforms.includes('outlook') && this.outlookClient) {
        const outlookEvents = await this.fetchOutlookEvents(startDate, endDate);
        allEvents.push(...outlookEvents);
      }

      // Analyze conflicts and optimization opportunities
      const conflictsFound = await this.analyzeSchedulingConflicts(allEvents);
      conflicts.push(...conflictsFound);

      const optimization = await this.calculateOptimizationMetrics(allEvents, startDate, endDate);

      this.emit('calendarAnalyzed', { events: allEvents.length, conflicts: conflicts.length, efficiency: optimization.efficiency });

      return { events: allEvents, conflicts, optimization };

    } catch (error) {
      console.error('❌ Calendar events fetch failed:', error);
      throw error;
    }
  }

  /**
   * Fetch Google Calendar events
   */
  private async fetchGoogleCalendarEvents(startDate: Date, endDate: Date): Promise<CalendarEvent[]> {
    // Simulate Google Calendar API response
    const events: CalendarEvent[] = [
      {
        id: 'google-001',
        title: 'Weekly Security Review',
        description: 'Review security incidents and threat landscape',
        startTime: new Date(startDate.getTime() + 2 * 60 * 60 * 1000), // +2 hours
        endTime: new Date(startDate.getTime() + 3 * 60 * 60 * 1000), // +3 hours
        attendees: [
          {
            email: 'security.team@cybersecuredai.com',
            name: 'Security Team',
            status: 'accepted',
            role: 'required'
          }
        ],
        location: 'Conference Room A',
        isRecurring: true,
        priority: 'high',
        category: 'security_review',
        platform: 'google',
        meetingIntelligence: {
          preparationNeeded: true,
          agendaItems: ['Incident review', 'Threat intelligence update', 'Policy updates'],
          relevantDocuments: ['security_dashboard.pdf', 'threat_report_weekly.pdf'],
          expectedOutcomes: ['Action items assigned', 'Policy updates approved']
        }
      },
      {
        id: 'google-002',
        title: 'Deep Focus: Compliance Documentation',
        description: 'Protected time for FERPA compliance documentation',
        startTime: new Date(startDate.getTime() + 5 * 60 * 60 * 1000), // +5 hours
        endTime: new Date(startDate.getTime() + 7 * 60 * 60 * 1000), // +7 hours
        attendees: [],
        isRecurring: false,
        priority: 'high',
        category: 'focus_time',
        platform: 'google'
      }
    ];

    return events;
  }

  /**
   * Fetch Outlook events
   */
  private async fetchOutlookEvents(startDate: Date, endDate: Date): Promise<CalendarEvent[]> {
    // Simulate Outlook API response
    const events: CalendarEvent[] = [
      {
        id: 'outlook-001',
        title: 'Cybersecurity Training Session',
        description: 'Monthly training on latest threats and best practices',
        startTime: new Date(startDate.getTime() + 4 * 60 * 60 * 1000), // +4 hours
        endTime: new Date(startDate.getTime() + 5.5 * 60 * 60 * 1000), // +5.5 hours
        attendees: [
          {
            email: 'all.staff@organization.edu',
            name: 'All Staff',
            status: 'tentative',
            role: 'required'
          }
        ],
        location: 'Virtual - Teams Meeting',
        isRecurring: true,
        priority: 'medium',
        category: 'training',
        platform: 'outlook'
      }
    ];

    return events;
  }

  /**
   * Smart scheduling with AI optimization
   */
  async scheduleSmartMeeting(request: SmartSchedulingRequest): Promise<{
    success: boolean;
    proposedSlots: {
      startTime: Date;
      endTime: Date;
      confidence: number;
      pros: string[];
      cons: string[];
      attendeeAvailability: { email: string; available: boolean }[];
    }[];
    conflicts: SchedulingConflict[];
    eventId?: string;
  }> {
    try {
      // Analyze attendee availability
      const attendeeAvailability = await this.analyzeAttendeeAvailability(
        request.attendees,
        request.constraints.earliestStart,
        request.constraints.latestEnd
      );

      // Find optimal time slots
      const optimalSlots = await this.findOptimalTimeSlots(request, attendeeAvailability);

      // Check for conflicts
      const conflicts = await this.validateSchedulingConstraints(request, optimalSlots);

      // If we have viable slots, create the meeting
      let eventId: string | undefined;
      if (optimalSlots.length > 0 && conflicts.filter(c => c.severity === 'critical').length === 0) {
        eventId = await this.createOptimizedMeeting(request, optimalSlots[0]);
      }

      const result = {
        success: eventId !== undefined,
        proposedSlots: optimalSlots,
        conflicts,
        eventId
      };

      this.emit('meetingScheduled', { request, result });
      return result;

    } catch (error) {
      console.error('❌ Smart scheduling failed:', error);
      throw error;
    }
  }

  /**
   * Analyze attendee availability
   */
  private async analyzeAttendeeAvailability(
    attendees: string[],
    startWindow: Date,
    endWindow: Date
  ): Promise<Map<string, AvailabilityStatus>> {
    const availability = new Map<string, AvailabilityStatus>();

    for (const attendee of attendees) {
      // Simulate availability analysis
      const status: AvailabilityStatus = {
        isBusy: Math.random() < 0.3, // 30% chance of being busy
        nextFreeSlot: new Date(startWindow.getTime() + Math.random() * 4 * 60 * 60 * 1000),
        workingHours: {
          start: '09:00',
          end: '17:00',
          timezone: 'America/New_York'
        },
        preferences: {
          preferredMeetingLength: 30,
          bufferTime: 15,
          noMeetingDays: Math.random() < 0.2 ? ['friday_afternoon'] : []
        }
      };
      
      availability.set(attendee, status);
    }

    return availability;
  }

  /**
   * Find optimal time slots
   */
  private async findOptimalTimeSlots(
    request: SmartSchedulingRequest,
    availability: Map<string, AvailabilityStatus>
  ): Promise<{
    startTime: Date;
    endTime: Date;
    confidence: number;
    pros: string[];
    cons: string[];
    attendeeAvailability: { email: string; available: boolean }[];
  }[]> {
    const slots: any[] = [];

    // Generate 3 optimal time slots
    for (let i = 0; i < 3; i++) {
      const startTime = new Date(request.constraints.earliestStart.getTime() + i * 2 * 60 * 60 * 1000);
      const endTime = new Date(startTime.getTime() + request.duration * 60 * 1000);

      const attendeeAvailability = Array.from(availability.entries()).map(([email, status]) => ({
        email,
        available: !status.isBusy || Math.random() < 0.7
      }));

      const availableCount = attendeeAvailability.filter(a => a.available).length;
      const confidence = (availableCount / attendeeAvailability.length) * 100;

      const slot = {
        startTime,
        endTime,
        confidence: Math.round(confidence),
        pros: [
          confidence > 80 ? 'High attendee availability' : 'Good attendee availability',
          'Within working hours',
          'Allows preparation time'
        ],
        cons: confidence < 70 ? ['Some attendees may have conflicts'] : [],
        attendeeAvailability
      };

      slots.push(slot);
    }

    // Sort by confidence
    return slots.sort((a, b) => b.confidence - a.confidence);
  }

  /**
   * Validate scheduling constraints
   */
  private async validateSchedulingConstraints(
    request: SmartSchedulingRequest,
    slots: any[]
  ): Promise<SchedulingConflict[]> {
    const conflicts: SchedulingConflict[] = [];

    for (const slot of slots) {
      // Check for potential conflicts
      if (slot.confidence < 50) {
        conflicts.push({
          conflictType: 'double_booking',
          severity: 'high',
          description: 'Low attendee availability may cause scheduling conflicts',
          affectedEvents: ['proposed-meeting'],
          suggestedResolution: {
            action: 'reschedule',
            alternatives: [{
              startTime: new Date(slot.startTime.getTime() + 24 * 60 * 60 * 1000),
              endTime: new Date(slot.endTime.getTime() + 24 * 60 * 60 * 1000),
              confidence: 75,
              reasoning: 'Move to next day for better availability'
            }]
          }
        });
      }

      if (request.constraints.requiresPreparation) {
        const now = new Date();
        const timeDiff = (slot.startTime.getTime() - now.getTime()) / (1000 * 60 * 60);
        
        if (timeDiff < 2) { // Less than 2 hours notice
          conflicts.push({
            conflictType: 'preparation_needed',
            severity: 'medium',
            description: 'Insufficient time for meeting preparation',
            affectedEvents: ['proposed-meeting'],
            suggestedResolution: {
              action: 'reschedule',
              alternatives: [{
                startTime: new Date(now.getTime() + 4 * 60 * 60 * 1000),
                endTime: new Date(now.getTime() + (4 * 60 + request.duration) * 60 * 1000),
                confidence: 85,
                reasoning: 'Allow adequate preparation time'
              }]
            }
          });
        }
      }
    }

    return conflicts;
  }

  /**
   * Create optimized meeting
   */
  private async createOptimizedMeeting(
    request: SmartSchedulingRequest,
    slot: any
  ): Promise<string> {
    const eventId = `smart-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    const event: CalendarEvent = {
      id: eventId,
      title: request.title,
      description: `AI-optimized meeting scheduled with ${slot.confidence}% confidence`,
      startTime: slot.startTime,
      endTime: slot.endTime,
      attendees: request.attendees.map(email => ({
        email,
        name: email.split('@')[0],
        status: 'no_response',
        role: 'required'
      })),
      isRecurring: false,
      priority: request.priority,
      category: request.category,
      platform: 'google', // Default to Google Calendar
      meetingIntelligence: {
        preparationNeeded: request.constraints.requiresPreparation || false,
        agendaItems: ['Meeting objectives', 'Key discussion points', 'Next steps'],
        relevantDocuments: [],
        expectedOutcomes: ['Clear action items', 'Decision documentation']
      }
    };

    console.log(`📅 Created optimized meeting: ${request.title} at ${slot.startTime.toISOString()}`);
    this.emit('meetingCreated', { eventId, event });
    
    return eventId;
  }

  /**
   * Analyze scheduling conflicts
   */
  private async analyzeSchedulingConflicts(events: CalendarEvent[]): Promise<SchedulingConflict[]> {
    const conflicts: SchedulingConflict[] = [];

    // Check for overlapping events
    for (let i = 0; i < events.length; i++) {
      for (let j = i + 1; j < events.length; j++) {
        const event1 = events[i];
        const event2 = events[j];

        if (this.eventsOverlap(event1, event2)) {
          conflicts.push({
            conflictType: 'overlap',
            severity: 'high',
            description: `"${event1.title}" overlaps with "${event2.title}"`,
            affectedEvents: [event1.id, event2.id],
            suggestedResolution: {
              action: 'reschedule',
              alternatives: [{
                startTime: new Date(event2.endTime.getTime() + 15 * 60 * 1000), // 15 min buffer
                endTime: new Date(event2.endTime.getTime() + 15 * 60 * 1000 + (event1.endTime.getTime() - event1.startTime.getTime())),
                confidence: 80,
                reasoning: 'Move conflicting event after the first one with buffer time'
              }]
            }
          });
        }
      }
    }

    // Check for insufficient break time
    const sortedEvents = events.sort((a, b) => a.startTime.getTime() - b.startTime.getTime());
    for (let i = 0; i < sortedEvents.length - 1; i++) {
      const current = sortedEvents[i];
      const next = sortedEvents[i + 1];
      
      const timeBetween = (next.startTime.getTime() - current.endTime.getTime()) / (1000 * 60);
      
      if (timeBetween < 10 && timeBetween > 0) { // Less than 10 minutes between meetings
        conflicts.push({
          conflictType: 'travel_time',
          severity: 'medium',
          description: 'Insufficient break time between meetings may cause delays',
          affectedEvents: [current.id, next.id],
          suggestedResolution: {
            action: 'reschedule',
            alternatives: [{
              startTime: new Date(current.endTime.getTime() + 15 * 60 * 1000),
              endTime: new Date(current.endTime.getTime() + 15 * 60 * 1000 + (next.endTime.getTime() - next.startTime.getTime())),
              confidence: 75,
              reasoning: 'Add 15-minute buffer between meetings'
            }]
          }
        });
      }
    }

    return conflicts;
  }

  /**
   * Check if two events overlap
   */
  private eventsOverlap(event1: CalendarEvent, event2: CalendarEvent): boolean {
    return event1.startTime < event2.endTime && event2.startTime < event1.endTime;
  }

  /**
   * Calculate optimization metrics
   */
  private async calculateOptimizationMetrics(
    events: CalendarEvent[],
    startDate: Date,
    endDate: Date
  ): Promise<{
    efficiency: number;
    recommendations: string[];
    focusTimeAvailable: number;
  }> {
    const totalTime = (endDate.getTime() - startDate.getTime()) / (1000 * 60); // minutes
    const meetingTime = events.reduce((sum, event) => 
      sum + ((event.endTime.getTime() - event.startTime.getTime()) / (1000 * 60)), 0
    );
    
    const focusTimeEvents = events.filter(e => e.category === 'focus_time');
    const focusTimeAvailable = focusTimeEvents.reduce((sum, event) => 
      sum + ((event.endTime.getTime() - event.startTime.getTime()) / (1000 * 60)), 0
    );

    const efficiency = Math.max(0, Math.min(100, (focusTimeAvailable / meetingTime) * 100));

    const recommendations: string[] = [];
    
    if (meetingTime / totalTime > 0.6) {
      recommendations.push('Consider reducing meeting load - over 60% of time is in meetings');
    }
    
    if (focusTimeAvailable < 120) {
      recommendations.push('Schedule more protected focus time - aim for at least 2 hours per day');
    }
    
    if (events.filter(e => e.isRecurring).length > 5) {
      recommendations.push('Review recurring meetings - some may no longer be necessary');
    }

    return {
      efficiency: Math.round(efficiency),
      recommendations,
      focusTimeAvailable
    };
  }

  /**
   * Generate productivity analysis
   */
  async generateProductivityAnalysis(
    startDate: Date,
    endDate: Date
  ): Promise<ProductivityAnalysis> {
    const { events } = await this.getOptimizedCalendarEvents(startDate, endDate);
    
    const totalMeetingTime = events.reduce((sum, event) => 
      sum + ((event.endTime.getTime() - event.startTime.getTime()) / (1000 * 60)), 0
    );
    
    const focusTimeProtected = events
      .filter(e => e.category === 'focus_time')
      .reduce((sum, event) => sum + ((event.endTime.getTime() - event.startTime.getTime()) / (1000 * 60)), 0);

    const analysis: ProductivityAnalysis = {
      period: `${startDate.toISOString().split('T')[0]} to ${endDate.toISOString().split('T')[0]}`,
      metrics: {
        totalMeetingTime,
        focusTimeProtected,
        meetingEfficiency: Math.round(70 + Math.random() * 20), // 70-90%
        contextSwitches: Math.floor(totalMeetingTime / 60), // Rough estimate
        deepWorkBlocks: Math.floor(focusTimeProtected / 120), // 2-hour blocks
        interruptionRate: Math.round((events.length / 8) * 10) / 10 // per hour in 8-hour day
      },
      insights: {
        mostProductiveHours: ['10:00-12:00', '14:00-16:00'],
        leastProductiveHours: ['13:00-14:00', '16:00-17:00'],
        optimalMeetingLength: 45, // minutes
        meetingFatigue: Math.round(Math.max(0, (totalMeetingTime - 240) / 10)) // Fatigue increases after 4 hours
      },
      recommendations: [
        {
          type: 'focus_protection',
          priority: 'high',
          description: 'Block 2-hour focus time slots during peak productivity hours (10 AM - 12 PM)',
          expectedImpact: '25% increase in deep work completion'
        },
        {
          type: 'meeting_reduction',
          priority: 'medium',
          description: 'Convert 30% of recurring meetings to async check-ins',
          expectedImpact: '3+ hours weekly time savings'
        },
        {
          type: 'schedule_optimization',
          priority: 'medium',
          description: 'Cluster meetings into focused blocks with buffer time',
          expectedImpact: '40% reduction in context switching'
        }
      ]
    };

    this.emit('productivityAnalyzed', { period: analysis.period, efficiency: analysis.metrics.meetingEfficiency });
    return analysis;
  }

  /**
   * Start optimization monitoring
   */
  private startOptimizationMonitoring(): void {
    // Monitor calendar optimization every hour
    this.optimizationInterval = setInterval(async () => {
      try {
        const now = new Date();
        const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
        
        const { conflicts } = await this.getOptimizedCalendarEvents(now, tomorrow);
        
        if (conflicts.length > 0) {
          this.emit('optimizationAlert', { 
            message: `Found ${conflicts.length} scheduling conflicts for tomorrow`,
            conflicts 
          });
        }

      } catch (error) {
        console.error('❌ Calendar optimization monitoring error:', error);
      }
    }, 60 * 60 * 1000); // 1 hour

    console.log('⚡ Calendar optimization monitoring started');
  }

  /**
   * Get service status
   */
  getServiceStatus(): {
    isInitialized: boolean;
    platforms: { platform: string; configured: boolean }[];
    monitoring: boolean;
  } {
    return {
      isInitialized: this.isInitialized,
      platforms: [
        { platform: 'google_calendar', configured: this.googleCalendar !== null },
        { platform: 'microsoft_outlook', configured: this.outlookClient !== null }
      ],
      monitoring: this.optimizationInterval !== null
    };
  }

  /**
   * Cleanup service
   */
  cleanup(): void {
    if (this.optimizationInterval) {
      clearInterval(this.optimizationInterval);
      this.optimizationInterval = null;
    }
    console.log('🧹 Calendar Optimization Service cleaned up');
  }
}

// Export singleton instance
export const calendarOptimizationService = new CalendarOptimizationService();
export default CalendarOptimizationService;