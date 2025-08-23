import { EventEmitter } from 'events';

export interface MLModelPrediction {
  prediction: number;
  confidence: number;
  modelUsed: string;
  features: Record<string, number>;
  uncertainty: number;
}

export interface EnsembleResult {
  finalPrediction: number;
  modelWeights: Record<string, number>;
  individualPredictions: MLModelPrediction[];
  confidenceInterval: [number, number];
}

export interface ThreatFeatures {
  ipReputation: number;
  requestFrequency: number;
  payloadSize: number;
  sessionDuration: number;
  failedAttempts: number;
  timeOfDay: number;
  geographicRisk: number;
  protocolAnomaly: number;
  userAgentEntropy: number;
  networkPatternScore: number;
}

export interface TimeSeriesThreat {
  timestamp: number;
  threatLevel: number;
  features: ThreatFeatures;
}

/**
 * Advanced ML Models for Threat Detection
 * Implements ensemble learning with multiple algorithms
 */
export class AdvancedMLModels extends EventEmitter {
  private threatHistory: TimeSeriesThreat[] = [];
  private modelWeights: Record<string, number> = {
    'neural_network': 0.35,
    'random_forest': 0.25,
    'svm': 0.20,
    'gradient_boosting': 0.20
  };

  constructor() {
    super();
    this.initializeModels();
  }

  private initializeModels(): void {
    // Initialize pre-trained model parameters (simulated)
    console.log('🤖 Initializing Advanced ML Models for Threat Detection...');
    console.log('   ⚡ Neural Network Model (35% weight)');
    console.log('   🌳 Random Forest Model (25% weight)');
    console.log('   🎯 Support Vector Machine (20% weight)');
    console.log('   📈 Gradient Boosting Model (20% weight)');
  }

  /**
   * Neural Network Model Simulation
   * Implements multi-layer perceptron for pattern recognition
   */
  private neuralNetworkPredict(features: ThreatFeatures): MLModelPrediction {
    // Simulated neural network with weighted feature combinations
    const hiddenLayer1 = [
      0.3 * features.ipReputation + 0.2 * features.requestFrequency + 0.1 * features.timeOfDay,
      0.25 * features.payloadSize + 0.15 * features.sessionDuration + 0.2 * features.failedAttempts,
      0.1 * features.geographicRisk + 0.3 * features.protocolAnomaly + 0.2 * features.userAgentEntropy
    ];

    const hiddenLayer2 = [
      0.4 * Math.tanh(hiddenLayer1[0]) + 0.3 * Math.tanh(hiddenLayer1[1]),
      0.35 * Math.tanh(hiddenLayer1[1]) + 0.25 * Math.tanh(hiddenLayer1[2])
    ];

    const output = Math.sigmoid(0.6 * hiddenLayer2[0] + 0.4 * hiddenLayer2[1]);
    const confidence = 1 - Math.abs(0.5 - output) * 2; // Higher confidence near extremes

    return {
      prediction: output,
      confidence,
      modelUsed: 'neural_network',
      features,
      uncertainty: (1 - confidence) * 0.1
    };
  }

  /**
   * Random Forest Model Simulation
   * Implements ensemble of decision trees
   */
  private randomForestPredict(features: ThreatFeatures): MLModelPrediction {
    // Simulate multiple decision trees
    const trees = [];
    
    // Tree 1: IP and Geographic focus
    const tree1 = features.ipReputation > 0.6 && features.geographicRisk > 0.5 ? 0.8 : 0.2;
    
    // Tree 2: Behavioral patterns
    const tree2 = features.requestFrequency > 0.7 || features.failedAttempts > 0.6 ? 0.75 : 0.25;
    
    // Tree 3: Protocol and payload analysis
    const tree3 = features.payloadSize > 0.8 && features.protocolAnomaly > 0.4 ? 0.9 : 0.1;
    
    // Tree 4: Time-based patterns
    const tree4 = features.timeOfDay < 0.2 || features.timeOfDay > 0.9 ? 0.6 : 0.3;

    trees.push(tree1, tree2, tree3, tree4);
    
    const prediction = trees.reduce((sum, tree) => sum + tree, 0) / trees.length;
    const variance = trees.reduce((sum, tree) => sum + Math.pow(tree - prediction, 2), 0) / trees.length;
    const confidence = 1 - Math.sqrt(variance);

    return {
      prediction,
      confidence,
      modelUsed: 'random_forest',
      features,
      uncertainty: Math.sqrt(variance)
    };
  }

