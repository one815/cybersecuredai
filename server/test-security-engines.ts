// Test script to demonstrate the security engines functionality
import { zeroTrustEngine, type VerificationContext } from "./engines/zero-trust";
import { threatDetectionEngine, type NetworkEvent } from "./engines/threat-detection";

async function testZeroTrustEngine() {
  console.log("\n=== Testing Zero-Trust Engine ===");
  
  // Mock user data
  const user = {
    id: "admin-1",
    email: "admin@cybersecure.ai",
    firstName: "Alex",
    lastName: "Morgan",
    role: "admin" as const,
    organization: "CyberSecure AI",
    isActive: true,
    mfaEnabled: true,
    mfaMethod: "biometric" as const,
    biometricEnabled: true,
    planType: "cyber_cloud_enterprise",
    onboardingCompleted: true,
    profileImageUrl: null,
    lastLogin: new Date(),
    createdAt: new Date(),
    updatedAt: new Date()
  };

  // Test 1: Low-risk verification from trusted device
  console.log("\\n--- Test 1: Low-risk verification ---");
  const lowRiskContext: VerificationContext = {
    userId: "admin-1",
    ipAddress: "192.168.1.100",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0",
    location: { country: "US", city: "Austin" },
    device: {
      id: "device-1",
      type: "desktop",
      os: "Windows 10",
      browser: "Chrome",
      fingerprint: zeroTrustEngine.generateFingerprint("Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0")
    },
    requestedResource: "dashboard",
    requestType: "read",
    timestamp: new Date()
  };

  const lowRiskResult = await zeroTrustEngine.verifyAccess(lowRiskContext, user);
  console.log(`Access ${lowRiskResult.granted ? "GRANTED" : "DENIED"}`);
  console.log(`Risk Level: ${lowRiskResult.riskLevel} (${lowRiskResult.riskScore}%)`);
  console.log(`Verification Method: ${lowRiskResult.verificationMethod}`);
  
  // Test 2: High-risk verification from suspicious source
  console.log("\\n--- Test 2: High-risk verification ---");
  const highRiskContext: VerificationContext = {
    userId: "admin-1", 
    ipAddress: "192.168.100.50", // Suspicious IP from initialization
    userAgent: "curl/7.68.0",
    location: { country: "RU", city: "Moscow" }, // Different country
    device: {
      id: "unknown-device",
      type: "desktop",
      os: "Linux",
      browser: "curl",
      fingerprint: zeroTrustEngine.generateFingerprint("curl/7.68.0")
    },
    requestedResource: "admin/system-config",
    requestType: "admin",
    timestamp: new Date()
  };

  const highRiskResult = await zeroTrustEngine.verifyAccess(highRiskContext, user);
  console.log(`Access ${highRiskResult.granted ? "GRANTED" : "DENIED"}`);
  console.log(`Risk Level: ${highRiskResult.riskLevel} (${highRiskResult.riskScore}%)`);
  console.log(`Verification Method: ${highRiskResult.verificationMethod}`);
  if (highRiskResult.denialReason) {
    console.log(`Denial Reason: ${highRiskResult.denialReason}`);
  }

  // Test 3: Device management
  console.log("\\n--- Test 3: Device Management ---");
  const trustedDevices = await zeroTrustEngine.getTrustedDevices("admin-1");
  console.log(`Trusted devices for admin-1: ${trustedDevices.length}`);
  trustedDevices.forEach((device, index) => {
    console.log(`  ${index + 1}. ${device.name} (${device.type}) - Trust: ${device.trustScore}%`);
  });
}

