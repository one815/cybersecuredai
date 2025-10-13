import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, integer, jsonb, boolean, index, numeric, check } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Session storage table for Replit Auth
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: varchar("email").notNull().unique(),
  passwordHash: varchar("password_hash"), // Bcrypt hashed password
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  role: varchar("role").notNull().default("user"), // user, admin, faculty, student, compliance_officer, public_health_officer, epidemiologist, contact_tracer, health_facility_admin, emergency_coordinator
  organization: varchar("organization"),
  profileImageUrl: varchar("profile_image_url"),
  isActive: boolean("is_active").default(true),
  lastLogin: timestamp("last_login"),
  mfaEnabled: boolean("mfa_enabled").default(false),
  mfaMethod: varchar("mfa_method").default("none"), // none, totp, biometric, hardware_key, digital_key, yubikey, facial, voice, periocular, 3d_face
  biometricEnabled: boolean("biometric_enabled").default(false),
  digitalKeyEnabled: boolean("digital_key_enabled").default(false),
  totpEnabled: boolean("totp_enabled").default(false),
  hardwareKeyEnabled: boolean("hardware_key_enabled").default(false),
  yubikeyEnabled: boolean("yubikey_enabled").default(false),
  facialRecognitionEnabled: boolean("facial_recognition_enabled").default(false),
  voiceRecognitionEnabled: boolean("voice_recognition_enabled").default(false),
  periocularEnabled: boolean("periocular_enabled").default(false),
  face3dEnabled: boolean("face_3d_enabled").default(false),
  totpSecret: varchar("totp_secret"), // Encrypted TOTP secret
  totpBackupCodes: jsonb("totp_backup_codes"), // Array of backup codes
  biometricData: jsonb("biometric_data"), // Encrypted biometric templates
  hardwareKeyData: jsonb("hardware_key_data"), // Hardware key registration data
  iamProvider: varchar("iam_provider").default("internal"), // internal, okta, azure_ad, onelogin
  iamProviderId: varchar("iam_provider_id"), // External IAM provider user ID
  hsmEnabled: boolean("hsm_enabled").default(false),
  hsmType: varchar("hsm_type"), // thales_luna, yubihsm2, aws_cloud_hsm
  planType: varchar("plan_type").default("standard"), // standard, enterprise, cyber_cloud_essential, cyber_cloud_advanced, cyber_cloud_enterprise, k12_pilot_small, k12_pilot_medium, k12_pilot_large, higher_ed_pilot_small, higher_ed_pilot_medium, higher_ed_pilot_large, hardware_essential, hardware_advanced, hardware_enterprise
  onboardingCompleted: boolean("onboarding_completed").default(false),
  securityPolicyAccepted: boolean("security_policy_accepted").default(false),
  dataPolicyAccepted: boolean("data_policy_accepted").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const threats = pgTable("threats", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  type: varchar("type").notNull(), // malware, phishing, anomaly, etc.
  severity: varchar("severity").notNull(), // low, medium, high, critical
  status: varchar("status").notNull().default("active"), // active, resolved, investigating
  description: text("description"),
  source: varchar("source"),
  detectedAt: timestamp("detected_at").defaultNow(),
  resolvedAt: timestamp("resolved_at"),
  metadata: jsonb("metadata"),
});

export const files = pgTable("files", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: varchar("name").notNull(),
  size: integer("size").notNull(),
  type: varchar("type").notNull(),
  uploadedBy: varchar("uploaded_by").notNull().references(() => users.id),
  encryptionStatus: varchar("encryption_status").notNull().default("encrypted"),
  accessLevel: varchar("access_level").notNull().default("private"), // public, private, restricted
  path: text("path").notNull(),
  checksum: varchar("checksum"),
  uploadedAt: timestamp("uploaded_at").defaultNow(),
});

export const complianceReports = pgTable("compliance_reports", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  framework: varchar("framework").notNull(), // FERPA, FISMA, CIPA
  score: integer("score").notNull(),
  status: varchar("status").notNull(), // compliant, non_compliant, in_progress
  lastAssessment: timestamp("last_assessment").defaultNow(),
  findings: jsonb("findings"),
  recommendations: text("recommendations"),
});

export const incidents = pgTable("incidents", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: varchar("title").notNull(),
  description: text("description"),
  severity: varchar("severity").notNull(),
  status: varchar("status").notNull().default("open"), // open, investigating, resolved
  assignedTo: varchar("assigned_to").references(() => users.id),
  reportedBy: varchar("reported_by").references(() => users.id),
  reportedAt: timestamp("reported_at").defaultNow(),
  resolvedAt: timestamp("resolved_at"),
  metadata: jsonb("metadata"),
});

export const auditLogs = pgTable("audit_logs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id),
  action: varchar("action").notNull(),
  resource: varchar("resource").notNull(),
  details: jsonb("details"),
  ipAddress: varchar("ip_address"),
  userAgent: text("user_agent"),
  timestamp: timestamp("timestamp").defaultNow(),
});

export const tickets = pgTable("tickets", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  ticketNumber: varchar("ticket_number").notNull().unique(), // AUTO-generated format: CYBER-YYYYMMDD-XXXX
  title: varchar("title").notNull(),
  description: text("description").notNull(),
  category: varchar("category").notNull(), // general, technical, security, compliance, billing, emergency
  priority: varchar("priority").notNull().default("medium"), // low, medium, high, critical
  status: varchar("status").notNull().default("open"), // open, in_progress, pending_customer, resolved, closed
  submitterName: varchar("submitter_name").notNull(),
  submitterEmail: varchar("submitter_email").notNull(),
  submitterOrganization: varchar("submitter_organization"),
  submitterPhone: varchar("submitter_phone"),
  assignedTo: varchar("assigned_to").references(() => users.id),
  assignedTeam: varchar("assigned_team"), // support, security, engineering, compliance
  submittedAt: timestamp("submitted_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  resolvedAt: timestamp("resolved_at"),
  closedAt: timestamp("closed_at"),
  resolutionNotes: text("resolution_notes"),
  customerSatisfactionRating: integer("customer_satisfaction_rating"), // 1-5 scale
  internalNotes: text("internal_notes"), // Private notes for staff
  metadata: jsonb("metadata"), // Additional custom fields
  escalated: boolean("escalated").default(false),
  escalatedAt: timestamp("escalated_at"),
  escalatedReason: text("escalated_reason"),
  slaDeadline: timestamp("sla_deadline"), // SLA response deadline
  firstResponseAt: timestamp("first_response_at"),
  tags: jsonb("tags"), // Array of tags for categorization
});

