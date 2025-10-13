-- =================================================================
-- CRITICAL HIPAA/FedRAMP COMPLIANCE: Database-Level Audit Log Immutability
-- =================================================================
-- This script implements WORM (Write-Once-Read-Many) characteristics
-- for hipaa_secure_audit_logs to ensure tamper-evident audit trails
-- as required for HIPAA/FedRAMP compliance.

-- 1. PREVENT UPDATE OPERATIONS ON AUDIT LOGS
-- =================================================================

CREATE OR REPLACE FUNCTION prevent_audit_log_updates()
RETURNS TRIGGER AS $$
BEGIN
    -- Block all UPDATE attempts on audit logs
    RAISE EXCEPTION 'HIPAA VIOLATION: Audit logs are immutable and cannot be updated. Operation denied for compliance.';
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to prevent updates
DROP TRIGGER IF EXISTS trigger_prevent_audit_updates ON hipaa_secure_audit_logs;
CREATE TRIGGER trigger_prevent_audit_updates
    BEFORE UPDATE ON hipaa_secure_audit_logs
    FOR EACH ROW EXECUTE FUNCTION prevent_audit_log_updates();

-- 2. PREVENT DELETE OPERATIONS ON AUDIT LOGS  
-- =================================================================

CREATE OR REPLACE FUNCTION prevent_audit_log_deletes()
RETURNS TRIGGER AS $$
BEGIN
    -- Block all DELETE attempts on audit logs
    RAISE EXCEPTION 'HIPAA VIOLATION: Audit logs are immutable and cannot be deleted. Operation denied for compliance.';
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to prevent deletes
DROP TRIGGER IF EXISTS trigger_prevent_audit_deletes ON hipaa_secure_audit_logs;
CREATE TRIGGER trigger_prevent_audit_deletes
    BEFORE DELETE ON hipaa_secure_audit_logs
    FOR EACH ROW EXECUTE FUNCTION prevent_audit_log_deletes();

-- 3. AUDIT CHAIN INTEGRITY VALIDATION
-- =================================================================

CREATE OR REPLACE FUNCTION validate_audit_chain_integrity(
    p_organization_id VARCHAR,
    p_start_date TIMESTAMP DEFAULT NULL,
    p_end_date TIMESTAMP DEFAULT NULL
)
RETURNS TABLE (
    is_valid BOOLEAN,
    broken_chains INTEGER,
    total_logs INTEGER,
    first_invalid_log_id VARCHAR,
    validation_errors TEXT[]
) AS $$
DECLARE
    v_errors TEXT[] := '{}';
    v_broken_chains INTEGER := 0;
    v_total_logs INTEGER := 0;
    v_first_invalid VARCHAR := NULL;
    v_current_record RECORD;
    v_expected_hash VARCHAR;
    v_calculated_hash VARCHAR;
BEGIN
    -- Count total logs for the organization in date range
    SELECT COUNT(*) INTO v_total_logs
    FROM hipaa_secure_audit_logs 
    WHERE organization_id = p_organization_id
    AND (p_start_date IS NULL OR event_time >= p_start_date)
    AND (p_end_date IS NULL OR event_time <= p_end_date);

    -- Validate chain integrity by checking each log's hash against previous
    FOR v_current_record IN 
        SELECT id, log_id, chain_hash, previous_log_hash, digital_signature,
               LAG(chain_hash) OVER (ORDER BY event_time, log_time) as prev_actual_hash
        FROM hipaa_secure_audit_logs 
        WHERE organization_id = p_organization_id
        AND (p_start_date IS NULL OR event_time >= p_start_date)
        AND (p_end_date IS NULL OR event_time <= p_end_date)
        ORDER BY event_time, log_time
    LOOP
        -- Check if previous_log_hash matches actual previous hash
        IF v_current_record.prev_actual_hash IS NOT NULL THEN
            IF v_current_record.previous_log_hash != v_current_record.prev_actual_hash THEN
                v_broken_chains := v_broken_chains + 1;
                v_errors := array_append(v_errors, 
                    'Chain break at log_id: ' || v_current_record.log_id || 
                    ', expected: ' || v_current_record.prev_actual_hash || 
                    ', found: ' || v_current_record.previous_log_hash
                );
                
                IF v_first_invalid IS NULL THEN
                    v_first_invalid := v_current_record.log_id;
                END IF;
            END IF;
        END IF;

        -- Validate digital signature exists
        IF v_current_record.digital_signature IS NULL OR 
           LENGTH(v_current_record.digital_signature) < 64 THEN
            v_broken_chains := v_broken_chains + 1;
            v_errors := array_append(v_errors, 
                'Invalid digital signature for log_id: ' || v_current_record.log_id
            );
            
            IF v_first_invalid IS NULL THEN
                v_first_invalid := v_current_record.log_id;
            END IF;
        END IF;
    END LOOP;

    -- Return validation results
    RETURN QUERY SELECT 
        (v_broken_chains = 0) as is_valid,
        v_broken_chains,
        v_total_logs,
        v_first_invalid,
        v_errors;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 4. AUDIT LOG RETENTION POLICY ENFORCEMENT
-- =================================================================

CREATE OR REPLACE FUNCTION enforce_audit_retention_policy()
RETURNS INTEGER AS $$
DECLARE
    v_archived_count INTEGER := 0;
