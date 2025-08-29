import { EventEmitter } from 'events';
import { circlTools } from '../circl-tools.js';

/**
 * MISP (Malware Information Sharing Platform) Threat Intelligence Engine
 * 
 * Integrates with MISP API to fetch real-time threat intelligence data including:
 * - IOCs (Indicators of Compromise)
 * - Threat actor information
 * - Attack patterns and TTPs
 * - Sightings and attribution data
 * - Galaxy clusters and relationships
 */

export interface MISPConfig {
  url: string;
  apiKey: string;
  verifyCert?: boolean;
  timeout?: number;
  enabledFeeds?: string[];
  useOfficialFeeds?: boolean;
}

export interface MISPFeedConfig {
  name: string;
  provider: string;
  url: string;
  enabled: boolean;
  distribution: string;
  source_format: string;
  fixed_event: boolean;
  delta_merge: boolean;
  publish: boolean;
  override_ids: boolean;
  input_source: string;
  settings: any;
  tags?: any[];
}

export interface MISPAttribute {
  id: string;
  event_id: string;
  type: string;
  category: string;
  value: string;
  to_ids: boolean;
  uuid: string;
  timestamp: string;
  distribution: number;
  sharing_group_id?: string;
  comment?: string;
  deleted: boolean;
  disable_correlation: boolean;
  object_id?: string;
  object_relation?: string;
  first_seen?: string;
  last_seen?: string;
  tags?: MISPTag[];
  sightings?: MISPSighting[];
}

export interface MISPEvent {
  id: string;
  orgc_id: string;
  org_id: string;
  date: string;
  threat_level_id: string;
  info: string;
  published: boolean;
  uuid: string;
  attribute_count: string;
  analysis: string;
  timestamp: string;
  distribution: string;
  proposal_email_lock: boolean;
  locked: boolean;
  publish_timestamp?: string;
  sharing_group_id?: string;
  disable_correlation: boolean;
  extends_uuid?: string;
  protected?: boolean;
  event_creator_email?: string;
  tags?: MISPTag[];
  attributes?: MISPAttribute[];
  objects?: MISPObject[];
  galaxy?: MISPGalaxy[];
  related_events?: any[];
}

export interface MISPTag {
  id: string;
  name: string;
  colour: string;
  exportable: boolean;
  org_id?: string;
  user_id?: string;
  hide_tag: boolean;
  numerical_value?: number;
  is_galaxy: boolean;
  is_custom_galaxy: boolean;
  local_only: boolean;
}

export interface MISPSighting {
  id: string;
  attribute_id: string;
  event_id: string;
  org_id: string;
  date_sighting: string;
  uuid: string;
  source?: string;
  type: string;
  timestamp: string;
}

export interface MISPObject {
  id: string;
  name: string;
  meta_category: string;
  description: string;
  template_uuid: string;
  template_version: string;
  event_id: string;
  uuid: string;
  timestamp: string;
  distribution: string;
  sharing_group_id?: string;
  comment?: string;
  deleted: boolean;
  attributes?: MISPAttribute[];
}

export interface MISPGalaxy {
  id: string;
  uuid: string;
  name: string;
  type: string;
  description: string;
  version: string;
  icon: string;
  namespace: string;
  enabled: boolean;
  local_only: boolean;
  kill_chain_order?: any;
  galaxy_clusters?: MISPGalaxyCluster[];
}

export interface MISPGalaxyCluster {
  id: string;
  uuid: string;
  collection_uuid: string;
  type: string;
  value: string;
  tag_name: string;
  description: string;
  galaxy_id: string;
  source: string;
  authors: string[];
  version: string;
  distribution: string;
  sharing_group_id?: string;
  org_id: string;
  orgc_id: string;
  extends_uuid?: string;
  extends_version?: string;
  published: boolean;
  deleted: boolean;
  galaxy_cluster_relations?: any[];
  galaxy_cluster_relation_tags?: any[];
  meta?: any;
}

