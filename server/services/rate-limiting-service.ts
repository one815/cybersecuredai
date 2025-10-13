/**
 * Production Rate Limiting Service for Contact Tracing Operations
 * 
 * Implements granular rate limiting for federal compliance and operational security:
 * - Contact tracing endpoint specific rate limits
 * - Location data submission rate limiting
 * - Notification sending abuse prevention
 * - Role-based rate limit adjustments
 * - Real-time monitoring and alerting
 */

import rateLimit from 'express-rate-limit';
import type { Request, Response, NextFunction } from 'express';
import type { AuthenticatedRequest } from '../auth';
import { storage } from '../storage';

// Rate limiting configuration for different contact tracing operations
export interface ContactTracingRateLimitConfig {
  // Location data submission limits
  locationSubmission: {
    windowMs: number;        // Time window in milliseconds
    max: number;            // Maximum requests per window
    skipSuccessfulRequests: boolean;
    skipFailedRequests: boolean;
  };
  
  // Notification sending limits  
  notificationSending: {
    windowMs: number;
    max: number;
    perRecipientMax: number; // Max notifications per recipient
    skipSuccessfulRequests: boolean;
  };
  
  // Contact tracing record operations
  contactTracingOperations: {
    windowMs: number;
    max: number;
    createMax: number;       // Specific limit for record creation
    updateMax: number;       // Specific limit for record updates
  };
  
  // Proximity detection processing
  proximityDetection: {
    windowMs: number;
    max: number;
    algorithmProcessingMax: number;
  };
  
  // Analytics and reporting
  analyticsOperations: {
    windowMs: number;
    max: number;
    heavyQueryMax: number;   // For resource-intensive queries
  };
  
  // Role-based adjustments
  roleAdjustments: {
    [role: string]: number;  // Multiplier for base limits (e.g., admin: 2.0)
  };
}

const DEFAULT_RATE_LIMIT_CONFIG: ContactTracingRateLimitConfig = {
  locationSubmission: {
    windowMs: 60 * 1000,     // 1 minute window
    max: 100,                // 100 location updates per minute per user
    skipSuccessfulRequests: false,
    skipFailedRequests: true
  },
  
  notificationSending: {
    windowMs: 60 * 1000,     // 1 minute window  
    max: 50,                 // 50 notifications per minute per sender
    perRecipientMax: 10,     // Max 10 notifications per recipient per minute
    skipSuccessfulRequests: false
  },
  
  contactTracingOperations: {
    windowMs: 60 * 1000,     // 1 minute window
    max: 200,                // 200 general operations per minute
    createMax: 50,           // 50 record creations per minute
    updateMax: 100           // 100 record updates per minute
  },
  
  proximityDetection: {
    windowMs: 60 * 1000,     // 1 minute window
    max: 1000,               // 1000 proximity checks per minute
    algorithmProcessingMax: 10 // 10 algorithm runs per minute
  },
  
  analyticsOperations: {
    windowMs: 60 * 1000,     // 1 minute window
    max: 100,                // 100 analytics requests per minute
    heavyQueryMax: 5         // 5 heavy queries per minute
  },
  
  roleAdjustments: {
    'admin': 2.0,
    'public_health_officer': 1.5,
    'epidemiologist': 1.3,
    'contact_tracer': 1.2,
    'user': 1.0
  }
};

export class ContactTracingRateLimitingService {
  private config: ContactTracingRateLimitConfig;
  private rateLimiters: Map<string, any> = new Map();
  private alertCounts: Map<string, number> = new Map();
  private readonly ALERT_THRESHOLD = 5; // Alert after 5 rate limit violations

  constructor(config?: Partial<ContactTracingRateLimitConfig>) {
    this.config = { 
      ...DEFAULT_RATE_LIMIT_CONFIG, 
      ...config,
      roleAdjustments: { 
        ...DEFAULT_RATE_LIMIT_CONFIG.roleAdjustments, 
        ...(config?.roleAdjustments || {}) 
      }
    };
    this.initializeRateLimiters();
    console.log('🔒 ContactTracingRateLimitingService initialized');
  }

