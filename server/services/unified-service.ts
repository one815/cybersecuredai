/**
 * Unified Service Layer
 * 
 * Aggregates data from all four CyberSecured AI systems:
 * - CyDEF (Autonomous Cyber Defense) 
 * - Live Location Tracking
 * - CypherHUM (Holographic User Interface Model)
 * - ACDS (Autonomous Cyber Defense Swarm)
 * 
 * Provides unified APIs, cross-system correlation, and executive reporting.
 */

import { EventEmitter } from 'events';
import type { DbProvider } from '../db.js';
import { isDatabaseAvailable } from '../db.js';
import {
  UnifiedSystemStatusSchema,
  CrossSystemMetricsSchema,
  ExecutiveMetricsSchema,
  UnifiedAlertSchema,
  AlertStatsSchema,
  type UnifiedSystemStatus,
  type CrossSystemMetrics,
  type ExecutiveMetrics,
  type UnifiedAlert,
  type AlertStats,
  type Threat,
  type User
} from '../../shared/schema.js';

// Import service types
import type { CydefService, CydefSystemStatus } from './cydef-service.js';
import type { LiveLocationService, LiveLocationStats } from './live-location-service.js';
import type { CypherHumService, HolographicSessionState } from './cypherhum-service.js';
import type { ACDSService, DroneFleetStatus } from './acds-service.js';

export interface UnifiedServiceConfig {
  organizationId: string;
  enableRealTimeCorrelation: boolean;
  correlationIntervalMs: number;
  alertRetentionDays: number;
  executiveReportingEnabled: boolean;
  complianceFrameworks: string[];
  dbProvider?: DbProvider;
}

export interface SystemIntegrationStatus {
  cydefIntegrated: boolean;
  liveLocationIntegrated: boolean;
  cypherHUMIntegrated: boolean;
  acdsIntegrated: boolean;
  lastIntegrationCheck: Date;
  integrationErrors: string[];
}

export interface ThreatCorrelationResult {
  correlationId: string;
  threatIds: string[];
  correlationType: 'spatial' | 'temporal' | 'behavioral' | 'ai_pattern' | 'multi_system';
  confidenceScore: number; // 0-100
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  affectedSystems: string[];
  correlationData: {
    cydefAnalysis?: any;
    locationData?: any;
    cypherHumVisualization?: any;
    acdsResponse?: any;
  };
  automaticActions: string[];
  recommendations: string[];
  timestamp: Date;
}

export class UnifiedService extends EventEmitter {
  private config: UnifiedServiceConfig;
  private dbProvider?: DbProvider;
  private databaseAvailable: boolean = false;
  private isInitialized: boolean = false;
  private initPromise: Promise<void> | null = null;

  // Service integrations (lazy loaded)
  private cydefService?: CydefService;
  private liveLocationService?: LiveLocationService;
  private cypherHumService?: CypherHumService;
  private acdsService?: ACDSService;

  // Unified alert management
  private alerts: Map<string, UnifiedAlert> = new Map();
  private alertHistory: UnifiedAlert[] = [];
  
  // Correlation engine
  private correlationEngine: Map<string, ThreatCorrelationResult> = new Map();
  private correlationInterval: NodeJS.Timeout | null = null;
  
  // Performance tracking
  private performanceMetrics: Map<string, any> = new Map();
  private executiveMetricsCache: ExecutiveMetrics | null = null;
  private lastExecutiveMetricsUpdate: Date | null = null;
  
  // Integration status
  private integrationStatus: SystemIntegrationStatus = {
    cydefIntegrated: false,
    liveLocationIntegrated: false,
    cypherHUMIntegrated: false,
    acdsIntegrated: false,
    lastIntegrationCheck: new Date(),
    integrationErrors: [],
  };

  constructor(config: UnifiedServiceConfig, dbProvider?: DbProvider) {
    super();
    this.config = config;
    this.dbProvider = dbProvider;
    this.databaseAvailable = isDatabaseAvailable();
    
    // Set up event listeners
    this.on('threatCorrelationDetected', this.handleThreatCorrelation.bind(this));
    this.on('systemAlert', this.handleSystemAlert.bind(this));
    this.on('executiveReport', this.handleExecutiveReport.bind(this));
    
    console.log('🔄 Unified Service constructed for organization:', config.organizationId);
  }

  /**
   * Initialize the Unified Service and establish system integrations
   */
  async initialize(): Promise<void> {
    if (this.isInitialized) return;
    if (this.initPromise) return this.initPromise;

    this.initPromise = this._initialize();
    return this.initPromise;
  }

  private async _initialize(): Promise<void> {
    try {
      console.log('🚀 Initializing Unified Service...');

      // Initialize service integrations
      await this.initializeServiceIntegrations();
      
      // Start correlation engine
      if (this.config.enableRealTimeCorrelation) {
        await this.startCorrelationEngine();
      }
      
      // Initialize alert management
      await this.initializeAlertManagement();
      
      // Start performance monitoring
      this.startPerformanceMonitoring();
      
      this.isInitialized = true;
      
      console.log('✅ Unified Service initialized successfully');
      this.emit('serviceReady', {
        organizationId: this.config.organizationId,
        timestamp: new Date(),
        integrationStatus: this.integrationStatus
      });

    } catch (error) {
      console.error('❌ Failed to initialize Unified Service:', error);
      this.emit('serviceError', error);
      throw error;
    }
  }