  /**
   * Support Vector Machine Model Simulation
   * Implements SVM with RBF kernel
   */
  private svmPredict(features: ThreatFeatures): MLModelPrediction {
    // Simulate SVM decision boundary with RBF kernel
    const supportVectors = [
      [0.8, 0.7, 0.6, 0.5, 0.9, 0.3, 0.8, 0.7, 0.6, 0.8], // Malicious
      [0.2, 0.1, 0.2, 0.3, 0.1, 0.8, 0.2, 0.1, 0.2, 0.1], // Benign
      [0.9, 0.8, 0.9, 0.7, 0.8, 0.2, 0.9, 0.8, 0.9, 0.9]  // Malicious
    ];

    const featureVector = Object.values(features);
    let kernelSum = 0;

    supportVectors.forEach((sv, index) => {
      const distance = Math.sqrt(
        sv.reduce((sum, val, i) => sum + Math.pow(val - featureVector[i], 2), 0)
      );
      const kernel = Math.exp(-0.5 * distance * distance); // RBF kernel
      kernelSum += kernel * (index === 1 ? -1 : 1); // Middle vector is negative
    });

    const prediction = Math.sigmoid(kernelSum);
    const confidence = Math.abs(kernelSum) / supportVectors.length;

    return {
      prediction,
      confidence: Math.min(confidence, 1),
      modelUsed: 'svm',
      features,
      uncertainty: 1 - Math.min(confidence, 1)
    };
  }

  /**
   * Gradient Boosting Model Simulation
   * Implements sequential weak learners
   */
  private gradientBoostingPredict(features: ThreatFeatures): MLModelPrediction {
    // Simulate gradient boosting with multiple weak learners
    let prediction = 0.5; // Initial prediction
    const learningRate = 0.1;
    
    // Weak learner 1: IP reputation focus
    const residual1 = features.ipReputation - prediction;
    prediction += learningRate * residual1;
    
    // Weak learner 2: Request frequency focus
    const residual2 = features.requestFrequency - prediction;
    prediction += learningRate * residual2;
    
    // Weak learner 3: Failed attempts focus
    const residual3 = features.failedAttempts - prediction;
    prediction += learningRate * residual3;
    
    // Weak learner 4: Combined feature focus
    const combinedFeature = (features.payloadSize + features.protocolAnomaly) / 2;
    const residual4 = combinedFeature - prediction;
    prediction += learningRate * residual4;

    prediction = Math.max(0, Math.min(1, prediction)); // Clip to [0,1]
    const confidence = 1 - Math.abs(0.5 - prediction); // Higher confidence at extremes

    return {
      prediction,
      confidence,
      modelUsed: 'gradient_boosting',
      features,
      uncertainty: Math.abs(0.5 - prediction) * 0.2
    };
  }

  /**
   * Ensemble Prediction using all models
   */
  public ensemblePredict(features: ThreatFeatures): EnsembleResult {
    const predictions = [
      this.neuralNetworkPredict(features),
      this.randomForestPredict(features),
      this.svmPredict(features),
      this.gradientBoostingPredict(features)
    ];

    // Weighted ensemble prediction
    const finalPrediction = predictions.reduce((sum, pred, index) => {
      const modelName = pred.modelUsed;
      return sum + pred.prediction * this.modelWeights[modelName];
    }, 0);

    // Calculate confidence interval
    const weightedUncertainty = predictions.reduce((sum, pred) => {
      return sum + pred.uncertainty * this.modelWeights[pred.modelUsed];
    }, 0);

    const confidenceInterval: [number, number] = [
      Math.max(0, finalPrediction - weightedUncertainty),
      Math.min(1, finalPrediction + weightedUncertainty)
    ];

    return {
      finalPrediction,
      modelWeights: this.modelWeights,
      individualPredictions: predictions,
      confidenceInterval
    };
  }

