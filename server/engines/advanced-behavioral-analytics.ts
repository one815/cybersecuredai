import { EventEmitter } from 'events';

export interface UserBehaviorVector {
  userId: string;
  timestamp: Date;
  accessTime: number; // Hour of day (0-23)
  location: string;
  deviceFingerprint: string;
  dataVolume: number; // MB accessed
  fileTypes: string[];
  sessionDuration: number; // minutes
  clickPatterns: number[]; // Mouse movement patterns
  keystrokePattern: number[]; // Typing rhythm
  applicationUsage: Record<string, number>; // App usage time
}

export interface BehavioralCluster {
  clusterId: string;
  centroid: number[];
  userIds: string[];
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  clusterSize: number;
  coherence: number; // How tight the cluster is
}

export interface AnomalyScore {
  overallScore: number;
  dimensionScores: Record<string, number>;
  isAnomaly: boolean;
  confidence: number;
  anomalyType: string;
}

export interface PredictiveRiskAssessment {
  currentRisk: number;
  predictedRisk7Days: number;
  predictedRisk30Days: number;
  riskTrend: 'increasing' | 'decreasing' | 'stable';
  keyRiskFactors: string[];
  recommendations: string[];
}

/**
 * Advanced Behavioral Analytics Engine
 * Implements machine learning for user behavior analysis
 */
export class AdvancedBehavioralAnalytics extends EventEmitter {
  private userBehaviorHistory: Map<string, UserBehaviorVector[]> = new Map();
  private behavioralClusters: BehavioralCluster[] = [];
  private baselineProfiles: Map<string, number[]> = new Map();
  private anomalyThresholds: Record<string, number> = {
    time: 2.5,
    location: 2.0,
    volume: 3.0,
    pattern: 2.5,
    application: 2.0
  };

  constructor() {
    super();
    this.initializeAnalytics();
  }

  private initializeAnalytics(): void {
    console.log('🧠 Initializing Advanced Behavioral Analytics...');
    console.log('   📊 Statistical Anomaly Detection');
    console.log('   🎯 K-Means Clustering Algorithm');
    console.log('   📈 Time Series Forecasting');
    console.log('   🔍 Behavioral Pattern Recognition');
    console.log('   ⚡ Real-time Risk Scoring');
  }

  /**
   * Process user behavior and extract features
   */
  public processBehaviorVector(behaviorVector: UserBehaviorVector): void {
    const userId = behaviorVector.userId;
    
    // Add to history
    if (!this.userBehaviorHistory.has(userId)) {
      this.userBehaviorHistory.set(userId, []);
    }
    
    const userHistory = this.userBehaviorHistory.get(userId)!;
    userHistory.push(behaviorVector);
    
    // Keep only last 1000 entries per user
    if (userHistory.length > 1000) {
      this.userBehaviorHistory.set(userId, userHistory.slice(-1000));
    }

    // Update baseline profile
    this.updateBaselineProfile(userId, behaviorVector);

    // Trigger real-time analysis
    this.emit('behaviorProcessed', {
      userId,
      anomalyScore: this.detectAnomalies(userId, behaviorVector),
      riskAssessment: this.assessPredictiveRisk(userId)
    });
  }

