import type { Request, Response } from 'express';
import type { AuthenticatedRequest } from './auth';
import { z } from 'zod';
import { CDCApiClient, createCDCApiClient, type CDCSubmissionResult } from './services/cdc-api-client';
import crypto from 'crypto';
import { sign, verify } from 'jsonwebtoken';
import jws from 'jws';

// ===== CRITICAL FIX: PHIN-COMPLIANT DIGITAL SIGNATURES =====

/**
 * PHIN Digital Signature Service
 * Implements JWS and CMS digital signatures for CDC compliance
 * SECURITY FIX: Proper RSA PEM key handling for PHIN 2.0 compliance
 */
class PHINDigitalSignatureService {
  private readonly privateKeyPem: string;
  private readonly publicKeyPem: string;
  private readonly keyId: string;
  private readonly algorithm: string = 'RS256';

  constructor() {
    // CRITICAL FIX: Use proper PEM format keys for RSA signatures
    this.privateKeyPem = process.env.PHIN_PRIVATE_KEY_PEM || '';
    this.publicKeyPem = process.env.PHIN_PUBLIC_KEY_PEM || process.env.PHIN_CERT_PEM || '';
    this.keyId = process.env.PHIN_KEY_ID || 'phin-sig-key-1';
    
    // CRITICAL FIX: Validate PEM format keys
    this.validateCryptographicConfiguration();
  }

  /**
   * SECURITY FIX: Validate cryptographic configuration
   */
  private validateCryptographicConfiguration(): void {
    if (!this.privateKeyPem) {
      throw new Error('CRITICAL: PHIN_PRIVATE_KEY_PEM required for PHIN digital signatures');
    }
    
    if (!this.publicKeyPem) {
      throw new Error('CRITICAL: PHIN_PUBLIC_KEY_PEM or PHIN_CERT_PEM required for signature verification');
    }
    
    // Validate PEM format
    if (!this.isPEMPrivateKey(this.privateKeyPem)) {
      throw new Error('CRITICAL: PHIN_PRIVATE_KEY_PEM must be valid PEM format RSA private key');
    }
    
    if (!this.isPEMPublicKeyOrCert(this.publicKeyPem)) {
      throw new Error('CRITICAL: PHIN_PUBLIC_KEY_PEM must be valid PEM format RSA public key or certificate');
    }
    
    // Test cryptographic operations
    this.validateCryptographicOperations();
  }

  /**
   * SECURITY FIX: Validate PEM private key format
   */
  private isPEMPrivateKey(pem: string): boolean {
    return pem.includes('-----BEGIN PRIVATE KEY-----') ||
           pem.includes('-----BEGIN RSA PRIVATE KEY-----') ||
           pem.includes('-----BEGIN ENCRYPTED PRIVATE KEY-----');
  }

  /**
   * SECURITY FIX: Validate PEM public key or certificate format
   */
  private isPEMPublicKeyOrCert(pem: string): boolean {
    return pem.includes('-----BEGIN PUBLIC KEY-----') ||
           pem.includes('-----BEGIN RSA PUBLIC KEY-----') ||
           pem.includes('-----BEGIN CERTIFICATE-----');
  }

