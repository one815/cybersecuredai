import { randomBytes, createHash } from "crypto";
import { User } from "@shared/schema";

export interface VerificationContext {
  userId: string;
  ipAddress: string;
  userAgent: string;
  location?: {
    country: string;
    city: string;
    coordinates?: [number, number];
  };
  device: {
    id: string;
    type: "mobile" | "desktop" | "tablet";
    os: string;
    browser: string;
    fingerprint: string;
  };
  requestedResource: string;
  requestType: "read" | "write" | "admin" | "sensitive";
  timestamp: Date;
}

export interface VerificationResult {
  granted: boolean;
  riskLevel: "low" | "medium" | "high" | "critical";
  riskScore: number; // 0-100
  verificationMethod: "mfa" | "biometric" | "device" | "certificate" | "token";
  requiresAdditionalAuth: boolean;
  denialReason?: string;
  sessionId: string;
  expiresAt: Date;
}

export interface TrustedDevice {
  id: string;
  userId: string;
  fingerprint: string;
  name: string;
  type: "mobile" | "desktop" | "tablet";
  firstSeen: Date;
  lastUsed: Date;
  trustScore: number; // 0-100
  isActive: boolean;
}

export class ZeroTrustEngine {
  private trustedDevices: Map<string, TrustedDevice> = new Map();
  private activeSessions: Map<string, VerificationResult> = new Map();
  private suspiciousIPs: Set<string> = new Set();
  private geoAnomalies: Map<string, { country: string; timestamp: Date }[]> = new Map();

  constructor() {
    this.initializeData();
  }

  private initializeData() {
    // Initialize with some trusted devices
    const trustedDevicesData: TrustedDevice[] = [
      {
        id: "device-1",
        userId: "admin-1",
        fingerprint: this.generateFingerprint("Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0"),
        name: "Admin Workstation",
        type: "desktop",
        firstSeen: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        lastUsed: new Date(),
        trustScore: 95,
        isActive: true
      },
      {
        id: "device-2", 
        userId: "admin-1",
        fingerprint: this.generateFingerprint("Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) Safari/604.1"),
        name: "iPhone",
        type: "mobile",
        firstSeen: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
        lastUsed: new Date(Date.now() - 2 * 60 * 60 * 1000),
        trustScore: 88,
        isActive: true
      }
    ];

    trustedDevicesData.forEach(device => {
      this.trustedDevices.set(device.id, device);
    });

    // Initialize suspicious IPs (threat intelligence)
    this.suspiciousIPs.add("192.168.100.50"); // Known compromised IP
    this.suspiciousIPs.add("10.0.0.99"); // Suspicious activity detected
  }

  generateFingerprint(userAgent: string, additionalData?: string): string {
    const data = userAgent + (additionalData || "") + Date.now().toString();
    return createHash("sha256").update(data).digest("hex").substring(0, 16);
  }

  async verifyAccess(context: VerificationContext, user: User): Promise<VerificationResult> {
    const sessionId = randomBytes(16).toString("hex");
    let riskScore = 0;
    let riskLevel: "low" | "medium" | "high" | "critical" = "low";
    const riskFactors: string[] = [];

    // 1. Device Trust Analysis
    const deviceTrust = this.analyzeDeviceTrust(context);
    riskScore += deviceTrust.riskScore;
    if (deviceTrust.riskFactors.length > 0) {
      riskFactors.push(...deviceTrust.riskFactors);
    }

    // 2. Geographic Anomaly Detection
    const geoRisk = this.analyzeGeographicAnomaly(context);
    riskScore += geoRisk.riskScore;
    if (geoRisk.riskFactors.length > 0) {
      riskFactors.push(...geoRisk.riskFactors);
    }

    // 3. IP Reputation Check
    const ipRisk = this.analyzeIPReputation(context);
    riskScore += ipRisk.riskScore;
    if (ipRisk.riskFactors.length > 0) {
      riskFactors.push(...ipRisk.riskFactors);
    }

    // 4. Behavioral Analysis
    const behaviorRisk = this.analyzeBehavior(context, user);
    riskScore += behaviorRisk.riskScore;
    if (behaviorRisk.riskFactors.length > 0) {
      riskFactors.push(...behaviorRisk.riskFactors);
    }

    // 5. Resource Sensitivity Analysis
    const resourceRisk = this.analyzeResourceSensitivity(context);
    riskScore += resourceRisk.riskScore;
    if (resourceRisk.riskFactors.length > 0) {
      riskFactors.push(...resourceRisk.riskFactors);
    }

    // Determine overall risk level
    if (riskScore >= 80) riskLevel = "critical";
    else if (riskScore >= 60) riskLevel = "high";
    else if (riskScore >= 30) riskLevel = "medium";
    else riskLevel = "low";

    // Determine verification method based on risk and user preferences
    const verificationMethod = this.selectVerificationMethod(riskLevel, user, deviceTrust.isTrusted);

    // Make access decision
    const granted = this.makeAccessDecision(riskLevel, user, context);

    const result: VerificationResult = {
      granted,
      riskLevel,
      riskScore: Math.min(riskScore, 100),
      verificationMethod,
      requiresAdditionalAuth: riskLevel === "high" || riskLevel === "critical",
      denialReason: !granted ? riskFactors.join(", ") : undefined,
      sessionId,
      expiresAt: new Date(Date.now() + (riskLevel === "low" ? 8 * 60 * 60 * 1000 : 2 * 60 * 60 * 1000)) // 8h for low risk, 2h for higher risk
    };

    // Store active session
    this.activeSessions.set(sessionId, result);

    return result;
  }

