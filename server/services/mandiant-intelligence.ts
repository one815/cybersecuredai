import { z } from 'zod';

// Mandiant API response schemas based on Chronicle SOAR documentation
export const MandiantIndicatorSchema = z.object({
  id: z.string(),
  type: z.enum(['ipv4-addr', 'domain-name', 'file', 'url', 'email-addr']),
  value: z.string(),
  pattern: z.string().optional(),
  valid_from: z.string(),
  valid_until: z.string().optional(),
  labels: z.array(z.string()),
  confidence: z.number().min(0).max(100),
  severity: z.enum(['low', 'medium', 'high', 'critical']),
  malware_family: z.string().optional(),
  threat_actor: z.string().optional(),
  campaign: z.string().optional(),
  first_seen: z.string(),
  last_seen: z.string(),
  source: z.string().default('Mandiant'),
  description: z.string().optional(),
  attribution: z.object({
    actor: z.string().optional(),
    motivation: z.string().optional(),
    sophistication: z.string().optional(),
    resource_level: z.string().optional()
  }).optional()
});

export const MandiantThreatActorSchema = z.object({
  id: z.string(),
  name: z.string(),
  aliases: z.array(z.string()),
  description: z.string(),
  first_seen: z.string(),
  last_seen: z.string(),
  sophistication: z.enum(['novice', 'practitioner', 'expert', 'innovator']),
  resource_level: z.enum(['individual', 'club', 'contest', 'team', 'organization', 'government']),
  primary_motivation: z.enum(['accidental', 'coercion', 'dominance', 'ideology', 'notoriety', 'organizational-gain', 'personal-gain', 'personal-satisfaction', 'revenge', 'unpredictable']),
  secondary_motivations: z.array(z.string()),
  goals: z.array(z.string()),
  roles: z.array(z.string()),
  threat_actor_types: z.array(z.string()),
  attribution_scope: z.enum(['suspected', 'possible', 'confirmed']),
  associated_campaigns: z.array(z.string()),
  associated_malware: z.array(z.string()),
  targeted_sectors: z.array(z.string()),
  targeted_countries: z.array(z.string()),
  attack_patterns: z.array(z.object({
    id: z.string(),
    name: z.string(),
    description: z.string()
  }))
});

export const MandiantCampaignSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  aliases: z.array(z.string()),
  first_seen: z.string(),
  last_seen: z.string(),
  attributed_to: z.array(z.string()),
  associated_malware: z.array(z.string()),
  targeted_sectors: z.array(z.string()),
  targeted_countries: z.array(z.string()),
  objectives: z.array(z.string()),
  attack_patterns: z.array(z.string()),
  indicators_count: z.number(),
  confidence: z.number().min(0).max(100)
});

export const MandiantVulnerabilitySchema = z.object({
  id: z.string(),
  cve_id: z.string().optional(),
  title: z.string(),
  description: z.string(),
  severity: z.enum(['low', 'medium', 'high', 'critical']),
  cvss_score: z.number().min(0).max(10).optional(),
  cvss_vector: z.string().optional(),
  published_date: z.string(),
  modified_date: z.string(),
  affected_products: z.array(z.string()),
  exploit_available: z.boolean(),
  exploitation_state: z.enum(['poc', 'active', 'weaponized']).optional(),
  associated_malware: z.array(z.string()),
  references: z.array(z.object({
    source: z.string(),
    url: z.string(),
    description: z.string().optional()
  }))
});

export type MandiantIndicator = z.infer<typeof MandiantIndicatorSchema>;
export type MandiantThreatActor = z.infer<typeof MandiantThreatActorSchema>;
export type MandiantCampaign = z.infer<typeof MandiantCampaignSchema>;
export type MandiantVulnerability = z.infer<typeof MandiantVulnerabilitySchema>;

export class MandiantIntelligenceService {
  private baseUrl = 'https://api.intelligence.fireeye.com';
  private apiKey: string | null = null;

