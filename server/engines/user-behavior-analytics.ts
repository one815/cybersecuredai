import { EventEmitter } from 'events';

export interface BehaviorProfile {
  userId: string;
  userName: string;
  userRole: string;
  sector: 'education' | 'government';
  baseline_patterns: {
    login_times: number[];
    typical_locations: string[];
    common_applications: string[];
    data_access_patterns: string[];
    network_usage: {
      average_daily_mb: number;
      peak_hours: number[];
      typical_endpoints: string[];
    };
  };
  current_risk_score: number; // 0-100
  anomaly_count: number;
  last_updated: Date;
  behavioral_traits: {
    session_duration_avg: number;
    mouse_movement_patterns: string[];
    typing_cadence: number;
    application_switching_frequency: number;
    file_access_patterns: string[];
  };
}

export interface BehaviorAnomaly {
  id: string;
  userId: string;
  userName: string;
  anomaly_type: 'location' | 'time' | 'application' | 'data_access' | 'network' | 'biometric' | 'privilege_escalation' | 'mass_download';
  severity: 'low' | 'medium' | 'high' | 'critical';
  confidence: number; // 0-1
  description: string;
  detected_behavior: string;
  baseline_behavior: string;
  risk_factors: string[];
  recommended_actions: string[];
  status: 'new' | 'investigating' | 'confirmed_threat' | 'false_positive' | 'resolved';
  detected_at: Date;
  resolved_at?: Date;
  investigation_notes: string[];
}

export interface BehaviorAlert {
  id: string;
  userId: string;
  alert_type: 'immediate' | 'escalated' | 'trending' | 'pattern_deviation';
  priority: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  affected_systems: string[];
  potential_impact: string;
  automated_response: string[];
  requires_human_review: boolean;
  created_at: Date;
  expires_at: Date;
}

export interface BehaviorInsight {
  id: string;
  type: 'user_risk_trend' | 'sector_pattern' | 'privilege_abuse' | 'insider_threat_indicator' | 'compromised_account_indicator';
  title: string;
  description: string;
  affected_users: string[];
  sector_impact: 'education' | 'government' | 'both';
  confidence: number;
  trend_direction: 'increasing' | 'stable' | 'decreasing';
  recommended_policies: string[];
  generated_at: Date;
}

export interface SessionAnalytics {
  sessionId: string;
  userId: string;
  start_time: Date;
  end_time?: Date;
  duration_minutes?: number;
  login_location: {
    ip_address: string;
    geolocation: string;
    is_trusted_location: boolean;
  };
  device_info: {
    device_type: string;
    browser: string;
    os: string;
    is_trusted_device: boolean;
  };
  activities: SessionActivity[];
  risk_score: number;
  anomaly_flags: string[];
}

export interface SessionActivity {
  timestamp: Date;
  activity_type: 'login' | 'file_access' | 'data_query' | 'privilege_use' | 'system_access' | 'data_export' | 'config_change';
  resource: string;
  action: string;
  result: 'success' | 'failure' | 'denied';
  risk_level: 'low' | 'medium' | 'high' | 'critical';
  metadata?: any;
}

export class UserBehaviorAnalyticsEngine extends EventEmitter {
  private behaviorProfiles: Map<string, BehaviorProfile> = new Map();
  private anomalies: Map<string, BehaviorAnomaly> = new Map();
  private alerts: Map<string, BehaviorAlert> = new Map();
  private sessions: Map<string, SessionAnalytics> = new Map();
  private insights: Map<string, BehaviorInsight> = new Map();
  private isRunning: boolean = false;
  private analysisInterval: NodeJS.Timeout | null = null;

  constructor() {
    super();
    this.initializeBehaviorBaselines();
    this.startBehaviorAnalysis();
  }

