/**
 * TheHive API Integration Engine
 * Provides real-time case management, alerts, and observables from TheHive platform
 * Enhances incident response capabilities with live threat intelligence feeds
 */

import axios, { AxiosInstance } from 'axios';

interface TheHiveConfig {
  baseUrl: string;
  apiKey: string;
  organization?: string;
}

interface TheHiveCase {
  _id: string;
  title: string;
  description: string;
  severity: number;
  tlp: number;
  status: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  owner?: string;
  customFields?: Record<string, any>;
}

interface TheHiveAlert {
  _id: string;
  title: string;
  description: string;
  severity: number;
  tlp: number;
  status: string;
  tags: string[];
  type: string;
  source: string;
  sourceRef: string;
  createdAt: string;
  updatedAt: string;
  observables?: TheHiveObservable[];
}

interface TheHiveObservable {
  _id: string;
  dataType: string;
  data: string;
  message?: string;
  tlp: number;
  ioc: boolean;
  sighted: boolean;
  tags: string[];
  createdAt: string;
  reports?: Record<string, any>;
}

interface TheHiveQueryRequest {
  query: Array<{
    _name: string;
    [key: string]: any;
  }>;
  excludeFields?: string[];
}

export class TheHiveIntegration {
  private client: AxiosInstance;
  private config: TheHiveConfig;
  private isInitialized = false;

  constructor() {
    // Initialize with environment variables or fallback configuration
    this.config = {
      baseUrl: process.env.THEHIVE_URL || 'http://localhost:9000',
      apiKey: process.env.THEHIVE_API_KEY || '',
      organization: process.env.THEHIVE_ORG || undefined
    };

    this.client = axios.create({
      baseURL: `${this.config.baseUrl}/api/v1`,
      timeout: 30000,
      headers: {
        'Authorization': `Bearer ${this.config.apiKey}`,
        'Content-Type': 'application/json',
        ...(this.config.organization && { 'X-Organisation': this.config.organization })
      }
    });

    // Add response interceptor for error handling
    this.client.interceptors.response.use(
      response => response,
      error => {
        console.error('TheHive API Error:', error.response?.data || error.message);
        return Promise.reject(error);
      }
    );
  }

  async initialize(): Promise<boolean> {
    try {
      if (!this.config.apiKey) {
        console.log('🔧 TheHive API key not configured, using demo data');
        this.isInitialized = false;
        return false;
      }

      // Test connectivity
      const response = await this.client.get('/status');
      console.log('✅ TheHive Integration initialized successfully');
      console.log(`🔗 Connected to TheHive v${response.data.versions?.TheHive || 'unknown'}`);
      
      this.isInitialized = true;
      return true;
    } catch (error) {
      console.error('❌ Failed to initialize TheHive integration:', error);
      this.isInitialized = false;
      return false;
    }
  }

  private async query(queryRequest: TheHiveQueryRequest): Promise<any[]> {
    if (!this.isInitialized) {
      return this.getDemoData(queryRequest);
    }

    try {
      const response = await this.client.post('/query', queryRequest);
      return response.data || [];
    } catch (error) {
      console.error('TheHive query failed:', error);
      return this.getDemoData(queryRequest);
    }
  }

  async getRecentCases(limit: number = 20): Promise<TheHiveCase[]> {
    const queryRequest: TheHiveQueryRequest = {
      query: [
        { _name: 'listCase' },
        { 
          _name: 'sort',
          _fields: [{ '_updatedAt': 'desc' }]
        },
        {
          _name: 'page',
          from: 0,
          to: limit
        }
      ]
    };

    return this.query(queryRequest);
  }

  async getActiveAlerts(limit: number = 50): Promise<TheHiveAlert[]> {
    const queryRequest: TheHiveQueryRequest = {
      query: [
        { _name: 'listAlert' },
        {
          _name: 'filter',
          _ne: {
            _field: 'status',
            _value: 'Ignored'
          }
        },
        { 
          _name: 'sort',
          _fields: [{ '_updatedAt': 'desc' }]
        },
        {
          _name: 'page',
          from: 0,
          to: limit
        }
      ]
    };

    return this.query(queryRequest);
  }

