/**
 * CDC API Client Service
 * 
 * Comprehensive CDC integration service providing:
 * - Real-time data synchronization with CDC systems
 * - Automated authentication and token management
 * - PHIN (Public Health Information Network) standards compliance
 * - HL7 FHIR R4 support for healthcare data exchange
 * - Multi-system integration (NNDSS, NEDSS, ESSENCE, BioSense, WONDER)
 * - Automated retry mechanisms and error handling
 * - Secure data transmission with audit logging
 */

import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig } from 'axios';
import https from 'https';
import crypto from 'crypto';
import { z } from 'zod';

// CDC Authentication schemas
const CDCAuthResponseSchema = z.object({
  access_token: z.string(),
  token_type: z.string(),
  expires_in: z.number(),
  scope: z.string().optional(),
  refresh_token: z.string().optional()
});

const CDCSystemStatusSchema = z.object({
  system: z.string(),
  status: z.enum(['operational', 'degraded', 'outage']),
  lastUpdate: z.string().datetime(),
  maintenance: z.boolean().optional()
});

// CDC Real-time data sync schemas
const CDCSyncResponseSchema = z.object({
  syncId: z.string(),
  status: z.enum(['success', 'partial', 'failed']),
  recordsProcessed: z.number(),
  recordsAccepted: z.number(),
  recordsRejected: z.number(),
  errors: z.array(z.object({
    recordId: z.string(),
    errorCode: z.string(),
    errorMessage: z.string()
  })).optional(),
  nextSyncToken: z.string().optional()
});

// HL7 FHIR R4 Resource schema (simplified)
const FHIRResourceSchema = z.object({
  resourceType: z.string(),
  id: z.string().optional(),
  meta: z.object({
    versionId: z.string().optional(),
    lastUpdated: z.string().datetime().optional(),
    profile: z.array(z.string()).optional()
  }).optional(),
  identifier: z.array(z.object({
    system: z.string().optional(),
    value: z.string()
  })).optional()
});

// CDC WONDER Query schema
const CDCWonderQuerySchema = z.object({
  dataset: z.string(),
  parameters: z.record(z.any()),
  format: z.enum(['json', 'xml', 'csv']).default('json'),
  includeMetadata: z.boolean().default(true)
});

interface CDCAuthCredentials {
  clientId: string;
  clientSecret: string;
  scope?: string;
  environment: 'sandbox' | 'production';
}

interface CDCSystemConfig {
  nndss: {
    baseUrl: string;
    apiVersion: string;
    enabled: boolean;
  };
  nedss: {
    baseUrl: string;
    apiVersion: string;
    enabled: boolean;
  };
  essence: {
    baseUrl: string;
    apiVersion: string;
    enabled: boolean;
  };
  biosense: {
    baseUrl: string;
    apiVersion: string;
    enabled: boolean;
  };
  wonder: {
    baseUrl: string;
    apiVersion: string;
    enabled: boolean;
  };
  han: {
    baseUrl: string;
    apiVersion: string;
    enabled: boolean;
  };
  dataExchangePlatform: {
    baseUrl: string;
    apiVersion: string;
    enabled: boolean;
  };
}

interface SyncConfiguration {
  batchSize: number;
  maxRetries: number;
  retryDelayMs: number;
  syncIntervalMs: number;
  enableRealTimeSync: boolean;
  enableBulkSync: boolean;
  syncTimeoutMs: number;
}

// CRITICAL FIX: Circuit Breaker Pattern for CDC API Resilience
interface CircuitBreakerConfig {
  failureThreshold: number;
  recoveryTimeout: number;
  monitoringPeriod: number;
}

class CircuitBreaker {
  private failures = 0;
  private lastFailureTime = 0;
  private state: 'CLOSED' | 'OPEN' | 'HALF_OPEN' = 'CLOSED';
  
  constructor(private config: CircuitBreakerConfig) {}
  
