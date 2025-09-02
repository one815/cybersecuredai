export interface OTXIndicator {
  id: string;
  type: 'IPv4' | 'IPv6' | 'domain' | 'hostname' | 'URL' | 'URI' | 'FileHash-MD5' | 'FileHash-SHA1' | 'FileHash-SHA256';
  indicator: string;
  description: string;
  created: Date;
  modified: Date;
  tlp: 'white' | 'green' | 'amber' | 'red';
  source: string;
  pulseInfo: OTXPulse[];
}

export interface OTXPulse {
  id: string;
  name: string;
  description: string;
  author: string;
  created: Date;
  modified: Date;
  references: string[];
  tags: string[];
  malwareFamilies: string[];
  attackIds: string[];
  industries: string[];
  targetedCountries: string[];
}

export interface OTXThreatData {
  reputation: number;
  confidence: number;
  threat_types: string[];
  malware_families: string[];
  pulse_count: number;
  first_seen: Date;
  last_seen: Date;
  whois: any;
  geographic: {
    country_code: string;
    country_name: string;
    city: string;
    region: string;
    continent_code: string;
  };
}

export class ATTOTXService {
  private readonly baseUrl = 'https://otx.alienvault.com/api/v1';
  private readonly apiKey: string;

  constructor() {
    this.apiKey = process.env.ATT_OTX_API_KEY || '';
  }

