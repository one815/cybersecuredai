/**
 * Live Location Tracking Service
 * 
 * Main service orchestrating the Live Location system components:
 * - Real-time device tracking and monitoring
 * - Location history management and analytics
 * - Geofence breach detection and alerting
 * - Asset inventory and movement tracking
 * - Network topology mapping and monitoring
 * - Integration with threat monitoring system
 */

import { EventEmitter } from 'events';
import type { DbProvider } from '../db.js';
import { eq, and, desc, sql, gte, lte, isNotNull, or } from 'drizzle-orm';
import type { 
  LiveLocationDevice,
  InsertLiveLocationDevice,
  LiveLocationHistory,
  InsertLiveLocationHistory,
  LiveLocationAlert,
  InsertLiveLocationAlert,
  LiveLocationGeoFence,
  InsertLiveLocationGeoFence,
  LiveLocationAsset,
  InsertLiveLocationAsset,
  LiveLocationNetworkSegment,
  InsertLiveLocationNetworkSegment,
  Threat,
  User
} from '../../shared/schema.js';

export interface LocationUpdate {
  deviceId: string;
  latitude?: string;
  longitude?: string;
  altitude?: string;
  accuracy?: number;
  locationMethod: 'gps' | 'wifi' | 'cellular' | 'ip_geolocation' | 'manual' | 'beacon';
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  batteryLevel?: number;
  signalStrength?: number;
  reportedBy?: string;
}

export interface GeofenceBreachEvent {
  deviceId: string;
  geofenceId: string;
  geofenceName: string;
  breachType: 'entry' | 'exit';
  location: {
    latitude: string;
    longitude: string;
    accuracy?: number;
  };
  timestamp: Date;
  alertSeverity: 'low' | 'medium' | 'high' | 'critical';
}

export interface DeviceStatusUpdate {
  deviceId: string;
  status: 'online' | 'offline' | 'maintenance' | 'decommissioned' | 'lost' | 'stolen';
  lastSeen?: Date;
  healthScore?: number;
  networkStatus?: any;
}

export interface LiveLocationStats {
  totalDevices: number;
  onlineDevices: number;
  criticalDevices: number;
  activeAlerts: number;
  geofences: number;
  trackedAssets: number;
  networkSegments: number;
  locationUpdatesLast24h: number;
  averageResponseTime: number;
}

export interface LiveLocationConfig {
  organizationId: string;
  trackingEnabled: boolean;
  updateIntervalMs: number; // Default location update interval
  geofenceCheckEnabled: boolean;
  anomalyDetectionEnabled: boolean;
  alertEscalationEnabled: boolean;
  complianceLoggingEnabled: boolean;
  dbProvider?: DbProvider;
}

export class LiveLocationService extends EventEmitter {
  private devices: Map<string, LiveLocationDevice> = new Map();
  private geofences: Map<string, LiveLocationGeoFence> = new Map();
  private assets: Map<string, LiveLocationAsset> = new Map();
  private networkSegments: Map<string, LiveLocationNetworkSegment> = new Map();
  private isInitialized: boolean = false;
  private initPromise: Promise<void> | null = null;
  private config: LiveLocationConfig;
  private locationUpdateInterval: NodeJS.Timeout | null = null;
  private dbProvider: DbProvider;
  
  // Real-time tracking
  private activeTracking: Map<string, NodeJS.Timeout> = new Map();
  private lastLocationUpdates: Map<string, Date> = new Map();
  private alertQueue: LiveLocationAlert[] = [];
  
  // Performance metrics
  private updateCounts: Map<string, number> = new Map();
  private responseTimeMs: number[] = [];

  constructor(config: LiveLocationConfig, dbProvider?: DbProvider) {
    super();
    this.config = config;
    this.dbProvider = dbProvider || config.dbProvider!;
    this.setMaxListeners(100); // Handle many concurrent location updates
    
    // Bind event handlers
    this.on('locationUpdate', this.handleLocationUpdate.bind(this));
    this.on('deviceStatusChange', this.handleDeviceStatusChange.bind(this));
    this.on('geofenceBreach', this.handleGeofenceBreach.bind(this));
    this.on('assetMovement', this.handleAssetMovement.bind(this));
  }

