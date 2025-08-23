import { EventEmitter } from 'events';
import { AdvancedBehavioralAnalytics, UserBehaviorVector, BehavioralCluster, AnomalyScore, PredictiveRiskAssessment } from './advanced-behavioral-analytics';

export interface UserActivity {
  userId: string;
  timestamp: Date;
  actionType: string;
  resourceAccessed: string;
  sourceIP: string;
  userAgent: string;
  sessionId: string;
  dataVolume?: number;
  fileType?: string;
  location?: string;
  deviceFingerprint?: string;
  success: boolean;
}

export interface BehavioralPattern {
  patternId: string;
  patternType: 'access_time' | 'location' | 'data_volume' | 'file_access' | 'session_behavior';
  baseline: any;
  deviationThreshold: number;
  riskWeight: number;
}

export interface AnomalyAlert {
  alertId: string;
  userId: string;
  timestamp: Date;
  anomalyType: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  confidence: number;
  description: string;
  baseline: any;
  currentValue: any;
  riskScore: number;
  recommendedActions: string[];
}

export interface UserRiskProfile {
  userId: string;
  overallRiskScore: number;
  riskCategories: {
    timeBasedRisk: number;
    locationBasedRisk: number;
    dataAccessRisk: number;
    sessionBehaviorRisk: number;
    deviceRisk: number;
  };
  lastUpdated: Date;
  behaviorBaseline: {
    normalAccessHours: number[];
    typicalLocations: string[];
    averageSessionDuration: number;
    typicalDataVolume: number;
    commonFileTypes: string[];
    devicePatterns: string[];
  };
  anomalyHistory: AnomalyAlert[];
}

/**
 * Advanced behavioral analysis engine for insider threat detection
 * Uses machine learning techniques for anomaly detection and risk assessment
 */
export class BehavioralAnalysisEngine extends EventEmitter {
  private userProfiles: Map<string, UserRiskProfile> = new Map();
  private activityHistory: Map<string, UserActivity[]> = new Map();
  private behavioralPatterns: BehavioralPattern[] = [];
  private anomalyAlerts: AnomalyAlert[] = [];
  private advancedAnalytics: AdvancedBehavioralAnalytics;
  
  constructor() {
    super();
    this.advancedAnalytics = new AdvancedBehavioralAnalytics();
    this.initializeBehavioralPatterns();
    this.initializeAdvancedAnalytics();
  }

  private initializeBehavioralPatterns(): void {
    this.behavioralPatterns = [
      {
        patternId: 'access-time-pattern',
        patternType: 'access_time',
        baseline: { normalHours: [8, 9, 10, 11, 12, 13, 14, 15, 16, 17] },
        deviationThreshold: 2.0,
        riskWeight: 0.2
      },
      {
        patternId: 'location-pattern',
        patternType: 'location',
        baseline: { maxUniqueLocations: 3 },
        deviationThreshold: 1.5,
        riskWeight: 0.25
      },
      {
        patternId: 'data-volume-pattern',
        patternType: 'data_volume',
        baseline: { avgVolume: 0, maxDeviation: 3.0 },
        deviationThreshold: 2.5,
        riskWeight: 0.3
      },
      {
        patternId: 'file-access-pattern', 
        patternType: 'file_access',
        baseline: { commonTypes: [] },
        deviationThreshold: 1.0,
        riskWeight: 0.15
      },
      {
        patternId: 'session-behavior-pattern',
        patternType: 'session_behavior',
        baseline: { avgDuration: 0, maxConcurrent: 2 },
        deviationThreshold: 2.0,
        riskWeight: 0.1
      }
    ];
  }

  private initializeAdvancedAnalytics(): void {
    console.log('🧠 Initializing Advanced Behavioral Analytics Engine...');
    
    // Set up advanced analytics event handlers
    this.advancedAnalytics.on('behaviorProcessed', (data) => {
      this.emit('behaviorAnalyzed', data);
    });
    
    // Start behavioral clustering
    this.startBehavioralClustering();
  }

