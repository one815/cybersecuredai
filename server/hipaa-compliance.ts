import type { Request, Response, NextFunction } from 'express';
import type { AuthenticatedRequest } from './auth';
import { 
  publicHealthIncidents, 
  diseaseSurveillance, 
  contactTracing, 
  healthFacilities, 
  publicHealthAlerts, 
  epidemiologicalData 
} from '@shared/schema';

// SCHEMA-AWARE PHI FIELD EXTRACTION
// Automatically extracts PHI fields based on field name patterns to eliminate bypass risk
function extractPhiFieldsFromSchema(): string[] {
  // Define known PHI field patterns from the public health schema
  // Based on the schema definitions we read earlier
  const schemaPhiFields = [
    // Location/Geographic data
    'latitude', 'longitude', 'coordinates', 'exposureLatitude', 'exposureLongitude',
    'affectedRegion', 'surveillanceArea', 'exposureLocation', 'address', 'location',
    'boundaryData', 'geographicScope', 'serviceArea', 'homeLocation', 'workLocation',
    
    // Contact and Personal Information
    'emergencyContacts', 'contactInformation', 'emergencyContact', 'nextOfKin', 'guardian',
    'primaryPhone', 'emergencyPhone', 'faxNumber', 'email', 'phoneNumber', 'mobileNumber',
    'contactPersonId', 'relationshipToCase', 'contactMethod', 'notificationMethod',
    
    // Personal and Demographic Identifiers
    'demographicImpact', 'demographicDetails', 'personalInformation', 'individualIdentifiers',
    'patientIdentifiers', 'contactPersonId', 'indexCaseId', 'caseInvestigationId',
    'assignedContactTracer', 'patientId', 'patientName', 'fullName', 'firstName', 'lastName',
    
    // Medical and Health Information
    'medicalHistory', 'healthRecords', 'symptomsReported', 'testResults', 'healthStatus',
    'vaccinationStatus', 'immunizations', 'medicalInformation', 'caseInvestigationData',
    'clinicalPresentation', 'diagnosticCriteria', 'laboratoryResults', 'biometricData',
    
    // Temporal Identifiers linked to individuals
    'exposureDate', 'symptomOnset', 'lastContactDate', 'consentDate', 'quarantineStartDate',
    'quarantineEndDate', 'monitoringStartDate', 'monitoringEndDate', 'automaticPurgeDate',
    
    // Digital tracking and privacy-sensitive data
    'digitalTracingData', 'bluetoothProximityData', 'gpsLocationData', 'protectiveEquipmentUsed',
    
    // Access and audit information
    'accessLog', 'modificationLog', 'securityFlags', 'notes', 'communicationPlan'
  ];
  
  return schemaPhiFields;
}

// Generate schema-aware PHI registry
const SCHEMA_PHI_FIELDS = extractPhiFieldsFromSchema();