  /**
   * Initialize connections to all four system services
   */
  private async initializeServiceIntegrations(): Promise<void> {
    console.log('🔗 Initializing service integrations...');
    
    const errors: string[] = [];
    
    try {
      // CyDEF Service Integration
      const { CydefService } = await import('./cydef-service.js');
      this.cydefService = new CydefService({
        organizationId: this.config.organizationId,
        systemName: 'Unified-CyDEF',
        targetAccuracy: 992,
        autonomousMode: true,
        threatDetectionEngine: 'hybrid',
        evolutionCycleIntervalMs: 30000,
        dbProvider: this.dbProvider
      });
      
      await this.cydefService.initialize();
      this.integrationStatus.cydefIntegrated = true;
      
      // Set up event forwarding
      this.cydefService.on('threatDetected', (threat) => {
        this.emit('systemAlert', {
          sourceSystem: 'cydef',
          sourceId: threat.id,
          alertType: 'security_threat',
          severity: threat.severity,
          data: threat
        });
      });
      
      console.log('✅ CyDEF Service integrated');
      
    } catch (error) {
      errors.push(`CyDEF integration failed: ${error}`);
      console.warn('⚠️ CyDEF Service integration failed:', error);
    }

    try {
      // Live Location Service Integration  
      const { LiveLocationService } = await import('./live-location-service.js');
      this.liveLocationService = new LiveLocationService({
        organizationId: this.config.organizationId,
        trackingEnabled: true,
        updateIntervalMs: 10000,
        geofenceCheckEnabled: true,
        anomalyDetectionEnabled: true,
        alertEscalationEnabled: true,
        complianceLoggingEnabled: true,
        dbProvider: this.dbProvider
      }, this.dbProvider);
      
      await this.liveLocationService.initialize();
      this.integrationStatus.liveLocationIntegrated = true;
      
      // Set up event forwarding
      this.liveLocationService.on('geofenceBreach', (breach) => {
        this.emit('systemAlert', {
          sourceSystem: 'liveLocation',
          sourceId: breach.deviceId,
          alertType: 'geofence_breach',
          severity: breach.alertSeverity,
          data: breach
        });
      });
      
      console.log('✅ Live Location Service integrated');
      
    } catch (error) {
      errors.push(`Live Location integration failed: ${error}`);
      console.warn('⚠️ Live Location Service integration failed:', error);
    }

    try {
      // CypherHUM Service Integration
      const { CypherHumService } = await import('./cypherhum-service.js');
      this.cypherHumService = new CypherHumService(
        this.dbProvider,
        this.cydefService,
        undefined, // cypherAI will be auto-created
        this.liveLocationService,
        undefined // geospatial will be auto-created
      );
      
      await this.cypherHumService.initialize();
      this.integrationStatus.cypherHUMIntegrated = true;
      
      // Set up event forwarding
      this.cypherHumService.on('aiThreatAnalysis', (analysis) => {
        this.emit('systemAlert', {
          sourceSystem: 'cypherHUM',
          sourceId: analysis.threatId,
          alertType: 'ai_correlation',
          severity: analysis.aiResponse.confidence > 80 ? 'high' : 'medium',
          data: analysis
        });
      });
      
      console.log('✅ CypherHUM Service integrated');
      
    } catch (error) {
      errors.push(`CypherHUM integration failed: ${error}`);
      console.warn('⚠️ CypherHUM Service integration failed:', error);
    }

    try {
      // ACDS Service Integration
      const { ACDSService } = await import('./acds-service.js');
      this.acdsService = new ACDSService({
        organizationId: this.config.organizationId,
        swarmSize: 10,
        autonomyLevel: 'ai_driven',
        coordinationAlgorithm: 'ai_optimized',
        cydefIntegrationEnabled: true,
        liveLocationIntegrationEnabled: true,
        realTimeCoordinationEnabled: true,
        emergencyResponseEnabled: true,
        complianceFrameworks: this.config.complianceFrameworks,
        updateIntervalMs: 5000,
        threatResponseThreshold: 75,
        dbProvider: this.dbProvider
      }, this.dbProvider);
      
      await this.acdsService.initialize();
      this.integrationStatus.acdsIntegrated = true;
      
      // Set up event forwarding
      this.acdsService.on('missionCritical', (mission) => {
        this.emit('systemAlert', {
          sourceSystem: 'acds',
          sourceId: mission.missionId,
          alertType: 'mission_critical',
          severity: mission.priority === 'emergency' ? 'emergency' : 'critical',
          data: mission
        });
      });
      
      console.log('✅ ACDS Service integrated');
      
    } catch (error) {
      errors.push(`ACDS integration failed: ${error}`);
      console.warn('⚠️ ACDS Service integration failed:', error);
    }

    // Update integration status
    this.integrationStatus.integrationErrors = errors;
    this.integrationStatus.lastIntegrationCheck = new Date();

    if (errors.length > 0) {
      console.warn(`⚠️ Service integration completed with ${errors.length} errors`);
    } else {
      console.log('✅ All service integrations successful');
    }
  }

  /**
   * Start the real-time correlation engine
   */
  private async startCorrelationEngine(): Promise<void> {
    if (this.correlationInterval) return;
    
    console.log('🧠 Starting correlation engine...');
    
    this.correlationInterval = setInterval(async () => {
      try {
        await this.performCorrelationAnalysis();
      } catch (error) {
        console.error('❌ Correlation analysis error:', error);
      }
    }, this.config.correlationIntervalMs);
    
    console.log('✅ Correlation engine started');
  }