async function testThreatDetectionEngine() {
  console.log("\\n=== Testing Threat Detection Engine ===");
  
  // Test 1: Brute force attack simulation
  console.log("\\n--- Test 1: Brute Force Attack Detection ---");
  const bruteForceEvents: NetworkEvent[] = [];
  const attackerIP = "203.0.113.100";
  
  // Generate 15 failed login attempts from same IP within 5 minutes
  for (let i = 0; i < 15; i++) {
    bruteForceEvents.push({
      timestamp: new Date(Date.now() - (300000 - (i * 20000))), // Spread over 5 minutes
      sourceIP: attackerIP,
      destinationIP: "192.168.1.10",
      port: 22, // SSH
      protocol: "tcp",
      bytes: 64,
      packets: 1,
      userId: undefined
    });
  }

  const bruteForceResults = await threatDetectionEngine.analyzeNetworkTraffic(bruteForceEvents);
  console.log(`Detected ${bruteForceResults.length} threats from brute force simulation`);
  
  bruteForceResults.forEach((result, index) => {
    console.log(`  Threat ${index + 1}: ${result.pattern.name}`);
    console.log(`    Severity: ${result.severity} (${result.riskScore}% risk)`);
    console.log(`    Confidence: ${result.confidence}%`);
    console.log(`    Immediate Action Required: ${result.requiresImmediateAction}`);
    console.log(`    Recommendation: ${result.recommendation}`);
  });

  // Test 2: DDoS attack simulation
  console.log("\\n--- Test 2: DDoS Attack Detection ---");
  const ddosEvents: NetworkEvent[] = [];
  
  // Generate high-volume traffic from single source
  for (let i = 0; i < 150; i++) {
    ddosEvents.push({
      timestamp: new Date(Date.now() - (60000 - (i * 400))), // Spread over 1 minute
      sourceIP: "198.51.100.50",
      destinationIP: "192.168.1.100",
      port: 80,
      protocol: "http",
      bytes: 1500,
      packets: 1,
      userAgent: "Mozilla/5.0 (bot)"
    });
  }

  const ddosResults = await threatDetectionEngine.analyzeNetworkTraffic(ddosEvents);
  console.log(`Detected ${ddosResults.length} threats from DDoS simulation`);
  
  ddosResults.forEach((result, index) => {
    console.log(`  Threat ${index + 1}: ${result.pattern.name}`);
    console.log(`    Severity: ${result.severity} (${result.riskScore}% risk)`);
    console.log(`    Source IP: ${result.metadata.sourceIP}`);
    console.log(`    Request Rate: ${result.metadata.requestRate} requests`);
    console.log(`    Total Bytes: ${result.metadata.totalBytes}`);
  });

  // Test 3: Insider threat simulation
  console.log("\\n--- Test 3: Insider Threat Detection ---");
  const insiderEvents: NetworkEvent[] = [];
  const currentHour = new Date().getHours();
  
  // Generate suspicious after-hours data exfiltration
  for (let i = 0; i < 8; i++) {
    insiderEvents.push({
      timestamp: new Date(Date.now() - (i * 30000)), // Last 4 minutes
      sourceIP: "192.168.1.50",
      destinationIP: "8.8.8.8", // External destination
      port: 443,
      protocol: "https",
      bytes: 10000000, // 10MB per request
      packets: 6667,
      userId: "employee-123"
    });
  }

  const insiderResults = await threatDetectionEngine.analyzeNetworkTraffic(insiderEvents);
  console.log(`Detected ${insiderResults.length} threats from insider simulation`);
  
  insiderResults.forEach((result, index) => {
    console.log(`  Threat ${index + 1}: ${result.pattern.name}`);
    console.log(`    Severity: ${result.severity} (${result.riskScore}% risk)`);
    console.log(`    User: ${result.metadata.userId}`);
    console.log(`    Data Volume: ${Math.round(result.metadata.dataVolumeBytes / 1000000)}MB`);
    console.log(`    Risk Indicators: ${result.metadata.riskIndicators?.join(", ")}`);
  });

  // Test 4: Threat patterns and statistics
  console.log("\\n--- Test 4: Threat Intelligence ---");
  const patterns = threatDetectionEngine.getThreatPatterns();
  console.log(`Total threat patterns loaded: ${patterns.length}`);
  console.log("Available patterns:");
  patterns.forEach((pattern, index) => {
    console.log(`  ${index + 1}. ${pattern.name} (${pattern.type}) - ${pattern.severity} severity`);
  });

  console.log(`\\nCurrent threat statistics:`);
  console.log(`  Recent events monitored: ${threatDetectionEngine.getRecentThreatsCount()}`);
  console.log(`  Suspicious IPs tracked: ${threatDetectionEngine.getSuspiciousIPsCount()}`);
  console.log(`  Active Zero-Trust sessions: ${zeroTrustEngine.getActiveSessionsCount()}`);
  console.log(`  Trusted devices registered: ${zeroTrustEngine.getTrustedDevicesCount()}`);
}

// Run the tests
async function runSecurityEngineTests() {
  console.log("🔒 CyberSecure AI Security Engines Test Suite");
  console.log("===========================================");
  
  try {
    await testZeroTrustEngine();
    await testThreatDetectionEngine();
    
    console.log("\\n✅ All security engine tests completed successfully!");
    console.log("\\n🚀 Security engines are now operational and integrated with the platform.");
  } catch (error) {
    console.error("❌ Error running security engine tests:", error);
  }
}

// Export for potential use in other modules
export { runSecurityEngineTests };

// Run the tests if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  runSecurityEngineTests();
}