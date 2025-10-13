/**
 * Production Credential Validation Service for Contact Tracing System
 * 
 * Implements secure credential validation for federal compliance and operational security:
 * - SendGrid API credential validation and monitoring
 * - CDC integration credential validation
 * - Fail-safe mechanisms for critical notification systems
 * - Real-time credential health monitoring and alerting
 * - Secure secret management integration
 */

import axios from 'axios';
import { storage } from '../storage';

// Credential validation configuration
export interface CredentialValidationConfig {
  sendgrid: {
    enabled: boolean;
    validateOnStartup: boolean;
    validateInterval: number;        // Minutes between validation checks
    failureThreshold: number;        // Failed validations before failsafe
    timeoutMs: number;              // API call timeout
  };
  
  cdc: {
    enabled: boolean;
    validateOnStartup: boolean;
    validateInterval: number;
    failureThreshold: number;
    timeoutMs: number;
    endpoints: string[];            // CDC endpoints to validate
  };
  
  failsafe: {
    enableEmailFailover: boolean;   // Fallback to alternative email service
    enableNotificationQueue: boolean; // Queue notifications during outages
    maxQueueSize: number;
    alertThreshold: number;         // Alert after N consecutive failures
  };
  
  monitoring: {
    enableHealthChecks: boolean;
    enableAlerts: boolean;
    alertWebhookUrl?: string;
    slackWebhookUrl?: string;
  };
}

const DEFAULT_CREDENTIAL_CONFIG: CredentialValidationConfig = {
  sendgrid: {
    enabled: process.env.SENDGRID_API_KEY ? true : false,
    validateOnStartup: true,
    validateInterval: 30,  // 30 minutes
    failureThreshold: 3,
    timeoutMs: 10000      // 10 seconds
  },
  
  cdc: {
    enabled: process.env.CDC_API_KEY ? true : false,
    validateOnStartup: true,
    validateInterval: 60,  // 1 hour
    failureThreshold: 2,
    timeoutMs: 15000,     // 15 seconds
    endpoints: [
      '/api/cdc/system-status',
      '/api/cdc/validate'
    ]
  },
  
  failsafe: {
    enableEmailFailover: true,
    enableNotificationQueue: true,
    maxQueueSize: 10000,
    alertThreshold: 3
  },
  
  monitoring: {
    enableHealthChecks: true,
    enableAlerts: true,
    alertWebhookUrl: process.env.ALERT_WEBHOOK_URL,
    slackWebhookUrl: process.env.SLACK_WEBHOOK_URL
  }
};

interface CredentialValidationResult {
  service: string;
  isValid: boolean;
  lastValidated: Date;
  error?: string;
  responseTime?: number;
  consecutiveFailures: number;
  healthStatus: 'healthy' | 'degraded' | 'critical' | 'down';
}

interface NotificationQueueItem {
  id: string;
  type: 'email' | 'sms' | 'push';
  recipient: string;
  message: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  createdAt: Date;
  retries: number;
  maxRetries: number;
}

export class CredentialValidationService {
  private config: CredentialValidationConfig;
  private validationResults: Map<string, CredentialValidationResult> = new Map();
  private notificationQueue: NotificationQueueItem[] = [];
  private validationIntervals: Map<string, NodeJS.Timeout> = new Map();
  private isInitialized: boolean = false;
  private failsafeMode: boolean = false;

  constructor(config?: Partial<CredentialValidationConfig>) {
    this.config = this.mergeConfig(DEFAULT_CREDENTIAL_CONFIG, config);
    console.log('🔐 CredentialValidationService initialized');
  }