  private startBehavioralClustering(): void {
    // Perform clustering analysis every 30 minutes
    setInterval(() => {
      const clusters = this.advancedAnalytics.performBehavioralClustering(5);
      if (clusters.length > 0) {
        console.log(`📊 BEHAVIORAL CLUSTERING: Identified ${clusters.length} user behavior clusters`);
        this.emit('behaviorClustersUpdated', clusters);
      }
    }, 1800000); // 30 minutes
  }

  /**
   * Process user activity and update behavioral profile
   */
  public async processUserActivity(activity: UserActivity): Promise<UserRiskProfile> {
    // Add to activity history
    if (!this.activityHistory.has(activity.userId)) {
      this.activityHistory.set(activity.userId, []);
    }
    const userHistory = this.activityHistory.get(activity.userId)!;
    userHistory.push(activity);
    
    // Keep only last 1000 activities per user
    if (userHistory.length > 1000) {
      this.activityHistory.set(activity.userId, userHistory.slice(-1000));
    }

    // Get or create user profile
    let profile = this.userProfiles.get(activity.userId);
    if (!profile) {
      profile = this.createUserProfile(activity.userId);
    }

    // Update behavioral baseline
    profile = await this.updateBehavioralBaseline(profile, userHistory);
    
    // Detect anomalies in current activity
    const anomalies = await this.detectAnomalies(profile, activity);
    
    // Update risk scores based on anomalies
    profile = this.updateRiskScores(profile, anomalies);
    
    // Store updated profile
    this.userProfiles.set(activity.userId, profile);
    
    // Emit alerts for significant anomalies
    for (const anomaly of anomalies) {
      if (anomaly.severity === 'HIGH' || anomaly.severity === 'CRITICAL') {
        this.emit('anomalyDetected', anomaly);
      }
    }
    
    return profile;
  }

  private createUserProfile(userId: string): UserRiskProfile {
    return {
      userId,
      overallRiskScore: 50, // Neutral baseline
      riskCategories: {
        timeBasedRisk: 50,
        locationBasedRisk: 50,
        dataAccessRisk: 50,
        sessionBehaviorRisk: 50,
        deviceRisk: 50
      },
      lastUpdated: new Date(),
      behaviorBaseline: {
        normalAccessHours: [],
        typicalLocations: [],
        averageSessionDuration: 0,
        typicalDataVolume: 0,
        commonFileTypes: [],
        devicePatterns: []
      },
      anomalyHistory: []
    };
  }

  private async updateBehavioralBaseline(
    profile: UserRiskProfile, 
    activities: UserActivity[]
  ): Promise<UserRiskProfile> {
    const recentActivities = activities.slice(-200); // Last 200 activities
    
    // Update access hours pattern
    const accessHours = recentActivities.map(a => new Date(a.timestamp).getHours());
    profile.behaviorBaseline.normalAccessHours = Array.from(new Set(accessHours)).sort();
    
    // Update location patterns
    const locations = recentActivities.map(a => a.sourceIP).filter(Boolean);
    profile.behaviorBaseline.typicalLocations = Array.from(new Set(locations));
    
    // Update session duration baseline
    const sessionDurations = recentActivities
      .filter(a => a.actionType === 'session_start')
      .map(a => this.calculateSessionDuration(a, activities));
    
    if (sessionDurations.length > 0) {
      profile.behaviorBaseline.averageSessionDuration = 
        sessionDurations.reduce((sum, dur) => sum + dur, 0) / sessionDurations.length;
    }
    
    // Update data volume baseline
    const dataVolumes = recentActivities
      .filter(a => a.dataVolume && a.dataVolume > 0)
      .map(a => a.dataVolume!);
    
    if (dataVolumes.length > 0) {
      profile.behaviorBaseline.typicalDataVolume = 
        dataVolumes.reduce((sum, vol) => sum + vol, 0) / dataVolumes.length;
    }
    
    // Update file type patterns
    const fileTypes = recentActivities
      .filter(a => a.fileType)
      .map(a => a.fileType!);
    profile.behaviorBaseline.commonFileTypes = Array.from(new Set(fileTypes));
    
    // Update device patterns
    const devices = recentActivities
      .filter(a => a.deviceFingerprint)
      .map(a => a.deviceFingerprint!);
    profile.behaviorBaseline.devicePatterns = Array.from(new Set(devices));
    
    profile.lastUpdated = new Date();
    return profile;
  }