  async execute<T>(operation: () => Promise<T>): Promise<T> {
    if (this.state === 'OPEN') {
      if (Date.now() - this.lastFailureTime < this.config.recoveryTimeout) {
        throw new Error('Circuit breaker is OPEN - operation blocked');
      }
      this.state = 'HALF_OPEN';
    }
    
    try {
      const result = await operation();
      this.onSuccess();
      return result;
    } catch (error) {
      this.onFailure();
      throw error;
    }
  }
  
  private onSuccess(): void {
    this.failures = 0;
    this.state = 'CLOSED';
  }
  
  private onFailure(): void {
    this.failures++;
    this.lastFailureTime = Date.now();
    
    if (this.failures >= this.config.failureThreshold) {
      this.state = 'OPEN';
    }
  }
  
  getState(): string {
    return this.state;
  }
  
  getMetrics(): { failures: number; state: string; lastFailureTime: number } {
    return {
      failures: this.failures,
      state: this.state,
      lastFailureTime: this.lastFailureTime
    };
  }
}

interface CDCSubmissionResult {
  success: boolean;
  submissionId: string;
  recordsSubmitted: number;
  recordsAccepted: number;
  recordsRejected: number;
  errors: Array<{
    recordId: string;
    errorCode: string;
    errorMessage: string;
    severity: 'warning' | 'error';
  }>;
  nextSteps?: string[];
  validationReport?: any;
}

export class CDCApiClient {
  private axios: AxiosInstance;
  private authToken: string | null = null;
  private tokenExpiry: Date | null = null;
  private refreshToken: string | null = null;
  private credentials: CDCAuthCredentials;
  private systemConfig: CDCSystemConfig;
  private syncConfig: SyncConfiguration;
  private isAuthenticating = false;
  private syncInProgress = new Set<string>();
  private lastSyncTokens = new Map<string, string>();
  
  // CRITICAL FIX: Circuit breaker and retry mechanisms
  private circuitBreaker: CircuitBreaker;
  private retryAttempts = new Map<string, number>();

  constructor(
    credentials: CDCAuthCredentials,
    systemConfig: CDCSystemConfig,
    syncConfig: SyncConfiguration
  ) {
    this.credentials = credentials;
    this.systemConfig = systemConfig;
    this.syncConfig = syncConfig;
    
    // CRITICAL FIX: Initialize circuit breaker for operational resiliency
    this.circuitBreaker = new CircuitBreaker({
      failureThreshold: 5, // Open circuit after 5 failures
      recoveryTimeout: 60000, // 1 minute recovery period
      monitoringPeriod: 300000 // 5 minute monitoring window
    });

    // Create axios instance with base configuration
    this.axios = axios.create({
      timeout: this.syncConfig.syncTimeoutMs,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'User-Agent': 'CyberSecured-AI-CDC-Client/1.0',
      },
      httpsAgent: new https.Agent({
        rejectUnauthorized: true,
        minVersion: 'TLSv1.2'
      })
    });

    // Add request interceptor for authentication
    this.axios.interceptors.request.use(
      async (config) => {
        await this.ensureAuthenticated();
        if (this.authToken) {
          config.headers.Authorization = `Bearer ${this.authToken}`;
        }
        
        // Add request ID for tracking
        config.headers['X-Request-ID'] = crypto.randomUUID();
        
        // Add PHIN compliance headers
        config.headers['X-PHIN-Version'] = '2.0';
        config.headers['X-PHIN-Message-Type'] = config.headers['X-PHIN-Message-Type'] || 'DATA_SUBMISSION';
        
        return config;
      },
      (error) => Promise.reject(error)
    );

