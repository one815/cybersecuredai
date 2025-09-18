// Centralized API types used across the client

export interface MLPrediction {
  prediction: string;
  confidence: number;
  threat_type?: string;
  severity?: string;
  recommendations?: string[];
  model_version: string;
  inference_time_ms: number;
}

// More specific ML model outputs
export interface ThreatDetectionPrediction {
  prediction: 'malicious' | 'benign' | string;
  confidence: number; // 0..1
  threat_type?: string;
  severity?: 'low' | 'medium' | 'high' | 'critical' | string;
  recommendations?: string[];
  model_version: string;
  inference_time_ms: number;
  indicators?: Array<{ type: string; value: string }>;
}

export interface BehavioralAnalysisPrediction {
  prediction: string; // e.g., 'anomalous' | 'normal'
  confidence: number;
  risk_level?: string | number;
  anomaly_score?: number; // 0..1
  model_version: string;
  inference_time_ms: number;
  user_id?: string;
}

export interface DocumentClassificationPrediction {
  prediction: string; // classification label
  classification?: string;
  confidence: number;
  model_version: string;
  inference_time_ms: number;
  categories?: string[];
}

export interface AnomalyDetectionPrediction {
  prediction: 'anomaly' | 'normal' | string;
  confidence: number;
  anomaly_detected?: boolean;
  anomaly_score?: number; // 0..1
  model_version: string;
  inference_time_ms: number;
  signals?: Array<{ name: string; value: number }>;
}

export type MLModelPrediction = ThreatDetectionPrediction | BehavioralAnalysisPrediction | DocumentClassificationPrediction | AnomalyDetectionPrediction;

export interface ModelStatus {
  endpoint_name: string;
  status: string;
  instance_type: string;
  instance_count: number;
  model_version: string;
  last_updated: string;
}

export interface MLServiceStatus {
  service?: string;
  status?: 'starting' | 'running' | 'stopped' | 'error' | 'unknown';
  region?: string;
  endpoint_count?: number;
  last_checked?: string;
  message?: string;
}

export interface XForceReport {
  ip?: string;
  url?: string;
  domain?: string;
  country?: string;
  geo?: {
    country: string;
    countrycode: string;
  };
  malware?: {
    risk: number;
    family?: string[];
  };
  reputation?: {
    score: number;
    cats: { [key: string]: number };
  };
  result?: {
    score: number;
    cats: { [key: string]: number };
    categoryDescriptions: { [key: string]: string };
  };
}

export interface VulnerabilityReport {
  xfdbid: string;
  title: string;
  description: string;
  risk_level: number;
  cvss?: {
    version: string;
    base_score: number;
    temporal_score: number;
    environmental_score: number;
  };
  stdcode?: string[];
  exploit_availability?: boolean;
  references?: Array<{
    link_target: string;
    link_name: string;
  }>;
}

export interface XForceServiceStatus {
  status?: 'configured' | 'degraded' | 'offline' | 'unknown';
  service?: string;
  last_checked?: string;
  region?: string;
  details?: string;
  features?: string[];
}

export interface TheHiveStatus {
  initialized?: boolean;
  version?: string;
  host?: string;
  uptime?: string;
  message?: string;
}

export interface SystemStatus {
  threatLevel?: 'LOW' | 'MEDIUM' | 'HIGH' | string;
  activeAlerts?: number;
  systemHealth?: string;
  uptime?: string;
  [key: string]: any;
}

export interface AIAnalytics {
  threatLevel?: string;
  systemMetrics?: {
    averageResponseTime?: string;
    [k: string]: any;
  };
  threatDetection?: {
    activeSources?: number;
    totalThreats?: number;
    blockedThreats?: number;
    [k: string]: any;
  };
  [k: string]: any;
}

export interface TaxiiCollection {
  id: string;
  title: string;
  description?: string;
  can_read: boolean;
  can_write: boolean;
  media_types: string[];
}

export interface TaxiiServer {
  id: string;
  name: string;
  url: string;
  username?: string;
  password?: string;
  status: 'active' | 'inactive' | 'error';
  lastSync?: Date;
  collections?: TaxiiCollection[];
  cisaCompliant: boolean;
}

export interface StixObject {
  type: string;
  spec_version: '2.1';
  id: string;
  created: string;
  modified: string;
  labels?: string[];
  [key: string]: any;
}

export interface CisaComplianceStats {
  totalServers: number;
  activeServers: number;
  cisaCompliantServers: number;
  totalCollections: number;
  lastSyncTime?: Date | string;
  stixObjectTypes: { [type: string]: number };
}
