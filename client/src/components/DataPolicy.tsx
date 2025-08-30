import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { Database, Shield, Users, Globe, FileText, AlertTriangle, Eye, Trash2 } from 'lucide-react';

interface DataPolicyProps {
  onAccept: () => void;
  onDecline: () => void;
}

export function DataPolicy({ onAccept, onDecline }: DataPolicyProps) {
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
      <Card className="bg-gradient-to-br from-green-950/90 to-blue-950/90 border-green-800/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Database className="w-8 h-8 text-green-400" />
              <div>
                <CardTitle className="text-2xl text-white">CyberSecured AI Data Policy</CardTitle>
                <p className="text-green-200 mt-1">Effective Date: August 2025 | Version 2.1</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-green-300">Reading Progress</div>
              <Progress value={scrollProgress} className="w-32 mt-1" />
              <div className="text-xs text-green-400 mt-1">{Math.round(scrollProgress)}%</div>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700">
        <CardContent className="p-0">
          <div 
            ref={scrollRef}
            className="h-96 overflow-y-auto p-6 space-y-6 text-sm leading-relaxed"
            data-testid="data-policy-content"
          >
            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-500" />
                1. Information We Collect
              </h2>
              <div className="space-y-3 text-gray-700 dark:text-gray-300">
                <p>
                  <strong>Account Information:</strong> Email address, name, organization, role, and authentication credentials necessary for platform access and security.
                </p>
                <p>
                  <strong>Security Data:</strong> Threat detection logs, security event data, system vulnerability information, and incident response data processed by our AI systems.
                </p>
                <p>
                  <strong>Usage Analytics:</strong> Platform usage patterns, feature utilization, dashboard interactions, and performance metrics to improve service quality.
                </p>
                <p>
                  <strong>Device Information:</strong> Browser type, operating system, IP address, device identifiers, and network information for security and access control.
                </p>
                <p>
                  <strong>Educational Records:</strong> For educational institutions, we may process student data as required for FERPA compliance and educational cybersecurity training.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Eye className="w-5 h-5 text-green-500" />
                2. How We Use Your Information
              </h2>
              <div className="space-y-3 text-gray-700 dark:text-gray-300">
                <p>
                  <strong>Security Services:</strong> Threat detection, vulnerability assessment, incident response, and AI-powered security monitoring and analysis.
                </p>
                <p>
                  <strong>Platform Operations:</strong> User authentication, access control, feature personalization, and system maintenance and optimization.
                </p>
                <p>
                  <strong>Compliance Reporting:</strong> Generation of required compliance reports for FERPA, FISMA, CIPA, and other regulatory frameworks.
                </p>
                <p>
                  <strong>Service Improvement:</strong> Analysis of usage patterns to enhance AI algorithms, improve user experience, and develop new security features.
                </p>
                <p>
                  <strong>Communication:</strong> Security alerts, system notifications, policy updates, and customer support communications.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-purple-500" />
                3. Information Sharing and Disclosure
              </h2>
              <div className="space-y-3 text-gray-700 dark:text-gray-300">
                <p>
                  <strong>No Sale of Data:</strong> We never sell, rent, or trade your personal information to third parties for marketing or commercial purposes.
                </p>
                <p>
                  <strong>Service Providers:</strong> Limited sharing with trusted service providers who assist in platform operations, subject to strict data protection agreements.
                </p>
                <p>
                  <strong>Legal Requirements:</strong> Disclosure may occur when required by law, court order, or to protect the rights and safety of users and the public.
                </p>
                <p>
                  <strong>Security Incidents:</strong> Anonymous threat intelligence may be shared with cybersecurity communities to improve collective defense.
                </p>
                <p>
                  <strong>Business Transfers:</strong> In the event of a merger or acquisition, data may be transferred subject to continued protection under this policy.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-orange-500" />
                4. Data Storage and Security
              </h2>
              <div className="space-y-3 text-gray-700 dark:text-gray-300">
                <p>
                  <strong>Encryption:</strong> All data is encrypted using AES-256 encryption both in transit and at rest, with regular key rotation and secure key management.
                </p>
                <p>
                  <strong>Geographic Storage:</strong> Data is stored in secure data centers located in the United States, with optional regional storage for international customers.
                </p>
                <p>
                  <strong>Access Controls:</strong> Strict access controls ensure only authorized personnel can access user data, with all access logged and monitored.
                </p>
                <p>
                  <strong>Backup and Recovery:</strong> Regular encrypted backups are maintained with secure recovery procedures to prevent data loss.
                </p>
                <p>
                  <strong>Data Segregation:</strong> Customer data is logically segregated using tenant isolation and environment separation techniques.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Globe className="w-5 h-5 text-indigo-500" />
                5. Your Privacy Rights
              </h2>
              <div className="space-y-3 text-gray-700 dark:text-gray-300">
                <p>
                  <strong>Right to Access:</strong> You may request a copy of all personal information we maintain about you and your organization.
                </p>
                <p>
                  <strong>Right to Rectification:</strong> You may request correction of inaccurate or incomplete personal information.
                </p>
                <p>
                  <strong>Right to Erasure:</strong> You may request deletion of your personal information, subject to legal retention requirements.
                </p>
                <p>
                  <strong>Right to Portability:</strong> You may request export of your data in a machine-readable format for transfer to another service.
                </p>
                <p>
                  <strong>Right to Object:</strong> You may object to certain types of data processing, including automated decision-making.
                </p>
                <p>
                  <strong>Right to Restrict:</strong> You may request temporary suspension of data processing in certain circumstances.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Trash2 className="w-5 h-5 text-red-500" />
                6. Data Retention and Deletion
              </h2>
              <div className="space-y-3 text-gray-700 dark:text-gray-300">
                <p>
                  <strong>Account Data:</strong> Personal account information is retained for the duration of your active subscription plus 90 days for account recovery.
                </p>
                <p>
                  <strong>Security Logs:</strong> Security and audit logs are retained for 7 years as required by cybersecurity compliance standards.
                </p>
                <p>
                  <strong>Educational Records:</strong> Student data is retained only as long as necessary for educational purposes and in compliance with FERPA requirements.
                </p>
                <p>
                  <strong>Automated Deletion:</strong> We employ automated systems to delete data according to established retention schedules.
                </p>
                <p>
                  <strong>Secure Destruction:</strong> All deleted data is securely destroyed using DoD-approved methods to prevent recovery.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">7. Cookies and Tracking Technologies</h2>
              <div className="space-y-3 text-gray-700 dark:text-gray-300">
                <p>
                  <strong>Essential Cookies:</strong> Required for platform functionality, including authentication, session management, and security features.
                </p>
                <p>
                  <strong>Analytics Cookies:</strong> Used to understand platform usage and improve user experience, with data anonymized and aggregated.
                </p>
                <p>
                  <strong>Security Tracking:</strong> Behavioral analysis for fraud detection and security monitoring, essential for platform security.
                </p>
                <p>
                  <strong>No Advertising:</strong> We do not use cookies for advertising or marketing tracking purposes.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">8. Children's Privacy (COPPA Compliance)</h2>
              <div className="space-y-3 text-gray-700 dark:text-gray-300">
                <p>
                  <strong>Age Verification:</strong> Our platform is designed for users 13 years and older. We implement age verification processes for educational accounts.
                </p>
                <p>
                  <strong>Parental Consent:</strong> For users under 18 in educational settings, we obtain appropriate consent through school administrators as permitted by FERPA.
                </p>
                <p>
                  <strong>Limited Collection:</strong> We collect only the minimum information necessary for educational cybersecurity training purposes.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">9. International Data Transfers</h2>
              <div className="space-y-3 text-gray-700 dark:text-gray-300">
                <p>
                  <strong>Transfer Safeguards:</strong> International data transfers are protected by appropriate safeguards including Standard Contractual Clauses and adequacy decisions.
                </p>
                <p>
                  <strong>Data Localization:</strong> We offer data residency options for customers with specific geographic requirements.
                </p>
                <p>
                  <strong>Cross-Border Security:</strong> All international transfers maintain the same encryption and security standards as domestic data handling.
                </p>
              </div>
            </section>

            <section className="border-t pt-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Contact Information and Policy Updates</h2>
              <div className="space-y-3 text-gray-700 dark:text-gray-300">
                <p>
                  This data policy is reviewed annually and updated as needed to reflect changes in our practices or applicable law. Significant changes will be communicated to users with 30 days advance notice.
                </p>
                <p>
                  <strong>Data Protection Officer:</strong> info@cybersecuredai.com<br />
                  <strong>Privacy Requests:</strong> info@cybersecuredai.com<br />
                  <strong>General Inquiries:</strong> info@cybersecuredai.com
                </p>
                <p>
                  <strong>Mailing Address:</strong><br />
                  CyberSecured AI Privacy Team<br />
                  1234 Security Boulevard<br />
                  Cyber City, CC 12345<br />
                  United States
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
                <p className="text-sm text-orange-600 dark:text-orange-300">You must read the complete data policy before proceeding.</p>
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
                data-testid="data-policy-accept-checkbox"
              />
              <div>
                <p className="font-medium text-green-800 dark:text-green-200">
                  I have read and understand the CyberSecured AI Data Policy
                </p>
                <p className="text-sm text-green-600 dark:text-green-300 mt-1">
                  By checking this box, I acknowledge that I have read the complete data policy and consent to the collection, processing, and storage of my data as described.
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
          data-testid="data-policy-decline-button"
        >
          Decline
        </Button>
        <Button 
          onClick={onAccept}
          disabled={!canAccept}
          className="px-8 bg-green-600 hover:bg-green-700"
          data-testid="data-policy-accept-button"
        >
          Accept and Continue
        </Button>
      </div>
    </div>
  );
}