  /**
   * Make authenticated request to AT&T OTX API
   */
  private async makeRequest(endpoint: string): Promise<any> {
    try {
      const url = `${this.baseUrl}${endpoint}`;
      console.log(`🔗 AT&T OTX API: GET ${endpoint}`);

      if (!this.apiKey) {
        console.log('⚠️ AT&T OTX API key not configured - using mock data');
        return this.getMockData(endpoint);
      }

      const response = await fetch(url, {
        headers: {
          'X-OTX-API-KEY': this.apiKey,
          'Content-Type': 'application/json',
          'User-Agent': 'CyberSecured-AI/1.0'
        }
      });

      if (!response.ok) {
        throw new Error(`AT&T OTX API error: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('❌ AT&T OTX API request failed:', error);
      return this.getMockData(endpoint);
    }
  }

  /**
   * Mock data for development and testing
   */
  private getMockData(endpoint: string): any {
    const mockData = {
      '/indicators/IPv4/8.8.8.8/general': {
        reputation: 0,
        country_code: 'US',
        city: 'Mountain View',
        region: 'California',
        continent_code: 'NA',
        latitude: 37.4223,
        longitude: -122.085,
        accuracy_radius: 1000,
        sections: ['general', 'reputation', 'geo', 'malware', 'url_list', 'passive_dns'],
        pulse_info: {
          count: 12,
          references: [
            'https://unit42.paloaltonetworks.com/apt29-continues-targeting/',
            'https://attack.mitre.org/groups/G0016/'
          ]
        }
      },
      '/pulses/subscribed': {
        results: [
          {
            id: 'pulse_001',
            name: 'APT29 Infrastructure Update Q1 2025',
            description: 'Latest infrastructure and IOCs associated with APT29 operations',
            author_name: 'CyberThreatIntel',
            created: new Date(Date.now() - 86400000).toISOString(),
            modified: new Date().toISOString(),
            references: ['https://attack.mitre.org/groups/G0016/'],
            tags: ['apt29', 'russia', 'espionage', 'government'],
            malware_families: ['CozyDuke', 'MiniDuke', 'OnionDuke'],
            attack_ids: ['T1078', 'T1003', 'T1047'],
            industries: ['government', 'technology', 'healthcare'],
            targeted_countries: ['US', 'EU', 'UK'],
            indicator_count: 47
          },
          {
            id: 'pulse_002',
            name: 'Lazarus Group Financial Sector Campaign',
            description: 'North Korean APT targeting financial institutions',
            author_name: 'FinancialCyberIntel',
            created: new Date(Date.now() - 172800000).toISOString(),
            modified: new Date(Date.now() - 86400000).toISOString(),
            references: ['https://attack.mitre.org/groups/G0032/'],
            tags: ['lazarus', 'north-korea', 'financial', 'cryptocurrency'],
            malware_families: ['Hoplight', 'Joanap', 'Volgmer'],
            attack_ids: ['T1566.001', 'T1105', 'T1041'],
            industries: ['financial', 'cryptocurrency', 'banking'],
            targeted_countries: ['US', 'KR', 'JP'],
            indicator_count: 23
          }
        ]
      },
      '/indicators/domain/malicious-domain.com/general': {
        reputation: -1,
        indicator: 'malicious-domain.com',
        type: 'domain',
        type_title: 'Domain',
        base_indicator: {},
        pulse_info: {
          count: 8,
          pulses: [
            {
              id: 'pulse_003',
              name: 'APT40 Maritime Campaign 2025',
              description: 'Chinese APT targeting maritime and engineering companies',
              created: new Date(Date.now() - 259200000).toISOString(),
              tags: ['apt40', 'china', 'maritime', 'engineering']
            }
          ]
        }
      }
    };

    return mockData[endpoint] || { results: [], data: [] };
  }

  /**
   * Get threat intelligence for specific indicator
   */
  async getIndicatorIntelligence(indicator: string, type: string): Promise<OTXThreatData | null> {
    try {
      const endpoint = `/indicators/${type}/${indicator}/general`;
      const response = await this.makeRequest(endpoint);
      
      return {
        reputation: response.reputation || 0,
        confidence: response.pulse_info?.count ? Math.min(response.pulse_info.count * 10, 100) : 0,
        threat_types: response.pulse_info?.pulses?.flatMap(p => p.tags) || [],
        malware_families: response.pulse_info?.pulses?.flatMap(p => p.malware_families || []) || [],
        pulse_count: response.pulse_info?.count || 0,
        first_seen: new Date(response.first_seen || Date.now() - 2592000000),
        last_seen: new Date(response.last_seen || Date.now()),
        whois: response.whois,
        geographic: response.city ? {
          country_code: response.country_code,
          country_name: response.country_name,
          city: response.city,
          region: response.region,
          continent_code: response.continent_code
        } : null
      };
    } catch (error) {
      console.error(`❌ Failed to get OTX intelligence for ${indicator}:`, error);
      return null;
    }
  }

  /**
   * Get subscribed threat intelligence pulses
   */
  async getSubscribedPulses(limit: number = 20): Promise<OTXPulse[]> {
    try {
      const response = await this.makeRequest(`/pulses/subscribed?limit=${limit}`);
      return response.results?.map(pulse => ({
        id: pulse.id,
        name: pulse.name,
        description: pulse.description,
        author: pulse.author_name,
        created: new Date(pulse.created),
        modified: new Date(pulse.modified),
        references: pulse.references || [],
        tags: pulse.tags || [],
        malwareFamilies: pulse.malware_families || [],
        attackIds: pulse.attack_ids || [],
        industries: pulse.industries || [],
        targetedCountries: pulse.targeted_countries || []
      })) || [];
    } catch (error) {
      console.error('❌ Failed to fetch OTX pulses:', error);
      return [];
    }
  }

  /**
   * Search pulses by tag or keyword
   */
  async searchPulses(query: string): Promise<OTXPulse[]> {
    try {
      const response = await this.makeRequest(`/search/pulses?q=${encodeURIComponent(query)}`);
      return response.results || [];
    } catch (error) {
      console.error(`❌ Failed to search OTX pulses for ${query}:`, error);
      return [];
    }
  }

  /**
   * Get APT-specific threat intelligence
   */
  async getAPTIntelligence(): Promise<OTXPulse[]> {
    try {
      const aptTags = ['apt29', 'apt40', 'apt28', 'apt41', 'lazarus', 'carbanak'];
      const allAPTPulses: OTXPulse[] = [];

      for (const tag of aptTags) {
        const pulses = await this.searchPulses(tag);
        allAPTPulses.push(...pulses.slice(0, 5)); // Limit to 5 per APT group
      }

      return allAPTPulses;
    } catch (error) {
      console.error('❌ Failed to get APT intelligence:', error);
      return [];
    }
  }

  /**
   * Get real-time threat indicators
   */
  async getLatestIndicators(limit: number = 50): Promise<OTXIndicator[]> {
    try {
      const response = await this.makeRequest(`/indicators/export?limit=${limit}`);
      return response.results || [];
    } catch (error) {
      console.error('❌ Failed to get latest indicators:', error);
      return [];
    }
  }

  /**
   * Analyze URL or domain for threat intelligence
   */
  async analyzeURL(url: string): Promise<OTXThreatData | null> {
    try {
      const domain = new URL(url).hostname;
      return await this.getIndicatorIntelligence(domain, 'domain');
    } catch (error) {
      console.error(`❌ Failed to analyze URL ${url}:`, error);
      return null;
    }
  }
}

export const attOTXService = new ATTOTXService();