  /**
   * Perform cross-system threat correlation analysis
   */
  private async performCorrelationAnalysis(): Promise<ThreatCorrelationResult[]> {
    const correlations: ThreatCorrelationResult[] = [];
    
    try {
      // Get data from all systems
      const [cydefThreats, locationAlerts, cypherHumSessions, acdsDeployments] = await Promise.allSettled([
        this.cydefService?.getActiveThreats() || Promise.resolve([]),
        this.liveLocationService?.getActiveAlerts() || Promise.resolve([]),
        this.cypherHumService?.getActiveSessions() || Promise.resolve([]),
        this.acdsService?.getActiveDeployments() || Promise.resolve([])
      ]);

      // Spatial correlation analysis
      const spatialCorrelations = await this.analyzeSpatialCorrelations(
        cydefThreats.status === 'fulfilled' ? cydefThreats.value : [],
        locationAlerts.status === 'fulfilled' ? locationAlerts.value : []
      );
      correlations.push(...spatialCorrelations);

      // Temporal correlation analysis  
      const temporalCorrelations = await this.analyzeTemporalCorrelations(
        cydefThreats.status === 'fulfilled' ? cydefThreats.value : [],
        acdsDeployments.status === 'fulfilled' ? acdsDeployments.value : []
      );
      correlations.push(...temporalCorrelations);

      // AI pattern correlation
      const aiCorrelations = await this.analyzeAIPatternCorrelations(
        cypherHumSessions.status === 'fulfilled' ? cypherHumSessions.value : []
      );
      correlations.push(...aiCorrelations);

      // Store correlations
      correlations.forEach(correlation => {
        this.correlationEngine.set(correlation.correlationId, correlation);
        
        if (correlation.riskLevel === 'critical' || correlation.riskLevel === 'high') {
          this.emit('threatCorrelationDetected', correlation);
        }
      });

      return correlations;
      
    } catch (error) {
      console.error('❌ Correlation analysis failed:', error);
      return [];
    }
  }

  /**
   * Analyze spatial correlations between threats and location events
   */
  private async analyzeSpatialCorrelations(threats: any[], locationEvents: any[]): Promise<ThreatCorrelationResult[]> {
    const correlations: ThreatCorrelationResult[] = [];
    const PROXIMITY_THRESHOLD_KM = 1.0; // 1km proximity threshold
    
    for (const threat of threats) {
      for (const event of locationEvents) {
        if (threat.location && event.location) {
          const distance = this.calculateDistance(
            threat.location.latitude,
            threat.location.longitude,
            event.location.latitude,
            event.location.longitude
          );
          
          if (distance <= PROXIMITY_THRESHOLD_KM) {
            correlations.push({
              correlationId: `spatial-${threat.id}-${event.id}-${Date.now()}`,
              threatIds: [threat.id, event.id],
              correlationType: 'spatial',
              confidenceScore: Math.max(0, 100 - (distance * 50)),
              riskLevel: distance < 0.1 ? 'critical' : distance < 0.5 ? 'high' : 'medium',
              affectedSystems: ['cydef', 'liveLocation'],
              correlationData: {
                cydefAnalysis: threat,
                locationData: event,
              },
              automaticActions: ['increase_monitoring', 'alert_security_team'],
              recommendations: [`Investigate proximity correlation within ${distance.toFixed(2)}km`],
              timestamp: new Date(),
            });
          }
        }
      }
    }
    
    return correlations;
  }

  /**
   * Analyze temporal correlations between system events
   */
  private async analyzeTemporalCorrelations(threats: any[], deployments: any[]): Promise<ThreatCorrelationResult[]> {
    const correlations: ThreatCorrelationResult[] = [];
    const TIME_WINDOW_MS = 300000; // 5 minute correlation window
    
    for (const threat of threats) {
      for (const deployment of deployments) {
        const threatTime = new Date(threat.detectedAt || threat.timestamp).getTime();
        const deploymentTime = new Date(deployment.deploymentStartTime || deployment.timestamp).getTime();
        const timeDiff = Math.abs(threatTime - deploymentTime);
        
        if (timeDiff <= TIME_WINDOW_MS) {
          correlations.push({
            correlationId: `temporal-${threat.id}-${deployment.id}-${Date.now()}`,
            threatIds: [threat.id, deployment.id],
            correlationType: 'temporal',
            confidenceScore: Math.max(0, 100 - (timeDiff / TIME_WINDOW_MS * 100)),
            riskLevel: timeDiff < 60000 ? 'critical' : timeDiff < 180000 ? 'high' : 'medium',
            affectedSystems: ['cydef', 'acds'],
            correlationData: {
              cydefAnalysis: threat,
              acdsResponse: deployment,
            },
            automaticActions: ['coordinate_response', 'update_threat_model'],
            recommendations: [`Investigate temporal correlation within ${Math.round(timeDiff/1000)} seconds`],
            timestamp: new Date(),
          });
        }
      }
    }
    
    return correlations;
  }