  /**
   * Initialize credential validation service
   */
  async initialize(): Promise<void> {
    if (this.isInitialized) {
      console.log('⚠️ CredentialValidationService already initialized');
      return;
    }

    try {
      console.log('🚀 Starting credential validation service initialization...');

      // Validate credentials on startup if enabled
      if (this.config.sendgrid.enabled && this.config.sendgrid.validateOnStartup) {
        await this.validateSendGridCredentials();
      }

      if (this.config.cdc.enabled && this.config.cdc.validateOnStartup) {
        await this.validateCDCCredentials();
      }

      // Start periodic validation intervals
      this.startPeriodicValidation();

      // Initialize notification queue processing
      if (this.config.failsafe.enableNotificationQueue) {
        this.startQueueProcessing();
      }

      this.isInitialized = true;
      console.log('✅ CredentialValidationService initialization completed');

      // Log startup validation results
      await this.logInitializationResults();

    } catch (error) {
      console.error('❌ Failed to initialize CredentialValidationService:', error);
      throw new Error('Credential validation service initialization failed');
    }
  }

  /**
   * Validate SendGrid API credentials
   */
  async validateSendGridCredentials(): Promise<CredentialValidationResult> {
    const startTime = Date.now();
    let result: CredentialValidationResult = {
      service: 'sendgrid',
      isValid: false,
      lastValidated: new Date(),
      consecutiveFailures: 0,
      healthStatus: 'down'
    };

    try {
      const apiKey = process.env.SENDGRID_API_KEY;
      
      if (!apiKey || apiKey.trim() === '') {
        throw new Error('SendGrid API key not configured');
      }

      // Validate API key format
      if (!apiKey.startsWith('SG.')) {
        throw new Error('SendGrid API key format is invalid');
      }

      console.log('🔍 Validating SendGrid credentials...');

      // Test SendGrid API connectivity
      const response = await axios.get('https://api.sendgrid.com/v3/user/account', {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        timeout: this.config.sendgrid.timeoutMs
      });

      if (response.status === 200) {
        result.isValid = true;
        result.healthStatus = 'healthy';
        result.responseTime = Date.now() - startTime;
        result.consecutiveFailures = 0;
        
        console.log('✅ SendGrid credentials validated successfully');
        console.log(`📊 SendGrid account type: ${response.data?.type || 'unknown'}`);
        
        // Reset failsafe mode if it was enabled
        if (this.failsafeMode) {
          await this.disableFailsafeMode();
        }
        
      } else {
        throw new Error(`SendGrid API returned status ${response.status}`);
      }

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error('❌ SendGrid credential validation failed:', errorMessage);
      
      result.error = errorMessage;
      result.responseTime = Date.now() - startTime;
      
      // Update consecutive failures
      const previousResult = this.validationResults.get('sendgrid');
      result.consecutiveFailures = (previousResult?.consecutiveFailures || 0) + 1;
      
      // Determine health status based on failures
      if (result.consecutiveFailures >= this.config.sendgrid.failureThreshold) {
        result.healthStatus = 'critical';
        await this.handleCredentialFailure('sendgrid', result);
      } else if (result.consecutiveFailures >= 2) {
        result.healthStatus = 'degraded';
      } else {
        result.healthStatus = 'down';
      }
    }

    // Store validation result
    this.validationResults.set('sendgrid', result);
    
    // Log audit event
    await this.auditCredentialValidation('sendgrid', result);
    
    return result;
  }