  /**
   * Time Series Analysis for Threat Trends
   */
  public analyzeTimeSeries(threats: TimeSeriesThreat[]): {
    trend: 'increasing' | 'decreasing' | 'stable';
    volatility: number;
    forecast: { timestamp: number; predictedThreat: number; confidence: number }[];
  } {
    if (threats.length < 3) {
      return {
        trend: 'stable',
        volatility: 0,
        forecast: []
      };
    }

    // Calculate trend using linear regression
    const n = threats.length;
    const sumX = threats.reduce((sum, _, i) => sum + i, 0);
    const sumY = threats.reduce((sum, threat) => sum + threat.threatLevel, 0);
    const sumXY = threats.reduce((sum, threat, i) => sum + i * threat.threatLevel, 0);
    const sumXX = threats.reduce((sum, _, i) => sum + i * i, 0);

    const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
    const trend = slope > 0.01 ? 'increasing' : slope < -0.01 ? 'decreasing' : 'stable';

    // Calculate volatility (standard deviation)
    const mean = sumY / n;
    const volatility = Math.sqrt(
      threats.reduce((sum, threat) => sum + Math.pow(threat.threatLevel - mean, 2), 0) / n
    );

    // Generate forecast for next 5 time points
    const forecast = [];
    for (let i = 1; i <= 5; i++) {
      const predictedThreat = Math.max(0, Math.min(1, mean + slope * (n + i)));
      const confidence = Math.max(0.5, 1 - volatility - (i * 0.1));
      
      forecast.push({
        timestamp: Date.now() + i * 300000, // 5 minutes intervals
        predictedThreat,
        confidence
      });
    }

    return { trend, volatility, forecast };
  }

  /**
   * Update model weights based on performance
   */
  public updateModelWeights(performanceMetrics: Record<string, number>): void {
    const totalPerformance = Object.values(performanceMetrics).reduce((sum, perf) => sum + perf, 0);
    
    if (totalPerformance > 0) {
      Object.keys(this.modelWeights).forEach(model => {
        this.modelWeights[model] = performanceMetrics[model] / totalPerformance;
      });
      
      console.log('🔄 Updated ML model weights:', this.modelWeights);
    }
  }

  /**
   * Feature extraction from raw threat data
   */
  public extractFeatures(rawData: any): ThreatFeatures {
    return {
      ipReputation: this.normalizeIPReputation(rawData.sourceIP || ''),
      requestFrequency: Math.min(rawData.requestFrequency || 0, 100) / 100,
      payloadSize: Math.min(rawData.payloadSize || 0, 100000) / 100000,
      sessionDuration: Math.min(rawData.sessionDuration || 0, 7200) / 7200,
      failedAttempts: Math.min(rawData.failedAttempts || 0, 20) / 20,
      timeOfDay: (new Date().getHours()) / 24,
      geographicRisk: this.calculateGeographicRisk(rawData.geolocation || ''),
      protocolAnomaly: this.detectProtocolAnomaly(rawData.protocol || ''),
      userAgentEntropy: this.calculateUserAgentEntropy(rawData.userAgent || ''),
      networkPatternScore: this.calculateNetworkPatternScore(rawData)
    };
  }

  private normalizeIPReputation(ip: string): number {
    // Simulate IP reputation lookup
    const knownBadIPs = ['192.168.1.100', '10.0.0.50', '172.16.1.200'];
    return knownBadIPs.includes(ip) ? 0.9 : Math.random() * 0.3;
  }

  private calculateGeographicRisk(location: string): number {
    const highRiskCountries = ['RU', 'CN', 'KP', 'IR'];
    return highRiskCountries.includes(location) ? 0.8 : 0.2;
  }

  private detectProtocolAnomaly(protocol: string): number {
    const normalProtocols = ['HTTP', 'HTTPS', 'TCP', 'UDP'];
    return normalProtocols.includes(protocol.toUpperCase()) ? 0.1 : 0.8;
  }

  private calculateUserAgentEntropy(userAgent: string): number {
    if (!userAgent) return 0.5;
    
    const charCounts = {};
    for (const char of userAgent) {
      charCounts[char] = (charCounts[char] || 0) + 1;
    }
    
    const entropy = Object.values(charCounts).reduce((sum: number, count: number) => {
      const p = count / userAgent.length;
      return sum - p * Math.log2(p);
    }, 0);
    
    return Math.min(entropy / 6, 1); // Normalize to [0,1]
  }

  private calculateNetworkPatternScore(rawData: any): number {
    // Combine multiple network indicators
    const indicators = [
      rawData.port < 1024 ? 0.6 : 0.2, // Privileged ports
      rawData.payload?.length > 10000 ? 0.7 : 0.1, // Large payloads
      rawData.requestFrequency > 10 ? 0.8 : 0.2 // High frequency
    ];
    
    return indicators.reduce((sum, indicator) => sum + indicator, 0) / indicators.length;
  }
}

// Extend Math object for sigmoid function
declare global {
  interface Math {
    sigmoid(x: number): number;
  }
}

Math.sigmoid = function(x: number): number {
  return 1 / (1 + Math.exp(-x));
};