import { randomBytes, createHash } from "crypto";

export interface ClassificationRule {
  id: string;
  name: string;
  description: string;
  priority: number; // Higher number = higher priority
  conditions: ClassificationCondition[];
  actions: ClassificationAction[];
  enabled: boolean;
  createdDate: Date;
  lastModified: Date;
}

export interface ClassificationCondition {
  field: "content" | "filename" | "extension" | "path" | "size" | "metadata";
  operator: "contains" | "matches" | "equals" | "greater_than" | "less_than" | "regex";
  value: string | number;
  caseSensitive?: boolean;
}

export interface ClassificationAction {
  type: "label" | "encrypt" | "restrict_access" | "move" | "notify" | "quarantine";
  parameters: Record<string, any>;
}

export interface ClassificationResult {
  fileId: string;
  fileName: string;
  originalClassification?: string;
  newClassification: string;
  confidenceLevel: number; // 0-100
  appliedRules: string[];
  detectedPatterns: DetectedPattern[];
  recommendedActions: string[];
  complianceFlags: ComplianceFlag[];
  timestamp: Date;
}

export interface DetectedPattern {
  pattern: string;
  patternType: "pii" | "phi" | "financial" | "academic" | "technical" | "sensitive";
  location: string; // File path or content location
  confidence: number;
  sample?: string; // Redacted sample of detected content
}

export interface ComplianceFlag {
  framework: "ferpa" | "hipaa" | "pci" | "sox" | "gdpr" | "ccpa";
  regulation: string;
  severity: "critical" | "high" | "medium" | "low";
  description: string;
  requiredActions: string[];
}

export interface DataInventoryItem {
  id: string;
  name: string;
  path: string;
  type: "file" | "database" | "api" | "stream";
  classification: string;
  sensitivity: "public" | "internal" | "confidential" | "restricted" | "top_secret";
  dataTypes: string[]; // e.g., ["pii", "financial", "academic"]
  owner: string;
  lastClassified: Date;
  retentionPeriod?: number; // Days
  complianceRequirements: string[];
  accessLevel: "public" | "private" | "restricted";
}

export class DataClassificationEngine {
  private classificationRules: Map<string, ClassificationRule> = new Map();
  private classificationHistory: Map<string, ClassificationResult[]> = new Map();
  private dataInventory: Map<string, DataInventoryItem> = new Map();
  private sensitivePatterns: Map<string, RegExp> = new Map();

  constructor() {
    this.initializeClassificationRules();
    this.initializeSensitivePatterns();
  }