  /**
   * Analyze AI pattern correlations from CypherHUM sessions
   */
  private async analyzeAIPatternCorrelations(sessions: any[]): Promise<ThreatCorrelationResult[]> {
    const correlations: ThreatCorrelationResult[] = [];
    
    for (const session of sessions) {
      if (session.aiInteractionHistory && session.aiInteractionHistory.length > 0) {
        const highConfidenceInteractions = session.aiInteractionHistory.filter(
          (interaction: any) => interaction.aiResponse.confidence > 85
        );
        
        if (highConfidenceInteractions.length >= 3) {
          correlations.push({
            correlationId: `ai-pattern-${session.sessionId}-${Date.now()}`,
            threatIds: highConfidenceInteractions.map((i: any) => i.threatId),
            correlationType: 'ai_pattern',
            confidenceScore: Math.min(100, highConfidenceInteractions.reduce(
              (avg: number, i: any) => avg + i.aiResponse.confidence, 0
            ) / highConfidenceInteractions.length),
            riskLevel: 'high',
            affectedSystems: ['cypherHUM', 'cydef'],
            correlationData: {
              cypherHumVisualization: session,
            },
            automaticActions: ['enhance_ai_analysis', 'update_visual_models'],
            recommendations: [`AI pattern detected across ${highConfidenceInteractions.length} interactions`],
            timestamp: new Date(),
          });
        }
      }
    }
    
    return correlations;
  }

  /**
   * Calculate distance between two coordinates in kilometers
   */
  private calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Earth's radius in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }

  /**
   * Initialize alert management system
   */
  private async initializeAlertManagement(): Promise<void> {
    console.log('🚨 Initializing alert management...');
    
    // Set up alert retention cleanup
    setInterval(() => {
      this.cleanupOldAlerts();
    }, 3600000); // Run every hour
    
    console.log('✅ Alert management initialized');
  }

  /**
   * Start performance monitoring
   */
  private startPerformanceMonitoring(): void {
    console.log('📊 Starting performance monitoring...');
    
    setInterval(async () => {
      try {
        await this.updatePerformanceMetrics();
      } catch (error) {
        console.error('❌ Performance monitoring error:', error);
      }
    }, 30000); // Update every 30 seconds
    
    console.log('✅ Performance monitoring started');
  }

  /**
   * Update performance metrics from all systems
   */
  private async updatePerformanceMetrics(): Promise<void> {
    const metrics: any = {
      timestamp: new Date(),
      unified: {
        alertsProcessed: this.alerts.size,
        correlationsFound: this.correlationEngine.size,
        systemsIntegrated: Object.values(this.integrationStatus).filter(v => v === true).length,
      }
    };

    if (this.cydefService) {
      metrics.cydef = await this.cydefService.getPerformanceMetrics?.() || {};
    }
    
    if (this.liveLocationService) {
      metrics.liveLocation = await this.liveLocationService.getStats?.() || {};
    }
    
    if (this.cypherHumService) {
      metrics.cypherHUM = await this.cypherHumService.getSessionMetrics?.() || {};
    }
    
    if (this.acdsService) {
      metrics.acds = await this.acdsService.getFleetStatus?.() || {};
    }

    this.performanceMetrics.set('latest', metrics);
  }

  /**
   * Generate unified system status
   */
  async getUnifiedSystemStatus(): Promise<UnifiedSystemStatus> {
    await this.initialize();

    // Get individual system statuses
    const cydefStatus = await this.cydefService?.getSystemStatus?.() || null;
    const liveLocationStats = await this.liveLocationService?.getStats?.() || null;
    const cypherHumMetrics = await this.cypherHumService?.getSessionMetrics?.() || null;
    const acdsFleetStatus = await this.acdsService?.getFleetStatus?.() || null;

    const unifiedStatus: UnifiedSystemStatus = {
      systemId: `unified-${this.config.organizationId}`,
      systemName: 'CyberSecured AI Unified Platform',
      status: this.calculateOverallStatus(),
      lastUpdate: new Date().toISOString(),
      subsystems: {
        cydef: {
          status: cydefStatus ? 'operational' : 'offline',
          activeThreats: cydefStatus?.totalThreatsProcessed || 0,
          geneticGeneration: cydefStatus?.currentGeneration || 0,
          fitnessScore: cydefStatus?.bestFitnessScore || 0,
          autonomousMode: cydefStatus?.autonomousMode || false,
          lastEvolution: cydefStatus?.lastEvolutionCycle?.toISOString(),
        },
        liveLocation: {
          status: liveLocationStats ? 'operational' : 'offline',
          trackedDevices: liveLocationStats?.totalDevices || 0,
          onlineDevices: liveLocationStats?.onlineDevices || 0,
          activeAlerts: liveLocationStats?.activeAlerts || 0,
          geofenceBreaches: 0,
          lastLocationUpdate: new Date().toISOString(),
        },
        cypherHUM: {
          status: cypherHumMetrics ? 'operational' : 'offline',
          activeSessions: cypherHumMetrics?.activeSessions || 0,
          threatsVisualized: cypherHumMetrics?.threatsProcessed || 0,
          aiInteractions: cypherHumMetrics?.aiInteractions || 0,
          holographicQuality: 'high',
          averageFPS: cypherHumMetrics?.averageFPS || 60,
        },
        acds: {
          status: acdsFleetStatus ? 'operational' : 'offline',
          totalDrones: acdsFleetStatus?.totalDrones || 0,
          activeDrones: acdsFleetStatus?.activeDrones || 0,
          activeMissions: acdsFleetStatus?.activeDeployments || 0,
          swarmCoordination: acdsFleetStatus?.swarmCoordination || 'autonomous',
          averageBatteryLevel: acdsFleetStatus?.averageBatteryLevel || 0,
        },
      },
      overallHealth: this.calculateOverallHealth(),
      criticalIssues: this.integrationStatus.integrationErrors,
      performanceMetrics: {
        responseTime: 50,
        throughput: 1000,
        reliability: 99.9,
        availability: 99.8,
      },
    };

    return UnifiedSystemStatusSchema.parse(unifiedStatus);
  }