  private async detectAnomalies(
    profile: UserRiskProfile, 
    activity: UserActivity
  ): Promise<AnomalyAlert[]> {
    const anomalies: AnomalyAlert[] = [];
    
    // Time-based anomaly detection
    const currentHour = new Date(activity.timestamp).getHours();
    if (!profile.behaviorBaseline.normalAccessHours.includes(currentHour)) {
      const isOffHours = currentHour < 6 || currentHour > 20;
      anomalies.push({
        alertId: `time-anomaly-${Date.now()}`,
        userId: activity.userId,
        timestamp: activity.timestamp,
        anomalyType: 'Unusual Access Time',
        severity: isOffHours ? 'HIGH' : 'MEDIUM',
        confidence: isOffHours ? 85 : 65,
        description: `Access detected at ${currentHour}:00, outside normal pattern`,
        baseline: profile.behaviorBaseline.normalAccessHours,
        currentValue: currentHour,
        riskScore: isOffHours ? 25 : 15,
        recommendedActions: [
          'Verify legitimate business need',
          'Check for unauthorized access',
          'Review user activity logs'
        ]
      });
    }
    
    // Location-based anomaly detection
    if (!profile.behaviorBaseline.typicalLocations.includes(activity.sourceIP)) {
      const isInternalNetwork = this.isInternalIP(activity.sourceIP);
      anomalies.push({
        alertId: `location-anomaly-${Date.now()}`,
        userId: activity.userId,
        timestamp: activity.timestamp,
        anomalyType: 'New Location Access',
        severity: isInternalNetwork ? 'MEDIUM' : 'HIGH',
        confidence: 80,
        description: `Access from new IP address: ${activity.sourceIP}`,
        baseline: profile.behaviorBaseline.typicalLocations,
        currentValue: activity.sourceIP,
        riskScore: isInternalNetwork ? 15 : 30,
        recommendedActions: [
          'Verify user identity',
          'Check for compromised credentials',
          'Enable additional authentication'
        ]
      });
    }
    
    // Data volume anomaly detection
    if (activity.dataVolume && profile.behaviorBaseline.typicalDataVolume > 0) {
      const volumeRatio = activity.dataVolume / profile.behaviorBaseline.typicalDataVolume;
      if (volumeRatio > 5.0) { // 5x typical volume
        anomalies.push({
          alertId: `volume-anomaly-${Date.now()}`,
          userId: activity.userId,
          timestamp: activity.timestamp,
          anomalyType: 'Unusual Data Volume',
          severity: volumeRatio > 10 ? 'CRITICAL' : 'HIGH',
          confidence: 90,
          description: `Data access ${volumeRatio.toFixed(1)}x higher than typical`,
          baseline: profile.behaviorBaseline.typicalDataVolume,
          currentValue: activity.dataVolume,
          riskScore: Math.min(50, volumeRatio * 5),
          recommendedActions: [
            'Investigate data exfiltration risk',
            'Review file access logs',
            'Check for malicious activity',
            'Consider data loss prevention measures'
          ]
        });
      }
    }
    
    // File type anomaly detection
    if (activity.fileType && 
        !profile.behaviorBaseline.commonFileTypes.includes(activity.fileType)) {
      const sensitiveTypes = ['.db', '.sql', '.key', '.pem', '.p12', '.config'];
      const isSensitive = sensitiveTypes.some(type => 
        activity.fileType!.toLowerCase().includes(type));
      
      anomalies.push({
        alertId: `filetype-anomaly-${Date.now()}`,
        userId: activity.userId,
        timestamp: activity.timestamp,
        anomalyType: 'Unusual File Type Access',
        severity: isSensitive ? 'HIGH' : 'MEDIUM',
        confidence: 75,
        description: `Access to uncommon file type: ${activity.fileType}`,
        baseline: profile.behaviorBaseline.commonFileTypes,
        currentValue: activity.fileType,
        riskScore: isSensitive ? 25 : 10,
        recommendedActions: [
          'Verify business justification',
          'Review file permissions',
          'Monitor ongoing access'
        ]
      });
    }
    
    // Failed access pattern detection
    if (!activity.success) {
      const recentFailures = this.getRecentFailures(activity.userId, 300); // Last 5 minutes
      if (recentFailures >= 5) {
        anomalies.push({
          alertId: `failure-anomaly-${Date.now()}`,
          userId: activity.userId,
          timestamp: activity.timestamp,
          anomalyType: 'Repeated Access Failures',
          severity: recentFailures > 10 ? 'CRITICAL' : 'HIGH',
          confidence: 95,
          description: `${recentFailures} failed attempts in last 5 minutes`,
          baseline: 'Normal: < 3 failures per 5 minutes',
          currentValue: recentFailures,
          riskScore: Math.min(40, recentFailures * 3),
          recommendedActions: [
            'Lock user account',
            'Investigate credential compromise',
            'Enable multi-factor authentication',
            'Review access logs for patterns'
          ]
        });
      }
    }
    
    return anomalies;
  }