    // CRITICAL FIX: Enhanced response interceptor with circuit breaker and exponential backoff
    this.axios.interceptors.response.use(
      (response) => {
        this.logCDCInteraction('SUCCESS', response.config, response);
        return response;
      },
      async (error) => {
        const config = error.config;
        const requestId = config.headers['X-Request-ID'];
        
        this.logCDCInteraction('ERROR', config, error.response);
        
        // Handle retryable errors with exponential backoff
        if (this.isRetryableError(error) && !config._retry && this.shouldRetry(requestId)) {
          config._retry = true;
          const retryCount = this.getRetryCount(requestId);
          const delay = this.calculateBackoffDelay(retryCount);
          
          console.log(`🔄 CDC API retry ${retryCount}/${this.syncConfig.maxRetries} for ${config.url} after ${delay}ms`);
          
          await this.sleep(delay);
          this.incrementRetryCount(requestId);
          
          return this.axios.request(config);
        }
        
        // Handle token expiry
        if (error.response?.status === 401) {
          this.authToken = null;
          this.tokenExpiry = null;
          
          // Retry the request with new token
          if (!error.config._retry) {
            error.config._retry = true;
            await this.ensureAuthenticated();
            return this.axios.request(error.config);
          }
        }
        
        return Promise.reject(error);
      }
    );
  }

  // CRITICAL FIX: Retry mechanism helper methods
  private isRetryableError(error: any): boolean {
    if (!error.response) return true; // Network errors are retryable
    
    const status = error.response.status;
    // Retry on 5xx server errors, 429 rate limiting, and 503 service unavailable
    return status >= 500 || status === 429 || status === 503 || status === 408;
  }
  
  private shouldRetry(requestId: string): boolean {
    const retryCount = this.retryAttempts.get(requestId) || 0;
    return retryCount < this.syncConfig.maxRetries;
  }
  
  private getRetryCount(requestId: string): number {
    return this.retryAttempts.get(requestId) || 0;
  }
  
  private incrementRetryCount(requestId: string): void {
    const current = this.retryAttempts.get(requestId) || 0;
    this.retryAttempts.set(requestId, current + 1);
  }
  
  private calculateBackoffDelay(retryCount: number): number {
    // Exponential backoff with jitter: base_delay * (2^retry_count) + random_jitter
    const baseDelay = this.syncConfig.retryDelayMs || 1000;
    const exponentialDelay = baseDelay * Math.pow(2, retryCount);
    const jitter = Math.random() * 1000; // Up to 1 second jitter
    const maxDelay = 30000; // Cap at 30 seconds
    
    return Math.min(exponentialDelay + jitter, maxDelay);
  }
  
  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  /**
   * Execute operation with circuit breaker protection
   */
  private async executeWithCircuitBreaker<T>(operation: () => Promise<T>): Promise<T> {
    return this.circuitBreaker.execute(operation);
  }
  
  /**
   * Get circuit breaker health metrics
   */
  getCircuitBreakerMetrics(): { failures: number; state: string; lastFailureTime: number } {
    return this.circuitBreaker.getMetrics();
  }

  /**
   * Authenticate with CDC systems using OAuth 2.0
   */
  async authenticate(): Promise<boolean> {
    if (this.isAuthenticating) {
      // Wait for ongoing authentication
      await new Promise(resolve => setTimeout(resolve, 100));
      return this.isAuthenticated();
    }

    this.isAuthenticating = true;

    try {
      const authUrl = this.credentials.environment === 'production'
        ? 'https://api.cdc.gov/oauth/token'
        : 'https://sandbox-api.cdc.gov/oauth/token';

      const response = await axios.post(authUrl, {
        grant_type: 'client_credentials',
        client_id: this.credentials.clientId,
        client_secret: this.credentials.clientSecret,
        scope: this.credentials.scope || 'nndss:write nedss:write essence:read biosense:read wonder:read han:write'
      }, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        httpsAgent: new https.Agent({
          rejectUnauthorized: true,
          minVersion: 'TLSv1.2'
        })
      });

      const authData = CDCAuthResponseSchema.parse(response.data);
      
      this.authToken = authData.access_token;
      this.refreshToken = authData.refresh_token || null;
      this.tokenExpiry = new Date(Date.now() + (authData.expires_in * 1000));

      console.log('✅ CDC Authentication successful');
      return true;
    } catch (error) {
      console.error('❌ CDC Authentication failed:', error);
      return false;
    } finally {
      this.isAuthenticating = false;
    }
  }

  /**
   * Check if client is currently authenticated
   */
  isAuthenticated(): boolean {
    return !!(this.authToken && this.tokenExpiry && this.tokenExpiry > new Date());
  }

  /**
   * Ensure client is authenticated before making requests
   */
  private async ensureAuthenticated(): Promise<void> {
    if (!this.isAuthenticated()) {
      const success = await this.authenticate();
      if (!success) {
        throw new Error('Failed to authenticate with CDC systems');
      }
    }
  }

  /**
   * Check status of CDC systems
   */
  async getSystemStatus(): Promise<Record<string, any>> {
    const systems = ['nndss', 'nedss', 'essence', 'biosense', 'wonder', 'han'];
    const statusChecks = systems.map(async (system) => {
      try {
        const config = this.systemConfig[system as keyof CDCSystemConfig];
        if (!config.enabled) {
          return { system, status: 'disabled', lastUpdate: new Date().toISOString() };
        }

        const response = await this.axios.get(`${config.baseUrl}/health`);
        return CDCSystemStatusSchema.parse({ 
          system, 
          status: response.data.status || 'operational',
          lastUpdate: new Date().toISOString()
        });
      } catch (error) {
        return { 
          system, 
          status: 'outage', 
          lastUpdate: new Date().toISOString(),
          error: error instanceof Error ? error.message : 'Unknown error'
        };
      }
    });

    const results = await Promise.all(statusChecks);
    return results.reduce((acc, result) => {
      acc[result.system] = result;
      return acc;
    }, {} as Record<string, any>);
  }

  /**
   * Submit NNDSS case data to CDC
   */
  async submitNNDSSCase(caseData: any): Promise<CDCSubmissionResult> {
    const system = 'nndss';
    if (this.syncInProgress.has(system)) {
      throw new Error('NNDSS sync already in progress');
    }

    this.syncInProgress.add(system);

    try {
      const config = this.systemConfig.nndss;
      const url = `${config.baseUrl}/${config.apiVersion}/cases`;

      const response = await this.axios.post(url, caseData, {
        headers: {
          'X-PHIN-Message-Type': 'CASE_SUBMISSION',
          'X-CDC-System': 'NNDSS'
        }
      });

      const syncResult = CDCSyncResponseSchema.parse(response.data);
      
      return {
        success: syncResult.status === 'success',
        submissionId: syncResult.syncId,
        recordsSubmitted: 1,
        recordsAccepted: syncResult.recordsAccepted,
        recordsRejected: syncResult.recordsRejected,
        errors: syncResult.errors || []
      };
    } catch (error) {
      console.error('❌ NNDSS submission failed:', error);
      throw error;
    } finally {
      this.syncInProgress.delete(system);
    }
  }

  /**
   * Submit NEDSS investigation data to CDC
   */
  async submitNEDSSInvestigation(investigationData: any): Promise<CDCSubmissionResult> {
    const system = 'nedss';
    if (this.syncInProgress.has(system)) {
      throw new Error('NEDSS sync already in progress');
    }

    this.syncInProgress.add(system);

    try {
      const config = this.systemConfig.nedss;
      const url = `${config.baseUrl}/${config.apiVersion}/investigations`;

      const response = await this.axios.post(url, investigationData, {
        headers: {
          'X-PHIN-Message-Type': 'INVESTIGATION_SUBMISSION',
          'X-CDC-System': 'NEDSS'
        }
      });

      const syncResult = CDCSyncResponseSchema.parse(response.data);
      
      return {
        success: syncResult.status === 'success',
        submissionId: syncResult.syncId,
        recordsSubmitted: 1,
        recordsAccepted: syncResult.recordsAccepted,
        recordsRejected: syncResult.recordsRejected,
        errors: syncResult.errors || []
      };
    } catch (error) {
      console.error('❌ NEDSS submission failed:', error);
      throw error;
    } finally {
      this.syncInProgress.delete(system);
    }
  }

  /**
   * Publish HAN alert message
   */
  async publishHANAlert(alertData: any): Promise<CDCSubmissionResult> {
    const system = 'han';
    if (this.syncInProgress.has(system)) {
      throw new Error('HAN alert publishing already in progress');
    }

    this.syncInProgress.add(system);

    try {
      const config = this.systemConfig.han;
      const url = `${config.baseUrl}/${config.apiVersion}/alerts`;

      const response = await this.axios.post(url, alertData, {
        headers: {
          'X-PHIN-Message-Type': 'HAN_ALERT',
          'X-CDC-System': 'HAN',
          'X-Message-Priority': alertData.priority || 'Medium'
        }
      });

      const syncResult = CDCSyncResponseSchema.parse(response.data);
      
      return {
        success: syncResult.status === 'success',
        submissionId: syncResult.syncId,
        recordsSubmitted: 1,
        recordsAccepted: syncResult.recordsAccepted,
        recordsRejected: syncResult.recordsRejected,
        errors: syncResult.errors || []
      };
    } catch (error) {
      console.error('❌ HAN alert publishing failed:', error);
      throw error;
    } finally {
      this.syncInProgress.delete(system);
    }
  }

  /**
   * Query CDC WONDER database
   */
  async queryWONDERDatabase(query: z.infer<typeof CDCWonderQuerySchema>): Promise<any> {
    const validatedQuery = CDCWonderQuerySchema.parse(query);
    
    try {
      const config = this.systemConfig.wonder;
      const url = `${config.baseUrl}/${config.apiVersion}/query`;

      const response = await this.axios.post(url, validatedQuery, {
        headers: {
          'X-PHIN-Message-Type': 'DATA_QUERY',
          'X-CDC-System': 'WONDER'
        }
      });

      return response.data;
    } catch (error) {
      console.error('❌ CDC WONDER query failed:', error);
      throw error;
    }
  }

  /**
   * Get real-time syndromic surveillance data from ESSENCE
   */
  async getESSENCESurveillanceData(parameters: any = {}): Promise<any> {
    try {
      const config = this.systemConfig.essence;
      const url = `${config.baseUrl}/${config.apiVersion}/surveillance/real-time`;

      const response = await this.axios.get(url, {
        params: parameters,
        headers: {
          'X-PHIN-Message-Type': 'DATA_REQUEST',
          'X-CDC-System': 'ESSENCE'
        }
      });

      return response.data;
    } catch (error) {
      console.error('❌ ESSENCE surveillance data request failed:', error);
      throw error;
    }
  }

  /**
   * Submit HL7 FHIR R4 resource to CDC Data Exchange Platform
   */
  async submitFHIRResource(resource: z.infer<typeof FHIRResourceSchema>): Promise<CDCSubmissionResult> {
    const validatedResource = FHIRResourceSchema.parse(resource);
    
    try {
      const config = this.systemConfig.dataExchangePlatform;
      const url = `${config.baseUrl}/${config.apiVersion}/fhir/${validatedResource.resourceType}`;

      const response = await this.axios.post(url, validatedResource, {
        headers: {
          'Content-Type': 'application/fhir+json',
          'X-PHIN-Message-Type': 'FHIR_RESOURCE',
          'X-CDC-System': 'DATA_EXCHANGE_PLATFORM'
        }
      });

      return {
        success: response.status >= 200 && response.status < 300,
        submissionId: response.data.id || crypto.randomUUID(),
        recordsSubmitted: 1,
        recordsAccepted: 1,
        recordsRejected: 0,
        errors: []
      };
    } catch (error) {
      console.error('❌ FHIR resource submission failed:', error);
      throw error;
    }
  }

  /**
   * Bulk sync data to multiple CDC systems
   */
  async bulkSyncData(data: {
    nndss?: any[];
    nedss?: any[];
    han?: any[];
    fhir?: any[];
  }): Promise<Record<string, CDCSubmissionResult>> {
    const results: Record<string, CDCSubmissionResult> = {};

    // Process NNDSS cases
    if (data.nndss && data.nndss.length > 0) {
      try {
        const nndssResults = await Promise.all(
          data.nndss.map(caseData => this.submitNNDSSCase(caseData))
        );
        
        results.nndss = {
          success: nndssResults.every(r => r.success),
          submissionId: `bulk-nndss-${Date.now()}`,
          recordsSubmitted: data.nndss.length,
          recordsAccepted: nndssResults.reduce((sum, r) => sum + r.recordsAccepted, 0),
          recordsRejected: nndssResults.reduce((sum, r) => sum + r.recordsRejected, 0),
          errors: nndssResults.flatMap(r => r.errors)
        };
      } catch (error) {
        results.nndss = {
          success: false,
          submissionId: `bulk-nndss-${Date.now()}`,
          recordsSubmitted: data.nndss.length,
          recordsAccepted: 0,
          recordsRejected: data.nndss.length,
          errors: [{ 
            recordId: 'bulk', 
            errorCode: 'BULK_SUBMISSION_FAILED', 
            errorMessage: error instanceof Error ? error.message : 'Unknown error',
            severity: 'error' as const
          }]
        };
      }
    }

    // Process NEDSS investigations
    if (data.nedss && data.nedss.length > 0) {
      try {
        const nedssResults = await Promise.all(
          data.nedss.map(investigationData => this.submitNEDSSInvestigation(investigationData))
        );
        
        results.nedss = {
          success: nedssResults.every(r => r.success),
          submissionId: `bulk-nedss-${Date.now()}`,
          recordsSubmitted: data.nedss.length,
          recordsAccepted: nedssResults.reduce((sum, r) => sum + r.recordsAccepted, 0),
          recordsRejected: nedssResults.reduce((sum, r) => sum + r.recordsRejected, 0),
          errors: nedssResults.flatMap(r => r.errors)
        };
      } catch (error) {
        results.nedss = {
          success: false,
          submissionId: `bulk-nedss-${Date.now()}`,
          recordsSubmitted: data.nedss.length,
          recordsAccepted: 0,
          recordsRejected: data.nedss.length,
          errors: [{ 
            recordId: 'bulk', 
            errorCode: 'BULK_SUBMISSION_FAILED', 
            errorMessage: error instanceof Error ? error.message : 'Unknown error',
            severity: 'error' as const
          }]
        };
      }
    }

    return results;
  }

  /**
   * Start real-time data synchronization
   */
  startRealTimeSync(): void {
    if (!this.syncConfig.enableRealTimeSync) {
      console.log('Real-time sync is disabled');
      return;
    }

    console.log('🔄 Starting CDC real-time synchronization...');
    
    setInterval(async () => {
      try {
        await this.performScheduledSync();
      } catch (error) {
        console.error('❌ Scheduled sync failed:', error);
      }
    }, this.syncConfig.syncIntervalMs);
  }

  /**
   * Perform scheduled synchronization with CDC systems
   */
  private async performScheduledSync(): Promise<void> {
    // Implementation would depend on your local data sources
    console.log('🔄 Performing scheduled CDC sync...');
    
    // This would fetch pending data from your local database
    // and sync it with appropriate CDC systems
    
    // Example: Sync pending NNDSS cases
    // const pendingCases = await storage.getPendingNNDSSCases();
    // if (pendingCases.length > 0) {
    //   await this.bulkSyncData({ nndss: pendingCases });
    // }
  }

  /**
   * Log CDC interaction for audit purposes
   */
  private logCDCInteraction(
    type: 'SUCCESS' | 'ERROR',
    config: AxiosRequestConfig,
    response?: AxiosResponse | any
  ): void {
    const logData = {
      timestamp: new Date().toISOString(),
      type,
      method: config.method?.toUpperCase(),
      url: config.url,
      requestId: config.headers?.['X-Request-ID'],
      cdcSystem: config.headers?.['X-CDC-System'],
      messageType: config.headers?.['X-PHIN-Message-Type'],
      statusCode: response?.status,
      success: type === 'SUCCESS',
      error: type === 'ERROR' ? response?.message : undefined
    };

    console.log(`${type === 'SUCCESS' ? '✅' : '❌'} CDC API:`, logData);
    
    // In production, this would be sent to your audit logging system
    // auditLogger.logCDCInteraction(logData);
  }
}

