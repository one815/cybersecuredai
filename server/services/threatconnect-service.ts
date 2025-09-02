import crypto from 'crypto';

export interface ThreatConnectConfig {
  baseUrl: string;
  accessId: string;
  secretKey: string;
  userAgent: string;
}

export interface APTGroup {
  id: string;
  name: string;
  aliases: string[];
  description: string;
  firstSeen: Date;
  lastSeen: Date;
  motivation: string[];
  sophistication: 'low' | 'medium' | 'high' | 'expert';
  resource: 'individual' | 'group' | 'government' | 'syndicate';
  ttps: TTPs[];
  indicators: ThreatIndicator[];
  attribution: AttributionAssessment;
}

export interface TTPs {
  tactic: string;
  technique: string;
  subtechnique?: string;
  description: string;
  mitreId: string;
}

export interface ThreatIndicator {
  id: string;
  type: 'ip' | 'domain' | 'hash' | 'url' | 'email';
  value: string;
  confidence: number;
  firstSeen: Date;
  lastSeen: Date;
  tlp: 'white' | 'green' | 'amber' | 'red';
  source: string;
  associatedGroups: string[];
}

export interface AttributionAssessment {
  confidence: 'low' | 'medium' | 'high';
  assessmentDate: Date;
  analyst: string;
  reasoning: string;
  sources: string[];
  geopoliticalContext: string;
}

export interface ThreatConnectIntelligence {
  aptGroups: APTGroup[];
  indicators: ThreatIndicator[];
  campaigns: Campaign[];
  trends: AttributionTrend[];
}

export interface Campaign {
  id: string;
  name: string;
  aptGroup: string;
  startDate: Date;
  endDate?: Date;
  targets: string[];
  objectives: string[];
  ttps: string[];
  indicators: string[];
}

export interface AttributionTrend {
  timeframe: string;
  region: string;
  aptActivity: number;
  newGroups: number;
  activeCampaigns: number;
  topTargets: string[];
}

export class ThreatConnectService {
  private config: ThreatConnectConfig;

  constructor() {
    this.config = {
      baseUrl: process.env.THREATCONNECT_API_URL || 'https://app.threatconnect.com/api',
      accessId: process.env.THREATCONNECT_ACCESS_ID || '',
      secretKey: process.env.THREATCONNECT_SECRET_KEY || '',
      userAgent: 'CyberSecured-AI/1.0'
    };
  }

  /**
   * Generate HMAC signature for ThreatConnect API authentication
   */
  private generateSignature(path: string, method: string, timestamp: number): string {
    const signature = `${path}:${method}:${timestamp}`;
    return crypto
      .createHmac('sha256', this.config.secretKey)
      .update(signature)
      .digest('base64');
  }