  private updateRiskScores(
    profile: UserRiskProfile, 
    anomalies: AnomalyAlert[]
  ): UserRiskProfile {
    // Reset risk scores to baseline
    profile.riskCategories = {
      timeBasedRisk: 50,
      locationBasedRisk: 50,
      dataAccessRisk: 50,
      sessionBehaviorRisk: 50,
      deviceRisk: 50
    };
    
    // Apply anomaly-based risk adjustments
    for (const anomaly of anomalies) {
      let riskIncrease = 0;
      
      switch (anomaly.severity) {
        case 'CRITICAL': riskIncrease = 30; break;
        case 'HIGH': riskIncrease = 20; break;
        case 'MEDIUM': riskIncrease = 10; break;
        case 'LOW': riskIncrease = 5; break;
      }
      
      // Apply to specific risk categories
      if (anomaly.anomalyType.includes('Time')) {
        profile.riskCategories.timeBasedRisk += riskIncrease;
      } else if (anomaly.anomalyType.includes('Location')) {
        profile.riskCategories.locationBasedRisk += riskIncrease;
      } else if (anomaly.anomalyType.includes('Data') || anomaly.anomalyType.includes('File')) {
        profile.riskCategories.dataAccessRisk += riskIncrease;
      } else if (anomaly.anomalyType.includes('Session') || anomaly.anomalyType.includes('Failure')) {
        profile.riskCategories.sessionBehaviorRisk += riskIncrease;
      }
      
      // Add to anomaly history
      profile.anomalyHistory.push(anomaly);
    }
    
    // Keep only recent anomalies (last 100)
    profile.anomalyHistory = profile.anomalyHistory.slice(-100);
    
    // Cap risk scores at 100
    Object.keys(profile.riskCategories).forEach(key => {
      const category = key as keyof typeof profile.riskCategories;
      profile.riskCategories[category] = Math.min(100, profile.riskCategories[category]);
    });
    
    // Calculate overall risk score (weighted average)
    const weights = {
      timeBasedRisk: 0.2,
      locationBasedRisk: 0.25,
      dataAccessRisk: 0.3,
      sessionBehaviorRisk: 0.15,
      deviceRisk: 0.1
    };
    
    profile.overallRiskScore = Object.entries(profile.riskCategories)
      .reduce((total, [category, score]) => {
        const weight = weights[category as keyof typeof weights];
        return total + (score * weight);
      }, 0);
    
    return profile;
  }