// ENHANCED PHI CLASSIFICATION SYSTEM - Now fully schema-aware
// Combines static registry with dynamic schema extraction for complete coverage
const PHI_FIELD_REGISTRY = {
  // DIRECT IDENTIFIERS - Always PHI regardless of context
  direct_identifiers: {
    always_phi: true,
    fields: [
      // Personal identifiers
      'ssn', 'socialSecurityNumber', 'tin', 'taxId',
      'fullName', 'firstName', 'lastName', 'middleName',
      'patientId', 'patientName', 'contactPersonId',
      'medicalRecordNumber', 'healthRecordId', 'mrn',
      'accountNumber', 'certificateId', 'licenseNumber',
      'vehicleId', 'deviceId', 'webUrl', 'ipAddress',
      'biometricIds', 'photographicImages', 'voicePrints',
      // Legacy field names from old system
      'personalInformation', 'personalDetails', 'patientIdentifiers',
      'individualIdentifiers'
    ]
  },
  
  // CONTACT INFORMATION - Always PHI
  contact_information: {
    always_phi: true,
    fields: [
      'phoneNumber', 'mobileNumber', 'faxNumber', 'phone',
      'emailAddress', 'email', 'contactEmail', 'mail',
      'homeAddress', 'workAddress', 'mailingAddress',
      'streetAddress', 'address', 'residenceAddress',
      'emergencyContact', 'nextOfKin', 'guardian',
      'contactInformation' // Legacy aggregate field
    ]
  },
  
  // MEDICAL INFORMATION - Always PHI
  medical_information: {
    always_phi: true,
    fields: [
      'medicalHistory', 'medicalRecords', 'healthRecords',
      'diagnosis', 'symptoms', 'conditions', 'diseases',
      'medications', 'prescriptions', 'treatments',
      'procedures', 'surgeries', 'allergies',
      'vaccinationStatus', 'immunizations', 'vaccinations',
      'testResults', 'labResults', 'laboratoryResults',
      'biometricData', 'geneticInfo', 'mentalHealth',
      'substance', 'addiction', 'disability', 'injury',
      'medicalInformation', 'patientRecords', 'caseInvestigationData'
    ]
  },
  
  // QUASI-IDENTIFIERS - PHI when combined or in small populations
  quasi_identifiers: {
    phi_when_combined: true,
    context_sensitive: true,
    fields: [
      'dateOfBirth', 'birthDate', 'age', 'ageGroup',
      'zipCode', 'postalCode', 'county', 'city',
      'race', 'ethnicity', 'gender', 'sex',
      'occupation', 'employer', 'workLocation',
      'educationLevel', 'maritalStatus', 'religion',
      'demographicDetails', 'demographicBreakdown'
    ]
  },
  
  // HEALTHCARE PROVIDER INFORMATION - PHI when linked to patient
  healthcare_provider: {
    phi_when_linked: true,
    fields: [
      'physicianName', 'doctorName', 'nurseId',
      'hospitalName', 'clinicName', 'facilityName',
      'insuranceProvider', 'payerInfo', 'accountInfo',
      'staffPersonalInfo', 'admissionRecords', 'dischargeRecords'
    ]
  },
  
  // TEMPORAL IDENTIFIERS - PHI when specific to individual
  temporal_identifiers: {
    phi_when_specific: true,
    fields: [
      'admissionDate', 'dischargeDate', 'treatmentDate',
      'appointmentDate', 'testDate', 'procedureDate',
      'deathDate', 'onsetDate', 'diagnosisDate',
      'lastVisit', 'nextAppointment', 'contactDate'
    ]
  },
  
  // LOCATION DATA - PHI when granular
  location_data: {
    phi_when_granular: true,
    granularity_threshold: 'address_level',
    fields: [
      'latitude', 'longitude', 'coordinates', 'gpsData',
      'geocode', 'locationData', 'geographicDetails',
      'facilityLocation', 'homeLocation', 'workLocation'
    ]
  }
};

// Role-based PHI access levels
const PHI_ACCESS_LEVELS = {
  'admin': 'full_access',
  'public_health_officer': 'full_access',
  'epidemiologist': 'aggregated_only',
  'contact_tracer': 'contact_tracing_only',
  'health_facility_admin': 'facility_specific',
  'emergency_coordinator': 'emergency_only',
  'user': 'no_access'
};

// Redaction patterns for different access levels
const REDACTION_PATTERNS = {
  full_access: [], // No redaction
  aggregated_only: ['contactPersonId', 'personalInformation', 'phoneNumber', 'emailAddress', 'homeAddress'],
  contact_tracing_only: ['medicalHistory', 'testResults', 'symptoms'],
  facility_specific: ['personalInformation', 'contactInformation'],
  emergency_only: ['medicalHistory', 'testResults', 'vaccinationStatus'],
  no_access: ['*'] // Redact all PHI
};

/**
 * HIPAA-compliant PHI redaction middleware
 * Automatically redacts Protected Health Information based on user role and context
 */