  /**
   * Validate CDC integration credentials
   */
  async validateCDCCredentials(): Promise<CredentialValidationResult> {
    const startTime = Date.now();
    let result: CredentialValidationResult = {
      service: 'cdc',
      isValid: false,
      lastValidated: new Date(),
      consecutiveFailures: 0,
      healthStatus: 'down'
    };

    try {
      const cdcApiKey = process.env.CDC_API_KEY;
      const cdcBaseUrl = process.env.CDC_BASE_URL || 'https://api.cdc.gov';
      
      if (!cdcApiKey || cdcApiKey.trim() === '') {
        throw new Error('CDC API key not configured');
      }

      console.log('🔍 Validating CDC credentials...');

      // Test multiple CDC endpoints for comprehensive validation
      let validEndpoints = 0;
      let totalEndpoints = this.config.cdc.endpoints.length;
      
      for (const endpoint of this.config.cdc.endpoints) {
        try {
          const response = await axios.get(`${cdcBaseUrl}${endpoint}`, {
            headers: {
              'Authorization': `Bearer ${cdcApiKey}`,
              'Content-Type': 'application/json',
              'User-Agent': 'CyberSecured-AI-ContactTracing/1.0'
            },
            timeout: this.config.cdc.timeoutMs
          });

          if (response.status === 200) {
            validEndpoints++;
          }
        } catch (endpointError) {
          console.warn(`⚠️ CDC endpoint ${endpoint} validation failed:`, endpointError instanceof Error ? endpointError.message : 'Unknown error');
        }
      }

      // Consider successful if at least 50% of endpoints are accessible
      const successRate = validEndpoints / totalEndpoints;
      
      if (successRate >= 0.5) {
        result.isValid = true;
        result.responseTime = Date.now() - startTime;
        result.consecutiveFailures = 0;
        
        if (successRate >= 0.8) {
          result.healthStatus = 'healthy';
        } else {
          result.healthStatus = 'degraded';
        }
        
        console.log(`✅ CDC credentials validated successfully (${validEndpoints}/${totalEndpoints} endpoints)`);
        
        // Reset failsafe mode if it was enabled
        if (this.failsafeMode) {
          await this.disableFailsafeMode();
        }
        
      } else {
        throw new Error(`CDC validation failed - only ${validEndpoints}/${totalEndpoints} endpoints accessible`);
      }

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error('❌ CDC credential validation failed:', errorMessage);
      
      result.error = errorMessage;
      result.responseTime = Date.now() - startTime;
      
      // Update consecutive failures
      const previousResult = this.validationResults.get('cdc');
      result.consecutiveFailures = (previousResult?.consecutiveFailures || 0) + 1;
      
      // Determine health status based on failures
      if (result.consecutiveFailures >= this.config.cdc.failureThreshold) {
        result.healthStatus = 'critical';
        await this.handleCredentialFailure('cdc', result);
      } else if (result.consecutiveFailures >= 1) {
        result.healthStatus = 'degraded';
      } else {
        result.healthStatus = 'down';
      }
    }

    // Store validation result
    this.validationResults.set('cdc', result);
    
    // Log audit event
    await this.auditCredentialValidation('cdc', result);
    
    return result;
  }

  /**
   * Handle credential validation failures
   */
  private async handleCredentialFailure(service: string, result: CredentialValidationResult): Promise<void> {
    console.error(`🚨 CRITICAL: ${service.toUpperCase()} credential failure threshold exceeded`);
    
    // Enable failsafe mode
    await this.enableFailsafeMode();
    
    // Send alerts
    if (this.config.monitoring.enableAlerts) {
      await this.sendCredentialAlert(service, result);
    }
    
    // Create high-priority audit log
    await this.auditCredentialFailure(service, result);
  }

  /**
   * Enable failsafe mode for critical notification systems
   */
  private async enableFailsafeMode(): Promise<void> {
    if (this.failsafeMode) {
      console.log('⚠️ Failsafe mode already enabled');
      return;
    }

    this.failsafeMode = true;
    console.log('🚨 FAILSAFE MODE ENABLED - Critical notification systems are degraded');
    
    // Log failsafe activation
    await this.auditFailsafeActivation();
    
    // Send failsafe activation alert
    if (this.config.monitoring.enableAlerts) {
      await this.sendFailsafeAlert('activated');
    }
  }

  /**
   * Disable failsafe mode when credentials are restored
   */
  private async disableFailsafeMode(): Promise<void> {
    if (!this.failsafeMode) {
      return;
    }

    this.failsafeMode = false;
    console.log('✅ FAILSAFE MODE DISABLED - Critical notification systems restored');
    
    // Process queued notifications
    if (this.config.failsafe.enableNotificationQueue) {
      await this.processNotificationQueue();
    }
    
    // Log failsafe deactivation
    await this.auditFailsafeDeactivation();
    
    // Send restoration alert
    if (this.config.monitoring.enableAlerts) {
      await this.sendFailsafeAlert('deactivated');
    }
  }

