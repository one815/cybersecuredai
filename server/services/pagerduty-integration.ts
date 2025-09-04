import fetch from 'node-fetch';

export interface PagerDutyConfig {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
  apiBaseUrl: string;
  eventsApiUrl: string;
}

export interface PagerDutyIncident {
  incidentKey?: string;
  eventAction: 'trigger' | 'acknowledge' | 'resolve';
  summary: string;
  source: string;
  severity: 'critical' | 'error' | 'warning' | 'info';
  timestamp?: string;
  component?: string;
  group?: string;
  class?: string;
  customDetails?: Record<string, any>;
  images?: Array<{
    src: string;
    href?: string;
    alt?: string;
  }>;
  links?: Array<{
    href: string;
    text?: string;
  }>;
}

export interface PagerDutyService {
  id: string;
  name: string;
  description?: string;
  integrationKey: string;
  status: 'active' | 'warning' | 'critical' | 'maintenance';
}

export interface OAuthTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token?: string;
  scope: string;
}

export class PagerDutyIntegrationService {
  private config: PagerDutyConfig;
  private accessToken: string | null = null;
  private tokenExpiry: Date | null = null;

  constructor() {
    this.config = {
      clientId: process.env.PAGERDUTY_CLIENT_ID || '',
      clientSecret: process.env.PAGERDUTY_CLIENT_SECRET || '',
      redirectUri: 'https://cybersecuredai.com/api/auth/pagerduty/callback',
      apiBaseUrl: 'https://api.pagerduty.com',
      eventsApiUrl: 'https://events.pagerduty.com/v2/enqueue'
    };

    if (!this.config.clientId || !this.config.clientSecret) {
      console.warn('⚠️ PagerDuty OAuth credentials not configured');
    } else {
      console.log('✅ PagerDuty Integration Service initialized successfully');
    }
  }

  // OAuth Authorization URL Generation
  generateAuthUrl(state?: string): string {
    const params = new URLSearchParams({
      client_id: this.config.clientId,
      redirect_uri: this.config.redirectUri,
      response_type: 'code',
      scope: 'incidents:write incidents:read services:read users:read services:write escalation_policies:read',
      state: state || `state_${Date.now()}`
    });

    return `${this.config.apiBaseUrl}/oauth/authorize?${params.toString()}`;
  }

