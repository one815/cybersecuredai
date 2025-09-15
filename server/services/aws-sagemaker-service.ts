/**
 * AWS SageMaker ML Service Integration
 * Provides AI-powered threat detection and behavioral analysis
 */

// Dynamic import for AWS SDK to reduce initial bundle size
let AWS: any = null;
let awsLoading = false;
let awsPromise: Promise<any> | null = null;

const loadAWS = async () => {
  if (AWS) return AWS;
  if (awsPromise) return awsPromise;
  
  awsLoading = true;
  awsPromise = import('aws-sdk').then(module => {
    AWS = module.default;
    awsLoading = false;
    return AWS;
  }).catch(error => {
    console.error('Failed to load AWS SDK:', error);
    awsLoading = false;
    throw error;
  });
  
  return awsPromise;
};

interface SageMakerConfig {
  region: string;
  accessKeyId: string;
  secretAccessKey: string;
  threatDetectionEndpoint: string;
  behavioralAnalysisEndpoint: string;
  documentClassifierEndpoint: string;
  anomalyDetectionEndpoint: string;
}

interface ThreatDetectionRequest {
  network_traffic: {
    source_ip: string;
    destination_ip: string;
    port: number;
    protocol: string;
    packet_size: number;
    connection_duration: number;
    data_volume: number;
  };
  features: number[];
  metadata: {
    timestamp: string;
    source: string;
  };
}

interface ThreatDetectionResponse {
  prediction: string;
  confidence: number;
  threat_type: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  recommendations: string[];
  model_version: string;
  inference_time_ms: number;
}

interface BehavioralAnalysisRequest {
  user_behavior: {
    user_id: string;
    login_time: string;
    login_location: string;
    device_fingerprint: string;
    access_patterns: Array<{
      resource: string;
      frequency: number;
    }>;
    session_duration: number;
  };
  historical_baseline: {
    avg_session_duration: number;
    typical_locations: string[];
    usual_access_times: string[];
  };
}

interface BehavioralAnalysisResponse {
  anomaly_score: number;
  risk_level: 'low' | 'medium' | 'high';
  behavioral_flags: string[];
  user_classification: string;
  recommendations: string[];
  baseline_deviation: number;
}

interface DocumentClassificationRequest {
  document: {
    content: string; // Base64 encoded
    file_type: string;
    file_size: number;
    file_name: string;
  };
  classification_context: {
    organization_type: string;
    compliance_frameworks: string[];
  };
}

interface DocumentClassificationResponse {
  classification: string;
  confidence: number;
  sensitivity_level: string;
  compliance_tags: string[];
  content_categories: string[];
  retention_period: string;
}

interface AnomalyDetectionRequest {
  system_metrics: {
    cpu_usage: number;
    memory_usage: number;
    network_io: number;
    disk_io: number;
    active_connections: number;
    failed_logins: number;
    error_rate: number;
  };
  time_window: string;
  baseline_period: string;
}

interface AnomalyDetectionResponse {
  anomaly_detected: boolean;
  anomaly_score: number;
  anomaly_type: string;
  affected_metrics: string[];
  severity: 'low' | 'medium' | 'high';
  recommendations: string[];
}

class AWSMachineLearningService {
  private sagemakerRuntime!: AWS.SageMakerRuntime;
  private config: SageMakerConfig;
  private isConfigured: boolean = false;

  constructor() {
    this.config = {
      region: process.env.AWS_REGION || 'us-east-1',
      accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
      threatDetectionEndpoint: process.env.SAGEMAKER_THREAT_DETECTION_ENDPOINT || 'cybersecured-threat-detection-prod',
      behavioralAnalysisEndpoint: process.env.SAGEMAKER_BEHAVIORAL_ANALYSIS_ENDPOINT || 'cybersecured-behavioral-analysis-v1',
      documentClassifierEndpoint: process.env.SAGEMAKER_DOCUMENT_CLASSIFIER_ENDPOINT || 'cybersecured-document-classifier-v1',
      anomalyDetectionEndpoint: process.env.SAGEMAKER_ANOMALY_DETECTION_ENDPOINT || 'cybersecured-anomaly-detection-v1'
    };

    if (this.config.accessKeyId && this.config.secretAccessKey) {
      // Initialize asynchronously to avoid blocking constructor
      this.initializeSageMaker().catch(error => {
        console.error('❌ Failed to initialize AWS SageMaker in constructor:', error);
      });
    } else {
      console.log('🔧 AWS SageMaker credentials not configured - using fallback ML models');
    }
  }