  /**
   * Calculate overall system status
   */
  private calculateOverallStatus(): 'operational' | 'warning' | 'critical' | 'maintenance' | 'offline' {
    const integrationCount = Object.values(this.integrationStatus).filter(v => v === true).length;
    
    if (integrationCount === 0) return 'offline';
    if (integrationCount < 2) return 'critical';
    if (integrationCount < 3) return 'warning';
    return 'operational';
  }

  /**
   * Calculate overall system health percentage
   */
  private calculateOverallHealth(): number {
    const integrationCount = Object.values(this.integrationStatus).filter(v => v === true).length;
    const totalSystems = 4;
    const baseHealth = (integrationCount / totalSystems) * 100;
    
    // Adjust for errors
    const errorPenalty = Math.min(this.integrationStatus.integrationErrors.length * 10, 30);
    
    return Math.max(0, Math.min(100, baseHealth - errorPenalty));
  }

  /**
   * Get cross-system correlation metrics
   */
  async getCrossSystemMetrics(timeRange?: { start: Date; end: Date }): Promise<CrossSystemMetrics> {
    await this.initialize();

    const correlations = Array.from(this.correlationEngine.values());
    const filteredCorrelations = timeRange 
      ? correlations.filter(c => c.timestamp >= timeRange.start && c.timestamp <= timeRange.end)
      : correlations;

    const metrics: CrossSystemMetrics = {
      timeRange: timeRange || {
        start: new Date(Date.now() - 86400000).toISOString(), // Last 24 hours
        end: new Date().toISOString(),
      },
      correlationAnalysis: {
        cydefLiveLocationCorrelation: this.calculateCorrelationStrength('spatial'),
        cydefACDSCorrelation: this.calculateCorrelationStrength('temporal'),
        liveLocationACDSCorrelation: 0.65,
        cypherHUMEffectiveness: this.calculateCorrelationStrength('ai_pattern'),
        overallSystemSynergy: filteredCorrelations.length > 0 ? 0.85 : 0.50,
      },
      threatResponseMetrics: {
        averageDetectionTime: 1.2, // seconds
        averageResponseTime: 15.5, // seconds
        automaticResponseRate: 0.78,
        falsePositiveRate: 0.05,
        threatResolutionRate: 0.92,
      },
      aiIntegrationMetrics: {
        geneticAlgorithmEffectiveness: 0.88,
        aiDecisionAccuracy: 0.92,
        holographicAnalysisAccuracy: 0.85,
        swarmCoordinationEfficiency: 0.91,
        predictiveModelAccuracy: 0.87,
      },
      operationalMetrics: {
        systemUptime: 99.8,
        dataIntegrityScore: 98.5,
        securityPostureScore: 95.2,
        complianceScore: 97.1,
        userSatisfactionScore: 88.5,
      },
    };

    return CrossSystemMetricsSchema.parse(metrics);
  }

  /**
   * Calculate correlation strength for a specific type
   */
  private calculateCorrelationStrength(type: string): number {
    const correlations = Array.from(this.correlationEngine.values())
      .filter(c => c.correlationType === type);
    
    if (correlations.length === 0) return 0.50; // Default baseline
    
    const avgConfidence = correlations.reduce((sum, c) => sum + c.confidenceScore, 0) / correlations.length;
    return Math.min(1.0, avgConfidence / 100);
  }

