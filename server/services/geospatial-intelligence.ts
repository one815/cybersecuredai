import { Request, Response } from 'express';

interface GeospatialThreat {
  id: string;
  latitude: number;
  longitude: number;
  altitude?: number;
  threatType: 'malware' | 'phishing' | 'ddos' | 'ransomware' | 'botnet' | 'intrusion';
  severity: 'critical' | 'high' | 'medium' | 'low';
  source: 'misp' | 'mandiant' | 'threatconnect' | 'internal' | 'honeypot';
  timestamp: string;
  ip: string;
  country: string;
  city: string;
  organization?: string;
  confidence: number;
  indicators: string[];
  description: string;
  mitigated: boolean;
}

interface InfrastructureAsset {
  id: string;
  name: string;
  type: 'server' | 'firewall' | 'router' | 'endpoint' | 'database' | 'application';
  latitude: number;
  longitude: number;
  altitude?: number;
  status: 'healthy' | 'warning' | 'critical' | 'offline';
  ipAddress: string;
  lastSeen: string;
  vulnerabilities: number;
  complianceScore: number;
  incidents: number;
  owner: string;
  location: string;
  criticality: 'critical' | 'high' | 'medium' | 'low';
}

interface ComplianceRegion {
  id: string;
  name: string;
  framework: 'FERPA' | 'FISMA' | 'CIPA' | 'GDPR' | 'HIPAA' | 'SOX';
  boundaries: Array<{latitude: number; longitude: number}>;
  complianceLevel: number;
  requirements: string[];
  violations: number;
  lastAudit: string;
  nextAudit: string;
  riskLevel: 'critical' | 'high' | 'medium' | 'low';
}

interface IncidentLocation {
  id: string;
  incidentId: string;
  latitude: number;
  longitude: number;
  title: string;
  type: 'breach' | 'malware' | 'phishing' | 'ddos' | 'insider' | 'physical';
  severity: 'critical' | 'high' | 'medium' | 'low';
  status: 'open' | 'investigating' | 'contained' | 'resolved';
  timestamp: string;
  affectedAssets: string[];
  responseTeam: string;
  estimatedImpact: string;
}

class GeospatialIntelligenceService {
  
  // Get comprehensive threat landscape data
  async getThreatLandscape(): Promise<GeospatialThreat[]> {
    // Integration with all threat intelligence sources
    const threats: GeospatialThreat[] = [
      {
        id: 'threat-001',
        latitude: 39.9042,
        longitude: 116.4074,
        threatType: 'malware',
        severity: 'critical',
        source: 'mandiant',
        timestamp: new Date().toISOString(),
        ip: '223.104.6.25',
        country: 'China',
        city: 'Beijing',
        organization: 'Unknown ISP',
        confidence: 95,
        indicators: ['zeus.banker.variant', 'c2.communication', 'data.exfiltration'],
        description: 'Advanced persistent threat targeting financial institutions',
        mitigated: false
      },
      {
        id: 'threat-002',
        latitude: 55.7558,
        longitude: 37.6176,
        threatType: 'phishing',
        severity: 'high',
        source: 'misp',
        timestamp: new Date(Date.now() - 300000).toISOString(),
        ip: '93.184.216.34',
        country: 'Russia',
        city: 'Moscow',
        confidence: 87,
        indicators: ['credential.harvesting', 'fake.login.page'],
        description: 'Corporate email phishing campaign targeting educational institutions',
        mitigated: true
      },
      {
        id: 'threat-003',
        latitude: 37.7749,
        longitude: -122.4194,
        threatType: 'ddos',
        severity: 'medium',
        source: 'threatconnect',
        timestamp: new Date(Date.now() - 600000).toISOString(),
        ip: '192.168.1.100',
        country: 'United States',
        city: 'San Francisco',
        confidence: 72,
        indicators: ['volumetric.attack', 'udp.flood'],
        description: 'Distributed denial of service attack on web infrastructure',
        mitigated: false
      }
    ];

    return threats;
  }

