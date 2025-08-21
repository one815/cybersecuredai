import { randomBytes } from "crypto";

export interface ComplianceFramework {
  id: string;
  name: string;
  fullName: string;
  sector: "education" | "government" | "federal" | "healthcare";
  version: string;
  controls: ComplianceControl[];
  lastUpdated: Date;
}

export interface ComplianceControl {
  id: string;
  frameworkId: string;
  controlId: string; // e.g., "AC-2", "FERPA-1.1"
  title: string;
  description: string;
  category: "access_control" | "audit" | "data_protection" | "network_security" | "incident_response" | "risk_management";
  priority: "critical" | "high" | "medium" | "low";
  implementation: "manual" | "automated" | "hybrid";
  requiredEvidence: string[];
  testMethods: string[];
  mappings: ControlMapping[];
}

export interface ControlMapping {
  frameworkId: string;
  controlId: string;
  relationship: "equivalent" | "subset" | "superset" | "related";
}

export interface ComplianceAssessment {
  id: string;
  frameworkId: string;
  organizationId: string;
  assessmentType: "self" | "third_party" | "automated" | "hybrid";
  scope: string[];
  startDate: Date;
  completionDate?: Date;
  status: "planning" | "in_progress" | "review" | "complete" | "remediation";
  overallScore: number; // 0-100
  controlResults: ControlAssessmentResult[];
  findings: ComplianceFinding[];
  recommendations: string[];
  nextAssessment?: Date;
}

export interface ControlAssessmentResult {
  controlId: string;
  status: "compliant" | "non_compliant" | "not_applicable" | "compensating" | "not_tested";
  score: number; // 0-100
  evidence: string[];
  gaps: string[];
  implementationStatus: "not_started" | "planned" | "in_progress" | "implemented" | "maintained";
  lastTested: Date;
  testMethod: string;
  assessorNotes: string;
}

export interface ComplianceFinding {
  id: string;
  controlId: string;
  severity: "critical" | "high" | "medium" | "low";
  findingType: "gap" | "weakness" | "observation" | "best_practice";
  title: string;
  description: string;
  impact: string;
  recommendation: string;
  remediationTimeframe: "immediate" | "30_days" | "90_days" | "annual";
  assignedTo?: string;
  status: "open" | "in_progress" | "resolved" | "accepted_risk";
  discoveredDate: Date;
  targetDate?: Date;
  resolvedDate?: Date;
}

export interface SystemConfiguration {
  id: string;
  name: string;
  type: "network" | "server" | "application" | "database" | "endpoint" | "cloud";
  version: string;
  configuration: Record<string, any>;
  lastScanned: Date;
  complianceSettings: Record<string, any>;
}

export class ComplianceAutomationEngine {
  private frameworks: Map<string, ComplianceFramework> = new Map();
  private assessments: Map<string, ComplianceAssessment> = new Map();
  private systemConfigs: Map<string, SystemConfiguration> = new Map();
  private controlMappings: Map<string, ControlMapping[]> = new Map();

  constructor() {
    this.initializeFrameworks();
    this.initializeSystemConfigs();
  }

