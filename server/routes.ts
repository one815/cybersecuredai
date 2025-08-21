import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, insertThreatSchema, insertFileSchema, insertIncidentSchema, insertThreatNotificationSchema } from "@shared/schema";
import { zeroTrustEngine, type VerificationContext } from "./engines/zero-trust";
import { threatDetectionEngine, type NetworkEvent } from "./engines/threat-detection";

export async function registerRoutes(app: Express): Promise<Server> {
  // User routes
  app.get("/api/users", async (req, res) => {
    try {
      const users = await storage.getUsers();
      res.json(users);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ message: "Failed to fetch users" });
    }
  });

  app.get("/api/users/:id", async (req, res) => {
    try {
      const user = await storage.getUser(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  app.post("/api/users", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      const user = await storage.createUser(userData);
      res.status(201).json(user);
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(400).json({ message: "Invalid user data" });
    }
  });

  app.patch("/api/users/:id", async (req, res) => {
    try {
      const user = await storage.updateUser(req.params.id, req.body);
      res.json(user);
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ message: "Failed to update user" });
    }
  });

  // Dashboard stats
  app.get("/api/dashboard/stats", async (req, res) => {
    try {
      const threats = await storage.getThreats();
      const threatStats = await storage.getThreatStats();
      const users = await storage.getUsers();
      const incidents = await storage.getIncidents();
      const complianceReports = await storage.getComplianceReports();

      const stats = {
        threatLevel: threats.filter(t => t.status === "active").length > 10 ? "HIGH" : 
                    threats.filter(t => t.status === "active").length > 5 ? "MEDIUM" : "LOW",
        activeIncidents: incidents.filter(i => i.status === "open").length,
        protectedAssets: 1247,
        complianceScore: Math.round(
          complianceReports.reduce((sum, report) => sum + report.score, 0) / complianceReports.length
        ),
        recentThreats: threats.slice(0, 5),
        networkStats: {
          bandwidth: "2.1 GB/s",
          connections: 847,
          blocked: 12,
        },
      };

      res.json(stats);
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
      res.status(500).json({ message: "Failed to fetch dashboard stats" });
    }
  });

  // Threat routes
  app.get("/api/threats", async (req, res) => {
    try {
      const threats = await storage.getThreats();
      res.json(threats);
    } catch (error) {
      console.error("Error fetching threats:", error);
      res.status(500).json({ message: "Failed to fetch threats" });
    }
  });

  app.post("/api/threats", async (req, res) => {
    try {
      const threatData = insertThreatSchema.parse(req.body);
      const threat = await storage.createThreat(threatData);
      res.status(201).json(threat);
    } catch (error) {
      console.error("Error creating threat:", error);
      res.status(400).json({ message: "Invalid threat data" });
    }
  });

  // File routes
  app.get("/api/files", async (req, res) => {
    try {
      const userId = req.query.userId as string;
      const files = await storage.getFiles(userId);
      res.json(files);
    } catch (error) {
      console.error("Error fetching files:", error);
      res.status(500).json({ message: "Failed to fetch files" });
    }
  });

  app.post("/api/files", async (req, res) => {
    try {
      const fileData = insertFileSchema.parse(req.body);
      const file = await storage.createFile(fileData);
      res.status(201).json(file);
    } catch (error) {
      console.error("Error creating file:", error);
      res.status(400).json({ message: "Invalid file data" });
    }
  });

  app.delete("/api/files/:id", async (req, res) => {
    try {
      await storage.deleteFile(req.params.id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting file:", error);
      res.status(500).json({ message: "Failed to delete file" });
    }
  });

  // Compliance routes
  app.get("/api/compliance", async (req, res) => {
    try {
      const reports = await storage.getComplianceReports();
      res.json(reports);
    } catch (error) {
      console.error("Error fetching compliance reports:", error);
      res.status(500).json({ message: "Failed to fetch compliance reports" });
    }
  });

  // Incident routes
  app.get("/api/incidents", async (req, res) => {
    try {
      const incidents = await storage.getIncidents();
      res.json(incidents);
    } catch (error) {
      console.error("Error fetching incidents:", error);
      res.status(500).json({ message: "Failed to fetch incidents" });
    }
  });

  app.post("/api/incidents", async (req, res) => {
    try {
      const incidentData = insertIncidentSchema.parse(req.body);
      const incident = await storage.createIncident(incidentData);
      res.status(201).json(incident);
    } catch (error) {
      console.error("Error creating incident:", error);
      res.status(400).json({ message: "Invalid incident data" });
    }
  });

  // Threat Notification routes
  app.get("/api/threat-notifications", async (req, res) => {
    try {
      const { userId } = req.query;
      const notifications = await storage.getThreatNotifications(userId as string);
      res.json(notifications);
    } catch (error) {
      console.error("Error fetching threat notifications:", error);
      res.status(500).json({ message: "Failed to fetch notifications" });
    }
  });

  app.post("/api/threat-notifications", async (req, res) => {
    try {
      const notificationData = insertThreatNotificationSchema.parse(req.body);
      const notification = await storage.createThreatNotification(notificationData);
      res.status(201).json(notification);
    } catch (error) {
      console.error("Error creating threat notification:", error);
      res.status(400).json({ message: "Invalid notification data" });
    }
  });

  app.put("/api/threat-notifications/:id/read", async (req, res) => {
    try {
      const notification = await storage.markNotificationAsRead(req.params.id);
      res.json(notification);
    } catch (error) {
      console.error("Error marking notification as read:", error);
      res.status(500).json({ message: "Failed to update notification" });
    }
  });

  app.put("/api/threat-notifications/:id/acknowledge", async (req, res) => {
    try {
      const notification = await storage.acknowledgeNotification(req.params.id);
      res.json(notification);
    } catch (error) {
      console.error("Error acknowledging notification:", error);
      res.status(500).json({ message: "Failed to acknowledge notification" });
    }
  });

  app.delete("/api/threat-notifications/:id", async (req, res) => {
    try {
      await storage.deleteNotification(req.params.id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting notification:", error);
      res.status(500).json({ message: "Failed to delete notification" });
    }
  });

  // Zero-Trust Security Engine Routes
  app.post("/api/zero-trust/verify", async (req, res) => {
    try {
      const context: VerificationContext = {
        userId: req.body.userId,
        ipAddress: req.ip || req.connection.remoteAddress || "127.0.0.1",
        userAgent: req.headers["user-agent"] || "unknown",
        location: req.body.location,
        device: req.body.device || {
          id: "unknown",
          type: "desktop",
          os: "unknown", 
          browser: "unknown",
          fingerprint: zeroTrustEngine.generateFingerprint(req.headers["user-agent"] || "unknown")
        },
        requestedResource: req.body.resource || req.path,
        requestType: req.body.requestType || "read",
        timestamp: new Date()
      };

      const user = await storage.getUser(context.userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const result = await zeroTrustEngine.verifyAccess(context, user);
      
      // Create audit log for verification attempt
      await storage.createAuditLog({
        userId: context.userId,
        action: result.granted ? "access_granted" : "access_denied",
        resource: context.requestedResource,
        details: `Zero-trust verification: ${result.riskLevel} risk, ${result.verificationMethod} method`,
        ipAddress: context.ipAddress,
        userAgent: context.userAgent
      });

      res.json(result);
    } catch (error) {
      console.error("Error in zero-trust verification:", error);
      res.status(500).json({ message: "Verification failed" });
    }
  });

  app.get("/api/zero-trust/devices/:userId", async (req, res) => {
    try {
      const devices = await zeroTrustEngine.getTrustedDevices(req.params.userId);
      res.json(devices);
    } catch (error) {
      console.error("Error fetching trusted devices:", error);
      res.status(500).json({ message: "Failed to fetch devices" });
    }
  });

  app.post("/api/zero-trust/devices", async (req, res) => {
    try {
      const device = await zeroTrustEngine.registerTrustedDevice(req.body.userId, req.body);
      res.status(201).json(device);
    } catch (error) {
      console.error("Error registering device:", error);
      res.status(500).json({ message: "Failed to register device" });
    }
  });

  app.delete("/api/zero-trust/devices/:deviceId", async (req, res) => {
    try {
      const success = await zeroTrustEngine.revokeTrustedDevice(req.params.deviceId);
      if (success) {
        res.status(204).send();
      } else {
        res.status(404).json({ message: "Device not found" });
      }
    } catch (error) {
      console.error("Error revoking device:", error);
      res.status(500).json({ message: "Failed to revoke device" });
    }
  });

  // Threat Detection Engine Routes
  app.post("/api/threats/analyze", async (req, res) => {
    try {
      const events: NetworkEvent[] = req.body.events || [];
      const detectionResults = await threatDetectionEngine.analyzeNetworkTraffic(events);
      
      // Create threat records for detected threats
      for (const result of detectionResults) {
        if (result.requiresImmediateAction) {
          const threat = await storage.createThreat({
            type: result.pattern.type,
            severity: result.severity,
            description: result.pattern.description,
            source: result.metadata.sourceIP || "unknown",
            metadata: result.metadata
          });

          // Create threat notification for critical threats
          if (result.severity === "critical" || result.severity === "high") {
            await storage.createThreatNotification({
              threatId: threat.id,
              userId: "admin-1", // In real app, notify relevant users
              category: result.pattern.type,
              title: `${result.pattern.name} Detected`,
              message: result.pattern.description,
              severity: result.severity,
              metadata: { confidence: result.confidence }
            });
          }
        }
      }

      res.json({
        threatsDetected: detectionResults.length,
        criticalThreats: detectionResults.filter(r => r.severity === "critical").length,
        results: detectionResults
      });
    } catch (error) {
      console.error("Error analyzing threats:", error);
      res.status(500).json({ message: "Threat analysis failed" });
    }
  });

  app.get("/api/threats/patterns", async (req, res) => {
    try {
      const patterns = threatDetectionEngine.getThreatPatterns();
      res.json(patterns);
    } catch (error) {
      console.error("Error fetching threat patterns:", error);
      res.status(500).json({ message: "Failed to fetch patterns" });
    }
  });

  app.get("/api/threats/stats", async (req, res) => {
    try {
      const stats = {
        recentEventsCount: threatDetectionEngine.getRecentThreatsCount(),
        suspiciousIPsCount: threatDetectionEngine.getSuspiciousIPsCount(),
        activeSessionsCount: zeroTrustEngine.getActiveSessionsCount(),
        trustedDevicesCount: zeroTrustEngine.getTrustedDevicesCount()
      };
      res.json(stats);
    } catch (error) {
      console.error("Error fetching threat stats:", error);
      res.status(500).json({ message: "Failed to fetch stats" });
    }
  });

  app.post("/api/threats/intelligence", async (req, res) => {
    try {
      const { suspiciousIPs } = req.body;
      await threatDetectionEngine.updateThreatIntelligence(suspiciousIPs || []);
      res.json({ message: "Threat intelligence updated" });
    } catch (error) {
      console.error("Error updating threat intelligence:", error);
      res.status(500).json({ message: "Failed to update intelligence" });
    }
  });

  // Compliance Automation Engine Routes
  app.get("/api/compliance/frameworks", async (req, res) => {
    try {
      const { complianceAutomationEngine } = await import("./engines/compliance-automation");
      const frameworks = complianceAutomationEngine.getFrameworks();
      res.json(frameworks);
    } catch (error) {
      console.error("Error fetching compliance frameworks:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/compliance/framework/:frameworkId", async (req, res) => {
    try {
      const { complianceAutomationEngine } = await import("./engines/compliance-automation");
      const framework = complianceAutomationEngine.getFramework(req.params.frameworkId);
      if (!framework) {
        return res.status(404).json({ error: "Framework not found" });
      }
      res.json(framework);
    } catch (error) {
      console.error("Error fetching compliance framework:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/compliance/assessment/:frameworkId", async (req, res) => {
    try {
      const { complianceAutomationEngine } = await import("./engines/compliance-automation");
      const { frameworkId } = req.params;
      const organizationId = req.body.organizationId || "default-org";
      
      console.log(`Starting automated compliance assessment for ${frameworkId}...`);
      const assessment = await complianceAutomationEngine.performAutomatedAssessment(frameworkId, organizationId);
      
      res.json(assessment);
    } catch (error) {
      console.error("Error performing compliance assessment:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/compliance/assessments", async (req, res) => {
    try {
      const { complianceAutomationEngine } = await import("./engines/compliance-automation");
      const assessments = complianceAutomationEngine.getAssessments();
      res.json(assessments);
    } catch (error) {
      console.error("Error fetching compliance assessments:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/compliance/gap-analysis/:frameworkId", async (req, res) => {
    try {
      const { complianceAutomationEngine } = await import("./engines/compliance-automation");
      const gapAnalysis = await complianceAutomationEngine.getComplianceGapAnalysis(req.params.frameworkId);
      res.json(gapAnalysis);
    } catch (error) {
      console.error("Error fetching compliance gap analysis:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Data Classification Engine Routes
  app.post("/api/data-classification/classify", async (req, res) => {
    try {
      const { dataClassificationEngine } = await import("./engines/data-classification");
      const { fileId, fileName, content, metadata = {} } = req.body;
      
      if (!fileId || !fileName || !content) {
        return res.status(400).json({ error: "Missing required fields: fileId, fileName, content" });
      }
      
      console.log(`Classifying content for file: ${fileName}`);
      const result = await dataClassificationEngine.classifyContent(fileId, fileName, content, metadata);
      
      res.json(result);
    } catch (error) {
      console.error("Error classifying content:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/data-classification/rules", async (req, res) => {
    try {
      const { dataClassificationEngine } = await import("./engines/data-classification");
      const rules = dataClassificationEngine.getClassificationRules();
      res.json(rules);
    } catch (error) {
      console.error("Error fetching classification rules:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/data-classification/inventory", async (req, res) => {
    try {
      const { dataClassificationEngine } = await import("./engines/data-classification");
      const inventory = dataClassificationEngine.getDataInventory();
      res.json(inventory);
    } catch (error) {
      console.error("Error fetching data inventory:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/data-classification/inventory/:classification", async (req, res) => {
    try {
      const { dataClassificationEngine } = await import("./engines/data-classification");
      const inventory = await dataClassificationEngine.getInventoryByClassification(req.params.classification);
      res.json(inventory);
    } catch (error) {
      console.error("Error fetching classified inventory:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/data-classification/summary", async (req, res) => {
    try {
      const { dataClassificationEngine } = await import("./engines/data-classification");
      const summary = await dataClassificationEngine.getComplianceSummary();
      res.json(summary);
    } catch (error) {
      console.error("Error fetching classification summary:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/data-classification/history/:fileId", async (req, res) => {
    try {
      const { dataClassificationEngine } = await import("./engines/data-classification");
      const history = dataClassificationEngine.getClassificationHistory(req.params.fileId);
      res.json(history);
    } catch (error) {
      console.error("Error fetching classification history:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Mock authentication endpoint for demo
  app.get("/api/auth/user", async (req, res) => {
    try {
      // Return the admin user for demo purposes
      const user = await storage.getUser("admin-1");
      res.json(user);
    } catch (error) {
      console.error("Error fetching current user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