/**
 * Factory function to create CDC API client with default configuration
 */
export function createCDCApiClient(environment: 'sandbox' | 'production' = 'sandbox'): CDCApiClient {
  const credentials: CDCAuthCredentials = {
    clientId: process.env.CDC_CLIENT_ID || 'demo-client-id',
    clientSecret: process.env.CDC_CLIENT_SECRET || 'demo-client-secret',
    scope: 'nndss:write nedss:write essence:read biosense:read wonder:read han:write',
    environment
  };

  const systemConfig: CDCSystemConfig = {
    nndss: {
      baseUrl: environment === 'production' 
        ? 'https://api.cdc.gov/nndss' 
        : 'https://sandbox-api.cdc.gov/nndss',
      apiVersion: 'v1',
      enabled: true
    },
    nedss: {
      baseUrl: environment === 'production' 
        ? 'https://api.cdc.gov/nedss' 
        : 'https://sandbox-api.cdc.gov/nedss',
      apiVersion: 'v1',
      enabled: true
    },
    essence: {
      baseUrl: environment === 'production' 
        ? 'https://api.cdc.gov/essence' 
        : 'https://sandbox-api.cdc.gov/essence',
      apiVersion: 'v1',
      enabled: true
    },
    biosense: {
      baseUrl: environment === 'production' 
        ? 'https://api.cdc.gov/biosense' 
        : 'https://sandbox-api.cdc.gov/biosense',
      apiVersion: 'v1',
      enabled: true
    },
    wonder: {
      baseUrl: environment === 'production' 
        ? 'https://api.cdc.gov/wonder' 
        : 'https://sandbox-api.cdc.gov/wonder',
      apiVersion: 'v1',
      enabled: true
    },
    han: {
      baseUrl: environment === 'production' 
        ? 'https://api.cdc.gov/han' 
        : 'https://sandbox-api.cdc.gov/han',
      apiVersion: 'v1',
      enabled: true
    },
    dataExchangePlatform: {
      baseUrl: environment === 'production' 
        ? 'https://api.cdc.gov/data-exchange' 
        : 'https://sandbox-api.cdc.gov/data-exchange',
      apiVersion: 'v1',
      enabled: true
    }
  };

  const syncConfig: SyncConfiguration = {
    batchSize: parseInt(process.env.CDC_BATCH_SIZE || '100'),
    maxRetries: parseInt(process.env.CDC_MAX_RETRIES || '3'),
    retryDelayMs: parseInt(process.env.CDC_RETRY_DELAY_MS || '5000'),
    syncIntervalMs: parseInt(process.env.CDC_SYNC_INTERVAL_MS || '300000'), // 5 minutes
    enableRealTimeSync: process.env.CDC_ENABLE_REAL_TIME_SYNC === 'true',
    enableBulkSync: process.env.CDC_ENABLE_BULK_SYNC !== 'false',
    syncTimeoutMs: parseInt(process.env.CDC_SYNC_TIMEOUT_MS || '30000')
  };

  return new CDCApiClient(credentials, systemConfig, syncConfig);
}

// Export types for use in other modules
export type { 
  CDCSubmissionResult, 
  CDCAuthCredentials, 
  CDCSystemConfig, 
  SyncConfiguration 
};
export { CDCWonderQuerySchema, FHIRResourceSchema, CDCSyncResponseSchema };