  private initializeFrameworks() {
    // FERPA Framework
    const ferpaControls: ComplianceControl[] = [
      {
        id: "ferpa-1.1",
        frameworkId: "ferpa",
        controlId: "FERPA-1.1",
        title: "Directory Information Policy",
        description: "Educational agencies must have policies regarding directory information disclosure",
        category: "data_protection",
        priority: "high",
        implementation: "manual",
        requiredEvidence: ["written policy", "parent notifications", "opt-out procedures"],
        testMethods: ["policy review", "documentation audit"],
        mappings: []
      },
      {
        id: "ferpa-2.1",
        frameworkId: "ferpa", 
        controlId: "FERPA-2.1",
        title: "Education Records Access Controls",
        description: "Implement access controls for educational records limiting access to authorized personnel",
        category: "access_control",
        priority: "critical",
        implementation: "automated",
        requiredEvidence: ["access logs", "user permissions", "authentication mechanisms"],
        testMethods: ["access testing", "log analysis", "permission audit"],
        mappings: [{ frameworkId: "fisma", controlId: "AC-2", relationship: "equivalent" }]
      },
      {
        id: "ferpa-3.1",
        frameworkId: "ferpa",
        controlId: "FERPA-3.1", 
        title: "Student Data Encryption",
        description: "Encrypt student education records in transit and at rest",
        category: "data_protection",
        priority: "critical",
        implementation: "automated",
        requiredEvidence: ["encryption certificates", "configuration settings", "key management"],
        testMethods: ["encryption testing", "vulnerability scanning"],
        mappings: [{ frameworkId: "fisma", controlId: "SC-13", relationship: "equivalent" }]
      }
    ];

    // FISMA Framework
    const fismaControls: ComplianceControl[] = [
      {
        id: "fisma-ac-2",
        frameworkId: "fisma",
        controlId: "AC-2",
        title: "Account Management",
        description: "Manage information system accounts including establishment, activation, modification, review, and removal",
        category: "access_control",
        priority: "critical",
        implementation: "hybrid",
        requiredEvidence: ["account procedures", "access reviews", "account lifecycle logs"],
        testMethods: ["account audit", "access review", "process testing"],
        mappings: [{ frameworkId: "ferpa", controlId: "FERPA-2.1", relationship: "equivalent" }]
      },
      {
        id: "fisma-au-2",
        frameworkId: "fisma",
        controlId: "AU-2",
        title: "Auditable Events",
        description: "Determine auditable events and ensure comprehensive logging coverage",
        category: "audit",
        priority: "high",
        implementation: "automated",
        requiredEvidence: ["audit policy", "logging configuration", "event coverage matrix"],
        testMethods: ["log review", "configuration testing", "coverage analysis"],
        mappings: []
      },
      {
        id: "fisma-sc-13",
        frameworkId: "fisma",
        controlId: "SC-13",
        title: "Cryptographic Protection",
        description: "Implement FIPS-validated cryptography to protect information in accordance with applicable laws and policies",
        category: "data_protection", 
        priority: "critical",
        implementation: "automated",
        requiredEvidence: ["FIPS certificates", "encryption implementation", "key management procedures"],
        testMethods: ["cryptographic testing", "certificate validation", "key audit"],
        mappings: [{ frameworkId: "ferpa", controlId: "FERPA-3.1", relationship: "equivalent" }]
      }
    ];

    // CIPA Framework
    const cipaControls: ComplianceControl[] = [
      {
        id: "cipa-1.1",
        frameworkId: "cipa",
        controlId: "CIPA-1.1",
        title: "Internet Safety Policy",
        description: "Establish and enforce internet safety policies to protect minors from inappropriate content",
        category: "network_security",
        priority: "critical",
        implementation: "hybrid",
        requiredEvidence: ["internet safety policy", "filtering configuration", "monitoring logs"],
        testMethods: ["policy review", "filtering testing", "monitoring verification"],
        mappings: []
      },
      {
        id: "cipa-2.1",
        frameworkId: "cipa",
        controlId: "CIPA-2.1",
        title: "Content Filtering Technology",
        description: "Deploy technology protection measures to filter or block internet access to inappropriate content",
        category: "network_security",
        priority: "critical",
        implementation: "automated",
        requiredEvidence: ["filtering system configuration", "blocked content logs", "bypass monitoring"],
        testMethods: ["filtering effectiveness testing", "bypass attempt monitoring"],
        mappings: []
      }
    ];

    // FedRAMP Framework
    const fedrampControls: ComplianceControl[] = [
      {
        id: "fedramp-ac-1",
        frameworkId: "fedramp",
        controlId: "AC-1",
        title: "Access Control Policy and Procedures",
        description: "Develop, document, and disseminate access control policy and procedures",
        category: "access_control",
        priority: "critical",
        implementation: "manual",
        requiredEvidence: ["access control policy", "procedures documentation", "review records"],
        testMethods: ["policy review", "procedure testing", "documentation audit"],
        mappings: []
      },
      {
        id: "fedramp-au-1",
        frameworkId: "fedramp",
        controlId: "AU-1",
        title: "Audit and Accountability Policy",
        description: "Establish comprehensive audit and accountability policies and procedures",
        category: "audit",
        priority: "critical",
        implementation: "hybrid",
        requiredEvidence: ["audit policy", "accountability procedures", "logging standards"],
        testMethods: ["policy validation", "audit testing", "log review"],
        mappings: []
      }
    ];

    // NIST 800-53 Framework
    const nist80053Controls: ComplianceControl[] = [
      {
        id: "nist-800-53-ac-2",
        frameworkId: "nist-800-53",
        controlId: "AC-2",
        title: "Account Management",
        description: "Manage information system accounts including establishment, activation, modification, review, and removal",
        category: "access_control",
        priority: "critical",
        implementation: "hybrid",
        requiredEvidence: ["account procedures", "access reviews", "account lifecycle logs"],
        testMethods: ["account audit", "access review", "process testing"],
        mappings: [{ frameworkId: "fisma", controlId: "AC-2", relationship: "equivalent" }]
      },
      {
        id: "nist-800-53-si-4",
        frameworkId: "nist-800-53",
        controlId: "SI-4",
        title: "Information System Monitoring",
        description: "Monitor information systems to detect attacks and indicators of potential attacks",
        category: "network_security",
        priority: "high",
        implementation: "automated",
        requiredEvidence: ["monitoring tools", "alert configurations", "incident logs"],
        testMethods: ["monitoring testing", "alert validation", "detection analysis"],
        mappings: []
      }
    ];

    // CMMC Framework
    const cmmcControls: ComplianceControl[] = [
      {
        id: "cmmc-ac-l2-001",
        frameworkId: "cmmc",
        controlId: "AC.L2-3.1.1",
        title: "Access Control Policy",
        description: "Establish and maintain access control policies and procedures",
        category: "access_control",
        priority: "critical",
        implementation: "manual",
        requiredEvidence: ["access control policies", "procedure documentation", "training records"],
        testMethods: ["policy review", "procedure validation", "training assessment"],
        mappings: []
      },
      {
        id: "cmmc-sc-l2-001",
        frameworkId: "cmmc",
        controlId: "SC.L2-3.13.1",
        title: "Boundary Protection",
        description: "Monitor, control, and protect organizational communications at external boundaries",
        category: "network_security",
        priority: "high",
        implementation: "automated",
        requiredEvidence: ["firewall configurations", "boundary monitoring", "traffic logs"],
        testMethods: ["boundary testing", "configuration review", "traffic analysis"],
        mappings: []
      }
    ];

    // NIST 800-171 Framework
    const nist800171Controls: ComplianceControl[] = [
      {
        id: "nist-800-171-3-1-1",
        frameworkId: "nist-800-171",
        controlId: "3.1.1",
        title: "Access Control for CUI",
        description: "Limit information system access to authorized users, processes, and devices",
        category: "access_control",
        priority: "critical",
        implementation: "hybrid",
        requiredEvidence: ["access control lists", "user authorizations", "device registrations"],
        testMethods: ["access testing", "authorization review", "device audit"],
        mappings: []
      },
      {
        id: "nist-800-171-3-3-1",
        frameworkId: "nist-800-171",
        controlId: "3.3.1",
        title: "Audit Event Logging",
        description: "Create and retain system audit logs and records to enable security incident monitoring",
        category: "audit",
        priority: "high",
        implementation: "automated",
        requiredEvidence: ["audit configurations", "log retention policies", "monitoring systems"],
        testMethods: ["audit testing", "log validation", "retention verification"],
        mappings: []
      }
    ];

    const frameworks: ComplianceFramework[] = [
      {
        id: "ferpa",
        name: "FERPA",
        fullName: "Family Educational Rights and Privacy Act",
        sector: "education",
        version: "2024",
        controls: ferpaControls,
        lastUpdated: new Date()
      },
      {
        id: "fisma",
        name: "FISMA", 
        fullName: "Federal Information Security Management Act",
        sector: "federal",
        version: "NIST SP 800-53 Rev 5",
        controls: fismaControls,
        lastUpdated: new Date()
      },
      {
        id: "cipa",
        name: "CIPA",
        fullName: "Children's Internet Protection Act",
        sector: "education", 
        version: "2024",
        controls: cipaControls,
        lastUpdated: new Date()
      },
      {
        id: "fedramp",
        name: "FedRAMP",
        fullName: "Federal Risk and Authorization Management Program",
        sector: "federal",
        version: "High Baseline Rev 5",
        controls: fedrampControls,
        lastUpdated: new Date()
      },
      {
        id: "nist-800-53",
        name: "NIST 800-53",
        fullName: "Security and Privacy Controls for Federal Information Systems",
        sector: "federal",
        version: "Rev 5",
        controls: nist80053Controls,
        lastUpdated: new Date()
      },
      {
        id: "cmmc",
        name: "CMMC",
        fullName: "Cybersecurity Maturity Model Certification",
        sector: "government",
        version: "2.0",
        controls: cmmcControls,
        lastUpdated: new Date()
      },
      {
        id: "nist-800-171",
        name: "NIST 800-171",
        fullName: "Protecting Controlled Unclassified Information",
        sector: "government",
        version: "Rev 2",
        controls: nist800171Controls,
        lastUpdated: new Date()
      }
    ];

    frameworks.forEach(framework => {
      this.frameworks.set(framework.id, framework);
      
      // Build control mappings
      framework.controls.forEach(control => {
        control.mappings.forEach(mapping => {
          const key = `${control.frameworkId}-${control.controlId}`;
          if (!this.controlMappings.has(key)) {
            this.controlMappings.set(key, []);
          }
          this.controlMappings.get(key)!.push(mapping);
        });
      });
    });
  }