  // Exchange OAuth Code for Access Token
  async exchangeCodeForToken(code: string): Promise<OAuthTokenResponse> {
    try {
      const response = await fetch(`${this.config.apiBaseUrl}/oauth/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json'
        },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          client_id: this.config.clientId,
          client_secret: this.config.clientSecret,
          redirect_uri: this.config.redirectUri,
          code: code
        })
      });

      if (!response.ok) {
        throw new Error(`OAuth token exchange failed: ${response.status} ${response.statusText}`);
      }

      const tokenData = await response.json() as OAuthTokenResponse;
      
      // Store token and expiry
      this.accessToken = tokenData.access_token;
      this.tokenExpiry = new Date(Date.now() + (tokenData.expires_in * 1000));
      
      return tokenData;
    } catch (error) {
      console.error('❌ PagerDuty OAuth token exchange failed:', error);
      throw error;
    }
  }

  // Check if access token is valid
  private isTokenValid(): boolean {
    return this.accessToken !== null && 
           this.tokenExpiry !== null && 
           this.tokenExpiry > new Date();
  }

  // Create Security Incident in PagerDuty
  async createSecurityIncident(
    integrationKey: string, 
    incident: PagerDutyIncident
  ): Promise<any> {
    try {
      console.log(`🚨 Creating PagerDuty incident: ${incident.summary}`);
      
      const payload = {
        routing_key: integrationKey,
        event_action: incident.eventAction,
        dedup_key: incident.incidentKey || `cybersecured_${Date.now()}`,
        payload: {
          summary: incident.summary,
          source: incident.source,
          severity: incident.severity,
          timestamp: incident.timestamp || new Date().toISOString(),
          component: incident.component || 'CyberSecured AI',
          group: incident.group || 'Security Operations',
          class: incident.class || 'security_incident',
          custom_details: {
            platform: 'CyberSecured AI',
            detection_time: new Date().toISOString(),
            ...incident.customDetails
          }
        },
        images: incident.images || [],
        links: incident.links || []
      };

      const response = await fetch(this.config.eventsApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`PagerDuty Events API error: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      console.log('✅ PagerDuty incident created successfully:', result);
      
      return result;
    } catch (error) {
      console.error('❌ Failed to create PagerDuty incident:', error);
      throw error;
    }
  }

  // Get PagerDuty Services (requires OAuth token)
  async getServices(): Promise<PagerDutyService[]> {
    if (!this.isTokenValid()) {
      throw new Error('Valid OAuth token required to access PagerDuty services');
    }

    try {
      const response = await fetch(`${this.config.apiBaseUrl}/services`, {
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'Accept': 'application/vnd.pagerduty+json;version=2',
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`PagerDuty API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json() as any;
      return data.services || [];
    } catch (error) {
      console.error('❌ Failed to fetch PagerDuty services:', error);
      throw error;
    }
  }

  // Create Service for CyberSecured AI (requires OAuth token)
  async createService(name: string, description: string): Promise<any> {
    if (!this.isTokenValid()) {
      throw new Error('Valid OAuth token required to create PagerDuty service');
    }

    try {
      const servicePayload = {
        service: {
          name: name,
          description: description,
          status: 'active',
          escalation_policy: {
            type: 'escalation_policy_reference'
          }
        }
      };

      const response = await fetch(`${this.config.apiBaseUrl}/services`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'Accept': 'application/vnd.pagerduty+json;version=2',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(servicePayload)
      });

      if (!response.ok) {
        throw new Error(`PagerDuty API error: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      console.log('✅ PagerDuty service created successfully:', result);
      
      return result;
    } catch (error) {
      console.error('❌ Failed to create PagerDuty service:', error);
      throw error;
    }
  }

  // Create Threat Intelligence Alert
  async createThreatAlert(
    integrationKey: string,
    threatType: string,
    severity: 'critical' | 'error' | 'warning' | 'info',
    indicators: string[],
    sourceFeeds: string[]
  ): Promise<any> {
    const incident: PagerDutyIncident = {
      eventAction: 'trigger',
      summary: `🔍 Threat Intelligence Alert: ${threatType}`,
      source: 'CyberSecured AI Threat Intelligence',
      severity: severity,
      component: 'Threat Intelligence Engine',
      group: 'Security Operations',
      class: 'threat_intelligence',
      customDetails: {
        threat_type: threatType,
        indicators: indicators,
        source_feeds: sourceFeeds,
        detection_timestamp: new Date().toISOString(),
        platform: 'CyberSecured AI',
        alert_type: 'threat_intelligence'
      },
      links: [
        {
          href: 'https://cybersecuredai.com/threat-intelligence',
          text: 'View Threat Intelligence Dashboard'
        }
      ]
    };

    return this.createSecurityIncident(integrationKey, incident);
  }

  // Create Compliance Violation Alert
  async createComplianceAlert(
    integrationKey: string,
    framework: string,
    controlId: string,
    severity: 'critical' | 'error' | 'warning' | 'info',
    description: string
  ): Promise<any> {
    const incident: PagerDutyIncident = {
      eventAction: 'trigger',
      summary: `📋 Compliance Violation: ${framework} - ${controlId}`,
      source: 'CyberSecured AI Compliance Engine',
      severity: severity,
      component: 'Compliance Automation',
      group: 'Compliance Operations',
      class: 'compliance_violation',
      customDetails: {
        compliance_framework: framework,
        control_id: controlId,
        violation_description: description,
        detection_timestamp: new Date().toISOString(),
        platform: 'CyberSecured AI',
        alert_type: 'compliance_violation'
      },
      links: [
        {
          href: 'https://cybersecuredai.com/compliance',
          text: 'View Compliance Dashboard'
        }
      ]
    };

    return this.createSecurityIncident(integrationKey, incident);
  }

  // Get Integration Health Status
  getStatus(): { configured: boolean; tokenValid: boolean; config: Partial<PagerDutyConfig> } {
    return {
      configured: !!(this.config.clientId && this.config.clientSecret),
      tokenValid: this.isTokenValid(),
      config: {
        redirectUri: this.config.redirectUri,
        apiBaseUrl: this.config.apiBaseUrl,
        eventsApiUrl: this.config.eventsApiUrl
      }
    };
  }
}

export const pagerDutyIntegrationService = new PagerDutyIntegrationService();