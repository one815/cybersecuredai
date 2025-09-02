import axios from 'axios';

export interface XForceIPReport {
  ip: string;
  country?: string;
  geo?: {
    country: string;
    countrycode: string;
  };
  malware?: {
    risk: number;
    family?: string[];
  };
  reputation?: {
    score: number;
    cats: { [key: string]: number };
  };
  history?: Array<{
    created: string;
    ip: string;
    reason: string;
    score: number;
  }>;
}

export interface XForceURLReport {
  url: string;
  result: {
    score: number;
    cats: { [key: string]: number };
    categoryDescriptions: { [key: string]: string };
  };
  tags?: string[];
  application?: {
    name: string;
    description: string;
  };
}

export interface XForceDomainReport {
  domain: string;
  a?: string[];
  aaaa?: string[];
  mx?: Array<{
    exchange: string;
    priority: number;
  }>;
  passive?: {
    query: string;
    records: Array<{
      value: string;
      type: string;
      recordType: string;
      first: string;
      last: string;
    }>;
  };
}

export interface XForceVulnerabilityReport {
  xfdbid: string;
  title: string;
  description: string;
  risk_level: number;
  cvss?: {
    version: string;
    base_score: number;
    temporal_score: number;
    environmental_score: number;
  };
  stdcode?: string[];
  exploit_availability?: boolean;
  references?: Array<{
    link_target: string;
    link_name: string;
  }>;
}

export interface XForceCollectionReport {
  collectionId: string;
  name: string;
  description: string;
  tags: string[];
  contents: Array<{
    type: string;
    value: string;
    malware_family?: string;
    score?: number;
  }>;
  created: string;
  updated: string;
}

class IBMXForceService {
  private baseURL = 'https://api.xforce.ibmcloud.com';
  private apiKey: string;
  private password: string;
  private authToken?: string;
  private tokenExpiry?: Date;

  constructor() {
    this.apiKey = process.env.IBM_XFORCE_API_KEY || '';
    this.password = process.env.IBM_XFORCE_PASSWORD || '';
    
    if (!this.apiKey || !this.password) {
      console.warn('⚠️ IBM X-Force API credentials not configured');
    }
  }

  private async authenticate(): Promise<void> {
    if (this.authToken && this.tokenExpiry && new Date() < this.tokenExpiry) {
      return; // Token still valid
    }

    try {
      const credentials = Buffer.from(`${this.apiKey}:${this.password}`).toString('base64');
      
      const response = await axios.post(`${this.baseURL}/auth`, {}, {
        headers: {
          'Authorization': `Basic ${credentials}`,
          'Content-Type': 'application/json'
        }
      });

      this.authToken = response.data.token;
      this.tokenExpiry = new Date(Date.now() + (response.data.expires_in * 1000));
      
      console.log('✅ IBM X-Force authentication successful');
    } catch (error) {
      console.error('❌ IBM X-Force authentication failed:', error);
      throw new Error('X-Force authentication failed');
    }
  }

  private async makeRequest(endpoint: string): Promise<any> {
    if (!this.apiKey || !this.password) {
      console.log('🔄 IBM X-Force not configured, using mock data');
      return this.getMockData(endpoint);
    }

    await this.authenticate();

    try {
      const response = await axios.get(`${this.baseURL}${endpoint}`, {
        headers: {
          'Authorization': `Bearer ${this.authToken}`,
          'Accept': 'application/json'
        },
        timeout: 10000
      });

      return response.data;
    } catch (error) {
      console.error(`❌ X-Force API request failed for ${endpoint}:`, error);
      return this.getMockData(endpoint);
    }
  }

  private getMockData(endpoint: string): any {
    // Return mock data based on endpoint pattern
    if (endpoint.includes('/ipr/')) {
      return {
        ip: endpoint.split('/').pop(),
        country: 'United States',
        geo: {
          country: 'United States',
          countrycode: 'US'
        },
        malware: {
          risk: 1,
          family: []
        },
        reputation: {
          score: 1,
          cats: {}
        },
        history: []
      };
    }

    if (endpoint.includes('/url/')) {
      return {
        url: decodeURIComponent(endpoint.split('/').pop() || ''),
        result: {
          score: 1,
          cats: {},
          categoryDescriptions: {}
        },
        tags: []
      };
    }

    if (endpoint.includes('/resolve/')) {
      return {
        domain: endpoint.split('/').pop(),
        a: ['127.0.0.1'],
        passive: {
          query: endpoint.split('/').pop(),
          records: []
        }
      };
    }

    return {};
  }

  async getIPReport(ip: string): Promise<XForceIPReport> {
    try {
      const data = await this.makeRequest(`/ipr/${ip}`);
      return {
        ip,
        country: data.geo?.country,
        geo: data.geo,
        malware: data.malware,
        reputation: data.reputation,
        history: data.history
      };
    } catch (error) {
      console.error('Error fetching IP report:', error);
      throw error;
    }
  }