  /**
   * Initialize the Live Location service
   */
  async initialize(): Promise<void> {
    if (this.isInitialized) return;
    if (this.initPromise) return this.initPromise;

    this.initPromise = this._initialize();
    return this.initPromise;
  }

  private async _initialize(): Promise<void> {
    try {
      console.log('🗺️ Initializing Live Location Service...');
      
      // Load all devices, geofences, assets, and network segments
      await Promise.all([
        this.loadDevices(),
        this.loadGeofences(),
        this.loadAssets(),
        this.loadNetworkSegments(),
      ]);

      // Start periodic tasks if tracking is enabled
      if (this.config.trackingEnabled) {
        this.startLocationUpdates();
        this.startGeofenceMonitoring();
        this.startAnomalyDetection();
      }

      this.isInitialized = true;
      this.emit('serviceInitialized', {
        devicesLoaded: this.devices.size,
        geofencesLoaded: this.geofences.size,
        assetsLoaded: this.assets.size,
        networkSegmentsLoaded: this.networkSegments.size,
      });

      console.log(`✅ Live Location Service initialized with ${this.devices.size} devices`);
    } catch (error) {
      console.error('❌ Failed to initialize Live Location Service:', error);
      this.emit('serviceError', error);
      throw error;
    }
  }

  /**
   * Load all devices from database
   */
  private async loadDevices(): Promise<void> {
    const db = await this.dbProvider();
    const { liveLocationDevices } = await import('../../shared/schema.js');
    
    const devices = await db.select()
      .from(liveLocationDevices)
      .where(eq(liveLocationDevices.organizationId, this.config.organizationId));

    this.devices.clear();
    for (const device of devices) {
      this.devices.set(device.id, device);
    }
  }

  /**
   * Load all geofences from database
   */
  private async loadGeofences(): Promise<void> {
    const db = await this.dbProvider();
    const { liveLocationGeoFences } = await import('../../shared/schema.js');
    
    const geofences = await db.select()
      .from(liveLocationGeoFences)
      .where(and(
        eq(liveLocationGeoFences.organizationId, this.config.organizationId),
        eq(liveLocationGeoFences.isActive, true)
      ));

    this.geofences.clear();
    for (const geofence of geofences) {
      this.geofences.set(geofence.id, geofence);
    }
  }

  /**
   * Load all assets from database
   */
  private async loadAssets(): Promise<void> {
    const db = await this.dbProvider();
    const { liveLocationAssets } = await import('../../shared/schema.js');
    
    const assets = await db.select()
      .from(liveLocationAssets)
      .where(eq(liveLocationAssets.organizationId, this.config.organizationId));

    this.assets.clear();
    for (const asset of assets) {
      this.assets.set(asset.id, asset);
    }
  }

  /**
   * Load all network segments from database
   */
  private async loadNetworkSegments(): Promise<void> {
    const db = await this.dbProvider();
    const { liveLocationNetworkSegments } = await import('../../shared/schema.js');
    
    const segments = await db.select()
      .from(liveLocationNetworkSegments)
      .where(and(
        eq(liveLocationNetworkSegments.organizationId, this.config.organizationId),
        eq(liveLocationNetworkSegments.isActive, true)
      ));

    this.networkSegments.clear();
    for (const segment of segments) {
      this.networkSegments.set(segment.id, segment);
    }
  }

  /**
   * Register a new device for tracking
   */
  async registerDevice(deviceData: InsertLiveLocationDevice): Promise<LiveLocationDevice> {
    if (!this.isInitialized) await this.initialize();

    const db = await this.dbProvider();
    const { liveLocationDevices } = await import('../../shared/schema.js');

    const [device] = await db.insert(liveLocationDevices)
      .values({
        ...deviceData,
        organizationId: this.config.organizationId,
      })
      .returning();

    this.devices.set(device.id, device);
    
    this.emit('deviceRegistered', device);
    return device;
  }