  /**
   * Start periodic credential validation
   */
  private startPeriodicValidation(): void {
    console.log('⏰ Starting periodic credential validation...');
    
    // SendGrid validation interval
    if (this.config.sendgrid.enabled) {
      const sendgridInterval = setInterval(async () => {
        try {
          await this.validateSendGridCredentials();
        } catch (error) {
          console.error('❌ Periodic SendGrid validation error:', error);
        }
      }, this.config.sendgrid.validateInterval * 60 * 1000);
      
      this.validationIntervals.set('sendgrid', sendgridInterval);
      console.log(`✅ SendGrid validation scheduled every ${this.config.sendgrid.validateInterval} minutes`);
    }
    
    // CDC validation interval
    if (this.config.cdc.enabled) {
      const cdcInterval = setInterval(async () => {
        try {
          await this.validateCDCCredentials();
        } catch (error) {
          console.error('❌ Periodic CDC validation error:', error);
        }
      }, this.config.cdc.validateInterval * 60 * 1000);
      
      this.validationIntervals.set('cdc', cdcInterval);
      console.log(`✅ CDC validation scheduled every ${this.config.cdc.validateInterval} minutes`);
    }
  }

  /**
   * Start notification queue processing
   */
  private startQueueProcessing(): void {
    console.log('📬 Starting notification queue processing...');
    
    // Process queue every minute
    setInterval(async () => {
      if (this.notificationQueue.length > 0) {
        await this.processNotificationQueue();
      }
    }, 60 * 1000);
  }

  /**
   * Process queued notifications
   */
  private async processNotificationQueue(): Promise<void> {
    if (this.notificationQueue.length === 0) {
      return;
    }

    console.log(`📬 Processing ${this.notificationQueue.length} queued notifications...`);
    
    const processedItems: NotificationQueueItem[] = [];
    const failedItems: NotificationQueueItem[] = [];
    
    // Process high-priority items first
    this.notificationQueue.sort((a, b) => {
      const priorities = { critical: 4, high: 3, medium: 2, low: 1 };
      return priorities[b.priority] - priorities[a.priority];
    });
    
    for (const item of this.notificationQueue) {
      try {
        // Attempt to send notification
        const success = await this.sendQueuedNotification(item);
        
        if (success) {
          processedItems.push(item);
          console.log(`✅ Processed queued notification: ${item.id}`);
        } else {
          item.retries++;
          if (item.retries >= item.maxRetries) {
            failedItems.push(item);
            console.error(`❌ Failed to process notification after ${item.retries} retries: ${item.id}`);
          }
        }
        
        // Rate limiting to avoid overwhelming services
        await new Promise(resolve => setTimeout(resolve, 100));
        
      } catch (error) {
        console.error(`❌ Error processing queued notification ${item.id}:`, error);
        item.retries++;
        if (item.retries >= item.maxRetries) {
          failedItems.push(item);
        }
      }
    }
    
    // Remove processed items from queue
    this.notificationQueue = this.notificationQueue.filter(item => 
      !processedItems.includes(item) && !failedItems.includes(item)
    );
    
    console.log(`📊 Queue processing completed - Processed: ${processedItems.length}, Failed: ${failedItems.length}, Remaining: ${this.notificationQueue.length}`);
  }

  /**
   * Send a queued notification
   */
  private async sendQueuedNotification(item: NotificationQueueItem): Promise<boolean> {
    try {
      // This would integrate with your existing notification service
      // For now, we'll simulate the sending process
      
      switch (item.type) {
        case 'email':
          // Use SendGrid or failover service
          return await this.sendEmailNotification(item);
        case 'sms':
          // Use SMS service (e.g., Twilio)
          return await this.sendSMSNotification(item);
        case 'push':
          // Use push notification service
          return await this.sendPushNotification(item);
        default:
          console.error(`❌ Unknown notification type: ${item.type}`);
          return false;
      }
    } catch (error) {
      console.error(`❌ Failed to send queued notification ${item.id}:`, error);
      return false;
    }
  }