  async getURLReport(url: string): Promise<XForceURLReport> {
    try {
      const encodedUrl = encodeURIComponent(url);
      const data = await this.makeRequest(`/url/${encodedUrl}`);
      return {
        url,
        result: data.result || { score: 1, cats: {}, categoryDescriptions: {} },
        tags: data.tags,
        application: data.application
      };
    } catch (error) {
      console.error('Error fetching URL report:', error);
      throw error;
    }
  }

  async getDomainReport(domain: string): Promise<XForceDomainReport> {
    try {
      const data = await this.makeRequest(`/resolve/${domain}`);
      return {
        domain,
        a: data.a,
        aaaa: data.aaaa,
        mx: data.mx,
        passive: data.passive
      };
    } catch (error) {
      console.error('Error fetching domain report:', error);
      throw error;
    }
  }

  async getVulnerabilityReport(cve: string): Promise<XForceVulnerabilityReport> {
    try {
      const data = await this.makeRequest(`/vulnerabilities/search/${cve}`);
      const vuln = Array.isArray(data) ? data[0] : data;
      
      return {
        xfdbid: vuln.xfdbid || cve,
        title: vuln.title || 'Unknown Vulnerability',
        description: vuln.description || 'No description available',
        risk_level: vuln.risk_level || 1,
        cvss: vuln.cvss,
        stdcode: vuln.stdcode,
        exploit_availability: vuln.exploit_availability,
        references: vuln.references
      };
    } catch (error) {
      console.error('Error fetching vulnerability report:', error);
      throw error;
    }
  }

  async getCollections(): Promise<XForceCollectionReport[]> {
    try {
      const data = await this.makeRequest('/collections');
      return data.collections || [];
    } catch (error) {
      console.error('Error fetching collections:', error);
      return [];
    }
  }

  async getCollection(collectionId: string): Promise<XForceCollectionReport> {
    try {
      const data = await this.makeRequest(`/collections/${collectionId}`);
      return {
        collectionId,
        name: data.name || 'Unknown Collection',
        description: data.description || '',
        tags: data.tags || [],
        contents: data.contents || [],
        created: data.created || new Date().toISOString(),
        updated: data.updated || new Date().toISOString()
      };
    } catch (error) {
      console.error('Error fetching collection:', error);
      throw error;
    }
  }

  async searchMalware(hash: string): Promise<any> {
    try {
      const data = await this.makeRequest(`/malware/${hash}`);
      return {
        hash,
        malware: data.malware || {},
        origins: data.origins || {},
        family: data.family || [],
        type: data.type || 'unknown'
      };
    } catch (error) {
      console.error('Error searching malware:', error);
      throw error;
    }
  }

  async getThreatIntelligence(indicators: string[]): Promise<any[]> {
    try {
      const reports = await Promise.all(
        indicators.map(async (indicator) => {
          // Determine indicator type and fetch appropriate report
          if (this.isIP(indicator)) {
            return { type: 'ip', indicator, data: await this.getIPReport(indicator) };
          } else if (this.isURL(indicator)) {
            return { type: 'url', indicator, data: await this.getURLReport(indicator) };
          } else if (this.isDomain(indicator)) {
            return { type: 'domain', indicator, data: await this.getDomainReport(indicator) };
          } else if (this.isHash(indicator)) {
            return { type: 'malware', indicator, data: await this.searchMalware(indicator) };
          }
          return { type: 'unknown', indicator, data: {} };
        })
      );

      return reports;
    } catch (error) {
      console.error('Error fetching threat intelligence:', error);
      throw error;
    }
  }

  private isIP(str: string): boolean {
    const ipRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    return ipRegex.test(str);
  }

  private isURL(str: string): boolean {
    try {
      new URL(str);
      return true;
    } catch {
      return false;
    }
  }

  private isDomain(str: string): boolean {
    const domainRegex = /^[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return domainRegex.test(str) && !this.isIP(str);
  }

  private isHash(str: string): boolean {
    // MD5, SHA1, SHA256 hash patterns
    const hashRegex = /^[a-fA-F0-9]{32}$|^[a-fA-F0-9]{40}$|^[a-fA-F0-9]{64}$/;
    return hashRegex.test(str);
  }

  getServiceStatus() {
    return {
      service: 'IBM X-Force Exchange',
      status: (this.apiKey && this.password) ? 'configured' : 'not_configured',
      authenticated: !!this.authToken,
      features: [
        'IP Reputation Analysis',
        'URL Categorization',
        'Domain Intelligence',
        'Vulnerability Research',
        'Malware Analysis',
        'Threat Collections',
        'Passive DNS Lookup'
      ]
    };
  }
}

export const ibmXForceService = new IBMXForceService();