export interface ThreatIntelligenceData {
  iocs: {
    ips: string[];
    domains: string[];
    urls: string[];
    hashes: { type: string; value: string }[];
    emails: string[];
  };
  threatActors: {
    name: string;
    aliases: string[];
    description: string;
    tactics: string[];
    techniques: string[];
    attribution: string;
    confidence: number;
  }[];
  campaigns: {
    name: string;
    description: string;
    firstSeen: string;
    lastSeen: string;
    targetSectors: string[];
    attribution: string[];
  }[];
  vulnerabilities: {
    cve: string;
    severity: string;
    description: string;
    exploits: string[];
  }[];
  lastUpdate: Date;
}

export class MISPThreatIntelligence extends EventEmitter {
  private config: MISPConfig;
  private cachedData: ThreatIntelligenceData;
  private lastFetch: Date = new Date(0);
  private fetchInterval: number = 300000; // 5 minutes
  private initialized: boolean = false;
  private officialFeeds: MISPFeedConfig[] = [];

  constructor(config: MISPConfig) {
    super();
    this.config = {
      timeout: 30000,
      verifyCert: true,
      ...config
    };
    
    this.cachedData = {
      iocs: { ips: [], domains: [], urls: [], hashes: [], emails: [] },
      threatActors: [],
      campaigns: [],
      vulnerabilities: [],
      lastUpdate: new Date()
    };

    console.log('🔗 Initializing MISP Threat Intelligence Engine...');
    this.loadOfficialFeeds();
    this.initializeDataFetching();
  }

  private async initializeDataFetching(): Promise<void> {
    try {
      // Initial data fetch
      await this.fetchThreatIntelligence();
      this.initialized = true;
      
      // Set up periodic updates
      setInterval(async () => {
        try {
          await this.fetchThreatIntelligence();
        } catch (error) {
          console.error('❌ Error in periodic MISP data fetch:', error);
          this.emit('error', error);
        }
      }, this.fetchInterval);

      console.log('✅ MISP Threat Intelligence Engine initialized successfully');
      this.emit('initialized');
    } catch (error) {
      console.error('❌ Failed to initialize MISP Threat Intelligence:', error);
      this.emit('error', error);
    }
  }

  public async fetchThreatIntelligence(): Promise<ThreatIntelligenceData> {
    if (!this.config.apiKey) {
      console.warn('⚠️ MISP API key not configured');
      
      if (this.config.useOfficialFeeds) {
        console.log('📡 Using official MISP feeds as fallback...');
        try {
          return await this.fetchFromOfficialFeeds();
        } catch (error) {
          console.error('❌ Failed to fetch from official feeds:', error);
          return this.generateSimulatedData();
        }
      } else {
        console.log('🔄 Using simulated data');
        return this.generateSimulatedData();
      }
    }

    try {
      console.log('📡 Fetching threat intelligence from MISP...');
      
      // Fetch recent attributes (IOCs)
      const attributes = await this.fetchRecentAttributes();
      
      // Fetch threat actor information from galaxies
      const threatActors = await this.fetchThreatActors();
      
      // Fetch campaign information
      const campaigns = await this.fetchCampaigns();
      
      // Fetch vulnerability data
      const vulnerabilities = await this.fetchVulnerabilities();

      // Process and categorize the data
      const iocs = this.processIOCs(attributes);
      
      this.cachedData = {
        iocs,
        threatActors,
        campaigns,
        vulnerabilities,
        lastUpdate: new Date()
      };

      this.lastFetch = new Date();
      console.log(`✅ Successfully fetched threat intelligence: ${iocs.ips.length} IPs, ${iocs.domains.length} domains, ${threatActors.length} threat actors`);
      
      this.emit('dataUpdated', this.cachedData);
      return this.cachedData;
    } catch (error) {
      console.error('❌ Error fetching MISP threat intelligence:', error);
      this.emit('error', error);
      return this.cachedData; // Return cached data on error
    }
  }