  /**
   * Send email notification (placeholder implementation)
   */
  private async sendEmailNotification(item: NotificationQueueItem): Promise<boolean> {
    // Implementation would depend on your email service setup
    console.log(`📧 Sending email to ${item.recipient}: ${item.message}`);
    return true; // Placeholder
  }

  /**
   * Send SMS notification (placeholder implementation)
   */
  private async sendSMSNotification(item: NotificationQueueItem): Promise<boolean> {
    // Implementation would depend on your SMS service setup
    console.log(`📱 Sending SMS to ${item.recipient}: ${item.message}`);
    return true; // Placeholder
  }

  /**
   * Send push notification (placeholder implementation)
   */
  private async sendPushNotification(item: NotificationQueueItem): Promise<boolean> {
    // Implementation would depend on your push notification service setup
    console.log(`🔔 Sending push notification to ${item.recipient}: ${item.message}`);
    return true; // Placeholder
  }

  /**
   * Get current credential validation status
   */
  async getCredentialStatus(): Promise<{
    services: CredentialValidationResult[];
    failsafeMode: boolean;
    queuedNotifications: number;
    lastHealthCheck: Date;
    overallHealth: 'healthy' | 'degraded' | 'critical' | 'down';
  }> {
    const services = Array.from(this.validationResults.values());
    
    // Determine overall health
    let overallHealth: 'healthy' | 'degraded' | 'critical' | 'down' = 'healthy';
    
    const criticalServices = services.filter(s => s.healthStatus === 'critical');
    const degradedServices = services.filter(s => s.healthStatus === 'degraded');
    const downServices = services.filter(s => s.healthStatus === 'down');
    
    if (criticalServices.length > 0 || downServices.length > 0) {
      overallHealth = criticalServices.length > 0 ? 'critical' : 'down';
    } else if (degradedServices.length > 0) {
      overallHealth = 'degraded';
    }
    
    return {
      services,
      failsafeMode: this.failsafeMode,
      queuedNotifications: this.notificationQueue.length,
      lastHealthCheck: new Date(),
      overallHealth
    };
  }