  async getCriticalCases(): Promise<TheHiveCase[]> {
    const queryRequest: TheHiveQueryRequest = {
      query: [
        { _name: 'listCase' },
        {
          _name: 'filter',
          _gte: {
            _field: 'severity',
            _value: 3
          }
        },
        {
          _name: 'filter',
          _ne: {
            _field: 'status',
            _value: 'Resolved'
          }
        },
        { 
          _name: 'sort',
          _fields: [{ 'severity': 'desc' }, { '_updatedAt': 'desc' }]
        }
      ]
    };

    return this.query(queryRequest);
  }

  async getObservablesByCase(caseId: string): Promise<TheHiveObservable[]> {
    const queryRequest: TheHiveQueryRequest = {
      query: [
        { _name: 'getCase', idOrName: caseId },
        { _name: 'observables' }
      ]
    };

    return this.query(queryRequest);
  }

  async getRecentObservables(limit: number = 100): Promise<TheHiveObservable[]> {
    const queryRequest: TheHiveQueryRequest = {
      query: [
        { _name: 'listObservable' },
        { 
          _name: 'sort',
          _fields: [{ '_updatedAt': 'desc' }]
        },
        {
          _name: 'page',
          from: 0,
          to: limit
        }
      ]
    };

    return this.query(queryRequest);
  }

  async getIOCs(): Promise<TheHiveObservable[]> {
    const queryRequest: TheHiveQueryRequest = {
      query: [
        { _name: 'listObservable' },
        {
          _name: 'filter',
          _eq: {
            _field: 'ioc',
            _value: true
          }
        },
        { 
          _name: 'sort',
          _fields: [{ '_updatedAt': 'desc' }]
        }
      ]
    };

    return this.query(queryRequest);
  }

  async getCaseTimeline(caseId: string): Promise<any[]> {
    try {
      if (!this.isInitialized) {
        return this.getDemoTimeline(caseId);
      }

      const response = await this.client.get(`/case/${caseId}/timeline`);
      return response.data || [];
    } catch (error) {
      console.error('Failed to fetch case timeline:', error);
      return this.getDemoTimeline(caseId);
    }
  }

  async createAlert(alertData: Partial<TheHiveAlert>): Promise<TheHiveAlert | null> {
    try {
      if (!this.isInitialized) {
        console.log('TheHive not configured - alert creation skipped');
        return null;
      }

      const response = await this.client.post('/alert', alertData);
      console.log('✅ Alert created in TheHive:', response.data._id);
      return response.data;
    } catch (error) {
      console.error('Failed to create alert in TheHive:', error);
      return null;
    }
  }

  async promoteAlertToCase(alertId: string, caseTemplate?: string): Promise<TheHiveCase | null> {
    try {
      if (!this.isInitialized) {
        console.log('TheHive not configured - alert promotion skipped');
        return null;
      }

      const response = await this.client.post(`/alert/${alertId}/case`, {
        caseTemplate
      });
      console.log('✅ Alert promoted to case in TheHive:', response.data._id);
      return response.data;
    } catch (error) {
      console.error('Failed to promote alert to case:', error);
      return null;
    }
  }

  // Demo data for when TheHive is not configured
  private getDemoData(queryRequest: TheHiveQueryRequest): any[] {
    const queryName = queryRequest.query[0]?._name;
    
    switch (queryName) {
      case 'listCase':
        return this.getDemoCases();
      case 'listAlert':
        return this.getDemoAlerts();
      case 'listObservable':
        return this.getDemoObservables();
      default:
        return [];
    }
  }

  private getDemoCases(): TheHiveCase[] {
    return [
      {
        _id: 'case-001',
        title: 'Suspicious Login Activity Detected',
        description: 'Multiple failed login attempts from unusual geographic locations',
        severity: 3,
        tlp: 2,
        status: 'Open',
        tags: ['brute-force', 'authentication', 'geographic-anomaly'],
        createdAt: new Date(Date.now() - 3600000).toISOString(),
        updatedAt: new Date(Date.now() - 1800000).toISOString(),
        owner: 'analyst1@cybersecuredai.com'
      },
      {
        _id: 'case-002',
        title: 'Malware Detection in Network Traffic',
        description: 'Suspicious binary identified in encrypted network communication',
        severity: 4,
        tlp: 3,
        status: 'InProgress',
        tags: ['malware', 'network-traffic', 'encryption'],
        createdAt: new Date(Date.now() - 7200000).toISOString(),
        updatedAt: new Date(Date.now() - 900000).toISOString(),
        owner: 'analyst2@cybersecuredai.com'
      },
      {
        _id: 'case-003',
        title: 'Data Exfiltration Attempt',
        description: 'Unusual large data transfers to external IP addresses',
        severity: 4,
        tlp: 3,
        status: 'Open',
        tags: ['data-exfiltration', 'network-anomaly', 'critical'],
        createdAt: new Date(Date.now() - 10800000).toISOString(),
        updatedAt: new Date(Date.now() - 600000).toISOString(),
        owner: 'senior-analyst@cybersecuredai.com'
      }
    ];
  }