  private async fetchRecentAttributes(): Promise<MISPAttribute[]> {
    const searchCriteria = {
      returnFormat: 'json',
      page: 1,
      limit: 1000,
      timestamp: Math.floor(Date.now() / 1000) - (24 * 60 * 60), // Last 24 hours
      to_ids: true, // Only IOCs
      deleted: false,
      enforceWarninglist: false,
      includeEventTags: true,
      includeSightings: true
    };

    const response = await this.makeAPIRequest('/attributes/restSearch', 'POST', searchCriteria);
    return response.response?.Attribute || [];
  }

  private async fetchThreatActors(): Promise<any[]> {
    try {
      // Fetch threat actor galaxy clusters
      const response = await this.makeAPIRequest('/galaxy_clusters/restSearch', 'POST', {
        returnFormat: 'json',
        galaxy_id: 'mitre-intrusion-set',
        limit: 500
      });

      const clusters = response.response?.GalaxyCluster || [];
      
      return clusters.map((cluster: any) => ({
        name: cluster.value,
        aliases: cluster.meta?.synonyms || [],
        description: cluster.description,
        tactics: this.extractTactics(cluster.meta),
        techniques: this.extractTechniques(cluster.meta),
        attribution: cluster.meta?.attribution || 'Unknown',
        confidence: this.calculateConfidence(cluster)
      }));
    } catch (error) {
      console.warn('⚠️ Could not fetch threat actors from MISP:', error);
      return [];
    }
  }

  private async fetchCampaigns(): Promise<any[]> {
    try {
      const response = await this.makeAPIRequest('/galaxy_clusters/restSearch', 'POST', {
        returnFormat: 'json',
        galaxy_id: 'mitre-campaign',
        limit: 200
      });

      const clusters = response.response?.GalaxyCluster || [];
      
      return clusters.map((cluster: any) => ({
        name: cluster.value,
        description: cluster.description,
        firstSeen: cluster.meta?.['first-seen'] || 'Unknown',
        lastSeen: cluster.meta?.['last-seen'] || 'Unknown',
        targetSectors: cluster.meta?.['target-sector'] || [],
        attribution: cluster.meta?.attribution || []
      }));
    } catch (error) {
      console.warn('⚠️ Could not fetch campaigns from MISP:', error);
      return [];
    }
  }

  private async fetchVulnerabilities(): Promise<any[]> {
    try {
      const response = await this.makeAPIRequest('/attributes/restSearch', 'POST', {
        returnFormat: 'json',
        type: 'vulnerability',
        limit: 500,
        timestamp: Math.floor(Date.now() / 1000) - (7 * 24 * 60 * 60) // Last 7 days
      });

      const attributes = response.response?.Attribute || [];
      
      return attributes.map((attr: MISPAttribute) => ({
        cve: attr.value,
        severity: this.determineSeverity(attr.tags),
        description: attr.comment || 'No description available',
        exploits: this.extractExploitReferences(attr)
      }));
    } catch (error) {
      console.warn('⚠️ Could not fetch vulnerabilities from MISP:', error);
      return [];
    }
  }

  private processIOCs(attributes: MISPAttribute[]) {
    const iocs = {
      ips: [] as string[],
      domains: [] as string[],
      urls: [] as string[],
      hashes: [] as { type: string; value: string }[],
      emails: [] as string[]
    };

    attributes.forEach(attr => {
      switch (attr.type) {
        case 'ip-src':
        case 'ip-dst':
          if (!iocs.ips.includes(attr.value)) {
            iocs.ips.push(attr.value);
          }
          break;
        case 'domain':
        case 'hostname':
          if (!iocs.domains.includes(attr.value)) {
            iocs.domains.push(attr.value);
          }
          break;
        case 'url':
        case 'uri':
          if (!iocs.urls.includes(attr.value)) {
            iocs.urls.push(attr.value);
          }
          break;
        case 'md5':
        case 'sha1':
        case 'sha256':
        case 'sha512':
          iocs.hashes.push({ type: attr.type, value: attr.value });
          break;
        case 'email':
        case 'email-src':
        case 'email-dst':
          if (!iocs.emails.includes(attr.value)) {
            iocs.emails.push(attr.value);
          }
          break;
      }
    });

    return iocs;
  }