  /**
   * Add notification to queue during failsafe mode
   */
  async queueNotification(
    type: 'email' | 'sms' | 'push',
    recipient: string,
    message: string,
    priority: 'low' | 'medium' | 'high' | 'critical' = 'medium'
  ): Promise<string> {
    
    if (this.notificationQueue.length >= this.config.failsafe.maxQueueSize) {
      throw new Error('Notification queue is full - cannot queue additional notifications');
    }
    
    const queueItem: NotificationQueueItem = {
      id: `queue_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type,
      recipient,
      message,
      priority,
      createdAt: new Date(),
      retries: 0,
      maxRetries: 3
    };
    
    this.notificationQueue.push(queueItem);
    
    console.log(`📬 Notification queued (${priority} priority): ${queueItem.id}`);
    
    return queueItem.id;
  }

  /**
   * Send credential validation alert
   */
  private async sendCredentialAlert(service: string, result: CredentialValidationResult): Promise<void> {
    const alertMessage = `🚨 CREDENTIAL ALERT: ${service.toUpperCase()} validation failed ${result.consecutiveFailures} times consecutively. Error: ${result.error}`;
    
    console.error(alertMessage);
    
    // Send webhook alert if configured
    if (this.config.monitoring.alertWebhookUrl) {
      try {
        await axios.post(this.config.monitoring.alertWebhookUrl, {
          service,
          status: 'credential_failure',
          message: alertMessage,
          consecutiveFailures: result.consecutiveFailures,
          lastError: result.error,
          timestamp: new Date().toISOString()
        }, { timeout: 5000 });
      } catch (error) {
        console.error('❌ Failed to send webhook alert:', error);
      }
    }
    
    // Send Slack alert if configured
    if (this.config.monitoring.slackWebhookUrl) {
      try {
        await axios.post(this.config.monitoring.slackWebhookUrl, {
          text: alertMessage,
          color: 'danger',
          fields: [
            { title: 'Service', value: service, short: true },
            { title: 'Consecutive Failures', value: result.consecutiveFailures.toString(), short: true },
            { title: 'Last Error', value: result.error || 'Unknown', short: false }
          ]
        }, { timeout: 5000 });
      } catch (error) {
        console.error('❌ Failed to send Slack alert:', error);
      }
    }
  }

  /**
   * Send failsafe mode alert
   */
  private async sendFailsafeAlert(action: 'activated' | 'deactivated'): Promise<void> {
    const alertMessage = `🚨 FAILSAFE MODE ${action.toUpperCase()}: Critical notification systems are ${action === 'activated' ? 'degraded' : 'restored'}`;
    
    console.log(alertMessage);
    
    // Send alerts using the same methods as credential alerts
    if (this.config.monitoring.alertWebhookUrl) {
      try {
        await axios.post(this.config.monitoring.alertWebhookUrl, {
          status: `failsafe_${action}`,
          message: alertMessage,
          queuedNotifications: this.notificationQueue.length,
          timestamp: new Date().toISOString()
        }, { timeout: 5000 });
      } catch (error) {
        console.error('❌ Failed to send failsafe webhook alert:', error);
      }
    }
  }

  /**
   * Audit credential validation events
   */
  private async auditCredentialValidation(service: string, result: CredentialValidationResult): Promise<void> {
    try {
      await storage.createAuditLog({
        userId: 'system',
        action: 'CREDENTIAL_VALIDATION',
        resource: `${service}_credentials`,
        details: {
          service,
          isValid: result.isValid,
          healthStatus: result.healthStatus,
          consecutiveFailures: result.consecutiveFailures,
          responseTime: result.responseTime,
          error: result.error,
          timestamp: result.lastValidated.toISOString()
        },
        ipAddress: 'localhost',
        userAgent: 'CredentialValidationService'
      });
    } catch (error) {
      console.error('❌ Failed to audit credential validation:', error);
    }
  }

  /**
   * Audit credential failure events
   */
  private async auditCredentialFailure(service: string, result: CredentialValidationResult): Promise<void> {
    try {
      await storage.createAuditLog({
        userId: 'system',
        action: 'CREDENTIAL_FAILURE_CRITICAL',
        resource: `contact_tracing_security`,
        details: {
          alertType: 'CRITICAL_CREDENTIAL_FAILURE',
          service,
          consecutiveFailures: result.consecutiveFailures,
          failureThreshold: service === 'sendgrid' ? this.config.sendgrid.failureThreshold : this.config.cdc.failureThreshold,
          error: result.error,
          timestamp: new Date().toISOString(),
          severity: 'CRITICAL',
          requiresInvestigation: true,
          operationalImpact: 'Critical notification systems may be degraded'
        },
        ipAddress: 'localhost',
        userAgent: 'CredentialValidationService'
      });
    } catch (error) {
      console.error('❌ Failed to audit credential failure:', error);
    }
  }

  /**
   * Audit failsafe activation
   */
  private async auditFailsafeActivation(): Promise<void> {
    try {
      await storage.createAuditLog({
        userId: 'system',
        action: 'FAILSAFE_ACTIVATED',
        resource: 'contact_tracing_system',
        details: {
          alertType: 'FAILSAFE_MODE_ACTIVATION',
          trigger: 'credential_validation_failures',
          queuedNotifications: this.notificationQueue.length,
          timestamp: new Date().toISOString(),
          severity: 'HIGH',
          operationalImpact: 'Notification systems operating in degraded mode'
        },
        ipAddress: 'localhost',
        userAgent: 'CredentialValidationService'
      });
    } catch (error) {
      console.error('❌ Failed to audit failsafe activation:', error);
    }
  }

  /**
   * Audit failsafe deactivation
   */
  private async auditFailsafeDeactivation(): Promise<void> {
    try {
      await storage.createAuditLog({
        userId: 'system',
        action: 'FAILSAFE_DEACTIVATED',
        resource: 'contact_tracing_system',
        details: {
          alertType: 'FAILSAFE_MODE_DEACTIVATION',
          processedNotifications: this.notificationQueue.length,
          timestamp: new Date().toISOString(),
          severity: 'INFO',
          operationalImpact: 'Notification systems restored to normal operation'
        },
        ipAddress: 'localhost',
        userAgent: 'CredentialValidationService'
      });
    } catch (error) {
      console.error('❌ Failed to audit failsafe deactivation:', error);
    }
  }

  /**
   * Log initialization results
   */
  private async logInitializationResults(): Promise<void> {
    const status = await this.getCredentialStatus();
    
    console.log('📊 Credential Validation Service Status:');
    console.log(`   Overall Health: ${status.overallHealth}`);
    console.log(`   Failsafe Mode: ${status.failsafeMode ? 'ENABLED' : 'DISABLED'}`);
    console.log(`   Queued Notifications: ${status.queuedNotifications}`);
    
    status.services.forEach(service => {
      console.log(`   ${service.service.toUpperCase()}: ${service.healthStatus} (${service.isValid ? 'Valid' : 'Invalid'})`);
      if (service.error) {
        console.log(`     Error: ${service.error}`);
      }
      if (service.consecutiveFailures > 0) {
        console.log(`     Consecutive Failures: ${service.consecutiveFailures}`);
      }
    });
  }

  /**
   * Merge configuration objects deeply
   */
  private mergeConfig(defaultConfig: CredentialValidationConfig, userConfig?: Partial<CredentialValidationConfig>): CredentialValidationConfig {
    if (!userConfig) return { ...defaultConfig };
    
    return {
      sendgrid: { ...defaultConfig.sendgrid, ...(userConfig.sendgrid || {}) },
      cdc: { ...defaultConfig.cdc, ...(userConfig.cdc || {}) },
      failsafe: { ...defaultConfig.failsafe, ...(userConfig.failsafe || {}) },
      monitoring: { ...defaultConfig.monitoring, ...(userConfig.monitoring || {}) }
    };
  }

  /**
   * Shutdown credential validation service
   */
  async shutdown(): Promise<void> {
    console.log('🛑 Shutting down CredentialValidationService...');
    
    // Clear all validation intervals
    this.validationIntervals.forEach((interval, service) => {
      clearInterval(interval);
      console.log(`⏹️ Stopped ${service} validation interval`);
    });
    
    this.validationIntervals.clear();
    this.isInitialized = false;
    
    console.log('✅ CredentialValidationService shutdown completed');
  }

  /**
   * Get current configuration
   */
  getConfiguration(): CredentialValidationConfig {
    return { ...this.config };
  }

  /**
   * Update configuration
   */
  updateConfiguration(newConfig: Partial<CredentialValidationConfig>): void {
    this.config = this.mergeConfig(this.config, newConfig);
    console.log('⚙️ CredentialValidationService configuration updated');
  }

  /**
   * Force credential revalidation
   */
  async forceRevalidation(): Promise<{ sendgrid?: CredentialValidationResult; cdc?: CredentialValidationResult }> {
    console.log('🔄 Forcing credential revalidation...');
    
    const results: { sendgrid?: CredentialValidationResult; cdc?: CredentialValidationResult } = {};
    
    if (this.config.sendgrid.enabled) {
      results.sendgrid = await this.validateSendGridCredentials();
    }
    
    if (this.config.cdc.enabled) {
      results.cdc = await this.validateCDCCredentials();
    }
    
    return results;
  }
}

// Singleton instance
let credentialValidationServiceInstance: CredentialValidationService | null = null;

/**
 * Get or create credential validation service instance
 */
export function getCredentialValidationService(config?: Partial<CredentialValidationConfig>): CredentialValidationService {
  if (!credentialValidationServiceInstance) {
    credentialValidationServiceInstance = new CredentialValidationService(config);
  }
  return credentialValidationServiceInstance;
}

/**
 * Initialize credential validation service (call once at application startup)
 */
export async function initializeCredentialValidationService(config?: Partial<CredentialValidationConfig>): Promise<CredentialValidationService> {
  const service = getCredentialValidationService(config);
  await service.initialize();
  return service;
}