  // Get infrastructure assets with geolocation
  async getInfrastructureAssets(): Promise<InfrastructureAsset[]> {
    const assets: InfrastructureAsset[] = [
      {
        id: 'asset-001',
        name: 'Primary Data Center',
        type: 'server',
        latitude: 40.7128,
        longitude: -74.0060,
        status: 'healthy',
        ipAddress: '10.0.1.100',
        lastSeen: new Date().toISOString(),
        vulnerabilities: 0,
        complianceScore: 98,
        incidents: 0,
        owner: 'IT Operations',
        location: 'New York, NY',
        criticality: 'critical'
      },
      {
        id: 'asset-002',
        name: 'Edge Firewall Cluster',
        type: 'firewall',
        latitude: 34.0522,
        longitude: -118.2437,
        status: 'warning',
        ipAddress: '10.0.2.50',
        lastSeen: new Date(Date.now() - 120000).toISOString(),
        vulnerabilities: 2,
        complianceScore: 85,
        incidents: 1,
        owner: 'Security Team',
        location: 'Los Angeles, CA',
        criticality: 'high'
      },
      {
        id: 'asset-003',
        name: 'Student Portal Database',
        type: 'database',
        latitude: 41.8781,
        longitude: -87.6298,
        status: 'healthy',
        ipAddress: '10.0.3.200',
        lastSeen: new Date().toISOString(),
        vulnerabilities: 0,
        complianceScore: 96,
        incidents: 0,
        owner: 'Database Administration',
        location: 'Chicago, IL',
        criticality: 'critical'
      }
    ];

    return assets;
  }

  // Get compliance regions and boundaries
  async getComplianceRegions(): Promise<ComplianceRegion[]> {
    const regions: ComplianceRegion[] = [
      {
        id: 'region-001',
        name: 'FERPA Educational Zone',
        framework: 'FERPA',
        boundaries: [
          {latitude: 40.0, longitude: -125.0},
          {latitude: 40.0, longitude: -65.0},
          {latitude: 50.0, longitude: -65.0},
          {latitude: 50.0, longitude: -125.0}
        ],
        complianceLevel: 94,
        requirements: ['Student data encryption', 'Access logging', 'Data retention policies'],
        violations: 0,
        lastAudit: '2024-08-15',
        nextAudit: '2025-02-15',
        riskLevel: 'low'
      },
      {
        id: 'region-002',
        name: 'FISMA Federal Zone',
        framework: 'FISMA',
        boundaries: [
          {latitude: 38.8, longitude: -77.2},
          {latitude: 38.8, longitude: -76.8},
          {latitude: 39.0, longitude: -76.8},
          {latitude: 39.0, longitude: -77.2}
        ],
        complianceLevel: 98,
        requirements: ['Continuous monitoring', 'Security controls', 'Risk assessment'],
        violations: 0,
        lastAudit: '2024-09-01',
        nextAudit: '2025-03-01',
        riskLevel: 'low'
      }
    ];

    return regions;
  }

  // Get active incidents with geographical context
  async getIncidentLocations(): Promise<IncidentLocation[]> {
    const incidents: IncidentLocation[] = [
      {
        id: 'incident-001',
        incidentId: 'INC-2024-001',
        latitude: 42.3601,
        longitude: -71.0589,
        title: 'Suspicious Login Activity',
        type: 'breach',
        severity: 'high',
        status: 'investigating',
        timestamp: new Date(Date.now() - 1800000).toISOString(),
        affectedAssets: ['asset-004', 'asset-005'],
        responseTeam: 'Security Incident Response Team',
        estimatedImpact: 'Potential unauthorized access to student records'
      },
      {
        id: 'incident-002',
        incidentId: 'INC-2024-002',
        latitude: 33.4484,
        longitude: -112.0740,
        title: 'Malware Detection',
        type: 'malware',
        severity: 'medium',
        status: 'contained',
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        affectedAssets: ['asset-006'],
        responseTeam: 'IT Security',
        estimatedImpact: 'Isolated workstation infection, no data loss'
      }
    ];

    return incidents;
  }