  private analyzeDeviceTrust(context: VerificationContext): { riskScore: number; riskFactors: string[]; isTrusted: boolean } {
    const riskFactors: string[] = [];
    let riskScore = 0;
    let isTrusted = false;

    // Check if device is in trusted devices
    const trustedDevice = Array.from(this.trustedDevices.values())
      .find(d => d.userId === context.userId && d.fingerprint === context.device.fingerprint);

    if (trustedDevice) {
      isTrusted = true;
      riskScore = Math.max(0, 20 - trustedDevice.trustScore / 5); // Lower risk for higher trust score
      
      // Update last used
      trustedDevice.lastUsed = new Date();
      this.trustedDevices.set(trustedDevice.id, trustedDevice);
    } else {
      riskScore += 25; // Unknown device
      riskFactors.push("Unknown device");
    }

    return { riskScore, riskFactors, isTrusted };
  }

  private analyzeGeographicAnomaly(context: VerificationContext): { riskScore: number; riskFactors: string[] } {
    const riskFactors: string[] = [];
    let riskScore = 0;

    if (!context.location) {
      riskScore += 10;
      riskFactors.push("Unknown location");
      return { riskScore, riskFactors };
    }

    const userHistory = this.geoAnomalies.get(context.userId) || [];
    
    if (userHistory.length > 0) {
      const lastLocation = userHistory[userHistory.length - 1];
      const timeDiff = context.timestamp.getTime() - lastLocation.timestamp.getTime();
      const hoursDiff = timeDiff / (1000 * 60 * 60);

      // Check for impossible travel (different countries within 2 hours)
      if (lastLocation.country !== context.location.country && hoursDiff < 2) {
        riskScore += 40;
        riskFactors.push("Impossible travel detected");
      }
      
      // Check for unusual country access
      const frequentCountries = userHistory.filter(h => 
        h.timestamp.getTime() > Date.now() - 30 * 24 * 60 * 60 * 1000
      ).map(h => h.country);
      
      if (!frequentCountries.includes(context.location.country) && frequentCountries.length > 0) {
        riskScore += 20;
        riskFactors.push("Unusual geographic access");
      }
    }

    // Update geo history
    userHistory.push({
      country: context.location.country,
      timestamp: context.timestamp
    });
    
    // Keep only last 50 entries
    if (userHistory.length > 50) {
      userHistory.splice(0, userHistory.length - 50);
    }
    
    this.geoAnomalies.set(context.userId, userHistory);

    return { riskScore, riskFactors };
  }

  private analyzeIPReputation(context: VerificationContext): { riskScore: number; riskFactors: string[] } {
    const riskFactors: string[] = [];
    let riskScore = 0;

    if (this.suspiciousIPs.has(context.ipAddress)) {
      riskScore += 50;
      riskFactors.push("Suspicious IP address");
    }

    // Check for private/internal network access from external IP
    const isPrivateIP = this.isPrivateIP(context.ipAddress);
    const isInternalResource = context.requestedResource.includes("admin") || 
                              context.requestedResource.includes("system") ||
                              context.requestType === "admin";

    if (!isPrivateIP && isInternalResource) {
      riskScore += 15;
      riskFactors.push("External access to internal resource");
    }

    return { riskScore, riskFactors };
  }