export const threatNotifications = pgTable("threat_notifications", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  threatId: varchar("threat_id").notNull().references(() => threats.id),
  userId: varchar("user_id").references(() => users.id),
  title: varchar("title").notNull(),
  message: text("message").notNull(),
  severity: varchar("severity").notNull(), // critical, high, medium, low
  category: varchar("category").notNull(), // malware, phishing, breach, anomaly, system
  isRead: boolean("is_read").default(false),
  isAcknowledged: boolean("is_acknowledged").default(false),
  actionRequired: boolean("action_required").default(false),
  priority: integer("priority").default(3), // 1=urgent, 2=high, 3=normal, 4=low
  metadata: jsonb("metadata"),
  createdAt: timestamp("created_at").defaultNow(),
  acknowledgedAt: timestamp("acknowledged_at"),
  expiresAt: timestamp("expires_at"),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertThreatSchema = createInsertSchema(threats).omit({
  id: true,
  detectedAt: true,
});

export const insertFileSchema = createInsertSchema(files).omit({
  id: true,
  uploadedAt: true,
});

export const insertIncidentSchema = createInsertSchema(incidents).omit({
  id: true,
  reportedAt: true,
});

// CyberSecure Package Definitions
export const packages = pgTable("packages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: varchar("name").notNull(),
  category: varchar("category").notNull(), // cloud_security, edu_pilot, hardware, integrated
  tier: varchar("tier").notNull(), // essential, advanced, enterprise, small, medium, large
  targetAudience: text("target_audience").notNull(),
  priceRangeMin: integer("price_range_min").notNull(),
  priceRangeMax: integer("price_range_max").notNull(),
  billingCycle: varchar("billing_cycle").default("annual"), // monthly, annual, one_time
  maxUsers: integer("max_users"),
  maxEndpoints: integer("max_endpoints"),
  coverageAreaSqFt: integer("coverage_area_sq_ft"),
  features: jsonb("features").notNull(),
  components: jsonb("components").notNull(),
  implementationPeriod: varchar("implementation_period"), // e.g., "3-month", "4-month"
  supportLevel: varchar("support_level").default("standard"), // basic, standard, premium
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

// Custom Compliance Frameworks (Enterprise Feature)
export const customComplianceFrameworks = pgTable("custom_compliance_frameworks", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  organizationId: varchar("organization_id").notNull(),
  frameworkId: varchar("framework_id").notNull().unique(), // unique identifier like "acme-security-2024"
  name: varchar("name").notNull(),
  fullName: text("full_name").notNull(),
  description: text("description"),
  sector: varchar("sector").notNull().default("custom"), // custom, industry_specific, regulatory
  version: varchar("version").notNull().default("1.0"),
  isActive: boolean("is_active").default(true),
  createdBy: varchar("created_by").notNull().references(() => users.id),
  lastModifiedBy: varchar("last_modified_by").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Custom Compliance Controls (Enterprise Feature)
export const customComplianceControls = pgTable("custom_compliance_controls", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  frameworkId: varchar("framework_id").notNull().references(() => customComplianceFrameworks.frameworkId),
  controlId: varchar("control_id").notNull(), // e.g., "ACME-AC-001"
  title: varchar("title").notNull(),
  description: text("description").notNull(),
  category: varchar("category").notNull().default("custom"), // access_control, audit, data_protection, network_security, incident_response, risk_management, custom
  priority: varchar("priority").notNull().default("medium"), // critical, high, medium, low
  implementation: varchar("implementation").notNull().default("manual"), // manual, automated, hybrid
  requiredEvidence: jsonb("required_evidence").default('[]'), // Array of evidence requirements
  testMethods: jsonb("test_methods").default('[]'), // Array of test methods
  complianceStatement: text("compliance_statement"), // What needs to be achieved
  implementationGuidance: text("implementation_guidance"), // How to implement
  assessmentCriteria: text("assessment_criteria"), // How to assess compliance
  isActive: boolean("is_active").default(true),
  createdBy: varchar("created_by").notNull().references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// User Package Subscriptions
export const userSubscriptions = pgTable("user_subscriptions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  packageId: varchar("package_id").notNull().references(() => packages.id),
  status: varchar("status").notNull().default("active"), // active, suspended, cancelled, trial
  startDate: timestamp("start_date").defaultNow(),
  endDate: timestamp("end_date"),
  autoRenew: boolean("auto_renew").default(true),
  customFeatures: jsonb("custom_features"), // For enterprise customizations
  contractValue: integer("contract_value"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertThreatNotificationSchema = createInsertSchema(threatNotifications).omit({
  id: true,
  createdAt: true,
});

export const insertPackageSchema = createInsertSchema(packages).omit({
  id: true,
  createdAt: true,
});

export const insertUserSubscriptionSchema = createInsertSchema(userSubscriptions).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertCustomComplianceFrameworkSchema = createInsertSchema(customComplianceFrameworks).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertCustomComplianceControlSchema = createInsertSchema(customComplianceControls).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type UpsertUser = typeof users.$inferInsert;
export type Threat = typeof threats.$inferSelect;
export type InsertThreat = z.infer<typeof insertThreatSchema>;
export type File = typeof files.$inferSelect;
export type InsertFile = z.infer<typeof insertFileSchema>;
export type ComplianceReport = typeof complianceReports.$inferSelect;
export type Incident = typeof incidents.$inferSelect;
export type InsertIncident = z.infer<typeof insertIncidentSchema>;
export type AuditLog = typeof auditLogs.$inferSelect;
export type ThreatNotification = typeof threatNotifications.$inferSelect;
export type InsertThreatNotification = z.infer<typeof insertThreatNotificationSchema>;
export type Package = typeof packages.$inferSelect;
export type InsertPackage = z.infer<typeof insertPackageSchema>;
export type UserSubscription = typeof userSubscriptions.$inferSelect;
export type InsertUserSubscription = z.infer<typeof insertUserSubscriptionSchema>;
export type CustomComplianceFramework = typeof customComplianceFrameworks.$inferSelect;
export type InsertCustomComplianceFramework = z.infer<typeof insertCustomComplianceFrameworkSchema>;
export type CustomComplianceControl = typeof customComplianceControls.$inferSelect;
export type InsertCustomComplianceControl = z.infer<typeof insertCustomComplianceControlSchema>;

// Achievement Badges System
export const achievementBadges = pgTable("achievement_badges", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  badgeId: varchar("badge_id").notNull().unique(), // e.g., "ferpa_bronze", "nist_gold"
  name: varchar("name").notNull(),
  description: text("description").notNull(),
  icon: varchar("icon").notNull().default("award"),
  tier: varchar("tier").notNull(), // bronze, silver, gold, platinum, diamond
  category: varchar("category").notNull(), // framework_completion, multi_framework, improvement, streak
  frameworkId: varchar("framework_id"), // Associated framework (null for multi-framework badges)
  criteria: jsonb("criteria").notNull(), // Badge earning criteria
  pointsValue: integer("points_value").notNull().default(0),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

// User Badge Collections
export const userBadges = pgTable("user_badges", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  badgeId: varchar("badge_id").notNull().references(() => achievementBadges.badgeId),
  earnedDate: timestamp("earned_date").defaultNow(),
  achievementScore: integer("achievement_score"), // Score when badge was earned
  frameworkId: varchar("framework_id"), // Framework associated when earned
  metadata: jsonb("metadata"), // Additional data about the achievement
});

// User Achievement Stats
export const userAchievementStats = pgTable("user_achievement_stats", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id).unique(),
  totalBadges: integer("total_badges").default(0),
  totalPoints: integer("total_points").default(0),
  bronzeBadges: integer("bronze_badges").default(0),
  silverBadges: integer("silver_badges").default(0),
  goldBadges: integer("gold_badges").default(0),
  platinumBadges: integer("platinum_badges").default(0),
  diamondBadges: integer("diamond_badges").default(0),
  currentStreak: integer("current_streak").default(0), // Days with compliance activity
  longestStreak: integer("longest_streak").default(0),
  lastActivity: timestamp("last_activity"),
  level: integer("level").default(1), // Gamification level based on points
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Hardware Security Integration
export const hardwareSecurityDevices = pgTable("hardware_security_devices", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  deviceType: varchar("device_type").notNull(), // hsm, yubikey, biometric_scanner, firewall, ips, waf
  deviceModel: varchar("device_model").notNull(), // thales_luna, yubihsm2, aws_cloud_hsm, palo_alto_5220, cisco_firepower_2130, f5_bigip_asm
  serialNumber: varchar("serial_number"),
  firmwareVersion: varchar("firmware_version"),
  status: varchar("status").notNull().default("active"), // active, inactive, maintenance, failed
  lastHealthCheck: timestamp("last_health_check"),
  configuration: jsonb("configuration"), // Device-specific configuration
  credentials: jsonb("credentials"), // Encrypted device credentials
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Biometric Authentication Records
export const biometricAuthRecords = pgTable("biometric_auth_records", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  biometricType: varchar("biometric_type").notNull(), // facial, voice, periocular, 3d_face, fingerprint
  provider: varchar("provider").notNull(), // auth0, bioid, facetec, internal
  templateId: varchar("template_id").notNull(), // External provider template ID
  templateData: jsonb("template_data"), // Encrypted biometric template
  confidence: integer("confidence"), // Authentication confidence score
  enrollmentDate: timestamp("enrollment_date").defaultNow(),
  lastUsed: timestamp("last_used"),
  isActive: boolean("is_active").default(true),
});

// IAM Integration Records
export const iamIntegrations = pgTable("iam_integrations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  organizationId: varchar("organization_id").notNull(),
  provider: varchar("provider").notNull(), // okta, azure_ad, onelogin
  tenantId: varchar("tenant_id").notNull(),
  clientId: varchar("client_id").notNull(),
  configuration: jsonb("configuration"), // Provider-specific config
  credentials: jsonb("credentials"), // Encrypted provider credentials
  syncEnabled: boolean("sync_enabled").default(true),
  lastSync: timestamp("last_sync"),
  status: varchar("status").notNull().default("active"), // active, inactive, error
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Security Infrastructure Monitoring
export const securityInfrastructure = pgTable("security_infrastructure", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  organizationId: varchar("organization_id").notNull(),
  deviceType: varchar("device_type").notNull(), // firewall, ips, waf, switch, router
  deviceModel: varchar("device_model").notNull(),
  ipAddress: varchar("ip_address"),
  location: varchar("location"),
  status: varchar("status").notNull().default("active"), // active, inactive, maintenance, failed
  lastHeartbeat: timestamp("last_heartbeat"),
  configuration: jsonb("configuration"),
  metrics: jsonb("metrics"), // Performance and security metrics
  alerts: jsonb("alerts"), // Active alerts and notifications
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Enhanced Threat Intelligence Sources
export const threatIntelligenceSources = pgTable("threat_intelligence_sources", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: varchar("name").notNull(),
  provider: varchar("provider").notNull(), // misp, virustotal, otx, crowdstrike, ibm_xforce
  apiEndpoint: varchar("api_endpoint"),
  credentialsId: varchar("credentials_id"), // Reference to encrypted credentials
  feedType: varchar("feed_type").notNull(), // ioc, malware, vulnerability, reputation
  dataFormat: varchar("data_format").notNull(), // json, xml, csv, stix
  updateFrequency: integer("update_frequency").default(3600), // Seconds between updates
  isActive: boolean("is_active").default(true),
  lastUpdate: timestamp("last_update"),
  recordsProcessed: integer("records_processed").default(0),
  status: varchar("status").notNull().default("healthy"), // healthy, error, rate_limited
  configuration: jsonb("configuration"),
  createdAt: timestamp("created_at").defaultNow(),
});

// ===== PUBLIC HEALTH SECTOR INTEGRATION TABLES =====

// 1. Public Health Incidents Table - Disease outbreaks, health emergencies, contamination events
export const publicHealthIncidents = pgTable("public_health_incidents", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  incidentId: varchar("incident_id").notNull().unique(), // PHI-YYYYMMDD-XXXX format
  title: varchar("title").notNull(),
  description: text("description").notNull(),
  incidentType: varchar("incident_type").notNull(), // disease_outbreak, contamination, bioterrorism, pandemic, epidemic, health_emergency
  diseaseType: varchar("disease_type"), // covid19, influenza, measles, foodborne, etc.
  severity: varchar("severity").notNull(), // low, medium, high, critical, catastrophic
  status: varchar("status").notNull().default("investigating"), // investigating, active, contained, resolved, monitoring
  priority: varchar("priority").notNull().default("medium"), // low, medium, high, critical, emergency
  
  // Geographic and Location Data
  affectedRegion: varchar("affected_region").notNull(),
  latitude: numeric("latitude", { precision: 10, scale: 8 }),
  longitude: numeric("longitude", { precision: 11, scale: 8 }),
  radiusMeters: integer("radius_meters"), // Affected area radius
  geographicScope: varchar("geographic_scope").notNull(), // local, regional, state, national, international
  boundaryData: jsonb("boundary_data"), // GeoJSON polygon data for affected areas
  
  // Health Impact Metrics
  casesConfirmed: integer("cases_confirmed").default(0),
  casesSuspected: integer("cases_suspected").default(0),
  casesRecovered: integer("cases_recovered").default(0),
  deathsConfirmed: integer("deaths_confirmed").default(0),
  hospitalizationsRequired: integer("hospitalizations_required").default(0),
  populationAtRisk: integer("population_at_risk"),
  demographicImpact: jsonb("demographic_impact"), // Age groups, gender, vulnerable populations
  
  // Response and Management
  responseLevel: varchar("response_level").notNull().default("local"), // local, regional, state, federal, international
  responseTeamAssigned: varchar("response_team_assigned").references(() => users.id),
  emergencyCoordinator: varchar("emergency_coordinator").references(() => users.id),
  publicHealthOfficer: varchar("public_health_officer").references(() => users.id),
  
  // Integration with Existing Systems
  relatedThreatId: varchar("related_threat_id").references(() => threats.id),
  relatedIncidentId: varchar("related_incident_id").references(() => incidents.id),
  triggeredByAlertId: varchar("triggered_by_alert_id").references(() => threatNotifications.id),
  
  // CDC Integration and Reporting
  cdcReported: boolean("cdc_reported").default(false),
  cdcReportingId: varchar("cdc_reporting_id"), // CDC case identifier
  cdcReportingData: jsonb("cdc_reporting_data"), // CDC-specific data format
  cdcClassification: varchar("cdc_classification"), // CDC disease classification
  notifiableCondition: boolean("notifiable_condition").default(false),
  reportingRequirements: jsonb("reporting_requirements"), // Required reporting data
  
  // HIPAA Compliance and Privacy
  dataClassification: varchar("data_classification").notNull().default("phi"), // phi, pii, public, restricted
  encryptionStatus: varchar("encryption_status").notNull().default("encrypted"),
  accessLevel: varchar("access_level").notNull().default("authorized_only"), // public, authorized_only, restricted, emergency_only
  hipaaCompliant: boolean("hipaa_compliant").default(true),
  dataRetentionPolicy: varchar("data_retention_policy").default("7_years"), // CDC standard retention
  anonymizationLevel: varchar("anonymization_level").default("identifiable"), // identifiable, de_identified, anonymous
  
  // Temporal Tracking
  firstReportedAt: timestamp("first_reported_at"),
  confirmedAt: timestamp("confirmed_at"),
  detectedAt: timestamp("detected_at").defaultNow(),
  peakAt: timestamp("peak_at"),
  resolvedAt: timestamp("resolved_at"),
  lastUpdatedAt: timestamp("last_updated_at").defaultNow(),
  
  // Audit and Compliance
  createdBy: varchar("created_by").notNull().references(() => users.id),
  lastModifiedBy: varchar("last_modified_by").references(() => users.id),
  accessLog: jsonb("access_log").default('[]'), // Who accessed PHI data
  modificationLog: jsonb("modification_log").default('[]'), // Changes made to incident
  
  // Additional Metadata
  metadata: jsonb("metadata"),
  emergencyContacts: jsonb("emergency_contacts"), // Emergency response contacts
  resourceRequirements: jsonb("resource_requirements"), // Required resources and supplies
  communicationPlan: jsonb("communication_plan"), // Public communication strategy
  
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
}, (table) => [
  index("idx_phi_location").on(table.latitude, table.longitude),
  index("idx_phi_type_severity").on(table.incidentType, table.severity),
  index("idx_phi_status_date").on(table.status, table.detectedAt),
  index("idx_phi_temporal_reporting").on(table.firstReportedAt),
  index("idx_phi_temporal_confirmed").on(table.confirmedAt),
  index("idx_phi_temporal_resolved").on(table.resolvedAt),
  index("idx_phi_priority_status").on(table.priority, table.status),
  // Partial index for active incidents for better performance
  index("idx_phi_active_incidents").on(table.status, table.priority).where(sql`status IN ('investigating', 'active', 'monitoring')`),
  // CHECK constraints for data integrity
  check("chk_phi_severity", sql`severity IN ('low', 'medium', 'high', 'critical', 'catastrophic')`),
  check("chk_phi_status", sql`status IN ('investigating', 'active', 'contained', 'resolved', 'monitoring')`),
  check("chk_phi_priority", sql`priority IN ('low', 'medium', 'high', 'critical', 'emergency')`),
  check("chk_phi_response_level", sql`response_level IN ('local', 'regional', 'state', 'federal', 'international')`),
]);

// 2. Disease Surveillance Table - Disease types, transmission patterns, epidemiological data
export const diseaseSurveillance = pgTable("disease_surveillance", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  surveillanceId: varchar("surveillance_id").notNull().unique(), // SUR-YYYYMMDD-XXXX format
  diseaseCode: varchar("disease_code").notNull(), // ICD-10 or CDC disease codes
  diseaseName: varchar("disease_name").notNull(),
  diseaseCategory: varchar("disease_category").notNull(), // infectious, chronic, genetic, environmental, behavioral
  
  // Epidemiological Data
  transmissionMode: varchar("transmission_mode"), // airborne, contact, vector_borne, foodborne, waterborne, sexual
  incubationPeriod: integer("incubation_period"), // Days
  infectiousPeriod: integer("infectious_period"), // Days
  basicReproductionNumber: varchar("basic_reproduction_number"), // R0 value
  caseDefinition: text("case_definition"),
  clinicalPresentation: text("clinical_presentation"),
  diagnosticCriteria: text("diagnostic_criteria"),
  
  // Geographic Tracking
  surveillanceArea: varchar("surveillance_area").notNull(),
  latitude: numeric("latitude", { precision: 10, scale: 8 }),
  longitude: numeric("longitude", { precision: 11, scale: 8 }),
  coverageRadius: integer("coverage_radius"), // Surveillance area radius in meters
  populationCovered: integer("population_covered"),
  geographicScope: varchar("geographic_scope").notNull(), // local, regional, state, national
  boundaryData: jsonb("boundary_data"), // GeoJSON for surveillance boundaries
  
  // Case Tracking
  activeCases: integer("active_cases").default(0),
  totalCases: integer("total_cases").default(0),
  newCasesLastWeek: integer("new_cases_last_week").default(0),
  newCasesLastMonth: integer("new_cases_last_month").default(0),
  casesByAgeGroup: jsonb("cases_by_age_group").default('{}'),
  casesByGender: jsonb("cases_by_gender").default('{}'),
  casesByRace: jsonb("cases_by_race").default('{}'),
  hospitalizations: integer("hospitalizations").default(0),
  deaths: integer("deaths").default(0),
  caseMapping: jsonb("case_mapping"), // Geographic distribution of cases
  
  // Transmission Analysis
  transmissionPatterns: jsonb("transmission_patterns"),
  clusterAnalysis: jsonb("cluster_analysis"),
  superspreaderEvents: jsonb("superspreader_events"),
  contactNetworks: jsonb("contact_networks"),
  riskFactors: jsonb("risk_factors"),
  vulnerablePopulations: jsonb("vulnerable_populations"),
  
  // Surveillance Methods
  surveillanceType: varchar("surveillance_type").notNull(), // active, passive, sentinel, syndromic
  dataSource: varchar("data_source").notNull(), // hospital, laboratory, physician, self_report, syndromic
  reportingFrequency: varchar("reporting_frequency").default("daily"), // real_time, daily, weekly, monthly
  dataQuality: varchar("data_quality").default("high"), // high, medium, low, unverified
  completenessScore: integer("completeness_score").default(100), // 0-100 data completeness
  
  // CDC Integration
  cdcSurveillanceProgram: varchar("cdc_surveillance_program"), // NNDSS, NEDSS, etc.
  cdcConditionCode: varchar("cdc_condition_code"), // CDC condition coding
  cdcReportingData: jsonb("cdc_reporting_data"),
  nhsnCondition: boolean("nhsn_condition").default(false), // Healthcare-associated infection
  laboratoryCriteria: text("laboratory_criteria"),
  
  // Contact Tracing Integration
  contactTracingActive: boolean("contact_tracing_active").default(false),
  averageContactsPerCase: integer("average_contacts_per_case"),
  contactTracingCoverage: integer("contact_tracing_coverage"), // Percentage
  
  // HIPAA Compliance
  dataClassification: varchar("data_classification").notNull().default("phi"),
  encryptionStatus: varchar("encryption_status").notNull().default("encrypted"),
  accessLevel: varchar("access_level").notNull().default("authorized_only"),
  hipaaCompliant: boolean("hipaa_compliant").default(true),
  aggregationLevel: varchar("aggregation_level").default("individual"), // individual, aggregated, anonymized
  
  // Personnel
  surveillanceOfficer: varchar("surveillance_officer").notNull().references(() => users.id),
  epidemiologist: varchar("epidemiologist").references(() => users.id),
  dataAnalyst: varchar("data_analyst").references(() => users.id),
  
  // Temporal Data
  surveillancePeriodStart: timestamp("surveillance_period_start").notNull(),
  surveillancePeriodEnd: timestamp("surveillance_period_end"),
  lastCaseReported: timestamp("last_case_reported"),
  nextReviewDate: timestamp("next_review_date"),
  
  // Audit Trail
  createdBy: varchar("created_by").notNull().references(() => users.id),
  lastModifiedBy: varchar("last_modified_by").references(() => users.id),
  accessLog: jsonb("access_log").default('[]'),
  modificationLog: jsonb("modification_log").default('[]'),
  
  metadata: jsonb("metadata"),
  alertThresholds: jsonb("alert_thresholds"), // Thresholds for automated alerts
  statisticalModels: jsonb("statistical_models"), // Predictive models in use
  
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
}, (table) => [
  index("idx_ds_disease_area").on(table.diseaseCode, table.surveillanceArea),
  index("idx_ds_geographic").on(table.latitude, table.longitude),
  index("idx_ds_temporal").on(table.surveillancePeriodStart, table.surveillancePeriodEnd),
  index("idx_ds_first_detected").on(table.surveillancePeriodStart),
  index("idx_ds_last_updated").on(table.updatedAt),
  index("idx_ds_transmission_type").on(table.transmissionMode),
  index("idx_ds_surveillance_type").on(table.surveillanceType, table.dataQuality),
  // CHECK constraints for data integrity
  check("chk_ds_surveillance_type", sql`surveillance_type IN ('active', 'passive', 'sentinel', 'syndromic')`),
  check("chk_ds_data_quality", sql`data_quality IN ('high', 'medium', 'low', 'unverified')`),
  check("chk_ds_transmission_mode", sql`transmission_mode IN ('airborne', 'contact', 'vector_borne', 'foodborne', 'waterborne', 'sexual')`),
  // Geospatial validation constraints
  check("chk_ds_latitude_range", sql`latitude IS NULL OR (latitude >= -90 AND latitude <= 90)`),
  check("chk_ds_longitude_range", sql`longitude IS NULL OR (longitude >= -180 AND longitude <= 180)`),
]);

// 3. Contact Tracing Table - Individual contact records with privacy compliance
export const contactTracing = pgTable("contact_tracing", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  contactId: varchar("contact_id").notNull().unique(), // CT-YYYYMMDD-XXXX format
  
  // Case and Contact Information
  indexCaseId: varchar("index_case_id"), // Reference to primary case
  surveillanceId: varchar("surveillance_id").references(() => diseaseSurveillance.id),
  incidentId: varchar("incident_id").references(() => publicHealthIncidents.id),
  
  // Contact Person Data (HIPAA Protected)
  contactPersonId: varchar("contact_person_id"), // Internal unique identifier
  contactType: varchar("contact_type").notNull(), // direct, indirect, household, workplace, social, healthcare
  relationshipToCase: varchar("relationship_to_case"), // family, coworker, friend, healthcare_worker, unknown
  
  // Exposure Details
  exposureDate: timestamp("exposure_date"),
  exposureDuration: integer("exposure_duration"), // Minutes of exposure
  exposureLocation: varchar("exposure_location"),
  exposureLatitude: numeric("exposure_latitude", { precision: 10, scale: 8 }),
  exposureLongitude: numeric("exposure_longitude", { precision: 11, scale: 8 }),
  exposureType: varchar("exposure_type"), // close_contact, casual_contact, environmental, unknown
  exposureSetting: varchar("exposure_setting"), // home, workplace, healthcare, social, transport, other
  protectiveEquipmentUsed: jsonb("protective_equipment_used"),
  riskLevel: varchar("risk_level").notNull(), // high, medium, low, minimal
  
  // Contact Status and Monitoring
  contactStatus: varchar("contact_status").notNull().default("identified"), // identified, contacted, monitoring, quarantined, tested, cleared, lost
  monitoringPeriod: integer("monitoring_period").default(14), // Days
  monitoringStartDate: timestamp("monitoring_start_date"),
  monitoringEndDate: timestamp("monitoring_end_date"),
  quarantineRequired: boolean("quarantine_required").default(false),
  quarantineStartDate: timestamp("quarantine_start_date"),
  quarantineEndDate: timestamp("quarantine_end_date"),
  quarantineLocation: varchar("quarantine_location"), // home, facility, other
  quarantineCompliance: varchar("quarantine_compliance"), // compliant, non_compliant, partial, unknown
  
  // Health Monitoring
  symptomOnset: timestamp("symptom_onset"),
  symptomsReported: jsonb("symptoms_reported"),
  testingRecommended: boolean("testing_recommended").default(false),
  testingCompleted: boolean("testing_completed").default(false),
  testResults: jsonb("test_results"),
  healthStatus: varchar("health_status").default("asymptomatic"), // asymptomatic, symptomatic, confirmed_case, hospitalized, recovered
  
  // Communication and Notifications
  contactAttempts: integer("contact_attempts").default(0),
  lastContactDate: timestamp("last_contact_date"),
  contactMethod: varchar("contact_method"), // phone, sms, email, in_person, app
  notificationSent: boolean("notification_sent").default(false),
  notificationMethod: varchar("notification_method"), // automated, manual, app_notification
  consentToContact: boolean("consent_to_contact").default(false),
  consentToMonitor: boolean("consent_to_monitor").default(false),
  
  // Digital Contact Tracing Integration
  digitalTracingData: jsonb("digital_tracing_data"), // Bluetooth, GPS, app data
  exposureNotificationSent: boolean("exposure_notification_sent").default(false),
  bluetoothProximityData: jsonb("bluetooth_proximity_data"),
  gpsLocationData: jsonb("gps_location_data"), // Encrypted location data
  
  // HIPAA Compliance and Privacy
  dataClassification: varchar("data_classification").notNull().default("phi"),
  encryptionStatus: varchar("encryption_status").notNull().default("aes256_encrypted"),
  accessLevel: varchar("access_level").notNull().default("contact_tracer_only"),
  hipaaCompliant: boolean("hipaa_compliant").default(true),
  privacyLevel: varchar("privacy_level").notNull().default("maximum"), // maximum, high, standard, minimal
  dataMinimization: boolean("data_minimization").default(true), // Only collect necessary data
  purposeLimitation: varchar("purpose_limitation").default("contact_tracing"), // Purpose of data collection
  retentionPeriod: varchar("retention_period").default("30_days"), // Data retention period
  automaticPurgeDate: timestamp("automatic_purge_date"),
  
  // Legal and Consent
  legalBasis: varchar("legal_basis").default("public_health_emergency"), // Legal basis for data processing
  consentGiven: boolean("consent_given").default(false),
  consentType: varchar("consent_type"), // explicit, implied, emergency, legal_requirement
  consentDate: timestamp("consent_date"),
  rightToWithdraw: boolean("right_to_withdraw").default(true),
  dataPortabilityRequested: boolean("data_portability_requested").default(false),
  deletionRequested: boolean("deletion_requested").default(false),
  
  // Contact Tracer Information
  assignedContactTracer: varchar("assigned_contact_tracer").notNull().references(() => users.id),
  supervisingOfficer: varchar("supervising_officer").references(() => users.id),
  
  // System Integration
  reportedToPublicHealth: boolean("reported_to_public_health").default(false),
  integratedWithHIS: boolean("integrated_with_his").default(false), // Health Information System
  caseInvestigationId: varchar("case_investigation_id"),
  
  // Quality and Completeness
  dataQuality: varchar("data_quality").default("high"), // high, medium, low, incomplete
  verificationStatus: varchar("verification_status").default("pending"), // verified, pending, unverified, rejected
  
  // Audit and Security
  createdBy: varchar("created_by").notNull().references(() => users.id),
  lastModifiedBy: varchar("last_modified_by").references(() => users.id),
  accessLog: jsonb("access_log").default('[]'), // Detailed access logging for HIPAA
  modificationLog: jsonb("modification_log").default('[]'),
  securityFlags: jsonb("security_flags").default('[]'), // Security alerts or concerns
  
  metadata: jsonb("metadata"),
  notes: text("notes"), // Contact tracer notes (encrypted)
  
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
}, (table) => [
  index("idx_ct_case_contact").on(table.indexCaseId, table.contactType),
  index("idx_ct_status_date").on(table.contactStatus, table.monitoringStartDate),
  index("idx_ct_exposure_location").on(table.exposureLatitude, table.exposureLongitude),
  index("idx_ct_tracer").on(table.assignedContactTracer),
  index("idx_ct_exposure_date").on(table.exposureDate),
  index("idx_ct_notification_status").on(table.notificationSent, table.consentToContact),
  index("idx_ct_risk_level").on(table.riskLevel, table.contactStatus),
  // CHECK constraints for data integrity
  check("chk_ct_contact_status", sql`contact_status IN ('identified', 'contacted', 'monitoring', 'quarantined', 'tested', 'cleared', 'lost')`),
  check("chk_ct_risk_level", sql`risk_level IN ('high', 'medium', 'low', 'minimal')`),
  check("chk_ct_exposure_type", sql`exposure_type IN ('close_contact', 'casual_contact', 'environmental', 'unknown')`),
  // Geospatial validation constraints
  check("chk_ct_latitude_range", sql`exposure_latitude IS NULL OR (exposure_latitude >= -90 AND exposure_latitude <= 90)`),
  check("chk_ct_longitude_range", sql`exposure_longitude IS NULL OR (exposure_longitude >= -180 AND exposure_longitude <= 180)`),
]);

// 4. Health Facilities Table - Hospitals, clinics, testing centers, emergency facilities
export const healthFacilities = pgTable("health_facilities", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  facilityId: varchar("facility_id").notNull().unique(), // HF-XXXXXX format
  
  // Basic Facility Information
  facilityName: varchar("facility_name").notNull(),
  facilityType: varchar("facility_type").notNull(), // hospital, clinic, testing_center, emergency_facility, nursing_home, pharmacy, laboratory
  licenseNumber: varchar("license_number"),
  npiNumber: varchar("npi_number"), // National Provider Identifier
  federalTaxId: varchar("federal_tax_id"),
  
  // Location and Geographic Data
  address: text("address").notNull(),
  city: varchar("city").notNull(),
  state: varchar("state").notNull(),
  zipCode: varchar("zip_code").notNull(),
  county: varchar("county"),
  latitude: numeric("latitude", { precision: 10, scale: 8 }),
  longitude: numeric("longitude", { precision: 11, scale: 8 }),
  serviceArea: jsonb("service_area"), // GeoJSON of service boundaries
  serviceRadius: integer("service_radius"), // Service radius in meters
  
  // Contact Information
  primaryPhone: varchar("primary_phone"),
  emergencyPhone: varchar("emergency_phone"),
  faxNumber: varchar("fax_number"),
  email: varchar("email"),
  website: varchar("website"),
  
  // Facility Characteristics
  ownershipType: varchar("ownership_type"), // public, private, non_profit, federal, state, county
  hospitalSystem: varchar("hospital_system"),
  networkAffiliation: varchar("network_affiliation"),
  accreditation: jsonb("accreditation"), // Joint Commission, etc.
  certifications: jsonb("certifications"),
  specialties: jsonb("specialties"), // Medical specialties offered
  
  // Capacity Information
  totalBeds: integer("total_beds").default(0),
  availableBeds: integer("available_beds").default(0),
  icuBeds: integer("icu_beds").default(0),
  availableIcuBeds: integer("available_icu_beds").default(0),
  emergencyBeds: integer("emergency_beds").default(0),
  surgicalSuites: integer("surgical_suites").default(0),
  isolationBeds: integer("isolation_beds").default(0),
  availableIsolationBeds: integer("available_isolation_beds").default(0),
  negativePressureRooms: integer("negative_pressure_rooms").default(0),
  staffCount: integer("staff_count").default(0),
  physicianCount: integer("physician_count").default(0),
  nurseCount: integer("nurse_count").default(0),
  
  // Equipment and Resources
  ventilators: integer("ventilators").default(0),
  availableVentilators: integer("available_ventilators").default(0),
  dialysisMachines: integer("dialysis_machines").default(0),
  xrayMachines: integer("xray_machines").default(0),
  ctScanners: integer("ct_scanners").default(0),
  mriMachines: integer("mri_machines").default(0),
  ambulances: integer("ambulances").default(0),
  personalProtectiveEquipment: jsonb("personal_protective_equipment"),
  medicationInventory: jsonb("medication_inventory"),
  bloodBankCapacity: integer("blood_bank_capacity").default(0),
  
  // Testing Capabilities
  testingCapabilities: jsonb("testing_capabilities"), // COVID, flu, etc.
  dailyTestingCapacity: integer("daily_testing_capacity").default(0),
  currentTestingLoad: integer("current_testing_load").default(0),
  labCapabilities: jsonb("lab_capabilities"),
  resultTurnaroundTime: integer("result_turnaround_time"), // Hours
  
  // Emergency Preparedness
  emergencyLevel: varchar("emergency_level").default("green"), // green, yellow, orange, red, black
  emergencyCapacity: integer("emergency_capacity").default(0),
  surgeCapacity: integer("surge_capacity").default(0),
  decontaminationCapability: boolean("decontamination_capability").default(false),
  quarantineCapability: boolean("quarantine_capability").default(false),
  emergencyPower: boolean("emergency_power").default(false),
  emergencyWaterSupply: boolean("emergency_water_supply").default(false),
  emergencyPlan: jsonb("emergency_plan"),
  evacuationPlan: jsonb("evacuation_plan"),
  
  // Operational Status
  operationalStatus: varchar("operational_status").notNull().default("operational"), // operational, limited, closed, emergency_only
  serviceCapability: integer("service_capability").default(100), // Percentage of normal operations
  staffingLevel: varchar("staffing_level").default("normal"), // normal, reduced, critical, crisis
  lastCapacityUpdate: timestamp("last_capacity_update"),
  
  // Public Health Integration
  publicHealthReporting: boolean("public_health_reporting").default(true),
  cdcReporting: boolean("cdc_reporting").default(false),
  nhsnParticipant: boolean("nhsn_participant").default(false), // National Healthcare Safety Network
  hieParticipant: boolean("hie_participant").default(false), // Health Information Exchange
  notifiableConditionsReporting: boolean("notifiable_conditions_reporting").default(true),
  
  // Quality and Performance Metrics
  qualityRating: integer("quality_rating"), // CMS star rating
  patientSatisfactionScore: integer("patient_satisfaction_score"), // 0-100
  safetyScore: integer("safety_score"), // 0-100
  performanceMetrics: jsonb("performance_metrics"),
  
  // Compliance and Accreditation
  hipaaCompliant: boolean("hipaa_compliant").default(true),
  hiTechCompliant: boolean("hi_tech_compliant").default(true),
  emtalaCompliant: boolean("emtala_compliant").default(true),
  oigCompliant: boolean("oig_compliant").default(true),
  jointCommissionAccredited: boolean("joint_commission_accredited").default(false),
  
  // Contact Personnel
  facilityAdministrator: varchar("facility_administrator").references(() => users.id),
  chiefMedicalOfficer: varchar("chief_medical_officer").references(() => users.id),
  infectionControlOfficer: varchar("infection_control_officer").references(() => users.id),
  emergencyCoordinator: varchar("emergency_coordinator").references(() => users.id),
  publicHealthLiaison: varchar("public_health_liaison").references(() => users.id),
  
  // Integration with Live Location System
  liveLocationEnabled: boolean("live_location_enabled").default(true),
  assetTrackingEnabled: boolean("asset_tracking_enabled").default(false),
  geofenceRadius: integer("geofence_radius").default(1000), // Meters
  
  // Data Management
  dataClassification: varchar("data_classification").notNull().default("sensitive"),
  accessLevel: varchar("access_level").notNull().default("authorized_personnel"),
  
  // Audit Trail
  createdBy: varchar("created_by").notNull().references(() => users.id),
  lastModifiedBy: varchar("last_modified_by").references(() => users.id),
  accessLog: jsonb("access_log").default('[]'),
  modificationLog: jsonb("modification_log").default('[]'),
  
  metadata: jsonb("metadata"),
  operatingHours: jsonb("operating_hours"), // Daily operating schedules
  services: jsonb("services"), // Detailed services offered
  
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
}, (table) => [
  index("idx_hf_location").on(table.latitude, table.longitude),
  index("idx_hf_type_status").on(table.facilityType, table.operationalStatus),
  index("idx_hf_capacity").on(table.availableBeds, table.availableIcuBeds),
  index("idx_hf_emergency").on(table.emergencyLevel),
  index("idx_hf_facility_id").on(table.facilityId),
  index("idx_hf_operational_status").on(table.operationalStatus),
  index("idx_hf_last_updated").on(table.lastCapacityUpdate),
  index("idx_hf_testing_capacity").on(table.dailyTestingCapacity, table.currentTestingLoad),
  // CHECK constraints for data integrity
  check("chk_hf_operational_status", sql`operational_status IN ('operational', 'limited', 'closed', 'emergency_only')`),
  check("chk_hf_emergency_level", sql`emergency_level IN ('green', 'yellow', 'orange', 'red', 'black')`),
  check("chk_hf_staffing_level", sql`staffing_level IN ('normal', 'reduced', 'critical', 'crisis')`),
  // Geospatial validation constraints
  check("chk_hf_latitude_range", sql`latitude IS NULL OR (latitude >= -90 AND latitude <= 90)`),
  check("chk_hf_longitude_range", sql`longitude IS NULL OR (longitude >= -180 AND longitude <= 180)`),
]);

// 5. Public Health Alerts Table - Emergency notifications, health advisories, outbreak warnings
export const publicHealthAlerts = pgTable("public_health_alerts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  alertId: varchar("alert_id").notNull().unique(), // PHA-YYYYMMDD-XXXX format
  
  // Alert Classification
  alertType: varchar("alert_type").notNull(), // outbreak_warning, health_advisory, emergency_notification, vaccination_alert, contamination_warning, bioterrorism_alert
  severity: varchar("severity").notNull(), // informational, advisory, watch, warning, emergency
  urgency: varchar("urgency").notNull(), // immediate, expected, future, past, unknown
  certainty: varchar("certainty").notNull(), // observed, likely, possible, unlikely, unknown
  alertCategory: varchar("alert_category").notNull(), // health, safety, security, rescue, fire, hazmat, met, geo, env, transport, infra, cbrne, other
  
  // Alert Content
  headline: varchar("headline").notNull(),
  description: text("description").notNull(),
  instruction: text("instruction"), // What people should do
  event: varchar("event").notNull(), // Type of hazard or event
  responseType: varchar("response_type"), // shelter, evacuate, prepare, execute, avoid, monitor, assess, allclear, none
  
  // Geographic Scope
  scope: varchar("scope").notNull(), // public, restricted, private
  affectedAreas: jsonb("affected_areas").notNull(), // Array of affected geographic areas
  latitude: numeric("latitude", { precision: 10, scale: 8 }),
  longitude: numeric("longitude", { precision: 11, scale: 8 }),
  radius: integer("radius"), // Alert radius in meters
  boundaryData: jsonb("boundary_data"), // GeoJSON polygon data
  geographicScope: varchar("geographic_scope").notNull(), // local, county, state, regional, national
  
  // Target Audience
  targetAudience: jsonb("target_audience").notNull(), // general_public, healthcare_workers, first_responders, vulnerable_populations
  audienceRestrictions: jsonb("audience_restrictions"), // Age groups, conditions, etc.
  languageVersions: jsonb("language_versions").default('["en"]'), // Available language versions
  accessibilityCompliant: boolean("accessibility_compliant").default(true),
  
  // Timing and Duration
  effectiveTime: timestamp("effective_time").notNull(),
  expirationTime: timestamp("expiration_time"),
  onsetTime: timestamp("onset_time"), // When the event begins
  expectedDuration: integer("expected_duration"), // Expected duration in hours
  alertStatus: varchar("alert_status").notNull().default("actual"), // actual, exercise, system, test, draft
  
  // Distribution and Channels
  distributionChannels: jsonb("distribution_channels").notNull(), // sms, email, web, mobile_app, social_media, broadcast, sirens
  distributionStatus: jsonb("distribution_status").default('{}'), // Status per channel
  totalRecipients: integer("total_recipients").default(0),
  deliveredCount: integer("delivered_count").default(0),
  readCount: integer("read_count").default(0),
  acknowledgedCount: integer("acknowledged_count").default(0),
  
  // Integration with Existing Systems
  relatedIncidentId: varchar("related_incident_id").references(() => publicHealthIncidents.id),
  relatedSurveillanceId: varchar("related_surveillance_id").references(() => diseaseSurveillance.id),
  triggeredByThreatId: varchar("triggered_by_threat_id").references(() => threats.id),
  parentAlertId: varchar("parent_alert_id"), // For updates or related alerts
  supersededByAlertId: varchar("superseded_by_alert_id"), // If alert is replaced
  
  // CDC and Federal Integration
  cdcHanAlert: boolean("cdc_han_alert").default(false), // Health Alert Network
  cdcHanId: varchar("cdc_han_id"), // CDC HAN identifier
  emsCapAlert: boolean("ems_cap_alert").default(false), // Emergency Management
  ipawsAlert: boolean("ipaws_alert").default(false), // Integrated Public Alert Warning System
  capMessage: jsonb("cap_message"), // Common Alerting Protocol message
  fedCoordination: boolean("fed_coordination").default(false),
  
  // Message Management
  messageReference: varchar("message_reference").unique(), // For updates/cancellations
  messageType: varchar("message_type").notNull().default("alert"), // alert, update, cancel, ack, error
  version: integer("version").default(1), // Message version number
  references: jsonb("references"), // Previous alert references
  updateReason: text("update_reason"), // Reason for alert update
  
  // Authority and Authorization
  issuingAuthority: varchar("issuing_authority").notNull(), // Organization issuing alert
  authorityLevel: varchar("authority_level").notNull(), // local, state, federal, international
  senderId: varchar("sender_id").notNull(), // Unique sender identifier
  senderName: varchar("sender_name").notNull(),
  issuedBy: varchar("issued_by").notNull().references(() => users.id),
  approvedBy: varchar("approved_by").references(() => users.id),
  
  // Legal and Compliance
  legalBasis: varchar("legal_basis"), // Legal authority for alert
  mandatoryAlert: boolean("mandatory_alert").default(false),
  optOutAllowed: boolean("opt_out_allowed").default(true),
  privacyNotice: text("privacy_notice"),
  dataRetention: varchar("data_retention").default("30_days"),
  
  // Quality Control
  alertPriority: integer("alert_priority").default(3), // 1=highest, 5=lowest
  reviewRequired: boolean("review_required").default(true),
  testAlert: boolean("test_alert").default(false),
  draftMode: boolean("draft_mode").default(false),
  qualityChecked: boolean("quality_checked").default(false),
  errorChecking: jsonb("error_checking"), // Automated error checking results
  
  // Performance Tracking
  responseMetrics: jsonb("response_metrics"), // Alert performance data
  feedbackReceived: jsonb("feedback_received"), // Public feedback
  effectivenessScore: integer("effectiveness_score"), // 0-100 effectiveness rating
  
  // Integration with Notification System
  integratedWithThreatNotifications: boolean("integrated_with_threat_notifications").default(true),
  notificationTemplateId: varchar("notification_template_id"),
  customizationData: jsonb("customization_data"),
  
  // Audit and Security
  dataClassification: varchar("data_classification").notNull().default("public"),
  accessLevel: varchar("access_level").notNull().default("public"),
  createdBy: varchar("created_by").notNull().references(() => users.id),
  lastModifiedBy: varchar("last_modified_by").references(() => users.id),
  accessLog: jsonb("access_log").default('[]'),
  modificationLog: jsonb("modification_log").default('[]'),
  
  metadata: jsonb("metadata"),
  attachments: jsonb("attachments"), // Supporting documents, images, etc.
  
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
}, (table) => [
  index("idx_pha_type_severity").on(table.alertType, table.severity),
  index("idx_pha_geographic").on(table.latitude, table.longitude),
  index("idx_pha_time_status").on(table.effectiveTime, table.alertStatus),
  index("idx_pha_audience").on(table.targetAudience),
  index("idx_pha_issued_at").on(table.effectiveTime),
  index("idx_pha_severity").on(table.severity),
  index("idx_pha_alert_type").on(table.alertType),
  index("idx_pha_urgency_certainty").on(table.urgency, table.certainty),
  // CHECK constraints for data integrity
  check("chk_pha_severity", sql`severity IN ('informational', 'advisory', 'watch', 'warning', 'emergency')`),
  check("chk_pha_urgency", sql`urgency IN ('immediate', 'expected', 'future', 'past', 'unknown')`),
  check("chk_pha_certainty", sql`certainty IN ('observed', 'likely', 'possible', 'unlikely', 'unknown')`),
  check("chk_pha_alert_status", sql`alert_status IN ('actual', 'exercise', 'system', 'test', 'draft')`),
  // Geospatial validation constraints
  check("chk_pha_latitude_range", sql`latitude IS NULL OR (latitude >= -90 AND latitude <= 90)`),
  check("chk_pha_longitude_range", sql`longitude IS NULL OR (longitude >= -180 AND longitude <= 180)`),
]);

// 6. Epidemiological Data Table - Population health metrics, disease statistics, trend analysis
export const epidemiologicalData = pgTable("epidemiological_data", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  dataId: varchar("data_id").notNull().unique(), // EPI-YYYYMMDD-XXXX format
  
  // Data Classification
  dataType: varchar("data_type").notNull(), // mortality, morbidity, incidence, prevalence, surveillance, outbreak, risk_factors, demographics
  studyType: varchar("study_type"), // descriptive, analytical, experimental, cross_sectional, cohort, case_control
  dataCategory: varchar("data_category").notNull(), // individual, aggregate, population, sentinel
  aggregationLevel: varchar("aggregation_level").notNull(), // individual, facility, county, state, regional, national
  
  // Geographic Information
  geographicScope: varchar("geographic_scope").notNull(), // local, county, state, regional, national, international
  geographicIdentifier: varchar("geographic_identifier").notNull(), // FIPS code, postal code, etc.
  latitude: numeric("latitude", { precision: 10, scale: 8 }),
  longitude: numeric("longitude", { precision: 11, scale: 8 }),
  populationServed: integer("population_served"),
  boundaryData: jsonb("boundary_data"), // GeoJSON for geographic boundaries
  urbanRuralClassification: varchar("urban_rural_classification"), // urban, suburban, rural, frontier
  
  // Time Period
  dataPeriodStart: timestamp("data_period_start").notNull(),
  dataPeriodEnd: timestamp("data_period_end").notNull(),
  reportingPeriod: varchar("reporting_period"), // daily, weekly, monthly, quarterly, annually
  seasonality: varchar("seasonality"), // spring, summer, fall, winter, year_round
  epidemiologicalWeek: integer("epidemiological_week"), // CDC epidemiological week
  epidemiologicalYear: integer("epidemiological_year"),
  
  // Disease/Condition Information
  diseaseCode: varchar("disease_code"), // ICD-10, SNOMED, CDC codes
  diseaseName: varchar("disease_name"),
  diseaseCategory: varchar("disease_category"), // infectious, chronic, injury, environmental, occupational
  conditionType: varchar("condition_type"), // primary, comorbidity, underlying, immediate
  
  // Population Demographics
  totalPopulation: integer("total_population"),
  demographicBreakdown: jsonb("demographic_breakdown").notNull(), // Age, gender, race, ethnicity
  ageGroups: jsonb("age_groups"), // Cases/deaths by age group
  genderDistribution: jsonb("gender_distribution"),
  raceEthnicityData: jsonb("race_ethnicity_data"),
  socioeconomicData: jsonb("socioeconomic_data"),
  vulnerablePopulations: jsonb("vulnerable_populations"),
  
  // Epidemiological Measures
  caseCount: integer("case_count").default(0),
  deathCount: integer("death_count").default(0),
  incidenceRate: varchar("incidence_rate"), // Per 100,000 population
  prevalenceRate: varchar("prevalence_rate"), // Per 100,000 population
  mortalityRate: varchar("mortality_rate"), // Per 100,000 population
  caseFatalityRate: varchar("case_fatality_rate"), // Percentage
  attackRate: varchar("attack_rate"), // Percentage
  secondaryAttackRate: varchar("secondary_attack_rate"), // Percentage
  basicReproductionNumber: varchar("basic_reproduction_number"), // R0
  effectiveReproductionNumber: varchar("effective_reproduction_number"), // Rt
  
  // Risk Factors and Exposures
  riskFactors: jsonb("risk_factors"),
  exposureHistory: jsonb("exposure_history"),
  behavioralFactors: jsonb("behavioral_factors"),
  environmentalFactors: jsonb("environmental_factors"),
  occupationalFactors: jsonb("occupational_factors"),
  comorbidities: jsonb("comorbidities"),
  vaccinationStatus: jsonb("vaccination_status"),
  
  // Clinical Data
  clinicalPresentation: jsonb("clinical_presentation"),
  symptomProfiles: jsonb("symptom_profiles"),
  severityDistribution: jsonb("severity_distribution"),
  hospitalizationData: jsonb("hospitalization_data"),
  icuAdmissions: integer("icu_admissions").default(0),
  ventilatorUse: integer("ventilator_use").default(0),
  lengthOfStay: jsonb("length_of_stay"), // Average and distribution
  
  // Laboratory Data
  laboratoryResults: jsonb("laboratory_results"),
  testingData: jsonb("testing_data"),
  positivityRate: varchar("positivity_rate"), // Percentage
  specimenTypes: jsonb("specimen_types"),
  diagnosticMethods: jsonb("diagnostic_methods"),
  
  // Temporal Trends
  trendData: jsonb("trend_data").notNull(), // Time series data
  seasonalPatterns: jsonb("seasonal_patterns"),
  cyclicalPatterns: jsonb("cyclical_patterns"),
  epidemiologicalCurve: jsonb("epidemiological_curve"),
  forecastingData: jsonb("forecasting_data"),
  
  // Comparative Analysis
  historicalComparison: jsonb("historical_comparison"),
  peerComparison: jsonb("peer_comparison"), // Comparison with similar populations
  nationalBenchmarks: jsonb("national_benchmarks"),
  internationalComparison: jsonb("international_comparison"),
  
  // Data Quality and Validation
  dataQuality: varchar("data_quality").notNull().default("high"), // high, medium, low, uncertain
  completenessScore: integer("completeness_score").default(100), // 0-100
  accuracyScore: integer("accuracy_score").default(100), // 0-100
  timelinesScore: integer("timeliness_score").default(100), // 0-100
  validationMethod: varchar("validation_method"), // automated, manual, peer_review, statistical
  dataSource: varchar("data_source").notNull(), // surveillance, registry, survey, administrative, clinical
  collectionMethod: varchar("collection_method"), // active, passive, sentinel, population_based
  
  // Statistical Analysis
  confidenceIntervals: jsonb("confidence_intervals"),
  statisticalSignificance: jsonb("statistical_significance"),
  pValues: jsonb("p_values"),
  riskRatios: jsonb("risk_ratios"),
  oddsRatios: jsonb("odds_ratios"),
  correlationAnalysis: jsonb("correlation_analysis"),
  regressionAnalysis: jsonb("regression_analysis"),
  spatialAnalysis: jsonb("spatial_analysis"),
  clusterAnalysis: jsonb("cluster_analysis"),
  
  // Public Health Impact
  diseaseburden: jsonb("disease_burden"), // DALYs, QALYs, YLL, YLD
  economicImpact: jsonb("economic_impact"),
  healthSystemImpact: jsonb("health_system_impact"),
  socialImpact: jsonb("social_impact"),
  environmentalImpact: jsonb("environmental_impact"),
  
  // CDC Integration and Reporting
  cdcReporting: boolean("cdc_reporting").default(false),
  cdcSurveillanceSystem: varchar("cdc_surveillance_system"), // NNDSS, NHSN, etc.
  cdcConditionCode: varchar("cdc_condition_code"),
  mmwrWeek: integer("mmwr_week"), // Morbidity and Mortality Weekly Report week
  mmwrYear: integer("mmwr_year"),
  nhsnData: jsonb("nhsn_data"), // National Healthcare Safety Network
  whoReporting: boolean("who_reporting").default(false),
  
  // Research and Academic Use
  researchStudyId: varchar("research_study_id"),
  publicationReference: varchar("publication_reference"),
  dataSetVersion: varchar("data_set_version"),
  academicInstitution: varchar("academic_institution"),
  principalInvestigator: varchar("principal_investigator").references(() => users.id),
  
  // Privacy and Compliance
  dataClassification: varchar("data_classification").notNull().default("phi"),
  privacyLevel: varchar("privacy_level").notNull().default("high"), // high, medium, low, public
  deidentificationLevel: varchar("deidentification_level"), // identified, limited_dataset, deidentified, anonymous
  hipaaCompliant: boolean("hipaa_compliant").default(true),
  ethicsApproval: boolean("ethics_approval").default(false),
  consentRequired: boolean("consent_required").default(true),
  dataUseAgreement: boolean("data_use_agreement").default(false),
  
  // Access Control
  accessLevel: varchar("access_level").notNull().default("researcher_only"),
  sharingRestrictions: jsonb("sharing_restrictions"),
  embargoDate: timestamp("embargo_date"),
  publicReleaseDate: timestamp("public_release_date"),
  
  // Data Stewardship
  dataOwner: varchar("data_owner").notNull().references(() => users.id),
  dataCustodian: varchar("data_custodian").references(() => users.id),
  epidemiologist: varchar("epidemiologist").references(() => users.id),
  statistician: varchar("statistician").references(() => users.id),
  qualityAssuranceOfficer: varchar("quality_assurance_officer").references(() => users.id),
  
  // System Integration
  relatedIncidentId: varchar("related_incident_id").references(() => publicHealthIncidents.id),
  relatedSurveillanceId: varchar("related_surveillance_id").references(() => diseaseSurveillance.id),
  sourceDatasetId: varchar("source_dataset_id"), // Reference to source dataset
  derivedFromDataId: varchar("derived_from_data_id"), // If derived from other epi data
  
  // Audit and Provenance
  createdBy: varchar("created_by").notNull().references(() => users.id),
  lastModifiedBy: varchar("last_modified_by").references(() => users.id),
  accessLog: jsonb("access_log").default('[]'),
  modificationLog: jsonb("modification_log").default('[]'),
  dataLineage: jsonb("data_lineage"), // Data provenance and transformations
  
  metadata: jsonb("metadata"),
  analyticalNotes: text("analytical_notes"),
  limitations: text("limitations"),
  
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
}, (table) => [
  index("idx_ed_disease_period").on(table.diseaseCode, table.dataPeriodStart),
  index("idx_ed_geographic").on(table.geographicScope, table.geographicIdentifier),
  index("idx_ed_temporal").on(table.dataPeriodStart, table.dataPeriodEnd),
  index("idx_ed_type_quality").on(table.dataType, table.dataQuality),
  index("idx_ed_mmwr_week").on(table.mmwrWeek, table.mmwrYear),
  index("idx_ed_report_date").on(table.dataPeriodStart),
  index("idx_ed_region").on(table.geographicScope, table.geographicIdentifier),
  index("idx_ed_epidemiological_week").on(table.epidemiologicalWeek, table.epidemiologicalYear),
  // CHECK constraints for data integrity
  check("chk_ed_data_quality", sql`data_quality IN ('high', 'medium', 'low', 'uncertain')`),
  check("chk_ed_data_type", sql`data_type IN ('mortality', 'morbidity', 'incidence', 'prevalence', 'surveillance', 'outbreak', 'risk_factors', 'demographics')`),
  check("chk_ed_geographic_scope", sql`geographic_scope IN ('local', 'county', 'state', 'regional', 'national', 'international')`),
  // Ensure MMWR week is valid (1-53)
  check("chk_ed_mmwr_week_valid", sql`mmwr_week >= 1 AND mmwr_week <= 53`),
  check("chk_ed_epi_week_valid", sql`epidemiological_week >= 1 AND epidemiological_week <= 53`),
  // Geospatial validation constraints
  check("chk_ed_latitude_range", sql`latitude IS NULL OR (latitude >= -90 AND latitude <= 90)`),
  check("chk_ed_longitude_range", sql`longitude IS NULL OR (longitude >= -180 AND longitude <= 180)`),
]);

// ===== ENHANCED CONTACT TRACING SYSTEM TABLES =====

// Contact Tracing Location History - Privacy-compliant location tracking
export const contactTracingLocationHistory = pgTable("contact_tracing_location_history", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  locationId: varchar("location_id").notNull().unique(), // CTL-YYYYMMDD-XXXX format
  
  // User and Device Information  
  userId: varchar("user_id").references(() => users.id),
  deviceId: varchar("device_id").notNull(), // Anonymous device identifier
  sessionId: varchar("session_id"), // App session identifier
  
  // Location Data (Encrypted)
  latitude: numeric("latitude", { precision: 10, scale: 8 }).notNull(),
  longitude: numeric("longitude", { precision: 11, scale: 8 }).notNull(),
  accuracy: numeric("accuracy", { precision: 8, scale: 2 }), // GPS accuracy in meters
  altitude: numeric("altitude", { precision: 8, scale: 2 }),
  speed: numeric("speed", { precision: 6, scale: 2 }), // Speed in m/s
  bearing: numeric("bearing", { precision: 6, scale: 2 }), // Direction of travel
  
  // Temporal Information
  timestamp: timestamp("timestamp").notNull(),
  timezoneName: varchar("timezone_name"),
  localTime: timestamp("local_time"),
  dwellTime: integer("dwell_time"), // Time spent at location in minutes
  
  // Location Context
  locationType: varchar("location_type"), // home, work, school, healthcare, retail, transport, outdoor, indoor
  locationName: varchar("location_name"), // Encrypted location description
  address: text("address"), // Encrypted address (if available)
  venueId: varchar("venue_id"), // Reference to known venues
  floorLevel: integer("floor_level"), // Building floor (if indoor)
  buildingId: varchar("building_id"), // Building identifier
  
  // Privacy and Consent Controls
  consentGiven: boolean("consent_given").notNull().default(false),
  consentType: varchar("consent_type").notNull().default("explicit"), // explicit, implied, emergency
  consentTimestamp: timestamp("consent_timestamp"),
  dataProcessingPurpose: varchar("data_processing_purpose").notNull().default("contact_tracing"),
  retentionPeriod: integer("retention_period").notNull().default(30), // Days
  automaticDeletionDate: timestamp("automatic_deletion_date").notNull(),
  
  // Data Minimization and Anonymization
  isAnonymized: boolean("is_anonymized").default(false),
  anonymizationMethod: varchar("anonymization_method"), // k_anonymity, l_diversity, differential_privacy
  privacyBudget: numeric("privacy_budget", { precision: 10, scale: 8 }), // For differential privacy
  spatialCloaking: integer("spatial_cloaking"), // Spatial cloaking radius in meters
  temporalCloaking: integer("temporal_cloaking"), // Temporal cloaking window in minutes
  
  // Data Quality and Validation
  dataQuality: varchar("data_quality").notNull().default("high"), // high, medium, low, invalid
  validationStatus: varchar("validation_status").notNull().default("validated"), // validated, suspicious, invalid
  outlierScore: numeric("outlier_score", { precision: 6, scale: 4 }), // Anomaly detection score
  
  // Security and Encryption
  encryptionStatus: varchar("encryption_status").notNull().default("aes256_gcm"),
  encryptionKeyId: varchar("encryption_key_id"),
  dataClassification: varchar("data_classification").notNull().default("highly_sensitive"),
  
  // System Integration
  sourceSystem: varchar("source_system").notNull().default("mobile_app"), // mobile_app, web_app, iot_device, manual_entry
  collectionMethod: varchar("collection_method"), // gps, wifi, bluetooth, cell_tower, manual
  batteryLevel: integer("battery_level"), // Device battery level at collection
  
  // Audit and Compliance
  collectedBy: varchar("collected_by").references(() => users.id),
  accessLog: jsonb("access_log").default('[]'),
  
  metadata: jsonb("metadata"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
}, (table) => [
  index("idx_ctlh_user_timestamp").on(table.userId, table.timestamp),
  index("idx_ctlh_device_time").on(table.deviceId, table.timestamp),
  index("idx_ctlh_location").on(table.latitude, table.longitude),
  index("idx_ctlh_session").on(table.sessionId, table.timestamp),
  index("idx_ctlh_consent").on(table.consentGiven, table.consentType),
  index("idx_ctlh_retention").on(table.automaticDeletionDate),
  index("idx_ctlh_quality").on(table.dataQuality, table.validationStatus),
  // Geospatial validation constraints
  check("chk_ctlh_latitude_range", sql`latitude >= -90 AND latitude <= 90`),
  check("chk_ctlh_longitude_range", sql`longitude >= -180 AND longitude <= 180`),
  check("chk_ctlh_accuracy_positive", sql`accuracy IS NULL OR accuracy >= 0`),
  check("chk_ctlh_retention_positive", sql`retention_period > 0 AND retention_period <= 90`),
]);

// Contact Proximity Detection - Automated contact detection algorithms
export const contactProximityDetection = pgTable("contact_proximity_detection", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  detectionId: varchar("detection_id").notNull().unique(), // CPD-YYYYMMDD-XXXX format
  
  // Contact Pair Information
  contactPair: varchar("contact_pair").notNull(), // Hash of sorted device IDs
  device1Id: varchar("device1_id").notNull(),
  device2Id: varchar("device2_id").notNull(),
  user1Id: varchar("user1_id").references(() => users.id),
  user2Id: varchar("user2_id").references(() => users.id),
  
  // Detection Event Details
  detectionTimestamp: timestamp("detection_timestamp").notNull(),
  contactStartTime: timestamp("contact_start_time").notNull(),
  contactEndTime: timestamp("contact_end_time").notNull(),
  contactDuration: integer("contact_duration").notNull(), // Duration in seconds
  
  // Proximity Measurements
  minimumDistance: numeric("minimum_distance", { precision: 8, scale: 2 }), // Minimum distance in meters
  averageDistance: numeric("average_distance", { precision: 8, scale: 2 }), // Average distance in meters
  maximumDistance: numeric("maximum_distance", { precision: 8, scale: 2 }), // Maximum distance in meters
  distanceMeasurements: jsonb("distance_measurements"), // Array of timestamped distance measurements
  
  // Detection Methods and Confidence
  detectionMethod: varchar("detection_method").notNull(), // bluetooth, wifi, gps, cell_tower, manual, hybrid
  bluetoothRssi: jsonb("bluetooth_rssi"), // RSSI measurements over time
  wifiSignalStrength: jsonb("wifi_signal_strength"),
  gpsAccuracy: numeric("gps_accuracy", { precision: 8, scale: 2 }), // GPS accuracy during contact
  confidenceScore: numeric("confidence_score", { precision: 6, scale: 4 }).notNull(), // 0.0 to 1.0
  
  // Environmental Context
  environment: varchar("environment"), // indoor, outdoor, vehicle, public_transport
  location: varchar("location"), // Encrypted location description
  latitude: numeric("latitude", { precision: 10, scale: 8 }),
  longitude: numeric("longitude", { precision: 11, scale: 8 }),
  venue: varchar("venue"), // Encrypted venue name
  
  // Risk Assessment
  riskLevel: varchar("risk_level").notNull(), // critical, high, medium, low, minimal
  riskScore: numeric("risk_score", { precision: 6, scale: 4 }), // Calculated risk score
  riskFactors: jsonb("risk_factors"), // Array of risk factors
  exposureProbability: numeric("exposure_probability", { precision: 6, scale: 4 }),
  
  // Contact Classification
  contactType: varchar("contact_type").notNull(), // close_contact, casual_contact, fleeting_contact
  contactClassification: varchar("contact_classification"), // face_to_face, proximity, shared_space
  maskWearing: boolean("mask_wearing"),
  ventilation: varchar("ventilation"), // good, moderate, poor, unknown
  activityType: varchar("activity_type"), // conversation, meal, meeting, transport, other
  
  // Data Quality and Validation
  dataQuality: varchar("data_quality").notNull().default("high"), // high, medium, low
  validationStatus: varchar("validation_status").notNull().default("pending"), // validated, pending, rejected
  falsePositiveFlag: boolean("false_positive_flag").default(false),
  manualReview: boolean("manual_review").default(false),
  
  // Algorithm Information
  algorithmVersion: varchar("algorithm_version").notNull(),
  algorithmParameters: jsonb("algorithm_parameters"),
  processingTimestamp: timestamp("processing_timestamp").defaultNow(),
  
  // Integration with Contact Tracing
  contactTracingRecordId: varchar("contact_tracing_record_id").references(() => contactTracing.id),
  alertTriggered: boolean("alert_triggered").default(false),
  notificationSent: boolean("notification_sent").default(false),
  
  // Privacy and Security
  encryptionStatus: varchar("encryption_status").notNull().default("aes256_gcm"),
  dataClassification: varchar("data_classification").notNull().default("highly_sensitive"),
  accessLevel: varchar("access_level").notNull().default("contact_tracer_only"),
  automaticDeletionDate: timestamp("automatic_deletion_date").notNull(),
  
  // Audit Information
  processedBy: varchar("processed_by").references(() => users.id),
  reviewedBy: varchar("reviewed_by").references(() => users.id),
  accessLog: jsonb("access_log").default('[]'),
  
  metadata: jsonb("metadata"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
}, (table) => [
  index("idx_cpd_contact_pair_time").on(table.contactPair, table.contactStartTime),
  index("idx_cpd_devices").on(table.device1Id, table.device2Id),
  index("idx_cpd_risk_level").on(table.riskLevel, table.contactDuration),
  index("idx_cpd_detection_time").on(table.detectionTimestamp),
  index("idx_cpd_location").on(table.latitude, table.longitude),
  index("idx_cpd_contact_tracing").on(table.contactTracingRecordId),
  index("idx_cpd_retention").on(table.automaticDeletionDate),
  // Validation constraints
  check("chk_cpd_risk_level", sql`risk_level IN ('critical', 'high', 'medium', 'low', 'minimal')`),
  check("chk_cpd_contact_type", sql`contact_type IN ('close_contact', 'casual_contact', 'fleeting_contact')`),
  check("chk_cpd_confidence_range", sql`confidence_score >= 0.0 AND confidence_score <= 1.0`),
  check("chk_cpd_duration_positive", sql`contact_duration > 0`),
  check("chk_cpd_distance_positive", sql`minimum_distance >= 0 AND average_distance >= 0 AND maximum_distance >= 0`),
]);

// Contact Tracing Notification Templates - Multi-channel notification system
export const contactTracingNotificationTemplates = pgTable("contact_tracing_notification_templates", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  templateId: varchar("template_id").notNull().unique(), // CTN-TEMPLATE-XXXX format
  
  // Template Information
  templateName: varchar("template_name").notNull(),
  templateDescription: text("template_description"),
  templateCategory: varchar("template_category").notNull(), // exposure_notification, quarantine_instruction, testing_reminder, status_update, emergency_alert
  templateType: varchar("template_type").notNull(), // email, sms, push_notification, in_app, voice_call
  
  // Risk Level and Targeting
  riskLevel: varchar("risk_level").notNull(), // critical, high, medium, low, minimal
  targetAudience: varchar("target_audience").notNull(), // contacts, cases, general_public, health_officials
  languageCode: varchar("language_code").notNull().default("en-US"), // ISO language code
  
  // Template Content
  subject: varchar("subject"), // For email/push notifications
  title: varchar("title"), // For in-app notifications
  messageBody: text("message_body").notNull(),
  htmlBody: text("html_body"), // HTML version for email
  smsBody: text("sms_body"), // SMS-specific shorter version
  pushBody: text("push_body"), // Push notification body
  voiceScript: text("voice_script"), // Voice call script
  
  // Personalization and Variables
  variableFields: jsonb("variable_fields").default('[]'), // Available merge fields
  personalizationRules: jsonb("personalization_rules"),
  conditionalContent: jsonb("conditional_content"), // Content blocks based on conditions
  
  // Delivery Configuration
  priority: varchar("priority").notNull().default("normal"), // urgent, high, normal, low
  deliveryMethod: varchar("delivery_method").notNull().default("immediate"), // immediate, scheduled, batch
  retryPolicy: jsonb("retry_policy"), // Retry configuration
  escalationRules: jsonb("escalation_rules"), // When to escalate to higher priority
  
  // Privacy and Compliance
  privacyCompliant: boolean("privacy_compliant").notNull().default(true),
  containsPhi: boolean("contains_phi").default(false),
  requiresConsent: boolean("requires_consent").default(true),
  disclaimerText: text("disclaimer_text"),
  privacyNotice: text("privacy_notice"),
  optOutInstructions: text("opt_out_instructions"),
  
  // Regulatory Compliance
  hipaaCompliant: boolean("hipaa_compliant").notNull().default(true),
  ferpaCompliant: boolean("ferpa_compliant").default(false),
  gdprCompliant: boolean("gdpr_compliant").default(true),
  regulatoryNotes: text("regulatory_notes"),
  
  // A/B Testing and Optimization
  abTestGroup: varchar("ab_test_group"), // A, B, C, etc.
  effectivenessMetrics: jsonb("effectiveness_metrics"),
  openRate: numeric("open_rate", { precision: 5, scale: 4 }),
  clickThroughRate: numeric("click_through_rate", { precision: 5, scale: 4 }),
  responseRate: numeric("response_rate", { precision: 5, scale: 4 }),
  
  // Template Management
  isActive: boolean("is_active").notNull().default(true),
  version: varchar("version").notNull().default("1.0"),
  parentTemplateId: varchar("parent_template_id"), // Reference to parent template for versioning
  approvalStatus: varchar("approval_status").notNull().default("pending"), // pending, approved, rejected
  approvedBy: varchar("approved_by").references(() => users.id),
  approvalDate: timestamp("approval_date"),
  
  // Integration Configuration
  sendgridTemplateId: varchar("sendgrid_template_id"), // SendGrid integration
  twilioTemplateId: varchar("twilio_template_id"), // Twilio SMS integration
  firebaseTopicArn: varchar("firebase_topic_arn"), // Firebase push notifications
  webhookUrls: jsonb("webhook_urls"), // Webhook integrations
  
  // Usage Analytics
  usageCount: integer("usage_count").default(0),
  lastUsedDate: timestamp("last_used_date"),
  successRate: numeric("success_rate", { precision: 5, scale: 4 }),
  
  // Audit and Management
  createdBy: varchar("created_by").notNull().references(() => users.id),
  lastModifiedBy: varchar("last_modified_by").references(() => users.id),
  reviewHistory: jsonb("review_history").default('[]'),
  
  metadata: jsonb("metadata"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
}, (table) => [
  index("idx_ctnt_category_risk").on(table.templateCategory, table.riskLevel),
  index("idx_ctnt_type_active").on(table.templateType, table.isActive),
  index("idx_ctnt_language").on(table.languageCode, table.isActive),
  index("idx_ctnt_approval").on(table.approvalStatus, table.isActive),
  index("idx_ctnt_usage").on(table.usageCount, table.lastUsedDate),
  // Validation constraints
  check("chk_ctnt_risk_level", sql`risk_level IN ('critical', 'high', 'medium', 'low', 'minimal')`),
  check("chk_ctnt_template_type", sql`template_type IN ('email', 'sms', 'push_notification', 'in_app', 'voice_call')`),
  check("chk_ctnt_priority", sql`priority IN ('urgent', 'high', 'normal', 'low')`),
  check("chk_ctnt_approval_status", sql`approval_status IN ('pending', 'approved', 'rejected')`),
]);

// Contact Tracing Notification Logs - Multi-channel delivery tracking
export const contactTracingNotificationLogs = pgTable("contact_tracing_notification_logs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  notificationId: varchar("notification_id").notNull().unique(), // CTLOG-YYYYMMDD-XXXX format
  
  // Recipient and Contact Information  
  recipientId: varchar("recipient_id").references(() => users.id),
  contactTracingRecordId: varchar("contact_tracing_record_id").references(() => contactTracing.id),
  proximityDetectionId: varchar("proximity_detection_id").references(() => contactProximityDetection.id),
  incidentId: varchar("incident_id").references(() => publicHealthIncidents.id),
  
  // Template and Content Information
  templateId: varchar("template_id").notNull().references(() => contactTracingNotificationTemplates.templateId),
  templateVersion: varchar("template_version").notNull(),
  notificationType: varchar("notification_type").notNull(), // email, sms, push_notification, in_app, voice_call
  notificationCategory: varchar("notification_category").notNull(), // exposure_notification, quarantine_instruction, testing_reminder, status_update, emergency_alert
  
  // Delivery Information
  deliveryMethod: varchar("delivery_method").notNull(), // sendgrid, twilio, firebase, webhook, manual
  recipientAddress: varchar("recipient_address").notNull(), // Email, phone, device token (encrypted)
  priority: varchar("priority").notNull(), // urgent, high, normal, low
  
  // Delivery Status and Timing
  deliveryStatus: varchar("delivery_status").notNull().default("pending"), // pending, sent, delivered, failed, bounced, rejected
  sentTimestamp: timestamp("sent_timestamp"),
  deliveredTimestamp: timestamp("delivered_timestamp"),
  failedTimestamp: timestamp("failed_timestamp"),
  readTimestamp: timestamp("read_timestamp"),
  respondedTimestamp: timestamp("responded_timestamp"),
  
  // Delivery Attempts and Retries
  attemptCount: integer("attempt_count").default(0),
  maxAttempts: integer("max_attempts").default(3),
  nextRetryTimestamp: timestamp("next_retry_timestamp"),
  retryDelayMinutes: integer("retry_delay_minutes").default(15),
  
  // Content and Personalization
  finalSubject: varchar("final_subject"), // Final subject after personalization
  finalMessage: text("final_message"), // Final message content after personalization
  personalizationData: jsonb("personalization_data"), // Data used for personalization
  languageUsed: varchar("language_used").default("en-US"),
  
  // Response and Engagement
  opened: boolean("opened").default(false),
  clicked: boolean("clicked").default(false),
  responded: boolean("responded").default(false),
  responseData: jsonb("response_data"), // User response content
  engagementScore: numeric("engagement_score", { precision: 5, scale: 4 }),
  
  // External System Integration
  externalMessageId: varchar("external_message_id"), // ID from external service (SendGrid, Twilio, etc.)
  externalStatus: varchar("external_status"), // Status from external service
  externalResponse: jsonb("external_response"), // Full response from external service
  webhookData: jsonb("webhook_data"), // Webhook delivery confirmation data
  
  // Error and Failure Information
  errorCode: varchar("error_code"),
  errorMessage: text("error_message"),
  errorDetails: jsonb("error_details"),
  bounceReason: varchar("bounce_reason"), // hard_bounce, soft_bounce, spam, invalid_address
  
  // Privacy and Compliance
  privacyLevel: varchar("privacy_level").notNull().default("high"), // high, medium, low
  containsPhi: boolean("contains_phi").default(false),
  encryptionStatus: varchar("encryption_status").notNull().default("aes256_gcm"),
  consentVerified: boolean("consent_verified").default(false),
  optOutRequested: boolean("opt_out_requested").default(false),
  
  // Analytics and Tracking
  campaignId: varchar("campaign_id"), // For grouping related notifications
  abTestGroup: varchar("ab_test_group"), // A/B testing group
  trackingPixel: boolean("tracking_pixel").default(false),
  utmParameters: jsonb("utm_parameters"), // UTM tracking parameters
  
  // Cost and Billing
  deliveryCost: numeric("delivery_cost", { precision: 8, scale: 4 }), // Cost in USD
  billingUnit: varchar("billing_unit"), // message, character, minute
  billingQuantity: numeric("billing_quantity", { precision: 10, scale: 2 }),
  
  // Escalation and Follow-up
  escalated: boolean("escalated").default(false),
  escalationReason: varchar("escalation_reason"),
  escalatedTo: varchar("escalated_to").references(() => users.id),
  escalationTimestamp: timestamp("escalation_timestamp"),
  followUpRequired: boolean("follow_up_required").default(false),
  followUpDate: timestamp("follow_up_date"),
  
  // Audit and Security
  sentBy: varchar("sent_by").references(() => users.id),
  approvedBy: varchar("approved_by").references(() => users.id),
  ipAddress: varchar("ip_address"),
  userAgent: text("user_agent"),
  accessLog: jsonb("access_log").default('[]'),
  
  metadata: jsonb("metadata"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
}, (table) => [
  index("idx_ctnl_recipient_status").on(table.recipientId, table.deliveryStatus),
  index("idx_ctnl_contact_record").on(table.contactTracingRecordId),
  index("idx_ctnl_template").on(table.templateId, table.templateVersion),
  index("idx_ctnl_delivery_time").on(table.sentTimestamp, table.deliveryStatus),
  index("idx_ctnl_priority_status").on(table.priority, table.deliveryStatus),
  index("idx_ctnl_retry").on(table.nextRetryTimestamp, table.attemptCount),
  index("idx_ctnl_engagement").on(table.opened, table.clicked, table.responded),
  index("idx_ctnl_campaign").on(table.campaignId, table.abTestGroup),
  index("idx_ctnl_escalation").on(table.escalated, table.followUpRequired),
  // Validation constraints
  check("chk_ctnl_delivery_status", sql`delivery_status IN ('pending', 'sent', 'delivered', 'failed', 'bounced', 'rejected')`),
  check("chk_ctnl_notification_type", sql`notification_type IN ('email', 'sms', 'push_notification', 'in_app', 'voice_call')`),
  check("chk_ctnl_priority", sql`priority IN ('urgent', 'high', 'normal', 'low')`),
  check("chk_ctnl_attempt_count", sql`attempt_count >= 0 AND attempt_count <= max_attempts`),
]);

// Privacy Consent Management - Enhanced user consent and opt-out management
export const contactTracingPrivacyConsent = pgTable("contact_tracing_privacy_consent", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  consentId: varchar("consent_id").notNull().unique(), // CTC-YYYYMMDD-XXXX format
  
  // User and Device Information
  userId: varchar("user_id").references(() => users.id),
  deviceId: varchar("device_id").notNull(), // Anonymous device identifier
  sessionId: varchar("session_id"), // App session when consent was given
  
  // Consent Details
  consentType: varchar("consent_type").notNull(), // explicit, implied, emergency, legal_requirement, parental, guardian
  consentStatus: varchar("consent_status").notNull().default("given"), // given, withdrawn, expired, pending, declined
  consentMethod: varchar("consent_method").notNull(), // web_form, mobile_app, verbal, written, electronic_signature, biometric
  consentTimestamp: timestamp("consent_timestamp").notNull(),
  
  // Specific Consent Categories
  locationTrackingConsent: boolean("location_tracking_consent").default(false),
  proximityDetectionConsent: boolean("proximity_detection_consent").default(false),
  notificationConsent: boolean("notification_consent").default(false),
  dataProcessingConsent: boolean("data_processing_consent").default(false),
  dataShareConsent: boolean("data_share_consent").default(false),
  researchConsent: boolean("research_consent").default(false),
  
  // Consent Scope and Purpose
  consentPurposes: jsonb("consent_purposes").notNull(), // Array of purposes: contact_tracing, public_health, research, etc.
  dataCategories: jsonb("data_categories").notNull(), // Array of data types consented to
  processingActivities: jsonb("processing_activities"), // Specific processing activities consented to
  retentionPeriod: integer("retention_period").default(30), // Consent valid for X days
  consentExpiry: timestamp("consent_expiry"),
  
  // Geographic and Jurisdictional Scope
  jurisdictionApplicable: varchar("jurisdiction_applicable"), // US, EU, CA, etc.
  legalBasis: varchar("legal_basis").notNull(), // consent, legal_obligation, public_health, vital_interests
  regulatoryFramework: jsonb("regulatory_framework"), // HIPAA, GDPR, CCPA, etc.
  crossBorderDataTransfer: boolean("cross_border_data_transfer").default(false),
  
  // Withdrawal and Opt-out Management
  withdrawalAllowed: boolean("withdrawal_allowed").default(true),
  withdrawalMethod: varchar("withdrawal_method"), // app, web, phone, email, in_person
  withdrawalTimestamp: timestamp("withdrawal_timestamp"),
  withdrawalReason: varchar("withdrawal_reason"), // user_request, privacy_concern, no_longer_needed, other
  gracePeriodDays: integer("grace_period_days").default(7), // Days before data deletion after withdrawal
  
  // Granular Consent Controls
  shareWithHealthAuthorities: boolean("share_with_health_authorities").default(false),
  shareWithHealthcare: boolean("share_with_healthcare").default(false),
  shareWithResearchers: boolean("share_with_researchers").default(false),
  shareWithFamilyMembers: boolean("share_with_family_members").default(false),
  anonymizedDataUse: boolean("anonymized_data_use").default(false),
  contactByHealthOfficials: boolean("contact_by_health_officials").default(false),
  
  // Notification Preferences
  emailNotifications: boolean("email_notifications").default(false),
  smsNotifications: boolean("sms_notifications").default(false),
  pushNotifications: boolean("push_notifications").default(false),
  emergencyContactOverride: boolean("emergency_contact_override").default(true), // Can contact in emergencies even if opted out
  
  // Parental and Guardian Consent (for minors)
  isMinor: boolean("is_minor").default(false),
  parentGuardianId: varchar("parent_guardian_id").references(() => users.id),
  parentGuardianConsent: boolean("parent_guardian_consent").default(false),
  parentGuardianSignature: text("parent_guardian_signature"), // Digital signature
  ageVerificationMethod: varchar("age_verification_method"), // self_reported, id_verification, parental_verification
  
  // Consent Documentation
  consentText: text("consent_text").notNull(), // Full consent text presented to user
  consentVersion: varchar("consent_version").notNull(), // Version of consent form
  privacyPolicyVersion: varchar("privacy_policy_version"), // Privacy policy version at time of consent
  consentLanguage: varchar("consent_language").default("en-US"),
  consentFormUrl: varchar("consent_form_url"), // URL to consent form
  digitalSignature: text("digital_signature"), // User's digital signature
  
  // Technical Details
  ipAddress: varchar("ip_address"),
  userAgent: text("user_agent"),
  browserFingerprint: varchar("browser_fingerprint"),
  deviceFingerprint: varchar("device_fingerprint"),
  locationAtConsent: varchar("location_at_consent"), // Encrypted location when consent was given
  
  // Audit and Compliance
  consentWitness: varchar("consent_witness").references(() => users.id), // Staff member who witnessed consent
  verificationStatus: varchar("verification_status").default("pending"), // verified, pending, rejected, requires_review
  verifiedBy: varchar("verified_by").references(() => users.id),
  verificationTimestamp: timestamp("verification_timestamp"),
  complianceNotes: text("compliance_notes"),
  
  // Consent Analytics
  consentChannel: varchar("consent_channel"), // How user found consent form
  consentCampaign: varchar("consent_campaign"), // Marketing campaign that led to consent
  consentSource: varchar("consent_source"), // app, website, in_person, phone, etc.
  consentDuration: integer("consent_duration"), // Time spent reading consent (seconds)
  
  // System Integration
  externalConsentId: varchar("external_consent_id"), // ID from external consent management system
  syncedWithCRM: boolean("synced_with_crm").default(false),
  syncedWithHIS: boolean("synced_with_his").default(false), // Health Information System
  
  // Data Subject Rights (GDPR/CCPA)
  dataPortabilityRequested: boolean("data_portability_requested").default(false),
  dataPortabilityFulfilled: boolean("data_portability_fulfilled").default(false),
  accessRequestReceived: boolean("access_request_received").default(false),
  accessRequestFulfilled: boolean("access_request_fulfilled").default(false),
  correctionRequested: boolean("correction_requested").default(false),
  deletionRequested: boolean("deletion_requested").default(false),
  
  // Audit Trail
  accessLog: jsonb("access_log").default('[]'),
  modificationLog: jsonb("modification_log").default('[]'),
  consentHistory: jsonb("consent_history").default('[]'), // History of consent changes
  
  metadata: jsonb("metadata"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
}, (table) => [
  index("idx_ctpc_user_status").on(table.userId, table.consentStatus),
  index("idx_ctpc_device_consent").on(table.deviceId, table.consentStatus),
  index("idx_ctpc_consent_type").on(table.consentType, table.consentTimestamp),
  index("idx_ctpc_expiry").on(table.consentExpiry, table.consentStatus),
  index("idx_ctpc_withdrawal").on(table.withdrawalAllowed, table.withdrawalTimestamp),
  index("idx_ctpc_parent_guardian").on(table.parentGuardianId, table.isMinor),
  index("idx_ctpc_verification").on(table.verificationStatus, table.verifiedBy),
  index("idx_ctpc_data_subject_rights").on(table.dataPortabilityRequested, table.accessRequestReceived, table.deletionRequested),
  // Validation constraints
  check("chk_ctpc_consent_status", sql`consent_status IN ('given', 'withdrawn', 'expired', 'pending', 'declined')`),
  check("chk_ctpc_consent_type", sql`consent_type IN ('explicit', 'implied', 'emergency', 'legal_requirement', 'parental', 'guardian')`),
  check("chk_ctpc_consent_method", sql`consent_method IN ('web_form', 'mobile_app', 'verbal', 'written', 'electronic_signature', 'biometric')`),
  check("chk_ctpc_retention_period", sql`retention_period > 0 AND retention_period <= 365`),
]);

// Email subscribers for marketing resources
export const subscribers = pgTable("subscribers", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: varchar("name").notNull(),
  email: varchar("email").notNull().unique(),
  subscribedToEmails: boolean("subscribed_to_emails").notNull().default(true),
  downloadedResources: jsonb("downloaded_resources").notNull().default('[]'), // Array of resource IDs
  createdAt: timestamp("created_at").defaultNow(),
  lastDownloadAt: timestamp("last_download_at"),
});