  /**
   * Update device location
   */
  async updateDeviceLocation(update: LocationUpdate): Promise<void> {
    if (!this.isInitialized) await this.initialize();

    const startTime = Date.now();
    const device = this.devices.get(update.deviceId);
    if (!device) {
      throw new Error(`Device ${update.deviceId} not found`);
    }

    // Create location history entry
    const db = await this.dbProvider();
    const { liveLocationHistory, liveLocationDevices } = await import('../../shared/schema.js');

    // Check for geofence breaches
    const geofenceStatus = await this.checkGeofences(update);

    const [locationEntry] = await db.insert(liveLocationHistory)
      .values({
        deviceId: update.deviceId,
        latitude: update.latitude,
        longitude: update.longitude,
        altitude: update.altitude,
        accuracy: update.accuracy,
        locationMethod: update.locationMethod,
        address: update.address,
        city: update.city,
        state: update.state,
        country: update.country,
        batteryLevel: update.batteryLevel,
        signalStrength: update.signalStrength,
        isInsideGeofence: geofenceStatus.isInside,
        geofenceIds: geofenceStatus.geofenceIds,
        reportedBy: update.reportedBy,
        recordedAt: new Date(),
      })
      .returning();

    // Update device last seen
    await db.update(liveLocationDevices)
      .set({ 
        lastSeen: new Date(),
        status: 'online',
      })
      .where(eq(liveLocationDevices.id, update.deviceId));

    // Update local cache
    const updatedDevice = { ...device, lastSeen: new Date(), status: 'online' as const };
    this.devices.set(device.id, updatedDevice);
    this.lastLocationUpdates.set(update.deviceId, new Date());

    // Track performance
    const responseTime = Date.now() - startTime;
    this.responseTimeMs.push(responseTime);
    if (this.responseTimeMs.length > 1000) {
      this.responseTimeMs = this.responseTimeMs.slice(-500);
    }

    // Emit real-time events
    this.emit('locationUpdate', {
      device: updatedDevice,
      location: locationEntry,
      geofenceStatus,
    });

    // Check for anomalies if enabled
    if (this.config.anomalyDetectionEnabled) {
      await this.detectLocationAnomalies(update, locationEntry);
    }
  }

  /**
   * Check if location update triggers any geofence breaches
   */
  private async checkGeofences(update: LocationUpdate): Promise<{
    isInside: boolean;
    geofenceIds: string[];
    breaches: GeofenceBreachEvent[];
  }> {
    if (!update.latitude || !update.longitude) {
      return { isInside: false, geofenceIds: [], breaches: [] };
    }

    const lat = parseFloat(update.latitude);
    const lng = parseFloat(update.longitude);
    const insideGeofences: string[] = [];
    const breaches: GeofenceBreachEvent[] = [];

    for (const [id, geofence] of this.geofences) {
      const isInside = this.isLocationInsideGeofence(lat, lng, geofence);
      
      if (isInside) {
        insideGeofences.push(id);
        
        // Check if this is a new entry (breach)
        if (geofence.alertOnEntry) {
          breaches.push({
            deviceId: update.deviceId,
            geofenceId: id,
            geofenceName: geofence.name,
            breachType: 'entry',
            location: { latitude: update.latitude, longitude: update.longitude, accuracy: update.accuracy },
            timestamp: new Date(),
            alertSeverity: this.calculateAlertSeverity(geofence),
          });
        }
      }
    }

    return {
      isInside: insideGeofences.length > 0,
      geofenceIds: insideGeofences,
      breaches,
    };
  }

