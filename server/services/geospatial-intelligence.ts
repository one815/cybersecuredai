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
  type: 'server' | 'firewall' | 'router' | 'endpoint' | 'database' | 'application' | 'camera' | 'sensor' | 'switch' | 'access_point';
  latitude: number; // GPS-level precision (6+ decimal places)
  longitude: number; // GPS-level precision (6+ decimal places)
  altitude?: number; // Floor/building level precision
  status: 'healthy' | 'warning' | 'critical' | 'offline';
  ipAddress: string;
  lastSeen: string;
  vulnerabilities: number;
  complianceScore: number;
  incidents: number;
  owner: string;
  location: string; // Building-specific location
  criticality: 'critical' | 'high' | 'medium' | 'low';
  // Real-time device details
  deviceDetails?: {
    manufacturer?: string;
    model?: string;
    serialNumber?: string;
    firmwareVersion?: string;
    cpuUsage?: number;
    memoryUsage?: number;
    diskUsage?: number;
    temperature?: string;
    powerConsumption?: string;
    networkTraffic?: string;
    uptime?: string;
    [key: string]: any; // Flexible for device-specific metrics
  };
  // Precise positioning
  positioning?: {
    building?: string;
    floor?: number;
    room?: string;
    rack?: string;
    gpsAccuracy?: number; // meters
    lastGPSUpdate?: string;
  };
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

  // Get infrastructure assets with precise GPS-level geolocation
  async getInfrastructureAssets(): Promise<InfrastructureAsset[]> {
    // Simulate real-time infrastructure with GPS-level precision
    const assets: InfrastructureAsset[] = [
      // Primary Data Center - Building-level precision
      {
        id: 'dc-sv-001',
        name: 'Primary Server - Rack A1-U12',
        type: 'server',
        latitude: 37.774929, // Precise GPS coordinates (6 decimal places = ~0.1m accuracy)
        longitude: -122.419416,
        altitude: 15.2, // Floor 3, 15.2m above ground
        status: 'healthy',
        ipAddress: '10.0.1.100',
        lastSeen: new Date().toISOString(),
        vulnerabilities: 0,
        complianceScore: 98,
        incidents: 0,
        owner: 'Data Center Operations',
        location: 'San Francisco, CA - Building A, Floor 3',
        criticality: 'critical',
        deviceDetails: {
          manufacturer: 'Dell Technologies',
          model: 'PowerEdge R750',
          serialNumber: 'DC-SV001-A1U12',
          firmwareVersion: '2.15.2',
          cpuUsage: Math.floor(Math.random() * 40) + 20, // 20-60%
          memoryUsage: Math.floor(Math.random() * 50) + 30, // 30-80%
          diskUsage: Math.floor(Math.random() * 30) + 15, // 15-45%
          temperature: `${Math.floor(Math.random() * 15) + 35}°C`, // 35-50°C
          powerConsumption: `${Math.floor(Math.random() * 200) + 350}W`,
          networkTraffic: `${(Math.random() * 5 + 1).toFixed(1)} GB/s`,
          uptime: '847 days, 12:34:56'
        },
        positioning: {
          building: 'Data Center A',
          floor: 3,
          room: 'Server Room 1',
          rack: 'A1-U12',
          gpsAccuracy: 0.8, // 0.8 meter GPS accuracy
          lastGPSUpdate: new Date().toISOString()
        }
      },
      {
        id: 'fw-pa-001',
        name: 'Perimeter Firewall - Main Gateway',
        type: 'firewall',
        latitude: 40.712776,
        longitude: -74.005974,
        altitude: 25.6, // Floor 5, network room
        status: 'healthy',
        ipAddress: '10.0.2.1',
        lastSeen: new Date().toISOString(),
        vulnerabilities: 0,
        complianceScore: 96,
        incidents: 0,
        owner: 'Network Security Team',
        location: 'New York, NY - Tower 1, Floor 5',
        criticality: 'critical',
        deviceDetails: {
          manufacturer: 'Palo Alto Networks',
          model: 'PA-5220',
          serialNumber: 'FW-PA001-T1F5',
          firmwareVersion: '10.2.4-h4',
          throughput: `${(Math.random() * 10 + 5).toFixed(1)} Gbps`,
          activeConnections: Math.floor(Math.random() * 500000) + 100000,
          blockedThreats: Math.floor(Math.random() * 1000) + 2500,
          cpuUsage: Math.floor(Math.random() * 25) + 15, // 15-40%
          memoryUsage: Math.floor(Math.random() * 30) + 25, // 25-55%
        },
        positioning: {
          building: 'Corporate Tower 1',
          floor: 5,
          room: 'Network Operations Center',
          rack: 'NOC-R1-U24',
          gpsAccuracy: 1.2,
          lastGPSUpdate: new Date().toISOString()
        }
      },
      {
        id: 'db-orc-001',
        name: 'Production Database Cluster - Master',
        type: 'database',
        latitude: 34.052235,
        longitude: -118.243683,
        altitude: 20.1, // Floor 4, secure zone
        status: 'healthy',
        ipAddress: '10.0.3.50',
        lastSeen: new Date().toISOString(),
        vulnerabilities: 0,
        complianceScore: 99,
        incidents: 0,
        owner: 'Database Administration',
        location: 'Los Angeles, CA - Secure Zone B',
        criticality: 'critical',
        deviceDetails: {
          manufacturer: 'Oracle Corporation',
          model: 'Exadata X9M-2',
          serialNumber: 'DB-ORC001-SZB4',
          firmwareVersion: '21.2.8',
          activeConnections: Math.floor(Math.random() * 2000) + 1500,
          queries: `${Math.floor(Math.random() * 10000) + 5000}/sec`,
          storageUsed: `${(Math.random() * 20 + 15).toFixed(1)} TB / 50 TB`,
          replicationLag: `${(Math.random() * 0.05).toFixed(3)}s`,
          cpuUsage: Math.floor(Math.random() * 40) + 30, // 30-70%
          memoryUsage: Math.floor(Math.random() * 35) + 45, // 45-80%
        },
        positioning: {
          building: 'West Coast Data Center',
          floor: 4,
          room: 'Secure Database Zone B',
          rack: 'SDB-R3-U08',
          gpsAccuracy: 0.5,
          lastGPSUpdate: new Date().toISOString()
        }
      },
      {
        id: 'rt-cis-001',
        name: 'Core Network Switch - Distribution Layer',
        type: 'switch',
        latitude: 41.878113,
        longitude: -87.629799,
        altitude: 10.5, // Floor 2, network closet
        status: 'warning', // High utilization
        ipAddress: '10.0.4.10',
        lastSeen: new Date().toISOString(),
        vulnerabilities: 1,
        complianceScore: 87,
        incidents: 0,
        owner: 'Network Infrastructure',
        location: 'Chicago, IL - Main Campus',
        criticality: 'high',
        deviceDetails: {
          manufacturer: 'Cisco Systems',
          model: 'Catalyst 9600-48Y',
          serialNumber: 'SW-CIS001-MC2',
          firmwareVersion: '17.06.04',
          portUtilization: '78%', // Warning threshold
          vlanCount: 42,
          spanningTreeStatus: 'Converged',
          powerOverEthernet: `${Math.floor(Math.random() * 200) + 450}W / 740W`,
          temperature: `${Math.floor(Math.random() * 10) + 35}°C`,
        },
        positioning: {
          building: 'Main Campus Building',
          floor: 2,
          room: 'Network Closet C2',
          rack: 'NC2-R2-U12',
          gpsAccuracy: 1.5,
          lastGPSUpdate: new Date().toISOString()
        }
      },
      {
        id: 'cam-ax-001',
        name: 'Security Camera - Main Entrance',
        type: 'camera',
        latitude: 37.774965, // Very precise outdoor location
        longitude: -122.419387,
        altitude: 3.2, // Mounted height
        status: 'healthy',
        ipAddress: '10.0.6.101',
        lastSeen: new Date().toISOString(),
        vulnerabilities: 0,
        complianceScore: 92,
        incidents: 0,
        owner: 'Physical Security',
        location: 'San Francisco, CA - Main Entrance',
        criticality: 'medium',
        deviceDetails: {
          manufacturer: 'Axis Communications',
          model: 'P3245-LVE',
          serialNumber: 'CAM-AX001-ME',
          firmwareVersion: '10.12.204',
          resolution: '1920x1080 @ 30fps',
          storageUsed: `${(Math.random() * 2 + 1).toFixed(1)} TB / 4 TB`,
          motionDetection: 'Active',
          nightVision: 'Enabled',
          panTiltZoom: 'Operational',
        },
        positioning: {
          building: 'Main Entrance Portal',
          floor: 1,
          room: 'Exterior - Main Gate',
          rack: 'Wall Mount - 3.2m height',
          gpsAccuracy: 0.3, // Very precise for outdoor camera
          lastGPSUpdate: new Date().toISOString()
        }
      },
      {
        id: 'sen-apc-001',
        name: 'Environmental Sensor - Server Room Monitor',
        type: 'sensor',
        latitude: 37.774901,
        longitude: -122.419445,
        altitude: 15.2, // Same floor as servers
        status: 'healthy',
        ipAddress: '10.0.7.201',
        lastSeen: new Date().toISOString(),
        vulnerabilities: 0,
        complianceScore: 88,
        incidents: 0,
        owner: 'Facilities Management',
        location: 'San Francisco, CA - Server Room Environmental',
        criticality: 'low',
        deviceDetails: {
          manufacturer: 'APC by Schneider Electric',
          model: 'NetBotz 200',
          serialNumber: 'ENV-APC001-SR',
          firmwareVersion: '4.8.1',
          temperature: `${(Math.random() * 3 + 20).toFixed(1)}°C`,
          humidity: `${Math.floor(Math.random() * 10) + 40}%`,
          airflow: Math.random() > 0.1 ? 'Normal' : 'Alert',
          smokeDetector: 'Clear',
          batteryLevel: `${Math.floor(Math.random() * 10) + 90}%`,
        },
        positioning: {
          building: 'Data Center A',
          floor: 3,
          room: 'Server Room 1 - Environmental Station',
          rack: 'Wall Mount - Central',
          gpsAccuracy: 0.8,
          lastGPSUpdate: new Date().toISOString()
        }
      },
      {
        id: 'ap-ub-001',
        name: 'WiFi Access Point - Student Commons',
        type: 'access_point',
        latitude: 39.739236,
        longitude: -104.990251,
        altitude: 8.5, // Floor 2, ceiling mount
        status: 'healthy',
        ipAddress: '10.0.8.150',
        lastSeen: new Date().toISOString(),
        vulnerabilities: 0,
        complianceScore: 94,
        incidents: 0,
        owner: 'Campus IT',
        location: 'Denver, CO - Student Commons Area',
        criticality: 'medium',
        deviceDetails: {
          manufacturer: 'Ubiquiti Networks',
          model: 'UniFi WiFi 6 Enterprise',
          serialNumber: 'AP-UB001-SC',
          firmwareVersion: '6.5.55',
          connectedDevices: Math.floor(Math.random() * 80) + 20, // 20-100 devices
          bandwidth: `${Math.floor(Math.random() * 500) + 200} Mbps`,
          signal: '-45 dBm (Excellent)',
          channel: '149 (5GHz)',
          uptime: `${Math.floor(Math.random() * 30) + 1} days`,
        },
        positioning: {
          building: 'Student Commons',
          floor: 2,
          room: 'Commons Area - Central',
          rack: 'Ceiling Mount - Zone C',
          gpsAccuracy: 2.1, // Indoor positioning
          lastGPSUpdate: new Date().toISOString()
        }
      }
    ];

    // Simulate real-time updates
    return assets.map(asset => ({
      ...asset,
      lastSeen: new Date().toISOString(),
      // Add some real-time variance to metrics
      deviceDetails: asset.deviceDetails ? {
        ...asset.deviceDetails,
        cpuUsage: asset.deviceDetails.cpuUsage ? 
          Math.max(5, Math.min(95, asset.deviceDetails.cpuUsage + (Math.random() - 0.5) * 10)) : undefined,
        memoryUsage: asset.deviceDetails.memoryUsage ?
          Math.max(10, Math.min(90, asset.deviceDetails.memoryUsage + (Math.random() - 0.5) * 8)) : undefined,
      } : undefined
    }));
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
    const { deviceType, location, precision, realtime } = req.query;
    
    let assets = await geospatialIntelligenceService.getInfrastructureAssets();
    
    // Filter by device type if specified
    if (deviceType && deviceType !== 'all') {
      assets = assets.filter(asset => asset.type === deviceType);
    }
    
    // Filter by location if specified
    if (location) {
      assets = assets.filter(asset => 
        asset.location.toLowerCase().includes((location as string).toLowerCase())
      );
    }
    
    // Add real-time status simulation
    if (realtime === 'true') {
      assets = assets.map(asset => ({
        ...asset,
        lastSeen: new Date().toISOString(),
        isLive: true,
        // Simulate live device metrics
        deviceDetails: asset.deviceDetails ? {
          ...asset.deviceDetails,
          cpuUsage: asset.deviceDetails.cpuUsage ? 
            Math.max(5, Math.min(95, asset.deviceDetails.cpuUsage + (Math.random() - 0.5) * 15)) : undefined,
          memoryUsage: asset.deviceDetails.memoryUsage ?
            Math.max(10, Math.min(90, asset.deviceDetails.memoryUsage + (Math.random() - 0.5) * 12)) : undefined,
          temperature: asset.deviceDetails.temperature ?
            `${Math.max(25, Math.min(65, parseInt(asset.deviceDetails.temperature) + (Math.random() - 0.5) * 3))}°C` : undefined,
          networkTraffic: asset.deviceDetails.networkTraffic ?
            `${(Math.random() * 8 + 1).toFixed(1)} GB/s` : undefined,
          lastHeartbeat: new Date().toISOString()
        } : undefined
      }));
    }
    
    // Add metadata for the response
    const response = {
      devices: assets,
      metadata: {
        totalDevices: assets.length,
        deviceTypes: Array.from(new Set(assets.map(a => a.type))),
        locations: Array.from(new Set(assets.map(a => a.location))),
        healthyDevices: assets.filter(a => a.status === 'healthy').length,
        warningDevices: assets.filter(a => a.status === 'warning').length,
        criticalDevices: assets.filter(a => a.status === 'critical').length,
        offlineDevices: assets.filter(a => a.status === 'offline').length,
        lastUpdate: new Date().toISOString(),
        gpsAccuracy: 'Sub-meter precision (0.3-2.1m)',
        realTimeEnabled: realtime === 'true'
      }
    };
    
    res.json(response);
  } catch (error) {
    console.error('Error fetching infrastructure map:', error);
    res.status(500).json({ error: 'Failed to fetch infrastructure data' });
  }
};