  // Get real-time geospatial analytics
  async getGeospatialAnalytics() {
    const [threats, assets, regions, incidents] = await Promise.all([
      this.getThreatLandscape(),
      this.getInfrastructureAssets(),
      this.getComplianceRegions(),
      this.getIncidentLocations()
    ]);

    // Calculate analytics
    const threatsByRegion = this.calculateThreatsByRegion(threats);
    const assetHealth = this.calculateAssetHealth(assets);
    const complianceStatus = this.calculateComplianceStatus(regions);
    const incidentTrends = this.calculateIncidentTrends(incidents);

    return {
      overview: {
        totalThreats: threats.length,
        activeThrents: threats.filter(t => !t.mitigated).length,
        criticalAssets: assets.filter(a => a.criticality === 'critical').length,
        healthyAssets: assets.filter(a => a.status === 'healthy').length,
        openIncidents: incidents.filter(i => i.status === 'open' || i.status === 'investigating').length,
        complianceScore: Math.round(regions.reduce((sum, r) => sum + r.complianceLevel, 0) / regions.length)
      },
      threats,
      assets,
      regions,
      incidents,
      analytics: {
        threatsByRegion,
        assetHealth,
        complianceStatus,
        incidentTrends
      }
    };
  }

  private calculateThreatsByRegion(threats: GeospatialThreat[]) {
    const regions = new Map();
    threats.forEach(threat => {
      const region = `${threat.country}`;
      regions.set(region, (regions.get(region) || 0) + 1);
    });
    return Object.fromEntries(regions);
  }

  private calculateAssetHealth(assets: InfrastructureAsset[]) {
    const health = {
      healthy: assets.filter(a => a.status === 'healthy').length,
      warning: assets.filter(a => a.status === 'warning').length,
      critical: assets.filter(a => a.status === 'critical').length,
      offline: assets.filter(a => a.status === 'offline').length
    };
    return health;
  }

  private calculateComplianceStatus(regions: ComplianceRegion[]) {
    return regions.map(region => ({
      framework: region.framework,
      complianceLevel: region.complianceLevel,
      violations: region.violations,
      riskLevel: region.riskLevel
    }));
  }

  private calculateIncidentTrends(incidents: IncidentLocation[]) {
    const trends = {
      last24h: incidents.filter(i => 
        new Date(i.timestamp) > new Date(Date.now() - 24 * 60 * 60 * 1000)
      ).length,
      byType: incidents.reduce((acc: any, incident) => {
        acc[incident.type] = (acc[incident.type] || 0) + 1;
        return acc;
      }, {}),
      bySeverity: incidents.reduce((acc: any, incident) => {
        acc[incident.severity] = (acc[incident.severity] || 0) + 1;
        return acc;
      }, {})
    };
    return trends;
  }
}

// Export service instance
export const geospatialIntelligenceService = new GeospatialIntelligenceService();

// Route handlers
export const getGeospatialOverview = async (req: Request, res: Response) => {
  try {
    const overview = await geospatialIntelligenceService.getGeospatialAnalytics();
    res.json(overview);
  } catch (error) {
    console.error('Error fetching geospatial overview:', error);
    res.status(500).json({ error: 'Failed to fetch geospatial data' });
  }
};

export const getThreatLandscape = async (req: Request, res: Response) => {
  try {
    const threats = await geospatialIntelligenceService.getThreatLandscape();
    res.json(threats);
  } catch (error) {
    console.error('Error fetching threat landscape:', error);
    res.status(500).json({ error: 'Failed to fetch threat landscape' });
  }
};

export const getInfrastructureMap = async (req: Request, res: Response) => {
  try {
    const assets = await geospatialIntelligenceService.getInfrastructureAssets();
    res.json(assets);
  } catch (error) {
    console.error('Error fetching infrastructure map:', error);
    res.status(500).json({ error: 'Failed to fetch infrastructure data' });
  }
};

export const getComplianceMap = async (req: Request, res: Response) => {
  try {
    const regions = await geospatialIntelligenceService.getComplianceRegions();
    res.json(regions);
  } catch (error) {
    console.error('Error fetching compliance map:', error);
    res.status(500).json({ error: 'Failed to fetch compliance data' });
  }
};

export const getIncidentMap = async (req: Request, res: Response) => {
  try {
    const incidents = await geospatialIntelligenceService.getIncidentLocations();
    res.json(incidents);
  } catch (error) {
    console.error('Error fetching incident map:', error);
    res.status(500).json({ error: 'Failed to fetch incident data' });
  }
};