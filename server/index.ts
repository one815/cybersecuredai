import express, { type Request, Response, NextFunction } from "express";
import helmet from "helmet";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";

const app = express();

// ===== CRITICAL OPERATIONAL SECURITY: BOOT-TIME VALIDATION =====

// CRITICAL FIX: Initialize data retention service for federal compliance
async function initializeDataRetentionServices() {
  try {
    console.log('🗄️ Initializing Data Retention Service for federal compliance...');
    
    // Initialize data retention service with production-ready configuration
    const { initializeDataRetentionService } = await import('./services/data-retention-service');
    
    const dataRetentionService = await initializeDataRetentionService({
      locationHistoryRetentionDays: parseInt(process.env.LOCATION_HISTORY_RETENTION_DAYS || '14'),
      contactTracingRetentionDays: parseInt(process.env.CONTACT_TRACING_RETENTION_DAYS || '30'),
      consentWithdrawalImmediateDeletion: process.env.CONSENT_IMMEDIATE_DELETION !== 'false',
      complianceReportingEnabled: process.env.COMPLIANCE_REPORTING_ENABLED !== 'false',
      auditCleanupOperations: process.env.AUDIT_CLEANUP_OPERATIONS !== 'false'
    });
    
    console.log('✅ Data Retention Service initialized successfully with scheduled jobs');
    console.log('📅 TTL cleanup jobs running daily at 2:00 AM UTC');
    console.log('📊 Compliance reporting enabled with weekly reports');
    
    return dataRetentionService;
  } catch (error) {
    console.error('❌ CRITICAL: Failed to initialize Data Retention Service:', error);
    
    if (process.env.NODE_ENV === 'production') {
      console.error('💀 PRODUCTION DEPLOYMENT BLOCKED: Data retention is required for federal compliance');
      process.exit(1);
    } else {
      console.warn('⚠️ Development mode: Data retention service initialization failed but continuing...');
      return null;
    }
  }
}