  /**
   * Statistical Anomaly Detection using Isolation Forest simulation
   */
  public detectAnomalies(userId: string, currentBehavior: UserBehaviorVector): AnomalyScore {
    const baseline = this.baselineProfiles.get(userId);
    if (!baseline) {
      return {
        overallScore: 0.5,
        dimensionScores: {},
        isAnomaly: false,
        confidence: 0.3,
        anomalyType: 'insufficient_data'
      };
    }

    const features = this.extractBehavioralFeatures(currentBehavior);
    const dimensionScores: Record<string, number> = {};
    
    // Calculate anomaly scores for each dimension
    dimensionScores.timeAnomaly = this.calculateTimeAnomalyScore(currentBehavior, baseline);
    dimensionScores.locationAnomaly = this.calculateLocationAnomalyScore(currentBehavior, baseline);
    dimensionScores.volumeAnomaly = this.calculateVolumeAnomalyScore(currentBehavior, baseline);
    dimensionScores.patternAnomaly = this.calculatePatternAnomalyScore(currentBehavior, baseline);
    dimensionScores.applicationAnomaly = this.calculateApplicationAnomalyScore(currentBehavior, baseline);

    // Weighted overall score
    const weights = { time: 0.2, location: 0.25, volume: 0.25, pattern: 0.15, application: 0.15 };
    const overallScore = Object.entries(dimensionScores).reduce((sum, [key, score]) => {
      const dimension = key.replace('Anomaly', '');
      return sum + score * (weights[dimension] || 0.2);
    }, 0);

    // Determine if it's an anomaly
    const isAnomaly = overallScore > 0.6;
    const confidence = Math.min(overallScore, 1);
    
    // Classify anomaly type
    let anomalyType = 'normal';
    if (isAnomaly) {
      const maxDimension = Object.entries(dimensionScores).reduce((max, [key, score]) => 
        score > max.score ? { key, score } : max, { key: '', score: 0 });
      anomalyType = maxDimension.key.replace('Anomaly', '_anomaly');
    }

    return {
      overallScore,
      dimensionScores,
      isAnomaly,
      confidence,
      anomalyType
    };
  }

  /**
   * K-Means Clustering for behavioral grouping
   */
  public performBehavioralClustering(k: number = 5): BehavioralCluster[] {
    const allVectors: number[][] = [];
    const userIds: string[] = [];

    // Collect all user behavior vectors
    this.userBehaviorHistory.forEach((behaviors, userId) => {
      if (behaviors.length > 10) { // Minimum data requirement
        const avgVector = this.calculateAverageBehaviorVector(behaviors);
        allVectors.push(avgVector);
        userIds.push(userId);
      }
    });

    if (allVectors.length < k) {
      return []; // Not enough data for clustering
    }

    // Initialize centroids randomly
    const centroids: number[][] = [];
    for (let i = 0; i < k; i++) {
      const randomIndex = Math.floor(Math.random() * allVectors.length);
      centroids.push([...allVectors[randomIndex]]);
    }

    // K-means iterations
    for (let iter = 0; iter < 100; iter++) {
      const clusters: number[][] = Array(k).fill(null).map(() => []);
      const clusterAssignments: number[] = [];

      // Assign points to closest centroids
      allVectors.forEach((vector, index) => {
        let minDistance = Infinity;
        let closestCluster = 0;

        centroids.forEach((centroid, clusterIndex) => {
          const distance = this.euclideanDistance(vector, centroid);
          if (distance < minDistance) {
            minDistance = distance;
            closestCluster = clusterIndex;
          }
        });

        clusters[closestCluster].push(index);
        clusterAssignments.push(closestCluster);
      });

      // Update centroids
      let converged = true;
      clusters.forEach((cluster, clusterIndex) => {
        if (cluster.length > 0) {
          const newCentroid = this.calculateCentroid(cluster.map(i => allVectors[i]));
          if (this.euclideanDistance(newCentroid, centroids[clusterIndex]) > 0.01) {
            converged = false;
          }
          centroids[clusterIndex] = newCentroid;
        }
      });

      if (converged) break;
    }

    // Create cluster objects
    this.behavioralClusters = centroids.map((centroid, index) => {
      const clusterUserIds = userIds.filter((_, userIndex) => 
        clusterAssignments[userIndex] === index);
      const riskLevel = this.assessClusterRisk(centroid);
      const coherence = this.calculateClusterCoherence(centroid, 
        clusterUserIds.map(userId => 
          this.calculateAverageBehaviorVector(this.userBehaviorHistory.get(userId)!)
        )
      );

      return {
        clusterId: `cluster_${index}`,
        centroid,
        userIds: clusterUserIds,
        riskLevel,
        clusterSize: clusterUserIds.length,
        coherence
      };
    });

    return this.behavioralClusters;
  }

