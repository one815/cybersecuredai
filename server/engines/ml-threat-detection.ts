import { EventEmitter } from 'events';
import { AdvancedMLModels, ThreatFeatures, EnsembleResult, TimeSeriesThreat } from './advanced-ml-models';

export interface ThreatVector {
  id: string;
  timestamp: Date;
  sourceIP: string;
  targetIP: string;
  port: number;
  protocol: string;
  payloadSize: number;
  requestFrequency: number;
  geolocation: string;
  userAgent: string;
  sessionDuration: number;
  failedAttempts: number;
  accessPatterns: string[];
}

export interface ThreatPrediction {
  threatLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  confidence: number;
  threatType: string;
  riskScore: number;
  indicators: string[];
  mitigationActions: string[];
  timeToImpact: number; // minutes
}

export interface UserBehaviorProfile {
  userId: string;
  normalAccessHours: number[];
  typicalIPs: string[];
  averageSessionDuration: number;
  commonFileTypes: string[];
  typicalDataVolume: number;
  locationPattern: string[];
  deviceFingerprints: string[];
  riskBaseline: number;
}

/**
 * Advanced ML-based threat detection engine using multiple algorithms:
 * - Ensemble learning with Neural Networks, Random Forest, SVM, Gradient Boosting
 * - Time-series analysis for threat trend prediction
 * - Behavioral analysis for insider threats
 * - Network traffic analysis for intrusions
 * - Real-time anomaly detection with statistical models
 */
export class MLThreatDetectionEngine extends EventEmitter {
  private userProfiles: Map<string, UserBehaviorProfile> = new Map();
  private threatVectors: ThreatVector[] = [];
  private knownAttackPatterns: RegExp[] = [];
  private ipReputationCache: Map<string, number> = new Map();
  private advancedML: AdvancedMLModels;
  private threatHistory: TimeSeriesThreat[] = [];
  
  constructor() {
    super();
    this.advancedML = new AdvancedMLModels();
    this.initializeAttackPatterns();
    this.initializeIPReputation();
    this.initializeAdvancedModels();
  }

  private initializeAttackPatterns(): void {
    // Known attack patterns based on real-world threat intelligence
    this.knownAttackPatterns = [
      /sql.*injection|union.*select|drop.*table/i,
      /script.*alert|javascript:|onload=|onerror=/i,
      /\.\.\//g, // Directory traversal
      /cmd\.exe|powershell|bash|sh\s/i,
      /nmap|nikto|sqlmap|metasploit/i,
      /(admin|root|test):(admin|root|test|password|123)/i,
      /\b\d{3}-\d{2}-\d{4}\b/g, // SSN patterns in URLs
      /password.*reset|forgot.*password/i
    ];
  }

  private initializeIPReputation(): void {
    // Simulated threat intelligence IP reputation scores (0-100, higher = more malicious)
    const maliciousIPs = [
      '192.168.1.100', '10.0.0.50', '172.16.1.200', '203.0.113.10',
      '198.51.100.25', '192.0.2.5', '185.234.72.15', '91.121.155.10'
    ];
    
    maliciousIPs.forEach(ip => {
      this.ipReputationCache.set(ip, Math.random() * 40 + 60); // 60-100 malicious score
    });
  }

  private initializeAdvancedModels(): void {
    console.log('🚀 Initializing Advanced ML Threat Detection Models...');
    
    // Initialize ensemble models
    this.advancedML.on('modelUpdate', (data) => {
      console.log(`📊 ML Model Performance Update: ${JSON.stringify(data)}`);
    });
    
    // Start threat pattern learning
    this.startThreatPatternLearning();
  }

  private startThreatPatternLearning(): void {
    // Continuous learning from threat patterns
    setInterval(() => {
      this.updateThreatModels();
    }, 300000); // Update every 5 minutes
  }

  private updateThreatModels(): void {
    if (this.threatHistory.length > 100) {
      // Analyze threat trends
      const analysis = this.advancedML.analyzeTimeSeries(this.threatHistory);
      
      if (analysis.trend === 'increasing') {
        console.log('⚠️  THREAT TREND ANALYSIS: Increasing threat levels detected');
        this.emit('threatTrendAlert', {
          trend: analysis.trend,
          volatility: analysis.volatility,
          forecast: analysis.forecast
        });
      }
      
      // Keep last 1000 entries
      this.threatHistory = this.threatHistory.slice(-1000);
    }
  }