  private initializeSystemConfigs() {
    const configs: SystemConfiguration[] = [
      {
        id: "sys-web-server",
        name: "Education Portal Web Server",
        type: "server",
        version: "nginx/1.20.1",
        configuration: {
          ssl_enabled: true,
          ssl_protocols: ["TLSv1.2", "TLSv1.3"],
          access_logging: true,
          authentication_required: true,
          session_timeout: 1800,
          max_file_upload: "50MB"
        },
        lastScanned: new Date(),
        complianceSettings: {
          ferpa_compliant: true,
          encryption_at_rest: true,
          access_controls_enabled: true
        }
      },
      {
        id: "sys-database",
        name: "Student Information Database", 
        type: "database",
        version: "PostgreSQL 14.9",
        configuration: {
          ssl_mode: "require",
          log_statement: "all",
          encryption_at_rest: true,
          backup_encryption: true,
          password_policy: "strict",
          connection_limit: 100
        },
        lastScanned: new Date(),
        complianceSettings: {
          ferpa_compliant: true,
          fisma_compliant: true,
          audit_logging_enabled: true
        }
      },
      {
        id: "sys-firewall",
        name: "Network Security Firewall",
        type: "network",
        version: "pfSense 2.7.0",
        configuration: {
          content_filtering: true,
          intrusion_detection: true,
          logging_enabled: true,
          blocked_categories: ["adult", "gambling", "malware", "phishing"],
          vpn_enabled: true,
          admin_access_restricted: true
        },
        lastScanned: new Date(),
        complianceSettings: {
          cipa_compliant: true,
          content_filtering_active: true,
          monitoring_enabled: true
        }
      }
    ];

    configs.forEach(config => {
      this.systemConfigs.set(config.id, config);
    });
  }