export const confirmationCodes = pgTable("confirmation_codes", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: varchar("email").notNull(),
  name: varchar("name").notNull(),
  code: varchar("code").notNull(),
  resourceTitle: varchar("resource_title").notNull(),
  resourceId: varchar("resource_id").notNull(),
  downloadUrl: varchar("download_url").notNull(),
  verified: boolean("verified").default(false),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Compliance Milestones
export const complianceMilestones = pgTable("compliance_milestones", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  frameworkId: varchar("framework_id").notNull(),
  milestoneType: varchar("milestone_type").notNull(), // first_assessment, score_improvement, perfect_score, framework_complete
  previousScore: integer("previous_score"),
  currentScore: integer("current_score").notNull(),
  improvementPoints: integer("improvement_points").default(0),
  achievedAt: timestamp("achieved_at").defaultNow(),
  badgesAwarded: jsonb("badges_awarded"), // Array of badge IDs awarded for this milestone
});

export const insertAchievementBadgeSchema = createInsertSchema(achievementBadges).omit({
  id: true,
  createdAt: true,
});

export const insertUserBadgeSchema = createInsertSchema(userBadges).omit({
  id: true,
  earnedDate: true,
});

export const insertUserAchievementStatsSchema = createInsertSchema(userAchievementStats).omit({
  id: true,
  updatedAt: true,
});