  private initializeBehaviorBaselines(): void {
    // Initialize behavior profiles for different user types
    const sampleUsers = [
      // Education sector users
      {
        userId: 'edu-001',
        userName: 'Dr. Sarah Johnson',
        userRole: 'professor',
        sector: 'education' as const
      },
      {
        userId: 'edu-002', 
        userName: 'Michael Chen',
        userRole: 'student',
        sector: 'education' as const
      },
      {
        userId: 'edu-003',
        userName: 'Lisa Rodriguez',
        userRole: 'administrator',
        sector: 'education' as const
      },
      {
        userId: 'edu-004',
        userName: 'Dr. Robert Kim',
        userRole: 'researcher',
        sector: 'education' as const
      },
      // Government sector users
      {
        userId: 'gov-001',
        userName: 'James Wilson',
        userRole: 'analyst',
        sector: 'government' as const
      },
      {
        userId: 'gov-002',
        userName: 'Maria Garcia',
        userRole: 'administrator',
        sector: 'government' as const
      },
      {
        userId: 'gov-003',
        userName: 'David Thompson',
        userRole: 'supervisor',
        sector: 'government' as const
      }
    ];

    sampleUsers.forEach(user => {
      const profile: BehaviorProfile = {
        userId: user.userId,
        userName: user.userName,
        userRole: user.userRole,
        sector: user.sector,
        baseline_patterns: this.generateBaselinePatterns(user.userRole, user.sector),
        current_risk_score: Math.floor(Math.random() * 30) + 10, // 10-40 baseline risk
        anomaly_count: 0,
        last_updated: new Date(),
        behavioral_traits: this.generateBehavioralTraits(user.userRole)
      };
      
      this.behaviorProfiles.set(user.userId, profile);
    });

    console.log(`👤 Initialized behavior profiles for ${sampleUsers.length} users`);
    console.log(`🧠 AI-based behavioral baseline learning activated`);
  }

  private generateBaselinePatterns(role: string, sector: 'education' | 'government'): any {
    const rolePatterns = {
      professor: {
        login_times: [8, 9, 10, 14, 15, 16, 19, 20], // Mixed hours
        typical_locations: ['campus-office', 'home', 'conference-centers'],
        common_applications: ['email', 'lms', 'research-databases', 'grade-portal'],
        data_access_patterns: ['student-records', 'research-data', 'course-materials']
      },
      student: {
        login_times: [10, 11, 13, 14, 18, 19, 20, 21], // Student hours
        typical_locations: ['campus-library', 'dormitory', 'home'],
        common_applications: ['lms', 'email', 'research-tools', 'collaborative-platforms'],
        data_access_patterns: ['course-materials', 'assignment-submissions', 'grades']
      },
      researcher: {
        login_times: [9, 10, 11, 13, 14, 15, 21, 22], // Research hours
        typical_locations: ['lab', 'campus-office', 'home'],
        common_applications: ['research-databases', 'data-analysis', 'collaboration-tools'],
        data_access_patterns: ['research-data', 'publications', 'grant-materials']
      },
      analyst: {
        login_times: [8, 9, 10, 11, 13, 14, 15, 16], // Business hours
        typical_locations: ['government-office', 'secure-facility'],
        common_applications: ['analysis-tools', 'databases', 'reporting-systems'],
        data_access_patterns: ['classified-data', 'intelligence-reports', 'citizen-data']
      },
      administrator: {
        login_times: [7, 8, 9, 15, 16, 17], // Admin hours
        typical_locations: sector === 'education' ? ['admin-building', 'campus-office'] : ['government-office', 'data-center'],
        common_applications: ['admin-panels', 'user-management', 'system-monitoring'],
        data_access_patterns: ['system-logs', 'user-accounts', 'configuration-data']
      },
      supervisor: {
        login_times: [8, 9, 10, 11, 13, 14, 15, 16],
        typical_locations: ['government-office', 'meeting-rooms'],
        common_applications: ['reporting-systems', 'personnel-management', 'budget-systems'],
        data_access_patterns: ['personnel-records', 'budget-data', 'performance-metrics']
      }
    };

    const basePattern = rolePatterns[role as keyof typeof rolePatterns] || rolePatterns.administrator;
    
    return {
      ...basePattern,
      network_usage: {
        average_daily_mb: 150 + Math.random() * 200,
        peak_hours: basePattern.login_times.slice(0, 4),
        typical_endpoints: this.generateTypicalEndpoints(sector)
      }
    };
  }