  private async initializeSageMaker(): Promise<void> {
    try {
      const AWSClass = await loadAWS();
      
      AWSClass.config.update({
        accessKeyId: this.config.accessKeyId,
        secretAccessKey: this.config.secretAccessKey,
        region: this.config.region
      });

      this.sagemakerRuntime = new AWSClass.SageMakerRuntime({
        apiVersion: '2017-05-13'
      });

      this.isConfigured = true;
      console.log('✅ AWS SageMaker service initialized successfully');
    } catch (error) {
      console.error('❌ Failed to initialize AWS SageMaker:', error);
      this.isConfigured = false;
    }
  }

  async invokeThreatDetection(data: ThreatDetectionRequest): Promise<ThreatDetectionResponse> {
    if (!this.isConfigured) {
      return this.getFallbackThreatDetection(data);
    }

    try {
      const params = {
        EndpointName: this.config.threatDetectionEndpoint,
        ContentType: 'application/json',
        Body: JSON.stringify({
          instances: [data]
        })
      };

      const startTime = Date.now();
      const result = await this.sagemakerRuntime.invokeEndpoint(params).promise();
      const inferenceTime = Date.now() - startTime;

      const response = JSON.parse(result.Body?.toString() || '{}');
      
      return {
        prediction: response.predictions?.[0]?.prediction || 'benign',
        confidence: response.predictions?.[0]?.confidence || 0.5,
        threat_type: response.predictions?.[0]?.threat_type || 'unknown',
        severity: response.predictions?.[0]?.severity || 'low',
        recommendations: response.predictions?.[0]?.recommendations || [],
        model_version: response.model_version || 'v1.0.0',
        inference_time_ms: inferenceTime
      };
    } catch (error) {
      console.error('❌ SageMaker threat detection error:', error);
      return this.getFallbackThreatDetection(data);
    }
  }

  async invokeBehavioralAnalysis(data: BehavioralAnalysisRequest): Promise<BehavioralAnalysisResponse> {
    if (!this.isConfigured) {
      return this.getFallbackBehavioralAnalysis(data);
    }

    try {
      const params = {
        EndpointName: this.config.behavioralAnalysisEndpoint,
        ContentType: 'application/json',
        Body: JSON.stringify({
          instances: [data]
        })
      };

      const result = await this.sagemakerRuntime.invokeEndpoint(params).promise();
      const response = JSON.parse(result.Body?.toString() || '{}');
      
      return {
        anomaly_score: response.predictions?.[0]?.anomaly_score || 0.1,
        risk_level: response.predictions?.[0]?.risk_level || 'low',
        behavioral_flags: response.predictions?.[0]?.behavioral_flags || [],
        user_classification: response.predictions?.[0]?.user_classification || 'normal_pattern',
        recommendations: response.predictions?.[0]?.recommendations || ['continue_monitoring'],
        baseline_deviation: response.predictions?.[0]?.baseline_deviation || 0.05
      };
    } catch (error) {
      console.error('❌ SageMaker behavioral analysis error:', error);
      return this.getFallbackBehavioralAnalysis(data);
    }
  }