  async performAutomatedAssessment(frameworkId: string, organizationId: string): Promise<ComplianceAssessment> {
    const framework = this.frameworks.get(frameworkId);
    if (!framework) {
      throw new Error(`Framework ${frameworkId} not found`);
    }

    const assessmentId = randomBytes(8).toString("hex");
    const startDate = new Date();

    console.log(`Starting automated compliance assessment for ${framework.name}...`);

    const controlResults: ControlAssessmentResult[] = [];
    const findings: ComplianceFinding[] = [];

    // Assess each control
    for (const control of framework.controls) {
      const result = await this.assessControl(control, organizationId);
      controlResults.push(result);

      // Generate findings for non-compliant controls
      if (result.status === "non_compliant") {
        const finding = this.generateFinding(control, result);
        findings.push(finding);
      }
    }

    // Calculate overall score
    const compliantControls = controlResults.filter(r => r.status === "compliant").length;
    const totalControls = controlResults.filter(r => r.status !== "not_applicable").length;
    const overallScore = totalControls > 0 ? Math.round((compliantControls / totalControls) * 100) : 0;

    const assessment: ComplianceAssessment = {
      id: assessmentId,
      frameworkId,
      organizationId,
      assessmentType: "automated",
      scope: Array.from(this.systemConfigs.keys()),
      startDate,
      completionDate: new Date(),
      status: findings.length > 0 ? "remediation" : "complete",
      overallScore,
      controlResults,
      findings,
      recommendations: this.generateRecommendations(findings),
      nextAssessment: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000) // 90 days
    };