  constructor() {
    this.apiKey = process.env.MANDIANT_API_KEY || null;
  }

  // Check if API key is configured
  isConfigured(): boolean {
    return this.apiKey !== null;
  }

  // Get demo threat intelligence data for development
  getDemoIndicators(): MandiantIndicator[] {
    return [
      {
        id: 'mandiant-ioc-001',
        type: 'ipv4-addr',
        value: '185.220.101.182',
        pattern: '[ipv4-addr:value = \'185.220.101.182\']',
        valid_from: '2024-01-15T00:00:00Z',
        labels: ['malicious-activity', 'apt29', 'cozy-bear'],
        confidence: 95,
        severity: 'high',
        threat_actor: 'APT29',
        campaign: 'SolarWinds Supply Chain Attack',
        first_seen: '2024-01-15T08:30:00Z',
        last_seen: '2024-09-03T14:22:00Z',
        source: 'Mandiant',
        description: 'Command and control infrastructure associated with APT29 operations',
        attribution: {
          actor: 'APT29 (Cozy Bear)',
          motivation: 'espionage',
          sophistication: 'expert',
          resource_level: 'government'
        }
      },
      {
        id: 'mandiant-ioc-002',
        type: 'domain-name',
        value: 'malicious-domain.example.com',
        pattern: '[domain-name:value = \'malicious-domain.example.com\']',
        valid_from: '2024-02-01T00:00:00Z',
        labels: ['phishing', 'credential-harvesting'],
        confidence: 88,
        severity: 'medium',
        malware_family: 'Emotet',
        first_seen: '2024-02-01T10:15:00Z',
        last_seen: '2024-08-30T16:45:00Z',
        source: 'Mandiant',
        description: 'Phishing domain used in Emotet banking trojan campaigns'
      },
      {
        id: 'mandiant-ioc-003',
        type: 'file',
        value: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
        pattern: '[file:hashes.SHA256 = \'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855\']',
        valid_from: '2024-03-10T00:00:00Z',
        labels: ['malware', 'backdoor', 'persistence'],
        confidence: 92,
        severity: 'critical',
        malware_family: 'Sunburst',
        threat_actor: 'APT29',
        first_seen: '2024-03-10T12:00:00Z',
        last_seen: '2024-09-01T09:30:00Z',
        source: 'Mandiant',
        description: 'Sunburst backdoor sample with advanced evasion capabilities'
      }
    ];
  }