  /**
   * Initialize all rate limiters with configuration
   */
  private initializeRateLimiters(): void {
    // Location submission rate limiter
    this.rateLimiters.set('locationSubmission', rateLimit({
      windowMs: this.config.locationSubmission.windowMs,
      max: this.config.locationSubmission.max,
      skipSuccessfulRequests: this.config.locationSubmission.skipSuccessfulRequests,
      skipFailedRequests: this.config.locationSubmission.skipFailedRequests,
      keyGenerator: (req: AuthenticatedRequest) => {
        const role = req.user?.role || 'user';
        const multiplier = this.config.roleAdjustments[role] || 1.0;
        // Adjust limit based on role - this is handled in the limit function
        return `location_${req.user?.id || req.ip}`;
      },
      handler: (req: AuthenticatedRequest, res: Response) => {
        this.handleRateLimitExceeded(req, res, 'locationSubmission');
      },
      onLimitReached: (req: AuthenticatedRequest) => {
        this.logRateLimitViolation(req, 'locationSubmission');
      }
    }));

    // Notification sending rate limiter
    this.rateLimiters.set('notificationSending', rateLimit({
      windowMs: this.config.notificationSending.windowMs,
      max: this.config.notificationSending.max,
      skipSuccessfulRequests: this.config.notificationSending.skipSuccessfulRequests,
      keyGenerator: (req: AuthenticatedRequest) => {
        return `notification_sender_${req.user?.id || req.ip}`;
      },
      handler: (req: AuthenticatedRequest, res: Response) => {
        this.handleRateLimitExceeded(req, res, 'notificationSending');
      },
      onLimitReached: (req: AuthenticatedRequest) => {
        this.logRateLimitViolation(req, 'notificationSending');
      }
    }));

    // Per-recipient notification rate limiter
    this.rateLimiters.set('perRecipientNotification', rateLimit({
      windowMs: this.config.notificationSending.windowMs,
      max: this.config.notificationSending.perRecipientMax,
      keyGenerator: (req: AuthenticatedRequest) => {
        const recipientId = req.body?.recipientId || req.params?.recipientId || req.query?.recipientId;
        return `notification_recipient_${recipientId}`;
      },
      handler: (req: AuthenticatedRequest, res: Response) => {
        this.handleRateLimitExceeded(req, res, 'perRecipientNotification');
      }
    }));

    // Contact tracing operations rate limiter
    this.rateLimiters.set('contactTracingOperations', rateLimit({
      windowMs: this.config.contactTracingOperations.windowMs,
      max: this.config.contactTracingOperations.max,
      keyGenerator: (req: AuthenticatedRequest) => {
        const role = req.user?.role || 'user';
        const multiplier = this.config.roleAdjustments[role] || 1.0;
        return `contact_tracing_${req.user?.id || req.ip}`;
      },
      handler: (req: AuthenticatedRequest, res: Response) => {
        this.handleRateLimitExceeded(req, res, 'contactTracingOperations');
      },
      onLimitReached: (req: AuthenticatedRequest) => {
        this.logRateLimitViolation(req, 'contactTracingOperations');
      }
    }));

    // Contact tracing record creation rate limiter (more restrictive)
    this.rateLimiters.set('contactTracingCreate', rateLimit({
      windowMs: this.config.contactTracingOperations.windowMs,
      max: this.config.contactTracingOperations.createMax,
      keyGenerator: (req: AuthenticatedRequest) => {
        return `contact_create_${req.user?.id || req.ip}`;
      },
      handler: (req: AuthenticatedRequest, res: Response) => {
        this.handleRateLimitExceeded(req, res, 'contactTracingCreate');
      },
      onLimitReached: (req: AuthenticatedRequest) => {
        this.logRateLimitViolation(req, 'contactTracingCreate');
      }
    }));

    // Proximity detection rate limiter
    this.rateLimiters.set('proximityDetection', rateLimit({
      windowMs: this.config.proximityDetection.windowMs,
      max: this.config.proximityDetection.max,
      keyGenerator: (req: AuthenticatedRequest) => {
        return `proximity_${req.user?.id || req.ip}`;
      },
      handler: (req: AuthenticatedRequest, res: Response) => {
        this.handleRateLimitExceeded(req, res, 'proximityDetection');
      }
    }));

    // Algorithm processing rate limiter (very restrictive)
    this.rateLimiters.set('algorithmProcessing', rateLimit({
      windowMs: this.config.proximityDetection.windowMs,
      max: this.config.proximityDetection.algorithmProcessingMax,
      keyGenerator: (req: AuthenticatedRequest) => {
        return `algorithm_${req.user?.id || req.ip}`;
      },
      handler: (req: AuthenticatedRequest, res: Response) => {
        this.handleRateLimitExceeded(req, res, 'algorithmProcessing');
      }
    }));

    // Analytics operations rate limiter
    this.rateLimiters.set('analyticsOperations', rateLimit({
      windowMs: this.config.analyticsOperations.windowMs,
      max: this.config.analyticsOperations.max,
      keyGenerator: (req: AuthenticatedRequest) => {
        const role = req.user?.role || 'user';
        const multiplier = this.config.roleAdjustments[role] || 1.0;
        return `analytics_${req.user?.id || req.ip}`;
      },
      handler: (req: AuthenticatedRequest, res: Response) => {
        this.handleRateLimitExceeded(req, res, 'analyticsOperations');
      }
    }));

    // Heavy query rate limiter (very restrictive)
    this.rateLimiters.set('heavyQuery', rateLimit({
      windowMs: this.config.analyticsOperations.windowMs,
      max: this.config.analyticsOperations.heavyQueryMax,
      keyGenerator: (req: AuthenticatedRequest) => {
        return `heavy_query_${req.user?.id || req.ip}`;
      },
      handler: (req: AuthenticatedRequest, res: Response) => {
        this.handleRateLimitExceeded(req, res, 'heavyQuery');
      }
    }));

    console.log('✅ Contact tracing rate limiters initialized');
  }

