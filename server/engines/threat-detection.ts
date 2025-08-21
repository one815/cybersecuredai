import { randomBytes } from "crypto";
import { Threat, InsertThreat } from "@shared/schema";

export interface ThreatPattern {
  id: string;
  name: string;
  type: "malware" | "phishing" | "ddos" | "brute_force" | "anomaly" | "insider" | "ransomware";
  indicators: string[];
  severity: "low" | "medium" | "high" | "critical";
  confidence: number; // 0-100
  description: string;
}

export interface NetworkEvent {
  timestamp: Date;
  sourceIP: string;
  destinationIP: string;
  port: number;
  protocol: "tcp" | "udp" | "icmp" | "http" | "https";
  bytes: number;
  packets: number;
  userAgent?: string;
  payload?: string;
  userId?: string;
}

export interface DetectionResult {
  threatId: string;
  pattern: ThreatPattern;
  confidence: number;
  severity: "low" | "medium" | "high" | "critical";
  evidenceEvents: NetworkEvent[];
  riskScore: number;
  recommendation: string;
  requiresImmediateAction: boolean;
  metadata: Record<string, any>;
}

export interface AnomalyMetrics {
  baselineBytes: number;
  baselineConnections: number;
  currentBytes: number;
  currentConnections: number;
  deviation: number; // Standard deviations from baseline
  isAnomaly: boolean;
}

export class ThreatDetectionEngine {
  private threatPatterns: Map<string, ThreatPattern> = new Map();
  private recentEvents: NetworkEvent[] = [];
  private ipReputationCache: Map<string, { score: number; lastChecked: Date }> = new Map();
  private baselineMetrics: Map<string, number[]> = new Map(); // Store historical data for anomaly detection
  private suspiciousIPs: Set<string> = new Set();
  private allowedIPs: Set<string> = new Set();

  constructor() {
    this.initializeThreatPatterns();
    this.initializeNetworkBaseline();
  }

  private initializeThreatPatterns() {
    const patterns: ThreatPattern[] = [
      {
        id: "brute-force-1",
        name: "SSH Brute Force Attack",
        type: "brute_force",
        indicators: ["multiple failed logins", "ssh", "port 22", "high frequency"],
        severity: "high",
        confidence: 85,
        description: "Multiple failed SSH login attempts from single source"
      },
      {
        id: "ddos-1", 
        name: "HTTP DDoS Attack",
        type: "ddos",
        indicators: ["high request rate", "single source", "http flood", "bandwidth spike"],
        severity: "critical",
        confidence: 90,
        description: "Distributed denial of service attack targeting HTTP services"
      },
      {
        id: "malware-1",
        name: "Command & Control Communication",
        type: "malware",
        indicators: ["c2 communication", "suspicious domain", "encrypted payload", "periodic beacons"],
        severity: "high",
        confidence: 78,
        description: "Potential malware communicating with command and control server"
      },
      {
        id: "phishing-1",
        name: "Phishing Email Campaign",
        type: "phishing",
        indicators: ["suspicious links", "credential harvesting", "social engineering", "fake domains"],
        severity: "medium",
        confidence: 82,
        description: "Email-based phishing attack attempting credential theft"
      },
      {
        id: "insider-1",
        name: "Insider Data Exfiltration",
        type: "insider",
        indicators: ["unusual data access", "off-hours activity", "large file transfers", "external destinations"],
        severity: "critical",
        confidence: 70,
        description: "Potential insider threat attempting data exfiltration"
      },
      {
        id: "ransomware-1",
        name: "Ransomware Encryption Activity",
        type: "ransomware",
        indicators: ["file encryption", "mass file changes", "ransom note", "crypto algorithms"],
        severity: "critical",
        confidence: 95,
        description: "Ransomware detected encrypting files on network"
      }
    ];

    patterns.forEach(pattern => {
      this.threatPatterns.set(pattern.id, pattern);
    });
  }