export const insertComplianceMilestoneSchema = createInsertSchema(complianceMilestones).omit({
  id: true,
  achievedAt: true,
});

export const insertSubscriberSchema = createInsertSchema(subscribers).omit({
  id: true,
  createdAt: true,
});

export type AchievementBadge = typeof achievementBadges.$inferSelect;
export type InsertAchievementBadge = z.infer<typeof insertAchievementBadgeSchema>;
export type UserBadge = typeof userBadges.$inferSelect;
export type InsertUserBadge = z.infer<typeof insertUserBadgeSchema>;
export type UserAchievementStats = typeof userAchievementStats.$inferSelect;
export type InsertUserAchievementStats = z.infer<typeof insertUserAchievementStatsSchema>;
export type ComplianceMilestone = typeof complianceMilestones.$inferSelect;
export type InsertComplianceMilestone = z.infer<typeof insertComplianceMilestoneSchema>;
export type Subscriber = typeof subscribers.$inferSelect;
export type InsertSubscriber = z.infer<typeof insertSubscriberSchema>;
export type HardwareSecurityDevice = typeof hardwareSecurityDevices.$inferSelect;
export type BiometricAuthRecord = typeof biometricAuthRecords.$inferSelect;
export type IamIntegration = typeof iamIntegrations.$inferSelect;
export type SecurityInfrastructure = typeof securityInfrastructure.$inferSelect;
export type ThreatIntelligenceSource = typeof threatIntelligenceSources.$inferSelect;

// Insert schemas for new tables
export const insertHardwareSecurityDeviceSchema = createInsertSchema(hardwareSecurityDevices).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertBiometricAuthRecordSchema = createInsertSchema(biometricAuthRecords).omit({
  id: true,
  enrollmentDate: true,
});

export const insertIamIntegrationSchema = createInsertSchema(iamIntegrations).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertSecurityInfrastructureSchema = createInsertSchema(securityInfrastructure).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertThreatIntelligenceSourceSchema = createInsertSchema(threatIntelligenceSources).omit({
  id: true,
  createdAt: true,
});

export const insertTicketSchema = createInsertSchema(tickets).omit({
  id: true,
  ticketNumber: true, // Auto-generated
  submittedAt: true,
  updatedAt: true,
  resolvedAt: true,
  closedAt: true,
  firstResponseAt: true,
  escalatedAt: true,
});

// ===== PUBLIC HEALTH INSERT SCHEMAS =====

export const insertPublicHealthIncidentSchema = createInsertSchema(publicHealthIncidents).omit({
  id: true,
  incidentId: true, // Auto-generated
  createdAt: true,
  updatedAt: true,
  detectedAt: true,
  lastUpdatedAt: true,
});

export const insertDiseaseSurveillanceSchema = createInsertSchema(diseaseSurveillance).omit({
  id: true,
  surveillanceId: true, // Auto-generated
  createdAt: true,
  updatedAt: true,
});

export const insertContactTracingSchema = createInsertSchema(contactTracing).omit({
  id: true,
  contactId: true, // Auto-generated
  createdAt: true,
  updatedAt: true,
});

// Enhanced Contact Tracing System Insert Schemas
export const insertContactTracingLocationHistorySchema = createInsertSchema(contactTracingLocationHistory).omit({
  id: true,
  locationId: true, // Auto-generated
  createdAt: true,
  updatedAt: true,
});

export const insertContactProximityDetectionSchema = createInsertSchema(contactProximityDetection).omit({
  id: true,
  detectionId: true, // Auto-generated
  processingTimestamp: true, // Auto-generated
  createdAt: true,
  updatedAt: true,
});

export const insertContactTracingNotificationTemplateSchema = createInsertSchema(contactTracingNotificationTemplates).omit({
  id: true,
  templateId: true, // Auto-generated
  createdAt: true,
  updatedAt: true,
});

export const insertContactTracingNotificationLogSchema = createInsertSchema(contactTracingNotificationLogs).omit({
  id: true,
  notificationId: true, // Auto-generated
  createdAt: true,
  updatedAt: true,
});

export const insertContactTracingPrivacyConsentSchema = createInsertSchema(contactTracingPrivacyConsent).omit({
  id: true,
  consentId: true, // Auto-generated
  createdAt: true,
  updatedAt: true,
});

export const insertHealthFacilitySchema = createInsertSchema(healthFacilities).omit({
  id: true,
  facilityId: true, // Auto-generated
  createdAt: true,
  updatedAt: true,
});

export const insertPublicHealthAlertSchema = createInsertSchema(publicHealthAlerts).omit({
  id: true,
  alertId: true, // Auto-generated
  createdAt: true,
  updatedAt: true,
});

export const insertEpidemiologicalDataSchema = createInsertSchema(epidemiologicalData).omit({
  id: true,
  dataId: true, // Auto-generated
  createdAt: true,
  updatedAt: true,
});

export type Ticket = typeof tickets.$inferSelect;
export type InsertTicket = z.infer<typeof insertTicketSchema>;

// ===== PUBLIC HEALTH TYPE DEFINITIONS =====

export type PublicHealthIncident = typeof publicHealthIncidents.$inferSelect;
export type InsertPublicHealthIncident = z.infer<typeof insertPublicHealthIncidentSchema>;
export type DiseaseSurveillance = typeof diseaseSurveillance.$inferSelect;
export type InsertDiseaseSurveillance = z.infer<typeof insertDiseaseSurveillanceSchema>;
export type ContactTracing = typeof contactTracing.$inferSelect;
export type InsertContactTracing = z.infer<typeof insertContactTracingSchema>;

// Enhanced Contact Tracing System Types
export type ContactTracingLocationHistory = typeof contactTracingLocationHistory.$inferSelect;
export type InsertContactTracingLocationHistory = z.infer<typeof insertContactTracingLocationHistorySchema>;
export type ContactProximityDetection = typeof contactProximityDetection.$inferSelect;
export type InsertContactProximityDetection = z.infer<typeof insertContactProximityDetectionSchema>;
export type ContactTracingNotificationTemplate = typeof contactTracingNotificationTemplates.$inferSelect;
export type InsertContactTracingNotificationTemplate = z.infer<typeof insertContactTracingNotificationTemplateSchema>;
export type ContactTracingNotificationLog = typeof contactTracingNotificationLogs.$inferSelect;
export type InsertContactTracingNotificationLog = z.infer<typeof insertContactTracingNotificationLogSchema>;
export type ContactTracingPrivacyConsent = typeof contactTracingPrivacyConsent.$inferSelect;
export type InsertContactTracingPrivacyConsent = z.infer<typeof insertContactTracingPrivacyConsentSchema>;

export type HealthFacility = typeof healthFacilities.$inferSelect;
export type InsertHealthFacility = z.infer<typeof insertHealthFacilitySchema>;
export type PublicHealthAlert = typeof publicHealthAlerts.$inferSelect;
export type InsertPublicHealthAlert = z.infer<typeof insertPublicHealthAlertSchema>;
export type EpidemiologicalData = typeof epidemiologicalData.$inferSelect;
export type InsertEpidemiologicalData = z.infer<typeof insertEpidemiologicalDataSchema>;

export type InsertHardwareSecurityDevice = z.infer<typeof insertHardwareSecurityDeviceSchema>;
export type InsertBiometricAuthRecord = z.infer<typeof insertBiometricAuthRecordSchema>;
export type InsertIamIntegration = z.infer<typeof insertIamIntegrationSchema>;
export type InsertSecurityInfrastructure = z.infer<typeof insertSecurityInfrastructureSchema>;
export type InsertThreatIntelligenceSource = z.infer<typeof insertThreatIntelligenceSourceSchema>;

// ===== CyDEF (Autonomous Cyber Defense) System Tables =====

// CyDEF System Instances and Configuration
export const cydefSystems = pgTable("cydef_systems", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  systemName: varchar("system_name").notNull(),
  organizationId: varchar("organization_id").notNull(),
  status: varchar("status").notNull().default("initializing"), // initializing, active, paused, maintenance, error
  geneticAlgorithmStatus: varchar("genetic_algorithm_status").notNull().default("stopped"), // stopped, running, evolving, converged
  currentGeneration: integer("current_generation").default(0),
  bestFitnessScore: integer("best_fitness_score").default(0), // Out of 100
  targetAccuracy: integer("target_accuracy").default(992), // 99.2% = 992 (stored as integer for precision)
  actualAccuracy: integer("actual_accuracy").default(0), // Current accuracy in basis points
  autonomousMode: boolean("autonomous_mode").default(true),
  threatDetectionEngine: varchar("threat_detection_engine").default("pytorch_deap"), // pytorch_deap, tensorflow, hybrid
  lastEvolutionCycle: timestamp("last_evolution_cycle"),
  totalThreatsProcessed: integer("total_threats_processed").default(0),
  totalAutonomousResponses: integer("total_autonomous_responses").default(0),
  configuration: jsonb("configuration").default('{}'), // System-specific configuration
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Autonomous Response Actions and Outcomes
export const cydefAutonomousResponses = pgTable("cydef_autonomous_responses", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  cydefSystemId: varchar("cydef_system_id").notNull().references(() => cydefSystems.id),
  threatId: varchar("threat_id").references(() => threats.id),
  responseType: varchar("response_type").notNull(), // isolate, block, monitor, quarantine, escalate, adapt_policy
  triggerEvent: text("trigger_event").notNull(), // What triggered this response
  responseDetails: jsonb("response_details").notNull(), // Detailed response parameters
  confidenceScore: integer("confidence_score").notNull(), // 0-100
  executionStatus: varchar("execution_status").notNull().default("pending"), // pending, executing, completed, failed, rollback
  autonomousDecision: boolean("autonomous_decision").default(true), // Was this fully autonomous?
  geneticAlgorithmGeneration: integer("genetic_algorithm_generation"), // Which GA generation made this decision
  effectivenessScore: integer("effectiveness_score"), // Post-execution effectiveness (0-100)
  humanOverride: boolean("human_override").default(false),
  humanOverrideReason: text("human_override_reason"),
  executedAt: timestamp("executed_at"),
  completedAt: timestamp("completed_at"),
  rollbackAt: timestamp("rollback_at"),
  metadata: jsonb("metadata").default('{}'),
  createdAt: timestamp("created_at").defaultNow(),
});

// Real-time Defense Policy Generation History  
export const cydefPolicyGenerations = pgTable("cydef_policy_generations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  cydefSystemId: varchar("cydef_system_id").notNull().references(() => cydefSystems.id),
  generation: integer("generation").notNull(),
  sector: varchar("sector").notNull(), // FERPA, FISMA, CIPA, GENERAL
  policyRules: jsonb("policy_rules").notNull(), // Generated security policy rules
  fitnessScore: integer("fitness_score").notNull(), // 0-10000 (for precision)
  accuracyRate: integer("accuracy_rate").notNull(), // In basis points (9920 = 99.2%)
  threatDetectionRate: integer("threat_detection_rate").notNull(), // In basis points
  falsePositiveRate: integer("false_positive_rate").notNull(), // In basis points
  parentGenerations: jsonb("parent_generations"), // IDs of parent generations
  mutationRate: integer("mutation_rate"), // In basis points
  crossoverType: varchar("crossover_type"), // single_point, two_point, uniform
  selectionMethod: varchar("selection_method"), // tournament, roulette, rank
  populationSize: integer("population_size").default(100),
  evolutionDurationMs: integer("evolution_duration_ms"), // Time taken for evolution
  convergenceStatus: varchar("convergence_status").default("evolving"), // evolving, converged, stagnant
  deploymentStatus: varchar("deployment_status").default("generated"), // generated, testing, deployed, retired
  deployedAt: timestamp("deployed_at"),
  retiredAt: timestamp("retired_at"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Real-time CyDEF Events for WebSocket Streaming
export const cydefRealTimeEvents = pgTable("cydef_real_time_events", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  cydefSystemId: varchar("cydef_system_id").notNull().references(() => cydefSystems.id),
  eventType: varchar("event_type").notNull(), // threat_detected, response_executed, policy_evolved, accuracy_improved, system_status
  eventCategory: varchar("event_category").notNull(), // genetic_algorithm, threat_response, system_health, performance
  severity: varchar("severity").notNull(), // info, warning, critical, emergency
  title: varchar("title").notNull(),
  message: text("message").notNull(),
  eventData: jsonb("event_data"), // Structured event data
  broadcastToUsers: boolean("broadcast_to_users").default(true),
  acknowledgedBy: varchar("acknowledged_by").references(() => users.id),
  acknowledgedAt: timestamp("acknowledged_at"),
  resolvedAt: timestamp("resolved_at"),
  expiresAt: timestamp("expires_at"),
  createdAt: timestamp("created_at").defaultNow(),
});

// CyDEF Performance Metrics and Analytics
export const cydefPerformanceMetrics = pgTable("cydef_performance_metrics", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  cydefSystemId: varchar("cydef_system_id").notNull().references(() => cydefSystems.id),
  metricType: varchar("metric_type").notNull(), // accuracy, response_time, threat_detection, false_positive_rate, throughput
  metricCategory: varchar("metric_category").notNull(), // real_time, hourly, daily, weekly, monthly
  value: integer("value").notNull(), // Metric value (scaled for precision)
  unitType: varchar("unit_type").notNull(), // percentage_basis_points, milliseconds, count, rate
  thresholdMin: integer("threshold_min"), // Minimum acceptable value
  thresholdMax: integer("threshold_max"), // Maximum acceptable value
  status: varchar("status").notNull().default("normal"), // normal, warning, critical
  comparedToPrevious: integer("compared_to_previous"), // Percentage change from previous measurement
  measurementPeriod: varchar("measurement_period").notNull(), // real_time, 1h, 24h, 7d, 30d
  associatedGeneration: integer("associated_generation"), // GA generation when metric was recorded
  contextMetadata: jsonb("context_metadata").default('{}'),
  recordedAt: timestamp("recorded_at").defaultNow(),
  createdAt: timestamp("created_at").defaultNow(),
});

// CyDEF Threat Analysis Results
export const cydefThreatAnalyses = pgTable("cydef_threat_analyses", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  cydefSystemId: varchar("cydef_system_id").notNull().references(() => cydefSystems.id),
  threatId: varchar("threat_id").references(() => threats.id),
  analysisType: varchar("analysis_type").notNull(), // real_time, batch, scheduled, on_demand
  threatVector: varchar("threat_vector"), // email, network, web, malware, social_engineering
  riskScore: integer("risk_score").notNull(), // 0-1000 for precision
  confidenceLevel: integer("confidence_level").notNull(), // 0-10000 basis points
  predictedImpact: varchar("predicted_impact"), // low, medium, high, critical
  recommendedActions: jsonb("recommended_actions"), // Array of recommended responses
  geneticAlgorithmContribution: integer("genetic_algorithm_contribution"), // How much GA contributed (0-100)
  traditionalMLContribution: integer("traditional_ml_contribution"), // How much traditional ML contributed
  humanExpertOverride: boolean("human_expert_override").default(false),
  processingTimeMs: integer("processing_time_ms"),
  modelVersion: varchar("model_version"), // Version of the AI model used
  analysisResults: jsonb("analysis_results"), // Detailed analysis results
  validatedByHuman: boolean("validated_by_human").default(false),
  validatedAt: timestamp("validated_at"),
  createdAt: timestamp("created_at").defaultNow(),
});

// ===== CyDEF Insert Schemas =====

export const insertCydefSystemSchema = createInsertSchema(cydefSystems).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertCydefAutonomousResponseSchema = createInsertSchema(cydefAutonomousResponses).omit({
  id: true,
  createdAt: true,
});

export const insertCydefPolicyGenerationSchema = createInsertSchema(cydefPolicyGenerations).omit({
  id: true,
  createdAt: true,
});

export const insertCydefRealTimeEventSchema = createInsertSchema(cydefRealTimeEvents).omit({
  id: true,
  createdAt: true,
});

export const insertCydefPerformanceMetricSchema = createInsertSchema(cydefPerformanceMetrics).omit({
  id: true,
  recordedAt: true,
  createdAt: true,
});

export const insertCydefThreatAnalysisSchema = createInsertSchema(cydefThreatAnalyses).omit({
  id: true,
  createdAt: true,
});

// ===== CyDEF Type Definitions =====

export type CydefSystem = typeof cydefSystems.$inferSelect;
export type InsertCydefSystem = z.infer<typeof insertCydefSystemSchema>;
export type CydefAutonomousResponse = typeof cydefAutonomousResponses.$inferSelect;
export type InsertCydefAutonomousResponse = z.infer<typeof insertCydefAutonomousResponseSchema>;
export type CydefPolicyGeneration = typeof cydefPolicyGenerations.$inferSelect;
export type InsertCydefPolicyGeneration = z.infer<typeof insertCydefPolicyGenerationSchema>;
export type CydefRealTimeEvent = typeof cydefRealTimeEvents.$inferSelect;
export type InsertCydefRealTimeEvent = z.infer<typeof insertCydefRealTimeEventSchema>;
export type CydefPerformanceMetric = typeof cydefPerformanceMetrics.$inferSelect;
export type InsertCydefPerformanceMetric = z.infer<typeof insertCydefPerformanceMetricSchema>;
export type CydefThreatAnalysis = typeof cydefThreatAnalyses.$inferSelect;
export type InsertCydefThreatAnalysis = z.infer<typeof insertCydefThreatAnalysisSchema>;

// ===== Live Location Tracking System Tables =====

