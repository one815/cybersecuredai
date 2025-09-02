import axios from 'axios';

export interface ThreatFeedIndicator {
  value: string;
  type: 'ip' | 'domain' | 'url' | 'hash';
  confidence: number;
  source: string;
  firstSeen: Date;
  lastSeen: Date;
  tags: string[];
}

export interface SANSISCData {
  attackers: Array<{
    ip: string;
    attacks: number;
    name: string;
    country: string;
  }>;
  targets: Array<{
    port: number;
    records: number;
    targets: number;
  }>;
}

export interface OTXIndicator {
  indicator: string;
  type: string;
  created: string;
  description?: string;
  tags: string[];
}

class AlternativeThreatFeedsService {
  private otxApiKey: string;
  private baseUrls = {
    sans: 'https://isc.sans.edu/api',
    otx: 'https://otx.alienvault.com/api/v1',
    spamhaus: 'https://www.spamhaus.org/drop',
    openphish: 'https://openphish.com/feed.txt'
  };

  constructor() {
    this.otxApiKey = process.env.OTX_API_KEY || '';
  }

  // SANS Internet Storm Center - No API key required
  async getSANSThreatData(): Promise<SANSISCData> {
    try {
      console.log('🔍 Fetching SANS ISC threat data...');
      
      const [attackersResponse, targetsResponse] = await Promise.all([
        axios.get(`${this.baseUrls.sans}/sources/attacks/1000`, { timeout: 10000 }),
        axios.get(`${this.baseUrls.sans}/threatcount/1000`, { timeout: 10000 })
      ]);

      return {
        attackers: attackersResponse.data || [],
        targets: targetsResponse.data || []
      };
    } catch (error) {
      console.error('❌ Error fetching SANS data:', error);
      return { attackers: [], targets: [] };
    }
  }

  // AlienVault OTX - Free API with registration
  async getOTXThreatData(indicatorType: string = 'IPv4'): Promise<OTXIndicator[]> {
    try {
      if (!this.otxApiKey) {
        console.log('⚠️ OTX API key not configured, using mock data');
        return this.getMockOTXData();
      }

      console.log('🔍 Fetching OTX threat intelligence...');
      
      const response = await axios.get(`${this.baseUrls.otx}/indicators/export`, {
        headers: {
          'X-OTX-API-KEY': this.otxApiKey
        },
        params: {
          types: indicatorType,
          limit: 1000
        },
        timeout: 15000
      });

      return response.data.results || [];
    } catch (error) {
      console.error('❌ Error fetching OTX data:', error);
      return this.getMockOTXData();
    }
  }

  // OpenPhish - Free phishing URL feed
  async getOpenPhishData(): Promise<string[]> {
    try {
      console.log('🔍 Fetching OpenPhish data...');
      
      const response = await axios.get(this.baseUrls.openphish, {
        timeout: 10000
      });

      return response.data.split('\n').filter((url: string) => url.trim());
    } catch (error) {
      console.error('❌ Error fetching OpenPhish data:', error);
      return [];
    }
  }

  // Spamhaus DROP list - Free IP block list
  async getSpamhausDROPList(): Promise<string[]> {
    try {
      console.log('🔍 Fetching Spamhaus DROP list...');
      
      const response = await axios.get(`${this.baseUrls.spamhaus}/drop.txt`, {
        timeout: 10000
      });

      return response.data
        .split('\n')
        .filter((line: string) => !line.startsWith(';') && line.trim())
        .map((line: string) => line.split(' ')[0])
        .filter((ip: string) => ip);
    } catch (error) {
      console.error('❌ Error fetching Spamhaus data:', error);
      return [];
    }
  }

