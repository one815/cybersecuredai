import { MarketingLayout } from "@/components/MarketingLayout";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, FileText, Lock, AlertCircle } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <MarketingLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
        {/* Header */}
        <div className="bg-black/20 border-b border-cyan-500/30">
          <div className="container mx-auto px-6 py-16">
            <div className="text-center">
              <Badge variant="outline" className="mb-4 border-green-400 text-green-400">
                <Shield className="h-4 w-4 mr-2" />
                Privacy Policy
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-green-400 bg-clip-text text-transparent">
                Privacy Policy
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-4">
                CyberSecured AI Enterprise Cybersecurity Platform
              </p>
              <p className="text-green-400 font-semibold">
                Effective Date: September 6, 2025
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-6 py-12 max-w-4xl">
          {/* Important Notice */}
          <Card className="mb-8 bg-blue-500/10 border-blue-500/30">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <Lock className="h-6 w-6 text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-blue-200 font-semibold mb-2">Important:</p>
                  <p className="text-gray-300">
                    This Privacy Policy describes how CyberSecured AI ("we," "our," or "us") collects, uses, 
                    processes, and protects your personal information when you use our cybersecurity platform 
                    and services, particularly for educational institutions and government organizations.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="prose prose-invert max-w-none">
            {/* Section 1 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-green-400 mb-4">1. Information We Collect</h2>
              
              <h3 className="text-xl font-semibold text-white mb-3">1.1 Personal Information</h3>
              <ul className="text-gray-300 space-y-2 ml-6 mb-4">
                <li>Account registration data (name, email address, phone number)</li>
                <li>Professional information (organization, job title, department)</li>
                <li>Authentication credentials and multi-factor authentication data</li>
                <li>Communication data (support tickets, feedback, correspondence)</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mb-3">1.2 Technical Information</h3>
              <ul className="text-gray-300 space-y-2 ml-6 mb-4">
                <li>IP addresses and geolocation data for threat analysis</li>
                <li>Device information (browser type, operating system, device IDs)</li>
                <li>Log data (access times, pages viewed, actions performed)</li>
                <li>Security event data and threat intelligence indicators</li>
                <li>Network traffic patterns and anomaly detection data</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mb-3">1.3 Organization Data</h3>
              <ul className="text-gray-300 space-y-2 ml-6">
                <li>Network infrastructure information</li>
                <li>Security configuration data</li>
                <li>Compliance assessment results</li>
                <li>Incident response data and forensic information</li>
              </ul>
            </section>

            {/* Section 2 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-green-400 mb-4">2. How We Use Your Information</h2>
              <p className="text-gray-300 mb-4">
                We use the collected information for the following purposes:
              </p>
              
              <h3 className="text-xl font-semibold text-white mb-3">2.1 Service Delivery</h3>
              <ul className="text-gray-300 space-y-2 ml-6 mb-4">
                <li>Providing cybersecurity monitoring and threat detection</li>
                <li>Generating compliance reports and assessments</li>
                <li>Delivering incident response and forensic analysis</li>
                <li>Maintaining and improving service performance</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mb-3">2.2 Communication and Support</h3>
              <ul className="text-gray-300 space-y-2 ml-6 mb-4">
                <li>Responding to customer inquiries and support requests</li>
                <li>Sending service notifications and security alerts</li>
                <li>Providing training and educational materials</li>
                <li>Conducting user satisfaction surveys</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mb-3">2.3 Legal and Compliance</h3>
              <ul className="text-gray-300 space-y-2 ml-6">
                <li>Meeting regulatory requirements (FERPA, FISMA, etc.)</li>
                <li>Responding to legal requests and court orders</li>
                <li>Protecting against fraud and abuse</li>
                <li>Enforcing our Terms of Service</li>
              </ul>
            </section>

            {/* Section 3 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-green-400 mb-4">3. Information Sharing and Disclosure</h2>
              
              <Card className="bg-yellow-500/10 border-yellow-500/30 p-6 mb-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-6 w-6 text-yellow-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-yellow-200 font-semibold mb-2">Limited Sharing:</p>
                    <p className="text-gray-300">
                      We do not sell, trade, or rent your personal information to third parties. 
                      Information sharing is strictly limited to the purposes outlined below.
                    </p>
                  </div>
                </div>
              </Card>

              <h3 className="text-xl font-semibold text-white mb-3">3.1 Service Providers</h3>
              <ul className="text-gray-300 space-y-2 ml-6 mb-4">
                <li>Cloud infrastructure providers (with appropriate data processing agreements)</li>
                <li>Threat intelligence feeds and security research organizations</li>
                <li>Payment processing services</li>
                <li>Customer support and communication platforms</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mb-3">3.2 Legal Requirements</h3>
              <ul className="text-gray-300 space-y-2 ml-6">
                <li>Compliance with legal obligations and court orders</li>
                <li>Response to government requests for information</li>
                <li>Protection of rights, property, or safety</li>
                <li>Investigation of fraud or security incidents</li>
              </ul>
            </section>

            {/* Section 4 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-green-400 mb-4">4. Data Security and Protection</h2>
              
              <Card className="bg-green-500/10 border-green-500/30 p-6 mb-4">
                <div className="flex items-start gap-3">
                  <Shield className="h-6 w-6 text-green-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-green-200 font-semibold mb-2">Enterprise-Grade Security:</p>
                    <p className="text-gray-300">
                      We implement comprehensive security measures to protect your information, 
                      including industry-leading encryption and access controls.
                    </p>
                  </div>
                </div>
              </Card>

              <h3 className="text-xl font-semibold text-white mb-3">4.1 Technical Safeguards</h3>
              <ul className="text-gray-300 space-y-2 ml-6 mb-4">
                <li>AES-256 encryption for data at rest and in transit</li>
                <li>Multi-factor authentication for all user accounts</li>
                <li>Regular security audits and penetration testing</li>
                <li>Network segmentation and access controls</li>
                <li>Continuous monitoring and threat detection</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mb-3">4.2 Administrative Safeguards</h3>
              <ul className="text-gray-300 space-y-2 ml-6">
                <li>Role-based access controls and least privilege principles</li>
                <li>Regular security training for all employees</li>
                <li>Incident response and data breach procedures</li>
                <li>Vendor security assessments and agreements</li>
              </ul>
            </section>

            {/* Section 5 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-green-400 mb-4">5. Data Retention and Deletion</h2>
              <p className="text-gray-300 mb-4">
                We retain your information only as long as necessary for the purposes outlined in this policy:
              </p>
              <ul className="text-gray-300 space-y-2 ml-6">
                <li><strong>Account Data:</strong> Retained while your account is active plus 7 years</li>
                <li><strong>Security Logs:</strong> Retained for up to 2 years for threat analysis</li>
                <li><strong>Compliance Data:</strong> Retained per regulatory requirements (typically 7 years)</li>
                <li><strong>Support Communications:</strong> Retained for 3 years after resolution</li>
              </ul>
            </section>

            {/* Section 6 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-green-400 mb-4">6. Your Privacy Rights</h2>
              
              <h3 className="text-xl font-semibold text-white mb-3">6.1 Access and Correction</h3>
              <ul className="text-gray-300 space-y-2 ml-6 mb-4">
                <li>Request access to your personal information</li>
                <li>Correct inaccurate or incomplete data</li>
                <li>Update your account preferences and settings</li>
                <li>Download your data in a portable format</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mb-3">6.2 Deletion and Restriction</h3>
              <ul className="text-gray-300 space-y-2 ml-6 mb-4">
                <li>Request deletion of your personal information (subject to legal requirements)</li>
                <li>Restrict processing for specific purposes</li>
                <li>Object to processing based on legitimate interests</li>
                <li>Withdraw consent where applicable</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mb-3">6.3 Notification Preferences</h3>
              <ul className="text-gray-300 space-y-2 ml-6">
                <li>Control email communications and marketing messages</li>
                <li>Set preferences for security alerts and notifications</li>
                <li>Opt out of non-essential communications</li>
              </ul>
            </section>

            {/* Section 7 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-green-400 mb-4">7. Compliance with Regulations</h2>
              <p className="text-gray-300 mb-4">
                We comply with applicable privacy regulations, including:
              </p>
              <ul className="text-gray-300 space-y-2 ml-6">
                <li><strong>FERPA:</strong> Family Educational Rights and Privacy Act</li>
                <li><strong>GDPR:</strong> General Data Protection Regulation</li>
                <li><strong>CCPA:</strong> California Consumer Privacy Act</li>
                <li><strong>COPPA:</strong> Children's Online Privacy Protection Act</li>
                <li><strong>FISMA:</strong> Federal Information Security Management Act</li>
              </ul>
            </section>

            {/* Section 8 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-green-400 mb-4">8. International Data Transfers</h2>
              <p className="text-gray-300 mb-4">
                If you are located outside the United States, please note that we may transfer your 
                information to the United States. We ensure appropriate safeguards are in place:
              </p>
              <ul className="text-gray-300 space-y-2 ml-6">
                <li>Standard contractual clauses for international transfers</li>
                <li>Adequacy decisions where available</li>
                <li>Certification under recognized privacy frameworks</li>
                <li>Your explicit consent where required</li>
              </ul>
            </section>

            {/* Section 9 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-green-400 mb-4">9. Changes to This Privacy Policy</h2>
              <p className="text-gray-300">
                We may update this Privacy Policy periodically to reflect changes in our practices 
                or applicable laws. We will notify you of material changes by email and by posting 
                the updated policy on our website. Your continued use of our services after any 
                changes constitutes acceptance of the updated policy.
              </p>
            </section>
          </div>

          {/* Contact Information */}
          <Card className="mt-12 bg-slate-800/50 border-green-500/30">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <FileText className="h-5 w-5 text-green-400" />
                Privacy Contact Information
              </h3>
              <div className="space-y-2 text-gray-300">
                <p><strong>Privacy Officer:</strong> privacy@cybersecuredai.com</p>
                <p><strong>Data Protection Officer:</strong> dpo@cybersecuredai.com</p>
                <p><strong>General Contact:</strong> legal@cybersecuredai.com</p>
                <p className="text-sm text-gray-400 mt-4">
                  For privacy-related inquiries or to exercise your privacy rights, please contact us 
                  using the information above. We typically respond to privacy requests within 5-10 business days.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MarketingLayout>
  );
}