  private analyzeBehavior(context: VerificationContext, user: User): { riskScore: number; riskFactors: string[] } {
    const riskFactors: string[] = [];
    let riskScore = 0;

    // Time-based analysis
    const hour = context.timestamp.getHours();
    if ((hour < 6 || hour > 22) && context.requestType === "sensitive") {
      riskScore += 15;
      riskFactors.push("Unusual access hours");
    }

    // User role vs resource analysis
    if (user.role === "user" && (context.requestType === "admin" || context.requestedResource.includes("admin"))) {
      riskScore += 30;
      riskFactors.push("Privilege escalation attempt");
    }

    // Multiple failed attempts (would be tracked in real implementation)
    // For now, simulate based on timestamp patterns
    if (context.timestamp.getMinutes() % 7 === 0) { // Simulate suspicious pattern
      riskScore += 20;
      riskFactors.push("Suspicious access pattern");
    }

    return { riskScore, riskFactors };
  }

  private analyzeResourceSensitivity(context: VerificationContext): { riskScore: number; riskFactors: string[] } {
    const riskFactors: string[] = [];
    let riskScore = 0;

    const sensitiveKeywords = ["admin", "database", "config", "api-key", "password", "backup", "audit"];
    const resourceLower = context.requestedResource.toLowerCase();

    const matchingSensitiveKeywords = sensitiveKeywords.filter(keyword => 
      resourceLower.includes(keyword)
    );

    if (matchingSensitiveKeywords.length > 0) {
      riskScore += matchingSensitiveKeywords.length * 10;
      riskFactors.push(`Sensitive resource access: ${matchingSensitiveKeywords.join(", ")}`);
    }

    if (context.requestType === "write" && matchingSensitiveKeywords.length > 0) {
      riskScore += 15;
      riskFactors.push("Write access to sensitive resource");
    }

    return { riskScore, riskFactors };
  }

  private selectVerificationMethod(
    riskLevel: "low" | "medium" | "high" | "critical", 
    user: User, 
    isTrustedDevice: boolean
  ): "mfa" | "biometric" | "device" | "certificate" | "token" {
    
    if (riskLevel === "critical") {
      return user.biometricEnabled ? "biometric" : "mfa";
    }
    
    if (riskLevel === "high") {
      return user.mfaEnabled ? "mfa" : "token";
    }
    
    if (riskLevel === "medium") {
      return isTrustedDevice ? "device" : "token";
    }
    
    // Low risk
    return isTrustedDevice ? "device" : "token";
  }

  private makeAccessDecision(
    riskLevel: "low" | "medium" | "high" | "critical",
    user: User,
    context: VerificationContext
  ): boolean {
    
    // Admin users get more lenient treatment
    if (user.role === "admin" && riskLevel !== "critical") {
      return true;
    }
    
    // Critical risk is always denied without proper authentication
    if (riskLevel === "critical" && !user.biometricEnabled && !user.mfaEnabled) {
      return false;
    }
    
    // High risk requires MFA or biometric
    if (riskLevel === "high" && !user.mfaEnabled && !user.biometricEnabled) {
      return false;
    }
    
    // Inactive users are denied
    if (!user.isActive) {
      return false;
    }
    
    return true;
  }

  private isPrivateIP(ip: string): boolean {
    // Simple check for private IP ranges
    return ip.startsWith("192.168.") || 
           ip.startsWith("10.") || 
           ip.startsWith("172.") ||
           ip === "127.0.0.1" ||
           ip === "localhost";
  }

  // Public methods for device management
  async registerTrustedDevice(userId: string, deviceInfo: Partial<TrustedDevice>): Promise<TrustedDevice> {
    const deviceId = randomBytes(8).toString("hex");
    const device: TrustedDevice = {
      id: deviceId,
      userId,
      fingerprint: deviceInfo.fingerprint || this.generateFingerprint("unknown"),
      name: deviceInfo.name || "Unknown Device",
      type: deviceInfo.type || "desktop",
      firstSeen: new Date(),
      lastUsed: new Date(),
      trustScore: 50, // Start with medium trust
      isActive: true
    };

    this.trustedDevices.set(deviceId, device);
    return device;
  }

  async getTrustedDevices(userId: string): Promise<TrustedDevice[]> {
    return Array.from(this.trustedDevices.values())
      .filter(device => device.userId === userId && device.isActive);
  }

  async revokeTrustedDevice(deviceId: string): Promise<boolean> {
    const device = this.trustedDevices.get(deviceId);
    if (device) {
      device.isActive = false;
      this.trustedDevices.set(deviceId, device);
      return true;
    }
    return false;
  }

  getActiveSessionsCount(): number {
    return this.activeSessions.size;
  }

  getTrustedDevicesCount(): number {
    return Array.from(this.trustedDevices.values()).filter(d => d.isActive).length;
  }
}

export const zeroTrustEngine = new ZeroTrustEngine();