  private getDemoAlerts(): TheHiveAlert[] {
    return [
      {
        _id: 'alert-001',
        title: 'Phishing Email Campaign Detected',
        description: 'Multiple users received suspicious emails with malicious attachments',
        severity: 3,
        tlp: 2,
        status: 'New',
        tags: ['phishing', 'email', 'social-engineering'],
        type: 'phishing',
        source: 'Email Security Gateway',
        sourceRef: 'ESG-2025-0905-001',
        createdAt: new Date(Date.now() - 1800000).toISOString(),
        updatedAt: new Date(Date.now() - 1800000).toISOString()
      },
      {
        _id: 'alert-002',
        title: 'Unauthorized API Access Detected',
        description: 'API calls from unauthorized IP addresses with stolen tokens',
        severity: 4,
        tlp: 3,
        status: 'New',
        tags: ['api-abuse', 'unauthorized-access', 'token-theft'],
        type: 'unauthorized-access',
        source: 'API Gateway',
        sourceRef: 'API-2025-0905-002',
        createdAt: new Date(Date.now() - 2700000).toISOString(),
        updatedAt: new Date(Date.now() - 2700000).toISOString()
      }
    ];
  }

  private getDemoObservables(): TheHiveObservable[] {
    return [
      {
        _id: 'obs-001',
        dataType: 'ip',
        data: '192.168.1.100',
        message: 'Suspicious internal IP with anomalous traffic',
        tlp: 2,
        ioc: true,
        sighted: true,
        tags: ['internal', 'suspicious-traffic'],
        createdAt: new Date(Date.now() - 3600000).toISOString()
      },
      {
        _id: 'obs-002',
        dataType: 'domain',
        data: 'malicious-site.evil',
        message: 'Known C2 domain from threat intelligence feeds',
        tlp: 3,
        ioc: true,
        sighted: false,
        tags: ['c2', 'domain', 'external-threat'],
        createdAt: new Date(Date.now() - 5400000).toISOString()
      },
      {
        _id: 'obs-003',
        dataType: 'hash',
        data: 'a1b2c3d4e5f6789012345678901234567890abcd',
        message: 'Malware hash detected in quarantine',
        tlp: 2,
        ioc: true,
        sighted: true,
        tags: ['malware', 'hash', 'quarantine'],
        createdAt: new Date(Date.now() - 7200000).toISOString()
      }
    ];
  }

  private getDemoTimeline(caseId: string): any[] {
    return [
      {
        date: new Date(Date.now() - 3600000).toISOString(),
        rootId: caseId,
        type: 'case',
        action: 'created',
        details: { message: 'Case created from alert escalation' }
      },
      {
        date: new Date(Date.now() - 2700000).toISOString(),
        rootId: caseId,
        type: 'task',
        action: 'created',
        details: { message: 'Initial analysis task assigned' }
      },
      {
        date: new Date(Date.now() - 1800000).toISOString(),
        rootId: caseId,
        type: 'observable',
        action: 'created',
        details: { message: 'IOC observable added to case' }
      }
    ];
  }

  getStatus(): { initialized: boolean; config: Partial<TheHiveConfig> } {
    return {
      initialized: this.isInitialized,
      config: {
        baseUrl: this.config.baseUrl,
        organization: this.config.organization,
        // Don't expose API key
        apiKey: this.config.apiKey ? '***configured***' : 'not configured'
      }
    };
  }
}

// Export singleton instance
export const theHiveIntegration = new TheHiveIntegration();