  private generateTypicalEndpoints(sector: 'education' | 'government'): string[] {
    const sectorEndpoints = {
      education: [
        'lms.university.edu',
        'library.university.edu',
        'research.university.edu',
        'email.university.edu',
        'grades.university.edu'
      ],
      government: [
        'intranet.gov.agency',
        'secure.gov.portal',
        'database.gov.internal',
        'email.gov.secure',
        'reporting.gov.system'
      ]
    };
    
    return sectorEndpoints[sector];
  }

  private generateBehavioralTraits(role: string): any {
    const roleTraits = {
      professor: {
        session_duration_avg: 45 + Math.random() * 30, // 45-75 minutes
        mouse_movement_patterns: ['deliberate', 'research-focused'],
        typing_cadence: 65 + Math.random() * 20, // WPM
        application_switching_frequency: 8 + Math.random() * 4,
        file_access_patterns: ['sequential-research', 'grading-batches']
      },
      student: {
        session_duration_avg: 25 + Math.random() * 20,
        mouse_movement_patterns: ['quick', 'multitasking'],
        typing_cadence: 70 + Math.random() * 25,
        application_switching_frequency: 12 + Math.random() * 6,
        file_access_patterns: ['assignment-focused', 'resource-browsing']
      }
    };
    
    return roleTraits[role as keyof typeof roleTraits] || roleTraits.student;
  }

  private startBehaviorAnalysis(): void {
    if (this.isRunning) return;

    this.isRunning = true;
    console.log('👁️ Starting AI-based user behavior analytics...');

    // Run behavior analysis every 5 minutes
    this.analysisInterval = setInterval(() => {
      this.performBehaviorAnalysis();
    }, 5 * 60 * 1000);

    // Run initial analysis
    this.performBehaviorAnalysis();
  }

  private async performBehaviorAnalysis(): Promise<void> {
    console.log('🔍 Analyzing user behavior patterns...');

    try {
      // Simulate active user sessions
      this.simulateUserSessions();
      
      // Analyze each user's behavior
      const profilesArray = Array.from(this.behaviorProfiles.values());
      for (const profile of profilesArray) {
        await this.analyzeUserBehavior(profile);
      }
      
      // Generate behavior insights
      const insights = this.generateBehaviorInsights();
      
      // Process alerts
      const criticalAlerts = Array.from(this.alerts.values())
        .filter(alert => alert.priority === 'critical');
      
      if (criticalAlerts.length > 0) {
        this.emit('criticalBehaviorAlerts', criticalAlerts);
      }

      console.log(`✅ Analyzed behavior for ${this.behaviorProfiles.size} users`);
      console.log(`⚠️ Generated ${this.anomalies.size} behavioral anomalies`);
      console.log(`🚨 Found ${criticalAlerts.length} critical behavior alerts`);
      console.log(`💡 Generated ${insights.length} behavior insights`);

    } catch (error) {
      console.error('❌ Error in user behavior analysis:', error);
    }
  }

  private simulateUserSessions(): void {
    // Simulate realistic user sessions with various behaviors
    const activeUsers = Array.from(this.behaviorProfiles.values()).slice(0, 4); // Simulate 4 active users
    
    activeUsers.forEach(profile => {
      if (Math.random() > 0.3) { // 70% chance user is active
        const session = this.generateUserSession(profile);
        this.sessions.set(session.sessionId, session);
      }
    });
  }

  private generateUserSession(profile: BehaviorProfile): SessionAnalytics {
    const sessionId = `session-${Date.now()}-${profile.userId}`;
    const currentHour = new Date().getHours();
    const isNormalTime = profile.baseline_patterns.login_times.includes(currentHour);
    
    // Generate realistic activities
    const activities: SessionActivity[] = [];
    const activityCount = 3 + Math.floor(Math.random() * 8);
    
    for (let i = 0; i < activityCount; i++) {
      activities.push({
        timestamp: new Date(Date.now() - (activityCount - i) * 5 * 60 * 1000),
        activity_type: this.selectActivityType(profile.userRole),
        resource: this.selectResource(profile.sector, profile.userRole),
        action: this.selectAction(),
        result: Math.random() > 0.05 ? 'success' : 'failure',
        risk_level: this.calculateActivityRisk(profile),
        metadata: { user_agent: 'Chrome/120.0', source_ip: '192.168.1.100' }
      });
    }

    return {
      sessionId,
      userId: profile.userId,
      start_time: new Date(Date.now() - 30 * 60 * 1000), // 30 mins ago
      login_location: {
        ip_address: this.generateIPAddress(),
        geolocation: this.selectLocation(profile),
        is_trusted_location: Math.random() > 0.2 // 80% trusted locations
      },
      device_info: {
        device_type: Math.random() > 0.7 ? 'mobile' : 'desktop',
        browser: 'Chrome',
        os: Math.random() > 0.3 ? 'Windows' : 'MacOS',
        is_trusted_device: Math.random() > 0.1 // 90% trusted devices
      },
      activities,
      risk_score: this.calculateSessionRisk(activities, isNormalTime),
      anomaly_flags: this.detectSessionAnomalies(profile, activities, isNormalTime)
    };
  }