  private initializeClassificationRules() {
    const rules: ClassificationRule[] = [
      {
        id: "rule-pii-detection",
        name: "Personal Identifiable Information Detection",
        description: "Detects SSNs, phone numbers, and other PII patterns",
        priority: 100,
        conditions: [
          { field: "content", operator: "regex", value: "\\d{3}-\\d{2}-\\d{4}" }, // SSN
          { field: "content", operator: "regex", value: "\\d{3}[.-]?\\d{3}[.-]?\\d{4}" }, // Phone
          { field: "content", operator: "regex", value: "\\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Z|a-z]{2,}\\b" } // Email
        ],
        actions: [
          { type: "label", parameters: { classification: "confidential", dataType: "pii" } },
          { type: "encrypt", parameters: { method: "aes-256" } },
          { type: "restrict_access", parameters: { level: "restricted" } }
        ],
        enabled: true,
        createdDate: new Date(),
        lastModified: new Date()
      },
      {
        id: "rule-ferpa-student-data",
        name: "FERPA Student Education Records",
        description: "Identifies student education records subject to FERPA",
        priority: 95,
        conditions: [
          { field: "content", operator: "contains", value: "student", caseSensitive: false },
          { field: "content", operator: "regex", value: "\\b(grade|gpa|transcript|enrollment|discipline)\\b" },
          { field: "filename", operator: "regex", value: ".*student.*|.*grade.*|.*transcript.*" }
        ],
        actions: [
          { type: "label", parameters: { classification: "restricted", dataType: "ferpa_protected" } },
          { type: "encrypt", parameters: { method: "aes-256" } },
          { type: "notify", parameters: { compliance_team: true, framework: "FERPA" } }
        ],
        enabled: true,
        createdDate: new Date(),
        lastModified: new Date()
      },
      {
        id: "rule-financial-data",
        name: "Financial Information Detection", 
        description: "Detects credit cards, bank accounts, and financial data",
        priority: 90,
        conditions: [
          { field: "content", operator: "regex", value: "\\b(?:\\d{4}[- ]?){3}\\d{4}\\b" }, // Credit card
          { field: "content", operator: "regex", value: "\\b\\d{9,12}\\b" }, // Bank account
          { field: "content", operator: "contains", value: "routing number", caseSensitive: false }
        ],
        actions: [
          { type: "label", parameters: { classification: "restricted", dataType: "financial" } },
          { type: "encrypt", parameters: { method: "aes-256" } },
          { type: "quarantine", parameters: { pending_review: true } }
        ],
        enabled: true,
        createdDate: new Date(),
        lastModified: new Date()
      },
      {
        id: "rule-system-credentials",
        name: "System Credentials Detection",
        description: "Identifies API keys, passwords, and system credentials",
        priority: 85,
        conditions: [
          { field: "content", operator: "regex", value: "(?i)(api[_-]?key|password|secret|token|credential)" },
          { field: "content", operator: "regex", value: "['\"][A-Za-z0-9]{32,}['\"]" }, // Long strings in quotes
          { field: "filename", operator: "contains", value: ".env", caseSensitive: false }
        ],
        actions: [
          { type: "label", parameters: { classification: "top_secret", dataType: "credentials" } },
          { type: "restrict_access", parameters: { level: "admin_only" } },
          { type: "notify", parameters: { security_team: true, urgent: true } }
        ],
        enabled: true,
        createdDate: new Date(),
        lastModified: new Date()
      },
      {
        id: "rule-public-content",
        name: "Public Content Classification",
        description: "Classifies content intended for public consumption",
        priority: 10,
        conditions: [
          { field: "path", operator: "contains", value: "/public/", caseSensitive: false },
          { field: "path", operator: "contains", value: "/www/", caseSensitive: false },
          { field: "filename", operator: "matches", value: "readme*", caseSensitive: false }
        ],
        actions: [
          { type: "label", parameters: { classification: "public", dataType: "marketing" } }
        ],
        enabled: true,
        createdDate: new Date(),
        lastModified: new Date()
      }
    ];

    rules.forEach(rule => {
      this.classificationRules.set(rule.id, rule);
    });
  }

  private initializeSensitivePatterns() {
    const patterns = new Map([
      // PII Patterns
      ["ssn", /\b\d{3}-\d{2}-\d{4}\b/g],
      ["phone", /\b\d{3}[.-]?\d{3}[.-]?\d{4}\b/g],
      ["email", /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g],
      ["drivers_license", /\b[A-Z]\d{7,8}\b/g],
      
      // Financial Patterns
      ["credit_card", /\b(?:\d{4}[- ]?){3}\d{4}\b/g],
      ["bank_account", /\b\d{9,12}\b/g],
      ["routing_number", /\b\d{9}\b/g],
      
      // Academic Patterns
      ["student_id", /\b(student|id)[:\s-]*\d{6,10}\b/gi],
      ["grade_pattern", /\b(grade|gpa)[:\s-]*[A-F][\+\-]?|\d\.\d{1,2}\b/gi],
      
      // System Security Patterns
      ["api_key", /\b[Aa][Pp][Ii][_-]?[Kk][Ee][Yy][:\s-]*[A-Za-z0-9]{20,}\b/g],
      ["password_hash", /\$2[aby]?\$\d{1,2}\$[A-Za-z0-9\./]{53}/g],
      ["jwt_token", /eyJ[A-Za-z0-9_-]+\.eyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+/g],
      
      // Medical (PHI) Patterns  
      ["mrn", /\b(mrn|medical record)[:\s-]*\d{6,10}\b/gi],
      ["dob", /\b\d{1,2}[\/\-]\d{1,2}[\/\-]\d{4}\b/g]
    ]);

    patterns.forEach((regex, key) => {
      this.sensitivePatterns.set(key, regex);
    });
  }