  /**
   * Enhanced threat analysis using advanced ML ensemble models
   */
  public analyzeThreatVector(vector: ThreatVector): ThreatPrediction {
    // Extract features for ML models
    const features = this.advancedML.extractFeatures(vector);
    
    // Get ensemble prediction
    const ensembleResult = this.advancedML.ensemblePredict(features);
    
    // Legacy rule-based analysis for comparison
    const legacyAnalysis = this.performLegacyAnalysis(vector);
    
    // Combine ML and rule-based approaches
    const combinedRiskScore = (ensembleResult.finalPrediction * 0.7 + legacyAnalysis.riskScore / 100 * 0.3) * 100;
    
    const indicators: string[] = [
      ...legacyAnalysis.indicators,
      `ML Ensemble Confidence: ${(ensembleResult.individualPredictions.reduce((sum, p) => sum + p.confidence, 0) / ensembleResult.individualPredictions.length * 100).toFixed(1)}%`,
      `Neural Network Score: ${(ensembleResult.individualPredictions.find(p => p.modelUsed === 'neural_network')?.prediction || 0 * 100).toFixed(1)}%`,
      `Random Forest Score: ${(ensembleResult.individualPredictions.find(p => p.modelUsed === 'random_forest')?.prediction || 0 * 100).toFixed(1)}%`
    ];

    const threatLevel = this.determineThreatLevel(combinedRiskScore);
    const confidence = ensembleResult.individualPredictions.reduce((sum, p) => sum + p.confidence, 0) / ensembleResult.individualPredictions.length;
    
    // Determine threat type using ML classification
    const threatType = this.classifyThreatType(features, ensembleResult);
    
    // Add to threat history for time series analysis
    this.threatHistory.push({
      timestamp: Date.now(),
      threatLevel: combinedRiskScore / 100,
      features
    });

    return {
      threatLevel,
      confidence,
      threatType,
      riskScore: combinedRiskScore,
      indicators,
      mitigationActions: this.generateMLBasedMitigations(threatType, combinedRiskScore),
      timeToImpact: this.calculateTimeToImpact(ensembleResult, features)
    };
  }

  /**
   * Legacy rule-based analysis for backward compatibility
   */
  private performLegacyAnalysis(vector: ThreatVector): { riskScore: number; indicators: string[] } {
    let riskScore = 0;
    const indicators: string[] = [];
    
    // 1. IP Reputation Analysis
    const ipRep = this.ipReputationCache.get(vector.sourceIP) || 0;
    if (ipRep > 70) {
      riskScore += 30;
      indicators.push(`High-risk IP detected (${vector.sourceIP})`);
    }
    
    // 2. Port Scanning Detection
    if (vector.port < 1024 && vector.requestFrequency > 10) {
      riskScore += 25;
      indicators.push('Potential port scanning detected');
    }
    
    // 3. Payload Analysis
    if (vector.payloadSize > 10000 && vector.requestFrequency > 5) {
      riskScore += 20;
      indicators.push('Unusually large payloads detected');
    }
    
    // 4. Session Anomaly Detection
    if (vector.sessionDuration > 3600 && vector.failedAttempts > 5) {
      riskScore += 35;
      indicators.push('Extended session with failed attempts');
    }
    
    // 5. Geographic Analysis
    const suspiciousLocations = ['RU', 'CN', 'KP', 'IR'];
    if (suspiciousLocations.some(loc => vector.geolocation.includes(loc))) {
      riskScore += 40;
      indicators.push(`Suspicious geographic location: ${vector.geolocation}`);
    }
    
    // 6. User Agent Analysis
    if (vector.userAgent.length < 20 || vector.userAgent.includes('bot')) {
      riskScore += 15;
      indicators.push('Suspicious user agent detected');
    }
    
    // 7. Access Pattern Analysis
    const suspiciousPatterns = vector.accessPatterns.filter(pattern => 
      this.knownAttackPatterns.some(regex => regex.test(pattern))
    );
    
    if (suspiciousPatterns.length > 0) {
      riskScore += suspiciousPatterns.length * 20;
      indicators.push(`Malicious patterns detected: ${suspiciousPatterns.join(', ')}`);
    }
    
    return { riskScore, indicators };
  }