  private calculateSessionDuration(
    sessionStart: UserActivity, 
    activities: UserActivity[]
  ): number {
    const sessionEnd = activities
      .filter(a => a.userId === sessionStart.userId && 
                   a.sessionId === sessionStart.sessionId &&
                   a.actionType === 'session_end')
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())[0];
    
    if (sessionEnd) {
      return (sessionEnd.timestamp.getTime() - sessionStart.timestamp.getTime()) / 1000 / 60; // minutes
    }
    
    return 60; // Default assumption
  }

  private getRecentFailures(userId: string, timeWindowSeconds: number): number {
    const userActivities = this.activityHistory.get(userId) || [];
    const cutoffTime = new Date(Date.now() - (timeWindowSeconds * 1000));
    
    return userActivities.filter(activity => 
      activity.timestamp >= cutoffTime && !activity.success
    ).length;
  }

  private isInternalIP(ip: string): boolean {
    const internalRanges = [
      /^10\./,
      /^192\.168\./,
      /^172\.(1[6-9]|2[0-9]|3[01])\./,
      /^127\./,
      /^169\.254\./
    ];
    
    return internalRanges.some(range => range.test(ip));
  }

  /**
   * Get comprehensive analytics for all users
   */
  public getAnalytics(): {
    totalUsers: number;
    highRiskUsers: number;
    averageRiskScore: number;
    anomalyTrends: { type: string; count: number; avgSeverity: string; }[];
    topRiskyUsers: { userId: string; riskScore: number; topRisks: string[]; }[];
    riskDistribution: { range: string; count: number; }[];
  } {
    const profiles = Array.from(this.userProfiles.values());
    
    // Calculate basic metrics
    const totalUsers = profiles.length;
    const highRiskUsers = profiles.filter(p => p.overallRiskScore > 70).length;
    const averageRiskScore = profiles.length > 0 ? 
      profiles.reduce((sum, p) => sum + p.overallRiskScore, 0) / profiles.length : 0;
    
    // Analyze anomaly trends
    const allAnomalies = profiles.flatMap(p => p.anomalyHistory);
    const anomalyTypes: Record<string, { count: number; severities: string[]; }> = {};
    
    allAnomalies.forEach(anomaly => {
      if (!anomalyTypes[anomaly.anomalyType]) {
        anomalyTypes[anomaly.anomalyType] = { count: 0, severities: [] };
      }
      anomalyTypes[anomaly.anomalyType].count++;
      anomalyTypes[anomaly.anomalyType].severities.push(anomaly.severity);
    });
    
    const anomalyTrends = Object.entries(anomalyTypes).map(([type, data]) => {
      const severityScore = data.severities.reduce((sum, sev) => {
        const scores = { LOW: 1, MEDIUM: 2, HIGH: 3, CRITICAL: 4 };
        return sum + scores[sev as keyof typeof scores];
      }, 0);
      const avgSeverityScore = severityScore / data.severities.length;
      const avgSeverity = avgSeverityScore <= 1.5 ? 'LOW' :
                         avgSeverityScore <= 2.5 ? 'MEDIUM' :
                         avgSeverityScore <= 3.5 ? 'HIGH' : 'CRITICAL';
      
      return { type, count: data.count, avgSeverity };
    }).sort((a, b) => b.count - a.count);
    
    // Top risky users
    const topRiskyUsers = profiles
      .sort((a, b) => b.overallRiskScore - a.overallRiskScore)
      .slice(0, 10)
      .map(profile => {
        const topRisks = Object.entries(profile.riskCategories)
          .sort(([,a], [,b]) => b - a)
          .slice(0, 3)
          .map(([category]) => category.replace('Risk', ''));
        
        return {
          userId: profile.userId,
          riskScore: Math.round(profile.overallRiskScore),
          topRisks
        };
      });
    
    // Risk distribution
    const riskRanges = [
      { range: '0-25 (Low)', min: 0, max: 25 },
      { range: '26-50 (Medium)', min: 26, max: 50 },
      { range: '51-75 (High)', min: 51, max: 75 },
      { range: '76-100 (Critical)', min: 76, max: 100 }
    ];
    
    const riskDistribution = riskRanges.map(range => ({
      range: range.range,
      count: profiles.filter(p => 
        p.overallRiskScore >= range.min && p.overallRiskScore <= range.max
      ).length
    }));
    
    return {
      totalUsers,
      highRiskUsers,
      averageRiskScore: Math.round(averageRiskScore),
      anomalyTrends,
      topRiskyUsers,
      riskDistribution
    };
  }

  /**
   * Generate simulated user activities for testing
   */
  public generateSimulatedActivities(userIds: string[], count: number = 100): UserActivity[] {
    const activities: UserActivity[] = [];
    const actionTypes = [
      'login', 'logout', 'file_access', 'file_download', 'file_upload',
      'data_query', 'config_change', 'user_management', 'system_access'
    ];
    
    const fileTypes = ['.pdf', '.docx', '.xlsx', '.jpg', '.png', '.txt', '.db', '.config'];
    const internalIPs = ['192.168.1.', '10.0.0.', '172.16.1.'];
    const externalIPs = ['203.0.113.', '198.51.100.', '192.0.2.'];
    
    for (let i = 0; i < count; i++) {
      const userId = userIds[Math.floor(Math.random() * userIds.length)];
      const isAnomalous = Math.random() < 0.15; // 15% anomalous activities
      
      const baseTime = new Date();
      const timeOffset = Math.random() * 7 * 24 * 60 * 60 * 1000; // Last 7 days
      
      let timestamp: Date;
      if (isAnomalous) {
        // Anomalous time (late night/early morning)
        const hour = Math.random() < 0.5 ? 
          Math.floor(Math.random() * 4) + 1 : // 1-4 AM
          Math.floor(Math.random() * 3) + 22;  // 10 PM - 12 AM
        timestamp = new Date(baseTime.getTime() - timeOffset);
        timestamp.setHours(hour, Math.floor(Math.random() * 60));
      } else {
        // Normal business hours
        const hour = Math.floor(Math.random() * 9) + 8; // 8 AM - 5 PM
        timestamp = new Date(baseTime.getTime() - timeOffset);
        timestamp.setHours(hour, Math.floor(Math.random() * 60));
      }
      
      const sourceIP = isAnomalous ?
        externalIPs[Math.floor(Math.random() * externalIPs.length)] + 
          Math.floor(Math.random() * 254) + 1 :
        internalIPs[Math.floor(Math.random() * internalIPs.length)] + 
          Math.floor(Math.random() * 254) + 1;
      
      activities.push({
        userId,
        timestamp,
        actionType: actionTypes[Math.floor(Math.random() * actionTypes.length)],
        resourceAccessed: `resource-${Math.floor(Math.random() * 1000)}`,
        sourceIP,
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        sessionId: `session-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        dataVolume: isAnomalous ? 
          Math.floor(Math.random() * 100000) + 50000 : // Large volume
          Math.floor(Math.random() * 10000), // Normal volume
        fileType: fileTypes[Math.floor(Math.random() * fileTypes.length)],
        location: sourceIP,
        deviceFingerprint: `device-${Math.floor(Math.random() * 100)}`,
        success: isAnomalous ? Math.random() < 0.3 : Math.random() < 0.95 // More failures for anomalous
      });
    }
    
    return activities.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
  }
}