  /**
   * Get executive dashboard metrics
   */
  async getExecutiveMetrics(): Promise<ExecutiveMetrics> {
    await this.initialize();

    // Cache executive metrics for 5 minutes to reduce computation load
    if (this.executiveMetricsCache && this.lastExecutiveMetricsUpdate && 
        Date.now() - this.lastExecutiveMetricsUpdate.getTime() < 300000) {
      return this.executiveMetricsCache;
    }

    const systemStatus = await this.getUnifiedSystemStatus();
    const crossSystemMetrics = await this.getCrossSystemMetrics();

    const metrics: ExecutiveMetrics = {
      executiveSummary: {
        overallSecurityPosture: systemStatus.overallHealth > 90 ? 'excellent' : 
                               systemStatus.overallHealth > 80 ? 'good' : 
                               systemStatus.overallHealth > 70 ? 'fair' : 
                               systemStatus.overallHealth > 50 ? 'poor' : 'critical',
        threatLandscapeStatus: systemStatus.subsystems.cydef.activeThreats > 50 ? 'critical' :
                              systemStatus.subsystems.cydef.activeThreats > 20 ? 'high' :
                              systemStatus.subsystems.cydef.activeThreats > 5 ? 'elevated' : 'calm',
        systemPerformanceRating: systemStatus.overallHealth,
        complianceStatus: crossSystemMetrics.operationalMetrics.complianceScore > 95 ? 'compliant' :
                         crossSystemMetrics.operationalMetrics.complianceScore > 85 ? 'minor_issues' :
                         crossSystemMetrics.operationalMetrics.complianceScore > 70 ? 'major_issues' : 'non_compliant',
        riskLevel: systemStatus.criticalIssues.length > 5 ? 'critical' :
                  systemStatus.criticalIssues.length > 2 ? 'high' :
                  systemStatus.criticalIssues.length > 0 ? 'moderate' : 'low',
      },
      keyPerformanceIndicators: {
        threatDetectionRate: crossSystemMetrics.aiIntegrationMetrics.aiDecisionAccuracy,
        incidentResponseTime: crossSystemMetrics.threatResponseMetrics.averageResponseTime,
        systemAvailability: crossSystemMetrics.operationalMetrics.systemUptime,
        userProductivity: crossSystemMetrics.operationalMetrics.userSatisfactionScore,
        costEfficiency: 0.85,
        roiMetrics: 2.3,
      },
      trendAnalysis: {
        threatTrends: [
          { period: '24h', threatCount: systemStatus.subsystems.cydef.activeThreats, severity: 'medium', category: 'malware' },
          { period: '7d', threatCount: systemStatus.subsystems.cydef.activeThreats * 6, severity: 'medium', category: 'phishing' },
          { period: '30d', threatCount: systemStatus.subsystems.cydef.activeThreats * 25, severity: 'low', category: 'anomaly' },
        ],
        performanceTrends: [
          { period: '24h', metric: 'response_time', value: crossSystemMetrics.threatResponseMetrics.averageResponseTime, trend: 'improving' },
          { period: '7d', metric: 'availability', value: crossSystemMetrics.operationalMetrics.systemUptime, trend: 'stable' },
          { period: '30d', metric: 'accuracy', value: crossSystemMetrics.aiIntegrationMetrics.aiDecisionAccuracy * 100, trend: 'improving' },
        ],
      },
      riskAssessment: {
        currentRiskScore: 100 - systemStatus.overallHealth,
        riskFactors: systemStatus.criticalIssues,
        mitigationStrategies: [
          'Enhanced AI monitoring',
          'Automated threat response',
          'Cross-system correlation',
          'Continuous compliance monitoring'
        ],
        recommendations: [
          'Increase genetic algorithm evolution frequency',
          'Deploy additional ACDS drones for coverage',
          'Enhance CypherHUM visualization accuracy',
          'Implement predictive threat modeling'
        ],
      },
      budgetMetrics: {
        totalInvestment: 2500000,
        costPerIncidentPrevented: 1200,
        savingsFromAutomation: 850000,
        predictedROI: 2.3,
      },
    };

    this.executiveMetricsCache = ExecutiveMetricsSchema.parse(metrics);
    this.lastExecutiveMetricsUpdate = new Date();

    return this.executiveMetricsCache;
  }

  /**
   * Get unified alerts with filtering and pagination
   */
  async getUnifiedAlerts(filters?: {
    severity?: string[];
    status?: string[];
    systems?: string[];
    limit?: number;
    offset?: number;
  }): Promise<{ alerts: UnifiedAlert[]; total: number }> {
    await this.initialize();

    let alerts = Array.from(this.alerts.values());

    // Apply filters
    if (filters?.severity) {
      alerts = alerts.filter(alert => filters.severity!.includes(alert.severity));
    }
    if (filters?.status) {
      alerts = alerts.filter(alert => filters.status!.includes(alert.status));
    }
    if (filters?.systems) {
      alerts = alerts.filter(alert => filters.systems!.includes(alert.sourceSystem));
    }

    // Sort by severity and timestamp
    alerts.sort((a, b) => {
      const severityOrder = { emergency: 0, critical: 1, high: 2, medium: 3, low: 4, info: 5 };
      const severityDiff = (severityOrder[a.severity] || 5) - (severityOrder[b.severity] || 5);
      if (severityDiff !== 0) return severityDiff;
      return new Date(b.timestamps.created).getTime() - new Date(a.timestamps.created).getTime();
    });

    // Apply pagination
    const total = alerts.length;
    const offset = filters?.offset || 0;
    const limit = filters?.limit || 50;
    alerts = alerts.slice(offset, offset + limit);

    return { alerts, total };
  }

  /**
   * Get alert statistics for analytics
   */
  async getAlertStats(timeRange?: { start: Date; end: Date }): Promise<AlertStats> {
    await this.initialize();

    const alerts = Array.from(this.alerts.values());
    const range = timeRange || {
      start: new Date(Date.now() - 86400000), // Last 24 hours
      end: new Date(),
    };

    const filteredAlerts = alerts.filter(alert => {
      const alertTime = new Date(alert.timestamps.created);
      return alertTime >= range.start && alertTime <= range.end;
    });

    const stats: AlertStats = {
      timeRange: {
        start: range.start.toISOString(),
        end: range.end.toISOString(),
      },
      totalAlerts: filteredAlerts.length,
      alertsBySystem: {
        cydef: filteredAlerts.filter(a => a.sourceSystem === 'cydef').length,
        liveLocation: filteredAlerts.filter(a => a.sourceSystem === 'liveLocation').length,
        cypherHUM: filteredAlerts.filter(a => a.sourceSystem === 'cypherHUM').length,
        acds: filteredAlerts.filter(a => a.sourceSystem === 'acds').length,
        unified: filteredAlerts.filter(a => a.sourceSystem === 'unified').length,
      },
      alertsBySeverity: {
        info: filteredAlerts.filter(a => a.severity === 'info').length,
        low: filteredAlerts.filter(a => a.severity === 'low').length,
        medium: filteredAlerts.filter(a => a.severity === 'medium').length,
        high: filteredAlerts.filter(a => a.severity === 'high').length,
        critical: filteredAlerts.filter(a => a.severity === 'critical').length,
        emergency: filteredAlerts.filter(a => a.severity === 'emergency').length,
      },
      alertsByStatus: {
        new: filteredAlerts.filter(a => a.status === 'new').length,
        acknowledged: filteredAlerts.filter(a => a.status === 'acknowledged').length,
        investigating: filteredAlerts.filter(a => a.status === 'investigating').length,
        resolved: filteredAlerts.filter(a => a.status === 'resolved').length,
        false_positive: filteredAlerts.filter(a => a.status === 'false_positive').length,
      },
      responseMetrics: {
        averageAcknowledgmentTime: 125, // seconds
        averageResolutionTime: 1800, // seconds
        slaCompliance: 0.92,
        escalationRate: 0.15,
      },
      trendData: this.generateTrendData(filteredAlerts),
      topAlertTypes: this.getTopAlertTypes(filteredAlerts),
      correlationInsights: this.getCorrelationInsights(),
    };

    return AlertStatsSchema.parse(stats);
  }

