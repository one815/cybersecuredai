import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, integer, jsonb, boolean, index } from "drizzle-orm/pg-core";
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
  role: varchar("role").notNull().default("user"), // user, admin, faculty, student, compliance_officer
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

export type Ticket = typeof tickets.$inferSelect;
export type InsertTicket = z.infer<typeof insertTicketSchema>;
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