  /**
   * Predictive Risk Assessment using time series analysis
   */
  public assessPredictiveRisk(userId: string): PredictiveRiskAssessment {
    const userHistory = this.userBehaviorHistory.get(userId);
    if (!userHistory || userHistory.length < 7) {
      return {
        currentRisk: 0.3,
        predictedRisk7Days: 0.3,
        predictedRisk30Days: 0.3,
        riskTrend: 'stable',
        keyRiskFactors: ['Insufficient historical data'],
        recommendations: ['Collect more behavioral data for accurate assessment']
      };
    }

    // Calculate daily risk scores for time series
    const dailyRisks = this.calculateDailyRiskScores(userHistory);
    const currentRisk = dailyRisks[dailyRisks.length - 1] || 0.3;

    // Time series forecasting using simple linear regression
    const { trend, prediction7Days, prediction30Days } = this.forecastRisk(dailyRisks);

    // Identify key risk factors
    const keyRiskFactors = this.identifyRiskFactors(userId, userHistory);

    // Generate recommendations
    const recommendations = this.generateRiskRecommendations(currentRisk, keyRiskFactors);

    return {
      currentRisk,
      predictedRisk7Days: Math.max(0, Math.min(1, prediction7Days)),
      predictedRisk30Days: Math.max(0, Math.min(1, prediction30Days)),
      riskTrend: trend,
      keyRiskFactors,
      recommendations
    };
  }

  /**
   * Real-time behavior scoring
   */
  public calculateBehaviorScore(userId: string): {
    score: number;
    factors: Record<string, number>;
    percentile: number;
  } {
    const userHistory = this.userBehaviorHistory.get(userId);
    if (!userHistory || userHistory.length === 0) {
      return { score: 50, factors: {}, percentile: 50 };
    }

    const recentBehavior = userHistory.slice(-10); // Last 10 sessions
    const factors = {
      consistency: this.calculateConsistencyScore(recentBehavior),
      timeRegularity: this.calculateTimeRegularityScore(recentBehavior),
      locationStability: this.calculateLocationStabilityScore(recentBehavior),
      dataUsagePattern: this.calculateDataUsageScore(recentBehavior),
      securityAwareness: this.calculateSecurityAwarenessScore(recentBehavior)
    };

    // Weighted behavior score
    const weights = { consistency: 0.25, timeRegularity: 0.2, locationStability: 0.2, 
                     dataUsagePattern: 0.2, securityAwareness: 0.15 };
    
    const score = Object.entries(factors).reduce((sum, [factor, value]) => 
      sum + value * weights[factor], 0) * 100;

    // Calculate percentile among all users
    const allScores = Array.from(this.userBehaviorHistory.keys())
      .map(uid => this.calculateBehaviorScore(uid).score)
      .filter(s => s !== score);
    
    const percentile = allScores.length > 0 ? 
      (allScores.filter(s => s < score).length / allScores.length) * 100 : 50;

    return { score: Math.round(score), factors, percentile: Math.round(percentile) };
  }

  // Helper methods
  private extractBehavioralFeatures(behavior: UserBehaviorVector): number[] {
    return [
      behavior.accessTime / 24,
      behavior.dataVolume / 1000,
      behavior.sessionDuration / 480,
      behavior.clickPatterns.length / 100,
      behavior.keystrokePattern.length / 100,
      Object.keys(behavior.applicationUsage).length / 10
    ];
  }

  private updateBaselineProfile(userId: string, behavior: UserBehaviorVector): void {
    const features = this.extractBehavioralFeatures(behavior);
    
    if (!this.baselineProfiles.has(userId)) {
      this.baselineProfiles.set(userId, features);
    } else {
      const current = this.baselineProfiles.get(userId)!;
      // Exponential moving average
      const alpha = 0.1;
      const updated = current.map((val, index) => 
        alpha * features[index] + (1 - alpha) * val);
      this.baselineProfiles.set(userId, updated);
    }
  }

  private calculateTimeAnomalyScore(behavior: UserBehaviorVector, baseline: number[]): number {
    const normalizedTime = behavior.accessTime / 24;
    const baselineTime = baseline[0];
    return Math.abs(normalizedTime - baselineTime) * 4; // Scale to 0-1
  }

  private calculateLocationAnomalyScore(behavior: UserBehaviorVector, baseline: number[]): number {
    // Simplified location anomaly - in practice would use geographic distance
    const userHistory = this.userBehaviorHistory.get(behavior.userId);
    if (!userHistory) return 0.5;
    
    const recentLocations = userHistory.slice(-20).map(b => b.location);
    const isNewLocation = !recentLocations.includes(behavior.location);
    return isNewLocation ? 0.8 : 0.2;
  }

