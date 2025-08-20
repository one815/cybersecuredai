import { 
  users, 
  threats, 
  files, 
  complianceReports, 
  incidents, 
  auditLogs,
  threatNotifications,
  type User, 
  type InsertUser,
  type Threat,
  type InsertThreat,
  type File,
  type InsertFile,
  type ComplianceReport,
  type Incident,
  type InsertIncident,
  type AuditLog,
  type ThreatNotification,
  type InsertThreatNotification
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // User operations
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: string, updates: Partial<User>): Promise<User>;
  getUsers(): Promise<User[]>;
  
  // Threat operations
  getThreats(): Promise<Threat[]>;
  createThreat(threat: InsertThreat): Promise<Threat>;
  updateThreat(id: string, updates: Partial<Threat>): Promise<Threat>;
  getThreatStats(): Promise<{ total: number; critical: number; resolved: number }>;
  
  // File operations
  getFiles(userId?: string): Promise<File[]>;
  createFile(file: InsertFile): Promise<File>;
  deleteFile(id: string): Promise<void>;
  
  // Compliance operations
  getComplianceReports(): Promise<ComplianceReport[]>;
  
  // Incident operations
  getIncidents(): Promise<Incident[]>;
  createIncident(incident: InsertIncident): Promise<Incident>;
  updateIncident(id: string, updates: Partial<Incident>): Promise<Incident>;
  
  // Audit operations
  createAuditLog(log: Omit<AuditLog, 'id' | 'timestamp'>): Promise<AuditLog>;
  
  // Threat Notification operations
  getThreatNotifications(userId?: string): Promise<ThreatNotification[]>;
  createThreatNotification(notification: InsertThreatNotification): Promise<ThreatNotification>;
  markNotificationAsRead(id: string): Promise<ThreatNotification>;
  acknowledgeNotification(id: string): Promise<ThreatNotification>;
  deleteNotification(id: string): Promise<void>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User> = new Map();
  private threats: Map<string, Threat> = new Map();
  private files: Map<string, File> = new Map();
  private complianceReports: Map<string, ComplianceReport> = new Map();
  private incidents: Map<string, Incident> = new Map();
  private auditLogs: Map<string, AuditLog> = new Map();
  private threatNotifications: Map<string, ThreatNotification> = new Map();

  constructor() {
    this.initializeData();
  }

  private initializeData() {
    // Initialize with sample admin user
    const adminUser: User = {
      id: "admin-1",
      email: "admin@cybersecure.ai",
      firstName: "Alex",
      lastName: "Morgan",
      role: "admin",
      organization: "CyberSecure AI",
      profileImageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
      isActive: true,
      lastLogin: new Date(),
      mfaEnabled: true,
      mfaMethod: "biometric",
      biometricEnabled: true,
      planType: "enterprise",
      onboardingCompleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.users.set(adminUser.id, adminUser);

    // Initialize compliance reports
    const complianceData: ComplianceReport[] = [
      {
        id: "comp-1",
        framework: "FERPA",
        score: 98,
        status: "compliant",
        lastAssessment: new Date(),
        findings: { studentDataProtected: true, accessControlsValid: true },
        recommendations: "Continue monitoring student data access",
      },
      {
        id: "comp-2",
        framework: "FISMA",
        score: 96,
        status: "compliant",
        lastAssessment: new Date(),
        findings: { federalStandardsMet: true, securityControlsActive: true },
        recommendations: "Review security controls quarterly",
      },
      {
        id: "comp-3",
        framework: "CIPA",
        score: 89,
        status: "in_progress",
        lastAssessment: new Date(),
        findings: { internetFiltering: true, safetyMeasures: false },
        recommendations: "Implement additional internet safety measures",
      },
    ];
    complianceData.forEach(report => this.complianceReports.set(report.id, report));
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.email === email);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { 
      ...insertUser,
      id,
      role: insertUser.role ?? "user",
      firstName: insertUser.firstName ?? null,
      lastName: insertUser.lastName ?? null,
      organization: insertUser.organization ?? null,
      profileImageUrl: insertUser.profileImageUrl ?? null,
      isActive: insertUser.isActive ?? true,
      lastLogin: insertUser.lastLogin ?? null,
      mfaEnabled: insertUser.mfaEnabled ?? false,
      mfaMethod: insertUser.mfaMethod ?? "none",
      biometricEnabled: insertUser.biometricEnabled ?? false,
      planType: insertUser.planType ?? "standard",
      onboardingCompleted: insertUser.onboardingCompleted ?? false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.users.set(id, user);
    return user;
  }

  async updateUser(id: string, updates: Partial<User>): Promise<User> {
    const user = this.users.get(id);
    if (!user) throw new Error("User not found");
    
    const updatedUser = { ...user, ...updates, updatedAt: new Date() };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  async getUsers(): Promise<User[]> {
    return Array.from(this.users.values());
  }

  async getThreats(): Promise<Threat[]> {
    return Array.from(this.threats.values());
  }

  async createThreat(insertThreat: InsertThreat): Promise<Threat> {
    const id = randomUUID();
    const threat: Threat = {
      ...insertThreat,
      id,
      status: insertThreat.status ?? "active",
      source: insertThreat.source ?? null,
      description: insertThreat.description ?? null,
      metadata: insertThreat.metadata ?? null,
      detectedAt: new Date(),
      resolvedAt: null,
    };
    this.threats.set(id, threat);
    return threat;
  }

  async updateThreat(id: string, updates: Partial<Threat>): Promise<Threat> {
    const threat = this.threats.get(id);
    if (!threat) throw new Error("Threat not found");
    
    const updatedThreat = { ...threat, ...updates };
    this.threats.set(id, updatedThreat);
    return updatedThreat;
  }

  async getThreatStats(): Promise<{ total: number; critical: number; resolved: number }> {
    const threats = Array.from(this.threats.values());
    return {
      total: threats.length,
      critical: threats.filter(t => t.severity === "critical").length,
      resolved: threats.filter(t => t.status === "resolved").length,
    };
  }

  async getFiles(userId?: string): Promise<File[]> {
    const files = Array.from(this.files.values());
    return userId ? files.filter(f => f.uploadedBy === userId) : files;
  }

  async createFile(insertFile: InsertFile): Promise<File> {
    const id = randomUUID();
    const file: File = {
      ...insertFile,
      id,
      encryptionStatus: insertFile.encryptionStatus ?? "encrypted",
      accessLevel: insertFile.accessLevel ?? "private",
      checksum: insertFile.checksum ?? null,
      uploadedAt: new Date(),
    };
    this.files.set(id, file);
    return file;
  }

  async deleteFile(id: string): Promise<void> {
    this.files.delete(id);
  }

  async getComplianceReports(): Promise<ComplianceReport[]> {
    return Array.from(this.complianceReports.values());
  }

  async getIncidents(): Promise<Incident[]> {
    return Array.from(this.incidents.values());
  }

  async createIncident(insertIncident: InsertIncident): Promise<Incident> {
    const id = randomUUID();
    const incident: Incident = {
      ...insertIncident,
      id,
      status: insertIncident.status ?? "open",
      description: insertIncident.description ?? null,
      assignedTo: insertIncident.assignedTo ?? null,
      reportedBy: insertIncident.reportedBy ?? null,
      metadata: insertIncident.metadata ?? null,
      reportedAt: new Date(),
      resolvedAt: null,
    };
    this.incidents.set(id, incident);
    return incident;
  }

  async updateIncident(id: string, updates: Partial<Incident>): Promise<Incident> {
    const incident = this.incidents.get(id);
    if (!incident) throw new Error("Incident not found");
    
    const updatedIncident = { ...incident, ...updates };
    this.incidents.set(id, updatedIncident);
    return updatedIncident;
  }

  async createAuditLog(logData: Omit<AuditLog, 'id' | 'timestamp'>): Promise<AuditLog> {
    const id = randomUUID();
    const auditLog: AuditLog = {
      ...logData,
      id,
      timestamp: new Date(),
    };
    this.auditLogs.set(id, auditLog);
    return auditLog;
  }

  // Threat Notification operations
  async getThreatNotifications(userId?: string): Promise<ThreatNotification[]> {
    const notifications = Array.from(this.threatNotifications.values());
    if (userId) {
      return notifications.filter(n => n.userId === userId);
    }
    return notifications;
  }

  async createThreatNotification(insertNotification: InsertThreatNotification): Promise<ThreatNotification> {
    const id = randomUUID();
    const notification: ThreatNotification = {
      ...insertNotification,
      id,
      isRead: insertNotification.isRead ?? false,
      isAcknowledged: insertNotification.isAcknowledged ?? false,
      actionRequired: insertNotification.actionRequired ?? false,
      priority: insertNotification.priority ?? 3,
      metadata: insertNotification.metadata ?? null,
      createdAt: new Date(),
      acknowledgedAt: null,
      expiresAt: insertNotification.expiresAt ?? null,
      userId: insertNotification.userId ?? null,
    };
    this.threatNotifications.set(id, notification);
    
    // Auto-create sample notifications when the first one is created
    if (this.threatNotifications.size === 1) {
      this.createSampleNotifications();
    }
    
    return notification;
  }

  async markNotificationAsRead(id: string): Promise<ThreatNotification> {
    const notification = this.threatNotifications.get(id);
    if (!notification) throw new Error("Notification not found");
    
    const updatedNotification = { ...notification, isRead: true };
    this.threatNotifications.set(id, updatedNotification);
    return updatedNotification;
  }

  async acknowledgeNotification(id: string): Promise<ThreatNotification> {
    const notification = this.threatNotifications.get(id);
    if (!notification) throw new Error("Notification not found");
    
    const updatedNotification = {
      ...notification,
      isAcknowledged: true,
      acknowledgedAt: new Date()
    };
    this.threatNotifications.set(id, updatedNotification);
    return updatedNotification;
  }

  async deleteNotification(id: string): Promise<void> {
    this.threatNotifications.delete(id);
  }

  private createSampleNotifications() {
    const sampleNotifications = [
      {
        id: "notif-1",
        threatId: "threat-1",
        userId: null,
        title: "Critical Ransomware Activity Detected",
        message: "BlackCat ransomware variant detected attempting file encryption on File Server (192.168.2.12). Immediate containment initiated.",
        severity: "critical",
        category: "malware",
        isRead: false,
        isAcknowledged: false,
        actionRequired: true,
        priority: 1,
        metadata: { sourceIp: "192.168.2.12", targetFiles: 2847 },
        createdAt: new Date(Date.now() - 5 * 60 * 1000),
        acknowledgedAt: null,
        expiresAt: null
      },
      {
        id: "notif-2",
        threatId: "threat-2", 
        userId: null,
        title: "Data Exfiltration Attempt Blocked",
        message: "Unusual outbound data transfer of 2.4GB to unknown IP address 45.227.x.x (Russia) has been blocked by AI detection system.",
        severity: "high",
        category: "breach",
        isRead: false,
        isAcknowledged: false,
        actionRequired: true,
        priority: 2,
        metadata: { dataSize: "2.4GB", destinationCountry: "Russia" },
        createdAt: new Date(Date.now() - 14 * 60 * 1000),
        acknowledgedAt: null,
        expiresAt: null
      },
      {
        id: "notif-3",
        threatId: "threat-3",
        userId: null,
        title: "Multiple Failed Authentication Attempts",
        message: "Detected 47 failed login attempts on admin portal from multiple Chinese IP addresses. Account lockout policies activated.",
        severity: "medium",
        category: "anomaly",
        isRead: true,
        isAcknowledged: false,
        actionRequired: false,
        priority: 3,
        metadata: { attempts: 47, sourceCountry: "China" },
        createdAt: new Date(Date.now() - 35 * 60 * 1000),
        acknowledgedAt: null,
        expiresAt: null
      },
      {
        id: "notif-4",
        threatId: "threat-4",
        userId: null,
        title: "Phishing Email Campaign Detected",
        message: "AI-powered email security identified and quarantined 23 phishing emails targeting faculty accounts. All recipients notified.",
        severity: "medium",
        category: "phishing",
        isRead: false,
        isAcknowledged: true,
        actionRequired: false,
        priority: 3,
        metadata: { emailsBlocked: 23, targetGroup: "faculty" },
        createdAt: new Date(Date.now() - 62 * 60 * 1000),
        acknowledgedAt: new Date(Date.now() - 45 * 60 * 1000),
        expiresAt: null
      },
      {
        id: "notif-5",
        threatId: "threat-5",
        userId: null,
        title: "System Update Security Patch Applied",
        message: "Critical security patch KB5034441 successfully applied to all Windows servers. System reboot completed without issues.",
        severity: "low",
        category: "system",
        isRead: true,
        isAcknowledged: true,
        actionRequired: false,
        priority: 4,
        metadata: { patchId: "KB5034441", serversUpdated: 12 },
        createdAt: new Date(Date.now() - 120 * 60 * 1000),
        acknowledgedAt: new Date(Date.now() - 100 * 60 * 1000),
        expiresAt: null
      }
    ];

    sampleNotifications.forEach(notification => {
      this.threatNotifications.set(notification.id, notification as ThreatNotification);
    });
  }
}

export const storage = new MemStorage();