  private classifyThreatType(features: ThreatFeatures, ensembleResult: EnsembleResult): string {
    // Use feature analysis to classify threat type
    if (features.ipReputation > 0.8) return 'IP_REPUTATION_THREAT';
    if (features.requestFrequency > 0.8) return 'DOS_ATTACK';
    if (features.payloadSize > 0.7 && features.protocolAnomaly > 0.6) return 'PAYLOAD_INJECTION';
    if (features.failedAttempts > 0.6) return 'BRUTE_FORCE_ATTACK';
    if (features.geographicRisk > 0.7) return 'GEOGRAPHIC_ANOMALY';
    if (features.userAgentEntropy > 0.8) return 'BOT_TRAFFIC';
    if (features.networkPatternScore > 0.7) return 'NETWORK_RECONNAISSANCE';
    
    // Use ML confidence to determine unknown threats
    const maxConfidence = Math.max(...ensembleResult.individualPredictions.map(p => p.confidence));
    if (maxConfidence < 0.6) return 'UNKNOWN_THREAT_PATTERN';
    
    return 'GENERAL_SECURITY_RISK';
  }

  private generateMLBasedMitigations(threatType: string, riskScore: number): string[] {
    const mitigations: string[] = [];
    
    switch (threatType) {
      case 'IP_REPUTATION_THREAT':
        mitigations.push('Block source IP immediately', 'Update threat intelligence feeds');
        break;
      case 'DOS_ATTACK':
        mitigations.push('Rate limit requests', 'Activate DDoS protection', 'Scale infrastructure');
        break;
      case 'PAYLOAD_INJECTION':
        mitigations.push('Deep packet inspection', 'WAF rule activation', 'Input validation review');
        break;
      case 'BRUTE_FORCE_ATTACK':
        mitigations.push('Account lockout policies', 'CAPTCHA implementation', 'MFA enforcement');
        break;
      case 'GEOGRAPHIC_ANOMALY':
        mitigations.push('Geo-blocking', 'VPN detection', 'Location verification');
        break;
      case 'BOT_TRAFFIC':
        mitigations.push('Bot detection algorithms', 'Challenge-response tests', 'Behavioral analysis');
        break;
      case 'NETWORK_RECONNAISSANCE':
        mitigations.push('Port scan detection', 'Honeypot deployment', 'Network segmentation');
        break;
      default:
        mitigations.push('Enhanced monitoring', 'Security team investigation', 'Behavioral analysis');
    }

    if (riskScore > 80) {
      mitigations.unshift('IMMEDIATE ACTION REQUIRED');
    }

    return mitigations;
  }

  private calculateTimeToImpact(ensembleResult: EnsembleResult, features: ThreatFeatures): number {
    // Estimate time to impact based on threat characteristics
    let baseTime = 60; // 1 hour default
    
    if (features.requestFrequency > 0.8) baseTime /= 4; // Fast attacks
    if (features.ipReputation > 0.8) baseTime /= 2; // Known bad actors
    if (features.geographicRisk > 0.7) baseTime *= 1.5; // Geographic attacks may be slower
    
    // Adjust based on ML confidence
    const avgConfidence = ensembleResult.individualPredictions.reduce((sum, p) => sum + p.confidence, 0) / ensembleResult.individualPredictions.length;
    baseTime *= (1 - avgConfidence + 0.5); // Higher confidence = faster impact
    
    return Math.max(5, Math.round(baseTime)); // Minimum 5 minutes
  }