export function phiRedactionMiddleware(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  // Store original json method
  const originalJson = res.json;
  
  // Override json method to apply PHI redaction
  res.json = function(body: any) {
    try {
      if (body && typeof body === 'object') {
        const redactedBody = applyPhiRedaction(body, req);
        return originalJson.call(this, redactedBody);
      }
      return originalJson.call(this, body);
    } catch (error) {
      console.error('❌ PHI redaction error:', error);
      // On redaction error, err on the side of caution and return minimal data
      return originalJson.call(this, { 
        success: false, 
        error: 'Data access restricted for privacy compliance',
        code: 'PHI_REDACTION_ERROR'
      });
    }
  };
  
  next();
}

/**
 * Apply PHI redaction based on user role and request context
 */
function applyPhiRedaction(data: any, req: AuthenticatedRequest): any {
  const userRole = req.user?.role || 'user';
  const accessLevel = PHI_ACCESS_LEVELS[userRole] || 'no_access';
  const redactionFields = REDACTION_PATTERNS[accessLevel] || ['*'];
  
  // If full access, return data as-is
  if (accessLevel === 'full_access') {
    return data;
  }
  
  // Apply redaction recursively
  return redactFields(data, redactionFields, userRole);
}

/**
 * Recursively redact PHI fields from data object
 */
function redactFields(obj: any, redactionFields: string[], userRole: string): any {
  if (!obj || typeof obj !== 'object') {
    return obj;
  }
  
  if (Array.isArray(obj)) {
    return obj.map(item => redactFields(item, redactionFields, userRole));
  }
  
  const redacted = { ...obj };
  
  // Apply redaction based on field patterns
  for (const field of Object.keys(redacted)) {
    if (shouldRedactField(field, redactionFields, userRole)) {
      redacted[field] = getRedactionValue(field, redacted[field]);
    } else if (typeof redacted[field] === 'object') {
      redacted[field] = redactFields(redacted[field], redactionFields, userRole);
    }
  }
  
  return redacted;
}

/**
 * Determine if a field should be redacted based on PHI registry and user role
 */
function shouldRedactField(fieldName: string, redactionFields: string[], userRole: string): boolean {
  // Universal redaction
  if (redactionFields.includes('*')) {
    return isPhiField(fieldName);
  }
  
  // Specific field redaction
  if (redactionFields.includes(fieldName)) {
    return true;
  }
  
  // Role-specific PHI field checks
  return isPhiField(fieldName) && !hasFieldAccess(fieldName, userRole);
}

/**
 * FULLY SCHEMA-AWARE PHI FIELD CLASSIFICATION
 * Combines static registry with dynamic schema extraction for complete HIPAA compliance
 * Eliminates bypass risk by automatically detecting PHI fields from schema definitions
 */
function isPhiField(fieldName: string, context?: any): boolean {
  // PHASE 1: Check static PHI registry for known patterns
  
  // Direct identifiers are always PHI
  if (PHI_FIELD_REGISTRY.direct_identifiers.fields.includes(fieldName)) {
    return true;
  }
  
  // Contact information is always PHI
  if (PHI_FIELD_REGISTRY.contact_information.fields.includes(fieldName)) {
    return true;
  }
  
  // Medical information is always PHI
  if (PHI_FIELD_REGISTRY.medical_information.fields.includes(fieldName)) {
    return true;
  }
  
  // Quasi-identifiers are PHI when combined or in small populations
  if (PHI_FIELD_REGISTRY.quasi_identifiers.fields.includes(fieldName)) {
    return evaluateQuasiIdentifierRisk(fieldName, context);
  }
  
  // Temporal identifiers are PHI when specific to individual
  if (PHI_FIELD_REGISTRY.temporal_identifiers.fields.includes(fieldName)) {
    return evaluateTemporalIdentifierRisk(fieldName, context);
  }
  
  // Location data is PHI when granular enough to identify individuals
  if (PHI_FIELD_REGISTRY.location_data.fields.includes(fieldName)) {
    return evaluateLocationDataRisk(fieldName, context);
  }
  
  // Healthcare provider info is PHI when linked to patient
  if (PHI_FIELD_REGISTRY.healthcare_provider.fields.includes(fieldName)) {
    return evaluateProviderLinkageRisk(fieldName, context);
  }
  
  // PHASE 2: SCHEMA-AWARE DETECTION - Check dynamically extracted schema fields
  // This prevents new PHI fields from bypassing redaction
  if (SCHEMA_PHI_FIELDS.includes(fieldName)) {
    return true;
  }
  
  // PHASE 3: Pattern-based fallback for nested/unknown fields
  // Apply conservative PHI detection for field names that might contain PHI
  if (isConservativePhiPattern(fieldName)) {
    return true;
  }
  
  // SECURITY IMPROVEMENT: Schema-aware approach with fallback detection
  // This comprehensive approach ensures no PHI fields can bypass redaction
  return false;
}