  async classifyContent(fileId: string, fileName: string, content: string, metadata: Record<string, any> = {}): Promise<ClassificationResult> {
    const detectedPatterns: DetectedPattern[] = [];
    const appliedRules: string[] = [];
    const complianceFlags: ComplianceFlag[] = [];
    let highestClassification = "public";
    let confidenceLevel = 0;

    // Pattern detection phase
    for (const [patternName, regex] of Array.from(this.sensitivePatterns.entries())) {
      const matches = content.match(regex);
      if (matches && matches.length > 0) {
        detectedPatterns.push({
          pattern: patternName,
          patternType: this.getPatternType(patternName),
          location: fileName,
          confidence: this.calculatePatternConfidence(patternName, matches.length),
          sample: this.generateRedactedSample(matches[0])
        });
      }
    }

    // Rule evaluation phase
    const sortedRules = Array.from(this.classificationRules.values())
      .sort((a, b) => b.priority - a.priority);

    for (const rule of sortedRules) {
      if (!rule.enabled) continue;

      const ruleMatches = this.evaluateRule(rule, fileName, content, metadata);
      if (ruleMatches) {
        appliedRules.push(rule.id);
        confidenceLevel = Math.max(confidenceLevel, this.calculateRuleConfidence(rule, 1));
        
        // Apply rule actions
        for (const action of rule.actions) {
          if (action.type === "label") {
            const classification = action.parameters.classification;
            if (this.getClassificationLevel(classification) > this.getClassificationLevel(highestClassification)) {
              highestClassification = classification;
            }
          }
        }
      }
    }

    // Compliance analysis
    complianceFlags.push(...this.analyzeComplianceRequirements(detectedPatterns, highestClassification));

    // Generate recommendations
    const recommendations = this.generateRecommendations(highestClassification, detectedPatterns, complianceFlags);

    const result: ClassificationResult = {
      fileId,
      fileName,
      newClassification: highestClassification,
      confidenceLevel: Math.min(100, confidenceLevel),
      appliedRules,
      detectedPatterns,
      recommendedActions: recommendations,
      complianceFlags,
      timestamp: new Date()
    };

    // Store in history
    if (!this.classificationHistory.has(fileId)) {
      this.classificationHistory.set(fileId, []);
    }
    this.classificationHistory.get(fileId)!.push(result);

    // Update data inventory
    await this.updateDataInventory(result);

    return result;
  }

  private evaluateRule(rule: ClassificationRule, fileName: string, content: string, metadata: Record<string, any>): boolean {
    let matchCount = 0;

    for (const condition of rule.conditions) {
      let fieldValue: string | number;
      
      switch (condition.field) {
        case "content":
          fieldValue = content;
          break;
        case "filename":
          fieldValue = fileName;
          break;
        case "extension":
          fieldValue = fileName.split('.').pop() || "";
          break;
        case "path":
          fieldValue = metadata.path || "";
          break;
        case "size":
          fieldValue = metadata.size || 0;
          break;
        default:
          continue;
      }

      if (this.evaluateCondition(condition, fieldValue)) {
        matchCount++;
      }
    }

    // Rule matches if ANY condition is met (OR logic)
    return matchCount > 0;
  }

  private evaluateCondition(condition: ClassificationCondition, fieldValue: string | number): boolean {
    const { operator, value, caseSensitive = false } = condition;

    if (typeof fieldValue === "string") {
      const testValue = caseSensitive ? fieldValue : fieldValue.toLowerCase();
      const compareValue = caseSensitive ? String(value) : String(value).toLowerCase();

      switch (operator) {
        case "contains":
          return testValue.includes(compareValue);
        case "equals":
          return testValue === compareValue;
        case "matches":
          return testValue.startsWith(compareValue) || testValue.endsWith(compareValue);
        case "regex":
          try {
            const flags = caseSensitive ? "g" : "gi";
            const regex = new RegExp(String(value), flags);
            return regex.test(testValue);
          } catch {
            return false;
          }
        default:
          return false;
      }
    } else if (typeof fieldValue === "number" && typeof value === "number") {
      switch (operator) {
        case "equals":
          return fieldValue === value;
        case "greater_than":
          return fieldValue > value;
        case "less_than":
          return fieldValue < value;
        default:
          return false;
      }
    }

    return false;
  }