  async invokeDocumentClassification(data: DocumentClassificationRequest): Promise<DocumentClassificationResponse> {
    if (!this.isConfigured) {
      return this.getFallbackDocumentClassification(data);
    }

    try {
      const params = {
        EndpointName: this.config.documentClassifierEndpoint,
        ContentType: 'application/json',
        Body: JSON.stringify({
          instances: [data]
        })
      };

      const result = await this.sagemakerRuntime.invokeEndpoint(params).promise();
      const response = JSON.parse(result.Body?.toString() || '{}');
      
      return {
        classification: response.predictions?.[0]?.classification || 'general_document',
        confidence: response.predictions?.[0]?.confidence || 0.7,
        sensitivity_level: response.predictions?.[0]?.sensitivity_level || 'public',
        compliance_tags: response.predictions?.[0]?.compliance_tags || [],
        content_categories: response.predictions?.[0]?.content_categories || ['general'],
        retention_period: response.predictions?.[0]?.retention_period || '1_year'
      };
    } catch (error) {
      console.error('❌ SageMaker document classification error:', error);
      return this.getFallbackDocumentClassification(data);
    }
  }

  async invokeAnomalyDetection(data: AnomalyDetectionRequest): Promise<AnomalyDetectionResponse> {
    if (!this.isConfigured) {
      return this.getFallbackAnomalyDetection(data);
    }

    try {
      const params = {
        EndpointName: this.config.anomalyDetectionEndpoint,
        ContentType: 'application/json',
        Body: JSON.stringify({
          instances: [data]
        })
      };

      const result = await this.sagemakerRuntime.invokeEndpoint(params).promise();
      const response = JSON.parse(result.Body?.toString() || '{}');
      
      return {
        anomaly_detected: response.predictions?.[0]?.anomaly_detected || false,
        anomaly_score: response.predictions?.[0]?.anomaly_score || 0.1,
        anomaly_type: response.predictions?.[0]?.anomaly_type || 'none',
        affected_metrics: response.predictions?.[0]?.affected_metrics || [],
        severity: response.predictions?.[0]?.severity || 'low',
        recommendations: response.predictions?.[0]?.recommendations || ['continue_monitoring']
      };
    } catch (error) {
      console.error('❌ SageMaker anomaly detection error:', error);
      return this.getFallbackAnomalyDetection(data);
    }
  }