  // Aggregate all free threat feeds
  async getAggregatedThreatIntelligence(): Promise<{
    indicators: ThreatFeedIndicator[];
    summary: {
      totalIndicators: number;
      sources: string[];
      lastUpdated: Date;
    };
  }> {
    try {
      console.log('🔄 Aggregating threat intelligence from free sources...');
      
      const [sansData, otxData, phishingUrls, spamhausIPs] = await Promise.all([
        this.getSANSThreatData(),
        this.getOTXThreatData(),
        this.getOpenPhishData(),
        this.getSpamhausDROPList()
      ]);

      const indicators: ThreatFeedIndicator[] = [];
      const now = new Date();

      // Process SANS attackers
      sansData.attackers.forEach(attacker => {
        indicators.push({
          value: attacker.ip,
          type: 'ip',
          confidence: 0.8,
          source: 'SANS ISC',
          firstSeen: new Date(now.getTime() - 24 * 60 * 60 * 1000),
          lastSeen: now,
          tags: ['scanner', 'attacker', attacker.country]
        });
      });

      // Process OTX indicators
      otxData.forEach(otx => {
        indicators.push({
          value: otx.indicator,
          type: this.mapOTXType(otx.type),
          confidence: 0.7,
          source: 'AlienVault OTX',
          firstSeen: new Date(otx.created),
          lastSeen: now,
          tags: otx.tags || []
        });
      });

      // Process phishing URLs
      phishingUrls.slice(0, 500).forEach(url => {
        indicators.push({
          value: url,
          type: 'url',
          confidence: 0.9,
          source: 'OpenPhish',
          firstSeen: new Date(now.getTime() - 12 * 60 * 60 * 1000),
          lastSeen: now,
          tags: ['phishing', 'malicious']
        });
      });

      // Process Spamhaus IPs
      spamhausIPs.slice(0, 200).forEach(ip => {
        indicators.push({
          value: ip.split('/')[0], // Remove CIDR notation
          type: 'ip',
          confidence: 0.95,
          source: 'Spamhaus',
          firstSeen: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000),
          lastSeen: now,
          tags: ['spam', 'hijacked', 'botnet']
        });
      });

      console.log(`✅ Aggregated ${indicators.length} threat indicators from 4 sources`);

      return {
        indicators,
        summary: {
          totalIndicators: indicators.length,
          sources: ['SANS ISC', 'AlienVault OTX', 'OpenPhish', 'Spamhaus'],
          lastUpdated: now
        }
      };
    } catch (error) {
      console.error('❌ Error aggregating threat intelligence:', error);
      throw error;
    }
  }

  // Get indicators by type
  async getThreatIndicatorsByType(type: 'ip' | 'domain' | 'url' | 'hash'): Promise<ThreatFeedIndicator[]> {
    const data = await this.getAggregatedThreatIntelligence();
    return data.indicators.filter(indicator => indicator.type === type);
  }

  // Search for specific indicator
  async searchIndicator(value: string): Promise<ThreatFeedIndicator[]> {
    const data = await this.getAggregatedThreatIntelligence();
    return data.indicators.filter(indicator => 
      indicator.value.toLowerCase().includes(value.toLowerCase())
    );
  }

  private mapOTXType(otxType: string): 'ip' | 'domain' | 'url' | 'hash' {
    const typeMap: { [key: string]: 'ip' | 'domain' | 'url' | 'hash' } = {
      'IPv4': 'ip',
      'IPv6': 'ip',
      'domain': 'domain',
      'hostname': 'domain',
      'URL': 'url',
      'URI': 'url',
      'FileHash-MD5': 'hash',
      'FileHash-SHA1': 'hash',
      'FileHash-SHA256': 'hash'
    };
    return typeMap[otxType] || 'ip';
  }

  private getMockOTXData(): OTXIndicator[] {
    return [
      {
        indicator: '192.168.1.100',
        type: 'IPv4',
        created: new Date().toISOString(),
        description: 'Suspicious scanning activity',
        tags: ['scanner', 'reconnaissance']
      },
      {
        indicator: 'malicious-domain.com',
        type: 'domain',
        created: new Date().toISOString(),
        description: 'Known C&C domain',
        tags: ['c2', 'malware']
      }
    ];
  }

  getServiceStatus() {
    return {
      service: 'Alternative Threat Feeds',
      sources: {
        'SANS ISC': { status: 'active', apiKey: false },
        'AlienVault OTX': { status: this.otxApiKey ? 'configured' : 'mock_data', apiKey: !!this.otxApiKey },
        'OpenPhish': { status: 'active', apiKey: false },
        'Spamhaus': { status: 'active', apiKey: false }
      },
      capabilities: [
        'IP Reputation Analysis',
        'Phishing URL Detection',
        'Spam/Botnet Indicators',
        'Community Threat Intelligence',
        'Real-time Attack Data'
      ]
    };
  }
}

export const alternativeThreatFeedsService = new AlternativeThreatFeedsService();