  private determineThreatLevel(riskScore: number): 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL' {
    if (riskScore >= 80) return 'CRITICAL';
    if (riskScore >= 60) return 'HIGH';
    if (riskScore >= 40) return 'MEDIUM';
    return 'LOW';
  }

  /**
   * Build user behavior profile from activity logs
   */
  public buildUserProfile(userId: string, activityLogs: any[]): UserBehaviorProfile {
    const profile: UserBehaviorProfile = {
      userId,
      normalAccessHours: [],
      typicalIPs: [],
      averageSessionDuration: 0,
      commonFileTypes: [],
      typicalDataVolume: 0,
      locationPattern: [],
      deviceFingerprints: [],
      riskBaseline: 0
    };

    if (activityLogs.length === 0) return profile;

    // Analyze access hours
    const accessHours = activityLogs.map(log => new Date(log.timestamp).getHours());
    profile.normalAccessHours = [...new Set(accessHours)];

    // Analyze IP patterns
    const ips = activityLogs.map(log => log.sourceIP);
    profile.typicalIPs = [...new Set(ips)].slice(0, 5); // Keep top 5 IPs

    // Calculate average session duration
    profile.averageSessionDuration = activityLogs.reduce((sum, log) => 
      sum + (log.sessionDuration || 0), 0) / activityLogs.length;

    // Analyze file types
    const fileTypes = activityLogs.map(log => log.fileType).filter(Boolean);
    profile.commonFileTypes = [...new Set(fileTypes)];

    // Calculate typical data volume
    profile.typicalDataVolume = activityLogs.reduce((sum, log) => 
      sum + (log.dataVolume || 0), 0) / activityLogs.length;

    // Set baseline risk score
    profile.riskBaseline = this.calculateBaselineRisk(activityLogs);

    this.userProfiles.set(userId, profile);
    return profile;
  }

  private calculateBaselineRisk(activityLogs: any[]): number {
    let riskScore = 0;
    
    // More failed attempts = higher baseline risk
    const failedAttempts = activityLogs.filter(log => !log.success).length;
    riskScore += (failedAttempts / activityLogs.length) * 30;

    // Off-hours access increases risk
    const offHoursAccess = activityLogs.filter(log => {
      const hour = new Date(log.timestamp).getHours();
      return hour < 8 || hour > 18;
    }).length;
    riskScore += (offHoursAccess / activityLogs.length) * 20;

    return Math.min(riskScore, 50); // Cap baseline at 50
  }

  /**
   * Get threat statistics
   */
  public getThreatStatistics(): {
    totalThreats: number;
    threatsByLevel: Record<string, number>;
    recentThreatRate: number;
  } {
    const recentThreats = this.threatVectors.filter(t => 
      Date.now() - t.timestamp.getTime() < 24 * 60 * 60 * 1000
    );

    const threatsByLevel = recentThreats.reduce((acc, vector) => {
      const prediction = this.analyzeThreatVector(vector);
      acc[prediction.threatLevel] = (acc[prediction.threatLevel] || 0) + 1;
      return acc;
    }, { LOW: 0, MEDIUM: 0, HIGH: 0, CRITICAL: 0 });

    return {
      totalThreats: this.threatVectors.length,
      threatsByLevel,
      recentThreatRate: recentThreats.length / 24 // per hour
    };
  }

  /**
   * Add new threat vector to the system
   */
  public addThreatVector(vector: ThreatVector): void {
    this.threatVectors.push(vector);
    
    // Keep only last 10000 vectors to prevent memory issues
    if (this.threatVectors.length > 10000) {
      this.threatVectors = this.threatVectors.slice(-10000);
    }

    // Emit threat event for real-time processing
    this.emit('threatDetected', this.analyzeThreatVector(vector));
  }

  /**
   * Generate simulated threat vectors for testing
   */
  public generateSimulatedThreats(count: number): ThreatVector[] {
    const threats: ThreatVector[] = [];
    
    for (let i = 0; i < count; i++) {
      const threat: ThreatVector = {
        id: `threat_${Date.now()}_${i}`,
        timestamp: new Date(),
        sourceIP: this.generateRandomIP(),
        targetIP: '192.168.1.1',
        port: Math.random() > 0.5 ? Math.floor(Math.random() * 1024) : Math.floor(Math.random() * 65535),
        protocol: Math.random() > 0.5 ? 'TCP' : 'UDP',
        payloadSize: Math.floor(Math.random() * 50000),
        requestFrequency: Math.floor(Math.random() * 50),
        geolocation: Math.random() > 0.7 ? ['RU', 'CN', 'KP'][Math.floor(Math.random() * 3)] : 'US',
        userAgent: Math.random() > 0.8 ? 'bot/1.0' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        sessionDuration: Math.floor(Math.random() * 7200),
        failedAttempts: Math.floor(Math.random() * 20),
        accessPatterns: Math.random() > 0.5 ? 
          ['admin/config.php', 'wp-admin/admin-ajax.php', '../../../etc/passwd'] :
          ['home.html', 'profile.html', 'dashboard.html']
      };
      threats.push(threat);
    }
    
    return threats;
  }

  private generateRandomIP(): string {
    const octets = Array.from({ length: 4 }, () => Math.floor(Math.random() * 256));
    return octets.join('.');
  }
}