  private getPatternType(patternName: string): "pii" | "phi" | "financial" | "academic" | "technical" | "sensitive" {
    if (["ssn", "phone", "email", "drivers_license"].includes(patternName)) return "pii";
    if (["credit_card", "bank_account", "routing_number"].includes(patternName)) return "financial";
    if (["student_id", "grade_pattern"].includes(patternName)) return "academic";
    if (["api_key", "password_hash", "jwt_token"].includes(patternName)) return "technical";
    if (["mrn", "dob"].includes(patternName)) return "phi";
    return "sensitive";
  }

  private calculatePatternConfidence(patternName: string, matchCount: number): number {
    const baseConfidence = {
      "ssn": 95,
      "credit_card": 90,
      "api_key": 85,
      "email": 70,
      "phone": 75,
      "student_id": 80,
      "grade_pattern": 60
    }[patternName] || 50;

    // Increase confidence with more matches, but cap it
    return Math.min(100, baseConfidence + Math.min(matchCount * 5, 20));
  }

  private calculateRuleConfidence(rule: ClassificationRule, matchCount: number): number {
    const basePriority = rule.priority;
    const matchBonus = Math.min(matchCount * 10, 30);
    return Math.min(100, basePriority + matchBonus);
  }

  private getClassificationLevel(classification: string): number {
    const levels = {
      "public": 1,
      "internal": 2, 
      "confidential": 3,
      "restricted": 4,
      "top_secret": 5
    };
    return levels[classification as keyof typeof levels] || 1;
  }

  private generateRedactedSample(text: string): string {
    if (text.length <= 10) {
      return "*".repeat(text.length);
    }
    
    const visibleChars = Math.min(3, Math.floor(text.length * 0.3));
    const start = text.substring(0, visibleChars);
    const end = text.substring(text.length - visibleChars);
    const middle = "*".repeat(text.length - (visibleChars * 2));
    
    return start + middle + end;
  }

  private analyzeComplianceRequirements(patterns: DetectedPattern[], classification: string): ComplianceFlag[] {
    const flags: ComplianceFlag[] = [];

    // FERPA compliance
    const hasStudentData = patterns.some(p => p.patternType === "academic" || p.pattern.includes("student"));
    if (hasStudentData) {
      flags.push({
        framework: "ferpa",
        regulation: "20 USC § 1232g",
        severity: "high",
        description: "Student education records detected - FERPA compliance required",
        requiredActions: [
          "Implement access controls",
          "Maintain audit logs", 
          "Establish parent notification procedures",
          "Ensure secure transmission and storage"
        ]
      });
    }

    // PCI compliance
    const hasFinancialData = patterns.some(p => p.patternType === "financial");
    if (hasFinancialData) {
      flags.push({
        framework: "pci",
        regulation: "PCI DSS",
        severity: "critical",
        description: "Payment card information detected - PCI DSS compliance required",
        requiredActions: [
          "Encrypt cardholder data",
          "Implement strong access control measures",
          "Maintain secure networks",
          "Regular security testing"
        ]
      });
    }

    // GDPR compliance
    const hasPII = patterns.some(p => p.patternType === "pii");
    if (hasPII && classification !== "public") {
      flags.push({
        framework: "gdpr",
        regulation: "EU GDPR Article 32",
        severity: "high",
        description: "Personal data detected - GDPR security requirements apply",
        requiredActions: [
          "Implement data protection by design",
          "Maintain processing records",
          "Establish lawful basis for processing",
          "Enable data subject rights"
        ]
      });
    }

    return flags;
  }