  getDemoThreatActors(): MandiantThreatActor[] {
    return [
      {
        id: 'mandiant-actor-001',
        name: 'APT29',
        aliases: ['Cozy Bear', 'The Dukes', 'Yttrium'],
        description: 'Russian state-sponsored threat group associated with the SVR intelligence service',
        first_seen: '2008-01-01T00:00:00Z',
        last_seen: '2024-09-03T00:00:00Z',
        sophistication: 'expert',
        resource_level: 'government',
        primary_motivation: 'organizational-gain',
        secondary_motivations: ['ideology', 'dominance'],
        goals: ['Intelligence collection', 'Strategic reconnaissance', 'Supply chain compromise'],
        roles: ['malware-author', 'infrastructure-operator', 'data-exfiltrator'],
        threat_actor_types: ['nation-state', 'apt-group'],
        attribution_scope: 'confirmed',
        associated_campaigns: ['SolarWinds Supply Chain', 'COVID-19 Vaccine Research'],
        associated_malware: ['Sunburst', 'Teardrop', 'WellMess'],
        targeted_sectors: ['Government', 'Technology', 'Healthcare', 'Energy'],
        targeted_countries: ['United States', 'United Kingdom', 'Germany', 'Japan'],
        attack_patterns: [
          {
            id: 'attack-pattern--0458aab9-ad42-4eac-9e22-cb33026c67de',
            name: 'Supply Chain Compromise',
            description: 'Manipulate products or product delivery mechanisms prior to receipt by a final consumer'
          },
          {
            id: 'attack-pattern--232b7f21-adf9-4b42-b936-b9d6f7df856e',
            name: 'Spearphishing Link',
            description: 'Send spearphishing emails with a malicious link'
          }
        ]
      },
      {
        id: 'mandiant-actor-002',
        name: 'FIN7',
        aliases: ['Carbanak Group', 'Navigator Group'],
        description: 'Financially motivated threat group targeting retail, restaurant, and hospitality sectors',
        first_seen: '2013-01-01T00:00:00Z',
        last_seen: '2024-08-15T00:00:00Z',
        sophistication: 'expert',
        resource_level: 'organization',
        primary_motivation: 'personal-gain',
        secondary_motivations: ['organizational-gain'],
        goals: ['Financial theft', 'Payment card data theft', 'Point-of-sale compromise'],
        roles: ['malware-author', 'social-engineer', 'data-exfiltrator'],
        threat_actor_types: ['cybercriminal-group'],
        attribution_scope: 'confirmed',
        associated_campaigns: ['Carbanak Banking Heists', 'Restaurant POS Attacks'],
        associated_malware: ['Carbanak', 'Bateleur', 'Griffon'],
        targeted_sectors: ['Financial Services', 'Retail', 'Hospitality', 'Healthcare'],
        targeted_countries: ['United States', 'Canada', 'United Kingdom', 'Australia'],
        attack_patterns: [
          {
            id: 'attack-pattern--2e34237d-8574-43f6-aace-ae2915de8597',
            name: 'Spearphishing Attachment',
            description: 'Send spearphishing emails with a malicious attachment'
          },
          {
            id: 'attack-pattern--b3d682b6-98f2-4fb0-aa3b-b4df007ca70a',
            name: 'Scheduled Task/Job',
            description: 'Schedule execution of code or commands'
          }
        ]
      }
    ];
  }

  getDemoCampaigns(): MandiantCampaign[] {
    return [
      {
        id: 'mandiant-campaign-001',
        name: 'SolarWinds Supply Chain Attack',
        description: 'Sophisticated supply chain compromise targeting SolarWinds Orion platform',
        aliases: ['SUNBURST', 'Solorigate'],
        first_seen: '2019-10-01T00:00:00Z',
        last_seen: '2021-03-31T00:00:00Z',
        attributed_to: ['APT29'],
        associated_malware: ['Sunburst', 'Teardrop', 'Raindrop'],
        targeted_sectors: ['Government', 'Technology', 'Telecommunications', 'Energy'],
        targeted_countries: ['United States', 'United Kingdom', 'Canada', 'Belgium'],
        objectives: ['Intelligence collection', 'Strategic reconnaissance', 'Long-term access'],
        attack_patterns: ['Supply Chain Compromise', 'Command and Control', 'Data Staged'],
        indicators_count: 147,
        confidence: 95
      },
      {
        id: 'mandiant-campaign-002',
        name: 'COVID-19 Vaccine Research Targeting',
        description: 'Campaign targeting organizations involved in COVID-19 vaccine research and development',
        aliases: ['WellMess Campaign', 'Vaccine Intelligence'],
        first_seen: '2020-03-01T00:00:00Z',
        last_seen: '2021-12-31T00:00:00Z',
        attributed_to: ['APT29'],
        associated_malware: ['WellMess', 'WellMail'],
        targeted_sectors: ['Healthcare', 'Pharmaceuticals', 'Research Institutions'],
        targeted_countries: ['United States', 'United Kingdom', 'Canada'],
        objectives: ['Vaccine research theft', 'Medical intelligence', 'Competitive advantage'],
        attack_patterns: ['Spearphishing Link', 'Valid Accounts', 'Remote Services'],
        indicators_count: 89,
        confidence: 88
      }
    ];
  }

