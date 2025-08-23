import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, integer, jsonb, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: varchar("email").notNull().unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  role: varchar("role").notNull().default("user"), // user, admin, faculty, student, compliance_officer
  organization: varchar("organization"),
  profileImageUrl: varchar("profile_image_url"),
  isActive: boolean("is_active").default(true),
  lastLogin: timestamp("last_login"),
  mfaEnabled: boolean("mfa_enabled").default(false),
  mfaMethod: varchar("mfa_method").default("none"), // none, totp, biometric, hardware, digital_key
  biometricEnabled: boolean("biometric_enabled").default(false),
  digitalKeyEnabled: boolean("digital_key_enabled").default(false),
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

export type AchievementBadge = typeof achievementBadges.$inferSelect;
export type InsertAchievementBadge = z.infer<typeof insertAchievementBadgeSchema>;
export type UserBadge = typeof userBadges.$inferSelect;
export type InsertUserBadge = z.infer<typeof insertUserBadgeSchema>;
export type UserAchievementStats = typeof userAchievementStats.$inferSelect;
export type InsertUserAchievementStats = z.infer<typeof insertUserAchievementStatsSchema>;
export type ComplianceMilestone = typeof complianceMilestones.$inferSelect;
export type InsertComplianceMilestone = z.infer<typeof insertComplianceMilestoneSchema>;