  async getModelStatus(): Promise<any> {
    if (!this.isConfigured) {
      return {
        models: [
          {
            endpoint_name: 'local-ml-models',
            status: 'Simulated',
            message: 'AWS SageMaker not configured - using local models'
          }
        ]
      };
    }

    try {
      const AWSClass = await loadAWS();
      const sagemaker = new AWSClass.SageMaker({
        region: this.config.region,
        accessKeyId: this.config.accessKeyId,
        secretAccessKey: this.config.secretAccessKey
      });

      const endpoints = [
        this.config.threatDetectionEndpoint,
        this.config.behavioralAnalysisEndpoint,
        this.config.documentClassifierEndpoint,
        this.config.anomalyDetectionEndpoint
      ];

      const statusPromises = endpoints.map(async (endpoint) => {
        try {
          const result = await sagemaker.describeEndpoint({ EndpointName: endpoint }).promise();
          return {
            endpoint_name: endpoint,
            status: result.EndpointStatus,
            instance_type: result.ProductionVariants?.[0]?.InstanceType || 'unknown',
            instance_count: result.ProductionVariants?.[0]?.CurrentWeight || 0,
            last_updated: result.LastModifiedTime
          };
        } catch (error) {
          return {
            endpoint_name: endpoint,
            status: 'NotFound',
            error: error instanceof Error ? error.message : 'Unknown error'
          };
        }
      });

      const models = await Promise.all(statusPromises);
      return { models };
    } catch (error) {
      console.error('❌ Error getting model status:', error);
      return {
        models: [],
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  // Fallback methods for when SageMaker is not configured
  private getFallbackThreatDetection(data: ThreatDetectionRequest): ThreatDetectionResponse {
    const isHighRisk = data.network_traffic.port === 22 || 
                      data.network_traffic.port === 3389 || 
                      data.features.some(f => f > 0.8);

    return {
      prediction: isHighRisk ? 'suspicious' : 'benign',
      confidence: 0.75,
      threat_type: isHighRisk ? 'potential_intrusion' : 'normal_traffic',
      severity: isHighRisk ? 'medium' : 'low',
      recommendations: isHighRisk ? ['monitor_closely', 'verify_user'] : ['continue_monitoring'],
      model_version: 'local-v1.0.0',
      inference_time_ms: 15
    };
  }

  private getFallbackBehavioralAnalysis(data: BehavioralAnalysisRequest): BehavioralAnalysisResponse {
    const sessionDeviation = Math.abs(data.user_behavior.session_duration - data.historical_baseline.avg_session_duration) / data.historical_baseline.avg_session_duration;
    
    return {
      anomaly_score: Math.min(sessionDeviation, 1.0),
      risk_level: sessionDeviation > 0.5 ? 'medium' : 'low',
      behavioral_flags: sessionDeviation > 0.5 ? ['unusual_session_length'] : [],
      user_classification: 'normal_pattern',
      recommendations: ['continue_monitoring'],
      baseline_deviation: sessionDeviation
    };
  }

  private getFallbackDocumentClassification(data: DocumentClassificationRequest): DocumentClassificationResponse {
    const fileType = data.document.file_type.toLowerCase();
    let classification = 'general_document';
    
    if (fileType.includes('pdf') && data.document.file_name.toLowerCase().includes('policy')) {
      classification = 'security_policy';
    } else if (fileType.includes('doc') && data.document.file_name.toLowerCase().includes('report')) {
      classification = 'compliance_report';
    }

    return {
      classification,
      confidence: 0.65,
      sensitivity_level: classification === 'security_policy' ? 'confidential' : 'internal',
      compliance_tags: data.classification_context.compliance_frameworks,
      content_categories: ['cybersecurity'],
      retention_period: '3_years'
    };
  }

  private getFallbackAnomalyDetection(data: AnomalyDetectionRequest): AnomalyDetectionResponse {
    const cpuAnomaly = data.system_metrics.cpu_usage > 90;
    const memoryAnomaly = data.system_metrics.memory_usage > 85;
    const failedLoginAnomaly = data.system_metrics.failed_logins > 10;

    const anomalies = [];
    if (cpuAnomaly) anomalies.push('cpu_usage');
    if (memoryAnomaly) anomalies.push('memory_usage');
    if (failedLoginAnomaly) anomalies.push('failed_logins');

    return {
      anomaly_detected: anomalies.length > 0,
      anomaly_score: Math.min((anomalies.length / 3), 1.0),
      anomaly_type: anomalies.length > 1 ? 'system_stress' : (anomalies[0] || 'none'),
      affected_metrics: anomalies,
      severity: anomalies.length > 1 ? 'high' : (anomalies.length === 1 ? 'medium' : 'low'),
      recommendations: anomalies.length > 0 ? ['investigate_system_load', 'check_security_logs'] : ['continue_monitoring']
    };
  }

  isServiceConfigured(): boolean {
    return this.isConfigured;
  }

  getServiceStatus(): any {
    return {
      service: 'AWS SageMaker ML Service',
      configured: this.isConfigured,
      region: this.config.region,
      endpoints: {
        threat_detection: this.config.threatDetectionEndpoint,
        behavioral_analysis: this.config.behavioralAnalysisEndpoint,
        document_classifier: this.config.documentClassifierEndpoint,
        anomaly_detection: this.config.anomalyDetectionEndpoint
      },
      fallback_mode: !this.isConfigured
    };
  }
}

export const awsMachineLearningService = new AWSMachineLearningService();
export type {
  ThreatDetectionRequest,
  ThreatDetectionResponse,
  BehavioralAnalysisRequest,
  BehavioralAnalysisResponse,
  DocumentClassificationRequest,
  DocumentClassificationResponse,
  AnomalyDetectionRequest,
  AnomalyDetectionResponse
};