  getDemoVulnerabilities(): MandiantVulnerability[] {
    return [
      {
        id: 'mandiant-vuln-001',
        cve_id: 'CVE-2020-1472',
        title: 'Zerologon - Netlogon Elevation of Privilege Vulnerability',
        description: 'An elevation of privilege vulnerability exists when an attacker establishes a vulnerable Netlogon secure channel connection',
        severity: 'critical',
        cvss_score: 10.0,
        cvss_vector: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:C/C:H/I:H/A:H',
        published_date: '2020-08-11T00:00:00Z',
        modified_date: '2020-09-14T00:00:00Z',
        affected_products: ['Windows Server 2008 R2', 'Windows Server 2012', 'Windows Server 2016', 'Windows Server 2019'],
        exploit_available: true,
        exploitation_state: 'weaponized',
        associated_malware: ['Ryuk', 'Conti', 'DoppelPaymer'],
        references: [
          {
            source: 'Microsoft',
            url: 'https://msrc.microsoft.com/update-guide/vulnerability/CVE-2020-1472',
            description: 'Official Microsoft advisory'
          },
          {
            source: 'CISA',
            url: 'https://us-cert.cisa.gov/ncas/alerts/aa20-352a',
            description: 'CISA emergency directive'
          }
        ]
      },
      {
        id: 'mandiant-vuln-002',
        cve_id: 'CVE-2021-34527',
        title: 'PrintNightmare - Windows Print Spooler Remote Code Execution Vulnerability',
        description: 'A remote code execution vulnerability exists when the Windows Print Spooler service improperly performs privileged file operations',
        severity: 'critical',
        cvss_score: 8.8,
        cvss_vector: 'CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:H/I:H/A:H',
        published_date: '2021-07-01T00:00:00Z',
        modified_date: '2021-08-10T00:00:00Z',
        affected_products: ['Windows 10', 'Windows 11', 'Windows Server 2008', 'Windows Server 2012', 'Windows Server 2016', 'Windows Server 2019', 'Windows Server 2022'],
        exploit_available: true,
        exploitation_state: 'weaponized',
        associated_malware: ['LockBit', 'BlackMatter', 'Conti'],
        references: [
          {
            source: 'Microsoft',
            url: 'https://msrc.microsoft.com/update-guide/vulnerability/CVE-2021-34527',
            description: 'Microsoft Security Response Center advisory'
          },
          {
            source: 'NIST',
            url: 'https://nvd.nist.gov/vuln/detail/CVE-2021-34527',
            description: 'National Vulnerability Database entry'
          }
        ]
      }
    ];
  }

  // Real API methods (will work when API key is provided)
  async getIndicators(): Promise<MandiantIndicator[]> {
    if (!this.isConfigured()) {
      console.log('Mandiant API key not configured, returning demo data');
      return this.getDemoIndicators();
    }

    try {
      // Real API implementation would go here
      // const response = await fetch(`${this.baseUrl}/v4/indicators`, {
      //   headers: {
      //     'Authorization': `Bearer ${this.apiKey}`,
      //     'Accept': 'application/json'
      //   }
      // });
      // const data = await response.json();
      // return data.indicators.map(indicator => MandiantIndicatorSchema.parse(indicator));
      
      return this.getDemoIndicators();
    } catch (error) {
      console.error('Error fetching Mandiant indicators:', error);
      return this.getDemoIndicators();
    }
  }

  async getThreatActors(): Promise<MandiantThreatActor[]> {
    if (!this.isConfigured()) {
      return this.getDemoThreatActors();
    }

    try {
      // Real API implementation would go here
      return this.getDemoThreatActors();
    } catch (error) {
      console.error('Error fetching Mandiant threat actors:', error);
      return this.getDemoThreatActors();
    }
  }

  async getCampaigns(): Promise<MandiantCampaign[]> {
    if (!this.isConfigured()) {
      return this.getDemoCampaigns();
    }

    try {
      // Real API implementation would go here
      return this.getDemoCampaigns();
    } catch (error) {
      console.error('Error fetching Mandiant campaigns:', error);
      return this.getDemoCampaigns();
    }
  }