  private async makeAPIRequest(endpoint: string, method: 'GET' | 'POST' = 'GET', data?: any): Promise<any> {
    const url = `${this.config.url}${endpoint}`;
    const headers: Record<string, string> = {
      'Authorization': this.config.apiKey,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };

    const requestOptions: RequestInit = {
      method,
      headers,
      body: data ? JSON.stringify(data) : undefined
    };

    const response = await fetch(url, requestOptions);
    
    if (!response.ok) {
      throw new Error(`MISP API request failed: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  }

  private extractTactics(meta: any): string[] {
    return meta?.['kill-chain-phases'] || [];
  }

  private extractTechniques(meta: any): string[] {
    return meta?.['mitre-attack-technique'] || [];
  }

  private calculateConfidence(cluster: any): number {
    // Calculate confidence based on sightings, sources, and metadata
    let confidence = 50; // Base confidence
    
    if (cluster.source && cluster.source !== 'Unknown') confidence += 20;
    if (cluster.authors && cluster.authors.length > 0) confidence += 15;
    if (cluster.published) confidence += 10;
    if (cluster.meta?.reliability) confidence += 5;
    
    return Math.min(confidence, 100);
  }

  private determineSeverity(tags?: MISPTag[]): string {
    if (!tags) return 'Unknown';
    
    const severityTags = tags.filter(tag => 
      tag.name.includes('severity:') || 
      tag.name.includes('cvss:') ||
      tag.name.includes('critical') ||
      tag.name.includes('high') ||
      tag.name.includes('medium') ||
      tag.name.includes('low')
    );
    
    if (severityTags.some(tag => tag.name.includes('critical'))) return 'Critical';
    if (severityTags.some(tag => tag.name.includes('high'))) return 'High';
    if (severityTags.some(tag => tag.name.includes('medium'))) return 'Medium';
    if (severityTags.some(tag => tag.name.includes('low'))) return 'Low';
    
    return 'Unknown';
  }

  private extractExploitReferences(attr: MISPAttribute): string[] {
    // Extract exploit references from comments and related attributes
    const exploits: string[] = [];
    
    if (attr.comment && attr.comment.includes('exploit')) {
      exploits.push(attr.comment);
    }
    
    return exploits;
  }

  private generateSimulatedData(): ThreatIntelligenceData {
    console.log('🔄 Generating simulated threat intelligence data (MISP API key not configured)');
    
    return {
      iocs: {
        ips: [
          '185.220.101.32', '91.219.237.244', '45.155.205.12', '178.128.83.165',
          '134.195.196.26', '192.42.116.16', '185.220.102.240', '199.87.154.255'
        ],
        domains: [
          'malicious-domain.com', 'phishing-site.net', 'c2-server.org',
          'fake-bank.info', 'trojan-host.biz', 'ransomware-c2.io'
        ],
        urls: [
          'http://malicious-domain.com/payload.exe',
          'https://phishing-site.net/login.php',
          'http://c2-server.org/beacon'
        ],
        hashes: [
          { type: 'md5', value: 'c99c34d1b049d88b21db5c9f4a89b5c5' },
          { type: 'sha256', value: 'e2b4c1d5f8a7b3c6d9e8f1a2b5c7d8e9f1a3b4c6d7e8f9a1b2c3d4e5f6a7b8c9' }
        ],
        emails: [
          'phishing@malicious-domain.com',
          'admin@fake-bank.info'
        ]
      },
      threatActors: [
        {
          name: 'APT29 (Cozy Bear)',
          aliases: ['The Dukes', 'Office Monkeys', 'CozyDuke'],
          description: 'Russian state-sponsored threat group',
          tactics: ['Initial Access', 'Persistence', 'Privilege Escalation'],
          techniques: ['T1566.001', 'T1053.005', 'T1078'],
          attribution: 'Russia SVR',
          confidence: 85
        },
        {
          name: 'Lazarus Group',
          aliases: ['HIDDEN COBRA', 'Guardians of Peace'],
          description: 'North Korean state-sponsored threat group',
          tactics: ['Initial Access', 'Defense Evasion', 'Impact'],
          techniques: ['T1566.002', 'T1055', 'T1485'],
          attribution: 'North Korea',
          confidence: 90
        }
      ],
      campaigns: [
        {
          name: 'SolarWinds Compromise',
          description: 'Supply chain attack targeting SolarWinds Orion platform',
          firstSeen: '2020-03-01',
          lastSeen: '2020-12-13',
          targetSectors: ['Government', 'Technology', 'Consulting'],
          attribution: ['APT29']
        }
      ],
      vulnerabilities: [
        {
          cve: 'CVE-2024-0001',
          severity: 'Critical',
          description: 'Remote code execution vulnerability',
          exploits: ['Active exploitation observed']
        }
      ],
      lastUpdate: new Date()
    };
  }

  public getThreatIntelligence(): ThreatIntelligenceData {
    return this.cachedData;
  }

  public async getIPReputation(ip: string): Promise<{ score: number; tags: string[]; sightings: number }> {
    const iocs = this.cachedData.iocs;
    const isMalicious = iocs.ips.includes(ip);
    
    return {
      score: isMalicious ? 85 : Math.random() * 30, // High score if malicious, random low score otherwise
      tags: isMalicious ? ['malicious', 'c2-server', 'botnet'] : ['clean'],
      sightings: isMalicious ? Math.floor(Math.random() * 50) + 10 : 0
    };
  }

  public async getDomainReputation(domain: string): Promise<{ score: number; tags: string[]; category: string }> {
    const iocs = this.cachedData.iocs;
    const isMalicious = iocs.domains.includes(domain);
    
    return {
      score: isMalicious ? 80 : Math.random() * 25,
      tags: isMalicious ? ['phishing', 'malware-hosting'] : ['clean'],
      category: isMalicious ? 'malicious' : 'benign'
    };
  }

  public isInitialized(): boolean {
    return this.initialized;
  }

  public getLastUpdate(): Date {
    return this.lastFetch;
  }

  /**
   * Load official MISP feed configurations from the latest defaults
   * Based on: https://github.com/MISP/MISP/blob/2.4/app/files/feed-metadata/defaults.json
   */
  private loadOfficialFeeds(): void {
    this.officialFeeds = [
      {
        name: "ELLIO: IP Feed (Community version)",
        provider: "ellio.tech",
        url: "https://cdn.ellio.tech/community-feed",
        enabled: true,
        distribution: "0",
        source_format: "freetext",
        fixed_event: true,
        delta_merge: true,
        publish: true,
        override_ids: false,
        input_source: "network",
        settings: { csv: { value: "", delimiter: "," }, common: { excluderegex: "" } },
        tags: [{ name: 'osint:source-type="block-or-filter-list"', colour: "#004f89" }]
      },
      {
        name: "CIRCL OSINT Feed",
        provider: "CIRCL",
        url: "https://www.circl.lu/doc/misp/feed-osint",
        enabled: true,
        distribution: "3",
        source_format: "misp",
        fixed_event: false,
        delta_merge: false,
        publish: false,
        override_ids: false,
        input_source: "network",
        settings: { csv: { value: "", delimiter: "" }, common: { excluderegex: "" } }
      },
      {
        name: "The Botvrij.eu Data",
        provider: "Botvrij.eu",
        url: "https://www.botvrij.eu/data/feed-osint",
        enabled: true,
        distribution: "3",
        source_format: "misp",
        fixed_event: false,
        delta_merge: false,
        publish: false,
        override_ids: false,
        input_source: "network",
        settings: { csv: { value: "", delimiter: "" }, common: { excluderegex: "" } }
      },
      {
        name: "blockrules of rules.emergingthreats.net",
        provider: "rules.emergingthreats.net",
        url: "https://rules.emergingthreats.net/blockrules/compromised-ips.txt",
        enabled: true,
        distribution: "0",
        source_format: "csv",
        fixed_event: true,
        delta_merge: true,
        publish: false,
        override_ids: true,
        input_source: "network",
        settings: { csv: { value: "1" } },
        tags: [{ name: 'osint:source-type="block-or-filter-list"', colour: "#004f89" }]
      },
      {
        name: "Tor exit nodes",
        provider: "TOR Node List from dan.me.uk",
        url: "https://www.dan.me.uk/torlist/?exit",
        enabled: true,
        distribution: "0",
        source_format: "csv",
        fixed_event: true,
        delta_merge: true,
        publish: false,
        override_ids: false,
        input_source: "network",
        settings: { csv: { value: "1" } },
        tags: [{ name: 'osint:source-type="block-or-filter-list"', colour: "#004f89" }]
      },
      {
        name: "Phishing.Database - New domains of today",
        provider: "Phishing.Database",
        url: "https://phish.co.za/latest/phishing-domains-NEW-today.txt",
        enabled: true,
        distribution: "3",
        source_format: "csv",
        fixed_event: true,
        delta_merge: true,
        publish: false,
        override_ids: false,
        input_source: "network",
        settings: { csv: { value: "", delimiter: "" }, common: { excluderegex: "" } }
      },
      {
        name: "Phishing.Database - New IPs of today",
        provider: "Phishing.Database",
        url: "https://phish.co.za/latest/phishing-IPs-NEW-today.txt",
        enabled: true,
        distribution: "3",
        source_format: "csv",
        fixed_event: true,
        delta_merge: true,
        publish: false,
        override_ids: false,
        input_source: "network",
        settings: { csv: { value: "", delimiter: "" }, common: { excluderegex: "" } }
      },
      {
        name: "Phishing.Database - New URLs of today",
        provider: "Phishing.Database", 
        url: "https://phish.co.za/latest/phishing-links-NEW-today.txt",
        enabled: true,
        distribution: "3",
        source_format: "csv",
        fixed_event: true,
        delta_merge: true,
        publish: false,
        override_ids: false,
        input_source: "network",
        settings: { csv: { value: "", delimiter: "" }, common: { excluderegex: "" } }
      }
    ];

    console.log(`📋 Loaded ${this.officialFeeds.length} official MISP feed configurations`);
  }

  /**
   * Fetch threat intelligence from official MISP feeds if API is not available
   */
  public async fetchFromOfficialFeeds(): Promise<ThreatIntelligenceData> {
    console.log('📡 Fetching threat intelligence from official MISP feeds...');
    
    const aggregatedData: ThreatIntelligenceData = {
      iocs: { ips: [], domains: [], urls: [], hashes: [], emails: [] },
      threatActors: [],
      campaigns: [],
      vulnerabilities: [],
      lastUpdate: new Date()
    };

    const enabledFeeds = this.officialFeeds.filter(feed => 
      feed.enabled && (!this.config.enabledFeeds || this.config.enabledFeeds.includes(feed.name))
    );

    console.log(`🔄 Processing ${enabledFeeds.length} enabled feeds...`);

    for (const feed of enabledFeeds) {
      try {
        console.log(`📥 Fetching data from ${feed.name} (${feed.provider})`);
        const feedData = await this.fetchFeedData(feed);
        this.mergeFeedData(aggregatedData, feedData, feed);
      } catch (error) {
        console.warn(`⚠️ Failed to fetch data from feed ${feed.name}:`, error);
      }
    }

    console.log(`✅ Successfully aggregated threat intelligence from feeds: ${aggregatedData.iocs.ips.length} IPs, ${aggregatedData.iocs.domains.length} domains`);
    return aggregatedData;
  }

  private async fetchFeedData(feed: MISPFeedConfig): Promise<any> {
    const response = await fetch(feed.url, {
      method: 'GET',
      headers: {
        'Accept': 'text/plain,application/json',
        'User-Agent': 'MISP-ThreatIntelligence/1.0'
      }
    });

    if (!response.ok) {
      throw new Error(`Feed request failed: ${response.status} ${response.statusText}`);
    }

    const contentType = response.headers.get('content-type') || '';
    
    if (feed.source_format === 'misp' || contentType.includes('application/json')) {
      return await response.json();
    } else {
      // Handle CSV and freetext formats
      const text = await response.text();
      return this.parseFeedText(text, feed);
    }
  }

  private parseFeedText(text: string, feed: MISPFeedConfig): any {
    const lines = text.split('\n').filter(line => line.trim() && !line.startsWith('#'));
    const indicators: string[] = [];

    lines.forEach(line => {
      const trimmed = line.trim();
      if (trimmed) {
        // Extract indicators based on feed type
        if (feed.name.includes('IP') || feed.name.includes('compromised-ips')) {
          // IP indicators
          const ipMatch = trimmed.match(/\b(?:[0-9]{1,3}\.){3}[0-9]{1,3}\b/);
          if (ipMatch) indicators.push(ipMatch[0]);
        } else if (feed.name.includes('domain') || feed.name.includes('phishing-domains')) {
          // Domain indicators
          if (this.isValidDomain(trimmed)) indicators.push(trimmed);
        } else if (feed.name.includes('URL') || feed.name.includes('links')) {
          // URL indicators
          if (this.isValidURL(trimmed)) indicators.push(trimmed);
        } else {
          // Generic indicator
          indicators.push(trimmed);
        }
      }
    });

    return { indicators, metadata: { feed: feed.name, provider: feed.provider } };
  }

  private mergeFeedData(aggregated: ThreatIntelligenceData, feedData: any, feed: MISPFeedConfig): void {
    if (feedData.indicators) {
      feedData.indicators.forEach((indicator: string) => {
        if (this.isValidIP(indicator)) {
          if (!aggregated.iocs.ips.includes(indicator)) {
            aggregated.iocs.ips.push(indicator);
          }
        } else if (this.isValidDomain(indicator)) {
          if (!aggregated.iocs.domains.includes(indicator)) {
            aggregated.iocs.domains.push(indicator);
          }
        } else if (this.isValidURL(indicator)) {
          if (!aggregated.iocs.urls.includes(indicator)) {
            aggregated.iocs.urls.push(indicator);
          }
        }
      });
    }

    // Handle MISP format feed data
    if (feedData.Event || feedData.response) {
      const events = feedData.Event ? [feedData.Event] : (feedData.response || []);
      events.forEach((event: any) => {
        if (event.Attribute) {
          event.Attribute.forEach((attr: any) => {
            this.processAttributeFromFeed(aggregated, attr);
          });
        }
      });
    }
  }

  private processAttributeFromFeed(aggregated: ThreatIntelligenceData, attr: any): void {
    switch (attr.type) {
      case 'ip-src':
      case 'ip-dst':
        if (!aggregated.iocs.ips.includes(attr.value)) {
          aggregated.iocs.ips.push(attr.value);
        }
        break;
      case 'domain':
      case 'hostname':
        if (!aggregated.iocs.domains.includes(attr.value)) {
          aggregated.iocs.domains.push(attr.value);
        }
        break;
      case 'url':
      case 'uri':
        if (!aggregated.iocs.urls.includes(attr.value)) {
          aggregated.iocs.urls.push(attr.value);
        }
        break;
      case 'email':
      case 'email-src':
      case 'email-dst':
        if (!aggregated.iocs.emails.includes(attr.value)) {
          aggregated.iocs.emails.push(attr.value);
        }
        break;
    }
  }

  private isValidIP(value: string): boolean {
    const ipRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    return ipRegex.test(value);
  }

  private isValidDomain(value: string): boolean {
    const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/;
    return domainRegex.test(value) && !this.isValidIP(value);
  }

  private isValidURL(value: string): boolean {
    try {
      new URL(value);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Get available official feeds
   */
  public getOfficialFeeds(): MISPFeedConfig[] {
    return this.officialFeeds;
  }

  /**
   * Update configuration for specific feeds
   */
  public updateFeedConfiguration(feedName: string, enabled: boolean): void {
    const feed = this.officialFeeds.find(f => f.name === feedName);
    if (feed) {
      feed.enabled = enabled;
      console.log(`🔄 Updated feed ${feedName}: ${enabled ? 'enabled' : 'disabled'}`);
    }
  }

  /**
   * Enhanced threat intelligence with CIRCL tools integration
   */
  public async getEnhancedThreatIntelligence(): Promise<any> {
    try {
      console.log('🔍 Fetching enhanced threat intelligence with CIRCL tools...');
      
      // Get PyMISP threat intelligence
      const pyMispIntel = await circlTools.getPyMISPThreatIntelligence();
      
      // Combine with existing MISP data
      const standardIntel = await this.fetchThreatIntelligence();
      
      const enhanced = {
        timestamp: new Date().toISOString(),
        sources: {
          misp_official_feeds: standardIntel,
          pymisp_circl: pyMispIntel,
        },
        circl_tools_status: await circlTools.constructor.name ? 'available' : 'unavailable',
        combined_iocs: {
          ips: [...new Set([
            ...(standardIntel.iocs?.ips || []),
            ...(pyMispIntel.iocs?.ips || [])
          ])],
          domains: [...new Set([
            ...(standardIntel.iocs?.domains || []),
            ...(pyMispIntel.iocs?.domains || [])
          ])],
          urls: [...new Set([
            ...(standardIntel.iocs?.urls || []),
            ...(pyMispIntel.iocs?.urls || [])
          ])],
          hashes: [...new Set([
            ...(standardIntel.iocs?.hashes || [])
          ])],
          emails: standardIntel.iocs?.emails || []
        },
        threat_actors: standardIntel.threat_actors || [],
        total_enhanced_indicators: 0
      };

      // Calculate totals
      enhanced.total_enhanced_indicators = 
        enhanced.combined_iocs.ips.length +
        enhanced.combined_iocs.domains.length +
        enhanced.combined_iocs.urls.length +
        enhanced.combined_iocs.hashes.length +
        enhanced.combined_iocs.emails.length;

      console.log(`✅ Enhanced threat intelligence: ${enhanced.total_enhanced_indicators} total indicators`);
      return enhanced;

    } catch (error) {
      console.error('Error fetching enhanced threat intelligence:', error);
      return {
        error: 'Failed to fetch enhanced threat intelligence',
        details: error instanceof Error ? error.message : 'Unknown error',
        fallback: await this.fetchThreatIntelligence()
      };
    }
  }

  /**
   * Comprehensive threat assessment for a target
   */
  public async assessTarget(target: string, type: 'ip' | 'domain' | 'url' | 'asn'): Promise<any> {
    try {
      console.log(`🎯 Performing comprehensive assessment for ${type}: ${target}`);
      
      // Use CIRCL tools for comprehensive assessment
      const assessment = await circlTools.comprehensiveThreatAssessment(target, type);
      
      // Add MISP-specific intelligence
      const mispData = await this.searchInFeeds(target);
      assessment.misp_matches = mispData;
      
      // Enhance risk scoring with MISP data
      if (mispData.length > 0) {
        assessment.risk_score += mispData.length * 5;
        assessment.recommendations.push(`Found in ${mispData.length} MISP feed(s) - investigate immediately`);
      }

      return assessment;
      
    } catch (error) {
      console.error(`Error assessing target ${target}:`, error);
      return {
        error: 'Assessment failed',
        target,
        type,
        details: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Search for a target in current feeds
   */
  private async searchInFeeds(target: string): Promise<any[]> {
    const matches: any[] = [];
    
    // Search in aggregated data
    if (this.lastAggregatedData) {
      const { iocs } = this.lastAggregatedData;
      
      if (iocs.ips.includes(target) || 
          iocs.domains.includes(target) || 
          iocs.urls.includes(target) ||
          iocs.emails.includes(target)) {
        matches.push({
          type: 'official_feed',
          source: 'MISP Official Feeds',
          confidence: 'high',
          last_seen: new Date().toISOString()
        });
      }
    }
    
    return matches;
  }
}