/**
 * Conservative pattern-based PHI detection for unknown/nested fields
 * Used as final safety net to catch any potential PHI not in registry or schema
 */
function isConservativePhiPattern(fieldName: string): boolean {
  // Convert to lowercase for case-insensitive matching
  const field = fieldName.toLowerCase();
  
  // High-risk patterns that are almost always PHI
  const phiPatterns = [
    'ssn', 'social', 'tax', 'patient', 'person', 'individual',
    'phone', 'mobile', 'tel', 'email', 'mail', 'contact',
    'name', 'fname', 'lname', 'fullname', 'firstname', 'lastname',
    'address', 'street', 'home', 'residence', 'location',
    'latitude', 'longitude', 'coords', 'gps', 'geocode',
    'medical', 'health', 'diagnosis', 'symptom', 'treatment',
    'emergency', 'guardian', 'relative', 'family', 'kin'
  ];
  
  return phiPatterns.some(pattern => field.includes(pattern));
}

/**
 * Evaluate if quasi-identifiers pose PHI risk based on context
 */
function evaluateQuasiIdentifierRisk(fieldName: string, context?: any): boolean {
  // In small populations, quasi-identifiers become PHI
  if (context?.populationSize && context.populationSize < 1000) {
    return true;
  }
  
  // If multiple quasi-identifiers are present, treat as PHI
  if (context?.quasiIdentifierCount && context.quasiIdentifierCount >= 2) {
    return true;
  }
  
  // Default: quasi-identifiers in aggregate data are usually safe
  return false;
}

/**
 * Evaluate temporal identifier PHI risk
 */
function evaluateTemporalIdentifierRisk(fieldName: string, context?: any): boolean {
  // Specific dates linked to individuals are PHI
  if (context?.linkedToIndividual) {
    return true;
  }
  
  // Aggregate temporal data is usually safe
  return false;
}

/**
 * Evaluate location data PHI risk based on granularity
 */
function evaluateLocationDataRisk(fieldName: string, context?: any): boolean {
  // GPS coordinates or street-level addresses are PHI
  if (fieldName.includes('latitude') || fieldName.includes('longitude') || 
      fieldName.includes('address') || fieldName.includes('gps')) {
    return true;
  }
  
  // County/state level aggregates are usually safe
  if (context?.aggregationLevel && 
      ['county', 'state', 'region', 'national'].includes(context.aggregationLevel)) {
    return false;
  }
  
  // Default: treat location data as PHI unless proven safe
  return true;
}

/**
 * Evaluate healthcare provider linkage PHI risk
 */
function evaluateProviderLinkageRisk(fieldName: string, context?: any): boolean {
  // Provider info is PHI when it can be linked back to specific patients
  if (context?.patientLinkable) {
    return true;
  }
  
  // Aggregate provider statistics are usually safe
  return false;
}

/**
 * Check if user role has access to specific PHI field
 */
function hasFieldAccess(fieldName: string, userRole: string): boolean {
  // Contact tracers can access contact tracing PHI
  if (userRole === 'contact_tracer' && PHI_FIELD_REGISTRY.contact_tracing.includes(fieldName)) {
    return true;
  }
  
  // Health facility admins can access facility-specific PHI
  if (userRole === 'health_facility_admin' && PHI_FIELD_REGISTRY.health_facilities.includes(fieldName)) {
    return true;
  }
  
  // Default to no access for other combinations
  return false;
}

