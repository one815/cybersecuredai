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
  controlId: string; // e.g., "AC-2", "FERPA-1.1", "CM-2", "IR-4"
  title: string;
  description: string;
  category: "access_control" | "audit" | "data_protection" | "network_security" | "incident_response" | "risk_management" | "configuration_management" | "contingency_planning" | "system_integrity" | "assessment_authorization";
  priority: "critical" | "high" | "medium" | "low";
  implementation: "manual" | "automated" | "hybrid";
  requiredEvidence: string[];
  testMethods: string[];
  mappings: ControlMapping[];
  nistFamily?: string; // e.g., "CM", "IR", "RA", "CP"
  automationCapable?: boolean;
  continuousMonitoring?: boolean;
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
  riskAdjustedScore: number; // 0-100 weighted by risk factors
  maturityScore: number; // 0-100 based on implementation maturity
  trendScore: number; // -100 to 100 improvement/degradation trend
  controlResults: ControlAssessmentResult[];
  findings: ComplianceFinding[];
  recommendations: string[];
  nextAssessment?: Date;
  industryBenchmark?: {
    percentile: number;
    averageScore: number;
    bestPracticeGap: number;
  };
  riskMetrics: {
    criticalRiskScore: number;
    businessImpactScore: number;
    likelihoodScore: number;
    residualRiskScore: number;
  };
}

export interface ControlAssessmentResult {
  controlId: string;
  status: "compliant" | "non_compliant" | "not_applicable" | "compensating" | "not_tested";
  score: number; // 0-100
  riskWeightedScore: number; // 0-100 adjusted for risk and priority
  maturityLevel: 0 | 1 | 2 | 3 | 4 | 5; // CMM-style maturity (0=none, 5=optimized)
  effectivenessScore: number; // 0-100 how well implemented
  automationLevel: number; // 0-100 percentage automated
  evidence: string[];
  gaps: string[];
  implementationStatus: "not_started" | "planned" | "in_progress" | "implemented" | "maintained";
  lastTested: Date;
  testMethod: string;
  assessorNotes: string;
  riskFactors: {
    businessCriticality: "low" | "medium" | "high" | "critical";
    dataClassification: "public" | "internal" | "confidential" | "restricted";
    threatExposure: "low" | "medium" | "high" | "critical";
    regulatoryImpact: "minimal" | "moderate" | "significant" | "severe";
  };
  historicalTrend: {
    previousScore: number;
    scoreChange: number;
    trendDirection: "improving" | "stable" | "declining";
    consistencyRating: number; // 0-100
  };
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
  type: "network" | "server" | "application" | "database" | "endpoint" | "cloud" | "container" | "iac";
  version: string;
  configuration: Record<string, any>;
  lastScanned: Date;
  complianceSettings: Record<string, any>;
  baselineConfiguration?: Record<string, any>;
  configurationDrift?: {
    detected: boolean;
    severity: "low" | "medium" | "high" | "critical";
    changes: ConfigurationChange[];
    lastCheck: Date;
  };
  cis_benchmark?: string;
  nist_controls?: string[];
  stig_compliance?: boolean;
}

export interface ConfigurationChange {
  parameter: string;
  oldValue: any;
  newValue: any;
  changeType: "added" | "modified" | "removed";
  timestamp: Date;
  source: string;
  riskLevel: "low" | "medium" | "high" | "critical";
  complianceImpact: string[];
}

export interface BadgeDefinition {
  id: string;
  name: string;
  description: string;
  icon: string;
  tier: "bronze" | "silver" | "gold" | "platinum" | "diamond";
  criteria: BadgeCriteria;
}

export interface BadgeCriteria {
  framework?: string;
  frameworks?: string[];
  minScore?: number;
  multiFramework?: boolean;
  anyFramework?: boolean;
  allFrameworks?: boolean;
  minFrameworks?: number;
  improvementPoints?: number;
  consistentScore?: number;
  assessmentCount?: number;
  fromScore?: number;
  toScore?: number;
  criticalReduction?: number;
  automationLevel?: number;
  firstAssessment?: boolean;
}

export interface UserBadge {
  badgeId: string;
  name: string;
  description: string;
  icon: string;
  tier: "bronze" | "silver" | "gold" | "platinum" | "diamond";
  earnedDate: Date;
  frameworkId?: string;
  achievementScore?: number;
}

export interface UserBadgeCollection {
  userId: string;
  badges: UserBadge[];
  totalBadges: number;
  tierCounts: {
    bronze: number;
    silver: number;
    gold: number;
    platinum: number;
    diamond: number;
  };
}

export class ComplianceAutomationEngine {
  private frameworks: Map<string, ComplianceFramework> = new Map();
  private assessments: Map<string, ComplianceAssessment> = new Map();
  private systemConfigs: Map<string, SystemConfiguration> = new Map();
  private controlMappings: Map<string, ControlMapping[]> = new Map();
  private userBadges: Map<string, UserBadgeCollection> = new Map(); // userId -> badges

  // Badge Definitions
  private badgeDefinitions: BadgeDefinition[] = [
    // Framework Mastery Badges
    { id: "ferpa-champion", name: "FERPA Champion", description: "Achieved 90%+ compliance in FERPA", icon: "graduation-cap", tier: "gold", criteria: { framework: "ferpa", minScore: 90 } },
    { id: "fisma-master", name: "FISMA Master", description: "Achieved 90%+ compliance in FISMA", icon: "shield-check", tier: "gold", criteria: { framework: "fisma", minScore: 90 } },
    { id: "nist-expert", name: "NIST Expert", description: "Achieved 90%+ compliance in NIST 800-53", icon: "award", tier: "gold", criteria: { framework: "nist-800-53", minScore: 90 } },
    { id: "cmmc-warrior", name: "CMMC Warrior", description: "Achieved 90%+ compliance in CMMC", icon: "sword", tier: "gold", criteria: { framework: "cmmc", minScore: 90 } },
    { id: "cipa-guardian", name: "CIPA Guardian", description: "Achieved 90%+ compliance in CIPA", icon: "shield", tier: "gold", criteria: { framework: "cipa", minScore: 90 } },
    { id: "fedramp-pro", name: "FedRAMP Pro", description: "Achieved 90%+ compliance in FedRAMP", icon: "cloud", tier: "gold", criteria: { framework: "fedramp", minScore: 90 } },
    
    // Score Achievement Badges
    { id: "excellence-seeker", name: "Excellence Seeker", description: "Achieved 80%+ across 3+ frameworks", icon: "target", tier: "silver", criteria: { multiFramework: true, minScore: 80, minFrameworks: 3 } },
    { id: "compliance-guru", name: "Compliance Guru", description: "Achieved 95%+ in any framework", icon: "crown", tier: "platinum", criteria: { anyFramework: true, minScore: 95 } },
    { id: "perfect-score", name: "Perfect Score", description: "Achieved 100% compliance in any framework", icon: "star", tier: "diamond", criteria: { anyFramework: true, minScore: 100 } },
    
    // Improvement Badges
    { id: "rapid-improver", name: "Rapid Improver", description: "Improved by 30+ points in one assessment", icon: "trending-up", tier: "bronze", criteria: { improvementPoints: 30 } },
    { id: "consistency-king", name: "Consistency King", description: "Maintained 80%+ score across 5 assessments", icon: "repeat", tier: "silver", criteria: { consistentScore: 80, assessmentCount: 5 } },
    { id: "turnaround-artist", name: "Turnaround Artist", description: "Improved from <50% to 80%+", icon: "refresh-cw", tier: "gold", criteria: { fromScore: 50, toScore: 80 } },
    
    // Special Achievement Badges
    { id: "risk-reducer", name: "Risk Reducer", description: "Reduced critical findings by 50%+", icon: "shield", tier: "gold", criteria: { criticalReduction: 50 } },
    { id: "automation-master", name: "Automation Master", description: "Achieved 90%+ automation across all controls", icon: "zap", tier: "platinum", criteria: { automationLevel: 90 } },
    { id: "first-timer", name: "Getting Started", description: "Completed your first compliance assessment", icon: "play-circle", tier: "bronze", criteria: { firstAssessment: true } },
    
    // Cross-Framework Badges
    { id: "education-specialist", name: "Education Specialist", description: "90%+ in FERPA and CIPA", icon: "book", tier: "silver", criteria: { frameworks: ["ferpa", "cipa"], minScore: 90 } },
    { id: "government-pro", name: "Government Pro", description: "90%+ in FISMA and FedRAMP", icon: "building", tier: "silver", criteria: { frameworks: ["fisma", "fedramp"], minScore: 90 } },
    { id: "defense-expert", name: "Defense Expert", description: "90%+ in CMMC and NIST 800-171", icon: "shield-alert", tier: "silver", criteria: { frameworks: ["cmmc", "nist-800-171"], minScore: 90 } },
    { id: "compliance-overlord", name: "Compliance Overlord", description: "90%+ across ALL frameworks", icon: "trophy", tier: "diamond", criteria: { allFrameworks: true, minScore: 90 } }
  ];