  private selectActivityType(role: string): SessionActivity['activity_type'] {
    const roleActivities = {
      professor: ['file_access', 'data_query', 'system_access'],
      student: ['file_access', 'login', 'system_access'],
      researcher: ['data_query', 'file_access', 'data_export'],
      administrator: ['privilege_use', 'config_change', 'system_access'],
      analyst: ['data_query', 'file_access', 'system_access'],
      supervisor: ['data_query', 'privilege_use', 'system_access']
    };
    
    const activities = roleActivities[role as keyof typeof roleActivities] || ['login', 'file_access'];
    return activities[Math.floor(Math.random() * activities.length)] as SessionActivity['activity_type'];
  }

  private selectResource(sector: 'education' | 'government', role: string): string {
    const sectorResources = {
      education: {
        professor: ['student-database', 'research-repository', 'course-management'],
        student: ['learning-portal', 'assignment-system', 'library-access'],
        researcher: ['data-warehouse', 'publication-system', 'collaboration-platform'],
        administrator: ['user-management', 'system-config', 'audit-logs']
      },
      government: {
        analyst: ['intelligence-db', 'threat-analysis', 'reporting-system'],
        administrator: ['user-accounts', 'system-monitoring', 'access-controls'],
        supervisor: ['personnel-system', 'budget-portal', 'performance-dashboard']
      }
    };
    
    const resources = sectorResources[sector]?.[role as keyof typeof sectorResources[typeof sector]] || 
                     ['generic-system', 'file-storage', 'email-system'];
    return resources[Math.floor(Math.random() * resources.length)];
  }

  private selectAction(): string {
    const actions = ['read', 'write', 'download', 'upload', 'delete', 'modify', 'view', 'export'];
    return actions[Math.floor(Math.random() * actions.length)];
  }

  private selectLocation(profile: BehaviorProfile): string {
    if (Math.random() > 0.15) { // 85% normal locations
      return profile.baseline_patterns.typical_locations[
        Math.floor(Math.random() * profile.baseline_patterns.typical_locations.length)
      ];
    } else { // 15% unusual locations
      return Math.random() > 0.5 ? 'unknown-location' : 'international-location';
    }
  }