  private calculateVolumeAnomalyScore(behavior: UserBehaviorVector, baseline: number[]): number {
    const normalizedVolume = behavior.dataVolume / 1000;
    const baselineVolume = baseline[1];
    const deviation = Math.abs(normalizedVolume - baselineVolume) / (baselineVolume + 0.1);
    return Math.min(deviation, 1);
  }

  private calculatePatternAnomalyScore(behavior: UserBehaviorVector, baseline: number[]): number {
    const sessionScore = Math.abs((behavior.sessionDuration / 480) - baseline[2]);
    const clickScore = Math.abs((behavior.clickPatterns.length / 100) - baseline[3]);
    return (sessionScore + clickScore) / 2;
  }

  private calculateApplicationAnomalyScore(behavior: UserBehaviorVector, baseline: number[]): number {
    const appCount = Object.keys(behavior.applicationUsage).length / 10;
    const baselineAppCount = baseline[5];
    return Math.abs(appCount - baselineAppCount) * 2;
  }

  private calculateAverageBehaviorVector(behaviors: UserBehaviorVector[]): number[] {
    const features = behaviors.map(b => this.extractBehavioralFeatures(b));
    const avgVector = new Array(features[0].length).fill(0);
    
    features.forEach(feature => {
      feature.forEach((val, index) => {
        avgVector[index] += val / features.length;
      });
    });
    
    return avgVector;
  }

  private euclideanDistance(a: number[], b: number[]): number {
    return Math.sqrt(a.reduce((sum, val, index) => 
      sum + Math.pow(val - b[index], 2), 0));
  }

  private calculateCentroid(vectors: number[][]): number[] {
    const centroid = new Array(vectors[0].length).fill(0);
    vectors.forEach(vector => {
      vector.forEach((val, index) => {
        centroid[index] += val / vectors.length;
      });
    });
    return centroid;
  }

  private assessClusterRisk(centroid: number[]): 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL' {
    // Risk assessment based on centroid characteristics
    const timeRisk = centroid[0] < 0.2 || centroid[0] > 0.9 ? 0.7 : 0.3;
    const volumeRisk = centroid[1] > 0.8 ? 0.8 : 0.2;
    const sessionRisk = centroid[2] > 0.8 ? 0.6 : 0.2;
    
    const overallRisk = (timeRisk + volumeRisk + sessionRisk) / 3;
    