  /**
   * Make authenticated API request to ThreatConnect
   */
  private async makeRequest(path: string, method: string = 'GET', body?: any): Promise<any> {
    const timestamp = Math.floor(Date.now() / 1000);
    const signature = this.generateSignature(path, method, timestamp);
    
    const headers = {
      'Authorization': `TC ${this.config.accessId}:${signature}`,
      'Timestamp': timestamp.toString(),
      'Content-Type': 'application/json',
      'User-Agent': this.config.userAgent
    };

    try {
      const url = `${this.config.baseUrl}${path}`;
      console.log(`🔗 ThreatConnect API: ${method} ${path}`);
      
      // Simulate API call for now - replace with actual fetch when credentials available
      if (!this.config.accessId || !this.config.secretKey) {
        console.log('⚠️ ThreatConnect credentials not configured - using mock data');
        return this.getMockData(path);
      }

      const response = await fetch(url, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined
      });

      if (!response.ok) {
        throw new Error(`ThreatConnect API error: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('❌ ThreatConnect API request failed:', error);
      throw error;
    }
  }

  /**
   * Get mock data for development (replace with real API calls when credentials available)
   */
  private getMockData(path: string): any {
    const mockData = {
      '/v3/threatIntelligence/aptGroups': {
        data: [
          {
            id: 'apt29',
            name: 'APT29 (Cozy Bear)',
            aliases: ['The Dukes', 'CozyDuke', 'Yttrium'],
            description: 'Russian state-sponsored APT group associated with SVR',
            firstSeen: new Date('2008-01-01'),
            lastSeen: new Date(),
            motivation: ['espionage', 'data_theft'],
            sophistication: 'expert',
            resource: 'government',
            attribution: {
              confidence: 'high',
              assessmentDate: new Date(),
              analyst: 'ThreatConnect Intelligence Team',
              reasoning: 'Multiple overlapping indicators, infrastructure analysis, and TTP correlation',
              sources: ['MITRE ATT&CK', 'FireEye', 'Government Attribution'],
              geopoliticalContext: 'Russian Foreign Intelligence Service (SVR) operations'
            }
          },
          {
            id: 'apt40',
            name: 'APT40 (Leviathan)',
            aliases: ['TEMP.Periscope', 'Leviathan', 'TEMP.Jumper'],
            description: 'Chinese state-sponsored group focused on maritime industries',
            firstSeen: new Date('2013-01-01'),
            lastSeen: new Date(Date.now() - 86400000),
            motivation: ['espionage', 'intellectual_property'],
            sophistication: 'high',
            resource: 'government',
            attribution: {
              confidence: 'high',
              assessmentDate: new Date(),
              analyst: 'ThreatConnect Intelligence Team',
              reasoning: '51+ code families identified, infrastructure patterns, targeting correlation',
              sources: ['Mandiant Research', 'MITRE ATT&CK', 'Academic Analysis'],
              geopoliticalContext: 'Chinese naval modernization intelligence collection'
            }
          }
        ]
      },
      '/v3/indicators': {
        data: [
          {
            id: 'ind_001',
            type: 'ip',
            value: '185.159.158.77',
            confidence: 95,
            firstSeen: new Date(Date.now() - 2592000000),
            lastSeen: new Date(Date.now() - 86400000),
            tlp: 'amber',
            source: 'ThreatConnect Intelligence',
            associatedGroups: ['apt29', 'apt40']
          }
        ]
      },
      '/v3/campaigns': {
        data: [
          {
            id: 'campaign_001',
            name: 'SolarWinds Supply Chain Attack',
            aptGroup: 'apt29',
            startDate: new Date('2020-03-01'),
            endDate: new Date('2020-12-01'),
            targets: ['Government', 'Technology', 'Consulting'],
            objectives: ['Long-term access', 'Intelligence collection'],
            ttps: ['T1195.002', 'T1078', 'T1003'],
            indicators: ['ind_001', 'ind_002']
          }
        ]
      }
    };

    return mockData[path] || { data: [] };
  }

  /**
   * Fetch APT groups with attribution data
   */
  async getAPTGroups(): Promise<APTGroup[]> {
    try {
      const response = await this.makeRequest('/v3/threatIntelligence/aptGroups');
      return response.data || [];
    } catch (error) {
      console.error('❌ Failed to fetch APT groups:', error);
      return [];
    }
  }

  /**
   * Get specific APT group details
   */
  async getAPTGroupDetails(groupId: string): Promise<APTGroup | null> {
    try {
      const response = await this.makeRequest(`/v3/threatIntelligence/aptGroups/${groupId}`);
      return response.data || null;
    } catch (error) {
      console.error(`❌ Failed to fetch APT group ${groupId}:`, error);
      return null;
    }
  }

  /**
   * Search threat indicators
   */
  async searchIndicators(query: string, type?: string): Promise<ThreatIndicator[]> {
    try {
      const params = new URLSearchParams({ q: query });
      if (type) params.append('type', type);
      
      const response = await this.makeRequest(`/v3/indicators/search?${params}`);
      return response.data || [];
    } catch (error) {
      console.error('❌ Failed to search indicators:', error);
      return [];
    }
  }

  /**
   * Get attribution assessment for specific threat
   */
  async getAttributionAssessment(indicatorId: string): Promise<AttributionAssessment | null> {
    try {
      const response = await this.makeRequest(`/v3/indicators/${indicatorId}/attribution`);
      return response.data || null;
    } catch (error) {
      console.error(`❌ Failed to get attribution for ${indicatorId}:`, error);
      return null;
    }
  }

  /**
   * Get current APT campaign intelligence
   */
  async getActiveCampaigns(): Promise<Campaign[]> {
    try {
      const response = await this.makeRequest('/v3/campaigns?status=active');
      return response.data || [];
    } catch (error) {
      console.error('❌ Failed to fetch active campaigns:', error);
      return [];
    }
  }

  /**
   * Get attribution trends and analytics
   */
  async getAttributionTrends(timeframe: string = '30d'): Promise<AttributionTrend[]> {
    try {
      const response = await this.makeRequest(`/v3/analytics/attribution/trends?timeframe=${timeframe}`);
      return response.data || [];
    } catch (error) {
      console.error('❌ Failed to fetch attribution trends:', error);
      return [];
    }
  }

  /**
   * Submit indicator for attribution analysis
   */
  async submitForAttribution(indicator: string, type: string, context?: string): Promise<any> {
    try {
      const body = {
        indicator,
        type,
        context: context || 'CyberSecured AI Analysis Request',
        priority: 'high',
        source: 'CyberSecured AI Platform'
      };

      const response = await this.makeRequest('/v3/attribution/submit', 'POST', body);
      return response.data || null;
    } catch (error) {
      console.error('❌ Failed to submit for attribution:', error);
      return null;
    }
  }

  /**
   * Get threat intelligence feed status
   */
  async getFeedStatus(): Promise<any> {
    try {
      const response = await this.makeRequest('/v3/feeds/status');
      return response.data || {};
    } catch (error) {
      console.error('❌ Failed to get feed status:', error);
      return {};
    }
  }
}

export const threatConnectService = new ThreatConnectService();