  private generateIPAddress(): string {
    return `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
  }

  private calculateActivityRisk(profile: BehaviorProfile): SessionActivity['risk_level'] {
    const baseRisk = profile.current_risk_score / 100;
    const random = Math.random();
    
    if (baseRisk + random > 0.8) return 'critical';
    if (baseRisk + random > 0.6) return 'high';
    if (baseRisk + random > 0.4) return 'medium';
    return 'low';
  }

  private calculateSessionRisk(activities: SessionActivity[], isNormalTime: boolean): number {
    let riskScore = isNormalTime ? 10 : 30; // Base risk for unusual times
    
    activities.forEach(activity => {
      const riskWeights = { low: 5, medium: 15, high: 25, critical: 40 };
      riskScore += riskWeights[activity.risk_level];
      
      if (activity.result === 'failure') riskScore += 10;
      if (activity.activity_type === 'privilege_use') riskScore += 15;
      if (activity.activity_type === 'data_export') riskScore += 20;
    });
    
    return Math.min(100, riskScore);
  }

  private detectSessionAnomalies(profile: BehaviorProfile, activities: SessionActivity[], isNormalTime: boolean): string[] {
    const anomalies: string[] = [];
    
    if (!isNormalTime) {
      anomalies.push('unusual_login_time');
    }
    
    const highRiskActivities = activities.filter(a => a.risk_level === 'high' || a.risk_level === 'critical');
    if (highRiskActivities.length > 2) {
      anomalies.push('high_risk_activity_burst');
    }
    
    const failedActivities = activities.filter(a => a.result === 'failure');
    if (failedActivities.length > activities.length * 0.3) {
      anomalies.push('excessive_failures');
    }
    
    const dataExports = activities.filter(a => a.activity_type === 'data_export');
    if (dataExports.length > 1) {
      anomalies.push('unusual_data_export_volume');
    }
    
    return anomalies;
  }

  private async analyzeUserBehavior(profile: BehaviorProfile): Promise<void> {
    // Get recent sessions for this user
    const userSessions = Array.from(this.sessions.values())
      .filter(session => session.userId === profile.userId)
      .sort((a, b) => b.start_time.getTime() - a.start_time.getTime())
      .slice(0, 10); // Last 10 sessions
    
    if (userSessions.length === 0) return;
    
    // Detect behavioral anomalies
    const anomalies = this.detectBehavioralAnomalies(profile, userSessions);
    
    // Store anomalies
    anomalies.forEach(anomaly => {
      this.anomalies.set(anomaly.id, anomaly);
      
      // Generate alerts for high-severity anomalies
      if (anomaly.severity === 'high' || anomaly.severity === 'critical') {
        const alert = this.generateBehaviorAlert(anomaly);
        this.alerts.set(alert.id, alert);
      }
    });
    
    // Update user risk score
    const newRiskScore = this.calculateUserRiskScore(profile, userSessions, anomalies);
    profile.current_risk_score = newRiskScore;
    profile.anomaly_count = anomalies.length;
    profile.last_updated = new Date();
  }

  private detectBehavioralAnomalies(profile: BehaviorProfile, sessions: SessionAnalytics[]): BehaviorAnomaly[] {
    const anomalies: BehaviorAnomaly[] = [];
    
    // Detect location anomalies
    const untrustedLocations = sessions.filter(s => !s.login_location.is_trusted_location);
    if (untrustedLocations.length > sessions.length * 0.3) {
      anomalies.push({
        id: `anomaly-${Date.now()}-location-${profile.userId}`,
        userId: profile.userId,
        userName: profile.userName,
        anomaly_type: 'location',
        severity: 'high',
        confidence: 0.85,
        description: 'User accessing from multiple untrusted locations',
        detected_behavior: `${untrustedLocations.length} untrusted location accesses`,
        baseline_behavior: 'Typically accesses from trusted campus/office locations',
        risk_factors: [
          'Geographic location anomaly',
          'Potential account compromise',
          'Policy violation risk'
        ],
        recommended_actions: [
          'Require additional authentication',
          'Contact user to verify location',
          'Review recent access patterns',
          'Consider temporary access restriction'
        ],
        status: 'new',
        detected_at: new Date(),
        investigation_notes: []
      });
    }
    
    // Detect time-based anomalies
    const offHoursSessions = sessions.filter(s => {
      const hour = s.start_time.getHours();
      return !profile.baseline_patterns.login_times.includes(hour);
    });
    
    if (offHoursSessions.length > 2) {
      anomalies.push({
        id: `anomaly-${Date.now()}-time-${profile.userId}`,
        userId: profile.userId,
        userName: profile.userName,
        anomaly_type: 'time',
        severity: 'medium',
        confidence: 0.75,
        description: 'User accessing systems outside normal hours',
        detected_behavior: `${offHoursSessions.length} off-hours access sessions`,
        baseline_behavior: `Typically active during: ${profile.baseline_patterns.login_times.join(', ')}:00`,
        risk_factors: [
          'Unusual access timing',
          'Potential insider threat',
          'After-hours data access'
        ],
        recommended_actions: [
          'Verify legitimate business need',
          'Review accessed resources',
          'Monitor for data exfiltration',
          'Update access policies if needed'
        ],
        status: 'new',
        detected_at: new Date(),
        investigation_notes: []
      });
    }
    
    // Detect privilege escalation anomalies
    const privilegeUse = sessions.flatMap(s => 
      s.activities.filter(a => a.activity_type === 'privilege_use')
    );
    
    if (privilegeUse.length > 0 && profile.userRole !== 'administrator' && profile.userRole !== 'supervisor') {
      anomalies.push({
        id: `anomaly-${Date.now()}-privilege-${profile.userId}`,
        userId: profile.userId,
        userName: profile.userName,
        anomaly_type: 'privilege_escalation',
        severity: 'critical',
        confidence: 0.95,
        description: 'Non-privileged user attempting administrative actions',
        detected_behavior: `${privilegeUse.length} privilege escalation attempts`,
        baseline_behavior: 'Standard user with no administrative privileges',
        risk_factors: [
          'Unauthorized privilege escalation',
          'Potential account compromise',
          'Policy violation',
          'Security control bypass'
        ],
        recommended_actions: [
          'Immediately review user permissions',
          'Investigate source of privilege escalation',
          'Temporarily suspend elevated access',
          'Conduct security incident response'
        ],
        status: 'new',
        detected_at: new Date(),
        investigation_notes: []
      });
    }
    
    // Detect mass data download anomalies
    const dataExports = sessions.flatMap(s => 
      s.activities.filter(a => a.activity_type === 'data_export' || a.action === 'download')
    );
    
    if (dataExports.length > 10) {
      anomalies.push({
        id: `anomaly-${Date.now()}-mass-download-${profile.userId}`,
        userId: profile.userId,
        userName: profile.userName,
        anomaly_type: 'mass_download',
        severity: 'high',
        confidence: 0.88,
        description: 'User downloading large amounts of data',
        detected_behavior: `${dataExports.length} data download/export activities`,
        baseline_behavior: 'Typical data access for job function',
        risk_factors: [
          'Potential data exfiltration',
          'Insider threat indicator',
          'Compliance violation risk',
          'Intellectual property theft'
        ],
        recommended_actions: [
          'Review downloaded content',
          'Implement data loss prevention controls',
          'Interview user about business justification',
          'Consider access restrictions'
        ],
        status: 'new',
        detected_at: new Date(),
        investigation_notes: []
      });
    }
    
    return anomalies;
  }

  private generateBehaviorAlert(anomaly: BehaviorAnomaly): BehaviorAlert {
    const priorityMap = { low: 'low', medium: 'medium', high: 'high', critical: 'critical' } as const;
    
    return {
      id: `alert-${Date.now()}-${anomaly.userId}`,
      userId: anomaly.userId,
      alert_type: anomaly.severity === 'critical' ? 'immediate' : 'escalated',
      priority: priorityMap[anomaly.severity],
      title: `Behavioral Anomaly: ${anomaly.anomaly_type.replace('_', ' ').toUpperCase()}`,
      description: anomaly.description,
      affected_systems: ['user-authentication', 'access-control', 'audit-logging'],
      potential_impact: this.calculatePotentialImpact(anomaly),
      automated_response: [
        'Increased logging for user session',
        'Real-time monitoring activation',
        'Risk score escalation'
      ],
      requires_human_review: anomaly.severity === 'critical' || anomaly.severity === 'high',
      created_at: new Date(),
      expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
    };
  }

  private calculatePotentialImpact(anomaly: BehaviorAnomaly): string {
    const impactMap = {
      location: 'Potential unauthorized access from compromised account or insider threat',
      time: 'After-hours access may indicate malicious activity or policy violation',
      privilege_escalation: 'Unauthorized administrative access could lead to system compromise',
      mass_download: 'Large-scale data exfiltration could result in data breach and compliance violations'
    };
    
    return impactMap[anomaly.anomaly_type as keyof typeof impactMap] || 
           'Behavioral anomaly may indicate security risk requiring investigation';
  }

  private calculateUserRiskScore(profile: BehaviorProfile, sessions: SessionAnalytics[], anomalies: BehaviorAnomaly[]): number {
    let riskScore = profile.current_risk_score * 0.7; // Decay previous score
    
    // Add risk from recent sessions
    const avgSessionRisk = sessions.reduce((acc, s) => acc + s.risk_score, 0) / sessions.length;
    riskScore += avgSessionRisk * 0.3;
    
    // Add risk from anomalies
    const anomalyRisk = anomalies.reduce((acc, a) => {
      const severityWeights = { low: 5, medium: 15, high: 30, critical: 50 };
      return acc + (severityWeights[a.severity] * a.confidence);
    }, 0);
    
    riskScore += anomalyRisk;
    
    return Math.min(100, Math.max(0, riskScore));
  }

  private generateBehaviorInsights(): BehaviorInsight[] {
    const insights: BehaviorInsight[] = [];
    
    // Analyze overall risk trends
    const highRiskUsers = Array.from(this.behaviorProfiles.values())
      .filter(p => p.current_risk_score > 70);
    
    if (highRiskUsers.length > 0) {
      insights.push({
        id: `insight-${Date.now()}-high-risk-users`,
        type: 'user_risk_trend',
        title: 'High-Risk User Behavior Detected',
        description: `${highRiskUsers.length} users showing elevated risk behavior patterns`,
        affected_users: highRiskUsers.map(u => u.userId),
        sector_impact: 'both',
        confidence: 0.85,
        trend_direction: 'increasing',
        recommended_policies: [
          'Implement enhanced monitoring for high-risk users',
          'Require additional authentication factors',
          'Conduct targeted security training',
          'Review and update access controls'
        ],
        generated_at: new Date()
      });
    }
    
    // Analyze sector-specific patterns
    const educationAnomalies = Array.from(this.anomalies.values())
      .filter(a => {
        const profile = this.behaviorProfiles.get(a.userId);
        return profile?.sector === 'education';
      });
    
    if (educationAnomalies.length > 0) {
      insights.push({
        id: `insight-${Date.now()}-education-patterns`,
        type: 'sector_pattern',
        title: 'Education Sector Behavioral Patterns',
        description: `Detected ${educationAnomalies.length} behavioral anomalies in education users`,
        affected_users: educationAnomalies.map(a => a.userId),
        sector_impact: 'education',
        confidence: 0.78,
        trend_direction: 'stable',
        recommended_policies: [
          'Review FERPA compliance controls',
          'Implement student data protection measures',
          'Enhance campus security awareness training'
        ],
        generated_at: new Date()
      });
    }
    
    return insights;
  }

  // Public API methods
  public getBehaviorProfiles(): BehaviorProfile[] {
    return Array.from(this.behaviorProfiles.values());
  }

  public getAnomalies(): BehaviorAnomaly[] {
    return Array.from(this.anomalies.values());
  }

  public getAlerts(): BehaviorAlert[] {
    return Array.from(this.alerts.values());
  }

  public getSessions(): SessionAnalytics[] {
    return Array.from(this.sessions.values());
  }

  public getInsights(): BehaviorInsight[] {
    return Array.from(this.insights.values());
  }

  public getUserRiskScore(userId: string): number {
    const profile = this.behaviorProfiles.get(userId);
    return profile?.current_risk_score || 0;
  }

  public async investigateAnomaly(anomalyId: string, notes: string): Promise<boolean> {
    const anomaly = this.anomalies.get(anomalyId);
    if (!anomaly) return false;
    
    anomaly.investigation_notes.push(`${new Date().toISOString()}: ${notes}`);
    anomaly.status = 'investigating';
    
    console.log(`🔍 Investigating behavioral anomaly: ${anomalyId}`);
    return true;
  }

  public async resolveAnomaly(anomalyId: string, resolution: 'confirmed_threat' | 'false_positive'): Promise<boolean> {
    const anomaly = this.anomalies.get(anomalyId);
    if (!anomaly) return false;
    
    anomaly.status = resolution;
    anomaly.resolved_at = new Date();
    
    console.log(`✅ Resolved behavioral anomaly: ${anomalyId} as ${resolution}`);
    return true;
  }

  public stop(): void {
    if (this.analysisInterval) {
      clearInterval(this.analysisInterval);
      this.analysisInterval = null;
    }
    this.isRunning = false;
    console.log('🛑 Stopped user behavior analytics');
  }
}

// Export singleton instance
export const userBehaviorAnalyticsEngine = new UserBehaviorAnalyticsEngine();