  private initializeNetworkBaseline() {
    // Initialize with baseline network metrics (in real implementation, this would come from historical data)
    this.baselineMetrics.set("total_bytes", [1250000, 1180000, 1320000, 1280000, 1210000]); // Last 5 periods
    this.baselineMetrics.set("total_connections", [450, 420, 480, 460, 440]);
    this.baselineMetrics.set("failed_logins", [5, 3, 7, 4, 6]);
    this.baselineMetrics.set("external_requests", [120, 110, 135, 125, 115]);

    // Initialize known threat IPs
    this.suspiciousIPs.add("203.0.113.100"); // Known malicious IP
    this.suspiciousIPs.add("198.51.100.50"); // Botnet IP
    this.suspiciousIPs.add("192.0.2.200"); // C&C Server

    // Initialize allowed IPs
    this.allowedIPs.add("192.168.1.0/24"); // Internal network
    this.allowedIPs.add("10.0.0.0/8"); // Private network
  }

  async analyzeNetworkTraffic(events: NetworkEvent[]): Promise<DetectionResult[]> {
    this.recentEvents.push(...events);
    
    // Keep only last 1000 events for performance
    if (this.recentEvents.length > 1000) {
      this.recentEvents = this.recentEvents.slice(-1000);
    }

    const detectionResults: DetectionResult[] = [];

    // Run different detection algorithms
    const bruteForceResults = await this.detectBruteForceAttacks(events);
    const ddosResults = await this.detectDDoSAttacks(events);
    const malwareResults = await this.detectMalwareCommunication(events);
    const anomalyResults = await this.detectAnomalies(events);
    const insiderResults = await this.detectInsiderThreats(events);

    detectionResults.push(
      ...bruteForceResults,
      ...ddosResults, 
      ...malwareResults,
      ...anomalyResults,
      ...insiderResults
    );

    return detectionResults;
  }

  private async detectBruteForceAttacks(events: NetworkEvent[]): Promise<DetectionResult[]> {
    const results: DetectionResult[] = [];
    const loginAttempts: Map<string, NetworkEvent[]> = new Map();

    // Group events by source IP that might be login attempts
    events.forEach(event => {
      if (event.port === 22 || event.port === 21 || event.port === 3389 || // SSH, FTP, RDP
          (event.userAgent && event.protocol === "https")) { // Web login attempts
        
        if (!loginAttempts.has(event.sourceIP)) {
          loginAttempts.set(event.sourceIP, []);
        }
        loginAttempts.get(event.sourceIP)!.push(event);
      }
    });

    // Analyze each IP's login pattern
    for (const [sourceIP, ipEvents] of Array.from(loginAttempts.entries())) {
      if (ipEvents.length >= 10) { // Threshold for brute force
        const pattern = this.threatPatterns.get("brute-force-1")!;
        const confidence = Math.min(95, 60 + (ipEvents.length * 2)); // Higher attempts = higher confidence
        
        // Calculate time window
        const firstAttempt = Math.min(...ipEvents.map((e: NetworkEvent) => e.timestamp.getTime()));
        const lastAttempt = Math.max(...ipEvents.map((e: NetworkEvent) => e.timestamp.getTime()));
        const timeWindow = (lastAttempt - firstAttempt) / (1000 * 60); // minutes
        
        const riskScore = this.calculateBruteForceRiskScore(ipEvents.length, timeWindow);

        results.push({
          threatId: randomBytes(8).toString("hex"),
          pattern,
          confidence,
          severity: riskScore > 80 ? "critical" : riskScore > 60 ? "high" : "medium",
          evidenceEvents: ipEvents.slice(0, 10), // First 10 events as evidence
          riskScore,
          recommendation: `Block source IP ${sourceIP} and investigate affected accounts`,
          requiresImmediateAction: riskScore > 75,
          metadata: {
            sourceIP,
            attemptCount: ipEvents.length,
            timeWindowMinutes: Math.round(timeWindow),
            averageAttemptInterval: Math.round(timeWindow / ipEvents.length * 60) // seconds
          }
        });
      }
    }

    return results;
  }