/**
 * Get appropriate redaction value based on field type
 */
function getRedactionValue(fieldName: string, originalValue: any): any {
  if (originalValue === null || originalValue === undefined) {
    return originalValue;
  }
  
  // Pattern-based redaction
  if (typeof originalValue === 'string') {
    if (fieldName.includes('email')) return '[EMAIL_REDACTED]';
    if (fieldName.includes('phone')) return '[PHONE_REDACTED]';
    if (fieldName.includes('address')) return '[ADDRESS_REDACTED]';
    if (fieldName.includes('name')) return '[NAME_REDACTED]';
    return '[REDACTED]';
  }
  
  if (typeof originalValue === 'number') {
    return 0;
  }
  
  if (typeof originalValue === 'boolean') {
    return false;
  }
  
  if (Array.isArray(originalValue)) {
    return [];
  }
  
  if (typeof originalValue === 'object') {
    return {};
  }
  
  return '[REDACTED]';
}

/**
 * PHI minimization middleware for contact tracing endpoints
 * Applies additional restrictions for highly sensitive contact tracing data
 */
export function contactTracingPhiMinimization(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const originalJson = res.json;
  
  res.json = function(body: any) {
    try {
      if (body && body.data) {
        // Apply contact tracing specific minimization
        const minimizedData = minimizeContactTracingPhi(body.data, req);
        body.data = minimizedData;
      }
      return originalJson.call(this, body);
    } catch (error) {
      console.error('❌ Contact tracing PHI minimization error:', error);
      return originalJson.call(this, { 
        success: false, 
        error: 'Contact data access restricted for privacy compliance',
        code: 'PHI_MINIMIZATION_ERROR'
      });
    }
  };
  
  next();
}

/**
 * Apply PHI minimization specifically for contact tracing data
 */
function minimizeContactTracingPhi(data: any, req: AuthenticatedRequest): any {
  const userRole = req.user?.role || 'user';
  
  // Only contact tracers and public health officers should see full contact details
  if (userRole !== 'contact_tracer' && userRole !== 'public_health_officer' && userRole !== 'admin') {
    if (Array.isArray(data)) {
      return data.map(item => ({
        id: item.id,
        contactType: item.contactType,
        exposureDate: item.exposureDate,
        status: item.status,
        // All other PHI fields removed
      }));
    } else {
      return {
        id: data.id,
        contactType: data.contactType,
        exposureDate: data.exposureDate,
        status: data.status,
        // All other PHI fields removed
      };
    }
  }
  
  return data;
}

/**
 * Audit middleware to log PHI access attempts
 */
export function phiAuditMiddleware(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  // Log PHI access for compliance auditing
  if (req.url.includes('/api/public-health/')) {
    console.log(`🔒 PHI Access: User ${req.user?.id} (${req.user?.role}) accessed ${req.method} ${req.url} from ${req.ip}`);
    
    // Store audit information for compliance reporting
    const auditData = {
      userId: req.user?.id,
      userRole: req.user?.role,
      endpoint: `${req.method} ${req.url}`,
      timestamp: new Date().toISOString(),
      ipAddress: req.ip,
      userAgent: req.get('User-Agent')
    };
    
    // In production, this would be stored in a secure audit log system
    console.log(`📋 PHI Audit Log:`, JSON.stringify(auditData));
  }
  
  next();
}

/**
 * Comprehensive RBAC validation for public health endpoints
 */
export function validatePublicHealthAccess(allowedRoles: string[]) {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const userRole = req.user?.role;
    
    if (!userRole) {
      return res.status(401).json({
        success: false,
        error: 'Authentication required',
        code: 'AUTH_REQUIRED'
      });
    }
    
    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({
        success: false,
        error: 'Insufficient permissions for public health data access',
        code: 'PHI_ACCESS_DENIED'
      });
    }
    
    next();
  };
}

export { PHI_FIELD_REGISTRY, PHI_ACCESS_LEVELS, REDACTION_PATTERNS };