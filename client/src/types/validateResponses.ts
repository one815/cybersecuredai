// Lightweight compile-time validation harness for API response shapes.
// Import the centralized interfaces and create sample example objects typed to them.

import type { MLPrediction, ModelStatus, MLServiceStatus, TaxiiServer, CisaComplianceStats } from './api';

// Example ML prediction (happy-path)
export const sampleMLPrediction: MLPrediction = {
  prediction: 'malicious',
  confidence: 0.92,
  threat_type: 'trojan',
  severity: 'high',
  recommendations: ['isolate host', 'notify SOC'],
  model_version: 'v1.3.0',
  inference_time_ms: 120,
};

export const sampleModelStatus: ModelStatus = {
  endpoint_name: 'sagemaker-endpoint-1',
  status: 'InService',
  instance_type: 'ml.m5.large',
  instance_count: 2,
  model_version: 'v1.3.0',
  last_updated: new Date().toISOString(),
};

export const sampleServiceStatus: MLServiceStatus = {
  service: 'AWS SageMaker ML Service',
  status: 'running',
  region: 'us-east-1',
  endpoint_count: 3,
  last_checked: new Date().toISOString(),
  message: 'All endpoints healthy',
};

// TAXII example
export const sampleTaxiiServer: TaxiiServer = {
  id: 'server-1',
  name: 'CISA TAXII',
  url: 'https://taxii.example.com',
  status: 'active',
  cisaCompliant: true,
  collections: [
    {
      id: 'col-1',
      title: 'Observed Data',
      can_read: true,
      can_write: false,
      media_types: ['application/stix+json']
    }
  ],
};

export const sampleCisaStats: CisaComplianceStats = {
  totalServers: 5,
  activeServers: 4,
  cisaCompliantServers: 3,
  totalCollections: 12,
  lastSyncTime: new Date().toISOString(),
  stixObjectTypes: { 'indicator': 120, 'malware': 5 }
};

// Intentionally export a function that consumers (tests) can import to assert type inference.
export function validateSamples() {
  return {
    sampleMLPrediction,
    sampleModelStatus,
    sampleServiceStatus,
    sampleTaxiiServer,
    sampleCisaStats,
  };
}