  private async detectDDoSAttacks(events: NetworkEvent[]): Promise<DetectionResult[]> {
    const results: DetectionResult[] = [];
    const trafficBySource: Map<string, { events: NetworkEvent[]; totalBytes: number }> = new Map();

    // Group traffic by source IP
    events.forEach(event => {
      if (!trafficBySource.has(event.sourceIP)) {
        trafficBySource.set(event.sourceIP, { events: [], totalBytes: 0 });
      }
      const sourceData = trafficBySource.get(event.sourceIP)!;
      sourceData.events.push(event);
      sourceData.totalBytes += event.bytes;
    });

    // Check for DDoS patterns
    for (const [sourceIP, sourceData] of Array.from(trafficBySource.entries())) {
      const requestRate = sourceData.events.length;
      const avgRequestSize = sourceData.totalBytes / sourceData.events.length;

      // High request rate or high bandwidth from single source
      if (requestRate > 100 || sourceData.totalBytes > 5000000) { // 5MB threshold
        const pattern = this.threatPatterns.get("ddos-1")!;
        const confidence = Math.min(95, 70 + (requestRate / 10));
        const riskScore = this.calculateDDoSRiskScore(requestRate, sourceData.totalBytes, avgRequestSize);

        results.push({
          threatId: randomBytes(8).toString("hex"),
          pattern,
          confidence,
          severity: riskScore > 85 ? "critical" : "high",
          evidenceEvents: sourceData.events.slice(0, 20),
          riskScore,
          recommendation: `Implement rate limiting for ${sourceIP} and consider blocking if attack continues`,
          requiresImmediateAction: riskScore > 80,
          metadata: {
            sourceIP,
            requestRate,
            totalBytes: sourceData.totalBytes,
            averageRequestSize: Math.round(avgRequestSize),
            duration: this.getEventsDuration(sourceData.events)
          }
        });
      }
    }

    return results;
  }

  private async detectMalwareCommunication(events: NetworkEvent[]): Promise<DetectionResult[]> {
    const results: DetectionResult[] = [];
    const suspiciousConnections: NetworkEvent[] = [];

    events.forEach(event => {
      // Check for connections to known malicious IPs
      if (this.suspiciousIPs.has(event.destinationIP)) {
        suspiciousConnections.push(event);
      }
      
      // Check for suspicious patterns
      if (event.payload && this.containsSuspiciousContent(event.payload)) {
        suspiciousConnections.push(event);
      }
      
      // Check for beaconing behavior (regular intervals)
      if (this.detectBeaconingPattern([event], events)) {
        suspiciousConnections.push(event);
      }
    });

    if (suspiciousConnections.length > 0) {
      const pattern = this.threatPatterns.get("malware-1")!;
      const confidence = Math.min(90, 50 + (suspiciousConnections.length * 5));
      const riskScore = this.calculateMalwareRiskScore(suspiciousConnections);

      results.push({
        threatId: randomBytes(8).toString("hex"),
        pattern,
        confidence,
        severity: riskScore > 75 ? "critical" : riskScore > 50 ? "high" : "medium",
        evidenceEvents: suspiciousConnections.slice(0, 10),
        riskScore,
        recommendation: "Isolate affected systems and perform malware scan",
        requiresImmediateAction: riskScore > 70,
        metadata: {
          suspiciousConnectionCount: suspiciousConnections.length,
          uniqueDestinations: new Set(suspiciousConnections.map(e => e.destinationIP)).size,
          containsMaliciousIP: suspiciousConnections.some(e => this.suspiciousIPs.has(e.destinationIP))
        }
      });
    }

    return results;
  }

  private async detectAnomalies(events: NetworkEvent[]): Promise<DetectionResult[]> {
    const results: DetectionResult[] = [];
    const currentMetrics = this.calculateCurrentMetrics(events);
    
    for (const [metric, currentValue] of Object.entries(currentMetrics)) {
      const baseline = this.baselineMetrics.get(metric);
      if (!baseline || baseline.length === 0) continue;

      const anomalyResult = this.detectStatisticalAnomaly(metric, currentValue, baseline);
      
      if (anomalyResult.isAnomaly && anomalyResult.deviation > 2) { // 2+ standard deviations
        const riskScore = Math.min(100, 30 + (anomalyResult.deviation * 15));
        
        results.push({
          threatId: randomBytes(8).toString("hex"),
          pattern: {
            id: "anomaly-" + metric,
            name: `Anomalous ${metric.replace('_', ' ')}`,
            type: "anomaly",
            indicators: [`statistical deviation`, `${anomalyResult.deviation.toFixed(1)} sigma`],
            severity: riskScore > 70 ? "high" : riskScore > 40 ? "medium" : "low",
            confidence: Math.min(90, 60 + (anomalyResult.deviation * 10)),
            description: `Unusual ${metric.replace('_', ' ')} detected - ${anomalyResult.deviation.toFixed(1)} standard deviations from baseline`
          },
          confidence: Math.min(90, 60 + (anomalyResult.deviation * 10)),
          severity: riskScore > 70 ? "high" : riskScore > 40 ? "medium" : "low",
          evidenceEvents: events.slice(0, 5),
          riskScore,
          recommendation: `Investigate cause of anomalous ${metric.replace('_', ' ')} and verify if legitimate`,
          requiresImmediateAction: riskScore > 75,
          metadata: {
            metric,
            currentValue,
            baselineAverage: baseline.reduce((a, b) => a + b, 0) / baseline.length,
            standardDeviations: anomalyResult.deviation
          }
        });
      }
    }

    return results;
  }

