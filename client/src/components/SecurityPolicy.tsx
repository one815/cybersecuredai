import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { Shield, Lock, Eye, AlertTriangle, FileText, ScrollText } from 'lucide-react';

interface SecurityPolicyProps {
  onAccept: () => void;
  onDecline: () => void;
}

export function SecurityPolicy({ onAccept, onDecline }: SecurityPolicyProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [hasScrolledToEnd, setHasScrolledToEnd] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!scrollRef.current) return;
      
      const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
      const totalScrollable = scrollHeight - clientHeight;
      const progress = totalScrollable > 0 ? (scrollTop / totalScrollable) * 100 : 100;
      
      setScrollProgress(progress);
      
      // Consider "scrolled to end" when user has scrolled at least 95%
      if (progress >= 95) {
        setHasScrolledToEnd(true);
      }
    };

    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener('scroll', handleScroll);
      // Check initial state
      handleScroll();
      
      return () => scrollElement.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const canAccept = hasScrolledToEnd && accepted;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card className="bg-gradient-to-br from-blue-950/90 to-purple-950/90 border-blue-800/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="w-8 h-8 text-blue-400" />
              <div>
                <CardTitle className="text-2xl text-white">CyberSecured AI Security Policy</CardTitle>
                <p className="text-blue-200 mt-1">Effective Date: August 2025 | Version 2.1</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-blue-300">Reading Progress</div>
              <Progress value={scrollProgress} className="w-32 mt-1" />
              <div className="text-xs text-blue-400 mt-1">{Math.round(scrollProgress)}%</div>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700">
        <CardContent className="p-0">
          <div 
            ref={scrollRef}
            className="h-96 overflow-y-auto p-6 space-y-6 text-sm leading-relaxed"
            data-testid="security-policy-content"
          >
            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Lock className="w-5 h-5 text-blue-500" />
                1. Data Protection and Encryption
              </h2>
              <div className="space-y-3 text-gray-700 dark:text-gray-300">
                <p>
                  <strong>End-to-End Encryption:</strong> All data transmitted through the CyberSecured AI platform is protected using AES-256 encryption standards. This includes all communications, file transfers, and data storage operations.
                </p>
                <p>
                  <strong>Data at Rest:</strong> Your information is stored in encrypted databases using industry-standard encryption protocols. Access to encrypted data is strictly controlled through multi-layered authentication systems.
                </p>
                <p>
                  <strong>Zero-Knowledge Architecture:</strong> Our platform is designed so that even our system administrators cannot access your raw data without proper authorization protocols.
                </p>
                <p>
                  <strong>Data Minimization:</strong> We collect and process only the data necessary for providing cybersecurity services. Personal information is anonymized whenever possible.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Eye className="w-5 h-5 text-green-500" />
                2. Access Control and Authentication
              </h2>
              <div className="space-y-3 text-gray-700 dark:text-gray-300">
                <p>
                  <strong>Multi-Factor Authentication (MFA):</strong> All user accounts must employ multi-factor authentication. Supported methods include TOTP, hardware security keys (YubiKey), and biometric verification.
                </p>
                <p>
                  <strong>Role-Based Access Control (RBAC):</strong> System access is granted based on the principle of least privilege. Users receive only the minimum access necessary to perform their designated functions.
                </p>
                <p>
                  <strong>Session Management:</strong> User sessions are automatically terminated after periods of inactivity. Session tokens are securely generated and regularly rotated.
                </p>
                <p>
                  <strong>Device Authentication:</strong> New devices require verification before accessing the platform. Device fingerprinting helps detect unauthorized access attempts.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-orange-500" />
                3. Incident Response and Monitoring
              </h2>
              <div className="space-y-3 text-gray-700 dark:text-gray-300">
                <p>
                  <strong>24/7 Monitoring:</strong> Our AI-powered systems continuously monitor for security threats, anomalous behavior, and potential breaches across all platform components.
                </p>
                <p>
                  <strong>Automated Response:</strong> Detected threats trigger immediate automated responses including account lockdowns, traffic filtering, and administrator notifications.
                </p>
                <p>
                  <strong>Incident Documentation:</strong> All security incidents are thoroughly documented with timestamps, affected systems, and remediation actions taken.
                </p>
                <p>
                  <strong>User Notification:</strong> Users are promptly notified of any security incidents that may affect their data or account security.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-purple-500" />
                4. Compliance and Regulatory Standards
              </h2>
              <div className="space-y-3 text-gray-700 dark:text-gray-300">
                <p>
                  <strong>Educational Compliance:</strong> Full compliance with FERPA (Family Educational Rights and Privacy Act) for educational institutions, ensuring student data privacy and access rights.
                </p>
                <p>
                  <strong>Government Standards:</strong> FISMA (Federal Information Security Management Act) compliance for government agencies, including continuous monitoring and risk assessment frameworks.
                </p>
                <p>
                  <strong>Internet Safety:</strong> CIPA (Children's Internet Protection Act) compliance for schools and libraries, including content filtering and monitoring capabilities.
                </p>
                <p>
                  <strong>International Standards:</strong> ISO 27001, SOC 2 Type II, and GDPR compliance for global security and privacy standards.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <ScrollText className="w-5 h-5 text-red-500" />
                5. User Responsibilities and Obligations
              </h2>
              <div className="space-y-3 text-gray-700 dark:text-gray-300">
                <p>
                  <strong>Password Security:</strong> Users must maintain strong, unique passwords and enable MFA on all accounts. Password sharing is strictly prohibited.
                </p>
                <p>
                  <strong>System Updates:</strong> Users are responsible for keeping their devices and browsers updated with the latest security patches.
                </p>
                <p>
                  <strong>Suspicious Activity Reporting:</strong> Users must immediately report any suspicious activities, unauthorized access attempts, or potential security incidents.
                </p>
                <p>
                  <strong>Authorized Use Only:</strong> The platform may only be used for legitimate cybersecurity and educational purposes. Any misuse will result in immediate account termination.
                </p>
                <p>
                  <strong>Data Classification:</strong> Users must properly classify and handle sensitive data according to organizational policies and regulatory requirements.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">6. Data Retention and Deletion</h2>
              <div className="space-y-3 text-gray-700 dark:text-gray-300">
                <p>
                  <strong>Retention Periods:</strong> Security logs are retained for a minimum of 7 years. User data is retained only as long as necessary for service provision or as required by law.
                </p>
                <p>
                  <strong>Right to Deletion:</strong> Users may request deletion of their personal data at any time, subject to legal and regulatory retention requirements.
                </p>
                <p>
                  <strong>Secure Disposal:</strong> All data deletion follows DoD 5220.22-M standards for secure data destruction.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">7. Third-Party Security</h2>
              <div className="space-y-3 text-gray-700 dark:text-gray-300">
                <p>
                  <strong>Vendor Assessment:</strong> All third-party vendors undergo rigorous security assessments before integration with our platform.
                </p>
                <p>
                  <strong>Data Processing Agreements:</strong> Third parties that process user data are bound by strict data processing agreements and security requirements.
                </p>
                <p>
                  <strong>Continuous Monitoring:</strong> Third-party integrations are continuously monitored for security vulnerabilities and compliance violations.
                </p>
              </div>
            </section>

            <section className="border-t pt-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Policy Updates and Contact Information</h2>
              <div className="space-y-3 text-gray-700 dark:text-gray-300">
                <p>
                  This security policy is reviewed and updated annually or as needed to address new threats and regulatory changes. Users will be notified of significant policy updates.
                </p>
                <p>
                  <strong>Security Team Contact:</strong> security@cybersecure.ai<br />
                  <strong>Incident Reporting:</strong> incidents@cybersecure.ai<br />
                  <strong>Compliance Questions:</strong> compliance@cybersecure.ai
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Last Updated: August 22, 2025 | Document Version: 2.1.0
                </p>
              </div>
            </section>
          </div>
        </CardContent>
      </Card>

      {!hasScrolledToEnd && (
        <Card className="bg-orange-50 dark:bg-orange-950/30 border-orange-200 dark:border-orange-800">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-orange-600" />
              <div>
                <p className="font-medium text-orange-800 dark:text-orange-200">Please scroll through the entire policy</p>
                <p className="text-sm text-orange-600 dark:text-orange-300">You must read the complete security policy before proceeding.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {hasScrolledToEnd && (
        <Card className="bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <Checkbox 
                checked={accepted} 
                onCheckedChange={(checked) => setAccepted(checked === true)}
                className="mt-1"
                data-testid="security-policy-accept-checkbox"
              />
              <div>
                <p className="font-medium text-green-800 dark:text-green-200">
                  I have read and understand the CyberSecured AI Security Policy
                </p>
                <p className="text-sm text-green-600 dark:text-green-300 mt-1">
                  By checking this box, I acknowledge that I have read the complete security policy and agree to comply with all stated requirements and responsibilities.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={onDecline}
          className="px-8"
          data-testid="security-policy-decline-button"
        >
          Decline
        </Button>
        <Button 
          onClick={onAccept}
          disabled={!canAccept}
          className="px-8 bg-blue-600 hover:bg-blue-700"
          data-testid="security-policy-accept-button"
        >
          Accept and Continue
        </Button>
      </div>
    </div>
  );
}