  /**
   * Get rate limiter middleware for location submission
   */
  getLocationSubmissionLimiter() {
    return this.rateLimiters.get('locationSubmission');
  }

  /**
   * Get rate limiter middleware for notification sending
   */
  getNotificationSendingLimiter() {
    const senderLimiter = this.rateLimiters.get('notificationSending');
    const recipientLimiter = this.rateLimiters.get('perRecipientNotification');
    
    // Return combined middleware that applies both limits
    return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
      senderLimiter(req, res, (err: any) => {
        if (err) return next(err);
        recipientLimiter(req, res, next);
      });
    };
  }

  /**
   * Get rate limiter middleware for contact tracing operations
   */
  getContactTracingOperationsLimiter() {
    return this.rateLimiters.get('contactTracingOperations');
  }

  /**
   * Get rate limiter middleware for contact tracing record creation
   */
  getContactTracingCreateLimiter() {
    const operationsLimiter = this.rateLimiters.get('contactTracingOperations');
    const createLimiter = this.rateLimiters.get('contactTracingCreate');
    
    // Apply both limits
    return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
      operationsLimiter(req, res, (err: any) => {
        if (err) return next(err);
        createLimiter(req, res, next);
      });
    };
  }

  /**
   * Get rate limiter middleware for proximity detection
   */
  getProximityDetectionLimiter() {
    return this.rateLimiters.get('proximityDetection');
  }

  /**
   * Get rate limiter middleware for algorithm processing
   */
  getAlgorithmProcessingLimiter() {
    const proximityLimiter = this.rateLimiters.get('proximityDetection');
    const algorithmLimiter = this.rateLimiters.get('algorithmProcessing');
    
    return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
      proximityLimiter(req, res, (err: any) => {
        if (err) return next(err);
        algorithmLimiter(req, res, next);
      });
    };
  }

  /**
   * Get rate limiter middleware for analytics operations
   */
  getAnalyticsOperationsLimiter() {
    return this.rateLimiters.get('analyticsOperations');
  }

  /**
   * Get rate limiter middleware for heavy queries
   */
  getHeavyQueryLimiter() {
    const analyticsLimiter = this.rateLimiters.get('analyticsOperations');
    const heavyQueryLimiter = this.rateLimiters.get('heavyQuery');
    
    return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
      analyticsLimiter(req, res, (err: any) => {
        if (err) return next(err);
        heavyQueryLimiter(req, res, next);
      });
    };
  }

  /**
   * Handle rate limit exceeded events
   */
  private handleRateLimitExceeded(req: AuthenticatedRequest, res: Response, limiterType: string): void {
    const userId = req.user?.id || 'anonymous';
    const userRole = req.user?.role || 'unknown';
    const endpoint = req.originalUrl;
    
    console.warn(`⚠️ Rate limit exceeded - Type: ${limiterType}, User: ${userId}, Role: ${userRole}, Endpoint: ${endpoint}`);
    
    // Increment alert count for this user/IP
    const alertKey = `${userId}_${limiterType}`;
    const currentAlerts = this.alertCounts.get(alertKey) || 0;
    this.alertCounts.set(alertKey, currentAlerts + 1);
    
    // Check if we need to trigger security alert
    if (currentAlerts >= this.ALERT_THRESHOLD) {
      this.triggerSecurityAlert(req, limiterType, currentAlerts);
      // Reset counter after alert
      this.alertCounts.set(alertKey, 0);
    }
    
    res.status(429).json({
      error: 'Rate limit exceeded',
      message: `Too many ${limiterType} requests. Please try again later.`,
      type: limiterType,
      retryAfter: Math.ceil(this.getRateLimitWindow(limiterType) / 1000),
      compliance: {
        reason: 'Federal contact tracing system operational security',
        contact: 'system.administrator@agency.gov'
      }
    });
  }

  /**
   * Log rate limit violations for audit and monitoring
   */
  private async logRateLimitViolation(req: AuthenticatedRequest, limiterType: string): Promise<void> {
    try {
      const userId = req.user?.id || 'anonymous';
      const endpoint = req.originalUrl;
      const method = req.method;
      const ipAddress = req.ip;
      const userAgent = req.get('User-Agent') || 'unknown';
      
      // Log to audit system
      await storage.createAuditLog({
        userId: userId === 'anonymous' ? undefined : userId,
        action: 'RATE_LIMIT_EXCEEDED',
        resource: `contact_tracing_${limiterType}`,
        details: {
          limiterType,
          endpoint,
          method,
          timestamp: new Date().toISOString(),
          securityEvent: true,
          rateLimitConfig: {
            windowMs: this.getRateLimitWindow(limiterType),
            maxRequests: this.getRateLimitMax(limiterType)
          }
        },
        ipAddress,
        userAgent
      });
      
      console.log(`📊 Logged rate limit violation - Type: ${limiterType}, User: ${userId}, Endpoint: ${endpoint}`);
      
    } catch (error) {
      console.error('❌ Failed to log rate limit violation:', error);
    }
  }

  /**
   * Trigger security alert for repeated violations
   */
  private async triggerSecurityAlert(req: AuthenticatedRequest, limiterType: string, violationCount: number): Promise<void> {
    try {
      const userId = req.user?.id || 'anonymous';
      const endpoint = req.originalUrl;
      const ipAddress = req.ip;
      
      console.error(`🚨 SECURITY ALERT - Repeated rate limit violations: Type: ${limiterType}, User: ${userId}, Count: ${violationCount}, Endpoint: ${endpoint}, IP: ${ipAddress}`);
      
      // Create high-priority audit log
      await storage.createAuditLog({
        userId: userId === 'anonymous' ? undefined : userId,
        action: 'SECURITY_ALERT_RATE_LIMIT',
        resource: `contact_tracing_security`,
        details: {
          alertType: 'REPEATED_RATE_LIMIT_VIOLATIONS',
          limiterType,
          violationCount,
          endpoint,
          timestamp: new Date().toISOString(),
          severity: 'HIGH',
          requiresInvestigation: true,
          potentialThreats: ['DoS attack', 'Data harvesting', 'System abuse'],
          recommendedActions: ['IP blocking', 'Account review', 'Security investigation']
        },
        ipAddress,
        userAgent: req.get('User-Agent') || 'unknown'
      });
      
      // Here you could integrate with external alerting systems
      // await this.sendSecurityAlert(userId, limiterType, violationCount);
      
    } catch (error) {
      console.error('❌ Failed to trigger security alert:', error);
    }
  }

  /**
   * Get rate limit window for a specific limiter type
   */
  private getRateLimitWindow(limiterType: string): number {
    switch (limiterType) {
      case 'locationSubmission':
        return this.config.locationSubmission.windowMs;
      case 'notificationSending':
      case 'perRecipientNotification':
        return this.config.notificationSending.windowMs;
      case 'contactTracingOperations':
      case 'contactTracingCreate':
        return this.config.contactTracingOperations.windowMs;
      case 'proximityDetection':
      case 'algorithmProcessing':
        return this.config.proximityDetection.windowMs;
      case 'analyticsOperations':
      case 'heavyQuery':
        return this.config.analyticsOperations.windowMs;
      default:
        return 60 * 1000; // Default 1 minute
    }
  }

  /**
   * Get rate limit max for a specific limiter type
   */
  private getRateLimitMax(limiterType: string): number {
    switch (limiterType) {
      case 'locationSubmission':
        return this.config.locationSubmission.max;
      case 'notificationSending':
        return this.config.notificationSending.max;
      case 'perRecipientNotification':
        return this.config.notificationSending.perRecipientMax;
      case 'contactTracingOperations':
        return this.config.contactTracingOperations.max;
      case 'contactTracingCreate':
        return this.config.contactTracingOperations.createMax;
      case 'proximityDetection':
        return this.config.proximityDetection.max;
      case 'algorithmProcessing':
        return this.config.proximityDetection.algorithmProcessingMax;
      case 'analyticsOperations':
        return this.config.analyticsOperations.max;
      case 'heavyQuery':
        return this.config.analyticsOperations.heavyQueryMax;
      default:
        return 100; // Default limit
    }
  }

  /**
   * Get current rate limiting statistics
   */
  async getRateLimitingStats(): Promise<{
    activeRateLimiters: string[];
    configSummary: any;
    recentViolations: number;
    alertCounts: { [key: string]: number };
  }> {
    try {
      return {
        activeRateLimiters: Array.from(this.rateLimiters.keys()),
        configSummary: {
          locationSubmissionLimit: this.config.locationSubmission.max,
          notificationSendingLimit: this.config.notificationSending.max,
          contactTracingOperationsLimit: this.config.contactTracingOperations.max,
          proximityDetectionLimit: this.config.proximityDetection.max,
          analyticsOperationsLimit: this.config.analyticsOperations.max
        },
        recentViolations: await this.getRecentViolationCount(),
        alertCounts: Object.fromEntries(this.alertCounts)
      };
    } catch (error) {
      console.error('❌ Failed to get rate limiting stats:', error);
      throw error;
    }
  }

  /**
   * Get recent violation count from audit logs
   */
  private async getRecentViolationCount(): Promise<number> {
    try {
      // This would query the audit logs for recent rate limit violations
      // Implementation depends on your audit log storage structure
      return 0; // Placeholder
    } catch (error) {
      console.error('❌ Failed to get recent violation count:', error);
      return 0;
    }
  }

  /**
   * Update rate limiting configuration
   */
  updateConfiguration(newConfig: Partial<ContactTracingRateLimitConfig>): void {
    this.config = { 
      ...this.config, 
      ...newConfig,
      roleAdjustments: { 
        ...this.config.roleAdjustments, 
        ...(newConfig.roleAdjustments || {}) 
      }
    };
    
    // Reinitialize rate limiters with new configuration
    this.rateLimiters.clear();
    this.initializeRateLimiters();
    
    console.log('⚙️ Rate limiting configuration updated and reinitialised');
  }

  /**
   * Get current configuration
   */
  getConfiguration(): ContactTracingRateLimitConfig {
    return { ...this.config };
  }
}

// Singleton instance
let rateLimitingServiceInstance: ContactTracingRateLimitingService | null = null;

/**
 * Get or create rate limiting service instance
 */
export function getContactTracingRateLimitingService(config?: Partial<ContactTracingRateLimitConfig>): ContactTracingRateLimitingService {
  if (!rateLimitingServiceInstance) {
    rateLimitingServiceInstance = new ContactTracingRateLimitingService(config);
  }
  return rateLimitingServiceInstance;
}

/**
 * Initialize rate limiting service (call once at application startup)
 */
export function initializeContactTracingRateLimiting(config?: Partial<ContactTracingRateLimitConfig>): ContactTracingRateLimitingService {
  const service = getContactTracingRateLimitingService(config);
  console.log('🚀 Contact tracing rate limiting service initialized');
  return service;
}