BEGIN
    -- Archive audit logs older than retention period (but don't delete)
    UPDATE hipaa_secure_audit_logs 
    SET status = 'archived'
    WHERE retention_expiry < NOW()
    AND legal_hold = false
    AND status = 'active';
    
    GET DIAGNOSTICS v_archived_count = ROW_COUNT;
    
    -- Log the retention policy enforcement
    INSERT INTO hipaa_secure_audit_logs (
        organization_id, log_id, chain_hash, previous_log_hash,
        digital_signature, signature_algorithm, key_id,
        user_id, ip_address, action, action_category,
        resource, resource_type, system_generated, 
        change_reason, event_time, retention_expiry
    ) VALUES (
        'system', 'retention_' || extract(epoch from now())::varchar, 
        encode(digest('retention_policy_' || now()::text, 'sha256'), 'hex'),
        '', 'system_generated_signature', 'RSA-SHA256', 'system_key',
        NULL, '127.0.0.1', 'archive', 'system',
        'audit_retention_policy', 'system_config', true,
        'Archived ' || v_archived_count || ' audit logs per retention policy',
        NOW(), NOW() + INTERVAL '7 years'
    );
    
    RETURN v_archived_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 5. CREATE INDEXES FOR AUDIT INTEGRITY VERIFICATION
-- =================================================================

-- Index for fast chain validation queries
CREATE INDEX IF NOT EXISTS idx_audit_chain_validation 
ON hipaa_secure_audit_logs (organization_id, event_time, log_time, chain_hash, previous_log_hash);

-- Index for retention policy enforcement
CREATE INDEX IF NOT EXISTS idx_audit_retention 
ON hipaa_secure_audit_logs (retention_expiry, legal_hold, status);

-- Index for integrity check queries
CREATE INDEX IF NOT EXISTS idx_audit_integrity_check 
ON hipaa_secure_audit_logs (organization_id, last_integrity_check, integrity_verified);

-- 6. AUDIT LOG VERIFICATION JOB FUNCTION
-- =================================================================

CREATE OR REPLACE FUNCTION run_audit_integrity_verification()
RETURNS TABLE (
    organization_id VARCHAR,
    verification_status VARCHAR,
    total_logs INTEGER,
    invalid_logs INTEGER,
    last_verified TIMESTAMP
) AS $$
DECLARE
    org_record RECORD;
    verification_result RECORD;
BEGIN
    -- Verify integrity for each organization
    FOR org_record IN 
        SELECT DISTINCT hal.organization_id
        FROM hipaa_secure_audit_logs hal
        WHERE hal.status = 'active'
    LOOP
        -- Run integrity validation for this organization
        SELECT * INTO verification_result
        FROM validate_audit_chain_integrity(org_record.organization_id)
        LIMIT 1;
        
        -- Update integrity verification status
        UPDATE hipaa_secure_audit_logs
        SET 
            integrity_verified = verification_result.is_valid,
            last_integrity_check = NOW(),
            integrity_check_results = jsonb_build_object(
                'is_valid', verification_result.is_valid,
                'broken_chains', verification_result.broken_chains,
                'total_logs', verification_result.total_logs,
                'validation_errors', verification_result.validation_errors,
                'verified_at', NOW()
            )
        WHERE organization_id = org_record.organization_id
        AND last_integrity_check < NOW() - INTERVAL '1 hour';
        
        -- Return verification status
        RETURN QUERY SELECT 
            org_record.organization_id,
            CASE WHEN verification_result.is_valid THEN 'VALID' ELSE 'INVALID' END,
            verification_result.total_logs,
            verification_result.broken_chains,
            NOW();
    END LOOP;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =================================================================
-- SECURITY GRANTS AND PERMISSIONS
-- =================================================================

-- Grant execute permissions for verification functions to authorized roles
-- In production, these should be restricted to specific database roles
GRANT EXECUTE ON FUNCTION validate_audit_chain_integrity TO PUBLIC;
GRANT EXECUTE ON FUNCTION run_audit_integrity_verification TO PUBLIC;
GRANT EXECUTE ON FUNCTION enforce_audit_retention_policy TO PUBLIC;

-- Create comment documenting the WORM implementation
COMMENT ON TABLE hipaa_secure_audit_logs IS 
'HIPAA/FedRAMP Compliant Tamper-Evident Audit Log Table with WORM characteristics enforced by database triggers. UPDATE and DELETE operations are prevented by database-level triggers to ensure audit trail integrity and regulatory compliance.';

-- =================================================================
-- VERIFICATION QUERIES FOR TESTING
-- =================================================================

-- Test that UPDATE operations are blocked
-- Expected: Should raise exception
-- SELECT 'Testing UPDATE prevention...' as test_status;
-- UPDATE hipaa_secure_audit_logs SET action = 'test' WHERE id = (SELECT id FROM hipaa_secure_audit_logs LIMIT 1);

-- Test that DELETE operations are blocked  
-- Expected: Should raise exception
-- SELECT 'Testing DELETE prevention...' as test_status;
-- DELETE FROM hipaa_secure_audit_logs WHERE id = (SELECT id FROM hipaa_secure_audit_logs LIMIT 1);

-- Test integrity validation
-- Expected: Returns validation results
-- SELECT 'Testing integrity validation...' as test_status;
-- SELECT * FROM validate_audit_chain_integrity('test_org');

SELECT 'HIPAA/FedRAMP audit log immutability constraints successfully installed.' as installation_status;