  private generateRecommendations(classification: string, patterns: DetectedPattern[], flags: ComplianceFlag[]): string[] {
    const recommendations: string[] = [];

    // Classification-based recommendations
    switch (classification) {
      case "top_secret":
        recommendations.push("Restrict access to authorized personnel only");
        recommendations.push("Implement multi-factor authentication");
        recommendations.push("Enable audit logging for all access");
        break;
      case "restricted":
        recommendations.push("Apply encryption at rest and in transit");
        recommendations.push("Implement role-based access controls");
        break;
      case "confidential":
        recommendations.push("Limit access based on business need");
        recommendations.push("Apply data loss prevention controls");
        break;
    }

    // Pattern-based recommendations
    const patternTypes = new Set(patterns.map(p => p.patternType));
    
    if (patternTypes.has("pii")) {
      recommendations.push("Consider data anonymization or pseudonymization");
    }
    
    if (patternTypes.has("financial")) {
      recommendations.push("Implement payment card industry security standards");
    }
    
    if (patternTypes.has("academic")) {
      recommendations.push("Ensure FERPA compliance procedures are followed");
    }

    // Compliance-based recommendations
    if (flags.length > 0) {
      recommendations.push("Review and implement compliance framework requirements");
      recommendations.push("Document data processing activities");
    }

    return recommendations;
  }

  private async updateDataInventory(result: ClassificationResult): Promise<void> {
    const inventoryItem: DataInventoryItem = {
      id: result.fileId,
      name: result.fileName,
      path: result.fileName, // In real implementation, would use full path
      type: "file",
      classification: result.newClassification,
      sensitivity: this.mapClassificationToSensitivity(result.newClassification),
      dataTypes: result.detectedPatterns.map(p => p.patternType),
      owner: "system", // In real implementation, would determine actual owner
      lastClassified: result.timestamp,
      complianceRequirements: result.complianceFlags.map(f => f.framework.toUpperCase()),
      accessLevel: this.mapClassificationToAccessLevel(result.newClassification)
    };

    this.dataInventory.set(result.fileId, inventoryItem);
  }

  private mapClassificationToSensitivity(classification: string): "public" | "internal" | "confidential" | "restricted" | "top_secret" {
    return classification as any;
  }

  private mapClassificationToAccessLevel(classification: string): "public" | "private" | "restricted" {
    if (classification === "public") return "public";
    if (classification === "top_secret" || classification === "restricted") return "restricted";
    return "private";
  }

  // Public methods for accessing classification data
  getClassificationRules(): ClassificationRule[] {
    return Array.from(this.classificationRules.values());
  }

  getClassificationHistory(fileId: string): ClassificationResult[] {
    return this.classificationHistory.get(fileId) || [];
  }

  getDataInventory(): DataInventoryItem[] {
    return Array.from(this.dataInventory.values());
  }

  async getInventoryByClassification(classification: string): Promise<DataInventoryItem[]> {
    return Array.from(this.dataInventory.values())
      .filter(item => item.classification === classification);
  }

  async getComplianceSummary(): Promise<{
    totalFiles: number;
    classificationDistribution: Record<string, number>;
    complianceFrameworkCounts: Record<string, number>;
    sensitiveDataTypes: Record<string, number>;
  }> {
    const inventory = this.getDataInventory();
    
    const classificationDistribution: Record<string, number> = {};
    const complianceFrameworkCounts: Record<string, number> = {};
    const sensitiveDataTypes: Record<string, number> = {};

    inventory.forEach(item => {
      // Classification distribution
      classificationDistribution[item.classification] = (classificationDistribution[item.classification] || 0) + 1;
      
      // Compliance frameworks
      item.complianceRequirements.forEach(framework => {
        complianceFrameworkCounts[framework] = (complianceFrameworkCounts[framework] || 0) + 1;
      });
      
      // Data types
      item.dataTypes.forEach(dataType => {
        sensitiveDataTypes[dataType] = (sensitiveDataTypes[dataType] || 0) + 1;
      });
    });

    return {
      totalFiles: inventory.length,
      classificationDistribution,
      complianceFrameworkCounts,
      sensitiveDataTypes
    };
  }
}

export const dataClassificationEngine = new DataClassificationEngine();