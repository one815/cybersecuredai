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