    if (overallRisk > 0.7) return 'CRITICAL';
    if (overallRisk > 0.5) return 'HIGH';
    if (overallRisk > 0.3) return 'MEDIUM';
    return 'LOW';
  }

  private calculateClusterCoherence(centroid: number[], vectors: number[][]): number {
    const distances = vectors.map(vector => this.euclideanDistance(vector, centroid));
    const avgDistance = distances.reduce((sum, dist) => sum + dist, 0) / distances.length;
    return 1 / (1 + avgDistance); // Inverse of average distance
  }

  private calculateDailyRiskScores(userHistory: UserBehaviorVector[]): number[] {
    // Group behaviors by day and calculate daily risk
    const dailyGroups = new Map<string, UserBehaviorVector[]>();
    
    userHistory.forEach(behavior => {
      const day = behavior.timestamp.toISOString().split('T')[0];
      if (!dailyGroups.has(day)) {
        dailyGroups.set(day, []);
      }
      dailyGroups.get(day)!.push(behavior);
    });

    return Array.from(dailyGroups.values()).map(dayBehaviors => {
      const anomalyScores = dayBehaviors.map(behavior => 
        this.detectAnomalies(behavior.userId, behavior).overallScore);
      return anomalyScores.reduce((sum, score) => sum + score, 0) / anomalyScores.length;
    });
  }

  private forecastRisk(dailyRisks: number[]): {
    trend: 'increasing' | 'decreasing' | 'stable';
    prediction7Days: number;
    prediction30Days: number;
  } {
    if (dailyRisks.length < 3) {
      return { trend: 'stable', prediction7Days: 0.3, prediction30Days: 0.3 };
    }

    // Simple linear regression
    const n = dailyRisks.length;
    const sumX = (n * (n - 1)) / 2;
    const sumY = dailyRisks.reduce((sum, risk) => sum + risk, 0);
    const sumXY = dailyRisks.reduce((sum, risk, index) => sum + index * risk, 0);
    const sumXX = (n * (n - 1) * (2 * n - 1)) / 6;

    const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;

    const trend = slope > 0.01 ? 'increasing' : slope < -0.01 ? 'decreasing' : 'stable';
    const prediction7Days = intercept + slope * (n + 7);
    const prediction30Days = intercept + slope * (n + 30);

    return { trend, prediction7Days, prediction30Days };
  }

  private identifyRiskFactors(userId: string, userHistory: UserBehaviorVector[]): string[] {
    const factors: string[] = [];
    const recent = userHistory.slice(-10);

    // Analyze patterns
    const timeVariance = this.calculateVariance(recent.map(b => b.accessTime));
    if (timeVariance > 50) factors.push('Irregular access times');

    const avgDataVolume = recent.reduce((sum, b) => sum + b.dataVolume, 0) / recent.length;
    if (avgDataVolume > 500) factors.push('High data volume usage');

    const uniqueLocations = new Set(recent.map(b => b.location)).size;
    if (uniqueLocations > 3) factors.push('Multiple access locations');

    const longSessions = recent.filter(b => b.sessionDuration > 240).length;
    if (longSessions > recent.length * 0.5) factors.push('Extended session durations');

    return factors.length > 0 ? factors : ['Normal behavioral patterns'];
  }

  private generateRiskRecommendations(currentRisk: number, riskFactors: string[]): string[] {
    const recommendations: string[] = [];

    if (currentRisk > 0.7) {
      recommendations.push('Immediate security review required');
      recommendations.push('Consider temporary access restrictions');
    } else if (currentRisk > 0.5) {
      recommendations.push('Enhanced monitoring recommended');
      recommendations.push('Additional authentication may be needed');
    }

    if (riskFactors.includes('Irregular access times')) {
      recommendations.push('Verify access during off-hours');
    }

    if (riskFactors.includes('Multiple access locations')) {
      recommendations.push('Implement location-based access controls');
    }

    return recommendations.length > 0 ? recommendations : ['Continue normal monitoring'];
  }

  private calculateConsistencyScore(behaviors: UserBehaviorVector[]): number {
    if (behaviors.length < 2) return 0.5;
    
    const timeVariance = this.calculateVariance(behaviors.map(b => b.accessTime));
    const volumeVariance = this.calculateVariance(behaviors.map(b => b.dataVolume));
    
    // Lower variance = higher consistency
    return Math.max(0, 1 - (timeVariance + volumeVariance) / 1000);
  }

  private calculateTimeRegularityScore(behaviors: UserBehaviorVector[]): number {
    const accessTimes = behaviors.map(b => b.accessTime);
    const businessHours = accessTimes.filter(time => time >= 8 && time <= 17).length;
    return businessHours / accessTimes.length;
  }

  private calculateLocationStabilityScore(behaviors: UserBehaviorVector[]): number {
    const uniqueLocations = new Set(behaviors.map(b => b.location)).size;
    return Math.max(0, 1 - (uniqueLocations - 1) / 5); // Penalize many locations
  }

  private calculateDataUsageScore(behaviors: UserBehaviorVector[]): number {
    const avgVolume = behaviors.reduce((sum, b) => sum + b.dataVolume, 0) / behaviors.length;
    // Moderate data usage scores higher than very high or very low
    return 1 - Math.abs(avgVolume - 250) / 500;
  }

  private calculateSecurityAwarenessScore(behaviors: UserBehaviorVector[]): number {
    // Simulated based on session patterns and file types
    const avgSessionDuration = behaviors.reduce((sum, b) => sum + b.sessionDuration, 0) / behaviors.length;
    const appropriateSession = avgSessionDuration >= 15 && avgSessionDuration <= 240;
    return appropriateSession ? 0.8 : 0.4;
  }

  private calculateVariance(values: number[]): number {
    const mean = values.reduce((sum, val) => sum + val, 0) / values.length;
    return values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / values.length;
  }
}