  /**
   * Check if coordinates are inside a geofence
   */
  private isLocationInsideGeofence(lat: number, lng: number, geofence: LiveLocationGeoFence): boolean {
    if (geofence.fenceType === 'circular' && geofence.centerLatitude && geofence.centerLongitude && geofence.radius) {
      const centerLat = parseFloat(geofence.centerLatitude);
      const centerLng = parseFloat(geofence.centerLongitude);
      const distance = this.calculateDistance(lat, lng, centerLat, centerLng);
      return distance <= geofence.radius;
    }
    
    if (geofence.fenceType === 'polygon' && geofence.polygonCoordinates) {
      return this.isPointInPolygon(lat, lng, geofence.polygonCoordinates as any);
    }
    
    return false;
  }

  /**
   * Calculate distance between two coordinates in meters
   */
  private calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
    const R = 6371e3; // Earth's radius in meters
    const φ1 = lat1 * Math.PI / 180;
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lng2 - lng1) * Math.PI / 180;

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  }

  /**
   * Point-in-polygon test using ray casting algorithm
   */
  private isPointInPolygon(lat: number, lng: number, polygon: Array<{lat: number, lng: number}>): boolean {
    let inside = false;
    const j = polygon.length - 1;

    for (let i = 0; i < polygon.length; i++) {
      if (((polygon[i].lat > lat) !== (polygon[j].lat > lat)) &&
          (lng < (polygon[j].lng - polygon[i].lng) * (lat - polygon[i].lat) / (polygon[j].lat - polygon[i].lat) + polygon[i].lng)) {
        inside = !inside;
      }
    }

    return inside;
  }

  /**
   * Calculate alert severity based on geofence properties
   */
  private calculateAlertSeverity(geofence: LiveLocationGeoFence): 'low' | 'medium' | 'high' | 'critical' {
    if (geofence.securityLevel === 'classified') return 'critical';
    if (geofence.securityLevel === 'restricted') return 'high';
    if (geofence.complianceZone) return 'high';
    if (geofence.priority >= 8) return 'medium';
    return 'low';
  }

  /**
   * Detect location anomalies
   */
  private async detectLocationAnomalies(update: LocationUpdate, locationEntry: LiveLocationHistory): Promise<void> {
    // Get recent location history for this device
    const db = await this.dbProvider();
    const { liveLocationHistory } = await import('../../shared/schema.js');

    const recentLocations = await db.select()
      .from(liveLocationHistory)
      .where(and(
        eq(liveLocationHistory.deviceId, update.deviceId),
        gte(liveLocationHistory.recordedAt, new Date(Date.now() - 24 * 60 * 60 * 1000)) // Last 24 hours
      ))
      .orderBy(desc(liveLocationHistory.recordedAt))
      .limit(10);

    // Simple anomaly detection: unusual distance traveled in short time
    if (recentLocations.length >= 2 && update.latitude && update.longitude) {
      const currentLat = parseFloat(update.latitude);
      const currentLng = parseFloat(update.longitude);
      const previousLocation = recentLocations[1]; // Second most recent (first is current)

      if (previousLocation.latitude && previousLocation.longitude) {
        const prevLat = parseFloat(previousLocation.latitude);
        const prevLng = parseFloat(previousLocation.longitude);
        const distance = this.calculateDistance(currentLat, currentLng, prevLat, prevLng);
        const timeDiff = (new Date(locationEntry.recordedAt!).getTime() - new Date(previousLocation.recordedAt!).getTime()) / 1000; // seconds
        const speed = distance / timeDiff; // meters per second

        // Flag as anomaly if speed > 50 m/s (180 km/h) - unrealistic for most devices
        if (speed > 50) {
          await this.createLocationAlert({
            alertType: 'suspicious_location',
            severity: 'medium',
            deviceId: update.deviceId,
            locationHistoryId: locationEntry.id,
            alertTitle: 'Unusual Movement Detected',
            alertDescription: `Device moved ${Math.round(distance)}m in ${Math.round(timeDiff)}s (${Math.round(speed * 3.6)} km/h)`,
            currentLocation: { latitude: update.latitude, longitude: update.longitude },
            riskAssessment: { 
              anomalyType: 'speed',
              calculatedSpeed: speed * 3.6, // km/h
              distance: distance,
              timeFrame: timeDiff 
            },
          });
        }
      }
    }
  }

  /**
   * Create a location-based alert
   */
  async createLocationAlert(alertData: Partial<InsertLiveLocationAlert>): Promise<LiveLocationAlert> {
    const db = await this.dbProvider();
    const { liveLocationAlerts } = await import('../../shared/schema.js');

    const [alert] = await db.insert(liveLocationAlerts)
      .values({
        ...alertData,
        status: 'active',
      } as InsertLiveLocationAlert)
      .returning();

    this.alertQueue.push(alert);
    this.emit('alertCreated', alert);

    // Auto-escalate critical alerts
    if (alert.severity === 'critical' && this.config.alertEscalationEnabled) {
      setTimeout(() => this.escalateAlert(alert.id), 5 * 60 * 1000); // 5 minutes
    }

    return alert;
  }

  /**
   * Get live location statistics
   */
  async getStats(): Promise<LiveLocationStats> {
    const db = await this.dbProvider();
    const { liveLocationDevices, liveLocationAlerts, liveLocationGeoFences, liveLocationAssets, liveLocationNetworkSegments, liveLocationHistory } = await import('../../shared/schema.js');

    const [
      deviceStats,
      alertStats,
      geofenceCount,
      assetCount,
      segmentCount,
      recentUpdates,
    ] = await Promise.all([
      db.select({
        total: sql<number>`count(*)`,
        online: sql<number>`count(*) filter (where status = 'online')`,
        critical: sql<number>`count(*) filter (where critical_asset = true)`,
      }).from(liveLocationDevices).where(eq(liveLocationDevices.organizationId, this.config.organizationId)),

      db.select({
        active: sql<number>`count(*) filter (where status = 'active')`,
      }).from(liveLocationAlerts),

      db.select({ count: sql<number>`count(*)` }).from(liveLocationGeoFences).where(eq(liveLocationGeoFences.organizationId, this.config.organizationId)),

      db.select({ count: sql<number>`count(*)` }).from(liveLocationAssets).where(eq(liveLocationAssets.organizationId, this.config.organizationId)),

      db.select({ count: sql<number>`count(*)` }).from(liveLocationNetworkSegments).where(eq(liveLocationNetworkSegments.organizationId, this.config.organizationId)),

      db.select({ count: sql<number>`count(*)` }).from(liveLocationHistory).where(gte(liveLocationHistory.recordedAt, new Date(Date.now() - 24 * 60 * 60 * 1000))),
    ]);

    const avgResponseTime = this.responseTimeMs.length > 0 
      ? this.responseTimeMs.reduce((sum, time) => sum + time, 0) / this.responseTimeMs.length 
      : 0;

    return {
      totalDevices: deviceStats[0]?.total || 0,
      onlineDevices: deviceStats[0]?.online || 0,
      criticalDevices: deviceStats[0]?.critical || 0,
      activeAlerts: alertStats[0]?.active || 0,
      geofences: geofenceCount[0]?.count || 0,
      trackedAssets: assetCount[0]?.count || 0,
      networkSegments: segmentCount[0]?.count || 0,
      locationUpdatesLast24h: recentUpdates[0]?.count || 0,
      averageResponseTime: Math.round(avgResponseTime),
    };
  }

  /**
   * Event handlers
   */
  private async handleLocationUpdate(event: any): Promise<void> {
    // Handle real-time location updates
    console.log(`📍 Location update for device ${event.device.deviceName}: ${event.location.city || 'Unknown location'}`);
    
    // Update tracking counters
    const count = this.updateCounts.get(event.device.id) || 0;
    this.updateCounts.set(event.device.id, count + 1);
  }

  private async handleDeviceStatusChange(event: DeviceStatusUpdate): Promise<void> {
    const device = this.devices.get(event.deviceId);
    if (!device) return;

    const db = await this.dbProvider();
    const { liveLocationDevices } = await import('../../shared/schema.js');

    await db.update(liveLocationDevices)
      .set({
        status: event.status,
        lastSeen: event.lastSeen || new Date(),
        healthScore: event.healthScore || device.healthScore,
      })
      .where(eq(liveLocationDevices.id, event.deviceId));

    // Update local cache
    const updatedDevice = { 
      ...device, 
      status: event.status, 
      lastSeen: event.lastSeen || new Date(),
      healthScore: event.healthScore || device.healthScore,
    };
    this.devices.set(event.deviceId, updatedDevice);

    this.emit('deviceStatusUpdated', updatedDevice);
  }

  private async handleGeofenceBreach(event: GeofenceBreachEvent): Promise<void> {
    await this.createLocationAlert({
      alertType: 'geofence_breach',
      severity: event.alertSeverity,
      deviceId: event.deviceId,
      geofenceId: event.geofenceId,
      alertTitle: `Geofence ${event.breachType}: ${event.geofenceName}`,
      alertDescription: `Device ${event.breachType} geofence "${event.geofenceName}" at ${event.timestamp.toISOString()}`,
      currentLocation: event.location,
      riskAssessment: {
        breachType: event.breachType,
        geofenceName: event.geofenceName,
        timestamp: event.timestamp,
      },
    });
  }

  private async handleAssetMovement(event: any): Promise<void> {
    // Handle asset movement tracking and alerts
    console.log(`📦 Asset movement detected: ${event.assetTag}`);
  }

  /**
   * Start periodic location updates
   */
  private startLocationUpdates(): void {
    if (this.locationUpdateInterval) return;

    this.locationUpdateInterval = setInterval(async () => {
      // Simulate network device discovery and status updates
      await this.performNetworkDiscovery();
    }, this.config.updateIntervalMs);

    console.log(`🔄 Started location updates every ${this.config.updateIntervalMs}ms`);
  }

  /**
   * Start geofence monitoring
   */
  private startGeofenceMonitoring(): void {
    // Real-time geofence monitoring is handled in updateDeviceLocation
    console.log('🛡️ Geofence monitoring active');
  }

  /**
   * Start anomaly detection
   */
  private startAnomalyDetection(): void {
    // Anomaly detection is handled in detectLocationAnomalies
    console.log('🤖 Anomaly detection active');
  }

  /**
   * Perform network discovery to update device status
   */
  private async performNetworkDiscovery(): Promise<void> {
    // Simulate network device discovery
    for (const [deviceId, device] of this.devices) {
      if (device.status === 'online' && Math.random() > 0.95) { // 5% chance of status change
        this.emit('deviceStatusChange', {
          deviceId,
          status: Math.random() > 0.5 ? 'offline' : 'maintenance',
          lastSeen: new Date(),
          healthScore: Math.floor(Math.random() * 100),
        });
      }
    }
  }

  /**
   * Escalate an alert
   */
  private async escalateAlert(alertId: string): Promise<void> {
    const db = await this.dbProvider();
    const { liveLocationAlerts } = await import('../../shared/schema.js');

    await db.update(liveLocationAlerts)
      .set({
        escalationLevel: sql`escalation_level + 1`,
        updatedAt: new Date(),
      })
      .where(eq(liveLocationAlerts.id, alertId));

    this.emit('alertEscalated', { alertId, timestamp: new Date() });
  }

  /**
   * Cleanup resources
   */
  async shutdown(): Promise<void> {
    if (this.locationUpdateInterval) {
      clearInterval(this.locationUpdateInterval);
      this.locationUpdateInterval = null;
    }

    this.activeTracking.forEach(timer => clearTimeout(timer));
    this.activeTracking.clear();

    this.isInitialized = false;
    this.emit('serviceShutdown');
    console.log('🛑 Live Location Service shutdown complete');
  }
}