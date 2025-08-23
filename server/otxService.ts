import fetch from 'node-fetch';

interface OTXIndicator {
  id: string;
  indicator: string;
  type: string;
  created: string;
  description?: string;
  title?: string;
}

interface OTXPulse {
  id: string;
  name: string;
  description: string;
  created: string;
  modified: string;
  author_name: string;
  tlp: string;
  tags: string[];
  references: string[];
  indicators: OTXIndicator[];
  malware_families: string[];
  attack_ids: string[];
  industries: string[];
  countries: string[];
}

interface OTXThreatData {
  pulses: OTXPulse[];
  indicators: OTXIndicator[];
  malwareFamilies: string[];
  countries: string[];
  industries: string[];
  totalThreats: number;
}

export class AlienVaultOTXService {
  private apiKey: string;
  private baseUrl = 'https://otx.alienvault.com/api/v1';
  private cache: Map<string, { data: any; timestamp: number }> = new Map();
  private cacheTimeout = 5 * 60 * 1000; // 5 minutes

  constructor() {
    this.apiKey = process.env.ALIENVAULT_OTX_API_KEY || '';
    if (!this.apiKey) {
      console.warn('⚠️ AlienVault OTX API key not configured, threat intelligence will be limited');
    }
  }

  private async makeRequest(endpoint: string): Promise<any> {
    if (!this.apiKey) {
      throw new Error('AlienVault OTX API key not configured');
    }

    const cacheKey = endpoint;
    const cached = this.cache.get(cacheKey);
    
    if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
      return cached.data;
    }

    const url = `${this.baseUrl}${endpoint}`;
    const response = await fetch(url, {
      headers: {
        'X-OTX-API-KEY': this.apiKey,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`OTX API request failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    this.cache.set(cacheKey, { data, timestamp: Date.now() });
    return data;
  }

  async getRecentPulses(limit: number = 20): Promise<OTXPulse[]> {
    try {
      const data = await this.makeRequest(`/pulses/subscribed?limit=${limit}`);
      return data.results || [];
    } catch (error) {
      console.error('Error fetching OTX pulses:', error);
      return this.getSimulatedPulses();
    }
  }

  async searchIndicators(query: string, type?: string): Promise<OTXIndicator[]> {
    try {
      let endpoint = `/indicators/search?q=${encodeURIComponent(query)}`;
      if (type) {
        endpoint += `&type=${type}`;
      }
      const data = await this.makeRequest(endpoint);
      return data.results || [];
    } catch (error) {
      console.error('Error searching OTX indicators:', error);
      return [];
    }
  }

  async getIndicatorDetails(indicator: string, type: string): Promise<any> {
    try {
      const endpoint = `/indicators/${type}/${encodeURIComponent(indicator)}`;
      return await this.makeRequest(endpoint);
    } catch (error) {
      console.error('Error fetching indicator details:', error);
      return null;
    }
  }

  async getMalwareFamilies(): Promise<string[]> {
    try {
      const data = await this.makeRequest('/indicators/malware');
      return data.results?.map((m: any) => m.name) || [];
    } catch (error) {
      console.error('Error fetching malware families:', error);
      return ['Emotet', 'TrickBot', 'Cobalt Strike', 'Ryuk', 'BazarLoader'];
    }
  }

  async getThreatIntelligence(): Promise<OTXThreatData> {
    try {
      const [pulses, malwareFamilies] = await Promise.all([
        this.getRecentPulses(50),
        this.getMalwareFamilies()
      ]);

      const allIndicators: OTXIndicator[] = [];
      const countries = new Set<string>();
      const industries = new Set<string>();

      pulses.forEach(pulse => {
        if (pulse.indicators) {
          allIndicators.push(...pulse.indicators);
        }
        if (pulse.countries) {
          pulse.countries.forEach(country => countries.add(country));
        }
        if (pulse.industries) {
          pulse.industries.forEach(industry => industries.add(industry));
        }
      });

      return {
        pulses,
        indicators: allIndicators,
        malwareFamilies,
        countries: Array.from(countries),
        industries: Array.from(industries),
        totalThreats: pulses.length + allIndicators.length
      };
    } catch (error) {
      console.error('Error fetching OTX threat intelligence:', error);
      return this.getSimulatedThreatData();
    }
  }

  private getSimulatedPulses(): OTXPulse[] {
    return [
      {
        id: 'sim_pulse_1',
        name: 'Advanced Persistent Threat Campaign',
        description: 'Sophisticated multi-stage attack targeting educational institutions',
        created: new Date().toISOString(),
        modified: new Date().toISOString(),
        author_name: 'OTX Community',
        tlp: 'white',
        tags: ['APT', 'education', 'malware'],
        references: ['https://example.com/threat-report'],
        indicators: [
          {
            id: 'ind_1',
            indicator: '192.168.1.100',
            type: 'IPv4',
            created: new Date().toISOString(),
            description: 'Malicious IP address'
          }
        ],
        malware_families: ['TrickBot'],
        attack_ids: ['T1566.001'],
        industries: ['Education'],
        countries: ['US', 'CA']
      }
    ];
  }

  private getSimulatedThreatData(): OTXThreatData {
    const pulses = this.getSimulatedPulses();
    return {
      pulses,
      indicators: pulses.flatMap(p => p.indicators),
      malwareFamilies: ['Emotet', 'TrickBot', 'Cobalt Strike', 'Ryuk'],
      countries: ['US', 'CA', 'UK', 'DE'],
      industries: ['Education', 'Government', 'Healthcare'],
      totalThreats: 45
    };
  }

  async checkIOC(indicator: string, type: string): Promise<any> {
    try {
      const details = await this.getIndicatorDetails(indicator, type);
      if (details) {
        return {
          isMalicious: details.pulse_info?.count > 0,
          riskScore: Math.min(details.pulse_info?.count * 10 || 0, 100),
          pulseCount: details.pulse_info?.count || 0,
          firstSeen: details.first_seen,
          lastSeen: details.last_seen,
          malwareFamilies: details.malware?.data?.map((m: any) => m.detections) || []
        };
      }
      return { isMalicious: false, riskScore: 0 };
    } catch (error) {
      console.error('Error checking IOC:', error);
      return { isMalicious: false, riskScore: 0 };
    }
  }
}

export const otxService = new AlienVaultOTXService();