// Add new endpoint for individual device monitoring
export const getDeviceDetails = async (req: Request, res: Response) => {
  try {
    const { deviceId } = req.params;
    const assets = await geospatialIntelligenceService.getInfrastructureAssets();
    const device = assets.find(asset => asset.id === deviceId);
    
    if (!device) {
      return res.status(404).json({ error: 'Device not found' });
    }
    
    // Enhanced device details with real-time metrics
    const enhancedDevice = {
      ...device,
      realTimeMetrics: {
        ...device.deviceDetails,
        connectionStatus: 'Connected',
        lastPing: new Date().toISOString(),
        responseTime: `${Math.floor(Math.random() * 10) + 1}ms`,
        packetLoss: `${(Math.random() * 0.5).toFixed(2)}%`,
        jitter: `${(Math.random() * 2).toFixed(1)}ms`
      },
      locationDetails: {
        ...device.positioning,
        coordinates: {
          latitude: device.latitude,
          longitude: device.longitude,
          altitude: device.altitude
        },
        addressLookup: device.location,
        timezone: 'UTC-8 (PST)',
        nearbyDevices: assets.filter(a => 
          a.id !== deviceId && 
          Math.abs(a.latitude - device.latitude) < 0.001 &&
          Math.abs(a.longitude - device.longitude) < 0.001
        ).length
      },
      alertHistory: [
        {
          timestamp: new Date(Date.now() - 3600000).toISOString(),
          type: 'info',
          message: 'Device health check completed successfully'
        },
        {
          timestamp: new Date(Date.now() - 7200000).toISOString(),
          type: 'warning',
          message: 'CPU usage exceeded 75% threshold'
        }
      ]
    };
    
    res.json(enhancedDevice);
  } catch (error) {
    console.error('Error fetching device details:', error);
    res.status(500).json({ error: 'Failed to fetch device details' });
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