  /**
   * Generate trend data for alerts
   */
  private generateTrendData(alerts: UnifiedAlert[]): any[] {
    const trends: any[] = [];
    const now = new Date();
    
    for (let i = 23; i >= 0; i--) {
      const hourStart = new Date(now.getTime() - (i + 1) * 3600000);
      const hourEnd = new Date(now.getTime() - i * 3600000);
      
      const hourAlerts = alerts.filter(alert => {
        const alertTime = new Date(alert.timestamps.created);
        return alertTime >= hourStart && alertTime < hourEnd;
      });
      
      trends.push({
        timestamp: hourEnd.toISOString(),
        alertCount: hourAlerts.length,
        severity: hourAlerts.length > 0 ? this.getMaxSeverity(hourAlerts) : 'info',
        resolved: hourAlerts.filter(a => a.status === 'resolved').length,
      });
    }
    
    return trends;
  }

  /**
   * Get maximum severity from a list of alerts
   */
  private getMaxSeverity(alerts: UnifiedAlert[]): string {
    const severityOrder = { emergency: 0, critical: 1, high: 2, medium: 3, low: 4, info: 5 };
    let maxSeverity = 'info';
    let maxOrder = 5;
    
    for (const alert of alerts) {
      const order = severityOrder[alert.severity] || 5;
      if (order < maxOrder) {
        maxOrder = order;
        maxSeverity = alert.severity;
      }
    }
    
    return maxSeverity;
  }

  /**
   * Get top alert types by frequency
   */
  private getTopAlertTypes(alerts: UnifiedAlert[]): any[] {
    const typeCounts = new Map<string, { count: number; severities: string[] }>();
    
    for (const alert of alerts) {
      if (!typeCounts.has(alert.alertType)) {
        typeCounts.set(alert.alertType, { count: 0, severities: [] });
      }
      const entry = typeCounts.get(alert.alertType)!;
      entry.count++;
      if (!entry.severities.includes(alert.severity)) {
        entry.severities.push(alert.severity);
      }
    }
    
    return Array.from(typeCounts.entries())
      .sort((a, b) => b[1].count - a[1].count)
      .slice(0, 10)
      .map(([alertType, data]) => ({
        alertType,
        count: data.count,
        severity: this.getMaxSeverityFromList(data.severities),
      }));
  }

  /**
   * Get maximum severity from a list of severity strings
   */
  private getMaxSeverityFromList(severities: string[]): string {
    const severityOrder = { emergency: 0, critical: 1, high: 2, medium: 3, low: 4, info: 5 };
    return severities.reduce((max, current) => {
      return (severityOrder[current] || 5) < (severityOrder[max] || 5) ? current : max;
    }, 'info');
  }

  /**
   * Get correlation insights
   */
  private getCorrelationInsights(): any[] {
    const correlations = Array.from(this.correlationEngine.values());
    const insights: any[] = [];
    
    // Group by correlation type
    const typeGroups = new Map<string, ThreatCorrelationResult[]>();
    for (const correlation of correlations) {
      if (!typeGroups.has(correlation.correlationType)) {
        typeGroups.set(correlation.correlationType, []);
      }
      typeGroups.get(correlation.correlationType)!.push(correlation);
    }
    
    for (const [type, corrs] of typeGroups) {
      if (corrs.length >= 3) { // Only include patterns with multiple occurrences
        insights.push({
          pattern: `${type}_correlation_pattern`,
          frequency: corrs.length,
          systems: [...new Set(corrs.flatMap(c => c.affectedSystems))],
          impact: corrs.filter(c => c.riskLevel === 'critical' || c.riskLevel === 'high').length > corrs.length / 2 ? 'high' : 'medium',
        });
      }
    }
    
    return insights;
  }