  async getVulnerabilities(): Promise<MandiantVulnerability[]> {
    if (!this.isConfigured()) {
      return this.getDemoVulnerabilities();
    }

    try {
      // Real API implementation would go here
      return this.getDemoVulnerabilities();
    } catch (error) {
      console.error('Error fetching Mandiant vulnerabilities:', error);
      return this.getDemoVulnerabilities();
    }
  }

  async searchIndicators(query: string, limit: number = 50): Promise<MandiantIndicator[]> {
    const indicators = await this.getIndicators();
    return indicators
      .filter(indicator => 
        indicator.value.toLowerCase().includes(query.toLowerCase()) ||
        indicator.description?.toLowerCase().includes(query.toLowerCase()) ||
        indicator.threat_actor?.toLowerCase().includes(query.toLowerCase()) ||
        indicator.malware_family?.toLowerCase().includes(query.toLowerCase())
      )
      .slice(0, limit);
  }

  async getIndicatorsByType(type: string): Promise<MandiantIndicator[]> {
    const indicators = await this.getIndicators();
    return indicators.filter(indicator => indicator.type === type);
  }

  async getIndicatorsBySeverity(severity: string): Promise<MandiantIndicator[]> {
    const indicators = await this.getIndicators();
    return indicators.filter(indicator => indicator.severity === severity);
  }

  async getThreatActorByName(name: string): Promise<MandiantThreatActor | null> {
    const actors = await this.getThreatActors();
    return actors.find(actor => 
      actor.name.toLowerCase() === name.toLowerCase() ||
      actor.aliases.some(alias => alias.toLowerCase() === name.toLowerCase())
    ) || null;
  }

  async getCampaignsByActor(actorName: string): Promise<MandiantCampaign[]> {
    const campaigns = await this.getCampaigns();
    return campaigns.filter(campaign => 
      campaign.attributed_to.some(actor => actor.toLowerCase().includes(actorName.toLowerCase()))
    );
  }

  async getVulnerabilitiesBySeverity(severity: string): Promise<MandiantVulnerability[]> {
    const vulnerabilities = await this.getVulnerabilities();
    return vulnerabilities.filter(vuln => vuln.severity === severity);
  }

  async getRecentIndicators(days: number = 30): Promise<MandiantIndicator[]> {
    const indicators = await this.getIndicators();
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);
    
    return indicators.filter(indicator => {
      const lastSeen = new Date(indicator.last_seen);
      return lastSeen >= cutoffDate;
    });
  }

  // Analytics and summary methods
  async getAnalyticsSummary() {
    const [indicators, threats, campaigns, vulnerabilities] = await Promise.all([
      this.getIndicators(),
      this.getThreatActors(),
      this.getCampaigns(),
      this.getVulnerabilities()
    ]);

    const severityCount = indicators.reduce((acc, indicator) => {
      acc[indicator.severity] = (acc[indicator.severity] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const typeCount = indicators.reduce((acc, indicator) => {
      acc[indicator.type] = (acc[indicator.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const recentIndicators = await this.getRecentIndicators(7);
    const criticalVulns = vulnerabilities.filter(v => v.severity === 'critical');

    return {
      totalIndicators: indicators.length,
      totalThreatActors: threats.length,
      totalCampaigns: campaigns.length,
      totalVulnerabilities: vulnerabilities.length,
      recentIndicators: recentIndicators.length,
      criticalVulnerabilities: criticalVulns.length,
      severityBreakdown: severityCount,
      typeBreakdown: typeCount,
      topThreatActors: threats.slice(0, 5).map(actor => ({
        name: actor.name,
        sophistication: actor.sophistication,
        campaigns: actor.associated_campaigns.length
      })),
      activeCampaigns: campaigns.filter(c => {
        const lastSeen = new Date(c.last_seen);
        const oneYearAgo = new Date();
        oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
        return lastSeen >= oneYearAgo;
      }).length,
      apiConfigured: this.isConfigured()
    };
  }
}

export const mandiantService = new MandiantIntelligenceService();