  constructor() {
    console.log('🔧 Initializing Compliance Automation Engine...');
    this.initializeFrameworks();
    this.initializeSystemConfigs();
    this.initializeNISTFramework();
    this.initializeThreatIntelligenceFeeds();
    console.log('✅ Compliance Automation Engine initialized successfully');
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

    // Calculate advanced scores
    const { riskAdjustedScore, maturityScore, trendScore } = this.calculateAdvancedScores(controlResults, findings);
    const riskMetrics = this.calculateRiskMetrics(controlResults, findings);
    const industryBenchmark = this.calculateIndustryBenchmark(frameworkId, overallScore);

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
      riskAdjustedScore,
      maturityScore,
      trendScore,
      controlResults,
      findings,
      recommendations: this.generateRecommendations(findings),
      nextAssessment: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 days
      industryBenchmark,
      riskMetrics
    };

    this.assessments.set(assessmentId, assessment);

    // Evaluate and award badges for this assessment
    const newBadges = this.evaluateBadges(organizationId, assessment);
    
    // Add badges to assessment result for client notification
    (assessment as any).newBadges = newBadges;

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

    // Calculate advanced metrics for this control
    const maturityLevel = this.calculateControlMaturity(control, score);
    const riskFactors = this.assessControlRiskFactors(control);
    const automationLevel = this.calculateAutomationLevel(control);
    const effectivenessScore = this.calculateEffectivenessScore(score, evidence.length, gaps.length);
    const historicalTrend = this.getControlHistoricalTrend(control.id);
    const riskWeightedScore = this.calculateRiskWeightedScore(score, riskFactors, control.priority);