    this.assessments.set(assessmentId, assessment);
    return assessment;
  }

  private async assessControl(control: ComplianceControl, organizationId: string): Promise<ControlAssessmentResult> {
    // Simulate automated control assessment based on system configurations
    let status: "compliant" | "non_compliant" | "not_applicable" | "compensating" = "compliant";
    let score = 100;
    const evidence: string[] = [];
    const gaps: string[] = [];

    // Check relevant system configurations
    for (const [configId, config] of Array.from(this.systemConfigs.entries())) {
      const configEvidence = this.checkConfigurationCompliance(control, config);
      
      if (configEvidence.compliant) {
        evidence.push(...configEvidence.evidence);
        score = Math.min(score, configEvidence.score);
      } else {
        status = "non_compliant";
        gaps.push(...configEvidence.gaps);
        score = Math.min(score, configEvidence.score);
      }
    }

    return {
      controlId: control.id,
      status,
      score,
      evidence,
      gaps,
      implementationStatus: score > 80 ? "implemented" : score > 50 ? "in_progress" : "planned",
      lastTested: new Date(),
      testMethod: "automated_scan",
      assessorNotes: `Automated assessment completed. Score: ${score}%, Evidence: ${evidence.length} items, Gaps: ${gaps.length} items`
    };
  }

  private checkConfigurationCompliance(control: ComplianceControl, config: SystemConfiguration): {
    compliant: boolean;
    score: number;
    evidence: string[];
    gaps: string[];
  } {
    const evidence: string[] = [];
    const gaps: string[] = [];
    let score = 100;

    // Control-specific compliance checks
    switch (control.controlId) {
      case "FERPA-2.1": // Access Controls
        if (config.configuration.authentication_required) {
          evidence.push(`${config.name}: Authentication required`);
        } else {
          gaps.push(`${config.name}: Missing authentication requirement`);
          score -= 30;
        }
        
        if (config.configuration.session_timeout && config.configuration.session_timeout <= 3600) {
          evidence.push(`${config.name}: Session timeout configured (${config.configuration.session_timeout}s)`);
        } else {
          gaps.push(`${config.name}: Session timeout not configured or too long`);
          score -= 20;
        }
        break;

      case "FERPA-3.1": // Encryption
        if (config.configuration.ssl_enabled || config.configuration.encryption_at_rest) {
          evidence.push(`${config.name}: Encryption enabled`);
        } else {
          gaps.push(`${config.name}: Encryption not enabled`);
          score -= 50;
        }
        
        if (config.configuration.ssl_protocols?.includes("TLSv1.3")) {
          evidence.push(`${config.name}: Modern TLS protocol in use`);
        } else if (!config.configuration.ssl_protocols?.length) {
          gaps.push(`${config.name}: SSL/TLS protocols not specified`);
          score -= 15;
        }
        break;

      case "CIPA-2.1": // Content Filtering
        if (config.configuration.content_filtering) {
          evidence.push(`${config.name}: Content filtering enabled`);
        } else {
          gaps.push(`${config.name}: Content filtering not enabled`);
          score -= 40;
        }
        
        if (config.configuration.blocked_categories?.length > 0) {
          evidence.push(`${config.name}: ${config.configuration.blocked_categories.length} categories blocked`);
        } else {
          gaps.push(`${config.name}: No blocked content categories configured`);
          score -= 30;
        }
        break;

      case "AU-2": // Auditable Events
        if (config.configuration.access_logging || config.configuration.logging_enabled) {
          evidence.push(`${config.name}: Logging enabled`);
        } else {
          gaps.push(`${config.name}: Logging not enabled`);
          score -= 35;
        }
        break;

      default:
        // Generic compliance check
        if (config.complianceSettings[control.frameworkId + "_compliant"]) {
          evidence.push(`${config.name}: Marked as ${control.frameworkId.toUpperCase()} compliant`);
        } else {
          score -= 20;
        }
        break;
    }

    return {
      compliant: score >= 80,
      score: Math.max(0, score),
      evidence,
      gaps
    };
  }

  private generateFinding(control: ComplianceControl, result: ControlAssessmentResult): ComplianceFinding {
    const findingId = randomBytes(6).toString("hex");
    
    return {
      id: findingId,
      controlId: control.id,
      severity: control.priority === "critical" ? "critical" : 
                control.priority === "high" ? "high" : "medium",
      findingType: "gap",
      title: `${control.title} - Implementation Gap`,
      description: `Control ${control.controlId} is not fully compliant. ${result.gaps.join("; ")}`,
      impact: this.generateImpactStatement(control),
      recommendation: this.generateControlRecommendation(control, result),
      remediationTimeframe: control.priority === "critical" ? "immediate" : 
                           control.priority === "high" ? "30_days" : "90_days",
      status: "open",
      discoveredDate: new Date()
    };
  }

  private generateImpactStatement(control: ComplianceControl): string {
    switch (control.category) {
      case "access_control":
        return "Inadequate access controls may lead to unauthorized access to sensitive data and compliance violations.";
      case "data_protection":
        return "Poor data protection practices could result in data breaches and regulatory penalties.";
      case "audit":
        return "Insufficient audit capabilities may prevent detection of security incidents and compliance monitoring.";
      case "network_security":
        return "Network security gaps could expose systems to external threats and unauthorized access.";
      default:
        return "Non-compliance with this control may result in security vulnerabilities and regulatory violations.";
    }
  }

  private generateControlRecommendation(control: ComplianceControl, result: ControlAssessmentResult): string {
    const recommendations = [
      `Review and implement the requirements specified in ${control.controlId}: ${control.title}`,
      "Address the following gaps: " + result.gaps.join("; "),
      "Ensure all required evidence is documented and maintained",
      "Schedule regular testing and monitoring of this control"
    ];

    if (control.implementation === "automated") {
      recommendations.push("Consider implementing automated compliance monitoring for this control");
    }

    return recommendations.join(". ");
  }

  private generateRecommendations(findings: ComplianceFinding[]): string[] {
    const recommendations: string[] = [];
    
    const criticalFindings = findings.filter(f => f.severity === "critical");
    const highFindings = findings.filter(f => f.severity === "high");
    
    if (criticalFindings.length > 0) {
      recommendations.push(`Address ${criticalFindings.length} critical compliance gaps immediately`);
    }
    
    if (highFindings.length > 0) {
      recommendations.push(`Develop remediation plan for ${highFindings.length} high-priority findings within 30 days`);
    }
    
    recommendations.push("Implement automated compliance monitoring to prevent future gaps");
    recommendations.push("Schedule quarterly compliance assessments to maintain ongoing compliance");
    
    return recommendations;
  }

  // Public methods for accessing compliance data
  getFrameworks(): ComplianceFramework[] {
    return Array.from(this.frameworks.values());
  }

  getFramework(frameworkId: string): ComplianceFramework | undefined {
    return this.frameworks.get(frameworkId);
  }

  getAssessments(): ComplianceAssessment[] {
    return Array.from(this.assessments.values());
  }

  getAssessment(assessmentId: string): ComplianceAssessment | undefined {
    return this.assessments.get(assessmentId);
  }

  async getComplianceGapAnalysis(frameworkId: string): Promise<{
    totalControls: number;
    compliantControls: number;
    nonCompliantControls: number;
    compliancePercentage: number;
    criticalGaps: number;
    highGaps: number;
    mediumGaps: number;
  }> {
    const latestAssessment = Array.from(this.assessments.values())
      .filter(a => a.frameworkId === frameworkId)
      .sort((a, b) => b.startDate.getTime() - a.startDate.getTime())[0];

    if (!latestAssessment) {
      throw new Error(`No assessment found for framework ${frameworkId}`);
    }

    const totalControls = latestAssessment.controlResults.length;
    const compliantControls = latestAssessment.controlResults.filter(r => r.status === "compliant").length;
    const nonCompliantControls = latestAssessment.controlResults.filter(r => r.status === "non_compliant").length;
    
    const criticalGaps = latestAssessment.findings.filter(f => f.severity === "critical").length;
    const highGaps = latestAssessment.findings.filter(f => f.severity === "high").length;
    const mediumGaps = latestAssessment.findings.filter(f => f.severity === "medium").length;

    return {
      totalControls,
      compliantControls,
      nonCompliantControls,
      compliancePercentage: latestAssessment.overallScore,
      criticalGaps,
      highGaps,
      mediumGaps
    };
  }

  getSystemConfigurations(): SystemConfiguration[] {
    return Array.from(this.systemConfigs.values());
  }

  // Calculate overall compliance health across all frameworks
  getComplianceHealth(): {
    overallHealthScore: number;
    frameworkScores: Array<{
      frameworkId: string;
      name: string;
      score: number;
      status: "excellent" | "good" | "fair" | "poor";
      lastAssessed: Date | null;
    }>;
    criticalGaps: number;
    totalFindings: number;
    complianceDistribution: {
      excellent: number; // 90-100%
      good: number; // 70-89%
      fair: number; // 50-69%
      poor: number; // 0-49%
    };
  } {
    const frameworkScores = [];
    let totalScore = 0;
    let assessedFrameworks = 0;
    let totalCriticalGaps = 0;
    let totalFindings = 0;

    const complianceDistribution = {
      excellent: 0,
      good: 0,
      fair: 0,
      poor: 0
    };

    // Get latest assessment helper function
    const getLatestAssessment = (frameworkId: string) => {
      return Array.from(this.assessments.values())
        .filter(a => a.frameworkId === frameworkId)
        .sort((a, b) => b.startDate.getTime() - a.startDate.getTime())[0];
    };

    // Calculate scores for each framework
    for (const framework of Array.from(this.frameworks.values())) {
      const frameworkId = framework.id;
      const latestAssessment = getLatestAssessment(frameworkId);
      
      let score = 0;
      let status: "excellent" | "good" | "fair" | "poor" = "poor";
      let lastAssessed: Date | null = null;

      if (latestAssessment) {
        score = latestAssessment.overallScore;
        lastAssessed = latestAssessment.completionDate || latestAssessment.startDate;
        
        // Calculate critical gaps for this framework
        const criticalGaps = latestAssessment.findings.filter(f => f.severity === "critical").length;
        totalCriticalGaps += criticalGaps;
        totalFindings += latestAssessment.findings.length;
        
        totalScore += score;
        assessedFrameworks++;
      } else {
        // If no assessment, assume baseline compliance based on framework controls
        const controlsCount = framework.controls.length;
        score = Math.max(30, Math.min(60, controlsCount * 5)); // Baseline 30-60% depending on controls
      }

      // Determine status based on score
      if (score >= 90) {
        status = "excellent";
        complianceDistribution.excellent++;
      } else if (score >= 70) {
        status = "good";
        complianceDistribution.good++;
      } else if (score >= 50) {
        status = "fair";
        complianceDistribution.fair++;
      } else {
        status = "poor";
        complianceDistribution.poor++;
      }

      frameworkScores.push({
        frameworkId,
        name: framework.name,
        score,
        status,
        lastAssessed
      });
    }

    // Calculate overall health score
    const overallHealthScore = this.frameworks.size > 0 
      ? Math.round(totalScore / this.frameworks.size) 
      : 0;

    return {
      overallHealthScore,
      frameworkScores,
      criticalGaps: totalCriticalGaps,
      totalFindings,
      complianceDistribution
    };
  }
}

export const complianceAutomationEngine = new ComplianceAutomationEngine();