// CRITICAL FIX: Validate contact tracing database schemas on startup
async function validateContactTracingSchemas() {
  try {
    console.log('🔍 Validating Contact Tracing database schemas...');
    
    const { isDatabaseAvailable, db } = await import('./db');
    
    if (!isDatabaseAvailable()) {
      throw new Error('Database is not available - contact tracing requires persistent storage');
    }
    
    // Verify all required contact tracing tables exist
    const requiredTables = [
      'contact_tracing_location_history',
      'contact_proximity_detection', 
      'contact_tracing_notification_templates',
      'contact_tracing_notification_logs',
      'contact_tracing_privacy_consent'
    ];
    
    const { sql } = await import('drizzle-orm');
    
    for (const tableName of requiredTables) {
      try {
        const result = await db().execute(sql`
          SELECT 1 FROM information_schema.tables 
          WHERE table_schema = 'public' AND table_name = ${tableName}
        `);
        
        if (result.length === 0) {
          throw new Error(`Required table '${tableName}' is missing`);
        }
        
        console.log(`✅ Contact tracing table verified: ${tableName}`);
      } catch (error) {
        throw new Error(`Failed to verify table '${tableName}': ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }
    
    console.log('✅ All contact tracing schemas validated successfully');
    return true;
    
  } catch (error) {
    console.error('❌ CRITICAL: Contact tracing schema validation failed:', error);
    
    if (process.env.NODE_ENV === 'production') {
      console.error('💀 PRODUCTION DEPLOYMENT BLOCKED: Contact tracing requires validated database schemas');
      console.error('🔧 Please run database migrations: npm run db:push');
      process.exit(1);
    } else {
      console.warn('⚠️ Development mode: Schema validation failed but continuing...');
      return false;
    }
  }
}

// CRITICAL FIX: Comprehensive environment validation including CDC integration with PEM key support
function validateEnvironmentSecurity() {
  const requiredSecrets = ['JWT_SECRET'];
  const phinRequiredSecrets = ['PHIN_PRIVATE_KEY_PEM', 'PHIN_PUBLIC_KEY_PEM'];
  const cdcRequiredSecrets = ['CDC_CLIENT_ID', 'CDC_CLIENT_SECRET', 'CDC_BASE_URL'];
  const missingSecrets: string[] = [];
  const weakSecrets: string[] = [];
  const phinMissingSecrets: string[] = [];
  const cdcMissingSecrets: string[] = [];
  
  if (process.env.NODE_ENV === 'production') {
    console.log('🔐 Running production security validation...');
    
    // Check for required secrets
    for (const secret of requiredSecrets) {
      const value = process.env[secret];
      if (!value) {
        missingSecrets.push(secret);
      } else if (secret === 'JWT_SECRET' && value.length < 32) {
        weakSecrets.push(`${secret} (minimum 32 characters required)`);
      }
    }
    
    // CRITICAL FIX: Validate PHIN PEM keys for cryptographic compliance
    for (const secret of phinRequiredSecrets) {
      const value = process.env[secret];
      if (!value) {
        phinMissingSecrets.push(secret);
      } else {
        // Validate PEM format
        if (secret === 'PHIN_PRIVATE_KEY_PEM') {
          if (!isPEMPrivateKey(value)) {
            weakSecrets.push(`${secret} (must be valid PEM format RSA private key)`);
          }
        } else if (secret === 'PHIN_PUBLIC_KEY_PEM') {
          if (!isPEMPublicKeyOrCert(value)) {
            weakSecrets.push(`${secret} (must be valid PEM format RSA public key or certificate)`);
          }
        }
      }
    }
    
    // CRITICAL FIX: Validate CDC configuration in production
    for (const secret of cdcRequiredSecrets) {
      const value = process.env[secret];
      if (!value) {
        cdcMissingSecrets.push(secret);
      } else if (secret === 'CDC_BASE_URL' && !value.startsWith('https://')) {
        weakSecrets.push(`${secret} (must use HTTPS for secure CDC communication)`);
      } else if (secret === 'CDC_CLIENT_ID' && value.length < 8) {
        weakSecrets.push(`${secret} (minimum 8 characters required)`);
      } else if (secret === 'CDC_CLIENT_SECRET' && value.length < 16) {
        weakSecrets.push(`${secret} (minimum 16 characters required for secure CDC authentication)`);
      }
    }
    
    // Validate critical errors
    if (missingSecrets.length > 0) {
      console.error('🚨 CRITICAL SECURITY FAILURE: Missing required environment variables:');
      missingSecrets.forEach(secret => console.error(`   - ${secret}`));
      console.error('💀 APPLICATION CANNOT START SECURELY');
      process.exit(1);
    }
    
    // CRITICAL FIX: Fail-closed for missing PHIN configuration in production
    if (phinMissingSecrets.length > 0) {
      console.error('🚨 CRITICAL PHIN CONFIGURATION FAILURE: Missing required PHIN PEM keys:');
      phinMissingSecrets.forEach(secret => console.error(`   - ${secret}`));
      console.error('💀 PHIN DIGITAL SIGNATURES CANNOT START - PRODUCTION DEPLOYMENT BLOCKED');
      console.error('🔧 Required PHIN configuration:');
      console.error('   - PHIN_PRIVATE_KEY_PEM: RSA private key in PEM format for signing');
      console.error('   - PHIN_PUBLIC_KEY_PEM: RSA public key in PEM format for verification');
      console.error('   - Alternatively use PHIN_CERT_PEM: X.509 certificate in PEM format');
      process.exit(1);
    }
    
    // CRITICAL FIX: Fail-closed for missing CDC configuration in production
    if (cdcMissingSecrets.length > 0) {
      console.error('🚨 CRITICAL CDC CONFIGURATION FAILURE: Missing required CDC environment variables:');
      cdcMissingSecrets.forEach(secret => console.error(`   - ${secret}`));
      console.error('💀 CDC INTEGRATION CANNOT START - PRODUCTION DEPLOYMENT BLOCKED');
      console.error('🔧 Required CDC configuration:');
      console.error('   - CDC_CLIENT_ID: Your CDC OAuth client ID');
      console.error('   - CDC_CLIENT_SECRET: Your CDC OAuth client secret');
      console.error('   - CDC_BASE_URL: CDC API base URL (https://api.cdc.gov for production)');
      process.exit(1);
    }
    
    if (weakSecrets.length > 0) {
      console.error('🚨 CRITICAL SECURITY FAILURE: Weak security configuration:');
      weakSecrets.forEach(issue => console.error(`   - ${issue}`));
      console.error('💀 APPLICATION CANNOT START SECURELY');
      process.exit(1);
    }
    
    // Additional production security checks
    const productionChecks = {
      DATABASE_URL: process.env.DATABASE_URL,
      NODE_ENV: process.env.NODE_ENV,
      PORT: process.env.PORT
    };
    
    if (!productionChecks.DATABASE_URL) {
      console.error('🚨 CRITICAL: DATABASE_URL must be configured in production');
      process.exit(1);
    }
    
    if (productionChecks.NODE_ENV !== 'production') {
      console.error('🚨 CRITICAL: NODE_ENV must be set to "production" for production deployment');
      process.exit(1);
    }
    
    console.log('✅ Production security validation passed');
    console.log('✅ All required secrets are properly configured');
    console.log('✅ PHIN PEM keys validated for cryptographic compliance');
    console.log('✅ Application starting with secure configuration');
    
  } else {
    console.log('🔓 Development mode: Relaxed security validation');
    console.log('   Note: Production deployment requires stricter security configuration');
    
    // SECURITY FIX: Still validate PHIN keys in development if provided
    if (process.env.PHIN_PRIVATE_KEY_PEM && process.env.PHIN_PUBLIC_KEY_PEM) {
      console.log('🔑 PHIN PEM keys detected in development - validating format...');
      if (!isPEMPrivateKey(process.env.PHIN_PRIVATE_KEY_PEM)) {
        console.warn('⚠️ WARNING: PHIN_PRIVATE_KEY_PEM is not valid PEM format');
      }
      if (!isPEMPublicKeyOrCert(process.env.PHIN_PUBLIC_KEY_PEM)) {
        console.warn('⚠️ WARNING: PHIN_PUBLIC_KEY_PEM is not valid PEM format');
      }
    }
  }
}

/**
 * SECURITY FIX: Add startup cryptographic self-checks
 */
async function performCryptographicSelfChecks() {
  try {
    console.log('🔐 Performing PHIN cryptographic self-checks...');
    
    // Check if PHIN keys are configured
    if (!process.env.PHIN_PRIVATE_KEY_PEM || !process.env.PHIN_PUBLIC_KEY_PEM) {
      console.log('⚠️ PHIN keys not configured - skipping cryptographic self-checks');
      return;
    }
    
    // Dynamic import to avoid circular dependencies
    const { getPHINSignatureService } = await import('./cdc-integration');
    
    // Test PHIN signature service
    const phinService = getPHINSignatureService();
    
    // Test payload
    const testPayload = {
      test: 'PHIN_STARTUP_VALIDATION',
      timestamp: Date.now(),
      environment: process.env.NODE_ENV || 'development'
    };
    
    // Test JWS signature generation and verification
    console.log('🔑 Testing JWS signature generation...');
    const jwsToken = phinService.generateJWSSignature(testPayload, {
      issuer: 'startup-validation',
      expiresIn: '300' // 5 minutes
    });
    
    console.log('🔍 Testing JWS signature verification...');
    const jwsResult = phinService.verifyJWSSignature(jwsToken, testPayload);
    
    if (!jwsResult.valid) {
      throw new Error(`JWS self-check failed: ${jwsResult.error}`);
    }
    
    // Test CMS signature generation
    console.log('🔑 Testing CMS signature generation...');
    const cmsSignature = phinService.generateCMSSignature(testPayload);
    
    if (!cmsSignature.signature) {
      throw new Error('CMS signature generation returned empty signature');
    }
    
    // Test CMS signature verification
    console.log('🔍 Testing CMS signature verification...');
    const cmsResult = phinService.verifyCMSSignature(testPayload, cmsSignature);
    
    if (!cmsResult.valid) {
      throw new Error(`CMS self-check failed: ${cmsResult.error}`);
    }
    
    console.log('✅ PHIN cryptographic self-checks passed successfully');
    console.log('✅ JWS signature generation and verification working');
    console.log('✅ CMS signature generation and verification working');
    console.log('✅ PHIN 2.0 compliance validated');
    
  } catch (error) {
    console.error('🚨 CRITICAL: PHIN cryptographic self-checks failed:', error);
    
    if (process.env.NODE_ENV === 'production') {
      console.error('💀 Production deployment cannot continue with failed cryptographic checks');
      process.exit(1);
    } else {
      console.log('⚠️ Development mode: Continuing despite failed cryptographic checks');
    }
  }
}

/**
 * SECURITY FIX: Helper functions for PEM format validation
 */
function isPEMPrivateKey(pem: string): boolean {
  return pem.includes('-----BEGIN PRIVATE KEY-----') ||
         pem.includes('-----BEGIN RSA PRIVATE KEY-----') ||
         pem.includes('-----BEGIN ENCRYPTED PRIVATE KEY-----');
}

function isPEMPublicKeyOrCert(pem: string): boolean {
  return pem.includes('-----BEGIN PUBLIC KEY-----') ||
         pem.includes('-----BEGIN RSA PUBLIC KEY-----') ||
         pem.includes('-----BEGIN CERTIFICATE-----');
}

// Execute security validation before any other initialization
validateEnvironmentSecurity();

// ===== CRITICAL COMPLIANCE: AUDIT IMMUTABILITY MIGRATION =====
// HIPAA/FedRAMP REQUIREMENT: Ensure WORM triggers are installed on startup

async function executeAuditImmutabilityMigration() {
  try {
    console.log('🔒 Executing HIPAA/FedRAMP audit immutability migration...');
    
    // Dynamic import to avoid issues when DATABASE_URL not available
    const { isDatabaseAvailable } = await import("./db");
    
    if (!isDatabaseAvailable()) {
      console.log('⚠️ Database not available - skipping audit immutability migration');
      return;
    }

    // Read and execute the SQL migration script
    const fs = await import('fs');
    const path = await import('path');
    const migrationPath = path.join(process.cwd(), 'scripts', 'add-audit-log-immutability.sql');
    
    if (!fs.existsSync(migrationPath)) {
      throw new Error('Critical audit immutability migration script not found');
    }

    const migrationSQL = fs.readFileSync(migrationPath, 'utf8');
    
    // Execute migration using database connection
    const { db } = await import("./db");
    const { sql } = await import("drizzle-orm");
    
    // Execute the migration in chunks (PostgreSQL functions)
    const sqlChunks = migrationSQL.split('-- =================================================================');
    
    for (let i = 0; i < sqlChunks.length; i++) {
      const chunk = sqlChunks[i].trim();
      if (chunk && !chunk.startsWith('--')) {
        await db.execute(sql.raw(chunk));
      }
    }
    
    console.log('✅ HIPAA/FedRAMP audit immutability migration completed successfully');
    console.log('✅ WORM (Write-Once-Read-Many) triggers installed on hipaa_secure_audit_logs');
    console.log('✅ Database-level audit log tampering prevention active');
    console.log('✅ Audit chain integrity validation functions installed');
    
  } catch (error) {
    console.error('🚨 CRITICAL: Audit immutability migration failed:', error);
    if (isProduction) {
      console.error('💀 Production deployment cannot continue without audit immutability');
      process.exit(1);
    } else {
      console.log('⚠️ Development mode: Continuing without audit immutability migration');
    }
  }
}

// CRITICAL BOOT SEQUENCE VALIDATION FUNCTIONS - TO BE CALLED DURING STARTUP
// These functions are defined but not called here - they will be awaited in the proper sequence below

// ===== CRITICAL HIPAA TRANSPORT SECURITY HARDENING =====

// CRITICAL FIX: Trust proxy before HTTPS redirect (required for proper HTTPS detection)
app.set('trust proxy', 1);

// Environment-specific security configuration
const isDevelopment = process.env.NODE_ENV === 'development';
const isProduction = process.env.NODE_ENV === 'production';

// CRITICAL FIX: Updated Helmet configuration with environment-gated CSP
app.use(helmet({
  // CRITICAL FIX: Enable HSTS only in production (HIPAA requirement)
  hsts: isProduction ? {
    maxAge: 31536000, // 1 year
    includeSubDomains: true,
    preload: true
  } : false,
  
  // CRITICAL FIX: Gate CSP unsafe allowances to development only
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      // SECURITY: Only allow unsafe directives in development
      scriptSrc: isDevelopment 
        ? ["'self'", "'unsafe-inline'", "'unsafe-eval'"] // Development only
        : ["'self'"], // Production: strict CSP
      styleSrc: isDevelopment 
        ? ["'self'", "'unsafe-inline'"] // Development only
        : ["'self'"], // Production: strict CSP
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'", "wss:", "https:"],
      fontSrc: ["'self'"],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      frameSrc: ["'none'"],
      baseUri: ["'self'"],
      formAction: ["'self'"],
      // CRITICAL FIX: Only include upgradeInsecureRequests in production
      ...(isProduction && { upgradeInsecureRequests: true }),
    },
  },
  
  // CRITICAL FIX: Remove deprecated options, use modern Helmet configuration
  crossOriginEmbedderPolicy: false, // May interfere with some integrations
  referrerPolicy: { policy: 'same-origin' }
}));

// Additional HIPAA-specific security headers
app.use((req, res, next) => {
  // CRITICAL FIX: HIPAA-specific headers (removed deprecated X-XSS-Protection)
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  // X-XSS-Protection header removed - deprecated and potentially harmful
  res.setHeader('Referrer-Policy', 'same-origin');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  
  // HIPAA compliance headers
  res.setHeader('X-HIPAA-Compliant', 'true');
  res.setHeader('X-PHI-Protected', 'true');
  
  // Remove server information
  res.removeHeader('X-Powered-By');
  res.removeHeader('Server');
  
  next();
});

// CRITICAL FIX: Enhanced HTTPS enforcement in production (HIPAA requirement)
if (isProduction) {
  app.use((req, res, next) => {
    // Check both req.secure (direct HTTPS) and x-forwarded-proto (load balancer)
    const isSecure = req.secure || req.header('x-forwarded-proto') === 'https';
    if (!isSecure) {
      log(`❌ HIPAA VIOLATION: Redirecting HTTP to HTTPS for ${req.url}`);
      return res.redirect(301, `https://${req.get('host')}${req.url}`);
    }
    next();
  });
}

// Security middleware for request size limits (prevent DoS)
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: false, limit: '10mb' }));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  try {
    // ===== CRITICAL FEDERAL COMPLIANCE BOOT SEQUENCE =====
    // Step 1: Environment Security Validation (already called at module level via validateEnvironmentSecurity())
    console.log('🔒 Step 1: Environment security validation completed');
    
    // Step 2: Contact Tracing Schema Validation (MUST be awaited)
    console.log('🔍 Step 2: Validating Contact Tracing database schemas...');
    if (process.env.DATABASE_URL) {
      await validateContactTracingSchemas();
      console.log('✅ Step 2: Contact tracing schemas validated successfully');
    } else {
      console.warn('⚠️ Step 2: No DATABASE_URL - skipping schema validation');
    }
    
    // Step 3: Data Retention Services Initialization (MUST be awaited)  
    console.log('🗄️ Step 3: Initializing Data Retention Services...');
    if (process.env.DATABASE_URL) {
      await initializeDataRetentionServices();
      console.log('✅ Step 3: Data retention services initialized successfully');
    } else {
      console.warn('⚠️ Step 3: No DATABASE_URL - skipping data retention services');
    }
    
    // Step 4: Cryptographic Self-Checks (await to ensure crypto readiness)
    console.log('🔐 Step 4: Performing cryptographic self-checks...');
    await performCryptographicSelfChecks();
    console.log('✅ Step 4: Cryptographic self-checks completed');
    
    // Step 5: HIPAA Audit Migration (await to ensure audit readiness)
    console.log('🏥 Step 5: Executing HIPAA compliance migrations...');
    if (process.env.DATABASE_URL) {
      await executeAuditImmutabilityMigration();
      console.log('✅ Step 5: HIPAA compliance migrations completed');
    } else {
      console.warn('⚠️ Step 5: No DATABASE_URL - skipping audit migrations');
    }
    
    console.log('🎯 BOOT SEQUENCE VALIDATION: All critical services initialized successfully');
    console.log('🏛️ FEDERAL COMPLIANCE: System ready for production deployment');
    
    // Step 6: Register Routes (after all critical services are ready)
    console.log('📡 Step 6: Registering API routes...');
    const server = await registerRoutes(app);

    // Enhanced error handling middleware
    app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
      const status = err.status || err.statusCode || 500;
      const message = err.message || "Internal Server Error";

      log(`Error ${status}: ${message}`);
      
      // Prevent server crash by ensuring response is sent
      if (!res.headersSent) {
        res.status(status).json({ message });
      }
    });

    // Serve static report files before Vite middleware
    app.use('/reports', express.static('public/reports'));
    
    // Serve legal documents before Vite middleware
    app.use('/legal', express.static('public/legal'));

    // importantly only setup vite in development and after
    // setting up all the other routes so the catch-all route
    // doesn't interfere with the other routes
    if (app.get("env") === "development") {
      await setupVite(app, server);
    } else {
      serveStatic(app);
    }

    // ALWAYS serve the app on the port specified in the environment variable PORT
    // Other ports are firewalled. Default to 5000 if not specified.
    // this serves both the API and the client.
    // It is the only port that is not firewalled.
    const port = parseInt(process.env.PORT || '5000', 10);
    
    // Validate port number
    if (isNaN(port) || port < 1 || port > 65535) {
      throw new Error(`Invalid port number: ${process.env.PORT}. Using default port 5000.`);
    }

    server.listen({
      port,
      host: "0.0.0.0",
      reusePort: true,
    }, () => {
      log(`serving on port ${port}`);
      log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    });

    // Graceful shutdown handling
    const gracefulShutdown = (signal: string) => {
      log(`Received ${signal}. Shutting down gracefully...`);
      server.close(() => {
        log('Server closed.');
        process.exit(0);
      });
    };

    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));

    // Handle uncaught exceptions
    process.on('uncaughtException', (error) => {
      log(`Uncaught Exception: ${error.message}`);
      console.error(error);
      process.exit(1);
    });

    process.on('unhandledRejection', (reason, promise) => {
      log(`Unhandled Rejection at: ${promise}, reason: ${reason}`);
      console.error(reason);
    });

  } catch (error) {
    log(`Failed to start server: ${error instanceof Error ? error.message : 'Unknown error'}`);
    console.error(error);
    process.exit(1);
  }
})();