    return {
      controlId: control.id,
      status,
      score,
      riskWeightedScore,
      maturityLevel,
      effectivenessScore,
      automationLevel,
      evidence,
      gaps,
      implementationStatus: score > 80 ? "implemented" : score > 50 ? "in_progress" : "planned",
      lastTested: new Date(),
      testMethod: "automated_scan",
      assessorNotes: `Advanced assessment: Score ${score}%, Risk-weighted ${riskWeightedScore}%, Maturity Level ${maturityLevel}, Effectiveness ${effectivenessScore}%`,
      riskFactors,
      historicalTrend
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

  // Advanced Scoring Methods
  private calculateAdvancedScores(controlResults: ControlAssessmentResult[], findings: ComplianceFinding[]): {
    riskAdjustedScore: number;
    maturityScore: number;
    trendScore: number;
  } {
    const totalControls = controlResults.length;
    if (totalControls === 0) return { riskAdjustedScore: 0, maturityScore: 0, trendScore: 0 };

    // Risk-adjusted score calculation
    const totalRiskWeightedScore = controlResults.reduce((sum, result) => sum + result.riskWeightedScore, 0);
    const riskAdjustedScore = Math.round(totalRiskWeightedScore / totalControls);

    // Maturity score calculation (average of all control maturity levels normalized to 0-100)
    const totalMaturityScore = controlResults.reduce((sum, result) => sum + (result.maturityLevel * 20), 0);
    const maturityScore = Math.round(totalMaturityScore / totalControls);

    // Trend score calculation (based on historical improvements/degradations)
    const trendScores = controlResults.map(result => result.historicalTrend.scoreChange);
    const avgTrendChange = trendScores.reduce((sum, change) => sum + change, 0) / trendScores.length;
    const trendScore = Math.max(-100, Math.min(100, Math.round(avgTrendChange)));

    return { riskAdjustedScore, maturityScore, trendScore };
  }

  private calculateRiskMetrics(controlResults: ControlAssessmentResult[], findings: ComplianceFinding[]): {
    criticalRiskScore: number;
    businessImpactScore: number;
    likelihoodScore: number;
    residualRiskScore: number;
  } {
    const criticalFindings = findings.filter(f => f.severity === "critical").length;
    const highFindings = findings.filter(f => f.severity === "high").length;
    
    // Critical risk score based on critical and high findings
    const criticalRiskScore = Math.max(0, 100 - (criticalFindings * 25 + highFindings * 10));

    // Business impact based on control criticality
    const criticalControls = controlResults.filter(r => r.riskFactors.businessCriticality === "critical").length;
    const highControls = controlResults.filter(r => r.riskFactors.businessCriticality === "high").length;
    const nonCompliantCritical = controlResults.filter(r => 
      r.status === "non_compliant" && r.riskFactors.businessCriticality === "critical"
    ).length;
    const businessImpactScore = Math.max(0, 100 - (nonCompliantCritical * 30));

    // Likelihood based on threat exposure
    const highExposureControls = controlResults.filter(r => 
      r.riskFactors.threatExposure === "high" || r.riskFactors.threatExposure === "critical"
    ).length;
    const nonCompliantHighExposure = controlResults.filter(r => 
      r.status === "non_compliant" && (r.riskFactors.threatExposure === "high" || r.riskFactors.threatExposure === "critical")
    ).length;
    const likelihoodScore = Math.max(0, 100 - (nonCompliantHighExposure * 20));

    // Residual risk combines all factors
    const residualRiskScore = Math.round((criticalRiskScore + businessImpactScore + likelihoodScore) / 3);

    return {
      criticalRiskScore,
      businessImpactScore, 
      likelihoodScore,
      residualRiskScore
    };
  }

  private calculateIndustryBenchmark(frameworkId: string, score: number): {
    percentile: number;
    averageScore: number;
    bestPracticeGap: number;
  } {
    // Industry benchmarks (simulated - in production this would come from real data)
    const industryAverages: Record<string, number> = {
      "ferpa": 78,
      "fisma": 82,
      "cipa": 71,
      "fedramp": 85,
      "nist-800-53": 88,
      "cmmc": 79,
      "nist-800-171": 83
    };

    const averageScore = industryAverages[frameworkId] || 75;
    const bestPracticeScore = 95; // Industry best practice target
    
    // Calculate percentile based on score vs industry average
    let percentile = 50;
    if (score > averageScore) {
      percentile = 50 + ((score - averageScore) / (100 - averageScore)) * 50;
    } else {
      percentile = (score / averageScore) * 50;
    }

    const bestPracticeGap = Math.max(0, bestPracticeScore - score);

    return {
      percentile: Math.round(percentile),
      averageScore,
      bestPracticeGap
    };
  }

  private calculateControlMaturity(control: ComplianceControl, score: number): 0 | 1 | 2 | 3 | 4 | 5 {
    // CMM-style maturity levels
    if (score >= 95) return 5; // Optimized
    if (score >= 85) return 4; // Managed
    if (score >= 70) return 3; // Defined
    if (score >= 50) return 2; // Repeatable
    if (score >= 25) return 1; // Initial
    return 0; // None
  }

  private assessControlRiskFactors(control: ComplianceControl): {
    businessCriticality: "low" | "medium" | "high" | "critical";
    dataClassification: "public" | "internal" | "confidential" | "restricted";
    threatExposure: "low" | "medium" | "high" | "critical";
    regulatoryImpact: "minimal" | "moderate" | "significant" | "severe";
  } {
    // Risk assessment based on control characteristics
    let businessCriticality: "low" | "medium" | "high" | "critical" = "medium";
    let dataClassification: "public" | "internal" | "confidential" | "restricted" = "internal";
    let threatExposure: "low" | "medium" | "high" | "critical" = "medium";
    let regulatoryImpact: "minimal" | "moderate" | "significant" | "severe" = "moderate";

    // Adjust based on control priority and category
    if (control.priority === "critical") {
      businessCriticality = "critical";
      regulatoryImpact = "severe";
    } else if (control.priority === "high") {
      businessCriticality = "high";
      regulatoryImpact = "significant";
    }

    if (control.category === "access_control" || control.category === "data_protection") {
      dataClassification = "confidential";
      threatExposure = "high";
    }

    if (control.category === "network_security") {
      threatExposure = "critical";
    }

    return {
      businessCriticality,
      dataClassification,
      threatExposure,
      regulatoryImpact
    };
  }

  private calculateAutomationLevel(control: ComplianceControl): number {
    switch (control.implementation) {
      case "automated": return 90;
      case "hybrid": return 60;
      case "manual": return 20;
      default: return 0;
    }
  }

  private calculateEffectivenessScore(score: number, evidenceCount: number, gapCount: number): number {
    let effectiveness = score;
    
    // Bonus for comprehensive evidence
    if (evidenceCount >= 3) effectiveness += 5;
    
    // Penalty for gaps
    effectiveness -= (gapCount * 3);
    
    return Math.max(0, Math.min(100, effectiveness));
  }

  private getControlHistoricalTrend(controlId: string): {
    previousScore: number;
    scoreChange: number;
    trendDirection: "improving" | "stable" | "declining";
    consistencyRating: number;
  } {
    // Simulated historical data - in production this would come from database
    const previousScore = Math.floor(Math.random() * 100);
    const currentScore = Math.floor(Math.random() * 100);
    const scoreChange = currentScore - previousScore;
    
    let trendDirection: "improving" | "stable" | "declining" = "stable";
    if (scoreChange > 5) trendDirection = "improving";
    else if (scoreChange < -5) trendDirection = "declining";
    
    const consistencyRating = Math.floor(Math.random() * 40) + 60; // 60-100 range
    
    return {
      previousScore,
      scoreChange,
      trendDirection,
      consistencyRating
    };
  }

  private calculateRiskWeightedScore(baseScore: number, riskFactors: any, priority: string): number {
    let weightingFactor = 1.0;

    // Adjust weighting based on risk factors
    if (riskFactors.businessCriticality === "critical") weightingFactor *= 1.5;
    else if (riskFactors.businessCriticality === "high") weightingFactor *= 1.3;

    if (riskFactors.threatExposure === "critical") weightingFactor *= 1.4;
    else if (riskFactors.threatExposure === "high") weightingFactor *= 1.2;

    if (priority === "critical") weightingFactor *= 1.3;
    else if (priority === "high") weightingFactor *= 1.1;

    // Apply inverse weighting to score (higher risk = lower weighted score if non-compliant)
    const riskAdjustment = baseScore < 80 ? (100 - baseScore) * (weightingFactor - 1) : 0;
    const riskWeightedScore = Math.max(0, baseScore - riskAdjustment);

    return Math.round(riskWeightedScore);
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

  // Calculate overall compliance health across all frameworks with advanced metrics
  getComplianceHealth(): {
    overallHealthScore: number;
    riskAdjustedHealthScore: number;
    maturityScore: number;
    trendScore: number;
    frameworkScores: Array<{
      frameworkId: string;
      name: string;
      score: number;
      riskAdjustedScore: number;
      maturityScore: number;
      trendScore: number;
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

      // Calculate advanced metrics for this framework
      const riskAdjustedScore = latestAssessment?.riskAdjustedScore || score;
      const maturityScore = latestAssessment?.maturityScore || Math.floor(score * 0.8); // Estimate maturity as 80% of score
      const trendScore = latestAssessment?.trendScore || 0;

      frameworkScores.push({
        frameworkId,
        name: framework.name,
        score,
        riskAdjustedScore,
        maturityScore,
        trendScore,
        status,
        lastAssessed
      });
    }

    // Calculate overall health score using risk-adjusted scores
    const totalRiskScore = frameworkScores.reduce((sum, f) => sum + f.riskAdjustedScore, 0);
    const overallHealthScore = frameworkScores.length > 0 ? Math.round(totalRiskScore / frameworkScores.length) : 0;
    
    // Calculate maturity and trend averages
    const avgMaturityScore = frameworkScores.length > 0 
      ? Math.round(frameworkScores.reduce((sum, f) => sum + f.maturityScore, 0) / frameworkScores.length) 
      : 0;
    
    const avgTrendScore = frameworkScores.length > 0
      ? Math.round(frameworkScores.reduce((sum, f) => sum + f.trendScore, 0) / frameworkScores.length)
      : 0;

    return {
      overallHealthScore,
      riskAdjustedHealthScore: overallHealthScore,
      maturityScore: avgMaturityScore,
      trendScore: avgTrendScore,
      frameworkScores,
      criticalGaps: totalCriticalGaps,
      totalFindings,
      complianceDistribution
    };
  }

  // Badge System Methods
  
  /**
   * Evaluate and award badges after an assessment completion
   */
  private evaluateBadges(userId: string, assessment: ComplianceAssessment): UserBadge[] {
    const newBadges: UserBadge[] = [];
    const userBadgeCollection = this.userBadges.get(userId) || this.initializeUserBadges(userId);
    
    // Get all assessments for this user
    const userAssessments = Array.from(this.assessments.values())
      .filter(a => a.organizationId === userId);
    
    for (const badgeDefinition of this.badgeDefinitions) {
      // Skip if user already has this badge
      if (userBadgeCollection.badges.some(badge => badge.badgeId === badgeDefinition.id)) {
        continue;
      }
      
      if (this.checkBadgeCriteria(badgeDefinition, assessment, userAssessments)) {
        const userBadge: UserBadge = {
          badgeId: badgeDefinition.id,
          name: badgeDefinition.name,
          description: badgeDefinition.description,
          icon: badgeDefinition.icon,
          tier: badgeDefinition.tier,
          earnedDate: new Date(),
          frameworkId: assessment.frameworkId,
          achievementScore: assessment.riskAdjustedScore
        };
        
        newBadges.push(userBadge);
        userBadgeCollection.badges.push(userBadge);
        userBadgeCollection.totalBadges++;
        userBadgeCollection.tierCounts[badgeDefinition.tier]++;
      }
    }
    
    this.userBadges.set(userId, userBadgeCollection);
    return newBadges;
  }

  /**
   * Check if assessment meets badge criteria
   */
  private checkBadgeCriteria(
    badgeDefinition: BadgeDefinition, 
    currentAssessment: ComplianceAssessment, 
    allAssessments: ComplianceAssessment[]
  ): boolean {
    const criteria = badgeDefinition.criteria;
    
    // First assessment badge (Getting Started)
    if (criteria.firstAssessment) {
      return allAssessments.length === 1; // First assessment for this user
    }
    
    // Framework-specific badges
    if (criteria.framework && criteria.minScore) {
      return currentAssessment.frameworkId === criteria.framework && 
             currentAssessment.riskAdjustedScore >= criteria.minScore;
    }
    
    // Any framework achievement
    if (criteria.anyFramework && criteria.minScore) {
      return currentAssessment.riskAdjustedScore >= criteria.minScore;
    }
    
    // Multi-framework badges
    if (criteria.multiFramework && criteria.minScore !== undefined && criteria.minFrameworks) {
      const qualifyingFrameworks = allAssessments.filter(a => 
        a.riskAdjustedScore >= criteria.minScore!
      ).length;
      return qualifyingFrameworks >= criteria.minFrameworks;
    }
    
    // Improvement badges
    if (criteria.improvementPoints) {
      // Find previous assessment for same framework
      const previousAssessments = allAssessments
        .filter(a => a.frameworkId === currentAssessment.frameworkId && a.id !== currentAssessment.id)
        .sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
      
      if (previousAssessments.length > 0) {
        const improvement = currentAssessment.riskAdjustedScore - previousAssessments[0].riskAdjustedScore;
        return improvement >= criteria.improvementPoints;
      }
    }
    
    // Consistency badges
    if (criteria.consistentScore && criteria.assessmentCount) {
      const recentAssessments = allAssessments
        .sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime())
        .slice(0, criteria.assessmentCount);
      
      return recentAssessments.length >= criteria.assessmentCount &&
             recentAssessments.every(a => a.riskAdjustedScore >= criteria.consistentScore!);
    }
    
    // Turnaround badges (from low to high score)
    if (criteria.fromScore !== undefined && criteria.toScore !== undefined) {
      const previousAssessments = allAssessments
        .filter(a => a.frameworkId === currentAssessment.frameworkId && a.id !== currentAssessment.id)
        .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
      
      if (previousAssessments.length > 0) {
        const firstScore = previousAssessments[0].riskAdjustedScore;
        return firstScore < criteria.fromScore && currentAssessment.riskAdjustedScore >= criteria.toScore;
      }
    }
    
    // Specific frameworks list
    if (criteria.frameworks && criteria.minScore !== undefined) {
      const requiredFrameworks = criteria.frameworks;
      const qualifyingFrameworks = allAssessments.filter(a => 
        requiredFrameworks.includes(a.frameworkId) && a.riskAdjustedScore >= criteria.minScore!
      );
      return qualifyingFrameworks.length === requiredFrameworks.length;
    }
    
    // All frameworks
    if (criteria.allFrameworks && criteria.minScore !== undefined) {
      const frameworkIds = Array.from(this.frameworks.keys());
      const qualifyingFrameworks = allAssessments.filter(a => 
        a.riskAdjustedScore >= criteria.minScore!
      ).map(a => a.frameworkId);
      return frameworkIds.every(id => qualifyingFrameworks.includes(id));
    }
    
    // First assessment
    if (criteria.firstAssessment) {
      return allAssessments.length === 1;
    }
    
    // Improvement tracking
    if (criteria.improvementPoints) {
      const previousAssessments = allAssessments
        .filter(a => a.frameworkId === currentAssessment.frameworkId)
        .sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
      
      if (previousAssessments.length < 2) return false;
      
      const previous = previousAssessments[previousAssessments.length - 2];
      const improvement = currentAssessment.riskAdjustedScore - previous.riskAdjustedScore;
      return improvement >= criteria.improvementPoints;
    }
    
    // Turnaround achievement
    if (criteria.fromScore && criteria.toScore) {
      const previousAssessments = allAssessments
        .filter(a => a.frameworkId === currentAssessment.frameworkId)
        .sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
      
      if (previousAssessments.length < 2) return false;
      
      const firstScore = previousAssessments[0].riskAdjustedScore;
      const currentScore = currentAssessment.riskAdjustedScore;
      return firstScore < criteria.fromScore && currentScore >= criteria.toScore;
    }
    
    // Automation level
    if (criteria.automationLevel) {
      const avgAutomation = currentAssessment.controlResults.reduce((sum, result) => 
        sum + result.automationLevel, 0) / currentAssessment.controlResults.length;
      return avgAutomation >= criteria.automationLevel;
    }
    
    return false;
  }

  /**
   * Initialize badge collection for a new user
   */
  private initializeUserBadges(userId: string): UserBadgeCollection {
    const badgeCollection: UserBadgeCollection = {
      userId,
      badges: [],
      totalBadges: 0,
      tierCounts: {
        bronze: 0,
        silver: 0,
        gold: 0,
        platinum: 0,
        diamond: 0
      }
    };
    this.userBadges.set(userId, badgeCollection);
    return badgeCollection;
  }

  /**
   * Get user's earned badges
   */
  getUserBadges(userId: string): UserBadgeCollection {
    return this.userBadges.get(userId) || this.initializeUserBadges(userId);
  }

  /**
   * Get all available badge definitions
   */
  getBadgeDefinitions(): BadgeDefinition[] {
    return [...this.badgeDefinitions];
  }

  /**
   * Get badges earned in the most recent assessment
   */
  getRecentBadges(userId: string, assessmentId: string): UserBadge[] {
    const assessment = this.assessments.get(assessmentId);
    if (!assessment) return [];
    
    return this.evaluateBadges(userId, assessment);
  }

  /**
   * Initialize NIST SP 800-53 Rev. 5 Framework with essential controls
   */
  private initializeNISTFramework() {
    console.log('📋 Initializing NIST SP 800-53 Rev. 5 Framework...');
    
    const nistControls: ComplianceControl[] = [
      // Access Control (AC) Family
      {
        id: "nist-ac-1",
        frameworkId: "nist-800-53",
        controlId: "AC-1",
        title: "Policy and Procedures",
        description: "Develop, document, and disseminate access control policy and procedures",
        category: "access_control",
        priority: "high",
        implementation: "manual",
        requiredEvidence: ["access control policy", "procedures documentation", "policy reviews"],
        testMethods: ["document review", "policy assessment"],
        mappings: [],
        nistFamily: "AC",
        automationCapable: false,
        continuousMonitoring: false
      },
      {
        id: "nist-ac-2",
        frameworkId: "nist-800-53",
        controlId: "AC-2",
        title: "Account Management",
        description: "Manage system accounts including establishment, activation, modification, review, and removal",
        category: "access_control",
        priority: "critical",
        implementation: "automated",
        requiredEvidence: ["account management procedures", "automated tools", "audit logs"],
        testMethods: ["automated scanning", "manual review", "log analysis"],
        mappings: [{ frameworkId: "ferpa", controlId: "FERPA-2.1", relationship: "equivalent" }],
        nistFamily: "AC",
        automationCapable: true,
        continuousMonitoring: true
      },
      {
        id: "nist-ac-3",
        frameworkId: "nist-800-53",
        controlId: "AC-3",
        title: "Access Enforcement",
        description: "Enforce approved authorizations for logical access to information and system resources",
        category: "access_control",
        priority: "critical",
        implementation: "automated",
        requiredEvidence: ["access control mechanisms", "authorization procedures", "enforcement logs"],
        testMethods: ["access testing", "authorization review", "control validation"],
        mappings: [],
        nistFamily: "AC",
        automationCapable: true,
        continuousMonitoring: true
      },

      // Audit and Accountability (AU) Family
      {
        id: "nist-au-1",
        frameworkId: "nist-800-53",
        controlId: "AU-1",
        title: "Policy and Procedures",
        description: "Develop, document, and disseminate audit and accountability policy and procedures",
        category: "audit",
        priority: "high",
        implementation: "manual",
        requiredEvidence: ["audit policy", "procedures documentation", "policy reviews"],
        testMethods: ["document review", "policy assessment"],
        mappings: [],
        nistFamily: "AU",
        automationCapable: false,
        continuousMonitoring: false
      },
      {
        id: "nist-au-2",
        frameworkId: "nist-800-53",
        controlId: "AU-2",
        title: "Event Logging",
        description: "Identify the types of events that the system is capable of logging",
        category: "audit",
        priority: "critical",
        implementation: "automated",
        requiredEvidence: ["audit event definitions", "logging configurations", "event catalogs"],
        testMethods: ["log analysis", "configuration review", "event validation"],
        mappings: [],
        nistFamily: "AU",
        automationCapable: true,
        continuousMonitoring: true
      },
      {
        id: "nist-au-3",
        frameworkId: "nist-800-53",
        controlId: "AU-3",
        title: "Content of Audit Records",
        description: "Ensure audit records contain information to establish what events occurred, when, where, and who",
        category: "audit",
        priority: "critical",
        implementation: "automated",
        requiredEvidence: ["audit record formats", "time synchronization", "audit trails"],
        testMethods: ["record analysis", "format validation", "completeness testing"],
        mappings: [],
        nistFamily: "AU",
        automationCapable: true,
        continuousMonitoring: true
      },

      // Configuration Management (CM) Family - NEW
      {
        id: "nist-cm-1",
        frameworkId: "nist-800-53",
        controlId: "CM-1",
        title: "Policy and Procedures",
        description: "Develop, document, and disseminate configuration management policy and procedures",
        category: "configuration_management",
        priority: "high",
        implementation: "manual",
        requiredEvidence: ["CM policy", "procedures documentation", "policy reviews"],
        testMethods: ["document review", "policy assessment"],
        mappings: [],
        nistFamily: "CM",
        automationCapable: false,
        continuousMonitoring: false
      },
      {
        id: "nist-cm-2",
        frameworkId: "nist-800-53",
        controlId: "CM-2",
        title: "Baseline Configuration",
        description: "Develop, document, and maintain current baseline configurations of the system",
        category: "configuration_management",
        priority: "critical",
        implementation: "automated",
        requiredEvidence: ["baseline configurations", "configuration items", "change documentation"],
        testMethods: ["configuration scanning", "baseline comparison", "drift detection"],
        mappings: [],
        nistFamily: "CM",
        automationCapable: true,
        continuousMonitoring: true
      },
      {
        id: "nist-cm-3",
        frameworkId: "nist-800-53",
        controlId: "CM-3",
        title: "Configuration Change Control",
        description: "Determine configuration change types requiring authorization and retain change records",
        category: "configuration_management",
        priority: "high",
        implementation: "hybrid",
        requiredEvidence: ["change control procedures", "change records", "authorization logs"],
        testMethods: ["change tracking", "authorization review", "process audit"],
        mappings: [],
        nistFamily: "CM",
        automationCapable: true,
        continuousMonitoring: true
      },
      {
        id: "nist-cm-6",
        frameworkId: "nist-800-53",
        controlId: "CM-6",
        title: "Configuration Settings",
        description: "Establish and document configuration settings using security configuration checklists",
        category: "configuration_management",
        priority: "high",
        implementation: "automated",
        requiredEvidence: ["security checklists", "configuration standards", "compliance scans"],
        testMethods: ["automated scanning", "checklist validation", "compliance assessment"],
        mappings: [],
        nistFamily: "CM",
        automationCapable: true,
        continuousMonitoring: true
      },
      {
        id: "nist-cm-8",
        frameworkId: "nist-800-53",
        controlId: "CM-8",
        title: "System Component Inventory",
        description: "Develop and document an inventory of system components that accurately reflects the current system",
        category: "configuration_management",
        priority: "critical",
        implementation: "automated",
        requiredEvidence: ["component inventory", "asset tracking", "inventory updates"],
        testMethods: ["inventory scanning", "asset discovery", "accuracy validation"],
        mappings: [],
        nistFamily: "CM",
        automationCapable: true,
        continuousMonitoring: true
      },

      // Incident Response (IR) Family - ENHANCED
      {
        id: "nist-ir-1",
        frameworkId: "nist-800-53",
        controlId: "IR-1",
        title: "Policy and Procedures",
        description: "Develop, document, and disseminate incident response policy and procedures",
        category: "incident_response",
        priority: "high",
        implementation: "manual",
        requiredEvidence: ["IR policy", "procedures documentation", "policy reviews"],
        testMethods: ["document review", "policy assessment"],
        mappings: [],
        nistFamily: "IR",
        automationCapable: false,
        continuousMonitoring: false
      },
      {
        id: "nist-ir-4",
        frameworkId: "nist-800-53",
        controlId: "IR-4",
        title: "Incident Handling",
        description: "Implement incident handling capability for security incidents",
        category: "incident_response",
        priority: "critical",
        implementation: "hybrid",
        requiredEvidence: ["incident procedures", "response teams", "handling records"],
        testMethods: ["tabletop exercises", "incident simulation", "response testing"],
        mappings: [],
        nistFamily: "IR",
        automationCapable: true,
        continuousMonitoring: true
      },
      {
        id: "nist-ir-6",
        frameworkId: "nist-800-53",
        controlId: "IR-6",
        title: "Incident Reporting",
        description: "Report security incidents to appropriate officials and authorities",
        category: "incident_response",
        priority: "critical",
        implementation: "automated",
        requiredEvidence: ["reporting procedures", "incident reports", "authority notifications"],
        testMethods: ["reporting validation", "procedure review", "notification testing"],
        mappings: [],
        nistFamily: "IR",
        automationCapable: true,
        continuousMonitoring: true
      },

      // Risk Assessment (RA) Family - NEW
      {
        id: "nist-ra-1",
        frameworkId: "nist-800-53",
        controlId: "RA-1",
        title: "Policy and Procedures",
        description: "Develop, document, and disseminate risk assessment policy and procedures",
        category: "risk_management",
        priority: "high",
        implementation: "manual",
        requiredEvidence: ["RA policy", "procedures documentation", "policy reviews"],
        testMethods: ["document review", "policy assessment"],
        mappings: [],
        nistFamily: "RA",
        automationCapable: false,
        continuousMonitoring: false
      },
      {
        id: "nist-ra-3",
        frameworkId: "nist-800-53",
        controlId: "RA-3",
        title: "Risk Assessment",
        description: "Conduct assessment of risk arising from operation of the system",
        category: "risk_management",
        priority: "critical",
        implementation: "hybrid",
        requiredEvidence: ["risk assessments", "threat analysis", "vulnerability analysis"],
        testMethods: ["assessment review", "threat modeling", "vulnerability scanning"],
        mappings: [],
        nistFamily: "RA",
        automationCapable: true,
        continuousMonitoring: true
      },
      {
        id: "nist-ra-5",
        frameworkId: "nist-800-53",
        controlId: "RA-5",
        title: "Vulnerability Monitoring and Scanning",
        description: "Monitor and scan for system and application vulnerabilities",
        category: "risk_management",
        priority: "critical",
        implementation: "automated",
        requiredEvidence: ["vulnerability scans", "remediation tracking", "scan reports"],
        testMethods: ["automated scanning", "manual validation", "remediation testing"],
        mappings: [],
        nistFamily: "RA",
        automationCapable: true,
        continuousMonitoring: true
      },

      // Contingency Planning (CP) Family - NEW
      {
        id: "nist-cp-1",
        frameworkId: "nist-800-53",
        controlId: "CP-1",
        title: "Policy and Procedures",
        description: "Develop, document, and disseminate contingency planning policy and procedures",
        category: "contingency_planning",
        priority: "high",
        implementation: "manual",
        requiredEvidence: ["CP policy", "procedures documentation", "policy reviews"],
        testMethods: ["document review", "policy assessment"],
        mappings: [],
        nistFamily: "CP",
        automationCapable: false,
        continuousMonitoring: false
      },
      {
        id: "nist-cp-2",
        frameworkId: "nist-800-53",
        controlId: "CP-2",
        title: "Contingency Plan",
        description: "Develop contingency plan for the system that provides essential missions and business functions",
        category: "contingency_planning",
        priority: "critical",
        implementation: "manual",
        requiredEvidence: ["contingency plans", "recovery procedures", "plan testing"],
        testMethods: ["plan review", "testing exercises", "recovery simulation"],
        mappings: [],
        nistFamily: "CP",
        automationCapable: false,
        continuousMonitoring: false
      },
      {
        id: "nist-cp-9",
        frameworkId: "nist-800-53",
        controlId: "CP-9",
        title: "System Backup",
        description: "Conduct backups of user-level and system-level information",
        category: "contingency_planning",
        priority: "critical",
        implementation: "automated",
        requiredEvidence: ["backup procedures", "backup logs", "recovery testing"],
        testMethods: ["backup validation", "recovery testing", "integrity verification"],
        mappings: [],
        nistFamily: "CP",
        automationCapable: true,
        continuousMonitoring: true
      }
    ];

    const nistFramework: ComplianceFramework = {
      id: "nist-800-53",
      name: "NIST SP 800-53 Rev. 5",
      fullName: "Security and Privacy Controls for Information Systems and Organizations",
      sector: "federal",
      version: "Rev. 5.2.0",
      controls: nistControls,
      lastUpdated: new Date()
    };

    this.frameworks.set("nist-800-53", nistFramework);
    console.log(`✅ NIST SP 800-53 Framework initialized with ${nistControls.length} controls`);
  }

  /**
   * Initialize enhanced threat intelligence feeds for compliance monitoring
   */
  private initializeThreatIntelligenceFeeds() {
    console.log('🔍 Initializing Enhanced Threat Intelligence Feeds...');
    
    // Add comprehensive threat intelligence configuration
    const threatIntelFeeds = [
      // Premium Commercial Feeds
      {
        name: "Mandiant Threat Intelligence",
        provider: "Mandiant",
        type: "commercial",
        category: "apt_attribution",
        compliance_frameworks: ["NIST SP 800-53", "CMMC", "FedRAMP"],
        data_types: ["threat_actors", "campaigns", "indicators", "ttps"],
        update_frequency: "real-time",
        integration_method: "api",
        nist_controls: ["RA-3", "RA-5", "SI-3", "IR-4"]
      },
      {
        name: "ThreatConnect",
        provider: "ThreatConnect",
        type: "commercial", 
        category: "threat_orchestration",
        compliance_frameworks: ["NIST SP 800-53", "SOC 2", "ISO 27001"],
        data_types: ["indicators", "threats", "vulnerabilities", "incidents"],
        update_frequency: "real-time",
        integration_method: "api",
        nist_controls: ["AU-2", "AU-3", "IR-4", "RA-5"]
      },
      
      // Government/Industry Feeds
      {
        name: "CISA AIS",
        provider: "CISA",
        type: "government",
        category: "indicators",
        compliance_frameworks: ["NIST SP 800-53", "FedRAMP", "FISMA"],
        data_types: ["stix_taxii", "indicators", "alerts"],
        update_frequency: "real-time",
        integration_method: "stix_taxii",
        nist_controls: ["RA-3", "RA-5", "SI-3", "IR-6"]
      },
      {
        name: "FBI InfraGard",
        provider: "FBI",
        type: "government",
        category: "critical_infrastructure",
        compliance_frameworks: ["NIST SP 800-53", "CMMC"],
        data_types: ["threat_bulletins", "indicators", "analysis"],
        update_frequency: "daily",
        integration_method: "portal",
        nist_controls: ["RA-3", "IR-4", "IR-6"]
      },

      // Open Source Feeds (Enhanced)
      {
        name: "AlienVault OTX Enhanced",
        provider: "AT&T Cybersecurity",
        type: "freemium",
        category: "community_intelligence",
        compliance_frameworks: ["NIST SP 800-53", "SOC 2"],
        data_types: ["indicators", "pulses", "malware_families"],
        update_frequency: "real-time",
        integration_method: "api",
        nist_controls: ["RA-5", "SI-3", "AU-2"]
      },
      {
        name: "MISP Enhanced",
        provider: "CIRCL",
        type: "open_source",
        category: "information_sharing",
        compliance_frameworks: ["NIST SP 800-53", "GDPR"],
        data_types: ["events", "attributes", "objects", "galaxies"],
        update_frequency: "real-time",
        integration_method: "api",
        nist_controls: ["RA-3", "RA-5", "SI-3", "IR-4"]
      },

      // SIEM/SOAR Integration Feeds
      {
        name: "Splunk Security Essentials",
        provider: "Splunk",
        type: "commercial",
        category: "siem_integration",
        compliance_frameworks: ["NIST SP 800-53", "PCI DSS", "SOC 2"],
        data_types: ["analytics", "dashboards", "reports", "alerts"],
        update_frequency: "real-time",
        integration_method: "api",
        nist_controls: ["AU-2", "AU-3", "AU-6", "IR-4"]
      },

      // Cloud Security Feeds
      {
        name: "AWS GuardDuty",
        provider: "Amazon",
        type: "cloud_native",
        category: "cloud_threats",
        compliance_frameworks: ["NIST SP 800-53", "FedRAMP", "SOC 2"],
        data_types: ["threat_findings", "malicious_ips", "dns_queries"],
        update_frequency: "real-time",
        integration_method: "api",
        nist_controls: ["RA-5", "SI-3", "IR-4", "AU-2"]
      },
      {
        name: "Azure Sentinel",
        provider: "Microsoft", 
        type: "cloud_native",
        category: "cloud_siem",
        compliance_frameworks: ["NIST SP 800-53", "ISO 27001", "SOC 2"],
        data_types: ["security_events", "threat_intelligence", "analytics"],
        update_frequency: "real-time",
        integration_method: "api",
        nist_controls: ["AU-2", "AU-3", "IR-4", "RA-5"]
      }
    ];

    // Configuration Management Tools Integration
    const configMgmtTools = [
      {
        name: "Puppet Enterprise NIST Module",
        provider: "Puppet",
        type: "configuration_management",
        compliance_frameworks: ["NIST SP 800-53", "CIS Controls", "DISA STIG"],
        capabilities: ["automated_hardening", "compliance_scanning", "drift_detection"],
        nist_controls: ["CM-2", "CM-3", "CM-6", "CM-8"],
        integration_method: "api"
      },
      {
        name: "Ansible Security Automation",
        provider: "Red Hat",
        type: "configuration_management", 
        compliance_frameworks: ["NIST SP 800-53", "CIS Benchmarks"],
        capabilities: ["security_playbooks", "compliance_automation", "remediation"],
        nist_controls: ["CM-2", "CM-6", "RA-5", "SI-2"],
        integration_method: "api"
      },
      {
        name: "Chef InSpec",
        provider: "Progress Chef",
        type: "compliance_testing",
        compliance_frameworks: ["NIST SP 800-53", "PCI DSS"],
        capabilities: ["compliance_scanning", "policy_as_code", "continuous_compliance"],
        nist_controls: ["CM-6", "AU-2", "RA-5"],
        integration_method: "api"
      }
    ];

    // Cloud Security Posture Management (CSPM) Tools
    const cspmTools = [
      {
        name: "AccuKnox CSPM",
        provider: "AccuKnox", 
        type: "cspm",
        compliance_frameworks: ["NIST SP 800-53", "SOC 2", "PCI DSS", "HIPAA"],
        capabilities: ["cloud_misconfig_detection", "compliance_monitoring", "zero_trust_policies"],
        nist_controls: ["CM-2", "CM-6", "RA-5", "AC-3"],
        integration_method: "api"
      },
      {
        name: "Wiz CSPM",
        provider: "Wiz",
        type: "cspm",
        compliance_frameworks: ["NIST SP 800-53", "SOC 2", "PCI DSS"],
        capabilities: ["attack_path_analysis", "cloud_security", "compliance_reporting"],
        nist_controls: ["RA-3", "RA-5", "CM-8", "SI-3"],
        integration_method: "api"
      },
      {
        name: "Prisma Cloud CSPM",
        provider: "Palo Alto Networks",
        type: "cspm",
        compliance_frameworks: ["NIST SP 800-53", "CIS Controls", "GDPR"],
        capabilities: ["comprehensive_cnapp", "threat_detection", "compliance_automation"],
        nist_controls: ["CM-2", "CM-6", "RA-5", "SI-3"],
        integration_method: "api"
      }
    ];

    console.log(`✅ Enhanced Threat Intelligence configured with:`);
    console.log(`   📊 ${threatIntelFeeds.length} threat intelligence feeds`);
    console.log(`   🔧 ${configMgmtTools.length} configuration management tools`);
    console.log(`   ☁️ ${cspmTools.length} CSPM integrations`);
    console.log(`   🎯 Full NIST SP 800-53 compliance automation support`);
  }

  /**
   * Perform automated configuration drift detection
   */
  async performConfigurationDriftAnalysis(systemId: string): Promise<{
    driftDetected: boolean;
    severity: "low" | "medium" | "high" | "critical";
    changes: ConfigurationChange[];
    affectedControls: string[];
    remediationActions: string[];
  }> {
    const system = this.systemConfigs.get(systemId);
    if (!system || !system.baselineConfiguration) {
      throw new Error(`System ${systemId} not found or no baseline configuration exists`);
    }

    // Simulate configuration drift detection
    const changes: ConfigurationChange[] = [];
    const affectedControls: string[] = [];
    
    // Example drift scenarios
    const driftScenarios = [
      {
        parameter: "ssh_password_authentication",
        oldValue: "no",
        newValue: "yes",
        riskLevel: "high" as const,
        controls: ["CM-6", "AC-3"]
      },
      {
        parameter: "firewall_default_policy",
        oldValue: "deny",
        newValue: "allow",
        riskLevel: "critical" as const,
        controls: ["CM-2", "SC-7"]
      },
      {
        parameter: "audit_log_retention",
        oldValue: "365",
        newValue: "30",
        riskLevel: "medium" as const,
        controls: ["AU-4", "AU-11"]
      },
      {
        parameter: "encryption_algorithm",
        oldValue: "AES-256",
        newValue: "AES-128",
        riskLevel: "medium" as const,
        controls: ["SC-13", "CM-6"]
      }
    ];

    // Simulate random drift detection (20% chance)
    if (Math.random() < 0.2) {
      const driftCount = Math.floor(Math.random() * 3) + 1;
      for (let i = 0; i < driftCount; i++) {
        const scenario = driftScenarios[Math.floor(Math.random() * driftScenarios.length)];
        changes.push({
          parameter: scenario.parameter,
          oldValue: scenario.oldValue,
          newValue: scenario.newValue,
          changeType: "modified",
          timestamp: new Date(),
          source: "system_update",
          riskLevel: scenario.riskLevel,
          complianceImpact: scenario.controls
        });
        affectedControls.push(...scenario.controls);
      }
    }

    const severity = changes.length === 0 ? "low" : 
                    changes.some(c => c.riskLevel === "critical") ? "critical" :
                    changes.some(c => c.riskLevel === "high") ? "high" : "medium";

    const remediationActions = changes.map(change => 
      `Restore ${change.parameter} to baseline value: ${change.oldValue}`
    );

    // Update system configuration
    if (changes.length > 0) {
      system.configurationDrift = {
        detected: true,
        severity,
        changes,
        lastCheck: new Date()
      };
    }

    return {
      driftDetected: changes.length > 0,
      severity,
      changes,
      affectedControls: Array.from(new Set(affectedControls)),
      remediationActions
    };
  }

  /**
   * Generate System Security Plan (SSP) for NIST compliance
   */
  async generateSystemSecurityPlan(systemId: string, frameworkId: string = "nist-800-53"): Promise<{
    systemInfo: any;
    controlImplementations: any[];
    complianceStatus: any;
    remediationPlan: any[];
    riskAssessment: any;
  }> {
    const framework = this.frameworks.get(frameworkId);
    const system = this.systemConfigs.get(systemId);
    
    if (!framework || !system) {
      throw new Error(`Framework ${frameworkId} or system ${systemId} not found`);
    }

    const latestAssessment = Array.from(this.assessments.values())
      .filter(a => a.frameworkId === frameworkId)
      .sort((a, b) => b.startDate.getTime() - a.startDate.getTime())[0];

    const systemInfo = {
      name: system.name,
      type: system.type,
      version: system.version,
      lastAssessed: latestAssessment?.startDate || new Date(),
      complianceFramework: framework.fullName,
      securityCategorization: this.determineSecurityCategorization(system),
      authorizedPersonnel: this.getAuthorizedPersonnel(systemId)
    };

    const controlImplementations = framework.controls.map(control => ({
      controlId: control.controlId,
      title: control.title,
      implementationStatus: this.getControlImplementationStatus(control.id, latestAssessment),
      implementationDescription: this.getImplementationDescription(control),
      evidence: control.requiredEvidence,
      automationLevel: this.getControlAutomationLevel(control.id),
      testResults: this.getControlTestResults(control.id, latestAssessment)
    }));

    const complianceStatus = {
      overallScore: latestAssessment?.overallScore || 0,
      compliantControls: controlImplementations.filter(c => c.implementationStatus === "implemented").length,
      totalControls: framework.controls.length,
      lastAssessment: latestAssessment?.startDate,
      nextAssessment: latestAssessment?.nextAssessment
    };

    const remediationPlan = this.generateRemediationPlan(latestAssessment);

    const riskAssessment = {
      overallRiskLevel: this.calculateOverallRisk(latestAssessment),
      criticalFindings: latestAssessment?.findings.filter(f => f.severity === "critical").length || 0,
      highFindings: latestAssessment?.findings.filter(f => f.severity === "high").length || 0,
      riskMetrics: latestAssessment?.riskMetrics
    };

    return {
      systemInfo,
      controlImplementations,
      complianceStatus,
      remediationPlan,
      riskAssessment
    };
  }

  private determineSecurityCategorization(system: SystemConfiguration): string {
    // FIPS 199 security categorization logic
    switch (system.type) {
      case "database":
        return "Moderate (Confidentiality: Moderate, Integrity: High, Availability: Moderate)";
      case "cloud":
        return "High (Confidentiality: High, Integrity: High, Availability: High)";
      case "endpoint":
        return "Low (Confidentiality: Low, Integrity: Low, Availability: Low)";
      default:
        return "Moderate (Confidentiality: Moderate, Integrity: Moderate, Availability: Moderate)";
    }
  }

  private getAuthorizedPersonnel(systemId: string): any[] {
    return [
      { role: "System Owner", name: "Chief Information Officer", clearance: "Secret" },
      { role: "ISSO", name: "Information System Security Officer", clearance: "Secret" },
      { role: "System Administrator", name: "IT Operations Manager", clearance: "Public Trust" }
    ];
  }

  private getControlImplementationStatus(controlId: string, assessment?: ComplianceAssessment): string {
    if (!assessment) return "not_started";
    const result = assessment.controlResults.find(r => r.controlId === controlId);
    return result?.implementationStatus || "not_started";
  }

  private getImplementationDescription(control: ComplianceControl): string {
    return `${control.description} Implementation includes ${control.implementation} controls with ${control.requiredEvidence.join(", ")} as evidence.`;
  }

  private getControlAutomationLevel(controlId: string): number {
    // Simulate automation levels based on control type
    const automationMap: Record<string, number> = {
      "AC-2": 85, "AC-3": 90, "AU-2": 95, "AU-3": 95,
      "CM-2": 80, "CM-6": 85, "CM-8": 90, "RA-5": 95,
      "IR-4": 60, "IR-6": 70, "CP-9": 85
    };
    return automationMap[controlId] || 50;
  }

  private getControlTestResults(controlId: string, assessment?: ComplianceAssessment): any {
    if (!assessment) return { status: "not_tested", score: 0 };
    const result = assessment.controlResults.find(r => r.controlId === controlId);
    return {
      status: result?.status || "not_tested",
      score: result?.score || 0,
      lastTested: result?.lastTested || new Date(),
      evidence: result?.evidence || []
    };
  }

  private generateRemediationPlan(assessment?: ComplianceAssessment): any[] {
    if (!assessment) return [];
    
    return assessment.findings
      .filter(f => f.status === "open")
      .sort((a, b) => this.getSeverityWeight(a.severity) - this.getSeverityWeight(b.severity))
      .map(finding => ({
        findingId: finding.id,
        severity: finding.severity,
        title: finding.title,
        recommendation: finding.recommendation,
        timeframe: finding.remediationTimeframe,
        estimatedEffort: this.estimateRemediationEffort(finding),
        priority: this.calculateRemediationPriority(finding)
      }));
  }

  private getSeverityWeight(severity: string): number {
    switch (severity) {
      case "critical": return 1;
      case "high": return 2;
      case "medium": return 3;
      case "low": return 4;
      default: return 5;
    }
  }

  private estimateRemediationEffort(finding: ComplianceFinding): string {
    switch (finding.remediationTimeframe) {
      case "immediate": return "1-2 hours";
      case "30_days": return "1-2 weeks";
      case "90_days": return "4-8 weeks";
      case "annual": return "3-6 months";
      default: return "Unknown";
    }
  }

  private calculateRemediationPriority(finding: ComplianceFinding): number {
    let priority = this.getSeverityWeight(finding.severity);
    if (finding.findingType === "gap") priority -= 1;
    return Math.max(1, Math.min(10, priority));
  }

  private calculateOverallRisk(assessment?: ComplianceAssessment): string {
    if (!assessment) return "Unknown";
    
    const criticalCount = assessment.findings.filter(f => f.severity === "critical").length;
    const highCount = assessment.findings.filter(f => f.severity === "high").length;
    
    if (criticalCount > 0) return "High";
    if (highCount > 2) return "Moderate-High";
    if (highCount > 0) return "Moderate";
    return "Low";
  }
}

export const complianceAutomationEngine = new ComplianceAutomationEngine();