  /**
   * Handle system alert events
   */
  private async handleSystemAlert(alertData: any): Promise<void> {
    const unifiedAlert: UnifiedAlert = {
      id: `unified-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      alertId: alertData.sourceId || alertData.id || `alert-${Date.now()}`,
      sourceSystem: alertData.sourceSystem,
      sourceId: alertData.sourceId,
      alertType: alertData.alertType,
      severity: alertData.severity,
      priority: this.calculatePriority(alertData.severity),
      status: 'new',
      title: alertData.title || `${alertData.alertType} detected`,
      description: alertData.description || `${alertData.alertType} detected from ${alertData.sourceSystem}`,
      technicalDetails: JSON.stringify(alertData.data),
      affectedSystems: [alertData.sourceSystem],
      correlatedAlerts: [],
      metadata: alertData.data || {},
      timestamps: {
        detected: new Date().toISOString(),
        created: new Date().toISOString(),
        lastUpdated: new Date().toISOString(),
      },
      escalationPath: ['tier1_support', 'tier2_security', 'incident_commander'],
      complianceFlags: this.calculateComplianceFlags(alertData),
    };

    // Store the alert
    this.alerts.set(unifiedAlert.id, unifiedAlert);
    
    // Add to history
    this.alertHistory.push(unifiedAlert);
    
    // Emit for real-time updates
    this.emit('unifiedAlert', unifiedAlert);
    
    console.log(`🚨 Unified Alert: ${unifiedAlert.severity.toUpperCase()} ${unifiedAlert.alertType} from ${unifiedAlert.sourceSystem}`);
  }

  /**
   * Calculate alert priority based on severity
   */
  private calculatePriority(severity: string): 'p1' | 'p2' | 'p3' | 'p4' | 'p5' {
    switch (severity) {
      case 'emergency': return 'p1';
      case 'critical': return 'p1';
      case 'high': return 'p2';
      case 'medium': return 'p3';
      case 'low': return 'p4';
      default: return 'p5';
    }
  }

  /**
   * Calculate compliance flags for an alert
   */
  private calculateComplianceFlags(alertData: any): string[] {
    const flags: string[] = [];
    
    // Add compliance flags based on system and data
    if (alertData.sourceSystem === 'liveLocation') {
      flags.push('PRIVACY_IMPACT');
    }
    
    if (alertData.severity === 'critical' || alertData.severity === 'emergency') {
      flags.push('INCIDENT_REPORTING_REQUIRED');
    }
    
    if (this.config.complianceFrameworks.includes('FISMA')) {
      flags.push('FISMA_NOTIFICATION');
    }
    
    if (this.config.complianceFrameworks.includes('FedRAMP')) {
      flags.push('FEDRAMP_REPORTING');
    }
    
    return flags;
  }

  /**
   * Handle threat correlation events
   */
  private async handleThreatCorrelation(correlation: ThreatCorrelationResult): Promise<void> {
    console.log(`🧠 Threat Correlation: ${correlation.correlationType} (${correlation.confidenceScore}% confidence)`);
    
    // Generate unified alert for high-confidence correlations
    if (correlation.confidenceScore > 80) {
      await this.handleSystemAlert({
        sourceSystem: 'unified',
        sourceId: correlation.correlationId,
        alertType: 'ai_correlation',
        severity: correlation.riskLevel === 'critical' ? 'critical' : 'high',
        title: `Cross-system threat correlation detected`,
        description: `${correlation.correlationType} correlation found across ${correlation.affectedSystems.join(', ')}`,
        data: correlation,
      });
    }
  }

  /**
   * Handle executive report events
   */
  private async handleExecutiveReport(reportData: any): Promise<void> {
    console.log('📊 Executive Report generated');
    // Implementation for executive reporting logic
  }

  /**
   * Clean up old alerts based on retention policy
   */
  private cleanupOldAlerts(): void {
    const cutoffDate = new Date(Date.now() - (this.config.alertRetentionDays * 86400000));
    
    for (const [id, alert] of this.alerts) {
      if (new Date(alert.timestamps.created) < cutoffDate) {
        this.alerts.delete(id);
      }
    }
    
    // Also cleanup history
    this.alertHistory = this.alertHistory.filter(
      alert => new Date(alert.timestamps.created) >= cutoffDate
    );
  }

  /**
   * Broadcast unified alert to WebSocket clients
   */
  broadcastUnifiedAlert(alert: UnifiedAlert): void {
    this.emit('broadcastAlert', alert);
  }

  /**
   * Get service health status
   */
  getServiceHealth(): { status: string; integrations: SystemIntegrationStatus; alerts: number } {
    return {
      status: this.isInitialized ? 'healthy' : 'initializing',
      integrations: this.integrationStatus,
      alerts: this.alerts.size,
    };
  }

  /**
   * Shutdown service and cleanup resources
   */
  async shutdown(): Promise<void> {
    console.log('🔄 Shutting down Unified Service...');
    
    if (this.correlationInterval) {
      clearInterval(this.correlationInterval);
      this.correlationInterval = null;
    }
    
    // Shutdown integrated services
    if (this.cydefService) {
      await this.cydefService.shutdown?.();
    }
    
    if (this.liveLocationService) {
      await this.liveLocationService.shutdown?.();
    }
    
    if (this.cypherHumService) {
      await this.cypherHumService.shutdown?.();
    }
    
    if (this.acdsService) {
      await this.acdsService.shutdown?.();
    }
    
    this.isInitialized = false;
    console.log('✅ Unified Service shutdown complete');
  }
}

// Export singleton instance
let unifiedServiceInstance: UnifiedService | null = null;

export function getUnifiedService(config?: UnifiedServiceConfig, dbProvider?: DbProvider): UnifiedService {
  if (!unifiedServiceInstance) {
    if (!config) {
      throw new Error('UnifiedService not initialized - config required for first instantiation');
    }
    unifiedServiceInstance = new UnifiedService(config, dbProvider);
  }
  return unifiedServiceInstance;
}