  private async detectInsiderThreats(events: NetworkEvent[]): Promise<DetectionResult[]> {
    const results: DetectionResult[] = [];
    const userActivities: Map<string, NetworkEvent[]> = new Map();

    // Group events by user
    events.forEach(event => {
      if (event.userId) {
        if (!userActivities.has(event.userId)) {
          userActivities.set(event.userId, []);
        }
        userActivities.get(event.userId)!.push(event);
      }
    });

    for (const [userId, userEvents] of Array.from(userActivities.entries())) {
      const riskIndicators = this.analyzeUserBehavior(userId, userEvents);
      
      if (riskIndicators.length > 2) { // Multiple risk indicators
        const pattern = this.threatPatterns.get("insider-1")!;
        const confidence = Math.min(85, 40 + (riskIndicators.length * 10));
        const riskScore = this.calculateInsiderThreatRiskScore(riskIndicators, userEvents);

        results.push({
          threatId: randomBytes(8).toString("hex"),
          pattern,
          confidence,
          severity: riskScore > 80 ? "critical" : riskScore > 60 ? "high" : "medium",
          evidenceEvents: userEvents.slice(0, 10),
          riskScore,
          recommendation: `Review user ${userId} access permissions and monitor activity closely`,
          requiresImmediateAction: riskScore > 85,
          metadata: {
            userId,
            riskIndicators,
            eventCount: userEvents.length,
            dataVolumeBytes: userEvents.reduce((sum: number, e: NetworkEvent) => sum + e.bytes, 0)
          }
        });
      }
    }

    return results;
  }

  // Helper methods
  private calculateBruteForceRiskScore(attemptCount: number, timeWindowMinutes: number): number {
    const baseScore = Math.min(50, attemptCount * 2);
    const timeMultiplier = timeWindowMinutes < 5 ? 2 : timeWindowMinutes < 15 ? 1.5 : 1;
    return Math.min(100, baseScore * timeMultiplier);
  }

  private calculateDDoSRiskScore(requestRate: number, totalBytes: number, avgRequestSize: number): number {
    const rateScore = Math.min(40, requestRate / 5);
    const volumeScore = Math.min(40, totalBytes / 100000);
    const patternScore = avgRequestSize < 100 ? 20 : 0; // Small requests might indicate attack
    return Math.min(100, rateScore + volumeScore + patternScore);
  }

  private calculateMalwareRiskScore(events: NetworkEvent[]): number {
    let score = events.length * 10; // Base score per suspicious event
    
    // Bonus for malicious IP connections
    const maliciousIPCount = events.filter(e => this.suspiciousIPs.has(e.destinationIP)).length;
    score += maliciousIPCount * 20;
    
    return Math.min(100, score);
  }

  private calculateInsiderThreatRiskScore(indicators: string[], events: NetworkEvent[]): number {
    let score = indicators.length * 15;
    
    // High data volume increases risk
    const totalBytes = events.reduce((sum, e) => sum + e.bytes, 0);
    if (totalBytes > 10000000) score += 25; // 10MB+
    
    // Off-hours activity
    const offHoursEvents = events.filter(e => {
      const hour = e.timestamp.getHours();
      return hour < 7 || hour > 19;
    });
    
    if (offHoursEvents.length > events.length * 0.3) {
      score += 20;
    }
    
    return Math.min(100, score);
  }

  private calculateCurrentMetrics(events: NetworkEvent[]): Record<string, number> {
    return {
      total_bytes: events.reduce((sum, e) => sum + e.bytes, 0),
      total_connections: events.length,
      failed_logins: events.filter(e => e.port === 22 || e.port === 21 || e.port === 3389).length,
      external_requests: events.filter(e => !this.isInternalIP(e.destinationIP)).length
    };
  }