// Device Registry and Basic Information
export const liveLocationDevices = pgTable("live_location_devices", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  deviceName: varchar("device_name").notNull(),
  deviceType: varchar("device_type").notNull(), // server, workstation, mobile, iot, router, switch, firewall, camera, sensor
  deviceCategory: varchar("device_category").notNull(), // critical, standard, monitoring, infrastructure
  macAddress: varchar("mac_address"),
  ipAddress: varchar("ip_address"),
  serialNumber: varchar("serial_number"),
  manufacturer: varchar("manufacturer"),
  model: varchar("model"),
  firmwareVersion: varchar("firmware_version"),
  operatingSystem: varchar("operating_system"),
  networkSegmentId: varchar("network_segment_id"),
  assignedTo: varchar("assigned_to").references(() => users.id),
  organizationId: varchar("organization_id").notNull(),
  status: varchar("status").notNull().default("unknown"), // online, offline, maintenance, decommissioned, lost, stolen
  lastSeen: timestamp("last_seen"),
  discoveryMethod: varchar("discovery_method").default("manual"), // manual, network_scan, nozomi_arc, active_probe, snmp
  healthScore: integer("health_score").default(100), // 0-100 health percentage
  criticalAsset: boolean("critical_asset").default(false),
  monitoringEnabled: boolean("monitoring_enabled").default(true),
  locationTrackingEnabled: boolean("location_tracking_enabled").default(false),
  complianceRequired: boolean("compliance_required").default(false),
  complianceFrameworks: jsonb("compliance_frameworks").default('[]'), // Array of applicable frameworks
  metadata: jsonb("metadata").default('{}'),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Location History and Movement Tracking
export const liveLocationHistory = pgTable("live_location_history", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  deviceId: varchar("device_id").notNull().references(() => liveLocationDevices.id),
  latitude: varchar("latitude"),
  longitude: varchar("longitude"),
  altitude: varchar("altitude"),
  accuracy: integer("accuracy"), // GPS accuracy in meters
  locationMethod: varchar("location_method").notNull().default("gps"), // gps, wifi, cellular, ip_geolocation, manual, beacon
  networkLocation: jsonb("network_location"), // Network-based location data
  ipGeolocation: jsonb("ip_geolocation"), // IP-based geolocation data
  address: text("address"), // Human-readable address
  city: varchar("city"),
  state: varchar("state"),
  country: varchar("country"),
  timezone: varchar("timezone"),
  movementSpeed: integer("movement_speed"), // Speed in km/h
  movementDirection: integer("movement_direction"), // Bearing in degrees
  batteryLevel: integer("battery_level"), // For mobile devices (0-100)
  signalStrength: integer("signal_strength"), // Network signal strength
  isInsideGeofence: boolean("is_inside_geofence").default(false),
  geofenceIds: jsonb("geofence_ids").default('[]'), // Array of geofence IDs device is within
  reportedBy: varchar("reported_by"), // Source of location update
  confidence: integer("confidence").default(100), // Confidence in location accuracy (0-100)
  isAnomaly: boolean("is_anomaly").default(false), // Flagged as unusual movement
  recordedAt: timestamp("recorded_at").defaultNow(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Location-based Security Alerts
export const liveLocationAlerts = pgTable("live_location_alerts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  alertType: varchar("alert_type").notNull(), // geofence_breach, unauthorized_movement, device_missing, suspicious_location, network_anomaly
  severity: varchar("severity").notNull().default("medium"), // low, medium, high, critical
  status: varchar("status").notNull().default("active"), // active, acknowledged, resolved, false_positive
  deviceId: varchar("device_id").references(() => liveLocationDevices.id),
  geofenceId: varchar("geofence_id"),
  locationHistoryId: varchar("location_history_id").references(() => liveLocationHistory.id),
  threatId: varchar("threat_id").references(() => threats.id), // Link to related threat
  alertTitle: varchar("alert_title").notNull(),
  alertDescription: text("alert_description"),
  currentLocation: jsonb("current_location"), // Current coordinates and details
  expectedLocation: jsonb("expected_location"), // Where device should be
  riskAssessment: jsonb("risk_assessment"), // Automated risk analysis
  recommendedActions: jsonb("recommended_actions"), // Suggested response actions
  automatedResponse: boolean("automated_response").default(false),
  responseActions: jsonb("response_actions"), // Actions taken
  acknowledgedBy: varchar("acknowledged_by").references(() => users.id),
  acknowledgedAt: timestamp("acknowledged_at"),
  resolvedBy: varchar("resolved_by").references(() => users.id),
  resolvedAt: timestamp("resolved_at"),
  escalationLevel: integer("escalation_level").default(0), // 0-5 escalation levels
  notificationsSent: jsonb("notifications_sent").default('[]'), // Track notifications
  complianceImpact: varchar("compliance_impact"), // FERPA, FISMA, HIPAA, etc.
  investigationNotes: text("investigation_notes"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Geographic Boundaries and Rules
export const liveLocationGeoFences = pgTable("live_location_geofences", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: varchar("name").notNull(),
  description: text("description"),
  fenceType: varchar("fence_type").notNull().default("circular"), // circular, polygon, corridor
  centerLatitude: varchar("center_latitude"),
  centerLongitude: varchar("center_longitude"),
  radius: integer("radius"), // Radius in meters for circular fences
  polygonCoordinates: jsonb("polygon_coordinates"), // Array of coordinates for polygon fences
  organizationId: varchar("organization_id").notNull(),
  isActive: boolean("is_active").default(true),
  alertOnEntry: boolean("alert_on_entry").default(false),
  alertOnExit: boolean("alert_on_exit").default(true),
  allowedDeviceTypes: jsonb("allowed_device_types").default('[]'), // Restricted device types
  timeRestrictions: jsonb("time_restrictions"), // Time-based access rules
  complianceZone: boolean("compliance_zone").default(false),
  complianceFramework: varchar("compliance_framework"), // FERPA, FISMA, etc.
  securityLevel: varchar("security_level").default("standard"), // public, standard, restricted, classified
  monitoringLevel: varchar("monitoring_level").default("standard"), // minimal, standard, enhanced, maximum
  automatedResponses: jsonb("automated_responses").default('[]'), // Automated response rules
  priority: integer("priority").default(5), // 1-10 priority level
  createdBy: varchar("created_by").notNull().references(() => users.id),
  lastModifiedBy: varchar("last_modified_by").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Physical Asset Tracking
export const liveLocationAssets = pgTable("live_location_assets", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  assetTag: varchar("asset_tag").notNull().unique(),
  assetName: varchar("asset_name").notNull(),
  assetType: varchar("asset_type").notNull(), // laptop, server, mobile_device, tablet, networking_equipment, iot_device, vehicle, equipment
  category: varchar("category").notNull(), // it_equipment, security_device, facility_equipment, vehicle, personal_device
  deviceId: varchar("device_id").references(() => liveLocationDevices.id), // Link to device if applicable
  serialNumber: varchar("serial_number"),
  manufacturer: varchar("manufacturer"),
  model: varchar("model"),
  purchaseDate: timestamp("purchase_date"),
  warrantyExpiration: timestamp("warranty_expiration"),
  value: integer("value"), // Asset value in cents
  condition: varchar("condition").default("good"), // excellent, good, fair, poor, damaged
  status: varchar("status").notNull().default("active"), // active, inactive, maintenance, lost, stolen, disposed
  assignedTo: varchar("assigned_to").references(() => users.id),
  assignedLocation: varchar("assigned_location"), // Expected/assigned location
  currentLocation: jsonb("current_location"), // Current tracked location
  homeBase: jsonb("home_base"), // Primary/home location
  custodian: varchar("custodian").references(() => users.id), // Person responsible for asset
  organizationId: varchar("organization_id").notNull(),
  criticality: varchar("criticality").default("standard"), // low, standard, high, critical
  trackingMethod: varchar("tracking_method").default("manual"), // manual, gps, rfid, beacon, network
  trackingEnabled: boolean("tracking_enabled").default(false),
  complianceRequired: boolean("compliance_required").default(false),
  complianceFrameworks: jsonb("compliance_frameworks").default('[]'), // Applicable compliance requirements
  maintenanceSchedule: jsonb("maintenance_schedule"), // Maintenance requirements
  lastInventory: timestamp("last_inventory"), // Last physical inventory check
  inventoryFrequency: varchar("inventory_frequency").default("quarterly"), // monthly, quarterly, annually
  riskAssessment: jsonb("risk_assessment"), // Security risk analysis
  encryptionStatus: varchar("encryption_status"), // none, partial, full, unknown
  accessControls: jsonb("access_controls"), // Access control settings
  backupStatus: varchar("backup_status"), // none, partial, full, unknown
  incidentHistory: jsonb("incident_history").default('[]'), // Previous security incidents
  notes: text("notes"),
  metadata: jsonb("metadata").default('{}'),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Network Topology Mapping
export const liveLocationNetworkSegments = pgTable("live_location_network_segments", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  segmentName: varchar("segment_name").notNull(),
  segmentType: varchar("segment_type").notNull(), // lan, wan, dmz, guest, iot, management, production, development
  networkRange: varchar("network_range").notNull(), // CIDR notation
  vlanId: integer("vlan_id"),
  subnetMask: varchar("subnet_mask"),
  gateway: varchar("gateway"),
  dnsServers: jsonb("dns_servers").default('[]'),
  organizationId: varchar("organization_id").notNull(),
  physicalLocation: text("physical_location"), // Building, floor, room
  geographicLocation: jsonb("geographic_location"), // Lat/lng of network segment
  securityZone: varchar("security_zone").notNull().default("internal"), // external, dmz, internal, restricted, isolated
  trustLevel: varchar("trust_level").default("standard"), // untrusted, low, standard, high, critical
  monitoringEnabled: boolean("monitoring_enabled").default(true),
  isolationCapable: boolean("isolation_capable").default(false),
  firewallRules: jsonb("firewall_rules").default('[]'), // Associated firewall rules
  accessControlList: jsonb("access_control_list").default('[]'), // Network ACLs
  deviceCount: integer("device_count").default(0), // Number of devices in segment
  criticalDeviceCount: integer("critical_device_count").default(0),
  lastScan: timestamp("last_scan"), // Last network discovery scan
  scanFrequency: varchar("scan_frequency").default("daily"), // hourly, daily, weekly
  threatLevel: varchar("threat_level").default("low"), // low, medium, high, critical
  complianceZone: boolean("compliance_zone").default(false),
  complianceRequirements: jsonb("compliance_requirements").default('[]'), // FERPA, FISMA, etc.
  networkHealth: integer("network_health").default(100), // 0-100 health score
  bandwidthUtilization: integer("bandwidth_utilization").default(0), // 0-100 percentage
  latencyMs: integer("latency_ms"), // Average latency in milliseconds
  packetLoss: integer("packet_loss").default(0), // Packet loss percentage * 100
  availabilityScore: integer("availability_score").default(100), // 0-100 availability
  integrationData: jsonb("integration_data"), // Nozomi Arc and other integration data
  isActive: boolean("is_active").default(true),
  createdBy: varchar("created_by").notNull().references(() => users.id),
  lastModifiedBy: varchar("last_modified_by").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// ===== Live Location Insert Schemas =====

export const insertLiveLocationDeviceSchema = createInsertSchema(liveLocationDevices).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertLiveLocationHistorySchema = createInsertSchema(liveLocationHistory).omit({
  id: true,
  recordedAt: true,
  createdAt: true,
});

export const insertLiveLocationAlertSchema = createInsertSchema(liveLocationAlerts).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertLiveLocationGeoFenceSchema = createInsertSchema(liveLocationGeoFences).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertLiveLocationAssetSchema = createInsertSchema(liveLocationAssets).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertLiveLocationNetworkSegmentSchema = createInsertSchema(liveLocationNetworkSegments).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// ===== Live Location Type Definitions =====

export type LiveLocationDevice = typeof liveLocationDevices.$inferSelect;
export type InsertLiveLocationDevice = z.infer<typeof insertLiveLocationDeviceSchema>;
export type LiveLocationHistory = typeof liveLocationHistory.$inferSelect;
export type InsertLiveLocationHistory = z.infer<typeof insertLiveLocationHistorySchema>;
export type LiveLocationAlert = typeof liveLocationAlerts.$inferSelect;
export type InsertLiveLocationAlert = z.infer<typeof insertLiveLocationAlertSchema>;
export type LiveLocationGeoFence = typeof liveLocationGeoFences.$inferSelect;
export type InsertLiveLocationGeoFence = z.infer<typeof insertLiveLocationGeoFenceSchema>;
export type LiveLocationAsset = typeof liveLocationAssets.$inferSelect;
export type InsertLiveLocationAsset = z.infer<typeof insertLiveLocationAssetSchema>;
export type LiveLocationNetworkSegment = typeof liveLocationNetworkSegments.$inferSelect;
export type InsertLiveLocationNetworkSegment = z.infer<typeof insertLiveLocationNetworkSegmentSchema>;

// ===== CypherHUM Tables =====

export const cypherhumSessions = pgTable("cypherhum_sessions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  sessionType: varchar("session_type").notNull().default("holographic"), // holographic, ar, vr, mixed_reality
  status: varchar("status").notNull().default("active"), // active, paused, completed, terminated
  startTime: timestamp("start_time").defaultNow(),
  endTime: timestamp("end_time"),
  duration: integer("duration"), // in seconds
  threatsVisualized: integer("threats_visualized").default(0),
  aiInteractions: integer("ai_interactions").default(0),
  visualizationPresetId: varchar("visualization_preset_id").references(() => cypherhumVisualizations.id),
  sessionData: jsonb("session_data"), // Camera positions, user preferences, session state
  performanceMetrics: jsonb("performance_metrics"), // FPS, rendering stats, interaction latency
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const cypherhumVisualizations = pgTable("cypherhum_visualizations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: varchar("name").notNull(),
  description: text("description"),
  visualizationType: varchar("visualization_type").notNull(), // threat_landscape, network_topology, attack_flow, ai_analysis
  configurationData: jsonb("configuration_data").notNull(), // 3D scene configuration, lighting, materials
  renderingSettings: jsonb("rendering_settings").notNull(), // Quality settings, effects, optimizations
  cameraSettings: jsonb("camera_settings"), // Initial camera position, constraints, movement settings
  interactionSettings: jsonb("interaction_settings"), // Hover effects, click behaviors, navigation
  aiSettings: jsonb("ai_settings"), // AI processing preferences, analysis depth
  isDefault: boolean("is_default").default(false),
  isPublic: boolean("is_public").default(false),
  createdBy: varchar("created_by").notNull().references(() => users.id),
  organizationId: varchar("organization_id"),
  usageCount: integer("usage_count").default(0),
  rating: integer("rating").default(0), // User rating 1-5
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const cypherhumInteractions = pgTable("cypherhum_interactions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  sessionId: varchar("session_id").notNull().references(() => cypherhumSessions.id),
  interactionType: varchar("interaction_type").notNull(), // voice_command, text_query, gesture, eye_tracking, 3d_manipulation
  inputData: jsonb("input_data").notNull(), // Raw input data (voice, text, coordinates, etc.)
  processedInput: text("processed_input"), // Cleaned/processed input for AI analysis
  aiResponse: jsonb("ai_response"), // AI analysis result and response data
  responseType: varchar("response_type").notNull(), // visualization_update, data_display, action_execution, analysis_result
  processingTime: integer("processing_time"), // AI processing time in milliseconds
  confidenceScore: integer("confidence_score"), // AI confidence 0-100
  contextData: jsonb("context_data"), // Session context, previous interactions, environmental data
  threeDManipulation: jsonb("three_d_manipulation"), // 3D object manipulations performed
  visualizationImpact: jsonb("visualization_impact"), // Changes made to 3D visualization
  userFeedback: varchar("user_feedback"), // positive, negative, neutral
  timestamp: timestamp("timestamp").defaultNow(),
});

export const cypherhumThreatModels = pgTable("cypherhum_threat_models", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  threatId: varchar("threat_id").notNull().references(() => threats.id),
  modelType: varchar("model_type").notNull(), // particle_system, 3d_mesh, hologram, volumetric
  geometryData: jsonb("geometry_data").notNull(), // 3D model vertices, faces, normals
  materialProperties: jsonb("material_properties").notNull(), // Colors, textures, shaders, transparency
  animationData: jsonb("animation_data"), // Movement patterns, transformations, particle behaviors
  interactionBehavior: jsonb("interaction_behavior"), // Click/hover responses, drill-down data
  severity3DMapping: jsonb("severity_3d_mapping"), // How severity affects 3D representation
  realTimeProperties: jsonb("real_time_properties"), // Properties for live updates
  renderingOptimization: jsonb("rendering_optimization"), // LOD, culling, instancing settings
  aiEnhancement: jsonb("ai_enhancement"), // AI-generated visual enhancements
  spatialPosition: jsonb("spatial_position"), // Default 3D position in threat landscape
  scale: jsonb("scale"), // Size multipliers based on threat characteristics
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const cypherhumAnalytics = pgTable("cypherhum_analytics", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  sessionId: varchar("session_id").references(() => cypherhumSessions.id),
  userId: varchar("user_id").notNull().references(() => users.id),
  metricType: varchar("metric_type").notNull(), // performance, interaction, ai_effectiveness, user_behavior
  metricName: varchar("metric_name").notNull(), // fps, response_time, threat_detection_accuracy, etc.
  metricValue: integer("metric_value").notNull(),
  metricUnit: varchar("metric_unit"), // ms, fps, percentage, count
  additionalData: jsonb("additional_data"), // Extended metric information
  deviceInfo: jsonb("device_info"), // Hardware specs, browser, capabilities
  visualizationContext: jsonb("visualization_context"), // What was being visualized
  aiContext: jsonb("ai_context"), // AI processing context
  organizationId: varchar("organization_id"),
  timestamp: timestamp("timestamp").defaultNow(),
});

// ===== CypherHUM Insert Schemas =====

export const insertCypherhumSessionSchema = createInsertSchema(cypherhumSessions).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertCypherhumVisualizationSchema = createInsertSchema(cypherhumVisualizations).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertCypherhumInteractionSchema = createInsertSchema(cypherhumInteractions).omit({
  id: true,
  timestamp: true,
});

export const insertCypherhumThreatModelSchema = createInsertSchema(cypherhumThreatModels).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertCypherhumAnalyticsSchema = createInsertSchema(cypherhumAnalytics).omit({
  id: true,
  timestamp: true,
});

// ===== CypherHUM Type Definitions =====

export type CypherhumSession = typeof cypherhumSessions.$inferSelect;
export type InsertCypherhumSession = z.infer<typeof insertCypherhumSessionSchema>;
export type CypherhumVisualization = typeof cypherhumVisualizations.$inferSelect;
export type InsertCypherhumVisualization = z.infer<typeof insertCypherhumVisualizationSchema>;
export type CypherhumInteraction = typeof cypherhumInteractions.$inferSelect;
export type InsertCypherhumInteraction = z.infer<typeof insertCypherhumInteractionSchema>;
export type CypherhumThreatModel = typeof cypherhumThreatModels.$inferSelect;
export type InsertCypherhumThreatModel = z.infer<typeof insertCypherhumThreatModelSchema>;
export type CypherhumAnalytics = typeof cypherhumAnalytics.$inferSelect;
export type InsertCypherhumAnalytics = z.infer<typeof insertCypherhumAnalyticsSchema>;

// ===== ACDS (Autonomous Cyber Defense Swarm) Tables =====

// Individual Drone Specifications and Status
export const acdsDrones = pgTable("acds_drones", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  droneId: varchar("drone_id").notNull().unique(), // Unique identifier for physical drone
  droneName: varchar("drone_name").notNull(),
  droneType: varchar("drone_type").notNull(), // cyber_patrol, network_scanner, threat_hunter, response_unit, reconnaissance, communication_relay
  category: varchar("category").notNull().default("autonomous"), // autonomous, semi_autonomous, manual_control, ai_enhanced
  manufacturerModel: varchar("manufacturer_model"), // Physical drone model information
  capabilities: jsonb("capabilities").notNull(), // Detection sensors, communication equipment, defensive tools
  maxFlightTime: integer("max_flight_time").default(3600), // Maximum flight time in seconds
  maxRange: integer("max_range").default(10000), // Maximum operational range in meters
  maxAltitude: integer("max_altitude").default(500), // Maximum altitude in meters
  currentStatus: varchar("current_status").notNull().default("standby"), // standby, active, patrol, mission, maintenance, offline, emergency, charging
  operationalHealth: integer("operational_health").default(100), // 0-100 health score
  batteryLevel: integer("battery_level").default(100), // 0-100 battery percentage
  currentLatitude: varchar("current_latitude"),
  currentLongitude: varchar("current_longitude"),
  currentAltitude: integer("current_altitude"), // Current altitude in meters
  homeBaseLatitude: varchar("home_base_latitude").notNull(),
  homeBaseLongitude: varchar("home_base_longitude").notNull(),
  homeBaseAltitude: integer("home_base_altitude").default(0),
  networkStatus: varchar("network_status").default("connected"), // connected, weak_signal, disconnected, intermittent
  signalStrength: integer("signal_strength").default(100), // 0-100 signal strength
  assignedMissionId: varchar("assigned_mission_id"),
  swarmRole: varchar("swarm_role").default("follower"), // leader, coordinator, follower, scout, guardian, specialist
  autonomyLevel: varchar("autonomy_level").default("semi_autonomous"), // manual, semi_autonomous, autonomous, ai_driven
  cydefIntegration: boolean("cydef_integration").default(true), // Integration with CyDEF genetic algorithms
  threatDetectionCapabilities: jsonb("threat_detection_capabilities").default('[]'), // AI threat detection sensors
  communicationChannels: jsonb("communication_channels").default('[]'), // Available communication methods
  defensiveCapabilities: jsonb("defensive_capabilities").default('[]'), // Countermeasure capabilities
  sensorPackage: jsonb("sensor_package"), // Installed sensor specifications
  aiProcessingUnit: jsonb("ai_processing_unit"), // Onboard AI capabilities
  encryptionLevel: varchar("encryption_level").default("aes256"), // Data transmission encryption
  complianceFrameworks: jsonb("compliance_frameworks").default('[]'), // FISMA, FedRAMP, etc.
  lastMaintenance: timestamp("last_maintenance"),
  nextMaintenancedue: timestamp("next_maintenance_due"),
  totalFlightHours: integer("total_flight_hours").default(0),
  totalMissions: integer("total_missions").default(0),
  successfulMissions: integer("successful_missions").default(0),
  organizationId: varchar("organization_id").notNull(),
  operatorId: varchar("operator_id").references(() => users.id),
  isActive: boolean("is_active").default(true),
  emergencyContactProtocol: jsonb("emergency_contact_protocol"),
  lastLocationUpdate: timestamp("last_location_update"),
  lastStatusUpdate: timestamp("last_status_update"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Swarm Mission Planning and Execution
export const acdsSwarmMissions = pgTable("acds_swarm_missions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  missionName: varchar("mission_name").notNull(),
  missionType: varchar("mission_type").notNull(), // threat_response, perimeter_patrol, network_scan, incident_investigation, proactive_hunt, emergency_response
  priority: varchar("priority").notNull().default("medium"), // low, medium, high, critical, emergency
  status: varchar("status").notNull().default("planning"), // planning, active, paused, completed, failed, aborted, emergency
  missionDescription: text("mission_description"),
  targetArea: jsonb("target_area").notNull(), // Geographic area with coordinates, boundaries
  objectives: jsonb("objectives").notNull(), // Mission-specific goals and success criteria
  threatContext: jsonb("threat_context"), // Related threat information from CyDEF
  estimatedDuration: integer("estimated_duration").default(3600), // Estimated duration in seconds
  actualDuration: integer("actual_duration"), // Actual mission duration
  requiredDroneCount: integer("required_drone_count").default(1),
  assignedDrones: jsonb("assigned_drones").default('[]'), // Array of drone IDs
  swarmConfiguration: jsonb("swarm_configuration"), // Formation patterns, roles, coordination rules
  coordinationAlgorithm: varchar("coordination_algorithm").default("distributed_consensus"), // distributed_consensus, leader_follower, hierarchical, ai_optimized
  autonomyLevel: varchar("autonomy_level").default("semi_autonomous"), // manual, semi_autonomous, autonomous, ai_driven
  riskAssessment: jsonb("risk_assessment"), // Mission risk analysis and mitigation
  weatherConditions: jsonb("weather_conditions"), // Weather impact assessment
  airspaceRestrictions: jsonb("airspace_restrictions"), // Flight restrictions and compliance
  communicationProtocol: varchar("communication_protocol").default("encrypted_mesh"), // Communication method between drones
  dataCollectionRequirements: jsonb("data_collection_requirements"), // What data to collect
  realTimeReporting: boolean("real_time_reporting").default(true),
  emergencyProcedures: jsonb("emergency_procedures"), // Emergency protocols and fallback plans
  cydefIntegration: jsonb("cydef_integration"), // Integration with genetic algorithm decisions
  liveLocationIntegration: boolean("live_location_integration").default(true),
  plannedStartTime: timestamp("planned_start_time"),
  actualStartTime: timestamp("actual_start_time"),
  plannedEndTime: timestamp("planned_end_time"),
  actualEndTime: timestamp("actual_end_time"),
  missionCommander: varchar("mission_commander").notNull().references(() => users.id),
  approvedBy: varchar("approved_by").references(() => users.id),
  organizationId: varchar("organization_id").notNull(),
  complianceRequirements: jsonb("compliance_requirements").default('[]'),
  resultsData: jsonb("results_data"), // Mission outcome and collected data
  performanceMetrics: jsonb("performance_metrics"), // Success rates, efficiency metrics
  lessonsLearned: text("lessons_learned"), // Post-mission analysis
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Real-time Drone Deployment and Positioning
export const acdsDeployments = pgTable("acds_deployments", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  deploymentId: varchar("deployment_id").notNull().unique(),
  missionId: varchar("mission_id").references(() => acdsSwarmMissions.id),
  droneId: varchar("drone_id").notNull().references(() => acdsDrones.id),
  deploymentType: varchar("deployment_type").notNull(), // autonomous_patrol, threat_response, emergency_deployment, scheduled_mission, reactive_deployment
  deploymentStatus: varchar("deployment_status").notNull().default("preparing"), // preparing, deploying, active, returning, completed, failed, emergency_recall
  currentLatitude: varchar("current_latitude"),
  currentLongitude: varchar("current_longitude"),
  currentAltitude: integer("current_altitude"),
  targetLatitude: varchar("target_latitude"),
  targetLongitude: varchar("target_longitude"),
  targetAltitude: integer("target_altitude"),
  flightPath: jsonb("flight_path"), // Planned and actual flight trajectory
  formationPosition: jsonb("formation_position"), // Position within swarm formation
  speedKmh: integer("speed_kmh").default(0), // Current speed in km/h
  heading: integer("heading").default(0), // Direction in degrees (0-360)
  batteryConsumption: integer("battery_consumption").default(0), // Battery usage rate
  estimatedRemainingTime: integer("estimated_remaining_time"), // Estimated time until battery critical
  sensorReadings: jsonb("sensor_readings"), // Real-time sensor data
  threatDetections: jsonb("threat_detections").default('[]'), // Detected threats during deployment
  communicationLog: jsonb("communication_log").default('[]'), // Inter-drone communications
  coordinationCommands: jsonb("coordination_commands").default('[]'), // Swarm coordination instructions
  autonomousDecisions: jsonb("autonomous_decisions").default('[]'), // AI-driven decisions made
  cydefResponses: jsonb("cydef_responses").default('[]'), // Responses from CyDEF genetic algorithms
  environmentalFactors: jsonb("environmental_factors"), // Weather, obstacles, interference
  riskLevelCurrent: varchar("risk_level_current").default("low"), // Current assessed risk level
  emergencyProceduresActive: boolean("emergency_procedures_active").default(false),
  returnToBaseInitiated: boolean("return_to_base_initiated").default(false),
  missionObjectiveStatus: jsonb("mission_objective_status"), // Progress on specific objectives
  dataCollected: jsonb("data_collected"), // Information gathered during deployment
  anomaliesDetected: jsonb("anomalies_detected").default('[]'), // Unusual observations
  networkConnectivity: varchar("network_connectivity").default("stable"), // stable, unstable, intermittent, lost
  lastHeartbeat: timestamp("last_heartbeat"),
  deploymentStartTime: timestamp("deployment_start_time").defaultNow(),
  estimatedCompletionTime: timestamp("estimated_completion_time"),
  actualCompletionTime: timestamp("actual_completion_time"),
  organizationId: varchar("organization_id").notNull(),
  operatorOverride: boolean("operator_override").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Swarm Coordination Algorithms and Decision Records
export const acdsCoordination = pgTable("acds_coordination", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  coordinationEventId: varchar("coordination_event_id").notNull().unique(),
  eventType: varchar("event_type").notNull(), // formation_change, role_reassignment, threat_response_coordination, emergency_coordination, optimization_decision
  swarmId: varchar("swarm_id").notNull(), // Identifier for the coordinated swarm
  participatingDrones: jsonb("participating_drones").notNull(), // Array of drone IDs involved
  coordinationAlgorithm: varchar("coordination_algorithm").notNull(), // genetic_algorithm, consensus_protocol, leader_election, distributed_optimization
  decisionTrigger: varchar("decision_trigger").notNull(), // threat_detected, mission_objective, operator_command, ai_recommendation, emergency_situation
  inputData: jsonb("input_data").notNull(), // Data used for coordination decision
  algorithmParameters: jsonb("algorithm_parameters"), // Configuration for coordination algorithm
  geneticAlgorithmGeneration: integer("genetic_algorithm_generation"), // CyDEF integration data
  geneticAlgorithmFitness: integer("genetic_algorithm_fitness"), // Fitness score from genetic algorithm
  cydefRecommendation: jsonb("cydef_recommendation"), // AI recommendation from CyDEF system
  coordinationDecision: jsonb("coordination_decision").notNull(), // Final coordination decision made
  decisionConfidence: integer("decision_confidence").default(100), // 0-100 confidence in decision
  implementationStatus: varchar("implementation_status").default("pending"), // pending, implementing, completed, failed, overridden
  resultMetrics: jsonb("result_metrics"), // Effectiveness metrics of coordination
  droneResponses: jsonb("drone_responses").default('[]'), // Individual drone responses to coordination
  executionTime: integer("execution_time"), // Time to implement coordination in milliseconds
  successRate: integer("success_rate"), // Success rate of coordination implementation
  overrideReason: varchar("override_reason"), // Reason if operator override occurred
  adaptiveLearning: jsonb("adaptive_learning"), // Learning data for algorithm improvement
  emergencyContext: jsonb("emergency_context"), // Emergency situation details if applicable
  threatContext: jsonb("threat_context"), // Related threat information
  missionContext: jsonb("mission_context"), // Related mission information
  environmentalFactors: jsonb("environmental_factors"), // Environmental considerations
  complianceCheck: jsonb("compliance_check"), // Regulatory compliance verification
  organizationId: varchar("organization_id").notNull(),
  initiatedBy: varchar("initiated_by").references(() => users.id), // User or system that initiated
  approvedBy: varchar("approved_by").references(() => users.id), // If approval was required
  eventTimestamp: timestamp("event_timestamp").defaultNow(),
  implementationStartTime: timestamp("implementation_start_time"),
  implementationEndTime: timestamp("implementation_end_time"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Performance Metrics and Analytics
export const acdsAnalytics = pgTable("acds_analytics", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  analyticsType: varchar("analytics_type").notNull(), // performance, mission_success, drone_health, swarm_efficiency, threat_response, ai_effectiveness
  metricCategory: varchar("metric_category").notNull(), // operational, financial, security, compliance, performance, predictive
  metricName: varchar("metric_name").notNull(), // mission_success_rate, average_response_time, battery_efficiency, etc.
  metricValue: integer("metric_value").notNull(),
  metricUnit: varchar("metric_unit"), // percentage, seconds, meters, count, score
  aggregationPeriod: varchar("aggregation_period").default("real_time"), // real_time, hourly, daily, weekly, monthly, mission_based
  organizationId: varchar("organization_id").notNull(),
  droneId: varchar("drone_id").references(() => acdsDrones.id), // Specific drone metrics
  missionId: varchar("mission_id").references(() => acdsSwarmMissions.id), // Mission-specific metrics
  swarmId: varchar("swarm_id"), // Swarm-level metrics
  deploymentId: varchar("deployment_id").references(() => acdsDeployments.id), // Deployment metrics
  coordinationEventId: varchar("coordination_event_id").references(() => acdsCoordination.id), // Coordination metrics
  metricData: jsonb("metric_data").notNull(), // Detailed metric information and breakdowns
  comparisonBaseline: jsonb("comparison_baseline"), // Historical or target values for comparison
  trendAnalysis: jsonb("trend_analysis"), // Trend data and projections
  anomalyFlags: jsonb("anomaly_flags").default('[]'), // Detected anomalies in metrics
  performanceThresholds: jsonb("performance_thresholds"), // Acceptable performance ranges
  alertsTriggered: jsonb("alerts_triggered").default('[]'), // Performance alerts generated
  improvementSuggestions: jsonb("improvement_suggestions").default('[]'), // AI-generated recommendations
  correlatedMetrics: jsonb("correlated_metrics").default('[]'), // Related metrics and dependencies
  cydefIntegration: jsonb("cydef_integration"), // Integration with genetic algorithm metrics
  liveLocationCorrelation: jsonb("live_location_correlation"), // Asset tracking correlations
  environmentalImpact: jsonb("environmental_impact"), // Weather and environmental factors
  operationalContext: jsonb("operational_context"), // Operational circumstances during measurement
  dataQuality: varchar("data_quality").default("high"), // high, medium, low, uncertain
  dataSource: varchar("data_source").notNull(), // drone_sensors, mission_system, coordination_algorithm, manual_input
  validationStatus: varchar("validation_status").default("validated"), // validated, pending, flagged, rejected
  reportingPeriodStart: timestamp("reporting_period_start"),
  reportingPeriodEnd: timestamp("reporting_period_end"),
  calculatedAt: timestamp("calculated_at").defaultNow(),
  createdAt: timestamp("created_at").defaultNow(),
});

// ===== ACDS Insert Schemas =====

export const insertAcdsDroneSchema = createInsertSchema(acdsDrones).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertAcdsSwarmMissionSchema = createInsertSchema(acdsSwarmMissions).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertAcdsDeploymentSchema = createInsertSchema(acdsDeployments).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertAcdsCoordinationSchema = createInsertSchema(acdsCoordination).omit({
  id: true,
  createdAt: true,
  eventTimestamp: true,
});

export const insertAcdsAnalyticsSchema = createInsertSchema(acdsAnalytics).omit({
  id: true,
  calculatedAt: true,
  createdAt: true,
});

// ===== ACDS Type Definitions =====

export type AcdsDrone = typeof acdsDrones.$inferSelect;
export type InsertAcdsDrone = z.infer<typeof insertAcdsDroneSchema>;
export type AcdsSwarmMission = typeof acdsSwarmMissions.$inferSelect;
export type InsertAcdsSwarmMission = z.infer<typeof insertAcdsSwarmMissionSchema>;
export type AcdsDeployment = typeof acdsDeployments.$inferSelect;
export type InsertAcdsDeployment = z.infer<typeof insertAcdsDeploymentSchema>;
export type AcdsCoordination = typeof acdsCoordination.$inferSelect;
export type InsertAcdsCoordination = z.infer<typeof insertAcdsCoordinationSchema>;
export type AcdsAnalytics = typeof acdsAnalytics.$inferSelect;
export type InsertAcdsAnalytics = z.infer<typeof insertAcdsAnalyticsSchema>;

// ===== UNIFIED SYSTEM TYPES FOR CROSS-SYSTEM INTEGRATION =====

// Unified System Status - Aggregated health status from all four systems
export const UnifiedSystemStatusSchema = z.object({
  systemId: z.string(),
  systemName: z.string(),
  status: z.enum(['operational', 'warning', 'critical', 'maintenance', 'offline']),
  lastUpdate: z.string().datetime(),
  subsystems: z.object({
    cydef: z.object({
      status: z.enum(['operational', 'warning', 'critical', 'offline']),
      activeThreats: z.number(),
      geneticGeneration: z.number(),
      fitnessScore: z.number(),
      autonomousMode: z.boolean(),
      lastEvolution: z.string().datetime().optional(),
    }),
    liveLocation: z.object({
      status: z.enum(['operational', 'warning', 'critical', 'offline']),
      trackedDevices: z.number(),
      onlineDevices: z.number(),
      activeAlerts: z.number(),
      geofenceBreaches: z.number(),
      lastLocationUpdate: z.string().datetime().optional(),
    }),
    cypherHUM: z.object({
      status: z.enum(['operational', 'warning', 'critical', 'offline']),
      activeSessions: z.number(),
      threatsVisualized: z.number(),
      aiInteractions: z.number(),
      holographicQuality: z.enum(['low', 'medium', 'high', 'ultra']),
      averageFPS: z.number(),
    }),
    acds: z.object({
      status: z.enum(['operational', 'warning', 'critical', 'offline']),
      totalDrones: z.number(),
      activeDrones: z.number(),
      activeMissions: z.number(),
      swarmCoordination: z.enum(['manual', 'semi_autonomous', 'autonomous', 'ai_driven']),
      averageBatteryLevel: z.number(),
    }),
  }),
  overallHealth: z.number(), // 0-100 percentage
  criticalIssues: z.array(z.string()),
  performanceMetrics: z.object({
    responseTime: z.number(),
    throughput: z.number(),
    reliability: z.number(),
    availability: z.number(),
  }),
});

// Cross-System Metrics for correlation analysis
export const CrossSystemMetricsSchema = z.object({
  timeRange: z.object({
    start: z.string().datetime(),
    end: z.string().datetime(),
  }),
  correlationAnalysis: z.object({
    cydefLiveLocationCorrelation: z.number(), // -1 to 1 correlation coefficient
    cydefACDSCorrelation: z.number(),
    liveLocationACDSCorrelation: z.number(),
    cypherHUMEffectiveness: z.number(),
    overallSystemSynergy: z.number(),
  }),
  threatResponseMetrics: z.object({
    averageDetectionTime: z.number(),
    averageResponseTime: z.number(),
    automaticResponseRate: z.number(),
    falsePositiveRate: z.number(),
    threatResolutionRate: z.number(),
  }),
  aiIntegrationMetrics: z.object({
    geneticAlgorithmEffectiveness: z.number(),
    aiDecisionAccuracy: z.number(),
    holographicAnalysisAccuracy: z.number(),
    swarmCoordinationEfficiency: z.number(),
    predictiveModelAccuracy: z.number(),
  }),
  operationalMetrics: z.object({
    systemUptime: z.number(),
    dataIntegrityScore: z.number(),
    securityPostureScore: z.number(),
    complianceScore: z.number(),
    userSatisfactionScore: z.number(),
  }),
});

// Executive Dashboard Metrics for high-level reporting
export const ExecutiveMetricsSchema = z.object({
  executiveSummary: z.object({
    overallSecurityPosture: z.enum(['excellent', 'good', 'fair', 'poor', 'critical']),
    threatLandscapeStatus: z.enum(['calm', 'elevated', 'high', 'critical']),
    systemPerformanceRating: z.number(), // 0-100
    complianceStatus: z.enum(['compliant', 'minor_issues', 'major_issues', 'non_compliant']),
    riskLevel: z.enum(['low', 'moderate', 'high', 'critical']),
  }),
  keyPerformanceIndicators: z.object({
    threatDetectionRate: z.number(),
    incidentResponseTime: z.number(),
    systemAvailability: z.number(),
    userProductivity: z.number(),
    costEfficiency: z.number(),
    roiMetrics: z.number(),
  }),
  trendAnalysis: z.object({
    threatTrends: z.array(z.object({
      period: z.string(),
      threatCount: z.number(),
      severity: z.string(),
      category: z.string(),
    })),
    performanceTrends: z.array(z.object({
      period: z.string(),
      metric: z.string(),
      value: z.number(),
      trend: z.enum(['improving', 'stable', 'declining']),
    })),
  }),
  riskAssessment: z.object({
    currentRiskScore: z.number(),
    riskFactors: z.array(z.string()),
    mitigationStrategies: z.array(z.string()),
    recommendations: z.array(z.string()),
  }),
  budgetMetrics: z.object({
    totalInvestment: z.number(),
    costPerIncidentPrevented: z.number(),
    savingsFromAutomation: z.number(),
    predictedROI: z.number(),
  }),
});

// Unified Alert System for cross-system notifications
export const UnifiedAlertSchema = z.object({
  id: z.string(),
  alertId: z.string(),
  sourceSystem: z.enum(['cydef', 'liveLocation', 'cypherHUM', 'acds', 'unified']),
  sourceId: z.string(), // ID in the source system
  alertType: z.enum(['security_threat', 'system_anomaly', 'device_offline', 'geofence_breach', 'mission_critical', 'ai_correlation', 'compliance_violation', 'performance_degradation']),
  severity: z.enum(['info', 'low', 'medium', 'high', 'critical', 'emergency']),
  priority: z.enum(['p1', 'p2', 'p3', 'p4', 'p5']),
  status: z.enum(['new', 'acknowledged', 'investigating', 'resolved', 'false_positive']),
  title: z.string(),
  description: z.string(),
  technicalDetails: z.string().optional(),
  affectedSystems: z.array(z.string()),
  correlatedAlerts: z.array(z.string()),
  aiAnalysis: z.object({
    confidenceScore: z.number(),
    threatLevel: z.number(),
    recommendations: z.array(z.string()),
    automaticActions: z.array(z.string()),
  }).optional(),
  metadata: z.record(z.any()),
  geolocation: z.object({
    latitude: z.string(),
    longitude: z.string(),
    accuracy: z.number().optional(),
  }).optional(),
  timestamps: z.object({
    detected: z.string().datetime(),
    created: z.string().datetime(),
    acknowledged: z.string().datetime().optional(),
    resolved: z.string().datetime().optional(),
    lastUpdated: z.string().datetime(),
  }),
  assignedTo: z.string().optional(),
  escalationPath: z.array(z.string()),
  slaDeadline: z.string().datetime().optional(),
  complianceFlags: z.array(z.string()),
});

// Alert Statistics for analytics and reporting
export const AlertStatsSchema = z.object({
  timeRange: z.object({
    start: z.string().datetime(),
    end: z.string().datetime(),
  }),
  totalAlerts: z.number(),
  alertsBySystem: z.object({
    cydef: z.number(),
    liveLocation: z.number(),
    cypherHUM: z.number(),
    acds: z.number(),
    unified: z.number(),
  }),
  alertsBySeverity: z.object({
    info: z.number(),
    low: z.number(),
    medium: z.number(),
    high: z.number(),
    critical: z.number(),
    emergency: z.number(),
  }),
  alertsByStatus: z.object({
    new: z.number(),
    acknowledged: z.number(),
    investigating: z.number(),
    resolved: z.number(),
    false_positive: z.number(),
  }),
  responseMetrics: z.object({
    averageAcknowledgmentTime: z.number(),
    averageResolutionTime: z.number(),
    slaCompliance: z.number(),
    escalationRate: z.number(),
  }),
  trendData: z.array(z.object({
    timestamp: z.string().datetime(),
    alertCount: z.number(),
    severity: z.string(),
    resolved: z.number(),
  })),
  topAlertTypes: z.array(z.object({
    alertType: z.string(),
    count: z.number(),
    severity: z.string(),
  })),
  correlationInsights: z.array(z.object({
    pattern: z.string(),
    frequency: z.number(),
    systems: z.array(z.string()),
    impact: z.string(),
  })),
});

// ===== COMPREHENSIVE HIPAA COMPLIANCE TABLES =====

// 1. ADMINISTRATIVE SAFEGUARDS

// HIPAA Security Officer Designations and Role Management
export const hipaaSecurityOfficers = pgTable("hipaa_security_officers", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  organizationId: varchar("organization_id").notNull(),
  userId: varchar("user_id").notNull().references(() => users.id),
  officerType: varchar("officer_type").notNull(), // security_officer, privacy_officer, compliance_officer, backup_officer
  designation: varchar("designation").notNull(), // primary, secondary, interim, backup
  appointedBy: varchar("appointed_by").notNull().references(() => users.id), // Who made the appointment
  appointmentDate: timestamp("appointment_date").notNull(),
  effectiveDate: timestamp("effective_date").notNull(),
  endDate: timestamp("end_date"), // null for current appointments
  responsibilities: jsonb("responsibilities").notNull(), // Array of specific responsibilities
  authorities: jsonb("authorities").notNull(), // Array of granted authorities
  certifications: jsonb("certifications").default('[]'), // HIPAA certifications and training
  contactInformation: jsonb("contact_information").notNull(), // Emergency contact details
  delegatedTo: varchar("delegated_to").references(() => users.id), // Temporary delegation
  delegationStartDate: timestamp("delegation_start_date"),
  delegationEndDate: timestamp("delegation_end_date"),
  status: varchar("status").notNull().default("active"), // active, inactive, suspended, terminated
  appointmentDocument: varchar("appointment_document"), // Reference to official appointment letter
  acknowledgmentDate: timestamp("acknowledgment_date"), // When officer acknowledged appointment
  lastReview: timestamp("last_review"), // Last performance review
  nextReview: timestamp("next_review"), // Scheduled performance review
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// HIPAA Policies and Procedures Management
export const hipaaPolicies = pgTable("hipaa_policies", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  organizationId: varchar("organization_id").notNull(),
  policyId: varchar("policy_id").notNull().unique(), // e.g., "HIPAA-ADM-001"
  policyCategory: varchar("policy_category").notNull(), // administrative, physical, technical, breach_notification
  policyType: varchar("policy_type").notNull(), // safeguard, procedure, standard, guideline
  title: varchar("title").notNull(),
  description: text("description").notNull(),
  fullPolicyText: text("full_policy_text").notNull(),
  version: varchar("version").notNull().default("1.0"),
  status: varchar("status").notNull().default("draft"), // draft, under_review, approved, active, archived, superseded
  approvalLevel: varchar("approval_level").notNull(), // management, security_officer, legal, board
  createdBy: varchar("created_by").notNull().references(() => users.id),
  reviewedBy: varchar("reviewed_by").references(() => users.id),
  approvedBy: varchar("approved_by").references(() => users.id),
  effectiveDate: timestamp("effective_date"),
  reviewDate: timestamp("review_date"), // Scheduled review date
  expirationDate: timestamp("expiration_date"),
  lastReviewDate: timestamp("last_review_date"),
  nextReviewDate: timestamp("next_review_date"),
  reviewFrequency: integer("review_frequency").default(365), // Days between reviews
  applicableRoles: jsonb("applicable_roles").default('[]'), // Which roles must follow this policy
  requiredTraining: jsonb("required_training").default('[]'), // Associated training requirements
  relatedPolicies: jsonb("related_policies").default('[]'), // References to related policies
  complianceFrameworks: jsonb("compliance_frameworks").default('[]'), // HIPAA, HITECH, state laws
  businessJustification: text("business_justification"),
  riskAssessment: text("risk_assessment"),
  implementationGuidance: text("implementation_guidance"),
  auditCriteria: text("audit_criteria"),
  exceptions: jsonb("exceptions").default('[]'), // Approved exceptions
  attachments: jsonb("attachments").default('[]'), // Supporting documents
  distributionList: jsonb("distribution_list").default('[]'), // Who needs to be notified
  acknowledgmentRequired: boolean("acknowledgment_required").default(true),
  trainingRequired: boolean("training_required").default(true),
  isTemplate: boolean("is_template").default(false),
  templateSource: varchar("template_source"), // If derived from template
  customizations: jsonb("customizations").default('{}'), // Org-specific modifications
  tags: jsonb("tags").default('[]'), // For categorization and search
  searchKeywords: jsonb("search_keywords").default('[]'), // For search optimization
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Employee Training Tracking and Compliance Verification
export const hipaaTraining = pgTable("hipaa_training", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  organizationId: varchar("organization_id").notNull(),
  trainingId: varchar("training_id").notNull().unique(), // e.g., "HIPAA-TRN-2024-001"
  trainingType: varchar("training_type").notNull(), // initial, refresher, specialized, incident_based, role_specific
  trainingCategory: varchar("training_category").notNull(), // general_awareness, technical_safeguards, administrative, physical, breach_response
  title: varchar("title").notNull(),
  description: text("description").notNull(),
  content: text("content"), // Training materials or reference
  duration: integer("duration"), // Training duration in minutes
  format: varchar("format").notNull(), // online, in_person, hybrid, self_study, webinar
  provider: varchar("provider"), // Internal, external vendor, certification body
  instructorId: varchar("instructor_id").references(() => users.id),
  targetAudience: jsonb("target_audience").notNull(), // Array of roles/departments
  prerequisites: jsonb("prerequisites").default('[]'), // Required prior training
  learningObjectives: jsonb("learning_objectives").notNull(),
  assessmentRequired: boolean("assessment_required").default(true),
  passingScore: integer("passing_score").default(80), // Minimum score to pass
  certificationAwarded: boolean("certification_awarded").default(false),
  certificationValidityPeriod: integer("certification_validity_period").default(365), // Days
  mandatory: boolean("mandatory").default(true),
  recurringInterval: integer("recurring_interval").default(365), // Days between required refresher training
  relatedPolicies: jsonb("related_policies").default('[]'), // Associated policies
  complianceRequirement: varchar("compliance_requirement"), // HIPAA section, state law, etc.
  materials: jsonb("materials").default('[]'), // Training materials and resources
  quiz: jsonb("quiz"), // Assessment questions and answers
  feedback: jsonb("feedback").default('[]'), // Training feedback and improvements
  completionCriteria: jsonb("completion_criteria").notNull(), // What constitutes completion
  status: varchar("status").notNull().default("active"), // active, inactive, deprecated, under_review
  version: varchar("version").notNull().default("1.0"),
  createdBy: varchar("created_by").notNull().references(() => users.id),
  approvedBy: varchar("approved_by").references(() => users.id),
  lastUpdated: timestamp("last_updated").defaultNow(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Individual Training Records and Compliance Status
export const hipaaTrainingRecords = pgTable("hipaa_training_records", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  organizationId: varchar("organization_id").notNull(),
  userId: varchar("user_id").notNull().references(() => users.id),
  trainingId: varchar("training_id").notNull().references(() => hipaaTraining.trainingId),
  enrollmentDate: timestamp("enrollment_date").defaultNow(),
  startDate: timestamp("start_date"),
  completionDate: timestamp("completion_date"),
  dueDate: timestamp("due_date").notNull(), // When training must be completed
  status: varchar("status").notNull().default("assigned"), // assigned, in_progress, completed, overdue, exempted, failed
  attemptNumber: integer("attempt_number").default(1),
  score: integer("score"), // Assessment score if applicable
  passingStatus: varchar("passing_status"), // passed, failed, pending, exempt
  timeSpent: integer("time_spent").default(0), // Minutes spent in training
  progressPercentage: integer("progress_percentage").default(0),
  certificateIssued: boolean("certificate_issued").default(false),
  certificateNumber: varchar("certificate_number"),
  certificateExpiryDate: timestamp("certificate_expiry_date"),
  exemptionReason: text("exemption_reason"), // If exempted from training
  exemptedBy: varchar("exempted_by").references(() => users.id),
  extensionGranted: boolean("extension_granted").default(false),
  extensionReason: text("extension_reason"),
  extendedDueDate: timestamp("extended_due_date"),
  supervisorApproval: varchar("supervisor_approval").references(() => users.id),
  hrApproval: varchar("hr_approval").references(() => users.id),
  completionNotes: text("completion_notes"),
  feedbackProvided: text("feedback_provided"), // User feedback on training
  assessmentResults: jsonb("assessment_results"), // Detailed quiz/assessment results
  complianceStatus: varchar("compliance_status").notNull().default("pending"), // compliant, non_compliant, grace_period, overdue
  nextDueDate: timestamp("next_due_date"), // For recurring training
  remindersSent: integer("reminders_sent").default(0),
  lastReminderDate: timestamp("last_reminder_date"),
  digitalSignature: varchar("digital_signature"), // For completion verification
  ipAddress: varchar("ip_address"), // Where training was completed
  deviceInfo: jsonb("device_info"), // Device used for training
  proctorNotes: text("proctor_notes"), // If proctored training
  auditTrail: jsonb("audit_trail").default('[]'), // Detailed audit log of training activities
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Business Associate Agreements (BAA) Management
export const hipaaBusinessAssociates = pgTable("hipaa_business_associates", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  organizationId: varchar("organization_id").notNull(),
  baId: varchar("ba_id").notNull().unique(), // e.g., "BA-2024-001"
  companyName: varchar("company_name").notNull(),
  legalName: varchar("legal_name"), // Full legal entity name
  businessType: varchar("business_type").notNull(), // vendor, subcontractor, consultant, cloud_provider, saas_provider
  serviceCategory: varchar("service_category").notNull(), // it_services, cloud_storage, analytics, consulting, legal, accounting
  servicesProvided: text("services_provided").notNull(),
  phiAccessType: varchar("phi_access_type").notNull(), // create, receive, maintain, transmit, access, none
  phiDataTypes: jsonb("phi_data_types").notNull(), // Types of PHI they handle
  dataFlowDescription: text("data_flow_description").notNull(),
  primaryContact: jsonb("primary_contact").notNull(), // Name, email, phone
  legalContact: jsonb("legal_contact"), // Legal representative
  technicalContact: jsonb("technical_contact"), // Technical lead
  complianceContact: jsonb("compliance_contact"), // Compliance officer
  contractNumber: varchar("contract_number"),
  masterServiceAgreement: varchar("master_service_agreement"),
  baAgreementDate: timestamp("ba_agreement_date").notNull(),
  effectiveDate: timestamp("effective_date").notNull(),
  expirationDate: timestamp("expiration_date"),
  autoRenewal: boolean("auto_renewal").default(false),
  renewalTerms: text("renewal_terms"),
  terminationNoticePeriod: integer("termination_notice_period").default(30), // Days
  agreementVersion: varchar("agreement_version").notNull().default("1.0"),
  agreementStatus: varchar("agreement_status").notNull().default("active"), // draft, under_negotiation, signed, active, expired, terminated, suspended
  signedBy: varchar("signed_by"), // Who signed for the organization
  baSignedBy: varchar("ba_signed_by"), // Who signed for the BA
  digitalSignatures: jsonb("digital_signatures"), // Digital signature data
  contractValue: numeric("contract_value", { precision: 12, scale: 2 }),
  paymentTerms: varchar("payment_terms"),
  insuranceRequired: boolean("insurance_required").default(true),
  insuranceAmount: numeric("insurance_amount", { precision: 12, scale: 2 }),
  cybersecurityInsurance: boolean("cybersecurity_insurance").default(true),
  securityRequirements: jsonb("security_requirements").notNull(), // Required security controls
  complianceCertifications: jsonb("compliance_certifications").default('[]'), // SOC2, HIPAA, etc.
  auditRights: boolean("audit_rights").default(true),
  auditFrequency: varchar("audit_frequency").default("annual"), // monthly, quarterly, annual, on_demand
  lastAudit: timestamp("last_audit"),
  nextAuditDue: timestamp("next_audit_due"),
  auditResults: jsonb("audit_results").default('[]'), // Historical audit findings
  incidentNotificationRequirement: integer("incident_notification_requirement").default(24), // Hours
  breachNotificationRequirement: integer("breach_notification_requirement").default(24), // Hours
  dataRetentionPeriod: integer("data_retention_period"), // Days
  dataDestructionRequired: boolean("data_destruction_required").default(true),
  dataDestructionMethod: varchar("data_destruction_method"), // secure_deletion, cryptographic_erasure, physical_destruction
  subcontractorAllowed: boolean("subcontractor_allowed").default(false),
  subcontractorApprovalRequired: boolean("subcontractor_approval_required").default(true),
  subcontractors: jsonb("subcontractors").default('[]'), // List of approved subcontractors
  geographicRestrictions: jsonb("geographic_restrictions").default('[]'), // Where data can be processed
  governingLaw: varchar("governing_law").notNull(),
  disputeResolution: varchar("dispute_resolution").default("arbitration"),
  limitationOfLiability: text("limitation_of_liability"),
  indemnificationTerms: text("indemnification_terms"),
  returnDestructionTerms: text("return_destruction_terms"),
  riskLevel: varchar("risk_level").notNull().default("medium"), // low, medium, high, critical
  riskAssessment: text("risk_assessment"),
  mitigationMeasures: jsonb("mitigation_measures").default('[]'),
  performanceMetrics: jsonb("performance_metrics").default('[]'),
  slaRequirements: jsonb("sla_requirements").default('[]'),
  escalationProcedures: text("escalation_procedures"),
  communicationProtocol: text("communication_protocol"),
  changeManagementProcess: text("change_management_process"),
  businessContinuityRequirements: text("business_continuity_requirements"),
  documentReferences: jsonb("document_references").default('[]'), // Related documents
  attachments: jsonb("attachments").default('[]'), // Contract attachments
  tags: jsonb("tags").default('[]'), // For categorization
  notes: text("notes"),
  managedBy: varchar("managed_by").notNull().references(() => users.id), // Contract manager
  legalReviewBy: varchar("legal_review_by").references(() => users.id),
  complianceApprovedBy: varchar("compliance_approved_by").references(() => users.id),
  lastReviewed: timestamp("last_reviewed"),
  nextReviewDue: timestamp("next_review_due"),
  remindersSent: integer("reminders_sent").default(0),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// 2. PHYSICAL SAFEGUARDS

// Workstation Security Requirements and Compliance
export const hipaaWorkstationSecurity = pgTable("hipaa_workstation_security", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  organizationId: varchar("organization_id").notNull(),
  workstationId: varchar("workstation_id").notNull().unique(),
  deviceType: varchar("device_type").notNull(), // desktop, laptop, mobile, tablet, thin_client, kiosk
  location: varchar("location").notNull(), // office, home, remote, clinic, hospital
  department: varchar("department"),
  assignedTo: varchar("assigned_to").references(() => users.id),
  alternateUsers: jsonb("alternate_users").default('[]'), // Approved alternate users
  operatingSystem: varchar("operating_system").notNull(),
  securityConfiguration: jsonb("security_configuration").notNull(), // Security settings
  encryptionStatus: varchar("encryption_status").notNull().default("required"), // required, enabled, disabled, not_applicable
  encryptionType: varchar("encryption_type"), // full_disk, file_level, folder_level
  passwordComplexity: jsonb("password_complexity").notNull(), // Password requirements
  autoLockTimeout: integer("auto_lock_timeout").default(15), // Minutes
  screensaverTimeout: integer("screensaver_timeout").default(10), // Minutes
  remoteAccessAllowed: boolean("remote_access_allowed").default(false),
  remoteAccessMethod: varchar("remote_access_method"), // vpn, rdp, citrix, teamviewer
  vpnRequired: boolean("vpn_required").default(true),
  antivirusInstalled: boolean("antivirus_installed").default(true),
  antivirusProvider: varchar("antivirus_provider"),
  antivirusLastUpdate: timestamp("antivirus_last_update"),
  firewallEnabled: boolean("firewall_enabled").default(true),
  firewallConfiguration: jsonb("firewall_configuration"),
  automaticUpdatesEnabled: boolean("automatic_updates_enabled").default(true),
  lastSecurityUpdate: timestamp("last_security_update"),
  physicalSecurityMeasures: jsonb("physical_security_measures").notNull(), // Lock, cable, etc.
  cameraBlocking: boolean("camera_blocking").default(true),
  microphoneControl: boolean("microphone_control").default(true),
  usbPortControl: varchar("usb_port_control").default("restricted"), // disabled, restricted, monitored, unrestricted
  removableMediaPolicy: varchar("removable_media_policy").default("prohibited"), // prohibited, encrypted_only, approved_only, unrestricted
  wirelessSecurity: jsonb("wireless_security"), // WiFi security settings
  bluetoothEnabled: boolean("bluetooth_enabled").default(false),
  printerSecurity: jsonb("printer_security"), // Network printer security
  monitorPrivacy: varchar("monitor_privacy").default("required"), // required, recommended, not_required
  cleanDeskPolicy: boolean("clean_desk_policy").default(true),
  visitorRestrictions: text("visitor_restrictions"),
  maintenanceSchedule: jsonb("maintenance_schedule"),
  lastMaintenance: timestamp("last_maintenance"),
  nextMaintenance: timestamp("next_maintenance"),
  complianceStatus: varchar("compliance_status").notNull().default("pending"), // compliant, non_compliant, partial, pending_review
  lastComplianceCheck: timestamp("last_compliance_check"),
  nextComplianceCheck: timestamp("next_compliance_check"),
  violations: jsonb("violations").default('[]'), // Compliance violations
  remediationRequired: boolean("remediation_required").default(false),
  remediationPlan: text("remediation_plan"),
  remediationDeadline: timestamp("remediation_deadline"),
  auditHistory: jsonb("audit_history").default('[]'),
  incidentHistory: jsonb("incident_history").default('[]'),
  riskAssessment: text("risk_assessment"),
  mitigationMeasures: jsonb("mitigation_measures").default('[]'),
  approvedBy: varchar("approved_by").references(() => users.id),
  approvalDate: timestamp("approval_date"),
  status: varchar("status").notNull().default("active"), // active, inactive, decommissioned, maintenance
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Media Controls and Disposal Procedures
export const hipaaMediaControls = pgTable("hipaa_media_controls", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  organizationId: varchar("organization_id").notNull(),
  mediaId: varchar("media_id").notNull().unique(),
  mediaType: varchar("media_type").notNull(), // hard_drive, ssd, usb_drive, optical_disk, tape, mobile_device, paper, cloud_storage
  mediaSubtype: varchar("media_subtype"), // internal, external, removable, network_attached
  description: text("description").notNull(),
  serialNumber: varchar("serial_number"),
  assetTag: varchar("asset_tag"),
  location: varchar("location").notNull(),
  department: varchar("department"),
  custodian: varchar("custodian").notNull().references(() => users.id), // Person responsible
  alternateCustodians: jsonb("alternate_custodians").default('[]'),
  phiContained: boolean("phi_contained").notNull().default(false),
  phiTypes: jsonb("phi_types").default('[]'), // Types of PHI stored
  dataClassification: varchar("data_classification").notNull(), // public, internal, confidential, restricted, phi
  encryptionRequired: boolean("encryption_required").default(true),
  encryptionStatus: varchar("encryption_status").notNull().default("pending"), // encrypted, unencrypted, in_progress, not_applicable
  encryptionMethod: varchar("encryption_method"), // aes256, bitlocker, filevault, pgp
  encryptionKeyId: varchar("encryption_key_id"), // Reference to key management
  accessControls: jsonb("access_controls").notNull(), // Who can access
  approvedUsers: jsonb("approved_users").default('[]'),
  accessLog: jsonb("access_log").default('[]'), // Access history
  usagePolicy: text("usage_policy").notNull(),
  handlingProcedures: text("handling_procedures").notNull(),
  transportationRequirements: text("transportation_requirements"),
  storageRequirements: text("storage_requirements"),
  backupRequired: boolean("backup_required").default(true),
  backupLocation: varchar("backup_location"),
  backupFrequency: varchar("backup_frequency"), // daily, weekly, monthly
  lastBackup: timestamp("last_backup"),
  retentionPeriod: integer("retention_period"), // Days to retain
  disposalMethod: varchar("disposal_method").notNull(), // secure_deletion, cryptographic_erasure, physical_destruction, degaussing
  disposalScheduled: boolean("disposal_scheduled").default(false),
  scheduledDisposalDate: timestamp("scheduled_disposal_date"),
  disposalProvider: varchar("disposal_provider"), // Certified disposal company
  disposalCertificateRequired: boolean("disposal_certificate_required").default(true),
  auditRequired: boolean("audit_required").default(true),
  auditFrequency: varchar("audit_frequency").default("quarterly"), // monthly, quarterly, annual
  lastAudit: timestamp("last_audit"),
  nextAuditDue: timestamp("next_audit_due"),
  auditResults: jsonb("audit_results").default('[]'),
  violations: jsonb("violations").default('[]'),
  incidentHistory: jsonb("incident_history").default('[]'),
  riskLevel: varchar("risk_level").notNull().default("medium"), // low, medium, high, critical
  riskFactors: jsonb("risk_factors").default('[]'),
  mitigationMeasures: jsonb("mitigation_measures").default('[]'),
  complianceStatus: varchar("compliance_status").notNull().default("pending"), // compliant, non_compliant, partial, under_review
  complianceNotes: text("compliance_notes"),
  status: varchar("status").notNull().default("active"), // active, inactive, maintenance, disposed, lost, stolen
  lifecycleStage: varchar("lifecycle_stage").notNull().default("in_use"), // new, in_use, maintenance, end_of_life, disposed
  acquisitionDate: timestamp("acquisition_date"),
  deploymentDate: timestamp("deployment_date"),
  warrantyExpiration: timestamp("warranty_expiration"),
  maintenanceSchedule: jsonb("maintenance_schedule"),
  lastMaintenance: timestamp("last_maintenance"),
  nextMaintenance: timestamp("next_maintenance"),
  vendorInformation: jsonb("vendor_information"), // Vendor details
  supportContact: jsonb("support_contact"), // Vendor support
  documentReferences: jsonb("document_references").default('[]'), // Related documents
  attachments: jsonb("attachments").default('[]'),
  tags: jsonb("tags").default('[]'),
  notes: text("notes"),
  createdBy: varchar("created_by").notNull().references(() => users.id),
  lastModifiedBy: varchar("last_modified_by").references(() => users.id),
  approvedBy: varchar("approved_by").references(() => users.id),
  approvalDate: timestamp("approval_date"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Facility Access Controls and Monitoring
export const hipaaFacilityAccess = pgTable("hipaa_facility_access", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  organizationId: varchar("organization_id").notNull(),
  facilityId: varchar("facility_id").notNull().unique(),
  facilityName: varchar("facility_name").notNull(),
  facilityType: varchar("facility_type").notNull(), // office, clinic, hospital, data_center, warehouse, home_office
  address: text("address").notNull(),
  coordinates: jsonb("coordinates"), // Latitude, longitude
  accessLevel: varchar("access_level").notNull(), // public, restricted, confidential, high_security
  phiAreas: jsonb("phi_areas").default('[]'), // Areas where PHI is stored/processed
  securityZones: jsonb("security_zones").notNull(), // Different security zones
  accessControlSystem: varchar("access_control_system").notNull(), // key_card, biometric, pin, combination, manual
  biometricEnabled: boolean("biometric_enabled").default(false),
  biometricType: varchar("biometric_type"), // fingerprint, facial, iris, palm
  keyCardSystem: boolean("key_card_system").default(true),
  keyCardProvider: varchar("key_card_provider"),
  pinRequired: boolean("pin_required").default(false),
  multiFactorAuth: boolean("multi_factor_auth").default(false),
  tailgatingPrevention: boolean("tailgating_prevention").default(true),
  manTrapInstalled: boolean("man_trap_installed").default(false),
  visitorManagement: boolean("visitor_management").default(true),
  visitorEscortRequired: boolean("visitor_escort_required").default(true),
  visitorBadgeRequired: boolean("visitor_badge_required").default(true),
  visitorLogRequired: boolean("visitor_log_required").default(true),
  contractorAccess: boolean("contractor_access").default(false),
  contractorEscortRequired: boolean("contractor_escort_required").default(true),
  afterHoursAccess: boolean("after_hours_access").default(false),
  afterHoursApprovalRequired: boolean("after_hours_approval_required").default(true),
  weekendAccess: boolean("weekend_access").default(false),
  holidayAccess: boolean("holiday_access").default(false),
  emergencyAccess: boolean("emergency_access").default(true),
  emergencyAccessProcedure: text("emergency_access_procedure"),
  lockdownProcedure: text("lockdown_procedure"),
  surveillanceSystem: boolean("surveillance_system").default(true),
  cameraCount: integer("camera_count").default(0),
  cameraLocations: jsonb("camera_locations").default('[]'),
  recordingRetention: integer("recording_retention").default(90), // Days
  motionDetection: boolean("motion_detection").default(true),
  alertSystem: boolean("alert_system").default(true),
  alarmSystem: boolean("alarm_system").default(true),
  alarmMonitoring: varchar("alarm_monitoring"), // self_monitored, third_party, security_company
  securityGuards: boolean("security_guards").default(false),
  guardSchedule: jsonb("guard_schedule"),
  patrolSchedule: jsonb("patrol_schedule"),
  incidentResponse: text("incident_response").notNull(),
  evacuationPlan: text("evacuation_plan"),
  fireSuppressionSystem: boolean("fire_suppression_system").default(true),
  environmentalControls: jsonb("environmental_controls"), // Temperature, humidity, etc.
  powerBackup: boolean("power_backup").default(true),
  networkSecurity: jsonb("network_security"), // Network access controls
  physicalBarriers: jsonb("physical_barriers"), // Walls, doors, locks, etc.
  signage: jsonb("signage"), // Security and privacy signage
  lightingRequirements: text("lighting_requirements"),
  maintenanceAccess: text("maintenance_access"),
  cleaningSchedule: jsonb("cleaning_schedule"),
  authorizedPersonnel: jsonb("authorized_personnel").notNull(), // Who has access
  accessRoles: jsonb("access_roles").notNull(), // Role-based access definitions
  temporaryAccess: jsonb("temporary_access").default('[]'), // Temporary access grants
  suspendedAccess: jsonb("suspended_access").default('[]'), // Suspended access
  accessReviewSchedule: varchar("access_review_schedule").default("quarterly"),
  lastAccessReview: timestamp("last_access_review"),
  nextAccessReview: timestamp("next_access_review"),
  accessViolations: jsonb("access_violations").default('[]'),
  securityIncidents: jsonb("security_incidents").default('[]'),
  vulnerabilityAssessments: jsonb("vulnerability_assessments").default('[]'),
  lastSecurityAssessment: timestamp("last_security_assessment"),
  nextSecurityAssessment: timestamp("next_security_assessment"),
  complianceStatus: varchar("compliance_status").notNull().default("pending"), // compliant, non_compliant, partial, under_review
  auditHistory: jsonb("audit_history").default('[]'),
  lastAudit: timestamp("last_audit"),
  nextAuditDue: timestamp("next_audit_due"),
  riskLevel: varchar("risk_level").notNull().default("medium"), // low, medium, high, critical
  riskFactors: jsonb("risk_factors").default('[]'),
  mitigationMeasures: jsonb("mitigation_measures").default('[]'),
  insuranceCoverage: boolean("insurance_coverage").default(true),
  emergencyContacts: jsonb("emergency_contacts").notNull(),
  facilityManager: varchar("facility_manager").notNull().references(() => users.id),
  securityOfficer: varchar("security_officer").references(() => users.id),
  maintenanceContact: jsonb("maintenance_contact"),
  vendorContacts: jsonb("vendor_contacts").default('[]'),
  operatingHours: jsonb("operating_hours").notNull(),
  specialInstructions: text("special_instructions"),
  documentReferences: jsonb("document_references").default('[]'),
  attachments: jsonb("attachments").default('[]'),
  status: varchar("status").notNull().default("active"), // active, inactive, maintenance, renovating, closed
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// 3. ENHANCED TECHNICAL SAFEGUARDS

// Tamper-Proof Audit Logs with Digital Signatures
export const hipaaSecureAuditLogs = pgTable("hipaa_secure_audit_logs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  organizationId: varchar("organization_id").notNull(),
  logId: varchar("log_id").notNull().unique(), // Sequential log ID
  chainHash: varchar("chain_hash").notNull().unique(), // Blockchain-style hash chain
  previousLogHash: varchar("previous_log_hash"), // Hash of previous log entry
  digitalSignature: varchar("digital_signature").notNull(), // Digital signature for integrity
  signatureAlgorithm: varchar("signature_algorithm").notNull().default("RSA-SHA256"),
  keyId: varchar("key_id").notNull(), // Signing key identifier
  timestampServer: varchar("timestamp_server"), // RFC 3161 timestamp server
  rfc3161Timestamp: varchar("rfc3161_timestamp"), // Certified timestamp
  userId: varchar("user_id").references(() => users.id),
  userRole: varchar("user_role"),
  sessionId: varchar("session_id"), // User session identifier
  ipAddress: varchar("ip_address").notNull(),
  userAgent: text("user_agent"),
  deviceFingerprint: varchar("device_fingerprint"), // Device identification
  geolocation: jsonb("geolocation"), // Location data if available
  action: varchar("action").notNull(), // create, read, update, delete, access, login, logout
  actionCategory: varchar("action_category").notNull(), // phi_access, administrative, system, authentication
  resource: varchar("resource").notNull(), // What was accessed/modified
  resourceType: varchar("resource_type").notNull(), // patient_record, phi_data, system_config, user_account
  resourceId: varchar("resource_id"), // Specific resource identifier
  phiInvolved: boolean("phi_involved").notNull().default(false),
  phiTypes: jsonb("phi_types").default('[]'), // Types of PHI accessed
  phiCategories: jsonb("phi_categories").default('[]'), // PHI categories
  minimumNecessary: boolean("minimum_necessary").default(false), // Was minimum necessary standard followed
  accessJustification: text("access_justification"), // Why access was needed
  accessApprovedBy: varchar("access_approved_by").references(() => users.id),
  emergencyAccess: boolean("emergency_access").default(false),
  emergencyJustification: text("emergency_justification"),
  dataBeforeChange: jsonb("data_before_change"), // Pre-change data (encrypted)
  dataAfterChange: jsonb("data_after_change"), // Post-change data (encrypted)
  changeType: varchar("change_type"), // field_update, record_creation, record_deletion, access_grant
  changeReason: text("change_reason"),
  systemGenerated: boolean("system_generated").default(false), // Automated vs manual action
  batchOperation: boolean("batch_operation").default(false),
  batchId: varchar("batch_id"), // For batch operations
  transactionId: varchar("transaction_id"), // Database transaction ID
  requestMethod: varchar("request_method"), // GET, POST, PUT, DELETE
  requestUrl: text("request_url"),
  requestHeaders: jsonb("request_headers"), // Relevant headers
  requestBody: jsonb("request_body"), // Request payload (sanitized)
  responseCode: integer("response_code"),
  responseSize: integer("response_size"), // Response size in bytes
  queryExecutionTime: integer("query_execution_time"), // Milliseconds
  databaseQueries: jsonb("database_queries"), // Executed queries (sanitized)
  fileAccessed: varchar("file_accessed"), // File path if file access
  printJobs: jsonb("print_jobs"), // Print job details if applicable
  emailSent: jsonb("email_sent"), // Email details if PHI was emailed
  exportDetails: jsonb("export_details"), // Data export details
  apiEndpoint: varchar("api_endpoint"), // API endpoint accessed
  apiVersion: varchar("api_version"),
  clientApplication: varchar("client_application"), // Application making the request
  integrationType: varchar("integration_type"), // hl7, fhir, api, database, manual
  workflowStep: varchar("workflow_step"), // Which step in a workflow
  businessProcess: varchar("business_process"), // Which business process
  complianceFramework: varchar("compliance_framework").default("HIPAA"), // HIPAA, HITECH, state_law
  regulatoryRequirement: varchar("regulatory_requirement"), // Specific requirement
  alertTriggered: boolean("alert_triggered").default(false),
  alertType: varchar("alert_type"), // suspicious_activity, policy_violation, access_anomaly
  alertSeverity: varchar("alert_severity"), // low, medium, high, critical
  alertDescription: text("alert_description"),
  automaticResponse: boolean("automatic_response").default(false),
  responseActions: jsonb("response_actions").default('[]'), // Automated responses taken
  riskScore: integer("risk_score"), // Calculated risk score 0-100
  anomalyScore: numeric("anomaly_score", { precision: 5, scale: 2 }), // ML anomaly detection score
  contextualData: jsonb("contextual_data"), // Additional context
  correlationId: varchar("correlation_id"), // For correlating related events
  parentLogId: varchar("parent_log_id"), // Parent audit log entry
  childLogIds: jsonb("child_log_ids").default('[]'), // Child audit log entries
  status: varchar("status").notNull().default("active"), // active, archived, investigated, resolved
  investigationRequired: boolean("investigation_required").default(false),
  investigatedBy: varchar("investigated_by").references(() => users.id),
  investigationNotes: text("investigation_notes"),
  investigationDate: timestamp("investigation_date"),
  resolutionStatus: varchar("resolution_status"), // resolved, ongoing, escalated, false_positive
  archivalDate: timestamp("archival_date"),
  retentionExpiry: timestamp("retention_expiry").notNull(), // 6+ year retention
  legalHold: boolean("legal_hold").default(false),
  legalHoldReason: text("legal_hold_reason"),
  exportedToAuthorities: boolean("exported_to_authorities").default(false),
  exportDate: timestamp("export_date"),
  exportedBy: varchar("exported_by").references(() => users.id),
  exportReason: text("export_reason"),
  immutable: boolean("immutable").notNull().default(true), // Cannot be modified
  integrityVerified: boolean("integrity_verified").default(true),
  lastIntegrityCheck: timestamp("last_integrity_check"),
  integrityCheckResults: jsonb("integrity_check_results"),
  tamperEvidence: jsonb("tamper_evidence"), // Evidence of tampering attempts
  backupCopies: integer("backup_copies").default(0), // Number of backup copies
  backupLocations: jsonb("backup_locations").default('[]'),
  eventTime: timestamp("event_time").notNull(), // When the actual event occurred
  logTime: timestamp("log_time").defaultNow(), // When the log was created
  processingTime: timestamp("processing_time"), // When log was processed/indexed
  createdAt: timestamp("created_at").defaultNow(),
}, (table) => [
  // Indexes for efficient querying
  index("idx_hipaa_audit_user_time").on(table.userId, table.eventTime),
  index("idx_hipaa_audit_action_time").on(table.action, table.eventTime),
  index("idx_hipaa_audit_phi_time").on(table.phiInvolved, table.eventTime),
  index("idx_hipaa_audit_chain_hash").on(table.chainHash),
  index("idx_hipaa_audit_resource_time").on(table.resource, table.eventTime),
  index("idx_hipaa_audit_alert_time").on(table.alertTriggered, table.eventTime),
]);

// Emergency Access Procedures and Tracking
export const hipaaEmergencyAccess = pgTable("hipaa_emergency_access", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  organizationId: varchar("organization_id").notNull(),
  emergencyId: varchar("emergency_id").notNull().unique(),
  emergencyType: varchar("emergency_type").notNull(), // medical, system_failure, natural_disaster, security_incident, business_continuity
  emergencySeverity: varchar("emergency_severity").notNull(), // low, medium, high, critical, catastrophic
  emergencyDescription: text("emergency_description").notNull(),
  requestedBy: varchar("requested_by").notNull().references(() => users.id),
  requestedFor: varchar("requested_for").references(() => users.id), // May be different from requester
  requestingRole: varchar("requesting_role").notNull(),
  justification: text("justification").notNull(),
  businessNeed: text("business_need").notNull(),
  expectedDuration: integer("expected_duration").notNull(), // Minutes
  resourcesRequested: jsonb("resources_requested").notNull(), // What access is needed
  phiTypesNeeded: jsonb("phi_types_needed").default('[]'),
  accessLevel: varchar("access_level").notNull(), // read, write, admin, full
  normalAccessAvailable: boolean("normal_access_available").default(false),
  alternativesSought: text("alternatives_sought"), // What alternatives were considered
  minimumNecessaryJustification: text("minimum_necessary_justification").notNull(),
  approvalRequired: boolean("approval_required").default(true),
  approvalLevel: varchar("approval_level").default("manager"), // manager, security_officer, admin, emergency_contact
  approvedBy: varchar("approved_by").references(() => users.id),
  alternateApprovers: jsonb("alternate_approvers").default('[]'), // Backup approvers
  approvalTimestamp: timestamp("approval_timestamp"),
  approvalMethod: varchar("approval_method"), // verbal, email, system, written
  verbalApprovalBy: varchar("verbal_approval_by"),
  verbalApprovalWitness: varchar("verbal_approval_witness"),
  writtenConfirmationRequired: boolean("written_confirmation_required").default(true),
  writtenConfirmationReceived: timestamp("written_confirmation_received"),
  emergencyContactsNotified: boolean("emergency_contacts_notified").default(false),
  notificationMethod: varchar("notification_method"), // phone, email, text, pager
  notificationTimestamp: timestamp("notification_timestamp"),
  accessGranted: boolean("access_granted").default(false),
  accessStartTime: timestamp("access_start_time"),
  accessEndTime: timestamp("access_end_time"),
  actualDuration: integer("actual_duration"), // Actual duration in minutes
  accessRevokedBy: varchar("access_revoked_by").references(() => users.id),
  autoRevocation: boolean("auto_revocation").default(true),
  extendedAccess: boolean("extended_access").default(false),
  extensionRequests: jsonb("extension_requests").default('[]'),
  monitoringRequired: boolean("monitoring_required").default(true),
  monitoringFrequency: integer("monitoring_frequency").default(15), // Minutes between checks
  monitoringLogs: jsonb("monitoring_logs").default('[]'),
  supervisorNotified: boolean("supervisor_notified").default(true),
  complianceOfficerNotified: boolean("compliance_officer_notified").default(true),
  auditTrail: jsonb("audit_trail").default('[]'), // Detailed audit trail
  actionsPerformed: jsonb("actions_performed").default('[]'), // What was actually done
  dataAccessed: jsonb("data_accessed").default('[]'), // What data was accessed
  modifications: jsonb("modifications").default('[]'), // Any changes made
  printActivity: jsonb("print_activity").default('[]'), // Printing during emergency access
  downloadActivity: jsonb("download_activity").default('[]'), // Downloads during access
  emailActivity: jsonb("email_activity").default('[]'), // Emails sent
  unusualActivity: jsonb("unusual_activity").default('[]'), // Any suspicious activity
  postAccessReview: boolean("post_access_review").default(true),
  reviewedBy: varchar("reviewed_by").references(() => users.id),
  reviewDate: timestamp("review_date"),
  reviewFindings: text("review_findings"),
  reviewRecommendations: text("review_recommendations"),
  violations: jsonb("violations").default('[]'), // Any policy violations
  correctiveActions: jsonb("corrective_actions").default('[]'),
  lessonsLearned: text("lessons_learned"),
  policyUpdatesRequired: boolean("policy_updates_required").default(false),
  trainingRequired: boolean("training_required").default(false),
  incidentReportFiled: boolean("incident_report_filed").default(false),
  incidentReportId: varchar("incident_report_id"),
  regulatoryNotificationRequired: boolean("regulatory_notification_required").default(false),
  regulatoryNotificationSent: boolean("regulatory_notification_sent").default(false),
  status: varchar("status").notNull().default("requested"), // requested, approved, active, completed, reviewed, closed
  resolution: varchar("resolution"), // successful, unsuccessful, partial, aborted
  outcomeDescription: text("outcome_description"),
  followUpRequired: boolean("follow_up_required").default(false),
  followUpActions: jsonb("follow_up_actions").default('[]'),
  documentReferences: jsonb("document_references").default('[]'),
  attachments: jsonb("attachments").default('[]'),
  tags: jsonb("tags").default('[]'),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// 4. BREACH NOTIFICATION AND INCIDENT RESPONSE

// HIPAA Breach Incidents and Notification Management
export const hipaaBreachIncidents = pgTable("hipaa_breach_incidents", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  organizationId: varchar("organization_id").notNull(),
  breachId: varchar("breach_id").notNull().unique(), // e.g., "BREACH-2024-001"
  incidentTitle: varchar("incident_title").notNull(),
  incidentDescription: text("incident_description").notNull(),
  breachType: varchar("breach_type").notNull(), // unauthorized_access, theft, loss, hacking, improper_disposal, other
  breachCategory: varchar("breach_category").notNull(), // electronic, paper, portable_device, network, email
  breachLocation: varchar("breach_location").notNull(), // onsite, offsite, cloud, mobile, email, network
  discoveryDate: timestamp("discovery_date").notNull(), // When breach was discovered
  breachDate: timestamp("breach_date").notNull(), // When breach actually occurred
  reportedToManagement: timestamp("reported_to_management"),
  reportedToSecurityOfficer: timestamp("reported_to_security_officer"),
  reportedToPrivacyOfficer: timestamp("reported_to_privacy_officer"),
  discoveredBy: varchar("discovered_by").references(() => users.id),
  discoveryMethod: varchar("discovery_method").notNull(), // monitoring, audit, complaint, self_report, external_notification
  involvedPersons: jsonb("involved_persons").default('[]'), // Staff involved
  affectedIndividuals: integer("affected_individuals").notNull().default(0), // Number of individuals affected
  affectedIndividualsList: jsonb("affected_individuals_list").default('[]'), // List of affected individuals (encrypted)
  phiTypes: jsonb("phi_types").notNull(), // Types of PHI involved
  phiSensitivity: varchar("phi_sensitivity").notNull(), // low, medium, high, critical
  dataElements: jsonb("data_elements").notNull(), // Specific data elements involved
  rootCause: text("root_cause"), // Root cause analysis
  contributingFactors: jsonb("contributing_factors").default('[]'),
  vulnerabilityExploited: text("vulnerability_exploited"),
  safeguardsInPlace: jsonb("safeguards_in_place").default('[]'), // What safeguards were in place
  safeguardsFailure: text("safeguards_failure"), // Why safeguards failed
  immediateActions: jsonb("immediate_actions").default('[]'), // Immediate response actions
  containmentActions: jsonb("containment_actions").default('[]'),
  remediationActions: jsonb("remediation_actions").default('[]'),
  preventiveActions: jsonb("preventive_actions").default('[]'),
  investigationAssigned: varchar("investigation_assigned").references(() => users.id),
  investigationStarted: timestamp("investigation_started"),
  investigationCompleted: timestamp("investigation_completed"),
  investigationFindings: text("investigation_findings"),
  riskAssessment: text("risk_assessment"),
  riskToIndividuals: varchar("risk_to_individuals").notNull(), // low, medium, high
  probabilityOfCompromise: varchar("probability_of_compromise").notNull(), // low, medium, high
  impactAssessment: text("impact_assessment"),
  notificationRequired: boolean("notification_required").default(true),
  notificationThreshold: varchar("notification_threshold"), // under_500, over_500, media_attention
  individualNotificationRequired: boolean("individual_notification_required").default(true),
  individualNotificationMethod: varchar("individual_notification_method"), // mail, email, phone, substitute_notice
  individualNotificationDate: timestamp("individual_notification_date"),
  individualNotificationSent: integer("individual_notification_sent").default(0),
  individualNotificationText: text("individual_notification_text"),
  mediaNotificationRequired: boolean("media_notification_required").default(false),
  mediaNotificationDate: timestamp("media_notification_date"),
  mediaNotificationText: text("media_notification_text"),
  hhsNotificationRequired: boolean("hhs_notification_required").default(true),
  hhsNotificationDate: timestamp("hhs_notification_date"),
  hhsNotificationText: text("hhs_notification_text"),
  hhsNotificationMethod: varchar("hhs_notification_method"), // online, paper
  stateNotificationRequired: boolean("state_notification_required").default(false),
  stateNotificationDate: timestamp("state_notification_date"),
  lawEnforcementNotified: boolean("law_enforcement_notified").default(false),
  lawEnforcementDate: timestamp("law_enforcement_date"),
  regulatoryNotifications: jsonb("regulatory_notifications").default('[]'),
  businessAssociateInvolved: boolean("business_associate_involved").default(false),
  businessAssociateId: varchar("business_associate_id").references(() => hipaaBusinessAssociates.baId),
  businessAssociateNotified: timestamp("business_associate_notified"),
  insuranceNotified: boolean("insurance_notified").default(false),
  insuranceClaimFiled: boolean("insurance_claim_filed").default(false),
  legalCounselConsulted: boolean("legal_counsel_consulted").default(false),
  legalCounselDate: timestamp("legal_counsel_date"),
  publicRelationsInvolved: boolean("public_relations_involved").default(false),
  mediaInquiries: integer("media_inquiries").default(0),
  mediaResponse: text("media_response"),
  costEstimate: numeric("cost_estimate", { precision: 12, scale: 2 }), // Estimated cost of breach
  actualCosts: jsonb("actual_costs").default('[]'), // Breakdown of actual costs
  lessonsLearned: text("lessons_learned"),
  correctiveActions: jsonb("corrective_actions").default('[]'),
  systemChanges: jsonb("system_changes").default('[]'),
  policyChanges: jsonb("policy_changes").default('[]'),
  trainingChanges: jsonb("training_changes").default('[]'),
  followUpRequired: boolean("follow_up_required").default(true),
  followUpActions: jsonb("follow_up_actions").default('[]'),
  closeoutDate: timestamp("closeout_date"),
  closeoutApprovedBy: varchar("closeout_approved_by").references(() => users.id),
  annualReportIncluded: boolean("annual_report_included").default(true),
  status: varchar("status").notNull().default("investigating"), // investigating, contained, notified, closed
  severity: varchar("severity").notNull(), // low, medium, high, critical
  priority: varchar("priority").notNull().default("high"), // low, medium, high, critical
  documentReferences: jsonb("document_references").default('[]'),
  attachments: jsonb("attachments").default('[]'),
  tags: jsonb("tags").default('[]'),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// 5. RISK ASSESSMENT AND MANAGEMENT

// HIPAA Risk Assessments
export const hipaaRiskAssessments = pgTable("hipaa_risk_assessments", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  organizationId: varchar("organization_id").notNull(),
  assessmentId: varchar("assessment_id").notNull().unique(),
  assessmentType: varchar("assessment_type").notNull(), // comprehensive, targeted, follow_up, annual, incident_driven
  assessmentTitle: varchar("assessment_title").notNull(),
  assessmentDescription: text("assessment_description").notNull(),
  scope: text("scope").notNull(), // What is being assessed
  methodology: text("methodology").notNull(), // How assessment is conducted
  assessmentPeriod: jsonb("assessment_period").notNull(), // Start and end dates
  conductedBy: varchar("conducted_by").references(() => users.id),
  assessmentTeam: jsonb("assessment_team").default('[]'), // Team members
  externalConsultants: jsonb("external_consultants").default('[]'),
  assetsAssessed: jsonb("assets_assessed").notNull(), // IT assets, processes, etc.
  threatsIdentified: jsonb("threats_identified").notNull(), // Security threats
  vulnerabilities: jsonb("vulnerabilities").notNull(), // Identified vulnerabilities
  safeguardsEvaluated: jsonb("safeguards_evaluated").notNull(), // Current safeguards
  riskFindings: jsonb("risk_findings").notNull(), // Detailed risk analysis
  riskMatrix: jsonb("risk_matrix").notNull(), // Risk scoring matrix
  overallRiskLevel: varchar("overall_risk_level").notNull(), // low, medium, high, critical
  priorityRisks: jsonb("priority_risks").default('[]'), // Top risks requiring attention
  recommendedActions: jsonb("recommended_actions").notNull(), // Recommendations
  costBenefitAnalysis: text("cost_benefit_analysis"),
  implementationPlan: text("implementation_plan"),
  mitigationStrategies: jsonb("mitigation_strategies").default('[]'),
  residualRisks: jsonb("residual_risks").default('[]'), // Remaining risks after mitigation
  acceptedRisks: jsonb("accepted_risks").default('[]'), // Risks accepted by management
  status: varchar("status").notNull().default("in_progress"), // draft, in_progress, completed, approved, implemented
  approvedBy: varchar("approved_by").references(() => users.id),
  approvalDate: timestamp("approval_date"),
  nextReviewDate: timestamp("next_review_date"),
  followUpAssessments: jsonb("follow_up_assessments").default('[]'),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// 6. ACCESS CONTROL ENHANCEMENTS

// Time-based Access Restrictions and Tracking
export const hipaaTimeBasedAccess = pgTable("hipaa_time_based_access", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  organizationId: varchar("organization_id").notNull(),
  userId: varchar("user_id").notNull().references(() => users.id),
  resourceType: varchar("resource_type").notNull(), // phi_data, system_admin, reports, backups
  resourceId: varchar("resource_id"), // Specific resource if applicable
  accessPattern: varchar("access_pattern").notNull(), // business_hours, scheduled, temporary, emergency
  allowedDays: jsonb("allowed_days").notNull(), // Days of week when access is allowed
  allowedTimeRanges: jsonb("allowed_time_ranges").notNull(), // Time ranges per day
  timezone: varchar("timezone").notNull().default("UTC"),
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date"), // null for permanent restrictions
  maxSessionDuration: integer("max_session_duration").default(480), // Minutes
  idleTimeout: integer("idle_timeout").default(30), // Minutes
  warningBeforeTimeout: integer("warning_before_timeout").default(5), // Minutes
  gracePeriod: integer("grace_period").default(0), // Minutes for emergency access
  automaticLogoff: boolean("automatic_logoff").default(true),
  exceptions: jsonb("exceptions").default('[]'), // Special circumstances
  approvedBy: varchar("approved_by").notNull().references(() => users.id),
  justification: text("justification").notNull(),
  businessNeed: text("business_need").notNull(),
  status: varchar("status").notNull().default("active"), // active, inactive, suspended, expired
  violationCount: integer("violation_count").default(0),
  lastViolation: timestamp("last_violation"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Access Request and Approval Workflows
export const hipaaAccessRequests = pgTable("hipaa_access_requests", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  organizationId: varchar("organization_id").notNull(),
  requestId: varchar("request_id").notNull().unique(),
  requestedBy: varchar("requested_by").notNull().references(() => users.id),
  requestedFor: varchar("requested_for").references(() => users.id), // May be different from requester
  requestType: varchar("request_type").notNull(), // new_access, modify_access, emergency_access, temporary_access
  accessType: varchar("access_type").notNull(), // phi_read, phi_write, phi_export, system_admin, reports
  resourcesRequested: jsonb("resources_requested").notNull(),
  phiTypesRequested: jsonb("phi_types_requested").default('[]'),
  accessLevel: varchar("access_level").notNull(), // read, write, admin, full
  accessDuration: varchar("access_duration"), // permanent, temporary, emergency
  startDate: timestamp("start_date"),
  endDate: timestamp("end_date"),
  businessJustification: text("business_justification").notNull(),
  supervisorApproval: varchar("supervisor_approval").references(() => users.id),
  supervisorApprovalDate: timestamp("supervisor_approval_date"),
  securityOfficerApproval: varchar("security_officer_approval").references(() => users.id),
  securityOfficerApprovalDate: timestamp("security_officer_approval_date"),
  minimumNecessaryJustification: text("minimum_necessary_justification").notNull(),
  riskAssessment: text("risk_assessment"),
  mitigationMeasures: jsonb("mitigation_measures").default('[]'),
  trainingRequirements: jsonb("training_requirements").default('[]'),
  monitoringRequirements: jsonb("monitoring_requirements").default('[]'),
  reviewFrequency: varchar("review_frequency").default("quarterly"),
  automaticExpiry: boolean("automatic_expiry").default(true),
  status: varchar("status").notNull().default("pending"), // pending, approved, denied, implemented, expired, revoked
  implementedBy: varchar("implemented_by").references(() => users.id),
  implementationDate: timestamp("implementation_date"),
  denialReason: text("denial_reason"),
  deniedBy: varchar("denied_by").references(() => users.id),
  denialDate: timestamp("denial_date"),
  appealFiled: boolean("appeal_filed").default(false),
  appealReason: text("appeal_reason"),
  appealDecision: text("appeal_decision"),
  auditTrail: jsonb("audit_trail").default('[]'),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// 7. DATA ENCRYPTION AND KEY MANAGEMENT

// Encryption Key Management
export const hipaaEncryptionKeys = pgTable("hipaa_encryption_keys", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  organizationId: varchar("organization_id").notNull(),
  keyId: varchar("key_id").notNull().unique(),
  keyType: varchar("key_type").notNull(), // database, file, transport, signing, master
  algorithm: varchar("algorithm").notNull(), // AES256, RSA2048, etc.
  keySize: integer("key_size").notNull(), // Key size in bits
  keyUsage: varchar("key_usage").notNull(), // encrypt, decrypt, sign, verify
  keyStatus: varchar("key_status").notNull().default("active"), // active, inactive, expired, compromised, archived
  createdDate: timestamp("created_date").notNull(),
  expiryDate: timestamp("expiry_date"),
  rotationSchedule: integer("rotation_schedule").default(365), // Days
  lastRotation: timestamp("last_rotation"),
  nextRotation: timestamp("next_rotation"),
  keyLocation: varchar("key_location").notNull(), // hsm, kms, vault, local
  hsmType: varchar("hsm_type"), // Hardware Security Module type
  accessControlList: jsonb("access_control_list").notNull(), // Who can use this key
  keyEscrow: boolean("key_escrow").default(false), // Is key escrowed
  escrowLocation: varchar("escrow_location"),
  backupCopies: integer("backup_copies").default(0),
  backupLocations: jsonb("backup_locations").default('[]'),
  usageCount: integer("usage_count").default(0),
  maxUsage: integer("max_usage"), // Maximum number of uses
  createdBy: varchar("created_by").notNull().references(() => users.id),
  approvedBy: varchar("approved_by").references(() => users.id),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// ===== HIPAA COMPLIANCE INSERT SCHEMAS AND TYPE DEFINITIONS =====

export const insertHipaaSecurityOfficerSchema = createInsertSchema(hipaaSecurityOfficers).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertHipaaPolicySchema = createInsertSchema(hipaaPolicies).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertHipaaTrainingSchema = createInsertSchema(hipaaTraining).omit({
  id: true,
  createdAt: true,
});

export const insertHipaaTrainingRecordSchema = createInsertSchema(hipaaTrainingRecords).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertHipaaBusinessAssociateSchema = createInsertSchema(hipaaBusinessAssociates).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertHipaaWorkstationSecuritySchema = createInsertSchema(hipaaWorkstationSecurity).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertHipaaMediaControlSchema = createInsertSchema(hipaaMediaControls).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertHipaaFacilityAccessSchema = createInsertSchema(hipaaFacilityAccess).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertHipaaSecureAuditLogSchema = createInsertSchema(hipaaSecureAuditLogs).omit({
  id: true,
  createdAt: true,
});

export const insertHipaaEmergencyAccessSchema = createInsertSchema(hipaaEmergencyAccess).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertHipaaBreachIncidentSchema = createInsertSchema(hipaaBreachIncidents).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertHipaaRiskAssessmentSchema = createInsertSchema(hipaaRiskAssessments).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertHipaaTimeBasedAccessSchema = createInsertSchema(hipaaTimeBasedAccess).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertHipaaAccessRequestSchema = createInsertSchema(hipaaAccessRequests).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertHipaaEncryptionKeySchema = createInsertSchema(hipaaEncryptionKeys).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// HIPAA Compliance Type Exports
export type HipaaSecurityOfficer = typeof hipaaSecurityOfficers.$inferSelect;
export type InsertHipaaSecurityOfficer = z.infer<typeof insertHipaaSecurityOfficerSchema>;
export type HipaaPolicy = typeof hipaaPolicies.$inferSelect;
export type InsertHipaaPolicy = z.infer<typeof insertHipaaPolicySchema>;
export type HipaaTraining = typeof hipaaTraining.$inferSelect;
export type InsertHipaaTraining = z.infer<typeof insertHipaaTrainingSchema>;
export type HipaaTrainingRecord = typeof hipaaTrainingRecords.$inferSelect;
export type InsertHipaaTrainingRecord = z.infer<typeof insertHipaaTrainingRecordSchema>;
export type HipaaBusinessAssociate = typeof hipaaBusinessAssociates.$inferSelect;
export type InsertHipaaBusinessAssociate = z.infer<typeof insertHipaaBusinessAssociateSchema>;
export type HipaaWorkstationSecurity = typeof hipaaWorkstationSecurity.$inferSelect;
export type InsertHipaaWorkstationSecurity = z.infer<typeof insertHipaaWorkstationSecuritySchema>;
export type HipaaMediaControl = typeof hipaaMediaControls.$inferSelect;
export type InsertHipaaMediaControl = z.infer<typeof insertHipaaMediaControlSchema>;
export type HipaaFacilityAccess = typeof hipaaFacilityAccess.$inferSelect;
export type InsertHipaaFacilityAccess = z.infer<typeof insertHipaaFacilityAccessSchema>;
export type HipaaSecureAuditLog = typeof hipaaSecureAuditLogs.$inferSelect;
export type InsertHipaaSecureAuditLog = z.infer<typeof insertHipaaSecureAuditLogSchema>;
export type HipaaEmergencyAccess = typeof hipaaEmergencyAccess.$inferSelect;
export type InsertHipaaEmergencyAccess = z.infer<typeof insertHipaaEmergencyAccessSchema>;
export type HipaaBreachIncident = typeof hipaaBreachIncidents.$inferSelect;
export type InsertHipaaBreachIncident = z.infer<typeof insertHipaaBreachIncidentSchema>;
export type HipaaRiskAssessment = typeof hipaaRiskAssessments.$inferSelect;
export type InsertHipaaRiskAssessment = z.infer<typeof insertHipaaRiskAssessmentSchema>;
export type HipaaTimeBasedAccess = typeof hipaaTimeBasedAccess.$inferSelect;
export type InsertHipaaTimeBasedAccess = z.infer<typeof insertHipaaTimeBasedAccessSchema>;
export type HipaaAccessRequest = typeof hipaaAccessRequests.$inferSelect;
export type InsertHipaaAccessRequest = z.infer<typeof insertHipaaAccessRequestSchema>;
export type HipaaEncryptionKey = typeof hipaaEncryptionKeys.$inferSelect;
export type InsertHipaaEncryptionKey = z.infer<typeof insertHipaaEncryptionKeySchema>;

// ===== CYBERSECURED AI CATALOG SYSTEM =====

// Catalog Categories - Core categories for organizing products, services, and solutions
export const catalogCategories = pgTable("catalog_categories", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: varchar("name").notNull(),
  slug: varchar("slug").notNull().unique(),
  description: text("description"),
  categoryType: varchar("category_type").notNull(), // product, service, solution
  parentId: varchar("parent_id").references(() => catalogCategories.id),
  sortOrder: integer("sort_order").default(0),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// BOM Components - Individual components and their costs for products
export const bomComponents = pgTable("bom_components", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  componentName: varchar("component_name").notNull(),
  componentType: varchar("component_type").notNull(), // hardware, software, service, license, labor
  vendorName: varchar("vendor_name"),
  vendorPartNumber: varchar("vendor_part_number"),
  description: text("description"),
  unitCost: numeric("unit_cost", { precision: 12, scale: 2 }).notNull(),
  currency: varchar("currency").default("USD"),
  leadTimeDays: integer("lead_time_days"),
  minimumOrderQuantity: integer("minimum_order_quantity").default(1),
  specifications: jsonb("specifications"), // Technical specifications
  certifications: jsonb("certifications"), // Security/compliance certifications
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Catalog Products - Core CyberSecured AI products with full BOM and pricing
export const catalogProducts = pgTable("catalog_products", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: varchar("name").notNull(),
  slug: varchar("slug").notNull().unique(),
  productCode: varchar("product_code").notNull().unique(),
  categoryId: varchar("category_id").notNull().references(() => catalogCategories.id),
  shortDescription: text("short_description"),
  fullDescription: text("full_description"),
  technicalSpecifications: jsonb("technical_specifications"),
  features: jsonb("features"), // Array of key features
  
  // Pricing Information
  developmentCost: numeric("development_cost", { precision: 12, scale: 2 }),
  manufacturingCost: numeric("manufacturing_cost", { precision: 12, scale: 2 }),
  totalCostPrice: numeric("total_cost_price", { precision: 12, scale: 2 }).notNull(),
  commercialSellPrice: numeric("commercial_sell_price", { precision: 12, scale: 2 }).notNull(),
  federalSellPrice: numeric("federal_sell_price", { precision: 12, scale: 2 }).notNull(),
  gsaPrice: numeric("gsa_price", { precision: 12, scale: 2 }),
  
  // Margin Analysis
  commercialMarginPercent: numeric("commercial_margin_percent", { precision: 5, scale: 2 }),
  federalMarginPercent: numeric("federal_margin_percent", { precision: 5, scale: 2 }),
  
  // Volume Pricing
  volumePricingTiers: jsonb("volume_pricing_tiers"), // Array of quantity/price tiers
  
  // Compliance and Certifications
  complianceFrameworks: jsonb("compliance_frameworks"), // FISMA, FedRAMP, etc.
  securityCertifications: jsonb("security_certifications"),
  
  // Licensing and Deployment
  licenseModel: varchar("license_model"), // perpetual, subscription, usage-based
  deploymentModel: varchar("deployment_model"), // on-premise, cloud, hybrid
  supportLevel: varchar("support_level").default("standard"), // basic, standard, premium, enterprise
  
  // Product Status
  productStatus: varchar("product_status").notNull().default("active"), // active, deprecated, planned, beta
  releaseDate: timestamp("release_date"),
  endOfLifeDate: timestamp("end_of_life_date"),
  
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Product BOM - Junction table linking products to their bill of materials
export const productBom = pgTable("product_bom", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  productId: varchar("product_id").notNull().references(() => catalogProducts.id),
  componentId: varchar("component_id").notNull().references(() => bomComponents.id),
  quantity: numeric("quantity", { precision: 8, scale: 2 }).notNull(),
  componentRole: varchar("component_role"), // primary, secondary, optional
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Catalog Services - Professional and managed services
export const catalogServices = pgTable("catalog_services", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: varchar("name").notNull(),
  slug: varchar("slug").notNull().unique(),
  serviceCode: varchar("service_code").notNull().unique(),
  categoryId: varchar("category_id").notNull().references(() => catalogCategories.id),
  shortDescription: text("short_description"),
  fullDescription: text("full_description"),
  
  // Service Classification
  serviceType: varchar("service_type").notNull(), // professional, managed, consulting, support
  serviceDelivery: varchar("service_delivery").notNull(), // on-site, remote, hybrid
  
  // Resource Requirements
  requiredSkillLevel: varchar("required_skill_level").notNull(), // junior, senior, expert, architect
  requiredCertifications: jsonb("required_certifications"),
  laborHours: jsonb("labor_hours"), // Breakdown by role/seniority
  
  // Pricing Structure
  hourlyRate: numeric("hourly_rate", { precision: 8, scale: 2 }),
  dailyRate: numeric("daily_rate", { precision: 8, scale: 2 }),
  weeklyRate: numeric("weekly_rate", { precision: 8, scale: 2 }),
  monthlyRate: numeric("monthly_rate", { precision: 8, scale: 2 }),
  projectBasePrice: numeric("project_base_price", { precision: 12, scale: 2 }),
  
  // Cost Structure
  deliveryCost: numeric("delivery_cost", { precision: 12, scale: 2 }).notNull(),
  commercialSellPrice: numeric("commercial_sell_price", { precision: 12, scale: 2 }).notNull(),
  federalSellPrice: numeric("federal_sell_price", { precision: 12, scale: 2 }).notNull(),
  
  // Margin Analysis
  commercialMarginPercent: numeric("commercial_margin_percent", { precision: 5, scale: 2 }),
  federalMarginPercent: numeric("federal_margin_percent", { precision: 5, scale: 2 }),
  
  // Service Level Agreements
  slaCommitments: jsonb("sla_commitments"),
  responseTimeHours: integer("response_time_hours"),
  resolutionTimeHours: integer("resolution_time_hours"),
  availabilityPercent: numeric("availability_percent", { precision: 5, scale: 2 }),
  
  // Compliance Requirements
  complianceFrameworks: jsonb("compliance_frameworks"),
  clearanceLevel: varchar("clearance_level"), // public, secret, top_secret
  
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Catalog Solutions - Integrated product + service packages
export const catalogSolutions = pgTable("catalog_solutions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: varchar("name").notNull(),
  slug: varchar("slug").notNull().unique(),
  solutionCode: varchar("solution_code").notNull().unique(),
  categoryId: varchar("category_id").notNull().references(() => catalogCategories.id),
  shortDescription: text("short_description"),
  fullDescription: text("full_description"),
  
  // Solution Classification
  solutionType: varchar("solution_type").notNull(), // integrated, bundled, enterprise, pilot
  targetAudience: varchar("target_audience").notNull(), // federal, education, healthcare, commercial
  deploymentSize: varchar("deployment_size").notNull(), // small, medium, large, enterprise
  
  // Implementation Details
  implementationPeriodMonths: integer("implementation_period_months"),
  onboardingIncluded: boolean("onboarding_included").default(true),
  trainingIncluded: boolean("training_included").default(true),
  migrationSupport: boolean("migration_support").default(false),
  
  // Pricing Structure
  totalSolutionCost: numeric("total_solution_cost", { precision: 12, scale: 2 }).notNull(),
  commercialSellPrice: numeric("commercial_sell_price", { precision: 12, scale: 2 }).notNull(),
  federalSellPrice: numeric("federal_sell_price", { precision: 12, scale: 2 }).notNull(),
  bundleDiscountPercent: numeric("bundle_discount_percent", { precision: 5, scale: 2 }),
  
  // Contract Terms
  minimumContractMonths: integer("minimum_contract_months").default(12),
  maximumContractMonths: integer("maximum_contract_months"),
  autoRenewal: boolean("auto_renewal").default(true),
  
  // Multi-year Pricing
  yearOnePrice: numeric("year_one_price", { precision: 12, scale: 2 }),
  yearTwoPrice: numeric("year_two_price", { precision: 12, scale: 2 }),
  yearThreePrice: numeric("year_three_price", { precision: 12, scale: 2 }),
  
  // Enterprise Licensing
  enterpriseLicenseTerms: jsonb("enterprise_license_terms"),
  scalabilityOptions: jsonb("scalability_options"),
  customizationLevel: varchar("customization_level"), // standard, enhanced, full
  
  // Support and Maintenance
  supportLevel: varchar("support_level").default("standard"),
  maintenanceIncluded: boolean("maintenance_included").default(true),
  upgradePolicy: text("upgrade_policy"),
  
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Solution Components - Junction table linking solutions to products and services
export const solutionComponents = pgTable("solution_components", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  solutionId: varchar("solution_id").notNull().references(() => catalogSolutions.id),
  componentType: varchar("component_type").notNull(), // product, service
  componentId: varchar("component_id").notNull(), // References either catalogProducts.id or catalogServices.id
  quantity: numeric("quantity", { precision: 8, scale: 2 }).notNull(),
  componentRole: varchar("component_role"), // core, optional, addon
  discountPercent: numeric("discount_percent", { precision: 5, scale: 2 }),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Pricing History - Track pricing changes over time
export const pricingHistory = pgTable("pricing_history", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  entityType: varchar("entity_type").notNull(), // product, service, solution
  entityId: varchar("entity_id").notNull(),
  priceType: varchar("price_type").notNull(), // commercial, federal, gsa
  oldPrice: numeric("old_price", { precision: 12, scale: 2 }),
  newPrice: numeric("new_price", { precision: 12, scale: 2 }).notNull(),
  changeReason: text("change_reason"),
  effectiveDate: timestamp("effective_date").notNull(),
  changedBy: varchar("changed_by").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
});

// Competitive Analysis - Track competitor pricing and positioning
export const competitiveAnalysis = pgTable("competitive_analysis", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  competitorName: varchar("competitor_name").notNull(),
  productName: varchar("product_name").notNull(),
  competitorPrice: numeric("competitor_price", { precision: 12, scale: 2 }),
  ourPrice: numeric("our_price", { precision: 12, scale: 2 }),
  priceAdvantage: numeric("price_advantage", { precision: 5, scale: 2 }),
  featureComparison: jsonb("feature_comparison"),
  marketPosition: varchar("market_position"), // leader, challenger, follower, niche
  analysisNotes: text("analysis_notes"),
  lastUpdated: timestamp("last_updated").defaultNow(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Insert Schemas for Catalog Tables
export const insertCatalogCategorySchema = createInsertSchema(catalogCategories).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertBomComponentSchema = createInsertSchema(bomComponents).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertCatalogProductSchema = createInsertSchema(catalogProducts).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertProductBomSchema = createInsertSchema(productBom).omit({
  id: true,
  createdAt: true,
});

export const insertCatalogServiceSchema = createInsertSchema(catalogServices).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertCatalogSolutionSchema = createInsertSchema(catalogSolutions).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertSolutionComponentSchema = createInsertSchema(solutionComponents).omit({
  id: true,
  createdAt: true,
});

export const insertPricingHistorySchema = createInsertSchema(pricingHistory).omit({
  id: true,
  createdAt: true,
});

export const insertCompetitiveAnalysisSchema = createInsertSchema(competitiveAnalysis).omit({
  id: true,
  createdAt: true,
});

// Type Exports for Catalog System
export type CatalogCategory = typeof catalogCategories.$inferSelect;
export type InsertCatalogCategory = z.infer<typeof insertCatalogCategorySchema>;
export type BomComponent = typeof bomComponents.$inferSelect;
export type InsertBomComponent = z.infer<typeof insertBomComponentSchema>;
export type CatalogProduct = typeof catalogProducts.$inferSelect;
export type InsertCatalogProduct = z.infer<typeof insertCatalogProductSchema>;
export type ProductBom = typeof productBom.$inferSelect;
export type InsertProductBom = z.infer<typeof insertProductBomSchema>;
export type CatalogService = typeof catalogServices.$inferSelect;
export type InsertCatalogService = z.infer<typeof insertCatalogServiceSchema>;
export type CatalogSolution = typeof catalogSolutions.$inferSelect;
export type InsertCatalogSolution = z.infer<typeof insertCatalogSolutionSchema>;
export type SolutionComponent = typeof solutionComponents.$inferSelect;
export type InsertSolutionComponent = z.infer<typeof insertSolutionComponentSchema>;
export type PricingHistory = typeof pricingHistory.$inferSelect;
export type InsertPricingHistory = z.infer<typeof insertPricingHistorySchema>;
export type CompetitiveAnalysis = typeof competitiveAnalysis.$inferSelect;
export type InsertCompetitiveAnalysis = z.infer<typeof insertCompetitiveAnalysisSchema>;

// Type exports for TypeScript usage
export type UnifiedSystemStatus = z.infer<typeof UnifiedSystemStatusSchema>;
export type CrossSystemMetrics = z.infer<typeof CrossSystemMetricsSchema>;
export type ExecutiveMetrics = z.infer<typeof ExecutiveMetricsSchema>;
export type UnifiedAlert = z.infer<typeof UnifiedAlertSchema>;
export type AlertStats = z.infer<typeof AlertStatsSchema>;
