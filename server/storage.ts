import { 
  users, 
  threats, 
  files, 
  complianceReports, 
  incidents, 
  auditLogs,
  type User, 
  type InsertUser,
  type Threat,
  type InsertThreat,
  type File,
  type InsertFile,
  type ComplianceReport,
  type Incident,
  type InsertIncident,
  type AuditLog
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
}

export class MemStorage implements IStorage {
  private users: Map<string, User> = new Map();
  private threats: Map<string, Threat> = new Map();
  private files: Map<string, File> = new Map();
  private complianceReports: Map<string, ComplianceReport> = new Map();
  private incidents: Map<string, Incident> = new Map();
  private auditLogs: Map<string, AuditLog> = new Map();

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
      onboardingCompleted: true,
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
}

export const storage = new MemStorage();