  private detectStatisticalAnomaly(metric: string, currentValue: number, baseline: number[]): AnomalyMetrics {
    const mean = baseline.reduce((a, b) => a + b, 0) / baseline.length;
    const variance = baseline.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / baseline.length;
    const stdDev = Math.sqrt(variance);
    
    const deviation = Math.abs(currentValue - mean) / (stdDev || 1);
    const isAnomaly = deviation > 2; // 2 standard deviations
    
    return {
      baselineBytes: mean,
      baselineConnections: mean,
      currentBytes: currentValue,
      currentConnections: currentValue,
      deviation,
      isAnomaly
    };
  }

  private containsSuspiciousContent(payload: string): boolean {
    const suspiciousPatterns = [
      /eval\(/i,
      /exec\(/i,
      /system\(/i,
      /cmd\.exe/i,
      /powershell/i,
      /\<script\>/i,
      /malware/i,
      /trojan/i
    ];
    
    return suspiciousPatterns.some(pattern => pattern.test(payload));
  }

  private detectBeaconingPattern(targetEvent: NetworkEvent[], allEvents: NetworkEvent[]): boolean {
    // Simplified beaconing detection - check for regular time intervals
    const sameDestination = allEvents.filter(e => 
      e.destinationIP === targetEvent[0].destinationIP &&
      Math.abs(e.timestamp.getTime() - targetEvent[0].timestamp.getTime()) < 3600000 // Within 1 hour
    );
    
    if (sameDestination.length < 3) return false;
    
    // Check for regular intervals (simplified)
    const intervals = [];
    for (let i = 1; i < sameDestination.length; i++) {
      intervals.push(sameDestination[i].timestamp.getTime() - sameDestination[i-1].timestamp.getTime());
    }
    
    // Check if intervals are relatively consistent (variance < 30%)
    const avgInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length;
    const variance = intervals.reduce((sum, interval) => sum + Math.pow(interval - avgInterval, 2), 0) / intervals.length;
    const stdDev = Math.sqrt(variance);
    
    return (stdDev / avgInterval) < 0.3; // Less than 30% variance indicates regular pattern
  }

  private analyzeUserBehavior(userId: string, events: NetworkEvent[]): string[] {
    const indicators: string[] = [];
    
    // Check for unusual data volume
    const totalBytes = events.reduce((sum, e) => sum + e.bytes, 0);
    if (totalBytes > 50000000) { // 50MB
      indicators.push("High data volume transfer");
    }
    
    // Check for off-hours activity
    const offHoursEvents = events.filter(e => {
      const hour = e.timestamp.getHours();
      return hour < 6 || hour > 22;
    });
    
    if (offHoursEvents.length > events.length * 0.4) {
      indicators.push("Unusual access hours");
    }
    
    // Check for external destinations
    const externalEvents = events.filter(e => !this.isInternalIP(e.destinationIP));
    if (externalEvents.length > events.length * 0.6) {
      indicators.push("High external communication");
    }
    
    // Check for multiple different destinations
    const uniqueDestinations = new Set(events.map(e => e.destinationIP));
    if (uniqueDestinations.size > 20) {
      indicators.push("Multiple destination access");
    }
    
    return indicators;
  }

  private getEventsDuration(events: NetworkEvent[]): number {
    if (events.length < 2) return 0;
    const times = events.map(e => e.timestamp.getTime()).sort();
    return Math.round((times[times.length - 1] - times[0]) / 1000); // seconds
  }

  private isInternalIP(ip: string): boolean {
    return ip.startsWith("192.168.") || 
           ip.startsWith("10.") || 
           ip.startsWith("172.") ||
           ip === "127.0.0.1";
  }

  // Public methods for getting threat intelligence
  getThreatPatterns(): ThreatPattern[] {
    return Array.from(this.threatPatterns.values());
  }

  getRecentThreatsCount(): number {
    return this.recentEvents.length;
  }

  getSuspiciousIPsCount(): number {
    return this.suspiciousIPs.size;
  }

  async updateThreatIntelligence(suspiciousIPs: string[]): Promise<void> {
    suspiciousIPs.forEach(ip => this.suspiciousIPs.add(ip));
  }
}

export const threatDetectionEngine = new ThreatDetectionEngine();