import { MarketingLayout } from "@/components/MarketingLayout";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Lock, AlertCircle, CheckCircle2 } from "lucide-react";

export default function DataSecurityPolicy() {
  return (
    <MarketingLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
        {/* Header */}
        <div className="bg-black/20 border-b border-blue-500/30">
          <div className="container mx-auto px-6 py-16">
            <div className="text-center">
              <Badge variant="outline" className="mb-4 border-blue-400 text-blue-400">
                <Shield className="h-4 w-4 mr-2" />
                Data Security Policy
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">
                Data Security Policy
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-4">
                Enterprise Cybersecurity Data Protection Framework
              </p>
              <p className="text-blue-400 font-semibold">
                Effective Date: September 6, 2025 | Version 2.1
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-6 py-12 max-w-4xl">
          {/* Security Commitment */}
          <Card className="mb-8 bg-blue-500/10 border-blue-500/30">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <Lock className="h-6 w-6 text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-blue-200 font-semibold mb-2">🔒 Security Commitment:</p>
                  <p className="text-gray-300">
                    CyberSecured AI implements enterprise-grade security controls to protect customer data, 
                    leveraging industry best practices, regulatory compliance requirements, and our expertise 
                    in cybersecurity to ensure comprehensive data protection.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="prose prose-invert max-w-none">
            {/* Section 1 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-blue-400 mb-4">1. Policy Overview and Scope</h2>
              
              <h3 className="text-xl font-semibold text-white mb-3">1.1 Purpose</h3>
              <p className="text-gray-300 mb-4">
                This Data Security Policy establishes the security framework, controls, and procedures 
                CyberSecured AI implements to protect all data entrusted to our platform, including:
              </p>
              <ul className="text-gray-300 space-y-2 ml-6 mb-4">
                <li>Customer data and organizational information</li>
                <li>Student educational records (FERPA-protected data)</li>
                <li>Government and federal agency data</li>
                <li>Threat intelligence and security data</li>
                <li>Personal and sensitive information</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mb-3">1.2 Regulatory Alignment</h3>
              <p className="text-gray-300 mb-4">Our security framework aligns with:</p>
              <ul className="text-gray-300 space-y-2 ml-6">
                <li><strong>NIST Cybersecurity Framework</strong> - Comprehensive security controls</li>
                <li><strong>FERPA</strong> - Educational records protection</li>
                <li><strong>FISMA</strong> - Federal information security standards</li>
                <li><strong>GDPR/CCPA</strong> - Privacy regulation compliance</li>
                <li><strong>SOC 2 Type II</strong> - Security and availability controls</li>
              </ul>
            </section>

            {/* Section 2 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-blue-400 mb-4">2. Data Classification and Handling</h2>
              
              <h3 className="text-xl font-semibold text-white mb-3">2.1 Data Classification Levels</h3>
              
              <Card className="bg-red-500/10 border-red-500/30 p-4 mb-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-red-200 font-semibold mb-2">Critical/Restricted</h4>
                    <p className="text-gray-300 text-sm">
                      Highly sensitive data requiring maximum protection (PII, financial data, classified information)
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="bg-orange-500/10 border-orange-500/30 p-4 mb-4">
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-orange-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-orange-200 font-semibold mb-2">Confidential</h4>
                    <p className="text-gray-300 text-sm">
                      Business-sensitive information with controlled access (security configurations, reports)
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="bg-yellow-500/10 border-yellow-500/30 p-4 mb-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-yellow-200 font-semibold mb-2">Internal Use</h4>
                    <p className="text-gray-300 text-sm">
                      Internal business data with standard protection (operational data, internal communications)
                    </p>
                  </div>
                </div>
              </Card>

              <h3 className="text-xl font-semibold text-white mb-3">2.2 Handling Requirements</h3>
              <ul className="text-gray-300 space-y-2 ml-6">
                <li><strong>Access Controls:</strong> Role-based access with least privilege principles</li>
                <li><strong>Encryption:</strong> AES-256 encryption for data at rest and in transit</li>
                <li><strong>Audit Logging:</strong> Comprehensive logging of all data access and modifications</li>
                <li><strong>Retention Policies:</strong> Data lifecycle management and secure disposal</li>
              </ul>
            </section>

            {/* Section 3 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-blue-400 mb-4">3. Technical Security Controls</h2>
              
              <h3 className="text-xl font-semibold text-white mb-3">3.1 Encryption and Cryptography</h3>
              <ul className="text-gray-300 space-y-2 ml-6 mb-4">
                <li><strong>Data at Rest:</strong> AES-256 encryption with hardware security modules (HSM)</li>
                <li><strong>Data in Transit:</strong> TLS 1.3 with perfect forward secrecy</li>
                <li><strong>Key Management:</strong> Enterprise key management with regular rotation</li>
                <li><strong>Database Encryption:</strong> Transparent data encryption (TDE) for all databases</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mb-3">3.2 Access Controls</h3>
              <ul className="text-gray-300 space-y-2 ml-6 mb-4">
                <li><strong>Multi-Factor Authentication:</strong> Required for all user accounts</li>
                <li><strong>Role-Based Access:</strong> Granular permissions based on job functions</li>
                <li><strong>Privileged Access Management:</strong> Additional controls for administrative access</li>
                <li><strong>Session Management:</strong> Automated session timeouts and controls</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mb-3">3.3 Network Security</h3>
              <ul className="text-gray-300 space-y-2 ml-6">
                <li><strong>Network Segmentation:</strong> Isolated environments for different data types</li>
                <li><strong>Firewall Protection:</strong> Next-generation firewalls with intrusion prevention</li>
                <li><strong>DDoS Protection:</strong> Advanced distributed denial of service mitigation</li>
                <li><strong>VPN Access:</strong> Secure remote access with certificate-based authentication</li>
              </ul>
            </section>

            {/* Section 4 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-blue-400 mb-4">4. Operational Security Measures</h2>
              
              <h3 className="text-xl font-semibold text-white mb-3">4.1 Security Monitoring</h3>
              <ul className="text-gray-300 space-y-2 ml-6 mb-4">
                <li><strong>24/7 SOC:</strong> Security operations center with continuous monitoring</li>
                <li><strong>SIEM Integration:</strong> Security information and event management</li>
                <li><strong>Threat Detection:</strong> Advanced behavioral analytics and AI-powered detection</li>
                <li><strong>Incident Response:</strong> Rapid response and forensic analysis capabilities</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mb-3">4.2 Vulnerability Management</h3>
              <ul className="text-gray-300 space-y-2 ml-6 mb-4">
                <li><strong>Regular Scanning:</strong> Automated vulnerability assessments</li>
                <li><strong>Patch Management:</strong> Timely application of security updates</li>
                <li><strong>Penetration Testing:</strong> Quarterly third-party security assessments</li>
                <li><strong>Code Reviews:</strong> Secure development lifecycle practices</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mb-3">4.3 Backup and Recovery</h3>
              <ul className="text-gray-300 space-y-2 ml-6">
                <li><strong>Automated Backups:</strong> Regular encrypted backups to multiple locations</li>
                <li><strong>Disaster Recovery:</strong> Comprehensive business continuity plans</li>
                <li><strong>Recovery Testing:</strong> Regular testing of backup and recovery procedures</li>
                <li><strong>RTO/RPO Targets:</strong> Recovery time objectives under 4 hours</li>
              </ul>
            </section>

            {/* Section 5 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-blue-400 mb-4">5. Compliance and Auditing</h2>
              
              <h3 className="text-xl font-semibold text-white mb-3">5.1 Audit Framework</h3>
              <ul className="text-gray-300 space-y-2 ml-6 mb-4">
                <li><strong>Independent Audits:</strong> Annual SOC 2 Type II compliance audits</li>
                <li><strong>Internal Reviews:</strong> Quarterly internal security assessments</li>
                <li><strong>Compliance Monitoring:</strong> Continuous compliance monitoring and reporting</li>
                <li><strong>Documentation:</strong> Comprehensive security documentation and procedures</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mb-3">5.2 Regulatory Compliance</h3>
              <ul className="text-gray-300 space-y-2 ml-6">
                <li><strong>FERPA Compliance:</strong> Educational records protection and privacy</li>
                <li><strong>FISMA Authorization:</strong> Federal information security management</li>
                <li><strong>GDPR/CCPA:</strong> Privacy regulation compliance and data rights</li>
                <li><strong>Industry Standards:</strong> ISO 27001, NIST, and other security frameworks</li>
              </ul>
            </section>

            {/* Section 6 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-blue-400 mb-4">6. Incident Response and Breach Management</h2>
              
              <h3 className="text-xl font-semibold text-white mb-3">6.1 Incident Response Process</h3>
              <ul className="text-gray-300 space-y-2 ml-6 mb-4">
                <li><strong>Detection:</strong> Automated and manual threat detection capabilities</li>
                <li><strong>Response:</strong> Immediate containment and investigation procedures</li>
                <li><strong>Recovery:</strong> System restoration and security enhancement</li>
                <li><strong>Documentation:</strong> Comprehensive incident documentation and reporting</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mb-3">6.2 Breach Notification</h3>
              <ul className="text-gray-300 space-y-2 ml-6">
                <li><strong>Customer Notification:</strong> Within 24 hours of confirmed breach</li>
                <li><strong>Regulatory Reporting:</strong> Compliance with notification requirements</li>
                <li><strong>Law Enforcement:</strong> Cooperation with investigations when appropriate</li>
                <li><strong>Public Disclosure:</strong> Transparent communication about security incidents</li>
              </ul>
            </section>
          </div>

          {/* Contact Information */}
          <Card className="mt-12 bg-slate-800/50 border-blue-500/30">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <Shield className="h-5 w-5 text-blue-400" />
                Data Security Contact Information
              </h3>
              <div className="space-y-2 text-gray-300">
                <p><strong>Security Team:</strong> security@cybersecuredai.com</p>
                <p><strong>Data Protection Officer:</strong> dpo@cybersecuredai.com</p>
                <p><strong>Incident Response:</strong> incident@cybersecuredai.com</p>
                <p><strong>Compliance Officer:</strong> compliance@cybersecuredai.com</p>
                <p className="text-sm text-gray-400 mt-4">
                  For security incidents or data protection questions, please contact the appropriate team above. 
                  Security incidents are monitored 24/7 with immediate response capabilities.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MarketingLayout>
  );
}