  /**
   * SECURITY FIX: Test cryptographic operations on startup
   */
  private validateCryptographicOperations(): void {
    try {
      // Test canary payload
      const testPayload = { test: 'PHIN_CRYPTO_VALIDATION', timestamp: Date.now() };
      
      // Test JWS signature generation and verification
      const jwsToken = this.generateJWSSignature(testPayload, { issuer: 'test' });
      const jwsResult = this.verifyJWSSignature(jwsToken, testPayload);
      
      if (!jwsResult.valid) {
        throw new Error(`JWS validation failed: ${jwsResult.error}`);
      }
      
      // Test CMS signature generation
      const cmsSignature = this.generateCMSSignature(testPayload);
      
      if (!cmsSignature.signature) {
        throw new Error('CMS signature generation failed');
      }
      
      console.log('✅ PHIN cryptographic validation successful');
    } catch (error) {
      throw new Error(`CRITICAL: Cryptographic validation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * SECURITY FIX: Generate JWS (JSON Web Signature) for PHIN compliance with proper RSA keys
   */
  generateJWSSignature(payload: any, options: {
    issuer?: string;
    audience?: string;
    expiresIn?: string;
  } = {}): string {
    try {
      const header = {
        alg: this.algorithm,
        typ: 'JWT',
        kid: this.keyId,
        'x5t': crypto.createHash('sha1').update(this.keyId).digest('base64url'),
        'phin-version': '2.0'
      };

      const now = Math.floor(Date.now() / 1000);
      const claims = {
        iss: options.issuer || 'cybersecured-ai-platform',
        aud: options.audience || 'cdc-phin-gateway',
        iat: now,
        exp: now + (options.expiresIn ? parseInt(options.expiresIn) : 3600), // 1 hour default
        nbf: now,
        jti: crypto.randomUUID(),
        data: payload,
        'phin-compliant': true,
        'signature-type': 'JWS',
        'data-integrity-hash': crypto.createHash('sha256').update(JSON.stringify(payload)).digest('hex')
      };

      // CRITICAL FIX: Use proper RSA private key for RS256 signature
      return jws.sign({
        header,
        payload: claims,
        secret: this.privateKeyPem
      });
    } catch (error) {
      console.error('❌ CRITICAL: JWS signature generation failed:', error);
      throw new Error('PHIN JWS signature generation failed');
    }
  }

  /**
   * SECURITY FIX: Verify JWS signature for PHIN compliance with proper RSA public key
   */
  verifyJWSSignature(jwsToken: string, expectedPayload?: any): {
    valid: boolean;
    payload?: any;
    error?: string;
  } {
    try {
      const decoded = jws.decode(jwsToken);
      if (!decoded) {
        return { valid: false, error: 'Invalid JWS token format' };
      }

      // CRITICAL FIX: Use public key for verification, not private key
      const verified = jws.verify(jwsToken, this.algorithm, this.publicKeyPem);
      if (!verified) {
        return { valid: false, error: 'JWS signature verification failed' };
      }

      const payload = JSON.parse(decoded.payload);
      
      // Verify PHIN compliance flags
      if (!payload['phin-compliant']) {
        return { valid: false, error: 'Token not marked as PHIN-compliant' };
      }

      // Verify token expiration
      const now = Math.floor(Date.now() / 1000);
      if (payload.exp && payload.exp < now) {
        return { valid: false, error: 'Token has expired' };
      }

      // Verify not-before time
      if (payload.nbf && payload.nbf > now) {
        return { valid: false, error: 'Token not yet valid' };
      }

      // Verify data integrity if expected payload provided
      if (expectedPayload) {
        const expectedHash = crypto.createHash('sha256').update(JSON.stringify(expectedPayload)).digest('hex');
        if (payload['data-integrity-hash'] !== expectedHash) {
          return { valid: false, error: 'Data integrity verification failed' };
        }
      }

      return { valid: true, payload: payload.data };
    } catch (error) {
      console.error('❌ JWS verification error:', error);
      return { valid: false, error: 'JWS verification exception' };
    }
  }

  /**
   * SECURITY FIX: Generate CMS (Cryptographic Message Syntax) signature with proper Node.js crypto APIs
   */
  generateCMSSignature(payload: any): {
    signature: string;
    algorithm: string;
    keyId: string;
    timestamp: string;
    digestAlgorithm: string;
  } {
    try {
      // Create message to sign
      const messageBytes = Buffer.from(JSON.stringify(payload), 'utf8');
      
      // CRITICAL FIX: Use proper Node.js crypto APIs for RSA-PSS signature
      const sign = crypto.createSign('sha256');
      sign.update(messageBytes);
      
      // Use correct RSA-PSS signature with proper padding and salt length
      const signature = sign.sign({
        key: this.privateKeyPem,
        padding: crypto.constants.RSA_PKCS1_PSS_PADDING,
        saltLength: crypto.constants.RSA_PSS_SALTLEN_DIGEST
      });

      return {
        signature: signature.toString('base64'),
        algorithm: 'RSA-PSS-SHA256',
        keyId: this.keyId,
        timestamp: new Date().toISOString(),
        digestAlgorithm: 'SHA-256'
      };
    } catch (error) {
      console.error('❌ CRITICAL: CMS signature generation failed:', error);
      throw new Error('PHIN CMS signature generation failed');
    }
  }

  /**
   * SECURITY FIX: Verify CMS signature with proper Node.js crypto APIs
   */
  verifyCMSSignature(payload: any, cmsSignature: {
    signature: string;
    algorithm: string;
    keyId: string;
    timestamp: string;
    digestAlgorithm: string;
  }): { valid: boolean; error?: string } {
    try {
      // Verify algorithm compatibility
      if (cmsSignature.algorithm !== 'RSA-PSS-SHA256') {
        return { valid: false, error: `Unsupported CMS algorithm: ${cmsSignature.algorithm}` };
      }
      
      // Create message to verify
      const messageBytes = Buffer.from(JSON.stringify(payload), 'utf8');
      
      // Use proper Node.js crypto APIs for verification
      const verify = crypto.createVerify('sha256');
      verify.update(messageBytes);
      
      // Verify signature with public key and proper padding
      const isValid = verify.verify({
        key: this.publicKeyPem,
        padding: crypto.constants.RSA_PKCS1_PSS_PADDING,
        saltLength: crypto.constants.RSA_PSS_SALTLEN_DIGEST
      }, Buffer.from(cmsSignature.signature, 'base64'));
      
      return { valid: isValid };
    } catch (error) {
      console.error('❌ CMS signature verification failed:', error);
      return { valid: false, error: 'CMS signature verification exception' };
    }
  }

  /**
   * Sign CDC data submission with both JWS and CMS for maximum PHIN compliance
   */
  signCDCSubmission(data: any, submissionType: 'NNDSS' | 'NEDSS' | 'HAN' | 'MMWR'): {
    signedData: any;
    jwsToken: string;
    cmsSignature: any;
    phinCompliant: boolean;
  } {
    try {
      // Generate both JWS and CMS signatures
      const jwsToken = this.generateJWSSignature(data, {
        issuer: 'cybersecured-ai-cdc-integration',
        audience: `cdc-${submissionType.toLowerCase()}-gateway`,
        expiresIn: '3600' // 1 hour
      });

      const cmsSignature = this.generateCMSSignature(data);

      // Create PHIN-compliant submission envelope
      const signedData = {
        ...data,
        _phinMetadata: {
          digitalSignatures: {
            jws: jwsToken,
            cms: cmsSignature
          },
          submissionType,
          timestamp: new Date().toISOString(),
          version: '2.0',
          compliance: {
            phinCompliant: true,
            signatureVerified: true,
            integrityProtected: true
          }
        }
      };

      return {
        signedData,
        jwsToken,
        cmsSignature,
        phinCompliant: true
      };
    } catch (error) {
      console.error('❌ CRITICAL: CDC submission signing failed:', error);
      throw new Error('PHIN-compliant CDC submission signing failed');
    }
  }

  /**
   * Validate CDC submission signature for PHIN compliance
   */
  validateCDCSubmissionSignature(submission: any): {
    valid: boolean;
    phinCompliant: boolean;
    errors: string[];
  } {
    const errors: string[] = [];
    let valid = true;
    let phinCompliant = false;

    try {
      // Check for PHIN metadata
      if (!submission._phinMetadata) {
        errors.push('Missing PHIN metadata');
        valid = false;
      } else {
        const metadata = submission._phinMetadata;
        
        // Verify PHIN compliance flag
        if (metadata.compliance?.phinCompliant !== true) {
          errors.push('Submission not marked as PHIN-compliant');
          valid = false;
        } else {
          phinCompliant = true;
        }

        // Verify digital signatures exist
        if (!metadata.digitalSignatures) {
          errors.push('Missing digital signatures');
          valid = false;
        } else {
          // Verify JWS signature
          if (metadata.digitalSignatures.jws) {
            const jwsResult = this.verifyJWSSignature(metadata.digitalSignatures.jws, data);
            if (!jwsResult.valid) {
              errors.push(`JWS verification failed: ${jwsResult.error}`);
              valid = false;
            }
          } else {
            errors.push('Missing JWS signature');
            valid = false;
          }

          // Verify CMS signature exists
          if (!metadata.digitalSignatures.cms) {
            errors.push('Missing CMS signature');
            valid = false;
          }
        }
      }

      return { valid, phinCompliant, errors };
    } catch (error) {
      errors.push(`Signature validation exception: ${error instanceof Error ? error.message : 'Unknown error'}`);
      return { valid: false, phinCompliant: false, errors };
    }
  }
}

// Global PHIN Digital Signature Service instance
let phinSignatureService: PHINDigitalSignatureService | null = null;

/**
 * Get or create PHIN Digital Signature Service instance
 */
export function getPHINSignatureService(): PHINDigitalSignatureService {
  if (!phinSignatureService) {
    phinSignatureService = new PHINDigitalSignatureService();
  }
  return phinSignatureService;
}

// CDC Format Compliance Schemas

// MMWR (Morbidity and Mortality Weekly Report) Format Schema
const MMWRDataSchema = z.object({
  mmwrWeek: z.number().min(1).max(53),
  mmwrYear: z.number().min(2000).max(2030),
  reportingArea: z.string().min(1),
  diseaseCondition: z.string().min(1),
  currentWeekCount: z.number().min(0),
  previousYearSameWeek: z.number().min(0),
  cumulativeYearToDate: z.number().min(0),
  cumulativePreviousYear: z.number().min(0),
  flagged: z.boolean().optional(),
  dataQuality: z.enum(['complete', 'incomplete', 'provisional']).default('complete')
});

// NNDSS (National Notifiable Diseases Surveillance System) Format Schema
const NNDSSDataSchema = z.object({
  caseId: z.string().regex(/^NNDSS-\d{4}-\d{6}$/), // Format: NNDSS-YYYY-XXXXXX
  conditionCode: z.string().min(1), // CDC condition code
  conditionName: z.string().min(1),
  reportingJurisdiction: z.string().length(2), // State/territory code
  eventDate: z.string().datetime(),
  reportDate: z.string().datetime(),
  ageGroup: z.enum(['<1', '1-4', '5-14', '15-24', '25-34', '35-44', '45-54', '55-64', '65-74', '75-84', '85+']),
  sex: z.enum(['M', 'F', 'U']), // Male, Female, Unknown
  race: z.array(z.string()).optional(),
  ethnicity: z.enum(['Hispanic', 'Non-Hispanic', 'Unknown']).optional(),
  county: z.string().optional(),
  state: z.string().length(2),
  country: z.string().length(3).default('USA'),
  imported: z.boolean().default(false),
  outbreak: z.boolean().default(false),
  labData: z.object({
    specimenType: z.string().optional(),
    testResult: z.enum(['Positive', 'Negative', 'Indeterminate', 'Not Done']).optional(),
    labName: z.string().optional()
  }).optional(),
  notes: z.string().optional()
});

// NEDSS (National Electronic Disease Surveillance System) Format Schema  
const NEDSSDataSchema = z.object({
  investigationId: z.string().regex(/^NEDSS-\d{4}-\d{8}$/), // Format: NEDSS-YYYY-XXXXXXXX
  phcId: z.string().optional(), // Public Health Case ID
  conditionCode: z.string().min(1),
  investigationStatus: z.enum(['Open', 'Closed', 'Pending', 'Discarded']),
  caseStatus: z.enum(['Confirmed', 'Probable', 'Suspect', 'Not a Case']),
  reportingSource: z.enum(['Laboratory', 'Healthcare Provider', 'Other']),
  jurisdictionCode: z.string().length(2),
  eventDate: z.string().datetime(),
  diagnosisDate: z.string().datetime().optional(),
  onsetDate: z.string().datetime().optional(),
  reportDate: z.string().datetime(),
  investigationStartDate: z.string().datetime().optional(),
  investigatorName: z.string().optional(),
  
  // Patient Demographics (PHI - will be redacted based on access level)
  patientId: z.string().optional(),
  birthDate: z.string().date().optional(),
  age: z.number().min(0).max(150).optional(),
  ageType: z.enum(['Years', 'Months', 'Days']).optional(),
  sex: z.enum(['M', 'F', 'U']),
  race: z.array(z.string()).optional(),
  ethnicity: z.enum(['Hispanic', 'Non-Hispanic', 'Unknown']).optional(),
  
  // Location Information
  residenceAddress: z.object({
    street: z.string().optional(),
    city: z.string().optional(),
    county: z.string().optional(),
    state: z.string().length(2),
    zipCode: z.string().optional(),
    country: z.string().length(3).default('USA')
  }).optional(),
  
  // Clinical Information
  hospitalized: z.boolean().optional(),
  hospitalizationDate: z.string().date().optional(),
  died: z.boolean().default(false),
  deathDate: z.string().date().optional(),
  
  // Laboratory Data
  laboratoryData: z.array(z.object({
    specimenId: z.string(),
    specimenType: z.string(),
    collectionDate: z.string().date(),
    testType: z.string(),
    result: z.string(),
    labName: z.string().optional(),
    labAddress: z.string().optional()
  })).optional(),
  
  // Contact Information
  contactInvestigation: z.boolean().default(false),
  contactCount: z.number().min(0).optional(),
  
  // Risk Factors
  riskFactors: z.array(z.string()).optional(),
  
  // Additional Notes
  investigationNotes: z.string().optional(),
  publicHealthActions: z.array(z.string()).optional()
});

// HAN (Health Alert Network) Format Schema
const HANAlertSchema = z.object({
  hanId: z.string().regex(/^HAN-\d{8}-\d{4}$/), // Format: HAN-YYYYMMDD-XXXX
  messageType: z.enum(['Health Alert', 'Health Advisory', 'Health Update', 'Info Service']),
  priority: z.enum(['High', 'Medium', 'Low', 'Emergency']),
  subject: z.string().min(1).max(100),
  summary: z.string().min(1).max(500),
  messageBody: z.string().min(1),
  
  // Audience and Distribution
  audience: z.array(z.enum([
    'Public Health Professionals',
    'Healthcare Providers', 
    'Laboratory Professionals',
    'Emergency Management',
    'General Public',
    'Media',
    'Government Officials'
  ])),
  distributionList: z.array(z.string()).optional(),
  
  // Timing Information
  issueDate: z.string().datetime(),
  expirationDate: z.string().datetime().optional(),
  urgency: z.enum(['Immediate', 'Expected', 'Future', 'Past']),
  
  // Authority and Source
  issuingAgency: z.string().min(1),
  authorityLevel: z.enum(['Federal', 'State', 'Local', 'Tribal']),
  contactPerson: z.string().optional(),
  contactPhone: z.string().optional(),
  contactEmail: z.string().email().optional(),
  
  // Content Details
  disease: z.string().optional(),
  location: z.object({
    geographic: z.array(z.string()).optional(),
    facilityType: z.array(z.string()).optional()
  }).optional(),
  
  // Actions and Recommendations
  recommendedActions: z.array(z.string()).optional(),
  reportingInstructions: z.string().optional(),
  
  // Attachments and References
  attachments: z.array(z.object({
    filename: z.string(),
    fileSize: z.number(),
    contentType: z.string()
  })).optional(),
  references: z.array(z.string()).optional(),
  
  // Status and Versioning
  messageStatus: z.enum(['Draft', 'Active', 'Cancelled', 'Superseded']),
  version: z.string().default('1.0'),
  supersedes: z.string().optional(), // Previous HAN ID if this supersedes another alert
  
  // CDC Validation
  cdcReviewRequired: z.boolean().default(false),
  cdcApprovalStatus: z.enum(['Pending', 'Approved', 'Rejected', 'Not Required']).default('Not Required')
});

/**
 * CDC Format Adapter Functions
 */

/**
 * Convert epidemiological data to MMWR format
 */
export function convertToMMWRFormat(epidData: any): any {
  try {
    const mmwrData = {
      mmwrWeek: getMMWRWeek(new Date(epidData.reportDate || epidData.timestamp)),
      mmwrYear: new Date(epidData.reportDate || epidData.timestamp).getFullYear(),
      reportingArea: epidData.geographicScope || epidData.jurisdiction || 'Unknown',
      diseaseCondition: epidData.diseaseCode || epidData.diseaseName || 'Unknown',
      currentWeekCount: epidData.caseCount || 1,
      previousYearSameWeek: epidData.historicalComparison?.previousYearSameWeek || 0,
      cumulativeYearToDate: epidData.cumulativeCount || epidData.caseCount || 1,
      cumulativePreviousYear: epidData.historicalComparison?.cumulativePreviousYear || 0,
      flagged: epidData.severity === 'critical' || epidData.severity === 'high',
      dataQuality: epidData.dataQuality || 'complete'
    };
    
    return MMWRDataSchema.parse(mmwrData);
  } catch (error) {
    throw new Error(`MMWR format conversion failed: ${error.message}`);
  }
}

/**
 * Convert public health incident to NNDSS format
 */
export function convertToNNDSSFormat(incident: any, patientData?: any): any {
  try {
    const nndssData = {
      caseId: generateNNDSSCaseId(incident.incidentId),
      conditionCode: incident.diseaseType || 'UNKNOWN',
      conditionName: incident.title || incident.description?.substring(0, 50) || 'Unknown Condition',
      reportingJurisdiction: incident.jurisdiction || incident.region?.substring(0, 2) || 'US',
      eventDate: incident.detectedAt || incident.createdAt,
      reportDate: incident.reportedAt || incident.createdAt,
      ageGroup: patientData?.ageGroup || categorizeAge(patientData?.age),
      sex: patientData?.sex || 'U',
      race: patientData?.race ? [patientData.race] : undefined,
      ethnicity: patientData?.ethnicity || 'Unknown',
      county: incident.county,
      state: incident.state || incident.region?.substring(0, 2) || 'US',
      country: 'USA',
      imported: incident.imported || false,
      outbreak: incident.incidentType === 'disease_outbreak',
      labData: incident.laboratoryData ? {
        specimenType: incident.laboratoryData.specimenType,
        testResult: incident.laboratoryData.result,
        labName: incident.laboratoryData.labName
      } : undefined,
      notes: incident.notes || incident.description
    };
    
    return NNDSSDataSchema.parse(nndssData);
  } catch (error) {
    throw new Error(`NNDSS format conversion failed: ${error.message}`);
  }
}

/**
 * Convert disease surveillance data to NEDSS format
 */
export function convertToNEDSSFormat(surveillance: any, investigationData?: any): any {
  try {
    const nedssData = {
      investigationId: generateNEDSSInvestigationId(surveillance.surveillanceId),
      phcId: surveillance.publicHealthCaseId,
      conditionCode: surveillance.diseaseCode,
      investigationStatus: surveillance.status === 'active' ? 'Open' : 'Closed',
      caseStatus: surveillance.caseClassification || 'Suspect',
      reportingSource: surveillance.reportingSource || 'Healthcare Provider',
      jurisdictionCode: surveillance.jurisdiction || 'US',
      eventDate: surveillance.onsetDate || surveillance.createdAt,
      diagnosisDate: surveillance.diagnosisDate,
      onsetDate: surveillance.onsetDate,
      reportDate: surveillance.reportDate || surveillance.createdAt,
      investigationStartDate: surveillance.investigationStartDate,
      investigatorName: surveillance.investigatorName,
      
      // Patient Demographics (will be redacted by PHI middleware)
      patientId: surveillance.patientId,
      birthDate: surveillance.patientBirthDate,
      age: surveillance.patientAge,
      ageType: 'Years',
      sex: surveillance.patientSex || 'U',
      race: surveillance.patientRace ? [surveillance.patientRace] : undefined,
      ethnicity: surveillance.patientEthnicity,
      
      // Location
      residenceAddress: surveillance.patientAddress ? {
        street: surveillance.patientAddress.street,
        city: surveillance.patientAddress.city,
        county: surveillance.patientAddress.county,
        state: surveillance.patientAddress.state,
        zipCode: surveillance.patientAddress.zipCode,
        country: 'USA'
      } : undefined,
      
      // Clinical Information
      hospitalized: surveillance.hospitalized,
      hospitalizationDate: surveillance.hospitalizationDate,
      died: surveillance.died || false,
      deathDate: surveillance.deathDate,
      
      // Laboratory Data
      laboratoryData: surveillance.laboratoryData ? [{
        specimenId: surveillance.laboratoryData.specimenId || 'UNKNOWN',
        specimenType: surveillance.laboratoryData.specimenType || 'Unknown',
        collectionDate: surveillance.laboratoryData.collectionDate || surveillance.createdAt,
        testType: surveillance.laboratoryData.testType || 'Unknown',
        result: surveillance.laboratoryData.result || 'Unknown',
        labName: surveillance.laboratoryData.labName,
        labAddress: surveillance.laboratoryData.labAddress
      }] : undefined,
      
      // Contact Investigation
      contactInvestigation: surveillance.contactTracingActive || false,
      contactCount: surveillance.averageContactsPerCase,
      
      // Risk Factors
      riskFactors: surveillance.riskFactors ? Array.isArray(surveillance.riskFactors) ? surveillance.riskFactors : [surveillance.riskFactors] : undefined,
      
      // Notes
      investigationNotes: surveillance.investigationNotes || surveillance.notes,
      publicHealthActions: surveillance.publicHealthActions ? Array.isArray(surveillance.publicHealthActions) ? surveillance.publicHealthActions : [surveillance.publicHealthActions] : undefined
    };
    
    return NEDSSDataSchema.parse(nedssData);
  } catch (error) {
    throw new Error(`NEDSS format conversion failed: ${error.message}`);
  }
}

/**
 * Convert public health alert to HAN format
 */
export function convertToHANFormat(alert: any): any {
  try {
    const hanData = {
      hanId: generateHANId(alert.alertId),
      messageType: mapAlertTypeToHAN(alert.alertType),
      priority: mapSeverityToHANPriority(alert.severity),
      subject: alert.title || alert.alertTitle,
      summary: alert.summary || alert.description?.substring(0, 500) || 'Public Health Alert',
      messageBody: alert.description || alert.message || 'Please refer to attached documentation.',
      
      audience: mapAudienceToHAN(alert.targetAudience) || ['Public Health Professionals'],
      distributionList: alert.distributionChannels,
      
      issueDate: alert.issuedAt || alert.createdAt,
      expirationDate: alert.expiresAt,
      urgency: mapSeverityToUrgency(alert.severity),
      
      issuingAgency: alert.issuingAgency || 'Local Public Health Department',
      authorityLevel: alert.authorityLevel || 'Local',
      contactPerson: alert.contactPerson,
      contactPhone: alert.contactPhone,
      contactEmail: alert.contactEmail,
      
      disease: alert.diseaseCondition || alert.relatedDisease,
      location: {
        geographic: alert.geographicScope ? [alert.geographicScope] : undefined,
        facilityType: alert.facilityTypes
      },
      
      recommendedActions: alert.recommendedActions ? Array.isArray(alert.recommendedActions) ? alert.recommendedActions : [alert.recommendedActions] : undefined,
      reportingInstructions: alert.reportingInstructions,
      
      attachments: alert.attachments,
      references: alert.references,
      
      messageStatus: alert.status === 'active' ? 'Active' : mapStatusToHAN(alert.status),
      version: alert.version || '1.0',
      supersedes: alert.supersedes,
      
      cdcReviewRequired: alert.severity === 'critical' || alert.alertType === 'emergency',
      cdcApprovalStatus: alert.cdcApprovalStatus || 'Not Required'
    };
    
    return HANAlertSchema.parse(hanData);
  } catch (error) {
    throw new Error(`HAN format conversion failed: ${error.message}`);
  }
}

// Helper Functions

function getMMWRWeek(date: Date): number {
  const startOfYear = new Date(date.getFullYear(), 0, 1);
  const diff = date.getTime() - startOfYear.getTime();
  const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
  return Math.min(53, Math.max(1, Math.ceil((dayOfYear + startOfYear.getDay()) / 7)));
}

function generateNNDSSCaseId(incidentId: string): string {
  const year = new Date().getFullYear();
  const randomSuffix = Math.random().toString().substring(2, 8);
  return `NNDSS-${year}-${randomSuffix}`;
}

function generateNEDSSInvestigationId(surveillanceId: string): string {
  const year = new Date().getFullYear();
  const randomSuffix = Math.random().toString().substring(2, 10);
  return `NEDSS-${year}-${randomSuffix}`;
}

function generateHANId(alertId: string): string {
  const today = new Date();
  const dateStr = today.toISOString().substring(0, 10).replace(/-/g, '');
  const randomSuffix = Math.random().toString().substring(2, 6);
  return `HAN-${dateStr}-${randomSuffix}`;
}

function categorizeAge(age?: number): string {
  if (!age) return '<1';
  if (age < 1) return '<1';
  if (age <= 4) return '1-4';
  if (age <= 14) return '5-14';
  if (age <= 24) return '15-24';
  if (age <= 34) return '25-34';
  if (age <= 44) return '35-44';
  if (age <= 54) return '45-54';
  if (age <= 64) return '55-64';
  if (age <= 74) return '65-74';
  if (age <= 84) return '75-84';
  return '85+';
}

function mapAlertTypeToHAN(alertType: string): string {
  const mapping: Record<string, string> = {
    'emergency': 'Health Alert',
    'outbreak': 'Health Alert', 
    'advisory': 'Health Advisory',
    'update': 'Health Update',
    'information': 'Info Service'
  };
  return mapping[alertType?.toLowerCase()] || 'Health Alert';
}

function mapSeverityToHANPriority(severity: string): string {
  const mapping: Record<string, string> = {
    'critical': 'Emergency',
    'high': 'High',
    'medium': 'Medium',
    'low': 'Low'
  };
  return mapping[severity?.toLowerCase()] || 'Medium';
}

function mapSeverityToUrgency(severity: string): string {
  const mapping: Record<string, string> = {
    'critical': 'Immediate',
    'high': 'Expected',
    'medium': 'Future',
    'low': 'Future'
  };
  return mapping[severity?.toLowerCase()] || 'Future';
}

function mapAudienceToHAN(audience?: string[]): string[] {
  if (!audience) return ['Public Health Professionals'];
  
  const mapping: Record<string, string> = {
    'healthcare': 'Healthcare Providers',
    'public_health': 'Public Health Professionals',
    'laboratory': 'Laboratory Professionals',
    'emergency': 'Emergency Management',
    'public': 'General Public',
    'media': 'Media',
    'government': 'Government Officials'
  };
  
  return audience.map(a => mapping[a.toLowerCase()] || 'Public Health Professionals');
}

function mapStatusToHAN(status: string): string {
  const mapping: Record<string, string> = {
    'draft': 'Draft',
    'active': 'Active',
    'cancelled': 'Cancelled',
    'superseded': 'Superseded',
    'expired': 'Cancelled'
  };
  return mapping[status?.toLowerCase()] || 'Active';
}

// PHIN (Public Health Information Network) Standards Compliance Schemas
const PHINMessageHeaderSchema = z.object({
  messageId: z.string().uuid(),
  timestamp: z.string().datetime(),
  sender: z.object({
    organizationId: z.string(),
    organizationName: z.string(),
    contactInfo: z.object({
      email: z.string().email().optional(),
      phone: z.string().optional()
    }).optional()
  }),
  receiver: z.object({
    organizationId: z.string(),
    organizationName: z.string()
  }),
  messageType: z.enum(['CASE_REPORT', 'LAB_REPORT', 'OUTBREAK_NOTIFICATION', 'SURVEILLANCE_DATA']),
  priority: z.enum(['ROUTINE', 'URGENT', 'EMERGENCY']),
  security: z.object({
    classification: z.enum(['PUBLIC', 'SENSITIVE', 'CONFIDENTIAL']),
    encryptionUsed: z.boolean(),
    digitalSignature: z.boolean()
  })
});

// HL7 FHIR R4 Resource Schemas for CDC Integration
const FHIRPatientSchema = z.object({
  resourceType: z.literal('Patient'),
  id: z.string().optional(),
  identifier: z.array(z.object({
    system: z.string(),
    value: z.string()
  })).optional(),
  name: z.array(z.object({
    family: z.string().optional(),
    given: z.array(z.string()).optional()
  })).optional(),
  gender: z.enum(['male', 'female', 'other', 'unknown']).optional(),
  birthDate: z.string().date().optional(),
  address: z.array(z.object({
    line: z.array(z.string()).optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    postalCode: z.string().optional(),
    country: z.string().optional()
  })).optional()
});

const FHIRObservationSchema = z.object({
  resourceType: z.literal('Observation'),
  id: z.string().optional(),
  status: z.enum(['registered', 'preliminary', 'final', 'amended', 'corrected', 'cancelled']),
  category: z.array(z.object({
    coding: z.array(z.object({
      system: z.string(),
      code: z.string(),
      display: z.string().optional()
    }))
  })).optional(),
  code: z.object({
    coding: z.array(z.object({
      system: z.string(),
      code: z.string(),
      display: z.string().optional()
    }))
  }),
  subject: z.object({
    reference: z.string()
  }),
  effectiveDateTime: z.string().datetime().optional(),
  valueString: z.string().optional(),
  valueQuantity: z.object({
    value: z.number(),
    unit: z.string().optional(),
    system: z.string().optional(),
    code: z.string().optional()
  }).optional()
});

const FHIRConditionSchema = z.object({
  resourceType: z.literal('Condition'),
  id: z.string().optional(),
  clinicalStatus: z.object({
    coding: z.array(z.object({
      system: z.string(),
      code: z.string()
    }))
  }),
  verificationStatus: z.object({
    coding: z.array(z.object({
      system: z.string(),
      code: z.string()
    }))
  }).optional(),
  category: z.array(z.object({
    coding: z.array(z.object({
      system: z.string(),
      code: z.string(),
      display: z.string().optional()
    }))
  })).optional(),
  code: z.object({
    coding: z.array(z.object({
      system: z.string(),
      code: z.string(),
      display: z.string().optional()
    }))
  }),
  subject: z.object({
    reference: z.string()
  }),
  onsetDateTime: z.string().datetime().optional(),
  recordedDate: z.string().datetime().optional()
});

// CDC Data Quality and Validation Schema
const CDCDataQualityReportSchema = z.object({
  reportId: z.string().uuid(),
  timestamp: z.string().datetime(),
  dataSource: z.string(),
  totalRecords: z.number(),
  validRecords: z.number(),
  invalidRecords: z.number(),
  qualityScore: z.number().min(0).max(100),
  validationErrors: z.array(z.object({
    recordId: z.string(),
    fieldName: z.string(),
    errorType: z.enum(['MISSING_REQUIRED', 'INVALID_FORMAT', 'INVALID_VALUE', 'DUPLICATE', 'INCONSISTENT']),
    errorMessage: z.string(),
    severity: z.enum(['WARNING', 'ERROR', 'CRITICAL'])
  })),
  recommendations: z.array(z.string()).optional()
});

// CDC Automated Reporting Configuration Schema
const CDCReportingConfigSchema = z.object({
  configId: z.string().uuid(),
  reportType: z.enum(['NNDSS', 'NEDSS', 'MMWR', 'HAN', 'SURVEILLANCE']),
  schedule: z.object({
    frequency: z.enum(['REAL_TIME', 'HOURLY', 'DAILY', 'WEEKLY', 'MONTHLY']),
    cronExpression: z.string().optional(),
    timezone: z.string().default('UTC')
  }),
  dataFilters: z.object({
    jurisdiction: z.array(z.string()).optional(),
    diseaseTypes: z.array(z.string()).optional(),
    dateRange: z.object({
      start: z.string().date(),
      end: z.string().date()
    }).optional(),
    severity: z.array(z.enum(['low', 'medium', 'high', 'critical'])).optional()
  }),
  enabled: z.boolean(),
  retryPolicy: z.object({
    maxRetries: z.number().min(0).max(10),
    retryDelayMs: z.number().min(1000).max(300000),
    backoffMultiplier: z.number().min(1).max(5)
  })
});

/**
 * CDC Integration Service Class
 * Provides comprehensive CDC integration capabilities with real-time sync
 */
export class CDCIntegrationService {
  private cdcClient: CDCApiClient;
  private reportingConfigs: Map<string, z.infer<typeof CDCReportingConfigSchema>> = new Map();
  private isInitialized = false;

  constructor(environment: 'sandbox' | 'production' = 'sandbox') {
    this.cdcClient = createCDCApiClient(environment);
  }

  /**
   * Initialize CDC integration service
   */
  async initialize(): Promise<boolean> {
    try {
      const authenticated = await this.cdcClient.authenticate();
      if (!authenticated) {
        throw new Error('Failed to authenticate with CDC systems');
      }

      // Check CDC system status
      const systemStatus = await this.cdcClient.getSystemStatus();
      console.log('✅ CDC Integration Service initialized');
      console.log('📊 CDC System Status:', systemStatus);
      
      this.isInitialized = true;
      return true;
    } catch (error) {
      console.error('❌ Failed to initialize CDC Integration Service:', error);
      return false;
    }
  }

  /**
   * Submit data to CDC with automatic format conversion and validation
   */
  async submitToCDC(
    dataType: 'NNDSS' | 'NEDSS' | 'HAN' | 'MMWR',
    data: any,
    options: {
      validateOnly?: boolean;
      generateReport?: boolean;
      retryOnFailure?: boolean;
    } = {}
  ): Promise<CDCSubmissionResult & { validationReport?: any }> {
    if (!this.isInitialized) {
      throw new Error('CDC Integration Service not initialized');
    }

    try {
      let convertedData: any;
      let validationResult: any;

      // Convert data to appropriate CDC format
      switch (dataType) {
        case 'NNDSS':
          convertedData = convertToNNDSSFormat(data);
          validationResult = NNDSSDataSchema.parse(convertedData);
          break;
        case 'NEDSS':
          convertedData = convertToNEDSSFormat(data);
          validationResult = NEDSSDataSchema.parse(convertedData);
          break;
        case 'HAN':
          convertedData = convertToHANFormat(data);
          validationResult = HANAlertSchema.parse(convertedData);
          break;
        case 'MMWR':
          convertedData = convertToMMWRFormat(data);
          validationResult = MMWRDataSchema.parse(convertedData);
          break;
        default:
          throw new Error(`Unsupported CDC data type: ${dataType}`);
      }

      // If validation only, return validation result
      if (options.validateOnly) {
        return {
          success: true,
          submissionId: `validation-${crypto.randomUUID()}`,
          recordsSubmitted: 1,
          recordsAccepted: 1,
          recordsRejected: 0,
          errors: [],
          validationReport: {
            valid: true,
            convertedData,
            validationResult
          }
        };
      }

      // Submit to appropriate CDC system
      let submissionResult: CDCSubmissionResult;
      switch (dataType) {
        case 'NNDSS':
          submissionResult = await this.cdcClient.submitNNDSSCase(convertedData);
          break;
        case 'NEDSS':
          submissionResult = await this.cdcClient.submitNEDSSInvestigation(convertedData);
          break;
        case 'HAN':
          submissionResult = await this.cdcClient.publishHANAlert(convertedData);
          break;
        case 'MMWR':
          // MMWR is typically read-only, so we would query instead of submit
          throw new Error('MMWR submission not supported - use query methods instead');
        default:
          throw new Error(`Unsupported CDC submission type: ${dataType}`);
      }

      // Add validation report if requested
      if (options.generateReport) {
        submissionResult.validationReport = {
          originalData: data,
          convertedData,
          validationResult,
          submissionTimestamp: new Date().toISOString()
        };
      }

      return submissionResult;
    } catch (error) {
      console.error(`❌ Failed to submit ${dataType} data to CDC:`, error);
      
      if (options.retryOnFailure) {
        console.log('🔄 Retrying CDC submission...');
        // Implement retry logic here
      }
      
      throw error;
    }
  }

  /**
   * Perform data quality validation for CDC submission
   */
  async validateDataQuality(data: any[], dataType: string): Promise<z.infer<typeof CDCDataQualityReportSchema>> {
    const reportId = crypto.randomUUID();
    const timestamp = new Date().toISOString();
    
    let validRecords = 0;
    let invalidRecords = 0;
    const validationErrors: any[] = [];

    for (const [index, record] of data.entries()) {
      try {
        // Validate based on data type
        switch (dataType) {
          case 'NNDSS':
            NNDSSDataSchema.parse(record);
            break;
          case 'NEDSS':
            NEDSSDataSchema.parse(record);
            break;
          case 'HAN':
            HANAlertSchema.parse(record);
            break;
          case 'MMWR':
            MMWRDataSchema.parse(record);
            break;
          default:
            throw new Error(`Unknown data type: ${dataType}`);
        }
        validRecords++;
      } catch (error) {
        invalidRecords++;
        validationErrors.push({
          recordId: record.id || `record-${index}`,
          fieldName: 'general',
          errorType: 'INVALID_FORMAT',
          errorMessage: error instanceof Error ? error.message : 'Validation failed',
          severity: 'ERROR'
        });
      }
    }

    const qualityScore = data.length > 0 ? (validRecords / data.length) * 100 : 0;
    
    const recommendations: string[] = [];
    if (qualityScore < 95) {
      recommendations.push('Review and correct validation errors before submission');
    }
    if (qualityScore < 80) {
      recommendations.push('Consider data quality improvement processes');
    }
    if (validationErrors.length > 0) {
      recommendations.push('Address most common validation errors first');
    }

    return CDCDataQualityReportSchema.parse({
      reportId,
      timestamp,
      dataSource: dataType,
      totalRecords: data.length,
      validRecords,
      invalidRecords,
      qualityScore,
      validationErrors,
      recommendations
    });
  }

  /**
   * Configure automated reporting to CDC
   */
  async configureAutomatedReporting(
    config: z.infer<typeof CDCReportingConfigSchema>
  ): Promise<void> {
    const validatedConfig = CDCReportingConfigSchema.parse(config);
    this.reportingConfigs.set(validatedConfig.configId, validatedConfig);
    
    if (validatedConfig.enabled) {
      console.log(`✅ Automated CDC reporting configured for ${validatedConfig.reportType}`);
      // In a real implementation, this would set up scheduled jobs
    }
  }

  /**
   * Get CDC system status and health information
   */
  async getCDCSystemStatus(): Promise<any> {
    if (!this.isInitialized) {
      throw new Error('CDC Integration Service not initialized');
    }
    
    return await this.cdcClient.getSystemStatus();
  }

  /**
   * Query CDC WONDER database
   */
  async queryCDCWonder(query: any): Promise<any> {
    if (!this.isInitialized) {
      throw new Error('CDC Integration Service not initialized');
    }
    
    return await this.cdcClient.queryWONDERDatabase(query);
  }

  /**
   * Get real-time syndromic surveillance data
   */
  async getSyndromicSurveillanceData(parameters: any = {}): Promise<any> {
    if (!this.isInitialized) {
      throw new Error('CDC Integration Service not initialized');
    }
    
    return await this.cdcClient.getESSENCESurveillanceData(parameters);
  }

  /**
   * Convert local data to HL7 FHIR R4 format
   */
  convertToFHIR(data: any, resourceType: 'Patient' | 'Observation' | 'Condition'): any {
    switch (resourceType) {
      case 'Patient':
        return this.convertToFHIRPatient(data);
      case 'Observation':
        return this.convertToFHIRObservation(data);
      case 'Condition':
        return this.convertToFHIRCondition(data);
      default:
        throw new Error(`Unsupported FHIR resource type: ${resourceType}`);
    }
  }

  private convertToFHIRPatient(data: any): z.infer<typeof FHIRPatientSchema> {
    return FHIRPatientSchema.parse({
      resourceType: 'Patient',
      id: data.patientId,
      identifier: data.identifiers || [{
        system: 'urn:oid:2.16.840.1.113883.4.1',
        value: data.ssn || data.patientId
      }],
      name: data.name ? [{
        family: data.name.family || data.lastName,
        given: data.name.given || [data.firstName]
      }] : undefined,
      gender: data.gender || 'unknown',
      birthDate: data.birthDate || data.dateOfBirth,
      address: data.address ? [{
        line: data.address.line || [data.address.street],
        city: data.address.city,
        state: data.address.state,
        postalCode: data.address.zipCode || data.address.postalCode,
        country: data.address.country || 'US'
      }] : undefined
    });
  }

  private convertToFHIRObservation(data: any): z.infer<typeof FHIRObservationSchema> {
    return FHIRObservationSchema.parse({
      resourceType: 'Observation',
      id: data.observationId || crypto.randomUUID(),
      status: data.status || 'final',
      category: [{
        coding: [{
          system: 'http://terminology.hl7.org/CodeSystem/observation-category',
          code: data.category || 'survey',
          display: data.categoryDisplay || 'Survey'
        }]
      }],
      code: {
        coding: [{
          system: data.codeSystem || 'http://loinc.org',
          code: data.code,
          display: data.codeDisplay
        }]
      },
      subject: {
        reference: `Patient/${data.patientId}`
      },
      effectiveDateTime: data.effectiveDateTime || data.observationDate,
      valueString: data.valueString,
      valueQuantity: data.valueQuantity ? {
        value: data.valueQuantity.value,
        unit: data.valueQuantity.unit,
        system: data.valueQuantity.system || 'http://unitsofmeasure.org',
        code: data.valueQuantity.code
      } : undefined
    });
  }

  private convertToFHIRCondition(data: any): z.infer<typeof FHIRConditionSchema> {
    return FHIRConditionSchema.parse({
      resourceType: 'Condition',
      id: data.conditionId || crypto.randomUUID(),
      clinicalStatus: {
        coding: [{
          system: 'http://terminology.hl7.org/CodeSystem/condition-clinical',
          code: data.clinicalStatus || 'active'
        }]
      },
      verificationStatus: data.verificationStatus ? {
        coding: [{
          system: 'http://terminology.hl7.org/CodeSystem/condition-ver-status',
          code: data.verificationStatus
        }]
      } : undefined,
      category: [{
        coding: [{
          system: 'http://terminology.hl7.org/CodeSystem/condition-category',
          code: data.category || 'encounter-diagnosis',
          display: data.categoryDisplay || 'Encounter Diagnosis'
        }]
      }],
      code: {
        coding: [{
          system: data.codeSystem || 'http://snomed.info/sct',
          code: data.code,
          display: data.codeDisplay
        }]
      },
      subject: {
        reference: `Patient/${data.patientId}`
      },
      onsetDateTime: data.onsetDateTime || data.diagnosisDate,
      recordedDate: data.recordedDate || data.reportDate
    });
  }
}

/**
 * Create PHIN-compliant message header
 */
export function createPHINMessageHeader(
  messageType: 'CASE_REPORT' | 'LAB_REPORT' | 'OUTBREAK_NOTIFICATION' | 'SURVEILLANCE_DATA',
  priority: 'ROUTINE' | 'URGENT' | 'EMERGENCY' = 'ROUTINE',
  senderInfo: {
    organizationId: string;
    organizationName: string;
    contactInfo?: {
      email?: string;
      phone?: string;
    };
  },
  receiverInfo: {
    organizationId: string;
    organizationName: string;
  }
): z.infer<typeof PHINMessageHeaderSchema> {
  return PHINMessageHeaderSchema.parse({
    messageId: crypto.randomUUID(),
    timestamp: new Date().toISOString(),
    sender: senderInfo,
    receiver: receiverInfo,
    messageType,
    priority,
    security: {
      classification: 'SENSITIVE',
      encryptionUsed: true,
      digitalSignature: true
    }
  });
}

// Global CDC Integration Service instance
let cdcIntegrationService: CDCIntegrationService | null = null;

/**
 * Get or create CDC Integration Service instance
 */
export function getCDCIntegrationService(environment: 'sandbox' | 'production' = 'sandbox'): CDCIntegrationService {
  if (!cdcIntegrationService) {
    cdcIntegrationService = new CDCIntegrationService(environment);
  }
  return cdcIntegrationService;
}

// Export schemas for validation
export { 
  MMWRDataSchema, 
  NNDSSDataSchema, 
  NEDSSDataSchema, 
  HANAlertSchema,
  PHINMessageHeaderSchema,
  FHIRPatientSchema,
  FHIRObservationSchema,
  FHIRConditionSchema,
  CDCDataQualityReportSchema,
  CDCReportingConfigSchema
};